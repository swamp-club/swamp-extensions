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

import {
  assert,
  assertEquals,
  assertInstanceOf,
  assertRejects,
} from "jsr:@std/assert@1.0.19";
import {
  classifyAwsCredentialError,
  deriveAwsErrorCode,
  formatAwsCredentialHint,
  IfMatchUnsupportedError,
  isIfMatchUnsupported,
  PREFLIGHT_TIMEOUT_MS,
  PROBE_PREFIX,
  S3Client,
  S3OperationError,
  unquoteETag,
} from "./s3_client.ts";
import {
  type S3EmulatorState,
  withS3Emulator,
} from "./s3_emulator_test_util.ts";

/**
 * Run `fn` with `AWS_PROFILE` set to `value` (or unset when `value` is
 * undefined), restoring the prior value in `finally`. Used by tests that
 * exercise the profile-aware credential hint.
 */
async function withAwsProfile(
  value: string | undefined,
  fn: () => Promise<void>,
): Promise<void> {
  const prior = Deno.env.get("AWS_PROFILE");
  if (value === undefined) Deno.env.delete("AWS_PROFILE");
  else Deno.env.set("AWS_PROFILE", value);
  try {
    await fn();
  } finally {
    if (prior !== undefined) Deno.env.set("AWS_PROFILE", prior);
    else Deno.env.delete("AWS_PROFILE");
  }
}

/**
 * Start a local HTTP server that produces a fixed response, and run `fn`
 * with an `S3Client` wired to it. Ensures credentials are set for the
 * AWS SDK and restores prior env in a `finally`.
 */
async function withMockServer(
  handler: (req: Request) => Response | Promise<Response>,
  fn: (client: S3Client) => Promise<void>,
  configOverrides?: { defaultRequestTimeoutMs?: number },
): Promise<void> {
  const server = Deno.serve({ port: 0, onListen() {} }, handler);
  const addr = server.addr as Deno.NetAddr;

  const priorKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");

  try {
    const client = new S3Client({
      bucket: "test-bucket",
      region: "us-east-1",
      endpoint: `http://127.0.0.1:${addr.port}`,
      forcePathStyle: true,
      ...configOverrides,
    });
    await fn(client);
  } finally {
    if (priorKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorKey);
    else Deno.env.delete("AWS_ACCESS_KEY_ID");
    if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
    else Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    await server.shutdown();
  }
}

// Pins the contract that `GetObjectCommandOutput.ETag` surfaces on
// `getObject`'s return. The TOCTOU fix (swamp-club #168) threads this
// value to `markSynced` as the fingerprint of the bytes we actually
// read — if the header is stripped anywhere in the stack, etag is
// undefined, pullIndex returns null, and `markSynced` is skipped
// (safe fallback, slow path next sync).

Deno.test({
  sanitizeResources: false,
  name: "getObject: surfaces ETag from GetObject response",
  fn: () =>
    withMockServer(
      (req) => {
        if (req.method === "GET") {
          return new Response(new Uint8Array([42, 43, 44]), {
            status: 200,
            headers: { ETag: '"abc-xyz"' },
          });
        }
        return new Response(null, { status: 500 });
      },
      async (client) => {
        const { data, etag } = await client.getObject("k");
        assertEquals(Array.from(data), [42, 43, 44]);
        assertEquals(etag, '"abc-xyz"');
      },
    ),
});

// --- Regression: existing typed-error behavior still works -----------------

Deno.test({
  // The SDK's NodeHttpHandler keeps an HTTP agent pool alive across requests;
  // resource sanitization would flag those as leaks even though destroy()
  // schedules their close.
  sanitizeResources: false,
  name: "headObject returns {exists: false} on 404 (name preserved)",
  fn: () =>
    withMockServer(
      (req) => {
        if (req.method === "HEAD") return new Response(null, { status: 404 });
        return new Response(null, { status: 500 });
      },
      async (client) => {
        const result = await client.headObject("missing-key");
        assertEquals(result.exists, false);
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "putObjectConditional returns false on 412 (name preserved)",
  fn: () =>
    withMockServer(
      (req) => {
        if (req.method === "PUT") {
          return new Response(
            '<?xml version="1.0"?><Error><Code>PreconditionFailed</Code><Message>precondition</Message><RequestId>r</RequestId></Error>',
            {
              status: 412,
              headers: { "Content-Type": "application/xml" },
            },
          );
        }
        return new Response(null, { status: 500 });
      },
      async (client) => {
        const wrote = await client.putObjectConditional(
          "k",
          new Uint8Array([1, 2, 3]),
        );
        assertEquals(wrote, false);
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "putObjectConditional returns false on 412 with a non-XML body",
  fn: () =>
    withMockServer(
      () =>
        new Response("precondition failed", {
          status: 412,
          headers: { "Content-Type": "text/plain" },
        }),
      async (client) => {
        // The SDK can't parse an error code out of a non-XML body, so the
        // name alone isn't reliable. Lock acquisition must still read this
        // as "not acquired" rather than throwing.
        assertEquals(
          await client.putObjectConditional("k", new Uint8Array([1])),
          false,
        );
      },
    ),
});

// --- swamp-club#2245: compare-and-swap index writes -----------------------

Deno.test({
  sanitizeResources: false,
  name: "putObjectIfMatch sends If-Match, or If-None-Match: * for a null etag",
  fn: async () => {
    const seen: Array<{ ifMatch: string | null; ifNoneMatch: string | null }> =
      [];
    await withMockServer(
      (req) => {
        seen.push({
          ifMatch: req.headers.get("if-match"),
          ifNoneMatch: req.headers.get("if-none-match"),
        });
        return new Response(null, {
          status: 200,
          headers: { ETag: '"new"' },
        });
      },
      async (client) => {
        const body = new Uint8Array([1]);
        assertEquals(await client.putObjectIfMatch("k", body, '"old"'), {
          etag: '"new"',
        });
        assertEquals(await client.putObjectIfMatch("k", body, null), {
          etag: '"new"',
        });
      },
    );
    assertEquals(seen, [
      { ifMatch: '"old"', ifNoneMatch: null },
      { ifMatch: null, ifNoneMatch: "*" },
    ]);
  },
});

Deno.test({
  sanitizeResources: false,
  name: "putObjectIfMatch returns null on 412 with a malformed non-XML body",
  fn: () =>
    withMockServer(
      // A 412 is checked against a HEAD (swamp-club #2337); the object being
      // gone makes it a plain lost race.
      (req) =>
        req.method === "HEAD"
          ? new Response(null, { status: 404 })
          : new Response("precondition failed", {
            status: 412,
            headers: { "Content-Type": "text/plain" },
          }),
      async (client) => {
        assertEquals(
          await client.putObjectIfMatch("k", new Uint8Array([1]), '"x"'),
          null,
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "putObjectIfMatch surfaces NotImplemented as IfMatchUnsupportedError",
  fn: () =>
    withMockServer(
      () =>
        new Response(
          '<?xml version="1.0"?><Error><Code>NotImplemented</Code><Message>If-Match</Message></Error>',
          { status: 501, headers: { "Content-Type": "application/xml" } },
        ),
      async (client) => {
        const caught = await assertRejects(() =>
          client.putObjectIfMatch("k", new Uint8Array([1]), '"x"')
        );
        assertInstanceOf(caught, IfMatchUnsupportedError);
        assert(isIfMatchUnsupported(caught));
        assertInstanceOf(caught.cause, S3OperationError);
        assertEquals(caught.cause.name, "NotImplemented");
      },
    ),
});

// --- Issue #134: errors are enriched, not masked as "UnknownError" ---------

Deno.test({
  sanitizeResources: false,
  name: "403 with empty body surfaces status + auth hint (not UnknownError)",
  fn: () =>
    withMockServer(
      () =>
        new Response("", {
          status: 403,
          headers: { "x-amz-request-id": "req-empty" },
        }),
      async (client) => {
        let caught: unknown;
        try {
          await client.getObject("k");
        } catch (e) {
          caught = e;
        }
        assert(
          caught instanceof S3OperationError,
          "expected S3OperationError",
        );
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 403);
        assertEquals(err.requestId, "req-empty");
        assert(err.message.includes("HTTP 403"), "message has status");
        assert(
          err.message.toLowerCase().includes("credentials"),
          `auth hint expected on 401/403, got: ${err.message}`,
        );
        assert(
          !err.message.includes("UnknownError"),
          `message should not include "UnknownError", got: ${err.message}`,
        );
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "403 with HTML body (DO-Spaces-style) includes body preview in message",
  fn: () =>
    withMockServer(
      () =>
        new Response(
          "<html><body><h1>403 Forbidden</h1><p>nginx proxy says no</p></body></html>",
          {
            status: 403,
            headers: {
              "Content-Type": "text/html",
              "x-amz-request-id": "req-html",
            },
          },
        ),
      async (client) => {
        let caught: unknown;
        try {
          await client.getObject("k");
        } catch (e) {
          caught = e;
        }
        assert(caught instanceof S3OperationError);
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 403);
        assert(
          err.bodyPreview?.includes("403 Forbidden"),
          `body preview expected, got: ${err.bodyPreview}`,
        );
        assert(err.message.includes("bodyPreview="));
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "403 with valid S3 XML exposes Code (InvalidAccessKeyId)",
  fn: () =>
    withMockServer(
      () =>
        new Response(
          '<?xml version="1.0"?><Error><Code>InvalidAccessKeyId</Code><Message>The AWS Access Key Id you provided does not exist in our records.</Message><RequestId>req-xml</RequestId></Error>',
          {
            status: 403,
            headers: {
              "Content-Type": "application/xml",
              "x-amz-request-id": "req-xml",
            },
          },
        ),
      async (client) => {
        let caught: unknown;
        try {
          await client.getObject("k");
        } catch (e) {
          caught = e;
        }
        assert(caught instanceof S3OperationError);
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 403);
        assertEquals(err.code, "InvalidAccessKeyId");
        assertEquals(err.name, "InvalidAccessKeyId");
      },
    ),
});

// --- DEF-1: per-request timeout guards against hung connections -----------

Deno.test({
  // Node HTTP agent pool holds connections across requests; sanitization
  // would flag those even though the SDK schedules their close.
  sanitizeResources: false,
  sanitizeOps: false,
  name: "putObject times out when server delays longer than timeout",
  fn: () =>
    withMockServer(
      // Delay the response well past the client's timeout, then reply.
      // A delay-then-respond pattern lets Deno.serve cleanly shut down
      // after the client aborts (vs. a never-resolving handler Promise
      // which blocks server.shutdown()).
      () =>
        new Promise<Response>((resolve) => {
          setTimeout(() => resolve(new Response(null, { status: 200 })), 1_000);
        }),
      async (client) => {
        let caught: unknown;
        try {
          await client.putObject("k", new Uint8Array([1, 2, 3]));
        } catch (e) {
          caught = e;
        }
        assert(
          caught instanceof S3OperationError,
          "expected S3OperationError",
        );
        const err = caught as S3OperationError;
        assertEquals(err.name, "TimeoutError");
        assert(
          err.message.includes("timed out after 100ms"),
          `expected timeout context in message, got: ${err.message}`,
        );
      },
      { defaultRequestTimeoutMs: 100 },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "500 response on listObjects surfaces status and body preview",
  fn: () =>
    withMockServer(
      () =>
        new Response("internal error", {
          status: 500,
          headers: {
            "Content-Type": "text/plain",
            "x-amz-request-id": "req-500",
          },
        }),
      async (client) => {
        let caught: unknown;
        try {
          await client.listObjects();
        } catch (e) {
          caught = e;
        }
        assert(caught instanceof S3OperationError);
        const err = caught as S3OperationError;
        assertEquals(err.httpStatusCode, 500);
        assert(err.message.includes("listObjects"));
        // 5xx should NOT include the credentials hint
        assert(
          !err.message.toLowerCase().includes("credentials"),
          `auth hint should only fire on 401/403, got: ${err.message}`,
        );
      },
    ),
});

// --- Issue #226: SSO/credential errors get a swamp-flavoured hint ---------
// Pure-helper unit tests (no SDK, no mock server, no env).

Deno.test("classifyAwsCredentialError: CredentialsProviderError → session-expired", () => {
  assertEquals(
    classifyAwsCredentialError("CredentialsProviderError", undefined),
    "session-expired",
  );
});

Deno.test("classifyAwsCredentialError: ExpiredTokenException → session-expired", () => {
  assertEquals(
    classifyAwsCredentialError("ExpiredTokenException", undefined),
    "session-expired",
  );
});

Deno.test("classifyAwsCredentialError: InvalidAccessKeyId → credentials-rejected", () => {
  assertEquals(
    classifyAwsCredentialError("InvalidAccessKeyId", 403),
    "credentials-rejected",
  );
});

Deno.test("classifyAwsCredentialError: SignatureDoesNotMatch → credentials-rejected", () => {
  assertEquals(
    classifyAwsCredentialError("SignatureDoesNotMatch", 403),
    "credentials-rejected",
  );
});

Deno.test("classifyAwsCredentialError: AccessDenied + 403 → credentials-rejected", () => {
  assertEquals(
    classifyAwsCredentialError("AccessDenied", 403),
    "credentials-rejected",
  );
});

// 401 is a status guard: AccessDenied is the 403 shape; a 401 is a different
// failure mode (presigned URL expired, etc.) and should not be classified
// as credentials-rejected by `code` alone.
Deno.test("classifyAwsCredentialError: AccessDenied + 401 → other (status guard)", () => {
  assertEquals(
    classifyAwsCredentialError("AccessDenied", 401),
    "other",
  );
});

Deno.test("classifyAwsCredentialError: BucketRegionMismatch + 403 → other (regression)", () => {
  assertEquals(
    classifyAwsCredentialError("BucketRegionMismatch", 403),
    "other",
  );
});

Deno.test("classifyAwsCredentialError: undefined code + 403 → other", () => {
  assertEquals(
    classifyAwsCredentialError(undefined, 403),
    "other",
  );
});

Deno.test("formatAwsCredentialHint: session-expired with profile renders quoted --profile flag", () => {
  const hint = formatAwsCredentialHint("session-expired", "demo", "Datastore");
  assert(hint !== undefined);
  // Profile is double-quoted so spaces in profile names don't break the
  // copy-pasted command. Outer single quotes wrap the whole command in prose.
  assert(
    hint.includes(`aws sso login --profile "demo"`),
    `expected double-quoted --profile in hint, got: ${hint}`,
  );
  assert(hint.startsWith("Datastore session expired"));
});

Deno.test("formatAwsCredentialHint: session-expired with multi-word profile stays valid shell", () => {
  const hint = formatAwsCredentialHint(
    "session-expired",
    "my dev profile",
    "Datastore",
  );
  assert(hint !== undefined);
  // The full command appears as `Run 'aws sso login --profile "my dev profile"' to refresh`
  // — single-quoted outer, double-quoted profile, valid POSIX shell.
  assert(
    hint.includes(`aws sso login --profile "my dev profile"`),
    `expected multi-word profile to be double-quoted, got: ${hint}`,
  );
});

Deno.test("formatAwsCredentialHint: session-expired without profile renders generic command", () => {
  const hint = formatAwsCredentialHint(
    "session-expired",
    undefined,
    "Datastore",
  );
  assert(hint !== undefined);
  assert(hint.includes("aws sso login"));
  assert(
    !hint.includes("--profile"),
    `expected no --profile flag when AWS_PROFILE unset, got: ${hint}`,
  );
});

Deno.test("formatAwsCredentialHint: credentials-rejected with profile names it", () => {
  const hint = formatAwsCredentialHint(
    "credentials-rejected",
    "demo",
    "Datastore",
  );
  assert(hint !== undefined);
  assert(hint.includes("'demo'"));
  assert(hint.startsWith("Datastore credentials rejected by AWS"));
});

Deno.test("formatAwsCredentialHint: credentials-rejected without profile uses generic phrasing", () => {
  const hint = formatAwsCredentialHint(
    "credentials-rejected",
    undefined,
    "Datastore",
  );
  assert(hint !== undefined);
  assert(hint.includes("your AWS profile"));
});

Deno.test("formatAwsCredentialHint: other → undefined (caller falls through)", () => {
  assertEquals(
    formatAwsCredentialHint("other", "demo", "Datastore"),
    undefined,
  );
});

// --- Wrapper integration tests via withMockServer for server-side errors ---
//
// These tests deliberately do NOT set AWS_PROFILE — when AWS_PROFILE is set,
// the AWS SDK's credential resolver attempts to load that named profile
// from ~/.aws/credentials before falling through to the env-var keys
// withMockServer provides, which causes spurious CredentialsProviderError
// failures locally. The profile-name branches of formatAwsCredentialHint
// are covered by the pure-function unit tests above.

Deno.test({
  sanitizeResources: false,
  name: "InvalidAccessKeyId 403 prepends credentials-rejected hint",
  fn: () =>
    withAwsProfile(undefined, () =>
      withMockServer(
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>InvalidAccessKeyId</Code><Message>The AWS Access Key Id you provided does not exist in our records.</Message><RequestId>req-iaki</RequestId></Error>',
            {
              status: 403,
              headers: {
                "Content-Type": "application/xml",
                "x-amz-request-id": "req-iaki",
              },
            },
          ),
        async (client) => {
          let caught: unknown;
          try {
            await client.getObject("k");
          } catch (e) {
            caught = e;
          }
          assert(caught instanceof S3OperationError);
          const err = caught as S3OperationError;
          assert(
            err.message.startsWith("Datastore credentials rejected by AWS"),
            `expected swamp hint to lead message, got: ${err.message}`,
          );
          // .name preserved so existing `error.name === "InvalidAccessKeyId"`
          // checks at call sites keep working.
          assertEquals(err.name, "InvalidAccessKeyId");
          // Existing generic 401/403 hint should NOT also fire — the
          // credential-specific hint replaces it.
          assert(
            !err.message.includes("(check AWS credentials"),
            `generic 401/403 hint should be suppressed when credential-specific hint fires, got: ${err.message}`,
          );
        },
      )),
});

Deno.test({
  sanitizeResources: false,
  name: "AccessDenied 403 prepends credentials-rejected hint",
  fn: () =>
    withAwsProfile(undefined, () =>
      withMockServer(
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>AccessDenied</Code><Message>access denied</Message><RequestId>r</RequestId></Error>',
            {
              status: 403,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        async (client) => {
          let caught: unknown;
          try {
            await client.getObject("k");
          } catch (e) {
            caught = e;
          }
          const err = caught as S3OperationError;
          assert(
            err.message.startsWith("Datastore credentials rejected by AWS"),
            `got: ${err.message}`,
          );
          assertEquals(err.name, "AccessDenied");
        },
      )),
});

Deno.test({
  sanitizeResources: false,
  name: "SignatureDoesNotMatch 403 prepends credentials-rejected hint",
  fn: () =>
    withAwsProfile(undefined, () =>
      withMockServer(
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>SignatureDoesNotMatch</Code><Message>sig mismatch</Message><RequestId>r</RequestId></Error>',
            {
              status: 403,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        async (client) => {
          let caught: unknown;
          try {
            await client.getObject("k");
          } catch (e) {
            caught = e;
          }
          const err = caught as S3OperationError;
          assert(err.message.startsWith("Datastore credentials rejected"));
          assertEquals(err.name, "SignatureDoesNotMatch");
        },
      )),
});

// Regression guard: a non-credential 403 (e.g. BucketRegionMismatch) still
// gets the existing generic auth hint, not the credential-specific hint.
Deno.test({
  sanitizeResources: false,
  name: "BucketRegionMismatch 403 falls through to generic auth hint",
  fn: () =>
    withAwsProfile(undefined, () =>
      withMockServer(
        () =>
          new Response(
            '<?xml version="1.0"?><Error><Code>BucketRegionMismatch</Code><Message>wrong region</Message><RequestId>r</RequestId></Error>',
            {
              status: 403,
              headers: { "Content-Type": "application/xml" },
            },
          ),
        async (client) => {
          let caught: unknown;
          try {
            await client.getObject("k");
          } catch (e) {
            caught = e;
          }
          const err = caught as S3OperationError;
          assert(
            !err.message.startsWith("Datastore credentials rejected"),
            `BucketRegionMismatch should not be classified as credentials-rejected, got: ${err.message}`,
          );
          assert(
            !err.message.startsWith("Datastore session expired"),
            `BucketRegionMismatch should not be classified as session-expired, got: ${err.message}`,
          );
          assert(
            err.message.includes("(check AWS credentials"),
            `generic auth hint should still fire for non-credential 403, got: ${err.message}`,
          );
        },
      )),
});

// 5xx regression guard: no credential framing on server errors.
Deno.test({
  sanitizeResources: false,
  name: "500 response does not add credential framing",
  fn: () =>
    withAwsProfile(undefined, () =>
      withMockServer(
        () =>
          new Response("internal error", {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          }),
        async (client) => {
          let caught: unknown;
          try {
            await client.getObject("k");
          } catch (e) {
            caught = e;
          }
          const err = caught as S3OperationError;
          assert(!err.message.startsWith("Datastore"));
        },
      )),
});

// --- deriveAwsErrorCode unit tests (cause-chain handling) ----------------

Deno.test("deriveAwsErrorCode: prefers e.Code", () => {
  assertEquals(
    deriveAwsErrorCode({
      Code: "InvalidAccessKeyId",
      name: "Error",
    }),
    "InvalidAccessKeyId",
  );
});

Deno.test("deriveAwsErrorCode: falls back to e.name when set", () => {
  assertEquals(
    deriveAwsErrorCode({ name: "CredentialsProviderError" }),
    "CredentialsProviderError",
  );
});

Deno.test("deriveAwsErrorCode: ignores generic 'Error' name", () => {
  assertEquals(deriveAwsErrorCode({ name: "Error" }), undefined);
});

// Issue #226 stack trace shows `_CredentialsProviderError` on the cause.
Deno.test("deriveAwsErrorCode: walks cause chain and strips leading underscore", () => {
  const inner = new Error("Token is expired");
  inner.name = "_CredentialsProviderError";
  assertEquals(
    deriveAwsErrorCode({ name: "Error", cause: inner }),
    "CredentialsProviderError",
  );
});

Deno.test("deriveAwsErrorCode: strips multiple leading underscores", () => {
  const inner = new Error("x");
  inner.name = "__CredentialsProviderError";
  assertEquals(
    deriveAwsErrorCode({ name: "Error", cause: inner }),
    "CredentialsProviderError",
  );
});

Deno.test("deriveAwsErrorCode: ignores non-Error cause", () => {
  assertEquals(
    deriveAwsErrorCode({ name: "Error", cause: { name: "Foo" } }),
    undefined,
  );
});

Deno.test("deriveAwsErrorCode: returns undefined when no signal anywhere", () => {
  assertEquals(deriveAwsErrorCode({}), undefined);
  assertEquals(deriveAwsErrorCode({ name: "Error" }), undefined);
});

// Composition: cause-chain CredentialsProviderError flows through to the
// classifier via deriveAwsErrorCode → classifyAwsCredentialError → "session-expired".
Deno.test("composition: cause-chain _CredentialsProviderError classifies as session-expired", () => {
  const inner = new Error("Token is expired");
  inner.name = "_CredentialsProviderError";
  const code = deriveAwsErrorCode({ name: "Error", cause: inner });
  assertEquals(code, "CredentialsProviderError");
  assertEquals(
    classifyAwsCredentialError(code, undefined),
    "session-expired",
  );
});

// --- Client-side CredentialsProviderError integration test ----------------
//
// Issue #226's primary path: the SDK throws CredentialsProviderError before
// any HTTP call when the credential resolver fails. Reproduce by pointing
// AWS_PROFILE at a profile that doesn't exist, unsetting all env-var keys,
// and disabling IMDS so the chain exhausts quickly. The first SDK call
// then surfaces CredentialsProviderError, which wrapError must classify as
// session-expired and prepend the swamp-flavoured hint.

Deno.test({
  sanitizeResources: false,
  // Disable op sanitization too — the SDK's credential chain may leave
  // pending IO ops on the failed IMDS lookup despite AWS_EC2_METADATA_DISABLED.
  sanitizeOps: false,
  name:
    "Issue #226: client-side CredentialsProviderError surfaces session-expired hint",
  fn: async () => {
    const priorAccessKey = Deno.env.get("AWS_ACCESS_KEY_ID");
    const priorSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
    const priorSession = Deno.env.get("AWS_SESSION_TOKEN");
    const priorProfile = Deno.env.get("AWS_PROFILE");
    const priorImds = Deno.env.get("AWS_EC2_METADATA_DISABLED");
    const priorConfig = Deno.env.get("AWS_CONFIG_FILE");
    const priorCreds = Deno.env.get("AWS_SHARED_CREDENTIALS_FILE");
    Deno.env.delete("AWS_ACCESS_KEY_ID");
    Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    Deno.env.delete("AWS_SESSION_TOKEN");
    Deno.env.set("AWS_PROFILE", "swamp-issue-226-nonexistent-profile");
    Deno.env.set("AWS_EC2_METADATA_DISABLED", "true");
    // Point at empty files so the SDK doesn't accidentally pick up a real
    // matching profile from the developer's home directory.
    const emptyFile = await Deno.makeTempFile({ prefix: "swamp-empty-" });
    Deno.env.set("AWS_CONFIG_FILE", emptyFile);
    Deno.env.set("AWS_SHARED_CREDENTIALS_FILE", emptyFile);

    try {
      const client = new S3Client({
        bucket: "test-bucket",
        region: "us-east-1",
      });
      let caught: unknown;
      try {
        await client.headBucket();
      } catch (e) {
        caught = e;
      }
      assert(
        caught instanceof S3OperationError,
        `expected S3OperationError, got: ${caught}`,
      );
      const err = caught as S3OperationError;
      assert(
        err.message.startsWith("Datastore session expired"),
        `expected session-expired hint to lead message, got: ${err.message}`,
      );
      assert(
        err.message.includes("aws sso login"),
        `expected aws sso login remediation, got: ${err.message}`,
      );
      assert(
        err.message.includes(
          `--profile "swamp-issue-226-nonexistent-profile"`,
        ),
        `expected double-quoted --profile flag with the configured profile, got: ${err.message}`,
      );
      // .name preserved so existing `error.name === "CredentialsProviderError"`
      // checks at call sites keep working.
      assert(
        err.name === "CredentialsProviderError" ||
          err.name.endsWith("CredentialsProviderError"),
        `expected name to reflect underlying SDK error, got: ${err.name}`,
      );
    } finally {
      await Deno.remove(emptyFile).catch(() => {});
      if (priorAccessKey) Deno.env.set("AWS_ACCESS_KEY_ID", priorAccessKey);
      if (priorSecret) Deno.env.set("AWS_SECRET_ACCESS_KEY", priorSecret);
      if (priorSession) Deno.env.set("AWS_SESSION_TOKEN", priorSession);
      if (priorProfile) Deno.env.set("AWS_PROFILE", priorProfile);
      else Deno.env.delete("AWS_PROFILE");
      if (priorImds) Deno.env.set("AWS_EC2_METADATA_DISABLED", priorImds);
      else Deno.env.delete("AWS_EC2_METADATA_DISABLED");
      if (priorConfig) Deno.env.set("AWS_CONFIG_FILE", priorConfig);
      else Deno.env.delete("AWS_CONFIG_FILE");
      if (priorCreds) Deno.env.set("AWS_SHARED_CREDENTIALS_FILE", priorCreds);
      else Deno.env.delete("AWS_SHARED_CREDENTIALS_FILE");
    }
  },
});

// --- Credential preflight tests -------------------------------------------

Deno.test({
  sanitizeResources: false,
  name: "preflightCredentials: succeeds on accessible bucket",
  fn: () =>
    withMockServer(
      (req) => {
        if (req.method === "HEAD") return new Response(null, { status: 200 });
        return new Response(null, { status: 500 });
      },
      async (client) => {
        await client.preflightCredentials();
      },
    ),
});

Deno.test({
  sanitizeResources: false,
  sanitizeOps: false,
  name: "preflightCredentials: times out on stalled server",
  fn: () =>
    withMockServer(
      () =>
        new Promise<Response>((resolve) => {
          setTimeout(
            () => resolve(new Response(null, { status: 200 })),
            30_000,
          );
        }),
      async (client) => {
        const start = performance.now();
        let caught: unknown;
        try {
          await client.preflightCredentials();
        } catch (e) {
          caught = e;
        }
        const elapsed = performance.now() - start;
        assert(
          caught instanceof S3OperationError,
          `expected S3OperationError, got: ${caught}`,
        );
        const err = caught as S3OperationError;
        assertEquals(err.name, "TimeoutError");
        assert(
          err.message.includes("Credential preflight timed out"),
          `expected preflight timeout message, got: ${err.message}`,
        );
        assert(
          err.message.includes(`${PREFLIGHT_TIMEOUT_MS}ms`),
          `expected timeout value in message, got: ${err.message}`,
        );
        assert(
          elapsed < PREFLIGHT_TIMEOUT_MS + 2_000,
          `expected timeout within ~${PREFLIGHT_TIMEOUT_MS}ms, took ${elapsed}ms`,
        );
      },
      { defaultRequestTimeoutMs: 60_000 },
    ),
});

Deno.test({
  sanitizeResources: false,
  name: "preflightCredentials: propagates 403 with auth hint",
  fn: () =>
    withAwsProfile(undefined, () =>
      withMockServer(
        () => new Response("", { status: 403 }),
        async (client) => {
          let caught: unknown;
          try {
            await client.preflightCredentials();
          } catch (e) {
            caught = e;
          }
          assert(caught instanceof S3OperationError);
          const err = caught as S3OperationError;
          assertEquals(err.httpStatusCode, 403);
          assert(
            err.message.toLowerCase().includes("credentials"),
            `expected auth hint on 403, got: ${err.message}`,
          );
        },
      )),
});

// ---------------------------------------------------------------------------
// SWAMP_S3_REQUEST_TIMEOUT_MS env var
// ---------------------------------------------------------------------------

Deno.test("env var override: valid SWAMP_S3_REQUEST_TIMEOUT_MS is used", () => {
  const prior = Deno.env.get("SWAMP_S3_REQUEST_TIMEOUT_MS");
  try {
    Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", "120000");
    const client = new S3Client({ bucket: "test-bucket", region: "us-east-1" });
    // The client should construct without error; the timeout is internal
    // but we can verify the constructor didn't throw.
    assert(client instanceof S3Client);
  } finally {
    if (prior) Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", prior);
    else Deno.env.delete("SWAMP_S3_REQUEST_TIMEOUT_MS");
  }
});

Deno.test("env var override: out-of-range value is ignored (falls back to default)", () => {
  const prior = Deno.env.get("SWAMP_S3_REQUEST_TIMEOUT_MS");
  try {
    Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", "500");
    const client = new S3Client({ bucket: "test-bucket", region: "us-east-1" });
    assert(client instanceof S3Client);
  } finally {
    if (prior) Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", prior);
    else Deno.env.delete("SWAMP_S3_REQUEST_TIMEOUT_MS");
  }
});

Deno.test("env var override: non-numeric value is ignored", () => {
  const prior = Deno.env.get("SWAMP_S3_REQUEST_TIMEOUT_MS");
  try {
    Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", "not-a-number");
    const client = new S3Client({ bucket: "test-bucket", region: "us-east-1" });
    assert(client instanceof S3Client);
  } finally {
    if (prior) Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", prior);
    else Deno.env.delete("SWAMP_S3_REQUEST_TIMEOUT_MS");
  }
});

Deno.test("env var override: absent env var uses config value", () => {
  const prior = Deno.env.get("SWAMP_S3_REQUEST_TIMEOUT_MS");
  try {
    Deno.env.delete("SWAMP_S3_REQUEST_TIMEOUT_MS");
    const client = new S3Client({
      bucket: "test-bucket",
      region: "us-east-1",
      defaultRequestTimeoutMs: 90000,
    });
    assert(client instanceof S3Client);
  } finally {
    if (prior) Deno.env.set("SWAMP_S3_REQUEST_TIMEOUT_MS", prior);
  }
});

// --- Adaptive If-Match (swamp-club #2337) ---------------------------------
//
// Every case drives the real AWS SDK against a local emulator, so the
// If-Match header asserted on is the one actually put on the wire.
// sanitizeResources: false throughout — the AWS SDK's pooled connections
// outlive the test body but are reclaimed by GC.

const BODY = new TextEncoder().encode("payload");

/** Seeds `key` and returns the ETag GetObject reports for it. */
async function seed(s3: S3Client, key: string): Promise<string> {
  await s3.putObject(key, BODY);
  const { etag } = await s3.getObject(key);
  assert(etag !== undefined && etag.startsWith('"'), "expected a quoted ETag");
  return etag;
}

/** Distinct probe objects created (an aborted PUT can arrive twice). */
const probeCreates = (state: S3EmulatorState) =>
  new Set(
    state.requests.filter((r) =>
      r.method === "PUT" && r.key?.startsWith(PROBE_PREFIX) &&
      r.ifMatch === null
    ).map((r) => r.key),
  ).size;

Deno.test("unquoteETag strips one pair of surrounding quotes only", () => {
  assertEquals(unquoteETag('"abc"'), "abc");
  assertEquals(unquoteETag("abc"), "abc");
  assertEquals(unquoteETag('"'), '"');
  assertEquals(unquoteETag('""x""'), '"x"');
});

Deno.test({
  name:
    "putObjectIfMatch: an endpoint honouring quoted ETags gets one quoted PUT",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator({}, async (s3, state) => {
      const etag = await seed(s3, "k");
      state.requests.length = 0;

      assert(await s3.putObjectIfMatch("k", BODY, etag) !== null);
      assertEquals(
        state.requests.map((r) => [r.method, r.key, r.ifMatch]),
        [["PUT", "k", etag]],
      );
    }),
});

Deno.test({
  name:
    "putObjectIfMatch: a genuine lost race returns null after one HEAD, no probe",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator({}, async (s3, state) => {
      const etag = await seed(s3, "k");
      state.requests.length = 0;

      assertEquals(await s3.putObjectIfMatch("k", BODY, '"stale"'), null);
      assertEquals(
        state.requests.map((r) => [r.method, r.key, r.status]),
        [["PUT", "k", 412], ["HEAD", "k", 200]],
      );

      // Still quoted: the next CAS is a single quoted PUT.
      state.requests.length = 0;
      assert(await s3.putObjectIfMatch("k", BODY, etag) !== null);
      assertEquals(state.requests.length, 1);
      assertEquals(state.requests[0].ifMatch, etag);
    }),
});

Deno.test({
  name:
    "putObjectIfMatch: quoted ETag rejected (RGW 19.2.5) → probe, then unquoted",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator({ quotedIfMatch: "reject" }, async (s3, state) => {
      const etag = await seed(s3, "k");
      state.requests.length = 0;

      const result = await s3.putObjectIfMatch("k", BODY, etag);
      assert(result !== null, "CAS with the current ETag must succeed");

      const onKey = state.requests.filter((r) => r.key === "k");
      assertEquals(
        onKey.map((r) => [r.method, r.ifMatch, r.status]),
        [
          ["PUT", etag, 412],
          ["HEAD", null, 200],
          ["PUT", unquoteETag(etag), 200],
        ],
      );
      assertEquals(probeCreates(state), 1);
      assert(
        state.requests.some((r) =>
          r.method === "DELETE" && r.key?.startsWith(PROBE_PREFIX)
        ),
        "probe object must be cleaned up",
      );
      assert(
        ![...state.objects.keys()].some((k) => k.startsWith(PROBE_PREFIX)),
      );

      // Now unquoted from the start: one PUT, no HEAD, no probe.
      const { etag: next } = await s3.getObject("k");
      state.requests.length = 0;
      assert(await s3.putObjectIfMatch("k", BODY, next!) !== null);
      assertEquals(
        state.requests.map((r) => [r.method, r.ifMatch]),
        [["PUT", unquoteETag(next!)]],
      );

      // A genuine race in unquoted mode is still a lost race.
      state.requests.length = 0;
      assertEquals(await s3.putObjectIfMatch("k", BODY, '"stale"'), null);
      assertEquals(state.requests.length, 1);
    }),
});

Deno.test({
  name:
    "putObjectIfMatch: RGW-style rejection with non-XML 412 bodies still adapts",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator(
      { quotedIfMatch: "reject", nonXmlPreconditionBody: true },
      async (s3, state) => {
        const etag = await seed(s3, "k");
        assert(await s3.putObjectIfMatch("k", BODY, etag) !== null);

        const { etag: next } = await s3.getObject("k");
        state.requests.length = 0;
        assert(await s3.putObjectIfMatch("k", BODY, next!) !== null);
        assertEquals(state.requests[0].ifMatch, unquoteETag(next!));
      },
    ),
});

Deno.test({
  name:
    "putObjectIfMatch: current ETag rejected in both forms → IfMatchUnsupportedError",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator(
      { quotedIfMatch: "reject", unquotedIfMatch: "reject" },
      async (s3, state) => {
        const etag = await seed(s3, "k");

        const err = await assertRejects(() =>
          s3.putObjectIfMatch("k", BODY, etag)
        );
        assertInstanceOf(err, IfMatchUnsupportedError);
        assert(isIfMatchUnsupported(err));

        // Sticky: the next call fails without touching the network.
        state.requests.length = 0;
        await assertRejects(
          () => s3.putObjectIfMatch("k", BODY, etag),
          IfMatchUnsupportedError,
        );
        assertEquals(state.requests.length, 0);

        // If-None-Match creates are unaffected.
        assert(await s3.putObjectIfMatch("new", BODY, null) !== null);
      },
    ),
});

Deno.test({
  name:
    "putObjectIfMatch: an endpoint ignoring unquoted If-Match is never trusted with it",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator(
      { quotedIfMatch: "reject", unquotedIfMatch: "ignore" },
      async (s3, state) => {
        const etag = await seed(s3, "k");
        const before = state.objects.get("k")!.etag;

        await assertRejects(
          () => s3.putObjectIfMatch("k", BODY, etag),
          IfMatchUnsupportedError,
        );
        // The real object was never written blind.
        assertEquals(state.objects.get("k")!.etag, before);
      },
    ),
});

Deno.test({
  name: "putObjectIfMatch: concurrent calls share one probe",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator({ quotedIfMatch: "reject" }, async (s3, state) => {
      const e1 = await seed(s3, "k1");
      const e2 = await seed(s3, "k2");
      const e3 = await seed(s3, "k3");

      const results = await Promise.all([
        s3.putObjectIfMatch("k1", BODY, e1),
        s3.putObjectIfMatch("k2", BODY, e2),
        s3.putObjectIfMatch("k3", BODY, e3),
      ]);
      assert(results.every((r) => r !== null));
      assertEquals(probeCreates(state), 1);
    }),
});

Deno.test({
  name:
    "putObjectIfMatch: a failed probe propagates its error and is retried next call",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator(
      {
        quotedIfMatch: "reject",
        denyPut: (key) => key.startsWith(PROBE_PREFIX),
      },
      async (s3, state) => {
        const etag = await seed(s3, "k");

        const err = await assertRejects(() =>
          s3.putObjectIfMatch("k", BODY, etag)
        );
        assertInstanceOf(err, S3OperationError);
        assertEquals(err.httpStatusCode, 403);
        assert(!isIfMatchUnsupported(err));

        state.options.denyPut = undefined;
        assert(await s3.putObjectIfMatch("k", BODY, etag) !== null);
        assertEquals(probeCreates(state), 2);
      },
    ),
});

Deno.test({
  name:
    "putObjectIfMatch: a 412 with no ETag on HEAD is a lost race, not a probe",
  sanitizeResources: false,
  fn: () =>
    withS3Emulator(
      { quotedIfMatch: "reject", omitHeadETag: true },
      async (s3, state) => {
        const etag = await seed(s3, "k");

        assertEquals(await s3.putObjectIfMatch("k", BODY, etag), null);
        assertEquals(probeCreates(state), 0);

        // Mode unchanged: still sends the quoted form.
        state.requests.length = 0;
        await s3.putObjectIfMatch("k", BODY, etag);
        assertEquals(state.requests[0].ifMatch, etag);
      },
    ),
});

Deno.test({
  name: "putObjectIfMatch: an abort during the probe is not memoized",
  sanitizeResources: false,
  fn: async () => {
    const controller = new AbortController();
    await withS3Emulator(
      {
        quotedIfMatch: "reject",
        onRequest: (method, key) => {
          if (method === "PUT" && key.startsWith(PROBE_PREFIX)) {
            controller.abort();
          }
        },
      },
      async (s3, state) => {
        const etag = await seed(s3, "k");

        const err = await assertRejects(() =>
          s3.putObjectIfMatch("k", BODY, etag, controller.signal)
        );
        assert(!isIfMatchUnsupported(err));

        state.options.onRequest = undefined;
        assert(await s3.putObjectIfMatch("k", BODY, etag) !== null);
        assertEquals(probeCreates(state), 2);
      },
    );
  },
});

Deno.test({
  name:
    "classifyIfMatch: reports each form without re-entering the adaptive path",
  sanitizeResources: false,
  fn: async () => {
    const cases: Array<
      [
        Parameters<typeof withS3Emulator>[0],
        { quoted: boolean; unquoted: boolean } | null,
      ]
    > = [
      [{}, { quoted: true, unquoted: true }],
      [{ quotedIfMatch: "reject" }, { quoted: false, unquoted: true }],
      [
        { quotedIfMatch: "reject", unquotedIfMatch: "reject" },
        { quoted: false, unquoted: false },
      ],
      [
        { quotedIfMatch: "reject", unquotedIfMatch: "ignore" },
        { quoted: false, unquoted: false },
      ],
      [{ omitHeadETag: true }, null],
    ];
    for (const [options, expected] of cases) {
      await withS3Emulator(options, async (s3, state) => {
        await seed(s3, "probe");
        // A deadlock here would hang forever; bound it.
        let timer: ReturnType<typeof setTimeout> | undefined;
        const timeout = new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new Error("classify hung")), 5000);
        });
        try {
          assertEquals(
            await Promise.race([s3.classifyIfMatch("probe", BODY), timeout]),
            expected,
          );
        } finally {
          clearTimeout(timer);
        }
        assertEquals(probeCreates(state), 0);
      });
    }
  },
});
