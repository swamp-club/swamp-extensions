/**
 * Installed extensions for tests, written where and how swamp writes them.
 * `upstream_extensions.json` beside this file was captured unchanged from
 * `swamp extension pull @swamp/git` in a fresh repo (swamp
 * 20261102.180642.0, @swamp/git 2026.10.23.1). The path below is swamp's,
 * spelled out rather than taken from the reader, so a reader that drifts
 * from swamp fails these tests. Re-capture the file when swamp changes its
 * lockfile.
 *
 * @module
 */

import { dirname, fromFileUrl, isAbsolute, join } from "jsr:@std/path@1.1.4";

/** The lockfile swamp wrote, verbatim. */
export const CAPTURED_LOCKFILE = join(
  dirname(fromFileUrl(import.meta.url)),
  "upstream_extensions.json",
);

/** Where swamp writes the lockfile in a repo with no `modelsDir` set. */
export const SWAMP_LOCKFILE_PATH = "extensions/models/upstream_extensions.json";

/**
 * Writes a lockfile listing `names` into `repo`, each entry shaped like the
 * captured one. `modelsDir` is relative to `repo` or absolute, and is the
 * value the repo's `.swamp.yaml` is expected to name.
 */
export async function installExtensions(
  repo: string,
  names: readonly string[],
  modelsDir?: string,
): Promise<void> {
  const captured = JSON.parse(await Deno.readTextFile(CAPTURED_LOCKFILE));
  const template = captured["@swamp/git"];
  const lockfile: Record<string, unknown> = {};
  for (const name of names) lockfile[name] = { ...template };
  const path = modelsDir === undefined ? join(repo, SWAMP_LOCKFILE_PATH) : join(
    isAbsolute(modelsDir) ? modelsDir : join(repo, modelsDir),
    "upstream_extensions.json",
  );
  await Deno.mkdir(dirname(path), { recursive: true });
  await Deno.writeTextFile(path, JSON.stringify(lockfile, null, 2));
}
