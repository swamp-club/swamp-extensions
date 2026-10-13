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

/** @module Error wrapper and credential-classification helpers for gcp-sm. */

export const GrpcStatus = {
  OK: 0,
  INVALID_ARGUMENT: 3,
  NOT_FOUND: 5,
  ALREADY_EXISTS: 6,
  PERMISSION_DENIED: 7,
  RESOURCE_EXHAUSTED: 8,
  UNAUTHENTICATED: 16,
} as const;

export class GcpSmOperationError extends Error {
  override readonly name: string;
  readonly grpcCode: number | undefined;

  constructor(
    message: string,
    opts: {
      name: string;
      cause: unknown;
      grpcCode: number | undefined;
    },
  ) {
    super(message, { cause: opts.cause });
    this.name = opts.name;
    this.grpcCode = opts.grpcCode;
  }
}

export type GcpCredentialErrorKind =
  | "no-credentials"
  | "access-denied"
  | "other";

export function classifyGcpCredentialError(
  grpcCode: number | undefined,
): GcpCredentialErrorKind {
  if (grpcCode === GrpcStatus.UNAUTHENTICATED) return "no-credentials";
  if (grpcCode === GrpcStatus.PERMISSION_DENIED) return "access-denied";
  return "other";
}

function httpToGrpcCode(http: number): number | undefined {
  switch (http) {
    case 401:
      return GrpcStatus.UNAUTHENTICATED;
    case 403:
      return GrpcStatus.PERMISSION_DENIED;
    case 404:
      return GrpcStatus.NOT_FOUND;
    case 409:
      return GrpcStatus.ALREADY_EXISTS;
    case 429:
      return GrpcStatus.RESOURCE_EXHAUSTED;
    case 400:
      return GrpcStatus.INVALID_ARGUMENT;
    default:
      return undefined;
  }
}

export function deriveGcpErrorCode(e: {
  code?: number | string;
  name?: string;
  cause?: unknown;
}): { grpcCode: number | undefined; name: string } {
  const rawCode = typeof e.code === "number" ? e.code : undefined;
  const code = rawCode !== undefined
    ? (grpcCodeToName(rawCode) ? rawCode : httpToGrpcCode(rawCode) ?? rawCode)
    : undefined;

  const grpcName = code !== undefined ? grpcCodeToName(code) : undefined;
  if (grpcName) return { grpcCode: code, name: grpcName };

  if (e.name && e.name !== "Error") return { grpcCode: code, name: e.name };

  if (e.cause instanceof Error && e.cause.name && e.cause.name !== "Error") {
    const causeName = e.cause.name.replace(/^_+/, "");
    const causeCode = "code" in e.cause && typeof e.cause.code === "number"
      ? e.cause.code
      : undefined;
    return { grpcCode: causeCode ?? code, name: causeName };
  }

  return { grpcCode: code, name: "GcpSmOperationError" };
}

function grpcCodeToName(code: number): string | undefined {
  const names: Record<number, string> = {
    [GrpcStatus.INVALID_ARGUMENT]: "INVALID_ARGUMENT",
    [GrpcStatus.NOT_FOUND]: "NOT_FOUND",
    [GrpcStatus.ALREADY_EXISTS]: "ALREADY_EXISTS",
    [GrpcStatus.PERMISSION_DENIED]: "PERMISSION_DENIED",
    [GrpcStatus.RESOURCE_EXHAUSTED]: "RESOURCE_EXHAUSTED",
    [GrpcStatus.UNAUTHENTICATED]: "UNAUTHENTICATED",
  };
  return names[code];
}

export function formatGcpCredentialHint(
  kind: GcpCredentialErrorKind,
): string | undefined {
  if (kind === "no-credentials") {
    return "Vault authentication failed: no valid GCP credentials found. " +
      "Run 'gcloud auth application-default login' to authenticate, then retry.";
  }
  if (kind === "access-denied") {
    return "Vault access denied by GCP IAM: verify the authenticated principal " +
      "has secretmanager.secrets.* permissions on the project, then retry.";
  }
  return undefined;
}

export function wrapGcpSmError(op: string, err: unknown): Error {
  if (!(err instanceof Error)) return new Error(String(err));

  const e = err as Error & { code?: number | string };
  const { grpcCode, name } = deriveGcpErrorCode(e);

  const credentialKind = classifyGcpCredentialError(grpcCode);
  const credentialHint = formatGcpCredentialHint(credentialKind);

  const parts: string[] = [];
  if (credentialHint) parts.push(credentialHint);
  parts.push(`GCP Secret Manager ${op} failed`);
  if (grpcCode !== undefined) parts.push(`gRPC ${grpcCode} (${name})`);
  if (e.message) parts.push(`— ${e.message}`);

  return new GcpSmOperationError(parts.join(" "), {
    name,
    cause: e,
    grpcCode,
  });
}
