import {
  assert,
  assertEquals,
  assertFalse,
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import {
  allowedSteps,
  analyze,
  AUDIT_FILE,
  auditRules,
  compareVersions,
  failedMitigation,
  HEADSCALE_DROP_IN,
  hostList,
  isPublicListen,
  listenerPath,
  listenHost,
  mitigateTarget,
  type MitigationOptions,
  model,
  NFT_CGROUP_FILE,
  NFT_FILE,
  nftCgroupRules,
  nftTableRules,
  ownServiceUnit,
  parseProbe,
  parseSshPolicy,
  parseVersion,
  planMitigation,
  preflightScript,
  PROBE_SCRIPT,
  renderStep,
  resolveScript,
  type RunResult,
  scanTarget,
  serveForwards,
  serveUnixProxies,
  shQuote,
  summarizeSshPolicy,
} from "./tailworm.ts";

// --- Fixtures ----------------------------------------------------------------

/** Probe output for a Linux host, built from tagged lines and JSON sections. */
function probe(opts: {
  lines?: string[];
  prefs?: unknown;
  serve?: unknown;
  status?: unknown;
  end?: boolean;
}): string {
  const out = [
    "HOSTNAME|ts-01",
    "UID|0",
    "KERNEL|Linux",
    "ARCH|x86_64",
    "TOOL|sudo|/usr/bin/sudo",
    "TOOL|tailscale|/usr/bin/tailscale",
    "TOOL|tailscaled|/usr/sbin/tailscaled",
    "TOOL|nft|/usr/sbin/nft",
    "TOOL|auditctl|/usr/sbin/auditctl",
    "TOOL|augenrules|/usr/sbin/augenrules",
    "TOOL|systemctl|/usr/bin/systemctl",
    "TOOL|tee|/usr/bin/tee",
    "TOOL|mkdir|/usr/bin/mkdir",
    "TSVERSION|1.104.2",
    "@@ prefs",
    JSON.stringify(opts.prefs ?? { ControlURL: "", RunSSH: false }, null, 2),
    "",
    "@@ serve",
    // The real CLI prints no trailing newline; the probe adds one.
    JSON.stringify(opts.serve ?? {}),
    "",
    "@@ status",
    JSON.stringify(
      opts.status ??
        {
          BackendState: "Running",
          Self: { KeyExpiry: "2027-04-01T00:00:00Z", CapMap: {} },
        },
    ),
    "",
    "@@ end",
    "TSROOTPID|812",
    "TSDPID|812",
    "CGROUP|/system.slice/tailscaled.service",
    "TSDEXE|/usr/sbin/tailscaled",
    "TUNIF|tailscale0",
    "TSSOCK|666|0|/run/tailscale/tailscaled.sock",
    "SSCHECKED|1",
    'TSLISTEN|u_str LISTEN 0 4096 /run/tailscale/tailscaled.sock 22831 * 0 users:(("tailscaled",pid=812,fd=9))',
    "HSUNIT|LoadState=not-found",
    "HSUNIT|ActiveState=inactive",
    "NFT|0",
    "AUDIT|0",
    ...(opts.lines ?? []),
  ];
  if (opts.end !== false) out.push("END|1");
  return out.join("\n");
}

/** With NFT|n: the egress rule is loaded and reloads after every start. */
const EGRESS_DONE =
  "NFTDROPIN|/etc/systemd/system/tailscaled.service.d/50-tailworm.conf";

const DEFAULT_OPTS: MitigationOptions = {
  removeLocalapiForwards: true,
  applyEgressRules: true,
  applyAuditRules: true,
  hardenHeadscale: true,
  headscaleMemoryMax: "2G",
  disableTailscaleSsh: false,
  disableAppConnector: false,
};

function scan(text: string, opts: { fixedVersion?: string } = {}) {
  const facts = parseProbe(text);
  return {
    facts,
    status: analyze(facts, "10.0.0.5", { inContainer: false, ...opts }),
  };
}

function ids(s: { exposures: { id: string }[] }): string[] {
  return s.exposures.map((e) => e.id);
}

const LOCALAPI_SERVE = {
  TCP: {
    "8443": { TCPForward: "unix:/run/tailscale/tailscaled.sock" },
    "5432": { TCPForward: "127.0.0.1:5432" },
  },
};

// --- Model shape -------------------------------------------------------------

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/cve/tailworm");
  assertEquals(typeof model.version, "string");
  assertEquals(
    new Set(Object.keys(model.methods)),
    new Set(["scan", "scanFleet", "mitigate"]),
  );
  assertEquals(Object.keys(model.resources), ["status"]);
  assertEquals(model.reports, ["@swamp/cve/tailworm-report"]);
});

Deno.test("globalArguments accepts defaults and a fixed version", () => {
  const d = model.globalArguments.parse({});
  assertEquals(d.targetHost, "localhost");
  assertEquals(d.sshUser, "root");
  assertEquals(d.fixedVersion, undefined);
  assertEquals(
    model.globalArguments.parse({ fixedVersion: "1.104.4" }).fixedVersion,
    "1.104.4",
  );
  assertFalse(
    model.globalArguments.safeParse({ fixedVersion: "latest" }).success,
  );
});

Deno.test("mitigate defaults to a dry run that changes no access", () => {
  const args = model.methods.mitigate.arguments.parse({});
  assertEquals(args.dryRun, true);
  assertEquals(args.disableTailscaleSsh, false);
  assertEquals(args.disableAppConnector, false);
  assertEquals(args.headscaleMemoryMax, "2G");
  assertFalse(
    model.methods.mitigate.arguments.safeParse({ headscaleMemoryMax: "0" })
      .success,
  );
});

Deno.test("status from analyze validates against the resource schema", () => {
  const { status } = scan(probe({
    prefs: { RunSSH: true, AppConnector: { Advertise: true } },
    serve: LOCALAPI_SERVE,
  }));
  model.resources.status.schema.parse(status);
  model.resources.status.schema.parse(
    failedMitigation(status, { ...DEFAULT_OPTS, dryRun: true }),
  );
});

// --- Helpers -----------------------------------------------------------------

Deno.test("parseVersion and compareVersions handle Tailscale and headscale forms", () => {
  assertEquals(parseVersion("1.104.2-te26db7a57"), [1, 104, 2]);
  assertEquals(parseVersion("v0.29.5"), [0, 29, 5]);
  assertEquals(parseVersion("unknown"), null);
  assert(compareVersions("1.98.10", "1.98.9") > 0);
  assert(compareVersions("1.102.4", "1.104.2") < 0);
  assertEquals(compareVersions("1.104.2", "1.104.2"), 0);
});

Deno.test("listenerPath takes the socket path from ss -xlp output", () => {
  assertEquals(
    listenerPath(
      'u_str LISTEN 0 4096 /tmp/relay.sock 4471 * 0 users:(("tailscaled",pid=1,fd=30))',
    ),
    "/tmp/relay.sock",
  );
  assertEquals(listenerPath("u_str LISTEN 0 1 @abstract 1 * 0"), "@abstract");
  assertEquals(listenerPath("garbage"), null);
});

Deno.test("shQuote leaves plain words and quotes the rest", () => {
  assertEquals(shQuote("--tcp=8443"), "--tcp=8443");
  assertEquals(shQuote("a b"), "'a b'");
  assertEquals(shQuote("it's"), `'it'\\''s'`);
});

Deno.test("hostList dedupes and merges local aliases", () => {
  assertEquals(
    hostList(" a, b,a,,localhost,127.0.0.1", "root").map((e) => e.host),
    ["a", "b", "localhost"],
  );
});

Deno.test("PROBE_SCRIPT reads only the TS_ variables the findings concern", () => {
  assertStringIncludes(PROBE_SCRIPT, "TS_SERVE_ALLOW_ALL_INTERFACES");
  // No auth key or other daemon environment leaves the host.
  assertFalse(PROBE_SCRIPT.includes("TS_AUTHKEY"));
  assertStringIncludes(PROBE_SCRIPT, 'grep -E "^$names="');
  assertStringIncludes(PROBE_SCRIPT, 'echo; echo "@@ end"');
});

// --- Parsing -----------------------------------------------------------------

Deno.test("parseProbe reads tags and JSON sections", () => {
  const facts = parseProbe(probe({
    prefs: { RunSSH: true },
    serve: LOCALAPI_SERVE,
    lines: [
      "TSENV|systemd|TS_SERVE_ALLOW_ALL_INTERFACES=1",
      "TSENV|file|TS_SERVE_ALLOW_ALL_INTERFACES=0",
      "ROOTSOCK|755|/tmp/x|y.sock",
      "TSSOCK|666|0|/run/tailscale/tailscaled.sock",
    ],
  }));
  assert(facts.complete);
  assertEquals(facts.uid, 0);
  assertEquals(facts.tsVersion, "1.104.2");
  assertEquals(facts.prefs?.RunSSH, true);
  assertEquals(
    serveForwards(facts.serve).map((f) => f.port).sort(),
    [5432, 8443],
  );
  assertEquals(facts.status?.BackendState, "Running");
  assertEquals(facts.cgroup, "/system.slice/tailscaled.service");
  // The unit's value is kept over the defaults file.
  assertEquals(facts.env.TS_SERVE_ALLOW_ALL_INTERFACES, "1");
  assertEquals(facts.rootSockets, [{ mode: "755", path: "/tmp/x|y.sock" }]);
  // Duplicate socket lines collapse.
  assertEquals(facts.tsSockets.length, 1);
  assertEquals(facts.tsListeners, ["/run/tailscale/tailscaled.sock"]);
  assertEquals(facts.hsUnit.LoadState, "not-found");
});

Deno.test("parseProbe: the process environment wins over the unit", () => {
  const facts = parseProbe(probe({
    lines: [
      "TSENV|systemd|TS_SERVE_ALLOW_ALL_INTERFACES=1",
      "TSENV|process|TS_SERVE_ALLOW_ALL_INTERFACES=0",
    ],
  }));
  assertEquals(facts.env.TS_SERVE_ALLOW_ALL_INTERFACES, "0");
});

Deno.test("parseProbe marks a probe without END incomplete", () => {
  assertFalse(parseProbe(probe({ end: false })).complete);
});

Deno.test("parseProbe tolerates a daemon that answered nothing", () => {
  const facts = parseProbe(
    "HOSTNAME|h\nUID|1000\nKERNEL|Linux\nTSVERSION|1.104.2\n@@ prefs\n\n@@ serve\n\n@@ status\n\n@@ end\nEND|1",
  );
  assertEquals(facts.prefs, null);
  assertEquals(facts.serve, null);
  assert(facts.complete);
});

Deno.test("serveForwards and serveUnixProxies cover services and foreground", () => {
  const serve = {
    TCP: { "1": { TCPForward: "unix:/a.sock" } },
    Services: {
      "svc:db": { TCP: { "2": { TCPForward: "unix:/b.sock" } } },
      "svc:web": {
        Web: {
          "web.ts.net:443": {
            Handlers: { "/": { Proxy: "unix:/run/docker.sock" } },
          },
        },
      },
    },
    Foreground: {
      "abc": { TCP: { "3": { TCPForward: "unix:/c.sock" } } },
    },
    Web: {
      "n.ts.net:443": {
        Handlers: {
          "/": { Proxy: "http://127.0.0.1:3000" },
          "/x": { Proxy: "unix:/x.sock" },
        },
      },
    },
  };
  assertEquals(serveForwards(serve), [
    { port: 1, target: "unix:/a.sock", service: null, foreground: false },
    { port: 2, target: "unix:/b.sock", service: "svc:db", foreground: false },
    { port: 3, target: "unix:/c.sock", service: null, foreground: true },
  ]);
  assertEquals(
    serveUnixProxies(serve).sort(),
    ["unix:/run/docker.sock", "unix:/x.sock"],
  );
  assertEquals(serveForwards(null), []);
});

// --- Analysis ----------------------------------------------------------------

Deno.test("no Tailscale or headscale is risk none", () => {
  const facts = parseProbe("HOSTNAME|db\nUID|0\nKERNEL|Linux\nEND|1");
  const s = analyze(facts, "db", { inContainer: false });
  assertEquals(s.riskLevel, "none");
  assertFalse(s.vulnerable);
  assertFalse(s.tailscale.installed);
});

Deno.test("Tailscale with no affected feature is low risk", () => {
  const { status } = scan(probe({}));
  assertEquals(status.riskLevel, "low");
  assertFalse(status.vulnerable);
  assertEquals(ids(status), []);
  assertStringIncludes(status.recommendations.join(" "), "No action required");
});

Deno.test("SSH on the SaaS control plane is high, on headscale critical", () => {
  const saas = scan(probe({
    prefs: { RunSSH: true, ControlURL: "https://controlplane.tailscale.com" },
  })).status;
  assertEquals(saas.riskLevel, "high");
  assertEquals(ids(saas), ["ssh-forwarding"]);
  assertFalse(saas.tailscale.selfHostedControl);

  const hs = scan(probe({
    prefs: { RunSSH: true, ControlURL: "https://hs.example.com" },
  })).status;
  assertEquals(hs.riskLevel, "critical");
  assert(hs.tailscale.selfHostedControl);
  assertStringIncludes(hs.exposures[0].detail, "root-equivalent");
});

Deno.test("a serve forward to tailscaled.sock is critical", () => {
  const { status } = scan(probe({ serve: LOCALAPI_SERVE }));
  assertEquals(status.riskLevel, "critical");
  assertEquals(ids(status), ["serve-localapi-forward"]);
  const f = status.tailscale.tcpForwards.find((f) => f.port === 8443)!;
  assert(f.localapi);
  assertFalse(
    status.tailscale.tcpForwards.find((f) => f.port === 5432)!.localapi,
  );
});

Deno.test("a serve forward through a symlink to tailscaled.sock is caught once resolved", () => {
  const facts = parseProbe(probe({
    serve: { TCP: { "9000": { TCPForward: "unix:/srv/api.sock" } } },
  }));
  assertEquals(
    ids(analyze(facts, "h", { inContainer: false })),
    ["serve-unix-forward"],
  );
  facts.resolved["/srv/api.sock"] = "/run/tailscale/tailscaled.sock";
  const s = analyze(facts, "h", { inContainer: false });
  assertEquals(ids(s), ["serve-localapi-forward"]);
  assertEquals(
    s.tailscale.tcpForwards[0].resolved,
    "/run/tailscale/tailscaled.sock",
  );
});

Deno.test("app connector, funnel, all-interfaces and key expiry are reported", () => {
  const { status } = scan(probe({
    prefs: { AppConnector: { Advertise: true } },
    serve: { AllowFunnel: { "n.ts.net:443": true } },
    status: { BackendState: "Running", Self: { CapMap: {} } },
    lines: ["TSENV|systemd|TS_SERVE_ALLOW_ALL_INTERFACES=true"],
  }));
  assertEquals(ids(status).sort(), [
    "app-connector",
    "funnel",
    "key-expiry-disabled",
    "serve-all-interfaces",
  ]);
  assertEquals(status.riskLevel, "high");
  assert(status.tailscale.keyExpiryDisabled);
});

Deno.test("a conn25 capability alone is medium", () => {
  const { status } = scan(probe({
    status: {
      BackendState: "Running",
      Self: {
        KeyExpiry: "2027-01-01T00:00:00Z",
        CapMap: { "tailscale.com/cap/conn25/billing": null },
      },
    },
  }));
  assert(status.tailscale.conn25);
  assertEquals(status.exposures[0].severity, "medium");
});

Deno.test("old builds list the published bulletins they miss", () => {
  const old = scan(
    probe({ lines: [] }).replace(
      "TSVERSION|1.104.2",
      "TSVERSION|1.98.8",
    ),
  ).status;
  assertEquals(old.riskLevel, "critical");
  assertEquals(old.tailscale.missingBulletins[0], "TS-2026-004");
  assert(old.tailscale.missingBulletins.includes("TS-2026-013"));

  const recent =
    scan(probe({}).replace("TSVERSION|1.104.2", "TSVERSION|1.102.4"))
      .status;
  assertEquals(recent.tailscale.missingBulletins, ["TS-2026-013"]);
});

Deno.test("fixedVersion clears the code findings but not configuration", () => {
  const text = probe({
    prefs: { RunSSH: true },
    serve: LOCALAPI_SERVE,
    lines: ["TSENV|systemd|TS_SERVE_ALLOW_ALL_INTERFACES=1"],
  }).replace("TSVERSION|1.104.2", "TSVERSION|1.104.4");
  const before = scan(text).status;
  assert(ids(before).includes("ssh-forwarding"));
  const after = scan(text, { fixedVersion: "1.104.4" }).status;
  assert(after.tailscale.patched);
  assertEquals(ids(after), ["serve-all-interfaces"]);
  assertEquals(after.advisory.fixedVersion, "1.104.4");
});

Deno.test("headscale exposure depends on listen address and limits", () => {
  const unit = [
    "HSVERSION|v0.29.5",
    "HSUNIT|LoadState=loaded",
    "HSUNIT|MemoryMax=infinity",
    "HSUNIT|Restart=no",
  ];
  const pub = scan(
    probe({ lines: [...unit, "HSLISTEN|0.0.0.0:8080 # all"] }).replace(
      "HSUNIT|LoadState=not-found\n",
      "",
    ),
  ).status;
  assertEquals(pub.headscale.listenAddr, "0.0.0.0:8080");
  assert(pub.headscale.publicListen);
  assertEquals(
    pub.exposures.find((e) => e.id === "headscale-dos")!.severity,
    "high",
  );

  const local = scan(
    probe({ lines: [...unit, "HSLISTEN|127.0.0.1:8080"] }).replace(
      "HSUNIT|LoadState=not-found\n",
      "",
    ),
  ).status;
  assertEquals(
    local.exposures.find((e) => e.id === "headscale-dos")!.severity,
    "medium",
  );
});

Deno.test("indicators: socket mode, privileged listeners and 0755 sockets", () => {
  const { status } = scan(probe({
    prefs: { RunSSH: true },
    lines: [
      "TSSOCK|600|0|/var/lib/x/tailscaled.sock",
      'TSLISTEN|u_str LISTEN 0 1 /run/docker.sock 9 * 0 users:(("tailscaled",pid=812,fd=31))',
      'TSLISTEN|u_str LISTEN 0 1 /tmp/relay.sock 10 * 0 users:(("tailscaled",pid=812,fd=32))',
      "ROOTSOCK|755|/tmp/relay.sock",
      "ROOTSOCK|777|/tmp/.X11-unix/X0",
    ],
  }));
  const byId = status.indicators.details.map((i) => `${i.id}:${i.severity}`);
  assertEquals(byId, [
    "tailscaled-socket-mode:critical",
    "tailscaled-unix-listener:critical",
    "tailscaled-unix-listener:medium",
    "root-socket-0755:high",
  ]);
  assertEquals(status.riskLevel, "critical");
  assertStringIncludes(status.summary, "POSSIBLE COMPROMISE");
  assertStringIncludes(status.recommendations[0], "delete the device");
});

Deno.test("indicators are not checked on macOS", () => {
  const { status } = scan(
    probe({ lines: ["ROOTSOCK|755|/tmp/a.sock"] }).replace(
      "KERNEL|Linux",
      "KERNEL|Darwin",
    ),
  );
  assertFalse(status.indicators.socketsChecked);
  assertEquals(status.indicators.details, []);
});

Deno.test("defenses are unknown without root and read with it", () => {
  const root = scan(probe({
    lines: [
      "NFT|2",
      "AUDIT|3",
      "NFTDROPIN|/etc/systemd/system/tailscaled.service.d/50-tailworm.conf",
    ],
  })).status;
  // The later lines win, as the probe prints each once.
  assertEquals(root.defenses, { egressRule: true, auditRules: true });
  const user = scan(probe({}).replace("UID|0", "UID|1000")).status;
  assertEquals(user.defenses, { egressRule: null, auditRules: null });
});

// --- Mitigation planning -----------------------------------------------------

Deno.test("nftTableRules replace the table and drop forwarded metadata traffic", () => {
  const rules = nftTableRules(["tailscale0"]);
  assertStringIncludes(
    rules,
    'iifname { "tailscale0" } ip daddr 169.254.0.0/16 drop',
  );
  // Reloading replaces the table rather than adding to it.
  assertStringIncludes(
    rules,
    "table inet tailworm {}\ndelete table inet tailworm\n",
  );
  assertFalse(nftTableRules([]).includes("chain forward"));
});

Deno.test("nftCgroupRules add the tailscaled cgroup chain to the table", () => {
  const rules = nftCgroupRules("/system.slice/tailscaled.service")!;
  assertStringIncludes(
    rules,
    'add rule inet tailworm output socket cgroupv2 level 2 "system.slice/tailscaled.service" ip daddr 169.254.0.0/16 tcp dport != 53 reject with tcp reset',
  );
  assertStringIncludes(rules, "add chain inet tailworm output {");
  assertEquals(nftCgroupRules("/"), null);
});

Deno.test("auditRules use only *at syscalls off x86_64", () => {
  const x86 = auditRules("/usr/sbin/tailscaled", "x86_64")!;
  assertStringIncludes(
    x86,
    "-S unlink,unlinkat,rename,renameat,chmod,fchmodat,bind",
  );
  assertStringIncludes(x86, "-F exe=/usr/sbin/tailscaled -k tailworm");
  const arm = auditRules("/usr/sbin/tailscaled", "aarch64")!;
  assertStringIncludes(arm, "-S unlinkat,renameat,fchmodat,bind ");
  assertFalse(arm.includes("unlink,"));
});

Deno.test("planMitigation for an exposed host", () => {
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true },
    serve: {
      ...LOCALAPI_SERVE,
      Services: {
        "svc:admin": {
          TCP: {
            "9443": { TCPForward: "unix:/run/tailscale/tailscaled.sock" },
          },
        },
      },
    },
  }));
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps.map((s) => s.argv.join(" ")), [
    "tailscale serve --tcp=8443 off",
    "tailscale serve --service=svc:admin --tcp=9443 off",
    `tee ${NFT_FILE}`,
    `nft -f ${NFT_FILE}`,
    `tee ${NFT_CGROUP_FILE}`,
    "mkdir -p /etc/systemd/system/tailscaled.service.d",
    "tee /etc/systemd/system/tailscaled.service.d/50-tailworm.conf",
    "systemctl daemon-reload",
    // Loaded last, so a kernel that refuses it still keeps the drop-in.
    `nft -f ${NFT_CGROUP_FILE}`,
    `tee ${AUDIT_FILE}`,
    "augenrules --load",
  ]);
  assertStringIncludes(steps[2].content!, "chain forward");
  assertStringIncludes(steps[4].content!, "tailscaled.service");
  assertStringIncludes(
    steps[6].content!,
    `ExecStartPost=-/usr/sbin/nft -f ${NFT_CGROUP_FILE}`,
  );
  assertStringIncludes(steps[9].content!, "exe=/usr/sbin/tailscaled");
  assertStringIncludes(notes.join(" "), "workload identity");
  assertStringIncludes(notes.join(" "), "per-pair grants");
});

Deno.test("planMitigation honours the opt-in and opt-out switches", () => {
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true, AppConnector: { Advertise: true } },
    serve: LOCALAPI_SERVE,
  }));
  const none = planMitigation(status, facts, {
    ...DEFAULT_OPTS,
    removeLocalapiForwards: false,
    applyEgressRules: false,
    applyAuditRules: false,
  });
  assertEquals(none.steps, []);
  const off = planMitigation(status, facts, {
    ...DEFAULT_OPTS,
    removeLocalapiForwards: false,
    applyEgressRules: false,
    applyAuditRules: false,
    disableTailscaleSsh: true,
    disableAppConnector: true,
  });
  assertEquals(off.steps.map((s) => s.argv.join(" ")), [
    "tailscale set --advertise-connector=false",
    "tailscale set --ssh=false",
  ]);
});

Deno.test("planMitigation skips what is already in place or impossible", () => {
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true },
    lines: [
      "NFT|1",
      "AUDIT|2",
      "NFTDROPIN|/etc/systemd/system/tailscaled.service.d/50-tailworm.conf",
    ],
  }));
  const plan = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(plan.steps, []);
  assertStringIncludes(plan.notes.join(" "), "reloads after every start");
  assertStringIncludes(plan.notes.join(" "), "already has rules");

  const bare = scan(
    probe({ prefs: { RunSSH: true } }).replace("TOOL|nft|/usr/sbin/nft\n", "")
      .replace("TOOL|auditctl|/usr/sbin/auditctl\n", "")
      .replace("TOOL|augenrules|/usr/sbin/augenrules\n", ""),
  );
  const p2 = planMitigation(bare.status, bare.facts, DEFAULT_OPTS);
  assertEquals(p2.steps, []);
  assertStringIncludes(p2.notes.join(" "), "nft is not installed");
  assertStringIncludes(p2.notes.join(" "), "auditd is not installed");
});

Deno.test("planMitigation falls back to auditctl -R without augenrules", () => {
  const { facts, status } = scan(
    probe({ prefs: { RunSSH: true }, lines: ["NFT|1", EGRESS_DONE] }).replace(
      "TOOL|augenrules|/usr/sbin/augenrules\n",
      "",
    ),
  );
  const { steps } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps.at(-1)!.argv, ["auditctl", "-R", AUDIT_FILE]);
});

Deno.test("planMitigation leaves foreground serve sessions to the operator", () => {
  const { facts, status } = scan(probe({
    serve: {
      Foreground: {
        "s1": {
          TCP: {
            "7000": { TCPForward: "unix:/run/tailscale/tailscaled.sock" },
          },
        },
      },
    },
  }));
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps, []);
  assertStringIncludes(notes.join(" "), "foreground tailscale serve session");
});

Deno.test("planMitigation hardens headscale with a drop-in and runtime cap", () => {
  const { facts, status } = scan(
    probe({
      lines: [
        "HSVERSION|v0.29.5",
        "HSUNIT|LoadState=loaded",
        "HSUNIT|MemoryMax=infinity",
        "HSUNIT|Restart=on-failure",
        "HSLISTEN|0.0.0.0:443",
      ],
    }).replace("HSUNIT|LoadState=not-found\n", ""),
  );
  const { steps, notes } = planMitigation(status, facts, {
    ...DEFAULT_OPTS,
    headscaleMemoryMax: "1G",
  });
  assertEquals(steps.map((s) => s.argv.join(" ")), [
    "mkdir -p /etc/systemd/system/headscale.service.d",
    `tee ${HEADSCALE_DROP_IN}`,
    "systemctl daemon-reload",
    "systemctl set-property --runtime headscale.service MemoryMax=1G",
  ]);
  assertStringIncludes(steps[1].content!, "MemoryMax=1G\nRestart=always");
  assertStringIncludes(notes.join(" "), "listens on 0.0.0.0:443");
});

Deno.test("planMitigation in a container changes only Tailscale itself", () => {
  const facts = parseProbe(
    probe({ prefs: { RunSSH: true }, serve: LOCALAPI_SERVE }),
  );
  const status = analyze(facts, "c", { inContainer: true });
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps.map((s) => s.phase), ["serve"]);
  assertStringIncludes(notes.join(" "), "host that runs it");
});

Deno.test("renderStep uses resolved binaries and sudo -n for non-root", () => {
  const step = {
    phase: "serve" as const,
    argv: ["tailscale", "serve", "--tcp=8443", "off"],
    privileged: true,
    purpose: "",
  };
  const tools = { tailscale: "/usr/bin/tailscale" };
  assertEquals(
    renderStep(step, tools, false),
    "LC_ALL=C sudo -n -- /usr/bin/tailscale serve --tcp=8443 off",
  );
  assertEquals(
    renderStep(step, tools, true),
    "/usr/bin/tailscale serve --tcp=8443 off",
  );
});

Deno.test("allowedSteps requires a passwordless sudoers match", () => {
  const steps = [
    {
      phase: "serve" as const,
      argv: ["tailscale", "set", "--ssh=false"],
      privileged: true,
      purpose: "",
    },
    {
      phase: "egress" as const,
      argv: ["nft", "-f", NFT_FILE],
      privileged: true,
      purpose: "",
    },
  ];
  const tools = { tailscale: "/usr/bin/tailscale", nft: "/usr/sbin/nft" };
  const script = preflightScript(steps, tools);
  assertStringIncludes(script, "sudo -n -l /usr/bin/tailscale set --ssh=false");
  const out = [
    "OK|0",
    "OK|1",
    "@@ sudo-ll",
    "Sudoers entry: /etc/sudoers.d/ops",
    "    RunAsUsers: root",
    "    Options: !authenticate",
    "    Commands:",
    "\t/usr/bin/tailscale",
    "Sudoers entry: /etc/sudoers",
    "    RunAsUsers: ALL",
    "    Commands:",
    "\t/usr/sbin/nft",
  ];
  assertEquals([...allowedSteps(steps, tools, out.join("\n"))], [0]);
});

Deno.test("resolveScript quotes each path", () => {
  assertEquals(
    resolveScript(["/srv/a b.sock"]),
    `printf 'RESOLVE|%s|%s\\n' '/srv/a b.sock' "$(readlink -f -- '/srv/a b.sock' 2>/dev/null)"`,
  );
});

// --- Scanning and mitigating through a fake runner ---------------------------

type Call = { command: string; input?: string };

function fakeRunner(
  probes: string[],
  respond: (command: string) => RunResult = () => ({
    stdout: "",
    stderr: "",
    exitCode: 0,
  }),
) {
  const calls: Call[] = [];
  let n = 0;
  const run = (command: string, _timeout?: number, input?: string) => {
    calls.push({ command, input });
    if (command.includes('echo "END|1"')) {
      const out = probes[Math.min(n++, probes.length - 1)];
      return Promise.resolve({ stdout: out, stderr: "", exitCode: 0 });
    }
    return Promise.resolve(respond(command));
  };
  return { run, calls };
}

function memLog() {
  const lines: string[] = [];
  return {
    lines,
    writeLine: (l: string) => {
      lines.push(l);
      return Promise.resolve();
    },
    finalize: () => Promise.resolve(),
  };
}

Deno.test("scanTarget resolves unix serve targets before analysing", async () => {
  const text = probe({
    serve: { TCP: { "9000": { TCPForward: "unix:/srv/api.sock" } } },
  });
  const { run, calls } = fakeRunner([text], (cmd) => ({
    stdout: cmd.startsWith("printf 'RESOLVE")
      ? "RESOLVE|/srv/api.sock|/run/tailscale/tailscaled.sock"
      : "",
    stderr: "",
    exitCode: 0,
  }));
  const { status } = await scanTarget(run, "h", { inContainer: false });
  assertEquals(calls.length, 2);
  assertEquals(ids(status), ["serve-localapi-forward"]);
});

Deno.test("scanTarget fails on no output or an incomplete probe", async () => {
  const empty = () =>
    Promise.resolve({ stdout: "", stderr: "Permission denied", exitCode: 255 });
  await assertRejects(
    () => scanTarget(empty, "h", { inContainer: false }),
    Error,
    "Cannot execute commands on h: Permission denied",
  );
  const { run } = fakeRunner([probe({ end: false })]);
  await assertRejects(
    () => scanTarget(run, "h", { inContainer: false }),
    Error,
    "Incomplete scan",
  );
});

Deno.test("mitigateTarget dry run plans but runs nothing", async () => {
  const { run, calls } = fakeRunner([probe({ serve: LOCALAPI_SERVE })]);
  const log = memLog();
  const { mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: true,
    inContainer: false,
  }, log);
  assertEquals(mitigation.outcome, "dry-run");
  assertEquals(mitigation.privilege, "root");
  assertEquals(mitigation.steps.map((s) => s.status), ["planned"]);
  assertEquals(
    mitigation.steps[0].command,
    "/usr/bin/tailscale serve --tcp=8443 off",
  );
  assertFalse(calls.some((c) => c.command.includes("serve --tcp=8443 off")));
  assertStringIncludes(log.lines.join(""), "[DRY RUN] Would execute");
});

Deno.test("mitigateTarget applies, writes files from stdin, and rescans", async () => {
  const before = probe({ prefs: { RunSSH: true }, serve: LOCALAPI_SERVE });
  const after = probe({ prefs: { RunSSH: true }, lines: ["NFT|1", "AUDIT|1"] });
  const { run, calls } = fakeRunner([before, after]);
  const { status, mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: false,
    inContainer: false,
  }, memLog());
  assertEquals(mitigation.outcome, "applied");
  assert(mitigation.steps.every((s) => s.status === "ok"));
  const tee = calls.find((c) =>
    c.command.startsWith("/usr/bin/tee /etc/tailworm")
  )!;
  assertEquals(tee.command, `/usr/bin/tee ${NFT_FILE} >/dev/null`);
  assertStringIncludes(tee.input!, "table inet tailworm");
  // The status is the rescan's: the forward is gone.
  assertFalse(ids(status).includes("serve-localapi-forward"));
  assertEquals(status.mitigation?.outcome, "applied");
  assertEquals(status.mitigation?.options.removeLocalapiForwards, true);
});

Deno.test("mitigateTarget skips the rest of a phase after a failure", async () => {
  const before = probe({ prefs: { RunSSH: true }, lines: ["AUDIT|1"] });
  const { run } = fakeRunner([before, before], (cmd) => ({
    stdout: "",
    stderr: cmd.includes("tee") ? "read-only file system" : "",
    exitCode: cmd.includes("tee") ? 1 : 0,
  }));
  const { mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: false,
    inContainer: false,
  }, memLog());
  assertEquals(mitigation.outcome, "partial");
  assertEquals(mitigation.steps.map((s) => s.status), [
    "failed",
    "skipped",
    "skipped",
    "skipped",
    "skipped",
    "skipped",
    "skipped",
  ]);
});

Deno.test("mitigateTarget without passwordless sudo runs nothing", async () => {
  const text = probe({ serve: LOCALAPI_SERVE }).replace("UID|0", "UID|1000");
  const { run, calls } = fakeRunner([text], () => ({
    stdout: "NO|0\n@@ sudo-ll\n",
    stderr: "",
    exitCode: 0,
  }));
  const { mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: false,
    inContainer: false,
  }, memLog());
  assertEquals(mitigation.outcome, "needs-privilege");
  assertEquals(mitigation.missingPrivileges, [
    "LC_ALL=C sudo -n -- /usr/bin/tailscale serve --tcp=8443 off",
  ]);
  // Probe, target resolution and the sudo preflight; no step ran.
  assertFalse(calls.some((c) => c.command.startsWith("LC_ALL=C sudo -n -- ")));
});

Deno.test("mitigateTarget on an unaffected host has nothing to do", async () => {
  const { run } = fakeRunner([probe({})]);
  const { mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: false,
    inContainer: false,
  }, memLog());
  assertEquals(mitigation.outcome, "not-needed");
  assertEquals(mitigation.steps, []);
});

Deno.test("planMitigation on macOS points at the host firewall", () => {
  const { facts, status } = scan(
    probe({ prefs: { RunSSH: true } }).replace("KERNEL|Linux", "KERNEL|Darwin"),
  );
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps, []);
  assertStringIncludes(
    notes.join(" "),
    "Darwin: the egress and audit mitigations are Linux-only",
  );
  assertFalse(notes.join(" ").includes("nft is not installed"));
});

Deno.test("the macOS daemon's tailscaled.socket counts as the localapi", () => {
  const { status } = scan(probe({
    serve: {
      TCP: { "8443": { TCPForward: "unix:/var/run/tailscaled.socket" } },
    },
  }));
  assertEquals(ids(status), ["serve-localapi-forward"]);
});

Deno.test("a 0755 socket alone asks for investigation, not incident response", () => {
  const { status } = scan(probe({
    prefs: { RunSSH: true },
    lines: ["ROOTSOCK|755|/tmp/app.sock"],
  }));
  assertEquals(status.riskLevel, "high");
  const recs = status.recommendations.join(" ");
  assertStringIncludes(recs, "Investigate the forensic signatures");
  assertFalse(recs.includes("Treat this host as compromised"));
  assertFalse(status.summary.includes("POSSIBLE COMPROMISE"));
});

Deno.test("parseProbe takes the version from headscale's version line", () => {
  assertEquals(
    parseProbe("HSVERSION|headscale version v0.29.5\nEND|1").hsVersion,
    "v0.29.5",
  );
  assertEquals(parseProbe("HSVERSION|v0.28.0\nEND|1").hsVersion, "v0.28.0");
});

Deno.test("a kernel without nft_socket gets only the forward chain", () => {
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true },
    lines: ["NFTSOCKET|absent", "AUDIT|1"],
  }));
  assertEquals(facts.nftSocket, "absent");
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps.map((s) => s.argv.join(" ")), [
    `tee ${NFT_FILE}`,
    `nft -f ${NFT_FILE}`,
    "mkdir -p /etc/systemd/system/tailscaled.service.d",
    "tee /etc/systemd/system/tailscaled.service.d/50-tailworm.conf",
    "systemctl daemon-reload",
  ]);
  // The drop-in reloads only the table file: there is no cgroup file.
  assertFalse(steps[3].content!.includes(NFT_CGROUP_FILE));
  assertStringIncludes(notes.join(" "), "no nft_socket");
});

Deno.test("egressRule needs the cgroup rule unless the kernel cannot run it", () => {
  const tableOnly = scan(probe({ lines: ["NFTTABLE|1", "NFTSOCKET|module"] }))
    .status;
  assertEquals(tableOnly.defenses.egressRule, false);
  const noSocket =
    scan(probe({ lines: ["NFTTABLE|1", "NFTSOCKET|absent", EGRESS_DONE] }))
      .status;
  assertEquals(noSocket.defenses.egressRule, true);
});

Deno.test("a failed serve step does not skip the next forward", async () => {
  const before = probe({
    serve: {
      TCP: {
        "1": { TCPForward: "unix:/run/tailscale/tailscaled.sock" },
        "2": { TCPForward: "unix:/run/tailscale/tailscaled.sock" },
      },
    },
  });
  const { run } = fakeRunner([before, before], (cmd) => ({
    stdout: "",
    stderr: "",
    exitCode: cmd.includes("--tcp=1 ") ? 1 : 0,
  }));
  const { mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: false,
    inContainer: false,
  }, memLog());
  assertEquals(mitigation.steps.map((s) => s.status), ["failed", "ok"]);
});

Deno.test("PROBE_SCRIPT finds sbin tools for non-root users", () => {
  assertStringIncludes(
    PROBE_SCRIPT.split("\n").slice(0, 6).join("\n"),
    'PATH="$PATH:/usr/local/sbin:/usr/sbin:/sbin"; export PATH',
  );
});

// --- SSH policy and daemon version -------------------------------------------

/** A probe whose netmap SSHPolicy block holds these rules. */
function withPolicy(rules: unknown[] | null, opts: { prefs?: unknown } = {}) {
  const block = rules === null
    ? '\t"SSHPolicy": null,'
    : `\t"SSHPolicy": ${JSON.stringify({ rules }, null, "\t")},`;
  return probe({ prefs: { RunSSH: true, ...obj(opts.prefs) } }).replace(
    "@@ end",
    `@@ sshpolicy\n${block}\n\n@@ end`,
  );
}

function obj(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" ? v as Record<string, unknown> : {};
}

const ACCEPT_FWD = {
  principals: [{ nodeIP: "100.64.0.2" }],
  sshUsers: { ops: "ops" },
  action: {
    accept: true,
    allowLocalPortForwarding: true,
    allowRemotePortForwarding: true,
  },
};

Deno.test("parseSshPolicy reads the netmap block, null, or nothing", () => {
  assertEquals(
    parseSshPolicy('\t"SSHPolicy": {\n\t\t"rules": []\n\t},'),
    { rules: [] },
  );
  assertEquals(parseSshPolicy('\t"SSHPolicy": null,'), null);
  assertEquals(parseSshPolicy(""), undefined);
  assertEquals(parseSshPolicy('\t"SSHPolicy": {broken'), undefined);
});

Deno.test("summarizeSshPolicy counts sources, root and forwarding", () => {
  const p = summarizeSshPolicy({
    rules: [
      ACCEPT_FWD,
      {
        principals: [{ nodeIP: "100.64.0.2" }, { userLogin: "a@example.com" }],
        sshUsers: { "*": "=", root: "" },
        action: { holdAndDelegate: "https://x/$SRC_NODE_ID" },
      },
      { principals: [{ any: true }], action: { reject: true } },
    ],
  });
  assertEquals(p, {
    readable: true,
    acceptRules: 1,
    checkRules: 1,
    sources: 2,
    anySource: false,
    rootAllowed: false,
    anyUser: true,
    localForwarding: true,
    remoteForwarding: true,
  });
  assert(
    summarizeSshPolicy({ rules: [{ ...ACCEPT_FWD, sshUsers: { "*": "=" } }] })
      .rootAllowed,
  );
  assert(
    summarizeSshPolicy({
      rules: [{ ...ACCEPT_FWD, sshUsers: { admin: "root" } }],
    }).rootAllowed,
  );
  assertFalse(summarizeSshPolicy(undefined).readable);
});

Deno.test("SSH with no admitting rule is low and plans nothing", () => {
  const { facts, status } = scan(withPolicy(null));
  assertEquals(status.exposures[0].severity, "low");
  assertEquals(status.riskLevel, "low");
  assertStringIncludes(
    status.recommendations.join(" "),
    "no rule admits anyone",
  );
  assertFalse(status.recommendations.join(" ").includes("per-pair"));
  assertEquals(planMitigation(status, facts, DEFAULT_OPTS).steps, []);
});

Deno.test("SSH with forwarding denied is medium (finding 5 only)", () => {
  const { status } = scan(withPolicy([{
    ...ACCEPT_FWD,
    action: { accept: true },
  }]));
  const e = status.exposures[0];
  assertEquals(e.severity, "medium");
  assertEquals(e.findings, ["5"]);
  assertStringIncludes(e.detail, "Forwarding is denied");
});

Deno.test("SSH with forwarding to a named user is high; root or any source is critical", () => {
  assertEquals(
    scan(withPolicy([ACCEPT_FWD])).status.exposures[0].severity,
    "high",
  );
  const root = scan(withPolicy([{ ...ACCEPT_FWD, sshUsers: { root: "root" } }]))
    .status;
  assertEquals(root.exposures[0].severity, "critical");
  assertStringIncludes(
    root.recommendations.join(" "),
    "allow logging in as root",
  );
  const any = scan(withPolicy([{ ...ACCEPT_FWD, principals: [{ any: true }] }]))
    .status;
  assertEquals(any.exposures[0].severity, "critical");
  assertStringIncludes(any.exposures[0].detail, "admit any source");
});

Deno.test("check-mode rules count as forwarding allowed", () => {
  const { status } = scan(withPolicy([{
    principals: [{ nodeIP: "100.64.0.9" }],
    sshUsers: { ops: "ops" },
    action: { holdAndDelegate: "https://x" },
  }]));
  assertEquals(status.exposures[0].severity, "high");
  assertStringIncludes(
    status.exposures[0].detail,
    "check mode does not limit it",
  );
});

Deno.test("an unreadable policy keeps the conservative grading", () => {
  const { status } = scan(probe({ prefs: { RunSSH: true } }));
  assertFalse(status.tailscale.sshPolicy.readable);
  assertEquals(status.exposures[0].severity, "high");
  assertStringIncludes(status.exposures[0].detail, "Scan as root");
});

Deno.test("the daemon's version wins over a newer CLI", () => {
  const text = probe({
    status: {
      Version: "1.102.4-tbbcd7d1fc",
      BackendState: "Running",
      Self: { KeyExpiry: "2027-01-01T00:00:00Z" },
    },
  });
  const { status } = scan(text);
  assertEquals(status.tailscale.version, "1.102.4");
  assertEquals(status.tailscale.cliVersion, "1.104.2");
  assertEquals(status.tailscale.missingBulletins, ["TS-2026-013"]);
  assertStringIncludes(status.recommendations.join(" "), "restart tailscaled");
});

Deno.test("a device listed by its v4 and v6 address counts once", () => {
  // As headscale 0.29.5 sent it for one node with autogroup:nonroot.
  const p = summarizeSshPolicy({
    rules: [{
      action: {
        accept: true,
        allowAgentForwarding: true,
        allowLocalPortForwarding: true,
        allowRemotePortForwarding: true,
      },
      principals: [{ nodeIP: "100.64.0.1" }, { nodeIP: "fd7a:115c:a1e0::1" }],
      sshUsers: { "*": "=", root: "" },
    }],
  });
  assertEquals(p.sources, 1);
  assertFalse(p.rootAllowed);
  assert(p.anyUser);
  assert(p.localForwarding && p.remoteForwarding);
});

// --- Review follow-ups ---------------------------------------------------------

Deno.test("audit rules are written only for x86_64 and aarch64", () => {
  assertEquals(auditRules("/usr/sbin/tailscaled", "armv7l"), null);
  assertEquals(auditRules("/usr/sbin/tailscaled", "riscv64"), null);
  const { facts, status } = scan(
    probe({ prefs: { RunSSH: true }, lines: ["NFT|1", EGRESS_DONE] }).replace(
      "ARCH|x86_64",
      "ARCH|armv7l",
    ),
  );
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps, []);
  assertStringIncludes(notes.join(" "), "No audit rules for armv7l");
});

Deno.test("listenHost and isPublicListen handle IPv6 forms", () => {
  assertEquals(listenHost("::1"), "::1");
  assertEquals(listenHost("[::1]:8080"), "::1");
  assertEquals(listenHost("127.0.0.1:8080"), "127.0.0.1");
  assertEquals(listenHost(":8080"), "");
  assertFalse(isPublicListen("::1"));
  assertFalse(isPublicListen("[::1]:8080"));
  assertFalse(isPublicListen("localhost:8080"));
  assert(isPublicListen("0.0.0.0:8080"));
  assert(isPublicListen("[::]:8080"));
  assert(isPublicListen(":8080"));
  assert(isPublicListen("10.0.0.5:8080"));
});

Deno.test("a daemon on a custom --socket is not flagged for its own listener", () => {
  const { facts, status } = scan(probe({
    lines: [
      "TSDSOCKET|/var/packages/Tailscale/var/tailscaled.sock",
      "TSSOCK|666|0|/var/packages/Tailscale/var/tailscaled.sock",
      'TSLISTEN|u_str LISTEN 0 4096 /var/packages/Tailscale/var/tailscaled.sock 9 * 0 users:(("tailscaled",pid=812,fd=9))',
    ],
  }));
  assertEquals(facts.tailscaledSockets, [
    "/var/packages/Tailscale/var/tailscaled.sock",
  ]);
  assertEquals(status.indicators.details, []);
  assertFalse(status.summary.includes("POSSIBLE COMPROMISE"));
});

Deno.test("PROBE_SCRIPT reads tailscaled's --socket and stats it", () => {
  assertStringIncludes(PROBE_SCRIPT, 'echo "TSDSOCKET|$s"');
  assertStringIncludes(PROBE_SCRIPT, "for p in $pids; do");
});

Deno.test("the cgroup rule leaves DNS over TCP to cloud resolvers open", () => {
  const rules = nftCgroupRules("/system.slice/tailscaled.service")!;
  for (
    const line of rules.split("\n").filter((l) => l.startsWith("add rule"))
  ) {
    assertStringIncludes(line, "tcp dport != 53 reject with tcp reset");
  }
});

Deno.test("a resolved path containing | is parsed by the path asked about", async () => {
  const target = "/srv/a|b.sock";
  const text = probe({
    serve: { TCP: { "9000": { TCPForward: `unix:${target}` } } },
  });
  const { run } = fakeRunner([text], (cmd) => ({
    stdout: cmd.startsWith("printf 'RESOLVE")
      ? `RESOLVE|${target}|/run/tailscale/tailscaled.sock`
      : "",
    stderr: "",
    exitCode: 0,
  }));
  const { status, facts } = await scanTarget(run, "h", { inContainer: false });
  assertEquals(facts.resolved[target], "/run/tailscale/tailscaled.sock");
  assertEquals(ids(status), ["serve-localapi-forward"]);
});

Deno.test("PROBE_SCRIPT has no control characters besides newline and tab", () => {
  // A single backslash in the template literal would hand sh a raw NUL.
  const controls = [...PROBE_SCRIPT].filter((c) => {
    const code = c.charCodeAt(0);
    return code < 0x20 && c !== "\n" && c !== "\t";
  });
  assertEquals(controls, []);
  assertStringIncludes(
    PROBE_SCRIPT,
    `s=$(tr '\\0' '\\n' < "/proc/$p/cmdline"`,
  );
});

Deno.test("root's own systemd user-manager sockets are not signatures", () => {
  // As on a stock server swamp reaches over SSH as root: pam_systemd starts
  // root's user manager, which binds these 0755.
  const { status } = scan(probe({
    prefs: { RunSSH: true },
    lines: [
      "ROOTSOCK|755|/run/user/0/systemd/private",
      "ROOTSOCK|755|/run/user/0/systemd/notify",
      "ROOTSOCK|755|/root/.cache/app.sock",
    ],
  }));
  assertEquals(status.indicators.details, []);
  // A root socket in another user's runtime directory still is.
  const other = scan(probe({
    prefs: { RunSSH: true },
    lines: ["ROOTSOCK|755|/run/user/1000/relay.sock"],
  })).status;
  assertEquals(other.indicators.details.map((i) => i.id), ["root-socket-0755"]);
});

Deno.test("a host without Tailscale is never graded on signatures", () => {
  const facts = parseProbe([
    "HOSTNAME|plain",
    "UID|0",
    "KERNEL|Linux",
    "ROOTSOCK|755|/tmp/app.sock",
    "ROOTSOCK|755|/run/user/0/systemd/private",
    "END|1",
  ].join("\n"));
  const s = analyze(facts, "plain", { inContainer: false });
  assertEquals(s.riskLevel, "none");
  assertFalse(s.vulnerable);
  assertEquals(s.indicators.details, []);
  assertFalse(s.indicators.socketsChecked);
});

Deno.test("0755 sockets are not signatures while Tailscale SSH is off", () => {
  const { status } = scan(probe({ lines: ["ROOTSOCK|755|/tmp/app.sock"] }));
  assertEquals(status.indicators.details, []);
  assertEquals(status.riskLevel, "low");
});

Deno.test("the cgroup rule is planned only for tailscaled's own unit", () => {
  const shared = scan(
    probe({ prefs: { RunSSH: true }, lines: ["AUDIT|1"] }).replace(
      "CGROUP|/system.slice/tailscaled.service",
      "CGROUP|/user.slice/user-0.slice/session-3.scope",
    ),
  );
  const { steps, notes } = planMitigation(
    shared.status,
    shared.facts,
    DEFAULT_OPTS,
  );
  assertEquals(steps.map((s) => s.argv.join(" ")), [
    `tee ${NFT_FILE}`,
    `nft -f ${NFT_FILE}`,
  ]);
  assertStringIncludes(notes.join(" "), "not its own system service unit");

  const nested = scan(
    probe({ prefs: { RunSSH: true }, lines: ["AUDIT|1"] }).replace(
      "CGROUP|/system.slice/tailscaled.service",
      "CGROUP|/system.slice/tailscaled@ts1.service",
    ),
  );
  assert(
    planMitigation(nested.status, nested.facts, DEFAULT_OPTS).steps.some((s) =>
      s.argv[1] === NFT_CGROUP_FILE
    ),
  );
});

Deno.test("turning Tailscale SSH or the connector off is planned last", () => {
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true, AppConnector: { Advertise: true } },
    serve: LOCALAPI_SERVE,
  }));
  const { steps } = planMitigation(status, facts, {
    ...DEFAULT_OPTS,
    disableTailscaleSsh: true,
    disableAppConnector: true,
  });
  assertEquals(
    steps.at(-2)!.argv.join(" "),
    "tailscale set --advertise-connector=false",
  );
  assertEquals(steps.at(-1)!.argv.join(" "), "tailscale set --ssh=false");
  assertEquals(steps[0].phase, "serve");
});

Deno.test("allowsRoot catches root kept as itself or mapped from another name", () => {
  const rule = (sshUsers: Record<string, string>) =>
    summarizeSshPolicy({ rules: [{ ...ACCEPT_FWD, sshUsers }] }).rootAllowed;
  assert(rule({ root: "=" }));
  assert(rule({ root: "", ops: "root" }));
  assert(rule({ "*": "root" }));
  assert(rule({ "*": "=" }));
  assertFalse(rule({ "*": "=", root: "" }));
  assertFalse(rule({ ops: "ops" }));
});

Deno.test("every tailscaled instance's own socket is exempt", () => {
  const { facts, status } = scan(probe({
    lines: [
      "TSDSOCKET|/run/tailscale/tailscaled.sock",
      "TSDSOCKET|/run/tailscale-work/work.sock",
      'TSLISTEN|u_str LISTEN 0 1 /run/tailscale-work/work.sock 9 * 0 users:(("tailscaled",pid=900,fd=9))',
      'TSLISTEN|u_str LISTEN 0 1 /srv/other/tailscaled.sock 9 * 0 users:(("tailscaled",pid=901,fd=9))',
    ],
  }));
  assertEquals(facts.tailscaledSockets.length, 2);
  assertEquals(status.indicators.details, []);
});

Deno.test("audit rules use the binary path after an upgrade without a restart", () => {
  const { facts, status } = scan(
    probe({ prefs: { RunSSH: true }, lines: ["NFT|1", EGRESS_DONE] }).replace(
      "TSDEXE|/usr/sbin/tailscaled",
      "TSDEXE|/usr/sbin/tailscaled (deleted)",
    ),
  );
  const { steps } = planMitigation(status, facts, DEFAULT_OPTS);
  assertEquals(steps[0].argv, ["tee", AUDIT_FILE]);
  assertStringIncludes(steps[0].content!, "-F exe=/usr/sbin/tailscaled -k");
});

Deno.test("the cgroup file is idempotent and loads on its own", () => {
  const rules = nftCgroupRules("/system.slice/tailscaled.service")!;
  const lines = rules.split("\n");
  const at = (prefix: string) => lines.findIndex((l) => l.startsWith(prefix));
  assert(at("add table inet tailworm") < at("add chain inet tailworm output"));
  assert(
    at("add chain inet tailworm output") <
      at("flush chain inet tailworm output"),
  );
  assert(at("flush chain inet tailworm output") < at("add rule"));
});

Deno.test("no drop-in without systemd, and a note says to reload by hand", () => {
  const { facts, status } = scan(
    probe({ prefs: { RunSSH: true }, lines: ["AUDIT|1"] }).replace(
      "TOOL|systemctl|/usr/bin/systemctl\n",
      "",
    ),
  );
  const { steps, notes } = planMitigation(status, facts, DEFAULT_OPTS);
  assertFalse(steps.some((s) => s.argv[0] === "mkdir"));
  assertStringIncludes(
    notes.join(" "),
    "reload both files after tailscaled restarts",
  );
});

Deno.test("a loaded rule without the reload drop-in is stale and re-planned", () => {
  // As measured after a tailscaled restart: the rule is still listed but
  // matches nothing.
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true },
    lines: ["NFT|2", "AUDIT|1"],
  }));
  assertEquals(status.defenses.egressRule, false);
  const { steps } = planMitigation(status, facts, DEFAULT_OPTS);
  assert(
    steps.some((s) =>
      s.argv[1] === "/etc/systemd/system/tailscaled.service.d/50-tailworm.conf"
    ),
  );
  // Without systemd there is no drop-in to expect.
  const bare = scan(
    probe({ prefs: { RunSSH: true }, lines: ["NFT|2"] }).replace(
      "TOOL|systemctl|/usr/bin/systemctl\n",
      "",
    ),
  ).status;
  assertEquals(bare.defenses.egressRule, true);
});

Deno.test("a cgroup rule that fails to load does not skip the reload drop-in", async () => {
  // nft_socket unknown to the probe, then refused by the kernel.
  const before = probe({ prefs: { RunSSH: true }, lines: ["AUDIT|1"] });
  const { run } = fakeRunner([before, before], (cmd) => ({
    stdout: "",
    stderr: cmd.includes(`nft -f ${NFT_CGROUP_FILE}`)
      ? "Error: Could not process rule: No such file or directory"
      : "",
    exitCode: cmd.includes(`nft -f ${NFT_CGROUP_FILE}`) ? 1 : 0,
  }));
  const { mitigation } = await mitigateTarget(run, "h", {
    ...DEFAULT_OPTS,
    dryRun: false,
    inContainer: false,
  }, memLog());
  assertEquals(mitigation.outcome, "partial");
  assertEquals(
    mitigation.steps.find((s) => s.command.includes("50-tailworm.conf"))!
      .status,
    "ok",
  );
  assertEquals(mitigation.steps.at(-1)!.status, "failed");
});

Deno.test("only a system.slice unit counts as tailscaled's own", () => {
  assert(ownServiceUnit("/system.slice/tailscaled.service"));
  assert(ownServiceUnit("/system.slice/tailscaled@ts1.service"));
  // A user's process named tailscaled in a user unit.
  assertFalse(
    ownServiceUnit(
      "/user.slice/user-1000.slice/user@1000.service/app.slice/tailscaledX.service",
    ),
  );
  assertFalse(ownServiceUnit("/user.slice/user-0.slice/session-3.scope"));
  assertFalse(ownServiceUnit(null));
});

Deno.test("a forward chain alone counts as in place when no cgroup rule applies", () => {
  // tailscaled in a session scope: only the forward chain is planned.
  const s = scan(
    probe({
      prefs: { RunSSH: true },
      lines: ["NFT|0", "NFTTABLE|1", "NFTSOCKET|module"],
    }).replace(
      "CGROUP|/system.slice/tailscaled.service",
      "CGROUP|/user.slice/user-0.slice/session-3.scope",
    ).replace("TOOL|systemctl|/usr/bin/systemctl\n", ""),
  ).status;
  assertEquals(s.defenses.egressRule, true);
});

Deno.test("PROBE_SCRIPT prefers a root tailscaled in a system unit", () => {
  assertStringIncludes(
    PROBE_SCRIPT,
    `grep -q '^0::/.*system[.]slice/' "/proc/$p/cgroup" && { pid=$p; break; }`,
  );
});

// --- hosts entries: user@host logs in to that host as user -----------------

Deno.test("hostList: user@host carries its user; plain and local hosts carry none", () => {
  assertEquals(
    hostList(
      " ops@192.0.2.10,ops@192.0.2.10, 192.0.2.11,admin@fe80::1,kim@localhost,::1",
      "root",
    ),
    [
      { host: "192.0.2.10", sshUser: "ops" },
      { host: "192.0.2.11" },
      { host: "fe80::1", sshUser: "admin" },
      { host: "localhost" },
    ],
  );
});

Deno.test("hostList: refuses a bad user, an empty host, and one host with two users", () => {
  assertThrows(() => hostList("@h", "root"), Error, "invalid SSH user");
  assertThrows(
    () => hostList("-oProxyCommand=id@h", "root"),
    Error,
    "invalid SSH user",
  );
  assertThrows(() => hostList("a@", "root"), Error, "invalid host");
  assertThrows(() => hostList("a@b@h", "root"), Error, "invalid host");
  assertThrows(() => hostList("a@h,b@h", "root"), Error, "both a@h and b@h");
  assertThrows(() => hostList("h,a@h", "root"), Error, "both root@h and a@h");
  // The model's own user given explicitly is the same login: one host.
  assertEquals(hostList("h,root@h", "root"), [{ host: "h" }]);
});

type FleetStatus = { target: string; error?: string | null; sshUser?: string };

/**
 * Run scanFleet or mitigate with Deno.Command replaced by a process that
 * fails as ssh does when it cannot connect, recording each argv. Every host
 * then gets an error status, which still shows which target it was reached at.
 */
async function runHosts(
  method: "scanFleet" | "mitigate",
  hosts: string,
  globals: Record<string, unknown> = {},
) {
  const argvs: string[][] = [];
  const resources: Record<string, FleetStatus> = {};
  const empty = () =>
    new ReadableStream<Uint8Array>({ start: (c) => c.close() });
  class FakeCommand {
    #args: string[];
    constructor(_bin: string, options: { args: string[] }) {
      this.#args = options.args;
    }
    spawn() {
      argvs.push(this.#args);
      return {
        stdout: empty(),
        stderr: empty(),
        stdin: new WritableStream<Uint8Array>(),
        status: Promise.resolve({ code: 255, success: false }),
      };
    }
  }
  const deno = Deno as unknown as { Command: unknown };
  const original = deno.Command;
  deno.Command = FakeCommand;
  try {
    const context = {
      globalArgs: model.globalArguments.parse(globals),
      logger: { info: () => {}, debug: () => {} },
      createFileWriter: () => ({
        writeLine: () => Promise.resolve(),
        finalize: () => Promise.resolve(),
      }),
      writeResource: (_spec: string, name: string, data: unknown) => {
        resources[name] = data as FleetStatus;
        return Promise.resolve({ name });
      },
    } as unknown as Parameters<typeof model.methods.scanFleet.execute>[1];
    if (method === "scanFleet") {
      await model.methods.scanFleet.execute({ hosts }, context);
    } else {
      await model.methods.mitigate.execute(
        { ...DEFAULT_OPTS, dryRun: true, hosts },
        context,
      );
    }
  } finally {
    deno.Command = original;
  }
  return { argvs, resources };
}

/** The ssh target each command ran against: the argument after "--". */
const sshTargets = (argvs: string[][]) => [
  ...new Set(argvs.map((a) => a[a.indexOf("--") + 1])),
];

for (const method of ["scanFleet", "mitigate"] as const) {
  Deno.test(`${method}: plain hosts connect as sshUser and write data named by the host`, async () => {
    const { argvs, resources } = await runHosts(
      method,
      "192.0.2.10, 192.0.2.10,192.0.2.11",
      { sshUser: "ops", sshKey: "/keys/id" },
    );
    assertEquals(argvs[0].slice(0, argvs[0].indexOf("--") + 2), [
      "-o",
      "BatchMode=yes",
      "-o",
      "StrictHostKeyChecking=accept-new",
      "-o",
      "ConnectTimeout=10",
      "-i",
      "/keys/id",
      "--",
      "ops@192.0.2.10",
    ]);
    assertEquals(sshTargets(argvs).sort(), [
      "ops@192.0.2.10",
      "ops@192.0.2.11",
    ]);
    assertEquals(Object.keys(resources).sort(), ["192.0.2.10", "192.0.2.11"]);
    assertEquals(resources["192.0.2.10"].target, "192.0.2.10");
    assertEquals("sshUser" in resources["192.0.2.10"], false);
  });

  Deno.test(`${method}: a user@host entry logs in as its user, and its status says so`, async () => {
    const { argvs, resources } = await runHosts(
      method,
      "admin@192.0.2.10,192.0.2.11",
      { sshUser: "ops" },
    );
    assertEquals(sshTargets(argvs).sort(), [
      "admin@192.0.2.10",
      "ops@192.0.2.11",
    ]);
    assertEquals(Object.keys(resources).sort(), ["192.0.2.10", "192.0.2.11"]);
    // Both hosts failed to connect: an error status still carries the user.
    assertEquals(resources["192.0.2.10"].target, "192.0.2.10");
    assertEquals(resources["192.0.2.10"].sshUser, "admin");
    assertEquals("sshUser" in resources["192.0.2.11"], false);
    assert(
      model.resources.status.schema.safeParse(resources["192.0.2.10"]).success,
    );
  });
}

Deno.test("ownServiceUnit is anchored at the root of the cgroup tree", () => {
  // A user-delegated subtree that ends in system.slice/tailscaled.service.
  assertFalse(
    ownServiceUnit(
      "/user.slice/user-1000.slice/user@1000.service/x/system.slice/tailscaled.service",
    ),
  );
  assert(ownServiceUnit("/system.slice/tailscaled.service"));
});

Deno.test("the egress rule reads as in place without a drop-in where none applies", () => {
  // tailscaled in a session scope on a systemd host: mitigate writes the
  // forward chain only, and no drop-in.
  const s = scan(
    probe({
      prefs: { RunSSH: true },
      lines: ["NFT|0", "NFTTABLE|1", "NFTSOCKET|module"],
    }).replace(
      "CGROUP|/system.slice/tailscaled.service",
      "CGROUP|/user.slice/user-0.slice/session-3.scope",
    ),
  ).status;
  assertEquals(s.defenses.egressRule, true);
});

// --- Only a root tailscaled is the daemon -------------------------------------

Deno.test("a user's process named tailscaled cannot raise signatures", () => {
  // pid 4242 is not a root tailscaled: its listener is ignored, even on a
  // privileged-looking path.
  const { facts, status } = scan(probe({
    prefs: { RunSSH: true },
    lines: [
      'TSLISTEN|u_str LISTEN 0 1 /var/tmp/x.sock 9 * 0 users:(("tailscaled",pid=4242,fd=3))',
      'TSLISTEN|u_str LISTEN 0 1 /run/docker.sock 9 * 0 users:(("tailscaled",pid=812,fd=31))',
    ],
  }));
  assertEquals(facts.rootPids, [812]);
  assertEquals(status.indicators.tailscaledListeners, [
    "/run/tailscale/tailscaled.sock",
    "/run/docker.sock",
  ]);
  assertEquals(
    status.indicators.details.map((i) => i.detail.includes("/var/tmp/x.sock")),
    [false],
  );
});

Deno.test("PROBE_SCRIPT reads --socket only from root tailscaled processes", () => {
  assertStringIncludes(PROBE_SCRIPT, 'echo "TSROOTPID|$p"');
  assertStringIncludes(
    PROBE_SCRIPT,
    "# Each instance started with --socket (Synology, custom units) listens there.\nfor p in $rootpids; do",
  );
});

Deno.test("an SSH policy block that cannot be read fails closed, even with the netmap", () => {
  // The netmap answered, but the cut block is empty (a format change) or
  // malformed: unknown, graded as permissive, not "no rules".
  for (const block of ["", '\t"SSHPolicy": {broken']) {
    const text = probe({ prefs: { RunSSH: true } }).replace(
      "TSVERSION|1.104.2",
      "TSVERSION|1.104.2\nNETMAPOK|1",
    ).replace("@@ end", `@@ sshpolicy\n${block}\n\n@@ end`);
    const { facts, status } = scan(text);
    assertEquals(facts.sshPolicy, undefined);
    assertFalse(status.tailscale.sshPolicy.readable);
    assertEquals(status.exposures[0].severity, "high");
    assertStringIncludes(status.exposures[0].detail, "treated as permissive");
    assertFalse(status.exposures[0].detail.includes("Scan as root"));
  }
  // Only an explicit null means the node has no SSH rules.
  const none = scan(withPolicy(null)).status;
  assertEquals(none.exposures[0].severity, "low");
});

Deno.test("PROBE_SCRIPT counts tailscaled rules in mitigate's table only", () => {
  assertStringIncludes(
    PROBE_SCRIPT,
    `echo "NFT|$(nft list table inet tailworm 2>/dev/null | grep -c 'tailscaled')"`,
  );
});

// --- Final review round ------------------------------------------------------

Deno.test("the forward chain lets DNS to 169.254.x through before dropping", () => {
  const lines = nftTableRules(["tailscale0"]).split("\n");
  const accept = lines.findIndex((l) =>
    l.includes(
      "ip daddr 169.254.0.0/16 meta l4proto { tcp, udp } th dport 53 accept",
    )
  );
  const drop = lines.findIndex((l) =>
    l.trim() === 'iifname { "tailscale0" } ip daddr 169.254.0.0/16 drop'
  );
  assert(accept >= 0 && drop > accept);
  assert(
    lines.some((l) =>
      l.includes(
        "ip6 daddr fd00:ec2::254 meta l4proto { tcp, udp } th dport 53 accept",
      )
    ),
  );
});

Deno.test("PROBE_SCRIPT counts only mitigate's own audit rules", () => {
  assertStringIncludes(PROBE_SCRIPT, "grep -cE 'key=tailworm|-k tailworm'");
  assertFalse(PROBE_SCRIPT.includes("'tailworm|tailscaled'"));
});

Deno.test("PROBE_SCRIPT never falls back to a non-root tailscaled", () => {
  assertFalse(
    PROBE_SCRIPT.includes(`pid=$(printf '%s\\n' "$pids" | awk 'NR==1')`),
  );
  assertStringIncludes(PROBE_SCRIPT, "No root tailscaled: nothing is trusted");
});

Deno.test("a shared socket's listener is attributed to tailscaled's own pid", () => {
  // ss lists a user's process first for a socket tailscaled also holds.
  const { facts } = scan(probe({
    lines: [
      'TSLISTEN|u_str LISTEN 0 1 /run/docker.sock 9 * 0 users:(("decoy",pid=4242,fd=3),("tailscaled",pid=812,fd=31))',
      'TSLISTEN|u_str LISTEN 0 1 /var/tmp/x.sock 9 * 0 users:(("tailscaled",pid=4243,fd=3),("other",pid=812,fd=9))',
    ],
  }));
  assert(facts.tsListeners.includes("/run/docker.sock"));
  assertFalse(facts.tsListeners.includes("/var/tmp/x.sock"));
});
