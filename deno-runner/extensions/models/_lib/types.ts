export type Platform =
  | "linux-x64"
  | "linux-arm64"
  | "darwin-x64"
  | "darwin-arm64"
  | "windows-x64";

export interface DenoRunnerLogger {
  debug(msg: string): void;
  info(msg: string): void;
  warn(msg: string): void;
  error(msg: string): void;
}

export interface DataHandle {
  readonly name: string;
  readonly tags?: Record<string, string>;
}

export interface DenoRunnerContext {
  readonly signal: AbortSignal;
  readonly globalArgs: Record<string, unknown>;
  readonly logger: DenoRunnerLogger;
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
