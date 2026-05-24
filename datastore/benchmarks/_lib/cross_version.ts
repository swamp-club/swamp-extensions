import {
  type ComparisonEntry,
  formatComparisonTable,
  type ScenarioResult,
} from "./results.ts";

async function runBenchmark(
  script: string,
  env: Record<string, string>,
): Promise<ScenarioResult[]> {
  const jsonPath = await Deno.makeTempFile({ suffix: ".json" });
  const cmd = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "--allow-read",
      "--allow-write",
      "--allow-env",
      "--allow-net",
      "--allow-sys",
      "--allow-run",
      script,
    ],
    env: {
      ...Deno.env.toObject(),
      ...env,
      BENCHMARK_JSON: jsonPath,
      BENCHMARK_TRIALS: Deno.env.get("BENCHMARK_TRIALS") ?? "3",
    },
    stdout: "piped",
    stderr: "piped",
  });

  const result = await cmd.output();
  if (!result.success) {
    const stderr = new TextDecoder().decode(result.stderr);
    throw new Error(`Benchmark failed: ${stderr}`);
  }

  const json = await Deno.readTextFile(jsonPath);
  await Deno.remove(jsonPath);
  return JSON.parse(json) as ScenarioResult[];
}

function buildComparison(
  oldResults: ScenarioResult[],
  newResults: ScenarioResult[],
): ComparisonEntry[] {
  const entries: ComparisonEntry[] = [];

  for (const newR of newResults) {
    const oldR = oldResults.find((r) => r.name === newR.name);
    if (!oldR) continue;

    // Wall time comparison
    const wallDelta = oldR.wallAvg === 0
      ? 0
      : ((newR.wallAvg - oldR.wallAvg) / oldR.wallAvg) * 100;
    entries.push({
      scenario: newR.name,
      phase: "_wall_",
      oldAvg: oldR.wallAvg,
      newAvg: newR.wallAvg,
      deltaPercent: wallDelta,
    });

    // Per-phase comparison
    for (const newP of newR.phases) {
      const oldP = oldR.phases.find((p) => p.phase === newP.phase);
      if (!oldP) continue;
      const delta = oldP.avg === 0
        ? 0
        : ((newP.avg - oldP.avg) / oldP.avg) * 100;
      entries.push({
        scenario: newR.name,
        phase: newP.phase,
        oldAvg: oldP.avg,
        newAvg: newP.avg,
        deltaPercent: delta,
      });
    }
  }
  return entries;
}

async function main() {
  const provider = Deno.args[0] ?? "s3";
  const script = provider === "gcs" ? "gcs_bench.ts" : "s3_bench.ts";

  console.log(
    `Running cross-version comparison for ${provider.toUpperCase()}...`,
  );
  console.log("Note: Both runs use the same local code (cross-version with");
  console.log("published extensions requires swamp extension pull).\n");

  // Run 1: baseline
  console.log("--- Run 1 (baseline) ---");
  const baselineResults = await runBenchmark(script, {
    SWAMP_S3_SYNC_TRACE: "1",
    SWAMP_GCS_SYNC_TRACE: "1",
  });

  // Run 2: comparison (same code for now; cross-version would use different source)
  console.log("\n--- Run 2 (comparison) ---");
  const comparisonResults = await runBenchmark(script, {
    SWAMP_S3_SYNC_TRACE: "1",
    SWAMP_GCS_SYNC_TRACE: "1",
  });

  // Build and display comparison
  const entries = buildComparison(baselineResults, comparisonResults);

  console.log("\n" + "=".repeat(80));
  console.log(`CROSS-VERSION COMPARISON: ${provider.toUpperCase()}`);
  console.log("=".repeat(80) + "\n");
  console.log(formatComparisonTable(entries));

  // Summary
  const regressions = entries.filter((e) => e.deltaPercent > 10);
  const improvements = entries.filter((e) => e.deltaPercent < -10);
  console.log(
    `\nSummary: ${improvements.length} faster, ${regressions.length} slower, ` +
      `${
        entries.length - improvements.length - regressions.length
      } unchanged (±10% threshold)`,
  );

  if (regressions.length > 0) {
    console.log("\nPotential regressions (>10% slower):");
    for (const r of regressions) {
      console.log(
        `  - ${r.scenario} [${r.phase}]: +${r.deltaPercent.toFixed(1)}%`,
      );
    }
  }
}

main().catch((err) => {
  console.error("Cross-version comparison failed:", err);
  Deno.exit(1);
});
