import { assertEquals } from "@std/assert";
import {
  pruneOrphanModels,
  pruneOrphanServices,
  pruneRetiredGcpServices,
} from "./generate.ts";
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

Deno.test("pruneRetiredGcpServices - removes retired generated services, flags stale ones", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const generated = `${GENERATED_MANIFEST_HEADER}\nmanifestVersion: 1\n`;
    for (
      const name of ["live", "retired", "fetchfailed", "handmade-retired"]
    ) {
      await Deno.mkdir(`${dir}/${name}`, { recursive: true });
    }
    await Deno.writeTextFile(`${dir}/live/manifest.yaml`, generated);
    await Deno.writeTextFile(`${dir}/retired/manifest.yaml`, generated);
    await Deno.writeTextFile(`${dir}/fetchfailed/manifest.yaml`, generated);
    await Deno.writeTextFile(
      `${dir}/handmade-retired/manifest.yaml`,
      "manifestVersion: 1\n",
    );

    const result = await pruneRetiredGcpServices(
      dir,
      new Set(["live"]),
      new Set(["retired", "handmade-retired"]),
    );

    // A missing schema alone never removes a service; it is only flagged.
    assertEquals(result, { removed: ["retired"], stale: ["fetchfailed"] });
    const remaining: string[] = [];
    for await (const entry of Deno.readDir(dir)) remaining.push(entry.name);
    assertEquals(remaining.sort(), ["fetchfailed", "handmade-retired", "live"]);
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});

Deno.test("pruneRetiredGcpServices - a missing provider directory is not an error", async () => {
  const dir = await Deno.makeTempDir();
  try {
    assertEquals(
      await pruneRetiredGcpServices(`${dir}/absent`, new Set(), new Set()),
      { removed: [], stale: [] },
    );
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});
