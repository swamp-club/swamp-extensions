import { assertEquals, assertStringIncludes } from "jsr:@std/assert@1.0.19";
import { report } from "./sshole_report.ts";
import { analyze, parseProbe } from "../models/_lib/analysis.ts";
import type { Status } from "../models/_lib/schemas.ts";

// Statuses come from the model's own analyze() so the report and the resource
// schema cannot drift apart.
function status(
  kv: Record<string, string>,
  stars: string[] = [],
  target = "box",
): Status {
  const lines = Object.entries(kv).map(([k, v]) => `SSHOLE_${k}=${v}`);
  for (const s of stars) lines.push(`SSHOLE_STAR_ACCOUNT=${s}`);
  lines.push("SSHOLE_DONE=1");
  return analyze(parseProbe(lines.join("\n")), { target });
}

const VULN = {
  UNAME: "Linux",
  UID: "0",
  OS_ID: "alpine",
  OS_VER: "3.20.3",
  SSHD_PATH: "/usr/sbin/sshd",
  SSH_VERSION: "OpenSSH_9.7p1",
  PKG_MANAGER: "apk",
  PKG_VERSION: "openssh-server-9.7_p1-r5",
  LIBC: "musl",
  SSHD_LINKS_PAM: "no",
  USEPAM: "no",
  PWAUTH: "yes",
  PERMITROOT: "yes",
  SHADOW_READABLE: "yes",
  SEED_HASH_COUNT: "1",
};

function makeContext(
  methodName: string,
  results: Status[],
  modelType = "@swamp/cve/sshole",
) {
  const encoded = results.map((r) =>
    new TextEncoder().encode(JSON.stringify(r))
  );
  return {
    modelType,
    modelId: "sshole",
    methodName,
    dataHandles: results.map((_, i) => ({
      specName: "status",
      name: `r-${i}`,
      version: "1",
    })),
    dataRepository: {
      getContent: (_t: string, _m: string, dataName: string, _v: string) =>
        Promise.resolve(encoded[parseInt(dataName.split("-")[1])] ?? null),
    },
  };
}

Deno.test("report export shape", () => {
  assertEquals(report.name, "@swamp/cve/sshole-report");
  assertEquals(report.scope, "method");
});

Deno.test("report ignores a foreign model type", async () => {
  const out = await report.execute(
    makeContext(
      "scan",
      [status(VULN, ["deploy|1001|/bin/sh"])],
      "@other/model",
    ),
  );
  assertEquals(out.markdown, "");
});

Deno.test("scan report leads with the verdict per target", async () => {
  const out = await report.execute(
    makeContext("scan", [
      status({ ...VULN, PKG_VERSION: "openssh-server-9.7_p1-r6" }, [], "h2"),
      status(VULN, ["deploy|1001|/bin/sh"], "h1"),
      status({ ...VULN, UID: "1000", SHADOW_READABLE: "no" }, [], "h3"),
    ]),
  );
  assertStringIncludes(out.markdown, "*sshole");
  assertStringIncludes(out.markdown, "| Target | Verdict |");
  assertStringIncludes(out.markdown, "**VULNERABLE**");
  assertStringIncludes(out.markdown, "**NOT VULNERABLE**");
  assertStringIncludes(out.markdown, "**UNKNOWN**");
  assertStringIncludes(
    out.markdown,
    "1 vulnerable, 1 not vulnerable, 1 unknown",
  );
  assertStringIncludes(out.markdown, "deploy");
  const j = out.json as Array<{ target: string; verdict: string }>;
  // Vulnerable targets sort first.
  assertEquals(j.map((r) => r.verdict), [
    "vulnerable",
    "unknown",
    "not-vulnerable",
  ]);
  assertEquals(j.find((r) => r.target === "h2")?.verdict, "not-vulnerable");
});
