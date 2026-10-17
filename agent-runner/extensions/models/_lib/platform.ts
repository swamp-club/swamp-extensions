import type { Platform } from "./types.ts";

// Claude's release manifest and the Codex npm packages both name Windows
// builds win32-*, so Deno's "windows" maps to that key.
export function detectPlatform(
  os: string = Deno.build.os,
  arch: string = Deno.build.arch,
): Platform {
  const osKey = os === "darwin"
    ? "darwin"
    : os === "linux"
    ? "linux"
    : os === "windows"
    ? "win32"
    : null;
  if (!osKey) {
    throw new Error(`Unsupported operating system: ${os}`);
  }

  const archKey = arch === "x86_64"
    ? "x64"
    : arch === "aarch64"
    ? "arm64"
    : null;
  if (!archKey) {
    throw new Error(`Unsupported architecture: ${arch}`);
  }

  return `${osKey}-${archKey}` as Platform;
}

export function isWindows(platform: Platform): boolean {
  return platform.startsWith("win32-");
}

// Windows only launches executables by their .exe name: CreateProcess appends
// .exe to a path without an extension.
export function binaryFileName(base: string, platform: Platform): string {
  return isWindows(platform) ? `${base}.exe` : base;
}
