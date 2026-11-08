import { assertSnapshot } from "@std/testing/snapshot";
import { assertEquals, assertStringIncludes } from "@std/assert";
import { generateZodSchemas } from "./zodGenerator.ts";
import { resolveResidualRefs } from "./schema/loader.ts";
import { normalizeOnlyProperties, splitAwsProperties } from "./schema/split.ts";
import type { CfProperty, CfSchema, OnlyProperties } from "./schema/types.ts";
import { z } from "zod";

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
// 14. Unit test: JSON type — record for inputs, union for resource state
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - json type: record for inputs, union for resource state", () => {
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

  // Input schema uses z.record — CloudControl expects JSONObject, not String
  assertEquals(
    result.inputSchemaBody.includes("z.record(z.string(), z.unknown())"),
    true,
  );
  // No bare z.string() — only z.string() inside z.record()
  assertEquals(
    result.inputSchemaBody.includes("PolicyDocument: z.string()"),
    false,
  );

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

// ---------------------------------------------------------------------------
// 15. Unit test: bare object (no properties) — record for both schemas
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - bare object with no properties emits z.record", () => {
  const props: Record<string, CfProperty> = {
    PolicyDocument: { type: "object" } as unknown as CfProperty,
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

  // Input schema: bare object emits z.record, not bare z.string
  assertEquals(
    result.inputSchemaBody.includes("z.record(z.string(), z.unknown())"),
    true,
  );
  assertEquals(
    result.inputSchemaBody.includes("PolicyDocument: z.string()"),
    false,
  );

  // Resource schema: bare object also emits z.record
  assertEquals(
    result.resourceSchemaBody.includes("z.record(z.string(), z.unknown())"),
    true,
  );
  assertEquals(
    result.resourceSchemaBody.includes("PolicyDocument: z.string()"),
    false,
  );

  assertEquals(result.extractedSchemas.length, 0);
});

// ---------------------------------------------------------------------------
// allOf flattening
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - untyped allOf is merged into one property", () => {
  const props = {
    ProtocolType: {
      allOf: [
        { type: "string", enum: ["MCP"], title: "GatewayProtocolType" },
        { default: "MCP" },
      ],
    },
  } as unknown as Record<string, CfProperty>;
  const result = generateZodSchemas(
    props,
    props,
    makeCfSchema({ properties: props }),
    makeOnlyProperties(),
  );
  assertEquals(
    result.inputSchemaBody,
    `  ProtocolType: z.enum(["MCP"]).optional(),`,
  );
});

// ---------------------------------------------------------------------------
// End to end: loader → split → generator (swamp-club #3936, #3943)
// ---------------------------------------------------------------------------

Deno.test("generateZodSchemas - Budget-shaped schema survives resolve, split and generate", () => {
  const raw = {
    typeName: "AWS::Budgets::Budget",
    description: "",
    primaryIdentifier: ["/properties/Id"],
    definitions: {
      BudgetData: {
        type: "object",
        title: "BudgetData",
        properties: {
          BudgetType: { type: "string" },
          BudgetLimit: {
            type: "object",
            title: "Spend",
            properties: { Amount: { type: "number" } },
            required: ["Amount"],
          },
          FilterExpression: { $ref: "#/definitions/Expression" },
        },
        required: ["BudgetType"],
      },
      Expression: {
        type: "object",
        properties: { Not: { $ref: "#/definitions/Expression" } },
      },
    },
    properties: {
      Budget: { $ref: "#/definitions/BudgetData" },
      Settings: {},
      Port: { type: "integer" },
      Endpoint: {
        type: "object",
        properties: { Port: { type: "string" } },
      },
      Id: { type: "string" },
    },
    required: ["Budget"],
    readOnlyProperties: ["/properties/Id", "/properties/Endpoint/Port"],
  } as unknown as CfSchema;

  const cfSchema = resolveResidualRefs(raw);
  const onlyProperties = makeOnlyProperties({
    readOnly: normalizeOnlyProperties(raw.readOnlyProperties),
  });
  const { domainProperties, resourceValueProperties } = splitAwsProperties(
    cfSchema,
    onlyProperties,
  );
  const result = generateZodSchemas(
    domainProperties,
    resourceValueProperties,
    cfSchema,
    onlyProperties,
  );

  assertEquals(Object.keys(domainProperties), ["Budget", "Settings", "Port"]);
  assertStringIncludes(result.inputSchemaBody, "  Budget: z.object({");
  assertStringIncludes(result.inputSchemaBody, "BudgetLimit: SpendSchema");
  assertStringIncludes(
    result.inputSchemaBody,
    "FilterExpression: ExpressionSchema",
  );
  assertStringIncludes(
    result.inputSchemaBody,
    "  Settings: z.unknown().optional(),",
  );
  assertStringIncludes(
    result.inputSchemaBody,
    "  Port: z.number().int().optional(),",
  );
  // Budget is required: its object closes without .optional()
  assertStringIncludes(result.inputSchemaBody, "\n}),\n  Settings:");

  const declarations = result.extractedSchemas.map((s) => s.declaration).join(
    "\n",
  );
  assertStringIncludes(
    declarations,
    "const SpendSchema = z.object({\n  Amount: z.number(),",
  );
  assertStringIncludes(
    declarations,
    "Not: z.record(z.string(), z.unknown()).optional(),",
  );
});

// ---------------------------------------------------------------------------
// StateSchema nested optionality (swamp-club #2487)
// ---------------------------------------------------------------------------

/** EKS-cluster-shaped resource properties, trimmed to the parts #2487 names. */
function eksLikeProperties(): Record<string, CfProperty> {
  return {
    Name: { type: "string" },
    KubernetesNetworkConfig: {
      type: "object",
      properties: {
        ServiceIpv4Cidr: { type: "string" },
        ServiceIpv6Cidr: { type: "string" },
        IpFamily: { type: "string", enum: ["ipv4", "ipv6"] },
      },
    },
    AccessConfig: {
      type: "object",
      properties: {
        BootstrapClusterCreatorAdminPermissions: { type: "boolean" },
        AuthenticationMode: { type: "string" },
      },
    },
    OutpostConfig: {
      type: "object",
      required: ["OutpostArns", "ControlPlaneInstanceType"],
      properties: {
        OutpostArns: { type: "array", items: { type: "string" } },
        ControlPlaneInstanceType: { type: "string" },
      },
    },
    Logging: {
      type: "object",
      properties: {
        ClusterLogging: {
          type: "object",
          title: "ClusterLogging",
          required: ["EnabledTypes"],
          properties: {
            EnabledTypes: {
              type: "array",
              items: {
                type: "object",
                title: "LoggingTypeConfig",
                required: ["Type"],
                properties: {
                  Type: { type: "string", enum: ["api", "audit"] },
                },
              },
            },
          },
        },
      },
    },
  } as unknown as Record<string, CfProperty>;
}

function generateEksLike() {
  const props = eksLikeProperties();
  return generateZodSchemas(
    props,
    props,
    makeCfSchema({
      properties: props,
      primaryIdentifier: ["/properties/Name"],
    }),
    makeOnlyProperties({ primaryIdentifier: ["Name"] }),
  );
}

/** Evaluates the generated extracted schemas + StateSchema with real zod. */
function buildStateSchema(
  result: ReturnType<typeof generateZodSchemas>,
): z.ZodType {
  const code = [
    ...result.extractedSchemas.map((s) => s.declaration),
    `const StateSchema = z.object({\n${result.resourceSchemaBody}\n}).passthrough();`,
    "return StateSchema;",
  ].join("\n");
  return new Function("z", code)(z) as z.ZodType;
}

Deno.test("generateZodSchemas - StateSchema inline nested children are optional (#2487)", () => {
  const result = generateEksLike();
  const body = result.resourceSchemaBody;

  // Every nested object is .partial(), so none of its children is required —
  // including those a CF nested required list names (OutpostConfig).
  assertStringIncludes(
    body,
    "    ServiceIpv6Cidr: z.string(),\n    IpFamily: z.string(),\n  }).partial().optional(),",
  );
  assertStringIncludes(
    body,
    "    BootstrapClusterCreatorAdminPermissions: z.boolean(),\n    AuthenticationMode: z.string(),\n  }).partial().optional(),",
  );
  assertStringIncludes(
    body,
    "    ControlPlaneInstanceType: z.string(),\n  }).partial().optional(),",
  );
  // No nested z.object(...) is left without .partial()
  assertEquals(/\n {2}\}\)(?!\.partial\(\))/.test(body), false);
  // Top-level primary identifier stays required
  assertStringIncludes(body, "  Name: z.string(),");
});

Deno.test("generateZodSchemas - StateSchema array-item inline objects have optional children", () => {
  const props = {
    Id: { type: "string" },
    Rules: {
      type: "array",
      items: {
        type: "object",
        required: ["Action"],
        properties: { Action: { type: "string" } },
      },
    },
  } as unknown as Record<string, CfProperty>;
  const result = generateZodSchemas(
    props,
    props,
    makeCfSchema({ properties: props }),
    makeOnlyProperties(),
  );
  assertStringIncludes(
    result.resourceSchemaBody,
    "Action: z.string(),\n  }).partial()).optional(),",
  );
});

Deno.test("generateZodSchemas - titled nested objects get simplified StateSchema copies (#2487)", () => {
  const result = generateEksLike();
  const byName = new Map(
    result.extractedSchemas.map((s) => [s.name, s.declaration]),
  );

  // Input side is unchanged: required children and enums kept
  assertStringIncludes(
    byName.get("LoggingTypeConfigSchema")!,
    'Type: z.enum(["api", "audit"]),',
  );
  assertStringIncludes(
    byName.get("ClusterLoggingSchema")!,
    "EnabledTypes: z.array(LoggingTypeConfigSchema),",
  );

  // State side: separate, constraint-free, all-optional copies
  assertEquals(
    byName.get("LoggingTypeConfigStateSchema"),
    "const LoggingTypeConfigStateSchema = z.object({\n  Type: z.string(),\n}).partial();",
  );
  assertEquals(
    byName.get("ClusterLoggingStateSchema"),
    "const ClusterLoggingStateSchema = z.object({\n  EnabledTypes: z.array(LoggingTypeConfigStateSchema),\n}).partial();",
  );
  assertStringIncludes(
    result.resourceSchemaBody,
    "ClusterLogging: ClusterLoggingStateSchema,\n  }).partial().optional(),",
  );
  assertEquals(
    result.resourceSchemaBody.includes("ClusterLoggingSchema"),
    false,
  );

  // Declared child-first, so each copy follows the schemas it references
  const names = result.extractedSchemas.map((s) => s.name);
  assertEquals(
    names.indexOf("LoggingTypeConfigStateSchema") <
      names.indexOf("ClusterLoggingStateSchema"),
    true,
  );
});

Deno.test("generateZodSchemas - StateSchema copy names avoid collisions", () => {
  // An input-side title "FooState" extracts as FooStateSchema; the state copy
  // of title "Foo" would otherwise take the same name.
  const props = {
    Id: { type: "string" },
    Wrapper: {
      type: "object",
      properties: {
        A: {
          type: "object",
          title: "FooState",
          properties: { X: { type: "string" } },
        },
        B: {
          type: "object",
          title: "Foo",
          properties: { Y: { type: "string" } },
        },
      },
    },
  } as unknown as Record<string, CfProperty>;
  const result = generateZodSchemas(
    props,
    props,
    makeCfSchema({ properties: props }),
    makeOnlyProperties(),
  );
  const names = result.extractedSchemas.map((s) => s.name);
  assertEquals(new Set(names).size, names.length);
  assertEquals(names.includes("_FooStateSchema"), true);
  assertStringIncludes(result.resourceSchemaBody, "B: _FooStateSchema");
  // Names reserved by the model generators are never taken
  for (const reserved of ["StateSchema", "GlobalArgsSchema", "InputsSchema"]) {
    assertEquals(
      names.filter((n) => n === reserved).length,
      0,
      `${reserved} must not be emitted as an extracted schema`,
    );
  }
});

Deno.test("generateZodSchemas - recursive titled object in StateSchema terminates", () => {
  const node: Record<string, unknown> = {
    type: "object",
    title: "Node",
    properties: { Value: { type: "string" } },
  };
  (node.properties as Record<string, unknown>).Child = node;
  const props = {
    Id: { type: "string" },
    Root: { type: "object", properties: { Node: node } },
  } as unknown as Record<string, CfProperty>;
  const result = generateZodSchemas(
    props,
    props,
    makeCfSchema({ properties: props }),
    makeOnlyProperties(),
  );
  const decl = result.extractedSchemas.find((s) =>
    s.name === "NodeStateSchema"
  )!;
  assertStringIncludes(decl.declaration, "Child: z.unknown(),");
});

Deno.test("generateZodSchemas - EKS DescribeCluster payload parses against StateSchema (#2487)", () => {
  // The payload from the issue: an IPv4 cluster, no Outposts, and no
  // create-only BootstrapClusterCreatorAdminPermissions on read.
  const payload = {
    Name: "demo",
    KubernetesNetworkConfig: {
      ServiceIpv4Cidr: "10.100.0.0/16",
      IpFamily: "ipv4",
    },
    AccessConfig: { AuthenticationMode: "API_AND_CONFIG_MAP" },
    Logging: { ClusterLogging: { EnabledTypes: [{ Type: "authenticator" }] } },
    Unmodelled: "kept by passthrough",
  };
  const parsed = buildStateSchema(generateEksLike()).safeParse(payload);
  assertEquals(parsed.success, true, JSON.stringify(parsed.error?.issues));

  // Negative control: the pre-fix shape (required nested children) rejects the
  // same payload, so this test detects the bug it guards against.
  const preFix = z.object({
    Name: z.string(),
    KubernetesNetworkConfig: z.object({
      ServiceIpv4Cidr: z.string(),
      ServiceIpv6Cidr: z.string(),
      IpFamily: z.string(),
    }).optional(),
    AccessConfig: z.object({
      BootstrapClusterCreatorAdminPermissions: z.boolean(),
      AuthenticationMode: z.string(),
    }).optional(),
  }).passthrough();
  assertEquals(preFix.safeParse(payload).success, false);
});
