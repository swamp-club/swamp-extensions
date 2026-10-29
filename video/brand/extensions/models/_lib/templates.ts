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
 * The Swamp Club scenes, ported from Adam's swamp-video prototype: a
 * synthwave postcard (the swamp-club.com/about-us look) for the intro and
 * outro, and transparent overlays for the lower third, the fast-forward
 * badge and the webcam ring. Every scene is laid out on a 1920x1080 stage
 * and scaled to the output by the renderer. Motion is plain CSS animation
 * that `window.__seek` pauses at any time, so scenes render frame by frame.
 *
 * Nothing about the presenter lives here: every name, handle, email, link
 * and call to action comes from their @swamp/video/presenter instance, and
 * an empty field drops its line.
 *
 * @module
 */

import type { BrandAssets } from "./assets.ts";
import type { Presenter, StageLayout } from "./contract.ts";

export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;
/** The webcam ring's loop; every ring animation's period divides it. */
export const CAMERA_RING_LOOP_SECONDS = 6;
/** The fast-forward badge's loop, seamless for render to repeat. */
export const FAST_FORWARD_LOOP_SECONDS = 1;

const RING_PAD = 60;
const RING_MARGIN = 24;

/** The OBS stage: a centred, scaled screen share and a bottom-right webcam. */
export function stageLayout(
  screenScale: number,
  cameraSize: number,
): StageLayout {
  const width = Math.round(STAGE_WIDTH * screenScale);
  const height = Math.round(STAGE_HEIGHT * screenScale);
  const ringSize = cameraSize + 2 * RING_PAD;
  const ring = {
    x: STAGE_WIDTH - RING_MARGIN - ringSize,
    y: STAGE_HEIGHT - RING_MARGIN - ringSize,
    width: ringSize,
    height: ringSize,
  };
  return {
    stageWidth: STAGE_WIDTH,
    stageHeight: STAGE_HEIGHT,
    screen: {
      x: Math.round((STAGE_WIDTH - width) / 2),
      y: Math.round((STAGE_HEIGHT - height) / 2),
      width,
      height,
    },
    camera: {
      x: ring.x + RING_PAD,
      y: ring.y + RING_PAD,
      width: cameraSize,
      height: cameraSize,
    },
    ring,
  };
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** A line of markup, or nothing when its text is empty. */
function line(tag: string, cls: string, text: string): string {
  return text ? `<${tag} class="${cls}">${escapeHtml(text)}</${tag}>` : "";
}

function fontFaces(a: BrandAssets): string {
  const chakra = ([400, 500, 600, 700] as const).map((weight) =>
    `@font-face{font-family:"Chakra Petch";font-weight:${weight};src:url("${
      a[`fonts/ChakraPetch-${weight}-latin.woff2`]
    }") format("woff2")}`
  ).join("\n");
  return `${chakra}
@font-face{font-family:"Orbitron";font-weight:400 900;src:url("${
    a["fonts/Orbitron-var-latin.woff2"]
  }") format("woff2")}
@font-face{font-family:"Inter";font-weight:100 900;src:url("${
    a["fonts/Inter-var-latin.woff2"]
  }") format("woff2")}`;
}

const EASE = "cubic-bezier(.2,.7,.2,1)";

// The postcard: night sky with stars, a striped sun on a neon horizon, a
// scrolling grid, palms either side, and faint scanlines over the scenery
// (never over text or the QR code).
function baseCss(a: BrandAssets): string {
  return `${fontFaces(a)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${STAGE_WIDTH}px;height:${STAGE_HEIGHT}px;overflow:hidden}
body{font-family:"Chakra Petch",sans-serif;color:#fff;-webkit-font-smoothing:antialiased}
.stage{position:absolute;inset:0;overflow:hidden}
.postcard{background:linear-gradient(#04020b,#120626 38%,#2a0b3b 60%,#44104a 70%)}
.stars{position:absolute;inset:0 0 30% 0;
  background-image:radial-gradient(1.6px 1.6px at 12% 18%,#fff,#0000),radial-gradient(1.2px 1.2px at 27% 8%,#fde7f3,#0000),
  radial-gradient(1.4px 1.4px at 41% 26%,#e0f7ff,#0000),radial-gradient(1px 1px at 58% 12%,#fff,#0000),
  radial-gradient(1.8px 1.8px at 73% 21%,#fde7f3,#0000),radial-gradient(1.2px 1.2px at 86% 9%,#fff,#0000),
  radial-gradient(1px 1px at 93% 31%,#e0f7ff,#0000),radial-gradient(1.4px 1.4px at 6% 39%,#fff,#0000),
  radial-gradient(1px 1px at 34% 44%,#fde7f3,#0000),radial-gradient(1.2px 1.2px at 66% 40%,#fff,#0000);
  animation:twinkle 2s ease-in-out infinite alternate}
@keyframes twinkle{from{opacity:.55}to{opacity:1}}
.horizon{position:absolute;left:0;right:0;bottom:29%;height:140px;
  background:radial-gradient(ellipse 60% 100% at 50% 100%,#ff2d9566,#0000 70%)}
.sun{aspect-ratio:1;width:540px;border-radius:9999px;position:absolute;bottom:30%;left:50%;
  background:linear-gradient(#ffe066 8%,#ff8a3d 45%,#ff2d95 80%);box-shadow:0 0 120px #ff2d9573,0 0 260px #ff8a3d33;
  transform:translate(-50%,54%);
  -webkit-mask-image:linear-gradient(#000 0 46%,#0000 46% 49%,#000 49% 55%,#0000 55% 59%,#000 59% 64%,#0000 64% 69%,#000 69% 73%,#0000 73% 79%,#000 79%);
  mask-image:linear-gradient(#000 0 46%,#0000 46% 49%,#000 49% 55%,#0000 55% 59%,#000 59% 64%,#0000 64% 69%,#000 69% 73%,#0000 73% 79%,#000 79%)}
.grid{position:absolute;bottom:0;left:-50%;right:-50%;height:30%;transform-origin:top;
  transform:perspective(220px) rotateX(48deg);background-color:#070d12;
  background-image:linear-gradient(#ff2d958c 1px,#0000 1px),linear-gradient(90deg,#ff2d9573 1px,#0000 1px);
  background-size:56px 40px;border-top:2px solid #ff2d95e6;box-shadow:0 -6px 30px #ff2d9580;
  animation:grid-scroll 1.2s linear infinite}
@keyframes grid-scroll{to{background-position:0 40px}}
.palm{position:absolute;bottom:28%;width:260px;aspect-ratio:520/900;filter:drop-shadow(0 0 6px #ff2d958c)}
.palm:before{content:"";position:absolute;inset:0;background:linear-gradient(#2a0d3d,#0a0414 60%);
  -webkit-mask:url("${a["palm-silhouette.svg"]}") bottom/contain no-repeat;
  mask:url("${a["palm-silhouette.svg"]}") bottom/contain no-repeat}
.palm-left{left:1%}
.palm-right{right:1%}
.palm-right:before{transform:scaleX(-1)}
.scanlines{position:absolute;inset:0;pointer-events:none;
  background:repeating-linear-gradient(#0000 0 3px,#04020b2e 3px 4px),radial-gradient(ellipse at 50% 50%,#0000 60%,#04020b99)}
.wordmark{font-family:"Orbitron",monospace;font-weight:900;letter-spacing:.05em;line-height:.9;color:#0000;
  background:linear-gradient(#e8fdff 5%,#22d3ee 45%,#ff2d95 95%);-webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 22px #ff2d9573) drop-shadow(0 0 2px #22d3ee99)}
.hud{font-family:"Inter",sans-serif;text-transform:uppercase;letter-spacing:.35em;font-size:22px;color:#f472b6}
.plate{background:#04020bf2;border:1px solid #ec489980;box-shadow:0 0 40px #ff2d9540,inset 0 0 24px #ff2d9514}
.sweep{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.sweep:after{content:"";position:absolute;top:0;bottom:0;width:30%;left:-40%;transform:skewX(-20deg);
  background:linear-gradient(90deg,#0000,#ffffff26,#0000)}
.fade-black{position:absolute;inset:0;background:#000;pointer-events:none}
@keyframes rise{from{opacity:0;transform:translateY(40px)}}
@keyframes slide-left{from{opacity:0;transform:translateX(-80px)}}
@keyframes sweep{from{left:-40%}to{left:120%}}`;
}

function scenery(): string {
  return `<div class="stars"></div><div class="horizon"></div><div class="sun"></div>
<div class="grid"></div><div class="palm palm-left"></div><div class="palm palm-right"></div>
<div class="scanlines"></div>`;
}

function page(a: BrandAssets, css: string, body: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(a)}
${css}</style></head><body>${body}
<script>
window.__seek = (seconds) => {
  for (const animation of document.getAnimations()) {
    animation.pause();
    animation.currentTime = seconds * 1000;
  }
  return true;
};
</script></body></html>`;
}

export interface IntroOptions {
  assets: BrandAssets;
  episode: string;
  title: string;
  subtitle: string;
  presenter: Presenter;
}

/**
 * The intro: the sun rises, the palms slide in, the wordmark flickers on
 * like neon, then the episode, title and the presenter's plate land. It
 * ends settled, for render's crossfade into the take.
 */
export function introHtml(o: IntroOptions): string {
  const p = o.presenter;
  const css = `
.sun{animation:sun-rise 2.2s ${EASE} both}
@keyframes sun-rise{from{transform:translate(-50%,110%)}to{transform:translate(-50%,54%)}}
.palm-left{animation:palm-left 1.6s .2s ${EASE} both}
.palm-right{animation:palm-right 1.6s .2s ${EASE} both}
@keyframes palm-left{from{transform:translateX(-120%)}}
@keyframes palm-right{from{transform:translateX(120%)}}
.top{position:absolute;top:76px;left:0;right:0;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 220px}
.top .wordmark{font-size:132px;animation:neon-on 1.2s .5s steps(1,end) both,settle 1s .5s ${EASE} both,glitch .5s 1.1s steps(2,end) both}
@keyframes neon-on{0%{opacity:0}10%{opacity:1}16%{opacity:.2}24%{opacity:1}30%{opacity:.4}38%,100%{opacity:1}}
@keyframes settle{from{transform:scale(1.12);letter-spacing:.25em}}
@keyframes glitch{0%{filter:drop-shadow(-6px 0 0 #22d3ee) drop-shadow(6px 0 0 #ff2d95)}
  50%{filter:drop-shadow(4px 0 0 #22d3ee) drop-shadow(-4px 0 0 #ff2d95)}
  100%{filter:drop-shadow(0 0 22px #ff2d9573) drop-shadow(0 0 2px #22d3ee99)}}
.episode{margin-top:34px;padding:8px 22px;border:1px solid #f472b680;background:#04020b99;animation:rise .6s 1.3s ${EASE} both}
.title{margin-top:22px;font-family:"Orbitron",monospace;font-weight:800;font-size:62px;line-height:1.08;
  text-transform:uppercase;letter-spacing:.06em;text-shadow:0 0 24px #22d3ee80,0 0 4px #000;max-width:1400px;text-wrap:balance;
  animation:rise .7s 1.5s ${EASE} both}
.subtitle{margin-top:14px;font-weight:500;font-size:32px;color:#67e8f9;text-shadow:0 0 12px #000;max-width:1300px;text-wrap:balance;
  animation:rise .7s 1.8s ${EASE} both}
.author{position:absolute;left:96px;bottom:84px;padding:26px 34px 26px 30px;border-left:6px solid #ec4899;
  animation:slide-left .7s 2.1s ${EASE} both}
.author .sweep:after{animation:sweep 1s 2.6s ease-in-out both}
.author .hud{font-size:16px;color:#22d3ee}
.author .name{margin-top:10px;font-family:"Orbitron",monospace;font-weight:900;font-size:46px;letter-spacing:.04em}
.author .role{margin-top:8px;font-family:"Inter",sans-serif;font-size:19px;letter-spacing:.2em;text-transform:uppercase;color:#d1d5db}
.author .handle{margin-top:6px;font-size:24px;color:#f472b6}
.fade-black{animation:fade-out .4s both}
@keyframes fade-out{from{opacity:1}to{opacity:0}}`;
  const body = `<div class="stage postcard">${scenery()}
<div class="top">
  <h1 class="wordmark">SWAMP CLUB</h1>
  ${o.episode ? `<p class="hud episode">${escapeHtml(o.episode)}</p>` : ""}
  ${line("h2", "title", o.title)}
  ${line("p", "subtitle", o.subtitle)}
</div>
<div class="author plate">
  <p class="hud">Presented by</p>
  ${line("p", "name", p.name)}
  ${line("p", "role", p.title)}
  ${line("p", "handle", p.handle)}
  <div class="sweep"></div>
</div>
<div class="fade-black"></div>
</div>`;
  return page(o.assets, css, body);
}

export interface OutroOptions {
  assets: BrandAssets;
  presenter: Presenter;
  /** The QR code SVG for the campaign URL, or "" when there is none. */
  qrSvg: string;
  seconds: number;
}

/**
 * The outro: thanks, the presenter's contact, and a QR code to their
 * campaign page under their call to action. Fades to black at the end.
 */
export function outroHtml(o: OutroOptions): string {
  const p = o.presenter;
  const fadeStart = Math.max(o.seconds - 0.9, 0);
  const qr = o.qrSvg && p.campaignUrl;
  const css = `
.top{position:absolute;top:70px;left:0;right:0;text-align:center}
.top .wordmark{font-size:72px;animation:rise .7s .1s ${EASE} both}
.panel{position:absolute;top:210px;left:120px;right:120px;display:grid;
  grid-template-columns:${
    qr ? "1fr 520px" : "minmax(0,1100px)"
  };justify-content:center;gap:80px;align-items:center}
.left{position:relative;padding:46px 52px;background:#04020b;border:1px solid #22d3ee59;border-left:6px solid #22d3ee;box-shadow:0 0 40px #22d3ee33;
  animation:slide-left .8s .3s ${EASE} both}
.left .sweep:after{animation:sweep 1.1s 1s ease-in-out both}
.headline{font-family:"Orbitron",monospace;font-weight:900;font-size:64px;line-height:1.05;text-transform:uppercase}
.headline .wordmark{display:inline}
.thanks{margin-top:18px;font-size:30px;color:#d1d5db}
.who{margin-top:36px;padding-top:30px;border-top:1px dashed #ec489980}
.who .name{font-family:"Orbitron",monospace;font-weight:900;font-size:44px;letter-spacing:.04em}
.who .role{margin-top:8px;font-family:"Inter",sans-serif;font-size:18px;letter-spacing:.2em;text-transform:uppercase;color:#d1d5db}
.contact{margin-top:22px;display:grid;grid-template-columns:auto 1fr;gap:10px 22px;font-size:28px}
.contact dt{font-family:"Inter",sans-serif;font-size:16px;letter-spacing:.3em;text-transform:uppercase;color:#22d3ee;align-self:center}
.contact dd{color:#fff}
.contact .handle{color:#f472b6}
.qr-card{position:relative;padding:34px 34px 28px;background:#04020bf0;border:2px solid #ec4899;box-shadow:0 0 60px #ff2d9573,inset 0 0 30px #ff2d951f;
  text-align:center;animation:qr-in .8s .8s cubic-bezier(.3,1.4,.5,1) both}
@keyframes qr-in{from{opacity:0;transform:scale(.7) rotate(-6deg)}}
.qr-card:before,.qr-card:after{content:"";position:absolute;width:40px;height:40px;border:0 solid #22d3ee;filter:drop-shadow(0 0 6px #22d3ee)}
.qr-card:before{left:-12px;top:-12px;border-width:4px 0 0 4px}
.qr-card:after{right:-12px;bottom:-12px;border-width:0 4px 4px 0}
.qr{position:relative;background:#fff;padding:18px;overflow:hidden}
.qr svg{display:block;width:100%;height:auto}
.scan{position:absolute;left:0;right:0;height:60px;top:-60px;background:linear-gradient(#22d3ee00,#22d3ee99,#22d3ee00);
  animation:scan 1.1s 1.5s ease-in-out both}
@keyframes scan{from{top:-60px}to{top:100%}}
.cta{margin-top:24px;font-family:"Orbitron",monospace;font-weight:800;font-size:23px;text-transform:uppercase;letter-spacing:.06em;color:#22d3ee;
  text-shadow:0 0 14px #22d3ee80}
.url{margin-top:10px;font-family:"Inter",sans-serif;font-size:18px;letter-spacing:.06em;color:#f472b6;overflow-wrap:anywhere}
.hud.scan-me{margin-bottom:18px;font-size:16px}
.fade-black{animation:fade-in .9s ${fadeStart}s both}
@keyframes fade-in{from{opacity:0}to{opacity:1}}`;
  const contact = [
    p.email ? `<dt>Email</dt><dd>${escapeHtml(p.email)}</dd>` : "",
    p.handle
      ? `<dt>Club</dt><dd class="handle">${escapeHtml(p.handle)}</dd>`
      : "",
    `<dt>Web</dt><dd>swamp-club.com</dd>`,
  ].join("");
  const qrCard = qr
    ? `<div class="qr-card">
    <p class="hud scan-me">[ Scan me ]</p>
    <div class="qr">${o.qrSvg}<div class="scan"></div></div>
    ${line("p", "cta", p.cta)}
    ${line("p", "url", p.campaignUrl.replace(/^https?:\/\//, ""))}
  </div>`
    : "";
  const body = `<div class="stage postcard">${scenery()}
<div class="top"><h1 class="wordmark">SWAMP CLUB</h1></div>
<div class="panel">
  <div class="left">
    <p class="headline">It's time to <span class="wordmark">build</span></p>
    <p class="thanks">Thanks for watching.</p>
    <div class="who">
      ${line("p", "name", p.name)}
      ${line("p", "role", p.title)}
      <dl class="contact">${contact}</dl>
      ${qr ? "" : line("p", "cta", p.cta)}
    </div>
    <div class="sweep"></div>
  </div>
  ${qrCard}
</div>
<div class="fade-black"></div>
</div>`;
  return page(o.assets, css, body);
}

export interface LowerThirdOptions {
  assets: BrandAssets;
  presenter: Presenter;
  layout: StageLayout;
  seconds: number;
}

/**
 * The presenter's lower third, tucked in beside the webcam ring: slides in,
 * catches a light sweep, and slides back out before `seconds`.
 */
export function lowerThirdHtml(o: LowerThirdOptions): string {
  const p = o.presenter;
  const outStart = Math.max(o.seconds - 0.7, 0);
  const { ring } = o.layout;
  const right = STAGE_WIDTH - ring.x - 10;
  const middle = STAGE_HEIGHT - (ring.y + ring.height / 2);
  const css = `
html,body{background:transparent}
.lt{position:absolute;right:${right}px;bottom:${middle}px;margin-bottom:-64px;display:flex;align-items:center;gap:26px;padding:22px 24px 22px 40px;
  border-right:6px solid #ec4899;
  animation:lt-in .6s ${EASE} both,lt-out .6s ${outStart}s cubic-bezier(.6,0,.8,.3) forwards}
@keyframes lt-in{from{opacity:0;transform:translateX(120px)}}
@keyframes lt-out{to{opacity:0;transform:translateX(120px)}}
.lt .sweep:after{animation:sweep .9s .5s ease-in-out both}
.mark{width:84px;height:84px;filter:drop-shadow(0 0 8px #22d3ee80)}
.name{font-size:40px}
.meta{margin-top:6px;font-family:"Inter",sans-serif;font-size:17px;letter-spacing:.2em;text-transform:uppercase;color:#d1d5db}
.meta .handle{color:#f472b6;letter-spacing:.06em;text-transform:none;font-family:"Chakra Petch",sans-serif;font-size:22px}
.meta .role+.handle{margin-left:12px}`;
  const meta = p.title || p.handle
    ? `<p class="meta">${line("span", "role", p.title)}${
      line("span", "handle", p.handle)
    }</p>`
    : "";
  const body = `<div class="lt plate">
  <img class="mark" src="${o.assets["sc-mark.svg"]}">
  <div>
    ${line("p", "name wordmark", p.name)}
    ${meta}
  </div>
  <div class="sweep"></div>
</div>`;
  return page(o.assets, css, body);
}

export interface FastForwardOptions {
  assets: BrandAssets;
  layout: StageLayout;
}

/**
 * The FAST FORWARD badge over the screen share's top-right corner: chevrons
 * chase and the pill pulses, in a one-second loop render repeats.
 */
export function fastForwardHtml(o: FastForwardOptions): string {
  const { screen } = o.layout;
  const loop = `${FAST_FORWARD_LOOP_SECONDS}s`;
  const css = `
html,body{background:transparent}
.ff{position:absolute;right:${
    STAGE_WIDTH - (screen.x + screen.width) + 24
  }px;top:${screen.y + 24}px;display:flex;align-items:center;gap:16px;
  padding:12px 24px 12px 18px;background:#04020be6;border:2px solid #ec4899;border-radius:9999px;
  box-shadow:0 0 30px #ff2d9599,inset 0 0 18px #ff2d9533;animation:pulse ${loop} ease-in-out infinite}
@keyframes pulse{0%,100%{box-shadow:0 0 22px #ff2d9580,inset 0 0 14px #ff2d9533}50%{box-shadow:0 0 40px #ff2d95cc,inset 0 0 22px #ff2d9555}}
.arrows{display:flex}
.arrows i{width:22px;height:26px;background:#22d3ee;clip-path:polygon(0 0,100% 50%,0 100%);filter:drop-shadow(0 0 6px #22d3ee);
  animation:chase ${loop} linear infinite}
.arrows i+i{margin-left:-4px}
.arrows i:nth-child(2){animation-delay:-${FAST_FORWARD_LOOP_SECONDS * 2 / 3}s}
.arrows i:nth-child(3){animation-delay:-${FAST_FORWARD_LOOP_SECONDS / 3}s}
@keyframes chase{0%,100%{opacity:.25}33%{opacity:1}}
.label{font-family:"Orbitron",monospace;font-weight:800;font-size:22px;letter-spacing:.12em;text-transform:uppercase;color:#fff;
  text-shadow:0 0 12px #ff2d95b3}`;
  const body =
    `<div class="ff"><span class="arrows"><i></i><i></i><i></i></span>
<span class="label">Fast forward</span></div>`;
  return page(o.assets, css, body);
}

export interface BackdropOptions {
  assets: BrandAssets;
  presenter: Presenter;
  layout: StageLayout;
}

/**
 * The static studio backdrop behind the centred screen share: the dimmed
 * postcard, a neon frame around the screen, the wordmark above it and the
 * presenter's handle below.
 */
export function backdropHtml(o: BackdropOptions): string {
  const { screen, ring } = o.layout;
  const css = `
.grid,.stars{animation:none}
.dim{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#04020b73,#04020bd9)}
.frame{position:absolute;left:${screen.x - 6}px;top:${screen.y - 6}px;width:${
    screen.width + 12
  }px;height:${screen.height + 12}px;
  background:#000;border:2px solid #ec4899cc;box-shadow:0 0 40px #ff2d9566,0 0 4px #22d3ee99}
.corner{position:absolute;width:44px;height:44px;border:0 solid #22d3ee;filter:drop-shadow(0 0 6px #22d3ee)}
.tl{left:-14px;top:-14px;border-width:4px 0 0 4px}.tr{right:-14px;top:-14px;border-width:4px 4px 0 0}
.bl{left:-14px;bottom:-14px;border-width:0 0 4px 4px}.br{right:-14px;bottom:-14px;border-width:0 4px 4px 0}
.top{position:absolute;top:0;left:0;right:0;height:${
    screen.y - 6
  }px;display:flex;align-items:center;justify-content:center;gap:28px}
.top .wordmark{font-size:${Math.min(56, Math.round((screen.y - 6) * 0.5))}px}
.bottom{position:absolute;left:${screen.x}px;right:${
    STAGE_WIDTH - ring.x + 24
  }px;top:${screen.y + screen.height + 6}px;bottom:0;
  display:flex;align-items:center;justify-content:flex-start;gap:22px;font-family:"Inter",sans-serif;font-size:18px;letter-spacing:.2em;text-transform:uppercase;color:#d1d5db}
.bottom .handle{font-family:"Chakra Petch",sans-serif;font-size:24px;letter-spacing:.06em;text-transform:none;color:#f472b6}
.bottom .sep{color:#ec4899}`;
  const handle = o.presenter.handle
    ? `${line("span", "handle", o.presenter.handle)}<span class="sep">//</span>`
    : "";
  const body = `<div class="stage postcard">${scenery()}
<div class="dim"></div>
<div class="top"><h1 class="wordmark">SWAMP CLUB</h1></div>
<div class="frame"><i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i></div>
<div class="bottom">${handle}<span>swamp-club.com</span></div>
</div>`;
  return page(o.assets, css, body);
}

export interface CameraRingOptions {
  assets: BrandAssets;
  layout: StageLayout;
}

/** The neon ring around the webcam: a seamless loop OBS plays behind it. */
export function cameraRingHtml(o: CameraRingOptions): string {
  const { camera, ring } = o.layout;
  const d = camera.width;
  const loop = `${CAMERA_RING_LOOP_SECONDS}s`;
  const annulus = (px: number) =>
    `radial-gradient(farthest-side,#0000 calc(100% - ${
      px + 1
    }px),#000 calc(100% - ${px}px))`;
  const circle = (size: number) =>
    `position:absolute;left:50%;top:50%;width:${size}px;height:${size}px;margin:-${
      size / 2
    }px 0 0 -${size / 2}px;border-radius:50%`;
  const css = `
html,body{background:transparent}
.ring{position:absolute;left:${ring.x}px;top:${ring.y}px;width:${ring.width}px;height:${ring.height}px}
.halo{${
    circle(d + 40)
  };box-shadow:0 0 50px 8px #ff2d9599,0 0 22px 2px #22d3ee80,inset 0 0 30px #ff2d9566;
  animation:pulse 3s ease-in-out infinite alternate}
@keyframes pulse{from{opacity:.55}to{opacity:1}}
.main{${
    circle(d + 26)
  };background:conic-gradient(#22d3ee,#a855f7,#ff2d95,#ff8a3d,#ffe066,#ff2d95,#a855f7,#22d3ee);
  -webkit-mask:${annulus(11)};mask:${
    annulus(11)
  };animation:spin ${loop} linear infinite}
.rim{${circle(d + 4)};border:3px solid #04020b}
.dash{${
    circle(d + 70)
  };background:repeating-conic-gradient(#22d3eecc 0 5deg,#0000 5deg 15deg);
  -webkit-mask:${annulus(3)};mask:${
    annulus(3)
  };animation:spin-back ${loop} linear infinite}
.sun-arc{${
    circle(d + 52)
  };background:conic-gradient(from 120deg,#0000 0 0deg,#ffe066 10deg,#ff8a3d 60deg,#ff2d95 110deg,#0000 120deg 360deg);
  -webkit-mask:${annulus(4)};mask:${
    annulus(4)
  };filter:drop-shadow(0 0 6px #ff2d95);animation:spin ${loop} linear infinite reverse}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spin-back{to{transform:rotate(-90deg)}}
.badge{position:absolute;left:${RING_PAD - 26}px;top:${
    RING_PAD - 26
  }px;width:72px;height:72px;border-radius:50%;
  background:#04020b;border:2px solid #ec4899;box-shadow:0 0 18px #ff2d95b3;display:flex;align-items:center;justify-content:center}
.badge img{width:50px;height:50px}`;
  const body = `<div class="ring">
  <div class="halo"></div><div class="dash"></div><div class="sun-arc"></div>
  <div class="main"></div><div class="rim"></div>
  <div class="badge"><img src="${o.assets["sc-mark.svg"]}"></div>
</div>`;
  return page(o.assets, css, body);
}
