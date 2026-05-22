// Shared helpers for generating the `upgrades` array in extension model files.
// Handles extracting existing upgrades from on-disk files, diffing globalArgs
// field names to detect schema changes, and generating upgrade entries.

/**
 * Extract existing upgrade entry blocks from a generated model file.
 * Returns each `{ toVersion: ..., ... }` block as a raw string.
 * Returns empty array if no upgrades block is found.
 */
export function extractExistingUpgrades(content: string): string[] {
  const marker = "upgrades: [";
  const startIdx = content.indexOf(marker);
  if (startIdx === -1) return [];

  // Find the matching closing bracket using brace-depth counting
  const arrayStart = startIdx + marker.length;
  let depth = 1;
  let i = arrayStart;
  while (i < content.length && depth > 0) {
    if (content[i] === "[") depth++;
    else if (content[i] === "]") depth--;
    i++;
  }
  const arrayEnd = i - 1; // position of the closing ]

  const arrayContent = content.slice(arrayStart, arrayEnd).trim();
  if (!arrayContent) return [];

  // Split into individual entry blocks by finding each top-level { ... }
  const entries: string[] = [];
  let entryDepth = 0;
  let entryStart = -1;

  for (let j = 0; j < arrayContent.length; j++) {
    const ch = arrayContent[j];
    if (ch === "{" && entryDepth === 0) {
      entryStart = j;
      entryDepth = 1;
    } else if (ch === "{") {
      entryDepth++;
    } else if (ch === "}") {
      entryDepth--;
      if (entryDepth === 0 && entryStart !== -1) {
        entries.push(arrayContent.slice(entryStart, j + 1).trim());
        entryStart = -1;
      }
    }
  }

  return entries;
}

/**
 * Extract top-level field names from the GlobalArgsSchema in a generated file.
 * Looks for `const GlobalArgsSchema = z.object({` and extracts field names
 * at the first indentation level.
 */
export function extractGlobalArgsFieldNames(content: string): string[] {
  const marker = "const GlobalArgsSchema = z.object({";
  const startIdx = content.indexOf(marker);
  if (startIdx === -1) return [];

  const bodyStart = startIdx + marker.length;

  // Find the closing `});` by counting braces
  let depth = 1;
  let i = bodyStart;
  while (i < content.length && depth > 0) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") depth--;
    i++;
  }
  const bodyEnd = i - 1;

  const body = content.slice(bodyStart, bodyEnd);

  // Extract field names: lines that start with `  fieldName:` at 2-space indent
  const fieldNames: string[] = [];
  const lines = body.split("\n");
  for (const line of lines) {
    const match = line.match(/^ {2}([a-zA-Z_][a-zA-Z0-9_]*):\s/);
    if (match) {
      fieldNames.push(match[1]);
    }
  }

  return fieldNames;
}

/**
 * Strip the upgrades block from file content for comparison purposes.
 * This prevents the upgrades array from influencing version change detection.
 */
export function stripUpgradesBlock(content: string): string {
  const marker = "upgrades: [";
  const startIdx = content.indexOf(marker);
  if (startIdx === -1) return content;

  // Find the matching closing bracket
  const arrayStart = startIdx + marker.length;
  let depth = 1;
  let i = arrayStart;
  while (i < content.length && depth > 0) {
    if (content[i] === "[") depth++;
    else if (content[i] === "]") depth--;
    i++;
  }

  // Include the trailing comma, newline, and any blank lines after the block.
  // deno fmt may insert blank lines after multi-entry arrays; stripping them
  // prevents phantom diffs in version change detection.
  let end = i;
  while (
    end < content.length && (content[end] === "," || content[end] === " ")
  ) {
    end++;
  }
  if (end < content.length && content[end] === "\n") {
    end++;
  }
  // Strip any additional blank lines that follow
  while (end < content.length && content[end] === "\n") {
    end++;
  }

  // Find the start of this line (strip leading whitespace line)
  let lineStart = startIdx;
  while (lineStart > 0 && content[lineStart - 1] !== "\n") {
    lineStart--;
  }

  return content.slice(0, lineStart) + content.slice(end);
}

/**
 * Generate a single upgrade entry as a TypeScript string.
 *
 * Added fields are optional in auto-generated models, so they don't need
 * defaults — the field simply won't exist in old data, which is valid for
 * optional fields. Only removed fields need active transformation.
 *
 * @param toVersion - The version this upgrade migrates to
 * @param addedFields - List of field names that were added
 * @param removedFields - List of field names that were removed
 */
export function generateUpgradeEntry(
  toVersion: string,
  addedFields: string[],
  removedFields: string[],
): string {
  const lines: string[] = [];
  lines.push(`    {`);
  lines.push(`      toVersion: "${toVersion}",`);

  // Build description
  const descParts: string[] = [];
  if (addedFields.length > 0) {
    descParts.push(`Added: ${addedFields.join(", ")}`);
  }
  if (removedFields.length > 0) {
    descParts.push(`Removed: ${removedFields.join(", ")}`);
  }
  const description = descParts.length > 0
    ? descParts.join(". ")
    : "No schema changes";
  lines.push(`      description: "${description}",`);

  // Build upgradeAttributes function
  if (removedFields.length === 0) {
    // No-op: added fields are optional, so old data without them is valid
    lines.push(
      `      upgradeAttributes: (old: Record<string, unknown>) => old,`,
    );
  } else {
    // Remove fields that no longer exist in the schema (deduplicate to avoid
    // redeclaring block-scoped variables when nested objects share field names)
    const uniqueRemoved = [...new Set(removedFields)];
    const destructured = uniqueRemoved
      .map((name) => `${name}: _${name}`)
      .join(", ");
    lines.push(
      `      upgradeAttributes: (old: Record<string, unknown>) => {`,
    );
    lines.push(
      `        const { ${destructured}, ...rest } = old;`,
    );
    lines.push(`        return rest;`);
    lines.push(`      },`);
  }

  lines.push(`    }`);
  return lines.join("\n");
}

/**
 * Build the complete `upgrades: [...]` block to insert into a model.
 *
 * @param existingEntries - Raw string blocks from extractExistingUpgrades
 * @param newEntry - A new entry string from generateUpgradeEntry (or null)
 */
export function buildUpgradesBlock(
  existingEntries: string[],
  newEntry: string | null,
): string {
  const allEntries = [...existingEntries];
  if (newEntry) {
    allEntries.push(newEntry);
  }

  if (allEntries.length === 0) return "";

  // Indentation will be normalized by deno fmt after writing.
  const lines: string[] = [];
  lines.push(`  upgrades: [`);
  for (const entry of allEntries) {
    lines.push(entry + ",");
  }
  lines.push(`  ],`);
  return lines.join("\n");
}

/**
 * High-level helper for pipelines: compute the upgrades block for a model.
 *
 * @param status - "new", "changed", or "unchanged" from computeModelVersion
 * @param version - The determined version for this model
 * @param existingContent - Raw content of the existing file (undefined if new)
 * @param newFieldNames - Field names in the new GlobalArgsSchema
 * @returns The upgrades block string to pass to the generator, or undefined
 */
export function computeUpgradesBlock(
  status: "new" | "changed" | "unchanged",
  version: string,
  existingContent: string | undefined,
  newFieldNames: string[],
): string | undefined {
  if (status === "new") {
    // First version — no upgrades needed
    return undefined;
  }

  if (status === "unchanged") {
    if (!existingContent) return undefined;
    const existingEntries = extractExistingUpgrades(existingContent);
    if (existingEntries.length === 0) return undefined;

    // Detect version/upgrade mismatch (e.g. manual version bump without pipeline)
    const lastEntry = existingEntries[existingEntries.length - 1];
    const toVersionMatch = lastEntry.match(/toVersion:\s*"([^"]+)"/);
    if (toVersionMatch && toVersionMatch[1] !== version) {
      const newEntry = generateUpgradeEntry(version, [], []);
      return buildUpgradesBlock(existingEntries, newEntry);
    }

    return buildUpgradesBlock(existingEntries, null);
  }

  // status === "changed" — need to generate a new upgrade entry
  if (!existingContent) return undefined;

  const existingEntries = extractExistingUpgrades(existingContent);
  const oldFieldNames = extractGlobalArgsFieldNames(existingContent);

  // Compute added and removed fields
  const oldSet = new Set(oldFieldNames);
  const newSet = new Set(newFieldNames);

  const addedFields: string[] = [];
  for (const name of newFieldNames) {
    if (!oldSet.has(name)) {
      addedFields.push(name);
    }
  }

  const removedFields: string[] = [];
  for (const name of oldFieldNames) {
    if (!newSet.has(name)) {
      removedFields.push(name);
    }
  }

  const newEntry = generateUpgradeEntry(version, addedFields, removedFields);
  return buildUpgradesBlock(existingEntries, newEntry);
}
