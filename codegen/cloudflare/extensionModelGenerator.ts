// Generates individual Cloudflare extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { CloudflareProperty, CloudflareResource } from "./pipeline.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";

export interface ExtensionModelInput {
  resource: CloudflareResource;
  extensionName: string;
  version: string;
  upgradesBlock?: string;
}

export function generateCloudflareExtensionModel(
  input: ExtensionModelInput,
): string {
  const { resource, extensionName, version } = input;
  const modelType = `${extensionName}/${resource.modelSlug}`;

  const lines: string[] = [];

  lines.push(
    `// Auto-generated extension model for ${modelType}`,
  );
  lines.push(
    `// Do not edit manually. Re-generate with: deno task generate:cloudflare`,
  );
  lines.push("");
  lines.push(`// deno-lint-ignore-file no-explicit-any`);
  lines.push("");

  const singular = resource.displayName;
  lines.push(`/**`);
  lines.push(` * Swamp extension model for a Cloudflare ${singular}.`);
  lines.push(` *`);
  lines.push(
    ` * Wraps the Cloudflare API as a swamp model so create, get, update,`,
  );
  lines.push(
    ` * delete, and sync can be driven through \`swamp model\`.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push("");

  lines.push(`import { z } from "npm:zod@4.3.6";`);

  const helperImports: string[] = ["create", "read", "tryRead"];
  if (resource.handlers.delete) helperImports.push("remove");
  if (resource.handlers.update) helperImports.push("update");
  lines.push(
    `import { ${helperImports.join(", ")} } from "./_lib/cloudflare.ts";`,
  );
  lines.push("");

  // --- Scope helper ---
  const scopeExpr = buildScopeExpression(resource);

  // --- GlobalArgsSchema ---
  const globalArgsProps = buildGlobalArgsProperties(resource);
  lines.push(`const GlobalArgsSchema = z.object({`);

  // Scope parameters
  if (resource.scope === "account") {
    lines.push(
      `  account_id: z.string().describe("Cloudflare account ID"),`,
    );
  } else if (resource.scope === "zone") {
    lines.push(
      `  zone_id: z.string().describe("Cloudflare zone ID"),`,
    );
  } else {
    lines.push(
      `  account_id: z.string().optional().describe("Cloudflare account ID (provide account_id or zone_id)"),`,
    );
    lines.push(
      `  zone_id: z.string().optional().describe("Cloudflare zone ID (provide account_id or zone_id)"),`,
    );
  }

  if (resource.syntheticName) {
    lines.push(
      `  name: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.line},`);
  }
  lines.push(`})${resource.scope === "both" ? buildDualScopeRefine() : ""};`);
  lines.push("");

  // --- ResourceSchema ---
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

  // --- InputsSchema ---
  lines.push(`const InputsSchema = z.object({`);
  if (resource.scope === "account") {
    lines.push(`  account_id: z.string().optional(),`);
  } else if (resource.scope === "zone") {
    lines.push(`  zone_id: z.string().optional(),`);
  } else {
    lines.push(`  account_id: z.string().optional(),`);
    lines.push(`  zone_id: z.string().optional(),`);
  }
  if (resource.syntheticName) {
    lines.push(`  name: z.string().optional(),`);
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.nameOnly}: ${prop.baseExpr}.optional(),`);
  }
  lines.push(`});`);
  lines.push("");

  // The resource path relative to the scope prefix
  const relPath = resource.resourcePath;

  // --- Model export ---
  lines.push(
    `/** Swamp extension model for Cloudflare ${singular}. Registered at \`${modelType}\`. */`,
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
  lines.push(`      description: "${singular} resource state",`);
  lines.push(`      schema: ResourceSchema,`);
  lines.push(`      lifetime: "infinite",`);
  lines.push(`      garbageCollection: 10,`);
  lines.push(`    },`);
  lines.push(`  },`);
  lines.push(`  methods: {`);

  const namingField = resource.namingField;

  // --- create method ---
  lines.push(`    create: {`);
  lines.push(`      description: "Create a ${singular}",`);
  lines.push(`      arguments: z.object({}),`);
  lines.push(
    `      execute: async (_args: Record<string, never>, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(`        const endpoint = \`${scopeExpr}/${relPath}\`;`);
  lines.push(`        const body: Record<string, unknown> = {};`);
  for (const name of Object.keys(resource.createProperties)) {
    lines.push(
      `        if (g.${name} !== undefined) body.${name} = g.${name};`,
    );
  }
  lines.push(
    `        const result = await create(endpoint, body) as ResourceData;`,
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

  // --- get method ---
  lines.push(`    get: {`);
  lines.push(`      description: "Get a ${singular}",`);
  lines.push(
    `      arguments: z.object({ id: z.string().describe("The ID of the ${singular}") }),`,
  );
  lines.push(
    `      execute: async (args: { id: string }, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(`        const endpoint = \`${scopeExpr}/${relPath}\`;`);
  lines.push(
    `        const result = await read(endpoint, args.id) as ResourceData;`,
  );
  if (resource.syntheticName) {
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingField}?.toString() ?? args.id`,
        )
      };`,
    );
  } else {
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `result.${namingField}?.toString() ?? args.id`,
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

  // --- update method ---
  if (resource.handlers.update) {
    lines.push(`    update: {`);
    lines.push(`      description: "Update ${singular} attributes",`);
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const endpoint = \`${scopeExpr}/${relPath}\`;`);
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
    const updateKeys = Object.keys(resource.updateProperties).length > 0
      ? Object.keys(resource.updateProperties)
      : Object.keys(resource.createProperties).filter(
        (k) => !resource.createOnlyProperties.has(k),
      );
    for (const name of updateKeys) {
      lines.push(
        `        if (g.${name} !== undefined) body.${name} = g.${name};`,
      );
    }
    lines.push(
      `        const result = await update(endpoint, existing.${resource.identifyingField}, body, "${resource.updateMethod}") as ResourceData;`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // --- delete method ---
  if (resource.handlers.delete) {
    lines.push(`    delete: {`);
    lines.push(`      description: "Delete the ${singular}",`);
    lines.push(
      `      arguments: z.object({ id: z.string().describe("The ID of the ${singular}") }),`,
    );
    lines.push(
      `      execute: async (args: { id: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const endpoint = \`${scopeExpr}/${relPath}\`;`);
    lines.push(
      `        const { existed } = await remove(endpoint, args.id);`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingField}?.toString() ?? args.id`,
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

  // --- sync method ---
  lines.push(`    sync: {`);
  lines.push(`      description: "Sync ${singular} state from Cloudflare",`);
  lines.push(`      arguments: z.object({}),`);
  lines.push(
    `      execute: async (_args: Record<string, never>, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(`        const endpoint = \`${scopeExpr}/${relPath}\`;`);
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
    `        const result = await tryRead(endpoint, existing.${resource.identifyingField}) as ResourceData | null;`,
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
  lines.push(`          id: existing.${resource.identifyingField},`);
  lines.push(`          status: "not_found",`);
  lines.push(`          syncedAt: new Date().toISOString(),`);
  lines.push(`        });`);
  lines.push(`        return { dataHandles: [handle] };`);
  lines.push(`      },`);
  lines.push(`    },`);

  lines.push(`  },`);
  lines.push(`};`);
  lines.push("");

  return lines.join("\n");
}

function buildScopeExpression(resource: CloudflareResource): string {
  if (resource.scope === "account") {
    return "\\${`/accounts/\\${g.account_id}`}";
  }
  if (resource.scope === "zone") {
    return "\\${`/zones/\\${g.zone_id}`}";
  }
  // dual-scope: use whichever is provided
  return '\\${g.account_id ? `/accounts/\\${g.account_id}` : `/zones/\\${g.zone_id}`}';
}

function buildDualScopeRefine(): string {
  return `.refine(
  (d) => (d.account_id != null) !== (d.zone_id != null),
  "Exactly one of account_id or zone_id must be provided",
)`;
}

function buildGlobalArgsProperties(
  resource: CloudflareResource,
): { line: string; nameOnly: string; baseExpr: string }[] {
  const result: { line: string; nameOnly: string; baseExpr: string }[] = [];
  const seen = new Set<string>();

  const allProps: Record<string, CloudflareProperty> = {
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

function generateFullFidelityZod(prop: CloudflareProperty): string {
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

function generateSimplifiedZod(prop: CloudflareProperty): string {
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
