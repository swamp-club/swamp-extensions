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

// ---------------------------------------------------------------------------
// A local stand-in for Linear's GraphQL API, for tests only: a Deno.serve on
// 127.0.0.1 and a free port. It answers the operations the adapter sends,
// with the response and error shapes Linear documents: GraphQL errors with
// extensions.code (AUTHENTICATION_ERROR, RATELIMITED, INVALID_INPUT and
// "Entity not found"). A test can queue raw responses to exercise malformed
// ones, including a body that stalls or drops mid-stream. Never the live
// service.
// ---------------------------------------------------------------------------

export interface FakeState {
  id: string;
  name: string;
}

export interface FakeIssue {
  id: string;
  identifier: string;
  title: string;
  stateId: string;
  description?: string;
  labelIds?: string[];
}

/** A label: a team's own, or the workspace's (team null). */
export interface FakeLabel {
  id: string;
  name: string;
  team: { id: string } | null;
}

export interface FakeRequest {
  authorization: string | null;
  query: string;
  variables: Record<string, unknown>;
}

export interface RawResponse {
  status: number;
  body: string;
  contentType?: string;
  /** Send the headers and body, then never finish the body. */
  stall?: boolean;
  /** Send the headers and body, then drop the connection mid-body. */
  reset?: boolean;
}

export interface LinearFake {
  url: string;
  token: string;
  issues: FakeIssue[];
  states: FakeState[];
  labels: FakeLabel[];
  comments: { id: string; issueId: string; body: string }[];
  requests: FakeRequest[];
  /** Raw responses to send, in order, before answering normally again. */
  queue: RawResponse[];
  close(): Promise<void>;
}

export const FAKE_TOKEN = "lin_api_fake_token_for_tests";
export const ISSUE_UUID = "5b0e7a52-3f0c-4d8e-9a51-2c7d4a1e9b10";
export const OTHER_UUID = "0f1e2d3c-4b5a-4968-8776-a5b4c3d2e1f0";
/** The team the fake's issues belong to and create files in. */
export const TEAM_ID = "team-gw";

export function linearFake(token = FAKE_TOKEN): LinearFake {
  const states: FakeState[] = [
    { id: "state-todo", name: "Todo" },
    { id: "state-progress", name: "In Progress" },
    { id: "state-review", name: "In Review" },
    { id: "state-done", name: "Done" },
  ];
  const issues: FakeIssue[] = [
    {
      id: ISSUE_UUID,
      identifier: "GW-16",
      title: "Linear adapter",
      stateId: "state-todo",
    },
  ];
  const labels: FakeLabel[] = [
    { id: "label-bug", name: "Bug", team: { id: TEAM_ID } },
    { id: "label-feature", name: "Feature", team: null },
    { id: "label-elsewhere", name: "Elsewhere", team: { id: "team-other" } },
  ];
  const comments: LinearFake["comments"] = [];
  const requests: FakeRequest[] = [];
  const queue: RawResponse[] = [];
  const stalled = new Set<ReadableStreamDefaultController<Uint8Array>>();

  const streamOf = (queued: RawResponse) =>
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(queued.body));
        if (queued.reset) {
          setTimeout(
            () => controller.error(new Error("linear_fake: reset")),
            10,
          );
        } else {
          stalled.add(controller);
        }
      },
    });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  const error = (message: string, code: string, status = 200) =>
    json({ data: null, errors: [{ message, extensions: { code } }] }, status);
  const find = (ref: unknown) =>
    issues.find((i) => i.id === ref || i.identifier === ref);
  const stateOf = (issue: FakeIssue) =>
    states.find((s) => s.id === issue.stateId)!;
  const urlOf = (issue: FakeIssue) =>
    `https://linear.app/fake/issue/${issue.identifier}`;
  const notFound = () => error("Entity not found: Issue", "INVALID_INPUT", 200);

  const server = Deno.serve(
    { hostname: "127.0.0.1", port: 0, onListen: () => {} },
    async (request) => {
      const raw = await request.json() as {
        query: string;
        variables?: Record<string, unknown>;
      };
      const variables = raw.variables ?? {};
      requests.push({
        authorization: request.headers.get("Authorization"),
        query: raw.query,
        variables,
      });
      const queued = queue.shift();
      if (queued !== undefined) {
        const partial = queued.stall === true || queued.reset === true;
        return new Response(partial ? streamOf(queued) : queued.body, {
          status: queued.status,
          headers: { "Content-Type": queued.contentType ?? "text/plain" },
        });
      }
      if (request.headers.get("Authorization") !== token) {
        return error("Authentication required", "AUTHENTICATION_ERROR", 400);
      }
      const query = raw.query;
      if (query.includes("issueLabels")) {
        const name = variables.name;
        return json({
          data: {
            issueLabels: {
              nodes: labels.filter((l) =>
                name === undefined || l.name === name
              ),
            },
          },
        });
      }
      if (query.includes("issueCreate")) {
        const input = (variables.input ?? {}) as {
          teamId?: unknown;
          title?: unknown;
          description?: unknown;
          labelIds?: unknown;
        };
        if (input.teamId !== TEAM_ID) {
          return error("Entity not found: Team", "INVALID_INPUT", 200);
        }
        const labelIds = Array.isArray(input.labelIds) ? input.labelIds : [];
        if (labelIds.some((id) => !labels.some((l) => l.id === id))) {
          return error("Entity not found: IssueLabel", "INVALID_INPUT", 200);
        }
        if (typeof input.title !== "string" || input.title === "") {
          return error("title must not be empty", "INVALID_INPUT", 400);
        }
        const issue: FakeIssue = {
          id: crypto.randomUUID(),
          identifier: `GW-${16 + issues.length}`,
          title: input.title,
          stateId: "state-todo",
          description: typeof input.description === "string"
            ? input.description
            : undefined,
          labelIds: labelIds as string[],
        };
        issues.push(issue);
        return json({
          data: {
            issueCreate: {
              success: true,
              issue: {
                id: issue.id,
                identifier: issue.identifier,
                title: issue.title,
                url: urlOf(issue),
                state: stateOf(issue),
              },
            },
          },
        });
      }
      if (query.includes("commentCreate")) {
        const issue = find(variables.issueId);
        if (issue === undefined) return notFound();
        const id = `comment-${comments.length + 1}`;
        comments.push({ id, issueId: issue.id, body: String(variables.body) });
        return json({
          data: {
            commentCreate: {
              success: true,
              comment: { id, url: `${urlOf(issue)}#comment-${id}` },
            },
          },
        });
      }
      if (query.includes("issueUpdate")) {
        const issue = find(variables.id);
        if (issue === undefined) return notFound();
        const state = states.find((s) => s.id === variables.stateId);
        if (state === undefined) {
          return error("Invalid stateId", "INVALID_INPUT", 400);
        }
        issue.stateId = state.id;
        return json({
          data: { issueUpdate: { success: true, issue: { state } } },
        });
      }
      if (query.includes("issue(")) {
        const issue = find(variables.id);
        if (issue === undefined) return notFound();
        return json({
          data: {
            issue: {
              id: issue.id,
              identifier: issue.identifier,
              title: issue.title,
              url: urlOf(issue),
              state: stateOf(issue),
              team: { states: { nodes: states } },
            },
          },
        });
      }
      return error("Cannot query this operation", "GRAPHQL_VALIDATION", 400);
    },
  );
  const { port } = server.addr as Deno.NetAddr;
  return {
    url: `http://127.0.0.1:${port}/graphql`,
    token,
    issues,
    states,
    labels,
    comments,
    requests,
    queue,
    close: () => {
      for (const controller of stalled) {
        try {
          controller.close();
        } catch {
          // Already cancelled when the client gave up.
        }
      }
      stalled.clear();
      return server.shutdown();
    },
  };
}
