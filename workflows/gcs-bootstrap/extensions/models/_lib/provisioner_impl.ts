// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).

/**
 * Internal implementation bits for the gcs-datastore-bootstrap provisioner.
 *
 * Kept out of the model entrypoint so the entrypoint exposes a narrow
 * public API surface (just `model`). Tests import the helpers and
 * schemas directly from here.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";

// All character classes are intentionally strict: these values are interpolated
// into a shell command + JSON blob in the workflow's `run-setup` step (see
// extensions/workflows/bootstrap-gcs-datastore.yaml). Characters outside of
// these classes would break shell quoting or the surrounding JSON.
const GCS_BUCKET_NAME_RE = /^[a-z0-9][a-z0-9._-]{1,61}[a-z0-9]$/;
const GCP_PROJECT_ID_RE = /^[a-z][-a-z0-9]{4,28}[a-z0-9]$/;
// GCS locations accept regions (us-central1), multi-regions (US, EU, ASIA),
// and predefined dual-regions (NAM4, EUR4). Case-insensitive on input.
const GCP_LOCATION_RE = /^[A-Za-z0-9-]+$/;
const GCS_PREFIX_RE = /^[a-zA-Z0-9/_.\-]*$/;
// IAM custom role IDs: 3-64 chars, letters/digits/underscore/dot only. Empty
// string is the sentinel for "use the default" that resolveRoleId handles.
// Hyphens are NOT permitted in custom role IDs (docs.cloud.google.com/iam/docs).
const IAM_ROLE_ID_RE = /^([A-Za-z0-9._]{3,64})?$/;

/** Inputs the workflow passes into each provisioner invocation. */
export const GlobalArgsSchema = z.object({
  bucket_name: z.string().min(3).max(63).regex(
    GCS_BUCKET_NAME_RE,
    "Bucket names must be 3-63 chars, lowercase, letters/numbers/dots/hyphens/underscores.",
  ).refine(
    (n) => !n.startsWith("goog"),
    "Bucket names cannot start with 'goog'.",
  ).refine(
    (n) => !n.includes("google"),
    "Bucket names cannot contain 'google'.",
  ).describe("GCS bucket name to create."),
  project_id: z.string().regex(
    GCP_PROJECT_ID_RE,
    "Project ID must be 6-30 chars, start with a lowercase letter, and contain only letters, digits, and hyphens.",
  ).describe(
    "GCP project ID that will own the bucket and the custom IAM role.",
  ),
  location: z.string().regex(
    GCP_LOCATION_RE,
    "Location may only contain letters, digits, and hyphens.",
  ).describe(
    "GCS location (e.g. `US`, `us-central1`, `NAM4`). Set at bucket creation and not patchable afterwards.",
  ),
  prefix: z.string().regex(
    GCS_PREFIX_RE,
    "Prefix may only contain letters, digits, `/`, `_`, `.`, or `-`.",
  ).optional().describe(
    "Optional object-name prefix within the bucket (surfaced in state for the setup step).",
  ),
  role_id: z.string().regex(
    IAM_ROLE_ID_RE,
    "Role ID must be 3-64 chars, letters/digits/underscore/dot only (no hyphens).",
  ).optional().describe(
    "Custom IAM role ID. Defaults to `swampGcsDatastore_<bucket_name_with_hyphens_as_underscores>`.",
  ),
});

/** State persisted after a successful provision run. */
export const StateSchema = z.object({
  bucket_name: z.string(),
  project_id: z.string(),
  location: z.string(),
  prefix: z.string(),
  role_id: z.string(),
  role_name: z.string(),
  created_at: z.string(),
});

/** Inferred type of a completed `state` resource record. */
export type StateData = z.infer<typeof StateSchema>;

/** Minimal logger interface used by the provisioner helpers. */
export type ProvisionerLogger = {
  info: (msg: string) => void;
  warn: (msg: string) => void;
};

/** Context handed to the `provision` method at runtime by the swamp engine. */
export type ProvisionerContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: ProvisionerLogger;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

/** Runtime IAM permissions @swamp/gcs-datastore requires on the bucket. */
export const SWAMP_GCS_PERMISSIONS: readonly string[] = [
  "storage.buckets.get",
  "storage.objects.create",
  "storage.objects.get",
  "storage.objects.delete",
  "storage.objects.list",
];

/**
 * Returns the explicit `role_id` if provided, otherwise derives a default of
 * the form `swampGcsDatastore<PascalCaseBucketName>`.
 */
export function resolveRoleId(
  bucketName: string,
  roleId: string | undefined,
): string {
  if (roleId && roleId.length > 0) return roleId;
  // Custom role IDs forbid hyphens; bucket names allow them. Sanitize.
  return `swampGcsDatastore_${bucketName.replace(/-/g, "_")}`;
}

/** Builds the fully-qualified GCP custom-role name for a project and role id. */
export function roleNameFor(projectId: string, roleId: string): string {
  return `projects/${projectId}/roles/${roleId}`;
}

// ---------------------------------------------------------------------------
// ADC (Application Default Credentials) — widened to cloud-platform scope
// because this bootstrap touches both Cloud Storage and IAM Admin APIs.
// ---------------------------------------------------------------------------

const CLOUD_PLATFORM_SCOPE = "https://www.googleapis.com/auth/cloud-platform";

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

let cachedToken: { token: string; expiresAt: number } | null = null;

function base64url(data: Uint8Array): string {
  const CHUNK = 8192;
  let binary = "";
  for (let i = 0; i < data.length; i += CHUNK) {
    const slice = data.subarray(i, i + CHUNK);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary)
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createSignedJwt(sa: ServiceAccountKey): Promise<string> {
  const header = base64url(
    new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })),
  );
  const now = Math.floor(Date.now() / 1000);
  const claims = base64url(
    new TextEncoder().encode(JSON.stringify({
      iss: sa.client_email,
      scope: CLOUD_PLATFORM_SCOPE,
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
    throw new Error(
      `Service account token exchange failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

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
    throw new Error(
      `User credential token refresh failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

async function tokenFromMetadataServer(): Promise<TokenResponse> {
  const resp = await fetch(
    "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
    { headers: { "Metadata-Flavor": "Google" } },
  );
  if (!resp.ok) {
    throw new Error(
      `Metadata server token request failed: ${resp.status} ${await resp
        .text()}`,
    );
  }
  return await resp.json() as TokenResponse;
}

/**
 * Resolves a short-lived GCP OAuth2 access token from Application Default
 * Credentials, caching the result in-process for its lifetime.
 */
export async function getAccessToken(): Promise<string> {
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
      // ADC file not found — fall through to metadata server.
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

/** Clears the in-process access-token cache. Intended for tests. */
export function clearTokenCache(): void {
  cachedToken = null;
}

// ---------------------------------------------------------------------------
// GCP client abstraction (thin wrapper over fetch + auth + base URLs)
// ---------------------------------------------------------------------------

/** Default base URL for the GCS JSON API (overridable for emulators/tests). */
export const DEFAULT_STORAGE_BASE = "https://storage.googleapis.com";
/** Default base URL for the GCP IAM API (overridable for emulators/tests). */
export const DEFAULT_IAM_BASE = "https://iam.googleapis.com";

/** Minimal GCP HTTP client interface used by the provisioner helpers. */
export interface GcpClient {
  storage(path: string, init?: RequestInit): Promise<Response>;
  iam(path: string, init?: RequestInit): Promise<Response>;
}

/** Optional overrides for the GCP HTTP client (base URLs, token fetcher). */
export interface GcpClientOptions {
  storageBase?: string;
  iamBase?: string;
  /** Override token fetcher — tests inject a stub; null skips auth entirely. */
  getToken?: (() => Promise<string>) | null;
}

/**
 * Builds a GCP HTTP client that attaches a bearer token to every request.
 * Base URLs and the token fetcher can be overridden for tests or emulators.
 */
export function createGcpClient(opts: GcpClientOptions = {}): GcpClient {
  const storageBase = (opts.storageBase ?? DEFAULT_STORAGE_BASE).replace(
    /\/+$/,
    "",
  );
  const iamBase = (opts.iamBase ?? DEFAULT_IAM_BASE).replace(/\/+$/, "");
  const tokenFn = opts.getToken === undefined ? getAccessToken : opts.getToken;

  const authHeaders = async (): Promise<Record<string, string>> => {
    if (!tokenFn) return {};
    const t = await tokenFn();
    return { Authorization: `Bearer ${t}` };
  };

  const send = async (
    base: string,
    path: string,
    init?: RequestInit,
  ): Promise<Response> => {
    const merged: Record<string, string> = {
      ...(init?.headers as Record<string, string> | undefined),
      ...(await authHeaders()),
    };
    return await fetch(base + path, { ...init, headers: merged });
  };

  return {
    storage: (path, init) => send(storageBase, path, init),
    iam: (path, init) => send(iamBase, path, init),
  };
}

// ---------------------------------------------------------------------------
// Bucket operations
// ---------------------------------------------------------------------------

function hardeningBody(): Record<string, unknown> {
  return {
    iamConfiguration: {
      uniformBucketLevelAccess: { enabled: true },
      publicAccessPrevention: "enforced",
    },
    versioning: { enabled: true },
  };
}

async function probeBucket(
  client: GcpClient,
  bucketName: string,
): Promise<number> {
  const resp = await client.storage(
    `/storage/v1/b/${encodeURIComponent(bucketName)}`,
  );
  await resp.text();
  return resp.status;
}

/**
 * Creates the bucket if it does not exist, or confirms that it already does.
 * Returns whether the bucket was newly created or an existing one was reused.
 */
export async function ensureBucket(
  client: GcpClient,
  projectId: string,
  bucketName: string,
  location: string,
  logger: ProvisionerLogger,
): Promise<"created" | "reused"> {
  const probe = await probeBucket(client, bucketName);
  if (probe === 200) {
    logger.info(`Bucket ${bucketName} already exists — reusing.`);
    return "reused";
  }
  if (probe !== 404) {
    throw new Error(
      `Unexpected status ${probe} probing bucket ${bucketName} — aborting.`,
    );
  }

  logger.info(`Creating bucket ${bucketName} in ${location}.`);
  const body = { name: bucketName, location, ...hardeningBody() };
  const resp = await client.storage(
    `/storage/v1/b?project=${encodeURIComponent(projectId)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (resp.ok) {
    await resp.text();
    return "created";
  }

  if (resp.status === 409) {
    // TOCTOU: someone else (or a concurrent run of this bootstrap) created the
    // bucket between our probe and our insert. GCS returns 409 `conflict` for
    // both "you own it" and "someone else owns it" — re-probe to disambiguate.
    await resp.text();
    const rc = await probeBucket(client, bucketName);
    if (rc === 200) {
      logger.info(
        `Bucket ${bucketName} was created concurrently — reusing.`,
      );
      return "reused";
    }
    if (rc === 403) {
      throw new Error(
        `Bucket name '${bucketName}' is taken by another project. ` +
          `GCS bucket names are globally unique — pick a different bucket_name.`,
      );
    }
    throw new Error(
      `Bucket ${bucketName} create returned 409, but re-probe returned ${rc}. ` +
        `Retry the workflow — if the error persists, the bucket name is contested.`,
    );
  }

  const text = await resp.text();
  throw new Error(
    `Bucket create failed for '${bucketName}' (${resp.status}): ${text}`,
  );
}

/**
 * Enforces uniform bucket-level access, public-access prevention, and
 * versioning so the bucket matches @swamp/gcs-datastore's expected posture.
 */
export async function hardenBucket(
  client: GcpClient,
  bucketName: string,
): Promise<void> {
  // Declarative PATCH — safe to re-run. Also self-heals if a previous run
  // created the bucket but a partial failure left hardening incomplete.
  const resp = await client.storage(
    `/storage/v1/b/${encodeURIComponent(bucketName)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hardeningBody()),
    },
  );
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(
      `Bucket patch failed for '${bucketName}' (${resp.status}): ${text}`,
    );
  }
  await resp.text();
}

// ---------------------------------------------------------------------------
// IAM custom role operations
// ---------------------------------------------------------------------------

interface RoleBody {
  name?: string;
  deleted?: boolean;
  title?: string;
  description?: string;
  includedPermissions?: string[];
  stage?: string;
}

async function getRole(
  client: GcpClient,
  projectId: string,
  roleId: string,
): Promise<{ status: number; body: RoleBody | null }> {
  const resp = await client.iam(
    `/v1/projects/${encodeURIComponent(projectId)}/roles/${
      encodeURIComponent(roleId)
    }`,
  );
  const text = await resp.text();
  if (!text) return { status: resp.status, body: null };
  try {
    return { status: resp.status, body: JSON.parse(text) as RoleBody };
  } catch {
    return { status: resp.status, body: null };
  }
}

/**
 * Creates or reuses a project-scoped custom IAM role and returns its fully
 * qualified name. Handles TOCTOU races where another run created the role
 * concurrently.
 */
export async function ensureCustomRole(
  client: GcpClient,
  projectId: string,
  roleId: string,
  bucketName: string,
  logger: ProvisionerLogger,
): Promise<string> {
  const fullName = roleNameFor(projectId, roleId);
  const probe = await getRole(client, projectId, roleId);

  if (probe.status === 200 && probe.body) {
    if (probe.body.deleted === true) {
      throw new Error(
        `Custom role ${fullName} exists but is in the soft-deleted state. ` +
          `Restore it with ` +
          `'gcloud iam roles undelete ${roleId} --project=${projectId}' ` +
          `and re-run the bootstrap. (If the 7-day undelete window has ` +
          `expired, pick a different role_id.)`,
      );
    }
    logger.info(
      `Custom role ${fullName} already exists — reusing. ` +
        `Not updating includedPermissions; delete and re-run if the permission ` +
        `set needs to change.`,
    );
    return fullName;
  }
  if (probe.status !== 404) {
    throw new Error(
      `Unexpected status ${probe.status} probing role ${fullName} — aborting.`,
    );
  }

  logger.info(`Creating custom IAM role ${fullName}.`);
  const resp = await client.iam(
    `/v1/projects/${encodeURIComponent(projectId)}/roles`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roleId,
        role: {
          title: "Swamp GCS Datastore",
          description:
            `Least-privilege role for @swamp/gcs-datastore on bucket ${bucketName}.`,
          includedPermissions: [...SWAMP_GCS_PERMISSIONS],
          stage: "GA",
        },
      }),
    },
  );

  if (resp.ok) {
    await resp.text();
    return fullName;
  }

  if (resp.status === 409) {
    // TOCTOU: a concurrent provision run won the race between our get and
    // create. The full role name is deterministic from projectId + roleId,
    // so return it rather than treating as failure.
    await resp.text();
    logger.info(
      `Custom role ${fullName} was created concurrently — reusing its name.`,
    );
    return fullName;
  }

  const text = await resp.text();
  throw new Error(
    `Role create failed for '${fullName}' (${resp.status}): ${text}`,
  );
}

// ---------------------------------------------------------------------------
// Model export
