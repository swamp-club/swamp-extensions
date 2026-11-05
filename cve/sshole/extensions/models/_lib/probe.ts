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
 * The read-only POSIX shell probe that gathers the five preconditions for the
 * *sshole bypass on a target: the libc, the OpenSSH version, whether sshd uses
 * and links PAM, whether password authentication is enabled, and which
 * accounts have a "*" shadow field. It emits `KEY=value` lines only; it never
 * changes the host and reads `/etc/shadow` only when it can.
 *
 * The script is intentionally BusyBox/ash-safe (no bashisms): Alpine, OpenWrt
 * and buildroot are the primary targets. It is a JavaScript template, so it
 * never uses shell parameter expansion with braces (that would interpolate);
 * awk, sed and tr do that work instead.
 *
 * It is built from two parts so the config-reading functions can be tested
 * against fixture trees: {@link PROBE_FUNCTIONS} reads every path under
 * `SSHOLE_ROOT`, and {@link PROBE_MAIN} clears `SSHOLE_ROOT` on its first line,
 * so a variable inherited from the target's environment can never move the
 * paths. {@link PROBE_SCRIPT} is exactly the two joined.
 *
 * @module
 */

/** The marker the analyser keys every probe line on. */
export const PROBE_PREFIX = "SSHOLE";

/** Shell functions only; every config path is read under SSHOLE_ROOT. */
export const PROBE_FUNCTIONS = String.raw`
P=SSHOLE
emit() { printf '%s_%s=%s\n' "$P" "$1" "$2"; }

# Prints an sshd config file with every Include spliced in where it appears,
# as sshd reads it: paths without a leading / are under /etc/ssh, globs are
# expanded in sorted order, nesting is followed up to depth 8. $1 is the full
# path (already under SSHOLE_ROOT), $2 the depth.
sshole_flatten() {
  local line args pat f
  [ "$2" -gt 8 ] && return 0
  [ -r "$1" ] || return 0
  while IFS= read -r line || [ -n "$line" ]; do
    args=""
    case "$line" in
      *[Ii][Nn][Cc][Ll][Uu][Dd][Ee]*)
        args=$(printf '%s\n' "$line" | awk '{ l=$0; sub(/^[ \t]+/, "", l); n=split(l, a, /[ \t]*=[ \t]*|[ \t]+/); if (tolower(a[1]) != "include") exit; for (i = 2; i <= n; i++) { gsub(/"/, "", a[i]); if (a[i] != "") print a[i] } }')
        ;;
    esac
    if [ -z "$args" ]; then
      printf '%s\n' "$line"
      continue
    fi
    # One pattern per line, read without word splitting, so a pattern is
    # globbed only once SSHOLE_ROOT is in front of it.
    printf '%s\n' "$args" | while IFS= read -r pat; do
      case "$pat" in
        /*) ;;
        *) pat="/etc/ssh/$pat" ;;
      esac
      for f in "$SSHOLE_ROOT"$pat; do
        sshole_flatten "$f" $(($2 + 1))
      done
    done
  done < "$1"
}

# The effective sshd_config text, Includes spliced in.
sshole_config() {
  sshole_flatten "$SSHOLE_ROOT/etc/ssh/sshd_config" 0
}

# First value of keyword $1 (lowercase) before the first Match line, as sshd
# keeps the first value it reads and Match blocks are conditional.
# "Keyword value", "Keyword=value" and "Keyword = value" are all valid.
sshole_first_value() {
  sshole_config | awk -v k="$1" '{ l=$0; sub(/^[ \t]+/, "", l); n=split(l, a, /[ \t]*=[ \t]*|[ \t]+/); if (n < 1) next; w=tolower(a[1]); if (w=="match") exit; if (w==k) { print tolower(a[2]); exit } }'
}

# yes when the config (Includes spliced in) has a Match block.
sshole_has_match() {
  if sshole_config | grep -qiE '^[[:space:]]*Match([[:space:]]|=)'; then echo yes; else echo no; fi
}

# yes when the config has any AllowUsers/DenyUsers/AllowGroups/DenyGroups line.
sshole_has_access_rules() {
  if sshole_config | grep -qiE '^[[:space:]]*(AllowUsers|DenyUsers|AllowGroups|DenyGroups)([[:space:]]|=)'; then echo yes; else echo no; fi
}

# The exe of a running sshd listener, as readlink prints it (an in-place
# upgrade leaves a " (deleted)" suffix). Only the system sshd binaries count:
# a root scan runs the binary it picks (-V, -T, ldd), so a process a user
# started from their own "sshd" must never be chosen. Only processes in the
# probe's own mount namespace count, since a container's path names a
# different file here. sshd-session processes are skipped.
sshole_running_sshd() {
  local p exe self ns
  self=$(readlink "$SSHOLE_ROOT/proc/self/ns/mnt" 2>/dev/null)
  for p in "$SSHOLE_ROOT"/proc/[0-9]*; do
    exe=$(readlink "$p/exe" 2>/dev/null) || continue
    ns=$(readlink "$p/ns/mnt" 2>/dev/null)
    [ "$ns" = "$self" ] || continue
    case "$exe" in
      /usr/sbin/sshd|/usr/sbin/sshd.pam|/usr/sbin/sshd.krb5|/usr/bin/sshd|/sbin/sshd|\
      "/usr/sbin/sshd (deleted)"|"/usr/sbin/sshd.pam (deleted)"|"/usr/sbin/sshd.krb5 (deleted)"|"/usr/bin/sshd (deleted)"|"/sbin/sshd (deleted)")
        printf '%s' "$exe"
        return 0
        ;;
    esac
  done
}

# Alpine's get_conf from /etc/init.d/sshd: the first line that starts with
# the keyword (exact case) followed by whitespace, in sshd_config then the
# drop-ins, prints its second field.
sshole_alpine_conf() {
  awk -v k="$1" 'index($0, k) == 1 && substr($0, length(k) + 1, 1) ~ /[ \t]/ { print $2; exit }' "$SSHOLE_ROOT/etc/ssh/sshd_config" "$SSHOLE_ROOT"/etc/ssh/sshd_config.d/*.conf 2>/dev/null
}

# The binary Alpine's OpenRC script would start, replicating its
# update_command: SSHD_BINARY from /etc/conf.d/sshd, else sshd.krb5 when
# Kerberos or GSSAPI auth is on, else sshd.pam when UsePAM is yes, else sshd.
# Prints nothing unless /etc/init.d/sshd carries that selection.
# SSHD_BINARY is trusted as given: only root can write /etc/conf.d/sshd, and
# OpenRC already starts that binary as root.
sshole_openrc_sshd() {
  local init bin
  init="$SSHOLE_ROOT/etc/init.d/sshd"
  [ -r "$init" ] || return 0
  grep -q 'update_command' "$init" 2>/dev/null || return 0
  grep -q '/usr/sbin/sshd\.pam' "$init" 2>/dev/null || return 0
  bin=$(awk -F= '/^[ \t]*SSHD_BINARY=/ { v=$2; sub(/#.*/, "", v); print v }' "$SSHOLE_ROOT/etc/conf.d/sshd" 2>/dev/null | tail -n1 | tr -d "\"' \t")
  if [ -n "$bin" ]; then
    printf '%s' "$bin"
  elif { [ "$(sshole_alpine_conf KerberosAuthentication)" = yes ] || [ "$(sshole_alpine_conf GSSAPIAuthentication)" = yes ]; } && [ -r "$SSHOLE_ROOT/usr/sbin/sshd.krb5" ]; then
    printf '%s' /usr/sbin/sshd.krb5
  elif [ "$(sshole_alpine_conf UsePAM)" = yes ] && [ -r "$SSHOLE_ROOT/usr/sbin/sshd.pam" ]; then
    printf '%s' /usr/sbin/sshd.pam
  else
    printf '%s' /usr/sbin/sshd
  fi
}
`;

/** The probe itself; its first line clears SSHOLE_ROOT. */
export const PROBE_MAIN = String.raw`SSHOLE_ROOT=

# --- identity ---
emit HOSTNAME "$(hostname 2>/dev/null || cat /proc/sys/kernel/hostname 2>/dev/null)"
emit UNAME "$(uname -s 2>/dev/null)"
UID_NOW=$(id -u 2>/dev/null)
[ -z "$UID_NOW" ] && UID_NOW=unknown
emit UID "$UID_NOW"

# --- os-release ---
OS_ID=""; OS_VER=""; OS_PRETTY=""
if [ -r /etc/os-release ]; then
  OS_ID=$(. /etc/os-release 2>/dev/null; printf '%s' "$ID")
  OS_VER=$(. /etc/os-release 2>/dev/null; printf '%s' "$VERSION_ID")
  OS_PRETTY=$(. /etc/os-release 2>/dev/null; printf '%s' "$PRETTY_NAME")
fi
emit OS_ID "$OS_ID"
emit OS_VER "$OS_VER"
emit OS_PRETTY "$OS_PRETTY"

# --- container hint (advisory only) ---
if [ -f /.dockerenv ] || grep -qa 'docker\|containerd\|kubepods' /proc/1/cgroup 2>/dev/null; then
  emit CONTAINER yes
else
  emit CONTAINER no
fi

# --- which sshd binary runs ---
# The running listener decides; else the binary Alpine's OpenRC script would
# start (it runs sshd.pam when UsePAM is yes); else the fixed system paths,
# before PATH, since on a root scan a PATH entry could be writable. A
# PAM-only Alpine install has sshd.pam and no plain sshd.
SSHD=""
SELECTED=path
REPLACED=no
RUN=$(sshole_running_sshd)
if [ -n "$RUN" ]; then
  case "$RUN" in *" (deleted)") REPLACED=yes ;; esac
  RUN=$(printf '%s' "$RUN" | sed 's/ (deleted)$//')
  if [ -x "$RUN" ]; then SSHD="$RUN"; SELECTED=running; fi
fi
if [ -z "$SSHD" ]; then
  OR=$(sshole_openrc_sshd)
  if [ -n "$OR" ] && [ -x "$OR" ]; then SSHD="$OR"; SELECTED=openrc; fi
fi
if [ -z "$SSHD" ]; then
  for c in /usr/sbin/sshd /usr/bin/sshd /sbin/sshd /usr/sbin/sshd.pam /usr/sbin/sshd.krb5 "$(command -v sshd 2>/dev/null)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then SSHD="$c"; break; fi
  done
fi
emit SSHD_PATH "$SSHD"
emit SSHD_SELECTED_BY "$SELECTED"
# The running sshd was replaced on disk (an upgrade without a restart): the
# version read below is the new binary's, not the running daemon's.
emit SSHD_REPLACED "$REPLACED"

# --- OpenSSH server version ---
# Read from sshd itself, not the ssh client, which can be a different build.
# "sshd -V" prints the version on newer releases; older ones reject -V and
# print it in their usage text. Only an "OpenSSH_" token is kept, so an error
# such as "sshd: not found" is never taken for a version.
SSH_V=""
if [ -n "$SSHD" ]; then
  SSH_V=$("$SSHD" -V 2>&1 | grep -o 'OpenSSH_[^ ,]*' | head -n1)
fi
emit SSH_VERSION "$SSH_V"
# distro package manager + installed openssh release (fixes are backported
# into the package release without bumping the upstream version string)
if command -v apk >/dev/null 2>&1; then
  emit PKG_MANAGER apk
  # "openssh-server-9.7_p1-r6"; -e limits to the installed package. The PAM
  # and Kerberos builds are separate packages and can be installed alone.
  PV=""
  for pkg in openssh-server openssh-server-pam openssh-server-krb5; do
    PV=$(apk info -e -v "$pkg" 2>/dev/null | head -n1)
    [ -n "$PV" ] && break
  done
  emit PKG_VERSION "$PV"
  if apk info -e openssh-server-pam >/dev/null 2>&1; then
    emit PAM_PACKAGE yes
  else
    emit PAM_PACKAGE no
  fi
elif command -v dpkg >/dev/null 2>&1; then
  emit PKG_MANAGER apt
  emit PKG_VERSION "$(dpkg -s openssh-server 2>/dev/null | awk '/^Version:/{print $2}')"
elif command -v rpm >/dev/null 2>&1; then
  emit PKG_MANAGER rpm
  emit PKG_VERSION "$(rpm -q --qf '%{VERSION}-%{RELEASE}' openssh-server 2>/dev/null)"
elif command -v opkg >/dev/null 2>&1; then
  emit PKG_MANAGER opkg
  emit PKG_VERSION "$(opkg status openssh-server 2>/dev/null | awk '/^Version:/{print $2}')"
elif command -v xbps-query >/dev/null 2>&1; then
  # Void Linux: "openssh-9.7p1_1" -> "9.7p1" (the _N revision is dropped).
  emit PKG_MANAGER xbps
  emit PKG_VERSION "$(xbps-query -p pkgver openssh 2>/dev/null | sed 's/^openssh-//; s/_[0-9]*$//')"
fi

# --- libc detection ---
LIBC=unknown
# What sshd itself links decides first: a glibc host can carry a stray musl
# loader (Debian's musl package installs /lib/ld-musl-*).
if [ -n "$SSHD" ] && ldd "$SSHD" 2>/dev/null | grep -qi 'ld-musl\|libc.musl'; then
  LIBC=musl
elif [ -n "$SSHD" ] && ldd "$SSHD" 2>/dev/null | grep -qi 'libc.so.6'; then
  LIBC=glibc
elif ldd --version 2>&1 | grep -qi musl; then
  LIBC=musl
elif ldd --version 2>&1 | grep -qi 'glibc\|gnu libc'; then
  LIBC=glibc
elif [ -n "$(ls /lib/ld-musl-* 2>/dev/null)" ]; then
  LIBC=musl
fi
emit LIBC "$LIBC"

# --- does sshd link libpam? ---
# OpenSSH 9.8+ splits sshd into a listener and sshd-session, and libpam can be
# linked into either, so both are checked. Without ldd nothing can be said.
PAM_LINK=unknown
if [ -n "$SSHD" ] && command -v ldd >/dev/null 2>&1; then
  PAM_LINK=no
  for b in "$SSHD" /usr/lib/ssh/sshd-session /usr/libexec/openssh/sshd-session /usr/lib/openssh/sshd-session /usr/libexec/sshd-session; do
    [ -x "$b" ] || continue
    if ldd "$b" 2>/dev/null | grep -qi 'libpam'; then PAM_LINK=yes; break; fi
  done
fi
emit SSHD_LINKS_PAM "$PAM_LINK"

# --- effective sshd config (needs root for sshd -T; else parse files) ---
USEPAM=unknown
PWAUTH=unknown
PERMITROOT=unknown
TCONF=""
[ -n "$SSHD" ] && TCONF=$("$SSHD" -T 2>/dev/null)
if [ -n "$TCONF" ]; then
  emit CONFIG_SOURCE sshd-T
  case "$(printf '%s\n' "$TCONF" | grep -i '^usepam ' | awk '{print $2}')" in
    yes) USEPAM=yes ;; no) USEPAM=no ;;
  esac
  case "$(printf '%s\n' "$TCONF" | grep -i '^passwordauthentication ' | awk '{print $2}')" in
    yes) PWAUTH=yes ;; no) PWAUTH=no ;;
  esac
  PR=$(printf '%s\n' "$TCONF" | grep -i '^permitrootlogin ' | awk '{print $2}')
  [ -n "$PR" ] && PERMITROOT="$PR"
  # Login restrictions; sshd -T may print one line per entry, so join them.
  for k in allowusers denyusers allowgroups denygroups; do
    V=$(printf '%s\n' "$TCONF" | awk -v k="$k" 'tolower($1)==k{for(i=2;i<=NF;i++)printf "%s ", $i}')
    K=$(printf '%s' "$k" | tr 'a-z' 'A-Z')
    emit "$K" "$V"
  done
else
  # Best effort without sshd -T: the config as sshd reads it (Includes spliced
  # in where they appear), first value wins, nothing after the first Match.
  # Analysis treats file-read values that would rule the host out as
  # unconfirmed.
  emit CONFIG_SOURCE files
  case "$(sshole_first_value usepam)" in yes) USEPAM=yes ;; no) USEPAM=no ;; esac
  case "$(sshole_first_value passwordauthentication)" in yes) PWAUTH=yes ;; no) PWAUTH=no ;; esac
  V=$(sshole_first_value permitrootlogin)
  [ -n "$V" ] && PERMITROOT="$V"
fi
# sshd -T prints the global settings only; a Match block (in any included
# file) can turn password auth back on, or loosen root and user rules, for
# some clients.
emit MATCH_BLOCKS "$(sshole_has_match)"
# Whether any AllowUsers-style rule exists; from the files they are not
# evaluated, so analysis then treats '*' accounts as reachable by assumption.
emit ACCESS_RULES "$(sshole_has_access_rules)"
emit USEPAM "$USEPAM"
emit PWAUTH "$PWAUTH"
emit PERMITROOT "$PERMITROOT"

# --- shadow analysis: "*" accounts, and whether a salt-seeding hash exists ---
if [ -r /etc/shadow ]; then
  emit SHADOW_READABLE yes
  # user:uid:shell for every account whose shadow field is exactly "*"
  awk -F: '$2=="*"{print $1}' /etc/shadow 2>/dev/null | while IFS= read -r u; do
    [ -n "$u" ] || continue
    LINE=$(getent passwd "$u" 2>/dev/null || awk -F: -v u="$u" '$1==u{print; exit}' /etc/passwd 2>/dev/null)
    USERUID=$(printf '%s' "$LINE" | awk -F: '{print $3}')
    USERSH=$(printf '%s' "$LINE" | awk -F: '{print $7}')
    USERGROUPS=$(id -Gn "$u" 2>/dev/null)
    emit STAR_ACCOUNT "$u|$USERUID|$USERSH|$USERGROUPS"
  done
  # The bypass only works when some account has a $5$/$6$ (sha-crypt) hash,
  # because that is the salt sshd borrows; without it crypt() will not return
  # "*". bcrypt ($2) does not trigger it, so it is not counted.
  SEED=$(awk -F: '$2 ~ /^\$[56]\$/{c++} END{print c+0}' /etc/shadow 2>/dev/null)
  [ -z "$SEED" ] && SEED=0
  emit SEED_HASH_COUNT "$SEED"
else
  emit SHADOW_READABLE no
fi

emit DONE 1
`;

/** The script sent to a target: the functions, then the probe. */
export const PROBE_SCRIPT = PROBE_FUNCTIONS + PROBE_MAIN;
