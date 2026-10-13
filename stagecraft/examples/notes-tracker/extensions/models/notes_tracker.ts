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

// ---------------------------------------------------------------------------
// A tracker for stagecraft, written as a separate extension: the notes
// tracker, which keeps its tickets in its own swamp data, so it needs no
// account or network. It shares no code with stagecraft. It has the two
// methods every such tracker has:
//
// - describe records what the tracker is: its name (notes, the key
//   stagecraft keeps its tickets under), the contract version it meets, and
//   what it offers beyond the contract (here, nothing).
// - operate makes one operation from its request and writes the answer, the
//   result or the failure, as a record under the name it is given.
//
// stagecraft's publisher drives it through the shipped workflows; see the
// writing-a-tracker guide (stagecraft/TRACKERS.md) for every operation's
// request and result. A real tracker's operate calls its API where this one
// reads and writes its records.
// ---------------------------------------------------------------------------

const TRACKER = "notes";
const STATUSES = ["open", "doing", "done", "closed"] as const;
const TYPES = ["bug", "feature"] as const;
const RELATION_TYPES = [
  "parent_of",
  "blocked_by",
  "related_to",
  "duplicate_of",
] as const;

const RelationSchema = z.object({
  type: z.enum(RELATION_TYPES),
  direction: z.enum(["outgoing", "incoming"]),
  issue: z.string(),
  display: z.string(),
});
type Relation = z.infer<typeof RelationSchema>;

const TicketSchema = z.object({
  id: z.string(),
  display: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  relations: z.array(RelationSchema),
  activity: z.array(z.object({
    kind: z.literal("comment"),
    id: z.string(),
    body: z.string(),
    at: z.string(),
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
});
type Ticket = z.infer<typeof TicketSchema>;

/** A failure every tracker reports the same way: one of five kinds. */
class Failure extends Error {
  constructor(
    readonly kind:
      | "auth"
      | "not_found"
      | "rate_limited"
      | "invalid"
      | "upstream",
    readonly detail: string,
    readonly reason?: "unreachable",
  ) {
    super(detail);
  }
}

interface Context {
  readResource(name: string): Promise<Record<string, unknown> | null>;
  writeResource(
    spec: string,
    name: string,
    data: Record<string, unknown>,
  ): Promise<unknown>;
  logger: { info(message: string, props: Record<string, unknown>): void };
}

/** The tickets, kept in this instance's records. */
function store(ctx: Context, now: () => string) {
  const idOf = (ref: string) => {
    // A ticket is found by its stable id (n-12) or its display id (N-12).
    const match = /^n-(\d+)$/i.exec(ref);
    return match === null ? null : `n-${match[1]}`;
  };
  const read = async (ref: string): Promise<Ticket> => {
    const id = idOf(ref);
    const raw = id === null ? null : await ctx.readResource(`ticket-${id}`);
    if (raw === null) throw new Failure("not_found", `no ticket ${ref}`);
    return TicketSchema.parse(raw);
  };
  const write = async (ticket: Ticket) => {
    ticket.updatedAt = now();
    await ctx.writeResource("ticket", `ticket-${ticket.id}`, ticket);
  };
  return { read, write, idOf };
}

/** What a read reports: the contract's ticket. */
function issueOf(ticket: Ticket) {
  return {
    id: ticket.id,
    display: ticket.display,
    title: ticket.title,
    status: { id: ticket.status, name: ticket.status },
    relations: ticket.relations,
    description: ticket.description,
    labels: [ticket.type],
    assignees: [],
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    activity: ticket.activity,
  };
}

/** The rules every tracker keeps for relations (DESIGN.md, "Trackers"). */
async function checkRelate(
  read: (id: string) => Promise<Ticket>,
  from: Ticket,
  type: Relation["type"],
  to: Ticket,
): Promise<boolean> {
  const refuse = (detail: string): never => {
    throw new Failure("invalid", detail);
  };
  if (from.id === to.id) refuse(`${from.display} cannot be related to itself`);
  const has = from.relations.some((r) =>
    r.type === type && r.direction === "outgoing" && r.issue === to.id
  );
  if (has) return true;
  const parentOf = (t: Ticket) =>
    t.relations.find((r) =>
      r.type === "parent_of" && r.direction === "incoming"
    );
  if (type === "parent_of") {
    const parent = parentOf(to);
    if (parent !== undefined) {
      refuse(`${to.display} already has a parent, ${parent.display}`);
    }
    // Up from the new parent, 10 deep, as every tracker walks it: reaching
    // the child would close a loop. A deeper chain is not walked.
    const seen = new Set([to.id]);
    let current = from;
    for (let depth = 0; depth < 10; depth++) {
      const up = parentOf(current);
      if (up === undefined) break;
      if (seen.has(up.issue)) refuse("that would form a circular parent chain");
      seen.add(up.issue);
      current = await read(up.issue);
    }
  }
  if (type === "duplicate_of") {
    const out = (t: Ticket) =>
      t.relations.find((r) =>
        r.type === "duplicate_of" && r.direction === "outgoing"
      );
    if (out(from) !== undefined) {
      refuse(`${from.display} is already a duplicate`);
    }
    if (out(to) !== undefined) refuse(`${to.display} is itself a duplicate`);
    if (
      from.relations.some((r) =>
        r.type === "duplicate_of" && r.direction === "incoming"
      )
    ) refuse(`${from.display} has duplicates of its own`);
  }
  return false;
}

/** One operation, made on this tracker's records. */
async function perform(
  ctx: Context,
  operation: string,
  request: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const now = () => new Date().toISOString();
  const { read, write } = store(ctx, now);
  const text = (name: string) => {
    const value = request[name];
    if (typeof value !== "string") {
      throw new Failure("invalid", `${operation} needs ${name}`);
    }
    return value;
  };
  switch (operation) {
    case "fetch_issue":
      return issueOf(await read(text("issue")));
    case "create": {
      const type = text("type");
      if (!(TYPES as readonly string[]).includes(type)) {
        throw new Failure("invalid", `no type '${type}': ${TYPES.join(", ")}`);
      }
      const counter = await ctx.readResource("counter");
      const n = typeof counter?.next === "number" ? counter.next : 1;
      await ctx.writeResource("counter", "counter", { next: n + 1 });
      const at = now();
      const ticket: Ticket = {
        id: `n-${n}`,
        display: `N-${n}`,
        title: text("title"),
        description: text("body"),
        type,
        status: STATUSES[0],
        relations: [],
        activity: [],
        createdAt: at,
        updatedAt: at,
      };
      await write(ticket);
      return issueOf(ticket);
    }
    case "comment": {
      const ticket = await read(text("issue"));
      const id = `${ticket.id}-c${ticket.activity.length + 1}`;
      ticket.activity.push({
        kind: "comment",
        id,
        body: text("body"),
        at: now(),
      });
      await write(ticket);
      return { id };
    }
    case "set_status": {
      const status = text("status");
      if (!(STATUSES as readonly string[]).includes(status)) {
        throw new Failure(
          "invalid",
          `no status '${status}': ${STATUSES.join(", ")}`,
        );
      }
      const ticket = await read(text("issue"));
      const changed = ticket.status !== status;
      if (changed) {
        ticket.status = status;
        await write(ticket);
      }
      return { changed, status: { id: status, name: status } };
    }
    case "relate":
    case "unrelate": {
      const parsed = z.enum(RELATION_TYPES).safeParse(request.type);
      if (!parsed.success) {
        throw new Failure(
          "invalid",
          `no relation type '${String(request.type)}': ${
            RELATION_TYPES.join(", ")
          }`,
        );
      }
      const type = parsed.data;
      const from = await read(text("issue"));
      const to = await read(text("to"));
      const has = (
        t: Ticket,
        direction: Relation["direction"],
        other: Ticket,
      ) =>
        t.relations.some((r) =>
          r.type === type && r.direction === direction && r.issue === other.id
        );
      if (operation === "relate") {
        if (await checkRelate(read, from, type, to)) return { changed: false };
        from.relations.push({
          type,
          direction: "outgoing",
          issue: to.id,
          display: to.display,
        });
        to.relations.push({
          type,
          direction: "incoming",
          issue: from.id,
          display: from.display,
        });
      } else {
        if (!has(from, "outgoing", to)) return { changed: false };
        const drop = (
          t: Ticket,
          direction: Relation["direction"],
          other: Ticket,
        ) =>
          t.relations = t.relations.filter((r) =>
            !(r.type === type && r.direction === direction &&
              r.issue === other.id)
          );
        drop(from, "outgoing", to);
        drop(to, "incoming", from);
      }
      await write(from);
      await write(to);
      return { changed: true };
    }
    default:
      throw new Failure(
        "invalid",
        `the notes tracker does not offer '${operation}'`,
      );
  }
}

const OPERATIONS = [
  "fetch_issue",
  "create",
  "comment",
  "set_status",
  "relate",
  "unrelate",
  "post_entry",
  "set_type",
  "assign",
  "link_pr",
] as const;

const AnswerSchema = z.object({ ok: z.boolean() }).passthrough();

/** The notes tracker: a tracker for stagecraft, kept in swamp data. */
export const model = {
  type: "@acme/notes-tracker",
  version: "2026.10.12.1",
  globalArguments: z.object({}),
  resources: {
    ticket: {
      description: "Each ticket",
      schema: TicketSchema,
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
    counter: {
      description: "The next ticket's number",
      schema: z.object({ next: z.number().int() }),
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
    answer: {
      description: "operate's answers, under the names they were given",
      schema: AnswerSchema,
      lifetime: "infinite" as const,
      garbageCollection: "30d",
    },
    description: {
      description: "What this tracker says of itself",
      schema: z.object({ tracker: z.string() }).passthrough(),
      lifetime: "infinite" as const,
      garbageCollection: 5,
    },
  },
  methods: {
    describe: {
      description: "Record what this tracker is, for stagecraft to bind to",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, ctx: Context) => {
        const handle = await ctx.writeResource("description", "description", {
          tracker: TRACKER,
          contract: 1,
          origin: "snapshot",
          capabilities: { history: false, assign: false, pullRequests: false },
          closesDuplicates: false,
        });
        return { dataHandles: [handle] };
      },
    },
    operate: {
      description:
        "Make one tracker operation and write its answer under the given name; an answer that succeeded is never made again",
      arguments: z.object({
        operation: z.enum(OPERATIONS),
        request: z.union([z.record(z.string(), z.unknown()), z.string()]),
        answer: z.string().regex(/^answer-[A-Za-z0-9._-]+$/),
        run: z.string().optional(),
      }),
      execute: async (
        args: {
          operation: string;
          request: Record<string, unknown> | string;
          answer: string;
          run?: string;
        },
        ctx: Context,
      ) => {
        const prior = await ctx.readResource(args.answer);
        if (prior?.ok === true) return { dataHandles: [] };
        const run = args.run === undefined ? {} : { run: args.run };
        let answer: Record<string, unknown>;
        try {
          // A request that does not parse is a failure too, written as one.
          let request: Record<string, unknown>;
          try {
            request = typeof args.request === "string"
              ? JSON.parse(args.request)
              : args.request;
          } catch {
            throw new Failure("invalid", "the request is not a JSON object");
          }
          const result = await perform(ctx, args.operation, request);
          answer = { operation: args.operation, ...run, ok: true, result };
        } catch (error) {
          const failure = error instanceof Failure
            ? error
            : new Failure("upstream", String(error));
          answer = {
            operation: args.operation,
            ...run,
            ok: false,
            kind: failure.kind,
            ...(failure.reason === undefined ? {} : { reason: failure.reason }),
            detail: failure.detail,
          };
        }
        const handle = await ctx.writeResource("answer", args.answer, answer);
        return { dataHandles: [handle] };
      },
    },
  },
};
