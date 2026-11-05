import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  ALPINE_FIXED,
  alpineBranch,
  alpineVerdict,
  compareApkVersion,
  parseApkVersion,
} from "./tracker.ts";

Deno.test("parseApkVersion splits version, _p and -r", () => {
  assertEquals(parseApkVersion("9.7_p1-r6"), { parts: [9, 7], p: 1, r: 6 });
  assertEquals(parseApkVersion("10.6_p2-r0"), { parts: [10, 6], p: 2, r: 0 });
  assertEquals(parseApkVersion("10.0_p1-r11"), { parts: [10, 0], p: 1, r: 11 });
});

Deno.test("compareApkVersion compares release then patch then parts", () => {
  const r5 = parseApkVersion("9.7_p1-r5")!;
  const r6 = parseApkVersion("9.7_p1-r6")!;
  assert(compareApkVersion(r5, r6) < 0);
  assert(compareApkVersion(r6, r6) === 0);
  assert(
    compareApkVersion(
      parseApkVersion("9.9_p2-r1")!,
      parseApkVersion("9.7_p1-r6")!,
    ) > 0,
  );
  // -r11 must be newer than -r6 (numeric, not lexical).
  assert(
    compareApkVersion(
      parseApkVersion("10.0_p1-r11")!,
      parseApkVersion("10.0_p1-r6")!,
    ) > 0,
  );
});

Deno.test("alpineBranch derives the branch; empty is edge", () => {
  assertEquals(alpineBranch("3.20.10"), "3.20");
  assertEquals(alpineBranch("3.21"), "3.21");
  assertEquals(alpineBranch(""), "edge");
  assertEquals(alpineBranch("edge"), "edge");
});

Deno.test("alpineBranch reads edge from a pre-release VERSION_ID or PRETTY_NAME", () => {
  assertEquals(alpineBranch("3.23_alpha20250612"), "edge");
  assertEquals(alpineBranch("3.23.0", "Alpine Linux edge"), "edge");
  assertEquals(alpineBranch("3.23.0", "Alpine Linux v3.23"), "3.23");
});

Deno.test("alpineVerdict: at/above fixed is patched, below is vulnerable", () => {
  assertEquals(alpineVerdict("3.20.10", "9.7_p1-r6").verdict, "patched");
  assertEquals(alpineVerdict("3.20.3", "9.7_p1-r5").verdict, "vulnerable");
  assertEquals(alpineVerdict("3.22.1", "10.0_p1-r11").verdict, "patched");
  assertEquals(alpineVerdict("3.22.1", "10.0_p1-r10").verdict, "vulnerable");
});

Deno.test("alpineVerdict: a newer upstream is not patched just by sorting higher", () => {
  // Edge on 10.6_p1 sorts above 3.23's 10.2_p1-r1 but is unfixed.
  assertEquals(
    alpineVerdict("3.23_alpha20250612", "10.6_p1-r0").verdict,
    "vulnerable",
  );
  // 3.20 with a package from another branch: judged by its own upstream.
  assertEquals(alpineVerdict("3.20.3", "10.0_p1-r0").verdict, "vulnerable");
  assertEquals(alpineVerdict("3.20.3", "10.0_p1-r11").verdict, "patched");
  assertEquals(alpineVerdict("3.20", "9.8_p1-r0").verdict, "vulnerable");
  assertEquals(alpineVerdict("3.23_alpha1", "10.6_p2-r0").verdict, "patched");
});

Deno.test("alpineVerdict: branches outside the advisory are judged by upstream", () => {
  // 3.15's 8.8_p1 never got a fix.
  assertEquals(alpineVerdict("3.15.11", "8.8_p1-r1").verdict, "vulnerable");
  assertEquals(alpineVerdict("3.99.0", "9.7_p1-r6").verdict, "patched");
});

Deno.test("alpineVerdict: unknown only when the release is unreadable", () => {
  assertEquals(alpineVerdict("3.20.3", null).verdict, "unknown");
});

Deno.test("every tracker entry parses", () => {
  for (const [branch, rel] of Object.entries(ALPINE_FIXED)) {
    assert(parseApkVersion(rel) !== null, `${branch}: ${rel}`);
  }
});
