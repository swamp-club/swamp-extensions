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

import { assertEquals } from "@std/assert";
import {
  parseTemplate,
  renderTemplate,
  undeclaredPlaceholders,
} from "./template.ts";

Deno.test("parse: placeholders, with or without inner spaces", () => {
  assertEquals(parseTemplate("Review {{changeUrl}} and {{ plan_summary }}."), [
    { kind: "text", text: "Review " },
    { kind: "placeholder", name: "changeUrl" },
    { kind: "text", text: " and " },
    { kind: "placeholder", name: "plan_summary" },
    { kind: "text", text: "." },
  ]);
});

Deno.test("parse: braces around anything but a bare name are literal", () => {
  const text =
    "{{ .Values.image }} {{#each items}} {{ a.b }} {{1x}} {{}} {{ x + 1 }}";
  assertEquals(parseTemplate(text), [{ kind: "text", text }]);
});

Deno.test("parse: {{ directly after { is literal (Handlebars triple-stash)", () => {
  assertEquals(parseTemplate("{{{body}}}"), [
    { kind: "text", text: "{{{body}}}" },
  ]);
});

Deno.test("parse: bare-word template tags look like placeholders", () => {
  assertEquals(undeclaredPlaceholders("{{ end }} \\{{ else }}", []), ["end"]);
});

Deno.test("parse: \\{{ is a literal {{", () => {
  assertEquals(parseTemplate("Write \\{{name}} in the template."), [
    { kind: "text", text: "Write {{name}} in the template." },
  ]);
});

Deno.test("parse: other backslashes are untouched", () => {
  assertEquals(parseTemplate("a\\nb \\{ c"), [
    { kind: "text", text: "a\\nb \\{ c" },
  ]);
});

Deno.test("undeclaredPlaceholders: reports each unknown name once", () => {
  assertEquals(
    undeclaredPlaceholders("{{url}} {{urll}} {{urll}} \\{{nope}}", ["url"]),
    ["urll"],
  );
});

Deno.test("render: values by type", () => {
  assertEquals(
    renderTemplate("{{s}} {{n}} {{b}}\n{{o}}", {
      s: "text",
      n: 3,
      b: false,
      o: { a: [1] },
    }),
    { ok: true, text: 'text 3 false\n{\n  "a": [\n    1\n  ]\n}' },
  );
});

Deno.test("render: a null or absent value fails instead of leaving a blank", () => {
  assertEquals(renderTemplate("{{a}} {{b}} {{a}}", { a: null }), {
    ok: false,
    missing: ["a", "b"],
  });
});

Deno.test("render: literal braces survive rendering", () => {
  assertEquals(
    renderTemplate("{{ .Values.x }} \\{{v}} {{v}}", { v: "ok" }),
    { ok: true, text: "{{ .Values.x }} {{v}} ok" },
  );
});
