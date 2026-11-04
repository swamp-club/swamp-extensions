import type { AgentRunnerLogger, AgentRunRequest } from "./types.ts";
import { detectPlatform } from "./platform.ts";
import { resolveAuthKey } from "./auth.ts";
import { Attr, getTracer } from "./tracing.ts";
import { type Span, SpanStatusCode } from "npm:@opentelemetry/api@1.9.0";
import type { AgentUsage, Effort, GlobalArgs } from "./schemas.ts";
import { getProvider } from "./providers/registry.ts";
import { resolveDir, resolveDirs } from "./dirs.ts";
import { isCapacityMessage } from "./capacity.ts";

const CACHE_DIR_NAME = ".swamp/agent-runner/bin";

export interface RunAgentOptions {
  readonly globalArgs: GlobalArgs;
  readonly prompt: string;
  readonly model: string | undefined;
  readonly effort?: Effort;
  /**
   * The swamp repo. The CLI is cached under it, whatever workingDir is, and
   * relative workingDir and additionalDirs are resolved against it.
   */
  readonly repoDir: string;
  /** Directory the agent runs in. */
  readonly workingDir: string;
  readonly additionalDirs: readonly string[];
  readonly outputPath: string;
  readonly readOnly: boolean;
  readonly resumeSessionId?: string;
  readonly providerConfig: Record<string, unknown>;
  readonly logger: AgentRunnerLogger;
  readonly signal: AbortSignal;
}

export interface AgentOutput {
  /** The agent's reply, unwrapped from the CLI's JSON output. */
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
  readonly sessionId?: string;
  readonly usage?: AgentUsage;
  /** The absolute directory the agent ran in. */
  readonly workingDir: string;
  /** The run errored because of a usage limit, rate limit or overload. */
  readonly capacityStop?: boolean;
}

export async function runAgent(opts: RunAgentOptions): Promise<AgentOutput> {
  const provider = getProvider(opts.globalArgs.provider);
  const platform = detectPlatform();
  // Rooted at the swamp repo, not workingDir, so a worktree the agent runs in
  // is never left with a downloaded CLI in it.
  const cacheDir = `${opts.repoDir}/${CACHE_DIR_NAME}`;

  return await getTracer().startActiveSpan("agent.run", async (span) => {
    span.setAttribute(Attr.PROVIDER, provider.name);
    span.setAttribute(Attr.VERSION, opts.globalArgs.version);
    if (opts.model) {
      span.setAttribute(Attr.MODEL, opts.model);
    }
    if (opts.effort) {
      span.setAttribute(Attr.EFFORT, opts.effort);
    }

    try {
      // Checked before anything is resolved, built or downloaded.
      if (opts.resumeSessionId && !provider.supportsResume) {
        throw new Error(
          `Provider '${provider.name}' cannot resume a session: codex runs ` +
            `with --ephemeral and keeps no session. Omit resumeSessionId.`,
        );
      }
      const workingDir = await resolveDir(
        opts.workingDir,
        opts.repoDir,
        "workingDir",
      );
      const additionalDirs = await resolveDirs(
        opts.additionalDirs,
        opts.repoDir,
        "additionalDirs entry",
      );

      const request: AgentRunRequest = {
        prompt: opts.prompt,
        model: opts.model,
        effort: opts.effort,
        auth: opts.globalArgs.auth,
        workingDir,
        additionalDirs,
        outputPath: opts.outputPath,
        readOnly: opts.readOnly,
        ...(opts.resumeSessionId
          ? { resumeSessionId: opts.resumeSessionId }
          : {}),
      };

      // Arguments are built first so a bad provider config fails before the
      // key lookup and the binary download.
      const providerSpecificConfig = extractProviderConfig(
        provider.name,
        opts.providerConfig,
      );
      const args = provider.buildArgs(request, providerSpecificConfig);
      const apiKey = resolveAuthKey(provider, opts.globalArgs);

      opts.logger.info(
        `Ensuring ${provider.name} CLI v${opts.globalArgs.version} for ${platform}`,
      );
      const binaryPath = await provider.ensureBinary(
        opts.globalArgs.version,
        cacheDir,
        platform,
        opts.signal,
      );

      const envVarName = provider.apiKeyEnvName(providerSpecificConfig);

      opts.logger.info(
        `Running ${provider.name} agent${
          opts.model ? ` (model: ${opts.model})` : ""
        }${opts.effort ? ` (effort: ${opts.effort})` : ""}`,
      );

      const command = new Deno.Command(binaryPath, {
        args,
        cwd: workingDir,
        clearEnv: true,
        env: buildSubprocessEnv(envVarName, apiKey, opts.readOnly),
        stdout: "piped",
        stderr: "piped",
        signal: opts.signal,
      });

      const output = await command.output();

      const parsed = provider.parseOutput(
        new TextDecoder().decode(output.stdout),
        request,
      );
      const stderr = new TextDecoder().decode(output.stderr);
      const exitCode = output.code;
      const capacityStop = parsed.capacityStop === true ||
        (exitCode !== 0 && isCapacityMessage(stderr));

      span.setAttribute(Attr.EXIT_CODE, exitCode);
      if (parsed.sessionId) {
        span.setAttribute(Attr.SESSION_ID, parsed.sessionId);
      }
      if (parsed.usage) {
        setUsageAttributes(span, parsed.usage);
      }

      if (exitCode !== 0) {
        opts.logger.warn(`Agent exited with code ${exitCode}`);
        if (stderr.trim()) {
          opts.logger.warn(`Agent stderr: ${stderr.trim()}`);
        }
      }

      if (capacityStop) {
        opts.logger.warn(
          "Agent stopped on a usage limit, rate limit or overloaded API",
        );
      }

      return {
        stdout: parsed.text,
        stderr,
        exitCode,
        workingDir,
        ...(parsed.sessionId ? { sessionId: parsed.sessionId } : {}),
        ...(parsed.usage ? { usage: parsed.usage } : {}),
        ...(capacityStop ? { capacityStop: true } : {}),
      };
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

function setUsageAttributes(span: Span, usage: AgentUsage): void {
  const attributes: [string, number | undefined][] = [
    [Attr.INPUT_TOKENS, usage.inputTokens],
    [Attr.OUTPUT_TOKENS, usage.outputTokens],
    [Attr.CACHE_READ_TOKENS, usage.cacheReadTokens],
    [Attr.CACHE_WRITE_TOKENS, usage.cacheWriteTokens],
    [Attr.REASONING_OUTPUT_TOKENS, usage.reasoningOutputTokens],
    [Attr.COST_USD, usage.costUsd],
    [Attr.NUM_TURNS, usage.numTurns],
    [Attr.DURATION_MS, usage.durationMs],
    [Attr.DURATION_API_MS, usage.durationApiMs],
  ];
  for (const [name, value] of attributes) {
    if (value !== undefined) {
      span.setAttribute(name, value);
    }
  }
  if (usage.model) {
    span.setAttribute(Attr.USAGE_MODEL, usage.model);
  }
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
  // Windows: processes need these to start and to find the user's profile
  // (the Claude CLI's stored login lives under USERPROFILE / APPDATA). They
  // are unset on Unix, so the loop below skips them there.
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
  "CLAUDE_CODE_GIT_BASH_PATH",
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
