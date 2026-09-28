import { z } from "npm:zod@4.3.6";
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
  version: "2026.09.28.1",

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

        return await getTracer().startActiveSpan("run", async (span) => {
          span.setAttribute(Attr.METHOD, "run");
          span.setAttribute(Attr.PROVIDER, provider.name);

          try {
            const resolvedModel = args.model ?? globalArgs.defaultModel;
            const providerConfig = args.providerConfig ?? {};

            const output = await runAgent({
              globalArgs,
              prompt: args.prompt,
              model: resolvedModel,
              workingDir: Deno.cwd(),
              additionalDirs: [],
              outputPath: "",
              readOnly: args.readOnly,
              providerConfig,
              logger: ctx.logger,
              signal: ctx.signal,
            });

            span.setAttribute(Attr.EXIT_CODE, output.exitCode);

            const handle = await ctx.writeResource(
              "runResult",
              `run-${crypto.randomUUID()}`,
              { output: output.stdout, exitCode: output.exitCode },
              {
                tags: {
                  provider: provider.name,
                  exitCode: String(output.exitCode),
                  ...(resolvedModel ? { model: resolvedModel } : {}),
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
          }
        });
      },
    },
  },
};
