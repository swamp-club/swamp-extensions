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
 * Mitigation: upgrades the brotli library and distro Node.js through the
 * package manager, optionally upgrades or removes pip-installed Brotli, and
 * restarts the systemd units that still run the old library. Hosts it does
 * not change (containers, macOS, Windows) get the commands to run by hand.
 *
 * @module
 */

import { AFFECTED, type ProbeFacts, UNCERTAIN } from "./analysis.ts";
import { PYTHON_FIXED } from "./advisory.ts";
import { psQuote } from "./probe_windows.ts";
import { shQuote, TRUSTED_SH } from "./probe_sh.ts";
import type { Finding, Mitigation, StaleProcess, Status } from "./schemas.ts";
import {
  DEFAULT_TIMEOUT_MS,
  type Exec,
  type Runner,
  scanTarget,
  UPGRADE_TIMEOUT_MS,
} from "./transport.ts";

export type FileWriter = {
  writeLine: (line: string) => Promise<void>;
  finalize: () => Promise<void>;
};

export type MitigateOptions = {
  dryRun: boolean;
  restartServices: boolean;
  upgradePython: boolean;
  removePythonBrotli: boolean;
};

export type MitigationStep = {
  phase: "upgrade" | "python" | "restart";
  argv: string[];
  privileged: boolean;
  purpose: string;
  /** For restart steps: the unit, run only if it still maps the old library. */
  unit?: string;
  /** Paths whose ownership is checked again on the target right before the step runs. */
  guard?: string[];
};

/**
 * The command a guarded step runs: the probe's ownership check on each path
 * (and what it resolves to), then the step itself. A change since the scan
 * refuses the step (exit 3) instead of running a binary someone else wrote.
 */
export function guardedCommand(step: MitigationStep, command: string): string {
  if (!step.guard || step.guard.length === 0) return command;
  const checks = step.guard.map((p) =>
    `trusted ${shQuote(p)} && trusted "$(readlink -f ${
      shQuote(p)
    })" && { [ ! -d ${shQuote(p)} ] || tree_ok ${shQuote(p)}; }`
  ).join(" && ");
  // From /, so nothing in the caller's working directory is picked up.
  return `${TRUSTED_SH}\ncd / || exit 3\nif ${checks}; then exec ${command}; else echo "refused: ${
    step.guard.join(", ").replace(/["$`\\]/g, "")
  } changed ownership or permissions since the scan" >&2; exit 3; fi`;
}

const PIP_SPECS = [
  `Brotli>=${PYTHON_FIXED.brotli}`,
  `brotlicffi>=${PYTHON_FIXED.brotlicffi}`,
];

/** Packages the upgrade covers: the brotli library, its Python binding, and distro Node.js. */
const LIB_PACKAGE =
  /^(libbrotli\d*|brotli|brotli-libs|python3-brotli|py3-brotli)$/;

function needsWork(f: Finding): boolean {
  return AFFECTED.has(f.verdict) || UNCERTAIN.has(f.verdict);
}

/** Processes mitigate restarts the unit of: servers that decode Brotli. */
export const RESTARTABLE =
  /^(node|nodejs|bun|envoy|pilot-agent|python[0-9.]*|uvicorn|gunicorn|celery|dotnet|node-[\w-]+)$/;

/** Units that must never be restarted from here (the user session, init). */
const SKIP_UNIT =
  /^(user@\d+|init|systemd-[a-z-]+|session-\d+)\.(service|scope)$/;

/** The systemd units of these processes, sorted, skipping session units. */
export function unitsOf(procs: StaleProcess[]): string[] {
  return [
    ...new Set(
      procs.map((p) => p.unit).filter((u): u is string =>
        !!u && /\.service$/.test(u) && !SKIP_UNIT.test(u)
      ),
    ),
  ].sort();
}

/**
 * The interpreter of a site-packages directory: <root>/lib/pythonX.Y/
 * site-packages runs <root>/bin/pythonX.Y. Distro and user-site
 * directories return null; they are upgraded by the package manager or by
 * hand.
 */
export function interpreterFor(siteDir: string): string | null {
  const m = siteDir.match(/^(\/.+)\/lib\/(python3\.\d+)\/site-packages$/);
  if (!m) return null;
  if (m[1] === "/usr" || /\/\.local$/.test(m[1])) return null;
  return `${m[1]}/bin/${m[2]}`;
}

/**
 * Windows: <root>\Lib\site-packages runs <root>\python.exe, or a venv's
 * <root>\Scripts\python.exe. A user site directory (%APPDATA%\Python, the
 * Store's local-packages) has no interpreter of its own: null.
 */
export function windowsInterpreter(
  siteDir: string,
  kind: string,
): string | null {
  const m = siteDir.match(/^(.*)\\Lib\\site-packages$/i);
  if (!m || kind === "user") return null;
  return kind === "venv"
    ? `${m[1]}\\Scripts\\python.exe`
    : `${m[1]}\\python.exe`;
}

/** No group or other write bit in an `ls -l` mode such as drwxr-xr-x. */
function ownerOnlyWrite(mode: string): boolean {
  return mode.length >= 9 && mode[5] !== "w" && mode[8] !== "w";
}

/** Plans the commands for one scanned host, without running them. */
export function planMitigation(
  status: Status,
  facts: ProbeFacts,
  opts: Omit<MitigateOptions, "dryRun">,
): {
  steps: MitigationStep[];
  notes: string[];
  script: Mitigation["script"];
} {
  const steps: MitigationStep[] = [];
  const notes: string[] = [];
  const pending = status.findings.filter(needsWork);
  if (status.inContainer) {
    if (pending.some((f) => f.kind !== "lockfile")) {
      notes.push(
        "Target is a container: rebuild its image on a fixed base and runtime instead of changing it in place.",
      );
    }
    return { steps, notes, script: null };
  }
  if (status.os.id === "windows") {
    const script = windowsScript(pending, facts.pyEnvs, facts.home);
    if (script) {
      notes.push(
        "Windows hosts are scanned only: mitigate does not change them. Run the saved PowerShell script in an elevated session.",
      );
    }
    return {
      steps,
      notes,
      script: script ? { shell: "powershell", text: script } : null,
    };
  }
  if (status.os.id === "macos") {
    const script = macScript(pending, facts);
    if (script) {
      notes.push(
        "macOS hosts are scanned only: mitigate does not change them. Run the saved script as the user that owns Homebrew.",
      );
    }
    return {
      steps,
      notes,
      script: script ? { shell: "sh", text: script } : null,
    };
  }

  // Package upgrade: every installed brotli library or binding package, and
  // distro Node.js whose own build is affected, when anything needs it. A
  // fixed library that is only still mapped needs a restart, not an upgrade.
  const upgradable = pending.filter((f) => f.verdict !== "restart-required");
  const distroNode = upgradable.filter((f) =>
    f.kind === "node" && f.source === "distro" && f.packageName &&
    !f.linksSystemBrotli
  ).map((f) => f.packageName!);
  const libNeeded = upgradable.some((f) =>
    (f.kind === "libbrotli" ||
      (f.kind === "python" && f.source === "distro")) ||
    ((f.kind === "node" || f.kind === "curl" || f.kind === "dotnet") &&
      f.linksSystemBrotli === true)
  );
  const manager = facts.packages.find((p) => p.manager !== "brew")?.manager;
  const names = [
    ...new Set([
      ...(libNeeded
        ? facts.packages.filter((p) =>
          p.manager === manager && LIB_PACKAGE.test(p.name)
        ).map((p) => p.name)
        : []),
      ...distroNode,
    ]),
  ].sort();
  if (names.length > 0) {
    if (manager === "dpkg" && facts.tools["apt-get"]) {
      steps.push({
        phase: "upgrade",
        argv: ["apt-get", "update"],
        privileged: true,
        purpose: "Refresh package lists",
      });
      steps.push({
        phase: "upgrade",
        argv: [
          "apt-get",
          "install",
          "--only-upgrade",
          "-y",
          "-o",
          "Dpkg::Options::=--force-confdef",
          "-o",
          "Dpkg::Options::=--force-confold",
          ...names,
        ],
        privileged: true,
        purpose: "Upgrade the brotli packages, keeping local config files",
      });
    } else if (
      manager === "rpm" && (facts.tools["dnf"] || facts.tools["yum"])
    ) {
      steps.push({
        phase: "upgrade",
        argv: [facts.tools["dnf"] ? "dnf" : "yum", "upgrade", "-y", ...names],
        privileged: true,
        purpose: "Upgrade the brotli packages",
      });
    } else if (manager === "apk" && facts.tools["apk"]) {
      steps.push({
        phase: "upgrade",
        argv: ["apk", "update"],
        privileged: true,
        purpose: "Refresh package indexes",
      });
      steps.push({
        phase: "upgrade",
        argv: ["apk", "add", "--upgrade", ...names],
        privileged: true,
        purpose: "Upgrade the brotli packages",
      });
    } else {
      notes.push(
        `No supported package manager found to upgrade ${
          names.join(", ")
        }; upgrade them by hand.`,
      );
    }
  }

  // pip-installed Brotli and brotlicffi.
  const pip = pending.filter((f) =>
    f.kind === "python" && f.source === "pip" && f.verdict !== "check-vendor"
  );
  const envs = [...new Set(pip.map((f) => f.path))].sort();
  for (const dir of envs) {
    const py = interpreterFor(dir);
    if (!py) {
      notes.push(
        `${dir}: upgrade by hand with that environment's pip (pip install --user -U for a user site): ${
          PIP_SPECS.join(" ")
        }`,
      );
      continue;
    }
    // Never run another user's interpreter, or pip into their environment:
    // as root that would run their code as root and leave root-owned files.
    const env = facts.pyEnvs.find((e) => e.dir === dir);
    if (
      (opts.upgradePython || opts.removePythonBrotli) &&
      (!env || env.owner === null || env.owner !== facts.uid ||
        !ownerOnlyWrite(env.mode) || !env.trusted)
    ) {
      notes.push(
        `${dir}: not changed, because it ${
          env?.owner !== undefined && env.owner !== null &&
            env.owner !== facts.uid
            ? `belongs to uid ${env.owner}`
            : "or its interpreter could not be confirmed as written only by root or this user"
        }; as its owner run ${py} -I -m pip install --upgrade ${
          PIP_SPECS.map(shQuote).join(" ")
        }`,
      );
      continue;
    }
    if (opts.upgradePython) {
      steps.push({
        phase: "python",
        // -I: no working directory, user site or PYTHON* variables on sys.path.
        argv: [py, "-I", "-m", "pip", "install", "--upgrade", ...PIP_SPECS],
        privileged: false,
        purpose:
          `Upgrade Brotli and brotlicffi in ${dir} (ownership checked again first)`,
        guard: [dir.replace(/\/site-packages$/, ""), py],
      });
    } else if (opts.removePythonBrotli) {
      steps.push({
        phase: "python",
        argv: [
          py,
          "-I",
          "-m",
          "pip",
          "uninstall",
          "-y",
          "Brotli",
          "brotlicffi",
        ],
        privileged: false,
        purpose:
          `Remove Brotli and brotlicffi from ${dir} (clients fall back to gzip and deflate; ownership checked again first)`,
        guard: [dir.replace(/\/site-packages$/, ""), py],
      });
    } else {
      notes.push(
        `${dir}: ${py} -I -m pip install --upgrade ${
          PIP_SPECS.map(shQuote).join(" ")
        } (or re-run with upgradePython=true), then update the lockfile.`,
      );
    }
  }

  for (
    const f of pending.filter((f) =>
      f.kind === "node" && f.source === "upstream" && !f.linksSystemBrotli
    )
  ) {
    notes.push(
      `${f.path}: upstream Node.js ${f.version}; install ${
        f.fixedVersion ?? "22.23.4, 24.22.1 or 26.12.1"
      } with the tool that installed it (nvm, fnm, volta, asdf, or the official tarball).`,
    );
  }
  for (const f of pending.filter((f) => f.kind === "bun")) {
    notes.push(`${f.path}: run bun upgrade (fixed in 1.4.4).`);
  }
  for (
    const f of pending.filter((f) => f.kind === "envoy" || f.kind === "istio")
  ) {
    notes.push(
      `${f.path}: upgrade ${
        f.kind === "envoy" ? "Envoy" : "Istio"
      } ${f.version} to ${
        f.fixedVersion ?? "a fixed release"
      } and roll the proxies.`,
    );
  }
  if (pending.some((f) => f.verdict === "no-fix-released")) {
    notes.push(
      "No fixed .NET runtime has been released; apply the proxy stopgaps until one ships.",
    );
  }

  // Restart the units that run the old library: those already stale, and,
  // after an upgrade, those that have it loaded now. Only services whose
  // process is a Brotli-decoding server; anything else that links libbrotli
  // (NetworkManager, a display manager, dbus) is left to restart by hand.
  if (opts.restartServices) {
    const willUpgrade = steps.some((s) => s.phase === "upgrade");
    const candidates = [
      ...facts.maps,
      ...(willUpgrade ? facts.loaded : []),
    ];
    const units = unitsOf(
      candidates.filter((p) => RESTARTABLE.test(p.process)),
    );
    const others = unitsOf(
      candidates.filter((p) => !RESTARTABLE.test(p.process)),
    ).filter((u) => !units.includes(u));
    if (others.length > 0) {
      notes.push(
        `Not restarted automatically (not a Brotli-decoding server), restart when convenient: ${
          others.join(", ")
        }.`,
      );
    }
    if (units.length > 0 && facts.tools["systemctl"]) {
      for (const unit of units) {
        steps.push({
          phase: "restart",
          argv: ["systemctl", "restart", "--", unit],
          privileged: true,
          purpose: `Restart ${unit} so it loads the fixed Brotli`,
          unit,
        });
      }
    }
    const bare = [...facts.maps, ...(willUpgrade ? facts.loaded : [])]
      .filter((p) => !p.unit);
    if (bare.length > 0) {
      notes.push(
        `Not a system service, restart by hand: ${
          [...new Set(bare.map((p) => `${p.process} (pid ${p.pid})`))].join(
            ", ",
          )
        }.`,
      );
    }
  } else if (
    facts.maps.length > 0 || steps.some((s) => s.phase === "upgrade")
  ) {
    notes.push(
      "restartServices=false: restart the services that use Brotli yourself after the upgrade.",
    );
  }
  return { steps, notes, script: null };
}

/** The commands for macOS, for the Homebrew user to run. */
export function macScript(
  pending: Finding[],
  facts?: Pick<ProbeFacts, "pyEnvs" | "uid" | "home" | "notRun">,
): string | null {
  const lines: string[] = [];
  const brew = new Set<string>();
  for (const f of pending) {
    if (f.kind === "libbrotli" && f.source === "brew") brew.add("brotli");
    // Homebrew's bun is upgraded by brew, not by bun upgrade.
    if (f.kind === "bun" && f.path.includes("/Cellar/")) brew.add("bun");
    if (f.kind === "node" && f.source === "brew" && f.packageName) {
      if (f.linksSystemBrotli !== false) brew.add("brotli");
      else brew.add(f.packageName);
    }
  }
  if (brew.size > 0) lines.push(`brew upgrade ${[...brew].sort().join(" ")}`);
  for (const f of pending) {
    if (
      f.kind === "node" && f.source === "upstream" && !f.linksSystemBrotli
    ) {
      lines.push(
        `# ${f.path}: Node.js ${f.version}; install ${
          f.fixedVersion ?? "22.23.4, 24.22.1 or 26.12.1"
        } with the tool that installed it`,
      );
    } else if (f.kind === "bun" && !f.path.includes("/Cellar/")) {
      lines.push(
        foreignPath(f.path, facts?.home ?? "") ||
          (facts?.notRun ?? []).includes(f.path)
          ? `# ${f.path}: belongs to another user; as that user run bun upgrade`
          : `${shQuote(f.path)} upgrade`,
      );
    } else if (f.kind === "python" && f.source === "pip") {
      const py = interpreterFor(f.path);
      const env = facts?.pyEnvs.find((e) => e.dir === f.path);
      const foreign = env?.owner != null && facts?.uid != null &&
        env.owner !== facts.uid;
      lines.push(
        py && !foreign
          ? `${shQuote(py)} -I -m pip install --upgrade ${
            PIP_SPECS.map(shQuote).join(" ")
          }`
          : `# ${f.path}${
            foreign ? ` belongs to uid ${env!.owner}; as that user run` : ":"
          } pip install --upgrade ${PIP_SPECS.join(" ")}`,
      );
    } else if (f.kind === "electron") {
      lines.push(
        `# Update ${f.name} (Electron) to a release built after 2026-10-21`,
      );
    }
  }
  if (lines.length === 0) return null;
  return [
    "#!/bin/sh",
    "# CVE-2026-111497 (Brotli decoder RCE): fixes for this Mac, from @swamp/cve/http2shell.",
    "set -e",
    ...[...new Set(lines)],
    "# Then restart the apps and services that use Node.js, Python or curl.",
    "",
  ].join("\n");
}

/** The commands for Windows, for an elevated PowerShell session. */
export function windowsScript(
  pending: Finding[],
  pyEnvs: ProbeFacts["pyEnvs"] = [],
  home = "",
): string | null {
  const lines: string[] = [];
  for (const f of pending) {
    const p = f.path.toLowerCase();
    if (f.kind === "node") {
      const v = f.fixedVersion ?? "24.22.1";
      if (p.includes("\\scoop\\")) lines.push("scoop update nodejs nodejs-lts");
      else if (p.includes("\\chocolatey\\")) {
        lines.push("choco upgrade nodejs -y");
      } else if (p.includes("\\nvm\\") || p.includes("nvm_home")) {
        lines.push(`nvm install ${v}`, `nvm use ${v}`);
      } else if (p.includes("\\volta\\")) lines.push(`volta install node@${v}`);
      else if (p.includes("\\fnm\\")) lines.push(`fnm install ${v}`);
      else {
        lines.push(
          `winget upgrade --id OpenJS.NodeJS.LTS --exact --accept-source-agreements --accept-package-agreements`,
        );
      }
    } else if (f.kind === "bun") {
      lines.push(
        foreignPath(f.path, home)
          ? `# ${f.path}: belongs to another user; as that user run bun upgrade`
          : `& ${psQuote(f.path)} upgrade`,
      );
    } else if (f.kind === "python" && f.source === "pip") {
      const kind = pyEnvs.find((e) => e.dir === f.path)?.kind ?? "";
      const py = foreignPath(f.path, home)
        ? null
        : windowsInterpreter(f.path, kind);
      lines.push(
        py
          ? `& ${psQuote(py)} -I -m pip install --upgrade ${
            PIP_SPECS.map(psQuote).join(" ")
          }`
          : `# ${f.path} belongs to another user or is a user site: as that user run py -m pip install --upgrade ${
            PIP_SPECS.join(" ")
          }`,
      );
    } else if (f.kind === "dotnet") {
      lines.push(
        `# ${f.path}: .NET ${f.version} bundles Brotli 1.1.0 and has no fix yet; install the fixed runtime when Microsoft releases it.`,
      );
    } else if (f.kind === "curl" && f.source === "upstream") {
      lines.push(`# ${f.path}: update Git for Windows to get a fixed curl`);
    } else if (f.kind === "electron") {
      lines.push(
        `# Update ${f.name} (Electron) to a release built after 2026-10-21`,
      );
    }
  }
  if (lines.length === 0) return null;
  return [
    "# CVE-2026-111497 (Brotli decoder RCE): fixes for this Windows host, from @swamp/cve/http2shell.",
    "# Run in an elevated PowerShell session.",
    ...[...new Set(lines)],
    "# Then restart the apps and services that use Node.js or Python.",
    "",
  ].join("\r\n");
}

// --- Privilege -------------------------------------------------------------

/** The command line a step runs, as root or through non-interactive sudo. */
export function renderStep(
  step: MitigationStep,
  tools: Record<string, string>,
  asRoot: boolean,
): string {
  const argv = [...step.argv];
  if (step.privileged) argv[0] = tools[argv[0]] ?? argv[0];
  const line = argv.map(shQuote).join(" ");
  if (!step.privileged || asRoot) return line;
  // The same sudo the preflight checked, not whatever PATH finds later.
  return `${shQuote(tools["sudo"] ?? "sudo")} -n -- ${line}`;
}

/**
 * What a step's guard checks before it runs: its own paths, and for a
 * privileged step the package manager or systemctl it runs and sudo, so a
 * binary someone else could have replaced is never run as root.
 */
export function stepGuard(
  step: MitigationStep,
  tools: Record<string, string>,
  asRoot: boolean,
): string[] {
  const paths = [...(step.guard ?? [])];
  if (step.privileged) {
    paths.push(tools[step.argv[0]] ?? step.argv[0]);
    if (!asRoot && tools["sudo"]) paths.push(tools["sudo"]);
  }
  return paths.filter((p) => p.startsWith("/"));
}

/** The argv a privileged step runs, with the binary resolved on the host. */
function stepArgv(step: MitigationStep, tools: Record<string, string>) {
  return [tools[step.argv[0]] ?? step.argv[0], ...step.argv.slice(1)];
}

/**
 * Builds the sudo preflight: one "sudo -n -l <command>" per privileged step,
 * so sudoers rules scoped to these exact commands pass, then the long
 * listing. "sudo -n -l" alone also passes a rule that asks for a password
 * whenever the user has any NOPASSWD rule, so the listing decides that.
 */
export function preflightScript(
  steps: MitigationStep[],
  tools: Record<string, string>,
): string {
  const sudo = shQuote(tools["sudo"] ?? "sudo");
  return [
    "export LC_ALL=C",
    ...steps.map((s, i) =>
      `if ${sudo} -n -l ${
        stepArgv(s, tools).map(shQuote).join(" ")
      } >/dev/null 2>&1; then echo "OK|${i}"; else echo "NO|${i}"; fi`
    ),
    "echo '@@ sudo-ll'",
    `${sudo} -n -ll 2>/dev/null`,
  ].join("\n");
}

/** One entry of `sudo -ll`: who it runs as, its options and commands. */
type SudoEntry = { runAs: string[]; options: string[]; commands: string[] };

/** Parses `sudo -ll` output into its Defaults options and its entries. */
export function parseSudoList(
  lines: string[],
): { defaults: string[]; entries: SudoEntry[] } {
  const defaults: string[] = [];
  const entries: SudoEntry[] = [];
  let section: "defaults" | "other" | "entry" = "other";
  let inCommands = false;
  let cur: SudoEntry | undefined;
  for (const line of lines) {
    if (/^Matching Defaults entries/.test(line)) {
      section = "defaults";
      continue;
    }
    if (/^Sudoers entry:/.test(line)) {
      cur = { runAs: [], options: [], commands: [] };
      entries.push(cur);
      section = "entry";
      inCommands = false;
      continue;
    }
    if (/^\S/.test(line)) {
      section = "other";
      inCommands = false;
      continue;
    }
    const t = line.trim();
    if (!t) continue;
    if (section === "defaults") {
      defaults.push(...t.split(/,\s*/));
    } else if (section === "entry" && cur) {
      const m = t.match(/^(RunAsUsers|Options|Commands):\s*(.*)$/);
      if (m) {
        inCommands = m[1] === "Commands";
        const vals = m[2] ? m[2].split(/,\s*/) : [];
        if (m[1] === "RunAsUsers") cur.runAs.push(...vals);
        if (m[1] === "Options") cur.options.push(...vals);
        if (inCommands) cur.commands.push(...vals);
      } else if (inCommands) {
        cur.commands.push(t);
      } else if (/^[A-Za-z]+:/.test(t)) {
        inCommands = false;
      }
    }
  }
  return { defaults, entries };
}

/** A sudoers glob as a regex; `/` stops a wildcard only in a path. */
function sudoGlob(glob: string, inPath: boolean): RegExp {
  const any = inPath ? "[^/]*" : ".*";
  const one = inPath ? "[^/]" : ".";
  return new RegExp(
    "^" + glob.replace(/[.+^${}()|\\]/g, "\\$&").replace(/\*/g, any)
      .replace(/\?/g, one) +
      "$",
  );
}

/**
 * Whether a sudoers command item matches this command line, the way sudoers
 * does: no arguments in the item allows any, `""` allows none, `^...$` is a
 * regex, and anything else is a glob over the whole argument string.
 */
function sudoItemMatches(item: string, argv: string[]): boolean {
  const text = item.replace(/^!/, "");
  const space = text.search(/\s/);
  const cmd = space === -1 ? text : text.slice(0, space);
  if (cmd === "ALL") return true;
  const [binary, ...rest] = argv;
  if (cmd.endsWith("/")) {
    // A directory item allows only the files directly in it.
    if (
      !binary.startsWith(cmd) || binary.slice(cmd.length).includes("/")
    ) return false;
  } else if (!sudoGlob(cmd, true).test(binary)) return false;
  if (space === -1) return true;
  // sudo -ll prints the item's own escapes (\\: \\, \\= \\\\); undo them.
  const want = text.slice(space).trim().replace(/\\(.)/g, "$1");
  const args = rest.join(" ");
  if (want === '""') return args === "";
  if (want.startsWith("^") && want.endsWith("$")) {
    try {
      return new RegExp(want).test(args);
    } catch {
      return false;
    }
  }
  return sudoGlob(want, false).test(args);
}

/**
 * Whether sudo would run this command as root without asking for a password.
 * sudoers uses the last entry whose command, arguments included, matches, so
 * that entry's options decide. An empty listing refuses.
 */
export function runsWithoutPassword(
  argv: string[],
  list: { defaults: string[]; entries: SudoEntry[] },
): boolean {
  const asRoot = list.entries.filter((e) =>
    e.runAs.length === 0 || e.runAs.includes("ALL") || e.runAs.includes("root")
  );
  const last = asRoot.filter((e) =>
    e.commands.some((c) => sudoItemMatches(c, argv))
  ).at(-1);
  if (!last) return false;
  // A negated item (!cmd) that matches denies the command.
  if (
    last.commands.some((c) => c.startsWith("!") && sudoItemMatches(c, argv))
  ) {
    return false;
  }
  if (last.options.includes("!authenticate")) return true;
  if (last.options.includes("authenticate")) return false;
  return list.defaults.includes("!authenticate");
}

/**
 * Indexes of the steps the preflight allowed: "sudo -n -l" said OK and the
 * rule that allows it needs no password. A missing line counts as a refusal.
 */
export function allowedSteps(
  steps: MitigationStep[],
  tools: Record<string, string>,
  output: string,
): Set<number> {
  const lines = output.split("\n");
  const at = lines.indexOf("@@ sudo-ll");
  const list = parseSudoList(at === -1 ? [] : lines.slice(at + 1));
  const allowed = new Set<number>();
  for (const line of at === -1 ? lines : lines.slice(0, at)) {
    const i = Number(line.match(/^OK\|(\d+)$/)?.[1] ?? NaN);
    if (steps[i] && runsWithoutPassword(stepArgv(steps[i], tools), list)) {
      allowed.add(i);
    }
  }
  return allowed;
}

// --- Running ---------------------------------------------------------------

export type HostMitigation = { status: Status; mitigation: Mitigation };

/** apt-get update and apk update only refresh the package indexes. */
function isRefresh(step: MitigationStep): boolean {
  return step.argv[1] === "update" &&
    (step.argv[0] === "apt-get" || step.argv[0] === "apk");
}

/** A path in another user's profile or home, which an elevated script must not run. */
export function foreignPath(path: string, home: string): boolean {
  const p = path.replace(/\\/g, "/").toLowerCase();
  const h = home.replace(/\\/g, "/").toLowerCase().replace(/\/+$/, "");
  const inHomes = /^[a-z]:\/users\//.test(p) || /^\/(home|users)\//.test(p);
  return inHomes && !(h !== "" && p.startsWith(`${h}/`));
}

export async function writeScanLog(log: FileWriter, status: Status) {
  await log.writeLine(
    `Host: ${status.hostname} (${status.os.prettyName || "unknown OS"})\n`,
  );
  await log.writeLine(
    `\n=== Brotli decoders (${status.findings.length}) ===\n`,
  );
  for (const f of status.findings) {
    await log.writeLine(
      `[${f.kind}] ${f.path} ${f.name} ${
        f.version ?? "?"
      } → ${f.verdict}, ${f.action}${f.note ? `: ${f.note}` : ""}\n`,
    );
  }
  for (const n of status.notChecked) await log.writeLine(`Not checked: ${n}\n`);
  await log.writeLine(`\n=== Result: ${status.riskLevel.toUpperCase()} ===\n`);
  await log.writeLine(`${status.summary}\n`);
}

export async function mitigateTarget(
  run: Runner,
  exec: Exec | null,
  target: string,
  opts: MitigateOptions & { inContainer: boolean; searchPaths: string[] },
  log: FileWriter,
): Promise<HostMitigation> {
  const scanOpts = {
    inContainer: opts.inContainer,
    searchPaths: opts.searchPaths,
  };
  await log.writeLine(`Scanning ${target}...\n`);
  const first = await scanTarget(run, exec, target, scanOpts);
  await writeScanLog(log, first.status);

  const { steps, notes, script } = planMitigation(
    first.status,
    first.facts,
    opts,
  );
  const asRoot = first.status.runAsRoot;
  const base: Mitigation = {
    dryRun: opts.dryRun,
    restartServices: opts.restartServices,
    upgradePython: opts.upgradePython,
    removePythonBrotli: opts.removePythonBrotli,
    privilege: "not-needed",
    missingPrivileges: [],
    outcome: "not-needed",
    steps: [],
    script,
    notes,
  };

  if (steps.length === 0) {
    const nothingToDo = first.status.findings.every((f) =>
      !AFFECTED.has(f.verdict) && !UNCERTAIN.has(f.verdict)
    );
    base.outcome = nothingToDo ? "not-needed" : "no-automatic-fix";
    await log.writeLine(
      `\nNo commands to run on ${target} (${base.outcome}).\n`,
    );
    return { status: { ...first.status, mitigation: base }, mitigation: base };
  }

  const tools = first.facts.tools;
  const record = steps.map((s) => ({
    phase: s.phase,
    command: renderStep(s, tools, asRoot),
    privileged: s.privileged,
    purpose: s.purpose +
      (s.phase === "restart" ? " (only if it still runs the old library)" : ""),
    status: "planned" as "planned" | "ok" | "failed" | "skipped",
    exitCode: null as number | null,
    output: "",
  }));

  const privileged = steps.map((s, i) => ({ s, i })).filter((x) =>
    x.s.privileged
  );
  base.privilege = privileged.length === 0
    ? "not-needed"
    : asRoot
    ? "root"
    : tools["sudo"]
    ? "sudo"
    : "unavailable";
  if (!asRoot && privileged.length > 0) {
    if (!tools["sudo"]) {
      base.missingPrivileges = privileged.map((x) => record[x.i].command);
    } else {
      const pf = await run(preflightScript(privileged.map((x) => x.s), tools));
      const ok = allowedSteps(privileged.map((x) => x.s), tools, pf.stdout);
      privileged.forEach((x, j) => {
        if (!ok.has(j)) base.missingPrivileges.push(record[x.i].command);
      });
    }
    if (base.missingPrivileges.length > 0) {
      base.privilege = "unavailable";
      base.outcome = "needs-privilege";
      base.steps = record;
      base.notes.push(
        "Not run: this user cannot run these commands with non-interactive sudo. Run them as root, or allow them in sudoers (see README).",
      );
      await log.writeLine(`\nNeeds privilege — not attempted:\n`);
      for (const c of base.missingPrivileges) await log.writeLine(`  ${c}\n`);
      const status: Status = {
        ...first.status,
        action: "needs-privilege",
        actions: ["needs-privilege", ...first.status.actions],
        mitigation: base,
      };
      return { status, mitigation: base };
    }
  }

  if (opts.dryRun) {
    for (const r of record) {
      await log.writeLine(`[DRY RUN] Would execute: ${r.command}\n`);
    }
    base.steps = record;
    base.outcome = "dry-run";
    return { status: { ...first.status, mitigation: base }, mitigation: base };
  }

  base.steps = record;
  let failed = false;
  const rescan = async (why: string) => {
    try {
      return await scanTarget(run, exec, target, scanOpts);
    } catch (err) {
      failed = true;
      base.notes.push(
        `Rescan ${why} failed: ${err instanceof Error ? err.message : err}`,
      );
      return null;
    }
  };
  let beforeRestart: Awaited<ReturnType<typeof rescan>> = null;
  let rescanned = false;
  let upgradeFailed = false;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const rec = record[i];
    if (step.phase === "restart") {
      if (!rescanned) {
        beforeRestart = await rescan("before restarting services");
        rescanned = true;
      }
      // A failed rescan cannot rule anything out, so restart anyway.
      const stale = beforeRestart
        ? unitsOf(beforeRestart.facts.maps)
        : [step.unit!];
      if (!stale.includes(step.unit!)) {
        rec.status = "skipped";
        rec.output = `${step.unit} does not run the old library.`;
        continue;
      }
    }
    // A failed index refresh (apt exits 100 when one source fails) does not
    // stop the install; any other failed upgrade step does.
    if (step.phase === "upgrade" && upgradeFailed && !isRefresh(step)) {
      rec.status = "skipped";
      rec.output = "An earlier upgrade step failed.";
      continue;
    }
    await log.writeLine(`Executing: ${rec.command}\n`);
    const r = await run(
      guardedCommand(
        { ...step, guard: stepGuard(step, tools, asRoot) },
        rec.command,
      ),
      step.phase === "restart" ? DEFAULT_TIMEOUT_MS : UPGRADE_TIMEOUT_MS,
    );
    rec.exitCode = r.exitCode;
    rec.output = (r.stdout + (r.stderr ? `\n${r.stderr}` : "")).slice(-2000);
    rec.status = r.exitCode === 0 ? "ok" : "failed";
    await log.writeLine(`  exit=${r.exitCode}\n`);
    if (r.exitCode !== 0) {
      failed = true;
      if (step.phase === "upgrade" && !isRefresh(step)) upgradeFailed = true;
    }
  }

  const final = await rescan("after mitigation");
  base.outcome = failed ? "partial" : "applied";
  if (!final) {
    // Keep the record of what ran; the last good scan stands in.
    return {
      status: { ...(beforeRestart ?? first).status, mitigation: base },
      mitigation: base,
    };
  }
  await log.writeLine(`\nRescan after mitigation:\n`);
  await writeScanLog(log, final.status);
  // Old code still running is reported below, by process.
  const remaining = final.status.findings.filter((f) =>
    f.kind !== "lockfile" && AFFECTED.has(f.verdict) &&
    f.verdict !== "restart-required"
  );
  if (remaining.length > 0) {
    base.notes.push(
      `Still affected after this run: ${
        remaining.map((f) => `${f.path} (${f.verdict})`).join(", ")
      }.`,
    );
  }
  const stillStale = unitsOf(final.facts.maps);
  const bare = [
    ...new Set(
      final.facts.maps.filter((p) => !p.unit).map((p) =>
        `${p.process} (pid ${p.pid})`
      ),
    ),
  ];
  if (stillStale.length > 0 || bare.length > 0) {
    base.notes.push(
      `Still running the old Brotli code: ${
        [...stillStale, ...bare].join(", ")
      }; restart ${stillStale.length + bare.length === 1 ? "it" : "them"}.`,
    );
  }
  return { status: { ...final.status, mitigation: base }, mitigation: base };
}
