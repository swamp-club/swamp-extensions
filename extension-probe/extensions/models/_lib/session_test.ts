import { assert, assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import fc from "npm:fast-check@3.23.2";
import { admit, applyAttempt, openSession, type Session } from "./session.ts";
import type { MethodSummary } from "./report.ts";

const methods: MethodSummary[] = [
  {
    type: "@t/x",
    method: "lint",
    description: "",
    schema: {},
    succeeded: true,
  },
  {
    type: "@t/x",
    method: "record",
    description: "Referee mode",
    schema: {},
    succeeded: false,
    lastError: 'No session "latest" — run start first.',
  },
  {
    type: "@t/x",
    method: "sync",
    description: "",
    schema: {},
    succeeded: false,
  },
];

const open = (max = 3) =>
  openSession({ session: "s", target: "@t/x", methods, maxAttempts: max });

Deno.test("openSession lists only methods that never succeeded", () => {
  const s = open();
  assertEquals(s.phase, "open");
  assertEquals(s.gaps.map((g) => g.method), ["record", "sync"]);
  assertEquals(s.gaps[0].lastError, 'No session "latest" — run start first.');
});

Deno.test("a success closes its gap; closing the last closes the session", () => {
  let s = applyAttempt(open(), {
    type: "@t/x",
    method: "record",
    before: ["start"],
    status: "succeeded",
  });
  assertEquals(s.gaps.map((g) => g.method), ["sync"]);
  assertEquals(s.closedGaps, [{ type: "@t/x", method: "record", attempt: 1 }]);
  s = applyAttempt(s, {
    type: "@t/x",
    method: "sync",
    before: [],
    status: "succeeded",
  });
  assertEquals(s.phase, "closed");
  assertThrows(() => admit(s, "@t/x", "sync"), Error, "is closed");
});

Deno.test("admit refuses a method that is not an open gap", () => {
  assertThrows(() => admit(open(), "@t/x", "lint"), Error, "not an open gap");
});

Deno.test("property: attempts never exceed maxAttempts", () => {
  const step = fc.record({
    method: fc.constantFrom("record", "sync", "lint"),
    ok: fc.boolean(),
  });
  fc.assert(
    fc.property(
      fc.integer({ min: 1, max: 6 }),
      fc.array(step),
      (max, steps) => {
        let s: Session = open(max);
        for (const x of steps) {
          try {
            s = applyAttempt(s, {
              type: "@t/x",
              method: x.method,
              before: [],
              status: x.ok ? "succeeded" : "failed",
            });
          } catch {
            // Refused: the invariant is what matters.
          }
          if (s.attempt > s.maxAttempts) return false;
          if (s.phase === "exhausted" && s.attempt !== s.maxAttempts) {
            return false;
          }
          if (s.phase === "closed" && s.gaps.length !== 0) return false;
        }
        assert(s.history.length === s.attempt);
        return true;
      },
    ),
  );
});
