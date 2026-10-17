import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { claudeProvider, shellPath, tryVerifyChecksum } from "./claude.ts";

// ---------------------------------------------------------------------------
// Binary download + checksum verification against a local HTTP server
// ---------------------------------------------------------------------------

const RELEASES_ORIGIN = "https://downloads.claude.ai/";

async function sha256Hex(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array(data).buffer as ArrayBuffer,
  );
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function manifestBody(platform: string, checksum: string): string {
  return JSON.stringify({
    version: "test",
    platforms: { [platform]: { binary: "claude", checksum } },
  });
}

// Serves the mock release from a local server and points the real
// downloads.claude.ai URLs at it, recording each requested path.
async function withMockReleases(
  handler: (path: string) => Response,
  fn: (requested: string[]) => Promise<void>,
): Promise<void> {
  const requested: string[] = [];
  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    const path = new URL(req.url).pathname;
    requested.push(path);
    return handler(path);
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
    const urlStr = typeof input === "string"
      ? input
      : input instanceof URL
      ? input.toString()
      : input.url;
    if (urlStr.startsWith(RELEASES_ORIGIN)) {
      const path = urlStr.slice(RELEASES_ORIGIN.length - 1);
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

for (
  const { platform, fileName } of [
    { platform: "linux-x64", fileName: "claude" },
    { platform: "win32-x64", fileName: "claude.exe" },
  ] as const
) {
  Deno.test(`claude: ensureBinary downloads, verifies and caches for ${platform}`, async () => {
    const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });
    const fakeBinary = new TextEncoder().encode(
      "#!/bin/sh\necho mock-claude\n",
    );
    const checksum = await sha256Hex(fakeBinary);

    try {
      await withMockReleases((path) => {
        if (path.endsWith(`/${platform}/${fileName}`)) {
          return new Response(fakeBinary);
        }
        if (path.endsWith("/manifest.json")) {
          return new Response(manifestBody(platform, checksum));
        }
        return new Response("not found", { status: 404 });
      }, async (requested) => {
        const cacheDir = `${tmpDir}/cache`;
        const binaryPath = await claudeProvider.ensureBinary(
          "1.2.3",
          cacheDir,
          platform,
        );
        assertEquals(binaryPath, `${cacheDir}/claude/1.2.3/${fileName}`);
        assertEquals(await Deno.readFile(binaryPath), fakeBinary);
        assertEquals(requested, [
          `/claude-code-releases/1.2.3/${platform}/${fileName}`,
          "/claude-code-releases/1.2.3/manifest.json",
        ]);

        // Second call hits the cache without another download
        const binaryPath2 = await claudeProvider.ensureBinary(
          "1.2.3",
          cacheDir,
          platform,
        );
        assertEquals(binaryPath2, binaryPath);
        assertEquals(requested.length, 2);
      });
    } finally {
      await Deno.remove(tmpDir, { recursive: true });
    }
  });
}

Deno.test("claude: ensureBinary rejects and caches nothing on a checksum mismatch", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });
  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock\n");

  try {
    await withMockReleases((path) => {
      if (path.endsWith("/claude.exe")) {
        return new Response(fakeBinary);
      }
      if (path.endsWith("/manifest.json")) {
        return new Response(manifestBody("win32-x64", "0".repeat(64)));
      }
      return new Response("not found", { status: 404 });
    }, async () => {
      const cacheDir = `${tmpDir}/cache`;
      await assertRejects(
        () => claudeProvider.ensureBinary("1.2.3", cacheDir, "win32-x64"),
        Error,
        "Checksum mismatch",
      );
      const leftovers = [];
      for await (const entry of Deno.readDir(`${cacheDir}/claude/1.2.3`)) {
        leftovers.push(entry.name);
      }
      assertEquals(leftovers, []);
    });
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("claude: tryVerifyChecksum rejects binary with bad checksum", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });

  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock\n");

  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    const url = new URL(req.url);
    if (url.pathname.endsWith("/manifest.json")) {
      return new Response(manifestBody("linux-x64", "0".repeat(64)));
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

Deno.test("claude: tryVerifyChecksum returns skipped when no manifest is available", async () => {
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

Deno.test("claude: tryVerifyChecksum returns skipped when the manifest lacks the platform", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "claude-test-" });

  const fakeBinary = new TextEncoder().encode("#!/bin/sh\necho mock\n");
  const binaryPath = `${tmpDir}/claude.exe`;
  await Deno.writeFile(binaryPath, fakeBinary);

  const server = Deno.serve({ port: 0, onListen: () => {} }, (_req) => {
    return new Response(manifestBody("linux-x64", "0".repeat(64)));
  });

  try {
    const result = await tryVerifyChecksum(
      binaryPath,
      "test",
      "win32-x64",
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
  const correctChecksum = await sha256Hex(fakeBinary);

  const binaryPath = `${tmpDir}/claude`;
  await Deno.writeFile(binaryPath, fakeBinary);

  const server = Deno.serve({ port: 0, onListen: () => {} }, (req) => {
    const url = new URL(req.url);
    if (url.pathname.endsWith("/manifest.json")) {
      return new Response(manifestBody("linux-x64", correctChecksum));
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

// ---------------------------------------------------------------------------
// Output instructions
// ---------------------------------------------------------------------------

Deno.test("claude: shellPath quotes a Unix path", () => {
  assertEquals(shellPath("/tmp/out/result.json"), "'/tmp/out/result.json'");
});

Deno.test("claude: shellPath turns a Windows path into a quoted forward-slash path", () => {
  assertEquals(
    shellPath(
      "C:\\Users\\me\\AppData\\Local\\Temp\\agent-runner-x/result.json",
    ),
    "'C:/Users/me/AppData/Local/Temp/agent-runner-x/result.json'",
  );
});

Deno.test("claude: shellPath escapes single quotes", () => {
  assertEquals(
    shellPath("/tmp/it's/result.json"),
    "'/tmp/it'\\''s/result.json'",
  );
});

Deno.test("claude: outputInstructions tee a quoted Windows path", () => {
  const instructions = claudeProvider.outputInstructions(
    "C:\\Temp\\agent-runner-x/result.json",
  );
  assertEquals(
    instructions.includes(
      "tee 'C:/Temp/agent-runner-x/result.json' <<'AGENT_RESULT_EOF'",
    ),
    true,
  );
});
