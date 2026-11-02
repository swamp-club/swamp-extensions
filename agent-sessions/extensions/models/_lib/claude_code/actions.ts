/**
 * Claude Code's tool calls as harness-neutral actions (swamp-club#4158):
 * only the input fields the record and the labeller read.
 *
 * @module
 */

import type { CallAction } from "../classify/action.ts";

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** A Claude Code tool call, by its tool name and raw input, as an action. */
export function claudeAction(tool: string, input: unknown): CallAction {
  const i = typeof input === "object" && input !== null
    ? input as Record<string, unknown>
    : {};
  switch (tool) {
    case "Bash":
      return { kind: "shell", command: str(i.command) };
    case "Read":
      return { kind: "file-read", path: str(i.file_path) };
    case "Edit":
    case "MultiEdit":
      return { kind: "file-edit", path: str(i.file_path) };
    case "Write":
      return { kind: "file-write", path: str(i.file_path) };
    case "NotebookEdit":
      return {
        kind: "file-edit",
        path: str(i.notebook_path) || str(i.file_path),
      };
    case "Skill":
      return { kind: "skill", name: str(i.skill) };
    case "WebFetch":
      return { kind: "web", url: str(i.url) };
    case "Grep":
    case "Glob":
      return { kind: "search", path: str(i.path) };
    default:
      return { kind: "none" };
  }
}
