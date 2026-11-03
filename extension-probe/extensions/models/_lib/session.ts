/**
 * ProbeSession: referee-mode state, an aggregate.
 *
 * `start` opens a session from a probe report and lists the methods that
 * never succeeded. A driving agent then submits inputs (and optionally a chain
 * of methods to run first) through `record`; each submission is one attempt.
 *
 * Invariants:
 *   - attempts never exceed maxAttempts; an exhausted session refuses more
 *   - only a method that is still a gap can be attempted
 *   - a session with no gaps is closed and refuses more
 *
 * Every function here is pure.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import type { MethodSummary } from "./report.ts";

export const GapSchema = z.object({
  type: z.string(),
  method: z.string(),
  description: z.string(),
  schema: z.record(z.string(), z.unknown()),
  lastError: z.string().optional(),
});
export type Gap = z.infer<typeof GapSchema>;

export const AttemptSchema = z.object({
  attempt: z.number(),
  type: z.string(),
  method: z.string(),
  before: z.array(z.string()),
  status: z.enum(["succeeded", "failed", "unknown"]),
  errorText: z.string().optional(),
});
export type Attempt = z.infer<typeof AttemptSchema>;

export const SessionSchema = z.object({
  session: z.string(),
  target: z.string(),
  version: z.string().optional(),
  phase: z.enum(["open", "closed", "exhausted"]),
  attempt: z.number(),
  maxAttempts: z.number(),
  gaps: z.array(GapSchema),
  closedGaps: z.array(z.object({
    type: z.string(),
    method: z.string(),
    attempt: z.number(),
  })),
  history: z.array(AttemptSchema),
  nextAction: z.string(),
});
export type Session = z.infer<typeof SessionSchema>;

function nextAction(s: Omit<Session, "nextAction">): string {
  if (s.phase === "closed") {
    return "Stop. Every method has succeeded at least once; read the findings.";
  }
  if (s.phase === "exhausted") {
    return `Stop. ${s.attempt} of ${s.maxAttempts} attempts used with ${s.gaps.length} method(s) still unexplored. Raise maxAttempts and run start again to reopen.`;
  }
  const g = s.gaps[0];
  return `Attempt ${
    s.attempt + 1
  } of ${s.maxAttempts}. Pick a gap, read its lastError and schema, and submit inputs with: ` +
    `swamp behavior run <name> record --input session=${s.session} --input type=${g.type} --input method=${g.method} ` +
    `--input 'inputs={...}' [--input 'before=[{"method":"...","inputs":{...}}]']. ` +
    `Use before when a method needs another to run first.`;
}

function withNext(s: Omit<Session, "nextAction">): Session {
  return { ...s, nextAction: nextAction(s) };
}

/** Opens a session from a report's method summaries. */
export function openSession(p: {
  session: string;
  target: string;
  version?: string;
  methods: readonly MethodSummary[];
  maxAttempts: number;
}): Session {
  const gaps = p.methods.filter((m) => !m.succeeded).map((m) => ({
    type: m.type,
    method: m.method,
    description: m.description,
    schema: m.schema,
    ...(m.lastError ? { lastError: m.lastError } : {}),
  }));
  return withNext({
    session: p.session,
    target: p.target,
    ...(p.version ? { version: p.version } : {}),
    phase: gaps.length ? "open" : "closed",
    attempt: 0,
    maxAttempts: p.maxAttempts,
    gaps,
    closedGaps: [],
    history: [],
  });
}

/** Refuses an attempt the session cannot take; returns the gap otherwise. */
export function admit(s: Session, type: string, method: string): Gap {
  if (s.phase === "closed") {
    throw new Error(
      `Session "${s.session}" is closed: every method has succeeded.`,
    );
  }
  if (s.phase === "exhausted" || s.attempt >= s.maxAttempts) {
    throw new Error(
      `Session "${s.session}" is exhausted at ${s.attempt}/${s.maxAttempts} attempts. Raise maxAttempts and run start again to reopen it.`,
    );
  }
  const gap = s.gaps.find((g) => g.type === type && g.method === method);
  if (!gap) {
    throw new Error(
      `${type} ${method} is not an open gap in session "${s.session}". Open gaps: ${
        s.gaps.map((g) => `${g.type} ${g.method}`).join(", ") || "none"
      }.`,
    );
  }
  return gap;
}

/** Records one attempt's outcome. */
export function applyAttempt(
  s: Session,
  a: Omit<Attempt, "attempt">,
): Session {
  admit(s, a.type, a.method);
  const attempt = s.attempt + 1;
  const succeeded = a.status === "succeeded";
  const gaps = succeeded
    ? s.gaps.filter((g) => !(g.type === a.type && g.method === a.method))
    : s.gaps.map((g) =>
      g.type === a.type && g.method === a.method && a.errorText
        ? { ...g, lastError: a.errorText }
        : g
    );
  const closedGaps = succeeded
    ? [...s.closedGaps, { type: a.type, method: a.method, attempt }]
    : s.closedGaps;
  const phase = gaps.length === 0
    ? "closed"
    : attempt >= s.maxAttempts
    ? "exhausted"
    : "open";
  return withNext({
    ...s,
    phase,
    attempt,
    gaps,
    closedGaps,
    history: [...s.history, { attempt, ...a }],
  });
}
