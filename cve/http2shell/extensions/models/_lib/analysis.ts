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
 * Turns probe output into facts, then rates every Brotli decoder it found.
 *
 * @module
 */

import {
  ADVISORY,
  ADVISORY_PUBLISHED_AT,
  BROTLI_FIRST_AFFECTED,
  BROTLI_FIXED,
  BUN_FIXED,
  ENVOY_FIRST_SUPPORTED,
  ENVOY_FIXED,
  INBOUND_MIDDLEWARE,
  ISTIO_FIRST_SUPPORTED,
  ISTIO_FIXED,
  LIBBROTLI_TRACKER,
  NODE_FIXED,
  NODE_NEWEST_FIXED_LINE,
  NODE_TRACKER,
  NOT_AFFECTED,
  PYTHON_AUTO_DECODERS,
  PYTHON_FIXED,
  RUBY_GEM_FIXED,
  TRACKER_SNAPSHOT,
} from "./advisory.ts";
import type {
  Finding,
  FindingActionT,
  HostActionT,
  Listener,
  StaleProcess,
  Status,
  VerdictT,
} from "./schemas.ts";
import {
  compareDotted,
  comparePackageVersions,
  lineOf,
  type PackageManager,
  parseDotted,
  upstreamOf,
} from "./versions.ts";

// --- Probe parsing -----------------------------------------------------------

export type Pkg = { manager: PackageManager; name: string; version: string };

export type ProbeFacts = {
  hostname: string;
  uid: number | null;
  /** The scanning user's home directory. */
  home: string;
  kernel: string;
  os: { id: string; versionId: string; codename: string; prettyName: string };
  inContainer: boolean;
  noSh: boolean;
  tools: Record<string, string>;
  packages: Pkg[];
  pending: Pkg[];
  aptListsEpoch: number | null;
  nodes: {
    path: string;
    owner: string;
    version: string;
    brotli: string;
    links: string;
  }[];
  buns: { path: string; version: string }[];
  envoys: { path: string; version: string }[];
  istios: { path: string; version: string }[];
  /** site-packages directories: owner uid and mode (sh probe), and "venv" when found through pyvenv.cfg. */
  pyEnvs: {
    dir: string;
    owner: number | null;
    mode: string;
    kind: string;
    /** The sh probe found the directory, its interpreter and what that resolves to all trusted. */
    trusted: boolean;
  }[];
  /** Binaries not run because someone other than root or the scanning user could have written them. */
  notRun: string[];
  pyPkgs: { dir: string; name: string; version: string }[];
  dotnets: { dir: string; version: string; owner: string; links: string }[];
  curls: {
    path: string;
    owner: string;
    versionLine: string;
    links: string;
  }[];
  gems: string[];
  electron: string[];
  locks: { file: string; lines: string[] }[];
  missingSearchPaths: string[];
  processScope: "all" | "own" | "none";
  maps: StaleProcess[];
  /** Processes with the current brotli library loaded: restarted after an upgrade. */
  loaded: StaleProcess[];
  /** The systemd units of those processes: main process and the uid of User= (0 when unset). */
  units: { name: string; mainPid: number | null; uid: number | null }[];
  listeners: Listener[];
  listenersKnown: boolean;
  complete: boolean;
};

function splitFields(rest: string, n: number): string[] {
  const parts = rest.split("|");
  if (parts.length <= n) {
    while (parts.length < n) parts.push("");
    return parts;
  }
  return [...parts.slice(0, n - 1), parts.slice(n - 1).join("|")];
}

/**
 * A MAPS or LOADED line: pid, process name, system unit, mapped path, real
 * uid (absent from older probes and the Windows one). A unit
 * that is not a well-formed system unit name is dropped, so it can never
 * become a restart target, and the path must be absolute.
 */
function processLine(rest: string): StaleProcess | null {
  const [pid, proc, unit, path, uid] = splitFields(rest, 5);
  const n = Number(pid);
  if (!/^\d+$/.test(pid) || !Number.isInteger(n) || !path.startsWith("/")) {
    return null;
  }
  return {
    pid: n,
    process: proc,
    unit: UNIT_NAME.test(unit) ? unit : null,
    path,
    uid: wholeNumber(uid),
  };
}

/** A non-negative integer field, or null. */
function wholeNumber(s: string): number | null {
  return /^\d+$/.test(s.trim()) ? Number(s.trim()) : null;
}

/** Splits an apk "name-version-rN" string. */
export function splitApkName(s: string): { name: string; version: string } {
  const m = s.match(/^(.+)-(\d[^-]*-r\d+)$/);
  return m ? { name: m[1], version: m[2] } : { name: s, version: "" };
}

/** Splits a dist-info or egg-info directory name into name and version. */
export function splitDistInfo(
  dirName: string,
): { name: string; version: string } | null {
  const m = dirName.match(
    /^([A-Za-z0-9_.]+?)-(\d[A-Za-z0-9_.!+]*?)(-py\d[^-]*)?\.(dist|egg)-info$/,
  );
  return m ? { name: m[1], version: m[2] } : null;
}

function isLoopback(addr: string): boolean {
  return /^(127\.|\[?::1\]?:|\[?::ffff:127\.|localhost:)/.test(addr);
}

/** ss/netstat line → listener: the local address and the process name. */
function parseListen(line: string): Listener | null {
  const t = line.trim().split(/\s+/);
  // ss: State Recv-Q Send-Q Local Peer [users]; netstat: Proto Recv-Q
  // Send-Q Local Foreign State PID/Program. Either way the fourth field.
  const local = t[3];
  if (!local) return null;
  const proc = line.match(/users:\(\("([^"]*)"/)?.[1] ??
    line.match(/\s\d+\/(\S+)\s*$/)?.[1] ?? null;
  return { process: proc || null, local, public: !isLoopback(local) };
}

/**
 * Tags that describe the target itself. The probe prints them first, before
 * anything derived from names others can choose, so a later one is ignored:
 * a forged line cannot change who scanned, the OS, or whether it is a container.
 */
const IDENTITY_TAGS = new Set([
  "HOSTNAME",
  "UID",
  "HOME",
  "KERNEL",
  "OS",
  "INCONTAINER",
  "NOSH",
  "NOW",
  "TOOL",
]);

/** A system unit name as systemd writes it. */
const UNIT_NAME = /^[A-Za-z0-9@:._\\-]+\.service$/;

/** Parses the probe's tagged output into facts. Unknown lines are ignored. */
export function parseProbe(text: string): ProbeFacts {
  const f: ProbeFacts = {
    hostname: "",
    uid: null,
    home: "",
    kernel: "",
    os: { id: "", versionId: "", codename: "", prettyName: "" },
    inContainer: false,
    noSh: false,
    tools: {},
    packages: [],
    pending: [],
    aptListsEpoch: null,
    nodes: [],
    buns: [],
    envoys: [],
    istios: [],
    pyEnvs: [],
    notRun: [],
    pyPkgs: [],
    dotnets: [],
    curls: [],
    gems: [],
    electron: [],
    locks: [],
    missingSearchPaths: [],
    processScope: "none",
    maps: [],
    loaded: [],
    units: [],
    listeners: [],
    listenersKnown: true,
    complete: false,
  };
  const locks = new Map<string, string[]>();
  const lines = text.split("\n").map((l) => l.replace(/\r$/, ""));
  // Complete only when the probe's own last line is END: an END forged
  // earlier in the output cannot hide that it was cut short.
  f.complete = lines.filter((l) => l.trim() !== "").at(-1) === "END|1";
  let body = false;
  for (const line of lines) {
    const bar = line.indexOf("|");
    if (bar < 0) continue;
    const tag = line.slice(0, bar);
    const rest = line.slice(bar + 1);
    if (IDENTITY_TAGS.has(tag)) {
      if (body) continue;
    } else {
      body = true;
    }
    switch (tag) {
      case "HOSTNAME":
        f.hostname = rest.trim();
        break;
      case "UID": {
        const n = Number(rest.trim());
        f.uid = rest.trim() !== "" && Number.isInteger(n) ? n : null;
        break;
      }
      case "HOME":
        f.home = rest.trim();
        break;
      case "KERNEL":
        f.kernel = rest.trim();
        break;
      case "OS": {
        const eq = rest.indexOf("=");
        if (eq < 0) break;
        const k = rest.slice(0, eq);
        const v = rest.slice(eq + 1).trim();
        if (k === "ID") f.os.id = v;
        if (k === "VERSION_ID") f.os.versionId = v;
        if (k === "VERSION_CODENAME") f.os.codename = v;
        if (k === "PRETTY_NAME") f.os.prettyName = v;
        break;
      }
      case "INCONTAINER":
        f.inContainer = true;
        break;
      case "NOSH":
        f.noSh = true;
        break;
      case "TOOL": {
        const [name, path] = splitFields(rest, 2);
        if (name && path) f.tools[name] = path;
        break;
      }
      case "PKG": {
        const [manager, name, version] = splitFields(rest, 3);
        if (
          ["dpkg", "rpm", "apk", "brew"].includes(manager) && name && version
        ) {
          f.packages.push({
            manager: manager as PackageManager,
            name,
            version,
          });
        }
        break;
      }
      case "APKPKG": {
        const p = splitApkName(rest.trim());
        if (p.version) f.packages.push({ manager: "apk", ...p });
        break;
      }
      case "PENDING": {
        const [manager, name, version] = splitFields(rest, 3);
        if (["dpkg", "rpm"].includes(manager) && name && version) {
          f.pending.push({
            manager: manager as PackageManager,
            name,
            version,
          });
        }
        break;
      }
      case "APKPENDING": {
        const [current, version] = splitFields(rest, 2);
        const p = splitApkName(current.trim());
        if (p.version && version) {
          f.pending.push({ manager: "apk", name: p.name, version });
        }
        break;
      }
      case "APTLISTS": {
        const n = Number(rest.trim());
        if (Number.isFinite(n) && n > 0) f.aptListsEpoch = n;
        break;
      }
      case "NODE": {
        const [path, owner, out, links] = splitFields(rest, 4);
        const [version = "", brotli = ""] = out.trim().split(/\s+/);
        if (path) {
          f.nodes.push({
            path,
            owner: owner.trim(),
            version: version.replace(/^v/, ""),
            brotli,
            links: links.trim(),
          });
        }
        break;
      }
      case "BUN": {
        const [path, version] = splitFields(rest, 2);
        if (path) f.buns.push({ path, version: version.trim() });
        break;
      }
      case "ENVOY": {
        const [path, version] = splitFields(rest, 2);
        if (path) f.envoys.push({ path, version: version.trim() });
        break;
      }
      case "ISTIO": {
        const [path, version] = splitFields(rest, 2);
        if (path) f.istios.push({ path, version: version.trim() });
        break;
      }
      case "PYENV":
        {
          const [dir, owner, mode, kind, trust] = splitFields(rest, 5);
          const n = Number(owner);
          if (dir && !f.pyEnvs.some((e) => e.dir === dir)) {
            f.pyEnvs.push({
              dir,
              owner: owner.trim() !== "" && Number.isInteger(n) ? n : null,
              mode: mode.trim(),
              kind: kind.trim(),
              trusted: trust.trim() === "1",
            });
          }
        }
        break;
      case "PYPKG": {
        const [dir, base] = splitFields(rest, 2);
        const d = splitDistInfo(base.trim());
        if (dir && d) f.pyPkgs.push({ dir, ...d });
        break;
      }
      case "DOTNET": {
        const [dir, version, owner, links] = splitFields(rest, 4);
        if (dir) {
          f.dotnets.push({
            dir,
            version: version.trim(),
            owner: owner.trim(),
            links: links.trim(),
          });
        }
        break;
      }
      case "CURL": {
        const [path, owner, versionLine, links] = splitFields(rest, 4);
        if (path) {
          f.curls.push({
            path,
            owner: owner.trim(),
            versionLine: versionLine.trim(),
            links: links.trim(),
          });
        }
        break;
      }
      case "NOTRUN":
        if (rest && !f.notRun.includes(rest)) f.notRun.push(rest);
        break;
      case "GEM":
        if (rest) f.gems.push(rest);
        break;
      case "ELECTRON":
        if (rest) f.electron.push(rest);
        break;
      case "LOCK": {
        const [file, l] = splitFields(rest, 2);
        if (!file) break;
        if (!locks.has(file)) locks.set(file, []);
        locks.get(file)!.push(l);
        break;
      }
      case "NOSEARCHPATH":
        f.missingSearchPaths.push(rest);
        break;
      case "PROCSCOPE":
        if (rest === "all" || rest === "own" || rest === "none") {
          f.processScope = rest;
        }
        break;
      case "MAPS": {
        const p = processLine(rest);
        if (p) f.maps.push(p);
        break;
      }
      case "LOADED": {
        const p = processLine(rest);
        if (p) f.loaded.push(p);
        break;
      }
      case "UNIT": {
        const [name, mainPid, uid] = splitFields(rest, 3);
        // The first line for a unit stands.
        if (UNIT_NAME.test(name) && !f.units.some((u) => u.name === name)) {
          const pid = wholeNumber(mainPid);
          f.units.push({
            name,
            // systemctl prints MainPID=0 for a unit with no main process.
            mainPid: pid === 0 ? null : pid,
            uid: wholeNumber(uid),
          });
        }
        break;
      }
      case "LISTEN": {
        const l = parseListen(rest);
        if (l) f.listeners.push(l);
        break;
      }
      case "LSOF": {
        const [proc, _pid, local] = splitFields(rest, 3);
        if (local) {
          f.listeners.push({
            process: proc || null,
            local,
            public: !isLoopback(local),
          });
        }
        break;
      }
      case "NOLISTEN":
        f.listenersKnown = false;
        break;
      case "END":
        break;
    }
  }
  f.locks = [...locks].map(([file, lines]) => ({ file, lines }));
  return f;
}

// --- Rating ------------------------------------------------------------------

type Rating = {
  verdict: VerdictT;
  action: FindingActionT;
  fixedVersion: string | null;
  note: string;
};

/** Upstream Brotli release judged against the fixed line. */
export function judgeBrotli(version: string): Rating {
  const p = parseDotted(version);
  if (!p) {
    return {
      verdict: "unknown",
      action: "check-vendor",
      fixedVersion: null,
      note: `Brotli version ${JSON.stringify(version)} not recognised.`,
    };
  }
  if (compareDotted(version, BROTLI_FIRST_AFFECTED) < 0) {
    return {
      verdict: "not-affected",
      action: "none",
      fixedVersion: null,
      note:
        `Brotli ${version} predates the affected code (introduced in ${BROTLI_FIRST_AFFECTED}).`,
    };
  }
  const line = lineOf(version) ?? "";
  const fixed = BROTLI_FIXED[line];
  if (!fixed) {
    // Lines after 1.2 shipped after the fix.
    return compareDotted(version, "1.2.1") > 0
      ? { verdict: "patched", action: "none", fixedVersion: null, note: "" }
      : {
        verdict: "unknown",
        action: "check-vendor",
        fixedVersion: null,
        note: `Brotli ${version} is not a known release line.`,
      };
  }
  return compareDotted(version, fixed) >= 0
    ? { verdict: "patched", action: "none", fixedVersion: fixed, note: "" }
    : {
      verdict: "vulnerable",
      action: "upgrade",
      fixedVersion: fixed,
      note: `Brotli ${version} is affected; fixed in ${fixed}.`,
    };
}

/** Version against a per-line table; lines below the table are unsupported. */
function judgeLines(
  product: string,
  version: string,
  table: Record<string, string>,
  firstSupported: string,
): Rating {
  if (!parseDotted(version)) {
    return {
      verdict: "unknown",
      action: "check-vendor",
      fixedVersion: null,
      note: `${product} version not recognised (${JSON.stringify(version)}).`,
    };
  }
  const line = lineOf(version) ?? "";
  const lines = Object.keys(table).sort(compareDotted);
  const fixed = table[line];
  if (fixed) {
    return compareDotted(version, fixed) >= 0
      ? { verdict: "patched", action: "none", fixedVersion: fixed, note: "" }
      : {
        verdict: "vulnerable",
        action: "upgrade",
        fixedVersion: fixed,
        note: `${product} ${version} is affected; fixed in ${fixed}.`,
      };
  }
  if (compareDotted(version, lines.at(-1)!) > 0) {
    return { verdict: "patched", action: "none", fixedVersion: null, note: "" };
  }
  // Point at the oldest fix on a line that is still supported.
  const supported = lines.filter((l) => compareDotted(l, firstSupported) >= 0);
  return {
    verdict: "unsupported",
    action: "upgrade",
    fixedVersion: table[supported[0]],
    note: `${product} ${line} gets no fix; move to ${
      supported.map((l) => table[l]).join(", ")
    } or later.`,
  };
}

/** Upstream Node.js by release line. */
export function judgeNode(version: string): Rating {
  const p = parseDotted(version);
  if (!p) {
    return {
      verdict: "unknown",
      action: "check-vendor",
      fixedVersion: null,
      note: `Node.js version not recognised (${JSON.stringify(version)}).`,
    };
  }
  const fixed = NODE_FIXED[String(p[0])];
  if (fixed) {
    return compareDotted(version, fixed) >= 0
      ? { verdict: "patched", action: "none", fixedVersion: fixed, note: "" }
      : {
        verdict: "vulnerable",
        action: "upgrade",
        fixedVersion: fixed,
        note: `Node.js ${version} is affected; fixed in ${fixed}.`,
      };
  }
  if (p[0] > NODE_NEWEST_FIXED_LINE) {
    return { verdict: "patched", action: "none", fixedVersion: null, note: "" };
  }
  return {
    verdict: "unsupported",
    action: "upgrade",
    fixedVersion: null,
    note: `Node.js ${
      p[0]
    } is end of life and gets no fix; move to 22.23.4, 24.22.1 or 26.12.1.`,
  };
}

function judgeMin(
  product: string,
  version: string,
  fixed: string,
  how: string,
): Rating {
  if (!parseDotted(version)) {
    return {
      verdict: "unknown",
      action: "check-vendor",
      fixedVersion: fixed,
      note:
        `${product} version could not be read; check it is ${fixed} or later.`,
    };
  }
  return compareDotted(version, fixed) >= 0
    ? { verdict: "patched", action: "none", fixedVersion: fixed, note: "" }
    : {
      verdict: "vulnerable",
      action: "upgrade",
      fixedVersion: fixed,
      note: `${product} ${version} is affected; ${how} to ${fixed} or later.`,
    };
}

function releaseMatches(release: string, os: ProbeFacts["os"]): boolean {
  const ids = release.split("|");
  return ids.includes(os.versionId) || (os.codename !== "" &&
    ids.includes(os.codename));
}

/**
 * A distro build of the brotli library (or of the Python binding built from
 * the same source package): the tracker decides, then the upstream version,
 * and anything else below the fix is check-vendor.
 */
export function judgeDistroBrotli(
  pkg: Pkg,
  os: ProbeFacts["os"],
  pending: Pkg[],
): Rating {
  const up = upstreamOf(pkg.manager, pkg.version);
  const upstream = judgeBrotli(up);
  if (pkg.manager === "brew") {
    return upstream.verdict === "vulnerable"
      ? { ...upstream, note: `${upstream.note} Run brew upgrade brotli.` }
      : upstream;
  }
  if (upstream.verdict === "patched" || upstream.verdict === "not-affected") {
    return upstream;
  }
  const update = pending.find((p) =>
    p.manager === pkg.manager && p.name === pkg.name &&
    comparePackageVersions(pkg.manager, p.version, pkg.version) > 0
  );
  const entry = LIBBROTLI_TRACKER.find((e) =>
    e.distro === os.id && releaseMatches(e.release, os) &&
    e.packages.test(pkg.name)
  );
  if (entry?.status === "fixed" && entry.version) {
    if (comparePackageVersions(pkg.manager, pkg.version, entry.version) >= 0) {
      return {
        verdict: "patched",
        action: "none",
        fixedVersion: entry.version,
        note: `Fixed per ${entry.reference}.`,
      };
    }
    const ready = update &&
      comparePackageVersions(pkg.manager, update.version, entry.version) >= 0;
    return {
      verdict: ready ? "update-available" : "vulnerable",
      action: "upgrade",
      fixedVersion: entry.version,
      note:
        `${pkg.name} ${pkg.version} is affected; ${entry.version} is fixed (${entry.reference}).${
          ready ? ` ${update!.version} is available to install.` : ""
        }`,
    };
  }
  if (entry?.status === "pending") {
    if (
      entry.version === null ||
      comparePackageVersions(pkg.manager, pkg.version, entry.version) <= 0
    ) {
      return {
        verdict: "vulnerable",
        action: update ? "upgrade" : "stopgap",
        fixedVersion: null,
        note:
          `${pkg.name} ${pkg.version} is affected and ${entry.reference} lists no fix yet${
            update ? `; ${update.version} is available and may carry it` : ""
          }. Block Brotli from untrusted peers until it ships.`,
      };
    }
    return {
      verdict: "check-vendor",
      action: update ? "upgrade" : "check-vendor",
      fixedVersion: null,
      note:
        `${pkg.name} ${pkg.version} is newer than the build ${entry.reference} lists as affected; confirm with the vendor that it carries the fix.`,
    };
  }
  return {
    verdict: "check-vendor",
    action: update ? "upgrade" : "check-vendor",
    fixedVersion: upstream.fixedVersion,
    note:
      `${pkg.name} ${pkg.version} is Brotli ${up}, below the upstream fix, and no tracker entry known to this extension marks it fixed; distros backport, so check the vendor advisory.${
        update ? ` ${update.version} is available to install.` : ""
      }`,
  };
}

// --- Findings ----------------------------------------------------------------

/** Library packages: dpkg libbrotli1, rpm libbrotli (or brotli), apk brotli-libs (or brotli), brew brotli. */
function libraryPackages(facts: ProbeFacts): Pkg[] {
  const names = new Set(facts.packages.map((p) => `${p.manager}:${p.name}`));
  return facts.packages.filter((p) => {
    if (p.manager === "dpkg") return p.name === "libbrotli1";
    if (p.manager === "rpm") {
      return p.name === "libbrotli" ||
        (p.name === "brotli" && !names.has("rpm:libbrotli"));
    }
    if (p.manager === "apk") {
      return p.name === "brotli-libs" ||
        (p.name === "brotli" && !names.has("apk:brotli-libs"));
    }
    return p.manager === "brew" && p.name === "brotli";
  });
}

function base(
  partial:
    & Pick<Finding, "kind" | "name" | "path" | "source">
    & Partial<Finding>,
): Finding {
  return {
    version: null,
    brotliVersion: null,
    packageName: null,
    packageVersion: null,
    linksSystemBrotli: null,
    verdict: "unknown",
    action: "check-vendor",
    fixedVersion: null,
    note: "",
    exposure: [],
    ...partial,
  };
}

const RANK: VerdictT[] = [
  "vulnerable",
  "unsupported",
  "no-fix-released",
  "update-available",
  "restart-required",
  "check-vendor",
  "unknown",
  "patched",
  "not-affected",
];

/** The worst of several findings' verdicts. */
function worst(findings: Finding[]): Finding | undefined {
  return [...findings].sort((a, b) =>
    RANK.indexOf(a.verdict) - RANK.indexOf(b.verdict)
  )[0];
}

/** A component that links the host's brotli library takes that library's rating. */
function followLibrary(
  libs: Finding[],
  linked: string,
  what: string,
  fromBrew = false,
): Rating | null {
  // Only the library of the same origin: a MacPorts or hand-built link is
  // not fixed by Homebrew's brotli, nor a Homebrew one by the distro's.
  const brewLink = /\/(Cellar|opt)\/brotli\//.test(linked) ||
    (linked === "" && fromBrew);
  if (linked !== "" && !brewLink && !/^\/(usr\/)?lib/.test(linked)) {
    return null;
  }
  const lib = worst(
    libs.filter((l) => brewLink ? l.source === "brew" : l.source === "distro"),
  );
  if (!lib) return null;
  return {
    verdict: lib.verdict === "restart-required" ? "patched" : lib.verdict,
    action: lib.verdict === "patched" || lib.verdict === "restart-required"
      ? "none"
      : lib.action,
    // Fixed by the library, so name it: "brotli 1.2.1", not a bare version
    // that reads as this component's own.
    fixedVersion: lib.fixedVersion
      ? `${lib.packageName ?? lib.name} ${lib.fixedVersion}`
      : null,
    note: `${what} links ${linked || "the system Brotli library"}, so it is ${
      lib.verdict === "patched" || lib.verdict === "restart-required"
        ? "fixed by"
        : "only fixed by upgrading"
    } ${lib.packageName ?? lib.name} ${
      lib.packageVersion ?? lib.version ?? ""
    }.`.replace(/ \./, "."),
  };
}

function ownerSource(owner: string): Finding["source"] {
  if (owner.startsWith("brew:")) return "brew";
  return owner ? "distro" : "upstream";
}

function nodeFinding(
  n: ProbeFacts["nodes"][number],
  facts: ProbeFacts,
  libs: Finding[],
): Finding {
  const source = ownerSource(n.owner);
  const pkgName = source === "brew"
    ? n.owner.slice(5)
    : source === "distro"
    ? n.owner
    : null;
  const pkg = facts.packages.find((p) => p.name === pkgName);
  const f = base({
    kind: "node",
    name: "node",
    path: n.path,
    source,
    version: n.version || null,
    brotliVersion: n.brotli || null,
    packageName: pkgName,
    packageVersion: pkg?.version ?? null,
    linksSystemBrotli: n.links === "?" ? null : /libbrotli/.test(n.links),
    exposure: [
      "fetch() decodes Brotli responses; node:zlib, Express 5 and body-parser 2 decode Brotli bodies",
    ],
  });
  let r: Rating | null = null;
  const tracked = source === "distro"
    ? NODE_TRACKER.find((e) =>
      e.distro === facts.os.id && releaseMatches(e.release, facts.os) &&
      e.packages.test(pkgName ?? "")
    )
    : undefined;
  if (tracked) {
    r = tracked.status === "not-affected"
      ? {
        verdict: "not-affected",
        action: "none",
        fixedVersion: null,
        note: `${pkgName} is not affected per ${tracked.reference}.`,
      }
      : tracked.status === "pending"
      ? {
        verdict: "vulnerable",
        action: "stopgap",
        fixedVersion: null,
        note:
          `${pkgName} is affected and ${tracked.reference} lists no fix yet.`,
      }
      : {
        verdict: "unsupported",
        action: "upgrade",
        fixedVersion: null,
        note:
          `${pkgName}: ${tracked.reference} plans no fix; move to a supported Node.js package.`,
      };
  } else if (f.linksSystemBrotli || (source === "brew" && n.links === "?")) {
    r = followLibrary(
      libs,
      n.links === "?" ? "" : n.links,
      "This node",
      source === "brew",
    );
    if (!r && n.brotli) {
      const b = judgeBrotli(n.brotli);
      r = b.verdict === "vulnerable" && source === "distro"
        ? { ...b, verdict: "check-vendor", action: "check-vendor" }
        : b;
    }
  } else if (f.linksSystemBrotli === false && source === "upstream") {
    r = judgeNode(n.version);
  } else if (source === "upstream") {
    // Linkage unknown (no ldd or otool): judge the release.
    r = judgeNode(n.version);
    r = {
      ...r,
      note: `${r.note} Could not check its linked libraries.`.trim(),
    };
  } else {
    const up = judgeNode(n.version);
    r = up.verdict === "patched" ? up : {
      verdict: "check-vendor",
      action: "check-vendor",
      fixedVersion: up.fixedVersion,
      note: `${pkgName} ${
        pkg?.version ?? n.version
      } bundles its own Brotli; distros backport, so check the vendor advisory.`,
    };
  }
  return { ...f, ...(r ?? {}) };
}

function pythonFindings(facts: ProbeFacts): Finding[] {
  const out: Finding[] = [];
  const distroBinding = facts.packages.filter((p) =>
    /^(python3-brotli|py3-brotli)$/.test(p.name)
  );
  for (const p of distroBinding) {
    const r = judgeDistroBrotli(p, facts.os, facts.pending);
    // The distro's own site directory, so a stale _brotli module maps to it.
    const dir = facts.pyPkgs.find((x) =>
      x.name.toLowerCase() === "brotli" &&
      /^\/usr\/lib(64)?\/python3/.test(x.dir)
    )?.dir;
    out.push(base({
      kind: "python",
      name: p.name,
      path: dir ?? p.name,
      source: "distro",
      version: upstreamOf(p.manager, p.version),
      packageName: p.name,
      packageVersion: p.version,
      exposure: autoDecoders(facts, null),
      ...r,
    }));
  }
  for (const pkg of facts.pyPkgs) {
    const name = pkg.name.toLowerCase();
    const fixed = PYTHON_FIXED[name];
    if (!fixed) continue;
    // The distro's own copy is covered by its package above.
    if (
      distroBinding.length > 0 && name === "brotli" &&
      /^\/usr\/lib(64)?\/python3/.test(pkg.dir)
    ) continue;
    const r = judgeMin(
      `${pkg.name}`,
      pkg.version,
      fixed,
      "upgrade it with pip install -U",
    );
    out.push(base({
      kind: "python",
      name: pkg.name,
      path: pkg.dir,
      source: "pip",
      version: pkg.version,
      exposure: autoDecoders(facts, pkg.dir),
      ...r,
    }));
  }
  return out;
}

/** The auto-decoding HTTP clients installed next to a Brotli package. */
function autoDecoders(facts: ProbeFacts, dir: string | null): string[] {
  const names = facts.pyPkgs.filter((p) =>
    (dir === null || p.dir === dir) &&
    PYTHON_AUTO_DECODERS.includes(p.name.toLowerCase())
  ).map((p) => p.name.toLowerCase());
  return [...new Set(names)].sort().map((n) =>
    `${n} decodes Brotli responses automatically while Brotli is installed`
  );
}

function curlFinding(
  c: ProbeFacts["curls"][number],
  libs: Finding[],
): Finding {
  const version = c.versionLine.match(/^curl (\S+)/)?.[1] ?? null;
  const brotli = c.versionLine.match(/\bbrotli\/(\S+)/)?.[1] ?? null;
  const source: Finding["source"] = c.owner === "windows"
    ? "vendor"
    : ownerSource(c.owner);
  const f = base({
    kind: "curl",
    name: "curl",
    path: c.path,
    source,
    version,
    brotliVersion: brotli,
    packageName: source === "distro" ? c.owner : null,
    linksSystemBrotli: c.links === "?" ? null : /libbrotli/.test(c.links),
    exposure: brotli
      ? ["curl --compressed and libcurl users decode Brotli responses"]
      : [],
  });
  if (!brotli) {
    return {
      ...f,
      verdict: "not-affected",
      action: "none",
      note: "Built without Brotli.",
    };
  }
  if (f.linksSystemBrotli) {
    const r = followLibrary(libs, c.links, "curl");
    if (r) return { ...f, ...r };
  }
  const r = judgeBrotli(brotli);
  if (r.verdict === "vulnerable" && source !== "upstream") {
    return {
      ...f,
      verdict: "check-vendor",
      action: "check-vendor",
      fixedVersion: r.fixedVersion,
      note: `${
        source === "vendor" ? "Windows' curl.exe" : "This curl"
      } reports Brotli ${brotli}; vendors backport, so check the vendor advisory.`,
    };
  }
  return { ...f, ...r };
}

function lockFindings(
  facts: ProbeFacts,
): { findings: Finding[]; inbound: string[] } {
  const findings: Finding[] = [];
  const inbound: string[] = [];
  for (const { file, lines } of facts.locks) {
    const base0 = file.replace(/^.*[\\/]/, "");
    // grep -n -A2 prints "12:text" for a match and "13-text" after it.
    const text = lines.filter((l) => l !== "--").map((l) =>
      l.replace(/^\d+[:-]/, "")
    );
    const pins: { name: string; version: string }[] = [];
    for (let i = 0; i < text.length; i++) {
      const t = text[i];
      const next = text.slice(i + 1, i + 3).join("\n");
      let m: RegExpMatchArray | null;
      if (/^requirements.*\.txt$/i.test(base0)) {
        m = t.match(/^(brotli|brotlicffi)\s*==\s*([\w.]+)/i);
        if (m) pins.push({ name: m[1], version: m[2] });
      } else if (/^(poetry|uv)\.lock$/.test(base0)) {
        m = t.match(/^name = "(brotli|brotlicffi)"$/i);
        const v = next.match(/^version = "([^"]+)"/m);
        if (m && v) pins.push({ name: m[1], version: v[1] });
      } else if (base0 === "Pipfile.lock") {
        m = t.match(/"(brotli|brotlicffi)": \{/i);
        const v = next.match(/"version": "==([^"]+)"/);
        if (m && v) pins.push({ name: m[1], version: v[1] });
      } else if (base0 === "package-lock.json") {
        m = t.match(/"(?:[^"]*\/)?node_modules\/(express|body-parser)": \{/);
        const v = next.match(/"version": "([^"]+)"/);
        if (m && v) {
          if (compareDotted(v[1], INBOUND_MIDDLEWARE[m[1]]) >= 0) {
            inbound.push(
              `${file}: ${m[1]} ${
                v[1]
              } inflates Brotli request bodies into Node's decoder`,
            );
          }
        }
      } else if (base0 === "Gemfile.lock") {
        m = t.match(/^ {4}brotli \(([^)]+)\)/);
        if (m) pins.push({ name: "brotli-gem", version: m[1] });
      }
    }
    for (const p of pins) {
      const gem = p.name === "brotli-gem";
      const fixed = gem ? RUBY_GEM_FIXED : PYTHON_FIXED[p.name.toLowerCase()];
      const r = judgeMin(
        gem ? "brotli gem" : p.name,
        p.version,
        fixed,
        "update the pin",
      );
      findings.push(base({
        kind: "lockfile",
        name: gem ? "brotli (gem)" : p.name,
        path: file,
        source: "lockfile",
        version: p.version,
        ...r,
        action: r.verdict === "patched" ? "none" : "update-pin",
        note: r.verdict === "patched"
          ? ""
          : `${file} pins ${p.name} ${p.version}; the next build reinstalls it. Update the pin to ${fixed} or later.`,
      }));
    }
  }
  return { findings, inbound };
}

const NOT_RUN_NOTE =
  "Not run: someone other than root or the scanning user can write it or a directory above it, so its version comes from its install directory.";

/** Every Brotli decoder the probe found, rated. Ordered by kind, then path. */
export function buildFindings(
  facts: ProbeFacts,
): { findings: Finding[]; inbound: string[] } {
  const findings: Finding[] = [];
  const libs: Finding[] = libraryPackages(facts).map((p) =>
    base({
      kind: "libbrotli",
      name: p.name,
      path: p.name,
      source: p.manager === "brew" ? "brew" : "distro",
      version: upstreamOf(p.manager, p.version),
      packageName: p.name,
      packageVersion: p.version,
      ...judgeDistroBrotli(p, facts.os, facts.pending),
    })
  );
  findings.push(...libs);
  for (const n of facts.nodes) findings.push(nodeFinding(n, facts, libs));
  for (const b of facts.buns) {
    findings.push(base({
      kind: "bun",
      name: "bun",
      path: b.path,
      source: "upstream",
      version: b.version || null,
      exposure: ["fetch() and node:zlib in Bun decode Brotli"],
      ...judgeMin("Bun", b.version, BUN_FIXED, "run bun upgrade"),
    }));
  }
  findings.push(...pythonFindings(facts));
  for (const d of facts.dotnets) {
    const linked = /libbrotli/.test(d.links);
    const f = base({
      kind: "dotnet",
      name: "Microsoft.NETCore.App",
      path: d.dir,
      source: d.owner ? "distro" : "vendor",
      version: d.version,
      packageName: d.owner || null,
      linksSystemBrotli: d.links === "?" ? null : linked,
      exposure: [
        "HttpClient decodes Brotli when AutomaticDecompression includes it; BrotliStream decodes any input",
      ],
    });
    if (!d.owner) {
      findings.push({
        ...f,
        verdict: "no-fix-released",
        action: "stopgap",
        brotliVersion: "1.1.0",
        note:
          "Microsoft's .NET runtime bundles Brotli 1.1.0 and no fixed runtime has been released; avoid decoding Brotli from untrusted peers until one ships.",
      });
    } else if (linked) {
      const r = followLibrary(libs, d.links, "This .NET runtime");
      findings.push({
        ...f,
        ...(r ?? {
          verdict: "check-vendor",
          action: "check-vendor",
          fixedVersion: null,
          note: "Links a Brotli library this scan did not find a package for.",
        }),
      });
    } else {
      findings.push({
        ...f,
        verdict: "check-vendor",
        action: "check-vendor",
        note:
          `${d.owner} is a distro build that bundles Brotli; check the vendor advisory.`,
      });
    }
  }
  for (const e of facts.envoys) {
    findings.push(base({
      kind: "envoy",
      name: "envoy",
      path: e.path,
      source: "upstream",
      version: e.version || null,
      exposure: [
        "Envoy's Brotli decompressor filter decodes request and response bodies",
      ],
      ...judgeLines("Envoy", e.version, ENVOY_FIXED, ENVOY_FIRST_SUPPORTED),
    }));
  }
  for (const i of facts.istios) {
    findings.push(base({
      kind: "istio",
      name: "istio",
      path: i.path,
      source: "upstream",
      version: i.version || null,
      exposure: ["istio-proxy is Envoy with its Brotli decompressor"],
      ...judgeLines("Istio", i.version, ISTIO_FIXED, ISTIO_FIRST_SUPPORTED),
    }));
  }
  for (const c of facts.curls) findings.push(curlFinding(c, libs));
  for (const g of facts.gems) {
    const v = g.replace(/^.*[\\/]brotli-/, "").match(/^\d[\w.]*/)?.[0] ?? "";
    findings.push(base({
      kind: "ruby-gem",
      name: "brotli (gem)",
      path: g,
      source: "upstream",
      version: v || null,
      ...judgeMin("brotli gem", v, RUBY_GEM_FIXED, "gem update brotli"),
    }));
  }
  for (const a of facts.electron) {
    const app = a.match(
      /([^\\/]+?)(\.app)?[\\/](Contents[\\/])?[Rr]esources[\\/]app\.asar$/,
    )
      ?.[1] ?? a;
    findings.push(base({
      kind: "electron",
      name: app,
      path: a,
      source: "vendor",
      verdict: "check-vendor",
      action: "check-vendor",
      note:
        "An Electron app bundles its own Node.js and Chromium; update it to a release built after 2026-10-21.",
    }));
  }
  const locks = lockFindings(facts);
  findings.push(...locks.findings);
  const notRun = new Set(facts.notRun);
  const marked = findings.map((f) =>
    notRun.has(f.path)
      ? {
        ...f,
        note: `${NOT_RUN_NOTE}${f.note ? ` ${f.note}` : ""}`,
      }
      : f
  );
  return { findings: markStale(marked, facts.maps), inbound: locks.inbound };
}

/** A fixed component whose old copy a running process still maps needs a restart. */
function markStale(findings: Finding[], maps: StaleProcess[]): Finding[] {
  return findings.map((f) => {
    if (f.verdict !== "patched") return f;
    const stale = maps.filter((m) => {
      if (f.kind === "libbrotli") return /libbrotli/.test(m.path);
      if (f.kind === "node" || f.kind === "bun" || f.kind === "envoy") {
        return m.path === f.path;
      }
      if (f.kind === "python") {
        return /_brotli/.test(m.path) && m.path.startsWith(`${f.path}/`);
      }
      return false;
    });
    if (stale.length === 0) return f;
    return {
      ...f,
      verdict: "restart-required",
      action: "restart",
      note: `Fixed on disk, but ${
        stale.map((s) => `${s.process} (pid ${s.pid})`).join(", ")
      } still run${stale.length === 1 ? "s" : ""} the old code; restart ${
        stale.length === 1 ? "it" : "them"
      }.`,
    };
  });
}

// --- Host summary ------------------------------------------------------------

export const AFFECTED = new Set<VerdictT>([
  "vulnerable",
  "unsupported",
  "update-available",
  "no-fix-released",
  "restart-required",
]);
export const UNCERTAIN = new Set<VerdictT>(["check-vendor", "unknown"]);

const SERVER_PROCESS =
  /^(node|nodejs|bun|envoy|pilot-agent|python[0-9.]*|uvicorn|gunicorn|celery|dotnet)$/;

/** Proxy and client rules that keep untrusted Brotli away from an unpatched decoder. */
export const STOPGAPS = [
  'nginx: reject Brotli request bodies before they reach the app: if ($http_content_encoding ~* "(^|,)\\s*br\\s*(,|$)") { return 415; }',
  "HAProxy: http-request deny deny_status 415 if { req.hdr(content-encoding) -m reg -i (^|,)\\s*br\\s*(,|$) }",
  "Envoy: add a route that matches header content-encoding with safe_regex (?i)(^|,)\\s*br\\s*(,|$) and a direct_response of 415, ahead of the Brotli decompressor filter.",
  "Outbound: removing br from Accept-Encoding is not enough, because a malicious server can send Brotli anyway; reject responses whose Content-Encoding includes br before the client decodes them, or uninstall the Python Brotli and brotlicffi packages (clients fall back to gzip and deflate).",
];

export function analyze(
  facts: ProbeFacts,
  target: string,
  opts: { inContainer: boolean; probe: Status["probe"] },
): Status {
  const { findings, inbound } = buildFindings(facts);
  const inContainer = opts.inContainer || facts.inContainer;
  const findingsOut = inContainer
    ? findings.map((f) =>
      AFFECTED.has(f.verdict) && f.kind !== "lockfile"
        ? { ...f, action: "rebuild-image" as const }
        : f
    )
    : findings;
  const installed = findingsOut.filter((f) => f.kind !== "lockfile");
  const affected = installed.filter((f) => AFFECTED.has(f.verdict));
  const uncertain = installed.filter((f) => UNCERTAIN.has(f.verdict));
  const lockAffected = findingsOut.filter((f) =>
    f.kind === "lockfile" && AFFECTED.has(f.verdict)
  );
  const exposedListeners = facts.listeners.filter((l) =>
    l.public && l.process !== null && SERVER_PROCESS.test(l.process)
  );
  const autoDecodingClients = [
    ...new Set(
      facts.pyPkgs.filter((p) =>
        PYTHON_AUTO_DECODERS.includes(p.name.toLowerCase())
      ).filter((p) =>
        facts.pyPkgs.some((b) =>
          b.dir === p.dir && PYTHON_FIXED[b.name.toLowerCase()]
        )
      ).map((p) => `${p.name.toLowerCase()} in ${p.dir}`),
    ),
  ].sort();

  let riskLevel: Status["riskLevel"] = "none";
  if (affected.length > 0) {
    // A public server raises it to critical. Express or body-parser in a
    // lockfile is listed as exposure but does not: a checkout is not a
    // running service.
    riskLevel = exposedListeners.length > 0 ? "critical" : "high";
  } else if (uncertain.length > 0) riskLevel = "medium";
  else if (lockAffected.length > 0) riskLevel = "low";

  const actions = hostActions(findingsOut);
  const notChecked: string[] = [];
  if (facts.noSh) {
    notChecked.push(
      "The image has no sh: only its node, bun and python runtimes were checked. OS packages, .NET, curl, lockfiles and processes were not.",
    );
  }
  if (facts.processScope === "own") {
    notChecked.push(
      "Only this user's processes were checked for old Brotli code still running; scan as root to check every process.",
    );
  } else if (facts.processScope === "none" && !facts.noSh) {
    notChecked.push(
      "Running processes were not checked for old Brotli code on this platform; restart services that use Node.js, Python or curl after upgrading.",
    );
  }
  if (!facts.listenersKnown && !inContainer) {
    notChecked.push(
      "Listening sockets were not checked (no ss, netstat or lsof).",
    );
  }
  const silent = facts.notRun.filter((p) =>
    !findingsOut.some((f) => f.path === p)
  );
  if (silent.length > 0) {
    notChecked.push(
      `Not run, because someone other than root or the scanning user can write them: ${
        silent.join(", ")
      }.`,
    );
  }
  for (const p of facts.missingSearchPaths) {
    notChecked.push(`searchPath ${p} does not exist on the target.`);
  }

  const packageListsUpdatedAt = facts.aptListsEpoch
    ? new Date(facts.aptListsEpoch * 1000).toISOString()
    : null;
  const recommendations = recommend(
    findingsOut,
    facts.os.id,
    inContainer,
    packageListsUpdatedAt,
  );
  const vulnerable = affected.length > 0;
  const summary = summarize(findingsOut, target, riskLevel, inbound);
  return {
    scanTimestamp: new Date().toISOString(),
    target,
    hostname: facts.hostname || target,
    os: facts.os,
    inContainer,
    runAsRoot: facts.uid === 0,
    probe: opts.probe,
    vulnerable,
    riskLevel,
    action: actions[0],
    actions,
    summary,
    error: null,
    cve: ADVISORY.cve,
    findings: findingsOut,
    exposure: {
      listeners: facts.listeners,
      listenersKnown: facts.listenersKnown,
      exposedListeners,
      inboundMiddleware: inbound,
      autoDecodingClients,
    },
    processScope: facts.processScope,
    staleProcesses: facts.maps,
    notChecked,
    packageListsUpdatedAt,
    recommendations,
    stopgaps: vulnerable || uncertain.length > 0 ? STOPGAPS : [],
    notAffected: NOT_AFFECTED,
    trackerSnapshot: TRACKER_SNAPSHOT,
    mitigation: null,
  };
}

const HOST_ACTION_ORDER: HostActionT[] = [
  "rebuild-image",
  "upgrade",
  "restart",
  "stopgap",
  "update-pin",
  "check-vendor",
];

function hostActions(findings: Finding[]): HostActionT[] {
  const wanted = new Set<HostActionT>(
    findings.filter((f) => f.verdict !== "patched")
      .map((f): HostActionT => f.action).filter((a) => a !== "none"),
  );
  const ordered = HOST_ACTION_ORDER.filter((a) => wanted.has(a));
  return ordered.length > 0 ? ordered : ["none"];
}

function recommend(
  findings: Finding[],
  osId: string,
  inContainer: boolean,
  listsAt: string | null,
): string[] {
  const out: string[] = [];
  const affected = findings.filter((f) =>
    AFFECTED.has(f.verdict) || UNCERTAIN.has(f.verdict)
  );
  if (inContainer && affected.some((f) => f.kind !== "lockfile")) {
    out.push(
      "Rebuild this image on a base and runtime with the fix (Node.js 22.23.4, 24.22.1 or 26.12.1; Brotli 1.2.1 / brotlicffi 1.2.1.0; patched distro brotli) and redeploy; do not patch running containers.",
    );
  }
  const by = (k: Finding["kind"]) =>
    affected.filter((f) => f.kind === k && f.verdict !== "check-vendor");
  if (!inContainer) {
    if (by("libbrotli").some((f) => f.action === "upgrade")) {
      out.push(
        osId === "macos"
          ? "Run brew upgrade brotli, then restart every process that loaded the old library (Homebrew's node and curl link it). mitigate saves these commands as a script."
          : "Upgrade the brotli library packages, then restart every service that loaded the old library (mitigate does both).",
      );
    }
    if (by("node").some((f) => f.source === "upstream")) {
      out.push(
        "Upgrade upstream Node.js installs to 22.23.4, 24.22.1 or 26.12.1 (nvm install, fnm install, volta install, or the official installer), then restart Node services.",
      );
    }
    if (by("python").some((f) => f.source === "pip")) {
      out.push(
        'Upgrade Python environments: pip install -U "Brotli>=1.2.1" "brotlicffi>=1.2.1.0" (mitigate does this with upgradePython=true), then update lockfiles.',
      );
    }
    if (by("bun").length > 0) {
      out.push(
        by("bun").every((f) => f.path.includes("/Cellar/"))
          ? "Run brew upgrade bun to reach 1.4.4 or later."
          : "Run bun upgrade (brew upgrade bun for Homebrew's) to reach 1.4.4 or later.",
      );
    }
    if (by("envoy").length > 0 || by("istio").length > 0) {
      out.push(
        "Upgrade Envoy (1.37.8, 1.38.6, 1.39.3, 1.40.0) or Istio (1.29.9, 1.30.6, 1.31.2) and roll the proxies.",
      );
    }
  }
  if (findings.some((f) => f.verdict === "no-fix-released")) {
    out.push(
      "Components with no fix released (.NET): keep untrusted Brotli away from them with the stopgaps below until the vendor ships a fix.",
    );
  }
  if (findings.some((f) => f.verdict === "restart-required")) {
    out.push(
      "Restart the processes still running the old Brotli code (listed under staleProcesses).",
    );
  }
  if (
    findings.some((f) => f.kind === "lockfile" && f.action === "update-pin")
  ) {
    out.push(
      "Update lockfile pins to Brotli 1.2.1 / brotlicffi 1.2.1.0 / brotli gem 0.9.1 so the next build does not reinstall the vulnerable version.",
    );
  }
  if (findings.some((f) => f.verdict === "check-vendor")) {
    out.push(
      "For check-vendor findings, confirm the vendor's build carries upstream commit 0ed4268 (Brotli 1.0.10, 1.1.1 or 1.2.1).",
    );
  }
  if (
    listsAt && listsAt < ADVISORY_PUBLISHED_AT &&
    findings.some((f) => f.kind === "libbrotli" && f.verdict !== "patched")
  ) {
    out.push(
      `Package lists were last refreshed ${listsAt}, before the advisory; refresh them (apt-get update) and scan again to see fixed builds.`,
    );
  }
  return out;
}

function summarize(
  findings: Finding[],
  target: string,
  risk: Status["riskLevel"],
  inbound: string[],
): string {
  const installed = findings.filter((f) => f.kind !== "lockfile");
  if (installed.length === 0 && findings.length === 0) {
    return `No Brotli decoder found on ${target}.`;
  }
  const count = (s: Set<VerdictT>) =>
    installed.filter((f) => s.has(f.verdict)).length;
  const affected = count(AFFECTED);
  const uncertain = count(UNCERTAIN);
  const parts = [
    `${installed.length} Brotli decoder(s) on ${target}`,
    `${affected} affected`,
    `${uncertain} to check with the vendor`,
  ];
  const lock =
    findings.filter((f) => f.kind === "lockfile" && AFFECTED.has(f.verdict))
      .length;
  if (lock > 0) parts.push(`${lock} vulnerable lockfile pin(s)`);
  if (inbound.length > 0) {
    parts.push(`${inbound.length} app(s) inflating Brotli request bodies`);
  }
  return `${parts.join(", ")}. Risk: ${risk.toUpperCase()}.`;
}
