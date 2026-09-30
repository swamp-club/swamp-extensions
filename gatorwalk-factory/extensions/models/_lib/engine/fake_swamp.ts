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
import type { DataReadingContext, ModelDataRecord } from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// A fake of the parts of swamp the model types use: versioned resources per
// instance, readModelData across instances, a definition repository,
// globalArgs per instance, tagOverrides, file writers and a logger. Not used
// by production code.
// ---------------------------------------------------------------------------

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
  /** Files per instance: "<spec>/<name>" -> the text of each version. */
  files: Map<string, Map<string, string[]>>;
  logs: { message: string; props?: Record<string, unknown> }[];
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

export function fakeSwamp(): FakeSwamp {
  const definitions: FakeSwamp["definitions"] = new Map();
  const globalArgs: FakeSwamp["globalArgs"] = new Map();
  const resources: FakeSwamp["resources"] = new Map();
  const files: FakeSwamp["files"] = new Map();
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
    files,
    logs,
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
      createFileWriter: (spec, file) => ({
        writeText: (content) => {
          if (!files.has(name)) files.set(name, new Map());
          const map = files.get(name) as Map<string, string[]>;
          const versions = map.get(`${spec}/${file}`) ?? [];
          versions.push(content);
          map.set(`${spec}/${file}`, versions);
          return Promise.resolve({
            name: file,
            specName: spec,
            kind: "file",
            version: versions.length,
          });
        },
      }),
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
      },
    }),
  };
}
