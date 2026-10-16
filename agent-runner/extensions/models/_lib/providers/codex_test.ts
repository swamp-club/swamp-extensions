import { assertEquals } from "jsr:@std/assert@1.0.19";
import { codexProvider } from "./codex.ts";

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

Deno.test("codex: downloads and extracts binary from mock npm tarball", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "codex-test-" });
  const tarballDir = `${tmpDir}/tarball`;
  const packageDir = `${tarballDir}/package/bin`;
  await Deno.mkdir(packageDir, { recursive: true });

  const fakeBinary = "#!/bin/sh\necho mock-codex\n";
  await Deno.writeTextFile(`${packageDir}/codex`, fakeBinary);
  await Deno.chmod(`${packageDir}/codex`, 0o755);

  // Create tarball
  const tar = new Deno.Command("tar", {
    args: ["czf", `${tmpDir}/codex.tgz`, "-C", tarballDir, "package"],
    stdout: "piped",
    stderr: "piped",
  });
  const tarResult = await tar.output();
  assertEquals(tarResult.success, true);

  const tarballData = await Deno.readFile(`${tmpDir}/codex.tgz`);

  const server = Deno.serve({ port: 0, onListen: () => {} }, (_req) => {
    return new Response(tarballData, {
      status: 200,
      headers: { "content-type": "application/gzip" },
    });
  });

  try {
    const cacheDir = `${tmpDir}/cache/codex/0.1.0`;
    await Deno.mkdir(cacheDir, { recursive: true });

    // Simulate what the provider does: download, extract, find binary
    const port = server.addr.port;
    const resp = await fetch(`http://127.0.0.1:${port}/codex.tgz`);
    const data = new Uint8Array(await resp.arrayBuffer());

    const tarballPath = `${cacheDir}/codex.tgz`;
    await Deno.writeFile(tarballPath, data);

    const extractDir = `${cacheDir}/extract`;
    await Deno.mkdir(extractDir, { recursive: true });

    const extract = new Deno.Command("tar", {
      args: ["xzf", tarballPath, "-C", extractDir],
      stdout: "piped",
      stderr: "piped",
    });
    const extractResult = await extract.output();
    assertEquals(extractResult.success, true);

    // Find binary
    const binaryPath = `${extractDir}/package/bin/codex`;
    const stat = await Deno.stat(binaryPath);
    assertEquals(stat.isFile, true);

    // Read and verify content
    const content = await Deno.readTextFile(binaryPath);
    assertEquals(content, fakeBinary);
  } finally {
    await server.shutdown();
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
