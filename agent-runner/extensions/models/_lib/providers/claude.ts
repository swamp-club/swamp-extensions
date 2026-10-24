import { z } from "npm:zod@4.6.7";
import type { AgentProvider, AgentRunRequest, Platform } from "../types.ts";
import { binaryFileName, isWindows } from "../platform.ts";

const DOWNLOAD_BASE = "https://downloads.claude.ai/claude-code-releases";

export const ClaudeConfigSchema = z.object({
  allowedTools: z.array(z.string()).optional()
    .describe("Tools the agent is allowed to use (e.g. Read, Grep)"),
  disallowedTools: z.array(z.string()).optional()
    .describe("Tools the agent is forbidden from using (e.g. Write, Edit)"),
});

function downloadUrl(version: string, platform: Platform): string {
  return `${DOWNLOAD_BASE}/${version}/${platform}/${
    binaryFileName("claude", platform)
  }`;
}

function manifestUrl(version: string): string {
  return `${DOWNLOAD_BASE}/${version}/manifest.json`;
}

const ReleaseManifestSchema = z.object({
  platforms: z.record(
    z.string(),
    z.object({ checksum: z.string().optional() }),
  ),
});

// Checks the binary against the SHA-256 that the release's manifest.json
// records for this platform. A release without a manifest, or a manifest
// without this platform, is skipped rather than failed.
export async function tryVerifyChecksum(
  binaryPath: string,
  version: string,
  platform: Platform,
  signal?: AbortSignal,
  baseUrl?: string,
): Promise<"verified" | "skipped"> {
  const url = baseUrl
    ? `${baseUrl}/${version}/manifest.json`
    : manifestUrl(version);
  const resp = await fetch(url, { signal });
  if (!resp.ok) {
    await resp.body?.cancel();
    return "skipped";
  }

  let expectedHash: string | undefined;
  try {
    const manifest = ReleaseManifestSchema.parse(await resp.json());
    expectedHash = manifest.platforms[platform]?.checksum;
  } catch {
    return "skipped";
  }

  if (!expectedHash) {
    return "skipped";
  }

  const binaryData = await Deno.readFile(binaryPath);
  const hashBuffer = await crypto.subtle.digest("SHA-256", binaryData);
  const actualHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (actualHash !== expectedHash) {
    throw new Error(
      `Checksum mismatch for Claude CLI ${version}.\n` +
        `  Expected: ${expectedHash}\n` +
        `  Got:      ${actualHash}`,
    );
  }

  return "verified";
}

export const claudeProvider: AgentProvider = {
  name: "claude",
  defaultApiKeyEnvVar: "ANTHROPIC_API_KEY",
  supportsCliAuth: true,
  configSchema: ClaudeConfigSchema,

  async ensureBinary(
    version: string,
    cacheDir: string,
    platform: Platform,
    signal?: AbortSignal,
  ): Promise<string> {
    const dir = `${cacheDir}/claude/${version}`;
    const binaryPath = `${dir}/${binaryFileName("claude", platform)}`;

    try {
      await Deno.stat(binaryPath);
      return binaryPath;
    } catch {
      // Not cached — download
    }

    await Deno.mkdir(dir, { recursive: true });

    const url = downloadUrl(version, platform);
    const resp = await fetch(url, { signal });
    if (!resp.ok) {
      await resp.body?.cancel();
      throw new Error(
        `Failed to download Claude CLI ${version} for ${platform}: ` +
          `${resp.status} ${resp.statusText}`,
      );
    }

    // Atomic write: download to temp file, verify, then rename into place.
    // Prevents corruption from concurrent ensureBinary calls.
    const tmpPath = `${dir}/claude.download.${crypto.randomUUID()}`;
    try {
      const data = new Uint8Array(await resp.arrayBuffer());
      await Deno.writeFile(tmpPath, data);
      if (!isWindows(platform)) {
        await Deno.chmod(tmpPath, 0o755);
      }
      const checksumStatus = await tryVerifyChecksum(
        tmpPath,
        version,
        platform,
        signal,
      );
      if (checksumStatus === "skipped") {
        console.warn(
          `[agent-runner] Checksum verification skipped for Claude CLI ${version} — no checksum in the release manifest`,
        );
      }
      await Deno.rename(tmpPath, binaryPath);
    } catch (error) {
      try {
        await Deno.remove(tmpPath);
      } catch {
        // best-effort cleanup of temp file
      }
      throw error;
    }

    return binaryPath;
  },

  buildArgs(
    request: AgentRunRequest,
    providerConfig: Record<string, unknown>,
  ): string[] {
    const config = ClaudeConfigSchema.parse(providerConfig);
    const args = ["-p", request.prompt];

    if (request.model) {
      args.push("--model", request.model);
    }

    if (request.effort) {
      args.push("--effort", request.effort);
    }

    for (const dir of request.additionalDirs) {
      args.push("--add-dir", dir);
    }

    if (config.allowedTools && config.allowedTools.length > 0) {
      args.push("--allowedTools", config.allowedTools.join(","));
    }

    if (config.disallowedTools) {
      for (const tool of config.disallowedTools) {
        args.push("--disallowedTools", tool);
      }
    }

    return args;
  },

  apiKeyEnvName(_providerConfig: Record<string, unknown>): string {
    return "ANTHROPIC_API_KEY";
  },

  outputInstructions(outputPath: string): string {
    return [
      "After completing your analysis, you MUST write your result as JSON using tee.",
      "Do NOT use the Write tool. Use this exact command:",
      "",
      `tee ${shellPath(outputPath)} <<'AGENT_RESULT_EOF'`,
      "(your JSON here)",
      "AGENT_RESULT_EOF",
    ].join("\n");
  },
};

// Quotes a path for the tee command. On Windows the agent's shell is Git Bash,
// which strips the backslashes from an unquoted C:\... path; forward slashes
// work there and in Win32 alike.
export function shellPath(path: string): string {
  return `'${path.replaceAll("\\", "/").replaceAll("'", "'\\''")}'`;
}
