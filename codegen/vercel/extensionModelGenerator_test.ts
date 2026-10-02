import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { generateVercelExtensionModel } from "./extensionModelGenerator.ts";
import {
  globalArgsFieldNames,
  type VercelProperty,
  type VercelResource,
} from "./pipeline.ts";
import { extractGlobalArgsFieldNames } from "../shared/upgradesGenerator.ts";

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
    createRequiredProperties: ["name"],
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

// ---------------------------------------------------------------------------
// Create-required fields: optional in GlobalArgsSchema, enforced by create
// ---------------------------------------------------------------------------

function generate(resource: VercelResource): string {
  return generateVercelExtensionModel({
    resource,
    extensionName: "@swamp/vercel/widgets",
    version: "2026.01.01.1",
  });
}

function globalArgsBlock(code: string): string {
  return code.slice(
    code.indexOf("const GlobalArgsSchema"),
    code.indexOf("const ResourceSchema"),
  );
}

function createBlock(code: string): string {
  return code.slice(code.indexOf("    create: {"), code.indexOf("    get: {"));
}

Deno.test("generateVercelExtensionModel - create-required fields are optional in GlobalArgsSchema", () => {
  const schema = globalArgsBlock(generate(makeResource({
    createRequiredProperties: ["name", "region"],
  })));
  assertStringIncludes(schema, `name: z.string().optional(),`);
  assertStringIncludes(schema, `region: z.string().optional(),`);
});

Deno.test("generateVercelExtensionModel - synthetic name and parent params stay required", () => {
  const schema = globalArgsBlock(generate(makeResource({
    createProperties: { region: stringProp },
    updateProperties: {},
    createRequiredProperties: ["region"],
    namingField: "name",
    syntheticName: true,
    parentParams: [{ paramName: "idOrName", description: "Project" }],
  })));
  assertStringIncludes(schema, `idOrName: z.string().describe("Project"),`);
  assertStringIncludes(
    schema,
    `name: z.string().describe("Instance name for this resource`,
  );
  assertEquals(schema.includes(`name: z.string().optional()`), false);
});

Deno.test("generateVercelExtensionModel - create checks create-required fields in sorted order before any request", () => {
  const create = createBlock(generate(makeResource({
    createRequiredProperties: ["region", "name"],
  })));
  assertStringIncludes(
    create,
    `const missing = ["name","region"].filter((k) => g[k] === undefined);`,
  );
  assertStringIncludes(
    create,
    `throw new Error("create requires global arguments: " + missing.join(", "))`,
  );
  assert(create.indexOf("const missing") < create.indexOf("const endpoint"));
  assert(create.indexOf("const missing") < create.indexOf("await create("));
});

Deno.test("generateVercelExtensionModel - create emits no check without create-required fields", () => {
  const create = createBlock(generate(makeResource({
    createRequiredProperties: [],
  })));
  assertEquals(create.includes("const missing"), false);
});

Deno.test("generateVercelExtensionModel - PUT update always fills create-required fields and checks them before the PUT", () => {
  // region is shaped differently in the response, so it is only filled
  // because it is create-required.
  const update = updateBlock(makeResource({
    createRequiredProperties: ["name", "region"],
  }));
  assertStringIncludes(
    update,
    `const unset = ["name","region"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `const missingForUpdate = ["name","region"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `throw new Error("update requires global arguments: " + missingForUpdate.join(", "))`,
  );
  assert(
    update.indexOf("const live") < update.indexOf("const missingForUpdate"),
  );
  assert(
    update.indexOf("const missingForUpdate") < update.indexOf("await update("),
  );
});

Deno.test("generateVercelExtensionModel - PATCH update neither fills nor checks create-required fields", () => {
  const update = updateBlock(makeResource({
    updateMethod: "PATCH",
    createRequiredProperties: ["name", "region"],
  }));
  assertEquals(update.includes("const live"), false);
  assertEquals(update.includes("missingForUpdate"), false);
});

// ---------------------------------------------------------------------------
// A resource property named like a team scope or auth arg is renamed
// ---------------------------------------------------------------------------

function slugResource(overrides: Partial<VercelResource> = {}): VercelResource {
  return makeResource({
    createProperties: { slug: stringProp, items: { type: "array" } },
    updateProperties: { slug: stringProp },
    resourceProperties: { id: stringProp, slug: stringProp },
    createRequiredProperties: ["slug"],
    namingField: "name",
    syntheticName: true,
    ...overrides,
  });
}

Deno.test("generateVercelExtensionModel - a slug property is exposed as resourceSlug beside the team slug", () => {
  const schema = globalArgsBlock(generate(slugResource()));
  assertStringIncludes(
    schema,
    `slug: z.string().optional().describe("Vercel team slug (alternative to teamId)"),`,
  );
  assertStringIncludes(schema, `resourceSlug: z.string().optional(),`);
});

Deno.test("generateVercelExtensionModel - resourceSlug is sent as slug and checked under its global arg name", () => {
  const code = generate(slugResource());
  const create = createBlock(code);
  assertStringIncludes(
    create,
    `const missing = ["resourceSlug"].filter((k) => g[k] === undefined);`,
  );
  assertStringIncludes(
    create,
    `if (g.resourceSlug !== undefined) body.slug = g.resourceSlug;`,
  );
  // The team slug still scopes the request.
  assertStringIncludes(create, `{ teamId: g.teamId, slug: g.slug }`);

  const update = updateBlock(slugResource());
  assertStringIncludes(
    update,
    `if (g.resourceSlug !== undefined) body.slug = g.resourceSlug;`,
  );
  assertStringIncludes(
    update,
    `const unset = ["slug"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `const missingForUpdate = ["slug"].filter((k) => body[k] === undefined);`,
  );
  assertStringIncludes(
    update,
    `({"slug":"resourceSlug"} as Record<string, string>)[k]`,
  );
});

Deno.test("generateVercelExtensionModel - lookup filters item.slug by resourceSlug", () => {
  const code = generate(slugResource());
  const lookup = code.slice(
    code.indexOf("    lookup: {"),
    code.indexOf("    adopt: {"),
  );
  assertStringIncludes(
    lookup,
    `if (g.resourceSlug !== undefined) filters.push(["slug", String(g.resourceSlug)]);`,
  );
  assertEquals(lookup.includes(`String(g.slug)`), false);
});

Deno.test("generateVercelExtensionModel - a response-only team scope field is not a lookup filter", () => {
  const code = generate(makeResource({
    resourceProperties: {
      id: stringProp,
      name: stringProp,
      teamId: stringProp,
    },
  }));
  assertEquals(code.includes(`String(g.teamId)`), false);
  assertEquals(code.includes(`resourceTeamId`), false);
});

Deno.test("generateVercelExtensionModel - a parent param named like a team scope arg is not renamed", () => {
  const code = generate(makeResource({
    createProperties: { teamId: stringProp, email: stringProp },
    updateProperties: {},
    createRequiredProperties: ["email"],
    parentParams: [{ paramName: "teamId", description: "Team ID" }],
  }));
  assertEquals(code.includes("resourceTeamId"), false);
});

Deno.test("globalArgsFieldNames - matches the field names the upgrade parser reads from the generated schema", () => {
  // If these drift, a later regeneration reports a renamed field (here
  // resourceSlug) as removed and its upgrade strips it from stored data.
  for (
    const resource of [
      slugResource(),
      makeResource(),
      makeResource({
        createProperties: { teamId: stringProp, email: stringProp },
        updateProperties: {},
        parentParams: [{ paramName: "teamId", description: "Team ID" }],
      }),
    ]
  ) {
    const parsed = extractGlobalArgsFieldNames(generate(resource));
    assertEquals(
      [...new Set(globalArgsFieldNames(resource))].sort(),
      [...new Set(parsed)].sort(),
    );
  }
  assert(globalArgsFieldNames(slugResource()).includes("resourceSlug"));
});
