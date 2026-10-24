# @swamp/cve/dirtyfrag

Detects and mitigates the **Dirty Frag** Linux local privilege escalation
vulnerability class, which chains two kernel bugs to write attacker-controlled
bytes into the page cache of suid binaries or `/etc/passwd` via `splice()`.

- **CVE-2026-43284** -- xfrm-ESP page-cache write (patched in mainline)
- **CVE-2026-43500** -- RxRPC RXKAD page-cache write (no upstream patch)

Affected kernels span ~9 years of Linux releases across all major
distributions. See
[github.com/V4bel/dirtyfrag](https://github.com/V4bel/dirtyfrag) for the
original disclosure.

## Installation

```bash
swamp extension pull @swamp/cve/dirtyfrag
```

Or clone this repo and the model is discovered automatically from
`extensions/models/`.

## What It Detects

| Check | How |
|---|---|
| Vulnerable kernel modules | `/proc/modules`, `/sys/module/`, `/lib/modules/` for esp4, esp6, rxrpc |
| Built-in rxrpc | `modules.builtin` grep (common on Ubuntu) |
| Patch status (CVE-2026-43284) | Heuristic: `skb_has_shared_frag` symbol in `/proc/kallsyms` |
| User namespace availability | `unprivileged_userns_clone` sysctl + AppArmor restriction check |
| Module blocklisting | `/etc/modprobe.d/` scan for esp4/esp6/rxrpc install/blocklist rules |
| Page cache corruption (`/usr/bin/su`) | `od` hex dump of first 192 bytes, checks for shellcode signature `31ff31f631c0b06a` |
| Page cache corruption (`/etc/passwd`) | Checks if root entry has empty password field (`root::`) |
| XFRM SA exploit pattern | `ip xfrm state` for sequential SPIs matching `0xDEADBE1x`; needs root (`CAP_NET_ADMIN`) and iproute2, otherwise reported as not checked. It sees only SAs in the scanning network namespace -- the exploit creates its SAs in its own user and network namespace, so a clean result does not rule them out |
| RxRPC key artifacts | `/proc/keys` scan for rxrpc entries |

No external tools required -- all checks use POSIX utilities and procfs/sysfs,
except the XFRM SA check, which uses `ip` from iproute2.

## Methods

| Method | Description |
|---|---|
| `scan` | Scan a single host (local, SSH, or Docker container) |
| `scanFleet` | Scan multiple hosts in parallel over SSH (shared key; `user@host` sets a host's user) |
| `mitigate` | Scan-then-fix: checks vulnerability first, only mitigates affected hosts. Accepts a single host or comma-separated list. |

## Usage

### Setup

```bash
swamp repo init
swamp behavior create @swamp/cve/dirtyfrag dirtyfrag-scanner
```

The target (`targetHost`, `sshUser`, `sshKey`, `dockerContainer`,
`dockerImage`, `suBinaryPath`) is set per model with `--global-arg` when you
create it -- these are not method inputs, and `--input targetHost=...` is
rejected. Create one model per target, as in the examples below. Only `hosts`
and `dryRun` are passed at run time with `--input`.

### Scan the local machine

```bash
swamp behavior run dirtyfrag-scanner scan
```

No inputs needed -- defaults to `localhost` and runs checks directly.

### Scan a remote host

```bash
swamp behavior create @swamp/cve/dirtyfrag dirtyfrag-web \
  --global-arg targetHost=10.0.1.50 \
  --global-arg sshUser=ubuntu \
  --global-arg sshKey=~/.ssh/my-key.pem

swamp behavior run dirtyfrag-web scan
```

### Scan a fleet

```bash
swamp behavior create @swamp/cve/dirtyfrag dirtyfrag-fleet \
  --global-arg sshUser=ubuntu \
  --global-arg sshKey=~/.ssh/my-key.pem

swamp behavior run dirtyfrag-fleet scanFleet \
  --input hosts=10.0.1.50,10.0.1.51,10.0.1.52
```

All hosts are scanned in parallel with the model's `sshUser` and `sshKey`. Each
host gets its own status resource (`<host>`) and log file (`<host>-log`), plus
a `fleet-log` summary. The report renders a table:

```
| Host            | Kernel         | Risk   | ESP (43284) | RxRPC (43500) | IOCs     | Status     |
| --------------- | -------------- | ------ | ----------- | ------------- | -------- | ---------- |
| ip-172-31-34-40 | 7.0.0-1004-aws | MEDIUM | Vulnerable  | Vulnerable    | None     | VULNERABLE |
| ip-172-31-50-12 | 7.0.0-1004-aws | NONE   | N/A         | N/A           | None     | CLEAN      |
```

You can mix local and remote hosts: `--input hosts=localhost,10.0.1.50`.

A host that needs a different login takes it as `user@host`:

```bash
swamp behavior run dirtyfrag-fleet scanFleet \
  --input hosts=ubuntu@10.0.1.50,admin@10.0.1.51,10.0.1.52
```

`ubuntu@10.0.1.50` logs in as `ubuntu`; a plain entry like `10.0.1.52` uses the model's
`sshUser`. Every host uses the model's `sshKey`. Data and logs are still named
by the host alone, and the report's suggested commands keep each host's user.
Listing one host with two different users is an error.

### Scan a Docker container

Useful for checking the underlying host kernel from inside a container:

```bash
# Existing container
swamp behavior create @swamp/cve/dirtyfrag dirtyfrag-container \
  --global-arg dockerContainer=my-container
swamp behavior run dirtyfrag-container scan

# Auto-start an image, scan, then stop
swamp behavior create @swamp/cve/dirtyfrag dirtyfrag-image \
  --global-arg dockerImage=ubuntu:24.04
swamp behavior run dirtyfrag-image scan
```

### View results

```bash
# Structured data for a specific host
swamp data get dirtyfrag-scanner <host-or-label> --json | jq .content

# The run log for that host
swamp data get dirtyfrag-scanner <host-or-label>-log

# List all data for the model
swamp data list dirtyfrag-scanner --json
```

### Mitigate the local machine

```bash
# Dry run (default) -- shows what it would do
swamp behavior run dirtyfrag-scanner mitigate

# Apply
swamp behavior run dirtyfrag-scanner mitigate --input dryRun=false
```

### Mitigate a remote host

Uses the `dirtyfrag-web` model created above:

```bash
# Dry run
swamp behavior run dirtyfrag-web mitigate

# Apply
swamp behavior run dirtyfrag-web mitigate --input dryRun=false
```

### Mitigate multiple hosts

Uses the `dirtyfrag-fleet` model created above:

```bash
swamp behavior run dirtyfrag-fleet mitigate \
  --input hosts=10.0.1.50,10.0.1.51,10.0.1.52
```

All hosts are scanned first -- only vulnerable hosts are mitigated, clean hosts
are skipped. Add `--input dryRun=false` to apply.

### What mitigation does

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `printf 'install esp4 /bin/false\n...' \| sudo -n -- tee /etc/modprobe.d/dirtyfrag.conf` | Blocklist esp4/esp6/rxrpc modules |
| 2 | `sudo -n -- rmmod esp4` (likewise esp6, rxrpc) -- only for modules listed in `/proc/modules` | Unload modules from running kernel |
| 3 | `echo 3 \| sudo -n -- tee /proc/sys/vm/drop_caches` | Flush page cache (clears corrupted entries) |

As `root`, the commands run without `sudo`. Any other user needs
**passwordless sudo** for `tee` and `rmmod`, with any arguments: only those
binaries are escalated, with `sudo -n --` and no `sh -c` wrapper, so a sudoers
rule scoped to them is enough (for example
`ubuntu ALL=(root) NOPASSWD: /usr/bin/tee, /usr/sbin/rmmod`). A rule that also
pins their arguments fails the check below.

Before running anything, `mitigate` checks that `sudo -n -- tee /dev/null`
works (dry runs too). If sudo would ask for a password, or is not installed, no
command is run and the host is reported as failed instead of hanging on a
prompt.

A host is reported as mitigated only when every command exits 0. Otherwise its
summary reads `Mitigation failed on <host>: ...` and names the failing command.
If `rmmod` fails because a module is in use, the blocklist is still written;
reboot or free the module to finish the mitigation.

## Risk Levels

| Level | Meaning |
|---|---|
| `critical` | Active compromise detected, or both variants exploitable with no mitigations |
| `high` | ESP variant exploitable but user namespaces restricted |
| `medium` | Modules available, partially mitigated |
| `low` | Modules exist on disk but all blocklisted or patched (mitigated) |
| `none` | No vulnerable modules present |

Hosts at `low` or `none` are reported as **CLEAN** and will not be mitigated.

## Global arguments

Set when the model is created, with `--global-arg key=value`:

| Argument | Default | Description |
|---|---|---|
| `targetHost` | `localhost` | SSH host to scan or mitigate |
| `sshUser` | `root` | SSH user (also used for every host in `hosts` not given as `user@host`) |
| `sshKey` | | Path to SSH private key (also used for every host in `hosts`) |
| `dockerContainer` | | Container name/ID (overrides SSH) |
| `dockerImage` | | Image to auto-start and scan |
| `suBinaryPath` | `/usr/bin/su` | Path to su binary to check |

## Method inputs

Passed at run time with `--input key=value`:

| Input | Default | Description |
|---|---|---|
| `hosts` | | Comma-separated hosts (scanFleet and mitigate; overrides `targetHost`). `user@host` logs in to that host as `user` |
| `dryRun` | `true` | Preview mitigation commands without executing (mitigate only) |

## Data

| Data | Kind | Contents |
|---|---|---|
| `<host>` (or `docker-<id>`) | resource `status` | Assessment or mitigation result |
| `<host>-log` (or `docker-<id>-log`) | file `log` | Run log for that host |
| `fleet-log` | file `log` | scanFleet summary |

## Reports

A custom report runs after each method and renders directly in the terminal:

- **Scan/scanFleet**: Table showing each host's kernel, risk level, CVE
  exposure (Vulnerable/Mitigated/Patched/N/A), IOCs, and status. Names the
  hosts whose XFRM SAs were not checked (the scan was not root, or `ip` is
  missing).
  Includes a copy-pasteable `mitigate` command targeting all vulnerable hosts.
- **Mitigate**: Host status table (APPLIED/SKIPPED/FAILED), commands table with
  descriptions, plus apply/verify instructions.

Suggested commands name the model that ran (`dirtyfrag-web`,
`dirtyfrag-fleet`, ...) and pass `--input hosts` the addresses that were
scanned, which each status records as `targetHost`; the table shows the name
each host reports for itself. A Docker scan suggests no command: containers
share the Docker host's kernel, so mitigate the Docker host itself.

## Prerequisites

- **Linux host** -- the vulnerability is Linux-kernel specific (macOS/Windows
  hosts are not affected)
- **SSH access** to remote hosts (key-based auth) -- not needed for local scans
- **No packages required** on the target -- all checks use POSIX utilities
  (`od`, `grep`, `find`, `head`, `cat`, `test`) and procfs/sysfs, except the
  XFRM SA check, which uses `ip` (iproute2) and needs root; without them it is
  reported as not checked
- **For `mitigate`**: `root`, or passwordless sudo for `tee` and `rmmod` with
  any arguments
- **Docker** (optional) for container-based scanning

## License

AGPLv3
