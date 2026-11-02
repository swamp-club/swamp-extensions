import { assertEquals, assertNotEquals } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1.1.4";
import {
  coverageOf,
  CoverageReader,
  coveredProgram,
  NO_COVERAGE,
} from "./coverage.ts";
import {
  CAPTURED_LOCKFILE,
  installExtensions,
  SWAMP_LOCKFILE_PATH,
} from "../testdata/lockfile.ts";

Deno.test("coveredProgram: the name after the scope, without -runner or -cli", () => {
  assertEquals(coveredProgram("@swamp/git"), "git");
  assertEquals(coveredProgram("@swamp/deno-runner"), "deno");
  assertEquals(coveredProgram("@acme/aws-cli"), "aws");
  assertEquals(coveredProgram("kubectl"), "kubectl");
});

Deno.test("coverageOf: maps programs to extensions; the key follows the installed set", () => {
  const c = coverageOf(["@swamp/git", "@swamp/deno-runner"]);
  assertEquals(c.programs.get("git"), "@swamp/git");
  assertEquals(c.programs.get("deno"), "@swamp/deno-runner");
  // Order does not change the key; another extension does.
  assertEquals(coverageOf(["@swamp/deno-runner", "@swamp/git"]).key, c.key);
  assertNotEquals(coverageOf(["@swamp/git"]).key, c.key);
  assertEquals(coverageOf([]), NO_COVERAGE);
});

async function withTmp(fn: (tmp: string) => Promise<void>) {
  const tmp = await Deno.makeTempDir();
  try {
    await fn(tmp);
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
}

async function writeAt(path: string, text: string) {
  await Deno.mkdir(join(path, ".."), { recursive: true });
  await Deno.writeTextFile(path, text);
}

const git = async (root: string, main = root) =>
  (await new CoverageReader().read(root, main)).programs.get("git");

Deno.test("CoverageReader: the lockfile swamp extension pull wrote covers git", async () => {
  await withTmp(async (repo) => {
    await writeAt(
      join(repo, SWAMP_LOCKFILE_PATH),
      await Deno.readTextFile(CAPTURED_LOCKFILE),
    );
    const c = await new CoverageReader().read(repo, repo);
    assertEquals([...c.programs], [["git", "@swamp/git"]]);
    assertEquals(c.key, "@swamp/git");
  });
});

Deno.test("CoverageReader: .swamp.yaml modelsDir moves the lockfile, relative or absolute", async () => {
  await withTmp(async (tmp) => {
    const relative = join(tmp, "relative");
    await writeAt(join(relative, ".swamp.yaml"), 'modelsDir: "lib/models"\n');
    await installExtensions(relative, ["@swamp/git"], "lib/models");
    assertEquals(await git(relative), "@swamp/git");

    const absolute = join(tmp, "absolute");
    const elsewhere = join(tmp, "elsewhere", "models");
    await writeAt(
      join(absolute, ".swamp.yaml"),
      `modelsDir: ${JSON.stringify(elsewhere)}\n`,
    );
    await installExtensions(absolute, ["@swamp/git"], elsewhere);
    assertEquals(await git(absolute), "@swamp/git");

    // With modelsDir moved, a lockfile at the default path is not swamp's.
    const moved = join(tmp, "moved");
    await writeAt(join(moved, ".swamp.yaml"), "modelsDir: lib/models\n");
    await installExtensions(moved, ["@swamp/git"]);
    assertEquals(await git(moved), undefined);
  });
});

Deno.test("CoverageReader: an empty or unreadable .swamp.yaml keeps the default", async () => {
  await withTmp(async (tmp) => {
    for (
      const [name, marker] of [
        ["empty", 'modelsDir: ""\n'],
        ["broken", "modelsDir: [unclosed\n"],
        ["other", "swampVersion: 1\n"],
      ]
    ) {
      const repo = join(tmp, name);
      await writeAt(join(repo, ".swamp.yaml"), marker);
      await installExtensions(repo, ["@swamp/git"]);
      assertEquals(await git(repo), "@swamp/git", name);
    }
  });
});

Deno.test("CoverageReader: a lockfile under .swamp is not read", async () => {
  await withTmp(async (repo) => {
    await writeAt(
      join(repo, ".swamp", "upstream_extensions.json"),
      await Deno.readTextFile(CAPTURED_LOCKFILE),
    );
    assertEquals(await new CoverageReader().read(repo, repo), NO_COVERAGE);
  });
});

Deno.test("CoverageReader: a worktree without a lockfile reads its main checkout's", async () => {
  await withTmp(async (tmp) => {
    const main = join(tmp, "main");
    const worktree = join(tmp, "wt");
    await Deno.mkdir(worktree, { recursive: true });
    await installExtensions(main, ["@swamp/git"]);
    const reader = new CoverageReader();
    assertEquals(
      (await reader.read(worktree, main)).programs.get("git"),
      "@swamp/git",
    );
    assertEquals(
      (await reader.read(main, main)).programs.get("git"),
      "@swamp/git",
    );
  });
});

Deno.test("CoverageReader: a worktree's own lockfile wins over its main checkout's", async () => {
  await withTmp(async (tmp) => {
    const main = join(tmp, "main");
    const worktree = join(tmp, "wt");
    await installExtensions(main, ["@swamp/git"]);
    await installExtensions(worktree, ["@swamp/deno-runner"]);
    const c = await new CoverageReader().read(worktree, main);
    assertEquals([...c.programs], [["deno", "@swamp/deno-runner"]]);
  });
});

Deno.test("CoverageReader: only keys holding an entry object are extensions", async () => {
  await withTmp(async (repo) => {
    await writeAt(
      join(repo, SWAMP_LOCKFILE_PATH),
      JSON.stringify({
        "@swamp/git": { version: "1" },
        "lockfileVersion": 2,
        "@acme/kubectl": null,
        "@acme/helm": ["x"],
      }),
    );
    const c = await new CoverageReader().read(repo, repo);
    assertEquals([...c.programs], [["git", "@swamp/git"]]);
  });
});

Deno.test("CoverageReader: a missing or broken lockfile covers nothing", async () => {
  await withTmp(async (tmp) => {
    assertEquals(
      await new CoverageReader().read(join(tmp, "none"), join(tmp, "none")),
      NO_COVERAGE,
    );
    for (const text of ["{not json", "[]", '"x"', "null", "3"]) {
      await writeAt(join(tmp, SWAMP_LOCKFILE_PATH), text);
      assertEquals(
        await new CoverageReader().read(tmp, tmp),
        NO_COVERAGE,
        text,
      );
    }
  });
});
