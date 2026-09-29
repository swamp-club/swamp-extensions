import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { generateVercelExtensionModel } from "./extensionModelGenerator.ts";
import type { VercelProperty, VercelResource } from "./pipeline.ts";

const stringProp: VercelProperty = { type: "string" };

function makeResource(overrides: Partial<VercelResource> = {}): VercelResource {
  return {
    resourcePath: "widgets",
    service: "widgets",
    modelSlug: "widgets",
    fileName: "widgets.ts",
    displayName: "Widgets",
    basePath: "/v1/widgets",
    idPath: "/v1/widgets/{id}",
    createPath: "/v1/widgets",
    createMethod: "POST",
    listPath: "/v1/widgets",
    readBasePath: "/v1/widgets",
    hasIndividualRead: true,
    updateBasePath: "/v1/widgets",
    deleteBasePath: "/v1/widgets",
    createProperties: { name: stringProp, region: stringProp },
    updateProperties: {
      name: stringProp,
      region: stringProp,
      note: stringProp,
    },
    // The response nests region as an object and has no note.
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      region: { type: "object" },
    },
    requiredProperties: ["name"],
    handlers: { create: true, read: true, update: true, delete: true },
    updateMethod: "PUT",
    identifyingField: "id",
    idParam: "id",
    namingField: "name",
    syntheticName: false,
    createOnlyProperties: new Set<string>(),
    paginationStyle: "none",
    paginationCursorParam: null,
    parentParams: [],
    bodyTransform: "none",
    responseUnwrapKey: null,
    createResponseStyle: "direct",
    ...overrides,
  };
}

function updateBlock(resource: VercelResource): string {
  const code = generateVercelExtensionModel({
    resource,
    extensionName: "@swamp/vercel/widgets",
    version: "2026.01.01.1",
  });
  return code.slice(
    code.indexOf("    update: {"),
    code.indexOf("    delete: {"),
  );
}

Deno.test("generateVercelExtensionModel - PUT update fills same-shaped unset fields from the live resource", () => {
  const update = updateBlock(makeResource());
  assertStringIncludes(
    update,
    `const unset = ["name"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(update, "const live = await read(endpoint, existing.id");
  assert(update.indexOf("const live") < update.indexOf("await update("));
});

Deno.test("generateVercelExtensionModel - no live read for PATCH or a read at another path", () => {
  assertEquals(
    updateBlock(makeResource({ updateMethod: "PATCH" })).includes("const live"),
    false,
  );
  assertEquals(
    updateBlock(makeResource({ readBasePath: "/v2/widgets" })).includes(
      "const live",
    ),
    false,
  );
});
