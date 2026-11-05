# @swamp/cve/sshole

Reports whether a machine, container or image is vulnerable to **"\*sshole"**,
the musl libc password-authentication bypass disclosed and fixed on
**2026-11-05** in **OpenSSH 10.6p2**. No CVE had been assigned at disclosure.

On OpenSSH built against **musl libc** (Alpine, OpenWrt, buildroot, yocto), when
password authentication is handled **without PAM**, an account whose
`/etc/shadow` field is exactly `*` — key-only users, LDAP/SSSD users, a locked
root, Alpine's default cloud `alpine` user — accepts **any password of 257 to
1024 characters**.

The root cause is outside OpenSSH: musl's `crypt()` returns the literal string
`"*"` when the password runs past its 256-byte key limit, and `"*"` is exactly
what a locked account stores. OpenSSH's non-PAM password check compares the two
and they match. glibc hosts, and hosts that authenticate through PAM, are not
affected. OpenSSH 10.6p2 closes it by rejecting any stored hash shorter than
four characters.

```
musl crypt("A"×256, "$6$salt$")  →  $6$salt$<88-char hash>   (rejected)
musl crypt("A"×257, "$6$salt$")  →  *                        (== stored "*")
```

## When a host is exposed

All of these must hold at once:

1. **musl libc** — Alpine, OpenWrt, buildroot, yocto.
2. **OpenSSH older than the fix** — 10.6p2 upstream, or the distro's backported
   package release (see the table below).
3. **Password auth without PAM** — Alpine's `openssh-server` has no PAM;
   `openssh-server-pam` with `UsePAM yes` is safe.
4. **`PasswordAuthentication yes`** — the default.
5. **A reachable `*` account** — any account whose shadow field is `*` and that
   has a passwd entry. A `*` root counts only under `PermitRootLogin yes`
   (Alpine defaults to `prohibit-password`), and an account refused by
   `AllowUsers`, `DenyUsers`, `AllowGroups` or `DenyGroups` does not count.
6. **A salt-seeding account** — at least one account with a `$5$` or `$6$` hash.
   Without one, sshd falls back to a DES salt and `crypt()` never returns `"*"`,
   so the host is not exploitable (a fresh, all-locked box is safe until the
   first real password is set).

This extension checks every one of these and only calls a target `vulnerable`
when the account list and the salt seed are confirmed. Reading `/etc/shadow`
needs root; without it a musl, non-PAM, password-auth target is `unknown` (risk
**high**, action `needs-privilege`), never `not-vulnerable`.

## Fixed versions

Upstream: **OpenSSH 10.6p2**.

Distributions backport the fix into the **package release** without changing
OpenSSH's version string, so the `ssh -V` banner cannot tell patched from
vulnerable — the package release does. Alpine's fixed releases per branch
(security advisory, tracker snapshot **2026-11-05**):

| Branch | Fixed `openssh` release |
| ------ | ----------------------- |
| edge   | `10.6_p2-r0`            |
| 3.24   | `10.3_p1-r2`            |
| 3.23   | `10.2_p1-r1`            |
| 3.22   | `10.0_p1-r11`           |
| 3.21   | `9.9_p2-r1`             |
| 3.20   | `9.7_p1-r6`             |
| 3.19   | `9.6_p1-r3`             |
| 3.18   | `9.3_p2-r4`             |
| 3.17   | `9.1_p1-r7`             |
| 3.16   | `9.0_p1-r6`             |

A branch's fixed release only describes builds of the same upstream version, so
the installed release is matched by upstream version, not by branch number: a
release at or past `10.6_p2-r0` is `patched`; one with the same upstream as a
row above (say `10.0_p1`) is `patched` from that row's `-rN` on; any other
upstream below 10.6p2 is `vulnerable`, since Alpine shipped no fix for it. That
covers edge (whose `VERSION_ID` looks like `3.23_alpha…`), packages pulled from
a newer branch, and branches older than 3.16. A release that cannot be read is
`unknown`, never `patched`.

For non-Alpine musl builds (OpenWrt, Void, buildroot, source builds) the version
reported by `sshd` itself is used, not the `ssh` client's. At or past 10.6p2 is
patched. Below it:

- with no package manager at all (a source build, most buildroot and yocto
  images) no vendor fix can apply, so the build is `vulnerable`;
- with a package manager (opkg, apk on OpenWrt, xbps on Void, ...) a vendor
  backport that keeps the upstream version cannot be ruled out, and there is no
  tracker for it, so the verdict is `unknown` ("likely exposed").

If the running sshd was replaced on disk by an upgrade and not restarted, a
patched binary on disk does not count: the verdict is `unknown` until sshd is
restarted.

## Method

**`scan`** runs a read-only POSIX shell probe on one target and reports a
verdict. The target is chosen by the model's global arguments:

- nothing set — the **local machine**;
- `dockerContainer` — a **running container**, via `docker exec`;
- `dockerImage` — a container **started from the image**, scanned, then removed.

It never logs in over SSH, never attempts a password, and never changes the
target.

```
swamp behavior run @swamp/cve/sshole scan
```

## What it reports

Every scan writes a `status` resource whose `verdict` is the headline answer:

| `verdict`        | Meaning                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `vulnerable`     | Every precondition holds: a reachable `*` account accepts a long password. |
| `not-vulnerable` | A precondition is missing (glibc, patched, PAM, password auth off, …).     |
| `unknown`        | Could not decide — see below.                                              |

A target is `unknown` rather than `vulnerable` or `not-vulnerable` whenever an
input was assumed instead of read:

- `/etc/shadow` unreadable without root;
- a setting taken from the config files because `sshd -T` failed, or a global
  value from `sshd -T` when the config has `Match` blocks that can override it
  for some clients (`PasswordAuthentication`, `UsePAM`, `PermitRootLogin`,
  `AllowUsers`/`AllowGroups`);
- whether password auth goes through PAM (for example, no `ldd` to inspect
  sshd);
- an installed openssh release or a libc that cannot be identified;
- Alpine's `openssh-server-pam` installed without a way to tell whether its
  `sshd.pam` is the daemon that runs.

No sshd at all is also `unknown`. The summary says which input was missing.

Alongside it: libc, the OpenSSH version and package release, effective `UsePAM`
and whether sshd links PAM, whether the PAM build is installed, effective
`PasswordAuthentication` and `PermitRootLogin`, whether a `$5$`/`$6$` salt seed
exists, and every `*` account with its uid, shell and whether it is reachable by
password. Each target also gets a risk level (`critical`, `high`, `medium`,
`low`, `none`, `unknown`), the reasons behind it, what was not checked, and the
recommended fix and stopgaps. The report leads with the verdict per target.

## Which sshd is checked

The version, PAM linkage and `sshd -T` all come from the sshd binary that runs,
chosen in this order:

1. the running sshd listener, from `/proc` (root sees every process);
2. on Alpine, the binary its OpenRC script would start: `SSHD_BINARY` from
   `/etc/conf.d/sshd`, else `sshd.krb5` when Kerberos or GSSAPI auth is on, else
   `sshd.pam` when `UsePAM yes`, else `sshd` (the script's own rule);
3. the first of `/usr/sbin/sshd`, `/usr/bin/sshd`, `/sbin/sshd`,
   `/usr/sbin/sshd.pam`, `/usr/sbin/sshd.krb5`, then `PATH`.

So an Alpine host running the `openssh-server-pam` build is judged by
`sshd.pam`, and a PAM-only install (no plain `sshd`) is found. Only when the PAM
build is installed and the binary was picked from the fallback list is the build
left in doubt (`unknown`).

## Privileges

`scan` needs no root, but `/etc/shadow` is only readable as root; a non-root
scan cannot enumerate `*` accounts or the salt seed and reports `unknown`.

The effective sshd settings come from `sshd -T`, which also needs root. Without
it the probe reads the config as sshd would: `sshd_config` with every `Include`
spliced in where it appears (relative paths are under `/etc/ssh`, globs and
nesting are followed), first value wins, nothing after the first `Match`. Even
so, a file-read `PasswordAuthentication no` or `UsePAM yes` is never enough to
call a target `not-vulnerable`: it is listed under "not checked" and the verdict
is `unknown`. `AllowUsers`, `DenyUsers`, `AllowGroups` and `DenyGroups` are only
evaluated from `sshd -T` with no `Match` blocks; when the config has them
otherwise, every `*` account counts as reachable by assumption and the verdict
is `unknown`.

## Credits

The bypass was reported by Özgün Kültekin. OpenSSH 10.6p2 and the Alpine package
backports carry the fix.
