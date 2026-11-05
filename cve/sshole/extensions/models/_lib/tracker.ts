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
 * Distribution fixed-version tracker. Distros backport the *sshole fix without
 * changing OpenSSH's upstream version string, so the `ssh -V` banner cannot
 * tell patched from vulnerable on a distro build. Alpine published the fix as
 * a package release per branch; this maps each branch to its first fixed
 * `openssh` release and compares apk versions against it.
 *
 * Source: Alpine security advisory, 2026-11-05
 * (alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass).
 *
 * @module
 */

/** When the tracker data below was captured. */
export const TRACKER_SNAPSHOT = "2026-11-05";

/** First fixed `openssh` package release per Alpine branch. */
export const ALPINE_FIXED: Record<string, string> = {
  edge: "10.6_p2-r0",
  "3.24": "10.3_p1-r2",
  "3.23": "10.2_p1-r1",
  "3.22": "10.0_p1-r11",
  "3.21": "9.9_p2-r1",
  "3.20": "9.7_p1-r6",
  "3.19": "9.6_p1-r3",
  "3.18": "9.3_p2-r4",
  "3.17": "9.1_p1-r7",
  "3.16": "9.0_p1-r6",
};

type ApkVersion = {
  parts: number[];
  /** The `_pN` suffix (0 when absent). */
  p: number;
  /** The `-rN` release (0 when absent). */
  r: number;
};

/** Parses an apk version like "9.7_p1-r6" or "10.6_p2-r0". */
export function parseApkVersion(text: string): ApkVersion | null {
  const m = text.trim().match(
    /(\d+(?:\.\d+)*)(?:_p(\d+))?(?:-r(\d+))?\s*$/,
  );
  if (!m) return null;
  return {
    parts: m[1].split(".").map(Number),
    p: m[2] ? Number(m[2]) : 0,
    r: m[3] ? Number(m[3]) : 0,
  };
}

/** Negative when a < b, 0 when equal, positive when a > b. */
export function compareApkVersion(a: ApkVersion, b: ApkVersion): number {
  const n = Math.max(a.parts.length, b.parts.length);
  for (let i = 0; i < n; i++) {
    const d = (a.parts[i] ?? 0) - (b.parts[i] ?? 0);
    if (d !== 0) return d;
  }
  if (a.p !== b.p) return a.p - b.p;
  return a.r - b.r;
}

/**
 * An Alpine release to its branch key: VERSION_ID "3.20.10" → "3.20". Edge
 * reports a VERSION_ID like "3.23_alpha20250612" (only PRETTY_NAME says
 * "edge"), so a pre-release suffix or "edge" in either field means edge.
 */
export function alpineBranch(
  versionId: string,
  prettyName = "",
): string | null {
  const v = versionId.trim();
  if (
    v === "" || /edge/i.test(v) || /edge/i.test(prettyName) ||
    /_(alpha|beta|pre|rc|git)/i.test(v)
  ) {
    return "edge";
  }
  const m = v.match(/^(\d+)\.(\d+)/);
  return m ? `${m[1]}.${m[2]}` : null;
}

/** True when two apk versions share the upstream version and _p suffix. */
function sameUpstream(a: ApkVersion, b: ApkVersion): boolean {
  return a.p === b.p && a.parts.length === b.parts.length &&
    a.parts.every((n, i) => n === b.parts[i]);
}

export type DistroVerdict = {
  verdict: "patched" | "vulnerable" | "unknown";
  fixedRelease: string | null;
  detail: string;
};

/**
 * Judges an installed Alpine openssh release against the tracker.
 *
 * A branch's fixed release only says something about builds of the same
 * upstream version: a package pulled from a newer branch or edge (3.20 with
 * 10.0_p1-r0) is not fixed just because it sorts above 9.7_p1-r6. So the
 * installed release is matched by upstream version, not by branch:
 *
 * - at or above the edge release (10.6_p2-r0, upstream fixed) → patched;
 * - the same upstream as a tracker entry → patched from that entry's -rN on;
 * - any other upstream below 10.6p2 → vulnerable (Alpine shipped no fix for it).
 *
 * Returns `unknown` only when the installed release cannot be read.
 */
export function alpineVerdict(
  versionId: string,
  installedRelease: string | null,
  prettyName = "",
): DistroVerdict {
  const branch = alpineBranch(versionId, prettyName);
  const fixedRelease = branch ? ALPINE_FIXED[branch] ?? null : null;
  const where = `Alpine ${branch ?? (versionId || "(unknown)")}`;
  const installed = installedRelease ? parseApkVersion(installedRelease) : null;
  if (!installed) {
    return {
      verdict: "unknown",
      fixedRelease,
      detail: `Could not read the installed openssh release on ${where}${
        fixedRelease ? `; it is fixed in ${fixedRelease}` : ""
      }.`,
    };
  }
  const upstreamFixed = parseApkVersion(ALPINE_FIXED.edge)!;
  if (compareApkVersion(installed, upstreamFixed) >= 0) {
    return {
      verdict: "patched",
      fixedRelease,
      detail:
        `${where} openssh ${installedRelease} is at or past the upstream fix (${ALPINE_FIXED.edge}).`,
    };
  }
  const match = Object.entries(ALPINE_FIXED).find(([, rel]) =>
    sameUpstream(installed, parseApkVersion(rel)!)
  );
  if (match) {
    const [matchBranch, rel] = match;
    const patched = compareApkVersion(installed, parseApkVersion(rel)!) >= 0;
    return {
      verdict: patched ? "patched" : "vulnerable",
      fixedRelease: fixedRelease ?? rel,
      detail: patched
        ? `${where} openssh ${installedRelease} includes the fix (≥ ${rel}, Alpine ${matchBranch}).`
        : `${where} openssh ${installedRelease} is below the fixed release ${rel} (Alpine ${matchBranch}).`,
    };
  }
  return {
    verdict: "vulnerable",
    fixedRelease,
    detail:
      `${where} openssh ${installedRelease} is below ${ALPINE_FIXED.edge} and no Alpine release of that upstream version carries the fix.`,
  };
}
