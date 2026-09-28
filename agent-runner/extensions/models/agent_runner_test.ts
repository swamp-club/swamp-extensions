import { assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import { model } from "./agent_runner.ts";
import { ClaudeConfigSchema } from "./_lib/providers/claude.ts";
import { CodexConfigSchema } from "./_lib/providers/codex.ts";
import { getProvider, listProviders } from "./_lib/providers/registry.ts";
import { resolveApiKey, resolveAuthKey } from "./_lib/auth.ts";
import { detectPlatform } from "./_lib/platform.ts";
import { ReviewResultSchema } from "./_lib/schemas.ts";
import type { AgentRunnerContext, DataHandle } from "./_lib/types.ts";

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

interface Harness {
  ctx: AgentRunnerContext;
  writes: {
    specName: string;
    name: string;
    data: Record<string, unknown>;
    tags?: Record<string, string>;
  }[];
  logs: { level: string; message: string }[];
}

function makeHarness(
  globalArgs: Record<string, unknown>,
  seed: Record<string, Record<string, unknown>> = {},
): Harness {
  const resources = new Map<string, Record<string, unknown>>(
    Object.entries(seed),
  );
  const writes: Harness["writes"] = [];
  const logs: Harness["logs"] = [];

  const log = (level: string) => (message: string) => {
    logs.push({ level, message });
  };

  const ctx: AgentRunnerContext = {
    signal: new AbortController().signal,
    globalArgs,
    logger: {
      debug: log("debug"),
      info: log("info"),
      warn: log("warn"),
      error: log("error"),
    },
    writeResource: (
      specName: string,
      name: string,
      data: Record<string, unknown>,
      overrides?: { tags?: Record<string, string> },
    ): Promise<DataHandle> => {
      writes.push({ specName, name, data, tags: overrides?.tags });
      resources.set(name, data);
      return Promise.resolve({ name, tags: overrides?.tags });
    },
    readResource: (name: string): Promise<Record<string, unknown> | null> =>
      Promise.resolve(resources.get(name) ?? null),
  };

  return { ctx, writes, logs };
}

// ---------------------------------------------------------------------------
// Model export shape
// ---------------------------------------------------------------------------

Deno.test("model export has correct type", () => {
  assertEquals(model.type, "@swamp/agent-runner");
});

Deno.test("model export has version", () => {
  assertEquals(typeof model.version, "string");
  // CalVer format: YYYY.MM.DD.N
  const parts = model.version.split(".");
  assertEquals(parts.length, 4);
});

Deno.test("model export has globalArguments schema", () => {
  const result = model.globalArguments.parse({
    provider: "claude",
    version: "2.1.150",
  });
  assertEquals(result.provider, "claude");
  assertEquals(result.version, "2.1.150");
});

Deno.test("globalArguments defaults provider to claude", () => {
  const result = model.globalArguments.parse({ version: "2.1.150" });
  assertEquals(result.provider, "claude");
});

Deno.test("globalArguments defaults auth to apiKey", () => {
  const result = model.globalArguments.parse({ version: "2.1.150" });
  assertEquals(result.auth, "apiKey");
});

Deno.test("globalArguments accepts auth cli", () => {
  const result = model.globalArguments.parse({
    version: "2.1.150",
    auth: "cli",
  });
  assertEquals(result.auth, "cli");
});

Deno.test("globalArguments rejects unknown auth mode", () => {
  const result = model.globalArguments.safeParse({
    version: "2.1.150",
    auth: "oauth",
  });
  assertEquals(result.success, false);
});

Deno.test("globalArguments rejects missing version", () => {
  const result = model.globalArguments.safeParse({ provider: "claude" });
  assertEquals(result.success, false);
});

Deno.test("globalArguments rejects version with path separators", () => {
  const result = model.globalArguments.safeParse({
    provider: "claude",
    version: "2.1.150/../../../etc/passwd",
  });
  assertEquals(result.success, false);
});

Deno.test("globalArguments accepts valid semver-like version", () => {
  const result = model.globalArguments.safeParse({
    provider: "claude",
    version: "2.1.150",
  });
  assertEquals(result.success, true);
});

Deno.test("globalArguments accepts codex version with dots", () => {
  const result = model.globalArguments.safeParse({
    provider: "codex",
    version: "0.146.0",
  });
  assertEquals(result.success, true);
});

Deno.test("model export has review method", () => {
  assertEquals(typeof model.methods.review.execute, "function");
  assertEquals(typeof model.methods.review.description, "string");
});

Deno.test("model export has run method", () => {
  assertEquals(typeof model.methods.run.execute, "function");
  assertEquals(typeof model.methods.run.description, "string");
});

Deno.test("model export has reviewProfile resource", () => {
  assertEquals(typeof model.resources.reviewProfile.description, "string");
  assertEquals(model.resources.reviewProfile.lifetime, "infinite");
});

Deno.test("model export has reviewResult resource", () => {
  assertEquals(typeof model.resources.reviewResult.description, "string");
  assertEquals(model.resources.reviewResult.lifetime, "infinite");
});

Deno.test("model export has runResult resource", () => {
  assertEquals(typeof model.resources.runResult.description, "string");
  assertEquals(model.resources.runResult.lifetime, "infinite");
});

// ---------------------------------------------------------------------------
// Provider registry
// ---------------------------------------------------------------------------

Deno.test("registry lists both providers", () => {
  const providers = listProviders();
  assertEquals(providers.includes("claude"), true);
  assertEquals(providers.includes("codex"), true);
});

Deno.test("registry returns claude provider", () => {
  const provider = getProvider("claude");
  assertEquals(provider.name, "claude");
  assertEquals(provider.defaultApiKeyEnvVar, "ANTHROPIC_API_KEY");
});

Deno.test("registry returns codex provider", () => {
  const provider = getProvider("codex");
  assertEquals(provider.name, "codex");
  assertEquals(provider.defaultApiKeyEnvVar, "CODEX_API_KEY");
});

Deno.test("registry throws on unknown provider", () => {
  try {
    getProvider("unknown");
    throw new Error("should have thrown");
  } catch (e) {
    assertEquals(
      (e as Error).message.includes("Unknown provider"),
      true,
    );
  }
});

// ---------------------------------------------------------------------------
// Claude provider config
// ---------------------------------------------------------------------------

Deno.test("claude config accepts allowed tools", () => {
  const result = ClaudeConfigSchema.parse({
    allowedTools: ["Read", "Grep", "Bash(git diff:*)"],
    disallowedTools: ["Write", "Edit"],
  });
  assertEquals(result.allowedTools?.length, 3);
  assertEquals(result.disallowedTools?.length, 2);
});

Deno.test("claude config accepts empty object", () => {
  const result = ClaudeConfigSchema.parse({});
  assertEquals(result.allowedTools, undefined);
  assertEquals(result.disallowedTools, undefined);
});

Deno.test("claude provider builds correct args", () => {
  const provider = getProvider("claude");
  const args = provider.buildArgs(
    {
      prompt: "review this code",
      model: "claude-sonnet-4-6",
      workingDir: "/repo",
      additionalDirs: ["/output"],
      outputPath: "/output/result.json",
      readOnly: true,
    },
    {
      allowedTools: ["Read", "Grep"],
      disallowedTools: ["Write"],
    },
  );

  assertEquals(args.includes("-p"), true);
  assertEquals(args.includes("review this code"), true);
  assertEquals(args.includes("--model"), true);
  assertEquals(args.includes("claude-sonnet-4-6"), true);
  assertEquals(args.includes("--add-dir"), true);
  assertEquals(args.includes("/output"), true);
  assertEquals(args.includes("--allowedTools"), true);
  assertEquals(args.includes("Read,Grep"), true);
  assertEquals(args.includes("--disallowedTools"), true);
  assertEquals(args.includes("Write"), true);
});

Deno.test("claude provider builds args without optional fields", () => {
  const provider = getProvider("claude");
  const args = provider.buildArgs(
    {
      prompt: "do something",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/output/result.json",
      readOnly: true,
    },
    {},
  );

  assertEquals(args.includes("-p"), true);
  assertEquals(args.includes("do something"), true);
  assertEquals(args.includes("--model"), false);
  assertEquals(args.includes("--allowedTools"), false);
  assertEquals(args.includes("--disallowedTools"), false);
});

// ---------------------------------------------------------------------------
// Codex provider config
// ---------------------------------------------------------------------------

Deno.test("codex config accepts sandbox and approval policy", () => {
  const result = CodexConfigSchema.parse({
    sandbox: "read-only",
    approvalPolicy: "never",
  });
  assertEquals(result.sandbox, "read-only");
  assertEquals(result.approvalPolicy, "never");
});

Deno.test("codex config accepts empty object", () => {
  const result = CodexConfigSchema.parse({});
  assertEquals(result.sandbox, undefined);
  assertEquals(result.approvalPolicy, undefined);
});

Deno.test("codex provider builds correct args for read-only", () => {
  const provider = getProvider("codex");
  const args = provider.buildArgs(
    {
      prompt: "review this code",
      model: "o4-mini",
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/output/result.json",
      readOnly: true,
    },
    {},
  );

  assertEquals(args[0], "exec");
  assertEquals(args.includes("--ephemeral"), true);
  assertEquals(args.includes("--ignore-user-config"), true);
  assertEquals(args.includes("--ignore-rules"), true);
  assertEquals(args.includes("--skip-git-repo-check"), true);
  assertEquals(args.includes("--sandbox"), true);
  assertEquals(args.includes("read-only"), true);
  assertEquals(args.includes("-m"), true);
  assertEquals(args.includes("o4-mini"), true);
  assertEquals(args.includes("-o"), true);
  assertEquals(args.includes("/output/result.json"), true);
  assertEquals(args[args.length - 1], "review this code");
});

Deno.test("codex provider uses workspace-write when not read-only", () => {
  const provider = getProvider("codex");
  const args = provider.buildArgs(
    {
      prompt: "fix this",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/output/result.json",
      readOnly: false,
    },
    {},
  );

  const sandboxIdx = args.indexOf("--sandbox");
  assertEquals(args[sandboxIdx + 1], "workspace-write");
});

Deno.test("codex provider respects explicit sandbox override", () => {
  const provider = getProvider("codex");
  const args = provider.buildArgs(
    {
      prompt: "fix this",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "/output/result.json",
      readOnly: true,
    },
    { sandbox: "workspace-write" },
  );

  const sandboxIdx = args.indexOf("--sandbox");
  assertEquals(args[sandboxIdx + 1], "workspace-write");
});

Deno.test("codex provider omits -o when outputPath is empty", () => {
  const provider = getProvider("codex");
  const args = provider.buildArgs(
    {
      prompt: "do something",
      model: undefined,
      workingDir: "/repo",
      additionalDirs: [],
      outputPath: "",
      readOnly: true,
    },
    {},
  );

  assertEquals(args.includes("-o"), false);
});

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

Deno.test("auth resolves from explicit apiKey", () => {
  const provider = getProvider("claude");
  const key = resolveApiKey(provider, { apiKey: "sk-test-123" });
  assertEquals(key, "sk-test-123");
});

Deno.test("auth resolves from custom env var", () => {
  const envVar = "TEST_AGENT_RUNNER_KEY";
  const original = Deno.env.get(envVar);
  try {
    Deno.env.set(envVar, "sk-from-env");
    const provider = getProvider("claude");
    const key = resolveApiKey(provider, { apiKeyEnvVar: envVar });
    assertEquals(key, "sk-from-env");
  } finally {
    if (original !== undefined) {
      Deno.env.set(envVar, original);
    } else {
      Deno.env.delete(envVar);
    }
  }
});

Deno.test("auth resolves from provider default env var", () => {
  const original = Deno.env.get("ANTHROPIC_API_KEY");
  try {
    Deno.env.set("ANTHROPIC_API_KEY", "sk-from-default");
    const provider = getProvider("claude");
    const key = resolveApiKey(provider, {});
    assertEquals(key, "sk-from-default");
  } finally {
    if (original !== undefined) {
      Deno.env.set("ANTHROPIC_API_KEY", original);
    } else {
      Deno.env.delete("ANTHROPIC_API_KEY");
    }
  }
});

Deno.test("auth throws when no key available", () => {
  const original = Deno.env.get("ANTHROPIC_API_KEY");
  try {
    Deno.env.delete("ANTHROPIC_API_KEY");
    const provider = getProvider("claude");
    try {
      resolveApiKey(provider, {});
      throw new Error("should have thrown");
    } catch (e) {
      assertEquals(
        (e as Error).message.includes("No API key found"),
        true,
      );
    }
  } finally {
    if (original !== undefined) {
      Deno.env.set("ANTHROPIC_API_KEY", original);
    }
  }
});

Deno.test("auth apiKey mode resolves the key as before", () => {
  const provider = getProvider("claude");
  const key = resolveAuthKey(provider, {
    auth: "apiKey",
    apiKey: "sk-test-123",
  });
  assertEquals(key, "sk-test-123");
});

Deno.test("auth apiKey mode still throws when no key available", () => {
  const original = Deno.env.get("ANTHROPIC_API_KEY");
  try {
    Deno.env.delete("ANTHROPIC_API_KEY");
    const provider = getProvider("claude");
    assertThrows(
      () => resolveAuthKey(provider, { auth: "apiKey" }),
      Error,
      "No API key found",
    );
  } finally {
    if (original !== undefined) {
      Deno.env.set("ANTHROPIC_API_KEY", original);
    }
  }
});

Deno.test("auth cli mode returns no key for claude", () => {
  const original = Deno.env.get("ANTHROPIC_API_KEY");
  try {
    Deno.env.delete("ANTHROPIC_API_KEY");
    const provider = getProvider("claude");
    assertEquals(resolveAuthKey(provider, { auth: "cli" }), undefined);
  } finally {
    if (original !== undefined) {
      Deno.env.set("ANTHROPIC_API_KEY", original);
    }
  }
});

Deno.test("auth cli mode ignores a key present in the environment", () => {
  const original = Deno.env.get("ANTHROPIC_API_KEY");
  try {
    Deno.env.set("ANTHROPIC_API_KEY", "sk-from-default");
    const provider = getProvider("claude");
    assertEquals(resolveAuthKey(provider, { auth: "cli" }), undefined);
  } finally {
    if (original !== undefined) {
      Deno.env.set("ANTHROPIC_API_KEY", original);
    } else {
      Deno.env.delete("ANTHROPIC_API_KEY");
    }
  }
});

Deno.test("auth cli mode is rejected for codex", () => {
  const provider = getProvider("codex");
  assertThrows(
    () => resolveAuthKey(provider, { auth: "cli" }),
    Error,
    "does not support auth 'cli'",
  );
});

Deno.test("auth cli mode rejects an explicit apiKey", () => {
  const provider = getProvider("claude");
  assertThrows(
    () => resolveAuthKey(provider, { auth: "cli", apiKey: "sk-test-123" }),
    Error,
    "cannot be combined",
  );
});

Deno.test("auth cli mode rejects apiKeyEnvVar", () => {
  const provider = getProvider("claude");
  assertThrows(
    () =>
      resolveAuthKey(provider, { auth: "cli", apiKeyEnvVar: "MY_CLAUDE_KEY" }),
    Error,
    "cannot be combined",
  );
});

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

Deno.test("platform detection returns valid platform", () => {
  const platform = detectPlatform();
  const valid = ["linux-x64", "linux-arm64", "darwin-x64", "darwin-arm64"];
  assertEquals(valid.includes(platform), true);
});

// ---------------------------------------------------------------------------
// ReviewResult schema
// ---------------------------------------------------------------------------

Deno.test("ReviewResult schema parses valid pass result", () => {
  const result = ReviewResultSchema.parse({
    verdict: "pass",
    body: "## Code Review\n\nAll looks good.",
    findings: [],
    highestSeverity: "none",
  });
  assertEquals(result.verdict, "pass");
  assertEquals(result.findings.length, 0);
});

Deno.test("ReviewResult schema parses valid fail result", () => {
  const result = ReviewResultSchema.parse({
    verdict: "fail",
    body: "## Code Review\n\n### Blocking Issues\n1. Bug in auth",
    findings: [
      {
        severity: "critical",
        file: "src/auth.ts",
        line: 42,
        description: "SQL injection vulnerability",
        example: "user input passed directly to query",
        suggestion: "Use parameterized queries",
      },
    ],
    highestSeverity: "critical",
  });
  assertEquals(result.verdict, "fail");
  assertEquals(result.findings.length, 1);
  assertEquals(result.findings[0].severity, "critical");
});

Deno.test("ReviewResult schema requires verdict", () => {
  const result = ReviewResultSchema.safeParse({
    body: "review",
    findings: [],
    highestSeverity: "none",
  });
  assertEquals(result.success, false);
});

// ---------------------------------------------------------------------------
// Review profile schema
// ---------------------------------------------------------------------------

Deno.test("ReviewProfile schema parses valid profile", () => {
  const result = model.resources.reviewProfile.schema.parse({
    promptFile: ".forgejo/prompts/review.md",
    defaultModel: "claude-opus-4-6",
    readOnly: true,
    providerConfig: {
      claude: {
        allowedTools: ["Read", "Grep"],
        disallowedTools: ["Write", "Edit"],
      },
    },
  });
  assertEquals(result.promptFile, ".forgejo/prompts/review.md");
  assertEquals(result.defaultModel, "claude-opus-4-6");
});

Deno.test("ReviewProfile schema defaults readOnly to true", () => {
  const result = model.resources.reviewProfile.schema.parse({
    promptFile: "prompt.md",
  });
  assertEquals(result.readOnly, true);
});

// ---------------------------------------------------------------------------
// Review method argument validation
// ---------------------------------------------------------------------------

Deno.test("review args schema accepts minimal input", () => {
  const result = model.methods.review.arguments.safeParse({
    files: ["src/main.ts"],
  });
  assertEquals(result.success, true);
});

Deno.test("review args accept profile name", () => {
  const result = model.methods.review.arguments.parse({
    profile: "adversarial",
    files: ["src/main.ts", "src/lib.ts"],
  });
  assertEquals(result.profile, "adversarial");
  assertEquals(result.files?.length, 2);
});

Deno.test("review args accept inline prompt file", () => {
  const result = model.methods.review.arguments.parse({
    promptFile: ".forgejo/prompts/review.md",
    files: ["src/main.ts"],
    model: "claude-sonnet-4-6",
    readOnly: true,
  });
  assertEquals(result.promptFile, ".forgejo/prompts/review.md");
  assertEquals(result.model, "claude-sonnet-4-6");
});

// ---------------------------------------------------------------------------
// Run method argument validation
// ---------------------------------------------------------------------------

Deno.test("run args require prompt", () => {
  const result = model.methods.run.arguments.safeParse({});
  assertEquals(result.success, false);
});

Deno.test("run args parse valid input", () => {
  const result = model.methods.run.arguments.parse({
    prompt: "Explain this code",
    model: "claude-sonnet-4-6",
    readOnly: true,
  });
  assertEquals(result.prompt, "Explain this code");
  assertEquals(result.model, "claude-sonnet-4-6");
});

Deno.test("run args default readOnly to true", () => {
  const result = model.methods.run.arguments.parse({
    prompt: "hello",
  });
  assertEquals(result.readOnly, true);
});

// ---------------------------------------------------------------------------
// Output instructions
// ---------------------------------------------------------------------------

Deno.test("claude output instructions reference the output path", () => {
  const provider = getProvider("claude");
  const instructions = provider.outputInstructions("/tmp/result.json");
  assertEquals(instructions.includes("/tmp/result.json"), true);
  assertEquals(instructions.includes("tee"), true);
});

Deno.test("codex output instructions mention final message", () => {
  const provider = getProvider("codex");
  const instructions = provider.outputInstructions("/tmp/result.json");
  assertEquals(instructions.includes("final message"), true);
});

// ---------------------------------------------------------------------------
// Harness smoke test
// ---------------------------------------------------------------------------

Deno.test("harness writeResource records writes", async () => {
  const { ctx, writes } = makeHarness({
    provider: "claude",
    version: "2.1.150",
  });

  await ctx.writeResource("reviewResult", "test-1", { verdict: "pass" }, {
    tags: { verdict: "pass" },
  });

  assertEquals(writes.length, 1);
  assertEquals(writes[0].specName, "reviewResult");
  assertEquals(writes[0].name, "test-1");
  assertEquals(writes[0].data.verdict, "pass");
  assertEquals(writes[0].tags?.verdict, "pass");
});

Deno.test("harness readResource returns seeded data", async () => {
  const { ctx } = makeHarness(
    { provider: "claude", version: "2.1.150" },
    {
      "my-profile": {
        promptFile: "review.md",
        readOnly: true,
      },
    },
  );

  const result = await ctx.readResource("my-profile");
  assertEquals(result?.promptFile, "review.md");
});

Deno.test("harness readResource returns null for missing", async () => {
  const { ctx } = makeHarness({ provider: "claude", version: "2.1.150" });
  const result = await ctx.readResource("nonexistent");
  assertEquals(result, null);
});
