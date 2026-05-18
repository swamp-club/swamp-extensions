import { assertSnapshot } from "@std/testing/snapshot";
import { assertEquals } from "@std/assert";
import { generateZodSchemas } from "./zodGenerator.ts";
import type { CfProperty, CfSchema, OnlyProperties } from "./schema/types.ts";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Minimal CfSchema with sensible defaults for testing. */
function makeCfSchema(
  overrides: Partial<CfSchema> & { properties: Record<string, CfProperty> },
): CfSchema {
  return {
    typeName: "AWS::Test::Resource",
    description: "Test resource",
    primaryIdentifier: ["/properties/Id"],
    ...overrides,
  };
}

/** Minimal OnlyProperties with sensible defaults. */
function makeOnlyProperties(
  overrides?: Partial<OnlyProperties>,
): OnlyProperties {
  return {
    createOnly: [],
    readOnly: [],
    writeOnly: [],
    primaryIdentifier: ["Id"],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// 1. Snapshot: simple string property (required)
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - simple string property (required)", async (t) => {
  const props: Record<string, CfProperty> = {
    Name: { type: "string" },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Name"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 2. Snapshot: string with enum
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - string with enum", async (t) => {
  const props: Record<string, CfProperty> = {
    Status: { type: "string", enum: ["ACTIVE", "INACTIVE", "PENDING"] },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Status"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 3. Snapshot: string with constraints (minLength, maxLength, pattern)
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - string with constraints", async (t) => {
  const props: Record<string, CfProperty> = {
    BucketName: {
      type: "string",
      minLength: 3,
      maxLength: 63,
      pattern: "^[a-z0-9][a-z0-9.-]*[a-z0-9]$",
    },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["BucketName"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 4. Snapshot: number with min/max
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - number with min/max", async (t) => {
  const props: Record<string, CfProperty> = {
    Port: { type: "number", minimum: 1, maximum: 65535 },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Port"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 5. Snapshot: integer property
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - integer property", async (t) => {
  const props: Record<string, CfProperty> = {
    Count: { type: "integer", minimum: 0, maximum: 100 },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Count"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 6. Snapshot: boolean property
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - boolean property", async (t) => {
  const props: Record<string, CfProperty> = {
    Enabled: { type: "boolean" },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Enabled"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 7. Snapshot: array of strings
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - array of strings", async (t) => {
  const props: Record<string, CfProperty> = {
    Tags: { type: "array", items: { type: "string" } },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Tags"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 8. Snapshot: nested object
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - nested object", async (t) => {
  const props: Record<string, CfProperty> = {
    Config: {
      type: "object",
      properties: {
        Memory: { type: "integer" },
        Cpu: { type: "number" },
      },
    },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Config"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 9. Snapshot: required vs optional fields
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - required vs optional fields", async (t) => {
  const props: Record<string, CfProperty> = {
    Name: { type: "string" },
    Description: { type: "string" },
    Priority: { type: "integer" },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["Name"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 10. Snapshot: property with description
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - property with description", async (t) => {
  const props: Record<string, CfProperty> = {
    RoleName: {
      type: "string",
      description: "The name of the IAM role",
    },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["RoleName"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 11. Snapshot: multiple domain + resource properties (full vs simplified)
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - domain full fidelity vs resource simplified", async (t) => {
  const domainProps: Record<string, CfProperty> = {
    Name: {
      type: "string",
      minLength: 1,
      maxLength: 128,
      pattern: "^[a-zA-Z0-9_-]+$",
      description: "The resource name",
    },
    Port: { type: "integer", minimum: 1, maximum: 65535 },
    Protocol: { type: "string", enum: ["TCP", "UDP", "HTTP"] },
  };
  const resourceProps: Record<string, CfProperty> = {
    Id: { type: "string" },
    Name: { type: "string" },
    Port: { type: "integer" },
    Protocol: { type: "string" },
    Arn: { type: "string" },
  };
  const cfSchema = makeCfSchema({
    properties: { ...domainProps, ...resourceProps },
    required: ["Name", "Port"],
  });
  const onlyProps = makeOnlyProperties({
    primaryIdentifier: ["Id"],
    readOnly: ["Id", "Arn"],
  });
  const result = generateZodSchemas(
    domainProps,
    resourceProps,
    cfSchema,
    onlyProps,
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 12. Snapshot: extracted schemas (nested object with title at depth > 0)
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - extracted schemas from titled nested objects", async (t) => {
  const props: Record<string, CfProperty> = {
    BlockDeviceMapping: {
      type: "object",
      title: "BlockDeviceMapping",
      properties: {
        DeviceName: { type: "string" },
        VolumeSize: { type: "integer" },
      },
    },
  };
  // To trigger extraction, the titled object must appear as a nested property
  // inside a top-level array item (depth > 0).
  const domainProps: Record<string, CfProperty> = {
    Mappings: {
      type: "array",
      items: {
        type: "object",
        title: "BlockDeviceMapping",
        properties: {
          DeviceName: { type: "string" },
          VolumeSize: { type: "integer" },
        },
      } as CfProperty,
    },
  };
  const cfSchema = makeCfSchema({
    properties: { ...props, Mappings: domainProps.Mappings },
    required: ["Mappings"],
  });
  const result = generateZodSchemas(
    domainProps,
    domainProps,
    cfSchema,
    makeOnlyProperties(),
  );
  await assertSnapshot(t, result);
});

// ---------------------------------------------------------------------------
// 13. Unit test: maxDepth truncates deeply nested schemas
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - maxDepth truncates at specified depth", () => {
  // Build a 4-level deep schema: top → level1 → level2 → level3
  const props: Record<string, CfProperty> = {
    top: {
      type: "object",
      properties: {
        level1: {
          type: "object",
          properties: {
            level2: {
              type: "object",
              properties: {
                level3: { type: "string" },
              },
            },
          },
        },
      },
    },
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["top"],
  });

  // With maxDepth: 2, depth 0 (top) and depth 1 (level1) are generated,
  // but depth 2 (level2) should be z.unknown()
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
    { maxDepth: 2 },
  );

  // Input schema should contain level1 but level2 should be z.unknown()
  assertEquals(result.inputSchemaBody.includes("level1"), true);
  assertEquals(result.inputSchemaBody.includes("z.unknown()"), true);
  // level3 should NOT appear since it's beyond maxDepth
  assertEquals(result.inputSchemaBody.includes("level3"), false);

  // Without maxDepth, level3 should appear
  const fullResult = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );
  assertEquals(fullResult.inputSchemaBody.includes("level3"), true);
  assertEquals(fullResult.inputSchemaBody.includes("z.unknown()"), false);
});

// ---------------------------------------------------------------------------
// 14. Unit test: JSON type — string for inputs, union for resource state
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - json type: string for inputs, union for resource state", () => {
  const props: Record<string, CfProperty> = {
    PolicyDocument: { type: "json" } as unknown as CfProperty,
  };
  const cfSchema = makeCfSchema({
    properties: props,
    required: ["PolicyDocument"],
  });
  const result = generateZodSchemas(
    props,
    props,
    cfSchema,
    makeOnlyProperties(),
  );

  // Input schema keeps z.string() — users supply JSON as a string
  assertEquals(result.inputSchemaBody.includes("z.string()"), true);
  assertEquals(result.inputSchemaBody.includes("z.record"), false);

  // Resource schema uses a union — AWS CloudControl returns parsed objects
  assertEquals(
    result.resourceSchemaBody.includes(
      "z.union([z.string(), z.record(z.string(), z.unknown())])",
    ),
    true,
  );

  // No extracted schemas for a simple json property
  assertEquals(result.extractedSchemas.length, 0);
});
