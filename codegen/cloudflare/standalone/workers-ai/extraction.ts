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
 * Swamp model for Cloudflare's Clairic extraction model on Workers AI.
 *
 * Sends text (and optional images) plus a map of typed fields to Clairic and
 * stores the typed answers as a swamp resource. Each answer's `value` is null
 * when the input does not determine it, so workflows can branch on presence
 * as well as content, for example
 * `data.latest("<model>", "extraction-latest").attributes.answers.total.value != null`.
 *
 * Clairic is in preview. Field specs and answers pass through keys this model
 * does not know yet, so additions to the preview API are not dropped.
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

/** Clairic model selectors accepted in the request body. */
export const CLAIRIC_MODELS = ["clairic"] as const;

/** One of {@link CLAIRIC_MODELS}. */
export type ClairicModel = (typeof CLAIRIC_MODELS)[number];

/** The default Clairic model. */
export const DEFAULT_MODEL: ClairicModel = "clairic";

/** Field types Clairic can extract. */
export const FIELD_TYPES = [
  "text",
  "number",
  "date",
  "time",
  "datetime",
  "duration",
  "list",
  "estimate",
  "forecast",
] as const;

// ---------------------------------------------------------------------------
// Request schemas
// ---------------------------------------------------------------------------

const BoundSchema = z.union([z.number(), z.string().min(1)]).describe(
  "A number, or an ISO date for date estimates.",
);

/** One typed field to extract. */
export const FieldSpecSchema = z.object({
  type: z.enum(FIELD_TYPES),
  instructions: z.string().min(1).optional().describe(
    "What the field should contain.",
  ),
  unit: z.string().min(1).optional().describe(
    "Unit label. For durations: seconds, minutes, hours, days, weeks, months, or years (default seconds).",
  ),
  integer: z.boolean().optional().describe("Numbers and durations only."),
  decimals: z.number().int().min(0).max(6).optional().describe(
    "Numbers, durations, and number lists only.",
  ),
  items: z.enum(["text", "number", "date"]).optional().describe(
    "Item type; required for list fields.",
  ),
  min: BoundSchema.optional().describe(
    "Lower bound; required for estimate and forecast fields.",
  ),
  max: BoundSchema.optional().describe(
    "Upper bound; required for estimate and forecast fields.",
  ),
  step: z.union([z.number().positive(), z.enum(["month", "year"])]).optional()
    .describe(
      "Estimate grid: a positive number (days for date estimates), or 'month' / 'year'.",
    ),
  scale: z.enum(["linear", "log"]).optional(),
  null_threshold: z.number().gt(0).max(1).optional().describe(
    "Probability of null above which the value is null (default 0.5).",
  ),
  horizon: z.number().int().min(1).max(64).optional().describe(
    "Forecast only: number of steps.",
  ),
  interval: z.enum([
    "step",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "quarter",
    "year",
  ]).optional().describe("Forecast only."),
}).loose().superRefine((field, ctx) => {
  if (field.type === "list" && field.items === undefined) {
    ctx.addIssue({
      code: "custom",
      message: "list fields require items (text, number, or date)",
      path: ["items"],
    });
  }
  if (
    (field.type === "estimate" || field.type === "forecast") &&
    (field.min === undefined || field.max === undefined)
  ) {
    ctx.addIssue({
      code: "custom",
      message: `${field.type} fields require min and max`,
      path: ["min"],
    });
  }
});

/** Resolved type of {@link FieldSpecSchema}. */
export type FieldSpec = z.infer<typeof FieldSpecSchema>;

const FIELD_NAME = /^[A-Za-z_][A-Za-z0-9_.-]{0,63}$/;

/** A non-empty map of field name to field spec. */
export const FieldsSchema = z.record(
  z.string().regex(FIELD_NAME, {
    message:
      "field names start with a letter or '_' and may use letters, digits, '_', '.', '-' (max 64 chars)",
  }),
  FieldSpecSchema,
).refine((f) => Object.keys(f).length >= 1, {
  message: "at least one field is required",
});

/** Resolved type of {@link FieldsSchema}. */
export type Fields = z.infer<typeof FieldsSchema>;

// ---------------------------------------------------------------------------
// Response schemas
// ---------------------------------------------------------------------------

const SpanSchema = z.array(z.number().int());

/** One extracted answer; `value` is null when the input does not determine it. */
export const ExtractionAnswerSchema = z.object({
  type: z.string(),
  value: z.unknown().describe(
    "The extracted value, or null when the input does not determine it.",
  ),
  guess: z.unknown().optional().describe(
    "Best guess even when value is null.",
  ),
  p_null: z.number().optional().describe(
    "Probability that the input does not determine the value.",
  ),
  confidence: z.number().optional(),
  span: SpanSchema.optional().describe(
    "Character offsets of a text answer in the state.",
  ),
  spans: z.array(SpanSchema).optional().describe(
    "Character offsets of each list item in the state.",
  ),
  mean: z.unknown().optional(),
  median: z.unknown().optional(),
  p10: z.unknown().optional(),
  p90: z.unknown().optional(),
  p_below: z.number().optional(),
  p_above: z.number().optional(),
  quantiles: z.array(z.unknown()).optional(),
  steps: z.array(z.unknown()).optional().describe(
    "Forecast only: one estimate per step.",
  ),
}).loose();

/** Resolved type of {@link ExtractionAnswerSchema}. */
export type ExtractionAnswer = z.infer<typeof ExtractionAnswerSchema>;

/** Token usage reported for one request. */
export const ExtractionUsageSchema = z.object({
  input_tokens: z.number().int().nonnegative(),
  output_tokens: z.number().int().nonnegative(),
  state_tokens: z.number().int().nonnegative().optional(),
  image_tokens: z.number().int().nonnegative().optional(),
  schema_tokens: z.number().int().nonnegative().optional(),
  passes: z.number().int().nonnegative().optional().describe(
    "Parallel passes the fields were split across.",
  ),
}).loose();

/** The extraction result inside Cloudflare's envelope. */
export const ClairicResponseSchema = z.object({
  model: z.string(),
  answers: z.record(z.string(), ExtractionAnswerSchema),
  truncated: z.boolean(),
  state_text: z.string().optional(),
  usage: ExtractionUsageSchema,
});

/** Resolved type of {@link ClairicResponseSchema}. */
export type ClairicResponse = z.infer<typeof ClairicResponseSchema>;

/** Body of a Clairic `ai/run` request. */
export interface ClairicRequest {
  model: ClairicModel;
  state: string;
  fields: Fields;
  images?: Image[];
  referenceDate?: string;
  includeQuantiles?: boolean;
  returnStateText?: boolean;
}

/**
 * Extract `fields` from `state` with Clairic.
 *
 * @returns The validated result with one answer per field.
 */
export async function runClairic(
  config: ClientConfig,
  request: ClairicRequest,
): Promise<ClairicResponse> {
  const options = {
    ...(request.includeQuantiles ? { include_quantiles: true } : {}),
    ...(request.returnStateText ? { return_state_text: true } : {}),
  };
  const response = await runModel(
    config,
    request.model,
    {
      model: request.model,
      state: request.state,
      fields: request.fields,
      ...(request.images?.length ? { images: request.images } : {}),
      ...(request.referenceDate
        ? { reference_date: request.referenceDate }
        : {}),
      ...(Object.keys(options).length > 0 ? { options } : {}),
    },
    ClairicResponseSchema,
    "Clairic extraction",
  );
  assertAllAnswered(
    "Clairic extraction",
    Object.keys(request.fields),
    response.answers,
  );
  return response;
}

// ---------------------------------------------------------------------------
// Arguments
// ---------------------------------------------------------------------------

/** Connection settings shared by every method on a definition. */
export const GlobalArgsSchema = z.object({
  ...ConnectionArgsShape,
  model: z.enum(CLAIRIC_MODELS).default(DEFAULT_MODEL).describe(
    "Clairic model that extracts the fields.",
  ),
});

/** Resolved type of {@link GlobalArgsSchema}. */
export type GlobalArgs = z.infer<typeof GlobalArgsSchema>;

/** Arguments for the `extract` method. */
export const ExtractArgsSchema = z.object({
  state: z.string().default("").describe(
    "The text to read and extract from. May be empty only when images are sent. Text answers are spans of this string.",
  ),
  fields: z.preprocess(parseJsonString, FieldsSchema).describe(
    "Map of field name to {type, instructions, ...}. Pass with --input fields:json='{...}' or --input fields=@fields.json.",
  ),
  images: z.preprocess(parseJsonString, ImagesSchema).optional().describe(
    'Up to 4 embedded PNG, JPEG, or WebP images placed before the state, as base64 data URLs or {"content_type","base64"} objects. Pass with --input images=@images.json. Remote URLs are not accepted.',
  ),
  referenceDate: z.iso.date().optional().describe(
    "ISO date (YYYY-MM-DD) that anchors dates written without a year.",
  ),
  includeQuantiles: z.boolean().default(false).describe(
    "Add 99 percentiles to estimate answers.",
  ),
  returnStateText: z.boolean().default(false).describe(
    "Store the text that answer spans index into as stateText.",
  ),
  name: z.string().regex(/^[a-z0-9][a-z0-9_-]{0,62}$/, {
    message: "name must be lowercase alphanumeric with hyphens or underscores",
  }).default("latest").describe(
    "Suffix for the stored resource instance, so several extractions can coexist. Defaults to 'latest'.",
  ),
}).refine((a) => a.state.length > 0 || (a.images?.length ?? 0) > 0, {
  message: "state must be non-empty unless images are sent",
  path: ["state"],
});

// ---------------------------------------------------------------------------
// Resource schemas
// ---------------------------------------------------------------------------

/** Stored output of `extract`: every field spec and its answer. */
export const ExtractionSchema = z.object({
  model: z.string().describe("Model that produced the answers."),
  state: z.string().describe("The text that was read."),
  imageCount: z.number().int().min(1).optional().describe(
    "Number of images sent with the state; the image bytes are not stored.",
  ),
  referenceDate: z.string().optional(),
  fields: FieldsSchema,
  answers: z.record(z.string(), ExtractionAnswerSchema),
  truncated: z.boolean().describe(
    "Whether the state was truncated to fit the context window.",
  ),
  stateText: z.string().optional().describe(
    "The text answer spans index into, when returnStateText was set.",
  ),
  usage: ExtractionUsageSchema,
  extractedAt: z.iso.datetime(),
});

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

/** Context fields used by the extraction method. */
export interface ExtractContext {
  globalArgs: GlobalArgs;
  logger: ClientLogger;
  signal?: AbortSignal;
  writeResource: (
    specName: string,
    name: string,
    data: Record<string, unknown>,
  ) => Promise<{ name: string }>;
}

/** Swamp model definition for Cloudflare Clairic extractions. */
export const model = {
  type: "@swamp/cloudflare/clairic/extraction",
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
    extraction: {
      description: "Typed answers for every field from the `extract` method",
      schema: ExtractionSchema,
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
    extract: {
      description:
        "Extract typed fields from text and images; stores each value (null when undetermined) with its confidence",
      kind: "action",
      arguments: ExtractArgsSchema,
      execute: async (
        args: z.infer<typeof ExtractArgsSchema>,
        context: ExtractContext,
      ) => {
        const modelName = context.globalArgs.model ?? DEFAULT_MODEL;
        context.logger.info("Extracting {count} field(s) with {model}", {
          count: Object.keys(args.fields).length,
          model: modelName,
        });
        const config = buildClientConfig(
          context.globalArgs,
          context.logger,
          context.signal,
        );
        const response = await runClairic(config, {
          model: modelName,
          state: args.state,
          fields: args.fields,
          images: args.images,
          referenceDate: args.referenceDate,
          includeQuantiles: args.includeQuantiles,
          returnStateText: args.returnStateText,
        });
        context.logger.info(
          "Extraction complete: {inputTokens} input tokens in {passes} pass(es)",
          {
            inputTokens: response.usage.input_tokens,
            passes: response.usage.passes ?? 1,
          },
        );
        if (response.truncated) {
          context.logger.warning(
            "Clairic truncated the state to fit its context window; answers may miss content near the end",
          );
        }
        const handle = await context.writeResource(
          "extraction",
          `extraction-${args.name}`,
          {
            model: response.model,
            state: args.state,
            ...(args.images?.length ? { imageCount: args.images.length } : {}),
            ...(args.referenceDate
              ? { referenceDate: args.referenceDate }
              : {}),
            fields: args.fields,
            answers: response.answers,
            truncated: response.truncated,
            ...(response.state_text !== undefined
              ? { stateText: response.state_text }
              : {}),
            usage: response.usage,
            extractedAt: new Date().toISOString(),
          },
        );
        return { dataHandles: [handle] };
      },
    },
  },
};
