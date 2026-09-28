import type { AgentRunnerLogger, AgentRunRequest } from "./types.ts";
import { detectPlatform } from "./platform.ts";
import { resolveAuthKey } from "./auth.ts";
import { Attr, getTracer } from "./tracing.ts";
import { SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import type { GlobalArgs } from "./schemas.ts";
import { getProvider } from "./providers/registry.ts";

const CACHE_DIR_NAME = ".swamp/agent-runner/bin";

export interface RunAgentOptions {
  readonly globalArgs: GlobalArgs;
  readonly prompt: string;
  readonly model: string | undefined;
  readonly workingDir: string;
  readonly additionalDirs: string[];
  readonly outputPath: string;
  readonly readOnly: boolean;
  readonly providerConfig: Record<string, unknown>;
  readonly logger: AgentRunnerLogger;
  readonly signal: AbortSignal;
}

export interface AgentOutput {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

export async function runAgent(opts: RunAgentOptions): Promise<AgentOutput> {
  const provider = getProvider(opts.globalArgs.provider);
  const apiKey = resolveAuthKey(provider, opts.globalArgs);
  const platform = detectPlatform();
  const cacheDir = `${opts.workingDir}/${CACHE_DIR_NAME}`;

  return await getTracer().startActiveSpan("agent.run", async (span) => {
    span.setAttribute(Attr.PROVIDER, provider.name);
    span.setAttribute(Attr.VERSION, opts.globalArgs.version);
    if (opts.model) {
      span.setAttribute(Attr.MODEL, opts.model);
    }

    try {
      opts.logger.info(
        `Ensuring ${provider.name} CLI v${opts.globalArgs.version} for ${platform}`,
      );
      const binaryPath = await provider.ensureBinary(
        opts.globalArgs.version,
        cacheDir,
        platform,
        opts.signal,
      );

      const request: AgentRunRequest = {
        prompt: opts.prompt,
        model: opts.model,
        workingDir: opts.workingDir,
        additionalDirs: opts.additionalDirs,
        outputPath: opts.outputPath,
        readOnly: opts.readOnly,
      };

      const providerSpecificConfig = extractProviderConfig(
        provider.name,
        opts.providerConfig,
      );
      const args = provider.buildArgs(request, providerSpecificConfig);

      const envVarName = provider.apiKeyEnvName(providerSpecificConfig);

      opts.logger.info(
        `Running ${provider.name} agent${
          opts.model ? ` (model: ${opts.model})` : ""
        }`,
      );

      const command = new Deno.Command(binaryPath, {
        args,
        cwd: opts.workingDir,
        clearEnv: true,
        env: buildSubprocessEnv(envVarName, apiKey, opts.readOnly),
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
        opts.logger.warn(`Agent exited with code ${exitCode}`);
        if (stderr.trim()) {
          opts.logger.warn(`Agent stderr: ${stderr.trim()}`);
        }
      }

      return { stdout, stderr, exitCode };
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
];

const WRITE_MODE_ENV_VARS = [
  "SSH_AUTH_SOCK",
  "GIT_SSH_COMMAND",
  "GIT_AUTHOR_NAME",
  "GIT_AUTHOR_EMAIL",
  "GIT_COMMITTER_NAME",
  "GIT_COMMITTER_EMAIL",
];

export function buildSubprocessEnv(
  apiKeyEnvName: string,
  apiKey: string | undefined,
  readOnly: boolean,
): Record<string, string> {
  // With no key (auth 'cli') the variable is omitted entirely: a set key,
  // even an empty one, takes precedence over the CLI's stored login.
  const env: Record<string, string> = apiKey === undefined
    ? {}
    : { [apiKeyEnvName]: apiKey };
  for (const name of FORWARDED_ENV_VARS) {
    const value = Deno.env.get(name);
    if (value !== undefined) {
      env[name] = value;
    }
  }
  if (!readOnly) {
    for (const name of WRITE_MODE_ENV_VARS) {
      const value = Deno.env.get(name);
      if (value !== undefined) {
        env[name] = value;
      }
    }
  }
  return env;
}

function extractProviderConfig(
  providerName: string,
  providerConfig: Record<string, unknown>,
): Record<string, unknown> {
  const specific = providerConfig[providerName];
  if (specific && typeof specific === "object" && !Array.isArray(specific)) {
    return specific as Record<string, unknown>;
  }
  return {};
}
