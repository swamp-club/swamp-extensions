# @swamp/cve/php-rce-2026-10

Finds and patches PHP installs exposed to the two critical PHP remote code
execution vulnerabilities fixed on **2026-10-21**:

- **CVE-2026-109618**, RCE via OOM corruption
  ([GHSA-w8hw-w9fx-j79w](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w)).
  Out-of-memory handling can interrupt PHP while request data is only
  partially initialized, and request cleanup then treats it as valid. php.net
  demonstrated an unauthenticated exploit against Apache mod_php that runs
  before any application code.
- **CVE-2026-109619**, RCE via stale global state
  ([GHSA-6wmf-4rv5-p3rp](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp)).
  Request-owned state can survive after its memory is freed, and a later
  request on the same worker uses it.

Both are rated CVSS 9.2 and covered by
[CERT-EU advisory 2026-018](https://cert.europa.eu/publications/security-advisories/2026-018).
php.net considers every PHP install that serves web requests at risk:
PHP-FPM, Apache mod_php, php-cgi, FrankenPHP and LiteSpeed.

## Fixed versions

| Branch | Fixed in | Source |
| --- | --- | --- |
| 8.5 | 8.5.12 | php-src advisories, 2026-10-21 |
| 8.4 | 8.4.27 | php-src advisories, 2026-10-21 |
| 8.3 | 8.3.36 | php-src advisories, 2026-10-21 |
| 8.2 | 8.2.35 | php-src advisories, 2026-10-21 |
| 8.1 and older | no upstream fix | vendor backports, or php.net's source backports for 7.4, 8.0 and 8.1 |

Distributions backport the fix without changing the upstream version number,
so a distro package below these versions may still be fixed. The extension
knows the distro builds that a security tracker marked fixed as of
**2026-10-22 13:47 UTC**:

| Distro | Package | Fixed build | Reference |
| --- | --- | --- | --- |
| Debian 12 (bookworm) | php8.2 | 8.2.35-1~deb12u1 | DLA-4848-1 |
| Debian 13 (trixie) | php8.4 | 8.4.27-1~deb13u1 | DSA-6574-1 |
| Ubuntu 22.04 | php8.1 | 8.1.2-1ubuntu2.28 | USN-8948-1 |
| Ubuntu 24.04 | php8.3 | 8.3.6-0ubuntu0.24.04.13 | USN-8948-1 |
| Ubuntu 26.04 | php8.5 | 8.5.4-0ubuntu1.5 | USN-8948-1 |
| Ubuntu 26.10 | php8.5 | 8.5.9-0ubuntu2.1 | USN-8948-1 |
| RHEL 10 | php | 8.3.36-1.el10_2 | RHSA-2026:87070 |
| RHEL 10 | php8.4 | 8.4.27-1.el10_2 | RHSA-2026:87071 |
| RHEL 9 | php:8.2 | 8.2.35-1.module+el9.8.0+25111+a1450321 | RHSA-2026:87072 |
| RHEL 9 | php:8.3 | 8.3.36-1.module+el9.8.0+25109+6886e21a | RHSA-2026:87079 |
| RHEL 9 | php (8.0) | 8.0.30-8.el9_8.1 | RHSA-2026:87151 |
| RHEL 8 | php:8.2 | 8.2.35-1.module+el8.10.0+25110+f67151d2 | RHSA-2026:87073 |
| RHEL 8 | php:7.4 | 7.4.33-8.module+el8.10.0+25117+30337cca | RHSA-2026:87080 |
| RHEL 10.0 EUS | php | 8.3.19-1.el10_0.2 | RHSA-2026:88561 |
| RHEL 9.6 EUS | php (8.0) | 8.0.30-3.el9_6.2 | RHSA-2026:88720 |
| RHEL 9.6 EUS | php:8.2 | 8.2.28-1.module+el9.6.0+25176+d8415d54.4 | RHSA-2026:88834 |
| RHEL 9.4 SAP | php (8.0) | 8.0.30-1.el9_4.2 | RHSA-2026:88725 |
| RHEL 9.4 SAP | php:8.2 | 8.2.13-1.module+el9.4.0+25177+88c847cf.4 | RHSA-2026:88835 |
| RHEL 9.2 SAP | php (8.0) | 8.0.30-1.el9_2.2 | RHSA-2026:88659 |
| RHEL 8.8 TUS/SAP | php:7.4 | 7.4.33-1.module+el8.8.0+25148+55cf9df9.2 | RHSA-2026:88532 |
| RHEL 8.6 AUS/EUS | php:7.4 | 7.4.19-4.module+el8.6.0+25157+c2ff122e.3 | RHSA-2026:88533 |
| RHEL 8.4 AUS/EUS | php:7.4 | 7.4.6-5.module+el8.4.0+25156+e0c98721.3 | RHSA-2026:88565 |
| RHEL 7 ELS | php (5.4) | 5.4.16-48.el7_9.1 | RHSA-2026:88693 |

The RHEL rows were read from Red Hat's advisories on 2026-10-24. RHEL builds
are compared with rpm's version ordering and matched on the major release and
the PHP branch, so a RHEL 9.6 host uses the RHEL 9 rows. A build whose release
tag names a minor with its own advisory (`el9_6`, `module+el9.6.0`: the EUS,
AUS, TUS and SAP streams) is `patched` at that minor's fix; any other build is
judged by the main stream's row. RHEL 8 php:7.4, RHEL 9 php 8.0 and RHEL 7 php 5.4 are
backports: they are `patched` at the builds above even though those branches
get no upstream fix (RHEL 7 is not affected by CVE-2026-109618). An older build
in a listed stream is `update-available`; on a host below the main stream's
minor, the note says which advisory a host pinned to that minor gets, or that
Red Hat had none. Only releases Red Hat builds for the host's major (`.el9`,
`.el9_8`, `module+el9.8.0+…` on RHEL 9) are matched. Remi builds
(`8.2.30-1.el9.remi`) follow upstream releases on branches with an upstream
fix, so like Sury builds they are judged by their upstream version; Remi's
7.4, 8.0 and 8.1 builds carry backports, so they stay `check-vendor`, as does
any other rebuild.

Debian fixed bookworm and trixie with new upstream releases (8.2.35, 8.4.27),
so an older Debian build such as `8.2.34-1~deb12u1` is reported as
`update-available` with the advisory that fixes it. A tracker entry only
vouches for builds of its own upstream version: a package from another
repository, such as `ppa:ondrej/php` (`8.3.35-1+ubuntu24.04.1+deb.sury.org+1`),
sorts above the Ubuntu backport without containing the fix. Sury builds follow
upstream releases, so they are judged by their upstream version, and one below
the fix gets the action `upgrade`. Any other
distro build below the upstream fix is reported as `check-vendor`, never guessed
either way.

## Installation

```bash
swamp extension pull @swamp/cve/php-rce-2026-10
```

## What it detects

| Check | How |
| --- | --- |
| PHP binaries | `php`, `php8.x`, `php-fpm*`, `php-cgi*`, `frankenphp`, `lsphp` on `PATH` and in the usual sbin, `/usr/local` and Remi paths, with `-v` output |
| Apache mod_php | `libphp*.so` / `mod_php*.so` modules, and whether Apache loads them |
| Packages | Owner of each binary and module (`dpkg -S`, `rpm -qf`, `apk info --who-owns`) and its version |
| Pending updates | `apt list --upgradable`, `dnf`/`yum check-update` (cache only), `apk version` |
| Containers on a host | `docker ps` + `docker inspect` for `PHP_VERSION`, published ports. Nothing is run inside them |
| Public listening | php-fpm `listen` on all or non-loopback interfaces; a web server on a non-loopback port with config that passes requests to PHP |
| Exposure settings | `memory_limit`, `post_max_size`, `session.upload_progress.enabled`, `fatal_error_backtraces` (8.5) from the ini files of the SAPI that serves requests, with FPM pool `php_admin_value` overrides |
| Per-request INI overrides | `php_value`/`php_admin_value` in Apache config, `PHP_VALUE` in nginx config, and `.htaccess` files under the document roots (depth 4, first 500 files) |
| Log hints | Worker segfaults and memory-exhaustion lines in the last 20,000 lines of PHP-FPM, Apache and nginx error logs |
| Stale workers | Processes that still map a PHP binary or `libphp` deleted on disk, from `/proc/<pid>/maps`: they run the old code until restarted. Without root only your own processes are visible |

The ini files are read per layout: Debian/Ubuntu `/etc/php/<v>/<sapi>/`,
RHEL-family `/etc/php.ini` + `/etc/php.d` + `/etc/php-fpm.d`, Remi
`/etc/opt/remi/php*/`, official Docker images `/usr/local/etc/php/`, and Alpine
`/etc/php<NN>/`. Other layouts are not guessed from the CLI's settings.

**No indicators of compromise.** The advisories publish none, and say
exploitation can happen without a predictable log entry. The log counts are
hints to review, not proof of compromise or of safety.

The probe is one POSIX `sh` script, so it works on Alpine and other images
without bash. Scanning never uses sudo. Anything it could not read without root
is listed under `unreadable`.

### Windows hosts

SSH targets running Windows are scanned too. When a host has no `sh`, or its
`sh` comes from Git for Windows, MSYS2 or Cygwin, the scan runs a PowerShell
probe instead (Windows PowerShell 5.1 or later, through the Windows OpenSSH
server, with cmd, PowerShell or pwsh as its default shell). It needs no
administrator rights and never runs PHP: versions come from each binary's
version resource, so a build that cannot start is still found, and one without
a version resource is reported as `unknown`. It looks for:

- `php.exe`, `php-cgi.exe` and the Apache handler `php*apache2_4.dll` on `PATH`,
  under `C:\php*`, `C:\tools\php*` (Chocolatey), XAMPP, WampServer, Laragon,
  Scoop, `Program Files\PHP` and IIS Express, and wherever a running `php`,
  `php-cgi`, `httpd` or `nginx` process lives. Every Windows build ships
  `php-cgi.exe`, so it counts as serving requests only while it runs or a web
  server config hands requests to PHP.
- IIS FastCGI handlers in `applicationHost.config` (readable by administrators
  only, so a standard user sees it under `unreadable`).
- Apache `LoadModule php_module`, handlers and `php_value` lines in XAMPP,
  WampServer, Laragon and `C:\Apache24` configs, and `fastcgi_pass` in
  `C:\nginx`.
- `php.ini` next to each install, under `PHPRC`, and in the Windows directory.
- Listening ports from `netstat -ano`, with the owning process. IIS listens
  through `http.sys`, so while W3SVC runs, a port owned by `System` counts as
  IIS when it is 80, 443 or a site binding in `applicationHost.config`. Other
  `System` ports, such as SMB and WinRM, do not.
- Apache child crashes (`exited with status 3221225477`) and memory exhaustion
  in XAMPP, WampServer, `C:\Apache24` and `C:\nginx` logs.

Windows builds come from windows.php.net, so they are compared with the
upstream fixed releases. `mitigate` does not change Windows hosts: it reports
`no-automatic-fix`, and the scan recommends the fixed build from
[windows.php.net](https://windows.php.net/download/).

## Verdicts and actions

| Verdict | Meaning |
| --- | --- |
| `patched` | At or above the fixed release, or a tracker-confirmed distro backport |
| `vulnerable` | An upstream build below the fixed release |
| `unsupported` | PHP 8.1 or older built from upstream, which gets no fix |
| `update-available` | A distro package with a newer build pending, or one a tracker says is fixed in a newer build |
| `check-vendor` | A distro build below the upstream fix that no tracker entry marks fixed |
| `unknown` | The version could not be read, or the branch (8.6 pre-releases) is not covered |

| Action | Meaning |
| --- | --- |
| `upgrade` | `mitigate` can upgrade it through the package manager |
| `rebuild-image` | A container: rebuild its image on a fixed release. Never changed in place |
| `isolate` | Serves requests with no automatic fix: keep it off public networks until upgraded |
| `manual-upgrade` | Not from a package manager: reinstall at a fixed release |
| `check-vendor` | Check your vendor's advisory for this build |
| `restart` | PHP on disk was replaced but running workers still use the old binary: restart them. Risk is at least `high` |
| `needs-privilege` | `mitigate` could not run its commands with root or non-interactive sudo |

## Risk levels

| Level | Meaning |
| --- | --- |
| `critical` | An affected install behind mod_php or FrankenPHP, or one that is publicly reachable |
| `high` | An affected serving install that is not publicly reachable, or a `check-vendor` serving install |
| `medium` | An affected CLI-only install |
| `low` | A `check-vendor` CLI-only install |
| `none` | No PHP, or everything patched |

## Methods

| Method | Description |
| --- | --- |
| `scan` | Scan one target: the local machine, an SSH host, or a Docker container or image |
| `scanFleet` | Scan a comma-separated list of hosts in parallel over SSH |
| `mitigate` | Scan, then upgrade and restart on hosts that need it. `dryRun` defaults to `true` |

## Usage

Targets and SSH credentials are set as global arguments when the behavior is
created. Methods take `hosts`, `dryRun` and the mitigation options as inputs.

### Setup

```bash
swamp repo init
swamp behavior create @swamp/cve/php-rce-2026-10 php-rce-scanner \
  --global-arg sshUser=ubuntu \
  --global-arg sshKey=~/.ssh/my-key.pem
```

### Scan the local machine

```bash
swamp behavior run php-rce-scanner scan
```

### Scan a fleet

```bash
swamp behavior run php-rce-scanner scanFleet \
  --input hosts=192.0.2.10,192.0.2.11
```

A host that needs a different login takes it as `user@host`:

```bash
swamp behavior run php-rce-scanner scanFleet \
  --input hosts=ubuntu@192.0.2.10,admin@192.0.2.11,192.0.2.12
```

`ubuntu@192.0.2.10` logs in as `ubuntu`; a plain entry like `192.0.2.12` uses the model's
`sshUser`. Every host uses the model's `sshKey`. Data and logs are still named
by the host alone, and the report's suggested commands keep each host's user.
Listing one host with two different users is an error.

SSH runs non-interactively (`BatchMode=yes`) and accepts new host keys on first
connection. Each command has a time limit (3 minutes for the scan, 30 minutes
for package upgrades), and a scan that stops early is reported as an error,
never as "no PHP". A host that cannot be reached is reported as `unreachable`, and the
other hosts are still scanned.

Example output, from a Debian 12 host running distro php8.2-fpm behind nginx,
and a host without PHP:

```
# PHP RCE Scan Results (CVE-2026-109618, CVE-2026-109619)

**2** host(s) scanned: **1** affected, **0** to check with the vendor, **1** patched or without PHP

| Host | PHP | SAPIs | Verdict | Public | Risk | Action |
| ---- | --- | ----- | ------- | ------ | ---- | ------ |
| 192.0.2.10 | 8.2.34 | fpm, cli | update-available | yes | CRITICAL | upgrade |
| 192.0.2.11 | — | — | no PHP | no | NONE | none |

## Installs needing attention

| Host | Install | SAPI | Version | Package | Verdict | Action |
| ---- | ------- | ---- | ------- | ------- | ------- | ------ |
| 192.0.2.10 | /usr/sbin/php-fpm8.2 | fpm | 8.2.34 | php8.2-fpm 8.2.34-1~deb12u1 | update-available | upgrade |
| 192.0.2.10 | /usr/bin/php8.2 | cli | 8.2.34 | php8.2-cli 8.2.34-1~deb12u1 | update-available | upgrade |

## Recommendations

- Upgrade php8.2-fpm, php8.2-cli through the package manager and restart PHP workers: run mitigate (dry run first).
- Until upgraded, the advisories' partial mitigations for the PHP configured in /etc/php/8.2/fpm/conf.d are session.upload_progress.enabled=0, memory_limit=-1 (mitigate with applyConfigMitigations=true writes them). They do not make PHP safe.
- No PHP installation found — no action required.

## Next Step

Run mitigate as a dry run first on the hosts that need it:

    swamp behavior run php-rce-scanner mitigate --input hosts=192.0.2.10

Fixed upstream releases: 8.2.35, 8.3.36, 8.4.27 and 8.5.12. Distro verdicts use the tracker snapshot from 2026-10-22T13:47Z. No indicators of compromise have been published; log counts are hints only.
```

### Scan a Docker container or image

Create a behavior per container or image:

```bash
# A running container
swamp behavior create @swamp/cve/php-rce-2026-10 shop-web-scan \
  --global-arg dockerContainer=shop-web
swamp behavior run shop-web-scan scan

# Start an image, scan it, then stop it
swamp behavior create @swamp/cve/php-rce-2026-10 php-image-scan \
  --global-arg dockerImage=php:8.2.34-apache
swamp behavior run php-image-scan scan
```

The official `php:8.2.34-apache` image reports both installs as `vulnerable`,
`critical` (mod_php), with the action `rebuild-image`.

The image's scan container runs with `--pids-limit=256`. Rootless podman
otherwise applies the docker CLI's default of 0 literally, and the container
cannot start a single process. If the container exits before the scan, the
error gives its exit code and last log lines.

Scanning a Docker host with `scan` or `scanFleet` also lists its running php
containers, from `docker ps` and `docker inspect` only. If the SSH user cannot
reach the Docker socket, the result says the containers were not inspected.

### View results

```bash
swamp data get php-rce-scanner <host-or-label> --json | jq .content
swamp data list php-rce-scanner --json
```

### Mitigate

```bash
# Dry run (default): scans, checks sudo, prints the commands
swamp behavior run php-rce-scanner mitigate --input hosts=192.0.2.10

# Apply
swamp behavior run php-rce-scanner mitigate \
  --input hosts=192.0.2.10 --input dryRun=false

# Also write php.net's partial ini mitigations where no fixed package exists
swamp behavior run php-rce-scanner mitigate \
  --input hosts=192.0.2.10 --input applyConfigMitigations=true
```

Without `hosts`, mitigate acts on the model's `targetHost` (default
`localhost`). On a `dockerContainer` or `dockerImage` model it scans the
container or image and reports it for a rebuild; it never falls back to
localhost.

### What mitigate does

For each host it scans first, and skips hosts with nothing to do. Windows
hosts and containers are reported, never changed. Then:

1. **Upgrade.** For distro-packaged PHP it refreshes the package lists and
   upgrades every installed PHP runtime package together, so the extensions stay
   in step with the core. Those are the versioned packages (`php8.2-*`,
   `php82-*`, `libapache2-mod-php8.2`) and, on RHEL, the unversioned `php-*`
   packages at the same version as PHP itself. Libraries and applications such
   as `php-twig` and `phpmyadmin` are left alone:
   - apt: `apt-get update`, then
     `apt-get install --only-upgrade -y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold <php packages>`.
     Local config files are kept.
   - dnf/yum: `dnf upgrade -y <php packages>`
   - apk: `apk update`, then `apk add --upgrade <php packages>`
2. **Harden (opt-in).** With `applyConfigMitigations=true`, and only if PHP is
   still unpatched after the upgrade, it writes `99-swamp-php-rce-2026-10.ini`
   into the conf.d directory of each serving SAPI of an unpatched branch, then
   restarts. It writes the file with `tee`, which reads the content from
   standard input, so nothing is staged where another user could swap it:

   ```ini
   memory_limit = -1
   post_max_size = 32M                      ; only when it lowers the current limit (postMaxSize input)
   session.upload_progress.enabled = 0
   fatal_error_backtraces = 0               ; PHP 8.5 only
   ```

   `post_max_size` is never raised: a host already at or below `postMaxSize`
   (PHP's default is 8M, php.net's suggestion without uploads) keeps its
   value, and the result notes every limit it lowers.

   php.net says these reduce exposure to the demonstrated attack paths but
   **do not make an installation safe**. A conf.d setting can be overridden per
   pool or per application; `php_admin_value` in the FPM pool is stronger for
   `memory_limit`.
3. **Restart.** It runs `systemctl restart` for the running PHP-FPM units, and
   for Apache when mod_php is installed, when a package or ini file changed, the
   rescan after the upgrade failed, or the scan found stale workers. Without
   systemd it tells you to restart them by hand.
4. **Rescan.** It scans the host again and records the result. A host that
   serves PHP publicly and is still unpatched gets the action `isolate`.

Containers, and php containers found on a host, are reported for an image
rebuild and never changed. PHP built from source is reported as
`manual-upgrade`, or `isolate` if it serves requests.

Example dry run for the same Debian 12 host, as a user with scoped sudo and
`applyConfigMitigations=true`:

```
# PHP RCE Mitigation: DRY RUN

| Host | Outcome | Privilege | Risk now | Action |
| ---- | ------- | --------- | -------- | ------ |
| 192.0.2.10 | dry-run | sudo | CRITICAL | upgrade |

## 192.0.2.10

    sudo -n -- /usr/bin/apt-get update
    sudo -n -- /usr/bin/apt-get install --only-upgrade -y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold php-common php8.2-cli php8.2-common php8.2-fpm php8.2-opcache php8.2-readline
    sudo -n -- /usr/bin/tee /etc/php/8.2/fpm/conf.d/99-swamp-php-rce-2026-10.ini

- No running PHP service units were found to restart; restart PHP-FPM or the web server by hand after the change.
```

That host had no systemd. On a systemd host the plan ends with
`systemctl restart php8.2-fpm.service`.

## Privileges

- **Scan** needs no root and never calls sudo.
- **Mitigate** runs as root when you connect as root. Otherwise it sends each
  privileged command as `sudo -n -- <binary> <args>`, without an `sh -c`
  wrapper. That way, sudoers rules scoped to these binaries match, and a
  missing password fails fast instead of waiting at a prompt.

Before changing anything (and in dry runs), mitigate checks each planned
command with `sudo -n -l <command>`, then reads `sudo -n -ll`. With sudo's
default `listpw=any`, `sudo -n -l` also passes a command whose rule asks for a
password whenever the user has any NOPASSWD rule, so a command counts as
allowed only when the last rule that matches it has `NOPASSWD`. If any check
fails, that host gets the outcome and action `needs-privilege`, the exact
commands to run by hand, and no changes.

**Granting package-manager commands through sudo amounts to granting root.**
`apt-get`, `dnf`, `yum` and `apk` run package scripts as root, and a wildcard
rule such as `apt-get install --only-upgrade *` also lets the user pass
`-o …Pre-Invoke=<command>`. Wildcards in sudoers arguments match `/` and spaces,
so never use them. The `tee` rule lets the user write any content to that one
drop-in, which PHP then loads, so it grants code execution as the PHP workers'
user. Run mitigate as root, or give these rights only to an automation account
you would trust with root.

If you use sudo, pin every rule to the exact command lines the dry run prints
(the package list differs per host). This entry matches the Debian 12 example
above. sudoers needs `:` and `=` escaped inside arguments:

```
deploy ALL=(root) NOPASSWD: /usr/bin/apt-get update, \
  /usr/bin/apt-get install --only-upgrade -y -o Dpkg\:\:Options\:\:\=--force-confdef -o Dpkg\:\:Options\:\:\=--force-confold php-common php8.2-cli php8.2-common php8.2-fpm php8.2-opcache php8.2-readline, \
  /usr/bin/tee /etc/php/8.2/fpm/conf.d/99-swamp-php-rce-2026-10.ini, \
  /usr/bin/systemctl restart php8.2-fpm.service
```

`tee` creates the drop-in with sudo's umask, normally `0644`. Binary paths come
from `command -v` on each host. Run the dry run first; a host whose rules do not match gets
`needs-privilege` and is not changed.

Hosts without sudo (for example Alpine with doas) are reported as
`needs-privilege`.

## Inputs

### Global arguments (set with `swamp behavior create --global-arg`)

| Argument | Default | Description |
| --- | --- | --- |
| `targetHost` | `localhost` | Host to scan or mitigate (`localhost`, `127.0.0.1` and `::1` run locally) |
| `sshUser` | `root` | SSH user for remote hosts (and every host in `hosts` not given as `user@host`) |
| `sshKey` | — | Path to the SSH private key |
| `dockerContainer` | — | Container name or ID to scan (overrides `targetHost`) |
| `dockerImage` | — | Image to start, scan and stop |

### Method inputs

| Method | Input | Default | Description |
| --- | --- | --- | --- |
| `scanFleet` | `hosts` | required | Comma-separated hosts; `user@host` logs in as `user` |
| `mitigate` | `hosts` | `targetHost` | Comma-separated hosts; `user@host` logs in as `user` |
| `mitigate` | `dryRun` | `true` | Print the plan without running it |
| `mitigate` | `applyConfigMitigations` | `false` | Also write the partial ini mitigations where no fixed package is installed |
| `mitigate` | `postMaxSize` | `32M` | `post_max_size` for that drop-in |

## Reports

`@swamp/cve/php-rce-2026-10-report` runs after each method:

- After `scan` and `scanFleet`, it shows the fleet table, the installs needing
  attention, deduplicated recommendations, and the mitigate command for the
  hosts that need it.
- After `mitigate`, it shows each host's outcome and commands, and the apply or
  verify command. A host that could not be reached shows its error, and the
  heading still says whether the run was a dry run.

The report's commands name the behavior that ran, so they work as printed.

## Limits

- RHEL clones (AlmaLinux, Rocky Linux, CentOS Stream) and Alpine have no
  tracker rows, so their distro builds are `check-vendor` unless the package
  manager has a newer PHP package pending. Clones publish their own errata, so
  Red Hat's rows are not applied to them.
- RHEL 9 php:8.4 had no Red Hat fix when the rows were read, and retired module
  streams (RHEL 8 php:7.3 and php:8.0, RHEL 9 php:8.1) get none, so builds from
  them are `check-vendor`. The RHEL 7 fix ships only to Extended Life Cycle
  Support subscribers.
- The tracker table is a snapshot. Package lists older than the advisory can
  hide a pending fix, so the report says when to run `apt-get update`. Mitigate
  runs it itself.
- "Publicly listening" is judged from inside the host. A firewall or load
  balancer in front can still keep it private.
- The local `scan` targets Linux. From macOS, use SSH or Docker targets.
- Windows hosts are found over SSH only, and only in the layouts listed under
  [Windows hosts](#windows-hosts). Docker on Windows is not inspected.

## References

- php.net security advisory and releases, 2026-10-21: <https://www.php.net/>
- GHSA-w8hw-w9fx-j79w (CVE-2026-109618): <https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w>
- GHSA-6wmf-4rv5-p3rp (CVE-2026-109619): <https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp>
- CERT-EU advisory 2026-018: <https://cert.europa.eu/publications/security-advisories/2026-018>
- Debian tracker: <https://security-tracker.debian.org/tracker/CVE-2026-109618>
- Ubuntu USN-8948-1: <https://ubuntu.com/security/notices/USN-8948-1>

## License

AGPL-3.0-or-later. See [LICENSE.txt](LICENSE.txt).
