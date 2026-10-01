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
import {
  checkPinned,
  CURSOR_SPEC,
  cursorName,
  CursorSchema,
  DEFINITION_NAME,
  DEFINITION_SPEC,
  digestOf,
  type FactoryDefinition,
  type MethodOutput,
  type ModelDataRecord,
  parseRun,
  payloadName,
  RUN_NAME,
  RUN_SPEC,
  type RunRecord,
} from "../../engine/tracker.ts";
import {
  type ClaimContext,
  claimTicket,
  displayLead,
  moveClaim,
  readClaimedRun,
  TICKET_SPEC,
  TicketClaimSchema,
} from "./claim.ts";
import {
  chooseEntry,
  declaresEntries,
  type DuplicateMark,
  duplicateMarks,
  type EntryProduct,
  type PlannedComment,
  projectEntries,
  renderEntry,
  type TicketSegment,
  ticketSegments,
  ticketView,
} from "./ticket_view.ts";
import {
  type Assigner,
  type DeliveryKey,
  type LifecycleEntry,
  RELATION_TYPES,
  type RelationType,
  requireCapability,
  type TrackerAdapter,
  TrackerError,
  type TrackerIssue,
} from "./adapter.ts";
import { DUPLICATE_STATUS, duplicateRefusal, primaryOf } from "./duplicates.ts";
import { findRelation, TrackerRelationSchema } from "./relations.ts";

// ---------------------------------------------------------------------------
// The methods every tracker model type has, written once over the adapter
// contract: create, fetch_issue, comment, set_status, relate, unrelate and
// publish, and claim, which starts from a ticket (claim.ts).
//
// Delivery ledger: a comment, status, type, lifecycle-entry or relation write
// that carries a delivery key (workItem + journalVersion) records what the
// tracker returned under a name built from the key. A second call with the same key finds the record and
// writes nothing to the tracker. The ledger lives on the tracker instance
// and relies on swamp running one method at a time per instance; a crash
// after the tracker accepted a write but before the ledger record lands can
// still repeat that one write.
// ---------------------------------------------------------------------------

export const ISSUE_SPEC = "issue";
export const DELIVERY_SPEC = "delivery";

export const DELIVERY_ACTIONS = [
  "comment",
  "set_status",
  "set_type",
  "link_pr",
  "lifecycle_entry",
  "relate",
  "unrelate",
  "assign",
] as const;

export const DeliverySchema = z.object({
  action: z.enum(DELIVERY_ACTIONS),
  issue: z.string(),
  workItem: z.string(),
  journalVersion: z.number(),
  /**
   * A digest of what was asked (the comment body, the status key, the type
   * or the entry), so a repeat of the key with a different request is
   * refused, not skipped.
   */
  request: z.string(),
  /** What the tracker returned: a comment's or entry's id, the status, the
   * type or the assignment; for an assign publish skipped, why. */
  result: z.record(z.string(), z.unknown()),
  at: z.string(),
});
export type Delivery = z.infer<typeof DeliverySchema>;

const TrackerStatusSchema = z.object({ id: z.string(), name: z.string() });

/**
 * An external tracker's ticket as swamp last read it (fetch_issue, claim and
 * create record it). The tracker owns these facts; the record may be stale.
 */
export const SnapshotIssueSchema = z.object({
  origin: z.literal("snapshot"),
  tracker: z.string(),
  id: z.string(),
  display: z.string(),
  title: z.string(),
  url: z.string().optional(),
  status: TrackerStatusSchema,
  /** What only this tracker reports (the Lab's body, type and author). */
  details: z.record(z.string(), z.unknown()).optional(),
  /** Absent on a snapshot recorded before trackers read relations. */
  relations: z.array(TrackerRelationSchema).optional(),
  fetchedAt: z.string(),
});

/** A built-in ticket: the record is the ticket, and swamp owns its facts. */
export const BuiltinIssueSchema = z.object({
  origin: z.literal("builtin"),
  tracker: z.string(),
  id: z.string(),
  display: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.string(),
  status: TrackerStatusSchema,
  /** Both ends keep the relation; the subject's (outgoing) side is written
   * first and removed last (builtin.ts). */
  relations: z.array(TrackerRelationSchema).default([]),
  /** The users assigned; absent on a record written before assignees. */
  assignees: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BuiltinIssue = z.infer<typeof BuiltinIssueSchema>;

/** A ticket's issue-<id> record, by who owns its facts. */
export const IssueSchema = z.discriminatedUnion("origin", [
  SnapshotIssueSchema,
  BuiltinIssueSchema,
]);

/** The record name of a ticket's issue record. */
export function issueName(issueId: string): string {
  return `issue-${safePart("issue id", issueId)}`;
}

/** What the methods need from swamp's method context. */
export interface TrackerContext extends ClaimContext {
  globalArgs?: Record<string, unknown>;
  /** A CEL query over all data; one that names `version` reaches history. */
  queryData?(predicate: string, select?: string): Promise<unknown[]>;
}

// Record names come from ids and keys; keep them to a path-safe alphabet.
const SAFE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

function safePart(what: string, value: string): string {
  if (!SAFE.test(value) || value.includes("..")) {
    throw new Error(
      `${what} '${value}' can only use letters, digits, '.', '_' and '-'`,
    );
  }
  return value;
}

/**
 * The ledger record for a keyed write. publish keeps its own records
 * (`delivery-publish-<action>-...`), so a key someone passed to comment or
 * set_status by hand never stands in for, or blocks, a publish.
 */
export function deliveryName(
  action: Delivery["action"],
  key: DeliveryKey,
  by: "method" | "publish" = "method",
  /** Set for a second write on one journal version: a retarget's note to
   * the new ticket, beside its note to the old one. */
  suffix?: string,
): string {
  const prefix = by === "publish" ? "delivery-publish" : "delivery";
  return `${prefix}-${action}-${safePart("workItem", key.workItem)}-${
    String(key.journalVersion)
  }${suffix === undefined ? "" : `-${safePart("suffix", suffix)}`}`;
}

export const DeliveryInputs = {
  workItem: z.string().min(1).optional().describe(
    "The work item this write is for; with journalVersion, makes it idempotent",
  ),
  journalVersion: z.coerce.number().int().positive().optional().describe(
    "The length of the work item's journal this write reflects",
  ),
};

export function deliveryKeyOf(
  args: { workItem?: string; journalVersion?: number },
): DeliveryKey | null {
  if (args.workItem === undefined && args.journalVersion === undefined) {
    return null;
  }
  if (args.workItem === undefined || args.journalVersion === undefined) {
    throw new Error(
      "a delivery key needs both workItem and journalVersion, or neither",
    );
  }
  return { workItem: args.workItem, journalVersion: args.journalVersion };
}

/** Where a status key is mapped: the statuses argument of this tracker
 * model instance, by name where the context has one. */
function statusesArgument(ctx: TrackerContext, tracker: string): string {
  const instance = ctx.definition?.name;
  return instance === undefined
    ? `the statuses global argument of the ${tracker} tracker`
    : `the statuses global argument of tracker '${instance}'`;
}

function resources(ctx: TrackerContext) {
  if (ctx.writeResource === undefined || ctx.readResource === undefined) {
    throw new Error("this method context has no writeResource/readResource");
  }
  return {
    write: ctx.writeResource.bind(ctx),
    read: ctx.readResource.bind(ctx),
  };
}

/**
 * The delivery already recorded under this key, if any. The same key for a
 * different ticket is refused: one key names one moment of one work item. So
 * is the same key for a different request, unless `replay` is set: publish
 * derives its keys from the journal, so a different request there can only
 * be a later version wording the same event differently, and the event has
 * been delivered.
 */
async function priorDelivery(
  ctx: TrackerContext,
  name: string,
  issue: string,
  request: string,
  replay: boolean,
): Promise<Delivery | null> {
  const raw = await resources(ctx).read(name);
  if (raw === null) return null;
  const prior = DeliverySchema.parse(raw);
  if (prior.issue !== issue) {
    throw new Error(
      `delivery ${name} was made to ${prior.issue}, not ${issue}; ` +
        "a delivery key names one ticket",
    );
  }
  if (prior.request !== request) {
    if (!replay) {
      throw new Error(
        `delivery ${name} was made with a different request; ` +
          "a delivery key names one write",
      );
    }
    ctx.logger.info("{summary}", {
      summary: `delivery ${name} was made with a different request ` +
        "(worded by another version); counted as delivered",
    });
  }
  return prior;
}

/**
 * The status key publish last wrote to `issue` for journal versions `from`
 * through `through`, from its own ledger: undefined when it wrote none
 * there, and null when it wrote one that no status key of the definition
 * names. A move skipped as unreachable counts as written.
 */
async function statusWritten(
  ctx: TrackerContext,
  definition: FactoryDefinition,
  workItem: string,
  issue: string,
  from: number,
  through: number,
): Promise<string | null | undefined> {
  for (let v = through; v >= Math.max(from, 1); v--) {
    const raw = await resources(ctx).read(
      deliveryName("set_status", { workItem, journalVersion: v }, "publish"),
    );
    if (raw === null) continue;
    const record = DeliverySchema.parse(raw);
    if (record.issue !== issue) continue;
    // The record keeps a digest of the key, as setStatus asked it.
    const keys = new Set(
      definition.stages.flatMap((s) =>
        s.tracker?.status === undefined ? [] : [s.tracker.status]
      ),
    );
    for (const key of keys) {
      if (await digestOf({ status: key }) === record.request) return key;
    }
    return null;
  }
  return undefined;
}

async function recordDelivery(
  ctx: TrackerContext,
  name: string,
  delivery: Delivery,
): Promise<unknown> {
  return await resources(ctx).write(DELIVERY_SPEC, name, delivery);
}

/** How claim names a ticket's new work item (claim.ts). */
export interface ClaimNaming {
  /** The key's leading words. */
  lead: string;
  /** A name to take for the ticket's first work item, while it is free. */
  first?: string;
}

/** How a tracker model builds its adapter and status names from its args. */
export interface TrackerModelOptions {
  tracker: string;
  /** The adapter, from the method context: its globalArgs, and its data for
   * a tracker that keeps its own records. */
  adapter(ctx: TrackerContext): TrackerAdapter;
  /** Status keys to the tracker's status names (from globalArgs). */
  statuses(globalArgs: Record<string, unknown>): Record<string, string>;
  /**
   * A tracker's own reason to refuse a claim, checked once the ticket is
   * fetched and before anything is written: throws to refuse.
   */
  beforeClaim?(ctx: TrackerContext, issue: TrackerIssue): Promise<void>;
  /**
   * How claim names a new work item; by default the ticket's display id
   * leads the key and there is no first name.
   */
  claimKey?(
    globalArgs: Record<string, unknown>,
    issue: TrackerIssue,
  ): ClaimNaming;
  /**
   * The tracker's user for swamp's stored login: whom publish assigns when
   * a work item starts. Absent where no login maps to a user yet (Linear),
   * and then publish never assigns. Throws when there is no one to assign.
   */
  assignee?(ctx: TrackerContext): Promise<string>;
  now?: () => Date;
}

/** One keyed or unkeyed write, as the comment and set_status paths take it. */
export interface Write {
  issue: string;
  key: DeliveryKey | null;
  /** Set by publish: its own ledger records, and see priorDelivery. */
  replay: boolean;
  /** Set for a second write of one action on one journal version. */
  suffix?: string;
}

export interface Delivered {
  handles: unknown[];
  /** False when the ledger already held the key and nothing was written. */
  wrote: boolean;
}

/**
 * The ledger-guarded writes, shared by comment, set_status, set_type,
 * publish and a tracker's own methods.
 */
export function deliveries(options: TrackerModelOptions, now: () => Date) {
  const argsOf = (ctx: TrackerContext) => ctx.globalArgs ?? {};

  /**
   * One keyed write, or an unkeyed one: the ledger first, then the tracker,
   * then the ledger record. The same shape as comment and set_status.
   */
  const guarded = async (
    ctx: TrackerContext,
    write: Write,
    action: "set_type" | "link_pr" | "lifecycle_entry" | "relate" | "unrelate",
    request: Record<string, unknown>,
    perform: () => Promise<Record<string, unknown>>,
    done: (result: Record<string, unknown>) => string,
    suffix?: string,
  ): Promise<Delivered> => {
    const { key } = write;
    const name = key === null ? null : deliveryName(
      action,
      key,
      write.replay ? "publish" : "method",
      suffix,
    );
    const digest = await digestOf(request);
    if (name !== null) {
      const prior = await priorDelivery(
        ctx,
        name,
        write.issue,
        digest,
        write.replay,
      );
      if (prior !== null) {
        ctx.logger.info("{summary}", {
          summary: `already delivered (${name}); wrote nothing`,
          ...prior.result,
        });
        return { handles: [], wrote: false };
      }
    }
    let result: Record<string, unknown>;
    let skipped = false;
    try {
      result = await perform();
    } catch (error) {
      // publish only: a write the tracker refuses outright can never land
      // (its request comes from a digest-pinned payload), so it is recorded
      // as skipped and the replay moves past it rather than stalling there
      // for good. Anything else (auth, upstream, rate limits) is retried.
      if (
        !write.replay || key === null || name === null ||
        !(error instanceof TrackerError) || error.kind !== "invalid"
      ) throw error;
      result = { skipped: "invalid", detail: error.detail };
      skipped = true;
    }
    const handles: unknown[] = [];
    if (key !== null && name !== null) {
      handles.push(
        await recordDelivery(ctx, name, {
          action,
          issue: write.issue,
          ...key,
          request: digest,
          result,
          at: now().toISOString(),
        }),
      );
    }
    if (skipped) {
      ctx.logger.info("{warning}", {
        warning: `skipped ${action} on ${write.issue}, which the tracker ` +
          `refused: ${String(result.detail)}`,
      });
      return { handles, wrote: false };
    }
    ctx.logger.info("{summary}", { summary: done(result) });
    return { handles, wrote: true };
  };

  const setType = (
    ctx: TrackerContext,
    write: Write & { type: string },
  ): Promise<Delivered> =>
    guarded(
      ctx,
      write,
      "set_type",
      { type: write.type },
      async () => ({
        ...await requireCapability(options.adapter(ctx), "history").setType(
          write.issue,
          write.type,
        ),
      }),
      (r) =>
        r.changed === true
          ? `set ${write.issue}'s type to '${write.type}'`
          : `${write.issue} is already '${write.type}'; wrote nothing`,
    );

  const linkPr = (
    ctx: TrackerContext,
    write: Write & { url: string },
  ): Promise<Delivered> =>
    guarded(
      ctx,
      write,
      "link_pr",
      { url: write.url },
      async () => ({
        ...await requireCapability(options.adapter(ctx), "pullRequests").linkPr(
          write.issue,
          write.url,
        ),
      }),
      (r) =>
        r.changed === true
          ? `linked ${write.url} on ${write.issue}`
          : `${write.issue} already links ${write.url}; wrote nothing`,
    );

  const entry = (
    ctx: TrackerContext,
    write: Write & { entry: LifecycleEntry },
  ): Promise<Delivered> =>
    guarded(
      ctx,
      write,
      "lifecycle_entry",
      { ...write.entry },
      async () => ({
        ...await requireCapability(options.adapter(ctx), "history").postEntry(
          write.issue,
          write.entry,
        ),
      }),
      (r) =>
        `recorded '${write.entry.step}' on ${write.issue} (entry ${
          String(r.id)
        })`,
      write.suffix,
    );

  const comment = async (
    ctx: TrackerContext,
    write: Write & { body: string },
  ): Promise<Delivered> => {
    const { key } = write;
    const name = key === null ? null : deliveryName(
      "comment",
      key,
      write.replay ? "publish" : "method",
      write.suffix,
    );
    const request = await digestOf({ body: write.body });
    if (name !== null) {
      const prior = await priorDelivery(
        ctx,
        name,
        write.issue,
        request,
        write.replay,
      );
      if (prior !== null) {
        ctx.logger.info("{summary}", {
          summary: `already delivered (${name}); posted nothing`,
          ...prior.result,
        });
        return { handles: [], wrote: false };
      }
    }
    const adapter = options.adapter(ctx);
    const posted = await adapter.comment(write.issue, write.body);
    const handles: unknown[] = [];
    if (key !== null && name !== null) {
      handles.push(
        await recordDelivery(ctx, name, {
          action: "comment",
          issue: write.issue,
          ...key,
          request,
          result: { ...posted },
          at: now().toISOString(),
        }),
      );
    }
    ctx.logger.info("{summary}", {
      summary: `commented on ${write.issue}`,
      id: posted.id,
      url: posted.url,
    });
    return { handles, wrote: true };
  };

  const setStatus = async (
    ctx: TrackerContext,
    write: Write & {
      status: string;
      /** Record an unreachable status as a skip instead of failing. */
      skipUnreachable: boolean;
    },
  ): Promise<Delivered> => {
    // The ledger first: a delivered key is a no-op even if the statuses
    // mapping has changed since.
    const { key } = write;
    const name = key === null ? null : deliveryName(
      "set_status",
      key,
      write.replay ? "publish" : "method",
      write.suffix,
    );
    const request = await digestOf({ status: write.status });
    if (name !== null) {
      const prior = await priorDelivery(
        ctx,
        name,
        write.issue,
        request,
        write.replay,
      );
      if (prior !== null) {
        ctx.logger.info("{summary}", {
          summary: `already delivered (${name}); wrote nothing`,
          ...prior.result,
        });
        return { handles: [], wrote: false };
      }
    }
    const statuses = options.statuses(argsOf(ctx));
    const statusName = statuses[write.status];
    if (statusName === undefined) {
      const known = Object.keys(statuses);
      throw new TrackerError(
        "invalid",
        options.tracker,
        `status key '${write.status}' is not in ${
          statusesArgument(ctx, options.tracker)
        } (${
          known.length === 0 ? "it is empty" : `mapped: ${known.join(", ")}`
        }); add it there`,
      );
    }
    const adapter = options.adapter(ctx);
    let result: Record<string, unknown>;
    let summary: string;
    try {
      const change = await adapter.setStatus(write.issue, statusName);
      result = { ...change };
      summary = change.changed
        ? `moved ${write.issue} to '${change.status.name}'`
        : `${write.issue} is already '${change.status.name}'; wrote nothing`;
    } catch (error) {
      if (
        !write.skipUnreachable || key === null || name === null ||
        !(error instanceof TrackerError) || error.reason !== "unreachable"
      ) throw error;
      // Recorded, so a retry of the key does not try again.
      result = { skipped: "unreachable", detail: error.detail };
      summary = `skipped moving ${write.issue} to '${statusName}': ` +
        error.detail;
    }
    const handles: unknown[] = [];
    if (key !== null && name !== null) {
      handles.push(
        await recordDelivery(ctx, name, {
          action: "set_status",
          issue: write.issue,
          ...key,
          request,
          result,
          at: now().toISOString(),
        }),
      );
    }
    ctx.logger.info("{summary}", { summary });
    return { handles, wrote: true };
  };

  /**
   * Relate or unrelate two tickets. One journal version may write several
   * relations (a breakdown relates each child), so the ledger record is
   * named for the relation too: its source, type and target.
   */
  const relation = (
    ctx: TrackerContext,
    write: Write & { type: RelationType; to: string; remove: boolean },
  ): Promise<Delivered> => {
    const action = write.remove ? "unrelate" : "relate";
    const phrase = `${write.issue} ${write.type} ${write.to}`;
    return guarded(
      ctx,
      write,
      action,
      { type: write.type, to: write.to },
      async () => {
        const adapter = options.adapter(ctx);
        return {
          ...await (write.remove
            ? adapter.unrelate(write.issue, write.type, write.to)
            : adapter.relate(write.issue, write.type, write.to)),
        };
      },
      (r) =>
        r.changed === true
          ? `${write.remove ? "removed" : "recorded"} ${phrase}`
          : `${phrase} is already ${
            write.remove ? "absent" : "recorded"
          }; wrote nothing`,
      `${write.issue}-${write.type}-${write.to}`,
    );
  };

  /**
   * publish's assign when a work item starts, through the assign capability.
   * Best effort and never retried, as issue-lifecycle's start assigns: any
   * failure, finding the user included, is a warning and is recorded as
   * skipped, so a re-run tries nothing. A ledger record already there is
   * returned as it is, so the caller can still act on what it says.
   */
  const assign = async (
    ctx: TrackerContext,
    write: { issue: string; key: DeliveryKey },
    assigner: Assigner,
    userOf: () => Promise<string>,
  ): Promise<Delivered & { result: Record<string, unknown> }> => {
    const name = deliveryName("assign", write.key, "publish");
    const raw = await resources(ctx).read(name);
    if (raw !== null) {
      const prior = DeliverySchema.parse(raw);
      if (prior.issue !== write.issue) {
        throw new Error(
          `delivery ${name} was made to ${prior.issue}, not ${write.issue}; ` +
            "a delivery key names one ticket",
        );
      }
      ctx.logger.info("{summary}", {
        summary: `already delivered (${name}); wrote nothing`,
      });
      return { handles: [], wrote: false, result: prior.result };
    }
    let user: string | null = null;
    let result: Record<string, unknown>;
    try {
      user = await userOf();
      result = { ...await assigner.assign(write.issue, user) };
    } catch (error) {
      const detail = error instanceof TrackerError
        ? error.detail
        : error instanceof Error
        ? error.message
        : String(error);
      result = {
        skipped: error instanceof TrackerError ? error.kind : "error",
        detail,
      };
      ctx.logger.info("{warning}", {
        warning: `did not assign ${write.issue}` +
          (user === null ? "" : ` to ${user}`) +
          `, and publish will not try again: ${detail}; assign it by hand`,
      });
    }
    const handle = await recordDelivery(ctx, name, {
      action: "assign",
      issue: write.issue,
      ...write.key,
      request: await digestOf({ user }),
      result,
      at: now().toISOString(),
    });
    if (result.skipped === undefined) {
      // Say who the tracker took off (the Lab drops those no longer on its
      // team), as the Lab's own assign method does.
      const dropped = Array.isArray(result.dropped) ? result.dropped : [];
      ctx.logger.info("{summary}", {
        summary: (result.changed === true
          ? `assigned ${write.issue} to ${user}`
          : `${write.issue} is already assigned to ${user}; wrote nothing`) +
          (dropped.length === 0
            ? ""
            : `; the tracker dropped ${dropped.join(", ")}`),
      });
    }
    return { handles: [handle], wrote: result.changed === true, result };
  };

  /**
   * Mark a ticket a duplicate of its primary: relate it duplicate_of, then
   * close it through the `closed` status key, unless the tracker closes a
   * duplicate itself. Only a ticket that is marked now is closed, so a
   * relation the tracker refused (a replay records it as skipped) leaves the
   * ticket open. The close has its own ledger record beside any status write
   * keyed on the same journal version.
   */
  const duplicate = async (
    ctx: TrackerContext,
    write: Write & { primary: string },
  ): Promise<Delivered> => {
    const adapter = options.adapter(ctx);
    // Checked before anything is written, so a ticket is never left
    // related but open for want of a status to close it with.
    if (
      adapter.closesDuplicates !== true &&
      options.statuses(argsOf(ctx))[DUPLICATE_STATUS] === undefined
    ) {
      throw new TrackerError(
        "invalid",
        options.tracker,
        `status key '${DUPLICATE_STATUS}' is not in the statuses global ` +
          "argument, so a duplicate cannot be closed; map it, then mark again",
      );
    }
    const related = await relation(ctx, {
      ...write,
      type: "duplicate_of",
      to: write.primary,
      remove: false,
    });
    if (adapter.closesDuplicates === true) return related;
    const issue = await adapter.fetchIssue(write.issue);
    if (findRelation(issue, "duplicate_of", write.primary) === undefined) {
      ctx.logger.info("{warning}", {
        warning: `${issue.display} is not a duplicate of ${write.primary}, ` +
          "so it was left open",
      });
      return related;
    }
    const closed = await setStatus(ctx, {
      issue: write.issue,
      key: write.key,
      replay: write.replay,
      suffix: "duplicate",
      status: DUPLICATE_STATUS,
      skipUnreachable: write.replay,
    });
    return {
      handles: [...related.handles, ...closed.handles],
      wrote: related.wrote || closed.wrote,
    };
  };

  return {
    comment,
    setStatus,
    setType,
    linkPr,
    entry,
    relation,
    assign,
    duplicate,
  };
}

const publishArguments = z.object({
  workItem: z.string().min(1).describe(
    "The work item's name (its key); its externalRefs name the ticket",
  ),
});

/**
 * A record's data as an object: its content, or its attributes. swamp
 * parses JSON content for readModelData and queryData, but a query result
 * may carry it as the JSON text instead, so that is parsed here; anything
 * else is no object.
 */
function recordObject(record: unknown): Record<string, unknown> | null {
  const r = record !== null && typeof record === "object"
    ? record as { content?: unknown; attributes?: unknown }
    : {};
  let content = r.content ?? r.attributes;
  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch {
      return null;
    }
  }
  return content !== null && typeof content === "object" &&
      !Array.isArray(content)
    ? content as Record<string, unknown>
    : null;
}

/**
 * One handle per record name, the last written: swamp refuses a method's
 * output that names a record twice, and publish writes a work item's cursor
 * once per ticket, twice when it crosses a retarget. Every version is
 * already stored; the handles only report them.
 */
export function lastPerName(handles: unknown[]): unknown[] {
  const nameOf = (h: unknown) =>
    h !== null && typeof h === "object" &&
      typeof (h as { name?: unknown }).name === "string"
      ? (h as { name: string }).name
      : null;
  return handles.filter((h, i) => {
    const name = nameOf(h);
    return name === null ||
      !handles.slice(i + 1).some((later) => nameOf(later) === name);
  });
}

/** The latest version of a named record among another model's data. */
function latestNamed(
  records: ModelDataRecord[],
  name: string,
): ModelDataRecord | null {
  const named = records.filter((r) => r.name === undefined || r.name === name);
  if (named.length === 0) return null;
  return named.find((r) => r.isLatest === true) ??
    named.reduce((a, b) => (b.version > a.version ? b : a));
}

/** A work item's run and pinned factory definition, read across model
 * instances. */
async function readWorkItem(ctx: TrackerContext, workItem: string) {
  if (ctx.readModelData === undefined) {
    throw new Error(
      "this method context has no readModelData; the runtime is too old " +
        "to read a work item from a tracker model",
    );
  }
  // Only a run whose own key is this work item counts: readModelData labels
  // data it attributes to the name from an earlier definition with the name
  // asked for too (see claim.ts).
  const runRecord = latestNamed(
    (await ctx.readModelData(workItem, RUN_SPEC)).filter((r) =>
      recordObject(r)?.key === workItem
    ),
    RUN_NAME,
  );
  if (runRecord === null) {
    throw new Error(`no work item '${workItem}': it has no run record`);
  }
  const parsed = parseRun(recordObject(runRecord));
  if (!parsed.ok) {
    throw new Error(
      `work item '${workItem}' has an unreadable run record:\n${
        parsed.errors.join("\n")
      }`,
    );
  }
  const run: RunRecord = parsed.value;
  // The copy the run names. readModelData gives only the latest version,
  // which is that one unless a repinning reset was cut short, so ask for the
  // exact version first. A query is not limited to this repository's
  // namespace; checkPinned accepts only a copy with the digest the run
  // recorded, so whichever candidate passes is the pinned factory definition.
  const candidates: unknown[] = [];
  if (ctx.queryData !== undefined && run.definition.version !== undefined) {
    // workItem has passed safePart, so it cannot break out of the string.
    try {
      candidates.push(
        ...await ctx.queryData(
          `modelName == "${workItem}" && specName == "${DEFINITION_SPEC}" && ` +
            `name == "${DEFINITION_NAME}" && ` +
            `version == ${run.definition.version}`,
        ),
      );
    } catch (error) {
      // The latest copy is almost always the pinned one; try it instead.
      ctx.logger.info("{summary}", {
        summary: `could not query the pinned definition of '${workItem}' ` +
          `by version (${
            error instanceof Error ? error.message : String(error)
          }); trying the latest copy`,
      });
    }
  }
  const latest = latestNamed(
    await ctx.readModelData(workItem, DEFINITION_SPEC),
    DEFINITION_NAME,
  );
  if (latest !== null) candidates.push(latest);
  // Every refusal is reported: which copy was wrong says what to repair.
  const refusals: string[] = [];
  for (const [i, candidate] of candidates.entries()) {
    try {
      const pinned = await checkPinned(recordObject(candidate), run);
      return { run, definition: pinned.definition };
    } catch (error) {
      const source = candidate === latest
        ? "the latest copy"
        : `the copy at version ${run.definition.version} (query result ${
          i + 1
        })`;
      refusals.push(
        `${source}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
  if (refusals.length > 0) {
    throw new Error(
      `no copy of the pinned definition of '${workItem}' is usable:\n` +
        refusals.map((r) => `- ${r}`).join("\n"),
    );
  }
  return { run, definition: (await checkPinned(null, run)).definition };
}

/**
 * A recorded product's payload at the version the journal names, from the
 * work item's data: that exact version by query, else the latest copy. A
 * copy counts only if its digest is the one the journal recorded, so the
 * entry describes what was recorded then, never a later version.
 */
async function readRecordedPayload(
  ctx: TrackerContext,
  workItem: string,
  product: EntryProduct,
): Promise<Record<string, unknown>> {
  const name = payloadName(product.kind, product.name);
  const candidates: unknown[] = [];
  if (ctx.queryData !== undefined) {
    // workItem has passed safePart and product names are NameSchema, so
    // neither can break out of the string.
    try {
      candidates.push(
        ...await ctx.queryData(
          `modelName == "${workItem}" && specName == "${product.kind}" && ` +
            `name == "${name}" && version == ${product.version}`,
        ),
      );
    } catch (error) {
      ctx.logger.info("{summary}", {
        summary: `could not query ${product.kind} '${product.name}' of ` +
          `'${workItem}' by version (${
            error instanceof Error ? error.message : String(error)
          }); trying the latest copy`,
      });
    }
  }
  if (ctx.readModelData !== undefined) {
    const latest = latestNamed(
      await ctx.readModelData(workItem, product.kind),
      name,
    );
    if (latest !== null) candidates.push(latest);
  }
  for (const candidate of candidates) {
    const payload = recordObject(candidate);
    if (payload !== null && await digestOf(payload) === product.digest) {
      return payload;
    }
  }
  throw new Error(
    `cannot read ${product.kind} '${product.name}' version ` +
      `${product.version} of '${workItem}' as it was recorded ` +
      `(${product.digest}); nothing was published past it`,
  );
}

const createArguments = z.object({
  title: z.string().min(1).describe("The new ticket's title"),
  body: z.string().min(1).describe("The new ticket's description, as markdown"),
  type: z.string().min(1).describe(
    "The new ticket's type, from the tracker's own types",
  ),
});

const fetchIssueArguments = z.object({
  issue: z.string().min(1).describe(
    "The ticket: its stable id, or its display identifier",
  ),
});

const commentArguments = z.object({
  issue: z.string().min(1).describe("The ticket's stable id"),
  body: z.string().min(1).describe("The comment, as markdown"),
  ...DeliveryInputs,
});

const setStatusArguments = z.object({
  issue: z.string().min(1).describe("The ticket's stable id"),
  status: z.string().min(1).describe(
    "A status key, mapped to the tracker's status name by the statuses global argument",
  ),
  ...DeliveryInputs,
});

const relateArguments = z.object({
  issue: z.string().min(1).describe(
    "The relation's subject, by stable id: the parent, the blocked ticket, " +
      "or the duplicate",
  ),
  type: z.enum(RELATION_TYPES).describe(
    "parent_of, blocked_by, related_to or duplicate_of",
  ),
  to: z.string().min(1).describe(
    "The other ticket's stable id: the child, the blocker, or the canonical",
  ),
  ...DeliveryInputs,
});

const markDuplicateArguments = z.object({
  issue: z.string().min(1).describe(
    "The duplicate: its stable id, or its display identifier",
  ),
  primary: z.string().min(1).describe(
    "The primary it duplicates: its stable id, or its display identifier",
  ),
  ...DeliveryInputs,
});

export function ticketName(issueId: string): string {
  return `ticket-${safePart("issue id", issueId)}`;
}

const claimArguments = z.object({
  issue: z.string().min(1).describe(
    "The ticket: its stable id, or its display identifier",
  ),
  factory: z.string().min(1).optional().describe(
    "The factory to start a new work item under; needed only when " +
      "the ticket has no work item, or its last one has finished",
  ),
  dryRun: z.boolean().optional().describe(
    "Report the ticket's work item, or that it has none, and write nothing",
  ),
});

/** The resource specs every tracker model declares. */
export const trackerResources = {
  [ISSUE_SPEC]: {
    description:
      "Each ticket: an external tracker's last snapshot (origin snapshot), or a built-in ticket itself (origin builtin); one record per ticket",
    schema: IssueSchema,
    lifetime: "infinite" as const,
    garbageCollection: 5,
  },
  [DELIVERY_SPEC]: {
    description:
      "The delivery ledger: what the tracker returned for each keyed write",
    schema: DeliverySchema,
    lifetime: "infinite" as const,
    // By age: each record is written once and must outlive any retry of its
    // key, so retention never counts versions here.
    garbageCollection: "1y",
  },
  [CURSOR_SPEC]: {
    description:
      "How far publish has delivered each work item: one record per work item",
    schema: CursorSchema,
    lifetime: "infinite" as const,
    garbageCollection: 5,
  },
  [TICKET_SPEC]: {
    description:
      "The ticket index: each ticket's work item, reserved or started, one record per ticket",
    schema: TicketClaimSchema,
    lifetime: "infinite" as const,
    // Only the latest version is read, and a ticket's record must outlive
    // its work item, so retention counts versions and never age.
    garbageCollection: 20,
  },
};

/** The create, fetch_issue, claim, comment, set_status, relate, unrelate and
 * publish methods, over one adapter. */
export function trackerMethods(options: TrackerModelOptions) {
  const now = options.now ?? (() => new Date());
  const argsOf = (ctx: TrackerContext) => ctx.globalArgs ?? {};
  const deliver = deliveries(options, now);

  // A snapshot only of an external tracker's ticket: a built-in ticket's
  // record is the ticket, and a read never overwrites it.
  const recordSnapshot = async (
    ctx: TrackerContext,
    adapter: TrackerAdapter,
    issue: TrackerIssue,
  ): Promise<unknown[]> => {
    if (adapter.origin !== "snapshot") return [];
    return [
      await resources(ctx).write(ISSUE_SPEC, issueName(issue.id), {
        origin: "snapshot",
        tracker: options.tracker,
        ...issue,
        fetchedAt: now().toISOString(),
      }),
    ];
  };
  const refsOf = (issue: TrackerIssue) =>
    JSON.stringify({
      [options.tracker]: issue.id,
      [`${options.tracker}.display`]: issue.display,
    });

  return {
    create: {
      description:
        "File a new ticket (an external tracker files it and its id is used); a retry after the tracker accepted it files another",
      arguments: createArguments,
      execute: async (
        args: z.infer<typeof createArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = options.adapter(ctx);
        const issue = await adapter.create({
          title: args.title,
          body: args.body,
          type: args.type,
        });
        const handles = await recordSnapshot(ctx, adapter, issue);
        ctx.logger.info("{summary}", {
          summary: `created ${issue.display} (${issue.id}): ${issue.title} ` +
            `[${issue.status.name}]`,
          ...(issue.url === undefined ? {} : { url: issue.url }),
          externalRefs: refsOf(issue),
        });
        return { dataHandles: handles };
      },
    },
    fetch_issue: {
      description:
        "Fetch a ticket by stable id or display identifier and record a snapshot, with the externalRefs to start a work item from it",
      arguments: fetchIssueArguments,
      execute: async (
        args: z.infer<typeof fetchIssueArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = options.adapter(ctx);
        const issue = await adapter.fetchIssue(args.issue);
        const handles = await recordSnapshot(ctx, adapter, issue);
        ctx.logger.info("{summary}", {
          summary: `${issue.display} (${issue.id}): ${issue.title} ` +
            `[${issue.status.name}]`,
          ...(issue.url === undefined ? {} : { url: issue.url }),
          externalRefs: refsOf(issue),
        });
        return { dataHandles: handles };
      },
    },
    claim: {
      description:
        "Start from a ticket: report its work item, or reserve a key for a new one (recorded before it starts) and print the start command",
      arguments: claimArguments,
      execute: async (
        args: z.infer<typeof claimArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = options.adapter(ctx);
        const issue = await adapter.fetchIssue(args.issue);
        await options.beforeClaim?.(ctx, issue);
        const naming = options.claimKey?.(argsOf(ctx), issue) ??
          { lead: displayLead(issue.display) };
        const written = await claimTicket(ctx, {
          tracker: options.tracker,
          issue,
          recordName: ticketName(issue.id),
          factory: args.factory,
          lead: naming.lead,
          first: naming.first,
          dryRun: args.dryRun,
          now: now(),
        });
        // The snapshot only once the claim has succeeded: a refused claim,
        // or a dry run, writes nothing.
        const handles = args.dryRun === true
          ? []
          : await recordSnapshot(ctx, adapter, issue);
        return { dataHandles: [...written, ...handles] };
      },
    },
    comment: {
      description:
        "Comment on a ticket; with a delivery key, a repeat of the same key posts nothing",
      arguments: commentArguments,
      execute: async (
        args: z.infer<typeof commentArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const { handles } = await deliver.comment(ctx, {
          issue: args.issue,
          body: args.body,
          key: deliveryKeyOf(args),
          replay: false,
        });
        return { dataHandles: handles };
      },
    },
    set_status: {
      description:
        "Move a ticket to a mapped status (publish is the single writer of a work item's status); already there writes nothing",
      arguments: setStatusArguments,
      execute: async (
        args: z.infer<typeof setStatusArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const { handles } = await deliver.setStatus(ctx, {
          issue: args.issue,
          status: args.status,
          key: deliveryKeyOf(args),
          replay: false,
          skipUnreachable: false,
        });
        return { dataHandles: handles };
      },
    },
    relate: {
      description:
        "Relate one ticket to another (parent_of, blocked_by, related_to, duplicate_of) under the rules every tracker shares; already related writes nothing",
      arguments: relateArguments,
      execute: async (
        args: z.infer<typeof relateArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const { handles } = await deliver.relation(ctx, {
          issue: args.issue,
          type: args.type,
          to: args.to,
          remove: false,
          key: deliveryKeyOf(args),
          replay: false,
        });
        return { dataHandles: handles };
      },
    },
    mark_duplicate: {
      description:
        "Mark a ticket a duplicate of a primary: relate it duplicate_of and close it where the tracker does not; it moves no work item, and publish and claim refuse the duplicate until a driver moves its work",
      arguments: markDuplicateArguments,
      execute: async (
        args: z.infer<typeof markDuplicateArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = options.adapter(ctx);
        const issue = await adapter.fetchIssue(args.issue);
        const primary = await adapter.fetchIssue(args.primary);
        const { handles } = await deliver.duplicate(ctx, {
          issue: issue.id,
          primary: primary.id,
          key: deliveryKeyOf(args),
          replay: false,
        });
        // The work item on the duplicate, if any, is the driver's to move.
        const raw = await resources(ctx).read(ticketName(issue.id));
        if (raw !== null) {
          const claimed = TicketClaimSchema.parse(raw);
          const run = await readClaimedRun(ctx, claimed.key);
          if (
            run !== null && run.status === "active" &&
            run.externalRefs[options.tracker] === issue.id
          ) {
            ctx.logger.info("{warning}", {
              warning: duplicateRefusal(
                issue,
                {
                  type: "duplicate_of",
                  direction: "outgoing",
                  issue: primary.id,
                  display: primary.display,
                },
                claimed.key,
              ),
            });
          }
        }
        return { dataHandles: handles };
      },
    },
    unrelate: {
      description:
        "Remove a relation between two tickets; already absent writes nothing",
      arguments: relateArguments,
      execute: async (
        args: z.infer<typeof relateArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const { handles } = await deliver.relation(ctx, {
          issue: args.issue,
          type: args.type,
          to: args.to,
          remove: true,
          key: deliveryKeyOf(args),
          replay: false,
        });
        return { dataHandles: handles };
      },
    },
    publish: {
      description:
        "Replay a work item's journal to its ticket: a comment per event a person needs, and the status when the stage's key changes; a re-run delivers only what is new",
      arguments: publishArguments,
      execute: async (
        args: z.infer<typeof publishArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const workItem = safePart("workItem", args.workItem);
        const { run, definition } = await readWorkItem(ctx, workItem);
        // Only the tracker pinned at start: its cursor is the one the work
        // item's status reads.
        const self = ctx.definition?.name;
        if (self !== undefined && run.tracker.instance !== self) {
          throw new Error(
            `work item '${workItem}' was started against tracker ` +
              `'${run.tracker.instance}', not '${self}': publish it there`,
          );
        }
        // One segment per ticket: a retarget moves the rest of the journal
        // to another ticket (DESIGN.md, "The publisher").
        const segments = ticketSegments(run, definition, options.tracker);
        if (segments.every((s) => s.issue === null)) {
          throw new Error(
            `work item '${workItem}' has no externalRefs.${options.tracker}; ` +
              "start it with the ticket's stable id to publish it",
          );
        }
        const recordName = cursorName(workItem);
        const rawCursor = await resources(ctx).read(recordName);
        const cursor = rawCursor === null
          ? null
          : CursorSchema.parse(rawCursor);
        const journalVersion = run.journal.length;
        const since = cursor?.journalVersion ?? 0;
        if (since > journalVersion) {
          throw new Error(
            `the cursor for '${workItem}' is at journal version ${since}, ` +
              `past the run's ${journalVersion}; the journal only grows`,
          );
        }
        // The cursor's ticket must be the one its journal version belongs
        // to: another ticket is only reached through a retarget.
        const resume = cursor === null
          ? 0
          : segments.findIndex((s) =>
            s.issue === cursor.issue && s.after <= since && since <= s.through
          );
        if (cursor !== null && resume === -1) {
          throw new Error(
            `work item '${workItem}' was published to ${cursor.issue}, and ` +
              `now names ${segments.at(-1)?.issue ?? "no ticket"} with no ` +
              "retarget between; one work item projects to one ticket at a time",
          );
        }
        // Segments after the last ticket (a retarget removed this tracker's
        // ref) have nowhere to go, so they are never pending.
        const lastTicket = segments.findLastIndex((s) => s.issue !== null);
        const adapter = options.adapter(ctx);
        // The duplicate marks in the journal (DESIGN.md, "Duplicates"), and
        // the primary each names, read from its recorded product: no network.
        const marks = duplicateMarks(run, definition);
        const marksIn = (segment: TicketSegment) =>
          marks.filter((m) =>
            m.journalVersion > segment.after &&
            m.journalVersion <= segment.through
          );
        const refOf = async (
          mark: DuplicateMark,
        ): Promise<{ ref: string } | { why: string }> => {
          if (mark.product === null) {
            return {
              why: `'${mark.gateId}' was approved with no '${mark.record}' ` +
                "recorded before it",
            };
          }
          const payload = await readRecordedPayload(
            ctx,
            workItem,
            mark.product,
          );
          const ref = payload[mark.field];
          return typeof ref === "string" && ref !== "" ? { ref } : {
            why: `'${mark.record}' has no ${mark.field} naming the primary`,
          };
        };
        const moveOf = (segment: TicketSegment, lastStatus: string | null) =>
          segment.status !== null && segment.status !== lastStatus
            ? segment.status
            : null;
        const resumed = segments[resume];
        // The cursor is written after the status, so a lost cursor write
        // leaves it behind the ledger: the key last written is the ledger's,
        // from the cursor's own version on (a failed move's retry is keyed
        // there), so a person's move since is not undone.
        const resumedIssue = cursor?.issue ?? resumed.issue;
        const written = resumedIssue === null ? undefined : await statusWritten(
          ctx,
          definition,
          workItem,
          resumedIssue,
          since,
          resumed.through,
        );
        const resumedStatus = written === undefined
          ? cursor?.status ?? null
          : written;
        if (
          resume === lastTicket && since === resumed.through &&
          moveOf(resumed, resumedStatus) === null
        ) {
          // Nothing to deliver, but a cursor behind the ledger is brought
          // level, and a failed move that has since landed is cleared.
          if (
            cursor !== null && written !== undefined &&
            written !== cursor.status
          ) {
            const { statusFailed } = cursor;
            await resources(ctx).write(CURSOR_SPEC, recordName, {
              workItem,
              issue: cursor.issue,
              journalVersion: since,
              status: written,
              ...(statusFailed === undefined || statusFailed.status === written
                ? {}
                : { statusFailed }),
              at: now().toISOString(),
            });
          }
          ctx.logger.info("{summary}", {
            summary: `${workItem} is up to date on ${resumed.issue}` +
              (lastTicket < segments.length - 1
                ? `; later events name no ${options.tracker} ticket`
                : ""),
          });
          return { dataHandles: [] };
        }

        // Entry mode: the factory definition says which events become which
        // entries, and the tracker keeps them. They replace the comments.
        const entryMode = adapter.capabilities.history !== undefined &&
          declaresEntries(definition);
        const handles: unknown[] = [];
        // Assigning when the work item starts: where the tracker can, and a
        // login maps to its user. Once, on the started event's version.
        const assigner = adapter.capabilities.assign;
        const linksPrs = adapter.capabilities.pullRequests !== undefined;
        const assignee = options.assignee;
        const startedVersion =
          run.journal.findIndex((e) => e.type === "started") + 1;
        const ticketStatus = new Map<string, string>();
        const statusNameOf = async (
          issue: string,
          key: string | null,
          journalVersion: number,
        ): Promise<string> => {
          const name = key === null
            ? undefined
            : options.statuses(argsOf(ctx))[key];
          if (name !== undefined) return name;
          // A label only, so an unmapped key does not hold back the entry
          // or any later one: it falls back as an entry without a key does.
          if (key !== null) {
            ctx.logger.info("{warning}", {
              warning: `status key '${key}' labels the entry for journal ` +
                `version ${journalVersion} but is not in ${
                  statusesArgument(ctx, options.tracker)
                }; labelled with the ticket's status instead`,
            });
          }
          // Nothing names a label yet (a first stage without a key): the
          // status the ticket has, which is what the entry happened in.
          let current = ticketStatus.get(issue);
          if (current === undefined) {
            current = (await adapter.fetchIssue(issue)).status.name;
            ticketStatus.set(issue, current);
          }
          return current;
        };

        for (let k = resume; k <= lastTicket; k++) {
          const segment = segments[k];
          const issue = segment.issue;
          const first = k === resume;
          // The resumed segment's opening note went out with its cursor.
          const from = first ? since : segment.after;
          const lastStatus = first ? resumedStatus : null;
          if (issue === null) {
            ctx.logger.info("{summary}", {
              summary: `journal versions ${from + 1} to ${segment.through} ` +
                `of ${workItem} name no ${options.tracker} ticket; skipped`,
            });
            continue;
          }
          const moveTo = moveOf(segment, lastStatus);
          if (first && from === segment.through && moveTo === null) continue;
          // The ticket as last read; null once a write may have changed it.
          let ticketNow: TrackerIssue | null = null;
          // A work item still at work on a ticket marked a duplicate outside
          // its own journal is not projected there: a driver moves it first.
          // A segment a retarget ends, or a finished work item, still reaches
          // the ticket, so the move itself can be published.
          if (k === lastTicket && run.status === "active") {
            ticketNow = await adapter.fetchIssue(issue);
            ticketStatus.set(issue, ticketNow.status.name);
            const primary = primaryOf(ticketNow);
            let own = false;
            for (const mark of primary === undefined ? [] : marksIn(segment)) {
              const named = await refOf(mark);
              own ||= "ref" in named &&
                (named.ref === primary?.issue ||
                  named.ref === primary?.display);
            }
            if (primary !== undefined && !own) {
              throw new Error(
                duplicateRefusal(ticketNow, primary, workItem) +
                  "; nothing was published",
              );
            }
          }
          // A retarget moved the work item here: the ticket index follows.
          if (!first && segment.opening !== undefined) {
            const opened = run.journal[segment.after - 1];
            const refs = opened?.type === "retargeted" ? opened.to : {};
            handles.push(
              ...await moveClaim(ctx, {
                tracker: options.tracker,
                issue: {
                  id: issue,
                  display: refs[`${options.tracker}.display`] || issue,
                },
                recordName: ticketName(issue),
                key: workItem,
                factory: run.factory,
                now: now(),
              }),
            );
          }
          let posted = 0;
          // Only the publish that delivers the started event assigns: a
          // work item first published before there was assigning never is.
          let assignPending = startedVersion > from &&
            startedVersion <= segment.through;
          // After the started event's own write, whether or not it had one,
          // and before any later event's: issue-lifecycle's order.
          const assignBefore = async (journalVersion: number) => {
            if (
              !assignPending || journalVersion <= startedVersion ||
              assigner === undefined || assignee === undefined
            ) return;
            assignPending = false;
            const key = { workItem, journalVersion: startedVersion };
            const done = await deliver.assign(
              ctx,
              { issue, key },
              assigner,
              () => assignee(ctx),
            );
            handles.push(...done.handles);
            // From the ledger, so a re-run after this entry failed still
            // writes it; its own key keeps it to once.
            const { result } = done;
            if (!entryMode || result.changed !== true) return;
            const user = String(result.user);
            const entry = await deliver.entry(ctx, {
              issue,
              key,
              replay: true,
              suffix: "assigned",
              entry: {
                step: "assigned",
                targetStatus: String(result.status),
                summary: `Assigned to ${user}`,
                emoji: "\u{1F464}",
                payload: {
                  username: user,
                  ...(result.details as Record<string, unknown> | undefined),
                },
                isVerbose: false,
              },
            });
            handles.push(...entry.handles);
            if (entry.wrote) posted++;
          };
          const note = async (planned: PlannedComment, suffix?: string) => {
            const done = await deliver.comment(ctx, {
              issue,
              body: planned.body,
              key: { workItem, journalVersion: planned.journalVersion },
              replay: true,
              ...(suffix === undefined ? {} : { suffix }),
            });
            handles.push(...done.handles);
            if (done.wrote) posted++;
          };
          if (!first && segment.opening !== undefined) {
            await note(segment.opening, "opening");
          }
          const inSegment = (e: { journalVersion: number }) =>
            e.journalVersion <= segment.through;
          for (
            const event of entryMode
              ? projectEntries(run, definition, from).filter(inSegment)
              : []
          ) {
            await assignBefore(event.journalVersion);
            const payload = event.product === undefined
              ? {}
              : await readRecordedPayload(ctx, workItem, event.product);
            const chosen = chooseEntry(event.candidates, payload);
            if (chosen === null) continue;
            const entry = renderEntry(chosen, event, payload);
            const key = { workItem, journalVersion: event.journalVersion };
            // issue-lifecycle's order: the type, then the entry saying so.
            if (entry.type !== undefined) {
              const done = await deliver.setType(ctx, {
                issue,
                type: entry.type,
                key,
                replay: true,
              });
              handles.push(...done.handles);
            }
            // Then the pull request the entry reads, where the tracker
            // links one; a tracker without links has nothing to write.
            if (entry.pr !== undefined && linksPrs) {
              const done = await deliver.linkPr(ctx, {
                issue,
                url: entry.pr,
                key,
                replay: true,
              });
              handles.push(...done.handles);
            }
            const done = await deliver.entry(ctx, {
              issue,
              key,
              replay: true,
              ...(event.suffix === undefined ? {} : { suffix: event.suffix }),
              entry: {
                step: entry.step,
                targetStatus: await statusNameOf(
                  issue,
                  entry.status,
                  event.journalVersion,
                ),
                summary: entry.summary,
                emoji: entry.emoji,
                payload: entry.payload,
                isVerbose: entry.isVerbose,
              },
            });
            handles.push(...done.handles);
            if (done.wrote) posted++;
          }
          for (
            const planned of entryMode
              ? []
              : ticketView(run, definition, from).comments.filter(inSegment)
          ) {
            await assignBefore(planned.journalVersion);
            await note(planned);
          }
          await assignBefore(Number.POSITIVE_INFINITY);
          // A mark that names no other ticket the tracker has marks nothing,
          // with a warning: an approval with no product before it, no
          // primary in its field, a primary the tracker cannot find, or this
          // ticket itself (an approval after the retarget onto it).
          for (const mark of marksIn(segment)) {
            if (mark.journalVersion <= from) continue;
            const named = await refOf(mark);
            const unmarked = `, so ${issue} was not marked a duplicate`;
            if ("why" in named) {
              ctx.logger.info("{warning}", { warning: named.why + unmarked });
              continue;
            }
            let primary: TrackerIssue;
            try {
              primary = await adapter.fetchIssue(named.ref);
            } catch (error) {
              if (
                !(error instanceof TrackerError) || error.kind !== "not_found"
              ) {
                throw error;
              }
              ctx.logger.info("{warning}", {
                warning: `'${mark.record}' names ${named.ref}, which the ` +
                  `tracker cannot find${unmarked}`,
              });
              continue;
            }
            if (primary.id === issue) {
              ctx.logger.info("{warning}", {
                warning: `'${mark.record}' names ${issue} as its own ` +
                  `primary${unmarked}`,
              });
              continue;
            }
            ticketNow = null;
            const done = await deliver.duplicate(ctx, {
              issue,
              primary: primary.id,
              key: { workItem, journalVersion: mark.journalVersion },
              replay: true,
            });
            handles.push(...done.handles);
          }
          // The retarget is the segment's last event. Its notes are comments
          // in entry mode too: no entry answers a retarget.
          if (
            segment.closing !== undefined &&
            segment.closing.journalVersion > from
          ) {
            await note(segment.closing);
          }
          const cursorAt = (
            status: string | null,
            statusFailed?: { status: string; detail: string },
          ) =>
            resources(ctx).write(CURSOR_SPEC, recordName, {
              workItem,
              issue,
              journalVersion: segment.through,
              status,
              ...(statusFailed === undefined ? {} : { statusFailed }),
              at: now().toISOString(),
            });
          // A duplicate keeps its closed status, however it was marked: no
          // status write reopens it.
          if (moveTo !== null) {
            ticketNow ??= await adapter.fetchIssue(issue);
            const primary = primaryOf(ticketNow);
            if (primary !== undefined) {
              ctx.logger.info("{summary}", {
                summary: `${issue} is a duplicate of ${primary.display}, so ` +
                  `its status was left alone, not moved to '${moveTo}'`,
              });
            } else {
              try {
                const done = await deliver.setStatus(ctx, {
                  issue,
                  status: moveTo,
                  key: { workItem, journalVersion: segment.statusVersion },
                  replay: true,
                  skipUnreachable: true,
                });
                handles.push(...done.handles);
              } catch (error) {
                // Everything before the move was delivered, so the cursor
                // moves past it; it keeps the key last written, so the next
                // publish sees the move still wanted and retries only that.
                const detail = error instanceof TrackerError
                  ? error.detail
                  : error instanceof Error
                  ? error.message
                  : String(error);
                await cursorAt(lastStatus, { status: moveTo, detail });
                const message = `could not move ${issue} to status key ` +
                  `'${moveTo}': ${detail}. The events through journal version ` +
                  `${segment.through} were delivered; the next publish ` +
                  "retries only this move";
                throw error instanceof TrackerError
                  ? new TrackerError(
                    error.kind,
                    error.tracker,
                    message,
                    error.reason,
                  )
                  : new Error(message);
              }
            }
          }
          // Last for each ticket: a failure above leaves the cursor where it
          // was, and the re-run's replay finds each landed write in the
          // ledger.
          handles.push(await cursorAt(moveTo ?? lastStatus));
          ctx.logger.info("{summary}", {
            summary: `published ${workItem} to ${issue} through journal ` +
              `version ${segment.through}: ${posted} ` +
              (entryMode ? "entry(ies) or note(s)" : "comment(s)") +
              (moveTo === null ? "" : `, status '${moveTo}'`),
          });
        }
        return { dataHandles: lastPerName(handles) };
      },
    },
  };
}
