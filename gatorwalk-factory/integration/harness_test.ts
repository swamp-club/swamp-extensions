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

import { assertEquals } from "@std/assert";
import { swampEnv } from "./harness.ts";

Deno.test("harness: swamp gets no inherited SWAMP_ variable but SWAMP_HOME", () => {
  const env = swampEnv({
    PATH: "/usr/bin",
    HOME: "/home/someone",
    SWAMP_HOME: "/srv/swamp-home",
    SWAMP_REPO_DIR: "/elsewhere",
    SWAMP_DATASTORE: "s3://bucket",
    SWAMP_MODELS_DIR: "/elsewhere/models",
    // Not a variable swamp reads today: the rule is by prefix, not a list.
    SWAMP_FUTURE_REDIRECT: "/elsewhere",
    SWAMP_NO_TELEMETRY: "0",
  });
  assertEquals(env, {
    PATH: "/usr/bin",
    HOME: "/home/someone",
    SWAMP_HOME: "/srv/swamp-home",
    NO_COLOR: "1",
    SWAMP_NO_TELEMETRY: "1",
    SWAMP_NO_UPDATE_CHECK: "1",
  });
});
