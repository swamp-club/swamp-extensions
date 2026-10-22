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
 * Pre-flight check implementations for @swamp/container-image.
 *
 * Two checks, both computable from globalArgs alone:
 *   - runtime-available — configured binary is on PATH
 *   - buildx-available — docker needs buildx plugin; podman and Apple
 *     Containers have native support
 *
 * All three runtimes (docker, podman, container) support login via
 * --password-stdin — Apple Containers routes through
 * `container registry login`.
 *
 * @module
 */

import { type Binary, GlobalArgsSchema } from "./schemas.ts";

export interface CheckResult {
  pass: boolean;
  errors?: string[];
}

export interface CheckContext {
  globalArgs: Record<string, unknown>;
}

export type BinaryProbe = (binary: string) => Promise<boolean>;

export const defaultBinaryProbe: BinaryProbe = async (binary) => {
  if (binary.includes("/")) {
    try {
      const stat = await Deno.stat(binary);
      return stat.isFile;
    } catch {
      return false;
    }
  }
  const pathEnv = Deno.env.get("PATH") ?? "";
  for (const dir of pathEnv.split(":")) {
    if (dir.length === 0) continue;
    try {
      const stat = await Deno.stat(`${dir}/${binary}`);
      if (stat.isFile) return true;
    } catch {
      // keep searching
    }
  }
  return false;
};

export type BuildxProbe = (binary: Binary) => Promise<boolean>;

export const defaultBuildxProbe: BuildxProbe = async (binary) => {
  // podman and Apple Containers build multi-platform natively, no buildx
  if (binary === "podman" || binary === "container") return true;
  try {
    const cmd = new Deno.Command(binary, {
      args: ["buildx", "inspect"],
      stdout: "null",
      stderr: "null",
    });
    const output = await cmd.output();
    return output.code === 0;
  } catch {
    return false;
  }
};

export async function checkRuntimeAvailable(
  ctx: CheckContext,
  probe: BinaryProbe = defaultBinaryProbe,
): Promise<CheckResult> {
  const g = GlobalArgsSchema.parse(ctx.globalArgs);
  const available = await probe(g.binary);
  if (available) return { pass: true };
  return {
    pass: false,
    errors: [
      `Container runtime '${g.binary}' was not found on PATH. ` +
      `Install ${g.binary} or set globalArguments.binary to a different runtime.`,
    ],
  };
}

export async function checkBuildxAvailable(
  ctx: CheckContext,
  probe: BuildxProbe = defaultBuildxProbe,
): Promise<CheckResult> {
  const g = GlobalArgsSchema.parse(ctx.globalArgs);
  const available = await probe(g.binary);
  if (available) return { pass: true };
  return {
    pass: false,
    errors: [
      `${g.binary} buildx is not available. ` +
      (g.binary === "docker"
        ? "Install the Docker Buildx plugin (docker buildx install)."
        : "Unexpected: podman should have native multi-platform support."),
    ],
  };
}
