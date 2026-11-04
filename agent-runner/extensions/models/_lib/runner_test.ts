import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import { ReviewResultSchema } from "./schemas.ts";
import { buildReviewPrompt, extractJsonResult } from "./review.ts";
import { buildSubprocessEnv, runAgent } from "./runner.ts";
import type { RunAgentOptions } from "./runner.ts";
import { resolveDir, resolveDirs } from "./dirs.ts";
import { isCapacityMessage } from "./capacity.ts";
import { binaryFileName, detectPlatform } from "./platform.ts";

// ---------------------------------------------------------------------------
// Mock agent binary execution
// ---------------------------------------------------------------------------

Deno.test("runner: mock agent binary writes result and exits 0", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "runner-test-" });

  const result = {
    verdict: "pass",
    body: "## Code Review\n\nAll looks good.",
    findings: [],
    highestSeverity: "none",
  };

  // Create a mock agent binary that writes structured JSON
  const mockAgent = `#!/bin/sh
cat > "$1" << 'RESULT_EOF'
${JSON.stringify(result, null, 2)}
RESULT_EOF
`;
  const agentPath = `${tmpDir}/mock-agent`;
  await Deno.writeTextFile(agentPath, mockAgent);
  await Deno.chmod(agentPath, 0o755);

  const outputPath = `${tmpDir}/result.json`;

  try {
    const command = new Deno.Command(agentPath, {
      args: [outputPath],
      cwd: tmpDir,
      stdout: "piped",
      stderr: "piped",
    });

    const output = await command.output();
    assertEquals(output.code, 0);

    // Verify the result file was written
    const resultJson = await Deno.readTextFile(outputPath);
    const parsed = ReviewResultSchema.parse(JSON.parse(resultJson));
    assertEquals(parsed.verdict, "pass");
    assertEquals(parsed.findings.length, 0);
    assertEquals(parsed.highestSeverity, "none");
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("runner: mock agent binary writes fail result with findings", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "runner-test-" });

  const result = {
    verdict: "fail",
    body:
      "## Adversarial Review\n\n### Critical / High\n1. SQL injection in auth.ts:42",
    findings: [
      {
        severity: "critical",
        file: "src/auth.ts",
        line: 42,
        description: "User input passed directly to SQL query",
        example: "login('admin; DROP TABLE users--')",
        suggestion: "Use parameterized queries",
      },
      {
        severity: "medium",
        file: "src/config.ts",
        line: 10,
        description: "Config file read without error handling",
      },
    ],
    highestSeverity: "critical",
  };

  const mockAgent = `#!/bin/sh
cat > "$1" << 'RESULT_EOF'
${JSON.stringify(result, null, 2)}
RESULT_EOF
`;
  const agentPath = `${tmpDir}/mock-agent`;
  await Deno.writeTextFile(agentPath, mockAgent);
  await Deno.chmod(agentPath, 0o755);

  const outputPath = `${tmpDir}/result.json`;

  try {
    const command = new Deno.Command(agentPath, {
      args: [outputPath],
      cwd: tmpDir,
      stdout: "piped",
      stderr: "piped",
    });

    const output = await command.output();
    assertEquals(output.code, 0);

    const resultJson = await Deno.readTextFile(outputPath);
    const parsed = ReviewResultSchema.parse(JSON.parse(resultJson));
    assertEquals(parsed.verdict, "fail");
    assertEquals(parsed.findings.length, 2);
    assertEquals(parsed.findings[0].severity, "critical");
    assertEquals(parsed.findings[0].file, "src/auth.ts");
    assertEquals(parsed.findings[0].line, 42);
    assertEquals(parsed.highestSeverity, "critical");
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

Deno.test("runner: handles agent that exits non-zero", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "runner-test-" });

  const mockAgent = `#!/bin/sh
echo "error: something went wrong" >&2
exit 1
`;
  const agentPath = `${tmpDir}/mock-agent`;
  await Deno.writeTextFile(agentPath, mockAgent);
  await Deno.chmod(agentPath, 0o755);

  try {
    const command = new Deno.Command(agentPath, {
      args: [],
      cwd: tmpDir,
      stdout: "piped",
      stderr: "piped",
    });

    const output = await command.output();
    assertEquals(output.code, 1);

    const stderr = new TextDecoder().decode(output.stderr);
    assertEquals(stderr.includes("something went wrong"), true);
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// JSON extraction (imported from review.ts)
// ---------------------------------------------------------------------------

Deno.test("runner: parses JSON embedded in surrounding text", () => {
  const source = `Some preamble text
Here is my analysis...

{"verdict":"pass","body":"all good","findings":[],"highestSeverity":"none"}

Done.`;

  const parsed = extractJsonResult(source);
  assertEquals(parsed !== null, true);
  assertEquals(parsed!.verdict, "pass");
});

Deno.test("runner: handles multi-line JSON result", () => {
  const source = `{
  "verdict": "fail",
  "body": "## Review\\n\\nFound issues.",
  "findings": [
    {
      "severity": "high",
      "file": "main.ts",
      "description": "Missing null check"
    }
  ],
  "highestSeverity": "high"
}`;

  const parsed = extractJsonResult(source);
  assertEquals(parsed !== null, true);
  assertEquals(parsed!.verdict, "fail");
});

Deno.test("runner: returns null when no JSON in output", () => {
  const source = "The agent produced only text with no JSON structure.";
  const parsed = extractJsonResult(source);
  assertEquals(parsed, null);
});

Deno.test("runner: handles braces before the result JSON (greedy fix)", () => {
  const source = `The function foo() { return bar; } has a bug.
Also check config = { key: "value" } for issues.

{"verdict":"pass","body":"all good","findings":[],"highestSeverity":"none"}`;

  const parsed = extractJsonResult(source);
  assertEquals(parsed !== null, true);
  assertEquals(parsed!.verdict, "pass");
  assertEquals((parsed!.findings as unknown[]).length, 0);
});

Deno.test("runner: handles trailing text with braces after result", () => {
  const source =
    `{"verdict":"fail","body":"review","findings":[{"severity":"high","file":"a.ts","description":"bug"}],"highestSeverity":"high"}

Some trailing text with { braces } here.`;

  const parsed = extractJsonResult(source);
  assertEquals(parsed !== null, true);
  assertEquals(parsed!.verdict, "fail");
});

// ---------------------------------------------------------------------------
// Review prompt construction (uses real buildReviewPrompt from review.ts)
// ---------------------------------------------------------------------------

Deno.test("runner: review prompt includes template, files, and output instructions", () => {
  const template = "You are a code reviewer. Review for bugs.";
  const files = ["src/main.ts", "src/lib.ts", "test/main_test.ts"];
  const outputInstructions =
    "Write your result using tee /tmp/result.json <<'EOF'\n(json)\nEOF";
  const outputPath = "/tmp/result.json";

  const prompt = buildReviewPrompt(
    template,
    outputInstructions,
    outputPath,
    { files },
  );

  assertEquals(prompt.includes(template), true);
  assertEquals(prompt.includes("src/main.ts"), true);
  assertEquals(prompt.includes("src/lib.ts"), true);
  assertEquals(prompt.includes("test/main_test.ts"), true);
  assertEquals(prompt.includes("CHANGED FILES"), true);
  assertEquals(prompt.includes("OUTPUT INSTRUCTIONS"), true);
  assertEquals(prompt.includes(outputPath), true);
  assertEquals(prompt.includes("verdict"), true);
});

Deno.test("runner: review prompt handles empty file list", () => {
  const prompt = buildReviewPrompt("review", "output here", "/tmp/r.json", {
    files: [],
  });
  assertEquals(prompt.includes("CHANGED FILES"), true);
});

Deno.test("runner: review prompt handles large file list", () => {
  const files = Array.from({ length: 500 }, (_, i) => `src/file_${i}.ts`);
  const prompt = buildReviewPrompt("review", "output", "/tmp/r.json", {
    files,
  });
  assertEquals(prompt.includes("src/file_0.ts"), true);
  assertEquals(prompt.includes("src/file_499.ts"), true);
});

Deno.test("runner: review prompt uses diff when provided", () => {
  const diff = "diff --git a/src/main.ts b/src/main.ts\n+const x = 1;";
  const prompt = buildReviewPrompt("review", "output", "/tmp/r.json", {
    diff,
  });
  assertEquals(prompt.includes("DIFF (review these changes"), true);
  assertEquals(prompt.includes(diff), true);
  assertEquals(prompt.includes("CHANGED FILES"), false);
});

// ---------------------------------------------------------------------------
// Subprocess environment
// ---------------------------------------------------------------------------

Deno.test("runner: subprocess env includes the api key when given", () => {
  const env = buildSubprocessEnv("ANTHROPIC_API_KEY", "sk-test-123", true);
  assertEquals(env["ANTHROPIC_API_KEY"], "sk-test-123");
});

Deno.test("runner: subprocess env omits the api key variable without a key", () => {
  const original = Deno.env.get("ANTHROPIC_API_KEY");
  try {
    Deno.env.set("ANTHROPIC_API_KEY", "sk-from-parent");
    const env = buildSubprocessEnv("ANTHROPIC_API_KEY", undefined, true);
    assertEquals("ANTHROPIC_API_KEY" in env, false);
  } finally {
    if (original !== undefined) {
      Deno.env.set("ANTHROPIC_API_KEY", original);
    } else {
      Deno.env.delete("ANTHROPIC_API_KEY");
    }
  }
});

Deno.test("runner: subprocess env still forwards HOME without a key", () => {
  const home = Deno.env.get("HOME");
  const env = buildSubprocessEnv("ANTHROPIC_API_KEY", undefined, true);
  assertEquals(env["HOME"], home);
});

Deno.test("runner: subprocess env forwards the Windows profile variables", () => {
  const names = ["USERPROFILE", "APPDATA", "LOCALAPPDATA", "SystemRoot"];
  const originals = new Map(names.map((n) => [n, Deno.env.get(n)]));
  try {
    for (const name of names) {
      Deno.env.set(name, `value-of-${name}`);
    }
    const env = buildSubprocessEnv("ANTHROPIC_API_KEY", undefined, true);
    for (const name of names) {
      assertEquals(env[name], `value-of-${name}`);
    }
  } finally {
    for (const [name, value] of originals) {
      if (value !== undefined) {
        Deno.env.set(name, value);
      } else {
        Deno.env.delete(name);
      }
    }
  }
});

// ---------------------------------------------------------------------------
// Run order
// ---------------------------------------------------------------------------

Deno.test("runner: a bad provider config fails before the key lookup and download", async () => {
  const tmpDir = await Deno.makeTempDir({ prefix: "runner-test-" });
  const original = Deno.env.get("CODEX_API_KEY");
  try {
    Deno.env.delete("CODEX_API_KEY");
    // With no CODEX_API_KEY, a key lookup first would fail with "No API key
    // found"; the authCommand error proves the arguments are built first.
    await assertRejects(
      () =>
        runAgent({
          globalArgs: { provider: "codex", version: "0.163.0", auth: "apiKey" },
          prompt: "test",
          model: undefined,
          repoDir: tmpDir,
          workingDir: tmpDir,
          additionalDirs: [],
          outputPath: `${tmpDir}/result.json`,
          readOnly: true,
          providerConfig: {
            codex: {
              modelProvider: {
                id: "gw",
                baseUrl: "https://gateway.example/v1",
                authCommand: "token-helper",
              },
            },
          },
          logger: {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {},
          },
          signal: new AbortController().signal,
        }),
      Error,
      "set auth to 'cli'",
    );
    // Nothing was downloaded.
    await assertRejects(() => Deno.stat(`${tmpDir}/.swamp`));
  } finally {
    if (original !== undefined) {
      Deno.env.set("CODEX_API_KEY", original);
    }
    await Deno.remove(tmpDir, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// Working directory, extra directories and resume
// ---------------------------------------------------------------------------

const CLAUDE_TEST_VERSION = "9.9.9";
const quietLogger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

/**
 * Plants a fake claude binary where ensureBinary looks for a cached one, so
 * nothing is downloaded. It records its working directory and arguments, one
 * per line, in invocationFile, and prints the given result envelope.
 */
async function plantFakeClaude(
  repoDir: string,
  invocationFile: string,
  envelope: Record<string, unknown>,
  exitCode = 0,
): Promise<void> {
  const dir =
    `${repoDir}/.swamp/agent-runner/bin/claude/${CLAUDE_TEST_VERSION}`;
  await Deno.mkdir(dir, { recursive: true });
  const binary = `${dir}/${binaryFileName("claude", detectPlatform())}`;
  await Deno.writeTextFile(
    binary,
    `#!/bin/sh
pwd > '${invocationFile}'
for arg in "$@"; do printf '%s\\n' "$arg" >> '${invocationFile}'; done
cat <<'ENVELOPE_EOF'
${JSON.stringify(envelope)}
ENVELOPE_EOF
exit ${exitCode}
`,
  );
  await Deno.chmod(binary, 0o755);
}

function claudeRunOptions(
  overrides: Partial<RunAgentOptions> & { repoDir: string },
): RunAgentOptions {
  return {
    globalArgs: {
      provider: "claude",
      version: CLAUDE_TEST_VERSION,
      auth: "cli",
    },
    prompt: "test prompt",
    model: undefined,
    workingDir: overrides.repoDir,
    additionalDirs: [],
    outputPath: "",
    readOnly: true,
    providerConfig: {},
    logger: quietLogger,
    signal: new AbortController().signal,
    ...overrides,
  };
}

const OK_ENVELOPE = {
  type: "result",
  subtype: "success",
  is_error: false,
  result: "done",
  session_id: "ddd38c40-9c35-4615-9e54-ed2616359d50",
};

// The fake binary is a POSIX shell script, so these run on Linux and macOS
// only; the path resolution they rely on is covered on every platform by the
// resolveDir tests below.
const posixOnly = Deno.build.os === "windows";

Deno.test({
  name:
    "runner: the agent runs in workingDir while the CLI stays cached in the repo",
  ignore: posixOnly,
  fn: async () => {
    const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
    const worktree = await Deno.makeTempDir({ prefix: "runner-worktree-" });
    const extra = await Deno.makeTempDir({ prefix: "runner-extra-" });
    const invocation = `${repoDir}/invocation.txt`;
    try {
      await plantFakeClaude(repoDir, invocation, OK_ENVELOPE);

      const output = await runAgent(claudeRunOptions({
        repoDir,
        workingDir: worktree,
        additionalDirs: [extra],
        resumeSessionId: "ddd38c40-9c35-4615-9e54-ed2616359d50",
      }));

      const lines = (await Deno.readTextFile(invocation)).trimEnd().split(
        "\n",
      );
      assertEquals(lines[0], await Deno.realPath(worktree));
      const args = lines.slice(1);
      assertEquals(args[args.indexOf("--add-dir") + 1], extra);
      assertEquals(
        args[args.indexOf("--resume") + 1],
        "ddd38c40-9c35-4615-9e54-ed2616359d50",
      );
      assertEquals(output.workingDir, worktree);
      assertEquals(output.stdout, "done");
      assertEquals(output.capacityStop, undefined);
      // Nothing was downloaded into the worktree.
      await assertRejects(() => Deno.stat(`${worktree}/.swamp`));
    } finally {
      await Deno.remove(repoDir, { recursive: true });
      await Deno.remove(worktree, { recursive: true });
      await Deno.remove(extra, { recursive: true });
    }
  },
});

Deno.test({
  name: "runner: a relative workingDir is resolved against the repo",
  ignore: posixOnly,
  fn: async () => {
    const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
    const invocation = `${repoDir}/invocation.txt`;
    try {
      await Deno.mkdir(`${repoDir}/worktrees/item-1`, { recursive: true });
      await plantFakeClaude(repoDir, invocation, OK_ENVELOPE);

      const output = await runAgent(claudeRunOptions({
        repoDir,
        workingDir: "worktrees/item-1",
      }));

      assertEquals(output.workingDir, `${repoDir}/worktrees/item-1`);
      const pwd = (await Deno.readTextFile(invocation)).split("\n")[0];
      assertEquals(pwd, await Deno.realPath(`${repoDir}/worktrees/item-1`));
    } finally {
      await Deno.remove(repoDir, { recursive: true });
    }
  },
});

Deno.test({
  name: "runner: a usage-limit error envelope is a capacity stop",
  ignore: posixOnly,
  fn: async () => {
    const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
    try {
      await plantFakeClaude(repoDir, `${repoDir}/invocation.txt`, {
        type: "result",
        subtype: "success",
        is_error: true,
        result: "Claude AI usage limit reached|1762300800",
        session_id: "ddd38c40-9c35-4615-9e54-ed2616359d50",
      }, 1);

      const output = await runAgent(claudeRunOptions({ repoDir }));

      assertEquals(output.exitCode, 1);
      assertEquals(output.capacityStop, true);
      assertEquals(output.sessionId, "ddd38c40-9c35-4615-9e54-ed2616359d50");
    } finally {
      await Deno.remove(repoDir, { recursive: true });
    }
  },
});

Deno.test({
  name: "runner: a non-zero exit with rate-limit stderr is a capacity stop",
  ignore: posixOnly,
  fn: async () => {
    const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
    try {
      const dir =
        `${repoDir}/.swamp/agent-runner/bin/claude/${CLAUDE_TEST_VERSION}`;
      await Deno.mkdir(dir, { recursive: true });
      const binary = `${dir}/${binaryFileName("claude", detectPlatform())}`;
      // Not a JSON envelope: an older CLI or a crash that only wrote stderr.
      await Deno.writeTextFile(
        binary,
        "#!/bin/sh\necho 'API Error: 429 rate_limit_error' >&2\nexit 1\n",
      );
      await Deno.chmod(binary, 0o755);

      const output = await runAgent(claudeRunOptions({ repoDir }));

      assertEquals(output.capacityStop, true);
    } finally {
      await Deno.remove(repoDir, { recursive: true });
    }
  },
});

Deno.test("runner: a missing workingDir fails before the download", async () => {
  const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
  try {
    await assertRejects(
      () =>
        runAgent(claudeRunOptions({
          repoDir,
          workingDir: `${repoDir}/no-such-dir`,
        })),
      Error,
      "workingDir",
    );
    await assertRejects(() => Deno.stat(`${repoDir}/.swamp`));
  } finally {
    await Deno.remove(repoDir, { recursive: true });
  }
});

Deno.test("runner: a missing additional dir fails before the download", async () => {
  const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
  try {
    await assertRejects(
      () =>
        runAgent(claudeRunOptions({
          repoDir,
          additionalDirs: ["missing"],
        })),
      Error,
      "additionalDirs entry 'missing' does not exist",
    );
    await assertRejects(() => Deno.stat(`${repoDir}/.swamp`));
  } finally {
    await Deno.remove(repoDir, { recursive: true });
  }
});

Deno.test("runner: resume on codex fails before the key lookup and download", async () => {
  const repoDir = await Deno.makeTempDir({ prefix: "runner-repo-" });
  const original = Deno.env.get("CODEX_API_KEY");
  try {
    // With no CODEX_API_KEY, a key lookup first would fail with "No API key
    // found"; the resume error proves the check comes first.
    Deno.env.delete("CODEX_API_KEY");
    await assertRejects(
      () =>
        runAgent(claudeRunOptions({
          repoDir,
          globalArgs: { provider: "codex", version: "0.165.0", auth: "apiKey" },
          resumeSessionId: "01a187f0-eb7e-77b1-afdd-77db285adbf7",
        })),
      Error,
      "cannot resume a session",
    );
    await assertRejects(() => Deno.stat(`${repoDir}/.swamp`));
  } finally {
    if (original !== undefined) {
      Deno.env.set("CODEX_API_KEY", original);
    }
    await Deno.remove(repoDir, { recursive: true });
  }
});

Deno.test("dirs: resolveDir resolves a relative path against the repo", async () => {
  const repoDir = await Deno.makeTempDir({ prefix: "dirs-test-" });
  try {
    await Deno.mkdir(`${repoDir}/sub`);
    assertEquals(
      await resolveDir("sub", repoDir, "workingDir"),
      `${repoDir}/sub`,
    );
    assertEquals(
      await resolveDir(`${repoDir}/sub`, "/elsewhere", "workingDir"),
      `${repoDir}/sub`,
    );
    assertEquals(
      await resolveDirs(["sub", "."], repoDir, "dir"),
      [`${repoDir}/sub`, repoDir],
    );
  } finally {
    await Deno.remove(repoDir, { recursive: true });
  }
});

Deno.test("dirs: resolveDir rejects a file", async () => {
  const repoDir = await Deno.makeTempDir({ prefix: "dirs-test-" });
  try {
    await Deno.writeTextFile(`${repoDir}/file.txt`, "x");
    await assertRejects(
      () => resolveDir("file.txt", repoDir, "workingDir"),
      Error,
      "workingDir 'file.txt' is not a directory",
    );
  } finally {
    await Deno.remove(repoDir, { recursive: true });
  }
});

// ---------------------------------------------------------------------------
// Capacity messages
// ---------------------------------------------------------------------------

// Representative wording for these stops. A limit can't be triggered on
// demand, so these were not recorded here; re-check them against real output
// when a CLI changes how it reports limits.
Deno.test("capacity: matches usage-limit, rate-limit and overload wording", () => {
  for (
    const message of [
      "Claude AI usage limit reached|1762300800",
      "5-hour limit reached ∙ resets 3pm",
      "You've hit your limit · resets 3pm (America/New_York)",
      'API Error: 429 {"type":"error","error":{"type":"rate_limit_error"}}',
      "API Error: 529 Overloaded",
      "exceeded retry limit, last status: 429 Too Many Requests",
      "You've hit your usage limit. Try again in 2 days.",
    ]
  ) {
    assertEquals(isCapacityMessage(message), true, message);
  }
});

Deno.test("capacity: ignores other errors", () => {
  for (
    const message of [
      "There's an issue with the selected model (claude-no-such-model).",
      "unexpected status 401 Unauthorized: Missing bearer or basic authentication",
      "Prompt is too long",
      "error at line 429 of main.ts",
    ]
  ) {
    assertEquals(isCapacityMessage(message), false, message);
  }
});
