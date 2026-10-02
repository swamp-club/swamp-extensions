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
import type { JSX } from "preact";
import { renderMarkdown } from "./markdown.tsx";

// The Ticket tab's markdown: a tracker's text drawn as elements, never as
// markup. These walk the element tree renderMarkdown returns, as the page
// would draw it.

interface Walked {
  type: string;
  props: Record<string, unknown>;
}

/** Every element in the tree, and all its text, in order. */
function walk(nodes: unknown): { elements: Walked[]; text: string } {
  const elements: Walked[] = [];
  let text = "";
  const visit = (n: unknown): void => {
    if (n === null || n === undefined || typeof n === "boolean") return;
    if (typeof n === "string" || typeof n === "number") {
      text += String(n);
      return;
    }
    if (Array.isArray(n)) return n.forEach(visit);
    const el = n as JSX.Element & {
      type: unknown;
      props: Record<string, unknown>;
    };
    assert(typeof el.type === "string", "only plain elements, no components");
    elements.push({ type: el.type, props: el.props });
    visit(el.props.children);
  };
  visit(nodes);
  return { elements, text };
}

const tags = (md: string) =>
  walk(renderMarkdown(md)).elements.map((e) => e.type);

Deno.test("markdown: a script-bearing description renders inert, its markup kept as text", () => {
  const hostile = [
    "Hello <script>alert(1)</script>",
    '<img src=x onerror="alert(2)">',
    "<iframe src=https://evil.example></iframe>",
    "[click](javascript:alert(3)) and [data](data:text/html,<b>x</b>)",
    "![pic](javascript:alert(4))",
    '<a href="javascript:alert(5)">a</a>',
  ].join("\n\n");
  const { elements, text } = walk(renderMarkdown(hostile));
  for (const el of elements) {
    assert(
      !["script", "iframe", "img", "object", "embed", "style"].includes(
        el.type,
      ),
      `no ${el.type} element`,
    );
    for (const name of Object.keys(el.props)) {
      assert(!/^on/i.test(name), `no ${name} handler`);
      assert(name !== "dangerouslySetInnerHTML", "no raw HTML");
    }
    if (el.type === "a") {
      assert(/^https?:/.test(String(el.props.href)), `href ${el.props.href}`);
    }
  }
  // Only the iframe's https address became a link, as any address would.
  assertEquals(
    elements.filter((e) => e.type === "a").map((e) => e.props.href),
    ["https://evil.example"],
  );
  // The markup is still there to read, as text.
  assert(text.includes("<script>alert(1)</script>"), text);
  assert(text.includes('onerror="alert(2)"'), text);
});

Deno.test("markdown: links go only to web addresses, in a new tab", () => {
  const { elements } = walk(
    renderMarkdown(
      "See [the PR](https://git.example.com/pr/1) or https://x.example/a.",
    ),
  );
  const links = elements.filter((e) => e.type === "a");
  assertEquals(links.map((l) => l.props.href), [
    "https://git.example.com/pr/1",
    "https://x.example/a",
  ]);
  for (const l of links) {
    assertEquals([l.props.target, l.props.rel], [
      "_blank",
      "noopener noreferrer",
    ]);
  }
});

Deno.test("markdown: blocks and inline elements", () => {
  assertEquals(tags("# Title\n\nText"), ["h5", "p"]);
  assertEquals(tags("###### Deep"), ["h6"]);
  assertEquals(tags("**bold** and *em* and `code`"), [
    "p",
    "strong",
    "em",
    "code",
  ]);
  assertEquals(tags("- one\n- two"), ["ul", "li", "li"]);
  assertEquals(tags("1. one\n2. two"), ["ol", "li", "li"]);
  assertEquals(tags("- one\n  - nested"), ["ul", "li", "ul", "li"]);
  assertEquals(tags("> quoted"), ["blockquote", "p"]);
  assertEquals(tags("---"), ["hr"]);
  assertEquals(tags("```ts\nconst a = `x` <b>;\n```"), ["pre", "code"]);
  const { text } = walk(renderMarkdown("```\n<b>kept</b>\n```"));
  assertEquals(text, "<b>kept</b>");
});

Deno.test("markdown: an underscore inside a word is a character", () => {
  assertEquals(tags("run fetch_issue and claim_key"), ["p"]);
  assertEquals(walk(renderMarkdown("snake_case_name")).text, "snake_case_name");
  assertEquals(tags("an _emphasised_ word"), ["p", "em"]);
});

Deno.test("markdown: an image is a link to it, never an image", () => {
  const { elements, text } = walk(
    renderMarkdown("![diagram](https://x.example/d.png)"),
  );
  assertEquals(elements.map((e) => e.type), ["p", "a"]);
  assertEquals(text, "image: diagram");
});
