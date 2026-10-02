/// <reference lib="dom" />
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
// Markdown from a tracker (a ticket's description, its comments), drawn
// safely: the text is parsed into Preact elements, never into an HTML
// string, so no markup in it is ever markup on the page. Raw HTML stays
// text, a link is drawn only to an http(s) address (webLink), and an image
// is drawn as a link to it (the CSP would not load it anyway). It covers what
// tickets use: paragraphs, headings, emphasis, inline and fenced code,
// lists, quotes, rules and links. Headings start at h5, under the Ticket tab's own.

import type { ComponentChildren, JSX } from "preact";
import { webLink } from "./work_item.ts";

type Node = JSX.Element | string;

// One inline element, earliest first: code, an image, a link, strong,
// emphasis, a bare web address.
const INLINE = new RegExp(
  [
    "(`+)([^`]|[^`][\\s\\S]*?[^`])\\1(?!`)",
    '!\\[([^\\]]*)\\]\\(([^)\\s]+)(?:\\s+"[^"]*")?\\)',
    '\\[([^\\]]+)\\]\\(([^)\\s]+)(?:\\s+"[^"]*")?\\)',
    "\\*\\*(?=\\S)([\\s\\S]*?\\S)\\*\\*",
    "__(?=\\S)([\\s\\S]*?\\S)__",
    "\\*(?=\\S)([\\s\\S]*?\\S)\\*",
    "_(?=\\S)([\\s\\S]*?\\S)_",
    "(https?://[^\\s<>()]*[^\\s<>().,;:!?'\"])",
  ].join("|"),
);

function link(href: string, children: ComponentChildren, key: number): Node {
  return webLink(href)
    ? (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
    : <span key={key}>{children}</span>;
}

/** A run of text with its inline elements. */
export function inline(text: string): Node[] {
  const out: Node[] = [];
  let rest = text;
  let key = 0;
  while (rest !== "") {
    const m = INLINE.exec(rest);
    if (m === null) {
      out.push(rest);
      break;
    }
    const before = rest.slice(0, m.index);
    // _ inside a word (snake_case) is a character, not emphasis.
    const underscore = m[0].startsWith("_") &&
      /\w$/.test(before);
    if (underscore) {
      out.push(before + "_");
      rest = rest.slice(m.index + 1);
      continue;
    }
    if (before !== "") out.push(before);
    rest = rest.slice(m.index + m[0].length);
    key++;
    if (m[2] !== undefined) {
      out.push(<code key={key}>{m[2].replace(/^ (.+) $/, "$1")}</code>);
    } else if (m[4] !== undefined) {
      out.push(link(m[4], `image: ${m[3] || m[4]}`, key));
    } else if (m[6] !== undefined) {
      out.push(link(m[6], inline(m[5]), key));
    } else if (m[7] !== undefined || m[8] !== undefined) {
      out.push(<strong key={key}>{inline(m[7] ?? m[8])}</strong>);
    } else if (m[9] !== undefined || m[10] !== undefined) {
      out.push(<em key={key}>{inline(m[9] ?? m[10])}</em>);
    } else {
      out.push(link(m[11], m[11], key));
    }
  }
  return out;
}

const FENCE = /^\s{0,3}(```+|~~~+)/;
const HEADING = /^\s{0,3}(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/;
const RULE = /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/;
const QUOTE = /^\s{0,3}>\s?/;
const ITEM = /^(\s*)([-*+]|\d{1,9}[.)])\s+/;

const startsBlock = (line: string) =>
  FENCE.test(line) || HEADING.test(line) || RULE.test(line) ||
  QUOTE.test(line) || ITEM.test(line);

/** Markdown blocks, as elements. */
export function renderMarkdown(text: string): JSX.Element[] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const out: JSX.Element[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = out.length;
    if (line.trim() === "") {
      i++;
      continue;
    }
    const fence = FENCE.exec(line);
    if (fence !== null) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith(fence[1])) {
        body.push(lines[i++]);
      }
      i++;
      out.push(
        <pre key={key}>
          <code>{body.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading !== null) {
      const level = Math.min(heading[1].length + 4, 6);
      const Tag = `h${level}` as "h5" | "h6";
      out.push(<Tag key={key}>{inline(heading[2])}</Tag>);
      i++;
      continue;
    }
    if (RULE.test(line)) {
      out.push(<hr key={key} />);
      i++;
      continue;
    }
    if (QUOTE.test(line)) {
      const quoted: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) {
        quoted.push(lines[i++].replace(QUOTE, ""));
      }
      out.push(
        <blockquote key={key}>{renderMarkdown(quoted.join("\n"))}</blockquote>,
      );
      continue;
    }
    const item = ITEM.exec(line);
    if (item !== null) {
      const ordered = /\d/.test(item[2]);
      const indent = item[1].length;
      const items: string[][] = [];
      while (i < lines.length) {
        const l = lines[i];
        const m = ITEM.exec(l);
        if (m !== null && m[1].length <= indent) {
          if (/\d/.test(m[2]) !== ordered) break;
          items.push([l.slice(m[0].length)]);
          i++;
          continue;
        }
        // A blank line ends the list unless an indented line follows it.
        if (l.trim() === "") {
          const next = lines[i + 1];
          if (next === undefined || !/^\s+\S/.test(next)) break;
          items.at(-1)!.push("");
          i++;
          continue;
        }
        if (/^\s+\S/.test(l) || !startsBlock(l)) {
          items.at(-1)!.push(l.replace(/^\s{1,4}/, ""));
          i++;
          continue;
        }
        break;
      }
      const List = ordered ? "ol" : "ul";
      out.push(
        <List key={key}>
          {items.map((body, n) => {
            const blocks = renderMarkdown(body.join("\n"));
            // An item's first paragraph is its text, not a paragraph in a
            // list.
            const [first, ...rest] = blocks;
            return (
              <li key={n}>
                {first?.type === "p"
                  ? [
                    (first.props as { children: ComponentChildren }).children,
                    ...rest,
                  ]
                  : blocks}
              </li>
            );
          })}
        </List>,
      );
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length && lines[i].trim() !== "" &&
      (para.length === 0 || !startsBlock(lines[i]))
    ) {
      para.push(lines[i++].trim());
    }
    out.push(<p key={key}>{inline(para.join("\n"))}</p>);
  }
  return out;
}

/** A tracker's markdown, drawn safely. */
export function Markdown({ text }: { text: string }) {
  return <div class="md">{renderMarkdown(text)}</div>;
}
