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

import { isAbsolute, join, relative, SEPARATOR } from "jsr:@std/path@1.1.4";
import {
  type RepoFiles,
  resolveDefinitionPath,
  SCENARIO_DIR,
} from "./definition_file.ts";
import { NameSchema } from "./definition_schema.ts";
import {
  FACTORY_TYPE,
  factoryPathArgument,
  typeNameOf,
} from "./work_item_ops.ts";

// ---------------------------------------------------------------------------
// The studio's HTTP handler (DESIGN.md, "The studio server"). The studio
// only views; it never writes. Every route is GET, and every path
// is resolved here from a factory's model definition: a request names a
// factory and a scenario, never a path.
//
// A request is refused before routing when:
// - its Host is not 127.0.0.1:<port> or localhost:<port> (DNS rebinding);
// - it carries an Origin other than the server's own;
// - it carries a Sec-Fetch-Site other than same-origin or none, which is
//   how a hostile page's no-cors load (script, img, link) shows itself,
//   unless it is a person opening the page itself from a link;
// - its method is not GET.
// No response carries a CORS header. Every response carries a strict CSP
// and Cross-Origin-Resource-Policy: same-origin.
//
// The handler takes everything it touches as dependencies (the files, the
// definitions, the page and the change events), so
// the unit tests drive it with Requests and an in-memory repo.
// ---------------------------------------------------------------------------

export const STUDIO_TYPE = "@swamp/gatorwalk-factory/studio";

/** The part of swamp's definition repository the studio uses. */
export interface FactoryLister {
  findAllGlobal(): Promise<{ definition: unknown; type: unknown }[]>;
}

/** A factory in the repo, with the definition path it names. */
export interface FactoryEntry {
  name: string;
  /** Repo-relative, as the factory names it; null when it names none. */
  path: string | null;
  error?: string;
}

/** One file of the page: text, or base64 for binary files. */
export interface StudioAsset {
  type: string;
  text?: string;
  base64?: string;
}

/** A file an agent changed, as the page hears of it. */
export type StudioEvent =
  | { kind: "factories" }
  | { kind: "definition"; factory: string }
  | { kind: "scenarios"; factory: string; name?: string };

export interface StudioEvents {
  /** Returns the unsubscribe function. */
  subscribe(listener: (event: StudioEvent) => void): () => void;
}

export interface StudioDeps {
  /** The repo's absolute path. */
  repoDir: string;
  /** The port the server listens on, for the Host and Origin checks. */
  port: number;
  files: RepoFiles;
  factories: FactoryLister;
  /** The page's files by served name; "index.html" is served at /. */
  assets: Readonly<Record<string, StudioAsset>>;
  events: StudioEvents;
  /** Told each time the factory list is read, so the watch can follow it. */
  onFactories?(factories: FactoryEntry[]): void;
  /** Aborts on shutdown; open event streams close with it. */
  signal?: AbortSignal;
  /** Seconds between keepalive comments on an event stream. */
  keepaliveSeconds?: number;
}

const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  "content-security-policy":
    "default-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "cross-origin-resource-policy": "same-origin",
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
  "cache-control": "no-store",
};

function respond(
  body: BodyInit | null,
  status: number,
  headers: Record<string, string> = {},
): Response {
  return new Response(body, {
    status,
    headers: { ...SECURITY_HEADERS, ...headers },
  });
}

function json(value: unknown, status = 200): Response {
  return respond(JSON.stringify(value), status, {
    "content-type": "application/json; charset=utf-8",
  });
}

function error(status: number, message: string): Response {
  return json({ error: message }, status);
}

/**
 * Opening the page from a link in another site or app: a top-level GET of /
 * that the browser shows the person. The linking page cannot read it, and
 * frame-ancestors 'none' keeps it out of frames, so it is let through;
 * nothing else from another site is.
 */
function pageNavigation(req: Request): boolean {
  return req.method === "GET" && new URL(req.url).pathname === "/" &&
    req.headers.get("sec-fetch-mode") === "navigate" &&
    req.headers.get("sec-fetch-dest") === "document";
}

/** Why a request is refused before routing, or null. */
function refusal(req: Request, port: number): Response | null {
  const host = req.headers.get("host");
  const hosts = [`127.0.0.1:${port}`, `localhost:${port}`];
  // A browser leaves the default port out of Host and Origin.
  if (port === 80) hosts.push("127.0.0.1", "localhost");
  if (host === null || !hosts.includes(host)) {
    return error(403, "the Host header must name this studio server");
  }
  const origin = req.headers.get("origin");
  if (origin !== null && origin !== `http://${host}`) {
    return error(403, "requests from another origin are refused");
  }
  const site = req.headers.get("sec-fetch-site");
  if (
    site !== null && site !== "same-origin" && site !== "none" &&
    !pageNavigation(req)
  ) {
    return error(403, "requests from another site are refused");
  }
  if (req.method !== "GET") {
    const res = error(405, "the studio only reads; every route is GET");
    res.headers.set("allow", "GET");
    return res;
  }
  return null;
}

/** Every factory in the repo, by name. */
export async function listFactories(
  lister: FactoryLister,
): Promise<FactoryEntry[]> {
  const entries: FactoryEntry[] = [];
  for (const found of await lister.findAllGlobal()) {
    if (typeNameOf(found.type) !== FACTORY_TYPE) continue;
    const name = (found.definition as { name?: unknown }).name;
    if (typeof name !== "string" || name === "") continue;
    const path = factoryPathArgument(found.definition);
    entries.push(
      path === undefined
        ? {
          name,
          path: null,
          error: `factory '${name}' does not name its definition file`,
        }
        : { name, path },
    );
  }
  return entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
}

/** Whether `path` is `root` or under it. */
export function inside(root: string, path: string): boolean {
  const rel = relative(root, path);
  return rel !== ".." && !rel.startsWith(`..${SEPARATOR}`) && !isAbsolute(rel);
}

async function sha256(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return `sha256:${
    Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0"))
      .join("")
  }`;
}

const message = (e: unknown) => e instanceof Error ? e.message : String(e);

/**
 * The real path of a factory's scenario directory, or null when it does not
 * exist. Throws when the factory's name cannot name a directory, or the
 * directory resolves outside the repo.
 */
export async function scenarioDir(
  deps: Pick<StudioDeps, "repoDir" | "files">,
  factory: string,
): Promise<string | null> {
  const named = NameSchema.safeParse(factory);
  if (!named.success) {
    throw new Error(
      `factory '${factory}' cannot name a scenario directory: its name ${
        named.error.issues[0]?.message
      }`,
    );
  }
  const dir = join(deps.repoDir, SCENARIO_DIR, factory);
  let real: string;
  try {
    real = await deps.files.realPath(dir);
  } catch {
    return null;
  }
  if (!inside(await deps.files.realPath(deps.repoDir), real)) {
    throw new Error(`${SCENARIO_DIR}/${factory} resolves outside the repo`);
  }
  if ((await deps.files.lstat(real))?.isDirectory !== true) return null;
  return real;
}

const SCENARIO_FILE = /^(.+)\.ya?ml$/;

async function scenarioList(deps: StudioDeps, factory: string) {
  const dir = await scenarioDir(deps, factory);
  const names = dir === null ? [] : await deps.files.readDir(dir);
  const scenarios = names
    .map((file) => ({ file, name: SCENARIO_FILE.exec(file)?.[1] }))
    .filter((s): s is { file: string; name: string } =>
      s.name !== undefined && NameSchema.safeParse(s.name).success
    )
    .map((s) => ({
      name: s.name,
      path: `${SCENARIO_DIR}/${factory}/${s.file}`,
    }))
    .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  return { factory, dir: `${SCENARIO_DIR}/${factory}`, scenarios };
}

async function scenarioFile(deps: StudioDeps, factory: string, name: string) {
  if (!NameSchema.safeParse(name).success) {
    return error(400, `'${name}' is not a scenario name`);
  }
  const dir = await scenarioDir(deps, factory);
  if (dir === null) return error(404, `factory '${factory}' has no scenarios`);
  for (const file of [`${name}.yaml`, `${name}.yml`]) {
    let real: string;
    try {
      real = await deps.files.realPath(join(dir, file));
    } catch {
      continue;
    }
    if (!inside(dir, real)) {
      return error(
        403,
        `scenario '${name}' resolves outside ${SCENARIO_DIR}/${factory}`,
      );
    }
    if ((await deps.files.lstat(real))?.isFile !== true) {
      return error(403, `scenario '${name}' is not a file`);
    }
    const text = await deps.files.readTextFile(real);
    return json({
      factory,
      name,
      path: `${SCENARIO_DIR}/${factory}/${file}`,
      text,
      digest: await sha256(text),
    });
  }
  return error(404, `factory '${factory}' has no scenario '${name}'`);
}

async function definitionFile(deps: StudioDeps, entry: FactoryEntry) {
  if (entry.path === null) return error(422, entry.error ?? "no definition");
  let real: string;
  try {
    real = await resolveDefinitionPath(deps.repoDir, entry.path, deps.files);
  } catch (e) {
    return error(422, message(e));
  }
  const text = await deps.files.readTextFile(real);
  return json({
    factory: entry.name,
    path: entry.path,
    text,
    digest: await sha256(text),
  });
}

function asset(deps: StudioDeps, name: string): Response {
  const found = Object.hasOwn(deps.assets, name) ? deps.assets[name] : null;
  if (found === null) return error(404, `no such page file: ${name}`);
  const body = found.base64 !== undefined
    ? Uint8Array.from(atob(found.base64), (c) => c.charCodeAt(0))
    : found.text ?? "";
  return respond(body, 200, { "content-type": found.type });
}

function eventStream(deps: StudioDeps): Response {
  const encoder = new TextEncoder();
  let cleanup = () => {};
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      let open = true;
      const send = (text: string) => {
        if (open) controller.enqueue(encoder.encode(text));
      };
      const unsubscribe = deps.events.subscribe((event) =>
        send(`data: ${JSON.stringify(event)}\n\n`)
      );
      const keepalive = setInterval(
        () => send(": keepalive\n\n"),
        (deps.keepaliveSeconds ?? 15) * 1000,
      );
      const close = () => {
        if (!open) return;
        cleanup();
        controller.close();
      };
      cleanup = () => {
        open = false;
        unsubscribe();
        clearInterval(keepalive);
        deps.signal?.removeEventListener("abort", close);
      };
      deps.signal?.addEventListener("abort", close);
      send(": connected\n\n");
      // Opened as the server began to stop.
      if (deps.signal?.aborted) close();
    },
    // The client went away.
    cancel() {
      cleanup();
    },
  });
  return respond(body, 200, {
    "content-type": "text/event-stream; charset=utf-8",
  });
}

function segments(pathname: string): string[] | null {
  try {
    return pathname.split("/").filter((s) => s !== "").map(decodeURIComponent);
  } catch {
    return null;
  }
}

/** Answers one request to the studio server. */
export async function handleStudioRequest(
  req: Request,
  deps: StudioDeps,
): Promise<Response> {
  const refused = refusal(req, deps.port);
  if (refused !== null) return refused;
  const url = new URL(req.url);
  const parts = segments(url.pathname);
  if (parts === null) return error(400, "the path is not valid");

  if (parts.length === 0) return asset(deps, "index.html");
  if (parts[0] === "assets" && parts.length >= 2) {
    return asset(deps, parts.slice(1).join("/"));
  }
  if (parts[0] !== "api") return error(404, "not found");
  if (parts.length === 2 && parts[1] === "events") {
    return eventStream(deps);
  }
  if (parts[1] !== "factories") return error(404, "not found");

  try {
    const factories = await listFactories(deps.factories);
    if (parts.length === 2) {
      deps.onFactories?.(factories);
      return json({ factories });
    }
    const entry = factories.find((f) => f.name === parts[2]);
    if (entry === undefined) {
      return error(404, `no factory named '${parts[2]}'`);
    }
    if (parts.length === 3) return await definitionFile(deps, entry);
    if (parts[3] !== "scenarios" || parts.length > 5) {
      return error(404, "not found");
    }
    if (parts.length === 4) return json(await scenarioList(deps, entry.name));
    return await scenarioFile(deps, entry.name, parts[4]);
  } catch (e) {
    return error(422, message(e));
  }
}
