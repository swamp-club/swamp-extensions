// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
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

import { join } from "@std/path";
import {
  type StatusChange,
  type TrackerAdapter,
  type TrackerComment,
  TrackerError,
  type TrackerErrorKind,
  type TrackerErrorReason,
  type TrackerIssue,
} from "./tracker.ts";

// ---------------------------------------------------------------------------
// The swamp-club Lab adapter: REST over fetch. The stable id is the issue
// number, as a string ("2631"); the display form is "#2631". Numbers never
// change, but writes still take only the stable id, as every adapter's do.
//
// Forked from @swamp/issue-lifecycle's extensions/models/_lib/swamp_club.ts
// (the packages are published separately, so neither can import the other):
// the endpoints, Bearer auth, the one-step status order, the auth.json
// reader with its swamp.club rewrite, the credential precedence and the
// eligible-assignee lookup. What differs: the issue number is per call, not
// per client; failures are TrackerErrors, never best-effort nulls or
// warnings; there is no /healthz probe; and assignment is strict. Calls are
// not retried: every write is idempotent through the delivery ledger or by
// being a no-op when already done, so the caller re-runs.
// ---------------------------------------------------------------------------

export const SWAMP_CLUB_URL = "https://swamp-club.com";
export const SWAMP_CLUB = "swamp-club";
export const SWAMP_CLUB_TYPE = "@swamp/gatorwalk-factory/swamp-club";

/** Every Lab issue status. */
export const LAB_STATUSES = [
  "open",
  "triaged",
  "in_progress",
  "shipped",
  "closed",
] as const;
export type LabStatus = typeof LAB_STATUSES[number];

/** The forward order; swamp-club only accepts the next step along it. */
const FORWARD: readonly LabStatus[] = [
  "open",
  "triaged",
  "in_progress",
  "shipped",
];

const ADMIN_HINT = "status moves past open or closed, assignment and " +
  "attestations need a swamp-club admin key";

// The key goes out as a Bearer token, so the server must be https. Plain
// http is allowed only to loopback, where the tests run a local fake; the
// same rule as Linear's apiUrl. URL.hostname forms.
const LOOPBACK_HOSTS = new Set(["127.0.0.1", "[::1]"]);

/** Why a server url is refused, or undefined when the key may go there. */
export function serverUrlProblem(url: string): string | undefined {
  const rule = `the swamp-club url must be https (plain http is allowed ` +
    `only for 127.0.0.1 and [::1]): ${url}`;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return rule;
  }
  if (parsed.protocol === "https:") return undefined;
  if (parsed.protocol === "http:" && LOOPBACK_HOSTS.has(parsed.hostname)) {
    return undefined;
  }
  return rule;
}

export interface AuthFile {
  serverUrl: string;
  apiKey: string;
  username?: string;
}

/** Where credentials come from; injected in tests. */
export interface CredentialSources {
  env(name: string): string | undefined;
  readAuthFile(): Promise<AuthFile | null>;
}

export interface LabCredentials {
  url: string;
  apiKey: string;
}

/**
 * Read swamp's stored login: $XDG_CONFIG_HOME/swamp/auth.json, or
 * $HOME/.config/swamp/auth.json. Null when there is none; a file that is
 * there but cannot be read or parsed is an auth error, not "logged out".
 */
export async function readSwampAuthFile(
  env: (name: string) => string | undefined,
): Promise<AuthFile | null> {
  const xdg = env("XDG_CONFIG_HOME");
  const home = env("HOME");
  const dir = xdg
    ? join(xdg, "swamp")
    : home
    ? join(home, ".config", "swamp")
    : null;
  if (dir === null) return null;
  const path = join(dir, "auth.json");
  let text: string;
  try {
    text = await Deno.readTextFile(path);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return null;
    throw new TrackerError(
      "auth",
      SWAMP_CLUB,
      `could not read the stored login at ${path}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  let creds: { serverUrl?: string; apiKey?: string; username?: string };
  try {
    creds = JSON.parse(text);
  } catch {
    throw new TrackerError(
      "auth",
      SWAMP_CLUB,
      `the stored login at ${path} is not valid JSON; run \`swamp auth login\``,
    );
  }
  if (!creds?.apiKey) return null;
  // The CLI rewrites the legacy domain when it saves the file; here we only
  // read it, so translate at the read site.
  const serverUrl = creds.serverUrl === "https://swamp.club"
    ? SWAMP_CLUB_URL
    : creds.serverUrl ?? SWAMP_CLUB_URL;
  return {
    serverUrl,
    apiKey: creds.apiKey,
    username: creds.username || undefined,
  };
}

/** The real environment and the real auth.json. */
export const DEFAULT_SOURCES: CredentialSources = {
  env: (name) => Deno.env.get(name),
  readAuthFile: () => readSwampAuthFile((name) => Deno.env.get(name)),
};

/**
 * The key and URL, as issue-lifecycle resolves them. The key: the apiKey
 * argument, then SWAMP_API_KEY, then auth.json. The URL: the url argument,
 * then SWAMP_CLUB_URL, then (only when the key came from it) auth.json's
 * serverUrl, then https://swamp-club.com.
 *
 * One difference from issue-lifecycle: the stored login's key is only sent
 * to the stored login's server. A url that names another server, with no
 * key of its own, is refused rather than handed that key.
 */
export async function resolveLabCredentials(
  args: { apiKey?: string; url?: string },
  sources: CredentialSources,
): Promise<LabCredentials> {
  const trim = (u: string) => u.replace(/\/+$/, "");
  let url = args.url || sources.env("SWAMP_CLUB_URL") || undefined;
  let apiKey = args.apiKey || sources.env("SWAMP_API_KEY") || undefined;
  if (apiKey === undefined) {
    const file = await sources.readAuthFile();
    if (file !== null) {
      if (url !== undefined && trim(url) !== trim(file.serverUrl)) {
        throw new TrackerError(
          "auth",
          SWAMP_CLUB,
          `the stored login is for ${trim(file.serverUrl)}, not ${
            trim(url)
          }; set the apiKey global argument or SWAMP_API_KEY to a key for ` +
            "that server",
        );
      }
      apiKey = file.apiKey;
      url = url ?? file.serverUrl;
    }
  }
  if (apiKey === undefined) {
    throw new TrackerError(
      "auth",
      SWAMP_CLUB,
      "no swamp-club credentials: set the apiKey global argument, the " +
        "SWAMP_API_KEY environment variable, or run `swamp auth login`",
    );
  }
  const resolved = trim(url ?? SWAMP_CLUB_URL);
  const problem = serverUrlProblem(resolved);
  if (problem !== undefined) fail("invalid", problem);
  return { url: resolved, apiKey };
}

export interface AssignResult {
  /** False when the user was already assigned: nothing was written. */
  changed: boolean;
  username: string;
  userId: string;
}

export interface PostedAttestation {
  id: string;
  postedBy: string;
  postedAt: string;
}

/** The tracker contract plus what only the Lab has. */
export interface SwampClubAdapter extends TrackerAdapter {
  /** Add a user to the issue's assignees, keeping those already there. */
  assign(issueId: string, username: string): Promise<AssignResult>;
  /** Post a verification attestation, built elsewhere, as it is. */
  postAttestation(
    attestation: Record<string, unknown>,
  ): Promise<PostedAttestation>;
}

export interface SwampClubOptions {
  credentials(): Promise<LabCredentials>;
  timeoutMs?: number;
}

interface LabIssueBody {
  issue?: {
    number?: unknown;
    title?: unknown;
    status?: unknown;
    assignees?: unknown;
  };
}

function fail(
  kind: TrackerErrorKind,
  detail: string,
  reason?: TrackerErrorReason,
): never {
  throw new TrackerError(kind, SWAMP_CLUB, detail, reason);
}

function kindOf(status: number): TrackerErrorKind {
  if (status === 401 || status === 403) return "auth";
  if (status === 404) return "not_found";
  if (status === 429) return "rate_limited";
  if (status === 400 || status === 413 || status === 422) return "invalid";
  return "upstream";
}

function preview(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > 200 ? `${flat.slice(0, 200)}...` : flat;
}

/** An issue number from its stable id ("2631") or display form ("#2631"). */
function numberFrom(ref: string, allowDisplay: boolean): number {
  const match = (allowDisplay ? /^#?([1-9][0-9]*)$/ : /^([1-9][0-9]*)$/)
    .exec(ref);
  if (match === null || !Number.isSafeInteger(Number(match[1]))) {
    fail(
      "invalid",
      allowDisplay
        ? `'${ref}' is not a Lab issue number (2631 or #2631)`
        : `'${ref}' is not a Lab issue's stable id, its number (2631); ` +
          "fetch_issue reports it",
    );
  }
  return Number(match[1]);
}

function isLabStatus(name: string): name is LabStatus {
  return (LAB_STATUSES as readonly string[]).includes(name);
}

/** The PATCHes that move an issue from `current` to `target`, in order. */
function pathOf(
  issue: number,
  current: string,
  target: LabStatus,
): LabStatus[] {
  // unreachable: the Lab knows both statuses; the issue just cannot get
  // there from where it is. A current status the adapter does not know is
  // plain invalid, so publish reports it rather than skipping the move.
  const refuse = (why: string, unreachable = true): never =>
    fail(
      "invalid",
      `#${issue} is '${current}'; ${why}`,
      unreachable ? "unreachable" : undefined,
    );
  if (target === "closed") {
    if (current === "shipped") refuse("a shipped issue cannot be closed");
    return ["closed"];
  }
  // Reopening is the only move out of closed, then forward from open.
  const from = current === "closed" ? 0 : FORWARD.indexOf(current as LabStatus);
  if (from < 0) {
    refuse(`swamp-club has no path from it to '${target}'`, false);
  }
  const to = FORWARD.indexOf(target);
  if (to < from) {
    refuse(
      `moving back to '${target}' is not allowed (statuses only move ` +
        "forward)",
    );
  }
  const steps = FORWARD.slice(from + 1, to + 1);
  return current === "closed" ? ["open", ...steps] : steps;
}

/** A swamp-club Lab client that speaks the tracker adapter contract. */
export function swampClubAdapter(options: SwampClubOptions): SwampClubAdapter {
  const timeoutMs = options.timeoutMs ?? 30_000;
  let resolved: Promise<LabCredentials> | undefined;
  // Resolved once, on the first call: reading auth.json is async, and the
  // tracker methods build their adapter synchronously.
  const credentials = () => resolved ??= options.credentials();

  async function call(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<unknown> {
    const { url, apiKey } = await credentials();
    const target = `${url}${path}`;
    let response: Response;
    let text: string;
    try {
      response = await fetch(target, {
        method,
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(timeoutMs),
      });
      // Inside the try: the timeout covers the body too, and a server that
      // stalls or drops the connection after its headers is upstream.
      text = await response.text();
    } catch (error) {
      return fail(
        "upstream",
        `${method} ${path}: no complete reply from ${url}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
    let parsed: unknown;
    let isJson = true;
    try {
      parsed = JSON.parse(text);
    } catch {
      isJson = false;
    }
    if (!response.ok) {
      const reason = isJson && typeof parsed === "object" && parsed !== null &&
          typeof (parsed as { error?: unknown }).error === "string"
        ? (parsed as { error: string }).error
        : preview(text);
      const kind = kindOf(response.status);
      const extra = response.status === 403
        ? ` (${ADMIN_HINT})`
        : response.status === 429 && response.headers.get("Retry-After")
        ? ` (retry after ${response.headers.get("Retry-After")}s)`
        : "";
      return fail(
        kind,
        `${method} ${path}: HTTP ${response.status}: ${
          reason || "no body"
        }${extra}`,
      );
    }
    if (!isJson) {
      return fail(
        "upstream",
        `${method} ${path}: HTTP ${response.status} with a body that is not ` +
          `JSON: ${preview(text)}`,
      );
    }
    return parsed;
  }

  async function getIssue(issue: number) {
    const body = await call("GET", `/api/v1/lab/issues/${issue}`) as
      | LabIssueBody
      | null;
    const found = body?.issue;
    if (
      found === undefined || typeof found.status !== "string" ||
      typeof found.title !== "string"
    ) {
      return fail("upstream", `GET #${issue} returned no issue`);
    }
    if (found.assignees !== undefined && !Array.isArray(found.assignees)) {
      return fail(
        "upstream",
        `GET #${issue} returned assignees that are not a list`,
      );
    }
    const assignees = (found.assignees ?? []).flatMap((a) =>
      typeof a?.userId === "string" ? [a.userId] : []
    );
    return { title: found.title, status: found.status, assignees };
  }

  async function labUrl(issue: number): Promise<string> {
    return `${(await credentials()).url}/lab/${issue}`;
  }

  return {
    tracker: SWAMP_CLUB,

    async fetchIssue(ref: string): Promise<TrackerIssue> {
      const issue = numberFrom(ref, true);
      const found = await getIssue(issue);
      return {
        id: String(issue),
        display: `#${issue}`,
        title: found.title,
        url: await labUrl(issue),
        status: { id: found.status, name: found.status },
      };
    },

    async comment(issueId: string, body: string): Promise<TrackerComment> {
      const issue = numberFrom(issueId, false);
      const created = await call(
        "POST",
        `/api/v1/lab/issues/${issue}/comments`,
        { body },
      ) as { id?: unknown } | null;
      if (typeof created?.id !== "string") {
        return fail(
          "upstream",
          `the ripple on #${issue} came back without an id`,
        );
      }
      // A ripple has no anchor of its own, so its url is the issue's.
      return { id: created.id, url: await labUrl(issue) };
    },

    async setStatus(
      issueId: string,
      statusName: string,
    ): Promise<StatusChange> {
      const issue = numberFrom(issueId, false);
      if (!isLabStatus(statusName)) {
        return fail(
          "invalid",
          `'${statusName}' is not a Lab status (they are: ${
            LAB_STATUSES.join(", ")
          })`,
        );
      }
      // Always from the status the issue has now, so a re-run after a walk
      // that failed partway starts where the issue really is.
      const { status: current } = await getIssue(issue);
      if (current === statusName) {
        return { changed: false, status: { id: current, name: current } };
      }
      const landed: string[] = [];
      for (const step of pathOf(issue, current, statusName)) {
        try {
          await call("PATCH", `/api/v1/lab/issues/${issue}`, { status: step });
        } catch (error) {
          if (!(error instanceof TrackerError) || landed.length === 0) {
            throw error;
          }
          throw new TrackerError(
            error.kind,
            SWAMP_CLUB,
            `${error.detail} (after moving #${issue} to ${
              landed.join(", then ")
            })`,
          );
        }
        landed.push(step);
      }
      return { changed: true, status: { id: statusName, name: statusName } };
    },

    async assign(issueId: string, username: string): Promise<AssignResult> {
      const issue = numberFrom(issueId, false);
      const eligible = await call("GET", "/api/v1/lab/assignees") as {
        assignees?: { userId?: unknown; username?: unknown }[];
      } | null;
      if (!Array.isArray(eligible?.assignees)) {
        return fail("upstream", "the eligible assignees are not a list");
      }
      const match = eligible.assignees.find((a) =>
        a?.username === username && typeof a?.userId === "string"
      );
      if (match === undefined) {
        return fail(
          "invalid",
          `'${username}' is not an eligible assignee (swamp-club's team)`,
        );
      }
      const userId = match.userId as string;
      const { assignees } = await getIssue(issue);
      if (assignees.includes(userId)) {
        return { changed: false, username, userId };
      }
      await call("PATCH", `/api/v1/lab/issues/${issue}`, {
        assignees: [...assignees, userId],
      });
      return { changed: true, username, userId };
    },

    async postAttestation(
      attestation: Record<string, unknown>,
    ): Promise<PostedAttestation> {
      const posted = await call(
        "POST",
        "/api/v1/admin/attestations",
        attestation,
      ) as Partial<Record<keyof PostedAttestation, unknown>> | null;
      if (
        typeof posted?.id !== "string" ||
        typeof posted.postedBy !== "string" ||
        typeof posted.postedAt !== "string"
      ) {
        return fail("upstream", "the attestation came back without its id");
      }
      return {
        id: posted.id,
        postedBy: posted.postedBy,
        postedAt: posted.postedAt,
      };
    },
  };
}
