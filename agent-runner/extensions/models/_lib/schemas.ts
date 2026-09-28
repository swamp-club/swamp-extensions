import { z } from "npm:zod@4.3.6";

export const GlobalArgsSchema = z.object({
  provider: z.enum(["claude", "codex"]).default("claude")
    .describe("Which agent provider to use"),
  version: z.string().min(1).regex(/^[a-zA-Z0-9._-]+$/)
    .describe("CLI version to install and use (e.g. '2.1.150' for Claude)"),
  auth: z.enum(["apiKey", "cli"]).default("apiKey")
    .describe(
      "How the agent authenticates: 'apiKey' (default) passes an API key; " +
        "'cli' uses the provider CLI's own stored login (claude only)",
    ),
  apiKey: z.string().optional().meta({ sensitive: true })
    .describe("API key for the provider (prefer apiKeyEnvVar or vault)"),
  apiKeyEnvVar: z.string().optional()
    .describe(
      "Environment variable containing the API key (e.g. ANTHROPIC_API_KEY)",
    ),
  defaultModel: z.string().optional()
    .describe("Default model to use when not overridden per-invocation"),
});

export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

export const FindingSchema = z.object({
  severity: z.enum(["critical", "high", "medium", "low"]),
  file: z.string(),
  line: z.number().int().positive().optional(),
  description: z.string(),
  example: z.string().optional(),
  suggestion: z.string().optional(),
});

export const ReviewResultSchema = z.object({
  verdict: z.enum(["pass", "fail"]),
  body: z.string(),
  findings: z.array(FindingSchema),
  highestSeverity: z.enum(["critical", "high", "medium", "low", "none"]),
});

export const ReviewProfileSchema = z.object({
  promptFile: z.string()
    .describe("Path to the prompt template file"),
  defaultModel: z.string().optional()
    .describe("Default model for this profile (overrides global default)"),
  readOnly: z.boolean().default(true)
    .describe("Whether the agent should have read-only access"),
  providerConfig: z.record(z.string(), z.unknown()).optional()
    .describe(
      "Provider-specific config keyed by provider name, e.g. {claude: {allowedTools: [...]}}. Top-level keys that don't match the active provider are ignored.",
    ),
});

export type ReviewProfile = z.infer<typeof ReviewProfileSchema>;

export const ReviewArgsSchema = z.object({
  profile: z.string().optional()
    .describe("Name of a reviewProfile resource to use"),
  promptFile: z.string().optional()
    .describe("Path to prompt template (overrides profile if both given)"),
  model: z.string().optional()
    .describe("Model to use (overrides profile and global defaults)"),
  files: z.array(z.string()).optional()
    .describe(
      "List of files to include in the review. The agent reads each file " +
        "individually using CLI tools. Required when diff is not provided",
    ),
  diff: z.string().min(1).optional()
    .describe(
      "Diff content to include inline in the prompt. The agent reviews the " +
        "changes directly without reading files from the repo. Required when " +
        "files is not provided",
    ),
  readOnly: z.boolean().optional()
    .describe("Whether the agent should have read-only access"),
  providerConfig: z.record(z.string(), z.unknown()).optional()
    .describe("Provider-specific config (overrides profile if both given)"),
});

export type ReviewArgs = z.infer<typeof ReviewArgsSchema>;

export const RunArgsSchema = z.object({
  prompt: z.string()
    .describe("Prompt to send to the agent"),
  model: z.string().optional()
    .describe("Model to use (overrides global default)"),
  readOnly: z.boolean().default(true)
    .describe("Whether the agent should have read-only access"),
  providerConfig: z.record(z.string(), z.unknown()).optional()
    .describe("Provider-specific configuration"),
});

export type RunArgs = z.infer<typeof RunArgsSchema>;

export const RunResultSchema = z.object({
  output: z.string(),
  exitCode: z.number().int(),
});
