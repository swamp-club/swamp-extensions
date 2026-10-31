/**
 * What a repo's installed extensions cover: the programs swamp could have
 * run for the agent. Read from the repo's `.swamp/upstream_extensions.json`.
 * No manifest declares the program an extension wraps, so a naming
 * convention stands in: the extension's name after its scope, without a
 * `-runner` or `-cli` suffix (`@swamp/git` covers `git`, `@swamp/deno-runner`
 * covers `deno`).
 *
 * @module
 */

import { join } from "jsr:@std/path@1.1.4";

/** Programs mapped to the installed extension that covers each. */
export interface Coverage {
  readonly programs: ReadonlyMap<string, string>;
  /** Changes whenever the installed extensions do; part of the import stamp. */
  readonly key: string;
}

export const NO_COVERAGE: Coverage = { programs: new Map(), key: "none" };

const UPSTREAM_FILE = join(".swamp", "upstream_extensions.json");

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

/** The installed extension names in a directory's upstream file, if it has one. */
async function installedIn(dir: string): Promise<string[] | undefined> {
  let text: string;
  try {
    text = await Deno.readTextFile(join(dir, UPSTREAM_FILE));
  } catch {
    return undefined;
  }
  try {
    const parsed: unknown = JSON.parse(text);
    const list = (parsed as { extensions?: unknown })?.extensions;
    if (!Array.isArray(list)) return [];
    return list.flatMap((e) => {
      const name = (e as { name?: unknown })?.name;
      return typeof name === "string" && name.length > 0 ? [name] : [];
    });
  } catch {
    // An unreadable file covers nothing, and never fails the import.
    return [];
  }
}

/**
 * Reads coverage for a session: from its root, else from its repo's main
 * checkout, since a worktree's `.swamp` is gitignored and so missing there.
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
