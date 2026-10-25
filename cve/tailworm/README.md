# @swamp/cve/tailworm

Finds and mitigates hosts exposed to **Tailworm**, the security assessment of
Tailscale v1.104.2 and headscale v0.29.5 published at
[tailworm.com](https://tailworm.com) on **2026-10-24** by Erica Windisch
(Cyberdione Labs).

The findings were reproduced in a lab, not seen in the wild. When this
extension was written, no CVE or Tailscale security bulletin had been issued
and no fixed release existed. The extension checks for the exposures the
report describes and applies the report's interim operator mitigations.

| # | Component | What breaks | Severity (report) |
| --- | --- | --- | --- |
| 1–3 | Tailscale SSH | `ssh -L`/`-R` unix-socket forwarding runs as root in `tailscaled`. A rename race defeats the `{home, /tmp, /run/user}` allowlist, so an admitted device reaches `docker.sock`, `/run/systemd/private` or `tailscaled.sock` as root, or deletes and chmods root files | High |
| 4 | conn25 app connectors | The client picks the egress destination with no validation or ACL check, including cloud metadata and every Kubernetes service | High |
| 5 | Tailscale SSH (gliderssh) | One session grows root `tailscaled`'s memory without bound | High |
| 6 | headscale | Unauthenticated memory exhaustion; 1024 tiny registrations evict pending approvals | Medium-High |
| 7 | `tailscale serve` | `serve --tcp <port> unix:/run/tailscale/tailscaled.sock` gives remote peers read/write localapi access (node takeover) | High |
| 8 | `tailscale serve` | The unix-proxy guard runs at config time only, so a later symlink swap gets a root dial of any socket | Medium |
| 9 | Funnel | The funnel node attribute is enforced only by the CLI | Medium |
| 10 | `TS_SERVE_ALLOW_ALL_INTERFACES` | Serve listeners are not bound to the tunnel interface | Config note |
| 11 | serve over HTTP/2 | A shared context leaks capability headers between mounts | Medium |

The report's "worm" is a lab measurement: with policy-granted Tailscale SSH,
findings 1–3 spread automatically to every device the policy permits, in
under a second per hop. Per-pair SSH grants were the only control that
stopped it.

Hosts on Tailscale builds older than 1.104.2 are also checked against the
2026 bulletins they still miss (TS-2026-004 to 011 and 013). TS-2026-004 and
005 are earlier fixes for the same unix-socket class that findings 3, 7 and
8 bypass.

## Installation

```bash
swamp extension pull @swamp/cve/tailworm
```

## What it detects

The probe is POSIX `sh`. It needs the `tailscale` CLI on the target and
nothing else.

| Check | How | Finding |
| --- | --- | --- |
| Tailscale version | The running daemon's version from `tailscale status --json` (the CLI's when the daemon does not answer), compared with `fixedVersion` and the 2026 bulletins | all |
| Tailscale SSH enabled | `RunSSH` in `tailscale debug prefs` | 1–3, 5 |
| The SSH rules this node enforces | The `SSHPolicy` of `tailscale debug netmap`: how many devices are admitted, whether root is allowed, and whether forwarding is granted. Only that key is read; peers, keys and packet filters stay on the host (the packet filter is read only with `includeReachability`). **Needs root or the operator user** | 1–3, 5 |
| Self-hosted control (headscale) | `ControlURL` is not Tailscale's | 1–3 |
| Serve forward to the localapi socket | `TCPForward: "unix:…"` in `tailscale serve status --json` (node, Services and foreground), with each path resolved by `readlink -f` | 7 |
| Serve HTTP proxy to the localapi socket | A web handler's `Proxy: "unix:…"` in the same config that resolves to `tailscaled.sock`: critical, like the TCP forward | 7 |
| Other unix serve targets | The same config: TCP forwards and HTTP proxies to other `unix:` paths | 8 |
| App connector, conn25 | `AppConnector.Advertise` in prefs; conn25 capabilities or environment | 4 |
| Funnel | `AllowFunnel` in the serve config | 9 |
| `TS_SERVE_ALLOW_ALL_INTERFACES` | `tailscaled`'s process environment, its systemd unit, and `/etc/default` | 10 |
| Node key expiry | `KeyExpiry` missing from `Self` while logged in | containment |
| headscale | Version, `listen_addr` from the config, the unit's `MemoryMax` and `Restart` | 6 |
| Who can reach the node (opt-in) | With `includeReachability=true` on `scan` or `scanFleet`, a second command prints the `PacketFilter` of `tailscale debug netmap`: the inbound rules control compiled for this node. Only rules to the node's own addresses are kept. **Needs root or the operator user** | containment |
| Existing defenses | mitigate's nftables rule for `tailscaled`, counted only while it is bound to `tailscaled`'s current cgroup, and its auditd rules. Read as root, or by mitigate through passwordless sudo (see Privileges) | — |

Only the `TS_` variables above are read from `tailscaled`'s environment, so
an auth key in it never leaves the host. A process counts as the `tailscaled`
daemon only when the `Uid:` line of its `/proc/<pid>/status` shows a real and
effective uid of 0; any user can run a process with that name. Its `--socket`
and `--tun` arguments name its localapi socket and its tunnel interface
(`tailscale*` otherwise).

### How the SSH rules change the grade

When the scan can read the node's SSH rules:

| What the rules allow | SSH exposure |
| --- | --- |
| No rule admits anyone | low |
| Forwarding denied on every rule | medium: finding 5 only |
| Forwarding granted, or check-mode rules, which decide it after the check | high |
| The same, plus root logins, any source, or a self-hosted control server | critical |

headscale 0.29.5 grants local and remote forwarding on every accepted SSH
session, whatever the policy says. This was confirmed against a real
headscale: a policy granting only `autogroup:nonroot` arrived on the node with
`allowLocalPortForwarding` and `allowRemotePortForwarding` set. Without root,
the rules cannot be read, and the grade stays high (critical on a self-hosted
control server).

### Forensic signatures (Linux)

| Signature | Severity | Why |
| --- | --- | --- |
| `tailscaled.sock` not mode 0666 | critical | `tailscaled` creates it 0666. 0600 is the fingerprint of a race-won forward bound over it; 0755 of a missed chmod |
| `tailscaled` listening on a unix socket outside the forwarding directories | critical | A forward has replaced a privileged socket |
| `tailscaled` listening on a socket in `/tmp`, `/home`, `/run/user` or `/root` | medium | An active `ssh -R` unix forward: confirm who opened it |
| Root-owned 0755 socket in `/tmp`, `/home` or another user's `/run/user/<uid>` | high | The report's sign of a race-won bind whose chmod was redirected. Checked only while Tailscale SSH is on, since the race needs a Tailscale SSH session. Root's own `/run/user/0` and `/root` are skipped: root's systemd user manager binds 0755 sockets there on every root login. A root daemon binding in `/tmp` with umask 022 looks the same, so this one asks for investigation, not incident response |

Only the critical signatures turn the advice into incident response.
Signatures are checked only on hosts with Tailscale installed. The listener
check needs root (`ss -xlp`). On macOS the signatures are not checked.

## Methods

| Method | Description |
| --- | --- |
| `scan` | Scan one target: the local machine, an SSH host, or a Docker container or image |
| `scanFleet` | Scan a comma-separated list of hosts in parallel over SSH |
| `grade` | Grade probe output collected through another exec channel (KubeVirt guest agent, `kubectl exec`) |
| `gradeFleet` | Grade many hosts' probe output in one call, into one fleet report |
| `probeScript` | Store the probe script, compressed, and as one `sh` command line, for another transport to run |
| `mitigate` | Scan, then apply the interim mitigations on exposed hosts. `dryRun` defaults to `true` |

## Usage

Targets and SSH credentials are set as global arguments when the behavior is
created. Methods take `hosts`, `dryRun` and the mitigation options as inputs.

### Scan the local machine

```bash
swamp repo init
swamp behavior create @swamp/cve/tailworm tailworm
swamp behavior run tailworm scan
```

### Scan a fleet

```bash
swamp behavior create @swamp/cve/tailworm tailworm-fleet \
  --global-arg sshUser=ops \
  --global-arg sshKey=~/.ssh/fleet-key
swamp behavior run tailworm-fleet scanFleet --input hosts=10.0.1.10,10.0.1.11
```

A host that needs a different login takes it as `user@host`:

```bash
swamp behavior run tailworm-fleet scanFleet \
  --input hosts=ubuntu@10.0.1.10,admin@10.0.1.11,10.0.1.12
```

`ubuntu@10.0.1.10` logs in as `ubuntu`; a plain entry like `10.0.1.12` uses the
model's `sshUser`. Every host uses the model's `sshKey`. Data and logs are
still named by the host alone, and the report's suggested commands keep each
host's user. Listing one host with two different users is an error, and so
is a host named `fleet`: the fleet summary is logged under that name.

SSH runs non-interactively (`BatchMode=yes`) on port 22 and accepts new host
keys on first connection.
A host that cannot be reached is reported as an error, and the other hosts are
still scanned. Scan as root, or as the Tailscale operator user, to read each
node's SSH rules, the socket listeners and the existing defenses.

#### Who can reach what

To check a policy rewrite (for example, per-pair grants or role tags) did
what you meant, add `includeReachability=true`:

```bash
swamp behavior run tailworm-fleet scanFleet \
  --input hosts=10.0.1.10,10.0.1.11,10.0.1.12 \
  --input includeReachability=true
```

Each host's packet filter says which tailnet sources may reach it on which
ports. The report adds a matrix between the scanned hosts, naming them by
their Tailscale addresses, and who each host's Tailscale SSH policy lets in:

```
| From \ To | laptop | nas                                                  | cloud                                 |
| ---------- | ------ | ---------------------------------------------------- | ------------------------------------- |
| laptop     | —      | ✅ all ports (incl. 22 Tailscale SSH, 8443 localapi) | ✅ all ports (incl. 22 Tailscale SSH) |
| nas        | 🚫     | —                                                    | 🚫                                    |
| cloud      | 🚫     | ✅ 8096                                              | —                                     |

Tailscale SSH policy, who may log in:

- laptop ← nobody
- nas ← laptop
- cloud ← nobody
```

Port 22 is marked when Tailscale SSH is on, and the node's own serve ports
that reach the localapi are marked too: those are the paths the Tailworm
findings use. A Service's forwards listen on the Service's address, so they
are not marked on the node.

Below the matrix, a host is listed only when something the matrix cannot
show reaches it: a rule that admits the whole tailnet range (the default `*`
policy) reads as `any tailnet device`, and sources that are not scanned hosts
are shown by address, the first three per rule, with the rest counted. When
a rule names as many IPv4 as IPv6 hosts, each device is shown once, by its
IPv4 address. A rule that admits peers by capability rather than address
shows as `cap:<name>`, and as ❔ in the matrix: whether a scanned host holds
the capability is not visible from the node. A host that is not listed
admits nobody outside the scanned set. A single `scan` has no matrix, so it
lists every inbound rule for its host, and above 8 hosts lists replace the
matrix.

A host whose rules cannot be read is reported as unknown, with the reason:
no access to the netmap, no Tailscale addresses for the node, a netmap
layout the extension does not recognise, or a read that timed out or lost
its connection. It is never reported as unreachable.

This is off by default. It stores each host's Tailscale addresses, the
source prefixes and ports of its inbound rules, and the principals of its
Tailscale SSH rules: node addresses, and `user:<login>` (often an email
address) or `node:<id>` where a rule names those. The report prints them.
Peers, keys and the rest of the netmap are not read.

### Scan a Docker container or image

```bash
swamp behavior create @swamp/cve/tailworm tw-container --global-arg dockerContainer=my-app
swamp behavior create @swamp/cve/tailworm tw-image --global-arg dockerImage=tailscale/tailscale:v1.104.2
```

### Scan hosts the model cannot reach

Some hosts are reachable only through another exec channel, such as the QEMU
guest agent on KubeVirt or Harvester VMs, or `kubectl exec`. For those, the
caller runs the probe and the model grades its output:

1. `probeScript` stores the probe as a `probe` resource with `script`,
   `gzipBase64`, `command` (one `sh` command line that decodes and runs it,
   about 3.6 KB, for exec paths that carry the command in a URL) and
   `sha256`. `command` needs `base64` and `gzip` on the host (coreutils or
   busybox).
2. Run `command` (or `script`) on the host as root through your transport.
3. Pass its stdout to `grade` with the host's name. It writes the same status,
   log and report as `scan`, named by `target`.

```bash
swamp behavior run tailworm probeScript
swamp data get tailworm probe --json        # .content.command
# ... run the command on ci-vm-1 through the guest agent, save stdout ...
cat > grade.yaml <<'YAML'
target: ci-vm-1
encoding: base64          # guest-exec out-data as returned; plain by default
output: |
  <the probe's stdout>
YAML
swamp behavior run tailworm grade --input-file grade.yaml
```

Pass the output in an input file: it spans many lines, and an `--input` value
that starts with `@` is read as a file path. In a workflow, read the command
with `${{ data.latest("tailworm", "probe").attributes.command }}` and give
each host's stdout to a `grade` step; values passed between steps are not
evaluated again.

- The status carries `externalProbe: true`. `grade` trusts the output it is
  given: anyone who can run it can write a clean grade for a host.
- `grade` runs nothing on the host, so it never reads defenses through sudo.
  Unix serve targets are resolved by the probe itself, so run it as root: a
  target the probe cannot follow (a directory it cannot read, an escape it
  does not decode, more than 50 targets) is listed in
  `tailscale.unresolvedTargets`, the report's localapi column says
  `unverified`, and a recommendation says how to check it by hand.
- Output with CRLF line endings (`kubectl exec -t`) is read as is.
- Output from a probe saved before 2026.10.25.3 grades, but its serve targets
  read as unverified, with a recommendation to run `probeScript` again. A
  workflow that keeps the `probe` resource needs a fresh `probeScript` run
  after an upgrade.
- Output that cannot be graded (not probe output, cut off before its `END`
  line, invalid base64) writes an error status instead of failing the run, so
  one bad host in a loop shows as an `ERROR` row. Like a host `scanFleet`
  cannot reach, it replaces that host's previous status.
- `mitigate` cannot reach these hosts, and the report suggests no mitigate
  command for them. Apply the commands in [What mitigate does](#what-mitigate-does)
  through the same channel, then probe and grade again.

#### Grade a fleet

`gradeFleet` grades many hosts' output in one call: one status and log per
host, as `grade` writes them, a `fleet` summary log, and one fleet report.
Running `grade` once per host in a `forEach` gives one report per host
instead. `outputs` lists each host's `target` and `output`; `encoding` sets the
default, and an entry's own `encoding` overrides it.

```bash
cat > fleet.yaml <<'YAML'
encoding: base64
outputs:
  - target: ci-vm-1
    output: <ci-vm-1's out-data>
  - target: ci-vm-2
    output: <ci-vm-2's out-data>
  - target: ci-vm-3
    encoding: plain
    output: |
      <ci-vm-3's stdout>
YAML
swamp behavior run tailworm gradeFleet --input-file fleet.yaml
```

In a workflow, map the step that ran the probe on every VM to `outputs` with
CEL. Here `guests` stored a list `vms` of `{name, outData}`; use your own
field names:

```yaml
      - name: grade
        task:
          type: model_method
          modelIdOrName: tailworm
          methodName: gradeFleet
          inputs:
            encoding: base64
            outputs: '${{ data.latest("guests", "results").attributes.vms.map(v, {"target": v.name, "output": v.outData}) }}'
```

Quote the expression: the `": "` inside the map is YAML syntax otherwise.

- Targets must be distinct, and so must the names their data is stored
  under: `a..b` is stored as `a_b`, so `a..b` and `a_b` in one call are
  rejected. A target that is not a host label rejects the call, and the error
  gives its position in `outputs`.
- A host whose output cannot be graded is an `ERROR` row, as with `grade`; the
  others are still graded.
- The `fleet` log is the one `scanFleet` writes too, so it holds whichever
  ran last. A target named `fleet` is rejected, since its own log would
  overwrite the summary.

### Mitigate

```bash
# Dry run (default): scans, checks sudo, prints the commands
swamp behavior run tailworm-fleet mitigate --input hosts=10.0.1.10,10.0.1.11

# Apply
swamp behavior run tailworm-fleet mitigate --input hosts=10.0.1.10,10.0.1.11 --input dryRun=false
```

The dry-run report prints the exact apply command, including any options you
changed.

### What mitigate does

| Step | Command | When |
| --- | --- | --- |
| Remove serve forwards to the localapi socket (finding 7) | `tailscale serve [--service=svc:x] --tcp=<port> off` | A forward points at `tailscaled.sock`. Foreground serve sessions are reported instead, because they belong to a running process |
| Remove serve HTTP proxies to the localapi socket (finding 7) | `tailscale serve [--service=svc:x] --https=<port> --set-path=<mount> off` (`--http` for an HTTP port) | A web handler proxies to `tailscaled.sock`. Only that mount is removed; other handlers on the port stay. `serve off` acts on the node's current DNS name (or the service's name), so a proxy stored under another host name, such as a name from before a rename, is reported instead: removing it there would hit a different handler. Foreground sessions, ports whose config says neither HTTPS nor HTTP, and mounts with characters other than letters, digits and `._~-/` (or a `.` or `..` segment) are reported instead |
| Block the cloud-metadata pivot for forwarded tailnet traffic | `tee /etc/tailworm-egress.nft`, then `nft -f /etc/tailworm-egress.nft`: table `inet tailworm`, forward chain dropping `tailscale*` (or the `--tun` interface) → `169.254.0.0/16` and `fd00:ec2::254`, except DNS (port 53) | SSH or app-connector exposure, nft installed |
| Block `tailscaled`'s own TCP to metadata (`ssh -L` dials, userspace conn25) | `tee /etc/tailworm-egress-cgroup.nft`, then `nft -f` it: `socket cgroupv2` rule on `tailscaled`'s service cgroup | As above, when the kernel has `nft_socket` and `tailscaled` runs in its own system unit, `system.slice/tailscaled*.service` (in a shared cgroup the rule would cut other processes off from metadata, and only root can create system units). It loads after the reload drop-in is written, so a kernel that refuses it still keeps the forward chain across restarts |
| Audit socket operations (findings 1–3) | `tee /etc/audit/rules.d/tailworm.rules`, then `augenrules --load` (or `auditctl -R`) | SSH exposure, auditd installed. Rules are scoped to the `tailscaled` binary; search with `ausearch -k tailworm` |
| Cap headscale (finding 6) | drop-in `/etc/systemd/system/headscale.service.d/50-tailworm.conf` (`MemoryMax`, `Restart=always`), `systemctl daemon-reload`, `systemctl set-property --runtime headscale.service MemoryMax=…` | `headscale.service` is loaded without a memory limit or with `Restart` not `always` |
| Turn Tailscale SSH off | `tailscale set --ssh=false` | Only with `disableTailscaleSsh=true`. Planned last, because it drops sessions over Tailscale SSH, including one swamp connects over |
| Stop advertising the app connector | `tailscale set --advertise-connector=false` | Only with `disableAppConnector=true` |

Each step's exit code and output are recorded. A failed step stops the rest
of its phase, because those steps build on it (each serve forward is
independent), and the outcome is `partial`. Every host is rescanned after
applying, and that rescan is what gets stored.

DNS is not filtered: the forward chain lets TCP and UDP port 53 through, and
the cgroup rule blocks only TCP and exempts port 53, so cloud resolvers on
169.254.x keep working, including truncated answers retried over TCP and a
subnet router serving the cloud resolver to the tailnet for split DNS. Anything else `tailscaled` itself fetches from the
metadata service is blocked: if a node logs in with cloud workload identity,
which takes its token from there, run mitigate with `applyEgressRules=false`.

The cgroup rule binds to the cgroup `tailscaled` has when it loads, and a
restart (every package upgrade) replaces that cgroup. So mitigate also adds a
drop-in to `tailscaled`'s unit (`/etc/systemd/system/tailscaled.service.d/50-tailworm.conf`)
that reloads both nftables files after every start, which also restores them
after a reboot. `tailscaled` is not restarted, and a failed reload does not
fail its start. A rule left bound to the old cgroup by a failed reload no
longer counts as loaded, so the next mitigate loads it again. Without systemd, reload both files yourself after restarts and
at boot. Loopback and RFC1918
destinations are not blocked, because a node's legitimate destinations vary.
Put your own allowlist or extra blocks in a separate nftables table: `inet
tailworm` is regenerated from these files on every `tailscaled` start, so rules
added to it by hand are lost at the next restart.

In a container, mitigate changes only Tailscale itself. Apply the firewall,
audit and memory changes on the machine that runs it. On macOS, only the
Tailscale steps apply.

mitigate cannot change the tailnet policy. Rewriting SSH rules as per-pair
grants, with forwarding denied and no root targets, is the main control.

## Privileges

Scanning needs no root, but without it the SSH rules, socket listeners and
existing defenses are unknown. mitigate reads the defenses through sudo when
it may: see the read-only entry below. mitigate needs root, or passwordless sudo for
the exact commands it runs. Each command runs as `LC_ALL=C sudo -n -- <binary>
…`, with no shell wrapper, so sudoers rules scoped to those binaries match and
a missing password fails at once.

Before changing anything, mitigate checks every planned command with
`sudo -n -l <command>` and reads `sudo -n -ll`. A command counts as allowed
only when the last rule that matches it has `NOPASSWD`. If any check fails,
the host gets the outcome `needs-privilege`, the exact commands, and no
changes.

**These rights amount to root.** `tee` writes firewall and audit rules, `nft
-f` and `augenrules` load them, and `systemctl` reloads units. Give them only
to an automation account you would trust with root. Pin every rule to the
exact command lines the dry run prints; binary paths come from `command -v` on
each host. This entry matches the default plan on an Ubuntu 24.04 host with
`tailscaled.service`, nftables and auditd, as its dry run printed it:

```
ops ALL=(root) NOPASSWD: /usr/bin/tee /etc/tailworm-egress.nft, \
  /usr/sbin/nft -f /etc/tailworm-egress.nft, \
  /usr/bin/tee /etc/tailworm-egress-cgroup.nft, \
  /usr/bin/mkdir -p /etc/systemd/system/tailscaled.service.d, \
  /usr/bin/tee /etc/systemd/system/tailscaled.service.d/50-tailworm.conf, \
  /usr/bin/systemctl daemon-reload, \
  /usr/sbin/nft -f /etc/tailworm-egress-cgroup.nft, \
  /usr/bin/tee /etc/audit/rules.d/tailworm.rules, \
  /usr/sbin/augenrules --load
```

Some commands depend on the host, so take them from its dry run: `tailscale
serve --tcp=<port> off` for each forward to the localapi, `tailscale serve
--https=<port> --set-path=<mount> off` for each HTTP proxy to it, the headscale steps,
and the opt-in `tailscale set` steps. sudoers needs `=` escaped inside
arguments, for example `/usr/bin/tailscale serve --tcp\=8443 off` and
`/usr/bin/systemctl set-property --runtime headscale.service MemoryMax\=2G`.

Without root, mitigate also asks sudo, the same way, whether it may read the
defenses it installs, and reads them only if so. These two commands change
nothing, so keep them apart from the rights above:

```
ops ALL=(root) NOPASSWD: /usr/sbin/nft list table inet tailworm, \
  /usr/sbin/auditctl -l
```

Without them the defenses stay unknown, and mitigate plans the (idempotent)
egress and audit steps again on every run. They are never reported as
missing privileges.

## Inputs

### Global arguments (set with `swamp behavior create --global-arg`)

| Argument | Default | Description |
| --- | --- | --- |
| `targetHost` | `localhost` | Host to scan or mitigate (`localhost`, `127.0.0.1` and `::1` run locally) |
| `sshUser` | `root` | SSH user for remote hosts (and every host in `hosts` not given as `user@host`) |
| `sshKey` | — | Path to the SSH private key |
| `dockerContainer` | — | Container name or ID to scan (overrides `targetHost`) |
| `dockerImage` | — | Image to start, scan and remove |
| `fixedVersion` | — | First Tailscale release that fixes Tailworm, once one ships (e.g. `1.104.4`). Hosts at or above it are not flagged for the code findings |

### Method inputs

| Method | Input | Default | Description |
| --- | --- | --- | --- |
| `scan` | `includeReachability` | `false` | Also read the node's packet filter for the report's reachability section |
| `scanFleet` | `hosts` | required | Comma-separated hosts; `user@host` logs in as `user` |
| `scanFleet` | `includeReachability` | `false` | As for `scan`; the report adds a matrix between the scanned hosts |
| `grade` | `target` | required | Host the output came from (letters, digits, `.`, `_`, `:`, `-`); names the status and log |
| `grade` | `output` | required | The probe's stdout from that host |
| `grade` | `encoding` | `plain` | `base64` for output still encoded, such as QEMU guest-exec out-data |
| `gradeFleet` | `outputs` | required | One `{target, output, encoding?}` per host; targets as for `grade`, all distinct |
| `gradeFleet` | `encoding` | `plain` | Encoding for entries that do not set their own |
| `mitigate` | `hosts` | `targetHost` | Comma-separated hosts; `user@host` logs in as `user` |
| `mitigate` | `dryRun` | `true` | Print the plan without running it |
| `mitigate` | `removeLocalapiForwards` | `true` | Remove serve forwards to `tailscaled.sock` |
| `mitigate` | `applyEgressRules` | `true` | Load the nftables metadata block |
| `mitigate` | `applyAuditRules` | `true` | Install the auditd rules |
| `mitigate` | `hardenHeadscale` | `true` | Cap headscale memory and restart it on failure |
| `mitigate` | `headscaleMemoryMax` | `2G` | `MemoryMax` for `headscale.service` |
| `mitigate` | `disableTailscaleSsh` | `false` | Turn Tailscale SSH off |
| `mitigate` | `disableAppConnector` | `false` | Stop advertising the node as an app connector |

## Reports

`@swamp/cve/tailworm-report` runs after each method:

- After `scan`, `scanFleet`, `grade` and `gradeFleet`, it shows one row per host. The SSH column
  summarises the node's rules when they were read, for example
  `yes (3 src, root, fwd)`. It also shows forensic signatures, errors,
  deduplicated recommendations, and the mitigate command for the exposed
  hosts.
- When the scan ran with `includeReachability=true`, it adds a Reachability
  section: a source-by-destination matrix between the scanned hosts, who
  each host's Tailscale SSH policy lets in, and any sources the matrix cannot
  show. The JSON output carries each host's rules under `reachability`.
- After `mitigate`, it shows each host's outcome and commands, and the apply
  or verify command.

The report's commands name the behavior that ran, so they work as printed.

## When Tailscale ships a fix

Re-scan with the fixed release as `fixedVersion`:

```bash
swamp behavior create @swamp/cve/tailworm tailworm-fleet \
  --global-arg fixedVersion=<fixed release> ...
```

Hosts at or above it are no longer flagged for the code findings. The
configuration findings (`TS_SERVE_ALLOW_ALL_INTERFACES`, node key expiry,
headscale exposure) still are. Once a version of this extension carries the
fixed release by default, pull it and drop the argument.

## Limits

- The findings are one researcher's, reproduced in a lab and not confirmed by
  Tailscale. Risk levels follow the report and may change when Tailscale
  publishes its own assessment.
- The SSH rules are this node's view: they show who can reach this node, not
  the whole policy. Scan every SSH-enabled node to cover the tailnet.
- Reachability is the compiled policy as each node received it, not a live
  connection test: a service that is not listening still shows as reachable.
  Rules to subnet routes or exit-node traffic a node forwards, and app
  capability grants (which carry no ports), are not shown. `grade` and
  `gradeFleet` do not collect it. It was checked against headscale v0.29.5
  and Tailscale's own control server, both with tailscale v1.104.2. Tailscale's
  control server sent no capability sources (`cap:<name>`) for app grants,
  posture conditions or node attributes; it compiles those to addresses.
- conn25 detection is a heuristic (capabilities or environment naming conn25).
  In Kubernetes, check the operator's connector deployments directly.
- Firewalls cannot see the unix-socket attacks (findings 1–3). The audit
  rules and the forensic signatures are the interim control.
- A clean signature check does not rule out a past compromise. The
  report's race leaves no trace once the attacker's socket is gone.
- A unix serve target that cannot be resolved (a scan or probe run as a
  non-root user that cannot read its directory) is reported as unverified,
  not as the localapi: check it with `readlink -f` as root.
- SSH targets use port 22, and the target's login shell must parse POSIX
  `sh` quoting (csh or fish as the login shell makes the scan fail with an
  error, never a clean result).
- If a kernel reports `nft_socket` but still refuses the cgroup rule, that step
  fails on every mitigate run (outcome `partial`); the forward chain and its
  reload drop-in are kept.

## References

- Tailworm report: <https://tailworm.com>
- Tailscale security bulletins: <https://tailscale.com/security-bulletins>
- headscale releases: <https://github.com/juanfont/headscale/releases>
- Dropbear CVE-2025-14282 (the same class, fixed by dropping privileges):
  <https://matt.ucc.asn.au/dropbear/CHANGES>

## License

AGPL-3.0-or-later. See [LICENSE.txt](LICENSE.txt).
