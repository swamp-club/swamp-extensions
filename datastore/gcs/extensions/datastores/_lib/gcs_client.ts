// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Thin GCS client using the JSON REST API with fetch().
 *
 * Authentication uses Application Default Credentials (ADC):
 * 1. GOOGLE_APPLICATION_CREDENTIALS env var → service account key JSON
 * 2. gcloud CLI default credentials (~/.config/gcloud/application_default_credentials.json)
 * 3. GCE/Cloud Run/GKE metadata server
 *
 * The ADC token-refresh path (`getAccessToken` and its callees) is NOT
 * plumbed with AbortSignal. Token acquisition runs once per ~1 hour via
 * the cached-token path; aborting a token refresh mid-request is out of
 * scope. An operator reporting "token refresh hang on abort" should
 * reach for this comment first.
 */

export interface GcsClientConfig {
  bucket: string;
  prefix?: string;
  projectId?: string;
  /** Custom API endpoint (for emulators like fake-gcs-server). */
  apiEndpoint?: string;
  /**
   * Per-request timeout in milliseconds. Defaults to 30s. Every fetch
   * call is guarded by `AbortSignal.timeout(defaultRequestTimeoutMs)`,
   * composed with any caller-supplied signal. Prevents individual
   * operations from hanging indefinitely on network stalls.
   */
  defaultRequestTimeoutMs?: number;
}

const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

/** Result of a GCS object write, including the generation number. */
export interface GcsWriteResult {
  generation: string;
}

/** Result of a GCS object metadata query. */
export interface GcsObjectMetadata {
  exists: boolean;
  size?: number;
  updated?: Date;
  generation?: string;
}

export interface GcsListEntry {
  key: string;
  size: number;
  generation?: string;
  updated?: Date;
}

export interface GcsListResult {
  entries: GcsListEntry[];
  truncated: boolean;
  pageToken?: string;
}

/** Error thrown when a GCS precondition fails (HTTP 412). */
export class PreconditionFailedError extends Error {
  override readonly name = "PreconditionFailedError";
}

/** Error thrown when a GCS object is not found (HTTP 404). */
export class NotFoundError extends Error {
  override readonly name = "NotFoundError";
}

/** Max bytes of response body displayed in the error preview string. */
const ERROR_BODY_PREVIEW_BYTES = 256;

/**
 * Hard cap on how many bytes we read from an error response body before
 * abandoning the stream. Real GCS JSON error bodies are <10KB; this
 * protects against a buggy/adversarial endpoint returning a huge body.
 */
const MAX_ERROR_BODY_BYTES = 64 * 1024;

/**
 * Error thrown by `GcsClient` operations for the general non-2xx case.
 * Preserves the original `name` so existing catches keep working and
 * exposes HTTP-level detail callers need to distinguish transient from
 * permanent failures:
 *
 * - `httpStatusCode` — `null` for transport-level failures (connection
 *   reset, DNS, TLS handshake). The `isRetryableError` predicate in the
 *   cache-sync layer treats null as transient.
 * - `code` — structured error reason from GCS JSON bodies
 *   (`error.errors[0].reason`, e.g. `"authError"`,
 *   `"rateLimitExceeded"`). Falls back to numeric HTTP status if
 *   `errors[]` is absent.
 * - `bodyPreview` — first 256 bytes of the response body, UTF-8
 *   decoded. Useful for debugging non-standard error shapes. May
 *   contain bearer-token tail fragments in auth-failure responses;
 *   the clamp is deliberate.
 * - `uploadId` — value of the `X-GUploader-UploadID` response header
 *   when present (upload-path responses only). The only cross-
 *   referenceable debug token GCS exposes, captured opportunistically
 *   on every response — absent on non-upload paths, which is expected.
 */
export class GcsOperationError extends Error {
  override readonly name: string;
  readonly httpStatusCode: number | null;
  readonly code: string | undefined;
  readonly bodyPreview: string | undefined;
  readonly uploadId: string | undefined;

  constructor(
    message: string,
    opts: {
      name: string;
      httpStatusCode: number | null;
      code: string | undefined;
      bodyPreview: string | undefined;
      uploadId: string | undefined;
      cause?: unknown;
    },
  ) {
    super(
      message,
      opts.cause !== undefined ? { cause: opts.cause } : undefined,
    );
    this.name = opts.name;
    this.httpStatusCode = opts.httpStatusCode;
    this.code = opts.code;
    this.bodyPreview = opts.bodyPreview;
    this.uploadId = opts.uploadId;
  }
}

/**
 * Classification of GCS-surfaced credential failures. Mirrors
 * `AwsCredentialErrorKind` from the s3 datastore for symmetry — the user-
 * facing concept ("session expired" vs "credentials rejected") is the same
 * across providers, only the remediation command differs.
 */
export type GcpCredentialErrorKind =
  | "session-expired"
  | "credentials-rejected"
  | "other";

/**
 * Classify a GCS error by its derived `causeName` (from the cause-chain) and
 * HTTP `status`. Pure function — takes primitives so it can be unit-tested
 * without constructing token-refresh failures or HTTP responses.
 *
 * Detection is HTTP-status-only for the credentials-rejected branch — body
 * shape varies (JSON vs HTML vs plain text on edge cases) and is not
 * reliable for classification.
 *
 * The `causeName` parameter is intended for callers that need to
 * re-classify a caught `GcsOperationError` (e.g. by passing in `err.name`).
 * `send()` itself never reaches the cause-name branch from this function —
 * the session-expired path for token-refresh failures is short-circuited
 * inside `tokenRefreshError`, which embeds the hint at construction time.
 */
export function classifyGcpCredentialError(
  causeName: string | undefined,
  status: number | undefined | null,
): GcpCredentialErrorKind {
  if (causeName === "CredentialsProviderError") return "session-expired";
  if (status === 401 || status === 403) return "credentials-rejected";
  return "other";
}

/**
 * Render a swamp-flavoured remediation hint for the classified credential
 * failure. Returns `undefined` for `kind === "other"` so the caller falls
 * through to existing generic messaging.
 */
export function formatGcpCredentialHint(
  kind: GcpCredentialErrorKind,
): string | undefined {
  if (kind === "session-expired") {
    return "Datastore session expired: your GCP Application Default Credentials have expired or been revoked. Run 'gcloud auth application-default login' to refresh, then retry.";
  }
  if (kind === "credentials-rejected") {
    return "Datastore credentials rejected by GCS: verify GOOGLE_APPLICATION_CREDENTIALS, gcloud ADC, or the attached service account, then retry.";
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// ADC token acquisition
// ---------------------------------------------------------------------------

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface ServiceAccountKey {
  type: string;
  client_email: string;
  private_key: string;
  token_uri: string;
}

interface UserCredentials {
  type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

/** Cached access token. */
let cachedToken: { token: string; expiresAt: number } | null = null;

/** Base64url-encode a Uint8Array (chunked to avoid call-stack overflow). */
function base64url(data: Uint8Array): string {
  const CHUNK = 8192;
  let binary = "";
  for (let i = 0; i < data.length; i += CHUNK) {
    const slice = data.subarray(i, i + CHUNK);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(
    /=+$/,
    "",
  );
}

/** Create a signed JWT for service account authentication. */
async function createSignedJwt(
  sa: ServiceAccountKey,
): Promise<string> {
  const header = base64url(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })),
  );

  const now = Math.floor(Date.now() / 1000);
  const claims = base64url(
    new TextEncoder().encode(JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/devstorage.full_control",
      aud: sa.token_uri,
      iat: now,
      exp: now + 3600,
    })),
  );

  const signingInput = `${header}.${claims}`;

  const pemBody = sa.private_key
    .replace(
      /-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|\n/g,
      "",
    )
    .replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, "");
  const keyData = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signingInput),
    ),
  );

  return `${signingInput}.${base64url(signature)}`;
}

/**
 * Wrap a token-endpoint failure as a `GcsOperationError`. When the body
 * indicates `invalid_grant` (refresh token revoked, expired, or never valid),
 * stamp `name = "CredentialsProviderError"` and front-load the
 * swamp-flavoured "session expired" hint so callers see the cause and
 * remediation before the raw token-endpoint response. Other failures keep
 * a generic `TokenRefreshError` name; the message preserves status + body
 * for debugging.
 *
 * Exported so tests can drive it directly — mocking the hardcoded
 * `oauth2.googleapis.com/token` URL inside `tokenFromUserCredentials` from
 * outside the module isn't feasible.
 */
export function tokenRefreshError(
  context: string,
  status: number,
  body: string,
): GcsOperationError {
  const isInvalidGrant = body.includes("invalid_grant");
  const name = isInvalidGrant
    ? "CredentialsProviderError"
    : "TokenRefreshError";
  // Front-load the swamp-flavoured hint when the failure is the GCP-equivalent
  // of an expired SSO session, so the user sees the cause and remediation
  // before the raw token-endpoint response.
  const hint = isInvalidGrant
    ? formatGcpCredentialHint("session-expired")
    : undefined;
  const message = hint
    ? `${hint} ${context}: ${status} ${body}`
    : `${context}: ${status} ${body}`;
  return new GcsOperationError(
    message,
    {
      name,
      httpStatusCode: status,
      code: isInvalidGrant ? "invalid_grant" : undefined,
      bodyPreview: body.slice(0, 256),
      uploadId: undefined,
    },
  );
}

/** Exchange a signed JWT for an access token. */
async function tokenFromServiceAccount(
  sa: ServiceAccountKey,
): Promise<TokenResponse> {
  const jwt = await createSignedJwt(sa);
  const resp = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!resp.ok) {
    throw tokenRefreshError(
      "Service account token exchange failed",
      resp.status,
      await resp.text(),
    );
  }
  return await resp.json() as TokenResponse;
}

/** Refresh an access token using user credentials (gcloud ADC). */
async function tokenFromUserCredentials(
  creds: UserCredentials,
): Promise<TokenResponse> {
  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
    }),
  });
  if (!resp.ok) {
    throw tokenRefreshError(
      "User credential token refresh failed",
      resp.status,
      await resp.text(),
    );
  }
  return await resp.json() as TokenResponse;
}

/** Fetch an access token from the GCE metadata server. */
async function tokenFromMetadataServer(): Promise<TokenResponse> {
  const resp = await fetch(
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
    { headers: { "Metadata-Flavor": "Google" } },
  );
  if (!resp.ok) {
    // Intentionally a plain Error rather than the typed `tokenRefreshError`
    // path used by the user-credential and service-account paths. The
    // remediation differs (check the instance's attached service account
    // and IAM scopes, not `gcloud auth application-default login`), so
    // stamping `name = "CredentialsProviderError"` here would mislead
    // `classifyGcpCredentialError` into prepending the wrong hint.
    throw new Error(
      `Metadata server token request failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

/**
 * Obtain an access token using Application Default Credentials.
 *
 * Tries in order:
 * 1. GOOGLE_APPLICATION_CREDENTIALS → service account key file
 * 2. Well-known gcloud ADC file → user or service account credentials
 * 3. GCE metadata server → attached service account
 */
async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  let tokenResp: TokenResponse | null = null;

  const credsPath = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS");
  if (credsPath) {
    const raw = await Deno.readTextFile(credsPath);
    const parsed = JSON.parse(raw);
    if (parsed.type === "service_account") {
      tokenResp = await tokenFromServiceAccount(parsed as ServiceAccountKey);
    } else if (parsed.type === "authorized_user") {
      tokenResp = await tokenFromUserCredentials(parsed as UserCredentials);
    } else {
      throw new Error(
        `Unsupported credential type in GOOGLE_APPLICATION_CREDENTIALS: ${parsed.type}`,
      );
    }
  }

  if (!tokenResp) {
    const home = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE") ?? ".";
    const adcPath =
      `${home}/.config/gcloud/application_default_credentials.json`;
    try {
      const raw = await Deno.readTextFile(adcPath);
      const parsed = JSON.parse(raw);
      if (parsed.type === "service_account") {
        tokenResp = await tokenFromServiceAccount(parsed as ServiceAccountKey);
      } else if (parsed.type === "authorized_user") {
        tokenResp = await tokenFromUserCredentials(parsed as UserCredentials);
      }
    } catch {
      // ADC file not found — try metadata server
    }
  }

  if (!tokenResp) {
    try {
      tokenResp = await tokenFromMetadataServer();
    } catch {
      throw new Error(
        "Could not obtain GCP credentials. Set GOOGLE_APPLICATION_CREDENTIALS, " +
          "run 'gcloud auth application-default login', or run on a GCE instance " +
          "with an attached service account.",
      );
    }
  }

  cachedToken = {
    token: tokenResp.access_token,
    expiresAt: Date.now() + tokenResp.expires_in * 1000,
  };

  return cachedToken.token;
}

/** Clear the cached token (useful for testing). */
export function clearTokenCache(): void {
  cachedToken = null;
}

// ---------------------------------------------------------------------------
// Response helpers
// ---------------------------------------------------------------------------

/**
 * Reads up to `max` bytes from a response body, aborting the stream
 * if the cap is hit. Used to capture an error-body preview without
 * committing to buffering an arbitrary-size body.
 */
async function readCappedBody(
  response: Response,
  max: number,
): Promise<{ bytes: Uint8Array; truncated: boolean }> {
  const reader = response.body?.getReader();
  if (!reader) return { bytes: new Uint8Array(0), truncated: false };

  const chunks: Uint8Array[] = [];
  let total = 0;
  let truncated = false;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const remaining = max - total;
    if (value.length > remaining) {
      chunks.push(value.subarray(0, remaining));
      total = max;
      truncated = true;
      try {
        await reader.cancel();
      } catch {
        // best-effort; body stream may already be closing
      }
      break;
    }
    chunks.push(value);
    total += value.length;
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return { bytes, truncated };
}

/** Decode up to `max` bytes as UTF-8 preview; mark overflow explicitly. */
function decodePreview(
  bytes: Uint8Array,
  max: number,
  streamTruncated: boolean,
): string {
  const overflow = bytes.length > max;
  const slice = overflow ? bytes.subarray(0, max) : bytes;
  const text = new TextDecoder("utf-8", { fatal: false }).decode(slice);
  if (overflow) return `${text}…(${bytes.length - max}+ more bytes)`;
  if (streamTruncated) return `${text}…(stream exceeded cap)`;
  return text;
}

/**
 * Extract a structured error code from a GCS JSON error body. Google's
 * envelope is `{"error": {"code": 403, "message": "...", "errors":
 * [{"reason": "authError", ...}]}}`. Prefer `errors[0].reason` because
 * it's actionable; fall back to `error.code` when `errors[]` is absent.
 * Non-JSON bodies return undefined.
 */
function extractErrorCode(
  text: string,
  contentType: string | null,
): string | undefined {
  if (!contentType || !contentType.includes("application/json")) {
    return undefined;
  }
  try {
    const parsed = JSON.parse(text);
    const err = parsed?.error;
    if (!err) return undefined;
    const firstReason = err.errors?.[0]?.reason;
    if (typeof firstReason === "string" && firstReason.length > 0) {
      return firstReason;
    }
    if (typeof err.code === "number") return String(err.code);
    if (typeof err.code === "string") return err.code;
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Compose a user-supplied signal with the per-request timeout signal.
 * `AbortSignal.any` fires when either source aborts. A timeout-triggered
 * abort carries `name: "TimeoutError"`, an external abort carries
 * `name: "AbortError"` — downstream error wrapping preserves this
 * distinction so the retry classifier can pick the right action.
 */
function composeSignal(
  userSignal: AbortSignal | undefined,
  timeoutMs: number,
): AbortSignal {
  const timeout = AbortSignal.timeout(timeoutMs);
  if (!userSignal) return timeout;
  return AbortSignal.any([userSignal, timeout]);
}

// ---------------------------------------------------------------------------
// GCS Client
// ---------------------------------------------------------------------------

const DEFAULT_API_BASE = "https://storage.googleapis.com";

/**
 * Thin GCS client using the JSON API with fetch().
 *
 * When a custom `apiEndpoint` is configured (e.g. for fake-gcs-server or
 * other emulators), authentication is skipped — matching the behavior of
 * Google's official client libraries with `STORAGE_EMULATOR_HOST`.
 */
export class GcsClient {
  private readonly bucket: string;
  private readonly prefix: string;
  private readonly apiBase: string;
  private readonly getToken: (() => Promise<string>) | null;
  private readonly defaultRequestTimeoutMs: number;

  constructor(
    config: GcsClientConfig,
    tokenFn?: () => Promise<string>,
  ) {
    this.bucket = config.bucket;
    this.prefix = config.prefix ?? "";
    this.apiBase = (config.apiEndpoint ?? DEFAULT_API_BASE).replace(/\/+$/, "");
    this.defaultRequestTimeoutMs = config.defaultRequestTimeoutMs ??
      DEFAULT_REQUEST_TIMEOUT_MS;

    if (tokenFn) {
      this.getToken = tokenFn;
    } else if (config.apiEndpoint) {
      this.getToken = null;
    } else {
      this.getToken = getAccessToken;
    }
  }

  private fullKey(key: string): string {
    return this.prefix ? `${this.prefix}/${key}` : key;
  }

  private storageUrl(path: string): string {
    return `${this.apiBase}/storage/v1${path}`;
  }

  private uploadUrl(path: string): string {
    return `${this.apiBase}/upload/storage/v1${path}`;
  }

  private async headers(): Promise<Record<string, string>> {
    if (!this.getToken) return {};
    const token = await this.getToken();
    return { "Authorization": `Bearer ${token}` };
  }

  /**
   * Dispatch a fetch with composed timeout+abort signal, then return
   * the response or throw a typed error:
   *
   * - Abort / timeout / transport failure → `GcsOperationError` with
   *   `httpStatusCode: null`. `name` distinguishes cause
   *   (`"AbortError"` / `"TimeoutError"` / original fetch error name).
   *   The retry classifier keys off `name` and `httpStatusCode`.
   * - 2xx → the `Response` passes through for the caller to consume.
   * - 404 → `NotFoundError` (preserved narrow type).
   * - 412 → `PreconditionFailedError` (preserved narrow type).
   * - Other non-2xx → `GcsOperationError` with captured status, decoded
   *   `code`, 256-byte `bodyPreview`, and `uploadId` when the response
   *   carried `X-GUploader-UploadID`.
   *
   * The `uploadId` read is always attempted — free-cost on every
   * response (absence is expected on non-upload paths).
   */
  private async send(
    op: string,
    url: string,
    init: RequestInit,
    userSignal: AbortSignal | undefined,
  ): Promise<Response> {
    const signal = composeSignal(userSignal, this.defaultRequestTimeoutMs);
    let response: Response;
    try {
      response = await fetch(url, { ...init, signal });
    } catch (err) {
      const isErr = err instanceof Error;
      const name = isErr ? err.name : "Error";
      const message = isErr ? err.message : String(err);
      if (name === "TimeoutError") {
        throw new GcsOperationError(
          `GCS ${op} timed out after ${this.defaultRequestTimeoutMs}ms`,
          {
            name: "TimeoutError",
            httpStatusCode: null,
            code: undefined,
            bodyPreview: undefined,
            uploadId: undefined,
            cause: err,
          },
        );
      }
      if (name === "AbortError") {
        throw new GcsOperationError(
          `GCS ${op} aborted`,
          {
            name: "AbortError",
            httpStatusCode: null,
            code: undefined,
            bodyPreview: undefined,
            uploadId: undefined,
            cause: err,
          },
        );
      }
      throw new GcsOperationError(
        `GCS ${op} transport failure — ${message}`,
        {
          name,
          httpStatusCode: null,
          code: undefined,
          bodyPreview: undefined,
          uploadId: undefined,
          cause: err,
        },
      );
    }

    if (response.ok) return response;

    const uploadId = response.headers.get("X-GUploader-UploadID") ?? undefined;

    if (response.status === 404) {
      await response.body?.cancel().catch(() => {});
      throw new NotFoundError(`GCS ${op} not found (404)`);
    }
    if (response.status === 412) {
      await response.body?.cancel().catch(() => {});
      throw new PreconditionFailedError(`GCS ${op} precondition failed (412)`);
    }

    const { bytes, truncated } = await readCappedBody(
      response,
      MAX_ERROR_BODY_BYTES,
    );
    const bodyText = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    const preview = decodePreview(bytes, ERROR_BODY_PREVIEW_BYTES, truncated);
    const code = extractErrorCode(
      bodyText,
      response.headers.get("content-type"),
    );

    const credentialKind = classifyGcpCredentialError(
      undefined,
      response.status,
    );
    const credentialHint = formatGcpCredentialHint(credentialKind);

    const parts: string[] = [];
    // Front-load the swamp-flavoured hint so the user sees the cause and
    // remediation before the SDK's framing of the failure.
    if (credentialHint) parts.push(credentialHint);
    parts.push(`GCS ${op} failed`, `HTTP ${response.status}`);
    if (code) parts.push(code);
    // Existing generic 401/403 hint stays as fallback when the credential
    // classifier did not produce a more specific hint. Currently
    // `classifyGcpCredentialError` covers all 401/403 cases so this branch
    // is dead today, but kept structurally for future kinds that might
    // resolve to "other" with status 401/403.
    if (
      (response.status === 401 || response.status === 403) &&
      credentialKind === "other"
    ) {
      parts.push(
        "(check GCS credentials — GOOGLE_APPLICATION_CREDENTIALS, gcloud ADC, or attached service account — and project/bucket configuration)",
      );
    }
    if (preview) parts.push(`bodyPreview=${JSON.stringify(preview)}`);

    throw new GcsOperationError(parts.join(" "), {
      name: "GcsOperationError",
      httpStatusCode: response.status,
      code,
      bodyPreview: preview,
      uploadId,
    });
  }

  /** Checks if the bucket exists and is accessible. */
  async bucketExists(signal?: AbortSignal): Promise<void> {
    const url = this.storageUrl(`/b/${encodeURIComponent(this.bucket)}`);
    const resp = await this.send(
      "bucketExists",
      url,
      { method: "GET", headers: await this.headers() },
      signal,
    );
    await resp.text();
  }

  /** Uploads an object to GCS. Returns the generation number. */
  async putObject(
    key: string,
    body: Uint8Array,
    signal?: AbortSignal,
  ): Promise<GcsWriteResult> {
    const objectName = this.fullKey(key);
    const url = this.uploadUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?uploadType=media&name=${
        encodeURIComponent(objectName)
      }`,
    );
    const hdrs = await this.headers();
    hdrs["Content-Type"] = "application/octet-stream";

    const resp = await this.send(
      "putObject",
      url,
      { method: "POST", headers: hdrs, body: body as BodyInit },
      signal,
    );
    const meta = await resp.json();
    return { generation: meta.generation };
  }

  /**
   * Downloads an object from GCS. Returns the body bytes alongside the
   * `generation` from the `x-goog-generation` response header on the
   * same GET so callers can fingerprint the exact version they read
   * without a follow-up metadata call. The generation binding is what
   * closes the fast-path sidecar TOCTOU in cache sync: `markSynced`
   * must record the fingerprint of the bytes we verified against, not
   * a post-facto `getMetadata` that could observe a concurrent
   * writer's push.
   */
  async getObject(
    key: string,
    signal?: AbortSignal,
  ): Promise<{ data: Uint8Array; generation?: string }> {
    const objectName = this.fullKey(key);
    const url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o/${
        encodeURIComponent(objectName)
      }?alt=media`,
    );
    const resp = await this.send(
      "getObject",
      url,
      { method: "GET", headers: await this.headers() },
      signal,
    );
    const generation = resp.headers.get("x-goog-generation") ?? undefined;
    return {
      data: new Uint8Array(await resp.arrayBuffer()),
      generation,
    };
  }

  /** Deletes an object from GCS. Optionally conditional on generation. */
  async deleteObject(
    key: string,
    options?: { ifGenerationMatch?: string },
    signal?: AbortSignal,
  ): Promise<void> {
    const objectName = this.fullKey(key);
    let url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o/${
        encodeURIComponent(objectName)
      }`,
    );
    if (options?.ifGenerationMatch) {
      url += `?ifGenerationMatch=${
        encodeURIComponent(options.ifGenerationMatch)
      }`;
    }
    try {
      const resp = await this.send(
        "deleteObject",
        url,
        { method: "DELETE", headers: await this.headers() },
        signal,
      );
      await resp.text();
    } catch (err) {
      // 404 on delete is a no-op — object is already gone.
      if (err instanceof NotFoundError) return;
      throw err;
    }
  }

  /** Gets object metadata from GCS. */
  async getMetadata(
    key: string,
    signal?: AbortSignal,
  ): Promise<GcsObjectMetadata> {
    const objectName = this.fullKey(key);
    const url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o/${
        encodeURIComponent(objectName)
      }`,
    );
    try {
      const resp = await this.send(
        "getMetadata",
        url,
        { method: "GET", headers: await this.headers() },
        signal,
      );
      const meta = await resp.json();
      return {
        exists: true,
        size: parseInt(meta.size, 10),
        updated: meta.updated ? new Date(meta.updated) : undefined,
        generation: meta.generation,
      };
    } catch (err) {
      if (err instanceof NotFoundError) return { exists: false };
      throw err;
    }
  }

  /**
   * Uploads an object only if it does not already exist.
   *
   * Uses GCS ifGenerationMatch=0 precondition — generation 0 means
   * "only succeed if no live version of this object exists."
   *
   * Returns the generation on success, or null if the object already exists.
   */
  async putObjectConditional(
    key: string,
    body: Uint8Array,
    signal?: AbortSignal,
  ): Promise<GcsWriteResult | null> {
    const objectName = this.fullKey(key);
    const url = this.uploadUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?uploadType=media&name=${
        encodeURIComponent(objectName)
      }&ifGenerationMatch=0`,
    );
    const hdrs = await this.headers();
    hdrs["Content-Type"] = "application/octet-stream";

    try {
      const resp = await this.send(
        "putObjectConditional",
        url,
        { method: "POST", headers: hdrs, body: body as BodyInit },
        signal,
      );
      const meta = await resp.json();
      return { generation: meta.generation };
    } catch (err) {
      if (err instanceof PreconditionFailedError) return null;
      throw err;
    }
  }

  /**
   * Uploads an object only if its current generation matches.
   *
   * This is a compare-and-swap (CAS) write — it ensures no other writer
   * has modified the object since we last read it.
   *
   * Returns the new generation on success, or null on generation mismatch.
   */
  async putObjectCas(
    key: string,
    body: Uint8Array,
    expectedGeneration: string,
    signal?: AbortSignal,
  ): Promise<GcsWriteResult | null> {
    const objectName = this.fullKey(key);
    const url = this.uploadUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?uploadType=media&name=${
        encodeURIComponent(objectName)
      }&ifGenerationMatch=${encodeURIComponent(expectedGeneration)}`,
    );
    const hdrs = await this.headers();
    hdrs["Content-Type"] = "application/octet-stream";

    try {
      const resp = await this.send(
        "putObjectCas",
        url,
        { method: "POST", headers: hdrs, body: body as BodyInit },
        signal,
      );
      const meta = await resp.json();
      return { generation: meta.generation };
    } catch (err) {
      if (err instanceof PreconditionFailedError) return null;
      throw err;
    }
  }

  /** Lists objects in GCS with the configured prefix. */
  async listObjects(
    subPrefix?: string,
    pageToken?: string,
    signal?: AbortSignal,
  ): Promise<GcsListResult> {
    const prefix = subPrefix
      ? this.fullKey(subPrefix)
      : this.prefix
      ? this.prefix + "/"
      : undefined;

    let url = this.storageUrl(
      `/b/${encodeURIComponent(this.bucket)}/o?`,
    );
    const params = new URLSearchParams();
    if (prefix) params.set("prefix", prefix);
    if (pageToken) params.set("pageToken", pageToken);
    url += params.toString();

    const resp = await this.send(
      "listObjects",
      url,
      { method: "GET", headers: await this.headers() },
      signal,
    );
    const data = await resp.json();

    const prefixLen = this.prefix ? this.prefix.length + 1 : 0;
    const entries: GcsListEntry[] = (data.items ?? []).map(
      (obj: {
        name: string;
        size?: string;
        generation?: string;
        updated?: string;
      }) => ({
        key: obj.name.slice(prefixLen),
        // GCS JSON API returns `size` as a numeric string. Number("…")
        // handles undefined and empty-string cleanly via `|| 0`; the
        // S3 sibling gets a native number from the SDK and avoids
        // parsing altogether.
        size: Number(obj.size) || 0,
        generation: obj.generation,
        updated: obj.updated ? new Date(obj.updated) : undefined,
      }),
    );

    return {
      entries,
      truncated: !!data.nextPageToken,
      pageToken: data.nextPageToken,
    };
  }

  /** Lists all objects (handling pagination). */
  async listAllObjects(
    subPrefix?: string,
    signal?: AbortSignal,
  ): Promise<GcsListEntry[]> {
    const all: GcsListEntry[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.listObjects(subPrefix, pageToken, signal);
      all.push(...result.entries);
      pageToken = result.truncated ? result.pageToken : undefined;
    } while (pageToken);

    return all;
  }
}
