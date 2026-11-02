/**
 * What a repo's installed extensions cover: the programs swamp could have
 * run for the agent. Read from the lockfile swamp writes when it pulls an
 * extension: `upstream_extensions.json` in the repo's models directory
 * (`modelsDir` in `.swamp.yaml`, else `extensions/models`).
 * No manifest declares the program an extension wraps, so a naming
 * convention stands in: the extension's name after its scope, without a
 * `-runner` or `-cli` suffix (`@swamp/git` covers `git`, `@swamp/deno-runner`
 * covers `deno`).
 *
 * @module
 */

import { isAbsolute, join } from "jsr:@std/path@1.1.4";
import { parse as parseYaml } from "jsr:@std/yaml@1.0.10";

/** Programs mapped to the installed extension that covers each. */
export interface Coverage {
  readonly programs: ReadonlyMap<string, string>;
  /** Changes whenever the installed extensions do; part of the import stamp. */
  readonly key: string;
}

export const NO_COVERAGE: Coverage = { programs: new Map(), key: "none" };

/** Where swamp keeps a repo's models, and so its lockfile, by default. */
const DEFAULT_MODELS_DIR = join("extensions", "models");

/** The lockfile swamp writes in the models directory. */
const LOCKFILE_NAME = "upstream_extensions.json";

/**
 * The repo's models directory, as swamp resolves it from `.swamp.yaml`.
 * swamp's `SWAMP_MODELS_DIR` is not consulted: it belongs to the process
 * that ran swamp, not to the repo, and the importer's own environment says
 * nothing about it.
 */
async function modelsDir(dir: string): Promise<string> {
  let configured: unknown;
  try {
    const marker = parseYaml(
      await Deno.readTextFile(join(dir, ".swamp.yaml")),
    );
    configured = (marker as { modelsDir?: unknown } | null)?.modelsDir;
  } catch {
    // No marker, or one swamp could not read either: the default applies.
  }
  const models = typeof configured === "string" && configured.length > 0
    ? configured
    : DEFAULT_MODELS_DIR;
  return isAbsolute(models) ? models : join(dir, models);
}

/** The program an extension covers by its name, if it names one. */
export function coveredProgram(extension: string): string | undefined {
  const bare = extension.slice(extension.lastIndexOf("/") + 1)
    .replace(/-(runner|cli)$/, "");
  return /^[a-z0-9][\w.-]*$/i.test(bare) ? bare : undefined;
}

/** Coverage from a list of installed extension names. */
export function coverageOf(extensions: readonly string[]): Coverage {
  const names = [...new Set(extensions)].sort();
  if (names.length === 0) return NO_COVERAGE;
  const programs = new Map<string, string>();
  for (const name of names) {
    const p = coveredProgram(name);
    if (p !== undefined && !programs.has(p)) programs.set(p, name);
  }
  return { programs, key: names.join(",") };
}

/**
 * The installed extension names in a directory's lockfile, if it has one.
 * The lockfile is an object keyed by extension name, each value an object.
 */
async function installedIn(dir: string): Promise<string[] | undefined> {
  let text: string;
  try {
    text = await Deno.readTextFile(join(await modelsDir(dir), LOCKFILE_NAME));
  } catch {
    return undefined;
  }
  try {
    const parsed: unknown = JSON.parse(text);
    if (
      typeof parsed !== "object" || parsed === null || Array.isArray(parsed)
    ) {
      return [];
    }
    // An entry is an object; any other top-level value is not an extension.
    return Object.entries(parsed).flatMap(([name, entry]) =>
      name.length > 0 && typeof entry === "object" && entry !== null &&
        !Array.isArray(entry)
        ? [name]
        : []
    );
  } catch {
    // An unreadable file covers nothing, and never fails the import.
    return [];
  }
}

/**
 * Reads coverage for a session: from its root, else from its repo's main
 * checkout, since the lockfile is not committed by default and so a
 * worktree usually has none. Each directory resolves its own models
 * directory.
 * Results are cached per directory for one import.
 */
export class CoverageReader {
  readonly #cache = new Map<string, Promise<string[] | undefined>>();

  #installed(dir: string): Promise<string[] | undefined> {
    let found = this.#cache.get(dir);
    if (!found) {
      found = installedIn(dir);
      this.#cache.set(dir, found);
    }
    return found;
  }

  async read(root: string, mainCheckout: string): Promise<Coverage> {
    const own = await this.#installed(root);
    const names = own ??
      (mainCheckout !== root ? await this.#installed(mainCheckout) : undefined);
    return coverageOf(names ?? []);
  }
}
