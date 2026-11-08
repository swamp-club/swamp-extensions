// One table drives every model's patch method: the request path, the
// Content-Type for each patchType, the body sent, the resource written, and
// the 404 / 422 error paths.
import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import type { K8sContext } from "./_lib/helpers.ts";
import {
  type FakeApiServer,
  startFakeApiServer,
} from "./_lib/fake_api_server.ts";
import { model as deployment } from "./deployment.ts";
import { model as statefulset } from "./statefulset.ts";
import { model as service } from "./service.ts";
import { model as ingress } from "./ingress.ts";
import { model as pod } from "./pod.ts";
import { model as configmap } from "./configmap.ts";
import { model as namespace } from "./namespace.ts";
import { model as netpol } from "./netpol.ts";
import { model as hpa } from "./hpa.ts";
import { model as pvc } from "./pvc.ts";
import { model as job } from "./job.ts";
import { model as rbac } from "./rbac.ts";
import { model as secret } from "./secret.ts";

interface PatchMethod {
  arguments: { parse(v: unknown): unknown };
  execute: unknown;
}

interface Case {
  label: string;
  method: PatchMethod;
  nameArg: string;
  plural: string;
  path: string;
  spec: string;
  namespaced: boolean;
  seed: Record<string, unknown>;
}

const containers = [{ name: "app", image: "nginx:1" }];
const podTemplate = {
  metadata: { labels: { app: "web" } },
  spec: { containers },
};

const CASES: Case[] = [
  {
    label: "deployment.patch",
    method: deployment.methods.patch,
    nameArg: "deploymentName",
    plural: "deployments",
    path: "/apis/apps/v1/namespaces/default/deployments/web",
    spec: "deployment",
    namespaced: true,
    seed: {
      spec: {
        replicas: 1,
        selector: { matchLabels: { app: "web" } },
        template: podTemplate,
      },
    },
  },
  {
    label: "statefulset.patch",
    method: statefulset.methods.patch,
    nameArg: "statefulSetName",
    plural: "statefulsets",
    path: "/apis/apps/v1/namespaces/default/statefulsets/web",
    spec: "statefulSet",
    namespaced: true,
    seed: {
      spec: {
        replicas: 1,
        serviceName: "web",
        selector: { matchLabels: { app: "web" } },
        template: podTemplate,
      },
    },
  },
  {
    label: "service.patch",
    method: service.methods.patch,
    nameArg: "serviceName",
    plural: "services",
    path: "/api/v1/namespaces/default/services/web",
    spec: "service",
    namespaced: true,
    seed: { spec: { selector: { app: "web" }, ports: [{ port: 80 }] } },
  },
  {
    label: "ingress.patch",
    method: ingress.methods.patch,
    nameArg: "ingressName",
    plural: "ingresses",
    path: "/apis/networking.k8s.io/v1/namespaces/default/ingresses/web",
    spec: "ingress",
    namespaced: true,
    seed: { spec: { rules: [] } },
  },
  {
    label: "pod.patch",
    method: pod.methods.patch,
    nameArg: "podName",
    plural: "pods",
    path: "/api/v1/namespaces/default/pods/web",
    spec: "pod",
    namespaced: true,
    seed: { spec: { containers }, status: { phase: "Running" } },
  },
  {
    label: "configmap.patch",
    method: configmap.methods.patch,
    nameArg: "configMapName",
    plural: "configmaps",
    path: "/api/v1/namespaces/default/configmaps/web",
    spec: "configmap",
    namespaced: true,
    seed: { data: { key: "value" } },
  },
  {
    label: "namespace.patch",
    method: namespace.methods.patch,
    nameArg: "namespaceName",
    plural: "namespaces",
    path: "/api/v1/namespaces/web",
    spec: "namespace",
    namespaced: false,
    seed: { status: { phase: "Active" } },
  },
  {
    label: "netpol.patch",
    method: netpol.methods.patch,
    nameArg: "policyName",
    plural: "networkpolicies",
    path: "/apis/networking.k8s.io/v1/namespaces/default/networkpolicies/web",
    spec: "netpol",
    namespaced: true,
    seed: { spec: { podSelector: {}, policyTypes: ["Ingress"] } },
  },
  {
    label: "hpa.patch",
    method: hpa.methods.patch,
    nameArg: "hpaName",
    plural: "horizontalpodautoscalers",
    path:
      "/apis/autoscaling/v2/namespaces/default/horizontalpodautoscalers/web",
    spec: "hpa",
    namespaced: true,
    seed: {
      spec: {
        scaleTargetRef: { kind: "Deployment", name: "web" },
        maxReplicas: 3,
      },
    },
  },
  {
    label: "pvc.patch",
    method: pvc.methods.patch,
    nameArg: "pvcName",
    plural: "persistentvolumeclaims",
    path: "/api/v1/namespaces/default/persistentvolumeclaims/web",
    spec: "pvc",
    namespaced: true,
    seed: { spec: { accessModes: ["ReadWriteOnce"] } },
  },
  {
    label: "job.patchJob",
    method: job.methods.patchJob,
    nameArg: "jobName",
    plural: "jobs",
    path: "/apis/batch/v1/namespaces/default/jobs/web",
    spec: "job",
    namespaced: true,
    seed: { spec: { template: podTemplate } },
  },
  {
    label: "job.patchCronJob",
    method: job.methods.patchCronJob,
    nameArg: "cronJobName",
    plural: "cronjobs",
    path: "/apis/batch/v1/namespaces/default/cronjobs/web",
    spec: "cronJob",
    namespaced: true,
    seed: {
      spec: {
        schedule: "* * * * *",
        jobTemplate: { spec: { template: podTemplate } },
      },
    },
  },
  {
    label: "rbac.patchServiceAccount",
    method: rbac.methods.patchServiceAccount,
    nameArg: "serviceAccountName",
    plural: "serviceaccounts",
    path: "/api/v1/namespaces/default/serviceaccounts/web",
    spec: "serviceAccount",
    namespaced: true,
    seed: {},
  },
];

const CONTENT_TYPES = {
  merge: "application/merge-patch+json",
  strategic: "application/strategic-merge-patch+json",
  json: "application/json-patch+json",
} as const;

const PATCHES = {
  merge: { metadata: { labels: { patched: "merge" } } },
  strategic: { metadata: { labels: { patched: "strategic" } } },
  json: [{ op: "add", path: "/metadata/labels/patched", value: "json" }],
};

function seed(fake: FakeApiServer, c: Case) {
  fake.put(c.plural, {
    ...c.seed,
    metadata: {
      name: "web",
      ...(c.namespaced && { namespace: "default" }),
      labels: { app: "web" },
    },
  });
}

function storedKey(c: Case) {
  return `${c.plural}/${c.namespaced ? "default" : ""}/web`;
}

async function run(
  fake: FakeApiServer,
  c: Case,
  patchType: keyof typeof PATCHES,
) {
  const result = createModelTestContext({
    globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
    methodName: "patch",
  });
  const args = c.method.arguments.parse({
    [c.nameArg]: "web",
    patchType,
    patch: PATCHES[patchType],
  });
  const execute = c.method.execute as (
    args: unknown,
    context: K8sContext,
  ) => Promise<unknown>;
  await execute(args, result.context as unknown as K8sContext);
  return result;
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

for (const c of CASES) {
  for (const patchType of ["merge", "strategic", "json"] as const) {
    Deno.test({
      name: `${c.label} sends a ${patchType} patch and writes ${c.spec}`,
      ...opts,
      fn: () =>
        withFake(async (fake) => {
          seed(fake, c);
          const { getWrittenResources } = await run(fake, c, patchType);

          const req = fake.requests.find((r) => r.method === "PATCH")!;
          assertEquals(req.path, c.path);
          assertEquals(req.contentType, CONTENT_TYPES[patchType]);
          assertEquals(
            JSON.stringify(req.body),
            JSON.stringify(PATCHES[patchType]),
          );

          const labels = fake.objects.get(storedKey(c))!.metadata.labels;
          assertEquals(labels, { app: "web", patched: patchType });

          const written = getWrittenResources();
          assertEquals(written.map((w) => [w.specName, w.name]), [
            [c.spec, "web"],
          ]);
        }),
    });
  }

  Deno.test({
    name: `${c.label} names a missing object`,
    ...opts,
    fn: () =>
      withFake(async (fake) => {
        const err = await assertRejects(() => run(fake, c, "merge"));
        assertStringIncludes((err as Error).message, '"web"');
        assertStringIncludes((err as Error).message, "not found");
      }),
  });
}

Deno.test({
  name: "a failed JSON Patch test op surfaces the API server's reason",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const c = CASES[0];
      seed(fake, c);
      const result = createModelTestContext({
        globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
        methodName: "patch",
      });
      const err = await assertRejects(() =>
        deployment.methods.patch.execute(
          deployment.methods.patch.arguments.parse({
            deploymentName: "web",
            patchType: "json",
            patch: [
              { op: "test", path: "/spec/replicas", value: 5 },
              { op: "replace", path: "/spec/replicas", value: 0 },
            ],
          }),
          result.context as unknown as K8sContext,
        )
      );
      assertStringIncludes(
        (err as Error).message,
        'Patching Deployment "web" in namespace "default" failed (HTTP 422)',
      );
      assertStringIncludes((err as Error).message, "test operation failed");
      assertEquals(
        (fake.objects.get(storedKey(c))!.spec as { replicas: number })
          .replicas,
        1,
      );
    }),
});

Deno.test({
  name: "patch arguments reject a body that does not match the patchType",
  fn: () => {
    const schema = deployment.methods.patch.arguments;
    assert(
      !schema.safeParse({
        deploymentName: "web",
        patchType: "json",
        patch: { spec: {} },
      }).success,
    );
    assert(
      !schema.safeParse({
        deploymentName: "web",
        patchType: "merge",
        patch: [{ op: "remove", path: "/spec/replicas" }],
      }).success,
    );
    const parsed = schema.parse({ deploymentName: "web", patch: { a: 1 } });
    assertEquals(parsed.patchType, "merge");
    // The CLI hands a union-typed --input over as JSON text.
    const fromCli = schema.parse({
      deploymentName: "web",
      patchType: "json",
      patch: '[{"op":"remove","path":"/spec/replicas"}]',
    });
    assertEquals(fromCli.patch, [{ op: "remove", path: "/spec/replicas" }]);
  },
});

Deno.test({
  name: "secret has no patch method: values would sit in method arguments",
  fn: () => {
    assertEquals("patch" in secret.methods, false);
  },
});

Deno.test({
  name: "a JSON Patch with an out-of-range index is rejected, not applied",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const c = CASES[0];
      seed(fake, c);
      const result = createModelTestContext({
        globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
        methodName: "patch",
      });
      const err = await assertRejects(() =>
        deployment.methods.patch.execute(
          deployment.methods.patch.arguments.parse({
            deploymentName: "web",
            patchType: "json",
            patch: [{
              op: "replace",
              path: "/spec/template/spec/containers/5/image",
              value: "nginx:2",
            }],
          }),
          result.context as unknown as K8sContext,
        )
      );
      assertStringIncludes((err as Error).message, "HTTP 422");
    }),
});
