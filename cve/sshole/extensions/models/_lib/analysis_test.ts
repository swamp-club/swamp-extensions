import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  accessDenial,
  analyze,
  extractApkRelease,
  parseProbe,
} from "./analysis.ts";
import { StatusSchema } from "./schemas.ts";

/** Builds probe stdout from key/value pairs; STAR is a list of "user|uid|shell". */
function probe(
  kv: Record<string, string>,
  stars: string[] = [],
): string {
  const lines = Object.entries(kv).map(([k, v]) => `SSHOLE_${k}=${v}`);
  for (const s of stars) lines.push(`SSHOLE_STAR_ACCOUNT=${s}`);
  lines.push("SSHOLE_DONE=1");
  return lines.join("\n");
}

const VULN_ALPINE = {
  HOSTNAME: "box",
  UNAME: "Linux",
  UID: "0",
  OS_ID: "alpine",
  OS_VER: "3.20.3",
  OS_PRETTY: "Alpine Linux v3.20",
  CONTAINER: "no",
  SSHD_PATH: "/usr/sbin/sshd",
  SSH_VERSION: "OpenSSH_9.7p1, OpenSSL 3.3.7",
  PKG_MANAGER: "apk",
  PKG_VERSION: "openssh-server-9.7_p1-r5",
  PAM_PACKAGE: "no",
  LIBC: "musl",
  SSHD_LINKS_PAM: "no",
  CONFIG_SOURCE: "files",
  USEPAM: "unknown",
  PWAUTH: "yes",
  PERMITROOT: "prohibit-password",
  SHADOW_READABLE: "yes",
  SEED_HASH_COUNT: "1",
};

function grade(kv: Record<string, string>, stars: string[] = []) {
  const s = analyze(parseProbe(probe(kv, stars)), { target: "t" });
  StatusSchema.parse(s); // every path must produce a schema-valid status
  return s;
}

Deno.test("extractApkRelease strips the package name", () => {
  assertEquals(extractApkRelease("openssh-server-9.7_p1-r6"), "9.7_p1-r6");
  assertEquals(extractApkRelease("nonsense"), null);
});

Deno.test("parseProbe reads scalars and star accounts", () => {
  const f = parseProbe(probe(VULN_ALPINE, ["deploy|1001|/bin/sh"]));
  assertEquals(f.libc, "musl");
  assertEquals(f.pkgManager, "apk");
  assertEquals(f.pkgRelease, "9.7_p1-r5");
  assertEquals(f.seedHashCount, 1);
  assertEquals(f.starAccounts[0].user, "deploy");
  assertEquals(f.starAccounts[0].reachable, true);
});

Deno.test("vulnerable Alpine with a reachable '*' account is critical", () => {
  const s = grade(VULN_ALPINE, ["deploy|1001|/bin/sh"]);
  assertEquals(s.vulnerable, true);
  assertEquals(s.verdict, "vulnerable");
  assertEquals(s.riskLevel, "critical");
  assertEquals(s.action, "upgrade");
  assertEquals(s.versionVulnerable, "yes");
  assertEquals(s.distroFixedRelease, "9.7_p1-r6");
});

Deno.test("patched Alpine release grades as not vulnerable", () => {
  const s = grade(
    { ...VULN_ALPINE, PKG_VERSION: "openssh-server-9.7_p1-r6" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.vulnerable, false);
  assertEquals(s.verdict, "not-vulnerable");
  assertEquals(s.versionVulnerable, "no");
  assert(s.summary.startsWith("Patched"));
});

Deno.test("a '*' root shielded by PermitRootLogin (sshd -T) is not reachable", () => {
  const s = grade(
    { ...VULN_ALPINE, CONFIG_SOURCE: "sshd-T", USEPAM: "no" },
    ["root|0|/bin/sh"],
  );
  assertEquals(s.vulnerable, false);
  assertEquals(s.riskLevel, "medium");
  assertEquals(s.verdict, "not-vulnerable");
  assertEquals(s.starAccounts[0].reachable, false);
});

Deno.test("a file-read PermitRootLogin does not shield a '*' root", () => {
  const s = grade(VULN_ALPINE, ["root|0|/bin/sh"]);
  assertEquals(s.starAccounts[0].reachable, true);
  assertEquals(s.verdict, "unknown");
});

Deno.test("a '*' root is reachable under PermitRootLogin yes", () => {
  const s = grade({ ...VULN_ALPINE, PERMITROOT: "yes" }, ["root|0|/bin/sh"]);
  assertEquals(s.vulnerable, true);
  assertEquals(s.verdict, "vulnerable");
  assertEquals(s.riskLevel, "critical");
});

Deno.test("no $5$/$6$ seed account means not currently exploitable", () => {
  const s = grade({ ...VULN_ALPINE, SEED_HASH_COUNT: "0" }, [
    "deploy|1001|/bin/sh",
  ]);
  assertEquals(s.vulnerable, false);
  assertEquals(s.riskLevel, "low");
  assertEquals(s.verdict, "not-vulnerable");
  assertEquals(s.seedHash, "no");
});

Deno.test("nologin-only '*' accounts are exposed but rated high, not critical", () => {
  const s = grade(VULN_ALPINE, ["svc|1002|/sbin/nologin"]);
  assertEquals(s.vulnerable, true);
  assertEquals(s.verdict, "vulnerable");
  assertEquals(s.riskLevel, "high");
});

Deno.test("password auth off (sshd -T) is not affected", () => {
  const s = grade(
    { ...VULN_ALPINE, CONFIG_SOURCE: "sshd-T", PWAUTH: "no" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.vulnerable, false);
  assertEquals(s.verdict, "not-vulnerable");
  assert(s.summary.includes("password authentication is off"));
});

Deno.test("password auth off read from config files is not trusted", () => {
  // Root scan where sshd -T failed: every other precondition holds.
  const root = grade(
    { ...VULN_ALPINE, CONFIG_SOURCE: "files", PWAUTH: "no" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(root.verdict, "unknown");
  assertEquals(root.riskLevel, "high");
  // Already root: the advice is about sshd -T failing, not privilege.
  assertEquals(root.action, "upgrade");
  assert(root.recommendations.some((r) => r.includes("failed even as root")));
  assert(root.notChecked.some((n) => n.startsWith("PasswordAuthentication")));
  // Non-root scan: a Match-scoped "no" must not yield not-vulnerable.
  const user = grade({
    ...VULN_ALPINE,
    CONFIG_SOURCE: "files",
    PWAUTH: "no",
    UID: "1000",
    SHADOW_READABLE: "no",
    SEED_HASH_COUNT: "",
  });
  assertEquals(user.verdict, "unknown");
});

Deno.test("UsePAM yes read from config files is not trusted", () => {
  const s = grade(
    {
      ...VULN_ALPINE,
      CONFIG_SOURCE: "files",
      USEPAM: "yes",
      SSHD_LINKS_PAM: "yes",
      PAM_PACKAGE: "yes",
    },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "unknown");
  assert(s.notChecked.some((n) => n.startsWith("UsePAM")));
});

Deno.test("PAM in use (UsePAM yes, sshd links pam) is not affected", () => {
  const s = grade(
    {
      ...VULN_ALPINE,
      CONFIG_SOURCE: "sshd-T",
      USEPAM: "yes",
      SSHD_LINKS_PAM: "yes",
      PAM_PACKAGE: "yes",
    },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.vulnerable, false);
  assertEquals(s.verdict, "not-vulnerable");
  assert(s.summary.startsWith("Not affected: password auth goes through PAM"));
});

Deno.test("glibc is not affected", () => {
  const s = grade({ ...VULN_ALPINE, LIBC: "glibc", OS_ID: "debian" }, [
    "deploy|1001|/bin/sh",
  ]);
  assertEquals(s.vulnerable, false);
  assert(s.summary.includes("glibc"));
});

Deno.test("non-Linux (Darwin) is not affected even with unknown libc", () => {
  const s = grade({
    ...VULN_ALPINE,
    UNAME: "Darwin",
    LIBC: "unknown",
    OS_ID: "",
  });
  assertEquals(s.vulnerable, false);
  assert(s.summary.includes("not a musl Linux"));
});

Deno.test("unreadable shadow (non-root) is high and needs-privilege", () => {
  const s = grade({
    ...VULN_ALPINE,
    UID: "1000",
    SHADOW_READABLE: "no",
    SEED_HASH_COUNT: "",
  });
  assertEquals(s.action, "needs-privilege");
  assertEquals(s.riskLevel, "high");
  assertEquals(s.verdict, "unknown");
  assertEquals(s.seedHashKnown, false);
});

Deno.test("no sshd present yields an unknown, non-vulnerable verdict", () => {
  const s = grade({
    UNAME: "Linux",
    SSHD_PATH: "",
    SSH_VERSION: "",
    LIBC: "musl",
  });
  assertEquals(s.vulnerable, false);
  assertEquals(s.riskLevel, "unknown");
  assertEquals(s.verdict, "unknown");
});

Deno.test("container exposure adds rebuild-image", () => {
  const s = grade({ ...VULN_ALPINE, CONTAINER: "yes" }, [
    "deploy|1001|/bin/sh",
  ]);
  assert(s.actions.includes("rebuild-image"));
});

Deno.test("no sshd: a client banner or an error message is not a server", () => {
  for (const banner of ["sh: ssh: not found", "OpenSSH_9.7p1, OpenSSL 3.3"]) {
    const s = grade(
      { ...VULN_ALPINE, SSHD_PATH: "", SSH_VERSION: banner, PKG_VERSION: "" },
      ["deploy|1001|/bin/sh"],
    );
    assertEquals(s.verdict, "unknown", banner);
    assertEquals(s.vulnerable, false);
    assert(s.summary.startsWith("No OpenSSH server found"));
  }
});

Deno.test("glibc is ruled out even when no sshd is found", () => {
  const s = grade({ UNAME: "Linux", LIBC: "glibc", SSHD_PATH: "" });
  assertEquals(s.verdict, "not-vulnerable");
});

Deno.test("parseProbe keeps only an OpenSSH_ version token", () => {
  assertEquals(
    parseProbe("SSHOLE_SSH_VERSION=sh: sshd: not found").sshVersionBanner,
    "",
  );
  assertEquals(
    parseProbe("SSHOLE_SSH_VERSION=OpenSSH_9.7p1").sshVersionBanner,
    "OpenSSH_9.7p1",
  );
});

Deno.test("Alpine edge on an unfixed 10.6_p1 is vulnerable, not patched", () => {
  const s = grade(
    {
      ...VULN_ALPINE,
      OS_VER: "3.23_alpha20250612",
      OS_PRETTY: "Alpine Linux edge",
      SSH_VERSION: "OpenSSH_10.6p1",
      PKG_VERSION: "openssh-server-10.6_p1-r0",
    },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.versionVulnerable, "yes");
  assertEquals(s.verdict, "vulnerable");
});

const SSHD_T = { ...VULN_ALPINE, CONFIG_SOURCE: "sshd-T", USEPAM: "no" };

Deno.test("an unreadable patch status is unknown, not vulnerable", () => {
  const s = grade(
    { ...VULN_ALPINE, PKG_VERSION: "", SSH_VERSION: "" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.versionVulnerable, "unknown");
  assertEquals(s.verdict, "unknown");
  assertEquals(s.vulnerable, false);
  assert(s.summary.includes("not confirmed"));
});

Deno.test("Alpine PAM build installed: a non-PAM probed sshd is not proof", () => {
  const pam = {
    ...VULN_ALPINE,
    CONFIG_SOURCE: "sshd-T",
    USEPAM: "unknown",
    PAM_PACKAGE: "yes",
    SSHD_LINKS_PAM: "no",
  };
  // Picked from the fallback paths: which build runs is not known.
  const doubt = grade(
    { ...pam, SSHD_SELECTED_BY: "path" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(doubt.verdict, "unknown");
  // The running listener, or Alpine's OpenRC rule, picked the plain sshd.
  for (const by of ["running", "openrc"]) {
    const plain = grade(
      { ...pam, SSHD_SELECTED_BY: by },
      ["deploy|1001|/bin/sh"],
    );
    assertEquals(plain.verdict, "vulnerable", by);
  }
});

Deno.test("a selected sshd.pam: UsePAM yes is safe, UsePAM no is exposed", () => {
  const pamd = {
    ...VULN_ALPINE,
    CONFIG_SOURCE: "sshd-T",
    PAM_PACKAGE: "yes",
    SSHD_PATH: "/usr/sbin/sshd.pam",
    SSHD_SELECTED_BY: "openrc",
    SSHD_LINKS_PAM: "yes",
    PKG_VERSION: "openssh-server-pam-9.7_p1-r5",
  };
  assertEquals(
    grade({ ...pamd, USEPAM: "yes" }, ["deploy|1001|/bin/sh"]).verdict,
    "not-vulnerable",
  );
  assertEquals(
    grade({ ...pamd, USEPAM: "no" }, ["deploy|1001|/bin/sh"]).verdict,
    "vulnerable",
  );
});

Deno.test("AllowUsers / DenyUsers / AllowGroups make '*' accounts unreachable", () => {
  const stars = ["deploy|1001|/bin/sh|deploy wheel"];
  assertEquals(
    grade({ ...SSHD_T, ALLOWUSERS: "admin" }, stars).verdict,
    "not-vulnerable",
  );
  assertEquals(
    grade({ ...SSHD_T, ALLOWUSERS: "admin dep*@10.0.0.1" }, stars).verdict,
    "vulnerable",
  );
  assertEquals(
    grade({ ...SSHD_T, DENYUSERS: "deploy" }, stars).verdict,
    "not-vulnerable",
  );
  assertEquals(
    grade({ ...SSHD_T, ALLOWGROUPS: "admins" }, stars).verdict,
    "not-vulnerable",
  );
  assertEquals(
    grade({ ...SSHD_T, ALLOWGROUPS: "wheel" }, stars).verdict,
    "vulnerable",
  );
  // From config files the rules are ignored: never hide exposure on a guess.
  assertEquals(
    grade(
      { ...SSHD_T, CONFIG_SOURCE: "files", ALLOWUSERS: "admin" },
      stars,
    ).verdict,
    "vulnerable",
  );
});

Deno.test("accessDenial follows OpenSSH pattern-list negation", () => {
  const rules = {
    allowUsers: [],
    denyUsers: [],
    allowGroups: [],
    denyGroups: [],
  };
  assertEquals(
    accessDenial("bob", [], { ...rules, allowUsers: ["*", "!bob"] }),
    "not in AllowUsers",
  );
  assertEquals(
    accessDenial("amy", [], { ...rules, allowUsers: ["*", "!bob"] }),
    null,
  );
  assertEquals(
    accessDenial("a.b", [], { ...rules, allowUsers: ["axb"] }),
    "not in AllowUsers",
  );
});

Deno.test("a shadow entry with no passwd entry is unreachable", () => {
  const s = grade(SSHD_T, ["ghost||"]);
  assertEquals(s.starAccounts[0].reachable, false);
  assertEquals(s.verdict, "not-vulnerable");
});

Deno.test("Match blocks: a global PasswordAuthentication no is not trusted", () => {
  const s = grade(
    { ...SSHD_T, PWAUTH: "no", MATCH_BLOCKS: "yes" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "unknown");
  assert(s.recommendations.some((r) => r.includes("sshd -T -C")));
  // No Match blocks: the global value is the effective one.
  assertEquals(
    grade({ ...SSHD_T, PWAUTH: "no" }, ["deploy|1001|/bin/sh"]).verdict,
    "not-vulnerable",
  );
});

Deno.test("Match blocks: an AllowUsers refusal is not trusted", () => {
  const s = grade(
    { ...SSHD_T, ALLOWUSERS: "admin", MATCH_BLOCKS: "yes" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "unknown");
});

Deno.test("an assumed-reachable root does not cast doubt on a confirmed account", () => {
  const s = grade(
    { ...SSHD_T, MATCH_BLOCKS: "yes" },
    ["root|0|/bin/sh", "deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "vulnerable");
});

Deno.test("an unconfirmed PAM path is unknown, not vulnerable", () => {
  // No ldd (SSHD_LINKS_PAM unknown), not apk, UsePAM not reported.
  const s = grade(
    {
      ...VULN_ALPINE,
      OS_ID: "openwrt",
      OS_VER: "23.05",
      PKG_MANAGER: "opkg",
      PKG_VERSION: "9.7p1-1",
      CONFIG_SOURCE: "sshd-T",
      USEPAM: "unknown",
      SSHD_LINKS_PAM: "unknown",
      PAM_PACKAGE: "unknown",
    },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "unknown");
  assert(s.summary.includes("PAM"));
});

Deno.test("UsePAM yes from sshd -T with ldd unavailable is not affected", () => {
  const s = grade(
    {
      ...SSHD_T,
      USEPAM: "yes",
      SSHD_LINKS_PAM: "unknown",
    },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "not-vulnerable");
});

Deno.test("unevaluated access rules make every '*' account assumed", () => {
  // Config read from files, with an AllowUsers line somewhere in it.
  const s = grade(
    { ...VULN_ALPINE, PERMITROOT: "yes", ACCESS_RULES: "yes" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.verdict, "unknown");
  assert(s.starAccounts[0].note.startsWith("counted as reachable"));
  assert(s.notChecked.some((n) => n.startsWith("AllowUsers/DenyUsers")));
  // No access rules anywhere: reachability stands.
  assertEquals(
    grade(
      { ...VULN_ALPINE, PERMITROOT: "yes", ACCESS_RULES: "no" },
      ["deploy|1001|/bin/sh"],
    ).verdict,
    "vulnerable",
  );
  // Evaluated by sshd -T without Match blocks: the rules decide.
  assertEquals(
    grade(
      { ...SSHD_T, ACCESS_RULES: "yes", ALLOWUSERS: "deploy" },
      ["deploy|1001|/bin/sh"],
    ).verdict,
    "vulnerable",
  );
});

const OPENWRT = {
  ...SSHD_T,
  OS_ID: "openwrt",
  OS_VER: "24.10.0",
  OS_PRETTY: "OpenWrt 24.10.0",
  SSH_VERSION: "OpenSSH_9.7p1",
};

Deno.test("non-Alpine musl below 10.6p2: packaged is unknown, source build is vulnerable", () => {
  const stars = ["deploy|1001|/bin/sh"];
  const opkg = grade(
    { ...OPENWRT, PKG_MANAGER: "opkg", PKG_VERSION: "9.7p1-1" },
    stars,
  );
  assertEquals(opkg.versionVulnerable, "unknown");
  assertEquals(opkg.verdict, "unknown");
  assert(opkg.summary.includes("backport"));
  const source = grade(
    { ...OPENWRT, PKG_MANAGER: "", PKG_VERSION: "" },
    stars,
  );
  assertEquals(source.versionVulnerable, "yes");
  assertEquals(source.verdict, "vulnerable");
});

Deno.test("OpenWrt with apk takes the non-Alpine rule, not the Alpine tracker", () => {
  // 9.7_p1-r6 is Alpine 3.20's fixed release; on OpenWrt it proves nothing.
  const s = grade(
    {
      ...OPENWRT,
      PKG_MANAGER: "apk",
      PKG_VERSION: "openssh-server-9.7_p1-r6",
    },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(s.versionVulnerable, "unknown");
  assertEquals(s.verdict, "unknown");
});

Deno.test("Void (xbps) is a packaged build", () => {
  const voidl = {
    ...SSHD_T,
    OS_ID: "void",
    OS_VER: "",
    PKG_MANAGER: "xbps",
  };
  const old = grade(
    { ...voidl, SSH_VERSION: "", PKG_VERSION: "9.7p1" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(old.pkgManager, "xbps");
  assertEquals(old.verdict, "unknown");
  const fixed = grade(
    { ...voidl, SSH_VERSION: "OpenSSH_10.6p2", PKG_VERSION: "10.6p2" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(fixed.verdict, "not-vulnerable");
});

Deno.test("a patched sshd on disk with the old daemon still running is unknown", () => {
  const patched = {
    ...SSHD_T,
    PKG_VERSION: "openssh-server-9.7_p1-r6",
    SSHD_SELECTED_BY: "running",
  };
  assertEquals(
    grade(patched, ["deploy|1001|/bin/sh"]).verdict,
    "not-vulnerable",
  );
  const stale = grade(
    { ...patched, SSHD_REPLACED: "yes" },
    ["deploy|1001|/bin/sh"],
  );
  assertEquals(stale.verdict, "unknown");
  assert(stale.summary.includes("restart sshd"));
});
