import {
  assert,
  assertEquals,
  assertFalse,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { report } from "./tailworm_report.ts";
import {
  analyze,
  failedMitigation,
  type MitigationOptions,
  parseProbe,
  type Status,
} from "../models/tailworm.ts";

// Statuses come from the model's own analyze() so the report and the
// resource schema cannot drift apart.

function status(
  target: string,
  opts: { lines?: string[]; prefs?: unknown; serve?: unknown } = {},
): Status {
  const text = [
    `HOSTNAME|${target}`,
    "UID|0",
    "KERNEL|Linux",
    "TOOL|tailscale|/usr/bin/tailscale",
    "TSVERSION|1.104.2",
    "@@ prefs",
    JSON.stringify(opts.prefs ?? { RunSSH: false }),
    "@@ serve",
    JSON.stringify(opts.serve ?? {}),
    "@@ status",
    JSON.stringify({
      BackendState: "Running",
      Self: { KeyExpiry: "2027-01-01T00:00:00Z" },
    }),
    "@@ end",
    "TSSOCK|666|0|/run/tailscale/tailscaled.sock",
    ...(opts.lines ?? []),
    "END|1",
  ].join("\n");
  return analyze(parseProbe(text), target, { inContainer: false });
}

const OPTS: MitigationOptions = {
  removeLocalapiForwards: true,
  applyEgressRules: true,
  applyAuditRules: true,
  hardenHeadscale: true,
  headscaleMemoryMax: "2G",
  disableTailscaleSsh: false,
  disableAppConnector: false,
};

function makeContext(
  methodName: string,
  results: unknown[],
  modelType = "@swamp/cve/tailworm",
) {
  return {
    modelType,
    modelId: "id-1",
    methodName,
    definition: { name: "tw" },
    dataHandles: results.map((_, i) => ({
      specName: "status",
      name: `s${i}`,
      version: "1",
    })),
    dataRepository: {
      getContent: (_t: string, _m: string, name: string) =>
        Promise.resolve(
          new TextEncoder().encode(
            JSON.stringify(results[Number(name.slice(1))]),
          ),
        ),
    },
  };
}

Deno.test("report ignores other model types and empty data", async () => {
  const other = await report.execute(
    makeContext("scan", [status("a")], "@swamp/cve/dirtyfrag"),
  );
  assertEquals(other.markdown, "");
  const empty = await report.execute(makeContext("scan", []));
  assertEquals(empty.markdown, "");
});

Deno.test("scan report tabulates hosts and suggests mitigate for exposed ones", async () => {
  const exposed = status("10.0.0.1", {
    prefs: { RunSSH: true },
    serve: {
      TCP: { "8443": { TCPForward: "unix:/run/tailscale/tailscaled.sock" } },
    },
  });
  const clean = status("10.0.0.2");
  const out = await report.execute(makeContext("scanFleet", [exposed, clean]));
  assertStringIncludes(
    out.markdown,
    "**2** host(s) scanned: **1** exposed, **1** not exposed",
  );
  assertStringIncludes(
    out.markdown,
    "| 10.0.0.1 | 1.104.2 | yes | yes | no | — | none | CRITICAL |",
  );
  assertStringIncludes(
    out.markdown,
    "| 10.0.0.2 | 1.104.2 | no | no | no | — | none | LOW |",
  );
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw mitigate --input hosts=10.0.0.1\n",
  );
  assertStringIncludes(out.markdown, "No fixed Tailscale release");
  const json = out.json as { target: string; exposures: string[] }[];
  assertEquals(json[0].exposures.sort(), [
    "serve-localapi-forward",
    "ssh-forwarding",
  ]);
});

Deno.test("scan report lists forensic signatures and errors", async () => {
  const hit = status("h1", {
    prefs: { RunSSH: true },
    lines: ["ROOTSOCK|755|/tmp/relay.sock"],
  });
  const down = failedMitigation(
    { ...status("h2"), error: "Cannot execute commands on h2: timeout" },
    { ...OPTS, dryRun: true },
  );
  const out = await report.execute(makeContext("scanFleet", [hit, down]));
  assertStringIncludes(out.markdown, "## Forensic signatures");
  assertStringIncludes(out.markdown, "**h1** [high]");
  assertStringIncludes(
    out.markdown,
    "| h1 | 1.104.2 | yes | no | no | — | root-socket-0755 | HIGH |",
  );
  assertStringIncludes(out.markdown, "| h2 | — | — | — | — | — | — | ERROR |");
  assertStringIncludes(out.markdown, "## Errors");
});

Deno.test("local scans suggest mitigate without hosts", async () => {
  const out = await report.execute(
    makeContext("scan", [status("localhost", { prefs: { RunSSH: true } })]),
  );
  assertStringIncludes(out.markdown, "swamp behavior run tw mitigate\n");
});

function withMitigation(
  s: Status,
  m: Partial<NonNullable<Status["mitigation"]>>,
): Status {
  return {
    ...s,
    mitigation: {
      dryRun: true,
      options: OPTS,
      privilege: "root",
      missingPrivileges: [],
      outcome: "dry-run",
      steps: [],
      notes: [],
      ...m,
    },
  };
}

Deno.test("mitigate dry run repeats non-default options in the apply command", async () => {
  const s = withMitigation(status("10.0.0.1", { prefs: { RunSSH: true } }), {
    options: { ...OPTS, disableTailscaleSsh: true, headscaleMemoryMax: "1G" },
    steps: [{
      phase: "ssh",
      command: "/usr/bin/tailscale set --ssh=false",
      privileged: true,
      purpose: "",
      status: "planned",
      exitCode: null,
      output: "",
    }],
    notes: ["Policy is the main control."],
  });
  const out = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(out.markdown, "# Tailworm Mitigation: DRY RUN");
  assertStringIncludes(out.markdown, "/usr/bin/tailscale set --ssh=false\n");
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw mitigate --input hosts=10.0.0.1 --input dryRun=false --input headscaleMemoryMax=1G --input disableTailscaleSsh=true\n",
  );
});

Deno.test("applied mitigation suggests a verifying scan", async () => {
  const s = withMitigation(status("10.0.0.1"), {
    dryRun: false,
    outcome: "applied",
    steps: [{
      phase: "serve",
      command: "tailscale serve --tcp=8443 off",
      privileged: true,
      purpose: "",
      status: "ok",
      exitCode: 0,
      output: "",
    }],
  });
  const out = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(out.markdown, "# Tailworm Mitigation: APPLIED");
  assertStringIncludes(out.markdown, "[ok] tailscale serve --tcp=8443 off");
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw scanFleet --input hosts=10.0.0.1",
  );
  assertFalse(out.markdown.includes("To apply"));
});

Deno.test("needs-privilege points at the sudoers example", async () => {
  const s = withMitigation(status("10.0.0.1"), {
    outcome: "needs-privilege",
    privilege: "unavailable",
    missingPrivileges: ["LC_ALL=C sudo -n -- tailscale serve --tcp=1 off"],
  });
  const out = await report.execute(makeContext("mitigate", [s]));
  assertStringIncludes(out.markdown, "README's sudoers example");
  const json = out.json as { outcome: string }[];
  assert(json[0].outcome === "needs-privilege");
});

Deno.test("fleet recommendations leave out a clean host's no-action line", async () => {
  const exposed = status("10.0.0.1", { prefs: { RunSSH: true } });
  const clean = status("10.0.0.2");
  assert(
    clean.recommendations.includes(
      "No action required for the Tailworm findings.",
    ),
  );
  const out = await report.execute(makeContext("scanFleet", [exposed, clean]));
  assertFalse(out.markdown.includes("No action required"));
  const alone = await report.execute(makeContext("scanFleet", [clean]));
  assertStringIncludes(alone.markdown, "No action required");
});

Deno.test("applied mitigation on containers reached over SSH verifies with scanFleet", async () => {
  const applied: Partial<NonNullable<Status["mitigation"]>> = {
    dryRun: false,
    outcome: "applied",
    steps: [{
      phase: "ssh",
      command: "tailscale set --ssh=false",
      privileged: true,
      purpose: "",
      status: "ok",
      exitCode: 0,
      output: "",
    }],
  };
  const overSsh = withMitigation(
    { ...status("127.1"), inContainer: true, viaDocker: false },
    applied,
  );
  const out = await report.execute(makeContext("mitigate", [overSsh]));
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw scanFleet --input hosts=127.1",
  );

  const viaDocker = withMitigation(
    { ...status("docker-abc"), inContainer: true, viaDocker: true },
    applied,
  );
  const own = await report.execute(makeContext("mitigate", [viaDocker]));
  assertStringIncludes(own.markdown, "swamp behavior run tw scan\n");
});

Deno.test("the SSH column summarises the node's rules when they were read", async () => {
  const s = status("10.0.0.7", { prefs: { RunSSH: true } });
  const withRules = {
    ...s,
    tailscale: {
      ...s.tailscale,
      sshPolicy: {
        ...s.tailscale.sshPolicy,
        readable: true,
        acceptRules: 1,
        sources: 3,
        rootAllowed: true,
        localForwarding: true,
      },
    },
  };
  const out = await report.execute(makeContext("scan", [withRules]));
  assertStringIncludes(
    out.markdown,
    "| 10.0.0.7 | 1.104.2 | yes (3 src, root, fwd) |",
  );
  const unread = await report.execute(makeContext("scan", [s]));
  assertStringIncludes(unread.markdown, "| 10.0.0.7 | 1.104.2 | yes |");
});

Deno.test("mitigate commands for docker targets take no hosts input", async () => {
  const docker = {
    ...status("docker-abc123", { prefs: { RunSSH: true } }),
    inContainer: true,
    viaDocker: true,
  };
  const scanOut = await report.execute(makeContext("scan", [docker]));
  assertStringIncludes(scanOut.markdown, "swamp behavior run tw mitigate\n");
  assertFalse(scanOut.markdown.includes("hosts=docker-"));

  const dry = withMitigation(docker, {
    steps: [{
      phase: "serve",
      command: "tailscale serve --tcp=1 off",
      privileged: true,
      purpose: "",
      status: "planned",
      exitCode: null,
      output: "",
    }],
  });
  const mitOut = await report.execute(makeContext("mitigate", [dry]));
  assertStringIncludes(
    mitOut.markdown,
    "swamp behavior run tw mitigate --input dryRun=false\n",
  );
  assertFalse(mitOut.markdown.includes("hosts=docker-"));
});

Deno.test("verify after a mixed docker and SSH mitigate scans each the right way", async () => {
  const applied: Partial<NonNullable<Status["mitigation"]>> = {
    dryRun: false,
    outcome: "applied",
  };
  const docker = withMitigation(
    { ...status("docker-abc"), inContainer: true, viaDocker: true },
    applied,
  );
  const ssh = withMitigation(status("10.0.0.9"), applied);
  const out = await report.execute(makeContext("mitigate", [docker, ssh]));
  assertStringIncludes(out.markdown, "swamp behavior run tw scan\n");
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw scanFleet --input hosts=10.0.0.9\n",
  );
  assertFalse(out.markdown.includes("hosts=docker-"));
});

Deno.test("suggested commands keep each host's user@host", async () => {
  const exposed = {
    ...status("192.0.2.10", { prefs: { RunSSH: true } }),
    sshUser: "admin",
  };
  const plain = status("192.0.2.11", { prefs: { RunSSH: true } });
  const out = await report.execute(makeContext("scanFleet", [exposed, plain]));
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw mitigate --input hosts=admin@192.0.2.10,192.0.2.11\n",
  );
  const applied: Partial<NonNullable<Status["mitigation"]>> = {
    dryRun: false,
    outcome: "applied",
  };
  const after = await report.execute(
    makeContext("mitigate", [withMitigation(exposed, applied)]),
  );
  assertStringIncludes(
    after.markdown,
    "swamp behavior run tw scanFleet --input hosts=admin@192.0.2.10\n",
  );
  // Rows still show the bare host.
  assertStringIncludes(out.markdown, "| 192.0.2.10 | 1.104.2 |");
});

Deno.test("the localapi column counts web proxies, and older statuses without them", async () => {
  const proxied = status("10.0.0.3", {
    serve: {
      TCP: { "443": { HTTPS: true } },
      Web: {
        "node.example.ts.net:443": {
          Handlers: { "/": { Proxy: "unix:/run/tailscale/tailscaled.sock" } },
        },
      },
    },
  });
  // Written by 2026.10.24.1, before localapiProxies existed.
  const { localapiProxies: _, ...oldTs } = status("10.0.0.4").tailscale;
  const old = { ...status("10.0.0.4"), tailscale: oldTs };
  const out = await report.execute(makeContext("scanFleet", [proxied, old]));
  assertStringIncludes(
    out.markdown,
    "| 10.0.0.3 | 1.104.2 | no | yes | no | — | none | CRITICAL |",
  );
  assertStringIncludes(
    out.markdown,
    "| 10.0.0.4 | 1.104.2 | no | no | no | — | none | LOW |",
  );
});

Deno.test("hosts graded from probe output get no mitigate command (swamp-club #3908)", async () => {
  const serve = {
    TCP: { "8443": { TCPForward: "unix:/run/tailscale/tailscaled.sock" } },
  };
  const vm = { ...status("ci-vm-1", { serve }), externalProbe: true };
  const ssh = status("10.0.0.1", { serve });
  const out = await report.execute(makeContext("grade", [vm, ssh]));
  assertStringIncludes(
    out.markdown,
    "swamp behavior run tw mitigate --input hosts=10.0.0.1\n",
  );
  assertFalse(out.markdown.includes("ci-vm-1,"));
  assertFalse(out.markdown.includes("hosts=ci-vm-1"));
  assertStringIncludes(
    out.markdown,
    "ci-vm-1 was graded from probe output, so mitigate cannot reach it.",
  );

  // Only externally probed hosts: no mitigate line at all.
  const only = await report.execute(makeContext("grade", [vm]));
  assertFalse(only.markdown.includes("swamp behavior run"));
  assertFalse(only.markdown.includes("Run mitigate as a dry run"));
  assertStringIncludes(only.markdown, "run the probe again and grade");
});

Deno.test("the localapi column says unverified when a target was not checked (#3910)", async () => {
  const s = status("10.0.0.1", {
    serve: { TCP: { "9000": { TCPForward: "unix:/srv/api.sock" } } },
  });
  assertEquals(s.tailscale.unresolvedTargets, ["/srv/api.sock"]);
  const out = await report.execute(makeContext("scan", [s]));
  assertStringIncludes(
    out.markdown,
    "| 10.0.0.1 | 1.104.2 | no | unverified |",
  );
  // A status from before the field existed reads as before.
  const { unresolvedTargets: _, ...tailscale } = s.tailscale;
  const old = await report.execute(
    makeContext("scan", [{ ...s, tailscale }]),
  );
  assertStringIncludes(old.markdown, "| 10.0.0.1 | 1.104.2 | no | no |");
});

Deno.test("a gradeFleet run renders one fleet report with no mitigate command (swamp-club #3912)", async () => {
  const serve = {
    TCP: { "8443": { TCPForward: "unix:/run/tailscale/tailscaled.sock" } },
  };
  const vms = [
    { ...status("ci-vm-1", { serve }), externalProbe: true },
    { ...status("ci-vm-2"), externalProbe: true },
  ];
  const out = await report.execute(makeContext("gradeFleet", vms));
  assertStringIncludes(
    out.markdown,
    "**2** host(s) scanned: **1** exposed, **1** not exposed",
  );
  assertStringIncludes(out.markdown, "| ci-vm-1 |");
  assertStringIncludes(out.markdown, "| ci-vm-2 |");
  assertFalse(out.markdown.includes("swamp behavior run"));
  assertStringIncludes(out.markdown, "run the probe again and grade");
});

/** A status with the inbound rules a scan with includeReachability stores. */
function reachable(
  target: string,
  ips: string[],
  rules: Reach["rules"],
  opts: { prefs?: unknown; serve?: unknown; sshSources?: string[] } = {},
): Status {
  const s = status(target, opts);
  s.tailscale.reachability = {
    readable: true,
    selfIps: ips,
    rules,
    anyTailnet: false,
    sshSources: opts.sshSources ?? [],
  };
  return s;
}

type Reach = NonNullable<Status["tailscale"]["reachability"]>;

const ALL = [{ first: 0, last: 65535 }];
const TCP_UDP = [1, 6, 17, 58];
const LAPTOP = ["100.64.0.1/32", "fd7a:115c:a1e0::1/128"];
const CLOUD = ["100.64.0.3/32", "fd7a:115c:a1e0::3/128"];

Deno.test("scan report has no reachability section unless a scan asked", async () => {
  const out = await report.execute(makeContext("scan", [status("a")]));
  assertFalse(out.markdown.includes("## Reachability"));
  assertFalse("reachability" in (out.json as Record<string, unknown>[])[0]);
});

Deno.test("reachability: per-host tree and a matrix between scanned hosts", async () => {
  const laptop = reachable("laptop", ["100.64.0.1", "fd7a:115c:a1e0::1"], [
    { sources: LAPTOP, ports: ALL, protocols: TCP_UDP },
  ]);
  const nas = reachable(
    "nas",
    ["100.64.0.2", "fd7a:115c:a1e0::2"],
    [
      { sources: LAPTOP, ports: ALL, protocols: TCP_UDP },
      {
        sources: [
          ...CLOUD,
          "100.64.0.9/32",
          "100.64.0.10/32",
          "100.64.0.11/32",
          "100.64.0.12/32",
        ],
        ports: [{ first: 8096, last: 8096 }, { first: 8443, last: 8443 }],
        protocols: TCP_UDP,
      },
      { sources: ["100.64.0.20/32"], ports: ALL, protocols: [1] },
    ],
    {
      prefs: { RunSSH: true },
      serve: {
        TCP: { "8443": { TCPForward: "unix:/run/tailscale/tailscaled.sock" } },
      },
      sshSources: ["100.64.0.1", "fd7a:115c:a1e0::1", "user:admin@"],
    },
  );
  const cloud = reachable("cloud", ["100.64.0.3", "fd7a:115c:a1e0::3"], [
    { sources: LAPTOP, ports: ALL, protocols: TCP_UDP },
  ]);
  const out = await report.execute(
    makeContext("scanFleet", [laptop, nas, cloud]),
  );
  const md = out.markdown;
  assertStringIncludes(md, "## Reachability");
  assertStringIncludes(md, "not a live test");
  assertStringIncludes(md, "| From \\ To | laptop | nas | cloud |");
  assertStringIncludes(
    md,
    "| laptop | — | ✅ all ports (incl. 22 Tailscale SSH, 8443 localapi) | ✅ all ports |",
  );
  assertStringIncludes(md, "| nas | 🚫 | — | 🚫 |");
  assertStringIncludes(md, "| cloud | 🚫 | ✅ 8096, 8443 (localapi) | — |");
  // The matrix covers laptop and cloud: nas lists only the rest.
  assertStringIncludes(md, "Sources outside the scanned hosts");
  assertStringIncludes(md, "→ nas\n├ 100.64.0.9/32");
  // laptop and cloud add nothing to the matrix: no list, no "itself" row.
  assertFalse(md.includes("→ laptop"));
  assertFalse(md.includes("→ cloud"));
  assertFalse(md.includes("itself"));
  assertStringIncludes(
    md,
    "├ 100.64.0.9/32, 100.64.0.10/32, 100.64.0.11/32, +1 more  8096, 8443 (localapi)",
  );
  assertStringIncludes(md, "└ 100.64.0.20/32");
  assertStringIncludes(md, "icmp\n");
  assertStringIncludes(md, "Tailscale SSH policy, who may log in:");
  assertStringIncludes(md, "- nas ← laptop, user:admin@");
  const json = out.json as { target: string; reachability?: Reach }[];
  assertEquals(json[1].reachability?.rules.length, 3);
});

Deno.test("reachability: allow-all, no rules, and an unreadable netmap", async () => {
  const open = reachable("open", ["100.64.0.5"], [
    { sources: ["0.0.0.0/0", "::/0"], ports: ALL, protocols: [] },
  ]);
  const closed = reachable("closed", ["100.64.0.6"], []);
  const blind = status("blind");
  blind.tailscale.reachability = {
    readable: false,
    selfIps: [],
    rules: [],
    anyTailnet: false,
    sshSources: [],
  };
  const md = (await report.execute(
    makeContext("scanFleet", [open, closed, blind]),
  )).markdown;
  // The whole tailnet is more than the matrix shows: still listed.
  assertStringIncludes(md, "→ open\n└ any tailnet device  all ports");
  // No rules: the matrix column says it all.
  assertFalse(md.includes("→ closed"));
  assertStringIncludes(
    md,
    "**blind**: inbound rules unknown: the netmap was not readable (needs root or the operator user), or tailscale status gave no addresses for the node.",
  );
  // The unreadable host is left out of the matrix.
  assertStringIncludes(md, "| From \\ To | open | closed |");
  assertStringIncludes(md, "| closed | ✅ all ports | — |");
});

Deno.test("reachability: one host keeps its full inbound list", async () => {
  const nas = reachable(
    "nas",
    ["100.64.0.2", "fd7a:115c:a1e0::2"],
    [
      { sources: ["100.64.0.2/32"], ports: ALL, protocols: TCP_UDP },
      { sources: LAPTOP, ports: [{ first: 22, last: 22 }], protocols: TCP_UDP },
    ],
    { prefs: { RunSSH: true }, sshSources: ["*"] },
  );
  const md = (await report.execute(makeContext("scan", [nas]))).markdown;
  assertFalse(md.includes("From \\ To"));
  assertFalse(md.includes("Sources outside"));
  assertStringIncludes(md, "→ nas (100.64.0.2, fd7a:115c:a1e0::2)");
  assertStringIncludes(md, "├ itself");
  assertStringIncludes(
    md,
    "└ 100.64.0.1  22 (Tailscale SSH)",
  );
  assertStringIncludes(md, "- nas ← any");
  const closed = reachable("closed", ["100.64.0.6"], []);
  assertStringIncludes(
    (await report.execute(makeContext("scan", [closed]))).markdown,
    "└ no inbound rules: nothing can reach it",
  );
});

Deno.test("reachability: capability sources show as ❔, never as closed (#3923)", async () => {
  const laptop = reachable("laptop", ["100.64.0.1"], []);
  const nas = reachable("nas", ["100.64.0.2"], [
    {
      sources: ["cap:example.com/cap/ops"],
      ports: [{ first: 443, last: 443 }],
      protocols: [6],
    },
  ]);
  const md = (await report.execute(makeContext("scanFleet", [laptop, nas])))
    .markdown;
  assertStringIncludes(
    md,
    "| laptop | — | ❔ 443 with cap:example.com/cap/ops |",
  );
  assertStringIncludes(md, "→ nas\n└ cap:example.com/cap/ops  443");
});

Deno.test("reachability: a Service's localapi forward is not marked on the node (#3923)", async () => {
  const s = reachable(
    "nas",
    ["100.64.0.2"],
    [{
      sources: ["100.64.0.9/32"],
      ports: [{ first: 8443, last: 8443 }, { first: 9443, last: 9443 }],
      protocols: [6],
    }],
  );
  s.tailscale.tcpForwards = [
    { port: 8443, localapi: true, service: null },
    { port: 9443, localapi: true, service: "svc:api" },
  ] as typeof s.tailscale.tcpForwards;
  const md = (await report.execute(makeContext("scan", [s]))).markdown;
  assertStringIncludes(md, "8443 (localapi), 9443\n");
});

Deno.test("reachability: unknown hosts say why (#3923)", async () => {
  const unknown = (target: string, reason: Reach["reason"]) => {
    const s = status(target);
    s.tailscale.reachability = {
      readable: false,
      reason,
      selfIps: [],
      rules: [],
      anyTailnet: false,
      sshSources: [],
    };
    return s;
  };
  const md = (await report.execute(
    makeContext("scanFleet", [
      unknown("a", "no-access"),
      unknown("b", "read-failed"),
      unknown("c", "unrecognised"),
      unknown("d", "no-addresses"),
    ]),
  )).markdown;
  assertStringIncludes(
    md,
    "**a**: inbound rules unknown: the netmap was not readable",
  );
  assertStringIncludes(
    md,
    "**b**: inbound rules unknown: reading the packet filter failed",
  );
  assertStringIncludes(
    md,
    "**c**: inbound rules unknown: the netmap had no packet filter",
  );
  assertStringIncludes(
    md,
    "**d**: inbound rules unknown: tailscale status gave no",
  );
});

Deno.test("reachability: large fleets get lists, not a matrix (#3923)", async () => {
  const fleet = Array.from(
    { length: 9 },
    (_, i) =>
      reachable(`h${i}`, [`100.64.1.${i}`], [
        { sources: ["100.64.1.0/32"], ports: ALL, protocols: TCP_UDP },
      ]),
  );
  const md = (await report.execute(makeContext("scanFleet", fleet))).markdown;
  assertFalse(md.includes("From \\ To"));
  assertStringIncludes(md, "9 hosts are too many for a matrix");
  // Lists name scanned sources when there is no matrix to show them.
  assertStringIncludes(md, "→ h5 (100.64.1.5)\n└ h0  all ports");
});

Deno.test("reachability: a pipe in a host name does not break the matrix (#3923)", async () => {
  const a = reachable("a|b", ["100.64.0.1"], []);
  const c = reachable("c", ["100.64.0.3"], [
    { sources: ["100.64.0.1/32"], ports: ALL, protocols: TCP_UDP },
  ]);
  const md = (await report.execute(makeContext("scanFleet", [a, c])))
    .markdown;
  assertStringIncludes(md, "| From \\ To | a\\|b | c |");
  assertStringIncludes(md, "| a\\|b | — | ✅ all ports |");
});

Deno.test("reachability: unscanned devices are shown once (#3923)", async () => {
  const a = reachable("a", ["100.64.0.1"], []);
  const b = reachable("b", ["100.64.0.2"], [{
    sources: [
      "100.64.0.7/32",
      "100.64.0.8/32",
      "fd7a:115c:a1e0::7/128",
      "fd7a:115c:a1e0::8/128",
    ],
    ports: [{ first: 22, last: 22 }],
    protocols: [6],
  }]);
  const md = (await report.execute(makeContext("scanFleet", [a, b])))
    .markdown;
  assertStringIncludes(md, "└ 100.64.0.7, 100.64.0.8  22\n");
});

Deno.test("reachability: an unscanned SSH principal is shown once (#3923)", async () => {
  const nas = reachable("nas", ["100.64.0.2"], [], {
    prefs: { RunSSH: true },
    sshSources: ["100.64.0.1", "fd7a:115c:a1e0::1", "user:admin@"],
  });
  const md = (await report.execute(makeContext("scan", [nas]))).markdown;
  assertStringIncludes(md, "- nas ← 100.64.0.1, user:admin@");
});
