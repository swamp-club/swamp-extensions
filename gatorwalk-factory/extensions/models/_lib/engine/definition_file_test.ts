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

import { assertEquals, assertRejects } from "@std/assert";
import {
  readDefinitionFile,
  readScenarioFiles,
  resolveDefinitionPath,
  writeNewDefinitionFile,
} from "./definition_file.ts";
import { memoryRepo } from "./fake_swamp.ts";

// The Deno implementation of RepoFiles runs in the integration suite, which
// may write; these run the same rules on the fake's in-memory repo.

function repo() {
  const r = memoryRepo();
  r.write("factories/team.yaml", "schemaVersion: 1\nname: team\n");
  return r;
}

Deno.test("definition file: a path inside the repo reads as YAML", async () => {
  const r = repo();
  assertEquals(
    await readDefinitionFile(r.dir, "factories/team.yaml", r.files),
    { schemaVersion: 1, name: "team" },
  );
  assertEquals(
    await resolveDefinitionPath(
      r.dir,
      "./factories/../factories/team.yaml",
      r.files,
    ),
    "/repo/factories/team.yaml",
  );
});

Deno.test("definition file: each bad path is refused, naming the path", async () => {
  const r = repo();
  r.write("factories/team.json", "{}");
  r.write("factories/dir.yaml/x", "");
  r.write("/elsewhere/out.yaml", "name: out\n");
  r.symlink("factories/link.yaml", "/elsewhere/out.yaml");
  r.symlink("linked", "/elsewhere");
  r.symlink("factories/dangling.yaml", "nothing.yaml");
  const cases: [string, string][] = [
    ["/repo/factories/team.yaml", "'/repo/factories/team.yaml' is absolute"],
    ["factories/team.json", "'factories/team.json' is not a YAML file"],
    ["../elsewhere/out.yaml", "'../elsewhere/out.yaml' is outside the repo"],
    ["factories/link.yaml", "'factories/link.yaml' resolves outside the repo"],
    ["linked/out.yaml", "'linked/out.yaml' resolves outside the repo"],
    ["factories/missing.yaml", "'factories/missing.yaml' does not exist"],
    ["factories/dangling.yaml", "'factories/dangling.yaml' does not exist"],
    ["factories/dir.yaml", "'factories/dir.yaml' is not a file"],
  ];
  for (const [path, message] of cases) {
    await assertRejects(
      () => readDefinitionFile(r.dir, path, r.files),
      Error,
      message,
    );
  }
  await assertRejects(
    () => readDefinitionFile(r.dir, " ", r.files),
    Error,
    "definition path is empty",
  );
});

Deno.test("definition file: a symlink that stays inside the repo is followed", async () => {
  const r = repo();
  r.symlink("current.yaml", "factories/team.yaml");
  assertEquals(
    await readDefinitionFile(r.dir, "current.yaml", r.files),
    { schemaVersion: 1, name: "team" },
  );
});

Deno.test("definition file: away from a swamp repo, a missing file says to start where the repo is", async () => {
  const r = memoryRepo("/tmp/swamp-dispatch-1");
  r.remove(".swamp");
  await assertRejects(
    () => readDefinitionFile(r.dir, "factories/team.yaml", r.files),
    Error,
    "is not a swamp repo, so this is likely a remote worker",
  );
});

Deno.test("definition file: invalid or empty YAML is refused, naming the path", async () => {
  const r = repo();
  r.write("factories/bad.yaml", "stages: [unclosed\n");
  r.write("factories/empty.yaml", "");
  await assertRejects(
    () => readDefinitionFile(r.dir, "factories/bad.yaml", r.files),
    Error,
    "'factories/bad.yaml' is not valid YAML",
  );
  await assertRejects(
    () => readDefinitionFile(r.dir, "factories/empty.yaml", r.files),
    Error,
    "'factories/empty.yaml' is empty",
  );
});

Deno.test("definition file: a new file is written with its directories, never over anything", async () => {
  const r = memoryRepo();
  await writeNewDefinitionFile(
    r.dir,
    "factories/deep/new.yaml",
    "name: n\n",
    r.files,
  );
  assertEquals(r.read("factories/deep/new.yaml"), "name: n\n");
  await assertRejects(
    () =>
      writeNewDefinitionFile(r.dir, "factories/deep/new.yaml", "x", r.files),
    Error,
    "'factories/deep/new.yaml' already exists; init never overwrites it",
  );
  r.symlink("factories/dangling.yaml", "nothing.yaml");
  await assertRejects(
    () =>
      writeNewDefinitionFile(r.dir, "factories/dangling.yaml", "x", r.files),
    Error,
    "already exists",
  );
  r.symlink("out", "/elsewhere");
  r.write("/elsewhere/keep", "");
  await assertRejects(
    () => writeNewDefinitionFile(r.dir, "out/sub/new.yaml", "x", r.files),
    Error,
    "'out/sub/new.yaml' resolves outside the repo",
  );
  await assertRejects(
    () => writeNewDefinitionFile(r.dir, "notes.txt", "x", r.files),
    Error,
    "is not a YAML file",
  );
  r.symlink("broken", "nowhere");
  await assertRejects(
    () => writeNewDefinitionFile(r.dir, "broken/new.yaml", "x", r.files),
    Error,
    "'broken/new.yaml' cannot be created: /repo/broken is a broken symlink",
  );
  r.write("plain", "");
  await assertRejects(
    () => writeNewDefinitionFile(r.dir, "plain/new.yaml", "x", r.files),
    Error,
    "'plain/new.yaml' cannot be created: /repo/plain is not a directory",
  );
});

// --- saved scenarios -----------------------------------------------------------

Deno.test("scenario files: none without a directory; YAML files in name order, each parsed or with its error", async () => {
  const r = repo();
  assertEquals(await readScenarioFiles(r.dir, "team", r.files), []);
  r.write("scenarios/team/b.yml", "scenario: b\n");
  r.write("scenarios/team/a.yaml", "scenario: a\n");
  r.write("scenarios/team/notes.md", "# not a scenario\n");
  r.write("scenarios/team/c.yaml", "steps: [");
  r.write("scenarios/team/d.yaml/x", "");
  r.write("/elsewhere/e.yaml", "scenario: e\n");
  r.symlink("scenarios/team/e.yaml", "/elsewhere/e.yaml");
  r.symlink("scenarios/team/f.yaml", "nothing.yaml");
  r.write("scenarios/other/z.yaml", "scenario: z\n");
  const files = await readScenarioFiles(r.dir, "team", r.files);
  assertEquals(
    files.map((f) => [f.path, f.ok ? f.raw : f.error.split(":")[0]]),
    [
      ["scenarios/team/a.yaml", { scenario: "a" }],
      ["scenarios/team/b.yml", { scenario: "b" }],
      ["scenarios/team/c.yaml", "is not valid YAML"],
      ["scenarios/team/d.yaml", "is not a file"],
      [
        "scenarios/team/e.yaml",
        "resolves outside the repo (to /elsewhere/e.yaml)",
      ],
      ["scenarios/team/f.yaml", "is a symlink to nothing"],
    ],
  );
});

Deno.test("scenario files: a directory outside the repo, or not a directory, is refused", async () => {
  const r = repo();
  r.write("/elsewhere/x.yaml", "scenario: x\n");
  r.symlink("scenarios/team", "/elsewhere");
  await assertRejects(
    () => readScenarioFiles(r.dir, "team", r.files),
    Error,
    "scenarios directory 'scenarios/team' resolves outside the repo " +
      "(to /elsewhere)",
  );
  r.write("scenarios/solo", "a file");
  await assertRejects(
    () => readScenarioFiles(r.dir, "solo", r.files),
    Error,
    "scenarios directory 'scenarios/solo' is not a directory",
  );
  for (const name of ["", ".", "..", "a/b", "a\\b"]) {
    await assertRejects(
      () => readScenarioFiles(r.dir, name, r.files),
      Error,
      "is not a directory name",
    );
  }
});
