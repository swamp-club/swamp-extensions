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
// Builds the studio page (deno task build:studio). It bundles src/app.tsx for
// the browser into dist/ (a scratch directory git ignores), adds the page's
// HTML, CSS and fonts, and writes every served file into generated modules
// beside the engine, which the serve method serves from: the script in
// studio_asset_app.ts, the fonts in studio_asset_fonts.ts, and the rest, with
// the map of them all, in studio_assets.ts. One module each keeps every file
// well under the registry's size limit. The page is embedded because a model
// added as an extension source runs from swamp's bundle directory, where no
// dist/ is beside it (DESIGN.md, "The studio server").
//
// The page runs the engine itself (Design mode checks and analyses the
// factory definition in the browser), so the build's inputs are studio/src,
// the fonts, this file, the engine modules the page imports (ENGINE_INPUTS),
// and deno.json and deno.lock, which pin the packages the bundle contains.
// studio_assets.ts records a digest of them all; studio_assets_test
// recomputes it, so a stale page fails the unit tests without rebuilding,
// which would depend on the Deno version that bundles.
// ---------------------------------------------------------------------------

const STUDIO = new URL("./", import.meta.url);
const SRC = new URL("src/", STUDIO);
const FONTS = new URL("fonts/", STUDIO);
const DIST = new URL("dist/", STUDIO);
const ENGINE = new URL("../extensions/models/_lib/engine/", STUDIO);
export const ASSETS_MODULE = new URL("studio_assets.ts", ENGINE);
const APP_MODULE = new URL("studio_asset_app.ts", ENGINE);
const FONTS_MODULE = new URL("studio_asset_fonts.ts", ENGINE);
/** Every generated module, for the size check. */
export const ASSET_MODULES = [ASSETS_MODULE, APP_MODULE, FONTS_MODULE];

/**
 * The engine modules the page's bundle contains, by name in
 * extensions/models/_lib/engine/. The build refuses a bundle whose graph
 * differs, and studio_assets_test compares this list with a walk of the
 * import lines, so an engine import added without a rebuild fails the tests.
 */
export const ENGINE_INPUTS = [
  "awaiting.ts",
  "canonical.ts",
  "cel_context.ts",
  "cel_refs.ts",
  "definition_schema.ts",
  "definition_upgrade.ts",
  "design_view.ts",
  "dispatch.ts",
  "entry_summary.ts",
  "gates.ts",
  "graph.ts",
  "journal.ts",
  "metrics.ts",
  "payload_schema.ts",
  "run_ops.ts",
  "run_record.ts",
  "run_store.ts",
  "scenario.ts",
  "studio_cards.ts",
  "studio_item_types.ts",
  "template.ts",
  "tracker_binding.ts",
];

/** The page's tests and their helpers, which are never bundled. */
const isTestFile = (path: string) => /(_test|test_support)\.ts$/.test(path);

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
    ...(await filesUnder(SRC)).filter((url) => !isTestFile(url.pathname)),
    ...await filesUnder(FONTS),
    new URL("build.ts", STUDIO),
    ...ENGINE_INPUTS.map((name) => new URL(name, ENGINE)),
    new URL("../deno.json", STUDIO),
    new URL("../deno.lock", STUDIO),
  ];
  return files
    .map((url) => relative(fromFileUrl(STUDIO), fromFileUrl(url)))
    .map((path) => path.replaceAll("\\", "/"))
    .sort();
}

// An import or export-from statement: one that starts a line, so a comment
// or a string that mentions the words never matches.
const IMPORT =
  /^\s*(?:import\s*["']([^"']+)["']|(?:import|export)\b[^"'`;]*?\bfrom\s*["']([^"']+)["'])/gm;

/** The specifiers a module's static import and export-from statements name. */
export function importSpecifiers(text: string): string[] {
  return [...text.matchAll(IMPORT)].map((m) => m[1] ?? m[2]);
}

/**
 * The engine modules the page's source reaches, by name, found by reading
 * static import and export-from lines (a dynamic import() is not seen here;
 * the build's checkModuleGraph, which runs deno info, still catches one): relative imports from studio/src (tests
 * aside) into the engine, and on through the engine's own relative imports.
 * It reads files only, so the unit tests can run it.
 */
export async function engineImports(): Promise<string[]> {
  const found = new Set<string>();
  const queue: URL[] = (await filesUnder(SRC))
    .filter((url) => /\.tsx?$/.test(url.pathname) && !isTestFile(url.pathname));
  const visited = new Set<string>();
  while (queue.length > 0) {
    const file = queue.pop()!;
    if (visited.has(file.href)) continue;
    visited.add(file.href);
    const text = await Deno.readTextFile(file);
    for (const spec of importSpecifiers(text)) {
      if (!spec.startsWith(".") || !/\.tsx?$/.test(spec)) continue;
      const url = new URL(spec, file);
      if (url.href.startsWith(ENGINE.href)) {
        found.add(url.href.slice(ENGINE.href.length));
      }
      queue.push(url);
    }
  }
  return [...found].sort();
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

/** A remote module the bundle may contain: an exact npm or JSR version. */
const PINNED = [
  /^npm:\/(@[a-z0-9-]+\/)?[a-z0-9.-]+@\d+\.\d+\.\d+(\/|$)/,
  /^https:\/\/jsr\.io\/@std\/[a-z-]+\/\d+\.\d+\.\d+\//,
];

/**
 * The bundle's graph must be what the digest covers: local modules under
 * studio/src or in ENGINE_INPUTS, exactly, and remote ones pinned.
 */
async function checkModuleGraph(entry: URL) {
  const info = JSON.parse(
    await deno(["info", "--json", fromFileUrl(entry)]),
  ) as { modules: { specifier: string }[] };
  const problems: string[] = [];
  const engine = new Set<string>();
  for (const { specifier } of info.modules) {
    if (specifier.startsWith(SRC.href)) continue;
    if (specifier.startsWith(ENGINE.href)) {
      engine.add(specifier.slice(ENGINE.href.length));
      continue;
    }
    if (PINNED.some((p) => p.test(specifier))) continue;
    problems.push(`not under studio/src, the engine, or pinned: ${specifier}`);
  }
  const listed = new Set(ENGINE_INPUTS);
  for (const name of engine) {
    if (!listed.has(name)) problems.push(`missing from ENGINE_INPUTS: ${name}`);
  }
  for (const name of listed) {
    if (!engine.has(name)) {
      problems.push(`not imported, drop from ENGINE_INPUTS: ${name}`);
    }
  }
  if (problems.length > 0) {
    throw new Error(
      `the page's module graph differs from the digest's inputs; fix ` +
        `ENGINE_INPUTS in build.ts:\n  ${problems.join("\n  ")}`,
    );
  }
}

/** Write a generated module with the given assets under one export. */
async function writeModule(
  url: URL,
  header: string,
  body: string,
): Promise<number> {
  const text =
    `// Generated by studio/build.ts from studio/src, studio/fonts and the
// engine. Do not edit: change the page's source, then run
// deno task build:studio.

${header}${body}`;
  await Deno.writeTextFile(url, text);
  return text.length;
}

async function build() {
  const entry = new URL("app.tsx", SRC);
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
  const entryOf = async (path: string) => {
    const type = TYPES[extname(path)];
    if (type === undefined) throw new Error(`no content type for ${path}`);
    const bytes = await Deno.readFile(new URL(path, DIST));
    const body = type.startsWith("font/")
      ? `base64: ${JSON.stringify(base64(bytes))}`
      : `text: ${JSON.stringify(new TextDecoder().decode(bytes))}`;
    return `{ type: ${JSON.stringify(type)}, ${body} }`;
  };
  const importType =
    `import type { StudioAsset } from "./studio_server.ts";\n\n`;

  const appSize = await writeModule(
    APP_MODULE,
    importType,
    `/** The page's script. */\nexport const STUDIO_APP_JS: StudioAsset = ${await entryOf(
      "app.js",
    )};\n`,
  );
  const fonts: string[] = [];
  const rest: string[] = [];
  for (const path of served) {
    if (path === "app.js") continue;
    const line = `  ${JSON.stringify(path)}: ${await entryOf(path)},`;
    (path.startsWith("fonts/") ? fonts : rest).push(line);
  }
  const fontSize = await writeModule(
    FONTS_MODULE,
    importType,
    `/** The page's fonts by served name. */
export const STUDIO_FONTS: Readonly<Record<string, StudioAsset>> = {
${fonts.join("\n")}
};
`,
  );
  const mainSize = await writeModule(
    ASSETS_MODULE,
    `import type { StudioAsset } from "./studio_server.ts";
import { STUDIO_APP_JS } from "./studio_asset_app.ts";
import { STUDIO_FONTS } from "./studio_asset_fonts.ts";

`,
    `/** A digest of the build's inputs; studio_assets_test checks it is current. */
export const STUDIO_SOURCE_DIGEST = ${
      JSON.stringify(await studioSourceDigest())
    };

/** The studio page's files by served name. */
export const STUDIO_ASSETS: Readonly<Record<string, StudioAsset>> = {
${rest.join("\n")}
  "app.js": STUDIO_APP_JS,
  ...STUDIO_FONTS,
};
`,
  );
  const kb = (n: number) => `${(n / 1024).toFixed(0)} KB`;
  console.log(
    `${served.length} files: studio_assets.ts ${kb(mainSize)}, ` +
      `studio_asset_app.ts ${kb(appSize)}, studio_asset_fonts.ts ${
        kb(fontSize)
      }`,
  );
}

if (import.meta.main) await build();
