import { assert, assertEquals, assertThrows } from "@std/assert";
import { matchesServiceFilter, resolveResidualRefs } from "./loader.ts";
import type { CfSchema, RawCfProperty } from "./types.ts";

Deno.test("matchesServiceFilter - matches the service segment exactly", () => {
  assertEquals(matchesServiceFilter("AWS::Events::EventBus", ["events"]), true);
  assertEquals(matchesServiceFilter("AWS::EC2::Instance", ["EC2"]), true);
  assertEquals(
    matchesServiceFilter("AWS::Bedrock::KnowledgeBase", ["ec2", "bedrock"]),
    true,
  );
});

Deno.test("matchesServiceFilter - ignores substrings of other segments", () => {
  assertEquals(
    matchesServiceFilter("AWS::RDS::EventSubscription", ["events"]),
    false,
  );
  assertEquals(
    matchesServiceFilter("AWS::Lambda::EventSourceMapping", ["events"]),
    false,
  );
  assertEquals(
    matchesServiceFilter("AWS::BedrockAgentCore::Runtime", ["bedrock"]),
    false,
  );
  assertEquals(
    matchesServiceFilter("AWS::EventSchemas::Schema", ["events"]),
    false,
  );
});

/**
 * Shaped like AWS::Budgets::Budget after dereferencing with
 * `circular: "ignore"`: Budget points at BudgetData, which reaches the
 * self-recursive Expression, so the parser leaves those refs in place.
 */
function budgetShapedSchema(): CfSchema {
  return {
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
          },
          FilterExpression: { $ref: "#/definitions/Expression" },
        },
        required: ["BudgetType"],
      },
      Expression: {
        type: "object",
        properties: {
          Not: { $ref: "#/definitions/Expression" },
          Or: { type: "array", items: { $ref: "#/definitions/Expression" } },
          Tags: { type: "array", items: { type: "string" } },
        },
      },
    },
    properties: {
      Budget: { $ref: "#/definitions/BudgetData", description: "The budget" },
      Id: { type: "string" },
    },
    required: ["Budget"],
  } as unknown as CfSchema;
}

/** Walks `properties` by name, e.g. child(budget, "BudgetLimit", "Amount"). */
function child(node: unknown, ...names: string[]): RawCfProperty {
  let current = node as RawCfProperty;
  for (const name of names) current = current.properties![name];
  return current;
}

function hasRef(node: unknown): boolean {
  if (typeof node !== "object" || node === null) return false;
  if ("$ref" in node) return true;
  return Object.values(node).some(hasRef);
}

Deno.test("resolveResidualRefs - inlines a ref the parser left in place", () => {
  const resolved = resolveResidualRefs(budgetShapedSchema());
  const budget = child(resolved.properties.Budget);
  assertEquals(budget.type, "object");
  assertEquals(budget.title, "BudgetData");
  assertEquals(budget.description, "The budget");
  assertEquals(budget.required, ["BudgetType"]);
  assertEquals(child(budget, "BudgetLimit", "Amount").type, "number");
  const expression = child(budget, "FilterExpression");
  assertEquals(expression.title, "Expression");
  assertEquals(Object.keys(expression.properties!), ["Not", "Or", "Tags"]);
});

Deno.test("resolveResidualRefs - cuts a true cycle to a free-form object", () => {
  const resolved = resolveResidualRefs(budgetShapedSchema());
  const expression = child(resolved.properties.Budget, "FilterExpression");
  assertEquals(child(expression, "Not"), {
    type: "object",
    title: "Expression",
  });
  assertEquals(child(expression, "Or").items, {
    type: "object",
    title: "Expression",
  });
  assert(!hasRef(resolved.properties));
});

Deno.test("resolveResidualRefs - leaves the input schema unchanged", () => {
  const schema = budgetShapedSchema();
  const before = JSON.stringify(schema);
  resolveResidualRefs(schema);
  assertEquals(JSON.stringify(schema), before);
});

Deno.test("resolveResidualRefs - rejects missing and non-local refs", () => {
  const missing = budgetShapedSchema();
  missing.properties.Budget = { $ref: "#/definitions/Nope" } as never;
  assertThrows(
    () => resolveResidualRefs(missing),
    Error,
    "missing definition Nope",
  );

  const remote = budgetShapedSchema();
  remote.properties.Budget = { $ref: "other.json#/x" } as never;
  assertThrows(() => resolveResidualRefs(remote), Error, "unsupported $ref");
});
