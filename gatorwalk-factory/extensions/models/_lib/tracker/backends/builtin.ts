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
import { generateKey } from "../../engine/tracker.ts";
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
// builtin), so nothing reads them back from anywhere. Ids are
// <prefix>-<slug>-<4 random characters>, by the work-item key rules: no
// counter, so several people can file tickets without one place minting
// numbers. Statuses and types are the instance's own lists, and a status
// may move in any direction. It keeps lifecycle entries and the ticket type,
// so it has the history capability, and assignees (swamp usernames), so it
// has the assign capability. A relation is kept on both tickets'
// records, the subject's side written first and removed last; a re-run after
// a crash between the two finishes the job, checking the rules again first.
// It never makes a network call.
// ---------------------------------------------------------------------------

export const BUILTIN = "builtin";
export const BUILTIN_TYPE = "@swamp/gatorwalk-factory/tracker";

export const DEFAULT_STATUSES = [
  "open",
  "in_progress",
  "shipped",
  "closed",
] as const;
export const DEFAULT_TYPES = ["bug", "feature", "security"] as const;

export const COMMENT_SPEC = "comment";
export const ENTRY_SPEC = "entry";

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
}

export interface BuiltinOptions {
  /** Leads every id: lowercase letters, digits and '-'. */
  prefix: string;
  /** The status names; a new ticket starts in the first. */
  statuses: readonly string[];
  types: readonly string[];
  store: BuiltinStore;
  now?: () => Date;
}

// A built-in id: lowercase, and the shape of a swamp instance name.
const ID = /^[a-z0-9][a-z0-9_-]*$/;

function fail(kind: TrackerErrorKind, detail: string): never {
  throw new TrackerError(kind, BUILTIN, detail);
}

/** A built-in tracker that speaks the tracker adapter contract. */
export function builtinAdapter(options: BuiltinOptions): TrackerAdapter {
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
    };
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

  return {
    tracker: BUILTIN,
    origin: "builtin",
    capabilities: { history, assign },

    async create(draft: IssueDraft): Promise<TrackerIssue> {
      checkType(draft.type);
      if (draft.title.trim() === "") {
        return fail("invalid", "a ticket needs a title");
      }
      // generateKey draws a new suffix each time; an id some ticket already
      // has is drawn again.
      for (let attempt = 0; attempt < 5; attempt++) {
        // A title with no ASCII letters or digits gives <prefix>-<suffix>.
        const id = generateKey(options.prefix, draft.title, "", {
          allowBare: true,
        });
        if (await store.read(issueName(id)) !== null) continue;
        const at = now();
        const issue: BuiltinIssue = {
          origin: "builtin",
          tracker: BUILTIN,
          id,
          display: id,
          title: draft.title,
          body: draft.body,
          type: draft.type,
          status: status(statuses[0]),
          relations: [],
          createdAt: at,
          updatedAt: at,
        };
        await write(issue);
        return toIssue(issue);
      }
      return fail("upstream", "could not find a free ticket id; try again");
    },

    async fetchIssue(ref: string): Promise<TrackerIssue> {
      return toIssue(await read(ref));
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
