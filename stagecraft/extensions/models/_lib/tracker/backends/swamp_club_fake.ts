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
// assignees, post attestations or lifecycle entries, or change a type (an
// author may too, within limits the fake leaves out); a lifecycle entry's
// targetStatus is only a label, and a classified entry with isRegression
// sets or clears the regression flag; a status moves one step forward at a time
// and a refused move is a 422 with the aggregate's message; errors are
// {"error": message}. Relationships follow lib/app/lab/manage-relationships.ts:
// only an admin may add blocked_by; a member may add parent_of only to a child
// they filed, related_to and duplicate_of only from an issue they filed, and
// remove only what they added (403 otherwise); the invariants (no self link,
// one parent, no parent cycle, one canonical, no duplicate chain) are 422s;
// adding one that exists returns it; a removal is a 204. A test can queue raw
// responses to exercise malformed ones. Never the live service.
// ---------------------------------------------------------------------------

export interface FakeLabIssue {
  number: number;
  title: string;
  status: string;
  assignees: { userId: string; username: string }[];
  body?: string;
  type?: string;
  authorId?: string;
  authorUsername?: string;
  isRegression?: boolean;
  githubPrUrl?: string;
  githubPrNumber?: number;
}

export interface FakeLabEntry {
  id: string;
  issue: number;
  step: string;
  targetStatus: string;
  summary: string;
  emoji: string;
  payload: Record<string, unknown>;
  isVerbose: boolean;
}

export interface FakeLabRelationship {
  id: string;
  type: string;
  sourceIssueNumber: number;
  targetIssueNumber: number;
  createdByUserId: string;
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
  comments: { id: string; issue: number; body: string; author: string }[];
  /** Lifecycle entries, in the order they were posted. */
  entries: FakeLabEntry[];
  attestations: Record<string, unknown>[];
  relationships: FakeLabRelationship[];
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
const RELATIONSHIP_TYPES = [
  "parent_of",
  "blocked_by",
  "related_to",
  "duplicate_of",
];
const TYPES = ["feature", "bug", "security", "platform"];

export function swampClubFake(): SwampClubFake {
  const issues: FakeLabIssue[] = [
    {
      number: LAB_ISSUE,
      title: "Lab adapter",
      status: "open",
      assignees: [],
      body: "Adapt the Lab.",
      type: "feature",
      authorId: "user-outsider",
      authorUsername: "outsider",
    },
  ];
  const team = [
    { userId: "user-seth", username: "seth" },
    { userId: "user-ape", username: "skunk-ape" },
  ];
  const comments: SwampClubFake["comments"] = [];
  const entries: FakeLabEntry[] = [];
  const attestations: Record<string, unknown>[] = [];
  const relationships: FakeLabRelationship[] = [];
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
    if (body.type !== undefined) {
      if (typeof body.type !== "string" || !TYPES.includes(body.type)) {
        return error(
          "Invalid type. Must be feature, bug, security, or platform.",
          400,
        );
      }
      if (!admin) return error("Forbidden", 403);
      issue.type = body.type;
    }
    // As issue-lifecycle's fake keeps it: the number only beside a url.
    if (typeof body.githubPrUrl === "string") {
      issue.githubPrUrl = body.githubPrUrl;
      if (typeof body.githubPrNumber === "number") {
        issue.githubPrNumber = body.githubPrNumber;
      }
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

  const relationshipsOf = (number: number) =>
    relationships.filter((r) =>
      r.sourceIssueNumber === number || r.targetIssueNumber === number
    ).map((r) => ({
      ...r,
      direction: r.sourceIssueNumber === number ? "outgoing" : "incoming",
    }));

  const userOf = (role: string) =>
    role === "admin" ? "user-seth" : "user-member";

  function relationshipCall(
    method: string,
    number: number,
    body: unknown,
    role: string | null,
  ): Response {
    if (role === null) return error("Unauthorized", 401);
    const admin = role === "admin";
    const data = (typeof body === "object" && body !== null ? body : {}) as {
      type?: unknown;
      targetIssueNumber?: unknown;
      relationshipId?: unknown;
    };
    const source = issues.find((i) => i.number === number);
    if (method === "DELETE") {
      if (typeof data.relationshipId !== "string") {
        return error("relationshipId must be a string", 400);
      }
      if (source === undefined) return error("Issue not found", 404);
      const at = relationships.findIndex((r) => r.id === data.relationshipId);
      if (at < 0) return error("Relationship not found.", 422);
      if (!admin && relationships[at].createdByUserId !== userOf(role)) {
        return error("You can only remove relationships you created.", 403);
      }
      relationships.splice(at, 1);
      return new Response(null, { status: 204 });
    }
    if (method !== "POST") return error("Method not allowed", 405);
    const type = data.type;
    if (typeof type !== "string" || !RELATIONSHIP_TYPES.includes(type)) {
      return error(
        "type must be parent_of, blocked_by, related_to, or duplicate_of",
        400,
      );
    }
    const targetNumber = data.targetIssueNumber;
    if (typeof targetNumber !== "number" || targetNumber < 1) {
      return error("targetIssueNumber must be a positive number", 400);
    }
    if (source === undefined) return error("Issue not found", 404);
    const target = issues.find((i) => i.number === targetNumber);
    if (target === undefined) {
      return error(`Issue #${targetNumber} not found.`, 422);
    }
    const mine = (issue: FakeLabIssue) => issue.authorId === userOf(role);
    if (type === "blocked_by" && !admin) {
      return error("Only admins can create blocked_by relationships.", 403);
    }
    if (type === "parent_of" && !admin && !mine(target)) {
      return error(
        "You can only mark your own issue as a child of another issue.",
        403,
      );
    }
    if (
      (type === "related_to" || type === "duplicate_of") && !admin &&
      !mine(source)
    ) {
      return error("You can only relate your own issues.", 403);
    }
    if (source.number === target.number) {
      return error(
        "Cannot create a relationship between an issue and itself.",
        422,
      );
    }
    const of = (t: string) => relationships.filter((r) => r.type === t);
    if (type === "parent_of") {
      if (of("parent_of").some((r) => r.targetIssueNumber === target.number)) {
        return error(
          "Issue already has a parent. Remove the existing parent relationship first.",
          422,
        );
      }
      const seen = new Set([target.number]);
      let current = source.number;
      for (let depth = 0; depth < 10; depth++) {
        const up = of("parent_of").find((r) => r.targetIssueNumber === current);
        if (up === undefined) break;
        current = up.sourceIssueNumber;
        if (seen.has(current)) {
          return error(
            "Cannot create relationship: would form a circular parent chain.",
            422,
          );
        }
        seen.add(current);
      }
    }
    if (type === "duplicate_of") {
      const duplicates = of("duplicate_of");
      const other = duplicates.find((r) =>
        r.sourceIssueNumber === source.number &&
        r.targetIssueNumber !== target.number
      );
      if (other !== undefined) {
        return error(
          `Issue is already a duplicate of #${other.targetIssueNumber}. Remove that link first.`,
          422,
        );
      }
      const chain = duplicates.find((r) =>
        r.sourceIssueNumber === target.number
      );
      if (chain !== undefined) {
        return error(
          `Issue #${chain.sourceIssueNumber} is a duplicate of #${chain.targetIssueNumber}.`,
          422,
        );
      }
      if (duplicates.some((r) => r.targetIssueNumber === source.number)) {
        return error(
          "Issues are duplicates of this issue. Re-point them.",
          422,
        );
      }
    }
    const existing = relationships.find((r) =>
      r.type === type && r.sourceIssueNumber === source.number &&
      r.targetIssueNumber === target.number
    );
    if (existing !== undefined) {
      return json({ relationship: existing, events: [] }, 201);
    }
    const relationship: FakeLabRelationship = {
      id: crypto.randomUUID(),
      type,
      sourceIssueNumber: source.number,
      targetIssueNumber: target.number,
      createdByUserId: userOf(role),
    };
    relationships.push(relationship);
    return json({ relationship, events: [] }, 201);
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
      if (pathname === "/api/v1/lab/issues" && request.method === "POST") {
        // swamp-club's handleCreateIssue: any signed-in user may file a
        // feature, bug or security issue; an admin may also file platform.
        if (role === null) return error("Unauthorized", 401);
        const draft =
          (typeof body === "object" && body !== null ? body : {}) as Record<
            string,
            unknown
          >;
        if (
          !("type" in draft) || !("title" in draft) || !("body" in draft)
        ) {
          return error("Missing required fields: type, title, body", 400);
        }
        const allowed = admin ? TYPES : TYPES.filter((t) => t !== "platform");
        if (typeof draft.type !== "string" || !allowed.includes(draft.type)) {
          return error("Invalid type. Must be feature, bug, or security.", 400);
        }
        if (typeof draft.title !== "string" || draft.title.trim() === "") {
          return error("Title must be a non-empty string", 400);
        }
        if (typeof draft.body !== "string" || draft.body.trim() === "") {
          return error("Body must be a non-empty string", 400);
        }
        const created: FakeLabIssue = {
          number: Math.max(...issues.map((i) => i.number)) + 1,
          title: draft.title.trim(),
          status: "open",
          assignees: [],
          body: draft.body,
          type: draft.type,
          authorId: admin ? "user-seth" : "user-member",
          authorUsername: admin ? "seth" : "member",
        };
        issues.push(created);
        return json({ issue: created, audience: "public" }, 201);
      }
      const match =
        /^\/api\/v1\/lab\/issues\/([^/]+)(\/comments|\/lifecycle|\/relationships)?$/
          .exec(
            pathname,
          );
      if (match === null) return error("Not found", 404);
      const number = Number(match[1]);
      if (!Number.isInteger(number) || number <= 0) {
        return error("Invalid issue number", 400);
      }
      const issue = issues.find((i) => i.number === number);
      if (match[2] === "/lifecycle") {
        if (request.method !== "POST") return error("Method not allowed", 405);
        if (role === null) return error("Unauthorized", 401);
        if (!admin) return error("Forbidden", 403);
        const entry =
          (typeof body === "object" && body !== null ? body : {}) as Record<
            string,
            unknown
          >;
        const text = (field: string, max: number) =>
          typeof entry[field] === "string" &&
          (entry[field] as string).trim() !== "" &&
          (entry[field] as string).length <= max;
        if (!text("step", 100)) {
          return error("Missing required field: step", 400);
        }
        if (
          typeof entry.targetStatus !== "string" ||
          !STATUSES.includes(entry.targetStatus)
        ) {
          return error(
            "Invalid targetStatus \u2014 must be a valid issue status",
            400,
          );
        }
        if (!text("summary", 2000)) {
          return error("Missing required field: summary", 400);
        }
        if (!text("emoji", 32)) {
          return error("Missing required field: emoji", 400);
        }
        const payload = entry.payload;
        if (
          typeof payload !== "object" || payload === null ||
          Array.isArray(payload)
        ) {
          return error(
            "Missing required field: payload (must be an object)",
            400,
          );
        }
        if (/"\$/.test(JSON.stringify(payload))) {
          return error("payload keys must not start with $", 400);
        }
        if (issue === undefined) return error("Issue not found", 404);
        const stored: FakeLabEntry = {
          id: crypto.randomUUID(),
          issue: number,
          step: (entry.step as string).trim(),
          targetStatus: entry.targetStatus,
          summary: (entry.summary as string).trim(),
          emoji: (entry.emoji as string).trim(),
          payload: payload as Record<string, unknown>,
          isVerbose: entry.isVerbose === true,
        };
        const flag = (payload as { isRegression?: unknown }).isRegression;
        if (stored.step === "classified" && typeof flag === "boolean") {
          issue.isRegression = flag;
        }
        entries.push(stored);
        return json(stored, 201);
      }
      if (match[2] === "/relationships") {
        return relationshipCall(request.method, number, body, role);
      }
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
        const author = admin ? "seth" : "member";
        comments.push({ id, issue: number, body: comment.trim(), author });
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
        return json({
          issue,
          comments: comments.filter((c) => c.issue === number).map((c) => ({
            id: c.id,
            authorUsername: c.author,
            body: c.body,
            createdAt: "2026-09-29T00:00:00.000Z",
          })),
          lifecycleEntries: entries.filter((e) => e.issue === number),
          relationships: relationshipsOf(number),
        });
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
    entries,
    attestations,
    relationships,
    requests,
    queue,
    close: () => server.shutdown(),
  };
  return fake;
}
