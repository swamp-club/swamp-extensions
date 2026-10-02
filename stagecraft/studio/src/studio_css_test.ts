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

import { assert } from "@std/assert";

// The rules that keep a long key from widening a Board column or the
// work-item page. The studio's tests have no DOM, so this checks the rules
// are there; the layout itself was measured in headless Chromium for
// swamp-club #2963.

const CSS = await Deno.readTextFile(new URL("./studio.css", import.meta.url));

/** The declarations of the rule whose selector list is exactly `selector`. */
function declarations(selector: string): Map<string, string> {
  const rules = CSS.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(
    /([^{}]+)\{([^{}]*)\}/g,
  );
  for (const [, sel, body] of rules) {
    if (sel.trim().replace(/\s+/g, " ") !== selector) continue;
    return new Map(
      body.split(";").map((d) => d.split(":").map((s) => s.trim()))
        .filter((d) => d.length === 2 && d[0] !== "")
        .map(([k, v]) => [k, v]),
    );
  }
  throw new Error(`studio.css has no rule for ${selector}`);
}

function assertHas(selector: string, expected: Record<string, string>) {
  const got = declarations(selector);
  for (const [k, v] of Object.entries(expected)) {
    assert(
      got.get(k) === v,
      `${selector} should set ${k}: ${v}, has ${got.get(k) ?? "nothing"}`,
    );
  }
}

const SHRINKS = { "min-width": "0", "overflow-wrap": "anywhere" };

Deno.test("studio.css: no text in a Board card can widen its column", () => {
  assertHas(".col", { "flex": "0 0 260px", "min-width": "0" });
  assertHas(".col.terminal", { "flex-basis": "200px" });
  assertHas(".card > *, .card-head > *", SHRINKS);
});

Deno.test("studio.css: a card's key is one line, cut off, and whole on hover and focus", () => {
  assertHas(".card-key", {
    "white-space": "nowrap",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
  });
  assertHas(".card:hover .card-key, .card:focus-visible .card-key", {
    "white-space": "normal",
  });
  assertHas(".card-ref", {
    "max-width": "50%",
    "overflow": "hidden",
    "text-overflow": "ellipsis",
  });
});

Deno.test("studio.css: the work-item page's key, title, ticket refs and relations wrap", () => {
  assertHas(".item-head h1", SHRINKS);
  assertHas(".item-head .key", { ...SHRINKS, "max-width": "100%" });
  assertHas(".stats dd", SHRINKS);
  assertHas(".relations li", { "overflow-wrap": "anywhere" });
});
