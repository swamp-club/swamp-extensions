/**
 * Rule-based call labels (swamp-club#4157): whether a tool call used swamp,
 * went around it (a bypass), or neither, with a category and the rule that
 * decided it. No model is asked. The rules and their order are the agent
 * observation prototype's, so the labels match what it found on the same
 * sessions. Labels are decided from the call's raw input, before
 * redaction drops heredoc bodies the write rules look into.
 *
 * @module
 */

import { AGENT_SESSION_LIMITS } from "../contract/session_record.ts";
import { redact } from "../redact.ts";
import type { Coverage } from "./coverage.ts";
import { program, segments, words } from "./shell.ts";

/** A labelled call's label, category and deciding rule. */
export interface CallLabel {
  readonly label: "swamp" | "bypass" | "neutral";
  readonly category: string;
  readonly rule: string;
}

/** What the labeller knows about the session a call ran in. */
export interface LabelContext {
  /** The session's repo root; paths under it are swamp's paths. */
  readonly root: string;
  readonly coverage: Coverage;
}

/** Categories the findings group by. */
export const HAND_EDITED = "hand-edited definition";
export const READ_EXTENSION_SOURCE = "read extension source";
export const COVERED_BY = " — covered by ";

// Programs that only read, or only shape another program's output.
const READ_ONLY = new Set([
  "while",
  "case",
  "esac",
  "in",
  "else",
  "elif",
  "set",
  "export",
  "local",
  "return",
  "break",
  "continue",
  "read",
  "mkdir",
  "tee",
  "xargs",
  "awk",
  "realpath",
  "column",
  "less",
  "tree",
  "du",
  "date",
  "cat",
  "ls",
  "grep",
  "rg",
  "sed",
  "head",
  "tail",
  "wc",
  "find",
  "jq",
  "echo",
  "which",
  "diff",
  "printf",
  "sort",
  "uniq",
  "cut",
  "tr",
  "true",
  "test",
  "stat",
  "file",
  "basename",
  "dirname",
  "pwd",
  "for",
  "do",
  "done",
  "if",
  "then",
  "fi",
  "sleep",
  "seq",
]);

const GIT_READ_ONLY = new Set([
  "remote",
  "ls-files",
  "blame",
  "describe",
  "status",
  "log",
  "diff",
  "show",
  "rev-parse",
  "branch",
]);

/** Repo paths swamp manages, relative to the repo root. */
const MANAGED = ["models/", "workflows/", "vaults/", "grants/", ".swamp.yaml"];

// A shell write: a redirect into a definition, cat >, sed -i, tee, or a
// Python script writing a file.
const SHELL_WRITE =
  /(cat\s*>|sed\s+-i|\btee\s+(-a\s+)?\S|open\(p,\s*['"]w|\.write\(|>\s*\S*(models|workflows|vaults|grants)\/)/;
// A managed folder at the start of a path, or below another folder, but not
// an extension's own models/ or workflows/ source.
const MENTIONS_MANAGED =
  /(^|[\s"'=]|(?<!\bextensions)\/)((models|workflows|vaults|grants)\/|\.swamp\.yaml\b)/;
const PYTHON_HEREDOC = /python3?\s+-\s*<</;
const PYTHON_FILE_IO = /open\(p\)|\.write|write_text/;
const SWAMP_STATE = /\.swamp\/(data|outputs|logs)\b/;
const PULLED_EXTENSIONS = ".swamp/pulled-extensions";

function cap(text: string): string {
  return text.slice(0, AGENT_SESSION_LIMITS.labelTextLength);
}

function result(
  label: CallLabel["label"],
  category: string,
  rule: string,
): CallLabel {
  return { label, category: cap(category), rule: cap(rule) };
}

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function slashed(path: string): string {
  return path.replaceAll("\\", "/");
}

/** A path relative to the repo root, `/`-separated; as given when outside it. */
function relative(path: string, root: string): string {
  const p = slashed(path);
  const r = slashed(root).replace(/\/+$/, "");
  return r.length > 0 && p.startsWith(`${r}/`) ? p.slice(r.length + 1) : p;
}

/** A program by its file name, so `/usr/bin/git` is `git`. */
function baseName(prog: string): string {
  const p = slashed(prog);
  return p.slice(p.lastIndexOf("/") + 1).replace(/\.exe$/i, "");
}

// A program name safe to store: category and rule are written as they are,
// never through redaction, so anything that is not a plain name is not kept.
const PROGRAM_NAME = /^[A-Za-z0-9][\w.+-]{0,63}$/;

function shownName(prog: string): string {
  return PROGRAM_NAME.test(prog) && redact(prog, { cwd: "" }) === prog
    ? prog
    : "an unnamed program";
}

/** A git segment's subcommand, past global options (-C and -c take a value). */
function gitSubcommand(segment: string): string {
  const ws = words(segment).slice(1);
  while (ws.length > 0 && ws[0].startsWith("-")) {
    ws.splice(0, ws[0] === "-C" || ws[0] === "-c" ? 2 : 1);
  }
  return ws[0] ?? "";
}

function labelShell(command: string, ctx: LabelContext): CallLabel {
  const segs = segments(command);
  const progs = segs.map((s) => baseName(program(s)));
  const writes = SHELL_WRITE.test(command);
  const managed = MENTIONS_MANAGED.test(command);
  const swampAt = progs.indexOf("swamp");
  if (writes && managed) {
    return result(
      "bypass",
      HAND_EDITED,
      `shell write to a swamp-managed path${
        swampAt >= 0 ? " then ran swamp" : ""
      }`,
    );
  }
  if (swampAt >= 0) {
    // Only plain subcommand words: a flag's value can be a path or a secret.
    const sub = words(segs[swampAt]).slice(1)
      .filter((w) => /^[a-z][a-z0-9-]*$/.test(w)).slice(0, 2);
    return result(
      "swamp",
      `swamp ${sub.join(" ")}`.trim().slice(0, 40),
      "program = swamp",
    );
  }
  if (
    (writes ||
      (PYTHON_HEREDOC.test(command) && PYTHON_FILE_IO.test(command))) &&
    !managed
  ) {
    return result(
      "neutral",
      "user code (shell write)",
      "shell write outside swamp-managed paths",
    );
  }
  const state = SWAMP_STATE.exec(command)?.[1];
  if (state) {
    return result(
      "bypass",
      "read swamp state directly",
      `path under .swamp/${state}; swamp data and output commands cover it`,
    );
  }
  for (let i = 0; i < progs.length; i++) {
    const ext = ctx.coverage.programs.get(progs[i]);
    if (ext === undefined) continue;
    if (progs[i] === "git" && GIT_READ_ONLY.has(gitSubcommand(segs[i]))) {
      continue;
    }
    const name = shownName(progs[i]);
    return result(
      "bypass",
      `${name}${COVERED_BY}${ext}`,
      `program = ${name}; ${ext} is installed in this repo`,
    );
  }
  const other = progs.filter((p) =>
    !READ_ONLY.has(p) && p !== "cd" && p !== "git"
  );
  if (command.includes(PULLED_EXTENSIONS) && other.length === 0) {
    return result(
      "neutral",
      READ_EXTENSION_SOURCE,
      "read-only; .swamp/pulled-extensions (docs gap signal)",
    );
  }
  if (other.length > 0) {
    const name = shownName(other[0]);
    return result(
      "bypass",
      `other CLI: ${name}`,
      `program = ${name}; no installed extension covers it`,
    );
  }
  const git = segs.filter((s) => baseName(program(s)) === "git");
  if (git.length > 0) {
    return git.every((s) => GIT_READ_ONLY.has(gitSubcommand(s)))
      ? result("neutral", "git (read-only)", "git read-only subcommand")
      : result("neutral", "git", "git, and no installed extension covers it");
  }
  return result("neutral", "read-only shell", "all programs are read-only");
}

function isManagedPath(path: string, ctx: LabelContext): boolean {
  const rel = relative(path, ctx.root);
  return MANAGED.some((m) => rel.startsWith(m)) ||
    slashed(path).includes("/.swamp/") || rel.startsWith(".swamp/");
}

/** Labels one tool call from its tool name and raw input. */
export function labelCall(
  tool: string,
  input: unknown,
  ctx: LabelContext,
): CallLabel {
  const i = typeof input === "object" && input !== null
    ? input as Record<string, unknown>
    : {};
  switch (tool) {
    case "Bash":
      return labelShell(str(i.command), ctx);
    case "Edit":
    case "Write":
    case "MultiEdit":
    case "NotebookEdit": {
      const path = str(i.file_path) || str(i.notebook_path);
      if (isManagedPath(path, ctx)) {
        return result("bypass", HAND_EDITED, `${tool} on a swamp-managed path`);
      }
      if (relative(path, ctx.root).startsWith("extensions/")) {
        return result(
          "neutral",
          "extension authoring",
          `${tool} under extensions/`,
        );
      }
      return result(
        "neutral",
        "user code",
        `${tool} outside swamp-managed paths`,
      );
    }
    case "Read": {
      const path = slashed(str(i.file_path));
      if (path.includes("/.swamp/data")) {
        return result(
          "bypass",
          "read swamp state directly",
          "Read under .swamp/data",
        );
      }
      if (path.includes(PULLED_EXTENSIONS)) {
        return result(
          "neutral",
          READ_EXTENSION_SOURCE,
          "Read under .swamp/pulled-extensions (docs gap signal)",
        );
      }
      return result("neutral", "read file", "Read tool");
    }
    case "Skill":
      return result("neutral", `skill: ${str(i.skill)}`, "Skill tool");
    default:
      return result("neutral", tool.toLowerCase(), `${tool} tool`);
  }
}
