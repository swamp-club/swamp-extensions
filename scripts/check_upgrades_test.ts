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

import { assertEquals, assertStringIncludes } from "@std/assert";
import {
  checkChange,
  compareVersions,
  extensionDirOf,
  isModelFile,
  type ModelDefinition,
  parseModel,
} from "./check_upgrades.ts";

const SOURCE = `
import { z } from "zod";
const ArgsSchema = z.object({ version: z.string() });
export const model = {
  type: "@swamp/ssh",
  version: "2026.09.25.1",
  globalArguments: ArgsSchema,
  upgrades: [
    { toVersion: "2026.07.28.1", upgradeAttributes: (o: unknown) => o },
    { toVersion: "2026.09.25.1", upgradeAttributes: (o: unknown) => o },
  ],
  methods: {
    exec: { description: "run" },
  },
};
`;

function def(version: string, toVersions: string[]): ModelDefinition {
  return { type: "@x/y", version, toVersions };
}

Deno.test("parseModel: reads type, version, upgrade entries and a method", () => {
  assertEquals(parseModel(SOURCE), {
    type: "@swamp/ssh",
    version: "2026.09.25.1",
    toVersions: ["2026.07.28.1", "2026.09.25.1"],
    firstMethod: "exec",
  });
});

Deno.test("parseModel: a file that defines no model is not a model", () => {
  assertEquals(parseModel("export function helper() {}"), null);
});

Deno.test("compareVersions: compares CalVer numerically", () => {
  assertEquals(compareVersions("2026.09.25.10", "2026.09.25.9") > 0, true);
  assertEquals(compareVersions("2026.09.25.1", "2026.09.25.1"), 0);
});

Deno.test("checkChange: a bump with a matching final entry passes", () => {
  assertEquals(
    checkChange({
      path: "ssh/extensions/models/ssh.ts",
      base: def("2026.07.28.1", ["2026.07.28.1"]),
      head: def("2026.09.25.1", ["2026.07.28.1", "2026.09.25.1"]),
    }).kind,
    "bumped",
  );
});

Deno.test("checkChange: a bump without an upgrade entry fails", () => {
  const verdict = checkChange({
    path: "ssh/extensions/models/ssh.ts",
    base: def("2026.07.28.1", ["2026.07.28.1"]),
    head: def("2026.09.25.1", ["2026.07.28.1"]),
  });
  assertEquals(verdict.kind, "error");
  if (verdict.kind === "error") {
    assertStringIncludes(
      verdict.message,
      "last upgrades entry is 2026.07.28.1",
    );
  }
});

Deno.test("checkChange: a version that moves backwards fails", () => {
  assertEquals(
    checkChange({
      path: "a/extensions/models/a.ts",
      base: def("2026.09.25.1", []),
      head: def("2026.07.28.1", ["2026.07.28.1"]),
    }).kind,
    "error",
  );
});

Deno.test("checkChange: new and unchanged models need no upgrade path", () => {
  assertEquals(
    checkChange({ path: "p", base: null, head: def("2026.01.01.1", []) }).kind,
    "new",
  );
  assertEquals(
    checkChange({
      path: "p",
      base: def("2026.01.01.1", []),
      head: def("2026.01.01.1", []),
    }).kind,
    "unchanged",
  );
});

Deno.test("isModelFile / extensionDirOf: generated and hand-written alike", () => {
  assertEquals(isModelFile("ssh/extensions/models/ssh.ts"), true);
  assertEquals(
    isModelFile("model/aws/ec2/extensions/models/instance.ts"),
    true,
  );
  assertEquals(isModelFile("ssh/extensions/models/ssh_test.ts"), false);
  assertEquals(isModelFile("ssh/extensions/models/_lib/x.ts"), false);
  assertEquals(
    extensionDirOf("model/aws/ec2/extensions/models/i.ts"),
    "model/aws/ec2",
  );
  // The repository's own working copy is not a published extension.
  assertEquals(extensionDirOf("extensions/models/issue_lifecycle.ts"), null);
});
