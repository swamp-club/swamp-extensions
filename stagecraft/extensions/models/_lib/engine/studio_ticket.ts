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
import { parseRun, type RunRecord } from "./run_record.ts";
import { RUN_NAME } from "./run_store.ts";
import type {
  TicketActivityView,
  TicketRelationView,
  TicketResponse,
  TicketView,
} from "./studio_item_types.ts";
import type { QueryData } from "./studio_work_items.ts";
import { recordObject, safePart, WORK_ITEM_TYPE } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's Ticket tab, GET /api/work-items/<key>/ticket (DESIGN.md, "The
// studio server"; swamp-club #2969): the work item's ticket as its tracker
// instance last recorded it. An external tracker's is the snapshot that
// fetch_issue, claim or create stored; a built-in ticket's is the ticket
// itself, with its comment and entry records. The engine imports no tracker
// code (DESIGN.md, "The seam"), so this parses the records with its own
// schemas, and every read is the data query: no network call, no method.
// ---------------------------------------------------------------------------

export type { TicketResponse };

const RelationSchema = z.object({
  type: z.string(),
  direction: z.enum(["outgoing", "incoming"]),
  issue: z.string(),
  display: z.string(),
});

const ActivitySchema = z.object({
  kind: z.enum(["comment", "entry"]),
  id: z.string().optional(),
  author: z.string().optional(),
  body: z.string(),
  step: z.string().optional(),
  at: z.string(),
});

const StatusSchema = z.object({ id: z.string(), name: z.string() });

const SnapshotSchema = z.object({
  origin: z.literal("snapshot"),
  id: z.string(),
  display: z.string(),
  title: z.string(),
  url: z.string().optional(),
  status: StatusSchema,
  relations: z.array(RelationSchema).optional(),
  description: z.string().optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  activity: z.array(ActivitySchema).optional(),
  fetchedAt: z.string(),
});

const BuiltinSchema = z.object({
  origin: z.literal("builtin"),
  id: z.string(),
  display: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.string(),
  status: StatusSchema,
  relations: z.array(RelationSchema).default([]),
  assignees: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const IssueSchema = z.discriminatedUnion("origin", [
  SnapshotSchema,
  BuiltinSchema,
]);

const CommentSchema = z.object({
  issue: z.string(),
  id: z.string(),
  body: z.string(),
  at: z.string(),
});

const EntrySchema = z.object({
  issue: z.string(),
  id: z.string(),
  step: z.string(),
  summary: z.string(),
  at: z.string(),
});

const DeliverySchema = z.object({
  action: z.string(),
  issue: z.string(),
  result: z.record(z.string(), z.unknown()),
});

/** The newest version of each record a query found, by record name. */
function latestByName(records: unknown[]): unknown[] {
  const latest = new Map<string, { version: number; record: unknown }>();
  records.forEach((record, i) => {
    const r = record as { name?: unknown; version?: unknown } | null;
    const name = typeof r?.name === "string" ? r.name : `#${i}`;
    const version = typeof r?.version === "number" ? r.version : 0;
    const seen = latest.get(name);
    if (seen === undefined || seen.version <= version) {
      latest.set(name, { version, record });
    }
  });
  return [...latest.values()].map((l) => l.record);
}

/** One spec's records on the tracker instance, as objects, newest of each. */
async function specRecords(
  query: QueryData,
  instance: string,
  spec: string,
): Promise<Record<string, unknown>[]> {
  const found = await query(
    `modelName == "${instance}" && specName == "${spec}"`,
  );
  return latestByName(found).flatMap((record) => {
    const data = recordObject(record);
    return data === null ? [] : [data];
  });
}

/** A built-in ticket's comments and entries, oldest first. */
async function builtinActivity(
  query: QueryData,
  instance: string,
  id: string,
): Promise<Omit<TicketActivityView, "byStagecraft">[]> {
  const out: Omit<TicketActivityView, "byStagecraft">[] = [];
  for (const data of await specRecords(query, instance, "comment")) {
    const c = CommentSchema.safeParse(data);
    if (!c.success || c.data.issue !== id) continue;
    out.push({
      kind: "comment",
      id: c.data.id,
      body: c.data.body,
      at: c.data.at,
    });
  }
  for (const data of await specRecords(query, instance, "entry")) {
    const e = EntrySchema.safeParse(data);
    if (!e.success || e.data.issue !== id) continue;
    out.push({
      kind: "entry",
      id: e.data.id,
      body: e.data.summary,
      step: e.data.step,
      at: e.data.at,
    });
  }
  return out.sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
}

/**
 * The ids of the comments and entries stagecraft posted on this ticket, from
 * the tracker instance's delivery ledger: what the tracker returned for each.
 */
async function postedIds(
  query: QueryData,
  instance: string,
  id: string,
): Promise<Set<string>> {
  const ids = new Set<string>();
  for (const data of await specRecords(query, instance, "delivery")) {
    const d = DeliverySchema.safeParse(data);
    if (!d.success || d.data.issue !== id) continue;
    if (d.data.action !== "comment" && d.data.action !== "lifecycle_entry") {
      continue;
    }
    if (typeof d.data.result.id === "string") ids.add(d.data.result.id);
  }
  return ids;
}

/**
 * The work item on each related ticket: the newest run, in any factory, bound
 * to the same tracker instance with that ticket in its externalRefs.
 * externalRefs is not something the query can match, so every work item's
 * run is read and matched here; only when the ticket has relations.
 */
async function relatedWorkItems(
  query: QueryData,
  instance: string,
  ids: string[],
): Promise<Map<string, string>> {
  const wanted = new Set(ids);
  const newest = new Map<string, RunRecord>();
  if (wanted.size === 0) return new Map();
  const found = await query(
    `modelType == "${WORK_ITEM_TYPE}" && name == "${RUN_NAME}"`,
  );
  for (const record of found) {
    const parsed = parseRun(recordObject(record));
    if (!parsed.ok) continue;
    const run = parsed.value;
    if (run.tracker.instance !== instance) continue;
    const ticket = run.externalRefs[run.tracker.kind];
    if (ticket === undefined || !wanted.has(ticket)) continue;
    const held = newest.get(ticket);
    if (held === undefined || startedAt(run) > startedAt(held)) {
      newest.set(ticket, run);
    }
  }
  return new Map([...newest].map(([ticket, run]) => [ticket, run.key]));
}

function startedAt(run: RunRecord): string {
  return run.journal[0]?.at ?? "";
}

/**
 * The work item's ticket for the Ticket tab: "none" when the run names no
 * ticket, "missing" when the tracker instance has no record of it (nobody
 * ran fetch_issue, or its record is of another kind of tracker), otherwise
 * the ticket. Throws when the record is there but does not parse.
 */
export async function readTicket(
  query: QueryData,
  run: RunRecord,
): Promise<TicketResponse> {
  const { kind } = run.tracker;
  const id = run.externalRefs[kind];
  if (id === undefined) return { state: "none" };
  let instance: string;
  let name: string;
  try {
    instance = safePart("tracker", run.tracker.instance);
    name = `issue-${safePart("issue id", id)}`;
  } catch {
    return { state: "none" };
  }
  // A query is not limited to this repository's namespace: only a record of
  // this ticket on this kind of tracker counts, as readRun checks the key.
  const records = (await query(
    `modelName == "${instance}" && name == "${name}"`,
  )).filter((r) => {
    const data = recordObject(r);
    return data?.id === id && data.tracker === kind;
  });
  if (records.length === 0) {
    return { state: "missing", tracker: instance, kind, id };
  }
  const latest = latestByName(records);
  const parsed = IssueSchema.safeParse(recordObject(latest[latest.length - 1]));
  if (!parsed.success) {
    throw new Error(
      `the ${instance} record of ticket '${id}' does not parse: ${
        parsed.error.issues.map((i) => i.message).join("; ")
      }`,
    );
  }
  const issue = parsed.data;
  const posted = await postedIds(query, instance, id);
  const raw = issue.origin === "builtin"
    ? await builtinActivity(query, instance, id)
    : issue.activity ?? null;
  const activity = raw === null ? null : raw.map((a) => ({
    ...a,
    byStagecraft: a.id !== undefined && posted.has(a.id),
  }));
  const relations = issue.relations ?? [];
  const workItems = await relatedWorkItems(
    query,
    instance,
    relations.map((r) => r.issue),
  );
  const ticket: TicketView = {
    origin: issue.origin,
    tracker: instance,
    kind,
    id: issue.id,
    display: issue.display,
    title: issue.title,
    status: issue.status,
    ...(issue.origin === "snapshot"
      ? {
        ...(issue.url === undefined ? {} : { url: issue.url }),
        description: issue.description ?? null,
        labels: issue.labels ?? [],
        assignees: issue.assignees ?? [],
        ...(issue.createdAt === undefined
          ? {}
          : { createdAt: issue.createdAt }),
        ...(issue.updatedAt === undefined
          ? {}
          : { updatedAt: issue.updatedAt }),
        fetchedAt: issue.fetchedAt,
      }
      : {
        description: issue.body,
        labels: [issue.type],
        assignees: issue.assignees ?? [],
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
      }),
    activity,
    relations: relations.map((r): TicketRelationView => ({
      ...r,
      workItem: workItems.get(r.issue) ?? null,
    })),
  };
  return { state: "ok", ticket };
}
