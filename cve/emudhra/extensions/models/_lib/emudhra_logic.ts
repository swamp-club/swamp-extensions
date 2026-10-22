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
 * Pure logic for the eMudhra scanner: the probe script sent to each target,
 * the parser for its output, the verdicts, and the mitigation planner. Nothing
 * here runs a process, so all of it is unit tested.
 *
 * @module
 */

import {
  AAA_ROOT,
  COMPROMISED_CERTS,
  DATA_AS_OF,
  DENO_FIXED_VERSION,
  DISTRUST_ANCHOR,
  EMSIGN_TLS_G3_CROSS,
  EMSIGN_TLS_ROOT,
  FIXED_AGENTS,
  FIXED_CA_CERTIFICATES,
  FIXED_ELECTRON,
  FIXED_LIBRARIES,
  FIXED_RUNTIMES,
  NO_FIX_HEX_PACKAGES,
  NO_FIX_RUNTIMES,
  SWAMP_FIXED_VERSION,
  TEST_HOSTS,
} from "./emudhra_certs.ts";
import { readKeystore } from "./keystore.ts";
import {
  base64ToBytes,
  matchStore,
  parseBlockedCerts,
  pemCertificates,
  type StoreMatch,
} from "./x509.ts";

// ---------------------------------------------------------------------------
// Shell quoting
// ---------------------------------------------------------------------------

/** Quote a value for POSIX sh so it is always a single literal word. */
export function shQuote(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

/**
 * Reject an SSH user or host that ssh could read as an option (a leading `-`)
 * or that contains anything outside a conservative character set. Throws with
 * the offending value.
 */
export function assertSafeSshTarget(user: string, host: string): void {
  const checks: [string, string, RegExp][] = [
    ["sshUser", user, /^[A-Za-z0-9._][A-Za-z0-9._-]*$/],
    ["host", host, /^[A-Za-z0-9.:[\]_%][A-Za-z0-9.:[\]_%-]*$/],
  ];
  for (const [label, value, pattern] of checks) {
    if (!pattern.test(value)) {
      throw new Error(`Refusing unsafe ${label} ${JSON.stringify(value)}`);
    }
  }
}

/**
 * Wrap a script so sh reads all of it before running anything, so no command
 * it starts can consume the rest of stdin. The function's status is the
 * script's last command, so failures still reach the caller. LC_ALL=C keeps
 * sudo, apt, dnf and apk in English, which the output matchers expect; ssh
 * forwards the caller's locale by default.
 */
export function wrapScript(script: string): string {
  return `LC_ALL=C; export LC_ALL\nemudhra_main() {\n${script}\n}\nemudhra_main </dev/null\n`;
}

/** Reject a Docker container or image reference docker could read as an option. */
export function assertSafeDockerRef(label: string, value: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/:@-]*$/.test(value)) {
    throw new Error(`Refusing unsafe ${label} ${JSON.stringify(value)}`);
  }
}

/**
 * Validate `searchPaths` entries: absolute paths only, so `find` can never read
 * one as an option (a `-delete` entry would otherwise change the target).
 */
export function assertSafeSearchPaths(paths: string[]): void {
  for (const p of paths) {
    if (!p.startsWith("/") || /[\n\r]/.test(p)) {
      throw new Error(
        `Refusing searchPaths entry ${JSON.stringify(p)}: use absolute paths`,
      );
    }
  }
}

/**
 * Like Promise.allSettled over items.map(fn), but with at most `limit` calls
 * running at once, so a large fleet doesn't open every SSH session together.
 */
export async function settledPool<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<PromiseSettledResult<R>[]> {
  const out: PromiseSettledResult<R>[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      try {
        out[i] = { status: "fulfilled", value: await fn(items[i]) };
      } catch (reason) {
        out[i] = { status: "rejected", reason };
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  );
  return out;
}

/** Split a comma-separated input into trimmed, non-empty entries. */
export function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return [
    ...new Set(
      value.split(",").map((v) => v.trim()).filter((v) => v.length > 0),
    ),
  ];
}

// ---------------------------------------------------------------------------
// Version comparison
// ---------------------------------------------------------------------------

function debOrder(c: string): number {
  if (c === "~") return -1;
  if (c === "") return 0;
  if (/[A-Za-z]/.test(c)) return c.charCodeAt(0);
  return c.charCodeAt(0) + 256;
}

function debCompareFragment(a: string, b: string): number {
  let i = 0;
  let j = 0;
  while (i < a.length || j < b.length) {
    let firstDiff = 0;
    while (
      (i < a.length && !/[0-9]/.test(a[i])) ||
      (j < b.length && !/[0-9]/.test(b[j]))
    ) {
      const ac = i < a.length && !/[0-9]/.test(a[i]) ? a[i] : "";
      const bc = j < b.length && !/[0-9]/.test(b[j]) ? b[j] : "";
      const d = debOrder(ac) - debOrder(bc);
      if (d !== 0) return d;
      if (ac !== "") i++;
      if (bc !== "") j++;
    }
    while (a[i] === "0") i++;
    while (b[j] === "0") j++;
    while (
      i < a.length && /[0-9]/.test(a[i]) && j < b.length && /[0-9]/.test(b[j])
    ) {
      if (!firstDiff) firstDiff = a.charCodeAt(i) - b.charCodeAt(j);
      i++;
      j++;
    }
    if (i < a.length && /[0-9]/.test(a[i])) return 1;
    if (j < b.length && /[0-9]/.test(b[j])) return -1;
    if (firstDiff) return firstDiff;
  }
  return 0;
}

/** Compare two Debian package versions (epoch:upstream-revision), as dpkg does. */
export function compareDebVersions(a: string, b: string): number {
  const split = (v: string) => {
    const colon = v.indexOf(":");
    const epoch = colon >= 0 ? parseInt(v.slice(0, colon), 10) || 0 : 0;
    const rest = colon >= 0 ? v.slice(colon + 1) : v;
    const dash = rest.lastIndexOf("-");
    return dash >= 0
      ? { epoch, upstream: rest.slice(0, dash), revision: rest.slice(dash + 1) }
      : { epoch, upstream: rest, revision: "" };
  };
  const va = split(a);
  const vb = split(b);
  if (va.epoch !== vb.epoch) return va.epoch - vb.epoch;
  const u = debCompareFragment(va.upstream, vb.upstream);
  if (u !== 0) return u;
  return debCompareFragment(va.revision, vb.revision);
}

/**
 * Compare dotted versions segment by segment (numeric where both are numbers).
 * Good enough for semver, CalVer, rpm VERSION-RELEASE and apk -rN strings.
 */
export function compareDottedVersions(a: string, b: string): number {
  // Split letters from digits both ways, so apk's r10 sorts after r3 and
  // 1.27rc1 reads as a pre-release of 1.27, not as newer than 1.27.3.
  const parts = (v: string) =>
    v.replace(/^v/, "").replace(/([A-Za-z])(\d)/g, "$1.$2").replace(
      /(\d)([A-Za-z])/g,
      "$1.$2",
    ).split(
      /[^0-9A-Za-z]+/,
    ).filter((s) => s !== "");
  const pa = parts(a);
  const pb = parts(b);
  const n = Math.max(pa.length, pb.length);
  for (let i = 0; i < n; i++) {
    const x = pa[i];
    const y = pb[i];
    // A missing trailing zero is equal (20261021.223953 vs ...223953.0);
    // any other extra segment, swamp's -sha.<hash> included, is newer.
    // A pre-release tag after an equal prefix (2026.10.2rc1 vs 2026.10.2)
    // is older. Other trailing segments (swamp's -sha.<hash>, apk's -r10)
    // are newer.
    // Not a bare a or b: OpenSSL-style 1.0.2a is a later release.
    const pre = /^(rc|alpha|beta|pre|dev|preview|canary|nightly)$/i;
    if (x === undefined) {
      return pb.slice(i).every((p) => p === "0") ? 0 : pre.test(pb[i]) ? 1 : -1;
    }
    if (y === undefined) {
      return pa.slice(i).every((p) => p === "0") ? 0 : pre.test(pa[i]) ? -1 : 1;
    }
    const nx = /^\d+$/.test(x);
    const ny = /^\d+$/.test(y);
    if (nx && ny) {
      const d = parseInt(x, 10) - parseInt(y, 10);
      if (d !== 0) return d;
    } else if (nx !== ny) {
      // A tag against a number (1.27rc1 vs 1.27.3) is a pre-release: older.
      return nx ? 1 : -1;
    } else if (x !== y) {
      return x < y ? -1 : 1;
    }
  }
  return 0;
}

/**
 * Whether a version is fixed, given fixed releases on several branches. The
 * branch is the first `branchDepth` segments. An unlisted branch older than
 * every fixed release is exposed; one newer than all of them is fixed.
 */
export function isFixedOnBranches(
  version: string,
  fixed: readonly string[],
  branchDepth: number,
): boolean {
  const branch = (v: string) =>
    v.replace(/^v/, "").split(".").slice(0, branchDepth).join(".");
  const same = fixed.find((f) => branch(f) === branch(version));
  if (same) return compareDottedVersions(version, same) >= 0;
  return fixed.every((f) => compareDottedVersions(version, f) > 0);
}

// ---------------------------------------------------------------------------
// Probe script
// ---------------------------------------------------------------------------

const TOOLS = [
  "apt-get",
  "dnf",
  "yum",
  "apk",
  "pacman",
  "install",
  "update-ca-certificates",
  "update-ca-trust",
  "systemctl",
  "sudo",
  "openssl",
  "keytool",
  "curl",
];

const BUNDLE_CANDIDATES = [
  "/etc/ssl/certs/ca-certificates.crt",
  "/etc/pki/tls/certs/ca-bundle.crt",
  "/etc/ssl/cert.pem",
  "/etc/ssl/ca-bundle.pem",
];

/**
 * Largest store file sent back, most distinct files, and most bytes in all
 * per probe. The total keeps a host with many JDKs or Python environments to
 * a few hundred read-back sessions from a Windows controller.
 */
export const STORE_MAX_BYTES = 4 * 1024 * 1024;
export const STORE_MAX_BLOBS = 64;
export const STORE_MAX_TOTAL = 16 * 1024 * 1024;

/**
 * sh helpers for the stores section. emudhra_store prints `kind|sha256|extra|path`
 * (the path last, so a `|` in it survives), then the file as one base64 line
 * the first time its hash is seen, or TOOBIG past the limits.
 */
const STORE_FUNCTIONS = [
  'emudhra_sha() { if command -v sha256sum >/dev/null 2>&1; then sha256sum < "$1" | cut -c1-64; elif command -v shasum >/dev/null 2>&1; then shasum -a 256 < "$1" | cut -c1-64; elif command -v openssl >/dev/null 2>&1; then openssl dgst -sha256 < "$1" | sed "s/.*= *//"; fi 2>/dev/null; }',
  'emudhra_b64() { if command -v base64 >/dev/null 2>&1; then base64 < "$1" | tr -d "\\r\\n"; elif command -v openssl >/dev/null 2>&1; then openssl base64 -A < "$1"; fi 2>/dev/null; }',
  'emudhra_seen=" "; emudhra_blobs=0; emudhra_total=0',
  `emudhra_store() { [ -f "$3" ] && [ -r "$3" ] || return 0; h=$(emudhra_sha "$3"); [ -n "$h" ] || { echo "$1|-|$2|$3"; return 0; }; echo "$1|$h|$2|$3"; case "$emudhra_seen" in *" $h "*) return 0;; esac; emudhra_seen="$emudhra_seen$h "; n=$(wc -c < "$3" 2>/dev/null | tr -d " "); if [ "\${n:-0}" -gt ${STORE_MAX_BYTES} ] || [ "$emudhra_blobs" -ge ${STORE_MAX_BLOBS} ] || [ $((emudhra_total + \${n:-0})) -gt ${STORE_MAX_TOTAL} ]; then echo "blob $h TOOBIG"; return 0; fi; emudhra_blobs=$((emudhra_blobs + 1)); emudhra_total=$((emudhra_total + \${n:-0})); echo "blob $h $(emudhra_b64 "$3")"; }`,
];

/**
 * Java trust stores: JDK homes first (so a home's blocked.certs goes with its
 * cacerts), up to two levels under the usual install roots, including the
 * runtimes apps bundle in jbr or jre, then the distribution's own stores.
 */
const JAVA_STORE_GLOBS = [
  "/usr/lib/jvm/*/lib/security/cacerts",
  "/usr/lib/jvm/*/jre/lib/security/cacerts",
  "/opt/*/lib/security/cacerts",
  "/opt/*/*/lib/security/cacerts",
  "/opt/*/jbr/lib/security/cacerts",
  "/opt/*/jre/lib/security/cacerts",
  "/usr/local/*/lib/security/cacerts",
  "/Library/Java/JavaVirtualMachines/*/Contents/Home/lib/security/cacerts",
  "/Library/Java/JavaVirtualMachines/*/Contents/Home/jre/lib/security/cacerts",
  '"$HOME"/Library/Java/JavaVirtualMachines/*/Contents/Home/lib/security/cacerts',
  "/Applications/*.app/Contents/jbr/Contents/Home/lib/security/cacerts",
  "/Applications/*.app/Contents/jre/Contents/Home/lib/security/cacerts",
];
const DISTRO_JAVA_STORES = [
  "/etc/ssl/certs/java/cacerts",
  "/etc/pki/ca-trust/extracted/java/cacerts",
  "/etc/pki/java/cacerts",
  "/var/lib/ca-certificates/java-cacerts",
];

/** CA bundles macOS tools read instead of the keychain. */
const MACOS_BUNDLES = [
  "/etc/ssl/cert.pem",
  "/opt/homebrew/etc/ca-certificates/cert.pem",
  "/usr/local/etc/ca-certificates/cert.pem",
  "/opt/homebrew/etc/openssl@3/cert.pem",
  "/usr/local/etc/openssl@3/cert.pem",
];

/**
 * macOS: ask the Security framework about each of the 16 intermediates,
 * which applies Apple's block list and the admin trust settings. The basic
 * policy, because a CA certificate can't be checked against the TLS or
 * code-signing policy without a leaf; -L keeps it offline. The certificates
 * go through a private temporary directory, removed when the section ends.
 * Lines use the same vocabulary as the Windows probe: OK, rejected <why>, or
 * error <why>. Only security's own not-trusted and revoked results count as
 * rejections; any other failure (trustd, the session) is an error, so a host
 * security could not judge reads unknown, never clean.
 */
function macosVerify(): string[] {
  const out = [
    'if [ "$emudhra_os" = Darwin ] && command -v security >/dev/null 2>&1 && emudhra_d=$(mktemp -d "${TMPDIR:-/tmp}/emudhra.XXXXXX"); then',
    // Also removed if the probe is stopped partway.
    "trap 'rm -rf \"$emudhra_d\"' EXIT",
    "trap 'rm -rf \"$emudhra_d\"; exit 129' HUP INT TERM",
    `printf '%s\n' ${
      shQuote(EMSIGN_TLS_G3_CROSS.pem)
    } > "$emudhra_d/cross.pem"`,
    'emudhra_mv() { r=$(security verify-cert "$@" -l -L -p basic -v 2>&1); c=$?; if [ $c -eq 0 ]; then echo OK; elif echo "$r" | grep -qiE "certificate is revoked|CERT_REVOKED"; then echo "rejected revoked"; elif echo "$r" | grep -qiE "certificate is not trusted|unable to build chain to root|CreateChainFailed|TP_NOT_TRUSTED"; then echo "rejected untrusted"; else echo "error $(echo "$r" | grep -v "^ *$" | head -1 | tr -cd "[:alnum:] _.:-" | cut -c1-80)"; fi; }',
  ];
  for (const cert of COMPROMISED_CERTS) {
    const id = cert.sha256.slice(0, 16);
    out.push(
      `printf '%s\n' ${
        shQuote(cert.pem)
      } > "$emudhra_d/${id}.pem"; echo "${id} $(emudhra_mv -c "$emudhra_d/${id}.pem"${
        cert.path === "emsign" && cert.usage === "tls"
          ? ' -c "$emudhra_d/cross.pem"'
          : ""
      })"`,
    );
  }
  out.push('rm -rf "$emudhra_d"', "fi");
  return out;
}

/** Where Linux installs Electron apps. */
const ELECTRON_ROOTS = ["/opt", "/usr/lib", "/usr/share"];

/** A root mitigate can distrust. */
export type DistrustRoot = {
  name: string;
  sha256: string;
  debianConfEntry: string;
  pem: string;
};

/** A line of a root's base64 body, present in any bundle that includes it. */
export function anchorMarker(root: DistrustRoot = DISTRUST_ANCHOR): string {
  const lines = root.pem.split("\n").filter((l) => !l.startsWith("-----"));
  return lines[Math.min(3, lines.length - 1)];
}

/** p11-kit blocklist file name mitigate writes for a root. */
export function p11kitBlocklistFile(root: DistrustRoot): string {
  return `swamp-emudhra-${root.name.replace(/[^A-Za-z0-9]+/g, "-")}.pem`;
}

/**
 * Build the POSIX sh probe. It is read-only: certificates reach openssl through
 * here-documents on file descriptors, never through files on the target.
 */
export function buildProbeScript(opts: {
  searchPaths: string[];
  liveCheck: boolean;
}): string {
  assertSafeSearchPaths(opts.searchPaths);
  const s: string[] = [];
  const section = (name: string) => s.push(`echo '@@ ${name}'`);
  s.push(
    // System directories first, so a privileged step never runs a binary the
    // login user could have planted earlier in their PATH.
    "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH",
  );
  // One probe serves Linux and macOS; macOS sections branch on this.
  s.push("emudhra_os=$(uname -s 2>/dev/null)");
  section("id");
  s.push(
    'echo "uid=$(id -u 2>/dev/null)"; echo "host=$(hostname 2>/dev/null || cat /etc/hostname 2>/dev/null)"',
  );
  section("os-release");
  s.push(
    'if [ "$emudhra_os" = Darwin ]; then v=$(sw_vers -productVersion 2>/dev/null); echo "ID=macos"; echo "VERSION_ID=$v"; echo "PRETTY_NAME=\\"macOS $v\\""; else cat /etc/os-release 2>/dev/null; fi',
  );
  section("tools");
  s.push(
    `for t in ${
      TOOLS.join(" ")
    }; do p=$(command -v "$t" 2>/dev/null) && echo "$t $p"; done`,
  );
  section("packages");
  s.push(
    'if command -v dpkg-query >/dev/null 2>&1; then for p in ca-certificates ca-certificates-java cloudflared cloudflare-warp; do v=$(dpkg-query -W -f=\'${Version}\' "$p" 2>/dev/null) && [ -n "$v" ] && echo "$p $v"; done; fi',
  );
  s.push(
    "if command -v rpm >/dev/null 2>&1; then for p in ca-certificates cloudflared cloudflare-warp; do v=$(rpm -q --qf '%{VERSION}-%{RELEASE}' \"$p\" 2>/dev/null) && echo \"$p $v\"; done | grep -v 'not installed'; fi",
  );
  s.push(
    "if command -v apk >/dev/null 2>&1; then apk info -v 2>/dev/null | sed -n 's/^ca-certificates\\(-bundle\\)\\{0,1\\}-\\([0-9].*\\)$/ca-certificates\\1 \\2/p'; fi",
  );
  s.push(
    "if command -v pacman >/dev/null 2>&1; then pacman -Q ca-certificates-mozilla 2>/dev/null | sed 's/^ca-certificates-mozilla /ca-certificates /'; fi",
  );
  section("bundle");
  s.push(
    `for b in ${
      BUNDLE_CANDIDATES.join(" ")
    }; do [ "$emudhra_os" != Darwin ] && [ -r "$b" ] && { echo "$b"; break; }; done`,
  );
  section("anchor");
  s.push(
    `[ "$emudhra_os" = Darwin ] || for b in ${
      BUNDLE_CANDIDATES.join(" ")
    }; do [ -r "$b" ] && grep -qF ${
      shQuote(anchorMarker())
    } "$b" && echo "$b"; done`,
  );
  // AAA too, so the no-openssl fallback can see the AAA path.
  s.push(
    `[ "$emudhra_os" = Darwin ] || for b in ${
      BUNDLE_CANDIDATES.join(" ")
    }; do [ -r "$b" ] && grep -qF ${
      shQuote(anchorMarker(AAA_ROOT))
    } "$b" && echo "aaa $b"; done`,
  );
  section("ca-certificates-conf");
  s.push(
    `grep -E ${
      shQuote(
        `^!?(${DISTRUST_ANCHOR.debianConfEntry}|${AAA_ROOT.debianConfEntry})$`,
      )
    } /etc/ca-certificates.conf 2>/dev/null`,
  );
  // Older p11-kit layouts (RHEL 7, Amazon Linux 2) use "blacklist"; Arch
  // keeps its trust sources under /etc/ca-certificates.
  section("p11-kit-blocklist");
  s.push(
    "ls /etc/pki/ca-trust/source/blocklist/ /etc/pki/ca-trust/source/blacklist/ /etc/ca-certificates/trust-source/blocklist/ 2>/dev/null | grep -v -e '^/' -e '^$'",
  );
  section("p11-kit-dir");
  s.push(
    "for d in /etc/pki/ca-trust/source/blocklist /etc/pki/ca-trust/source/blacklist /etc/ca-certificates/trust-source/blocklist; do [ -d $d ] && echo $d && break; done",
  );
  // Admin-domain trust settings: deny entries mitigate added, or anyone else.
  section("macos-trust");
  s.push(
    '[ "$emudhra_os" = Darwin ] && security dump-trust-settings -d 2>/dev/null',
  );
  section("verify");
  s.push(
    `B=''; for b in ${
      BUNDLE_CANDIDATES.join(" ")
    }; do [ -r "$b" ] && { B="$b"; break; }; done`,
  );
  s.push(...macosVerify());
  s.push(
    `if [ "$emudhra_os" != Darwin ] && [ -n "$B" ] && command -v openssl >/dev/null 2>&1; then`,
  );
  for (const cert of COMPROMISED_CERTS) {
    const id = cert.sha256.slice(0, 16);
    if (cert.path === "emsign" && cert.usage === "tls") {
      s.push(
        `r=$(openssl verify -CAfile "$B" -untrusted /dev/fd/3 /dev/fd/4 2>&1 3<<'EMUDHRA_CROSS' 4<<'EMUDHRA_CERT'\n${EMSIGN_TLS_G3_CROSS.pem}\nEMUDHRA_CROSS\n${cert.pem}\nEMUDHRA_CERT\n); echo "${id} $(echo "$r" | grep -Eo 'OK$|error [0-9]+' | head -1)"`,
      );
    } else if (cert.path === "aaa") {
      s.push(
        `r=$(openssl verify -CAfile "$B" /dev/fd/4 2>&1 4<<'EMUDHRA_CERT'\n${cert.pem}\nEMUDHRA_CERT\n); echo "${id} $(echo "$r" | grep -Eo 'OK$|error [0-9]+' | head -1)"`,
      );
    }
  }
  s.push("fi");
  section("stores");
  // Non-OS bundles and Java trust stores go back whole, one base64 blob per
  // distinct file, and are matched on the controller by public key. A Java
  // store is listed once per blocked.certs that uses it: Debian links every
  // JDK's cacerts to one file, but each JDK has its own blocklist. Lists are
  // read through here-documents, not pipes, so the seen set survives.
  s.push(...STORE_FUNCTIONS);
  // Without openssl, the OS bundle itself is judged by public key. It goes
  // first, so the store limits can never crowd it out.
  s.push(
    `if [ "$emudhra_os" != Darwin ] && ! command -v openssl >/dev/null 2>&1; then for b in ${
      BUNDLE_CANDIDATES.join(" ")
    }; do [ -r "$b" ] && { emudhra_store os-bundle "" "$b"; break; }; done; fi`,
  );
  s.push(
    `emudhra_list=$(for f in ${
      JAVA_STORE_GLOBS.join(" ")
    } ${"$"}{JAVA_HOME:+"$JAVA_HOME/lib/security/cacerts" "$JAVA_HOME/jre/lib/security/cacerts"} ${
      DISTRO_JAVA_STORES.join(" ")
    }; do [ -f "$f" ] && echo "$f"; done)`,
  );
  s.push(
    'jseen="|"; while IFS= read -r f; do [ -n "$f" ] || continue; r=$(readlink -f "$f" 2>/dev/null || echo "$f"); b="${f%/cacerts}/blocked.certs"; bh=-; if [ -f "$b" ]; then bh=$(emudhra_sha "$b"); [ -n "$bh" ] || bh=-; fi; case "$jseen" in *"|$r:$bh|"*) continue;; esac; jseen="$jseen$r:$bh|"; [ "$bh" != - ] && emudhra_store java-blocked "" "$b"; emudhra_store java "$bh" "$f"; done <<EMUDHRA_LIST\n$emudhra_list\nEMUDHRA_LIST',
  );
  const certifiRoots = [
    "/usr/lib/python3*/site-packages",
    "/usr/lib/python3*/dist-packages",
    "/usr/local/lib/python3*/site-packages",
    "/usr/local/lib/python3*/dist-packages",
    "/usr/lib/python3/dist-packages",
    "/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework",
    "/Library/Frameworks/Python.framework",
    "/opt/homebrew/lib/python3*/site-packages",
  ];
  s.push(
    `emudhra_list=$(for d in ${certifiRoots.join(" ")} ${
      opts.searchPaths.map(shQuote).join(" ")
    }; do [ -d "$d" ] || continue; find "$d" -maxdepth 9 -path '*certifi/cacert.pem' 2>/dev/null | head -50; done | sort -u)`,
  );
  s.push(
    `while IFS= read -r f; do [ -n "$f" ] || continue; case "$f" in */pip/_vendor/certifi/cacert.pem) emudhra_store pip "" "$f";; *) v=$(ls -d "$(dirname "$(dirname "$f")")"/certifi-*.dist-info 2>/dev/null | head -1 | sed 's/.*certifi-\\(.*\\)\\.dist-info/\\1/'); emudhra_store certifi "$v" "$f";; esac; done <<EMUDHRA_LIST\n$emudhra_list\nEMUDHRA_LIST`,
  );
  // macOS: the system LibreSSL bundle and Homebrew's, which curl, git and
  // Homebrew's own tools read instead of the keychain.
  s.push(
    `if [ "$emudhra_os" = Darwin ]; then for b in ${
      MACOS_BUNDLES.join(" ")
    }; do emudhra_store bundle "" "$b"; done; fi`,
  );
  section("cargo");
  if (opts.searchPaths.length > 0) {
    s.push(
      `for d in ${
        opts.searchPaths.map(shQuote).join(" ")
      }; do [ -d "$d" ] && find "$d" -maxdepth 6 -name Cargo.lock 2>/dev/null; done | head -200 | while read -r f; do awk -v f="$f" '/^name = /{gsub(/"/,"",$3); n=$3} /^version = /{gsub(/"/,"",$3); if (n=="webpki-roots"||n=="rustls-webpki") print f"|"n"|"$3}' "$f"; done`,
    );
  }
  section("hex");
  if (opts.searchPaths.length > 0) {
    s.push(
      `for d in ${
        opts.searchPaths.map(shQuote).join(" ")
      }; do [ -d "$d" ] && find "$d" -maxdepth 6 \\( -name mix.lock -o -name rebar.lock \\) 2>/dev/null; done | head -200 | while read -r f; do { sed -nE 's/^ *"(certifi|castore|tls_certificate_check)": \\{:hex, :[a-z_]+, "([^"]+)".*/\\1|\\2/p' "$f"; grep -oE '\\{<<"(certifi|castore|tls_certificate_check)">>,\\{pkg,<<"[a-z_]+">>,<<"[^"]+">>' "$f" | sed -E 's/^\\{<<"([a-z_]+)">>.*<<"([^"]+)">>$/\\1|\\2/'; } | awk -v f="$f" '{print f "|" $0}'; done`,
    );
  }
  section("runtimes");
  // Every distinct copy on PATH (by resolved path): the system-first PATH
  // above must not hide a user's own runtime, nor the reverse.
  s.push(
    'seen=" "; set -f; IFS=:; set -- $PATH; unset IFS; set +f; for r in node deno swamp bun go; do for d in "$@"; do case "$d" in /*) ;; *) continue;; esac; p="$d/$r"; [ -f "$p" ] && [ -x "$p" ] || continue; rp=$(readlink -f "$p" 2>/dev/null || echo "$p"); case "$seen" in *" $r:$rp "*) continue;; esac; seen="$seen$r:$rp "; case "$r" in go) v=$("$p" version 2>/dev/null | awk \'{print $3}\' | sed \'s/^go//\');; deno) v=$("$p" --version 2>/dev/null | head -1 | awk \'{print $2}\');; swamp) v=$("$p" --version 2>/dev/null | head -1 | awk \'{print $NF}\');; *) v=$("$p" --version 2>/dev/null | head -1);; esac; echo "$r|$p|$v"; done; done',
  );
  section("agents");
  s.push(
    "p=$(command -v cloudflared 2>/dev/null) && echo \"cloudflared|$p|$(cloudflared --version 2>/dev/null | grep -Eo '[0-9]{4}\\.[0-9]+\\.[0-9]+' | head -1)\"",
  );
  s.push(
    "p=$(command -v warp-cli 2>/dev/null) && echo \"warp-cli|$p|$(warp-cli --version 2>/dev/null | grep -Eo '[0-9]{4}\\.[0-9]+\\.[0-9]+(\\.[0-9]+)?' | head -1)\"",
  );
  s.push(
    `[ "$emudhra_os" = Darwin ] && p="/Applications/Cloudflare WARP.app" && [ -d "$p" ] && echo "warp-cli|$p|$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$p/Contents/Info.plist" 2>/dev/null)"`,
  );
  section("electron");
  // An Electron app is a directory with resources/app.asar or resources/app;
  // its version is the Electron/x.y.z its executable builds into its user agent.
  s.push(
    `emudhra_list=$(for d in ${
      ELECTRON_ROOTS.join(" ")
    }; do [ -d "$d" ] && find "$d" -maxdepth 4 \\( -path '*/resources/app.asar' -o -path '*/resources/app' \\) 2>/dev/null; done | head -100)`,
  );
  s.push(
    'eseen="|"; while IFS= read -r a; do [ -n "$a" ] || continue; app=$(dirname "$(dirname "$a")"); case "$eseen" in *"|$app|"*) continue;; esac; eseen="$eseen$app|"; v=""; for e in "$app"/*; do [ -f "$e" ] && [ -x "$e" ] || continue; v=$(grep -aoE -m1 "Electron/[0-9]+[.][0-9]+[.][0-9]+" "$e" 2>/dev/null | head -1 | cut -d/ -f2); [ -n "$v" ] && break; done; echo "$v|$app"; done <<EMUDHRA_LIST\n$emudhra_list\nEMUDHRA_LIST',
  );
  // macOS apps: Electron's framework version, and the WARP client.
  s.push(
    `if [ "$emudhra_os" = Darwin ]; then for app in /Applications/*.app "$HOME"/Applications/*.app; do p="$app/Contents/Frameworks/Electron Framework.framework/Resources/Info.plist"; [ -f "$p" ] || continue; echo "$(/usr/libexec/PlistBuddy -c 'Print :CFBundleVersion' "$p" 2>/dev/null)|$app"; done; fi`,
  );
  section("processes");
  s.push(
    "ps -A -o comm= 2>/dev/null | sed 's|.*/||' | grep -E '^(java|node|deno|swamp|bun|python[0-9.]*|cloudflared|warp-svc)$' | sort | uniq -c | awk '{print $2\"|\"$1}'",
  );
  section("live");
  if (opts.liveCheck) {
    for (const [path, host] of Object.entries(TEST_HOSTS)) {
      s.push(
        // --noproxy: the check is about the target's own verifier, not a proxy's.
        `if command -v curl >/dev/null 2>&1; then curl --noproxy '*' -sS -o /dev/null -m 15 https://${host}/ >/dev/null 2>&1; echo "curl|${path}|$?"; fi`,
      );
      s.push(
        // A watchdog instead of timeout(1), which macOS lacks.
        `if command -v openssl >/dev/null 2>&1; then e=$( { echo | openssl s_client -connect ${host}:443 -servername ${host} -verify_return_error 2>&1 >/dev/null & p=$!; ( sleep 15; kill $p ) >/dev/null 2>&1 & w=$!; wait $p; c=$?; kill $w 2>/dev/null; exit $c; } ); c=$?; if echo "$e" | grep -qiE 'verify error|certificate verify failed'; then c=60; fi; echo "openssl|${path}|$c"; fi`,
      );
    }
  }
  section("end");
  return s.join("\n");
}

// ---------------------------------------------------------------------------
// Probe output parsing
// ---------------------------------------------------------------------------

/** Structured view of one probe run. */
export type ProbeData = {
  uid: number | undefined;
  hostname: string;
  os: Record<string, string>;
  tools: Record<string, string>;
  packages: Record<string, string>;
  bundle: string | undefined;
  anchorInBundles: string[];
  /** Bundles holding AAA Certificate Services. */
  aaaInBundles: string[];
  confEntries: string[];
  p11kitBlocklist: string[];
  /** Existing p11-kit blocklist directory, under either name. */
  p11kitDir: string | undefined;
  verify: Record<string, string>;
  /** Bundles and trust stores found, for matching on the controller. */
  stores: ProbeStore[];
  /** File contents by SHA-256 (upper case): base64, or undefined past the limits. */
  blobs: Map<string, string | undefined>;
  electron: { path: string; version: string }[];
  /** macOS: certificates with a deny entry in the admin trust settings. */
  macosDeny: string[];
  /** Things the probe could not check, in its own words. */
  notices: string[];
  /** Windows: an elevated administrator session. */
  admin: boolean;
  /** Windows: AuthRoot policy values, when the probe could read them. */
  windowsPolicy: Record<string, string> | undefined;
  /** Windows: SHA-256 of each certificate in a Disallowed store. */
  windowsDisallowed: string[];
  cargo: { file: string; crate: string; version: string }[];
  hex: { file: string; pkg: string; version: string }[];
  runtimes: { name: string; path: string; version: string }[];
  agents: { name: string; path: string; version: string }[];
  processes: { name: string; count: number }[];
  live: { verifier: string; path: string; exitCode: number }[];
  complete: boolean;
};

/** Kinds of file the stores section reports. */
export type StoreKind =
  | "java"
  | "java-blocked"
  | "certifi"
  | "pip"
  | "os-bundle"
  | "bundle";

/** One file the stores section reported: `kind|sha256|extra|path`. */
export type ProbeStore = {
  kind: StoreKind;
  /** Upper-case SHA-256, or "" when the target had no hashing tool. */
  sha256: string;
  /** certifi: its version; java: the blocked.certs hash, or "". */
  extra: string;
  path: string;
};

/** Split probe output into its `@@ name` sections. */
export function splitSections(text: string): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let current: string[] | undefined;
  // Windows writes CRLF; a header must match without its \r.
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^@@ ([a-z0-9-]+)$/);
    if (m) {
      current = [];
      sections.set(m[1], current);
    } else if (current && line.trim() !== "") {
      current.push(line.replace(/\r$/, ""));
    }
  }
  return sections;
}

/** Parse `KEY=value` lines from /etc/os-release. */
export function parseOsRelease(lines: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of lines) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}

function pipeFields(lines: string[], n: number): string[][] {
  return lines.map((l) => l.split("|")).filter((f) => f.length >= n);
}

/**
 * Names of certificates `security dump-trust-settings` lists with a deny
 * result in any of their trust settings.
 */
export function parseTrustSettings(lines: string[]): string[] {
  const out: string[] = [];
  let name: string | undefined;
  for (const line of lines) {
    const m = line.match(/^Cert \d+:\s*(.*)$/);
    if (m) {
      name = m[1].trim();
      continue;
    }
    if (
      name && /kSecTrustSettingsResultDeny/.test(line) && !out.includes(name)
    ) {
      out.push(name);
    }
  }
  return out;
}

/** Parse the probe's complete output. */
export function parseProbe(text: string): ProbeData {
  const sec = splitSections(text);
  const get = (name: string) => sec.get(name) ?? [];
  // Labelled lines, so a missing id or hostname can't shift the other.
  const idField = (key: string) =>
    get("id").find((l) => l.startsWith(`${key}=`))?.slice(key.length + 1) ??
      "";
  const uidText = idField("uid");
  const uid = /^\d+$/.test(uidText) ? parseInt(uidText, 10) : undefined;

  const pairs = (name: string) => {
    const out: Record<string, string> = {};
    for (const line of get(name)) {
      const i = line.indexOf(" ");
      if (i > 0) out[line.slice(0, i)] = line.slice(i + 1).trim();
    }
    return out;
  };

  const verify: Record<string, string> = {};
  for (const line of get("verify")) {
    const [id, ...rest] = line.split(" ");
    verify[id] = rest.join(" ").trim();
  }

  const stores: ProbeStore[] = [];
  const blobs = new Map<string, string | undefined>();
  const kinds = new Set([
    "java",
    "java-blocked",
    "certifi",
    "pip",
    "os-bundle",
    "bundle",
  ]);
  for (const line of get("stores")) {
    const b = line.match(/^blob ([0-9A-Fa-f]{64}) (\S*)$/);
    if (b) {
      blobs.set(b[1].toUpperCase(), b[2] === "TOOBIG" ? undefined : b[2]);
      continue;
    }
    const f = line.split("|");
    if (f.length < 4 || !kinds.has(f[0])) continue;
    stores.push({
      kind: f[0] as StoreKind,
      sha256: /^[0-9A-Fa-f]{64}$/.test(f[1]) ? f[1].toUpperCase() : "",
      extra: f[2] === "-"
        ? ""
        : /^[0-9A-Fa-f]{64}$/.test(f[2])
        ? f[2].toUpperCase()
        : f[2],
      path: f.slice(3).join("|"),
    });
  }

  return {
    uid,
    hostname: idField("host"),
    os: parseOsRelease(get("os-release")),
    tools: pairs("tools"),
    packages: pairs("packages"),
    bundle: get("bundle")[0],
    anchorInBundles: get("anchor").filter((l) => !l.startsWith("aaa ")),
    aaaInBundles: get("anchor").filter((l) => l.startsWith("aaa ")).map((l) =>
      l.slice(4)
    ),
    confEntries: get("ca-certificates-conf"),
    p11kitBlocklist: get("p11-kit-blocklist"),
    p11kitDir: get("p11-kit-dir")[0],
    verify,
    stores,
    blobs,
    macosDeny: parseTrustSettings(get("macos-trust")),
    admin: idField("admin") === "1",
    notices: get("notices"),
    windowsPolicy: get("windows-policy").includes("policy-read=1")
      ? Object.fromEntries(
        get("windows-policy").map((l) => l.split("=")).filter((kv) =>
          kv.length === 2
        ),
      )
      : undefined,
    windowsDisallowed: get("windows-disallowed").map((l) =>
      (l.split("|")[1] ?? "").toUpperCase()
    ).filter((h) => /^[0-9A-F]{64}$/.test(h)),
    electron: pipeFields(get("electron"), 2).map(([version, ...path]) => ({
      version,
      path: path.join("|"),
    })),
    hex: pipeFields(get("hex"), 3).map((f) => ({
      file: f.slice(0, -2).join("|"),
      pkg: f[f.length - 2],
      version: f[f.length - 1],
    })),
    cargo: pipeFields(get("cargo"), 3).map((f) => ({
      file: f.slice(0, -2).join("|"),
      crate: f[f.length - 2],
      version: f[f.length - 1],
    })),
    // The path sits between the name and the version, which has no |, so
    // a | in the path survives.
    runtimes: pipeFields(get("runtimes"), 3).map((f) => ({
      name: f[0],
      path: f.slice(1, -1).join("|"),
      version: f[f.length - 1].replace(/^v/, "").trim(),
    })),
    agents: pipeFields(get("agents"), 3).map((f) => ({
      name: f[0],
      path: f.slice(1, -1).join("|"),
      version: f[f.length - 1],
    })),
    processes: pipeFields(get("processes"), 2).map(([name, count]) => ({
      name,
      count: parseInt(count, 10) || 0,
    })),
    live: pipeFields(get("live"), 3).map(([verifier, path, code]) => ({
      verifier,
      path,
      exitCode: parseInt(code, 10),
    })),
    complete: sec.has("end"),
  };
}

// ---------------------------------------------------------------------------
// Assessment
// ---------------------------------------------------------------------------

export type StoreFamily =
  | "debian-conf"
  | "p11-kit"
  | "alpine"
  | "arch"
  | "macos"
  | "windows"
  | "other";
export type ComponentStatus =
  | "fixed"
  | "exposed"
  | "no-fix-released"
  | "unknown";

/** Classify the trust-store mechanism from os-release. */
export function storeFamily(os: Record<string, string>): StoreFamily {
  if (os.ID === "macos") return "macos";
  if (os.ID === "windows") return "windows";
  const ids = [os.ID ?? "", ...(os.ID_LIKE ?? "").split(/\s+/)];
  if (ids.some((i) => i === "debian" || i === "ubuntu")) return "debian-conf";
  if (
    ids.some((i) =>
      ["fedora", "rhel", "centos", "amzn", "rocky", "almalinux", "ol"].includes(
        i,
      )
    )
  ) return "p11-kit";
  if (ids.includes("alpine")) return "alpine";
  if (ids.includes("arch")) return "arch";
  return "other";
}

/** First fixed ca-certificates version for this OS, if one is published. */
export function fixedCaCertificates(
  os: Record<string, string>,
): string | undefined {
  const own = FIXED_CA_CERTIFICATES[os.ID ?? ""];
  if (own) {
    return own[os.VERSION_ID ?? ""] ?? own[os.VERSION_CODENAME ?? ""] ??
      own["*"];
  }
  // Arch, Debian and Ubuntu derivatives install the parent's ca-certificates
  // package (Debian and Ubuntu only on a matching release). RHEL clones list
  // fedora but build their own, so Fedora's version is no guide there.
  for (const id of (os.ID_LIKE ?? "").split(/\s+/)) {
    const table = FIXED_CA_CERTIFICATES[id];
    if (!table || !["arch", "debian", "ubuntu"].includes(id)) continue;
    const v = id === "arch"
      ? table["*"]
      : table[os.VERSION_ID ?? ""] ?? table[os.VERSION_CODENAME ?? ""];
    if (v) return v;
  }
  return undefined;
}

export type VerifyResult = {
  name: string;
  usage: "tls" | "code-signing";
  path: "emsign" | "aaa";
  sha256: string;
  result: "trusted" | "rejected" | "not-checked";
  detail: string;
};

/**
 * openssl verify errors that mean no trust path: unable to get the issuer
 * (2), a self-signed root that is not trusted (19), unable to get the local
 * issuer (20), unable to verify the first certificate (21).
 */
const VERIFY_NO_TRUST_PATH = /^error (2|19|20|21)$/;
/**
 * Not yet valid (9) or expired (10): openssl checks times after it has built
 * a chain to a trusted root, so the store trusts the certificate.
 */
const VERIFY_CHAIN_BUILT = /^error (9|10)$/;

/**
 * Map the probe's verify lines onto the compromised certificates. Any other
 * error (an algorithm the local OpenSSL refuses, say) answers nothing about
 * trust, so it is not-checked rather than rejected.
 */
export function verifyResults(probe: ProbeData): VerifyResult[] {
  return COMPROMISED_CERTS.map((c) => {
    const raw = probe.verify[c.sha256.slice(0, 16)];
    const result: VerifyResult["result"] = raw === undefined || raw === ""
      ? "not-checked"
      : raw === "OK" || raw.startsWith("OK ") || VERIFY_CHAIN_BUILT.test(raw)
      ? "trusted"
      // openssl's no-trust-path errors, or a platform verifier's refusal.
      : VERIFY_NO_TRUST_PATH.test(raw) || raw.startsWith("rejected")
      ? "rejected"
      : "not-checked";
    return {
      name: c.name,
      usage: c.usage,
      path: c.path,
      sha256: c.sha256,
      result,
      detail: raw ?? "",
    };
  });
}

export type Verdict = "trusted" | "not-trusted" | "unknown";

/** TLS verdict for the OS store. Falls back to anchor presence without openssl. */
export function tlsVerdict(
  results: VerifyResult[],
  anchorPresent: boolean,
  complete = true,
  aaaPresent = false,
  bundleMatch?: StoreMatch,
): { verdict: Verdict; paths: ("emsign" | "aaa")[]; method: string } {
  const tls = results.filter((r) => r.usage === "tls");
  const checked = tls.filter((r) => r.result !== "not-checked");
  if (checked.length === 0 && bundleMatch && complete) {
    // No openssl: the bundle itself, matched by public key.
    const paths: ("emsign" | "aaa")[] = [
      ...(bundleMatch.roots.some((r) =>
          r === DISTRUST_ANCHOR.name || r === EMSIGN_TLS_ROOT.name
        )
        ? ["emsign" as const]
        : []),
      ...(bundleMatch.roots.includes(AAA_ROOT.name) ? ["aaa" as const] : []),
    ];
    return bundleMatch.exposed.includes("tls")
      ? { verdict: "trusted", paths, method: "public-key" }
      : { verdict: "not-trusted", paths: [], method: "public-key" };
  }
  if (checked.length === 0) {
    const paths: ("emsign" | "aaa")[] = [
      ...(anchorPresent ? ["emsign" as const] : []),
      ...(aaaPresent ? ["aaa" as const] : []),
    ];
    return paths.length > 0
      ? { verdict: "trusted", paths, method: "anchor-presence" }
      : { verdict: "unknown", paths: [], method: "none" };
  }
  const trusted = checked.filter((r) => r.result === "trusted");
  const paths = [...new Set(trusted.map((r) => r.path))];
  // Clean needs every TLS certificate checked: a cut-off probe proves nothing.
  const partial = !complete || checked.length < tls.length;
  return {
    verdict: trusted.length > 0
      ? "trusted"
      : partial
      ? "unknown"
      : "not-trusted",
    paths,
    method: "openssl-verify",
  };
}

export type Component = {
  kind:
    | "runtime"
    | "agent"
    | "java"
    | "certifi"
    | "bundle"
    | "electron"
    | "cargo"
    | "hex";
  name: string;
  path: string;
  version: string;
  fixedIn: string | undefined;
  status: ComponentStatus;
  note: string;
};

/** Status of one runtime binary. */
export function runtimeStatus(name: string, version: string): {
  status: ComponentStatus;
  fixedIn: string | undefined;
} {
  if (!version) return { status: "unknown", fixedIn: undefined };
  if (NO_FIX_RUNTIMES.includes(name)) {
    return { status: "no-fix-released", fixedIn: undefined };
  }
  if (name === "deno" || name === "swamp") {
    const fixed = name === "deno" ? DENO_FIXED_VERSION : SWAMP_FIXED_VERSION;
    if (!fixed) return { status: "no-fix-released", fixedIn: undefined };
    return {
      status: compareDottedVersions(version, fixed) >= 0 ? "fixed" : "exposed",
      fixedIn: fixed,
    };
  }
  const rule = FIXED_RUNTIMES[name];
  if (!rule) return { status: "unknown", fixedIn: undefined };
  return {
    status: isFixedOnBranches(version, rule.fixed, rule.branchDepth)
      ? "fixed"
      : "exposed",
    fixedIn: rule.fixed.join(", "),
  };
}

/** One bundle or trust store, matched by public key. */
export type StoreFinding = {
  kind: Exclude<StoreKind, "java-blocked">;
  path: string;
  version: string;
  /** False when the file could not be judged at all. */
  readable: boolean;
  /** Some certificates could not be read (an encrypted PKCS#12 bag). */
  incomplete: boolean;
  /** Why it could not be judged. */
  reason: string;
  match: StoreMatch | undefined;
};

/**
 * Match every bundle and trust store the probe sent back. Java stores take
 * their runtime's blocked.certs into account.
 */
export async function analyzeStores(
  probe: ProbeData,
): Promise<StoreFinding[]> {
  const out: StoreFinding[] = [];
  const blobText = (sha: string) => {
    const b64 = sha ? probe.blobs.get(sha) : undefined;
    // An empty body means the target had no base64 or openssl to send it;
    // a body cut off or garbled in transit is unreadable, not an error.
    if (!b64) return undefined;
    try {
      return base64ToBytes(b64);
    } catch {
      return undefined;
    }
  };
  for (const s of probe.stores) {
    if (s.kind === "java-blocked") continue;
    const kind = s.kind;
    const base = {
      kind,
      path: s.path,
      version: kind === "certifi" ? s.extra : "",
    };
    const bytes = blobText(s.sha256);
    if (!bytes) {
      out.push({
        ...base,
        readable: false,
        incomplete: true,
        reason: !s.sha256
          ? "no sha256sum, shasum or openssl on the target to send it"
          : probe.blobs.get(s.sha256) === ""
          ? "no base64 or openssl on the target to send it"
          : probe.blobs.has(s.sha256)
          ? `larger than ${STORE_MAX_BYTES} bytes, or past ${STORE_MAX_BLOBS} files or ${STORE_MAX_TOTAL} bytes in all`
          : "its content was not sent",
        match: undefined,
      });
      continue;
    }
    if (kind === "java") {
      const ks = readKeystore(bytes);
      const blockedBytes = s.extra ? blobText(s.extra) : undefined;
      const blocked = blockedBytes
        ? parseBlockedCerts(new TextDecoder().decode(blockedBytes))
        : new Set<string>();
      const match = await matchStore(ks.certs, blocked);
      out.push({
        ...base,
        readable: ks.certs.length > 0,
        incomplete: ks.incomplete,
        reason: ks.error ??
          (ks.incomplete
            ? "some certificates are encrypted"
            : ks.certs.length === 0
            ? "no certificates in it"
            : ""),
        match,
      });
      continue;
    }
    const certs = pemCertificates(new TextDecoder().decode(bytes));
    out.push({
      ...base,
      readable: certs.length > 0,
      incomplete: false,
      reason: certs.length === 0 ? "no PEM certificates in it" : "",
      match: await matchStore(certs),
    });
  }
  return out;
}

/** What a store match found, one phrase. */
function describeMatch(m: StoreMatch): string {
  return [
    m.roots.length > 0 ? `trusts ${m.roots.join(", ")}` : "",
    m.intermediates.length > 0
      ? `holds ${m.intermediates.join(", ")} as trust anchors`
      : "",
    m.blocked.length > 0 ? `blocked.certs refuses ${m.blocked.join(", ")}` : "",
    m.exposed.length > 0 ? `exposed for ${m.exposed.join(" and ")}` : "",
  ].filter((p) => p).join("; ");
}

function storeStatus(f: StoreFinding): ComponentStatus {
  if (!f.readable) return "unknown";
  if (f.match && f.match.exposed.length > 0) return "exposed";
  return f.incomplete ? "unknown" : "fixed";
}

function minVersionStatus(version: string, fixed: string): ComponentStatus {
  if (!version) return "unknown";
  return compareDottedVersions(version, fixed) >= 0 ? "fixed" : "exposed";
}

/** Every non-OS component the probe found, with a status. */
export function components(
  probe: ProbeData,
  stores: StoreFinding[] = [],
): Component[] {
  const out: Component[] = [];
  for (const r of probe.runtimes) {
    const { status, fixedIn } = runtimeStatus(r.name, r.version);
    const note = r.name === "deno" || r.name === "swamp"
      ? "Bundled root store; a fixed OS store does not protect it."
      : r.name === "go"
      ? "Go uses the system store on Linux; this matters for builds that embed fallback roots."
      : r.name === "node"
      ? "Node's bundled store; --use-system-ca switches to the OS store."
      : "";
    out.push({
      kind: "runtime",
      name: r.name,
      path: r.path,
      version: r.version,
      fixedIn,
      status,
      note,
    });
  }
  for (const a of probe.agents) {
    const fixed = FIXED_AGENTS[a.name as keyof typeof FIXED_AGENTS];
    out.push({
      kind: "agent",
      name: a.name,
      path: a.path,
      version: a.version,
      fixedIn: fixed,
      status: fixed ? minVersionStatus(a.version, fixed) : "unknown",
      note: "",
    });
  }
  for (const f of stores) {
    if (f.kind === "os-bundle") continue;
    const status = storeStatus(f);
    const what = f.match ? describeMatch(f.match) : "";
    const note = !f.readable || (f.incomplete && status !== "exposed")
      ? `not fully read: ${f.reason}${what ? `; ${what}` : ""}`
      : what || "trusts none of the compromised roots or intermediates";
    if (f.kind === "java") {
      out.push({
        kind: "java",
        name: "java-cacerts",
        path: f.path,
        version: "",
        fixedIn: undefined,
        status,
        note,
      });
    } else if (f.kind === "certifi") {
      out.push({
        kind: "certifi",
        name: "certifi",
        path: f.path,
        version: f.version,
        fixedIn: FIXED_LIBRARIES.certifi,
        status,
        note,
      });
    } else {
      out.push({
        kind: "bundle",
        name: f.kind === "pip" ? "pip vendored certifi" : "CA bundle",
        path: f.path,
        version: "",
        fixedIn: f.kind === "pip" ? FIXED_LIBRARIES.pip : undefined,
        status,
        note,
      });
    }
  }
  for (const e of probe.electron) {
    out.push({
      kind: "electron",
      name: `electron app ${
        e.path.split(/[\\/]/).filter((p) => p).pop() ?? e.path
      }`,
      path: e.path,
      version: e.version,
      fixedIn: FIXED_ELECTRON.join(", "),
      status: !e.version
        ? "unknown"
        : isFixedOnBranches(e.version, FIXED_ELECTRON, 1)
        ? "fixed"
        : "exposed",
      note:
        "Electron bundles Chromium's verifier and roots and does not get Chrome's updates.",
    });
  }
  for (const c of probe.cargo) {
    const fixed = FIXED_LIBRARIES[c.crate as "rustls-webpki" | "webpki-roots"];
    let status: ComponentStatus = minVersionStatus(c.version, fixed);
    let note = "";
    if (
      c.crate === "webpki-roots" && c.version.startsWith("0.") &&
      compareDottedVersions(c.version, "0.26.0") < 0
    ) {
      status = "exposed";
      note =
        "0.x before 0.26 carries its own root list, which includes emSign.";
    } else if (c.crate === "webpki-roots" && c.version.startsWith("0.")) {
      // Late 0.26.x releases are shims over 1.x and pull it into the same
      // lockfile; without a 1.x entry, this 0.26.x has its own root list.
      const v1 = probe.cargo.find((x) =>
        x.file === c.file && x.crate === "webpki-roots" &&
        !x.version.startsWith("0.")
      );
      if (v1) {
        status = minVersionStatus(v1.version, fixed);
        note = `0.26 shim over the 1.x entry (${v1.version}) in this lockfile.`;
      } else {
        status = "exposed";
        note =
          "0.26.x with no 1.x entry carries its own root list, which includes emSign.";
      }
    }
    out.push({
      kind: "cargo",
      name: c.crate,
      path: c.file,
      version: c.version,
      fixedIn: fixed,
      status,
      note: note ||
        "Rust needs both webpki-roots >= 1.0.10 and rustls-webpki >= 0.103.16.",
    });
  }
  for (const h of probe.hex) {
    if (NO_FIX_HEX_PACKAGES.includes(h.pkg)) {
      out.push({
        kind: "hex",
        name: `hex ${h.pkg}`,
        path: h.file,
        version: h.version,
        fixedIn: undefined,
        status: "no-fix-released",
        note:
          "Erlang certifi has no fixed release; hackney uses it by default. Prefer castore or the OS store (public_key:cacerts_get/0).",
      });
      continue;
    }
    const fixed = FIXED_LIBRARIES[h.pkg as "castore" | "tls_certificate_check"];
    out.push({
      kind: "hex",
      name: `hex ${h.pkg}`,
      path: h.file,
      version: h.version,
      fixedIn: fixed,
      status: fixed ? minVersionStatus(h.version, fixed) : "unknown",
      note: h.pkg === "tls_certificate_check"
        ? "1.36.0 updated its roots; probably fixed."
        : "",
    });
  }
  return out;
}

export type LiveResult = {
  verifier: string;
  path: string;
  host: string;
  result: "rejected" | "accepted" | "unreachable";
};

/** Interpret live-check exit codes: curl 60 and openssl verify errors reject. */
export function liveResults(probe: ProbeData): LiveResult[] {
  return probe.live.map((l) => ({
    verifier: l.verifier,
    path: l.path,
    host: TEST_HOSTS[l.path as keyof typeof TEST_HOSTS] ?? l.path,
    result: l.exitCode === 0
      ? "accepted"
      : l.exitCode === 60
      ? "rejected"
      : "unreachable",
  }));
}

/** Windows trust settings that bear on the verdict. */
export type WindowsStoreState = {
  /** Compromised intermediates in a Disallowed store (LocalMachine or CurrentUser). */
  disallowed: string[];
  /** Automatic root updates (AuthRoot): enabled unless policy turns them off. */
  rootAutoUpdate: "enabled" | "disabled" | "unknown";
  /** Automatic disallowed-list updates, which deliver Microsoft's block. */
  disallowedAutoUpdate: "enabled" | "disabled" | "unknown";
};

export type RiskLevel = "critical" | "high" | "medium" | "low" | "none";

/** Assessment of one host, persisted as the `status` resource. */
export type HostStatus = {
  scanTimestamp: string;
  dataAsOf: string;
  target: string;
  hostname: string;
  os: {
    id: string;
    versionId: string;
    prettyName: string;
    storeFamily: StoreFamily;
  };
  exposed: boolean;
  riskLevel: RiskLevel;
  summary: string;
  osStore: {
    bundle: string;
    verdict: Verdict;
    trustedPaths: ("emsign" | "aaa")[];
    verdictMethod: string;
    anchorPresent: boolean;
    codeSigningTrusted: Verdict;
    caCertificates: {
      installed: string;
      fixedIn: string;
      patched: ComponentStatus;
    };
    /** Roots deselected in /etc/ca-certificates.conf. */
    debianConfDistrusted: string[];
    /** Roots in the p11-kit blocklist through mitigate's files. */
    p11kitBlocklisted: string[];
    certificates: VerifyResult[];
    /** macOS: compromised intermediates with a deny entry in the admin trust settings. */
    macos?: { denyTrust: string[] };
    /** Windows: the Disallowed store and the automatic update settings. */
    windows?: WindowsStoreState;
  };
  components: Component[];
  liveCheck: LiveResult[];
  processes: { name: string; count: number }[];
  unreadable: string[];
  recommendations: string[];
};

function packagePatched(
  family: StoreFamily,
  installed: string | undefined,
  fixed: string | undefined,
): ComponentStatus {
  if (!installed || !fixed) return "unknown";
  const cmp = family === "debian-conf"
    ? compareDebVersions(installed, fixed)
    : compareDottedVersions(installed, fixed);
  return cmp >= 0 ? "fixed" : "exposed";
}

/** The Windows store state the probe read. */
export function windowsState(probe: ProbeData): WindowsStoreState {
  const p = probe.windowsPolicy;
  const flag = (value: string | undefined, enabledWhen: string) =>
    !p
      ? "unknown" as const
      : value === undefined || value === enabledWhen
      ? "enabled" as const
      : "disabled" as const;
  return {
    disallowed: [
      ...new Set(
        COMPROMISED_CERTS.filter((c) =>
          probe.windowsDisallowed.includes(c.sha256)
        ).map((c) => c.name),
      ),
    ],
    // DisableRootAutoUpdate=1 turns AuthRoot updates off; absent means on.
    rootAutoUpdate: flag(
      p?.DisableRootAutoUpdate === "1" ? "1" : undefined,
      "0",
    ),
    // EnableDisallowedCertAutoUpdate=0 turns the disallowed list off.
    disallowedAutoUpdate: flag(p?.EnableDisallowedCertAutoUpdate, "1"),
  };
}

/** Turn a probe into the host's status. */
export function assessHost(
  probe: ProbeData,
  target: string,
  now: Date = new Date(),
  stores: StoreFinding[] = [],
): HostStatus {
  const family = storeFamily(probe.os);
  const results = verifyResults(probe);
  const anchorPresent = probe.anchorInBundles.length > 0;
  const osBundle = stores.find((s) => s.kind === "os-bundle" && s.readable);
  const tls = tlsVerdict(
    results,
    anchorPresent,
    probe.complete,
    probe.aaaInBundles.length > 0,
    osBundle?.match,
  );
  const cs = results.filter((r) =>
    r.usage === "code-signing" && r.result !== "not-checked"
  );
  const codeSigningTrusted: Verdict = cs.length === 0
    ? "unknown"
    : cs.some((r) => r.result === "trusted")
    ? "trusted"
    : "not-trusted";
  // Alpine base images carry only ca-certificates-bundle.
  const installed = probe.packages["ca-certificates"] ??
    probe.packages["ca-certificates-bundle"];
  const fixedIn = fixedCaCertificates(probe.os);
  const comps = components(probe, stores);
  const live = liveResults(probe);
  const unreadable: string[] = [];
  // macOS and Windows judge the OS store with their own verifiers.
  const platformVerifier = family === "macos" || family === "windows";
  if (!probe.bundle && !platformVerifier) {
    unreadable.push(
      "system CA bundle (none of the standard paths is readable)",
    );
  }
  // With the bundle matched by public key the verdict stands without openssl.
  if (!probe.tools.openssl && !osBundle && !platformVerifier) {
    unreadable.push("openssl not installed; verdict uses anchor presence only");
  }
  for (const s of stores) {
    if (!s.readable || (s.incomplete && storeStatus(s) !== "exposed")) {
      unreadable.push(`${s.kind} ${s.path}: ${s.reason}`);
    }
  }
  if (!probe.complete) unreadable.push("probe output was truncated");
  if (platformVerifier && results.every((r) => r.result === "not-checked")) {
    unreadable.push(
      `the ${
        family === "macos" ? "macOS Security framework" : "Windows CryptoAPI"
      } check returned no results`,
    );
  }
  unreadable.push(...probe.notices);
  // A component that could not be judged must not read as clean.
  for (const c of comps) {
    if (
      c.status === "unknown" && c.kind !== "java" && c.kind !== "certifi" &&
      c.kind !== "bundle"
    ) {
      unreadable.push(
        `${c.name} at ${c.path}: status unknown${
          c.version ? ` (version ${c.version})` : " (no version read)"
        }`,
      );
    }
  }

  const exposedComps = comps.filter((c) =>
    c.status === "exposed" || c.status === "no-fix-released"
  );
  const liveAccepted = live.filter((l) => l.result === "accepted");
  const exposed = tls.verdict === "trusted" || exposedComps.length > 0 ||
    liveAccepted.length > 0;

  let riskLevel: RiskLevel = "none";
  if (tls.verdict === "trusted" || liveAccepted.length > 0) {
    riskLevel = "critical";
  } else if (
    // Go uses the OS store on Linux, so an old Go matters only for builds
    // that embed fallback roots.
    exposedComps.some((c) =>
      c.kind !== "cargo" && c.kind !== "hex" &&
      !(c.kind === "runtime" && c.name === "go")
    )
  ) riskLevel = "high";
  else if (exposedComps.length > 0) riskLevel = "medium";
  else if (tls.verdict === "unknown" || unreadable.length > 0) {
    riskLevel = "low";
  }

  const recs: string[] = [];
  const pkgPatched = packagePatched(family, installed, fixedIn);
  if (
    codeSigningTrusted === "trusted" && tls.verdict !== "trusted" &&
    (family === "macos" || family === "windows")
  ) {
    recs.push(
      `The OS still trusts the code-signing intermediates through their AAA cross-signs, so code signed with the compromised keys verifies; run mitigate to distrust those copies.`,
    );
  }
  if (tls.verdict === "trusted" && family === "macos") {
    recs.push(
      `Apple blocked these intermediates on 2026-10-19; update macOS, or run mitigate to add deny trust settings for the intermediates that still verify.`,
    );
  } else if (tls.verdict === "trusted" && family === "windows") {
    recs.push(
      `Microsoft blocked these intermediates on 2026-10-20 through the disallowed certificate list; let Windows Update refresh it, or run mitigate to add the intermediates that still verify to the Disallowed store.`,
    );
  } else if (tls.verdict === "trusted") {
    if (
      family === "arch" &&
      (pkgPatched === "exposed" || (fixedIn && pkgPatched === "unknown"))
    ) {
      recs.push(
        `Upgrade ca-certificates-mozilla to ${fixedIn} or later with a full system upgrade (pacman -Syu); until then, mitigate blocks ${DISTRUST_ANCHOR.name} in the p11-kit blocklist.`,
      );
    } else if (
      pkgPatched === "exposed" || (fixedIn && pkgPatched === "unknown")
    ) {
      recs.push(
        `Upgrade ca-certificates to ${fixedIn} or later (run mitigate).`,
      );
    } else if (pkgPatched === "fixed") {
      recs.push(
        `ca-certificates is at a fixed version, but the store still trusts the intermediates, so a root was added locally or another root still chains to them. Distrust ${DISTRUST_ANCHOR.name} and check local anchors (run mitigate).`,
      );
    } else {
      recs.push(
        `Distrust ${DISTRUST_ANCHOR.name} in the OS store; no fixed ca-certificates is known for this release (run mitigate).`,
      );
    }
  }
  if (tls.paths.includes("aaa") && !platformVerifier) {
    recs.push(
      `This store trusts ${AAA_ROOT.name} for TLS, so the cross-signed intermediates verify; current stores no longer do. Upgrade ca-certificates, or distrust ${AAA_ROOT.name} as well (run mitigate).`,
    );
  }
  for (const c of exposedComps) {
    if (
      c.kind === "runtime" && (c.name === "deno" || c.name === "swamp") &&
      c.status === "no-fix-released"
    ) {
      recs.push(
        tls.verdict === "not-trusted"
          ? `${c.name} at ${c.path} uses a bundled root store with no fixed release yet. As a stopgap, run it with DENO_TLS_CA_STORE=system (exactly that value) — see the README.`
          : `${c.name} at ${c.path} uses a bundled root store with no fixed release yet. Fix the OS store first; the DENO_TLS_CA_STORE=system stopgap only helps once it is clean.`,
      );
    } else if (c.status === "no-fix-released") {
      recs.push(
        `${c.name} at ${c.path}: no fixed release yet; track upstream.`,
      );
    } else if (c.kind === "runtime" && c.name === "swamp") {
      recs.push(
        `Upgrade swamp at ${c.path} (${
          c.version || "unknown"
        }) with swamp update; releases from ${c.fixedIn} on are built on Deno ${DENO_FIXED_VERSION}.`,
      );
    } else if (c.kind === "runtime" && c.name === "deno") {
      recs.push(
        `Upgrade deno at ${c.path} (${
          c.version || "unknown"
        }) to ${c.fixedIn} with deno upgrade.`,
      );
    } else if (c.fixedIn) {
      recs.push(
        `Upgrade ${c.name} at ${c.path} (${
          c.version || "unknown"
        }) to ${c.fixedIn}.`,
      );
    } else {
      recs.push(`${c.name} at ${c.path}: ${c.note}`);
    }
  }
  if (exposed) {
    recs.push("Never fix certificate errors by disabling verification.");
  } else {
    recs.push(
      "No action needed — no verifier checked on this host trusts the compromised intermediates.",
    );
  }

  const hostname = probe.hostname || target;
  const summary = exposed
    ? `${hostname} is ${riskLevel}-risk: ${
      [
        tls.verdict === "trusted"
          ? `the OS store trusts compromised intermediates (${
            tls.paths.join(", ")
          } path)`
          : "",
        exposedComps.length > 0
          ? `${exposedComps.length} component(s) exposed`
          : "",
        liveAccepted.length > 0
          ? `${liveAccepted.length} live check(s) accepted a test host`
          : "",
      ].filter((s) => s).join("; ")
    }.`
    : tls.verdict === "unknown"
    ? `${hostname}: the OS store could not be judged, so it is not called clean (see unreadable).`
    : unreadable.length > 0
    ? `${hostname} does not trust the compromised eMudhra intermediates, but not everything could be checked (see unreadable).`
    : `${hostname} does not trust the compromised eMudhra intermediates.`;

  return {
    scanTimestamp: now.toISOString(),
    dataAsOf: DATA_AS_OF,
    target,
    hostname,
    os: {
      id: probe.os.ID ?? "unknown",
      versionId: probe.os.VERSION_ID ?? probe.os.VERSION_CODENAME ?? "",
      prettyName: probe.os.PRETTY_NAME ?? "",
      storeFamily: family,
    },
    exposed,
    riskLevel,
    summary,
    osStore: {
      bundle: probe.bundle ?? "",
      verdict: tls.verdict,
      trustedPaths: tls.paths,
      verdictMethod: tls.method === "openssl-verify" && family === "macos"
        ? "security-verify-cert"
        : tls.method === "openssl-verify" && family === "windows"
        ? "cryptoapi"
        : tls.method,
      anchorPresent,
      codeSigningTrusted,
      caCertificates: {
        installed: installed ?? "",
        fixedIn: fixedIn ?? "",
        patched: pkgPatched,
      },
      debianConfDistrusted: [DISTRUST_ANCHOR, AAA_ROOT]
        .filter((r) => probe.confEntries.includes(`!${r.debianConfEntry}`))
        .map((r) => r.name),
      p11kitBlocklisted: [DISTRUST_ANCHOR, AAA_ROOT]
        .filter((r) => probe.p11kitBlocklist.includes(p11kitBlocklistFile(r)))
        .map((r) => r.name),
      certificates: results,
      ...(family === "windows" ? { windows: windowsState(probe) } : {}),
      ...(family === "macos"
        ? {
          macos: {
            denyTrust: [
              ...new Set(
                COMPROMISED_CERTS.filter((c) =>
                  probe.macosDeny.includes(c.name)
                ).map((c) => c.name),
              ),
            ],
          },
        }
        : {}),
    },
    components: comps,
    liveCheck: live,
    processes: probe.processes,
    unreadable,
    recommendations: recs,
  };
}

// ---------------------------------------------------------------------------
// Mitigation planning
// ---------------------------------------------------------------------------

const P11KIT_BLOCKLIST_DIR = "/etc/pki/ca-trust/source/blocklist";
const ARCH_BLOCKLIST_DIR = "/etc/ca-certificates/trust-source/blocklist";

/** One planned step. Privileged steps run as `sudo -n -- <argv>` unless root. */
export type PlannedStep =
  | {
    kind: "run";
    argv: string[];
    privileged: boolean;
    why: string;
    /** A failure is noted and the run continues (service restarts). */
    bestEffort?: boolean;
  }
  | {
    /** A Windows PowerShell script, run elevated (Windows targets only). */
    kind: "ps";
    script: string;
    /** One line for logs and reports. */
    summary: string;
    why: string;
  }
  | {
    kind: "install-file";
    dest: string;
    content: string;
    mode: string;
    why: string;
    /**
     * In-place edit used by the mitigation script instead of `content`, which
     * would be stale by the time a user runs the script after an upgrade.
     */
    scriptCommand?: string;
  };

export type MitigationAction =
  | "none"
  | "apply"
  | "needs-privilege"
  | "rebuild-image"
  | "manual";

export type MitigationPlan = {
  action: MitigationAction;
  /** Steps run first. */
  upgrade: PlannedStep[];
  /** Steps run only if the store still trusts the anchor after the upgrade. */
  distrust: PlannedStep[];
  /** Steps run after the store changes (agent upgrades, restarts). */
  after: PlannedStep[];
  /**
   * Each privileged command's argv that must be allowed before anything runs,
   * for the sudo pre-check. A staged install is checked as the bare install
   * binary, because its source path is random. The distrust commands are
   * included only when the distrust is certain to run.
   */
  privilegedCommands: string[][];
  /** The distrust steps' privileged commands, whether or not pre-required. */
  distrustCommands: string[][];
  manual: string[];
  restart: string[];
  notes: string[];
  /**
   * A script for the operator to run themselves, when mitigate can't apply
   * the fix remotely (macOS admin trust settings).
   */
  manualScript?: string;
};

function run(
  argv: string[],
  why: string,
  privileged = true,
  bestEffort = false,
): PlannedStep {
  return bestEffort
    ? { kind: "run", argv, privileged, why, bestEffort }
    : { kind: "run", argv, privileged, why };
}

/**
 * Path for a tool in a privileged step: the probed path only when it is in a
 * system directory, otherwise the bare name, which sudo resolves through its
 * own secure_path.
 */
export function tool(probe: ProbeData, name: string): string {
  const path = probe.tools[name];
  return path && /^\/(usr\/(local\/)?)?s?bin\/[^/]+$/.test(path) ? path : name;
}

/** Edit ca-certificates.conf so each root's entry is deselected. */
export function distrustConfContent(
  conf: string,
  roots: DistrustRoot[],
): string {
  let lines = conf.split("\n");
  for (const root of roots) {
    const entry = root.debianConfEntry;
    // update-ca-certificates trims each line, so trailing spaces or a CR
    // still select the root.
    lines = lines.map((l) => l.trim() === entry ? `!${entry}` : l);
    if (!lines.includes(`!${entry}`)) {
      if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
      lines.push(`!${entry}`, "");
    }
  }
  return lines.join("\n");
}

/** Roots to distrust: the emSign anchor, plus AAA when its path verified. */
export function rootsToDistrust(status: HostStatus): DistrustRoot[] {
  const roots: DistrustRoot[] = [DISTRUST_ANCHOR];
  if (status.osStore.trustedPaths.includes("aaa")) roots.push(AAA_ROOT);
  return roots;
}

/** The compromised certificate copies the OS verifier still trusts. */
function trustedCerts(status: HostStatus) {
  const ids = new Set(
    status.osStore.certificates.filter((c) => c.result === "trusted").map((
      c,
    ) => c.sha256),
  );
  return COMPROMISED_CERTS.filter((c) => ids.has(c.sha256));
}

/**
 * PowerShell that adds certificates to the LocalMachine Disallowed store.
 * Adding one already there is a no-op, so it is safe to run again.
 */
export function disallowScript(
  certs: readonly { pem: string; name: string }[],
): string {
  const b64 = (pem: string) =>
    pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  return [
    "$ErrorActionPreference = 'Stop'",
    "$s = New-Object System.Security.Cryptography.X509Certificates.X509Store('Disallowed', 'LocalMachine')",
    "$s.Open('ReadWrite')",
    "try {",
    ...certs.map((c) =>
      `  $s.Add((New-Object System.Security.Cryptography.X509Certificates.X509Certificate2 -ArgumentList (,[Convert]::FromBase64String('${
        b64(c.pem)
      }'))))  # ${c.name.replace(/[^A-Za-z0-9 .-]/g, "")}`
    ),
    "} finally { $s.Close() }",
    `Write-Output 'added ${certs.length} certificate(s) to LocalMachine\\Disallowed'`,
  ].join("\n");
}

/**
 * sh script for a Mac: deny trust in the admin domain for each certificate,
 * from a private temporary directory. Run in a local Terminal with sudo.
 */
export function macosDenyScript(
  certs: readonly { pem: string; name: string; sha256: string }[],
): string {
  return [
    "#!/bin/sh",
    "# eMudhra CA compromise mitigation for macOS, generated by @swamp/cve/emudhra.",
    `# Data as of ${DATA_AS_OF}. Review it, then run in a local Terminal: sudo sh <this file>`,
    "set -eu",
    'd=$(mktemp -d "${TMPDIR:-/tmp}/emudhra.XXXXXX")',
    "trap 'rm -rf \"$d\"' EXIT",
    ...certs.flatMap((c) => [
      `# ${c.name}`,
      `printf '%s\\n' ${shQuote(c.pem)} > "$d/${c.sha256.slice(0, 16)}.pem"`,
      `security add-trusted-cert -d -r deny -k /Library/Keychains/System.keychain "$d/${
        c.sha256.slice(0, 16)
      }.pem"`,
    ]),
    "",
  ].join("\n");
}

/** A .ps1 a Windows administrator can review and run. */
export function renderWindowsMitigationScript(
  host: string,
  plan: MitigationPlan,
): string {
  return [
    "#Requires -RunAsAdministrator",
    `# eMudhra CA compromise mitigation for ${
      host.replace(/[\r\n]/g, " ")
    }, generated by @swamp/cve/emudhra.`,
    `# Data as of ${DATA_AS_OF}. Review it, then run in an elevated PowerShell: powershell -ExecutionPolicy Bypass -File <this file>`,
    ...[...plan.upgrade, ...plan.distrust, ...plan.after].flatMap((s) => [
      `# ${s.why}`,
      s.kind === "ps"
        ? s.script
        : `# (not a Windows step) ${
          renderStep(s, { sudo: false, installPath: "install", brief: true })
        }`,
      "",
    ]),
  ].join("\r\n");
}

/**
 * Plan mitigation for one host. `conf` is the current /etc/ca-certificates.conf
 * (Debian family only). The plan is the same in dryRun and for real.
 */
export function planMitigation(
  status: HostStatus,
  probe: ProbeData,
  opts: { transport: "local" | "ssh" | "docker"; conf?: string },
): MitigationPlan {
  const plan: MitigationPlan = {
    action: "none",
    upgrade: [],
    distrust: [],
    after: [],
    privilegedCommands: [],
    distrustCommands: [],
    manual: [],
    restart: [],
    notes: [],
  };
  const family = status.os.storeFamily;
  const storeExposed = status.osStore.verdict === "trusted";
  // The platform verifiers name the code-signing copies that still verify
  // (on macOS 27 the AAA cross-signs do), so those are distrusted too.
  const csExposed = (family === "macos" || family === "windows") &&
    status.osStore.codeSigningTrusted === "trusted";
  const outdatedAgents = status.components.filter((c) =>
    c.kind === "agent" && c.status === "exposed"
  );

  for (const c of status.components) {
    if (
      c.kind === "agent" ||
      (c.status !== "exposed" && c.status !== "no-fix-released")
    ) continue;
    plan.manual.push(
      c.status === "no-fix-released"
        ? `${c.name} (${c.path}): no fixed release yet${
          c.name === "deno" || c.name === "swamp"
            ? "; see the README for the DENO_TLS_CA_STORE=system stopgap"
            : ""
        }.`
        : `${c.name} (${c.path}, ${
          c.version || "unknown version"
        }): upgrade to ${c.fixedIn ?? "a fixed release"}${
          c.kind === "runtime" && c.name === "swamp"
            ? " or later with swamp update"
            : c.kind === "runtime" && c.name === "deno"
            ? " with deno upgrade"
            : ""
        }${c.note ? ` — ${c.note.replace(/\.$/, "")}` : ""}.`,
    );
  }

  if (!storeExposed && !csExposed && outdatedAgents.length === 0) {
    plan.action = plan.manual.length > 0 ? "manual" : "none";
    return plan;
  }

  if (opts.transport === "docker") {
    plan.action = "rebuild-image";
    if (storeExposed) {
      plan.notes.push(
        family === "debian-conf"
          ? `Rebuild the image with: RUN apt-get update && apt-get install -y --only-upgrade ca-certificates && sed -i ${
            rootsToDistrust(status).map((r) =>
              `-e 's|^${r.debianConfEntry.replace(/\./g, "\\.")}$|!&|'`
            ).join(" ")
          } /etc/ca-certificates.conf && update-ca-certificates`
          : family === "p11-kit"
          ? `Rebuild the image with an updated ca-certificates (dnf -y upgrade ca-certificates), or COPY the ${
            rootsToDistrust(status).map((r) => r.name).join(" and ")
          } PEM into ${
            probe.p11kitDir ?? P11KIT_BLOCKLIST_DIR
          }/ and RUN update-ca-trust extract.`
          : family === "arch"
          ? `Rebuild the image after pacman -Syu, or COPY the ${
            rootsToDistrust(status).map((r) => r.name).join(" and ")
          } PEM into ${ARCH_BLOCKLIST_DIR}/ and RUN update-ca-trust extract.`
          : family === "alpine"
          ? probe.packages["ca-certificates"]
            ? "Rebuild the image with: RUN apk upgrade --no-cache ca-certificates && update-ca-certificates"
            : "Rebuild the image with: RUN apk upgrade --no-cache ca-certificates-bundle"
          : "Rebuild the image on a base whose CA store no longer trusts the compromised intermediates.",
      );
    }
    for (const a of outdatedAgents) {
      plan.notes.push(
        `Rebuild the image with ${a.name} ${a.fixedIn} or later.`,
      );
    }
    return plan;
  }

  if (storeExposed || csExposed) {
    const roots = rootsToDistrust(status);
    const pkgs = probe.packages;
    switch (family) {
      case "debian-conf": {
        const list = ["ca-certificates"];
        if (pkgs["ca-certificates-java"]) list.push("ca-certificates-java");
        plan.upgrade.push(
          run(
            [tool(probe, "apt-get"), "update", "-q"],
            "refresh package lists",
          ),
        );
        plan.upgrade.push(
          run(
            [
              tool(probe, "apt-get"),
              "install",
              "-y",
              "-q",
              "--only-upgrade",
              "-o",
              "Dpkg::Options::=--force-confold",
              ...list,
            ],
            "upgrade ca-certificates",
          ),
        );
        if (opts.conf !== undefined) {
          plan.distrust.push({
            kind: "install-file",
            dest: "/etc/ca-certificates.conf",
            content: distrustConfContent(opts.conf, roots),
            mode: "0644",
            // Deselect each entry in place, or append the deselection when
            // the entry is missing, matching distrustConfContent.
            scriptCommand: [
              `sed -i ${
                roots.map((r) =>
                  `-e ${
                    shQuote(
                      `s|^[[:space:]]*${
                        r.debianConfEntry.replace(/\./g, "\\.")
                      }[[:space:]]*$|!${r.debianConfEntry}|`,
                    )
                  }`
                ).join(" ")
              } /etc/ca-certificates.conf`,
              // Make sure the file ends in a newline before appending.
              `[ -z "$(tail -c1 /etc/ca-certificates.conf)" ] || echo >> /etc/ca-certificates.conf`,
              ...roots.map((r) =>
                `grep -qxF ${
                  shQuote(`!${r.debianConfEntry}`)
                } /etc/ca-certificates.conf || echo ${
                  shQuote(`!${r.debianConfEntry}`)
                } >> /etc/ca-certificates.conf`
              ),
            ].join("\n"),
            why: `deselect ${
              roots.map((r) => r.debianConfEntry).join(" and ")
            }`,
          });
          plan.distrust.push(
            run(
              [tool(probe, "update-ca-certificates")],
              "rebuild the CA bundle",
            ),
          );
          plan.notes.push(
            "dpkg-reconfigure ca-certificates can re-enable deselected roots; the fixed package removes them for good.",
          );
        } else {
          plan.manual.push(
            "/etc/ca-certificates.conf was not readable; deselect the anchor by hand.",
          );
        }
        break;
      }
      case "p11-kit": {
        const pm = probe.tools.dnf ? "dnf" : "yum";
        plan.upgrade.push(
          run(
            [tool(probe, pm), "-y", "upgrade", "ca-certificates"],
            "upgrade ca-certificates",
          ),
        );
        if (!probe.p11kitDir) {
          plan.distrust.push(
            run(
              [
                tool(probe, "install"),
                "-d",
                "-m",
                "0755",
                P11KIT_BLOCKLIST_DIR,
              ],
              "create the blocklist directory",
            ),
          );
        }
        for (const root of roots) {
          plan.distrust.push({
            kind: "install-file",
            dest: `${probe.p11kitDir ?? P11KIT_BLOCKLIST_DIR}/${
              p11kitBlocklistFile(root)
            }`,
            content: root.pem + "\n",
            mode: "0644",
            why: `blocklist ${root.name}`,
          });
        }
        plan.distrust.push(
          run(
            [tool(probe, "update-ca-trust"), "extract"],
            "rebuild the extracted bundles",
          ),
        );
        break;
      }
      case "alpine": {
        // Upgrade the package that is installed; a bundle-only host has no
        // update-ca-certificates, and its bundle needs no rebuild.
        const pkg = pkgs["ca-certificates"]
          ? "ca-certificates"
          : "ca-certificates-bundle";
        plan.upgrade.push(
          run([tool(probe, "apk"), "update"], "refresh package indexes"),
        );
        plan.upgrade.push(
          run([tool(probe, "apk"), "upgrade", pkg], `upgrade ${pkg}`),
        );
        if (probe.tools["update-ca-certificates"]) {
          plan.upgrade.push(
            run(
              [tool(probe, "update-ca-certificates")],
              "rebuild the CA bundle",
            ),
          );
        }
        plan.notes.push(
          "Alpine has no supported way to deselect one root; if the upgrade does not fix the store, move to a release with ca-certificates 20261020-r0 or later.",
        );
        break;
      }
      case "arch":
        // Partial upgrades are unsupported on Arch, so mitigate only blocks
        // the root and leaves the system upgrade to the operator.
        if (!probe.p11kitDir) {
          plan.distrust.push(
            run(
              [tool(probe, "install"), "-d", "-m", "0755", ARCH_BLOCKLIST_DIR],
              "create the blocklist directory",
            ),
          );
        }
        for (const root of roots) {
          plan.distrust.push({
            kind: "install-file",
            dest: `${probe.p11kitDir ?? ARCH_BLOCKLIST_DIR}/${
              p11kitBlocklistFile(root)
            }`,
            content: root.pem + "\n",
            mode: "0644",
            why: `blocklist ${root.name}`,
          });
        }
        plan.distrust.push(
          run(
            [tool(probe, "update-ca-trust"), "extract"],
            "rebuild the extracted bundles",
          ),
        );
        plan.manual.push(
          `Run a full system upgrade (pacman -Syu) to get ca-certificates-mozilla ${
            status.osStore.caCertificates.fixedIn || "3.131.1-1"
          } or later; partial upgrades are unsupported on Arch.`,
        );
        break;
      case "windows": {
        // Only the copies that still build a chain; never a root, which
        // would break unrelated sites.
        const certs = trustedCerts(status);
        plan.distrust.push({
          kind: "ps",
          script: disallowScript(certs),
          summary:
            `add ${certs.length} certificate(s) to LocalMachine\\Disallowed`,
          why: `distrust ${
            [...new Set(certs.map((c) => c.name))].join(", ")
          } in the LocalMachine Disallowed store`,
        });
        plan.notes.push(
          "Microsoft's own block arrives through the automatic disallowed-list update; the Disallowed entries only cover a machine that has not received it.",
        );
        break;
      }
      case "macos": {
        const certs = trustedCerts(status);
        plan.manualScript = macosDenyScript(certs);
        plan.manual.push(
          `macOS asks for user interaction to change admin trust settings, so mitigate does not apply them over SSH. Run the mitigation-script file artifact in a local Terminal with sudo (it adds deny trust settings for ${certs.length} certificate(s)), or deploy the same certificates as a Deny payload through your MDM. Updating macOS brings Apple's own block.`,
        );
        break;
      }
      default:
        plan.manual.push(
          "Unknown trust-store layout: update the OS CA store by hand and rescan.",
        );
    }
  }
  if (family === "windows" && status.osStore.windows) {
    const w = status.osStore.windows;
    if (
      w.rootAutoUpdate === "disabled" || w.disallowedAutoUpdate === "disabled"
    ) {
      plan.manual.push(
        "Turn automatic root and disallowed-list updates back on (Group Policy: Computer Configuration > Administrative Templates > System > Internet Communication Management > Turn off Automatic Root Certificates Update = Disabled), so Microsoft's block reaches this machine.",
      );
    }
  }

  const aptUpdated = plan.upgrade.some((st) =>
    st.kind === "run" && st.argv[1] === "update"
  );
  if (
    !aptUpdated && family === "debian-conf" &&
    outdatedAgents.some((a) =>
      probe.packages[a.name === "warp-cli" ? "cloudflare-warp" : "cloudflared"]
    )
  ) {
    plan.after.push(
      run([tool(probe, "apt-get"), "update", "-q"], "refresh package lists"),
    );
  }
  for (const a of outdatedAgents) {
    const pkg = a.name === "warp-cli" ? "cloudflare-warp" : "cloudflared";
    const unit = a.name === "warp-cli" ? "warp-svc" : "cloudflared";
    if (
      probe.packages[pkg] && (family === "debian-conf" || family === "p11-kit")
    ) {
      plan.after.push(
        family === "debian-conf"
          ? run([
            tool(probe, "apt-get"),
            "install",
            "-y",
            "-q",
            "--only-upgrade",
            // stdin is /dev/null, so a conffile prompt would fail the step.
            "-o",
            "Dpkg::Options::=--force-confold",
            pkg,
          ], `upgrade ${pkg} to ${a.fixedIn}`)
          : run([
            tool(probe, probe.tools.dnf ? "dnf" : "yum"),
            "-y",
            "upgrade",
            pkg,
          ], `upgrade ${pkg} to ${a.fixedIn}`),
      );
      if (probe.tools.systemctl) {
        // The packages ship no unit; it exists only after `cloudflared
        // service install`, so a missing unit must not fail the run.
        plan.after.push(
          run(
            [tool(probe, "systemctl"), "try-restart", unit],
            `restart ${unit}`,
            true,
            true,
          ),
        );
      }
    } else {
      plan.manual.push(
        `${a.name} (${a.path}, ${a.version || "unknown"}): ${
          probe.packages[pkg]
            ? "automatic agent upgrades cover only Debian and RHEL-family hosts"
            : "not installed from a known package"
        }; upgrade it to ${a.fixedIn} by hand.`,
      );
    }
  }

  if (storeExposed) {
    for (const p of status.processes) {
      // Deno, swamp and Bun use a bundled store, so a restart changes
      // nothing; their fix is the binary upgrade in the manual list.
      if (
        ["cloudflared", "warp-svc", "deno", "swamp", "bun"].includes(p.name)
      ) continue;
      plan.restart.push(
        `${p.name} (${p.count} running): restart so it reloads the CA store`,
      );
    }
  }

  // When a fixed package is known and not yet installed, the upgrade may fix
  // the store by itself, so the distrust commands are not required up front.
  const distrustCertain = status.osStore.caCertificates.patched !== "exposed" ||
    plan.upgrade.length === 0;
  const commandsOf = (s: PlannedStep): string[][] =>
    s.kind === "ps"
      ? [] // elevation, not sudo
      : s.kind === "run"
      ? (s.privileged ? [s.argv] : [])
      // The staged file's name is random, so ask about install itself: only a
      // rule that allows it with any arguments can match the real command.
      : [[tool(probe, "install")]];
  for (const s of plan.upgrade) plan.privilegedCommands.push(...commandsOf(s));
  for (const s of plan.distrust) {
    plan.distrustCommands.push(...commandsOf(s));
    if (distrustCertain) plan.privilegedCommands.push(...commandsOf(s));
  }
  // A best-effort step (a service restart) only adds a note if sudo refuses
  // it, so it must not hold up the rest of the host.
  for (const s of plan.after) {
    if (s.kind === "run" && s.bestEffort) continue;
    plan.privilegedCommands.push(...commandsOf(s));
  }
  const steps = [...plan.upgrade, ...plan.distrust, ...plan.after];
  plan.action = steps.length > 0 ? "apply" : "manual";
  return plan;
}

/** mktemp template for staged files. */
export const STAGE_TEMPLATE = "/tmp/emudhra.XXXXXX";

/** The argv a step runs with, given whether the session is root. */
export function privilegedArgv(argv: string[], isRoot: boolean): string[] {
  return isRoot ? argv : ["sudo", "-n", "--", ...argv];
}

/**
 * Shell text for one planned step. `brief` shows a staged file as one line
 * (for logs and reports); otherwise its full content is inlined, so the text
 * runs as is.
 */
export function renderStep(
  step: PlannedStep,
  opts: { sudo: boolean; installPath: string; brief?: boolean },
): string {
  const prefix = (privileged: boolean) =>
    privileged && opts.sudo ? "sudo -n -- " : "";
  if (step.kind === "run") {
    return `${prefix(step.privileged)}${step.argv.map(shQuote).join(" ")}`;
  }
  if (step.kind === "ps") {
    return opts.brief ? `PowerShell: ${step.summary}` : step.script;
  }
  if (opts.brief) {
    return `${prefix(true)}${
      shQuote(opts.installPath)
    } -m ${step.mode} <staged file> ${shQuote(step.dest)}`;
  }
  // The content comes from the target, so pick a terminator none of its lines
  // equals; otherwise the rest of the file would run as commands.
  const lines = new Set(step.content.split("\n"));
  let marker = "EMUDHRA_FILE";
  while (lines.has(marker)) marker += "_";
  return [
    `tmp=$(mktemp ${STAGE_TEMPLATE}) || exit "$?"`,
    `cat > "$tmp" <<'${marker}' || { rc=$?; rm -f "$tmp"; exit "$rc"; }\n${
      step.content.replace(/\n$/, "")
    }\n${marker}`,
    `${prefix(true)}${shQuote(opts.installPath)} -m ${step.mode} "$tmp" ${
      shQuote(step.dest)
    } || { rc=$?; rm -f "$tmp"; exit "$rc"; }`,
    `rm -f "$tmp"`,
  ].join("\n");
}

/**
 * A self-contained script a user can review and run with sudo themselves. It
 * contains every file it installs, so it works when copied to the host.
 */
export function renderMitigationScript(
  host: string,
  plan: MitigationPlan,
  installPath: string,
  roots: DistrustRoot[] = [DISTRUST_ANCHOR],
): string {
  const out: string[] = [
    "#!/bin/sh",
    `# eMudhra CA compromise mitigation for ${host}, generated by @swamp/cve/emudhra.`,
    `# Data as of ${DATA_AS_OF}. Review it, then run: sudo sh <this file>`,
    "set -eu",
    "",
  ];
  const scriptText = (step: PlannedStep) =>
    step.kind === "install-file" && step.scriptCommand
      ? step.scriptCommand
      : renderStep(step, { sudo: false, installPath });
  const add = (step: PlannedStep) => {
    out.push(`# ${step.why}`);
    out.push(scriptText(step));
    out.push("");
  };
  // Upgrades and restarts are best effort, as in mitigate: under set -e a
  // broken repo would otherwise end the script before the distrust block.
  const addBestEffort = (step: PlannedStep) => {
    out.push(`# ${step.why} (best effort)`);
    out.push(
      `${scriptText(step)} || echo ${
        shQuote(`emudhra: ${step.why} failed; continuing`)
      } >&2`,
    );
    out.push("");
  };
  plan.upgrade.forEach(addBestEffort);
  if (plan.distrust.length > 0) {
    out.push(
      `# If ${
        roots.map((r) => r.name).join(" or ")
      } is still in the bundle after the upgrade, distrust it.`,
    );
    out.push(
      `if ${
        roots.map((r) =>
          `grep -qsF ${shQuote(anchorMarker(r))} ${
            BUNDLE_CANDIDATES.map(shQuote).join(" ")
          }`
        ).join(" || ")
      }; then`,
    );
    // Not indented: a here-document's body and terminator must stay as is.
    for (const step of plan.distrust) {
      out.push(`# ${step.why}`);
      out.push(scriptText(step));
    }
    out.push("fi", "");
  }
  plan.after.forEach((step) =>
    step.kind === "run" && step.bestEffort ? addBestEffort(step) : add(step)
  );
  if (plan.restart.length > 0) {
    out.push("# Restart these so they reload the CA store:");
    for (const r of plan.restart) out.push(`#   ${r}`);
  }
  return out.join("\n") + "\n";
}

/** One entry of `sudo -ll`: its options and its command list. */
type SudoEntry = { runAs: string[]; options: string[]; commands: string[] };

/** Parse `sudo -ll` output into its Defaults options and its entries. */
export function parseSudoList(
  lines: string[],
): { defaults: string[]; entries: SudoEntry[] } {
  const defaults: string[] = [];
  const entries: SudoEntry[] = [];
  let section: "defaults" | "other" | "entry" = "other";
  let inCommands = false;
  let cur: SudoEntry | undefined;
  for (const line of lines) {
    if (/^Matching Defaults entries/.test(line)) {
      section = "defaults";
      continue;
    }
    if (/^Sudoers entry:/.test(line)) {
      cur = { runAs: [], options: [], commands: [] };
      entries.push(cur);
      section = "entry";
      inCommands = false;
      continue;
    }
    if (/^\S/.test(line)) {
      section = "other";
      inCommands = false;
      continue;
    }
    const t = line.trim();
    if (!t) continue;
    if (section === "defaults") {
      defaults.push(...t.split(/,\s*/));
    } else if (section === "entry" && cur) {
      const m = t.match(/^(RunAsUsers|Options|Commands):\s*(.*)$/);
      if (m) {
        inCommands = m[1] === "Commands";
        const vals = m[2] ? m[2].split(/,\s*/) : [];
        if (m[1] === "RunAsUsers") cur.runAs.push(...vals);
        if (m[1] === "Options") cur.options.push(...vals);
        if (inCommands) cur.commands.push(...vals);
      } else if (inCommands) {
        cur.commands.push(t);
      } else if (/^[A-Za-z]+:/.test(t)) {
        inCommands = false;
      }
    }
  }
  return { defaults, entries };
}

/** A sudoers glob as a regex; `/` stops a wildcard only in a path. */
function sudoGlob(glob: string, inPath: boolean): RegExp {
  const any = inPath ? "[^/]*" : ".*";
  const one = inPath ? "[^/]" : ".";
  return new RegExp(
    "^" + glob.replace(/[.+^${}()|\\]/g, "\\$&").replace(/\*/g, any)
      .replace(/\?/g, one) +
      "$",
  );
}

/**
 * Whether a sudoers command item matches this command line, the way sudoers
 * does: no arguments in the item allows any, `""` allows none, `^...$` is a
 * regex, and anything else is a glob over the whole argument string.
 */
function sudoItemMatches(item: string, argv: string[]): boolean {
  const text = item.replace(/^!/, "");
  const space = text.search(/\s/);
  const cmd = space === -1 ? text : text.slice(0, space);
  if (cmd === "ALL") return true;
  const [binary, ...rest] = argv;
  if (cmd.endsWith("/")) {
    if (!binary.startsWith(cmd)) return false;
  } else if (!sudoGlob(cmd, true).test(binary)) return false;
  if (space === -1) return true;
  // The staged install is checked as the bare binary because its file name
  // is random: it stands for any arguments, so only an item without an
  // argument list can allow it.
  if (rest.length === 0 && /(^|\/)install$/.test(binary)) {
    // A bare `*` matches any argument string, the empty one too.
    return text.slice(space).trim() === "*";
  }
  // sudo -ll prints the item's own escapes (\\: \\, \\= \\\\); undo them.
  const want = text.slice(space).trim().replace(/\\(.)/g, "$1");
  const args = rest.join(" ");
  if (want === '""') return args === "";
  if (want.startsWith("^") && want.endsWith("$")) {
    try {
      return new RegExp(want).test(args);
    } catch {
      return false;
    }
  }
  return sudoGlob(want, false).test(args);
}

/**
 * Whether sudo would run this command as root without asking for a password.
 * sudoers uses the last entry whose command, arguments included, matches, so
 * that entry's options decide. Without a listing to judge from, the command
 * is refused (the mitigation script still works).
 */
export function runsWithoutPassword(
  argv: string[],
  list: { defaults: string[]; entries: SudoEntry[] },
): boolean {
  // sudo -l passed, so the listing is readable; an empty one is a format
  // this parser does not know, and refusing is the safe answer.
  if (list.entries.length === 0) return false;
  const asRoot = list.entries.filter((e) =>
    e.runAs.length === 0 || e.runAs.includes("ALL") || e.runAs.includes("root")
  );
  // A command without an absolute path is resolved through sudo's
  // secure_path, which this check can't see; it never passes.
  if (!argv[0].startsWith("/")) return false;
  // The last entry with a matching item decides, and within its command
  // list the last matching item: a negated one (!cmd after ALL) refuses.
  const lastHit = (e: SudoEntry) =>
    e.commands.filter((c) => sudoItemMatches(c, argv)).at(-1);
  const last = asRoot.filter((e) => lastHit(e) !== undefined).at(-1);
  if (!last || lastHit(last)!.startsWith("!")) return false;
  if (last.options.includes("!authenticate")) return true;
  if (last.options.includes("authenticate")) return false;
  return list.defaults.includes("!authenticate");
}

/**
 * Parse the pre-check output into the refused commands. A command is allowed
 * only when `sudo -l` permits it and the rule that permits it needs no
 * password: `sudo -n -l` alone also passes rules that would prompt.
 */
export function refusedCommands(
  commands: string[][],
  lines: string[],
): string[][] {
  const allowed = new Set<number>();
  const at = lines.indexOf("@@ sudo-ll");
  const head = at === -1 ? lines : lines.slice(0, at);
  for (const line of head) {
    const m = line.match(/^(\d+)\|0$/);
    if (m) allowed.add(parseInt(m[1], 10));
  }
  const list = parseSudoList(at === -1 ? [] : lines.slice(at + 1));
  return commands.filter((argv, i) =>
    !allowed.has(i) || !runsWithoutPassword(argv, list)
  );
}

/**
 * Shell command that asks sudo, without prompting, whether each full command
 * is allowed, so rules that pin arguments are honoured, then prints the long
 * listing that shows which rules need a password.
 */
export function sudoCheckCommand(commands: string[][]): string {
  return [
    ...commands.map((argv, i) =>
      `sudo -n -l ${
        argv.map(shQuote).join(" ")
      } >/dev/null 2>&1; echo "${i}|$?"`
    ),
    "echo '@@ sudo-ll'",
    "sudo -n -ll 2>/dev/null",
  ].join("; ");
}
