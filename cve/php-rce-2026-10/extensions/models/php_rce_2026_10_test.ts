import {
  assert,
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  analyze,
  classifyVersion,
  compareDebVersions,
  containerExitMessage,
  DROP_IN_NAME,
  dropInContent,
  failedMitigation,
  fpmListenKind,
  hostList,
  type IniScope,
  makeRunner,
  mitigateTarget,
  model,
  parseProbe,
  planMitigation,
  POWERSHELL_ARGV,
  POWERSHELL_END,
  preflightScript,
  PROBE_SCRIPT,
  renderStep,
  type RunResult,
  scanTarget,
  shQuote,
  TIMEOUT_EXIT,
  verdictFor,
  WINDOWS_PROBE_SCRIPT,
} from "./php_rce_2026_10.ts";

// --- Fixtures, modelled on real probe output -------------------------------

function probe(lines: string[]): string {
  return [...lines, "END|1"].join("\n");
}

/** php:8.2.34-apache, scanned from inside the container. */
const OFFICIAL_APACHE = probe([
  "HOSTNAME|b8600c0ec16c",
  "UID|0",
  "OS|PRETTY_NAME=Debian GNU/Linux 13 (trixie)",
  "OS|VERSION_ID=13",
  "OS|ID=debian",
  "INCONTAINER|1",
  "TOOL|apt-get|/usr/bin/apt-get",
  "TOOL|tee|/usr/bin/tee",
  "BIN|/usr/local/bin/php||PHP 8.2.34 (cli) (built: Oct 21 2026 00:35:21) (NTS)",
  "MODPHP|/usr/lib/apache2/modules/libphp.so|",
  "MODPHPENABLED|/etc/apache2/mods-enabled/php.load",
  "INIFILE|official|all|/usr/local/etc/php/conf.d/docker-php-ext-opcache.ini",
  "NOLISTEN|no ss or netstat",
  "HANDOFF|/etc/apache2/conf-enabled/docker-php.conf",
]);

/** php:8.4.26-fpm-alpine: FPM on all interfaces, no bash. */
const OFFICIAL_FPM_ALPINE = probe([
  "HOSTNAME|76dfa72346de",
  "UID|0",
  "OS|ID=alpine",
  "OS|VERSION_ID=3.24.2",
  "INCONTAINER|1",
  "TOOL|apk|/sbin/apk",
  "BIN|/usr/local/sbin/php-fpm||PHP 8.4.26 (fpm-fcgi) (built: Sep 24 2026 19:14:44) (NTS)",
  "BIN|/usr/local/bin/php||PHP 8.4.26 (cli) (built: Sep 24 2026 19:14:44) (NTS)",
  "INIFILE|official|all|/usr/local/etc/php/conf.d/docker-fpm.ini",
  "POOL|/usr/local/etc/php-fpm.d/docker.conf|listen = 9000",
]);

/** Debian bookworm VM: distro php8.2-fpm behind nginx on :80, unix socket. */
function bookwormVm(opts: {
  uid?: number;
  fpmVersion?: string;
  pending?: string[];
  services?: string[];
  extra?: string[];
} = {}) {
  const v = opts.fpmVersion ?? "8.2.34-1~deb12u1";
  return probe([
    "HOSTNAME|web-01",
    `UID|${opts.uid ?? 0}`,
    "OS|ID=debian",
    "OS|VERSION_ID=12",
    "OS|PRETTY_NAME=Debian GNU/Linux 12 (bookworm)",
    "TOOL|sudo|/usr/bin/sudo",
    "TOOL|apt-get|/usr/bin/apt-get",
    "TOOL|systemctl|/usr/bin/systemctl",
    "TOOL|tee|/usr/bin/tee",
    `BIN|/usr/sbin/php-fpm8.2|php8.2-fpm|PHP ${
      v.split("-")[0]
    } (fpm-fcgi) (built: Jul 1 2026)`,
    `BIN|/usr/bin/php8.2|php8.2-cli|PHP ${
      v.split("-")[0]
    } (cli) (built: Jul 1 2026)`,
    `PKG|dpkg|php8.2-fpm|${v}|install ok installed`,
    `PKG|dpkg|php8.2-cli|${v}|install ok installed`,
    `PKG|dpkg|php8.2-common|${v}|install ok installed`,
    ...(opts.pending ?? []),
    "APTLISTS|1792531950",
    "INIFILE|debian:8.2:fpm|fpm|/etc/php/8.2/fpm/php.ini",
    "INI|debian:8.2:fpm|fpm|/etc/php/8.2/fpm/php.ini|memory_limit|128M",
    "INI|debian:8.2:fpm|fpm|/etc/php/8.2/fpm/php.ini|session.upload_progress.enabled|On",
    "INIFILE|debian:8.2:cli|cli|/etc/php/8.2/cli/php.ini",
    "INI|debian:8.2:cli|cli|/etc/php/8.2/cli/php.ini|memory_limit|-1",
    "POOL|/etc/php/8.2/fpm/pool.d/www.conf|listen = /run/php/php8.2-fpm.sock",
    "LISTEN|LISTEN 0      511    0.0.0.0:80 0.0.0.0:*",
    "PROC|nginx",
    "PROC|php-fpm8.2",
    "HANDOFF|/etc/nginx/sites-enabled/default",
    ...(opts.services ?? []).map((s) => `SERVICE|${s}`),
    "UNREADABLE|/var/log/nginx/error.log",
    ...(opts.extra ?? []),
  ]);
}

/** RHEL 9: FPM on 0.0.0.0:9000 with a pool memory_limit override. */
const RHEL_FPM = probe([
  "HOSTNAME|app-02",
  "UID|0",
  "OS|ID=rhel",
  "OS|VERSION_ID=9.6",
  "TOOL|dnf|/usr/bin/dnf",
  "TOOL|systemctl|/usr/bin/systemctl",
  "TOOL|tee|/usr/bin/tee",
  "BIN|/usr/sbin/php-fpm|php-fpm|PHP 8.2.30 (fpm-fcgi) (built: Jun 3 2026)",
  "PKG|rpm|php-fpm|8.2.30-1.el9|installed",
  "PKG|rpm|php-common|8.2.30-1.el9|installed",
  "PENDING|dnf|php-fpm.x86_64 8.2.35-1.el9",
  "INIFILE|rhel|all|/etc/php.ini",
  "INI|rhel|all|/etc/php.ini|memory_limit|256M",
  "POOL|/etc/php-fpm.d/www.conf|listen = 0.0.0.0:9000",
  "POOL|/etc/php-fpm.d/www.conf|php_admin_value[memory_limit] = -1",
  'LISTEN|LISTEN 0 511 0.0.0.0:9000 0.0.0.0:* users:(("php-fpm",pid=812,fd=8))',
  "SERVICE|php-fpm.service",
]);

/** Ubuntu 22.04 with Apache mod_php 8.1 from the archive. */
function jammyModPhp(version: string) {
  return probe([
    "HOSTNAME|legacy-01",
    "UID|0",
    "OS|ID=ubuntu",
    "OS|VERSION_ID=22.04",
    "TOOL|apt-get|/usr/bin/apt-get",
    "TOOL|systemctl|/usr/bin/systemctl",
    `BIN|/usr/bin/php8.1|php8.1-cli|PHP ${version} (cli) (built: Oct 20 2026)`,
    "MODPHP|/usr/lib/apache2/modules/libphp8.1.so|libapache2-mod-php8.1",
    "MODPHPENABLED|/etc/apache2/mods-enabled/php8.1.load",
    `PKG|dpkg|php8.1-cli|${version}|install ok installed`,
    `PKG|dpkg|libapache2-mod-php8.1|${version}|install ok installed`,
    "INIFILE|debian:8.1:apache2|apache2|/etc/php/8.1/apache2/php.ini",
    "LISTEN|LISTEN 0 511 *:443 *:*",
    "PROC|apache2",
    "SERVICE|apache2.service",
    "OVR|apache|/etc/apache2/sites-enabled/app.conf:12:  php_value auto_detect_line_endings 1",
  ]);
}

const NO_PHP = probe([
  "HOSTNAME|db-01",
  "UID|1000",
  "OS|ID=debian",
  "OS|VERSION_ID=12",
  "DOCKERDENIED|permission denied while trying to connect to the Docker daemon socket",
]);

/** A Docker host running an official php-fpm container with a published port. */
const DOCKER_HOST = probe([
  "HOSTNAME|docker-01",
  "UID|0",
  "OS|ID=debian",
  "OS|VERSION_ID=12",
  "CONTAINER|8.3.35|4f2a9c1e0b7d|php:8.3.35-fpm|shop-fpm|0.0.0.0:9000->9000/tcp",
  "CONTAINER||9a8b7c6d5e4f|redis:7|cache|6379/tcp",
  "HTACCESS_TRUNCATED|500",
  "LOG|/var/log/nginx/error.log|3",
]);

const ctx = {
  osId: "debian",
  osVersionId: "12",
  pendingPackages: new Set<string>(),
};

// --- Model shape -------------------------------------------------------------

Deno.test("model export has expected shape", () => {
  assertEquals(model.type, "@swamp/cve/php-rce-2026-10");
  assertEquals(
    new Set(Object.keys(model.methods)),
    new Set(["scan", "scanFleet", "mitigate"]),
  );
  assertEquals(Object.keys(model.resources), ["status"]);
  assertEquals(model.reports, ["@swamp/cve/php-rce-2026-10-report"]);
  assertEquals(model.files.log.streaming, true);
});

Deno.test("globalArguments defaults to localhost as root", () => {
  const g = model.globalArguments.parse({});
  assertEquals(g.targetHost, "localhost");
  assertEquals(g.sshUser, "root");
  assertEquals(g.dockerContainer, undefined);
});

Deno.test("mitigate defaults: dry run, no config changes, 32M", () => {
  const a = model.methods.mitigate.arguments.parse({});
  assertEquals(a.dryRun, true);
  assertEquals(a.applyConfigMitigations, false);
  assertEquals(a.postMaxSize, "32M");
  assertEquals(
    model.methods.mitigate.arguments.safeParse({ postMaxSize: "lots" }).success,
    false,
  );
});

Deno.test("scanFleet requires hosts", () => {
  assertEquals(model.methods.scanFleet.arguments.safeParse({}).success, false);
});

// --- Versions ----------------------------------------------------------------

Deno.test("classifyVersion at every branch boundary", () => {
  const cases: [string | null, string, string | null][] = [
    ["8.2.34", "vulnerable", "8.2.35"],
    ["8.2.35", "patched", "8.2.35"],
    ["8.3.35", "vulnerable", "8.3.36"],
    ["8.3.36", "patched", "8.3.36"],
    ["8.4.26", "vulnerable", "8.4.27"],
    ["8.4.27", "patched", "8.4.27"],
    ["8.5.11", "vulnerable", "8.5.12"],
    ["8.5.12", "patched", "8.5.12"],
    ["8.5.13", "patched", "8.5.12"],
    ["8.1.33", "unsupported", null],
    ["7.4.33", "unsupported", null],
    ["5.6.40", "unsupported", null],
    ["8.6.0RC3", "unknown", null],
    ["8.2.34-1~deb12u1", "vulnerable", "8.2.35"],
    ["1:8.2.35-1", "patched", "8.2.35"],
    [null, "unknown", null],
    ["garbage", "unknown", null],
  ];
  for (const [v, status, fixed] of cases) {
    const c = classifyVersion(v);
    assertEquals([v, c.status, c.fixedVersion], [v, status, fixed]);
  }
});

Deno.test("compareDebVersions follows dpkg ordering", () => {
  assert(compareDebVersions("8.2.34-1~deb12u1", "8.2.35-1~deb12u1") < 0);
  assert(compareDebVersions("8.4.27-1~deb13u1", "8.4.27-1~deb13u1") === 0);
  assert(compareDebVersions("8.4.27-1", "8.4.27-1~deb13u1") > 0);
  assert(compareDebVersions("8.1.2-1ubuntu2.28", "8.1.2-1ubuntu2.9") > 0);
  assert(compareDebVersions("8.1.2-1ubuntu2.27", "8.1.2-1ubuntu2.28") < 0);
  assert(compareDebVersions("1.0~rc1", "1.0") < 0);
  assert(compareDebVersions("1:1.0", "2.0") > 0);
  assert(
    compareDebVersions("8.3.6-0ubuntu0.24.04.13", "8.3.6-0ubuntu0.24.04.4") > 0,
  );
});

Deno.test("verdictFor: upstream builds compare against the fixed release", () => {
  const base = {
    source: "upstream" as const,
    packageName: null,
    packageVersion: null,
  };
  assertEquals(
    verdictFor({ ...base, version: "8.4.26" }, ctx).verdict,
    "vulnerable",
  );
  assertEquals(
    verdictFor({ ...base, version: "8.4.27" }, ctx).verdict,
    "patched",
  );
  assertEquals(
    verdictFor({ ...base, version: "7.4.33" }, ctx).verdict,
    "unsupported",
  );
  assertEquals(
    verdictFor({ ...base, version: "8.6.0" }, ctx).verdict,
    "unknown",
  );
});

Deno.test("verdictFor: distro build below the fix is check-vendor, never vulnerable", () => {
  const v = verdictFor({
    version: "8.2.34",
    source: "distro",
    packageName: "php-fpm",
    packageVersion: "8.2.34-1.fc41",
  }, { osId: "fedora", osVersionId: "41", pendingPackages: new Set() });
  assertEquals(v.verdict, "check-vendor");
});

Deno.test("verdictFor: Debian build below a rebased tracker fix is update-available", () => {
  // Debian fixed bookworm and trixie with new upstream releases, so the
  // installed build's upstream differs from the fixed build's.
  const deb12 = verdictFor({
    version: "8.2.34",
    source: "distro",
    packageName: "php8.2-fpm",
    packageVersion: "8.2.34-1~deb12u1",
  }, ctx);
  assertEquals(deb12.verdict, "update-available");
  assertEquals(deb12.fixedVersion, "8.2.35-1~deb12u1");
  assertStringIncludes(deb12.note, "DLA-4848-1");
  const deb13 = verdictFor({
    version: "8.4.24",
    source: "distro",
    packageName: "libapache2-mod-php8.4",
    packageVersion: "8.4.24-1~deb13u1",
  }, { osId: "debian", osVersionId: "13", pendingPackages: new Set() });
  assertEquals(deb13.verdict, "update-available");
  assertStringIncludes(deb13.note, "DSA-6574-1");
});

Deno.test("verdictFor: a Sury build below the tracker fix is not given the distro's fix", () => {
  const below = verdictFor({
    version: "8.3.5",
    source: "distro",
    packageName: "php8.3-fpm",
    packageVersion: "8.3.5-1+ubuntu24.04.1+deb.sury.org+1",
  }, { osId: "ubuntu", osVersionId: "24.04", pendingPackages: new Set() });
  assertEquals(below.verdict, "vulnerable");
  assertEquals(below.fixedVersion, "8.3.36");
});

Deno.test("verdictFor: distro build at the upstream fix is patched", () => {
  const v = verdictFor({
    version: "8.2.35",
    source: "distro",
    packageName: "php8.2-fpm",
    packageVersion: "8.2.35-1~deb12u1",
  }, ctx);
  assertEquals(v.verdict, "patched");
});

Deno.test("verdictFor: tracker-confirmed Ubuntu backport is patched", () => {
  const v = verdictFor({
    version: "8.1.2-1ubuntu2.28",
    source: "distro",
    packageName: "libapache2-mod-php8.1",
    packageVersion: "8.1.2-1ubuntu2.28",
  }, { osId: "ubuntu", osVersionId: "22.04", pendingPackages: new Set() });
  assertEquals(v.verdict, "patched");
  assertStringIncludes(v.note, "USN-8948-1");
});

Deno.test("verdictFor: older Ubuntu build with a tracker fix is update-available", () => {
  const v = verdictFor({
    version: "8.1.2",
    source: "distro",
    packageName: "php8.1-cli",
    packageVersion: "8.1.2-1ubuntu2.27",
  }, { osId: "ubuntu", osVersionId: "22.04", pendingPackages: new Set() });
  assertEquals(v.verdict, "update-available");
  assertEquals(v.fixedVersion, "8.1.2-1ubuntu2.28");
});

Deno.test("verdictFor: a Sury build below the fix is not taken for an Ubuntu backport", () => {
  const ubuntu = {
    osId: "ubuntu",
    osVersionId: "24.04",
    pendingPackages: new Set<string>(),
  };
  const sury = verdictFor({
    version: "8.3.35",
    source: "distro",
    packageName: "php8.3-fpm",
    packageVersion: "8.3.35-1+ubuntu24.04.1+deb.sury.org+1",
  }, ubuntu);
  assertEquals(sury.verdict, "vulnerable");
  assertEquals(sury.fixedVersion, "8.3.36");
  // Any other repo's build with a newer upstream is the vendor's to confirm.
  const other = verdictFor({
    version: "8.3.35",
    source: "distro",
    packageName: "php8.3-fpm",
    packageVersion: "8.3.35-1",
  }, ubuntu);
  assertEquals(other.verdict, "check-vendor");
  const fixedSury = verdictFor({
    version: "8.3.36",
    source: "distro",
    packageName: "php8.3-fpm",
    packageVersion: "8.3.36-1+ubuntu24.04.1+deb.sury.org+1",
  }, ubuntu);
  assertEquals(fixedSury.verdict, "patched");
});

Deno.test("verdictFor: a pending package update is update-available", () => {
  const v = verdictFor({
    version: "8.2.30",
    source: "distro",
    packageName: "php-fpm",
    packageVersion: "8.2.30-1.el9",
  }, {
    osId: "rhel",
    osVersionId: "9.6",
    pendingPackages: new Set(["php-fpm"]),
  });
  assertEquals(v.verdict, "update-available");
});

Deno.test("fpmListenKind", () => {
  assertEquals(fpmListenKind("/run/php/php8.2-fpm.sock"), "socket");
  assertEquals(fpmListenKind("127.0.0.1:9000"), "loopback");
  assertEquals(fpmListenKind("[::1]:9000"), "loopback");
  assertEquals(fpmListenKind("9000"), "public");
  assertEquals(fpmListenKind("0.0.0.0:9000"), "public");
  assertEquals(fpmListenKind("[::]:9000"), "public");
  assertEquals(fpmListenKind("10.0.0.5:9000"), "public");
});

// --- Probe parsing and analysis ---------------------------------------------

Deno.test("probe script is POSIX sh, not bash", () => {
  // bash's [[ test; awk's [[] bracket expression is fine.
  assert(!/\[\[\s/.test(PROBE_SCRIPT));
  assert(!PROBE_SCRIPT.includes("/dev/tcp"));
  assertStringIncludes(PROBE_SCRIPT, "dpkg-query -W -f='PKG|dpkg|${Package}");
});

Deno.test("parseProbe ignores unknown and malformed lines", () => {
  const f = parseProbe("noise\nWHAT|ever\nHOSTNAME|h\nUID|x\nEND|1");
  assertEquals(f.hostname, "h");
  assertEquals(f.uid, null);
  assert(f.complete);
});

Deno.test("official apache image: mod_php is critical and needs a rebuild", () => {
  const s = analyze(parseProbe(OFFICIAL_APACHE), "php:8.2.34-apache", {
    inContainer: true,
  });
  assertEquals(s.riskLevel, "critical");
  assertEquals(s.action, "rebuild-image");
  const mod = s.installs.find((i) => i.kind === "mod_php")!;
  assertEquals(mod.version, "8.2.34");
  assertEquals(mod.serving, true);
  assertEquals(mod.verdict, "vulnerable");
  assertEquals(mod.fixedVersion, "8.2.35");
  assert(s.recommendations.some((r) => r.includes("8.2.35 or newer")));
  assert(s.recommendations.some((r) => r.includes("image's php.ini")));
  // The ini layout key ("official") is internal; name the directory.
  assert(
    s.recommendations.some((r) =>
      r.includes("for the PHP configured in /usr/local/etc/php/conf.d are")
    ),
  );
  assert(!s.recommendations.some((r) => r.includes("for official")));
});

Deno.test("official fpm-alpine image: FPM on all interfaces is publicly reachable", () => {
  const s = analyze(parseProbe(OFFICIAL_FPM_ALPINE), "fpm", {
    inContainer: false,
  });
  assert(s.inContainer);
  assert(s.exposure.publiclyListening);
  const fpm = s.installs.find((i) => i.sapi === "fpm")!;
  assertEquals(fpm.publiclyReachable, true);
  assertEquals(fpm.risk, "critical");
  const cli = s.installs.find((i) => i.sapi === "cli")!;
  assertEquals(cli.risk, "medium");
  assertEquals(s.exposure.iniScopes[0].confDir, "/usr/local/etc/php/conf.d");
});

Deno.test("bookworm VM: distro FPM below DLA-4848-1 behind public nginx is upgrade and critical", () => {
  const s = analyze(parseProbe(bookwormVm()), "web-01", { inContainer: false });
  assertEquals(s.riskLevel, "critical");
  assertEquals(s.action, "upgrade");
  assert(s.exposure.publiclyListening);
  assert(s.exposure.evidence.some((e) => e.includes("0.0.0.0:80")));
  const fpm = s.installs.find((i) => i.sapi === "fpm")!;
  assertEquals(fpm.packageName, "php8.2-fpm");
  assertEquals(fpm.verdict, "update-available");
  const scope = s.exposure.iniScopes.find((x) => x.scope === "debian:8.2:fpm")!;
  assertEquals(scope.sessionUploadProgress, true);
  assertEquals(scope.memoryLimitFinite, true);
  assertEquals(scope.confDir, "/etc/php/8.2/fpm/conf.d");
  // The CLI's memory_limit=-1 must not leak into the FPM scope.
  assertEquals(
    s.exposure.iniScopes.find((x) => x.scope === "debian:8.2:cli")!.memoryLimit,
    "-1",
  );
  assertEquals(s.unreadable, ["/var/log/nginx/error.log"]);
});

Deno.test("bookworm VM with a pending update: upgrade, critical when public", () => {
  const s = analyze(
    parseProbe(bookwormVm({
      pending: [
        "PENDING|apt|php8.2-fpm/bookworm-security 8.2.35-1~deb12u1 amd64 [upgradable from: 8.2.34-1~deb12u1]",
      ],
    })),
    "web-01",
    { inContainer: false },
  );
  const fpm = s.installs.find((i) => i.sapi === "fpm")!;
  assertEquals(fpm.verdict, "update-available");
  assertEquals(fpm.action, "upgrade");
  assertEquals(s.riskLevel, "critical");
  assertEquals(s.action, "upgrade");
  assertEquals(s.pendingUpdates, ["php8.2-fpm 8.2.35-1~deb12u1"]);
});

Deno.test("RHEL: pool php_admin_value overrides php.ini and public FPM is critical", () => {
  const s = analyze(parseProbe(RHEL_FPM), "app-02", { inContainer: false });
  const scope = s.exposure.iniScopes.find((x) => x.scope === "rhel")!;
  assertEquals(scope.memoryLimit, "-1");
  assertEquals(scope.memoryLimitFinite, false);
  assertEquals(scope.poolOverrides, [
    "memory_limit=-1 (/etc/php-fpm.d/www.conf)",
  ]);
  const fpm = s.installs[0];
  assertEquals(fpm.verdict, "update-available");
  assertEquals(fpm.risk, "critical");
  assert(s.exposure.evidence.some((e) => e.includes("listen = 0.0.0.0:9000")));
});

Deno.test("Ubuntu 22.04 mod_php: patched backport vs older build", () => {
  const fixed = analyze(parseProbe(jammyModPhp("8.1.2-1ubuntu2.28")), "l", {
    inContainer: false,
  });
  assertEquals(fixed.riskLevel, "none");
  assert(fixed.installs.every((i) => i.verdict === "patched"));

  const old = analyze(parseProbe(jammyModPhp("8.1.2-1ubuntu2.27")), "l", {
    inContainer: false,
  });
  const mod = old.installs.find((i) => i.kind === "mod_php")!;
  assertEquals(mod.verdict, "update-available");
  assertEquals(mod.risk, "critical");
  assert(
    old.recommendations.some((r) => r.includes("Per-request INI overrides")),
  );
});

Deno.test("no PHP and docker permission denied", () => {
  const s = analyze(parseProbe(NO_PHP), "db-01", { inContainer: false });
  assertEquals(s.installs, []);
  assertEquals(s.riskLevel, "none");
  assertEquals(s.exposure.containersInspected, false);
  assert(s.recommendations.some((r) => r.includes("not inspected")));
});

Deno.test("docker host: php container with a published port is critical", () => {
  const s = analyze(parseProbe(DOCKER_HOST), "docker-01", {
    inContainer: false,
  });
  assertEquals(s.installs.length, 1);
  const c = s.installs[0];
  assertEquals(c.kind, "container");
  assertEquals(c.source, "docker-image");
  assertEquals(c.sapi, "fpm");
  assertEquals(c.publiclyReachable, true);
  assertEquals(c.risk, "critical");
  assertEquals(c.action, "rebuild-image");
  assert(s.exposure.htaccessScanTruncated);
  assertEquals(s.indicators.logHints, [{
    file: "/var/log/nginx/error.log",
    matches: 3,
  }]);
  assert(s.recommendations.some((r) => r.includes("not proof of compromise")));
});

Deno.test("PHP 8.5 scopes report fatal_error_backtraces, others do not", () => {
  const s = analyze(
    parseProbe(probe([
      "HOSTNAME|h",
      "UID|0",
      "BIN|/usr/sbin/php-fpm8.5||PHP 8.5.11 (fpm-fcgi)",
      "INIFILE|debian:8.5:fpm|fpm|/etc/php/8.5/fpm/php.ini",
      "INIFILE|debian:8.4:fpm|fpm|/etc/php/8.4/fpm/php.ini",
    ])),
    "h",
    { inContainer: false },
  );
  const s85 = s.exposure.iniScopes.find((x) => x.scope === "debian:8.5:fpm")!;
  const s84 = s.exposure.iniScopes.find((x) => x.scope === "debian:8.4:fpm")!;
  assertEquals(s85.fatalErrorBacktraces, true);
  assertEquals(s84.fatalErrorBacktraces, null);
});

// --- Mitigation planning -----------------------------------------------------

function plan(
  text: string,
  applyConfigMitigations = false,
  inContainer = false,
) {
  const facts = parseProbe(text);
  const status = analyze(facts, "t", { inContainer });
  return {
    status,
    facts,
    ...planMitigation(status, facts, {
      applyConfigMitigations,
      postMaxSize: "32M",
    }),
  };
}

Deno.test("apt plan refreshes lists, upgrades installed php packages, restarts FPM", () => {
  const p = plan(
    bookwormVm({ services: ["php8.2-fpm.service", "nginx.service"] }),
  );
  assertEquals(p.steps.map((s) => s.argv.slice(0, 2).join(" ")), [
    "apt-get update",
    "apt-get install",
    "systemctl restart",
  ]);
  assertEquals(p.steps[1].argv.slice(-3), [
    "php8.2-cli",
    "php8.2-common",
    "php8.2-fpm",
  ]);
  assertEquals(p.steps[2].argv[2], "php8.2-fpm.service");
});

Deno.test("dnf plan and apache restart only when mod_php is present", () => {
  const p = plan(RHEL_FPM);
  assertEquals(p.steps[0].argv.slice(0, 3), ["dnf", "upgrade", "-y"]);
  assertEquals(p.steps.at(-1)!.argv, [
    "systemctl",
    "restart",
    "php-fpm.service",
  ]);
  const m = plan(jammyModPhp("8.1.2-1ubuntu2.27"));
  assertEquals(m.steps.at(-1)!.argv, [
    "systemctl",
    "restart",
    "apache2.service",
  ]);
});

Deno.test("containers are never changed in place", () => {
  const p = plan(OFFICIAL_APACHE, true, true);
  assertEquals(p.steps, []);
  assert(p.notes[0].includes("rebuild"));
  const host = plan(DOCKER_HOST, true);
  assertEquals(host.steps, []);
  assert(host.notes.some((n) => n.includes("shop-fpm")));
});

Deno.test("harden steps are opt-in, conditional after an upgrade, and skip CLI scopes", () => {
  assertEquals(
    plan(bookwormVm()).steps.some((s) => s.phase === "harden"),
    false,
  );
  const p = plan(bookwormVm(), true);
  const harden = p.steps.filter((s) => s.phase === "harden");
  assertEquals(harden.length, 1);
  assertEquals(harden[0].conditional, true);
  assertEquals(
    harden[0].argv.at(-1),
    `/etc/php/8.2/fpm/conf.d/${DROP_IN_NAME}`,
  );
  assertStringIncludes(harden[0].content!, "memory_limit = -1");
  assertStringIncludes(
    harden[0].content!,
    "session.upload_progress.enabled = 0",
  );
  // PHP's 8M default is already below 32M, so the drop-in leaves it alone.
  assert(!harden[0].content!.includes("post_max_size"));
  assert(p.notes.some((n) => n.includes("left unchanged")));
  assert(!harden[0].content!.includes("fatal_error_backtraces"));
});

Deno.test("renderStep: root runs the binary, others use sudo -n without sh -c", () => {
  const p = plan(bookwormVm());
  const tools = p.facts.tools;
  assertEquals(renderStep(p.steps[0], tools, true), "/usr/bin/apt-get update");
  assertEquals(
    renderStep(p.steps[0], tools, false),
    "sudo -n -- /usr/bin/apt-get update",
  );
  assert(!renderStep(p.steps[1], tools, false).includes("sh -c"));
  assertEquals(
    shQuote("Dpkg::Options::=--force-confold"),
    "Dpkg::Options::=--force-confold",
  );
  assertEquals(shQuote("it's"), `'it'\\''s'`);
});

Deno.test("preflight checks each exact command, then lists sudo rules", () => {
  const p = plan(bookwormVm(), true);
  const script = preflightScript(p.steps, p.facts.tools);
  const lines = script.split("\n");
  assertEquals(lines.length, p.steps.length + 3);
  assertEquals(lines[0], "export LC_ALL=C");
  assertStringIncludes(lines[1], "/usr/bin/sudo -n -l /usr/bin/apt-get update");
  assertStringIncludes(
    lines[3],
    `/usr/bin/sudo -n -l /usr/bin/tee /etc/php/8.2/fpm/conf.d/${DROP_IN_NAME} >/dev/null`,
  );
  assertEquals(lines.at(-1), "/usr/bin/sudo -n -ll 2>/dev/null");
});

Deno.test("drop-ins skip conf.d of a branch with nothing unpatched", () => {
  const p = plan(
    bookwormVm({
      extra: ["INIFILE|debian:8.4:fpm|fpm|/etc/php/8.4/fpm/php.ini"],
    }),
    true,
  );
  const dests = p.steps.filter((s) => s.phase === "harden").map((s) =>
    s.argv[1]
  );
  assertEquals(dests, [`/etc/php/8.2/fpm/conf.d/${DROP_IN_NAME}`]);
});

// --- mitigateTarget with an in-memory host ----------------------------------

type FakeHost = {
  commands: string[];
  inputs: string[];
  run: (
    command: string,
    timeoutMs?: number,
    shell?: string,
    input?: string,
  ) => Promise<RunResult>;
};

/** `sudo -n -ll` for a user allowed every command without a password. */
const SUDO_LL_NOPASSWD = [
  "User deploy may run the following commands on web-01:",
  "",
  "Sudoers entry:",
  "    RunAsUsers: root",
  "    Options: !authenticate",
  "    Commands:",
  "\tALL",
];

function fakeHost(opts: {
  probes: string[];
  preflight?: (line: string) => boolean;
  sudoLl?: string[];
  fail?: (command: string) => boolean;
}): FakeHost {
  const commands: string[] = [];
  const inputs: string[] = [];
  let probeIndex = 0;
  return {
    commands,
    inputs,
    run: (command, _timeoutMs, _shell, input) => {
      commands.push(command);
      if (input !== undefined) inputs.push(input);
      let out: RunResult = { stdout: "", stderr: "", exitCode: 0 };
      if (command === PROBE_SCRIPT) {
        const text =
          opts.probes[Math.min(probeIndex++, opts.probes.length - 1)];
        out = { stdout: text, stderr: "", exitCode: 0 };
      } else if (command.startsWith("export LC_ALL=C")) {
        const checks = command.split("\n").filter((l) => l.startsWith("if "));
        out.stdout = [
          ...checks.map((line, i) =>
            (opts.preflight ?? (() => true))(line) ? `OK|${i}` : `NO|${i}`
          ),
          "@@ sudo-ll",
          ...(opts.sudoLl ?? SUDO_LL_NOPASSWD),
        ].join("\n");
      } else if (opts.fail?.(command)) {
        out = { stdout: "", stderr: "E: boom", exitCode: 100 };
      }
      return Promise.resolve(out);
    },
  };
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

const mitigateOpts = {
  dryRun: false,
  applyConfigMitigations: false,
  postMaxSize: "32M",
  inContainer: false,
};

Deno.test("mitigate: a user without sudo rights gets needs-privilege and nothing runs", async () => {
  const host = fakeHost({
    probes: [bookwormVm({ uid: 1001 })],
    preflight: () => false,
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "needs-privilege");
  assertEquals(r.status.action, "needs-privilege");
  assertEquals(r.mitigation.missingPrivileges.length, 2);
  assert(
    host.commands.every((c) =>
      c === PROBE_SCRIPT || c.startsWith("export LC_ALL=C")
    ),
  );
});

// sudo -n -ll on a workstation: a password rule for ALL plus one NOPASSWD
// rule. sudo -n -l passes every command here, but only the listed one runs.
const SUDO_LL_MIXED = [
  "Matching Defaults entries for deploy on web-01:",
  "    env_reset, listpw=any",
  "",
  "User deploy may run the following commands on web-01:",
  "",
  "Sudoers entry:",
  "    RunAsUsers: ALL",
  "    Commands:",
  "\tALL",
  "",
  "Sudoers entry:",
  "    RunAsUsers: root",
  "    Options: !authenticate",
  "    Commands:",
  "\t/usr/bin/apt-get update",
];

Deno.test("mitigate: a sudo rule that needs a password counts as missing", async () => {
  const host = fakeHost({
    probes: [bookwormVm({ uid: 1001 })],
    sudoLl: SUDO_LL_MIXED,
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "needs-privilege");
  assertEquals(r.mitigation.missingPrivileges.length, 1);
  assertStringIncludes(
    r.mitigation.missingPrivileges[0],
    "/usr/bin/apt-get install --only-upgrade",
  );
});

Deno.test("mitigate: scoped sudo passes the preflight and dry run executes nothing", async () => {
  const host = fakeHost({ probes: [bookwormVm({ uid: 1001 })] });
  const r = await mitigateTarget(host.run, "web-01", {
    ...mitigateOpts,
    dryRun: true,
  }, memLog());
  assertEquals(r.mitigation.outcome, "dry-run");
  assertEquals(r.mitigation.privilege, "sudo");
  assert(r.mitigation.steps.every((s) => s.status === "planned"));
  assert(r.mitigation.steps.every((s) => s.command.startsWith("sudo -n -- ")));
  assertEquals(
    host.commands.filter((c) =>
      c.includes("apt-get update") && !c.startsWith("export LC_ALL=C")
    ),
    [],
  );
});

Deno.test("mitigate: upgrade reaches the fix, hardening is skipped, FPM restarts", async () => {
  const before = bookwormVm({ services: ["php8.2-fpm.service"] });
  const after = bookwormVm({
    fpmVersion: "8.2.35-1~deb12u1",
    services: ["php8.2-fpm.service"],
  });
  const host = fakeHost({ probes: [before, after, after] });
  const r = await mitigateTarget(
    host.run,
    "web-01",
    { ...mitigateOpts, applyConfigMitigations: true },
    memLog(),
  );
  assertEquals(r.mitigation.outcome, "applied");
  const byPhase = r.mitigation.steps.map((s) => [s.phase, s.status]);
  assertEquals(byPhase, [
    ["upgrade", "ok"],
    ["upgrade", "ok"],
    ["harden", "skipped"],
    ["restart", "ok"],
  ]);
  assert(r.status.installs.every((i) => i.verdict === "patched"));
  assertEquals(r.status.riskLevel, "none");
});

Deno.test("mitigate: no fixed package yet, so tee writes the drop-in and the public host is isolate", async () => {
  const vm = bookwormVm({ uid: 1001 });
  const host = fakeHost({ probes: [vm] });
  const r = await mitigateTarget(
    host.run,
    "web-01",
    { ...mitigateOpts, applyConfigMitigations: true },
    memLog(),
  );
  const harden = r.mitigation.steps.find((s) => s.phase === "harden")!;
  assertEquals(harden.status, "ok");
  assertEquals(
    harden.command,
    `sudo -n -- /usr/bin/tee /etc/php/8.2/fpm/conf.d/${DROP_IN_NAME}`,
  );
  assert(host.commands.includes(`${harden.command} >/dev/null`));
  assertEquals(host.inputs.length, 1);
  assertStringIncludes(host.inputs[0], "memory_limit = -1");
  assertEquals(r.status.action, "isolate");
  assert(r.mitigation.notes.some((n) => n.startsWith("Still not patched")));
});

Deno.test("mitigate: a failed step makes the outcome partial", async () => {
  const host = fakeHost({
    probes: [bookwormVm()],
    fail: (c) => c.includes("install --only-upgrade"),
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "partial");
  const failed = r.mitigation.steps.find((s) => s.status === "failed")!;
  assertEquals(failed.exitCode, 100);
  assertStringIncludes(failed.output, "E: boom");
});

Deno.test("mitigate: patched host needs nothing", async () => {
  const host = fakeHost({
    probes: [bookwormVm({ fpmVersion: "8.2.35-1~deb12u1" })],
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "not-needed");
  assertEquals(host.commands.length, 1);
});

Deno.test("scanTarget fails clearly when the probe cannot run", async () => {
  await assertRejects(
    () =>
      scanTarget(
        () =>
          Promise.resolve({
            stdout: "",
            stderr: "Permission denied (publickey).",
            exitCode: 255,
          }),
        "10.0.0.9",
        { inContainer: false },
      ),
    Error,
    "Cannot execute commands on 10.0.0.9: Permission denied (publickey).",
  );
});

// --- Review fixes --------------------------------------------------------------

function scope(postMaxSize: string, uploadMaxFilesize = "2M"): IniScope {
  return {
    scope: "debian:8.2:fpm",
    sapi: "fpm",
    confDir: "/etc/php/8.2/fpm/conf.d",
    files: [],
    memoryLimit: "128M",
    memoryLimitFinite: true,
    postMaxSize,
    uploadMaxFilesize,
    sessionUploadProgress: true,
    fatalErrorBacktraces: null,
    poolOverrides: [],
    defaultsAssumed: [],
  };
}

Deno.test("drop-in only ever lowers post_max_size", () => {
  assertEquals(dropInContent(scope("8M"), "32M").postMaxSizeWritten, false);
  assertEquals(dropInContent(scope("32M"), "32M").postMaxSizeWritten, false);
  const big = dropInContent(scope("100M"), "32M");
  assertEquals(big.postMaxSizeWritten, true);
  assertStringIncludes(big.content, "post_max_size = 32M");
  // 0 means unlimited in PHP, so any limit is lower.
  assertEquals(dropInContent(scope("0"), "32M").postMaxSizeWritten, true);
});

Deno.test("lowering post_max_size is reported, with upload_max_filesize clashes", () => {
  const vm = bookwormVm().replace(
    "INI|debian:8.2:fpm|fpm|/etc/php/8.2/fpm/php.ini|memory_limit|128M",
    [
      "INI|debian:8.2:fpm|fpm|/etc/php/8.2/fpm/php.ini|post_max_size|100M",
      "INI|debian:8.2:fpm|fpm|/etc/php/8.2/fpm/php.ini|upload_max_filesize|64M",
    ].join("\n"),
  );
  const p = plan(vm, true);
  assert(
    p.notes.some((n) =>
      n.startsWith("/etc/php/8.2/fpm/conf.d: post_max_size drops") &&
      n.includes("drops from 100M to 32M") &&
      n.includes("upload_max_filesize=64M")
    ),
  );
  const harden = p.steps.find((s) => s.phase === "harden")!;
  assertEquals(
    harden.purpose,
    "Write the advisory's partial mitigations for /etc/php/8.2/fpm/conf.d",
  );
});

Deno.test("postMaxSize must be a positive size", () => {
  const args = model.methods.mitigate.arguments;
  assertEquals(args.safeParse({ postMaxSize: "0" }).success, false);
  assertEquals(args.safeParse({ postMaxSize: "08M" }).success, false);
  assertEquals(args.safeParse({ postMaxSize: "8M" }).success, true);
});

Deno.test("hostList drops duplicates and treats local aliases as one host", () => {
  assertEquals(
    hostList(" 192.0.2.10,192.0.2.10 , localhost,127.0.0.1,::1,,192.0.2.11"),
    ["192.0.2.10", "localhost", "192.0.2.11"],
  );
});

Deno.test("scanTarget: probe output cut short is an error, not 'no PHP'", async () => {
  const truncated = "HOSTNAME|web-01\nUID|0\nOS|ID=debian";
  await assertRejects(
    () =>
      scanTarget(
        () => Promise.resolve({ stdout: truncated, stderr: "", exitCode: 255 }),
        "192.0.2.10",
        { inContainer: false },
      ),
    Error,
    "Incomplete scan of 192.0.2.10",
  );
  await assertRejects(
    () =>
      scanTarget(
        () =>
          Promise.resolve({
            stdout: truncated,
            stderr: "timed out after 180s",
            exitCode: TIMEOUT_EXIT,
          }),
        "192.0.2.10",
        { inContainer: false },
      ),
    Error,
    "timed out after 180s",
  );
});

Deno.test("mitigate: empty preflight output counts as missing privilege", async () => {
  const host = fakeHost({ probes: [bookwormVm({ uid: 1001 })] });
  const run = (c: string) =>
    c.startsWith("export LC_ALL=C")
      ? Promise.resolve({ stdout: "", stderr: "", exitCode: 1 })
      : host.run(c);
  const r = await mitigateTarget(run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "needs-privilege");
  assertEquals(
    r.mitigation.missingPrivileges.length,
    r.mitigation.steps.length,
  );
});

Deno.test("mitigate: no restart when the upgrade changed nothing", async () => {
  const vm = bookwormVm({ services: ["php8.2-fpm.service"] });
  const host = fakeHost({ probes: [vm, vm] });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  const restart = r.mitigation.steps.find((s) => s.phase === "restart")!;
  assertEquals(restart.status, "skipped");
  assert(!host.commands.some((c) => c.includes("systemctl restart")));
});

Deno.test("mitigate: a failed rescan keeps the record of what ran", async () => {
  const host = fakeHost({
    probes: [bookwormVm(), "HOSTNAME|web-01\nUID|0"],
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "partial");
  assertEquals(r.status.mitigation?.steps[0].status, "ok");
  assert(r.mitigation.notes.some((n) => n.includes("Incomplete scan")));
});

Deno.test("mitigate: package steps get the long timeout", async () => {
  const timeouts: [string, number | undefined][] = [];
  const host = fakeHost({ probes: [bookwormVm()] });
  const run = (c: string, t?: number) => {
    timeouts.push([c, t]);
    return host.run(c);
  };
  await mitigateTarget(run, "web-01", mitigateOpts, memLog());
  const install = timeouts.find(([c]) => c.includes("install --only-upgrade"))!;
  assertEquals(install[1], 1_800_000);
});

// --- Windows -------------------------------------------------------------------

/** WINDOWS_PROBE_SCRIPT output from a Windows 11 VM with a XAMPP-style layout. */
const WINDOWS_XAMPP = probe([
  "HOSTNAME|WINTEST",
  "OS|ID=windows",
  "OS|VERSION_ID=10.0.26200",
  "OS|PRETTY_NAME=Windows 11 Enterprise Evaluation 25H2",
  "UID|1",
  "NOW|1792636232",
  "PROC|httpd",
  "PROC|sshd",
  "PROC|svchost",
  "MODPHPENABLED|C:\\xampp\\apache\\conf\\httpd.conf",
  "OVR|apache|C:\\xampp\\apache\\conf\\httpd.conf:6:php_value upload_max_filesize 64M",
  "HANDOFF|C:\\xampp\\apache\\conf\\httpd.conf",
  "BIN|C:\\xampp\\php\\php.exe||PHP 8.2.34 (cli)",
  "BIN|C:\\xampp\\php\\php-cgi.exe||PHP 8.2.34 (cgi-fcgi)",
  "MODPHP|C:\\xampp\\php\\php8apache2_4.dll||8.2.34",
  "BIN|C:\\tools\\php84\\php.exe||PHP 8.4.27 (cli)",
  "BIN|C:\\tools\\php84\\php-cgi.exe||PHP 8.4.27 (cgi-fcgi)",
  "INIFILE|windows:C:\\xampp\\php|all|C:\\xampp\\php\\php.ini",
  "INI|windows:C:\\xampp\\php|all|C:\\xampp\\php\\php.ini|memory_limit|128M",
  "INI|windows:C:\\xampp\\php|all|C:\\xampp\\php\\php.ini|post_max_size|8M",
  'LISTEN|LISTEN 0 0 0.0.0.0:22 0.0.0.0:0 users:(("sshd",pid=3348))',
  'LISTEN|LISTEN 0 0 0.0.0.0:445 0.0.0.0:0 users:(("System",pid=4))',
  'LISTEN|LISTEN 0 0 0.0.0.0:8080 0.0.0.0:0 users:(("httpd",pid=1348))',
  'LISTEN|LISTEN 0 0 [::]:8080 [::]:0 users:(("httpd",pid=1348))',
  "LOG|C:\\xampp\\apache\\logs\\error.log|1",
]);

const NO_SH = "'sh' is not recognized as an internal or external command,\r\n" +
  "operable program or batch file.";

Deno.test("windows: XAMPP mod_php behind a public Apache is critical, scan only", () => {
  const s = analyze(parseProbe(WINDOWS_XAMPP), "win11", { inContainer: false });
  assertEquals(s.os.id, "windows");
  assertEquals(s.runAsRoot, false);
  assertEquals(s.riskLevel, "critical");
  assert(s.exposure.publiclyListening);
  const dll = s.installs.find((i) => i.kind === "mod_php")!;
  assertEquals(dll.path, "C:\\xampp\\php\\php8apache2_4.dll");
  assertEquals(dll.sapi, "apache2handler");
  assertEquals(dll.version, "8.2.34");
  assertEquals(dll.source, "upstream");
  assertEquals(dll.verdict, "vulnerable");
  assertEquals(
    s.installs.find((i) => i.path.endsWith("xampp\\php\\php-cgi.exe"))!.sapi,
    "cgi",
  );
  assertEquals(
    s.installs.filter((i) => i.path.startsWith("C:\\tools\\php84"))
      .map((i) => i.verdict),
    ["patched", "patched"],
  );
  assertEquals(s.exposure.iniScopes[0].confDir, null);
  assert(s.recommendations.some((r) => r.includes("windows.php.net")));
  assert(
    s.recommendations.some((r) =>
      r.includes("set them in php.ini and restart the web server")
    ),
  );
  assert(!s.recommendations.some((r) => r.includes("applyConfigMitigations")));
});

Deno.test("windows: mitigate plans nothing, even with config mitigations", () => {
  const facts = parseProbe(WINDOWS_XAMPP);
  const s = analyze(facts, "win11", { inContainer: false });
  const p = planMitigation(s, facts, {
    applyConfigMitigations: true,
    postMaxSize: "32M",
  });
  assertEquals(p.steps, []);
  assertStringIncludes(p.notes.join("\n"), "Windows hosts are scanned only");
});

Deno.test("scanTarget falls back to the PowerShell probe when sh is missing", async () => {
  const calls: [string, string | undefined][] = [];
  const { status } = await scanTarget(
    (command, _timeoutMs, shell) => {
      calls.push([command, shell]);
      return Promise.resolve(
        shell === "powershell"
          ? { stdout: WINDOWS_XAMPP, stderr: "", exitCode: 0 }
          : { stdout: "", stderr: NO_SH, exitCode: 1 },
      );
    },
    "win11",
    { inContainer: false },
  );
  assertEquals(calls.map(([c, sh]) => [c === PROBE_SCRIPT, sh]), [
    [true, undefined],
    [false, "powershell"],
  ]);
  assertEquals(calls[1][0], WINDOWS_PROBE_SCRIPT);
  assertEquals(status.hostname, "WINTEST");
});

/** Which probes scanTarget runs when the sh probe returns this. */
async function shellsFor(first: RunResult): Promise<(string | undefined)[]> {
  const shells: (string | undefined)[] = [];
  await scanTarget(
    (_c, _t, shell) => {
      shells.push(shell);
      return Promise.resolve(
        shell === "powershell"
          ? { stdout: WINDOWS_XAMPP, stderr: "", exitCode: 0 }
          : first,
      );
    },
    "win11",
    { inContainer: false },
  );
  return shells;
}

Deno.test("scanTarget falls back to PowerShell under pwsh 7's wording", async () => {
  const pwsh =
    "sh: The term 'sh' is not recognized as a name of a cmdlet, function, script file, or executable program.";
  assertEquals(
    await shellsFor({ stdout: "", stderr: pwsh, exitCode: 1 }),
    [undefined, "powershell"],
  );
});

Deno.test("scanTarget uses PowerShell when sh comes from Git for Windows, MSYS2 or Cygwin", async () => {
  for (
    const kernel of ["MINGW64_NT-10.0-26200", "MSYS_NT-10.0", "CYGWIN_NT-10.0"]
  ) {
    const msys = probe(["HOSTNAME|WINTEST", "UID|1001", `KERNEL|${kernel}`]);
    assertEquals(
      await shellsFor({ stdout: msys, stderr: "", exitCode: 0 }),
      [undefined, "powershell"],
    );
  }
  const linux = probe(["HOSTNAME|web-01", "UID|0", "KERNEL|Linux"]);
  assertEquals(
    await shellsFor({ stdout: linux, stderr: "", exitCode: 0 }),
    [undefined],
  );
});

Deno.test("netstat listeners keep the process name before a colon", () => {
  const f = parseProbe(probe([
    "HOSTNAME|alpine-01",
    "UID|0",
    "LISTEN|tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1234/nginx: master",
  ]));
  assertEquals(f.listeners, [{ local: "0.0.0.0:80", process: "nginx" }]);
});

Deno.test("Windows probe never runs PHP and labels only IIS ports as iis", () => {
  assert(!WINDOWS_PROBE_SCRIPT.includes("& $f"));
  assert(!WINDOWS_PROBE_SCRIPT.includes("PHP_VERSION"));
  assertStringIncludes(WINDOWS_PROBE_SCRIPT, "$iisPorts.ContainsKey(");
  assertStringIncludes(WINDOWS_PROBE_SCRIPT, "bindingInformation=");
});

Deno.test("scanTarget does not try PowerShell for other failures", async () => {
  const shells: (string | undefined)[] = [];
  await assertRejects(
    () =>
      scanTarget(
        (_c, _t, shell) => {
          shells.push(shell);
          return Promise.resolve({
            stdout: "",
            stderr: "Connection refused",
            exitCode: 255,
          });
        },
        "10.0.0.9",
        { inContainer: false },
      ),
    Error,
    "Connection refused",
  );
  assertEquals(shells, [undefined]);
});

Deno.test("PowerShell launcher reads stdin up to the end marker, base64-encoded", () => {
  assertEquals(POWERSHELL_ARGV.slice(0, 4), [
    "powershell",
    "-NoProfile",
    "-NonInteractive",
    "-EncodedCommand",
  ]);
  const bytes = Uint8Array.from(
    atob(POWERSHELL_ARGV[4]),
    (c) => c.charCodeAt(0),
  );
  const launcher = new TextDecoder("utf-16le").decode(bytes);
  assertStringIncludes(launcher, `$l -eq '${POWERSHELL_END}'`);
  assertStringIncludes(launcher, "Invoke-Expression");
  // The probe must not end the read early or depend on bash-style syntax.
  assert(!WINDOWS_PROBE_SCRIPT.includes(POWERSHELL_END));
  assert(WINDOWS_PROBE_SCRIPT.trimEnd().endsWith("Say 'END|1'"));
});

Deno.test("runner timeout returns even when another process holds the pipes", async () => {
  // The backgrounded sleep inherits stdout, as an ssh ControlMaster does.
  const run = makeRunner({ kind: "local" }, { info() {}, debug() {} });
  const started = Date.now();
  const r = await run("sleep 4 & sleep 30", 300);
  assertEquals(r.exitCode, TIMEOUT_EXIT);
  assertStringIncludes(r.stderr, "timed out");
  assert(Date.now() - started < 3_500, `took ${Date.now() - started}ms`);
});

// --- Second review round ---------------------------------------------------------

Deno.test("stale workers on a patched host are high risk and get a restart", () => {
  const p = plan(bookwormVm({
    fpmVersion: "8.2.35-1~deb12u1",
    services: ["php8.2-fpm.service"],
    extra: ["STALE|php-fpm8.2|/usr/sbin/php-fpm8.2"],
  }));
  assert(p.status.installs.every((i) => i.verdict === "patched"));
  assertEquals(p.status.riskLevel, "high");
  assertEquals(p.status.action, "restart");
  assertEquals(p.status.staleProcesses, [
    "php-fpm8.2: /usr/sbin/php-fpm8.2",
  ]);
  assert(
    p.status.recommendations.some((r) => r.includes("replaced on disk")),
  );
  assertEquals(p.steps.map((s) => s.argv.join(" ")), [
    "systemctl restart php8.2-fpm.service",
  ]);
});

Deno.test("mitigate restarts stale workers even when nothing else changes", async () => {
  const vm = bookwormVm({
    fpmVersion: "8.2.35-1~deb12u1",
    services: ["php8.2-fpm.service"],
    extra: ["STALE|php-fpm8.2|/usr/sbin/php-fpm8.2"],
  });
  const fresh = bookwormVm({
    fpmVersion: "8.2.35-1~deb12u1",
    services: ["php8.2-fpm.service"],
  });
  const host = fakeHost({ probes: [vm, fresh] });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.steps.map((s) => [s.phase, s.status]), [
    ["restart", "ok"],
  ]);
  assertEquals(r.status.riskLevel, "none");
});

Deno.test("mitigate restarts when the rescan after the upgrade fails", async () => {
  const host = fakeHost({
    probes: [
      bookwormVm({ services: ["php8.2-fpm.service"] }),
      "HOSTNAME|web-01\nUID|0",
    ],
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  const restart = r.mitigation.steps.find((s) => s.phase === "restart")!;
  assertEquals(restart.status, "ok");
  assertEquals(r.mitigation.outcome, "partial");
});

Deno.test("upgrade names only PHP runtime packages", () => {
  const p = plan(bookwormVm({
    extra: [
      "PKG|dpkg|phpmyadmin|4:5.2.1+dfsg-1|install ok installed",
      "PKG|dpkg|php-symfony-console|6.2.10-1|install ok installed",
      "PKG|dpkg|libapache2-mod-php8.2|8.2.34-1~deb12u1|install ok installed",
      "PKG|dpkg|php-common|2:93|install ok installed",
      "PKG|dpkg|php-twig|3.5.1-1|install ok installed",
    ],
  }));
  const install = p.steps.find((s) => s.argv[1] === "install")!;
  const names = install.argv.slice(install.argv.indexOf("-y") + 5);
  // php-common (Debian's php-defaults) and php-twig version on their own.
  assertEquals(names, [
    "libapache2-mod-php8.2",
    "php8.2-cli",
    "php8.2-common",
    "php8.2-fpm",
  ]);
});

Deno.test("RHEL upgrades unversioned PHP packages at the install's version only", () => {
  const p = plan(probe([
    "HOSTNAME|app-02",
    "UID|0",
    "OS|ID=rhel",
    "OS|VERSION_ID=9.6",
    "TOOL|dnf|/usr/bin/dnf",
    "BIN|/usr/sbin/php-fpm|php-fpm|PHP 8.2.30 (fpm-fcgi) (built: Jun 3 2026)",
    "PKG|rpm|php-fpm|8.2.30-1.el9|installed",
    "PKG|rpm|php-common|8.2.30-1.el9|installed",
    "PKG|rpm|php-mysqlnd|8.2.30-1.el9|installed",
    "PKG|rpm|php-twig|3.5.1-1.el9|installed",
  ]));
  assertEquals(p.steps[0].argv, [
    "dnf",
    "upgrade",
    "-y",
    "php-common",
    "php-fpm",
    "php-mysqlnd",
  ]);
});

Deno.test("a vulnerable Sury build is upgraded, not sent to the vendor", () => {
  const p = plan(probe([
    "HOSTNAME|web-03",
    "UID|0",
    "OS|ID=ubuntu",
    "OS|VERSION_ID=24.04",
    "TOOL|apt-get|/usr/bin/apt-get",
    "BIN|/usr/sbin/php-fpm8.3|php8.3-fpm|PHP 8.3.35 (fpm-fcgi)",
    "PKG|dpkg|php8.3-fpm|8.3.35-1+ubuntu24.04.1+deb.sury.org+1|install ok installed",
  ]));
  assertEquals(p.status.installs[0].verdict, "vulnerable");
  assertEquals(p.status.installs[0].action, "upgrade");
  assert(p.steps.some((s) => s.argv.includes("--only-upgrade")));
});

Deno.test("mitigate rescans after the restart, so cleared stale workers are not reported", async () => {
  const services = ["apache2.service"];
  const mod = (v: string) => [
    `MODPHP|/usr/lib/apache2/modules/libphp8.2.so|libapache2-mod-php8.2|`,
    `PKG|dpkg|libapache2-mod-php8.2|${v}|install ok installed`,
    "MODPHPENABLED|/etc/apache2/mods-enabled/php8.2.load",
  ];
  const before = bookwormVm({
    services,
    pending: [
      "PENDING|apt|php8.2-fpm/bookworm-security 8.2.35-1~deb12u1 amd64 [upgradable from: 8.2.34-1~deb12u1]",
    ],
    extra: mod("8.2.34-1~deb12u1"),
  });
  const upgraded = bookwormVm({
    fpmVersion: "8.2.35-1~deb12u1",
    services,
    extra: [
      ...mod("8.2.35-1~deb12u1"),
      "STALE|apache2|/usr/lib/apache2/modules/libphp8.2.so",
    ],
  });
  const restarted = bookwormVm({
    fpmVersion: "8.2.35-1~deb12u1",
    services,
    extra: mod("8.2.35-1~deb12u1"),
  });
  const host = fakeHost({ probes: [before, upgraded, restarted] });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(
    r.mitigation.steps.find((s) => s.phase === "restart")?.status,
    "ok",
  );
  assertEquals(r.status.staleProcesses, []);
  assert(r.status.action !== "restart");
});

Deno.test("mitigate: stale workers with no unit to restart are no-automatic-fix", async () => {
  const host = fakeHost({
    probes: [bookwormVm({
      fpmVersion: "8.2.35-1~deb12u1",
      extra: ["STALE|php-fpm8.2|/usr/sbin/php-fpm8.2"],
    })],
  });
  const r = await mitigateTarget(host.run, "web-01", mitigateOpts, memLog());
  assertEquals(r.mitigation.outcome, "no-automatic-fix");
});

Deno.test("a Windows php-cgi.exe nothing runs or hands off to is not serving", () => {
  const facts = parseProbe(probe([
    "HOSTNAME|WINTEST",
    "OS|ID=windows",
    "UID|1",
    "BIN|C:\\tools\\php82\\php.exe||PHP 8.2.34 (cli)",
    "BIN|C:\\tools\\php82\\php-cgi.exe||PHP 8.2.34 (cgi-fcgi)",
  ]));
  const s = analyze(facts, "win-01", { inContainer: false });
  assert(s.installs.every((i) => !i.serving));
  assertEquals(s.riskLevel, "medium");
  const running = analyze(
    parseProbe(probe([
      "HOSTNAME|WINTEST",
      "OS|ID=windows",
      "UID|1",
      "PROC|php-cgi",
      "BIN|C:\\tools\\php82\\php-cgi.exe||PHP 8.2.34 (cgi-fcgi)",
    ])),
    "win-01",
    { inContainer: false },
  );
  assert(running.installs[0].serving);
});

Deno.test("the probe's stale-worker pattern reaches sh with escaped parentheses", () => {
  assertStringIncludes(PROBE_SCRIPT, String.raw`[^/ ]*) \(deleted\)$'`);
});

Deno.test("containerExitMessage: running is null, an exit names code and log tail", () => {
  assertEquals(containerExitMessage("php:8.2.34-apache", "true 0\n", ""), null);
  const forked = containerExitMessage(
    "php:8.2.34-apache",
    "false 2\n",
    "sh: 1: Cannot fork\n",
  )!;
  assertStringIncludes(
    forked,
    "The container started from php:8.2.34-apache exited with code 2: sh: 1: Cannot fork",
  );
  assertStringIncludes(forked, "pids limit");
  const plain = containerExitMessage("php:8.3", "false 127", "")!;
  assertEquals(
    plain,
    "The container started from php:8.3 exited with code 127",
  );
});

Deno.test("failedMitigation keeps the options the run was asked for", () => {
  const s = analyze(parseProbe(OFFICIAL_APACHE), "php:8.2.34-apache", {
    inContainer: true,
  });
  const f = failedMitigation(s, {
    dryRun: true,
    applyConfigMitigations: true,
    postMaxSize: "8M",
  });
  assertEquals(f.mitigation!.dryRun, true);
  assertEquals(f.mitigation!.applyConfigMitigations, true);
  assertEquals(f.mitigation!.postMaxSize, "8M");
  assertEquals(f.mitigation!.outcome, "error");
  assertEquals(f.mitigation!.steps, []);
});
