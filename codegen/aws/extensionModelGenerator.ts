// Generates individual AWS extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { ZodGeneratorResult } from "../shared/zodGenerator.ts";
import type { CfSchema, OnlyProperties } from "../shared/schema/types.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";

/**
 * Handler availability for a resource, derived from cfSchema.handlers.
 */
export interface ResourceHandlers {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface AwsExtensionModelInput {
  /** AWS type name, e.g., "AWS::EC2::Instance" */
  typeName: string;
  /** Zod schema generation result */
  zodResult: ZodGeneratorResult;
  /** Only-properties from CF schema */
  onlyProperties: OnlyProperties;
  /** The full CF schema */
  cfSchema: CfSchema;
  /** Handler availability */
  handlers: ResourceHandlers;
  /** CalVer version string */
  version: string;
  /** Extension model type string, e.g., "@swamp/aws/ec2/instance" */
  modelType: string;
  /** Pre-built upgrades block to insert after version line */
  upgradesBlock?: string;
}

/**
 * Generates a complete extension model .ts file for a single AWS resource.
 */
export function generateAwsExtensionModel(
  input: AwsExtensionModelInput,
): string {
  const {
    typeName,
    zodResult,
    onlyProperties,
    handlers,
    version,
    modelType,
  } = input;

  const lines: string[] = [];

  // Detect if generated code contains control character regex escape sequences.
  // Deno lint's no-control-regex only flags patterns inside new RegExp() calls, not
  // in .describe() strings. It flags \\xNN and \\uNNNN (double-backslash escapes)
  // where NN/NNNN is in the control range (00-1F).
  const allContent = [
    zodResult.inputSchemaBody,
    zodResult.resourceSchemaBody,
    ...zodResult.extractedSchemas.map((s) => s.declaration),
  ].join("\n");
  const controlCharPattern =
    /\\\\x0[0-9a-fA-F]|\\\\x1[0-9a-fA-F]|\\\\u000[0-9a-fA-F]|\\\\u001[0-9a-fA-F]/;
  // Strip .describe("...") strings to avoid false positives from documentation text.
  // Uses a proper quoted-string pattern to handle parens inside the string.
  const withoutDescriptions = allContent.replace(
    /\.describe\(\s*"(?:[^"\\]|\\.)*"\s*,?\s*\)/g,
    "",
  );
  const hasControlRegex = controlCharPattern.test(withoutDescriptions);

  // Check if any extracted schema collides with our internal StateSchema name
  const hasStateSchemaCollision = zodResult.extractedSchemas.some(
    (s) => s.name === "StateSchema",
  );
  const stateSchemaName = hasStateSchemaCollision
    ? "_StateSchema"
    : "StateSchema";

  // Header
  lines.push(`// Auto-generated extension model for ${modelType}`);
  lines.push(
    `// Do not edit manually. Re-generate with: deno task generate:aws`,
  );
  lines.push("");
  const lintIgnores = ["no-explicit-any"];
  if (hasControlRegex) lintIgnores.push("no-control-regex");
  lines.push(`// deno-lint-ignore-file ${lintIgnores.join(" ")}`);
  lines.push("");

  // Module-level JSDoc
  const resourceDescription = typeNameToDescription(typeName);
  lines.push(`/**`);
  lines.push(
    ` * Swamp extension model for ${resourceDescription} (${typeName}).`,
  );
  lines.push(` *`);
  lines.push(
    ` * Wraps the CloudFormation resource type as a swamp model so create,`,
  );
  lines.push(
    ` * get, update, delete, and sync can be driven through \`swamp model\`.`,
  );
  lines.push(` *`);
  lines.push(` * @module`);
  lines.push(` */`);
  lines.push("");

  // Imports. The `npm:` prefix is required so `deno doc --lint` can resolve
  // zod standalone — it doesn't read the package's deno.json import map.
  lines.push(`import { z } from "npm:zod@4.3.6";`);

  const helperImports: string[] = [
    "isResourceNotFoundError",
    "readResource",
  ];
  if (handlers.create) helperImports.push("createResource");
  if (handlers.update) helperImports.push("updateResource");
  if (handlers.delete) helperImports.push("deleteResource");
  lines.push(
    `import { ${helperImports.join(", ")} } from "./_lib/aws.ts";`,
  );
  lines.push("");

  // Determine the naming field for factory-pattern instance names
  const { field: namingField, synthetic: isSyntheticName } = resolveNamingField(
    onlyProperties,
    input.cfSchema,
  );

  // Extracted nested schemas (from zodGenerator)
  if (zodResult.extractedSchemas.length > 0) {
    for (const schema of zodResult.extractedSchemas) {
      lines.push(schema.declaration);
      lines.push("");
    }
  }

  // GlobalArgsSchema — domain properties with full fidelity
  lines.push(`const GlobalArgsSchema = z.object({`);
  if (isSyntheticName) {
    lines.push(
      `  name: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }
  if (zodResult.inputSchemaBody) {
    lines.push(zodResult.inputSchemaBody);
  }
  lines.push(`});`);
  lines.push("");

  // StateSchema — all resource properties, simplified
  lines.push(`const ${stateSchemaName} = z.object({`);
  if (zodResult.resourceSchemaBody) {
    lines.push(zodResult.resourceSchemaBody);
  }
  lines.push(`}).passthrough();`);
  lines.push("");
  lines.push(`type StateData = z.infer<typeof ${stateSchemaName}>;`);
  lines.push("");

  // InputsSchema — mirrors globalArgs but all optional
  lines.push(`const InputsSchema = z.object({`);
  if (isSyntheticName) {
    lines.push(`  name: z.string().optional(),`);
  }
  if (zodResult.inputSchemaBody) {
    // Make all fields optional in InputsSchema
    const inputLines = zodResult.inputSchemaBody.split("\n");
    for (const line of inputLines) {
      const trimmed = line.trimEnd();
      if (!trimmed) continue;
      // If line already ends with .optional(), keep it
      if (trimmed.endsWith(".optional(),")) {
        lines.push(trimmed);
      } else if (trimmed.endsWith(",")) {
        // Add .optional() before the trailing comma
        lines.push(trimmed.slice(0, -1) + ".optional(),");
      } else {
        lines.push(trimmed);
      }
    }
  }
  lines.push(`});`);
  lines.push("");

  // Determine primary identifier field and createOnlyProperties
  const primaryId = onlyProperties.primaryIdentifier[0] || "ResourceIdentifier";
  const createOnlyProperties = onlyProperties.createOnly;

  // Resource description
  const resourceDesc = typeNameToDescription(typeName);

  // Model export
  lines.push(
    `/** Swamp extension model for ${resourceDesc}. Registered at \`${modelType}\`. */`,
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
  lines.push(`      description: "${resourceDesc} resource state",`);
  lines.push(`      schema: ${stateSchemaName},`);
  lines.push(`      lifetime: "infinite",`);
  lines.push(`      garbageCollection: 10,`);
  lines.push(`    },`);
  lines.push(`  },`);
  lines.push(`  methods: {`);

  // create method
  if (handlers.create) {
    lines.push(`    create: {`);
    lines.push(`      description: "Create a ${resourceDesc}",`);
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const desiredState: Record<string, unknown> = {};`);
    lines.push(`        for (const [key, value] of Object.entries(g)) {`);
    if (isSyntheticName) {
      lines.push(`          if (key === "name") continue;`);
    }
    lines.push(
      `          if (value !== undefined) desiredState[key] = value;`,
    );
    lines.push(`        }`);
    lines.push(
      `        const result = await createResource("${typeName}", desiredState) as StateData;`,
    );
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.name?.toString() ?? "current"`)
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `(result.${namingField} ?? g.${namingField})?.toString() ?? "current"`,
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

  // get method
  if (handlers.read) {
    lines.push(`    get: {`);
    lines.push(`      description: "Get a ${resourceDesc}",`);
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("The primary identifier of the ${resourceDesc}") }),`,
    );
    lines.push(
      `      execute: async (args: { identifier: string }, context: any) => {`,
    );
    lines.push(
      `        const result = await readResource("${typeName}", args.identifier) as StateData;`,
    );
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `context.globalArgs.name?.toString() ?? args.identifier`,
          )
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `(result.${namingField} ?? context.globalArgs.${namingField})?.toString() ?? args.identifier`,
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

  // update method
  if (handlers.update) {
    const isCompositeId = onlyProperties.primaryIdentifier.length > 1;

    lines.push(`    update: {`);
    lines.push(`      description: "Update a ${resourceDesc}",`);
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.name?.toString() ?? "current"`)
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
        };`,
      );
    }
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No existing state found - run create or get first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );

    if (isCompositeId) {
      // Composite identifier: join all primary identifier fields with "|"
      const idParts = onlyProperties.primaryIdentifier.map(
        (f) => `existing.${f}?.toString()`,
      );
      lines.push(
        `        const idParts = [${idParts.join(", ")}];`,
      );
      lines.push(
        `        if (idParts.some((p) => !p)) throw new Error("Missing primary identifier fields in existing state");`,
      );
      lines.push(
        `        const identifier = idParts.join("|");`,
      );
    } else {
      lines.push(
        `        const identifier = existing.${primaryId}?.toString();`,
      );
      lines.push(
        `        if (!identifier) throw new Error("No identifier found in existing state");`,
      );
    }

    lines.push(
      `        const currentState = await readResource("${typeName}", identifier) as StateData;`,
    );
    lines.push(
      `        const desiredState: Record<string, unknown> = { ...currentState };`,
    );
    lines.push(`        for (const [key, value] of Object.entries(g)) {`);
    if (isSyntheticName) {
      lines.push(`          if (key === "name") continue;`);
    }
    lines.push(
      `          if (value !== undefined) desiredState[key] = value;`,
    );
    lines.push(`        }`);
    if (createOnlyProperties.length > 0) {
      lines.push(
        `        const result = await updateResource("${typeName}", identifier, currentState, desiredState, ${
          JSON.stringify(createOnlyProperties)
        });`,
      );
    } else {
      lines.push(
        `        const result = await updateResource("${typeName}", identifier, currentState, desiredState);`,
      );
    }
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // delete method
  if (handlers.delete) {
    lines.push(`    delete: {`);
    lines.push(`      description: "Delete a ${resourceDesc}",`);
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("The primary identifier of the ${resourceDesc}") }),`,
    );
    lines.push(
      `      execute: async (args: { identifier: string }, context: any) => {`,
    );
    lines.push(
      `        const { existed } = await deleteResource("${typeName}", args.identifier);`,
    );
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `context.globalArgs.name?.toString() ?? args.identifier`,
          )
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `context.globalArgs.${namingField}?.toString() ?? args.identifier`,
          )
        };`,
      );
    }
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, {`,
    );
    lines.push(`          identifier: args.identifier,`);
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

  // sync method — always generated (requires read handler, which is guaranteed)
  {
    const isCompositeId = onlyProperties.primaryIdentifier.length > 1;

    lines.push(`    sync: {`);
    lines.push(
      `      description: "Sync ${resourceDesc} state from AWS",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.name?.toString() ?? "current"`)
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.${namingField}?.toString() ?? "current"`)
        };`,
      );
    }
    lines.push(
      `        const content = await context.dataRepository.getContent(`,
    );
    lines.push(
      `          context.modelType, context.modelId, instanceName,`,
    );
    lines.push(`        );`);
    lines.push(
      `        if (!content) throw new Error("No existing state found - run create or get first");`,
    );
    lines.push(
      `        const existing = JSON.parse(new TextDecoder().decode(content));`,
    );

    if (isCompositeId) {
      const idParts = onlyProperties.primaryIdentifier.map(
        (f) => `existing.${f}?.toString()`,
      );
      lines.push(
        `        const idParts = [${idParts.join(", ")}];`,
      );
      lines.push(
        `        if (idParts.some((p) => !p)) throw new Error("Missing primary identifier fields in existing state");`,
      );
      lines.push(
        `        const identifier = idParts.join("|");`,
      );
    } else {
      lines.push(
        `        const identifier = existing.${primaryId}?.toString();`,
      );
      lines.push(
        `        if (!identifier) throw new Error("No identifier found in existing state");`,
      );
    }

    lines.push(`        try {`);
    lines.push(
      `          const result = await readResource("${typeName}", identifier) as StateData;`,
    );
    lines.push(
      `          const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`          return { dataHandles: [handle] };`);
    lines.push(`        } catch (error: unknown) {`);
    lines.push(`          if (isResourceNotFoundError(error)) {`);
    lines.push(
      `            const handle = await context.writeResource("state", instanceName, {`,
    );
    lines.push(`              identifier,`);
    lines.push(`              status: "not_found",`);
    lines.push(
      `              syncedAt: new Date().toISOString(),`,
    );
    lines.push(`            });`);
    lines.push(`            return { dataHandles: [handle] };`);
    lines.push(`          }`);
    lines.push(`          throw error;`);
    lines.push(`        }`);
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
 *
 * Logic:
 * 1. Look at primaryIdentifier from CF schema
 * 2. If the primary identifier field exists in domainProperties (writable, not read-only) → use it
 * 3. If the primary identifier is read-only or composite → inject synthetic "name"
 */
export function resolveNamingField(
  onlyProperties: OnlyProperties,
  cfSchema: CfSchema,
): { field: string; synthetic: boolean } {
  // Composite primary identifier → always synthetic
  if (onlyProperties.primaryIdentifier.length !== 1) {
    return { field: "name", synthetic: true };
  }

  const primaryIdField = onlyProperties.primaryIdentifier[0];
  const readOnlySet = new Set(onlyProperties.readOnly);

  // If primary identifier is read-only → synthetic
  if (readOnlySet.has(primaryIdField)) {
    return { field: "name", synthetic: true };
  }

  // If primary identifier exists as a writable property → use it
  if (cfSchema.properties && primaryIdField in cfSchema.properties) {
    return { field: primaryIdField, synthetic: false };
  }

  // Fallback: synthetic
  return { field: "name", synthetic: true };
}

/**
 * Convert "AWS::EC2::Instance" → "EC2 Instance" for descriptions
 */
function typeNameToDescription(typeName: string): string {
  const parts = typeName.split("::");
  if (parts.length !== 3) return typeName;
  return `${parts[1]} ${parts[2]}`;
}

// --- Naming utilities (moved from awsModelGenerator.ts) ---

/**
 * "AWS::EC2::Instance" → "instance"
 * "AWS::EC2::SecurityGroup" → "security_group"
 */
export function typeNameToResourceFileName(typeName: string): string {
  const parts = typeName.split("::");
  if (parts.length !== 3) {
    throw new Error(`Invalid typeName format: ${typeName}`);
  }
  return parts[2].replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

/**
 * "AWS::EC2::SecurityGroup" → "security-group"
 */
export function typeNameToModelSlug(typeName: string): string {
  const parts = typeName.split("::");
  if (parts.length !== 3) {
    throw new Error(`Invalid typeName format: ${typeName}`);
  }
  return parts[2].replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * "AWS::EC2::Instance" → "ec2"
 */
export function typeNameToServiceName(typeName: string): string {
  const parts = typeName.split("::");
  if (parts.length !== 3) {
    throw new Error(`Invalid typeName format: ${typeName}`);
  }
  return parts[1].toLowerCase();
}
