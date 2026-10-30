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
  assertRejects,
  assertStringIncludes,
  assertThrows,
} from "jsr:@std/assert@1.0.19";
import { model as edit, parseTime } from "./edit.ts";
import { model as screen } from "./screen.ts";
import { built, setup, teardown } from "./_lib/scenario.ts";

Deno.test("edit build: fillers and the retaken sentence cut, the wait fast-forwarded", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const kept = list.items.filter((i) => i.kind === "word" && i.keep).map((
      i,
    ) => i.token);
    assertEquals(kept, [
      "Hello,",
      "this",
      "is",
      "a",
      "demo.",
      "It",
      "really",
      "works.",
    ]);
    const wait = list.items.find((i) => i.kind === "pause" && i.keep)!;
    assertEquals(wait.token, ">>30.1s");
    assertEquals(wait.speed, 8);
    assert(list.outputDuration < 15, `output ${list.outputDuration}s`);
    const file = await Deno.readTextFile(list.editFile);
    assertStringIncludes(file, "{um,}");
    assertStringIncludes(file, ">>30.1s");
    // the energy envelope is a file cache, not data
    await Deno.stat(`${env.dir}/take.video/energy.json`);
  } finally {
    await teardown(env);
  }
});

Deno.test("edit build: explicit retake markers, and idle screens race faster", async () => {
  const env = await setup();
  try {
    await screen.methods.analyze.execute(
      {
        recordingPath: env.rec,
        stillness: 0.001,
        minStill: 1.5,
        activeEvery: 5,
        ocr: false,
        redact: false,
        allow: [],
      },
      env.swamp.context("screen", {}),
    );
    const list = await built(env, {
      screen: "screen",
      spokenRetakes: false,
      retakeMarkers: ["0:34"],
    });
    const wait = list.items.find((i) => i.kind === "pause" && i.keep)!;
    // idle 3.2-23.5 covers under 90% of the 2.9-33.0 wait: normal fast-forward
    assertEquals(wait.speed, 8);
    const kept = list.items.filter((i) => i.kind === "word" && i.keep).map((
      i,
    ) => i.token);
    assertEquals(kept.slice(-4), ["retake", "It", "really", "works."]);
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: chat cut, keep and speed by quote and by time", async () => {
  const env = await setup();
  try {
    await built(env);
    const ctx = () => env.swamp.context("edit", {});
    await edit.methods.cut.execute(
      { recordingPath: env.rec, quote: "this is a demo", occurrence: 1 },
      ctx(),
    );
    let list = env.swamp.latest("edit", "take") as Awaited<
      ReturnType<typeof built>
    >;
    assertEquals(
      list.items.filter((i) => i.kind === "word" && i.keep).map((i) => i.token),
      ["Hello,", "It", "really", "works."],
    );
    await edit.methods.keep.execute(
      { recordingPath: env.rec, start: "0:01.4", end: "0:01.9", occurrence: 1 },
      ctx(),
    );
    list = env.swamp.latest("edit", "take") as typeof list;
    assert(list.items.find((i) => i.token === "um,")!.keep);
    await edit.methods.speed.execute(
      { recordingPath: env.rec, start: 10, end: 20, speed: "1", occurrence: 1 },
      ctx(),
    );
    list = env.swamp.latest("edit", "take") as typeof list;
    const wait = list.items.find((i) => i.kind === "pause" && i.keep)!;
    assertEquals([wait.speed, wait.token], [1, "~30.1s"]);
    await assertRejects(
      () =>
        edit.methods.cut.execute(
          { recordingPath: env.rec, quote: "never said", occurrence: 1 },
          ctx(),
        ),
      Error,
      "could not find",
    );
    await assertRejects(
      () =>
        edit.methods.speed.execute(
          {
            recordingPath: env.rec,
            start: 10,
            end: 20,
            speed: "fast",
            occurrence: 1,
          },
          ctx(),
        ),
      Error,
      "speed must be",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: edit.txt round-trips a hand edit and a spelling fix", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const ctx = () => env.swamp.context("edit", {});
    const original = await Deno.readTextFile(list.editFile);
    await Deno.writeTextFile(
      list.editFile,
      original.replace(">>30.1s", "{>>30.1s}").replace("demo.", "Demo."),
    );
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    const after = env.swamp.latest("edit", "take") as typeof list;
    assertEquals(
      after.items.find((i) => i.kind === "pause" && i.e > 30)!.keep,
      false,
    );
    assertEquals(after.items.find((i) => i.token === "demo.")!.text, "Demo.");
    assert(after.outputDuration < list.outputDuration);
    // export shows the fix, and importing that again changes nothing
    await edit.methods.export.execute({ recordingPath: env.rec }, ctx());
    const exported = await Deno.readTextFile(list.editFile);
    assertStringIncludes(exported, "Demo.");
    assertStringIncludes(exported, "{>>30.1s");
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    const again = env.swamp.latest("edit", "take") as typeof list;
    assertEquals(again.spans, after.spans);
    assertEquals(again.items.find((i) => i.token === "demo.")!.text, "Demo.");
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: a nested brace is an error, not a silent un-cut", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const original = await Deno.readTextFile(list.editFile);
    await Deno.writeTextFile(
      list.editFile,
      original.replace("{um,}", "{um, {this} is"),
    );
    await assertRejects(
      () =>
        edit.methods.import.execute(
          { recordingPath: env.rec },
          env.swamp.context("edit", {}),
        ),
      Error,
      "line 0: nested",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("edit build: a missing transcript names the fix", async () => {
  const env = await setup();
  try {
    await assertRejects(
      () =>
        edit.methods.build.execute(
          {
            recordingPath: env.rec,
            transcript: "transcript",
            retakeMarkers: [],
            spokenRetakes: true,
          },
          env.swamp.context("edit", {}),
        ),
      Error,
      "run its transcribe (or import) method first",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: chat edits refuse to drop hand edits not yet imported", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const original = await Deno.readTextFile(list.editFile);
    await Deno.writeTextFile(list.editFile, original.replace("demo.", "Demo."));
    await assertRejects(
      () =>
        edit.methods.cut.execute(
          { recordingPath: env.rec, quote: "Hello", occurrence: 1 },
          env.swamp.context("edit", {}),
        ),
      Error,
      "run this instance's import method",
    );
    assertStringIncludes(await Deno.readTextFile(list.editFile), "Demo.");
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: speed leaves pauses build trimmed alone", async () => {
  const env = await setup();
  try {
    await built(env);
    await edit.methods.speed.execute(
      { recordingPath: env.rec, start: 0, end: 60, speed: 1, occurrence: 1 },
      env.swamp.context("edit", {}),
    );
    const list = env.swamp.latest("edit", "take") as Awaited<
      ReturnType<typeof built>
    >;
    const pauses = list.items.filter((i) => i.kind === "pause");
    // the 30s wait now plays at normal speed; the short trimmed pauses stay cut
    assertEquals(pauses.filter((p) => p.keep).map((p) => p.token), ["~30.1s"]);
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: a take name reused by another recording is an error, not a mix-up", async () => {
  const env = await setup();
  try {
    await built(env);
    await Deno.mkdir(`${env.dir}/other`);
    const other = `${env.dir}/other/take.mkv`;
    await Deno.writeTextFile(other, "another recording");
    await assertRejects(
      () =>
        edit.methods.build.execute(
          {
            recordingPath: other,
            transcript: "transcript",
            retakeMarkers: [],
            spokenRetakes: true,
          },
          env.swamp.context("edit", {}),
        ),
      Error,
      "two recordings share the name take",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("parseTime: seconds, m:ss and h:mm:ss; blank or negative times rejected", () => {
  assertEquals(parseTime("12:30"), 750);
  assertEquals(parseTime("1:02:03.5"), 3723.5);
  assertEquals(parseTime(" 7.25 "), 7.25);
  for (const bad of ["", ":", "1:", "-3", "abc"]) {
    assertThrows(() => parseTime(bad), Error, "not a time");
  }
});

Deno.test("edit: after importing a hand edit, chat edits work on it", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const ctx = () => env.swamp.context("edit", {});
    const original = await Deno.readTextFile(list.editFile);
    // deleting a word is a hand edit the exported form would show braced
    await Deno.writeTextFile(
      list.editFile,
      original.replace(" a demo.", " demo."),
    );
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    await edit.methods.cut.execute(
      { recordingPath: env.rec, quote: "Hello", occurrence: 1 },
      ctx(),
    );
    const after = env.swamp.latest("edit", "take") as typeof list;
    assertEquals(after.items.find((i) => i.token === "Hello,")!.keep, false);
    assertEquals(after.items.find((i) => i.token === "a")!.keep, false);
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: a speed choice survives recut, a chat edit and another recut", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const ctx = () => env.swamp.context("edit", {});
    await edit.methods.speed.execute(
      { recordingPath: env.rec, start: 10, end: 20, speed: 1, occurrence: 1 },
      ctx(),
    );
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    await edit.methods.cut.execute(
      { recordingPath: env.rec, quote: "Hello", occurrence: 1 },
      ctx(),
    );
    assertStringIncludes(await Deno.readTextFile(list.editFile), "~30.1s");
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    const after = env.swamp.latest("edit", "take") as typeof list;
    const wait = after.items.find((i) => i.kind === "pause" && i.keep)!;
    assertEquals([wait.speed, wait.token], [1, "~30.1s"]);
  } finally {
    await teardown(env);
  }
});

Deno.test("edit build: un-imported hand edits are saved aside, not lost", async () => {
  const env = await setup();
  try {
    const list = await built(env);
    const original = await Deno.readTextFile(list.editFile);
    await Deno.writeTextFile(list.editFile, original.replace("demo.", "Demo."));
    await built(env);
    assertStringIncludes(
      await Deno.readTextFile(`${list.editFile}.bak`),
      "Demo.",
    );
    assert(
      env.swamp.logs.some((l) => l.level === "warn" && l.msg.includes(".bak")),
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: untilQuote is found after the start quote, and bad speeds fail", async () => {
  const env = await setup();
  try {
    await built(env);
    const ctx = () => env.swamp.context("edit", {});
    // "works." also ends the start quote; the range must run to the second one
    await edit.methods.cut.execute(
      {
        recordingPath: env.rec,
        quote: "It works.",
        untilQuote: "works.",
        occurrence: 1,
      },
      ctx(),
    );
    const list = env.swamp.latest("edit", "take") as Awaited<
      ReturnType<typeof built>
    >;
    assertEquals(
      list.items.filter((i) => i.kind === "word" && i.keep).map((i) => i.token),
      ["Hello,", "this", "is", "a", "demo."],
    );
    await assertRejects(
      () =>
        edit.methods.speed.execute(
          {
            recordingPath: env.rec,
            start: 0,
            end: 2,
            speed: "fast",
            occurrence: 1,
          },
          ctx(),
        ),
      Error,
      "speed must be",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: cut and keep refuse a time range covering part of a wait", async () => {
  const env = await setup();
  try {
    await built(env);
    const ctx = () => env.swamp.context("edit", {});
    await assertRejects(
      () =>
        edit.methods.cut.execute(
          { recordingPath: env.rec, start: 10, end: 20, occurrence: 1 },
          ctx(),
        ),
      Error,
      "covers only part of the 30.1s wait",
    );
    await edit.methods.cut.execute(
      { recordingPath: env.rec, start: 2.9, end: 33.0, occurrence: 1 },
      ctx(),
    );
    const list = env.swamp.latest("edit", "take") as Awaited<
      ReturnType<typeof built>
    >;
    assertEquals(
      list.items.find((i) => i.kind === "pause" && i.e > 30)!.keep,
      false,
    );
  } finally {
    await teardown(env);
  }
});

type Listed = Awaited<ReturnType<typeof built>> & { coldOpenUntil?: number };

Deno.test("edit build: a cold open by quote or by time, marked in edit.txt", async () => {
  const env = await setup();
  try {
    let list: Listed = await built(env, { coldOpenUntil: "this is a demo" });
    assertEquals(list.coldOpenUntil, 2.9);
    const file = await Deno.readTextFile(list.editFile);
    assertStringIncludes(file, "this is a demo. [cold-open]\n");
    assertStringIncludes(file, "# [cold-open] ends the cold open");
    // A time ends the hook after the last word starting before it.
    list = await built(env, { coldOpenUntil: "0:02.2" });
    assertEquals(list.coldOpenUntil, 2.3);
    // Empty (the workflow's default) is no cold open, and no marker.
    list = await built(env, { coldOpenUntil: "" });
    assertEquals(list.coldOpenUntil, undefined);
    assert(!(await Deno.readTextFile(list.editFile)).includes("cold-open"));
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: cold-open from chat sets, moves and clears it; chat edits still work", async () => {
  const env = await setup();
  try {
    await built(env);
    const ctx = () => env.swamp.context("edit", {});
    const latest = () => env.swamp.latest("edit", "take") as Listed;
    await edit.methods["cold-open"].execute(
      { recordingPath: env.rec, quote: "Hello", occurrence: 1, clear: false },
      ctx(),
    );
    assertEquals(latest().coldOpenUntil, 1.4);
    assertStringIncludes(
      await Deno.readTextFile(latest().editFile),
      "Hello, [cold-open] {um,} this",
    );
    // The rewritten edit.txt counts as in sync: a chat edit is not refused.
    await edit.methods.cut.execute(
      { recordingPath: env.rec, quote: "really", occurrence: 1 },
      ctx(),
    );
    assertEquals(latest().coldOpenUntil, 1.4);
    await edit.methods["cold-open"].execute(
      { recordingPath: env.rec, occurrence: 1, clear: true },
      ctx(),
    );
    assertEquals(latest().coldOpenUntil, undefined);
    assert(!(await Deno.readTextFile(latest().editFile)).includes("cold-open"));
    await assertRejects(
      () =>
        edit.methods["cold-open"].execute(
          {
            recordingPath: env.rec,
            quote: "It really works",
            occurrence: 1,
            clear: false,
          },
          ctx(),
        ),
      Error,
      "leaves nothing of the take after it",
    );
    await assertRejects(
      () =>
        edit.methods["cold-open"].execute(
          {
            recordingPath: env.rec,
            end: "0:00.5",
            occurrence: 1,
            clear: false,
          },
          ctx(),
        ),
      Error,
      "no words before 0:00",
    );
    // With the opening word cut, a hook up to it keeps nothing.
    await edit.methods.cut.execute(
      { recordingPath: env.rec, quote: "Hello", occurrence: 1 },
      ctx(),
    );
    await assertRejects(
      () =>
        edit.methods["cold-open"].execute(
          {
            recordingPath: env.rec,
            quote: "Hello",
            occurrence: 1,
            clear: false,
          },
          ctx(),
        ),
      Error,
      "keeps no words",
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("edit: the [cold-open] marker moves, survives import and can be deleted", async () => {
  const env = await setup();
  try {
    const list: Listed = await built(env, { coldOpenUntil: "this is a demo" });
    const ctx = () => env.swamp.context("edit", {});
    const latest = () => env.swamp.latest("edit", "take") as Listed;
    const original = await Deno.readTextFile(list.editFile);
    const moved = original.replace("demo. [cold-open]", "demo.")
      .replace("Hello, {um,}", "Hello, [cold-open] {um,}");
    await Deno.writeTextFile(list.editFile, moved);
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    assertEquals(latest().coldOpenUntil, 1.4);
    // Re-exported where it was put, and importing again changes nothing.
    await edit.methods.export.execute({ recordingPath: env.rec }, ctx());
    assertEquals(await Deno.readTextFile(list.editFile), moved);
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    assertEquals(latest().coldOpenUntil, 1.4);
    // At the start of a line it ends the hook with the line before.
    await Deno.writeTextFile(
      list.editFile,
      original.replace("demo. [cold-open]", "demo.").replace(
        "| >>30.1s",
        "| [cold-open] >>30.1s",
      ),
    );
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    assertEquals(latest().coldOpenUntil, 2.9);
    await Deno.writeTextFile(
      list.editFile,
      original.replace("works. {~23.4s}", "works. [cold-open] {~23.4s}"),
    );
    await assertRejects(
      () => edit.methods.import.execute({ recordingPath: env.rec }, ctx()),
      Error,
      "a second [cold-open]",
    );
    await Deno.writeTextFile(
      list.editFile,
      original.replace("demo. [cold-open]", "demo."),
    );
    await edit.methods.import.execute({ recordingPath: env.rec }, ctx());
    assertEquals(latest().coldOpenUntil, undefined);
  } finally {
    await teardown(env);
  }
});
