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

import { assert, assertEquals } from "@std/assert";
import { FACTORY_VIEWS as SERVED } from "../../extensions/models/_lib/engine/studio_cards.ts";
import { isPagePath } from "../../extensions/models/_lib/engine/studio_server.ts";
import { parseRoute, type Route, routeHref } from "./route.ts";

Deno.test("route: each view's path parses to its route and back", () => {
  const routes: [string, Route][] = [
    ["/f/team/design", { view: "design", factory: "team" }],
    ["/f/team/simulate", { view: "simulate", factory: "team" }],
    ["/f/team/board", { view: "board", factory: "team" }],
    ["/w/team-add-board-k3xq", {
      view: "work-item",
      key: "team-add-board-k3xq",
    }],
  ];
  for (const [path, route] of routes) {
    assertEquals(parseRoute(path), route, path);
    assertEquals(routeHref(route), path);
  }
});

Deno.test("route: / is the design view with no factory picked yet", () => {
  assertEquals(parseRoute("/"), { view: "design", factory: null });
  assertEquals(routeHref({ view: "board", factory: null }), "/");
});

Deno.test("route: a name is encoded in the path and decoded from it", () => {
  const route: Route = { view: "board", factory: "a b/c" };
  assertEquals(routeHref(route), "/f/a%20b%2Fc/board");
  assertEquals(parseRoute(routeHref(route)), route);
});

Deno.test("route: the server serves the page on exactly the paths the page routes", () => {
  for (const view of SERVED) {
    const path = routeHref({ view, factory: "team" });
    assert(parseRoute(path) !== null, path);
    assert(isPagePath(path.split("/").filter((s) => s !== "")), path);
  }
  for (const path of ["/f/team/nope", "/w/a/b", "/f/team"]) {
    assertEquals(parseRoute(path), null, path);
    assert(!isPagePath(path.split("/").filter((s) => s !== "")), path);
  }
});

Deno.test("route: a path the page does not know is null", () => {
  for (
    const path of [
      "/f",
      "/f/team",
      "/f/team/nope",
      "/f/team/board/more",
      "/w",
      "/w/a/b",
      "/assets/app.js",
      "/f/%E0%A4%A/board",
    ]
  ) {
    assertEquals(parseRoute(path), null, path);
  }
});
