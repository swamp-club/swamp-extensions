// Generates deno.json for output extension packages.
// Provides import mappings so bare specifiers resolve correctly
// both for swamp's bundler and for local type-checking.

// The publish pipeline enforces `no-import-prefix`, so bare specifiers in
// generated source files need to be resolved through an import map. Our
// generated source uses full `npm:` specifiers directly (so
// `deno doc --lint` can resolve zod standalone, which the swamp.club scorer
// requires). To keep both checks happy, we also exclude `no-import-prefix`
// from the generated deno.json — matching the pattern the hand-written
// datastore / vault extensions already use.
const LINT_CONFIG = {
  rules: {
    exclude: ["no-import-prefix"],
  },
} as const;

/**
 * Generates a deno.json with import mappings for an AWS extension package.
 * When additionalImports is provided, those entries are merged into the
 * imports map (e.g. service-specific SDK packages for enrichments).
 */
export function generateAwsDenoConfig(
  additionalImports: Record<string, string> = {},
): string {
  const imports: Record<string, string> = {
    "zod": "npm:zod@4.3.6",
    "@aws-sdk/client-cloudcontrol": "npm:@aws-sdk/client-cloudcontrol@3.1021.0",
    "fast-json-patch": "npm:fast-json-patch@3.1.1",
    ...additionalImports,
  };
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports,
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a GCP extension package.
 * When additionalImports is provided, those entries are merged into the
 * imports map (e.g. service-specific SDK packages for enrichments).
 */
export function generateGcpDenoConfig(
  additionalImports: Record<string, string> = {},
): string {
  const imports: Record<string, string> = {
    "zod": "npm:zod@4.3.6",
    ...additionalImports,
  };
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports,
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a Hetzner extension package.
 */
export function generateHetznerDenoConfig(): string {
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports: {
        "zod": "npm:zod@4.3.6",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a DigitalOcean extension package.
 */
export function generateDigitalOceanDenoConfig(): string {
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports: {
        "zod": "npm:zod@4.3.6",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a Cloudflare extension package.
 */
export function generateCloudflareDenoConfig(): string {
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports: {
        "zod": "npm:zod@4.3.6",
      },
    },
    null,
    2,
  ) + "\n";
}
