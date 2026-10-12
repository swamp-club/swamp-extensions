import { assert, assertEquals } from "@std/assert";
import { generateGcpLibFile } from "./libGenerator.ts";
import { findBareSpecifiers } from "../shared/importSpecifiers.ts";

// The generated `_lib/gcp.ts` is a string template. To test the auth
// functions (which are module-private), we write a modified copy that
// exports them, then dynamic-import with a cache-busting query.

interface GcpAuthLib {
  activateServiceAccountFromJson: (
    json: string,
    scopes?: string[],
  ) => Promise<{ projectId: string; accessToken: string }>;
  getApplicationDefaultCredentials: (
    scopes?: string[],
  ) => Promise<{ projectId: string; accessToken: string }>;
  request: (
    method: string,
    url: string,
    body?: Record<string, unknown>,
    credentials?: {
      accessToken?: string;
      credentialsJson?: string;
      project?: string;
      quotaProject?: string;
      scopes?: string[];
    },
  ) => Promise<Response>;
}

async function importAuthFunctions(
  mockGcloudDir: string,
): Promise<{ mod: GcpAuthLib; cleanup: () => Promise<void> }> {
  const generated = generateGcpLibFile();
  const testable = generated
    .replace(
      "async function activateServiceAccountFromJson(",
      "export async function activateServiceAccountFromJson(",
    )
    .replace(
      "async function getApplicationDefaultCredentials(",
      "export async function getApplicationDefaultCredentials(",
    )
    .replace(
      "async function ensureGcloudInstalled(): Promise<void> {",
      "async function ensureGcloudInstalled(): Promise<void> { gcloudChecked = true; return;",
    );
  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, testable);
  const origPath = Deno.env.get("PATH");
  Deno.env.set("PATH", `${mockGcloudDir}:${origPath}`);
  try {
    const mod = await import(
      `file://${tmp}?v=${crypto.randomUUID()}`
    ) as unknown as GcpAuthLib;
    return {
      mod,
      cleanup: async () => {
        Deno.env.set("PATH", origPath!);
        await Deno.remove(tmp);
      },
    };
  } catch (err) {
    Deno.env.set("PATH", origPath!);
    await Deno.remove(tmp);
    throw err;
  }
}

async function setupMockGcloud(): Promise<{
  dir: string;
  argsFile: string;
  cleanup: () => Promise<void>;
}> {
  const dir = await Deno.makeTempDir();
  const argsFile = `${dir}/gcloud-args.log`;
  const script = `#!/bin/sh
echo "$@" >> "${argsFile}"
if echo "$@" | grep -q "activate-service-account"; then
  exit 0
fi
if echo "$@" | grep -q "print-access-token"; then
  echo "ya29.mock-access-token"
  exit 0
fi
if echo "$@" | grep -q "config get-value project"; then
  echo "mock-project"
  exit 0
fi
if echo "$@" | grep -q -- "--version"; then
  echo "Google Cloud SDK 555.0.0"
  exit 0
fi
exit 0
`;
  await Deno.writeTextFile(`${dir}/gcloud`, script);
  await Deno.chmod(`${dir}/gcloud`, 0o755);
  return {
    dir,
    argsFile,
    cleanup: async () => {
      await Deno.remove(dir, { recursive: true });
    },
  };
}

Deno.test({
  name:
    "activateServiceAccountFromJson passes --scopes when scopes are provided",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });
      const scopes = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.readonly",
      ];
      const creds = await mod.activateServiceAccountFromJson(saJson, scopes);
      assertEquals(creds.accessToken, "ya29.mock-access-token");
      assertEquals(creds.projectId, "test-project");

      const args = await Deno.readTextFile(mock.argsFile);
      const tokenLine = args.split("\n").find((l) =>
        l.includes("print-access-token")
      );
      assert(tokenLine, "should have called print-access-token");
      assert(
        tokenLine!.includes(
          "--scopes=https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/calendar.readonly",
        ),
        `should pass --scopes flag, got: ${tokenLine}`,
      );
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "activateServiceAccountFromJson does NOT pass --scopes when scopes are empty",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });
      await mod.activateServiceAccountFromJson(saJson, []);

      const args = await Deno.readTextFile(mock.argsFile);
      const tokenLine = args.split("\n").find((l) =>
        l.includes("print-access-token")
      );
      assert(tokenLine, "should have called print-access-token");
      assert(
        !tokenLine!.includes("--scopes"),
        `should NOT pass --scopes flag for empty array, got: ${tokenLine}`,
      );
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "activateServiceAccountFromJson does NOT pass --scopes when scopes are undefined",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });
      await mod.activateServiceAccountFromJson(saJson);

      const args = await Deno.readTextFile(mock.argsFile);
      const tokenLine = args.split("\n").find((l) =>
        l.includes("print-access-token")
      );
      assert(tokenLine, "should have called print-access-token");
      assert(
        !tokenLine!.includes("--scopes"),
        `should NOT pass --scopes flag when undefined, got: ${tokenLine}`,
      );
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "getApplicationDefaultCredentials passes --scopes when scopes are provided",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      const scopes = ["https://www.googleapis.com/auth/calendar"];
      const creds = await mod.getApplicationDefaultCredentials(scopes);
      assertEquals(creds.accessToken, "ya29.mock-access-token");

      const args = await Deno.readTextFile(mock.argsFile);
      const adcLine = args.split("\n").find((l) =>
        l.includes("application-default print-access-token")
      );
      assert(
        adcLine,
        "should have called application-default print-access-token",
      );
      assert(
        adcLine!.includes(
          "--scopes=https://www.googleapis.com/auth/calendar",
        ),
        `should pass --scopes flag, got: ${adcLine}`,
      );
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "getApplicationDefaultCredentials does NOT pass --scopes when scopes are undefined",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      await mod.getApplicationDefaultCredentials();

      const args = await Deno.readTextFile(mock.argsFile);
      const adcLine = args.split("\n").find((l) =>
        l.includes("application-default print-access-token")
      );
      assert(
        adcLine,
        "should have called application-default print-access-token",
      );
      assert(
        !adcLine!.includes("--scopes"),
        `should NOT pass --scopes flag when undefined, got: ${adcLine}`,
      );
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

// ---------------------------------------------------------------------------
// End-to-end: request() → getCredentials() → gcloud with scopes
// ---------------------------------------------------------------------------

Deno.test({
  name:
    "request() with credentialsJson + scopes passes --scopes to gcloud end-to-end",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });

      // Start a local HTTP server to handle the API request
      const server = Deno.serve({ port: 0, onListen() {} }, () => {
        return new Response(JSON.stringify({ id: "event-1" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
      const port = server.addr.port;

      try {
        const resp = await mod.request(
          "GET",
          `http://localhost:${port}/calendar/v3/events`,
          undefined,
          {
            credentialsJson: saJson,
            scopes: [
              "https://www.googleapis.com/auth/calendar",
              "https://www.googleapis.com/auth/calendar.readonly",
            ],
          },
        );
        assertEquals(resp.status, 200);
        const body = await resp.json();
        assertEquals(body.id, "event-1");

        // Verify gcloud received --scopes
        const args = await Deno.readTextFile(mock.argsFile);
        const tokenLine = args.split("\n").find((l) =>
          l.includes("print-access-token")
        );
        assert(tokenLine, "should have called print-access-token");
        assert(
          tokenLine!.includes(
            "--scopes=https://www.googleapis.com/auth/calendar,https://www.googleapis.com/auth/calendar.readonly",
          ),
          `end-to-end: should pass --scopes flag, got: ${tokenLine}`,
        );
      } finally {
        await server.shutdown();
      }
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "request() with credentialsJson + no scopes does NOT pass --scopes to gcloud",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    try {
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });

      const server = Deno.serve({ port: 0, onListen() {} }, () => {
        return new Response(JSON.stringify({ id: "instance-1" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
      const port = server.addr.port;

      try {
        const resp = await mod.request(
          "GET",
          `http://localhost:${port}/compute/v1/instances`,
          undefined,
          { credentialsJson: saJson },
        );
        assertEquals(resp.status, 200);

        const args = await Deno.readTextFile(mock.argsFile);
        const tokenLine = args.split("\n").find((l) =>
          l.includes("print-access-token")
        );
        assert(tokenLine, "should have called print-access-token");
        assert(
          !tokenLine!.includes("--scopes"),
          `end-to-end: should NOT pass --scopes flag, got: ${tokenLine}`,
        );
      } finally {
        await server.shutdown();
      }
    } finally {
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

// ---------------------------------------------------------------------------
// x-goog-user-project quota header
// ---------------------------------------------------------------------------

Deno.test({
  name: "request() does NOT send x-goog-user-project for plain SA credentials",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    const origQuotaEnv = Deno.env.get("GOOGLE_CLOUD_QUOTA_PROJECT");
    try {
      Deno.env.delete("GOOGLE_CLOUD_QUOTA_PROJECT");
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });

      const capturedHeaders: Record<string, string> = {};
      const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
        for (const [k, v] of req.headers.entries()) {
          capturedHeaders[k] = v;
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
      const port = server.addr.port;

      try {
        await mod.request(
          "GET",
          `http://localhost:${port}/test`,
          undefined,
          { credentialsJson: saJson },
        );
        assert(
          !("x-goog-user-project" in capturedHeaders),
          `should NOT send x-goog-user-project for plain SA creds, got headers: ${
            JSON.stringify(capturedHeaders)
          }`,
        );
      } finally {
        await server.shutdown();
      }
    } finally {
      if (origQuotaEnv !== undefined) {
        Deno.env.set("GOOGLE_CLOUD_QUOTA_PROJECT", origQuotaEnv);
      } else {
        Deno.env.delete("GOOGLE_CLOUD_QUOTA_PROJECT");
      }
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "request() sends x-goog-user-project when GOOGLE_CLOUD_QUOTA_PROJECT is set",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    const origQuotaEnv = Deno.env.get("GOOGLE_CLOUD_QUOTA_PROJECT");
    try {
      Deno.env.set("GOOGLE_CLOUD_QUOTA_PROJECT", "my-quota-project");
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });

      let capturedHeaders: Record<string, string> = {};
      const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
        capturedHeaders = {};
        for (const [k, v] of req.headers.entries()) {
          capturedHeaders[k] = v;
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
      const port = server.addr.port;

      try {
        await mod.request(
          "GET",
          `http://localhost:${port}/test`,
          undefined,
          { credentialsJson: saJson },
        );
        assertEquals(
          capturedHeaders["x-goog-user-project"],
          "my-quota-project",
          "should send x-goog-user-project from GOOGLE_CLOUD_QUOTA_PROJECT env var",
        );
      } finally {
        await server.shutdown();
      }
    } finally {
      if (origQuotaEnv !== undefined) {
        Deno.env.set("GOOGLE_CLOUD_QUOTA_PROJECT", origQuotaEnv);
      } else {
        Deno.env.delete("GOOGLE_CLOUD_QUOTA_PROJECT");
      }
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test({
  name:
    "request() sends x-goog-user-project when explicit quotaProject is provided",
  async fn() {
    const mock = await setupMockGcloud();
    const { mod, cleanup: libCleanup } = await importAuthFunctions(mock.dir);
    const origQuotaEnv = Deno.env.get("GOOGLE_CLOUD_QUOTA_PROJECT");
    try {
      Deno.env.delete("GOOGLE_CLOUD_QUOTA_PROJECT");
      const saJson = JSON.stringify({
        client_email: "test@project.iam.gserviceaccount.com",
        project_id: "test-project",
        type: "service_account",
      });

      let capturedHeaders: Record<string, string> = {};
      const server = Deno.serve({ port: 0, onListen() {} }, (req) => {
        capturedHeaders = {};
        for (const [k, v] of req.headers.entries()) {
          capturedHeaders[k] = v;
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
      const port = server.addr.port;

      try {
        await mod.request(
          "GET",
          `http://localhost:${port}/test`,
          undefined,
          { credentialsJson: saJson, quotaProject: "explicit-quota-project" },
        );
        assertEquals(
          capturedHeaders["x-goog-user-project"],
          "explicit-quota-project",
          "should send x-goog-user-project from explicit quotaProject option",
        );
      } finally {
        await server.shutdown();
      }
    } finally {
      if (origQuotaEnv !== undefined) {
        Deno.env.set("GOOGLE_CLOUD_QUOTA_PROJECT", origQuotaEnv);
      } else {
        Deno.env.delete("GOOGLE_CLOUD_QUOTA_PROJECT");
      }
      await libCleanup();
      await mock.cleanup();
    }
  },
  sanitizeResources: false,
});

Deno.test("generateGcpLibFile - imports only explicit or relative specifiers", () => {
  assertEquals(findBareSpecifiers(generateGcpLibFile()), []);
});
