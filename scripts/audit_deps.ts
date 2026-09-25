/**
 * Dependency audit script that checks npm packages in all deno.lock files
 * for known vulnerabilities using the OSV.dev API (https://osv.dev/).
 *
 * Discovers deno.lock files by walking vault/, datastore/, model/, codegen/, and
 * issue-lifecycle/ directories — no hardcoded list, so new extensions are picked
 * up automatically.
 *
 * Direct dependency vulnerabilities fail the build. Transitive dependency
 * vulnerabilities are reported as warnings with their full dependency chain.
 *
 * Exit codes:
 *   0 - No direct dependency vulnerabilities found
 *   1 - Direct dependency vulnerabilities found
 */

interface NpmEntry {
  integrity: string;
  dependencies?: string[];
}

interface DenoLock {
  version: string;
  specifiers?: Record<string, string>;
  npm?: Record<string, NpmEntry>;
}

interface OsvVulnerability {
  id: string;
  summary?: string;
  severity?: Array<{ type: string; score: string }>;
  aliases?: string[];
}

interface OsvResult {
  vulns?: OsvVulnerability[];
}

interface OsvBatchResponse {
  results: OsvResult[];
}

interface PackageInfo {
  name: string;
  version: string;
  isDirect: boolean;
}

interface VulnFinding {
  lockfile: string;
  pkg: PackageInfo;
  vulns: OsvVulnerability[];
  chain: string[];
}

/** Directories to scan for deno.lock files. */
const SCAN_ROOTS = ["vault", "datastore", "model", "codegen", "issue-lifecycle"];

/**
 * Recursively discover all deno.lock files under the given root directories.
 */
async function discoverLockfiles(roots: string[]): Promise<string[]> {
  const lockfiles: string[] = [];

  async function walk(dir: string): Promise<void> {
    try {
      for await (const entry of Deno.readDir(dir)) {
        const path = `${dir}/${entry.name}`;
        if (entry.isFile && entry.name === "deno.lock") {
          lockfiles.push(path);
        } else if (entry.isDirectory && !entry.name.startsWith(".")) {
          await walk(path);
        }
      }
    } catch {
      // Directory doesn't exist yet — skip
    }
  }

  for (const root of roots) {
    await walk(root);
  }

  return lockfiles.sort();
}

/**
 * Build a map from package name to the full key(s) in the npm section.
 */
function buildNameToKeyMap(
  npm: Record<string, NpmEntry>,
): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const key of Object.keys(npm)) {
    const lastAt = key.lastIndexOf("@");
    if (lastAt <= 0) continue;
    const name = key.substring(0, lastAt);
    const existing = map.get(name) ?? [];
    existing.push(key);
    map.set(name, existing);
  }
  return map;
}

/**
 * Build a reverse dependency graph: for each package key, which other
 * package keys depend on it?
 */
function buildReverseDeps(
  npm: Record<string, NpmEntry>,
  nameToKeys: Map<string, string[]>,
): Map<string, string[]> {
  const reverseDeps = new Map<string, string[]>();

  for (const [parentKey, entry] of Object.entries(npm)) {
    for (const depName of entry.dependencies ?? []) {
      const depKeys = nameToKeys.get(depName) ?? [];
      for (const depKey of depKeys) {
        const parents = reverseDeps.get(depKey) ?? [];
        parents.push(parentKey);
        reverseDeps.set(depKey, parents);
      }
    }
  }

  return reverseDeps;
}

/**
 * Trace the dependency chain from a vulnerable package back to a direct
 * dependency using BFS on the reverse dependency graph.
 */
function traceDependencyChain(
  targetKey: string,
  reverseDeps: Map<string, string[]>,
  directNames: Set<string>,
): string[] {
  const visited = new Set<string>();
  const queue: Array<{ key: string; path: string[] }> = [
    { key: targetKey, path: [targetKey] },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current.key)) continue;
    visited.add(current.key);

    const lastAt = current.key.lastIndexOf("@");
    if (lastAt > 0) {
      const name = current.key.substring(0, lastAt);
      if (directNames.has(name) && current.path.length > 1) {
        return current.path.reverse();
      }
    }

    const parents = reverseDeps.get(current.key) ?? [];
    for (const parent of parents) {
      if (!visited.has(parent)) {
        queue.push({ key: parent, path: [...current.path, parent] });
      }
    }
  }

  return [targetKey];
}

function parseNpmPackages(
  lockData: DenoLock,
): { packages: PackageInfo[]; directNames: Set<string> } {
  const npm = lockData.npm;
  if (!npm) return { packages: [], directNames: new Set() };

  const directNames = new Set<string>();
  for (const key of Object.keys(lockData.specifiers ?? {})) {
    if (key.startsWith("npm:")) {
      const withoutPrefix = key.substring(4);
      const lastAt = withoutPrefix.lastIndexOf("@");
      if (lastAt > 0) {
        directNames.add(withoutPrefix.substring(0, lastAt));
      }
    }
  }

  const packages: PackageInfo[] = [];
  for (const key of Object.keys(npm)) {
    const lastAt = key.lastIndexOf("@");
    if (lastAt <= 0) continue;

    const name = key.substring(0, lastAt);
    const rawVersion = key.substring(lastAt + 1);
    const version = rawVersion.split("_")[0];

    packages.push({ name, version, isDirect: directNames.has(name) });
  }

  return { packages, directNames };
}

async function queryOsv(
  packages: PackageInfo[],
): Promise<OsvBatchResponse> {
  const queries = packages.map((pkg) => ({
    package: { name: pkg.name, ecosystem: "npm" },
    version: pkg.version,
  }));

  const response = await fetch("https://api.osv.dev/v1/querybatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ queries }),
  });

  if (!response.ok) {
    throw new Error(
      `OSV API returned ${response.status}: ${await response.text()}`,
    );
  }

  return await response.json() as OsvBatchResponse;
}

function formatVuln(vuln: OsvVulnerability): string {
  const aliases = vuln.aliases?.filter((a) => a.startsWith("CVE-")) ?? [];
  const cve = aliases.length > 0 ? ` (${aliases.join(", ")})` : "";
  const summary = vuln.summary ?? "No description available";
  return `${vuln.id}${cve}: ${summary}`;
}

function formatChain(chain: string[]): string {
  if (chain.length <= 1) return "";
  return chain.join(" → ");
}

async function writeGitHubSummary(
  direct: VulnFinding[],
  transitive: VulnFinding[],
): Promise<void> {
  const summaryFile = Deno.env.get("GITHUB_STEP_SUMMARY");
  if (!summaryFile) return;

  const lines: string[] = ["## Dependency Audit Results\n"];

  if (direct.length > 0) {
    lines.push("### Direct Dependency Vulnerabilities\n");
    lines.push(
      "These are in packages you directly depend on and **must be resolved**.\n",
    );
    for (const { lockfile, pkg, vulns } of direct) {
      lines.push(`#### \`${pkg.name}@${pkg.version}\` in \`${lockfile}\`\n`);
      for (const vuln of vulns) {
        lines.push(`- ${formatVuln(vuln)}`);
      }
      lines.push("");
    }
  }

  if (transitive.length > 0) {
    lines.push("### Transitive Dependency Vulnerabilities\n");
    lines.push(
      "> **Warning**: These are in upstream transitive dependencies. ",
    );
    lines.push(
      "They require fixes from upstream maintainers and do not block this build.\n",
    );
    for (const { lockfile, pkg, vulns, chain } of transitive) {
      lines.push(`#### \`${pkg.name}@${pkg.version}\` in \`${lockfile}\`\n`);
      if (chain.length > 1) {
        lines.push(`Dependency chain: \`${formatChain(chain)}\`\n`);
      }
      for (const vuln of vulns) {
        lines.push(`- ${formatVuln(vuln)}`);
      }
      lines.push("");
    }
  }

  if (direct.length === 0 && transitive.length === 0) {
    lines.push("No known vulnerabilities found.");
  }

  await Deno.writeTextFile(summaryFile, lines.join("\n"));
}

/**
 * Queries OSV once per distinct package version across every lockfile.
 *
 * The generated model directories pin the same few packages hundreds of times
 * over, so querying per lockfile made one sequential round trip per lockfile
 * for what is almost entirely the same answer.
 */
async function queryDistinct(
  packages: PackageInfo[],
): Promise<Map<string, OsvVulnerability[]>> {
  const distinct = new Map<string, PackageInfo>();
  for (const pkg of packages) {
    distinct.set(`${pkg.name}@${pkg.version}`, pkg);
  }
  const unique = [...distinct.values()];

  const vulnsByKey = new Map<string, OsvVulnerability[]>();
  const batchSize = 1000;
  for (let i = 0; i < unique.length; i += batchSize) {
    const batch = unique.slice(i, i + batchSize);
    const response = await queryOsv(batch);
    for (let j = 0; j < response.results.length; j++) {
      const vulns = response.results[j].vulns;
      if (vulns && vulns.length > 0) {
        vulnsByKey.set(`${batch[j].name}@${batch[j].version}`, vulns);
      }
    }
  }
  return vulnsByKey;
}

function auditLockfile(
  lockfilePath: string,
  lockData: DenoLock,
  vulnsByKey: ReadonlyMap<string, OsvVulnerability[]>,
): { direct: VulnFinding[]; transitive: VulnFinding[] } {
  const { packages, directNames } = parseNpmPackages(lockData);

  const npm = lockData.npm ?? {};
  const nameToKeys = buildNameToKeyMap(npm);
  const reverseDeps = buildReverseDeps(npm, nameToKeys);

  const direct: VulnFinding[] = [];
  const transitive: VulnFinding[] = [];

  for (const pkg of packages) {
    const targetKey = `${pkg.name}@${pkg.version}`;
    const vulns = vulnsByKey.get(targetKey);
    if (!vulns) continue;
    const chain = pkg.isDirect
      ? [targetKey]
      : traceDependencyChain(targetKey, reverseDeps, directNames);
    const finding = { lockfile: lockfilePath, pkg, vulns, chain };
    if (pkg.isDirect) {
      direct.push(finding);
    } else {
      transitive.push(finding);
    }
  }

  return { direct, transitive };
}

async function main(): Promise<void> {
  const lockfiles = await discoverLockfiles(SCAN_ROOTS);

  if (lockfiles.length === 0) {
    console.error("No deno.lock files found.");
    Deno.exit(1);
  }

  console.log(`Found ${lockfiles.length} lockfiles to audit:`);
  for (const lf of lockfiles) {
    console.log(`  ${lf}`);
  }
  console.log("");

  const lockData = new Map<string, DenoLock>();
  const allPackages: PackageInfo[] = [];
  for (const lockfile of lockfiles) {
    const data = JSON.parse(await Deno.readTextFile(lockfile)) as DenoLock;
    lockData.set(lockfile, data);
    allPackages.push(...parseNpmPackages(data).packages);
  }
  const vulnsByKey = await queryDistinct(allPackages);
  console.log(
    `Queried ${
      new Set(allPackages.map((p) => `${p.name}@${p.version}`)).size
    } distinct npm package versions across ${lockfiles.length} lockfiles.`,
  );

  const allDirect: VulnFinding[] = [];
  const allTransitive: VulnFinding[] = [];

  for (const lockfile of lockfiles) {
    const { direct, transitive } = auditLockfile(
      lockfile,
      lockData.get(lockfile)!,
      vulnsByKey,
    );
    allDirect.push(...direct);
    allTransitive.push(...transitive);
  }

  await writeGitHubSummary(allDirect, allTransitive);

  if (allDirect.length === 0 && allTransitive.length === 0) {
    console.log("\nNo known vulnerabilities found.");
    Deno.exit(0);
  }

  if (allDirect.length > 0) {
    console.error(
      `\nDirect dependency vulnerabilities (${allDirect.length} finding(s)):\n`,
    );
    for (const { lockfile, pkg, vulns } of allDirect) {
      console.error(`  ${pkg.name}@${pkg.version} (${lockfile})`);
      for (const vuln of vulns) {
        console.error(`    - ${formatVuln(vuln)}`);
      }
      console.error("");
    }
  }

  if (allTransitive.length > 0) {
    const label = allTransitive.length === 1 ? "finding" : "findings";
    console.warn(
      `\nTransitive dependency vulnerabilities (${allTransitive.length} ${label} — warning only):\n`,
    );
    for (const { lockfile, pkg, vulns, chain } of allTransitive) {
      console.warn(`  ${pkg.name}@${pkg.version} (${lockfile})`);
      if (chain.length > 1) {
        console.warn(`    chain: ${formatChain(chain)}`);
      }
      for (const vuln of vulns) {
        console.warn(`    - ${formatVuln(vuln)}`);
      }
      console.warn("");
    }
    if (allDirect.length === 0) {
      console.warn(
        "Transitive vulnerabilities require upstream fixes and do not fail this check.",
      );
    }
  }

  Deno.exit(allDirect.length > 0 ? 1 : 0);
}

main();
