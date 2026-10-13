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

import { assertEquals } from "jsr:@std/assert@1.0.19";
import {
  buildBuildArgv,
  buildBuildxArgv,
  buildExportArgv,
  buildLoginArgv,
  buildPodmanManifestPushArgv,
  buildPushArgv,
  buildRunArgv,
  parseDigest,
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
