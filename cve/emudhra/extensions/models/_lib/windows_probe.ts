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
 * The Windows probe: a Windows PowerShell 5.1 script that prints the same
 * `@@ section` lines as the sh probe, so parseProbe and assessHost serve both.
 * The OS verdict comes from CryptoAPI (.NET's X509Chain): the Root, AuthRoot
 * and Disallowed stores, and Microsoft's automatic root and disallowed-list
 * updates. Each copy is checked for its own purpose (server authentication
 * or code signing), so a root Windows does not allow for that purpose
 * rejects it. It is read-only and needs no administrator rights.
 *
 * The script is a String.raw template with no backticks or dollar-brace
 * sequences, so its backslashes and dollar signs reach PowerShell as written.
 *
 * @module
 */

import {
  COMPROMISED_CERTS,
  EMSIGN_TLS_G3_CROSS,
  TEST_HOSTS,
} from "./emudhra_certs.ts";
import {
  STORE_MAX_BLOBS,
  STORE_MAX_BYTES,
  STORE_MAX_TOTAL,
} from "./emudhra_logic.ts";

/** Ends a script sent on stdin; the launcher stops reading at this line. */
export const POWERSHELL_END = "# emudhra-probe-end";

/**
 * Windows command lines are too short for the probe, so a small launcher
 * reads it from stdin and runs it. It stops at POWERSHELL_END rather than at
 * EOF, which Windows OpenSSH sometimes never delivers, and goes base64-encoded
 * so neither cmd.exe nor a PowerShell login shell rewrites it.
 */
const LAUNCHER = [
  // Progress records would reach stderr as CLIXML.
  "$ProgressPreference = 'SilentlyContinue'",
  // stdin is UTF-8 bytes. Console.In would decode them with the console code
  // page and mangle a non-ASCII searchPaths entry, and setting
  // Console.InputEncoding fails when ssh gives PowerShell no console.
  "$stdin = New-Object IO.StreamReader([Console]::OpenStandardInput(), (New-Object Text.UTF8Encoding $false))",
  "$b = New-Object Text.StringBuilder",
  `while ($true) { $l = $stdin.ReadLine(); if ($null -eq $l -or $l -eq '${POWERSHELL_END}') { break }; [void]$b.AppendLine($l) }`,
  // An uncaught error goes to stderr as plain text, not CLIXML.
  "try { Invoke-Expression $b.ToString() } catch { [Console]::Error.WriteLine($_.Exception.Message); exit 1 }",
].join("\n");

/** -EncodedCommand takes base64 of UTF-16LE. */
export function encodePowerShell(script: string): string {
  let bin = "";
  for (let i = 0; i < script.length; i++) {
    const c = script.charCodeAt(i);
    bin += String.fromCharCode(c & 0xff, c >> 8);
  }
  return btoa(bin);
}

/** The command that runs a script sent on stdin, as an argv. */
export const POWERSHELL_ARGV: readonly string[] = [
  "powershell.exe",
  "-NoProfile",
  "-NonInteractive",
  "-ExecutionPolicy",
  "Bypass",
  "-EncodedCommand",
  encodePowerShell(LAUNCHER),
];

/** stdin for the launcher: the script, then the end marker. */
export function launcherInput(script: string): string {
  // PowerShell's -eq is case-insensitive, so the guard is too.
  const end = POWERSHELL_END.toLowerCase();
  if (script.split(/\r?\n/).some((l) => l.trim().toLowerCase() === end)) {
    throw new Error("PowerShell script contains the launcher's end marker");
  }
  return `${script}\n${POWERSHELL_END}\n`;
}

/** Quote a value as a PowerShell single-quoted string literal. */
export function psQuote(value: string): string {
  return `'${value.replace(/['\u2018\u2019\u201a\u201b]/g, "$&$&")}'`;
}

/**
 * Validate Windows `searchPaths`: drive-letter or UNC absolute paths, with no
 * control characters.
 */
export function assertSafeWindowsPaths(paths: string[]): void {
  for (const p of paths) {
    if (
      !/^([A-Za-z]:[\\/]|\\\\[^\\/]+[\\/][^\\/]+)/.test(p) ||
      [...p].some((ch) => ch.charCodeAt(0) < 0x20)
    ) {
      throw new Error(
        `Refusing searchPaths entry ${
          JSON.stringify(p)
        }: use absolute Windows paths (C:\\... or \\\\server\\share\\...)`,
      );
    }
  }
}

/**
 * Chain status values that mean Windows refuses the certificate.
 * NotValidForUsage: a certificate in the chain is not allowed for the
 * purpose asked for, so it is refused for that purpose.
 */
const NO_TRUST = [
  "ExplicitDistrust",
  "Revoked",
  "NotSignatureValid",
  "NotValidForUsage",
];

/**
 * Chain status values that mean no root was found. All four roots are in
 * Microsoft's root program, so this means CryptoAPI could not fetch the
 * root (AuthRoot is downloaded on demand), not that it is distrusted: the
 * result is an error, and the verdict reads unknown rather than clean.
 */
const NO_ROOT = ["UntrustedRoot", "PartialChain", "Cyclic"];

/**
 * The only chain status values a trusted chain may carry. Time errors come
 * after the chain reached a trusted root, as with openssl's 9 and 10. Any
 * other status is an error, so the copy reads unknown, never trusted or clean.
 */
const OK_STATUS = ["NotTimeValid", "NotTimeNested"];

/** The purpose each copy is checked for: server authentication or code signing. */
const USAGE_OID = {
  "tls": "1.3.6.1.5.5.7.3.1",
  "code-signing": "1.3.6.1.5.5.7.3.3",
} as const;

/** Bytes read per Electron app looking for its version, over both executables. */
const ELECTRON_MAX_BYTES = 512 * 1024 * 1024;

const BODY = String.raw`
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
# UTF-8, like stdin, so a non-ASCII path is reported as it is.
$SayOut = New-Object IO.StreamWriter([Console]::OpenStandardOutput(), (New-Object Text.UTF8Encoding $false))
$SayOut.AutoFlush = $true
function Say([string]$s) { $SayOut.WriteLine($s) }
function Section([string]$n) { Say ('@@ ' + $n) }
$X509 = 'System.Security.Cryptography.X509Certificates.X509Certificate2'
$sha = [Security.Cryptography.SHA256]::Create()
function Hex([byte[]]$b) { ([BitConverter]::ToString($sha.ComputeHash($b))) -replace '-', '' }
$st = @{ seen = @{}; blobs = 0; total = 0 }
function Store([string]$kind, [string]$extra, [string]$f) {
  try {
    $i = Get-Item -LiteralPath $f -ErrorAction Stop
    if ($i.PSIsContainer) { return }
    $bytes = [IO.File]::ReadAllBytes($i.FullName)
  } catch { return }
  $h = Hex $bytes
  Say ($kind + '|' + $h + '|' + $extra + '|' + $i.FullName)
  if ($st.seen.ContainsKey($h)) { return }
  $st.seen[$h] = 1
  if ($bytes.Length -gt @@MAX_BYTES@@ -or $st.blobs -ge @@MAX_BLOBS@@ -or ($st.total + $bytes.Length) -gt @@MAX_TOTAL@@) { Say ('blob ' + $h + ' TOOBIG'); return }
  $st.blobs++
  $st.total += $bytes.Length
  Say ('blob ' + $h + ' ' + [Convert]::ToBase64String($bytes))
}
function Ver([string]$exe, [string[]]$a) {
  try {
    $psi = New-Object Diagnostics.ProcessStartInfo
    $psi.FileName = $exe
    $psi.Arguments = ($a -join ' ')
    $psi.UseShellExecute = $false
    $psi.RedirectStandardOutput = $true
    $psi.RedirectStandardError = $true
    $psi.CreateNoWindow = $true
    $p = [Diagnostics.Process]::Start($psi)
    $out = $p.StandardOutput.ReadToEndAsync()
    # Drained too, so a chatty stderr can't fill its pipe and stall the run.
    $null = $p.StandardError.ReadToEndAsync()
    if (-not $p.WaitForExit(10000)) { try { $p.Kill() } catch {}; return '' }
    return (($out.Result -split "\r?\n") | Where-Object { $_ -ne '' } | Select-Object -First 1)
  } catch { return '' }
}

Section 'id'
try {
  $admin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
} catch { $admin = $false }
Say ('host=' + [Environment]::MachineName)
Say ('admin=' + $(if ($admin) { '1' } else { '0' }))

Section 'os-release'
try {
  $cv = Get-ItemProperty -LiteralPath 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -ErrorAction Stop
  $name = [string]$cv.ProductName
  if ([int]$cv.CurrentBuild -ge 22000) { $name = $name -replace 'Windows 10', 'Windows 11' }
  Say 'ID=windows'
  Say ('VERSION_ID=' + $cv.CurrentBuild + '.' + $cv.UBR)
  Say ('PRETTY_NAME="' + $name + ' ' + $cv.DisplayVersion + ' (build ' + $cv.CurrentBuild + '.' + $cv.UBR + ')"')
} catch { Say 'ID=windows' }

Section 'tools'
foreach ($t in @('certutil', 'curl')) {
  $c = Get-Command ($t + '.exe') -CommandType Application | Select-Object -First 1
  if ($c) { Say ($t + ' ' + $c.Source) }
}

Section 'windows-policy'
# policy-read=1 only when the key was read or does not exist; any other
# failure (access denied) leaves the settings unknown.
$k = 'HKLM:\SOFTWARE\Policies\Microsoft\SystemCertificates\AuthRoot'
if (-not (Test-Path -LiteralPath $k)) { Say 'policy-read=1' } else {
  try {
    $p = Get-ItemProperty -LiteralPath $k -ErrorAction Stop
    if ($null -ne $p.DisableRootAutoUpdate) { Say ('DisableRootAutoUpdate=' + $p.DisableRootAutoUpdate) }
    if ($null -ne $p.EnableDisallowedCertAutoUpdate) { Say ('EnableDisallowedCertAutoUpdate=' + $p.EnableDisallowedCertAutoUpdate) }
    Say 'policy-read=1'
  } catch {}
}

Section 'windows-disallowed'
foreach ($loc in @('LocalMachine', 'CurrentUser')) {
  try {
    $s = New-Object System.Security.Cryptography.X509Certificates.X509Store('Disallowed', $loc)
    $s.Open('ReadOnly')
    foreach ($c in $s.Certificates) { Say ($loc + '|' + (Hex $c.RawData)) }
    $s.Close()
  } catch {}
}

Section 'verify'
try {
  $cross = New-Object $X509 -ArgumentList (,[Convert]::FromBase64String('@@CROSS_B64@@'))
  foreach ($e in @(@@CERT_LIST@@)) {
    try {
      $cert = New-Object $X509 -ArgumentList (,[Convert]::FromBase64String($e[1]))
      $ch = New-Object System.Security.Cryptography.X509Certificates.X509Chain
      $ch.ChainPolicy.RevocationMode = 'NoCheck'
      $ch.ChainPolicy.UrlRetrievalTimeout = New-TimeSpan -Seconds 15
      [void]$ch.ChainPolicy.ExtraStore.Add($cross)
      [void]$ch.ChainPolicy.ApplicationPolicy.Add((New-Object Security.Cryptography.Oid $e[2]))
      $ok = $ch.Build($cert)
      $status = @($ch.ChainStatus | ForEach-Object { $_.Status.ToString() })
      $bad = @($status | Where-Object { @(@@NO_TRUST@@) -contains $_ })
      $noroot = @($status | Where-Object { @(@@NO_ROOT@@) -contains $_ })
      $other = @($status | Where-Object { @(@@OK_STATUS@@) -notcontains $_ })
      $top = ''
      if ($ch.ChainElements.Count -gt 0) { $top = $ch.ChainElements[$ch.ChainElements.Count - 1].Certificate.GetNameInfo('SimpleName', $false) }
      if ($status -contains 'ExplicitDistrust') { Say ($e[0] + ' rejected distrusted') }
      elseif ($bad.Count -gt 0) { Say ($e[0] + ' rejected ' + ($bad -join ',')) }
      elseif ($noroot.Count -gt 0) { Say ($e[0] + ' error root not available (' + ($noroot -join ',') + '); Windows Update may be unreachable') }
      elseif ($other.Count -gt 0) { Say ($e[0] + ' error unexpected ' + ($other -join ',')) }
      else { Say ($e[0] + ' OK ' + $top) }
      $ch.Reset()
    } catch { Say ($e[0] + ' error ' + ($_.Exception.Message -replace '\s+', ' ')) }
  }
} catch {}

Section 'stores'
$gits = @()
foreach ($r in @($env:ProgramFiles, $env:LOCALAPPDATA + '\Programs')) { if ($r) { $gits += ($r + '\Git') } }
foreach ($g in $gits) {
  foreach ($rel in @('\mingw64\etc\ssl\certs\ca-bundle.crt', '\mingw64\ssl\certs\ca-bundle.crt')) { Store 'bundle' '' ($g + $rel) }
}
$homes = New-Object Collections.Generic.List[string]
if ($env:JAVA_HOME) { $homes.Add($env:JAVA_HOME) }
foreach ($r in @($env:ProgramFiles, [Environment]::GetEnvironmentVariable('ProgramFiles(x86)'), ($env:LOCALAPPDATA + '\Programs'))) {
  if (-not $r -or -not (Test-Path -LiteralPath $r)) { continue }
  foreach ($d in @(Get-ChildItem -LiteralPath $r -Directory)) {
    $homes.Add($d.FullName)
    foreach ($d2 in @(Get-ChildItem -LiteralPath $d.FullName -Directory)) { $homes.Add($d2.FullName) }
  }
}
$jseen = @{}
foreach ($h in $homes) {
  foreach ($sub in @('', '\jre', '\jbr')) {
    $f = $h + $sub + '\lib\security\cacerts'
    if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { continue }
    $full = (Get-Item -LiteralPath $f).FullName
    $b = $h + $sub + '\lib\security\blocked.certs'
    $bh = '-'
    if (Test-Path -LiteralPath $b -PathType Leaf) { $bh = Hex ([IO.File]::ReadAllBytes($b)) }
    # One entry per store and blocklist: JDKs sharing a cacerts but not a
    # blocked.certs are each judged.
    if ($jseen.ContainsKey($full + '|' + $bh)) { continue }
    $jseen[$full + '|' + $bh] = 1
    if ($bh -ne '-') { Store 'java-blocked' '' $b }
    Store 'java' $bh $f
  }
}
$pyRoots = @()
foreach ($r in @(($env:LOCALAPPDATA + '\Programs\Python'), $env:ProgramFiles, [Environment]::GetEnvironmentVariable('ProgramFiles(x86)'))) {
  if ($r -and (Test-Path -LiteralPath $r)) { $pyRoots += @(Get-ChildItem -LiteralPath $r -Directory -Filter 'Python3*' | ForEach-Object { $_.FullName + '\Lib\site-packages' }) }
}
$pyRoots += @(@@SEARCH_PATHS@@)
$found = 0
foreach ($r in $pyRoots) {
  if (-not (Test-Path -LiteralPath $r)) { continue }
  foreach ($f in @(Get-ChildItem -LiteralPath $r -Recurse -Depth 7 -File -Filter 'cacert.pem' | Where-Object { $_.FullName -like '*\certifi\cacert.pem' })) {
    if ($found -ge 50) { break }
    $found++
    if ($f.FullName -like '*\pip\_vendor\certifi\cacert.pem') { Store 'pip' '' $f.FullName; continue }
    $di = Get-ChildItem -LiteralPath $f.Directory.Parent.FullName -Directory -Filter 'certifi-*.dist-info' | Select-Object -First 1
    $v = ''
    if ($di) { $v = $di.Name -replace '^certifi-', '' -replace '\.dist-info$', '' }
    Store 'certifi' $v $f.FullName
  }
}

Section 'notices'
if (@(@@SEARCH_PATHS@@).Count -gt 0) {
  Say 'Cargo.lock, mix.lock and rebar.lock under searchPaths are not checked on Windows targets'
}

Section 'runtimes'
$rseen = @{}
foreach ($r in @('node', 'deno', 'swamp', 'bun', 'go')) {
  foreach ($c in @(Get-Command ($r + '.exe') -All -CommandType Application)) {
    $p = $c.Source
    if (-not $p -or -not [IO.Path]::IsPathRooted($p) -or $rseen.ContainsKey($p)) { continue }
    $rseen[$p] = 1
    $v = ''
    switch ($r) {
      'node' { $v = [string](Get-Item -LiteralPath $p).VersionInfo.ProductVersion; if (-not $v) { $v = Ver $p @('--version') } }
      'go' { $v = ((Ver $p @('version')) -split ' ')[2] -replace '^go', '' }
      'deno' { $v = ((Ver $p @('--version')) -split ' ')[1] }
      'swamp' { $v = ((Ver $p @('--version')) -split ' ')[-1] }
      default { $v = Ver $p @('--version') }
    }
    Say ($r + '|' + $p + '|' + $v)
  }
}

Section 'agents'
$c = Get-Command 'cloudflared.exe' -CommandType Application | Select-Object -First 1
if ($c) {
  $m = [regex]::Match((Ver $c.Source @('--version')), '[0-9]{4}\.[0-9]+\.[0-9]+')
  Say ('cloudflared|' + $c.Source + '|' + $m.Value)
}
foreach ($k in @('HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*', 'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*')) {
  foreach ($u in @(Get-ItemProperty -Path $k | Where-Object { $_.DisplayName -match '^(Cloudflare WARP|Cloudflare One Client)' })) {
    $loc = [string]$u.InstallLocation
    if (-not $loc) { $loc = [string]$u.DisplayName }
    Say ('warp-cli|' + $loc + '|' + $u.DisplayVersion)
  }
}

Section 'electron'
$eroots = @()
foreach ($r in @(($env:LOCALAPPDATA + '\Programs'), $env:LOCALAPPDATA, $env:ProgramFiles, [Environment]::GetEnvironmentVariable('ProgramFiles(x86)'))) {
  if ($r -and (Test-Path -LiteralPath $r)) { $eroots += $r }
}
$apps = New-Object Collections.Generic.List[string]
foreach ($r in $eroots) {
  foreach ($d in @(Get-ChildItem -LiteralPath $r -Directory)) {
    foreach ($a in @($d.FullName) + @(Get-ChildItem -LiteralPath $d.FullName -Directory | ForEach-Object { $_.FullName })) {
      if ((Test-Path -LiteralPath ($a + '\resources\app.asar')) -or (Test-Path -LiteralPath ($a + '\resources\app'))) {
        if (-not $apps.Contains($a)) { $apps.Add($a) }
      }
    }
  }
}
$re = New-Object Text.RegularExpressions.Regex('Electron/([0-9]+\.[0-9]+\.[0-9]+)')
foreach ($a in @($apps | Select-Object -First 30)) {
  $v = ''
  $left = @@ELECTRON_MAX_BYTES@@
  $exes = @(Get-ChildItem -LiteralPath $a -File -Filter '*.exe' | Sort-Object Length -Descending | Select-Object -First 2)
  foreach ($x in $exes) {
    if ($left -le 0) { break }
    try {
      $fs = [IO.File]::OpenRead($x.FullName)
      try {
        $buf = New-Object byte[] 4194304
        $tail = ''
        while ($left -gt 0 -and ($n = $fs.Read($buf, 0, [int][Math]::Min($buf.Length, $left))) -gt 0) {
          $left -= $n
          $text = $tail + [Text.Encoding]::ASCII.GetString($buf, 0, $n)
          $m = $re.Match($text)
          if ($m.Success) { $v = $m.Groups[1].Value; break }
          $tail = $text.Substring([Math]::Max(0, $text.Length - 64))
        }
      } finally { $fs.Close() }
    } catch {}
    if ($v) { break }
  }
  Say ($v + '|' + $a)
}

Section 'processes'
Get-Process | Where-Object { @('java', 'javaw', 'node', 'deno', 'swamp', 'bun', 'python', 'pythonw', 'cloudflared', 'warp-svc') -contains $_.ProcessName } | Group-Object ProcessName | ForEach-Object { Say ($_.Name + '|' + $_.Count) }

Section 'live'
@@LIVE_CHECK@@

Section 'end'
`;

/**
 * Build the Windows probe. `searchPaths` must already be absolute Windows
 * paths; they are passed as PowerShell string literals.
 */
export function buildWindowsProbe(opts: {
  searchPaths: string[];
  liveCheck: boolean;
}): string {
  assertSafeWindowsPaths(opts.searchPaths);
  const b64 = (pem: string) =>
    pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const certList = COMPROMISED_CERTS.map((c) =>
    `@(${psQuote(c.sha256.slice(0, 16))}, ${psQuote(b64(c.pem))}, ${
      psQuote(USAGE_OID[c.usage])
    })`
  ).join(", ");
  const live = opts.liveCheck
    ? Object.entries(TEST_HOSTS).map(([path, host]) =>
      // curl.exe on Windows verifies with Schannel, so this tests the OS store.
      // Schannel reports a refused certificate as exit 35 with a CRYPT_E_ or
      // CERT_E_ code; that counts as curl's 60.
      `$c = Get-Command 'curl.exe' -CommandType Application | Select-Object -First 1; if ($c) { $o = (& $c.Source --noproxy '*' -sS -o NUL -m 15 ${
        psQuote(`https://${host}/`)
      } 2>&1 | Out-String); $x = $LASTEXITCODE; if ($o -match 'CRYPT_E_|CERT_E_|SEC_E_UNTRUSTED_ROOT|SEC_E_CERT') { $x = 60 }; Say ('curl|${path}|' + $x) }`
    ).join("\n")
    : "";
  const fill: Record<string, string> = {
    MAX_BYTES: String(STORE_MAX_BYTES),
    MAX_BLOBS: String(STORE_MAX_BLOBS),
    MAX_TOTAL: String(STORE_MAX_TOTAL),
    CROSS_B64: b64(EMSIGN_TLS_G3_CROSS.pem),
    CERT_LIST: certList,
    NO_TRUST: NO_TRUST.map(psQuote).join(", "),
    NO_ROOT: NO_ROOT.map(psQuote).join(", "),
    OK_STATUS: OK_STATUS.map(psQuote).join(", "),
    ELECTRON_MAX_BYTES: String(ELECTRON_MAX_BYTES),
    SEARCH_PATHS: opts.searchPaths.map(psQuote).join(", "),
    LIVE_CHECK: live,
  };
  for (const k of Object.keys(fill)) {
    if (!BODY.includes(`@@${k}@@`)) throw new Error(`placeholder ${k} missing`);
  }
  // One pass over BODY, so no value is searched for another placeholder,
  // and a function replacer, so a $ in a value is never a pattern.
  return BODY.replace(/@@([A-Z_0-9]+)@@/g, (m, k: string) => fill[k] ?? m);
}
