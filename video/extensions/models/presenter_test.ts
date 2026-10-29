// Copyright (C) 2026 Elder Swamp Club, Inc.
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

import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import { FakeSwamp } from "./_lib/testing.ts";
import { model as presenter } from "./presenter.ts";

Deno.test("presenter: identity has no defaults", () => {
  const parsed = presenter.globalArguments.safeParse({});
  assert(!parsed.success, "a presenter without a name must not validate");
});

Deno.test("presenter: show records the details for describe and card sources", async () => {
  const swamp = new FakeSwamp();
  await presenter.methods.show.execute(
    {},
    swamp.context("presenter", { name: "Pat Example", handle: "@pat" }),
  );
  const p = swamp.latest("presenter", "presenter")!;
  assertEquals([p.name, p.handle, p.email, p.links], [
    "Pat Example",
    "@pat",
    "",
    [],
  ]);
});
