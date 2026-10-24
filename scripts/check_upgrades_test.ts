// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
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

import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "@std/assert";
import { join } from "@std/path";
import {
  checkChange,
  compareVersions,
  DEFAULT_CONCURRENCY,
  extensionDirOf,
  firstDescribedMethod,
  hostSwampDirs,
  isModelFile,
  isNoOpBump,
  laneCredential,
  laneSharedFromHost,
  type ModelChange,
  type ModelDefinition,
  noOpVersions,
  parseConcurrency,
  parseModel,
  pathTestTarget,
  registryTarget,
  runPooled,
  runUpgradeMethod,
  SHARED_DATA_SUBDIRS,
  unimportablePublish,
  unloadableModel,
  withLane,
} from "./check_upgrades.ts";

const SOURCE = `
import { z } from "zod";
const ArgsSchema = z.object({ version: z.string() });
export const model = {
  type: "@swamp/ssh",
  version: "2026.09.25.1",
  globalArguments: ArgsSchema,
  upgrades: [
    { toVersion: "2026.07.28.1", upgradeAttributes: (o: unknown) => o },
    { toVersion: "2026.09.25.1", upgradeAttributes: (o: unknown) => o },
  ],
  methods: {
    exec: { description: "run" },
  },
};
`;

function def(version: string, toVersions: string[]): ModelDefinition {
  return { type: "@x/y", version, toVersions };
}

Deno.test("parseModel: reads type, version, upgrade entries and a method", () => {
  assertEquals(parseModel(SOURCE), {
    type: "@swamp/ssh",
    version: "2026.09.25.1",
    toVersions: ["2026.07.28.1", "2026.09.25.1"],
    firstMethod: "exec",
  });
});

Deno.test("parseModel: a file that defines no model is not a model", () => {
  assertEquals(parseModel("export function helper() {}"), null);
});

Deno.test("compareVersions: compares CalVer numerically", () => {
  assertEquals(compareVersions("2026.09.25.10", "2026.09.25.9") > 0, true);
  assertEquals(compareVersions("2026.09.25.1", "2026.09.25.1"), 0);
});

Deno.test("checkChange: a bump with a matching final entry passes", () => {
  assertEquals(
    checkChange({
      path: "ssh/extensions/models/ssh.ts",
      base: def("2026.07.28.1", ["2026.07.28.1"]),
      head: def("2026.09.25.1", ["2026.07.28.1", "2026.09.25.1"]),
    }).kind,
    "bumped",
  );
});

Deno.test("checkChange: a bump without an upgrade entry fails", () => {
  const verdict = checkChange({
    path: "ssh/extensions/models/ssh.ts",
    base: def("2026.07.28.1", ["2026.07.28.1"]),
    head: def("2026.09.25.1", ["2026.07.28.1"]),
  });
  assertEquals(verdict.kind, "error");
  if (verdict.kind === "error") {
    assertStringIncludes(
      verdict.message,
      "last upgrades entry is 2026.07.28.1",
    );
  }
});

Deno.test("checkChange: a version that moves backwards fails", () => {
  assertEquals(
    checkChange({
      path: "a/extensions/models/a.ts",
      base: def("2026.09.25.1", []),
      head: def("2026.07.28.1", ["2026.07.28.1"]),
    }).kind,
    "error",
  );
});

Deno.test("checkChange: new and unchanged models need no upgrade path", () => {
  assertEquals(
    checkChange({ path: "p", base: null, head: def("2026.01.01.1", []) }).kind,
    "new",
  );
  assertEquals(
    checkChange({
      path: "p",
      base: def("2026.01.01.1", []),
      head: def("2026.01.01.1", []),
    }).kind,
    "unchanged",
  );
});

Deno.test("isModelFile / extensionDirOf: generated and hand-written alike", () => {
  assertEquals(isModelFile("ssh/extensions/models/ssh.ts"), true);
  assertEquals(
    isModelFile("model/aws/ec2/extensions/models/instance.ts"),
    true,
  );
  assertEquals(isModelFile("ssh/extensions/models/ssh_test.ts"), false);
  assertEquals(isModelFile("ssh/extensions/models/_lib/x.ts"), false);
  assertEquals(
    extensionDirOf("model/aws/ec2/extensions/models/i.ts"),
    "model/aws/ec2",
  );
  // The repository's own working copy is not a published extension.
  assertEquals(extensionDirOf("extensions/models/issue_lifecycle.ts"), null);
});

Deno.test("isModelFile / extensionDirOf: models nested below extensions/models/", () => {
  assertEquals(
    isModelFile("stagecraft/extensions/models/engine/work_item.ts"),
    true,
  );
  assertEquals(
    isModelFile("stagecraft/extensions/models/tracker/linear.ts"),
    true,
  );
  assertEquals(
    isModelFile("stagecraft/extensions/models/engine/work_item_test.ts"),
    false,
  );
  assertEquals(
    isModelFile("stagecraft/extensions/models/_lib/engine/awaiting.ts"),
    false,
  );
  assertEquals(
    isModelFile("stagecraft/extensions/models/_lib/tracker/backends/linear.ts"),
    false,
  );
  assertEquals(
    extensionDirOf("stagecraft/extensions/models/engine/work_item.ts"),
    "stagecraft",
  );
});

Deno.test("firstDescribedMethod: the first method of a type describe payload", () => {
  assertEquals(
    firstDescribedMethod(
      JSON.stringify({ methods: [{ name: "create" }, { name: "claim" }] }),
    ),
    "create",
  );
  assertEquals(firstDescribedMethod("not json"), undefined);
  assertEquals(firstDescribedMethod("null"), undefined);
  assertEquals(firstDescribedMethod(JSON.stringify({})), undefined);
  assertEquals(
    firstDescribedMethod(JSON.stringify({ methods: [] })),
    undefined,
  );
  assertEquals(
    firstDescribedMethod(JSON.stringify({ methods: [{ description: "x" }] })),
    undefined,
  );
  assertEquals(
    firstDescribedMethod(JSON.stringify({ methods: [{ name: "" }] })),
    undefined,
  );
});

const MANIFEST =
  `manifest_version: 1\nname: "@swamp/ssh"\nversion: 2026.09.25.1\n`;

Deno.test("pathTestTarget: no manifest at HEAD or base is never published, skipped", () => {
  assertEquals(pathTestTarget(null, null).kind, "skip");
});

Deno.test("pathTestTarget: a manifest removed from a published extension fails", () => {
  const target = pathTestTarget(null, MANIFEST);
  assertEquals(target.kind, "error");
  if (target.kind === "error") assertStringIncludes(target.message, "removed");
});

Deno.test("pathTestTarget: a manifest without a name fails", () => {
  for (const base of [null, MANIFEST]) {
    const target = pathTestTarget("version: 2026.09.25.1\n", base);
    assertEquals(target.kind, "error");
    if (target.kind === "error") {
      assertStringIncludes(target.message, "no manifest name");
    }
  }
});

Deno.test("pathTestTarget: a manifest new in this change is skipped", () => {
  assertEquals(pathTestTarget(MANIFEST, null).kind, "skip");
});

Deno.test("pathTestTarget: a published extension is pulled by name", () => {
  assertEquals(pathTestTarget(MANIFEST, MANIFEST), {
    kind: "pull",
    name: "@swamp/ssh",
  });
});

// `swamp extension info <name> --json`, as the registry answers it: metadata
// on stdout with exit 0, or an error on stderr with exit 1.
const INFO_PUBLISHED = JSON.stringify({
  name: "@swamp/ssh",
  latestVersion: "2026.09.25.1",
  latestRc: null,
});
const INFO_NOT_FOUND = JSON.stringify({
  error: "Extension @swamp/ssh not found in the registry.",
});

Deno.test("registryTarget: a published extension is pulled by name", () => {
  assertEquals(registryTarget("@swamp/ssh", 0, INFO_PUBLISHED, ""), {
    kind: "pull",
    name: "@swamp/ssh",
  });
});

Deno.test("registryTarget: an extension the registry has never seen is skipped", () => {
  // A manifest on the base branch does not prove a publish happened.
  assertEquals(registryTarget("@swamp/ssh", 1, "", INFO_NOT_FOUND), {
    kind: "skip",
    reason: "not published to the registry",
  });
});

Deno.test("registryTarget: output on the other stream does not break the parse", () => {
  const notice = "A new version of swamp is available\n";
  assertEquals(
    registryTarget("@swamp/ssh", 0, INFO_PUBLISHED, notice).kind,
    "pull",
  );
  assertEquals(
    registryTarget("@swamp/ssh", 1, notice, INFO_NOT_FOUND).kind,
    "skip",
  );
});

Deno.test("registryTarget: any other registry failure is an error, not a skip", () => {
  for (
    const [code, stdout, stderr] of [
      [1, "", JSON.stringify({ error: "fetch failed: connection refused" })],
      [1, "", "not json"],
      [0, JSON.stringify({ name: "@swamp/ssh", latestVersion: null }), ""],
      // A not-found message with a zero exit is not trusted.
      [0, "", INFO_NOT_FOUND],
      // Not found for a different extension does not count.
      [
        1,
        "",
        JSON.stringify({
          error: "Extension @swamp/ssh-x not found in the registry.",
        }),
      ],
    ] as const
  ) {
    const target = registryTarget("@swamp/ssh", code, stdout, stderr);
    assertEquals(target.kind, "error", `${code} ${stdout} ${stderr}`);
  }
});

// `swamp extension pull <name>` for a published version whose code fails to
// import, verbatim from @swamp/aws/glue and @swamp/aws/sagemaker (exit 1).
const PULL_GLUE_UNIMPORTABLE =
  "Error: Install partially applied for @swamp/aws/glue — files extracted but bundling/importing the extension failed (Invalid regular expression: /^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$/: Range out of order in character class). Run `swamp doctor extensions` to inspect, or retry `swamp extension pull @swamp/aws/glue` to reconcile.\n";
const PULL_SAGEMAKER_UNIMPORTABLE =
  "Error: Install partially applied for @swamp/aws/sagemaker — files extracted but bundling/importing the extension failed (Invalid regular expression: /^([\\p{L}\\p{Z}\\p{N}_.:\\/=+\\-@]*)${1,256}/u: Nothing to repeat). Run `swamp doctor extensions` to inspect, or retry `swamp extension pull @swamp/aws/sagemaker` to reconcile.\n";

Deno.test("unimportablePublish: a published version that fails to import", () => {
  assertEquals(
    unimportablePublish("@swamp/aws/glue", 1, PULL_GLUE_UNIMPORTABLE),
    true,
  );
  assertEquals(
    unimportablePublish("@swamp/aws/sagemaker", 1, PULL_SAGEMAKER_UNIMPORTABLE),
    true,
  );
});

Deno.test("unimportablePublish: any other pull result is not one", () => {
  for (
    const [name, code, out] of [
      // A pull that succeeded.
      ["@swamp/aws/glue", 0, ""],
      // The message with a zero exit is not trusted.
      ["@swamp/aws/glue", 0, PULL_GLUE_UNIMPORTABLE],
      // The message for a different extension does not count.
      ["@swamp/aws/glu", 1, PULL_GLUE_UNIMPORTABLE],
      ["@swamp/aws/glue-x", 1, PULL_GLUE_UNIMPORTABLE],
      // Registry and network failures.
      ["@swamp/aws/glue", 1, "Error: fetch failed: connection refused\n"],
      ["@swamp/aws/glue", 1, ""],
      // A partial install that failed for another reason.
      [
        "@swamp/aws/glue",
        1,
        "Error: Install partially applied for @swamp/aws/glue — lockfile write failed\n",
      ],
      // A bundle that failed fetching a dependency, which a retry could fix.
      [
        "@swamp/aws/glue",
        1,
        "Error: Install partially applied for @swamp/aws/glue — files extracted but bundling/importing the extension failed (Import 'https://registry.npmjs.org/zod' failed: error sending request: connection refused). Run `swamp doctor extensions` to inspect, or retry `swamp extension pull @swamp/aws/glue` to reconcile.\n",
      ],
    ] as const
  ) {
    assertEquals(
      unimportablePublish(name, code, out),
      false,
      `${name} ${code}`,
    );
  }
});

// `swamp model create @swamp/aws/glue/session` after the partial pull above,
// verbatim apart from the scratch path and shortened hashes (exit 1).
const SESSION = "model/aws/glue/extensions/models/session.ts";
const CREATE_GLUE_UNLOADABLE =
  "2026-10-20T17:22:08.860Z [FTL] error: SyntaxError: Invalid regular expression: /^[\\u0020-\\uD7FF\\uE000-\\uFFFD\\uD800\\uDC00-\\uDBFF\\uDFFF\\t]*$/: Range out of order in character class\n    at new RegExp (<anonymous>)\n    at file:///scratch/.swamp/bundles/f2bae901/session.js?fp=1d92dabc&h=111527d4:312\n";
// A sibling model's load error logged as a warning, then a fatal error of
// its own; the stack names the sibling's bundle, not the bumped model's.
const SIBLING_WARNING =
  "[WRN] SyntaxError: Invalid regular expression: /x{/u: Lone quantifier brackets\n    at file:///scratch/.swamp/bundles/f2bae901/model_package.js?fp=aa&h=bb:40\n";

Deno.test("unloadableModel: a model whose published code does not import", () => {
  assertEquals(unloadableModel(1, CREATE_GLUE_UNLOADABLE, SESSION), true);
});

Deno.test("unloadableModel: any other create result is not one", () => {
  for (
    const [code, out, file] of [
      // A create that succeeded.
      [0, "", SESSION],
      // The message with a zero exit is not trusted.
      [0, CREATE_GLUE_UNLOADABLE, SESSION],
      // Registry, lock and other failures.
      [1, "[FTL] error: fetch failed: connection refused\n", SESSION],
      [1, "[FTL] error: could not acquire the datastore lock\n", SESSION],
      [1, "", SESSION],
      // A syntax error with another cause.
      [1, "[FTL] error: SyntaxError: Unexpected token '}'\n", SESSION],
      // The error belongs to another model's bundle.
      [
        1,
        CREATE_GLUE_UNLOADABLE,
        "model/aws/glue/extensions/models/user_defined_function.ts",
      ],
      [1, CREATE_GLUE_UNLOADABLE, "model/aws/glue/extensions/models/sess.ts"],
      // A sibling's regex error as a warning, then an unrelated fatal error.
      [
        1,
        SIBLING_WARNING +
        "[FTL] error: could not acquire the datastore lock\n",
        "model/aws/sagemaker/extensions/models/model_package.ts",
      ],
      // The regex error is not the fatal one.
      [
        1,
        "[WRN] SyntaxError: Invalid regular expression: /x{/u\n" +
        "    at file:///scratch/.swamp/bundles/f2bae901/session.js?fp=aa:1\n" +
        "[FTL] error: could not acquire the datastore lock\n",
        SESSION,
      ],
    ] as const
  ) {
    assertEquals(unloadableModel(code, out, file), false, `${code} ${file}`);
  }
});

Deno.test("runUpgradeMethod: stops a method that never returns", async () => {
  // A fake swamp whose method blocks (as studio serve does) until the signal
  // passed to it aborts.
  let calledWith: string[] = [];
  await runUpgradeMethod(
    "/scratch",
    "serve",
    10,
    (_cmd, args, _cwd, signal) => {
      calledWith = args;
      return new Promise((resolve) => {
        signal?.addEventListener(
          "abort",
          () => resolve({ code: -1, out: "", stdout: "", stderr: "" }),
        );
      });
    },
  );
  assertEquals(calledWith, ["model", "method", "run", "upgrade-test", "serve"]);
});

// The upgrades block exactly as codegen writes it: two no-op entries, then
// one that adds fields and one with a real transform.
const GENERATED = `
import { z } from "npm:zod@4.6.7";
export const model = {
  type: "@swamp/aws/s3/bucket",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => ({ ...old, x: 1 }),
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  methods: { get: { description: "No schema changes" } },
};
`;

Deno.test("noOpVersions: only entries with no schema changes and attributes passed through", () => {
  assertEquals(noOpVersions(GENERATED), ["2026.04.01.1", "2026.10.23.1"]);
  assertEquals(noOpVersions("export const x = 1;"), []);
});

function bump(
  baseVersion: string | null,
  toVersions: string[],
  headNoOps: string[],
): ModelChange {
  return {
    path: "model/aws/s3/extensions/models/bucket.ts",
    base: baseVersion === null ? null : def(baseVersion, []),
    head: def(toVersions.at(-1) ?? "2026.10.23.1", toVersions),
    headNoOps,
  };
}

Deno.test("isNoOpBump: a bump whose added entries are all no-ops", () => {
  const head = parseModel(GENERATED)!;
  assertEquals(
    isNoOpBump({
      path: "m.ts",
      base: def("2026.07.01.1", []),
      head,
      headNoOps: noOpVersions(GENERATED),
    }),
    true,
  );
});

Deno.test("isNoOpBump: an added entry that adds fields or transforms is not", () => {
  const head = parseModel(GENERATED)!;
  const headNoOps = noOpVersions(GENERATED);
  // Past 2026.04.01.1 the bump adds "Added: region" and a real transform.
  assertEquals(
    isNoOpBump({
      path: "m.ts",
      base: def("2026.04.01.1", []),
      head,
      headNoOps,
    }),
    false,
  );
  // Past 2026.06.06.1 it adds the transforming entry.
  assertEquals(
    isNoOpBump({
      path: "m.ts",
      base: def("2026.06.06.1", []),
      head,
      headNoOps,
    }),
    false,
  );
});

Deno.test("isNoOpBump: a new model, or one without parsed no-ops, is not", () => {
  assertEquals(
    isNoOpBump(bump(null, ["2026.10.23.1"], ["2026.10.23.1"])),
    false,
  );
  assertEquals(
    isNoOpBump({
      path: "m.ts",
      base: def("2026.01.01.1", []),
      head: def("2026.10.23.1", ["2026.10.23.1"]),
    }),
    false,
  );
  assertEquals(
    isNoOpBump(bump("2026.10.23.1", ["2026.10.23.1"], ["2026.10.23.1"])),
    false,
  );
});

Deno.test("parseConcurrency: a whole number from 1 to 16, default 8", () => {
  assertEquals(parseConcurrency(undefined), DEFAULT_CONCURRENCY);
  assertEquals(parseConcurrency("1"), 1);
  assertEquals(parseConcurrency("16"), 16);
  for (const bad of ["0", "17", "2.5", "eight", ""]) {
    assertEquals(parseConcurrency(bad), undefined, bad);
  }
});

/** A promise and the function that settles it. */
function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => (resolve = r));
  return { promise, resolve };
}

Deno.test("runPooled: results and emitted output follow input order, not finish order", async () => {
  const gates = [0, 1, 2, 3, 4].map(deferred);
  const emitted: number[] = [];
  const run = runPooled(
    [0, 1, 2, 3, 4],
    3,
    async (n) => {
      await gates[n].promise;
      return n * 10;
    },
    (result, index) => {
      assertEquals(result, index * 10);
      emitted.push(index);
    },
  );
  // Finish out of order: nothing is emitted until item 0 is done.
  gates[2].resolve();
  gates[1].resolve();
  await new Promise((r) => setTimeout(r, 0));
  assertEquals(emitted, []);
  gates[0].resolve();
  await new Promise((r) => setTimeout(r, 0));
  assertEquals(emitted, [0, 1, 2]);
  gates[4].resolve();
  gates[3].resolve();
  assertEquals(await run, [0, 10, 20, 30, 40]);
  assertEquals(emitted, [0, 1, 2, 3, 4]);
});

Deno.test("runPooled: never runs more than the limit at once", async () => {
  let running = 0;
  let peak = 0;
  await runPooled(Array.from({ length: 20 }, (_, i) => i), 4, async () => {
    running++;
    peak = Math.max(peak, running);
    await new Promise((r) => setTimeout(r, 1));
    running--;
  });
  assertEquals(peak, 4);
});

Deno.test("runPooled: a throwing worker stops new items and is rethrown", async () => {
  const started: number[] = [];
  await assertRejects(
    () =>
      runPooled([0, 1, 2, 3, 4, 5], 2, async (n) => {
        started.push(n);
        await new Promise((r) => setTimeout(r, 1));
        if (n === 1) throw new Error("boom");
      }),
    Error,
    "boom",
  );
  // Items 0 and 1 ran together; at most one more started before 1 failed.
  assertEquals(started.includes(5), false);
});

Deno.test("runPooled: no items, no work", async () => {
  assertEquals(await runPooled([], 8, () => Promise.resolve(1)), []);
});

const envOf = (vars: Record<string, string>) => (name: string) => vars[name];

Deno.test("hostSwampDirs: resolves the data and config dirs as swamp does", () => {
  assertEquals(hostSwampDirs(envOf({ HOME: "/h" })), {
    dataDir: "/h/.swamp",
    configDir: "/h/.config/swamp",
  });
  assertEquals(hostSwampDirs(envOf({ HOME: "/h", XDG_CONFIG_HOME: "/x" })), {
    dataDir: "/h/.swamp",
    configDir: "/x/swamp",
  });
  assertEquals(hostSwampDirs(envOf({ HOME: "/h", SWAMP_HOME: "/s" })), {
    dataDir: "/s",
    configDir: "/s/config",
  });
  assertEquals(
    hostSwampDirs(
      envOf({ HOME: "/h", SWAMP_HOME: "/s", SWAMP_CONFIG_DIR: "/c" }),
    ).configDir,
    "/c",
  );
  assertThrows(() => hostSwampDirs(envOf({})), Error, "HOME is not set");
});

Deno.test("hostSwampDirs: an empty variable is unset, and a relative one is made absolute", () => {
  assertEquals(
    hostSwampDirs(envOf({ HOME: "/h", SWAMP_HOME: "", SWAMP_CONFIG_DIR: "" })),
    { dataDir: "/h/.swamp", configDir: "/h/.config/swamp" },
  );
  const { dataDir, configDir } = hostSwampDirs(
    envOf({ HOME: "/h", SWAMP_HOME: "rel" }),
  );
  assertEquals(dataDir, join(Deno.cwd(), "rel"));
  assertEquals(configDir, join(Deno.cwd(), "rel", "config"));
});

Deno.test("laneCredential: a key the environment supplies is inherited, not copied", () => {
  assertEquals(laneCredential(envOf({ SWAMP_API_KEY: "k" }), null), {});
  assertEquals(laneCredential(envOf({ SWAMP_API_KEY_FILE: "/f" }), null), {});
});

Deno.test("laneCredential: otherwise the key and its server come from auth.json", () => {
  const auth = JSON.stringify({ apiKey: "k", serverUrl: "https://club.test" });
  assertEquals(laneCredential(envOf({}), auth), {
    SWAMP_API_KEY: "k",
    SWAMP_CLUB_URL: "https://club.test",
  });
  // An explicit SWAMP_CLUB_URL is left to win.
  assertEquals(
    laneCredential(envOf({ SWAMP_CLUB_URL: "https://other.test" }), auth),
    { SWAMP_API_KEY: "k" },
  );
});

Deno.test("laneCredential: no usable key is an error that says how to fix it", () => {
  for (const auth of [null, "not json", "{}", JSON.stringify({ apiKey: "" })]) {
    assertThrows(
      () => laneCredential(envOf({}), auth),
      Error,
      "swamp auth login",
    );
  }
});

Deno.test("withLane: a repo, home and config of its own, sharing only the runtime and module cache", async () => {
  const host = await Deno.makeTempDir();
  let root = "";
  try {
    const shared = { dataDir: host, credential: { SWAMP_API_KEY: "k" } };
    await withLane("lane-test-", shared, async (lane) => {
      root = join(lane.repo, "..");
      assertEquals(lane.env.SWAMP_API_KEY, "k");
      assertEquals(lane.env.SWAMP_HOME, join(root, "home"));
      assertEquals(lane.env.SWAMP_CONFIG_DIR, join(root, "config"));
      assertEquals((await Deno.stat(lane.repo)).isDirectory, true);
      assertEquals(
        [...Deno.readDirSync(lane.env.SWAMP_CONFIG_DIR)],
        [],
        "the config dir starts empty",
      );
      for (const sub of SHARED_DATA_SUBDIRS) {
        const link = join(lane.env.SWAMP_HOME, sub);
        assertEquals((await Deno.lstat(link)).isSymlink, true);
        assertEquals(await Deno.readLink(link), join(host, sub));
      }
      // Anything else swamp writes to its home stays in the lane.
      await Deno.writeTextFile(join(lane.env.SWAMP_HOME, "cache.json"), "{}");
    });
    assertEquals(
      [...Deno.readDirSync(host)].map((e) => e.name).sort(),
      [...SHARED_DATA_SUBDIRS].sort(),
    );
    await assertRejects(() => Deno.stat(root), Deno.errors.NotFound);
  } finally {
    await Deno.remove(host, { recursive: true });
  }
});

Deno.test("withLane: the lane is removed when its work throws", async () => {
  const host = await Deno.makeTempDir();
  let root = "";
  try {
    await assertRejects(
      () =>
        withLane("lane-test-", { dataDir: host, credential: {} }, (lane) => {
          root = join(lane.repo, "..");
          throw new Error("boom");
        }),
      Error,
      "boom",
    );
    await assertRejects(() => Deno.stat(root), Deno.errors.NotFound);
  } finally {
    await Deno.remove(host, { recursive: true });
  }
});

Deno.test("laneSharedFromHost: the host's data dir and the key from its auth.json", async () => {
  const config = await Deno.makeTempDir();
  try {
    await Deno.writeTextFile(
      join(config, "auth.json"),
      JSON.stringify({ apiKey: "k" }),
    );
    assertEquals(
      await laneSharedFromHost(
        envOf({ HOME: "/h", SWAMP_CONFIG_DIR: config }),
      ),
      { dataDir: "/h/.swamp", credential: { SWAMP_API_KEY: "k" } },
    );
    await assertRejects(
      () => laneSharedFromHost(envOf({ HOME: "/h", SWAMP_CONFIG_DIR: "/no" })),
      Error,
      "swamp auth login",
    );
  } finally {
    await Deno.remove(config, { recursive: true });
  }
});
