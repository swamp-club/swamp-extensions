import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  analyze,
  judgeBrotli,
  judgeNode,
  parseProbe,
  splitDistInfo,
} from "./analysis.ts";
import type { Finding, Status } from "./schemas.ts";

/** A complete probe run with these lines. */
function probe(...lines: string[]): string {
  return ["HOSTNAME|host1", "UID|0", "KERNEL|Linux", ...lines, "END|1"].join(
    "\n",
  );
}

const DEBIAN12 = [
  "OS|ID=debian",
  "OS|VERSION_ID=12",
  "OS|VERSION_CODENAME=bookworm",
  "OS|PRETTY_NAME=Debian GNU/Linux 12 (bookworm)",
  "TOOL|apt-get|/usr/bin/apt-get",
  "TOOL|systemctl|/usr/bin/systemctl",
];

function scan(text: string, inContainer = false): Status {
  return analyze(parseProbe(text), "host1", { inContainer, probe: "sh" });
}

function only(s: Status, kind: Finding["kind"]): Finding {
  const f = s.findings.filter((x) => x.kind === kind);
  assertEquals(f.length, 1, `one ${kind} finding`);
  return f[0];
}

Deno.test("judgeBrotli: per-line fixes, pre-1.0.3 not affected", () => {
  assertEquals(judgeBrotli("1.2.0").verdict, "vulnerable");
  assertEquals(judgeBrotli("1.2.1").verdict, "patched");
  assertEquals(judgeBrotli("1.1.0").fixedVersion, "1.1.1");
  assertEquals(judgeBrotli("1.0.9").verdict, "vulnerable");
  assertEquals(judgeBrotli("1.0.10").verdict, "patched");
  assertEquals(judgeBrotli("1.0.2").verdict, "not-affected");
  assertEquals(judgeBrotli("1.3.0").verdict, "patched");
  assertEquals(judgeBrotli("garbage").verdict, "unknown");
});

Deno.test("judgeNode: fixed lines, EOL lines, later lines", () => {
  assertEquals(judgeNode("24.22.0").verdict, "vulnerable");
  assertEquals(judgeNode("24.22.1").verdict, "patched");
  assertEquals(judgeNode("22.23.3").fixedVersion, "22.23.4");
  assertEquals(judgeNode("26.12.1").verdict, "patched");
  assertEquals(judgeNode("20.20.2").verdict, "unsupported");
  assertEquals(judgeNode("25.9.0").verdict, "unsupported");
  assertEquals(judgeNode("27.0.0").verdict, "patched");
  assertEquals(judgeNode("").verdict, "unknown");
});

Deno.test("splitDistInfo reads dist-info and egg-info names", () => {
  assertEquals(splitDistInfo("brotli-1.2.0.dist-info"), {
    name: "brotli",
    version: "1.2.0",
  });
  assertEquals(splitDistInfo("brotlicffi-1.2.0.1.dist-info"), {
    name: "brotlicffi",
    version: "1.2.0.1",
  });
  assertEquals(splitDistInfo("Brotli-1.0.9-py3.11.egg-info"), {
    name: "Brotli",
    version: "1.0.9",
  });
  assertEquals(splitDistInfo("not-a-dist"), null);
});

Deno.test("Debian 12 with the security build: library, distro node and curl are patched", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "PKG|dpkg|libbrotli1|1.0.9-2+deb12u1",
    "PKG|dpkg|nodejs|18.20.4+dfsg-1~deb12u3",
    "PKG|dpkg|python3-brotli|1.0.9-2+deb12u1",
    "NODE|/usr/bin/node|nodejs|v18.20.4 1.0.9|/lib/x86_64-linux-gnu/libbrotlidec.so.1",
    "PYENV|/usr/lib/python3/dist-packages",
    "PYPKG|/usr/lib/python3/dist-packages|Brotli-1.0.9.egg-info",
    "CURL|/usr/bin/curl|curl|curl 7.88.1 (x86_64-pc-linux-gnu) libcurl/7.88.1 brotli/1.0.9 zstd/1.5.4|/lib/x86_64-linux-gnu/libbrotlidec.so.1",
    "PROCSCOPE|all",
  ));
  assertEquals(only(s, "libbrotli").verdict, "patched");
  assertEquals(only(s, "node").verdict, "patched");
  assertStringIncludes(only(s, "node").note, "links");
  assertEquals(only(s, "curl").verdict, "patched");
  // The distro binding is judged by its package, not again from dist-packages.
  assertEquals(only(s, "python").name, "python3-brotli");
  assertEquals(only(s, "python").verdict, "patched");
  assertEquals(s.vulnerable, false);
  assertEquals(s.riskLevel, "none");
  assertEquals(s.action, "none");
});

Deno.test("Debian 12 before the fix: vulnerable, update-available when apt has it", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "PKG|dpkg|libbrotli1|1.0.9-2",
    "NODE|/usr/bin/node|nodejs|v18.20.4 1.0.9|/lib/x86_64-linux-gnu/libbrotlidec.so.1",
  ));
  assertEquals(only(s, "libbrotli").verdict, "vulnerable");
  assertEquals(only(s, "libbrotli").fixedVersion, "1.0.9-2+deb12u1");
  // The linked node takes the library's verdict.
  assertEquals(only(s, "node").verdict, "vulnerable");
  assertEquals(s.action, "upgrade");

  const u = scan(probe(
    ...DEBIAN12,
    "PKG|dpkg|libbrotli1|1.0.9-2",
    "PENDING|dpkg|libbrotli1|1.0.9-2+deb12u1",
  ));
  assertEquals(only(u, "libbrotli").verdict, "update-available");
});

Deno.test("Debian sid at the pending build is vulnerable; a newer unknown build is check-vendor", () => {
  const sid = [
    "OS|ID=debian",
    "OS|VERSION_CODENAME=sid",
    "TOOL|apt-get|/usr/bin/apt-get",
  ];
  const s = scan(probe(...sid, "PKG|dpkg|libbrotli1|1.2.0-4"));
  assertEquals(only(s, "libbrotli").verdict, "vulnerable");
  assertEquals(only(s, "libbrotli").action, "stopgap");
  const newer = scan(probe(...sid, "PKG|dpkg|libbrotli1|1.2.0-5"));
  assertEquals(only(newer, "libbrotli").verdict, "check-vendor");
  // Upstream 1.2.1 is fixed whatever the tracker says.
  const fixed = scan(probe(...sid, "PKG|dpkg|libbrotli1|1.2.1-1"));
  assertEquals(only(fixed, "libbrotli").verdict, "patched");
});

Deno.test("Amazon Linux 2023: pending brotli, tracked node packages", () => {
  const s = scan(probe(
    "OS|ID=amzn",
    "OS|VERSION_ID=2023",
    "PKG|rpm|libbrotli|1.0.9-4.amzn2023.0.2",
    "PKG|rpm|nodejs22|22.20.0-1.amzn2023.0.1",
    "PKG|rpm|nodejs20|20.19.5-1.amzn2023.0.1",
    "NODE|/usr/bin/node-22|nodejs22|v22.20.0 1.0.9|",
    "NODE|/usr/bin/node-20|nodejs20|v20.19.5 1.0.9|",
  ));
  assertEquals(only(s, "libbrotli").verdict, "vulnerable");
  const nodes = s.findings.filter((f) => f.kind === "node");
  assertEquals(
    nodes.find((n) => n.packageName === "nodejs22")?.verdict,
    "not-affected",
  );
  assertEquals(
    nodes.find((n) => n.packageName === "nodejs20")?.verdict,
    "unsupported",
  );
});

Deno.test("Alpine with no tracker entry is check-vendor below the upstream fix", () => {
  const s = scan(probe(
    "OS|ID=alpine",
    "OS|VERSION_ID=3.22.7",
    "TOOL|apk|/sbin/apk",
    "APKPKG|brotli-libs-1.1.0-r2",
    "APKPENDING|brotli-libs-1.1.0-r2|1.1.0-r3",
  ));
  const lib = only(s, "libbrotli");
  assertEquals(lib.verdict, "check-vendor");
  assertEquals(lib.action, "upgrade");
  assertStringIncludes(lib.note, "1.1.0-r3");
  assertEquals(s.riskLevel, "medium");
});

Deno.test("Upstream node: 24.22.0 vulnerable, 24.22.1 patched, 20 unsupported", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "NODE|/home/a/.nvm/versions/node/v24.22.0/bin/node||v24.22.0 1.2.0|",
    "NODE|/home/a/.nvm/versions/node/v24.22.1/bin/node||v24.22.1 1.2.1|",
    "NODE|/usr/local/bin/node||v20.20.2 1.1.0|",
  ));
  const by = (p: string) => s.findings.find((f) => f.path.includes(p))!;
  assertEquals(by("v24.22.0").verdict, "vulnerable");
  assertEquals(by("v24.22.0").action, "upgrade");
  assertEquals(by("v24.22.1").verdict, "patched");
  assertEquals(by("/usr/local/bin/node").verdict, "unsupported");
  assertEquals(s.riskLevel, "high");
});

Deno.test("macOS: Homebrew node follows Homebrew brotli", () => {
  const mac = [
    "OS|ID=macos",
    "OS|VERSION_ID=27.0",
    "TOOL|brew|/opt/homebrew/bin/brew",
  ];
  const node =
    "NODE|/opt/homebrew/Cellar/node@24/24.21.0/bin/node|brew:node@24|v24.21.0 1.2.0|/opt/homebrew/opt/brotli/lib/libbrotlidec.1.dylib";
  const bad = scan(
    probe(
      ...mac,
      "PKG|brew|brotli|1.2.0",
      "PKG|brew|node@24|24.21.0",
      node,
      "PROCSCOPE|none",
    ),
  );
  assertEquals(only(bad, "libbrotli").verdict, "vulnerable");
  assertEquals(only(bad, "node").verdict, "vulnerable");
  assertEquals(only(bad, "node").source, "brew");
  // The fix is Homebrew's brotli, named as such, not a bare Node version.
  assertEquals(only(bad, "node").fixedVersion, "brotli 1.2.1");
  assert(bad.notChecked.some((n) => n.includes("not checked")));
  const good = scan(probe(...mac, "PKG|brew|brotli|1.2.1", node));
  assertEquals(only(good, "libbrotli").verdict, "patched");
  assertEquals(only(good, "node").verdict, "patched");
});

Deno.test("Python: pip Brotli and brotlicffi with auto-decoding clients", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "PYENV|/srv/app/.venv/lib/python3.12/site-packages",
    "PYPKG|/srv/app/.venv/lib/python3.12/site-packages|brotli-1.2.0.dist-info",
    "PYPKG|/srv/app/.venv/lib/python3.12/site-packages|urllib3-2.8.0.dist-info",
    "PYENV|/opt/other/lib/python3.12/site-packages",
    "PYPKG|/opt/other/lib/python3.12/site-packages|brotlicffi-1.2.0.2.dist-info",
    "PYENV|/opt/fixed/lib/python3.12/site-packages",
    "PYPKG|/opt/fixed/lib/python3.12/site-packages|brotlicffi-1.2.1.0.dist-info",
  ));
  const py = s.findings.filter((f) => f.kind === "python");
  assertEquals(py.length, 3);
  const brotli = py.find((f) => f.name === "brotli")!;
  assertEquals(brotli.verdict, "vulnerable");
  assertEquals(brotli.fixedVersion, "1.2.1");
  assert(brotli.exposure.some((e) => e.startsWith("urllib3")));
  assertEquals(
    py.find((f) => f.path.startsWith("/opt/other"))?.verdict,
    "vulnerable",
  );
  assertEquals(
    py.find((f) => f.path.startsWith("/opt/fixed"))?.verdict,
    "patched",
  );
  assertEquals(s.exposure.autoDecodingClients, [
    "urllib3 in /srv/app/.venv/lib/python3.12/site-packages",
  ]);
});

Deno.test(".NET: Microsoft builds have no fix; distro builds follow linkage", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "PKG|dpkg|libbrotli1|1.0.9-2+deb12u1",
    "DOTNET|/usr/share/dotnet/shared/Microsoft.NETCore.App/8.0.21|8.0.21||",
    "DOTNET|/usr/lib/dotnet/shared/Microsoft.NETCore.App/8.0.20|8.0.20|dotnet-runtime-8.0|/lib/x86_64-linux-gnu/libbrotlidec.so.1",
    "DOTNET|/usr/lib64/dotnet/shared/Microsoft.NETCore.App/9.0.9|9.0.9|dotnet-runtime-9.0|",
  ));
  const d = s.findings.filter((f) => f.kind === "dotnet");
  assertEquals(
    d.find((f) => f.version === "8.0.21")?.verdict,
    "no-fix-released",
  );
  assertEquals(d.find((f) => f.version === "8.0.20")?.verdict, "patched");
  assertEquals(d.find((f) => f.version === "9.0.9")?.verdict, "check-vendor");
  assert(s.stopgaps.length > 0);
});

Deno.test("Envoy, Istio, Bun and the Ruby gem by version", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "ENVOY|/usr/local/bin/envoy|1.38.5",
    "ISTIO|/usr/local/bin/pilot-agent|1.31.2",
    "BUN|/root/.bun/bin/bun|1.4.3",
    "GEM|/var/lib/gems/3.1.0/gems/brotli-0.9.0",
  ));
  assertEquals(only(s, "envoy").verdict, "vulnerable");
  assertEquals(only(s, "envoy").fixedVersion, "1.38.6");
  assertEquals(only(s, "istio").verdict, "patched");
  assertEquals(only(s, "bun").verdict, "vulnerable");
  assertEquals(only(s, "ruby-gem").verdict, "vulnerable");
  const old = scan(probe(...DEBIAN12, "ENVOY|/usr/local/bin/envoy|1.35.2"));
  assertEquals(only(old, "envoy").verdict, "unsupported");
  // Pointed at a supported line, not the out-of-support 1.36.12.
  assertEquals(only(old, "envoy").fixedVersion, "1.37.8");
  const oldIstio = scan(
    probe(...DEBIAN12, "ISTIO|/usr/local/bin/pilot-agent|1.28.4"),
  );
  assertEquals(only(oldIstio, "istio").fixedVersion, "1.30.6");
});

Deno.test("curl: no Brotli is not affected; static upstream judged by version", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "CURL|/usr/bin/curl||curl 8.7.1 (x86_64-apple-darwin) libcurl/8.7.1 zlib/1.2.12|",
  ));
  assertEquals(only(s, "curl").verdict, "not-affected");
  const st = scan(probe(
    ...DEBIAN12,
    "CURL|/opt/curl/bin/curl||curl 8.17.0 (x86_64-pc-linux-gnu) libcurl/8.17.0 brotli/1.2.0|",
  ));
  assertEquals(only(st, "curl").verdict, "vulnerable");
});

Deno.test("Lockfiles: pins, and express 5 as inbound exposure", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "LOCK|/srv/a/requirements.txt|1:brotli==1.2.0",
    "LOCK|/srv/a/requirements.txt|2-requests==2.32.0",
    'LOCK|/srv/b/poetry.lock|2:name = "brotli"',
    'LOCK|/srv/b/poetry.lock|3-version = "1.2.1"',
    'LOCK|/srv/c/Pipfile.lock|10:        "brotlicffi": {',
    'LOCK|/srv/c/Pipfile.lock|11-            "hashes": [],',
    'LOCK|/srv/c/Pipfile.lock|12-            "version": "==1.2.0.1"',
    'LOCK|/srv/d/package-lock.json|3:    "node_modules/express": {',
    'LOCK|/srv/d/package-lock.json|4-      "version": "5.1.0",',
    'LOCK|/srv/f/package-lock.json|3:    "node_modules/express": {',
    'LOCK|/srv/f/package-lock.json|4-      "version": "5.4.0",',
    'LOCK|/srv/d/package-lock.json|9:    "node_modules/body-parser": {',
    'LOCK|/srv/d/package-lock.json|10-      "version": "1.20.3",',
    "LOCK|/srv/e/Gemfile.lock|7:    brotli (0.9.1)",
  ));
  const locks = s.findings.filter((f) => f.kind === "lockfile");
  assertEquals(locks.length, 4);
  assertEquals(
    locks.find((l) => l.path.endsWith("requirements.txt"))?.action,
    "update-pin",
  );
  assertEquals(
    locks.find((l) => l.path.endsWith("poetry.lock"))?.verdict,
    "patched",
  );
  assertEquals(
    locks.find((l) => l.path.endsWith("Pipfile.lock"))?.verdict,
    "vulnerable",
  );
  assertEquals(
    locks.find((l) => l.path.endsWith("Gemfile.lock"))?.verdict,
    "patched",
  );
  // express 5.1.0 and 5.4.0 inflate Brotli; body-parser 1.x does not.
  assertEquals(s.exposure.inboundMiddleware.length, 2);
  assert(s.exposure.inboundMiddleware.some((m) => m.includes("express 5.1.0")));
  assert(s.exposure.inboundMiddleware.some((m) => m.includes("express 5.4.0")));
  // Only pins are affected: low, not high.
  assertEquals(s.riskLevel, "low");
});

Deno.test("A fixed library still mapped deleted by a process needs a restart", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "PKG|dpkg|libbrotli1|1.0.9-2+deb12u1",
    "PROCSCOPE|all",
    "MAPS|812|node|api.service|/usr/lib/x86_64-linux-gnu/libbrotlidec.so.1.0.9",
  ));
  assertEquals(only(s, "libbrotli").verdict, "restart-required");
  assertEquals(only(s, "libbrotli").action, "restart");
  assertEquals(s.staleProcesses[0].unit, "api.service");
  assertEquals(s.action, "restart");
  assert(s.vulnerable);
});

Deno.test("A binary that was not run says so, and keeps its install-directory version", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "NOTRUN|/home/bob/.nvm/versions/node/v24.22.0/bin/node",
    "NODE|/home/bob/.nvm/versions/node/v24.22.0/bin/node||v24.22.0|?",
    "NOTRUN|/home/bob/.bun/bin/bun",
    "BUN|/home/bob/.bun/bin/bun|",
    "NOTRUN|/opt/odd/bin/curl",
  ));
  const node = only(s, "node");
  assertEquals(node.verdict, "vulnerable");
  assertStringIncludes(node.note, "Not run:");
  assertEquals(only(s, "bun").verdict, "unknown");
  assertStringIncludes(only(s, "bun").note, "Not run:");
  assert(s.notChecked.some((n) => n.includes("/opt/odd/bin/curl")));
});

Deno.test("A non-root scan says other users' processes were not checked", () => {
  const s = scan(
    probe(...DEBIAN12, "PROCSCOPE|own").replace("UID|0", "UID|1000"),
  );
  assert(s.notChecked.some((n) => n.includes("Only this user's processes")));
  assertEquals(s.runAsRoot, false);
});

Deno.test("Express in a lockfile is exposure, but does not make an affected host critical", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "NODE|/usr/local/bin/node||v24.22.0 1.2.0|",
    'LOCK|/srv/d/package-lock.json|3:    "node_modules/express": {',
    'LOCK|/srv/d/package-lock.json|4-      "version": "5.1.0",',
  ));
  assertEquals(s.exposure.inboundMiddleware.length, 1);
  assertEquals(s.riskLevel, "high");
});

Deno.test("Exposure: a public node listener makes an affected host critical", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "NODE|/usr/local/bin/node||v24.22.0 1.2.0|",
    'LISTEN|LISTEN 0 511 0.0.0.0:3000 0.0.0.0:* users:(("node",pid=77,fd=21))',
    'LISTEN|LISTEN 0 511 127.0.0.1:9229 0.0.0.0:* users:(("node",pid=77,fd=22))',
  ));
  assertEquals(s.exposure.exposedListeners.length, 1);
  assertEquals(s.exposure.exposedListeners[0].local, "0.0.0.0:3000");
  assertEquals(s.riskLevel, "critical");
});

Deno.test("Containers: affected findings become rebuild-image", () => {
  const s = scan(
    probe(
      ...DEBIAN12,
      "INCONTAINER|1",
      "NODE|/usr/local/bin/node||v24.22.0 1.2.0|",
    ),
  );
  assertEquals(only(s, "node").action, "rebuild-image");
  assertEquals(s.action, "rebuild-image");
  assert(s.recommendations[0].startsWith("Rebuild this image"));
});

Deno.test("Windows probe output: node.exe, pip Brotli, .NET and System32 curl", () => {
  const s = analyze(
    parseProbe([
      "HOSTNAME|WIN1\r",
      "KERNEL|Windows\r",
      "OS|ID=windows\r",
      "OS|VERSION_ID=10.0.26100\r",
      "UID|0\r",
      "NODE|C:\\Program Files\\nodejs\\node.exe||24.22.0|\r",
      "PYENV|C:\\Python312\\Lib\\site-packages\r",
      "PYPKG|C:\\Python312\\Lib\\site-packages|brotli-1.2.0.dist-info\r",
      "DOTNET|C:\\Program Files\\dotnet\\shared\\Microsoft.NETCore.App\\8.0.21|8.0.21||\r",
      "CURL|C:\\Windows\\System32\\curl.exe|windows|curl 8.14.1 (Windows) libcurl/8.14.1 Schannel zlib/1.3.1 brotli/1.1.0 libssh2/1.11.1|\r",
      "PROCSCOPE|all\r",
      "MAPS|4242|node||C:\\Program Files\\nodejs\\node.exe\r",
      "END|1\r",
    ].join("\n")),
    "win1",
    { inContainer: false, probe: "powershell" },
  );
  assertEquals(s.os.id, "windows");
  assertEquals(only(s, "node").verdict, "vulnerable");
  assertEquals(only(s, "python").verdict, "vulnerable");
  assertEquals(only(s, "dotnet").verdict, "no-fix-released");
  assertEquals(only(s, "curl").verdict, "check-vendor");
  assertEquals(only(s, "curl").source, "vendor");
});

Deno.test("Malformed and partial probe output never reads as patched", () => {
  // Cut off before END: incomplete.
  const cut = parseProbe("HOSTNAME|h\nUID|0\nPKG|dpkg|libbrotli1|1.0.9-2");
  assertEquals(cut.complete, false);
  const s = scan(probe(
    ...DEBIAN12,
    "UNREADABLE|/proc/1/maps",
    "SOMETHINGNEW|x|y",
    "garbage line without a bar",
    "NODE|/usr/local/bin/node||vX.Y not-a-version|",
    "BUN|/usr/local/bin/bun|",
    "ENVOY|/usr/local/bin/envoy|dev",
    "PYPKG|/x/lib/python3.12/site-packages|brotli-weird.dist-info",
    "MAPS|notapid|node||/x",
    // An identity line after the body is ignored, so root stays root.
    "UID|abc",
  ));
  assertEquals(only(s, "node").verdict, "unknown");
  assertEquals(only(s, "bun").verdict, "unknown");
  assertEquals(only(s, "envoy").verdict, "unknown");
  assertEquals(s.findings.filter((f) => f.kind === "python").length, 0);
  assertEquals(s.staleProcesses.length, 0);
  assertEquals(s.runAsRoot, true);
  assertEquals(s.riskLevel, "medium");
});

Deno.test("No-sh image: only the runtimes were checked", () => {
  const s = analyze(
    parseProbe(probe(
      "INCONTAINER|1",
      "NOSH|1",
      "NODE|/nodejs/bin/node||v24.14.0 1.2.0|?",
      "PROCSCOPE|none",
    )),
    "gcr.io/distroless/nodejs24-debian12",
    { inContainer: true, probe: "direct" },
  );
  assertEquals(only(s, "node").verdict, "vulnerable");
  assertStringIncludes(
    only(s, "node").note,
    "Could not check its linked libraries",
  );
  assertEquals(s.notChecked.length, 1);
  assertStringIncludes(s.notChecked[0], "no sh");
});

Deno.test("A link to a different Brotli (MacPorts) does not take Homebrew's rating", () => {
  const s = scan(probe(
    "OS|ID=macos",
    "PKG|brew|brotli|1.2.1",
    "NODE|/opt/local/bin/node||v24.22.1 1.2.0|/opt/local/lib/libbrotlidec.1.dylib",
  ));
  const node = only(s, "node");
  // Judged by the Brotli it actually loads (1.2.0), not Homebrew's patched one.
  assert(!node.note.includes("fixed by brotli"));
  assertEquals(node.verdict, "vulnerable");
  assertEquals(node.fixedVersion, "1.2.1");
});

Deno.test("A stale _brotli module only marks the environment it lives in", () => {
  const s = scan(probe(
    ...DEBIAN12,
    "PYENV|/opt/app/lib/python3.11/site-packages|0|drwxr-xr-x||1",
    "PYPKG|/opt/app/lib/python3.11/site-packages|brotli-1.2.1.dist-info",
    "PROCSCOPE|all",
    "MAPS|7|python3|w.service|/opt/app/lib/python3.11/site-packages-old/_brotli.cpython-311.so",
  ));
  assertEquals(only(s, "python").verdict, "patched");
});

Deno.test("Forged probe lines cannot fake identity, units or completeness", () => {
  const f = parseProbe([
    "HOSTNAME|web1",
    "UID|0",
    "OS|ID=debian",
    "OS|VERSION_ID=12",
    "PKG|dpkg|libbrotli1|1.0.9-2",
    // What a process name or directory name with a newline would inject.
    "INCONTAINER|1",
    "UID|1000",
    "HOME|/tmp/x",
    "OS|ID=windows",
    "TOOL|apt-get|/tmp/evil",
    // A unit that is not a system unit name, and a relative path.
    "MAPS|7|node|db.service x|/usr/lib/libbrotlidec.so.1",
    "LOADED|8|node|nginx.service|relative/libbrotlidec.so",
    "END|1",
    "PKG|dpkg|libbrotli1|1.0.9-2+deb12u1",
  ].join("\n"));
  assertEquals(f.inContainer, false);
  assertEquals(f.uid, 0);
  assertEquals(f.home, "");
  assertEquals(f.os.id, "debian");
  assertEquals(f.tools["apt-get"], undefined);
  assertEquals(f.maps[0].unit, null);
  assertEquals(f.loaded.length, 0);
  // END was not the last line: incomplete, never a clean result.
  assertEquals(f.complete, false);
});

Deno.test("MAPS and LOADED carry the process uid; the first UNIT line for a unit stands", () => {
  const f = parseProbe(probe(
    "MAPS|7|node|api.service|/usr/lib/libbrotlidec.so.1|1001",
    "MAPS|8|node|api.service|/usr/lib/libbrotlidec.so.1|root",
    "LOADED|9|node|api.service|/usr/lib/libbrotlidec.so.1",
    "UNIT|api.service|7|1001",
    "UNIT|api.service|8|0",
    "UNIT|bad unit.service|1|0",
    "UNIT|w.service|x|",
  ));
  assertEquals(f.maps.map((p) => p.uid), [1001, null]);
  assertEquals(f.loaded[0].uid, null);
  assertEquals(f.units, [
    { name: "api.service", mainPid: 7, uid: 1001 },
    { name: "w.service", mainPid: null, uid: null },
  ]);
});
