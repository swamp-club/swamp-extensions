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

import { assert, assertEquals, assertFalse, assertMatch } from "@std/assert";
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

Deno.test("studio: serve's publicOrigin is optional and must be a bare origin", () => {
  const args = studio.methods.serve.arguments;
  assertEquals(args.parse({ publicOrigin: "https://studio.example.com" }), {
    port: 0,
    publicOrigin: "https://studio.example.com",
  });
  for (
    const publicOrigin of [
      "studio.example.com",
      "https://studio.example.com/",
      "https://studio.example.com/studio",
      "ftp://studio.example.com",
    ]
  ) {
    assertFalse(args.safeParse({ publicOrigin }).success, publicOrigin);
  }
  const idn = args.safeParse({ publicOrigin: "https://bücher.example" });
  assertFalse(idn.success);
  assertMatch(
    idn.error.issues[0].message,
    /did you mean 'https:\/\/xn--bcher-kva\.example'\?/,
  );
});
