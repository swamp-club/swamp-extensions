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

import { z } from "npm:zod@4.3.6";
import { digestOf, jsonSafe } from "./canonical.ts";
import { buildCelContext } from "./cel_context.ts";
import { buildDispatch } from "./dispatch.ts";
import {
  evaluateTransitions,
  type GateCheck,
  makeGateEvaluator,
} from "./gates.ts";
import { designView, renderDesignPage } from "./design_page.ts";
import {
  analyzeDefinition,
  DEFAULT_MAX_STATES,
  formatFinding,
} from "./graph.ts";
import { type Actor, actorFrom, type ProductKind } from "./journal.ts";
import {
  type FactoryDefinition,
  parseDefinition,
} from "./definition_schema.ts";
import {
  advance,
  dispatchCap,
  type Env,
  type Expected,
  expectedOf,
  grantOverride,
  type OpResult,
  recordApproval,
  recordDispatch,
  recordUsage,
  reset,
} from "./run_ops.ts";
import { computeMetrics } from "./metrics.ts";
import { buildSummary } from "./summary.ts";
import { currentCycle, type RunRecord } from "./run_record.ts";
import {
  committingStore,
  contextStore,
  loadRun,
  recordProduct,
  type ResourceContext,
  type RunStore,
  startRun,
  update,
} from "./run_store.ts";

// ---------------------------------------------------------------------------
// The methods of the model types, written against a narrow view of
// swamp's method context so they can be tested with a fake one.
//
// Output: methods return swamp data handles; what a person or agent reads
// (the status, a dispatch packet, a refusal) goes through the logger, as in
// @swamp/issue-lifecycle. A refusal throws with its reason after writing
// nothing. A rejected payload is committed to the run as retry feedback and
// then thrown: no method declares rollbackOnFailure, so the feedback
// survives and the caller still gets a non-zero exit.
// ---------------------------------------------------------------------------

export const FACTORY_TYPE = "@swamp/gatorwalk-factory/factory";
export const WORK_ITEM_TYPE = "@swamp/gatorwalk-factory/work-item";

/** The resource spec and fixed name of a work item's pinned factory definition.
 */
export const DEFINITION_SPEC = "definition";
export const DEFINITION_NAME = "definition";

/**
 * The resource spec and fixed name of the factory's latest generated key, so a
 * program reads the key from --json output rather than the log text.
 */
export const KEY_SPEC = "key";
export const KEY_NAME = "key";

/** The file spec and fixed name of a factory's design page. */
export const DESIGN_PAGE_SPEC = "design-page";
export const DESIGN_PAGE_NAME = "design-page";

/** The resource spec and fixed name of a work item's derived metrics. */
export const METRICS_SPEC = "metrics";
export const METRICS_NAME = "metrics";

export interface Logger {
  info(message: string, props?: Record<string, unknown>): void;
}

/** The part of swamp's definition repository the methods use. */
export interface DefinitionLookup {
  findByNameGlobal(
    name: string,
  ): Promise<{ definition: unknown; type: unknown } | null>;
}

/** The part of swamp's file writer the methods use. */
export interface FileWriterLike {
  writeText(content: string): Promise<unknown>;
}

/** The part of swamp's method context the methods use. */
export interface MethodContextLike extends ResourceContext {
  definition?: { name: string };
  tagOverrides?: Record<string, string>;
  logger: Logger;
  definitionRepository?: DefinitionLookup;
  createFileWriter?(specName: string, instanceName: string): FileWriterLike;
}

/**
 * A data record as swamp's readModelData (and queryData) returns it: the
 * parts gatorwalk reads. swamp gives a JSON resource's data as both
 * `attributes` and `content`; claim reads the one, publish the other.
 */
export interface ModelDataRecord {
  name?: string;
  version: number;
  isLatest?: boolean;
  attributes?: Record<string, unknown>;
  content?: unknown;
}

/** A method context that can also read another model's data. */
export interface DataReadingContext extends MethodContextLike {
  readModelData?(
    modelName: string,
    specName?: string,
  ): Promise<ModelDataRecord[]>;
}

export interface MethodOutput {
  dataHandles: unknown[];
}

// --- inputs (CLI inputs arrive as strings) --------------------------------------

export const ExpectedInputs = {
  expectedStage: z.string().min(1).describe(
    "The stage status reported; a write is refused if the item has moved",
  ),
  expectedCycle: z.coerce.number().int().positive().describe(
    "The cycle status reported",
  ),
  expectedEra: z.string().min(1).describe("The era status reported"),
};

export const ActorInputs = {
  onBehalfOf: z.string().min(1).optional().describe(
    "Who the caller acts for; recorded beside the platform principal, unverified",
  ),
};

/** A payload as an object (from --input-file) or a JSON string (--input). */
export const PayloadInput = z.union([
  z.record(z.string(), z.unknown()),
  z.string(),
]).describe("The payload: an object, or a JSON object as a string");

function jsonObjectFrom(what: string, input: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    throw new Error(
      `${what} is not valid JSON: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error(`${what} must be a JSON object`);
  }
  return parsed as Record<string, unknown>;
}

function payloadFrom(input: Record<string, unknown> | string) {
  if (typeof input !== "string") return input;
  return jsonObjectFrom("payload", input);
}

/**
 * Tracker ids as an object (from --input-file) or a JSON string (--input),
 * which swamp passes through as a string rather than a record (#2640).
 */
export const ExternalRefsInput = z.union([
  z.record(z.string(), z.string()),
  z.string(),
]).describe(
  "Tracker ids, e.g. a Linear issue UUID: an object, or a JSON object as a string",
);

/**
 * A string-to-string map from either form; every value must be a string.
 * `what` names the input in errors.
 */
export function stringMapFrom(
  what: string,
  input: Record<string, string> | string | undefined,
): Record<string, string> {
  if (input === undefined) return {};
  if (typeof input !== "string") return input;
  const parsed = jsonObjectFrom(what, input);
  const bad = Object.entries(parsed).filter(([, v]) => typeof v !== "string");
  if (bad.length > 0) {
    throw new Error(
      `${what} values must be strings; not: ${bad.map(([k]) => k).join(", ")}`,
    );
  }
  return parsed as Record<string, string>;
}

/** The tracker ids from either form of ExternalRefsInput. */
export function externalRefsFrom(
  input: Record<string, string> | string | undefined,
): Record<string, string> {
  return stringMapFrom("externalRefs", input);
}

function expectedFrom(args: {
  expectedStage: string;
  expectedCycle: number;
  expectedEra: string;
}): Expected {
  return {
    stage: args.expectedStage,
    cycle: args.expectedCycle,
    era: args.expectedEra,
  };
}

function actorOf(ctx: MethodContextLike, onBehalfOf?: string): Actor {
  return actorFrom(ctx, onBehalfOf);
}

// --- the factory ----------------------------------------------------------------

/** A model type as swamp passes it (a string, or raw and normalized). */
export function typeNameOf(type: unknown): string {
  if (typeof type === "string") return type.toLowerCase();
  if (type !== null && typeof type === "object") {
    const t = type as { normalized?: unknown; raw?: unknown };
    if (typeof t.normalized === "string") return t.normalized;
    if (typeof t.raw === "string") return t.raw.toLowerCase();
  }
  return String(type);
}

/**
 * The raw, unevaluated globalArguments of a factory. Read through
 * the definition repository, never the evaluated context.globalArgs, so a
 * ${{ }} reaches the factory definition schema's own error. On a remote worker
 * the definition arrives as a plain object with _globalArguments.
 */
export async function readFactoryArguments(
  ctx: MethodContextLike,
  name: string,
): Promise<unknown> {
  if (ctx.definitionRepository === undefined) {
    throw new Error("this method context cannot read model definitions");
  }
  const found = await ctx.definitionRepository.findByNameGlobal(name);
  if (found === null) throw new Error(`no factory named '${name}'`);
  const type = typeNameOf(found.type);
  if (type !== FACTORY_TYPE) {
    throw new Error(
      `'${name}' is a ${type}, not a factory (${FACTORY_TYPE})`,
    );
  }
  const definition = found.definition as {
    globalArguments?: unknown;
    _globalArguments?: unknown;
  };
  return definition.globalArguments ?? definition._globalArguments ?? {};
}

/** A factory's definition, validated in full; throws with every error. */
export async function loadFactoryDefinition(
  ctx: MethodContextLike,
  name: string,
): Promise<FactoryDefinition> {
  const parsed = parseDefinition(await readFactoryArguments(ctx, name));
  if (!parsed.ok) {
    throw new Error(
      `factory '${name}' is not a valid definition:\n${
        parsed.errors.join("\n")
      }`,
    );
  }
  return parsed.value;
}

/**
 * The factory's validate method: the schema's errors, then the graph
 * analysis (graph.ts). Graph errors, or an analysis that stopped at the
 * state cap, fail the method with every finding; otherwise warnings are
 * logged one by one before the summary. Work items load the
 * factory definition with the schema check alone.
 */
export async function validateFactory(
  ctx: MethodContextLike,
): Promise<MethodOutput> {
  const name = selfName(ctx);
  const definition = await loadFactoryDefinition(ctx, name);
  const maxStates = DEFAULT_MAX_STATES;
  const graph = analyzeDefinition(definition, { maxStates });
  // A partial exploration proves nothing, so it fails validation too. The
  // exploration-truncated warnings name the pass that stopped.
  if (graph.errors.length > 0 || graph.truncated) {
    const parts: string[] = [];
    if (graph.errors.length > 0) {
      parts.push(
        `factory '${name}' has design errors:\n${
          graph.errors.map(formatFinding).join("\n")
        }`,
      );
    }
    if (graph.truncated) {
      parts.push(
        `factory '${name}' could not be checked in full: the graph ` +
          `analysis stopped at its cap of ${maxStates} states, so ` +
          `its findings rest on a partial exploration. Reduce the ` +
          `stages or the branching between them.`,
      );
    }
    if (graph.warnings.length > 0) {
      parts.push(`warnings:\n${graph.warnings.map(formatFinding).join("\n")}`);
    }
    throw new Error(parts.join("\n"));
  }
  for (const finding of graph.warnings) {
    ctx.logger.info("{warning}", {
      warning: formatFinding(finding),
      ...finding,
    });
  }
  ctx.logger.info("{summary}", {
    summary: `definition '${definition.name}' in '${name}' is valid: ` +
      `${definition.stages.length} stages (${
        definition.stages.map((s) => s.id).join(", ")
      }), ${graph.warnings.length} warning(s)`,
    definition: definition.name,
    digest: await digestOf(definition),
  });
  return { dataHandles: [] };
}

/**
 * The factory's design_page method: the factory definition as a static HTML
 * page (design_page.ts), stored as the factory's design-page file. A factory
 * definition the schema rejects fails as validate does; graph errors and a
 * truncated analysis do not, because the page is where they are shown.
 */
export async function designPageMethod(
  ctx: MethodContextLike,
): Promise<MethodOutput> {
  const name = selfName(ctx);
  const definition = await loadFactoryDefinition(ctx, name);
  if (ctx.createFileWriter === undefined) {
    throw new Error("this method context cannot write files");
  }
  const graph = analyzeDefinition(definition, {
    maxStates: DEFAULT_MAX_STATES,
  });
  const digest = await digestOf(definition);
  const html = renderDesignPage(designView(definition, graph, digest));
  const handle = await ctx.createFileWriter(DESIGN_PAGE_SPEC, DESIGN_PAGE_NAME)
    .writeText(html);
  ctx.logger.info("{summary}", {
    summary: `design page for definition '${definition.name}' in '${name}': ` +
      `${definition.stages.length} stages, ${graph.errors.length} error(s), ` +
      `${graph.warnings.length} warning(s)` +
      (graph.truncated ? ", analysis truncated" : "") +
      `; save it with: swamp data get ${name} ${DESIGN_PAGE_NAME} --json ` +
      `| jq -r .content > ${definition.name}.html`,
    definition: definition.name,
    digest,
    errors: graph.errors.length,
    warnings: graph.warnings.length,
    truncated: graph.truncated,
  });
  return { dataHandles: [handle] };
}

const KEY_ALPHABET = "abcdefghijklmnopqrstuvwxyz234567";

// swamp's definition names: at most 64 characters matching
// ^[a-z0-9][a-z0-9_-]*$ (DEFINITION_NAME_MAX_LENGTH and
// DEFINITION_NAME_PATTERN in swamp's src/domain/definitions/definition.ts).
const KEY_MAX_LENGTH = 64;
// The random tail: 32^4 keys per slug. Only work with the same factory
// definition and slug can collide, and freshKey retries when it does.
const KEY_SUFFIX_LENGTH = 4;
// Today's cap on the factory definition prefix, so the slug always keeps at
// least 64 - 55 - 2 - 4 = 3 characters.
const KEY_PREFIX_MAX_LENGTH = 55;

// Words a title's slug leaves out. A ticket's display id keeps all its words.
const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

/** Lowercase ASCII words: accents removed, every other character a break. */
function slugWords(text: string): string[] {
  return text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase()
    .split(/[^a-z0-9]+/).filter((w) => w !== "");
}

/**
 * A title's slug for a work-item key, at most `budget` characters: an
 * optional ticket display id's words, then the title's words without stop
 * words (all of them if nothing else is left), joined by '-'. Whole words are
 * kept while they fit; a first word longer than the budget is cut.
 */
export function keySlug(title: string, budget: number, id = ""): string {
  const titleWords = slugWords(title);
  const kept = titleWords.filter((w) => !STOP_WORDS.has(w));
  const words = [
    ...slugWords(id),
    ...(kept.length > 0 ? kept : titleWords),
  ];
  if (words.length === 0) {
    throw new Error(
      `the title '${title}' has no letters or digits to make a key from; ` +
        "a key keeps only ASCII letters and digits, with accents removed",
    );
  }
  let slug = words[0].slice(0, budget);
  for (const word of words.slice(1)) {
    if (slug.length + 1 + word.length > budget) break;
    slug += `-${word}`;
  }
  return slug;
}

/** A fresh work-item key: <factory definition>-<slug>-<4 base32 characters>. */
export function generateKey(
  definitionName: string,
  title: string,
  id = "",
): string {
  const bytes = crypto.getRandomValues(new Uint8Array(KEY_SUFFIX_LENGTH));
  const suffix = Array.from(bytes, (b) => KEY_ALPHABET[b % 32]).join("");
  const prefix = definitionName.length > KEY_PREFIX_MAX_LENGTH
    ? definitionName.slice(0, KEY_PREFIX_MAX_LENGTH).replace(/[-_]+$/, "")
    : definitionName;
  const budget = KEY_MAX_LENGTH - prefix.length - KEY_SUFFIX_LENGTH - 2;
  return `${prefix}-${keySlug(title, budget, id)}-${suffix}`;
}

/** A fresh work-item key that no definition uses yet. */
export async function freshKey(
  ctx: { definitionRepository?: DefinitionLookup },
  definitionName: string,
  title: string,
  id = "",
): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const key = generateKey(definitionName, title, id);
    if (await ctx.definitionRepository?.findByNameGlobal(key) == null) {
      return key;
    }
  }
  throw new Error("could not find a free work-item key; try again");
}

/** The factory's new_key method: a key for the work's title no definition uses
 * yet. */
export async function newKey(
  ctx: MethodContextLike,
  title: string,
): Promise<MethodOutput> {
  const definition = await loadFactoryDefinition(ctx, selfName(ctx));
  const key = await freshKey(ctx, definition.name, title);
  if (ctx.writeResource === undefined) {
    throw new Error("this method context cannot write resources");
  }
  const handle = await ctx.writeResource(KEY_SPEC, KEY_NAME, { key });
  ctx.logger.info("{key}", {
    key,
    next:
      `swamp model @swamp/gatorwalk-factory/work-item method run start ${key} --input factory=${
        selfName(ctx)
      }`,
  });
  return { dataHandles: [handle] };
}

function selfName(ctx: MethodContextLike): string {
  const name = ctx.definition?.name;
  if (name === undefined || name === "") {
    throw new Error("this method context has no definition name");
  }
  return name;
}

// --- the pinned factory definition ----------------------------------------------

export interface Pinned {
  factory: string;
  digest: string;
  definition: FactoryDefinition;
}

/** Pin a factory definition to the work item; returns the version written. */
async function pin(
  ctx: MethodContextLike,
  handles: unknown[],
  factory: string,
  definition: FactoryDefinition,
): Promise<{ digest: string; version: number }> {
  if (ctx.writeResource === undefined) {
    throw new Error("this method context cannot write resources");
  }
  const digest = await digestOf(definition);
  const handle = await ctx.writeResource(DEFINITION_SPEC, DEFINITION_NAME, {
    factory,
    digest,
    definition: jsonSafe(definition),
  });
  handles.push(handle);
  return { digest, version: handle.version };
}

/**
 * The factory definition this run is pinned to: exactly the version its run
 * record names, checked against its digest. A copy pinned by an interrupted
 * reset is never used by mistake.
 */
async function readPinned(
  ctx: MethodContextLike,
  run: RunRecord,
): Promise<Pinned> {
  if (run.definition.version === undefined) {
    // Every run the model types start names its pinned version; reading the
    // latest copy instead could pick up an unused one.
    throw new Error("the run names no pinned definition version to read");
  }
  return checkPinned(
    await ctx.readResource?.(DEFINITION_NAME, run.definition.version) ?? null,
    run,
  );
}

/**
 * A pinned factory definition record, parsed and checked against the digest the
 * run recorded. Shared with the summary report, which reads the record through
 * swamp's data repository rather than a method context.
 */
export async function checkPinned(
  record: Record<string, unknown> | null,
  run: RunRecord,
): Promise<Pinned> {
  if (record === null) {
    throw new Error("the work item's pinned definition is missing");
  }
  const parsed = parseDefinition(record.definition);
  if (!parsed.ok) {
    throw new Error(
      `the pinned definition is invalid:\n${parsed.errors.join("\n")}`,
    );
  }
  if (await digestOf(parsed.value) !== run.definition.digest) {
    throw new Error(
      "the pinned definition does not match the digest the run recorded",
    );
  }
  return {
    factory: String(record.factory),
    digest: run.definition.digest,
    definition: parsed.value,
  };
}

interface Session {
  /** Commits through committingStore: awaiting events and metrics. */
  store: RunStore;
  /** The plain store, for a commit under a different factory definition. */
  base: RunStore;
  handles: unknown[];
  run: RunRecord;
  pinned: Pinned;
}

/** Write the derived metrics record for a committed run. */
async function writeMetrics(
  ctx: MethodContextLike,
  handles: unknown[],
  run: RunRecord,
  definition: FactoryDefinition,
): Promise<void> {
  if (ctx.writeResource === undefined) {
    throw new Error("this method context cannot write resources");
  }
  handles.push(
    await ctx.writeResource(
      METRICS_SPEC,
      METRICS_NAME,
      computeMetrics(run, definition) as unknown as Record<string, unknown>,
    ),
  );
}

/**
 * The store every work-item write commits through: it notes changes in the
 * exits a person holds, then writes the derived metrics record after the run.
 * The run is committed by then, so a failed metrics write is logged, not
 * thrown: the write took effect, and rebuild_metrics brings the record level.
 */
function committing(
  ctx: MethodContextLike,
  base: RunStore,
  handles: unknown[],
  definition: FactoryDefinition,
  env: Env,
): RunStore {
  return committingStore(base, definition, env, async (run) => {
    try {
      await writeMetrics(ctx, handles, run, definition);
    } catch (error) {
      ctx.logger.info("{warning}", {
        warning: `the metrics record was not written (${
          error instanceof Error ? error.message : String(error)
        }); the change itself is committed. Run rebuild_metrics to write it.`,
      });
    }
  });
}

async function open(ctx: MethodContextLike, env: Env): Promise<Session> {
  const handles: unknown[] = [];
  const base = contextStore(ctx, handles);
  const run = await loadRun(base);
  if (run === null) {
    throw new Error(
      "the work item has not started; run start with --input factory=<factory>",
    );
  }
  const pinned = await readPinned(ctx, run);
  return {
    store: committing(ctx, base, handles, pinned.definition, env),
    base,
    handles,
    run,
    pinned,
  };
}

function unwrap<T>(result: OpResult<T>): { run: RunRecord; value: T } {
  if (!result.ok) throw new Error(result.reason);
  return result;
}

// --- the work-item methods ------------------------------------------------------

export async function startWorkItem(
  ctx: MethodContextLike,
  args: {
    factory: string;
    externalRefs?: Record<string, string> | string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  const key = selfName(ctx);
  // Parsed before anything is read or written, so bad input changes nothing.
  const externalRefs = externalRefsFrom(args.externalRefs);
  const handles: unknown[] = [];
  const base = contextStore(ctx, handles);
  const existing = await loadRun(base);
  if (existing !== null) {
    throw new Error(
      `work item '${key}' has already started; run status to see where it is`,
    );
  }
  const definition = await loadFactoryDefinition(ctx, args.factory);
  // Pin first, then commit the run that names the pinned version.
  const pinned = await pin(ctx, handles, args.factory, definition);
  const started = unwrap(
    await startRun(
      committing(ctx, base, handles, definition, env),
      definition,
      {
        key,
        externalRefs,
        definitionDigest: pinned.digest,
        definitionVersion: pinned.version,
      },
      actorOf(ctx, args.onBehalfOf),
      env,
    ),
  );
  ctx.logger.info("{summary}", {
    summary: `started '${key}' at stage '${started.run.stage}' ` +
      `(definition '${definition.name}' from '${args.factory}')`,
    ...expectationProps(started.run),
  });
  return { dataHandles: handles };
}

function expectationProps(run: RunRecord) {
  return {
    expectedStage: run.stage,
    expectedCycle: currentCycle(run),
    expectedEra: run.era,
  };
}

/**
 * An exit's human-approval gate ids, split by whether a person must decide
 * them now. A driver needs them to tell an exit a person must decide from one
 * it may take on its own, including once the gate is satisfied and the exit
 * shows ready. A conditional approval whose `when` is false is not required;
 * one whose `when` cannot be evaluated is, so the driver stops and asks.
 */
function humanGatesOf(gates: GateCheck[]): {
  humanGates: string[];
  humanGatesNotRequired: string[];
} {
  const ids = (required: boolean) =>
    gates.flatMap((g) =>
      g.gateId !== undefined && (g.required !== false) === required
        ? [g.gateId]
        : []
    );
  return { humanGates: ids(true), humanGatesNotRequired: ids(false) };
}

/** Everything a caller needs to act next, as data. */
export async function describeStatus(
  ctx: MethodContextLike,
  env: Env,
) {
  const { store, run, pinned } = await open(ctx, env);
  const definition = pinned.definition;
  const context = await buildCelContext(run, store);
  const active = run.status === "active";
  return {
    key: run.key,
    definition: {
      name: definition.name,
      factory: pinned.factory,
      digest: pinned.digest,
    },
    status: run.status,
    stage: run.stage,
    cycle: currentCycle(run),
    era: run.era,
    expected: expectationProps(run),
    dispatch: active ? buildDispatch(definition, run, context) : null,
    dispatchCap: active ? dispatchCap(run, definition) : null,
    exits: active
      ? (await evaluateTransitions(run, definition, store, env)).map((t) => ({
        name: t.name,
        to: t.to,
        manual: t.manual,
        ...humanGatesOf(t.gates),
        ready: t.ready,
        failures: t.failures,
      }))
      : [],
    validations: run.validations,
    products: run.products,
  };
}

export async function status(
  ctx: MethodContextLike,
  env: Env,
): Promise<MethodOutput> {
  const view = await describeStatus(ctx, env);
  const lines = [
    `${view.key}: ${view.status} at stage '${view.stage}' cycle ${view.cycle}`,
    `  expect: --input expectedStage=${view.expected.expectedStage} ` +
    `--input expectedCycle=${view.expected.expectedCycle} ` +
    `--input expectedEra=${view.expected.expectedEra}`,
    ...view.exits.map((e) =>
      `  exit ${e.name} -> ${e.to}${e.manual ? " (manual)" : ""}${
        e.humanGates.length > 0 ? ` [human: ${e.humanGates.join(", ")}]` : ""
      }${
        e.humanGatesNotRequired.length > 0
          ? ` [approval not required now: ${
            e.humanGatesNotRequired.join(", ")
          }]`
          : ""
      }: ${e.ready ? "ready" : `not ready: ${e.failures.join("; ")}`}`
    ),
  ];
  if (view.dispatch !== null && view.dispatchCap !== null) {
    const cap = view.dispatchCap;
    lines.push(
      `  work: ${view.dispatch.mode}; dispatches this cycle ${cap.count} of ${
        cap.limit + cap.granted
      }`,
    );
  }
  if (view.dispatch !== null && !view.dispatch.ready) {
    lines.push(`  dispatch not ready: ${view.dispatch.problems.join("; ")}`);
  }
  // Rejections are retry feedback; the log is the only place a CLI caller
  // sees them without reading the run record.
  for (const kind of ["artifacts", "evidence"] as const) {
    for (const [name, v] of Object.entries(view.validations[kind])) {
      lines.push(
        `  rejected ${kind === "artifacts" ? "artifact" : "evidence"} ` +
          `'${name}' (stage '${v.stage}' cycle ${v.cycle}): ${
            v.errors.join("; ")
          }`,
      );
    }
  }
  ctx.logger.info("{summary}", { summary: lines.join("\n"), status: view });
  return { dataHandles: [] };
}

export async function recordProductMethod(
  ctx: MethodContextLike,
  kind: ProductKind,
  args: {
    name: string;
    payload: Record<string, unknown> | string;
    expectedStage: string;
    expectedCycle: number;
    expectedEra: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  const { store, handles, pinned } = await open(ctx, env);
  const result = await recordProduct(
    store,
    pinned.definition,
    expectedFrom(args),
    kind,
    args.name,
    payloadFrom(args.payload),
    actorOf(ctx, args.onBehalfOf),
    env,
  );
  if (!result.ok && result.rejected) {
    throw new Error(
      `${kind} '${args.name}' was rejected and kept as retry feedback:\n${
        result.errors.join("\n")
      }`,
    );
  }
  if (!result.ok) throw new Error(result.reason);
  ctx.logger.info("{summary}", {
    summary: `recorded ${kind} '${args.name}' version ${result.version}`,
    version: result.version,
    digest: result.digest,
  });
  return { dataHandles: handles };
}

export async function dispatch(
  ctx: MethodContextLike,
  args: {
    expectedStage: string;
    expectedCycle: number;
    expectedEra: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  const { store, handles, run, pinned } = await open(ctx, env);
  const packet = buildDispatch(
    pinned.definition,
    run,
    await buildCelContext(run, store),
  );
  if (!packet.ready) {
    throw new Error(
      `stage '${packet.stage}' is not ready to dispatch:\n${
        packet.problems.join("\n")
      }`,
    );
  }
  const recorded = unwrap(
    await update(store, (current) =>
      recordDispatch(
        current,
        pinned.definition,
        expectedFrom(args),
        {
          inputs: packet.inputs ?? packet.values,
          ...(packet.prompt !== undefined ? { prompt: packet.prompt } : {}),
          ...(packet.command !== undefined ? { command: packet.command } : {}),
        },
        actorOf(ctx, args.onBehalfOf),
        env,
      )),
  );
  ctx.logger.info("{summary}", {
    // The whole packet goes into the text, since a CLI caller sees only the
    // log message: the prompt as written, then everything else as JSON.
    summary:
      `dispatch ${recorded.value} for stage '${packet.stage}' cycle ${packet.cycle}` +
      (packet.prompt !== undefined ? `\n${packet.prompt}` : "") +
      `\npacket: ${JSON.stringify({ ...packet, prompt: undefined }, null, 2)}`,
    dispatchId: recorded.value,
    packet,
  });
  return { dataHandles: handles };
}

export async function recordUsageMethod(
  ctx: MethodContextLike,
  args: {
    dispatchId: number;
    inputTokens: number;
    outputTokens: number;
    model?: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  const { store, handles } = await open(ctx, env);
  unwrap(
    await update(store, (run) =>
      recordUsage(
        run,
        args.dispatchId,
        {
          inputTokens: args.inputTokens,
          outputTokens: args.outputTokens,
          ...(args.model !== undefined ? { model: args.model } : {}),
        },
        actorOf(ctx, args.onBehalfOf),
        env,
      )),
  );
  ctx.logger.info("{summary}", {
    summary: `recorded usage for dispatch ${args.dispatchId}`,
  });
  return { dataHandles: handles };
}

export async function decide(
  ctx: MethodContextLike,
  decision: "approve" | "decline",
  args: {
    gateId: string;
    note?: string;
    expectedStage: string;
    expectedCycle: number;
    expectedEra: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  const { store, handles, pinned } = await open(ctx, env);
  const recorded = unwrap(
    await update(store, (run) =>
      recordApproval(
        run,
        pinned.definition,
        expectedFrom(args),
        {
          gateId: args.gateId,
          decision,
          ...(args.note !== undefined ? { note: args.note } : {}),
        },
        actorOf(ctx, args.onBehalfOf),
        env,
      )),
  );
  ctx.logger.info("{summary}", {
    summary:
      `${decision === "approve" ? "approved" : "declined"} '${args.gateId}' ` +
      `(decision ${recorded.value})`,
  });
  return { dataHandles: handles };
}

export async function grantOverrideMethod(
  ctx: MethodContextLike,
  args: {
    kind: "cycle" | "dispatch";
    stage?: string;
    note?: string;
    expectedStage: string;
    expectedCycle: number;
    expectedEra: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  if (args.kind === "cycle" && args.stage === undefined) {
    throw new Error(
      "a cycle override names the stage it is for: --input stage=<id>",
    );
  }
  const { store, handles, pinned } = await open(ctx, env);
  const input = args.kind === "cycle"
    ? { kind: "cycle" as const, stage: args.stage as string, note: args.note }
    : { kind: "dispatch" as const, note: args.note };
  const granted = unwrap(
    await update(store, (run) =>
      grantOverride(
        run,
        pinned.definition,
        expectedFrom(args),
        input,
        actorOf(ctx, args.onBehalfOf),
        env,
      )),
  );
  ctx.logger.info("{summary}", {
    summary: `granted ${args.kind} override ${granted.value}`,
  });
  return { dataHandles: handles };
}

export async function advanceMethod(
  ctx: MethodContextLike,
  args: {
    transition: string;
    confirm?: boolean;
    expectedStage: string;
    expectedCycle: number;
    expectedEra: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  const { store, handles, pinned } = await open(ctx, env);
  const gates = makeGateEvaluator(pinned.definition, store, env);
  const moved = unwrap(
    await update(store, (run) =>
      advance(
        run,
        pinned.definition,
        expectedFrom(args),
        { transition: args.transition, manualConfirmed: args.confirm === true },
        gates,
        actorOf(ctx, args.onBehalfOf),
        env,
      )),
  );
  ctx.logger.info("{summary}", {
    summary:
      `took '${args.transition}' to stage '${moved.run.stage}' cycle ${
        currentCycle(moved.run)
      }` + (moved.run.status === "terminal" ? " (finished)" : ""),
    ...expectationProps(moved.run),
  });
  return { dataHandles: handles };
}

export async function resetMethod(
  ctx: MethodContextLike,
  args: {
    confirm: string;
    repin?: boolean;
    expectedStage: string;
    expectedCycle: number;
    expectedEra: string;
    onBehalfOf?: string;
  },
  env: Env,
): Promise<MethodOutput> {
  if (args.confirm !== "reset") {
    throw new Error(
      "reset starts the work item over in a new era; pass --input confirm=reset",
    );
  }
  const { store, base, handles, run, pinned } = await open(ctx, env);
  // Check the expectation before writing a new pin.
  const current = expectedOf(run);
  const expected = expectedFrom(args);
  if (
    current.stage !== expected.stage || current.cycle !== expected.cycle ||
    current.era !== expected.era
  ) {
    unwrap(
      reset(
        run,
        pinned.definition,
        expected,
        actorOf(ctx, args.onBehalfOf),
        env,
      ),
    );
  }
  let definition = pinned.definition;
  let repinned: { digest: string; version: number } | undefined;
  let commitStore = store;
  if (args.repin === true) {
    definition = await loadFactoryDefinition(ctx, pinned.factory);
    repinned = await pin(ctx, handles, pinned.factory, definition);
    // The reset commits under the newly pinned factory definition.
    commitStore = committing(ctx, base, handles, definition, env);
  }
  const result = unwrap(
    await update(
      commitStore,
      (latest) =>
        reset(
          latest,
          definition,
          expected,
          actorOf(ctx, args.onBehalfOf),
          env,
          repinned,
        ),
    ),
  );
  ctx.logger.info("{summary}", {
    summary: `reset: new era ${result.value} at stage '${result.run.stage}'` +
      (repinned !== undefined ? ` with definition ${repinned.digest}` : ""),
    ...expectationProps(result.run),
  });
  return { dataHandles: handles };
}

/**
 * The summary method: the work item's timeline and metrics as markdown,
 * rendered from the run and its pinned factory definition. A read; the summary
 * report persists the same rendering after it.
 */
export async function summary(
  ctx: MethodContextLike,
  env: Env,
): Promise<MethodOutput> {
  const { run, pinned } = await open(ctx, env);
  const built = buildSummary(run, pinned.definition);
  ctx.logger.info("{summary}", {
    summary: built.markdown,
    metrics: built.metrics,
  });
  return { dataHandles: [] };
}

/**
 * Rewrite the derived metrics record from the run when it is missing or
 * behind: after a failed metrics write, or for a work item that has not
 * committed since metrics were introduced. Writes nothing when it is level.
 */
export async function rebuildMetrics(
  ctx: MethodContextLike,
  env: Env,
): Promise<MethodOutput> {
  const { handles, run, pinned } = await open(ctx, env);
  const stored = await ctx.readResource?.(METRICS_NAME) ?? null;
  const current = computeMetrics(run, pinned.definition);
  if (
    stored !== null && stored.schemaVersion === current.schemaVersion &&
    stored.journalVersion === current.journalVersion
  ) {
    ctx.logger.info("{summary}", {
      summary:
        `metrics are up to date at journal version ${current.journalVersion}`,
    });
    return { dataHandles: [] };
  }
  await writeMetrics(ctx, handles, run, pinned.definition);
  ctx.logger.info("{summary}", {
    summary: `rebuilt metrics at journal version ${current.journalVersion}` +
      (stored === null
        ? " (there were none)"
        : ` (they were at ${String(stored.journalVersion)})`),
  });
  return { dataHandles: handles };
}
