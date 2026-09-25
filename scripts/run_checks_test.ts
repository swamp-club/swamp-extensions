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

import { assert, assertEquals, assertThrows } from "@std/assert";
import {
  type ChecksConfig,
  expandDir,
  fillTemplate,
  fsProbes,
  loadChecksConfig,
  parseChecksConfig,
  planChecks,
} from "./run_checks.ts";

/** A fake tree: directory → children, plus the files that exist. */
function probes(tree: Record<string, string[]>, files: string[] = []) {
  return {
    listDirs: (path: string) => tree[path] ?? [],
    hasFile: (path: string) => files.includes(path),
  };
}

const CONFIG: ChecksConfig = parseChecksConfig(`
groups:
  ext:
    commands:
      check: deno check {check}
      lockfile: deno install --frozen
    targets:
      - dir: ssh
        vars: { check: ssh.ts }
      - dir: vault/*
        marker: manifest.yaml
        vars: { check: v.ts }
  gen:
    commands:
      check: deno check
    targets:
      - dir: model/*/*
        marker: deno.json
        commands: { lockfile: deno install --frozen }
      - dir: model/aws/ec2
        triggers: [model/, codegen/]
`);

const TREE = probes(
  {
    ".": ["ssh", "vault", "model"],
    vault: ["aws-sm", "notes"],
    model: ["aws"],
    "model/aws": ["ec2", "lambda"],
  },
  [
    "vault/aws-sm/manifest.yaml",
    "model/aws/ec2/deno.json",
    "model/aws/lambda/deno.json",
  ],
);

Deno.test("fillTemplate: fills vars and refuses unknown ones", () => {
  assertEquals(
    fillTemplate("deno check {f}", { f: "a.ts" }, "t"),
    "deno check a.ts",
  );
  assertThrows(() => fillTemplate("{nope}", {}, "t"), Error, "no var sets it");
});

Deno.test("expandDir: a wildcard expands to directories holding the marker", () => {
  assertEquals(
    expandDir(
      { dir: "vault/*", marker: "manifest.yaml" },
      TREE.listDirs,
      TREE.hasFile,
    ),
    ["vault/aws-sm"],
  );
  assertEquals(expandDir({ dir: "ssh" }, TREE.listDirs, TREE.hasFile), ["ssh"]);
});

Deno.test("planChecks: only the changed target runs", () => {
  const planned = planChecks(CONFIG, "ext", ["vault/aws-sm/a.ts"], TREE);
  assertEquals(planned, [{
    dir: "vault/aws-sm",
    commands: [
      { name: "check", run: "deno check v.ts" },
      { name: "lockfile", run: "deno install --frozen" },
    ],
  }]);
});

Deno.test("planChecks: a prefix is a directory, not a name fragment", () => {
  assertEquals(planChecks(CONFIG, "ext", ["ssh-extras/a.ts"], TREE), []);
});

Deno.test("planChecks: --all plans every target", () => {
  assertEquals(
    planChecks(CONFIG, "ext", [], { ...TREE, all: true }).map((t) => t.dir),
    ["ssh", "vault/aws-sm"],
  );
});

Deno.test("planChecks: targets on the same directory merge their commands", () => {
  const planned = planChecks(CONFIG, "gen", ["model/aws/ec2/x.ts"], TREE);
  assertEquals(planned, [{
    dir: "model/aws/ec2",
    commands: [
      { name: "check", run: "deno check" },
      { name: "lockfile", run: "deno install --frozen" },
    ],
  }]);
});

Deno.test("planChecks: an explicit trigger runs an unchanged sample", () => {
  const planned = planChecks(CONFIG, "gen", ["codegen/main.ts"], TREE);
  assertEquals(planned, [{
    dir: "model/aws/ec2",
    commands: [{ name: "check", run: "deno check" }],
  }]);
});

Deno.test("planChecks: a deleted target directory is not checked", () => {
  // With --no-renames a moved extension shows up as deletions under its old
  // directory; there is nothing left there to run commands in.
  const planned = planChecks(CONFIG, "ext", ["ssh/ssh.ts"], {
    ...TREE,
    isDir: (path: string) => path !== "ssh",
  });
  assertEquals(planned, []);
});

Deno.test("planChecks: an unknown group is refused", () => {
  assertThrows(() => planChecks(CONFIG, "nope", [], TREE), Error, "no group");
});

Deno.test("parseChecksConfig: an unknown key is refused", () => {
  assertThrows(() =>
    parseChecksConfig(`groups: { a: { targets: [{ dir: x, typo: 1 }] } }`)
  );
});

// -- This repository's checks.yaml -------------------------------------------

const root = new URL("../", import.meta.url).pathname;

Deno.test("checks.yaml: every group plans every target without error", async () => {
  const config = await loadChecksConfig(`${root}verification/checks.yaml`);
  for (const group of Object.keys(config.groups)) {
    const planned = planChecks(config, group, [], {
      all: true,
      ...fsProbes(root),
    });
    assert(planned.length > 0, `${group} plans nothing`);
  }
});

Deno.test("checks.yaml: a changed service is fully checked beside the samples", async () => {
  const config = await loadChecksConfig(`${root}verification/checks.yaml`);
  const planned = planChecks(
    config,
    "models",
    ["model/aws/lambda/extensions/models/function.ts"],
    fsProbes(root),
  );
  const names = (dir: string) =>
    planned.find((t) => t.dir === dir)?.commands.map((c) => c.name);
  assertEquals(names("model/aws/lambda"), ["check", "lockfile"]);
  assertEquals(names("model/aws/ec2"), ["check"]);
  assertEquals(names("model/hetzner-cloud"), [
    "check",
    "lint",
    "fmt",
    "lockfile",
  ]);
  assertEquals(planChecks(config, "models", ["ssh/a.ts"], fsProbes(root)), []);
});
