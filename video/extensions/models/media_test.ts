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

Deno.test("media: the bed defaults to every fast-forward; its fade is left to the mode", async () => {
  const swamp = new FakeSwamp();
  await media.methods.show.execute({}, swamp.context("media", {}));
  const s = swamp.latest("media", "settings")!;
  assertEquals([s.bedMode, s.bedMinSeconds, s.bedMergeSeconds], [
    "waits",
    0,
    0,
  ]);
  // Unset, so render can pick 0.4s for waits and 1.5s for a full-length bed.
  assertEquals(s.bedFadeSeconds, undefined);
});

Deno.test("media: a zero fade or a negative bed length is rejected", () => {
  const ok = (v: Record<string, number>) =>
    media.globalArguments.safeParse(v).success;
  assertEquals(ok({ bedFadeSeconds: 0 }), false);
  assertEquals(ok({ bedMinSeconds: -1 }), false);
  assertEquals(ok({ bedMergeSeconds: -1 }), false);
  assertEquals(ok({ bedMinSeconds: 3, bedFadeSeconds: 1 }), true);
});

Deno.test("media: a cold open cuts to the title by default; fade or cut only", async () => {
  const swamp = new FakeSwamp();
  await media.methods.show.execute({}, swamp.context("media", {}));
  assertEquals(swamp.latest("media", "settings")!.coldOpenTransition, "cut");
  const ok = (v: string) =>
    media.globalArguments.safeParse({ coldOpenTransition: v }).success;
  assertEquals([ok("fade"), ok("cut"), ok("wipe")], [true, true, false]);
  // Settings saved before cold opens upgrade unchanged.
  const old = { encoder: "vaapi", bedMinSeconds: 2 };
  assertEquals(media.upgrades.at(-1)!.upgradeAttributes(old), old);
});

Deno.test("media: a full bed and joined takes are opt-in", async () => {
  const swamp = new FakeSwamp();
  await media.methods.show.execute({}, swamp.context("media", {}));
  const s = swamp.latest("media", "settings")!;
  assertEquals(
    [s.bedMode, s.bedLevel, s.bedDuck, s.takeTransition],
    ["waits", -12, false, "cut"],
  );
  const ok = (v: Record<string, unknown>) =>
    media.globalArguments.safeParse(v).success;
  assertEquals(ok({ bedMode: "always" }), false);
  assertEquals(ok({ bedLevel: 3 }), false);
  assertEquals(ok({ takeTransition: "wipe" }), false);
  assertEquals(
    ok({ bedMode: "full", bedLevel: -18, takeTransition: "fade" }),
    true,
  );
  // Settings saved earlier upgrade unchanged.
  const old = { encoder: "vaapi", bedFadeSeconds: 1 };
  assertEquals(media.upgrades.at(-1)!.upgradeAttributes(old), old);
});
