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

import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import {
  type Comment,
  commentBody,
  findOwnComment,
  run,
} from "./post_pr_comment.ts";

const HEAD = "a".repeat(40);
const NEWER = "b".repeat(40);
const BOT = "swamp-bot";

/** An in-memory Forgejo holding one pull request, #7 in owner/repo. */
class FakeForgejo {
  head = HEAD;
  comments: Comment[] = [];
  requests: string[] = [];
  /** A request line ("GET /user") answered with HTTP 500. */
  failing: string | undefined;
  #nextId = 100;

  handle = async (req: Request): Promise<Response> => {
    const path = new URL(req.url).pathname.replace(/^\/api\/v1/, "");
    const line = `${req.method} ${path}`;
    this.requests.push(line);
    if (req.headers.get("Authorization") !== "token secret") {
      return new Response("unauthorized", { status: 401 });
    }
    if (line === this.failing) {
      return new Response("boom\n::error::not a command", { status: 500 });
    }
    if (line === "GET /repos/owner/repo/pulls/7") {
      return Response.json({ number: 7, head: { sha: this.head } });
    }
    if (line === "GET /user") return Response.json({ login: BOT });
    if (line === "GET /repos/owner/repo/issues/7/comments") {
      return Response.json(this.comments);
    }
    if (line === "POST /repos/owner/repo/issues/7/comments") {
      const { body } = await req.json();
      const comment = { id: this.#nextId++, body, user: { login: BOT } };
      this.comments.push(comment);
      return Response.json(comment, { status: 201 });
    }
    const patch = line.match(
      /^PATCH \/repos\/owner\/repo\/issues\/comments\/(\d+)$/,
    );
    if (patch) {
      const comment = this.comments.find((c) => c.id === Number(patch[1]));
      if (!comment) return new Response("not found", { status: 404 });
      comment.body = (await req.json()).body;
      return Response.json(comment);
    }
    return new Response("not found", { status: 404 });
  };
}

/** Runs `fn` with a fake Forgejo served on a free local port. */
async function withForgejo(
  fn: (forgejo: FakeForgejo, api: string, dir: string) => Promise<void>,
): Promise<void> {
  const forgejo = new FakeForgejo();
  const server = Deno.serve(
    { port: 0, hostname: "127.0.0.1", onListen: () => {} },
    forgejo.handle,
  );
  const dir = await Deno.makeTempDir({ prefix: "post_pr_comment_" });
  try {
    await fn(forgejo, `http://127.0.0.1:${server.addr.port}/api/v1`, dir);
  } finally {
    await server.shutdown();
    await Deno.remove(dir, { recursive: true });
  }
}

function argv(api: string, file: string, marker = "validate-attestation") {
  return [
    "--api",
    api,
    "--file",
    file,
    "--marker",
    marker,
    "--repo",
    "owner/repo",
    "--pr",
    "7",
    "--commit",
    HEAD,
  ];
}

Deno.test("commentBody: starts with the marker and names the commit", () => {
  assertEquals(
    commentBody("review-integrity", HEAD, "## Result\n\n"),
    `<!-- review-integrity -->\n**Commit** \`${HEAD}\`\n\n## Result\n`,
  );
});

Deno.test("findOwnComment: only this account's comment with this job's marker", () => {
  const mine = commentBody("validate-attestation", HEAD, "ok");
  const comments: Comment[] = [
    { id: 1, body: mine, user: { login: "someone" } },
    { id: 2, body: `hello\n${mine}`, user: { login: BOT } },
    {
      id: 3,
      body: commentBody("review-integrity", HEAD, "ok"),
      user: { login: BOT },
    },
    { id: 4, body: mine.replaceAll("\n", "\r\n"), user: { login: BOT } },
    { id: 5, body: mine, user: null },
  ];
  assertEquals(findOwnComment(comments, BOT, "validate-attestation")?.id, 4);
  assertEquals(findOwnComment(comments, BOT, "review-integrity")?.id, 3);
  assertEquals(findOwnComment(comments, BOT, "other"), undefined);
});

Deno.test("run: creates the comment, then updates it in place", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const file = `${dir}/result.md`;
    // Someone else's comment carrying the marker is not ours to edit.
    forgejo.comments.push({
      id: 1,
      body: commentBody("validate-attestation", HEAD, "planted"),
      user: { login: "someone" },
    });

    await Deno.writeTextFile(file, "first\n");
    assertEquals(await run(argv(api, file), "secret"), "Comment created.");
    await Deno.writeTextFile(file, "second\n");
    assertEquals(await run(argv(api, file), "secret"), "Comment updated.");

    assertEquals(forgejo.comments.length, 2);
    assertStringIncludes(forgejo.comments[0].body, "planted");
    assertEquals(
      forgejo.comments[1].body,
      commentBody("validate-attestation", HEAD, "second"),
    );
  });
});

Deno.test("run: a malformed item in the comment list is skipped", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const file = `${dir}/result.md`;
    await Deno.writeTextFile(file, "result\n");
    // No body: the list is the server's, and one bad item must not stop the post.
    forgejo.comments.push(
      { id: 1, user: { login: BOT } } as unknown as Comment,
    );
    assertEquals(await run(argv(api, file), "secret"), "Comment created.");
    assertEquals(forgejo.comments.length, 2);
  });
});

Deno.test("run: each job keeps its own comment", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const file = `${dir}/result.md`;
    await Deno.writeTextFile(file, "result\n");
    for (const marker of ["validate-attestation", "review-integrity"]) {
      await run(argv(api, file, marker), "secret");
      await run(argv(api, file, marker), "secret");
    }
    assertEquals(forgejo.comments.length, 2);
    assert(
      forgejo.comments[0].body.startsWith("<!-- validate-attestation -->"),
    );
    assert(forgejo.comments[1].body.startsWith("<!-- review-integrity -->"));
  });
});

Deno.test("run: a run the head has moved past posts nothing", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const file = `${dir}/result.md`;
    await Deno.writeTextFile(file, "stale\n");
    forgejo.head = NEWER;
    const line = await run(argv(api, file), "secret");
    assertStringIncludes(line, "A newer push");
    assertEquals(forgejo.requests, ["GET /repos/owner/repo/pulls/7"]);
    assertEquals(forgejo.comments, []);
  });
});

Deno.test("run: an API failure is a warning naming the call", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const file = `${dir}/result.md`;
    await Deno.writeTextFile(file, "result\n");
    forgejo.failing = "GET /user";
    const line = await run(argv(api, file), "secret");
    assert(line.startsWith("::warning::"), line);
    assertStringIncludes(line, "GET /user failed (HTTP 500)");
    // The server's text stays on the warning's line.
    assertEquals(line.split("\n").length, 1);
    assertStringIncludes(line, "boom%0A::error::not a command");
    assertEquals(forgejo.comments, []);
  });
});

Deno.test("run: no result file, an empty one, or no token makes no request", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const missing = await run(argv(api, `${dir}/absent.md`), "secret");
    assertStringIncludes(missing, "::warning::No result at");

    await Deno.writeTextFile(`${dir}/empty.md`, "\n");
    const empty = await run(argv(api, `${dir}/empty.md`), "secret");
    assertStringIncludes(empty, "is empty");

    await Deno.writeTextFile(`${dir}/result.md`, "result\n");
    const noToken = await run(argv(api, `${dir}/result.md`), undefined);
    assertStringIncludes(noToken, "No FORGEJO_TOKEN");

    assertEquals(forgejo.requests, []);
  });
});

Deno.test("run: an invalid marker or commit is a warning and makes no request", async () => {
  await withForgejo(async (forgejo, api, dir) => {
    const file = `${dir}/result.md`;
    await Deno.writeTextFile(file, "result\n");
    const badMarker = argv(api, file, "Not A Marker");
    assertStringIncludes(await run(badMarker, "secret"), "usage:");
    const badCommit = argv(api, file);
    badCommit[badCommit.length - 1] = "HEAD";
    assertStringIncludes(await run(badCommit, "secret"), "usage:");
    assertEquals(forgejo.requests, []);
  });
});
