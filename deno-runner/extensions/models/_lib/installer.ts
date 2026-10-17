import {
  type Entry,
  type FileEntry,
  Uint8ArrayReader,
  Uint8ArrayWriter,
  ZipReader,
} from "jsr:@zip-js/zip-js@2.8.22";
import type { DenoRunnerLogger, Platform } from "./types.ts";

const DOWNLOAD_BASE = "https://dl.deno.land/release";

const CACHE_DIR_NAME = ".swamp/deno-runner/bin";

function archiveFilename(platform: Platform): string {
  const mapping: Record<Platform, string> = {
    "linux-x64": "deno-x86_64-unknown-linux-gnu.zip",
    "linux-arm64": "deno-aarch64-unknown-linux-gnu.zip",
    "darwin-x64": "deno-x86_64-apple-darwin.zip",
    "darwin-arm64": "deno-aarch64-apple-darwin.zip",
    "windows-x64": "deno-x86_64-pc-windows-msvc.zip",
  };
  return mapping[platform];
}

function isWindows(platform: Platform): boolean {
  return platform.startsWith("windows-");
}

// Windows only launches executables by their .exe name, and the Windows
// release zip holds deno.exe.
function denoFileName(platform: Platform): string {
  return isWindows(platform) ? "deno.exe" : "deno";
}

function downloadUrl(version: string, platform: Platform): string {
  return `${DOWNLOAD_BASE}/v${version}/${archiveFilename(platform)}`;
}

function checksumUrl(version: string, platform: Platform): string {
  return `${DOWNLOAD_BASE}/v${version}/${archiveFilename(platform)}.sha256`;
}

export async function tryVerifyChecksum(
  binaryData: Uint8Array,
  version: string,
  platform: Platform,
  signal?: AbortSignal,
  baseUrl?: string,
): Promise<"verified" | "skipped"> {
  const url = baseUrl
    ? `${baseUrl}/v${version}/${archiveFilename(platform)}.sha256`
    : checksumUrl(version, platform);

  const resp = await fetch(url, { signal });
  if (!resp.ok) {
    await resp.body?.cancel();
    return "skipped";
  }
  const text = await resp.text();
  const expectedHash = text.trim().split(/\s+/)[0];

  if (!expectedHash) {
    return "skipped";
  }

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array(binaryData).buffer as ArrayBuffer,
  );
  const actualHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (actualHash !== expectedHash) {
    throw new Error(
      `Checksum mismatch for Deno ${version}.\n` +
        `  Expected: ${expectedHash}\n` +
        `  Got:      ${actualHash}`,
    );
  }

  return "verified";
}

// Unpacks the binary in process, so no unzip tool is needed (a stock Windows
// host has none).
export async function extractDenoFromZip(
  zipData: Uint8Array,
  fileName: string,
  destPath: string,
): Promise<void> {
  const reader = new ZipReader(new Uint8ArrayReader(zipData), {
    useWebWorkers: false,
  });
  try {
    const entries: Entry[] = await reader.getEntries();
    const entry = entries.find((e): e is FileEntry =>
      !e.directory && e.filename === fileName
    );
    if (!entry) {
      throw new Error(
        `Failed to extract Deno binary: ${fileName} not found in archive`,
      );
    }
    const data = await entry.getData(new Uint8ArrayWriter());
    await Deno.writeFile(destPath, data);
  } finally {
    // A close error must not hide the extraction error above.
    await reader.close().catch(() => {});
  }
}

export async function ensureDeno(
  version: string,
  baseDir: string,
  platform: Platform,
  signal?: AbortSignal,
  logger?: DenoRunnerLogger,
): Promise<string> {
  const cacheDir = `${baseDir}/${CACHE_DIR_NAME}`;
  const dir = `${cacheDir}/${version}`;
  const fileName = denoFileName(platform);
  const binaryPath = `${dir}/${fileName}`;

  try {
    await Deno.stat(binaryPath);
    return binaryPath;
  } catch {
    // Not cached — download
  }

  await Deno.mkdir(dir, { recursive: true });

  const url = downloadUrl(version, platform);
  const resp = await fetch(url, { signal });
  if (!resp.ok) {
    await resp.body?.cancel();
    throw new Error(
      `Failed to download Deno ${version} for ${platform}: ` +
        `${resp.status} ${resp.statusText}`,
    );
  }

  const zipData = new Uint8Array(await resp.arrayBuffer());

  const checksumStatus = await tryVerifyChecksum(
    zipData,
    version,
    platform,
    signal,
  );
  if (checksumStatus === "skipped" && logger) {
    logger.warn(
      `Checksum verification skipped for Deno ${version} — no checksum file available`,
    );
  }

  const tmpDir = `${dir}/extract.${crypto.randomUUID()}`;
  try {
    await Deno.mkdir(tmpDir, { recursive: true });
    const extractedBinary = `${tmpDir}/${fileName}`;
    await extractDenoFromZip(zipData, fileName, extractedBinary);
    if (!isWindows(platform)) {
      await Deno.chmod(extractedBinary, 0o755);
    }
    await Deno.rename(extractedBinary, binaryPath);
  } catch (error) {
    try {
      await Deno.remove(binaryPath);
    } catch {
      // best-effort cleanup
    }
    throw error;
  } finally {
    try {
      await Deno.remove(tmpDir, { recursive: true });
    } catch {
      // best-effort cleanup
    }
  }

  return binaryPath;
}

export function detectPlatform(
  os: string = Deno.build.os,
  arch: string = Deno.build.arch,
): Platform {
  const osKey = os === "darwin"
    ? "darwin"
    : os === "linux"
    ? "linux"
    : os === "windows"
    ? "windows"
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

  // Deno publishes no Windows ARM64 build.
  if (osKey === "windows" && archKey !== "x64") {
    throw new Error(
      `Unsupported platform: Deno publishes no Windows build for ${arch}`,
    );
  }

  return `${osKey}-${archKey}` as Platform;
}
