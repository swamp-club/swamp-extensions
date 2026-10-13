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

import { z } from "npm:zod@4.3.6";
import {
  ISSUE_ORIGINS,
  RELATION_TYPES,
  TRACKER_ERROR_KINDS,
  type TrackerAdapter,
  TrackerError,
} from "./adapter.ts";
import { TrackerRelationSchema } from "./relations.ts";
import { TRACKER_CONTRACT_VERSION } from "../../engine/tracker.ts";

// ---------------------------------------------------------------------------
// The tracker operations as data (swamp-club #3274): what each one takes,
// what it returns, and how it fails. adapter.ts states the same contract as
// TypeScript for the adapters stagecraft ships. These schemas are the form
// a tracker written as a separate extension meets, with no code shared: its
// methods take the request and write the result (or the failure) as a
// record that stagecraft reads. The conformance suite checks every result an
// adapter returns against them.
// ---------------------------------------------------------------------------

/**
 * The contract's version (the engine's, which checks it at binding). A
 * tracker reports the version it implements; a change that a tracker
 * written for an earlier version would not meet (a field removed or
 * changed, an operation added to those every tracker has) moves it on. A
 * new optional capability or field does not.
 */
export { TRACKER_CONTRACT_VERSION };

export const TrackerStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
});

/** A comment or lifecycle entry on a ticket (TicketActivity). */
export const TicketActivitySchema = z.object({
  kind: z.enum(["comment", "entry"]),
  id: z.string().optional(),
  author: z.string().optional(),
  body: z.string(),
  step: z.string().optional(),
  at: z.string(),
});

/** A ticket as every tracker reports it (TrackerIssue). */
export const TrackerIssueSchema = z.object({
  id: z.string().min(1),
  display: z.string().min(1),
  title: z.string(),
  url: z.string().optional(),
  status: TrackerStatusSchema,
  details: z.record(z.string(), z.unknown()).optional(),
  relations: z.array(TrackerRelationSchema),
  description: z.string().optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  activity: z.array(TicketActivitySchema).optional(),
});

const Changed = z.object({ changed: z.boolean() });

/** Each operation: its request and its result. */
export const OPERATIONS = {
  fetch_issue: {
    request: z.object({ issue: z.string().min(1) }),
    result: TrackerIssueSchema,
  },
  create: {
    request: z.object({
      title: z.string().min(1),
      body: z.string(),
      type: z.string().min(1),
    }),
    result: TrackerIssueSchema,
  },
  comment: {
    request: z.object({ issue: z.string().min(1), body: z.string() }),
    result: z.object({ id: z.string(), url: z.string().optional() }),
  },
  set_status: {
    request: z.object({ issue: z.string().min(1), status: z.string() }),
    result: Changed.extend({ status: TrackerStatusSchema }),
  },
  relate: {
    request: z.object({
      issue: z.string().min(1),
      type: z.enum(RELATION_TYPES),
      to: z.string().min(1),
    }),
    result: Changed,
  },
  unrelate: {
    request: z.object({
      issue: z.string().min(1),
      type: z.enum(RELATION_TYPES),
      to: z.string().min(1),
    }),
    result: Changed,
  },
  /** The history capability. */
  post_entry: {
    request: z.object({
      issue: z.string().min(1),
      entry: z.object({
        step: z.string(),
        targetStatus: z.string(),
        summary: z.string(),
        emoji: z.string(),
        payload: z.record(z.string(), z.unknown()),
        isVerbose: z.boolean(),
      }),
    }),
    result: z.object({ id: z.string() }),
  },
  /** The history capability. */
  set_type: {
    request: z.object({ issue: z.string().min(1), type: z.string() }),
    result: Changed.extend({ type: z.string() }),
  },
  /** The assign capability. */
  assign: {
    request: z.object({ issue: z.string().min(1), user: z.string() }),
    result: Changed.extend({
      user: z.string(),
      display: z.string().optional(),
      status: z.string(),
      dropped: z.array(z.string()),
      details: z.record(z.string(), z.unknown()).optional(),
    }),
  },
  /** The pull request capability. */
  link_pr: {
    request: z.object({ issue: z.string().min(1), url: z.string() }),
    result: Changed.extend({ url: z.string() }),
  },
} as const;

export type OperationName = keyof typeof OPERATIONS;

/** A failed operation, as data: the TrackerError a call would have thrown. */
export const OperationFailureSchema = z.object({
  ok: z.literal(false),
  kind: z.enum(TRACKER_ERROR_KINDS),
  reason: z.literal("unreachable").optional(),
  detail: z.string(),
});

/**
 * What `operate` writes for one operation, under the name it was given:
 * the result, or the failure. stagecraft reads it in the next round.
 */
export const AnswerSchema = z.discriminatedUnion("ok", [
  z.object({
    operation: z.string(),
    /** The run that asked, so a failure is read only by its own run. */
    run: z.string().optional(),
    ok: z.literal(true),
    result: z.record(z.string(), z.unknown()),
  }),
  OperationFailureSchema.extend({
    operation: z.string(),
    run: z.string().optional(),
  }),
]);
export type AnswerRecord = z.infer<typeof AnswerSchema>;

/** The name an answer record may take: what swamp allows a record name. */
export const ANSWER_NAME_PATTERN = /^answer-[A-Za-z0-9._-]+$/;

/** What a tracker says of itself, so stagecraft can bind to it. */
export const TrackerDescriptionSchema = z.object({
  /** The tracker's name: its externalRefs key and a definition's kind. */
  tracker: z.string().regex(/^[a-z][a-z0-9-]*$/),
  contract: z.number().int().positive(),
  origin: z.enum(ISSUE_ORIGINS),
  capabilities: z.object({
    history: z.boolean(),
    assign: z.boolean(),
    pullRequests: z.boolean(),
  }),
  closesDuplicates: z.boolean(),
  /** The tracker's user publish assigns when a work item starts; absent
   * when there is no one to assign (publish then assigns nobody). */
  assignee: z.string().min(1).optional(),
});

export type TrackerDescription = z.infer<typeof TrackerDescriptionSchema>;

/** An adapter's description of itself. */
export function describeAdapter(adapter: TrackerAdapter): TrackerDescription {
  return TrackerDescriptionSchema.parse({
    tracker: adapter.tracker,
    contract: TRACKER_CONTRACT_VERSION,
    origin: adapter.origin,
    capabilities: {
      history: adapter.capabilities.history !== undefined,
      assign: adapter.capabilities.assign !== undefined,
      pullRequests: adapter.capabilities.pullRequests !== undefined,
    },
    closesDuplicates: adapter.closesDuplicates === true,
  });
}

/** A TrackerError as data, and back. */
export function failureOf(error: TrackerError) {
  return OperationFailureSchema.parse({
    ok: false,
    kind: error.kind,
    ...(error.reason === undefined ? {} : { reason: error.reason }),
    detail: error.detail,
  });
}

export function errorOf(
  tracker: string,
  failure: z.infer<typeof OperationFailureSchema>,
): TrackerError {
  return new TrackerError(
    failure.kind,
    tracker,
    failure.detail,
    failure.reason,
  );
}

/**
 * The adapter, with every result checked against its operation's schema:
 * a result that does not meet the contract fails as an Error naming the
 * operation and what is wrong. The conformance suite runs through it.
 */
export function checkedAdapter(adapter: TrackerAdapter): TrackerAdapter {
  const check = <T>(operation: OperationName, result: T): T => {
    const parsed = OPERATIONS[operation].result.safeParse(result);
    if (!parsed.success) {
      throw new Error(
        `${adapter.tracker} ${operation} returned a result that does not ` +
          `meet the contract: ${z.prettifyError(parsed.error)}`,
      );
    }
    return result;
  };
  const { history, assign, pullRequests } = adapter.capabilities;
  return {
    tracker: adapter.tracker,
    origin: adapter.origin,
    ...(adapter.closesDuplicates === undefined
      ? {}
      : { closesDuplicates: adapter.closesDuplicates }),
    capabilities: {
      ...(history === undefined ? {} : {
        history: {
          postEntry: async (id, entry) =>
            check("post_entry", await history.postEntry(id, entry)),
          setType: async (id, type) =>
            check("set_type", await history.setType(id, type)),
        },
      }),
      ...(assign === undefined ? {} : {
        assign: {
          assign: async (id, user) =>
            check("assign", await assign.assign(id, user)),
        },
      }),
      ...(pullRequests === undefined ? {} : {
        pullRequests: {
          linkPr: async (id, url) =>
            check("link_pr", await pullRequests.linkPr(id, url)),
        },
      }),
    },
    create: async (draft) => check("create", await adapter.create(draft)),
    fetchIssue: async (ref) =>
      check("fetch_issue", await adapter.fetchIssue(ref)),
    comment: async (id, body) =>
      check("comment", await adapter.comment(id, body)),
    setStatus: async (id, name) =>
      check("set_status", await adapter.setStatus(id, name)),
    relate: async (from, type, to) =>
      check("relate", await adapter.relate(from, type, to)),
    unrelate: async (from, type, to) =>
      check("unrelate", await adapter.unrelate(from, type, to)),
  };
}
