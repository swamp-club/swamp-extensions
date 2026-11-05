import { assertEquals } from "jsr:@std/assert@1.0.19";
import {
  compareOpenSsh,
  FIXED_VERSION,
  isVulnerableVersion,
  parseOpenSshVersion,
} from "./versions.ts";

Deno.test("parseOpenSshVersion reads the ssh -V banner", () => {
  const v = parseOpenSshVersion("OpenSSH_10.6p1, OpenSSL 3.3.7 7 Apr 2026");
  assertEquals(v, { major: 10, minor: 6, portable: 1, raw: "OpenSSH_10.6p1" });
});

Deno.test("parseOpenSshVersion reads a bare and a package form", () => {
  assertEquals(parseOpenSshVersion("10.6p2")?.portable, 2);
  assertEquals(parseOpenSshVersion("9.7_p1-r6")?.minor, 7);
  assertEquals(parseOpenSshVersion("9.7_p1-r6")?.portable, 1);
});

Deno.test("parseOpenSshVersion returns null for junk", () => {
  assertEquals(parseOpenSshVersion("sh: ssh: not found"), null);
  assertEquals(parseOpenSshVersion(""), null);
});

Deno.test("isVulnerableVersion: below 10.6p2 is vulnerable, at/above is not", () => {
  assertEquals(
    isVulnerableVersion(parseOpenSshVersion("OpenSSH_10.6p1")!),
    true,
  );
  assertEquals(
    isVulnerableVersion(parseOpenSshVersion("OpenSSH_9.7p1")!),
    true,
  );
  assertEquals(
    isVulnerableVersion(parseOpenSshVersion("OpenSSH_10.6p2")!),
    false,
  );
  assertEquals(
    isVulnerableVersion(parseOpenSshVersion("OpenSSH_10.7p1")!),
    false,
  );
  assertEquals(
    isVulnerableVersion(parseOpenSshVersion("OpenSSH_11.0p1")!),
    false,
  );
});

Deno.test("compareOpenSsh orders by major, minor, portable", () => {
  const a = parseOpenSshVersion("OpenSSH_10.6p1")!;
  assertEquals(compareOpenSsh(a, FIXED_VERSION) < 0, true);
  assertEquals(
    compareOpenSsh(parseOpenSshVersion("OpenSSH_10.6p2")!, FIXED_VERSION),
    0,
  );
});
