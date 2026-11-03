/**
 * Parsers for what a probe observes: swamp's `--json` output, nono's audit
 * record of network attempts, and the logging stub's call records.
 *
 * Everything parsed here was produced by, or under the influence of, the
 * extension under test. Parsers never throw on malformed input; they return
 * what they can and say what they could not read.
 *
 * @module
 */

/** Splits a stream of concatenated JSON documents (swamp `--json` output). */
export function parseJsonStream(text: string): unknown[] {
  const docs: unknown[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') {
      if (depth > 0) inString = true;
      continue;
    }
    if (c === "{" || c === "[") {
      if (depth === 0) start = i;
      depth++;
    } else if ((c === "}" || c === "]") && depth > 0) {
      depth--;
      if (depth === 0 && start >= 0) {
        try {
          docs.push(JSON.parse(text.slice(start, i + 1)));
        } catch {
          // A fragment that is not JSON (log text with braces); skip it.
        }
        start = -1;
      }
    }
  }
  return docs;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** One data artifact a method wrote. */
export interface DataWritten {
  readonly name: string;
  readonly bytes: number;
  /** The attributes as JSON, for canary scanning; not stored. */
  readonly json: string;
}

/** What one `swamp behavior run --json` call reported. */
export interface RunOutcome {
  readonly status: "succeeded" | "failed" | "unknown";
  readonly errorCode?: string;
  readonly errorText?: string;
  readonly data: readonly DataWritten[];
}

/** Reads the result document of `swamp behavior run --json`. */
export function parseRunOutput(stdout: string, stderr: string): RunOutcome {
  const docs = [...parseJsonStream(stdout), ...parseJsonStream(stderr)]
    .filter(isRecord);
  // Match swamp's own shapes, not any object with a status: the code under
  // test can print to the same streams.
  const result = docs.findLast((d) =>
    typeof d.status === "string" && typeof d.methodName === "string" &&
    Array.isArray(d.dataArtifacts)
  );
  const error = docs.findLast((d) =>
    typeof d.error === "string" && typeof d.code === "string"
  );
  const data: DataWritten[] = [];
  const artifacts = result && Array.isArray(result.dataArtifacts)
    ? result.dataArtifacts
    : [];
  for (const a of artifacts) {
    if (!isRecord(a)) continue;
    const json = JSON.stringify(a.attributes ?? null);
    data.push({
      name: typeof a.name === "string" ? a.name : "(unnamed)",
      bytes: json.length,
      json,
    });
  }
  if (result && result.status === "succeeded") {
    return { status: "succeeded", data };
  }
  if (error || (result && result.status === "failed")) {
    const errText = error ? String(error.error) : undefined;
    const code = error && typeof error.code === "string"
      ? error.code
      : undefined;
    return {
      status: "failed",
      ...(code ? { errorCode: code } : {}),
      ...(errText ? { errorText: errText } : {}),
      data,
    };
  }
  return { status: "unknown", data };
}

/** One network attempt nono's proxy decided on. */
export interface NetworkEvent {
  readonly decision: "allow" | "deny";
  readonly host: string;
  readonly port?: number;
  readonly method?: string;
  readonly path?: string;
  readonly reason?: string;
}

/**
 * Reads `network_events` from `nono audit show <id> --json`. Null when the
 * output has no such list: an audit that cannot be read is not "no network".
 */
export function parseNonoAudit(text: string): NetworkEvent[] | null {
  const doc = parseJsonStream(text).find(isRecord);
  if (!doc || !Array.isArray(doc.network_events)) return null;
  const out: NetworkEvent[] = [];
  for (const e of doc.network_events) {
    if (!isRecord(e) || typeof e.target !== "string") continue;
    out.push({
      decision: e.decision === "allow" ? "allow" : "deny",
      host: e.target,
      ...(typeof e.port === "number" ? { port: e.port } : {}),
      ...(typeof e.method === "string" ? { method: e.method } : {}),
      ...(typeof e.path === "string" ? { path: e.path } : {}),
      ...(typeof e.reason === "string" ? { reason: e.reason } : {}),
    });
  }
  return out;
}

/** Finds the session id of the nono run that tracked `path`. */
export function findAuditSession(
  listJson: string,
  path: string,
): string | null {
  const doc = parseJsonStream(listJson)[0];
  if (!Array.isArray(doc)) return null;
  const hits = doc.filter((s) =>
    isRecord(s) && Array.isArray(s.tracked_paths) &&
    s.tracked_paths.includes(path) && typeof s.session_id === "string"
  ) as Record<string, unknown>[];
  hits.sort((a, b) => String(b.started).localeCompare(String(a.started)));
  return hits.length ? String(hits[0].session_id) : null;
}

/** One call the logging stub recorded. */
export interface StubCall {
  /** The name the program was invoked as (`claude`, or the stub's own path). */
  readonly invokedAs: string;
  readonly argv: readonly string[];
  readonly cwd: string;
  readonly stdin: string;
}

/** Parses one stub call directory's files. */
export function parseStubCall(files: {
  invokedAs: string;
  argv: string;
  cwd: string;
  stdin: string;
}): StubCall {
  const argv = files.argv.split("\0");
  if (argv.at(-1) === "") argv.pop();
  return {
    invokedAs: files.invokedAs.trim(),
    argv,
    cwd: files.cwd.trim(),
    stdin: files.stdin,
  };
}
