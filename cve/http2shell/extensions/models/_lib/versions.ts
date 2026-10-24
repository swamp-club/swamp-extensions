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
 * Version comparison for upstream releases and for dpkg, rpm and apk
 * package versions.
 *
 * @module
 */

/**
 * Parses a dotted numeric version ("1.2.1", "1.2.1.0", "v24.22.0") into its
 * numbers, ignoring a leading "v" and anything after the numeric part
 * ("1.40.0-dev"). Null when it does not start with a number.
 */
export function parseDotted(v: string): number[] | null {
  const m = v.trim().replace(/^v/i, "").match(/^\d+(\.\d+)*/);
  if (!m) return null;
  return m[0].split(".").map(Number);
}

/** Compares dotted versions; missing parts count as 0, so 1.2.1 equals 1.2.1.0. */
export function compareDotted(a: string, b: string): number {
  const pa = parseDotted(a) ?? [];
  const pb = parseDotted(b) ?? [];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** "major.minor" of a dotted version, or null. */
export function lineOf(v: string): string | null {
  const p = parseDotted(v);
  return p && p.length >= 2 ? `${p[0]}.${p[1]}` : null;
}

function debOrder(c: string): number {
  if (c === "" || /\d/.test(c)) return 0;
  if (/[A-Za-z]/.test(c)) return c.charCodeAt(0);
  if (c === "~") return -1;
  return c.charCodeAt(0) + 256;
}

function debCompareFragment(a: string, b: string): number {
  let i = 0;
  let j = 0;
  const at = (s: string, k: number) => (k < s.length ? s[k] : "");
  const isDigit = (c: string) => c !== "" && c >= "0" && c <= "9";
  while (i < a.length || j < b.length) {
    let firstDiff = 0;
    while (
      (at(a, i) !== "" && !isDigit(at(a, i))) ||
      (at(b, j) !== "" && !isDigit(at(b, j)))
    ) {
      const ac = debOrder(at(a, i));
      const bc = debOrder(at(b, j));
      if (ac !== bc) return ac - bc;
      i++;
      j++;
    }
    while (at(a, i) === "0") i++;
    while (at(b, j) === "0") j++;
    while (isDigit(at(a, i)) && isDigit(at(b, j))) {
      if (!firstDiff) firstDiff = a.charCodeAt(i) - b.charCodeAt(j);
      i++;
      j++;
    }
    if (isDigit(at(a, i))) return 1;
    if (isDigit(at(b, j))) return -1;
    if (firstDiff) return firstDiff;
  }
  return 0;
}

/** Debian package version comparison (dpkg --compare-versions semantics). */
export function compareDebVersions(a: string, b: string): number {
  const split = (v: string) => {
    const colon = v.indexOf(":");
    const epoch = colon >= 0 ? Number(v.slice(0, colon)) : 0;
    const rest = colon >= 0 ? v.slice(colon + 1) : v;
    const dash = rest.lastIndexOf("-");
    return {
      epoch,
      upstream: dash >= 0 ? rest.slice(0, dash) : rest,
      revision: dash >= 0 ? rest.slice(dash + 1) : "",
    };
  };
  const va = split(a);
  const vb = split(b);
  if (va.epoch !== vb.epoch) return va.epoch - vb.epoch;
  const u = debCompareFragment(va.upstream, vb.upstream);
  if (u !== 0) return u;
  return debCompareFragment(va.revision, vb.revision);
}

/** rpmvercmp: alternating digit and letter segments, with ~ and ^ rules. */
function rpmVerCmp(a: string, b: string): number {
  if (a === b) return 0;
  let i = 0;
  let j = 0;
  const sep = /[^A-Za-z0-9~^]/;
  while (i < a.length || j < b.length) {
    while (i < a.length && sep.test(a[i])) i++;
    while (j < b.length && sep.test(b[j])) j++;
    if (a[i] === "~" || b[j] === "~") {
      if (a[i] !== "~") return 1;
      if (b[j] !== "~") return -1;
      i++;
      j++;
      continue;
    }
    if (a[i] === "^" || b[j] === "^") {
      if (i >= a.length) return -1;
      if (j >= b.length) return 1;
      if (a[i] !== "^") return 1;
      if (b[j] !== "^") return -1;
      i++;
      j++;
      continue;
    }
    if (i >= a.length || j >= b.length) break;
    const numeric = /\d/.test(a[i]);
    const seg = numeric ? /\d/ : /[A-Za-z]/;
    let ei = i;
    while (ei < a.length && seg.test(a[ei])) ei++;
    let ej = j;
    while (ej < b.length && seg.test(b[ej])) ej++;
    const sa = a.slice(i, ei);
    const sb = b.slice(j, ej);
    // A numeric segment is newer than an alphabetic one.
    if (sb === "") return numeric ? 1 : -1;
    if (numeric) {
      const na = sa.replace(/^0+/, "");
      const nb = sb.replace(/^0+/, "");
      if (na.length !== nb.length) return na.length - nb.length;
      if (na !== nb) return na < nb ? -1 : 1;
    } else if (sa !== sb) {
      return sa < sb ? -1 : 1;
    }
    i = ei;
    j = ej;
  }
  if (i >= a.length && j >= b.length) return 0;
  return i >= a.length ? -1 : 1;
}

/** RPM [epoch:]version-release comparison. */
export function compareRpmVersions(a: string, b: string): number {
  const split = (v: string) => {
    const colon = v.indexOf(":");
    const epoch = colon >= 0 ? Number(v.slice(0, colon)) : 0;
    const rest = colon >= 0 ? v.slice(colon + 1) : v;
    const dash = rest.lastIndexOf("-");
    return {
      epoch,
      version: dash >= 0 ? rest.slice(0, dash) : rest,
      release: dash >= 0 ? rest.slice(dash + 1) : "",
    };
  };
  const va = split(a);
  const vb = split(b);
  if (va.epoch !== vb.epoch) return va.epoch - vb.epoch;
  const v = rpmVerCmp(va.version, vb.version);
  if (v !== 0) return v;
  return rpmVerCmp(va.release, vb.release);
}

/** apk suffix order: pre-releases sort before the plain version, the rest after. */
const APK_SUFFIX = [
  "alpha",
  "beta",
  "pre",
  "rc",
  "",
  "cvs",
  "svn",
  "git",
  "hg",
  "p",
];

type ApkVersion = {
  numbers: number[];
  letter: string;
  suffixes: [number, number][];
  rel: number;
};

function parseApk(v: string): ApkVersion | null {
  const m = v.match(
    /^(\d+(?:\.\d+)*)([a-z]?)((?:_(?:alpha|beta|pre|rc|cvs|svn|git|hg|p)\d*)*)(?:-r(\d+))?$/,
  );
  if (!m) return null;
  const suffixes: [number, number][] = [];
  for (const s of m[3].split("_").filter(Boolean)) {
    const sm = s.match(/^([a-z]+)(\d*)$/)!;
    suffixes.push([APK_SUFFIX.indexOf(sm[1]), Number(sm[2] || 0)]);
  }
  return {
    numbers: m[1].split(".").map(Number),
    letter: m[2],
    suffixes,
    rel: Number(m[4] ?? 0),
  };
}

/**
 * Alpine version comparison (apk version semantics): the dotted numbers,
 * the letter, the suffixes (_alpha < _beta < _pre < _rc < none < _cvs <
 * _svn < _git < _hg < _p), then -rN. A version apk would not accept falls
 * back to rpm-style segment comparison.
 */
export function compareApkVersions(a: string, b: string): number {
  const va = parseApk(a);
  const vb = parseApk(b);
  if (!va || !vb) return rpmVerCmp(a, b);
  for (let i = 0; i < Math.max(va.numbers.length, vb.numbers.length); i++) {
    const d = (va.numbers[i] ?? -1) - (vb.numbers[i] ?? -1);
    if (d !== 0) return d;
  }
  if (va.letter !== vb.letter) return va.letter < vb.letter ? -1 : 1;
  const none: [number, number] = [APK_SUFFIX.indexOf(""), 0];
  for (let i = 0; i < Math.max(va.suffixes.length, vb.suffixes.length); i++) {
    const [sa, na] = va.suffixes[i] ?? none;
    const [sb, nb] = vb.suffixes[i] ?? none;
    if (sa !== sb) return sa - sb;
    if (na !== nb) return na - nb;
  }
  return va.rel - vb.rel;
}

export type PackageManager = "dpkg" | "rpm" | "apk" | "brew";

/** Compares two versions the way the package manager that installed them does. */
export function comparePackageVersions(
  manager: PackageManager,
  a: string,
  b: string,
): number {
  switch (manager) {
    case "dpkg":
      return compareDebVersions(a, b);
    case "rpm":
      return compareRpmVersions(a, b);
    case "apk":
      return compareApkVersions(a, b);
    default:
      return compareDotted(a, b);
  }
}

/**
 * The upstream release inside a package version: no epoch, no Debian or RPM
 * revision, no Alpine -rN, no Debian +dfsg style suffix.
 */
export function upstreamOf(manager: PackageManager, version: string): string {
  let v = version.replace(/^\d+:/, "");
  if (manager === "dpkg" || manager === "rpm") {
    const dash = v.lastIndexOf("-");
    if (dash >= 0) v = v.slice(0, dash);
  } else if (manager === "apk") {
    v = v.replace(/-r\d+$/, "");
  } else if (manager === "brew") {
    v = v.replace(/_\d+$/, "");
  }
  return v.replace(/[+~].*$/, "");
}
