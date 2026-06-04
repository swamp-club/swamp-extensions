import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1";
import { buildClient } from "./helpers.ts";

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
