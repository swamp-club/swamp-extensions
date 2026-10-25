import {
  assert,
  assertEquals,
  assertMatch,
  assertNotEquals,
  assertRejects,
} from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./externalsecret.ts";
import type { K8sContext } from "./_lib/helpers.ts";
import {
  type FakeApiServer,
  startFakeApiServer,
} from "./_lib/fake_api_server.ts";

function makeContext(fake: FakeApiServer, methodName: string) {
  const result = createModelTestContext({
    globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
    methodName,
  });
  return { ...result, context: result.context as unknown as K8sContext };
}

function seedExternalSecret(
  fake: FakeApiServer,
  opts: { name?: string; annotations?: Record<string, string> } = {},
) {
  return fake.put("externalsecrets", {
    apiVersion: "external-secrets.io/v1",
    kind: "ExternalSecret",
    metadata: {
      name: opts.name ?? "worker-creds",
      namespace: "default",
      ...(opts.annotations && { annotations: opts.annotations }),
    },
    spec: {
      secretStoreRef: { name: "onepassword", kind: "ClusterSecretStore" },
      target: { name: "worker-secret" },
      refreshInterval: "1h",
      data: [{ secretKey: "token", remoteRef: { key: "worker/token" } }],
    },
    status: {
      refreshTime: "2026-10-25T09:00:00Z",
      syncedResourceVersion: "1-abc",
      conditions: [{
        type: "Ready",
        status: "True",
        reason: "SecretSynced",
        message: "secret synced",
      }],
    },
  });
}

function patches(fake: FakeApiServer) {
  return fake.requests.filter((r) => r.method === "PATCH");
}

async function withFake(fn: (fake: FakeApiServer) => Promise<void>) {
  const fake = await startFakeApiServer();
  try {
    await fn(fake);
  } finally {
    await fake.close();
  }
}

// An ISO timestamp plus a random suffix, so two calls in one millisecond
// still change the annotation.
const FORCE_SYNC_VALUE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z-[0-9a-f]{8}$/;

// @kubernetes/client-node keeps an HTTP agent connection pool alive
const opts = { sanitizeResources: false };

Deno.test({
  name: "get normalises store, target and Ready status without remote refs",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake);
      const { context, getWrittenResources } = makeContext(fake, "get");
      await model.methods.get.execute(
        { externalSecretName: "worker-creds" },
        context,
      );

      const written = getWrittenResources();
      assertEquals(written.length, 1);
      assertEquals(written[0].specName, "externalSecret");
      const data = written[0].data;
      assertEquals(data.apiVersion, "external-secrets.io/v1");
      assertEquals(data.secretStoreName, "onepassword");
      assertEquals(data.secretStoreKind, "ClusterSecretStore");
      assertEquals(data.targetSecretName, "worker-secret");
      assertEquals(data.refreshInterval, "1h");
      assertEquals(data.ready, "True");
      assertEquals(data.readyReason, "SecretSynced");
      assertEquals(data.refreshTime, "2026-10-25T09:00:00Z");
      assertEquals(data.forceSyncValue, "");
      assertEquals(JSON.stringify(data).includes("worker/token"), false);
      assertEquals(fake.requests.map((r) => r.path), [
        "/apis/external-secrets.io/v1/namespaces/default/externalsecrets/worker-creds",
      ]);
    }),
});

Deno.test({
  name: "list writes one resource per ExternalSecret in the namespace",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake, { name: "a" });
      seedExternalSecret(fake, { name: "b" });
      const { context, getWrittenResources } = makeContext(fake, "list");
      await model.methods.list.execute({}, context);

      assertEquals(
        getWrittenResources().map((w) => w.data.name).sort(),
        ["a", "b"],
      );
    }),
});

Deno.test({
  name:
    "forceSync sends one merge patch of only the force-sync annotation and keeps the others",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake, { annotations: { owner: "team-a" } });
      const { context, getWrittenResources } = makeContext(fake, "forceSync");
      await model.methods.forceSync.execute(
        { externalSecretName: "worker-creds" },
        context,
      );

      const sent = patches(fake);
      assertEquals(sent.length, 1);
      assertEquals(fake.requests.length, 1);
      assertEquals(sent[0].contentType, "application/merge-patch+json");
      const value = (sent[0].body as {
        metadata: { annotations: Record<string, string> };
      }).metadata.annotations["force-sync"];
      assertEquals(sent[0].body, {
        metadata: { annotations: { "force-sync": value } },
      });
      assertMatch(value, FORCE_SYNC_VALUE);

      const stored = fake.objects.get("externalsecrets/default/worker-creds")!;
      assertEquals(stored.metadata.annotations, {
        owner: "team-a",
        "force-sync": value,
      });
      assertEquals(
        (stored.spec as { refreshInterval: string }).refreshInterval,
        "1h",
      );
      assertEquals(getWrittenResources()[0].data.forceSyncValue, value);
    }),
});

Deno.test({
  name: "a second forceSync changes the annotation value",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake, {
        annotations: { "force-sync": "2026-01-01T00:00:00.000Z" },
      });
      const { context } = makeContext(fake, "forceSync");
      await model.methods.forceSync.execute(
        { externalSecretName: "worker-creds" },
        context,
      );

      const stored = fake.objects.get("externalsecrets/default/worker-creds")!;
      const annotations = stored.metadata.annotations as Record<
        string,
        string
      >;
      assert(annotations["force-sync"] !== "2026-01-01T00:00:00.000Z");
    }),
});

Deno.test({
  name: "falls back to v1beta1 when v1 is not served",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake);
      fake.unserved.add("external-secrets.io/v1");
      const { context } = makeContext(fake, "forceSync");
      await model.methods.forceSync.execute(
        { externalSecretName: "worker-creds" },
        context,
      );

      assertEquals(fake.requests.map((r) => r.path), [
        "/apis/external-secrets.io/v1/namespaces/default/externalsecrets/worker-creds",
        "/apis/external-secrets.io/v1beta1/namespaces/default/externalsecrets/worker-creds",
      ]);
    }),
});

Deno.test({
  name: "a pinned apiVersion does not fall back",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake);
      fake.unserved.add("external-secrets.io/v1");
      const { context } = makeContext(fake, "get");
      await assertRejects(() =>
        model.methods.get.execute(
          { externalSecretName: "worker-creds", apiVersion: "v1" },
          context,
        )
      );
      assertEquals(fake.requests.length, 1);
    }),
});

Deno.test({
  name: "a missing ExternalSecret rejects with the v1 not-found error",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      // A current ESO serves only v1, so the v1beta1 retry 404s with the
      // generic unserved-resource Status; the object-specific v1 error wins.
      fake.unserved.add("external-secrets.io/v1beta1");
      const { context, getWrittenResources } = makeContext(fake, "get");
      const err = await assertRejects(() =>
        model.methods.get.execute({ externalSecretName: "nope" }, context)
      );
      assertEquals((err as { code?: number }).code, 404);
      const message = String((err as Error).message);
      assert(message.includes("nope"));
      assert(!message.includes("could not find the requested resource"));
      assertEquals(fake.requests.length, 2);
      assertEquals(getWrittenResources().length, 0);
    }),
});

Deno.test({
  name: "a 403 on forceSync surfaces and does not fall back",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake);
      fake.forbidden.add("PATCH");
      const { context } = makeContext(fake, "forceSync");
      const err = await assertRejects(() =>
        model.methods.forceSync.execute(
          { externalSecretName: "worker-creds" },
          context,
        )
      );
      assertEquals((err as { code?: number }).code, 403);
      assertEquals(fake.requests.length, 1);
    }),
});

Deno.test({
  name: "list drops last-applied-configuration, which embeds the spec",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake, {
        annotations: {
          "kubectl.kubernetes.io/last-applied-configuration":
            '{"spec":{"data":[{"remoteRef":{"key":"worker/token"}}]}}',
          owner: "team-a",
        },
      });
      const { context, getWrittenResources } = makeContext(fake, "list");
      await model.methods.list.execute({}, context);

      const data = getWrittenResources()[0].data;
      assertEquals(data.annotations, { owner: "team-a" });
      assertEquals(JSON.stringify(data).includes("worker/token"), false);
    }),
});

Deno.test({
  name: "two back-to-back forceSync calls send different values",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedExternalSecret(fake);
      const { context } = makeContext(fake, "forceSync");
      for (let i = 0; i < 2; i++) {
        await model.methods.forceSync.execute(
          { externalSecretName: "worker-creds" },
          context,
        );
      }

      const [first, second] = patches(fake).map((p) =>
        (p.body as { metadata: { annotations: Record<string, string> } })
          .metadata.annotations["force-sync"]
      );
      assertMatch(second, FORCE_SYNC_VALUE);
      assertNotEquals(first, second);
    }),
});

Deno.test({
  name:
    "on a v1beta1-only cluster a missing ExternalSecret reports the object, not the unserved v1",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.unserved.add("external-secrets.io/v1");
      const { context } = makeContext(fake, "forceSync");
      const err = await assertRejects(() =>
        model.methods.forceSync.execute(
          { externalSecretName: "nope" },
          context,
        )
      );
      assertEquals((err as { code?: number }).code, 404);
      const message = String((err as Error).message);
      assert(message.includes("nope"));
      assert(!message.includes("could not find the requested resource"));
      assertEquals(fake.requests.length, 2);
    }),
});
