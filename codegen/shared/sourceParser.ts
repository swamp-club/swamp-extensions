export interface ParsedSource {
  /** Import lines to add to the generated model (SDK imports from the source) */
  imports: string[];
  /** The body code (schemas + functions) with export keywords stripped */
  body: string;
}

/**
 * Reads a source file and splits it into imports and body.
 * Strips lint directives, zod imports, export keywords, and trailing blanks.
 * When stripAwsLib is true, also strips imports referencing `_lib/aws`.
 */
export async function parseSourceFile(
  sourceFile: string,
  options?: { stripAwsLib?: boolean },
): Promise<ParsedSource> {
  const content = await Deno.readTextFile(sourceFile);
  const lines = content.split("\n");

  const importLines: string[] = [];
  const bodyLines: string[] = [];
  let inImports = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("// deno-lint-ignore-file")) continue;

    if (inImports) {
      if (line.trim() === "") continue;

      if (line.startsWith("import ")) {
        let fullImport = line;
        while (!fullImport.includes(";") && i + 1 < lines.length) {
          i++;
          fullImport += "\n" + lines[i];
        }

        if (fullImport.includes('"npm:zod@')) continue;
        if (options?.stripAwsLib && fullImport.includes("_lib/aws")) continue;

        importLines.push(fullImport);
        continue;
      }

      inImports = false;
    }

    const stripped = line.replace(/^export /, "");
    bodyLines.push(stripped);
  }

  while (
    bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === ""
  ) {
    bodyLines.pop();
  }

  return { imports: importLines, body: bodyLines.join("\n") };
}
