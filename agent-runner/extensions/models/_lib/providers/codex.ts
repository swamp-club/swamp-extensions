import { z } from "npm:zod@4.3.6";
import type { AgentProvider, AgentRunRequest, Platform } from "../types.ts";

const NPM_REGISTRY = "https://registry.npmjs.org";

export const CodexConfigSchema = z.object({
  sandbox: z.enum(["read-only", "workspace-write", "danger-full-access"])
    .optional()
    .describe("Codex sandbox policy (defaults based on readOnly flag)"),
  approvalPolicy: z.enum(["untrusted", "on-request", "never"]).optional()
    .describe("Codex approval policy (defaults to 'never' for CI)"),
});

function npmPackageName(platform: Platform): string {
  return `@openai/codex-${platform}`;
}

function npmTarballUrl(platform: Platform, version: string): string {
  const pkg = npmPackageName(platform);
  const scope = pkg.split("/")[0].replace("@", "");
  const name = pkg.split("/")[1];
  return `${NPM_REGISTRY}/@${scope}/${name}/-/${name}-${version}.tgz`;
}

export const codexProvider: AgentProvider = {
  name: "codex",
  defaultApiKeyEnvVar: "CODEX_API_KEY",
  supportsCliAuth: false,
  configSchema: CodexConfigSchema,

  async ensureBinary(
    version: string,
    cacheDir: string,
    platform: Platform,
    signal?: AbortSignal,
  ): Promise<string> {
    const dir = `${cacheDir}/codex/${version}`;
    const binaryPath = `${dir}/codex`;

    try {
      await Deno.stat(binaryPath);
      return binaryPath;
    } catch {
      // Not cached — download
    }

    await Deno.mkdir(dir, { recursive: true });

    const tarballPath = `${dir}/codex.tgz.${crypto.randomUUID()}`;
    const extractDir = `${dir}/extract.${crypto.randomUUID()}`;
    const url = npmTarballUrl(platform, version);

    try {
      const resp = await fetch(url, { signal });
      if (!resp.ok) {
        await resp.body?.cancel();
        throw new Error(
          `Failed to download Codex CLI ${version} for ${platform}: ` +
            `${resp.status} ${resp.statusText}`,
        );
      }

      const data = new Uint8Array(await resp.arrayBuffer());
      await Deno.writeFile(tarballPath, data);

      await Deno.mkdir(extractDir, { recursive: true });

      const tar = new Deno.Command("tar", {
        args: ["xzf", tarballPath, "-C", extractDir],
        stdout: "piped",
        stderr: "piped",
      });
      const tarResult = await tar.output();
      if (!tarResult.success) {
        const stderr = new TextDecoder().decode(tarResult.stderr);
        throw new Error(`Failed to extract Codex tarball: ${stderr}`);
      }

      const found = await findBinary(extractDir, "codex");
      if (!found) {
        throw new Error(
          `Could not find 'codex' binary in extracted tarball at ${extractDir}`,
        );
      }

      // Atomic write: copy to temp path then rename into place
      const tmpBinary = `${dir}/codex.download.${crypto.randomUUID()}`;
      await Deno.copyFile(found, tmpBinary);
      await Deno.chmod(tmpBinary, 0o755);
      await Deno.rename(tmpBinary, binaryPath);
    } finally {
      try {
        await Deno.remove(tarballPath);
      } catch { /* best-effort */ }
      try {
        await Deno.remove(extractDir, { recursive: true });
      } catch { /* best-effort */ }
    }

    return binaryPath;
  },

  buildArgs(
    request: AgentRunRequest,
    providerConfig: Record<string, unknown>,
  ): string[] {
    const config = CodexConfigSchema.parse(providerConfig);

    const sandbox = config.sandbox ??
      (request.readOnly ? "read-only" : "workspace-write");
    const approval = config.approvalPolicy ?? "never";

    const args = [
      "exec",
      "--ephemeral",
      "--ignore-user-config",
      "--ignore-rules",
      "--skip-git-repo-check",
      "--sandbox",
      sandbox,
      "--ask-for-approval",
      approval,
    ];

    if (request.outputPath) {
      args.push("-o", request.outputPath);
    }

    if (request.model) {
      args.push("-m", request.model);
    }

    for (const dir of request.additionalDirs) {
      args.push("--add-dir", dir);
    }

    args.push(request.prompt);

    return args;
  },

  apiKeyEnvName(_providerConfig: Record<string, unknown>): string {
    return "CODEX_API_KEY";
  },

  outputInstructions(_outputPath: string): string {
    return [
      "Output your result as JSON as your final message.",
      "The JSON will be captured automatically.",
    ].join("\n");
  },
};

async function findBinary(
  dir: string,
  name: string,
): Promise<string | null> {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory) {
      const found = await findBinary(path, name);
      if (found) return found;
    } else if (entry.name === name) {
      return path;
    }
  }
  return null;
}
