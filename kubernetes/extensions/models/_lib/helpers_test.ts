import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1";
import { buildClient, isNotFound, normalizeMeta } from "./helpers.ts";
import { startFakeApiServer } from "./fake_api_server.ts";

async function generateSelfSignedCert(): Promise<
  { cert: string; key: string }
> {
  const privDer = new Uint8Array(
    await crypto.subtle.exportKey(
      "pkcs8",
      (await crypto.subtle.generateKey(
        {
          name: "RSASSA-PKCS1-v1_5",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["sign", "verify"],
      )).privateKey,
    ),
  );

  const keyB64 = btoa(String.fromCharCode(...privDer));
  const keyPem = `-----BEGIN PRIVATE KEY-----\n${
    keyB64.match(/.{1,64}/g)!.join("\n")
  }\n-----END PRIVATE KEY-----\n`;

  const tmpKey = await Deno.makeTempFile({ suffix: ".pem" });
  const tmpCert = await Deno.makeTempFile({ suffix: ".pem" });
  try {
    await Deno.writeTextFile(tmpKey, keyPem);
    const proc = new Deno.Command("openssl", {
      args: [
        "req",
        "-new",
        "-x509",
        "-key",
        tmpKey,
        "-out",
        tmpCert,
        "-days",
        "1",
        "-subj",
        "/CN=localhost",
        "-addext",
        "subjectAltName=DNS:localhost,IP:127.0.0.1",
      ],
      stderr: "piped",
    });
    const result = await proc.output();
    if (!result.success) {
      throw new Error(
        `openssl failed: ${new TextDecoder().decode(result.stderr)}`,
      );
    }
    const cert = await Deno.readTextFile(tmpCert);
    return { cert, key: keyPem };
  } finally {
    await Deno.remove(tmpKey);
    await Deno.remove(tmpCert);
  }
}

function writeKubeconfig(server: string): Promise<string> {
  const content = JSON.stringify({
    apiVersion: "v1",
    kind: "Config",
    clusters: [{ name: "test-cluster", cluster: { server } }],
    users: [{ name: "test-user", user: {} }],
    contexts: [{
      name: "test-context",
      context: { cluster: "test-cluster", user: "test-user" },
    }],
    "current-context": "test-context",
  });
  return Deno.makeTempFile({ suffix: ".json" }).then(async (path) => {
    await Deno.writeTextFile(path, content);
    return path;
  });
}

Deno.test({
  name: "buildClient wraps TLS errors with actionable context",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    const { cert, key } = await generateSelfSignedCert();

    const server = Deno.serve(
      { hostname: "127.0.0.1", port: 0, cert, key, onListen() {} },
      () => new Response("ok"),
    );
    const port = server.addr.port;
    const tmpKubeconfig = await writeKubeconfig(`https://127.0.0.1:${port}`);

    try {
      const clients = buildClient({
        namespace: "default",
        context: "test-context",
        kubeconfig: tmpKubeconfig,
        labels: undefined,
      });

      const err = await assertRejects(() => clients.coreApi.listNode(), Error);

      assertStringIncludes(err.message, "TLS verification failed");
      assertStringIncludes(err.message, "test-context");
      assertStringIncludes(err.message, `https://127.0.0.1:${port}`);
      assertStringIncludes(err.message, "kubeconfig credentials may be stale");
    } finally {
      await Deno.remove(tmpKubeconfig);
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "buildClient passes through non-TLS errors unmodified",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    const tmpKubeconfig = await writeKubeconfig("https://127.0.0.1:1");

    try {
      const clients = buildClient({
        namespace: "default",
        context: "test-context",
        kubeconfig: tmpKubeconfig,
        labels: undefined,
      });

      const err = await assertRejects(() => clients.coreApi.listNode());

      const msg = err instanceof Error ? err.message : String(err);
      assertEquals(msg.includes("TLS verification failed"), false);
    } finally {
      await Deno.remove(tmpKubeconfig);
    }
  },
});

Deno.test({
  name: "isNotFound recognises a client-node ApiException 404",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    const fake = await startFakeApiServer();
    try {
      const { coreApi } = buildClient({
        namespace: "default",
        kubeconfig: fake.kubeconfig,
      });
      const err = await assertRejects(() =>
        coreApi.readNamespacedSecret({ name: "x", namespace: "default" })
      );
      assertEquals(isNotFound(err), true);
    } finally {
      await fake.close();
    }
  },
});

Deno.test("isNotFound rejects non-404 errors and non-errors", () => {
  assertEquals(isNotFound({ statusCode: 404 }), true);
  assertEquals(isNotFound({ code: 409 }), false);
  assertEquals(isNotFound(new Error("boom")), false);
  assertEquals(isNotFound(undefined), false);
  assertEquals(isNotFound("404"), false);
});

Deno.test("normalizeMeta drops kubectl last-applied-configuration only", () => {
  const meta = normalizeMeta({
    metadata: {
      name: "app",
      annotations: {
        "kubectl.kubernetes.io/last-applied-configuration": "{}",
        "kubectl.kubernetes.io/restartedAt": "2026-10-25T00:00:00Z",
        owner: "team-a",
      },
    },
  });
  assertEquals(meta.annotations, {
    "kubectl.kubernetes.io/restartedAt": "2026-10-25T00:00:00Z",
    owner: "team-a",
  });
});
