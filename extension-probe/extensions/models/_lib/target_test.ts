import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import { parseTarget, pullSpec, targetSlug } from "./target.ts";

Deno.test("parseTarget reads a name and an optional exact version", () => {
  assertEquals(parseTarget("@skunk-ape/stef"), {
    collective: "@skunk-ape",
    name: "@skunk-ape/stef",
  });
  const t = parseTarget("@swamp/aws/ec2@2026.11.01.3");
  assertEquals(t, {
    collective: "@swamp",
    name: "@swamp/aws/ec2",
    version: "2026.11.01.3",
  });
  assertEquals(pullSpec(t), "@swamp/aws/ec2@2026.11.01.3");
  assertEquals(targetSlug(t), "swamp-aws-ec2");
});

Deno.test("parseTarget refuses collectives outside the allowlist", () => {
  assertThrows(
    () => parseTarget("@someone/thing"),
    Error,
    "only extensions from @skunk-ape or @swamp may be pulled",
  );
});

Deno.test("parseTarget refuses malformed names and versions", () => {
  assertThrows(() => parseTarget("stef"), Error, "is not an extension name");
  assertThrows(
    () => parseTarget("@skunk-ape/stef@latest"),
    Error,
    "is not a CalVer version",
  );
  assertThrows(
    () => parseTarget("@skunk-ape/../../etc"),
    Error,
    "is not an extension name",
  );
});
