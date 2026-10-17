import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { TarStream } from "jsr:@std/tar@0.1.10/tar-stream";
import { codexProvider, extractTarball } from "./codex.ts";

// ---------------------------------------------------------------------------
// Arg building
// ---------------------------------------------------------------------------

Deno.test("codex: buildArgs places prompt as last argument", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "review the code",
      model: "o4-mini",
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    {},
  );

  assertEquals(args[args.length - 1], "review the code");
});

Deno.test("codex: buildArgs includes CI-safe flags", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    {},
  );

  assertEquals(args.includes("--ephemeral"), true);
  assertEquals(args.includes("--ignore-user-config"), true);
  assertEquals(args.includes("--ignore-rules"), true);
  assertEquals(args.includes("--skip-git-repo-check"), true);
});

Deno.test("codex: buildArgs defaults approval to never", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    {},
  );

  const approvalIdx = args.indexOf("--ask-for-approval");
  assertEquals(args[approvalIdx + 1], "never");
});

Deno.test("codex: buildArgs respects explicit approval policy", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    { approvalPolicy: "on-request" },
  );

  const approvalIdx = args.indexOf("--ask-for-approval");
  assertEquals(args[approvalIdx + 1], "on-request");
});

Deno.test("codex: buildArgs includes output flag", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/tmp/result.json",
      readOnly: true,
    },
    {},
  );

  const oIdx = args.indexOf("-o");
  assertEquals(args[oIdx + 1], "/tmp/result.json");
});

Deno.test("codex: buildArgs with additional dirs", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: ["/extra1", "/extra2"],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    {},
  );

  const addDirCount = args.filter((a) => a === "--add-dir").length;
  assertEquals(addDirCount, 2);
  assertEquals(args.includes("/extra1"), true);
  assertEquals(args.includes("/extra2"), true);
});

Deno.test("codex: apiKeyEnvName returns CODEX_API_KEY", () => {
  assertEquals(codexProvider.apiKeyEnvName({}), "CODEX_API_KEY");
});

Deno.test("codex: outputInstructions mentions final message", () => {
  const instructions = codexProvider.outputInstructions("/tmp/result.json");
  assertEquals(instructions.includes("final message"), true);
});

// ---------------------------------------------------------------------------
// Binary download from mock npm registry
// ---------------------------------------------------------------------------

interface FakeEntry {
  path: string;
  content: string;
  mode: number;
}

// Builds a gzipped npm-style tarball in memory.
async function buildTarball(entries: FakeEntry[]): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const stream = ReadableStream.from(entries.map((e) => {
    const data = encoder.encode(e.content);
    return {
      type: "file" as const,
      path: e.path,
      size: data.length,
      readable: ReadableStream.from([data]),
      options: { mode: e.mode },
    };
  }))
    .pipeThrough(new TarStream())
    .pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function packageEntries(triple: string, binaryName: string): FakeEntry[] {
  const root = `package/vendor/${triple}`;
  return [
    { path: "package/package.json", content: "{}", mode: 0o644 },
    {
      path: `${root}/bin/${binaryName}`,
      content: "#!/bin/sh\necho mock-codex\n",
      mode: 0o755,
    },
    {
      path: `${root}/codex-resources/bwrap`,
      content: "#!/bin/sh\necho mock-bwrap\n",
      mode: 0o755,
    },
    { path: `${root}/codex-path/rg`, content: "rg", mode: 0o755 },
    { path: `${root}/codex-package.json`, content: "{}", mode: 0o644 },
  ];
}

// Serves the tarball from a local server and points the real npm registry
// URLs at it, recording each requested path.
async function withMockRegistry(
  tarball: Uint8Array,
  fn: (requested: string[]) => Promise<void>,
): Promise<void> {
  const requested: string[] = [];
  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    requested.push(new URL(req.url).pathname);
    return new Response(tarball as unknown as BodyInit, {
      status: 200,
      headers: { "content-type": "application/gzip" },
    });
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
    const urlStr = typeof input === "string"
      ? input
      : input instanceof URL
      ? input.toString()
      : input.url;
    if (urlStr.startsWith("https://registry.npmjs.org/")) {
      const path = urlStr.replace("https://registry.npmjs.org/", "/");
      return originalFetch(
        `http://127.0.0.1:${server.addr.port}${path}`,
        init,
      );
    }
    return originalFetch(input, init);
  };
  try {
    await fn(requested);
  } finally {
    globalThis.fetch = originalFetch;
    await server.shutdown();
  }
}

Deno.test("codex: ensureBinary installs the win32 vendor tree and returns codex.exe", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarball = await buildTarball(
    packageEntries("x86_64-pc-windows-msvc", "codex.exe"),
  );

  try {
    await withMockRegistry(tarball, async (requested) => {
      const cacheDir = `${tmpDir}/cache`;
      const binaryPath = await codexProvider.ensureBinary(
        "0.163.0",
        cacheDir,
        "win32-x64",
      );
      const vendorDir = `${cacheDir}/codex/0.163.0/vendor`;
      assertEquals(binaryPath, `${vendorDir}/bin/codex.exe`);
      assertEquals(
        await Deno.readTextFile(binaryPath),
        "#!/bin/sh\necho mock-codex\n",
      );
      assertEquals(
        (await Deno.stat(`${vendorDir}/codex-resources/bwrap`)).isFile,
        true,
      );
      assertEquals(requested, [
        "/@openai/codex/-/codex-0.163.0-win32-x64.tgz",
      ]);

      // Only the vendor tree is left behind
      const left = [];
      for await (const entry of Deno.readDir(`${cacheDir}/codex/0.163.0`)) {
        left.push(entry.name);
      }
      assertEquals(left, ["vendor"]);

      // Second call hits the cache without another download
      const binaryPath2 = await codexProvider.ensureBinary(
        "0.163.0",
        cacheDir,
        "win32-x64",
      );
      assertEquals(binaryPath2, binaryPath);
      assertEquals(requested.length, 1);
    });
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test({
  name: "codex: ensureBinary keeps executable modes for bundled helpers",
  // File modes are not meaningful on Windows.
  ignore: Deno.build.os === "windows",
  fn: async () => {
    const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
    const tarball = await buildTarball(
      packageEntries("x86_64-unknown-linux-musl", "codex"),
    );

    try {
      await withMockRegistry(tarball, async (requested) => {
        const cacheDir = `${tmpDir}/cache`;
        const binaryPath = await codexProvider.ensureBinary(
          "0.163.0",
          cacheDir,
          "linux-x64",
        );
        const vendorDir = `${cacheDir}/codex/0.163.0/vendor`;
        assertEquals(binaryPath, `${vendorDir}/bin/codex`);
        assertEquals(requested, [
          "/@openai/codex/-/codex-0.163.0-linux-x64.tgz",
        ]);
        assertEquals((await Deno.stat(binaryPath)).mode! & 0o777, 0o755);
        assertEquals(
          (await Deno.stat(`${vendorDir}/codex-resources/bwrap`)).mode! &
            0o777,
          0o755,
        );
        assertEquals(
          (await Deno.stat(`${vendorDir}/codex-package.json`)).mode! & 0o777,
          0o644,
        );
      });
    } finally {
      await Deno.remove(tmpDir, { recursive: true });
    }
  },
});

Deno.test("codex: ensureBinary finds the binary in the older codex/ layout", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarball = await buildTarball([
    {
      path: "package/vendor/x86_64-unknown-linux-musl/codex/codex",
      content: "old-layout",
      mode: 0o755,
    },
  ]);

  try {
    await withMockRegistry(tarball, async () => {
      const cacheDir = `${tmpDir}/cache`;
      const binaryPath = await codexProvider.ensureBinary(
        "0.100.0",
        cacheDir,
        "linux-x64",
      );
      assertEquals(
        binaryPath,
        `${cacheDir}/codex/0.100.0/vendor/codex/codex`,
      );
    });
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("codex: ensureBinary fails when the tarball has no binary", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarball = await buildTarball([
    { path: "package/package.json", content: "{}", mode: 0o644 },
  ]);

  try {
    await withMockRegistry(tarball, async () => {
      await assertRejects(
        () =>
          codexProvider.ensureBinary("0.163.0", `${tmpDir}/cache`, "win32-x64"),
        Error,
        "Could not find 'codex.exe' binary",
      );
    });
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("codex: extractTarball rejects a path that escapes the destination", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarball = await buildTarball([
    { path: "package/../../escape", content: "x", mode: 0o644 },
  ]);

  try {
    await assertRejects(
      () =>
        extractTarball(
          ReadableStream.from([new Uint8Array(tarball)]),
          `${tmpDir}/dest`,
          "linux-x64",
        ),
      Error,
      "Refusing unsafe path",
    );
    await assertRejects(() => Deno.stat(`${tmpDir}/escape`));
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// Effort
// ---------------------------------------------------------------------------

Deno.test("codex: buildArgs sets model_reasoning_effort for each level", () => {
  for (const effort of ["low", "medium", "high", "xhigh", "max"] as const) {
    const args = codexProvider.buildArgs(
      {
        prompt: "test",
        model: "o4-mini",
        effort,
        workingDir: "/repo",
        additionalDirs: [],
        outputPath: "/out/result.json",
        readOnly: true,
      },
      {},
    );

    const idx = args.indexOf(`model_reasoning_effort=${effort}`);
    assertEquals(args[idx - 1], "-c");
    assertEquals(args[args.length - 1], "test");
  }
});

Deno.test("codex: buildArgs omits model_reasoning_effort when unset", () => {
  const args = codexProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    {},
  );

  assertEquals(args.includes("-c"), false);
  assertEquals(
    args.some((a) => a.startsWith("model_reasoning_effort=")),
    false,
  );
});

Deno.test("codex: extractTarball rejects a segment naming an NTFS stream", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarball = await buildTarball([
    { path: "package/bin/codex.exe:hidden", content: "x", mode: 0o644 },
  ]);

  try {
    await assertRejects(
      () =>
        extractTarball(
          ReadableStream.from([new Uint8Array(tarball)]),
          `${tmpDir}/dest`,
          "win32-x64",
        ),
      Error,
      "Refusing unsafe path",
    );
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("codex: ensureBinary replaces a vendor directory that has no binary", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarball = await buildTarball(
    packageEntries("x86_64-pc-windows-msvc", "codex.exe"),
  );

  try {
    const cacheDir = `${tmpDir}/cache`;
    const vendorDir = `${cacheDir}/codex/0.163.0/vendor`;
    await Deno.mkdir(`${vendorDir}/codex-path`, { recursive: true });
    await Deno.writeTextFile(`${vendorDir}/codex-path/rg`, "stale");

    await withMockRegistry(tarball, async () => {
      const binaryPath = await codexProvider.ensureBinary(
        "0.163.0",
        cacheDir,
        "win32-x64",
      );
      assertEquals(binaryPath, `${vendorDir}/bin/codex.exe`);
      assertEquals(await Deno.readTextFile(`${vendorDir}/codex-path/rg`), "rg");
    });
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});
