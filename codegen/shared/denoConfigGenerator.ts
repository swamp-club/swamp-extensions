// Generates deno.json for output extension packages.
//
// Generated source imports with explicit `npm:` specifiers, never bare
// names: the swamp.club scorer cannot resolve a bare name through an import
// map (generator tests enforce this with findBareSpecifiers). The import map
// mirrors those specifiers for local tooling, and `no-import-prefix` is
// excluded so `deno lint` accepts the explicit specifiers — matching the
// hand-written datastore / vault extensions.
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
    "zod": "npm:zod@4.6.7",
    "@aws-sdk/client-cloudcontrol": "npm:@aws-sdk/client-cloudcontrol@3.1156.0",
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
    "zod": "npm:zod@4.6.7",
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
        "zod": "npm:zod@4.6.7",
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
        "zod": "npm:zod@4.6.7",
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
        "zod": "npm:zod@4.6.7",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a Vercel extension package.
 */
export function generateVercelDenoConfig(): string {
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports: {
        "zod": "npm:zod@4.6.7",
      },
    },
    null,
    2,
  ) + "\n";
}

/**
 * Generates a deno.json with import mappings for a Tailscale extension package.
 */
export function generateTailscaleDenoConfig(): string {
  return JSON.stringify(
    {
      lint: LINT_CONFIG,
      imports: {
        "zod": "npm:zod@4.6.7",
      },
    },
    null,
    2,
  ) + "\n";
}
