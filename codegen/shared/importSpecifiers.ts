/**
 * Detects bare import specifiers in generated source.
 *
 * The swamp-club registry scorer cannot resolve bare names (`zod`,
 * `@std/path`) through a deno.json import map, so an extension that uses
 * them publishes unscored. Generated models must import with explicit
 * `npm:` / `jsr:` specifiers or relative paths; generator tests use this to
 * keep it that way.
 */

const EXPLICIT_PREFIXES = [
  "./",
  "../",
  "/",
  "npm:",
  "jsr:",
  "node:",
  "http:",
  "https:",
];

// Static `import ... from` / `export ... from` at the start of a line. The
// clause between keyword and `from` is limited to identifiers, braces,
// commas, `*` and whitespace, so prose such as `.describe("copied from 'x'")`
// never matches.
const STATIC_FROM =
  /^(?:import|export)\s+(?:type\s+)?[\w$*{},\s]*?\bfrom\s*["']([^"']+)["']/gm;
// Side-effect `import "x";`.
const SIDE_EFFECT = /^import\s*["']([^"']+)["']/gm;
// Dynamic `import("x")`.
const DYNAMIC = /\bimport\(\s*["']([^"']+)["']\s*\)/g;

/** Returns every bare specifier imported by `source`, in order of appearance. */
export function findBareSpecifiers(source: string): string[] {
  const found: { index: number; specifier: string }[] = [];
  for (const pattern of [STATIC_FROM, SIDE_EFFECT, DYNAMIC]) {
    for (const match of source.matchAll(pattern)) {
      const specifier = match[1];
      if (!EXPLICIT_PREFIXES.some((prefix) => specifier.startsWith(prefix))) {
        found.push({ index: match.index ?? 0, specifier });
      }
    }
  }
  return found.sort((a, b) => a.index - b.index).map((f) => f.specifier);
}
