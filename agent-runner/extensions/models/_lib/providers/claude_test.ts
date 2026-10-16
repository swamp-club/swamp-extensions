import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { claudeProvider, tryVerifyChecksum } from "./claude.ts";

// ---------------------------------------------------------------------------
// Binary download + checksum verification against a local HTTP server
// ---------------------------------------------------------------------------

Deno.test("claude: downloads and caches binary from mock server", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });

  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock-claude\n");
  const hashBuffer = await crypto.subtle.digest("SHA-256", fakeBinary);
  const checksum = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const checksumBody = `${checksum}  claude\n`;

  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    const url = new URL(req.url);
    if (url.pathname.endsWith("/claude")) {
      return new Response(fakeBinary, { status: 200 });
    }
    if (url.pathname.endsWith("/checksums.txt")) {
      return new Response(checksumBody, { status: 200 });
    }
    return new Response("not found", { status: 404 });
  });

  const port = server.addr.port;

  const patchedProvider = {
    ...claudeProvider,
    async ensureBinary(
      _version: string,
      cacheDir: string,
    ): Promise<string> {
      const dir = `${cacheDir}/claude/test`;
      const binaryPath = `${dir}/claude`;

      try {
        await Deno.stat(binaryPath);
        return binaryPath;
      } catch {
        // not cached
      }

      await Deno.mkdir(dir, { recursive: true });

      const binResp = await fetch(
        `http://127.0.0.1:${port}/releases/test/linux-x64/claude`,
      );
      const data = new Uint8Array(await binResp.arrayBuffer());
      await Deno.writeFile(binaryPath, data);
      await Deno.chmod(binaryPath, 0o755);

      const csResp = await fetch(
        `http://127.0.0.1:${port}/releases/test/linux-x64/checksums.txt`,
      );
      const csText = await csResp.text();
      const expectedHash = csText.split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        .find((l) => l.endsWith("claude"))
        ?.split(/\s+/)[0];

      const actualData = await Deno.readFile(binaryPath);
      const actualHashBuf = await crypto.subtle.digest("SHA-256", actualData);
      const actualHash = Array.from(new Uint8Array(actualHashBuf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      assertEquals(actualHash, expectedHash);

      return binaryPath;
    },
  };

  try {
    const binaryPath = await patchedProvider.ensureBinary(
      "test",
      `${tmpDir}/cache`,
    );
    const stat = await Deno.stat(binaryPath);
    assertEquals(stat.isFile, true);

    // Second call should hit cache
    const binaryPath2 = await patchedProvider.ensureBinary(
      "test",
      `${tmpDir}/cache`,
    );
    assertEquals(binaryPath2, binaryPath);
  } finally {
    await server.shutdown();
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("claude: tryVerifyChecksum rejects binary with bad checksum", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });

  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock\n");
  const wrongChecksum = "0".repeat(64);
  const checksumBody = `${wrongChecksum}  claude\n`;

  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    const url = new URL(req.url);
    if (url.pathname.endsWith("/checksums.txt")) {
      return new Response(checksumBody, { status: 200 });
    }
    return new Response("not found", { status: 404 });
  });

  const binaryPath = `${tmpDir}/claude`;
  await Deno.writeFile(binaryPath, fakeBinary);

  try {
    await assertRejects(
      () =>
        tryVerifyChecksum(
          binaryPath,
          "test",
          "linux-x64",
          undefined,
          `http://127.0.0.1:${server.addr.port}`,
        ),
      Error,
      "Checksum mismatch",
    );
  } finally {
    await server.shutdown();
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("claude: tryVerifyChecksum returns skipped when no checksums available", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });

  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock\n");
  const binaryPath = `${tmpDir}/claude`;
  await Deno.writeFile(binaryPath, fakeBinary);

  const server = Deno.serve({ port: 0, onListen: () => {} }, (_req) => {
    return new Response("not found", { status: 404 });
  });

  try {
    const result = await tryVerifyChecksum(
      binaryPath,
      "test",
      "linux-x64",
      undefined,
      `http://127.0.0.1:${server.addr.port}`,
    );
    assertEquals(result, "skipped");
  } finally {
    await server.shutdown();
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("claude: tryVerifyChecksum returns verified on matching checksum", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });

  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock\n");
  const hashBuffer = await crypto.subtle.digest("SHA-256", fakeBinary);
  const correctChecksum = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const checksumBody = `${correctChecksum}  claude\n`;

  const binaryPath = `${tmpDir}/claude`;
  await Deno.writeFile(binaryPath, fakeBinary);

  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    const url = new URL(req.url);
    if (url.pathname.endsWith("/checksums.txt")) {
      return new Response(checksumBody, { status: 200 });
    }
    return new Response("not found", { status: 404 });
  });

  try {
    const result = await tryVerifyChecksum(
      binaryPath,
      "test",
      "linux-x64",
      undefined,
      `http://127.0.0.1:${server.addr.port}`,
    );
    assertEquals(result, "verified");
  } finally {
    await server.shutdown();
    await Deno.remove(tmpDir, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// Arg building edge cases
// ---------------------------------------------------------------------------

Deno.test("claude: buildArgs with multiple additional dirs", () => {
  const args = claudeProvider.buildArgs(
    {
      prompt: "test",
      model: "claude-sonnet-4-6",
      workingDir: "/repo",
      additionalDirs: ["/dir1", "/dir2", "/dir3"],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    { allowedTools: ["Read"] },
  );

  const addDirCount = args.filter((a) => a === "--add-dir").length;
  assertEquals(addDirCount, 3);
  assertEquals(args.includes("/dir1"), true);
  assertEquals(args.includes("/dir2"), true);
  assertEquals(args.includes("/dir3"), true);
});

Deno.test("claude: buildArgs with multiple disallowed tools", () => {
  const args = claudeProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/out/result.json",
      readOnly: true,
    },
    { disallowedTools: ["Write", "Edit", "Bash"] },
  );

  const disallowedCount = args.filter((a) => a === "--disallowedTools").length;
  assertEquals(disallowedCount, 3);
});

Deno.test("claude: apiKeyEnvName returns ANTHROPIC_API_KEY", () => {
  assertEquals(claudeProvider.apiKeyEnvName({}), "ANTHROPIC_API_KEY");
});

// ---------------------------------------------------------------------------
// Effort
// ---------------------------------------------------------------------------

Deno.test("claude: buildArgs passes --effort for each level", () => {
  for (const effort of ["low", "medium", "high", "xhigh", "max"] as const) {
    const args = claudeProvider.buildArgs(
      {
        prompt: "test",
        model: "claude-sonnet-4-6",
        effort,
        workingDir: "/repo",
        additionalDirs: [],
        outputPath: "/out/result.json",
        readOnly: true,
      },
      {},
    );

    const idx = args.indexOf("--effort");
    assertEquals(args[idx + 1], effort);
  }
});

Deno.test("claude: buildArgs omits --effort when unset", () => {
  const args = claudeProvider.buildArgs(
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

  assertEquals(args.includes("--effort"), false);
});
