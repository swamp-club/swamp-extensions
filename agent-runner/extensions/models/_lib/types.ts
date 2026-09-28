import type { z } from "npm:zod@4.3.6";

export type Platform =
  | "linux-x64"
  | "linux-arm64"
  | "darwin-x64"
  | "darwin-arm64";

export interface AgentProvider {
  readonly name: string;
  readonly defaultApiKeyEnvVar: string;
  readonly supportsCliAuth: boolean;
  readonly configSchema: z.ZodType;

  ensureBinary(
    version: string,
    cacheDir: string,
    platform: Platform,
    signal?: AbortSignal,
  ): Promise<string>;

  buildArgs(
    request: AgentRunRequest,
    providerConfig: Record<string, unknown>,
  ): string[];

  apiKeyEnvName(providerConfig: Record<string, unknown>): string;

  outputInstructions(outputPath: string): string;
}

export interface AgentRunRequest {
  readonly prompt: string;
  readonly model: string | undefined;
  readonly workingDir: string;
  readonly additionalDirs: string[];
  readonly outputPath: string;
  readonly readOnly: boolean;
}

export interface ReviewResult {
  readonly verdict: "pass" | "fail";
  readonly body: string;
  readonly findings: Finding[];
  readonly highestSeverity: "critical" | "high" | "medium" | "low" | "none";
}

export interface Finding {
  readonly severity: "critical" | "high" | "medium" | "low";
  readonly file: string;
  readonly line?: number;
  readonly description: string;
  readonly example?: string;
  readonly suggestion?: string;
}

export interface DataHandle {
  readonly name: string;
  readonly tags?: Record<string, string>;
}

export interface AgentRunnerLogger {
  debug(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

export interface AgentRunnerContext {
  readonly signal: AbortSignal;
  readonly globalArgs: Record<string, unknown>;
  readonly logger: AgentRunnerLogger;
  writeResource(
    specName: string,
    name: string,
    data: Record<string, unknown>,
    overrides?: { tags?: Record<string, string> },
  ): Promise<DataHandle>;
  readResource(
    name: string,
    version?: number,
  ): Promise<Record<string, unknown> | null>;
}
