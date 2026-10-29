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
import { embeddedAssets } from "./assets.ts";
import { type Presenter, PresenterSchema } from "./contract.ts";
import { qrSvg } from "./qr.ts";
import {
  backdropHtml,
  cameraRingHtml,
  fastForwardHtml,
  introHtml,
  lowerThirdHtml,
  outroHtml,
  stageLayout,
} from "./templates.ts";

const assets = embeddedAssets();
const layout = stageLayout(0.8, 300);
const full: Presenter = PresenterSchema.parse({
  name: "Pat Example",
  title: "Staff Engineer",
  handle: "@pat",
  email: "pat@example.com",
  campaignUrl: "https://example.com/pat",
  cta: "Book a call with Pat",
});
const bare: Presenter = PresenterSchema.parse({ name: "Pat Example" });

/** The page's markup, without its style and script. */
function body(html: string): string {
  return html.slice(html.indexOf("<body>"), html.indexOf("<script>"));
}

Deno.test("stage layout: centred 80% screen, webcam ring bottom-right", () => {
  assertEquals(layout.screen, { x: 192, y: 108, width: 1536, height: 864 });
  assertEquals(layout.ring, { x: 1476, y: 636, width: 420, height: 420 });
  assertEquals(layout.camera, { x: 1536, y: 696, width: 300, height: 300 });
});

Deno.test("intro: episode, title, subtitle and the presenter's details", () => {
  const html = introHtml({
    assets,
    episode: "Tutorial 3",
    title: "Ship it",
    subtitle: "From an empty repo",
    presenter: full,
  });
  for (
    const s of [
      "Tutorial 3",
      "Ship it",
      "From an empty repo",
      "Pat Example",
      "Staff Engineer",
      "@pat",
    ]
  ) assertStringIncludes(body(html), s);
  assertStringIncludes(html, "window.__seek");
  assert(!body(html).includes("stamp"), "no club stamp on the intro");
  // Fonts and images are inline; the page needs nothing next to it.
  assert(!html.includes("file://"));
  assertStringIncludes(html, "data:font/woff2;base64,");
});

Deno.test("text is escaped, so a title can't inject markup", () => {
  const html = introHtml({
    assets,
    episode: "<b>",
    title: '"><script>alert(1)</script>',
    subtitle: "Tom & Jerry's",
    presenter: { ...full, name: "<img src=x>" },
  });
  const b = body(html);
  assert(!b.includes("<script>alert"));
  assert(!b.includes("<img src=x>"));
  assertStringIncludes(b, "&lt;script&gt;alert(1)&lt;/script&gt;");
  assertStringIncludes(b, "Tom &amp; Jerry&#39;s");
});

Deno.test("empty presenter fields drop their lines; nothing stands in for them", () => {
  const intro = body(introHtml({
    assets,
    episode: "",
    title: "T",
    subtitle: "",
    presenter: bare,
  }));
  for (const cls of ["episode", "subtitle", "role", "handle"]) {
    assert(!intro.includes(`class="${cls}"`), cls);
  }
  const outro = body(
    outroHtml({ assets, presenter: bare, qrSvg: "", seconds: 8 }),
  );
  assert(!outro.includes("qr-card"));
  assert(!outro.includes('class="cta"'));
  assert(!outro.includes("<dt>Email</dt>"));
  assert(!outro.includes("<dt>Club</dt>"));
  const lt = body(
    lowerThirdHtml({ assets, presenter: bare, layout, seconds: 6 }),
  );
  assert(!lt.includes('class="meta"'));
  const backdrop = body(backdropHtml({ assets, presenter: bare, layout }));
  assert(!backdrop.includes('class="handle"'));
  assertStringIncludes(backdrop, "swamp-club.com");
});

Deno.test("outro: contact, QR code to the campaign page, and the call to action", () => {
  const html = body(outroHtml({
    assets,
    presenter: full,
    qrSvg: qrSvg(full.campaignUrl),
    seconds: 8,
  }));
  assertStringIncludes(html, "pat@example.com");
  assertStringIncludes(html, "@pat");
  assertStringIncludes(html, "qr-card");
  assertStringIncludes(html, qrSvg(full.campaignUrl));
  assertStringIncludes(html, "Book a call with Pat");
  assertStringIncludes(html, "example.com/pat");
  assert(
    !html.includes("https://example.com/pat"),
    "the scheme is dropped on screen",
  );
});

Deno.test("no identity lives in the scenes: only what the presenter gives", async () => {
  const source = await Deno.readTextFile(
    new URL("./templates.ts", import.meta.url),
  );
  for (
    const s of [
      "Adam Jacob",
      "adam@",
      "campaign/adam",
      "@adam",
      "Book 30 minutes",
    ]
  ) {
    assert(!source.includes(s), s);
  }
  const pages = [
    introHtml({
      assets,
      episode: "E",
      title: "T",
      subtitle: "",
      presenter: bare,
    }),
    outroHtml({ assets, presenter: bare, qrSvg: "", seconds: 8 }),
    lowerThirdHtml({ assets, presenter: bare, layout, seconds: 6 }),
    backdropHtml({ assets, presenter: bare, layout }),
  ].map(body).join("");
  assert(!pages.includes("@"), "no handle or email appears unless given");
});

Deno.test("overlays are transparent; the lower third leaves before its time is up", () => {
  const lt = lowerThirdHtml({ assets, presenter: full, layout, seconds: 6 });
  assertStringIncludes(lt, "html,body{background:transparent}");
  assertStringIncludes(lt, "lt-out .6s 5.3s");
  // Beside the ring: its right edge 10px into the ring's box.
  assertStringIncludes(lt, `right:${1920 - 1476 - 10}px`);
  const ff = fastForwardHtml({ assets, layout });
  assertStringIncludes(ff, "html,body{background:transparent}");
  assertStringIncludes(ff, "Fast forward");
  assertStringIncludes(ff, "infinite");
  const ring = cameraRingHtml({ assets, layout });
  assertStringIncludes(ring, "html,body{background:transparent}");
  assertStringIncludes(ring, "left:1476px;top:636px;width:420px;height:420px");
});
