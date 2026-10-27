// Copyright (C) 2026 Elder Swamp Club, Inc.
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

import { assertEquals, assertRejects } from "jsr:@std/assert@1.0.19";
import {
  createModelTestContext,
  withMockedFetch,
} from "@swamp-club/swamp-testing";
import { type ExtractContext, FieldsSchema, model } from "./extraction.ts";
import { CloudflareApiError } from "./_lib/workers_ai.ts";

const globalArgs = {
  apiToken: "test-token",
  account_id: "acct-123",
  model: "clairic" as const,
  baseUrl: "https://api.example.com/client/v4",
  timeoutMs: 1_000,
  maxRetries: 0,
};

const ENDPOINT =
  "https://api.example.com/client/v4/accounts/acct-123/ai/run/@cf/cloudflare/clairic";

const FIELDS = {
  invoice_number: { type: "text" as const },
  days_to_pay: {
    type: "estimate" as const,
    min: 0,
    max: 120,
    step: 1,
  },
  po_number: { type: "text" as const, instructions: "Purchase order number" },
};

const ANSWERS = {
  invoice_number: {
    type: "text",
    value: "INV-2291",
    span: [8, 16],
    guess: "INV-2291",
    p_null: 0.01,
    confidence: 0.98,
  },
  days_to_pay: {
    type: "estimate",
    value: 30,
    mean: 31.2,
    median: 30,
    p10: 28,
    p90: 35,
    p_below: 0,
    p_above: 0,
  },
  po_number: {
    type: "text",
    value: null,
    guess: "PO-77",
    p_null: 0.91,
    confidence: 0.91,
  },
};

function okResponse(
  answers: Record<string, unknown> = ANSWERS,
  extra: Record<string, unknown> = {},
): Response {
  return Response.json({
    success: true,
    errors: [],
    messages: [],
    result: {
      model: "clairic",
      answers,
      truncated: false,
      usage: {
        state_tokens: 20,
        schema_tokens: 40,
        input_tokens: 60,
        output_tokens: 0,
        passes: 1,
      },
      ...extra,
    },
  });
}

/** Test context with `globalArgs` narrowed to this model's schema. */
function makeContext() {
  const result = createModelTestContext({ globalArgs, methodName: "extract" });
  return { ...result, context: result.context as unknown as ExtractContext };
}

const STATE =
  "Invoice INV-2291 from Northwind Supply, issued 2026-09-02, net 30.";

Deno.test("model type and placeholder version are what the pipeline expects", () => {
  assertEquals(model.type, "@swamp/cloudflare/clairic/extraction");
  assertEquals(model.version, "VERSION_PLACEHOLDER");
  assertEquals(model.upgrades.at(-1)?.toVersion, "VERSION_PLACEHOLDER");
});

Deno.test("extract posts fields and stores typed answers, keeping nulls", async () => {
  const { context, getWrittenResources } = makeContext();
  const args = model.methods.extract.arguments.parse({
    state: STATE,
    fields: FIELDS,
  });
  const { calls } = await withMockedFetch(
    [okResponse()],
    () => model.methods.extract.execute(args, context),
  );
  assertEquals(calls[0].url, ENDPOINT);
  assertEquals(calls[0].headers["authorization"], "Bearer test-token");
  const body = JSON.parse(calls[0].body ?? "{}");
  assertEquals(body.model, "clairic");
  assertEquals(body.state, STATE);
  assertEquals(body.fields, FIELDS);
  assertEquals("options" in body, false);
  assertEquals("reference_date" in body, false);

  const [written] = getWrittenResources();
  assertEquals(written.specName, "extraction");
  assertEquals(written.name, "extraction-latest");
  const answers = written.data.answers as typeof ANSWERS;
  assertEquals(answers.invoice_number.value, "INV-2291");
  assertEquals(answers.days_to_pay.p90, 35);
  assertEquals(answers.po_number.value, null);
  assertEquals(written.data.truncated, false);
  assertEquals("stateText" in written.data, false);
});

Deno.test("extract forwards options, reference date, and images", async () => {
  const { context, getWrittenResources } = makeContext();
  const args = model.methods.extract.arguments.parse({
    state: "",
    fields: { total: { type: "number", decimals: 2, unit: "USD" } },
    images: ["data:image/png;base64,iVBORw0K"],
    referenceDate: "2026-10-01",
    includeQuantiles: true,
    returnStateText: true,
    name: "receipt",
  });
  const { calls } = await withMockedFetch(
    [okResponse(
      { total: { type: "number", value: 42.5, confidence: 0.9 } },
      { state_text: "Total 42.50", truncated: true },
    )],
    () => model.methods.extract.execute(args, context),
  );
  const body = JSON.parse(calls[0].body ?? "{}");
  assertEquals(body.reference_date, "2026-10-01");
  assertEquals(body.options, {
    include_quantiles: true,
    return_state_text: true,
  });
  assertEquals(body.images, ["data:image/png;base64,iVBORw0K"]);

  const [written] = getWrittenResources();
  assertEquals(written.name, "extraction-receipt");
  assertEquals(written.data.imageCount, 1);
  assertEquals(written.data.referenceDate, "2026-10-01");
  assertEquals(written.data.stateText, "Total 42.50");
  assertEquals(written.data.truncated, true);
});

Deno.test("unknown answer keys from the preview API are kept", async () => {
  const { context, getWrittenResources } = makeContext();
  const args = model.methods.extract.arguments.parse({
    state: STATE,
    fields: { invoice_number: { type: "text" } },
  });
  await withMockedFetch(
    [okResponse({
      invoice_number: { type: "text", value: "INV-2291", new_signal: 0.5 },
    })],
    () => model.methods.extract.execute(args, context),
  );
  const answers = getWrittenResources()[0].data.answers as Record<
    string,
    Record<string, unknown>
  >;
  assertEquals(answers.invoice_number.new_signal, 0.5);
});

Deno.test("a response missing a field is rejected before writing", async () => {
  const { context, getWrittenResources } = makeContext();
  const args = model.methods.extract.arguments.parse({
    state: STATE,
    fields: FIELDS,
  });
  await assertRejects(
    () =>
      withMockedFetch(
        [okResponse({ invoice_number: ANSWERS.invoice_number })],
        () => model.methods.extract.execute(args, context),
      ),
    Error,
    "missing answers for: days_to_pay, po_number",
  );
  assertEquals(getWrittenResources().length, 0);
});

Deno.test("API errors propagate and nothing is written", async () => {
  const { context, getWrittenResources } = makeContext();
  const args = model.methods.extract.arguments.parse({
    state: STATE,
    fields: FIELDS,
  });
  await assertRejects(
    () =>
      withMockedFetch(
        [
          new Response(
            JSON.stringify({
              success: false,
              errors: [{ code: 5006, message: "bad field" }],
            }),
            { status: 400 },
          ),
        ],
        () => model.methods.extract.execute(args, context),
      ),
    CloudflareApiError,
    "[5006] bad field",
  );
  assertEquals(getWrittenResources().length, 0);
});

Deno.test("field specs enforce type-specific requirements", () => {
  assertEquals(FieldsSchema.safeParse({}).success, false);
  assertEquals(
    FieldsSchema.safeParse({ "1bad": { type: "text" } }).success,
    false,
  );
  assertEquals(
    FieldsSchema.safeParse({ tags: { type: "list" } }).success,
    false,
  );
  assertEquals(
    FieldsSchema.safeParse({ tags: { type: "list", items: "text" } }).success,
    true,
  );
  assertEquals(
    FieldsSchema.safeParse({ eta: { type: "estimate", min: 0 } }).success,
    false,
  );
  assertEquals(
    FieldsSchema.safeParse({
      due: { type: "estimate", min: "2026-01-01", max: "2026-12-31" },
    }).success,
    true,
  );
  assertEquals(
    FieldsSchema.safeParse({
      demand: {
        type: "forecast",
        min: 0,
        max: 1000,
        horizon: 65,
      },
    }).success,
    false,
  );
});

Deno.test("extract arguments need state or images and accept JSON strings", () => {
  const args = model.methods.extract.arguments;
  assertEquals(
    args.safeParse({ fields: { a: { type: "text" } } }).success,
    false,
  );
  const fromJson = args.parse({
    state: "x",
    fields: '{"a":{"type":"date"}}',
  });
  assertEquals(fromJson.fields.a.type, "date");
  assertEquals(fromJson.name, "latest");
  assertEquals(
    args.safeParse({
      state: "x",
      fields: { a: { type: "text" } },
      referenceDate: "October 1st",
    }).success,
    false,
  );
});

Deno.test("credentials-configured check passes only with credentials and an account", async () => {
  const check = model.checks["credentials-configured"];
  assertEquals(
    (await check.execute({ globalArgs: { ...globalArgs } })).pass,
    true,
  );
  const previous = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  try {
    Deno.env.delete("CLOUDFLARE_ACCOUNT_ID");
    const { account_id: _a, ...rest } = globalArgs;
    assertEquals((await check.execute({ globalArgs: rest })).pass, false);
  } finally {
    if (previous !== undefined) Deno.env.set("CLOUDFLARE_ACCOUNT_ID", previous);
  }
});
