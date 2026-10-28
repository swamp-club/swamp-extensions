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

import { assert, assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import type { ContainerContext } from "./_lib/operations.ts";
import {
  runBuild,
  runBuildxBuild,
  runLogin,
  runPush,
  runRun,
  runValidate,
} from "./_lib/operations.ts";
import {
  type ExecRequest,
  resetCommandExecutor,
  setCommandExecutor,
} from "./_lib/runner.ts";
import {
  checkBuildxAvailable,
  checkRuntimeAvailable,
  defaultBuildxProbe,
} from "./_lib/checks.ts";

// ---------------------------------------------------------------------------
// Test harness
// ---------------------------------------------------------------------------

interface Harness {
  ctx: ContainerContext;
  writes: {
    specName: string;
    name: string;
    data: Record<string, unknown>;
  }[];
  logs: { level: string; message: string }[];
  execRequests: ExecRequest[];
}

function makeHarness(globalArgs: Record<string, unknown>): Harness {
  const writes: Harness["writes"] = [];
  const logs: Harness["logs"] = [];
  const execRequests: ExecRequest[] = [];

  const ctx: ContainerContext = {
    signal: AbortSignal.timeout(30000),
    globalArgs,
    logger: {
      debug: (msg: string) => logs.push({ level: "debug", message: msg }),
      info: (msg: string) => logs.push({ level: "info", message: msg }),
      warn: (msg: string) => logs.push({ level: "warn", message: msg }),
      error: (msg: string) => logs.push({ level: "error", message: msg }),
    },
    writeResource: (specName, name, data) => {
      writes.push({ specName, name, data });
      return Promise.resolve({ name });
    },
  };

  return { ctx, writes, logs, execRequests };
}

function installMockExecutor(
  harness: Harness,
  response: { exitCode: number; stdout: string; stderr: string } = {
    exitCode: 0,
    stdout: "",
    stderr: "",
  },
): void {
  setCommandExecutor((req: ExecRequest) => {
    harness.execRequests.push(req);
    return Promise.resolve(response);
  });
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

Deno.test("build - writes buildResult resource on success", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, { exitCode: 0, stdout: "built", stderr: "" });

  try {
    await runBuild(
      { context: ".", tag: "myapp:latest", noCache: false, pull: false },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.writes.length, 1);
  assertEquals(h.writes[0].specName, "buildResult");
  assertEquals(h.writes[0].name, "build-myapp");
  assertEquals(h.writes[0].data.tag, "myapp:latest");
  assertEquals(h.writes[0].data.exitCode, 0);
  assertEquals(h.writes[0].data.binary, "docker");
});

Deno.test("build - throws on non-zero exit", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, { exitCode: 1, stdout: "", stderr: "build error" });

  try {
    await assertRejects(
      () => runBuild({ context: ".", noCache: false, pull: false }, h.ctx),
      Error,
      "docker build failed",
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.writes.length, 1);
  assertEquals(h.writes[0].data.exitCode, 1);
});

Deno.test("build - pull passes --pull to the build command", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await runBuild(
      { context: ".", tag: "myapp:latest", noCache: true, pull: true },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
  assertEquals(h.execRequests[0].args[0], "build");
  assertEquals(h.execRequests[0].args.includes("--pull"), true);
  assertEquals(h.execRequests[0].args.includes("--no-cache"), true);
});

Deno.test("build - exports when exportFormat and exportPath set", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  installMockExecutor(h);

  try {
    await runBuild(
      {
        context: ".",
        tag: "myapp:latest",
        noCache: false,
        pull: false,
        exportFormat: "oci",
        exportPath: "/tmp/myapp-oci.tar",
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  // Build + export = 2 exec calls
  assertEquals(h.execRequests.length, 2);
  assertEquals(h.execRequests[0].args[0], "build");
  assertEquals(h.execRequests[1].args.includes("oci-archive"), true);
  assertEquals(h.writes[0].data.exportFormat, "oci");
  assertEquals(h.writes[0].data.exportPath, "/tmp/myapp-oci.tar");
});

Deno.test("build - records platform and passes it to the build", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await runBuild(
      {
        context: ".",
        tag: "myapp:amd64",
        noCache: false,
        pull: false,
        platform: "linux/amd64",
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
  assertEquals(h.execRequests[0].bin, "container");
  const args = h.execRequests[0].args;
  assertEquals(args[args.indexOf("--platform") + 1], "linux/amd64");
  assertEquals(h.writes[0].data.platform, "linux/amd64");
});

Deno.test("build - docker oci export passes platform to the re-export", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await runBuild(
      {
        context: ".",
        tag: "myapp:amd64",
        noCache: false,
        pull: false,
        platform: "linux/amd64",
        exportFormat: "oci",
        exportPath: "/tmp/myapp-oci.tar",
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 2);
  const exportArgs = h.execRequests[1].args;
  assertEquals(exportArgs.slice(0, 2), ["buildx", "build"]);
  assertEquals(exportArgs[exportArgs.indexOf("--platform") + 1], "linux/amd64");
});

Deno.test("build - errors when exportFormat set without tag", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await assertRejects(
      () =>
        runBuild(
          {
            context: ".",
            noCache: false,
            pull: false,
            exportFormat: "oci",
            exportPath: "/tmp/out.tar",
          },
          h.ctx,
        ),
      Error,
      "exportFormat requires a tag",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

Deno.test("run - writes runResult resource", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  installMockExecutor(h, {
    exitCode: 0,
    stdout: "hello world",
    stderr: "",
  });

  try {
    await runRun(
      { image: "alpine", command: ["echo", "hello world"] },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.writes.length, 1);
  assertEquals(h.writes[0].specName, "runResult");
  assertEquals(h.writes[0].data.image, "alpine");
  assertEquals(h.writes[0].data.stdout, "hello world");
  assertEquals(h.writes[0].data.binary, "podman");
});

Deno.test("run - throws on non-zero exit", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, { exitCode: 137, stdout: "", stderr: "OOM killed" });

  try {
    await assertRejects(
      () => runRun({ image: "alpine" }, h.ctx),
      Error,
      "docker run failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("run - privileged flag passes through to executor", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await runRun(
      { image: "alpine", privileged: true },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
  assert(h.execRequests[0].args.includes("--privileged"));
});

Deno.test("run - extraArgs pass through to executor before image", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await runRun(
      {
        image: "builder:latest",
        extraArgs: ["--cap-add", "SYS_ADMIN"],
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
  const args = h.execRequests[0].args;
  const capAddIdx = args.indexOf("--cap-add");
  const imageIdx = args.indexOf("builder:latest");
  assert(capAddIdx !== -1, "--cap-add should be in args");
  assert(imageIdx !== -1, "image should be in args");
  assert(capAddIdx < imageIdx, "--cap-add should come before image");
});

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------

Deno.test("login - password piped via stdin, never in argv", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await runLogin(
      {
        username: "user",
        password: "supersecret",
        server: "ghcr.io",
        tlsVerify: true,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
  assertEquals(h.execRequests[0].stdin, "supersecret");
  for (const arg of h.execRequests[0].args) {
    assertEquals(arg.includes("supersecret"), false);
  }
});

Deno.test("login - password never appears in resource", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h);

  try {
    await runLogin(
      { username: "user", password: "supersecret", tlsVerify: true },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  const data = h.writes[0].data;
  assertEquals(Object.prototype.hasOwnProperty.call(data, "password"), false);
  const serialized = JSON.stringify(data);
  assertEquals(serialized.includes("supersecret"), false);
});

Deno.test("login - writes loginResult with server and username", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  installMockExecutor(h);

  try {
    await runLogin(
      {
        username: "admin",
        password: "pass",
        server: "registry.io",
        tlsVerify: true,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.writes[0].specName, "loginResult");
  assertEquals(h.writes[0].data.server, "registry.io");
  assertEquals(h.writes[0].data.username, "admin");
  assertEquals(h.writes[0].data.binary, "podman");
});

Deno.test("login - throws on non-zero exit", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, {
    exitCode: 1,
    stdout: "",
    stderr: "unauthorized",
  });

  try {
    await assertRejects(
      () =>
        runLogin({ username: "user", password: "bad", tlsVerify: true }, h.ctx),
      Error,
      "docker login failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// Buildx build
// ---------------------------------------------------------------------------

Deno.test("multi-platform-build - docker writes multiPlatformBuildResult with digest", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, {
    exitCode: 0,
    stdout:
      "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    stderr: "",
  });

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64", "linux/arm64"],
        tags: ["registry.example.com/app:latest"],
        push: true,
        pull: false,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.writes.length, 1);
  assertEquals(h.writes[0].specName, "multiPlatformBuildResult");
  assertEquals(
    h.writes[0].data.digest,
    "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
  );
  assertEquals(h.writes[0].data.binary, "docker");
});

Deno.test("multi-platform-build - podman issues manifest rm, build, then manifest push", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  setCommandExecutor((req: ExecRequest) => {
    h.execRequests.push(req);
    // manifest rm (cleanup) and build succeed; push returns a digest
    if (req.args[0] === "manifest" && req.args[1] === "push") {
      return Promise.resolve({
        exitCode: 0,
        stdout:
          "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
        stderr: "",
      });
    }
    return Promise.resolve({ exitCode: 0, stdout: "", stderr: "" });
  });

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64"],
        tags: ["app:latest"],
        push: true,
        pull: false,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  // 4 calls: rmi (cleanup), manifest rm (cleanup), build, manifest push
  assertEquals(h.execRequests.length, 4);
  assertEquals(h.execRequests[0].bin, "podman");
  assertEquals(h.execRequests[0].args[0], "rmi");
  assertEquals(h.execRequests[1].bin, "podman");
  assertEquals(h.execRequests[1].args[0], "manifest");
  assertEquals(h.execRequests[1].args[1], "rm");
  assertEquals(h.execRequests[2].bin, "podman");
  assertEquals(h.execRequests[2].args[0], "build");
  assertEquals(h.execRequests[3].bin, "podman");
  assertEquals(h.execRequests[3].args[0], "manifest");
  assertEquals(h.execRequests[3].args[1], "push");
});

Deno.test("multi-platform-build - podman pull adds --pull to build only", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  setCommandExecutor((req: ExecRequest) => {
    h.execRequests.push(req);
    if (req.args[0] === "manifest" && req.args[1] === "push") {
      return Promise.resolve({
        exitCode: 0,
        stdout:
          "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
        stderr: "",
      });
    }
    return Promise.resolve({ exitCode: 0, stdout: "", stderr: "" });
  });

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64"],
        tags: ["app:latest"],
        push: true,
        pull: true,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  // rmi, manifest rm, build, manifest push — only the build pulls
  assertEquals(h.execRequests.length, 4);
  assertEquals(h.execRequests[2].args[0], "build");
  assertEquals(
    h.execRequests.map((r) => r.args.includes("--pull")),
    [false, false, true, false],
  );
});

const INDEX_DIGEST =
  "sha256:1111111111111111111111111111111111111111111111111111111111111111";
const OTHER_DIGEST =
  "sha256:2222222222222222222222222222222222222222222222222222222222222222";

Deno.test("multi-platform-build - container builds then pushes each tag", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  let pushes = 0;
  setCommandExecutor((req: ExecRequest) => {
    h.execRequests.push(req);
    if (req.args[0] === "image" && req.args[1] === "push") {
      pushes++;
      return Promise.resolve({
        exitCode: 0,
        stdout: pushes === 1 ? INDEX_DIGEST : OTHER_DIGEST,
        stderr: "",
      });
    }
    return Promise.resolve({ exitCode: 0, stdout: "", stderr: "" });
  });

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64", "linux/arm64"],
        tags: [
          "registry.example.com/app:latest",
          "registry.example.com/app:1.0",
        ],
        push: true,
        pull: false,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 3);
  assertEquals(h.execRequests[0].bin, "container");
  assertEquals(h.execRequests[0].args[0], "build");
  assertEquals(
    h.execRequests[0].args.filter((a) => a === "--platform").length,
    2,
  );
  assertEquals(h.execRequests[1].args, [
    "image",
    "push",
    "registry.example.com/app:latest",
  ]);
  assertEquals(h.execRequests[2].args, [
    "image",
    "push",
    "registry.example.com/app:1.0",
  ]);
  assertEquals(h.writes[0].specName, "multiPlatformBuildResult");
  assertEquals(h.writes[0].data.digest, INDEX_DIGEST);
  assertEquals(h.writes[0].data.binary, "container");
});

Deno.test("multi-platform-build - container with push=false only builds", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64", "linux/arm64"],
        tags: ["app:latest"],
        push: false,
        pull: false,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
  assertEquals(h.execRequests[0].args[0], "build");
});

Deno.test("multi-platform-build - container throws when a push fails", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  setCommandExecutor((req: ExecRequest) => {
    h.execRequests.push(req);
    if (req.args[0] === "image" && req.args[1] === "push") {
      return Promise.resolve({ exitCode: 1, stdout: "", stderr: "denied" });
    }
    return Promise.resolve({ exitCode: 0, stdout: "", stderr: "" });
  });

  try {
    await assertRejects(
      () =>
        runBuildxBuild(
          {
            context: ".",
            platforms: ["linux/amd64", "linux/arm64"],
            tags: ["app:latest", "app:1.0"],
            push: true,
            pull: false,
          },
          h.ctx,
        ),
      Error,
      "denied",
    );
  } finally {
    resetCommandExecutor();
  }

  // build + first push; stops before the second tag
  assertEquals(h.execRequests.length, 2);
  assertEquals(h.writes[0].data.exitCode, 1);
});

Deno.test("multi-platform-build - container rejects cacheFrom before exec", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await assertRejects(
      () =>
        runBuildxBuild(
          {
            context: ".",
            platforms: ["linux/amd64"],
            tags: ["app:latest"],
            push: false,
            pull: false,
            cacheFrom: ["type=registry,ref=app:cache"],
          },
          h.ctx,
        ),
      Error,
      "--cache-from",
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 0);
});

Deno.test("multi-platform-build - container rejects annotations before exec", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await assertRejects(
      () =>
        runBuildxBuild(
          {
            context: ".",
            platforms: ["linux/amd64"],
            tags: ["app:latest"],
            push: false,
            pull: false,
            annotations: { "org.example.plain": "yes" },
          },
          h.ctx,
        ),
      Error,
      "--annotation",
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 0);
});

for (
  const key of [
    "index:org.opencontainers.image.base.name",
    "manifest[linux/arm64]:fingerprint",
    "manifest-descriptor:org.example.x",
  ]
) {
  Deno.test(`multi-platform-build - podman rejects prefixed annotation '${key}' before exec`, async () => {
    const h = makeHarness({ name: "myapp", binary: "podman" });
    installMockExecutor(h);

    try {
      await assertRejects(
        () =>
          runBuildxBuild(
            {
              context: ".",
              platforms: ["linux/amd64"],
              tags: ["app:latest"],
              push: false,
              pull: false,
              annotations: { "org.example.plain": "yes", [key]: "v" },
            },
            h.ctx,
          ),
        Error,
        `'${key}'`,
      );
    } finally {
      resetCommandExecutor();
    }

    assertEquals(h.execRequests.length, 0);
  });
}

Deno.test("multi-platform-build - container treats empty annotations as unset", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64"],
        tags: ["app:latest"],
        push: false,
        pull: false,
        annotations: {},
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests.length, 1);
});

Deno.test("multi-platform-build - podman passes unprefixed annotations", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  installMockExecutor(h);

  try {
    await runBuildxBuild(
      {
        context: ".",
        platforms: ["linux/amd64"],
        tags: ["app:latest"],
        push: false,
        pull: false,
        annotations: { "org.example.plain": "yes" },
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  const build = h.execRequests.find((r) => r.args[0] === "build");
  assert(build);
  assert(build.args.includes("org.example.plain=yes"));
});

Deno.test("multi-platform-build - throws on non-zero exit", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, { exitCode: 1, stdout: "", stderr: "buildx error" });

  try {
    await assertRejects(
      () =>
        runBuildxBuild(
          {
            context: ".",
            platforms: ["linux/amd64"],
            tags: ["app:latest"],
            push: true,
            pull: false,
          },
          h.ctx,
        ),
      Error,
      "multi-platform build failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

// ---------------------------------------------------------------------------
// Pre-flight checks
// ---------------------------------------------------------------------------

Deno.test("checkRuntimeAvailable - passes when binary found", async () => {
  const result = await checkRuntimeAvailable(
    { globalArgs: { name: "test", binary: "docker" } },
    () => Promise.resolve(true),
  );
  assertEquals(result.pass, true);
});

Deno.test("checkRuntimeAvailable - fails when binary not found", async () => {
  const result = await checkRuntimeAvailable(
    { globalArgs: { name: "test", binary: "docker" } },
    () => Promise.resolve(false),
  );
  assertEquals(result.pass, false);
  assert(result.errors![0].includes("docker"));
});

Deno.test("checkRuntimeAvailable - probes configured binary name", async () => {
  let probedBinary = "";
  await checkRuntimeAvailable(
    { globalArgs: { name: "test", binary: "podman" } },
    (bin) => {
      probedBinary = bin;
      return Promise.resolve(true);
    },
  );
  assertEquals(probedBinary, "podman");
});

Deno.test("checkBuildxAvailable - passes for docker when probe succeeds", async () => {
  const result = await checkBuildxAvailable(
    { globalArgs: { name: "test", binary: "docker" } },
    () => Promise.resolve(true),
  );
  assertEquals(result.pass, true);
});

Deno.test("checkBuildxAvailable - fails for docker when probe fails", async () => {
  const result = await checkBuildxAvailable(
    { globalArgs: { name: "test", binary: "docker" } },
    () => Promise.resolve(false),
  );
  assertEquals(result.pass, false);
  assert(result.errors![0].includes("buildx"));
});

Deno.test("checkBuildxAvailable - passes for podman (native support)", async () => {
  const result = await checkBuildxAvailable(
    { globalArgs: { name: "test", binary: "podman" } },
    () => Promise.resolve(true),
  );
  assertEquals(result.pass, true);
});

Deno.test("checkBuildxAvailable - passes for Apple Containers", async () => {
  const result = await checkBuildxAvailable(
    { globalArgs: { name: "test", binary: "container" } },
    () => Promise.resolve(true),
  );
  assertEquals(result.pass, true);
});

Deno.test("defaultBuildxProbe - Apple Containers needs no buildx", async () => {
  assertEquals(await defaultBuildxProbe("container"), true);
});

// ---------------------------------------------------------------------------
// Push
// ---------------------------------------------------------------------------

Deno.test("push - writes pushResult resource with digest", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, {
    exitCode: 0,
    stdout:
      "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    stderr: "",
  });

  try {
    await runPush(
      { image: "registry.example.com/app:latest", tlsVerify: true },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.writes.length, 1);
  assertEquals(h.writes[0].specName, "pushResult");
  assertEquals(h.writes[0].data.image, "registry.example.com/app:latest");
  assertEquals(
    h.writes[0].data.digest,
    "sha256:abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
  );
  assertEquals(h.writes[0].data.binary, "docker");
});

Deno.test("push - throws on non-zero exit", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  installMockExecutor(h, { exitCode: 1, stdout: "", stderr: "push denied" });

  try {
    await assertRejects(
      () => runPush({ image: "app:latest", tlsVerify: true }, h.ctx),
      Error,
      "docker push failed",
    );
  } finally {
    resetCommandExecutor();
  }
});

Deno.test("push - podman uses 'push' subcommand", async () => {
  const h = makeHarness({ name: "myapp", binary: "podman" });
  installMockExecutor(h);

  try {
    await runPush({ image: "app:latest", tlsVerify: true }, h.ctx);
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests[0].bin, "podman");
  assertEquals(h.execRequests[0].args[0], "push");
});

Deno.test("push - Apple Containers uses 'image push' subcommand", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await runPush({ image: "app:latest", tlsVerify: true }, h.ctx);
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests[0].bin, "container");
  assertEquals(h.execRequests[0].args[0], "image");
  assertEquals(h.execRequests[0].args[1], "push");
});

// ---------------------------------------------------------------------------
// Login routing
// ---------------------------------------------------------------------------

Deno.test("login - Apple Containers uses 'registry login' subcommand", async () => {
  const h = makeHarness({ name: "myapp", binary: "container" });
  installMockExecutor(h);

  try {
    await runLogin(
      {
        username: "user",
        password: "secret",
        server: "ghcr.io",
        tlsVerify: true,
      },
      h.ctx,
    );
  } finally {
    resetCommandExecutor();
  }

  assertEquals(h.execRequests[0].bin, "container");
  assertEquals(h.execRequests[0].args[0], "registry");
  assertEquals(h.execRequests[0].args[1], "login");
  assertEquals(h.execRequests[0].args[2], "--password-stdin");
});

// ---------------------------------------------------------------------------
// Validate
// ---------------------------------------------------------------------------

Deno.test("validate - throws when runtime not found", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  const notFoundProbe = () => Promise.resolve(false);

  await assertRejects(
    () => runValidate({} as Record<string, never>, h.ctx, notFoundProbe),
    Error,
    "not found on PATH",
  );
});

Deno.test("validate - writes validateResult on missing runtime", async () => {
  const h = makeHarness({ name: "myapp", binary: "docker" });
  const notFoundProbe = () => Promise.resolve(false);

  try {
    await runValidate({} as Record<string, never>, h.ctx, notFoundProbe);
  } catch {
    // expected to throw
  }

  assertEquals(h.writes.length, 1);
  assertEquals(h.writes[0].specName, "validateResult");
  const data = h.writes[0].data as Record<string, unknown>;
  assertEquals(data.binary, "docker");
  assertEquals(data.runtimeFound, false);
  const methods = data.methods as Record<string, boolean>;
  assertEquals(methods.build, false);
  assertEquals(methods.run, false);
  assertEquals(methods.login, false);
  assertEquals(methods.push, false);
  assertEquals(methods["multi-platform-build"], false);
});
