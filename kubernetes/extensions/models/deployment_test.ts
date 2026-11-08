import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./deployment.ts";
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

function seedDeployment(
  fake: FakeApiServer,
  templateMeta: Record<string, unknown> | undefined,
) {
  return fake.put("deployments", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: { name: "web", namespace: "default" },
    spec: {
      replicas: 2,
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
      seedDeployment(fake, {
        labels: { app: "web" },
        annotations: { "prometheus.io/scrape": "true" },
      });
      const { context, getWrittenResources } = makeContext(fake);
      await model.methods.restart.execute({ deploymentName: "web" }, context);

      assertEquals(fake.requests.map((r) => [r.method, r.path]), [
        ["GET", "/apis/apps/v1/namespaces/default/deployments/web"],
        ["PUT", "/apis/apps/v1/namespaces/default/deployments/web"],
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
      seedDeployment(fake, undefined);
      const { context } = makeContext(fake);
      await model.methods.restart.execute({ deploymentName: "web" }, context);

      assertEquals(Object.keys(templateAnnotations(fake)), [RESTARTED_AT]);
    }),
});

// --- getLogs ---

/**
 * A ReplicaSet controlled by the named Deployment, labelled like its pods so
 * the deployment's selector finds it; one per owner and label set. Returns
 * its uid. The Deployment must already be seeded unless it is a stranger.
 */
function seedReplicaSet(
  fake: FakeApiServer,
  owner: string,
  labels: Record<string, string>,
): string {
  const name = `${owner}-rs-${
    Object.entries(labels).map(([k, v]) => `${k}.${v}`).join(".")
  }`;
  const existing = fake.objects.get(`replicasets/default/${name}`);
  if (existing) return existing.metadata.uid as string;
  const dep = fake.objects.get(`deployments/default/${owner}`);
  const depUid = (dep?.metadata.uid as string | undefined) ??
    `uid-of-${owner}`;
  const rs = fake.put("replicasets", {
    metadata: {
      name,
      namespace: "default",
      labels,
      ownerReferences: [{
        apiVersion: "apps/v1",
        kind: "Deployment",
        name: owner,
        uid: depUid,
        controller: true,
      }],
    },
  });
  return rs.metadata.uid as string;
}

function seedPod(
  fake: FakeApiServer,
  name: string,
  opts: {
    labels?: Record<string, string>;
    ready?: boolean;
    created?: string;
    terminating?: boolean;
    phase?: string;
    containers?: string[];
    annotations?: Record<string, string>;
    /** Deployment whose ReplicaSet controls the pod; null for none. */
    owner?: string | null;
  } = {},
) {
  const containers = opts.containers ?? ["web"];
  const labels = opts.labels ?? { app: "web" };
  const owner = opts.owner === undefined ? "web" : opts.owner;
  const rsUid = owner === null
    ? undefined
    : seedReplicaSet(fake, owner, labels);
  fake.put("pods", {
    metadata: {
      name,
      namespace: "default",
      labels,
      ...(rsUid && {
        ownerReferences: [{
          apiVersion: "apps/v1",
          kind: "ReplicaSet",
          name: `${owner}-rs`,
          uid: rsUid,
          controller: true,
        }],
      }),
      creationTimestamp: opts.created ?? "2026-01-01T00:00:00Z",
      ...(opts.annotations && { annotations: opts.annotations }),
      ...(opts.terminating &&
        { deletionTimestamp: "2026-01-02T00:00:00Z" }),
    },
    spec: { containers: containers.map((c) => ({ name: c, image: "x" })) },
    status: {
      phase: opts.phase ?? "Running",
      conditions: [{
        type: "Ready",
        status: opts.ready === false ? "False" : "True",
      }],
    },
  });
  for (const c of containers) {
    fake.logs.set(
      `default/${name}/${c}`,
      `${name} ${c} line1\n${name} ${c} line2\n`,
    );
  }
}

function logsContext(fake: FakeApiServer) {
  const result = createModelTestContext({
    globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
    methodName: "getLogs",
  });
  return { ...result, context: result.context as unknown as K8sContext };
}

function logRequest(fake: FakeApiServer) {
  return fake.requests.find((r) => r.path.endsWith("/log"))!;
}

const getLogs = model.methods.getLogs;

Deno.test({
  name: "getLogs finds pods by template labels and tails the newest Ready pod",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web", tier: "front" } });
      const labels = { app: "web", tier: "front" };
      seedPod(fake, "web-old", { labels, created: "2026-01-01T00:00:00Z" });
      seedPod(fake, "web-new", { labels, created: "2026-01-03T00:00:00Z" });
      seedPod(fake, "web-newest-unready", {
        labels,
        created: "2026-01-04T00:00:00Z",
        ready: false,
      });
      seedPod(fake, "web-terminating", {
        labels,
        created: "2026-01-05T00:00:00Z",
        terminating: true,
      });
      const { context, getWrittenFiles } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web", tailLines: 1 }),
        context,
      );

      const list = fake.requests.find((r) =>
        r.path === "/api/v1/namespaces/default/pods"
      )!;
      assertEquals(list.query.labelSelector, "app=web,tier=front");
      const log = logRequest(fake);
      assertEquals(log.path, "/api/v1/namespaces/default/pods/web-new/log");
      assertEquals(log.query.tailLines, "1");
      assertEquals(log.query.container, "web");

      const [file] = getWrittenFiles();
      assertEquals(file.specName, "logs");
      assertEquals(file.name, "default_web_web");
      assertEquals(new TextDecoder().decode(file.content), "web-new web line2");
    }),
});

Deno.test({
  name: "getLogs falls back to selector matchLabels without template labels",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, undefined);
      seedPod(fake, "web-1");
      const { context } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web" }),
        context,
      );
      const list = fake.requests.find((r) =>
        r.path === "/api/v1/namespaces/default/pods"
      )!;
      assertEquals(list.query.labelSelector, "app=web");
      assertEquals(
        logRequest(fake).path,
        "/api/v1/namespaces/default/pods/web-1/log",
      );
    }),
});

Deno.test({
  name: "getLogs picks a not-Ready pod when no pod is Ready",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web" } });
      seedPod(fake, "web-crashing", { ready: false });
      const { context } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web", previous: true }),
        context,
      );
      const log = logRequest(fake);
      assertEquals(
        log.path,
        "/api/v1/namespaces/default/pods/web-crashing/log",
      );
      assertEquals(log.query.previous, "true");
    }),
});

Deno.test({
  name: "getLogs defaults to the default-container annotation, then the first",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web" } });
      seedPod(fake, "web-1", {
        containers: ["istio-proxy", "web"],
        annotations: { "kubectl.kubernetes.io/default-container": "web" },
      });
      const { context } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web" }),
        context,
      );
      assertEquals(logRequest(fake).query.container, "web");

      fake.requests.length = 0;
      fake.objects.delete("pods/default/web-1");
      seedPod(fake, "web-2", { containers: ["istio-proxy", "web"] });
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web" }),
        context,
      );
      assertEquals(logRequest(fake).query.container, "istio-proxy");
    }),
});

Deno.test({
  name: "getLogs names the deployment and selector when no pod matches",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web" } });
      seedPod(fake, "other", { labels: { app: "other" } });
      seedPod(fake, "web-gone", { terminating: true });
      const { context } = logsContext(fake);
      const err = await assertRejects(() =>
        getLogs.execute(
          getLogs.arguments.parse({ deploymentName: "web" }),
          context,
        )
      );
      assertEquals(
        (err as Error).message,
        'Deployment "web" in namespace "default" has no pods of its own ' +
          "ReplicaSets matching app=web that are not terminating or finished",
      );
    }),
});

Deno.test({
  name: "getLogs names a missing deployment",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context } = logsContext(fake);
      const err = await assertRejects(() =>
        getLogs.execute(
          getLogs.arguments.parse({ deploymentName: "web" }),
          context,
        )
      );
      assertEquals(
        (err as Error).message,
        'Deployment "web" in namespace "default" not found',
      );
    }),
});

Deno.test({
  name: "getLogs skips finished pods and prefers Running over Pending",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web" } });
      seedPod(fake, "web-evicted", {
        phase: "Failed",
        ready: false,
        created: "2026-01-05T00:00:00Z",
      });
      seedPod(fake, "web-done", {
        phase: "Succeeded",
        ready: false,
        created: "2026-01-04T00:00:00Z",
      });
      seedPod(fake, "web-pending", {
        phase: "Pending",
        ready: false,
        created: "2026-01-03T00:00:00Z",
      });
      seedPod(fake, "web-crashlooping", {
        ready: false,
        created: "2026-01-02T00:00:00Z",
      });
      const { context } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web" }),
        context,
      );
      assertEquals(
        logRequest(fake).path,
        "/api/v1/namespaces/default/pods/web-crashlooping/log",
      );
    }),
});

Deno.test({
  name: "getLogs falls back to the full selector, matchExpressions included",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.put("deployments", {
        metadata: { name: "web", namespace: "default" },
        spec: {
          selector: {
            matchLabels: { app: "web" },
            matchExpressions: [
              { key: "tier", operator: "In", values: ["front", "edge"] },
              { key: "canary", operator: "DoesNotExist" },
            ],
          },
          template: { spec: { containers: [{ name: "web", image: "x" }] } },
        },
      });
      seedPod(fake, "web-canary", {
        labels: { app: "web", tier: "front", canary: "yes" },
        created: "2026-01-03T00:00:00Z",
      });
      seedPod(fake, "web-back", {
        labels: { app: "web", tier: "back" },
        created: "2026-01-02T00:00:00Z",
      });
      seedPod(fake, "web-front", {
        labels: { app: "web", tier: "front" },
        created: "2026-01-01T00:00:00Z",
      });
      const { context } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web" }),
        context,
      );
      const list = fake.requests.find((r) =>
        r.path === "/api/v1/namespaces/default/pods"
      )!;
      assertEquals(
        list.query.labelSelector,
        "app=web,tier in (front,edge),!canary",
      );
      assertEquals(
        logRequest(fake).path,
        "/api/v1/namespaces/default/pods/web-front/log",
      );
    }),
});

Deno.test({
  name: "getLogs names the pod and container when the log read fails",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web" } });
      seedPod(fake, "web-1");
      const { context } = logsContext(fake);
      const err = await assertRejects(() =>
        getLogs.execute(
          getLogs.arguments.parse({ deploymentName: "web", container: "nope" }),
          context,
        )
      );
      assertStringIncludes(
        (err as Error).message,
        'Reading logs of container "nope" of Pod "web-1" in namespace ' +
          '"default" failed (HTTP 400)',
      );
    }),
});

Deno.test({
  name: "getLogs reads only pods of this deployment's own ReplicaSets",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedDeployment(fake, { labels: { app: "web" } });
      // A canary deployment shares app=web, and its pod is newer and Ready.
      fake.put("deployments", {
        metadata: { name: "web-canary", namespace: "default" },
        spec: { template: { metadata: { labels: { app: "web" } } } },
      });
      seedPod(fake, "web-canary-1", {
        owner: "web-canary",
        created: "2026-01-05T00:00:00Z",
      });
      seedPod(fake, "web-orphan", {
        owner: null,
        created: "2026-01-04T00:00:00Z",
      });
      seedPod(fake, "web-1", { created: "2026-01-01T00:00:00Z" });
      const { context } = logsContext(fake);
      await getLogs.execute(
        getLogs.arguments.parse({ deploymentName: "web" }),
        context,
      );
      assertEquals(
        logRequest(fake).path,
        "/api/v1/namespaces/default/pods/web-1/log",
      );
    }),
});
