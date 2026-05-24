import { createTraceCollector, type TraceEntry } from "./trace_parser.ts";
import { computePhaseStats, type ScenarioResult } from "./results.ts";

export interface TrialResult {
  wallMs: number;
  traces: TraceEntry[];
}

export interface ScenarioConfig {
  name: string;
  trials?: number;
  warmup?: number;
  setup?: () => Promise<void>;
  run: () => Promise<void>;
  teardown?: () => Promise<void>;
  phaseFilter?: string[];
}

export async function runScenario(
  config: ScenarioConfig,
): Promise<ScenarioResult> {
  const trials = config.trials ?? getTrialCount();
  const warmup = config.warmup ?? 1;
  const collector = createTraceCollector();

  // Warmup runs (discarded)
  for (let i = 0; i < warmup; i++) {
    if (config.setup) await config.setup();
    collector.install();
    try {
      await config.run();
    } finally {
      collector.uninstall();
      collector.clear();
      if (config.teardown) await config.teardown();
    }
  }

  // Measured runs
  const trialResults: TrialResult[] = [];
  for (let i = 0; i < trials; i++) {
    if (config.setup) await config.setup();
    collector.install();
    collector.clear();
    const start = performance.now();
    try {
      await config.run();
    } finally {
      collector.uninstall();
      const wallMs = Math.round(performance.now() - start);
      trialResults.push({ wallMs, traces: [...collector.entries] });
      if (config.teardown) await config.teardown();
    }
  }

  const wallTimes = trialResults.map((r) => r.wallMs).sort((a, b) => a - b);
  const wallSum = wallTimes.reduce((a, b) => a + b, 0);
  const allTraces = trialResults.map((r) => r.traces);

  return {
    name: config.name,
    phases: computePhaseStats(allTraces, config.phaseFilter),
    wallMin: wallTimes[0],
    wallAvg: Math.round(wallSum / wallTimes.length),
    wallMax: wallTimes[wallTimes.length - 1],
    trials,
  };
}

function getTrialCount(): number {
  try {
    const v = Deno.env.get("BENCHMARK_TRIALS");
    if (v) {
      const parsed = parseInt(v, 10);
      if (!isNaN(parsed)) return Math.max(1, parsed);
    }
  } catch {
    // --allow-env may be absent
  }
  return 5;
}
