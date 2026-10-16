import type { AgentRunnerContext, ReviewResult } from "./types.ts";
import {
  AgentReviewOutputSchema,
  GlobalArgsSchema,
  type ReviewArgs,
  ReviewProfileSchema,
} from "./schemas.ts";
import { getProvider } from "./providers/registry.ts";
import { runAgent } from "./runner.ts";
import { Attr, getTracer } from "./tracing.ts";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";

const RESULT_SCHEMA_DESCRIPTION = `{
  "verdict": "pass" or "fail",
  "body": "your full review formatted as markdown",
  "findings": [
    {
      "severity": "critical" | "high" | "medium" | "low",
      "file": "path/to/file.ts",
      "line": 42,
      "description": "what is wrong",
      "example": "concrete input or scenario that breaks it",
      "suggestion": "how to fix it"
    }
  ],
  "highestSeverity": "critical" | "high" | "medium" | "low" | "none"
}`;

export async function executeReview(
  args: ReviewArgs,
  ctx: AgentRunnerContext,
): Promise<
  { dataHandles: Array<{ name: string; tags?: Record<string, string> }> }
> {
  if (!args.diff && (!args.files || args.files.length === 0)) {
    throw new Error("Either 'files' or 'diff' must be provided");
  }

  const globalArgs = GlobalArgsSchema.parse(ctx.globalArgs);
  const provider = getProvider(globalArgs.provider);

  let outputDir: string | null = null;

  return await getTracer().startActiveSpan("review", async (span) => {
    span.setAttribute(Attr.METHOD, "review");
    span.setAttribute(Attr.PROVIDER, provider.name);

    try {
      const profile = await resolveProfile(args, ctx);
      const promptTemplate = await Deno.readTextFile(profile.promptFile);
      const model = args.model ?? profile.defaultModel ??
        globalArgs.defaultModel;
      const readOnly = args.readOnly ?? profile.readOnly ?? true;
      const providerConfig = mergeProviderConfig(
        profile.providerConfig,
        args.providerConfig,
      );

      outputDir = await Deno.makeTempDir({ prefix: "agent-runner-" });
      const outputPath = `${outputDir}/result.json`;

      const mode = args.diff ? { diff: args.diff } : { files: args.files! };

      const prompt = buildReviewPrompt(
        promptTemplate,
        provider.outputInstructions(outputPath),
        outputPath,
        mode,
      );

      const effectiveProviderConfig = args.diff
        ? injectDiffModeTools(globalArgs.provider, providerConfig)
        : providerConfig;

      const output = await runAgent({
        globalArgs,
        prompt,
        model,
        effort: args.effort,
        workingDir: Deno.cwd(),
        additionalDirs: [outputDir],
        outputPath,
        readOnly,
        providerConfig: effectiveProviderConfig,
        logger: ctx.logger,
        signal: ctx.signal,
      });

      const parsed = await parseResult(outputPath, output.stdout, ctx);
      const result: ReviewResult = args.effort
        ? { ...parsed, effort: args.effort }
        : parsed;

      span.setAttribute(Attr.VERDICT, result.verdict);
      span.setAttribute(Attr.HIGHEST_SEVERITY, result.highestSeverity);

      const handle = await ctx.writeResource(
        "reviewResult",
        `review-${crypto.randomUUID()}`,
        result as unknown as Record<string, unknown>,
        {
          tags: {
            verdict: result.verdict,
            highestSeverity: result.highestSeverity,
            provider: provider.name,
            ...(model ? { model } : {}),
            ...(args.effort ? { effort: args.effort } : {}),
          },
        },
      );

      return { dataHandles: [handle] };
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    } finally {
      if (outputDir) {
        try {
          await Deno.remove(outputDir, { recursive: true });
        } catch {
          // best-effort cleanup
        }
      }
      span.end();
    }
  });
}

async function resolveProfile(
  args: ReviewArgs,
  ctx: AgentRunnerContext,
): Promise<{
  promptFile: string;
  defaultModel?: string;
  readOnly: boolean;
  providerConfig?: Record<string, unknown>;
}> {
  if (args.profile) {
    const resource = await ctx.readResource(args.profile);
    if (!resource) {
      throw new Error(`Review profile '${args.profile}' not found`);
    }
    const profile = ReviewProfileSchema.parse(resource);
    return {
      promptFile: args.promptFile ?? profile.promptFile,
      defaultModel: profile.defaultModel,
      readOnly: profile.readOnly,
      providerConfig: profile.providerConfig as
        | Record<string, unknown>
        | undefined,
    };
  }

  if (!args.promptFile) {
    throw new Error(
      "Either 'profile' or 'promptFile' must be provided",
    );
  }

  return {
    promptFile: args.promptFile,
    readOnly: args.readOnly ?? true,
  };
}

export function buildReviewPrompt(
  template: string,
  outputInstructions: string,
  outputPath: string,
  mode: { files: string[] } | { diff: string },
): string {
  const changesSection = "diff" in mode
    ? `DIFF (review these changes — do NOT review any other files):\n${mode.diff}`
    : `CHANGED FILES (this is the complete list — do NOT review any other files):\n${
      mode.files.join("\n")
    }`;

  return `${template}

OUTPUT INSTRUCTIONS:
Write your review result as JSON that conforms to this schema:

${RESULT_SCHEMA_DESCRIPTION}

Rules for the JSON:
- "verdict" must be "pass" if there are no critical or high severity findings, "fail" otherwise.
- "highestSeverity" must match the highest severity in findings, or "none" if findings is empty.
- "body" must be the full review formatted as markdown.
- Every finding must have at minimum: severity, file, and description.

Output path: ${outputPath}

${outputInstructions}

${changesSection}`;
}

const DIFF_MODE_ALLOWED_TOOLS = ["Read", "Grep", "Glob", "Bash(tee:*)"];

export function injectDiffModeTools(
  providerName: string,
  providerConfig: Record<string, unknown>,
): Record<string, unknown> {
  const existing = providerConfig[providerName];
  const providerSpecific = (existing && typeof existing === "object" &&
      !Array.isArray(existing))
    ? existing as Record<string, unknown>
    : {};

  if (providerSpecific.allowedTools) {
    return providerConfig;
  }

  const disallowed = Array.isArray(providerSpecific.disallowedTools)
    ? providerSpecific.disallowedTools as string[]
    : [];
  const allowed = DIFF_MODE_ALLOWED_TOOLS.filter(
    (tool) => !disallowed.some((d) => tool === d || tool.startsWith(`${d}(`)),
  );

  return {
    ...providerConfig,
    [providerName]: {
      ...providerSpecific,
      allowedTools: allowed,
    },
  };
}

async function parseResult(
  outputPath: string,
  stdout: string,
  ctx: AgentRunnerContext,
): Promise<ReviewResult> {
  let rawJson: string | null = null;

  try {
    rawJson = await Deno.readTextFile(outputPath);
  } catch {
    ctx.logger.warn("No result file found at output path, trying stdout");
  }

  // Try direct JSON.parse on the output file first — this handles the common
  // case where the file contains only the JSON result (no surrounding text)
  // and avoids the brace-matching heuristic entirely.
  if (rawJson) {
    try {
      const direct = JSON.parse(rawJson);
      if (
        typeof direct === "object" && direct !== null && "verdict" in direct
      ) {
        return AgentReviewOutputSchema.parse(direct);
      }
    } catch {
      ctx.logger.warn(
        "Output file is not pure JSON, falling back to extraction",
      );
    }
  }

  // Fall back to extraction for stdout or files with surrounding text
  const source = rawJson ?? stdout;
  const parsed = extractJsonResult(source);
  if (parsed) {
    try {
      return AgentReviewOutputSchema.parse(parsed);
    } catch (error) {
      ctx.logger.error(
        `Failed to validate agent result: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  } else {
    ctx.logger.error("Could not find JSON result in agent output");
  }

  return {
    verdict: "fail",
    body: source || "Agent produced no output",
    findings: [{
      severity: "critical",
      file: "N/A",
      description: parsed
        ? "Agent produced result that failed schema validation"
        : "Agent did not produce a structured result",
    }],
    highestSeverity: "critical",
  };
}

export function extractJsonResult(
  source: string,
): Record<string, unknown> | null {
  // Scan backwards for JSON objects containing "verdict" — try the rightmost
  // candidates first since the result is typically at the end of the output.
  const candidates: number[] = [];
  for (let i = source.length - 1; i >= 0; i--) {
    if (source[i] === "{") {
      candidates.push(i);
    }
  }

  for (const start of candidates) {
    let depth = 0;
    let end = -1;
    for (let i = start; i < source.length; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
    if (end === -1) continue;

    const candidate = source.slice(start, end);
    if (!candidate.includes('"verdict"')) continue;

    try {
      const parsed = JSON.parse(candidate);
      if (
        typeof parsed === "object" && parsed !== null && "verdict" in parsed
      ) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      continue;
    }
  }

  return null;
}

function mergeProviderConfig(
  profile?: Record<string, unknown>,
  override?: Record<string, unknown>,
): Record<string, unknown> {
  if (!profile && !override) return {};
  if (!profile) return override!;
  if (!override) return profile;
  return { ...profile, ...override };
}
