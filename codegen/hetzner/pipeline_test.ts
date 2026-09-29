import { assertEquals } from "@std/assert";
import { extractListFilters } from "./pipeline.ts";

Deno.test("extractListFilters: keeps filters, drops pagination/sort/label_selector, sorted by name", () => {
  const spec = {
    components: {
      parameters: {
        arch: {
          name: "architecture",
          in: "query",
          description:
            "Filter resources by cpu architecture.\n\nThe response will only contain matches.\n",
          schema: { type: "string", enum: ["x86", "arm"] },
        },
      },
    },
  };
  const operation = {
    parameters: [
      { name: "sort", in: "query", schema: { type: "array" } },
      {
        name: "type",
        in: "query",
        description: "Filter by type.",
        schema: {
          type: "array",
          items: { type: "string", enum: ["system", "snapshot"] },
        },
      },
      { name: "page", in: "query", schema: { type: "integer" } },
      { name: "per_page", in: "query", schema: { type: "integer" } },
      { name: "label_selector", in: "query", schema: { type: "string" } },
      { $ref: "#/components/parameters/arch" },
      { name: "name", in: "query", schema: { type: "string" } },
      {
        name: "bound_to",
        in: "query",
        schema: { type: "array", items: { type: "string" } },
      },
      { name: "include_deprecated", in: "query", schema: { type: "boolean" } },
      { name: "id", in: "path", schema: { type: "integer" } },
    ],
  };

  const filters = extractListFilters(
    operation as unknown as Parameters<typeof extractListFilters>[0],
    spec,
  );

  assertEquals(filters, [
    {
      name: "architecture",
      description: "Filter resources by cpu architecture.",
      kind: "enum",
      enumValues: ["x86", "arm"],
    },
    { name: "bound_to", description: undefined, kind: "string-array" },
    { name: "include_deprecated", description: undefined, kind: "boolean" },
    { name: "name", description: undefined, kind: "string" },
    {
      name: "type",
      description: "Filter by type.",
      kind: "enum-array",
      enumValues: ["system", "snapshot"],
    },
  ]);
});

Deno.test("extractListFilters: skips unsupported parameter shapes", () => {
  const operation = {
    parameters: [
      { name: "ip", in: "query", schema: { type: "string" } },
      { name: "range", in: "query", schema: { type: "object" } },
      {
        name: "ids",
        in: "query",
        schema: { type: "array", items: { type: "integer" } },
      },
    ],
  };
  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (msg: string) => warnings.push(msg);
  try {
    const filters = extractListFilters(
      operation as unknown as Parameters<typeof extractListFilters>[0],
      {},
    );
    assertEquals(filters, [
      { name: "ip", description: undefined, kind: "string" },
    ]);
    assertEquals(warnings.length, 2);
  } finally {
    console.warn = originalWarn;
  }
});
