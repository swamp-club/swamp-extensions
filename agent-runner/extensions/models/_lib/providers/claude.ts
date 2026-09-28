import { z } from "npm:zod@4.3.6";
import type { AgentProvider, AgentRunRequest, Platform } from "../types.ts";

const DOWNLOAD_BASE = "https://downloads.claude.ai/claude-code-releases";

export const ClaudeConfigSchema = z.object({
  allowedTools: z.array(z.string()).optional()
    .describe("Tools the agent is allowed to use (e.g. Read, Grep)"),
  disallowedTools: z.array(z.string()).optional()
    .describe("Tools the agent is forbidden from using (e.g. Write, Edit)"),
});

function downloadUrl(version: string, platform: Platform): string {
  return `${DOWNLOAD_BASE}/${version}/${platform}/claude`;
}

function checksumUrl(version: string, platform: Platform): string {
  return `${DOWNLOAD_BASE}/${version}/${platform}/checksums.txt`;
}

export async function tryVerifyChecksum(
  binaryPath: string,
  version: string,
  platform: Platform,
  signal?: AbortSignal,
  baseUrl?: string,
): Promise<"verified" | "skipped"> {
  const url = baseUrl
    ? `${baseUrl}/${version}/${platform}/checksums.txt`
    : checksumUrl(version, platform);
  const resp = await fetch(url, { signal });
  if (!resp.ok) {
    await resp.body?.cancel();
    return "skipped";
  }
  const text = await resp.text();

  const expectedHash = text.split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .find((line) => line.endsWith("claude"))
    ?.split(/\s+/)[0];

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
    const binaryPath = `${dir}/claude`;

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
      await Deno.chmod(tmpPath, 0o755);
      const checksumStatus = await tryVerifyChecksum(
        tmpPath,
        version,
        platform,
        signal,
      );
      if (checksumStatus === "skipped") {
        console.warn(
          `[agent-runner] Checksum verification skipped for Claude CLI ${version} — no checksums file available`,
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
      `tee ${outputPath} <<'AGENT_RESULT_EOF'`,
      "(your JSON here)",
      "AGENT_RESULT_EOF",
    ].join("\n");
  },
};
