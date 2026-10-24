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

import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import {
  buildBuildArgv,
  buildBuildxArgv,
  buildExportArgv,
  buildLoginArgv,
  buildPodmanManifestPushArgv,
  buildPushArgv,
  buildRunArgv,
  type ExecRequest,
  parseDigest,
  readMetadataDigest,
  resetCommandExecutor,
  runBuildxCommand,
  setCommandExecutor,
} from "./runner.ts";

// ---------------------------------------------------------------------------
// Build argv
// ---------------------------------------------------------------------------

Deno.test("buildBuildArgv - docker minimal", () => {
  const argv = buildBuildArgv("docker", { context: ".", noCache: false });
  assertEquals(argv, ["docker", "build", "."]);
});

Deno.test("buildBuildArgv - docker full", () => {
  const argv = buildBuildArgv("docker", {
    context: "./app",
    tag: "myapp:latest",
    dockerfile: "Dockerfile.prod",
    target: "release",
    noCache: true,
    buildArgs: { NODE_ENV: "production" },
    labels: { version: "1.0" },
  });
  assertEquals(argv, [
    "docker",
    "build",
    "-t",
    "myapp:latest",
    "-f",
    "Dockerfile.prod",
    "--target",
    "release",
    "--no-cache",
    "--build-arg",
    "NODE_ENV=production",
    "--label",
    "version=1.0",
    "./app",
  ]);
});

Deno.test("buildBuildArgv - podman uses same subcommand", () => {
  const argv = buildBuildArgv("podman", { context: ".", noCache: false });
  assertEquals(argv, ["podman", "build", "."]);
});

Deno.test("buildBuildArgv - container (Apple) uses same subcommand", () => {
  const argv = buildBuildArgv("container", { context: ".", noCache: false });
  assertEquals(argv, ["container", "build", "."]);
});

for (const binary of ["docker", "podman", "container"] as const) {
  Deno.test(`buildBuildArgv - ${binary} passes --platform when set`, () => {
    const argv = buildBuildArgv(binary, {
      context: ".",
      tag: "app:amd64",
      noCache: false,
      platform: "linux/amd64",
    });
    assertEquals(argv, [
      binary,
      "build",
      "-t",
      "app:amd64",
      "--platform",
      "linux/amd64",
      ".",
    ]);
  });
}

// ---------------------------------------------------------------------------
// Run argv
// ---------------------------------------------------------------------------

Deno.test("buildRunArgv - docker minimal", () => {
  const argv = buildRunArgv("docker", { image: "alpine:latest" });
  assertEquals(argv, ["docker", "run", "--rm", "alpine:latest"]);
});

Deno.test("buildRunArgv - docker full", () => {
  const argv = buildRunArgv("docker", {
    image: "myapp:latest",
    command: ["echo", "hello"],
    entrypoint: "/bin/sh",
    network: "host",
    env: { FOO: "bar" },
    volumes: ["/data:/data"],
    ports: ["8080:80"],
  });
  assertEquals(argv, [
    "docker",
    "run",
    "--rm",
    "--entrypoint",
    "/bin/sh",
    "--network",
    "host",
    "-e",
    "FOO=bar",
    "-v",
    "/data:/data",
    "-p",
    "8080:80",
    "myapp:latest",
    "echo",
    "hello",
  ]);
});

Deno.test("buildRunArgv - podman uses same subcommand", () => {
  const argv = buildRunArgv("podman", { image: "alpine" });
  assertEquals(argv, ["podman", "run", "--rm", "alpine"]);
});

Deno.test("buildRunArgv - container (Apple) uses same subcommand", () => {
  const argv = buildRunArgv("container", { image: "alpine" });
  assertEquals(argv, ["container", "run", "--rm", "alpine"]);
});

Deno.test("buildRunArgv - privileged flag", () => {
  const argv = buildRunArgv("docker", {
    image: "alpine",
    privileged: true,
  });
  assertEquals(argv, ["docker", "run", "--rm", "--privileged", "alpine"]);
});

Deno.test("buildRunArgv - privileged false omits flag", () => {
  const argv = buildRunArgv("docker", {
    image: "alpine",
    privileged: false,
  });
  assertEquals(argv, ["docker", "run", "--rm", "alpine"]);
});

Deno.test("buildRunArgv - extraArgs before image", () => {
  const argv = buildRunArgv("docker", {
    image: "alpine",
    extraArgs: ["--cap-add", "SYS_ADMIN", "--device", "/dev/loop0"],
  });
  assertEquals(argv, [
    "docker",
    "run",
    "--rm",
    "--cap-add",
    "SYS_ADMIN",
    "--device",
    "/dev/loop0",
    "alpine",
  ]);
});

Deno.test("buildRunArgv - privileged and extraArgs together", () => {
  const argv = buildRunArgv("docker", {
    image: "builder:latest",
    privileged: true,
    extraArgs: ["--device", "/dev/loop0"],
    command: ["bash", "-c", "losetup /dev/loop0 disk.img"],
  });
  assertEquals(argv, [
    "docker",
    "run",
    "--rm",
    "--privileged",
    "--device",
    "/dev/loop0",
    "builder:latest",
    "bash",
    "-c",
    "losetup /dev/loop0 disk.img",
  ]);
});

Deno.test("buildRunArgv - extraArgs with podman", () => {
  const argv = buildRunArgv("podman", {
    image: "alpine",
    extraArgs: ["--security-opt", "label=disable"],
  });
  assertEquals(argv, [
    "podman",
    "run",
    "--rm",
    "--security-opt",
    "label=disable",
    "alpine",
  ]);
});

// ---------------------------------------------------------------------------
// Login argv
// ---------------------------------------------------------------------------

Deno.test("buildLoginArgv - docker with server", () => {
  const argv = buildLoginArgv("docker", {
    username: "user",
    password: "secret",
    server: "ghcr.io",
    tlsVerify: true,
  });
  assertEquals(argv, [
    "docker",
    "login",
    "--password-stdin",
    "-u",
    "user",
    "ghcr.io",
  ]);
});

Deno.test("buildLoginArgv - password never appears in argv", () => {
  const argv = buildLoginArgv("docker", {
    username: "user",
    password: "supersecret",
    tlsVerify: true,
  });
  for (const arg of argv) {
    assertEquals(arg.includes("supersecret"), false);
  }
});

Deno.test("buildLoginArgv - podman uses same subcommand", () => {
  const argv = buildLoginArgv("podman", {
    username: "user",
    password: "secret",
    tlsVerify: true,
  });
  assertEquals(argv[0], "podman");
  assertEquals(argv[1], "login");
  assertEquals(argv[2], "--password-stdin");
});

Deno.test("buildLoginArgv - podman tlsVerify=false", () => {
  const argv = buildLoginArgv("podman", {
    username: "user",
    password: "secret",
    server: "localhost:5050",
    tlsVerify: false,
  });
  assertEquals(argv.includes("--tls-verify=false"), true);
});

Deno.test("buildLoginArgv - Apple Containers uses 'registry login'", () => {
  const argv = buildLoginArgv("container", {
    username: "user",
    password: "secret",
    server: "ghcr.io",
    tlsVerify: true,
  });
  assertEquals(argv[0], "container");
  assertEquals(argv[1], "registry");
  assertEquals(argv[2], "login");
  assertEquals(argv[3], "--password-stdin");
  assertEquals(argv.includes("-u"), true);
  assertEquals(argv.includes("ghcr.io"), true);
});

Deno.test("buildLoginArgv - Apple Containers tlsVerify=false uses --scheme http", () => {
  const argv = buildLoginArgv("container", {
    username: "user",
    password: "secret",
    server: "localhost:5050",
    tlsVerify: false,
  });
  assertEquals(argv.includes("--scheme"), true);
  assertEquals(argv.includes("http"), true);
});

// ---------------------------------------------------------------------------
// Push argv
// ---------------------------------------------------------------------------

Deno.test("buildPushArgv - docker uses 'push'", () => {
  const argv = buildPushArgv("docker", {
    image: "app:latest",
    tlsVerify: true,
  });
  assertEquals(argv, ["docker", "push", "app:latest"]);
});

Deno.test("buildPushArgv - podman uses 'push'", () => {
  const argv = buildPushArgv("podman", {
    image: "app:latest",
    tlsVerify: true,
  });
  assertEquals(argv, ["podman", "push", "app:latest"]);
});

Deno.test("buildPushArgv - podman tlsVerify=false", () => {
  const argv = buildPushArgv("podman", {
    image: "app:latest",
    tlsVerify: false,
  });
  assertEquals(argv, ["podman", "push", "--tls-verify=false", "app:latest"]);
});

Deno.test("buildPushArgv - Apple Containers uses 'image push'", () => {
  const argv = buildPushArgv("container", {
    image: "app:latest",
    tlsVerify: true,
  });
  assertEquals(argv, ["container", "image", "push", "app:latest"]);
});

Deno.test("buildPushArgv - Apple Containers tlsVerify=false uses --scheme http", () => {
  const argv = buildPushArgv("container", {
    image: "app:latest",
    tlsVerify: false,
  });
  assertEquals(argv, [
    "container",
    "image",
    "push",
    "--scheme",
    "http",
    "app:latest",
  ]);
});

// ---------------------------------------------------------------------------
// Buildx build argv
// ---------------------------------------------------------------------------

Deno.test("buildBuildxArgv - docker uses buildx subcommand", () => {
  const argv = buildBuildxArgv("docker", {
    context: ".",
    platforms: ["linux/amd64", "linux/arm64"],
    tags: ["registry.example.com/app:latest"],
    push: true,
  });
  assertEquals(argv, [
    "docker",
    "buildx",
    "build",
    "--platform",
    "linux/amd64,linux/arm64",
    "-t",
    "registry.example.com/app:latest",
    "--push",
    ".",
  ]);
});

Deno.test("buildBuildxArgv - docker without push", () => {
  const argv = buildBuildxArgv("docker", {
    context: ".",
    platforms: ["linux/amd64"],
    tags: ["app:latest"],
    push: false,
  });
  assertEquals(argv.includes("--push"), false);
});

Deno.test("buildBuildxArgv - docker with cache flags", () => {
  const argv = buildBuildxArgv("docker", {
    context: ".",
    platforms: ["linux/amd64"],
    tags: ["app:latest"],
    push: true,
    cacheFrom: ["type=registry,ref=app:cache"],
    cacheTo: ["type=inline"],
  });
  assertEquals(argv.includes("--cache-from"), true);
  assertEquals(argv.includes("--cache-to"), true);
});

Deno.test("buildBuildxArgv - podman maps to build --platform + --manifest", () => {
  const argv = buildBuildxArgv("podman", {
    context: ".",
    platforms: ["linux/amd64", "linux/arm64"],
    tags: ["registry.example.com/app:latest"],
    push: true,
  });
  assertEquals(argv[0], "podman");
  assertEquals(argv[1], "build");
  assertEquals(argv.includes("buildx"), false);
  assertEquals(argv.includes("--platform"), true);
  assertEquals(argv.includes("--manifest"), true);
  assertEquals(argv.includes("--push"), false);
  assertEquals(argv.includes("-t"), false);
});

Deno.test("buildBuildxArgv - container repeats --platform and -t", () => {
  const argv = buildBuildxArgv("container", {
    context: "./app",
    dockerfile: "Containerfile",
    platforms: ["linux/amd64", "linux/arm64"],
    tags: ["registry.example.com/app:latest", "registry.example.com/app:1.0"],
    push: true,
    buildArgs: { VERSION: "1.0" },
    labels: { team: "infra" },
  });
  assertEquals(argv, [
    "container",
    "build",
    "--platform",
    "linux/amd64",
    "--platform",
    "linux/arm64",
    "-t",
    "registry.example.com/app:latest",
    "-t",
    "registry.example.com/app:1.0",
    "-f",
    "Containerfile",
    "--build-arg",
    "VERSION=1.0",
    "--label",
    "team=infra",
    "./app",
  ]);
});

Deno.test("buildBuildxArgv - docker passes --annotation for every key", () => {
  const argv = buildBuildxArgv("docker", {
    context: ".",
    platforms: ["linux/amd64", "linux/arm64"],
    tags: ["app:latest"],
    push: true,
    annotations: {
      "index:org.opencontainers.image.base.name": "alpine:3.20",
      "manifest[linux/arm64]:fingerprint": "abc",
      "org.example.plain": "yes",
    },
  });
  assertEquals(argv, [
    "docker",
    "buildx",
    "build",
    "--platform",
    "linux/amd64,linux/arm64",
    "-t",
    "app:latest",
    "--push",
    "--annotation",
    "index:org.opencontainers.image.base.name=alpine:3.20",
    "--annotation",
    "manifest[linux/arm64]:fingerprint=abc",
    "--annotation",
    "org.example.plain=yes",
    ".",
  ]);
});

Deno.test("buildBuildxArgv - docker passes --metadata-file before context", () => {
  const argv = buildBuildxArgv(
    "docker",
    {
      context: "./app",
      platforms: ["linux/amd64"],
      tags: ["app:latest"],
      push: false,
    },
    "/tmp/meta.json",
  );
  assertEquals(argv.slice(-3), ["--metadata-file", "/tmp/meta.json", "./app"]);
});

Deno.test("buildBuildxArgv - podman passes --annotation", () => {
  const argv = buildBuildxArgv("podman", {
    context: ".",
    platforms: ["linux/amd64"],
    tags: ["app:latest"],
    push: false,
    annotations: { "org.example.plain": "yes" },
  });
  assertEquals(argv, [
    "podman",
    "build",
    "--platform",
    "linux/amd64",
    "--manifest",
    "app:latest",
    "--annotation",
    "org.example.plain=yes",
    ".",
  ]);
});

Deno.test("buildPodmanManifestPushArgv - correct shape", () => {
  const argv = buildPodmanManifestPushArgv("registry.example.com/app:latest");
  assertEquals(argv, [
    "podman",
    "manifest",
    "push",
    "registry.example.com/app:latest",
  ]);
});

// ---------------------------------------------------------------------------
// Digest parser
// ---------------------------------------------------------------------------

Deno.test("parseDigest - extracts sha256 digest from output", () => {
  const output =
    "pushing manifest for registry.example.com/app:latest@sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789";
  const digest = parseDigest(output);
  assertEquals(
    digest,
    "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
  );
});

Deno.test("parseDigest - returns undefined when no digest", () => {
  assertEquals(parseDigest("build complete"), undefined);
});

Deno.test("parseDigest - extracts from multiline output", () => {
  const output = `Step 1/3 : FROM alpine
Step 2/3 : RUN echo hello
Successfully built abc123
sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789
`;
  const digest = parseDigest(output);
  assertEquals(
    digest,
    "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
  );
});

// ---------------------------------------------------------------------------
// Export argv
// ---------------------------------------------------------------------------

Deno.test("buildExportArgv - docker oci uses buildx re-export", () => {
  const argv = buildExportArgv("docker", "app:latest", "oci", "/tmp/out.tar");
  assertEquals(argv, [
    "docker",
    "buildx",
    "build",
    "--output",
    "type=oci,dest=/tmp/out.tar",
    "-",
  ]);
});

Deno.test("buildExportArgv - docker oci passes --platform when set", () => {
  const argv = buildExportArgv(
    "docker",
    "app:amd64",
    "oci",
    "/tmp/out.tar",
    "linux/amd64",
  );
  assertEquals(argv, [
    "docker",
    "buildx",
    "build",
    "--platform",
    "linux/amd64",
    "--output",
    "type=oci,dest=/tmp/out.tar",
    "-",
  ]);
});

Deno.test("buildExportArgv - docker docker-format uses save", () => {
  const argv = buildExportArgv(
    "docker",
    "app:latest",
    "docker",
    "/tmp/out.tar",
  );
  assertEquals(argv, ["docker", "save", "-o", "/tmp/out.tar", "app:latest"]);
});

Deno.test("buildExportArgv - podman oci uses save oci-archive", () => {
  const argv = buildExportArgv("podman", "app:latest", "oci", "/tmp/out.tar");
  assertEquals(argv, [
    "podman",
    "save",
    "--format",
    "oci-archive",
    "-o",
    "/tmp/out.tar",
    "app:latest",
  ]);
});

Deno.test("buildExportArgv - podman docker uses save docker-archive", () => {
  const argv = buildExportArgv(
    "podman",
    "app:latest",
    "docker",
    "/tmp/out.tar",
  );
  assertEquals(argv, [
    "podman",
    "save",
    "--format",
    "docker-archive",
    "-o",
    "/tmp/out.tar",
    "app:latest",
  ]);
});

Deno.test("buildExportArgv - Apple Containers uses image save", () => {
  const argv = buildExportArgv(
    "container",
    "app:latest",
    "oci",
    "/tmp/out.tar",
  );
  assertEquals(argv, [
    "container",
    "image",
    "save",
    "-o",
    "/tmp/out.tar",
    "app:latest",
  ]);
});

// ---------------------------------------------------------------------------
// Buildx metadata-file digest
// ---------------------------------------------------------------------------

const INDEX_DIGEST =
  "sha256:1111111111111111111111111111111111111111111111111111111111111111";
const OUTPUT_DIGEST =
  "sha256:2222222222222222222222222222222222222222222222222222222222222222";

const dockerBuildxArgs = {
  context: ".",
  platforms: ["linux/amd64", "linux/arm64"],
  tags: ["registry.example.com/app:latest"],
  push: true,
};

/**
 * Mock buildx: optionally writes `metadata` to the --metadata-file path,
 * and records that path so the test can check it was removed.
 */
function installMetadataExecutor(
  opts: { exitCode: number; metadata?: string; throws?: boolean },
): { paths: string[] } {
  const paths: string[] = [];
  setCommandExecutor(async (req: ExecRequest) => {
    const i = req.args.indexOf("--metadata-file");
    const path = req.args[i + 1];
    paths.push(path);
    if (opts.metadata !== undefined) {
      await Deno.writeTextFile(path, opts.metadata);
    }
    if (opts.throws) throw new Error("spawn failed");
    return {
      exitCode: opts.exitCode,
      stdout: `pushed ${OUTPUT_DIGEST}`,
      stderr: "",
    };
  });
  return { paths };
}

async function assertRemoved(path: string): Promise<void> {
  await assertRejects(() => Deno.stat(path), Deno.errors.NotFound);
}

Deno.test("runBuildxCommand - docker digest comes from --metadata-file", async () => {
  const { paths } = installMetadataExecutor({
    exitCode: 0,
    metadata: JSON.stringify({ "containerimage.digest": INDEX_DIGEST }),
  });
  try {
    const result = await runBuildxCommand("docker", dockerBuildxArgs);
    assertEquals(result.digest, INDEX_DIGEST);
  } finally {
    resetCommandExecutor();
  }
  assertEquals(paths.length, 1);
  await assertRemoved(paths[0]);
});

for (
  const [label, metadata] of [
    ["empty", ""],
    ["not JSON", "{not json"],
    ["no digest key", JSON.stringify({ "image.name": "app" })],
  ] as const
) {
  Deno.test(`runBuildxCommand - docker falls back to output when metadata is ${label}`, async () => {
    const { paths } = installMetadataExecutor({ exitCode: 0, metadata });
    try {
      const result = await runBuildxCommand("docker", dockerBuildxArgs);
      assertEquals(result.digest, OUTPUT_DIGEST);
    } finally {
      resetCommandExecutor();
    }
    await assertRemoved(paths[0]);
  });
}

Deno.test("runBuildxCommand - docker removes metadata file on non-zero exit", async () => {
  const { paths } = installMetadataExecutor({
    exitCode: 1,
    metadata: JSON.stringify({ "containerimage.digest": INDEX_DIGEST }),
  });
  try {
    const result = await runBuildxCommand("docker", dockerBuildxArgs);
    assertEquals(result.exitCode, 1);
    assertEquals("digest" in result, false);
  } finally {
    resetCommandExecutor();
  }
  await assertRemoved(paths[0]);
});

Deno.test("runBuildxCommand - docker removes metadata file when exec throws", async () => {
  const { paths } = installMetadataExecutor({ exitCode: 0, throws: true });
  try {
    await assertRejects(
      () => runBuildxCommand("docker", dockerBuildxArgs),
      Error,
      "spawn failed",
    );
  } finally {
    resetCommandExecutor();
  }
  await assertRemoved(paths[0]);
});

Deno.test("runBuildxCommand - docker falls back to output when no temp file can be made", async () => {
  const requests: ExecRequest[] = [];
  setCommandExecutor((req: ExecRequest) => {
    requests.push(req);
    return Promise.resolve({
      exitCode: 0,
      stdout: `pushed ${OUTPUT_DIGEST}`,
      stderr: "",
    });
  });
  const saved = Deno.env.get("TMPDIR");
  Deno.env.set("TMPDIR", "/nonexistent/swamp-container-image-test");
  try {
    const result = await runBuildxCommand("docker", dockerBuildxArgs);
    assertEquals(result.digest, OUTPUT_DIGEST);
  } finally {
    if (saved === undefined) Deno.env.delete("TMPDIR");
    else Deno.env.set("TMPDIR", saved);
    resetCommandExecutor();
  }
  assertEquals(requests.length, 1);
  assertEquals(requests[0].args.includes("--metadata-file"), false);
});

Deno.test("readMetadataDigest - missing file returns undefined", async () => {
  assertEquals(
    await readMetadataDigest("/nonexistent/buildx-metadata.json"),
    undefined,
  );
});
