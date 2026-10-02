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

import { assert, assertEquals } from "@std/assert";
import { parse } from "@std/yaml";

// ---------------------------------------------------------------------------
// The manifest lists what ships. swamp packages the listed model and report
// entry points with everything they import, so _lib/ and the embedded studio
// page need no entry of their own; a new entry point does, and the registry
// would publish without it. This test fails when one is missing or stale.
// ---------------------------------------------------------------------------

const EXTENSION_ROOT = new URL("../../", import.meta.url);

// The swamp-club Lab adapter is kept in the repository but not shipped
// (DESIGN.md, "the swamp-club Lab adapter is kept, not shipped"). Nothing
// shipped imports it: boundary_test.ts, rule 7.
const NOT_SHIPPED = ["tracker/swamp_club.ts"];
const LAB_FILES = [
  "swamp_club.ts",
  "swamp_club_fake.ts",
  "testdata/auth",
];

interface Manifest {
  name: string;
  skills: string[];
  models: string[];
  reports: string[];
  additionalFiles: string[];
}

async function manifest(): Promise<Manifest> {
  const text = await Deno.readTextFile(
    new URL("manifest.yaml", EXTENSION_ROOT),
  );
  return parse(text) as Manifest;
}

/** The non-test modules directly in a directory, relative to `base`. */
async function entryPoints(dir: string, base: string): Promise<string[]> {
  const found: string[] = [];
  for await (const entry of Deno.readDir(new URL(dir, EXTENSION_ROOT))) {
    if (
      entry.isFile && entry.name.endsWith(".ts") &&
      !entry.name.endsWith("_test.ts")
    ) {
      found.push(`${dir}${entry.name}`.slice(base.length));
    }
  }
  return found.sort();
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(new URL(path, EXTENSION_ROOT));
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return false;
    throw error;
  }
}

Deno.test("manifest: names the extension", async () => {
  assertEquals((await manifest()).name, "@swamp/stagecraft");
});

Deno.test("manifest: lists every model entry point, and nothing else", async () => {
  const base = "extensions/models/";
  const expected = [
    ...await entryPoints(`${base}engine/`, base),
    ...await entryPoints(`${base}tracker/`, base),
  ].filter((p) => !NOT_SHIPPED.includes(p)).sort();
  assert(expected.length >= 5, `only ${expected.length} entry points found`);
  assertEquals([...(await manifest()).models].sort(), expected);
});

Deno.test("manifest: lists every report, and nothing else", async () => {
  const base = "extensions/reports/";
  assertEquals(
    [...(await manifest()).reports].sort(),
    await entryPoints(base, base),
  );
});

Deno.test("manifest: the skill and every additional file exist", async () => {
  const m = await manifest();
  assertEquals(m.skills, ["stagecraft"]);
  assert(await exists(".claude/skills/stagecraft/SKILL.md"), "no SKILL.md");
  for (const file of m.additionalFiles) {
    assert(await exists(file), `${file} is listed but missing`);
  }
});

Deno.test("manifest: names nothing of the swamp-club Lab's", async () => {
  for (const path of NOT_SHIPPED) {
    assert(await exists(`extensions/models/${path}`), `${path} is gone`);
  }
  const m = await manifest();
  for (const listed of [...m.models, ...m.reports, ...m.additionalFiles]) {
    for (const lab of LAB_FILES) {
      assert(!listed.includes(lab), `${listed} is the Lab's ${lab}`);
    }
  }
  assert(
    !m.models.some((model) => model.includes("swamp_club")) &&
      !JSON.stringify(m).includes("@swamp/stagecraft/swamp-club"),
    "the manifest names the Lab's model type",
  );
});
