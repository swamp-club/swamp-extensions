export interface AwsEnrichment {
  /** CloudFormation type name, e.g., "AWS::RDS::DBCluster" */
  cfTypeName: string;
  /** Additional npm packages to add to the service's deno.json imports */
  npmImports: Record<string, string>;
  /** Absolute path to the enrichment source file (real TypeScript, type-checkable) */
  sourceFile: string;
  /** Name of the enrichState function export */
  functionExport: string;
  /** Extra field(s) to add inside the StateSchema z.object({}) block */
  stateFields: string;
}

export interface ParsedEnrichmentSource {
  /** Import lines to add to the generated model (SDK imports from the source) */
  imports: string[];
  /** The body code (schemas + function) with export keywords stripped */
  body: string;
}

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

    // Strip `export` from declarations
    const stripped = line
      .replace(/^export const /, "const ")
      .replace(/^export async function /, "async function ")
      .replace(/^export function /, "function ");

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
