// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Argv assembly + process spawning for container image operations.
 *
 * Runtime matrix:
 *   docker   → docker build, docker run, docker login, docker buildx build
 *   podman   → podman build, podman run, podman login, podman build --platform
 *              + podman manifest push
 *   container → container build, container run (Apple Containers, macOS only)
 *               login supported via 'registry login'; multi-platform-build
 *               via repeated --platform + container image push per tag.
 *
 * Every spawn goes through `Deno.Command(bin, { args })` — never `sh -c`.
 * Option values are guarded against newlines/NUL at schema time.
 *
 * @module
 */

import type {
  Binary,
  BuildArgs,
  BuildxBuildArgs,
  ExportFormat,
  LoginArgs,
  PushArgs,
  RunArgs,
} from "./schemas.ts";

// ---------------------------------------------------------------------------
// Command executor seam (same pattern as @swamp/ssh)
// ---------------------------------------------------------------------------

export interface ExecRequest {
  bin: string;
  args: string[];
  stdin?: string;
  signal?: AbortSignal;
}

export interface ExecResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export type CommandExecutor = (req: ExecRequest) => Promise<ExecResult>;

let currentExecutor: CommandExecutor | null = null;

export function setCommandExecutor(executor: CommandExecutor): void {
  currentExecutor = executor;
}

export function resetCommandExecutor(): void {
  currentExecutor = null;
}

async function exec(req: ExecRequest): Promise<ExecResult> {
  if (currentExecutor) return currentExecutor(req);

  const cmd = new Deno.Command(req.bin, {
    args: req.args,
    stdin: req.stdin !== undefined ? "piped" : "null",
    stdout: "piped",
    stderr: "piped",
    signal: req.signal,
  });

  const child = cmd.spawn();

  if (req.stdin !== undefined) {
    const writer = child.stdin.getWriter();
    await writer.write(new TextEncoder().encode(req.stdin));
    await writer.close();
  }

  const output = await child.output();
  const decoder = new TextDecoder();

  return {
    exitCode: output.code,
    stdout: decoder.decode(output.stdout),
    stderr: decoder.decode(output.stderr),
  };
}

// ---------------------------------------------------------------------------
// Argv builders
// ---------------------------------------------------------------------------

function buildArgFlags(buildArgs?: Record<string, string>): string[] {
  if (!buildArgs) return [];
  return Object.entries(buildArgs).flatMap((
    [k, v],
  ) => ["--build-arg", `${k}=${v}`]);
}

function labelFlags(labels?: Record<string, string>): string[] {
  if (!labels) return [];
  return Object.entries(labels).flatMap(([k, v]) => ["--label", `${k}=${v}`]);
}

function annotationFlags(annotations?: Record<string, string>): string[] {
  if (!annotations) return [];
  return Object.entries(annotations).flatMap((
    [k, v],
  ) => ["--annotation", `${k}=${v}`]);
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

export function buildBuildArgv(binary: Binary, args: BuildArgs): string[] {
  const argv: string[] = [binary, "build"];
  if (args.tag) argv.push("-t", args.tag);
  if (args.dockerfile) argv.push("-f", args.dockerfile);
  if (args.target) argv.push("--target", args.target);
  if (args.noCache) argv.push("--no-cache");
  if (args.pull) argv.push("--pull");
  if (args.platform) argv.push("--platform", args.platform);
  argv.push(...buildArgFlags(args.buildArgs));
  argv.push(...labelFlags(args.labels));
  argv.push(args.context);
  return argv;
}

export function runBuildCommand(
  binary: Binary,
  args: BuildArgs,
  signal?: AbortSignal,
): Promise<ExecResult> {
  const argv = buildBuildArgv(binary, args);
  const [bin, ...rest] = argv;
  return exec({ bin, args: rest, signal });
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

export function buildRunArgv(binary: Binary, args: RunArgs): string[] {
  const argv: string[] = [binary, "run", "--rm"];
  if (args.privileged) argv.push("--privileged");
  if (args.entrypoint) argv.push("--entrypoint", args.entrypoint);
  if (args.network) argv.push("--network", args.network);
  if (args.env) {
    for (const [k, v] of Object.entries(args.env)) {
      argv.push("-e", `${k}=${v}`);
    }
  }
  if (args.volumes) {
    for (const vol of args.volumes) {
      argv.push("-v", vol);
    }
  }
  if (args.ports) {
    for (const port of args.ports) {
      argv.push("-p", port);
    }
  }
  if (args.extraArgs) argv.push(...args.extraArgs);
  argv.push(args.image);
  if (args.command) argv.push(...args.command);
  return argv;
}

export function runRunCommand(
  binary: Binary,
  args: RunArgs,
  signal?: AbortSignal,
): Promise<ExecResult> {
  const argv = buildRunArgv(binary, args);
  const [bin, ...rest] = argv;
  return exec({ bin, args: rest, signal });
}

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

export function buildLoginArgv(
  binary: Binary,
  args: LoginArgs,
): string[] {
  // Apple Containers uses 'container registry login', not 'container login'
  const argv: string[] = binary === "container"
    ? [binary, "registry", "login", "--password-stdin"]
    : [binary, "login", "--password-stdin"];
  if (!args.tlsVerify) {
    if (binary === "podman") argv.push("--tls-verify=false");
    if (binary === "container") argv.push("--scheme", "http");
  }
  if (args.username) argv.push("-u", args.username);
  if (args.server) argv.push(args.server);
  return argv;
}

export function runLoginCommand(
  binary: Binary,
  args: LoginArgs,
  signal?: AbortSignal,
): Promise<ExecResult> {
  const argv = buildLoginArgv(binary, args);
  const [bin, ...rest] = argv;
  return exec({ bin, args: rest, stdin: args.password, signal });
}

// ---------------------------------------------------------------------------
// Buildx build
// ---------------------------------------------------------------------------

export function buildBuildxArgv(
  binary: Binary,
  args: BuildxBuildArgs,
  metadataFile?: string,
): string[] {
  const platformStr = args.platforms.join(",");

  if (binary === "podman") {
    // Podman multi-platform: use --manifest (not -t) to build into a
    // manifest list. -t and --manifest conflict because -t creates a
    // regular image that --manifest then can't treat as a manifest list.
    const argv: string[] = ["podman", "build", "--platform", platformStr];
    argv.push("--manifest", args.tags[0]);
    if (args.dockerfile) argv.push("-f", args.dockerfile);
    if (args.pull) argv.push("--pull");
    argv.push(...buildArgFlags(args.buildArgs));
    argv.push(...labelFlags(args.labels));
    argv.push(...annotationFlags(args.annotations));
    if (args.cacheFrom) {
      for (const cf of args.cacheFrom) argv.push("--cache-from", cf);
    }
    if (args.cacheTo) {
      for (const ct of args.cacheTo) argv.push("--cache-to", ct);
    }
    argv.push(args.context);
    return argv;
  }

  if (binary === "container") {
    // Apple Containers: one --platform per target builds a single image
    // index. Pushing is a separate 'container image push' per tag.
    const argv: string[] = ["container", "build"];
    for (const platform of args.platforms) argv.push("--platform", platform);
    for (const tag of args.tags) argv.push("-t", tag);
    if (args.dockerfile) argv.push("-f", args.dockerfile);
    if (args.pull) argv.push("--pull");
    argv.push(...buildArgFlags(args.buildArgs));
    argv.push(...labelFlags(args.labels));
    argv.push(args.context);
    return argv;
  }

  // docker (and any future runtime that uses buildx)
  const argv: string[] = [binary, "buildx", "build", "--platform", platformStr];
  for (const tag of args.tags) argv.push("-t", tag);
  if (args.dockerfile) argv.push("-f", args.dockerfile);
  if (args.push) argv.push("--push");
  if (args.pull) argv.push("--pull");
  argv.push(...buildArgFlags(args.buildArgs));
  argv.push(...labelFlags(args.labels));
  argv.push(...annotationFlags(args.annotations));
  if (args.cacheFrom) {
    for (const cf of args.cacheFrom) argv.push("--cache-from", cf);
  }
  if (args.cacheTo) {
    for (const ct of args.cacheTo) argv.push("--cache-to", ct);
  }
  if (metadataFile) argv.push("--metadata-file", metadataFile);
  argv.push(args.context);
  return argv;
}

/**
 * Read `containerimage.digest` from a buildx `--metadata-file`. Returns
 * undefined when the file is missing, empty, not JSON, or has no digest.
 */
export async function readMetadataDigest(
  path: string,
): Promise<string | undefined> {
  try {
    const parsed: unknown = JSON.parse(await Deno.readTextFile(path));
    if (typeof parsed !== "object" || parsed === null) return undefined;
    const digest = (parsed as Record<string, unknown>)["containerimage.digest"];
    return typeof digest === "string" ? parseDigest(digest) : undefined;
  } catch {
    return undefined;
  }
}

export function buildPodmanManifestPushArgv(tag: string): string[] {
  return ["podman", "manifest", "push", tag];
}

export async function runBuildxCommand(
  binary: Binary,
  args: BuildxBuildArgs,
  signal?: AbortSignal,
): Promise<ExecResult & { digest?: string }> {
  // Podman's --manifest flag fails if the tag already exists as a regular
  // image (not a manifest list). Remove any stale image or manifest first.
  if (binary === "podman") {
    await exec({
      bin: "podman",
      args: ["rmi", "--force", args.tags[0]],
      signal,
    }).catch(() => {});
    await exec({
      bin: "podman",
      args: ["manifest", "rm", args.tags[0]],
      signal,
    }).catch(() => {});
  }

  // buildx writes the pushed index digest to --metadata-file, which is
  // more reliable than the first sha256 in the build output. Without a
  // writable temp dir, fall through to the output parse below.
  const metadataFile = binary === "docker"
    ? await Deno.makeTempFile({ prefix: "buildx-metadata-", suffix: ".json" })
      .catch(() => undefined)
    : undefined;
  if (metadataFile) {
    try {
      const [bin, ...rest] = buildBuildxArgv(binary, args, metadataFile);
      const result = await exec({ bin, args: rest, signal });
      if (result.exitCode !== 0) return result;
      const digest = await readMetadataDigest(metadataFile) ??
        parseDigest(result.stdout + result.stderr);
      return { ...result, digest };
    } finally {
      await Deno.remove(metadataFile).catch(() => {});
    }
  }

  const argv = buildBuildxArgv(binary, args);
  const [bin, ...rest] = argv;
  const result = await exec({ bin, args: rest, signal });

  if (result.exitCode !== 0) return result;

  if (binary === "podman" && args.push) {
    const pushArgv = buildPodmanManifestPushArgv(args.tags[0]);
    const [pushBin, ...pushRest] = pushArgv;
    const pushResult = await exec({ bin: pushBin, args: pushRest, signal });
    if (pushResult.exitCode !== 0) {
      return {
        exitCode: pushResult.exitCode,
        stdout: result.stdout + pushResult.stdout,
        stderr: result.stderr + pushResult.stderr,
      };
    }
    const digest = parseDigest(pushResult.stdout + pushResult.stderr);
    return {
      ...result,
      stdout: result.stdout + pushResult.stdout,
      stderr: result.stderr + pushResult.stderr,
      digest,
    };
  }

  if (binary === "container" && args.push) {
    // Every tag names the same index, so the first push's digest is the
    // index digest.
    let stdout = result.stdout;
    let stderr = result.stderr;
    let digest: string | undefined;
    for (const tag of args.tags) {
      const [pushBin, ...pushRest] = buildPushArgv(binary, {
        image: tag,
        tlsVerify: true,
      });
      const pushResult = await exec({ bin: pushBin, args: pushRest, signal });
      stdout += pushResult.stdout;
      stderr += pushResult.stderr;
      if (pushResult.exitCode !== 0) {
        return { exitCode: pushResult.exitCode, stdout, stderr };
      }
      digest ??= parseDigest(pushResult.stdout + pushResult.stderr);
    }
    return { ...result, stdout, stderr, digest };
  }

  const digest = parseDigest(result.stdout + result.stderr);
  return { ...result, digest };
}

// ---------------------------------------------------------------------------
// Push
// ---------------------------------------------------------------------------

export function buildPushArgv(binary: Binary, args: PushArgs): string[] {
  // Apple Containers: 'container image push <ref>'
  // Docker/Podman: '<binary> push <ref>'
  if (binary === "container") {
    const argv = [binary, "image", "push"];
    if (!args.tlsVerify) argv.push("--scheme", "http");
    argv.push(args.image);
    return argv;
  }
  const argv = [binary, "push"];
  if (binary === "podman" && !args.tlsVerify) argv.push("--tls-verify=false");
  argv.push(args.image);
  return argv;
}

export function runPushCommand(
  binary: Binary,
  args: PushArgs,
  signal?: AbortSignal,
): Promise<ExecResult> {
  const argv = buildPushArgv(binary, args);
  const [bin, ...rest] = argv;
  return exec({ bin, args: rest, signal });
}

// ---------------------------------------------------------------------------
// Export (save built image as archive)
// ---------------------------------------------------------------------------

export function buildExportArgv(
  binary: Binary,
  tag: string,
  format: ExportFormat,
  dest: string,
  platform?: string,
): string[] {
  if (binary === "docker") {
    if (format === "oci") {
      // docker save only produces docker-archive; for OCI we re-export
      // via buildx with a trivial FROM that references the already-built
      // image — no actual rebuild, just a format conversion. A non-host
      // image needs --platform, or the FROM resolves the host platform
      // and fails with "no match for platform in manifest".
      const argv = ["docker", "buildx", "build"];
      if (platform) argv.push("--platform", platform);
      argv.push("--output", `type=oci,dest=${dest}`, "-");
      return argv;
    }
    return ["docker", "save", "-o", dest, tag];
  }
  if (binary === "podman") {
    const podmanFormat = format === "oci" ? "oci-archive" : "docker-archive";
    return ["podman", "save", "--format", podmanFormat, "-o", dest, tag];
  }
  // Apple Containers — OCI only
  return ["container", "image", "save", "-o", dest, tag];
}

export function runExportCommand(
  binary: Binary,
  tag: string,
  format: ExportFormat,
  dest: string,
  signal?: AbortSignal,
  platform?: string,
): Promise<ExecResult> {
  if (binary === "container" && format === "docker") {
    return Promise.resolve({
      exitCode: 1,
      stdout: "",
      stderr: "Apple Containers only supports OCI export format. " +
        "Set exportFormat to 'oci' or use Docker/Podman for Docker-format export.",
    });
  }
  const argv = buildExportArgv(binary, tag, format, dest, platform);
  const [bin, ...rest] = argv;
  // Docker OCI: pipe "FROM <tag>" as stdin Dockerfile via "-"
  const stdin = binary === "docker" && format === "oci"
    ? `FROM ${tag}\n`
    : undefined;
  return exec({ bin, args: rest, stdin, signal });
}

// ---------------------------------------------------------------------------
// Digest parser
// ---------------------------------------------------------------------------

const DIGEST_RE = /sha256:[a-f0-9]{64}/;

export function parseDigest(output: string): string | undefined {
  const match = output.match(DIGEST_RE);
  return match ? match[0] : undefined;
}
