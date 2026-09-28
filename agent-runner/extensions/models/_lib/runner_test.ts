import { assertEquals } from "jsr:@std/assert@1.0.19";
import { ReviewResultSchema } from "./schemas.ts";
import { buildReviewPrompt, extractJsonResult } from "./review.ts";
import { buildSubprocessEnv } from "./runner.ts";

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
