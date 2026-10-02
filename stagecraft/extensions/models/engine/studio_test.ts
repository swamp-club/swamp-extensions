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

import { assert, assertEquals, assertFalse } from "@std/assert";
import { model as studio } from "./studio.ts";
import { STUDIO_TYPE } from "../_lib/engine/studio_server.ts";

Deno.test("studio: the type literal is STUDIO_TYPE", () => {
  assertEquals(studio.type, STUDIO_TYPE);
});

Deno.test("studio: serve's port defaults to 0 and takes CLI strings in range", () => {
  const port = studio.methods.serve.arguments;
  assertEquals(port.parse({}), { port: 0 });
  assertEquals(port.parse({ port: "8123" }), { port: 8123 });
  assertFalse(port.safeParse({ port: "-1" }).success);
  assertFalse(port.safeParse({ port: "65536" }).success);
  assertFalse(port.safeParse({ port: "1.5" }).success);
});

Deno.test("studio: the globalArguments schema survives swamp's .partial()", () => {
  assert(studio.globalArguments.partial().safeParse({}).success);
});
