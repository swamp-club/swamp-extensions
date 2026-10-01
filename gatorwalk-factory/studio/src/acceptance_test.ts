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
// The issue's acceptance (swamp-club #2807), on the page's model: an agent
// adds an exit from plan to implement to the file on disk, and the open page
// shows ambiguous-exit and product-missing-on-path, marks plan as changed,
// and a finding's Copy reference names its file, path and code.

import { assert, assertEquals } from "@std/assert";
import { changedSince, fingerprints, markSeen } from "./changes.ts";
import { referenceLine } from "./reference.ts";
import { findingTarget, follow, type Target } from "./selection.ts";
import { exampleText, loadOk } from "./test_support.ts";

const FILE = "factories/swamp-club-swamp-extensions.yaml";
const EXIT = "      - name: submit\n        to: plan-review\n";
const SHORTCUT = "      - name: shortcut\n        to: implement\n";

Deno.test("acceptance: adding an exit from plan to implement shows its findings and marks plan", async () => {
  const text = await exampleText("swamp-club-swamp-extensions");
  assertEquals(
    text.split(EXIT).length,
    2,
    "the plan stage's exit is where the test expects",
  );
  const before = await loadOk("swamp-club-swamp-extensions", text);
  const codes = (l: typeof before) => new Set(l.findings.map((f) => f.code));
  assert(!codes(before).has("ambiguous-exit"));

  // The page has shown the file once, and a person has selected a stage.
  const seen = markSeen(null, fingerprints(before.definition), "all");
  const selected: Target = { kind: "stage", stage: "implement" };

  const after = await loadOk(
    "swamp-club-swamp-extensions",
    text.replace(EXIT, EXIT + SHORTCUT),
  );
  assert(codes(after).has("ambiguous-exit"));
  assert(codes(after).has("product-missing-on-path"));
  assertEquals([...changedSince(seen, fingerprints(after.definition))], [
    "plan",
  ]);
  assertEquals(follow(after.definition, after.findings, selected), selected);

  const ambiguous = after.findings.find((f) => f.code === "ambiguous-exit")!;
  const line = referenceLine(FILE, after.definition, findingTarget(ambiguous));
  assert(line.startsWith(`${FILE} ${ambiguous.path} (`), line);
  assert(line.includes(" ambiguous-exit: "), line);
  assert(
    ambiguous.range !== null,
    "the finding underlines its path in the source",
  );
});
