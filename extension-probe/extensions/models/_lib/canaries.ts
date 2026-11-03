/**
 * Canaries: fake credentials planted in the box's home and environment.
 *
 * Each canary carries a random marker. A canary is "seen" when its marker
 * turns up anywhere the probe can observe: a stub call, data a method wrote,
 * a file written in the box, a proxied request. Landlock cannot log reads of
 * granted files, so this detects use of a credential, not reads.
 *
 * The sandbox account's own key is treated the same way, as a secret that
 * must never leave the box, but its value is redacted from every record the
 * probe stores.
 *
 * @module
 */

/** One planted credential. */
export interface Canary {
  /** What it imitates, e.g. `aws-credentials`. */
  readonly id: string;
  /** Where it is planted: box-home-relative files, or `env:NAME`. */
  readonly locations: readonly string[];
  /** The random marker that identifies it. */
  readonly marker: string;
}

/** A file to write into the box home. */
export interface CanaryFile {
  readonly path: string;
  readonly content: string;
  readonly mode?: number;
}

/** Every canary for one box, and the files and env vars that plant them. */
export interface CanarySet {
  readonly canaries: readonly Canary[];
  readonly files: readonly CanaryFile[];
  readonly env: Readonly<Record<string, string>>;
}

function hex(bytes: number, random: (n: number) => Uint8Array): string {
  return Array.from(random(bytes), (b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function alnum(n: number, random: (n: number) => Uint8Array): string {
  const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  return Array.from(random(n), (b) => abc[b % abc.length]).join("");
}

/** Builds a fresh canary set; `random` is injectable for tests. */
export function makeCanaries(
  random: (n: number) => Uint8Array = (n) =>
    crypto.getRandomValues(new Uint8Array(n)),
): CanarySet {
  const awsKey = `AKIA${alnum(16, random)}`;
  const awsSecret = `probe${hex(18, random)}`;
  const ghToken = `ghp_probe${hex(16, random)}`;
  const npmToken = `npm_probe${hex(16, random)}`;
  const sshMarker = `probe${hex(16, random)}`;
  const anthropic = `sk-ant-probe${hex(16, random)}`;
  const openai = `sk-probe${hex(16, random)}`;
  const netrc = `probe${hex(16, random)}`;

  const canaries: Canary[] = [
    {
      id: "aws-access-key",
      locations: [".aws/credentials", "env:AWS_ACCESS_KEY_ID"],
      marker: awsKey,
    },
    {
      id: "aws-secret-key",
      locations: [".aws/credentials", "env:AWS_SECRET_ACCESS_KEY"],
      marker: awsSecret,
    },
    {
      id: "ssh-private-key",
      locations: [".ssh/id_ed25519"],
      marker: sshMarker,
    },
    { id: "npm-token", locations: [".npmrc"], marker: npmToken },
    {
      id: "github-token",
      locations: [".config/gh/hosts.yml", "env:GITHUB_TOKEN"],
      marker: ghToken,
    },
    { id: "netrc-password", locations: [".netrc"], marker: netrc },
    {
      id: "anthropic-key",
      locations: ["env:ANTHROPIC_API_KEY"],
      marker: anthropic,
    },
    { id: "openai-key", locations: ["env:OPENAI_API_KEY"], marker: openai },
  ];

  const files: CanaryFile[] = [
    {
      path: ".aws/credentials",
      content:
        `[default]\naws_access_key_id = ${awsKey}\naws_secret_access_key = ${awsSecret}\n`,
      mode: 0o600,
    },
    {
      path: ".ssh/id_ed25519",
      content:
        `-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAA${sshMarker}AAAA\n-----END OPENSSH PRIVATE KEY-----\n`,
      mode: 0o600,
    },
    {
      path: ".npmrc",
      content: `//registry.npmjs.org/:_authToken=${npmToken}\n`,
      mode: 0o600,
    },
    {
      path: ".config/gh/hosts.yml",
      content:
        `github.com:\n    oauth_token: ${ghToken}\n    user: probe\n    git_protocol: https\n`,
      mode: 0o600,
    },
    {
      path: ".netrc",
      content: `machine api.github.com login probe password ${netrc}\n`,
      mode: 0o600,
    },
  ];

  const env = {
    GITHUB_TOKEN: ghToken,
    AWS_ACCESS_KEY_ID: awsKey,
    AWS_SECRET_ACCESS_KEY: awsSecret,
    ANTHROPIC_API_KEY: anthropic,
    OPENAI_API_KEY: openai,
  };
  return { canaries, files, env };
}

/** A place a probe looked, and what it found there. */
export interface Sighting {
  readonly canaryId: string;
  readonly where: string;
}

/** Every canary whose marker appears in `text`, labelled with `where`. */
export function scanForCanaries(
  set: CanarySet,
  text: string,
  where: string,
): Sighting[] {
  return set.canaries
    .filter((c) => text.includes(c.marker))
    .map((c) => ({ canaryId: c.id, where }));
}

/** The token that replaces a secret in stored records. */
export const REDACTED = "[sandbox-secret]";

/** Replaces every occurrence of each secret in `text`. Empty secrets are skipped. */
export function redact(text: string, secrets: readonly string[]): string {
  let out = text;
  for (const s of secrets) {
    if (s.length >= 8) out = out.replaceAll(s, REDACTED);
  }
  return out;
}

/** Deep-redacts every string in a JSON-like value. */
export function redactValue(v: unknown, secrets: readonly string[]): unknown {
  if (typeof v === "string") return redact(v, secrets);
  if (Array.isArray(v)) return v.map((x) => redactValue(x, secrets));
  if (v && typeof v === "object") {
    // Keys too: the code under test chooses them as well as the values.
    return Object.fromEntries(
      Object.entries(v).map((
        [k, x],
      ) => [redact(k, secrets), redactValue(x, secrets)]),
    );
  }
  return v;
}
