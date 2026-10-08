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
import { digestOf } from "./canonical.ts";
import type { RunRecord } from "./run_record.ts";
import type { Env } from "./run_ops.ts";
import type { RunStore } from "./run_store.ts";
import { runStatus } from "./status_view.ts";
import type {
  IssueView,
  PayloadVersion,
  WorkItemResponse,
} from "./studio_item_types.ts";
import {
  pinnedByVersion,
  type QueryData,
  queryStore,
  readRun,
} from "./studio_work_items.ts";
import { recordObject, safePart } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's work-item route, GET /api/work-items/<key> (DESIGN.md, "The
// studio server"): one work item as the work-item view draws it. The status
// and the readiness it was built from come from status_view.ts, the code the
// status method prints from, so the page shows the engine's own messages and
// never evaluates a gate itself. Every read goes through the data query
// (studio_work_items.ts); nothing here writes.
// ---------------------------------------------------------------------------

export type { IssueView, PayloadVersion, WorkItemResponse };

/**
 * Every product version the run's journal records, in every era, with the
 * payload stored at that version when its digest is the one recorded.
 */
export async function productPayloads(
  store: RunStore,
  run: RunRecord,
): Promise<PayloadVersion[]> {
  const out: PayloadVersion[] = [];
  const seen = new Set<string>();
  for (const e of run.journal) {
    if (e.type !== "recorded") continue;
    const id = `${e.kind}:${e.name}:${e.version}`;
    if (seen.has(id)) continue;
    seen.add(id);
    const raw = await store.readPayload(e.kind, e.name, e.version);
    const payload = raw !== null && typeof raw === "object" &&
        !Array.isArray(raw) &&
        await digestOf(raw) === e.digest
      ? raw as Record<string, unknown>
      : null;
    out.push({
      kind: e.kind,
      name: e.name,
      version: e.version,
      digest: e.digest,
      payload,
    });
  }
  return out;
}

const RelationSchema = z.object({
  type: z.string(),
  direction: z.enum(["outgoing", "incoming"]),
  issue: z.string(),
  display: z.string(),
});

/**
 * The parts of a tracker's issue-<id> record the page shows: an external
 * tracker's last snapshot (which may be stale), or a built-in ticket. The
 * engine does not import the tracker, so this reads only what it shows.
 */
const IssueViewSchema = z.object({
  origin: z.enum(["snapshot", "builtin"]),
  tracker: z.string(),
  id: z.string(),
  display: z.string(),
  title: z.string(),
  url: z.string().optional(),
  status: z.object({ id: z.string(), name: z.string() }),
  relations: z.array(RelationSchema).optional(),
  fetchedAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

/**
 * The ticket the run names on the tracker it was started against, as that
 * tracker last recorded it, read as data with no network call; null when the
 * run names none, the names are not path-safe, or the tracker has no record
 * of it (a record of another kind of tracker is not it).
 */
export async function issueRecord(
  query: QueryData,
  run: RunRecord,
): Promise<IssueView | null> {
  const { instance, kind } = run.tracker;
  const id = run.externalRefs[kind];
  if (id === undefined) return null;
  let predicate: string;
  try {
    predicate = `modelName == "${safePart("tracker", instance)}" && ` +
      `name == "issue-${safePart("issue id", id)}"`;
  } catch {
    return null;
  }
  for (const record of await query(predicate)) {
    const data = recordObject(record);
    // A query is not limited to this repository's namespace: only a record
    // of this ticket on this kind of tracker counts, as readRun checks the key.
    if (data?.id !== id || data.tracker !== kind) continue;
    const parsed = IssueViewSchema.safeParse(data);
    // The page's own type (studio_item_types.ts) must take what this
    // schema parses.
    if (parsed.success) return parsed.data satisfies IssueView;
  }
  return null;
}

/**
 * One work item for the work-item view, or null when no work item has that
 * key. Throws, with the reason, when its run does not parse or no copy of its
 * pinned definition passes the digest check. Product payloads are read only
 * when asked for (the Scenario tab needs them; a live re-read does not); otherwise
 * `payloads` is null.
 */
export async function readWorkItem(
  query: QueryData,
  key: string,
  env: Env,
  options: { payloads?: boolean } = {},
): Promise<WorkItemResponse | null> {
  const run = await readRun(query, key);
  if (run === null) return null;
  let definition;
  try {
    definition = await pinnedByVersion(query, run);
  } catch (e) {
    throw new Error(
      `work item '${key}': ${e instanceof Error ? e.message : String(e)}`,
    );
  }
  // The digest of the pinned definition in the current form, which the page
  // compares with the factory file's, as the Board does (boardCard).
  const pinned = {
    factory: run.factory,
    digest: await digestOf(definition),
    definition,
  };
  const store = queryStore(query, key);
  const at = env.now();
  const { view, readiness } = await runStatus(run, pinned, store, {
    ...env,
    now: () => at,
  });
  return {
    run,
    pinned: { ...pinned, version: run.definition.version ?? null },
    payloads: options.payloads === true
      ? await productPayloads(store, run)
      : null,
    status: view,
    readiness,
    issue: await issueRecord(query, run),
    at,
  };
}
