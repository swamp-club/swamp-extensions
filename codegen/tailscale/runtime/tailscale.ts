// Shared HTTP client and helpers for Tailscale extension models.
//
// This file is the source for the generated `_lib/tailscale.ts` in each
// Tailscale package: libGenerator.ts copies it verbatim under a copyright
// header. It lives here as a real module so codegen's own check, lint and
// tests cover it.

/** Credentials and connection settings shared by every Tailscale model. */
export interface TailscaleArgs {
  apiKey?: string;
  oauthClientId?: string;
  oauthClientSecret?: string;
  oauthScopes?: string[];
  tailnet?: string;
  baseUrl?: string;
}

/** A parsed API response. */
export interface ApiResponse {
  status: number;
  headers: Headers;
  /** Parsed JSON body, or the raw text for non-JSON responses */
  data: unknown;
}

/** Options for a single API request. */
export interface RequestOptions {
  /** JSON request body */
  body?: unknown;
  /** Raw request body, sent as-is with `contentType` */
  rawBody?: string;
  contentType?: string;
  accept?: string;
  headers?: Record<string, string>;
  query?: Record<string, string | undefined>;
  /** Statuses returned to the caller instead of raising */
  allowStatus?: number[];
  /** Return the body as text, never parsed as JSON */
  raw?: boolean;
}

const DEFAULT_BASE_URL = "https://api.tailscale.com";
const MAX_RETRIES = 3;
/** Longest a single request may take before it is aborted */
const REQUEST_TIMEOUT_MS = 60_000;
/** Longest a Retry-After header may make a request wait */
const MAX_RETRY_DELAY_MS = 60_000;
/** Refresh an OAuth access token this long before it expires */
const TOKEN_REFRESH_MARGIN_MS = 60_000;

const tokenCache = new Map<string, { token: string; expiresAt: number }>();

function baseUrl(g: TailscaleArgs): string {
  const url = g.baseUrl || Deno.env.get("TAILSCALE_BASE_URL") ||
    DEFAULT_BASE_URL;
  return url.replace(/\/+$/, "");
}

/**
 * The tailnet to address: the `tailnet` global argument, then the
 * TAILSCALE_TAILNET environment variable, then `-` (the tailnet of the
 * credential in use).
 */
export function resolveTailnet(g: TailscaleArgs): string {
  return g.tailnet || Deno.env.get("TAILSCALE_TAILNET") || "-";
}

interface Credentials {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
}

/**
 * Picks one credential set. Global arguments take precedence over environment
 * variables; within either source, an API key together with OAuth client
 * settings is an error.
 */
function resolveCredentials(g: TailscaleArgs): Credentials {
  const pick = (
    source: string,
    apiKey?: string,
    clientId?: string,
    clientSecret?: string,
  ): Credentials | undefined => {
    if (!apiKey && !clientId && !clientSecret) return undefined;
    if (apiKey && (clientId || clientSecret)) {
      throw new Error(
        `Conflicting Tailscale credentials in ${source}: set either an API ` +
          `key or an OAuth client ID and secret, not both.`,
      );
    }
    if (!apiKey && (!clientId || !clientSecret)) {
      throw new Error(
        `Incomplete Tailscale OAuth client credentials in ${source}: both ` +
          `the client ID and the client secret are required.`,
      );
    }
    return { apiKey, clientId, clientSecret };
  };
  const creds = pick(
    "global arguments",
    g.apiKey,
    g.oauthClientId,
    g.oauthClientSecret,
  ) ?? pick(
    "environment variables",
    Deno.env.get("TAILSCALE_API_KEY"),
    Deno.env.get("TAILSCALE_OAUTH_CLIENT_ID"),
    Deno.env.get("TAILSCALE_OAUTH_CLIENT_SECRET"),
  );
  if (!creds) {
    throw new Error(
      "No Tailscale credentials found. Set the apiKey global argument (or " +
        "TAILSCALE_API_KEY), or the oauthClientId and oauthClientSecret " +
        "global arguments (or TAILSCALE_OAUTH_CLIENT_ID and " +
        "TAILSCALE_OAUTH_CLIENT_SECRET). Wire secrets with a vault.get(...) " +
        "expression.",
    );
  }
  return creds;
}

/**
 * Cache key for an OAuth access token. It includes a hash of the client
 * secret, so a rotated or corrected secret gets a fresh token.
 */
async function tokenCacheKey(
  g: TailscaleArgs,
  clientId: string,
  clientSecret: string,
): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(clientSecret),
  );
  const secretHash = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
  return [baseUrl(g), clientId, secretHash, (g.oauthScopes ?? []).join(" ")]
    .join("|");
}

function parseJson(text: string, what: string): unknown {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      `${what} returned malformed JSON: ${
        error instanceof Error ? error.message : error
      }`,
    );
  }
}

/**
 * Exchanges OAuth client credentials for an access token, caching it until
 * shortly before it expires.
 */
async function oauthToken(
  g: TailscaleArgs,
  clientId: string,
  clientSecret: string,
  cacheKey: string,
): Promise<string> {
  const scopes = g.oauthScopes ?? [];
  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now() + TOKEN_REFRESH_MARGIN_MS) {
    return cached.token;
  }
  const form = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  if (scopes.length > 0) form.set("scope", scopes.join(" "));
  const resp = await fetchWithRetry(`${baseUrl(g)}/api/v2/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  const text = await resp.text();
  if (!resp.ok) {
    throw new Error(
      `Tailscale OAuth token exchange failed (${resp.status}): ${
        errorMessage(text)
      }`,
    );
  }
  const data = parseJson(text, "Tailscale OAuth token exchange") as {
    access_token?: string;
    expires_in?: number;
  };
  if (!data.access_token) {
    throw new Error("Tailscale OAuth token response had no access_token");
  }
  tokenCache.set(cacheKey, {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  });
  return data.access_token;
}

/**
 * The Authorization header value, plus the token cache key when it came from
 * an OAuth exchange (so a 401 can drop the cached token).
 */
async function authorization(
  g: TailscaleArgs,
): Promise<{ header: string; cacheKey?: string }> {
  const creds = resolveCredentials(g);
  if (creds.apiKey) return { header: `Bearer ${creds.apiKey}` };
  const cacheKey = await tokenCacheKey(
    g,
    creds.clientId!,
    creds.clientSecret!,
  );
  const token = await oauthToken(
    g,
    creds.clientId!,
    creds.clientSecret!,
    cacheKey,
  );
  return { header: `Bearer ${token}`, cacheKey };
}

/**
 * Fills `{param}` placeholders in a path template. `{tailnet}` comes from
 * resolveTailnet(); every other placeholder must be in `params`.
 */
export function expandPath(
  template: string,
  g: TailscaleArgs,
  params: Record<string, unknown> = {},
): string {
  return template.replace(/\{([^}]+)\}/g, (_match, name: string) => {
    const value = name === "tailnet" && params[name] === undefined
      ? resolveTailnet(g)
      : params[name];
    if (value === undefined || value === null || value === "") {
      throw new Error(`Missing value for path parameter "${name}"`);
    }
    const segment = String(value);
    // URL parsing collapses "." and ".." segments, which would send the
    // request to a different endpoint.
    if (segment === "." || segment === "..") {
      throw new Error(`Invalid value for path parameter "${name}": ${segment}`);
    }
    return escapePathSegment(segment);
  });
}

/**
 * Escapes a path segment like Go's url.PathEscape: ":" and "@" are legal in
 * a segment and stay as-is, so service names like "svc:web" reach the API
 * unencoded.
 */
function escapePathSegment(value: string): string {
  return encodeURIComponent(value).replace(/%3A/gi, ":").replace(/%40/g, "@");
}

function retryDelayMs(resp: Response, attempt: number): number {
  const retryAfter = resp.headers.get("Retry-After");
  let delay = 2 ** attempt * 1000;
  if (retryAfter) {
    const seconds = Number(retryAfter);
    const date = Date.parse(retryAfter);
    if (!Number.isNaN(seconds)) delay = seconds * 1000;
    else if (!Number.isNaN(date)) delay = date - Date.now();
  }
  return Math.min(Math.max(0, delay), MAX_RETRY_DELAY_MS);
}

/**
 * fetch, retrying 429 responses up to MAX_RETRIES times and honouring
 * Retry-After (capped at MAX_RETRY_DELAY_MS).
 */
async function fetchWithRetry(
  url: string | URL,
  init: { method: string; headers: Record<string, string>; body?: string },
): Promise<Response> {
  for (let attempt = 0;; attempt++) {
    const resp = await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (resp.status !== 429 || attempt >= MAX_RETRIES) return resp;
    await resp.body?.cancel();
    await new Promise((r) => setTimeout(r, retryDelayMs(resp, attempt)));
  }
}

function errorMessage(text: string): string {
  try {
    const parsed = JSON.parse(text) as { message?: string };
    if (parsed.message) return parsed.message;
  } catch {
    // Not JSON: use the body as-is
  }
  return text;
}

/**
 * Sends one request to the Tailscale API (`path` is relative to /api/v2).
 * Retries 429 responses, honouring Retry-After. A non-2xx status raises
 * unless it is listed in `allowStatus`.
 */
export async function apiRequest(
  g: TailscaleArgs,
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse> {
  const url = new URL(`${baseUrl(g)}/api/v2${path}`);
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, value);
  }
  const auth = await authorization(g);
  const headers: Record<string, string> = {
    "Authorization": auth.header,
    ...options.headers,
  };
  let body: string | undefined;
  if (options.rawBody !== undefined) {
    body = options.rawBody;
    headers["Content-Type"] = options.contentType ?? "text/plain";
  } else if (options.body !== undefined) {
    body = JSON.stringify(options.body);
    headers["Content-Type"] = "application/json";
  }
  if (options.accept) headers["Accept"] = options.accept;

  let resp = await fetchWithRetry(url, { method, headers, body });
  if (resp.status === 401 && auth.cacheKey) {
    // The cached OAuth token may have been revoked: drop it and retry once
    // with a fresh one.
    await resp.body?.cancel();
    tokenCache.delete(auth.cacheKey);
    headers["Authorization"] = (await authorization(g)).header;
    resp = await fetchWithRetry(url, { method, headers, body });
  }
  const text = await resp.text();
  if (!resp.ok && !options.allowStatus?.includes(resp.status)) {
    throw new Error(
      `Tailscale API error: ${method} ${path} returned ${resp.status}: ${
        errorMessage(text)
      }`,
    );
  }
  let data: unknown = text;
  const type = resp.headers.get("Content-Type") ?? "";
  if (options.raw) {
    data = text;
  } else if (text && type.includes("json") && !type.includes("hujson")) {
    data = parseJson(text, `Tailscale API ${method} ${path}`);
  } else if (!text) {
    data = undefined;
  }
  return { status: resp.status, headers: resp.headers, data };
}

/** GET a resource, returning null when it does not exist (404). */
export async function readOptional(
  g: TailscaleArgs,
  path: string,
  query?: Record<string, string>,
): Promise<Record<string, unknown> | null> {
  const resp = await apiRequest(g, "GET", path, {
    query,
    allowStatus: [404],
  });
  if (resp.status === 404) return null;
  return (resp.data ?? {}) as Record<string, unknown>;
}

/** GET a resource, raising when it does not exist. */
export async function readRequired(
  g: TailscaleArgs,
  path: string,
  query?: Record<string, string>,
): Promise<Record<string, unknown>> {
  const resp = await apiRequest(g, "GET", path, { query });
  return (resp.data ?? {}) as Record<string, unknown>;
}

/**
 * Unwraps a list response: `wrapperKey` names the array property, or null
 * when the response is a bare array.
 */
export function unwrapList(
  data: unknown,
  wrapperKey: string | null,
): Record<string, unknown>[] {
  const value = wrapperKey === null
    ? data
    : (data as Record<string, unknown> | undefined)?.[wrapperKey];
  return Array.isArray(value) ? value as Record<string, unknown>[] : [];
}

/** Copies the fields of `g` that are set (not undefined). */
export function pickDefined(
  g: Record<string, unknown>,
  fields: string[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    if (g[field] !== undefined) out[field] = g[field];
  }
  return out;
}

/** A copy of `obj` without `fields`. */
export function omit(
  obj: Record<string, unknown>,
  fields: string[],
): Record<string, unknown> {
  const out = { ...obj };
  for (const field of fields) delete out[field];
  return out;
}

/** The subset of `obj` holding `fields`, or null when none are set. */
export function pickPresent(
  obj: Record<string, unknown>,
  fields: string[],
): Record<string, unknown> | null {
  const out: Record<string, unknown> = {};
  for (const field of fields) {
    if (obj[field] !== undefined && obj[field] !== null && obj[field] !== "") {
      out[field] = obj[field];
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

/**
 * For full-replace updates (PUT, or POST that replaces): copies `fields` that
 * are unset in `body` from the live resource, so an unset global argument
 * keeps its current value instead of being cleared.
 */
export function fillUnset(
  body: Record<string, unknown>,
  live: Record<string, unknown>,
  fields: string[],
): Record<string, unknown> {
  const out = { ...body };
  for (const field of fields) {
    if (out[field] === undefined && live[field] !== undefined) {
      if (live[field] !== null) out[field] = live[field];
    }
  }
  return out;
}

/** Makes a value safe to use as a swamp data instance name. */
export function instanceName(value: unknown, fallback = "current"): string {
  const name = value === undefined || value === null || value === ""
    ? fallback
    : String(value);
  return name.replace(/[/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
}

/** Minimal shape of the method context the helpers need. */
export interface StoredContext {
  modelType: unknown;
  modelId: unknown;
  dataRepository: {
    getContent(
      modelType: unknown,
      modelId: unknown,
      name: string,
    ): Promise<Uint8Array | null | undefined>;
  };
}

/** Reads a stored state instance, or null when none exists. */
export async function readStored(
  context: StoredContext,
  name: string,
): Promise<Record<string, unknown> | null> {
  const content = await context.dataRepository.getContent(
    context.modelType,
    context.modelId,
    name,
  );
  if (!content) return null;
  return parseJson(
    new TextDecoder().decode(content),
    `Stored data for "${name}"`,
  ) as Record<string, unknown>;
}

/** Reads a stored state instance, raising when none exists. */
export async function requireStored(
  context: StoredContext,
  name: string,
  hint: string,
): Promise<Record<string, unknown>> {
  const stored = await readStored(context, name);
  if (!stored) throw new Error(`No data found for "${name}" - ${hint}`);
  return stored;
}

/** Raises when any of `fields` is unset in `g`. */
export function requireArgs(
  g: Record<string, unknown>,
  fields: string[],
  method: string,
): void {
  const missing = fields.filter((f) =>
    g[f] === undefined || g[f] === null || g[f] === ""
  );
  if (missing.length > 0) {
    throw new Error(
      `${method} requires global arguments: ${missing.join(", ")}`,
    );
  }
}
