// Swamp, an Automation Framework Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

/**
 * The CI side of the pre-PR verification loop: checks that the attestation
 * posted for a pull request's head commit says verification passed on that
 * exact commit, with the harness that commit contains.
 *
 * The pinned files come from the same configuration the generator reads
 * (`verification/attestation.yaml`), so the two cannot disagree about what
 * the attestation pins. By default that configuration is read from beside
 * this script rather than from the working directory: CI runs this script
 * from the pull request's base commit against the head's files, so the base
 * decides what is checked and a pull request cannot drop a file from the
 * check by editing the list.
 *
 * Usage:
 *   deno run --allow-read --allow-write --allow-env=GITHUB_STEP_SUMMARY \
 *     --allow-net=swamp-club.com scripts/validate_attestation.ts \
 *       --commit <head-sha> [--url https://swamp-club.com] [--file <path>] \
 *       [--config <attestation.yaml>]
 *
 * `--file` reads the attestation from disk instead of swamp-club.
 */

import { parseArgs } from "@std/cli/parse-args";
import { AttestationSchema } from "../extensions/models/_lib/schemas.ts";
import {
  computeChecksum,
  type ConfigFile,
  DEFAULT_CONFIG,
  parseAttestationConfig,
  pinnedFiles,
} from "./build_attestation.ts";

/** How old an attestation may be before CI warns. */
export const FRESHNESS_WINDOW_MS = 24 * 60 * 60 * 1000;

export interface ValidationResult {
  errors: string[];
  warnings: string[];
  /** Markdown for the job summary. */
  summary: string[];
}

function lookup(doc: unknown, path: readonly string[]): unknown {
  let node = doc;
  for (const key of path) {
    if (node === null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return node;
}

/**
 * Validates an attestation against the commit it must describe.
 *
 * Pure: `actualHashes` maps each pinned path to its hash at the head commit,
 * or null when the file does not exist there.
 */
export function validateAttestation(
  doc: unknown,
  headSha: string,
  pinned: readonly ConfigFile[],
  actualHashes: ReadonlyMap<string, string | null>,
  now: Date,
  requiredRuns: readonly string[] = [],
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const summary: string[] = ["## Attestation Validation", ""];

  const parsed = AttestationSchema.safeParse(doc);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(
        `attestation does not match AttestationSchema: ` +
          `${issue.path.join(".") || "(root)"}: ${issue.message}`,
      );
    }
    summary.push("❌ Attestation does not match the schema", "");
    return { errors, warnings, summary };
  }
  const attestation = parsed.data;

  if (attestation.subject.commit !== headSha) {
    errors.push(
      `commit mismatch: attestation names ${attestation.subject.commit}, ` +
        `the pull request head is ${headSha}`,
    );
    summary.push(
      `❌ Commit mismatch: attestation \`${
        attestation.subject.commit.slice(0, 8)
      }\` ≠ PR \`${headSha.slice(0, 8)}\``,
    );
  } else {
    summary.push("✅ Commit matches PR head");
  }

  const { gate } = attestation;
  const counts =
    `${gate.stepsCompleted}/${gate.stepsTotal} completed, ${gate.stepsSkipped} skipped`;
  if (!gate.allPassed) {
    errors.push(`gate failed: ${counts}`);
    summary.push(`❌ Gate: **failed** (${counts})`);
  } else {
    summary.push(`✅ Gate: ${counts}`);
  }

  const completedAt = lookup(attestation, ["timing", "completedAt"]);
  const completed = typeof completedAt === "string"
    ? new Date(completedAt).getTime()
    : Number.NaN;
  if (Number.isNaN(completed)) {
    warnings.push("freshness: no parseable timing.completedAt");
    summary.push("⚠️ Freshness: no parseable timestamp");
  } else {
    const ageHours = Math.floor((now.getTime() - completed) / 3_600_000);
    if (now.getTime() - completed > FRESHNESS_WINDOW_MS) {
      warnings.push(`freshness: attestation is ${ageHours}h old (max 24h)`);
      summary.push(`⚠️ Freshness: ${ageHours}h old (exceeds 24h)`);
    } else {
      summary.push(`✅ Freshness: ${ageHours}h old`);
    }
  }

  // Every workflow the trusted configuration names must have contributed a
  // run. A pull request cannot drop one by deleting it and removing it from
  // its own copy of the configuration.
  for (const key of requiredRuns) {
    const run = lookup(attestation, ["runs", key]);
    if (typeof run !== "string" || run === "") {
      errors.push(
        `attestation has no ${key} run; every verification workflow must run`,
      );
      summary.push(`❌ No \`${key}\` run in the attestation`);
    }
  }

  summary.push("", "### Config Integrity", "");
  for (const file of pinned) {
    const attested = lookup(attestation.configIntegrity, file.jsonPath);
    const actual = actualHashes.get(file.path);
    if (actual === null || actual === undefined) {
      // The trusted configuration pins it, so its absence — deleted, or
      // replaced by a symlink — is a harness file the change removed, not
      // something to warn about and wave through.
      errors.push(
        `config integrity: ${file.path} is pinned but missing, or not a ` +
          "regular file, at the head commit",
      );
      summary.push(`❌ \`${file.path}\`: missing or not a regular file`);
    } else if (typeof attested !== "string" || attested === "") {
      // The file exists, so an attestation without its hash was not built by
      // the generator the trusted configuration describes.
      errors.push(
        `config integrity: ${file.path} is pinned but not in attestation`,
      );
      summary.push(`❌ \`${file.path}\`: not in attestation`);
    } else if (attested !== actual) {
      errors.push(
        `config integrity mismatch for ${file.path}: attestation=${
          attested.slice(0, 12)
        } actual=${actual.slice(0, 12)}`,
      );
      summary.push(`❌ \`${file.path}\`: checksum mismatch`);
    } else {
      summary.push(`✅ \`${file.path}\``);
    }
  }

  summary.push(
    "",
    "### Verification Steps",
    "",
    "| Job | Step | Status | Verdict |",
    "|-----|------|--------|---------|",
  );
  for (const step of attestation.steps) {
    const status = step.status === "succeeded"
      ? "✅ passed"
      : step.status === "skipped"
      ? "⏭️ skipped"
      : `❌ ${step.status}`;
    summary.push(
      `| ${step.job} | ${step.step} | ${status} | ${
        step.verdict ?? step.reason ?? "—"
      } |`,
    );
  }

  summary.push(
    "",
    errors.length > 0
      ? `### ❌ Validation Failed — ${errors.length} error(s), ${warnings.length} warning(s)`
      : warnings.length > 0
      ? `### ⚠️ Validation Passed with ${warnings.length} warning(s)`
      : "### ✅ Validation Passed",
  );
  return { errors, warnings, summary };
}

/**
 * SHA-256 of a regular file's blob at `commit`, or null when the path is
 * absent, a symlink, a submodule, or a directory there.
 */
export async function blobChecksum(
  commit: string,
  path: string,
): Promise<string | null> {
  const git = async (args: string[]) => {
    const out = await new Deno.Command("git", {
      args,
      stdout: "piped",
      stderr: "null",
    }).output();
    return out.code === 0 ? out.stdout : null;
  };
  const listing = await git(["ls-tree", "-z", commit, "--", path]);
  const entry = listing ? new TextDecoder().decode(listing).split("\0")[0] : "";
  const match = entry.match(/^(\d{6}) blob ([0-9a-f]+)\t/);
  if (!match || (match[1] !== "100644" && match[1] !== "100755")) return null;
  const blob = await git(["cat-file", "blob", match[2]]);
  return blob ? await computeChecksum(blob) : null;
}

async function readAttestation(
  url: string,
  commit: string,
  file: string | undefined,
): Promise<unknown> {
  if (file) return JSON.parse(await Deno.readTextFile(file));
  const res = await fetch(
    `${url}/api/v1/admin/attestations?commit=${encodeURIComponent(commit)}`,
    { signal: AbortSignal.timeout(30_000) },
  );
  if (!res.ok) {
    throw new Error(
      `no attestation found for ${commit} (HTTP ${res.status}). Run the ` +
        "pre-PR verification loop and post_attestation before opening a PR — " +
        "see agent-constraints/verification-conventions.md",
    );
  }
  return await res.json();
}

async function main(): Promise<number> {
  const args = parseArgs(Deno.args, {
    string: ["commit", "url", "file", "config"],
    default: {
      url: "https://swamp-club.com",
      config: new URL(`../${DEFAULT_CONFIG}`, import.meta.url).pathname,
    },
  });
  if (!args.commit) {
    console.error(
      "usage: validate_attestation.ts --commit <sha> [--url <url>] [--file <path>]",
    );
    return 2;
  }

  let doc: unknown;
  try {
    doc = await readAttestation(args.url, args.commit, args.file);
  } catch (err) {
    console.error(`::error::${err instanceof Error ? err.message : err}`);
    return 1;
  }

  let pinned: ConfigFile[];
  let requiredRuns: string[];
  try {
    const config = parseAttestationConfig(
      await Deno.readTextFile(args.config),
    );
    pinned = pinnedFiles(config);
    requiredRuns = config.workflows.map((w) => w.key);
  } catch (err) {
    console.error(`::error::cannot read ${args.config}: ${err}`);
    return 1;
  }

  // Hashed from the commit's own blobs, not the checked-out files: a path
  // that is a symlink or anything but a regular file counts as missing, and
  // nothing a checkout does to the working tree changes what is compared.
  const actualHashes = new Map<string, string | null>();
  for (const file of pinned) {
    actualHashes.set(file.path, await blobChecksum(args.commit, file.path));
  }

  const result = validateAttestation(
    doc,
    args.commit,
    pinned,
    actualHashes,
    new Date(),
    requiredRuns,
  );
  for (const warning of result.warnings) console.log(`::warning::${warning}`);
  for (const error of result.errors) console.log(`::error::${error}`);

  const markdown = result.summary.join("\n") + "\n";
  const summaryPath = Deno.env.get("GITHUB_STEP_SUMMARY");
  if (summaryPath) {
    await Deno.writeTextFile(summaryPath, markdown, { append: true });
  } else {
    console.log(markdown);
  }
  return result.errors.length > 0 ? 1 : 0;
}

if (import.meta.main) {
  Deno.exit(await main());
}
