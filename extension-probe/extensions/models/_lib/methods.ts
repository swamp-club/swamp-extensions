/**
 * Method bodies for probe, start and record, with the process runner
 * injectable so tests never spawn nono or swamp.
 *
 * @module
 */

import { DELIMITER, isAbsolute, join } from "jsr:@std/path@1.1.4";
import { z } from "npm:zod@4.6.7";
import {
  boxLayout,
  createBox,
  DEFAULT_STUB_COMMANDS,
  removeBox,
} from "./box.ts";
import { type CanarySet, makeCanaries, redactValue } from "./canaries.ts";
import { classify, type Findings } from "./findings.ts";
import {
  checkAcknowledgement,
  type Exec,
  EXTERNAL_ACKNOWLEDGEMENT,
  ExternalIsolation,
  type Isolation,
  NonoIsolation,
} from "./isolation.ts";
import {
  buildReport,
  type DescribedMethod,
  type ProbeDeps,
  ProbeRun,
  summarise,
} from "./probe.ts";
import { type Report, ReportSchema } from "./report.ts";
import {
  admit,
  applyAttempt,
  openSession,
  type Session,
  SessionSchema,
} from "./session.ts";
import { parseTarget, type ProbeTarget, targetSlug } from "./target.ts";
import { isToolPathField as isToolPath, type JsonSchema } from "./inputs.ts";

export const GlobalArgsSchema = z.object({
  sandboxApiKey: z.string().min(1).meta({ sensitive: true }).describe(
    "The sandbox account's SWAMP_API_KEY: a throwaway collective with no other privileges. Wire it to a vault item, e.g. ${{ vault.get(extension-probe-sandbox, SWAMP_API_KEY) }}. The extension under test can read it; never use your own key.",
  ),
  sandboxSigninToken: z.string().min(1).optional().meta({ sensitive: true })
    .describe(
      "Optional. The sandbox token's SWAMP_SIGNIN_TOKEN. Without it, the init step verifies the key with swamp-club and caches the proof in the box, which is enough for the rest of the probe. Leave it out to keep one fewer secret in the box.",
    ),
  isolation: z.enum(["nono", "external"]).default("nono").describe(
    "nono (Linux): every step runs under nono, confined to the box with all network through nono's proxy. external: no sandbox from this probe, for running inside a sandbox you control; needs acknowledgeUnsandboxed.",
  ),
  acknowledgeUnsandboxed: z.string().optional().describe(
    `Required for isolation external, set to exactly: "${EXTERNAL_ACKNOWLEDGEMENT}"`,
  ),
  nonoPath: z.string().default("nono").describe(
    "The nono binary: an absolute path, or a name looked up on PATH.",
  ),
  swampPath: z.string().optional().describe(
    "The swamp binary to run inside the box. Defaults to the swamp running this method.",
  ),
  registryHosts: z.array(z.string().min(1)).default([
    "swamp-club.com",
    "*.swamp-club.com",
    "sfo3.digitaloceanspaces.com",
  ]).describe(
    "Hosts the init, info and pull steps may reach: the registry, and the object store it serves archives from. Any other host they contact is an unexpected-host finding.",
  ),
  memory: z.string().default("2G").describe("nono's memory cap per step."),
  maxProcesses: z.number().int().positive().default(256).describe(
    "nono's process cap per step.",
  ),
  stubCommands: z.array(z.string().min(1)).default([...DEFAULT_STUB_COMMANDS])
    .describe(
      "Command names that resolve to the logging stub on method runs' PATH.",
    ),
  setupTimeoutMs: z.number().int().positive().default(300_000).describe(
    "Timeout for init, info, pull and describe steps.",
  ),
  methodTimeoutMs: z.number().int().positive().default(120_000).describe(
    "Timeout for one method run.",
  ),
  maxAttempts: z.number().int().min(1).max(50).default(10).describe(
    "Referee-mode attempts per session.",
  ),
  keepBox: z.boolean().default(false).describe(
    "Leave the box directory on disk after the run, for inspection.",
  ),
});
export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

const SessionArg = z.string().regex(/^[a-z0-9_-]+$/).optional().describe(
  "Names the report, findings and session data. Defaults to the target's slug, e.g. skunk-ape-stef.",
);

export const ProbeArgsSchema = z.object({
  target: z.string().min(1).describe(
    "The extension to probe: @collective/name or @collective/name@YYYY.MM.DD.N. Only @skunk-ape and @swamp are allowed.",
  ),
  session: SessionArg,
  allRounds: z.boolean().default(false).describe(
    "Run every input round for every method, not just until it first succeeds.",
  ),
});
export type ProbeArgs = z.infer<typeof ProbeArgsSchema>;

export const StartArgsSchema = z.object({
  session: z.string().regex(/^[a-z0-9_-]+$/).describe(
    "The probe's session name (the target's slug unless probe was given one).",
  ),
});

export const RecordArgsSchema = z.object({
  session: z.string().regex(/^[a-z0-9_-]+$/),
  type: z.string().min(1).describe("The gap's behavior type."),
  method: z.string().min(1).describe("The gap's method."),
  inputs: z.record(z.string(), z.unknown()).default({}).describe(
    "Inputs for the method, as one JSON object over global and method arguments. Tool-path fields are always pointed at the stub.",
  ),
  before: z.array(z.object({
    method: z.string().min(1),
    type: z.string().min(1).optional(),
    inputs: z.record(z.string(), z.unknown()).default({}),
  })).default([]).describe(
    "Methods to run first, in order, in the same fresh box (for a method that needs another's state).",
  ),
  stubOutput: z.string().optional().describe(
    "What the logging stub prints to stdout for this attempt, for a method that parses its tool's reply (a JSON object, say). Defaults to {}.",
  ),
});
export type RecordArgs = z.infer<typeof RecordArgsSchema>;

/** The method context the probe uses. */
export interface ProbeContext {
  readonly globalArgs: GlobalArgs;
  readonly logger: {
    info: (msg: string, props?: Record<string, unknown>) => void;
  };
  readonly writeResource: (
    spec: string,
    name: string,
    data: Record<string, unknown>,
  ) => Promise<{ name: string }>;
  readonly readResource: (
    name: string,
    version?: number,
  ) => Promise<Record<string, unknown> | null>;
}

/** Test seams. */
export interface Seams {
  readonly exec?: Exec;
  readonly os?: string;
  readonly env?: (name: string) => string | undefined;
  readonly execPath?: () => string;
  readonly canaries?: () => CanarySet;
}

/** Finds a program on PATH, or returns it unchanged when absolute. */
export async function resolveProgram(
  name: string,
  pathVar: string | undefined,
): Promise<string> {
  if (isAbsolute(name)) return name;
  for (const dir of (pathVar ?? "").split(DELIMITER)) {
    if (!dir) continue;
    const p = join(dir, name);
    try {
      const st = await Deno.stat(p);
      if (st.isFile) return p;
    } catch { /* not here */ }
  }
  throw new Error(
    `Cannot find ${name} on PATH. Install nono (https://github.com/always-further/nono) or set nonoPath.`,
  );
}

interface Rig {
  readonly deps: ProbeDeps;
  readonly cleanup: () => Promise<void>;
  readonly isolation: Isolation;
}

async function rig(ctx: ProbeContext, seams: Seams): Promise<Rig> {
  const g = ctx.globalArgs;
  const env = seams.env ?? ((n: string) => Deno.env.get(n));
  const os = seams.os ?? Deno.build.os;
  if (g.isolation === "nono" && os !== "linux") {
    throw new Error(
      `isolation "nono" is Linux-only in v1 (this is ${os}). On other systems run the probe inside your own sandbox with isolation "external".`,
    );
  }
  if (g.isolation === "external") {
    checkAcknowledgement(g.acknowledgeUnsandboxed);
  }
  const root = await Deno.makeTempDir({ prefix: "extension-probe-" });
  try {
    return await rigBox(ctx, seams, root, env);
  } catch (e) {
    // The box holds canaries; never leave it behind on a failed setup.
    await removeBox(root);
    throw e;
  }
}

async function rigBox(
  ctx: ProbeContext,
  seams: Seams,
  root: string,
  env: (name: string) => string | undefined,
): Promise<Rig> {
  const g = ctx.globalArgs;
  const box = boxLayout(root);
  const canaries = (seams.canaries ?? makeCanaries)();
  await createBox(box, canaries, g.stubCommands);
  const swampPath = g.swampPath ?? (seams.execPath ?? Deno.execPath)();
  const base = {
    box,
    swampPath,
    apiKey: g.sandboxApiKey,
    ...(g.sandboxSigninToken ? { signinToken: g.sandboxSigninToken } : {}),
    canaryEnv: canaries.env,
    ...(seams.exec ? { exec: seams.exec } : {}),
  };
  let isolation: Isolation;
  if (g.isolation === "nono") {
    const realHome = env("HOME");
    if (!realHome) throw new Error("HOME is not set; nono needs it.");
    isolation = new NonoIsolation({
      ...base,
      nonoPath: seams.exec
        ? g.nonoPath
        : await resolveProgram(g.nonoPath, env("PATH")),
      realHome,
      memory: g.memory,
      maxProcesses: g.maxProcesses,
    });
  } else {
    isolation = new ExternalIsolation(base, g.acknowledgeUnsandboxed);
  }
  const deps: ProbeDeps = {
    isolation,
    box,
    canaries,
    secrets: [g.sandboxApiKey, g.sandboxSigninToken ?? ""].filter(Boolean),
    registryHosts: g.registryHosts,
    setupTimeoutMs: g.setupTimeoutMs,
    methodTimeoutMs: g.methodTimeoutMs,
    log: (m, p) => ctx.logger.info(m, p),
  };
  const cleanup = async () => {
    if (g.keepBox) {
      ctx.logger.info("Kept the box at {root}", { root });
      return;
    }
    if (!await removeBox(root)) {
      ctx.logger.info(
        "Could not remove the box at {root}; delete it by hand: it holds canary files",
        { root },
      );
    }
  };
  return { deps, cleanup, isolation };
}

async function writeOutputs(
  ctx: ProbeContext,
  session: string,
  report: Report,
): Promise<{ findings: Findings; handles: { name: string }[] }> {
  const findings = classify(report, ctx.globalArgs.registryHosts);
  const handles = [
    await ctx.writeResource(
      "report",
      `report-${session}`,
      report as unknown as Record<string, unknown>,
    ),
    await ctx.writeResource(
      "findings",
      `findings-${session}`,
      findings as unknown as Record<string, unknown>,
    ),
  ];
  return { findings, handles };
}

/** The probe method. */
export async function probeMethod(
  args: ProbeArgs,
  ctx: ProbeContext,
  seams: Seams = {},
): Promise<{ dataHandles: { name: string }[] }> {
  const target = parseTarget(args.target);
  const session = args.session ?? targetSlug(target);
  const { deps, cleanup, isolation } = await rig(ctx, seams);
  const startedAt = new Date();
  try {
    const run = new ProbeRun(deps);
    const prepared = await run.prepare(target);
    if (prepared.ok) await run.probeAll(prepared.methods, args.allRounds);
    const report = buildReport({
      target,
      prepared,
      runs: run.runs,
      methods: summarise(prepared.methods, run.runs),
      isolation: isolation.mode,
      canaries: deps.canaries,
      secrets: deps.secrets,
      startedAt,
      finishedAt: new Date(),
    });
    const { findings, handles } = await writeOutputs(ctx, session, report);
    ctx.logger.info(
      "Probed {target}: {ok} of {total} method(s) succeeded, {blocking} blocking finding(s)",
      {
        target: target.name,
        ok: report.methods.filter((m) => m.succeeded).length,
        total: report.methods.length,
        blocking: findings.blockingCount,
      },
    );
    if (!prepared.ok) {
      // From the redacted report: the pull runs the target's code, which can
      // print the sandbox key before it fails.
      const failed = report.setup.at(-1);
      ctx.logger.info("Setup stopped at {step}: {detail}", {
        step: failed?.step ?? "init",
        detail: failed?.detail ?? "",
      });
    }
    return { dataHandles: handles };
  } finally {
    await cleanup();
  }
}

async function readReport(ctx: ProbeContext, session: string) {
  const raw = await ctx.readResource(`report-${session}`);
  if (!raw) {
    throw new Error(
      `No probe report for session "${session}" — run probe first.`,
    );
  }
  return ReportSchema.parse(raw);
}

/** The start method. */
export async function startMethod(
  args: { session: string },
  ctx: ProbeContext,
): Promise<{ dataHandles: { name: string }[] }> {
  const report = await readReport(ctx, args.session);
  const s = openSession({
    session: args.session,
    target: report.target,
    ...(report.version ? { version: report.version } : {}),
    methods: report.methods,
    maxAttempts: ctx.globalArgs.maxAttempts,
  });
  ctx.logger.info("Session {session}: {gaps} gap(s). {next}", {
    session: args.session,
    gaps: s.gaps.length,
    next: s.nextAction,
  });
  return {
    dataHandles: [
      await ctx.writeResource(
        "session",
        `session-${args.session}`,
        s as unknown as Record<string, unknown>,
      ),
    ],
  };
}

/** The record method. */
export async function recordMethod(
  args: RecordArgs,
  ctx: ProbeContext,
  seams: Seams = {},
): Promise<{ dataHandles: { name: string }[] }> {
  const raw = await ctx.readResource(`session-${args.session}`);
  if (!raw) {
    throw new Error(`No session "${args.session}" — run start first.`);
  }
  const session: Session = SessionSchema.parse(raw);
  admit(session, args.type, args.method);
  const report = await readReport(ctx, args.session);
  const target: ProbeTarget = parseTarget(
    report.version ? `${report.target}@${report.version}` : report.target,
  );

  const { deps, cleanup } = await rig(ctx, seams);
  try {
    if (args.stubOutput !== undefined) {
      await Deno.writeTextFile(deps.box.stubOutput, args.stubOutput);
    }
    const run = new ProbeRun(deps);
    const prepared = await run.prepare(target);
    let status: "succeeded" | "failed" | "unknown" = "failed";
    let errorText: string | undefined = prepared.ok
      ? undefined
      : `setup failed at ${prepared.setup.at(-1)?.step}: ${
        prepared.setup.at(-1)?.detail
      }`;
    const attemptNo = session.attempt + 1;
    const round = `referee-${attemptNo}`;
    if (prepared.ok) {
      const find = (type: string, method: string): DescribedMethod => {
        const m = prepared.methods.find((x) =>
          x.type === type && x.method === method
        );
        if (!m) throw new Error(`${type} has no method ${method}.`);
        return m;
      };
      const before: string[] = [];
      const stub = withStub(deps.box.stub);
      // One definition for the whole chain, so state carries from the
      // methods in before to the one under test.
      const definition = `probe-referee-${attemptNo}`;
      for (const b of args.before) {
        const m = find(b.type ?? args.type, b.method);
        const inputs = stub(m.schema, b.inputs);
        await run.runMethod(m, round, inputs.inputs, inputs.stubbed, [
          ...before,
        ], definition);
        before.push(b.method);
      }
      const m = find(args.type, args.method);
      const inputs = stub(m.schema, args.inputs);
      const r = await run.runMethod(
        m,
        round,
        inputs.inputs,
        inputs.stubbed,
        before,
        definition,
      );
      status = r.status;
      errorText = r.errorText;
    }
    const next = applyAttempt(session, {
      type: args.type,
      method: args.method,
      before: args.before.map((b) => b.method),
      status,
      ...(errorText ? { errorText } : {}),
    });
    const runs = [...report.runs, ...run.runs];
    const methods = report.methods.map((m) => {
      const mine = run.runs.filter((r) =>
        r.type === m.type && r.method === m.method
      );
      if (!mine.length) return m;
      const succeeded = m.succeeded ||
        mine.some((r) => r.status === "succeeded");
      const { lastError: _old, ...rest } = m;
      const last = mine.at(-1)?.errorText;
      return {
        ...rest,
        succeeded,
        ...(!succeeded && last ? { lastError: last } : {}),
      };
    });
    const updated: Report = redactValue({
      ...report,
      finishedAt: new Date().toISOString(),
      setup: [...report.setup, ...prepared.setup],
      runs,
      methods,
    }, deps.secrets) as Report;
    const { handles } = await writeOutputs(ctx, args.session, updated);
    const sessionHandle = await ctx.writeResource(
      "session",
      `session-${args.session}`,
      redactValue(next, deps.secrets) as Record<string, unknown>,
    );
    ctx.logger.info(
      "Attempt {attempt}/{max} on {method}: {status}. {next}",
      {
        attempt: next.attempt,
        max: next.maxAttempts,
        method: args.method,
        status,
        next: next.nextAction,
      },
    );
    return { dataHandles: [...handles, sessionHandle] };
  } finally {
    await cleanup();
  }
}

/**
 * Points every tool-path field of a schema at the stub, whatever the driver
 * sent, at any depth: the driver reads error text the target controls, so the
 * target can steer it toward a nested `{"config": {"claudePath": ...}}`.
 */
export function withStub(stubPath: string) {
  // Walk the inputs themselves, not just the schema: arrays and objects the
  // schema leaves open are where a steered driver would put a real path.
  const walk = (
    v: unknown,
    prefix: string,
    stubbed: string[],
  ): unknown => {
    if (Array.isArray(v)) {
      return v.map((x, i) => walk(x, `${prefix}${i}.`, stubbed));
    }
    if (!v || typeof v !== "object") return v;
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(v)) {
      if (isToolPath(k) && (typeof x === "string" || x === null)) {
        out[k] = stubPath;
        stubbed.push(prefix + k);
      } else {
        out[k] = walk(x, `${prefix}${k}.`, stubbed);
      }
    }
    return out;
  };
  return (schema: JsonSchema, inputs: Record<string, unknown>) => {
    const stubbed: string[] = [];
    const out = walk(inputs, "", stubbed) as Record<string, unknown>;
    // Declared top-level string tool paths are stubbed even when not sent, so
    // a schema default never runs the real program.
    for (const [k, v] of Object.entries(schema.properties ?? {})) {
      if (isToolPath(k) && v.type === "string" && !(k in out)) {
        out[k] = stubPath;
        stubbed.push(k);
      }
    }
    return { inputs: out, stubbed };
  };
}
