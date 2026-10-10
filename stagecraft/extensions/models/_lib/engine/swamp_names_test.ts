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

import { assertEquals, assertStringIncludes } from "@std/assert";
import { modelNameViolation, workflowNameViolation } from "./swamp_names.ts";

// The cases are swamp's own (definition_test.ts and workflow_test.ts at
// fbfa141c), so a rule copied wrong fails here.

Deno.test("modelNameViolation: accepts names swamp creates", () => {
  for (
    const name of [
      "my-server",
      "prod_vpc",
      "a1",
      "@acme/my-server",
      "has_underscores",
      "a".repeat(64),
      "550e8400-e29b-41d4-a716-446655440000",
    ]
  ) {
    assertEquals(modelNameViolation(name), undefined, name);
  }
});

Deno.test("modelNameViolation: returns the rule a name breaks", () => {
  const lowercaseRule =
    "Definition name must be lowercase alphanumeric with hyphens or underscores (e.g. 'my-server'). Must start with a letter or number.";
  for (const name of ["shUpper", "-leading", "My Server", "ALLCAPS"]) {
    assertEquals(modelNameViolation(name), lowercaseRule, name);
  }
  assertEquals(
    modelNameViolation("a".repeat(65)),
    "Definition name must be at most 64 characters.",
  );
  // A scoped name is held to the length limit too.
  assertEquals(
    modelNameViolation(`@acme/${"a".repeat(64)}`),
    "Definition name must be at most 64 characters.",
  );
  assertStringIncludes(modelNameViolation("..") ?? "", "path traversal");
  assertStringIncludes(modelNameViolation("a/b") ?? "", "path traversal");
  assertEquals(typeof modelNameViolation(""), "string");
});

Deno.test("workflowNameViolation: accepts names swamp creates", () => {
  for (
    const name of [
      "deploy-pipeline",
      "a1",
      "@acme/deploy_pipeline",
      "a".repeat(64),
    ]
  ) {
    assertEquals(workflowNameViolation(name), undefined, name);
  }
});

Deno.test("workflowNameViolation: returns the rule a name breaks", () => {
  const lowercaseRule =
    "Workflow name must be lowercase alphanumeric with hyphens (e.g. 'deploy-pipeline'). Must start with a letter or number.";
  assertEquals(workflowNameViolation("WfUpper"), lowercaseRule);
  assertEquals(workflowNameViolation("snake_case"), lowercaseRule);
  assertEquals(
    workflowNameViolation("a".repeat(65)),
    "Workflow name must be at most 64 characters.",
  );
  assertStringIncludes(workflowNameViolation("..") ?? "", "path traversal");
  assertEquals(typeof workflowNameViolation(""), "string");
});

Deno.test("names from run data: whitespace, newlines and braces are refused", () => {
  for (const name of ["agent 7", "agent\n7", "agent-{{x}}", " agent", ""]) {
    assertEquals(typeof modelNameViolation(name), "string", name);
    assertEquals(typeof workflowNameViolation(name), "string", name);
  }
});
