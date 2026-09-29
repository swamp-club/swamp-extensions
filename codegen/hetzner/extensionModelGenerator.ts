// Generates individual Hetzner extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type {
  HetznerListFilter,
  HetznerProperty,
  HetznerResource,
} from "./pipeline.ts";
import { generateCopyrightHeader } from "../shared/licenseGenerator.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";

export interface ExtensionModelInput {
  /** Resource definition from the pipeline */
  resource: HetznerResource;
  /** Extension name, e.g., "@swamp/hetzner-cloud" */
  extensionName: string;
  /** CalVer version string */
  version: string;
  /** Pre-built upgrades block to insert after version line */
  upgradesBlock?: string;
}

/**
 * Generates a complete extension model .ts file for a single Hetzner resource.
 */
export function generateHetznerExtensionModel(
  input: ExtensionModelInput,
): string {
  const { resource, extensionName, version } = input;
  const modelType = `${extensionName}/${resource.modelSlug}`;
  const endpoint = `/${resource.noun}`;

  const lines: string[] = [];

  // Header
  lines.push(generateCopyrightHeader());
  lines.push("");
  lines.push(
    `// Auto-generated extension model for ${modelType}`,
  );
  lines.push(
    `// Do not edit manually. Re-generate with: deno task generate:hetzner`,
  );
  lines.push("");
  lines.push(`// deno-lint-ignore-file no-explicit-any`);
  lines.push("");

  // Determine the naming field for factory-pattern instance names
  const { field: namingField, synthetic: isSyntheticName } = resolveNamingField(
    resource,
  );

  // A natural naming field that create requires is optional in
  // GlobalArgsSchema, but nothing is ever stored under the "current" fallback
  // for such a resource (create requires the field; get/list/lookup/adopt use
  // the real name). Methods that look up stored state by instance name reject
  // it when unset instead of failing with a misleading "No data found".
  const requireNamingField = !isSyntheticName &&
    resource.createRequiredProperties.includes(namingField);
  const instanceNameLines = (method: string): string[] => {
    const lines: string[] = [];
    if (requireNamingField) {
      const v = `g.${namingField}`;
      lines.push(
        `        if (${v} === undefined || ${v} === null || ${v} === "") throw new Error("${method} requires global argument: ${namingField}");`,
      );
    }
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
      };`,
    );
    return lines;
  };

  // Module-level JSDoc
  const singular = singularize(resource.modelSlug).replace(/-/g, " ");
  const namingFieldInGlobalArgs = namingField in resource.createProperties ||
    namingField in resource.updateProperties;
  const hasLookup = resource.handlers.read && resource.handlers.list &&
    !isSyntheticName && namingFieldInGlobalArgs;
  const hasAdopt = resource.handlers.read;

  // Instance name for state taken from an API object (get, adopt, list and the
  // id-targeted methods). When the naming field repeats across resources the
  // id is appended so every instance is unique.
  const nameUnique = resource.nameUnique !== false;
  const apiInstanceName = (field: string, id: string): string =>
    nameUnique
      ? `${field}?.toString() ?? ${id}`
      : `${field} == null ? ${id} : \`\${${field}}-\${${id}}\``;

  // A resource whose naming field is not a global argument (images cannot be
  // created, so `name` never reaches GlobalArgsSchema) has no key to find its
  // stored state by. Its update, change_protection and delete take an id and
  // name state from the API response, matching get/adopt/list.
  const targetsById = !isSyntheticName && !namingFieldInGlobalArgs &&
    resource.handlers.read;

  const availableOps = [
    resource.handlers.create ? "create" : "",
    resource.handlers.read ? "get" : "",
    resource.handlers.update ? "update" : "",
    resource.handlers.delete ? "delete" : "",
    resource.handlers.create ? "sync" : "",
    resource.handlers.list ? "list" : "",
    hasLookup ? "lookup" : "",
    hasAdopt ? "adopt" : "",
    ...resource.actions,
  ].filter(Boolean);
  lines.push(`/**`);
  lines.push(
    ` * Swamp extension model for a Hetzner Cloud ${singular}.`,
  );
  lines.push(` *`);
  lines.push(
    ` * Wraps the \`${endpoint}\` API as a swamp model so ${
      availableOps.join(", ")
    }`,
  );
  lines.push(
    ` * can be driven through \`swamp model\`.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push("");

  // Imports. The `npm:` prefix is required so `deno doc --lint` can resolve
  // zod standalone — it doesn't read the package's deno.json import map.
  lines.push(`import { z } from "npm:zod@4.3.6";`);

  const helperImports: string[] = [];
  if (resource.handlers.create) helperImports.push("create");
  if (resource.handlers.read) helperImports.push("read");
  if (
    (resource.handlers.create && resource.handlers.read) ||
    (targetsById && resource.handlers.delete)
  ) {
    helperImports.push("tryRead");
  }
  if (resource.handlers.delete) helperImports.push("remove");
  if (resource.handlers.update) helperImports.push("update");
  if (resource.handlers.list || hasLookup) helperImports.push("listAll");
  if (resource.actions.length > 0) helperImports.push("postAction");
  if (helperImports.length > 0) {
    lines.push(
      `import { ${helperImports.join(", ")} } from "./_lib/hetzner.ts";`,
    );
  }
  lines.push("");

  // GlobalArgsSchema — all create + update properties with full fidelity
  const globalArgsProps = buildGlobalArgsProperties(resource);
  // The auth `token` arg is injected unless the resource already has a real
  // property named "token" (guards against an API field collision).
  const hasTokenProp = globalArgsProps.some((p) => p.nameOnly === "token");
  const tokenArgLine =
    `  token: z.string().meta({ sensitive: true }).describe("Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.").optional(),`;
  lines.push(`const GlobalArgsSchema = z.object({`);
  if (isSyntheticName) {
    lines.push(
      `  name: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.line},`);
  }
  if (!hasTokenProp) {
    lines.push(tokenArgLine);
  }
  lines.push(`});`);
  lines.push("");

  // ResourceSchema — all GET response properties, simplified
  lines.push(`const ResourceSchema = z.object({`);
  for (const [name, prop] of Object.entries(resource.resourceProperties)) {
    const expr = generateSimplifiedZod(prop);
    let line = `  ${name}: ${expr}`;
    if (name !== "id") {
      line += `.optional()`;
    }
    lines.push(`${line},`);
  }
  lines.push(`}).passthrough();`);
  lines.push("");
  lines.push(`type ResourceData = z.infer<typeof ResourceSchema>;`);
  lines.push("");

  // InputsSchema — mirrors globalArgs but all optional
  lines.push(`const InputsSchema = z.object({`);
  if (isSyntheticName) {
    lines.push(`  name: z.string().optional(),`);
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.nameOnly}: ${prop.baseExpr}.optional(),`);
  }
  if (!hasTokenProp) {
    lines.push(`  token: z.string().meta({ sensitive: true }).optional(),`);
  }
  lines.push(`});`);
  lines.push("");

  // Model export
  lines.push(
    `/** Swamp extension model for Hetzner Cloud ${singular}. Registered at \`${modelType}\`. */`,
  );
  lines.push(`export const model = {`);
  lines.push(`  type: "${modelType}",`);
  lines.push(`  version: "${version}",`);
  if (input.upgradesBlock) {
    lines.push(input.upgradesBlock);
  }
  lines.push(`  globalArguments: GlobalArgsSchema,`);
  lines.push(`  inputsSchema: InputsSchema,`);
  lines.push(`  resources: {`);
  lines.push(`    state: {`);
  const singularName = singular;

  lines.push(
    `      description: "${capitalize(singularName)} resource state",`,
  );
  lines.push(`      schema: ResourceSchema,`);
  lines.push(`      lifetime: "infinite",`);
  lines.push(`      garbageCollection: 10,`);
  lines.push(`    },`);
  lines.push(`  },`);
  lines.push(`  methods: {`);

  // create method — only if POST handler exists
  if (resource.handlers.create) {
    lines.push(`    create: {`);
    lines.push(
      `      description: "Create a ${singularName}",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    // Create-only required fields are optional in GlobalArgsSchema so other
    // methods can run without them; enforce them here before any API call.
    // null and "" count as missing: the API would reject them with a less
    // clear error.
    const createRequired = [...resource.createRequiredProperties].sort();
    if (createRequired.length > 0) {
      lines.push(
        `        const missing = ${
          JSON.stringify(createRequired)
        }.filter((k) => g[k] === undefined || g[k] === null || g[k] === "");`,
      );
      lines.push(
        `        if (missing.length > 0) throw new Error("create requires global arguments: " + missing.join(", "));`,
      );
    }
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const name of Object.keys(resource.createProperties)) {
      lines.push(
        `        if (g.${name} !== undefined) body.${name} = g.${name};`,
      );
    }
    lines.push(
      `        const result = await create("${endpoint}", body, g.token) as ResourceData;`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
      };`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // get method — only if single-resource GET handler exists
  if (resource.handlers.read) {
    lines.push(`    get: {`);
    lines.push(`      description: "Get a ${singularName}",`);
    lines.push(
      `      arguments: z.object({ id: z.number().int().describe("The ID of the ${singularName}") }),`,
    );
    lines.push(
      `      execute: async (args: { id: number }, context: any) => {`,
    );
    lines.push(
      `        const result = await read("${endpoint}", args.id, context.globalArgs.token) as ResourceData;`,
    );
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `context.globalArgs.${namingField}?.toString() ?? args.id.toString()`,
          )
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            apiInstanceName(`result.${namingField}`, `args.id.toString()`),
          )
        };`,
      );
    }
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // update method, id-targeted variant (see targetsById)
  if (resource.handlers.update && targetsById) {
    lines.push(`    update: {`);
    lines.push(
      `      description: "Update ${singularName} attributes",`,
    );
    lines.push(
      `      arguments: z.object({ id: z.number().int().describe("The ID of the ${singularName}") }),`,
    );
    lines.push(
      `      execute: async (args: { id: number }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const name of Object.keys(resource.updateProperties)) {
      lines.push(
        `        if (g.${name} !== undefined) body.${name} = g.${name};`,
      );
    }
    lines.push(
      `        const result = await update("${endpoint}", args.id, body, g.token) as ResourceData;`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          apiInstanceName(`result.${namingField}`, `args.id.toString()`),
        )
      };`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // update method — only if PUT handler exists
  if (resource.handlers.update && !targetsById) {
    lines.push(`    update: {`);
    lines.push(
      `      description: "Update ${singularName} attributes",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...instanceNameLines("update"));
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No data found - run create first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const name of Object.keys(resource.updateProperties)) {
      lines.push(
        `        if (g.${name} !== undefined) body.${name} = g.${name};`,
      );
    }
    lines.push(
      `        const result = await update("${endpoint}", existing.id, body, g.token) as ResourceData;`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // delete method — only if DELETE handler exists
  if (resource.handlers.delete) {
    lines.push(`    delete: {`);
    lines.push(
      `      description: "Delete the ${singularName}",`,
    );
    lines.push(
      `      arguments: z.object({ id: z.number().int().describe("The ID of the ${singularName}") }),`,
    );
    lines.push(
      `      execute: async (args: { id: number }, context: any) => {`,
    );
    if (targetsById) {
      // Read first so the deletion record lands on the instance get/adopt/list
      // wrote; the name is gone once the resource is.
      lines.push(
        `        const current = await tryRead("${endpoint}", args.id, context.globalArgs.token) as ResourceData | null;`,
      );
    }
    lines.push(
      `        const { existed } = await remove("${endpoint}", args.id, context.globalArgs.token);`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          targetsById
            ? apiInstanceName(`current?.${namingField}`, `args.id.toString()`)
            : `context.globalArgs.${namingField}?.toString() ?? args.id.toString()`,
        )
      };`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, {`,
    );
    lines.push(`          id: args.id,`);
    lines.push(`          existed,`);
    lines.push(
      `          status: existed ? "deleted" : "not_found",`,
    );
    lines.push(`          deletedAt: new Date().toISOString(),`);
    lines.push(`        });`);
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // sync method — only for resources with create (tracks provisioned state)
  if (resource.handlers.create && resource.handlers.read) {
    lines.push(`    sync: {`);
    lines.push(
      `      description: "Sync ${singularName} state from Hetzner",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...instanceNameLines("sync"));
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No data found - run create or get first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );
    lines.push(
      `        const result = await tryRead("${endpoint}", existing.id, g.token) as ResourceData | null;`,
    );
    lines.push(`        if (result) {`);
    lines.push(
      `          const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`          return { dataHandles: [handle] };`);
    lines.push(`        }`);
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, {`,
    );
    lines.push(`          id: existing.id,`);
    lines.push(`          status: "not_found",`);
    lines.push(`          syncedAt: new Date().toISOString(),`);
    lines.push(`        });`);
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // list method — only when a collection GET exists. Discovery via an optional
  // Hetzner label selector; writes one `state` resource per item (factory).
  if (resource.handlers.list) {
    const listNameExpr = isSyntheticName
      ? `item.id?.toString() ?? "unknown"`
      : apiInstanceName(
        `item.${namingField}`,
        `item.id?.toString() ?? "unknown"`,
      );
    // Per-endpoint query filters from the spec, after label_selector
    const filters = resource.listFilters ?? [];
    const filterArgs = filters.map((f) => {
      const desc = f.description
        ? `.describe(${JSON.stringify(f.description)})`
        : "";
      return `${f.name}: ${listFilterZod(f)}${desc}.optional()`;
    });
    const filterTypes = filters.map((f) => {
      const ts = f.kind === "boolean"
        ? "boolean"
        : f.kind === "string-array" || f.kind === "enum-array"
        ? "string[]"
        : "string";
      return `${f.name}?: ${ts}`;
    });
    lines.push(`    list: {`);
    lines.push(
      `      description: "List ${singularName}s, optionally filtered by a Hetzner label selector${
        filters.length > 0 ? ` or ${filters.map((f) => f.name).join(", ")}` : ""
      }",`,
    );
    lines.push(
      `      arguments: z.object({ ${
        [
          `label_selector: z.string().describe("Hetzner label selector to filter results, e.g. env=production,role!=db").optional()`,
          ...filterArgs,
        ].join(", ")
      } }),`,
    );
    lines.push(
      `      execute: async (args: { ${
        ["label_selector?: string", ...filterTypes].join("; ")
      } }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const queryParams: Record<string, string${
        filters.some((f) => f.kind.endsWith("array")) ? " | string[]" : ""
      }> = {};`,
    );
    lines.push(
      `        if (args.label_selector !== undefined) queryParams.label_selector = args.label_selector;`,
    );
    for (const f of filters) {
      const value = f.kind === "boolean"
        ? `String(args.${f.name})`
        : `args.${f.name}`;
      lines.push(
        `        if (args.${f.name} !== undefined) queryParams.${f.name} = ${value};`,
      );
    }
    lines.push(
      `        const items = await listAll("${endpoint}", queryParams, g.token) as ResourceData[];`,
    );
    lines.push(`        const dataHandles: any[] = [];`);
    lines.push(`        for (const item of items) {`);
    lines.push(
      `          const instanceName = ${wrapWithSanitize(listNameExpr)};`,
    );
    lines.push(
      `          const handle = await context.writeResource("state", instanceName, item);`,
    );
    lines.push(`          dataHandles.push(handle);`);
    lines.push(`        }`);
    lines.push(
      `        return { dataHandles, result: { count: items.length } };`,
    );
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // lookup method — find-by-identity using globalArgs. Only for resources with
  // a natural naming field (not synthetic) that have both read and list handlers.
  if (hasLookup) {
    lines.push(`    lookup: {`);
    lines.push(
      `      description: "Find an existing ${singularName} by ${namingField} and import it into state",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const expectedName = g.${namingField};`,
    );
    lines.push(
      `        if (!expectedName) throw new Error("globalArgs.${namingField} is required for lookup");`,
    );
    lines.push(
      `        const items = await listAll("${endpoint}", {}, g.token) as ResourceData[];`,
    );
    lines.push(
      `        const matches = items.filter((item) => item.${namingField} === expectedName);`,
    );
    lines.push(`        if (matches.length === 0) {`);
    lines.push(
      `          throw new Error(\`No ${singularName} found matching ${namingField}=\${expectedName}\`);`,
    );
    lines.push(`        }`);
    lines.push(`        if (matches.length > 1) {`);
    lines.push(
      `          throw new Error(\`Multiple ${singularName}s found matching ${namingField}=\${expectedName} (found \${matches.length}). Use adopt with a specific ID instead.\`);`,
    );
    lines.push(`        }`);
    lines.push(`        const result = matches[0];`);
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `result.${namingField}?.toString() ?? "current"`,
        )
      };`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // adopt method — import-by-ID with optional identity validation
  if (hasAdopt) {
    const adoptArgs = isSyntheticName
      ? `{ id: z.number().int().describe("The ID of the ${singularName} to adopt") }`
      : `{ id: z.number().int().describe("The ID of the ${singularName} to adopt"), expected_name: z.string().describe("Expected ${namingField} for identity validation").optional() }`;
    lines.push(`    adopt: {`);
    lines.push(
      `      description: "Adopt an existing ${singularName} by ID into managed state",`,
    );
    lines.push(
      `      arguments: z.object(${adoptArgs}),`,
    );
    if (isSyntheticName) {
      lines.push(
        `      execute: async (args: { id: number }, context: any) => {`,
      );
    } else {
      lines.push(
        `      execute: async (args: { id: number; expected_name?: string }, context: any) => {`,
      );
    }
    lines.push(
      `        const result = await read("${endpoint}", args.id, context.globalArgs.token) as ResourceData;`,
    );
    if (!isSyntheticName) {
      lines.push(
        `        if (args.expected_name !== undefined && result.${namingField} !== args.expected_name) {`,
      );
      lines.push(
        `          throw new Error(\`Identity mismatch: expected ${namingField}=\${args.expected_name} but got \${result.${namingField}}\`);`,
      );
      lines.push(`        }`);
    }
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `context.globalArgs.${namingField}?.toString() ?? args.id.toString()`,
          )
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            apiInstanceName(`result.${namingField}`, `args.id.toString()`),
          )
        };`,
      );
    }
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // change_protection method — only for resources with that action
  if (resource.actions.includes("change_protection")) {
    const isServer = resource.noun === "servers";
    const cpArgs = isServer
      ? `{ delete: z.boolean().describe("If true, prevents the ${singularName} from being deleted").optional(), rebuild: z.boolean().describe("If true, prevents the ${singularName} from being rebuilt").optional() }`
      : `{ delete: z.boolean().describe("Prevent the ${singularName} from being deleted") }`;
    const cpType = isServer
      ? "{ delete?: boolean; rebuild?: boolean }"
      : "{ delete: boolean }";
    const idArg =
      `id: z.number().int().describe("The ID of the ${singularName}")`;
    lines.push(`    change_protection: {`);
    lines.push(
      `      description: "Change delete/rebuild protection for the ${singularName}",`,
    );
    lines.push(
      `      arguments: z.object(${
        targetsById ? cpArgs.replace(/^\{ /, `{ ${idArg}, `) : cpArgs
      }),`,
    );
    lines.push(
      `      execute: async (args: ${
        targetsById ? cpType.replace(/^\{ /, "{ id: number; ") : cpType
      }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    if (targetsById) {
      lines.push(`        const existing = { id: args.id };`);
    } else {
      lines.push(...instanceNameLines("change_protection"));
      lines.push(
        `        const content = await context.dataRepository.getContent(`,
      );
      lines.push(
        `          context.modelType, context.modelId, instanceName,`,
      );
      lines.push(`        );`);
      lines.push(
        `        if (!content) throw new Error("No data found - run create, lookup, or adopt first");`,
      );
      lines.push(
        `        const existing = JSON.parse(new TextDecoder().decode(content));`,
      );
    }
    lines.push(`        const body: Record<string, unknown> = {};`);
    lines.push(
      `        if (args.delete !== undefined) body.delete = args.delete;`,
    );
    if (isServer) {
      lines.push(
        `        if (args.rebuild !== undefined) body.rebuild = args.rebuild;`,
      );
    }
    lines.push(
      `        await postAction("${endpoint}", existing.id, "change_protection", body, g.token);`,
    );
    lines.push(
      `        const result = await read("${endpoint}", existing.id, g.token) as ResourceData;`,
    );
    if (targetsById) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            apiInstanceName(`result.${namingField}`, `args.id.toString()`),
          )
        };`,
      );
    }
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // set_rules method — only for firewalls
  if (resource.actions.includes("set_rules")) {
    lines.push(`    set_rules: {`);
    lines.push(
      `      description: "Set firewall rules, replacing all existing rules",`,
    );
    lines.push(`      arguments: z.object({`);
    lines.push(`        rules: z.array(z.object({`);
    lines.push(
      `          direction: z.enum(["in", "out"]).describe("Traffic direction"),`,
    );
    lines.push(
      `          protocol: z.enum(["tcp", "udp", "icmp", "esp", "gre"]).describe("Protocol"),`,
    );
    lines.push(
      `          port: z.string().describe("Port or port range (e.g. \\"443\\" or \\"1-65535\\")").optional(),`,
    );
    lines.push(
      `          source_ips: z.array(z.string()).describe("Permitted source IPs in CIDR notation (for direction=in)").optional(),`,
    );
    lines.push(
      `          destination_ips: z.array(z.string()).describe("Permitted destination IPs in CIDR notation (for direction=out)").optional(),`,
    );
    lines.push(
      `          description: z.string().describe("Description of the rule").optional(),`,
    );
    lines.push(`        })).describe("Array of firewall rules"),`);
    lines.push(`      }),`);
    lines.push(
      `      execute: async (args: { rules: Record<string, unknown>[] }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...instanceNameLines("set_rules"));
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No data found - run create, lookup, or adopt first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );
    lines.push(
      `        await postAction("${endpoint}", existing.id, "set_rules", { rules: args.rules }, g.token);`,
    );
    lines.push(
      `        const result = await read("${endpoint}", existing.id, g.token) as ResourceData;`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // apply_to_resources method — only for firewalls
  if (resource.actions.includes("apply_to_resources")) {
    lines.push(`    apply_to_resources: {`);
    lines.push(
      `      description: "Apply the firewall to additional resources",`,
    );
    lines.push(`      arguments: z.object({`);
    lines.push(`        apply_to: z.array(z.object({`);
    lines.push(
      `          type: z.enum(["server", "label_selector"]).describe("Type of the resource"),`,
    );
    lines.push(
      `          server: z.object({ id: z.number().int() }).describe("Server to apply to (for type=server)").optional(),`,
    );
    lines.push(
      `          label_selector: z.object({ selector: z.string() }).describe("Label selector to apply to (for type=label_selector)").optional(),`,
    );
    lines.push(
      `        })).describe("Resources to apply the firewall to"),`,
    );
    lines.push(`      }),`);
    lines.push(
      `      execute: async (args: { apply_to: Record<string, unknown>[] }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...instanceNameLines("apply_to_resources"));
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No data found - run create, lookup, or adopt first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );
    lines.push(
      `        await postAction("${endpoint}", existing.id, "apply_to_resources", { apply_to: args.apply_to }, g.token);`,
    );
    lines.push(
      `        const result = await read("${endpoint}", existing.id, g.token) as ResourceData;`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // remove_from_resources method — only for firewalls
  if (resource.actions.includes("remove_from_resources")) {
    lines.push(`    remove_from_resources: {`);
    lines.push(
      `      description: "Remove the firewall from resources",`,
    );
    lines.push(`      arguments: z.object({`);
    lines.push(`        remove_from: z.array(z.object({`);
    lines.push(
      `          type: z.enum(["server", "label_selector"]).describe("Type of the resource"),`,
    );
    lines.push(
      `          server: z.object({ id: z.number().int() }).describe("Server to remove from (for type=server)").optional(),`,
    );
    lines.push(
      `          label_selector: z.object({ selector: z.string() }).describe("Label selector to remove from (for type=label_selector)").optional(),`,
    );
    lines.push(
      `        })).describe("Resources to remove the firewall from"),`,
    );
    lines.push(`      }),`);
    lines.push(
      `      execute: async (args: { remove_from: Record<string, unknown>[] }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...instanceNameLines("remove_from_resources"));
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No data found - run create, lookup, or adopt first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );
    lines.push(
      `        await postAction("${endpoint}", existing.id, "remove_from_resources", { remove_from: args.remove_from }, g.token);`,
    );
    lines.push(
      `        const result = await read("${endpoint}", existing.id, g.token) as ResourceData;`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  lines.push(`  },`);
  lines.push(`};`);
  lines.push("");

  return lines.join("\n");
}

/** zod expression for a `list` query filter argument */
function listFilterZod(filter: HetznerListFilter): string {
  const values = JSON.stringify(filter.enumValues ?? []);
  switch (filter.kind) {
    case "boolean":
      return "z.boolean()";
    case "enum":
      return `z.enum(${values})`;
    case "string-array":
      return "z.array(z.string())";
    case "enum-array":
      return `z.array(z.enum(${values}))`;
    default:
      return "z.string()";
  }
}

/**
 * Determine the naming field for factory-pattern instance names.
 * Returns the field name from createProperties that should be used as the
 * instance name. If no natural naming field exists, returns "name" — a
 * synthetic field will be injected into globalArgs for the factory pattern.
 */
function resolveNamingField(
  resource: HetznerResource,
): { field: string; synthetic: boolean } {
  if (resource.createProperties.name) {
    return { field: "name", synthetic: false };
  }
  if (resource.createProperties.label) {
    return { field: "label", synthetic: false };
  }
  if (resource.resourceProperties.name) {
    return { field: "name", synthetic: false };
  }
  return { field: "name", synthetic: true };
}

/** Build the list of globalArgs properties (create + update, deduped) */
function buildGlobalArgsProperties(
  resource: HetznerResource,
): { line: string; nameOnly: string; baseExpr: string }[] {
  const result: { line: string; nameOnly: string; baseExpr: string }[] = [];
  const seen = new Set<string>();

  // Merge create and update properties, create takes precedence
  const allProps: Record<string, HetznerProperty> = {
    ...resource.updateProperties,
    ...resource.createProperties,
  };

  for (const [name, prop] of Object.entries(allProps)) {
    if (seen.has(name)) continue;
    seen.add(name);

    const baseExpr = generateFullFidelityZod(prop);
    let line = `${name}: ${baseExpr}`;

    if (prop.description) {
      line += `.describe(${JSON.stringify(prop.description)})`;
    }

    // Every resource field is optional: create-required ones are enforced by
    // the generated create method (see createRequiredProperties).
    line += `.optional()`;

    result.push({ line, nameOnly: name, baseExpr });
  }

  return result;
}

/** Generate a Zod expression with full fidelity (constraints, enums) for input schemas */
function generateFullFidelityZod(prop: HetznerProperty): string {
  switch (prop.type) {
    case "boolean":
      return "z.boolean()";

    case "string": {
      if (prop.enum && prop.enum.length > 0) {
        const vals = prop.enum.map((v) => JSON.stringify(v));
        return `z.enum([${vals.join(", ")}])`;
      }
      let expr = "z.string()";
      if (prop.minLength !== undefined) expr += `.min(${prop.minLength})`;
      if (prop.maxLength !== undefined) expr += `.max(${prop.maxLength})`;
      if (prop.pattern) {
        expr += `.regex(new RegExp(${JSON.stringify(prop.pattern)}))`;
      }
      return expr;
    }

    case "number":
    case "integer": {
      if (prop.enum && prop.enum.length > 0) {
        const literals = prop.enum.map((v) => `z.literal(${v})`);
        return `z.union([${literals.join(", ")}])`;
      }
      let expr = prop.type === "integer" ? "z.number().int()" : "z.number()";
      if (prop.minimum !== undefined) expr += `.min(${prop.minimum})`;
      if (prop.maximum !== undefined) expr += `.max(${prop.maximum})`;
      return expr;
    }

    case "array": {
      if (prop.items) {
        const itemExpr = generateFullFidelityZod(prop.items);
        return `z.array(${itemExpr})`;
      }
      return "z.array(z.unknown())";
    }

    case "object": {
      if (prop.properties && Object.keys(prop.properties).length > 0) {
        const requiredSet = new Set(prop.requiredProperties ?? []);
        const fields = Object.entries(prop.properties).map(
          ([k, v]) => {
            const suffix = requiredSet.has(k) ? "" : ".optional()";
            return `    ${k}: ${generateFullFidelityZod(v)}${suffix}`;
          },
        );
        return `z.object({\n${fields.join(",\n")},\n  })`;
      }
      return "z.record(z.string(), z.unknown())";
    }

    default:
      return "z.unknown()";
  }
}

/** Generate a simplified Zod expression for resource schemas (no constraints) */
function generateSimplifiedZod(prop: HetznerProperty): string {
  switch (prop.type) {
    case "boolean":
      return "z.boolean()";
    case "string":
      return "z.string()";
    case "number":
    case "integer":
      return "z.number()";
    case "array": {
      if (prop.items) {
        return `z.array(${generateSimplifiedZod(prop.items)})`;
      }
      return "z.array(z.unknown())";
    }
    case "object": {
      if (prop.properties && Object.keys(prop.properties).length > 0) {
        const fields = Object.entries(prop.properties).map(
          ([k, v]) => `    ${k}: ${generateSimplifiedZod(v)}.optional()`,
        );
        return `z.object({\n${fields.join(",\n")},\n  })`;
      }
      return "z.record(z.string(), z.unknown())";
    }
    default:
      return "z.unknown()";
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Naive singularization for Hetzner resource nouns (slug form, e.g., "servers" → "server") */
function singularize(slug: string): string {
  if (slug.endsWith("ses")) return slug.slice(0, -2); // "statuses" → "status" (not needed yet)
  if (slug.endsWith("ies")) return slug.slice(0, -3) + "y"; // "policies" → "policy"
  if (slug.endsWith("s")) return slug.slice(0, -1); // "servers" → "server"
  return slug;
}
