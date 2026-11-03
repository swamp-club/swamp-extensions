/**
 * ProbeTarget: the extension a probe pulls, as a value object.
 *
 * v1 probes only first-party and Seth's own collectives. The allowlist is
 * enforced here, not left to policy, because pulling an extension runs its
 * top-level code.
 *
 * @module
 */

/** Collectives a probe may pull from. */
export const ALLOWED_COLLECTIVES: readonly string[] = ["@skunk-ape", "@swamp"];

const NAME = /^(@[a-z0-9_-]+)\/([a-z0-9_-]+(?:\/[a-z0-9_-]+)*)$/;
const VERSION = /^\d{4}\.\d{2}\.\d{2}\.\d+$/;

/** An extension name, an optional exact version, and its collective. */
export interface ProbeTarget {
  readonly collective: string;
  readonly name: string;
  readonly version?: string;
}

/** Parses `@collective/name` or `@collective/name@YYYY.MM.DD.N`. */
export function parseTarget(
  raw: string,
  allowed: readonly string[] = ALLOWED_COLLECTIVES,
): ProbeTarget {
  const at = raw.lastIndexOf("@");
  const [name, version] = at > 0
    ? [raw.slice(0, at), raw.slice(at + 1)]
    : [raw, undefined];
  const m = NAME.exec(name);
  if (!m) {
    throw new Error(
      `"${raw}" is not an extension name. Expected @collective/name, optionally @collective/name@YYYY.MM.DD.N.`,
    );
  }
  if (version !== undefined && !VERSION.test(version)) {
    throw new Error(
      `"${version}" is not a CalVer version. Expected YYYY.MM.DD.N.`,
    );
  }
  const collective = m[1];
  if (!allowed.includes(collective)) {
    throw new Error(
      `Refusing to probe ${name}: only extensions from ${
        allowed.join(" or ")
      } may be pulled.`,
    );
  }
  return { collective, name, ...(version ? { version } : {}) };
}

/** The argument `swamp extension pull` takes. */
export function pullSpec(t: ProbeTarget): string {
  return t.version ? `${t.name}@${t.version}` : t.name;
}

/** A data-name-safe slug for a target, e.g. `skunk-ape-stef`. */
export function targetSlug(t: ProbeTarget): string {
  return t.name.replace(/^@/, "").replaceAll("/", "-");
}
