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
  type AwaitingExit,
  type FactoryDefinition,
  type JournalEvent,
  parseSummary,
  type ProductKind,
  renderSummary,
  type RunRecord,
  type SummaryMeta,
  type TrackerEntry,
  triggerKey,
} from "../../engine/tracker.ts";

// ---------------------------------------------------------------------------
// The ticket view: what a work item's journal says to its tracker ticket
// (DESIGN.md, "The publisher"). Pure: no I/O and no clock, so the
// same run always gives the same comments, and a replay of a delivery key
// asks the ledger for the same write.
// ---------------------------------------------------------------------------

/** A comment for one journal event, keyed on that event's journal version. */
export interface PlannedComment {
  /** The journal's length once this event was written (its index + 1). */
  journalVersion: number;
  body: string;
}

export interface TicketView {
  /** Comments for the events after the cursor, in journal order. */
  comments: PlannedComment[];
  /** The status key of the stage the work item is in now, or null when
   * that stage leaves the ticket's status alone. */
  status: string | null;
}

/**
 * The comments for the journal events after `since` (a journal version),
 * and the status key of the current stage in the pinned factory definition.
 */
export function ticketView(
  run: RunRecord,
  definition: FactoryDefinition,
  since: number,
): TicketView {
  const comments: PlannedComment[] = [];
  for (let i = since; i < run.journal.length; i++) {
    const body = commentFor(run.key, run.journal[i], definition);
    if (body !== null) comments.push({ journalVersion: i + 1, body });
  }
  const stage = definition.stages.find((s) => s.id === run.stage);
  return { comments, status: stage?.tracker?.status ?? null };
}

/**
 * The comment a person on the ticket needs for one event, or null. Stage,
 * transition, gate and factory definition names are all NameSchema (lowercase,
 * no quotes or dollar signs), so no body trips swamp-club's payload rules
 * (swamp-club#2284). An asserted actor is free text and is left out.
 */
export function commentFor(
  key: string,
  event: JournalEvent,
  definition: FactoryDefinition,
): string | null {
  const item = `**${key}**`;
  switch (event.type) {
    case "started":
      return `${item} started in factory \`${event.factory}\`, ` +
        `at stage **${event.stage}**.`;
    case "advanced": {
      const terminal =
        definition.stages.find((s) => s.id === event.to)?.terminal === true;
      return terminal
        ? `${item} finished at **${event.to}** by \`${event.transition}\`.`
        : `${item} entered **${event.to}** (cycle ${event.toCycle}) by ` +
          `\`${event.transition}\`.`;
    }
    case "approval": {
      const who = event.actor.principal ?? "an unidentified caller";
      const did = event.decision === "approve" ? "approved" : "declined";
      return `${item}: ${who} ${did} \`${event.gateId}\` in ` +
        `**${event.stage}**.`;
    }
    case "awaiting": {
      const hold = event.dispatchOverride;
      if (hold === undefined) {
        if (event.exits.length === 0) return null;
        return `${item} is waiting on a person in **${event.stage}**:\n\n` +
          event.exits.map(exitLine).join("\n");
      }
      const reached = hold.interruptions !== undefined
        ? `interruption limit reached (${hold.interruptions.count} of ` +
          `${hold.interruptions.limit}`
        : `dispatch limit reached (${hold.count} of ${hold.limit}`;
      return `${item} is waiting on a person in **${event.stage}**: ` +
        reached +
        (hold.granted > 0 ? ` plus ${hold.granted} granted` : "") +
        "); a person must grant a dispatch override." +
        (event.exits.length === 0 ? "" : "\n\nAlso waiting on a person:\n\n" +
          event.exits.map(exitLine).join("\n"));
    }
    case "override": {
      if (event.kind !== "dispatch") return null;
      const who = event.actor.principal ?? "an unidentified caller";
      return `${item}: ${who} granted a dispatch override in ` +
        `**${event.for}**.`;
    }
    case "reset":
      return `${item} was reset: era \`${event.previousEra}\` ended, and ` +
        `era \`${event.era}\` starts at **${event.stage}**` +
        (event.repinned === undefined
          ? "."
          : ", on a newly pinned definition.");
    case "outcome": {
      // A dispatch that did not succeed is news on the ticket; the reason
      // is free text, so it is left out like an asserted actor.
      if (event.outcome === "succeeded") return null;
      return `${item}: dispatch ${event.dispatchId} in **${event.stage}** ` +
        (event.outcome === "interrupted"
          ? "was interrupted" +
            (event.supersededBy !== undefined
              ? `; dispatch ${event.supersededBy} replaces it.`
              : ".")
          : "failed.");
    }
    case "dispatched":
    case "usage":
    case "checkpoint":
    case "recorded":
    case "rejected":
    // Said by the notes of each ticket's segment (ticketSegments), since
    // what to say depends on the tracker.
    case "retargeted":
      return null;
  }
}

// ---------------------------------------------------------------------------
// Retargeting: which ticket each journal event belongs to. A retarget that
// changes this tracker's ref ends one ticket's segment and starts the next;
// events before it belong to the old ticket, later ones to the new. Both
// tickets get a note, keyed on the retarget's journal version.
// ---------------------------------------------------------------------------

/** One ticket's share of a work item's journal, for one tracker. */
export interface TicketSegment {
  /** The ticket's stable id, or null when the refs named none for this
   * tracker then. */
  issue: string | null;
  /** Its events are the journal versions after `after`, through `through`.
   * A segment a retarget ends runs through that retarget. */
  after: number;
  through: number;
  /** The status key of the stage the work item was in at the segment's end,
   * or null when that stage leaves the ticket's status alone. */
  status: string | null;
  /** The journal version its status write is keyed on: the journal length
   * for the last segment, and the version before the retarget for one a
   * retarget ends (the stage is the same there). Distinct across segments,
   * since a delivery key names one ticket. */
  statusVersion: number;
  /** Where the work item came from, for a segment a retarget starts. */
  opening?: PlannedComment;
  /** Where it went, for a segment a retarget ends. */
  closing?: PlannedComment;
}

function ticketIn(
  refs: Record<string, string>,
  tracker: string,
): string | null {
  const id = refs[tracker];
  return id === undefined || id === "" ? null : id;
}

function displayIn(refs: Record<string, string>, tracker: string): string {
  return refs[`${tracker}.display`] || (refs[tracker] ?? "");
}

/**
 * The journal split into one segment per ticket, in journal order: one
 * segment when no retarget changed this tracker's ref. Ref values are free
 * input and go into the notes as given; the reason is free text and is left
 * out, as an asserted actor is (swamp-club#2284).
 */
export function ticketSegments(
  run: RunRecord,
  definition: FactoryDefinition,
  tracker: string,
): TicketSegment[] {
  const statusOf = (stage: string) =>
    definition.stages.find((s) => s.id === stage)?.tracker?.status ?? null;
  const item = `**${run.key}**`;
  const firstMove = run.journal.find((e) => e.type === "retargeted");
  const segments: TicketSegment[] = [];
  let current: Pick<TicketSegment, "issue" | "after" | "opening"> = {
    issue: ticketIn(
      firstMove?.type === "retargeted" ? firstMove.from : run.externalRefs,
      tracker,
    ),
    after: 0,
  };
  run.journal.forEach((event, index) => {
    if (event.type !== "retargeted") return;
    const from = ticketIn(event.from, tracker);
    const to = ticketIn(event.to, tracker);
    if (from === to) return;
    const version = index + 1;
    segments.push({
      ...current,
      through: version,
      status: statusOf(event.stage),
      statusVersion: version - 1,
      closing: {
        journalVersion: version,
        body: to === null
          ? `${item} no longer reports to this ticket.`
          : `${item} moved to ${displayIn(event.to, tracker)}; its ` +
            "updates continue there.",
      },
    });
    current = {
      issue: to,
      after: version,
      opening: {
        journalVersion: version,
        body: from === null
          ? `${item} was linked to this ticket at stage **${event.stage}**.`
          : `${item} continued here from ` +
            `${displayIn(event.from, tracker)}, at stage **${event.stage}**.`,
      },
    };
  });
  segments.push({
    ...current,
    through: run.journal.length,
    status: statusOf(run.stage),
    statusVersion: run.journal.length,
  });
  return segments;
}

// ---------------------------------------------------------------------------
// Duplicate marks: the approvals a stage's tracker.duplicate names (DESIGN.md,
// "Duplicates"). Each marks the ticket the work item has at that journal
// version a duplicate of the primary in the product recorded last before it,
// in the same era. A declined approval marks nothing.
// ---------------------------------------------------------------------------

export interface DuplicateMark {
  /** The approval's journal version (its index + 1). */
  journalVersion: number;
  /** The product naming the primary, or null when none was recorded first. */
  product: EntryProduct | null;
  /** Its payload field holding the primary. */
  field: string;
  /** For a message: the product's name and the gate. */
  record: string;
  gateId: string;
}

/** Every duplicate mark in the journal, in journal order. */
export function duplicateMarks(
  run: RunRecord,
  definition: FactoryDefinition,
): DuplicateMark[] {
  const stages = new Map(definition.stages.map((s) => [s.id, s]));
  const marks: DuplicateMark[] = [];
  run.journal.forEach((event, index) => {
    if (event.type !== "approval" || event.decision !== "approve") return;
    const duplicate = stages.get(event.stage)?.tracker?.duplicate;
    if (duplicate === undefined || duplicate.on.approve !== event.gateId) {
      return;
    }
    const recorded = run.journal.slice(0, index).findLast((e) =>
      e.type === "recorded" && e.name === duplicate.record &&
      e.era === event.era
    );
    marks.push({
      journalVersion: index + 1,
      product: recorded?.type === "recorded"
        ? {
          kind: recorded.kind,
          name: recorded.name,
          version: recorded.version,
          digest: recorded.digest,
        }
        : null,
      field: duplicate.field,
      record: duplicate.record,
      gateId: event.gateId,
    });
  });
  return marks;
}

function exitLine(exit: AwaitingExit): string {
  const needs = exit.gateIds.length > 0
    ? `approval of ${exit.gateIds.map((g) => `\`${g}\``).join(", ")}`
    : "a person to confirm it";
  const from = exit.readyAt === undefined ? "" : `, from ${exit.readyAt}`;
  return `- \`${exit.transition}\` to **${exit.to}**: needs ${needs}${from}`;
}

// ---------------------------------------------------------------------------
// Entries: the journal as structured ticket history (the Lab's lifecycle
// entries), for a factory definition whose stages declare tracker.entries.
// Which event becomes which step is the factory definition's to say, pinned
// with the rest of it. An event no entry answers posts nothing.
// ---------------------------------------------------------------------------

/** Whether a factory definition declares any tracker entries. */
export function declaresEntries(definition: FactoryDefinition): boolean {
  return definition.stages.some((s) => (s.tracker?.entries?.length ?? 0) > 0);
}

/** A recorded product an entry reads its payload from. */
export interface EntryProduct {
  kind: ProductKind;
  name: string;
  version: number;
  digest: string;
}

/** The entries one journal event could become; the payload picks one. */
export interface EntryEvent {
  /** The journal's length once this event was written (its index + 1). */
  journalVersion: number;
  /** Set when the event is a second entry on its journal version: an
   * advance is both a transition out of one stage and an entry into the
   * next, and each is written under its own ledger key. */
  suffix?: string;
  /** The candidates in the factory definition's order: those on the event's
   * trigger and cycle. A match decides between them once the payload is read.
   */
  candidates: TrackerEntry[];
  /** The status key labelling the entry unless it names its own: the
   * stage's, else the last one entered before it. For a transition, the
   * stage it goes to. Null when nothing names one. */
  status: string | null;
  /** Set for a recorded product. */
  product?: EntryProduct;
  /** The event's values for the summary besides the payload. */
  meta: SummaryMeta;
}

/**
 * The journal events after `since` that some entry answers, in journal
 * order. Status labels, product versions and first dispatches are worked out
 * from the start of the journal, so a stage without a status key carries the
 * one before it.
 */
export function projectEntries(
  run: RunRecord,
  definition: FactoryDefinition,
  since: number,
): EntryEvent[] {
  const stages = new Map(definition.stages.map((s) => [s.id, s]));
  const out: EntryEvent[] = [];
  let status: string | null = null;
  // Each product's latest version in the current era: a reset clears the
  // run's products, so it starts the count over.
  let era: string | null = null;
  let versions: Record<string, number> = {};
  const dispatched = new Set<string>();
  for (let i = 0; i < run.journal.length; i++) {
    const event = run.journal[i];
    if (event.era !== era) {
      era = event.era;
      versions = {};
    }
    if (event.type === "recorded") versions[event.name] = event.version;
    let first = false;
    if (event.type === "dispatched") {
      const entry = `${event.era} ${event.stage} ${event.cycle}`;
      first = !dispatched.has(entry);
      dispatched.add(entry);
    }
    const triggers = triggersOf(event, first);
    // An advance labels its transition with the stage it goes to.
    for (const at of triggers) {
      status = stages.get(at.stage)?.tracker?.status ?? status;
    }
    if (i < since) continue;
    for (const at of triggers) {
      const candidates = (stages.get(at.stage)?.tracker?.entries ?? []).filter(
        (e) =>
          triggerKey(e.on) === at.key &&
          (e.cycle === undefined || (e.cycle === "first") === (at.cycle === 1)),
      );
      if (candidates.length === 0) continue;
      out.push({
        journalVersion: i + 1,
        ...(at.suffix === undefined ? {} : { suffix: at.suffix }),
        candidates,
        status,
        ...(at.product === undefined ? {} : { product: at.product }),
        meta: metaOf(run, event, at, versions),
      });
    }
  }
  return out;
}

interface Trigger {
  stage: string;
  key: string;
  cycle: number;
  suffix?: string;
  product?: EntryProduct;
}

/** What one journal event answers to, in the order its entries are
 * written. `first`: a dispatch is its stage entry's first. */
function triggersOf(event: JournalEvent, first: boolean): Trigger[] {
  switch (event.type) {
    case "started":
      return [{ stage: event.stage, key: "enter", cycle: 1 }];
    case "advanced":
      return [
        {
          stage: event.stage,
          key: triggerKey({ transition: event.transition }),
          cycle: event.cycle,
          suffix: "transition",
        },
        { stage: event.to, key: "enter", cycle: event.toCycle },
      ];
    case "dispatched":
      return first
        ? [{ stage: event.stage, key: "dispatch", cycle: event.cycle }]
        : [];
    case "recorded":
      return [{
        stage: event.stage,
        key: triggerKey({ record: event.name }),
        cycle: event.cycle,
        product: {
          kind: event.kind,
          name: event.name,
          version: event.version,
          digest: event.digest,
        },
      }];
    case "approval":
      return event.decision === "approve"
        ? [{
          stage: event.stage,
          key: triggerKey({ approve: event.gateId }),
          cycle: event.cycle,
        }]
        : [];
    default:
      return [];
  }
}

/** The summary values an event has besides its payload. An approval reads
 * product versions from what it was given against, not the journal. */
function metaOf(
  run: RunRecord,
  event: JournalEvent,
  at: Trigger,
  versions: Record<string, number>,
): SummaryMeta {
  const meta: SummaryMeta = { cycle: at.cycle, versions: { ...versions } };
  if (at.product !== undefined) meta.version = at.product.version;
  if (event.type === "approval") {
    const approval = run.approvals.find((a) => a.id === event.approvalId);
    if (approval !== undefined) {
      meta.versions = Object.fromEntries(
        [
          ...Object.entries(approval.products.evidence),
          ...Object.entries(approval.products.artifacts),
        ].map(([name, ref]) => [name, ref.version]),
      );
    }
  }
  if (event.type === "dispatched") {
    const dispatch = run.dispatches.find((d) => d.id === event.dispatchId);
    if (dispatch !== undefined) meta.inputs = dispatch.inputs;
  }
  return meta;
}

/** The first candidate whose match the payload holds, or null. */
export function chooseEntry(
  candidates: TrackerEntry[],
  payload: Record<string, unknown>,
): TrackerEntry | null {
  return candidates.find((e) =>
    Object.entries(e.match ?? {}).every(([field, value]) =>
      Object.hasOwn(payload, field) && payload[field] === value
    )
  ) ?? null;
}

/** An entry ready to write: everything but the tracker's status name. */
export interface RenderedEntry {
  step: string;
  emoji: string;
  summary: string;
  /** The status key labelling it, or null when nothing names one. */
  status: string | null;
  isVerbose: boolean;
  payload: Record<string, unknown>;
  /** The ticket type to set first, when the entry reads one. */
  type?: string;
  /** The pull request url to link first, when the entry reads one. */
  pr?: string;
}

/**
 * The payload without keys that start with `$`, at any depth: swamp-club
 * refuses a lifecycle entry whose payload has one (swamp-club#2284), and
 * the recorded payload cannot be changed to suit it.
 */
export function withoutDollarKeys(
  payload: Record<string, unknown>,
): Record<string, unknown> {
  const clean = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(clean);
    if (value === null || typeof value !== "object") return value;
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([k]) => !k.startsWith("$"))
        .map(([k, v]) => [k, clean(v)]),
    );
  };
  return clean(payload) as Record<string, unknown>;
}

/**
 * Fill an entry from its event and the recorded payload (empty for every
 * trigger but a recorded product). A placeholder whose value is absent reads
 * as empty text, so an optional field never blocks the history.
 */
export function renderEntry(
  entry: TrackerEntry,
  event: EntryEvent,
  payload: Record<string, unknown>,
): RenderedEntry {
  const summary = renderSummary(
    parseSummary(entry.summary).parts,
    payload,
    event.meta,
  );
  const type = entry.setsType === undefined
    ? undefined
    : payload[entry.setsType];
  const pr = entry.linkPr === undefined ? undefined : payload[entry.linkPr];
  return {
    step: entry.step,
    emoji: entry.emoji,
    summary,
    status: entry.status ?? event.status,
    isVerbose: entry.verbose === true,
    payload: event.product === undefined ? {} : withoutDollarKeys(payload),
    ...(typeof type === "string" && type !== "" ? { type } : {}),
    ...(typeof pr === "string" && pr !== "" ? { pr } : {}),
  };
}
