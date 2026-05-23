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
  assertEquals,
  assertExists,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { assertVaultExportConformance } from "@systeminit/swamp-testing";
import {
  _createTestProvider,
  vault,
  VaultAnnotation,
  type VaultAnnotationProvider,
  type VaultProvider,
} from "./azure_kv.ts";

Deno.test("vault export conforms to VaultProvider contract", () => {
  assertVaultExportConformance(vault, {
    validConfigs: [
      { vault_url: "https://myvault.vault.azure.net/" },
      {
        vault_url: "https://myvault.vault.azure.net/",
        secret_prefix: "swamp/",
      },
    ],
    invalidConfigs: [
      {},
      { vault_url: "not-a-url" },
    ],
  });
});

Deno.test("createProvider throws on invalid config", () => {
  assertThrows(
    () => vault.createProvider("bad-vault", {}),
    Error,
  );
});

Deno.test("createProvider returns a provider with annotation methods", () => {
  const provider = vault.createProvider("test", {
    vault_url: "https://myvault.vault.azure.net/",
  });
  // No upstream conformance helper exists for VaultAnnotationProvider yet
  const annotationProvider = provider as
    & VaultProvider
    & VaultAnnotationProvider;
  assertEquals(typeof annotationProvider.getAnnotation, "function");
  assertEquals(typeof annotationProvider.putAnnotation, "function");
  assertEquals(typeof annotationProvider.deleteAnnotation, "function");
  assertEquals(typeof annotationProvider.listAnnotations, "function");
});

// --- VaultAnnotation class unit tests ---

Deno.test("VaultAnnotation.create sets fields and updatedAt", () => {
  const before = new Date();
  const annotation = VaultAnnotation.create({
    url: "https://example.com",
    notes: "test note",
    labels: { env: "prod" },
  });
  const after = new Date();

  assertEquals(annotation.url, "https://example.com");
  assertEquals(annotation.notes, "test note");
  assertEquals(annotation.labels, { env: "prod" });
  assertEquals(annotation.updatedAt >= before, true);
  assertEquals(annotation.updatedAt <= after, true);
});

Deno.test("VaultAnnotation.create with no fields", () => {
  const annotation = VaultAnnotation.create({});
  assertEquals(annotation.url, undefined);
  assertEquals(annotation.notes, undefined);
  assertEquals(annotation.labels, {});
});

Deno.test("VaultAnnotation.toData serializes correctly", () => {
  const annotation = new VaultAnnotation(
    "https://example.com",
    "test note",
    { env: "prod" },
    new Date("2026-01-01T00:00:00.000Z"),
  );
  const data = annotation.toData();
  assertEquals(data.url, "https://example.com");
  assertEquals(data.notes, "test note");
  assertEquals(data.labels, { env: "prod" });
  assertEquals(data.updatedAt, "2026-01-01T00:00:00.000Z");
});

Deno.test("VaultAnnotation.toData omits undefined fields", () => {
  const annotation = new VaultAnnotation(
    undefined,
    undefined,
    {},
    new Date("2026-01-01T00:00:00.000Z"),
  );
  const data = annotation.toData();
  assertEquals(data.url, undefined);
  assertEquals(data.notes, undefined);
  assertEquals(data.labels, undefined);
  assertEquals(data.updatedAt, "2026-01-01T00:00:00.000Z");
});

Deno.test("VaultAnnotation.fromData round-trips through toData", () => {
  const original = VaultAnnotation.create({
    url: "https://example.com",
    notes: "notes",
    labels: { a: "1", b: "2" },
  });
  const data = original.toData();
  const restored = VaultAnnotation.fromData(data);
  assertEquals(restored.url, original.url);
  assertEquals(restored.notes, original.notes);
  assertEquals({ ...restored.labels }, { ...original.labels });
});

Deno.test("VaultAnnotation.merge merges fields correctly", () => {
  const original = VaultAnnotation.create({
    url: "https://old.com",
    notes: "old notes",
    labels: { env: "prod", team: "infra" },
  });

  const merged = original.merge({
    url: "https://new.com",
    labels: { team: "platform", region: "us" },
  });

  assertEquals(merged.url, "https://new.com");
  assertEquals(merged.notes, "old notes");
  assertEquals({ ...merged.labels }, {
    env: "prod",
    team: "platform",
    region: "us",
  });
});

Deno.test("VaultAnnotation.merge preserves existing when update is undefined", () => {
  const original = VaultAnnotation.create({
    url: "https://keep.com",
    notes: "keep",
  });
  const merged = original.merge({});
  assertEquals(merged.url, "https://keep.com");
  assertEquals(merged.notes, "keep");
});

Deno.test("VaultAnnotation.isEmpty returns true for empty annotation", () => {
  const empty = VaultAnnotation.create({});
  assertEquals(empty.isEmpty(), true);
});

Deno.test("VaultAnnotation.isEmpty returns false when url is set", () => {
  assertEquals(VaultAnnotation.create({ url: "x" }).isEmpty(), false);
});

Deno.test("VaultAnnotation.isEmpty returns false when notes is set", () => {
  assertEquals(VaultAnnotation.create({ notes: "x" }).isEmpty(), false);
});

Deno.test("VaultAnnotation.isEmpty returns false when labels is non-empty", () => {
  assertEquals(
    VaultAnnotation.create({ labels: { a: "b" } }).isEmpty(),
    false,
  );
});

Deno.test("VaultAnnotation.labels is frozen", () => {
  const annotation = VaultAnnotation.create({ labels: { a: "1" } });
  assertThrows(() => {
    (annotation.labels as Record<string, string>)["b"] = "2";
  });
});

// --- Emulator-backed behavioral tests ---
// Requires: docker pull --platform linux/amd64 ghcr.io/rokeller/azure-keyvault-emulator:v2
// The emulator runs HTTPS on port 11001 with a self-signed cert.
// Tests use tlsOptions: { rejectUnauthorized: false } to bypass cert validation.
// Auth uses a static JWT that the emulator accepts (it only validates well-formedness).

const EMULATOR_PORT = 11001;
const EMULATOR_IMAGE = "ghcr.io/rokeller/azure-keyvault-emulator:v2";
const EMULATOR_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzM1Njg5NjAwLCJleHAiOjQxMDI0NDQ4MDAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0LyJ9.42D_zJ3qM02NM_ExWU9S9jvNGMfpop3YuWT9lFqJ5yU";

async function dockerAvailable(): Promise<boolean> {
  try {
    const cmd = new Deno.Command("docker", {
      args: ["info"],
      stdout: "null",
      stderr: "null",
    });
    const { success } = await cmd.output();
    return success;
  } catch {
    return false;
  }
}

interface EmulatorHandle {
  containerName: string;
  port: string;
}

async function startEmulator(): Promise<EmulatorHandle> {
  const containerName = `azure-kv-test-${crypto.randomUUID().slice(0, 8)}`;
  const cmd = new Deno.Command("docker", {
    args: [
      "run",
      "-d",
      "--name",
      containerName,
      "--platform",
      "linux/amd64",
      "-p",
      `0:${EMULATOR_PORT}`,
      EMULATOR_IMAGE,
    ],
    stdout: "piped",
    stderr: "piped",
  });
  const { success, stderr } = await cmd.output();
  if (!success) {
    throw new Error(
      `Failed to start emulator: ${new TextDecoder().decode(stderr)}`,
    );
  }

  const inspectCmd = new Deno.Command("docker", {
    args: ["port", containerName, String(EMULATOR_PORT)],
    stdout: "piped",
    stderr: "piped",
  });
  const inspectResult = await inspectCmd.output();
  const portOutput = new TextDecoder().decode(inspectResult.stdout).trim();
  const port = portOutput.split(":").pop()!;

  // Wait for emulator to accept HTTPS connections
  const httpClient = Deno.createHttpClient({ caCerts: [] });
  try {
    for (let i = 0; i < 30; i++) {
      try {
        await fetch(`https://localhost:${port}/secrets?api-version=7.4`, {
          headers: { Authorization: `Bearer ${EMULATOR_TOKEN}` },
          client: httpClient,
        });
        break;
      } catch {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  } finally {
    httpClient.close();
  }

  return { containerName, port };
}

async function stopEmulator(handle: EmulatorHandle): Promise<void> {
  const stop = new Deno.Command("docker", {
    args: ["stop", handle.containerName],
    stdout: "null",
    stderr: "null",
  });
  await stop.output();
  const rm = new Deno.Command("docker", {
    args: ["rm", handle.containerName],
    stdout: "null",
    stderr: "null",
  });
  await rm.output();
}

import type { SecretClientOptions } from "npm:@azure/keyvault-secrets@4.11.2";

// SecretClientOptions.tlsOptions does not expose rejectUnauthorized, but
// the underlying Node.js https agent accepts it. No typed alternative
// exists in the Azure SDK for bypassing self-signed cert validation.
const EMULATOR_CLIENT_OPTIONS = {
  disableChallengeResourceVerification: true,
  tlsOptions: { rejectUnauthorized: false },
} as SecretClientOptions;

function createEmulatorProvider(
  port: string,
): VaultProvider & VaultAnnotationProvider {
  const fakeCredential = {
    getToken: () =>
      Promise.resolve({
        token: EMULATOR_TOKEN,
        expiresOnTimestamp: Date.now() + 3600000,
      }),
  };

  return _createTestProvider(
    "emulator-test",
    { vault_url: `https://localhost:${port}` },
    fakeCredential,
    EMULATOR_CLIENT_OPTIONS,
  );
}

// Guard: skip emulator tests if Docker is not available
const hasDocker = await dockerAvailable();

Deno.test({
  name: "emulator: putAnnotation/getAnnotation round-trip",
  ignore: !hasDocker,
  // Azure SDK connection pool leaks resources in Deno
  sanitizeResources: false,
  fn: async () => {
    const emulator = await startEmulator();
    try {
      const provider = createEmulatorProvider(emulator.port);

      // Create the secret first
      await provider.put("test-key", "secret-value");

      // Put an annotation
      const annotation = VaultAnnotation.create({
        url: "https://console.azure.com",
        notes: "Production API key",
        labels: { env: "prod", team: "infra" },
      });
      await provider.putAnnotation("test-key", annotation);

      // Get it back
      const result = await provider.getAnnotation("test-key");
      assertExists(result);
      assertEquals(result.url, "https://console.azure.com");
      assertEquals(result.notes, "Production API key");
      assertEquals({ ...result.labels }, { env: "prod", team: "infra" });
      assertExists(result.updatedAt);

      // Verify VaultAnnotation methods work on the returned object
      const data = result.toData();
      assertEquals(data.url, "https://console.azure.com");
      assertEquals(data.notes, "Production API key");
      assertEquals(data.labels, { env: "prod", team: "infra" });
      assertEquals(typeof data.updatedAt, "string");

      assertEquals(result.isEmpty(), false);
    } finally {
      await stopEmulator(emulator);
    }
  },
});

Deno.test({
  name: "emulator: getAnnotation returns null for unannotated secret",
  ignore: !hasDocker,
  sanitizeResources: false,
  fn: async () => {
    const emulator = await startEmulator();
    try {
      const provider = createEmulatorProvider(emulator.port);

      await provider.put("no-annotation", "value");
      const result = await provider.getAnnotation("no-annotation");
      assertEquals(result, null);
    } finally {
      await stopEmulator(emulator);
    }
  },
});

Deno.test({
  name: "emulator: deleteAnnotation removes swamp tags",
  ignore: !hasDocker,
  sanitizeResources: false,
  fn: async () => {
    const emulator = await startEmulator();
    try {
      const provider = createEmulatorProvider(emulator.port);

      await provider.put("delete-test", "value");
      const annotation = VaultAnnotation.create({
        url: "https://example.com",
        notes: "to be deleted",
        labels: { env: "staging" },
      });
      await provider.putAnnotation("delete-test", annotation);

      // Verify annotation exists
      const before = await provider.getAnnotation("delete-test");
      assertExists(before);

      // Delete it
      await provider.deleteAnnotation("delete-test");

      // Verify it's gone
      const after = await provider.getAnnotation("delete-test");
      assertEquals(after, null);
    } finally {
      await stopEmulator(emulator);
    }
  },
});

Deno.test({
  name: "emulator: listAnnotations returns annotated secrets only",
  ignore: !hasDocker,
  sanitizeResources: false,
  fn: async () => {
    const emulator = await startEmulator();
    try {
      const provider = createEmulatorProvider(emulator.port);

      // Create two secrets, annotate only one
      await provider.put("annotated", "value1");
      await provider.put("plain", "value2");

      await provider.putAnnotation(
        "annotated",
        VaultAnnotation.create({
          url: "https://annotated.com",
          labels: { env: "prod" },
        }),
      );

      const annotations = await provider.listAnnotations();
      assertEquals(annotations.has("annotated"), true);
      assertEquals(annotations.has("plain"), false);

      const ann = annotations.get("annotated")!;
      assertEquals(ann.url, "https://annotated.com");
      assertEquals({ ...ann.labels }, { env: "prod" });
    } finally {
      await stopEmulator(emulator);
    }
  },
});

Deno.test({
  name: "emulator: putAnnotation preserves non-swamp tags",
  ignore: !hasDocker,
  sanitizeResources: false,
  fn: async () => {
    const emulator = await startEmulator();
    try {
      const provider = createEmulatorProvider(emulator.port);

      // Create secret with external tags via direct SDK call
      const fakeCredential = {
        getToken: () =>
          Promise.resolve({
            token: EMULATOR_TOKEN,
            expiresOnTimestamp: Date.now() + 3600000,
          }),
      };

      const { SecretClient } = await import(
        "npm:@azure/keyvault-secrets@4.11.2"
      );
      const directClient = new SecretClient(
        `https://localhost:${emulator.port}`,
        fakeCredential,
        EMULATOR_CLIENT_OPTIONS,
      );
      await directClient.setSecret("ext-tags-test", "value", {
        tags: { "external-tag": "keep-me" },
      });

      // Put a swamp annotation
      await provider.putAnnotation(
        "ext-tags-test",
        VaultAnnotation.create({ url: "https://example.com" }),
      );

      // Read back via direct client to verify both tags exist
      const secret = await directClient.getSecret("ext-tags-test");
      const tags = secret.properties.tags as Record<string, string>;
      assertEquals(tags["external-tag"], "keep-me");
      assertEquals(tags["swamp.url"], "https://example.com");
    } finally {
      await stopEmulator(emulator);
    }
  },
});

Deno.test({
  name: "emulator: annotation merge updates labels additively",
  ignore: !hasDocker,
  sanitizeResources: false,
  fn: async () => {
    const emulator = await startEmulator();
    try {
      const provider = createEmulatorProvider(emulator.port);

      await provider.put("merge-test", "value");

      // First annotation
      await provider.putAnnotation(
        "merge-test",
        VaultAnnotation.create({
          url: "https://v1.com",
          labels: { env: "prod" },
        }),
      );

      // Read, merge, write — simulating what swamp vault annotate does
      const existing = await provider.getAnnotation("merge-test");
      assertExists(existing);
      const merged = existing.merge({
        url: "https://v2.com",
        labels: { team: "infra" },
      });
      await provider.putAnnotation("merge-test", merged);

      // Verify merged state
      const result = await provider.getAnnotation("merge-test");
      assertExists(result);
      assertEquals(result.url, "https://v2.com");
      assertEquals({ ...result.labels }, { env: "prod", team: "infra" });
    } finally {
      await stopEmulator(emulator);
    }
  },
});
