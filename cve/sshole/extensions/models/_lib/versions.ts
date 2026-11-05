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
 * Parsing and comparing OpenSSH portable version strings for the *sshole
 * password-bypass. The bypass is fixed in OpenSSH 10.6p2 (portable); any
 * earlier portable release built against musl libc without PAM is exposed.
 *
 * @module
 */

/** First OpenSSH portable release that rejects a stored hash shorter than 4
 * characters, closing the *sshole bypass. */
export const FIXED_VERSION = { major: 10, minor: 6, portable: 2 } as const;
export const FIXED_VERSION_STR = "10.6p2";

export type OpenSshVersion = {
  major: number;
  minor: number;
  /** Portable patch level: the N in "pN"; 0 for a bare upstream version. */
  portable: number;
  /** The raw version text the number was parsed from. */
  raw: string;
};

/**
 * Parses an OpenSSH version out of free text: the `ssh -V` banner
 * ("OpenSSH_10.6p1, OpenSSL ..."), an Alpine apk version ("10.6_p2-r0"),
 * or a bare "10.6p1". Returns null when no OpenSSH version is present.
 */
export function parseOpenSshVersion(text: string): OpenSshVersion | null {
  if (!text) return null;
  // Banner form: OpenSSH_<maj>.<min>[p<portable>]
  const banner = text.match(/OpenSSH_(\d+)\.(\d+)(?:p(\d+))?/i);
  if (banner) {
    return {
      major: Number(banner[1]),
      minor: Number(banner[2]),
      portable: banner[3] ? Number(banner[3]) : 0,
      raw: banner[0],
    };
  }
  // Package form: <maj>.<min>[_p<portable>] (apk uses "_p", some use "p").
  const pkg = text.match(/\b(\d+)\.(\d+)(?:_?p(\d+))?\b/);
  if (pkg) {
    return {
      major: Number(pkg[1]),
      minor: Number(pkg[2]),
      portable: pkg[3] ? Number(pkg[3]) : 0,
      raw: pkg[0],
    };
  }
  return null;
}

/** Negative when a is older than b, 0 when equal, positive when newer. */
export function compareOpenSsh(a: OpenSshVersion, b: {
  major: number;
  minor: number;
  portable: number;
}): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.portable - b.portable;
}

/** True when the version still carries the bypass (older than 10.6p2). */
export function isVulnerableVersion(v: OpenSshVersion): boolean {
  return compareOpenSsh(v, FIXED_VERSION) < 0;
}
