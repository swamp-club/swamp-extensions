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

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { model as media } from "./media.ts";
import { FakeSwamp } from "./_lib/testing.ts";

Deno.test("media: defaults to libx264 at the recording's size and -14 LUFS", async () => {
  const swamp = new FakeSwamp();
  await media.methods.show.execute({}, swamp.context("media", {}));
  const s = swamp.latest("media", "settings")!;
  assertEquals([s.encoder, s.quality, s.loudness, s.width], [
    "libx264",
    18,
    -14,
    undefined,
  ]);
});

Deno.test("media: an unknown encoder is rejected", () => {
  assertEquals(
    media.globalArguments.safeParse({ encoder: "x265" }).success,
    false,
  );
});

Deno.test("media: a font name the filter graph can't quote is rejected", () => {
  assertEquals(
    media.globalArguments.safeParse({ font: "Bob's:Font" }).success,
    false,
  );
});
