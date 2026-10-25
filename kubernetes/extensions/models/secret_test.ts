import { assertEquals, assertRejects } from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./secret.ts";
import { type K8sContext, toBase64 } from "./_lib/helpers.ts";
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

function seedSecret(
  fake: FakeApiServer,
  data: Record<string, string>,
  opts: { type?: string; labels?: Record<string, string> } = {},
) {
  return fake.put("secrets", {
    metadata: {
      name: "app",
      namespace: "default",
      ...(opts.labels && { labels: opts.labels }),
    },
    type: opts.type ?? "Opaque",
    data,
  });
}

function puts(fake: FakeApiServer) {
  return fake.requests.filter((r) => r.method === "PUT");
}

async function withFake(fn: (fake: FakeApiServer) => Promise<void>) {
  const fake = await startFakeApiServer();
  try {
    await fn(fake);
  } finally {
    await fake.close();
  }
}

// @kubernetes/client-node keeps an HTTP agent connection pool alive
const opts = { sanitizeResources: false };

Deno.test({
  name: "ensure creates an absent secret and writes no values",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { password: "hunter2" },
          type: "Opaque",
          labels: { team: "a" },
          prune: false,
        },
        context,
      );

      const stored = fake.objects.get("secrets/default/app")!;
      assertEquals(stored.data, { password: toBase64("hunter2") });
      assertEquals(stored.metadata.labels, { team: "a" });

      const written = getWrittenResources();
      assertEquals(written.length, 1);
      assertEquals(written[0].specName, "secretMeta");
      assertEquals(written[0].data.action, "created");
      assertEquals(written[0].data.dataKeys, ["password"]);
      assertEquals(
        written[0].data.resourceVersion,
        stored.metadata.resourceVersion,
      );
      assertEquals("data" in written[0].data, false);
      assertEquals(JSON.stringify(written).includes("hunter2"), false);
    }),
});

Deno.test({
  name: "ensure with matching data and labels is unchanged and does not PUT",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedSecret(fake, { password: toBase64("hunter2") }, {
        labels: { team: "a", extra: "kept" },
      });
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { password: "hunter2" },
          type: "Opaque",
          labels: { team: "a" },
          prune: false,
        },
        context,
      );

      assertEquals(puts(fake).length, 0);
      assertEquals(getWrittenResources()[0].data.action, "unchanged");
    }),
});

Deno.test({
  name:
    "ensure merges a changed value and replaces with the read resourceVersion",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const seeded = seedSecret(fake, {
        password: toBase64("old"),
        other: toBase64("keep"),
      });
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { password: "new" },
          type: "Opaque",
          prune: false,
        },
        context,
      );

      const [put] = puts(fake);
      assertEquals(
        (put.body!.metadata as { resourceVersion: string }).resourceVersion,
        seeded.metadata.resourceVersion,
      );
      assertEquals(fake.objects.get("secrets/default/app")!.data, {
        password: toBase64("new"),
        other: toBase64("keep"),
      });
      assertEquals(getWrittenResources()[0].data.action, "updated");
      assertEquals(
        JSON.stringify(getWrittenResources()).includes("new"),
        false,
      );
    }),
});

Deno.test({
  name: "ensure with prune drops keys not in the desired set",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedSecret(fake, { password: toBase64("x"), stale: toBase64("y") });
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { password: "x" },
          type: "Opaque",
          prune: true,
        },
        context,
      );

      assertEquals(fake.objects.get("secrets/default/app")!.data, {
        password: toBase64("x"),
      });
      assertEquals(getWrittenResources()[0].data.action, "updated");
      assertEquals(getWrittenResources()[0].data.dataKeys, ["password"]);
    }),
});

Deno.test({
  name: "ensure updates on label-only drift and keeps existing labels",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedSecret(fake, { password: toBase64("x") }, {
        labels: { existing: "1" },
      });
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { password: "x" },
          type: "Opaque",
          labels: { team: "a" },
          prune: false,
        },
        context,
      );

      assertEquals(
        fake.objects.get("secrets/default/app")!.metadata.labels,
        { existing: "1", team: "a" },
      );
      assertEquals(getWrittenResources()[0].data.action, "updated");
    }),
});

Deno.test({
  name: "ensure detects drift in binary values that decode to the same text",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      // 0xFF is invalid UTF-8 and decodes to U+FFFD, the same text as the
      // desired value, but the bytes differ.
      seedSecret(fake, { blob: btoa("\xff") });
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { blob: "�" },
          type: "Opaque",
          prune: false,
        },
        context,
      );

      assertEquals(getWrittenResources()[0].data.action, "updated");
    }),
});

Deno.test({
  name: "ensure fails clearly when the requested type differs",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedSecret(fake, { password: toBase64("x") });
      const { context } = makeContext(fake, "ensure");
      await assertRejects(
        () =>
          model.methods.ensure.execute(
            {
              secretName: "app",
              data: { password: "x" },
              type: "kubernetes.io/basic-auth",
              prune: false,
            },
            context,
          ),
        Error,
        "type is immutable",
      );
      assertEquals(puts(fake).length, 0);
    }),
});

Deno.test({
  name: "ensure surfaces a 409 when a concurrent writer changed the secret",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedSecret(fake, { password: toBase64("old") });
      fake.bumpAfterRead = true;
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      const err = await assertRejects(() =>
        model.methods.ensure.execute(
          {
            secretName: "app",
            data: { password: "new" },
            type: "Opaque",
            prune: false,
          },
          context,
        )
      );
      assertEquals((err as { code?: number }).code, 409);
      assertEquals(getWrittenResources().length, 0);
    }),
});

Deno.test({
  name: "getMeta writes secretMeta without values",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const seeded = seedSecret(fake, { password: toBase64("hunter2") }, {
        labels: { team: "a" },
      });
      const { context, getWrittenResources } = makeContext(fake, "getMeta");
      await model.methods.getMeta.execute(
        { secretName: "app" },
        context,
      );

      const written = getWrittenResources();
      assertEquals(written.length, 1);
      assertEquals(written[0].specName, "secretMeta");
      assertEquals(written[0].name, "app");
      assertEquals(written[0].data.dataKeys, ["password"]);
      assertEquals(written[0].data.labels, { team: "a" });
      assertEquals(
        written[0].data.resourceVersion,
        seeded.metadata.resourceVersion,
      );
      assertEquals("data" in written[0].data, false);
      assertEquals(JSON.stringify(written).includes("hunter2"), false);
      assertEquals(
        JSON.stringify(written).includes(toBase64("hunter2")),
        false,
      );
    }),
});

Deno.test({
  name: "getMeta fails on a missing secret",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(fake, "getMeta");
      const err = await assertRejects(() =>
        model.methods.getMeta.execute({ secretName: "app" }, context)
      );
      assertEquals((err as { code?: number }).code, 404);
      assertEquals(getWrittenResources().length, 0);
    }),
});

Deno.test({
  name: "ensure without type creates an Opaque secret",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        { secretName: "app", data: { password: "x" }, prune: false },
        context,
      );

      assertEquals(fake.objects.get("secrets/default/app")!.type, "Opaque");
      assertEquals(getWrittenResources()[0].data.action, "created");
    }),
});

Deno.test({
  name: "ensure without type updates a non-Opaque secret and keeps its type",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedSecret(fake, {
        "tls.crt": toBase64("old-cert"),
        "tls.key": toBase64("old-key"),
      }, { type: "kubernetes.io/tls" });
      const { context, getWrittenResources } = makeContext(fake, "ensure");
      await model.methods.ensure.execute(
        {
          secretName: "app",
          data: { "tls.crt": "new-cert", "tls.key": "new-key" },
          prune: false,
        },
        context,
      );

      const stored = fake.objects.get("secrets/default/app")!;
      assertEquals(stored.type, "kubernetes.io/tls");
      assertEquals(stored.data, {
        "tls.crt": toBase64("new-cert"),
        "tls.key": toBase64("new-key"),
      });
      assertEquals(getWrittenResources()[0].data.action, "updated");
    }),
});

// kubectl apply copies the whole object, values included, into this
// annotation, so it must never reach stored data.
function seedAppliedSecret(fake: FakeApiServer) {
  return fake.put("secrets", {
    metadata: {
      name: "app",
      namespace: "default",
      annotations: {
        "kubectl.kubernetes.io/last-applied-configuration": JSON.stringify({
          apiVersion: "v1",
          kind: "Secret",
          metadata: { name: "app", namespace: "default" },
          stringData: { password: "hunter2" },
        }),
        owner: "team-a",
      },
    },
    type: "Opaque",
    data: { password: toBase64("hunter2") },
  });
}

for (const method of ["getMeta", "list"] as const) {
  Deno.test({
    name:
      `${method} drops last-applied-configuration from a kubectl-applied secret`,
    ...opts,
    fn: () =>
      withFake(async (fake) => {
        seedAppliedSecret(fake);
        const { context, getWrittenResources } = makeContext(fake, method);
        if (method === "getMeta") {
          await model.methods.getMeta.execute({ secretName: "app" }, context);
        } else {
          await model.methods.list.execute({}, context);
        }

        const written = getWrittenResources();
        assertEquals(written.length, 1);
        assertEquals(written[0].data.annotations, { owner: "team-a" });
        assertEquals(JSON.stringify(written).includes("hunter2"), false);
      }),
  });
}
