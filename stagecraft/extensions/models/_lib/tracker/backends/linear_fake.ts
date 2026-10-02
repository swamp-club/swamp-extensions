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
// "Entity not found"). Relations are Linear's: a parent field, and
// blocks/duplicate/related links, none of them checked for anything (Linear
// keeps no rule against a second canonical or a duplicate chain, and a new
// parent replaces the old). An issue has one assignee, and the viewer is
// the token's own user. A test can queue raw responses to exercise malformed
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
  parentId?: string | null;
  assigneeId?: string | null;
}

/** A workspace user. */
export interface FakeUser {
  id: string;
  name: string;
  displayName: string;
}

/** A Linear issue relation: `issueId type relatedIssueId`. */
export interface FakeRelation {
  id: string;
  type: "blocks" | "duplicate" | "related" | "similar";
  issueId: string;
  relatedIssueId: string;
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
  /** The workspace's users; the first is the token's own, the viewer. */
  users: FakeUser[];
  comments: { id: string; issueId: string; body: string }[];
  relations: FakeRelation[];
  requests: FakeRequest[];
  /** Raw responses to send, in order, before answering normally again. */
  queue: RawResponse[];
  close(): Promise<void>;
}

export const FAKE_TOKEN = "lin_api_fake_token_for_tests";
export const ISSUE_UUID = "5b0e7a52-3f0c-4d8e-9a51-2c7d4a1e9b10";
export const OTHER_UUID = "0f1e2d3c-4b5a-4968-8776-a5b4c3d2e1f0";
/** The token's own user, the viewer. */
export const VIEWER_ID = "b0b0b0b0-1111-4222-8333-444455556666";
export const OTHER_USER_ID = "c1c1c1c1-1111-4222-8333-444455556666";
/** The team the fake's issues belong to and create files in. */
export const TEAM_ID = "team-gw";

export function linearFake(token = FAKE_TOKEN): LinearFake {
  const states: FakeState[] = [
    { id: "state-todo", name: "Todo" },
    { id: "state-progress", name: "In Progress" },
    { id: "state-review", name: "In Review" },
    { id: "state-done", name: "Done" },
    // Linear's reserved status, which marking a duplicate moves an issue to.
    { id: "state-duplicate", name: "Duplicate" },
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
  const users: FakeUser[] = [
    { id: VIEWER_ID, name: "Pat Viewer", displayName: "pat" },
    { id: OTHER_USER_ID, name: "Sam Other", displayName: "sam" },
  ];
  const comments: LinearFake["comments"] = [];
  const relations: FakeRelation[] = [];
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
  const ref = (issue: FakeIssue) => ({
    id: issue.id,
    identifier: issue.identifier,
  });
  const byId = (id: string) => issues.find((i) => i.id === id)!;
  const assigneeOf = (issue: FakeIssue) =>
    users.find((u) => u.id === issue.assigneeId) ?? null;

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
      if (query.includes("viewer")) {
        return json({ data: { viewer: users[0] } });
      }
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
                assignee: assigneeOf(issue),
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
      if (query.includes("issueRelationCreate")) {
        const input = (variables.input ?? {}) as {
          issueId?: unknown;
          relatedIssueId?: unknown;
          type?: unknown;
        };
        const issue = find(input.issueId);
        const related = find(input.relatedIssueId);
        if (issue === undefined || related === undefined) return notFound();
        if (
          !["blocks", "duplicate", "related", "similar"].includes(
            String(input.type),
          )
        ) {
          return error("Invalid relation type", "INVALID_INPUT", 400);
        }
        const relation: FakeRelation = {
          id: crypto.randomUUID(),
          type: input.type as FakeRelation["type"],
          issueId: issue.id,
          relatedIssueId: related.id,
        };
        relations.push(relation);
        if (relation.type === "duplicate") issue.stateId = "state-duplicate";
        return json({
          data: {
            issueRelationCreate: {
              success: true,
              issueRelation: { id: relation.id },
            },
          },
        });
      }
      if (query.includes("issueRelationDelete")) {
        const at = relations.findIndex((r) => r.id === variables.id);
        if (at < 0) {
          return error("Entity not found: IssueRelation", "INVALID_INPUT", 200);
        }
        relations.splice(at, 1);
        return json({ data: { issueRelationDelete: { success: true } } });
      }
      if (query.includes("issueUpdate") && "parentId" in variables) {
        const issue = find(variables.id);
        if (issue === undefined) return notFound();
        if (
          variables.parentId !== null && find(variables.parentId) === undefined
        ) {
          return notFound();
        }
        issue.parentId = variables.parentId as string | null;
        return json({ data: { issueUpdate: { success: true } } });
      }
      if (query.includes("issueUpdate") && "assigneeId" in variables) {
        const issue = find(variables.id);
        if (issue === undefined) return notFound();
        if (!users.some((u) => u.id === variables.assigneeId)) {
          // Linear's own wording, seen live.
          return error(
            "Entity not found in validateAccess: assigneeId",
            "INVALID_INPUT",
            200,
          );
        }
        issue.assigneeId = variables.assigneeId as string;
        return json({
          data: {
            issueUpdate: {
              success: true,
              issue: { assignee: assigneeOf(issue) },
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
              assignee: assigneeOf(issue),
              team: { states: { nodes: states } },
              parent: issue.parentId ? ref(byId(issue.parentId)) : null,
              children: {
                nodes: issues.filter((i) => i.parentId === issue.id).map(ref),
              },
              relations: {
                nodes: relations.filter((r) => r.issueId === issue.id).map((
                  r,
                ) => ({
                  id: r.id,
                  type: r.type,
                  relatedIssue: ref(byId(r.relatedIssueId)),
                })),
              },
              inverseRelations: {
                nodes: relations.filter((r) => r.relatedIssueId === issue.id)
                  .map((r) => ({
                    id: r.id,
                    type: r.type,
                    issue: ref(byId(r.issueId)),
                  })),
              },
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
    users,
    comments,
    relations,
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
