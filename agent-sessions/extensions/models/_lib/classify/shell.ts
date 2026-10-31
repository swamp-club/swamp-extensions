/**
 * Shell command splitting for the call labeller: a command line into the
 * segments it runs and each segment's program. Ported from the agent
 * observation prototype's `segments()` (swamp-club#4157), so labels match
 * what that prototype found on the same sessions.
 *
 * @module
 */

import { stripHeredocs } from "../redact.ts";

// Prefixes that run the program after them: assignments, env, timeout, time,
// negation and the keywords a loop or branch body starts with.
const PREFIX =
  /^(\w+=("[^"]*"|'[^']*'|[^\s"']\S*|)\s+|env\s+(-u\s+\S+\s+)*|timeout\s+\d+\s+|time\s+|!\s+|do\s+|then\s+|else\s+)/;

/**
 * Splits a command line into segments at `&&`, `||`, `;`, `|`, `&`, newlines,
 * parentheses and braces outside quotes, after dropping heredoc bodies.
 * Each segment has its run prefixes removed; empty segments, bare
 * assignments and comments are left out.
 */
export function segments(command: string): string[] {
  const cmd = stripHeredocs(command);
  const out: string[] = [];
  let cur = "";
  let quote: string | undefined;
  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i];
    if (quote) {
      cur += ch;
      if (ch === "\\" && quote === '"' && i + 1 < cmd.length) {
        cur += cmd[++i];
      } else if (ch === quote) {
        quote = undefined;
      }
    } else if (ch === "'" || ch === '"') {
      quote = ch;
      cur += ch;
    } else if (ch === "\\" && i + 1 < cmd.length) {
      cur += ch + cmd[++i];
    } else if (cmd.startsWith("&&", i) || cmd.startsWith("||", i)) {
      out.push(cur);
      cur = "";
      i++;
    } else if (ch === "&" && (cur.endsWith(">") || cmd[i + 1] === ">")) {
      cur += ch;
    } else if (";|\n&(){}".includes(ch)) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  const result: string[] = [];
  for (const raw of out) {
    let s = raw.trim();
    for (let n = 0; n < 5; n++) s = s.replace(PREFIX, "");
    if (
      !s || /^\w+=("[^"]*"|'[^']*'|[^\s"']\S*|)$/.test(s) || s.startsWith("#")
    ) {
      continue;
    }
    result.push(s);
  }
  return result;
}

/** A segment's words, split on whitespace. */
export function words(segment: string): string[] {
  return segment.split(/\s+/).filter((w) => w.length > 0);
}

/** A segment's program: its first word. */
export function program(segment: string): string {
  return words(segment)[0] ?? "";
}
