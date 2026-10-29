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

/**
 * Where render gets its cards. Every source hands over the same contract
 * (graph.ts `Cards`):
 *
 * - `simple`: demo-polish's kicker/title/subtitle card, drawn by headless
 *   Chromium. Built in; the default.
 * - `none`: no cards.
 * - `custom`: your own files, or the `cards` resource of any behavior that
 *   writes one (the same fields).
 * - `brand`: the `cards` resource of an @swamp/video/brand instance.
 *
 * Overlays (lower third, fast-forward badge) may be stills or videos with
 * alpha; graph.ts plays an animated lower third once and loops a badge.
 *
 * @module
 */

import {
  readLatest,
  readTakeData,
  resolvePath,
  type VideoContext,
} from "./context.ts";
import { z } from "zod";
import { run } from "./exec.ts";
import { type Cards, TITLE_LEN } from "./graph.ts";
import type { Take } from "./media.ts";

export type CardsMode = "simple" | "none" | "custom" | "brand";

export interface CardsInput {
  mode: CardsMode;
  title?: string;
  subtitle?: string;
  kicker?: string;
  /** custom/brand: the instance whose `cards` resource to use. */
  from?: string;
  intro?: { path: string; seconds: number };
  outro?: { path: string; seconds: number };
  lowerThird?: { path: string; seconds: number; at: number };
  fastForwardBadge?: { path: string };
}

const TITLE_HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
html, body { margin: 0; width: 100%; height: 100%; }
body { display: flex; align-items: center; color: #f2f5f7; font-family: 'Adwaita Sans', 'Noto Sans', sans-serif;
  background: radial-gradient(120% 90% at 15% 0%, #12301f 0%, #0b1014 55%, #080b0e 100%); }
main { padding: 0 11vw; }
.kicker { font-family: 'Adwaita Mono', monospace; font-size: 2.4vh; letter-spacing: .32em;
  text-transform: uppercase; color: #34d399; }
h1 { font-size: 9.5vh; line-height: 1.04; font-weight: 700; letter-spacing: -.02em;
  margin: 3.2vh 0 0; max-width: 70vw; }
.bar { width: 7vh; height: .55vh; border-radius: 1vh; background: #34d399; margin: 5vh 0 4vh; }
p { font-size: 3.6vh; color: #9aa6b2; margin: 0; }
</style></head><body><main><div class="kicker">{kicker}</div><h1>{title}</h1>
<div class="bar"></div><p>{subtitle}</p></main></body></html>`;

/** A file:// URL for a path, with #, ? and spaces encoded. */
export function fileUrl(path: string): string {
  const url = new URL("file:///");
  url.pathname = path;
  return url.href;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}

export function titleHtml(
  kicker: string,
  title: string,
  subtitle: string,
): string {
  return TITLE_HTML.replace("{kicker}", escapeHtml(kicker))
    .replace("{title}", escapeHtml(title))
    .replace("{subtitle}", escapeHtml(subtitle));
}

/** Draw the simple title card at the video's size. */
export async function drawTitleCard(
  chromium: string,
  take: Take,
  input: CardsInput,
  width: number,
  height: number,
  signal?: AbortSignal,
): Promise<string> {
  const page = `${take.workDir}/title.html`;
  const png = `${take.workDir}/title.png`;
  await Deno.writeTextFile(
    page,
    titleHtml(input.kicker ?? "Demo", input.title ?? "", input.subtitle ?? ""),
  );
  // A throwaway profile, so a running browser doesn't take the call.
  const profile = await Deno.makeTempDir({ prefix: "video-card-" });
  try {
    await run({
      bin: chromium,
      args: [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        `--user-data-dir=${profile}`,
        "--force-device-scale-factor=1",
        `--window-size=${width},${height}`,
        `--screenshot=${png}`,
        fileUrl(page),
      ],
      signal,
    });
  } finally {
    await Deno.remove(profile, { recursive: true }).catch(() => {});
  }
  return png;
}

const Card = z.object({
  path: z.string().min(1),
  seconds: z.number().positive(),
});

/** The cards contract, as another behavior's `cards` resource must hold it. */
export const CardsResourceSchema = z.object({
  intro: Card.optional(),
  outro: Card.optional(),
  lowerThird: Card.extend({ at: z.number().min(0) }).optional(),
  fastForwardBadge: z.object({ path: z.string().min(1) }).optional(),
});

function fromResource(
  data: Record<string, unknown>,
  resolve: (path: string) => string,
  instance: string,
): Cards {
  const parsed = CardsResourceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `the cards resource on ${instance} doesn't match the cards contract: ` +
        parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
    );
  }
  const c = parsed.data;
  const at = <T extends { path: string }>(card?: T) =>
    card && { ...card, path: resolve(card.path) };
  return {
    intro: at(c.intro),
    outro: at(c.outro),
    lowerThird: at(c.lowerThird),
    fastForwardBadge: at(c.fastForwardBadge),
  };
}
/** The cards a render uses, whatever their source. */
export async function resolveCards(
  ctx: VideoContext,
  input: CardsInput,
  take: Take,
  draw: () => Promise<string>,
): Promise<Cards> {
  switch (input.mode) {
    case "none":
      return {};
    case "simple": {
      if (!input.title) {
        throw new Error("simple cards need a title (or use cards mode none)");
      }
      return { intro: { path: await draw(), seconds: TITLE_LEN } };
    }
    case "brand":
    case "custom": {
      if (input.from) {
        const data = await readTakeData(ctx, input.from, "cards", take) ??
          await readLatest(ctx, input.from, "cards");
        if (!data) {
          throw new Error(
            input.mode === "brand"
              ? `no cards on ${input.from}: brand cards come from @swamp/video/brand — ` +
                `install it, render the cards, or use cards mode simple`
              : `no cards resource on ${input.from}`,
          );
        }
        return fromResource(data, (p) => resolvePath(ctx, p), input.from);
      }
      if (input.mode === "brand") {
        throw new Error(
          "brand cards need the @swamp/video/brand extension: pass cards.from " +
            "with its instance, or use cards mode simple",
        );
      }
      return {
        intro: input.intro,
        outro: input.outro,
        lowerThird: input.lowerThird,
        fastForwardBadge: input.fastForwardBadge,
      };
    }
  }
}
