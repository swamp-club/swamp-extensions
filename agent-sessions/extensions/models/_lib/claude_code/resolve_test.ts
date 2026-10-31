import { assert, assertEquals, assertFalse } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1.1.4";
import {
  displayPath,
  isPathLike,
  isUnder,
  normalizeRemote,
  prefixUnder,
  RepoResolver,
  type Resolved,
} from "./resolve.ts";
import { GIT_AVAILABLE, gitInit, gitWorktree } from "../testdata/fixtures.ts";

// The resolver asks git; without it these tests cannot run.
const gitTest = GIT_AVAILABLE ? Deno.test : Deno.test.ignore;

Deno.test("normalizeRemote: every way of writing one remote reads the same", () => {
  for (
    const url of [
      "git@example.com:acme/demo.git",
      "git@example.com:acme/demo",
      "ssh://git@example.com/acme/demo.git",
      "ssh://git@example.com:22/acme/demo.git",
      "https://example.com/acme/demo",
      "https://EXAMPLE.com/acme/demo.git/",
      "https://user:secret@example.com/acme/demo.git",
      "example.com:acme/demo",
    ]
  ) {
    assertEquals(normalizeRemote(url), "example.com/acme/demo", url);
  }
  // The path keeps its case; only the host is lowercased.
  assertEquals(
    normalizeRemote("https://Example.com/Acme/Demo"),
    "example.com/Acme/Demo",
  );
  // A local remote is a path, home as ~.
  assertEquals(
    normalizeRemote("/home/a/git/demo.git", ["/home/a"]),
    "~/git/demo",
  );
  assertEquals(
    normalizeRemote("file:///srv/git/demo.git", ["/home/a"]),
    "/srv/git/demo",
  );
  // One URL cannot parse still loses its credentials.
  const odd = normalizeRemote("https://user:tok en@exa mple.com/x");
  assertFalse(odd.includes("tok"), odd);
});

Deno.test("isPathLike: paths, not remotes", () => {
  for (const p of ["/srv/x", "~/src/x", "./x", "../x", "C:\\x", "C:/x"]) {
    assert(isPathLike(p), p);
  }
  for (
    const r of ["git@example.com:a/b", "https://example.com/a", "example.com/a"]
  ) {
    assertFalse(isPathLike(r), r);
  }
});

Deno.test("isUnder and prefixUnder: at or below, never a sibling sharing a prefix", () => {
  assert(isUnder("/h/src/demo", "/h/src/demo"));
  assert(isUnder("/h/src/demo/sub/dir", "/h/src/demo"));
  assert(isUnder("/h/src/demo/", "/h/src/demo"));
  assertFalse(isUnder("/h/src/demo-two", "/h/src/demo"));
  assert(isUnder("/anything", "/"));
  assert(prefixUnder("sub/deep", "sub"));
  assert(prefixUnder("anything", ""));
  assertFalse(prefixUnder("sub-two", "sub"));
  assertFalse(prefixUnder("", "sub"));
});

Deno.test("displayPath: home, or its real path, becomes ~", () => {
  assertEquals(displayPath("/home/a/src/x", ["/home/a"]), "~/src/x");
  assertEquals(displayPath("/home/a", ["/home/a"]), "~");
  assertEquals(displayPath("/home/ab/x", ["/home/a"]), "/home/ab/x");
  assertEquals(displayPath("/var/home/a/x", ["/home/a", "/var/home/a"]), "~/x");
});

async function withTemp(fn: (dir: string) => Promise<void>) {
  const dir = await Deno.realPath(await Deno.makeTempDir());
  try {
    await fn(dir);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
}

gitTest(
  "RepoResolver: a worktree folds into its main repo; its root is the worktree's",
  async () => {
    await withTemp(async (home) => {
      const main = join(home, "src", "demo");
      await gitInit(main, { remote: "git@example.com:acme/demo.git" });
      const wt = join(home, "wt", "demo-x");
      await gitWorktree(main, wt, "cue/1-x");
      await Deno.mkdir(join(wt, "a", "b"), { recursive: true });
      const resolver = new RepoResolver(home, []);
      const r = await resolver.resolveDir(join(wt, "a", "b")) as Resolved;
      assertEquals(r.repo.identity, "example.com/acme/demo");
      assertEquals(r.repo.mainCheckout, main);
      assertEquals(r.repo.name, "demo");
      assertEquals(r.root, wt);
      assertEquals(r.prefix, "a/b");
      assert(r.settled);
      assertEquals(await resolver.resolveDir(join(home, "nope")), "gone");
      assertEquals(await resolver.resolveDir(home), "unresolved");
    });
  },
);

gitTest(
  "RepoResolver: a gone worktree resolves by glob and a branch of that repo, never a generic or shared one",
  async () => {
    await withTemp(async (home) => {
      const demo = join(home, "src", "demo");
      await gitInit(demo, { branches: ["cue/1-x", "shared"] });
      // Another repo with the same directory name, and one branch in common.
      const twin = join(home, "other", "demo");
      await gitInit(twin, {
        remote: "git@example.com:acme/twin.git",
        branches: ["cue/2-y", "shared"],
      });
      const resolver = new RepoResolver(home, [
        join(home, "work", "*", "<repo>"),
      ]);
      await resolver.resolveDir(demo);
      await resolver.resolveDir(twin);
      const gone = (dir: string, branch?: string) =>
        resolver.resolveGone(join(home, ...dir.split("/")), branch);

      const x = await gone("work/1-x/demo/src", "cue/1-x");
      assertEquals(x?.repo.identity, "~/src/demo");
      assertEquals(x?.root, join(home, "work", "1-x", "demo"));
      assertEquals(x?.prefix, "src");
      assertFalse(x?.settled);
      assertEquals(
        (await gone("work/2-y/demo", "cue/2-y"))?.repo.identity,
        "example.com/acme/twin",
      );
      // Both repos have it: which one is unknown.
      assertEquals(await gone("work/3-z/demo", "shared"), undefined);
      assertEquals(await gone("work/1-x/demo", "main"), undefined);
      assertEquals(await gone("work/1-x/demo"), undefined);
      assertEquals(await gone("elsewhere/demo", "cue/1-x"), undefined);
    });
  },
);

Deno.test("RepoResolver: a folder that is not a git repo resolves directories below it", async () => {
  await withTemp(async (dir) => {
    await Deno.mkdir(join(dir, "plain", "x"), { recursive: true });
    const resolver = new RepoResolver(undefined, []);
    const repo = resolver.addPlain(join(dir, "plain"));
    const r = await resolver.resolveDir(join(dir, "plain", "x")) as Resolved;
    assertEquals(r.repo, repo);
    assertEquals(r.prefix, "x");
    assertFalse(r.settled);
  });
});

gitTest(
  "RepoResolver: a symlink into a folder of a repo takes the repo's real toplevel as its root",
  async () => {
    await withTemp(async (home) => {
      const mono = join(home, "src", "mono");
      await gitInit(mono);
      await Deno.mkdir(join(mono, "sub"));
      await Deno.symlink(join(mono, "sub"), join(home, "link"));
      const r = await new RepoResolver(home, []).resolveDir(
        join(home, "link"),
      ) as Resolved;
      assertEquals(r.prefix, "sub");
      assertEquals(r.root, mono);
      assertEquals(r.repo.mainCheckout, mono);
    });
  },
);
