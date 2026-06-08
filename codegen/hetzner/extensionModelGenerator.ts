// Generates individual Hetzner extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { HetznerProperty, HetznerResource } from "./pipeline.ts";
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

  // Module-level JSDoc
  const singular = singularize(resource.modelSlug).replace(/-/g, " ");
  lines.push(`/**`);
  lines.push(
    ` * Swamp extension model for a Hetzner Cloud ${singular}.`,
  );
  lines.push(` *`);
  lines.push(
    ` * Wraps the \`${endpoint}\` API as a swamp model so create, get, update,`,
  );
  lines.push(
    ` * delete, and sync can be driven through \`swamp model\`.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push("");

  // Imports. The `npm:` prefix is required so `deno doc --lint` can resolve
  // zod standalone — it doesn't read the package's deno.json import map.
  lines.push(`import { z } from "npm:zod@4.3.6";`);

  const helperImports: string[] = ["create", "read", "tryRead"];
  if (resource.handlers.delete) helperImports.push("remove");
  if (resource.handlers.update) helperImports.push("update");
  if (resource.handlers.list) helperImports.push("listAll");
  lines.push(
    `import { ${helperImports.join(", ")} } from "./_lib/hetzner.ts";`,
  );
  lines.push("");

  // Determine the naming field for factory-pattern instance names
  const { field: namingField, synthetic: isSyntheticName } = resolveNamingField(
    resource,
  );

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

  // create method
  lines.push(`    create: {`);
  lines.push(
    `      description: "Create a ${singularName}",`,
  );
  lines.push(`      arguments: z.object({}),`);
  lines.push(
    `      execute: async (_args: Record<string, never>, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
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

  // get method
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
          `result.${namingField}?.toString() ?? args.id.toString()`,
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

  // update method — only if PUT handler exists
  if (resource.handlers.update) {
    lines.push(`    update: {`);
    lines.push(
      `      description: "Update ${singularName} attributes",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
      };`,
    );
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
    lines.push(
      `        const { existed } = await remove("${endpoint}", args.id, context.globalArgs.token);`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingField}?.toString() ?? args.id.toString()`,
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

  // sync method — always generated
  lines.push(`    sync: {`);
  lines.push(
    `      description: "Sync ${singularName} state from Hetzner",`,
  );
  lines.push(`      arguments: z.object({}),`);
  lines.push(
    `      execute: async (_args: Record<string, never>, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
    };`,
  );
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

  // list method — only when a collection GET exists. Discovery via an optional
  // Hetzner label selector; writes one `state` resource per item (factory).
  if (resource.handlers.list) {
    const listNameExpr = isSyntheticName
      ? `item.id?.toString() ?? "unknown"`
      : `item.${namingField}?.toString() ?? item.id?.toString() ?? "unknown"`;
    lines.push(`    list: {`);
    lines.push(
      `      description: "List ${singularName}s, optionally filtered by a Hetzner label selector",`,
    );
    lines.push(
      `      arguments: z.object({ label_selector: z.string().describe("Hetzner label selector to filter results, e.g. env=production,role!=db").optional() }),`,
    );
    lines.push(
      `      execute: async (args: { label_selector?: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const queryParams: Record<string, string> = {};`);
    lines.push(
      `        if (args.label_selector !== undefined) queryParams.label_selector = args.label_selector;`,
    );
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

  lines.push(`  },`);
  lines.push(`};`);
  lines.push("");

  return lines.join("\n");
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

    const isRequired = resource.requiredProperties.includes(name);
    if (!isRequired) {
      line += `.optional()`;
    }

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
