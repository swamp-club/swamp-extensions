// Copyright (C) 2026 System Initiative, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { stringify as stringifyYaml } from "jsr:@std/yaml@1.0.10";
import {
  type DefinitionText,
  type FactoryEntry,
  type FactorySource,
  sha256,
  type StudioEvent,
} from "./studio_server.ts";
import type { QueryData } from "./studio_work_items.ts";
import { FACTORY_TYPE } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio reading a remote swamp serve (swamp-club #3363; DESIGN.md, "The
// studio server"). serve runs on the operator's machine and reads through
// swamp's own read commands with --server, so every read carries the
// operator's login and grants, and the serve stays the only writer:
// `model search` lists the factories, `model get` gives each one's model
// definition, and `data query` reads work items. No method runs on the serve,
// so nothing is written there and no factory's lock is taken.
//
// `model get` gives the definition as data, not the file: the page gets YAML
// written from its fields, so the server file's comments and layout are not
// shown. The factory routes answer from what the last poll read, so a page
// load starts no swamp call of its own once a factory has been read.
// ---------------------------------------------------------------------------

/** One swamp command against the serve: its parsed --json output. */
export type SwampRunner = (args: string[]) => Promise<unknown>;

/**
 * The swamp binary running this method, for the read commands. Under deno (a
 * development run) there is no swamp binary to call, and serve says so.
 */
export function swampBinary(execPath: string = Deno.execPath()): string {
  // Either separator: the path is the host's, and may be Windows'.
  const name = execPath.split(/[\\/]/).at(-1) ?? "";
  if (/^deno(\.exe)?$/i.test(name)) {
    throw new Error(
      `reading a remote serve calls the swamp binary running the studio, ` +
        `but this method runs under ${execPath}; run it with the installed swamp`,
    );
  }
  return execPath;
}

/**
 * Runs `swamp <args> --server <server> --json` with no shell. The child gets
 * this process's environment, so swamp finds the operator's stored login and
 * SWAMP_SERVER_TOKEN, SWAMP_CA_CERT and SWAMP_SERVE_EXTRA_HEADERS itself. A
 * failed command throws with swamp's own message.
 */
export function swampRunner(
  server: string,
  signal?: AbortSignal,
  binary: string = swampBinary(),
): SwampRunner {
  return async (args) => {
    const out = await new Deno.Command(binary, {
      args: [...args, "--server", server, "--json", "--no-color"],
      stdin: "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).output();
    const decoder = new TextDecoder();
    if (out.code !== 0) {
      throw new Error(failure(args, decoder.decode(out.stderr)));
    }
    const text = decoder.decode(out.stdout);
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(
        `swamp ${args[0]} ${args[1]} gave no JSON: ${text.slice(0, 200)}`,
      );
    }
  };
}

/**
 * Why a command failed: the error of the JSON envelope swamp writes to
 * stderr with --json, after the lines it prints first (the server it is
 * reaching), or the last line of stderr when there is none.
 */
export function failure(args: string[], stderr: string): string {
  const command = `swamp ${args[0]} ${args[1]}`;
  const start = stderr.search(/^\{/m);
  if (start !== -1) {
    try {
      const envelope = JSON.parse(stderr.slice(start)) as { error?: unknown };
      if (typeof envelope.error === "string") {
        return `${command} failed: ${envelope.error}`;
      }
    } catch {
      // Not the envelope; the text is shown instead.
    }
  }
  const last = stderr.trim().split("\n").at(-1)?.trim() ?? "";
  return `${command} failed${last === "" ? "" : `: ${last}`}`;
}

/** The results array of a --json answer; throws on any other shape. */
function resultsOf(answer: unknown, command: string): unknown[] {
  const results = answer !== null && typeof answer === "object"
    ? (answer as { results?: unknown }).results
    : undefined;
  if (!Array.isArray(results)) {
    throw new Error(`swamp ${command} gave no results list`);
  }
  return results;
}

/** swamp's data query, through `swamp data query` on the serve. */
export function remoteQuery(run: SwampRunner): QueryData {
  return async (predicate, select) => {
    const args = ["data", "query", predicate];
    if (select !== undefined) args.push("--select", select);
    return resultsOf(await run(args), "data query");
  };
}

/** The name of every factory the serve holds, sorted. */
export async function remoteFactoryNames(run: SwampRunner): Promise<string[]> {
  const names = new Set<string>();
  for (
    const found of resultsOf(await run(["model", "search"]), "model search")
  ) {
    const { name, type } = (found ?? {}) as { name?: unknown; type?: unknown };
    if (type === FACTORY_TYPE && typeof name === "string" && name !== "") {
      names.add(name);
    }
  }
  return [...names].sort();
}

/** How the page shows where a remote factory's definition is from. */
export function remotePath(server: string, name: string): string {
  return `${name} on ${server}`;
}

/**
 * A factory's model definition, from `model get` on the serve, written as
 * YAML from the fields of a model definition file. The rest of what model
 * get gives (the type's methods and argument schema, its current version and
 * staleness) is not in the file, so it is left out.
 */
export async function remoteDefinition(
  run: SwampRunner,
  server: string,
  name: string,
): Promise<DefinitionText> {
  if (name.startsWith("-")) throw new Error(dashed(name));
  const got = await run(["model", "get", name]);
  if (got === null || typeof got !== "object") {
    throw new Error(`swamp model get ${name} gave no model definition`);
  }
  const d = got as Record<string, unknown>;
  if (d.type !== FACTORY_TYPE || d.name !== name) {
    throw new Error(`'${name}' on ${server} is not a factory`);
  }
  const file: Record<string, unknown> = {};
  for (
    const field of [
      "type",
      "typeVersion",
      "id",
      "name",
      "version",
      "tags",
      "globalArguments",
    ]
  ) {
    if (d[field] !== undefined) file[field] = d[field];
  }
  const text = stringifyYaml(file);
  return {
    factory: name,
    path: remotePath(server, name),
    text,
    digest: await sha256(text),
  };
}

/** Why a factory named with a leading dash is not read. */
function dashed(name: string): string {
  return `factory '${name}': a name starting with '-' is not passed to ` +
    `swamp model get, which would read it as an option`;
}

/** The remote factories, read by the poll, for the factory routes. */
export interface RemoteFactories extends FactorySource {
  /**
   * One poll: list the factories again and read each definition the page has
   * opened, telling `emit` of what changed. A failed read keeps what was
   * read last and is reported to `onError`; the next poll tries again.
   * Resolves true when every read succeeded.
   */
  poll(): Promise<boolean>;
}

export function remoteFactories(
  run: SwampRunner,
  server: string,
  emit: (event: StudioEvent) => void,
  onError: (message: string) => void = () => {},
): RemoteFactories {
  let listed: FactoryEntry[] | null = null;
  // Each definition read, by factory: the ones the page opened.
  const read = new Map<string, DefinitionText>();

  const entryOf = (name: string): FactoryEntry =>
    name.startsWith("-")
      ? { name, path: null, error: dashed(name) }
      : { name, path: remotePath(server, name) };

  async function relist(): Promise<FactoryEntry[]> {
    const next = (await remoteFactoryNames(run)).map(entryOf);
    if (
      listed !== null && JSON.stringify(next) !== JSON.stringify(listed)
    ) emit({ kind: "factories" });
    listed = next;
    for (const name of read.keys()) {
      if (!next.some((f) => f.name === name)) read.delete(name);
    }
    return next;
  }

  return {
    async list() {
      return listed ?? await relist();
    },
    async definition(entry) {
      const held = read.get(entry.name);
      if (held !== undefined) return held;
      const text = await remoteDefinition(run, server, entry.name);
      read.set(entry.name, text);
      return text;
    },
    async poll() {
      try {
        await relist();
      } catch (e) {
        onError(message(e));
        return false;
      }
      let ok = true;
      for (const [name, before] of read) {
        let now: DefinitionText;
        try {
          now = await remoteDefinition(run, server, name);
        } catch (e) {
          onError(message(e));
          ok = false;
          continue;
        }
        read.set(name, now);
        if (now.digest !== before.digest) {
          emit({ kind: "definition", factory: name });
        }
      }
      return ok;
    },
  };
}

const message = (e: unknown) => e instanceof Error ? e.message : String(e);
