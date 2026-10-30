import { assertEquals } from "jsr:@std/assert@1.0.19";
import { identityFrom, whoamiResultFrom } from "./whoami.ts";

Deno.test("identityFrom: reads only id and username from a whoami reply", () => {
  const identity = identityFrom({
    authenticated: true,
    id: "u-1",
    username: "alice",
    email: "alice@example.com",
    name: "Alice",
    plan: "pro",
    collectives: [{ name: "swamp" }],
  });
  assertEquals(identity, { swampUserId: "u-1", swampUsername: "alice" });
  assertEquals(JSON.stringify(identity).includes("example.com"), false);
});

Deno.test("identityFrom: no identity for a collective key, logged out, or a bad reply", () => {
  assertEquals(
    identityFrom({ id: "c-1", username: "ci", collectiveId: "c-1" }),
    undefined,
  );
  assertEquals(
    identityFrom({ authenticated: false, id: "u", username: "a" }),
    undefined,
  );
  assertEquals(identityFrom({ username: "a" }), undefined);
  assertEquals(identityFrom({ id: "", username: "a" }), undefined);
  assertEquals(identityFrom("nope"), undefined);
  assertEquals(identityFrom(null), undefined);
});

Deno.test("whoamiResultFrom: an answer with no personal identity is none, not failed", () => {
  assertEquals(whoamiResultFrom({ authenticated: false }), { kind: "none" });
  assertEquals(whoamiResultFrom({ id: "u", username: "a" }), {
    kind: "identity",
    identity: { swampUserId: "u", swampUsername: "a" },
  });
});
