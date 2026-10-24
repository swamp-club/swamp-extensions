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
 * The Windows probe, run by Windows PowerShell 5.1 or later when a host has
 * no sh. It prints the same tagged lines as the sh probe. Node, Bun and Envoy
 * versions come from the binaries' version resources, so it never runs them;
 * curl.exe -V is the one command it runs. Windows has no uid: "UID|0" means
 * an elevated administrator.
 *
 * @module
 */

/**
 * Quotes a value as a PowerShell single-quoted string. PowerShell also ends
 * one at the typographic quotes U+2018 to U+201B, so they are doubled too.
 */
export function psQuote(value: string): string {
  return `'${value.replace(/['\u2018\u2019\u201a\u201b]/g, "$&$&")}'`;
}

/** Search paths are absolute Windows paths on one line. */
export function assertSafeWindowsPaths(paths: string[]): void {
  for (const p of paths) {
    if (!/^([A-Za-z]:\\|\\\\)/.test(p) || /[\r\n\0]/.test(p)) {
      throw new Error(
        `Refusing searchPath ${
          JSON.stringify(p)
        }: it must be an absolute Windows path on one line`,
      );
    }
  }
}

/** The lockfile pattern for Select-String (.NET regex, case-insensitive). */
const LOCK_PATTERN_PS =
  `^(brotli|brotlicffi)\\s*==|^name = "(brotli|brotlicffi)"|"(brotli|brotlicffi)": \\{|node_modules/(express|body-parser)": \\{|^    brotli \\(`;

/**
 * Builds the Windows probe for the given search paths. Paths that are not
 * Windows paths (a POSIX searchPath given for a mixed fleet) are skipped.
 */
export function buildWindowsProbe(searchPaths: string[]): string {
  const paths = searchPaths.filter((p) => !p.startsWith("/"));
  assertSafeWindowsPaths(paths);
  const sp = paths.length > 0 ? paths.map(psQuote).join(", ") : "";
  return `
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
try { [Console]::OutputEncoding = [Text.Encoding]::UTF8 } catch {}
function Say([string]$s) { [Console]::Out.WriteLine($s) }
Say ('HOSTNAME|' + [Environment]::MachineName)
Say 'KERNEL|Windows'
Say ('HOME|' + $env:USERPROFILE)
try {
  $cv = Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion'
  $name = [string]$cv.ProductName
  if ([int]$cv.CurrentBuild -ge 22000) { $name = $name -replace '^Windows 10', 'Windows 11' }
  if ($cv.DisplayVersion) { $name = $name + ' ' + $cv.DisplayVersion }
  Say 'OS|ID=windows'
  Say ('OS|VERSION_ID=' + $cv.CurrentMajorVersionNumber + '.' + $cv.CurrentMinorVersionNumber + '.' + $cv.CurrentBuild)
  Say ('OS|PRETTY_NAME=' + $name)
} catch {}
$admin = $false
try {
  $me = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
  $admin = $me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
} catch {}
if ($admin) { Say 'UID|0' } else { Say 'UID|1' }
if (Get-Service cexecsvc) { Say 'INCONTAINER|1' }
Say ('NOW|' + [DateTimeOffset]::UtcNow.ToUnixTimeSeconds())
foreach ($t in @('winget', 'scoop', 'choco', 'py')) { $c = Get-Command $t -CommandType Application | Select-Object -First 1; if ($c) { Say ('TOOL|' + $t + '|' + $c.Source) } }
$homes = @($env:USERPROFILE)
if ($admin) { foreach ($u in Get-ChildItem -LiteralPath (Join-Path $env:SystemDrive 'Users') -Directory -Force) { if ($u.FullName -ne $env:USERPROFILE) { $homes += $u.FullName } } }
$pf86 = [Environment]::GetEnvironmentVariable('ProgramFiles(x86)')
$pfs = @($env:ProgramFiles, $pf86) | Where-Object { $_ }
$seen = @{}
function Bin([string]$f) {
  if (-not $f -or -not (Test-Path -LiteralPath $f -PathType Leaf)) { return }
  $i = Get-Item -LiteralPath $f -Force
  $k = $i.FullName.ToLower()
  if ($seen.ContainsKey($k)) { return }
  $seen[$k] = 1
  $v = ([string]$i.VersionInfo.ProductVersion).Trim()
  switch ($i.BaseName.ToLower()) {
    'node' { Say ('NODE|' + $i.FullName + '||' + $v + '|') }
    'bun' { Say ('BUN|' + $i.FullName + '|' + $v) }
    'envoy' { Say ('ENVOY|' + $i.FullName + '|' + $v) }
  }
}
$dirs = @()
foreach ($d in ($env:PATH -split ';')) { if ($d) { $dirs += $d.Trim('"') } }
foreach ($b in $pfs) { $dirs += (Join-Path $b 'nodejs') }
$globs = @('C:\\ProgramData\\scoop\\apps\\nodejs*\\current', 'C:\\ProgramData\\chocolatey\\lib\\nodejs*\\tools')
if ($env:NVM_HOME) { $globs += (Join-Path $env:NVM_HOME 'v*') }
foreach ($h in $homes) {
  $globs += @((Join-Path $h 'AppData\\Roaming\\nvm\\v*'), (Join-Path $h 'AppData\\Roaming\\fnm\\node-versions\\*\\installation'), (Join-Path $h 'AppData\\Local\\Volta\\tools\\image\\node\\*'), (Join-Path $h 'scoop\\apps\\nodejs*\\current'), (Join-Path $h 'scoop\\apps\\bun\\current'), (Join-Path $h '.bun\\bin'))
}
foreach ($g in $globs) { foreach ($i in Get-Item -Path $g -Force) { if ($i.PSIsContainer) { $dirs += $i.FullName } } }
foreach ($d in $dirs) { foreach ($e in @('node.exe', 'bun.exe', 'envoy.exe')) { Bin (Join-Path $d $e) } }
$pyseen = @{}
function PySite([string]$d, [string]$kind) {
  if (-not $d -or -not (Test-Path -LiteralPath $d -PathType Container)) { return }
  $full = (Get-Item -LiteralPath $d -Force).FullName.TrimEnd('\\')
  if ($pyseen.ContainsKey($full.ToLower())) { return }
  $pyseen[$full.ToLower()] = 1
  Say ('PYENV|' + $full + '|||' + $kind)
  foreach ($m in Get-ChildItem -LiteralPath $full -Directory -Force) {
    if ($m.Name -match '^(?i)(brotli|brotlicffi|urllib3|requests|aiohttp|httpx|scrapy)-.*[.](dist|egg)-info$') { Say ('PYPKG|' + $full + '|' + $m.Name) }
  }
}
$pyRoots = @()
foreach ($hive in @('HKLM:\\SOFTWARE\\Python\\PythonCore', 'HKLM:\\SOFTWARE\\WOW6432Node\\Python\\PythonCore', 'HKCU:\\SOFTWARE\\Python\\PythonCore')) {
  foreach ($k in Get-ChildItem -Path $hive) {
    $ip = (Get-ItemProperty -LiteralPath (Join-Path $k.PSPath 'InstallPath')).'(default)'
    if ($ip) { $pyRoots += $ip }
  }
}
$rootGlobs = @('C:\\Python3*', 'C:\\ProgramData\\anaconda3', 'C:\\ProgramData\\miniconda3')
foreach ($b in $pfs) { $rootGlobs += (Join-Path $b 'Python3*') }
foreach ($h in $homes) { $rootGlobs += @((Join-Path $h 'AppData\\Local\\Programs\\Python\\Python3*'), (Join-Path $h 'anaconda3'), (Join-Path $h 'miniconda3'), (Join-Path $h 'anaconda3\\envs\\*'), (Join-Path $h 'miniconda3\\envs\\*')) }
foreach ($g in $rootGlobs) { foreach ($i in Get-Item -Path $g -Force) { if ($i.PSIsContainer) { $pyRoots += $i.FullName } } }
foreach ($r in $pyRoots) { PySite (Join-Path $r 'Lib\\site-packages') '' }
foreach ($h in $homes) {
  foreach ($g in @((Join-Path $h 'AppData\\Roaming\\Python\\Python3*\\site-packages'), (Join-Path $h 'AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3*\\LocalCache\\local-packages\\Python3*\\site-packages'))) {
    foreach ($i in Get-Item -Path $g -Force) { PySite $i.FullName 'user' }
  }
}
foreach ($b in $pfs) {
  foreach ($r in Get-ChildItem -LiteralPath (Join-Path $b 'dotnet\\shared\\Microsoft.NETCore.App') -Directory) { Say ('DOTNET|' + $r.FullName + '|' + $r.Name + '||') }
}
$curls = @((Join-Path $env:windir 'System32\\curl.exe'))
foreach ($b in $pfs) { $curls += (Join-Path $b 'Git\\mingw64\\bin\\curl.exe') }
foreach ($c in $curls) {
  if (-not (Test-Path -LiteralPath $c -PathType Leaf)) { continue }
  $l = [string](& $c -V | Select-Object -First 1)
  $own = if ($c -like (Join-Path $env:windir '*')) { 'windows' } else { '' }
  Say ('CURL|' + $c + '|' + $own + '|' + $l + '|')
}
$apps = @()
foreach ($b in $pfs) { $apps += @((Join-Path $b '*\\resources\\app.asar')) }
foreach ($h in $homes) { $apps += @((Join-Path $h 'AppData\\Local\\Programs\\*\\resources\\app.asar'), (Join-Path $h 'AppData\\Local\\*\\app-*\\resources\\app.asar')) }
foreach ($a in $apps) { foreach ($i in Get-Item -Path $a -Force) { Say ('ELECTRON|' + $i.FullName) } }
$lockNames = @('poetry.lock', 'uv.lock', 'Pipfile.lock', 'package-lock.json', 'Gemfile.lock')
$lockPat = '${LOCK_PATTERN_PS.replace(/'/g, "''")}'
foreach ($sp in @(${sp})) {
  if (-not (Test-Path -LiteralPath $sp -PathType Container)) { Say ('NOSEARCHPATH|' + $sp); continue }
  $n = 0
  foreach ($f in Get-ChildItem -LiteralPath $sp -Recurse -Depth 6 -File -Force | Where-Object { (($lockNames -contains $_.Name) -or ($_.Name -like 'requirements*.txt')) -and $_.Length -lt 5MB -and $_.FullName -notmatch '\\\\(node_modules|[.]git)\\\\' }) {
    $n++
    if ($n -gt 500) { break }
    $lines = 0
    foreach ($m in Select-String -LiteralPath $f.FullName -Pattern $lockPat -Context 0,2) {
      $lines++
      if ($lines -gt 100) { break }
      Say ('LOCK|' + $f.FullName + '|' + $m.LineNumber + ':' + $m.Line)
      $k = $m.LineNumber
      foreach ($p in $m.Context.PostContext) { $k++; Say ('LOCK|' + $f.FullName + '|' + $k + '-' + $p) }
    }
  }
  foreach ($c in Get-ChildItem -LiteralPath $sp -Recurse -Depth 5 -File -Force -Filter 'pyvenv.cfg') { PySite (Join-Path $c.DirectoryName 'Lib\\site-packages') 'venv' }
}
if ($admin) { Say 'PROCSCOPE|all' } else { Say 'PROCSCOPE|own' }
$procs = @{}
foreach ($p in Get-Process) {
  $procs[[int]$p.Id] = $p.ProcessName
  if ($p.ProcessName -notmatch '^(?i)(node|bun|envoy)$' -or -not $p.Path) { continue }
  $w = (Get-Item -LiteralPath $p.Path -Force).LastWriteTime
  if ($p.StartTime -and $w -and $p.StartTime -lt $w) { Say ('MAPS|' + $p.Id + '|' + $p.ProcessName + '||' + $p.Path) }
}
try {
  foreach ($l in (netstat -ano -p TCP) + (netstat -ano -p TCPv6)) {
    $t = $l.Trim() -split '\\s+'
    if ($t.Count -lt 5 -or $t[0] -notmatch '^TCP' -or $t[2] -notmatch ':0$') { continue }
    $id = [int]$t[$t.Count - 1]
    Say ('LISTEN|LISTEN 0 0 ' + $t[1] + ' ' + $t[2] + ' users:(("' + $procs[$id] + '",pid=' + $id + '))')
  }
} catch { Say 'NOLISTEN|1' }
Say 'END|1'
`;
}
