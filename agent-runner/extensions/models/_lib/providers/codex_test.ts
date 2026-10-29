import {
  assertEquals,
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { TarStream } from "jsr:@std/tar@0.1.10/tar-stream";
import {
  CodexConfigSchema,
  codexProvider,
  extractTarball,
  parseCodexOutput,
  tomlString,
} from "./codex.ts";
import type { AgentRunRequest } from "../types.ts";

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

  const idx = args.indexOf("approval_policy=never");
  assertEquals(args[idx - 1], "-c");
  assertEquals(args.includes("--ask-for-approval"), false);
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

  const idx = args.indexOf("approval_policy=on-request");
  assertEquals(args[idx - 1], "-c");
  assertEquals(args.includes("--ask-for-approval"), false);
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

// ---------------------------------------------------------------------------
// Custom model provider
// ---------------------------------------------------------------------------

const BASE_REQUEST: AgentRunRequest = {
  prompt: "test",
  model: undefined,
  workingDir: "/repo",
  additionalDirs: [],
  outputPath: "/out/result.json",
  readOnly: true,
};

/** The values passed with -c, in order. */
function configOverrides(args: string[]): string[] {
  return args.flatMap((arg, i) => (args[i - 1] === "-c" ? [arg] : []));
}

Deno.test("codex: modelProvider with authCommand emits the provider overrides", () => {
  const args = codexProvider.buildArgs(
    { ...BASE_REQUEST, auth: "cli" },
    {
      modelProvider: {
        id: "gw",
        name: "Gateway",
        baseUrl: "https://gateway.example/v1",
        wireApi: "responses",
        authCommand: "/usr/local/bin/token-helper",
        authArgs: ["--audience", "codex"],
      },
    },
  );

  assertEquals(configOverrides(args), [
    "approval_policy=never",
    'model_provider="gw"',
    'model_providers.gw.name="Gateway"',
    'model_providers.gw.base_url="https://gateway.example/v1"',
    'model_providers.gw.wire_api="responses"',
    'model_providers.gw.auth.command="/usr/local/bin/token-helper"',
    'model_providers.gw.auth.args=["--audience", "codex"]',
  ]);
  assertEquals(args[args.length - 1], "test");
});

Deno.test("codex: modelProvider name defaults to id and wire_api is omitted", () => {
  const args = codexProvider.buildArgs(
    { ...BASE_REQUEST, auth: "cli" },
    { modelProvider: { id: "local-gw", baseUrl: "http://127.0.0.1:4000/v1" } },
  );

  assertEquals(configOverrides(args), [
    "approval_policy=never",
    'model_provider="local-gw"',
    'model_providers.local-gw.name="local-gw"',
    'model_providers.local-gw.base_url="http://127.0.0.1:4000/v1"',
  ]);
});

Deno.test("codex: modelProvider under auth apiKey sends CODEX_API_KEY via env_key", () => {
  for (const auth of ["apiKey", undefined] as const) {
    const args = codexProvider.buildArgs(
      { ...BASE_REQUEST, auth },
      { modelProvider: { id: "gw", baseUrl: "https://gateway.example/v1" } },
    );

    assertEquals(
      configOverrides(args).includes(
        'model_providers.gw.env_key="CODEX_API_KEY"',
      ),
      true,
    );
  }
});

Deno.test("codex: modelProvider under auth cli without authCommand sends no credential", () => {
  const args = codexProvider.buildArgs(
    { ...BASE_REQUEST, auth: "cli" },
    { modelProvider: { id: "gw", baseUrl: "https://gateway.example/v1" } },
  );

  assertEquals(
    configOverrides(args).some((o) =>
      o.includes(".env_key=") || o.includes(".auth.")
    ),
    false,
  );
});

Deno.test("codex: modelProvider authCommand under auth apiKey is rejected", () => {
  assertThrows(
    () =>
      codexProvider.buildArgs(
        { ...BASE_REQUEST, auth: "apiKey" },
        {
          modelProvider: {
            id: "gw",
            baseUrl: "https://gateway.example/v1",
            authCommand: "token-helper",
          },
        },
      ),
    Error,
    "set auth to 'cli'",
  );
});

Deno.test("codex: modelProvider values are escaped as TOML strings", () => {
  const args = codexProvider.buildArgs(
    { ...BASE_REQUEST, auth: "cli" },
    {
      modelProvider: {
        id: "gw",
        name: 'My "gw" \\ prod',
        baseUrl: "https://gateway.example/v1",
        authCommand: "C:\\tools\\token.exe",
        authArgs: ['a"b'],
      },
    },
  );

  const overrides = configOverrides(args);
  assertEquals(
    overrides.includes('model_providers.gw.name="My \\"gw\\" \\\\ prod"'),
    true,
  );
  assertEquals(
    overrides.includes(
      'model_providers.gw.auth.command="C:\\\\tools\\\\token.exe"',
    ),
    true,
  );
  assertEquals(
    overrides.includes('model_providers.gw.auth.args=["a\\"b"]'),
    true,
  );
});

Deno.test("codex: tomlString escapes control characters and DEL", () => {
  assertEquals(tomlString("a\nb\tc"), '"a\\nb\\tc"');
  assertEquals(tomlString("x\x7fy"), '"x\\u007Fy"');
});

Deno.test("codex: modelProvider schema rejects an id that is not a bare TOML key", () => {
  for (const id of ["gw.prod", "gw prod", "", 'gw"']) {
    assertEquals(
      CodexConfigSchema.safeParse({
        modelProvider: { id, baseUrl: "https://gateway.example/v1" },
      }).success,
      false,
      `id ${JSON.stringify(id)} should be rejected`,
    );
  }
});

Deno.test("codex: modelProvider schema only accepts http and https base URLs", () => {
  for (const baseUrl of ["file:///etc/passwd", "ftp://gateway.example/v1"]) {
    assertEquals(
      CodexConfigSchema.safeParse({ modelProvider: { id: "gw", baseUrl } })
        .success,
      false,
      `${baseUrl} should be rejected`,
    );
  }
  for (
    const baseUrl of ["https://gateway.example/v1", "http://localhost:4000"]
  ) {
    assertEquals(
      CodexConfigSchema.safeParse({ modelProvider: { id: "gw", baseUrl } })
        .success,
      true,
      `${baseUrl} should be accepted`,
    );
  }
});

Deno.test("codex: modelProvider schema rejects authArgs without authCommand", () => {
  const result = CodexConfigSchema.safeParse({
    modelProvider: {
      id: "gw",
      baseUrl: "https://gateway.example/v1",
      authArgs: ["--audience", "codex"],
    },
  });
  assertEquals(result.success, false);
});

Deno.test("codex: modelProvider schema rejects built-in codex provider ids", () => {
  for (const id of ["openai", "oss", "ollama", "lmstudio"]) {
    const result = CodexConfigSchema.safeParse({
      modelProvider: { id, baseUrl: "https://gateway.example/v1" },
    });
    assertEquals(result.success, false, `id ${id} should be rejected`);
    assertEquals(
      result.error?.issues[0].message.includes("built-in codex provider id"),
      true,
    );
  }
});

Deno.test("codex: modelProvider schema rejects strings with lone surrogates", () => {
  const base = { id: "gw", baseUrl: "https://gateway.example/v1" };
  for (
    const modelProvider of [
      { ...base, name: "gw\uD800" },
      { ...base, authCommand: "token\uDC00" },
      { ...base, authCommand: "token", authArgs: ["ok", "\uD800x"] },
      { ...base, baseUrl: "https://gateway.example/v1\uD800" },
    ]
  ) {
    assertEquals(
      CodexConfigSchema.safeParse({ modelProvider }).success,
      false,
      `${JSON.stringify(modelProvider)} should be rejected`,
    );
  }
  assertEquals(
    CodexConfigSchema.safeParse({
      modelProvider: { ...base, name: "Gateway \u{1F680}" },
    }).success,
    true,
  );
});

// ---------------------------------------------------------------------------
// JSON events and usage
// ---------------------------------------------------------------------------

// Recorded from `codex exec --json` (codex-cli 0.165.0).
const SUCCESS_EVENTS = [
  '{"type":"thread.started","thread_id":"01a187f0-eb7e-77b1-afdd-77db285adbf7"}',
  '{"type":"turn.started"}',
  '{"type":"item.completed","item":{"id":"item_0","type":"agent_message","text":"hi"}}',
  '{"type":"turn.completed","usage":{"input_tokens":14845,"cached_input_tokens":12288,"cache_write_input_tokens":0,"output_tokens":5,"reasoning_output_tokens":0}}',
].join("\n") + "\n";

// Recorded from the same CLI without a login, trimmed to one retry.
const FAILED_EVENTS = [
  '{"type":"thread.started","thread_id":"01a187dd-1074-7fe0-88b1-540ae1b82032"}',
  '{"type":"turn.started"}',
  '{"type":"error","message":"Reconnecting... 2/5 (unexpected status 401 Unauthorized: Missing bearer or basic authentication in header, url: wss://api.openai.com/v1/responses)"}',
  '{"type":"item.completed","item":{"id":"item_0","type":"error","message":"Falling back from WebSockets to HTTPS transport. unexpected status 401 Unauthorized"}}',
  '{"type":"turn.failed","error":{"message":"unexpected status 401 Unauthorized: Missing bearer or basic authentication in header, url: https://api.openai.com/v1/responses"}}',
].join("\n") + "\n";

Deno.test("codex: buildArgs asks exec for JSON events", () => {
  const args = codexProvider.buildArgs(
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

  assertEquals(args[0], "exec");
  assertEquals(args.includes("--json"), true);
});

Deno.test("codex: parseOutput reads the reply and usage from the events", () => {
  const parsed = parseCodexOutput(SUCCESS_EVENTS, "gpt-5.5");

  assertEquals(parsed.text, "hi");
  assertEquals(parsed.sessionId, "01a187f0-eb7e-77b1-afdd-77db285adbf7");
  assertEquals(parsed.usage, {
    model: "gpt-5.5",
    // input_tokens includes the cached input; inputTokens is the rest.
    inputTokens: 2557,
    outputTokens: 5,
    cacheReadTokens: 12288,
    cacheWriteTokens: 0,
    reasoningOutputTokens: 0,
    numTurns: 1,
  });
});

Deno.test("codex: parseOutput sums usage over turns and keeps the last reply", () => {
  const stdout = [
    '{"type":"item.completed","item":{"type":"agent_message","text":"first"}}',
    '{"type":"turn.completed","usage":{"input_tokens":100,"cached_input_tokens":40,"output_tokens":10,"reasoning_output_tokens":3}}',
    '{"type":"item.completed","item":{"type":"agent_message","text":"second"}}',
    '{"type":"turn.completed","usage":{"input_tokens":50,"output_tokens":5}}',
  ].join("\n");
  const parsed = parseCodexOutput(stdout, undefined);

  assertEquals(parsed.text, "second");
  assertEquals(parsed.usage, {
    inputTokens: 110,
    outputTokens: 15,
    cacheReadTokens: 40,
    reasoningOutputTokens: 3,
    numTurns: 2,
  });
});

Deno.test("codex: parseOutput gives a failed turn empty text and no usage", () => {
  assertEquals(parseCodexOutput(FAILED_EVENTS, "gpt-5.5"), {
    text: "",
    sessionId: "01a187dd-1074-7fe0-88b1-540ae1b82032",
  });
});

Deno.test("codex: parseOutput skips lines that are not events", () => {
  const stdout = "warning: something\n" + SUCCESS_EVENTS + "{truncated";
  const parsed = parseCodexOutput(stdout, undefined);

  assertEquals(parsed.text, "hi");
  assertEquals(parsed.usage?.outputTokens, 5);
});

Deno.test("codex: parseOutput returns output with no events as raw text", () => {
  for (const stdout of ["hi\n", "", '{"verdict":"pass"}', "[1, 2]"]) {
    assertEquals(parseCodexOutput(stdout, "gpt-5.5"), { text: stdout });
  }
});
