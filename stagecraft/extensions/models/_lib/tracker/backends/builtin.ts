// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.6.7";
import {
  type Assigner,
  type Assignment,
  type IssueDraft,
  type LifecycleEntry,
  type LifecycleEntryWriter,
  type PostedEntry,
  type RelationChange,
  type RelationType,
  type StatusChange,
  type TicketActivity,
  type TrackerAdapter,
  type TrackerComment,
  TrackerError,
  type TrackerErrorKind,
  type TrackerIssue,
  type TrackerRelation,
} from "../core/adapter.ts";
import { checkRelate } from "../core/relations.ts";
import {
  type BuiltinIssue,
  BuiltinIssueSchema,
  ISSUE_SPEC,
  issueName,
} from "../core/tracker_methods.ts";

// ---------------------------------------------------------------------------
// The built-in tracker: tickets kept in swamp data on the tracker instance,
// for a project with no external tracker (DESIGN.md, "The built-in
// tracker"). Its issue-<id> records are the tickets themselves (origin
// builtin), so nothing reads them back from anywhere. Ids are <prefix>-<n>,
// from a counter per prefix in the tracker's own data, or an id the caller
// supplies (a label such as another system's ticket id: nothing reads or
// updates that ticket); create runs under the tracker instance's lock, so
// two creates never take one id. Statuses
// and types are the instance's own lists, and a status may move in any
// direction. It keeps lifecycle entries and the ticket type,
// so it has the history capability, and assignees (swamp usernames), so it
// has the assign capability. A relation is kept on both tickets'
// records, the subject's side written first and removed last; a re-run after
// a crash between the two finishes the job, checking the rules again first.
// It never makes a network call.
// ---------------------------------------------------------------------------

export const BUILTIN = "builtin";
export const BUILTIN_TYPE = "@swamp/stagecraft/tracker";

export const DEFAULT_STATUSES = [
  "open",
  "in_progress",
  "shipped",
  "closed",
] as const;
export const DEFAULT_TYPES = ["bug", "feature", "security"] as const;

export const COMMENT_SPEC = "comment";
export const ENTRY_SPEC = "entry";
export const COUNTER_SPEC = "counter";

/** The next number create tries for a prefix: a floor, since a name some
 * ticket or definition already has is passed over. */
export const BuiltinCounterSchema = z.object({
  prefix: z.string(),
  next: z.number().int().positive(),
});

/** The counter record's name for a prefix. */
export function counterName(prefix: string): string {
  return `counter-${prefix}`;
}

/** A comment on a built-in ticket, written once. */
export const BuiltinCommentSchema = z.object({
  issue: z.string(),
  id: z.string(),
  body: z.string(),
  at: z.string(),
});

/** A lifecycle entry on a built-in ticket, written once. */
export const BuiltinEntrySchema = z.object({
  issue: z.string(),
  id: z.string(),
  step: z.string(),
  targetStatus: z.string(),
  summary: z.string(),
  emoji: z.string(),
  payload: z.record(z.string(), z.unknown()),
  isVerbose: z.boolean(),
  at: z.string(),
});

/** The tracker instance's own data, as the adapter reads and writes it. */
export interface BuiltinStore {
  read(name: string): Promise<Record<string, unknown> | null>;
  write(
    spec: string,
    name: string,
    data: Record<string, unknown>,
  ): Promise<unknown>;
  /** Whether a model definition already has this name: a work item's key. */
  nameTaken(name: string): Promise<boolean>;
  /**
   * Whether any tracker's ticket in the repository already has this stable
   * id: another built-in instance's, before a supplied id takes it. False
   * when the repository's data cannot be queried.
   */
  ticketIdTaken(id: string): Promise<boolean>;
  /**
   * The highest n of any `<prefix>-<n>` ticket id or model definition name
   * (`<prefix>-<n>-...` too) already in the repository, 0 for none: where a
   * new counter starts, so a recreated tracker never reuses an id.
   */
  highestNumber(prefix: string): Promise<number>;
  /**
   * A ticket's comment or entry records (the spec), latest version of each.
   * Absent when the store cannot list them: fetchIssue then reads no
   * activity, rather than failing a claim that only needs the ticket.
   */
  records?(spec: string, issueId: string): Promise<Record<string, unknown>[]>;
}

export interface BuiltinOptions {
  /** Leads every id: lowercase letters, digits and '-', at most 12. */
  prefix: string;
  /** The status names; a new ticket starts in the first. */
  statuses: readonly string[];
  types: readonly string[];
  store: BuiltinStore;
  now?: () => Date;
}

// A built-in id: lowercase, and the shape of a swamp instance name.
const ID = /^[a-z0-9][a-z0-9_-]*$/;

// A supplied id is its first work item's key, so it fits swamp's 64-character
// name.
const SUPPLIED_ID_MAX_LENGTH = 64;

/** A new built-in ticket: the contract's draft, and optionally its id. */
export interface BuiltinDraft extends IssueDraft {
  /**
   * The ticket's id as the caller writes it (`SREMON-2131`): its display id
   * exactly, and, lowercased, its stable id and its work item's key. Absent,
   * the counter numbers the ticket.
   */
  id?: string;
}

/** The built-in tracker's adapter: create also takes a supplied id. */
export interface BuiltinAdapter extends TrackerAdapter {
  create(draft: BuiltinDraft): Promise<TrackerIssue>;
}

function fail(kind: TrackerErrorKind, detail: string): never {
  throw new TrackerError(kind, BUILTIN, detail);
}

/** A built-in tracker that speaks the tracker adapter contract. */
export function builtinAdapter(options: BuiltinOptions): BuiltinAdapter {
  const { store, statuses, types } = options;
  const now = () => (options.now ?? (() => new Date()))().toISOString();
  if (statuses.length === 0) fail("invalid", "statuses is empty");
  if (types.length === 0) fail("invalid", "types is empty");

  // A ref as a stable id: ids are lowercase, so any case finds one.
  function idOf(ref: string): string {
    const id = ref.toLowerCase();
    if (!ID.test(id)) {
      fail("invalid", `'${ref}' is not a built-in ticket id`);
    }
    return id;
  }

  async function read(ref: string): Promise<BuiltinIssue> {
    const id = idOf(ref);
    const raw = await store.read(issueName(id));
    if (raw === null) return fail("not_found", `no ticket '${id}'`);
    const parsed = BuiltinIssueSchema.safeParse(raw);
    if (!parsed.success) {
      return fail(
        "upstream",
        `the record for '${id}' is not a built-in ticket: ${parsed.error.message}`,
      );
    }
    return parsed.data;
  }

  async function write(issue: BuiltinIssue): Promise<void> {
    await store.write(ISSUE_SPEC, issueName(issue.id), issue);
  }

  function toIssue(issue: BuiltinIssue): TrackerIssue {
    return {
      id: issue.id,
      display: issue.display,
      title: issue.title,
      status: issue.status,
      details: {
        body: issue.body,
        type: issue.type,
        assignees: issue.assignees ?? [],
      },
      relations: issue.relations,
      description: issue.body,
      labels: [issue.type],
      assignees: issue.assignees ?? [],
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt,
    };
  }

  /** The ticket's comments and entries, oldest first; a record that is not
   * one is skipped. Undefined when the store cannot list them. */
  async function activityOf(
    issueId: string,
  ): Promise<TicketActivity[] | undefined> {
    if (store.records === undefined) return undefined;
    const activity: TicketActivity[] = [];
    for (const raw of await store.records(COMMENT_SPEC, issueId)) {
      const c = BuiltinCommentSchema.safeParse(raw);
      if (!c.success || c.data.issue !== issueId) continue;
      activity.push({
        kind: "comment",
        id: c.data.id,
        body: c.data.body,
        at: c.data.at,
      });
    }
    for (const raw of await store.records(ENTRY_SPEC, issueId)) {
      const e = BuiltinEntrySchema.safeParse(raw);
      if (!e.success || e.data.issue !== issueId) continue;
      activity.push({
        kind: "entry",
        id: e.data.id,
        body: e.data.summary,
        step: e.data.step,
        at: e.data.at,
      });
    }
    return activity.sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  }

  /** Add or drop one side of a relation; true when the record changed. */
  async function setSide(
    issue: BuiltinIssue,
    side: TrackerRelation,
    present: boolean,
  ): Promise<boolean> {
    const same = (r: TrackerRelation) =>
      r.type === side.type && r.direction === side.direction &&
      r.issue === side.issue;
    if (issue.relations.some(same) === present) return false;
    await write({
      ...issue,
      relations: present
        ? [...issue.relations, side]
        : issue.relations.filter((r) => !same(r)),
      updatedAt: now(),
    });
    return true;
  }

  /** Both sides of `from type to`, as each ticket keeps it. */
  function sides(from: TrackerIssue, type: RelationType, to: TrackerIssue) {
    return {
      out: {
        type,
        direction: "outgoing" as const,
        issue: to.id,
        display: to.display,
      },
      in: {
        type,
        direction: "incoming" as const,
        issue: from.id,
        display: from.display,
      },
    };
  }

  const status = (name: string) => ({ id: name, name });

  function checkStatus(name: string): void {
    if (!statuses.includes(name)) {
      fail(
        "invalid",
        `'${name}' is not a status of this tracker (they are: ${
          statuses.join(", ")
        })`,
      );
    }
  }

  function checkType(type: string): void {
    if (!types.includes(type)) {
      fail(
        "invalid",
        `'${type}' is not a ticket type of this tracker (they are: ${
          types.join(", ")
        })`,
      );
    }
  }

  const history: LifecycleEntryWriter = {
    async postEntry(
      issueId: string,
      entry: LifecycleEntry,
    ): Promise<PostedEntry> {
      const issue = await read(issueId);
      checkStatus(entry.targetStatus);
      const id = crypto.randomUUID();
      await store.write(
        ENTRY_SPEC,
        `entry-${issue.id}-${id}`,
        {
          issue: issue.id,
          id,
          ...entry,
          at: now(),
        } satisfies z.infer<typeof BuiltinEntrySchema>,
      );
      return { id };
    },

    async setType(
      issueId: string,
      type: string,
    ): Promise<{ changed: boolean; type: string }> {
      checkType(type);
      const issue = await read(issueId);
      if (issue.type === type) return { changed: false, type };
      await write({ ...issue, type, updatedAt: now() });
      return { changed: true, type };
    },
  };

  const assign: Assigner = {
    async assign(issueId: string, user: string): Promise<Assignment> {
      if (user.trim() === "") return fail("invalid", "no user to assign");
      const issue = await read(issueId);
      const assignees = issue.assignees ?? [];
      const status = issue.status.name;
      if (assignees.includes(user)) {
        return { changed: false, user, status, dropped: [] };
      }
      await write({
        ...issue,
        assignees: [...assignees, user],
        updatedAt: now(),
      });
      return { changed: true, user, status, dropped: [] };
    },
  };

  /** The counter's next id, and the number the counter moves on to. */
  async function counted(): Promise<
    { id: string; display: string; next: number }
  > {
    const { prefix } = options;
    const counter = BuiltinCounterSchema.safeParse(
      await store.read(counterName(prefix)),
    );
    // No counter yet (a new tracker, a recreated one, or a new prefix):
    // start above every number this prefix already has.
    let n = counter.success
      ? counter.data.next
      : await store.highestNumber(prefix) + 1;
    // Pass over a name this tracker's tickets or any definition already
    // has: a key started by hand, another tracker's started work item, a
    // supplied id. An unstarted ticket on another tracker with this prefix
    // is not seen; claim qualifies the key if the two meet.
    while (
      await store.read(issueName(`${prefix}-${n}`)) !== null ||
      await store.nameTaken(`${prefix}-${n}`)
    ) {
      n++;
    }
    const id = `${prefix}-${n}`;
    return { id, display: id, next: n + 1 };
  }

  /**
   * A supplied id, refused unless it can be a key no ticket or work item
   * has: `SREMON-2131` is displayed as given and is `sremon-2131` otherwise.
   * The counter's own ids (`<prefix>-<n>`) are refused, so the counter never
   * meets one.
   */
  async function supplied(
    given: string,
  ): Promise<{ id: string; display: string; next?: undefined }> {
    // Tested before lowercasing: some letters outside ASCII lowercase into it.
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(given)) {
      return fail(
        "invalid",
        `'${given}' cannot be a ticket id: use letters, digits, '-' and ` +
          "'_', starting with a letter or digit",
      );
    }
    const id = given.toLowerCase();
    if (id.length > SUPPLIED_ID_MAX_LENGTH) {
      return fail(
        "invalid",
        `'${given}' is longer than ${SUPPLIED_ID_MAX_LENGTH} characters`,
      );
    }
    if (!/[a-z]/.test(id)) {
      return fail(
        "invalid",
        `'${given}' has no letter; a ticket id needs one, as in ABC-12`,
      );
    }
    // The prefix has passed the prefix rules, so it is safe in a pattern.
    if (new RegExp(`^${options.prefix}-[0-9]+$`).test(id)) {
      return fail(
        "invalid",
        `'${given}' is one of this tracker's own numbered ids ` +
          `(${options.prefix}-<n>); create numbers those itself, so leave ` +
          "out id, or choose one in another form",
      );
    }
    if (await store.read(issueName(id)) !== null) {
      return fail("invalid", `there is already a ticket '${id}'`);
    }
    if (await store.ticketIdTaken(id)) {
      return fail(
        "invalid",
        `another tracker already has a ticket '${id}'`,
      );
    }
    if (await store.nameTaken(id)) {
      return fail(
        "invalid",
        `'${id}' is already a work item's or a model's name, so the ticket's ` +
          "work item could not take it",
      );
    }
    return { id, display: given };
  }

  return {
    tracker: BUILTIN,
    origin: "builtin",
    capabilities: { history, assign },

    async create(draft: BuiltinDraft): Promise<TrackerIssue> {
      checkType(draft.type);
      if (draft.title.trim() === "") {
        return fail("invalid", "a ticket needs a title");
      }
      const { id, display, next } = draft.id === undefined
        ? await counted()
        : await supplied(draft.id);
      const at = now();
      const issue: BuiltinIssue = {
        origin: "builtin",
        tracker: BUILTIN,
        id,
        display,
        title: draft.title,
        body: draft.body,
        type: draft.type,
        status: status(statuses[0]),
        relations: [],
        createdAt: at,
        updatedAt: at,
      };
      // The ticket first: a crash before the counter moves leaves a name the
      // next create passes over. A supplied id leaves the counter alone.
      await write(issue);
      if (next !== undefined) {
        await store.write(
          COUNTER_SPEC,
          counterName(options.prefix),
          {
            prefix: options.prefix,
            next,
          } satisfies z.infer<typeof BuiltinCounterSchema>,
        );
      }
      return toIssue(issue);
    },

    async fetchIssue(ref: string): Promise<TrackerIssue> {
      const issue = toIssue(await read(ref));
      const activity = await activityOf(issue.id);
      return activity === undefined ? issue : { ...issue, activity };
    },

    async comment(issueId: string, body: string): Promise<TrackerComment> {
      const issue = await read(issueId);
      const id = crypto.randomUUID();
      await store.write(
        COMMENT_SPEC,
        `comment-${issue.id}-${id}`,
        {
          issue: issue.id,
          id,
          body,
          at: now(),
        } satisfies z.infer<typeof BuiltinCommentSchema>,
      );
      return { id };
    },

    async setStatus(
      issueId: string,
      statusName: string,
    ): Promise<StatusChange> {
      checkStatus(statusName);
      const issue = await read(issueId);
      if (issue.status.name === statusName) {
        return { changed: false, status: issue.status };
      }
      // Any direction: the factory decides the order, not the tracker.
      await write({ ...issue, status: status(statusName), updatedAt: now() });
      return { changed: true, status: status(statusName) };
    },

    async relate(
      from: string,
      type: RelationType,
      to: string,
    ): Promise<RelationChange> {
      const source = await read(from);
      const target = await read(to);
      const side = sides(toIssue(source), type, toIssue(target));
      const holds = (issue: BuiltinIssue, s: TrackerRelation) =>
        issue.relations.some((r) =>
          r.type === s.type && r.direction === s.direction &&
          r.issue === s.issue
        );
      if (holds(source, side.out) && holds(target, side.in)) {
        return { changed: false };
      }
      // Neither side, or one left by a crash between the two writes: the
      // rules run as though the relation were absent, so finishing a half
      // relation never lets through what a new one would be refused (a
      // second parent related while this one was half-written).
      const without = (issue: BuiltinIssue): TrackerIssue => ({
        ...toIssue(issue),
        relations: issue.relations.filter((r) =>
          !(r.type === type &&
            ((issue.id === source.id && r.direction === "outgoing" &&
              r.issue === target.id) ||
              (issue.id === target.id && r.direction === "incoming" &&
                r.issue === source.id)))
        ),
      });
      const check = await checkRelate(
        async (id) => without(await read(id)),
        BUILTIN,
        source.id,
        type,
        target.id,
      );
      if (check.exists) return { changed: false };
      // The subject's side first: the target's side mirrors it.
      const wroteOut = await setSide(await read(source.id), side.out, true);
      const wroteIn = await setSide(await read(target.id), side.in, true);
      return { changed: wroteOut || wroteIn };
    },

    async unrelate(
      from: string,
      type: RelationType,
      to: string,
    ): Promise<RelationChange> {
      const source = await read(from);
      const target = await read(to);
      const side = sides(toIssue(source), type, toIssue(target));
      // The target's side first, so the subject's side, which counts, goes
      // last.
      const wroteIn = await setSide(target, side.in, false);
      const wroteOut = await setSide(source, side.out, false);
      return { changed: wroteIn || wroteOut };
    },
  };
}
