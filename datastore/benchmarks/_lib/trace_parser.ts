export interface TraceEntry {
  provider: "s3" | "gcs";
  phase: string;
  durationMs: number;
  detail?: string;
}

const TRACE_RE =
  /^\[(?<prov>s3|gcs)-sync\] (?<phase>\S+) (?<ms>\d+)ms(?:\s+(?<detail>.+))?$/;

export function parseTraceLine(line: string): TraceEntry | null {
  const m = line.match(TRACE_RE);
  if (!m?.groups) return null;
  return {
    provider: m.groups.prov as "s3" | "gcs",
    phase: m.groups.phase,
    durationMs: parseInt(m.groups.ms, 10),
    detail: m.groups.detail,
  };
}

export interface TraceCollector {
  entries: TraceEntry[];
  install(): void;
  uninstall(): void;
  clear(): void;
}

export function createTraceCollector(): TraceCollector {
  const entries: TraceEntry[] = [];
  let originalDebug: typeof console.debug | null = null;

  return {
    entries,
    install() {
      originalDebug = console.debug;
      console.debug = (...args: unknown[]) => {
        const line = args.map(String).join(" ");
        const entry = parseTraceLine(line);
        if (entry) {
          entries.push(entry);
        }
        // Suppress trace output — we capture it structured via the collector
      };
    },
    uninstall() {
      if (originalDebug) {
        console.debug = originalDebug;
        originalDebug = null;
      }
    },
    clear() {
      entries.length = 0;
    },
  };
}
