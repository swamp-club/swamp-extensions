// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Shared Workers AI transport for Cloudflare's System One models (Clef and
 * Clairic).
 *
 * Both models are served from the Workers AI REST route
 * `POST /accounts/{account_id}/ai/run/@cf/cloudflare/{model}`. This module
 * resolves Cloudflare credentials the same way as the generated
 * `@swamp/cloudflare/*` models (API token, or the legacy API key plus email),
 * unwraps Cloudflare's `{success, errors, result}` envelope, and retries
 * transient failures with exponential backoff that honours `Retry-After`.
 *
 * The codegen pipeline copies this file into each standalone extension's
 * `extensions/models/_lib/`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";

/** Default Cloudflare API root. */
export const DEFAULT_BASE_URL = "https://api.cloudflare.com/client/v4";

/** Environment variable consulted when no API token is configured. */
export const API_TOKEN_ENV = "CLOUDFLARE_API_TOKEN";

/** Environment variable for the legacy API key auth path. */
export const API_KEY_ENV = "CLOUDFLARE_API_KEY";

/** Environment variable for the legacy API key auth path's account email. */
export const EMAIL_ENV = "CLOUDFLARE_EMAIL";

/** Environment variable consulted when no account ID is configured. */
export const ACCOUNT_ID_ENV = "CLOUDFLARE_ACCOUNT_ID";

/** Maximum embedded images in one request. */
export const MAX_IMAGES = 4;

/** Workers AI model ID for a Cloudflare-namespaced model selector. */
export function workersAiModelId(model: string): string {
  return `@cf/cloudflare/${model}`;
}

// ---------------------------------------------------------------------------
// Global arguments
// ---------------------------------------------------------------------------

/**
 * Connection fields shared by every Workers AI model. Spread into a model's
 * global argument schema.
 */
export const ConnectionArgsShape = {
  apiToken: z.string().min(1).meta({ sensitive: true }).optional().describe(
    `Cloudflare API token with Workers AI Read and Edit permissions; overrides the ${API_TOKEN_ENV} environment variable. Wire with a vault.get(...) expression to source it from a vault.`,
  ),
  apiKey: z.string().min(1).meta({ sensitive: true }).optional().describe(
    `Cloudflare API key for the legacy key+email auth path; overrides the ${API_KEY_ENV} environment variable. Wire with a vault.get(...) expression. Requires email.`,
  ),
  email: z.string().min(1).meta({ sensitive: true }).optional().describe(
    `Cloudflare account email for the legacy key+email auth path; overrides the ${EMAIL_ENV} environment variable. Requires apiKey.`,
  ),
  account_id: z.string().min(1).optional().describe(
    `Cloudflare account ID that runs the model; overrides the ${ACCOUNT_ID_ENV} environment variable.`,
  ),
  baseUrl: z.string().url().default(DEFAULT_BASE_URL).describe(
    "Cloudflare API root. Change only for a proxy or test server.",
  ),
  timeoutMs: z.number().int().positive().default(30_000).describe(
    "Per-attempt HTTP timeout in milliseconds.",
  ),
  maxRetries: z.number().int().min(0).max(10).default(2).describe(
    "Retries after the first attempt on 408/429/5xx/529 or connection errors.",
  ),
};

/** Resolved connection arguments, as a model's global arguments carry them. */
export interface ConnectionArgs {
  apiToken?: string;
  apiKey?: string;
  email?: string;
  account_id?: string;
  baseUrl?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

/** An embedded image: a base64 data URL or a content type plus base64 bytes. */
export const ImageSchema = z.union([
  z.string().regex(/^data:image\/(png|jpeg|webp);base64,/i, {
    message:
      "image strings must be base64 data URLs (data:image/png|jpeg|webp;base64,...); remote URLs are not accepted",
  }),
  z.object({
    content_type: z.enum(["image/png", "image/jpeg", "image/webp"]),
    base64: z.string().min(1),
  }),
]);

/** Resolved type of {@link ImageSchema}. */
export type Image = z.infer<typeof ImageSchema>;

/** Up to {@link MAX_IMAGES} images placed before the state. */
export const ImagesSchema = z.array(ImageSchema).max(MAX_IMAGES, {
  message: `at most ${MAX_IMAGES} images are allowed per request`,
});

/**
 * Parse a JSON string into a value so structured arguments can arrive as
 * `--input key=@file.json` or a plain string; non-strings pass through.
 */
export function parseJsonString(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return value;
  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

// ---------------------------------------------------------------------------
// Credentials
// ---------------------------------------------------------------------------

/** Read an environment variable, returning undefined when unset or not permitted. */
function readEnv(name: string): string | undefined {
  try {
    const value = Deno.env.get(name);
    return value && value.trim().length > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Resolved authentication and account for one request. */
export interface Credentials {
  /** Headers that authenticate the request. Never logged. */
  authHeaders: Record<string, string>;
  /** Account that runs the model. */
  accountId: string;
}

/**
 * Resolve credentials from global arguments or the environment: an API token
 * (preferred), else the legacy API key plus email, plus the account ID.
 *
 * @throws When no credential pair or no account ID is available.
 */
export function resolveCredentials(args: ConnectionArgs): Credentials {
  const problems: string[] = [];
  let authHeaders: Record<string, string> | undefined;
  const apiToken = args.apiToken ?? readEnv(API_TOKEN_ENV);
  if (apiToken) {
    authHeaders = { Authorization: `Bearer ${apiToken}` };
  } else {
    const apiKey = args.apiKey ?? readEnv(API_KEY_ENV);
    const email = args.email ?? readEnv(EMAIL_ENV);
    if (apiKey && email) {
      authHeaders = { "X-Auth-Key": apiKey, "X-Auth-Email": email };
    } else {
      problems.push(
        "Cloudflare credentials not set. Provide an apiToken (recommended) or " +
          "apiKey + email global argument (each wireable with a vault.get(...) " +
          `expression), or set the ${API_TOKEN_ENV} environment variable ` +
          `(recommended) or ${API_KEY_ENV} + ${EMAIL_ENV}.`,
      );
    }
  }
  const accountId = args.account_id ?? readEnv(ACCOUNT_ID_ENV);
  if (!accountId) {
    problems.push(
      `No Cloudflare account ID configured. Set the account_id global argument or the ${ACCOUNT_ID_ENV} environment variable.`,
    );
  }
  if (!authHeaders || !accountId) throw new Error(problems.join(" "));
  return { authHeaders, accountId };
}

/** Pre-flight check body: passes when credentials and an account resolve. */
export function checkCredentials(
  args: ConnectionArgs,
): { pass: boolean; errors?: string[] } {
  try {
    resolveCredentials(args);
    return { pass: true };
  } catch (err) {
    return { pass: false, errors: [(err as Error).message] };
  }
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

/** Structured logger subset used by the client (compatible with LogTape). */
export interface ClientLogger {
  debug(message: string, properties?: Record<string, unknown>): void;
  info(message: string, properties?: Record<string, unknown>): void;
  warning(message: string, properties?: Record<string, unknown>): void;
}

/** Connection settings for the Workers AI REST API. */
export interface ClientConfig extends Credentials {
  /** API root without a trailing slash. */
  baseUrl: string;
  /** Per-attempt timeout in milliseconds. */
  timeoutMs: number;
  /** Retries after the first attempt for retryable failures. */
  maxRetries: number;
  /** Cancellation signal; aborting stops retries immediately. */
  signal?: AbortSignal;
  /** Optional logger for request summaries. */
  logger?: ClientLogger;
  /** Fetch override, mainly for tests. Defaults to `globalThis.fetch`. */
  fetch?: typeof fetch;
  /** Sleep override, mainly for tests. Defaults to a real timer. */
  sleep?: (ms: number, signal?: AbortSignal) => Promise<void>;
}

/** Build a client configuration from global arguments and the method context. */
export function buildClientConfig(
  args: ConnectionArgs,
  logger?: ClientLogger,
  signal?: AbortSignal,
): ClientConfig {
  return {
    ...resolveCredentials(args),
    baseUrl: args.baseUrl ?? DEFAULT_BASE_URL,
    timeoutMs: args.timeoutMs ?? 30_000,
    maxRetries: args.maxRetries ?? 2,
    logger,
    signal,
  };
}

/** HTTP status codes that are retried with backoff. */
export const RETRYABLE_STATUSES: ReadonlySet<number> = new Set([
  408,
  429,
  500,
  502,
  503,
  504,
  529,
]);

const BACKOFF_INITIAL_MS = 500;
const BACKOFF_MAX_MS = 5_000;
const MAX_RETRY_AFTER_MS = 60_000;
const ERROR_BODY_PREVIEW = 500;

/** One entry of a Cloudflare envelope's `errors` array. */
const EnvelopeErrorSchema = z.object({
  code: z.number().optional(),
  message: z.string(),
}).loose();

/** Cloudflare's standard v4 response envelope. */
const EnvelopeSchema = z.object({
  success: z.boolean(),
  errors: z.array(EnvelopeErrorSchema).optional(),
  result: z.unknown().optional(),
}).loose();

/** Error raised when the Cloudflare API returns a failure. */
export class CloudflareApiError extends Error {
  /** HTTP status code of the failed response. */
  readonly status: number;
  /** Parsed (or raw text) response body. */
  readonly body: unknown;

  constructor(operation: string, status: number, body: unknown) {
    super(
      `Cloudflare ${operation} failed with HTTP ${status}: ${
        describeErrorBody(body)
      }`,
    );
    this.name = "CloudflareApiError";
    this.status = status;
    this.body = body;
  }
}

/** Render a response body as a short single-line string for error messages. */
export function previewBody(body: unknown): string {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  const flat = (text ?? "").replace(/\s+/g, " ").trim();
  if (flat.length === 0) return "(empty body)";
  return flat.length > ERROR_BODY_PREVIEW
    ? `${flat.slice(0, ERROR_BODY_PREVIEW)}…`
    : flat;
}

/**
 * Summarise an error body, preferring the messages in a Cloudflare envelope's
 * `errors` array and falling back to a raw preview.
 */
export function describeErrorBody(body: unknown): string {
  const envelope = EnvelopeSchema.safeParse(body);
  if (envelope.success && envelope.data.errors?.length) {
    return envelope.data.errors
      .map((
        e,
      ) => (e.code !== undefined ? `[${e.code}] ${e.message}` : e.message))
      .join("; ");
  }
  return previewBody(body);
}

/**
 * Parse `retry-after-ms` or `Retry-After` into milliseconds.
 * Returns undefined when neither header carries a usable delay.
 */
export function parseRetryAfter(
  headers: Headers,
  now: number = Date.now(),
): number | undefined {
  const rawMs = headers.get("retry-after-ms");
  if (rawMs !== null) {
    const ms = Number(rawMs);
    if (Number.isFinite(ms) && ms >= 0) return ms;
  }
  const raw = headers.get("retry-after");
  if (raw === null) return undefined;
  const seconds = Number(raw);
  if (Number.isFinite(seconds)) {
    return seconds >= 0 ? seconds * 1000 : undefined;
  }
  const date = Date.parse(raw);
  if (!Number.isNaN(date)) return Math.max(0, date - now);
  return undefined;
}

/**
 * Delay before the given zero-based retry attempt: a server-provided
 * `Retry-After` when present and reasonable, otherwise capped exponential
 * backoff with up to 25% jitter.
 */
export function retryDelayMs(
  attempt: number,
  headers?: Headers,
  random: () => number = Math.random,
): number {
  if (headers !== undefined) {
    const retryAfter = parseRetryAfter(headers);
    if (retryAfter !== undefined && retryAfter <= MAX_RETRY_AFTER_MS) {
      return retryAfter;
    }
  }
  const exponential = Math.min(
    BACKOFF_INITIAL_MS * 2 ** attempt,
    BACKOFF_MAX_MS,
  );
  return Math.round(exponential * (1 - random() * 0.25));
}

/** Wait `ms` milliseconds, rejecting with the signal's reason on abort. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(signal?.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** Read a response body as JSON when possible, otherwise as text. */
async function readBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (text.length === 0) return "";
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Whether a thrown fetch error is a network failure or timeout worth retrying. */
function isTransientFetchError(err: unknown): boolean {
  if (err instanceof DOMException) return err.name === "TimeoutError";
  return err instanceof TypeError;
}

/**
 * Perform one JSON request against the API with retry.
 *
 * Retries on {@link RETRYABLE_STATUSES}, connection failures, and per-attempt
 * timeouts, up to `config.maxRetries` extra attempts. A user abort via
 * `config.signal` is never retried.
 */
export async function requestJson(
  config: ClientConfig,
  method: "GET" | "POST",
  path: string,
  operation: string,
  body?: unknown,
): Promise<unknown> {
  const url = `${config.baseUrl.replace(/\/+$/, "")}${path}`;
  const doFetch = config.fetch ??
    ((input, init) => globalThis.fetch(input, init));
  const wait = config.sleep ?? sleep;
  const headers: Record<string, string> = {
    ...config.authHeaders,
    Accept: "application/json",
    "User-Agent": "swamp-cloudflare-workers-ai/1",
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const payload = body === undefined ? undefined : JSON.stringify(body);

  for (let attempt = 0;; attempt++) {
    const retriesLeft = config.maxRetries - attempt;
    config.signal?.throwIfAborted();

    const timeout = AbortSignal.timeout(config.timeoutMs);
    const signal = config.signal
      ? AbortSignal.any([config.signal, timeout])
      : timeout;

    const started = Date.now();
    let response: Response;
    try {
      response = await doFetch(url, { method, headers, body: payload, signal });
    } catch (err) {
      if (config.signal?.aborted) throw config.signal.reason;
      if (retriesLeft <= 0 || !isTransientFetchError(err)) {
        const detail = err instanceof Error ? err.message : String(err);
        throw new Error(
          `Cloudflare ${operation} failed: could not reach ${url} (${detail})`,
        );
      }
      const delay = retryDelayMs(attempt);
      config.logger?.warning(
        "Cloudflare {operation} attempt {attempt} failed to connect; retrying in {delayMs}ms",
        { operation, attempt: attempt + 1, delayMs: delay },
      );
      await wait(delay, config.signal);
      continue;
    }

    const parsed = await readBody(response);
    config.logger?.debug(
      "Cloudflare {operation} responded {status} in {ms}ms",
      { operation, status: response.status, ms: Date.now() - started },
    );
    if (response.ok) return parsed;

    if (retriesLeft <= 0 || !RETRYABLE_STATUSES.has(response.status)) {
      throw new CloudflareApiError(operation, response.status, parsed);
    }
    const delay = retryDelayMs(attempt, response.headers);
    config.logger?.warning(
      "Cloudflare {operation} returned {status}; retrying in {delayMs}ms",
      { operation, status: response.status, delayMs: delay },
    );
    await wait(delay, config.signal);
  }
}

/**
 * Unwrap Cloudflare's `{success, errors, result}` envelope. A body without the
 * envelope (for example from a gateway that returns the raw model output) is
 * passed through unchanged.
 *
 * @throws {CloudflareApiError} When the envelope reports `success: false`.
 */
export function unwrapEnvelope(
  raw: unknown,
  operation: string,
  status = 200,
): unknown {
  const envelope = EnvelopeSchema.safeParse(raw);
  if (!envelope.success) return raw;
  if (!envelope.data.success) {
    throw new CloudflareApiError(operation, status, raw);
  }
  return envelope.data.result;
}

/**
 * Run a Cloudflare-namespaced Workers AI model and validate its result.
 *
 * @returns The unwrapped result, parsed with `schema`.
 * @throws {CloudflareApiError} On a failed response after retries.
 */
export async function runModel<T>(
  config: ClientConfig,
  model: string,
  body: Record<string, unknown>,
  schema: z.ZodType<T>,
  operation: string,
): Promise<T> {
  const path = `/accounts/${encodeURIComponent(config.accountId)}/ai/run/${
    workersAiModelId(model)
  }`;
  const raw = await requestJson(config, "POST", path, operation, body);
  const result = unwrapEnvelope(raw, operation);
  const parsed = schema.safeParse(result);
  if (!parsed.success) {
    throw new Error(
      `${operation} returned an unexpected response shape: ${parsed.error.message}. Body: ${
        previewBody(raw)
      }`,
    );
  }
  return parsed.data;
}

/** Throw when a response is missing an answer for any requested key. */
export function assertAllAnswered(
  operation: string,
  requested: string[],
  answers: Record<string, unknown>,
): void {
  const missing = requested.filter((id) => !(id in answers));
  if (missing.length > 0) {
    throw new Error(
      `${operation} response is missing answers for: ${missing.join(", ")}`,
    );
  }
}
