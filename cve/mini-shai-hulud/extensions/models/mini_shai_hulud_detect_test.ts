import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import {
  checkPackage,
  COMPROMISED,
  detectFormat,
  model,
  parseDenoLock,
  parsePackageLock,
} from "./mini_shai_hulud_detect.ts";

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/cve/mini-shai-hulud");
  assertEquals(typeof model.version, "string");
  assertEquals(
    new Set(Object.keys(model.methods)),
    new Set(["scan"]),
  );
  assertEquals(Object.keys(model.resources), ["scanResult"]);
  assertEquals(model.resources.scanResult.lifetime, "infinite");
  assertEquals(model.reports, ["@swamp/cve/mini-shai-hulud-report"]);
});

Deno.test("globalArguments requires lockfilePath", () => {
  const result = model.globalArguments.parse({
    lockfilePath: "/path/to/deno.lock",
  });
  assertEquals(result.lockfilePath, "/path/to/deno.lock");
});

Deno.test("compromised database has entries", () => {
  const count = Object.keys(COMPROMISED).length;
  assertEquals(count > 300, true, `Expected 300+ entries, got ${count}`);
});

Deno.test("checkPackage identifies compromised package", () => {
  assertEquals(checkPackage("size-sensor", "1.0.4"), "COMPROMISED");
  assertEquals(checkPackage("size-sensor", "1.1.4"), "COMPROMISED");
  assertEquals(checkPackage("size-sensor", "1.2.4"), "COMPROMISED");
  assertEquals(checkPackage("echarts-for-react", "3.0.7"), "COMPROMISED");
  assertEquals(checkPackage("@antv/g2", "5.5.8"), "COMPROMISED");
  assertEquals(checkPackage("timeago.js", "4.1.2"), "COMPROMISED");
});

Deno.test("checkPackage marks clean versions as clean", () => {
  assertEquals(checkPackage("size-sensor", "1.0.3"), "clean");
  assertEquals(checkPackage("size-sensor", "1.0.5"), "clean");
  assertEquals(checkPackage("@antv/g2", "5.5.7"), "clean");
});

Deno.test("checkPackage marks unknown packages as clean", () => {
  assertEquals(checkPackage("lodash", "4.17.21"), "clean");
  assertEquals(checkPackage("react", "18.2.0"), "clean");
});

Deno.test("detectFormat identifies deno.lock", () => {
  assertEquals(detectFormat("/project/deno.lock"), "deno.lock");
  assertEquals(detectFormat("deno.lock"), "deno.lock");
});

Deno.test("detectFormat identifies package-lock.json", () => {
  assertEquals(
    detectFormat("/project/package-lock.json"),
    "package-lock.json",
  );
});

Deno.test("detectFormat rejects unsupported lockfile formats", () => {
  assertThrows(
    () => detectFormat("yarn.lock"),
    Error,
    "Unsupported lockfile format",
  );
  assertThrows(
    () => detectFormat("/project/bun.lock"),
    Error,
    "Unsupported lockfile format",
  );
});

Deno.test("parseDenoLock extracts npm packages", () => {
  const lock = JSON.stringify({
    version: "4",
    specifiers: {
      "npm:zod@4.3.6": "4.3.6",
    },
    npm: {
      "zod@4.3.6": { integrity: "sha256-abc" },
      "@antv/g2@5.5.8": { integrity: "sha256-def" },
      "size-sensor@1.0.4_peer": { integrity: "sha256-ghi" },
    },
  });

  const entries = parseDenoLock(lock);
  assertEquals(entries.length, 3);

  const zod = entries.find((e) => e.name === "zod");
  assertEquals(zod?.version, "4.3.6");

  const g2 = entries.find((e) => e.name === "@antv/g2");
  assertEquals(g2?.version, "5.5.8");

  // Peer dep suffix stripped
  const sensor = entries.find((e) => e.name === "size-sensor");
  assertEquals(sensor?.version, "1.0.4");
});

Deno.test("parseDenoLock handles empty npm section", () => {
  const lock = JSON.stringify({ version: "4" });
  assertEquals(parseDenoLock(lock), []);
});

Deno.test("parsePackageLock v2 extracts from packages field", () => {
  const lock = JSON.stringify({
    lockfileVersion: 2,
    packages: {
      "": { version: "1.0.0" },
      "node_modules/size-sensor": { version: "1.0.4" },
      "node_modules/@antv/g2": { version: "5.5.8" },
      "node_modules/lodash": { version: "4.17.21" },
    },
  });

  const entries = parsePackageLock(lock);
  assertEquals(entries.length, 3);

  const sensor = entries.find((e) => e.name === "size-sensor");
  assertEquals(sensor?.version, "1.0.4");

  const g2 = entries.find((e) => e.name === "@antv/g2");
  assertEquals(g2?.version, "5.5.8");
});

Deno.test("parsePackageLock v2 extracts nested node_modules correctly", () => {
  const lock = JSON.stringify({
    lockfileVersion: 2,
    packages: {
      "": { version: "1.0.0" },
      "node_modules/some-lib": { version: "2.0.0" },
      "node_modules/some-lib/node_modules/size-sensor": { version: "1.0.4" },
      "node_modules/foo/node_modules/@antv/g2": { version: "5.5.8" },
    },
  });

  const entries = parsePackageLock(lock);
  assertEquals(entries.length, 3);

  const sensor = entries.find((e) => e.name === "size-sensor");
  assertEquals(sensor?.version, "1.0.4");

  const g2 = entries.find((e) => e.name === "@antv/g2");
  assertEquals(g2?.version, "5.5.8");
});

Deno.test("parsePackageLock v1 extracts from dependencies field", () => {
  const lock = JSON.stringify({
    lockfileVersion: 1,
    dependencies: {
      "size-sensor": {
        version: "1.0.4",
      },
      "lodash": {
        version: "4.17.21",
        dependencies: {
          "nested-pkg": { version: "1.0.0" },
        },
      },
    },
  });

  const entries = parsePackageLock(lock);
  assertEquals(entries.length, 3);
  assertEquals(entries.find((e) => e.name === "nested-pkg")?.version, "1.0.0");
});

Deno.test("scan method executes against a temp lockfile", async () => {
  const tmpDir = await Deno.makeTempDir();
  const tmpFile = `${tmpDir}/deno.lock`;
  try {
    await Deno.writeTextFile(
      tmpFile,
      JSON.stringify({
        version: "4",
        npm: {
          "size-sensor@1.0.4": { integrity: "sha256-abc" },
          "lodash@4.17.21": { integrity: "sha256-def" },
          "@antv/g2@5.5.8": { integrity: "sha256-ghi" },
        },
      }),
    );

    const handles: { specName: string; label: string; data: unknown }[] = [];
    const context = {
      globalArgs: { lockfilePath: tmpFile },
      logger: { info: (_msg: string) => {} },
      writeResource: (
        specName: string,
        label: string,
        data: unknown,
      ) => {
        handles.push({ specName, label, data });
        return Promise.resolve({ name: label });
      },
    };

    const result = await model.methods.scan.execute({}, context);
    assertEquals(result.dataHandles.length, 1);
    assertEquals(handles.length, 1);
    assertEquals(handles[0].specName, "scanResult");
    assertEquals(handles[0].label.includes("/"), false);
    assertEquals(handles[0].label.includes("\\"), false);
    assertEquals(handles[0].label.includes(".."), false);

    const scanResult = handles[0].data as {
      totalPackages: number;
      compromisedCount: number;
      cleanCount: number;
      packages: { name: string; version: string; status: string }[];
    };
    assertEquals(scanResult.totalPackages, 3);
    assertEquals(scanResult.compromisedCount, 2);
    assertEquals(scanResult.cleanCount, 1);

    const compromised = scanResult.packages.filter(
      (p) => p.status === "COMPROMISED",
    );
    assertEquals(compromised.length, 2);
    const names = compromised.map((p) => p.name).sort();
    assertEquals(names, ["@antv/g2", "size-sensor"]);
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("scan method accepts lockfilePath override", async () => {
  const tmpDir = await Deno.makeTempDir();
  const tmpFile = `${tmpDir}/deno.lock`;
  try {
    await Deno.writeTextFile(
      tmpFile,
      JSON.stringify({
        version: "4",
        npm: {
          "lodash@4.17.21": { integrity: "sha256-abc" },
        },
      }),
    );

    const handles: { data: unknown }[] = [];
    const context = {
      globalArgs: { lockfilePath: "/nonexistent" },
      logger: { info: (_msg: string) => {} },
      writeResource: (
        _specName: string,
        _instanceName: string,
        data: unknown,
      ) => {
        handles.push({ data });
        return Promise.resolve({ name: "x" });
      },
    };

    await model.methods.scan.execute({ lockfilePath: tmpFile }, context);
    const result = handles[0].data as { compromisedCount: number };
    assertEquals(result.compromisedCount, 0);
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});
