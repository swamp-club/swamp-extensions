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
  parseSummary,
  renderSummary,
  type SummaryMeta,
} from "./entry_summary.ts";

const META: SummaryMeta = {
  cycle: 2,
  version: 3,
  versions: { plan: 2 },
  inputs: { branch: "fix-1", depth: 4 },
};

function render(
  summary: string,
  payload: Record<string, unknown> = {},
  meta: SummaryMeta = META,
): string {
  const parsed = parseSummary(summary);
  assertEquals(parsed.errors, []);
  return renderSummary(parsed.parts, payload, meta);
}

Deno.test("entry summary: fields, event values and counts", () => {
  assertEquals(
    render(
      "{{title}} v{{$version}} (plan v{{$version.plan}}), try {{$cycle}}",
      {
        title: "Plan",
      },
    ),
    "Plan v3 (plan v2), try 2",
  );
  assertEquals(
    render("on {{$input.branch}} at {{ $input.depth }}"),
    "on fix-1 at 4",
  );
  const findings = [
    { severity: "critical", resolved: false },
    { severity: "high", resolved: true },
    { severity: "critical", resolved: true },
    "not an object",
  ];
  assertEquals(
    render(
      "{{count findings severity=critical}} critical, " +
        "{{count findings resolved=true}} resolved, {{count findings}} in all",
      { findings },
    ),
    "2 critical, 2 resolved, 4 in all",
  );
});

Deno.test("entry summary: whatever is absent reads as empty, and a count of no list as 0", () => {
  assertEquals(
    render(
      "[{{gone}}][{{$version.review}}][{{$input.none}}][{{count gone}}]",
      { gone: null },
      { cycle: 1, versions: {} },
    ),
    "[][][][0]",
  );
  assertEquals(render("v{{$version}}", {}, { cycle: 1, versions: {} }), "v");
});

Deno.test("entry summary: literal text passes through as prompt templates do", () => {
  assertEquals(
    render("\\{{end}} {{ .Values.x }} {{{raw}}} {{count}}", { count: 7 }),
    "{{end}} {{ .Values.x }} {{{raw}}} 7",
  );
});

Deno.test("entry summary: an unknown event value or a malformed count is an error", () => {
  for (
    const [summary, message] of [
      ["{{$when}}", "{{$when}} is not a summary value"],
      ["{{$version.Plan}}", "'Plan' is not a product name"],
      ["{{$input.a-b}}", "'a-b' is not a let or input name"],
      ["{{count a b}}", "a count is {{count <field>}}"],
      ["{{count a b=c d}}", "a count is {{count <field>}}"],
      ["{{count a-b}}", "a count is {{count <field>}}"],
    ]
  ) {
    const errors = parseSummary(`x ${summary}`).errors;
    assertEquals(errors.length, 1, summary);
    assertEquals(errors[0].includes(message), true, errors[0]);
  }
});
