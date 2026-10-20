import { assertEquals } from "@std/assert";
import { pcreToRegexp } from "./util.ts";

// Patterns copied verbatim from the CloudFormation schemas whose generated
// models failed to import (swamp-club #3367).

// AWS::Chime::Channel: the astral range is written as literal characters.
const CHIME_CHANNEL =
  "^[\\u0009\\u000A\\u000D\\u0020-\\u007E\\u0085\\u00A0-\\uD7FF\\uE000-\\uFFFD\u{10000}-\u{10FFFF}]*$";
// AWS::Glue::Session and AWS::Glue::UserDefinedFunction: the astral range is
// written as surrogate-pair escapes.
const GLUE_SESSION =
  "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$";
const GLUE_USER_DEFINED_FUNCTION =
  "^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\r\\n\\t]*$";
// AWS::Transfer::HostKey: PCRE's \p{Print} has no JS equivalent.
const TRANSFER_HOST_KEY = "^[\\p{Print}]*$";
// AWS::SageMaker::ModelPackage: a quantifier after the end anchor.
const SAGEMAKER_MODEL_PACKAGE = "^([\\p{L}\\p{Z}\\p{N}_.:\\/=+\\-@]*)${1,256}";

function assertCompiles(result: { pattern: string; flags: string }) {
  new RegExp(result.pattern, result.flags);
}

Deno.test("pcreToRegexp - astral range as literal characters gains the u flag", () => {
  const result = pcreToRegexp(CHIME_CHANNEL);
  assertEquals(result, { pattern: CHIME_CHANNEL, flags: "u" });
  assertCompiles(result!);
  const regex = new RegExp(result!.pattern, result!.flags);
  assertEquals(regex.test("hello \u{1F600}"), true);
});

Deno.test("pcreToRegexp - astral range as surrogate pairs gains the u flag", () => {
  for (const pattern of [GLUE_SESSION, GLUE_USER_DEFINED_FUNCTION]) {
    const result = pcreToRegexp(pattern);
    assertEquals(result, { pattern, flags: "u" });
    assertCompiles(result!);
    const regex = new RegExp(result!.pattern, result!.flags);
    assertEquals(regex.test("session-1 \u{1F600}"), true);
  }
});

Deno.test("pcreToRegexp - a pattern JS cannot compile is skipped", () => {
  assertEquals(pcreToRegexp(TRANSFER_HOST_KEY), undefined);
  assertEquals(pcreToRegexp(SAGEMAKER_MODEL_PACKAGE), undefined);
});

Deno.test("pcreToRegexp - patterns that already compile are unchanged", () => {
  const cases: [string, { pattern: string; flags: string }][] = [
    ["^[a-zA-Z0-9-]+$", { pattern: "^[a-zA-Z0-9-]+$", flags: "" }],
    ["(?i)^[a-z]+$", { pattern: "^[a-z]+$", flags: "i" }],
    ["\\A[a-z]+\\Z", { pattern: "^[a-z]+$", flags: "" }],
    [
      "^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$",
      { pattern: "^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-@]*)$", flags: "u" },
    ],
    // A BROKEN_REGEXES entry.
    [
      "^[a-zA-Z-0-9-:\\/]*{1,1000}$",
      { pattern: "^[a-zA-Z-0-9-:\\/]{1,1000}$", flags: "" },
    ],
  ];
  for (const [input, expected] of cases) {
    const result = pcreToRegexp(input);
    assertEquals(result, expected);
    assertCompiles(result!);
  }
});

Deno.test("pcreToRegexp - unsupported subpatterns are still skipped", () => {
  assertEquals(pcreToRegexp("^(?P<name>[a-z]+)$"), undefined);
});
