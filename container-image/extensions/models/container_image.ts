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
 * Swamp model that builds, runs, and pushes container images via Docker,
 * Podman, or Apple Containers.
 *
 * The model entrypoint is intentionally thin — schemas live in
 * `_lib/schemas.ts`, operation logic in `_lib/operations.ts`, and checks
 * in `_lib/checks.ts`.
 *
 * @module
 */

import {
  BuildArgsSchema,
  BuildResultSchema,
  BuildxBuildArgsSchema,
  BuildxResultSchema,
  GlobalArgsSchema,
  LoginArgsSchema,
  LoginResultSchema,
  PushArgsSchema,
  PushResultSchema,
  RunArgsSchema,
  RunResultSchema,
  ValidateArgsSchema,
  ValidateResultSchema,
} from "./_lib/schemas.ts";
import type {
  BuildArgs,
  BuildxBuildArgs,
  LoginArgs,
  PushArgs,
  RunArgs,
} from "./_lib/schemas.ts";
import {
  type ContainerContext,
  runBuild,
  runBuildxBuild,
  runLogin,
  runPush,
  runRun,
  runValidate,
} from "./_lib/operations.ts";
import {
  type BinaryProbe,
  type BuildxProbe,
  checkBuildxAvailable,
  type CheckContext,
  checkRuntimeAvailable,
} from "./_lib/checks.ts";

export const model = {
  type: "@swamp/container-image",
  version: "2026.10.22.1",
  globalArguments: GlobalArgsSchema,

  upgrades: [
    {
      toVersion: "2026.08.25.1",
      description: "Add privileged and extraArgs inputs to the run method.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "Fix missing upgradeAttributes that prevented installation.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.22.1",
      description: "Add platform input to build; support Apple Containers in " +
        "multi-platform-build.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],

  resources: {
    validateResult: {
      description:
        "Outcome of a `validate` invocation — runtime presence, daemon " +
        "connectivity, buildx availability, and per-method readiness.",
      schema: ValidateResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
    buildResult: {
      description:
        "Outcome of a `build` invocation — tag, exit code, and captured output.",
      schema: BuildResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    runResult: {
      description:
        "Outcome of a `run` invocation — image, exit code, stdout, and stderr.",
      schema: RunResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    loginResult: {
      description:
        "Outcome of a `login` invocation — server, username, and exit code. " +
        "Password is never persisted.",
      schema: LoginResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 10,
    },
    multiPlatformBuildResult: {
      description:
        "Outcome of a `multi-platform-build` invocation — platforms, tags, " +
        "pushed digest, exit code, and captured output.",
      schema: BuildxResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
    pushResult: {
      description:
        "Outcome of a `push` invocation — image reference, pushed digest, " +
        "exit code, and captured output.",
      schema: PushResultSchema,
      lifetime: "infinite" as const,
      garbageCollection: 50,
    },
  },

  checks: {
    "runtime-available": {
      description:
        "Ensures the configured container runtime binary is on PATH.",
      labels: ["policy"],
      appliesTo: ["build", "run", "login", "push", "multi-platform-build"],
      execute: (ctx: CheckContext, probe?: BinaryProbe) =>
        checkRuntimeAvailable(ctx, probe),
    },
    "multi-platform-available": {
      description:
        "Ensures multi-platform build support is available. Docker needs " +
        "the buildx plugin; podman and Apple Containers have native " +
        "support.",
      labels: ["policy"],
      appliesTo: ["multi-platform-build"],
      execute: (ctx: CheckContext, probe?: BuildxProbe) =>
        checkBuildxAvailable(ctx, probe),
    },
  },

  methods: {
    validate: {
      description:
        "Check that the container runtime is installed, the daemon is " +
        "reachable, and report which methods are available. Fails fast " +
        "if critical dependencies are missing.",
      arguments: ValidateArgsSchema,
      execute: (args: Record<string, never>, ctx: ContainerContext) =>
        runValidate(args, ctx),
    },
    build: {
      description:
        "Build a container image from a Dockerfile. Supports OCI output format.",
      arguments: BuildArgsSchema,
      execute: (args: BuildArgs, ctx: ContainerContext) => runBuild(args, ctx),
    },
    run: {
      description:
        "Run a container image with --rm. Captures stdout and stderr.",
      arguments: RunArgsSchema,
      execute: (args: RunArgs, ctx: ContainerContext) => runRun(args, ctx),
    },
    login: {
      description:
        "Log into a container registry. Password is piped via --password-stdin " +
        "and never appears in argv or persisted resources. All runtimes " +
        "supported (Apple Containers routes through 'registry login').",
      arguments: LoginArgsSchema,
      execute: (args: LoginArgs, ctx: ContainerContext) => runLogin(args, ctx),
    },
    push: {
      description:
        "Push a container image to a registry. Captures the pushed digest. " +
        "All runtimes supported (Apple Containers routes through " +
        "'image push').",
      arguments: PushArgsSchema,
      execute: (args: PushArgs, ctx: ContainerContext) => runPush(args, ctx),
    },
    "multi-platform-build": {
      description:
        "Multi-platform build and optional push. Docker uses buildx; Podman " +
        "uses native --platform + manifest push; Apple Containers uses " +
        "repeated --platform + image push per tag. Captures the pushed " +
        "digest.",
      arguments: BuildxBuildArgsSchema,
      execute: (args: BuildxBuildArgs, ctx: ContainerContext) =>
        runBuildxBuild(args, ctx),
    },
  },
};
