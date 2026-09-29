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

import type { ClaimContext, ModelDataRecord } from "./claim.ts";

// ---------------------------------------------------------------------------
// A fake of the parts of swamp the model types use: versioned resources per
// instance, readModelData across instances, a definition repository,
// globalArgs per instance, tagOverrides and a logger. Not used by production
// code.
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
  logs: { message: string; props?: Record<string, unknown> }[];
  context(
    name: string,
    initiatedBy?: string,
  ): ClaimContext & {
    globalArgs: Record<string, unknown>;
    readModelData(
      modelName: string,
      specName?: string,
    ): Promise<ModelDataRecord[]>;
  };
  versionsWritten(instance: string): number;
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
