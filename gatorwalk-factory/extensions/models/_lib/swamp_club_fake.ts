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
// A local stand-in for swamp-club's Lab API, for tests only: a Deno.serve on
// 127.0.0.1 and a free port. It follows swamp-club's routes (checked against
// its source at ec005fc0): a Bearer key not starting with swamp_ is ignored,
// so the caller is anonymous; anonymous callers may read an issue but not
// write; only an admin may move a status past open or closed, assign, list
// assignees or post attestations; a status moves one step forward at a time
// and a refused move is a 422 with the aggregate's message; errors are
// {"error": message}. A test can queue raw responses to exercise malformed
// ones. Never the live service.
// ---------------------------------------------------------------------------

export interface FakeLabIssue {
  number: number;
  title: string;
  status: string;
  assignees: { userId: string; username: string }[];
}

export interface FakeLabRequest {
  method: string;
  path: string;
  authorization: string | null;
  body: unknown;
}

export interface RawResponse {
  status: number;
  body: string;
  contentType?: string;
  headers?: Record<string, string>;
}

export interface SwampClubFake {
  url: string;
  /** An admin's key. */
  adminKey: string;
  /** A key for a user who is not an admin. */
  memberKey: string;
  issues: FakeLabIssue[];
  /** The eligible assignees (swamp-club's team). */
  team: { userId: string; username: string }[];
  comments: { id: string; issue: number; body: string }[];
  attestations: Record<string, unknown>[];
  requests: FakeLabRequest[];
  /** Raw responses to send, in order, before answering normally again. */
  queue: RawResponse[];
  /** Asked about every request after the queue; a response it gives is sent. */
  respond?: (request: FakeLabRequest) => RawResponse | undefined;
  close(): Promise<void>;
}

export const ADMIN_KEY = "swamp_fake_admin_key_for_tests";
export const MEMBER_KEY = "swamp_fake_member_key_for_tests";
export const LAB_ISSUE = 2631;
export const MISSING_ISSUE = 999999;

const NEXT: Record<string, string> = {
  open: "triaged",
  triaged: "in_progress",
  in_progress: "shipped",
};
const VERB: Record<string, string> = {
  triaged: "triage",
  in_progress: "start work on",
  shipped: "ship",
};
const STATUSES = ["open", "triaged", "in_progress", "shipped", "closed"];

export function swampClubFake(): SwampClubFake {
  const issues: FakeLabIssue[] = [
    { number: LAB_ISSUE, title: "Lab adapter", status: "open", assignees: [] },
  ];
  const team = [
    { userId: "user-seth", username: "seth" },
    { userId: "user-ape", username: "skunk-ape" },
  ];
  const comments: SwampClubFake["comments"] = [];
  const attestations: Record<string, unknown>[] = [];
  const requests: FakeLabRequest[] = [];
  const queue: RawResponse[] = [];

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  const error = (message: string, status: number) =>
    json({ error: message }, status);
  const roleOf = (authorization: string | null) => {
    const key = authorization?.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length)
      : null;
    if (key === null || !key.startsWith("swamp_")) return null;
    if (key === ADMIN_KEY) return "admin";
    if (key === MEMBER_KEY) return "member";
    return null;
  };

  function patch(
    issue: FakeLabIssue,
    body: Record<string, unknown>,
    admin: boolean,
  ) {
    if (body.assignees !== undefined) {
      if (!admin) return error("Forbidden", 403);
      const ids = body.assignees;
      if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) {
        return error("assignees must be an array of user IDs", 400);
      }
      const members = ids.map((id) => team.find((t) => t.userId === id));
      if (members.some((m) => m === undefined)) {
        return error("One or more assignee IDs are not eligible", 400);
      }
      issue.assignees = members.map((m) => ({ ...m! }));
    }
    if (body.status !== undefined) {
      const status = body.status;
      if (typeof status !== "string" || !STATUSES.includes(status)) {
        return error("Invalid status transition", 400);
      }
      if (!admin && status !== "open" && status !== "closed") {
        return error("Forbidden", 403);
      }
      if (status === "closed") {
        if (issue.status === "shipped" || issue.status === "closed") {
          return error(`Cannot close issue in status "${issue.status}"`, 422);
        }
      } else if (status === "open") {
        if (issue.status !== "closed") {
          return error(
            `Cannot reopen issue in status "${issue.status}". Expected "closed".`,
            422,
          );
        }
      } else if (NEXT[issue.status] !== status) {
        const expected = Object.keys(NEXT).find((k) => NEXT[k] === status);
        return error(
          `Cannot ${VERB[status]} issue in status "${issue.status}". ` +
            `Expected "${expected}".`,
          422,
        );
      }
      issue.status = status;
    }
    return json({ issue, events: [] });
  }

  const server = Deno.serve(
    { hostname: "127.0.0.1", port: 0, onListen: () => {} },
    async (request) => {
      const { pathname } = new URL(request.url);
      const text = await request.text();
      let body: unknown = undefined;
      if (text !== "") {
        try {
          body = JSON.parse(text);
        } catch {
          body = text;
        }
      }
      const authorization = request.headers.get("Authorization");
      const seen = {
        method: request.method,
        path: pathname,
        authorization,
        body,
      };
      requests.push(seen);
      const queued = queue.shift() ?? fake.respond?.(seen);
      if (queued !== undefined) {
        return new Response(queued.body, {
          status: queued.status,
          headers: {
            "Content-Type": queued.contentType ?? "text/plain",
            ...queued.headers,
          },
        });
      }
      const role = roleOf(authorization);
      const admin = role === "admin";

      if (pathname === "/api/v1/lab/assignees" && request.method === "GET") {
        if (role === null) return error("Unauthorized", 401);
        if (!admin) return error("Forbidden", 403);
        return json({ assignees: team });
      }
      if (
        pathname === "/api/v1/admin/attestations" && request.method === "POST"
      ) {
        if (role === null) return error("Unauthorized", 401);
        if (!admin) return error("Forbidden", 403);
        const commit = (body as { subject?: { commit?: unknown } } | undefined)
          ?.subject?.commit;
        if (typeof commit !== "string" || !/^[0-9a-f]{40}$/.test(commit)) {
          return error("subject.commit must be a 40-char hex string", 400);
        }
        // swamp-club inserts every POST; it never dedupes by commit.
        const stored = {
          ...(body as Record<string, unknown>),
          id: crypto.randomUUID(),
          postedBy: "user-seth",
          postedAt: new Date().toISOString(),
        };
        attestations.push(stored);
        return json(stored, 201);
      }
      const match = /^\/api\/v1\/lab\/issues\/([^/]+)(\/comments)?$/.exec(
        pathname,
      );
      if (match === null) return error("Not found", 404);
      const number = Number(match[1]);
      if (!Number.isInteger(number) || number <= 0) {
        return error("Invalid issue number", 400);
      }
      const issue = issues.find((i) => i.number === number);
      if (match[2] === "/comments") {
        if (request.method !== "POST") return error("Method not allowed", 405);
        if (role === null) return error("Unauthorized", 401);
        const comment = (body as { body?: unknown } | undefined)?.body;
        if (typeof comment !== "string") {
          return error("Missing required field: body", 400);
        }
        if (comment.trim() === "") {
          return error("Comment body must not be empty", 400);
        }
        if (issue === undefined) return error("Issue not found", 404);
        const id = crypto.randomUUID();
        comments.push({ id, issue: number, body: comment.trim() });
        return json({
          id,
          issueId: `issue-${number}`,
          authorId: admin ? "user-seth" : "user-member",
          body: comment.trim(),
          createdAt: new Date().toISOString(),
        }, 201);
      }
      if (issue === undefined) return error("Issue not found", 404);
      if (request.method === "GET") {
        // Reads need no key, as on swamp-club.
        return json({ issue, comments: [], lifecycleEntries: [] });
      }
      if (request.method === "PATCH") {
        if (role === null) return error("Unauthorized", 401);
        if (typeof body !== "object" || body === null) {
          return error("Invalid JSON", 400);
        }
        return patch(issue, body as Record<string, unknown>, admin);
      }
      return error("Method not allowed", 405);
    },
  );
  const { port } = server.addr as Deno.NetAddr;
  const fake: SwampClubFake = {
    url: `http://127.0.0.1:${port}`,
    adminKey: ADMIN_KEY,
    memberKey: MEMBER_KEY,
    issues,
    team,
    comments,
    attestations,
    requests,
    queue,
    close: () => server.shutdown(),
  };
  return fake;
}
