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

import { assertEquals, assertInstanceOf } from "jsr:@std/assert@1.0.19";
import { AzureKvOperationError, wrapAzureKvError } from "./azure_kv_errors.ts";

Deno.test("AzureKvOperationError preserves provided name", () => {
  const err = new AzureKvOperationError("test message", {
    name: "RestError",
  });
  assertEquals(err.name, "RestError");
  assertEquals(err.message, "test message");
  assertInstanceOf(err, Error);
  assertInstanceOf(err, AzureKvOperationError);
});

Deno.test("AzureKvOperationError sets cause and httpStatusCode", () => {
  const cause = new Error("original");
  const err = new AzureKvOperationError("wrapped", {
    name: "RestError",
    cause,
    httpStatusCode: 403,
  });
  assertEquals(err.cause, cause);
  assertEquals(err.httpStatusCode, 403);
});

Deno.test("wrapAzureKvError preserves SDK error name", () => {
  const sdkError = new Error("Forbidden");
  sdkError.name = "RestError";
  Object.assign(sdkError, { statusCode: 403 });

  const wrapped = wrapAzureKvError("Failed to read annotation", sdkError);
  assertEquals(wrapped.name, "RestError");
  assertEquals(wrapped.httpStatusCode, 403);
  assertEquals(wrapped.cause, sdkError);
  assertEquals(wrapped.message, "Failed to read annotation: Forbidden");
  assertInstanceOf(wrapped, AzureKvOperationError);
});

Deno.test("wrapAzureKvError falls back to AzureKvOperationError for plain Error", () => {
  const plainError = new Error("something went wrong");

  const wrapped = wrapAzureKvError("Failed to delete", plainError);
  assertEquals(wrapped.name, "AzureKvOperationError");
  assertEquals(wrapped.cause, plainError);
});

Deno.test("wrapAzureKvError handles non-Error values", () => {
  const wrapped = wrapAzureKvError("Failed to list", "string error");
  assertEquals(wrapped.name, "AzureKvOperationError");
  assertEquals(wrapped.message, "Failed to list: string error");
  assertEquals(wrapped.httpStatusCode, undefined);
});
