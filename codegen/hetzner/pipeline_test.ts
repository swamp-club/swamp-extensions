import { assertEquals } from "@std/assert";
import { extractListFilters, parseResources } from "./pipeline.ts";

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

Deno.test("parseResources: captures server power actions, skips non-allowlisted actions", () => {
  const ok = { responses: { "200": {} } };
  const spec = {
    paths: {
      "/servers": { get: ok },
      "/servers/{id}": { get: ok },
      "/servers/{id}/actions/poweron": { post: ok },
      "/servers/{id}/actions/shutdown": { post: ok },
      "/servers/{id}/actions/poweroff": { post: ok },
      "/servers/{id}/actions/reboot": { post: ok },
      "/servers/{id}/actions/reset": { post: ok },
      "/servers/{id}/actions/change_protection": { post: ok },
      "/servers/{id}/actions/rebuild": { post: ok },
      "/servers/actions/{id}": { get: ok },
    },
  };
  const originalLog = console.log;
  console.log = () => {};
  try {
    const resources = parseResources(
      spec as unknown as Parameters<typeof parseResources>[0],
    );
    const servers = resources.find((r) => r.noun === "servers");
    assertEquals(servers?.actions, [
      "change_protection",
      "poweroff",
      "poweron",
      "reboot",
      "reset",
      "shutdown",
    ]);
  } finally {
    console.log = originalLog;
  }
});
