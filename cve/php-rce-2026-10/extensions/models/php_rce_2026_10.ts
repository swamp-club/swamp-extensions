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
 * PHP RCE scanner for CVE-2026-109618 (RCE via OOM corruption) and
 * CVE-2026-109619 (RCE via stale global state), fixed in PHP 8.5.12, 8.4.27,
 * 8.3.36 and 8.2.35 on 2026-10-21. Inventories PHP installs on local, SSH or
 * Docker targets, rates their exposure, and upgrades them through the host's
 * package manager.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";

type FileWriter = {
  writeLine: (line: string) => Promise<void>;
  finalize: () => Promise<void>;
};

type Logger = { info: (msg: string) => void; debug: (msg: string) => void };

type MethodContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: Logger;
  createFileWriter: (fileSpec: string, label: string) => FileWriter;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

// --- Advisory data -----------------------------------------------------------

/** The two CVEs, as published by php.net and the php-src advisories. */
export const ADVISORY = {
  published: "2026-10-21",
  cves: [
    {
      id: "CVE-2026-109618",
      ghsa: "GHSA-w8hw-w9fx-j79w",
      title: "RCE via OOM corruption",
    },
    {
      id: "CVE-2026-109619",
      ghsa: "GHSA-6wmf-4rv5-p3rp",
      title: "RCE via stale global state",
    },
  ],
};

/**
 * First fixed upstream release per supported branch, from the php-src
 * advisories (each lists "< X vulnerable, X patched"). PHP 8.1 and older get
 * no upstream fix.
 */
export const FIXED_VERSIONS: Record<string, string> = {
  "8.2": "8.2.35",
  "8.3": "8.3.36",
  "8.4": "8.4.27",
  "8.5": "8.5.12",
};

/** When the php-src advisories were published; older package lists predate the fix. */
export const ADVISORY_PUBLISHED_AT = "2026-10-21T13:34:00Z";

/** When the distro tracker entries below were read. */
export const TRACKER_SNAPSHOT = "2026-10-21T15:16Z";

export type TrackerEntry = {
  distro: string;
  release: string;
  sourcePackage: string;
  fixedVersion: string;
  reference: string;
};

/**
 * Distro builds a security tracker marks fixed for both CVEs. Only entries the
 * tracker itself lists as fixed belong here; anything else is check-vendor.
 */
export const DISTRO_FIXES: TrackerEntry[] = [
  {
    distro: "debian",
    release: "13",
    sourcePackage: "php8.4",
    fixedVersion: "8.4.27-1~deb13u1",
    reference: "DSA-6574-1",
  },
  {
    distro: "ubuntu",
    release: "22.04",
    sourcePackage: "php8.1",
    fixedVersion: "8.1.2-1ubuntu2.28",
    reference: "USN-8948-1",
  },
  {
    distro: "ubuntu",
    release: "24.04",
    sourcePackage: "php8.3",
    fixedVersion: "8.3.6-0ubuntu0.24.04.13",
    reference: "USN-8948-1",
  },
  {
    distro: "ubuntu",
    release: "26.04",
    sourcePackage: "php8.5",
    fixedVersion: "8.5.4-0ubuntu1.5",
    reference: "USN-8948-1",
  },
  {
    distro: "ubuntu",
    release: "26.10",
    sourcePackage: "php8.5",
    fixedVersion: "8.5.9-0ubuntu2.1",
    reference: "USN-8948-1",
  },
];

/** Name of the ini drop-in that mitigate writes with applyConfigMitigations. */
export const DROP_IN_NAME = "99-swamp-php-rce-2026-10.ini";

// --- Schemas -----------------------------------------------------------------

const GlobalArgsSchema = z.object({
  targetHost: z
    .string()
    .default("localhost")
    .describe("SSH host to scan, or 'localhost' for local detection"),
  sshUser: z
    .string()
    .default("root")
    .describe("SSH user for remote hosts"),
  sshKey: z
    .string()
    .optional()
    .describe("Path to SSH private key for remote hosts"),
  dockerContainer: z
    .string()
    .optional()
    .describe("Docker container name or ID to scan (overrides targetHost/SSH)"),
  dockerImage: z
    .string()
    .optional()
    .describe(
      "Docker image to start and scan — container is created and removed automatically",
    ),
});

const InputsSchema = z.object({
  targetHost: z.string().optional().describe("SSH host to scan"),
  sshUser: z.string().optional().describe("SSH user for remote hosts"),
  sshKey: z.string().optional().describe("Path to SSH private key"),
  dockerContainer: z.string().optional().describe(
    "Docker container name or ID",
  ),
  dockerImage: z.string().optional().describe("Docker image to auto-start"),
});

const RiskLevel = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "none",
  "unknown",
]);
const Verdict = z.enum([
  "patched",
  "vulnerable",
  "unsupported",
  "update-available",
  "check-vendor",
  "unknown",
]);
const InstallAction = z.enum([
  "none",
  "upgrade",
  "rebuild-image",
  "isolate",
  "manual-upgrade",
  "check-vendor",
]);
const HostAction = z.enum([
  "none",
  "upgrade",
  "rebuild-image",
  "isolate",
  "manual-upgrade",
  "check-vendor",
  "restart",
  "needs-privilege",
  "unreachable",
]);
const Sapi = z.enum([
  "cli",
  "fpm",
  "apache2handler",
  "cgi",
  "frankenphp",
  "litespeed",
]);

const InstallSchema = z.object({
  kind: z.enum(["binary", "mod_php", "container"]),
  path: z.string(),
  sapi: Sapi,
  version: z.string().nullable(),
  branch: z.string().nullable(),
  source: z.enum(["upstream", "distro", "docker-image"]),
  packageName: z.string().nullable(),
  packageVersion: z.string().nullable(),
  serving: z.boolean(),
  publiclyReachable: z.boolean(),
  verdict: Verdict,
  fixedVersion: z.string().nullable(),
  action: InstallAction,
  risk: RiskLevel,
  note: z.string(),
});

const IniScopeSchema = z.object({
  scope: z.string(),
  sapi: z.string(),
  confDir: z.string().nullable(),
  files: z.array(z.string()),
  memoryLimit: z.string(),
  memoryLimitFinite: z.boolean(),
  postMaxSize: z.string(),
  uploadMaxFilesize: z.string(),
  sessionUploadProgress: z.boolean(),
  fatalErrorBacktraces: z.boolean().nullable(),
  poolOverrides: z.array(z.string()),
  defaultsAssumed: z.array(z.string()),
});

const MitigationSchema = z.object({
  dryRun: z.boolean(),
  applyConfigMitigations: z.boolean(),
  postMaxSize: z.string(),
  privilege: z.enum(["root", "sudo", "unavailable", "not-needed"]),
  missingPrivileges: z.array(z.string()),
  outcome: z.enum([
    "dry-run",
    "applied",
    "partial",
    "needs-privilege",
    "not-needed",
    "no-automatic-fix",
  ]),
  steps: z.array(z.object({
    phase: z.enum(["upgrade", "harden", "restart"]),
    command: z.string(),
    privileged: z.boolean(),
    purpose: z.string(),
    status: z.enum(["planned", "ok", "failed", "skipped"]),
    exitCode: z.number().nullable(),
    output: z.string(),
  })),
  notes: z.array(z.string()),
});

const StatusSchema = z.object({
  scanTimestamp: z.string(),
  target: z.string(),
  hostname: z.string(),
  os: z.object({
    id: z.string(),
    versionId: z.string(),
    prettyName: z.string(),
  }),
  inContainer: z.boolean(),
  runAsRoot: z.boolean(),
  vulnerable: z.boolean(),
  riskLevel: RiskLevel,
  action: HostAction,
  actions: z.array(HostAction),
  summary: z.string(),
  error: z.string().nullable(),
  cves: z.array(z.object({
    id: z.string(),
    ghsa: z.string(),
    title: z.string(),
  })),
  installs: z.array(InstallSchema),
  exposure: z.object({
    publiclyListening: z.boolean(),
    evidence: z.array(z.string()),
    phpHandoff: z.array(z.string()),
    iniScopes: z.array(IniScopeSchema),
    perRequestIniOverrides: z.array(z.string()),
    htaccessScanTruncated: z.boolean(),
    containersInspected: z.boolean(),
    containersNote: z.string().nullable(),
  }),
  pendingUpdates: z.array(z.string()),
  packageListsUpdatedAt: z.string().nullable(),
  indicators: z.object({
    hintsOnly: z.literal(true),
    note: z.string(),
    logHints: z.array(z.object({ file: z.string(), matches: z.number() })),
  }),
  unreadable: z.array(z.string()),
  staleProcesses: z.array(z.string()),
  recommendations: z.array(z.string()),
  trackerSnapshot: z.string(),
  mitigation: MitigationSchema.nullable(),
});

export type Status = z.infer<typeof StatusSchema>;
export type Install = z.infer<typeof InstallSchema>;
export type IniScope = z.infer<typeof IniScopeSchema>;
type Mitigation = z.infer<typeof MitigationSchema>;
type RiskLevelT = z.infer<typeof RiskLevel>;
type HostActionT = z.infer<typeof HostAction>;

// --- Version comparison ------------------------------------------------------

/** Upstream x.y.z from a PHP or package version, ignoring any epoch. */
export function parseUpstream(v: string): [number, number, number] | null {
  const m = v.match(/^(?:\d+:)?(\d+)\.(\d+)\.(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

function compareTriples(
  a: [number, number, number],
  b: [number, number, number],
): number {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

export type VersionClass = {
  branch: string | null;
  fixedVersion: string | null;
  status: "patched" | "vulnerable" | "unsupported" | "unknown";
};

/** Compares an upstream PHP version against the published fixed versions. */
export function classifyVersion(version: string | null): VersionClass {
  const p = version ? parseUpstream(version) : null;
  if (!p) return { branch: null, fixedVersion: null, status: "unknown" };
  const branch = `${p[0]}.${p[1]}`;
  const fixed = FIXED_VERSIONS[branch];
  if (fixed) {
    const patched = compareTriples(p, parseUpstream(fixed)!) >= 0;
    return {
      branch,
      fixedVersion: fixed,
      status: patched ? "patched" : "vulnerable",
    };
  }
  if (p[0] < 8 || (p[0] === 8 && p[1] < 2)) {
    return { branch, fixedVersion: null, status: "unsupported" };
  }
  // Newer branches (8.6 pre-releases) are not covered by the advisories.
  return { branch, fixedVersion: null, status: "unknown" };
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

// --- Probe -------------------------------------------------------------------

/**
 * One POSIX sh probe per target. Every line is "TAG|fields"; nothing in it
 * needs root, and anything it cannot read is reported as UNREADABLE.
 */
export const PROBE_SCRIPT = `
exec 2>/dev/null
echo "HOSTNAME|$(hostname || cat /etc/hostname)"
echo "UID|$(id -u)"
[ -r /etc/os-release ] && grep -E '^(ID|VERSION_ID|PRETTY_NAME)=' /etc/os-release | tr -d '"' | sed 's/^/OS|/'
if [ -f /.dockerenv ] || [ -f /run/.containerenv ]; then echo "INCONTAINER|1"; fi
echo "NOW|$(date +%s)"
echo "KERNEL|$(uname -s)"
for t in sudo apt-get dnf yum apk systemctl tee; do p=$(command -v "$t") && echo "TOOL|$t|$p"; done
owner() {
  o=""
  command -v dpkg >/dev/null && o=$(dpkg -S "$1" | grep -v '^diversion' | head -n 1 | cut -d: -f1)
  [ -z "$o" ] && command -v rpm >/dev/null && o=$(rpm -qf --qf '%{NAME}' "$1" | grep -v ' ' | head -n 1)
  [ -z "$o" ] && command -v apk >/dev/null && o=$(apk info --who-owns "$1" | sed -n 's/.* is owned by //p' | head -n 1)
  printf '%s' "$o"
}
seen=""
for d in $(printf '%s' "$PATH" | tr ':' ' ') /usr/sbin /usr/local/sbin /usr/local/bin /usr/bin /sbin /opt/remi/*/root/usr/bin /opt/remi/*/root/usr/sbin /usr/local/lsws/lsphp*/bin; do
  for f in "$d"/php "$d"/php[0-9]* "$d"/php-fpm* "$d"/php-cgi* "$d"/frankenphp "$d"/lsphp*; do
    [ -f "$f" ] && [ -x "$f" ] || continue
    case "$(basename "$f")" in *config*|*ize*|*dbg*) continue;; esac
    r=$(readlink -f "$f" || echo "$f")
    case " $seen " in *" $r "*) continue;; esac
    seen="$seen $r"
    case "$(basename "$r")" in frankenphp*) v=$("$r" version | head -n 1);; *) v=$("$r" -v | head -n 1);; esac
    echo "BIN|$r|$(owner "$r")|$v"
  done
done
for f in /usr/lib/apache2/modules/libphp*.so /usr/lib64/httpd/modules/libphp*.so /usr/lib/httpd/modules/libphp*.so /usr/lib64/httpd/modules/mod_php*.so /usr/lib/apache2/mod_php*.so /usr/local/apache2/modules/libphp*.so; do
  [ -f "$f" ] && echo "MODPHP|$f|$(owner "$f")"
done
for f in /etc/apache2/mods-enabled/php*.load /etc/httpd/conf.modules.d/*php*.conf /etc/apache2/conf.d/php*.conf; do
  [ -f "$f" ] && echo "MODPHPENABLED|$f"
done
if command -v dpkg-query >/dev/null; then
  dpkg-query -W -f='PKG|dpkg|\${Package}|\${Version}|\${Status}\\n' | grep -E '^PKG[|]dpkg[|](php|libapache2-mod-php)[^|]*[|][^|]*[|]install ok installed'
fi
if command -v rpm >/dev/null; then
  rpm -qa --qf 'PKG|rpm|%{NAME}|%{EPOCH}:%{VERSION}-%{RELEASE}|installed\\n' | grep -E '^PKG[|]rpm[|](php|mod_php)'
fi
if command -v apk >/dev/null; then
  apk info -v | grep -E '^php' | sed 's/^/APKPKG|/'
fi
if command -v apt >/dev/null; then
  apt list --upgradable | grep -E '^(php|libapache2-mod-php)' | sed 's/^/PENDING|apt|/'
  for f in /var/lib/apt/lists/*_InRelease /var/lib/apt/lists/*_Release; do [ -f "$f" ] && stat -c %Y "$f"; done | sort -n | tail -n 1 | sed 's/^/APTLISTS|/'
fi
if command -v dnf >/dev/null; then
  dnf -q -C check-update 'php*' | awk 'NF==3 {print "PENDING|dnf|" $1 " " $2}'
elif command -v yum >/dev/null; then
  yum -q -C check-update 'php*' | awk 'NF==3 {print "PENDING|yum|" $1 " " $2}'
fi
if command -v apk >/dev/null; then
  apk version -l '<' | grep -E '^php' | sed 's/^/PENDING|apk|/'
fi
ini_scan() {
  scope=$1; sapi=$2; shift 2
  for f in "$@"; do
    if [ ! -r "$f" ]; then [ -e "$f" ] && echo "UNREADABLE|$f"; continue; fi
    echo "INIFILE|$scope|$sapi|$f"
    awk -v s="$scope" -v p="$sapi" -v f="$f" '/^[[:space:]]*(memory_limit|post_max_size|upload_max_filesize|session[.]upload_progress[.]enabled|fatal_error_backtraces)[[:space:]]*=/ {
      k=$0; sub(/=.*/, "", k); gsub(/[[:space:]]/, "", k)
      v=$0; sub(/^[^=]*=/, "", v); sub(/;.*/, "", v); gsub(/^[[:space:]"]+|[[:space:]"]+$/, "", v)
      print "INI|" s "|" p "|" f "|" k "|" v }' "$f"
  done
}
for d in /etc/php/*/; do
  [ -d "$d" ] || continue
  v=$(basename "$d")
  for s in fpm apache2 cgi cli; do [ -d "$d$s" ] && ini_scan "debian:$v:$s" "$s" "$d$s/php.ini" "$d$s"/conf.d/*.ini; done
done
if [ -e /etc/php.ini ] || [ -d /etc/php.d ]; then ini_scan rhel all /etc/php.ini /etc/php.d/*.ini; fi
for d in /etc/opt/remi/php*/; do [ -d "$d" ] && ini_scan "remi:$(basename "$d")" all "$d"php.ini "$d"php.d/*.ini; done
if [ -d /usr/local/etc/php ]; then ini_scan official all /usr/local/etc/php/php.ini /usr/local/etc/php/conf.d/*.ini; fi
for d in /etc/php[0-9]*/; do [ -d "$d" ] && ini_scan "alpine:$(basename "$d")" all "$d"php.ini "$d"conf.d/*.ini; done
for f in /etc/php/*/fpm/pool.d/*.conf /etc/php-fpm.d/*.conf /usr/local/etc/php-fpm.d/*.conf /etc/php[0-9]*/php-fpm.d/*.conf /etc/opt/remi/php*/php-fpm.d/*.conf; do
  if [ ! -r "$f" ]; then [ -e "$f" ] && echo "UNREADABLE|$f"; continue; fi
  awk -v f="$f" '/^[[:space:]]*(listen[[:space:]]*=|php_(admin_)?(value|flag)[[])/ { sub(/^[[:space:]]+/, ""); print "POOL|" f "|" $0 }' "$f"
done
apache_conf="/etc/apache2/apache2.conf /etc/apache2/sites-enabled /etc/apache2/conf-enabled /etc/apache2/mods-enabled /etc/apache2/conf.d /etc/httpd"
nginx_conf="/etc/nginx/nginx.conf /etc/nginx/conf.d /etc/nginx/sites-enabled /etc/nginx/http.d /usr/local/etc/nginx"
grep -RsnE '^[[:space:]]*php_(admin_)?(value|flag)[[:space:]]' $apache_conf | head -n 50 | sed 's/^/OVR|apache|/'
grep -RsnE 'PHP_(ADMIN_)?VALUE' $nginx_conf | head -n 50 | sed 's/^/OVR|nginx|/'
roots=$( { grep -RshE '^[[:space:]]*DocumentRoot[[:space:]]' $apache_conf | awk '{print $2}'; grep -RshE '^[[:space:]]*root[[:space:]]' $nginx_conf | awk '{print $2}'; } | tr -d '";' | sort -u)
for r in $roots /var/www; do [ -d "$r" ] && find "$r" -maxdepth 4 -name .htaccess -type f; done | sort -u | head -n 501 | {
  c=0
  while IFS= read -r f; do
    c=$((c + 1))
    if [ "$c" -gt 500 ]; then echo "HTACCESS_TRUNCATED|500"; break; fi
    grep -nE '^[[:space:]]*php_(admin_)?(value|flag)[[:space:]]' "$f" | head -n 5 | awk -v f="$f" '{print "OVR|htaccess|" f ":" $0}'
  done
}
if command -v ss >/dev/null; then ss -H -ltnp | sed 's/^/LISTEN|/'
elif command -v netstat >/dev/null; then netstat -ltnp | grep -i listen | sed 's/^/LISTEN|/'
else echo "NOLISTEN|no ss or netstat"; fi
for p in /proc/[0-9]*/comm; do cat "$p"; done | sort -u | sed 's/^/PROC|/'
for p in /proc/[0-9]*; do
  f=$(grep -m 1 -E '/(php[^/ ]*|libphp[^/ ]*) \\(deleted\\)$' "$p/maps" | awk '{print $6}')
  [ -n "$f" ] && echo "STALE|$(cat "$p/comm")|$f"
done | sort -u | head -n 20
grep -RslE 'fastcgi_pass|proxy:fcgi|php_fastcgi|SetHandler[[:space:]]+application/x-httpd-php' $nginx_conf $apache_conf /etc/caddy | head -n 20 | sed 's/^/HANDOFF|/'
if command -v systemctl >/dev/null; then systemctl list-units --type=service --state=running --no-legend --plain | awk '{print "SERVICE|" $1}'; fi
if command -v docker >/dev/null; then
  out=$(docker ps --format '{{.ID}}|{{.Image}}|{{.Names}}|{{.Ports}}' 2>&1)
  if [ $? -ne 0 ]; then
    echo "DOCKERDENIED|$(printf '%s' "$out" | head -n 1)"
  else
    printf '%s\\n' "$out" | while IFS= read -r l; do
      [ -n "$l" ] || continue
      id=\${l%%|*}
      v=$(docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' "$id" | sed -n 's/^PHP_VERSION=//p' | head -n 1)
      echo "CONTAINER|$v|$l"
    done
  fi
fi
for f in /var/log/php*-fpm.log /var/log/php-fpm/error.log /var/log/apache2/error.log /var/log/httpd/error_log /var/log/nginx/error.log; do
  [ -e "$f" ] || continue
  if [ -r "$f" ]; then
    echo "LOG|$f|$(tail -n 20000 "$f" | grep -cE 'exited on signal (11|6)|SIGSEGV|Segmentation fault|Allowed memory size of [0-9]+ bytes exhausted')"
  else
    echo "UNREADABLE|$f"
  fi
done
echo "END|1"
`;

/**
 * The Windows probe, run by Windows PowerShell 5.1 or later when a host has no
 * sh. It prints the same tagged lines as PROBE_SCRIPT. Versions come from the
 * binaries' version resources, so it never runs PHP. Windows has no uid:
 * "UID|0" means an elevated administrator.
 */
export const WINDOWS_PROBE_SCRIPT = `
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
try { [Console]::OutputEncoding = [Text.Encoding]::UTF8 } catch {}
function Say([string]$s) { [Console]::Out.WriteLine($s) }
Say ('HOSTNAME|' + [Environment]::MachineName)
try {
  $cv = Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion'
  $name = [string]$cv.ProductName
  if ([int]$cv.CurrentBuild -ge 22000) { $name = $name -replace '^Windows 10', 'Windows 11' }
  if ($cv.DisplayVersion) { $name = $name + ' ' + $cv.DisplayVersion }
  Say 'OS|ID=windows'
  Say ('OS|VERSION_ID=' + $cv.CurrentMajorVersionNumber + '.' + $cv.CurrentMinorVersionNumber + '.' + $cv.CurrentBuild)
  Say ('OS|PRETTY_NAME=' + $name)
} catch {}
try {
  $me = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
  if ($me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) { Say 'UID|0' } else { Say 'UID|1' }
} catch {}
if (Get-Service cexecsvc) { Say 'INCONTAINER|1' }
Say ('NOW|' + [DateTimeOffset]::UtcNow.ToUnixTimeSeconds())
$dirs = New-Object System.Collections.Generic.List[string]
$procs = @{}
try {
  foreach ($p in Get-Process) {
    $procs[[int]$p.Id] = $p.ProcessName
    if ($p.Path -and $p.ProcessName -match '^(php|php-cgi|httpd|nginx)$') { $dirs.Add((Split-Path -Parent $p.Path)) }
  }
  foreach ($n in ($procs.Values | Sort-Object -Unique)) { Say ('PROC|' + $n) }
} catch {}
$w3svc = [bool](Get-Service W3SVC | Where-Object { $_.Status -eq 'Running' })
foreach ($d in ($env:PATH -split ';')) { if ($d) { $dirs.Add($d.Trim('"')) } }
$pf86 = [Environment]::GetEnvironmentVariable('ProgramFiles(x86)')
$roots = @('C:\\php*', 'C:\\tools\\php*', 'C:\\xampp\\php', 'C:\\wamp64\\bin\\php\\php*', 'C:\\wamp\\bin\\php\\php*', 'C:\\laragon\\bin\\php\\php*', 'C:\\ProgramData\\scoop\\apps\\php*\\current')
foreach ($b in @($env:ProgramFiles, $pf86)) { if ($b) { $roots += @((Join-Path $b 'PHP'), (Join-Path $b 'PHP\\*'), (Join-Path $b 'iis express\\PHP\\*')) } }
if ($env:USERPROFILE) { $roots += (Join-Path $env:USERPROFILE 'scoop\\apps\\php*\\current') }
foreach ($r in $roots) { foreach ($i in Get-Item -Path $r -Force) { if ($i.PSIsContainer) { $dirs.Add($i.FullName) } } }
$iisPorts = @{ 80 = 1; 443 = 1 }
if (Get-Service W3SVC) {
  $iis = Join-Path $env:windir 'System32\\inetsrv\\config\\applicationHost.config'
  try {
    $x = Get-Content -Raw -LiteralPath $iis -ErrorAction Stop
    foreach ($m in [regex]::Matches($x, '(?i)fullPath="([^"]*php-cgi\\.exe)"')) { $dirs.Add((Split-Path -Parent ([Environment]::ExpandEnvironmentVariables($m.Groups[1].Value)))) }
    if ($x -match '(?i)php-cgi\\.exe') { Say ('HANDOFF|' + $iis) }
    foreach ($m in [regex]::Matches($x, 'bindingInformation="[^:"]*:(\\d+):')) { $iisPorts[[int]$m.Groups[1].Value] = 1 }
  } catch { Say ('UNREADABLE|' + $iis) }
}
$confs = @('C:\\xampp\\apache\\conf\\httpd.conf', 'C:\\xampp\\apache\\conf\\extra\\httpd-xampp.conf', 'C:\\Apache24\\conf\\httpd.conf', 'C:\\nginx\\conf\\nginx.conf')
foreach ($r in @('C:\\wamp64\\bin\\apache\\apache*\\conf\\httpd.conf', 'C:\\wamp\\bin\\apache\\apache*\\conf\\httpd.conf', 'C:\\laragon\\bin\\apache\\*\\conf\\httpd.conf')) { foreach ($i in Get-Item -Path $r) { $confs += $i.FullName } }
foreach ($p in Get-Process -Name httpd, nginx) { if ($p.Path) { $confs += (Join-Path (Split-Path -Parent (Split-Path -Parent $p.Path)) ('conf\\' + $p.ProcessName + '.conf')) } }
foreach ($c in ($confs | Sort-Object -Unique)) {
  if (-not (Test-Path -LiteralPath $c -PathType Leaf)) { continue }
  try { $lines = Get-Content -LiteralPath $c -ErrorAction Stop } catch { Say ('UNREADABLE|' + $c); continue }
  $kind = if ($c -match 'nginx') { 'nginx' } else { 'apache' }
  $n = 0; $handoff = $false
  foreach ($l in $lines) {
    $n++
    if ($l -match '^\\s*LoadModule\\s+php\\d*_module\\s+"?([^"]+?)"?\\s*$') {
      Say ('MODPHPENABLED|' + $c)
      $dirs.Add((Split-Path -Parent ($Matches[1] -replace '/', '\\')))
    }
    if ($l -match '^\\s*php_(admin_)?(value|flag)\\s' -or $l -match 'PHP_(ADMIN_)?VALUE') { Say ('OVR|' + $kind + '|' + $c + ':' + $n + ':' + $l.Trim()) }
    if ($l -match 'fastcgi_pass|proxy:fcgi|SetHandler\\s+application/x-httpd-php|LoadModule\\s+php') { $handoff = $true }
  }
  if ($handoff) { Say ('HANDOFF|' + $c) }
}
$seen = @{}
$ini = New-Object System.Collections.Generic.List[string]
foreach ($d in $dirs) {
  if (-not $d -or -not (Test-Path -LiteralPath $d -PathType Container)) { continue }
  $full = (Get-Item -LiteralPath $d -Force).FullName.TrimEnd('\\')
  if ($seen.ContainsKey($full.ToLower())) { continue }
  $seen[$full.ToLower()] = 1
  $found = $false
  foreach ($e in @('php.exe', 'php-cgi.exe')) {
    $f = Join-Path $full $e
    if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { continue }
    $found = $true
    $v = [string](Get-Item -LiteralPath $f).VersionInfo.ProductVersion
    $sapi = if ($e -eq 'php-cgi.exe') { 'cgi-fcgi' } else { 'cli' }
    Say ('BIN|' + $f + '||PHP ' + $v.Trim() + ' (' + $sapi + ')')
  }
  foreach ($m in Get-ChildItem -LiteralPath $full -Filter 'php*apache2_4.dll') {
    $found = $true
    Say ('MODPHP|' + $m.FullName + '||' + [string]$m.VersionInfo.ProductVersion)
  }
  if ($found) { $ini.Add($full) }
}
function IniScan([string]$scope, [string]$file) {
  if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { return }
  try { $lines = Get-Content -LiteralPath $file -ErrorAction Stop } catch { Say ('UNREADABLE|' + $file); return }
  Say ('INIFILE|' + $scope + '|all|' + $file)
  foreach ($l in $lines) {
    if ($l -match '^\\s*(memory_limit|post_max_size|upload_max_filesize|session\\.upload_progress\\.enabled|fatal_error_backtraces)\\s*=\\s*(.*)$') {
      Say ('INI|' + $scope + '|all|' + $file + '|' + $Matches[1] + '|' + ($Matches[2] -replace ';.*$', '').Trim().Trim('"').Trim())
    }
  }
}
foreach ($d in $ini) { IniScan ('windows:' + $d) (Join-Path $d 'php.ini') }
if ($env:PHPRC) { IniScan 'windows:PHPRC' (Join-Path $env:PHPRC 'php.ini') }
IniScan 'windows:SystemRoot' (Join-Path $env:windir 'php.ini')
try {
  foreach ($l in (netstat -ano -p TCP) + (netstat -ano -p TCPv6)) {
    $t = $l.Trim() -split '\\s+'
    if ($t.Count -lt 5 -or $t[0] -notmatch '^TCP' -or $t[2] -notmatch ':0$') { continue }
    $id = [int]$t[$t.Count - 1]
    $p = $procs[$id]
    # PID 4 is the kernel's HTTP.sys, which also holds SMB and WinRM ports.
    if ($id -eq 4 -and $w3svc -and $iisPorts.ContainsKey([int]($t[1] -replace '^.*:', ''))) { $p = 'iis' }
    Say ('LISTEN|LISTEN 0 0 ' + $t[1] + ' ' + $t[2] + ' users:(("' + $p + '",pid=' + $id + '))')
  }
} catch { Say 'NOLISTEN|netstat failed' }
foreach ($f in @('C:\\xampp\\apache\\logs\\error.log', 'C:\\xampp\\php\\logs\\php_error_log', 'C:\\Apache24\\logs\\error.log', 'C:\\wamp64\\logs\\apache_error.log', 'C:\\wamp64\\logs\\php_error.log', 'C:\\nginx\\logs\\error.log')) {
  if (-not (Test-Path -LiteralPath $f)) { continue }
  try {
    $c = @(Get-Content -LiteralPath $f -Tail 20000 -ErrorAction Stop | Select-String -Pattern 'exited with status 3221225477|Segmentation fault|Allowed memory size of [0-9]+ bytes exhausted').Count
    Say ('LOG|' + $f + '|' + $c)
  } catch { Say ('UNREADABLE|' + $f) }
}
Say 'END|1'
`;

/** How a Windows host's cmd.exe, PowerShell or pwsh reports a missing "sh". */
const NO_SH =
  /is not recognized as (an internal or external command|(the|a) name of a cmdlet)/;

/** An sh from Git for Windows, MSYS2 or Cygwin: the host is Windows. */
const WINDOWS_SH = /^KERNEL\|(MINGW|MSYS|CYGWIN)/m;

export type ProbeFacts = {
  hostname: string;
  uid: number | null;
  os: { id: string; versionId: string; prettyName: string };
  inContainer: boolean;
  now: number | null;
  tools: Record<string, string>;
  binaries: { path: string; owner: string | null; versionLine: string }[];
  modPhp: { path: string; owner: string | null; version: string | null }[];
  modPhpEnabled: string[];
  packages: {
    manager: "dpkg" | "rpm" | "apk";
    name: string;
    version: string;
  }[];
  pending: { manager: string; name: string; newVersion: string }[];
  aptListsEpoch: number | null;
  iniFiles: { scope: string; sapi: string; file: string }[];
  iniValues: {
    scope: string;
    sapi: string;
    file: string;
    key: string;
    value: string;
  }[];
  pools: { file: string; line: string }[];
  overrides: string[];
  htaccessTruncated: boolean;
  listeners: { local: string; process: string | null }[];
  listenersKnown: boolean;
  processes: string[];
  /** Processes still mapping a PHP binary or libphp deleted on disk. */
  stale: { process: string; path: string }[];
  handoff: string[];
  services: string[];
  dockerPresent: boolean;
  dockerDenied: string | null;
  containers: {
    id: string;
    image: string;
    name: string;
    ports: string;
    phpVersion: string | null;
  }[];
  logs: { file: string; matches: number }[];
  unreadable: string[];
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

/** Splits an apk "name-version-rN" string. */
export function splitApkName(s: string): { name: string; version: string } {
  const m = s.match(/^(.+)-(\d[^-]*-r\d+)$/);
  return m ? { name: m[1], version: m[2] } : { name: s, version: "" };
}

/** Parses the probe's tagged output into facts. Unknown lines are ignored. */
export function parseProbe(text: string): ProbeFacts {
  const f: ProbeFacts = {
    hostname: "",
    uid: null,
    os: { id: "", versionId: "", prettyName: "" },
    inContainer: false,
    now: null,
    tools: {},
    binaries: [],
    modPhp: [],
    modPhpEnabled: [],
    packages: [],
    pending: [],
    aptListsEpoch: null,
    iniFiles: [],
    iniValues: [],
    pools: [],
    overrides: [],
    htaccessTruncated: false,
    listeners: [],
    listenersKnown: true,
    processes: [],
    stale: [],
    handoff: [],
    services: [],
    dockerPresent: false,
    dockerDenied: null,
    containers: [],
    logs: [],
    unreadable: [],
    complete: false,
  };
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\r$/, "");
    const bar = line.indexOf("|");
    if (bar < 0) continue;
    const tag = line.slice(0, bar);
    const rest = line.slice(bar + 1);
    switch (tag) {
      case "HOSTNAME":
        f.hostname = rest.trim();
        break;
      case "UID": {
        const n = parseInt(rest, 10);
        f.uid = Number.isNaN(n) ? null : n;
        break;
      }
      case "OS": {
        const eq = rest.indexOf("=");
        const key = rest.slice(0, eq);
        const value = rest.slice(eq + 1);
        if (key === "ID") f.os.id = value;
        if (key === "VERSION_ID") f.os.versionId = value;
        if (key === "PRETTY_NAME") f.os.prettyName = value;
        break;
      }
      case "INCONTAINER":
        f.inContainer = true;
        break;
      case "NOW": {
        const n = parseInt(rest, 10);
        f.now = Number.isNaN(n) ? null : n;
        break;
      }
      case "TOOL": {
        const [name, path] = splitFields(rest, 2);
        if (path) f.tools[name] = path;
        break;
      }
      case "BIN": {
        const [path, owner, versionLine] = splitFields(rest, 3);
        f.binaries.push({ path, owner: owner || null, versionLine });
        break;
      }
      case "MODPHP": {
        const [path, owner, version] = splitFields(rest, 3);
        f.modPhp.push({ path, owner: owner || null, version: version || null });
        break;
      }
      case "MODPHPENABLED":
        f.modPhpEnabled.push(rest);
        break;
      case "PKG": {
        const [manager, name, version] = splitFields(rest, 4);
        if (manager === "dpkg" || manager === "rpm") {
          f.packages.push({
            manager,
            name,
            version: version.replace(/^\(none\):/, "").replace(/^0:/, ""),
          });
        }
        break;
      }
      case "APKPKG": {
        const { name, version } = splitApkName(rest.trim());
        f.packages.push({ manager: "apk", name, version });
        break;
      }
      case "PENDING": {
        const [manager, body] = splitFields(rest, 2);
        if (manager === "apt") {
          // php8.2-cli/bookworm-security 8.2.35-1~deb12u1 amd64 [upgradable from: ...]
          const m = body.match(/^([^/\s]+)\/\S*\s+(\S+)/);
          if (m) f.pending.push({ manager, name: m[1], newVersion: m[2] });
        } else if (manager === "apk") {
          // php82-8.2.34-r0 < 8.2.35-r0
          const m = body.match(/^(\S+)\s+<\s+(\S+)/);
          if (m) {
            f.pending.push({
              manager,
              name: splitApkName(m[1]).name,
              newVersion: m[2],
            });
          }
        } else {
          const [pkg, version] = body.split(" ");
          f.pending.push({
            manager,
            name: pkg.replace(/\.[^.]+$/, ""),
            newVersion: version ?? "",
          });
        }
        break;
      }
      case "APTLISTS": {
        const n = parseInt(rest, 10);
        if (!Number.isNaN(n)) f.aptListsEpoch = n;
        break;
      }
      case "INIFILE": {
        const [scope, sapi, file] = splitFields(rest, 3);
        f.iniFiles.push({ scope, sapi, file });
        break;
      }
      case "INI": {
        const [scope, sapi, file, key, value] = splitFields(rest, 5);
        f.iniValues.push({ scope, sapi, file, key, value });
        break;
      }
      case "POOL": {
        const [file, poolLine] = splitFields(rest, 2);
        f.pools.push({ file, line: poolLine.trim() });
        break;
      }
      case "OVR":
        f.overrides.push(rest);
        break;
      case "HTACCESS_TRUNCATED":
        f.htaccessTruncated = true;
        break;
      case "LISTEN": {
        const t = rest.trim().split(/\s+/);
        if (t.length < 4) break;
        const local = t[3];
        let process: string | null = null;
        const ssUser = rest.match(/users:\(\("([^"]+)"/);
        if (ssUser) process = ssUser[1];
        else if (t[0].startsWith("tcp") && t[6]?.includes("/")) {
          process = t[6].split("/")[1]?.replace(/:.*$/, "") || null;
        }
        f.listeners.push({ local, process });
        break;
      }
      case "NOLISTEN":
        f.listenersKnown = false;
        break;
      case "PROC":
        if (rest.trim()) f.processes.push(rest.trim());
        break;
      case "HANDOFF":
        f.handoff.push(rest);
        break;
      case "STALE": {
        const [process, path] = splitFields(rest, 2);
        f.stale.push({ process, path });
        break;
      }
      case "SERVICE":
        f.services.push(rest.trim());
        break;
      case "DOCKERDENIED":
        f.dockerPresent = true;
        f.dockerDenied = rest.trim() || "docker ps failed";
        break;
      case "CONTAINER": {
        f.dockerPresent = true;
        const [phpVersion, id, image, name, ports] = splitFields(rest, 5);
        f.containers.push({
          id,
          image,
          name,
          ports,
          phpVersion: phpVersion || null,
        });
        break;
      }
      case "LOG": {
        const [file, count] = splitFields(rest, 2);
        f.logs.push({ file, matches: parseInt(count, 10) || 0 });
        break;
      }
      case "UNREADABLE":
        f.unreadable.push(rest);
        break;
      case "END":
        f.complete = true;
        break;
    }
  }
  return f;
}

// --- Analysis ----------------------------------------------------------------

const SERVING_SAPIS = new Set([
  "fpm",
  "apache2handler",
  "cgi",
  "frankenphp",
  "litespeed",
]);

const WEB_SERVER_PROCESSES =
  /^(nginx|apache2|httpd|caddy|lshttpd|litespeed|frankenphp|iis|w3wp)$/;

function sapiFromVersionLine(
  path: string,
  versionLine: string,
): z.infer<typeof Sapi> {
  const base = path.split(/[\\/]/).pop() ?? path;
  if (base.startsWith("frankenphp")) return "frankenphp";
  if (base.startsWith("lsphp")) return "litespeed";
  const m = versionLine.match(/\(([a-z0-9-]+)\)/);
  switch (m?.[1]) {
    case "fpm-fcgi":
      return "fpm";
    case "cgi-fcgi":
      return "cgi";
    case "litespeed":
      return "litespeed";
  }
  if (base.startsWith("php-fpm")) return "fpm";
  if (base.startsWith("php-cgi")) return "cgi";
  return "cli";
}

function versionFromLine(versionLine: string): string | null {
  const m = versionLine.match(/PHP (\d+\.\d+\.\d+[^\s(]*)/);
  return m ? m[1] : null;
}

/** "php8.2-cli" or "libapache2-mod-php8.2" → "php8.2", the Debian source. */
function debSourcePackage(name: string): string | null {
  const m = name.match(/^(?:libapache2-mod-)?(php\d+\.\d+)/);
  return m ? m[1] : null;
}

function isLoopback(host: string): boolean {
  const h = host.replace(/^\[|\]$/g, "").replace(/%.*$/, "");
  return h === "::1" || h === "localhost" || h.startsWith("127.");
}

function splitHostPort(local: string): { host: string; port: number | null } {
  const m = local.match(/^(.*):(\d+)$/);
  if (!m) return { host: local, port: null };
  return { host: m[1], port: Number(m[2]) };
}

/** Classifies an FPM "listen" value: socket, loopback or all/other interfaces. */
export function fpmListenKind(value: string): "socket" | "loopback" | "public" {
  const v = value.trim();
  if (v.startsWith("/")) return "socket";
  if (/^\d+$/.test(v)) return "public";
  const { host } = splitHostPort(v);
  return isLoopback(host) ? "loopback" : "public";
}

function confDirFor(scope: string): string | null {
  const parts = scope.split(":");
  switch (parts[0]) {
    case "debian":
      return `/etc/php/${parts[1]}/${parts[2]}/conf.d`;
    case "rhel":
      return "/etc/php.d";
    case "remi":
      return `/etc/opt/remi/${parts[1]}/php.d`;
    case "official":
      return "/usr/local/etc/php/conf.d";
    case "alpine":
      return `/etc/${parts[1]}/conf.d`;
  }
  return null;
}

function poolScope(file: string): string | null {
  let m = file.match(/^\/etc\/php\/([^/]+)\/fpm\/pool\.d\//);
  if (m) return `debian:${m[1]}:fpm`;
  if (file.startsWith("/etc/php-fpm.d/")) return "rhel";
  if (file.startsWith("/usr/local/etc/php-fpm.d/")) return "official";
  m = file.match(/^\/etc\/(php\d+)\/php-fpm\.d\//);
  if (m) return `alpine:${m[1]}`;
  m = file.match(/^\/etc\/opt\/remi\/([^/]+)\/php-fpm\.d\//);
  if (m) return `remi:${m[1]}`;
  return null;
}

const truthy = (v: string) => /^(1|on|true|yes)$/i.test(v.trim());

/** Effective exposure settings per ini scope, with FPM pool overrides last. */
export function resolveIniScopes(
  facts: ProbeFacts,
  branches: Set<string>,
): IniScope[] {
  const scopes = new Map<string, { sapi: string; files: string[] }>();
  for (const f of facts.iniFiles) {
    const s = scopes.get(f.scope) ?? { sapi: f.sapi, files: [] };
    s.files.push(f.file);
    scopes.set(f.scope, s);
  }
  const result: IniScope[] = [];
  for (const [scope, { sapi, files }] of scopes) {
    const values = new Map<string, string>();
    for (const v of facts.iniValues.filter((x) => x.scope === scope)) {
      values.set(v.key, v.value);
    }
    const poolOverrides: string[] = [];
    for (const p of facts.pools.filter((p) => poolScope(p.file) === scope)) {
      const m = p.line.match(
        /^php_(admin_)?(?:value|flag)\[([^\]]+)\]\s*=\s*(.*)$/,
      );
      if (!m) continue;
      const value = m[3].replace(/;.*$/, "").replace(/^["\s]+|["\s]+$/g, "");
      const key = m[2].trim();
      if (
        [
          "memory_limit",
          "post_max_size",
          "upload_max_filesize",
          "session.upload_progress.enabled",
          "fatal_error_backtraces",
        ].includes(key)
      ) {
        values.set(key, value);
        poolOverrides.push(`${key}=${value} (${p.file})`);
      }
    }
    const defaultsAssumed: string[] = [];
    const get = (key: string, def: string) => {
      const v = values.get(key);
      if (v === undefined) {
        defaultsAssumed.push(`${key}=${def}`);
        return def;
      }
      return v;
    };
    const debianBranch = scope.startsWith("debian:")
      ? scope.split(":")[1]
      : null;
    const has85 = debianBranch ? debianBranch === "8.5" : branches.has("8.5");
    const memoryLimit = get("memory_limit", "128M");
    result.push({
      scope,
      sapi,
      confDir: confDirFor(scope),
      files,
      memoryLimit,
      memoryLimitFinite: memoryLimit.trim() !== "-1",
      postMaxSize: get("post_max_size", "8M"),
      uploadMaxFilesize: get("upload_max_filesize", "2M"),
      sessionUploadProgress: truthy(
        get("session.upload_progress.enabled", "1"),
      ),
      fatalErrorBacktraces: has85
        ? truthy(get("fatal_error_backtraces", "1"))
        : null,
      poolOverrides,
      defaultsAssumed,
    });
  }
  return result;
}

type Exposure = Status["exposure"];

function analyzeExposure(
  facts: ProbeFacts,
  branches: Set<string>,
  servingPhp: boolean,
): Exposure {
  const evidence: string[] = [];
  let publiclyListening = false;

  for (const p of facts.pools) {
    const m = p.line.match(/^listen\s*=\s*(.+)$/);
    if (!m) continue;
    const value = m[1].replace(/;.*$/, "").trim();
    if (fpmListenKind(value) === "public") {
      publiclyListening = true;
      evidence.push(
        `php-fpm accepts FastCGI on all or non-loopback interfaces (listen = ${value} in ${p.file})`,
      );
    }
  }

  const webProcs = facts.processes.filter((p) => WEB_SERVER_PROCESSES.test(p));
  const publicWeb = facts.listeners.filter((l) => {
    const { host, port } = splitHostPort(l.local);
    if (port === null || isLoopback(host)) return false;
    if (l.process) return WEB_SERVER_PROCESSES.test(l.process);
    return [80, 443, 8080, 8443].includes(port);
  });
  if (servingPhp && publicWeb.length > 0) {
    publiclyListening = true;
    for (const l of publicWeb) {
      evidence.push(
        `web server listening on ${l.local}${
          l.process ? ` (${l.process})` : ""
        } passes requests to PHP`,
      );
    }
  }
  if (webProcs.length > 0) {
    evidence.push(`web server processes running: ${webProcs.join(", ")}`);
  }

  let containersNote: string | null = null;
  if (facts.dockerDenied) {
    containersNote =
      `Docker is installed but containers were not inspected: ${facts.dockerDenied}`;
  }

  return {
    publiclyListening,
    evidence,
    phpHandoff: facts.handoff,
    iniScopes: resolveIniScopes(facts, branches),
    perRequestIniOverrides: facts.overrides,
    htaccessScanTruncated: facts.htaccessTruncated,
    containersInspected: facts.dockerDenied === null,
    containersNote,
  };
}

type InstallDraft = Omit<
  Install,
  "verdict" | "fixedVersion" | "action" | "risk" | "note" | "branch"
>;

function packageFor(
  facts: ProbeFacts,
  owner: string | null,
): { name: string; version: string } | null {
  if (!owner) return null;
  const direct = facts.packages.find((p) => p.name === owner);
  if (direct) return { name: direct.name, version: direct.version };
  const apk = splitApkName(owner);
  if (apk.version) return apk;
  return { name: owner, version: "" };
}

function collectInstalls(facts: ProbeFacts): InstallDraft[] {
  const drafts: InstallDraft[] = [];
  const apacheRunning = facts.processes.some((p) =>
    /^(apache2|httpd)$/.test(p)
  );

  for (const b of facts.binaries) {
    const pkg = packageFor(facts, b.owner);
    const sapi = sapiFromVersionLine(b.path, b.versionLine);
    drafts.push({
      kind: "binary",
      path: b.path,
      sapi,
      version: versionFromLine(b.versionLine),
      source: pkg ? "distro" : "upstream",
      packageName: pkg?.name ?? null,
      packageVersion: pkg?.version || null,
      // Every Windows build ships php-cgi.exe; it serves only when IIS,
      // nginx or Apache hands requests to it, or it is running.
      serving: SERVING_SAPIS.has(sapi) &&
        (facts.os.id !== "windows" || sapi !== "cgi" ||
          facts.handoff.length > 0 || facts.processes.includes("php-cgi")),
      publiclyReachable: false,
    });
  }

  for (const m of facts.modPhp) {
    const pkg = packageFor(facts, m.owner);
    const base = m.path.split(/[\\/]/).pop() ?? m.path;
    const bm = base.match(/libphp(\d+\.\d+)|mod_php(\d)(\d+)/);
    const branch = bm ? (bm[1] ?? `${bm[2]}.${bm[3]}`) : null;
    let version: string | null = m.version;
    if (!version && pkg?.version) {
      const up = parseUpstream(pkg.version);
      version = up ? up.join(".") : null;
    }
    if (!version) {
      const sameBranch = drafts.find((d) =>
        d.kind === "binary" && d.version &&
        (branch === null || d.version.startsWith(`${branch}.`)) &&
        (pkg ? d.source === "distro" : d.source === "upstream")
      );
      version = sameBranch?.version ?? null;
    }
    drafts.push({
      kind: "mod_php",
      path: m.path,
      sapi: "apache2handler",
      version,
      source: pkg ? "distro" : "upstream",
      packageName: pkg?.name ?? null,
      packageVersion: pkg?.version || null,
      serving: facts.modPhpEnabled.length > 0 || apacheRunning,
      publiclyReachable: false,
    });
  }

  for (const c of facts.containers) {
    if (!c.phpVersion && !/php/i.test(c.image)) continue;
    const sapi: z.infer<typeof Sapi> = /frankenphp/i.test(c.image)
      ? "frankenphp"
      : /apache/i.test(c.image)
      ? "apache2handler"
      : /fpm/i.test(c.image)
      ? "fpm"
      : "cli";
    drafts.push({
      kind: "container",
      path: `${c.name} (${c.id.slice(0, 12)}, ${c.image})`,
      sapi,
      version: c.phpVersion,
      source: "docker-image",
      packageName: null,
      packageVersion: null,
      serving: sapi !== "cli",
      publiclyReachable: /(^|[\s,])(0\.0\.0\.0|\[?::\]?):\d+->/.test(c.ports),
    });
  }
  return drafts;
}

/** The upstream part of a Debian version: no epoch, no revision. */
function debUpstream(v: string): string {
  return v.replace(/^\d+:/, "").replace(/-[^-]*$/, "");
}

/** Decides an install's verdict from its version, source and the distro data. */
export function verdictFor(
  d: {
    version: string | null;
    source: "upstream" | "distro" | "docker-image";
    packageName: string | null;
    packageVersion: string | null;
  },
  ctx: {
    osId: string;
    osVersionId: string;
    pendingPackages: Set<string>;
  },
): {
  verdict: z.infer<typeof Verdict>;
  branch: string | null;
  fixedVersion: string | null;
  note: string;
} {
  const c = classifyVersion(d.packageVersion ?? d.version);
  if (c.status === "patched") {
    return {
      verdict: "patched",
      branch: c.branch,
      fixedVersion: c.fixedVersion,
      note: `at or above the fixed release ${c.fixedVersion}`,
    };
  }
  if (d.source === "distro") {
    const src = d.packageName ? debSourcePackage(d.packageName) : null;
    // A backport keeps the distro's old upstream number (8.3.6); a build
    // from another repo (ppa:ondrej/php, 8.3.35-1+deb.sury.org) sorts above
    // it without the fix, so the tracker only speaks for its own upstream.
    const entry = DISTRO_FIXES.find((e) =>
      e.distro === ctx.osId && e.release === ctx.osVersionId &&
      e.sourcePackage === src &&
      (!d.packageVersion ||
        debUpstream(d.packageVersion) === debUpstream(e.fixedVersion))
    );
    if (
      entry && d.packageVersion &&
      compareDebVersions(d.packageVersion, entry.fixedVersion) >= 0
    ) {
      return {
        verdict: "patched",
        branch: c.branch,
        fixedVersion: entry.fixedVersion,
        note: `distro backport ${entry.fixedVersion} (${entry.reference})`,
      };
    }
    if (d.packageName && ctx.pendingPackages.has(d.packageName)) {
      return {
        verdict: "update-available",
        branch: c.branch,
        fixedVersion: entry?.fixedVersion ?? c.fixedVersion,
        note: "the package manager offers a newer package",
      };
    }
    if (entry) {
      return {
        verdict: "update-available",
        branch: c.branch,
        fixedVersion: entry.fixedVersion,
        note:
          `${entry.reference} fixes this in ${entry.fixedVersion}; refresh package lists to see it`,
      };
    }
    // Sury's packages follow upstream releases and backport nothing.
    if (!/deb\.sury\.org/.test(d.packageVersion ?? "")) {
      return {
        verdict: "check-vendor",
        branch: c.branch,
        fixedVersion: c.fixedVersion,
        note:
          `distro build below the upstream fix with no tracker entry in the ${TRACKER_SNAPSHOT} snapshot; your vendor may have backported the fix`,
      };
    }
  }
  if (c.status === "unknown") {
    return {
      verdict: "unknown",
      branch: c.branch,
      fixedVersion: null,
      note: c.branch
        ? `PHP ${c.branch} is not covered by the advisories`
        : "PHP version could not be determined",
    };
  }
  return {
    verdict: c.status,
    branch: c.branch,
    fixedVersion: c.fixedVersion,
    note: c.status === "unsupported"
      ? `PHP ${c.branch} gets no upstream fix`
      : `below the fixed release ${c.fixedVersion}`,
  };
}

const AFFECTED = new Set(["vulnerable", "unsupported", "update-available"]);
const UNCERTAIN = new Set(["check-vendor", "unknown"]);
const RISK_ORDER: RiskLevelT[] = [
  "unknown",
  "none",
  "low",
  "medium",
  "high",
  "critical",
];
const ACTION_ORDER: HostActionT[] = [
  "unreachable",
  "needs-privilege",
  "isolate",
  "upgrade",
  "rebuild-image",
  "manual-upgrade",
  "check-vendor",
  "restart",
  "none",
];

function installRisk(i: Omit<Install, "action" | "risk">): RiskLevelT {
  if (i.verdict === "patched") return "none";
  if (AFFECTED.has(i.verdict)) {
    if (!i.serving) return "medium";
    if (i.sapi === "apache2handler" || i.sapi === "frankenphp") {
      return "critical";
    }
    return i.publiclyReachable ? "critical" : "high";
  }
  return i.serving ? "high" : "low";
}

function installAction(
  i: Omit<Install, "action" | "risk">,
  inContainer: boolean,
): z.infer<typeof InstallAction> {
  if (i.verdict === "patched") return "none";
  if (i.source === "docker-image" || inContainer) return "rebuild-image";
  if (i.verdict === "update-available") return "upgrade";
  if (UNCERTAIN.has(i.verdict)) return "check-vendor";
  // A distro-packaged build judged by upstream (Sury): the repo has the fix.
  if (i.source === "distro") {
    return i.verdict === "vulnerable" ? "upgrade" : "check-vendor";
  }
  return i.serving ? "isolate" : "manual-upgrade";
}

function fixedList(): string {
  return Object.values(FIXED_VERSIONS).join(", ");
}

/** Turns probe facts into the status resource for one target. */
export function analyze(
  facts: ProbeFacts,
  target: string,
  opts: { inContainer: boolean; timestamp?: string },
): Status {
  const inContainer = opts.inContainer || facts.inContainer;
  const drafts = collectInstalls(facts);
  const pendingPackages = new Set(facts.pending.map((p) => p.name));

  const servingPhp = facts.handoff.length > 0 ||
    drafts.some((d) => d.kind !== "container" && d.serving);
  const branchesPre = new Set(
    drafts.map((d) => classifyVersion(d.packageVersion ?? d.version).branch)
      .filter((b): b is string => b !== null),
  );
  const exposure = analyzeExposure(facts, branchesPre, servingPhp);

  const installs: Install[] = drafts.map((d) => {
    const v = verdictFor(d, {
      osId: facts.os.id,
      osVersionId: facts.os.versionId,
      pendingPackages,
    });
    const publiclyReachable = d.kind === "container"
      ? d.publiclyReachable
      : d.serving && exposure.publiclyListening;
    const base = {
      ...d,
      publiclyReachable,
      verdict: v.verdict,
      branch: v.branch,
      fixedVersion: v.fixedVersion,
      note: v.note,
    };
    return {
      ...base,
      risk: installRisk(base),
      action: installAction(base, inContainer),
    };
  });

  let riskLevel: RiskLevelT = "none";
  for (const i of installs) {
    if (RISK_ORDER.indexOf(i.risk) > RISK_ORDER.indexOf(riskLevel)) {
      riskLevel = i.risk;
    }
  }
  // Workers that predate the installed PHP still run the old code.
  const stale = facts.stale.map((s) => `${s.process}: ${s.path}`);
  if (
    stale.length > 0 &&
    RISK_ORDER.indexOf(riskLevel) < RISK_ORDER.indexOf("high")
  ) {
    riskLevel = "high";
  }
  const vulnerable = installs.some((i) => AFFECTED.has(i.verdict));
  const actionSet = new Set<HostActionT>(installs.map((i) => i.action));
  if (stale.length > 0) actionSet.add("restart");
  actionSet.delete("none");
  const actions = ACTION_ORDER.filter((a) => actionSet.has(a));
  const action: HostActionT = actions[0] ?? "none";

  const recommendations = buildRecommendations(
    installs,
    exposure,
    facts,
    inContainer,
  );
  const hostname = facts.hostname || target;
  const affectedCount = installs.filter((i) => AFFECTED.has(i.verdict)).length;
  const uncertainCount =
    installs.filter((i) => UNCERTAIN.has(i.verdict)).length;
  let summary: string;
  if (installs.length === 0) {
    summary = `No PHP installation found on ${hostname}.`;
  } else if (stale.length > 0 && affectedCount === 0 && uncertainCount === 0) {
    summary =
      `${hostname}: PHP on disk is patched, but ${stale.length} process(es) still run the replaced binary until restarted.`;
  } else if (affectedCount === 0 && uncertainCount === 0) {
    summary = `${hostname}: all ${installs.length} PHP install(s) are patched.`;
  } else {
    const parts = [];
    if (affectedCount > 0) parts.push(`${affectedCount} affected`);
    if (uncertainCount > 0) {
      parts.push(`${uncertainCount} to check with the vendor`);
    }
    summary =
      `${hostname} is ${riskLevel}-risk for CVE-2026-109618/CVE-2026-109619: ${
        parts.join(", ")
      } of ${installs.length} PHP install(s)${
        exposure.publiclyListening ? ", publicly listening" : ""
      }.`;
  }

  return {
    scanTimestamp: opts.timestamp ?? new Date().toISOString(),
    target,
    hostname,
    os: facts.os,
    inContainer,
    runAsRoot: facts.uid === 0,
    vulnerable,
    riskLevel,
    action,
    actions,
    summary,
    error: null,
    cves: ADVISORY.cves,
    installs,
    exposure,
    pendingUpdates: facts.pending.map((p) => `${p.name} ${p.newVersion}`),
    packageListsUpdatedAt: facts.aptListsEpoch
      ? new Date(facts.aptListsEpoch * 1000).toISOString()
      : null,
    indicators: {
      hintsOnly: true,
      note:
        "The advisories publish no indicators of compromise and say exploitation can leave no predictable log entry. These counts are hints for review, not proof either way.",
      logHints: facts.logs.filter((l) => l.matches > 0),
    },
    unreadable: facts.unreadable,
    staleProcesses: stale,
    recommendations,
    trackerSnapshot: TRACKER_SNAPSHOT,
    mitigation: null,
  };
}

function buildRecommendations(
  installs: Install[],
  exposure: Exposure,
  facts: ProbeFacts,
  inContainer: boolean,
): string[] {
  const recs: string[] = [];
  if (installs.length === 0) {
    recs.push("No PHP installation found — no action required.");
  }
  if (facts.stale.length > 0) {
    recs.push(
      `PHP processes still run a binary replaced on disk (${
        facts.stale.map((s) => `${s.process}: ${s.path}`).join(", ")
      }): restart PHP-FPM or the web server so they load the installed PHP${
        inContainer ? " (restart the container)" : "; mitigate restarts them"
      }.`,
    );
  }
  const upgradable = installs.filter((i) => i.action === "upgrade");
  if (upgradable.length > 0) {
    const pkgs = [...new Set(upgradable.map((i) => i.packageName))].join(", ");
    recs.push(
      `Upgrade ${pkgs} through the package manager and restart PHP workers: run mitigate (dry run first).`,
    );
  }
  for (const i of installs.filter((i) => i.action === "rebuild-image")) {
    const what = i.kind === "container"
      ? `container ${i.path}`
      : `this container's image (PHP ${i.version ?? "unknown"})`;
    recs.push(
      `Rebuild ${what} on PHP ${
        i.fixedVersion ?? `${fixedList()}`
      } or newer and redeploy; containers are not changed in place.`,
    );
  }
  for (const i of installs.filter((i) => i.action === "isolate")) {
    recs.push(
      `${i.path} (PHP ${i.version}) serves requests and has no automatic fix here: keep it off public networks until it runs ${
        i.fixedVersion ?? "a supported, fixed branch"
      }.`,
    );
  }
  for (const i of installs.filter((i) => i.action === "manual-upgrade")) {
    recs.push(
      `${i.path} (PHP ${i.version}) is not managed by a package manager mitigate can drive: reinstall it at ${
        i.fixedVersion ?? "a supported, fixed branch"
      } or newer.`,
    );
  }
  if (
    facts.os.id === "windows" &&
    installs.some((i) => i.verdict !== "patched" && i.kind !== "container")
  ) {
    recs.push(
      "On Windows, download the fixed build from https://windows.php.net/download/ with the same thread safety (TS or NTS) and architecture, replace the PHP directory's files, then restart IIS (iisreset) or Apache.",
    );
  }
  const vendorGroups = new Map<string, string[]>();
  for (const i of installs.filter((i) => i.action === "check-vendor")) {
    const key = `${i.packageVersion ?? i.version ?? ""}|${i.note}`;
    vendorGroups.set(key, [
      ...(vendorGroups.get(key) ?? []),
      i.packageName ?? i.path,
    ]);
  }
  for (const [key, names] of vendorGroups) {
    const [version, note] = key.split("|");
    recs.push(
      `${
        [...new Set(names)].join(", ")
      } ${version}: ${note}. Check your vendor's advisory.`,
    );
  }
  if (installs.some((i) => i.verdict === "unsupported")) {
    recs.push(
      "PHP 8.1 and older get no upstream fix: move to a supported branch, use a vendor backport, or build from php.net's source backports for 7.4, 8.0 and 8.1.",
    );
  }
  const exposed = installs.some((i) => i.serving && i.verdict !== "patched");
  if (exposed) {
    for (const s of exposure.iniScopes.filter((s) => s.sapi !== "cli")) {
      const partial: string[] = [];
      if (s.sessionUploadProgress) {
        partial.push("session.upload_progress.enabled=0");
      }
      if (s.memoryLimitFinite) partial.push("memory_limit=-1");
      if (s.fatalErrorBacktraces) partial.push("fatal_error_backtraces=0");
      if (partial.length > 0) {
        const how = inContainer
          ? "set them in the image's php.ini until it is rebuilt"
          : facts.os.id === "windows"
          ? "set them in php.ini and restart the web server"
          : "mitigate with applyConfigMitigations=true writes them";
        recs.push(
          `Until upgraded, the advisories' partial mitigations for ${s.scope} are ${
            partial.join(", ")
          } (${how}). They do not make PHP safe.`,
        );
      }
    }
    if (exposure.perRequestIniOverrides.length > 0) {
      recs.push(
        "Per-request INI overrides (php_value, .htaccess, PHP_VALUE) were found; diagnostics they raise before request startup are a CVE-2026-109619 trigger. Remove invalid or deprecated ones.",
      );
    }
  }
  if (exposure.htaccessScanTruncated) {
    recs.push(
      "The .htaccess scan stopped at 500 files; overrides beyond that were not checked.",
    );
  }
  if (exposure.containersNote) recs.push(exposure.containersNote);
  if (
    facts.aptListsEpoch !== null &&
    facts.aptListsEpoch < Date.parse(ADVISORY_PUBLISHED_AT) / 1000 &&
    installs.some((i) => i.verdict === "check-vendor")
  ) {
    recs.push(
      "Package lists predate the fix; run apt-get update (mitigate does) before trusting check-vendor results.",
    );
  }
  for (const l of facts.logs.filter((l) => l.matches > 0)) {
    recs.push(
      `${l.matches} worker crash or memory-exhaustion line(s) in ${l.file}: review them. They are hints, not proof of compromise.`,
    );
  }
  return [...new Set(recs)];
}

// --- Transport ---------------------------------------------------------------

type Transport =
  | { kind: "local" }
  | { kind: "ssh"; args: string[] }
  | { kind: "docker"; container: string };

export type RunResult = { stdout: string; stderr: string; exitCode: number };
/** "powershell" runs the command as a script read from stdin (Windows). */
export type Shell = "sh" | "powershell";
export type Runner = (
  command: string,
  timeoutMs?: number,
  shell?: Shell,
  input?: string,
) => Promise<RunResult>;

function present(val: string | undefined): string | undefined {
  return val && val.length > 0 ? val : undefined;
}

/** Quotes a word for POSIX sh only when it needs quoting. */
export function shQuote(s: string): string {
  if (/^[A-Za-z0-9_\-.\/:@%+,=]+$/.test(s)) return s;
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

function isLocalHost(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

function buildTransport(g: {
  targetHost: string;
  sshUser: string;
  sshKey?: string;
  dockerContainer?: string;
}): Transport {
  const container = present(g.dockerContainer);
  if (container) return { kind: "docker", container };
  if (isLocalHost(g.targetHost)) return { kind: "local" };
  const args = [
    "-o",
    "BatchMode=yes",
    "-o",
    "StrictHostKeyChecking=accept-new",
    "-o",
    "ConnectTimeout=10",
  ];
  if (present(g.sshKey)) args.push("-i", g.sshKey!);
  args.push("--", `${g.sshUser}@${g.targetHost}`);
  return { kind: "ssh", args };
}

function targetLabel(g: { targetHost: string; dockerContainer?: string }) {
  const container = present(g.dockerContainer);
  if (container) return `docker-${container.slice(0, 12)}`;
  return g.targetHost;
}

/** Probe and preflight limit; package-manager steps get UPGRADE_TIMEOUT_MS. */
export const DEFAULT_TIMEOUT_MS = 180_000;
export const UPGRADE_TIMEOUT_MS = 1_800_000;
/** Exit code a runner reports when it killed a command for running too long. */
export const TIMEOUT_EXIT = 124;

/** Ends a PowerShell script sent on stdin. */
export const POWERSHELL_END = "# swamp-probe-end";

/**
 * Windows command lines are too short for the probe, so a small launcher
 * reads it from stdin. The launcher stops at POWERSHELL_END rather than at
 * EOF, which Windows OpenSSH can lose, and is passed base64-encoded so
 * cmd.exe and PowerShell login shells leave it alone.
 */
const POWERSHELL_LAUNCHER = [
  "$b = New-Object Text.StringBuilder",
  `while ($true) { $l = [Console]::In.ReadLine(); if ($null -eq $l -or $l -eq '${POWERSHELL_END}') { break }; [void]$b.AppendLine($l) }`,
  "Invoke-Expression $b.ToString()",
].join("\n");

function encodePowerShell(script: string): string {
  let bin = "";
  for (let i = 0; i < script.length; i++) {
    const c = script.charCodeAt(i);
    bin += String.fromCharCode(c & 0xff, c >> 8);
  }
  return btoa(bin);
}

export const POWERSHELL_ARGV = [
  "powershell",
  "-NoProfile",
  "-NonInteractive",
  "-EncodedCommand",
  encodePowerShell(POWERSHELL_LAUNCHER),
];

/** How long to keep reading a finished command's pipes. */
const PIPE_GRACE_MS = 2_000;

/**
 * Reads a stream as it arrives. The returned function waits for the end, but
 * at most graceMs: a killed command's pipes can stay open in a process that
 * inherited them (an ssh ControlMaster, a daemon it started).
 */
function collect(
  stream: ReadableStream<Uint8Array>,
): (graceMs: number) => Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  const finished = (async () => {
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) return;
        chunks.push(value);
      }
    } catch {
      // Cancelled below.
    }
  })();
  return async (graceMs: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([
      finished,
      new Promise((resolve) => (timer = setTimeout(resolve, graceMs))),
    ]);
    clearTimeout(timer);
    await reader.cancel().catch(() => {});
    const bytes = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let offset = 0;
    for (const c of chunks) {
      bytes.set(c, offset);
      offset += c.length;
    }
    return new TextDecoder().decode(bytes).trim();
  };
}

export function makeRunner(transport: Transport, logger: Logger): Runner {
  return async (
    command: string,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    shell: Shell = "sh",
    input?: string,
  ) => {
    const ps = shell === "powershell";
    const stdin = ps ? `${command}\n${POWERSHELL_END}\n` : input;
    const shArgv = ps ? POWERSHELL_ARGV : ["sh", "-c", command];
    let cmd: string[];
    switch (transport.kind) {
      case "docker":
        cmd = [
          "docker",
          "exec",
          ...(stdin !== undefined ? ["-i"] : []),
          transport.container,
        ];
        cmd.push(...shArgv);
        break;
      case "ssh":
        cmd = [
          "ssh",
          ...transport.args,
          ps ? POWERSHELL_ARGV.join(" ") : `sh -c ${shQuote(command)}`,
        ];
        break;
      default:
        cmd = shArgv;
    }
    logger.debug(
      `Running on ${transport.kind} (${shell}): ${command.slice(0, 200)}`,
    );
    const signal = AbortSignal.timeout(timeoutMs);
    // The transport itself: sh, ssh or docker exec, with fixed arguments.
    // swamp-quality-ignore deno-command
    const child = new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      stdin: stdin !== undefined ? "piped" : "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).spawn();
    const stdoutText = collect(child.stdout);
    const stderrText = collect(child.stderr);
    if (stdin !== undefined) {
      const writer = child.stdin.getWriter();
      await writer.write(new TextEncoder().encode(stdin)).catch(() => {});
      await writer.close().catch(() => {});
    }
    const status = await child.status;
    const [stdout, stderr] = await Promise.all([
      stdoutText(PIPE_GRACE_MS),
      stderrText(PIPE_GRACE_MS),
    ]);
    if (signal.aborted) {
      return {
        stdout,
        stderr: `timed out after ${timeoutMs / 1000}s${
          stderr ? `: ${stderr}` : ""
        }`,
        exitCode: TIMEOUT_EXIT,
      };
    }
    return { stdout, stderr, exitCode: status.code };
  };
}

async function startDockerImage(
  image: string,
  logger: Logger,
): Promise<string> {
  // swamp-quality-ignore deno-command
  const output = await new Deno.Command("docker", {
    args: [
      "run",
      "-d",
      "--rm",
      "--entrypoint",
      "sh",
      image,
      "-c",
      "sleep 3600",
    ],
    stdout: "piped",
    stderr: "piped",
  }).output();
  const containerId = new TextDecoder().decode(output.stdout).trim();
  if (output.code !== 0) {
    const stderr = new TextDecoder().decode(output.stderr).trim();
    throw new Error(`Failed to start container from ${image}: ${stderr}`);
  }
  logger.info(`Started container ${containerId.slice(0, 12)} from ${image}`);
  return containerId;
}

async function stopContainer(containerId: string, logger: Logger) {
  // swamp-quality-ignore deno-command
  await new Deno.Command("docker", {
    args: ["stop", "-t", "1", containerId],
    stdout: "piped",
    stderr: "piped",
  }).output();
  logger.info(`Stopped container ${containerId.slice(0, 12)}`);
}

// --- Scanning ----------------------------------------------------------------

/** Runs the probe through a runner and analyzes the result. */
export async function scanTarget(
  run: Runner,
  target: string,
  opts: { inContainer: boolean },
): Promise<{ status: Status; facts: ProbeFacts }> {
  let r = await run(PROBE_SCRIPT);
  if (
    WINDOWS_SH.test(r.stdout) ||
    (!r.stdout.includes("HOSTNAME|") && NO_SH.test(r.stderr + r.stdout))
  ) {
    // A Windows host: the sh probe cannot see its PHP layouts, or there is
    // no sh at all. The PowerShell probe prints the same facts.
    r = await run(WINDOWS_PROBE_SCRIPT, DEFAULT_TIMEOUT_MS, "powershell");
  }
  if (!r.stdout.includes("HOSTNAME|")) {
    throw new Error(
      `Cannot execute commands on ${target}: ${
        r.stderr || `probe produced no output (exit ${r.exitCode})`
      }`,
    );
  }
  const facts = parseProbe(r.stdout);
  // A probe cut short (dropped connection, timeout) must not read as "no PHP".
  if (!facts.complete) {
    throw new Error(
      `Incomplete scan of ${target}: the probe stopped before finishing (exit ${r.exitCode}${
        r.stderr ? `, ${r.stderr}` : ""
      })`,
    );
  }
  return { status: analyze(facts, target, opts), facts };
}

async function writeScanLog(log: FileWriter, status: Status) {
  await log.writeLine(
    `Host: ${status.hostname} (${status.os.prettyName || "unknown OS"})\n`,
  );
  await log.writeLine(`\n=== PHP installs (${status.installs.length}) ===\n`);
  for (const i of status.installs) {
    await log.writeLine(
      `${i.path} [${i.sapi}] PHP ${i.version ?? "?"} ${
        i.packageName ? `(${i.packageName} ${i.packageVersion ?? ""}) ` : ""
      }→ ${i.verdict}, ${i.action}: ${i.note}\n`,
    );
  }
  await log.writeLine(`\n=== Exposure ===\n`);
  await log.writeLine(
    `Publicly listening: ${status.exposure.publiclyListening ? "yes" : "no"}\n`,
  );
  for (const e of status.exposure.evidence) await log.writeLine(`  ${e}\n`);
  for (const s of status.exposure.iniScopes) {
    await log.writeLine(
      `ini ${s.scope}: memory_limit=${s.memoryLimit} post_max_size=${s.postMaxSize} session.upload_progress=${
        s.sessionUploadProgress ? "on" : "off"
      }${
        s.fatalErrorBacktraces === null
          ? ""
          : ` fatal_error_backtraces=${s.fatalErrorBacktraces ? "on" : "off"}`
      }\n`,
    );
  }
  await log.writeLine(`\n=== Result: ${status.riskLevel.toUpperCase()} ===\n`);
  await log.writeLine(`${status.summary}\n`);
}

function errorStatus(target: string, err: unknown): Status {
  const message = err instanceof Error ? err.message : String(err);
  return {
    scanTimestamp: new Date().toISOString(),
    target,
    hostname: target,
    os: { id: "", versionId: "", prettyName: "" },
    inContainer: false,
    runAsRoot: false,
    vulnerable: false,
    riskLevel: "unknown",
    action: "unreachable",
    actions: ["unreachable"],
    summary: `Scan failed on ${target}: ${message}`,
    error: message,
    cves: ADVISORY.cves,
    installs: [],
    exposure: {
      publiclyListening: false,
      evidence: [],
      phpHandoff: [],
      iniScopes: [],
      perRequestIniOverrides: [],
      htaccessScanTruncated: false,
      containersInspected: false,
      containersNote: null,
    },
    pendingUpdates: [],
    packageListsUpdatedAt: null,
    indicators: { hintsOnly: true, note: "", logHints: [] },
    unreadable: [],
    staleProcesses: [],
    recommendations: [`Fix connectivity to ${target} and scan again.`],
    trackerSnapshot: TRACKER_SNAPSHOT,
    mitigation: null,
  };
}

function instanceName(label: string): string {
  return label.replace(/[\/\\]/g, "_").replace(/\.\./g, "_");
}

/** Comma-separated hosts, deduplicated; local aliases count as one host. */
export function hostList(hosts: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of hosts.split(",")) {
    const h = raw.trim();
    if (!h) continue;
    const key = isLocalHost(h) ? "localhost" : h;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(h);
  }
  return result;
}

// --- Mitigation --------------------------------------------------------------

export type MitigationStep = {
  phase: "upgrade" | "harden" | "restart";
  argv: string[];
  privileged: boolean;
  purpose: string;
  /** Runs only if installs are still unpatched after the upgrade phase. */
  conditional: boolean;
  /** For harden steps: the drop-in content staged before argv runs. */
  content?: string;
};

/**
 * The drop-in for one ini scope. post_max_size is only written when it lowers
 * the current limit (0 means unlimited), so the drop-in never loosens it.
 */
export function dropInContent(
  scope: IniScope,
  postMaxSize: string,
): { content: string; postMaxSizeWritten: boolean } {
  const lines = [
    "; Written by @swamp/cve/php-rce-2026-10 for CVE-2026-109618 and CVE-2026-109619.",
    "; Partial mitigation from the php.net advisory; only upgrading PHP fixes it.",
    "memory_limit = -1",
  ];
  const current = sizeBytes(scope.postMaxSize);
  const lower = !(current > 0) || current > sizeBytes(postMaxSize);
  if (lower) lines.push(`post_max_size = ${postMaxSize}`);
  lines.push("session.upload_progress.enabled = 0");
  if (scope.fatalErrorBacktraces !== null) {
    lines.push("fatal_error_backtraces = 0");
  }
  return { content: lines.join("\n") + "\n", postMaxSizeWritten: lower };
}

/**
 * PHP itself and its extensions. Versioned names (php8.2-fpm, php82-pecl-redis,
 * libapache2-mod-php8.2) always are. Unversioned ones (RHEL's php-fpm and
 * php-mysqlnd) count only at the version of a PHP install's own package,
 * since they share it; libraries and applications with the prefix (php-twig,
 * phpmyadmin) are versioned independently and left alone.
 */
const PHP_VERSIONED =
  /^(php\d+(\.\d+)?(-[a-z0-9]+)*|libapache2-mod-php\d+(\.\d+)?)$/;
const PHP_UNVERSIONED = /^php(-[a-z0-9]+)*$/;

/** Plans the mitigation commands for one scanned host, without running them. */
export function planMitigation(
  status: Status,
  facts: ProbeFacts,
  opts: { applyConfigMitigations: boolean; postMaxSize: string },
): { steps: MitigationStep[]; notes: string[] } {
  const steps: MitigationStep[] = [];
  const notes: string[] = [];
  if (status.inContainer) {
    notes.push(
      "Target is a container: rebuild its image on a fixed PHP release instead of changing it in place.",
    );
    return { steps, notes };
  }
  if (facts.os.id === "windows") {
    if (status.installs.some((i) => i.verdict !== "patched")) {
      notes.push(
        "Windows hosts are scanned only: mitigate does not change them. Install the fixed build from windows.php.net by hand.",
      );
    }
    return { steps, notes };
  }

  const unpatched = status.installs.filter((i) =>
    i.verdict !== "patched" && i.kind !== "container"
  );
  for (
    const i of status.installs.filter((i) =>
      i.kind === "container" && i.verdict !== "patched"
    )
  ) {
    notes.push(
      `Container ${i.path}: rebuild on a fixed PHP image; not changed in place.`,
    );
  }
  const stale = facts.stale.length > 0;
  if (unpatched.length === 0 && !stale) return { steps, notes };

  const distro = unpatched.filter((i) => i.source === "distro");
  const runtimeVersions = new Set(
    status.installs.map((i) => i.packageVersion).filter((v) => v !== null),
  );
  if (distro.length > 0) {
    const manager = facts.packages[0]?.manager;
    const names = [
      ...new Set(
        facts.packages.filter((p) =>
          PHP_VERSIONED.test(p.name) ||
          (PHP_UNVERSIONED.test(p.name) && runtimeVersions.has(p.version))
        ).map((p) => p.name),
      ),
    ].sort();
    if (manager === "dpkg" && facts.tools["apt-get"]) {
      steps.push({
        phase: "upgrade",
        argv: ["apt-get", "update"],
        privileged: true,
        purpose: "Refresh package lists",
        conditional: false,
      });
      steps.push({
        phase: "upgrade",
        argv: [
          "apt-get",
          "install",
          "--only-upgrade",
          "-y",
          "-o",
          "Dpkg::Options::=--force-confdef",
          "-o",
          "Dpkg::Options::=--force-confold",
          ...names,
        ],
        privileged: true,
        purpose: "Upgrade installed PHP packages, keeping local config files",
        conditional: false,
      });
    } else if (
      manager === "rpm" && (facts.tools["dnf"] || facts.tools["yum"])
    ) {
      steps.push({
        phase: "upgrade",
        argv: [facts.tools["dnf"] ? "dnf" : "yum", "upgrade", "-y", ...names],
        privileged: true,
        purpose: "Upgrade installed PHP packages",
        conditional: false,
      });
    } else if (manager === "apk" && facts.tools["apk"]) {
      steps.push({
        phase: "upgrade",
        argv: ["apk", "update"],
        privileged: true,
        purpose: "Refresh package indexes",
        conditional: false,
      });
      steps.push({
        phase: "upgrade",
        argv: ["apk", "add", "--upgrade", ...names],
        privileged: true,
        purpose: "Upgrade installed PHP packages",
        conditional: false,
      });
    } else {
      notes.push(
        "No supported package manager found for the PHP packages; upgrade them by hand.",
      );
    }
  }

  const servingUnpatched = unpatched.some((i) => i.serving);
  const unpatchedBranches = new Set(
    unpatched.map((i) => i.version?.match(/^\d+\.\d+/)?.[0]),
  );
  if (opts.applyConfigMitigations && servingUnpatched) {
    for (const scope of status.exposure.iniScopes) {
      if (scope.sapi === "cli" || !scope.confDir) continue;
      // A patched branch's conf.d (another PHP on the same host) needs nothing.
      const branch = scopeBranch(scope.scope);
      if (branch && !unpatchedBranches.has(branch)) continue;
      const dropIn = dropInContent(scope, opts.postMaxSize);
      steps.push({
        phase: "harden",
        argv: ["tee", `${scope.confDir}/${DROP_IN_NAME}`],
        privileged: true,
        purpose: `Write the advisory's partial mitigations for ${scope.scope}`,
        conditional: steps.some((s) => s.phase === "upgrade"),
        content: dropIn.content,
      });
      if (!dropIn.postMaxSizeWritten) {
        notes.push(
          `${scope.scope}: post_max_size is already ${scope.postMaxSize}, at or below ${opts.postMaxSize}; left unchanged.`,
        );
      } else if (
        sizeBytes(scope.uploadMaxFilesize) >= sizeBytes(opts.postMaxSize)
      ) {
        notes.push(
          `${scope.scope}: post_max_size drops from ${scope.postMaxSize} to ${opts.postMaxSize}, but upload_max_filesize=${scope.uploadMaxFilesize} is not below it; uploads that size will fail until you lower upload_max_filesize or pass a larger postMaxSize.`,
        );
      } else {
        notes.push(
          `${scope.scope}: post_max_size drops from ${scope.postMaxSize} to ${opts.postMaxSize}; larger uploads will be rejected.`,
        );
      }
    }
  } else if (servingUnpatched && !opts.applyConfigMitigations) {
    notes.push(
      "Hosts still unpatched after this run should be isolated; re-run with applyConfigMitigations=true to also write the advisory's partial ini mitigations.",
    );
  }

  if (steps.length > 0 || stale) {
    const hasModPhp = status.installs.some((i) => i.kind === "mod_php");
    const units = facts.services.filter((s) =>
      /^php.*fpm.*\.service$/.test(s) ||
      (hasModPhp && /^(apache2|httpd)\.service$/.test(s)) ||
      /^(frankenphp|lsws|lshttpd)\.service$/.test(s)
    );
    if (facts.tools["systemctl"] && units.length > 0) {
      for (const unit of units) {
        steps.push({
          phase: "restart",
          argv: ["systemctl", "restart", unit],
          privileged: true,
          purpose: `Restart ${unit} so workers load the new PHP`,
          conditional: false,
        });
      }
    } else {
      notes.push(
        "No running PHP service units were found to restart; restart PHP-FPM or the web server by hand after the change.",
      );
    }
  }
  return { steps, notes };
}

/** The PHP branch an ini scope belongs to, when its name says ("8.2"). */
function scopeBranch(scope: string): string | null {
  const debian = scope.match(/^debian:(\d+\.\d+):/);
  if (debian) return debian[1];
  const packed = scope.match(/^(remi|alpine):php(\d)(\d+)$/);
  return packed ? `${packed[2]}.${packed[3]}` : null;
}

function sizeBytes(v: string): number {
  const m = v.trim().match(/^(-?\d+)\s*([KMG]?)$/i);
  if (!m) return Number.NaN;
  const mult = { "": 1, K: 1024, M: 1024 ** 2, G: 1024 ** 3 }[
    m[2].toUpperCase() as "" | "K" | "M" | "G"
  ];
  return Number(m[1]) * mult;
}

/** The command line a step runs, as root or through non-interactive sudo. */
export function renderStep(
  step: MitigationStep,
  tools: Record<string, string>,
  asRoot: boolean,
): string {
  const argv = [...step.argv];
  if (step.privileged) argv[0] = tools[argv[0]] ?? argv[0];
  const line = argv.map(shQuote).join(" ");
  if (!step.privileged || asRoot) return line;
  return `sudo -n -- ${line}`;
}

/** The argv a privileged step runs, with the binary resolved on the host. */
function stepArgv(step: MitigationStep, tools: Record<string, string>) {
  return [tools[step.argv[0]] ?? step.argv[0], ...step.argv.slice(1)];
}

/**
 * Builds the sudo preflight: one "sudo -n -l <command>" per privileged step,
 * so sudoers rules scoped to these exact commands pass, then the long
 * listing. "sudo -n -l" alone also passes a rule that asks for a password
 * whenever the user has any NOPASSWD rule, so the listing decides that.
 */
export function preflightScript(
  steps: MitigationStep[],
  tools: Record<string, string>,
): string {
  const sudo = shQuote(tools["sudo"] ?? "sudo");
  return [
    "export LC_ALL=C",
    ...steps.map((s, i) =>
      `if ${sudo} -n -l ${
        stepArgv(s, tools).map(shQuote).join(" ")
      } >/dev/null 2>&1; then echo "OK|${i}"; else echo "NO|${i}"; fi`
    ),
    "echo '@@ sudo-ll'",
    `${sudo} -n -ll 2>/dev/null`,
  ].join("\n");
}

/** One entry of `sudo -ll`: who it runs as, its options and commands. */
type SudoEntry = { runAs: string[]; options: string[]; commands: string[] };

/** Parses `sudo -ll` output into its Defaults options and its entries. */
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
 * that entry's options decide. An empty listing refuses.
 */
export function runsWithoutPassword(
  argv: string[],
  list: { defaults: string[]; entries: SudoEntry[] },
): boolean {
  const asRoot = list.entries.filter((e) =>
    e.runAs.length === 0 || e.runAs.includes("ALL") || e.runAs.includes("root")
  );
  const last = asRoot.filter((e) =>
    e.commands.some((c) => sudoItemMatches(c, argv))
  ).at(-1);
  if (!last) return false;
  if (last.options.includes("!authenticate")) return true;
  if (last.options.includes("authenticate")) return false;
  return list.defaults.includes("!authenticate");
}

/**
 * Indexes of the steps the preflight allowed: "sudo -n -l" said OK and the
 * rule that allows it needs no password. A missing line counts as a refusal.
 */
export function allowedSteps(
  steps: MitigationStep[],
  tools: Record<string, string>,
  output: string,
): Set<number> {
  const lines = output.split("\n");
  const at = lines.indexOf("@@ sudo-ll");
  const list = parseSudoList(at === -1 ? [] : lines.slice(at + 1));
  const allowed = new Set<number>();
  for (const line of at === -1 ? lines : lines.slice(0, at)) {
    const i = Number(line.match(/^OK\|(\d+)$/)?.[1] ?? NaN);
    if (steps[i] && runsWithoutPassword(stepArgv(steps[i], tools), list)) {
      allowed.add(i);
    }
  }
  return allowed;
}

export type HostMitigation = { status: Status; mitigation: Mitigation };

function packagesChanged(before: ProbeFacts, after: ProbeFacts): boolean {
  const key = (f: ProbeFacts) =>
    f.packages.map((p) => `${p.name}=${p.version}`).sort().join(",");
  return key(before) !== key(after);
}

export async function mitigateTarget(
  run: Runner,
  target: string,
  opts: {
    dryRun: boolean;
    applyConfigMitigations: boolean;
    postMaxSize: string;
    inContainer: boolean;
  },
  log: FileWriter,
): Promise<HostMitigation> {
  await log.writeLine(`Scanning ${target}...\n`);
  const first = await scanTarget(run, target, {
    inContainer: opts.inContainer,
  });
  await writeScanLog(log, first.status);

  const { steps, notes } = planMitigation(first.status, first.facts, opts);
  const asRoot = first.status.runAsRoot;
  const base: Mitigation = {
    dryRun: opts.dryRun,
    applyConfigMitigations: opts.applyConfigMitigations,
    postMaxSize: opts.postMaxSize,
    privilege: "not-needed",
    missingPrivileges: [],
    outcome: "not-needed",
    steps: [],
    notes,
  };

  if (steps.length === 0) {
    const nothingToDo = first.facts.stale.length === 0 &&
      first.status.installs.every((i) => i.verdict === "patched");
    base.outcome = nothingToDo ? "not-needed" : "no-automatic-fix";
    await log.writeLine(
      `\nNo commands to run on ${target} (${base.outcome}).\n`,
    );
    return { status: { ...first.status, mitigation: base }, mitigation: base };
  }

  const tools = first.facts.tools;
  const record = steps.map((s) => ({
    phase: s.phase,
    command: renderStep(s, tools, asRoot),
    privileged: s.privileged,
    purpose: s.purpose +
      (s.conditional ? " (only if still unpatched after the upgrade)" : ""),
    status: "planned" as "planned" | "ok" | "failed" | "skipped",
    exitCode: null as number | null,
    output: "",
  }));

  base.privilege = asRoot ? "root" : tools["sudo"] ? "sudo" : "unavailable";
  if (!asRoot) {
    if (!tools["sudo"]) {
      base.missingPrivileges = record.map((r) => r.command);
    } else {
      const pf = await run(preflightScript(steps, tools));
      const ok = allowedSteps(steps, tools, pf.stdout);
      record.forEach((r, i) => {
        if (!ok.has(i)) base.missingPrivileges.push(r.command);
      });
    }
    if (base.missingPrivileges.length > 0) {
      base.privilege = "unavailable";
      base.outcome = "needs-privilege";
      base.steps = record;
      base.notes.push(
        "Not run: this user cannot run these commands with non-interactive sudo. Run them as root, or allow them in sudoers (see README).",
      );
      await log.writeLine(`\nNeeds privilege — not attempted:\n`);
      for (const c of base.missingPrivileges) await log.writeLine(`  ${c}\n`);
      const status: Status = {
        ...first.status,
        action: "needs-privilege",
        actions: ["needs-privilege", ...first.status.actions],
        mitigation: base,
      };
      return { status, mitigation: base };
    }
  }

  if (opts.dryRun) {
    for (const r of record) {
      await log.writeLine(`[DRY RUN] Would execute: ${r.command}\n`);
    }
    base.steps = record;
    base.outcome = "dry-run";
    return { status: { ...first.status, mitigation: base }, mitigation: base };
  }

  base.steps = record;
  let failed = false;
  let upgraded = false;
  let hardened = false;
  let afterUpgrade: { status: Status; facts: ProbeFacts } | null = null;
  // Whether a step ran after afterUpgrade was taken (a restart, say).
  let ranSinceRescan = false;
  const rescan = async (why: string) => {
    try {
      return await scanTarget(run, target, { inContainer: opts.inContainer });
    } catch (err) {
      failed = true;
      base.notes.push(
        `Rescan ${why} failed: ${err instanceof Error ? err.message : err}`,
      );
      return null;
    }
  };
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const rec = record[i];
    if (step.phase !== "upgrade" && steps[i - 1]?.phase === "upgrade") {
      // Upgrade phase done: did any PHP package actually change?
      afterUpgrade = await rescan("after the upgrade");
      // A failed rescan cannot rule out a change, so restart anyway.
      upgraded = afterUpgrade === null ||
        packagesChanged(first.facts, afterUpgrade.facts);
      ranSinceRescan = false;
    }
    if (step.phase === "harden" && step.conditional) {
      const still = afterUpgrade?.status.installs.some((x) =>
        x.serving && x.verdict !== "patched"
      ) ?? true;
      if (!still) {
        rec.status = "skipped";
        rec.output = "Upgrade reached fixed versions; hardening not needed.";
        continue;
      }
    }
    if (
      step.phase === "restart" && !upgraded && !hardened &&
      first.facts.stale.length === 0
    ) {
      rec.status = "skipped";
      rec.output = "No PHP package or ini file changed.";
      continue;
    }
    await log.writeLine(`Executing: ${rec.command}\n`);
    // tee writes the drop-in from stdin, so nothing is staged where another
    // user could swap it.
    const r = await run(
      step.phase === "harden" ? `${rec.command} >/dev/null` : rec.command,
      step.phase === "upgrade" ? UPGRADE_TIMEOUT_MS : DEFAULT_TIMEOUT_MS,
      "sh",
      step.phase === "harden" ? step.content ?? "" : undefined,
    );
    ranSinceRescan = true;
    rec.exitCode = r.exitCode;
    rec.output = (r.stdout + (r.stderr ? `\n${r.stderr}` : "")).slice(-2000);
    rec.status = r.exitCode === 0 ? "ok" : "failed";
    await log.writeLine(`  exit=${r.exitCode}\n`);
    if (r.exitCode !== 0) failed = true;
    else if (step.phase === "harden") hardened = true;
  }
  if (!afterUpgrade && steps.at(-1)?.phase === "upgrade") {
    afterUpgrade = await rescan("after the upgrade");
    ranSinceRescan = false;
  }

  // Reuse the post-upgrade scan only when nothing ran after it; a restart
  // changes which binaries the workers map.
  const final = afterUpgrade && !ranSinceRescan
    ? afterUpgrade
    : await rescan("after mitigation");
  base.outcome = failed ? "partial" : "applied";
  if (!final) {
    // Keep the record of what ran; the last good scan stands in.
    return {
      status: { ...first.status, mitigation: base },
      mitigation: base,
    };
  }
  await log.writeLine(`\nRescan after mitigation:\n`);
  await writeScanLog(log, final.status);
  const remaining = final.status.installs.filter((i) =>
    i.serving && i.kind !== "container" && i.verdict !== "patched"
  );
  let status: Status = { ...final.status, mitigation: base };
  if (remaining.length > 0) {
    base.notes.push(
      `Still not patched after this run: ${
        remaining.map((i) => `${i.path} (${i.packageVersion ?? i.version})`)
          .join(", ")
      }. Keep the host off public networks until a fixed build is installed.`,
    );
    if (remaining.some((i) => i.publiclyReachable)) {
      status = {
        ...status,
        action: "isolate",
        actions: ["isolate", ...status.actions.filter((a) => a !== "isolate")],
      };
    }
  }
  return { status, mitigation: base };
}

// --- Model -------------------------------------------------------------------

export const model = {
  type: "@swamp/cve/php-rce-2026-10",
  version: "2026.10.21.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  reports: ["@swamp/cve/php-rce-2026-10-report"],
  resources: {
    status: {
      description:
        "Exposure assessment for CVE-2026-109618 and CVE-2026-109619 (PHP RCE, 2026-10-21)",
      schema: StatusSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
  },
  files: {
    log: {
      description: "Scan execution log",
      contentType: "text/plain",
      lifetime: "7d",
      garbageCollection: 5,
      streaming: true,
    },
  },
  methods: {
    scan: {
      description:
        "Scan a single host or container for PHP installs exposed to CVE-2026-109618 and CVE-2026-109619",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;

        let autoContainer: string | undefined;
        if (present(g.dockerImage) && !present(g.dockerContainer)) {
          autoContainer = await startDockerImage(g.dockerImage!, logger);
          g.dockerContainer = autoContainer;
        }

        const transport = buildTransport(g);
        const label = present(g.dockerImage) && autoContainer
          ? g.dockerImage!
          : targetLabel(g);
        const log = context.createFileWriter("log", instanceName(label));
        await log.writeLine(
          `[${
            new Date().toISOString()
          }] Starting PHP RCE (CVE-2026-109618/109619) scan\n`,
        );
        await log.writeLine(`Target: ${label}\n\n`);

        try {
          const { status } = await scanTarget(
            makeRunner(transport, logger),
            label,
            { inContainer: transport.kind === "docker" },
          );
          await writeScanLog(log, status);
          const handle = await context.writeResource(
            "status",
            instanceName(label),
            status,
          );
          return { dataHandles: [handle] };
        } finally {
          if (autoContainer) await stopContainer(autoContainer, logger);
          await log.finalize();
        }
      },
    },

    scanFleet: {
      description:
        "Scan multiple hosts in parallel over SSH. Pass a comma-separated list of hosts with a shared SSH user and key.",
      arguments: z.object({
        hosts: z
          .string()
          .describe("Comma-separated list of host IPs or hostnames to scan"),
      }),
      execute: async (args: { hosts: string }, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const hosts = hostList(args.hosts);
        const summaryLog = context.createFileWriter("log", "fleet");
        await summaryLog.writeLine(
          `[${
            new Date().toISOString()
          }] PHP RCE fleet scan: ${hosts.length} host(s)\n\n`,
        );

        const settled = await Promise.allSettled(hosts.map(async (host) => {
          const hostLog = context.createFileWriter("log", instanceName(host));
          try {
            // Written first so finalize() cannot mask a scan error.
            await hostLog.writeLine(
              `[${new Date().toISOString()}] Scanning ${host}\n`,
            );
            const transport = buildTransport({
              targetHost: host,
              sshUser: g.sshUser,
              sshKey: present(g.sshKey),
            });
            const { status } = await scanTarget(
              makeRunner(transport, logger),
              host,
              { inContainer: false },
            );
            await writeScanLog(hostLog, status);
            return status;
          } finally {
            await hostLog.finalize();
          }
        }));

        const handles = [];
        let affected = 0;
        let errors = 0;
        for (let i = 0; i < settled.length; i++) {
          const outcome = settled[i];
          const status = outcome.status === "fulfilled"
            ? outcome.value
            : errorStatus(hosts[i], outcome.reason);
          if (status.error) errors++;
          else if (status.vulnerable) affected++;
          handles.push(
            await context.writeResource(
              "status",
              instanceName(hosts[i]),
              status,
            ),
          );
          await summaryLog.writeLine(
            `${
              hosts[i]
            }: ${status.riskLevel.toUpperCase()} — ${status.summary}\n`,
          );
        }
        await summaryLog.writeLine(
          `\nFLEET SUMMARY: ${hosts.length} scanned, ${affected} affected, ${errors} errors\n`,
        );
        await summaryLog.finalize();
        return { dataHandles: handles };
      },
    },

    mitigate: {
      description:
        "Scan, then upgrade PHP through the package manager and restart workers on affected hosts. dryRun defaults to true; containers are reported for rebuild, never changed.",
      arguments: z.object({
        dryRun: z
          .boolean()
          .default(true)
          .describe("If true, only print the commands without executing them"),
        hosts: z
          .string()
          .optional()
          .describe(
            "Comma-separated list of hosts to mitigate (overrides targetHost)",
          ),
        applyConfigMitigations: z
          .boolean()
          .default(false)
          .describe(
            "Also write the advisory's partial ini mitigations (memory_limit=-1, session.upload_progress.enabled=0, post_max_size, fatal_error_backtraces=0 on 8.5) where no fixed package is installed",
          ),
        postMaxSize: z
          .string()
          // 0 would mean unlimited in PHP, the opposite of the mitigation.
          .regex(/^[1-9]\d*[KMG]?$/i)
          .default("32M")
          .describe(
            "post_max_size for the ini mitigation: the advisory suggests 8M without uploads, 32M with",
          ),
      }),
      execute: async (
        args: {
          dryRun: boolean;
          hosts?: string;
          applyConfigMitigations: boolean;
          postMaxSize: string;
        },
        context: MethodContext,
      ) => {
        const g = context.globalArgs;
        const logger = context.logger;
        let autoContainer: string | undefined;
        let targets: { label: string; transport: Transport }[];
        if (present(args.hosts)) {
          targets = hostList(args.hosts!).map((h) => ({
            label: h,
            transport: buildTransport({
              targetHost: h,
              sshUser: g.sshUser,
              sshKey: present(g.sshKey),
            }),
          }));
        } else if (present(g.dockerImage) && !present(g.dockerContainer)) {
          // An image model must never fall back to targetHost (localhost):
          // start the image as scan does, so it is reported for a rebuild.
          autoContainer = await startDockerImage(g.dockerImage!, logger);
          targets = [{
            label: g.dockerImage!,
            transport: { kind: "docker", container: autoContainer },
          }];
        } else {
          targets = [{ label: targetLabel(g), transport: buildTransport(g) }];
        }

        const settled = await Promise.allSettled(targets.map(async (t) => {
          const log = context.createFileWriter("log", instanceName(t.label));
          try {
            await log.writeLine(
              `[${new Date().toISOString()}] PHP RCE mitigation${
                args.dryRun ? " (DRY RUN)" : ""
              }: ${t.label}\n`,
            );
            return await mitigateTarget(
              makeRunner(t.transport, logger),
              t.label,
              {
                dryRun: args.dryRun,
                applyConfigMitigations: args.applyConfigMitigations,
                postMaxSize: args.postMaxSize,
                inContainer: t.transport.kind === "docker",
              },
              log,
            );
          } finally {
            await log.finalize();
          }
        }));
        if (autoContainer) await stopContainer(autoContainer, logger);

        const handles = [];
        for (let i = 0; i < settled.length; i++) {
          const outcome = settled[i];
          const status = outcome.status === "fulfilled"
            ? outcome.value.status
            : errorStatus(targets[i].label, outcome.reason);
          handles.push(
            await context.writeResource(
              "status",
              instanceName(targets[i].label),
              status,
            ),
          );
        }
        return { dataHandles: handles };
      },
    },
  },
};
