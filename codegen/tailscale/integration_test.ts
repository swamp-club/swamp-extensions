// Integration tests: run generated Tailscale models and the lib against a mock
// Tailscale API. Covers auth (API key, OAuth exchange, conflicts), tailnet
// resolution, one-time secrets, keyed create refusal, policy file ETags and
// HuJSON, delete semantics and 429 retries.

import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "@std/assert";
import { generateTailscaleExtensionModel } from "./extensionModelGenerator.ts";
import { generateTailscaleLibFile } from "./libGenerator.ts";
import { resolveModels } from "./pipeline.ts";
import { instanceName } from "./runtime/tailscale.ts";
import { entries, fixtureSpec } from "./testFixtures.ts";

// ---------------------------------------------------------------------------
// Mock Tailscale API
// ---------------------------------------------------------------------------

interface MockRequest {
  method: string;
  path: string;
  query: URLSearchParams;
  headers: Headers;
  body: string;
}

type Handler = (req: MockRequest) => Response | undefined;

function createMockServer(handlers: Handler[]) {
  const requests: MockRequest[] = [];
  const server = Deno.serve(
    { port: 0, onListen: () => {} },
    async (req) => {
      const url = new URL(req.url);
      const recorded: MockRequest = {
        method: req.method,
        path: url.pathname,
        query: url.searchParams,
        headers: req.headers,
        body: await req.text(),
      };
      requests.push(recorded);
      for (const handler of handlers) {
        const resp = handler(recorded);
        if (resp) return resp;
      }
      return Response.json({ message: "not found" }, { status: 404 });
    },
  );
  return {
    url: `http://localhost:${server.addr.port}`,
    requests,
    close: () => server.shutdown(),
  };
}

const route = (
  method: string,
  path: string,
  respond: (req: MockRequest) => Response,
): Handler =>
(req) => req.method === method && req.path === path ? respond(req) : undefined;

// ---------------------------------------------------------------------------
// Generated code loading and a mock method context
// ---------------------------------------------------------------------------

// deno-lint-ignore no-explicit-any
type GeneratedModel = any;

async function loadModels(): Promise<{
  models: Record<string, GeneratedModel>;
  cleanup: () => Promise<void>;
}> {
  const { models: resolved, errors } = resolveModels(fixtureSpec(), entries());
  assertEquals(errors, []);
  const dir = await Deno.makeTempDir();
  await Deno.mkdir(`${dir}/_lib`);
  await Deno.writeTextFile(
    `${dir}/_lib/tailscale.ts`,
    generateTailscaleLibFile(),
  );
  const models: Record<string, GeneratedModel> = {};
  for (const model of resolved) {
    const path = `${dir}/${model.fileName}`;
    await Deno.writeTextFile(
      path,
      generateTailscaleExtensionModel({
        model,
        extensionName: "@swamp/tailscale",
        version: "2026.01.01.1",
      }),
    );
    models[model.entry.model] = (await import(`file://${path}`)).model;
  }
  return { models, cleanup: () => Deno.remove(dir, { recursive: true }) };
}

function mockContext(globalArgs: Record<string, unknown>) {
  const written = new Map<string, unknown>();
  const warnings: string[] = [];
  const encoder = new TextEncoder();
  return {
    written,
    warnings,
    context: {
      globalArgs,
      modelType: "test",
      modelId: "test",
      logger: { warning: (msg: string) => warnings.push(msg) },
      writeResource(type: string, name: string, data: unknown) {
        // Like swamp, reject an instance name already used by another resource.
        for (const key of written.keys()) {
          const [otherType, otherName] = key.split("/");
          if (otherName === name && otherType !== type) {
            throw new Error(`Duplicate data instance name '${name}'`);
          }
        }
        written.set(`${type}/${name}`, data);
        return Promise.resolve({ type, name });
      },
      dataRepository: {
        getContent(_type: unknown, _id: unknown, name: string) {
          const data = written.get(`state/${name}`);
          return Promise.resolve(
            data ? encoder.encode(JSON.stringify(data)) : null,
          );
        },
      },
    },
  };
}

const ENV_VARS = [
  "TAILSCALE_API_KEY",
  "TAILSCALE_OAUTH_CLIENT_ID",
  "TAILSCALE_OAUTH_CLIENT_SECRET",
  "TAILSCALE_TAILNET",
  "TAILSCALE_BASE_URL",
];

/** Clears the Tailscale env vars for the test, restoring them afterwards. */
async function withCleanEnv(fn: () => Promise<void>): Promise<void> {
  const saved = new Map(ENV_VARS.map((k) => [k, Deno.env.get(k)]));
  try {
    for (const k of ENV_VARS) Deno.env.delete(k);
    await fn();
  } finally {
    for (const [k, v] of saved) {
      if (v === undefined) Deno.env.delete(k);
      else Deno.env.set(k, v);
    }
  }
}

const webhookBody = {
  endpointId: "wh1",
  endpointUrl: "https://example.com/hook",
  subscriptions: ["nodeCreated"],
};

// The generated lib is imported dynamically and its fetches and OAuth token
// cache outlive a single test step. sanitizeResources: false is required.
Deno.test({
  name: "tailscale generated models against a mock API",
  sanitizeResources: false,
  async fn(t) {
    let oauthTokens = 0;
    let tokenRateLimited = false;
    let revokingTokens = 0;
    let aclAsJson = false;
    let appName = "app-one";
    let rateLimited = false;
    let policy = "// default\n{}";
    let etag = '"e1"';
    const mock = createMockServer([
      route("POST", "/api/v2/oauth/token", (req) => {
        const form = new URLSearchParams(req.body);
        if (form.get("client_id") === "revoking") {
          revokingTokens++;
          return Response.json({
            access_token: revokingTokens === 1
              ? "revoked-token"
              : "fresh-token",
            expires_in: 3600,
          });
        }
        if (form.get("client_id") === "rate-limited" && !tokenRateLimited) {
          tokenRateLimited = true;
          return new Response("slow down", {
            status: 429,
            headers: { "Retry-After": "0" },
          });
        }
        oauthTokens++;
        assertEquals(form.get("grant_type"), "client_credentials");
        return Response.json({ access_token: "oauth-token", expires_in: 3600 });
      }),
      route(
        "POST",
        "/api/v2/tailnet/-/webhooks",
        () => Response.json({ ...webhookBody, secret: "s3cret" }),
      ),
      route("DELETE", "/api/v2/webhooks/other", () => new Response(null)),
      route(
        "DELETE",
        "/api/v2/tailnet/-/keys/k1",
        () => new Response(null),
      ),
      route(
        "GET",
        "/api/v2/webhooks/wh2",
        () => Response.json({ endpointId: "wh2", endpointUrl: "https://two" }),
      ),
      route(
        "GET",
        "/api/v2/device/n1",
        () =>
          Response.json({ id: "123", nodeId: "n1", name: "host.tail.ts.net" }),
      ),
      route("GET", "/api/v2/webhooks/bad", () =>
        new Response("{not json", {
          headers: { "Content-Type": "application/json" },
        })),
      route("POST", "/api/v2/tailnet/-/oauth-apps", (req) =>
        Response.json({
          id: "a1",
          ...JSON.parse(req.body),
          clientSecret: "app-secret",
        })),
      route("GET", "/api/v2/tailnet/-/oauth-apps/a1", () =>
        Response.json({
          id: "a1",
          name: appName,
          redirectURIs: ["https://example.com/cb"],
          scopes: ["devices:core:read"],
        })),
      route("PUT", "/api/v2/tailnet/-/oauth-apps/a1", (req) => {
        appName = JSON.parse(req.body).name;
        return Response.json({ id: "a1", name: appName });
      }),
      route("GET", "/api/v2/webhooks/wh1", () => {
        if (!rateLimited) {
          rateLimited = true;
          return new Response("slow down", {
            status: 429,
            headers: { "Retry-After": "0" },
          });
        }
        return Response.json(webhookBody);
      }),
      route(
        "GET",
        "/api/v2/tailnet/-/keys",
        (req) =>
          req.headers.get("Authorization") === "Bearer revoked-token"
            ? Response.json({ message: "API token invalid" }, { status: 401 })
            : Response.json({
              keys: [
                { id: "k1", keyType: "auth" },
                { id: "k2", keyType: "client" },
              ],
            }),
      ),
      route(
        "GET",
        "/api/v2/tailnet/-/services/svc:taken",
        () => Response.json({ name: "svc:taken" }),
      ),
      route(
        "GET",
        "/api/v2/tailnet/my-tailnet/dns/nameservers",
        () => Response.json({ dns: ["1.1.1.1"] }),
      ),
      route(
        "POST",
        "/api/v2/tailnet/-/dns/nameservers",
        () => Response.json({ dns: [] }),
      ),
      route("GET", "/api/v2/tailnet/-/acl", () =>
        new Response(policy, {
          headers: {
            "Content-Type": aclAsJson
              ? "application/json"
              : "application/hujson",
            "ETag": etag,
          },
        })),
      route("POST", "/api/v2/tailnet/-/acl/preview", (req) => {
        assertEquals(req.query.get("type"), "user");
        assertEquals(req.headers.get("Content-Type"), "application/hujson");
        return Response.json({ matches: ["rule-1"], type: "user" });
      }),
      route("POST", "/api/v2/tailnet/-/acl", (req) => {
        const ifMatch = req.headers.get("If-Match");
        if (ifMatch && ifMatch !== etag && ifMatch !== '"ts-default"') {
          return Response.json({ message: "precondition failed" }, {
            status: 412,
          });
        }
        if (ifMatch === '"ts-default"' && !policy.startsWith("// default")) {
          return Response.json({ message: "precondition failed" }, {
            status: 412,
          });
        }
        policy = req.body;
        etag = `"e${Number(etag.slice(2, -1)) + 1}"`;
        return new Response(policy, {
          headers: { "Content-Type": "application/hujson", "ETag": etag },
        });
      }),
    ]);
    const { models, cleanup } = await loadModels();
    const base = { baseUrl: mock.url };

    try {
      await withCleanEnv(async () => {
        await t.step("an API key is sent as a bearer token", async () => {
          const { context } = mockContext({ ...base, apiKey: "tskey-api" });
          await models.tailnet_key.methods.list.execute({}, context);
          const req = mock.requests.at(-1)!;
          assertEquals(req.headers.get("Authorization"), "Bearer tskey-api");
          assertEquals(req.query.get("all"), "true");
        });

        await t.step(
          "an OAuth client is exchanged once and cached",
          async () => {
            const args = {
              ...base,
              oauthClientId: "id",
              oauthClientSecret: "secret",
            };
            await models.tailnet_key.methods.list.execute(
              {},
              mockContext(args).context,
            );
            await models.tailnet_key.methods.list.execute(
              {},
              mockContext(args).context,
            );
            assertEquals(oauthTokens, 1);
            assertEquals(
              mock.requests.at(-1)!.headers.get("Authorization"),
              "Bearer oauth-token",
            );
          },
        );

        await t.step(
          "a rate-limited OAuth token request is retried",
          async () => {
            await models.tailnet_key.methods.list.execute(
              {},
              mockContext({
                ...base,
                oauthClientId: "rate-limited",
                oauthClientSecret: "secret",
              }).context,
            );
            assert(tokenRateLimited);
            assertEquals(oauthTokens, 2);
          },
        );

        await t.step("a changed client secret gets a new token", async () => {
          const before = oauthTokens;
          for (const secret of ["first-secret", "second-secret"]) {
            await models.tailnet_key.methods.list.execute(
              {},
              mockContext({
                ...base,
                oauthClientId: "rotating",
                oauthClientSecret: secret,
              })
                .context,
            );
          }
          assertEquals(oauthTokens, before + 2);
        });

        await t.step(
          "a 401 drops the cached token and retries once",
          async () => {
            await models.tailnet_key.methods.list.execute(
              {},
              mockContext({
                ...base,
                oauthClientId: "revoking",
                oauthClientSecret: "secret",
              }).context,
            );
            assertEquals(revokingTokens, 2);
            assertEquals(
              mock.requests.at(-1)!.headers.get("Authorization"),
              "Bearer fresh-token",
            );
          },
        );

        await t.step("an API key with OAuth settings is rejected", async () => {
          const { context } = mockContext({
            ...base,
            apiKey: "k",
            oauthClientId: "id",
            oauthClientSecret: "s",
          });
          await assertRejects(
            () => models.tailnet_key.methods.list.execute({}, context),
            Error,
            "Conflicting Tailscale credentials",
          );
        });

        await t.step("missing credentials are reported", async () => {
          await assertRejects(
            () =>
              models.tailnet_key.methods.list.execute(
                {},
                mockContext(base).context,
              ),
            Error,
            "No Tailscale credentials found",
          );
        });

        Deno.env.set("TAILSCALE_API_KEY", "env-key");

        await t.step("list keeps only its own key type", async () => {
          const { context, written } = mockContext(base);
          const result = await models.tailnet_key.methods.list.execute(
            {},
            context,
          );
          assertEquals(result.dataHandles.length, 1);
          assertEquals([...written.keys()], ["state/item-k1"]);
        });

        await t.step("TAILSCALE_TAILNET picks the tailnet", async () => {
          Deno.env.set("TAILSCALE_TAILNET", "my-tailnet");
          try {
            await models.dns_nameservers.methods.get.execute(
              {},
              mockContext(base).context,
            );
            assertEquals(
              mock.requests.at(-1)!.path,
              "/api/v2/tailnet/my-tailnet/dns/nameservers",
            );
          } finally {
            Deno.env.delete("TAILSCALE_TAILNET");
          }
        });

        await t.step(
          "create stores a one-time secret apart from state; get leaves it",
          async () => {
            const { context, written } = mockContext({
              ...base,
              name: "hook",
              endpointUrl: webhookBody.endpointUrl,
              subscriptions: webhookBody.subscriptions,
            });
            await models.webhook.methods.create.execute({}, context);
            assertEquals(written.get("secret/secret-hook"), {
              secret: "s3cret",
            });
            assert(!("secret" in (written.get("state/hook") as object)));
            // The GET answers 429 once first, so this also covers the retry.
            await models.webhook.methods.sync.execute({}, context);
            assertEquals(written.get("secret/secret-hook"), {
              secret: "s3cret",
            });
            assertEquals(
              (written.get("state/hook") as { endpointId: string }).endpointId,
              "wh1",
            );
            assert(rateLimited);
          },
        );

        await t.step(
          "delete of another ID leaves the stored resource tracked",
          async () => {
            const { context, written } = mockContext({ ...base, name: "hook" });
            written.set("state/hook", webhookBody);
            await models.webhook.methods.delete.execute(
              { id: "other" },
              context,
            );
            assertEquals(written.get("state/hook"), webhookBody);
            assertEquals(
              (written.get("state/item-other") as { status: string }).status,
              "deleted",
            );
            assert(!written.has("state/other"));
          },
        );

        await t.step(
          "delete of a listed ID marks its item instance deleted",
          async () => {
            const { context, written } = mockContext({ ...base, name: "key" });
            const tracked = { id: "k9", keyType: "auth" };
            written.set("state/key", tracked);
            await models.tailnet_key.methods.list.execute({}, context);
            assert(written.has("state/item-k1"));
            await models.tailnet_key.methods.delete.execute(
              { id: "k1" },
              context,
            );
            assertEquals(
              (written.get("state/item-k1") as { status: string }).status,
              "deleted",
            );
            assertEquals(written.get("state/key"), tracked);
            assert(!written.has("state/k1"));
          },
        );

        await t.step("a path value of '..' is rejected", async () => {
          await assertRejects(
            () =>
              models.device.methods.get.execute(
                { id: ".." },
                mockContext(base).context,
              ),
            Error,
            "Invalid value for path parameter",
          );
        });

        await t.step(
          "create refuses when the instance already tracks a resource",
          async () => {
            const before = mock.requests.length;
            const { context, written } = mockContext({
              ...base,
              name: "hook",
              endpointUrl: webhookBody.endpointUrl,
              subscriptions: webhookBody.subscriptions,
            });
            written.set("state/hook", webhookBody);
            await assertRejects(
              () => models.webhook.methods.create.execute({}, context),
              Error,
              "already tracks webhook wh1",
            );
            assertEquals(mock.requests.length, before);
          },
        );

        await t.step("create is allowed over a revoked key", async () => {
          const { context, written } = mockContext({ ...base, name: "hook" });
          // What sync stores for a deleted auth key: revoked and invalid.
          written.set("state/hook", {
            endpointId: "old",
            revoked: "2026-01-01T00:00:00Z",
            invalid: true,
          });
          context.globalArgs.endpointUrl = webhookBody.endpointUrl;
          context.globalArgs.subscriptions = webhookBody.subscriptions;
          await models.webhook.methods.create.execute({}, context);
          assertEquals(
            (written.get("state/hook") as { endpointId: string }).endpointId,
            "wh1",
          );
        });

        await t.step("list never overwrites the tracked instance", async () => {
          const { context, written } = mockContext({ ...base, name: "k2" });
          written.set("state/k2", { id: "tracked" });
          await models.tailnet_key.methods.list.execute({}, context);
          assertEquals(written.get("state/k2"), { id: "tracked" });
          assert(written.has("state/item-k1"));
        });

        await t.step("subnet routes require routes", async () => {
          const before = mock.requests.length;
          await assertRejects(
            () =>
              models.device_subnet_routes.methods.create.execute(
                {},
                mockContext({ ...base, deviceId: "d1" }).context,
              ),
            Error,
            "create requires global arguments: routes",
          );
          assertEquals(mock.requests.length, before);
        });

        await t.step("device state is keyed by node ID", async () => {
          const { context, written } = mockContext(base);
          await models.device.methods.get.execute({ id: "n1" }, context);
          assertEquals([...written.keys()], ["state/n1"]);
        });

        await t.step(
          "get of another ID leaves the tracked instance",
          async () => {
            const { context, written } = mockContext({ ...base, name: "hook" });
            written.set("state/hook", webhookBody);
            await models.webhook.methods.get.execute({ id: "wh2" }, context);
            assertEquals(written.get("state/hook"), webhookBody);
            assertEquals(
              (written.get("state/item-wh2") as { endpointId: string })
                .endpointId,
              "wh2",
            );
          },
        );

        await t.step("device settings require their value", async () => {
          const before = mock.requests.length;
          await assertRejects(
            () =>
              models.device_tags.methods.create.execute(
                {},
                mockContext({ ...base, deviceId: "d1" }).context,
              ),
            Error,
            "create requires global arguments: tags",
          );
          assertEquals(mock.requests.length, before);
        });

        await t.step(
          "renaming through update keeps the stored instance",
          async () => {
            const args = {
              ...base,
              instanceName: "app",
              name: "app-one",
              redirectURIs: ["https://example.com/cb"],
              scopes: ["devices:core:read"],
            };
            const { context, written } = mockContext(args);
            await models.oauth_app.methods.create.execute({}, context);
            assertEquals(written.get("secret/secret-app"), {
              clientSecret: "app-secret",
            });
            context.globalArgs.name = "app-two";
            await models.oauth_app.methods.update.execute({}, context);
            assertEquals(
              (written.get("state/app") as { name: string }).name,
              "app-two",
            );
          },
        );

        await t.step("malformed JSON names the request", async () => {
          await assertRejects(
            () =>
              models.webhook.methods.get.execute(
                { id: "bad" },
                mockContext({ ...base, name: "hook" }).context,
              ),
            Error,
            "GET /webhooks/bad returned malformed JSON",
          );
        });

        await t.step("create requires the create-required fields", async () => {
          const before = mock.requests.length;
          await assertRejects(
            () =>
              models.webhook.methods.create.execute(
                {},
                mockContext({ ...base, name: "hook" }).context,
              ),
            Error,
            "create requires global arguments: endpointUrl, subscriptions",
          );
          assertEquals(mock.requests.length, before);
        });

        await t.step("keyed create refuses an existing service", async () => {
          await assertRejects(
            () =>
              models.service.methods.create.execute(
                {},
                mockContext({ ...base, name: "svc:taken" }).context,
              ),
            Error,
            "already exists",
          );
          assertEquals(mock.requests.at(-1)!.method, "GET");
        });

        await t.step(
          "clearing DNS nameservers posts an empty list",
          async () => {
            await models.dns_nameservers.methods.delete.execute(
              {},
              mockContext(base).context,
            );
            const req = mock.requests.at(-1)!;
            assertEquals(req.method, "POST");
            assertEquals(JSON.parse(req.body), { dns: [] });
          },
        );

        await t.step(
          "a no-op delete warns and sends no request",
          async () => {
            const before = mock.requests.length;
            const { context, warnings } = mockContext(base);
            await models.tailnet_settings.methods.delete.execute({}, context);
            assertEquals(mock.requests.length, before);
            assertEquals(warnings.length, 1);
            assertStringIncludes(warnings[0], "left unchanged");
          },
        );

        await t.step("policy file: create guards with ts-default", async () => {
          const { context, written } = mockContext({
            ...base,
            policy: "// mine\n{}",
          });
          await models.policy_file.methods.create.execute({}, context);
          const post = mock.requests.findLast((r) => r.method === "POST")!;
          assertEquals(post.headers.get("If-Match"), '"ts-default"');
          assertEquals(post.headers.get("Content-Type"), "application/hujson");
          const read = mock.requests.at(-1)!;
          assertEquals(read.headers.get("Accept"), "application/hujson");
          assertEquals(written.get("state/current"), {
            policy: "// mine\n{}",
            etag: '"e2"',
          });

          // The policy is no longer the default, so a second create refuses.
          await assertRejects(
            () =>
              models.policy_file.methods.create.execute(
                {},
                mockContext({ ...base, policy: "{}" }).context,
              ),
            Error,
            "has been edited",
          );
        });

        await t.step("policy file: update sends the stored ETag", async () => {
          const { context, written } = mockContext({
            ...base,
            policy: "// v2\n{}",
          });
          await models.policy_file.methods.get.execute({}, context);
          await models.policy_file.methods.update.execute({}, context);
          const post = mock.requests.findLast((r) => r.method === "POST")!;
          assertEquals(post.headers.get("If-Match"), '"e2"');
          assertEquals(
            (written.get("state/current") as { policy: string }).policy,
            "// v2\n{}",
          );

          // Changed elsewhere since the stored ETag: update refuses.
          etag = '"e99"';
          await assertRejects(
            () => models.policy_file.methods.update.execute({}, context),
            Error,
            "changed since the last get or sync",
          );
        });

        await t.step(
          "policy file: a JSON content type still stores the raw text",
          async () => {
            aclAsJson = true;
            try {
              const { context, written } = mockContext(base);
              await models.policy_file.methods.get.execute({}, context);
              assertEquals(
                (written.get("state/current") as { policy: string }).policy,
                policy,
              );
            } finally {
              aclAsJson = false;
            }
          },
        );

        await t.step(
          "policy file: update refuses without a stored ETag",
          async () => {
            const before = mock.requests.length;
            const { context, written } = mockContext({ ...base, policy: "{}" });
            written.set("state/current", { status: "unmanaged" });
            await assertRejects(
              () => models.policy_file.methods.update.execute({}, context),
              Error,
              "No ETag is stored",
            );
            assertEquals(mock.requests.length, before);
          },
        );

        await t.step("action responses are written to `result`", async () => {
          const { context, written } = mockContext({ ...base, policy: "{}" });
          const out = await models.policy_file.methods.preview.execute(
            { type: "user", previewFor: "a@example.com" },
            context,
          );
          assertEquals(out.dataHandles.length, 1);
          assertEquals(written.get("result/result-preview"), {
            matches: ["rule-1"],
            type: "user",
          });
        });

        await t.step(
          "policy file: delete resets only with resetOnDelete",
          async () => {
            const before = mock.requests.length;
            const { context, warnings } = mockContext(base);
            await models.policy_file.methods.delete.execute({}, context);
            assertEquals(mock.requests.length, before);
            assertEquals(warnings.length, 1);

            await models.policy_file.methods.delete.execute(
              {},
              mockContext({ ...base, resetOnDelete: true }).context,
            );
            const post = mock.requests.at(-1)!;
            assertEquals(post.method, "POST");
            assertEquals(post.body, "");
          },
        );
      });
    } finally {
      await cleanup();
      await mock.close();
    }
  },
});

Deno.test("instanceName - a bare dot or double dot becomes an underscore", () => {
  assertEquals(instanceName("."), "_");
  assertEquals(instanceName(".."), "_");
  assertEquals(instanceName("a.b"), "a.b");
  assertEquals(instanceName("a/b"), "a_b");
});
