import { assertEquals } from "@std/assert";
import { findBareSpecifiers } from "./importSpecifiers.ts";

Deno.test("findBareSpecifiers - reports bare, scoped and subpath names", () => {
  const source = [
    `import { z } from "zod";`,
    `import { join } from "@std/path";`,
    `import * as posix from "@std/path/posix";`,
  ].join("\n");
  assertEquals(findBareSpecifiers(source), [
    "zod",
    "@std/path",
    "@std/path/posix",
  ]);
});

Deno.test("findBareSpecifiers - covers type, export, side-effect and dynamic imports", () => {
  const source = [
    `import type { TokenCredential } from "@azure/core-auth";`,
    `export { thing } from 'some-lib';`,
    `import "polyfill";`,
    `const mod = await import("lazy-lib");`,
  ].join("\n");
  assertEquals(findBareSpecifiers(source), [
    "@azure/core-auth",
    "some-lib",
    "polyfill",
    "lazy-lib",
  ]);
});

Deno.test("findBareSpecifiers - reads multi-line import clauses", () => {
  const source = `import {\n  create,\n  read,\n} from "helpers";\n`;
  assertEquals(findBareSpecifiers(source), ["helpers"]);
});

Deno.test("findBareSpecifiers - accepts explicit and relative specifiers", () => {
  const source = [
    `import { z } from "npm:zod@4.3.6";`,
    `import { join } from "jsr:@std/path@1";`,
    `import { create } from "./_lib/aws.ts";`,
    `import { other } from "../shared/other.ts";`,
    `import { Buffer } from "node:buffer";`,
    `export * from "https://example.com/mod.ts";`,
  ].join("\n");
  assertEquals(findBareSpecifiers(source), []);
});

Deno.test("findBareSpecifiers - ignores prose that mentions from", () => {
  const source = [
    `export const Schema = z.object({`,
    `  id: z.string().describe("copied from 'source' on create"),`,
    `});`,
  ].join("\n");
  assertEquals(findBareSpecifiers(source), []);
});
