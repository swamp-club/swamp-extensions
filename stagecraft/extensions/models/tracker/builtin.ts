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
  keyIsFree,
  type MethodOutput,
  recordObject,
} from "../_lib/engine/tracker.ts";
import {
  BUILTIN,
  builtinAdapter,
  BuiltinCommentSchema,
  BuiltinCounterSchema,
  BuiltinEntrySchema,
  COMMENT_SPEC,
  COUNTER_SPEC,
  DEFAULT_STATUSES,
  DEFAULT_TYPES,
  ENTRY_SPEC,
} from "../_lib/tracker/backends/builtin.ts";
import {
  type CredentialSources,
  DEFAULT_SOURCES,
} from "../_lib/tracker/backends/swamp_club.ts";
import { TrackerError } from "../_lib/tracker/core/adapter.ts";
import {
  deliveries,
  DeliveryInputs,
  deliveryKeyOf,
  ISSUE_SPEC,
  prefixArgument,
  prefixOf,
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

/** The built-in tracker's global arguments: its ticket prefix, statuses and types. */
export const BuiltinArgumentsSchema = z.object({
  prefix: prefixArgument(
    "Leads every ticket id and work-item key: lowercase letters, digits and " +
      "'-', at most 12 characters, e.g. blog for blog-12 (a trailing '-' is " +
      "dropped). Defaults to the tracker instance's name, cut to 12",
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

/**
 * The highest n of any `<prefix>-<n>` built-in ticket id or model definition
 * name (`<prefix>-<n>-...` too) in the repository, 0 for none.
 */
export async function highestNumber(
  ctx: TrackerContext,
  prefix: string,
): Promise<number> {
  // The prefix has passed the prefix rules, so it is safe in a pattern.
  // At most 9 digits: a longer run is no counted id, and stays a safe integer.
  const ticket = new RegExp(`^${prefix}-([0-9]{1,9})$`);
  const definition = new RegExp(`^${prefix}-([0-9]{1,9})(?:-|$)`);
  let highest = 0;
  const note = (pattern: RegExp, name: unknown) => {
    const match = typeof name === "string" ? pattern.exec(name) : null;
    if (match !== null) highest = Math.max(highest, Number(match[1]));
  };
  // Every tracker's tickets: another instance may share the prefix.
  if (ctx.queryData !== undefined) {
    for (const record of await ctx.queryData(`specName == "${ISSUE_SPEC}"`)) {
      note(ticket, recordObject(record)?.id);
    }
  }
  // Work items and anything else named like one.
  const lister = ctx.definitionRepository as
    | Partial<{ findAllGlobal(): Promise<{ definition: unknown }[]> }>
    | undefined;
  if (typeof lister?.findAllGlobal === "function") {
    for (const found of await lister.findAllGlobal()) {
      note(definition, (found.definition as { name?: unknown }).name);
    }
  }
  return highest;
}

const setTypeArguments = z.object({
  issue: z.string().min(1).describe("The ticket's id"),
  type: z.string().min(1).describe("One of the tracker's types"),
  ...DeliveryInputs,
});

/** Overrides for the built-in tracker's methods, for tests. */
export interface BuiltinMethodOptions {
  /** Where swamp's stored login, whom publish assigns, is read from. */
  sources?: Pick<CredentialSources, "readAuthFile">;
  now?: () => Date;
}

/** The shared tracker methods over the built-in tracker, plus set_type. */
export function builtinMethods(options: BuiltinMethodOptions = {}) {
  const now = options.now ?? (() => new Date());
  const sources = options.sources ?? DEFAULT_SOURCES;
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
        prefix: prefixOf(ctx),
        statuses: listFrom("statuses", args.statuses, DEFAULT_STATUSES),
        types: listFrom("types", args.types, DEFAULT_TYPES),
        store: {
          read: (name) => ctx.readResource!(name),
          write: (spec, name, data) => ctx.writeResource!(spec, name, data),
          nameTaken: async (name) => !await keyIsFree(ctx, name),
          highestNumber: (prefix) => highestNumber(ctx, prefix),
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
    // A ticket's work items take the ticket's id: blog-12, then blog-12-2.
    claimBase: (issue) => issue.id,
    // A built-in ticket's assignees are swamp users: the stored login's,
    // whichever server it is for.
    assignee: async () => {
      const username = (await sources.readAuthFile())?.username;
      if (username === undefined) {
        invalid(
          "no username: run `swamp auth login` so the stored login names you",
        );
      }
      return username;
    },
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

/**
 * The `@swamp/stagecraft/tracker` model: a tracker kept in the repository's
 * own swamp data, with no external service.
 */
export const model = {
  // A string literal: swamp reads the type from the source without running
  // it. builtin_test checks it equals BUILTIN_TYPE.
  type: "@swamp/stagecraft/tracker",
  version: "2026.10.02.1",
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
    [COUNTER_SPEC]: {
      description: "The next ticket number create tries, one record per prefix",
      schema: BuiltinCounterSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: builtinMethods(),
};
