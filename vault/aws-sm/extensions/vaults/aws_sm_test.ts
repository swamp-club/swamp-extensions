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
  assertRejects,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  assertVaultConformance,
  assertVaultExportConformance,
} from "@systeminit/swamp-testing";
import { vault } from "./aws_sm.ts";
import { AwsSmOperationError } from "./aws_sm_errors.ts";

Deno.test("vault export conforms to VaultProvider contract", () => {
  assertVaultExportConformance(vault, {
    validConfigs: [
      { region: "us-east-1" },
      { region: "eu-west-1" },
    ],
    invalidConfigs: [
      {},
      { region: "" },
    ],
  });
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});

// --- Behavioral tests using a local mock AWS server ---

/**
 * Per-target override response for the mock AWS server. When set for a
 * given operation (GetSecretValue, PutSecretValue, etc.), the override
 * takes precedence over the default secrets-Map behaviour. Tests use
 * this to inject error bodies — including malformed bodies without the
 * expected `__type` field — without rebuilding the mock server.
 */
interface MockResponse {
  status: number;
  body: BodyInit | null;
  contentType?: string;
}

interface MockOverrides {
  GetSecretValue?: MockResponse;
  PutSecretValue?: MockResponse;
  CreateSecret?: MockResponse;
  ListSecrets?: MockResponse;
}

function mockResponse(r: MockResponse): Response {
  return new Response(r.body, {
    status: r.status,
    headers: {
      "content-type": r.contentType ?? "application/x-amz-json-1.1",
    },
  });
}

/** Start a local HTTP server that simulates AWS Secrets Manager. */
function startMockAwsServer(overrides: MockOverrides = {}): {
  url: string;
  server: Deno.HttpServer;
  secrets: Map<string, string>;
} {
  const secrets = new Map<string, string>();

  const server = Deno.serve({ port: 0, onListen() {} }, async (req) => {
    const target = req.headers.get("x-amz-target") ?? "";
    const body = await req.json();

    if (target.includes("GetSecretValue")) {
      if (overrides.GetSecretValue) {
        return mockResponse(overrides.GetSecretValue);
      }
      const val = secrets.get(body.SecretId);
      if (!val) {
        return Response.json({
          __type: "ResourceNotFoundException",
          Message: `Secret ${body.SecretId} not found`,
        }, { status: 400 });
      }
      return Response.json({ SecretString: val });
    }

    if (target.includes("PutSecretValue")) {
      if (overrides.PutSecretValue) {
        return mockResponse(overrides.PutSecretValue);
      }
      secrets.set(body.SecretId, body.SecretString);
      return Response.json({});
    }

    if (target.includes("CreateSecret")) {
      if (overrides.CreateSecret) return mockResponse(overrides.CreateSecret);
      secrets.set(body.Name, body.SecretString);
      return Response.json({ Name: body.Name });
    }

    if (target.includes("ListSecrets")) {
      if (overrides.ListSecrets) return mockResponse(overrides.ListSecrets);
      return Response.json({
        SecretList: [...secrets.keys()].map((n) => ({ Name: n })),
      });
    }

    return Response.json({ __type: "UnknownOperationException" }, {
      status: 400,
    });
  });

  const addr = server.addr as Deno.NetAddr;
  return { url: `http://localhost:${addr.port}`, server, secrets };
}

/**
 * Run a test with a mock AWS server, setting AWS_ENDPOINT_URL and fake
 * credentials. AWS_PROFILE is scrubbed for the duration of the test so
 * a developer's shell env doesn't poison hint assertions (which read
 * AWS_PROFILE at wrap time and embed it in the suggested SSO command).
 */
async function withMockAws<T>(
  fn: (secrets: Map<string, string>) => Promise<T>,
  overrides: MockOverrides = {},
): Promise<T> {
  const { url, server, secrets } = startMockAwsServer(overrides);
  const originalEndpoint = Deno.env.get("AWS_ENDPOINT_URL");
  const originalKey = Deno.env.get("AWS_ACCESS_KEY_ID");
  const originalSecret = Deno.env.get("AWS_SECRET_ACCESS_KEY");
  const originalProfile = Deno.env.get("AWS_PROFILE");

  Deno.env.set("AWS_ENDPOINT_URL", url);
  // SDK needs credentials even for a mock endpoint
  Deno.env.set("AWS_ACCESS_KEY_ID", "test");
  Deno.env.set("AWS_SECRET_ACCESS_KEY", "test");
  Deno.env.delete("AWS_PROFILE");

  try {
    return await fn(secrets);
  } finally {
    if (originalEndpoint) {
      Deno.env.set("AWS_ENDPOINT_URL", originalEndpoint);
    } else {
      Deno.env.delete("AWS_ENDPOINT_URL");
    }
    if (originalKey) {
      Deno.env.set("AWS_ACCESS_KEY_ID", originalKey);
    } else {
      Deno.env.delete("AWS_ACCESS_KEY_ID");
    }
    if (originalSecret) {
      Deno.env.set("AWS_SECRET_ACCESS_KEY", originalSecret);
    } else {
      Deno.env.delete("AWS_SECRET_ACCESS_KEY");
    }
    if (originalProfile !== undefined) {
      Deno.env.set("AWS_PROFILE", originalProfile);
    } else {
      Deno.env.delete("AWS_PROFILE");
    }
    await server.shutdown();
  }
}

// AWS SDK keeps TCP connections alive (connection pooling), which triggers
// Deno's resource leak detection. sanitizeResources: false is safe here
// because the connections are cleaned up when the SDK client is garbage collected.

// AWS SDK keeps TCP connections alive (connection pooling), which triggers
// Deno's resource leak detection. sanitizeResources: false is needed for
// tests that create SDK clients against the mock server.

Deno.test({
  name: "aws-sm vault: get returns stored secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("my-key", "my-value");
      const result = await provider.get("my-key");
      assertEquals(result, "my-value");
    });
  },
});

Deno.test({
  name: "aws-sm vault: get rejects for missing secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await assertRejects(() => provider.get("nonexistent"));
    });
  },
});

Deno.test({
  name: "aws-sm vault: list returns stored keys",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("key-a", "val-a");
      await provider.put("key-b", "val-b");
      const keys = await provider.list();
      assertEquals(keys.includes("key-a"), true);
      assertEquals(keys.includes("key-b"), true);
    });
  },
});

Deno.test({
  name: "aws-sm vault: put overwrites existing secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("my-key", "original");
      await provider.put("my-key", "updated");
      const result = await provider.get("my-key");
      assertEquals(result, "updated");
    });
  },
});

Deno.test({
  name: "aws-sm vault: passes full VaultProvider conformance",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await assertVaultConformance(provider);
    });
  },
});

// --- Error-wrapping behavioural tests ---

Deno.test({
  name:
    "aws-sm vault: get on ExpiredTokenException → 'Vault session expired:' prefix",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      const err = await assertRejects(() => provider.get("anything"));
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.name, "ExpiredTokenException");
      assert(
        err.message.startsWith("Vault session expired:"),
        `expected "Vault session expired:" prefix, got: ${err.message}`,
      );
    }, {
      GetSecretValue: {
        status: 400,
        body: JSON.stringify({
          __type: "ExpiredTokenException",
          Message: "The security token included in the request is expired",
        }),
      },
    });
  },
});

Deno.test({
  name:
    "aws-sm vault: get on 403 AccessDenied → 'Vault credentials rejected by AWS:' prefix",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      const err = await assertRejects(() => provider.get("anything"));
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.httpStatusCode, 403);
      assert(
        err.message.startsWith("Vault credentials rejected by AWS:"),
        `expected "Vault credentials rejected by AWS:" prefix, got: ${err.message}`,
      );
    }, {
      GetSecretValue: {
        status: 403,
        body: JSON.stringify({
          __type: "AccessDenied",
          Message: "Access denied",
        }),
      },
    });
  },
});

Deno.test({
  name:
    "aws-sm vault: list propagates the wrapper on credential error (covers all four ops)",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      const err = await assertRejects(() => provider.list());
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.name, "ExpiredTokenException");
      assert(err.message.startsWith("Vault session expired:"));
    }, {
      ListSecrets: {
        status: 400,
        body: JSON.stringify({
          __type: "ExpiredTokenException",
          Message: "The security token included in the request is expired",
        }),
      },
    });
  },
});

Deno.test({
  name:
    "aws-sm vault: put initial PutSecretValue propagates the wrapper on credential error",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      const err = await assertRejects(() => provider.put("k", "v"));
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.name, "ExpiredTokenException");
      assert(err.message.startsWith("Vault session expired:"));
    }, {
      PutSecretValue: {
        status: 400,
        body: JSON.stringify({
          __type: "ExpiredTokenException",
          Message: "The security token included in the request is expired",
        }),
      },
    });
  },
});

// Regression guard for the instanceof → name migration in put(): the
// previous implementation used `error instanceof ResourceNotFoundException`
// against the raw SDK error class. After wrapping, the thrown error is
// AwsSmOperationError, so the check became `error.name === ...`. If that
// migration regresses, this test fails because the secret never gets
// created (PutSecretValue rethrows AwsSmOperationError instead of falling
// through to CreateSecret).
Deno.test({
  name:
    "aws-sm vault: put fallback to CreateSecret still works after wrapper migration",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async (secrets) => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      // No override on CreateSecret → mock writes to secrets Map.
      await provider.put("brand-new-key", "the-value");
      assertEquals(secrets.get("brand-new-key"), "the-value");
    }, {
      PutSecretValue: {
        status: 400,
        body: JSON.stringify({
          __type: "ResourceNotFoundException",
          Message: "Secret not found",
        }),
      },
    });
  },
});

// SDK Wrap Defense: a malformed error response (no __type, no Message)
// must still surface as an AwsSmOperationError with HTTP status, and
// the wrapper's noise filters must strip the SDK's "Unknown" /
// "UnknownError" defaults. Empirically verified at
// @aws-sdk/client-secrets-manager@3.1024.0 (probe 2026-05-06): an HTTP
// 400 with body "{}" produces err.name="Unknown" and
// err.message="UnknownError".
Deno.test({
  name:
    "aws-sm vault: malformed error body without __type still surfaces a clean message",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      const err = await assertRejects(() => provider.get("anything"));
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.httpStatusCode, 400);
      assert(err.message.includes("AWS Secrets Manager GetSecretValue failed"));
      assert(err.message.includes("HTTP 400"));
      assert(
        !err.message.includes("Unknown"),
        `expected wrapped message to NOT contain "Unknown", got: ${err.message}`,
      );
      assert(
        !err.message.includes("UnknownError"),
        `expected wrapped message to NOT contain "UnknownError", got: ${err.message}`,
      );
    }, {
      GetSecretValue: { status: 400, body: "{}" },
    });
  },
});
