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

import { FakeSwamp } from "./testing.ts";
import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { fileUrl, resolveCards, titleHtml } from "./cards.ts";

Deno.test("fileUrl encodes characters a browser would read as URL syntax", () => {
  assertEquals(
    fileUrl("/v/a b/#1?/title.html"),
    "file:///v/a%20b/%231%3F/title.html",
  );
});

Deno.test("titleHtml escapes the card text", () => {
  assertStringIncludes(
    titleHtml("Demo", "<b>&</b>", "it's"),
    "&lt;b&gt;&amp;&lt;/b&gt;",
  );
  assertStringIncludes(titleHtml("Demo", "x", "it's"), "it&#x27;s");
});

Deno.test("a cards resource that breaks the contract is refused, naming the instance", async () => {
  const swamp = new FakeSwamp();
  const ctx = swamp.context("render", {});
  await swamp.context("my-cards", {}).writeResource("cards", "t", {
    lowerThird: { path: "/c/lt.png", seconds: 4, at: "1),movie=/etc/passwd" },
  });
  const take = {
    recording: "/v/t.mkv",
    stem: "/v/t",
    name: "t",
    workDir: "/v/t.video",
  };
  await assertRejects(
    () =>
      resolveCards(
        ctx,
        { mode: "custom", from: "my-cards" },
        take,
        () => Promise.resolve(""),
      ),
    Error,
    "my-cards doesn't match the cards contract: lowerThird.at",
  );
});
