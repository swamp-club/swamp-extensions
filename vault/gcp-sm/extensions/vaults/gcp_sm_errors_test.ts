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

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import {
  classifyGcpCredentialError,
  deriveGcpErrorCode,
  formatGcpCredentialHint,
  GcpSmOperationError,
  GrpcStatus,
  wrapGcpSmError,
} from "./gcp_sm_errors.ts";

// --- classifyGcpCredentialError ---

Deno.test("classifyGcpCredentialError: UNAUTHENTICATED → no-credentials", () => {
  assertEquals(
    classifyGcpCredentialError(GrpcStatus.UNAUTHENTICATED),
    "no-credentials",
  );
});

Deno.test("classifyGcpCredentialError: PERMISSION_DENIED → access-denied", () => {
  assertEquals(
    classifyGcpCredentialError(GrpcStatus.PERMISSION_DENIED),
    "access-denied",
  );
});

Deno.test("classifyGcpCredentialError: NOT_FOUND → other", () => {
  assertEquals(
    classifyGcpCredentialError(GrpcStatus.NOT_FOUND),
    "other",
  );
});

Deno.test("classifyGcpCredentialError: undefined → other", () => {
  assertEquals(classifyGcpCredentialError(undefined), "other");
});

// --- formatGcpCredentialHint ---

Deno.test("formatGcpCredentialHint: no-credentials includes gcloud auth command", () => {
  const hint = formatGcpCredentialHint("no-credentials");
  assert(hint !== undefined);
  assert(hint.includes("gcloud auth application-default login"));
});

Deno.test("formatGcpCredentialHint: access-denied mentions IAM permissions", () => {
  const hint = formatGcpCredentialHint("access-denied");
  assert(hint !== undefined);
  assert(hint.includes("secretmanager.secrets"));
});

Deno.test("formatGcpCredentialHint: other → undefined", () => {
  assertEquals(formatGcpCredentialHint("other"), undefined);
});

// --- deriveGcpErrorCode ---

Deno.test("deriveGcpErrorCode: numeric gRPC code → name from lookup", () => {
  const result = deriveGcpErrorCode({ code: 5 });
  assertEquals(result.grpcCode, 5);
  assertEquals(result.name, "NOT_FOUND");
});

Deno.test("deriveGcpErrorCode: known error name preserved when no gRPC code", () => {
  const result = deriveGcpErrorCode({ name: "GoogleError" });
  assertEquals(result.name, "GoogleError");
});

Deno.test("deriveGcpErrorCode: generic Error falls back to GcpSmOperationError", () => {
  const result = deriveGcpErrorCode({ name: "Error" });
  assertEquals(result.name, "GcpSmOperationError");
});

Deno.test("deriveGcpErrorCode: walks cause chain", () => {
  const cause = Object.assign(new Error("inner"), { name: "InnerError" });
  const result = deriveGcpErrorCode({ name: "Error", cause });
  assertEquals(result.name, "InnerError");
});

Deno.test("deriveGcpErrorCode: strips leading underscores from cause name", () => {
  const cause = Object.assign(new Error("inner"), {
    name: "__MinifiedError",
  });
  const result = deriveGcpErrorCode({ name: "Error", cause });
  assertEquals(result.name, "MinifiedError");
});

Deno.test("deriveGcpErrorCode: HTTP 401 maps to UNAUTHENTICATED", () => {
  const result = deriveGcpErrorCode({ code: 401 });
  assertEquals(result.grpcCode, GrpcStatus.UNAUTHENTICATED);
  assertEquals(result.name, "UNAUTHENTICATED");
});

Deno.test("deriveGcpErrorCode: HTTP 403 maps to PERMISSION_DENIED", () => {
  const result = deriveGcpErrorCode({ code: 403 });
  assertEquals(result.grpcCode, GrpcStatus.PERMISSION_DENIED);
  assertEquals(result.name, "PERMISSION_DENIED");
});

Deno.test("deriveGcpErrorCode: HTTP 404 maps to NOT_FOUND", () => {
  const result = deriveGcpErrorCode({ code: 404 });
  assertEquals(result.grpcCode, GrpcStatus.NOT_FOUND);
  assertEquals(result.name, "NOT_FOUND");
});

Deno.test("deriveGcpErrorCode: HTTP 409 maps to ALREADY_EXISTS", () => {
  const result = deriveGcpErrorCode({ code: 409 });
  assertEquals(result.grpcCode, GrpcStatus.ALREADY_EXISTS);
  assertEquals(result.name, "ALREADY_EXISTS");
});

// --- wrapGcpSmError ---

Deno.test("wrapGcpSmError: wraps Error with gRPC code", () => {
  const original = Object.assign(new Error("not found"), { code: 5 });
  const wrapped = wrapGcpSmError("accessSecretVersion", original);
  assert(wrapped instanceof GcpSmOperationError);
  assertEquals(wrapped.name, "NOT_FOUND");
  assertEquals(wrapped.grpcCode, 5);
  assert(wrapped.message.includes("GCP Secret Manager"));
  assert(wrapped.message.includes("accessSecretVersion"));
  assertEquals(wrapped.cause, original);
});

Deno.test("wrapGcpSmError: UNAUTHENTICATED includes credential hint", () => {
  const original = Object.assign(new Error("unauthenticated"), { code: 16 });
  const wrapped = wrapGcpSmError("getSecret", original);
  assert(wrapped.message.includes("gcloud auth application-default login"));
});

Deno.test("wrapGcpSmError: PERMISSION_DENIED includes IAM hint", () => {
  const original = Object.assign(new Error("forbidden"), { code: 7 });
  const wrapped = wrapGcpSmError("getSecret", original);
  assert(wrapped.message.includes("IAM"));
});

Deno.test("wrapGcpSmError: non-Error value wrapped as string", () => {
  const wrapped = wrapGcpSmError("getSecret", "raw string error");
  assert(wrapped instanceof Error);
  assertEquals(wrapped.message, "raw string error");
});
