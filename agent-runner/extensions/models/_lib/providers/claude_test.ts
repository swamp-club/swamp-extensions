import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import {
  claudeProvider,
  parseClaudeOutput,
  shellPath,
  tryVerifyChecksum,
} from "./claude.ts";

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

// ---------------------------------------------------------------------------
// JSON output and usage
// ---------------------------------------------------------------------------

// Recorded from `claude -p --output-format json` (Claude Code 2.1.312), with
// the fields agent-runner doesn't read trimmed away.
const SUCCESS_ENVELOPE = {
  type: "result",
  subtype: "success",
  is_error: false,
  duration_ms: 1317,
  duration_api_ms: 1274,
  num_turns: 1,
  result: "hi",
  stop_reason: "end_turn",
  session_id: "ddd38c40-9c35-4615-9e54-ed2616359d50",
  total_cost_usd: 0.0026565300000000003,
  usage: {
    input_tokens: 2,
    cache_creation_input_tokens: 12687,
    cache_read_input_tokens: 11693,
    output_tokens: 4,
  },
  modelUsage: {
    "claude-haiku-5-5": {
      inputTokens: 2,
      outputTokens: 4,
      cacheReadInputTokens: 11693,
      cacheCreationInputTokens: 12687,
      webSearchRequests: 0,
      costUSD: 0.0026565300000000003,
      contextWindow: 1000000,
      maxOutputTokens: 128000,
    },
  },
};

// Recorded from the same CLI run with an unknown --model (exit code 1).
const ERROR_ENVELOPE = {
  type: "result",
  subtype: "success",
  is_error: true,
  duration_ms: 419,
  duration_api_ms: 0,
  num_turns: 1,
  result:
    "There's an issue with the selected model (claude-no-such-model). It may not exist or you may not have access to it. Run --model to pick a different model.",
  total_cost_usd: 0,
  usage: {
    input_tokens: 0,
    cache_creation_input_tokens: 0,
    cache_read_input_tokens: 0,
    output_tokens: 0,
  },
  modelUsage: {},
};

Deno.test("claude: buildArgs asks for JSON output", () => {
  const args = claudeProvider.buildArgs(
    {
      prompt: "test",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "",
      readOnly: true,
    },
    {},
  );

  const idx = args.indexOf("--output-format");
  assertEquals(args[idx + 1], "json");
});

Deno.test("claude: parseOutput unwraps the result and records usage", () => {
  const parsed = parseClaudeOutput(JSON.stringify(SUCCESS_ENVELOPE) + "\n");

  assertEquals(parsed.text, "hi");
  assertEquals(parsed.sessionId, "ddd38c40-9c35-4615-9e54-ed2616359d50");
  assertEquals(parsed.usage, {
    model: "claude-haiku-5-5",
    inputTokens: 2,
    outputTokens: 4,
    cacheReadTokens: 11693,
    cacheWriteTokens: 12687,
    costUsd: 0.0026565300000000003,
    numTurns: 1,
    durationMs: 1317,
    durationApiMs: 1274,
    byModel: {
      "claude-haiku-5-5": {
        inputTokens: 2,
        outputTokens: 4,
        cacheReadTokens: 11693,
        cacheWriteTokens: 12687,
        costUsd: 0.0026565300000000003,
      },
    },
  });
});

Deno.test("claude: parseOutput sums several models and names the main one", () => {
  const parsed = parseClaudeOutput(JSON.stringify({
    ...SUCCESS_ENVELOPE,
    total_cost_usd: 0.5,
    modelUsage: {
      "claude-haiku-5-5": {
        inputTokens: 10,
        outputTokens: 20,
        cacheReadInputTokens: 0,
        cacheCreationInputTokens: 5,
        costUSD: 0.1,
      },
      "claude-opus-5-5": {
        inputTokens: 100,
        outputTokens: 200,
        cacheReadInputTokens: 300,
        cacheCreationInputTokens: 400,
        costUSD: 0.4,
      },
    },
  }));

  assertEquals(parsed.usage?.model, "claude-opus-5-5");
  assertEquals(parsed.usage?.inputTokens, 110);
  assertEquals(parsed.usage?.outputTokens, 220);
  assertEquals(parsed.usage?.cacheReadTokens, 300);
  assertEquals(parsed.usage?.cacheWriteTokens, 405);
  assertEquals(parsed.usage?.costUsd, 0.5);
  assertEquals(Object.keys(parsed.usage?.byModel ?? {}).length, 2);
});

Deno.test("claude: parseOutput keeps the error text and the reported usage", () => {
  const parsed = parseClaudeOutput(JSON.stringify(ERROR_ENVELOPE));

  assertEquals(parsed.text, ERROR_ENVELOPE.result);
  // The CLI reported zeros, so zeros are recorded; nothing is invented.
  assertEquals(parsed.usage?.inputTokens, 0);
  assertEquals(parsed.usage?.costUsd, 0);
  assertEquals(parsed.usage?.byModel, undefined);
  assertEquals(parsed.usage?.model, undefined);
});

Deno.test("claude: parseOutput records partial usage from an older envelope", () => {
  const { modelUsage: _m, total_cost_usd: _c, ...older } = SUCCESS_ENVELOPE;
  const parsed = parseClaudeOutput(JSON.stringify(older));

  assertEquals(parsed.text, "hi");
  assertEquals(parsed.usage, {
    inputTokens: 2,
    outputTokens: 4,
    cacheReadTokens: 11693,
    cacheWriteTokens: 12687,
    numTurns: 1,
    durationMs: 1317,
    durationApiMs: 1274,
  });
});

// Recorded from Claude Code 1.0.37, the oldest release agent-runner can
// download: no modelUsage, so the totals come from the usage block.
const OLDEST_ENVELOPE = {
  type: "result",
  subtype: "success",
  is_error: false,
  duration_api_ms: 547,
  duration_ms: 561,
  num_turns: 1,
  result: "hi",
  session_id: "c0559d5e-fdd0-4325-b11f-d29b1b605823",
  total_cost_usd: 0.165744,
  usage: {
    input_tokens: 8,
    cache_creation_input_tokens: 44160,
    cache_read_input_tokens: 0,
    output_tokens: 8,
    service_tier: "standard",
  },
};

Deno.test("claude: parseOutput reads the oldest supported CLI's envelope", () => {
  assertEquals(parseClaudeOutput(JSON.stringify(OLDEST_ENVELOPE)), {
    text: "hi",
    sessionId: "c0559d5e-fdd0-4325-b11f-d29b1b605823",
    usage: {
      inputTokens: 8,
      outputTokens: 8,
      cacheReadTokens: 0,
      cacheWriteTokens: 44160,
      costUsd: 0.165744,
      numTurns: 1,
      durationMs: 561,
      durationApiMs: 547,
    },
  });
});

Deno.test("claude: parseOutput leaves usage absent when the envelope has none", () => {
  const parsed = parseClaudeOutput(
    JSON.stringify({ type: "result", result: "done", num_turns: 2 }),
  );

  assertEquals(parsed, { text: "done" });
});

Deno.test("claude: parseOutput keeps an error envelope without result text", () => {
  const parsed = parseClaudeOutput(JSON.stringify({
    type: "result",
    subtype: "error_max_turns",
    is_error: true,
    total_cost_usd: 0.01,
  }));

  assertEquals(parsed.text, "");
  assertEquals(parsed.usage, { costUsd: 0.01 });
});

Deno.test("claude: parseOutput returns output it can't read as raw text", () => {
  for (
    const stdout of [
      "hi\n",
      "",
      '{"type":"result","result":"hi"',
      '["not", "an", "envelope"]',
      '{"verdict":"pass"}',
      // A JSON reply with a result field is not the CLI's envelope.
      '{"result":"x"}',
      "null",
    ]
  ) {
    assertEquals(parseClaudeOutput(stdout), { text: stdout });
  }
});

Deno.test("claude: parseOutput skips usage fields of the wrong type", () => {
  const parsed = parseClaudeOutput(JSON.stringify({
    type: "result",
    result: "hi",
    total_cost_usd: "0.01",
    usage: { input_tokens: -1, output_tokens: 7 },
  }));

  assertEquals(parsed, { text: "hi", usage: { outputTokens: 7 } });
});
