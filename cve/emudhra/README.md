# @swamp/cve/emudhra

Finds and fixes Linux, macOS and Windows hosts and Linux containers whose TLS
trust still accepts the eight **eMudhra intermediate CAs** whose private keys
were compromised.
Anyone holding one of those keys can issue a certificate for any domain, and
an unpatched client accepts it. Cloudflare's review found no exploitation on
its own services, and no source reports misuse elsewhere.

Timeline (UTC):

- **2026-10-17**: a researcher reports to the root programs that the eight
  intermediates' private keys can be recovered (weak since the certificates
  were created in April 2025). Chrome and Firefox block the TLS
  intermediates the same day.
- **2026-10-18**: eMudhra revokes all eight intermediates.
- **2026-10-19**: the issue is disclosed to downstream trust stores. Apple
  blocks the intermediates.
- **2026-10-20**: Microsoft blocks them through its disallowed certificate
  list.
- **2026-10-20**: public disclosure.

- [Cloudflare: eMudhra certificate compromise](https://blog.cloudflare.com/emudhra-certificate-compromise)
- [emudhra.we-have-a-problem.com](https://emudhra.we-have-a-problem.com/):
  test hosts, the impacted-intermediates list, and a crowdsourced list of
  patched packages

The embedded certificate data was checked on 2026-10-22. Each certificate
was confirmed by verifying its signature against the real issuing root.

## Which trust paths matter

Each of the 8 intermediates (DV, OV and EV TLS CA G3B/G3C, plus OV CS CA
G3B/G3C) was issued twice:

- under **emSign ECC Root CA - G3**, through emSign Root TLS/CS CA - G3
- cross-signed by Sectigo's **AAA Certificate Services**

emSign Root TLS CA - G3 and emSign Root CS CA - G3 are themselves in
Microsoft's root program, so on Windows the emSign path needs no
cross-certificate.

The upstream fixes (webpki-roots 1.0.10, patched distro packages) remove the
emSign ECC Root CA - G3 anchor. Current stores also no longer trust AAA
Certificate Services for TLS. Older stores do: Debian 12's `20230311` bundle
trusts both paths.

Blocklisting the intermediates themselves in p11-kit has **no effect on
OpenSSL clients**: curl still connected after it on Fedora 43. So this
extension never relies on that. It judges each host with the verifier its
clients use:

- **Linux**: `openssl verify` for every compromised intermediate against the
  host's own CA bundle.
- **macOS**: `security verify-cert`, the Security framework, which applies
  Apple's block list and the admin trust settings.
- **Windows**: CryptoAPI (.NET's `X509Chain`): the Root, AuthRoot and
  Disallowed stores and Microsoft's automatic root and disallowed-list
  updates.

## Installation

```bash
swamp extension pull @swamp/cve/emudhra
```

## What it checks

| Check | How |
|---|---|
| OS trust store (the verdict) | **Linux**: `openssl verify -CAfile <system bundle>` for the 12 TLS and 2 AAA-issued code-signing certificates; certificates go through here-documents. Without openssl, the bundle is matched by public key. **macOS**: `security verify-cert -l -L -p basic` for all 16 (offline; the basic policy, because a CA certificate can't be checked against the TLS or code-signing policy without a leaf). **Windows**: an `X509Chain` for all 16, revocation not checked, so the verdict shows the block list rather than whether a CRL happened to be reachable. |
| ca-certificates version (Linux) | `dpkg-query`, `rpm`, `apk` or `pacman`, compared against the fixed versions below |
| Deselected, blocked or denied roots | `/etc/ca-certificates.conf` and the p11-kit blocklists (Linux); admin deny trust settings (macOS); the Disallowed stores and the AuthRoot update policy (Windows) |
| Runtimes with bundled roots | `node`, `deno`, `swamp`, `bun` and `go` on PATH (absolute entries only). On Windows a version is read from the binary's version resource where it has one. |
| Java | every `cacerts` in a Java home up to two levels under `/usr/lib/jvm`, `/opt` and `/usr/local` (Linux), `/Library/Java/JavaVirtualMachines` and apps' bundled `jbr` or `jre` (macOS), `Program Files`, `Program Files (x86)` and `%LOCALAPPDATA%\Programs` (Windows), plus `JAVA_HOME` and the distribution's stores. JKS and PKCS#12 are read directly, with no `keytool` and no password, matched by public key, honouring the runtime's `lib/security/blocked.certs`. |
| Python certifi and pip | `certifi/cacert.pem` and pip's vendored copy in system site-packages, Python installs and under `searchPaths`, matched by public key |
| Other CA bundles | `/etc/ssl/cert.pem` and Homebrew's `ca-certificates` and `openssl@3` bundles (macOS); Git for Windows' `ca-bundle.crt` |
| Electron apps | apps with `resources/app.asar` under `/opt`, `/usr/lib` and `/usr/share` (Linux), `/Applications` (macOS, from the Electron Framework's version), `%LOCALAPPDATA%` and `Program Files` (Windows), against the patched Electron lines |
| Rust | `Cargo.lock` under `searchPaths`, checked for `webpki-roots` and `rustls-webpki` versions |
| Erlang / Elixir | `mix.lock` and `rebar.lock` under `searchPaths`, checked for hex `certifi`, `castore` and `tls_certificate_check` |
| Cloudflare agents | `cloudflared --version`; `warp-cli --version` (Linux), the WARP app's version (macOS), the Uninstall registry (Windows) |
| Live check (`liveCheck=true`) | `curl --noproxy '*'` and `openssl s_client` from the target to the emSign and AAA test hosts. On Windows `curl.exe` uses Schannel, so it tests the OS store; a certificate it refuses (exit 35 with a `CRYPT_E_` or `CERT_E_` code) counts as rejected. |

Checked on macOS 27.0.1: the Security framework rejects all twelve TLS
copies as revoked, but the AAA cross-signs of the two code-signing
intermediates still verify, and `/etc/ssl/cert.pem` (which curl, git and
other LibreSSL clients read) still carries AAA Certificate Services and
emSign ECC Root CA - G3. A Mac with Apple's block can still be exposed
through both. On macOS and Windows, `mitigate` distrusts code-signing copies
the platform verifier still trusts, as well as TLS ones.

Bundles and Java stores are sent back to swamp and matched there, by the
SHA-256 of each certificate's public key, so any copy of a root or
intermediate counts, whoever signed it. Each distinct file is sent once,
up to 4 MB each, 64 files and 16 MB in all per target, with the OS bundle
first; anything past that is listed under `unreadable`.

Binaries are only run from PATH and standard directories, never from
`searchPaths`. There, the scan only reads files.

### Fixed versions

| Component | Fixed in |
|---|---|
| Ubuntu ca-certificates | 20260816ubuntu0.22.04.1, 0.24.04.1, 0.26.04.1, 0.26.10.1 |
| Debian ca-certificates | 20250419~deb12u2 (12), 20250419+deb13u1 (13), 20260816+nmu1 (sid) |
| Alpine ca-certificates | 20261020-r0 |
| Fedora ca-certificates | 2026.2.92_v9.0.319 |
| Arch ca-certificates-mozilla | 3.131.1-1 |
| RHEL, Amazon Linux | no published fix yet; `mitigate` distrusts the anchor |
| Node.js | 22.23.4, 24.22.1, 26.12.1 |
| Go | 1.26.10, 1.27.3 |
| certifi | 2026.10.19 |
| Rust | both webpki-roots 1.0.10 (removes the emSign root) and rustls-webpki 0.103.16 (blocks the intermediates' keys); older rustls-webpki lines such as 0.101.x are unfixed |
| Elixir castore | 1.0.22 |
| Erlang tls_certificate_check | 1.36.0 (updated roots; probably fixed) |
| Erlang hex certifi | no fixed release (2.17.0; erlang-certifi#56 and #58 open); hackney uses it by default |
| Deno | 2.9.8 (includes denoland/deno#37046, which also blocks the intermediates' keys) |
| Bun | no release yet: the fix is merged (oven-sh/bun#46300, #46159); 1.4.3 is exposed |
| swamp | releases from 20261021.223953 on, built on Deno 2.9.8 (swamp-club #3699); upgrade with `swamp update` |
| cloudflared | 2026.10.2 |
| Cloudflare One / WARP | 2026.8.2115.0 (Linux, macOS and Windows) |
| Electron | 42.11.16, 43.8.1, 44.9.1; earlier major lines have no fix |
| pip (vendored certifi) | 26.2.2 |

The verdict never depends on this table: a host with an unlisted package
version is still judged by what its store trusts.

These follow the OS store, so the OS verdict covers them: Zig
(`std.crypto.Certificate.Bundle`), Erlang OTP `:ssl` with
`public_key:cacerts_get/0`, Rust's `rustls-native-certs`, `native-tls` and
`openssl` crates, and Go on Linux. Erlang `:ssl` does not check revocation by
default.

Bundle-only fixes (castore, certifi, webpki-roots alone, the OS
ca-certificates) work by removing the roots the intermediates chain to. The
runtimes that also block the intermediates' keys (rustls-webpki 0.103.16,
Deno 2.9.8, Node's fixed releases, Bun once released) give stronger
protection.

## Methods

| Method | Description |
|---|---|
| `scan` | Scan one target: local, SSH, a Docker container, or a Docker image (started, scanned and removed) |
| `scanFleet` | Scan several SSH hosts in parallel with a shared key (`user@host` sets a host's user) |
| `mitigate` | Scan, then fix the OS store and upgrade affected agents on exposed hosts. `dryRun` defaults to `true`. |

## Inputs

| Global argument | Default | Description |
|---|---|---|
| `targetHost` | `localhost` | SSH host, or `localhost` for the local machine |
| `sshUser` | `root` | SSH user (also used for every host in `hosts` not given as `user@host`) |
| `sshKey` | | SSH private key |
| `dockerContainer` | | Container to scan (overrides SSH) |
| `dockerImage` | | Image to start, scan and remove |
| `searchPaths` | | Comma-separated absolute directories to search for `Cargo.lock`, `mix.lock`, `rebar.lock` and certifi bundles |
| `liveCheck` | `false` | Also connect to the test hosts from the target |
| `targetOs` | `auto` | `linux`, `macos` or `windows`. `auto` asks an SSH target with `uname -s` first (a Windows login shell answers that it doesn't know `uname`); set it to skip that round trip |

On a Windows target, `searchPaths` takes absolute Windows paths (`C:\srv` or
`\\server\share\py`) and is searched for certifi bundles only; `Cargo.lock`,
`mix.lock` and `rebar.lock` are not checked there, and the scan says so under
`unreadable`.

`scanFleet` takes `hosts` (comma-separated). `mitigate` takes `dryRun` and an
optional `hosts`. A `hosts` entry may be `user@host` to log in to that host as
`user` instead of `sshUser`.

## Usage

```bash
swamp repo init

# This machine
swamp behavior create @swamp/cve/emudhra emudhra-scanner
swamp behavior run emudhra-scanner scan

# This machine, with the live check and a search for Rust and Python projects
swamp behavior create @swamp/cve/emudhra emudhra-deep \
  --global-arg liveCheck=true --global-arg searchPaths=/srv,/opt/apps
swamp behavior run emudhra-deep scan

# A remote host
swamp behavior create @swamp/cve/emudhra emudhra-remote \
  --global-arg targetHost=10.0.1.50 --global-arg sshUser=ubuntu \
  --global-arg sshKey=~/.ssh/id_ed25519
swamp behavior run emudhra-remote scan

# A fleet (each host uses the model's sshUser and sshKey)
swamp behavior run emudhra-remote scanFleet \
  --input hosts=10.0.1.50,10.0.1.51,10.0.1.52

# A fleet with a different login on some hosts (plain entries use sshUser)
swamp behavior run emudhra-remote scanFleet \
  --input hosts=ubuntu@10.0.1.50,admin@10.0.1.51,10.0.1.52

# A container image
swamp behavior create @swamp/cve/emudhra image-scan \
  --global-arg dockerImage=alpine:3.22
swamp behavior run image-scan scan
```

### Where swamp runs, and what it can scan

| swamp runs on | localhost | SSH to Linux or macOS | SSH to Windows | Docker |
|---|---|---|---|---|
| Linux, macOS | yes | yes | yes | yes |
| Windows | yes | yes, with temporary files (below) | no: scan it locally, or from Linux or macOS | untested |

A Windows target over SSH gets a PowerShell probe (Windows PowerShell 5.1,
which every supported Windows has), sent through a short launcher in
`-EncodedCommand`, so the login shell can be cmd.exe, Windows PowerShell or
pwsh. A Windows host whose login shell is Git for Windows', MSYS2's or
Cygwin's sh is recognised too.

From a Windows machine, Windows OpenSSH can't carry the probe over pipes: it
never exits, and it stops delivering output partway past about 160 KB. So
swamp runs each ssh through cmd.exe with its input and output in local
temporary files, uploads the probe to a temporary file on the target, runs
it with its output to two more, reads them back 64 KB at a time and removes
all three. Those are the only files a scan writes to a target.

Windows containers are not supported; the container probe is POSIX sh.

The inputs in the table above are global arguments: set them with
`--global-arg` when you create the behavior. Only `hosts` and `dryRun` are
passed to a method with `--input`.

### Sample scan output

Four real scans from 2026-10-21, with live checks: Debian 12 with its
`20230311` package, and stock Fedora 43, Alpine 3.22 and Ubuntu 24.04
containers (Ubuntu with ca-certificates installed). Hostnames are container
IDs.

```
| Host         | OS                             | Risk     | OS store                  | ca-certificates                       | Exposed components | Live check                                                                                  |
| ------------ | ------------------------------ | -------- | ------------------------- | ------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| 7e3447413495 | Debian GNU/Linux 12 (bookworm) | CRITICAL | TRUSTS (emsign, aaa path) | 20230311+deb12u1 (exposed)            | none               | curl emsign: accepted, openssl emsign: accepted, curl aaa: accepted, openssl aaa: accepted |
| 66711e6f87a1 | Fedora Linux 43                | CRITICAL | TRUSTS (emsign path)      | 2025.2.80_v9.0.304-1.2.fc43 (exposed) | none               | curl emsign: accepted, curl aaa: rejected                                                   |
| 639cf4c61ab9 | Alpine Linux v3.22             | CRITICAL | TRUSTS (emsign path)      | 20260909-r0 (exposed)                 | none               | -                                                                                           |
| fc6729a9c1cd | Ubuntu 24.04.5 LTS             | NONE     | rejects                   | 20260816ubuntu0.24.04.1 (fixed)       | none               | curl emsign: rejected, openssl emsign: rejected, curl aaa: rejected, openssl aaa: rejected |
```

Stock Debian and Ubuntu images ship no CA bundle at all. They report
`unknown`, and the scan lists the missing bundle under `unreadable`.

## Mitigation

`mitigate` scans first and skips hosts that are clean. For each exposed host
it plans:

1. **Upgrade ca-certificates**:
   - `apt-get install --only-upgrade` on Debian and Ubuntu
   - `dnf`/`yum upgrade` on the RHEL family
   - `apk upgrade` on Alpine
2. **If the store still trusts the intermediates afterwards**, distrust the
   root, as the upstream fixes do:
   - **Debian/Ubuntu**: deselect `mozilla/emSign_ECC_Root_CA_-_G3.crt` (and
     `mozilla/Comodo_AAA_Services_root.crt` when the AAA path verified) in
     `/etc/ca-certificates.conf`, then run `update-ca-certificates`.
   - **RHEL, Fedora, Amazon Linux**: install the root's PEM into
     `/etc/pki/ca-trust/source/blocklist/`, then run `update-ca-trust extract`.
   - **Arch and derivatives**: install the root's PEM into
     `/etc/ca-certificates/trust-source/blocklist/`, then run
     `update-ca-trust extract`. mitigate does not upgrade packages on Arch,
     where partial upgrades are unsupported; run `pacman -Syu` yourself.
   - **Alpine, others**: reported as manual (upgrade the OS).
   - **Windows**: add each intermediate CryptoAPI still trusts (never a
     root) to the LocalMachine Disallowed store. Microsoft's own block
     arrives through the automatic disallowed-list update; the entries
     cover a machine that has not received it. If automatic root or
     disallowed-list updates are turned off, turning them back on is listed
     as a manual step.
   - **macOS**: changing admin trust settings asks for user interaction, so
     mitigate does not apply it over SSH. It saves a script that adds a deny
     trust setting (`security add-trusted-cert -d -r deny`) for each
     intermediate that still verifies, to run in a local Terminal with sudo,
     or the same certificates can go out as an MDM Deny payload. Updating
     macOS brings Apple's own block.
3. **Upgrade cloudflared or cloudflare-warp** when installed from a Debian
   or RHEL-family package, and restart their units. On macOS and Windows
   they are listed as manual upgrades.
4. **Rescan** and record the before and after verdicts.

Distrusting emSign ECC Root CA - G3 also breaks legitimate sites that chain
to it, the same as the upstream fixes. `dpkg-reconfigure ca-certificates` can
re-enable a deselected root; the fixed package removes it for good.

Containers are never modified. For a Docker target, `mitigate` reports
`rebuild-image` with the Dockerfile line to add.

`mitigate` reports these as manual actions, without changing them: Deno
(upgrade to 2.9.8 with `deno upgrade`), swamp (`swamp update`), Bun (no fixed
release), Java stores, certifi and other bundles, Electron apps, and
`Cargo.lock`, `mix.lock` and `rebar.lock` entries. It never disables certificate verification.

```bash
swamp behavior run emudhra-scanner mitigate                       # dry run
swamp behavior run emudhra-scanner mitigate --input dryRun=false  # apply
swamp behavior run emudhra-scanner mitigate \
  --input hosts=10.0.1.50,10.0.1.51 --input dryRun=false
```

## Privileges

`scan` needs no root or administrator rights and never uses sudo. It writes
nothing to the target, with two exceptions, both removed when it ends:

- On macOS, `security verify-cert` reads certificates from files, so they
  go to a private temporary directory.
- From a Windows machine over SSH, the probe and its output go through
  three temporary files (see above).

Anything it can't read is listed under `unreadable`; it is never guessed.

`mitigate` only connects to SSH hosts whose key is already known
(`StrictHostKeyChecking=yes`); `scan` records a new host's key on first
contact. Run `scan` first, or add the key to `known_hosts`.

On **Windows**, `mitigate` changes the Disallowed store only in an elevated
administrator session: an administrator logging in over Windows OpenSSH
gets one, a standard user does not. Otherwise the host is
**`needs-privilege`**, nothing is changed, and the `mitigationScript` file is
a `.ps1` (`#Requires -RunAsAdministrator`) to review and run in an elevated
PowerShell. On **macOS** the `mitigationScript` file is always the manual
script described above.

On Linux:

`mitigate` runs as root, or as a user with passwordless sudo for the exact
binaries it needs:

- Every privileged command is sent as `sudo -n -- <absolute binary> <args>`,
  with no `sh -c` wrapper, so sudoers rules scoped to those binaries match.
- Files are staged unprivileged with `mktemp /tmp/emudhra.XXXXXX` and put in
  place with `sudo -n -- install -m 0644`.
- Before changing anything (in a dry run too), it asks
  `sudo -n -l <full command>` for every privileged command the host's plan
  will run, so rules that pin arguments are honoured. `install` is checked as
  the bare binary, because the staged file's name is random: only a rule that
  allows `install` with any arguments passes. If the upgrade changes what has
  to be distrusted, the new commands are checked again before they run.
- `sudo -l` also passes a rule that would ask for a password, so the
  pre-check reads `sudo -n -ll` as well. A command counts as allowed only
  when the last entry matching it (arguments included, as sudoers matches)
  runs as root without a password (`NOPASSWD`). A command the plan names
  without a full path (its binary was outside the system directories) never
  passes; use the mitigation script there.

If sudo refuses any of them, the host's action is **`needs-privilege`** and
nothing is attempted. The result lists the exact refused commands.

If sudo still asks for a password at run time (a rule the pre-check misread),
`sudo -n` fails that step at once. When nothing had run yet, the host is
reported as `needs-privilege`; otherwise the run stops there and says which
command sudo refused. Steps that already ran stay applied. Each step leaves the store in a
valid state (an upgraded package, a deselected root), so the next run picks
up where this one stopped. A self-contained **`mitigationScript`** file is saved for that host,
so you can review it and run it with sudo yourself, without giving swamp
sudo at all:

```bash
swamp data query 'modelName == "emudhra-scanner" && name == "<host>-mitigation-script"' \
  --select content > emudhra-mitigation.sh
less emudhra-mitigation.sh               # read it first
scp emudhra-mitigation.sh <host>: && ssh -t <host> sudo sh emudhra-mitigation.sh
```

An example sudoers drop-in for an SSH user on Debian or Ubuntu (on the RHEL
family, use the `dnf` and `update-ca-trust` forms the dry run shows):

```
# visudo -f /etc/sudoers.d/swamp-emudhra
deploy ALL=(root) NOPASSWD: /usr/bin/apt-get update -q, \
  /usr/bin/apt-get install -y -q --only-upgrade -o Dpkg\:\:Options\:\:=--force-confold ca-certificates, \
  /usr/sbin/update-ca-certificates, \
  /usr/bin/install
```

Escape the colons in the `Dpkg::Options` argument; sudoers treats `:` as a
separator. sudo matches the full command, so copy each command exactly from
your host's dry run: for example, when `ca-certificates-java` is installed the
`apt-get install` line names it too, and a rule without it does not match.

**Allowing `install` is equivalent to granting root.** It can write any file,
including into `/etc/sudoers.d`. A wildcard rule such as
`install -m 0644 /tmp/emudhra.* /etc/ca-certificates.conf` does not prevent
that, because sudoers wildcards also match spaces and extra arguments.
`install` is only needed when a root must be distrusted, which is the case when
no fixed package is available. If you won't grant it, leave it out: those
hosts come back as `needs-privilege`, and you run their `mitigationScript`
yourself.

## Deno and swamp stopgap

Deno, and swamp (a compiled Deno binary), use a bundled root store, so a
fixed OS store does not protect them. **Both have fixed releases: run
`deno upgrade` for Deno 2.9.8, and `swamp update` for swamp.** swamp versions
from 20261021.223953 on are built on Deno 2.9.8 (swamp-club #3699); the scan
reports older ones as `exposed`. On a fixed swamp,
`~/.swamp/deno/deno --version` reports 2.9.8.

Until you can upgrade, you can point a Deno program, an older Deno, or swamp
at the OS store:

```bash
DENO_TLS_CA_STORE=system deno run ...
```

- **Fix the OS store first.** The stopgap only helps on a host where `scan`
  reports `rejects`.
- **Use exactly `system`.** `system,mozilla` brings the bundled store back.
- **It only affects processes started with it.** Services need it in their
  unit (for example a systemd drop-in with
  `Environment=DENO_TLS_CA_STORE=system`) and a restart.
- **Remove it once a fixed Deno or swamp release is installed.**
- Whether compiled swamp honours the variable is not confirmed; upgrading
  swamp is the fix.

`mitigate` never sets this variable.

## What a clean result does not prove

- `openssl verify` tests the OS bundle. A program with its own verifier or
  roots can still be exposed: Java, certifi, Node, Deno, Go builds with
  embedded fallback roots, `deno compile` output, and Rust or Go binaries
  that embed `webpki-roots` at build time. The scan checks the ones it can
  find; it can't see roots embedded in arbitrary binaries.
- The live check proves only curl and openssl on that host.
- On Linux, the two emSign-issued code-signing intermediates are not
  verified: their root, emSign Root CS CA - G3, is in no Linux store. Their
  AAA-issued copies are checked. macOS and Windows check all 16.
- The Windows verdict does not check revocation. A machine that rejects the
  intermediates only because Schannel checks revocation (as browsers do)
  still reads as trusting them, because many other clients don't check it.
- Electron apps outside the install roots above (portable apps, Snap,
  Flatpak) and Java homes deeper than two levels are not found; name their
  directories in `searchPaths` where that applies.

## Troubleshooting

- **Windows: the probe fails at once.** Antivirus with AMSI scanning
  (Defender) can block a PowerShell script run with `-ExecutionPolicy
  Bypass` from stdin. The scan then fails with the launcher's error rather
  than reporting a clean host.
- **`could not tell the target's OS`.** Set `targetOs`.

## Risk levels

| Level | Meaning |
|---|---|
| `critical` | The OS store trusts a compromised intermediate, or a live check accepted a test host |
| `high` | A runtime, agent, Electron app, Java store or CA bundle is exposed or has no fix |
| `medium` | Only lockfile entries (`Cargo.lock`, `mix.lock`, `rebar.lock`) or an old Go are exposed; Go uses the OS store on Linux, so it matters only for builds that embed fallback roots |
| `low` | Nothing exposed, but something could not be checked |
| `none` | Nothing checked trusts the compromised intermediates |

## Reports

`@swamp/cve/emudhra-report` runs after each method. It renders a per-host table
(scan and scanFleet), or the before/after, steps and privilege outcome
(mitigate).

Each host's log is `<host>-log`. `scanFleet` and `mitigate` also write a
one-line-per-host `fleet-summary` and `mitigate-summary` log.
