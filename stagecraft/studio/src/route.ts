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

// The page's addresses: each view has a path of its own, so it can be
// reloaded, bookmarked or shared, and the browser's back and forward move
// between views. The server serves the page on exactly these paths
// (isPagePath in studio_server.ts).
//
//   /                       the remembered factory's design view
//   /f/<factory>/design     Design mode
//   /f/<factory>/simulate   Simulate mode
//   /f/<factory>/board      the Board: every work item by stage
//   /w/<key>                one work item (the work-item page, #2944)
//
// Pure: it maps a path to a route and back.

import { FACTORY_VIEWS } from "../../extensions/models/_lib/engine/studio_cards.ts";

export { FACTORY_VIEWS };

export type FactoryView = typeof FACTORY_VIEWS[number];

export type Route =
  /** A factory view; factory null at /, until the page picks one. */
  | { view: FactoryView; factory: string | null }
  | { view: "work-item"; key: string };

function decode(part: string): string | null {
  try {
    return decodeURIComponent(part);
  } catch {
    return null;
  }
}

/** The route a path names, or null for one the page does not know. */
export function parseRoute(pathname: string): Route | null {
  const raw = pathname.split("/").filter((s) => s !== "");
  const parts = raw.map(decode);
  if (parts.some((p) => p === null || p === "")) return null;
  const [head, name, view] = parts as string[];
  if (parts.length === 0) return { view: "design", factory: null };
  if (head === "f" && parts.length === 3) {
    return (FACTORY_VIEWS as readonly string[]).includes(view)
      ? { view: view as FactoryView, factory: name }
      : null;
  }
  if (head === "w" && parts.length === 2) {
    return { view: "work-item", key: name };
  }
  return null;
}

/** The path of a route; a factory view with no factory yet is /. */
export function routeHref(route: Route): string {
  if (route.view === "work-item") {
    return `/w/${encodeURIComponent(route.key)}`;
  }
  if (route.factory === null) return "/";
  return `/f/${encodeURIComponent(route.factory)}/${route.view}`;
}

/** Whether two routes are the same address. */
export function sameRoute(a: Route, b: Route): boolean {
  return routeHref(a) === routeHref(b);
}

/** What the nav and the browser tab call each factory view. */
export const VIEW_NAMES: Record<FactoryView, string> = {
  design: "Design",
  simulate: "Simulate",
  board: "Board",
};

/**
 * How the nav marks a view's link on a route: "page" when the link is the
 * page shown, "true" when the page is under it (a work item is under the
 * Board), and nothing otherwise.
 */
export function navCurrent(
  route: Route,
  view: FactoryView,
): "page" | "true" | undefined {
  if (route.view === "work-item") return view === "board" ? "true" : undefined;
  return route.view === view ? "page" : undefined;
}

/**
 * A view link's address, for the factory shown: null until a factory is
 * picked, except Design, which / shows.
 */
export function navHref(
  view: FactoryView,
  factory: string | null,
): string | null {
  if (factory === null) return view === "design" ? "/" : null;
  return routeHref({ view, factory });
}

/** The browser tab's title for a route: where you are, most specific first. */
export function titleFor(route: Route, factory: string | null): string {
  const app = "Stagecraft Studio";
  if (route.view === "work-item") {
    return [route.key, "Board", factory, app].filter((p) => p !== null)
      .join(" · ");
  }
  const name = route.factory ?? factory;
  return [VIEW_NAMES[route.view], name, app].filter((p) => p !== null)
    .join(" · ");
}
