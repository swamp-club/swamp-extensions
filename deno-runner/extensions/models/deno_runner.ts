import { z } from "npm:zod@4.6.7";
import {
  CommandResultSchema,
  GlobalArgsSchema,
  InstallResultSchema,
  RunArgsSchema,
  TaskArgsSchema,
} from "./_lib/schemas.ts";
import { detectPlatform, ensureDeno } from "./_lib/installer.ts";
import { execute } from "./_lib/executor.ts";
import { Attr, getTracer } from "./_lib/tracing.ts";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import type { DenoRunnerContext } from "./_lib/types.ts";

/**
 * Install and run Deno commands. Manages Deno binary downloads and
 * provides generic command execution for CI and development workflows.
 *
 * @module
 */

export const model = {
  type: "@swamp/deno-runner",
  version: "2026.08.23.1",

  globalArguments: GlobalArgsSchema,

  upgrades: [
    {
      toVersion: "2026.08.22.1",
      description: "Add inheritEnv option to run and task methods",
      upgradeAttributes: (
        old: Record<string, unknown>,
      ) => old,
    },
    {
      toVersion: "2026.08.23.1",
      description:
        "Fail the step when the deno command exits with a non-zero exit code",
      upgradeAttributes: (
        old: Record<string, unknown>,
      ) => old,
    },
  ] as Array<{
    toVersion: string;
    description: string;
    upgradeAttributes: (
      old: Record<string, unknown>,
    ) => Record<string, unknown>;
  }>,

  resources: {
    installResult: {
      description:
        "Result of installing a Deno version — binary path and platform info",
      schema: InstallResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    commandResult: {
      description:
        "Output from a Deno command execution — stdout, stderr, exit code",
      schema: CommandResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 100,
    },
  },

  methods: {
    install: {
      description:
        "Ensure a specific Deno version is downloaded and cached, returning the binary path",
      arguments: z.object({}),
      execute: async (
        _args: z.infer<typeof z.object<Record<string, never>>>,
        ctx: DenoRunnerContext,
      ) => {
        const globalArgs = GlobalArgsSchema.parse(ctx.globalArgs);
        const platform = detectPlatform();

        return await getTracer().startActiveSpan("install", async (span) => {
          span.setAttribute(Attr.METHOD, "install");
          span.setAttribute(Attr.VERSION, globalArgs.version);
          span.setAttribute(Attr.PLATFORM, platform);

          try {
            ctx.logger.info(
              `Ensuring Deno v${globalArgs.version} for ${platform}`,
            );
            const binaryPath = await ensureDeno(
              globalArgs.version,
              Deno.cwd(),
              platform,
              ctx.signal,
              ctx.logger,
            );

            ctx.logger.info(`Deno binary ready at ${binaryPath}`);

            const handle = await ctx.writeResource(
              "installResult",
              `install-${crypto.randomUUID()}`,
              {
                binaryPath,
                version: globalArgs.version,
                platform,
              },
              {
                tags: {
                  version: globalArgs.version,
                  platform,
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

    run: {
      description: "Run an arbitrary deno command with the specified arguments",
      arguments: RunArgsSchema,
      execute: async (
        args: z.infer<typeof RunArgsSchema>,
        ctx: DenoRunnerContext,
      ) => {
        const globalArgs = GlobalArgsSchema.parse(ctx.globalArgs);
        const platform = detectPlatform();

        return await getTracer().startActiveSpan("run", async (span) => {
          span.setAttribute(Attr.METHOD, "run");
          span.setAttribute(Attr.VERSION, globalArgs.version);

          try {
            const binaryPath = await ensureDeno(
              globalArgs.version,
              Deno.cwd(),
              platform,
              ctx.signal,
              ctx.logger,
            );

            const workingDir = args.workingDir ?? Deno.cwd();

            const result = await execute({
              binaryPath,
              args: args.args,
              workingDir,
              env: args.env,
              inheritEnv: args.inheritEnv,
              logger: ctx.logger,
              signal: ctx.signal,
            });

            span.setAttribute(Attr.EXIT_CODE, result.exitCode);
            span.setAttribute(Attr.COMMAND, result.command);

            const handle = await ctx.writeResource(
              "commandResult",
              `run-${crypto.randomUUID()}`,
              {
                stdout: result.stdout,
                stderr: result.stderr,
                exitCode: result.exitCode,
                command: result.command,
              },
              {
                tags: {
                  exitCode: String(result.exitCode),
                  command: result.command,
                },
              },
            );

            if (result.exitCode !== 0) {
              const msg =
                `deno ${
                  args.args.join(" ")
                } exited with code ${result.exitCode}` +
                (result.stderr.trim() ? `\n${result.stderr.trim()}` : "");
              throw new Error(msg);
            }

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

    task: {
      description: "Run a named task from deno.json",
      arguments: TaskArgsSchema,
      execute: async (
        args: z.infer<typeof TaskArgsSchema>,
        ctx: DenoRunnerContext,
      ) => {
        const globalArgs = GlobalArgsSchema.parse(ctx.globalArgs);
        const platform = detectPlatform();

        return await getTracer().startActiveSpan("task", async (span) => {
          span.setAttribute(Attr.METHOD, "task");
          span.setAttribute(Attr.VERSION, globalArgs.version);

          try {
            const binaryPath = await ensureDeno(
              globalArgs.version,
              Deno.cwd(),
              platform,
              ctx.signal,
              ctx.logger,
            );

            const workingDir = args.workingDir ?? Deno.cwd();
            const denoArgs = ["task", args.taskName];
            if (args.taskArgs) {
              denoArgs.push(...args.taskArgs);
            }

            const result = await execute({
              binaryPath,
              args: denoArgs,
              workingDir,
              env: args.env,
              inheritEnv: args.inheritEnv,
              logger: ctx.logger,
              signal: ctx.signal,
            });

            span.setAttribute(Attr.EXIT_CODE, result.exitCode);
            span.setAttribute(Attr.COMMAND, result.command);

            const handle = await ctx.writeResource(
              "commandResult",
              `task-${crypto.randomUUID()}`,
              {
                stdout: result.stdout,
                stderr: result.stderr,
                exitCode: result.exitCode,
                command: result.command,
              },
              {
                tags: {
                  exitCode: String(result.exitCode),
                  command: result.command,
                  taskName: args.taskName,
                },
              },
            );

            if (result.exitCode !== 0) {
              const msg =
                `deno ${
                  denoArgs.join(" ")
                } exited with code ${result.exitCode}` +
                (result.stderr.trim() ? `\n${result.stderr.trim()}` : "");
              throw new Error(msg);
            }

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
