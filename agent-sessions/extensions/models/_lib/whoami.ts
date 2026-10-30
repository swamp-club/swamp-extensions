/**
 * The swamp-club identity an import is attributed to. `swamp auth whoami
 * --json` also returns the account's email, name, plan and collectives; only
 * `id` and `username` are read. A collective API key names a collective, not
 * a person, so its imports carry no identity.
 *
 * @module
 */

/** Who imported the sessions, as the record and its tag carry it. */
export interface SwampIdentity {
  readonly swampUserId: string;
  readonly swampUsername: string;
}

/** Picks the identity out of a whoami reply; anything else is ignored. */
export function identityFrom(reply: unknown): SwampIdentity | undefined {
  if (typeof reply !== "object" || reply === null) return undefined;
  const r = reply as Record<string, unknown>;
  if (r.authenticated === false) return undefined;
  if (r.collectiveId !== undefined && r.collectiveId !== null) return undefined;
  if (r.keyType === "collective" || r.principalType === "collective") {
    return undefined;
  }
  if (typeof r.id !== "string" || typeof r.username !== "string") {
    return undefined;
  }
  const id = r.id.trim();
  const username = r.username.trim();
  if (
    id === "" || id.length > 200 || username === "" || username.length > 200
  ) {
    return undefined;
  }
  return { swampUserId: id, swampUsername: username };
}

/**
 * What whoami said: an identity; `none` when it answered with no personal
 * identity (logged out, a collective key); `failed` when it did not answer
 * (offline, slow, an error), so the importer keeps what records already had.
 */
export type WhoamiResult =
  | { readonly kind: "identity"; readonly identity: SwampIdentity }
  | { readonly kind: "none" }
  | { readonly kind: "failed" };

/** Classifies a parsed whoami reply. */
export function whoamiResultFrom(reply: unknown): WhoamiResult {
  const identity = identityFrom(reply);
  return identity ? { kind: "identity", identity } : { kind: "none" };
}

/**
 * Asks the running swamp who is logged in. Inside a method `Deno.execPath()`
 * is the swamp binary. The import carries on whatever it answers.
 */
export async function swampWhoami(
  timeoutMs = 10_000,
): Promise<WhoamiResult> {
  try {
    const out = await new Deno.Command(Deno.execPath(), {
      args: ["auth", "whoami", "--json", "--no-telemetry"],
      stdout: "piped",
      stderr: "null",
      signal: AbortSignal.timeout(timeoutMs),
    }).output();
    if (!out.success) return { kind: "failed" };
    const text = new TextDecoder().decode(out.stdout);
    const start = text.indexOf("{");
    return start < 0
      ? { kind: "failed" }
      : whoamiResultFrom(JSON.parse(text.slice(start)));
  } catch {
    return { kind: "failed" };
  }
}
