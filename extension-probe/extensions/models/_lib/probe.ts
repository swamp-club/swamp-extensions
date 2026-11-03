/**
 * The probe run: the application service that ties box, isolation, input
 * generation and observation together for one target.
 *
 *   prepare   init a fresh repo, read the target's types from the registry,
 *             pull it (through the proxy, registry hosts only), describe types
 *   probe     run every method in rounds until it succeeds
 *   rerun     referee mode: a fresh box, an optional chain of setup runs, then
 *             one method with the driver's inputs
 *
 * @module
 */

import { join } from "jsr:@std/path@1.1.4";
import {
  type BoxLayout,
  diffSnapshots,
  type FileChange,
  readRegularFile,
  readStubCalls,
  type Snapshot,
  snapshot,
} from "./box.ts";
import { type CanarySet, redactValue, scanForCanaries } from "./canaries.ts";
import { generateRounds, type JsonSchema, runSchema } from "./inputs.ts";
import type {
  Isolation,
  NetworkPolicy,
  Step,
  StepResult,
} from "./isolation.ts";
import { parseJsonStream, parseRunOutput, parseStubCall } from "./observe.ts";
import type { MethodRun, MethodSummary, Report, SetupStep } from "./report.ts";
import { type ProbeTarget, pullSpec } from "./target.ts";

/** What a probe needs. */
export interface ProbeDeps {
  readonly isolation: Isolation;
  readonly box: BoxLayout;
  readonly canaries: CanarySet;
  /** The sandbox key and signin token: scanned for, and redacted. */
  readonly secrets: readonly string[];
  readonly registryHosts: readonly string[];
  readonly setupTimeoutMs: number;
  readonly methodTimeoutMs: number;
  readonly log: (msg: string, props?: Record<string, unknown>) => void;
}

/** One method of one type, as `behavior type describe` reported it. */
export interface DescribedMethod {
  readonly type: string;
  readonly method: string;
  readonly description: string;
  readonly schema: JsonSchema;
}

/** What preparing a box produced. */
export interface Prepared {
  readonly ok: boolean;
  readonly version?: string;
  readonly types: readonly string[];
  readonly grafts: readonly string[];
  readonly methods: readonly DescribedMethod[];
  readonly setup: readonly SetupStep[];
}

/**
 * Home-relative prefix of the files whose content is not scanned for the
 * sandbox key: swamp caches its own auth proof there (auth_verified.json and
 * kin). Canaries are still scanned for.
 */
const SWAMP_AUTH_CACHE = ".config/swamp/auth_";

class Observer {
  readonly #deps: ProbeDeps;
  readonly #seenStubCalls = new Set<string>();
  #steps = 0;

  constructor(deps: ProbeDeps) {
    this.#deps = deps;
  }

  async #snap(): Promise<Record<"home" | "tmp" | "repo", Snapshot>> {
    const b = this.#deps.box;
    return {
      home: await snapshot(b.home),
      tmp: await snapshot(b.tmp),
      repo: await snapshot(b.repo, [".swamp"]),
    };
  }

  /** Runs one step and gathers everything observable about it. */
  async step(
    args: string[],
    network: NetworkPolicy,
    shims: boolean,
    timeoutMs: number,
    scanOutput = true,
  ) {
    const before = await this.#snap();
    const id = String(++this.#steps).padStart(3, "0");
    const step: Step = { id, args, network, timeoutMs, shims };
    const result = await this.#deps.isolation.run(step);
    const after = await this.#snap();

    const fileChanges: (FileChange & { area: "home" | "tmp" | "repo" })[] = [];
    for (const area of ["home", "tmp", "repo"] as const) {
      for (const c of diffSnapshots(before[area], after[area])) {
        fileChanges.push({ ...c, area });
      }
    }
    const rawCalls = await readStubCalls(
      this.#deps.box.stubCalls,
      this.#seenStubCalls,
    );
    const overflow = rawCalls.filter((c) => c.id === "dropped");
    const stubCalls = rawCalls.filter((c) => c.id !== "dropped").map((c) => ({
      ...parseStubCall(c),
      stdinBytes: c.stdinBytes,
    }));
    const extraViolations = overflow.map((c) =>
      `stub-calls: ${c.argv.replace(/\0$/, "")}`
    );
    const sightings = await this.#scan(
      result,
      fileChanges,
      stubCalls,
      scanOutput,
    );
    return { result, fileChanges, stubCalls, sightings, extraViolations };
  }

  /** Every canary, and the sandbox key unless `keyToo` is false, in `text`. */
  look(text: string, where: string, keyToo = true) {
    const { canaries, secrets } = this.#deps;
    const out = scanForCanaries(canaries, text, where).map((s) => ({
      canary: s.canaryId,
      where: s.where,
    }));
    if (keyToo && secrets.some((k) => k.length >= 8 && text.includes(k))) {
      out.push({ canary: "sandbox-key", where });
    }
    return out;
  }

  async #scan(
    result: StepResult,
    changes: readonly (FileChange & { area: string })[],
    calls: readonly { argv: readonly string[]; stdin: string; cwd: string }[],
    scanOutput: boolean,
  ) {
    const out: { canary: string; where: string }[] = [];
    const look = (text: string, where: string, keyToo = true) =>
      out.push(...this.look(text, where, keyToo));
    if (scanOutput) {
      look(result.stdout + "\n" + result.stderr, "the step's output");
    }
    calls.forEach((c, i) =>
      look(
        `${c.argv.join("\n")}\n${c.cwd}\n${c.stdin}`,
        `stub call ${i + 1}'s argv, cwd or stdin`,
      )
    );
    for (const e of result.network) {
      look(`${e.host} ${e.path ?? ""}`, `a request to ${e.host}`);
    }
    for (const c of changes) {
      if (c.change === "deleted") continue;
      const root = this.#deps.box[c.area as "home" | "tmp" | "repo"];
      const p = join(root, c.path);
      const read = await readRegularFile(p, 1024 * 1024);
      if (!read) continue;
      const where = `${c.area === "home" ? "~/" : `${c.area}/`}${c.path}`;
      const isAuthCache = c.area === "home" &&
        c.path.startsWith(SWAMP_AUTH_CACHE);
      look(read.text, `file ${where}`, !isAuthCache);
    }
    return out;
  }
}

function observation(o: Awaited<ReturnType<Observer["step"]>>) {
  return {
    exitCode: o.result.exitCode,
    timedOut: o.result.timedOut,
    durationMs: o.result.durationMs,
    network: [...o.result.network],
    networkObserved: o.result.networkObserved,
    ...(o.result.networkGap ? { networkGap: o.result.networkGap } : {}),
    violations: [...o.result.violations, ...o.extraViolations],
    fileChanges: o.fileChanges,
    sightings: o.sightings,
  };
}

function lastError(o: { result: StepResult }): string {
  const docs = parseJsonStream(o.result.stdout + "\n" + o.result.stderr);
  const err = docs.findLast((d) =>
    typeof d === "object" && d !== null && "error" in d
  ) as { error?: unknown } | undefined;
  if (err?.error) return String(err.error).slice(0, 2000);
  if (o.result.timedOut) return "timed out";
  return (o.result.stderr || o.result.stdout).trim().slice(-2000);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** The service. */
export class ProbeRun {
  readonly #deps: ProbeDeps;
  readonly #observer: Observer;
  readonly runs: MethodRun[] = [];

  constructor(deps: ProbeDeps) {
    this.#deps = deps;
    this.#observer = new Observer(deps);
  }

  #registry(): NetworkPolicy {
    return { kind: "registry", hosts: this.#deps.registryHosts };
  }

  /** Init, info, pull, describe. Stops at the first step that fails. */
  async prepare(target: ProbeTarget): Promise<Prepared> {
    const d = this.#deps;
    const setup: SetupStep[] = [];
    const record = (
      step: SetupStep["step"],
      o: Awaited<ReturnType<Observer["step"]>>,
      ok: boolean,
      detail: string,
    ) => setup.push({ step, ok, detail, ...observation(o) });
    const fail = (): Prepared => ({
      ok: false,
      types: [],
      grafts: [],
      methods: [],
      setup,
    });

    d.log("Initialising the box repo");
    const init = await this.#observer.step(
      ["repo", "init", "--json"],
      this.#registry(),
      false,
      d.setupTimeoutMs,
    );
    const initOk = init.result.exitCode === 0;
    record("init", init, initOk, initOk ? "repo initialised" : lastError(init));
    if (!initOk) return fail();

    // The types swamp has before the pull, so the pull's own can be found
    // after it, whatever the registry's metadata says.
    const builtIn = await this.#typeSearch();
    if (!builtIn.ok) {
      record("init", builtIn.o, false, lastError(builtIn.o));
      return fail();
    }

    d.log("Reading {name} from the registry", { name: target.name });
    const info = await this.#observer.step(
      ["extension", "info", target.name, "--json"],
      this.#registry(),
      false,
      d.setupTimeoutMs,
    );
    const infoDoc = parseJsonStream(info.result.stdout).find(isRecord);
    const meta = infoDoc && isRecord(infoDoc.contentMetadata)
      ? infoDoc.contentMetadata
      : undefined;
    const types = Array.isArray(meta?.models)
      ? meta.models.filter(isRecord).map((m) => String(m.type))
      : [];
    const grafts = Array.isArray(meta?.extensions)
      ? meta.extensions.filter(isRecord).map((e) =>
        String(e.targetType ?? e.type ?? e.fileName ?? "graft")
      )
      : [];
    const version = target.version ??
      (typeof infoDoc?.latestVersion === "string"
        ? infoDoc.latestVersion
        : undefined);
    const infoOk = info.result.exitCode === 0 && !!infoDoc;
    record(
      "info",
      info,
      infoOk,
      infoOk
        ? `${types.length} behavior type(s): ${types.join(", ") || "none"}`
        : lastError(info),
    );
    if (!infoOk) return fail();

    const spec = pullSpec(version ? { ...target, version } : target);
    d.log("Pulling {spec} into the box", { spec });
    const pull = await this.#observer.step(
      ["extension", "pull", spec, "--yes", "--json"],
      this.#registry(),
      false,
      d.setupTimeoutMs,
    );
    const pullOk = pull.result.exitCode === 0;
    record(
      "pull",
      pull,
      pullOk,
      pullOk ? pullWarnings(pull.result) : lastError(pull),
    );
    if (!pullOk) return fail();

    // The registry's metadata is the latest version's; a pinned version can
    // have types it lacks. Probe what is actually installed as well.
    const installed = await this.#typeSearch();
    const added = installed.found.filter((t) => !builtIn.found.includes(t));
    const extra = added.filter((t) => !types.includes(t));
    record(
      "types",
      installed.o,
      installed.ok,
      installed.ok
        ? `installed: ${added.join(", ") || "none"}${
          extra.length
            ? `; not in the registry metadata: ${extra.join(", ")}`
            : ""
        }`
        : lastError(installed.o),
    );
    if (!installed.ok) return fail();
    types.push(...extra);

    const methods: DescribedMethod[] = [];
    for (const type of types) {
      const desc = await this.#observer.step(
        ["behavior", "type", "describe", type, "--json"],
        { kind: "none" },
        false,
        d.setupTimeoutMs,
      );
      const doc = parseJsonStream(desc.result.stdout).find(isRecord);
      const ms = doc && Array.isArray(doc.methods)
        ? doc.methods.filter(isRecord)
        : [];
      const ok = desc.result.exitCode === 0 && ms.length > 0;
      record(
        "describe",
        desc,
        ok,
        ok
          ? `${type}: ${ms.map((m) => m.name).join(", ")}`
          : `${type}: ${lastError(desc)}`,
      );
      const globalArgs = isRecord(doc?.globalArguments)
        ? doc.globalArguments as JsonSchema
        : undefined;
      for (const m of ms) {
        methods.push({
          type,
          method: String(m.name),
          description: typeof m.description === "string" ? m.description : "",
          schema: runSchema(
            globalArgs,
            isRecord(m.arguments) ? m.arguments as JsonSchema : undefined,
          ),
        });
      }
    }
    return {
      ok: true,
      ...(version ? { version } : {}),
      types,
      grafts,
      methods,
      setup,
    };
  }

  /** Every behavior type swamp can see in the box. Loads pulled bundles. */
  async #typeSearch() {
    const o = await this.#observer.step(
      ["behavior", "type", "search", "--json"],
      { kind: "none" },
      false,
      this.#deps.setupTimeoutMs,
    );
    const doc = parseJsonStream(o.result.stdout).find(isRecord);
    const found = doc && Array.isArray(doc.results)
      ? doc.results.filter(isRecord).map((r) => String(r.normalized ?? r.raw))
      : [];
    return { o, ok: o.result.exitCode === 0 && !!doc, found };
  }

  /** Runs one method once and records it. */
  async runMethod(
    m: DescribedMethod,
    round: string,
    inputs: Record<string, unknown>,
    stubbed: readonly string[],
    before: readonly string[] = [],
    definition?: string,
  ): Promise<MethodRun> {
    const d = this.#deps;
    // Each blind run gets its own definition, so no state carries between
    // runs. Referee chains pass one name so state does carry.
    const defName = (definition ?? `probe-${m.method}-${this.runs.length + 1}`)
      .replace(/[^a-zA-Z0-9_-]/g, "-");
    d.log("Running {type} {method} ({round})", {
      type: m.type,
      method: m.method,
      round,
    });
    const o = await this.#observer.step(
      [
        "behavior",
        "run",
        `@${m.type}`,
        m.method,
        defName,
        "--input",
        JSON.stringify(inputs),
        "--literal-inputs",
        "--json",
      ],
      { kind: "none" },
      true,
      d.methodTimeoutMs,
      false,
    );
    const outcome = parseRunOutput(o.result.stdout, o.result.stderr);
    const status = o.result.timedOut ? "failed" : outcome.status;
    // The target writes the error text; cap it so it cannot bloat the report.
    const errorText = outcome.errorText?.slice(0, 2000) ??
      (status === "succeeded" ? undefined : lastError(o));
    if (errorText) {
      o.sightings.push(...this.#observer.look(errorText, "the error message"));
    }
    for (const x of outcome.data) {
      o.sightings.push(...this.#observer.look(x.json, `data ${x.name}`));
    }
    // Whatever else the run printed (logs, progress), once per canary: what
    // was already seen in its data or error is not counted twice.
    const seen = new Set(o.sightings.map((x) => x.canary));
    for (
      const x of this.#observer.look(
        `${o.result.stdout}\n${o.result.stderr}`,
        "the run's output",
      )
    ) {
      if (!seen.has(x.canary)) {
        seen.add(x.canary);
        o.sightings.push(x);
      }
    }
    const run: MethodRun = {
      type: m.type,
      method: m.method,
      round,
      before: [...before],
      inputs,
      stubbed: [...stubbed],
      status,
      ...(outcome.errorCode ? { errorCode: outcome.errorCode } : {}),
      ...(errorText ? { errorText } : {}),
      data: outcome.data.map((x) => ({ name: x.name, bytes: x.bytes })),
      stubCalls: o.stubCalls.map((c) => ({
        invokedAs: c.invokedAs,
        argv: [...c.argv],
        cwd: c.cwd,
        stdinBytes: c.stdinBytes,
        stdinHead: c.stdin.slice(0, 500),
      })),
      ...observation(o),
    };
    this.runs.push(run);
    return run;
  }

  /** Blind mode: every method, round by round, until each succeeds. */
  async probeAll(
    methods: readonly DescribedMethod[],
    allRounds: boolean,
  ): Promise<void> {
    const b = this.#deps.box;
    for (const m of methods) {
      const rounds = generateRounds(m.schema, {
        stubPath: b.stub,
        samplePath: b.sample,
        scratchDir: b.scratch,
      });
      for (const r of rounds) {
        const run = await this.runMethod(
          m,
          r.round,
          { ...r.inputs },
          r.stubbed,
        );
        if (run.status === "succeeded" && !allRounds) break;
      }
    }
  }
}

function pullWarnings(r: StepResult): string {
  const docs = parseJsonStream(r.stdout + "\n" + r.stderr).filter(isRecord);
  const warnings: string[] = [];
  for (const d of docs) {
    for (const key of ["warnings", "safetyWarnings", "warning"]) {
      const v = d[key];
      if (typeof v === "string") warnings.push(v);
      else if (Array.isArray(v)) {
        for (const w of v) {
          warnings.push(typeof w === "string" ? w : JSON.stringify(w));
        }
      } else if (isRecord(v)) warnings.push(JSON.stringify(v));
    }
  }
  return warnings.length
    ? `pulled; warnings: ${warnings.join(" | ").slice(0, 4000)}`
    : "pulled; no warnings reported";
}

/** Per-method summary: did it ever succeed, and its last error if not. */
export function summarise(
  methods: readonly DescribedMethod[],
  runs: readonly MethodRun[],
  prior: readonly MethodSummary[] = [],
): MethodSummary[] {
  return methods.map((m) => {
    const mine = runs.filter((r) => r.type === m.type && r.method === m.method);
    const was = prior.find((p) => p.type === m.type && p.method === m.method);
    const succeeded = (was?.succeeded ?? false) ||
      mine.some((r) => r.status === "succeeded");
    const last = mine.at(-1);
    const lastError = succeeded ? undefined : last?.errorText ?? was?.lastError;
    return {
      type: m.type,
      method: m.method,
      description: m.description,
      schema: m.schema as Record<string, unknown>,
      succeeded,
      ...(lastError ? { lastError } : {}),
    };
  });
}

/** Builds the stored report, with every secret redacted. */
export function buildReport(parts: {
  target: ProbeTarget;
  prepared: Prepared;
  runs: readonly MethodRun[];
  methods: readonly MethodSummary[];
  isolation: "nono" | "external";
  canaries: CanarySet;
  secrets: readonly string[];
  startedAt: Date;
  finishedAt: Date;
}): Report {
  const notObserved = parts.isolation === "external"
    ? [
      "network attempts",
      "unexpected hosts on pull",
      "sandbox violations",
      "filesystem access outside the box",
    ]
    : [];
  const report: Report = {
    target: parts.target.name,
    ...(parts.prepared.version ? { version: parts.prepared.version } : {}),
    isolation: parts.isolation,
    notObserved,
    startedAt: parts.startedAt.toISOString(),
    finishedAt: parts.finishedAt.toISOString(),
    types: [...parts.prepared.types],
    skippedGrafts: [...parts.prepared.grafts],
    setup: [...parts.prepared.setup],
    methods: [...parts.methods],
    runs: [...parts.runs],
    canaries: parts.canaries.canaries.map((c) => ({
      id: c.id,
      locations: [...c.locations],
    })),
  };
  return redactValue(report, parts.secrets) as Report;
}
