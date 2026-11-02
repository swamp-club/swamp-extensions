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
export const TRACKER_SNAPSHOT = "2026-11-02T02:50Z";

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
  /** Only an installed version matching this is the vendor's own build. */
  build?: RegExp;
};

/** NodeSource's and Microsoft's packages share these names but not this mark. */
const UBUNTU_BUILD = /ubuntu/;

const UBUNTU_USN = "Ubuntu USN-8956-1";
const UBUNTU_ESM = "Ubuntu USN-8956-2, which needs Ubuntu Pro (ESM)";

function ubuntuBrotli(
  release: string,
  version: string,
  reference: string,
): TrackerEntry {
  return {
    distro: "ubuntu",
    release,
    packages: /^(libbrotli1|python3-brotli)$/,
    status: "fixed",
    version,
    reference,
  };
}

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
    // Neither has a VERSION_ID, and sid reports the testing codename, so the
    // two cannot be told apart. The fix is in sid and has yet to reach forky.
    release: "14|forky|sid",
    packages: /^(libbrotli1|python3-brotli)$/,
    status: "fixed",
    version: "1.2.0-4.1",
    reference: "Debian security tracker, sid",
  },
  {
    distro: "amzn",
    release: "2023",
    packages: /^(libbrotli|brotli)$/,
    status: "fixed",
    version: "1.1.0-1.amzn2023.0.2",
    reference: "Amazon Linux security center, ALAS2023-2026-3334",
  },
  ubuntuBrotli("16.04|xenial", "1.0.3-1ubuntu1~16.04.2+esm1", UBUNTU_ESM),
  ubuntuBrotli("18.04|bionic", "1.0.3-1ubuntu1.3+esm1", UBUNTU_ESM),
  ubuntuBrotli("20.04|focal", "1.0.7-6ubuntu0.1+esm1", UBUNTU_ESM),
  ubuntuBrotli("22.04|jammy", "1.0.9-2ubuntu0.1", UBUNTU_USN),
  ubuntuBrotli("24.04|noble", "1.1.0-2ubuntu0.1", UBUNTU_USN),
  ubuntuBrotli("26.04|resolute", "1.2.0-3ubuntu0.1", UBUNTU_USN),
  ubuntuBrotli("26.10|stonking", "1.2.0-4ubuntu0.1", UBUNTU_USN),
];

export type NodeTrackerEntry = {
  distro: string;
  release: string;
  packages: RegExp;
  /**
   * uses-system-library: the package has no copy of its own, so it takes the
   * brotli library's rating. fixed-upstream: the vendor shipped the upstream
   * fixed release, so the Node.js version decides.
   */
  status:
    | "not-affected"
    | "pending"
    | "no-fix-planned"
    | "uses-system-library"
    | "fixed-upstream";
  reference: string;
  /** Only an installed version matching this is the vendor's own build. */
  build?: RegExp;
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
    status: "fixed-upstream",
    reference: "Amazon Linux security center, ALAS2023-2026-3330",
  },
  {
    distro: "amzn",
    release: "2023",
    packages: /^nodejs(20)?$/,
    status: "no-fix-planned",
    reference: "Amazon Linux security center",
  },
  {
    distro: "ubuntu",
    release: "22.04|24.04|26.04|26.10|jammy|noble|resolute|stonking",
    packages: /^nodejs$/,
    build: UBUNTU_BUILD,
    status: "uses-system-library",
    reference: "Ubuntu CVE tracker",
  },
  {
    distro: "ubuntu",
    // Node.js on focal vendors its own Brotli.
    release: "20.04|focal",
    packages: /^nodejs$/,
    build: UBUNTU_BUILD,
    status: "pending",
    reference: "Ubuntu CVE tracker",
  },
  {
    distro: "ubuntu",
    // Node.js on these releases has no Brotli code at all.
    release: "14.04|16.04|18.04|trusty|xenial|bionic",
    packages: /^nodejs$/,
    build: UBUNTU_BUILD,
    status: "not-affected",
    reference: "Ubuntu CVE tracker",
  },
];

const UBUNTU_DOTNET = "Ubuntu USN-8958-1";

function ubuntuDotnet(
  release: string,
  runtime: "8.0" | "10.0" | "11.0",
  version: string,
): TrackerEntry {
  return {
    distro: "ubuntu",
    release,
    packages: new RegExp(`^dotnet-runtime-${runtime.replace(".", "\\.")}$`),
    status: "fixed",
    version,
    reference: UBUNTU_DOTNET,
    build: UBUNTU_BUILD,
  };
}

/** Distro .NET runtime packages that bundle Brotli: builds at or above version are fixed. */
export const DOTNET_TRACKER: TrackerEntry[] = [
  ubuntuDotnet("22.04|jammy", "8.0", "8.0.33-0ubuntu1~22.04.1"),
  ubuntuDotnet("24.04|noble", "8.0", "8.0.33-0ubuntu1~24.04.1"),
  ubuntuDotnet("24.04|noble", "10.0", "10.0.14-0ubuntu1~24.04.1"),
  ubuntuDotnet("26.04|resolute", "10.0", "10.0.14-0ubuntu1~26.04.1"),
  ubuntuDotnet("26.10|stonking", "10.0", "10.0.14-0ubuntu1~26.10.1"),
  ubuntuDotnet("26.10|stonking", "11.0", "11.0.0~rc3-0ubuntu1~26.10.1"),
];

/** Decoders that cannot reach the bug, reported so their absence is not mistaken for a gap. */
export const NOT_AFFECTED = [
  "Rust brotli-decompressor (so Deno, and swamp, which is built on Deno): returns an error on the bad block switch",
  "Java, JavaScript and C# ports (pdf.js, iText, HtmlUnit): cannot reach the bug",
  "Go andybalholm/brotli: had the same logic error but can only crash; fixed 2026-10-23",
];
