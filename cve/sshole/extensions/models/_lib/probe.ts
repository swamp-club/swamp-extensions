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
 * and buildroot are the primary targets.
 *
 * @module
 */

/** The marker the analyser keys every probe line on. */
export const PROBE_PREFIX = "SSHOLE";

export const PROBE_SCRIPT = String.raw`
P=SSHOLE
emit() { printf '%s_%s=%s\n' "$P" "$1" "$2"; }

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

# --- locate sshd ---
SSHD=""
# Fixed system paths first: on a root scan, a PATH entry could be writable.
for c in /usr/sbin/sshd /usr/bin/sshd /sbin/sshd "$(command -v sshd 2>/dev/null)"; do
  if [ -n "$c" ] && [ -x "$c" ]; then SSHD="$c"; break; fi
done
emit SSHD_PATH "$SSHD"

# --- which sshd build is running (Alpine ships a separate sshd.pam) ---
RUNNING=unknown
for p in /proc/[0-9]*; do
  EXE=$(readlink "$p/exe" 2>/dev/null) || continue
  case "$EXE" in
    */sshd.pam) RUNNING=pam; break ;;
    */sshd) RUNNING=plain ;;
  esac
done
emit SSHD_RUNNING "$RUNNING"

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
  # "openssh-server-9.7_p1-r6"; -e limits to the installed package
  emit PKG_VERSION "$(apk info -e -v openssh-server 2>/dev/null | head -n1)"
  # the PAM build is a separate package on Alpine; its presence matters
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
  emit CONFIG_SOURCE files
  # Best effort without root: sshd keeps the FIRST value it reads for each
  # keyword, and anything after a Match line is conditional, so each file is
  # read up to its first Match and the first value wins. Drop-ins come first
  # when sshd_config includes them (the usual top-of-file Include). Include
  # placement is not modelled exactly; analysis treats file-sourced values
  # that would rule the host out as unverified.
  FILES=""
  if grep -qiE '^[[:space:]]*Include[[:space:]]+/etc/ssh/sshd_config\.d/' /etc/ssh/sshd_config 2>/dev/null; then
    for f in /etc/ssh/sshd_config.d/*.conf; do [ -r "$f" ] && FILES="$FILES $f"; done
  fi
  FILES="$FILES /etc/ssh/sshd_config"
  first_value() {
    for f in $FILES; do
      [ -r "$f" ] || continue
      # "Keyword value", "Keyword=value" and "Keyword = value" are all valid.
      V=$(awk -v k="$1" '{ l=$0; sub(/^[ \t]+/, "", l); n=split(l, a, /[ \t]*=[ \t]*|[ \t]+/); if (n < 1) next; w=tolower(a[1]); if (w=="match") exit; if (w==k) { print tolower(a[2]); exit } }' "$f" 2>/dev/null)
      if [ -n "$V" ]; then printf '%s' "$V"; return; fi
    done
  }
  case "$(first_value usepam)" in yes) USEPAM=yes ;; no) USEPAM=no ;; esac
  case "$(first_value passwordauthentication)" in yes) PWAUTH=yes ;; no) PWAUTH=no ;; esac
  V=$(first_value permitrootlogin)
  [ -n "$V" ] && PERMITROOT="$V"
fi
# sshd -T prints the global settings only; a Match block can turn password
# auth back on (or loosen root and user restrictions) for some clients.
MATCH=no
for f in /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf; do
  [ -r "$f" ] || continue
  if grep -qiE '^[[:space:]]*Match[[:space:]]' "$f" 2>/dev/null; then MATCH=yes; break; fi
done
emit MATCH_BLOCKS "$MATCH"
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
