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

import {
  assert,
  assertEquals,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import { model as render } from "./render.ts";
import { model as describe } from "./describe.ts";
import { model as presenter } from "./presenter.ts";
import { built, renderArgs, setup, teardown } from "./_lib/scenario.ts";

Deno.test("describe: chapters mapped through the edit list, presenter links, no defaults", async () => {
  const env = await setup();
  try {
    await built(env);
    await render.methods.render.execute(
      renderArgs(env),
      env.swamp.context("render", {}),
    );
    await presenter.methods.show.execute(
      {},
      env.swamp.context("presenter", {
        name: "Pat Example",
        email: "pat@example.com",
        campaignUrl: "https://example.com/pat",
        cta: "Book a call",
      }),
    );
    await describe.methods.describe.execute(
      {
        recordingPath: env.rec,
        edit: "edit",
        render: "render",
        presenter: "presenter",
        title: "A demo",
        summary: "What it does.",
        chapters: [{ start: 0, title: "Hello" }, {
          start: "0:33",
          title: "It works",
        }],
        tags: ["swamp"],
      },
      env.swamp.context("describe", {}),
    );
    const y = env.swamp.latest("describe", "take")!;
    // only two chapters: YouTube needs three, so none are listed
    assertEquals(y.chaptersIncluded, false);
    assertStringIncludes(
      y.description as string,
      "Book a call: https://example.com/pat",
    );
    assertStringIncludes(y.description as string, "Email: pat@example.com");
    assert(!(y.description as string).includes("swamp-club.com"));
    const file = await Deno.readTextFile(y.path as string);
    assert(file.startsWith("A demo\n\nWhat it does."));
  } finally {
    await teardown(env);
  }
});

Deno.test("describe: a cold open's hook is not shifted by the intro; the rest is", async () => {
  const env = await setup();
  try {
    await built(env);
    const describeWith = async (hookSeconds?: number) => {
      // A long render, so chapters are far enough apart to be kept.
      const ctx = env.swamp.context("render", {});
      await ctx.writeResource("video", "take", {
        recording: env.rec,
        take: "take",
        polished: `${env.dir}/take.polished.mp4`,
        srt: `${env.dir}/take.polished.srt`,
        thumbnail: `${env.dir}/take.thumbnail.jpg`,
        durationSeconds: 100,
        introSeconds: 20,
        hookSeconds,
        cardsMode: "simple",
        encoder: "libx264",
        redactions: 0,
        renderedAt: new Date().toISOString(),
      });
      await describe.methods.describe.execute(
        {
          recordingPath: env.rec,
          edit: "edit",
          render: "render",
          title: "A demo",
          summary: "What it does.",
          chapters: [{ start: 0, title: "Hello" }, {
            start: "0:33",
            title: "It works",
          }],
          tags: [],
        },
        env.swamp.context("describe", {}),
      );
      return (env.swamp.latest("describe", "take")!.chapters as {
        at: number;
        title: string;
      }[]).map((c) => c.at);
    };
    // 0:33 is 6.16s into the edited take: after the intro without a cold
    // open, still inside a 6.5s hook with one.
    assertEquals(await describeWith(), [0, 26.16]);
    assertEquals(await describeWith(6.5), [0]);
    assertEquals(await describeWith(5), [0, 26.16]);
  } finally {
    await teardown(env);
  }
});
