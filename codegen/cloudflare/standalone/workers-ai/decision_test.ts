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

import {
  assertEquals,
  assertRejects,
  assertStringIncludes,
} from "jsr:@std/assert@1.0.19";
import {
  createModelTestContext,
  withMockedFetch,
} from "@swamp-club/swamp-testing";
import { type EvalContext, model, QuestionsSchema } from "./decision.ts";
import { CloudflareApiError } from "./_lib/workers_ai.ts";

const globalArgs = {
  apiToken: "test-token",
  account_id: "acct-123",
  model: "clef" as const,
  baseUrl: "https://api.example.com/client/v4",
  timeoutMs: 1_000,
  maxRetries: 0,
};

const ENDPOINT =
  "https://api.example.com/client/v4/accounts/acct-123/ai/run/@cf/cloudflare";

function okResponse(
  answers: Record<string, unknown>,
  modelName = "clef",
): Response {
  return Response.json({
    success: true,
    errors: [],
    messages: [],
    result: {
      model: modelName,
      answers,
      usage: { input_tokens: 12, output_tokens: 0 },
    },
  });
}

/** Test context with `globalArgs` narrowed to this model's schema. */
function makeContext(methodName: string) {
  const result = createModelTestContext({ globalArgs, methodName });
  return { ...result, context: result.context as unknown as EvalContext };
}

Deno.test("model type and placeholder version are what the pipeline expects", () => {
  assertEquals(model.type, "@swamp/cloudflare/clef/decision");
  assertEquals(model.version, "VERSION_PLACEHOLDER");
  assertEquals(model.upgrades.at(-1)?.toVersion, "VERSION_PLACEHOLDER");
});

Deno.test("ask writes an evaluation resource with all answers", async () => {
  const { context, getWrittenResources, getLogsByLevel } = makeContext("ask");
  const questions = {
    urgent: { type: "noul" as const, instructions: "Urgent?" },
    team: {
      type: "choice" as const,
      instructions: "Which team?",
      criteria: { billing: null, tech: null },
    },
  };
  const { calls } = await withMockedFetch(
    [okResponse({
      urgent: { type: "noul", noul: 0.9 },
      team: {
        type: "choice",
        choice: "tech",
        probabilities: { billing: 0.2, tech: 0.8 },
        confidence: 0.7,
      },
    })],
    () =>
      model.methods.ask.execute(
        { state: { ticket: "Payouts failing" }, questions, name: "latest" },
        context,
      ),
  );
  assertEquals(calls.length, 1);
  assertEquals(calls[0].url, `${ENDPOINT}/clef`);
  assertEquals(calls[0].headers["authorization"], "Bearer test-token");
  const body = JSON.parse(calls[0].body ?? "{}");
  assertEquals(body.model, "clef");
  assertEquals(body.state, { ticket: "Payouts failing" });

  const written = getWrittenResources();
  assertEquals(written.length, 1);
  assertEquals(written[0].specName, "evaluation");
  assertEquals(written[0].name, "evaluation-latest");
  const answers = written[0].data.answers as Record<string, unknown>;
  assertEquals(answers.urgent, { type: "noul", noul: 0.9 });
  assertEquals(written[0].data.questions, questions);
  assertEquals(written[0].data.usage, { input_tokens: 12, output_tokens: 0 });
  assertEquals("imageCount" in written[0].data, false);
  assertEquals(getLogsByLevel("info").length, 2);
});

Deno.test("ask honours a per-call model override in both URL and body", async () => {
  const { context, getWrittenResources } = makeContext("ask");
  const { calls } = await withMockedFetch(
    [okResponse({ a: { type: "noul", noul: 0.1 } }, "clef-flash")],
    () =>
      model.methods.ask.execute(
        {
          state: "x",
          questions: { a: { type: "noul", instructions: "?" } },
          model: "clef-flash",
          name: "latest",
        },
        context,
      ),
  );
  assertEquals(calls[0].url, `${ENDPOINT}/clef-flash`);
  assertEquals(JSON.parse(calls[0].body ?? "{}").model, "clef-flash");
  assertEquals(getWrittenResources()[0].data.model, "clef-flash");
});

Deno.test("images are sent but only their count is stored", async () => {
  const { context, getWrittenResources } = makeContext("noul");
  const images = ["data:image/png;base64,iVBORw0K"];
  const { calls } = await withMockedFetch(
    [okResponse({ answer: { type: "noul", noul: 0.7 } })],
    () =>
      model.methods.noul.execute(
        { state: "x", instructions: "Is this a cat?", images, name: "latest" },
        context,
      ),
  );
  assertEquals(JSON.parse(calls[0].body ?? "{}").images, images);
  const [written] = getWrittenResources();
  assertEquals(written.data.imageCount, 1);
  assertEquals("images" in written.data, false);
});

Deno.test("noul builds criteria only when provided and stores the probability", async () => {
  const { context, getWrittenResources } = makeContext("noul");
  const { calls } = await withMockedFetch(
    [okResponse({ answer: { type: "noul", noul: 0.42 } })],
    () =>
      model.methods.noul.execute(
        {
          state: "Help! Payouts down for 3 days.",
          instructions: "Does this convey urgency?",
          yes: "Explicitly time-sensitive",
          name: "urgency",
        },
        context,
      ),
  );
  const body = JSON.parse(calls[0].body ?? "{}");
  assertEquals(body.questions.answer.criteria, {
    true: "Explicitly time-sensitive",
  });
  const [written] = getWrittenResources();
  assertEquals(written.specName, "noul");
  assertEquals(written.name, "noul-urgency");
  assertEquals(written.data.noul, 0.42);
  assertEquals(written.data.criteria, { true: "Explicitly time-sensitive" });
});

Deno.test("noul omits criteria entirely when neither side is given", async () => {
  const { context, getWrittenResources } = makeContext("noul");
  const { calls } = await withMockedFetch(
    [okResponse({ answer: { type: "noul", noul: 0.5 } })],
    () =>
      model.methods.noul.execute(
        { state: "x", instructions: "?", name: "latest" },
        context,
      ),
  );
  const body = JSON.parse(calls[0].body ?? "{}");
  assertEquals("criteria" in body.questions.answer, false);
  assertEquals("criteria" in getWrittenResources()[0].data, false);
});

Deno.test("choice stores choice, probabilities, and confidence", async () => {
  const { context, getWrittenResources } = makeContext("choice");
  await withMockedFetch(
    [okResponse({
      answer: {
        type: "choice",
        choice: "technical",
        probabilities: { billing: 0.1, technical: 0.9 },
        confidence: 0.85,
      },
    })],
    () =>
      model.methods.choice.execute(
        {
          state: "x",
          instructions: "Which team?",
          criteria: { billing: "Payments", technical: "Bugs" },
          name: "latest",
        },
        context,
      ),
  );
  const [written] = getWrittenResources();
  assertEquals(written.specName, "choice");
  assertEquals(written.name, "choice-latest");
  assertEquals(written.data.choice, "technical");
  assertEquals(written.data.confidence, 0.85);
});

Deno.test("score stores score, legend, probabilities, and confidence", async () => {
  const { context, getWrittenResources } = makeContext("score");
  await withMockedFetch(
    [okResponse({
      answer: {
        type: "score",
        score: 1.6,
        legend: { "0": "Calm", "1": "Frustrated", "2": "Angry" },
        probabilities: { "0": 0.05, "1": 0.3, "2": 0.65 },
        confidence: 0.78,
      },
    })],
    () =>
      model.methods.score.execute(
        {
          state: "x",
          instructions: "How frustrated?",
          criteria: ["Calm", "Frustrated", "Angry"],
          name: "latest",
        },
        context,
      ),
  );
  const [written] = getWrittenResources();
  assertEquals(written.specName, "score");
  assertEquals(written.name, "score-latest");
  assertEquals(written.data.score, 1.6);
  assertEquals(written.data.legend, {
    "0": "Calm",
    "1": "Frustrated",
    "2": "Angry",
  });
});

Deno.test("single-question methods reject an answer of the wrong type", async () => {
  const { context, getWrittenResources } = makeContext("noul");
  await assertRejects(
    () =>
      withMockedFetch(
        [okResponse({
          answer: {
            type: "choice",
            choice: "a",
            probabilities: { a: 1 },
            confidence: 1,
          },
        })],
        () =>
          model.methods.noul.execute(
            { state: "x", instructions: "?", name: "latest" },
            context,
          ),
      ),
    Error,
    "a noul was expected",
  );
  assertEquals(getWrittenResources().length, 0);
});

Deno.test("a response missing an answer is rejected before writing", async () => {
  const { context, getWrittenResources } = makeContext("ask");
  await assertRejects(
    () =>
      withMockedFetch(
        [okResponse({})],
        () =>
          model.methods.ask.execute(
            {
              state: "x",
              questions: { a: { type: "noul", instructions: "?" } },
              name: "latest",
            },
            context,
          ),
      ),
    Error,
    "missing answers for: a",
  );
  assertEquals(getWrittenResources().length, 0);
});

Deno.test("API errors propagate and nothing is written", async () => {
  const { context, getWrittenResources } = makeContext("choice");
  const err = await assertRejects(
    () =>
      withMockedFetch(
        [
          new Response(
            JSON.stringify({
              success: false,
              errors: [{ code: 5006, message: "invalid criteria" }],
            }),
            { status: 400 },
          ),
        ],
        () =>
          model.methods.choice.execute(
            {
              state: "x",
              instructions: "?",
              criteria: { a: null, b: null },
              name: "latest",
            },
            context,
          ),
      ),
    CloudflareApiError,
    "HTTP 400",
  );
  assertStringIncludes(err.message, "invalid criteria");
  assertEquals(getWrittenResources().length, 0);
});

Deno.test("credentials-configured check passes only with credentials and an account", async () => {
  const check = model.checks["credentials-configured"];
  const passing = await check.execute({ globalArgs: { ...globalArgs } });
  assertEquals(passing.pass, true);
  const previous = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  try {
    Deno.env.delete("CLOUDFLARE_ACCOUNT_ID");
    const { account_id: _a, ...rest } = globalArgs;
    const failing = await check.execute({ globalArgs: rest });
    assertEquals(failing.pass, false);
  } finally {
    if (previous !== undefined) Deno.env.set("CLOUDFLARE_ACCOUNT_ID", previous);
  }
});

Deno.test("argument schemas enforce Clef's limits and model names", () => {
  const q = { type: "noul", instructions: "?" };
  assertEquals(QuestionsSchema.safeParse({ "ok_id.v-1": q }).success, true);
  assertEquals(QuestionsSchema.safeParse({ "bad id": q }).success, false);
  const many = Object.fromEntries(
    Array.from({ length: 65 }, (_, i) => [`q${i}`, q]),
  );
  assertEquals(QuestionsSchema.safeParse(many).success, false);
  assertEquals(
    model.methods.choice.arguments.safeParse({
      state: "x",
      instructions: "?",
      criteria: { only: null },
    }).success,
    false,
  );
  assertEquals(
    model.methods.score.arguments.safeParse({
      state: "x",
      instructions: "?",
      criteria: Array.from({ length: 11 }, (_, i) => `level ${i}`),
    }).success,
    false,
  );
  assertEquals(
    model.methods.noul.arguments.safeParse({
      state: "x",
      instructions: "?",
      model: "jev-latest",
    }).success,
    false,
  );
  assertEquals(model.globalArguments.parse({}).model, "clef");
});

Deno.test("structured arguments accept JSON strings from @file inputs", () => {
  const ask = model.methods.ask.arguments.parse({
    state: "x",
    questions: '{"a":{"type":"noul","instructions":"?"}}',
    images: '["data:image/png;base64,AA"]',
  });
  assertEquals(ask.questions.a.type, "noul");
  assertEquals(ask.images, ["data:image/png;base64,AA"]);
  const score = model.methods.score.arguments.parse({
    state: "x",
    instructions: "?",
    criteria: '["low","high"]',
  });
  assertEquals(score.criteria, ["low", "high"]);
  assertEquals(
    model.methods.ask.arguments.safeParse({
      state: "x",
      questions: "not json",
    }).success,
    false,
  );
});
