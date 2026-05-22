import type { ParsedEnrichmentSource } from "./types.ts";

/**
 * Reads an enrichment source file and splits it into imports and body.
 * Strips the lint directive line, the zod import (already in the model),
 * and `export` keywords from declarations.
 */
export async function parseEnrichmentSource(
  sourceFile: string,
): Promise<ParsedEnrichmentSource> {
  const content = await Deno.readTextFile(sourceFile);
  const lines = content.split("\n");

  const importLines: string[] = [];
  const bodyLines: string[] = [];
  let inImports = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip lint directive
    if (line.startsWith("// deno-lint-ignore-file")) continue;

    if (inImports) {
      // Skip blank lines in import section
      if (line.trim() === "") continue;

      // Check if this is an import statement
      if (line.startsWith("import ")) {
        // Collect the full import (may span multiple lines)
        let fullImport = line;
        while (!fullImport.includes(";") && i + 1 < lines.length) {
          i++;
          fullImport += "\n" + lines[i];
        }

        // Skip the zod import (the generated model already imports zod)
        if (fullImport.includes('"npm:zod@')) continue;

        importLines.push(fullImport);
        continue;
      }

      // First non-import, non-blank line — switch to body mode
      inImports = false;
    }

    // Strip `export` keyword from any declaration
    const stripped = line.replace(/^export /, "");

    bodyLines.push(stripped);
  }

  // Trim trailing blank lines
  while (
    bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === ""
  ) {
    bodyLines.pop();
  }

  return { imports: importLines, body: bodyLines.join("\n") };
}
