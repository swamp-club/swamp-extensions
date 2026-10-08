// Generates manifest.yaml for a swamp extension package

export interface ManifestInput {
  /** Extension name, e.g., "hetzner-cloud" */
  name: string;
  /** CalVer version string */
  version: string;
  /** Human-readable description */
  description: string;
  /** Labels for discovery */
  labels: string[];
  /** Model file paths relative to extensions/models/, e.g., ["servers.ts", "ssh_keys.ts"] */
  modelFiles: string[];
  /** Optional release notes describing model changes */
  releaseNotes?: string;
  /** Optional additional files to include in the package (e.g., ["README.md", "LICENSE.txt"]) */
  additionalFiles?: string[];
  /** Public repository URL (GitHub/GitLab/Codeberg/Bitbucket) for the verification factor */
  repository?: string;
  /**
   * Platforms the extension supports. An empty array means "all platforms",
   * which earns both platform factors on the quality scorecard.
   */
  platforms?: string[];
}

/** First line of every generated manifest; marks a directory as codegen output. */
export const GENERATED_MANIFEST_HEADER =
  "# Auto-generated manifest. Re-generate with the appropriate deno task.";

/**
 * Generates a manifest.yaml string for a swamp extension.
 */
export function generateManifest(input: ManifestInput): string {
  const lines: string[] = [
    GENERATED_MANIFEST_HEADER,
    `manifestVersion: 1`,
    `name: "${input.name}"`,
    `version: "${input.version}"`,
    `description: "${input.description}"`,
  ];

  if (input.repository) {
    lines.push(`repository: "${input.repository}"`);
  }

  lines.push(`labels:`);
  for (const label of input.labels) {
    lines.push(`  - ${label}`);
  }

  if (input.releaseNotes) {
    lines.push(`releaseNotes: |`);
    for (const noteLine of input.releaseNotes.split("\n")) {
      lines.push(`  ${noteLine}`);
    }
  }

  lines.push(`models:`);
  for (const file of input.modelFiles.sort()) {
    lines.push(`  - ${file}`);
  }

  if (input.additionalFiles && input.additionalFiles.length > 0) {
    lines.push(`additionalFiles:`);
    for (const file of input.additionalFiles.sort()) {
      lines.push(`  - ${file}`);
    }
  }

  if (input.platforms !== undefined) {
    if (input.platforms.length === 0) {
      lines.push(`platforms: []`);
    } else {
      lines.push(`platforms:`);
      for (const platform of input.platforms) {
        lines.push(`  - ${platform}`);
      }
    }
  }

  lines.push(""); // trailing newline
  return lines.join("\n");
}
