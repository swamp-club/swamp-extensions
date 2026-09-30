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
import * as posix from "@std/path/posix";

// ---------------------------------------------------------------------------
// The seam between the engine and the tracker (DESIGN.md, "The seam"), as a
// test. Every file under extensions/ and integration/ is engine, tracker or
// extension code, by path:
//
// - tracker: extensions/models/tracker/, extensions/models/_lib/tracker/ and
//   integration/tracker/;
// - extension: integration/extension/, the tests of the whole extension,
//   which may import either side;
// - engine: everything else, integration/harness.ts included.
//
// The rules:
//
// 1. Engine code imports only engine code.
// 2. Tracker code imports the engine only through _lib/engine/tracker.ts.
//    Tracker test code may also use _lib/engine/tracker_testing.ts and
//    integration/harness.ts.
// 3. Tracker core (_lib/tracker/core/) imports no backend and no tracker
//    model entrypoint.
// 4. Production code imports no test code.
// 5. _lib/engine/tracker.ts exports only names tracker production code
//    imports.
//
// A dynamic import() must name a package: a relative or computed one is
// refused, since this scan could not follow it.
// ---------------------------------------------------------------------------

const ENGINE_SURFACE = "extensions/models/_lib/engine/tracker.ts";
const ENGINE_TEST_SURFACE = "extensions/models/_lib/engine/tracker_testing.ts";
const HARNESS = "integration/harness.ts";
const SELF = "extensions/models/boundary_test.ts";

const TRACKER_DIRS = [
  "extensions/models/tracker/",
  "extensions/models/_lib/tracker/",
  "integration/tracker/",
];
const EXTENSION_DIRS = ["integration/extension/"];
const TRACKER_CORE = "extensions/models/_lib/tracker/core/";
const TRACKER_OUTSIDE_CORE = [
  "extensions/models/_lib/tracker/backends/",
  "extensions/models/tracker/",
];

type Layer = "engine" | "tracker" | "extension";

function layerOf(path: string): Layer {
  if (TRACKER_DIRS.some((d) => path.startsWith(d))) return "tracker";
  if (EXTENSION_DIRS.some((d) => path.startsWith(d))) return "extension";
  return "engine";
}

/** Tests, fakes, fixtures, the engine's test surface and all of integration/. */
function isTest(path: string): boolean {
  const name = posix.basename(path);
  return path.startsWith("integration/") || name.endsWith("_test.ts") ||
    name.endsWith("_fake.ts") || name.startsWith("fake_") ||
    name.endsWith("_testing.ts") || name === "test_support.ts" ||
    name === "tracker_conformance.ts";
}

interface Import {
  /** The resolved path of a relative specifier, or the bare specifier. */
  target: string;
  /** The names imported or re-exported; "*" for a namespace or star. */
  names: string[];
}

interface Parsed {
  imports: Import[];
  /** Names a module re-exports with `export { ... } from`. */
  reexports: string[];
  dynamic: string[];
}

const STATIC = new RegExp(
  String.raw`(?:^|\n)[ \t]*(import|export)\s+(type\s+)?` +
    String.raw`(\{[^}]*\}|\*(?:\s+as\s+\w+)?|\w+(?:\s*,\s*\{[^}]*\})?)\s*` +
    String.raw`from\s*"([^"]+)"`,
  "g",
);
const SIDE_EFFECT = /(?:^|\n)[ \t]*import\s*"([^"]+)"/g;
const DYNAMIC = /\bimport\s*\(\s*([^)]*)\)/g;

function namesIn(clause: string, exported: boolean): string[] {
  const names: string[] = [];
  const braces = clause.match(/\{([^}]*)\}/);
  const before = braces ? clause.slice(0, braces.index) : clause;
  if (/\*/.test(before)) names.push("*");
  else if (/\w/.test(before)) names.push("default");
  for (const raw of (braces?.[1] ?? "").split(",")) {
    const part = raw.replace(/^\s*type\s+/, "").trim();
    if (part === "") continue;
    const [name, alias] = part.split(/\s+as\s+/);
    names.push(exported ? (alias ?? name).trim() : name.trim());
  }
  return names;
}

function resolve(from: string, specifier: string): string {
  if (!specifier.startsWith(".")) return specifier;
  return posix.normalize(posix.join(posix.dirname(from), specifier));
}

function parse(path: string, source: string): Parsed {
  const out: Parsed = { imports: [], reexports: [], dynamic: [] };
  for (const m of source.matchAll(STATIC)) {
    const target = resolve(path, m[4]);
    out.imports.push({ target, names: namesIn(m[3], false) });
    if (m[1] === "export") out.reexports.push(...namesIn(m[3], true));
  }
  for (const m of source.matchAll(SIDE_EFFECT)) {
    out.imports.push({ target: resolve(path, m[1]), names: [] });
  }
  for (const m of source.matchAll(DYNAMIC)) {
    const literal = m[1].trim().match(/^["']([^"']+)["']$/);
    if (literal === null || literal[1].startsWith(".")) {
      out.dynamic.push(m[1].trim());
    }
  }
  return out;
}

/** Every violation of the rules above, given each file's path and source. */
function violations(files: Map<string, string>): string[] {
  const found: string[] = [];
  const surfaceUse = new Set<string>();
  for (const [path, source] of files) {
    const parsed = parse(path, source);
    const layer = layerOf(path);
    for (const d of parsed.dynamic) {
      found.push(`${path}: dynamic import(${d}) must name a package`);
    }
    for (const { target, names } of parsed.imports) {
      if (!files.has(target)) continue; // a package, or outside the scan
      const to = layerOf(target);
      if (layer === "engine" && to !== "engine") {
        found.push(`${path}: engine code imports ${to} code ${target}`);
      }
      if (layer === "tracker" && to !== "tracker") {
        const doors = isTest(path)
          ? [ENGINE_SURFACE, ENGINE_TEST_SURFACE, HARNESS]
          : [ENGINE_SURFACE];
        if (!doors.includes(target)) {
          found.push(
            `${path}: tracker code imports ${target}; use ${
              doors.join(" or ")
            }`,
          );
        }
      }
      if (
        path.startsWith(TRACKER_CORE) &&
        TRACKER_OUTSIDE_CORE.some((d) => target.startsWith(d))
      ) {
        found.push(`${path}: tracker core imports ${target}`);
      }
      if (!isTest(path) && isTest(target)) {
        found.push(`${path}: production code imports test code ${target}`);
      }
      if (
        target === ENGINE_SURFACE && layer === "tracker" && !isTest(path)
      ) {
        names.forEach((n) => surfaceUse.add(n));
      }
    }
  }
  const surface = files.get(ENGINE_SURFACE);
  if (surface !== undefined) {
    for (const name of parse(ENGINE_SURFACE, surface).reexports) {
      if (!surfaceUse.has(name)) {
        found.push(
          `${ENGINE_SURFACE}: exports ${name}, which no tracker code imports`,
        );
      }
    }
  }
  return found;
}

// --- the real tree ------------------------------------------------------------

const EXTENSION_ROOT = new URL("../../", import.meta.url);

async function sources(): Promise<Map<string, string>> {
  const files = new Map<string, string>();
  async function walk(rel: string) {
    for await (const entry of Deno.readDir(new URL(rel, EXTENSION_ROOT))) {
      const path = `${rel}${entry.name}`;
      if (entry.isDirectory) await walk(`${path}/`);
      // This file's own fixtures would read as imports; it imports only
      // packages.
      else if (path.endsWith(".ts") && path !== SELF) {
        files.set(
          path,
          await Deno.readTextFile(new URL(path, EXTENSION_ROOT)),
        );
      }
    }
  }
  await walk("extensions/");
  await walk("integration/");
  return files;
}

Deno.test("boundary: the engine and the tracker keep to the seam", async () => {
  const files = await sources();
  // A wrong root would find nothing and pass; every layer has files.
  for (const layer of ["engine", "tracker", "extension"] as const) {
    const n = [...files.keys()].filter((p) => layerOf(p) === layer).length;
    assert(n >= 3, `only ${n} ${layer} files found`);
  }
  assert(files.has(ENGINE_SURFACE), `${ENGINE_SURFACE} is missing`);
  assertEquals(violations(files), []);
});

// --- each rule refuses a crossing -----------------------------------------------

const LIB = "extensions/models/_lib";

/** A small tree that keeps every rule, to add one crossing to. */
function clean(): Map<string, string> {
  return new Map([
    [`${LIB}/engine/run_store.ts`, `export const RUN_SPEC = "run";\n`],
    [`${LIB}/engine/fake_swamp.ts`, `export const fakeSwamp = 1;\n`],
    [
      ENGINE_SURFACE,
      `export { RUN_SPEC } from "./run_store.ts";\n`,
    ],
    [
      ENGINE_TEST_SURFACE,
      `export * from "./tracker.ts";\n` +
      `export { fakeSwamp } from "./fake_swamp.ts";\n`,
    ],
    [
      `${LIB}/tracker/core/claim.ts`,
      `import { RUN_SPEC } from "../../engine/tracker.ts";\n`,
    ],
    [
      `${LIB}/tracker/core/claim_test.ts`,
      `import { fakeSwamp } from "../../engine/tracker_testing.ts";\n`,
    ],
    [
      `${LIB}/tracker/backends/linear.ts`,
      `import { RUN_SPEC } from "../../engine/tracker.ts";\n` +
      `import { claim } from "../core/claim.ts";\n`,
    ],
    [
      "integration/extension/skill_test.ts",
      `import { claim } from "../../${LIB}/tracker/core/claim.ts";\n` +
      `import { RUN_SPEC } from "../../${LIB}/engine/run_store.ts";\n`,
    ],
  ]);
}

function withFile(path: string, source: string): Map<string, string> {
  const files = clean();
  files.set(path, (files.get(path) ?? "") + source);
  return files;
}

Deno.test("boundary: the clean fixture has no violations", () => {
  assertEquals(violations(clean()), []);
});

Deno.test("boundary: an engine file importing tracker code fails", () => {
  const files = withFile(
    `${LIB}/engine/run_store.ts`,
    `import { claim } from "../tracker/core/claim.ts";\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/engine/run_store.ts: engine code imports tracker code ` +
    `${LIB}/tracker/core/claim.ts`,
  ]);
});

Deno.test("boundary: an engine file importing an extension test fails", () => {
  const files = withFile(
    `${LIB}/engine/fake_swamp.ts`,
    `import { x } from "../../../../integration/extension/skill_test.ts";\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/engine/fake_swamp.ts: engine code imports extension code ` +
    "integration/extension/skill_test.ts",
  ]);
});

Deno.test("boundary: tracker code importing the engine directly fails", () => {
  const files = withFile(
    `${LIB}/tracker/core/claim.ts`,
    `import { RUN_SPEC } from "../../engine/run_store.ts";\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/tracker/core/claim.ts: tracker code imports ` +
    `${LIB}/engine/run_store.ts; use ${ENGINE_SURFACE}`,
  ]);
});

Deno.test("boundary: tracker production code using the test surface fails", () => {
  const files = withFile(
    `${LIB}/tracker/backends/linear.ts`,
    `import { fakeSwamp } from "../../engine/tracker_testing.ts";\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/tracker/backends/linear.ts: tracker code imports ` +
    `${ENGINE_TEST_SURFACE}; use ${ENGINE_SURFACE}`,
    `${LIB}/tracker/backends/linear.ts: production code imports test code ` +
    ENGINE_TEST_SURFACE,
  ]);
});

Deno.test("boundary: tracker core importing a backend fails", () => {
  const files = withFile(
    `${LIB}/tracker/core/claim.ts`,
    `import { linear } from "../backends/linear.ts";\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/tracker/core/claim.ts: tracker core imports ` +
    `${LIB}/tracker/backends/linear.ts`,
  ]);
});

Deno.test("boundary: production code importing a fake fails", () => {
  const files = withFile(
    `${LIB}/engine/run_store.ts`,
    `import { fakeSwamp } from "./fake_swamp.ts";\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/engine/run_store.ts: production code imports test code ` +
    `${LIB}/engine/fake_swamp.ts`,
  ]);
});

Deno.test("boundary: a surface export no tracker code imports fails", () => {
  const files = withFile(
    ENGINE_SURFACE,
    `export { type RunStore as Store } from "./run_store.ts";\n`,
  );
  assertEquals(violations(files), [
    `${ENGINE_SURFACE}: exports Store, which no tracker code imports`,
  ]);
});

Deno.test("boundary: a surface export only a tracker test imports fails", () => {
  const files = clean();
  files.set(
    ENGINE_SURFACE,
    `export { RUN_SPEC } from "./run_store.ts";\n` +
      `export { fakeSwamp } from "./fake_swamp.ts";\n`,
  );
  files.set(
    `${LIB}/tracker/core/claim_test.ts`,
    `import { fakeSwamp } from "../../engine/tracker.ts";\n`,
  );
  assertEquals(violations(files), [
    `${ENGINE_SURFACE}: production code imports test code ` +
    `${LIB}/engine/fake_swamp.ts`,
    `${ENGINE_SURFACE}: exports fakeSwamp, which no tracker code imports`,
  ]);
});

Deno.test("boundary: a relative or computed dynamic import fails; a package does not", () => {
  const files = withFile(
    `${LIB}/tracker/core/claim.ts`,
    `const a = await import("@std/yaml");\n` +
      `const b = await import("../../engine/run_store.ts");\n` +
      `const c = await import(name);\n`,
  );
  assertEquals(violations(files), [
    `${LIB}/tracker/core/claim.ts: dynamic import("../../engine/run_store.ts") ` +
    "must name a package",
    `${LIB}/tracker/core/claim.ts: dynamic import(name) must name a package`,
  ]);
});

// --- the parser ------------------------------------------------------------------

Deno.test("boundary: multi-line lists, type modifiers and aliases are read by their exported name", () => {
  const parsed = parse(
    `${LIB}/tracker/core/claim.ts`,
    "import {\n  type RunRecord,\n  RUN_SPEC as SPEC,\n  parseRun,\n}" +
      ` from "../../engine/tracker.ts";\n` +
      `import type { Lifecycle } from "../../engine/tracker.ts";\n` +
      `export { type Json as J, digestOf } from "./canonical.ts";\n` +
      `import * as all from "./adapter.ts";\n`,
  );
  assertEquals(parsed.imports, [
    {
      target: ENGINE_SURFACE,
      names: ["RunRecord", "RUN_SPEC", "parseRun"],
    },
    { target: ENGINE_SURFACE, names: ["Lifecycle"] },
    { target: `${LIB}/tracker/core/canonical.ts`, names: ["Json", "digestOf"] },
    { target: `${LIB}/tracker/core/adapter.ts`, names: ["*"] },
  ]);
  assertEquals(parsed.reexports, ["J", "digestOf"]);
});

Deno.test("boundary: a surface name imported under an alias counts as used", () => {
  const files = clean();
  files.set(
    `${LIB}/tracker/core/claim.ts`,
    `import {\n  type RUN_SPEC as Spec,\n} from "../../engine/tracker.ts";\n`,
  );
  assertEquals(violations(files), []);
});
