import { assertSnapshot } from "@std/testing/snapshot";
import { assertEquals } from "@std/assert";
import {
  buildUpgradesBlock,
  computeUpgradesBlock,
  extractExistingUpgrades,
  extractGlobalArgsFieldNames,
  generateUpgradeEntry,
  stripUpgradesBlock,
} from "./upgradesGenerator.ts";

// ---------------------------------------------------------------------------
// extractGlobalArgsFieldNames
// ---------------------------------------------------------------------------

Deno.test("extractGlobalArgsFieldNames - extracts top-level fields", () => {
  const content = `const GlobalArgsSchema = z.object({
  name: z.string(),
  region: z.string().optional(),
  size: z.number(),
});`;
  assertEquals(extractGlobalArgsFieldNames(content), [
    "name",
    "region",
    "size",
  ]);
});

Deno.test("extractGlobalArgsFieldNames - ignores nested object fields", () => {
  const content = `const GlobalArgsSchema = z.object({
  name: z.string(),
  config: z.object({
    cpu: z.number(),
    memory: z.number(),
  }),
});`;
  assertEquals(extractGlobalArgsFieldNames(content), ["name", "config"]);
});

Deno.test("extractGlobalArgsFieldNames - returns empty for missing schema", () => {
  assertEquals(extractGlobalArgsFieldNames("no schema here"), []);
});

// ---------------------------------------------------------------------------
// extractExistingUpgrades
// ---------------------------------------------------------------------------

Deno.test("extractExistingUpgrades - extracts upgrade entries", () => {
  const content = `  upgrades: [
    {
      toVersion: "1.0.0",
      description: "Added: foo",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2.0.0",
      description: "Removed: bar",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { bar: _bar, ...rest } = old;
        return rest;
      },
    },
  ],`;
  const entries = extractExistingUpgrades(content);
  assertEquals(entries.length, 2);
  assertEquals(entries[0].includes("1.0.0"), true);
  assertEquals(entries[1].includes("2.0.0"), true);
});

Deno.test("extractExistingUpgrades - returns empty when no upgrades block", () => {
  assertEquals(extractExistingUpgrades("no upgrades here"), []);
});

// ---------------------------------------------------------------------------
// stripUpgradesBlock
// ---------------------------------------------------------------------------

Deno.test("stripUpgradesBlock - removes upgrades from content", () => {
  const content = `  version: "1.0.0",
  upgrades: [
    {
      toVersion: "1.0.0",
      description: "test",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,`;
  const stripped = stripUpgradesBlock(content);
  assertEquals(stripped.includes("upgrades"), false);
  assertEquals(stripped.includes("version"), true);
  assertEquals(stripped.includes("globalArguments"), true);
});

Deno.test("stripUpgradesBlock - no-op when no upgrades", () => {
  const content = `  version: "1.0.0",\n  globalArguments: GlobalArgsSchema,`;
  assertEquals(stripUpgradesBlock(content), content);
});

// ---------------------------------------------------------------------------
// generateUpgradeEntry snapshots
// ---------------------------------------------------------------------------

Deno.test("generateUpgradeEntry - added fields only (no-op)", async (t) => {
  await assertSnapshot(
    t,
    generateUpgradeEntry("2.0.0", ["newField", "otherField"], []),
  );
});

Deno.test("generateUpgradeEntry - removed fields only", async (t) => {
  await assertSnapshot(
    t,
    generateUpgradeEntry("2.0.0", [], ["oldField", "deprecatedField"]),
  );
});

Deno.test("generateUpgradeEntry - both added and removed", async (t) => {
  await assertSnapshot(
    t,
    generateUpgradeEntry("2.0.0", ["added"], ["removed"]),
  );
});

Deno.test("generateUpgradeEntry - no changes", async (t) => {
  await assertSnapshot(t, generateUpgradeEntry("2.0.0", [], []));
});

// ---------------------------------------------------------------------------
// buildUpgradesBlock snapshots
// ---------------------------------------------------------------------------

Deno.test("buildUpgradesBlock - single entry", async (t) => {
  const entry = generateUpgradeEntry("1.0.0", ["field1"], []);
  await assertSnapshot(t, buildUpgradesBlock([], entry));
});

Deno.test("buildUpgradesBlock - existing + new entry", async (t) => {
  const existing =
    `    {\n      toVersion: "1.0.0",\n      description: "Added: x",\n      upgradeAttributes: (old: Record<string, unknown>) => old,\n    }`;
  const newEntry = generateUpgradeEntry("2.0.0", [], ["removed"]);
  await assertSnapshot(t, buildUpgradesBlock([existing], newEntry));
});

Deno.test("buildUpgradesBlock - empty returns empty string", () => {
  assertEquals(buildUpgradesBlock([], null), "");
});

// ---------------------------------------------------------------------------
// computeUpgradesBlock
// ---------------------------------------------------------------------------

Deno.test("computeUpgradesBlock - new resource returns undefined", () => {
  assertEquals(
    computeUpgradesBlock("new", "1.0.0", undefined, ["field"]),
    undefined,
  );
});

Deno.test("computeUpgradesBlock - unchanged carries forward existing", () => {
  const existingContent = `const GlobalArgsSchema = z.object({
  name: z.string(),
});

export const model = {
  version: "1.0.0",
  upgrades: [
    {
      toVersion: "1.0.0",
      description: "Added: name",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
};`;
  const result = computeUpgradesBlock("unchanged", "1.0.0", existingContent, [
    "name",
  ]);
  assertEquals(result !== undefined, true);
  assertEquals(result!.includes("1.0.0"), true);
});

Deno.test("computeUpgradesBlock - unchanged with version/upgrade mismatch adds corrective entry", () => {
  const existingContent = `const GlobalArgsSchema = z.object({
  name: z.string(),
});

export const model = {
  version: "2026.04.23.2",
  upgrades: [
    {
      toVersion: "2026.04.23.1",
      description: "Added: name",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
};`;
  const result = computeUpgradesBlock(
    "unchanged",
    "2026.04.23.2",
    existingContent,
    ["name"],
  );
  assertEquals(result !== undefined, true);
  assertEquals(result!.includes('"2026.04.23.2"'), true);
  assertEquals(result!.includes('"2026.04.23.1"'), true);
  // Should have both the original entry and the corrective entry
  const entryCount = (result!.match(/toVersion:/g) || []).length;
  assertEquals(entryCount, 2);
});

Deno.test("computeUpgradesBlock - unchanged with matching version carries forward as-is", () => {
  const existingContent = `const GlobalArgsSchema = z.object({
  name: z.string(),
});

export const model = {
  version: "2026.04.23.1",
  upgrades: [
    {
      toVersion: "2026.04.23.1",
      description: "Added: name",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
};`;
  const result = computeUpgradesBlock(
    "unchanged",
    "2026.04.23.1",
    existingContent,
    ["name"],
  );
  assertEquals(result !== undefined, true);
  // Should only have the original entry, no corrective entry added
  const entryCount = (result!.match(/toVersion:/g) || []).length;
  assertEquals(entryCount, 1);
});

Deno.test("computeUpgradesBlock - changed generates new entry for removed field", async (t) => {
  const existingContent = `const GlobalArgsSchema = z.object({
  name: z.string(),
  oldField: z.string(),
});`;
  const result = computeUpgradesBlock("changed", "2.0.0", existingContent, [
    "name",
  ]);
  assertEquals(result !== undefined, true);
  await assertSnapshot(t, result);
});
