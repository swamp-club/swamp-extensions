import { assert, assertEquals } from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./statefulset.ts";
import type { K8sContext } from "./_lib/helpers.ts";
import {
  type FakeApiServer,
  startFakeApiServer,
} from "./_lib/fake_api_server.ts";

const RESTARTED_AT = "kubectl.kubernetes.io/restartedAt";

function makeContext(fake: FakeApiServer) {
  const result = createModelTestContext({
    globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
    methodName: "restart",
  });
  return { ...result, context: result.context as unknown as K8sContext };
}

function seedStatefulSet(
  fake: FakeApiServer,
  templateMeta: Record<string, unknown> | undefined,
) {
  return fake.put("statefulsets", {
    apiVersion: "apps/v1",
    kind: "StatefulSet",
    metadata: { name: "web", namespace: "default" },
    spec: {
      replicas: 2,
      serviceName: "web",
      selector: { matchLabels: { app: "web" } },
      template: {
        ...(templateMeta && { metadata: templateMeta }),
        spec: { containers: [{ name: "web", image: "nginx:1" }] },
      },
    },
  });
}

function templateAnnotations(fake: FakeApiServer) {
  const put = fake.requests.find((r) => r.method === "PUT")!;
  const spec = put.body!.spec as {
    template: { metadata: { annotations: Record<string, string> } };
  };
  return spec.template.metadata.annotations;
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
  name: "restart stamps restartedAt on the pod template and keeps annotations",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedStatefulSet(fake, {
        labels: { app: "web" },
        annotations: { "prometheus.io/scrape": "true" },
      });
      const { context, getWrittenResources } = makeContext(fake);
      await model.methods.restart.execute({ statefulSetName: "web" }, context);

      assertEquals(fake.requests.map((r) => [r.method, r.path]), [
        ["GET", "/apis/apps/v1/namespaces/default/statefulsets/web"],
        ["PUT", "/apis/apps/v1/namespaces/default/statefulsets/web"],
      ]);
      const annotations = templateAnnotations(fake);
      assertEquals(annotations["prometheus.io/scrape"], "true");
      assert(!Number.isNaN(Date.parse(annotations[RESTARTED_AT])));
      assertEquals(getWrittenResources().length, 1);
    }),
});

Deno.test({
  name: "restart creates the pod template metadata when it is absent",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedStatefulSet(fake, undefined);
      const { context } = makeContext(fake);
      await model.methods.restart.execute({ statefulSetName: "web" }, context);

      assertEquals(Object.keys(templateAnnotations(fake)), [RESTARTED_AT]);
    }),
});
