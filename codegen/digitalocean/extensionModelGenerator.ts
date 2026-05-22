// Generates individual DigitalOcean extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type {
  DigitalOceanAction,
  DigitalOceanProperty,
  DigitalOceanResource,
  DigitalOceanSubResourceMethod,
} from "./pipeline.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";

// DigitalOcean regions for z.enum generation
const DO_REGIONS = [
  "nyc1",
  "sfo1",
  "nyc2",
  "ams2",
  "sgp1",
  "lon1",
  "nyc3",
  "ams3",
  "fra1",
  "tor1",
  "sfo2",
  "blr1",
  "sfo3",
  "syd1",
  "atl1",
];

export interface ExtensionModelInput {
  /** Resource definition from the pipeline */
  resource: DigitalOceanResource;
  /** Extension name, e.g., "@swamp/digitalocean" */
  extensionName: string;
  /** CalVer version string */
  version: string;
  /** Pre-built upgrades block to insert after version line */
  upgradesBlock?: string;
}

/**
 * Generates a complete extension model .ts file for a single DigitalOcean resource.
 */
export function generateDigitalOceanExtensionModel(
  input: ExtensionModelInput,
): string {
  const { resource, extensionName, version } = input;
  const modelType = `${extensionName}/${resource.modelSlug}`;
  const endpoint = resource.endpoint;
  const actionResourceName = resource.modelSlug.replace(/-/g, "_") + "_action";
  const isChildResource = !!resource.parentParam;
  const dynamicEndpointTemplate = isChildResource
    ? endpoint.replace(
      `{${resource.parentParam}}`,
      `\${g.${resource.parentParam}}`,
    )
    : null;
  const endpointLine = isChildResource
    ? `        const endpoint = \`${dynamicEndpointTemplate}\`;`
    : null;
  const ep = (quote: boolean) =>
    isChildResource ? "endpoint" : quote ? `"${endpoint}"` : endpoint;

  const lines: string[] = [];

  // Header
  lines.push(`// Auto-generated extension model for ${modelType}`);
  lines.push(
    `// Do not edit manually. Re-generate with: deno task generate:digitalocean`,
  );
  lines.push("");
  lines.push(`// deno-lint-ignore-file no-explicit-any`);
  lines.push("");

  // Module-level JSDoc
  const doSingular = resource.modelSlug.replace(/-/g, " ");
  lines.push(`/**`);
  lines.push(
    ` * Swamp extension model for a DigitalOcean ${doSingular}.`,
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
  if (resource.discoveryEndpoint) helperImports.push("discover");
  if (resource.handlers.delete) helperImports.push("remove");
  if (resource.subResourceMethods.length > 0) {
    helperImports.push("subResourceUpdate");
  }
  // tryFindByField needed for checkExists on numeric-id resources with a name/label field.
  // Check if the resource has a natural naming field (same logic as resolveNamingField).
  const hasNaturalName = !resource.forceSyntheticName &&
    !!(resource.createProperties["name"] ||
      resource.createProperties["label"]);
  const hasListFilter = hasNaturalName &&
    !["name", "ip", "uuid"].includes(resource.identifyingField);
  if (hasListFilter) helperImports.push("tryFindByField");
  if (resource.handlers.update) helperImports.push("update");
  if (resource.actions.length > 0) helperImports.push("createAndPollAction");
  if (resource.readiness) helperImports.push("pollResourceReady");
  lines.push(
    `import { ${helperImports.join(", ")} } from "./_lib/digitalocean.ts";`,
  );
  lines.push("");

  // Determine the naming field for instance names (factory pattern).
  // This must be a user-provided field in globalArgs, not an API-generated value.
  const { field: namingField, synthetic: isSyntheticName } = resolveNamingField(
    resource,
  );

  // GlobalArgsSchema — all create + update properties with full fidelity
  const globalArgsProps = buildGlobalArgsProperties(resource);
  lines.push(`const GlobalArgsSchema = z.object({`);
  if (resource.parentParam) {
    lines.push(
      `  ${resource.parentParam}: z.string().describe("Parent resource identifier"),`,
    );
  }
  if (isSyntheticName) {
    lines.push(
      `  ${namingField}: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.line},`);
  }
  lines.push(`});`);
  lines.push("");

  // ResourceSchema — all GET response properties, simplified
  lines.push(`const ResourceSchema = z.object({`);
  for (const [name, prop] of Object.entries(resource.resourceProperties)) {
    const expr = generateSimplifiedZod(prop);
    let line = `  ${name}: ${expr}`;
    if (prop.nullable) line += `.nullable()`;
    if (name !== resource.identifyingField && name !== "id") {
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
  if (resource.parentParam) {
    lines.push(`  ${resource.parentParam}: z.string().optional(),`);
  }
  if (isSyntheticName) {
    lines.push(`  ${namingField}: z.string().optional(),`);
  }
  for (const prop of globalArgsProps) {
    lines.push(`  ${prop.nameOnly}: ${prop.baseExpr}.optional(),`);
  }
  lines.push(`});`);
  lines.push("");

  // Model export
  const identifyingField = resource.identifyingField;

  lines.push(
    `/** Swamp extension model for DigitalOcean ${doSingular}. Registered at \`${modelType}\`. */`,
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
  lines.push(
    `      description: "${resource.displayName} resource state",`,
  );
  lines.push(`      schema: ResourceSchema,`);
  lines.push(`      lifetime: "infinite",`);
  lines.push(`      garbageCollection: 10,`);
  lines.push(`    },`);
  if (resource.actions.length > 0) {
    lines.push(`    ${actionResourceName}: {`);
    lines.push(
      `      description: "${resource.displayName} action result",`,
    );
    lines.push(`      schema: z.object({}).passthrough(),`);
    lines.push(`      lifetime: "ephemeral",`);
    lines.push(`      garbageCollection: 5,`);
    lines.push(`    },`);
  }
  lines.push(`  },`);
  lines.push(`  methods: {`);

  // create method
  // checkExists: guard against creating a resource that already exists.
  // Available for all resources with a non-synthetic naming field.
  // - Direct lookup (name/ip/uuid identified): tryRead by identifying field
  // - List+filter (numeric id): tryFindByField by name/label
  const canDirectLookup = !isSyntheticName &&
    ["name", "ip", "uuid"].includes(resource.identifyingField);
  const canListFilter = !isSyntheticName && !canDirectLookup &&
    !!(resource.createProperties["name"] ||
      resource.createProperties["label"]);
  const listFilterField = canListFilter
    ? (resource.createProperties["name"] ? "name" : "label")
    : undefined;
  const canCheckExists = canDirectLookup || canListFilter;

  // Build create method arguments: checkExists + waitForReady as applicable
  const hasReadiness = !!resource.readiness;
  const createArgFields: string[] = [];
  const createTsArgFields: string[] = [];
  if (canCheckExists) {
    createArgFields.push(
      `checkExists: z.boolean().describe("If true, check whether a resource with this name already exists before creating and fail if it does (default: false)").optional()`,
    );
    createTsArgFields.push("checkExists?: boolean");
  }
  if (hasReadiness) {
    createArgFields.push(
      `waitForReady: z.boolean().describe("Wait for the resource to reach ready state after creation (default: true)").optional()`,
    );
    createTsArgFields.push("waitForReady?: boolean");
  }
  const hasCreateArgs = createArgFields.length > 0;

  lines.push(`    create: {`);
  lines.push(
    `      description: "Create a ${resource.displayName.toLowerCase()}",`,
  );
  if (hasCreateArgs) {
    lines.push(
      `      arguments: z.object({ ${createArgFields.join(", ")} }),`,
    );
    lines.push(
      `      execute: async (args: { ${
        createTsArgFields.join(", ")
      } }, context: any) => {`,
    );
  } else {
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
  }
  lines.push(`        const g = context.globalArgs;`);
  if (endpointLine) lines.push(endpointLine);
  lines.push(
    `        const instanceName = ${
      wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
    };`,
  );

  // checkExists: error if resource already exists
  if (canDirectLookup) {
    lines.push(`        if (args.checkExists) {`);
    lines.push(
      `          const existing = await tryRead(${
        ep(true)
      }, g.${namingField});`,
    );
    lines.push(`          if (existing) {`);
    lines.push(
      `            throw new Error(\`Resource already exists: \${g.${namingField}}\`);`,
    );
    lines.push(`          }`);
    lines.push(`        }`);
  } else if (canListFilter) {
    lines.push(`        if (args.checkExists) {`);
    lines.push(
      `          const existing = await tryFindByField(${
        ep(true)
      }, "${listFilterField}", g.${listFilterField}?.toString() ?? "");`,
    );
    lines.push(`          if (existing) {`);
    lines.push(
      `            throw new Error(\`Resource already exists with ${listFilterField}: \${g.${listFilterField}}\`);`,
    );
    lines.push(`          }`);
    lines.push(`        }`);
  }

  lines.push(`        const body: Record<string, unknown> = {};`);
  for (const name of Object.keys(resource.createProperties)) {
    lines.push(
      `        if (g.${name} !== undefined) body.${name} = g.${name};`,
    );
  }

  if (hasReadiness) {
    // Create then optionally poll for readiness
    lines.push(
      `        let result = await create(${ep(true)}, body) as ResourceData;`,
    );
    lines.push(`        if (args.waitForReady !== false) {`);
    lines.push(
      `          const resourceId = result.${identifyingField} ?? result.id;`,
    );
    lines.push(`          if (resourceId) {`);
    lines.push(
      `            result = await pollResourceReady(${
        ep(true)
      }, resourceId as string | number, ${
        JSON.stringify(resource.readiness)
      }) as ResourceData;`,
    );
    lines.push(`          }`);
    lines.push(`        }`);
  } else {
    lines.push(
      `        const result = await create(${ep(true)}, body) as ResourceData;`,
    );
  }

  lines.push(
    `        const handle = await context.writeResource("state", instanceName, result);`,
  );
  lines.push(`        return { dataHandles: [handle] };`);
  lines.push(`      },`);
  lines.push(`    },`);

  // get method
  const idArg = resolveIdArg(resource);
  lines.push(`    get: {`);
  lines.push(
    `      description: "Get a ${resource.displayName.toLowerCase()}",`,
  );
  lines.push(
    `      arguments: z.object({ ${idArg.argName}: ${idArg.zodExpr}.describe(${
      JSON.stringify(idArg.description)
    }) }),`,
  );
  lines.push(
    `      execute: async (args: { ${idArg.argName}: ${idArg.tsType} }, context: any) => {`,
  );
  if (endpointLine) {
    lines.push(`        const g = context.globalArgs;`);
    lines.push(endpointLine);
  }
  lines.push(
    `        const result = await read(${
      ep(true)
    }, args.${idArg.argName}) as ResourceData;`,
  );
  if (isSyntheticName) {
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingField}?.toString() ?? args.${idArg.argName}.toString()`,
        )
      };`,
    );
  } else {
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `result.${namingField}?.toString() ?? args.${idArg.argName}.toString()`,
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

  // update method — only if PATCH/PUT handler exists
  if (resource.handlers.update && resource.updateMethod) {
    lines.push(`    update: {`);
    lines.push(
      `      description: "Update ${resource.displayName.toLowerCase()} attributes",`,
    );
    if (hasReadiness) {
      lines.push(
        `      arguments: z.object({ waitForReady: z.boolean().describe("Wait for the resource to reach ready state after update (default: true)").optional() }),`,
      );
      lines.push(
        `      execute: async (args: { waitForReady?: boolean }, context: any) => {`,
      );
    } else {
      lines.push(`      arguments: z.object({}),`);
      lines.push(
        `      execute: async (_args: Record<string, never>, context: any) => {`,
      );
    }
    lines.push(`        const g = context.globalArgs;`);
    if (endpointLine) lines.push(endpointLine);
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
    if (hasReadiness) {
      lines.push(
        `        let result = await update(${
          ep(true)
        }, existing.${identifyingField} ?? existing.id, body, "${resource.updateMethod}") as ResourceData;`,
      );
      lines.push(`        if (args.waitForReady !== false) {`);
      lines.push(
        `          const resourceId = result.${identifyingField} ?? result.id ?? existing.${identifyingField} ?? existing.id;`,
      );
      lines.push(`          if (resourceId) {`);
      lines.push(
        `            result = await pollResourceReady(${
          ep(true)
        }, resourceId as string | number, ${
          JSON.stringify(resource.readiness)
        }) as ResourceData;`,
      );
      lines.push(`          }`);
      lines.push(`        }`);
    } else {
      lines.push(
        `        const result = await update(${
          ep(true)
        }, existing.${identifyingField} ?? existing.id, body, "${resource.updateMethod}") as ResourceData;`,
      );
    }
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
      `      description: "Delete the ${resource.displayName.toLowerCase()}",`,
    );
    lines.push(
      `      arguments: z.object({ ${idArg.argName}: ${idArg.zodExpr}.describe(${
        JSON.stringify(idArg.description)
      }) }),`,
    );
    lines.push(
      `      execute: async (args: { ${idArg.argName}: ${idArg.tsType} }, context: any) => {`,
    );
    if (endpointLine) {
      lines.push(`        const g = context.globalArgs;`);
      lines.push(endpointLine);
    }
    lines.push(
      `        const { existed } = await remove(${
        ep(true)
      }, args.${idArg.argName});`,
    );
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingField}?.toString() ?? args.${idArg.argName}.toString()`,
        )
      };`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, {`,
    );
    lines.push(`          ${idArg.argName}: args.${idArg.argName},`);
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
    `      description: "Sync ${resource.displayName.toLowerCase()} state from DigitalOcean",`,
  );
  lines.push(`      arguments: z.object({}),`);
  lines.push(
    `      execute: async (_args: Record<string, never>, context: any) => {`,
  );
  lines.push(`        const g = context.globalArgs;`);
  if (endpointLine) lines.push(endpointLine);
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
    `        const result = await tryRead(${
      ep(true)
    }, existing.${identifyingField} ?? existing.id) as ResourceData | null;`,
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
  lines.push(
    `          ${identifyingField}: existing.${identifyingField} ?? existing.id,`,
  );
  lines.push(`          status: "not_found",`);
  lines.push(`          syncedAt: new Date().toISOString(),`);
  lines.push(`        });`);
  lines.push(`        return { dataHandles: [handle] };`);
  lines.push(`      },`);
  lines.push(`    },`);

  // Action methods
  if (resource.actions.length > 0) {
    const crudNames = new Set(["create", "get", "update", "delete"]);
    for (const action of resource.actions) {
      generateActionMethod(
        lines,
        action,
        resource,
        idArg,
        crudNames,
        actionResourceName,
        namingField,
        isSyntheticName,
      );
    }
  }

  // Sub-resource methods
  if (resource.subResourceMethods.length > 0) {
    // Collect all existing method names to avoid collisions
    const existingNames = new Set(["create", "get", "update", "delete"]);
    for (const action of resource.actions) {
      existingNames.add(action.actionType);
    }
    for (const subMethod of resource.subResourceMethods) {
      generateSubResourceMethod(
        lines,
        subMethod,
        resource,
        idArg,
        existingNames,
        namingField,
        isSyntheticName,
      );
    }
  }

  // Discovery method (list_options)
  if (resource.discoveryEndpoint) {
    const displayName = resource.displayName.toLowerCase();
    lines.push(`    list_options: {`);
    lines.push(
      `      description: "List available options for ${displayName} (versions, sizes, regions)",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(
      `        const result = await discover("${resource.discoveryEndpoint}");`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", "options", result);`,
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

/** Map a DigitalOceanProperty type to a TypeScript type string */
function propertyToTsType(prop: DigitalOceanProperty): string {
  switch (prop.type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    case "array":
      return "unknown[]";
    case "object":
      return "Record<string, unknown>";
    default:
      return "unknown";
  }
}

/** Map a DigitalOceanProperty to a Zod expression for action method arguments */
function propertyToZodExpr(prop: DigitalOceanProperty): string {
  switch (prop.type) {
    case "string": {
      if (prop.enum && prop.enum.length > 0) {
        const vals = prop.enum.map((v) => JSON.stringify(v));
        return `z.enum([${vals.join(", ")}])`;
      }
      return "z.string()";
    }
    case "number":
    case "integer":
      return prop.type === "integer" ? "z.number().int()" : "z.number()";
    case "boolean":
      return "z.boolean()";
    case "array":
      if (prop.items) {
        return `z.array(${propertyToZodExpr(prop.items)})`;
      }
      return "z.array(z.unknown())";
    case "object":
      return "z.record(z.string(), z.unknown())";
    default:
      return "z.unknown()";
  }
}

/** Generate a single action method and append its lines */
function generateActionMethod(
  lines: string[],
  action: DigitalOceanAction,
  resource: DigitalOceanResource,
  idArg: {
    argName: string;
    zodExpr: string;
    tsType: string;
    description: string;
  },
  crudNames: Set<string>,
  actionResourceName: string,
  namingField: string,
  isSyntheticName: boolean,
): void {
  // Guard against CRUD name collisions
  let methodName = action.actionType;
  if (crudNames.has(methodName)) {
    methodName = `action_${methodName}`;
  }

  const endpoint = resource.endpoint;
  const extraProps = Object.entries(action.properties);
  const requiredSet = new Set(action.requiredProperties);

  // Build argument fields
  const argFields: string[] = [
    `${idArg.argName}: ${idArg.zodExpr}.describe(${
      JSON.stringify(idArg.description)
    })`,
  ];
  const tsArgFields: string[] = [
    `${idArg.argName}: ${idArg.tsType}`,
  ];

  for (const [name, prop] of extraProps) {
    const zodExpr = propertyToZodExpr(prop);
    const isRequired = requiredSet.has(name);
    let field = `${name}: ${zodExpr}`;
    if (prop.description) {
      field += `.describe(${JSON.stringify(prop.description)})`;
    }
    if (!isRequired) {
      field += `.optional()`;
    }
    argFields.push(field);

    const tsType = propertyToTsType(prop);
    tsArgFields.push(`${name}${isRequired ? "" : "?"}: ${tsType}`);
  }

  // Add waitForCompletion argument
  argFields.push(
    `waitForCompletion: z.boolean().describe("Wait for the action to complete before returning (default: true)").optional()`,
  );
  tsArgFields.push("waitForCompletion?: boolean");

  const displayName = resource.displayName.toLowerCase();
  const description = `${
    action.actionType.replace(/_/g, " ")
  } the ${displayName}`;

  lines.push(`    ${methodName}: {`);
  lines.push(`      description: ${JSON.stringify(description)},`);
  lines.push(`      arguments: z.object({`);
  for (const field of argFields) {
    lines.push(`        ${field},`);
  }
  lines.push(`      }),`);
  lines.push(
    `      execute: async (args: { ${
      tsArgFields.join(", ")
    } }, context: any) => {`,
  );

  // Body construction depends on nestedParams
  if (action.nestedParams) {
    // NFS pattern: some properties go into body.params, others stay top-level
    const topLevelProps = extraProps.filter(([name]) => name === "region");
    const nestedProps = extraProps.filter(([name]) => name !== "region");

    lines.push(
      `        const params: Record<string, unknown> = {};`,
    );
    for (const [name] of nestedProps) {
      lines.push(
        `        if (args.${name} !== undefined) params.${name} = args.${name};`,
      );
    }
    lines.push(
      `        const body: Record<string, unknown> = { type: ${
        JSON.stringify(action.actionType)
      }, params };`,
    );
    for (const [name] of topLevelProps) {
      lines.push(
        `        if (args.${name} !== undefined) body.${name} = args.${name};`,
      );
    }
  } else {
    // Standard flat body
    lines.push(
      `        const body: Record<string, unknown> = { type: ${
        JSON.stringify(action.actionType)
      } };`,
    );
    for (const [name] of extraProps) {
      lines.push(
        `        if (args.${name} !== undefined) body.${name} = args.${name};`,
      );
    }
  }

  // Use createAndPollAction for polling support
  lines.push(
    `        const { action: actionResult, resource: updatedResource } = await createAndPollAction("${endpoint}", args.${idArg.argName}, body, args.waitForCompletion ?? true);`,
  );
  lines.push(
    "        const actionInstanceName = `${args." + idArg.argName + "}-" +
      action.actionType + "`;",
  );
  lines.push(`        const handles = [];`);
  lines.push(
    `        const actionHandle = await context.writeResource("${actionResourceName}", actionInstanceName, actionResult);`,
  );
  lines.push(`        handles.push(actionHandle);`);
  // Write updated resource state if the resource was re-read after polling
  lines.push(`        if (updatedResource) {`);
  if (isSyntheticName) {
    lines.push(
      `          const resourceInstanceName = context.globalArgs.${namingField}?.toString() ?? args.${idArg.argName}.toString();`,
    );
  } else {
    lines.push(
      `          const resourceInstanceName = (updatedResource as Record<string, unknown>).${namingField}?.toString() ?? args.${idArg.argName}.toString();`,
    );
  }
  lines.push(
    `          const stateHandle = await context.writeResource("state", resourceInstanceName, updatedResource);`,
  );
  lines.push(`          handles.push(stateHandle);`);
  lines.push(`        }`);
  lines.push(`        return { dataHandles: handles };`);
  lines.push(`      },`);
  lines.push(`    },`);
}

/** Generate a single sub-resource method and append its lines */
function generateSubResourceMethod(
  lines: string[],
  subMethod: DigitalOceanSubResourceMethod,
  resource: DigitalOceanResource,
  idArg: {
    argName: string;
    zodExpr: string;
    tsType: string;
    description: string;
  },
  existingNames: Set<string>,
  namingField: string,
  isSyntheticName: boolean,
): void {
  // Guard against name collisions
  let methodName = subMethod.methodName;
  if (existingNames.has(methodName)) {
    methodName = `sub_${methodName}`;
  }
  existingNames.add(methodName);

  const endpoint = resource.endpoint;
  const extraProps = Object.entries(subMethod.properties);
  const requiredSet = new Set(subMethod.requiredProperties);

  // Build argument fields
  const argFields: string[] = [
    `${idArg.argName}: ${idArg.zodExpr}.describe(${
      JSON.stringify(idArg.description)
    })`,
  ];
  const tsArgFields: string[] = [
    `${idArg.argName}: ${idArg.tsType}`,
  ];

  for (const [name, prop] of extraProps) {
    const zodExpr = propertyToZodExpr(prop);
    const isRequired = requiredSet.has(name);
    let field = `${name}: ${zodExpr}`;
    if (prop.description) {
      field += `.describe(${JSON.stringify(prop.description)})`;
    }
    if (!isRequired) {
      field += `.optional()`;
    }
    argFields.push(field);

    const tsType = propertyToTsType(prop);
    tsArgFields.push(`${name}${isRequired ? "" : "?"}: ${tsType}`);
  }

  const displayName = resource.displayName.toLowerCase();
  const description = `${
    subMethod.methodName.replace(/_/g, " ")
  } the ${displayName}`;

  lines.push(`    ${methodName}: {`);
  lines.push(`      description: ${JSON.stringify(description)},`);
  lines.push(`      arguments: z.object({`);
  for (const field of argFields) {
    lines.push(`        ${field},`);
  }
  lines.push(`      }),`);
  lines.push(
    `      execute: async (args: { ${
      tsArgFields.join(", ")
    } }, context: any) => {`,
  );

  // Build request body
  lines.push(`        const body: Record<string, unknown> = {};`);
  for (const [name] of extraProps) {
    lines.push(
      `        if (args.${name} !== undefined) body.${name} = args.${name};`,
    );
  }

  // Call subResourceUpdate
  lines.push(
    `        await subResourceUpdate("${endpoint}", args.${idArg.argName}, ${
      JSON.stringify(subMethod.subPath)
    }, body, ${JSON.stringify(subMethod.httpMethod)});`,
  );

  // Re-read the parent resource and write to state
  lines.push(
    `        const result = await read("${endpoint}", args.${idArg.argName}) as ResourceData;`,
  );
  if (isSyntheticName) {
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `context.globalArgs.${namingField}?.toString() ?? args.${idArg.argName}.toString()`,
        )
      };`,
    );
  } else {
    lines.push(
      `        const instanceName = ${
        wrapWithSanitize(
          `result.${namingField}?.toString() ?? args.${idArg.argName}.toString()`,
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

/** Build the list of globalArgs properties (create + update, deduped) */
function buildGlobalArgsProperties(
  resource: DigitalOceanResource,
): { line: string; nameOnly: string; baseExpr: string }[] {
  const result: { line: string; nameOnly: string; baseExpr: string }[] = [];
  const seen = new Set<string>();

  // Merge create and update properties, create takes precedence
  const allProps: Record<string, DigitalOceanProperty> = {
    ...resource.updateProperties,
    ...resource.createProperties,
  };

  for (const [name, prop] of Object.entries(allProps)) {
    if (seen.has(name)) continue;
    seen.add(name);

    const baseExpr = prop.isRegion
      ? generateRegionZod()
      : generateFullFidelityZod(prop);
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

/**
 * Determine the naming field for factory-pattern instance names.
 * Returns the field name from createProperties that should be used as the
 * instance name. If no natural naming field exists, returns "name" — a
 * synthetic field will be injected into globalArgs for the factory pattern.
 */
function resolveNamingField(
  resource: DigitalOceanResource,
): { field: string; synthetic: boolean } {
  if (resource.forceSyntheticName) {
    const field = resource.createProperties.name ? "instance_name" : "name";
    return { field, synthetic: true };
  }
  // Prefer "name" if it exists in create properties
  if (resource.createProperties.name) {
    return { field: "name", synthetic: false };
  }
  // Fall back to "label" (e.g., function namespaces)
  if (resource.createProperties.label) {
    return { field: "label", synthetic: false };
  }
  // No natural naming field — inject a synthetic "name" for the factory pattern
  return { field: "name", synthetic: true };
}

/**
 * Derive argument metadata for get/delete methods based on the identifying field.
 */
function resolveIdArg(resource: DigitalOceanResource): {
  argName: string;
  zodExpr: string;
  tsType: string;
  description: string;
} {
  const field = resource.identifyingField;
  const paramHint = resource.idParam;

  switch (field) {
    case "name":
      return {
        argName: "name",
        zodExpr: `z.string()`,
        tsType: "string",
        description: `The name of the ${resource.displayName.toLowerCase()}`,
      };
    case "ip":
      return {
        argName: "ip",
        zodExpr: `z.string()`,
        tsType: "string",
        description:
          `The IP address of the ${resource.displayName.toLowerCase()}`,
      };
    case "uuid":
      return {
        argName: "uuid",
        zodExpr: `z.string()`,
        tsType: "string",
        description: `The UUID of the ${resource.displayName.toLowerCase()}`,
      };
    case "id":
    default: {
      // Check if the path param suggests a UUID (contains "uuid")
      if (paramHint.includes("uuid")) {
        return {
          argName: "id",
          zodExpr: `z.string()`,
          tsType: "string",
          description: `The UUID of the ${resource.displayName.toLowerCase()}`,
        };
      }
      return {
        argName: "id",
        zodExpr: `z.union([z.string(), z.number()])`,
        tsType: "string | number",
        description: `The ID of the ${resource.displayName.toLowerCase()}`,
      };
    }
  }
}

/** Generate a z.enum for DigitalOcean regions */
function generateRegionZod(): string {
  const vals = DO_REGIONS.map((r) => JSON.stringify(r));
  return `z.enum([${vals.join(", ")}])`;
}

/** Generate a Zod expression with full fidelity (constraints, enums) for input schemas */
function generateFullFidelityZod(prop: DigitalOceanProperty): string {
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
        const itemExpr = prop.items.isRegion
          ? generateRegionZod()
          : generateFullFidelityZod(prop.items);
        return `z.array(${itemExpr})`;
      }
      return "z.array(z.unknown())";
    }

    case "object": {
      if (prop.properties && Object.keys(prop.properties).length > 0) {
        const requiredSet = new Set(prop.requiredProperties ?? []);
        const fields = Object.entries(prop.properties).map(
          ([k, v]) => {
            const expr = v.isRegion
              ? generateRegionZod()
              : generateFullFidelityZod(v);
            const suffix = requiredSet.has(k) ? "" : ".optional()";
            return `    ${k}: ${expr}${suffix}`;
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
function generateSimplifiedZod(prop: DigitalOceanProperty): string {
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
        const itemExpr = prop.items.isRegion
          ? generateRegionZod()
          : generateSimplifiedZod(prop.items);
        return `z.array(${itemExpr})`;
      }
      return "z.array(z.unknown())";
    }
    case "object": {
      if (prop.properties && Object.keys(prop.properties).length > 0) {
        const fields = Object.entries(prop.properties).map(
          ([k, v]) => {
            const expr = v.isRegion
              ? generateRegionZod()
              : generateSimplifiedZod(v);
            return `    ${k}: ${expr}.optional()`;
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
