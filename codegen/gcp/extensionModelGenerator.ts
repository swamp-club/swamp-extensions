// Generates individual GCP extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { ZodGeneratorResult } from "../shared/zodGenerator.ts";
import type { OnlyProperties } from "../shared/schema/types.ts";
import type { GcpParsedResource } from "./pipeline.ts";
import { wrapWithSanitize } from "../shared/instanceName.ts";

/**
 * Sanitize a name to be a valid JS identifier.
 * Replaces dots, hyphens, slashes with underscores.
 */
function safeIdent(name: string): string {
  return name.replace(/[.\-/]/g, "_");
}

export interface GcpExtensionModelInput {
  /** Parsed GCP resource */
  resource: GcpParsedResource;
  /** Zod schema generation result */
  zodResult: ZodGeneratorResult;
  /** Only-properties classification */
  onlyProperties: OnlyProperties;
  /** CalVer version string */
  version: string;
  /** Extension model type string, e.g., "@swamp/gcp/compute/instances" */
  modelType: string;
  /** Extension name, e.g., "@swamp/gcp/compute" */
  extensionName: string;
  /** Pre-built upgrades block to insert after version line */
  upgradesBlock?: string;
}

/**
 * Generates a complete extension model .ts file for a single GCP resource.
 */
export function generateGcpExtensionModel(
  input: GcpExtensionModelInput,
): string {
  const {
    resource,
    zodResult,
    version,
    modelType,
  } = input;

  const lines: string[] = [];

  // Detect control character regex escapes for lint directive
  const allContent = [
    zodResult.inputSchemaBody,
    zodResult.resourceSchemaBody,
    ...zodResult.extractedSchemas.map((s) => s.declaration),
  ].join("\n");
  const controlCharPattern =
    /\\x0[0-9a-fA-F]|\\x1[0-9a-fA-F]|\\u000[0-9a-fA-F]|\\u001[0-9a-fA-F]/;
  const withoutDescriptions = allContent.replace(
    /\.describe\(\s*"(?:[^"\\]|\\.)*"\s*,?\s*\)/g,
    "",
  );
  const hasControlRegex = controlCharPattern.test(withoutDescriptions);

  // Check for StateSchema name collision
  const hasStateSchemaCollision = zodResult.extractedSchemas.some(
    (s) => s.name === "StateSchema",
  );
  const stateSchemaName = hasStateSchemaCollision
    ? "_StateSchema"
    : "StateSchema";

  // Header
  lines.push(`// Auto-generated extension model for ${modelType}`);
  lines.push(
    `// Do not edit manually. Re-generate with: deno task generate:gcp`,
  );
  lines.push("");
  const lintIgnores = ["no-explicit-any"];
  if (hasControlRegex) lintIgnores.push("no-control-regex");
  lines.push(`// deno-lint-ignore-file ${lintIgnores.join(" ")}`);
  lines.push("");

  // Module-level JSDoc. Sanitize both the type name and the description
  // against `*/` sequences so they can't close the surrounding JSDoc block.
  const rawModuleTypeName = resource.typeName;
  const moduleTypeName = rawModuleTypeName.replace(/\*\//g, "*\\/");
  const moduleDesc = (resource.description || rawModuleTypeName)
    .split("\n")[0]
    .trim()
    .replace(/\*\//g, "*\\/");
  lines.push(`/**`);
  lines.push(` * Swamp extension model for ${moduleTypeName}.`);
  if (moduleDesc && moduleDesc !== moduleTypeName) {
    lines.push(` *`);
    lines.push(` * ${moduleDesc}`);
  }
  lines.push(` *`);
  lines.push(
    ` * Wraps the GCP resource as a swamp model so create, get, update,`,
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

  // Only import helpers that are actually used
  const hasActionMethods = resource.actionMethods.length > 0;
  const hasIdempotentCreate = resource.handlers.create &&
    resource.methodConfigs.list && resource.methodConfigs.insert;
  const helperImports: string[] = [];
  if (resource.handlers.create || hasActionMethods) {
    helperImports.push("createResource");
  }
  if (resource.handlers.delete) helperImports.push("deleteResource");
  helperImports.push("getProjectId");
  helperImports.push("isResourceNotFoundError");
  if (resource.listOnly) {
    helperImports.push("readViaList");
  } else {
    helperImports.push("readResource");
  }
  if (resource.handlers.update) helperImports.push("updateResource");
  lines.push(
    `import { ${helperImports.sort().join(", ")} } from "./_lib/gcp.ts";`,
  );
  lines.push("");

  // For resources using {+name} pattern, emit a helper to build the full resource name
  if (resource.usesFullResourceName && resource.resourceSegment) {
    lines.push(
      `/** Construct the fully-qualified resource name from parent and short name. */`,
    );
    lines.push(
      `function buildResourceName(parent: string, shortName: string): string {`,
    );
    lines.push(
      `  return \`\${parent}/${resource.resourceSegment}/\${shortName}\`;`,
    );
    lines.push(`}`);
    lines.push("");
  }

  // Naming field
  const { field: namingField, synthetic: isSyntheticName } =
    resolveGcpNamingField(resource);

  const isProjectOnly = resource.availableScopes?.length === 1 &&
    resource.availableScopes[0] === "projects";
  const shouldConstructParent = isProjectOnly &&
    !resource.domainProperties["parent"];
  const parentExpr = shouldConstructParent
    ? '`projects/${projectId}/locations/${String(g["location"] ?? "")}`'
    : 'String(g["parent"] ?? "")';

  // Method configs as constants
  lines.push(`const BASE_URL = ${JSON.stringify(resource.baseUrl)};`);
  lines.push("");

  // Emit only the method configs that are actually used in generated code
  const usedConfigs = new Set<string>();
  if (resource.methodConfigs.get && !resource.listOnly) usedConfigs.add("get");
  if (resource.methodConfigs.insert && resource.handlers.create) {
    usedConfigs.add("insert");
  }
  if (
    resource.methodConfigs.update && resource.handlers.update &&
    resource.methodConfigs.update
  ) {
    usedConfigs.add("update");
  }
  if (
    resource.methodConfigs.patch && resource.handlers.update &&
    !resource.methodConfigs.update
  ) {
    usedConfigs.add("patch");
  }
  if (resource.methodConfigs.delete && resource.handlers.delete) {
    usedConfigs.add("delete");
  }
  if (resource.methodConfigs.list && resource.listOnly) {
    usedConfigs.add("list");
  }
  // GET_CONFIG is also used in create (post-LRO read) and update
  if (
    resource.methodConfigs.get && (resource.handlers.create ||
      resource.handlers.update)
  ) {
    usedConfigs.add("get");
  }
  // LIST_CONFIG is used in sync for listOnly resources and in create for idempotency
  if (
    resource.methodConfigs.list && (resource.listOnly || hasIdempotentCreate)
  ) {
    usedConfigs.add("list");
  }

  for (
    const [name, config] of Object.entries(resource.methodConfigs)
  ) {
    if (config && usedConfigs.has(name)) {
      lines.push(
        `const ${name.toUpperCase()}_CONFIG = ${
          JSON.stringify(config, null, 2)
        } as const;`,
      );
      lines.push("");
    }
  }

  // Extracted nested schemas
  if (zodResult.extractedSchemas.length > 0) {
    for (const schema of zodResult.extractedSchemas) {
      lines.push(schema.declaration);
      lines.push("");
    }
  }

  // GlobalArgsSchema
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

  // StateSchema
  lines.push(`const ${stateSchemaName} = z.object({`);
  if (zodResult.resourceSchemaBody) {
    lines.push(zodResult.resourceSchemaBody);
  }
  lines.push(`}).passthrough();`);
  lines.push("");
  lines.push(`type StateData = z.infer<typeof ${stateSchemaName}>;`);
  lines.push("");

  // InputsSchema
  lines.push(`const InputsSchema = z.object({`);
  if (isSyntheticName) {
    lines.push(`  name: z.string().optional(),`);
  }
  if (zodResult.inputSchemaBody) {
    const inputLines = zodResult.inputSchemaBody.split("\n");
    for (const line of inputLines) {
      const trimmed = line.trimEnd();
      if (!trimmed) continue;
      if (trimmed.endsWith(".optional(),")) {
        lines.push(trimmed);
      } else if (trimmed.endsWith(",")) {
        lines.push(trimmed.slice(0, -1) + ".optional(),");
      } else {
        lines.push(trimmed);
      }
    }
  }
  lines.push(`});`);
  lines.push("");

  // Resource description
  const resourceDesc = resource.description || resource.typeName;
  const shortDesc = resourceDesc.length > 80
    ? resourceDesc.substring(0, 77) + "..."
    : resourceDesc;
  // Escape quotes for use in string literals
  const safeShortDesc = shortDesc.replace(/"/g, '\\"');
  const singularName =
    resource.resourcePath[resource.resourcePath.length - 1] ||
    "resource";

  // Model export
  lines.push(
    `/** Swamp extension model for ${moduleTypeName}. Registered at \`${modelType}\`. */`,
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
  lines.push(`      description: "${safeShortDesc}",`);
  lines.push(`      schema: ${stateSchemaName},`);
  lines.push(`      lifetime: "infinite",`);
  lines.push(`      garbageCollection: 10,`);
  lines.push(`    },`);
  lines.push(`  },`);
  lines.push(`  methods: {`);

  // --- create method ---
  if (resource.handlers.create && resource.methodConfigs.insert) {
    lines.push(`    create: {`);
    lines.push(`      description: "Create a ${singularName}",`);
    if (resource.readiness) {
      lines.push(
        `      arguments: z.object({ waitForReady: z.boolean().describe("Wait for the resource to reach a ready state after creation (default: true)").optional() }),`,
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
    lines.push(`        const projectId = await getProjectId();`);
    lines.push(
      `        const params: Record<string, string> = { project: projectId };`,
    );

    // Add path parameters from globalArgs
    const parentLikeParams = new Set(["parent", "ownerName"]);
    const insertConfig = resource.methodConfigs.insert;
    for (const paramName of insertConfig.parameterOrder) {
      if (paramName === "project" || paramName === "projectId") continue;
      if (parentLikeParams.has(paramName) && shouldConstructParent) {
        lines.push(
          `        params[${JSON.stringify(paramName)}] = ${parentExpr};`,
        );
      } else if (
        parentLikeParams.has(paramName) && resource.domainProperties["parent"]
      ) {
        lines.push(
          `        if (g["parent"] !== undefined) params[${
            JSON.stringify(paramName)
          }] = String(g["parent"]);`,
        );
      } else {
        lines.push(
          `        if (g[${
            JSON.stringify(safeIdent(paramName))
          }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
            JSON.stringify(safeIdent(paramName))
          }]);`,
        );
      }
    }

    // Build request body from insert properties only (not the full domain union).
    // This prevents update-only properties from being sent in the create body.
    const pathParamSet = new Set(insertConfig.parameterOrder);
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const propName of Object.keys(resource.domainProperties)) {
      if (pathParamSet.has(propName)) continue;
      if (propName === "parent" && shouldConstructParent) continue;
      if (propName === "name" && isSyntheticName) continue;
      if (!resource.insertProperties.has(propName)) continue;
      lines.push(
        `        if (g[${JSON.stringify(propName)}] !== undefined) body[${
          JSON.stringify(propName)
        }] = g[${JSON.stringify(propName)}];`,
      );
    }

    // Generate read config reference for post-create read
    const readConfigRef = resource.methodConfigs.get ? "GET_CONFIG" : undefined;

    // Pre-populate params needed for the post-create GET read-back.
    // GET often requires extra path params not in INSERT's parameterOrder
    // (e.g., INSERT needs just project, but GET needs project + firewall).
    if (readConfigRef && resource.methodConfigs.get) {
      const insertParams = new Set(insertConfig.parameterOrder);
      const getConfig = resource.methodConfigs.get;
      for (const paramName of getConfig.parameterOrder) {
        if (paramName === "project" || paramName === "projectId") continue;
        if (insertParams.has(paramName)) continue;
        // This is a GET-only param — set it from globalArgs or body
        // The last GET param is typically the resource identifier (name)
        const isLastParam = paramName ===
          getConfig.parameterOrder[getConfig.parameterOrder.length - 1];
        if (isLastParam) {
          const idField = resource.primaryIdentifier[0] || "name";
          if (
            paramName === "name" && resource.usesFullResourceName &&
            resource.resourceSegment
          ) {
            if (shouldConstructParent) {
              lines.push(
                `        if (g["name"] !== undefined) {`,
              );
              lines.push(
                `          params["name"] = buildResourceName(${parentExpr}, String(g["name"]));`,
              );
              lines.push(`        }`);
            } else {
              lines.push(
                `        if (g["parent"] !== undefined && g["name"] !== undefined) {`,
              );
              lines.push(
                `          params["name"] = buildResourceName(String(g["parent"]), String(g["name"]));`,
              );
              lines.push(`        }`);
            }
          } else {
            lines.push(
              `        if (g[${
                JSON.stringify(safeIdent(idField))
              }] !== undefined) params[${
                JSON.stringify(paramName)
              }] = String(g[${JSON.stringify(safeIdent(idField))}]);`,
            );
          }
        } else {
          lines.push(
            `        if (g[${
              JSON.stringify(safeIdent(paramName))
            }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
              JSON.stringify(safeIdent(paramName))
            }]);`,
          );
        }
      }
    }

    // Build createResource args including optional readiness config
    const createArgs = ["BASE_URL", "INSERT_CONFIG", "params", "body"];
    if (readConfigRef || resource.readiness || hasIdempotentCreate) {
      createArgs.push(readConfigRef || "undefined");
    }
    if (resource.readiness || hasIdempotentCreate) {
      if (resource.readiness) {
        createArgs.push(
          `(args.waitForReady ?? true) ? ${
            JSON.stringify(resource.readiness)
          } : undefined`,
        );
      } else {
        createArgs.push("undefined");
      }
    }
    // Idempotent create: pass list config for already-exists fallback
    if (hasIdempotentCreate && resource.methodConfigs.list) {
      const listConfig = resource.methodConfigs.list;
      // Determine match field: prefer displayName for idempotency (human-facing
      // unique identifier), fall back to naming field
      const matchField = resource.insertProperties.has("displayName") &&
          resource.domainProperties["displayName"]
        ? "displayName"
        : namingField;

      // Build list params from parameterOrder + parent if it's a list parameter
      const listParamParts: string[] = [];
      const handledParams = new Set<string>();
      for (const paramName of listConfig.parameterOrder) {
        if (handledParams.has(paramName)) continue;
        handledParams.add(paramName);
        if (paramName === "project" || paramName === "projectId") {
          listParamParts.push(`${JSON.stringify(paramName)}: projectId`);
        } else if (paramName === "parent") {
          if (shouldConstructParent) {
            listParamParts.push(`"parent": ${parentExpr}`);
          } else {
            listParamParts.push(
              `"parent": String(body["parent"] ?? g["parent"] ?? "")`,
            );
          }
        } else if (
          paramName !== "pageSize" && paramName !== "pageToken" &&
          paramName !== "showDeleted"
        ) {
          listParamParts.push(
            `${JSON.stringify(paramName)}: String(g[${
              JSON.stringify(paramName)
            }] ?? "")`,
          );
        }
      }
      // Include parent as a query param if it's in the list config but not in parameterOrder
      if (
        !handledParams.has("parent") && listConfig.parameters &&
        "parent" in listConfig.parameters
      ) {
        if (shouldConstructParent) {
          listParamParts.push(`"parent": ${parentExpr}`);
        } else {
          listParamParts.push(
            `"parent": String(body["parent"] ?? g["parent"] ?? "")`,
          );
        }
      }

      createArgs.push(
        `{ listConfig: LIST_CONFIG, listParams: { ${
          listParamParts.join(", ")
        } }, matchField: ${JSON.stringify(matchField)}, matchValue: String(g[${
          JSON.stringify(matchField)
        }] ?? "") }`,
      );
    }
    lines.push(
      `        const result = await createResource(${
        createArgs.join(", ")
      }) as StateData;`,
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

  // --- get method ---
  if (resource.handlers.read) {
    const primaryId = resource.primaryIdentifier[0] || "name";

    lines.push(`    get: {`);
    lines.push(`      description: "Get a ${singularName}",`);
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("The ${primaryId} of the ${singularName}") }),`,
    );
    lines.push(
      `      execute: async (args: { identifier: string }, context: any) => {`,
    );
    lines.push(`        const projectId = await getProjectId();`);
    lines.push(
      `        const params: Record<string, string> = { project: projectId };`,
    );
    lines.push(`        const g = context.globalArgs;`);

    if (resource.listOnly && resource.methodConfigs.list) {
      // listOnly: add params from globalArgs, then list + filter
      const listConfig = resource.methodConfigs.list;
      for (const paramName of listConfig.parameterOrder) {
        if (paramName === "project" || paramName === "projectId") continue;
        lines.push(
          `        if (g[${
            JSON.stringify(safeIdent(paramName))
          }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
            JSON.stringify(safeIdent(paramName))
          }]);`,
        );
      }
      lines.push(
        `        const result = await readViaList(BASE_URL, LIST_CONFIG, params, "${primaryId}", args.identifier) as StateData;`,
      );
    } else if (resource.methodConfigs.get) {
      // Normal GET
      const getConfig = resource.methodConfigs.get;
      for (const paramName of getConfig.parameterOrder) {
        if (paramName === "project" || paramName === "projectId") continue;
        // The last param is typically the resource identifier
        if (
          paramName ===
            getConfig.parameterOrder[getConfig.parameterOrder.length - 1]
        ) {
          if (
            paramName === "name" && resource.usesFullResourceName &&
            resource.resourceSegment
          ) {
            // Construct full resource name from parent + identifier
            lines.push(
              `        params["name"] = buildResourceName(${parentExpr}, args.identifier);`,
            );
          } else {
            lines.push(
              `        params[${JSON.stringify(paramName)}] = args.identifier;`,
            );
          }
        } else {
          lines.push(
            `        if (g[${
              JSON.stringify(safeIdent(paramName))
            }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
              JSON.stringify(safeIdent(paramName))
            }]);`,
          );
        }
      }
      lines.push(
        `        const result = await readResource(BASE_URL, GET_CONFIG, params) as StateData;`,
      );
    }

    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.name?.toString() ?? args.identifier`)
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `(result.${namingField} ?? g.${namingField})?.toString() ?? args.identifier`,
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

  // --- update method ---
  if (
    resource.handlers.update &&
    (resource.methodConfigs.update || resource.methodConfigs.patch)
  ) {
    const updateMethodName = resource.methodConfigs.update ? "UPDATE" : "PATCH";
    const readConfigRef = resource.methodConfigs.get ? "GET_CONFIG" : undefined;

    lines.push(`    update: {`);
    lines.push(`      description: "Update ${singularName} attributes",`);
    if (resource.readiness) {
      lines.push(
        `      arguments: z.object({ waitForReady: z.boolean().describe("Wait for the resource to reach a ready state after update (default: true)").optional() }),`,
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
    lines.push(`        const projectId = await getProjectId();`);

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

    const updateConfig = resource.methodConfigs.update ||
      resource.methodConfigs.patch!;
    const updateNeedsExisting = updateConfig.parameterOrder.some(
      (p) => p !== "project" && p !== "projectId",
    );

    if (updateNeedsExisting) {
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
    }

    lines.push(
      `        const params: Record<string, string> = { project: projectId };`,
    );
    for (const paramName of updateConfig.parameterOrder) {
      if (paramName === "project" || paramName === "projectId") continue;
      const lastParam =
        updateConfig.parameterOrder[updateConfig.parameterOrder.length - 1];
      if (paramName === lastParam) {
        const idField = resource.primaryIdentifier[0] || "name";
        if (
          paramName === "name" && resource.usesFullResourceName &&
          resource.resourceSegment
        ) {
          lines.push(
            `        params["name"] = buildResourceName(${parentExpr}, ${
              updateNeedsExisting
                ? `existing[${
                  JSON.stringify(idField)
                }]?.toString() ?? g["name"]?.toString() ?? ""`
                : `g["name"]?.toString() ?? ""`
            });`,
          );
        } else {
          lines.push(
            `        params[${JSON.stringify(paramName)}] = existing[${
              JSON.stringify(idField)
            }]?.toString() ?? "";`,
          );
        }
      } else {
        lines.push(
          `        if (g[${
            JSON.stringify(safeIdent(paramName))
          }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
            JSON.stringify(safeIdent(paramName))
          }]);`,
        );
        if (updateNeedsExisting) {
          lines.push(
            `        else if (existing[${JSON.stringify(paramName)}]) params[${
              JSON.stringify(paramName)
            }] = String(existing[${JSON.stringify(paramName)}]);`,
          );
        }
      }
    }

    const updatePathParams = new Set(updateConfig.parameterOrder);
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const propName of Object.keys(resource.domainProperties)) {
      if (updatePathParams.has(propName)) continue;
      if (propName === "parent") continue;
      if (propName === "name" && isSyntheticName) continue;
      if (!resource.updateProperties.has(propName)) continue;
      // Skip createOnly properties in updates
      if (resource.createOnlyProperties.includes(propName)) continue;
      lines.push(
        `        if (g[${JSON.stringify(propName)}] !== undefined) body[${
          JSON.stringify(propName)
        }] = g[${JSON.stringify(propName)}];`,
      );
    }

    // Carry forward concurrency control fields (fingerprint, etag) from existing state.
    // GCP APIs use optimistic concurrency — updates must include the latest fingerprint/etag.
    if (updateNeedsExisting) {
      lines.push(
        `        for (const key of Object.keys(existing)) {`,
      );
      lines.push(
        `          if (key === "fingerprint" || key === "labelFingerprint" || key === "etag" || key.endsWith("Fingerprint")) {`,
      );
      lines.push(
        `            body[key] = existing[key];`,
      );
      lines.push(`          }`);
      lines.push(`        }`);
    }

    const updateArgs = [
      "BASE_URL",
      `${updateMethodName}_CONFIG`,
      "params",
      "body",
    ];
    if (readConfigRef || resource.readiness) {
      updateArgs.push(readConfigRef || "undefined");
    }
    if (resource.readiness) {
      updateArgs.push(
        `(args.waitForReady ?? true) ? ${
          JSON.stringify(resource.readiness)
        } : undefined`,
      );
    }
    lines.push(
      `        const result = await updateResource(${
        updateArgs.join(", ")
      }) as StateData;`,
    );
    lines.push(
      `        const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`        return { dataHandles: [handle] };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // --- delete method ---
  if (resource.handlers.delete && resource.methodConfigs.delete) {
    const primaryId = resource.primaryIdentifier[0] || "name";

    lines.push(`    delete: {`);
    lines.push(`      description: "Delete the ${singularName}",`);
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("The ${primaryId} of the ${singularName}") }),`,
    );
    lines.push(
      `      execute: async (args: { identifier: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const projectId = await getProjectId();`);
    lines.push(
      `        const params: Record<string, string> = { project: projectId };`,
    );

    const deleteConfig = resource.methodConfigs.delete;
    for (const paramName of deleteConfig.parameterOrder) {
      if (paramName === "project" || paramName === "projectId") continue;
      if (
        paramName ===
          deleteConfig.parameterOrder[deleteConfig.parameterOrder.length - 1]
      ) {
        if (
          paramName === "name" && resource.usesFullResourceName &&
          resource.resourceSegment
        ) {
          lines.push(
            `        params["name"] = buildResourceName(${parentExpr}, args.identifier);`,
          );
        } else {
          lines.push(
            `        params[${JSON.stringify(paramName)}] = args.identifier;`,
          );
        }
      } else {
        lines.push(
          `        if (g[${
            JSON.stringify(safeIdent(paramName))
          }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
            JSON.stringify(safeIdent(paramName))
          }]);`,
        );
      }
    }

    lines.push(
      `        const { existed } = await deleteResource(BASE_URL, DELETE_CONFIG, params);`,
    );

    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.name?.toString() ?? args.identifier`)
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(`g.${namingField}?.toString() ?? args.identifier`)
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

  // --- sync method ---
  {
    const primaryId = resource.primaryIdentifier[0] || "name";

    lines.push(`    sync: {`);
    lines.push(
      `      description: "Sync ${singularName} state from GCP",`,
    );
    lines.push(`      arguments: z.object({}),`);
    lines.push(
      `      execute: async (_args: Record<string, never>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(`        const projectId = await getProjectId();`);

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

    // Determine if sync needs existing state data.
    // Always true for listOnly (need identifier for list+filter) or when
    // GET has non-project path params (need identifier for URL).
    const syncConfig = resource.listOnly
      ? resource.methodConfigs.list
      : resource.methodConfigs.get;
    const syncNeedsExisting = resource.listOnly ||
      (syncConfig
        ? syncConfig.parameterOrder.some(
          (p) => p !== "project" && p !== "projectId",
        )
        : false);

    if (syncNeedsExisting) {
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
    }

    lines.push(`        try {`);

    if (resource.listOnly && resource.methodConfigs.list) {
      lines.push(
        `          const params: Record<string, string> = { project: projectId };`,
      );
      const listConfig = resource.methodConfigs.list;
      for (const paramName of listConfig.parameterOrder) {
        if (paramName === "project" || paramName === "projectId") continue;
        lines.push(
          `          if (g[${
            JSON.stringify(safeIdent(paramName))
          }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
            JSON.stringify(safeIdent(paramName))
          }]);`,
        );
        lines.push(
          `          else if (existing[${JSON.stringify(paramName)}]) params[${
            JSON.stringify(paramName)
          }] = String(existing[${JSON.stringify(paramName)}]);`,
        );
      }
      lines.push(
        `          const identifier = existing.${primaryId}?.toString() ?? g[${
          JSON.stringify(safeIdent(primaryId))
        }]?.toString();`,
      );
      lines.push(
        `          if (!identifier) throw new Error("No identifier found in existing state or globalArgs");`,
      );
      lines.push(
        `          const result = await readViaList(BASE_URL, LIST_CONFIG, params, "${primaryId}", identifier) as StateData;`,
      );
    } else if (resource.methodConfigs.get) {
      lines.push(
        `          const params: Record<string, string> = { project: projectId };`,
      );
      const getConfig = resource.methodConfigs.get;
      for (const paramName of getConfig.parameterOrder) {
        if (paramName === "project" || paramName === "projectId") continue;
        if (
          paramName ===
            getConfig.parameterOrder[getConfig.parameterOrder.length - 1]
        ) {
          if (
            paramName === "name" && resource.usesFullResourceName &&
            resource.resourceSegment
          ) {
            // For full-name resources, construct from parent + short name
            // The short name is stored in existing state or available from globalArgs
            if (syncNeedsExisting) {
              lines.push(
                `          const shortName = existing.${primaryId}?.toString() ?? g["name"]?.toString();`,
              );
            } else {
              lines.push(
                `          const shortName = g["name"]?.toString();`,
              );
            }
            lines.push(
              `          if (!shortName) throw new Error("No identifier found");`,
            );
            lines.push(
              `          params["name"] = buildResourceName(${parentExpr}, shortName);`,
            );
          } else {
            lines.push(
              `          const identifier = existing.${primaryId}?.toString() ?? g[${
                JSON.stringify(safeIdent(primaryId))
              }]?.toString();`,
            );
            lines.push(
              `          if (!identifier) throw new Error("No identifier found in existing state or globalArgs");`,
            );
            lines.push(
              `          params[${JSON.stringify(paramName)}] = identifier;`,
            );
          }
        } else {
          lines.push(
            `          if (g[${
              JSON.stringify(safeIdent(paramName))
            }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
              JSON.stringify(safeIdent(paramName))
            }]);`,
          );
          if (syncNeedsExisting) {
            lines.push(
              `          else if (existing[${
                JSON.stringify(paramName)
              }]) params[${JSON.stringify(paramName)}] = String(existing[${
                JSON.stringify(paramName)
              }]);`,
            );
          }
        }
      }
      lines.push(
        `          const result = await readResource(BASE_URL, GET_CONFIG, params) as StateData;`,
      );
    }

    lines.push(
      `          const handle = await context.writeResource("state", instanceName, result);`,
    );
    lines.push(`          return { dataHandles: [handle] };`);
    lines.push(`        } catch (error: unknown) {`);
    lines.push(`          if (isResourceNotFoundError(error)) {`);
    lines.push(
      `            const handle = await context.writeResource("state", instanceName, {`,
    );
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

  // --- action methods (start, stop, reboot, etc.) ---
  for (const action of resource.actionMethods) {
    // Convert camelCase to readable: "setMachineType" → "set machine type"
    const readableName = action.name.replace(
      /([a-z])([A-Z])/g,
      "$1 $2",
    ).toLowerCase();
    // Use snake_case for method name: "setMachineType" → "set_machine_type"
    // Also sanitize hyphens/dots: "bulk-export-group" → "bulk_export_group"
    const methodName = safeIdent(
      action.name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase(),
    );

    // Avoid name collisions with CRUD methods
    const safeName = ["create", "get", "update", "delete", "sync"].includes(
        methodName,
      )
      ? `action_${methodName}`
      : methodName;

    lines.push(`    ${safeName}: {`);
    lines.push(
      `      description: "${readableName}",`,
    );

    // Build arguments schema from request properties
    const argProps = Object.entries(action.requestProperties);
    if (argProps.length > 0) {
      lines.push(`      arguments: z.object({`);
      for (const [propName, _prop] of argProps) {
        const isRequired = action.requiredProperties.includes(propName);
        lines.push(
          `        ${propName}: z.any()${isRequired ? "" : ".optional()"},`,
        );
      }
      lines.push(`      }),`);
    } else {
      lines.push(`      arguments: z.object({}),`);
    }

    // Determine which path params can be resolved from globalArgs vs needing existing state.
    // A param is "available" if its sanitized name exists in domainProperties or is "parent".
    const nonProjectParams = action.config.parameterOrder.filter(
      (p) => p !== "project" && p !== "projectId",
    );
    const paramsFromGlobalArgs: string[] = [];
    const paramsNeedingState: string[] = [];
    const actionParentLikeParams = new Set(["parent", "ownerName"]);
    for (const paramName of nonProjectParams) {
      const safeName = safeIdent(paramName);
      if (
        resource.domainProperties[safeName] ||
        actionParentLikeParams.has(paramName) ||
        paramName === "name"
      ) {
        paramsFromGlobalArgs.push(paramName);
      } else {
        paramsNeedingState.push(paramName);
      }
    }

    const needsExistingState = paramsNeedingState.length > 0;
    const needsG = paramsFromGlobalArgs.length > 0 || needsExistingState;
    const needsContext = needsG || needsExistingState;
    const argsPrefix = argProps.length > 0 ? "args" : "_args";
    const contextPrefix = needsContext ? "context" : "_context";

    lines.push(
      `      execute: async (${argsPrefix}: Record<string, unknown>, ${contextPrefix}: any) => {`,
    );
    if (needsG) {
      lines.push(`        const g = ${contextPrefix}.globalArgs;`);
    }
    lines.push(`        const projectId = await getProjectId();`);
    lines.push(
      `        const params: Record<string, string> = { project: projectId };`,
    );

    // Add path parameters from globalArgs
    for (const paramName of paramsFromGlobalArgs) {
      if (
        paramName === "name" && resource.usesFullResourceName &&
        resource.resourceSegment
      ) {
        // Construct the fully-qualified resource name from parent + short name
        if (shouldConstructParent) {
          lines.push(
            `        if (g["name"] !== undefined) {`,
          );
          lines.push(
            `          params["name"] = buildResourceName(${parentExpr}, String(g["name"]));`,
          );
          lines.push(`        }`);
        } else {
          lines.push(
            `        if (g["parent"] !== undefined && g["name"] !== undefined) {`,
          );
          lines.push(
            `          params["name"] = buildResourceName(String(g["parent"]), String(g["name"]));`,
          );
          lines.push(`        }`);
        }
      } else if (
        actionParentLikeParams.has(paramName) && shouldConstructParent
      ) {
        lines.push(
          `        params[${JSON.stringify(paramName)}] = ${parentExpr};`,
        );
      } else if (
        actionParentLikeParams.has(paramName) &&
        resource.domainProperties["parent"]
      ) {
        lines.push(
          `        if (g["parent"] !== undefined) params[${
            JSON.stringify(paramName)
          }] = String(g["parent"]);`,
        );
      } else {
        lines.push(
          `        if (g[${
            JSON.stringify(safeIdent(paramName))
          }] !== undefined) params[${JSON.stringify(paramName)}] = String(g[${
            JSON.stringify(safeIdent(paramName))
          }]);`,
        );
      }
    }

    // Add path parameters that need existing state
    if (needsExistingState) {
      const instanceNameRef = isSyntheticName ? "name" : namingField;
      lines.push(
        `        const content = await ${contextPrefix}.dataRepository.getContent(`,
      );
      lines.push(
        `          ${contextPrefix}.modelType, ${contextPrefix}.modelId, ${
          wrapWithSanitize(`g.${instanceNameRef}?.toString() ?? "current"`)
        },`,
      );
      lines.push(`        );`);
      lines.push(
        `        if (!content) throw new Error("No existing state found - run create or get first");`,
      );
      lines.push(
        `        const existing = JSON.parse(new TextDecoder().decode(content));`,
      );
      const lastParam = action.config.parameterOrder[
        action.config.parameterOrder.length - 1
      ];
      for (const paramName of paramsNeedingState) {
        // If this is the last path param (the resource identifier), use the
        // primary identifier field from stored state (e.g., "name") rather than
        // the raw path param name (e.g., "instance", "disk", "firewall").
        const stateField = paramName === lastParam
          ? (resource.primaryIdentifier[0] || paramName)
          : paramName;
        lines.push(
          `        params[${JSON.stringify(paramName)}] = existing[${
            JSON.stringify(stateField)
          }]?.toString() ?? g[${
            JSON.stringify(safeIdent(stateField))
          }]?.toString() ?? "";`,
        );
      }
    }

    // Build request body from action request properties
    if (argProps.length > 0) {
      lines.push(`        const body: Record<string, unknown> = {};`);
      for (const [propName] of argProps) {
        lines.push(
          `        if (args[${JSON.stringify(propName)}] !== undefined) body[${
            JSON.stringify(propName)
          }] = args[${JSON.stringify(propName)}];`,
        );
      }
    }

    // Use createResource which handles URL building + LRO polling
    const actionConfigStr = JSON.stringify(action.config);
    lines.push(
      `        const result = await createResource(BASE_URL, ${actionConfigStr}, params, ${
        argProps.length > 0 ? "body" : "{}"
      });`,
    );

    lines.push(`        return { result };`);
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
 * For GCP:
 * - If primary identifier is "name" and it's in domain properties → use it
 * - If primary identifier is "id" (read-only) → synthetic "name"
 * - Otherwise → synthetic "name"
 */
export function resolveGcpNamingField(
  resource: GcpParsedResource,
): { field: string; synthetic: boolean } {
  const primaryId = resource.primaryIdentifier[0] || "name";

  // If the primary identifier is writable (in domain properties)
  if (resource.domainProperties[primaryId]) {
    return { field: primaryId, synthetic: false };
  }

  // Check for "name" in domain properties as a fallback
  if (primaryId !== "name" && resource.domainProperties["name"]) {
    return { field: "name", synthetic: false };
  }

  // Synthetic name
  return { field: "name", synthetic: true };
}
