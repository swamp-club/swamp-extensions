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
import {
  leftovers,
  reflow,
  renamePath,
  transform,
} from "./rename_lifecycle_to_factory.ts";

const TS = "x.ts";
const MD = "x.md";

Deno.test("rename: paths follow the git mv targets", () => {
  assertEquals(
    renamePath("gatorwalk-factory/extensions/models/lifecycle.ts"),
    "gatorwalk-factory/extensions/models/factory.ts",
  );
  assertEquals(
    renamePath("models/lifecycle_test.ts"),
    "models/factory_test.ts",
  );
  assertEquals(
    renamePath("models/lifecycles_test.ts"),
    "models/factories_test.ts",
  );
  assertEquals(
    renamePath("models/_lib/lifecycle_schema_test.ts"),
    "models/_lib/definition_schema_test.ts",
  );
  assertEquals(
    renamePath("testdata/lifecycles/minimal.yaml"),
    "testdata/factories/minimal.yaml",
  );
  assertEquals(
    renamePath("extensions/models/issue_lifecycle.ts"),
    "extensions/models/issue_lifecycle.ts",
  );
  assertEquals(
    transform(TS, 'import { x } from "./_lib/lifecycle_schema.ts";'),
    'import { x } from "./_lib/definition_schema.ts";',
  );
  assertEquals(
    transform(TS, 'new URL("../../testdata/lifecycles/", import.meta.url)'),
    'new URL("../../testdata/factories/", import.meta.url)',
  );
});

Deno.test("rename: where lifecycle names the model, it becomes factory", () => {
  assertEquals(
    transform(TS, 'type: "@swamp/gatorwalk-factory/lifecycle",'),
    'type: "@swamp/gatorwalk-factory/factory",',
  );
  assertEquals(
    transform(TS, 'lifecycle: z.string().min(1).describe("x"),'),
    'factory: z.string().min(1).describe("x"),',
  );
  assertEquals(transform(TS, "  lifecycle?: string;"), "  factory?: string;");
  assertEquals(
    transform(TS, 'start", { lifecycle: "team" });'),
    'start", { factory: "team" });',
  );
  assertEquals(
    transform(TS, "if (req.lifecycle !== args.lifecycle) {"),
    "if (req.factory !== args.factory) {",
  );
  assertEquals(
    transform(MD, "`--input lifecycle=<holder> --log`"),
    "`--input factory=<factory> --log`",
  );
  assertEquals(
    transform(MD, "Start on a lifecycle holder's current lifecycle."),
    "Start on a factory's current definition.",
  );
  assertEquals(
    transform(TS, "// the lifecycle\n// holder's key"),
    "// the factory's key",
  );
  assertEquals(
    transform(
      MD,
      "optional `lifecycle`; `lifecycle` is only needed when a new key",
    ),
    "optional `factory`; `factory` is only needed when a new key",
  );
  assertEquals(
    transform(MD, "[Set up](#set-up-a-lifecycle-holder)"),
    "[Set up](#set-up-a-factory)",
  );
});

Deno.test("rename: holder is gone, and placeholder stays", () => {
  assertEquals(
    transform(TS, "HOLDER_TYPE, withHolders, validateHolder, holder"),
    "FACTORY_TYPE, withFactories, validateFactory, factory",
  );
  assertEquals(
    transform(TS, "const f = loadHolderLifecycle(ctx, holder);"),
    "const f = loadFactoryDefinition(ctx, factory);",
  );
  assertEquals(
    transform(MD, "a placeholder stage, a Placeholder"),
    "a placeholder stage, a Placeholder",
  );
});

Deno.test("rename: the document is definition in code, factory definition in prose", () => {
  assertEquals(
    transform(TS, "const lifecycle: Lifecycle = parseLifecycle(raw);"),
    "const definition: FactoryDefinition = parseDefinition(raw);",
  );
  assertEquals(
    transform(TS, "LIFECYCLE_SPEC, LifecycleSchema, lifecycleDigest"),
    "DEFINITION_SPEC, DefinitionSchema, definitionDigest",
  );
  assertEquals(
    transform(TS, "  // Check the lifecycle in full."),
    "  // Check the factory definition in full.",
  );
  assertEquals(
    transform(
      MD,
      "Lifecycles are data. A `lifecycle` key and `parseLifecycle`.",
    ),
    "Factory definitions are data. A `definition` key and `parseDefinition`.",
  );
  assertEquals(
    transform(MD, "the holder's lifecycle"),
    "the factory's definition",
  );
});

Deno.test("rename: swamp-club's lifecycle entries and route keep the word", () => {
  const kept = [
    "@swamp/issue-lifecycle and issue_lifecycle and ISSUE_LIFECYCLE_TYPE",
    "refuseIssueLifecycle(LifecycleEntryWriter, LifecycleEntry)",
    'action: "lifecycle_entry", lifecycleEntries',
    "`/api/v1/lab/issues/${issue}/lifecycle`,",
    "/^\\/api\\/v1\\/lab\\/issues\\/([^/]+)(\\/comments|\\/lifecycle)?$/",
    'r.path.endsWith("/lifecycle")',
    "(its lifecycle route)",
  ];
  for (const line of kept) assertEquals(transform(TS, line), line);
  assertEquals(
    transform(TS, "// posts a lifecycle entry\n// and lifecycle\n// entries"),
    "// posts a lifecycle entry\n// and lifecycle\n// entries",
  );
  assertEquals(
    transform(MD, "[Lifecycle entries](#lifecycle-entries)"),
    "[Lifecycle entries](#lifecycle-entries)",
  );
});

Deno.test("rename: transform is idempotent, and leaves nothing to find", () => {
  const text = [
    "// The lifecycle holder: a lifecycle, pinned; issue-lifecycle's entry.",
    "const lifecycle = await loadHolderLifecycle(ctx, args.lifecycle);",
    'await claim({ issue: "T1", lifecycle: "team" }); // a placeholder',
  ].join("\n");
  const once = transform(TS, text);
  assertEquals(transform(TS, once), once);
  assertEquals(leftovers(once), []);
  assertEquals(leftovers("a lifecycle\nfine\nthe holder"), [1, 3]);
});

Deno.test("rename: a paragraph the rename made too long is re-wrapped at 80", () => {
  const before = [
    "// The globalArguments schema here is plain; the full lifecycle schema is",
    "// made of refinements. So this schema only names the top-level fields.",
    "//",
    "// - a lifecycle holder names one lifecycle, and each lifecycle names stages",
    "//   in order",
    "const x = 1;",
  ].join("\n");
  const after = transform(TS, before);
  for (const line of after.split("\n")) {
    assertEquals(line.length <= 80, true, line);
  }
  assertEquals(
    after,
    [
      "// The globalArguments schema here is plain; the full factory definition schema",
      "// is made of refinements. So this schema only names the top-level fields.",
      "//",
      "// - a factory names one factory definition, and each factory definition names",
      "//   stages in order",
      "const x = 1;",
    ].join("\n"),
  );
  assertEquals(transform(TS, after), after);
  const table = "| `a` | a factory definition " + "x".repeat(70) + " |";
  assertEquals(reflow(MD, table), table);
  const doc = transform(
    TS,
    "  /** The candidates in the lifecycle's order: those on the event's trigger\n" +
      "   * come first. */",
  );
  assertEquals(
    doc,
    "  /** The candidates in the factory definition's order: those on the event's\n" +
      "   * trigger come first. */",
  );
  assertEquals(
    transform(
      TS,
      "/** A work item's run and pinned lifecycle, read across model instances. */",
    ),
    "/** A work item's run and pinned factory definition, read across model\n * instances. */",
  );
  const span = transform(
    MD,
    "`status` time. That syntax belongs to swamp: a lifecycle lives in a model's\nglobalArguments.",
  );
  assertEquals(
    span,
    "`status` time. That syntax belongs to swamp: a factory definition lives in a\nmodel's globalArguments.",
  );
  const path = "  see gatorwalk-factory/" + "z".repeat(70) + ",\n  and more";
  assertEquals(reflow("x.yaml", path), path);
  const long = "an unrelated line that is long " + "y".repeat(60);
  assertEquals(reflow(MD, long), long);
});

Deno.test("rename: README gets the vocabulary once", () => {
  const readme =
    "its public name is chosen at go-live.\n\n## Not published until go-live\n";
  const once = transform(MD, readme);
  assertEquals(once.split("## Vocabulary").length, 2);
  assertEquals(transform(MD, once), once);
});

Deno.test("rename: review follow-ups: dividers, ${{ }}, and holder inside a word", () => {
  const dividers = [
    "// --- inputs ----------------------------------------------------------------",
    "// --- the pinned lifecycle -----------------------------------------------------",
    "// --- the work-item methods ----------------------------------------------------",
  ].join("\n");
  const out = transform(TS, dividers).split("\n");
  assertEquals(
    out[1].startsWith("// --- the pinned factory definition -"),
    true,
    out[1],
  );
  assertEquals(out[1].length, out[2].length);
  assertEquals(out.length, 3);
  assertEquals(out[0], dividers.split("\n")[0]);
  const doc = transform(
    TS,
    " * The raw, unevaluated globalArguments of a lifecycle holder, never the evaluated\n" +
      " * context.globalArgs, so a ${{ }} reaches the lifecycle schema's own error.",
  );
  assertEquals(doc.includes("${{ }}"), true, doc);
  assertEquals(
    transform(MD, "a stakeholder and shareholders, not the holder"),
    "a stakeholder and shareholders, not the factory",
  );
  assertEquals(leftovers("a stakeholder"), []);
  assertEquals(
    transform(
      MD,
      "Not for @swamp/software-factory runs, factory definitions, or",
    ),
    "Not for @swamp/software-factory runs or definitions, or",
  );
  assertEquals(
    transform(
      MD,
      "other is not an option. `lifecycles/` is gone too: gatorwalk-factory ships\nno lifecycle of its own.",
    ),
    "other is not an option. The top-level directory of examples is gone too:\ngatorwalk-factory ships no factory definition of its own.",
  );
});
