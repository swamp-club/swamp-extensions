import { assertSnapshot } from "@std/testing/snapshot";
import { assertEquals, assertStringIncludes } from "@std/assert";
import {
  generateTailscaleExtensionModel,
  zodFull,
} from "./extensionModelGenerator.ts";
import { generateTailscaleLibFile } from "./libGenerator.ts";
import { resolveModels } from "./pipeline.ts";
import { entries, fixtureSpec } from "./testFixtures.ts";

/** Drops the copyright header, whose year would churn the snapshots. */
function withoutHeader(code: string): string {
  return code.replace(/^(\/\/.*\n)+\n/, "");
}

function generate(name: string): string {
  const { models } = resolveModels(fixtureSpec(), entries([name]));
  return generateTailscaleExtensionModel({
    model: models[0],
    extensionName: "@swamp/tailscale",
    version: "2026.01.01.1",
  });
}

// One model of each kind, plus the special-cased settings models.
for (
  const name of [
    "webhook",
    "tailnet_key",
    "service",
    "tailnet_settings",
    "dns_split_nameservers",
    "policy_file",
    "device_tags",
    "device",
  ]
) {
  Deno.test(`generateTailscaleExtensionModel - ${name}`, async (t) => {
    await assertSnapshot(t, withoutHeader(generate(name)));
  });
}

Deno.test("generateTailscaleLibFile - copies the runtime module", () => {
  const lib = generateTailscaleLibFile();
  assertStringIncludes(lib, "Do not edit manually");
  assertStringIncludes(lib, "export async function apiRequest(");
  // The runtime module's own header is replaced, not duplicated.
  assertStringIncludes(lib.split("export")[0], "Auto-generated");
});

Deno.test("zodFull - numeric enum values are emitted as JSON literals", () => {
  assertEquals(
    zodFull({ type: "integer", enum: [1, 2] }),
    "z.union([z.literal(1), z.literal(2)])",
  );
  // A string in a numeric enum must stay a quoted literal to compile.
  assertEquals(
    zodFull({ type: "number", enum: [1, "auto"] }),
    'z.union([z.literal(1), z.literal("auto")])',
  );
});
