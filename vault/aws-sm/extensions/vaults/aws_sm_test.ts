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
import {
  createVaultAnnotation,
  vault,
  type VaultAnnotationProvider,
} from "./aws_sm.ts";
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
  DescribeSecret?: MockResponse;
  UpdateSecret?: MockResponse;
  TagResource?: MockResponse;
  UntagResource?: MockResponse;
}

function mockResponse(r: MockResponse): Response {
  return new Response(r.body, {
    status: r.status,
    headers: {
      "content-type": r.contentType ?? "application/x-amz-json-1.1",
    },
  });
}

interface SecretMetadata {
  description: string;
  tags: Map<string, string>;
}

/** Start a local HTTP server that simulates AWS Secrets Manager. */
function startMockAwsServer(overrides: MockOverrides = {}): {
  url: string;
  server: Deno.HttpServer;
  secrets: Map<string, string>;
  metadata: Map<string, SecretMetadata>;
} {
  const secrets = new Map<string, string>();
  const metadata = new Map<string, SecretMetadata>();

  function ensureMetadata(secretId: string): SecretMetadata {
    let meta = metadata.get(secretId);
    if (!meta) {
      meta = { description: "", tags: new Map() };
      metadata.set(secretId, meta);
    }
    return meta;
  }

  function tagsToArray(
    tags: Map<string, string>,
  ): { Key: string; Value: string }[] {
    return [...tags.entries()].map(([Key, Value]) => ({ Key, Value }));
  }

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

    if (target.includes("DescribeSecret")) {
      if (overrides.DescribeSecret) {
        return mockResponse(overrides.DescribeSecret);
      }
      if (!secrets.has(body.SecretId)) {
        return Response.json({
          __type: "ResourceNotFoundException",
          Message: `Secret ${body.SecretId} not found`,
        }, { status: 400 });
      }
      const meta = ensureMetadata(body.SecretId);
      return Response.json({
        Name: body.SecretId,
        Description: meta.description,
        Tags: tagsToArray(meta.tags),
        LastChangedDate: Date.now() / 1000,
      });
    }

    if (target.includes("UpdateSecret")) {
      if (overrides.UpdateSecret) {
        return mockResponse(overrides.UpdateSecret);
      }
      if (!secrets.has(body.SecretId)) {
        return Response.json({
          __type: "ResourceNotFoundException",
          Message: `Secret ${body.SecretId} not found`,
        }, { status: 400 });
      }
      const meta = ensureMetadata(body.SecretId);
      if (body.Description !== undefined) {
        meta.description = body.Description;
      }
      return Response.json({ Name: body.SecretId });
    }

    if (target.includes("TagResource")) {
      if (overrides.TagResource) return mockResponse(overrides.TagResource);
      const meta = ensureMetadata(body.SecretId);
      for (const tag of body.Tags ?? []) {
        meta.tags.set(tag.Key, tag.Value);
      }
      return Response.json({});
    }

    if (target.includes("UntagResource")) {
      if (overrides.UntagResource) return mockResponse(overrides.UntagResource);
      const meta = ensureMetadata(body.SecretId);
      for (const key of body.TagKeys ?? []) {
        meta.tags.delete(key);
      }
      return Response.json({});
    }

    if (target.includes("ListSecrets")) {
      if (overrides.ListSecrets) return mockResponse(overrides.ListSecrets);
      return Response.json({
        SecretList: [...secrets.keys()].map((n) => {
          const meta = metadata.get(n);
          return {
            Name: n,
            Description: meta?.description ?? "",
            Tags: meta ? tagsToArray(meta.tags) : [],
            LastChangedDate: Date.now() / 1000,
          };
        }),
      });
    }

    return Response.json({ __type: "UnknownOperationException" }, {
      status: 400,
    });
  });

  const addr = server.addr as Deno.NetAddr;
  return { url: `http://localhost:${addr.port}`, server, secrets, metadata };
}

/**
 * Run a test with a mock AWS server, setting AWS_ENDPOINT_URL and fake
 * credentials. AWS_PROFILE is scrubbed for the duration of the test so
 * a developer's shell env doesn't poison hint assertions (which read
 * AWS_PROFILE at wrap time and embed it in the suggested SSO command).
 */
async function withMockAws<T>(
  fn: (
    secrets: Map<string, string>,
    metadata: Map<string, SecretMetadata>,
  ) => Promise<T>,
  overrides: MockOverrides = {},
): Promise<T> {
  const { url, server, secrets, metadata } = startMockAwsServer(overrides);
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
    return await fn(secrets, metadata);
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

// --- VaultAnnotationProvider behavioral tests ---

function asAnnotationProvider(
  provider: ReturnType<typeof vault.createProvider>,
): VaultAnnotationProvider {
  return provider as unknown as VaultAnnotationProvider;
}

Deno.test({
  name: "aws-sm vault: putAnnotation/getAnnotation roundtrip",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("annotated-secret", "secret-value");

      const ap = asAnnotationProvider(provider);
      await ap.putAnnotation(
        "annotated-secret",
        createVaultAnnotation({
          url: "https://console.aws.amazon.com/secretsmanager",
          notes: "Production API key",
          labels: { env: "prod", team: "infra" },
        }),
      );

      const annotation = await ap.getAnnotation("annotated-secret");
      assert(annotation !== null);
      assertEquals(
        annotation.url,
        "https://console.aws.amazon.com/secretsmanager",
      );
      assertEquals(annotation.notes, "Production API key");
      assertEquals(annotation.labels?.env, "prod");
      assertEquals(annotation.labels?.team, "infra");
      assert(annotation.updatedAt !== undefined);
    });
  },
});

Deno.test({
  name: "aws-sm vault: getAnnotation returns null for unannotated secret",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("bare-secret", "value");

      const ap = asAnnotationProvider(provider);
      const annotation = await ap.getAnnotation("bare-secret");
      assertEquals(annotation, null);
    });
  },
});

Deno.test({
  name: "aws-sm vault: putAnnotation with only notes",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("notes-only", "value");

      const ap = asAnnotationProvider(provider);
      await ap.putAnnotation(
        "notes-only",
        createVaultAnnotation({ notes: "Just a note" }),
      );

      const annotation = await ap.getAnnotation("notes-only");
      assert(annotation !== null);
      assertEquals(annotation.notes, "Just a note");
      assertEquals(annotation.url, undefined);
      assertEquals(Object.keys(annotation.labels).length, 0);
    });
  },
});

Deno.test({
  name: "aws-sm vault: putAnnotation with only url",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("url-only", "value");

      const ap = asAnnotationProvider(provider);
      await ap.putAnnotation(
        "url-only",
        createVaultAnnotation({ url: "https://example.com" }),
      );

      const annotation = await ap.getAnnotation("url-only");
      assert(annotation !== null);
      assertEquals(annotation.url, "https://example.com");
      assertEquals(annotation.notes, undefined);
      assertEquals(Object.keys(annotation.labels).length, 0);
    });
  },
});

Deno.test({
  name: "aws-sm vault: putAnnotation with only labels",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("labels-only", "value");

      const ap = asAnnotationProvider(provider);
      await ap.putAnnotation(
        "labels-only",
        createVaultAnnotation({ labels: { env: "staging" } }),
      );

      const annotation = await ap.getAnnotation("labels-only");
      assert(annotation !== null);
      assertEquals(annotation.url, undefined);
      assertEquals(annotation.notes, undefined);
      assertEquals(annotation.labels?.env, "staging");
    });
  },
});

Deno.test({
  name: "aws-sm vault: deleteAnnotation removes all annotation data",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("to-delete", "value");

      const ap = asAnnotationProvider(provider);
      await ap.putAnnotation(
        "to-delete",
        createVaultAnnotation({
          url: "https://example.com",
          notes: "Will be deleted",
          labels: { env: "prod" },
        }),
      );

      const before = await ap.getAnnotation("to-delete");
      assert(before !== null);

      await ap.deleteAnnotation("to-delete");

      const after = await ap.getAnnotation("to-delete");
      assertEquals(after, null);
    });
  },
});

Deno.test({
  name: "aws-sm vault: listAnnotations returns only annotated secrets",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("annotated", "value1");
      await provider.put("bare", "value2");

      const ap = asAnnotationProvider(provider);
      await ap.putAnnotation(
        "annotated",
        createVaultAnnotation({ notes: "Has annotation" }),
      );

      const all = await ap.listAnnotations();
      assertEquals(all.size, 1);
      assert(all.has("annotated"));
      assertEquals(all.get("annotated")?.notes, "Has annotation");
      assert(!all.has("bare"));
    });
  },
});

Deno.test({
  name: "aws-sm vault: listAnnotations returns empty map when none annotated",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("bare1", "value1");
      await provider.put("bare2", "value2");

      const ap = asAnnotationProvider(provider);
      const all = await ap.listAnnotations();
      assertEquals(all.size, 0);
    });
  },
});

Deno.test({
  name:
    "aws-sm vault: DescribeSecret credential error → 'Vault session expired:' prefix",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("target", "value");

      const ap = asAnnotationProvider(provider);
      const err = await assertRejects(() => ap.getAnnotation("target"));
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.name, "ExpiredTokenException");
      assert(
        err.message.startsWith("Vault session expired:"),
        `expected "Vault session expired:" prefix, got: ${err.message}`,
      );
    }, {
      DescribeSecret: {
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
  name: "aws-sm vault: malformed DescribeSecret response wraps cleanly",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("target", "value");

      const ap = asAnnotationProvider(provider);
      const err = await assertRejects(() => ap.getAnnotation("target"));
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.httpStatusCode, 500);
      assert(
        err.message.includes("AWS Secrets Manager DescribeSecret failed"),
      );
    }, {
      DescribeSecret: { status: 500, body: "{}" },
    });
  },
});

Deno.test({
  name: "aws-sm vault: TagResource error surfaces actionable message",
  sanitizeResources: false,
  fn: async () => {
    await withMockAws(async () => {
      const provider = vault.createProvider("test", { region: "us-east-1" });
      await provider.put("tag-fail", "value");

      const ap = asAnnotationProvider(provider);
      const err = await assertRejects(() =>
        ap.putAnnotation(
          "tag-fail",
          createVaultAnnotation({ labels: { env: "prod" } }),
        )
      );
      assert(err instanceof AwsSmOperationError);
      assertEquals(err.httpStatusCode, 400);
      assert(err.message.includes("AWS Secrets Manager TagResource failed"));
    }, {
      TagResource: {
        status: 400,
        body: JSON.stringify({
          __type: "InvalidParameterException",
          Message: "Too many tags",
        }),
      },
    });
  },
});
