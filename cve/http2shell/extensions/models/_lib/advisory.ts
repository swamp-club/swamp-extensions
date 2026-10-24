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
 * Advisory data for CVE-2026-111497, the Brotli decoder out-of-bounds write
 * (Node2Shell / HTTP2Shell). Every fixed version here comes from a vendor
 * advisory or tracker; anything they do not cover is judged check-vendor.
 *
 * @module
 */

export const ADVISORY = {
  cve: "CVE-2026-111497",
  published: "2026-10-21",
  cvss: "9.2 (CVSS 4.0)",
  ghsa: ["GHSA-9v8h-qqgm-4m35", "GHSA-3wvj-j6qm-62mr"],
  upstreamCommit: "0ed4268",
  title: "Brotli decoder out-of-bounds write on a malformed block switch",
};

/**
 * Upstream Brotli: 1.0.3 through 1.2.0 are affected; each release line got
 * a fixed release. Keys are "major.minor".
 */
export const BROTLI_FIRST_AFFECTED = "1.0.3";
export const BROTLI_FIXED: Record<string, string> = {
  "1.0": "1.0.10",
  "1.1": "1.1.1",
  "1.2": "1.2.1",
};

/** Node.js release lines with a fix; every other line is end of life. */
export const NODE_FIXED: Record<string, string> = {
  "22": "22.23.4",
  "24": "24.22.1",
  "26": "26.12.1",
};
/** The newest line in NODE_FIXED; later lines shipped after the fix. */
export const NODE_NEWEST_FIXED_LINE = 26;

export const BUN_FIXED = "1.4.4";

/** PyPI packages that bundle the C decoder. */
export const PYTHON_FIXED: Record<string, string> = {
  brotli: "1.2.1",
  brotlicffi: "1.2.1.0",
};

/** Python HTTP clients that decode Brotli by themselves once it is installed. */
export const PYTHON_AUTO_DECODERS = [
  "urllib3",
  "requests",
  "aiohttp",
  "httpx",
  "scrapy",
];

/** The oldest Envoy line still supported; older fixed lines are not recommended. */
export const ENVOY_FIRST_SUPPORTED = "1.37";

/** Envoy lines with a fix (1.36 is out of support but was patched). */
export const ENVOY_FIXED: Record<string, string> = {
  "1.36": "1.36.12",
  "1.37": "1.37.8",
  "1.38": "1.38.6",
  "1.39": "1.39.3",
  "1.40": "1.40.0",
};

/** The oldest Istio line still supported. */
export const ISTIO_FIRST_SUPPORTED = "1.30";

/** Istio lines with a fix (1.29 is end of life but was patched). */
export const ISTIO_FIXED: Record<string, string> = {
  "1.29": "1.29.9",
  "1.30": "1.30.6",
  "1.31": "1.31.2",
};

export const RUBY_GEM_FIXED = "0.9.1";

/**
 * Express and body-parser inflate Brotli request bodies from these versions
 * on (5.0.0 to 5.3.0 and 2.0.0 to 2.3.0 were tested; later ones still do).
 */
export const INBOUND_MIDDLEWARE: Record<string, string> = {
  express: "5.0.0",
  "body-parser": "2.0.0",
};

/** When the tracker entries below were read. */
export const TRACKER_SNAPSHOT = "2026-10-24T18:00Z";

/** When the advisory went out; package lists refreshed earlier cannot know the fix. */
export const ADVISORY_PUBLISHED_AT = "2026-10-21T00:00:00Z";

export type TrackerEntry = {
  distro: string;
  /** "|"-separated VERSION_ID values or codenames. */
  release: string;
  /** Matches the installed binary package name. */
  packages: RegExp;
  /** fixed: builds at or above version are fixed. pending: version and older are known vulnerable with no fix yet. */
  status: "fixed" | "pending";
  version: string | null;
  reference: string;
};

/**
 * Distro brotli library builds from the security trackers. A build the
 * tracker marks fixed is patched; a build at or below a pending entry is
 * vulnerable; any other build below the upstream fix is check-vendor.
 */
export const LIBBROTLI_TRACKER: TrackerEntry[] = [
  {
    distro: "debian",
    release: "12",
    packages: /^(libbrotli1|python3-brotli)$/,
    status: "fixed",
    version: "1.0.9-2+deb12u1",
    reference: "Debian security tracker, bookworm-security",
  },
  {
    distro: "debian",
    release: "13",
    packages: /^(libbrotli1|python3-brotli)$/,
    status: "fixed",
    version: "1.1.0-2+deb13u1",
    reference: "Debian security tracker, trixie-security",
  },
  {
    distro: "debian",
    // Testing and unstable have no VERSION_ID, only a codename.
    release: "14|forky|sid",
    packages: /^(libbrotli1|python3-brotli)$/,
    status: "pending",
    version: "1.2.0-4",
    reference: "Debian security tracker (forky, sid)",
  },
  {
    distro: "amzn",
    release: "2023",
    packages: /^(libbrotli|brotli)$/,
    status: "pending",
    version: null,
    reference: "Amazon Linux security center: pending fix",
  },
];

export type NodeTrackerEntry = {
  distro: string;
  release: string;
  packages: RegExp;
  status: "not-affected" | "pending" | "no-fix-planned";
  reference: string;
};

/** Distro Node.js packages whose status the vendor published. */
export const NODE_TRACKER: NodeTrackerEntry[] = [
  {
    distro: "amzn",
    release: "2023",
    packages: /^nodejs22$/,
    status: "not-affected",
    reference: "Amazon Linux security center",
  },
  {
    distro: "amzn",
    release: "2023",
    packages: /^nodejs24$/,
    status: "pending",
    reference: "Amazon Linux security center",
  },
  {
    distro: "amzn",
    release: "2023",
    packages: /^nodejs(20)?$/,
    status: "no-fix-planned",
    reference: "Amazon Linux security center",
  },
];

/** Decoders that cannot reach the bug, reported so their absence is not mistaken for a gap. */
export const NOT_AFFECTED = [
  "Rust brotli-decompressor (so Deno, and swamp, which is built on Deno): returns an error on the bad block switch",
  "Java, JavaScript and C# ports (pdf.js, iText, HtmlUnit): cannot reach the bug",
  "Go andybalholm/brotli: had the same logic error but can only crash; fixed 2026-10-23",
];
