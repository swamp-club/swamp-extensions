import { assertEquals } from "@std/assert";
import { pruneOrphanModels, pruneOrphanServices } from "./generate.ts";
import { GENERATED_MANIFEST_HEADER } from "../shared/manifestGenerator.ts";

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

Deno.test("pruneOrphanServices - removes only generated service dirs not in the keep set", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const generated = `${GENERATED_MANIFEST_HEADER}\nmanifestVersion: 1\n`;
    for (const name of ["live", "errored", "gone", "handmade", "nomanifest"]) {
      await Deno.mkdir(`${dir}/${name}/extensions/models`, { recursive: true });
    }
    await Deno.writeTextFile(`${dir}/live/manifest.yaml`, generated);
    await Deno.writeTextFile(`${dir}/errored/manifest.yaml`, generated);
    await Deno.writeTextFile(`${dir}/gone/manifest.yaml`, generated);
    await Deno.writeTextFile(
      `${dir}/gone/extensions/models/stale.ts`,
      "",
    );
    await Deno.writeTextFile(
      `${dir}/handmade/manifest.yaml`,
      "manifestVersion: 1\n",
    );
    await Deno.writeTextFile(`${dir}/README.md`, "");

    const removed = await pruneOrphanServices(
      dir,
      new Set(["live", "errored"]),
      "test",
    );

    assertEquals(removed, ["gone"]);
    const remaining: string[] = [];
    for await (const entry of Deno.readDir(dir)) remaining.push(entry.name);
    assertEquals(remaining.sort(), [
      "README.md",
      "errored",
      "handmade",
      "live",
      "nomanifest",
    ]);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("pruneOrphanServices - a missing provider directory is not an error", async () => {
  const dir = await Deno.makeTempDir();
  try {
    assertEquals(
      await pruneOrphanServices(`${dir}/absent`, new Set(), "test"),
      [],
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});
