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
| Module blacklisting | `/etc/modprobe.d/` scan for esp4/esp6/rxrpc install/blacklist rules |
| Page cache corruption (`/usr/bin/su`) | `od` hex dump of first 192 bytes, checks for shellcode signature `31ff31f631c0b06a` |
| Page cache corruption (`/etc/passwd`) | Checks if root entry has empty password field (`root::`) |
| XFRM SA exploit pattern | Looks for sequential SPIs matching `0xDEADBE1x` |
| RxRPC key artifacts | `/proc/keys` scan for rxrpc entries |

No external tools required -- all checks use POSIX utilities and procfs/sysfs.

## Methods

| Method | Description |
|---|---|
| `scan` | Scan a single host (local, SSH, or Docker container) |
| `scanFleet` | Scan multiple hosts in parallel with a shared SSH user/key |
| `mitigate` | Scan-then-fix: checks vulnerability first, only mitigates affected hosts. Accepts a single host or comma-separated list. |

## Usage

### Setup

```bash
swamp repo init
swamp model create @swamp/cve/dirtyfrag dirtyfrag-scanner
```

### Scan the local machine

```bash
swamp model method run dirtyfrag-scanner scan
```

No inputs needed -- defaults to `localhost` and runs checks directly.

### Scan a remote host

```bash
swamp model method run dirtyfrag-scanner scan \
  --input targetHost=10.0.1.50 \
  --input sshUser=ubuntu \
  --input sshKey=~/.ssh/my-key.pem
```

### Scan a fleet

```bash
swamp model method run dirtyfrag-scanner scanFleet \
  --input hosts=10.0.1.50,10.0.1.51,10.0.1.52 \
  --input sshUser=ubuntu \
  --input sshKey=~/.ssh/my-key.pem
```

All hosts are scanned in parallel. Each host gets its own log and resource
output. The report renders a table:

```
| Host            | Kernel         | Risk   | ESP (43284) | RxRPC (43500) | IOCs     | Status     |
| --------------- | -------------- | ------ | ----------- | ------------- | -------- | ---------- |
| ip-172-31-34-40 | 7.0.0-1004-aws | MEDIUM | Vulnerable  | Vulnerable    | XFRM SAs | VULNERABLE |
| ip-172-31-50-12 | 7.0.0-1004-aws | NONE   | N/A         | N/A           | None     | CLEAN      |
```

You can mix local and remote hosts: `--input hosts=localhost,10.0.1.50`.

### Scan a Docker container

Useful for checking the underlying host kernel from inside a container:

```bash
# Existing container
swamp model method run dirtyfrag-scanner scan \
  --input dockerContainer=my-container

# Auto-start an image, scan, then stop
swamp model method run dirtyfrag-scanner scan \
  --input dockerImage=ubuntu:24.04
```

### View results

```bash
# Structured data for a specific host
swamp data get dirtyfrag-scanner <host-or-label> --json | jq .content

# List all data for the model
swamp data list dirtyfrag-scanner --json
```

### Mitigate the local machine

```bash
# Dry run (default) -- shows what it would do
swamp model method run dirtyfrag-scanner mitigate

# Apply
swamp model method run dirtyfrag-scanner mitigate --input dryRun=false
```

### Mitigate a remote host

```bash
# Dry run
swamp model method run dirtyfrag-scanner mitigate \
  --input targetHost=10.0.1.50 \
  --input sshUser=ubuntu \
  --input sshKey=~/.ssh/my-key.pem

# Apply
swamp model method run dirtyfrag-scanner mitigate \
  --input targetHost=10.0.1.50 \
  --input sshUser=ubuntu \
  --input sshKey=~/.ssh/my-key.pem \
  --input dryRun=false
```

### Mitigate multiple hosts

```bash
swamp model method run dirtyfrag-scanner mitigate \
  --input hosts=10.0.1.50,10.0.1.51,10.0.1.52 \
  --input sshUser=ubuntu \
  --input sshKey=~/.ssh/my-key.pem
```

All hosts are scanned first -- only vulnerable hosts are mitigated, clean hosts
are skipped. Add `--input dryRun=false` to apply.

### What mitigation does

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `printf 'install esp4 /bin/false\n...' > /etc/modprobe.d/dirtyfrag.conf` | Blacklist esp4/esp6/rxrpc modules |
| 2 | `rmmod esp4; rmmod esp6; rmmod rxrpc` | Unload modules from running kernel |
| 3 | `echo 3 > /proc/sys/vm/drop_caches` | Flush page cache (clears corrupted entries) |

Auto-detects whether `sudo` is needed based on the connected user.

## Risk Levels

| Level | Meaning |
|---|---|
| `critical` | Active compromise detected, or both variants exploitable with no mitigations |
| `high` | ESP variant exploitable but user namespaces restricted |
| `medium` | Modules available, partially mitigated |
| `low` | Modules exist on disk but all blacklisted or patched (mitigated) |
| `none` | No vulnerable modules present |

Hosts at `low` or `none` are reported as **CLEAN** and will not be mitigated.

## Inputs

All inputs are passed at runtime via `--input key=value`:

| Input | Default | Description |
|---|---|---|
| `targetHost` | `localhost` | SSH host to scan or mitigate |
| `sshUser` | `root` | SSH user |
| `sshKey` | | Path to SSH private key |
| `dockerContainer` | | Container name/ID (overrides SSH) |
| `dockerImage` | | Image to auto-start and scan |
| `suBinaryPath` | `/usr/bin/su` | Path to su binary to check |
| `hosts` | | Comma-separated hosts (scanFleet and mitigate) |
| `dryRun` | `true` | Preview mitigation commands without executing (mitigate only) |

## Reports

A custom report runs after each method and renders directly in the terminal:

- **Scan/scanFleet**: Table showing each host's kernel, risk level, CVE
  exposure (Vulnerable/Mitigated/Patched/N/A), IOCs, and status. Includes a
  copy-pasteable `mitigate` command targeting all vulnerable hosts.
- **Mitigate**: Host status table (APPLIED/SKIPPED/FAILED), commands table with
  descriptions, plus apply/verify instructions.

## Prerequisites

- **Linux host** -- the vulnerability is Linux-kernel specific (macOS/Windows
  hosts are not affected)
- **SSH access** to remote hosts (key-based auth) -- not needed for local scans
- **No packages required** on the target -- all checks use POSIX utilities
  (`od`, `grep`, `find`, `head`, `cat`, `test`) and procfs/sysfs
- **Docker** (optional) for container-based scanning

## License

AGPLv3
