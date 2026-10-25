import { assertEquals, assertThrows } from "@std/assert";
import {
  assertRequiredPropertiesKept,
  normalizeOnlyProperties,
  splitAwsProperties,
} from "./split.ts";
import type { CfProperty, CfSchema, OnlyProperties } from "./types.ts";

function makeCfSchema(
  properties: Record<string, CfProperty>,
  required?: string[],
): CfSchema {
  return {
    typeName: "AWS::Test::Resource",
    description: "",
    primaryIdentifier: ["/properties/Id"],
    properties,
    required,
  };
}

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

Deno.test("normalizeOnlyProperties - keeps every segment of a nested pointer", () => {
  assertEquals(
    normalizeOnlyProperties([
      "/properties/Name",
      "/properties/Budget/BudgetName",
      "/properties/Treatments/*/Key",
      "/Legacy",
    ]),
    ["Name", "Budget/BudgetName", "Treatments/*/Key", "Legacy"],
  );
  assertEquals(normalizeOnlyProperties(undefined), []);
});

Deno.test("splitAwsProperties - keeps untyped property schemas", () => {
  const schema = makeCfSchema({
    Manifest: {} as CfProperty,
    Roles: {
      patternProperties: { "^.+$": { type: "string" } },
    } as CfProperty,
    Options: {
      properties: { InputParams: { type: "string" } },
    } as CfProperty,
    Id: { type: "string" },
  });
  const { domainProperties, resourceValueProperties } = splitAwsProperties(
    schema,
    makeOnlyProperties({ readOnly: ["Id"] }),
  );
  assertEquals(Object.keys(domainProperties), ["Manifest", "Roles", "Options"]);
  assertEquals(Object.keys(resourceValueProperties), [
    "Manifest",
    "Roles",
    "Options",
    "Id",
  ]);
});

Deno.test("splitAwsProperties - nested readOnly does not prune a same-named top-level property", () => {
  const schema = makeCfSchema({
    Port: { type: "integer" },
    Endpoint: {
      type: "object",
      properties: {
        Address: { type: "string" },
        Port: { type: "string" },
      },
    },
  });
  const { domainProperties } = splitAwsProperties(
    schema,
    makeOnlyProperties({ readOnly: ["Endpoint/Address", "Endpoint/Port"] }),
  );
  assertEquals(Object.keys(domainProperties), ["Port"]);
});

Deno.test("splitAwsProperties - top-level readOnly does not prune a same-named nested property", () => {
  const schema = makeCfSchema({
    Id: { type: "string" },
    Configuration: {
      type: "object",
      properties: {
        Id: { type: "string" },
        Revision: { type: "integer" },
      },
    },
  });
  const { domainProperties } = splitAwsProperties(
    schema,
    makeOnlyProperties({ readOnly: ["Id"] }),
  );
  assertEquals(Object.keys(domainProperties), ["Configuration"]);
  assertEquals(
    Object.keys(
      (domainProperties.Configuration as {
        properties: Record<string, CfProperty>;
      }).properties,
    ),
    ["Id", "Revision"],
  );
});

Deno.test("assertRequiredPropertiesKept - passes when required properties survive", () => {
  const schema = makeCfSchema({ Budget: { type: "string" } }, ["Budget"]);
  assertRequiredPropertiesKept(
    "AWS::Test::Resource",
    schema,
    makeOnlyProperties(),
    { Budget: { type: "string" } },
  );
});

Deno.test("assertRequiredPropertiesKept - throws naming dropped required properties", () => {
  const schema = makeCfSchema(
    { Budget: { type: "string" }, Name: { type: "string" } },
    ["Budget", "Name"],
  );
  assertThrows(
    () =>
      assertRequiredPropertiesKept(
        "AWS::Test::Resource",
        schema,
        makeOnlyProperties(),
        { Name: { type: "string" } },
      ),
    Error,
    "AWS::Test::Resource: required properties dropped by codegen: Budget",
  );
});

Deno.test("assertRequiredPropertiesKept - ignores required properties that are readOnly", () => {
  const schema = makeCfSchema({ Arn: { type: "string" } }, ["Arn"]);
  assertRequiredPropertiesKept(
    "AWS::Test::Resource",
    schema,
    makeOnlyProperties({ readOnly: ["Arn"] }),
    {},
  );
});
