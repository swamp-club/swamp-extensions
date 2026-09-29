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
import type { ResourceContext } from "./run_store.ts";
import {
  type DeliveryKey,
  type TrackerAdapter,
  TrackerError,
  type TrackerIssue,
} from "./tracker.ts";
import type { Logger, MethodOutput } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The methods every tracker model type has, written once over the adapter
// contract: fetch_issue, comment and set_status.
//
// Delivery ledger: a comment or status write that carries a delivery key
// (workItem + journalVersion) records what the tracker returned under a name
// built from the key. A second call with the same key finds the record and
// writes nothing to the tracker. The ledger lives on the tracker instance
// and relies on swamp running one method at a time per instance; a crash
// after the tracker accepted a write but before the ledger record lands can
// still repeat that one write.
// ---------------------------------------------------------------------------

export const ISSUE_SPEC = "issue";
export const DELIVERY_SPEC = "delivery";

export const DeliverySchema = z.object({
  action: z.enum(["comment", "set_status"]),
  issue: z.string(),
  workItem: z.string(),
  journalVersion: z.number(),
  /**
   * A digest of what was asked (the comment body, or the status key), so a
   * repeat of the key with a different request is refused, not skipped.
   */
  request: z.string(),
  /** What the tracker returned: a comment's id and url, or the status. */
  result: z.record(z.string(), z.unknown()),
  at: z.string(),
});
export type Delivery = z.infer<typeof DeliverySchema>;

/** The issue snapshot fetch_issue records. */
export const IssueSchema = z.object({
  tracker: z.string(),
  id: z.string(),
  display: z.string(),
  title: z.string(),
  url: z.string(),
  status: z.object({ id: z.string(), name: z.string() }),
  fetchedAt: z.string(),
});

/** What the methods need from swamp's method context. */
export interface TrackerContext extends ResourceContext {
  globalArgs?: Record<string, unknown>;
  logger: Logger;
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

export function deliveryName(
  action: Delivery["action"],
  key: DeliveryKey,
): string {
  return `delivery-${action}-${safePart("workItem", key.workItem)}-${
    String(key.journalVersion)
  }`;
}

const DeliveryInputs = {
  workItem: z.string().min(1).optional().describe(
    "The work item this write is for; with journalVersion, makes it idempotent",
  ),
  journalVersion: z.coerce.number().int().positive().optional().describe(
    "The length of the work item's journal this write reflects",
  ),
};

function deliveryKeyOf(
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
 * different ticket or a different request is refused: one key names one
 * moment of one work item, so it can only ever mean one write.
 */
async function priorDelivery(
  ctx: TrackerContext,
  name: string,
  issue: string,
  request: string,
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
    throw new Error(
      `delivery ${name} was made with a different request; ` +
        "a delivery key names one write",
    );
  }
  return prior;
}

async function recordDelivery(
  ctx: TrackerContext,
  name: string,
  delivery: Delivery,
): Promise<unknown> {
  return await resources(ctx).write(DELIVERY_SPEC, name, delivery);
}

/** How a tracker model builds its adapter and status names from its args. */
export interface TrackerModelOptions {
  tracker: string;
  adapter(globalArgs: Record<string, unknown>): TrackerAdapter;
  /** Status keys to the tracker's status names (from globalArgs). */
  statuses(globalArgs: Record<string, unknown>): Record<string, string>;
  now?: () => Date;
}

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

/** The resource specs every tracker model declares. */
export const trackerResources = {
  [ISSUE_SPEC]: {
    description:
      "The last snapshot of a ticket fetch_issue read, one record per ticket",
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
};

/** The fetch_issue, comment and set_status methods, over one adapter. */
export function trackerMethods(options: TrackerModelOptions) {
  const now = options.now ?? (() => new Date());
  const argsOf = (ctx: TrackerContext) => ctx.globalArgs ?? {};

  return {
    fetch_issue: {
      description:
        "Fetch a ticket by stable id or display identifier and record a snapshot, with the externalRefs to start a work item from it",
      arguments: fetchIssueArguments,
      execute: async (
        args: z.infer<typeof fetchIssueArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const adapter = options.adapter(argsOf(ctx));
        const issue: TrackerIssue = await adapter.fetchIssue(args.issue);
        const handle = await resources(ctx).write(
          ISSUE_SPEC,
          `issue-${safePart("issue id", issue.id)}`,
          {
            tracker: options.tracker,
            ...issue,
            fetchedAt: now().toISOString(),
          },
        );
        ctx.logger.info("{summary}", {
          summary: `${issue.display} (${issue.id}): ${issue.title} ` +
            `[${issue.status.name}]`,
          url: issue.url,
          externalRefs: JSON.stringify({
            [options.tracker]: issue.id,
            [`${options.tracker}.display`]: issue.display,
          }),
        });
        return { dataHandles: [handle] };
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
        const key = deliveryKeyOf(args);
        const name = key === null ? null : deliveryName("comment", key);
        const request = await digestOf({ body: args.body });
        if (name !== null) {
          const prior = await priorDelivery(ctx, name, args.issue, request);
          if (prior !== null) {
            ctx.logger.info("{summary}", {
              summary: `already delivered (${name}); posted nothing`,
              ...prior.result,
            });
            return { dataHandles: [] };
          }
        }
        const adapter = options.adapter(argsOf(ctx));
        const posted = await adapter.comment(args.issue, args.body);
        const handles: unknown[] = [];
        if (key !== null && name !== null) {
          handles.push(
            await recordDelivery(ctx, name, {
              action: "comment",
              issue: args.issue,
              ...key,
              request,
              result: { ...posted },
              at: now().toISOString(),
            }),
          );
        }
        ctx.logger.info("{summary}", {
          summary: `commented on ${args.issue}`,
          id: posted.id,
          url: posted.url,
        });
        return { dataHandles: handles };
      },
    },
    set_status: {
      description:
        "Move a ticket to a mapped status (the single writer of tracker status); already there writes nothing",
      arguments: setStatusArguments,
      execute: async (
        args: z.infer<typeof setStatusArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        // The ledger first: a delivered key is a no-op even if the statuses
        // mapping has changed since.
        const key = deliveryKeyOf(args);
        const name = key === null ? null : deliveryName("set_status", key);
        const request = await digestOf({ status: args.status });
        if (name !== null) {
          const prior = await priorDelivery(ctx, name, args.issue, request);
          if (prior !== null) {
            ctx.logger.info("{summary}", {
              summary: `already delivered (${name}); wrote nothing`,
              ...prior.result,
            });
            return { dataHandles: [] };
          }
        }
        const statuses = options.statuses(argsOf(ctx));
        const statusName = statuses[args.status];
        if (statusName === undefined) {
          const known = Object.keys(statuses);
          throw new TrackerError(
            "invalid",
            options.tracker,
            `status key '${args.status}' is not in the statuses global argument (${
              known.length === 0 ? "it is empty" : `mapped: ${known.join(", ")}`
            })`,
          );
        }
        const adapter = options.adapter(argsOf(ctx));
        const change = await adapter.setStatus(args.issue, statusName);
        const handles: unknown[] = [];
        if (key !== null && name !== null) {
          handles.push(
            await recordDelivery(ctx, name, {
              action: "set_status",
              issue: args.issue,
              ...key,
              request,
              result: { ...change },
              at: now().toISOString(),
            }),
          );
        }
        ctx.logger.info("{summary}", {
          summary: change.changed
            ? `moved ${args.issue} to '${change.status.name}'`
            : `${args.issue} is already '${change.status.name}'; wrote nothing`,
        });
        return { dataHandles: handles };
      },
    },
  };
}
