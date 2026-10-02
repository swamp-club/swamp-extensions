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

import { noteAwaiting } from "./awaiting.ts";
import { digestOf, jsonSafe } from "./canonical.ts";
import type { Actor, ProductKind } from "./journal.ts";
import type { FactoryDefinition } from "./definition_schema.ts";
import {
  acceptProduct,
  checkExpected,
  checkProduct,
  type Env,
  type Expected,
  type OpResult,
  rejectProduct,
  start,
  type StartInput,
} from "./run_ops.ts";
import { parseRun, type RunRecord } from "./run_record.ts";

// ---------------------------------------------------------------------------
// Storage and the commit protocol.
//
// A work item is one model instance. Inside it, the run record lives under
// the fixed name `run`, and each product's payloads under `artifact-<name>`
// or `evidence-<name>`, where <name> is a name the factory definition declares.
// No record name carries the work item's identity; the instance is the
// identity.
//
// Every change commits by writing the run record last. Payloads are written
// first, so a crash in between leaves a payload version that nothing
// references, which is ignored, never a half-applied change. This needs no
// rollbackOnFailure, which swamp only offers per method and refuses under
// remote placement.
// ---------------------------------------------------------------------------

/** Resource spec names the work-item model type (GW-6) must declare. */
export const RUN_SPEC = "run";
export const ARTIFACT_SPEC = "artifact";
export const EVIDENCE_SPEC = "evidence";

/** The fixed name of the run record inside a work item's instance. */
export const RUN_NAME = "run";

/** The record name holding a product's payload versions. */
export function payloadName(kind: ProductKind, name: string): string {
  return `${kind}-${name}`;
}

/** What the runtime needs from storage. */
export interface RunStore {
  readRun(): Promise<unknown | null>;
  /** Commit a run record; returns the record as committed. */
  writeRun(run: RunRecord): Promise<RunRecord>;
  /** Write a new payload version; returns its version number. */
  writePayload(
    kind: ProductKind,
    name: string,
    payload: Record<string, unknown>,
  ): Promise<number>;
  readPayload(
    kind: ProductKind,
    name: string,
    version: number,
  ): Promise<unknown | null>;
}

/** The subset of swamp's method context the store uses. */
export interface ResourceContext {
  writeResource?(
    specName: string,
    name: string,
    data: Record<string, unknown>,
  ): Promise<{ version: number }>;
  readResource?(
    name: string,
    version?: number,
  ): Promise<Record<string, unknown> | null>;
}

/**
 * A RunStore over a swamp method context's writeResource/readResource. Every
 * handle swamp returns is pushed onto `handles`, so a method can report what
 * it wrote.
 */
export function contextStore(
  context: ResourceContext,
  handles: unknown[] = [],
): RunStore {
  if (
    context.writeResource === undefined || context.readResource === undefined
  ) {
    throw new Error(
      "this method context has no writeResource/readResource; the runtime " +
        "needs a method that runs with data access",
    );
  }
  // Bound, in case the context's helpers rely on `this`.
  const writeResource = context.writeResource.bind(context);
  const readResource = context.readResource.bind(context);
  return {
    readRun: () => readResource(RUN_NAME),
    writeRun: async (run) => {
      handles.push(await writeResource(RUN_SPEC, RUN_NAME, run));
      return run;
    },
    writePayload: async (kind, name, payload) => {
      const spec = kind === "artifact" ? ARTIFACT_SPEC : EVIDENCE_SPEC;
      const handle = await writeResource(
        spec,
        payloadName(kind, name),
        payload,
      );
      handles.push(handle);
      return handle.version;
    },
    readPayload: (kind, name, version) =>
      readResource(payloadName(kind, name), version),
  };
}

/**
 * A store whose every commit first notes any change in the exits held by a
 * person (awaiting.ts), writes the run record, then runs `afterCommit` with
 * what was committed: the model types write the derived metrics record there.
 * It runs after the run record, so a crash in between leaves the metrics one
 * commit behind, never ahead of the run.
 */
export function committingStore(
  base: RunStore,
  definition: FactoryDefinition,
  env: Env,
  afterCommit?: (run: RunRecord) => Promise<void>,
): RunStore {
  return {
    ...base,
    writeRun: async (run) => {
      const committed = await base.writeRun(
        await noteAwaiting(run, definition, base, env),
      );
      await afterCommit?.(committed);
      return committed;
    },
  };
}

/** An in-memory RunStore, for tests. */
export function memoryStore(): RunStore & {
  runVersions: RunRecord[];
  payloads: Map<string, unknown[]>;
} {
  const runVersions: RunRecord[] = [];
  const payloads = new Map<string, unknown[]>();
  return {
    runVersions,
    payloads,
    readRun: () =>
      Promise.resolve(
        runVersions.length === 0
          ? null
          : structuredClone(runVersions[runVersions.length - 1]),
      ),
    writeRun: (run) => {
      runVersions.push(structuredClone(run));
      return Promise.resolve(run);
    },
    writePayload: (kind, name, payload) => {
      const key = payloadName(kind, name);
      const versions = payloads.get(key) ?? [];
      versions.push(structuredClone(payload));
      payloads.set(key, versions);
      return Promise.resolve(versions.length);
    },
    readPayload: (kind, name, version) => {
      const value = payloads.get(payloadName(kind, name))?.[version - 1];
      return Promise.resolve(
        value === undefined ? null : structuredClone(value),
      );
    },
  };
}

// --- operations over a store -------------------------------------------------

/** The committed run record, or null before start. Throws on a record this
 * runtime cannot read. */
export async function loadRun(store: RunStore): Promise<RunRecord | null> {
  const raw = await store.readRun();
  if (raw === null) return null;
  const parsed = parseRun(raw);
  if (!parsed.ok) {
    throw new Error(
      `the run record cannot be read:\n${parsed.errors.join("\n")}`,
    );
  }
  return parsed.value;
}

/** Start a work item; refuses when it has already started. */
export async function startRun(
  store: RunStore,
  definition: FactoryDefinition,
  input: StartInput,
  actor: Actor,
  env: Env,
): Promise<OpResult<string>> {
  const existing = await loadRun(store);
  if (existing !== null) {
    return {
      ok: false,
      reason: `work item '${existing.key}' has already started; read its ` +
        "status to resume, or reset it",
    };
  }
  const run = await store.writeRun(start(definition, input, actor, env));
  return { ok: true, run, value: run.era };
}

/** Apply a pure operation to the committed run and commit the result. */
export async function update<T>(
  store: RunStore,
  op: (run: RunRecord) => OpResult<T> | Promise<OpResult<T>>,
): Promise<OpResult<T>> {
  const run = await loadRun(store);
  if (run === null) {
    return { ok: false, reason: "the work item has not started" };
  }
  const result = await op(run);
  if (!result.ok) return result;
  return { ...result, run: await store.writeRun(result.run) };
}

export type RecordResult =
  | { ok: true; run: RunRecord; version: number; digest: string }
  | { ok: false; rejected: true; run: RunRecord; errors: string[] }
  | { ok: false; rejected: false; reason: string };

/**
 * Record a product. A payload that fails its schema is not written: the
 * rejection is kept on the run as retry feedback and returned, never thrown,
 * so it survives even where the caller's writes would be rolled back.
 */
export async function recordProduct(
  store: RunStore,
  definition: FactoryDefinition,
  expected: Expected,
  kind: ProductKind,
  name: string,
  payload: Record<string, unknown>,
  actor: Actor,
  env: Env,
): Promise<RecordResult> {
  const run = await loadRun(store);
  if (run === null) {
    return {
      ok: false,
      rejected: false,
      reason: "the work item has not started",
    };
  }
  const stale = checkExpected(run, expected);
  if (stale !== null) return { ok: false, rejected: false, reason: stale };
  let digest: string;
  try {
    digest = await digestOf(payload);
  } catch (error) {
    // No JSON form: nothing can be stored or kept as feedback.
    return {
      ok: false,
      rejected: false,
      reason: `the ${kind} payload cannot be stored: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
  const check = checkProduct(run, definition, kind, name, payload);
  if (!check.declared) {
    return { ok: false, rejected: false, reason: check.reason };
  }
  if (check.errors !== null) {
    const next = rejectProduct(
      run,
      kind,
      name,
      payload,
      check.errors,
      actor,
      env,
    );
    const committed = await store.writeRun(next);
    return { ok: false, rejected: true, run: committed, errors: check.errors };
  }
  // Store the JSON-safe form: the digest was taken over it, so the stored
  // version reads back with the same digest.
  const version = await store.writePayload(
    kind,
    name,
    jsonSafe(payload) as Record<string, unknown>,
  );
  const next = acceptProduct(
    run,
    kind,
    name,
    { version, digest, subject: reviewedSubject(run, definition, kind, name) },
    actor,
    env,
  );
  return { ok: true, run: await store.writeRun(next), version, digest };
}

/** For an artifact that reviews another, the subject's current version and
 * digest, which the review is recorded against. */
function reviewedSubject(
  run: RunRecord,
  definition: FactoryDefinition,
  kind: ProductKind,
  name: string,
): { name: string; version: number; digest: string } | undefined {
  if (kind !== "artifact") return undefined;
  const reviews = definition.stages
    .flatMap((s) => s.artifacts ?? [])
    .find((a) => a.name === name)?.reviews;
  if (reviews === undefined) return undefined;
  const subject = run.products.artifacts[reviews];
  return subject === undefined
    ? undefined
    : { name: reviews, version: subject.version, digest: subject.digest };
}
