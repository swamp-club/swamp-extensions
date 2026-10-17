import type { DenoRunnerLogger } from "./types.ts";
import { Attr, getTracer } from "./tracing.ts";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";

export interface ExecuteOptions {
  readonly binaryPath: string;
  readonly args: string[];
  readonly workingDir: string;
  readonly env?: Record<string, string>;
  readonly inheritEnv?: boolean;
  readonly logger: DenoRunnerLogger;
  readonly signal: AbortSignal;
}

export interface ExecuteResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
  readonly command: string;
}

const FORWARDED_ENV_VARS = [
  "PATH",
  "HOME",
  "TMPDIR",
  "USER",
  "LANG",
  "LC_ALL",
  "SHELL",
  "TERM",
  "XDG_CONFIG_HOME",
  "XDG_DATA_HOME",
  "XDG_CACHE_HOME",
  "NO_COLOR",
  "FORCE_COLOR",
  "DENO_DIR",
  "DENO_AUTH_TOKENS",
  "DENO_TLS_CA_STORE",
  "DENO_CERT",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "NO_PROXY",
  "SSH_AUTH_SOCK",
  // Windows: processes need these to start and to find the user's profile.
  // They are unset on Unix, so the loop below skips them there.
  "SystemRoot",
  "SystemDrive",
  "windir",
  "USERPROFILE",
  "HOMEDRIVE",
  "HOMEPATH",
  "APPDATA",
  "LOCALAPPDATA",
  "ProgramData",
  "ProgramFiles",
  "TEMP",
  "TMP",
  "PATHEXT",
  "COMSPEC",
  "USERNAME",
  "PROCESSOR_ARCHITECTURE",
];

function buildSubprocessEnv(
  extraEnv?: Record<string, string>,
): Record<string, string> {
  const env: Record<string, string> = {};
  for (const name of FORWARDED_ENV_VARS) {
    const value = Deno.env.get(name);
    if (value !== undefined) {
      env[name] = value;
    }
  }
  if (extraEnv) {
    for (const [key, value] of Object.entries(extraEnv)) {
      env[key] = value;
    }
  }
  return env;
}

export async function execute(opts: ExecuteOptions): Promise<ExecuteResult> {
  const commandStr = `deno ${opts.args.join(" ")}`;

  return await getTracer().startActiveSpan("deno.execute", async (span) => {
    span.setAttribute(Attr.COMMAND, commandStr);

    try {
      opts.logger.info(`Running: ${commandStr}`);

      const command = new Deno.Command(opts.binaryPath, {
        args: opts.args,
        cwd: opts.workingDir,
        clearEnv: !opts.inheritEnv,
        env: opts.inheritEnv ? opts.env : buildSubprocessEnv(opts.env),
        stdout: "piped",
        stderr: "piped",
        signal: opts.signal,
      });

      const output = await command.output();

      const stdout = new TextDecoder().decode(output.stdout);
      const stderr = new TextDecoder().decode(output.stderr);
      const exitCode = output.code;

      span.setAttribute(Attr.EXIT_CODE, exitCode);

      if (exitCode !== 0) {
        opts.logger.warn(`deno exited with code ${exitCode}`);
        if (stderr.trim()) {
          opts.logger.warn(`stderr: ${stderr.trim()}`);
        }
      }

      return { stdout, stderr, exitCode, command: commandStr };
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
}
