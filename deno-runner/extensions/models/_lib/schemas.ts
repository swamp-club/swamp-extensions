import { z } from "npm:zod@4.6.7";

export const GlobalArgsSchema = z.object({
  version: z.string().min(1).regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/).refine(
    (v) => !v.includes(".."),
    { message: "Version must not contain '..' segments" },
  ).describe("Deno version to install (e.g. '2.7.5')"),
});

export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

export const InstallResultSchema = z.object({
  binaryPath: z.string(),
  version: z.string(),
  platform: z.string(),
});

export const CommandResultSchema = z.object({
  stdout: z.string(),
  stderr: z.string(),
  exitCode: z.number().int(),
  command: z.string(),
});

export const RunArgsSchema = z.object({
  args: z.array(z.string()).min(1)
    .describe(
      "Arguments to pass to deno (e.g. ['check', 'src/main.ts'] or ['test', '--allow-read', 'src/'])",
    ),
  workingDir: z.string().optional()
    .describe("Working directory for the command"),
  env: z.record(z.string(), z.string()).optional()
    .describe("Additional environment variables to set"),
  inheritEnv: z.boolean().optional()
    .describe(
      "Inherit the full parent process environment instead of a curated " +
        "allowlist. Extra env vars are merged on top. Useful when the " +
        "command spawns sub-processes that need env vars outside the " +
        "default allowlist.",
    ),
});

export type RunArgs = z.infer<typeof RunArgsSchema>;

export const TaskArgsSchema = z.object({
  taskName: z.string().min(1)
    .describe("Name of the task to run from deno.json (e.g. 'generate:aws')"),
  taskArgs: z.array(z.string()).optional()
    .describe("Additional arguments to pass to the task"),
  workingDir: z.string().optional()
    .describe("Working directory for the command"),
  env: z.record(z.string(), z.string()).optional()
    .describe("Additional environment variables to set"),
  inheritEnv: z.boolean().optional()
    .describe(
      "Inherit the full parent process environment instead of a curated " +
        "allowlist. Extra env vars are merged on top. Useful when the " +
        "command spawns sub-processes that need env vars outside the " +
        "default allowlist.",
    ),
});

export type TaskArgs = z.infer<typeof TaskArgsSchema>;
