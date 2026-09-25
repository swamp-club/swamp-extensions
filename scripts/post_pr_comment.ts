// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

/**
 * Posts a CI job's result to its pull request as one comment, updated in
 * place: each job's comment starts with a hidden marker naming the job, and a
 * later run edits the comment the same account marked rather than adding
 * another.
 *
 * The comment never decides anything. This script always exits 0 — a failure
 * to post is a warning — so the job's verdict comes only from the step that
 * judged it.
 *
 * Usage:
 *   FORGEJO_TOKEN=... deno run --allow-read=<file> \
 *     --allow-net=git.swamp-club.com --allow-env=FORGEJO_TOKEN \
 *     scripts/post_pr_comment.ts --file <markdown> --marker <job> \
 *       --repo <owner/name> --pr <number> --commit <head-sha> \
 *       [--api https://git.swamp-club.com/api/v1]
 */

import { parseArgs } from "@std/cli/parse-args";

export const DEFAULT_API = "https://git.swamp-club.com/api/v1";

const MARKER_NAME = /^[a-z][a-z-]*$/;
const REPO = /^[\w.-]+\/[\w.-]+$/;
const PR = /^[1-9]\d*$/;
const COMMIT = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/;

/** A pull request comment as the Forgejo API returns it. */
export interface Comment {
  id: number;
  body: string;
  user: { login: string } | null;
}

function markerLine(marker: string): string {
  return `<!-- ${marker} -->`;
}

/** The comment body: the marker, the commit judged, then the result. */
export function commentBody(
  marker: string,
  commit: string,
  markdown: string,
): string {
  return `${
    markerLine(marker)
  }\n**Commit** \`${commit}\`\n\n${markdown.trimEnd()}\n`;
}

/** Whether an item from the comment list has the fields a match reads. */
function isComment(value: unknown): value is Comment {
  if (value === null || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  const user = c.user as Record<string, unknown> | null | undefined;
  return typeof c.id === "number" && typeof c.body === "string" &&
    (user === null || typeof user?.login === "string");
}

/**
 * The comment a previous run of this job posted: written by `login` and
 * starting with this job's marker. A marker anywhere else, or on someone
 * else's comment, does not count.
 */
export function findOwnComment(
  comments: readonly Comment[],
  login: string,
  marker: string,
): Comment | undefined {
  const prefix = `${markerLine(marker)}\n`;
  return comments.find((c) =>
    c.user?.login === login &&
    c.body.replaceAll("\r\n", "\n").startsWith(prefix)
  );
}

export interface PostOptions {
  api: string;
  repo: string;
  pr: string;
  commit: string;
  marker: string;
  token: string;
  markdown: string;
}

/** What a post did. */
export type PostResult = "created" | "updated" | "superseded";

async function call(
  opts: PostOptions,
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const res = await fetch(`${opts.api}${path}`, {
    method,
    headers: {
      Authorization: `token ${opts.token}`,
      Accept: "application/json",
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) {
    const text = (await res.text()).slice(0, 200);
    throw new Error(`${method} ${path} failed (HTTP ${res.status}): ${text}`);
  }
  return await res.json();
}

/**
 * Creates or updates this job's comment on the pull request, unless a newer
 * push has moved the head past `commit` — an older run finishing late must
 * not overwrite a newer result.
 */
export async function postComment(opts: PostOptions): Promise<PostResult> {
  const issue = `/repos/${opts.repo}/issues/${opts.pr}`;
  const pull = await call(opts, "GET", `/repos/${opts.repo}/pulls/${opts.pr}`);
  const head = (pull as { head?: { sha?: unknown } }).head?.sha;
  if (head !== opts.commit) return "superseded";

  const user = await call(opts, "GET", "/user");
  const login = (user as { login?: unknown }).login;
  if (typeof login !== "string" || login === "") {
    throw new Error("GET /user returned no login");
  }
  // Forgejo returns every comment on the issue at once; the endpoint takes
  // no page or limit.
  const comments = await call(opts, "GET", `${issue}/comments`);
  if (!Array.isArray(comments)) {
    throw new Error(`GET ${issue}/comments did not return a list`);
  }

  const body = commentBody(opts.marker, opts.commit, opts.markdown);
  const own = findOwnComment(comments.filter(isComment), login, opts.marker);
  if (own) {
    await call(opts, "PATCH", `/repos/${opts.repo}/issues/comments/${own.id}`, {
      body,
    });
    return "updated";
  }
  await call(opts, "POST", `${issue}/comments`, { body });
  return "created";
}

/**
 * Runs the command line and returns the line to log. Never throws: every
 * failure comes back as a warning.
 */
export async function run(
  argv: string[],
  token: string | undefined,
): Promise<string> {
  const args = parseArgs(argv, {
    string: ["file", "marker", "repo", "pr", "commit", "api"],
    default: { api: DEFAULT_API },
  });
  const { file, marker, repo, pr, commit, api } = args;
  if (
    !file || !marker || !MARKER_NAME.test(marker) || !repo ||
    !REPO.test(repo) || !pr || !PR.test(pr) || !commit || !COMMIT.test(commit)
  ) {
    return "::warning::post_pr_comment.ts: usage: --file <path> " +
      "--marker <job> --repo <owner/name> --pr <number> --commit <sha>";
  }
  if (!token) {
    return "::warning::No FORGEJO_TOKEN; not posting the comment.";
  }
  let markdown: string;
  try {
    markdown = await Deno.readTextFile(file);
  } catch {
    return `::warning::No result at ${file}; not posting the comment.`;
  }
  if (markdown.trim() === "") {
    return `::warning::The result at ${file} is empty; not posting the comment.`;
  }

  try {
    const result = await postComment({
      api,
      repo,
      pr,
      commit,
      marker,
      token,
      markdown,
    });
    return result === "superseded"
      ? `A newer push moved the pull request past ${commit}; not posting ` +
        "this run's result."
      : `Comment ${result}.`;
  } catch (err) {
    // The message quotes the server's response; keep it on one line, so none
    // of it can start a workflow command of its own.
    const message = (err instanceof Error ? err.message : String(err))
      .replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
    return `::warning::Could not post the ${marker} comment: ${message}`;
  }
}

if (import.meta.main) {
  console.log(await run(Deno.args, Deno.env.get("FORGEJO_TOKEN")));
  Deno.exit(0);
}
