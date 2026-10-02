import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import {
  checkCoverage,
  generateTailscaleModels,
  globalArgNames,
  normalizeProperty,
  type OApiSpec,
  resolveModels,
} from "./pipeline.ts";
import { generateTailscaleExtensionModel } from "./extensionModelGenerator.ts";
import { extractGlobalArgsFieldNames } from "../shared/upgradesGenerator.ts";
import { entries, fixtureSpec } from "./testFixtures.ts";

function resolved(name: string) {
  const { models, errors } = resolveModels(fixtureSpec(), entries([name]));
  assertEquals(errors, []);
  return models[0];
}

Deno.test("normalizeProperty: OpenAPI 3.1 type arrays become nullable", () => {
  assertEquals(normalizeProperty({ type: ["boolean", "null"] }), {
    type: "boolean",
    nullable: true,
  });
});

Deno.test("normalizeProperty: a single-branch anyOf keeps nullability", () => {
  assertEquals(
    normalizeProperty({ anyOf: [{ type: ["string", "null"] }] }).nullable,
    true,
  );
  assertEquals(
    normalizeProperty({ anyOf: [{ type: "string" }, { type: "null" }] })
      .nullable,
    true,
  );
});

Deno.test("normalizeProperty: scalar anyOf keeps its variants", () => {
  const prop = normalizeProperty({
    anyOf: [{ type: "string" }, { type: "number" }, { type: "boolean" }],
  });
  assertEquals(prop.type, "unknown");
  assertEquals(prop.variants?.map((v) => v.type), [
    "string",
    "number",
    "boolean",
  ]);
});

Deno.test("normalizeProperty: additionalProperties becomes a map", () => {
  const prop = normalizeProperty({
    type: "object",
    additionalProperties: { type: "array", items: { type: "string" } },
  });
  assertEquals(prop.additionalProperties?.type, "array");
});

Deno.test("resolve: auth keys keep only their fields and fix keyType", () => {
  const model = resolved("tailnet_key");
  assertEquals(Object.keys(model.args), [
    "description",
    "capabilities",
    "expirySeconds",
  ]);
  assertEquals(model.secretFields, ["key"]);
  assert(!("key" in model.stateProps), "one-time secret left in state");
});

Deno.test("resolve: webhook list wrapper, secrets and actions", () => {
  const model = resolved("webhook");
  assertEquals(model.listWrapperKey, "webhooks");
  assertEquals(model.createRequired, ["endpointUrl", "subscriptions"]);
  assertEquals(model.updateFields, ["subscriptions"]);
  assertEquals(model.actions.map((a) => a.def.name), ["test", "rotate_secret"]);
  assert(!("secret" in model.stateProps));
});

Deno.test("resolve: keyed service takes its key from the body", () => {
  const model = resolved("service");
  assertEquals(model.requiredArgs, ["name"]);
  assertEquals(model.listWrapperKey, "vipServices");
  const approval = model.actions.find((a) =>
    a.def.name === "set_device_approval"
  );
  assertEquals(Object.keys(approval?.pathArgs ?? {}), ["deviceId"]);
  assertEquals(Object.keys(approval?.bodyFields ?? {}), ["approved"]);
});

Deno.test("resolve: device facets keep only their fields in state", () => {
  const model = resolved("device_tags");
  assertEquals(model.requiredArgs, ["deviceId"]);
  assertEquals(Object.keys(model.stateProps), ["tags"]);
});

Deno.test("resolve: a field missing from the spec is an error", () => {
  const spec = fixtureSpec();
  delete spec.paths!["/tailnet/{tailnet}/keys"].post.requestBody!.content![
    "application/json"
  ].schema!.properties!.expirySeconds;
  const { models, errors } = resolveModels(spec, entries(["tailnet_key"]));
  assertEquals(models, []);
  assertStringIncludes(errors[0], `field "expirySeconds"`);
});

Deno.test("coverage: the fixture spec is fully claimed", () => {
  assertEquals(checkCoverage(fixtureSpec(), entries(), []), []);
});

Deno.test("coverage: an unclaimed spec operation is an error", () => {
  const spec = fixtureSpec();
  spec.paths!["/tailnet/{tailnet}/new-thing"] = {
    get: { responses: {} },
  } as unknown as NonNullable<OApiSpec["paths"]>[string];
  const errors = checkCoverage(spec, entries(), []);
  assertEquals(errors.length, 1);
  assertStringIncludes(errors[0], "GET /tailnet/{tailnet}/new-thing");
  assertStringIncludes(errors[0], "not generated or skipped");
});

Deno.test("coverage: a claimed or skipped path missing from the spec is an error", () => {
  const spec = fixtureSpec();
  delete spec.paths!["/webhooks/{endpointId}/test"];
  const errors = checkCoverage(spec, entries(), [
    { method: "GET", path: "/gone" },
  ]);
  assertEquals(errors.sort(), [
    "coverage: GET /gone is in the skip list but not the spec",
    "coverage: POST /webhooks/{endpointId}/test is in the resource table but not the spec",
  ]);
});

Deno.test("generated GlobalArgsSchema field names match upgrade diffing", () => {
  const { models } = resolveModels(fixtureSpec(), entries());
  for (const model of models) {
    const code = generateTailscaleExtensionModel({
      model,
      extensionName: "@swamp/tailscale",
      version: "2026.01.01.1",
    });
    assertEquals(
      extractGlobalArgsFieldNames(code).sort(),
      globalArgNames(model).sort(),
      model.entry.model,
    );
  }
});

Deno.test({
  name: "a model that fails to resolve keeps its file in the manifest",
  // generateTailscaleModels formats candidates with a deno fmt subprocess.
  sanitizeResources: false,
  async fn() {
    const dir = await Deno.makeTempDir();
    try {
      const schemaPath = `${dir}/spec.json`;
      await Deno.writeTextFile(schemaPath, JSON.stringify(fixtureSpec()));
      const outputDir = `${dir}/out`;
      await Deno.mkdir(`${outputDir}/extensions/models`, { recursive: true });
      // log_stream is not in the fixture spec, so it fails to resolve.
      await Deno.writeTextFile(
        `${outputDir}/extensions/models/log_stream.ts`,
        "// previously generated",
      );
      const result = await generateTailscaleModels({ outputDir, schemaPath });
      assert(result.errors.some((e) => e.startsWith("log_stream:")));
      assertStringIncludes(result.manifest.sourceCode, "  - log_stream.ts");
      // A model that was never generated is not invented.
      assert(!result.manifest.sourceCode.includes("  - user.ts"));
    } finally {
      await Deno.remove(dir, { recursive: true });
    }
  },
});
