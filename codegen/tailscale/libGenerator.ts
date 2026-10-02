// Generates _lib/tailscale.ts — the shared HTTP client and helpers for
// Tailscale models. The source lives in runtime/tailscale.ts as a real module
// (so codegen checks, lints and tests it); this copies it under a header.

import { generateCopyrightHeader } from "../shared/licenseGenerator.ts";

const RUNTIME_SOURCE = new URL("./runtime/tailscale.ts", import.meta.url);

/** Generates the shared helper file that all Tailscale models import. */
export function generateTailscaleLibFile(): string {
  const source = Deno.readTextFileSync(RUNTIME_SOURCE)
    // Drop the source file's own header comment; the generated banner below
    // replaces it.
    .replace(/^(\/\/.*\n)+\n/, "");
  return `${generateCopyrightHeader()}

// Auto-generated shared helper for Tailscale extension models.
// Do not edit manually. Re-generate with: deno task generate:tailscale

${source}`;
}
