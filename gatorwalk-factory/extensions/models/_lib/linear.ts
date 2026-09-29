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

import {
  type StatusChange,
  type TrackerAdapter,
  type TrackerComment,
  TrackerError,
  type TrackerErrorKind,
  type TrackerIssue,
  type TrackerStatus,
} from "./tracker.ts";

// ---------------------------------------------------------------------------
// The Linear adapter: GraphQL over fetch. The stable id is the issue UUID;
// the identifier (ABC-1) changes when an issue moves team, so it is for
// display and for finding an issue, never for keying one. Calls are not
// retried: every write is idempotent through the delivery ledger or by
// being a no-op when already done, so the caller re-runs.
// ---------------------------------------------------------------------------

export const LINEAR_API_URL = "https://api.linear.app/graphql";
export const LINEAR = "linear";
export const LINEAR_TYPE = "@swamp/gatorwalk-factory/linear";

// Plain http is allowed only to loopback, where the tests run a local fake;
// anywhere else the API key would cross the network in cleartext. These are
// URL.hostname forms, which the parser normalizes (http://127.1 is 127.0.0.1).
const LOOPBACK_HOSTS = new Set(["127.0.0.1", "[::1]"]);

/** Why apiUrl is refused, or undefined when the API key may be sent to it. */
export function apiUrlProblem(apiUrl: string): string | undefined {
  const rule =
    "apiUrl must be https (plain http is allowed only for 127.0.0.1 and [::1])";
  let url: URL;
  try {
    url = new URL(apiUrl);
  } catch {
    return rule;
  }
  if (url.protocol === "https:") return undefined;
  if (url.protocol === "http:" && LOOPBACK_HOSTS.has(url.hostname)) {
    return undefined;
  }
  return rule;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface LinearOptions {
  /** A Linear personal API key; sent as the Authorization header. */
  apiToken: string;
  apiUrl?: string;
  timeoutMs?: number;
}

interface GraphQLError {
  message?: unknown;
  extensions?: { code?: unknown; type?: unknown };
}

const ISSUE_FIELDS = "id identifier title url state { id name }";

interface IssueNode {
  id: string;
  identifier: string;
  title: string;
  url: string;
  state: TrackerStatus;
}

function fail(kind: TrackerErrorKind, detail: string): never {
  throw new TrackerError(kind, LINEAR, detail);
}

function requireUuid(issueId: string): void {
  if (!UUID.test(issueId)) {
    fail(
      "invalid",
      `'${issueId}' is not an issue UUID; Linear identifiers change when an ` +
        "issue moves team, so writes key on the UUID (fetch_issue finds it)",
    );
  }
}

function kindOf(status: number, errors: GraphQLError[]): TrackerErrorKind {
  const codes = errors.map((e) => String(e.extensions?.code ?? ""));
  const messages = errors.map((e) => String(e.message ?? ""));
  if (
    status === 401 || status === 403 ||
    codes.some((c) => c === "AUTHENTICATION_ERROR" || c === "FORBIDDEN")
  ) return "auth";
  if (status === 429 || codes.includes("RATELIMITED")) return "rate_limited";
  if (messages.some((m) => /entity not found/i.test(m))) return "not_found";
  if (codes.some((c) => c === "INVALID_INPUT" || c === "GRAPHQL_VALIDATION")) {
    return "invalid";
  }
  return "upstream";
}

function preview(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > 80 ? `${flat.slice(0, 80)}...` : flat;
}

/** A Linear client that speaks the tracker adapter contract. */
export function linearAdapter(options: LinearOptions): TrackerAdapter {
  const apiUrl = options.apiUrl ?? LINEAR_API_URL;
  const problem = apiUrlProblem(apiUrl);
  if (problem !== undefined) fail("invalid", problem);
  const timeoutMs = options.timeoutMs ?? 30_000;

  async function graphql<T>(
    query: string,
    variables: Record<string, unknown>,
  ): Promise<T> {
    let response: Response;
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": options.apiToken,
        },
        body: JSON.stringify({ query, variables }),
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (error) {
      return fail(
        "upstream",
        `could not reach ${apiUrl}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
    // The timeout also covers reading the body, so a stall after the
    // headers lands here, not in the catch above.
    let text: string;
    try {
      text = await response.text();
    } catch (error) {
      if (error instanceof Error && error.name === "TimeoutError") {
        return fail(
          kindOf(response.status, []),
          `HTTP ${response.status}: timed out after ${timeoutMs} ms reading the response from ${apiUrl}`,
        );
      }
      return fail(
        kindOf(response.status, []),
        `HTTP ${response.status}: could not read the response from ${apiUrl}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
    let body: { data?: T | null; errors?: GraphQLError[] };
    try {
      body = JSON.parse(text);
    } catch {
      return fail(
        kindOf(response.status, []),
        `HTTP ${response.status} with a body that is not JSON: ${
          preview(text)
        }`,
      );
    }
    const errors = Array.isArray(body?.errors) ? body.errors : [];
    if (errors.length > 0 || !response.ok) {
      const detail = errors.map((e) =>
        String(e.message ?? "")
      ).filter((m) => m !== "").join("; ") || preview(text);
      return fail(
        kindOf(response.status, errors),
        `HTTP ${response.status}: ${detail}`,
      );
    }
    if (body?.data === undefined || body.data === null) {
      return fail("upstream", `HTTP ${response.status} with no data`);
    }
    return body.data;
  }

  function toIssue(
    node: IssueNode | null | undefined,
    ref: string,
  ): TrackerIssue {
    if (node === null || node === undefined) {
      return fail("not_found", `no issue '${ref}'`);
    }
    return {
      id: node.id,
      display: node.identifier,
      title: node.title,
      url: node.url,
      status: { id: node.state.id, name: node.state.name },
    };
  }

  return {
    tracker: LINEAR,

    async fetchIssue(ref: string): Promise<TrackerIssue> {
      const data = await graphql<{ issue: IssueNode | null }>(
        `query GatorwalkIssue($id: String!) { issue(id: $id) { ${ISSUE_FIELDS} } }`,
        { id: ref },
      );
      return toIssue(data.issue, ref);
    },

    async comment(issueId: string, body: string): Promise<TrackerComment> {
      requireUuid(issueId);
      const data = await graphql<{
        commentCreate: {
          success: boolean;
          comment: { id: string; url: string } | null;
        };
      }>(
        `mutation GatorwalkComment($issueId: String!, $body: String!) {
          commentCreate(input: { issueId: $issueId, body: $body }) {
            success comment { id url }
          }
        }`,
        { issueId, body },
      );
      const created = data.commentCreate;
      if (!created?.success || !created.comment) {
        return fail("upstream", `commentCreate on ${issueId} did not succeed`);
      }
      return { id: created.comment.id, url: created.comment.url };
    },

    async setStatus(
      issueId: string,
      statusName: string,
    ): Promise<StatusChange> {
      requireUuid(issueId);
      const data = await graphql<{
        issue:
          | {
            id: string;
            state: TrackerStatus;
            team: { states: { nodes: TrackerStatus[] } };
          }
          | null;
      }>(
        `query GatorwalkStates($id: String!) {
          issue(id: $id) {
            id state { id name }
            team { states(first: 250) { nodes { id name } } }
          }
        }`,
        { id: issueId },
      );
      if (data.issue === null) {
        return fail("not_found", `no issue '${issueId}'`);
      }
      const states = data.issue.team.states.nodes;
      const target = states.find((s) => s.name === statusName);
      if (target === undefined) {
        return fail(
          "invalid",
          `the issue's team has no status '${statusName}' (it has: ${
            states.map((s) => s.name).join(", ")
          })`,
        );
      }
      if (data.issue.state.id === target.id) {
        return { changed: false, status: { id: target.id, name: target.name } };
      }
      const updated = await graphql<{
        issueUpdate: {
          success: boolean;
          issue: { state: TrackerStatus } | null;
        };
      }>(
        `mutation GatorwalkSetStatus($id: String!, $stateId: String!) {
          issueUpdate(id: $id, input: { stateId: $stateId }) {
            success issue { state { id name } }
          }
        }`,
        { id: issueId, stateId: target.id },
      );
      const result = updated.issueUpdate;
      if (!result?.success || !result.issue) {
        return fail("upstream", `issueUpdate on ${issueId} did not succeed`);
      }
      return { changed: true, status: result.issue.state };
    },
  };
}
