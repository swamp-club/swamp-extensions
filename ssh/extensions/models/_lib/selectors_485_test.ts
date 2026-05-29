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

/**
 * Regression tests for issue #485: bare-string host selector only matched
 * "all", ignoring host names and tags.
 *
 * These assert the DESIRED post-fix behavior. They are RED against the
 * pre-fix code (bare string is treated purely as a CEL expression) and must
 * go GREEN once the selector resolution is fixed. Do not delete after the
 * fix — this file is the permanent regression guard for #485.
 *
 * @module
 */

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { createModelTestContext } from "@systeminit/swamp-testing";
import { type CelEnvLike, selectHosts } from "./selectors.ts";
import type { EffectiveHost } from "./hosts.ts";

const makeEnv: () => CelEnvLike =
  createModelTestContext().context.createCelEnvironment;

const logger = { debug() {}, warn() {} };

function names(hosts: EffectiveHost[]): string[] {
  return hosts.map((h) => h.name);
}

// Fleet from the issue: a host named controlplane-fsn1-0 tagged
// [controlplane, dev], plus a second host so tag matches are non-trivial.
function fleet(): EffectiveHost[] {
  const ssh = {
    kind: "ssh" as const,
    port: 22,
    auth: { kind: "key" as const },
    connectTimeoutSec: 10,
    extraOptions: [],
    controlMaster: { enabled: true, persistSec: 600 },
  };
  return [
    {
      name: "controlplane-fsn1-0",
      address: "10.0.0.11",
      tags: ["controlplane", "dev"],
      attrs: {},
      env: {},
      transport: ssh,
    },
    {
      name: "worker-fsn1-0",
      address: "10.0.0.12",
      tags: ["worker", "dev"],
      attrs: {},
      env: {},
      transport: ssh,
    },
  ];
}

Deno.test("#485: bare string matches an exact host name", () => {
  const r = selectHosts("controlplane-fsn1-0", fleet(), makeEnv(), logger);
  assertEquals(names(r), ["controlplane-fsn1-0"]);
});

Deno.test("#485: bare string matches a tag when no name matches", () => {
  const r = selectHosts("controlplane", fleet(), makeEnv(), logger);
  assertEquals(names(r), ["controlplane-fsn1-0"]);
});

Deno.test("#485: bare tag selects every host carrying it", () => {
  const r = selectHosts("dev", fleet(), makeEnv(), logger);
  assertEquals(names(r), ["controlplane-fsn1-0", "worker-fsn1-0"]);
});

Deno.test("#485: name: prefix matches by host name", () => {
  const r = selectHosts(
    "name:controlplane-fsn1-0",
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(names(r), ["controlplane-fsn1-0"]);
});

Deno.test("#485: tag: prefix matches by tag", () => {
  const r = selectHosts("tag:controlplane", fleet(), makeEnv(), logger);
  assertEquals(names(r), ["controlplane-fsn1-0"]);
});

Deno.test("#485: cel: prefix evaluates an explicit CEL predicate", () => {
  const r = selectHosts(
    'cel:"worker" in host.tags',
    fleet(),
    makeEnv(),
    logger,
  );
  assertEquals(names(r), ["worker-fsn1-0"]);
});
