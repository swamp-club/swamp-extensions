// Shared CalVer version helpers for model generation pipelines.

import { stripUpgradesBlock } from "./upgradesGenerator.ts";

/**
 * Format a file using deno fmt via a temp file.
 * The `ext` parameter controls the temp file extension (e.g., ".ts", ".md").
 * Returns the formatted content string.
 */
export async function formatFile(
  content: string,
  ext: string,
): Promise<string> {
  const tmpFile = await Deno.makeTempFile({ suffix: ext });
  try {
    await Deno.writeTextFile(tmpFile, content);
    const cmd = new Deno.Command("deno", {
      args: ["fmt", "--no-config", tmpFile],
    });
    const result = await cmd.output();
    if (!result.success) {
      // If fmt fails, return the original content
      return content;
    }
    return await Deno.readTextFile(tmpFile);
  } finally {
    try {
      await Deno.remove(tmpFile);
    } catch { /* ignore cleanup errors */ }
  }
}

/**
 * Format TypeScript code using deno fmt via a temp file.
 * Returns the formatted code string.
 */
export function formatCode(code: string): Promise<string> {
  return formatFile(code, ".ts");
}

/**
 * Computes the CalVer version for a model file.
 * Formats the candidate, then compares against the existing file (both with
 * versions replaced by a placeholder). If content is identical, keeps the
 * existing version. Otherwise bumps the micro segment.
 */
export interface ModelVersionResult {
  version: string;
  status: "new" | "changed" | "unchanged";
  /** The raw content of the existing file, if it exists. */
  existingContent?: string;
}

export async function computeModelVersion(
  outputDir: string,
  filePath: string,
  datePrefix: string,
  candidateCode: string,
  placeholderVersion: string,
): Promise<ModelVersionResult> {
  const fullPath = `${outputDir}/${filePath}`;
  try {
    const existingContent = await Deno.readTextFile(fullPath);

    // Extract the existing version
    const versionMatch = existingContent.match(
      /version:\s*"(\d{4}\.\d{2}\.\d{2})\.(\d+)"/,
    );
    if (!versionMatch) return { version: `${datePrefix}.1`, status: "changed" };

    const existingDate = versionMatch[1];
    const existingMicro = parseInt(versionMatch[2], 10);
    const existingVersion = `${existingDate}.${existingMicro}`;

    // Format the candidate so both sides are in the same state
    const formattedCandidate = await formatCode(candidateCode);

    // Replace versions with placeholder in both for comparison.
    // Strip the upgrades block so it doesn't influence change detection.
    const normalizedExisting = stripUpgradesBlock(
      existingContent.replaceAll(
        `"${existingVersion}"`,
        `"${placeholderVersion}"`,
      ),
    );
    const normalizedCandidate = stripUpgradesBlock(
      formattedCandidate.replaceAll(
        `"${placeholderVersion}"`,
        `"${placeholderVersion}"`,
      ),
    );

    if (normalizedExisting === normalizedCandidate) {
      // Content unchanged — keep existing version
      return { version: existingVersion, status: "unchanged", existingContent };
    }

    // Content changed — bump micro if same date, otherwise .1
    const version = existingDate === datePrefix
      ? `${datePrefix}.${existingMicro + 1}`
      : `${datePrefix}.1`;
    return { version, status: "changed", existingContent };
  } catch {
    // File doesn't exist — first generation
    return { version: `${datePrefix}.1`, status: "new" };
  }
}

/**
 * Strip the releaseNotes block from a YAML manifest string.
 * Release notes are per-run (they list what changed THIS run), so including
 * them in the content comparison would cause a version bump every time the
 * set of changed models differs from the previous run.
 */
export function stripReleaseNotes(content: string): string {
  return content.replace(
    new RegExp("releaseNotes:[^\\n]*\\n(?: {2}[^\\n]*\\n)*", "g"),
    "",
  );
}

/**
 * Computes the CalVer version for the manifest file.
 * Same logic as model versions but no formatting needed (YAML is deterministic).
 */
export async function computeManifestVersion(
  outputDir: string,
  filePath: string,
  datePrefix: string,
  candidateContent: string,
  placeholderVersion: string,
  hasChangedModels = false,
): Promise<string> {
  const fullPath = `${outputDir}/${filePath}`;
  try {
    const existingContent = await Deno.readTextFile(fullPath);

    const versionMatch = existingContent.match(
      /version:\s*"(\d{4}\.\d{2}\.\d{2})\.(\d+)"/,
    );
    if (!versionMatch) return `${datePrefix}.1`;

    const existingDate = versionMatch[1];
    const existingMicro = parseInt(versionMatch[2], 10);
    const existingVersion = `${existingDate}.${existingMicro}`;

    // Strip release notes before comparison — they reflect what changed in
    // a particular run, so they always differ from the previous run's notes
    // and would cause spurious version bumps.
    const normalizedExisting = stripReleaseNotes(
      existingContent.replaceAll(
        `"${existingVersion}"`,
        `"${placeholderVersion}"`,
      ),
    );
    const normalizedCandidate = stripReleaseNotes(
      candidateContent.replaceAll(
        `"${placeholderVersion}"`,
        `"${placeholderVersion}"`,
      ),
    );

    if (normalizedExisting === normalizedCandidate && !hasChangedModels) {
      return existingVersion;
    }

    if (existingDate === datePrefix) {
      return `${datePrefix}.${existingMicro + 1}`;
    }
    return `${datePrefix}.1`;
  } catch {
    return `${datePrefix}.1`;
  }
}
