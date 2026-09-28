import type { AgentProvider } from "./types.ts";

export function resolveApiKey(
  provider: AgentProvider,
  globalArgs: {
    apiKey?: string;
    apiKeyEnvVar?: string;
  },
): string {
  if (globalArgs.apiKey) {
    return globalArgs.apiKey;
  }

  const envVar = globalArgs.apiKeyEnvVar ?? provider.defaultApiKeyEnvVar;
  const value = Deno.env.get(envVar);
  if (value) {
    return value;
  }

  throw new Error(
    `No API key found for provider '${provider.name}'. ` +
      `Set the ${envVar} environment variable, ` +
      `configure apiKey via a vault reference in global arguments, ` +
      `or set apiKeyEnvVar to a custom environment variable name.`,
  );
}

/**
 * Resolves the API key to inject into the agent subprocess, or undefined when
 * the provider CLI should authenticate with its own stored login.
 */
export function resolveAuthKey(
  provider: AgentProvider,
  globalArgs: {
    auth?: "apiKey" | "cli";
    apiKey?: string;
    apiKeyEnvVar?: string;
  },
): string | undefined {
  if (globalArgs.auth !== "cli") {
    return resolveApiKey(provider, globalArgs);
  }

  if (!provider.supportsCliAuth) {
    throw new Error(
      `Provider '${provider.name}' does not support auth 'cli'. ` +
        `Use auth 'apiKey' instead.`,
    );
  }

  if (globalArgs.apiKey || globalArgs.apiKeyEnvVar) {
    throw new Error(
      `auth 'cli' cannot be combined with apiKey or apiKeyEnvVar. ` +
        `Remove them to use the ${provider.name} CLI's stored login, ` +
        `or set auth to 'apiKey'.`,
    );
  }

  return undefined;
}
