// Copyright (C) 2026 System Initiative, Inc.
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

import { assert, assertEquals } from "@std/assert";
import { FACTORY_VIEWS as SERVED } from "../../extensions/models/_lib/engine/studio_cards.ts";
import { isPagePath } from "../../extensions/models/_lib/engine/studio_server.ts";
import {
  FACTORY_VIEWS,
  navCurrent,
  navHref,
  parseRoute,
  readBasePath,
  type Route,
  routeHref,
  served,
  setBasePath,
  titleFor,
} from "./route.ts";

Deno.test("route: each view's path parses to its route and back", () => {
  const routes: [string, Route][] = [
    ["/f/team/design", { view: "design", factory: "team" }],
    ["/f/team/simulate", { view: "simulate", factory: "team" }],
    ["/f/team/board", { view: "board", factory: "team" }],
    ["/w/team-add-board-k3xq", {
      view: "work-item",
      key: "team-add-board-k3xq",
    }],
    ["/f/team/ticket/ts-1", { view: "ticket", factory: "team", id: "ts-1" }],
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
  const ticket = routeHref({ view: "ticket", factory: "team", id: "ts-1" });
  assert(isPagePath(ticket.split("/").filter((s) => s !== "")), ticket);
  for (const path of ["/f/team/nope", "/w/a/b", "/f/team", "/f/team/board/x"]) {
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

Deno.test("route: every route marks its place in the nav, and a work item or a ticket is under Board", () => {
  const marks = (route: Route) =>
    FACTORY_VIEWS.map((v) => [v, navCurrent(route, v) ?? null]);
  for (const view of FACTORY_VIEWS) {
    assertEquals(
      marks({ view, factory: "team" }),
      FACTORY_VIEWS.map((v) => [v, v === view ? "page" : null]),
    );
  }
  assertEquals(marks({ view: "design", factory: null }), [
    ["design", "page"],
    ["simulate", null],
    ["board", null],
  ]);
  assertEquals(marks({ view: "work-item", key: "blog-12" }), [
    ["design", null],
    ["simulate", null],
    ["board", "true"],
  ]);
  assertEquals(marks({ view: "ticket", factory: "team", id: "ts-1" }), [
    ["design", null],
    ["simulate", null],
    ["board", "true"],
  ]);
});

Deno.test("route: before a factory is picked only Design has an address", () => {
  assertEquals(FACTORY_VIEWS.map((v) => navHref(v, null)), ["/", null, null]);
  assertEquals(FACTORY_VIEWS.map((v) => navHref(v, "team")), [
    "/f/team/design",
    "/f/team/simulate",
    "/f/team/board",
  ]);
});

Deno.test("route: the browser tab's title says where you are", () => {
  assertEquals(
    titleFor({ view: "design", factory: null }, null),
    "Design · Stagecraft Studio",
  );
  assertEquals(
    titleFor({ view: "board", factory: "blog" }, "blog"),
    "Board · blog · Stagecraft Studio",
  );
  assertEquals(
    titleFor({ view: "simulate", factory: "blog" }, null),
    "Simulate · blog · Stagecraft Studio",
  );
  assertEquals(
    titleFor({ view: "work-item", key: "blog-12" }, "blog"),
    "blog-12 · Board · blog · Stagecraft Studio",
  );
  assertEquals(
    titleFor({ view: "work-item", key: "blog-12" }, null),
    "blog-12 · Board · Stagecraft Studio",
  );
  assertEquals(
    titleFor({ view: "ticket", factory: "blog", id: "blog-3" }, null),
    "blog-3 · Board · blog · Stagecraft Studio",
  );
});

Deno.test("route: with no base path, addresses and server paths are unchanged", () => {
  setBasePath("");
  assertEquals(served("/api/events"), "/api/events");
  assertEquals(routeHref({ view: "board", factory: "team" }), "/f/team/board");
  assertEquals(navHref("design", null), "/");
  assertEquals(parseRoute("/w/k"), { view: "work-item", key: "k" });
  assertEquals(
    readBasePath({ querySelector: () => null }),
    "",
  );
});

Deno.test("route: under a base path, addresses carry it and parse without it", () => {
  setBasePath("/_stagecraft");
  try {
    assertEquals(served("/api/events"), "/_stagecraft/api/events");
    assertEquals(
      routeHref({ view: "board", factory: "team" }),
      "/_stagecraft/f/team/board",
    );
    assertEquals(
      routeHref({ view: "work-item", key: "k" }),
      "/_stagecraft/w/k",
    );
    assertEquals(routeHref({ view: "design", factory: null }), "/_stagecraft/");
    assertEquals(navHref("design", null), "/_stagecraft/");
    assertEquals(parseRoute("/_stagecraft"), { view: "design", factory: null });
    assertEquals(parseRoute("/_stagecraft/"), {
      view: "design",
      factory: null,
    });
    assertEquals(parseRoute("/_stagecraft/f/team/simulate"), {
      view: "simulate",
      factory: "team",
    });
    // An address without the prefix, as the studio's own port answers it,
    // is read as it is.
    assertEquals(parseRoute("/f/team/board"), {
      view: "board",
      factory: "team",
    });
    assertEquals(parseRoute("/_stagecraftx/f/team/board"), null);
    const route: Route = { view: "ticket", factory: "team", id: "ts-1" };
    assertEquals(parseRoute(routeHref(route)), route);
  } finally {
    setBasePath("");
  }
});

Deno.test("route: readBasePath reads the prefix the server named in the page", () => {
  const doc = {
    querySelector: (selector: string) =>
      selector === 'meta[name="stagecraft-base"]'
        ? {
          getAttribute: (name: string) =>
            name === "content" ? "/_stagecraft" : null,
        }
        : null,
  };
  assertEquals(readBasePath(doc), "/_stagecraft");
});
