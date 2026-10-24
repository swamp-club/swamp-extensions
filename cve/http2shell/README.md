# @swamp/cve/http2shell

Finds and fixes Brotli decoders exposed to **CVE-2026-111497**, the Brotli
decoder out-of-bounds write disclosed on **2026-10-21** as "Node2Shell" and
since called "HTTP2Shell", because every HTTP library and service that
decodes Brotli is affected (CVSS 4.0 9.2, GHSA-9v8h-qqgm-4m35).

The bug is in Google's C Brotli decoder, versions **1.0.3 through 1.2.0**.
`DecodeBlockTypeAndLength()` returned a boolean, so a malformed block switch
was read as "needs more input": the decoder kept going with stale block state
and wrote past an 8-byte internal buffer. The result is a crash, a leak of
process memory, or code execution (Imperva ran code in an unmodified Node.js
24.22.0 on Linux arm64, though not reliably). No exploitation in the wild had
been reported on 2026-10-22.

The attacker needs no account, and can reach the decoder from either side:

- **Inbound**: a request body sent with `Content-Encoding: br` to Express 5
  or body-parser 2 (5.0–5.3 and 2.0–2.3 were tested), Envoy or Istio.
- **Outbound**: a Brotli response from a server you do not control (webhooks,
  URL previews, crawlers, "fetch this URL" features). Node's `fetch()`
  decodes it, and so do urllib3/requests, aiohttp, `httpx[brotli]` and Scrapy
  whenever the Python `Brotli` or `brotlicffi` package is installed. Your
  code does not have to import Brotli.

pip-audit, Dependabot and Safety did not flag the affected PyPI versions when
this was written (2026-10-23), so this extension checks versions itself.

## Fixed versions

| Component | Affected | Fixed in |
| --- | --- | --- |
| Google Brotli (C) | 1.0.3 – 1.2.0 | 1.0.10, 1.1.1, 1.2.1 (commit `0ed4268`) |
| Node.js 22 / 24 / 26 | below the fix | 22.23.4, 24.22.1, 26.12.1 |
| Node.js 20, 23, 25 and older | all | no fix (end of life) |
| Bun | below 1.4.4 | 1.4.4 |
| Python `Brotli` | 1.2.0 and older | 1.2.1 |
| Python `brotlicffi` | 1.2.0.x and older | 1.2.1.0 |
| Envoy | below the fix | 1.37.8, 1.38.6, 1.39.3, 1.40.0 (1.36.12, out of support) |
| Istio | below the fix | 1.29.9 (end of life), 1.30.6, 1.31.2 |
| Ruby `brotli` gem | below 0.9.1 | 0.9.1 |
| .NET runtime | bundles Brotli 1.1.0 | no fix released yet |

Distributions backport the fix without changing the upstream version, so a
distro build below these versions may still be fixed. The extension knows
the builds a security tracker listed as of **2026-10-24 18:00 UTC**:

| Distro | Package | Status | Reference |
| --- | --- | --- | --- |
| Debian 12 (bookworm) | libbrotli1, python3-brotli | fixed in 1.0.9-2+deb12u1 | Debian security tracker |
| Debian 13 (trixie) | libbrotli1, python3-brotli | fixed in 1.1.0-2+deb13u1 | Debian security tracker |
| Debian forky / sid | libbrotli1, python3-brotli | 1.2.0-4 and older affected, no fix yet | Debian security tracker |
| Amazon Linux 2023 | libbrotli, brotli | affected, fix pending | Amazon Linux security center |
| Amazon Linux 2023 | nodejs22 | not affected | Amazon Linux security center |
| Amazon Linux 2023 | nodejs24 | affected, fix pending | Amazon Linux security center |
| Amazon Linux 2023 | nodejs, nodejs20 | no fix planned | Amazon Linux security center |

A build at or below a "no fix yet" entry is `vulnerable`; a newer build that
the snapshot does not know is `check-vendor`. Any other distro build below the
upstream fix (Ubuntu, RHEL, Fedora, Alpine, SUSE when this was written) is
`check-vendor`, never guessed either way.

Not affected, and listed in every result so their absence is not mistaken for
a gap: Rust `brotli-decompressor` (so Deno, and swamp itself, which is built on
Deno), the Java, JavaScript and C# ports, and Go's `andybalholm/brotli` (same
logic error, but it can only crash; fixed 2026-10-23).

## Installation

```bash
swamp extension pull @swamp/cve/http2shell
```

## What it detects

| Check | How |
| --- | --- |
| System Brotli library | `libbrotli1` (dpkg), `libbrotli` or `brotli` (rpm), `brotli-libs` (apk), `brotli` (Homebrew), against the tracker table above |
| Node.js | `node` on `PATH`, `/usr/local`, `/opt`, Homebrew, and in nvm, fnm, volta, asdf, mise and n installs; `process.versions.brotli`; whether it links the system `libbrotlidec` (`ldd`, or `otool -L` on macOS) and which package owns it |
| Bun | `bun` on `PATH` and in `~/.bun` |
| Python | `Brotli` and `brotlicffi` read from `dist-info`/`egg-info` directory names in the system, `/usr/local`, Homebrew, framework, conda, pyenv, uv, pipx and user site directories, and every virtualenv (`pyvenv.cfg`) under `searchPaths`; plus urllib3, requests, aiohttp, httpx and Scrapy next to them. No interpreter is started |
| .NET | `shared/Microsoft.NETCore.App/<version>` under the usual install roots; whether `libSystem.IO.Compression.Native` links the system library |
| Envoy and Istio | `envoy --version`; `pilot-agent version` |
| curl | `curl -V` (the `brotli/x.y.z` it reports) and whether it links the system library |
| Ruby | `brotli-*` gem directories |
| Electron apps | `resources/app.asar` under `/opt`, `/usr/lib`, `/usr/share` and `/Applications` |
| Lockfiles | `poetry.lock`, `uv.lock`, `requirements*.txt`, `Pipfile.lock`, `package-lock.json` (Express 5 and body-parser 2 or later as inbound exposure) and `Gemfile.lock` under `searchPaths` (depth 6, files under 5 MB, `node_modules` and `.git` skipped) |
| Old code still running | Processes that map a Brotli library or Python `_brotli` module deleted on disk, or run a deleted `node`, `bun` or `envoy`, from `/proc/<pid>/maps` and `/proc/<pid>/exe`, with their systemd unit. Without root only your own processes are visible, and the result says so. On a host, container processes are skipped: they map their image's libraries, so scan the container itself |
| Exposure | Listening sockets (`ss`, `netstat`, or `lsof` on macOS) owned by node, bun, envoy, Python and similar servers on a non-loopback address |

A component that links the system library takes that library's verdict:
Debian's and Homebrew's `node`, distro `curl` and distro `.NET` are fixed by
upgrading the library, not by their own version. Upstream Node.js builds and
Microsoft's .NET bundle their own copy.

The probe is one POSIX `sh` script, so it works on Alpine and other images
without bash. It runs `node`, `bun`, `envoy`, `pilot-agent` and `curl` for
their versions, with `NODE_OPTIONS`, `PYTHONPATH` and `PYTHONSTARTUP` unset.
Binaries are only run from `PATH` and the standard install directories, never
from `searchPaths`; there the scan only reads files. Scanning never uses sudo.

**It never runs, or runs `ldd` on, a binary that someone other than root or
the scanning user could have written.** The file and every directory above it
must be owned by root or the scanning user and not writable by others, or by
their group unless that group is root's (or, on macOS, `admin`, whose members
can sudo anyway, which keeps Homebrew working). So a root scan reports another
user's `~/.nvm`, fnm, Volta, asdf, mise or `~/.bun` install, or a binary under a
world-writable directory, without running it: its version comes from its
install directory (`.nvm/versions/node/v24.22.0`), its linkage is unknown, and
its note says it was not run. Run the scan as that user to check it fully.

**No indicators of compromise.** None have been published. Crashes during
decompression are a hint to investigate, not proof either way.

### Images and containers without sh

An image is scanned in a container started with `--network none`, so its own
binaries never reach the network while the probe runs them.

Distroless and slim runtime images (`gcr.io/distroless/nodejs*`,
`python3-debian*`) have no `sh`. For those, the scan runs the image's own
`node`, `bun` and `python3` directly (its entrypoint first, then the usual
paths), with no network and `NODE_OPTIONS` cleared, and reads their versions
and Python's installed distributions. OS packages, .NET, curl, lockfiles and
processes are then not checked, and the result lists that under `notChecked`.

### Windows hosts

SSH targets running Windows, and swamp running on Windows with
`targetHost=localhost`, are scanned with a PowerShell probe (Windows
PowerShell 5.1 or later). It needs no administrator rights; as an
administrator it also checks every user's profile and every process. Versions
come from each binary's version resource, so it never runs Node.js, Bun or
Envoy. It looks for:

- `node.exe`, `bun.exe` and `envoy.exe` on `PATH`, in `Program Files\nodejs`,
  nvm-windows (`NVM_HOME`, `%APPDATA%\nvm`), fnm, Volta, Scoop and Chocolatey.
- Python installs from the `PythonCore` registry keys, the per-user installer
  location, the Microsoft Store packages, Anaconda and Miniconda, user site
  directories, and virtualenvs under `searchPaths`, read from `dist-info`.
- .NET runtimes under `Program Files\dotnet\shared\Microsoft.NETCore.App`.
- `curl.exe` in `System32` and in Git for Windows (`curl.exe -V`, the one
  command it runs). Microsoft's build below the fix is `check-vendor`.
- Electron apps under `Program Files` and `%LOCALAPPDATA%`.
- Lockfiles under `searchPaths` (Windows paths; POSIX ones are skipped).
- Running `node`, `bun` and `envoy` processes started before their binary was
  replaced: `restart-required`.

The saved `.ps1` only runs binaries under `Program Files`, `ProgramData` or the
administrator's own profile. Another user's Python or Bun is written as a
comment with the command for that user to run, so running the script elevated
never runs a binary another user could have replaced.

Scanning a Windows host over SSH from swamp running on Windows is not
supported (Windows OpenSSH cannot carry the PowerShell probe that way); run
swamp on the host itself or scan from Linux or macOS.

## Verdicts and actions

| Verdict | Meaning |
| --- | --- |
| `patched` | At or above the fix (upstream, or the tracker's fixed build) |
| `vulnerable` | Affected; `fixedVersion` names the fix when one exists |
| `update-available` | Affected, and the package manager already offers the fixed build |
| `unsupported` | A release line that gets no fix (Node.js 20/23/25, Envoy before 1.36, Istio before 1.29) |
| `no-fix-released` | Affected and the vendor has not shipped a fix (.NET) |
| `restart-required` | Fixed on disk, but a process still runs the old code |
| `check-vendor` | A distro or vendor build below the upstream fix that no known tracker entry covers; confirm it carries commit `0ed4268` |
| `not-affected` | Predates the bug, built without Brotli (curl), or the vendor says so |
| `unknown` | The version could not be read |

Each finding has an `action`: `upgrade`, `restart`, `rebuild-image`
(containers), `update-pin` (lockfiles), `stopgap` (no fix yet), `check-vendor`
or `none`, and an `exposure` list naming how untrusted Brotli reaches it.

## Risk levels

| Risk | When |
| --- | --- |
| `critical` | Something installed is affected and a matching server listens on a public address, or an app inflates Brotli request bodies |
| `high` | Something installed is affected |
| `medium` | Only `check-vendor` or `unknown` findings |
| `low` | Only lockfile pins are affected |
| `none` | Everything found is patched or not affected |

## Methods

| Method | What it does |
| --- | --- |
| `scan` | Scan one host (local or SSH), container or image |
| `scanFleet` | Scan many SSH hosts (Linux, macOS, Windows) in parallel, `concurrency` at a time |
| `mitigate` | Scan, then fix what the package manager can and restart what still runs old code; `dryRun` defaults to true |

## Usage

### Setup

```bash
swamp repo init
swamp behavior create @swamp/cve/http2shell brotli
```

### Scan the local machine

```bash
swamp behavior run brotli scan
```

### Scan a fleet

```bash
swamp behavior create @swamp/cve/http2shell brotli-fleet \
  --global-arg sshUser=ops --global-arg sshKey=~/.ssh/fleet \
  --global-arg searchPaths=/srv,/opt/apps
swamp behavior run brotli-fleet scanFleet --input hosts=web-01,web-02,win-01
```

A host that needs a different login takes it as `user@host`:

```bash
swamp behavior run brotli-fleet scanFleet \
  --input hosts=ubuntu@192.0.2.10,Administrator@192.0.2.11,192.0.2.12
```

`ubuntu@192.0.2.10` logs in as `ubuntu`; a plain entry like `192.0.2.12` uses
the model's `sshUser`. Every host uses the model's `sshKey`. Data and logs are
still named by the host alone, and the report's suggested commands keep each
host's user. Listing one host with two different users is an error.

SSH runs non-interactively (`BatchMode=yes`, so a key or agent must already
work), accepts a new host key on first connection and refuses a changed one,
and gives up connecting after 10 seconds. The scan has a 3-minute limit per
host and package upgrades 30 minutes; a scan that stops early is reported as
an error, never as a clean host.

### Scan a container or an image

```bash
swamp behavior create @swamp/cve/http2shell brotli-api --global-arg dockerContainer=api
swamp behavior create @swamp/cve/http2shell brotli-img \
  --global-arg dockerImage=gcr.io/distroless/nodejs24-debian12
swamp behavior run brotli-img scan
```

### Mitigate

```bash
# Dry run (default): scans, checks sudo, prints the commands
swamp behavior run brotli-fleet mitigate --input hosts=web-01,web-02

# Apply
swamp behavior run brotli-fleet mitigate --input hosts=web-01,web-02 --input dryRun=false

# Also upgrade pip-installed Brotli and brotlicffi in the environments found
swamp behavior run brotli-fleet mitigate --input hosts=web-01 --input dryRun=false --input upgradePython=true
```

### What mitigate does

On Linux hosts:

1. Upgrades every installed brotli library and binding package (`libbrotli1`,
   `python3-brotli`, `libbrotli`, `brotli-libs`, …) and any distro Node.js
   whose own build is affected: `apt-get update` then
   `apt-get install --only-upgrade`, `dnf`/`yum upgrade`, or `apk add --upgrade`.
2. With `upgradePython=true`, runs each affected virtualenv's interpreter with
   `pip install --upgrade "Brotli>=1.2.1" "brotlicffi>=1.2.1.0"`, as the
   scanning user, and only in an environment that user owns and that its
   group and others cannot write, whose interpreter (`bin/pythonX.Y` and what
   it resolves to) passes the same ownership check as every binary the probe
   runs. The check is repeated on the host right before pip runs; if anything
   changed since the scan, the step is refused. Another user's environment is never touched,
   even by a root scan: running their interpreter as root would run their code
   as root. Those, and system and user-site environments, are reported with the
   command for their owner to run (pip refuses externally managed
   environments, and the extension never passes `--break-system-packages`). `removePythonBrotli=true` instead
   uninstalls both packages, the advisory's stopgap: clients fall back to gzip
   and deflate. Lockfile pins are reported, never edited.
3. With `restartServices=true` (the default), rescans and restarts the
   systemd units whose processes still map the old library (`systemctl
   restart -- <unit>`), when the process is a server that decodes Brotli
   (node, bun, envoy, Python, gunicorn, uvicorn, celery, dotnet). Units that no
   longer map it are skipped. Anything else that links libbrotli
   (NetworkManager, a display manager, dbus) is listed for you to restart when
   convenient, so mitigate never drops your SSH session or desktop. Processes
   not run by systemd are listed too; session and init units are never
   restarted. A failed `apt-get update` (one dead source) does not stop the
   install; any other failed upgrade step stops the ones after it.
4. Rescans and reports what is still affected.

Upstream Node.js, Bun, Envoy and .NET are reported with the command to run;
they are not installed by a package manager mitigate can drive.

**Containers** are never changed: the result says `rebuild-image`, with the
fixed versions to build on.

**macOS and Windows hosts** are scanned only. mitigate saves a script
(`.sh` for macOS, `.ps1` for Windows) with the exact commands for each finding
(`brew upgrade brotli`, `nvm install 24.22.1`,
`winget upgrade --id OpenJS.NodeJS.LTS`, `python.exe -m pip install --upgrade
…`) in the `script` file and in the result's `mitigation.script`.

### Stopgaps

Until everything is patched, keep untrusted Brotli away from the decoder.
Every affected result lists these:

- nginx: `if ($http_content_encoding ~* "(^|,)\s*br\s*(,|$)") { return 415; }`
- HAProxy: `http-request deny deny_status 415 if { req.hdr(content-encoding) -m reg -i (^|,)\s*br\s*(,|$) }`
- Envoy: a route matching `content-encoding` with that regex and a
  `direct_response` of 415, ahead of the Brotli decompressor filter.
- Outbound: removing `br` from `Accept-Encoding` is **not** enough, because a
  malicious server can send Brotli anyway. Reject responses whose
  `Content-Encoding` includes `br` before the client decodes them, or
  uninstall the Python `Brotli` and `brotlicffi` packages.

## Privileges

`scan` needs no root and never uses sudo. On Linux, `mitigate` runs its
package and restart commands as root, or as `sudo -n -- <binary> …` after
checking each exact command with `sudo -n -l <command>` and reading
`sudo -n -ll`: a command counts as allowed only when the last rule that
matches it has `NOPASSWD`. If any check fails, the host gets
`needs-privilege`, the exact commands, and no changes. pip steps run as the
scanning user, without sudo.

**Granting package-manager commands through sudo amounts to granting root.**
Pin every rule to the exact command lines the dry run prints, never with
wildcards. sudoers needs `:` and `=` escaped inside arguments:

```
deploy ALL=(root) NOPASSWD: /usr/bin/apt-get update, \
  /usr/bin/apt-get install --only-upgrade -y -o Dpkg\:\:Options\:\:\=--force-confdef -o Dpkg\:\:Options\:\:\=--force-confold libbrotli1 python3-brotli, \
  /usr/bin/systemctl restart -- api.service
```

Hosts without sudo (for example Alpine with doas) are reported as
`needs-privilege`.

## Inputs

### Global arguments (set with `swamp behavior create --global-arg`)

| Argument | Default | Meaning |
| --- | --- | --- |
| `targetHost` | `localhost` | SSH host to scan |
| `sshUser` | `root` | SSH user for remote hosts (and every host in `hosts` not given as `user@host`) |
| `sshKey` | | SSH private key |
| `dockerContainer` | | Container to scan (overrides SSH) |
| `dockerImage` | | Image to start, scan and remove |
| `searchPaths` | | Comma-separated absolute directories to search (read-only) for lockfiles and virtualenvs |

### Method inputs

| Method | Input | Default | Meaning |
| --- | --- | --- | --- |
| `scanFleet` | `hosts` | (required) | Comma-separated hosts; `user@host` logs in as `user` |
| `scanFleet` | `concurrency` | `10` | Hosts scanned at once |
| `mitigate` | `dryRun` | `true` | Only print the commands |
| `mitigate` | `hosts` | | Comma-separated hosts (overrides `targetHost`); `user@host` logs in as `user` |
| `mitigate` | `restartServices` | `true` | Restart units still running the old library |
| `mitigate` | `upgradePython` | `false` | pip-upgrade Brotli and brotlicffi in affected virtualenvs |
| `mitigate` | `removePythonBrotli` | `false` | Uninstall them instead (ignored with `upgradePython`) |

## Reports

`@swamp/cve/http2shell-report` renders, for `scan` and `scanFleet`: a table
per target, the affected decoders with their fixed versions, the
`check-vendor` list, exposure, processes still running old code,
recommendations, what was not checked, the stopgaps, and the `mitigate` dry
run to run next. For `mitigate`: the outcome per host, the commands (planned
or run, with their status), notes and saved scripts, and the command to apply
the dry run or verify the result.

## Limits

- Python environments outside the standard locations and `searchPaths` are
  not found.
- Statically linked copies of Brotli inside other software (DuckDB,
  ClickHouse, Apache Arrow, p7zip, MuPDF, the PHP `brotli` extension) are not
  inventoried.
- Electron apps are always `check-vendor`: their bundled Node.js and Chromium
  versions are not read.
- The distro tracker snapshot ages quickly. Anything it does not cover is
  `check-vendor`, never `patched`.
- There is no live probe: no safe test stream has been published, and sending
  a crafted stream to a vulnerable decoder triggers the bug itself.

## References

- [Node.js October 2026 security releases](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
- [Aikido: HTTP2Shell, the Python packages](https://www.aikido.dev/blog/python-packages-vulnerable-node2shell-brotli-cve-2026-111497)
- [Aikido: Node2Shell](https://www.aikido.dev/blog/node2shell-nodejs-brotli-rce-cve-2026-111497)
- [Broccoli2Shell tracker](https://broccoli2shell.com/)
- [Debian security tracker](https://security-tracker.debian.org/tracker/CVE-2026-111497)
- [Amazon Linux security center](https://explore.alas.aws.amazon.com/CVE-2026-111497.html)
- [Imperva: Node2Shell, from Brotli data to remote code execution](https://www.imperva.com/blog/node2shell-from-brotli-data-to-remote-code-execution/)

## License

AGPL-3.0-or-later. See [LICENSE.txt](LICENSE.txt).
