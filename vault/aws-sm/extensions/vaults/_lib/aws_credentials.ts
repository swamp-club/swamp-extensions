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

// Auto-generated AWS credential utilities.
// Do not edit manually. Re-generate with: deno task generate:aws-credentials
// Canonical source: codegen/shared/awsCredentials.ts

export type AwsCredentialErrorKind =
  | "session-expired"
  | "credentials-rejected"
  | "other";

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

export function formatAwsCredentialHint(
  kind: AwsCredentialErrorKind,
  awsProfile: string | undefined,
  context: string,
): string | undefined {
  if (kind === "session-expired") {
    const cmd = awsProfile
      ? 'aws sso login --profile "' + awsProfile + '"'
      : "aws sso login";
    return (
      context +
      " session expired: your AWS profile's SSO session is no longer valid. Run '" +
      cmd +
      "' to refresh, then retry."
    );
  }
  if (kind === "credentials-rejected") {
    const who = awsProfile ? "'" + awsProfile + "'" : "your AWS profile";
    return (
      context +
      " credentials rejected by AWS: verify " +
      who +
      ", environment variables, or credential provider, then retry."
    );
  }
  return undefined;
}

export const PREFLIGHT_TIMEOUT_MS = 3_000;

export async function preflightCredentials(
  probe: () => Promise<unknown>,
  timeoutMs: number = PREFLIGHT_TIMEOUT_MS,
): Promise<void> {
  const probePromise = probe();
  probePromise.catch(() => {});

  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () =>
        reject(
          new Error(
            "Credential preflight timed out after " + timeoutMs + "ms \u2014 " +
              "verify that AWS credentials are configured " +
              "(AWS_ACCESS_KEY_ID, AWS_PROFILE, or attached IAM role) " +
              "and that the credential source is responsive",
          ),
        ),
      timeoutMs,
    );
  });

  try {
    await Promise.race([probePromise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}
