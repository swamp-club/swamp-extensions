import { assertEquals, assertStringIncludes, assertThrows } from "@std/assert";
import {
  createRequiredProperties,
  globalArgsRequiredProperties,
} from "./pipeline.ts";
import { generateZodSchemas } from "../shared/zodGenerator.ts";
import type { CfProperty, CfSchema } from "../shared/schema/types.ts";

const domain: Record<string, CfProperty> = {
  RouteTableId: { type: "string" },
  DestinationCidrBlock: { type: "string" },
  Config: {
    type: "object",
    properties: { Mode: { type: "string" }, Note: { type: "string" } },
    required: ["Mode"],
  } as CfProperty,
};

function schema(required: string[]): CfSchema {
  return {
    typeName: "AWS::Test::Thing",
    description: "test",
    primaryIdentifier: ["/properties/RouteTableId"],
    required,
    properties: { ...domain, Arn: { type: "string" } },
  } as CfSchema;
}

Deno.test("createRequiredProperties - keeps only sent properties, sorted", () => {
  assertEquals(
    createRequiredProperties(
      schema(["RouteTableId", "Arn", "Config"]),
      domain,
    ),
    ["Config", "RouteTableId"],
  );
  assertEquals(createRequiredProperties(schema([]), domain), []);
  assertEquals(
    createRequiredProperties({ ...schema([]), required: undefined }, domain),
    [],
  );
});

Deno.test("globalArgsRequiredProperties - keeps a writable naming field", () => {
  assertEquals(
    globalArgsRequiredProperties(
      ["Config", "RouteTableId"],
      domain,
      "RouteTableId",
      false,
    ),
    ["RouteTableId"],
  );
});

Deno.test("globalArgsRequiredProperties - synthetic name keeps nothing", () => {
  assertEquals(
    globalArgsRequiredProperties(
      ["Config", "RouteTableId"],
      domain,
      "name",
      true,
    ),
    [],
  );
});

Deno.test("globalArgsRequiredProperties - keeps enrichment-declared globals that create requires", () => {
  assertEquals(
    globalArgsRequiredProperties(
      ["Config", "RouteTableId"],
      domain,
      "name",
      true,
      ["Config", "DestinationCidrBlock"],
    ),
    ["Config"],
  );
});

Deno.test("globalArgsRequiredProperties - rejects an unknown declared global", () => {
  assertThrows(
    () => globalArgsRequiredProperties([], domain, "name", true, ["Typo"]),
    Error,
    `requiredGlobalArgs names "Typo"`,
  );
});

Deno.test("reduced required list makes create-only fields optional and leaves nested required alone", () => {
  const cf = schema(["RouteTableId", "Config"]);
  const createRequired = createRequiredProperties(cf, domain);
  const kept = globalArgsRequiredProperties(
    createRequired,
    domain,
    "DestinationCidrBlock",
    false,
  );
  assertEquals(kept, []);
  const reduced = generateZodSchemas(domain, {}, { ...cf, required: kept }, {
    primaryIdentifier: ["RouteTableId"],
    readOnly: [],
    writeOnly: [],
    createOnly: [],
  });
  const full = generateZodSchemas(domain, {}, cf, {
    primaryIdentifier: ["RouteTableId"],
    readOnly: [],
    writeOnly: [],
    createOnly: [],
  });
  const line = (body: string, name: string) =>
    body.split("\n").find((l) => l.startsWith(`  ${name}:`)) ?? "";
  // Top level: required before, optional after.
  assertEquals(
    line(full.inputSchemaBody, "RouteTableId").endsWith(".optional(),"),
    false,
  );
  assertStringIncludes(
    line(reduced.inputSchemaBody, "RouteTableId"),
    ".optional(),",
  );
  // Nested object required lists are untouched.
  assertEquals(
    reduced.extractedSchemas.map((s) => s.declaration),
    full.extractedSchemas.map((s) => s.declaration),
  );
  assertStringIncludes(
    line(reduced.inputSchemaBody, "Config").replace(/\.optional\(\),$/, ""),
    line(full.inputSchemaBody, "Config").replace(/\.optional\(\),$/, "")
      .replace(/,$/, ""),
  );
});
