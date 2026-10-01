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

import { assertEquals } from "@std/assert";
import { parse } from "npm:@marcbachmann/cel-js@7.6.1";
import { productKind, type ProductRef, productRefs } from "./cel_refs.ts";

function refs(expr: string): ProductRef[] {
  return productRefs(parse(expr).ast);
}

Deno.test("cel refs: reads, by member and by literal index, on every map", () => {
  assertEquals(
    refs(
      'artifacts.plan.payload.summary + evidence["change-request"].payload.url' +
        ' + validations.artifacts.plan + validations["evidence"]["verify"]',
    ),
    [
      { map: "artifacts", name: "plan", use: "read" },
      { map: "evidence", name: "change-request", use: "read" },
      { map: "validations.artifacts", name: "plan", use: "read" },
      { map: "validations.evidence", name: "verify", use: "read" },
    ],
  );
});

Deno.test("cel refs: has() at any depth and `in` on a map are tests", () => {
  assertEquals(
    refs(
      'has(evidence.classification.payload.verdict) && "plan" in artifacts' +
        ' && "plan" in validations.artifacts && has(validations.evidence.v)',
    ),
    [
      { map: "evidence", name: "classification", use: "test" },
      { map: "artifacts", name: "plan", use: "test" },
      { map: "validations.artifacts", name: "plan", use: "test" },
      { map: "validations.evidence", name: "v", use: "test" },
    ],
  );
});

Deno.test("cel refs: lookups by variable, macros on a map and `in` on a payload are not references", () => {
  assertEquals(refs("artifacts[stage.id]"), []);
  assertEquals(refs('artifacts.exists(k, k == "plan")'), []);
  assertEquals(refs("artifacts.all(k, artifacts[k].version > 0)"), []);
  assertEquals(refs("validations.artifacts.size()"), []);
  assertEquals(refs('"f" in evidence["verification"].payload'), [
    { map: "evidence", name: "verification", use: "read" },
  ]);
  assertEquals(refs('"x" in ["x"]'), []);
});

Deno.test("cel refs: references inside macros, cel.bind and has() index keys are found", () => {
  assertEquals(
    refs(
      'artifacts["plan-review"].payload.findings.exists(f,\n' +
        '  f.severity == "high" && evidence.checks.payload.ok)\n' +
        "&& cel.bind(c, artifacts.change.payload.commit, c != '')",
    ),
    [
      { map: "artifacts", name: "plan-review", use: "read" },
      { map: "evidence", name: "checks", use: "read" },
      { map: "artifacts", name: "change", use: "read" },
    ],
  );
  assertEquals(refs("has(item.externalRefs[artifacts.a.payload.k].x)"), [
    { map: "artifacts", name: "a", use: "read" },
  ]);
});

Deno.test("cel refs: productKind maps each map to the kind it holds", () => {
  assertEquals(productKind("artifacts"), "artifact");
  assertEquals(productKind("validations.artifacts"), "artifact");
  assertEquals(productKind("evidence"), "evidence");
  assertEquals(productKind("validations.evidence"), "evidence");
});
