// Generates individual Vercel extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { VercelProperty, VercelResource } from "./pipeline.ts";
import { generateCopyrightHeader } from "../shared/licenseGenerator.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";
import { liveFillFields } from "../shared/liveFill.ts";

const VALID_JS_IDENT = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
function quoteProp(name: string): string {
  return VALID_JS_IDENT.test(name) ? name : JSON.stringify(name);
}

export interface ExtensionModelInput {
  resource: VercelResource;
  extensionName: string;
  version: string;
  upgradesBlock?: string;
}

export function generateVercelExtensionModel(
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
    `// Do not edit manually. Re-generate with: deno task generate:vercel`,
  );
  lines.push("");
  lines.push(`// deno-lint-ignore-file no-explicit-any`);
  lines.push("");

  const singular = resource.displayName;
  lines.push(`/**`);
  lines.push(` * Swamp extension model for a Vercel ${singular}.`);
  lines.push(` *`);
  lines.push(
    ` * Wraps the Vercel API as a swamp model so create, get, lookup,`,
  );
  lines.push(
    ` * adopt, update, delete, and sync can be driven through \`swamp model\`.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push("");

  lines.push(`import { z } from "npm:zod@4.3.6";`);

  const helperImports: string[] = ["create"];
  if (resource.listPath || resource.paginationStyle !== "none") {
    helperImports.push("listAll");
  }
  if (resource.hasIndividualRead) {
    helperImports.push("read", "tryRead");
  }
  if (resource.handlers.delete && resource.deleteBasePath) {
    helperImports.push("remove");
  }
  if (resource.handlers.update && resource.updateBasePath) {
    helperImports.push("update");
  }
  lines.push(
    `import { ${helperImports.join(", ")} } from "./_lib/vercel.ts";`,
  );
  lines.push("");

  // Parent path params are emitted as their own global args, so a resource
  // property with the same name is skipped. A property named like a team
  // scope or auth arg (teamId, slug, token) is renamed instead; see
  // globalArgName.
  const injectedFields = new Set<string>();
  for (const pp of resource.parentParams) injectedFields.add(pp.paramName);
  const argOf = (name: string) => globalArgName(resource, name);
  const namingArg = argOf(resource.namingField);

  // --- GlobalArgsSchema ---
  const globalArgsProps = buildGlobalArgsProperties(resource, injectedFields);

  const allPropNames = new Set([
    ...Object.keys(resource.createProperties),
    ...Object.keys(resource.updateProperties),
  ]);

  const authSuffix = ", { token: g.token }";
  const teamSuffix = ", { teamId: g.teamId, slug: g.slug }";

  lines.push(`const GlobalArgsSchema = z.object({`);

  // Team scoping parameters
  lines.push(
    `  teamId: z.string().optional().describe("Vercel team ID"),`,
  );
  lines.push(
    `  slug: z.string().optional().describe("Vercel team slug (alternative to teamId)"),`,
  );

  // Parent path parameters (e.g., domain for DNS records)
  // Skip parent params that collide with team scoping params
  const teamScopeParams = new Set(["teamId", "slug"]);
  for (const pp of resource.parentParams) {
    if (teamScopeParams.has(pp.paramName)) continue;
    lines.push(
      `  ${quoteProp(pp.paramName)}: z.string().describe(${
        JSON.stringify(pp.description)
      }),`,
    );
  }

  // Synthetic name if needed
  if (resource.syntheticName && !allPropNames.has(resource.namingField)) {
    lines.push(
      `  name: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }

  // Resource-specific properties
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.line},`);
  }

  // Auth token
  lines.push(
    `  token: z.string().meta({ sensitive: true }).describe("Vercel API token; overrides the VERCEL_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.").optional(),`,
  );

  lines.push(`});`);
  lines.push("");

  // --- ResourceSchema ---
  lines.push(`const ResourceSchema = z.object({`);
  for (const [name, prop] of Object.entries(resource.resourceProperties)) {
    const expr = generateSimplifiedZod(prop);
    const idFields = new Set(["id", "uid"]);
    let line = `  ${quoteProp(name)}: ${expr}`;
    if (!idFields.has(name)) {
      line += `.nullable().optional()`;
    }
    lines.push(`${line},`);
  }
  lines.push(`}).passthrough();`);
  lines.push("");
  lines.push(`type ResourceData = z.infer<typeof ResourceSchema>;`);
  lines.push("");

  // --- InputsSchema ---
  lines.push(`const InputsSchema = z.object({`);
  lines.push(`  teamId: z.string().optional(),`);
  lines.push(`  slug: z.string().optional(),`);
  for (const pp of resource.parentParams) {
    if (teamScopeParams.has(pp.paramName)) continue;
    lines.push(`  ${quoteProp(pp.paramName)}: z.string().optional(),`);
  }
  if (resource.syntheticName && !allPropNames.has(resource.namingField)) {
    lines.push(`  name: z.string().optional(),`);
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.nameOnly}: ${prop.baseExpr}.optional(),`);
  }
  lines.push(`  token: z.string().meta({ sensitive: true }).optional(),`);
  lines.push(`});`);
  lines.push("");

  // Response unwrapping for single-key envelopes (e.g., {domain: {...}})
  if (resource.responseUnwrapKey) {
    const key = resource.responseUnwrapKey;
    lines.push(
      `function unwrapResponse(data: Record<string, unknown>): Record<string, unknown> {`,
    );
    lines.push(
      `  const inner = data[${JSON.stringify(key)}];`,
    );
    lines.push(
      `  if (inner && typeof inner === "object" && !Array.isArray(inner)) return inner as Record<string, unknown>;`,
    );
    lines.push(`  return data;`);
    lines.push(`}`);
    lines.push("");
  }

  // --- Model export ---
  lines.push(
    `/** Swamp extension model for Vercel ${singular}. Registered at \`${modelType}\`. */`,
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
  const idField = resource.identifyingField;
  const listIdField = resource.listIdentifyingField;
  // State written by lookup carries the list identifier, state written by
  // create/get/adopt the read identifier; methods that key on stored state
  // accept either when they differ.
  const hasListIdFallback = listIdField !== idField;
  const existingId = hasListIdFallback ? "existingId" : `existing.${idField}`;
  const existingIdLine =
    `        const existingId = existing.${idField} ?? existing.${listIdField};`;
  const hasUnwrap = !!resource.responseUnwrapKey;

  // Generate a const result = ... with optional unwrapping, avoiding lint issues with let
  const resultAssign = (
    apiCall: string,
    type: string = "ResourceData",
  ): string[] => {
    if (hasUnwrap) {
      return [
        `        const rawResult = ${apiCall} as ${type};`,
        `        const result = unwrapResponse(rawResult as Record<string, unknown>) as ${type};`,
      ];
    }
    return [`        const result = ${apiCall} as ${type};`];
  };

  // Per-operation endpoint builders — each CRUD method uses its own versioned path
  const ep = (path: string) => buildEndpointLines(resource, path);
  const createEp = ep(resource.createPath);
  const listEp = ep(resource.listPath ?? resource.createPath);
  const readEp = ep(resource.readBasePath);
  const updateEp = resource.updateBasePath
    ? ep(resource.updateBasePath)
    : readEp;
  const deleteEp = resource.deleteBasePath
    ? ep(resource.deleteBasePath)
    : readEp;

  // Create method suffix — some Vercel resources use PUT or PATCH instead of POST
  const createMethodArg = resource.createMethod !== "POST"
    ? `, "${resource.createMethod}"`
    : "";

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
  const createRequired = resource.createRequiredProperties
    .filter((k) => !injectedFields.has(k))
    .map(argOf)
    .sort();
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
  lines.push(...createEp);
  lines.push(`        const body: Record<string, unknown> = {};`);
  for (const name of Object.keys(resource.createProperties)) {
    if (injectedFields.has(name)) continue;
    lines.push(`        ${copyToBody(name, argOf(name))}`);
  }
  // Transform the body for APIs that expect non-standard shapes
  const bodyExpr = resource.bodyTransform === "wrapArray"
    ? `[body] as unknown as Record<string, unknown>`
    : resource.bodyTransform === "batchItems"
    ? `{ items: [{ operation: "upsert", ...body }] }`
    : "body";
  lines.push(
    `        const raw = await create(endpoint, ${bodyExpr}${authSuffix}${teamSuffix}${createMethodArg});`,
  );
  // Unwrap response envelopes
  if (resource.createResponseStyle === "batchFirst") {
    lines.push(
      `        const created = (raw as Record<string, unknown>).created;`,
    );
    lines.push(
      `        const result = (Array.isArray(created) ? created[0] : created) as ResourceData;`,
    );
    lines.push(
      `        if (!result) throw new Error("Create returned empty result — check the 'failed' array in the response for errors");`,
    );
  } else if (resource.responseUnwrapKey) {
    lines.push(
      `        const result = (raw as Record<string, unknown>)[${
        JSON.stringify(resource.responseUnwrapKey)
      }] as ResourceData;`,
    );
  } else {
    lines.push(`        const result = raw as ResourceData;`);
  }
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(`g.${namingArg}?.toString() ?? "current"`)
    };`,
  );
  lines.push(
    `        const handle = await context.writeResource("state", instanceName, result);`,
  );
  lines.push(`        return { dataHandles: [handle] };`);
  lines.push(`      },`);
  lines.push(`    },`);

  // --- get method (only if individual read exists) ---
  if (resource.hasIndividualRead) {
    lines.push(`    get: {`);
    lines.push(`      description: "Get a ${singular}",`);
    lines.push(
      `      arguments: z.object({ id: z.string().describe("The ID of the ${singular}") }),`,
    );
    lines.push(
      `      execute: async (args: { id: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...readEp);
    lines.push(
      ...resultAssign(
        `await read(endpoint, args.id${authSuffix}${teamSuffix})`,
      ),
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `g.${namingArg}?.toString() ?? args.id`,
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

  // --- lookup method ---
  const skipFields = new Set<string>();
  for (const pp of resource.parentParams) skipFields.add(pp.paramName);
  if (resource.syntheticName && !allPropNames.has(resource.namingField)) {
    skipFields.add("name");
  }
  const filterFields = collectFilterableFields(resource, skipFields);
  // Also add response-schema scalar fields as filterable for lookup. A
  // response-only teamId/slug/token is not a resource global arg (the team
  // scope args mean something else), so it is not a filter.
  const responseFilterFields = collectResponseFilterableFields(
    resource,
    new Set([...skipFields, ...TEAM_SCOPE_ARGS]),
    new Set(filterFields),
  );
  const allFilterFields = [...filterFields, ...responseFilterFields];

  if (resource.listPath || resource.paginationStyle !== "none") {
    lines.push(`    lookup: {`);
    lines.push(
      `      description: "Look up an existing ${singular} by matching global argument values and import it into state",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...listEp);
    // A filter matched against a differently named item field (project ->
    // projectId) also records the global arg it came from, so a no-match
    // error names the arg the user set.
    const filterPairs = lookupFilters(resource, allFilterFields);
    const hasRemap = filterPairs.some(([name, itemKey]) => name !== itemKey);
    lines.push(
      `        const filters: ${
        hasRemap ? "[string, string, string]" : "[string, string]"
      }[] = [];`,
    );
    const filterDescExpr = hasRemap
      ? `filters.map(([k, v, arg]) => \`\${arg}=\${JSON.stringify(v)}\${arg === k ? "" : \` (matched against \${k})\`}\`).join(", ")`
      : `filters.map(([k, v]) => \`\${k}=\${JSON.stringify(v)}\`).join(", ")`;
    for (const [name, itemKey] of filterPairs) {
      const access = propAccess(argOf(name));
      const arg = hasRemap ? `, ${JSON.stringify(argOf(name))}` : "";
      lines.push(
        `        if (g${access} !== undefined) filters.push([${
          JSON.stringify(itemKey)
        }, String(g${access})${arg}]);`,
      );
    }
    lines.push(
      `        if (filters.length === 0) throw new Error("At least one global argument must be set to filter by");`,
    );
    lines.push(
      `        const items = await listAll(endpoint, "${resource.paginationStyle}"${authSuffix}${teamSuffix}, undefined${
        resource.paginationCursorParam
          ? `, "${resource.paginationCursorParam}"`
          : ""
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
    lines.push(`          const filterDesc = ${filterDescExpr};`);
    lines.push(
      `          throw new Error(\`No ${singular.toLowerCase()} found matching filters: \${filterDesc}\`);`,
    );
    lines.push(`        }`);
    lines.push(`        if (matches.length > 1) {`);
    lines.push(`          const filterDesc = ${filterDescExpr};`);
    lines.push(
      `          throw new Error(\`Expected exactly 1 match, found \${matches.length} for filters: \${filterDesc}\`);`,
    );
    lines.push(`        }`);
    lines.push(`        const result = matches[0] as ResourceData;`);
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `g.${namingArg}?.toString() ?? result.${listIdField}?.toString() ?? "current"`,
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

  // --- adopt method (only if individual read exists) ---
  if (resource.hasIndividualRead) {
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
    lines.push(...readEp);
    lines.push(
      ...resultAssign(
        `await read(endpoint, args.id${authSuffix}${teamSuffix})`,
      ),
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `result.${namingField}?.toString() ?? g.${namingArg}?.toString() ?? args.id`,
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

  // --- update method ---
  if (resource.handlers.update && resource.updateBasePath) {
    lines.push(`    update: {`);
    lines.push(`      description: "Update ${singular} attributes",`);
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singular} by ${idField} (e.g. one discovered by list)").optional() }),`,
    );
    lines.push(
      `      execute: async (args: { identifier?: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...updateEp);
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `g.${namingArg}?.toString() ?? args.identifier ?? "current"`,
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
    if (hasListIdFallback) lines.push(existingIdLine);
    lines.push(`        const body: Record<string, unknown> = {};`);
    const updateKeys = Object.keys(resource.updateProperties).length > 0
      ? Object.keys(resource.updateProperties)
      : Object.keys(resource.createProperties).filter(
        (k) => !resource.createOnlyProperties.has(k),
      );
    // Create-only required fields are optional in GlobalArgsSchema, so a
    // full-replacement PUT update must still make sure it sends them.
    const isFullReplacement = resource.updateMethod === "PUT";
    const createRequiredSet = new Set(resource.createRequiredProperties);
    const updateRequired: string[] = [];
    for (const name of updateKeys) {
      if (injectedFields.has(name)) continue;
      lines.push(`        ${copyToBody(name, argOf(name))}`);
      if (isFullReplacement && createRequiredSet.has(name)) {
        updateRequired.push(name);
      }
    }
    // A PUT body replaces the resource, so every field left unset in
    // globalArgs would be cleared or reset to its default. Fill unset fields
    // from the live resource, not stored state (which can be stale), so an
    // unset field keeps its current value. See liveFillFields for which
    // fields qualify; create-required ones are always filled. The read reuses
    // the update endpoint, so it needs an individual read at the same path.
    const liveFill = isFullReplacement &&
        resource.hasIndividualRead &&
        resource.readBasePath === resource.updateBasePath
      ? liveFillFields(
        updateKeys.filter((k) => !injectedFields.has(k)),
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
      if (hasUnwrap) {
        lines.push(
          `          const live = unwrapResponse(await read(endpoint, ${existingId}${authSuffix}${teamSuffix}) as Record<string, unknown>) as Record<string, unknown>;`,
        );
      } else {
        lines.push(
          `          const live = await read(endpoint, ${existingId}${authSuffix}${teamSuffix}) as Record<string, unknown>;`,
        );
      }
      lines.push(
        `          for (const k of unset) if (live[k] !== undefined && live[k] !== null) body[k] = live[k];`,
      );
      lines.push(`        }`);
    }
    if (updateRequired.length > 0) {
      // Throw before the PUT rather than send a body that drops a field the
      // resource requires.
      lines.push(
        `        const missingForUpdate = ${
          JSON.stringify([...updateRequired].sort())
        }.filter((k) => body[k] === undefined);`,
      );
      const renamed = Object.fromEntries(
        updateRequired.filter((k) => argOf(k) !== k).map((k) => [k, argOf(k)]),
      );
      const names = Object.keys(renamed).length > 0
        ? `missingForUpdate.map((k) => (${
          JSON.stringify(renamed)
        } as Record<string, string>)[k] ?? k)`
        : "missingForUpdate";
      lines.push(
        `        if (missingForUpdate.length > 0) throw new Error("update requires global arguments: " + ${names}.join(", "));`,
      );
    }
    lines.push(
      ...resultAssign(
        `await update(endpoint, ${existingId}, body, "${resource.updateMethod}"${authSuffix}${teamSuffix})`,
      ),
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // --- delete method ---
  if (resource.handlers.delete && resource.deleteBasePath) {
    lines.push(`    delete: {`);
    lines.push(`      description: "Delete the ${singular}",`);
    lines.push(
      `      arguments: z.object({ id: z.string().describe("The ID of the ${singular}") }),`,
    );
    lines.push(
      `      execute: async (args: { id: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...deleteEp);
    lines.push(
      `        const { existed } = await remove(endpoint, args.id${authSuffix}${teamSuffix});`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingArg}?.toString() ?? args.id`,
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

  // --- sync method (only if individual read exists) ---
  if (resource.hasIndividualRead) {
    lines.push(`    sync: {`);
    lines.push(`      description: "Sync ${singular} state from Vercel",`);
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singular} by ${idField} (e.g. one discovered by list)").optional() }),`,
    );
    lines.push(
      `      execute: async (args: { identifier?: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(...readEp);
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `g.${namingArg}?.toString() ?? args.identifier ?? "current"`,
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
    if (hasListIdFallback) {
      lines.push(existingIdLine);
      lines.push(
        `        if (!existingId) throw new Error("Stored state has no ${idField} or ${listIdField} - cannot sync");`,
      );
    } else {
      lines.push(
        `        if (!existing.${idField}) throw new Error("Stored state has no ${idField} - cannot sync");`,
      );
    }
    if (resource.responseUnwrapKey) {
      lines.push(
        `        const rawSyncResult = await tryRead(endpoint, ${existingId}${authSuffix}${teamSuffix}) as ResourceData | null;`,
      );
      lines.push(
        `        const result = rawSyncResult ? unwrapResponse(rawSyncResult as Record<string, unknown>) as ResourceData : null;`,
      );
    } else {
      lines.push(
        `        const result = await tryRead(endpoint, ${existingId}${authSuffix}${teamSuffix}) as ResourceData | null;`,
      );
    }
    lines.push(`        if (result) {`);
    lines.push(
      `          const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`          return { dataHandles: [handle] };`);
    lines.push(`        }`);
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, {`,
    );
    lines.push(`          id: ${existingId},`);
    lines.push(`          status: "not_found",`);
    lines.push(`          syncedAt: new Date().toISOString(),`);
    lines.push(`        });`);
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  lines.push(`  },`);
  lines.push(`};`);
  lines.push("");

  return lines.join("\n");
}

function buildEndpointLines(resource: VercelResource, path: string): string[] {
  if (resource.parentParams.length === 0) {
    return [
      `        const endpoint = "${path}";`,
    ];
  }

  // Build endpoint with parent param interpolation
  // e.g., /v2/domains/{domain}/records → "/v2/domains/" + g.domain + "/records"
  let pathExpr = `"`;
  const parts = path.split("/");
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("{") && part.endsWith("}")) {
      const paramName = part.slice(1, -1);
      pathExpr += `" + encodeURIComponent(g.${paramName}) + "`;
      if (i < parts.length - 1) pathExpr += "/";
    } else {
      pathExpr += part;
      if (i < parts.length - 1) pathExpr += "/";
    }
  }
  pathExpr += `"`;
  // Clean up redundant empty strings
  pathExpr = pathExpr.replace(/"" \+ /g, "").replace(/ \+ ""/g, "");

  return [
    `        const endpoint = ${pathExpr};`,
  ];
}

/** Global args every model injects for team scoping and auth. */
const TEAM_SCOPE_ARGS = new Set(["teamId", "slug", "token"]);

/**
 * The global arg name for a resource property. A property named like an
 * injected team scope or auth arg would otherwise be shadowed by it and never
 * sent (e.g. an Edge Config's own `slug`), so it is exposed as `resource`
 * plus the capitalised name (`resourceSlug`) and mapped back to the API name
 * in request bodies, checks and lookup filters.
 */
export function globalArgName(resource: VercelResource, name: string): string {
  if (!TEAM_SCOPE_ARGS.has(name)) return name;
  const renamed = `resource${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  if (
    renamed in resource.createProperties || renamed in resource.updateProperties
  ) {
    throw new Error(
      `${resource.service}/${resource.modelSlug}: property ${name} cannot be renamed to ${renamed}, which is also a property`,
    );
  }
  return renamed;
}

/** A request-body field that holds a secret, in either the create or update body. */
function isSensitiveProperty(resource: VercelResource, name: string): boolean {
  return !!(resource.createProperties[name]?.sensitive ||
    resource.updateProperties[name]?.sensitive);
}

/**
 * The lookup filters as [global arg property, list item key] pairs. When the
 * list item schema is known, a filter is kept only if list items can match
 * it: by the same name, by the list identifier for the read identifier
 * (deployments: id -> uid), or by `<name>Id` (deployments: project ->
 * projectId). Secrets are never filters, since a no-match error prints them.
 */
function lookupFilters(
  resource: VercelResource,
  names: string[],
): [string, string][] {
  const items = resource.listItemProperties;
  const result: [string, string][] = [];
  for (const name of names) {
    if (isSensitiveProperty(resource, name)) continue;
    if (!items || items.includes(name)) {
      result.push([name, name]);
    } else if (name === resource.identifyingField) {
      if (items.includes(resource.listIdentifyingField)) {
        result.push([name, resource.listIdentifyingField]);
      }
    } else if (items.includes(`${name}Id`)) {
      result.push([name, `${name}Id`]);
    }
  }
  return result;
}

function propAccess(name: string): string {
  return VALID_JS_IDENT.test(name) ? `.${name}` : `[${JSON.stringify(name)}]`;
}

/** `if (g.<arg> !== undefined) body.<api> = g.<arg>;` */
function copyToBody(apiName: string, argName: string): string {
  const g = `g${propAccess(argName)}`;
  return `if (${g} !== undefined) body${propAccess(apiName)} = ${g};`;
}

function buildGlobalArgsProperties(
  resource: VercelResource,
  injectedFields: Set<string>,
): { line: string; nameOnly: string; baseExpr: string }[] {
  const result: { line: string; nameOnly: string; baseExpr: string }[] = [];

  const allProps: Record<string, VercelProperty> = {
    ...resource.updateProperties,
    ...resource.createProperties,
  };

  for (const [name, prop] of Object.entries(allProps)) {
    if (injectedFields.has(name)) continue;
    const sensitive = isSensitiveProperty(resource, name)
      ? `.meta({ sensitive: true })`
      : "";
    const baseExpr = `${generateFullFidelityZod(prop)}${sensitive}`;
    const qName = quoteProp(globalArgName(resource, name));
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

function generateFullFidelityZod(prop: VercelProperty): string {
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

function generateSimplifiedZod(prop: VercelProperty): string {
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
  resource: VercelResource,
  skipFields: Set<string>,
): string[] {
  const allProps: Record<string, VercelProperty> = {
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

function collectResponseFilterableFields(
  resource: VercelResource,
  skipFields: Set<string>,
  alreadyCollected: Set<string>,
): string[] {
  const result: string[] = [];
  for (const [name, prop] of Object.entries(resource.resourceProperties)) {
    if (skipFields.has(name)) continue;
    if (alreadyCollected.has(name)) continue;
    if (!SCALAR_TYPES.has(prop.type)) continue;
    result.push(name);
  }
  return result;
}
