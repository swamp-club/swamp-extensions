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
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Error wrapper and credential-classification helpers for the aws-sm vault.
 *
 * The vault wraps the AWS Secrets Manager SDK; when SSO sessions expire or
 * static credentials are rejected, the SDK's surfaced error buries the
 * remediation hint in a stack trace. These helpers classify the failure
 * and prepend a swamp-flavoured summary line that names the cause and
 * points to `aws sso login --profile <profile>`.
 *
 * Mirrors the pattern in datastore/s3/extensions/datastores/_lib/s3_client.ts
 * with two deliberate differences: vault-flavoured wording ("Vault session
 * expired" vs "Datastore session expired"), and no XML-error-body capture
 * middleware (Secrets Manager uses AWS JSON 1.1).
 *
 * @module
 */

/**
 * Error thrown by the aws-sm vault for SDK failures. Preserves the
 * original SDK error's `name` (so existing checks like
 * `error.name === "ResourceNotFoundException"` keep working), sets `cause`
 * to the original, and exposes HTTP-level detail.
 */
export class AwsSmOperationError extends Error {
  override readonly name: string;
  readonly httpStatusCode: number | undefined;
  readonly code: string | undefined;
  readonly requestId: string | undefined;

  constructor(
    message: string,
    opts: {
      name: string;
      cause: unknown;
      httpStatusCode: number | undefined;
      code: string | undefined;
      requestId: string | undefined;
    },
  ) {
    super(message, { cause: opts.cause });
    this.name = opts.name;
    this.httpStatusCode = opts.httpStatusCode;
    this.code = opts.code;
    this.requestId = opts.requestId;
  }
}

/**
 * Classification of AWS-SDK-surfaced credential failures. `session-expired`
 * means the credential resolver could not produce valid credentials (SSO
 * token expired, STS session aged out). `credentials-rejected` means
 * credentials were sent to AWS and explicitly rejected.
 */
export type AwsCredentialErrorKind =
  | "session-expired"
  | "credentials-rejected"
  | "other";

/**
 * Classify an SDK error by its normalized `code` and HTTP `status`. Pure
 * function — takes primitives so it can be unit-tested without
 * constructing SDK error shapes.
 */
export function classifyAwsCredentialError(
  code: string | undefined,
  status: number | undefined,
): AwsCredentialErrorKind {
  if (code === "CredentialsProviderError" || code === "ExpiredTokenException") {
    return "session-expired";
  }
  if (
    code === "InvalidAccessKeyId" ||
    code === "SignatureDoesNotMatch" ||
    (status === 403 && code === "AccessDenied")
  ) {
    return "credentials-rejected";
  }
  return "other";
}

/**
 * Derive a normalized error `code` string from an AWS SDK error. The SDK
 * surfaces codes in three places:
 *
 * 1. `e.Code` — JSON-coded error from the service (e.g. `InvalidAccessKeyId`).
 * 2. `e.name` — the SDK's class name (e.g. `CredentialsProviderError`,
 *    `ResourceNotFoundException`). Generic `"Error"` is treated as no signal.
 * 3. `e.cause.name` — minified SDK builds wrap the real error class behind a
 *    generic outer error, with the underscored class name (e.g.
 *    `_CredentialsProviderError`) on the cause. Strip the leading underscore
 *    so the classifier can match the canonical name.
 *
 * At @aws-sdk/client-secrets-manager@3.1024.0, pre-flight credential
 * resolution failures surface as `name === "CredentialsProviderError"`
 * directly on the outer error with no cause chain — the cause-walk + strip
 * remains as defensive coverage for minified builds and older SDK versions.
 *
 * Pure function — takes a structural shape so it can be unit-tested without
 * constructing real SDK errors.
 */
export function deriveAwsErrorCode(e: {
  Code?: string;
  name?: string;
  cause?: unknown;
}): string | undefined {
  if (e.Code) return e.Code;
  if (e.name && e.name !== "Error") return e.name;
  if (e.cause instanceof Error && e.cause.name && e.cause.name !== "Error") {
    return e.cause.name.replace(/^_+/, "");
  }
  return undefined;
}

/**
 * Render a swamp-flavoured remediation hint for the classified credential
 * failure. The hint names the cause in swamp's vocabulary ("vault session
 * expired") rather than AWS's ("CredentialsProviderError") and points at a
 * concrete next action. Returns `undefined` for `kind === "other"` so the
 * caller can fall through to existing generic messaging.
 */
export function formatAwsCredentialHint(
  kind: AwsCredentialErrorKind,
  awsProfile: string | undefined,
): string | undefined {
  if (kind === "session-expired") {
    // Wrap the profile name in double quotes inside the single-quoted
    // command so the copy-pasted shell command stays valid for profiles
    // that contain spaces (uncommon but legal in AWS config).
    const cmd = awsProfile
      ? `aws sso login --profile "${awsProfile}"`
      : `aws sso login`;
    return `Vault session expired: your AWS profile's SSO session is no longer valid. Run '${cmd}' to refresh, then retry.`;
  }
  if (kind === "credentials-rejected") {
    const who = awsProfile ? `'${awsProfile}'` : `your AWS profile`;
    return `Vault credentials rejected by AWS: verify ${who}, environment variables, or credential provider, then retry.`;
  }
  return undefined;
}

/**
 * Wrap an SDK error from a Secrets Manager command as an
 * `AwsSmOperationError` with status, code, requestId, and a
 * credential-remediation hint when applicable.
 *
 * The Unknown/UnknownError suppression is empirically required: at
 * @aws-sdk/client-secrets-manager@3.1024.0, an HTTP 400 response with
 * a body lacking `__type` produces `err.name === "Unknown"` and
 * `err.message === "UnknownError"`. Without these filters the wrapped
 * message would read e.g. "AWS Secrets Manager get failed HTTP 400
 * Unknown — UnknownError" — noisy, with no useful signal.
 */
export function wrapAwsSmError(op: string, err: unknown): Error {
  if (!(err instanceof Error)) return new Error(String(err));
  const e = err as Error & {
    $metadata?: { httpStatusCode?: number; requestId?: string };
    Code?: string;
  };
  const status = e.$metadata?.httpStatusCode;
  const requestId = e.$metadata?.requestId;
  const code = deriveAwsErrorCode(e);

  const credentialKind = classifyAwsCredentialError(code, status);
  const credentialHint = formatAwsCredentialHint(
    credentialKind,
    Deno.env.get("AWS_PROFILE"),
  );

  const parts: string[] = [];
  // Front-load the swamp-flavoured hint so the user sees the cause and
  // remediation before the SDK's framing of the failure.
  if (credentialHint) parts.push(credentialHint);
  parts.push(`AWS Secrets Manager ${op} failed`);
  if (status != null) parts.push(`HTTP ${status}`);
  if (code && code !== "Unknown") parts.push(code);
  const rawMsg = e.message && e.message !== "UnknownError" ? e.message : "";
  if (rawMsg) parts.push(`— ${rawMsg}`);
  // The generic 401/403 hint stays as a fallback for non-credential auth
  // failures. Skip it when the credential classifier already produced a
  // more specific hint.
  if ((status === 401 || status === 403) && credentialKind === "other") {
    parts.push(
      "(check AWS credentials — profile, env vars, or credential provider — then retry)",
    );
  }
  if (requestId) parts.push(`[requestId=${requestId}]`);

  return new AwsSmOperationError(parts.join(" "), {
    name: e.name,
    cause: e,
    httpStatusCode: status,
    code,
    requestId,
  });
}
