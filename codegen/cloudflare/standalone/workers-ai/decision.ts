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

/**
 * Swamp model for Cloudflare's Clef decision models on Workers AI.
 *
 * Sends application state plus typed questions (Noul, Choice, Score) to Clef
 * or Clef-flash and stores the calibrated answers as swamp resources, so
 * workflows can branch on them with CEL expressions like
 * `data.latest("<model>", "noul-latest").attributes.noul > 0.8`. Clef follows
 * the System One API, so resource shapes match `@swamp/typesafe-ai` and guards
 * work against either backend.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  assertAllAnswered,
  buildClientConfig,
  checkCredentials,
  type ClientConfig,
  type ClientLogger,
  ConnectionArgsShape,
  type Image,
  ImagesSchema,
  parseJsonString,
  runModel,
} from "./_lib/workers_ai.ts";

/** Clef model selectors accepted in the request body. */
export const CLEF_MODELS = ["clef", "clef-flash"] as const;

/** One of {@link CLEF_MODELS}. */
export type ClefModel = (typeof CLEF_MODELS)[number];

/** Clef's highest-precision model. */
export const DEFAULT_MODEL: ClefModel = "clef";

/** Maximum questions in one request. */
export const MAX_QUESTIONS = 64;

// ---------------------------------------------------------------------------
// System One request schemas
// ---------------------------------------------------------------------------

/** Text, a JSON object, or a JSON array — accepted for state and instructions. */
export const EntrySchema: z.ZodType<Entry> = z.union([
  z.string(),
  z.record(z.string(), z.unknown()),
  z.array(z.unknown()),
]);

/** Resolved type of {@link EntrySchema}. */
export type Entry = string | Record<string, unknown> | unknown[];

/** A criterion description; `null` leaves the label undescribed. */
export const DescriptionSchema: z.ZodType<Description> = EntrySchema.nullable();

/** Resolved type of {@link DescriptionSchema}. */
export type Description = Entry | null;

/** Optional yes/no descriptions for a Noul question. */
export const NoulCriteriaSchema = z.object({
  true: DescriptionSchema.optional().describe(
    "What a yes (value near 1) means.",
  ),
  false: DescriptionSchema.optional().describe(
    "What a no (value near 0) means.",
  ),
});

/** A yes/no question; the answer is the probability of yes. */
export const NoulQuestionSchema = z.object({
  type: z.literal("noul"),
  instructions: EntrySchema.describe("The yes/no question to evaluate."),
  criteria: NoulCriteriaSchema.optional(),
});

/** Option labels mapped to descriptions (or null); 2 to 255 options. */
export const ChoiceCriteriaSchema = z.record(z.string(), DescriptionSchema)
  .refine((c) => Object.keys(c).length >= 2, {
    message: "choice criteria must define at least two options",
  })
  .refine((c) => Object.keys(c).length <= 255, {
    message: "choice criteria may define at most 255 options",
  });

/** A question that selects one option from a defined set. */
export const ChoiceQuestionSchema = z.object({
  type: z.literal("choice"),
  instructions: EntrySchema.describe("What the model should decide."),
  criteria: ChoiceCriteriaSchema,
});

/** An ordered list of 2 to 10 level descriptions. */
export const ScoreCriteriaSchema = z.array(DescriptionSchema)
  .min(2, { message: "score criteria must define at least two ordered levels" })
  .max(10, { message: "score criteria may define at most ten levels" });

/** A question that rates the state along an ordered rubric. */
export const ScoreQuestionSchema = z.object({
  type: z.literal("score"),
  instructions: EntrySchema.describe("What the model should rate."),
  criteria: ScoreCriteriaSchema,
});

/** Any of the three System One question types. */
export const QuestionSchema = z.discriminatedUnion("type", [
  NoulQuestionSchema,
  ChoiceQuestionSchema,
  ScoreQuestionSchema,
]);

/** Resolved type of {@link QuestionSchema}. */
export type Question = z.infer<typeof QuestionSchema>;

const QUESTION_ID = /^[A-Za-z0-9_.-]{1,100}$/;

/** A map of 1 to 64 question ids to questions. */
export const QuestionsSchema = z.record(
  z.string().regex(QUESTION_ID, {
    message:
      "question ids may use letters, digits, '_', '.', '-' (max 100 chars)",
  }),
  QuestionSchema,
)
  .refine((q) => Object.keys(q).length >= 1, {
    message: "at least one question is required",
  })
  .refine((q) => Object.keys(q).length <= MAX_QUESTIONS, {
    message: `at most ${MAX_QUESTIONS} questions are allowed per request`,
  });

/** Resolved type of {@link QuestionsSchema}. */
export type Questions = z.infer<typeof QuestionsSchema>;

// ---------------------------------------------------------------------------
// System One response schemas
// ---------------------------------------------------------------------------

/** Answer to a Noul question. */
export const NoulAnswerSchema = z.object({
  type: z.literal("noul"),
  noul: z.number().describe("Probability of yes, from 0 to 1."),
});

/** Answer to a Choice question. */
export const ChoiceAnswerSchema = z.object({
  type: z.literal("choice"),
  choice: z.string().describe("The highest-probability option."),
  probabilities: z.record(z.string(), z.number()),
  confidence: z.number().describe(
    "Certainty derived from the distribution, 0 to 1.",
  ),
});

/** Answer to a Score question. */
export const ScoreAnswerSchema = z.object({
  type: z.literal("score"),
  score: z.number().describe(
    "Probability-weighted level; may fall between levels.",
  ),
  legend: z.record(z.string(), DescriptionSchema),
  probabilities: z.record(z.string(), z.number()),
  confidence: z.number().describe(
    "Certainty derived from the distribution, 0 to 1.",
  ),
});

/** Any of the three answer types. */
export const AnswerSchema = z.discriminatedUnion("type", [
  NoulAnswerSchema,
  ChoiceAnswerSchema,
  ScoreAnswerSchema,
]);

/** Resolved type of {@link AnswerSchema}. */
export type Answer = z.infer<typeof AnswerSchema>;

/** Token usage reported for one request. */
export const UsageSchema = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
});

/** The evaluation result inside Cloudflare's envelope. */
export const ClefResponseSchema = z.object({
  model: z.string(),
  answers: z.record(z.string(), AnswerSchema),
  usage: UsageSchema,
});

/** Resolved type of {@link ClefResponseSchema}. */
export type ClefResponse = z.infer<typeof ClefResponseSchema>;

/** Body of a Clef `ai/run` request. */
export interface ClefRequest {
  state: Entry;
  model: ClefModel;
  questions: Questions;
  images?: Image[];
}

/**
 * Evaluate `state` against `questions` with a Clef model.
 *
 * @returns The validated result with one answer per question id.
 */
export async function runClef(
  config: ClientConfig,
  request: ClefRequest,
): Promise<ClefResponse> {
  const response = await runModel(
    config,
    request.model,
    {
      model: request.model,
      state: request.state,
      questions: request.questions,
      ...(request.images?.length ? { images: request.images } : {}),
    },
    ClefResponseSchema,
    "Clef evaluation",
  );
  assertAllAnswered(
    "Clef evaluation",
    Object.keys(request.questions),
    response.answers,
  );
  return response;
}

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

const ModelSelectorSchema = z.enum(CLEF_MODELS);

/** Connection settings shared by every method on a definition. */
export const GlobalArgsSchema = z.object({
  ...ConnectionArgsShape,
  model: ModelSelectorSchema.default(DEFAULT_MODEL).describe(
    "Clef model that answers questions: 'clef' (27B, highest precision) or 'clef-flash' (9B, lowest latency). Methods may override per call.",
  ),
});

/** Resolved type of {@link GlobalArgsSchema}. */
export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

const InstanceNameSchema = z.string().regex(/^[a-z0-9][a-z0-9_-]{0,62}$/, {
  message: "name must be lowercase alphanumeric with hyphens or underscores",
}).default("latest").describe(
  "Suffix for the stored resource instance, so several evaluations can coexist. Defaults to 'latest'.",
);

const StateArg = EntrySchema.describe(
  "Content to evaluate: a string, or a JSON object/array of named fields. Pass JSON with --input state:json='{...}'.",
);

const InstructionsArg = EntrySchema.describe(
  "The judgment to make, as text or JSON structure.",
);

const ModelOverrideArg = ModelSelectorSchema.optional().describe(
  "Override the definition's model for this call: 'clef' or 'clef-flash'.",
);

const ImagesArg = z.preprocess(parseJsonString, ImagesSchema).optional()
  .describe(
    'Up to 4 embedded PNG, JPEG, or WebP images placed before the state, as base64 data URLs or {"content_type","base64"} objects. Pass with --input images=@images.json. Remote URLs are not accepted.',
  );

/** Arguments for the `ask` method. */
export const AskArgsSchema = z.object({
  state: StateArg,
  questions: z.preprocess(parseJsonString, QuestionsSchema).describe(
    "Map of question id to {type, instructions, criteria}; 1 to 64 questions. Pass with --input questions:json='{...}' or --input questions=@file.json.",
  ),
  images: ImagesArg,
  model: ModelOverrideArg,
  name: InstanceNameSchema,
});

/** Arguments for the `noul` method. */
export const NoulArgsSchema = z.object({
  state: StateArg,
  instructions: InstructionsArg,
  yes: DescriptionSchema.optional().describe(
    "What a yes (value near 1) means.",
  ),
  no: DescriptionSchema.optional().describe("What a no (value near 0) means."),
  images: ImagesArg,
  model: ModelOverrideArg,
  name: InstanceNameSchema,
});

/** Arguments for the `choice` method. */
export const ChoiceArgsSchema = z.object({
  state: StateArg,
  instructions: InstructionsArg,
  criteria: z.preprocess(parseJsonString, ChoiceCriteriaSchema).describe(
    'Options mapped to descriptions (null for none); 2 to 255 options. Pass with --input criteria:json=\'{"a":"...","b":null}\' or --input criteria=@file.json.',
  ),
  images: ImagesArg,
  model: ModelOverrideArg,
  name: InstanceNameSchema,
});

/** Arguments for the `score` method. */
export const ScoreArgsSchema = z.object({
  state: StateArg,
  instructions: InstructionsArg,
  criteria: z.preprocess(parseJsonString, ScoreCriteriaSchema).describe(
    'Ordered level descriptions, lowest first; 2 to 10 levels. Pass with --input criteria:json=\'["Calm","Frustrated","Angry"]\' or --input criteria=@file.json.',
  ),
  images: ImagesArg,
  model: ModelOverrideArg,
  name: InstanceNameSchema,
});

// ---------------------------------------------------------------------------
// Resource schemas
// ---------------------------------------------------------------------------

const EvaluationBase = {
  model: z.string().describe("Model that produced the answer."),
  state: EntrySchema.describe("The state that was evaluated."),
  imageCount: z.number().int().min(1).optional().describe(
    "Number of images sent with the state; the image bytes are not stored.",
  ),
  usage: UsageSchema,
  evaluatedAt: z.iso.datetime(),
};

/** Stored output of `ask`: every question and its answer. */
export const EvaluationSchema = z.object({
  ...EvaluationBase,
  questions: QuestionsSchema,
  answers: z.record(z.string(), AnswerSchema),
});

/** Stored output of `noul`. */
export const NoulResultSchema = z.object({
  ...EvaluationBase,
  instructions: EntrySchema,
  criteria: z.object({
    true: DescriptionSchema.optional(),
    false: DescriptionSchema.optional(),
  }).optional(),
  noul: z.number().describe("Probability of yes, from 0 to 1."),
});

/** Stored output of `choice`. */
export const ChoiceResultSchema = z.object({
  ...EvaluationBase,
  instructions: EntrySchema,
  criteria: z.record(z.string(), DescriptionSchema),
  choice: z.string().describe("The highest-probability option."),
  probabilities: z.record(z.string(), z.number()),
  confidence: z.number(),
});

/** Stored output of `score`. */
export const ScoreResultSchema = z.object({
  ...EvaluationBase,
  instructions: EntrySchema,
  criteria: z.array(DescriptionSchema),
  score: z.number().describe(
    "Probability-weighted level; may fall between levels.",
  ),
  legend: z.record(z.string(), DescriptionSchema),
  probabilities: z.record(z.string(), z.number()),
  confidence: z.number(),
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Context fields used by the evaluation methods. */
export interface EvalContext {
  globalArgs: GlobalArgs;
  logger: ClientLogger;
  signal?: AbortSignal;
  writeResource: (
    specName: string,
    name: string,
    data: Record<string, unknown>,
  ) => Promise<{ name: string }>;
}

/** Run one evaluation and log its outcome. Throws before any data is written. */
async function evaluate(
  context: EvalContext,
  methodName: string,
  state: Entry,
  questions: Record<string, Question>,
  images: Image[] | undefined,
  modelOverride: ClefModel | undefined,
): Promise<ClefResponse> {
  const model = modelOverride ?? context.globalArgs.model ?? DEFAULT_MODEL;
  context.logger.info(
    "Evaluating {count} question(s) with {model} via {method}",
    { count: Object.keys(questions).length, model, method: methodName },
  );
  const config = buildClientConfig(
    context.globalArgs,
    context.logger,
    context.signal,
  );
  const response = await runClef(config, { state, model, questions, images });
  context.logger.info(
    "Evaluation complete: {inputTokens} input / {outputTokens} output tokens",
    {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  );
  return response;
}

/** Record how many images accompanied the state, without storing their bytes. */
function imageCountField(
  images: Image[] | undefined,
): { imageCount?: number } {
  return images?.length ? { imageCount: images.length } : {};
}

/** Pull one typed answer out of a response, failing loudly on a type mismatch. */
function answerOfType<T extends Answer["type"]>(
  response: ClefResponse,
  id: string,
  type: T,
): Extract<Answer, { type: T }> {
  const answer = response.answers[id];
  if (answer.type !== type) {
    throw new Error(
      `Clef returned a ${answer.type} answer for question "${id}" but a ${type} was expected`,
    );
  }
  return answer as Extract<Answer, { type: T }>;
}

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

/** Swamp model definition for Cloudflare Clef evaluations. */
export const model = {
  type: "@swamp/cloudflare/clef/decision",
  version: "VERSION_PLACEHOLDER",
  // The pipeline fills in the computed version here too, so this no-op entry
  // always steps an older instance to the current version. A schema change
  // needs a real upgrade entry instead.
  upgrades: [
    {
      toVersion: "VERSION_PLACEHOLDER",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  resources: {
    evaluation: {
      description: "Answers to a batch of questions from the `ask` method",
      schema: EvaluationSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
    noul: {
      description: "Yes/no probability from the `noul` method",
      schema: NoulResultSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
    choice: {
      description: "Selected option and distribution from the `choice` method",
      schema: ChoiceResultSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
    score: {
      description: "Weighted score and distribution from the `score` method",
      schema: ScoreResultSchema,
      lifetime: "infinite",
      garbageCollection: 20,
    },
  },
  checks: {
    "credentials-configured": {
      description:
        "Ensure Cloudflare credentials and an account ID are available from the definition or environment",
      labels: ["policy"],
      execute: async (context: { globalArgs: GlobalArgs }) =>
        await Promise.resolve(checkCredentials(context.globalArgs)),
    },
  },
  methods: {
    ask: {
      description:
        "Evaluate state against a map of typed questions in one request",
      kind: "action",
      arguments: AskArgsSchema,
      execute: async (
        args: z.infer<typeof AskArgsSchema>,
        context: EvalContext,
      ) => {
        const response = await evaluate(
          context,
          "ask",
          args.state,
          args.questions,
          args.images,
          args.model,
        );
        const handle = await context.writeResource(
          "evaluation",
          `evaluation-${args.name}`,
          {
            model: response.model,
            state: args.state,
            ...imageCountField(args.images),
            questions: args.questions,
            answers: response.answers,
            usage: response.usage,
            evaluatedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    noul: {
      description: "Ask one yes/no question; stores the probability of yes",
      kind: "action",
      arguments: NoulArgsSchema,
      execute: async (
        args: z.infer<typeof NoulArgsSchema>,
        context: EvalContext,
      ) => {
        const criteria = args.yes !== undefined || args.no !== undefined
          ? {
            ...(args.yes !== undefined ? { true: args.yes } : {}),
            ...(args.no !== undefined ? { false: args.no } : {}),
          }
          : undefined;
        const question: Question = {
          type: "noul",
          instructions: args.instructions,
          ...(criteria ? { criteria } : {}),
        };
        const response = await evaluate(
          context,
          "noul",
          args.state,
          { answer: question },
          args.images,
          args.model,
        );
        const answer = answerOfType(response, "answer", "noul");
        const handle = await context.writeResource(
          "noul",
          `noul-${args.name}`,
          {
            model: response.model,
            state: args.state,
            ...imageCountField(args.images),
            instructions: args.instructions,
            ...(criteria ? { criteria } : {}),
            noul: answer.noul,
            usage: response.usage,
            evaluatedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    choice: {
      description:
        "Pick one option from a defined set; stores the choice, probabilities, and confidence",
      kind: "action",
      arguments: ChoiceArgsSchema,
      execute: async (
        args: z.infer<typeof ChoiceArgsSchema>,
        context: EvalContext,
      ) => {
        const question: Question = {
          type: "choice",
          instructions: args.instructions,
          criteria: args.criteria,
        };
        const response = await evaluate(
          context,
          "choice",
          args.state,
          { answer: question },
          args.images,
          args.model,
        );
        const answer = answerOfType(response, "answer", "choice");
        const handle = await context.writeResource(
          "choice",
          `choice-${args.name}`,
          {
            model: response.model,
            state: args.state,
            ...imageCountField(args.images),
            instructions: args.instructions,
            criteria: args.criteria,
            choice: answer.choice,
            probabilities: answer.probabilities,
            confidence: answer.confidence,
            usage: response.usage,
            evaluatedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
    score: {
      description:
        "Rate state along ordered levels; stores the weighted score, legend, probabilities, and confidence",
      kind: "action",
      arguments: ScoreArgsSchema,
      execute: async (
        args: z.infer<typeof ScoreArgsSchema>,
        context: EvalContext,
      ) => {
        const question: Question = {
          type: "score",
          instructions: args.instructions,
          criteria: args.criteria,
        };
        const response = await evaluate(
          context,
          "score",
          args.state,
          { answer: question },
          args.images,
          args.model,
        );
        const answer = answerOfType(response, "answer", "score");
        const handle = await context.writeResource(
          "score",
          `score-${args.name}`,
          {
            model: response.model,
            state: args.state,
            ...imageCountField(args.images),
            instructions: args.instructions,
            criteria: args.criteria,
            score: answer.score,
            legend: answer.legend,
            probabilities: answer.probabilities,
            confidence: answer.confidence,
            usage: response.usage,
            evaluatedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
