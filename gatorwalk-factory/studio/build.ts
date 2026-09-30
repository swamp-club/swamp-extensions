// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { extname, fromFileUrl, relative } from "@std/path";

// ---------------------------------------------------------------------------
// Builds the studio page (deno task build:studio). It bundles src/app.ts for
// the browser into dist/ (a scratch directory git ignores), adds the page's
// HTML, CSS and fonts, and writes every served file into the generated
// module extensions/models/_lib/engine/studio_assets.ts, which the serve
// method serves from. The page is embedded because a model added as an
// extension source runs from swamp's bundle directory, where no dist/ is
// beside it (DESIGN.md, "The studio server").
//
// The module also records a digest of this build's inputs. studio_assets_test
// recomputes it, so a stale page fails the unit tests without rebuilding,
// which would depend on the Deno version that bundles.
// ---------------------------------------------------------------------------

const STUDIO = new URL("./", import.meta.url);
const SRC = new URL("src/", STUDIO);
const FONTS = new URL("fonts/", STUDIO);
const DIST = new URL("dist/", STUDIO);
export const ASSETS_MODULE = new URL(
  "../extensions/models/_lib/engine/studio_assets.ts",
  STUDIO,
);

async function filesUnder(dir: URL): Promise<URL[]> {
  const found: URL[] = [];
  for await (const entry of Deno.readDir(dir)) {
    const url = new URL(entry.isDirectory ? `${entry.name}/` : entry.name, dir);
    if (entry.isDirectory) found.push(...await filesUnder(url));
    else if (entry.isFile) found.push(url);
  }
  return found;
}

/** The build's inputs, by path relative to studio/, in a fixed order. */
export async function studioInputs(): Promise<string[]> {
  const files = [
    ...await filesUnder(SRC),
    ...await filesUnder(FONTS),
    new URL("build.ts", STUDIO),
  ];
  return files
    .map((url) => relative(fromFileUrl(STUDIO), fromFileUrl(url)))
    .map((path) => path.replaceAll("\\", "/"))
    .sort();
}

/** sha256 over every input's path and bytes. */
export async function studioSourceDigest(): Promise<string> {
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  for (const path of await studioInputs()) {
    let bytes = await Deno.readFile(new URL(path, STUDIO));
    // Text as git stores it, so a checkout that writes CRLF (Windows,
    // core.autocrlf) gives the same digest.
    if (!path.endsWith(".woff2")) {
      bytes = encoder.encode(
        new TextDecoder().decode(bytes).replaceAll("\r\n", "\n"),
      );
    }
    parts.push(encoder.encode(`${path}\0${bytes.length}\0`), bytes);
  }
  const all = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let at = 0;
  for (const p of parts) {
    all.set(p, at);
    at += p.length;
  }
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", all));
  return `sha256:${
    Array.from(hash, (b) => b.toString(16).padStart(2, "0")).join("")
  }`;
}

function base64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".woff2": "font/woff2",
};

async function deno(args: string[]): Promise<string> {
  const out = await new Deno.Command("deno", {
    args,
    cwd: fromFileUrl(new URL("../", STUDIO)),
    stdout: "piped",
    stderr: "piped",
  }).output();
  if (!out.success) {
    throw new Error(
      `deno ${args[0]} failed:\n${new TextDecoder().decode(out.stderr)}`,
    );
  }
  return new TextDecoder().decode(out.stdout);
}

/**
 * The digest covers studio/ only, so the page may import nothing outside
 * studio/src. When Design mode imports the engine, widen studioInputs first.
 */
async function checkModuleGraph(entry: URL) {
  const info = JSON.parse(
    await deno(["info", "--json", fromFileUrl(entry)]),
  ) as { modules: { specifier: string }[] };
  const outside = info.modules.map((m) => m.specifier)
    .filter((s) => !s.startsWith(SRC.href));
  if (outside.length > 0) {
    throw new Error(
      `src/app.ts imports modules outside studio/src, which the input ` +
        `digest does not cover; widen studioInputs in build.ts:\n  ` +
        outside.join("\n  "),
    );
  }
}

async function build() {
  const entry = new URL("app.ts", SRC);
  await checkModuleGraph(entry);
  await Deno.remove(DIST, { recursive: true }).catch(() => {});
  await Deno.mkdir(new URL("fonts/", DIST), { recursive: true });
  await deno([
    "bundle",
    "--platform",
    "browser",
    "--minify",
    "-o",
    fromFileUrl(new URL("app.js", DIST)),
    fromFileUrl(entry),
  ]);
  await Deno.copyFile(new URL("index.html", SRC), new URL("index.html", DIST));
  await Deno.copyFile(new URL("studio.css", SRC), new URL("studio.css", DIST));
  for (const font of await filesUnder(FONTS)) {
    const name = font.pathname.split("/").pop()!;
    if (name.endsWith(".woff2")) {
      await Deno.copyFile(font, new URL(`fonts/${name}`, DIST));
    }
  }

  const served = (await filesUnder(DIST))
    .map((url) => relative(fromFileUrl(DIST), fromFileUrl(url)))
    .map((path) => path.replaceAll("\\", "/"))
    .sort();
  const lines: string[] = [];
  for (const path of served) {
    const type = TYPES[extname(path)];
    if (type === undefined) throw new Error(`no content type for ${path}`);
    const bytes = await Deno.readFile(new URL(path, DIST));
    const body = type.startsWith("font/")
      ? `base64: ${JSON.stringify(base64(bytes))}`
      : `text: ${JSON.stringify(new TextDecoder().decode(bytes))}`;
    lines.push(
      `  ${JSON.stringify(path)}: { type: ${JSON.stringify(type)}, ${body} },`,
    );
  }
  const module =
    `// Generated by studio/build.ts from studio/src and studio/fonts. Do not
// edit: change the page's source, then run deno task build:studio.

import type { StudioAsset } from "./studio_server.ts";

/** A digest of the build's inputs; studio_assets_test checks it is current. */
export const STUDIO_SOURCE_DIGEST = ${
      JSON.stringify(await studioSourceDigest())
    };

/** The studio page's files by served name. */
export const STUDIO_ASSETS: Readonly<Record<string, StudioAsset>> = {
${lines.join("\n")}
};
`;
  await Deno.writeTextFile(ASSETS_MODULE, module);
  console.log(
    `${relative(fromFileUrl(STUDIO), fromFileUrl(ASSETS_MODULE))}: ` +
      `${served.length} files, ${(module.length / 1024).toFixed(0)} KB`,
  );
}

if (import.meta.main) await build();
