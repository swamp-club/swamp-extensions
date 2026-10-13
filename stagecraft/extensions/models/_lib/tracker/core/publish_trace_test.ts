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

import { assertEquals } from "@std/assert";
import { type FakeSwamp, fakeSwamp } from "../../engine/tracker_testing.ts";
import {
  duplicateDefinition,
  entriesDefinition,
  linkingDefinition,
  TRACKED_ITEM,
  trackedItem,
} from "./test_support.ts";
import {
  type TrackerAdapter,
  TrackerError,
  type TrackerIssue,
  type TrackerRelation,
} from "./adapter.ts";
import {
  type TrackerContext,
  trackerMethods,
  type TrackerModelOptions,
} from "./tracker_methods.ts";
import { markDuplicateInRounds, publishInRounds } from "./publish_rounds.ts";
import { trackerModelMethods } from "./tracker_model.ts";
import { type RoundArguments, RoundRecordSchema } from "./round_method.ts";

// ---------------------------------------------------------------------------
// What publish does, in order: every write it makes to the tracker and every
// record it writes to the tracker instance, interleaved, for scenarios that
// cover each path through the replay (comments, entries with assign and
// pull requests, retargets, a duplicate mark, failed, unreachable and
// refused writes). The traces were captured before publish could run in
// planned rounds (swamp-club #3274). Each scenario runs both ways, through
// the publish method and through publishInRounds, and both must reproduce
// the traces exactly. Reads are left out: when the tracker is read is not
// something a person sees, and rounds read at other moments.
//
// The expected traces live in testdata/publish-traces.json. To capture them
// again, after a change that is meant to alter publish's writes, run this
// test with --allow-write and --allow-env=UPDATE_TRACES, and UPDATE_TRACES=1.
// ---------------------------------------------------------------------------

const INSTANCE = "tracker";
const NOW = new Date("2026-09-29T00:00:00Z");
const TRACES = new URL(
  "../../../../../testdata/publish-traces.json",
  import.meta.url,
);

interface Ticket {
  status: string;
  type: string;
  pr: string;
  assignees: string[];
  relations: TrackerRelation[];
}

/**
 * A tracker with every capability, holding its tickets in memory, that
 * logs each write to `trace`. Failures are set per scenario.
 */
function tracker(trace: string[]) {
  const tickets = new Map<string, Ticket>();
  const fail = {
    /** The nth comment call fails as upstream (1-based; 0 never). */
    comment: 0,
    /** Status writes fail as upstream while this is set. */
    status: false,
    /** Status names the tracker cannot reach from where a ticket is. */
    unreachable: [] as string[],
    /** Entry steps the tracker refuses outright. */
    invalidEntries: [] as string[],
  };
  let comments = 0;
  const ticketOf = (id: string): Ticket => {
    let t = tickets.get(id);
    if (t === undefined) {
      t = {
        status: "Todo",
        type: "feature",
        pr: "",
        assignees: [],
        relations: [],
      };
      tickets.set(id, t);
    }
    return t;
  };
  const issueOf = (id: string): TrackerIssue => {
    const t = ticketOf(id);
    return {
      id,
      display: id.toUpperCase(),
      title: `Ticket ${id}`,
      url: `https://tracker.test/${id}`,
      status: { id: t.status, name: t.status },
      relations: structuredClone(t.relations),
    };
  };
  const adapter: TrackerAdapter = {
    tracker: "test",
    origin: "snapshot",
    create: () => Promise.reject(new Error("not used")),
    fetchIssue: (ref) => Promise.resolve(issueOf(ref.toLowerCase())),
    comment: (issueId, body) => {
      comments++;
      if (comments === fail.comment) {
        return Promise.reject(new TrackerError("upstream", "test", "boom"));
      }
      trace.push(`tracker comment ${issueId}: ${body}`);
      return Promise.resolve({ id: `c${comments}`, url: "u" });
    },
    setStatus: (issueId, name) => {
      if (fail.status) {
        return Promise.reject(new TrackerError("upstream", "test", "down"));
      }
      const t = ticketOf(issueId);
      if (fail.unreachable.includes(name)) {
        return Promise.reject(
          new TrackerError("invalid", "test", "no way there", "unreachable"),
        );
      }
      trace.push(`tracker status ${issueId}: ${name}`);
      const changed = t.status !== name;
      t.status = name;
      return Promise.resolve({ changed, status: { id: name, name } });
    },
    relate: (from, type, to) => {
      trace.push(`tracker relate ${from} ${type} ${to}`);
      ticketOf(from).relations.push({
        type,
        direction: "outgoing",
        issue: to,
        display: to.toUpperCase(),
      });
      ticketOf(to).relations.push({
        type,
        direction: "incoming",
        issue: from,
        display: from.toUpperCase(),
      });
      return Promise.resolve({ changed: true });
    },
    unrelate: () => Promise.reject(new Error("not used")),
    capabilities: {
      history: {
        postEntry: (issueId, entry) => {
          if (fail.invalidEntries.includes(entry.step)) {
            return Promise.reject(
              new TrackerError("invalid", "test", `no step ${entry.step}`),
            );
          }
          trace.push(
            `tracker entry ${issueId}: ${entry.step} [${entry.targetStatus}] ` +
              `${entry.summary} ${JSON.stringify(entry.payload)}`,
          );
          return Promise.resolve({ id: `e${trace.length}` });
        },
        setType: (issueId, type) => {
          trace.push(`tracker type ${issueId}: ${type}`);
          const t = ticketOf(issueId);
          const changed = t.type !== type;
          t.type = type;
          return Promise.resolve({ changed, type });
        },
      },
      assign: {
        assign: (issueId, user) => {
          trace.push(`tracker assign ${issueId}: ${user}`);
          const t = ticketOf(issueId);
          const changed = !t.assignees.includes(user);
          if (changed) t.assignees.push(user);
          return Promise.resolve({
            changed,
            user,
            status: t.status,
            dropped: [],
          });
        },
      },
      pullRequests: {
        linkPr: (issueId, url) => {
          trace.push(`tracker pr ${issueId}: ${url}`);
          const t = ticketOf(issueId);
          const changed = t.pr !== url;
          t.pr = url;
          return Promise.resolve({ changed, url });
        },
      },
    },
  };
  const options: TrackerModelOptions = {
    tracker: "test",
    adapter: () => adapter,
    statuses: () => ({
      open: "Todo",
      triaged: "Triaged",
      in_progress: "In Progress",
      in_review: "In Review",
      shipped: "Done",
      closed: "Closed",
    }),
    assignee: () => Promise.resolve("alice"),
    now: () => NOW,
  };
  return {
    fail,
    methods: trackerMethods(options),
    model: trackerModelMethods(options),
    options,
  };
}

/** The tracker instance's context, logging each record it writes. */
function tracing(swamp: FakeSwamp, trace: string[]): TrackerContext {
  const ctx = swamp.context(INSTANCE);
  const write = ctx.writeResource;
  if (write === undefined) throw new Error("the fake has no writeResource");
  return {
    ...ctx,
    writeResource: (
      spec: string,
      name: string,
      data: Record<string, unknown>,
    ) => {
      trace.push(`record ${spec} ${name} ${canonical(data)}`);
      return write(spec, name, data);
    },
  } as TrackerContext;
}

/** JSON with sorted keys, so a trace does not depend on key order. */
function canonical(value: unknown): string {
  return JSON.stringify(
    value,
    (_key, v) =>
      v !== null && typeof v === "object" && !Array.isArray(v)
        ? Object.fromEntries(
          Object.entries(v as Record<string, unknown>).sort(([a], [b]) =>
            a < b ? -1 : a > b ? 1 : 0
          ),
        )
        : v,
  );
}

type Tracker = ReturnType<typeof tracker>;

/**
 * How a scenario publishes: through the method, in planned rounds
 * in-process, or as the shipped workflow drives it (round and operate
 * method calls).
 */
type Way = "method" | "rounds" | "workflow";

/**
 * What the shipped workflow does, as method calls: a round, then each of
 * its operate calls in order (each only after the one before succeeded),
 * then its read, until the round says done, then a check. Up to `rounds`
 * rounds per run, then the next run carries on.
 */
async function byWorkflow(
  t: Tracker,
  ctx: TrackerContext,
  args: Omit<RoundArguments, "run" | "check">,
  run: string,
  rounds = 50,
): Promise<void> {
  const call = async (
    method: {
      arguments: { parse(v: unknown): unknown };
      execute: (a: never, c: TrackerContext) => Promise<unknown>;
    },
    input: Record<string, unknown>,
  ) => await method.execute(method.arguments.parse(input) as never, ctx);
  const answered = async (name: string) => {
    const raw = await ctx.readResource?.(name);
    return raw !== null && raw !== undefined && raw.ok === true;
  };
  for (let n = 0; n < rounds; n++) {
    await call(t.model.round, { ...args, run });
    const raw = await ctx.readResource?.(
      `round-${args.kind}-${run}`,
    );
    const record = RoundRecordSchema.parse(raw);
    if (record.done) break;
    for (const op of [...record.ops, ...record.reads]) {
      if (op.prev !== "" && !(await answered(op.prev))) break;
      await call(t.model.operate, {
        operation: op.operation,
        request: op.request,
        answer: op.answer,
        run,
      });
    }
  }
  await call(t.model.round, { ...args, run, check: true });
}

let runs = 0;

/** One publish, logged as a marker line and how it ended. */
async function publish(
  swamp: FakeSwamp,
  t: Tracker,
  trace: string[],
  way: Way,
): Promise<void> {
  trace.push("-- publish");
  const ctx = tracing(swamp, trace);
  try {
    if (way === "method") {
      const method = t.methods.publish;
      await method.execute(
        method.arguments.parse({ workItem: TRACKED_ITEM }),
        ctx,
      );
    } else if (way === "workflow") {
      runs++;
      await byWorkflow(
        t,
        ctx,
        { kind: "publish", workItem: TRACKED_ITEM },
        `run-${runs}`,
      );
    } else {
      await publishInRounds(ctx, { workItem: TRACKED_ITEM }, t.options);
    }
    trace.push("-- ok");
  } catch (error) {
    trace.push(
      `-- failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

const SCENARIOS: Record<string, (way: Way) => Promise<string[]>> = {
  "comments, then the status moves on a later publish": async (way) => {
    const trace: string[] = [];
    const swamp = fakeSwamp();
    const t = tracker(trace);
    const item = await trackedItem(swamp, { test: "t1" });
    await item.advance("submit");
    await publish(swamp, t, trace, way);
    await item.approve("ship-approval");
    await item.advance("ship");
    await publish(swamp, t, trace, way);
    await publish(swamp, t, trace, way);
    return trace;
  },
  "entries, with assign, set_type and linked pull requests": async (way) => {
    const trace: string[] = [];
    const swamp = fakeSwamp();
    const t = tracker(trace);
    const item = await trackedItem(swamp, { test: "t1" }, linkingDefinition());
    await item.record("artifact", "note", {
      text: "first",
      type: "bug",
      url: "https://git.test/pulls/1",
    });
    await item.advance("submit");
    await item.record("evidence", "result", { status: "failed" });
    await item.advance("again");
    await item.record("artifact", "note", {
      text: "second",
      type: "bug",
      url: "https://git.test/pulls/2",
    });
    await item.advance("submit");
    await item.record("evidence", "result", { status: "passed" });
    await item.approve("ship-approval");
    await item.advance("ship");
    await publish(swamp, t, trace, way);
    await publish(swamp, t, trace, way);
    return trace;
  },
  "entries: one the tracker refuses is skipped and recorded": async (way) => {
    const trace: string[] = [];
    const swamp = fakeSwamp();
    const t = tracker(trace);
    const { fail } = t;
    fail.invalidEntries = ["noted"];
    const item = await trackedItem(swamp, { test: "t1" }, entriesDefinition());
    await item.record("artifact", "note", { text: "first", type: "bug" });
    await item.advance("submit");
    await publish(swamp, t, trace, way);
    return trace;
  },
  "retargets: published before, and a cursor behind the retarget": async (
    way,
  ) => {
    const trace: string[] = [];
    const swamp = fakeSwamp();
    const t = tracker(trace);
    const item = await trackedItem(swamp, { test: "t1" });
    await publish(swamp, t, trace, way);
    await item.advance("submit");
    await item.retarget({ test: "t2", "test.display": "T-2" });
    await item.approve("ship-approval");
    await item.retarget({ test: "t3" });
    await item.advance("ship");
    await publish(swamp, t, trace, way);
    await publish(swamp, t, trace, way);
    return trace;
  },
  "a duplicate mark relates, closes, and leaves the status alone": async (
    way,
  ) => {
    const trace: string[] = [];
    const swamp = fakeSwamp();
    const t = tracker(trace);
    const item = await trackedItem(
      swamp,
      { test: "t1" },
      duplicateDefinition(),
    );
    await publish(swamp, t, trace, way);
    await item.record("artifact", "duplicate-of", { primary: "p1" });
    await item.approve("duplicate-confirmation");
    await item.advance("duplicate");
    await publish(swamp, t, trace, way);
    await publish(swamp, t, trace, way);
    return trace;
  },
  "failures: a comment, a status move, then an unreachable status": async (
    way,
  ) => {
    const trace: string[] = [];
    const swamp = fakeSwamp();
    const t = tracker(trace);
    const { fail } = t;
    const item = await trackedItem(swamp, { test: "t1" });
    await item.advance("submit");
    fail.comment = 2;
    await publish(swamp, t, trace, way);
    fail.status = true;
    await publish(swamp, t, trace, way);
    fail.status = false;
    await publish(swamp, t, trace, way);
    fail.unreachable = ["Done"];
    await item.approve("ship-approval");
    await item.advance("ship");
    await publish(swamp, t, trace, way);
    await publish(swamp, t, trace, way);
    return trace;
  },
};

async function traces(way: Way): Promise<Record<string, string[]>> {
  const out: Record<string, string[]> = {};
  for (const [name, scenario] of Object.entries(SCENARIOS)) {
    out[name] = await scenario(way);
  }
  return out;
}

const updating = Deno.permissions.querySync({
      name: "env",
      variable: "UPDATE_TRACES",
    }).state === "granted" && Deno.env.get("UPDATE_TRACES") === "1";

for (const way of ["method", "rounds", "workflow"] as const) {
  Deno.test(`publish traces (${way}): each scenario writes exactly what publish wrote before rounds`, async () => {
    const actual = await traces(way);
    if (updating && way === "method") {
      await Deno.writeTextFile(
        TRACES,
        JSON.stringify(actual, null, 2) + "\n",
      );
      return;
    }
    const expected = JSON.parse(await Deno.readTextFile(TRACES));
    assertEquals(Object.keys(actual), Object.keys(expected));
    for (const name of Object.keys(expected)) {
      if (way === "method") {
        assertEquals(actual[name], expected[name], name);
        continue;
      }
      // In rounds a round's writes reach the tracker before the next round
      // records them, so writes and records interleave differently. Each
      // still comes in the same order, with the same content, and each
      // publish ends the same way.
      // The fake numbers an entry by the trace's length so far, which the
      // interleaving shifts, so entry ids are left out of the comparison.
      // A workflow's own records (its rounds, the tracker's answers) are
      // how it gets there, not what it delivers.
      const only = (trace: string[], prefix: string) =>
        trace.filter((line) =>
          line.startsWith(prefix) && !line.startsWith("record answer ") &&
          !line.startsWith("record round ")
        ).map((line) => line.replace(/"id":"e\d+"/g, '"id":"e"'));
      for (const prefix of ["tracker ", "record ", "-- "]) {
        assertEquals(
          only(actual[name], prefix),
          only(expected[name], prefix),
          `${name}: ${prefix.trim()}`,
        );
      }
    }
  });
}

/** mark_duplicate, by hand, through the method or in rounds. */
async function markDuplicate(
  way: Way,
  args: {
    issue: string;
    primary: string;
    workItem?: string;
    journalVersion?: number;
  },
  setup: (t: Tracker) => void = () => {},
): Promise<string[]> {
  const trace: string[] = [];
  const swamp = fakeSwamp();
  const t = tracker(trace);
  setup(t);
  await trackedItem(swamp, { test: args.issue }, duplicateDefinition());
  const ctx = tracing(swamp, trace);
  try {
    if (way === "method") {
      const method = t.methods.mark_duplicate;
      await method.execute(method.arguments.parse(args), ctx);
    } else {
      await markDuplicateInRounds(ctx, args, t.options);
    }
    trace.push("-- ok");
  } catch (error) {
    trace.push(
      `-- failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  return trace;
}

Deno.test("mark_duplicate traces: rounds write what the method writes", async () => {
  const cases: [
    Parameters<typeof markDuplicate>[1],
    Parameters<typeof markDuplicate>[2],
  ][] = [
    [{ issue: "t1", primary: "p1" }, undefined],
    [
      { issue: "t1", primary: "p1", workItem: TRACKED_ITEM, journalVersion: 1 },
      undefined,
    ],
    [{ issue: "t1", primary: "p1" }, (t) => {
      t.fail.status = true;
    }],
  ];
  for (const [args, setup] of cases) {
    const method = await markDuplicate("method", args, setup);
    assertEquals(method.some((l) => l.startsWith("tracker relate")), true);
    assertEquals(await markDuplicate("rounds", args, setup), method);
  }
});
