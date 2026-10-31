import { assertEquals, assertNotEquals } from "jsr:@std/assert@1.0.19";
import { join } from "jsr:@std/path@1.1.4";
import {
  coverageOf,
  CoverageReader,
  coveredProgram,
  NO_COVERAGE,
} from "./coverage.ts";

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

async function writeUpstream(dir: string, text: string) {
  await Deno.mkdir(join(dir, ".swamp"), { recursive: true });
  await Deno.writeTextFile(
    join(dir, ".swamp", "upstream_extensions.json"),
    text,
  );
}

Deno.test("CoverageReader: a worktree without .swamp reads its main checkout's", async () => {
  const tmp = await Deno.makeTempDir();
  try {
    const main = join(tmp, "main");
    const worktree = join(tmp, "wt");
    await Deno.mkdir(worktree, { recursive: true });
    await writeUpstream(
      main,
      JSON.stringify({ extensions: [{ name: "@swamp/git", version: "1" }] }),
    );
    const reader = new CoverageReader();
    assertEquals(
      (await reader.read(worktree, main)).programs.get("git"),
      "@swamp/git",
    );
    assertEquals(
      (await reader.read(main, main)).programs.get("git"),
      "@swamp/git",
    );
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
});

Deno.test("CoverageReader: a missing or broken file covers nothing", async () => {
  const tmp = await Deno.makeTempDir();
  try {
    const reader = new CoverageReader();
    assertEquals(
      await reader.read(join(tmp, "none"), join(tmp, "none")),
      NO_COVERAGE,
    );
    await writeUpstream(tmp, "{not json");
    assertEquals(await new CoverageReader().read(tmp, tmp), NO_COVERAGE);
    await writeUpstream(tmp, JSON.stringify({ extensions: "x" }));
    assertEquals(await new CoverageReader().read(tmp, tmp), NO_COVERAGE);
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
});
