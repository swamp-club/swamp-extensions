// Generates individual Cloudflare extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { CloudflareProperty, CloudflareResource } from "./pipeline.ts";
import { generateCopyrightHeader } from "../shared/licenseGenerator.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";
import { liveFillFields } from "../shared/liveFill.ts";

const VALID_JS_IDENT = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
function quoteProp(name: string): string {
  return VALID_JS_IDENT.test(name) ? name : JSON.stringify(name);
}

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

  lines.push(generateCopyrightHeader());
  lines.push("");
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
    ` * Wraps the Cloudflare API as a swamp model so create, get, lookup,`,
  );
  lines.push(
    ` * adopt, update, delete, and sync can be driven through \`swamp model\`.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push("");

  lines.push(`import { z } from "npm:zod@4.3.6";`);

  const helperImports: string[] = ["create", "listAll", "read", "tryRead"];
  if (resource.handlers.delete) helperImports.push("remove");
  if (resource.handlers.update) helperImports.push("update");
  lines.push(
    `import { ${helperImports.join(", ")} } from "./_lib/cloudflare.ts";`,
  );
  lines.push("");

  // --- Scope helper ---
  const scopeType = buildScopePrefix(resource);

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

  // Only inject synthetic name if the merged globalArgs don't already have the naming field
  const allPropNames = new Set([
    ...Object.keys(resource.createProperties),
    ...Object.keys(resource.updateProperties),
  ]);

  // Vault-wireable, sensitive credential args. `apiToken` is injected
  // independently; the legacy `apiKey` + `email` pair is injected only when
  // BOTH names are free, so a resource property named `email` (which several
  // Cloudflare resources have) doesn't leave the key+email path half-wired —
  // those models fall back to the CLOUDFLARE_* env vars for the legacy path.
  // Each injected name is also mirrored into pipeline.ts's newFieldNames.
  const injectApiToken = !allPropNames.has("apiToken");
  const injectKeyPair = !allPropNames.has("apiKey") &&
    !allPropNames.has("email");
  const authParts: string[] = [];
  if (injectApiToken) authParts.push("apiToken: g.apiToken");
  if (injectKeyPair) authParts.push("apiKey: g.apiKey", "email: g.email");
  // Trailing call-site argument: the auth overrides object, or "" when every
  // credential name collided with a real property (env-var-only auth).
  const authSuffix = authParts.length > 0
    ? `, { ${authParts.join(", ")} }`
    : "";
  if (resource.syntheticName && !allPropNames.has(resource.namingField)) {
    lines.push(
      `  name: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.line},`);
  }
  if (injectApiToken) {
    lines.push(
      `  apiToken: z.string().meta({ sensitive: true }).describe("Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.").optional(),`,
    );
  }
  if (injectKeyPair) {
    lines.push(
      `  apiKey: z.string().meta({ sensitive: true }).describe("Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.").optional(),`,
    );
    lines.push(
      `  email: z.string().meta({ sensitive: true }).describe("Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.").optional(),`,
    );
  }
  lines.push(`});`);
  lines.push("");

  // --- ResourceSchema ---
  lines.push(`const ResourceSchema = z.object({`);
  for (const [name, prop] of Object.entries(resource.resourceProperties)) {
    const expr = generateSimplifiedZod(prop);
    let line = `  ${quoteProp(name)}: ${expr}`;
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
  if (resource.syntheticName && !allPropNames.has(resource.namingField)) {
    lines.push(`  name: z.string().optional(),`);
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.nameOnly}: ${prop.baseExpr}.optional(),`);
  }
  if (injectApiToken) {
    lines.push(`  apiToken: z.string().meta({ sensitive: true }).optional(),`);
  }
  if (injectKeyPair) {
    lines.push(`  apiKey: z.string().meta({ sensitive: true }).optional(),`);
    lines.push(`  email: z.string().meta({ sensitive: true }).optional(),`);
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
  // Create-only required fields are optional in GlobalArgsSchema so other
  // methods can run without them; enforce them here before any API call.
  const createRequired = [...resource.createRequiredProperties].sort();
  if (createRequired.length > 0) {
    lines.push(
      `        const missing = ${
        JSON.stringify(createRequired)
      }.filter((k) => g[k] === undefined);`,
    );
    lines.push(
      `        if (missing.length > 0) throw new Error("create requires global arguments: " + missing.join(", "));`,
    );
  }
  lines.push(...buildEndpointLines(scopeType, relPath));
  lines.push(`        const body: Record<string, unknown> = {};`);
  for (const name of Object.keys(resource.createProperties)) {
    const access = VALID_JS_IDENT.test(name)
      ? `.${name}`
      : `[${JSON.stringify(name)}]`;
    lines.push(
      `        if (g${access} !== undefined) body${access} = g${access};`,
    );
  }
  lines.push(
    `        const result = await create(endpoint, body${authSuffix}) as ResourceData;`,
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
  lines.push(...buildEndpointLines(scopeType, relPath));
  lines.push(
    `        const result = await read(endpoint, args.id${authSuffix}) as ResourceData;`,
  );
  // Prefer globalArgs name over API response name — Cloudflare may transform
  // the name (e.g., appending the zone domain to DNS record names), so using
  // g.name keeps the instance key consistent across create/get/update/sync.
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(
        `g.${namingField}?.toString() ?? args.id`,
      )
    };`,
  );
  lines.push(
    `        const handle = await context.writeResource("state", instanceName, result);`,
  );
  lines.push(`        return { dataHandles: [handle] };`);
  lines.push(`      },`);
  lines.push(`    },`);

  // --- lookup method ---
  const skipFields = new Set(["account_id", "zone_id"]);
  if (injectApiToken) skipFields.add("apiToken");
  if (injectKeyPair) {
    skipFields.add("apiKey");
    skipFields.add("email");
  }
  if (resource.syntheticName && !allPropNames.has(resource.namingField)) {
    skipFields.add("name");
  }
  const filterFields = collectFilterableFields(resource, skipFields);
  lines.push(`    lookup: {`);
  lines.push(
    `      description: "Look up an existing ${singular} by matching global argument values and import it into state",`,
  );
  lines.push(`      arguments: z.object({}),`);
  lines.push(
    `      execute: async (_args: Record<string, never>, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(...buildEndpointLines(scopeType, relPath));
  lines.push(
    `        const filters: [string, string][] = [];`,
  );
  for (const name of filterFields) {
    const access = VALID_JS_IDENT.test(name)
      ? `.${name}`
      : `[${JSON.stringify(name)}]`;
    lines.push(
      `        if (g${access} !== undefined) filters.push([${
        JSON.stringify(name)
      }, String(g${access})]);`,
    );
  }
  lines.push(
    `        if (filters.length === 0) throw new Error("At least one global argument must be set to filter by");`,
  );
  if (resource.listEndpointSuffix) {
    lines.push(
      `        const listEndpoint = endpoint + "${resource.listEndpointSuffix}";`,
    );
  }
  const listTarget = resource.listEndpointSuffix ? "listEndpoint" : "endpoint";
  lines.push(
    `        const items = await listAll(${listTarget}, "${resource.paginationStyle}"${
      authSuffix ? `, undefined${authSuffix}` : ""
    });`,
  );
  lines.push(`        const matches = items.filter(item => {`);
  lines.push(`          for (const [key, val] of filters) {`);
  lines.push(
    `            if (String((item as Record<string, unknown>)[key]) !== val) return false;`,
  );
  lines.push(`          }`);
  lines.push(`          return true;`);
  lines.push(`        });`);
  lines.push(`        if (matches.length === 0) {`);
  lines.push(
    `          const filterDesc = filters.map(([k, v]) => \`\${k}=\${JSON.stringify(v)}\`).join(", ");`,
  );
  lines.push(
    `          throw new Error(\`No ${singular.toLowerCase()} found matching filters: \${filterDesc}\`);`,
  );
  lines.push(`        }`);
  lines.push(`        if (matches.length > 1) {`);
  lines.push(
    `          const filterDesc = filters.map(([k, v]) => \`\${k}=\${JSON.stringify(v)}\`).join(", ");`,
  );
  lines.push(
    `          throw new Error(\`Expected exactly 1 match, found \${matches.length} for filters: \${filterDesc}\`);`,
  );
  lines.push(`        }`);
  lines.push(`        const result = matches[0] as ResourceData;`);
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(
        `g.${namingField}?.toString() ?? result.${resource.identifyingField}?.toString() ?? "current"`,
      )
    };`,
  );
  lines.push(
    `        const handle = await context.writeResource("state", instanceName, result);`,
  );
  lines.push(`        return { dataHandles: [handle] };`);
  lines.push(`      },`);
  lines.push(`    },`);

  // --- adopt method ---
  lines.push(`    adopt: {`);
  lines.push(
    `      description: "Import an existing ${singular} by ID into state for management",`,
  );
  lines.push(
    `      arguments: z.object({ id: z.string().describe("The ID of the ${singular} to import") }),`,
  );
  lines.push(
    `      execute: async (args: { id: string }, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(...buildEndpointLines(scopeType, relPath));
  lines.push(
    `        const result = await read(endpoint, args.id${authSuffix}) as ResourceData;`,
  );
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(
        `result.${namingField}?.toString() ?? g.${namingField}?.toString() ?? args.id`,
      )
    };`,
  );
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
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singular} by ${resource.identifyingField} (e.g. one discovered by list)").optional() }),`,
    );
    lines.push(
      `      execute: async (args: { identifier?: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...buildEndpointLines(scopeType, relPath));
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `g.${namingField}?.toString() ?? args.identifier ?? "current"`,
        )
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
      `        if (!content) throw new Error("No data found - run create, get, or list first");`,
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
    // A PUT body replaces the resource, so every field left unset in
    // globalArgs would be cleared or reset to its default. Fill unset fields
    // from the live resource, so an unset field keeps its current value
    // (see liveFillFields for which fields qualify).
    // Stored state is not used: it can be stale, and sending it would
    // silently revert changes made outside swamp since the last get/sync.
    // Create-only required fields are optional in GlobalArgsSchema, so the
    // update still throws if one is unset in both globalArgs and the live
    // resource.
    const isFullReplacement = resource.updateMethod === "PUT";
    const createRequiredSet = new Set(resource.createRequiredProperties);
    const updateRequired: string[] = [];
    for (const name of updateKeys) {
      const access = VALID_JS_IDENT.test(name)
        ? `.${name}`
        : `[${JSON.stringify(name)}]`;
      lines.push(
        `        if (g${access} !== undefined) body${access} = g${access};`,
      );
      if (isFullReplacement && createRequiredSet.has(name)) {
        updateRequired.push(name);
      }
    }
    const liveFill = isFullReplacement
      ? liveFillFields(
        updateKeys,
        Object.keys(resource.updateProperties).length > 0
          ? resource.updateProperties
          : resource.createProperties,
        resource.resourceProperties,
        new Set(updateRequired),
      )
      : [];
    if (liveFill.length > 0) {
      lines.push(
        `        const unset = ${
          JSON.stringify(liveFill)
        }.filter((k) => body[k] === undefined);`,
      );
      lines.push(`        if (unset.length > 0) {`);
      lines.push(
        `          const live = await read(endpoint, existing.${resource.identifyingField}${authSuffix});`,
      );
      lines.push(
        `          for (const k of unset) if (live[k] !== undefined && live[k] !== null) body[k] = live[k];`,
      );
      lines.push(`        }`);
    }
    if (updateRequired.length > 0) {
      lines.push(
        `        const missingForUpdate = ${
          JSON.stringify([...updateRequired].sort())
        }.filter((k) => body[k] === undefined);`,
      );
      lines.push(
        `        if (missingForUpdate.length > 0) throw new Error("update requires global arguments: " + missingForUpdate.join(", "));`,
      );
    }
    lines.push(
      `        const result = await update(endpoint, existing.${resource.identifyingField}, body, "${resource.updateMethod}"${authSuffix}) as ResourceData;`,
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
    lines.push(...buildEndpointLines(scopeType, relPath));
    lines.push(
      `        const { existed } = await remove(endpoint, args.id${authSuffix});`,
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
  lines.push(
    `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singular} by ${resource.identifyingField} (e.g. one discovered by list)").optional() }),`,
  );
  lines.push(
    `      execute: async (args: { identifier?: string }, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  lines.push(...buildEndpointLines(scopeType, relPath));
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(
        `g.${namingField}?.toString() ?? args.identifier ?? "current"`,
      )
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
    `        if (!content) throw new Error("No data found - run create, get, or list first");`,
  );
  lines.push(
    `        const existing = JSON.parse(new TextDecoder().decode(content));`,
  );
  lines.push(
    `        if (!existing.${resource.identifyingField}) throw new Error("Stored state has no ${resource.identifyingField} - cannot sync");`,
  );
  lines.push(
    `        const result = await tryRead(endpoint, existing.${resource.identifyingField}${authSuffix}) as ResourceData | null;`,
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

function buildEndpointLines(
  scopeType: string,
  relPath: string,
): string[] {
  if (scopeType === "account") {
    return [
      `        const endpoint = "/accounts/" + g.account_id + "/${relPath}";`,
    ];
  }
  if (scopeType === "zone") {
    return [
      `        const endpoint = "/zones/" + g.zone_id + "/${relPath}";`,
    ];
  }
  // dual-scope
  return [
    `        if ((g.account_id == null) === (g.zone_id == null)) throw new Error("Exactly one of account_id or zone_id must be provided");`,
    `        const scopePrefix = g.account_id ? "/accounts/" + g.account_id : "/zones/" + g.zone_id;`,
    `        const endpoint = scopePrefix + "/${relPath}";`,
  ];
}

function buildScopePrefix(resource: CloudflareResource): string {
  if (resource.scope === "account") {
    return "account";
  }
  if (resource.scope === "zone") {
    return "zone";
  }
  return "both";
}

function buildGlobalArgsProperties(
  resource: CloudflareResource,
): { line: string; nameOnly: string; baseExpr: string }[] {
  const result: { line: string; nameOnly: string; baseExpr: string }[] = [];

  const allProps: Record<string, CloudflareProperty> = {
    ...resource.updateProperties,
    ...resource.createProperties,
  };

  for (const [name, prop] of Object.entries(allProps)) {
    const baseExpr = generateFullFidelityZod(prop);
    const qName = quoteProp(name);
    let line = `${qName}: ${baseExpr}`;

    if (prop.description) {
      line += `.describe(${JSON.stringify(prop.description)})`;
    }

    // Every resource field is optional: create-required ones are enforced by
    // the generated create method (see createRequiredProperties).
    line += `.optional()`;

    result.push({ line, nameOnly: qName, baseExpr });
  }

  return result;
}

function generateFullFidelityZod(prop: CloudflareProperty): string {
  switch (prop.type) {
    case "boolean":
      return "z.boolean()";

    case "string": {
      if (prop.enum && prop.enum.length > 0) {
        const stringVals = prop.enum.filter((v): v is string =>
          typeof v === "string"
        );
        if (stringVals.length > 0) {
          const vals = stringVals.map((v) => JSON.stringify(v));
          return `z.enum([${vals.join(", ")}])`;
        }
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
            return `    ${quoteProp(k)}: ${
              generateFullFidelityZod(v)
            }${suffix}`;
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
          ([k, v]) =>
            `    ${quoteProp(k)}: ${generateSimplifiedZod(v)}.optional()`,
        );
        return `z.object({\n${fields.join(",\n")},\n  })`;
      }
      return "z.record(z.string(), z.unknown())";
    }
    default:
      return "z.unknown()";
  }
}

const SCALAR_TYPES = new Set(["string", "number", "integer", "boolean"]);

function collectFilterableFields(
  resource: CloudflareResource,
  skipFields: Set<string>,
): string[] {
  const allProps: Record<string, CloudflareProperty> = {
    ...resource.updateProperties,
    ...resource.createProperties,
  };
  const result: string[] = [];
  for (const [name, prop] of Object.entries(allProps)) {
    if (skipFields.has(name)) continue;
    if (!SCALAR_TYPES.has(prop.type)) continue;
    result.push(name);
  }
  return result;
}
