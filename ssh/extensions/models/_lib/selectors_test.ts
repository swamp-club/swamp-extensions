// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
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

import { assert, assertEquals, assertThrows } from "jsr:@std/assert@1.0.19";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { type CelEnvLike, selectHosts } from "./selectors.ts";
import type { EffectiveHost } from "./hosts.ts";

// ---------------------------------------------------------------------------
// CEL environment factory. This is the same `createExtensionCelEnvironment`
// the swamp host hands the model via `ctx.createCelEnvironment()` — sourced
// here through the testing harness so tests and production share one
// environment configuration (unlistedVariablesAreDyn + arithmetic overloads).
// ---------------------------------------------------------------------------

const makeEnv: () => CelEnvLike =
  createModelTestContext().context.createCelEnvironment;

function noopLogger() {
  const calls: { msg: string; args: unknown[] }[] = [];
  return {
    logger: {
      debug(msg: string, ...args: unknown[]) {
        calls.push({ msg, args });
      },
    },
    calls,
  };
}

function fleet(): EffectiveHost[] {
  return [
    {
      name: "web-1",
      address: "10.0.0.11",
      tags: ["web", "prod"],
      attrs: { region: "us-east-1", role: "api", count: 4 },
      env: {},
      transport: {
        kind: "ssh",
        port: 22,
        auth: { kind: "key" },
        connectTimeoutSec: 10,
        extraOptions: [],
        controlMaster: { enabled: true, persistSec: 600 },
      },
    },
    {
      name: "web-2",
      address: "10.0.0.12",
      tags: ["web", "staging"],
      attrs: { region: "us-east-1", role: "api" },
      env: {},
      transport: {
        kind: "ssh",
        port: 22,
        auth: { kind: "key" },
        connectTimeoutSec: 10,
        extraOptions: [],
        controlMaster: { enabled: true, persistSec: 600 },
      },
    },
    {
      name: "db-1",
      address: "10.0.5.21",
      tags: ["db", "prod"],
      attrs: { region: "us-east-1", role: "postgres" },
      env: {},
      transport: {
        kind: "ssh",
        port: 22,
        auth: { kind: "key" },
        connectTimeoutSec: 10,
        extraOptions: [],
        controlMaster: { enabled: true, persistSec: 600 },
      },
    },
    {
      name: "edge-1",
      address: "edge-1",
      tags: ["edge", "prod"],
      attrs: { region: "eu-west-1", role: "edge" },
      env: {},
      transport: { kind: "tailscale", user: "deploy", sshExtraArgs: [] },
    },
  ];
}

// ---------------------------------------------------------------------------
// Form: "all"
// ---------------------------------------------------------------------------

Deno.test("selectHosts: 'all' returns every host", () => {
  const { logger } = noopLogger();
  const result = selectHosts("all", fleet(), makeEnv(), logger);
  assertEquals(result.length, 4);
});

// ---------------------------------------------------------------------------
// Form: string[]
// ---------------------------------------------------------------------------

Deno.test("selectHosts: name list picks exact matches", () => {
  const { logger } = noopLogger();
  const result = selectHosts(["web-1", "db-1"], fleet(), makeEnv(), logger);
  assertEquals(result.map((h) => h.name), ["web-1", "db-1"]);
});

Deno.test("selectHosts: unknown name in list yields no match for that entry", () => {
  const { logger } = noopLogger();
  const result = selectHosts(["web-1", "ghost"], fleet(), makeEnv(), logger);
  assertEquals(result.map((h) => h.name), ["web-1"]);
});

// ---------------------------------------------------------------------------
// Form: CEL string
// ---------------------------------------------------------------------------

Deno.test("selectHosts: CEL tag-membership", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    '"prod" in host.tags',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-1", "db-1", "edge-1"]);
});

Deno.test("selectHosts: CEL attrs equality", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'host.attrs.role == "postgres"',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["db-1"]);
});

Deno.test("selectHosts: CEL transport branch", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'host.transport == "tailscale"',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["edge-1"]);
});

Deno.test("selectHosts: CEL compound expression", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    '"prod" in host.tags && host.transport == "ssh"',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-1", "db-1"]);
});

Deno.test("selectHosts: CEL name prefix via startsWith", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'host.name.startsWith("web-")',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-1", "web-2"]);
});

// ---------------------------------------------------------------------------
// matchesRegex
// ---------------------------------------------------------------------------

Deno.test("selectHosts: matchesRegex picks by pattern", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'matchesRegex(host.name, "^db-\\\\d+$")',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["db-1"]);
});

Deno.test("selectHosts: matchesRegex with anchors", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'matchesRegex(host.name, "-1$")',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-1", "db-1", "edge-1"]);
});

// ---------------------------------------------------------------------------
// cidrContains
// ---------------------------------------------------------------------------

Deno.test("selectHosts: cidrContains IPv4", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'cidrContains("10.0.0.0/24", host.address)',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-1", "web-2"]);
});

Deno.test("selectHosts: cidrContains excludes non-routable address (tailscale name)", () => {
  const { logger } = noopLogger();
  const result = selectHosts(
    'cidrContains("0.0.0.0/0", host.address)',
    fleet(),
    makeEnv(),
    logger,
  );
  // "edge-1" is not parseable as IPv4 → false
  assertEquals(result.map((h) => h.name), ["web-1", "web-2", "db-1"]);
});

// ---------------------------------------------------------------------------
// Missing attrs behavior
// ---------------------------------------------------------------------------

Deno.test("selectHosts: missing attr → host excluded + debug log", () => {
  const { logger, calls } = noopLogger();
  const hosts = fleet();
  // Strip role from one host so its evaluation fails.
  delete hosts[0].attrs.role;

  const result = selectHosts(
    'host.attrs.role == "api"',
    hosts,
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-2"]);
  // At least one debug log for the missing-attr host.
  assert(calls.some((c) => c.msg.includes("selector skipped host")));
});

Deno.test("selectHosts: has() guard avoids the miss", () => {
  const { logger } = noopLogger();
  const hosts = fleet();
  delete hosts[0].attrs.role;

  const result = selectHosts(
    'has(host.attrs.role) && host.attrs.role == "api"',
    hosts,
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-2"]);
});

// ---------------------------------------------------------------------------
// Parse-error propagation
// ---------------------------------------------------------------------------

Deno.test("selectHosts: parse error surfaces from env.parse()", () => {
  const { logger } = noopLogger();
  assertThrows(
    () => selectHosts("size(host.tags", fleet(), makeEnv(), logger),
  );
});

// ---------------------------------------------------------------------------
// Bigint arithmetic via the vendored overloads
// ---------------------------------------------------------------------------

Deno.test("selectHosts: bigint × double arithmetic works (mixed overloads)", () => {
  const { logger } = noopLogger();
  // host.attrs.count is a JS number (double); 2 is a CEL int (bigint).
  // Without the overloads, host.attrs.count * 2 would fail.
  const result = selectHosts(
    "host.attrs.count * 2 == 8",
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(result.map((h) => h.name), ["web-1"]);
});
