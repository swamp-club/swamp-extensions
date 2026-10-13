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
 * Zod schemas + inferred types for `@swamp/container-image`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";

// ---------------------------------------------------------------------------
// Primitive guards
// ---------------------------------------------------------------------------

/**
 * Refuse strings carrying newlines or NUL bytes in option-value positions.
 * Prevents injection of extra CLI flags through user-controlled values.
 */
function safeOptionValue(label: string): z.ZodString {
  return z.string().refine(
    // deno-lint-ignore no-control-regex
    (s) => !/[\x00\r\n]/.test(s),
    { message: `${label} must not contain newlines or NUL bytes` },
  );
}

// deno-lint-ignore no-control-regex
const UNSAFE_KV_RE = /[\x00\r\n]/;

function safeRecord(label: string) {
  return z.record(
    z.string().refine(
      (s) => !UNSAFE_KV_RE.test(s),
      { message: `${label} key must not contain newlines or NUL bytes` },
    ),
    z.string().refine(
      (s) => !UNSAFE_KV_RE.test(s),
      { message: `${label} value must not contain newlines or NUL bytes` },
    ),
  );
}

// ---------------------------------------------------------------------------
// Container runtime binary
// ---------------------------------------------------------------------------

export const BinaryEnum = z.enum(["docker", "podman", "container"]);
export type Binary = z.infer<typeof BinaryEnum>;

// ---------------------------------------------------------------------------
// Output type
// ---------------------------------------------------------------------------

export const ExportFormatEnum = z.enum(["oci", "docker"]);
export type ExportFormat = z.infer<typeof ExportFormatEnum>;

// ---------------------------------------------------------------------------
// Global arguments
// ---------------------------------------------------------------------------

export const GlobalArgsSchema = z.object({
  name: z.string().min(1).describe("Model instance name."),
  binary: BinaryEnum.default("docker").describe(
    "Container runtime binary: 'docker', 'podman', or 'container' " +
      "(Apple Containers, macOS only). Defaults to 'docker'.",
  ),
});

export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

// ---------------------------------------------------------------------------
// Method argument schemas
// ---------------------------------------------------------------------------

export const BuildArgsSchema = z.object({
  context: safeOptionValue("context").default(".").describe(
    "Build context path.",
  ),
  dockerfile: safeOptionValue("dockerfile").optional().describe(
    "Path to Dockerfile (relative to context).",
  ),
  tag: safeOptionValue("tag").optional().describe(
    "Image tag (e.g. 'myapp:latest').",
  ),
  target: safeOptionValue("target").optional().describe(
    "Multi-stage build target.",
  ),
  buildArgs: safeRecord("buildArgs").optional().describe(
    "Build arguments (--build-arg KEY=VALUE).",
  ),
  labels: safeRecord("labels").optional().describe(
    "Image labels (--label KEY=VALUE).",
  ),
  noCache: z.boolean().default(false).describe(
    "Disable build cache.",
  ),
  exportFormat: ExportFormatEnum.optional().describe(
    "Export the built image as a tar archive in the given format: " +
      "'oci' (OCI archive) or 'docker' (Docker archive). Requires 'tag'. " +
      "Apple Containers only supports 'oci'.",
  ),
  exportPath: z.string().refine(
    // deno-lint-ignore no-control-regex
    (s) => !/[\x00\r\n,]/.test(s),
    {
      message: "exportPath must not contain newlines, NUL bytes, or commas " +
        "(commas are parsed as key=value delimiters by Docker's --output flag)",
    },
  ).optional().describe(
    "Destination path for the exported archive. Required when " +
      "'exportFormat' is set. E.g. './myapp-oci.tar'.",
  ),
});

export type BuildArgs = z.infer<typeof BuildArgsSchema>;

export const RunArgsSchema = z.object({
  image: safeOptionValue("image").describe("Image to run."),
  command: z.array(z.string()).optional().describe(
    "Command and arguments to execute in the container.",
  ),
  env: safeRecord("env").optional().describe(
    "Environment variables (-e KEY=VALUE).",
  ),
  volumes: z.array(safeOptionValue("volume")).optional().describe(
    "Volume mounts (-v host:container).",
  ),
  ports: z.array(safeOptionValue("port")).optional().describe(
    "Port mappings (-p host:container).",
  ),
  network: safeOptionValue("network").optional().describe(
    "Network to connect the container to (--network).",
  ),
  entrypoint: safeOptionValue("entrypoint").optional().describe(
    "Override the container entrypoint (--entrypoint).",
  ),
  privileged: z.boolean().optional().describe(
    "Run the container in privileged mode (--privileged). " +
      "Required for operations like losetup/mount inside the container.",
  ),
  extraArgs: z.array(safeOptionValue("extraArgs")).optional().describe(
    "Additional docker/podman/container run flags passed before the " +
      "image argument. Each element is a single flag or flag=value " +
      "(e.g. ['--cap-add', 'SYS_ADMIN', '--device', '/dev/loop0']).",
  ),
});

export type RunArgs = z.infer<typeof RunArgsSchema>;

export const LoginArgsSchema = z.object({
  server: safeOptionValue("server").optional().describe(
    "Registry server (default: Docker Hub).",
  ),
  username: safeOptionValue("username").describe("Registry username."),
  password: z.string().min(1).meta({ sensitive: true }).describe(
    "Registry password — supply via ${{ vault.get('<vault>', '<key>') }}. " +
      "Piped to --password-stdin; never appears in argv or persisted resources.",
  ),
  tlsVerify: z.boolean().default(true).describe(
    "Verify TLS certificates. Set to false for insecure (HTTP) registries.",
  ),
});

export type LoginArgs = z.infer<typeof LoginArgsSchema>;

export const BuildxBuildArgsSchema = z.object({
  context: safeOptionValue("context").default(".").describe(
    "Build context path.",
  ),
  dockerfile: safeOptionValue("dockerfile").optional().describe(
    "Path to Dockerfile (relative to context).",
  ),
  platforms: z.array(safeOptionValue("platform")).min(1).describe(
    "Target platforms (e.g. ['linux/amd64', 'linux/arm64']).",
  ),
  tags: z.array(safeOptionValue("tag")).min(1).describe(
    "Image tags (e.g. ['registry.example.com/app:latest']).",
  ),
  push: z.boolean().default(true).describe(
    "Push the image after building.",
  ),
  buildArgs: safeRecord("buildArgs").optional().describe(
    "Build arguments (--build-arg KEY=VALUE).",
  ),
  labels: safeRecord("labels").optional().describe(
    "Image labels (--label KEY=VALUE).",
  ),
  cacheFrom: z.array(safeOptionValue("cacheFrom")).optional().describe(
    "Cache sources (--cache-from).",
  ),
  cacheTo: z.array(safeOptionValue("cacheTo")).optional().describe(
    "Cache destinations (--cache-to).",
  ),
});

export type BuildxBuildArgs = z.infer<typeof BuildxBuildArgsSchema>;

export const ValidateArgsSchema = z.object({});

export type ValidateArgs = z.infer<typeof ValidateArgsSchema>;

export const PushArgsSchema = z.object({
  image: safeOptionValue("image").describe(
    "Image reference to push (e.g. 'registry.example.com/app:latest').",
  ),
  tlsVerify: z.boolean().default(true).describe(
    "Verify TLS certificates. Set to false for insecure (HTTP) registries.",
  ),
});

export type PushArgs = z.infer<typeof PushArgsSchema>;

// ---------------------------------------------------------------------------
// Resource schemas
// ---------------------------------------------------------------------------

export const BuildResultSchema = z.object({
  tag: z.string().optional(),
  context: z.string(),
  dockerfile: z.string().optional(),
  exitCode: z.number().int(),
  stdout: z.string(),
  stderr: z.string(),
  binary: BinaryEnum,
  exportFormat: ExportFormatEnum.optional(),
  exportPath: z.string().optional(),
});

export type BuildResult = z.infer<typeof BuildResultSchema>;

export const RunResultSchema = z.object({
  image: z.string(),
  command: z.array(z.string()).optional(),
  exitCode: z.number().int(),
  stdout: z.string(),
  stderr: z.string(),
  binary: BinaryEnum,
});

export type RunResult = z.infer<typeof RunResultSchema>;

export const LoginResultSchema = z.object({
  server: z.string().optional(),
  username: z.string(),
  exitCode: z.number().int(),
  stderr: z.string(),
  binary: BinaryEnum,
});

export type LoginResult = z.infer<typeof LoginResultSchema>;

export const BuildxResultSchema = z.object({
  platforms: z.array(z.string()),
  tags: z.array(z.string()),
  push: z.boolean(),
  digest: z.string().optional(),
  exitCode: z.number().int(),
  stdout: z.string(),
  stderr: z.string(),
  binary: BinaryEnum,
});

export type BuildxResult = z.infer<typeof BuildxResultSchema>;

export const PushResultSchema = z.object({
  image: z.string(),
  digest: z.string().optional(),
  exitCode: z.number().int(),
  stdout: z.string(),
  stderr: z.string(),
  binary: BinaryEnum,
});

export type PushResult = z.infer<typeof PushResultSchema>;

export const ValidateResultSchema = z.object({
  binary: BinaryEnum,
  runtimeFound: z.boolean(),
  runtimeVersion: z.string().optional(),
  daemonReachable: z.boolean(),
  daemonError: z.string().optional(),
  buildxAvailable: z.boolean(),
  buildxError: z.string().optional(),
  methods: z.object({
    build: z.boolean(),
    run: z.boolean(),
    login: z.boolean(),
    push: z.boolean(),
    "multi-platform-build": z.boolean(),
  }),
});

export type ValidateResult = z.infer<typeof ValidateResultSchema>;
