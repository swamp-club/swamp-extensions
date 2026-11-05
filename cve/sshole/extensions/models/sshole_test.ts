import { assertEquals, assertStringIncludes } from "jsr:@std/assert@1.0.19";
import {
  checkTargetArgs,
  type FileWriter,
  instanceName,
  model,
  verdictLine,
  writeScanLog,
} from "./sshole.ts";
import { analyze, parseProbe } from "./_lib/analysis.ts";
import { buildTransport, probeCommand, targetLabel } from "./_lib/transport.ts";
import type { Status } from "./_lib/schemas.ts";

function status(kv: Record<string, string>, stars: string[] = []): Status {
  const lines = Object.entries(kv).map(([k, v]) => `SSHOLE_${k}=${v}`);
  for (const s of stars) lines.push(`SSHOLE_STAR_ACCOUNT=${s}`);
  lines.push("SSHOLE_DONE=1");
  return analyze(parseProbe(lines.join("\n")), { target: "box" });
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

Deno.test("model export has only the read-only scan method", () => {
  assertEquals(model.type, "@swamp/cve/sshole");
  assertEquals(Object.keys(model.methods), ["scan"]);
  assertEquals(Object.keys(model.resources), ["status"]);
  assertEquals(model.reports, ["@swamp/cve/sshole-report"]);
  assertEquals(model.files.log.streaming, true);
});

Deno.test("globalArguments carry no SSH settings", () => {
  const keys = Object.keys(model.globalArguments.shape);
  assertEquals(keys.sort(), ["dockerContainer", "dockerImage"]);
  assertEquals(model.globalArguments.parse({}), {});
});

Deno.test("a container label keeps the full name", () => {
  assertEquals(
    targetLabel({ dockerContainer: "myservice-production-1" }),
    "docker-myservice-production-1",
  );
});

Deno.test("transport is local by default and docker exec for a container", () => {
  assertEquals(probeCommand(buildTransport({})), ["sh", "-s"]);
  assertEquals(probeCommand(buildTransport({ dockerContainer: "c1" })), [
    "docker",
    "exec",
    "-i",
    "c1",
    "sh",
    "-s",
  ]);
});

Deno.test("instanceName strips path separators and ':'", () => {
  assertEquals(instanceName("a/b\\c..d"), "a_b_c_d");
  assertEquals(instanceName("alpine:3.20"), "alpine_3.20");
});

Deno.test("verdictLine reports vulnerable, not vulnerable and unknown", () => {
  assertEquals(
    verdictLine(status(VULN, ["deploy|1001|/bin/sh"])),
    "VULNERABLE",
  );
  assertEquals(
    verdictLine(status({ ...VULN, PKG_VERSION: "openssh-server-9.7_p1-r6" })),
    "NOT VULNERABLE",
  );
  assertEquals(
    verdictLine(status({ ...VULN, UID: "1000", SHADOW_READABLE: "no" })),
    "UNKNOWN",
  );
});

Deno.test("writeScanLog leads with the verdict", async () => {
  const lines: string[] = [];
  const log: FileWriter = {
    writeLine: (l) => {
      lines.push(l);
      return Promise.resolve();
    },
    finalize: () => Promise.resolve(),
  };
  await writeScanLog(log, status(VULN, ["deploy|1001|/bin/sh"]));
  assertStringIncludes(lines[0], "VULNERABLE");
});

Deno.test("dockerImage and dockerContainer together are refused", () => {
  checkTargetArgs({ dockerImage: "alpine:3.20" });
  checkTargetArgs({ dockerContainer: "c1" });
  checkTargetArgs({});
  let threw = false;
  try {
    checkTargetArgs({ dockerImage: "alpine:3.20", dockerContainer: "c1" });
  } catch {
    threw = true;
  }
  assertEquals(threw, true);
});
