import { assertEquals } from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./namespace.ts";
import {
  type FakeApiServer,
  startFakeApiServer,
} from "./_lib/fake_api_server.ts";

type NamespaceContext = Parameters<
  typeof model.methods.setResourceQuota.execute
>[1];

function makeContext(fake: FakeApiServer, methodName: string) {
  const result = createModelTestContext({
    globalArgs: { kubeconfig: fake.kubeconfig },
    methodName,
  });
  return {
    ...result,
    context: result.context as unknown as NamespaceContext,
  };
}

async function withFake(fn: (fake: FakeApiServer) => Promise<void>) {
  const fake = await startFakeApiServer();
  try {
    await fn(fake);
  } finally {
    await fake.close();
  }
}

function methods(fake: FakeApiServer) {
  return fake.requests.map((r) => r.method);
}

// @kubernetes/client-node keeps an HTTP agent connection pool alive
const opts = { sanitizeResources: false };

Deno.test({
  name: "setResourceQuota creates the quota when it does not exist",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(
        fake,
        "setResourceQuota",
      );
      await model.methods.setResourceQuota.execute(
        { namespaceName: "team", quotaName: "q", hard: { pods: "10" } },
        context,
      );

      assertEquals(methods(fake), ["GET", "POST"]);
      assertEquals(fake.objects.has("resourcequotas/team/q"), true);
      assertEquals(getWrittenResources()[0].specName, "resourceQuota");
    }),
});

Deno.test({
  name: "setResourceQuota replaces the quota when it exists",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.put("resourcequotas", {
        metadata: { name: "q", namespace: "team" },
        spec: { hard: { pods: "1" } },
      });
      const { context } = makeContext(fake, "setResourceQuota");
      await model.methods.setResourceQuota.execute(
        { namespaceName: "team", quotaName: "q", hard: { pods: "10" } },
        context,
      );

      assertEquals(methods(fake), ["GET", "PUT"]);
      assertEquals(fake.objects.get("resourcequotas/team/q")!.spec, {
        hard: { pods: "10" },
      });
    }),
});

Deno.test({
  name: "setLimitRange creates the limit range when it does not exist",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(
        fake,
        "setLimitRange",
      );
      await model.methods.setLimitRange.execute(
        {
          namespaceName: "team",
          limitRangeName: "lr",
          limits: [{ type: "Container", max: { cpu: "1" } }],
        },
        context,
      );

      assertEquals(methods(fake), ["GET", "POST"]);
      assertEquals(fake.objects.has("limitranges/team/lr"), true);
      assertEquals(getWrittenResources()[0].specName, "limitRange");
    }),
});

Deno.test({
  name: "setLimitRange replaces the limit range when it exists",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.put("limitranges", {
        metadata: { name: "lr", namespace: "team" },
        spec: { limits: [{ type: "Container", max: { cpu: "2" } }] },
      });
      const { context } = makeContext(fake, "setLimitRange");
      await model.methods.setLimitRange.execute(
        {
          namespaceName: "team",
          limitRangeName: "lr",
          limits: [{ type: "Container", max: { cpu: "1" } }],
        },
        context,
      );

      assertEquals(methods(fake), ["GET", "PUT"]);
    }),
});
