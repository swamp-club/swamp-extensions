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
import type { MethodOutput } from "../_lib/engine/tracker.ts";
import {
  BUILTIN,
  builtinAdapter,
  BuiltinCommentSchema,
  BuiltinEntrySchema,
  COMMENT_SPEC,
  DEFAULT_STATUSES,
  DEFAULT_TYPES,
  ENTRY_SPEC,
} from "../_lib/tracker/backends/builtin.ts";
import { TrackerError } from "../_lib/tracker/core/adapter.ts";
import {
  deliveries,
  DeliveryInputs,
  deliveryKeyOf,
  type TrackerContext,
  trackerMethods,
  type TrackerModelOptions,
  trackerResources,
} from "../_lib/tracker/core/tracker_methods.ts";

// ---------------------------------------------------------------------------
// The built-in tracker: one instance per project, keeping its tickets in
// swamp data. It has every tracker method, set_type too, and never makes a
// network call; see DESIGN.md, "The built-in tracker". prefix, statuses and
// types are the instance's own arguments: a factory definition names only
// the tracker's kind, and a factory names this instance.
// ---------------------------------------------------------------------------

const PREFIX_MAX = 55;

export const BuiltinArgumentsSchema = z.object({
  prefix: z.string().max(PREFIX_MAX).regex(/^[a-z0-9][a-z0-9-]*$/).describe(
    "Leads every ticket id and work-item key: lowercase letters, digits and " +
      "'-', e.g. cue (a trailing '-' is dropped)",
  ),
  statuses: z.union([z.array(z.string().min(1)), z.string()]).optional()
    .describe(
      "The status keys, which are also the status names: a list, or a JSON " +
        "list as a string. A new ticket starts in the first, and a ticket " +
        `may move between any two. Defaults to ${DEFAULT_STATUSES.join(", ")}`,
    ),
  types: z.union([z.array(z.string().min(1)), z.string()]).optional()
    .describe(
      "The ticket types: a list, or a JSON list as a string. Defaults to " +
        DEFAULT_TYPES.join(", "),
    ),
});

function argumentsOf(globalArgs: Record<string, unknown>) {
  // swamp validates globalArguments with .partial(), so check here too.
  return BuiltinArgumentsSchema.partial().parse(globalArgs);
}

function invalid(detail: string): never {
  throw new TrackerError("invalid", BUILTIN, detail);
}

/** A list argument: given as a list or JSON text, else the default. */
export function listFrom(
  name: string,
  input: string[] | string | undefined,
  fallback: readonly string[],
): string[] {
  if (input === undefined) return [...fallback];
  let list: unknown = input;
  if (typeof input === "string") {
    try {
      list = JSON.parse(input);
    } catch {
      invalid(`${name} is not a JSON list`);
    }
  }
  if (
    !Array.isArray(list) || list.length === 0 ||
    list.some((v) => typeof v !== "string" || v === "")
  ) {
    invalid(`${name} must be a non-empty list of names`);
  }
  if (new Set(list).size !== list.length) {
    invalid(`${name} names one more than once`);
  }
  return list as string[];
}

/** The prefix, required, without a trailing separator. */
export function prefixOf(globalArgs: Record<string, unknown>): string {
  const { prefix } = argumentsOf(globalArgs);
  const trimmed = prefix?.replace(/-+$/, "") ?? "";
  if (trimmed === "") {
    invalid("no prefix: set the prefix global argument, e.g. cue");
  }
  return trimmed;
}

const setTypeArguments = z.object({
  issue: z.string().min(1).describe("The ticket's id"),
  type: z.string().min(1).describe("One of the tracker's types"),
  ...DeliveryInputs,
});

export interface BuiltinMethodOptions {
  now?: () => Date;
}

/** The shared tracker methods over the built-in tracker, plus set_type. */
export function builtinMethods(options: BuiltinMethodOptions = {}) {
  const now = options.now ?? (() => new Date());
  const argsOf = (ctx: TrackerContext) => ctx.globalArgs ?? {};
  const trackerOptions: TrackerModelOptions = {
    tracker: BUILTIN,
    adapter: (ctx) => {
      if (ctx.readResource === undefined || ctx.writeResource === undefined) {
        throw new Error(
          "this method context has no writeResource/readResource",
        );
      }
      const args = argumentsOf(argsOf(ctx));
      return builtinAdapter({
        prefix: prefixOf(argsOf(ctx)),
        statuses: listFrom("statuses", args.statuses, DEFAULT_STATUSES),
        types: listFrom("types", args.types, DEFAULT_TYPES),
        store: {
          read: (name) => ctx.readResource!(name),
          write: (spec, name, data) => ctx.writeResource!(spec, name, data),
        },
        now,
      });
    },
    // A status key is its own name.
    statuses: (globalArgs) =>
      Object.fromEntries(
        listFrom("statuses", argumentsOf(globalArgs).statuses, DEFAULT_STATUSES)
          .map((s) => [s, s]),
      ),
    // A ticket's first work item takes the ticket's id; later ones are
    // <prefix>-<slug>-<rnd> of their own.
    claimKey: (globalArgs, issue) => ({
      lead: prefixOf(globalArgs),
      first: issue.id,
    }),
    now,
  };
  const deliver = deliveries(trackerOptions, now);

  return {
    ...trackerMethods(trackerOptions),
    set_type: {
      description:
        "Set a ticket's type (publish is the single writer of a work item's type); already that type writes nothing",
      arguments: setTypeArguments,
      execute: async (
        args: z.infer<typeof setTypeArguments>,
        ctx: TrackerContext,
      ): Promise<MethodOutput> => {
        const { handles } = await deliver.setType(ctx, {
          issue: args.issue,
          type: args.type,
          key: deliveryKeyOf(args),
          replay: false,
        });
        return { dataHandles: handles };
      },
    },
  };
}

export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. builtin_test checks it equals BUILTIN_TYPE.
  type: "@swamp/gatorwalk-factory/tracker",
  version: "2026.09.30.3",
  globalArguments: BuiltinArgumentsSchema,
  resources: {
    ...trackerResources,
    [COMMENT_SPEC]: {
      description: "A comment on a ticket, one record per comment",
      schema: BuiltinCommentSchema,
      lifetime: "infinite" as const,
      // Written once and never by age: a ticket's history must outlive it.
      garbageCollection: 1,
    },
    [ENTRY_SPEC]: {
      description: "A lifecycle entry on a ticket, one record per entry",
      schema: BuiltinEntrySchema,
      lifetime: "infinite" as const,
      garbageCollection: 1,
    },
  },
  methods: builtinMethods(),
};
