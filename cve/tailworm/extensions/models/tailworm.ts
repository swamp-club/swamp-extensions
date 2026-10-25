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
 * Tailworm scanner: finds hosts exposed to the Tailscale v1.104.2 and
 * headscale v0.29.5 findings published at tailworm.com on 2026-10-24
 * (Tailscale SSH unix-socket forwarding as root, serve forwards to the
 * localapi socket, conn25 app-connector egress, headscale memory exhaustion).
 * Scans local, SSH or Docker targets, looks for the report's forensic
 * signatures, and applies the report's interim operator mitigations.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";

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

/** The Tailworm report: no CVEs or vendor bulletin had been issued for it. */
export const ADVISORY = {
  name: "Tailworm",
  url: "https://tailworm.com",
  published: "2026-10-24",
  researcher: "Erica Windisch, Cyberdione Labs",
  auditedTailscale: "1.104.2",
  auditedHeadscale: "0.29.5",
};

/**
 * First Tailscale release that fixes the Tailworm findings. None had shipped
 * when this was written; set it here (or with the fixedVersion global
 * argument) once Tailscale publishes one.
 */
export const FIXED_TAILSCALE_VERSION: string | null = null;

/** Earlier 2026 Tailscale bulletins a client build can still be missing. */
export const BULLETINS: {
  id: string;
  fixed: string;
  severity: "critical" | "high" | "medium";
  title: string;
}[] = [
  {
    id: "TS-2026-004",
    fixed: "1.98.9",
    severity: "critical",
    title: "SSH unix socket forwarding ignored symlink permissions",
  },
  {
    id: "TS-2026-005",
    fixed: "1.98.9",
    severity: "critical",
    title: "Serve unix socket proxy targets not restricted to root",
  },
  {
    id: "TS-2026-006",
    fixed: "1.98.9",
    severity: "critical",
    title: "SSH numeric UIDs bypassed root restrictions",
  },
  {
    id: "TS-2026-007",
    fixed: "1.98.9",
    severity: "high",
    title: "Services inbound filtering allowed loopback listeners",
  },
  {
    id: "TS-2026-008",
    fixed: "1.98.9",
    severity: "high",
    title: "Malformed HTTP request pins CPU in Serve/Funnel",
  },
  {
    id: "TS-2026-009",
    fixed: "1.98.9",
    severity: "critical",
    title: "SSH usernames with leading dash allowed root access",
  },
  {
    id: "TS-2026-010",
    fixed: "1.102.1",
    severity: "high",
    title: "Tailscale SSH exposed acceptEnv values",
  },
  {
    id: "TS-2026-011",
    fixed: "1.102.3",
    severity: "high",
    title: "4via6 subnet router access to host-scoped addresses",
  },
  {
    id: "TS-2026-013",
    fixed: "1.104.2",
    severity: "medium",
    title: "Leaked private keys for eMudhra TLS intermediate certificates",
  },
];

/** Where mitigate writes its files on the target. */
export const NFT_FILE = "/etc/tailworm-egress.nft";
export const NFT_CGROUP_FILE = "/etc/tailworm-egress-cgroup.nft";
export const AUDIT_FILE = "/etc/audit/rules.d/tailworm.rules";
/**
 * Whether tailscaled's cgroup is its own system service unit. Only root can
 * create units under system.slice, so a user's process named tailscaled in a
 * user unit cannot redirect the rule; and in a shared cgroup (a login scope,
 * a supervisor) the rule would cut every process there off from IMDS.
 */
export function ownServiceUnit(cgroup: string | null): boolean {
  return !!cgroup &&
    /^\/system\.slice\/tailscaled[A-Za-z0-9@_.-]*\.service$/.test(cgroup);
}

/** Reloads the nftables files after every tailscaled start. */
export function tailscaledDropIn(nft: string, withCgroup: boolean): string {
  return [
    "# Written by @swamp/cve/tailworm. The cgroup rule binds to the cgroup",
    "# tailscaled has when it loads, and a restart replaces that cgroup, so",
    "# both files are reloaded after every start. '-' keeps a load failure",
    "# from failing tailscaled.",
    "[Service]",
    `ExecStartPost=-${nft} -f ${NFT_FILE}`,
    ...(withCgroup ? [`ExecStartPost=-${nft} -f ${NFT_CGROUP_FILE}`] : []),
  ].join("\n") + "\n";
}

export const HEADSCALE_DROP_IN_DIR = "/etc/systemd/system/headscale.service.d";
export const HEADSCALE_DROP_IN = `${HEADSCALE_DROP_IN_DIR}/50-tailworm.conf`;

/** Cloud metadata: the conn25 and ssh -L pivot target the report names. */
const METADATA_V4 = "169.254.0.0/16";
const METADATA_V6 = "fd00:ec2::254";

/** Directories Tailscale SSH lets a session forward unix sockets in. */
const FORWARD_DIRS = ["/tmp/", "/home/", "/run/user/", "/root/"];

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
  fixedVersion: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .optional()
    .describe(
      "First Tailscale release that fixes Tailworm, once Tailscale publishes one (e.g. 1.104.4). Hosts at or above it are not flagged for the code findings.",
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
const Severity = z.enum(["critical", "high", "medium", "low"]);

const ExposureSchema = z.object({
  id: z.string(),
  findings: z.array(z.string()),
  severity: Severity,
  title: z.string(),
  detail: z.string(),
});

const IndicatorSchema = z.object({
  id: z.string(),
  severity: Severity,
  detail: z.string(),
});

/** The SSH rules control sent this node, as tailscaled enforces them. */
const SshPolicySchema = z.object({
  // false without root/operator access to the netmap: the rest is unknown.
  readable: z.boolean(),
  acceptRules: z.number(),
  checkRules: z.number(),
  sources: z.number(),
  anySource: z.boolean(),
  rootAllowed: z.boolean(),
  anyUser: z.boolean(),
  // Granted by an accept rule; check rules decide it after the check.
  localForwarding: z.boolean(),
  remoteForwarding: z.boolean(),
});

const ForwardSchema = z.object({
  port: z.number(),
  target: z.string(),
  resolved: z.string(),
  service: z.string().nullable(),
  foreground: z.boolean(),
  localapi: z.boolean(),
});

const WebProxySchema = z.object({
  /** The host of its Web key, as the serve config stores it. */
  host: z.string(),
  /**
   * The host is the one tailscale serve off acts on: the node's DNS name, or
   * the service's name under the tailnet's MagicDNS suffix.
   */
  current: z.boolean(),
  port: z.number(),
  mount: z.string(),
  /** From the port's TCP entry; null when it says neither HTTPS nor HTTP. */
  scheme: z.enum(["https", "http"]).nullable(),
  target: z.string(),
  resolved: z.string(),
  service: z.string().nullable(),
  foreground: z.boolean(),
});

const MitigationOptionsSchema = z.object({
  removeLocalapiForwards: z.boolean(),
  applyEgressRules: z.boolean(),
  applyAuditRules: z.boolean(),
  hardenHeadscale: z.boolean(),
  headscaleMemoryMax: z.string(),
  disableTailscaleSsh: z.boolean(),
  disableAppConnector: z.boolean(),
});

const MitigationSchema = z.object({
  dryRun: z.boolean(),
  options: MitigationOptionsSchema,
  privilege: z.enum(["root", "sudo", "unavailable", "not-needed"]),
  missingPrivileges: z.array(z.string()),
  outcome: z.enum([
    "dry-run",
    "applied",
    "partial",
    "needs-privilege",
    "not-needed",
    "no-automatic-fix",
    "error",
  ]),
  steps: z.array(z.object({
    phase: z.enum([
      "serve",
      "ssh",
      "connector",
      "egress",
      "audit",
      "headscale",
    ]),
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
  kernel: z.string(),
  inContainer: z.boolean(),
  // Scanned through docker exec (dockerContainer or dockerImage), not SSH.
  viaDocker: z.boolean(),
  runAsRoot: z.boolean(),
  vulnerable: z.boolean(),
  riskLevel: RiskLevel,
  summary: z.string(),
  error: z.string().nullable(),
  advisory: z.object({
    name: z.string(),
    url: z.string(),
    published: z.string(),
    fixedVersion: z.string().nullable(),
  }),
  tailscale: z.object({
    installed: z.boolean(),
    // The running daemon's version; the CLI's when the daemon did not answer.
    version: z.string().nullable(),
    cliVersion: z.string().nullable(),
    daemonReachable: z.boolean(),
    running: z.boolean(),
    patched: z.boolean(),
    controlURL: z.string().nullable(),
    selfHostedControl: z.boolean(),
    sshEnabled: z.boolean(),
    appConnector: z.boolean(),
    conn25: z.boolean(),
    funnel: z.boolean(),
    serveAllInterfaces: z.boolean(),
    keyExpiry: z.string().nullable(),
    keyExpiryDisabled: z.boolean(),
    tcpForwards: z.array(ForwardSchema),
    unixProxies: z.array(z.string()),
    // Absent from statuses written before 2026.10.25.1.
    localapiProxies: z.array(WebProxySchema).default([]),
    missingBulletins: z.array(z.string()),
    sshPolicy: SshPolicySchema,
  }),
  headscale: z.object({
    installed: z.boolean(),
    version: z.string().nullable(),
    unitLoaded: z.boolean(),
    memoryMax: z.string().nullable(),
    restart: z.string().nullable(),
    listenAddr: z.string().nullable(),
    publicListen: z.boolean(),
  }),
  exposures: z.array(ExposureSchema),
  defenses: z.object({
    // null when the check needs root and the scan was not root.
    egressRule: z.boolean().nullable(),
    auditRules: z.boolean().nullable(),
  }),
  indicators: z.object({
    socketsChecked: z.boolean(),
    listenersChecked: z.boolean(),
    tailscaledSocket: z.object({ path: z.string(), mode: z.string() })
      .nullable(),
    tailscaledListeners: z.array(z.string()),
    details: z.array(IndicatorSchema),
  }),
  unreadable: z.array(z.string()),
  recommendations: z.array(z.string()),
  mitigation: MitigationSchema.nullable(),
  sshUser: z.string().optional().describe(
    "SSH user given with this host as user@host; absent when the model's sshUser was used",
  ),
  externalProbe: z.boolean().optional().describe(
    "Graded from probe output the caller collected (grade); the model cannot reach this host",
  ),
});

const ProbeSchema = z.object({
  script: z.string().describe(
    "PROBE_SCRIPT, for a transport that takes a script",
  ),
  gzipBase64: z.string().describe("The script gzipped, then base64 encoded"),
  command: z.string().describe(
    "One sh command line that decodes and runs the script; needs base64 and gzip on the host",
  ),
  scriptBytes: z.number(),
  commandBytes: z.number(),
  sha256: z.string().describe("SHA-256 of the script"),
});

export type Status = z.infer<typeof StatusSchema>;
export type Probe = z.infer<typeof ProbeSchema>;
export type Exposure = z.infer<typeof ExposureSchema>;
export type Indicator = z.infer<typeof IndicatorSchema>;
export type Forward = z.infer<typeof ForwardSchema>;
export type WebProxy = z.infer<typeof WebProxySchema>;
export type SshPolicy = z.infer<typeof SshPolicySchema>;
type Mitigation = z.infer<typeof MitigationSchema>;
type RiskLevelT = z.infer<typeof RiskLevel>;
type SeverityT = z.infer<typeof Severity>;

// --- Versions ----------------------------------------------------------------

/** x.y.z from "1.104.2", "1.104.2-t1234abc" or "v0.29.5". */
export function parseVersion(
  v: string | null,
): [number, number, number] | null {
  const m = v?.trim().match(/^v?(\d+)\.(\d+)\.(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

/** Negative when a < b, zero when equal, positive when a > b. */
export function compareVersions(a: string, b: string): number {
  const x = parseVersion(a);
  const y = parseVersion(b);
  if (!x || !y) return Number.NaN;
  for (let i = 0; i < 3; i++) {
    if (x[i] !== y[i]) return x[i] - y[i];
  }
  return 0;
}

// --- Probe -------------------------------------------------------------------

/**
 * Passes when /proc/PID runs as root: real and effective uid 0 from its status
 * file. The owner of /proc/PID is not enough, since the kernel reports it as
 * root for any process that made itself non-dumpable.
 */
export const ROOTPROC_SH =
  `rootproc() { [ "$(awk '/^Uid:/ {print $2 "|" $3; exit}' "/proc/$1/status")" = "0|0" ]; }`;

/**
 * Tags for mitigate's own table, listed into $t: only that table, so an
 * unrelated rule naming tailscaled elsewhere cannot stand in for the metadata
 * block. NFTCGROUP is the cgroup each socket cgroupv2 match is bound to: a
 * quoted path, or a bare id once that cgroup is gone.
 */
export const NFT_TAGS_SH =
  `echo "NFT|$(printf '%s\\n' "$t" | grep -c 'tailscaled')"; printf '%s\\n' "$t" | sed -n 's/.*socket cgroupv2 level [0-9]* \\([^ ]*\\).*/NFTCGROUP|\\1/p'`;

/**
 * Tags for mitigate's own audit rules (key tailworm), listed into $a: an
 * unrelated rule that names tailscaled must not stand in for them.
 */
const AUDIT_TAGS_SH =
  `echo "AUDIT|$(printf '%s\\n' "$a" | grep -cE 'key=tailworm|-k tailworm')"`;

/**
 * Prints tagged facts about Tailscale and headscale on a POSIX host. Nothing
 * here needs root; the listener, nftables and audit checks are skipped
 * without it. Only the TS_ variables the findings concern are read from the
 * daemon's environment, so an auth key in it never leaves the host.
 */
export const PROBE_SCRIPT = `
exec 2>/dev/null
# A non-root login on Debian has no sbin in PATH, where nft, auditctl and
# tailscaled live.
PATH="$PATH:/usr/local/sbin:/usr/sbin:/sbin"; export PATH
names='(TS_SERVE_ALLOW_ALL_INTERFACES|TS_[A-Z0-9_]*CONN25[A-Z0-9_]*)'
${ROOTPROC_SH}
echo "HOSTNAME|$(hostname || cat /etc/hostname)"
echo "UID|$(id -u)"
echo "KERNEL|$(uname -s)"
echo "ARCH|$(uname -m)"
if [ -f /.dockerenv ] || [ -f /run/.containerenv ]; then echo "INCONTAINER|1"; fi
for t in sudo tailscale tailscaled headscale nft auditctl augenrules systemctl tee mkdir ss; do p=$(command -v "$t") && echo "TOOL|$t|$p"; done
if command -v tailscale >/dev/null; then
  echo "TSVERSION|$(tailscale version | head -n 1)"
  # Only the SSHPolicy key of the netmap is printed: peers, keys and packet
  # filters stay on the host. Reading it needs localapi write access (root or
  # the operator user); NETMAPOK tells a node with no policy from no access.
  if nm=$(tailscale debug netmap); then echo "NETMAPOK|1"; else nm=""; fi
  # The JSON may not end in a newline, so each marker starts a fresh line.
  echo "@@ prefs"; tailscale debug prefs
  echo; echo "@@ serve"; sv=$(tailscale serve status --json); printf '%s\\n' "$sv"
  echo; echo "@@ status"; tailscale status --json --peers=false
  echo; echo "@@ sshpolicy"; printf '%s\\n' "$nm" | awk 'p && (/^\t"/ || /^}/) {exit} /^\t"SSHPolicy": / {p=1} p {print}'
  echo; echo "@@ end"
  # Where each unix socket in the serve config really points, so a symlink to
  # tailscaled.sock is caught from this output alone. Read as data, never run.
  printf '%s\\n' "$sv" | grep -o '"unix:[^"]*"' | sed -e 's/^"unix://' -e 's/"$//' | sort -u | head -n 50 | while IFS= read -r u; do
    r=$(readlink -f -- "$u") && [ -n "$r" ] && printf 'RESOLVE|%s|%s\\n' "$u" "$r"
  done
elif command -v tailscaled >/dev/null; then
  echo "TSVERSION|$(tailscaled --version | head -n 1)"
fi
pids=$( (pidof tailscaled || pgrep -x tailscaled) | tr ' ' '\\n' | grep -E '^[0-9]+$')
# Only root instances count as the daemon: any user can run a process named
# tailscaled, and its sockets must not read as the daemon's or as signatures.
rootpids=""
for p in $pids; do
  rootproc "$p" && { rootpids="$rootpids $p"; echo "TSROOTPID|$p"; }
done
# Each instance started with --socket (Synology, custom units) listens there,
# and one started with --tun names its own interface.
for p in $rootpids; do
  n=$(tr '\\0' '\\n' < "/proc/$p/cmdline" | awk 'f {print; exit} /^--?tun=/ {sub(/^--?tun=/, ""); print; exit} /^--?tun$/ {f=1}')
  [ -n "$n" ] && [ "$n" != userspace-networking ] && [ -e "/sys/class/net/$n" ] && echo "TUNIF|$n"
  s=$(tr '\\0' '\\n' < "/proc/$p/cmdline" | awk 'f {print; exit} /^--?socket=/ {sub(/^--?socket=/, ""); print; exit} /^--?socket$/ {f=1}')
  [ -n "$s" ] || continue
  echo "TSDSOCKET|$s"
  [ -S "$s" ] && echo "TSSOCK|$(stat -c '%a|%u' "$s")|$s"
done
# The daemon: a root process in a system unit, not a user's process that is
# merely named tailscaled (its environment and cgroup would be trusted).
pid=""
for p in $pids; do
  rootproc "$p" && grep -q '^0::/.*system[.]slice/' "/proc/$p/cgroup" && { pid=$p; break; }
done
[ -n "$pid" ] || for p in $pids; do rootproc "$p" && { pid=$p; break; }; done
# No root tailscaled: nothing is trusted from a user's process of that name.
if [ -n "$pid" ]; then
  echo "TSDPID|$pid"
  sed -n 's/^0::/CGROUP|/p' "/proc/$pid/cgroup"
  e=$(readlink "/proc/$pid/exe") && echo "TSDEXE|$e"
  if [ -r "/proc/$pid/environ" ]; then tr '\\0' '\\n' < "/proc/$pid/environ" | grep -E "^$names=" | sed 's/^/TSENV|process|/'; fi
fi
if command -v systemctl >/dev/null; then
  systemctl show tailscaled.service -p Environment --value | tr ' ' '\\n' | grep -E "^$names=" | sed 's/^/TSENV|systemd|/'
  systemctl show headscale.service -p LoadState -p ActiveState -p MemoryMax -p Restart | sed 's/^/HSUNIT|/'
fi
for f in /etc/default/tailscaled /etc/sysconfig/tailscaled; do
  [ -r "$f" ] && grep -E "^[[:space:]]*(export[[:space:]]+)?$names=" "$f" | sed -e 's/^[[:space:]]*//' -e 's/^export[[:space:]]*//' -e 's/^/TSENV|file|/'
done
for i in /sys/class/net/tailscale*; do [ -e "$i" ] && echo "TUNIF|$(basename "$i")"; done
for s in /run/tailscale/tailscaled.sock /var/run/tailscale/tailscaled.sock; do
  [ -S "$s" ] || continue
  r=$(readlink -f "$s" || echo "$s")
  echo "TSSOCK|$(stat -c '%a|%u' "$r")|$r"
done
for d in /tmp /run/user /home /root; do [ -d "$d" ] && find "$d" -xdev -maxdepth 4 -type s -user 0 -perm -0055; done | head -n 200 | while IFS= read -r f; do echo "ROOTSOCK|$(stat -c '%a' "$f")|$f"; done
if [ "$(id -u)" = 0 ] && command -v ss >/dev/null; then
  echo "SSCHECKED|1"
  ss -H -xlp | grep '"tailscaled"' | sed 's/^/TSLISTEN|/'
fi
if command -v headscale >/dev/null; then echo "HSVERSION|$(headscale version | head -n 1)"; fi
for f in /etc/headscale/config.yaml /etc/headscale/config.yml; do
  if [ -r "$f" ]; then sed -n 's/^[[:space:]]*listen_addr:[[:space:]]*/HSLISTEN|/p' "$f" | tr -d "\\"'"; elif [ -e "$f" ]; then echo "UNREADABLE|$f"; fi
done
k=$(uname -r)
if grep -qs '/nft_socket[.]ko' "/lib/modules/$k/modules.builtin"; then echo "NFTSOCKET|builtin"
elif find "/lib/modules/$k" -name 'nft_socket.ko*' | grep -q .; then echo "NFTSOCKET|module"
elif [ -r "/boot/config-$k" ]; then grep -qE '^CONFIG_NFT_SOCKET=[ym]' "/boot/config-$k" && echo "NFTSOCKET|config" || echo "NFTSOCKET|absent"
elif [ -r /proc/config.gz ] && command -v zcat >/dev/null; then zcat /proc/config.gz | grep -qE '^CONFIG_NFT_SOCKET=[ym]' && echo "NFTSOCKET|config" || echo "NFTSOCKET|absent"
fi
# A restart leaves a cgroup rule listed but matching nothing unless it is
# reloaded after every start. The drop-in path is world-readable.
for f in /etc/systemd/system/tailscaled*.service.d/50-tailworm.conf; do [ -f "$f" ] && echo "NFTDROPIN|$f"; done
if [ "$(id -u)" = 0 ]; then
  if command -v nft >/dev/null && out=$(nft list ruleset); then
    printf '%s\\n' "$out" | grep -q '^table inet tailworm' && echo "NFTTABLE|1"
    t=$(nft list table inet tailworm 2>/dev/null)
    ${NFT_TAGS_SH}
  fi
  if command -v auditctl >/dev/null && a=$(auditctl -l); then
    ${AUDIT_TAGS_SH}
  fi
fi
echo "END|1"
`;

export type ProbeFacts = {
  hostname: string;
  uid: number | null;
  kernel: string;
  arch: string;
  inContainer: boolean;
  tools: Record<string, string>;
  tsVersion: string | null;
  prefs: Record<string, unknown> | null;
  serve: Record<string, unknown> | null;
  status: Record<string, unknown> | null;
  /** The netmap's SSHPolicy: undefined when it could not be read. */
  sshPolicy: Record<string, unknown> | null | undefined;
  tailscaledPid: number | null;
  cgroup: string | null;
  tailscaledExe: string | null;
  /** The --socket each tailscaled instance was started with. */
  tailscaledSockets: string[];
  env: Record<string, string>;
  tunInterfaces: string[];
  tsSockets: { path: string; mode: string; uid: string }[];
  rootSockets: { path: string; mode: string }[];
  listenersChecked: boolean;
  /** Unix sockets a root tailscaled listens on. */
  tsListeners: string[];
  /** PIDs of the tailscaled processes that run as root. */
  rootPids: number[];
  /** tailscale debug netmap answered (root or the operator user). */
  netmapOk: boolean;
  hsVersion: string | null;
  hsUnit: Record<string, string>;
  hsListen: string[];
  nftCount: number | null;
  nftTable: boolean;
  /**
   * The cgroup each socket cgroupv2 rule in mitigate's table is bound to,
   * without quotes: a path, or a bare id once that cgroup is gone.
   */
  nftCgroups: string[];
  /** mitigate's reload drop-in for tailscaled's unit is installed. */
  nftDropIn: boolean;
  /** Whether the kernel has nft_socket (socket cgroupv2); null when unknown. */
  nftSocket: "builtin" | "module" | "config" | "absent" | null;
  auditCount: number | null;
  unreadable: string[];
  /**
   * readlink -f of each unix serve target: from the probe's RESOLVE lines,
   * and by scanTarget for any the probe could not resolve.
   */
  resolved: Record<string, string>;
  complete: boolean;
};

/** A Linux interface name (not "." or ".."), at most 15 bytes. */
const IFNAME = /^(?!\.\.?$)[A-Za-z0-9_.-]{1,15}$/;

function parseJson(text: string): Record<string, unknown> | null {
  try {
    const v = JSON.parse(text);
    return v && typeof v === "object" && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

/** The path a `ss -xlp` line listens on: its first absolute or abstract address. */
export function listenerPath(line: string): string | null {
  return line.trim().split(/\s+/).find((t) =>
    t.startsWith("/") || t.startsWith("@")
  ) ?? null;
}

/**
 * The `"SSHPolicy": {...},` line block cut from `tailscale debug netmap`:
 * the policy object, null when the node has none, undefined when nothing
 * was printed (no access to the netmap) or it does not parse.
 */
export function parseSshPolicy(
  block: string,
): Record<string, unknown> | null | undefined {
  const text = block.trim().replace(/,$/, "");
  if (!text.startsWith('"SSHPolicy"')) return undefined;
  try {
    const v = JSON.parse(`{${text}}`).SSHPolicy;
    if (v === null) return null;
    return v && typeof v === "object" && !Array.isArray(v) ? v : undefined;
  } catch {
    return undefined;
  }
}

export function parseProbe(text: string): ProbeFacts {
  const facts: ProbeFacts = {
    hostname: "",
    uid: null,
    kernel: "",
    arch: "",
    inContainer: false,
    tools: {},
    tsVersion: null,
    prefs: null,
    serve: null,
    status: null,
    sshPolicy: undefined,
    tailscaledPid: null,
    cgroup: null,
    tailscaledExe: null,
    tailscaledSockets: [],
    env: {},
    tunInterfaces: [],
    tsSockets: [],
    rootSockets: [],
    listenersChecked: false,
    tsListeners: [],
    rootPids: [],
    netmapOk: false,
    hsVersion: null,
    hsUnit: {},
    hsListen: [],
    nftCount: null,
    nftTable: false,
    nftCgroups: [],
    nftDropIn: false,
    nftSocket: null,
    auditCount: null,
    unreadable: [],
    resolved: {},
    complete: false,
  };
  let section: "prefs" | "serve" | "status" | "sshpolicy" | null = null;
  const listeners: { path: string; pid: number | null }[] = [];
  const resolves: string[] = [];
  const json: Record<string, string[]> = {
    prefs: [],
    serve: [],
    status: [],
    sshpolicy: [],
  };
  for (const line of text.split("\n")) {
    const marker = line.match(/^@@ (\w+)$/);
    if (marker) {
      const name = marker[1];
      section = name === "prefs" || name === "serve" || name === "status" ||
          name === "sshpolicy"
        ? name
        : null;
      continue;
    }
    if (section) {
      json[section].push(line);
      continue;
    }
    const bar = line.indexOf("|");
    if (bar === -1) continue;
    const tag = line.slice(0, bar);
    const rest = line.slice(bar + 1);
    const fields = rest.split("|");
    switch (tag) {
      case "HOSTNAME":
        facts.hostname = rest.trim();
        break;
      case "UID":
        facts.uid = /^\d+$/.test(rest.trim()) ? Number(rest.trim()) : null;
        break;
      case "KERNEL":
        facts.kernel = rest.trim();
        break;
      case "ARCH":
        facts.arch = rest.trim();
        break;
      case "INCONTAINER":
        facts.inContainer = true;
        break;
      case "TOOL":
        if (fields.length >= 2) facts.tools[fields[0]] = fields[1];
        break;
      case "TSVERSION":
        facts.tsVersion = rest.trim() || null;
        break;
      case "TSDPID":
        facts.tailscaledPid = /^\d+$/.test(rest) ? Number(rest) : null;
        break;
      case "CGROUP":
        facts.cgroup = rest.trim() || null;
        break;
      case "TSDEXE":
        facts.tailscaledExe = rest.trim() || null;
        break;
      case "TSDSOCKET": {
        const v = rest.trim();
        if (v && !facts.tailscaledSockets.includes(v)) {
          facts.tailscaledSockets.push(v);
        }
        break;
      }
      case "TSENV": {
        // Process environment wins over unit and defaults files.
        const kv = fields.slice(1).join("|");
        const eq = kv.indexOf("=");
        if (eq > 0) {
          const key = kv.slice(0, eq);
          if (fields[0] === "process" || !(key in facts.env)) {
            facts.env[key] = kv.slice(eq + 1).replace(/^["']|["']$/g, "");
          }
        }
        break;
      }
      case "TUNIF": {
        // Linux interface names only: these go into the nftables file.
        const v = rest.trim();
        if (IFNAME.test(v) && !facts.tunInterfaces.includes(v)) {
          facts.tunInterfaces.push(v);
        }
        break;
      }
      case "TSSOCK": {
        const path = fields.slice(2).join("|");
        if (!facts.tsSockets.some((s) => s.path === path)) {
          facts.tsSockets.push({ mode: fields[0], uid: fields[1], path });
        }
        break;
      }
      case "ROOTSOCK":
        facts.rootSockets.push({
          mode: fields[0],
          path: fields.slice(1).join("|"),
        });
        break;
      case "SSCHECKED":
        facts.listenersChecked = true;
        break;
      case "TSLISTEN": {
        const p = listenerPath(rest);
        // ss lists every process sharing the socket; take tailscaled's own.
        const pid = rest.match(/"tailscaled",pid=(\d+)/)?.[1];
        if (p) listeners.push({ path: p, pid: pid ? Number(pid) : null });
        break;
      }
      case "TSROOTPID":
        if (/^\d+$/.test(rest.trim())) facts.rootPids.push(Number(rest.trim()));
        break;
      case "NETMAPOK":
        facts.netmapOk = true;
        break;
      case "HSVERSION":
        // "headscale version v0.29.5" on 0.29; a bare "v0.x.y" on older builds.
        facts.hsVersion = rest.match(/v?\d+\.\d+\.\d+\S*/)?.[0] ??
          (rest.trim() || null);
        break;
      case "HSUNIT": {
        const eq = rest.indexOf("=");
        if (eq > 0) facts.hsUnit[rest.slice(0, eq)] = rest.slice(eq + 1);
        break;
      }
      case "HSLISTEN": {
        const v = rest.replace(/\s+#.*$/, "").trim();
        if (v) facts.hsListen.push(v);
        break;
      }
      case "NFT":
        facts.nftCount = /^\d+$/.test(rest.trim()) ? Number(rest.trim()) : null;
        break;
      case "NFTTABLE":
        facts.nftTable = true;
        break;
      case "NFTCGROUP": {
        const v = rest.trim().replace(/^"|"$/g, "");
        if (v && !facts.nftCgroups.includes(v)) facts.nftCgroups.push(v);
        break;
      }
      case "NFTDROPIN":
        facts.nftDropIn = true;
        break;
      case "NFTSOCKET": {
        const v = rest.trim();
        if (
          v === "builtin" || v === "module" || v === "config" || v === "absent"
        ) {
          facts.nftSocket = v;
        }
        break;
      }
      case "AUDIT":
        facts.auditCount = /^\d+$/.test(rest.trim())
          ? Number(rest.trim())
          : null;
        break;
      case "UNREADABLE":
        facts.unreadable.push(rest);
        break;
      case "RESOLVE":
        resolves.push(rest);
        break;
      case "END":
        facts.complete = true;
        break;
    }
  }
  facts.prefs = parseJson(json.prefs.join("\n"));
  facts.serve = parseJson(json.serve.join("\n"));
  facts.status = parseJson(json.status.join("\n"));
  facts.sshPolicy = parseSshPolicy(json.sshpolicy.join("\n"));
  // Matched by the path asked about, so a "|" in a path cannot shift it.
  for (const p of unixTargets(facts)) {
    const prefix = `${p}|`;
    for (const r of resolves) {
      if (r.startsWith(prefix) && r.length > prefix.length) {
        facts.resolved[p] = r.slice(prefix.length);
      }
    }
  }
  // Only a root tailscaled's listeners: a user's process named tailscaled
  // must not raise a signature. ss names the pid; without one, keep it.
  for (const l of listeners) {
    const root = l.pid === null || facts.rootPids.includes(l.pid);
    if (root && !facts.tsListeners.includes(l.path)) {
      facts.tsListeners.push(l.path);
    }
  }
  return facts;
}

// --- Analysis ----------------------------------------------------------------

type Obj = Record<string, unknown>;

function obj(v: unknown): Obj {
  return v && typeof v === "object" && !Array.isArray(v) ? v as Obj : {};
}

/** Every TCP forward in a serve config: node, Services and foreground. */
export function serveForwards(
  serve: Obj | null,
): Omit<Forward, "resolved" | "localapi">[] {
  const out: Omit<Forward, "resolved" | "localapi">[] = [];
  const fromTcp = (
    tcp: unknown,
    service: string | null,
    foreground: boolean,
  ) => {
    for (const [port, handler] of Object.entries(obj(tcp))) {
      const target = obj(handler).TCPForward;
      if (typeof target === "string" && target && /^\d+$/.test(port)) {
        out.push({ port: Number(port), target, service, foreground });
      }
    }
  };
  if (!serve) return out;
  fromTcp(serve.TCP, null, false);
  for (const [name, svc] of Object.entries(obj(serve.Services))) {
    fromTcp(obj(svc).TCP, name, false);
  }
  for (const fg of Object.values(obj(serve.Foreground))) {
    fromTcp(obj(fg).TCP, null, true);
    for (const [name, svc] of Object.entries(obj(obj(fg).Services))) {
      fromTcp(obj(svc).TCP, name, true);
    }
  }
  return out;
}

/**
 * Every web handler that proxies to a unix socket ("unix:/path"), with the
 * port and mount that remove it: node, Services and foreground.
 */
export function serveWebProxies(
  serve: Obj | null,
): Omit<WebProxy, "resolved" | "current">[] {
  const out: Omit<WebProxy, "resolved" | "current">[] = [];
  const fromWeb = (
    conf: Obj,
    service: string | null,
    foreground: boolean,
  ) => {
    for (const [hostPort, site] of Object.entries(obj(conf.Web))) {
      const m = hostPort.match(/^(.*):(\d+)$/);
      if (!m) continue;
      const [, host, port] = m;
      const tcp = obj(obj(conf.TCP)[port]);
      const scheme = tcp.HTTPS === true
        ? "https"
        : tcp.HTTP === true
        ? "http"
        : null;
      for (const [mount, h] of Object.entries(obj(obj(site).Handlers))) {
        const target = obj(h).Proxy;
        if (typeof target === "string" && target.startsWith("unix:")) {
          out.push({
            host,
            port: Number(port),
            mount,
            scheme,
            target,
            service,
            foreground,
          });
        }
      }
    }
  };
  if (!serve) return out;
  fromWeb(serve, null, false);
  for (const [name, svc] of Object.entries(obj(serve.Services))) {
    fromWeb(obj(svc), name, false);
  }
  for (const fg of Object.values(obj(serve.Foreground))) {
    fromWeb(obj(fg), null, true);
    for (const [name, svc] of Object.entries(obj(obj(fg).Services))) {
      fromWeb(obj(svc), name, true);
    }
  }
  return out;
}

/** Every web handler that proxies to a unix socket ("unix:/path"). */
export function serveUnixProxies(serve: Obj | null): string[] {
  return [...new Set(serveWebProxies(serve).map((p) => p.target))];
}

function funnelEnabled(serve: Obj | null): boolean {
  if (!serve) return false;
  const on = (s: Obj) => Object.values(obj(s.AllowFunnel)).some((v) => v);
  return on(serve) ||
    Object.values(obj(serve.Foreground)).some((f) => on(obj(f)));
}

/** The unix socket paths serve dials, for scanTarget to resolve. */
export function unixTargets(facts: ProbeFacts): string[] {
  const paths = [
    ...serveForwards(facts.serve).map((f) => f.target),
    ...serveUnixProxies(facts.serve),
  ].filter((t) => t.startsWith("unix:")).map((t) => t.slice(5));
  return [...new Set(paths)];
}

function isLocalapiSocket(path: string, facts: ProbeFacts): boolean {
  const resolved = facts.resolved[path] || path;
  // tailscaled.socket is the macOS open-source daemon's name for it.
  const localapi = /\/tailscaled\.sock(et)?$/;
  return localapi.test(resolved) || localapi.test(path) ||
    facts.tsSockets.some((s) => s.path === resolved);
}

const SAAS_CONTROL = /^https:\/\/(controlplane|login)\.tailscale\.com\/?$/;

function truthy(v: string | undefined): boolean {
  return v !== undefined && /^(1|t|true|yes|on)$/i.test(v.trim());
}

/** The host part of a listen address: "[::1]:8080", "::1", "127.0.0.1:8080". */
export function listenHost(addr: string): string {
  const a = addr.trim();
  const bracketed = a.match(/^\[([^\]]*)\]/);
  if (bracketed) return bracketed[1];
  // More than one colon and no brackets: a bare IPv6 address, no port.
  if ((a.match(/:/g) ?? []).length > 1) return a;
  return a.replace(/:\d*$/, "");
}

export function isPublicListen(addr: string): boolean {
  const host = listenHost(addr);
  return !(host === "localhost" || /^127\./.test(host) || host === "::1");
}

/** Whether an sshUsers map lets a connection log in as root. */
function allowsRoot(users: Obj): boolean {
  // Any login name mapped to root, including root itself ("=" keeps it).
  if (users.root === "root" || users.root === "=") return true;
  if (Object.entries(users).some(([k, v]) => k !== "root" && v === "root")) {
    return true;
  }
  // "root": "" refuses the name root; otherwise "*": "=" lets it through.
  return users.root === undefined && users["*"] === "=";
}

/** Summarises the SSH rules control sent this node. */
export function summarizeSshPolicy(
  policy: Record<string, unknown> | null | undefined,
): SshPolicy {
  const out: SshPolicy = {
    readable: policy !== undefined,
    acceptRules: 0,
    checkRules: 0,
    sources: 0,
    anySource: false,
    rootAllowed: false,
    anyUser: false,
    localForwarding: false,
    remoteForwarding: false,
  };
  // Control lists a device once per address family, so v4 and v6 addresses
  // are counted apart and the larger count stands for the devices.
  const v4 = new Set<string>();
  const v6 = new Set<string>();
  const others = new Set<string>();
  const rules = Array.isArray(policy?.rules) ? policy.rules : [];
  for (const raw of rules) {
    const rule = obj(raw);
    const action = obj(rule.action);
    const check = typeof action.holdAndDelegate === "string" &&
      action.holdAndDelegate !== "";
    if (action.reject === true || (!check && action.accept !== true)) continue;
    if (check) out.checkRules++;
    else out.acceptRules++;
    for (const pr of Array.isArray(rule.principals) ? rule.principals : []) {
      const p = obj(pr);
      if (p.any === true) out.anySource = true;
      if (typeof p.nodeIP === "string" && p.nodeIP) {
        (p.nodeIP.includes(":") ? v6 : v4).add(p.nodeIP);
      } else {
        const id = p.node ?? p.userLogin;
        if (typeof id === "string" && id) others.add(id);
      }
    }
    const users = obj(rule.sshUsers);
    if (allowsRoot(users)) out.rootAllowed = true;
    if (typeof users["*"] === "string" && users["*"] !== "") {
      out.anyUser = true;
    }
    if (action.allowLocalPortForwarding === true) out.localForwarding = true;
    if (action.allowRemotePortForwarding === true) out.remoteForwarding = true;
  }
  out.sources = Math.max(v4.size, v6.size) + others.size;
  return out;
}

const ORDER: RiskLevelT[] = ["none", "low", "medium", "high", "critical"];

function maxRisk(levels: RiskLevelT[]): RiskLevelT {
  return levels.reduce(
    (a, b) => ORDER.indexOf(b) > ORDER.indexOf(a) ? b : a,
    "none" as RiskLevelT,
  );
}

/**
 * The Tailscale SSH exposure, graded by the rules this node enforces when
 * they could be read. Findings 1-3 need forwarding; finding 5 needs only a
 * session.
 */
function sshExposure(
  p: SshPolicy,
  controlURL: string | null,
  netmapOk: boolean,
): Exposure {
  const selfHosted = controlURL !== null && !SAAS_CONTROL.test(controlURL);
  const base = {
    id: "ssh-forwarding",
    findings: ["1", "2", "3", "5"],
    title:
      "Tailscale SSH runs unix-socket forwarding as root (ssh -L/-R, TOCTOU race, session memory growth)",
  };
  if (!p.readable) {
    // Unknown fails closed. Only an explicit "SSHPolicy": null means no
    // rules: a netmap that answered but yielded no parseable block (a format
    // change, a cut that missed) is still unknown, not empty.
    const why = netmapOk
      ? "The netmap answered, but its SSH rules could not be read, so they are treated as permissive."
      : "Scan as root to read the rules this node enforces.";
    return {
      ...base,
      severity: selfHosted ? "critical" : "high",
      detail: selfHosted
        ? `SSH is enabled and this node uses a self-hosted control server (${controlURL}); headscale grants forwarding on every accepted session, so every SSH grant to this node is root-equivalent. ${why}`
        : `SSH is enabled. Any device an SSH policy rule admits can reach root-only unix sockets (docker.sock, /run/systemd/private, tailscaled.sock) through forwarding. ${why}`,
    };
  }
  const rules = p.acceptRules + p.checkRules;
  if (rules === 0) {
    return {
      ...base,
      severity: "low",
      detail:
        "SSH is enabled, but the control server sent this node no SSH rule that admits anyone.",
    };
  }
  const forwarding = p.localForwarding || p.remoteForwarding ||
    p.checkRules > 0;
  const who = `${rules} SSH rule(s) admit ${
    p.anySource ? "any source" : `${p.sources} source(s)`
  }${p.rootAllowed ? " and allow root" : ""}`;
  if (!forwarding) {
    return {
      ...base,
      findings: ["5"],
      severity: "medium",
      detail:
        `${who}. Forwarding is denied, which blocks findings 1-3; any admitted session can still grow tailscaled's memory (finding 5).`,
    };
  }
  const how = p.checkRules > 0 && !p.localForwarding && !p.remoteForwarding
    ? "check-mode rules decide forwarding after the check, and check mode does not limit it"
    : `${
      [p.localForwarding && "local", p.remoteForwarding && "remote"]
        .filter(Boolean).join(" and ")
    } forwarding is allowed`;
  return {
    ...base,
    severity: selfHosted || p.rootAllowed || p.anySource ? "critical" : "high",
    detail:
      `${who}; ${how}. Each admitted device can reach root-only unix sockets on this node (docker.sock, /run/systemd/private, tailscaled.sock).`,
  };
}

export function analyze(
  facts: ProbeFacts,
  target: string,
  opts: { inContainer: boolean; fixedVersion?: string },
): Status {
  const prefs = facts.prefs ?? {};
  const self = obj(facts.status?.Self);
  const fixedVersion = opts.fixedVersion ?? FIXED_TAILSCALE_VERSION;
  const tsInstalled = facts.tsVersion !== null || !!facts.tools["tailscaled"];
  // The daemon is what runs; a package upgrade can leave the CLI ahead of it.
  const cliVersion = parseVersion(facts.tsVersion)
    ? facts.tsVersion!.trim().split(/[\s-]/)[0]
    : null;
  const daemonVersion = typeof facts.status?.Version === "string" &&
      parseVersion(facts.status.Version)
    ? facts.status.Version.trim().split(/[\s-]/)[0]
    : null;
  const version = daemonVersion ?? cliVersion;
  const sshPolicy = summarizeSshPolicy(facts.sshPolicy);
  const patched = !!(version && fixedVersion &&
    compareVersions(version, fixedVersion) >= 0);
  const controlURL = typeof prefs.ControlURL === "string" && prefs.ControlURL
    ? prefs.ControlURL
    : null;
  const selfHostedControl = controlURL !== null &&
    !SAAS_CONTROL.test(controlURL);
  const sshEnabled = prefs.RunSSH === true;
  const appConnector = obj(prefs.AppConnector).Advertise === true;
  const conn25 = Object.keys(obj(self.CapMap)).some((k) => /conn25/i.test(k)) ||
    Object.keys(facts.env).some((k) => /CONN25/.test(k));
  const funnel = funnelEnabled(facts.serve);
  const serveAllInterfaces = truthy(facts.env.TS_SERVE_ALLOW_ALL_INTERFACES);
  const running = facts.status?.BackendState === "Running";
  const keyExpiry = typeof self.KeyExpiry === "string" ? self.KeyExpiry : null;
  const keyExpiryDisabled = running && keyExpiry === null;
  const tcpForwards: Forward[] = serveForwards(facts.serve).map((f) => {
    const path = f.target.startsWith("unix:") ? f.target.slice(5) : "";
    return {
      ...f,
      resolved: path ? facts.resolved[path] || path : f.target,
      localapi: path !== "" && isLocalapiSocket(path, facts),
    };
  });
  const unixProxies = serveUnixProxies(facts.serve);
  // tailscale serve off finds a handler under the node's own DNS name, or
  // under the service's name with the tailnet's MagicDNS suffix; an entry
  // stored under another host (an old name) is out of its reach.
  const nodeHost = typeof self.DNSName === "string"
    ? self.DNSName.replace(/\.$/, "").toLowerCase()
    : "";
  const statusObj = obj(facts.status);
  const suffix = String(
    statusObj.MagicDNSSuffix ??
      obj(statusObj.CurrentTailnet).MagicDNSSuffix ??
      nodeHost.slice(nodeHost.indexOf(".") + 1),
  ).replace(/\.$/, "").toLowerCase();
  const webProxies: (WebProxy & { localapi: boolean })[] = serveWebProxies(
    facts.serve,
  ).map((p) => {
    const path = p.target.slice(5);
    const want = p.service
      ? `${p.service.replace(/^svc:/, "")}.${suffix}`
      : nodeHost;
    return {
      ...p,
      current: nodeHost !== "" && p.host.toLowerCase() === want,
      resolved: facts.resolved[path] || path,
      localapi: isLocalapiSocket(path, facts),
    };
  });
  const localapiProxies: WebProxy[] = webProxies.filter((p) => p.localapi)
    .map(({ localapi: _, ...p }) => p);
  const missingBulletins = version
    ? BULLETINS.filter((b) => compareVersions(version, b.fixed) < 0)
    : [];

  const hsLoaded = facts.hsUnit.LoadState === "loaded";
  const hsInstalled = facts.hsVersion !== null || hsLoaded;
  const memoryMax = facts.hsUnit.MemoryMax ?? null;
  const restart = facts.hsUnit.Restart ?? null;
  const listenAddr = facts.hsListen[0] ?? null;
  const publicListen = listenAddr !== null && isPublicListen(listenAddr);

  const exposures: Exposure[] = [];
  if (tsInstalled && !patched) {
    if (sshEnabled) {
      exposures.push(sshExposure(sshPolicy, controlURL, facts.netmapOk));
    }
    for (const f of tcpForwards.filter((f) => f.localapi)) {
      exposures.push({
        id: "serve-localapi-forward",
        findings: ["7"],
        severity: "critical",
        title: "serve --tcp forwards to the tailscaled localapi socket",
        detail: `Port ${f.port}${
          f.service ? ` (${f.service})` : ""
        } forwards to ${f.target}; tailscaled dials it as root, so any peer the ACLs let reach the port has read/write localapi access (node takeover).`,
      });
    }
    for (const p of localapiProxies) {
      exposures.push({
        id: "serve-localapi-proxy",
        findings: ["7"],
        severity: "critical",
        title: "serve proxies HTTP to the tailscaled localapi socket",
        detail: `Port ${p.port}${p.mount}${
          p.service ? ` (${p.service})` : ""
        } proxies to ${p.target}; tailscaled dials it as root, so any peer the ACLs let reach the port can send localapi requests.`,
      });
    }
    const otherUnix = tcpForwards.filter((f) =>
      f.target.startsWith("unix:") && !f.localapi
    );
    const otherProxies = [
      ...new Set(webProxies.filter((p) => !p.localapi).map((p) => p.target)),
    ];
    if (otherUnix.length > 0 || otherProxies.length > 0) {
      exposures.push({
        id: "serve-unix-forward",
        findings: ["8"],
        severity: "high",
        title: "serve forwards to unix sockets that tailscaled dials as root",
        detail: `Unix targets: ${
          [
            ...otherUnix.map((f) => `${f.target} (tcp ${f.port})`),
            ...otherProxies,
          ]
            .join(", ")
        }. The target is checked once at config time; swapping it for a symlink later makes tailscaled dial any root-only socket.`,
      });
    }
    if (appConnector || conn25) {
      exposures.push({
        id: "app-connector",
        findings: ["4"],
        severity: appConnector ? "high" : "medium",
        title: appConnector
          ? "Node is an app connector: entitled peers choose arbitrary egress destinations"
          : "conn25 configuration present on this node",
        detail: appConnector
          ? "Connector traffic is translated to client-chosen destinations without validation or ACL evaluation: cloud metadata, the connector's LAN and loopback, and (in Kubernetes) every cluster service are reachable."
          : "conn25 capabilities or environment were found. A conn25 client can register arbitrary destinations with any connector it is entitled to.",
      });
    }
    if (funnel) {
      exposures.push({
        id: "funnel",
        findings: ["9"],
        severity: "medium",
        title: "Funnel is enabled",
        detail:
          "The funnel node attribute is enforced only by the CLI; the daemon checks the peer capability and local config. Funnel X-Forwarded-For is only as trustworthy as the ingress relay.",
      });
    }
  }
  if (tsInstalled && serveAllInterfaces) {
    exposures.push({
      id: "serve-all-interfaces",
      findings: ["10"],
      severity: "medium",
      title: "TS_SERVE_ALLOW_ALL_INTERFACES is set",
      detail:
        "Serve listeners are not bound to the tunnel interface: any network that routes to the node's Tailscale IP reaches every serve backend with no WireGuard, ACL or identity headers.",
    });
  }
  if (tsInstalled && keyExpiryDisabled) {
    exposures.push({
      id: "key-expiry-disabled",
      findings: ["containment"],
      severity: "low",
      title: "Node key expiry is disabled",
      detail:
        "A copied state file keeps working until the device is deleted at the control plane. Reimaging the host does not revoke stolen keys.",
    });
  }
  if (missingBulletins.length > 0) {
    exposures.push({
      id: "older-bulletins",
      findings: missingBulletins.map((b) => b.id),
      severity: maxRisk(missingBulletins.map((b) => b.severity)) as SeverityT,
      title:
        `Tailscale ${version} also misses ${missingBulletins.length} published fix(es)`,
      detail: missingBulletins.map((b) =>
        `${b.id} (fixed in ${b.fixed}): ${b.title}`
      ).join("; "),
    });
  }
  if (hsInstalled) {
    const unbounded = hsLoaded && (!memoryMax || memoryMax === "infinity");
    exposures.push({
      id: "headscale-dos",
      findings: ["6"],
      severity: publicListen ? "high" : unbounded ? "medium" : "low",
      title:
        "headscale: unauthenticated memory exhaustion and registration-cache eviction",
      detail: `headscale ${
        facts.hsVersion ?? "(version unknown)"
      }; listen_addr ${listenAddr ?? "unknown"}${
        publicListen ? " (not loopback)" : ""
      }; MemoryMax ${memoryMax ?? "unknown"}; Restart ${
        restart ?? "unknown"
      }. 1024 tiny registrations evict pending approvals; embedded DERP grows without bound.`,
    });
  }

  // Indicators: forensic signatures from the report, which are traces of
  // tailscaled itself. Linux only, and only where Tailscale is installed:
  // elsewhere a root socket says nothing about this attack.
  const linux = facts.kernel === "Linux";
  const signaturesChecked = linux && tsInstalled;
  const indicators: Indicator[] = [];
  const tsSock = facts.tsSockets[0] ?? null;
  if (signaturesChecked) {
    for (const s of facts.tsSockets) {
      if (s.mode !== "666") {
        indicators.push({
          id: "tailscaled-socket-mode",
          severity: "critical",
          detail:
            `${s.path} has mode 0${s.mode}; tailscaled creates it 0666 on Linux. 0600 is the fingerprint of a race-won forward bound over it (finding 3); 0755 of a missed chmod.`,
        });
      }
    }
    // The daemon's own localapi socket, wherever it was put. A forward bound
    // over it is caught by the mode check above.
    const ownSockets = new Set([
      ...facts.tsSockets.map((s) => s.path),
      ...facts.tailscaledSockets,
    ]);
    for (const p of facts.tsListeners) {
      if (
        /\/tailscaled\.sock$/.test(p) || ownSockets.has(p) ||
        p.startsWith("@")
      ) {
        continue;
      }
      const inForwardDir = FORWARD_DIRS.some((d) => p.startsWith(d));
      indicators.push({
        id: "tailscaled-unix-listener",
        severity: inForwardDir ? "medium" : "critical",
        detail: inForwardDir
          ? `tailscaled is listening on ${p}: an active Tailscale SSH -R unix forward. Confirm who opened it.`
          : `tailscaled is listening on ${p}, outside the forwarding directories: a forward has replaced a privileged socket (finding 2/3).`,
      });
    }
    // The race needs a Tailscale SSH session, and plants root sockets where
    // that session can write. Root's own runtime directory and home are not
    // such places: root's systemd user manager binds 0755 sockets in
    // /run/user/0/systemd whenever root logs in.
    const planted = sshEnabled
      ? facts.rootSockets.filter((s) =>
        s.mode === "755" && !s.path.startsWith("/run/user/0/") &&
        !s.path.startsWith("/root/")
      )
      : [];
    for (const s of planted) {
      indicators.push({
        id: "root-socket-0755",
        severity: "high",
        detail:
          `${s.path} is a root-owned socket with mode 0755 in a forwarding directory: the report's forensic signature of a race-won bind whose chmod was redirected. A root daemon that binds there with umask 022 looks the same.`,
      });
    }
  }

  const levels: RiskLevelT[] = [
    ...exposures.map((e) => e.severity),
    ...indicators.map((i) => i.severity),
  ];
  let riskLevel = maxRisk(levels);
  if (riskLevel === "none" && (tsInstalled || hsInstalled)) riskLevel = "low";
  const vulnerable = riskLevel === "critical" || riskLevel === "high" ||
    riskLevel === "medium";
  const runAsRoot = facts.uid === 0;
  const hostname = facts.hostname || target;
  // The cgroup rule is the one that matters; the table alone counts only on
  // a kernel that cannot run it. Under systemd it also needs the reload
  // drop-in: after a tailscaled restart the rule is still listed but no
  // longer matches, and re-planning repairs it.
  // Only the forward chain applies when the cgroup rule cannot.
  const cgroupRuleApplies = facts.nftSocket !== "absent" &&
    ownServiceUnit(facts.cgroup);
  // A failed reload after a restart leaves the old rules listed: they count
  // only while every one is bound to the cgroup tailscaled has now.
  const current = facts.cgroup?.replace(/^\//, "");
  const boundNow = !!current && facts.nftCgroups.length > 0 &&
    facts.nftCgroups.every((c) => c === current);
  const loaded = facts.nftCount !== null &&
    (cgroupRuleApplies
      ? facts.nftCount > 0 && boundNow
      : facts.nftCount > 0 || facts.nftTable);
  // The drop-in is expected only where mitigate writes one: tailscaled in its
  // own system unit, with systemd.
  const dropInApplies = ownServiceUnit(facts.cgroup) &&
    !!facts.tools["systemctl"];
  // Read as root, or by mitigate through sudo; unknown otherwise.
  const egressRule = facts.nftCount !== null
    ? loaded && (facts.nftDropIn || !dropInApplies)
    : null;
  const auditRules = facts.auditCount !== null ? facts.auditCount > 0 : null;

  const status: Status = {
    scanTimestamp: new Date().toISOString(),
    target,
    hostname,
    kernel: facts.kernel,
    inContainer: opts.inContainer || facts.inContainer,
    viaDocker: opts.inContainer,
    runAsRoot,
    vulnerable,
    riskLevel,
    summary: "",
    error: null,
    advisory: {
      name: ADVISORY.name,
      url: ADVISORY.url,
      published: ADVISORY.published,
      fixedVersion,
    },
    tailscale: {
      installed: tsInstalled,
      version,
      cliVersion,
      daemonReachable: facts.prefs !== null,
      running,
      patched,
      controlURL,
      selfHostedControl,
      sshEnabled,
      appConnector,
      conn25,
      funnel,
      serveAllInterfaces,
      keyExpiry,
      keyExpiryDisabled,
      tcpForwards,
      unixProxies,
      localapiProxies,
      missingBulletins: missingBulletins.map((b) => b.id),
      sshPolicy,
    },
    headscale: {
      installed: hsInstalled,
      version: facts.hsVersion,
      unitLoaded: hsLoaded,
      memoryMax,
      restart,
      listenAddr,
      publicListen,
    },
    exposures,
    defenses: { egressRule, auditRules },
    indicators: {
      socketsChecked: signaturesChecked,
      listenersChecked: signaturesChecked && facts.listenersChecked,
      tailscaledSocket: tsSock
        ? { path: tsSock.path, mode: tsSock.mode }
        : null,
      tailscaledListeners: facts.tsListeners,
      details: indicators,
    },
    unreadable: facts.unreadable,
    recommendations: [],
    mitigation: null,
  };
  status.recommendations = buildRecommendations(status);
  status.summary = summarize(status);
  return status;
}

function summarize(s: Status): string {
  if (!s.tailscale.installed && !s.headscale.installed) {
    return `${s.hostname}: neither Tailscale nor headscale is installed.`;
  }
  if (s.indicators.details.some((i) => i.severity === "critical")) {
    return `${s.hostname}: POSSIBLE COMPROMISE — Tailworm forensic signatures found. Investigate before changing anything.`;
  }
  const parts: string[] = [];
  if (s.tailscale.installed) {
    parts.push(
      `Tailscale ${s.tailscale.version ?? "(version unknown)"}${
        s.tailscale.patched ? " (fixed)" : ""
      }`,
    );
  }
  if (s.headscale.installed) {
    parts.push(`headscale ${s.headscale.version ?? "(version unknown)"}`);
  }
  const ids = s.exposures.map((e) => e.id);
  return `${s.hostname}: ${parts.join(", ")} — ${s.riskLevel} risk${
    ids.length > 0 ? ` (${ids.join(", ")})` : ""
  }.`;
}

function buildRecommendations(s: Status): string[] {
  const recs: string[] = [];
  // A low exposure (SSH on, no rule admits anyone) needs no rewrite.
  const has = (id: string) =>
    s.exposures.some((e) => e.id === id && e.severity !== "low");
  if (
    s.exposures.some((e) => e.id === "ssh-forwarding" && e.severity === "low")
  ) {
    recs.push(
      "Tailscale SSH is on but no rule admits anyone: turn it off if unused (tailscale set --ssh=false).",
    );
  }
  // Only the critical signatures are specific to the attack; the others
  // also fit legitimate forwards and root daemons, so they call for a look.
  if (s.indicators.details.some((i) => i.severity === "critical")) {
    recs.push(
      "Treat this host as compromised: delete the device at the control plane (reimaging alone does not revoke copied node keys), rotate auth keys and credentials reachable from it, rotate Tailnet Lock if this was a signing node, and review policy history for unauthorized changes.",
    );
  } else if (s.indicators.details.length > 0) {
    recs.push(
      "Investigate the forensic signatures: find the process behind each socket (ss -xlp, lsof) and check the auth logs for Tailscale SSH sessions with forwarding at that time. If they came from a forward nobody opened, treat the host as compromised.",
    );
  }
  if (has("serve-localapi-forward")) {
    recs.push(
      "Remove serve forwards to tailscaled.sock now: tailscale serve --tcp=<port> off (mitigate does this).",
    );
  }
  if (has("serve-localapi-proxy")) {
    recs.push(
      "Remove serve proxies to tailscaled.sock now: tailscale serve --https=<port> --set-path=<mount> off (mitigate does this).",
    );
  }
  const p = s.tailscale.sshPolicy;
  if (has("ssh-forwarding") && p.readable && p.rootAllowed) {
    recs.push(
      "This node's SSH rules allow logging in as root: remove root (and passwordless-sudo accounts) from the rules' users, or use autogroup:nonroot.",
    );
  }
  if (
    s.tailscale.version && s.tailscale.cliVersion &&
    s.tailscale.version !== s.tailscale.cliVersion
  ) {
    recs.push(
      `tailscaled is still running ${s.tailscale.version} while the CLI is ${s.tailscale.cliVersion}: restart tailscaled to run the installed version.`,
    );
  }
  if (has("ssh-forwarding")) {
    recs.push(
      "Rewrite Tailscale SSH rules as per-pair grants (one source device to one destination); remove identity-wide and tag-wide accept rules; never allow root or passwordless-sudo target accounts. Per-pair grants were the only control that stopped the worm in the report.",
    );
    recs.push(
      s.tailscale.selfHostedControl
        ? "headscale cannot disable SSH forwarding: treat every SSH grant to this node as root-equivalent, or turn Tailscale SSH off here (tailscale set --ssh=false; mitigate with disableTailscaleSsh=true) and use OpenSSH."
        : "In the tailnet policy, deny port forwarding on SSH rules that do not need it. Check mode does not limit forwarding. If this node does not need Tailscale SSH: tailscale set --ssh=false (mitigate with disableTailscaleSsh=true).",
    );
  }
  if (has("serve-unix-forward")) {
    recs.push(
      "Review serve forwards to unix sockets: tailscaled dials them as root for every permitted peer. Remove any that point at privileged daemons.",
    );
  }
  if (has("app-connector")) {
    recs.push(
      "Remove the connector role if unused (tailscale set --advertise-connector=false; mitigate with disableAppConnector=true) and the conn25 capability from clients that do not need it. Otherwise enforce a destination allowlist in the connector's FORWARD/INPUT chains; in Kubernetes apply a default-deny egress NetworkPolicy to the connector namespace.",
    );
  }
  if (has("serve-all-interfaces")) {
    recs.push(
      "Unset TS_SERVE_ALLOW_ALL_INTERFACES unless the Kubernetes operator's cluster-traffic ingress needs it.",
    );
  }
  if (has("funnel")) {
    recs.push(
      "Confirm funnel is intended on this node; do not trust funnel X-Forwarded-For for authorization.",
    );
  }
  if (has("key-expiry-disabled")) {
    recs.push(
      "Enable node-key expiry for this device, and TPM/Secure Enclave-bound state where the hardware allows.",
    );
  }
  if (has("older-bulletins")) {
    recs.push(
      `Upgrade Tailscale: this build also misses ${
        s.tailscale.missingBulletins.join(", ")
      }.`,
    );
  }
  if (has("headscale-dos")) {
    // Once the unit is capped, only the exposure advice is left to do.
    recs.push(
      s.headscale.unitLoaded && headscaleCapped(s.headscale)
        ? "headscale: put a rate-limiting reverse proxy in front of the registration endpoints, and keep it reachable only from an admin network or VPN."
        : "headscale: set MemoryMax and Restart=always (mitigate does this), put a rate-limiting reverse proxy in front of the registration endpoints, and keep it reachable only from an admin network or VPN.",
    );
  }
  const exposedToPivots = has("ssh-forwarding") || has("app-connector");
  if (exposedToPivots && s.defenses.egressRule === false && !s.inContainer) {
    recs.push(
      "Restrict tailscaled egress with nftables (mitigate blocks TCP to cloud metadata from the tailscaled cgroup and forwarded tailnet traffic to it); extend it to loopback and RFC1918 with an allowlist for this node's legitimate destinations.",
    );
  }
  if (has("ssh-forwarding") && s.defenses.auditRules === false) {
    recs.push(
      "Audit socket lifecycle: auditd rules on unlink/bind/chmod by tailscaled (mitigate installs them). Firewalls cannot see the unix-socket attacks.",
    );
  }
  if (
    s.tailscale.installed && !s.tailscale.patched && s.exposures.length > 0
  ) {
    recs.push(
      "No fixed Tailscale release yet: watch https://tailscale.com/security-bulletins and re-scan with the fixedVersion global argument when it ships.",
    );
  }
  if (s.riskLevel === "low" || s.riskLevel === "none") {
    recs.push("No action required for the Tailworm findings.");
  }
  return recs;
}

// --- Transport ---------------------------------------------------------------

type Transport =
  | { kind: "local" }
  | { kind: "ssh"; args: string[] }
  | { kind: "docker"; container: string };

export type RunResult = { stdout: string; stderr: string; exitCode: number };
export type Runner = (
  command: string,
  timeoutMs?: number,
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

export const DEFAULT_TIMEOUT_MS = 180_000;
/** Exit code a runner reports when it killed a command for running too long. */
export const TIMEOUT_EXIT = 124;

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

function makeRunner(transport: Transport, logger: Logger): Runner {
  return async (
    command: string,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    input?: string,
  ) => {
    let cmd: string[];
    switch (transport.kind) {
      case "docker":
        cmd = [
          "docker",
          "exec",
          ...(input !== undefined ? ["-i"] : []),
          transport.container,
          "sh",
          "-c",
          command,
        ];
        break;
      case "ssh":
        cmd = ["ssh", ...transport.args, `sh -c ${shQuote(command)}`];
        break;
      default:
        cmd = ["sh", "-c", command];
    }
    logger.debug(`Running on ${transport.kind}: ${command.slice(0, 200)}`);
    const signal = AbortSignal.timeout(timeoutMs);
    // The transport itself: sh, ssh or docker exec, with fixed arguments.
    // swamp-quality-ignore deno-command
    const child = new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      stdin: input !== undefined ? "piped" : "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).spawn();
    const stdoutText = collect(child.stdout);
    const stderrText = collect(child.stderr);
    if (input !== undefined) {
      const writer = child.stdin.getWriter();
      await writer.write(new TextEncoder().encode(input)).catch(() => {});
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

/** Process limit for the scan container; the probe needs only a few. */
export const SCAN_CONTAINER_PIDS_LIMIT = 256;

async function startDockerImage(
  image: string,
  logger: Logger,
): Promise<string> {
  // The explicit pids limit stands in for the docker CLI's 0, which rootless
  // podman applies literally, so sh cannot fork.
  // swamp-quality-ignore deno-command
  const output = await new Deno.Command("docker", {
    args: [
      "run",
      "-d",
      `--pids-limit=${SCAN_CONTAINER_PIDS_LIMIT}`,
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
    args: ["rm", "-f", containerId],
    stdout: "piped",
    stderr: "piped",
  }).output();
  logger.info(`Removed container ${containerId.slice(0, 12)}`);
}

// --- Scanning ----------------------------------------------------------------

/** Prints `RESOLVE|<path>|<readlink -f path>` for each unix serve target. */
export function resolveScript(paths: string[]): string {
  return paths.map((p) =>
    `printf 'RESOLVE|%s|%s\\n' ${shQuote(p)} "$(readlink -f -- ${
      shQuote(p)
    } 2>/dev/null)"`
  ).join("\n");
}

/**
 * Parses a probe's result, refusing one that cannot be graded: no output (the
 * command never ran) or a probe cut short (dropped connection, timeout), which
 * must not read as clean. supplied names output a caller collected.
 */
export function gradeProbe(
  r: RunResult,
  target: string,
  supplied = false,
): ProbeFacts {
  if (!r.stdout.includes("HOSTNAME|")) {
    throw new Error(
      supplied
        ? `The output given for ${target} is not probe output (no HOSTNAME line)`
        : `Cannot execute commands on ${target}: ${
          r.stderr || `probe produced no output (exit ${r.exitCode})`
        }`,
    );
  }
  const facts = parseProbe(r.stdout);
  if (!facts.complete) {
    throw new Error(
      supplied
        ? `Incomplete probe output for ${target}: it stops before the END line`
        : `Incomplete scan of ${target}: the probe stopped before finishing (exit ${r.exitCode}${
          r.stderr ? `, ${r.stderr}` : ""
        })`,
    );
  }
  return facts;
}

/** Runs the probe through a runner and analyzes the result. */
export async function scanTarget(
  run: Runner,
  target: string,
  opts: {
    inContainer: boolean;
    fixedVersion?: string;
    /** Read existing defenses through sudo when it allows (mitigate only). */
    sudoDefenses?: boolean;
  },
): Promise<{ status: Status; facts: ProbeFacts }> {
  const facts = gradeProbe(await run(PROBE_SCRIPT), target);
  // Only the paths the probe could not resolve itself.
  const paths = unixTargets(facts).filter((p) => !(p in facts.resolved));
  if (paths.length > 0) {
    const res = await run(resolveScript(paths));
    // Matched by the path asked about, so a "|" in a path cannot shift it.
    for (const line of res.stdout.split("\n")) {
      for (const p of paths) {
        const prefix = `RESOLVE|${p}|`;
        if (line.startsWith(prefix) && line.length > prefix.length) {
          facts.resolved[p] = line.slice(prefix.length);
        }
      }
    }
  }
  if (
    opts.sudoDefenses && facts.uid !== 0 && facts.tools["sudo"] &&
    facts.kernel === "Linux"
  ) {
    await readDefensesWithSudo(run, facts);
  }
  return { status: analyze(facts, target, opts), facts };
}

/** How probe output given to grade is encoded. */
export type ProbeEncoding = "plain" | "base64";

/**
 * Decodes probe output given to grade. base64 is what a QEMU guest-exec status
 * returns as out-data; whitespace from line wrapping is ignored.
 */
export function decodeProbeOutput(
  output: string,
  encoding: ProbeEncoding,
): string {
  if (encoding === "plain") return output;
  const b64 = output.replace(/[\t\n\r ]/g, "");
  if (b64.length % 4 !== 0 || !/^[A-Za-z0-9+/]*={0,2}$/.test(b64)) {
    throw new Error("the output is not valid base64");
  }
  return new TextDecoder().decode(
    Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
  );
}

/**
 * Grades probe output a caller collected through its own exec channel. Nothing
 * runs on the host: unix serve targets are only as resolved as the probe left
 * them, and defenses are not read through sudo.
 */
export function gradeOutput(
  output: string,
  target: string,
  opts: { encoding: ProbeEncoding; fixedVersion?: string },
): { status: Status; facts: ProbeFacts } {
  const stdout = decodeProbeOutput(output, opts.encoding).trim();
  const facts = gradeProbe({ stdout, stderr: "", exitCode: 0 }, target, true);
  const status = analyze(facts, target, {
    inContainer: false,
    fixedVersion: opts.fixedVersion,
  });
  return { status: { ...status, externalProbe: true }, facts };
}

/** A host label grade names its data by: safe as a data name and table cell. */
export const HOST_LABEL = /^[A-Za-z0-9_:][A-Za-z0-9._:-]{0,252}$/;

function base64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

/**
 * The probe in the forms another transport can carry: the script, and one
 * command line that decodes and runs it, for exec paths that take a single
 * command (kubectl exec carries it in the URL).
 */
export async function probeBundle(): Promise<Probe> {
  const script = new TextEncoder().encode(PROBE_SCRIPT);
  const gzipped = new Uint8Array(
    await new Response(
      new Blob([script]).stream().pipeThrough(new CompressionStream("gzip")),
    ).arrayBuffer(),
  );
  const gzipBase64 = base64(gzipped);
  const command = `printf '%s' '${gzipBase64}' | base64 -d | gzip -dc | sh`;
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", script),
  );
  return {
    script: PROBE_SCRIPT,
    gzipBase64,
    command,
    scriptBytes: script.length,
    commandBytes: command.length,
    sha256: [...digest].map((b) => b.toString(16).padStart(2, "0")).join(""),
  };
}

/** The status grade writes when the output it was given cannot be graded. */
export function gradeErrorStatus(target: string, err: unknown): Status {
  return {
    ...errorStatus(target, err),
    externalProbe: true,
    recommendations: [
      `Run the probe on ${target} again and grade its output.`,
    ],
  };
}

/** The read-only commands that show the defenses mitigate installs. */
export function defenseReads(tools: Record<string, string>): MitigationStep[] {
  const reads: MitigationStep[] = [];
  if (tools["nft"]) {
    reads.push({
      phase: "egress",
      argv: ["nft", "list", "table", "inet", "tailworm"],
      privileged: true,
      purpose: "Read mitigate's nftables table",
    });
  }
  if (tools["auditctl"]) {
    reads.push({
      phase: "audit",
      argv: ["auditctl", "-l"],
      privileged: true,
      purpose: "Read the loaded audit rules",
    });
  }
  return reads;
}

/**
 * Runs the allowed reads through non-interactive sudo and prints the root
 * probe's tags for them. Only a table that does not exist reads as NFT|0; any
 * other failure prints nothing, so the defense stays unknown.
 */
export function defensesScript(
  reads: MitigationStep[],
  tools: Record<string, string>,
): string {
  return reads.map((r) => {
    const cmd = renderStep(r, tools, false);
    return r.argv[0] === "nft"
      ? `if t=$(${cmd} 2>&1); then echo "NFTTABLE|1"; ${NFT_TAGS_SH}; elif printf '%s\\n' "$t" | grep -qx 'Error: No such file or directory'; then echo "NFT|0"; fi`
      : `if a=$(${cmd}); then ${AUDIT_TAGS_SH}; fi`;
  }).join("\n");
}

/**
 * Fills in the nftables and audit facts a non-root probe cannot read, using
 * only the reads sudo allows without a password. These are not mitigation
 * steps: a host that refuses them keeps the facts unknown, as before.
 */
async function readDefensesWithSudo(run: Runner, facts: ProbeFacts) {
  const reads = defenseReads(facts.tools);
  if (reads.length === 0) return;
  const pf = await run(preflightScript(reads, facts.tools));
  const ok = allowedSteps(reads, facts.tools, pf.stdout);
  const allowed = reads.filter((_, i) => ok.has(i));
  if (allowed.length === 0) return;
  const r = await run(defensesScript(allowed, facts.tools));
  const read = parseProbe(r.stdout);
  if (read.nftCount !== null) {
    facts.nftCount = read.nftCount;
    facts.nftTable = read.nftTable;
    facts.nftCgroups = read.nftCgroups;
  }
  if (read.auditCount !== null) facts.auditCount = read.auditCount;
}

async function writeScanLog(log: FileWriter, status: Status) {
  await log.writeLine(`Host: ${status.hostname} (${status.kernel})\n`);
  const ts = status.tailscale;
  await log.writeLine(
    `Tailscale: ${
      ts.installed
        ? ts.version ?? "installed, version unknown"
        : "not installed"
    }${ts.installed && !ts.daemonReachable ? " (daemon not reachable)" : ""}\n`,
  );
  if (ts.installed) {
    await log.writeLine(
      `  ssh=${ts.sshEnabled} connector=${ts.appConnector} conn25=${ts.conn25} funnel=${ts.funnel} control=${
        ts.controlURL ?? "default"
      }\n`,
    );
    for (const f of ts.tcpForwards) {
      await log.writeLine(
        `  serve tcp ${f.port} -> ${f.target}${
          f.localapi ? " (LOCALAPI)" : ""
        }\n`,
      );
    }
    for (const p of ts.localapiProxies) {
      await log.writeLine(
        `  serve ${
          p.scheme ?? "web"
        } ${p.port}${p.mount} -> ${p.target} (LOCALAPI)\n`,
      );
    }
  }
  if (status.headscale.installed) {
    await log.writeLine(
      `headscale: ${status.headscale.version ?? "unknown"} listen=${
        status.headscale.listenAddr ?? "?"
      } MemoryMax=${status.headscale.memoryMax ?? "?"}\n`,
    );
  }
  await log.writeLine(`\n=== Exposures (${status.exposures.length}) ===\n`);
  for (const e of status.exposures) {
    await log.writeLine(`[${e.severity}] ${e.id}: ${e.title}\n`);
  }
  await log.writeLine(
    `\n=== Indicators (${status.indicators.details.length}) ===\n`,
  );
  for (const i of status.indicators.details) {
    await log.writeLine(`[${i.severity}] ${i.detail}\n`);
  }
  await log.writeLine(`\n=== Result: ${status.riskLevel.toUpperCase()} ===\n`);
  await log.writeLine(`${status.summary}\n`);
}

function errorStatus(
  target: string,
  err: unknown,
  inContainer = false,
): Status {
  const message = err instanceof Error ? err.message : String(err);
  return {
    scanTimestamp: new Date().toISOString(),
    target,
    hostname: target,
    kernel: "",
    inContainer,
    viaDocker: inContainer,
    runAsRoot: false,
    vulnerable: false,
    riskLevel: "unknown",
    summary: `Scan failed on ${target}: ${message}`,
    error: message,
    advisory: {
      name: ADVISORY.name,
      url: ADVISORY.url,
      published: ADVISORY.published,
      fixedVersion: FIXED_TAILSCALE_VERSION,
    },
    tailscale: {
      installed: false,
      version: null,
      cliVersion: null,
      daemonReachable: false,
      running: false,
      patched: false,
      controlURL: null,
      selfHostedControl: false,
      sshEnabled: false,
      appConnector: false,
      conn25: false,
      funnel: false,
      serveAllInterfaces: false,
      keyExpiry: null,
      keyExpiryDisabled: false,
      tcpForwards: [],
      unixProxies: [],
      localapiProxies: [],
      missingBulletins: [],
      sshPolicy: summarizeSshPolicy(undefined),
    },
    headscale: {
      installed: false,
      version: null,
      unitLoaded: false,
      memoryMax: null,
      restart: null,
      listenAddr: null,
      publicListen: false,
    },
    exposures: [],
    defenses: { egressRule: null, auditRules: null },
    indicators: {
      socketsChecked: false,
      listenersChecked: false,
      tailscaledSocket: null,
      tailscaledListeners: [],
      details: [],
    },
    unreadable: [],
    recommendations: [`Fix connectivity to ${target} and scan again.`],
    mitigation: null,
  };
}

/**
 * A mitigate target that failed keeps the dry-run flag it was run with, so its
 * report still reads as the dry run (or apply) that was asked for.
 */
export function failedMitigation(
  status: Status,
  opts: MitigationOptions & { dryRun: boolean },
): Status {
  return {
    ...status,
    mitigation: {
      dryRun: opts.dryRun,
      options: optionsOf(opts),
      // Never checked: the target failed before the privilege preflight.
      privilege: "unavailable",
      missingPrivileges: [],
      outcome: "error",
      steps: [],
      notes: [],
    },
  };
}

function instanceName(label: string): string {
  return label.replace(/[\/\\]/g, "_").replace(/\.\./g, "_");
}

/** A hosts entry: the host, and the SSH user given with it as user@host. */
export type HostEntry = { host: string; sshUser?: string };

/**
 * Comma-separated hosts, deduplicated; local aliases count as one host. An
 * entry may be user@host to log in to that host as user instead of the
 * model's sshUser; a local host is scanned locally, so its user is dropped.
 * One remote host listed with two different users is refused, since both
 * would write the same status.
 */
export function hostList(hosts: string, sshUser: string): HostEntry[] {
  const seen = new Set<string>();
  const users = new Map<string, string>();
  const result: HostEntry[] = [];
  for (const raw of hosts.split(",")) {
    const entry = raw.trim();
    if (!entry) continue;
    const at = entry.indexOf("@");
    const h = at < 0 ? entry : entry.slice(at + 1);
    const user = at < 0 ? undefined : entry.slice(0, at);
    if (user !== undefined) {
      if (!/^[A-Za-z0-9._][A-Za-z0-9._-]*$/.test(user)) {
        throw new Error(
          `hosts entry ${JSON.stringify(entry)} has an invalid SSH user`,
        );
      }
      if (h.length === 0 || h.includes("@")) {
        throw new Error(
          `hosts entry ${JSON.stringify(entry)} has an invalid host`,
        );
      }
    }
    const local = isLocalHost(h);
    const key = local ? "localhost" : entry;
    if (seen.has(key)) continue;
    seen.add(key);
    if (local) {
      result.push({ host: h });
      continue;
    }
    const effective = user ?? sshUser;
    const other = users.get(h);
    if (other !== undefined && other !== effective) {
      throw new Error(
        `hosts lists ${h} as both ${other}@${h} and ${effective}@${h}; list each host once`,
      );
    }
    // The same login listed twice (h and sshUser@h) is one host.
    if (other !== undefined) continue;
    users.set(h, effective);
    result.push(user !== undefined ? { host: h, sshUser: user } : { host: h });
  }
  return result;
}

// --- Mitigation --------------------------------------------------------------

export type MitigationOptions = z.infer<typeof MitigationOptionsSchema>;

/** The options a mitigation record keeps, without the run's other inputs. */
export function optionsOf(o: MitigationOptions): MitigationOptions {
  return {
    removeLocalapiForwards: o.removeLocalapiForwards,
    applyEgressRules: o.applyEgressRules,
    applyAuditRules: o.applyAuditRules,
    hardenHeadscale: o.hardenHeadscale,
    headscaleMemoryMax: o.headscaleMemoryMax,
    disableTailscaleSsh: o.disableTailscaleSsh,
    disableAppConnector: o.disableAppConnector,
  };
}

export type MitigationStep = {
  phase: "serve" | "ssh" | "connector" | "egress" | "audit" | "headscale";
  argv: string[];
  privileged: boolean;
  purpose: string;
  /** For tee steps: the file content written from stdin. */
  content?: string;
};

/**
 * The nftables table mitigate loads first. Its forward chain drops tailnet
 * traffic routed to cloud metadata (kernel-mode connectors) and works on any
 * kernel with nftables. Re-loading it replaces the table, and with it the
 * cgroup chain, so mitigate can run again safely.
 */
export function nftTableRules(tunInterfaces: string[]): string {
  const lines: string[] = [];
  if (tunInterfaces.length > 0) {
    const ifs = tunInterfaces.map((i) => `"${i}"`).join(", ");
    lines.push(
      "  chain forward {",
      "    type filter hook forward priority 0; policy accept;",
      // DNS stays open, as in the cgroup rule: a subnet router may serve the
      // cloud resolver on 169.254.x to the tailnet for split DNS.
      `    iifname { ${ifs} } ip daddr ${METADATA_V4} meta l4proto { tcp, udp } th dport 53 accept`,
      `    iifname { ${ifs} } ip6 daddr ${METADATA_V6} meta l4proto { tcp, udp } th dport 53 accept`,
      `    iifname { ${ifs} } ip daddr ${METADATA_V4} drop`,
      `    iifname { ${ifs} } ip6 daddr ${METADATA_V6} drop`,
      "  }",
    );
  }
  return [
    "# Written by @swamp/cve/tailworm: blocks the cloud-metadata pivot",
    `# (tailworm.com findings 1-4). Load with: nft -f ${NFT_FILE}`,
    "table inet tailworm {}",
    "delete table inet tailworm",
    "table inet tailworm {",
    ...lines,
    "}",
  ].join("\n") + "\n";
}

/**
 * The output chain, loaded on its own after the table: it rejects TCP from
 * the tailscaled cgroup to cloud metadata (ssh -L dials, userspace conn25
 * egress). It needs the kernel's nft_socket, and nft -f is atomic, so keeping
 * it apart means a kernel without it still gets the forward chain. UDP is
 * left alone so cloud DNS resolvers keep working.
 */
export function nftCgroupRules(cgroup: string): string | null {
  const path = cgroup.replace(/^\//, "");
  if (!path) return null;
  const level = path.split("/").length;
  const match = `socket cgroupv2 level ${level} "${path}"`;
  return [
    "# Written by @swamp/cve/tailworm. Load after " + NFT_FILE + ".",
    // The rule binds to the cgroup tailscaled has when it loads, so it is
    // reloaded after every tailscaled start; flushing keeps that idempotent.
    "add table inet tailworm",
    "add chain inet tailworm output { type filter hook output priority 0; policy accept; }",
    "flush chain inet tailworm output",
    // Port 53 stays open: cloud resolvers sit on 169.254.x, and a truncated
    // UDP answer is retried over TCP.
    `add rule inet tailworm output ${match} ip daddr ${METADATA_V4} tcp dport != 53 reject with tcp reset`,
    `add rule inet tailworm output ${match} ip6 daddr ${METADATA_V6} tcp dport != 53 reject with tcp reset`,
  ].join("\n") + "\n";
}

/**
 * auditd rules for the report's socket-lifecycle detection, scoped to the
 * tailscaled binary so only its unlink/chmod/bind calls are logged. aarch64
 * has no unlink or chmod syscalls, only the *at forms.
 */
export function auditRules(exe: string, arch: string): string | null {
  // Only the 64-bit tables these names were checked against: 32-bit hosts
  // need arch=b32, and riscv64 has no renameat, either of which would fail
  // the whole file.
  const calls = arch === "x86_64"
    ? "unlink,unlinkat,rename,renameat,chmod,fchmodat,bind"
    : arch === "aarch64"
    ? "unlinkat,renameat,fchmodat,bind"
    : null;
  if (!calls) return null;
  return [
    "## Written by @swamp/cve/tailworm (tailworm.com findings 1-3).",
    "## Search with: ausearch -k tailworm",
    `-a always,exit -F arch=b64 -S ${calls} -F exe=${exe} -k tailworm`,
    // No arch here: auditctl rejects an arch'd perm filter on aarch64
    // ("Syscall name unknown: rename"), and that aborts the whole file.
    "-a always,exit -F dir=/run/tailscale/ -F perm=wa -k tailworm",
  ].join("\n") + "\n";
}

/** headscale's unit has a memory limit and restarts on failure. */
export function headscaleCapped(
  hs: { memoryMax: string | null; restart: string | null },
): boolean {
  return !!hs.memoryMax && hs.memoryMax !== "infinity" &&
    hs.restart === "always";
}

export function headscaleDropIn(memoryMax: string): string {
  return [
    "# Written by @swamp/cve/tailworm (tailworm.com finding 6).",
    "[Service]",
    `MemoryMax=${memoryMax}`,
    "Restart=always",
    "RestartSec=5s",
  ].join("\n") + "\n";
}

const SERVICE_NAME = /^svc:[a-z0-9][a-z0-9-]*$/;
/** A clean serve mount: tailscale serve refuses ".." and "//" anyway. */
const MOUNT = /^(?=\/)(\/(?!\.\.?(\/|$))[A-Za-z0-9._~-]+)*\/?$/;

/** Plans the mitigation commands for one scanned host, without running them. */
export function planMitigation(
  status: Status,
  facts: ProbeFacts,
  opts: MitigationOptions,
): { steps: MitigationStep[]; notes: string[] } {
  const steps: MitigationStep[] = [];
  const notes: string[] = [];
  const ts = status.tailscale;
  const has = (id: string) =>
    status.exposures.some((e) => e.id === id && e.severity !== "low");
  const critical = status.indicators.details.filter((i) =>
    i.severity === "critical"
  );
  if (critical.length > 0) {
    notes.push(
      "Forensic signatures found: preserve evidence first. Mitigation still removes the exposures, but it does not evict an attacker or revoke copied keys.",
    );
  }

  if (opts.removeLocalapiForwards) {
    for (const f of ts.tcpForwards.filter((f) => f.localapi)) {
      if (f.foreground) {
        notes.push(
          `Port ${f.port} forwards to ${f.target} from a foreground tailscale serve session: stop that process.`,
        );
        continue;
      }
      const argv = ["tailscale", "serve"];
      if (f.service) {
        if (!SERVICE_NAME.test(f.service)) {
          notes.push(
            `Service ${f.service}: unexpected name, remove its tcp ${f.port} forward by hand.`,
          );
          continue;
        }
        argv.push(`--service=${f.service}`);
      }
      argv.push(`--tcp=${f.port}`, "off");
      steps.push({
        phase: "serve",
        argv,
        privileged: true,
        purpose: `Remove the serve forward from tcp ${f.port} to ${f.target}`,
      });
    }
    // One handler each: --set-path picks the mount, so other handlers on the
    // port stay. Without it, off would remove every handler on the port.
    for (const p of ts.localapiProxies) {
      const where = `${p.scheme ?? "port"} ${p.port}${p.mount}${
        p.service ? ` (${p.service})` : ""
      }`;
      if (p.foreground) {
        notes.push(
          `${where} proxies to ${p.target} from a foreground tailscale serve session: stop that process.`,
        );
        continue;
      }
      if (
        !p.current || !p.scheme || !MOUNT.test(p.mount) ||
        (p.service !== null && !SERVICE_NAME.test(p.service))
      ) {
        notes.push(
          `${where} proxies to ${p.target}${
            p.current
              ? ""
              : ` under ${p.host}, not this node's current name, so tailscale serve off would act on another handler`
          }: remove that handler by hand.`,
        );
        continue;
      }
      const argv = ["tailscale", "serve"];
      if (p.service) argv.push(`--service=${p.service}`);
      argv.push(`--${p.scheme}=${p.port}`, `--set-path=${p.mount}`, "off");
      steps.push({
        phase: "serve",
        argv,
        privileged: true,
        purpose: `Remove the serve proxy from ${where} to ${p.target}`,
      });
    }
  }
  const pivots = has("ssh-forwarding") || has("app-connector");
  const linux = facts.kernel === "Linux";
  if (!linux && (opts.applyEgressRules || opts.applyAuditRules) && pivots) {
    notes.push(
      `${
        facts.kernel || "This OS"
      }: the egress and audit mitigations are Linux-only (nftables, auditd); block tailscaled's TCP to 169.254.0.0/16 with the host firewall.`,
    );
  }
  if (linux && opts.applyEgressRules && pivots) {
    if (status.inContainer) {
      notes.push(
        "Container target: apply the egress rules on the host that runs it.",
      );
    } else if (!facts.tools["nft"]) {
      notes.push(
        "nft is not installed: block TCP from tailscaled to 169.254.0.0/16 with your firewall.",
      );
    } else if (status.defenses.egressRule === true) {
      notes.push(
        "The nftables rule for tailscaled is loaded and reloads after every start.",
      );
    } else {
      const ownUnit = ownServiceUnit(facts.cgroup);
      const cgroupRules = facts.nftSocket === "absent" || !ownUnit
        ? null
        : nftCgroupRules(facts.cgroup!);
      if (facts.nftSocket === "absent") {
        notes.push(
          "This kernel has no nft_socket (CONFIG_NFT_SOCKET), so tailscaled's own connections (ssh -L dials, userspace conn25) cannot be matched by cgroup; only forwarded traffic is filtered.",
        );
      } else if (facts.cgroup && !ownUnit) {
        notes.push(
          `tailscaled runs in ${facts.cgroup}, not its own system service unit, so the cgroup rule would also block other processes there: only forwarded traffic is filtered. Run tailscaled as tailscaled.service to filter its own connections.`,
        );
      } else if (!cgroupRules) {
        notes.push(
          "tailscaled's cgroup was not found: only forwarded traffic is filtered, not tailscaled's own connections.",
        );
      }
      if (facts.tunInterfaces.length === 0 && !cgroupRules) {
        notes.push("No egress rule applies to this host.");
      } else {
        steps.push(
          {
            phase: "egress",
            argv: ["tee", NFT_FILE],
            privileged: true,
            purpose: "Write the nftables table for the metadata block",
            content: nftTableRules(facts.tunInterfaces),
          },
          {
            phase: "egress",
            argv: ["nft", "-f", NFT_FILE],
            privileged: true,
            purpose: "Load it",
          },
        );
        if (cgroupRules) {
          notes.push(
            "The cgroup rule blocks tailscaled's own TCP to the metadata service (DNS on port 53 excepted). If this node logs in with cloud workload identity, which fetches its token from that service, run mitigate with applyEgressRules=false.",
          );
          steps.push({
            phase: "egress",
            argv: ["tee", NFT_CGROUP_FILE],
            privileged: true,
            purpose: "Write the tailscaled cgroup rule",
            content: cgroupRules,
          });
        }
        // Reload after every tailscaled start: a restart (any upgrade) gives
        // it a new cgroup the loaded rule no longer matches, and nftables
        // rules do not survive a reboot. The drop-in is written before the
        // cgroup rule loads, so a kernel that refuses that rule still keeps
        // the forward chain across restarts.
        const unit = ownUnit ? facts.cgroup!.split("/").pop()! : "";
        if (unit && facts.tools["systemctl"]) {
          const dir = `/etc/systemd/system/${unit}.d`;
          steps.push(
            {
              phase: "egress",
              argv: ["mkdir", "-p", dir],
              privileged: true,
              purpose: `Create the ${unit} drop-in directory`,
            },
            {
              phase: "egress",
              argv: ["tee", `${dir}/50-tailworm.conf`],
              privileged: true,
              purpose:
                `Reload the metadata block after every ${unit} start (restarts and reboots)`,
              content: tailscaledDropIn(
                facts.tools["nft"],
                cgroupRules !== null,
              ),
            },
            {
              phase: "egress",
              argv: ["systemctl", "daemon-reload"],
              privileged: true,
              purpose: "Reload systemd units (tailscaled is not restarted)",
            },
          );
        } else {
          notes.push(
            "The nftables rules are loaded into the running kernel only: reload both files after tailscaled restarts and at boot.",
          );
        }
        if (cgroupRules) {
          steps.push({
            phase: "egress",
            argv: ["nft", "-f", NFT_CGROUP_FILE],
            privileged: true,
            purpose:
              "Reject TCP from tailscaled to cloud metadata (needs the kernel's nft_socket)",
          });
        }
      }
    }
  }

  if (linux && opts.applyAuditRules && has("ssh-forwarding")) {
    // After an upgrade without a restart the running binary reads
    // "<path> (deleted)"; the new one is at the same path.
    const exe = facts.tailscaledExe?.replace(/ \(deleted\)$/, "") ??
      facts.tools["tailscaled"];
    if (status.inContainer) {
      notes.push("Container target: install audit rules on the host.");
    } else if (!facts.tools["auditctl"]) {
      notes.push(
        "auditd is not installed: install it to audit tailscaled's socket operations.",
      );
    } else if (status.defenses.auditRules === true) {
      notes.push("auditd already has rules for tailscaled.");
    } else if (!exe || /\s/.test(exe)) {
      notes.push(
        "The tailscaled binary was not found: audit rules were not written.",
      );
    } else if (!auditRules(exe, facts.arch)) {
      notes.push(
        `No audit rules for ${
          facts.arch || "this architecture"
        }: audit unlinkat, renameat2, fchmodat and bind by ${exe} by hand.`,
      );
    } else {
      steps.push({
        phase: "audit",
        argv: ["tee", AUDIT_FILE],
        privileged: true,
        purpose: "Write auditd rules for tailscaled unlink/rename/chmod/bind",
        content: auditRules(exe, facts.arch)!,
      });
      steps.push(
        facts.tools["augenrules"]
          ? {
            phase: "audit",
            argv: ["augenrules", "--load"],
            privileged: true,
            purpose: "Load the audit rules",
          }
          : {
            phase: "audit",
            argv: ["auditctl", "-R", AUDIT_FILE],
            privileged: true,
            purpose: "Load the audit rules",
          },
      );
    }
  }

  if (opts.hardenHeadscale && status.headscale.unitLoaded) {
    const hs = status.headscale;
    const needed = !headscaleCapped(hs);
    if (status.inContainer) {
      notes.push(
        "Container target: set memory limits and restarts on the container instead.",
      );
    } else if (!facts.tools["systemctl"]) {
      notes.push("systemctl not found: limit headscale's memory by hand.");
    } else if (needed) {
      steps.push(
        {
          phase: "headscale",
          argv: ["mkdir", "-p", HEADSCALE_DROP_IN_DIR],
          privileged: true,
          purpose: "Create the headscale drop-in directory",
        },
        {
          phase: "headscale",
          argv: ["tee", HEADSCALE_DROP_IN],
          privileged: true,
          purpose:
            `Cap headscale memory at ${opts.headscaleMemoryMax} and restart it on failure`,
          content: headscaleDropIn(opts.headscaleMemoryMax),
        },
        {
          phase: "headscale",
          argv: ["systemctl", "daemon-reload"],
          privileged: true,
          purpose: "Reload systemd units",
        },
        {
          phase: "headscale",
          argv: [
            "systemctl",
            "set-property",
            "--runtime",
            "headscale.service",
            `MemoryMax=${opts.headscaleMemoryMax}`,
          ],
          privileged: true,
          purpose: "Apply the memory cap to the running service now",
        },
      );
    }
    if (hs.publicListen) {
      notes.push(
        `headscale listens on ${hs.listenAddr}: restrict it to an admin network or VPN and rate-limit registration with a reverse proxy.`,
      );
    }
  }
  if (opts.disableAppConnector && ts.appConnector && !ts.patched) {
    steps.push({
      phase: "connector",
      argv: ["tailscale", "set", "--advertise-connector=false"],
      privileged: true,
      purpose: "Stop advertising this node as an app connector",
    });
  }
  // Last of all: turning Tailscale SSH off drops a session swamp may be
  // using, and every step after it would fail.
  if (opts.disableTailscaleSsh && ts.sshEnabled && !ts.patched) {
    steps.push({
      phase: "ssh",
      argv: ["tailscale", "set", "--ssh=false"],
      privileged: true,
      purpose:
        "Turn off Tailscale SSH on this node (sessions over Tailscale SSH drop)",
    });
  }

  if (has("ssh-forwarding")) {
    notes.push(
      "The SSH policy itself is the main control: rewrite it as per-pair grants and deny forwarding. mitigate cannot change the tailnet policy.",
    );
  }
  return { steps, notes };
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
  return `LC_ALL=C sudo -n -- ${line}`;
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

export async function mitigateTarget(
  run: Runner,
  target: string,
  opts: MitigationOptions & {
    dryRun: boolean;
    inContainer: boolean;
    fixedVersion?: string;
  },
  log: FileWriter,
): Promise<HostMitigation> {
  await log.writeLine(`Scanning ${target}...\n`);
  const scanOpts = {
    inContainer: opts.inContainer,
    fixedVersion: opts.fixedVersion,
    sudoDefenses: true,
  };
  const first = await scanTarget(run, target, scanOpts);
  await writeScanLog(log, first.status);

  const { steps, notes } = planMitigation(first.status, first.facts, opts);
  const asRoot = first.status.runAsRoot;
  const base: Mitigation = {
    dryRun: opts.dryRun,
    options: optionsOf(opts),
    privilege: "not-needed",
    missingPrivileges: [],
    outcome: "not-needed",
    steps: [],
    notes,
  };

  if (steps.length === 0) {
    base.outcome = first.status.vulnerable ? "no-automatic-fix" : "not-needed";
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
    purpose: s.purpose,
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
      return {
        status: { ...first.status, mitigation: base },
        mitigation: base,
      };
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
  const failedPhases = new Set<MitigationStep["phase"]>();
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const rec = record[i];
    // Within a phase each step builds on the last (the file it loads, the
    // table it adds to), so after a failure the rest would act on a missing
    // file or a half-made change. Serve forwards are independent of each other.
    if (failedPhases.has(step.phase) && step.phase !== "serve") {
      rec.status = "skipped";
      rec.output = "Skipped: an earlier step of this phase failed.";
      continue;
    }
    await log.writeLine(`Executing: ${rec.command}\n`);
    // tee writes the file from stdin, so nothing is staged where another
    // user could swap it.
    const r = await run(
      step.content !== undefined ? `${rec.command} >/dev/null` : rec.command,
      DEFAULT_TIMEOUT_MS,
      step.content,
    );
    rec.exitCode = r.exitCode;
    rec.output = (r.stdout + (r.stderr ? `\n${r.stderr}` : "")).slice(-2000);
    rec.status = r.exitCode === 0 ? "ok" : "failed";
    await log.writeLine(`  exit=${r.exitCode}\n`);
    if (r.exitCode !== 0) {
      failed = true;
      failedPhases.add(step.phase);
    }
  }
  base.outcome = failed ? "partial" : "applied";

  let final: { status: Status; facts: ProbeFacts } | null = null;
  try {
    final = await scanTarget(run, target, scanOpts);
  } catch (err) {
    base.notes.push(
      `Rescan after mitigation failed: ${
        err instanceof Error ? err.message : err
      }`,
    );
  }
  if (!final) {
    return { status: { ...first.status, mitigation: base }, mitigation: base };
  }
  await log.writeLine(`\nRescan after mitigation:\n`);
  await writeScanLog(log, final.status);
  return { status: { ...final.status, mitigation: base }, mitigation: base };
}

// --- Model -------------------------------------------------------------------

export const model = {
  type: "@swamp/cve/tailworm",
  version: "2026.10.24.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  reports: ["@swamp/cve/tailworm-report"],
  resources: {
    status: {
      description:
        "Exposure assessment for the Tailworm findings (Tailscale v1.104.2 / headscale v0.29.5, tailworm.com, 2026-10-24)",
      schema: StatusSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
    probe: {
      description:
        "The probe script, compressed, and as one command line, for transports the model cannot drive",
      schema: ProbeSchema,
      lifetime: "infinite",
      garbageCollection: 5,
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
        "Scan a single host or container for Tailscale and headscale exposure to the Tailworm findings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;

        // The log comes first and the container starts inside the try, so a
        // failure anywhere after it still removes the container.
        const fromImage = !!present(g.dockerImage) &&
          !present(g.dockerContainer);
        const label = fromImage ? g.dockerImage! : targetLabel(g);
        const log = context.createFileWriter("log", instanceName(label));
        let autoContainer: string | undefined;

        try {
          await log.writeLine(
            `[${new Date().toISOString()}] Starting Tailworm scan\n`,
          );
          await log.writeLine(`Target: ${label}\n\n`);
          if (fromImage) {
            autoContainer = await startDockerImage(g.dockerImage!, logger);
            g.dockerContainer = autoContainer;
          }
          const transport = buildTransport(g);
          const { status } = await scanTarget(
            makeRunner(transport, logger),
            label,
            {
              inContainer: transport.kind === "docker",
              fixedVersion: g.fixedVersion,
            },
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
        "Scan multiple hosts in parallel over SSH. Pass a comma-separated list of hosts; each connects as the model's SSH user and key, or as user for a user@host entry.",
      arguments: z.object({
        hosts: z
          .string()
          .describe(
            "Comma-separated list of host IPs or hostnames to scan; user@host logs in to that host as user instead of sshUser",
          ),
      }),
      execute: async (args: { hosts: string }, context: MethodContext) => {
        const g = context.globalArgs;
        const logger = context.logger;
        const entries = hostList(args.hosts, g.sshUser);
        const hosts = entries.map((e) => e.host);
        const summaryLog = context.createFileWriter("log", "fleet");
        await summaryLog.writeLine(
          `[${
            new Date().toISOString()
          }] Tailworm fleet scan: ${hosts.length} host(s)\n\n`,
        );

        const settled = await Promise.allSettled(entries.map(async (entry) => {
          const host = entry.host;
          const hostLog = context.createFileWriter("log", instanceName(host));
          try {
            // Written first so finalize() cannot mask a scan error.
            await hostLog.writeLine(
              `[${new Date().toISOString()}] Scanning ${host}\n`,
            );
            const transport = buildTransport({
              targetHost: host,
              sshUser: entry.sshUser ?? g.sshUser,
              sshKey: present(g.sshKey),
            });
            const { status } = await scanTarget(
              makeRunner(transport, logger),
              host,
              { inContainer: false, fixedVersion: g.fixedVersion },
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
          const scanned = outcome.status === "fulfilled"
            ? outcome.value
            : errorStatus(hosts[i], outcome.reason);
          const sshUser = entries[i].sshUser;
          const status = sshUser !== undefined
            ? { ...scanned, sshUser }
            : scanned;
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

    grade: {
      description:
        "Grade probe output collected through another exec channel (KubeVirt guest agent, kubectl exec). Run probeScript's command on the host as root, then pass its stdout here; writes the same status and log as scan. Output that cannot be graded writes an error status.",
      arguments: z.object({
        target: z
          .string()
          .regex(HOST_LABEL)
          .describe(
            "Name of the host the output came from; the status and log are named by it",
          ),
        output: z
          .string()
          .describe("The probe's stdout from that host"),
        encoding: z
          .enum(["plain", "base64"])
          .default("plain")
          .describe(
            "base64 for output still encoded, such as a QEMU guest-exec out-data",
          ),
      }),
      execute: async (
        args: { target: string; output: string; encoding: ProbeEncoding },
        context: MethodContext,
      ) => {
        const log = context.createFileWriter("log", instanceName(args.target));
        let status: Status;
        try {
          await log.writeLine(
            `[${
              new Date().toISOString()
            }] Grading probe output given for ${args.target}\n`,
          );
          await log.writeLine(
            "The caller ran the probe; nothing was run on the host.\n\n",
          );
          try {
            status = gradeOutput(args.output, args.target, {
              encoding: args.encoding,
              fixedVersion: context.globalArgs.fixedVersion,
            }).status;
            await writeScanLog(log, status);
          } catch (err) {
            // One bad host in a workflow loop is an error row, not a failed run.
            status = gradeErrorStatus(args.target, err);
            await log.writeLine(`Cannot grade: ${status.error}\n`);
          }
        } finally {
          await log.finalize();
        }
        const handle = await context.writeResource(
          "status",
          instanceName(args.target),
          status,
        );
        return { dataHandles: [handle] };
      },
    },

    probeScript: {
      description:
        "Store the probe script, gzip+base64 encoded, and as one sh command line, for a workflow to run through a transport the model cannot drive",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const handle = await context.writeResource(
          "probe",
          "probe",
          await probeBundle(),
        );
        return { dataHandles: [handle] };
      },
    },

    mitigate: {
      description:
        "Scan, then apply the report's interim mitigations on affected hosts: remove serve forwards to tailscaled.sock, block tailscaled egress to cloud metadata, add auditd rules, and cap headscale memory. dryRun defaults to true.",
      arguments: z.object({
        dryRun: z
          .boolean()
          .default(true)
          .describe("If true, only print the commands without executing them"),
        hosts: z
          .string()
          .optional()
          .describe(
            "Comma-separated list of hosts to mitigate (overrides targetHost); user@host logs in to that host as user instead of sshUser",
          ),
        removeLocalapiForwards: z
          .boolean()
          .default(true)
          .describe(
            "Remove serve --tcp forwards that point at tailscaled.sock (finding 7)",
          ),
        applyEgressRules: z
          .boolean()
          .default(true)
          .describe(
            "Load an nftables table rejecting TCP from tailscaled, and forwarded tailnet traffic, to cloud metadata (169.254.0.0/16)",
          ),
        applyAuditRules: z
          .boolean()
          .default(true)
          .describe(
            "Install auditd rules logging tailscaled's unlink/rename/chmod/bind calls (key tailworm)",
          ),
        hardenHeadscale: z
          .boolean()
          .default(true)
          .describe(
            "Add a systemd drop-in giving headscale a MemoryMax and Restart=always",
          ),
        headscaleMemoryMax: z
          .string()
          .regex(/^[1-9]\d*[KMGT]?$/)
          .default("2G")
          .describe("MemoryMax for headscale.service"),
        disableTailscaleSsh: z
          .boolean()
          .default(false)
          .describe(
            "Turn Tailscale SSH off (tailscale set --ssh=false). Drops sessions that use Tailscale SSH, including one swamp connects over.",
          ),
        disableAppConnector: z
          .boolean()
          .default(false)
          .describe(
            "Stop advertising the node as an app connector (tailscale set --advertise-connector=false)",
          ),
      }),
      execute: async (
        args: MitigationOptions & { dryRun: boolean; hosts?: string },
        context: MethodContext,
      ) => {
        const g = context.globalArgs;
        const logger = context.logger;
        let autoContainer: string | undefined;
        let targets: {
          label: string;
          sshUser?: string;
          transport: Transport;
        }[];
        if (present(args.hosts)) {
          targets = hostList(args.hosts!, g.sshUser).map((e) => ({
            label: e.host,
            sshUser: e.sshUser,
            transport: buildTransport({
              targetHost: e.host,
              sshUser: e.sshUser ?? g.sshUser,
              sshKey: present(g.sshKey),
            }),
          }));
        } else if (present(g.dockerImage) && !present(g.dockerContainer)) {
          // An image model must never fall back to targetHost (localhost).
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
              `[${new Date().toISOString()}] Tailworm mitigation${
                args.dryRun ? " (DRY RUN)" : ""
              }: ${t.label}\n`,
            );
            return await mitigateTarget(
              makeRunner(t.transport, logger),
              t.label,
              {
                ...args,
                inContainer: t.transport.kind === "docker",
                fixedVersion: g.fixedVersion,
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
          const result = outcome.status === "fulfilled"
            ? outcome.value.status
            : failedMitigation(
              errorStatus(
                targets[i].label,
                outcome.reason,
                targets[i].transport.kind === "docker",
              ),
              args,
            );
          const sshUser = targets[i].sshUser;
          const status = sshUser !== undefined
            ? { ...result, sshUser }
            : result;
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
