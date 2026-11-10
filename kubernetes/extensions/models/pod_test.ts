import { assertEquals, assertNotEquals } from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./pod.ts";
import type { K8sContext } from "./_lib/helpers.ts";
import {
  type FakeApiServer,
  startFakeApiServer,
} from "./_lib/fake_api_server.ts";

// @kubernetes/client-node keeps an HTTP agent connection pool alive
const opts = { sanitizeResources: false };

async function withFake(fn: (fake: FakeApiServer) => Promise<void>) {
  const fake = await startFakeApiServer();
  try {
    await fn(fake);
  } finally {
    await fake.close();
  }
}

function makeContext(fake: FakeApiServer, methodName: string) {
  const result = createModelTestContext({
    globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
    methodName,
  });
  return { ...result, context: result.context as unknown as K8sContext };
}

function seedPod(fake: FakeApiServer, containers: string[]) {
  fake.put("pods", {
    metadata: { name: "web-1", namespace: "default", labels: { app: "web" } },
    spec: { containers: containers.map((name) => ({ name, image: "nginx" })) },
    status: { phase: "Running" },
  });
  for (const c of containers) {
    fake.logs.set(`default/web-1/${c}`, `${c} line1\n${c} line2\n`);
  }
}

Deno.test({
  name: "getLogs names its file apart from the pod that get stores",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedPod(fake, ["web"]);

      const got = makeContext(fake, "get");
      await model.methods.get.execute(
        model.methods.get.arguments.parse({ podName: "web-1" }),
        got.context,
      );
      const [pod] = got.getWrittenResources();

      const logs = makeContext(fake, "getLogs");
      await model.methods.getLogs.execute(
        model.methods.getLogs.arguments.parse({
          podName: "web-1",
          tailLines: 1,
        }),
        logs.context,
      );
      const [file] = logs.getWrittenFiles();

      // swamp refuses a file and a resource under one instance name in the
      // same behavior, which broke the pod-health-check workflow.
      assertEquals(pod.name, "web-1");
      assertEquals(file.specName, "logs");
      assertEquals(file.name, "default_web-1");
      assertNotEquals(file.name, pod.name);
      assertEquals(new TextDecoder().decode(file.content), "web line2");
    }),
});

Deno.test({
  name: "getLogs adds the container to the file name when one is given",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedPod(fake, ["web", "sidecar"]);
      const logs = makeContext(fake, "getLogs");
      await model.methods.getLogs.execute(
        model.methods.getLogs.arguments.parse({
          podName: "web-1",
          container: "sidecar",
        }),
        logs.context,
      );
      const [file] = logs.getWrittenFiles();
      assertEquals(file.name, "default_web-1_sidecar");
      assertEquals(
        new TextDecoder().decode(file.content),
        "sidecar line1\nsidecar line2",
      );
    }),
});
