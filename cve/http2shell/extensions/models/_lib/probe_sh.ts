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
 * The POSIX sh probe for Linux and macOS targets. One script per target;
 * every line it prints is "TAG|fields". Nothing in it needs root, and what it
 * cannot read is reported as UNREADABLE or simply absent. It runs node, bun,
 * envoy, pilot-agent and curl for their versions (as the PHP probe runs
 * php -v), with NODE_OPTIONS and the PYTHON* variables unset, so a login
 * shell's settings cannot load code into them. Python packages are read from
 * dist-info directory names; no interpreter is started.
 *
 * @module
 */

/** Quotes a word for POSIX sh only when it needs quoting. */
export function shQuote(s: string): string {
  if (/^[A-Za-z0-9_\-.\/:@%+,=]+$/.test(s)) return s;
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

/** Search paths are absolute, single-line paths. */
export function assertSafePosixPaths(paths: string[]): void {
  for (const p of paths) {
    if (!p.startsWith("/") || /[\r\n\0]/.test(p)) {
      throw new Error(
        `Refusing searchPath ${
          JSON.stringify(p)
        }: it must be an absolute path on one line`,
      );
    }
  }
}

/**
 * Lines worth reading in a lockfile: Python pins of Brotli or brotlicffi
 * (requirements, poetry.lock, uv.lock, Pipfile.lock), express and
 * body-parser in package-lock.json, and the brotli gem in Gemfile.lock.
 * grep prints each with the two lines after it, which hold the version.
 */
export const LOCK_PATTERN =
  `^(brotli|brotlicffi)[[:space:]]*==|^name = "(brotli|brotlicffi)"|"(brotli|brotlicffi)": [{]|node_modules/(express|body-parser)": [{]|^    brotli [(]`;

/**
 * The ownership check the probe applies before it runs, or runs ldd on, any
 * file, and that mitigate repeats right before it runs a Python interpreter.
 * Defines me, os, adm, acl_ok(), trusted(), tree_ok() and cfg_ok().
 */
export const TRUSTED_SH = `
me=$(id -u)
# Only run, or ldd, a file that nobody but root or this user could have
# written: the file and every directory above it owned by one of them, not
# writable by others, and writable by its group only when that group is
# root's (or macOS admin, whose members can sudo; Homebrew's Cellar is
# admin-writable). A symlink's own mode means nothing, so only its owner
# counts; callers check what it resolves to as well. Anything else (another
# user's nvm, a world-writable /opt) is reported without being run.
os=$(uname -s)
adm=0
[ "$os" = Darwin ] && adm=80
# Mode bits are not the whole story: an ACL (ls shows + after the mode) can
# let another user write a root-owned 0644 file. A path with one passes only
# when no entry grants anyone else write. Linux: no named user or group other
# than root, this user, root's group or adm with an effective w; default:
# entries only shape new files, and a w the mask removes is not effective.
# Without getfacl the ACL cannot be read, so it refuses. macOS: no allow entry
# with a write permission for anyone but root, admin, wheel or this user;
# deny entries (macOS puts one on every home) take nothing from the owner.
acl_ok() {
  m=$(ls -ld "$1" | awk '{ print $1 }')
  [ -n "$m" ] || return 1
  if [ "$os" = Darwin ]; then
    # macOS shows @ instead of + when the path also has extended attributes.
    case "$m" in *[+@]) ;; *) return 0;; esac
    # An entry is "N: principal [inherited] allow|deny perms", and a
    # principal's name may hold spaces; a line in no such shape refuses.
    ls -lde "$1" | sed 1d | awk -v me="$(id -un)" '
      { k = 0; for (i = 3; i <= NF; i++) if ($i == "allow" || $i == "deny") { k = i; break } }
      k == 0 { bad = 1; next }
      $k == "deny" || $(k + 1) !~ /write|append|add_file|add_subdirectory|delete_child|chown/ { next }
      { w = $2; for (i = 3; i < k; i++) if ($i != "inherited") w = w " " $i }
      w == "user:root" || w == "user:" me || w == "group:admin" || w == "group:wheel" { next }
      { bad = 1 }
      END { exit bad }'
  else
    case "$m" in *+) ;; *) return 0;; esac
    fa=$(getfacl -cpn "$1") && [ -n "$fa" ] || return 1
    printf '%s\\n' "$fa" | awk -F: -v me="$me" -v adm="$adm" '
      $1 != "user" && $1 != "group" || $2 == "" { next }
      { p = $3; if (match($0, /#effective:[rwx-]+/)) p = substr($0, RSTART + 11, RLENGTH - 11) }
      p !~ /w/ { next }
      $1 == "user" && ($2 == 0 || $2 == me) { next }
      $1 == "group" && ($2 == 0 || $2 == adm) { next }
      { bad = 1 }
      END { exit bad }'
  fi
}
trusted() {
  t=$1
  while :; do
    [ -n "$(find "$t" -maxdepth 0 \\( -user 0 -o -user "$me" \\) \\( -type l -o ! -perm -0002 \\( ! -perm -0020 -o -group 0 -o -group "$adm" \\) \\) -print)" ] || return 1
    [ -L "$t" ] || acl_ok "$t" || return 1
    [ "$t" = / ] && return 0
    t=$(dirname "$t")
  done
}
# A directory tree nobody else can change: no file or directory in it is
# writable by others, or by a group other than root's (or macOS admin), or
# through an ACL. Only the entries ls marks with + (or @ on macOS) are read
# for their ACL.
tree_ok() {
  [ -z "$(find "$1" \\( -type f -o -type d \\) \\( -perm -0002 -o \\( -perm -0020 ! -group 0 ! -group "$adm" \\) \\) -print | head -n 1)" ] || return 1
  [ -z "$(find "$1" \\( -type f -o -type d \\) -exec ls -ldn {} + | awk '$1 ~ /[+@]$/ { for (i = 0; i < 8; i++) sub(/^[^ ]+ +/, ""); print }' | while IFS= read -r a; do acl_ok "$a" || { echo bad; break; }; done)" ]
}
# A venv's pyvenv.cfg is read by its interpreter even with -I: the one next
# to the interpreter first, then the one in the venv root. Its home key
# decides where the standard library is loaded from. Each one present must
# pass trusted, and its home must hold an interpreter of the same name that
# passes trusted too (the install the venv links to, or for a --copies venv
# the one it was copied from), whose lib/pythonX.Y (and lib64) tree nobody
# else can change. Python reads the key case-insensitively. A venv with
# include-system-site-packages = true also runs the .pth files of the base
# install's site directories (Debian's /usr/local dist-packages is writable
# by group staff), even under -I, so it refuses. Takes the venv root and its
# interpreter.
cfg_ok() {
  for c in "$(dirname "$2")/pyvenv.cfg" "$1/pyvenv.cfg"; do
    [ -e "$c" ] || [ -L "$c" ] || continue
    trusted "$c" && trusted "$(readlink -f "$c")" || return 1
    isp=$(awk -F= 'tolower($1) ~ /^[[:space:]]*include-system-site-packages[[:space:]]*$/ { v = tolower($2); gsub(/[[:space:]]/, "", v); print v; exit }' "$c")
    [ "$isp" = true ] && return 1
    h=$(sed -n 's/^[[:space:]]*[Hh][Oo][Mm][Ee][[:space:]]*=[[:space:]]*//p' "$c" | head -n 1 | sed 's/[[:space:]]*$//')
    [ -n "$h" ] || continue
    case "$h" in /*) ;; *) return 1;; esac
    hi=$h/$(basename "$2")
    [ -e "$hi" ] && trusted "$hi" && trusted "$(readlink -f "$hi")" || return 1
    hp=$(dirname "$(dirname "$(readlink -f "$hi")")")
    hl=0
    for l in "$hp/lib/$(basename "$2")" "$hp/lib64/$(basename "$2")"; do
      [ -d "$l" ] || continue
      trusted "$l" && tree_ok "$l" || return 1
      hl=1
    done
    [ "$hl" = 1 ] || return 1
  done
  return 0
}
`;

/** Builds the sh probe for the given search paths. */
export function buildShProbe(searchPaths: string[]): string {
  assertSafePosixPaths(searchPaths);
  const sp = searchPaths.map(shQuote).join(" ");
  return `
exec 2>/dev/null
LC_ALL=C; export LC_ALL
unset NODE_OPTIONS PYTHONPATH PYTHONSTARTUP PYTHONHOME
echo "HOSTNAME|$(hostname || cat /etc/hostname)"
echo "UID|$(id -u)"
echo "HOME|$HOME"
echo "KERNEL|$(uname -s)"
if [ -r /etc/os-release ]; then
  grep -E '^(ID|VERSION_ID|VERSION_CODENAME|PRETTY_NAME)=' /etc/os-release | tr -d '"' | sed 's/^/OS|/'
elif command -v sw_vers >/dev/null; then
  v=$(sw_vers -productVersion)
  echo "OS|ID=macos"; echo "OS|VERSION_ID=$v"; echo "OS|PRETTY_NAME=macOS $v"
fi
if [ -f /.dockerenv ] || [ -f /run/.containerenv ]; then echo "INCONTAINER|1"; fi
echo "NOW|$(date +%s)"
for t in sudo apt-get dnf yum apk brew systemctl ldd otool timeout; do p=$(command -v "$t") && echo "TOOL|$t|$p"; done
TO=$(command -v timeout)
run_to() { if [ -n "$TO" ]; then "$TO" 10 "$@" </dev/null; else "$@" </dev/null; fi; }
owner() {
  o=""
  case "$1" in */Cellar/*) o="brew:$(printf '%s' "$1" | sed 's|.*/Cellar/\\([^/]*\\)/.*|\\1|')";; esac
  [ -z "$o" ] && command -v dpkg >/dev/null && o=$(dpkg -S "$1" | grep -v '^diversion' | head -n 1 | cut -d: -f1)
  [ -z "$o" ] && command -v rpm >/dev/null && o=$(rpm -qf --qf '%{NAME}' "$1" | grep -v ' ' | head -n 1)
  [ -z "$o" ] && command -v apk >/dev/null && o=$(apk info --who-owns "$1" | sed -n 's/.* is owned by //p' | head -n 1)
  printf '%s' "$o"
}
links() {
  if command -v ldd >/dev/null; then ldd "$1" | awk '/libbrotlidec/ { if ($3 ~ /^[/]/) print $3; else print $1; exit }'
  elif command -v otool >/dev/null; then otool -L "$1" | awk '/libbrotlidec/ { print $1; exit }'
  else printf '?'; fi
}
${TRUSTED_SH}
# Names and paths anyone can choose (process names, directory names) never
# reach the output with a line break or a field separator in them.
san() { printf '%s' "$1" | tr '\r\n|' '???'; }
homes="$HOME"
[ "$(id -u)" = 0 ] && homes="$homes /root"
for h in /home/* /Users/*; do [ -d "$h" ] && [ "$h" != "$HOME" ] && homes="$homes $h"; done
if command -v dpkg-query >/dev/null; then
  dpkg-query -W -f='\${Package}|\${Version}|\${db:Status-Abbrev}\\n' 'libbrotli*' brotli python3-brotli nodejs 'libnode*' 'dotnet-runtime*' 'dotnet*-runtime' | awk -F'|' '$3 ~ /^ii/ { print "PKG|dpkg|" $1 "|" $2 }'
  f=$(ls -t /var/lib/apt/lists/*Release | head -n 1)
  [ -n "$f" ] && echo "APTLISTS|$(stat -c %Y "$f")"
  command -v apt >/dev/null && apt list --upgradable | grep -E '^(libbrotli|brotli|python3-brotli|nodejs)' | awk '{ split($1, n, "/"); print "PENDING|dpkg|" n[1] "|" $2 }'
fi
if command -v rpm >/dev/null; then
  rpm -qa --qf '%{NAME}|%|EPOCH?{%{EPOCH}:}|%{VERSION}-%{RELEASE}\\n' | grep -E '^(libbrotli|brotli|python3-brotli|nodejs[0-9]*|dotnet-runtime-[0-9.]+)[|]' | sed 's/^/PKG|rpm|/'
  if command -v dnf >/dev/null; then
    dnf -q -C check-update 'brotli*' 'libbrotli*' 'python3-brotli' 'nodejs*' | awk 'NF == 3 && $1 ~ /[.]/ { sub(/[.][^.]*$/, "", $1); print "PENDING|rpm|" $1 "|" $2 }'
  fi
fi
if command -v apk >/dev/null; then
  apk info -v | grep -E '^(brotli|brotli-libs|py3-brotli|nodejs|nodejs-current|dotnet[0-9]*-runtime)-[0-9]' | sed 's/^/APKPKG|/'
  apk version -l '<' | grep -E '^(brotli|py3-brotli|nodejs)' | awk '{ print "APKPENDING|" $1 "|" $3 }'
fi
if command -v brew >/dev/null && [ "$(id -u)" != 0 ]; then
  brew list --versions brotli node node@22 node@24 node@26 | awk '{ print "PKG|brew|" $1 "|" $NF }'
fi
seen=""
check_bin() {
  [ -f "$1" ] && [ -x "$1" ] || return
  r=$(readlink -f "$1" || printf '%s' "$1")
  case " $seen " in *" $r "*) return;; esac
  seen="$seen $r"
  rs=$(san "$r")
  if ! trusted "$r"; then
    echo "NOTRUN|$rs"
    case "$(basename "$r")" in
      node|nodejs|node[0-9]*) echo "NODE|$rs||$(printf '%s' "$rs" | sed -n 's|.*/v\\{0,1\\}\\([0-9][0-9.]*\\)/.*bin/node[^/]*$|v\\1|p')|?";;
      bun) echo "BUN|$rs|";;
      envoy) echo "ENVOY|$rs|";;
      pilot-agent) echo "ISTIO|$rs|";;
    esac
    return
  fi
  case "$(basename "$r")" in
    node|nodejs|node[0-9]*)
      v=$(run_to "$r" -p 'process.version+" "+(process.versions.brotli||"")' | head -n 1)
      echo "NODE|$rs|$(owner "$r")|$v|$(links "$r")";;
    bun) echo "BUN|$rs|$(run_to "$r" --version | head -n 1)";;
    envoy) echo "ENVOY|$rs|$(run_to "$r" --version | grep -m 1 -oE '/[0-9]+[.][0-9]+[.][0-9]+/' | tr -d /)";;
    pilot-agent) echo "ISTIO|$rs|$(run_to "$r" version | grep -m 1 -oE '[0-9]+[.][0-9]+[.][0-9]+')";;
  esac
}
# PATH entries split on ":" only, with globbing off, so "/opt/My Tools/bin"
# stays one directory.
oldifs=$IFS; IFS=:; set -f
for d in $PATH; do
  [ -n "$d" ] || continue
  for f in "$d"/node "$d"/nodejs "$d"/bun "$d"/envoy "$d"/pilot-agent; do check_bin "$f"; done
done
IFS=$oldifs; set +f
for d in /usr/bin /usr/local/bin /opt/homebrew/bin /nodejs/bin /usr/local/n/versions/node/*/bin /opt/*/bin /opt/homebrew/opt/node*/bin /usr/local/opt/node*/bin; do
  for f in "$d"/node "$d"/nodejs "$d"/bun "$d"/envoy "$d"/pilot-agent; do check_bin "$f"; done
done
for h in $homes; do
  for d in "$h"/.nvm/versions/node/*/bin "$h"/.local/share/fnm/node-versions/*/installation/bin "$h"/Library/Application\\ Support/fnm/node-versions/*/installation/bin "$h"/.volta/tools/image/node/*/bin "$h"/.asdf/installs/nodejs/*/bin "$h"/.local/share/mise/installs/node/*/bin "$h"/.bun/bin; do
    for f in "$d"/node "$d"/bun; do check_bin "$f"; done
  done
done
pyseen=""
py_site() {
  [ -d "$1" ] || return
  r=$(cd "$1" && pwd -P) || return
  case " $pyseen " in *" $r "*) return;; esac
  pyseen="$pyseen $r"
  # Whether mitigate may run this environment's interpreter: the site
  # directory, <root>/bin/pythonX.Y and the file it resolves to all pass
  # trusted, and so does <root>/pyvenv.cfg when there is one.
  ok=0
  case "$r" in
    */lib/python3.*/site-packages)
      pr=\${r%/lib/python3.*/site-packages}
      pv=\${r%/site-packages}
      i="$pr/bin/\${pv##*/}"
      if [ -e "$i" ] && trusted "$pv" && tree_ok "$pv" && trusted "$i" && trusted "$(readlink -f "$i")" && cfg_ok "$pr" "$i"; then ok=1; fi;;
  esac
  echo "PYENV|$(san "$r")|$(ls -ldn "$r" | awk '{ print $3 "|" $1 }')|$2|$ok"
  for m in "$r"/*.dist-info "$r"/*.egg-info; do
    [ -e "$m" ] || continue
    b=$(basename "$m")
    case "$(printf '%s' "$b" | tr 'A-Z' 'a-z')" in
      brotli-*|brotlicffi-*|urllib3-*|requests-*|aiohttp-*|httpx-*|scrapy-*) echo "PYPKG|$(san "$r")|$(san "$b")";;
    esac
  done
}
for d in /usr/lib/python3*/site-packages /usr/lib/python3*/dist-packages /usr/lib/python3/dist-packages /usr/lib64/python3*/site-packages /usr/local/lib/python3*/site-packages /usr/local/lib/python3*/dist-packages /opt/homebrew/lib/python3*/site-packages /Library/Frameworks/Python.framework/Versions/*/lib/python3*/site-packages /opt/conda/lib/python3*/site-packages /opt/conda/envs/*/lib/python3*/site-packages /opt/venv/lib/python3*/site-packages /app/.venv/lib/python3*/site-packages; do py_site "$d"; done
for h in $homes; do
  for d in "$h"/.local/lib/python3*/site-packages "$h"/Library/Python/3*/lib/python/site-packages "$h"/.pyenv/versions/*/lib/python3*/site-packages "$h"/miniconda3/lib/python3*/site-packages "$h"/anaconda3/lib/python3*/site-packages "$h"/.local/share/uv/python/*/lib/python3*/site-packages "$h"/.local/share/pipx/venvs/*/lib/python3*/site-packages "$h"/.local/pipx/venvs/*/lib/python3*/site-packages; do py_site "$d"; done
done
for b in /usr/share/dotnet /usr/lib/dotnet /usr/lib64/dotnet /opt/dotnet /usr/local/share/dotnet; do
  for r in "$b"/shared/Microsoft.NETCore.App/*; do
    [ -d "$r" ] || continue
    so=$(ls "$r"/libSystem.IO.Compression.Native.* | head -n 1)
    l="?"; trusted "$so" && l=$(links "$so")
    echo "DOTNET|$(san "$r")|$(san "$(basename "$r")")|$(owner "$so")|$l"
  done
done
for h in $homes; do
  for r in "$h"/.dotnet/shared/Microsoft.NETCore.App/*; do
    [ -d "$r" ] || continue
    so=$(ls "$r"/libSystem.IO.Compression.Native.* | head -n 1)
    l="?"; trusted "$so" && l=$(links "$so")
    echo "DOTNET|$(san "$r")|$(san "$(basename "$r")")||$l"
  done
done
# curl on PATH, and Homebrew's keg-only curl, which is not on PATH but
# links Homebrew's brotli.
cseen=""
for c in "$(command -v curl)" /opt/homebrew/opt/curl/bin/curl /usr/local/opt/curl/bin/curl; do
  [ -n "$c" ] && [ -x "$c" ] || continue
  r=$(readlink -f "$c" || printf '%s' "$c")
  case " $cseen " in *" $r "*) continue;; esac
  cseen="$cseen $r"
  if trusted "$r"; then echo "CURL|$(san "$r")|$(owner "$r")|$(run_to "$r" -V | head -n 1)|$(links "$r")"; else echo "NOTRUN|$(san "$r")"; fi
done
for g in /usr/lib/ruby/gems/*/gems/brotli-[0-9]* /var/lib/gems/*/gems/brotli-[0-9]* /usr/local/lib/ruby/gems/*/gems/brotli-[0-9]* /usr/local/bundle/gems/brotli-[0-9]* /opt/homebrew/lib/ruby/gems/*/gems/brotli-[0-9]*; do [ -d "$g" ] && echo "GEM|$(san "$g")"; done
for h in $homes; do
  for g in "$h"/.gem/ruby/*/gems/brotli-[0-9]* "$h"/.local/share/gem/ruby/*/gems/brotli-[0-9]* "$h"/.rbenv/versions/*/lib/ruby/gems/*/gems/brotli-[0-9]*; do [ -d "$g" ] && echo "GEM|$(san "$g")"; done
done
for a in /opt/*/resources/app.asar /opt/*/*/resources/app.asar /usr/lib/*/resources/app.asar /usr/share/*/resources/app.asar /Applications/*.app/Contents/Resources/app.asar; do [ -f "$a" ] && echo "ELECTRON|$(san "$a")"; done
for sp in ${sp}; do
  if [ ! -d "$sp" ]; then echo "NOSEARCHPATH|$sp"; continue; fi
  find "$sp" -maxdepth 6 \\( -name node_modules -o -name .git \\) -prune -o -type f \\( -name poetry.lock -o -name uv.lock -o -name 'requirements*.txt' -o -name Pipfile.lock -o -name package-lock.json -o -name Gemfile.lock \\) -size -5000k -print | head -n 500 | while IFS= read -r f; do
    # The path goes to awk through the environment, which, unlike -v, does
    # not expand backslash escapes, and san() has already removed CR, LF and |.
    grep -n -A 2 -iE '${LOCK_PATTERN}' "$f" | head -n 300 | H2S_F=$(san "$f") awk 'BEGIN { f = ENVIRON["H2S_F"] } { print "LOCK|" f "|" $0 }'
  done
  find "$sp" -maxdepth 5 -name node_modules -prune -o -name pyvenv.cfg -type f -print | head -n 200 | while IFS= read -r c; do
    for d in "$(dirname "$c")"/lib/python3*/site-packages; do py_site "$d" venv; done
  done
done
if [ -d /proc/1 ]; then
  if [ "$(id -u)" = 0 ]; then echo "PROCSCOPE|all"; else echo "PROCSCOPE|own"; fi
  incont=0
  useen=""
  { [ -f /.dockerenv ] || [ -f /run/.containerenv ]; } && incont=1
  # fd 3 is the probe's own output, for lines the cap below must not drop.
  exec 3>&1
  for p in /proc/[0-9]*; do
    # On a host, a container's processes map their image's own libraries,
    # which the host's packages do not fix; scan the container instead.
    [ "$incont" = 0 ] && grep -qE 'docker-[0-9a-f]{12,}[.]scope|/docker/[0-9a-f]{12,}|kubepods|libpod-[0-9a-f]|crio-[0-9a-f]|/lxc/|lxc[.]payload' "$p/cgroup" && continue
    # Every brotli library or Python binding the process maps: MAPS for an
    # old copy deleted on disk, LOADED for the current one.
    f=$(grep -E '(libbrotli(dec|common|enc)[^ /]*|_brotli[^ /]*[.]so|_brotlicffi[^ /]*[.]so) [(]deleted[)]$' "$p/maps" | sed -E 's/^([^ ]+ +){5}//; s/ [(]deleted[)]$//' | sort -u)
    e=$(readlink "$p/exe")
    case "$e" in
      *" (deleted)") n=$(basename "\${e% (deleted)}"); case "$n" in node|nodejs|bun|envoy|pilot-agent) f="$f
\${e% (deleted)}";; esac;;
    esac
    l=$(grep -E '(libbrotlidec[^ /]*|_brotli[^ /]*[.]so|_brotlicffi[^ /]*[.]so)$' "$p/maps" | sed -E 's/^([^ ]+ +){5}//' | sort -u)
    [ -n "$f" ] || [ -n "$l" ] || continue
    # Only a system service's unit: a user's own units (under user@N.service)
    # can take any name, and must never make root restart a system unit.
    # Anchored at the root of the hierarchy: a user manager's own nested
    # system.slice (user@N.service/system.slice/...) is not a system unit.
    u=$(grep -m 1 -oE '^[0-9]+:[^:]*:/system[.]slice/[^/]+[.]service$' "$p/cgroup" | sed 's|.*/||')
    u=$(san "$u")
    c=$(san "$(cat "$p/comm")")
    i=\${p#/proc/}
    # The real uid: a setuid program a user starts still counts as theirs.
    pu=$(awk '/^Uid:/ { print $2; exit }' "$p/status")
    printf '%s\\n' "$f" | while IFS= read -r x; do [ -n "$x" ] && echo "MAPS|$i|$c|$u|$(san "$x")|$pu"; done
    printf '%s\\n' "$l" | while IFS= read -r x; do [ -n "$x" ] && echo "LOADED|$i|$c|$u|$(san "$x")|$pu"; done
    # Once per unit: its main process and the uid its User= runs as (root
    # when unset), so mitigate restarts a unit for its own service's
    # processes, never for a user's job that happens to share its cgroup.
    case " $useen " in *" $u "*) continue;; esac
    useen="$useen $u"
    case "$u" in ""|*[!A-Za-z0-9@:._-]*) continue;; esac
    command -v systemctl >/dev/null || continue
    # key=value, which every systemd prints (--value needs 230 or later).
    # No User= line means systemctl failed: no uid, never root.
    sc=$(run_to systemctl show -p MainPID -p User -- "$u")
    mp=$(printf '%s\\n' "$sc" | sed -n 's/^MainPID=//p')
    case "$sc" in *User=*) ;; *) continue;; esac
    su=$(printf '%s\\n' "$sc" | sed -n 's/^User=//p')
    if [ -z "$su" ]; then uu=0; else uu=$(id -u -- "$su"); fi
    # Past the process-line cap, on the probe's own output.
    echo "UNIT|$u|$mp|$uu" >&3
  done | head -n 400
  exec 3>&-
else
  echo "PROCSCOPE|none"
fi
# A listening process's name (comm, 15 bytes) is chosen by whoever runs it.
# Every row loses CR and |, and only socket rows are kept: state, two numeric
# queues and a host:port address. A line break in a name starts a line whose
# text up to that address is the rest of the name, and "LISTEN 0 0 a:1"
# already fills the 15 bytes, so the address would run into the quote ss
# puts after the name and fail the match.
if command -v ss >/dev/null; then ss -H -ltnp | tr '\r|' '??' | awk '$1 == "LISTEN" && $2 ~ /^[0-9]+$/ && $3 ~ /^[0-9]+$/ && $4 ~ /.:[0-9*]+$/ { print "LISTEN|" $0 }'
elif command -v netstat >/dev/null && netstat -ltnp >/dev/null; then netstat -ltnp | tr '\r|' '??' | awk '$1 ~ /^tcp/ && $2 ~ /^[0-9]+$/ && $3 ~ /^[0-9]+$/ && $4 ~ /.:[0-9*]+$/ && $6 == "LISTEN" { print "LISTEN|" $0 }'
elif command -v lsof >/dev/null; then lsof -nP -iTCP -sTCP:LISTEN | tr '\r|' '??' | awk 'NR > 1 && NF >= 9 { print "LSOF|" $1 "|" $2 "|" $9 }'
else echo "NOLISTEN|1"; fi
echo "END|1"
`;
}
