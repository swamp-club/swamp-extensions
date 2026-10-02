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
  type FactoryDefinition,
  findStage,
  transitionsFrom,
} from "./definition_schema.ts";
import { evaluateGates } from "./gates.ts";
import {
  currentPark,
  cycleLimitFor,
  dispatchCap,
  type Env,
  lastAwaitingEvent,
} from "./run_ops.ts";
import { currentCycle, parseRun, type RunRecord } from "./run_record.ts";
import { payloadName, RUN_NAME, type RunStore } from "./run_store.ts";
import type {
  BoardCard,
  CardExit,
  Park,
  WorkItemProblem,
} from "./studio_cards.ts";
import type { StudioEvent } from "./studio_server.ts";

export type { BoardCard, CardExit, Park, WorkItemProblem };
import {
  checkPinned,
  DEFINITION_NAME,
  recordObject,
  safePart,
  WORK_ITEM_TYPE,
} from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's reads of work items (DESIGN.md, "The studio server"): every
// read goes through swamp's data query, the method context's queryData, so it
// works whatever datastore holds the records. Nothing here writes.
//
// A value put in a predicate passes safePart first, so no factory name or key
// can change the query. The board reads every work item of one factory with
// one query for their run records and one for their pinned factory
// definitions; the work-item page (#2944) reads one.
// ---------------------------------------------------------------------------

/** swamp's data query, as the method context gives it. */
export type QueryData = (
  predicate: string,
  select?: string,
) => Promise<unknown[]>;

/** The predicate for every run record of a factory's work items. */
export function runsPredicate(factory: string): string {
  return `modelType == "${WORK_ITEM_TYPE}" && name == "${RUN_NAME}" && ` +
    `attributes.factory == "${safePart("factory", factory)}"`;
}

/** The predicate for one work item's run record. */
export function runPredicate(key: string): string {
  return `modelName == "${safePart("work item", key)}" && ` +
    `name == "${RUN_NAME}"`;
}

/** The model name a query result names, when it carries one. */
function modelNameOf(record: unknown): string | undefined {
  const name = record !== null && typeof record === "object"
    ? (record as { modelName?: unknown }).modelName
    : undefined;
  return typeof name === "string" && name !== "" ? name : undefined;
}

/** A query result's version, or 0 when it carries none. */
function versionOf(record: unknown): number {
  const v = record !== null && typeof record === "object"
    ? (record as { version?: unknown }).version
    : undefined;
  return typeof v === "number" ? v : 0;
}

/** When a run last changed: its latest journal event. */
function lastAt(run: RunRecord): string {
  return run.journal.at(-1)?.at ?? "";
}

/**
 * The run record of every work item started on `factory`, latest versions
 * only. A record that does not parse is a problem, never a dropped item. Two
 * records for one key (a work item deleted and made again keeps the old
 * instance's data) keep the one that changed last.
 */
export async function readRuns(
  query: QueryData,
  factory: string,
): Promise<{ runs: RunRecord[]; problems: WorkItemProblem[] }> {
  const byKey = new Map<string, RunRecord>();
  const problems: WorkItemProblem[] = [];
  for (const record of await query(runsPredicate(factory))) {
    const data = recordObject(record);
    const parsed = parseRun(data);
    if (!parsed.ok) {
      const key = modelNameOf(record) ??
        (typeof data?.key === "string" ? data.key : "(unknown)");
      problems.push({
        key,
        error: `its run record does not parse: ${parsed.errors.join("; ")}`,
      });
      continue;
    }
    const run = parsed.value;
    const held = byKey.get(run.key);
    if (held === undefined || lastAt(run) > lastAt(held)) {
      byKey.set(run.key, run);
    }
  }
  const runs = [...byKey.values()].sort((a, b) =>
    a.key < b.key ? -1 : a.key > b.key ? 1 : 0
  );
  return { runs, problems };
}

/**
 * Each run record's work item and version, as one string: it changes
 * whenever any of them is written, added or removed, so a poll compares it
 * without reading whole records.
 */
export async function versionSignature(
  query: QueryData,
  predicate: string,
): Promise<string> {
  const pairs = (await query(predicate, "[modelName, version]")).map((p) =>
    JSON.stringify(p)
  );
  return pairs.sort().join("\n");
}

/**
 * The pinned factory definition of each run, by the digest it recorded. One
 * query reads the latest pinned copy of every work item of `factory`; a run
 * whose copy is not among them (a repinning reset cut short) is read by the
 * exact version it names. A copy counts only when its digest is the one the
 * run recorded (checkPinned), so a run is never shown against another
 * definition. A run whose copy cannot be read is a problem.
 */
export async function pinnedDefinitions(
  query: QueryData,
  factory: string,
  runs: RunRecord[],
): Promise<{
  definitions: Map<string, FactoryDefinition>;
  problems: WorkItemProblem[];
}> {
  const definitions = new Map<string, FactoryDefinition>();
  const problems: WorkItemProblem[] = [];
  const wanted = new Map<string, RunRecord>();
  for (const run of runs) wanted.set(run.definition.digest, run);
  const latest = await query(
    `modelType == "${WORK_ITEM_TYPE}" && name == "${DEFINITION_NAME}" && ` +
      `attributes.factory == "${safePart("factory", factory)}"`,
  );
  for (const record of latest) {
    const data = recordObject(record);
    const run = typeof data?.digest === "string"
      ? wanted.get(data.digest)
      : undefined;
    if (run === undefined || definitions.has(run.definition.digest)) continue;
    try {
      definitions.set(
        run.definition.digest,
        (await checkPinned(data, run)).definition,
      );
    } catch {
      // Not the copy it claims to be; the run is read by version below.
    }
  }
  for (const run of runs) {
    if (definitions.has(run.definition.digest)) continue;
    try {
      definitions.set(
        run.definition.digest,
        await pinnedByVersion(query, run),
      );
    } catch (e) {
      problems.push({
        key: run.key,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }
  return { definitions, problems };
}

async function pinnedByVersion(
  query: QueryData,
  run: RunRecord,
): Promise<FactoryDefinition> {
  if (run.definition.version === undefined) {
    throw new Error("its pinned definition is missing");
  }
  const found = await query(
    `modelName == "${safePart("work item", run.key)}" && ` +
      `name == "${DEFINITION_NAME}" && version == ${run.definition.version}`,
  );
  const refusals: string[] = [];
  for (const record of found) {
    try {
      return (await checkPinned(recordObject(record), run)).definition;
    } catch (e) {
      refusals.push(e instanceof Error ? e.message : String(e));
    }
  }
  throw new Error(
    refusals.length > 0
      ? `its pinned definition at version ${run.definition.version}: ${
        refusals.join("; ")
      }`
      : "its pinned definition is missing",
  );
}

/**
 * A work item's records, read-only, through the data query: what gate checks
 * read (the run and its product payloads). Writing throws.
 */
export function queryStore(query: QueryData, key: string): RunStore {
  const item = safePart("work item", key);
  const read = async (name: string, version?: number) => {
    const found = await query(
      `modelName == "${item}" && name == "${safePart("record", name)}"` +
        (version === undefined ? "" : ` && version == ${version}`),
    );
    // swamp's query gives latest versions only unless one is named; should
    // a datastore give more, the newest wins.
    const newest = [...found].sort((a, b) => versionOf(b) - versionOf(a));
    for (const record of newest) {
      const data = recordObject(record);
      if (data !== null) return data;
    }
    return null;
  };
  const readOnly = () => {
    throw new Error("the studio only reads");
  };
  return {
    readRun: () => read(RUN_NAME),
    writeRun: readOnly,
    writePayload: readOnly,
    readPayload: (kind, name, version) =>
      read(payloadName(kind, name), version),
  };
}

// --- the board's cards -----------------------------------------------------------

/**
 * When the current stage entry began: the advance into this stage and
 * cycle, else the start or reset that began the era at its initial stage.
 * An advance is journaled under the stage it leaves, so it is found by `to`.
 */
export function enteredAt(run: RunRecord): string | null {
  const cycle = currentCycle(run);
  let eraStart: string | null = null;
  for (const e of run.journal) {
    if (e.era !== run.era) continue;
    eraStart ??= e.at;
  }
  for (let i = run.journal.length - 1; i >= 0; i--) {
    const e = run.journal[i];
    if (e.era !== run.era) continue;
    if (e.type === "advanced" && e.to === run.stage && e.toCycle === cycle) {
      return e.at;
    }
  }
  return cycle === 1 ? eraStart : null;
}

/**
 * Held only by a person, from the last `awaiting` event of the stage entry:
 * since the earliest of its exits became held (a cooldown lifts at
 * `readyAt`), counting only exits held by `now`.
 */
export function waitingOf(
  run: RunRecord,
  now: string,
): { since: string; exits: CardExit[] } | null {
  if (run.status !== "active") return null;
  const event = lastAwaitingEvent(run);
  if (event === undefined) return null;
  const held = event.exits.filter((x) => (x.readyAt ?? event.at) <= now);
  if (held.length === 0) return null;
  const since = held.map((x) => x.readyAt ?? event.at).sort()[0];
  return {
    since,
    exits: held.map((x) => ({
      transition: x.transition,
      to: x.to,
      manual: x.manual,
      gateIds: [...x.gateIds],
    })),
  };
}

/**
 * What only an override lets go on: a dispatch cap the stage entry is parked
 * at, and each exit whose gates all pass but whose cycle limit refuses entry
 * to the stage it leads to. Gates are checked only for an exit a cycle limit
 * closes, so most work items read nothing more.
 */
export async function parksOf(
  run: RunRecord,
  definition: FactoryDefinition,
  store: RunStore,
  env: Env,
): Promise<Park[]> {
  if (run.status !== "active") return [];
  const parks: Park[] = [];
  const hold = currentPark(run, dispatchCap(run, definition));
  if (hold !== undefined) {
    parks.push({
      kind: "dispatch-cap",
      count: hold.count,
      limit: hold.limit,
      granted: hold.granted,
    });
  }
  const stage = findStage(definition, run.stage);
  if (stage === undefined) return parks;
  for (const transition of transitionsFrom(definition, stage)) {
    const limit = cycleLimitFor(run, definition, transition);
    if (limit === null || limit.allowed) continue;
    const checks = await evaluateGates(run, definition, transition, store, env);
    if (!checks.every((c) => c.pass)) continue;
    parks.push({
      kind: "cycle-limit",
      transition: transition.name,
      to: transition.to,
      count: limit.count,
      limit: limit.limit,
      granted: limit.granted,
    });
  }
  return parks;
}

/** The ticket the work item is linked to, as people know it. */
export function trackerRefOf(run: RunRecord): string | null {
  const kind = run.tracker.kind;
  return run.externalRefs[`${kind}.display`] || run.externalRefs[kind] ||
    null;
}

/**
 * A work item's card. Without its pinned definition (`definition` null),
 * the card still shows where the work is, and says why parks are unknown.
 */
export async function boardCard(
  run: RunRecord,
  definition: FactoryDefinition | null,
  store: RunStore,
  env: Env,
): Promise<BoardCard> {
  const card: BoardCard = {
    key: run.key,
    title: run.title ?? null,
    trackerRef: trackerRefOf(run),
    status: run.status,
    stage: run.stage,
    cycle: currentCycle(run),
    enteredAt: enteredAt(run),
    waiting: waitingOf(run, env.now()),
    parked: [],
    pinnedDigest: run.definition.digest,
  };
  if (definition === null) {
    card.problem = "its pinned definition could not be read, so whether it " +
      "is parked is unknown";
    return card;
  }
  try {
    card.parked = await parksOf(run, definition, store, env);
  } catch (e) {
    card.problem = `whether it is parked could not be worked out: ${
      e instanceof Error ? e.message : String(e)
    }`;
  }
  return card;
}

/** The board for one factory: a card per work item, and what could not be read. */
export async function readBoard(
  query: QueryData,
  factory: string,
  env: Env,
): Promise<{ cards: BoardCard[]; problems: WorkItemProblem[] }> {
  const { runs, problems } = await readRuns(query, factory);
  const pinned = await pinnedDefinitions(query, factory, runs);
  const cards: BoardCard[] = [];
  for (const run of runs) {
    cards.push(
      await boardCard(
        run,
        pinned.definitions.get(run.definition.digest) ?? null,
        queryStore(query, run.key),
        env,
      ),
    );
  }
  return { cards, problems: [...problems, ...pinned.problems] };
}

// --- live updates ----------------------------------------------------------------

export interface WorkItemWatch {
  /**
   * Watch the run records `predicate` matches, telling `event` when any is
   * written, added or removed. The first ask reads where they stand, so a
   * change after it is never missed; asking again keeps the watch alive.
   */
  ask(event: StudioEvent, predicate: string): Promise<void>;
  /**
   * One poll: read each watch's versions and tell each that changed. A watch
   * not asked for in the expiry is dropped, so a closed page costs nothing.
   */
  tick(): Promise<void>;
  /** How many watches are live, for the tests. */
  size(): number;
}

/**
 * The studio's poll of run records. Run records can be in any datastore
 * (S3, GCS), not files the studio could watch, so a change is seen by
 * reading each watched set's work items and versions, a projection rather
 * than whole records, every few seconds while a page asks for it.
 */
export function watchWorkItems(
  query: QueryData,
  emit: (event: StudioEvent) => void,
  options: { now?: () => number; expiryMs?: number } = {},
): WorkItemWatch {
  const now = options.now ?? Date.now;
  const expiryMs = options.expiryMs ?? 5 * 60 * 1000;
  const watches = new Map<
    string,
    {
      event: StudioEvent;
      predicate: string;
      signature: string;
      askedAt: number;
    }
  >();
  return {
    async ask(event, predicate) {
      const id = JSON.stringify([event, predicate]);
      const held = watches.get(id);
      if (held !== undefined) {
        held.askedAt = now();
        return;
      }
      const signature = await versionSignature(query, predicate);
      watches.set(id, { event, predicate, signature, askedAt: now() });
    },
    async tick() {
      for (const [id, watch] of watches) {
        if (now() - watch.askedAt > expiryMs) {
          watches.delete(id);
          continue;
        }
        let signature: string;
        try {
          signature = await versionSignature(query, watch.predicate);
        } catch {
          // A read that failed (a datastore hiccup); the next poll tries again.
          continue;
        }
        if (signature === watch.signature) continue;
        watch.signature = signature;
        emit(watch.event);
      }
    },
    size: () => watches.size,
  };
}
