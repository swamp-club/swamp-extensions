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
| The SSH rules this node enforces | The `SSHPolicy` of `tailscale debug netmap`: how many devices are admitted, whether root is allowed, and whether forwarding is granted. Only that key is read; peers, keys and packet filters stay on the host. **Needs root or the operator user** | 1–3, 5 |
| Self-hosted control (headscale) | `ControlURL` is not Tailscale's | 1–3 |
| Serve forward to the localapi socket | `TCPForward: "unix:…"` in `tailscale serve status --json` (node, Services and foreground), with each path resolved by `readlink -f` | 7 |
| Other unix serve targets | The same config: TCP forwards and HTTP proxies to `unix:` paths | 8 |
| App connector, conn25 | `AppConnector.Advertise` in prefs; conn25 capabilities or environment | 4 |
| Funnel | `AllowFunnel` in the serve config | 9 |
| `TS_SERVE_ALLOW_ALL_INTERFACES` | `tailscaled`'s process environment, its systemd unit, and `/etc/default` | 10 |
| Node key expiry | `KeyExpiry` missing from `Self` while logged in | containment |
| headscale | Version, `listen_addr` from the config, the unit's `MemoryMax` and `Restart` | 6 |
| Existing defenses | An nftables rule for `tailscaled`; auditd rules for it (root only) | — |

Only the `TS_` variables above are read from `tailscaled`'s environment, so
an auth key in it never leaves the host.

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
host's user. Listing one host with two different users is an error.

SSH runs non-interactively (`BatchMode=yes`) on port 22 and accepts new host
keys on first connection.
A host that cannot be reached is reported as an error, and the other hosts are
still scanned. Scan as root, or as the Tailscale operator user, to read each
node's SSH rules, the socket listeners and the existing defenses.

### Scan a Docker container or image

```bash
swamp behavior create @swamp/cve/tailworm tw-container --global-arg dockerContainer=my-app
swamp behavior create @swamp/cve/tailworm tw-image --global-arg dockerImage=tailscale/tailscale:v1.104.2
```

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
| Block the cloud-metadata pivot for forwarded tailnet traffic | `tee /etc/tailworm-egress.nft`, then `nft -f /etc/tailworm-egress.nft`: table `inet tailworm`, forward chain dropping `tailscale*` → `169.254.0.0/16` and `fd00:ec2::254`, except DNS (port 53) | SSH or app-connector exposure, nft installed |
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
fail its start. Without systemd, reload both files yourself after restarts and
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
existing defenses are unknown. mitigate needs root, or passwordless sudo for
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
serve --tcp=<port> off` for each forward to the localapi, the headscale steps,
and the opt-in `tailscale set` steps. sudoers needs `=` escaped inside
arguments, for example `/usr/bin/tailscale serve --tcp\=8443 off` and
`/usr/bin/systemctl set-property --runtime headscale.service MemoryMax\=2G`.

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
| `scanFleet` | `hosts` | required | Comma-separated hosts; `user@host` logs in as `user` |
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

- After `scan` and `scanFleet`, it shows one row per host. The SSH column
  summarises the node's rules when they were read, for example
  `yes (3 src, root, fwd)`. It also shows forensic signatures, errors,
  deduplicated recommendations, and the mitigate command for the exposed
  hosts.
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
- conn25 detection is a heuristic (capabilities or environment naming conn25).
  In Kubernetes, check the operator's connector deployments directly.
- Firewalls cannot see the unix-socket attacks (findings 1–3). The audit
  rules and the forensic signatures are the interim control.
- A clean signature check does not rule out a past compromise. The
  report's race leaves no trace once the attacker's socket is gone.
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
