// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { evaluate } from "npm:@marcbachmann/cel-js@7.6.1";
import * as posix from "@std/path/posix";
import { parse as parseYaml } from "@std/yaml";
import type { PathKind, RepoFiles } from "./studio_files.ts";
import {
  type DataReadingContext,
  FACTORY_TYPE,
  type ModelDataRecord,
} from "./work_item_ops.ts";
import {
  DEFAULT_TRACKER_KIND,
  TRACKER_KINDS,
  TRACKER_TYPES,
  type TrackerKind,
} from "./tracker_binding.ts";

// ---------------------------------------------------------------------------
// A fake of the parts of swamp the model types use: versioned resources per
// instance, readModelData across instances, a definition repository,
// globalArgs per instance, tagOverrides, file writers, a logger, and an
// in-memory repo for the studio's files. Not used by production code.
// ---------------------------------------------------------------------------

/** An in-memory repo: files, directories and symlinks under `dir`. */
export interface MemoryRepo {
  /** The repo's absolute path; it holds a .swamp directory. */
  dir: string;
  files: RepoFiles;
  /** Write a file at a repo-relative or absolute path, making directories. */
  write(path: string, text: string): void;
  /** A symlink at `path` to `target` (absolute, or relative to its directory). */
  symlink(path: string, target: string): void;
  remove(path: string): void;
  read(path: string): string | undefined;
}

type Entry =
  | { kind: "file"; text: string }
  | { kind: "dir" }
  | { kind: "link"; target: string };

function notFound(path: string): Error {
  return new Deno.errors.NotFound(`no such file or directory: ${path}`);
}

export function memoryRepo(dir = "/repo"): MemoryRepo {
  const entries = new Map<string, Entry>([["/", { kind: "dir" }]]);
  const abs = (path: string) => posix.resolve(dir, path);
  const mkdirs = (path: string) => {
    let cur = "/";
    for (const part of path.split("/").filter((p) => p !== "")) {
      cur = posix.join(cur, part);
      if (!entries.has(cur)) entries.set(cur, { kind: "dir" });
    }
  };
  // Every symlink followed, as realpath(3) does; throws when nothing is there.
  const real = (path: string, depth = 0): string => {
    if (depth > 32) throw new Error(`too many symlinks: ${path}`);
    let cur = "/";
    for (const part of path.split("/").filter((p) => p !== "")) {
      const next = posix.join(cur, part);
      const entry = entries.get(next);
      if (entry === undefined) throw notFound(path);
      cur = entry.kind === "link"
        ? real(posix.resolve(cur, entry.target), depth + 1)
        : next;
    }
    return cur;
  };
  // The entry itself, with symlinks followed above it but not at it.
  const entryAt = (path: string): [string, Entry] | null => {
    let parent: string;
    try {
      parent = real(posix.dirname(path));
    } catch {
      return null;
    }
    const at = posix.join(parent, posix.basename(path));
    const entry = entries.get(at);
    return entry === undefined ? null : [at, entry];
  };
  const files: RepoFiles = {
    realPath: (path) => {
      try {
        return Promise.resolve(real(path));
      } catch (error) {
        return Promise.reject(error);
      }
    },
    lstat: (path) => {
      const found = entryAt(path);
      if (found === null) return Promise.resolve(null);
      const kind: PathKind = {
        isFile: found[1].kind === "file",
        isDirectory: found[1].kind === "dir",
        isSymlink: found[1].kind === "link",
      };
      return Promise.resolve(kind);
    },
    readTextFile: (path) => {
      try {
        const entry = entries.get(real(path));
        if (entry?.kind !== "file") throw notFound(path);
        return Promise.resolve(entry.text);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  };
  mkdirs(posix.join(dir, ".swamp"));
  return {
    dir,
    files,
    write(path, text) {
      mkdirs(posix.dirname(abs(path)));
      entries.set(abs(path), { kind: "file", text });
    },
    symlink(path, target) {
      mkdirs(posix.dirname(abs(path)));
      entries.set(abs(path), { kind: "link", target });
    },
    remove(path) {
      entries.delete(abs(path));
    },
    read(path) {
      const entry = entries.get(abs(path));
      return entry?.kind === "file" ? entry.text : undefined;
    },
  };
}

export interface FakeSwamp {
  /** Definitions by name: raw globalArguments plus the model type. */
  definitions: Map<
    string,
    { globalArguments: unknown; type: string; remote?: boolean }
  >;
  /** Evaluated globalArgs per instance, as a method sees them. */
  globalArgs: Map<string, Record<string, unknown>>;
  /** Resources per instance: name -> versions. */
  resources: Map<string, Map<string, Record<string, unknown>[]>>;
  logs: { message: string; props?: Record<string, unknown> }[];
  /**
   * Define a factory whose globalArguments hold `definition` (YAML text is
   * parsed, as swamp reads a model definition; undefined leaves it out) and,
   * when given, `scenarios`. `remote` gives the model definition the shape a
   * remote worker receives. `tracker` is the tracker instance it binds,
   * "board" by default; when no model has that name, one of the type the
   * definition's tracker kind needs is defined. null binds none.
   */
  factory(
    name: string,
    definition: unknown,
    options?: {
      remote?: boolean;
      tracker?: string | null;
      scenarios?: unknown;
    },
  ): void;
  context(
    name: string,
    initiatedBy?: string,
  ): DataReadingContext & {
    globalArgs: Record<string, unknown>;
    readModelData(
      modelName: string,
      specName?: string,
    ): Promise<ModelDataRecord[]>;
    queryData(predicate: string): Promise<ModelDataRecord[]>;
  };
  versionsWritten(instance: string): number;
}

/** The tracker kind a definition, as YAML text or data, names. */
function kindOf(definition: unknown): TrackerKind {
  let doc = definition;
  try {
    if (typeof doc === "string") doc = parseYaml(doc);
  } catch {
    return DEFAULT_TRACKER_KIND;
  }
  const kind = (doc as { tracker?: { kind?: unknown } } | null)?.tracker?.kind;
  return (TRACKER_KINDS as readonly unknown[]).includes(kind)
    ? kind as TrackerKind
    : DEFAULT_TRACKER_KIND;
}

export function fakeSwamp(): FakeSwamp {
  const definitions: FakeSwamp["definitions"] = new Map();
  const globalArgs: FakeSwamp["globalArgs"] = new Map();
  const resources: FakeSwamp["resources"] = new Map();
  const logs: FakeSwamp["logs"] = [];
  // The spec each resource was written under, per instance.
  const specs = new Map<string, Map<string, string>>();
  const of = (instance: string) => {
    let map = resources.get(instance);
    if (map === undefined) {
      map = new Map();
      resources.set(instance, map);
    }
    return map;
  };
  return {
    definitions,
    globalArgs,
    resources,
    logs,
    factory(name, definition, options = {}) {
      const tracker = options.tracker === undefined ? "board" : options.tracker;
      definitions.set(name, {
        globalArguments: {
          ...(definition === undefined ? {} : {
            definition: typeof definition === "string"
              ? parseYaml(definition)
              : structuredClone(definition),
          }),
          ...(tracker === null ? {} : { tracker }),
          ...(options.scenarios === undefined
            ? {}
            : { scenarios: structuredClone(options.scenarios) }),
        },
        type: FACTORY_TYPE,
        remote: options.remote,
      });
      if (tracker !== null && !definitions.has(tracker)) {
        definitions.set(tracker, {
          globalArguments: {},
          type: TRACKER_TYPES[kindOf(definition)],
        });
      }
    },
    versionsWritten: (instance) =>
      [...of(instance).values()].reduce((n, v) => n + v.length, 0),
    context: (name, initiatedBy = "user:alice") => ({
      definition: { name },
      globalArgs: structuredClone(globalArgs.get(name) ?? {}),
      tagOverrides: { initiatedBy },
      logger: {
        info: (message, props) => {
          logs.push({ message, props });
        },
      },
      writeResource: (spec, resource, data) => {
        if (!specs.has(name)) specs.set(name, new Map());
        specs.get(name)?.set(resource, spec);
        const map = of(name);
        const versions = map.get(resource) ?? [];
        versions.push(structuredClone(data));
        map.set(resource, versions);
        return Promise.resolve({ version: versions.length });
      },
      readResource: (resource, version) => {
        const versions = of(name).get(resource) ?? [];
        const value = versions[(version ?? versions.length) - 1];
        return Promise.resolve(
          value === undefined ? null : structuredClone(value),
        );
      },
      // Like swamp: the latest version of each of another instance's records
      // (a query that names version reaches history; this call does not),
      // its data as both attributes and content. Reading never creates the
      // instance.
      readModelData: (modelName, specName) => {
        const records: ModelDataRecord[] = [];
        for (const [resource, versions] of resources.get(modelName) ?? []) {
          const spec = specs.get(modelName)?.get(resource);
          if (specName !== undefined && spec !== specName) continue;
          const latest = versions.at(-1);
          if (latest === undefined) continue;
          records.push({
            name: resource,
            version: versions.length,
            isLatest: true,
            attributes: structuredClone(latest),
            content: structuredClone(latest),
          });
        }
        return Promise.resolve(records);
      },
      // Like swamp's data query: a CEL predicate over every version of every
      // record, by modelName, specName, name and version. Reaches history.
      queryData: (predicate) => {
        const records: ModelDataRecord[] = [];
        for (const [modelName, map] of resources) {
          for (const [resource, versions] of map) {
            const specName = specs.get(modelName)?.get(resource) ?? "";
            versions.forEach((data, i) => {
              const hit = evaluate(predicate, {
                modelName,
                specName,
                name: resource,
                version: i + 1,
              });
              if (hit !== true) return;
              records.push({
                name: resource,
                version: i + 1,
                isLatest: i === versions.length - 1,
                attributes: structuredClone(data),
                content: structuredClone(data),
              });
            });
          }
        }
        return Promise.resolve(records);
      },
      definitionRepository: {
        findByNameGlobal: (defName) => {
          const found = definitions.get(defName);
          if (found === undefined) return Promise.resolve(null);
          // A remote worker receives a plain object with _globalArguments.
          const definition = found.remote === true
            ? { _globalArguments: structuredClone(found.globalArguments) }
            : { globalArguments: structuredClone(found.globalArguments) };
          return Promise.resolve({
            definition,
            type: { raw: found.type, normalized: found.type.toLowerCase() },
          });
        },
        // Like swamp's: every definition, each with its name.
        findAllGlobal: () =>
          Promise.resolve(
            [...definitions].map(([defName, found]) => ({
              definition: {
                name: defName,
                globalArguments: structuredClone(found.globalArguments),
              },
              type: { raw: found.type, normalized: found.type.toLowerCase() },
            })),
          ),
      },
    }),
  };
}

/**
 * A skill example, from its YAML text: the definition and scenarios blocks a
 * factory's globalArguments hold (scenarios empty when it has none).
 */
export function parseExample(
  text: string,
): { definition: Record<string, unknown>; scenarios: unknown[] } {
  const doc = parseYaml(text) as {
    definition?: Record<string, unknown>;
    scenarios?: unknown[];
  } | null;
  if (doc?.definition === undefined) {
    throw new Error("an example holds a definition: block");
  }
  return { definition: doc.definition, scenarios: doc.scenarios ?? [] };
}
