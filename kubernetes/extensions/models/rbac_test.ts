import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { model } from "./rbac.ts";
import type { K8sContext } from "./_lib/helpers.ts";
import {
  type FakeApiServer,
  startFakeApiServer,
} from "./_lib/fake_api_server.ts";

const SA_USER = "system:serviceaccount:default:dash";
const ROLE_ARN = "eks.amazonaws.com/role-arn";

function makeContext(fake: FakeApiServer, methodName: string) {
  const result = createModelTestContext({
    globalArgs: { namespace: "default", kubeconfig: fake.kubeconfig },
    methodName,
  });
  return { ...result, context: result.context as unknown as K8sContext };
}

function seedServiceAccount(
  fake: FakeApiServer,
  annotations: Record<string, string> = {},
) {
  return fake.put("serviceaccounts", {
    metadata: { name: "dash", namespace: "default", annotations },
  });
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

const methods = model.methods;

// --- requestServiceAccountToken ---

Deno.test({
  name: "token schema marks the token sensitive so swamp vaults it",
  fn: () => {
    const shape = model.resources.serviceAccountToken.schema.shape;
    assertEquals(shape.token.meta()?.sensitive, true);
  },
});

Deno.test({
  name: "requestServiceAccountToken stores the issued token and expiration",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      const { context, getWrittenResources, getLogs } = makeContext(
        fake,
        "requestServiceAccountToken",
      );
      const args = methods.requestServiceAccountToken.arguments.parse({
        serviceAccountName: "dash",
        expirationSeconds: 1800,
      });
      await methods.requestServiceAccountToken.execute(args, context);

      const req = fake.requests.find((r) => r.method === "POST")!;
      assertEquals(
        req.path,
        "/api/v1/namespaces/default/serviceaccounts/dash/token",
      );
      assertEquals(
        (req.body!.spec as { expirationSeconds: number }).expirationSeconds,
        1800,
      );

      const [written] = getWrittenResources();
      assertEquals(written.specName, "serviceAccountToken");
      assertEquals(written.name, "default_dash");
      assert(String(written.data.token).startsWith("fake-token-default-dash"));
      assertEquals(written.data.requestedExpirationSeconds, 1800);
      assertEquals(
        written.data.expirationTimestamp,
        "2026-01-01T00:30:00.000Z",
      );
      assertEquals(written.data.audiences, ["https://kubernetes.default.svc"]);

      const logged = JSON.stringify(getLogs());
      assert(!logged.includes("fake-token"), "token must never be logged");
    }),
});

Deno.test({
  name: "requestServiceAccountToken records the server's shorter expiration",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      fake.maxTokenSeconds = 600;
      const { context, getWrittenResources } = makeContext(
        fake,
        "requestServiceAccountToken",
      );
      await methods.requestServiceAccountToken.execute(
        methods.requestServiceAccountToken.arguments.parse({
          serviceAccountName: "dash",
          expirationSeconds: 7200,
        }),
        context,
      );
      const [written] = getWrittenResources();
      assertEquals(written.data.requestedExpirationSeconds, 7200);
      assertEquals(
        written.data.expirationTimestamp,
        "2026-01-01T00:10:00.000Z",
      );
    }),
});

Deno.test({
  name: "requestServiceAccountToken keys records by namespace and name",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      fake.put("serviceaccounts", {
        metadata: { name: "dash", namespace: "ops" },
      });
      const { context, getWrittenResources } = makeContext(
        fake,
        "requestServiceAccountToken",
      );
      for (const namespace of ["default", "ops"]) {
        await methods.requestServiceAccountToken.execute(
          methods.requestServiceAccountToken.arguments.parse({
            serviceAccountName: "dash",
            namespace,
          }),
          context,
        );
      }
      assertEquals(getWrittenResources().map((w) => w.name), [
        "default_dash",
        "ops_dash",
      ]);
    }),
});

Deno.test({
  name: "requestServiceAccountToken rejects a lifetime under the API floor",
  fn: () => {
    const result = methods.requestServiceAccountToken.arguments.safeParse({
      serviceAccountName: "dash",
      expirationSeconds: 300,
    });
    assert(!result.success);
  },
});

Deno.test({
  name: "requestServiceAccountToken names a missing ServiceAccount",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context } = makeContext(fake, "requestServiceAccountToken");
      const err = await assertRejects(() =>
        methods.requestServiceAccountToken.execute(
          methods.requestServiceAccountToken.arguments.parse({
            serviceAccountName: "dash",
          }),
          context,
        )
      );
      assertStringIncludes(
        (err as Error).message,
        'ServiceAccount "dash" in namespace "default" not found',
      );
    }),
});

// --- checkServiceAccountAccess ---

function sarBodies(fake: FakeApiServer) {
  return fake.requests
    .filter((r) => r.path.endsWith("/subjectaccessreviews"))
    .map((r) =>
      r.body!.spec as {
        user: string;
        groups: string[];
        resourceAttributes: Record<string, string>;
      }
    );
}

Deno.test({
  name: "checkServiceAccountAccess records one review per check",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.grants.push({
        user: SA_USER,
        verb: "list",
        resource: "pods",
        namespace: "default",
      });
      const { context, getWrittenResources } = makeContext(
        fake,
        "checkServiceAccountAccess",
      );
      await methods.checkServiceAccountAccess.execute(
        methods.checkServiceAccountAccess.arguments.parse({
          serviceAccountName: "dash",
          checks: [
            { verb: "list", resource: "pods" },
            { verb: "delete", resource: "deployments", group: "apps" },
          ],
        }),
        context,
      );

      const [first] = sarBodies(fake);
      assertEquals(first.user, SA_USER);
      assertEquals(first.groups, [
        "system:serviceaccounts",
        "system:serviceaccounts:default",
        "system:authenticated",
      ]);
      assertEquals(first.resourceAttributes, {
        verb: "list",
        group: "",
        resource: "pods",
        namespace: "default",
      });

      const written = getWrittenResources();
      assertEquals(written.map((w) => [w.specName, w.name, w.data.allowed]), [
        ["accessReview", "default_dash_list__pods__default", true],
        [
          "accessReview",
          "default_dash_delete_apps_deployments__default",
          false,
        ],
      ]);
    }),
});

Deno.test({
  name:
    "checkServiceAccountAccess sends no namespace for cluster-scoped checks",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      // Granted only in default: a cluster-wide check must not see it.
      fake.grants.push({
        user: SA_USER,
        verb: "get",
        resource: "nodes",
        namespace: "default",
      });
      const { context, getWrittenResources } = makeContext(
        fake,
        "checkServiceAccountAccess",
      );
      await methods.checkServiceAccountAccess.execute(
        methods.checkServiceAccountAccess.arguments.parse({
          serviceAccountName: "dash",
          checks: [{ verb: "get", resource: "nodes", clusterScoped: true }],
        }),
        context,
      );
      const [body] = sarBodies(fake);
      assertEquals("namespace" in body.resourceAttributes, false);
      const [written] = getWrittenResources();
      assertEquals(written.name, "default_dash_get__nodes__");
      assertEquals(written.data.allowed, false);
      assertEquals(written.data.namespace, "");
    }),
});

Deno.test({
  name:
    "checkServiceAccountAccess records every check, then fails on a 403 naming the permission",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.forbiddenPaths.add(
        "/apis/authorization.k8s.io/v1/subjectaccessreviews",
      );
      const { context, getWrittenResources } = makeContext(
        fake,
        "checkServiceAccountAccess",
      );
      const err = await assertRejects(() =>
        methods.checkServiceAccountAccess.execute(
          methods.checkServiceAccountAccess.arguments.parse({
            serviceAccountName: "dash",
            checks: [
              { verb: "list", resource: "pods" },
              { verb: "get", resource: "secrets" },
            ],
          }),
          context,
        )
      );
      assertStringIncludes((err as Error).message, "2 of 2 access checks");
      assertStringIncludes(
        (err as Error).message,
        "create on subjectaccessreviews.authorization.k8s.io",
      );
      const written = getWrittenResources();
      assertEquals(written.length, 2);
      assert(written.every((w) => w.data.evaluationError !== ""));
      assert(written.every((w) => w.data.allowed === false));
    }),
});

// --- ServiceAccount writes ---

Deno.test({
  name: "createServiceAccount sends annotations, labels and automount",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(
        fake,
        "createServiceAccount",
      );
      await methods.createServiceAccount.execute(
        methods.createServiceAccount.arguments.parse({
          serviceAccountName: "swamp",
          annotations: { [ROLE_ARN]: "arn:aws:iam::1:role/swamp" },
          labels: { app: "swamp" },
          automountToken: false,
        }),
        context,
      );
      const stored = fake.objects.get("serviceaccounts/default/swamp")!;
      assertEquals(stored.metadata.annotations, {
        [ROLE_ARN]: "arn:aws:iam::1:role/swamp",
      });
      assertEquals(stored.automountServiceAccountToken, false);
      const [written] = getWrittenResources();
      assertEquals(written.name, "swamp");
      assertEquals(written.data.automountToken, false);
      assertEquals(written.data.labels, { app: "swamp" });
    }),
});

Deno.test({
  name: "createServiceAccount reports an existing ServiceAccount",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      const { context } = makeContext(fake, "createServiceAccount");
      const err = await assertRejects(() =>
        methods.createServiceAccount.execute(
          methods.createServiceAccount.arguments.parse({
            serviceAccountName: "dash",
          }),
          context,
        )
      );
      assertStringIncludes((err as Error).message, "HTTP 409");
      assertStringIncludes((err as Error).message, '"dash"');
    }),
});

Deno.test({
  name: "updateServiceAccount changes only the named annotation keys",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake, {
        [ROLE_ARN]: "arn:aws:iam::1:role/old",
        "team": "platform",
        "stale": "yes",
      });
      const { context } = makeContext(fake, "updateServiceAccount");
      await methods.updateServiceAccount.execute(
        methods.updateServiceAccount.arguments.parse({
          serviceAccountName: "dash",
          setAnnotations: { [ROLE_ARN]: "arn:aws:iam::1:role/new" },
          removeAnnotations: ["stale"],
        }),
        context,
      );
      const patch = fake.requests.find((r) => r.method === "PATCH")!;
      assertEquals(patch.contentType, "application/merge-patch+json");
      assertEquals(
        fake.objects.get("serviceaccounts/default/dash")!.metadata.annotations,
        { [ROLE_ARN]: "arn:aws:iam::1:role/new", team: "platform" },
      );
    }),
});

Deno.test({
  name: "updateServiceAccount refuses an empty update",
  fn: () => {
    const result = methods.updateServiceAccount.arguments.safeParse({
      serviceAccountName: "dash",
    });
    assert(!result.success);
  },
});

Deno.test({
  name: "patchServiceAccount sends a JSON patch with its content type",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      const { context } = makeContext(fake, "patchServiceAccount");
      await methods.patchServiceAccount.execute(
        methods.patchServiceAccount.arguments.parse({
          serviceAccountName: "dash",
          patchType: "json",
          patch: [{
            op: "add",
            path: "/automountServiceAccountToken",
            value: false,
          }],
        }),
        context,
      );
      const patch = fake.requests.find((r) => r.method === "PATCH")!;
      assertEquals(patch.contentType, "application/json-patch+json");
      assertEquals(
        fake.objects.get("serviceaccounts/default/dash")!
          .automountServiceAccountToken,
        false,
      );
    }),
});

Deno.test({
  name: "deleteServiceAccount names a missing account",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context } = makeContext(fake, "deleteServiceAccount");
      const err = await assertRejects(() =>
        methods.deleteServiceAccount.execute(
          { serviceAccountName: "dash" },
          context,
        )
      );
      assertStringIncludes((err as Error).message, "not found");
      assertEquals(
        fake.requests.map((r) => [r.method, r.path]),
        [["DELETE", "/api/v1/namespaces/default/serviceaccounts/dash"]],
      );
    }),
});

Deno.test({
  name: "deleteServiceAccount deletes the account",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      const { context } = makeContext(fake, "deleteServiceAccount");
      await methods.deleteServiceAccount.execute(
        { serviceAccountName: "dash" },
        context,
      );
      assertEquals(fake.objects.has("serviceaccounts/default/dash"), false);
    }),
});

Deno.test({
  name:
    "checkServiceAccountAccess fails when the API answers with an evaluationError",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.grants.push({
        user: SA_USER,
        verb: "list",
        resource: "pods",
        namespace: "default",
      });
      fake.evaluationError = "webhook authorizer timed out";
      const { context, getWrittenResources } = makeContext(
        fake,
        "checkServiceAccountAccess",
      );
      const err = await assertRejects(() =>
        methods.checkServiceAccountAccess.execute(
          methods.checkServiceAccountAccess.arguments.parse({
            serviceAccountName: "dash",
            checks: [
              { verb: "list", resource: "pods" },
              { verb: "get", resource: "secrets" },
            ],
          }),
          context,
        )
      );
      assertStringIncludes((err as Error).message, "1 of 2 access checks");
      assertStringIncludes(
        (err as Error).message,
        "get secrets in default: webhook authorizer timed out",
      );
      const written = getWrittenResources();
      assertEquals(
        written.map((w) => [w.data.allowed, w.data.evaluationError]),
        [
          [true, ""],
          [false, "webhook authorizer timed out"],
        ],
      );
    }),
});

Deno.test({
  name: "deleteServiceAccount leaves other stored rbac records alone",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      const deleted: string[] = [];
      const { context } = makeContext(fake, "deleteServiceAccount");
      context.deleteResource = (name: string) => {
        deleted.push(name);
        return Promise.resolve();
      };
      await methods.deleteServiceAccount.execute(
        { serviceAccountName: "dash" },
        context,
      );
      // deleteResource takes no spec, so a call could drop a Role or
      // RoleBinding record of the same name.
      assertEquals(deleted, []);
    }),
});

Deno.test({
  name: "requestServiceAccountToken expires the record with the token",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      seedServiceAccount(fake);
      fake.tokenIssuedAt = Date.now();
      const { context } = makeContext(fake, "requestServiceAccountToken");
      const lifetimes: (string | undefined)[] = [];
      const write = context.writeResource;
      context.writeResource = (spec, name, data, overrides) => {
        lifetimes.push(overrides?.lifetime);
        return write(spec, name, data, overrides);
      };
      await methods.requestServiceAccountToken.execute(
        methods.requestServiceAccountToken.arguments.parse({
          serviceAccountName: "dash",
          expirationSeconds: 1800,
        }),
        context,
      );
      // 30 minutes, give or take the clock moving during the call.
      assert(
        lifetimes[0] === "30m" || lifetimes[0] === "29m",
        `lifetime ${lifetimes[0]}`,
      );
    }),
});

Deno.test({
  name: "token record names cannot collide across dashed names",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.put("serviceaccounts", {
        metadata: { name: "web", namespace: "team-a" },
      });
      fake.put("serviceaccounts", {
        metadata: { name: "a-web", namespace: "team" },
      });
      const { context, getWrittenResources } = makeContext(
        fake,
        "requestServiceAccountToken",
      );
      for (const [namespace, name] of [["team-a", "web"], ["team", "a-web"]]) {
        await methods.requestServiceAccountToken.execute(
          methods.requestServiceAccountToken.arguments.parse({
            serviceAccountName: name,
            namespace,
          }),
          context,
        );
      }
      assertEquals(getWrittenResources().map((w) => w.name), [
        "team-a_web",
        "team_a-web",
      ]);
    }),
});

Deno.test({
  name: "access review names cannot collide across dashed names or core",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      const { context, getWrittenResources } = makeContext(
        fake,
        "checkServiceAccountAccess",
      );
      await methods.checkServiceAccountAccess.execute(
        methods.checkServiceAccountAccess.arguments.parse({
          serviceAccountName: "dash",
          checks: [
            {
              verb: "get",
              resource: "secrets",
              name: "db-prod",
              namespace: "web",
            },
            {
              verb: "get",
              resource: "secrets",
              name: "db",
              namespace: "prod-web",
            },
            { verb: "get", resource: "pods" },
            { verb: "get", resource: "pods", group: "core" },
          ],
        }),
        context,
      );
      const names = getWrittenResources().map((w) => w.name);
      assertEquals(new Set(names).size, 4, names.join(" "));
    }),
});

Deno.test({
  name: "checkServiceAccountAccess rejects namespace with clusterScoped",
  fn: () => {
    const result = methods.checkServiceAccountAccess.arguments.safeParse({
      serviceAccountName: "dash",
      checks: [{
        verb: "list",
        resource: "nodes",
        namespace: "web",
        clusterScoped: true,
      }],
    });
    assert(!result.success);
  },
});

Deno.test({
  name: "an explicit deny with an evaluationError is an answer, not a failure",
  ...opts,
  fn: () =>
    withFake(async (fake) => {
      fake.evaluationError = "webhook authorizer timed out";
      fake.explicitDeny = true;
      const { context, getWrittenResources } = makeContext(
        fake,
        "checkServiceAccountAccess",
      );
      await methods.checkServiceAccountAccess.execute(
        methods.checkServiceAccountAccess.arguments.parse({
          serviceAccountName: "dash",
          checks: [{ verb: "get", resource: "secrets" }],
        }),
        context,
      );
      const [written] = getWrittenResources();
      assertEquals(written.data.denied, true);
      assertEquals(
        written.data.evaluationError,
        "webhook authorizer timed out",
      );
    }),
});

Deno.test({
  name: "updateServiceAccount refuses empty maps and lists",
  fn: () => {
    const result = methods.updateServiceAccount.arguments.safeParse({
      serviceAccountName: "dash",
      setAnnotations: {},
      removeLabels: [],
    });
    assert(!result.success);
  },
});

Deno.test({
  name: "checkServiceAccountAccess rejects an empty namespace",
  fn: () => {
    const result = methods.checkServiceAccountAccess.arguments.safeParse({
      serviceAccountName: "dash",
      checks: [{ verb: "list", resource: "pods", namespace: "" }],
    });
    assert(!result.success);
  },
});
