import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1";
import {
  buildClient,
  CONFLICT_ATTEMPTS,
  isNotFound,
  normalizeMeta,
  retryOnConflict,
} from "./helpers.ts";
import { startFakeApiServer } from "./fake_api_server.ts";

async function generateSelfSignedCert(
  subjectAltName = "DNS:localhost,IP:127.0.0.1",
): Promise<{ cert: string; key: string }> {
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
        `subjectAltName=${subjectAltName}`,
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
  name: "buildClient reports non-TLS network errors with their root cause",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    // A port that was just free, so the connection is refused. (undici
    // rejects port 1 as a "bad port" before it ever connects.)
    const listener = Deno.listen({ hostname: "127.0.0.1", port: 0 });
    const closedPort = listener.addr.port;
    listener.close();
    const tmpKubeconfig = await writeKubeconfig(
      `https://127.0.0.1:${closedPort}`,
    );

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
      // undici reports a refused connection as a bare "fetch failed"; the
      // wrapper must carry the underlying reason up to the message.
      assertStringIncludes(msg, "fetch failed: ");
      assertStringIncludes(msg, `127.0.0.1:${closedPort}`);
      assertEquals(err instanceof Error && err.cause !== undefined, true);
    } finally {
      await Deno.remove(tmpKubeconfig);
    }
  },
});

// The API server is reached on 127.0.0.1 (a tunnel), while its certificate
// names only this IP — the shape of swamp-club#4593.
const CERT_IP = "203.0.113.10";

async function startIpSanServer(): Promise<
  { server: Deno.HttpServer<Deno.NetAddr>; cert: string }
> {
  const { cert, key } = await generateSelfSignedCert(`IP:${CERT_IP}`);
  const server = Deno.serve(
    { hostname: "127.0.0.1", port: 0, cert, key, onListen() {} },
    (req) => {
      const path = new URL(req.url).pathname;
      if (path === "/apis/metrics.k8s.io/v1beta1/nodes") {
        return Response.json({
          kind: "NodeMetricsList",
          apiVersion: "metrics.k8s.io/v1beta1",
          metadata: {},
          items: [],
        });
      }
      return Response.json({
        kind: "NodeList",
        apiVersion: "v1",
        metadata: {},
        items: [{ metadata: { name: "node-1" } }],
      });
    },
  );
  return { server, cert };
}

function writeTlsServerNameKubeconfig(
  port: number,
  cert: string,
  tlsServerName: string,
): Promise<string> {
  const content = JSON.stringify({
    apiVersion: "v1",
    kind: "Config",
    clusters: [{
      name: "tunnel",
      cluster: {
        server: `https://127.0.0.1:${port}`,
        "tls-server-name": tlsServerName,
        "certificate-authority-data": btoa(cert),
      },
    }],
    users: [{ name: "tunnel-user", user: { token: "test-token" } }],
    contexts: [{
      name: "tunnel",
      context: { cluster: "tunnel", user: "tunnel-user" },
    }],
    "current-context": "tunnel",
  });
  return Deno.makeTempFile({ suffix: ".json" }).then(async (path) => {
    await Deno.writeTextFile(path, content);
    return path;
  });
}

Deno.test({
  name:
    "buildClient connects when tls-server-name is an IP in the cert (API and Metrics)",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    const { server, cert } = await startIpSanServer();
    const kubeconfig = await writeTlsServerNameKubeconfig(
      server.addr.port,
      cert,
      CERT_IP,
    );
    try {
      const { coreApi, metricsClient } = buildClient({
        namespace: "default",
        kubeconfig,
      });
      const nodes = await coreApi.listNode();
      assertEquals(nodes.items.map((n) => n.metadata?.name), ["node-1"]);
      const metrics = await metricsClient.getNodeMetrics();
      assertEquals(metrics.items, []);
    } finally {
      await Deno.remove(kubeconfig);
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "buildClient rejects an IP tls-server-name the cert does not name",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    const { server, cert } = await startIpSanServer();
    const kubeconfig = await writeTlsServerNameKubeconfig(
      server.addr.port,
      cert,
      "198.51.100.1",
    );
    try {
      const { coreApi } = buildClient({ namespace: "default", kubeconfig });
      const err = await assertRejects(() => coreApi.listNode(), Error);
      assertStringIncludes(err.message, "TLS verification failed");
      assertStringIncludes(err.message, "198.51.100.1");
      assertStringIncludes(err.message, CERT_IP);
    } finally {
      await Deno.remove(kubeconfig);
      await server.shutdown();
    }
  },
});

Deno.test({
  name: "buildClient sends a DNS tls-server-name as SNI, and an IP as none",
  // @kubernetes/client-node keeps an HTTP agent connection pool alive
  sanitizeResources: false,
  fn: async () => {
    const kubeconfig = await writeKubeconfig("https://127.0.0.1:1");
    try {
      const { kc } = buildClient({ namespace: "default", kubeconfig });
      const cluster = kc.getCurrentCluster();

      const dns = kc.createDispatcherOptions(cluster, {
        servername: "kubernetes",
      });
      assertEquals(dns.type, "agent");
      if (dns.type !== "agent") return;
      assertEquals(dns.connect.servername, "kubernetes");
      assertEquals(dns.connect.checkServerIdentity, undefined);

      const ip = kc.createDispatcherOptions(cluster, { servername: CERT_IP });
      assertEquals(ip.type, "agent");
      if (ip.type !== "agent") return;
      assertEquals(ip.connect.servername, undefined);
      assertEquals(typeof ip.connect.checkServerIdentity, "function");
    } finally {
      await Deno.remove(kubeconfig);
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

Deno.test("retryOnConflict retries a 409 until the attempt succeeds", async () => {
  let calls = 0;
  const result = await retryOnConflict(() => {
    calls++;
    if (calls < 3) return Promise.reject({ code: 409 });
    return Promise.resolve("done");
  });
  assertEquals(result, "done");
  assertEquals(calls, 3);
});

Deno.test("retryOnConflict throws other errors at once", async () => {
  let calls = 0;
  const err = await assertRejects(() =>
    retryOnConflict(() => {
      calls++;
      return Promise.reject({ code: 422 });
    })
  );
  assertEquals((err as { code: number }).code, 422);
  assertEquals(calls, 1);
});

Deno.test("retryOnConflict gives up with the 409 after its attempts", async () => {
  let calls = 0;
  const err = await assertRejects(() =>
    retryOnConflict(() => {
      calls++;
      return Promise.reject({ code: 409 });
    })
  );
  assertEquals((err as { code: number }).code, 409);
  assertEquals(calls, CONFLICT_ATTEMPTS);
});
