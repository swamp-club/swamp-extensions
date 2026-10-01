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
  type IssueDraft,
  type LifecycleEntry,
  type LifecycleEntryWriter,
  type PostedEntry,
  RELATION_TYPES,
  type RelationChange,
  type RelationType,
  type StatusChange,
  type TrackerAdapter,
  type TrackerComment,
  TrackerError,
  type TrackerErrorKind,
  type TrackerErrorReason,
  type TrackerIssue,
  type TrackerRelation,
} from "../core/adapter.ts";
import { checkRelate } from "../core/relations.ts";

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
// warnings; there is no /healthz probe; and assignment is strict. The
// relationship calls are the root client's addRelationship and
// removeRelationship, behind the shared relation rules (relations.ts). Calls are
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

/** Every Lab issue type. */
export const LAB_TYPES = ["bug", "feature", "platform", "security"] as const;
export type LabType = typeof LAB_TYPES[number];

/** swamp-club's limits on a lifecycle entry (its lifecycle route). */
const STEP_MAX = 100;
const SUMMARY_MAX = 2000;
const EMOJI_MAX = 32;

/** The forward order; swamp-club only accepts the next step along it. */
const FORWARD: readonly LabStatus[] = [
  "open",
  "triaged",
  "in_progress",
  "shipped",
];

const ADMIN_HINT = "status moves past open or closed, assignment, " +
  "attestations, lifecycle entries, the issue type, the team roster, " +
  "blocked_by relations and relations on another user's issues need a " +
  "swamp-club admin key";

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

/** Whether two urls name the same server: the same parsed origin. */
export function sameServer(a: string, b: string): boolean {
  try {
    return new URL(a).origin === new URL(b).origin;
  } catch {
    return false;
  }
}

/** Whether a url is on swamp-club's legacy domain. */
function isLegacyDomain(url: string): boolean {
  try {
    return new URL(url).hostname === "swamp.club";
  } catch {
    return false;
  }
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
  const broken = (why: string) =>
    new TrackerError(
      "auth",
      SWAMP_CLUB,
      `the stored login at ${path} ${why}; run \`swamp auth login\``,
    );
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw broken("is not valid JSON");
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw broken("is not a JSON object");
  }
  const creds = parsed as Record<string, unknown>;
  for (const field of ["serverUrl", "apiKey", "username"]) {
    if (creds[field] !== undefined && typeof creds[field] !== "string") {
      throw broken(`has a ${field} that is not a string`);
    }
  }
  const { serverUrl: stored, apiKey, username } = creds as {
    serverUrl?: string;
    apiKey?: string;
    username?: string;
  };
  if (!apiKey) return null;
  // The CLI rewrites the legacy domain when it saves the file; here we only
  // read it, so translate at the read site.
  const serverUrl = stored === undefined || isLegacyDomain(stored)
    ? SWAMP_CLUB_URL
    : stored;
  return {
    serverUrl,
    apiKey,
    username: username || undefined,
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
      // A url that is not one is refused as such, not as another server.
      const problem = url === undefined ? undefined : serverUrlProblem(url);
      if (problem !== undefined) fail("invalid", problem);
      if (url !== undefined && !sameServer(url, file.serverUrl)) {
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

/** A user on an issue's assignees. */
export interface LabAssignee {
  userId: string;
  /** Absent when swamp-club's reply does not carry it. */
  username?: string;
}

export interface AssignResult {
  /** False when the user was already assigned: nothing was written. */
  changed: boolean;
  username: string;
  userId: string;
  /** The issue's status when it was read. */
  status: string;
  /**
   * Assignees taken off the issue because they are no longer on swamp-club's
   * team, which would otherwise refuse the whole write. Empty when none were.
   */
  dropped: LabAssignee[];
}

/** What only the Lab reports about an issue, beyond the contract's fields. */
export interface LabIssueDetails {
  body: string;
  type: string;
  /** The author's swamp-club username. */
  author: string;
  authorId: string;
  comments: { author: string; body: string; createdAt: string }[];
}

/** Whether an issue's author is on swamp-club's team. */
export interface TeamMembership {
  author: string;
  authorId: string;
  member: boolean;
}

export interface PostedAttestation {
  id: string;
  postedBy: string;
  postedAt: string;
}

/** The tracker contract plus what only the Lab has. */
export interface SwampClubAdapter extends TrackerAdapter {
  readonly capabilities: { readonly history: LifecycleEntryWriter };
  /**
   * Whether the issue's author is on swamp-club's team, from a fresh read
   * of the issue and the team roster. Fail-closed: a read that fails is an
   * error, never taken as "not on the team".
   */
  teamMembership(issueId: string): Promise<TeamMembership>;
  /**
   * Add a user to the issue's assignees, keeping those already there that
   * are still on swamp-club's team.
   */
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

/** The Lab's reply to a new issue: the issue as stored. */
interface LabCreatedBody {
  issue?: {
    number?: unknown;
    title?: unknown;
    status?: unknown;
    body?: unknown;
    type?: unknown;
    authorId?: unknown;
    authorUsername?: unknown;
  };
}

interface LabIssueBody {
  issue?: {
    number?: unknown;
    title?: unknown;
    status?: unknown;
    assignees?: unknown;
    body?: unknown;
    type?: unknown;
    authorId?: unknown;
    authorUsername?: unknown;
  };
  comments?: unknown;
  relationships?: unknown;
}

/** A Lab relationship, with the id a removal names. */
interface LabRelationship {
  id: string;
  relation: TrackerRelation;
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
    // A removal answers 204 with no body.
    if (response.status === 204 && text === "") return null;
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
    // A write sends the whole list back, so an assignee it cannot name
    // would be unassigned: refuse the reply rather than drop one.
    const assignees: LabAssignee[] = [];
    for (const a of found.assignees ?? []) {
      if (typeof a?.userId !== "string") {
        return fail(
          "upstream",
          `GET #${issue} returned an assignee without a userId`,
        );
      }
      assignees.push({
        userId: a.userId,
        ...(typeof a.username === "string" ? { username: a.username } : {}),
      });
    }
    // The Lab-only fields, as issue-lifecycle reads them: absent ones are
    // empty, never an error, except where a caller depends on them.
    const comments: LabIssueDetails["comments"] = [];
    for (const c of Array.isArray(body?.comments) ? body.comments : []) {
      const comment = c as {
        authorUsername?: unknown;
        body?: unknown;
        createdAt?: unknown;
      } | null;
      if (typeof comment?.body !== "string") continue;
      comments.push({
        author: typeof comment.authorUsername === "string"
          ? comment.authorUsername
          : "",
        body: comment.body,
        createdAt: typeof comment.createdAt === "string"
          ? comment.createdAt
          : "",
      });
    }
    const details: LabIssueDetails = {
      body: typeof found.body === "string" ? found.body : "",
      type: typeof found.type === "string" ? found.type : "",
      author: typeof found.authorUsername === "string"
        ? found.authorUsername
        : "",
      authorId: typeof found.authorId === "string" ? found.authorId : "",
      comments,
    };
    // Read as issue-lifecycle's client reads them: an entry this adapter
    // cannot read (a type the Lab added later, a missing number) is skipped,
    // so a lookup that has no use for relations never fails on one. The Lab
    // keeps the relation rules itself, so a skipped entry is still guarded.
    const relationships: LabRelationship[] = [];
    const rawRelationships = Array.isArray(body?.relationships)
      ? body.relationships
      : [];
    for (const raw of rawRelationships) {
      const r = raw as {
        id?: unknown;
        type?: unknown;
        direction?: unknown;
        sourceIssueNumber?: unknown;
        targetIssueNumber?: unknown;
      } | null;
      const other = r?.direction === "outgoing"
        ? r.targetIssueNumber
        : r?.sourceIssueNumber;
      if (
        typeof r?.id !== "string" ||
        !(RELATION_TYPES as readonly unknown[]).includes(r.type) ||
        (r.direction !== "outgoing" && r.direction !== "incoming") ||
        typeof other !== "number"
      ) continue;
      relationships.push({
        id: r.id,
        relation: {
          type: r.type as RelationType,
          direction: r.direction,
          issue: String(other),
          display: `#${other}`,
        },
      });
    }
    return {
      title: found.title,
      status: found.status,
      assignees,
      details,
      relationships,
    };
  }

  /** The team roster: swamp-club's eligible assignees. */
  async function roster(): Promise<LabAssignee[]> {
    const eligible = await call("GET", "/api/v1/lab/assignees") as {
      assignees?: { userId?: unknown; username?: unknown }[];
    } | null;
    if (!Array.isArray(eligible?.assignees)) {
      return fail("upstream", "the eligible assignees are not a list");
    }
    return eligible.assignees.flatMap((a) =>
      typeof a?.userId === "string"
        ? [{
          userId: a.userId,
          ...(typeof a.username === "string" ? { username: a.username } : {}),
        }]
        : []
    );
  }

  const history: LifecycleEntryWriter = {
    async postEntry(
      issueId: string,
      entry: LifecycleEntry,
    ): Promise<PostedEntry> {
      const issue = numberFrom(issueId, false);
      const step = entry.step.trim();
      if (step === "" || step.length > STEP_MAX) {
        return fail(
          "invalid",
          `a lifecycle entry's step must be 1 to ${STEP_MAX} characters`,
        );
      }
      if (!isLabStatus(entry.targetStatus)) {
        return fail(
          "invalid",
          `'${entry.targetStatus}' is not a Lab status (they are: ${
            LAB_STATUSES.join(", ")
          })`,
        );
      }
      const emoji = entry.emoji.trim();
      if (emoji === "" || emoji.length > EMOJI_MAX) {
        return fail(
          "invalid",
          `a lifecycle entry's emoji must be 1 to ${EMOJI_MAX} characters`,
        );
      }
      let summary = entry.summary.trim();
      if (summary === "") {
        return fail("invalid", "a lifecycle entry needs a summary");
      }
      // Cut as issue-lifecycle cuts it, rather than refused.
      if (summary.length > SUMMARY_MAX) {
        let cut = summary.slice(0, SUMMARY_MAX - 3);
        // Never half an emoji: drop a high surrogate left without its pair.
        const last = cut.charCodeAt(cut.length - 1);
        if (last >= 0xd800 && last <= 0xdbff) cut = cut.slice(0, -1);
        summary = `${cut}...`;
      }
      const created = await call(
        "POST",
        `/api/v1/lab/issues/${issue}/lifecycle`,
        {
          step,
          targetStatus: entry.targetStatus,
          summary,
          emoji,
          payload: entry.payload,
          isVerbose: entry.isVerbose,
        },
      ) as { id?: unknown } | null;
      if (typeof created?.id !== "string") {
        return fail(
          "upstream",
          `the lifecycle entry on #${issue} came back without an id`,
        );
      }
      return { id: created.id };
    },

    async setType(
      issueId: string,
      type: string,
    ): Promise<{ changed: boolean; type: string }> {
      const issue = numberFrom(issueId, false);
      if (!(LAB_TYPES as readonly string[]).includes(type)) {
        return fail(
          "invalid",
          `'${type}' is not a Lab issue type (they are: ${
            LAB_TYPES.join(", ")
          })`,
        );
      }
      const { details } = await getIssue(issue);
      if (details.type === type) return { changed: false, type };
      await call("PATCH", `/api/v1/lab/issues/${issue}`, { type });
      return { changed: true, type };
    },
  };

  async function labUrl(issue: number): Promise<string> {
    return `${(await credentials()).url}/lab/${issue}`;
  }

  async function fetchIssue(ref: string): Promise<TrackerIssue> {
    const issue = numberFrom(ref, true);
    const found = await getIssue(issue);
    return {
      id: String(issue),
      display: `#${issue}`,
      title: found.title,
      url: await labUrl(issue),
      status: { id: found.status, name: found.status },
      details: { ...found.details },
      relations: found.relationships.map((r) => r.relation),
    };
  }

  return {
    tracker: SWAMP_CLUB,
    origin: "snapshot",
    capabilities: { history },

    async create(draft: IssueDraft): Promise<TrackerIssue> {
      if (!(LAB_TYPES as readonly string[]).includes(draft.type)) {
        return fail(
          "invalid",
          `'${draft.type}' is not a Lab issue type (they are: ${
            LAB_TYPES.join(", ")
          })`,
        );
      }
      if (draft.title.trim() === "" || draft.body.trim() === "") {
        return fail("invalid", "a Lab issue needs a title and a body");
      }
      const created = await call("POST", "/api/v1/lab/issues", {
        type: draft.type,
        title: draft.title,
        body: draft.body,
      }) as LabCreatedBody | null;
      // Built from the reply, not read back: a failed read after the Lab
      // stored the issue would invite a retry that files it twice.
      const found = created?.issue;
      const issue = found?.number;
      if (
        typeof issue !== "number" || !Number.isSafeInteger(issue) ||
        issue <= 0 || typeof found?.title !== "string" ||
        typeof found.status !== "string"
      ) {
        return fail(
          "upstream",
          "the new Lab issue came back without its number",
        );
      }
      const details: LabIssueDetails = {
        body: typeof found.body === "string" ? found.body : draft.body,
        type: typeof found.type === "string" ? found.type : draft.type,
        author: typeof found.authorUsername === "string"
          ? found.authorUsername
          : "",
        authorId: typeof found.authorId === "string" ? found.authorId : "",
        comments: [],
      };
      return {
        id: String(issue),
        display: `#${issue}`,
        title: found.title,
        url: await labUrl(issue),
        status: { id: found.status, name: found.status },
        details: { ...details },
        relations: [],
      };
    },

    fetchIssue,

    async teamMembership(issueId: string): Promise<TeamMembership> {
      const issue = numberFrom(issueId, false);
      const { details } = await getIssue(issue);
      if (details.author === "" && details.authorId === "") {
        return fail("upstream", `GET #${issue} returned no author`);
      }
      const team = await roster();
      // By id when the issue has one, as issue-lifecycle matches; both are
      // swamp-club identities, so the username is a sound fallback.
      const member = details.authorId !== ""
        ? team.some((m) => m.userId === details.authorId)
        : team.some((m) => m.username === details.author);
      return { author: details.author, authorId: details.authorId, member };
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

    async relate(
      from: string,
      type: RelationType,
      to: string,
    ): Promise<RelationChange> {
      const source = numberFrom(from, false);
      const target = numberFrom(to, false);
      const check = await checkRelate(
        fetchIssue,
        SWAMP_CLUB,
        String(source),
        type,
        String(target),
      );
      if (check.exists) return { changed: false };
      await call("POST", `/api/v1/lab/issues/${source}/relationships`, {
        type,
        targetIssueNumber: target,
      });
      return { changed: true };
    },

    async unrelate(
      from: string,
      type: RelationType,
      to: string,
    ): Promise<RelationChange> {
      const source = numberFrom(from, false);
      const target = numberFrom(to, false);
      const { relationships } = await getIssue(source);
      // The other end too, so a missing one is not_found, as on relate.
      await getIssue(target);
      const found = relationships.find((r) =>
        r.relation.type === type && r.relation.direction === "outgoing" &&
        r.relation.issue === String(target)
      );
      if (found === undefined) return { changed: false };
      await call("DELETE", `/api/v1/lab/issues/${source}/relationships`, {
        relationshipId: found.id,
      });
      return { changed: true };
    },

    async assign(issueId: string, username: string): Promise<AssignResult> {
      const issue = numberFrom(issueId, false);
      const team = await roster();
      const match = team.find((a) => a.username === username);
      if (match === undefined) {
        return fail(
          "invalid",
          `'${username}' is not an eligible assignee (swamp-club's team)`,
        );
      }
      const userId = match.userId;
      const { assignees, status } = await getIssue(issue);
      if (assignees.some((a) => a.userId === userId)) {
        return { changed: false, username, userId, status, dropped: [] };
      }
      // swamp-club refuses the whole list if any id on it has left the
      // team, so keep only those still eligible and say who was dropped.
      const ids = new Set(team.map((a) => a.userId));
      const kept = assignees.filter((a) => ids.has(a.userId));
      const dropped = assignees.filter((a) => !ids.has(a.userId));
      await call("PATCH", `/api/v1/lab/issues/${issue}`, {
        assignees: [...kept.map((a) => a.userId), userId],
      });
      return { changed: true, username, userId, status, dropped };
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
