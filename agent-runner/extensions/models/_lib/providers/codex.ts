import { z } from "npm:zod@4.3.6";
import { UntarStream } from "jsr:@std/tar@0.1.10/untar-stream";
import type { AgentProvider, AgentRunRequest, Platform } from "../types.ts";
import { binaryFileName, isWindows } from "../platform.ts";

const NPM_REGISTRY = "https://registry.npmjs.org";

export const CodexConfigSchema = z.object({
  sandbox: z.enum(["read-only", "workspace-write", "danger-full-access"])
    .optional()
    .describe("Codex sandbox policy (defaults based on readOnly flag)"),
  approvalPolicy: z.enum(["untrusted", "on-request", "never"]).optional()
    .describe("Codex approval policy (defaults to 'never' for CI)"),
});

// The platform builds are published as versions of @openai/codex itself
// (e.g. 0.163.0-linux-x64), not as separate @openai/codex-<platform> packages.
function npmTarballUrl(platform: Platform, version: string): string {
  return `${NPM_REGISTRY}/@openai/codex/-/codex-${version}-${platform}.tgz`;
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
    // The whole vendor/<triple> tree is kept: next to the binary it carries
    // the sandbox helpers (bwrap on Linux, the Windows sandbox executables)
    // and rg.
    const vendorDir = `${dir}/vendor`;
    const name = binaryFileName("codex", platform);

    const cached = await findCachedBinary(vendorDir, name);
    if (cached) {
      return cached;
    }

    await Deno.mkdir(dir, { recursive: true });

    const extractDir = `${dir}/extract.${crypto.randomUUID()}`;
    const url = npmTarballUrl(platform, version);

    try {
      const resp = await fetch(url, { signal });
      if (!resp.ok || !resp.body) {
        await resp.body?.cancel();
        throw new Error(
          `Failed to download Codex CLI ${version} for ${platform}: ` +
            `${resp.status} ${resp.statusText}`,
        );
      }

      await Deno.mkdir(extractDir, { recursive: true });
      await extractTarball(resp.body, extractDir, platform);

      const tripleDir = await findVendorTriple(`${extractDir}/package/vendor`);
      if (!tripleDir || !(await findBinary(tripleDir, name))) {
        throw new Error(
          `Could not find '${name}' binary in extracted tarball at ${extractDir}`,
        );
      }

      // A vendor/ left without a binary (an interrupted manual edit) would
      // make the rename below fail on every run. One with a binary was just
      // installed by a concurrent call and is left alone.
      if (!(await findCachedBinary(vendorDir, name))) {
        try {
          await Deno.remove(vendorDir, { recursive: true });
        } catch { /* nothing to clear */ }
      }

      // Atomic install: rename the extracted tree into place. A concurrent
      // ensureBinary call may have won the race; its tree is just as good.
      try {
        await Deno.rename(tripleDir, vendorDir);
      } catch (error) {
        if (!(await findCachedBinary(vendorDir, name))) {
          throw new Error(
            `Failed to move Codex CLI from ${tripleDir} to ${vendorDir}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }
    } finally {
      try {
        await Deno.remove(extractDir, { recursive: true });
      } catch { /* best-effort */ }
    }

    const installed = await findCachedBinary(vendorDir, name);
    if (!installed) {
      throw new Error(`Codex CLI binary missing from ${vendorDir}`);
    }
    return installed;
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

    if (request.effort) {
      args.push("-c", `model_reasoning_effort=${request.effort}`);
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

async function findCachedBinary(
  vendorDir: string,
  name: string,
): Promise<string | null> {
  try {
    return await findBinary(vendorDir, name);
  } catch {
    return null;
  }
}

async function findVendorTriple(vendorRoot: string): Promise<string | null> {
  try {
    for await (const entry of Deno.readDir(vendorRoot)) {
      if (entry.isDirectory) {
        return `${vendorRoot}/${entry.name}`;
      }
    }
  } catch {
    // no vendor directory in the tarball
  }
  return null;
}

// Unpacks a .tgz in process, so no tar binary is needed (a stock Windows
// host may only have Git Bash's GNU tar, which reads C:\ paths as remote
// hosts). On Unix each file keeps its mode from the archive, so every
// bundled executable stays runnable.
export async function extractTarball(
  body: ReadableStream<Uint8Array<ArrayBuffer>>,
  destDir: string,
  platform: Platform,
): Promise<void> {
  const entries = body
    .pipeThrough(new DecompressionStream("gzip"))
    .pipeThrough(new UntarStream());

  for await (const entry of entries) {
    const segments = entry.path.split("/").filter((s) => s.length > 0);
    if (
      entry.path.startsWith("/") || segments.length === 0 ||
      // ":" would name an NTFS alternate data stream on Windows.
      segments.some((s) => s === ".." || s.includes("\\") || s.includes(":"))
    ) {
      await entry.readable?.cancel();
      throw new Error(`Refusing unsafe path in Codex tarball: ${entry.path}`);
    }
    if (!entry.readable) {
      // Directories, links and other non-file entries carry no data.
      continue;
    }

    const target = `${destDir}/${segments.join("/")}`;
    await Deno.mkdir(target.slice(0, target.lastIndexOf("/")), {
      recursive: true,
    });
    const file = await Deno.create(target);
    await entry.readable.pipeTo(file.writable);
    if (!isWindows(platform)) {
      await Deno.chmod(target, entry.header.mode & 0o777);
    }
  }
}
