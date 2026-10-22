import { z } from "npm:zod@4.3.6";
import { UntarStream } from "jsr:@std/tar@0.1.10/untar-stream";
import type { AgentProvider, AgentRunRequest, Platform } from "../types.ts";
import { binaryFileName, isWindows } from "../platform.ts";

const NPM_REGISTRY = "https://registry.npmjs.org";

const CODEX_API_KEY_ENV = "CODEX_API_KEY";

// Codex's built-in provider ids. Codex keeps its own entry when a configured
// provider reuses one, so a gateway under such an id would be silently
// replaced by the built-in provider (and its credentials sent there).
const RESERVED_PROVIDER_IDS = ["openai", "oss", "ollama", "lmstudio"];

// A lone UTF-16 surrogate has no TOML encoding.
function tomlSafe<T extends z.ZodType<string>>(schema: T) {
  return schema.refine((s) => s.isWellFormed(), {
    message: "must not contain unpaired UTF-16 surrogates",
  });
}

export const CodexModelProviderSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]+$/)
    .refine((id) => !RESERVED_PROVIDER_IDS.includes(id), {
      message: `must not be a built-in codex provider id (${
        RESERVED_PROVIDER_IDS.join(", ")
      })`,
    })
    .describe(
      "Provider id, used as the model_providers key " +
        "(letters, digits, '_' and '-'; not a built-in codex provider id)",
    ),
  name: tomlSafe(z.string().min(1)).optional()
    .describe("Display name of the provider (defaults to id)"),
  baseUrl: tomlSafe(z.url({ protocol: /^https?$/ }))
    .describe("Base URL of the OpenAI-compatible API (http or https)"),
  wireApi: z.enum(["responses", "chat"]).optional()
    .describe("Wire protocol the provider speaks (the CLI's default if unset)"),
  authCommand: tomlSafe(z.string().min(1)).optional()
    .describe(
      "Command the CLI runs to get a bearer token for the provider. " +
        "Requires auth 'cli'",
    ),
  authArgs: z.array(tomlSafe(z.string())).optional()
    .describe("Arguments for authCommand"),
}).refine((p) => p.authArgs === undefined || p.authCommand !== undefined, {
  message: "authArgs requires authCommand",
  path: ["authArgs"],
});

export type CodexModelProvider = z.infer<typeof CodexModelProviderSchema>;

export const CodexConfigSchema = z.object({
  sandbox: z.enum(["read-only", "workspace-write", "danger-full-access"])
    .optional()
    .describe("Codex sandbox policy (defaults based on readOnly flag)"),
  approvalPolicy: z.enum(["untrusted", "on-request", "never"]).optional()
    .describe("Codex approval policy (defaults to 'never' for CI)"),
  modelProvider: CodexModelProviderSchema.optional()
    .describe(
      "Custom model provider (e.g. an OpenAI-compatible gateway), passed " +
        "to the CLI as -c overrides",
    ),
});

// The platform builds are published as versions of @openai/codex itself
// (e.g. 0.163.0-linux-x64), not as separate @openai/codex-<platform> packages.
function npmTarballUrl(platform: Platform, version: string): string {
  return `${NPM_REGISTRY}/@openai/codex/-/codex-${version}-${platform}.tgz`;
}

export const codexProvider: AgentProvider = {
  name: "codex",
  defaultApiKeyEnvVar: CODEX_API_KEY_ENV,
  supportsCliAuth: true,
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
      // --ask-for-approval is a top-level codex flag that `codex exec`
      // rejects, so the policy goes in as a config override.
      "-c",
      `approval_policy=${approval}`,
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

    if (config.modelProvider) {
      args.push(
        ...modelProviderArgs(config.modelProvider, request.auth ?? "apiKey"),
      );
    }

    for (const dir of request.additionalDirs) {
      args.push("--add-dir", dir);
    }

    args.push(request.prompt);

    return args;
  },

  apiKeyEnvName(_providerConfig: Record<string, unknown>): string {
    return CODEX_API_KEY_ENV;
  },

  outputInstructions(_outputPath: string): string {
    return [
      "Output your result as JSON as your final message.",
      "The JSON will be captured automatically.",
    ].join("\n");
  },
};

/**
 * Builds the -c overrides that select a custom model provider. The provider
 * authenticates with authCommand (auth 'cli'), with the injected
 * CODEX_API_KEY via env_key (auth 'apiKey'), or not at all (auth 'cli'
 * without authCommand).
 */
function modelProviderArgs(
  provider: CodexModelProvider,
  auth: "apiKey" | "cli",
): string[] {
  if (provider.authCommand !== undefined && auth !== "cli") {
    throw new Error(
      `modelProvider.authCommand supplies the credentials for provider ` +
        `'${provider.id}', so set auth to 'cli'. Under auth 'apiKey' the ` +
        `injected ${CODEX_API_KEY_ENV} would go unused.`,
    );
  }

  const key = `model_providers.${provider.id}`;
  const overrides = [
    `model_provider=${tomlString(provider.id)}`,
    `${key}.name=${tomlString(provider.name ?? provider.id)}`,
    `${key}.base_url=${tomlString(provider.baseUrl)}`,
  ];
  if (provider.wireApi) {
    overrides.push(`${key}.wire_api=${tomlString(provider.wireApi)}`);
  }
  if (provider.authCommand !== undefined) {
    overrides.push(`${key}.auth.command=${tomlString(provider.authCommand)}`);
    if (provider.authArgs) {
      overrides.push(
        `${key}.auth.args=[${provider.authArgs.map(tomlString).join(", ")}]`,
      );
    }
  } else if (auth === "apiKey") {
    // A custom provider only sends the key held in the variable env_key names.
    overrides.push(`${key}.env_key=${tomlString(CODEX_API_KEY_ENV)}`);
  }

  return overrides.flatMap((override) => ["-c", override]);
}

/**
 * Encodes a TOML basic string. A JSON string literal is one, except that TOML
 * also forbids a raw DEL character.
 */
export function tomlString(value: string): string {
  return JSON.stringify(value).replaceAll("\x7f", "\\u007F");
}

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
