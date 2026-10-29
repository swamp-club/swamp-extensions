import { z } from "npm:zod@4.6.7";
import {
  GlobalArgsSchema,
  ReviewArgsSchema,
  ReviewProfileSchema,
  ReviewResultSchema,
  RunArgsSchema,
  RunResultSchema,
} from "./_lib/schemas.ts";
import { executeReview } from "./_lib/review.ts";
import { runAgent } from "./_lib/runner.ts";
import { getProvider } from "./_lib/providers/registry.ts";
import { Attr, getTracer } from "./_lib/tracing.ts";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import type { AgentRunnerContext } from "./_lib/types.ts";

/**
 * Run AI coding agents (Claude, Codex) with structured output for CI
 * integration. Manages CLI binaries, resolves API tokens, returns verdicts.
 *
 * @module
 */

/** Agent runner model — providers, review profiles, and execution methods. */
export const model = {
  type: "@swamp/agent-runner",
  version: "2026.10.29.1",

  globalArguments: GlobalArgsSchema,

  upgrades: [
    {
      toVersion: "2026.08.23.1",
      description:
        "Add optional diff input to review method for inline diff review mode",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.28.1",
      description:
        "Add optional auth global argument (apiKey default, cli uses the Claude CLI's stored login)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.17.1",
      description:
        "Add optional effort argument to run and review (claude --effort, codex model_reasoning_effort)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.22.1",
      description:
        "Allow auth=cli for codex, add a codex modelProvider config for custom gateways, and send the codex approval policy as -c approval_policy",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.29.1",
      description:
        "Record token usage, cost and the CLI session id (optional usage and sessionId) on runResult and reviewResult. Runs now pass claude --output-format json and codex exec --json, which need Claude Code 1.0.37+ and Codex 0.122.0+",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  resources: {
    reviewProfile: {
      description:
        "A review profile — prompt template path, default model, tool permissions",
      schema: ReviewProfileSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    reviewResult: {
      description:
        "Structured output from a review run — verdict, findings, and formatted body",
      schema: ReviewResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 100,
    },
    runResult: {
      description: "Output from an arbitrary agent prompt execution",
      schema: RunResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 100,
    },
  },

  methods: {
    review: {
      description:
        "Run a coding agent review against a set of files and return a structured verdict",
      arguments: ReviewArgsSchema,
      execute: (
        args: z.infer<typeof ReviewArgsSchema>,
        ctx: AgentRunnerContext,
      ) => executeReview(args, ctx),
    },

    run: {
      description:
        "Run an arbitrary prompt through a coding agent and return the output",
      arguments: RunArgsSchema,
      execute: async (
        args: z.infer<typeof RunArgsSchema>,
        ctx: AgentRunnerContext,
      ) => {
        const globalArgs = GlobalArgsSchema.parse(ctx.globalArgs);
        const provider = getProvider(globalArgs.provider);

        let outputDir: string | null = null;

        return await getTracer().startActiveSpan("run", async (span) => {
          span.setAttribute(Attr.METHOD, "run");
          span.setAttribute(Attr.PROVIDER, provider.name);

          try {
            const resolvedModel = args.model ?? globalArgs.defaultModel;
            const providerConfig = args.providerConfig ?? {};

            // Codex writes its final message to a file (-o), since its
            // stdout is JSON events.
            if (provider.writesFinalMessage) {
              outputDir = await Deno.makeTempDir({ prefix: "agent-runner-" });
            }
            const outputPath = outputDir ? `${outputDir}/output.txt` : "";

            const output = await runAgent({
              globalArgs,
              prompt: args.prompt,
              model: resolvedModel,
              effort: args.effort,
              workingDir: Deno.cwd(),
              additionalDirs: [],
              outputPath,
              readOnly: args.readOnly,
              providerConfig,
              logger: ctx.logger,
              signal: ctx.signal,
            });

            span.setAttribute(Attr.EXIT_CODE, output.exitCode);

            const finalMessage = outputPath
              ? await readFinalMessage(outputPath)
              : null;

            const handle = await ctx.writeResource(
              "runResult",
              `run-${crypto.randomUUID()}`,
              {
                output: finalMessage ?? output.stdout,
                exitCode: output.exitCode,
                ...(args.effort ? { effort: args.effort } : {}),
                ...(output.sessionId ? { sessionId: output.sessionId } : {}),
                ...(output.usage ? { usage: output.usage } : {}),
              },
              {
                tags: {
                  provider: provider.name,
                  exitCode: String(output.exitCode),
                  ...(resolvedModel ? { model: resolvedModel } : {}),
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
            span.end();
            if (outputDir) {
              try {
                await Deno.remove(outputDir, { recursive: true });
              } catch {
                // best-effort cleanup
              }
            }
          }
        });
      },
    },
  },
};

// The final message codex wrote with -o, or null when there is none.
async function readFinalMessage(path: string): Promise<string | null> {
  try {
    const content = await Deno.readTextFile(path);
    return content.length > 0 ? content : null;
  } catch {
    return null;
  }
}
