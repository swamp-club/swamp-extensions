import { assert, assertEquals } from "jsr:@std/assert@1.0.19";
import fc from "npm:fast-check@3.23.2";
import {
  generateRounds,
  type InputContext,
  isToolPathField,
  type JsonSchema,
  runSchema,
  valueFor,
} from "./inputs.ts";

const ctx: InputContext = {
  stubPath: "/box/bin/probe-stub",
  samplePath: "/box/tmp/sample.txt",
  scratchDir: "/box/tmp/scratch",
};

// The argument schemas `swamp behavior type describe` reported for stef.
const stefGlobal: JsonSchema = {
  type: "object",
  properties: {
    textType: { type: "string", enum: ["procedural", "descriptive"] },
    maxWords: {
      type: "integer",
      exclusiveMinimum: 0,
      maximum: 9007199254740991,
    },
    claudePath: { type: "string", default: "claude" },
    model: { type: "string", default: "claude-opus-5" },
  },
};
const stefLint: JsonSchema = {
  type: "object",
  properties: {
    text: { type: "string" },
    path: { type: "string" },
    session: { default: "latest", type: "string", minLength: 1 },
  },
  additionalProperties: false,
} as JsonSchema;

Deno.test("tool-path fields are recognised; file and dir paths are not", () => {
  for (
    const n of [
      "claudePath",
      "gitBin",
      "command",
      "dockerExecutable",
      "claude_path",
      "docker_bin",
      "CLAUDE-PATH",
    ]
  ) {
    assert(isToolPathField(n), n);
  }
  for (
    const n of [
      "path",
      "filePath",
      "outputPath",
      "configPath",
      "text",
      "file_path",
      "output_dir",
    ]
  ) {
    assert(!isToolPathField(n), n);
  }
});

Deno.test("every round points tool paths at the stub, even the empty one", () => {
  const rounds = generateRounds(runSchema(stefGlobal, stefLint), ctx);
  assertEquals(rounds.map((r) => r.round), [
    "empty",
    "required",
    "all",
    "no-paths",
    "no-prose",
    "boundary",
  ]);
  for (const r of rounds) {
    assertEquals(r.inputs.claudePath, ctx.stubPath, r.round);
    assertEquals(r.stubbed, ["claudePath"], r.round);
  }
  assertEquals(Object.keys(rounds[0].inputs), ["claudePath"]);
});

Deno.test("the all round fills stef's text so lint can run", () => {
  const all = generateRounds(runSchema(stefGlobal, stefLint), ctx)[2];
  assertEquals(typeof all.inputs.text, "string");
  assertEquals(all.inputs.path, ctx.samplePath);
  assertEquals(all.inputs.session, "latest");
  assertEquals(all.inputs.textType, "procedural");
  assertEquals(all.inputs.maxWords, 1);
});

Deno.test("the boundary round picks edges", () => {
  const b = generateRounds(runSchema(stefGlobal, stefLint), ctx)[5];
  assertEquals(b.inputs.textType, "descriptive");
  assertEquals(b.inputs.maxWords, 1);
  assertEquals(b.inputs.session, "a");
});

Deno.test("required round fills only required fields", () => {
  const s: JsonSchema = {
    type: "object",
    properties: { region: { type: "string" }, url: { type: "string" } },
    required: ["region"],
  };
  assertEquals(generateRounds(s, ctx)[1].inputs, { region: "us-east-1" });
});

Deno.test("property: generated values respect enum, bounds and minLength", () => {
  const schema = fc.oneof(
    fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 })
      .map((e) => ({ type: "string", enum: e }) as JsonSchema),
    fc.tuple(fc.integer({ min: -1000, max: 1000 }), fc.nat(1000)).map((
      [lo, span],
    ) => ({ type: "integer", minimum: lo, maximum: lo + span }) as JsonSchema),
    fc.nat(20).map((n) => ({ type: "string", minLength: n }) as JsonSchema),
  );
  fc.assert(
    fc.property(schema, fc.boolean(), (s, edge) => {
      const v = valueFor("field", s, ctx, edge);
      if (s.enum) return s.enum.includes(v);
      if (s.type === "integer") {
        return typeof v === "number" && Number.isInteger(v) &&
          v >= s.minimum! && v <= s.maximum!;
      }
      return typeof v === "string" && v.length >= (s.minLength ?? 0);
    }),
  );
});

Deno.test("no-paths and no-prose split stef's text-or-path alternative", () => {
  const rounds = generateRounds(runSchema(stefGlobal, stefLint), ctx);
  const noPaths = rounds.find((r) => r.round === "no-paths")!.inputs;
  const noProse = rounds.find((r) => r.round === "no-prose")!.inputs;
  assertEquals(typeof noPaths.text, "string");
  assertEquals("path" in noPaths, false);
  assertEquals(noProse.path, ctx.samplePath);
  assertEquals("text" in noProse, false);
});

Deno.test("list items are named after the list; sensitive fields are never set", () => {
  const s: JsonSchema = {
    type: "object",
    properties: {
      urls: { type: "array", items: { type: "string" } },
      apiKey: { type: "string", sensitive: true, default: "" },
    },
    required: ["urls", "apiKey"],
  };
  for (const r of generateRounds(s, ctx)) {
    assertEquals("apiKey" in r.inputs, false, r.round);
  }
  assertEquals(generateRounds(s, ctx)[1].inputs.urls, [
    "https://example.com/probe",
  ]);
});
