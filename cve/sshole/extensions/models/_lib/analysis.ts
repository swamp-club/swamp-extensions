// Copyright (C) 2026 Elder Swamp Club, Inc.
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

/**
 * Turning probe output into a verdict for the *sshole OpenSSH musl
 * password-bypass. The bypass needs all of these at once:
 *
 *   1. musl libc;
 *   2. OpenSSH older than the fix (10.6p2 upstream, or the distro's backport);
 *   3. password authentication handled without PAM;
 *   4. password authentication enabled;
 *   5. an account whose /etc/shadow field is exactly `*`, reachable by
 *      password (a `*` root needs PermitRootLogin yes);
 *   6. at least one account with a `$5$`/`$6$` hash, whose salt sshd borrows.
 *
 * On such a host musl's `crypt()` returns `"*"` for a password over 256 bytes,
 * which equals the stored `"*"`, so a 257–1024 character password is accepted.
 * Distros backport the fix into the package release without changing OpenSSH's
 * version string, so the package release — not the `ssh -V` banner — decides
 * patched vs vulnerable on a distro build.
 *
 * @module
 */

import {
  type HostActionT,
  type RiskLevelT,
  type SignalT,
  type StarAccount,
  type Status,
  type VerdictT,
} from "./schemas.ts";
import {
  FIXED_VERSION_STR,
  isVulnerableVersion,
  parseOpenSshVersion,
} from "./versions.ts";
import { alpineVerdict } from "./tracker.ts";

export const CVE = 'no CVE assigned (OpenSSH "*sshole" musl password bypass)';

const NOLOGIN_SHELLS = new Set([
  "/sbin/nologin",
  "/usr/sbin/nologin",
  "/bin/false",
  "/usr/bin/false",
  "/bin/nologin",
  "",
]);

export type ProbeFacts = {
  hostname: string;
  uname: string;
  uid: number | null;
  os: { id: string; versionId: string; prettyName: string };
  inContainer: boolean;
  sshdPath: string;
  /** How the probed sshd was chosen: the running listener, the binary
   * Alpine's OpenRC script would start, or the first fixed path found. */
  sshdSelectedBy: "running" | "openrc" | "path";
  /** The running sshd was replaced on disk and not restarted. */
  sshdReplaced: boolean;
  sshVersionBanner: string;
  pkgManager: "apk" | "apt" | "rpm" | "opkg" | "xbps" | "none";
  pkgRelease: string;
  libc: "musl" | "glibc" | "other" | "unknown";
  sshdLinksPam: SignalT;
  pamPackage: SignalT;
  configSource: "sshd-T" | "files" | "none";
  usePam: SignalT;
  passwordAuth: SignalT;
  permitRootLogin: string;
  /** The config has Match blocks, so global values may not apply to all. */
  matchBlocks: boolean;
  /** AllowUsers-style rules exist but were not evaluated (no sshd -T, or
   * Match blocks), so '*' accounts are reachable only by assumption. */
  accessRulesUnevaluated: boolean;
  shadowReadable: boolean;
  seedHashCount: number | null;
  starAccounts: StarAccount[];
};

/** Reads one `SSHOLE_KEY=value` map out of probe stdout. */
export function parseProbe(stdout: string): ProbeFacts {
  const single = new Map<string, string>();
  const starRaw: Array<
    { user: string; uid: string; shell: string; groups: string[] }
  > = [];
  for (const raw of stdout.split("\n")) {
    const m = raw.trim().match(/^SSHOLE_([A-Z_]+)=(.*)$/);
    if (!m) continue;
    if (m[1] === "STAR_ACCOUNT") {
      const [user, uid, shell, groups] = m[2].split("|");
      if (user) {
        starRaw.push({
          user,
          uid: uid ?? "",
          shell: shell ?? "",
          groups: (groups ?? "").split(/\s+/).filter((g) => g.length > 0),
        });
      }
      continue;
    }
    single.set(m[1], m[2]);
  }

  const libcRaw = single.get("LIBC") ?? "unknown";
  const libc = libcRaw === "musl" || libcRaw === "glibc"
    ? libcRaw
    : libcRaw === "unknown"
    ? "unknown"
    : "other";
  const uidStr = single.get("UID");
  const uid = uidStr && /^\d+$/.test(uidStr) ? Number(uidStr) : null;
  const pm = single.get("PKG_MANAGER");
  const pkgManager =
    pm === "apk" || pm === "apt" || pm === "rpm" || pm === "opkg" ||
      pm === "xbps"
      ? pm
      : "none";
  const pkgVersionRaw = single.get("PKG_VERSION") ?? "";
  const pkgRelease = pkgManager === "apk"
    ? (extractApkRelease(pkgVersionRaw) ?? "")
    : pkgVersionRaw;
  const seedStr = single.get("SEED_HASH_COUNT");
  const seedHashCount = seedStr && /^\d+$/.test(seedStr)
    ? Number(seedStr)
    : null;
  const permitRootLogin = (single.get("PERMITROOT") ?? "unknown").toLowerCase();

  // Login restrictions and PermitRootLogin are only trusted from sshd -T with
  // no Match blocks; otherwise an account they would refuse still counts as
  // reachable, flagged as assumed so the verdict ends in unknown.
  const fromSshdT = single.get("CONFIG_SOURCE") === "sshd-T";
  const matchBlocks = single.get("MATCH_BLOCKS") === "yes";
  const rulesTrusted = fromSshdT && !matchBlocks;
  const accessRulesUnevaluated = single.get("ACCESS_RULES") === "yes" &&
    !rulesTrusted;
  const access: AccessRules = {
    allowUsers: fromSshdT ? words(single.get("ALLOWUSERS")) : [],
    denyUsers: fromSshdT ? words(single.get("DENYUSERS")) : [],
    allowGroups: fromSshdT ? words(single.get("ALLOWGROUPS")) : [],
    denyGroups: fromSshdT ? words(single.get("DENYGROUPS")) : [],
  };
  const starAccounts = starRaw.map((s) =>
    makeStarAccount(
      s.user,
      s.uid,
      s.shell,
      permitRootLogin,
      s.groups,
      access,
      rulesTrusted,
      accessRulesUnevaluated,
    )
  );

  return {
    hostname: single.get("HOSTNAME") ?? "",
    uname: single.get("UNAME") ?? "",
    uid,
    os: {
      id: single.get("OS_ID") ?? "",
      versionId: single.get("OS_VER") ?? "",
      prettyName: single.get("OS_PRETTY") ?? "",
    },
    inContainer: single.get("CONTAINER") === "yes",
    sshdPath: single.get("SSHD_PATH") ?? "",
    sshdSelectedBy: single.get("SSHD_SELECTED_BY") === "running"
      ? "running"
      : single.get("SSHD_SELECTED_BY") === "openrc"
      ? "openrc"
      : "path",
    sshdReplaced: single.get("SSHD_REPLACED") === "yes",
    // Only a real "OpenSSH_" token counts; anything else is an error message.
    sshVersionBanner: /OpenSSH_/.test(single.get("SSH_VERSION") ?? "")
      ? single.get("SSH_VERSION")!
      : "",
    pkgManager,
    pkgRelease,
    libc,
    sshdLinksPam: asSignal(single.get("SSHD_LINKS_PAM")),
    pamPackage: asSignal(single.get("PAM_PACKAGE")),
    configSource: single.get("CONFIG_SOURCE") === "sshd-T"
      ? "sshd-T"
      : single.get("CONFIG_SOURCE") === "files"
      ? "files"
      : "none",
    usePam: asSignal(single.get("USEPAM")),
    passwordAuth: asSignal(single.get("PWAUTH")),
    permitRootLogin,
    matchBlocks,
    accessRulesUnevaluated,
    shadowReadable: single.get("SHADOW_READABLE") === "yes",
    seedHashCount,
    starAccounts,
  };
}

function asSignal(value: string | undefined): SignalT {
  return value === "yes" ? "yes" : value === "no" ? "no" : "unknown";
}

/** Extracts an apk package release ("9.7_p1-r6") from `apk info -v` output
 * ("openssh-server-9.7_p1-r6"). */
export function extractApkRelease(pkgLine: string): string | null {
  const m = pkgLine.match(/-(\d.*)$/);
  return m ? m[1] : null;
}

function words(value: string | undefined): string[] {
  return (value ?? "").split(/\s+/).filter((w) => w.length > 0);
}

/** Note prefix for a '*' account counted as reachable on an assumption. */
const ASSUMED_REACHABLE = "counted as reachable";

/** sshd's AllowUsers / DenyUsers / AllowGroups / DenyGroups. */
export type AccessRules = {
  allowUsers: string[];
  denyUsers: string[];
  allowGroups: string[];
  denyGroups: string[];
};

/** OpenSSH wildcard match: `*` any run, `?` one character. */
function globMatch(pattern: string, value: string): boolean {
  const re = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${re}$`).test(value);
}

/**
 * OpenSSH pattern-list semantics: a matching negated entry ("!name") wins,
 * otherwise any positive match. A `user@host` entry is matched on the user
 * part only, since the host restriction still lets that user in from there.
 */
function listMatches(patterns: string[], values: string[]): boolean {
  let positive = false;
  for (const raw of patterns) {
    const negated = raw.startsWith("!");
    const pattern = (negated ? raw.slice(1) : raw).split("@")[0];
    if (values.some((v) => globMatch(pattern, v))) {
      if (negated) return false;
      positive = true;
    }
  }
  return positive;
}

/** Why sshd's access rules refuse this account, or null when they allow it. */
export function accessDenial(
  user: string,
  groups: string[],
  a: AccessRules,
): string | null {
  if (a.denyUsers.length > 0 && listMatches(a.denyUsers, [user])) {
    return "listed in DenyUsers";
  }
  if (a.allowUsers.length > 0 && !listMatches(a.allowUsers, [user])) {
    return "not in AllowUsers";
  }
  if (a.denyGroups.length > 0 && listMatches(a.denyGroups, groups)) {
    return "in a DenyGroups group";
  }
  if (a.allowGroups.length > 0 && !listMatches(a.allowGroups, groups)) {
    return "in no AllowGroups group";
  }
  return null;
}

const NO_RULES: AccessRules = {
  allowUsers: [],
  denyUsers: [],
  allowGroups: [],
  denyGroups: [],
};

function makeStarAccount(
  user: string,
  uidStr: string,
  shell: string,
  permitRootLogin: string,
  groups: string[] = [],
  access: AccessRules = NO_RULES,
  rulesTrusted = true,
  accessRulesUnevaluated = false,
): StarAccount {
  const uid = /^\d+$/.test(uidStr) ? Number(uidStr) : null;
  const loginCapable = !NOLOGIN_SHELLS.has(shell.trim());
  const isRoot = uid === 0;
  let note = loginCapable
    ? "has a login shell"
    : "shell is nologin/false (SSH auth still succeeds; sftp or forwarding may work)";
  // A shadow entry with no passwd entry cannot log in at all.
  if (uid === null) {
    return {
      user,
      uid,
      shell: shell.trim() || null,
      loginCapable: false,
      reachable: false,
      note: "no passwd entry, so the account cannot log in",
    };
  }
  const denial = accessDenial(user, groups, access);
  // A "*" root is only reachable by password when PermitRootLogin is "yes".
  const rootShield = isRoot && permitRootLogin !== "yes"
    ? `PermitRootLogin ${permitRootLogin}`
    : null;
  const refusal = denial ?? rootShield;
  const reachable = refusal === null || !rulesTrusted;
  if (isRoot) note = `root (uid 0); ${note}`;
  if (refusal && rulesTrusted) note = `refused by sshd: ${refusal}; ${note}`;
  if (!refusal && accessRulesUnevaluated) {
    note =
      `${ASSUMED_REACHABLE}: the config has AllowUsers/DenyUsers/AllowGroups/DenyGroups rules that were not evaluated (needs sshd -T and no Match blocks); ${note}`;
  }
  if (refusal && !rulesTrusted) {
    note =
      `${ASSUMED_REACHABLE}: ${refusal} would refuse it, but that is not confirmed (config files, or Match blocks that can override it); ${note}`;
  }
  return {
    user,
    uid,
    shell: shell.trim() || null,
    loginCapable,
    reachable,
    note,
  };
}

/**
 * Alpine's openssh-server-pam installs a separate sshd.pam. When it is
 * installed and the probed sshd lacks PAM, that sshd is only known to be the
 * one that runs if it was chosen as the running listener or by Alpine's
 * OpenRC rule; a fallback path pick leaves the build in doubt.
 */
function pamBuildInDoubt(f: ProbeFacts): boolean {
  return f.pamPackage === "yes" && f.sshdLinksPam === "no" &&
    f.sshdSelectedBy === "path";
}

/** The runtime password path ignores PAM: UsePAM off, or sshd has no PAM. */
function noPamPath(f: ProbeFacts): boolean {
  if (f.usePam === "no" && !pamBuildInDoubt(f)) return true;
  if (
    f.usePam === "unknown" && f.sshdLinksPam === "no" && !pamBuildInDoubt(f)
  ) {
    return true;
  }
  if (
    f.usePam === "unknown" && f.pamPackage === "no" && f.pkgManager === "apk"
  ) {
    return true;
  }
  return false;
}

function pamProtected(f: ProbeFacts): boolean {
  return f.usePam === "yes" && f.sshdLinksPam !== "no";
}

type PatchState = {
  state: SignalT; // yes = still vulnerable, no = patched, unknown
  fixedRelease: string | null;
  detail: string;
};

/** Decides patched vs vulnerable, distro backports first. */
export function patchState(f: ProbeFacts): PatchState {
  const ps = patchStateOnDisk(f);
  // A patched binary on disk does not help while the old daemon still runs.
  if (ps.state === "no" && f.sshdReplaced) {
    return {
      ...ps,
      state: "unknown",
      detail:
        `${ps.detail} But the running sshd was replaced on disk and not restarted, so the daemon may still be the old build; restart sshd.`,
    };
  }
  return ps;
}

function patchStateOnDisk(f: ProbeFacts): PatchState {
  if (f.os.id === "alpine") {
    const av = alpineVerdict(
      f.os.versionId,
      f.pkgRelease || null,
      f.os.prettyName,
    );
    return {
      state: av.verdict === "patched"
        ? "no"
        : av.verdict === "vulnerable"
        ? "yes"
        : "unknown",
      fixedRelease: av.fixedRelease,
      detail: av.detail,
    };
  }
  const version = parseOpenSshVersion(f.sshVersionBanner) ??
    parseOpenSshVersion(f.pkgRelease);
  if (!version) {
    return {
      state: "unknown",
      fixedRelease: null,
      detail: "OpenSSH version could not be parsed.",
    };
  }
  if (!isVulnerableVersion(version)) {
    return {
      state: "no",
      fixedRelease: FIXED_VERSION_STR,
      detail: `OpenSSH ${version.raw} is at or past ${FIXED_VERSION_STR}.`,
    };
  }
  // Below the upstream fix. A source build (no package manager at all, as on
  // most buildroot/yocto images) cannot carry a backport; a packaged build
  // can, and there is no tracker for it, so its status is not known.
  if (f.pkgManager === "none") {
    return {
      state: "yes",
      fixedRelease: FIXED_VERSION_STR,
      detail:
        `OpenSSH ${version.raw} is below ${FIXED_VERSION_STR} and no package manager is present, so no vendor fix applies.`,
    };
  }
  return {
    state: "unknown",
    fixedRelease: FIXED_VERSION_STR,
    detail:
      `OpenSSH ${version.raw} is below ${FIXED_VERSION_STR}; a ${f.pkgManager} vendor backport cannot be ruled out from the version.`,
  };
}

/** Grades one host from its probe facts. */
export function analyze(
  probed: ProbeFacts,
  ctx: { target: string; scanTimestamp?: string },
): Status {
  // Without sshd -T (no root, or sshd -T failed) the probe reads the config
  // files, which cannot model Include placement or Match blocks exactly. A
  // file-sourced value that would rule the host out is not trusted: it is
  // treated as unknown and listed under notChecked, so such a scan never
  // reports not-vulnerable on the strength of a guessed setting.
  //
  // sshd -T prints only the global settings, so with Match blocks in the
  // config the same goes for a global value: a Match block can turn password
  // auth back on for some clients.
  const fromFiles = probed.configSource !== "sshd-T";
  const unconfirmed = fromFiles || probed.matchBlocks;
  const why = fromFiles
    ? "read from the config files, not confirmed with sshd -T"
    : "a global value that Match blocks in the config can override";
  const untrusted: string[] = [];
  if (unconfirmed && probed.passwordAuth === "no") {
    untrusted.push(`PasswordAuthentication no (${why})`);
  }
  if (unconfirmed && probed.usePam === "yes") {
    untrusted.push(`UsePAM yes (${why})`);
  }
  const f: ProbeFacts = {
    ...probed,
    passwordAuth: unconfirmed && probed.passwordAuth === "no"
      ? "unknown"
      : probed.passwordAuth,
    usePam: unconfirmed && probed.usePam === "yes" ? "unknown" : probed.usePam,
  };
  const version = parseOpenSshVersion(f.sshVersionBanner) ??
    parseOpenSshVersion(f.pkgRelease);
  const openSshVersion = version ? version.raw : null;
  const ps = patchState(f);

  const reasons: string[] = [];
  const notChecked: string[] = [...untrusted];
  if (f.accessRulesUnevaluated) {
    notChecked.push(
      "AllowUsers/DenyUsers/AllowGroups/DenyGroups (present in the config but not evaluated: needs sshd -T and no Match blocks)",
    );
  }
  const recommendations: string[] = [];
  const stopgaps: string[] = [];
  const actions = new Set<HostActionT>();

  const noPam = noPamPath(f);
  const pamSafe = pamProtected(f);
  const seedKnown = f.seedHashCount !== null;
  const seedPresent = (f.seedHashCount ?? 0) > 0;
  const hasStar = f.starAccounts.length > 0;
  const reachableStars = f.starAccounts.filter((a) => a.reachable);

  let vulnerable = false;
  let undecided = false;
  let riskLevel: RiskLevelT = "none";
  let action: HostActionT = "none";
  let summary = "";

  if (f.uname && !/linux/i.test(f.uname)) {
    reasons.push(
      `host is ${f.uname}, not Linux; the bypass only affects OpenSSH on musl Linux.`,
    );
    summary = `Not affected: ${f.uname}, not a musl Linux host.`;
    return assemble();
  }

  if (f.libc !== "musl" && f.libc !== "unknown") {
    reasons.push(
      `libc is ${f.libc}; the bypass only affects OpenSSH built against musl.`,
    );
    summary = `Not affected: ${f.libc} libc.`;
    return assemble();
  }

  // Decided on the sshd binary alone: an ssh client, or an error message
  // captured from a missing one, says nothing about a server.
  if (!f.sshdPath) {
    riskLevel = "unknown";
    summary = "No OpenSSH server found on the target.";
    reasons.push(
      "sshd was not found in PATH, /usr/sbin, /usr/bin or /sbin.",
    );
    return assemble();
  }

  if (ps.state === "no") {
    reasons.push(`patched: ${ps.detail}`);
    summary = `Patched: ${
      f.pkgRelease || openSshVersion || "OpenSSH"
    } carries the fix.`;
    return assemble();
  }

  if (pamSafe) {
    reasons.push(
      "sshd uses PAM for password authentication (UsePAM yes), which does not take the vulnerable code path.",
    );
    summary = "Not affected: password auth goes through PAM.";
    addFixRecommendations(false);
    return assemble();
  }

  if (f.passwordAuth === "no") {
    reasons.push(
      "PasswordAuthentication is disabled, so no password is checked.",
    );
    summary = "Not affected: password authentication is off.";
    addFixRecommendations(false);
    return assemble();
  }

  // Record the uncertain inputs we are assuming through.
  if (f.libc === "unknown") {
    notChecked.push("libc (musl assumed below)");
  }
  if (ps.state === "unknown") {
    notChecked.push(`patch status (${ps.detail})`);
  }
  if (f.passwordAuth === "unknown") {
    notChecked.push("PasswordAuthentication (defaults to on)");
  }
  if (noPam) {
    reasons.push(
      f.usePam === "no"
        ? "sshd does not use PAM for password auth (UsePAM no)."
        : "sshd is not linked against / does not have PAM for password auth.",
    );
  } else {
    reasons.push("could not confirm PAM use; treating as the non-PAM path.");
    notChecked.push("UsePAM (effective value unknown)");
  }

  // Precondition 6: a $5$/$6$ account must exist to seed the borrowed salt.
  if (seedKnown && !seedPresent) {
    riskLevel = "low";
    summary =
      "Not currently exploitable: no $5$/$6$ account exists to seed the borrowed salt — but the host is otherwise on the vulnerable path.";
    reasons.push(
      "no account has a $5$/$6$ hash, so sshd falls back to a DES salt and crypt() will not return '*'.",
    );
    addFixRecommendations(true);
    return assemble();
  }
  if (!seedKnown) {
    notChecked.push(
      "salt-seeding $5$/$6$ account (need root to read /etc/shadow)",
    );
  }

  if (!f.shadowReadable) {
    riskLevel = "high";
    action = "needs-privilege";
    summary =
      "Likely exposed: musl, non-PAM, password auth on — rerun as root to list '*' accounts and the salt seed.";
    reasons.push(
      "/etc/shadow is not readable, so '*' accounts were not listed.",
    );
    recommendations.push("Rerun as root to confirm the exposed accounts.");
    addFixRecommendations(true);
    return assemble();
  }

  if (!hasStar) {
    riskLevel = "low";
    summary =
      "No '*' accounts today, but the host takes the vulnerable path — a future '*' account would be exploitable.";
    reasons.push("no account has a '*' password field right now.");
    addFixRecommendations(true);
    return assemble();
  }

  if (reachableStars.length === 0) {
    riskLevel = "medium";
    summary =
      "'*' account(s) exist but none is reachable by password today; a config change could expose them.";
    for (const a of f.starAccounts) {
      reasons.push(`'*' account ${a.user} is not reachable: ${a.note}.`);
    }
    addFixRecommendations(true);
    return assemble();
  }

  // Confirmed exposed by configuration.
  vulnerable = true;
  const loginCapable = reachableStars.filter((a) => a.loginCapable);
  riskLevel = loginCapable.length > 0 ? "critical" : "high";
  action = "upgrade";
  const names = reachableStars.map((a) => a.user).slice(0, 5).join(", ");
  summary =
    `Exposed: ${reachableStars.length} reachable '*' account(s) (${names}${
      reachableStars.length > 5 ? ", …" : ""
    }) accept any 257–1024 character password.`;
  reasons.push(
    `${reachableStars.length} reachable '*' account(s); on musl a password over 256 bytes hashes to '*' and matches.`,
  );
  if (seedPresent) {
    reasons.push(
      `${f.seedHashCount} account(s) carry a $5$/$6$ hash to seed the borrowed salt.`,
    );
  }
  addFixRecommendations(true);
  // Every precondition holds as far as the probe could tell, but one input
  // was assumed rather than read. Report that as unknown, never vulnerable.
  const doubts: string[] = [];
  if (untrusted.length > 0) {
    doubts.push(
      `the config says password auth is off or uses PAM, but that is ${why}`,
    );
  }
  if (ps.state === "unknown") doubts.push(`patch status: ${ps.detail}`);
  if (pamBuildInDoubt(f)) {
    doubts.push(
      "openssh-server-pam is installed and the running sshd build could not be identified",
    );
  }
  if (f.libc === "unknown") doubts.push("libc could not be identified");
  if (!noPam) doubts.push("whether password auth goes through PAM");
  // Only a doubt when every reachable account is reachable by assumption.
  if (reachableStars.every((a) => a.note.startsWith(ASSUMED_REACHABLE))) {
    doubts.push(
      "a PermitRootLogin, AllowUsers or AllowGroups rule that would refuse the account could not be confirmed",
    );
  }
  if (doubts.length > 0) {
    vulnerable = false;
    undecided = true;
    riskLevel = "high";
    summary =
      `Likely exposed: ${reachableStars.length} reachable '*' account(s) (${names}), but not confirmed — ${
        doubts.join("; ")
      }.`;
    if (untrusted.length > 0 && !fromFiles) {
      recommendations.push(
        "Check the Match blocks in sshd_config: run sshd -T -C user=<name>,addr=<client> for the users and networks that can reach sshd.",
      );
    } else if (untrusted.length > 0) {
      if (f.uid === 0) {
        recommendations.push(
          "sshd -T failed even as root (often missing host keys, e.g. in a container started for the scan); check the effective settings with sshd -T on the running host.",
        );
      } else {
        action = "needs-privilege";
        recommendations.push(
          "Rerun as root so sshd -T reports the effective configuration.",
        );
      }
    }
  }
  if (f.inContainer) {
    actions.add("rebuild-image");
    recommendations.push(
      "This looks like a container: rebuild the image on a fixed OpenSSH rather than patching the running container.",
    );
  }
  return assemble();

  function addFixRecommendations(primary: boolean) {
    if (primary) {
      actions.add("upgrade");
      actions.add("disable-password-auth");
    }
    const fix = ps.fixedRelease ?? FIXED_VERSION_STR;
    recommendations.push(
      f.pkgManager === "apk"
        ? `Upgrade openssh to ${fix} or newer (apk upgrade -U -a) and restart sshd.`
        : `Upgrade OpenSSH to ${FIXED_VERSION_STR} or a fixed distro build and restart sshd.`,
    );
    stopgaps.push(
      "Set 'PasswordAuthentication no' in /etc/ssh/sshd_config.d/00-sshole.conf and restart sshd.",
    );
    if (f.pamPackage !== "yes") {
      stopgaps.push(
        "On Alpine, the openssh-server-pam build with 'UsePAM yes' is not affected.",
      );
    }
  }

  function assemble(): Status {
    if (action !== "none") actions.add(action);
    else if (actions.size === 0) actions.add("none");
    const verdict: VerdictT = vulnerable
      ? "vulnerable"
      : undecided || riskLevel === "unknown" || action === "needs-privilege"
      ? "unknown"
      : "not-vulnerable";
    return {
      scanTimestamp: ctx.scanTimestamp ?? new Date().toISOString(),
      target: ctx.target,
      hostname: f.hostname || ctx.target,
      os: f.os,
      inContainer: f.inContainer,
      runAsRoot: f.uid === 0,
      probe: "sh",
      cve: CVE,
      libc: f.libc,
      openSshVersion,
      pkgManager: f.pkgManager,
      pkgRelease: f.pkgRelease || null,
      distroFixedRelease: ps.fixedRelease,
      versionVulnerable: ps.state,
      usesPam: f.usePam,
      sshdLinksPam: f.sshdLinksPam,
      pamPackageInstalled: f.pamPackage,
      passwordAuth: f.passwordAuth,
      permitRootLogin: f.permitRootLogin,
      seedHash: seedKnown ? (seedPresent ? "yes" : "no") : "unknown",
      seedHashKnown: seedKnown,
      starAccountsKnown: f.shadowReadable,
      starAccounts: f.starAccounts,
      verdict,
      vulnerable,
      riskLevel,
      action,
      actions: [...actions],
      summary,
      reasons,
      notChecked,
      recommendations,
      stopgaps,
      fixedVersion: FIXED_VERSION_STR,
    };
  }
}
