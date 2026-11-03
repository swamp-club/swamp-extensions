import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import fc from "npm:fast-check@3.23.2";
import {
  makeCanaries,
  redact,
  REDACTED,
  redactValue,
  scanForCanaries,
} from "./canaries.ts";

Deno.test("each canary has a unique marker, planted where it says", () => {
  const set = makeCanaries();
  const markers = set.canaries.map((c) => c.marker);
  assertEquals(new Set(markers).size, markers.length);
  for (const c of set.canaries) {
    for (const loc of c.locations) {
      if (loc.startsWith("env:")) {
        assertEquals(set.env[loc.slice(4)], c.marker, `${c.id} ${loc}`);
      } else {
        const f = set.files.find((x) => x.path === loc);
        assert(f?.content.includes(c.marker), `${c.id} ${loc}`);
      }
    }
  }
});

Deno.test("two boxes never share a marker", () => {
  const a = makeCanaries().canaries.map((c) => c.marker);
  const b = new Set(makeCanaries().canaries.map((c) => c.marker));
  assert(a.every((m) => !b.has(m)));
});

Deno.test("scanForCanaries names each canary found", () => {
  const set = makeCanaries();
  const gh = set.env.GITHUB_TOKEN;
  assertEquals(
    scanForCanaries(set, `curl -H "Authorization: ${gh}"`, "stub argv"),
    [{ canaryId: "github-token", where: "stub argv" }],
  );
  assertEquals(scanForCanaries(set, "nothing here", "x"), []);
});

Deno.test("property: redacted text never contains the secret", () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 8, maxLength: 40 }),
      fc.array(fc.string(), { maxLength: 4 }),
      (secret, parts) => {
        const text = parts.join(secret);
        const out = redact(text, [secret]);
        return !out.includes(secret) || REDACTED.includes(secret);
      },
    ),
  );
});

Deno.test("redactValue reaches nested strings", () => {
  const secret = "sk-sandbox-123456";
  assertEquals(
    redactValue({ a: [`x ${secret}`], b: { c: secret }, n: 3 }, [secret]),
    { a: [`x ${REDACTED}`], b: { c: REDACTED }, n: 3 },
  );
});

Deno.test("redactValue redacts object keys the target chose", () => {
  const secret = "sk-sandbox-123456";
  assertEquals(redactValue({ [secret]: 1 }, [secret]), { [REDACTED]: 1 });
});
