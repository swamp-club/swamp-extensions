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
} from "jsr:@std/assert@1.0.19";
import { model } from "./brand.ts";
import { ASSET_FILES } from "./_lib/assets.ts";
import { fakeExec, fakeScenes, FakeSwamp, resetFakes } from "./_lib/testing.ts";
import { CardsResourceSchema as CoreCards } from "../../../extensions/models/_lib/cards.ts";
import { PresenterSchema } from "./_lib/contract.ts";
import { parse as parseYaml } from "jsr:@std/yaml@1.0.10";
import { model as coreEdit } from "../../../extensions/models/edit.ts";

async function setup() {
  const dir = await Deno.makeTempDir();
  const swamp = new FakeSwamp();
  await swamp.context("presenter").writeResource(
    "presenter",
    "presenter",
    PresenterSchema.parse({
      name: "Pat Example",
      title: "Staff Engineer",
      handle: "@pat",
      email: "pat@example.com",
      campaignUrl: "https://example.com/pat",
      cta: "Book a call",
    }),
  );
  const calls = fakeExec();
  const scenes = fakeScenes();
  return { dir, swamp, calls, scenes };
}

async function teardown(env: { dir: string }) {
  resetFakes();
  await Deno.remove(env.dir, { recursive: true });
}

const cardsArgs = {
  recordingPath: "videos/My Take.mkv",
  presenter: "presenter",
  title: "Ship it",
  subtitle: "",
  episode: "Demo",
  introSeconds: 5.5,
  outroSeconds: 8,
  lowerThirdSeconds: 6,
  lowerThirdAt: 1.5,
};

Deno.test("cards: render's brand cards, named after the take", async () => {
  const env = await setup();
  try {
    await model.methods.cards.execute(
      cardsArgs,
      env.swamp.context("video-brand", {}, env.dir),
    );
    const data = env.swamp.latest("video-brand", "my-take")!;
    assert(data, "written under the take's name, where render looks");
    assertEquals(data.recording, `${env.dir}/videos/My Take.mkv`);
    const dir = `${env.dir}/videos/My Take.video/brand`;
    // Exactly @swamp/video's contract, as render parses it.
    assertEquals(CoreCards.parse(data), {
      intro: { path: `${dir}/intro.mp4`, seconds: 5.5 },
      outro: { path: `${dir}/outro.mp4`, seconds: 8 },
      lowerThird: { path: `${dir}/lower-third.mov`, seconds: 6, at: 1.5 },
      fastForwardBadge: { path: `${dir}/fast-forward.mov` },
    });
    assertEquals(data.thumbnail, `${dir}/thumbnail.png`);

    // intro, outro, lower third, badge, then the thumbnail still
    const [intro, outro, lt, ff, thumb] = env.scenes;
    assertEquals(env.scenes.length, 5);
    assertEquals(intro.frames.length, 165);
    assertEquals(outro.frames.length, 240);
    assertEquals(lt.frames.length, 180);
    assertEquals(ff.frames.length, 30);
    assertEquals(thumb.frames, [4.5]);
    assertEquals(
      env.scenes.map((s) => s.opts.transparent),
      [false, false, true, true, false],
    );
    assertStringIncludes(intro.html, "Pat Example");
    assertStringIncludes(outro.html, "qr-card");
    assertStringIncludes(outro.html, "Book a call");
    assertEquals(
      env.calls.map((c) => c.args.at(-1)),
      [
        `${dir}/intro.mp4`,
        `${dir}/outro.mp4`,
        `${dir}/lower-third.mov`,
        `${dir}/fast-forward.mov`,
      ],
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("cards: a missing presenter fails naming the fix; size must be 16:9", async () => {
  const env = await setup();
  try {
    await assertRejects(
      () =>
        model.methods.cards.execute(
          { ...cardsArgs, presenter: "nobody" },
          env.swamp.context("video-brand", {}, env.dir),
        ),
      Error,
      "swamp model create @swamp/video/presenter nobody",
    );
    await assertRejects(
      () =>
        model.methods.cards.execute(
          cardsArgs,
          env.swamp.context(
            "video-brand",
            { width: 1080, height: 1080 },
            env.dir,
          ),
        ),
      Error,
      "16:9",
    );
    assertEquals(env.scenes.length, 0);
  } finally {
    await teardown(env);
  }
});

Deno.test("cards: brandDir swaps in the user's own assets", async () => {
  const env = await setup();
  try {
    await Deno.mkdir(`${env.dir}/my-brand/fonts`, { recursive: true });
    for (const file of ASSET_FILES) {
      await Deno.writeTextFile(`${env.dir}/my-brand/${file}`, `mine:${file}`);
    }
    await model.methods.cards.execute(
      cardsArgs,
      env.swamp.context("video-brand", { brandDir: "my-brand" }, env.dir),
    );
    assertStringIncludes(
      env.scenes[2].html,
      `data:image/svg+xml;base64,${btoa("mine:sc-mark.svg")}`,
    );
  } finally {
    await teardown(env);
  }
});

Deno.test("stage: backdrop, ring loop, mask and layout for OBS", async () => {
  const env = await setup();
  try {
    await model.methods.stage.execute(
      { presenter: "presenter", dir: "studio" },
      env.swamp.context("video-brand", { width: 1280, height: 720 }, env.dir),
    );
    const stage = env.swamp.latest("video-brand", "stage")!;
    const dir = `${env.dir}/studio`;
    assertEquals(stage.backdropPath, `${dir}/backdrop.png`);
    assertEquals(stage.cameraRingPath, `${dir}/camera-ring.webm`);
    assertEquals(stage.cameraMaskPath, `${dir}/camera-mask.png`);
    assertEquals(
      (stage.layout as { ring: unknown }).ring,
      { x: 1476, y: 636, width: 420, height: 420 },
    );
    const [backdrop, ring] = env.scenes;
    assertEquals(backdrop.frames, [0]);
    assertStringIncludes(backdrop.html, "@pat");
    assertEquals(ring.frames.length, 180);
    // The ring's box at 1280x720, even-sized for VP9.
    assert(env.calls[0].args.includes("crop=280:280:984:424"));
    assertEquals(env.calls[1].args.at(-1), `${dir}/camera-mask.png`);
  } finally {
    await teardown(env);
  }
});

interface WorkflowYaml {
  name: string;
  inputs: { properties: Record<string, { default?: unknown }> };
  jobs: {
    steps: {
      name: string;
      task: {
        workflowIdOrName?: string;
        behaviorType?: string;
        methodName?: string;
        inputs: Record<string, unknown>;
      };
    }[];
  }[];
}

const workflow = (path: string): WorkflowYaml =>
  parseYaml(
    Deno.readTextFileSync(new URL(path, import.meta.url)),
  ) as WorkflowYaml;

Deno.test("the brand workflow passes a cold open through to video-edit and its build", () => {
  const brand = workflow("../workflows/video_edit_brand.yaml");
  const core = workflow("../../../extensions/workflows/video_edit.yaml");
  // Same default as core: no cold open unless one is given.
  assertEquals(brand.inputs.properties.coldOpenUntil.default, "");
  const run = brand.jobs[0].steps.find((s) =>
    s.task.workflowIdOrName === core.name
  )!;
  assertEquals(run.task.inputs.coldOpenUntil, "${{ inputs.coldOpenUntil }}");
  assertEquals(core.inputs.properties.coldOpenUntil.default, "");
  const build = core.jobs[0].steps.find((s) =>
    s.task.behaviorType === "@swamp/video/edit" && s.task.methodName === "build"
  )!;
  assertEquals(
    build.task.inputs.coldOpenUntil,
    "${{ inputs.coldOpenUntil }}",
  );
  for (const value of ["", "and that is the hook", "0:07"]) {
    assert(
      coreEdit.methods.build.arguments.safeParse({
        recordingPath: "take.mkv",
        coldOpenUntil: value,
      }).success,
    );
  }
});
