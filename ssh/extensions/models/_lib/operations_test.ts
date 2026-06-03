// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Tests for resolveSelection — the single funnel that turns a method's `hosts`
 * selector into matched hosts and produces the agent-readable diagnostics
 * (precise no-match error, legacy-CEL deprecation warning, parse-error
 * wrapper). Driven by a structural FleetContext fake; no real swamp context,
 * no live SSH.
 *
 * @module
 */

import { assert, assertThrows } from "jsr:@std/assert@1.0.19";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { type FleetContext, resolveSelection } from "./operations.ts";
import { type GlobalArgs, GlobalArgsSchema } from "./schemas.ts";

const makeCelEnv = createModelTestContext().context.createCelEnvironment;

function globals(): GlobalArgs {
  return GlobalArgsSchema.parse({
    name: "fleet",
    transport: { kind: "ssh" },
    hosts: [
      { name: "web-1", address: "10.0.0.1", tags: ["web", "prod"] },
      { name: "db-1", address: "10.0.5.1", tags: ["db", "prod"] },
    ],
  });
}

function fakeContext() {
  const warns: string[] = [];
  const logger = {
    debug() {},
    info() {},
    warn(msg: string) {
      warns.push(msg);
    },
    error() {},
  };
  const ctx = {
    signal: new AbortController().signal,
    globalArgs: {},
    modelType: "@swamp/ssh",
    modelId: "test",
    methodName: "exec",
    logger,
    writeResource: () => Promise.resolve({ name: "x" }),
    readResource: () => Promise.resolve(null),
    createCelEnvironment: makeCelEnv,
    dataRepository: {
      findAllForModel: () => Promise.resolve([]),
      delete: () => Promise.resolve(),
    },
  } as unknown as FleetContext;
  return { ctx, warns };
}

Deno.test("resolveSelection: plain identifier no-match throws a prescriptive error", () => {
  const { ctx } = fakeContext();
  assertThrows(
    () => resolveSelection(ctx, globals(), "ghost"),
    Error,
    "name:ghost",
  );
});

Deno.test("resolveSelection: bare name resolves", () => {
  const { ctx } = fakeContext();
  const hosts = resolveSelection(ctx, globals(), "db-1");
  assert(hosts.length === 1 && hosts[0].name === "db-1");
});

Deno.test("resolveSelection: legacy bare CEL resolves and warns exactly once", () => {
  const { ctx, warns } = fakeContext();
  const hosts = resolveSelection(ctx, globals(), '"prod" in host.tags');
  assert(hosts.length === 2);
  assert(warns.length === 1, `expected one warning, got ${warns.length}`);
  assert(warns[0].includes("deprecated"));
});

Deno.test("resolveSelection: cel: parse error surfaces as 'Invalid selector expression'", () => {
  const { ctx } = fakeContext();
  assertThrows(
    () => resolveSelection(ctx, globals(), "cel:size(host.tags"),
    Error,
    "Invalid selector expression",
  );
});
