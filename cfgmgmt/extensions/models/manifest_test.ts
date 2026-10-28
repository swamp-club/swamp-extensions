// Copyright (C) 2026 Adam Jacob
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Every model and report the manifest lists loads, and carries the
// @swamp/cfgmgmt identity the registry publishes it under.

import { assert, assertEquals } from "@std/assert";
import { fromFileUrl } from "@std/path";

const root = fromFileUrl(new URL("../../", import.meta.url));
const manifest = await Deno.readTextFile(`${root}manifest.yaml`);

function listed(section: string): string[] {
  const block = manifest.split(`\n${section}:\n`)[1]?.split(/\n\S/)[0] ?? "";
  return block.split("\n").map((l) => l.replace(/^\s*- /, "").trim())
    .filter((l) => l.endsWith(".ts"));
}

const version = manifest.match(/^version: "([^"]+)"/m)?.[1];

interface LoadedModel {
  type: string;
  version: string;
  globalArguments: { safeParse: (v: unknown) => unknown };
  methods: Record<string, { execute: unknown }>;
}

Deno.test("manifest lists every model file and nothing else", async () => {
  const onDisk: string[] = [];
  for await (const e of Deno.readDir(`${root}extensions/models`)) {
    if (e.isFile && e.name.endsWith(".ts") && !e.name.endsWith("_test.ts")) {
      onDisk.push(e.name);
    }
  }
  assertEquals(listed("models").sort(), onDisk.sort());
});

for (const file of listed("models")) {
  Deno.test(`model ${file} loads as @swamp/cfgmgmt`, async () => {
    const mod = await import(`./${file}`);
    const model = mod.model as LoadedModel;
    assertEquals(model.type, `@swamp/cfgmgmt/${file.replace(/\.ts$/, "")}`);
    assertEquals(model.version, version);
    assert(typeof model.globalArguments.safeParse === "function");
    assert(Object.keys(model.methods).length > 0);
    for (const [name, m] of Object.entries(model.methods)) {
      assertEquals(typeof m.execute, "function", `${file} ${name}`);
    }
  });
}

for (const file of listed("reports")) {
  Deno.test(`report ${file} loads as @swamp/cfgmgmt`, async () => {
    const mod = await import(`../reports/${file}`);
    const report = mod.report as { name: string };
    assert(report.name.startsWith("@swamp/cfgmgmt-"), report.name);
  });
}
