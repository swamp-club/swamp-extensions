import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  compareApkVersions,
  compareDebVersions,
  compareDotted,
  compareRpmVersions,
  lineOf,
  parseDotted,
  upstreamOf,
} from "./versions.ts";

Deno.test("parseDotted reads v-prefixed and suffixed versions", () => {
  assertEquals(parseDotted("v24.22.0"), [24, 22, 0]);
  assertEquals(parseDotted("1.40.0-dev"), [1, 40, 0]);
  assertEquals(parseDotted("abc"), null);
});

Deno.test("compareDotted treats missing parts as zero", () => {
  assertEquals(compareDotted("1.2.1", "1.2.1.0"), 0);
  assert(compareDotted("1.2.0.2", "1.2.1.0") < 0);
  assert(compareDotted("24.22.1", "24.22.0") > 0);
  assert(compareDotted("1.10.0", "1.9.9") > 0);
});

Deno.test("lineOf gives major.minor", () => {
  assertEquals(lineOf("1.38.5"), "1.38");
  assertEquals(lineOf("7"), null);
});

Deno.test("compareDebVersions orders Debian security builds", () => {
  assert(compareDebVersions("1.0.9-2", "1.0.9-2+deb12u1") < 0);
  assert(compareDebVersions("1.0.9-2+deb12u1", "1.0.9-2+deb12u1") === 0);
  assert(compareDebVersions("1.0.9-2+deb12u2", "1.0.9-2+deb12u1") > 0);
  assert(compareDebVersions("1.2.0~rc1-1", "1.2.0-1") < 0);
  assert(compareDebVersions("1:1.0.0-1", "2.0.0-1") > 0);
});

Deno.test("compareRpmVersions handles releases, tildes and epochs", () => {
  assert(compareRpmVersions("1.0.9-11.el9", "1.0.9-11.el9_4.1") < 0);
  assert(compareRpmVersions("1.1.1-1.fc41", "1.1.0-3.fc41") > 0);
  assert(compareRpmVersions("1.2.1~rc1-1", "1.2.1-1") < 0);
  assert(compareRpmVersions("1:1.0.0-1", "1.9.0-1") > 0);
  assertEquals(compareRpmVersions("1.0.9-1", "1.0.9-1"), 0);
});

Deno.test("compareApkVersions compares the version, then -rN", () => {
  // apk suffixes: _rc before the release, _p after it.
  assert(compareApkVersions("1.2.1_rc1-r0", "1.2.1-r0") < 0);
  assert(compareApkVersions("1.2.1_p1-r0", "1.2.1-r0") > 0);
  assert(compareApkVersions("1.2.1_rc1-r0", "1.2.1_p1-r0") < 0);
  assert(compareApkVersions("1.2.1_alpha2", "1.2.1_beta1") < 0);
  assert(compareApkVersions("1.2.1a-r0", "1.2.1-r0") > 0);
  assert(compareApkVersions("1.1.0-r2", "1.1.0-r3") < 0);
  assert(compareApkVersions("1.1.1-r0", "1.1.0-r9") > 0);
  assertEquals(compareApkVersions("1.2.1-r0", "1.2.1-r0"), 0);
});

Deno.test("upstreamOf strips epochs, revisions and suffixes", () => {
  assertEquals(upstreamOf("dpkg", "1.0.9-2+deb12u1"), "1.0.9");
  assertEquals(upstreamOf("dpkg", "24.22.0+dfsg+~cs24.19.2-2"), "24.22.0");
  assertEquals(upstreamOf("rpm", "1:1.1.0-3.el10"), "1.1.0");
  assertEquals(upstreamOf("apk", "1.1.0-r2"), "1.1.0");
  assertEquals(upstreamOf("brew", "1.2.0_1"), "1.2.0");
});
