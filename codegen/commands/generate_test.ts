import { assertEquals } from "@std/assert";
import { pruneOrphanModels } from "./generate.ts";

Deno.test("pruneOrphanModels - removes only top-level non-test .ts files generation no longer produces", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await Deno.mkdir(`${dir}/_lib`);
    for (
      const f of [
        "kept.ts",
        "stale.ts",
        "kept_test.ts",
        "notes.md",
        "_lib/shared.ts",
      ]
    ) {
      await Deno.writeTextFile(`${dir}/${f}`, "");
    }
    await pruneOrphanModels(dir, new Set(["kept.ts"]), "test");
    const remaining: string[] = [];
    for await (const entry of Deno.readDir(dir)) remaining.push(entry.name);
    assertEquals(remaining.sort(), [
      "_lib",
      "kept.ts",
      "kept_test.ts",
      "notes.md",
    ]);
    await Deno.stat(`${dir}/_lib/shared.ts`);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("pruneOrphanModels - a missing models directory is not an error", async () => {
  const dir = await Deno.makeTempDir();
  try {
    await pruneOrphanModels(`${dir}/absent`, new Set(), "test");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});
