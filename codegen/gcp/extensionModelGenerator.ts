// Generates individual GCP extension model .ts files
// Each file exports `const model = { ... }` using the swamp extension model pattern.

import type { ZodGeneratorResult } from "../shared/zodGenerator.ts";
import type { OnlyProperties } from "../shared/schema/types.ts";
import type { GcpParsedResource } from "./pipeline.ts";
import type { ParsedEnrichmentSource } from "./enrichments/types.ts";
import { generateCopyrightHeader } from "../shared/licenseGenerator.ts";
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
  /** Parsed enrichment source to inline into the generated model */
  enrichment?: {
    source: ParsedEnrichmentSource;
    methodsExport: string;
  };
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

  // Detect if generated code contains control character regex escape sequences.
  // Deno lint's no-control-regex flags \\xNN and \\uNNNN (double-backslash escapes)
  // where NN/NNNN is in the control range (00-1F).
  const allContent = [
    zodResult.inputSchemaBody,
    zodResult.resourceSchemaBody,
    ...zodResult.extractedSchemas.map((s) => s.declaration),
  ].join("\n");
  const controlCharPattern =
    /\\\\x0[0-9a-fA-F]|\\\\x1[0-9a-fA-F]|\\\\u000[0-9a-fA-F]|\\\\u001[0-9a-fA-F]/;
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
  lines.push(generateCopyrightHeader());
  lines.push("");
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
  const hasListFactory = !!(resource.methodConfigs.list &&
    resource.listResponseArrayField);

  // Pre-compute idempotent match field so we know which imports are needed
  const { field: namingField, synthetic: isSyntheticName } =
    resolveGcpNamingField(resource);
  const idempotentMatchField = hasIdempotentCreate
    ? resolveGcpMatchField(resource, namingField, isSyntheticName)
    : undefined;
  const hasNestedMatchField = idempotentMatchField?.includes(".") ?? false;

  const helperImports: string[] = [];
  if (resource.handlers.create || hasActionMethods) {
    helperImports.push("createResource");
  }
  if (resource.handlers.delete) helperImports.push("deleteResource");
  helperImports.push("getProjectId");
  helperImports.push("isResourceNotFoundError");
  if (hasListFactory || hasNestedMatchField) {
    helperImports.push("listResources");
  }
  if (hasNestedMatchField) helperImports.push("isAlreadyExistsError");
  if (resource.listOnly) {
    helperImports.push("readViaList");
  } else {
    helperImports.push("readResource");
  }
  if (resource.handlers.update) helperImports.push("updateResource");
  if (input.enrichment) helperImports.push("request");
  lines.push(
    `import { type ExplicitGcpCredentials, ${
      helperImports.sort().join(", ")
    } } from "./_lib/gcp.ts";`,
  );
  if (input.enrichment) {
    for (const imp of input.enrichment.source.imports) {
      lines.push(imp);
    }
  }
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

  const isProjectOnly = resource.availableScopes?.length === 1 &&
    resource.availableScopes[0] === "projects";
  const shouldConstructParent = isProjectOnly &&
    !resource.domainProperties["parent"];
  const parentExpr = shouldConstructParent
    ? resource.hasGlobalEndpoint
      ? '(String(g["location"] ?? "") === "global" || !g["location"] ? `projects/${projectId}` : `projects/${projectId}/locations/${String(g["location"])}`)'
      : '`projects/${projectId}/locations/${String(g["location"] ?? "")}`'
    : 'String(g["parent"] ?? "")';

  // Determine the correct project path parameter key from method configs.
  // Most GCP APIs use {project}, but some (e.g., Cloud Build, Dataflow) use {projectId}.
  const allParamOrders = [
    resource.methodConfigs.insert?.parameterOrder,
    resource.methodConfigs.get?.parameterOrder,
    resource.methodConfigs.update?.parameterOrder,
    resource.methodConfigs.patch?.parameterOrder,
    resource.methodConfigs.delete?.parameterOrder,
    resource.methodConfigs.list?.parameterOrder,
  ].filter(Boolean).flat();
  const projectParamKey = allParamOrders.includes("projectId")
    ? "projectId"
    : "project";

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
  // LIST_CONFIG is used in sync for listOnly resources, in create for idempotency,
  // and in the list factory method
  if (
    resource.methodConfigs.list &&
    (resource.listOnly || hasIdempotentCreate || hasListFactory)
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

  // Default OAuth scopes from the API's Discovery Document.
  // Only emitted for APIs that need non-cloud-platform scopes (Workspace/consumer
  // APIs like Calendar, Gmail, Drive). Infrastructure APIs that include
  // cloud-platform in their scopes use gcloud's default and don't need this.
  const hasCloudPlatformScope = resource.oauthScopes.some((s) =>
    s.includes("cloud-platform")
  );
  const needsExplicitScopes = resource.oauthScopes.length > 0 &&
    !hasCloudPlatformScope;
  if (needsExplicitScopes) {
    const scopesLiteral = JSON.stringify(resource.oauthScopes);
    lines.push(
      `const _defaultOAuthScopes: string[] = ${scopesLiteral};`,
    );
    lines.push("");
  }

  // Determine which credential fields collide with domain properties.
  // GCP properties are camelCase so collisions are unlikely, but we guard
  // defensively (mirrors AWS's collision guard).
  const domainPropNames = new Set(Object.keys(resource.domainProperties));
  const credentialFields = [
    {
      name: "accessToken",
      sensitive: true,
      desc:
        "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
    },
    {
      name: "credentialsJson",
      sensitive: true,
      desc:
        "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
    },
    {
      name: "project",
      sensitive: false,
      desc:
        "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
    },
    {
      name: "scopes",
      sensitive: false,
      desc:
        "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
    },
    {
      name: "quotaProject",
      sensitive: false,
      desc:
        "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
    },
  ];
  const injectedCredFields = credentialFields.filter(
    (f) => !domainPropNames.has(f.name),
  );

  // GlobalArgsSchema
  lines.push(`const GlobalArgsSchema = z.object({`);
  if (isSyntheticName) {
    lines.push(
      `  name: z.string().describe("Instance name for this resource (used as the unique identifier in the factory pattern)"),`,
    );
  }
  for (const f of injectedCredFields) {
    const meta = f.sensitive ? `.meta({ sensitive: true })` : "";
    lines.push(
      `  ${f.name}: z.string()${meta}.describe("${f.desc}").optional(),`,
    );
  }
  lines.push(
    `  apiEndpoint: z.string().describe("Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.").optional(),`,
  );
  if (zodResult.inputSchemaBody) {
    lines.push(zodResult.inputSchemaBody);
  }
  lines.push(`});`);
  lines.push("");

  // Enrichment body (schemas + methods object inlined from .enrich.ts source)
  if (input.enrichment) {
    lines.push(input.enrichment.source.body);
    lines.push("");
  }

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
  for (const f of injectedCredFields) {
    const meta = f.sensitive ? `.meta({ sensitive: true })` : "";
    lines.push(`  ${f.name}: z.string()${meta}.optional(),`);
  }
  lines.push(`  apiEndpoint: z.string().optional(),`);
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

  // Credential key set for filtering globalArgs when building request bodies
  const credKeyNames = [
    ...injectedCredFields.map((f) => f.name),
    "apiEndpoint",
  ];
  lines.push(
    `const _credentialKeys = new Set(${JSON.stringify(credKeyNames)});`,
  );
  lines.push("");
  lines.push(
    `function _buildGcpCredentials(g: Record<string, unknown>): ExplicitGcpCredentials {`,
  );
  lines.push(`  return {`);
  for (const f of credentialFields) {
    if (f.name === "scopes") {
      if (needsExplicitScopes) {
        lines.push(
          `    scopes: typeof g.scopes === "string" ? g.scopes.split(",").map((s: string) => s.trim()) : _defaultOAuthScopes,`,
        );
      } else {
        lines.push(
          `    scopes: typeof g.scopes === "string" ? g.scopes.split(",").map((s: string) => s.trim()) : undefined,`,
        );
      }
    } else {
      // Always forward from g — even when not injected as a separate global arg,
      // the value exists as a domain property and should reach credential resolution.
      lines.push(`    ${f.name}: g.${f.name} as string | undefined,`);
    }
  }
  lines.push(`  };`);
  lines.push(`}`);
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
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);
    lines.push(
      `        const params: Record<string, string> = { ${projectParamKey}: projectId };`,
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
    // Query-location parameters go into params (for buildUrl), not body.
    const pathParamSet = new Set(insertConfig.parameterOrder);
    const insertParameters = insertConfig.parameters;
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const propName of Object.keys(resource.domainProperties)) {
      if (pathParamSet.has(propName)) continue;
      if (propName === "parent" && shouldConstructParent) continue;
      if (propName === "name" && isSyntheticName) continue;
      if (!resource.insertProperties.has(propName)) continue;
      if (insertParameters[propName]?.location === "query") {
        lines.push(
          `        if (g[${JSON.stringify(propName)}] !== undefined) params[${
            JSON.stringify(propName)
          }] = String(g[${JSON.stringify(propName)}]);`,
        );
      } else {
        lines.push(
          `        if (g[${JSON.stringify(propName)}] !== undefined) body[${
            JSON.stringify(propName)
          }] = g[${JSON.stringify(propName)}];`,
        );
      }
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
    const createArgs = ["baseUrl", "INSERT_CONFIG", "params", "body"];
    // Always push readConfig, readiness, and idempotency (even as undefined)
    // so credentials can be the last positional arg
    createArgs.push(readConfigRef || "undefined");
    if (resource.readiness) {
      createArgs.push(
        `(args.waitForReady ?? true) ? ${
          JSON.stringify(resource.readiness)
        } : undefined`,
      );
    } else {
      createArgs.push("undefined");
    }
    // Idempotent create: pass list config for already-exists fallback
    if (
      hasIdempotentCreate && resource.methodConfigs.list &&
      idempotentMatchField && !hasNestedMatchField
    ) {
      // Flat match field (displayName, shortName, or namingField) — use IdempotencyConfig
      const listConfig = resource.methodConfigs.list;

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

      const segmentIdField = idempotentMatchField === namingField
        ? detectSegmentIdField(resource)
        : undefined;
      let matchValueExpr = `String(g[${
        JSON.stringify(idempotentMatchField)
      }] ?? "")`;
      if (segmentIdField && resource.resourceSegment) {
        matchValueExpr = `String(g[${
          JSON.stringify(idempotentMatchField)
        }] ?? "") || buildResourceName(${parentExpr}, String(g[${
          JSON.stringify(segmentIdField)
        }] ?? ""))`;
      }

      createArgs.push(
        `{ listConfig: LIST_CONFIG, listParams: { ${
          listParamParts.join(", ")
        } }, matchField: ${
          JSON.stringify(idempotentMatchField)
        }, matchValue: ${matchValueExpr} }`,
      );
    } else {
      // No viable flat match field (or nested — handled below) — omit IdempotencyConfig
      createArgs.push("undefined");
    }
    createArgs.push("credentials");

    if (
      hasNestedMatchField && resource.methodConfigs.list &&
      resource.listResponseArrayField
    ) {
      // Nested match field (e.g. "preferredMemberKey.id") — inline try/catch
      // with listResources + nested field filtering instead of IdempotencyConfig
      const dotParts = idempotentMatchField!.split(".");
      const parentPropName = dotParts[0];
      const childPropName = dotParts[1];
      const listConfig = resource.methodConfigs.list;

      // Build list params
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

      const matchValueExpr = `String(g[${
        JSON.stringify(parentPropName)
      }]?.${childPropName} ?? "")`;
      lines.push(`        let result: StateData;`);
      lines.push(`        try {`);
      lines.push(
        `          result = await createResource(${
          createArgs.join(", ")
        }) as StateData;`,
      );
      lines.push(`        } catch (createErr) {`);
      lines.push(
        `          if (!isAlreadyExistsError(createErr)) throw createErr;`,
      );
      lines.push(`          const matchValue = ${matchValueExpr};`);
      lines.push(
        `          const { items } = await listResources(baseUrl, LIST_CONFIG, { ${
          listParamParts.join(", ")
        } }, ${
          JSON.stringify(resource.listResponseArrayField)
        }, 100, credentials);`,
      );
      lines.push(
        `          const existing = items.find((item: any) => item?.${parentPropName}?.${childPropName} === matchValue);`,
      );
      lines.push(
        `          if (existing) { result = existing as StateData; } else { throw createErr; }`,
      );
      lines.push(`        }`);
    } else {
      lines.push(
        `        const result = await createResource(${
          createArgs.join(", ")
        }) as StateData;`,
      );
    }

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
            `(g.${namingField} ?? result.${namingField})?.toString() ?? "current"`,
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
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);
    lines.push(
      `        const params: Record<string, string> = { ${projectParamKey}: projectId };`,
    );

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
        `        const result = await readViaList(baseUrl, LIST_CONFIG, params, "${primaryId}", args.identifier, credentials) as StateData;`,
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
        `        const result = await readResource(baseUrl, GET_CONFIG, params, credentials) as StateData;`,
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
            `(g.${namingField} ?? result.${namingField})?.toString() ?? args.identifier`,
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
    const primaryId = resource.primaryIdentifier[0] || "name";

    lines.push(`    update: {`);
    lines.push(`      description: "Update ${singularName} attributes",`);
    if (resource.readiness) {
      lines.push(
        `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singularName} by ${primaryId} (e.g. one discovered by list)").optional(), waitForReady: z.boolean().describe("Wait for the resource to reach a ready state after update (default: true)").optional() }),`,
      );
      lines.push(
        `      execute: async (args: { identifier?: string; waitForReady?: boolean }, context: any) => {`,
      );
    } else {
      lines.push(
        `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singularName} by ${primaryId} (e.g. one discovered by list)").optional() }),`,
      );
      lines.push(
        `      execute: async (args: { identifier?: string }, context: any) => {`,
      );
    }
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);

    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `g.name?.toString() ?? args.identifier ?? "current"`,
          )
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `g.${namingField}?.toString() ?? args.identifier ?? "current"`,
          )
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
        `        if (!content) throw new Error("No existing state found - run create, get, or list first");`,
      );
      lines.push(
        `        const existing = JSON.parse(new TextDecoder().decode(content));`,
      );
    }

    lines.push(
      `        const params: Record<string, string> = { ${projectParamKey}: projectId };`,
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
          if (updateNeedsExisting) {
            lines.push(
              `        const existingName = existing[${
                JSON.stringify(idField)
              }]?.toString();`,
            );
            lines.push(
              `        if (existingName && existingName.includes("/")) {`,
            );
            lines.push(
              `          params["name"] = existingName;`,
            );
            lines.push(
              `        } else {`,
            );
            lines.push(
              `          params["name"] = buildResourceName(${parentExpr}, existingName ?? g["name"]?.toString() ?? "");`,
            );
            lines.push(
              `        }`,
            );
          } else {
            lines.push(
              `        params["name"] = buildResourceName(${parentExpr}, g["name"]?.toString() ?? "");`,
            );
          }
        } else {
          const existingField = resource.domainProperties[paramName]
            ? paramName
            : idField;
          lines.push(
            `        params[${JSON.stringify(paramName)}] = existing[${
              JSON.stringify(existingField)
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
    const updateParameters = updateConfig.parameters;
    // Create-only required fields are optional in GlobalArgsSchema; a
    // full-replacement PUT update must still send them.
    const isFullReplacement = updateConfig.httpMethod === "PUT";
    const createRequired = new Set(resource.createRequiredProperties);
    const updateRequired: string[] = [];
    lines.push(`        const body: Record<string, unknown> = {};`);
    for (const propName of Object.keys(resource.domainProperties)) {
      if (updatePathParams.has(propName)) continue;
      if (propName === "parent") continue;
      if (propName === "name" && isSyntheticName) continue;
      if (!resource.updateProperties.has(propName)) continue;
      // Skip createOnly properties in updates
      if (resource.createOnlyProperties.includes(propName)) continue;
      if (updateParameters[propName]?.location === "query") {
        lines.push(
          `        if (g[${JSON.stringify(propName)}] !== undefined) params[${
            JSON.stringify(propName)
          }] = String(g[${JSON.stringify(propName)}]);`,
        );
        if (updateNeedsExisting) {
          lines.push(
            `        else if (existing[${
              JSON.stringify(propName)
            }] !== undefined) params[${
              JSON.stringify(propName)
            }] = String(existing[${JSON.stringify(propName)}]);`,
          );
        }
      } else {
        lines.push(
          `        if (g[${JSON.stringify(propName)}] !== undefined) body[${
            JSON.stringify(propName)
          }] = g[${JSON.stringify(propName)}];`,
        );
        if (isFullReplacement && createRequired.has(propName)) {
          // A PUT body replaces the resource, so a create-required field left
          // unset in globalArgs would be dropped. Carry it from stored state.
          if (updateNeedsExisting) {
            lines.push(
              `        else if (existing[${
                JSON.stringify(propName)
              }] !== undefined) body[${JSON.stringify(propName)}] = existing[${
                JSON.stringify(propName)
              }];`,
            );
          }
          updateRequired.push(propName);
        }
      }
    }
    if (updateRequired.length > 0) {
      lines.push(
        `        const missingForUpdate = ${
          JSON.stringify(updateRequired.sort())
        }.filter((k) => body[k] === undefined);`,
      );
      lines.push(
        `        if (missingForUpdate.length > 0) throw new Error("update requires global arguments: " + missingForUpdate.join(", "));`,
      );
    }

    // Auto-compute updateMask from body keys before fingerprint carry-forward.
    if (updateParameters?.["updateMask"]?.location === "query") {
      lines.push(
        `        const updateMaskKeys = Object.keys(body);`,
      );
      lines.push(
        `        if (updateMaskKeys.length > 0) params["updateMask"] = updateMaskKeys.join(",");`,
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
      "baseUrl",
      `${updateMethodName}_CONFIG`,
      "params",
      "body",
    ];
    updateArgs.push(readConfigRef || "undefined");
    if (resource.readiness) {
      updateArgs.push(
        `(args.waitForReady ?? true) ? ${
          JSON.stringify(resource.readiness)
        } : undefined`,
      );
    } else {
      updateArgs.push("undefined");
    }
    updateArgs.push("credentials");
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
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);
    lines.push(
      `        const params: Record<string, string> = { ${projectParamKey}: projectId };`,
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
      `        const { existed } = await deleteResource(baseUrl, DELETE_CONFIG, params, credentials);`,
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
    lines.push(
      `      arguments: z.object({ identifier: z.string().describe("Target a specific ${singularName} by ${primaryId} (e.g. one discovered by list)").optional() }),`,
    );
    lines.push(
      `      execute: async (args: { identifier?: string }, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);

    if (isSyntheticName) {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `g.name?.toString() ?? args.identifier ?? "current"`,
          )
        };`,
      );
    } else {
      lines.push(
        `        const instanceName = ${
          wrapWithSanitize(
            `g.${namingField}?.toString() ?? args.identifier ?? "current"`,
          )
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
        `        if (!content) throw new Error("No existing state found - run create, get, or list first");`,
      );
      lines.push(
        `        const existing = JSON.parse(new TextDecoder().decode(content));`,
      );
    }

    lines.push(`        try {`);

    if (resource.listOnly && resource.methodConfigs.list) {
      lines.push(
        `          const params: Record<string, string> = { ${projectParamKey}: projectId };`,
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
        `          const result = await readViaList(baseUrl, LIST_CONFIG, params, "${primaryId}", identifier, credentials) as StateData;`,
      );
    } else if (resource.methodConfigs.get) {
      lines.push(
        `          const params: Record<string, string> = { ${projectParamKey}: projectId };`,
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
            // For full-name resources, use existing.name directly if it's
            // already a fully-qualified path; otherwise build from parent + short name.
            if (syncNeedsExisting) {
              lines.push(
                `          const existingName = existing.${primaryId}?.toString();`,
              );
              lines.push(
                `          if (existingName && existingName.includes("/")) {`,
              );
              lines.push(
                `            params["name"] = existingName;`,
              );
              lines.push(
                `          } else {`,
              );
              lines.push(
                `            const shortName = existingName ?? g["name"]?.toString();`,
              );
              lines.push(
                `            if (!shortName) throw new Error("No identifier found");`,
              );
              lines.push(
                `            params["name"] = buildResourceName(${parentExpr}, shortName);`,
              );
              lines.push(
                `          }`,
              );
            } else {
              lines.push(
                `          const shortName = g["name"]?.toString();`,
              );
              lines.push(
                `          if (!shortName) throw new Error("No identifier found");`,
              );
              lines.push(
                `          params["name"] = buildResourceName(${parentExpr}, shortName);`,
              );
            }
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
        `          const result = await readResource(baseUrl, GET_CONFIG, params, credentials) as StateData;`,
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

  // --- list factory method ---
  if (hasListFactory) {
    const arrayField = resource.listResponseArrayField!;
    const primaryId = resource.primaryIdentifier[0] || "name";

    lines.push(`    list: {`);
    lines.push(
      `      description: "List ${singularName} resources",`,
    );

    // Build arguments schema from list query parameters
    lines.push(`      arguments: z.object({`);
    for (const param of resource.listQueryParams ?? []) {
      const safeParamName = safeIdent(param.name);
      let zodType: string;
      switch (param.type) {
        case "boolean":
          zodType = "z.boolean()";
          break;
        case "integer":
          zodType = "z.number()";
          break;
        default:
          zodType = "z.string()";
      }
      const desc = param.description
        ? `.describe(${
          JSON.stringify(param.description.split("\n")[0].trim())
        })`
        : "";
      lines.push(`        ${safeParamName}: ${zodType}${desc}.optional(),`);
    }
    lines.push(
      `        maxPages: z.number().describe("Maximum number of pages to fetch (default: 10)").optional(),`,
    );
    lines.push(`      }),`);

    const listConfig = resource.methodConfigs.list!;

    lines.push(
      `      execute: async (args: Record<string, unknown>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);
    lines.push(
      `        const params: Record<string, string> = { ${projectParamKey}: projectId };`,
    );

    // Add path parameters from list config's parameterOrder
    for (const paramName of listConfig.parameterOrder) {
      if (paramName === "project" || paramName === "projectId") continue;
      const parentLikeParams = new Set(["parent", "ownerName"]);
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

    // Add query parameters from method arguments
    for (const param of resource.listQueryParams ?? []) {
      const safeParamName = safeIdent(param.name);
      lines.push(
        `        if (args[${
          JSON.stringify(safeParamName)
        }] !== undefined) params[${JSON.stringify(param.name)}] = String(args[${
          JSON.stringify(safeParamName)
        }]);`,
      );
    }

    lines.push(
      `        const { items, nextPageToken } = await listResources(baseUrl, LIST_CONFIG, params, ${
        JSON.stringify(arrayField)
      }, (args.maxPages as number | undefined) ?? 10, credentials);`,
    );
    lines.push(`        const dataHandles = [];`);
    lines.push(`        for (let i = 0; i < items.length; i++) {`);
    lines.push(`          const item = items[i] as StateData;`);
    lines.push(
      `          const instanceName = ${
        wrapWithSanitize(
          `item.${primaryId}?.toString() ?? String(i)`,
        )
      };`,
    );
    lines.push(
      `          const handle = await context.writeResource("state", instanceName, item);`,
    );
    lines.push(`          dataHandles.push(handle);`);
    lines.push(`        }`);
    lines.push(
      `        return { dataHandles, result: { count: items.length, nextPageToken } };`,
    );
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
    const safeName = ["create", "get", "update", "delete", "sync", "list"]
        .includes(
          methodName,
        )
      ? `action_${methodName}`
      : methodName;

    lines.push(`    ${safeName}: {`);
    lines.push(
      `      description: "${readableName}",`,
    );

    // Build arguments schema from request properties + query-location params
    const argProps = Object.entries(action.requestProperties);
    const pathParamNames = new Set(action.config.parameterOrder);
    const queryParams: string[] = [];
    if (action.config.parameters) {
      for (
        const [paramName, paramDef] of Object.entries(action.config.parameters)
      ) {
        if (paramDef.location !== "query") continue;
        if (pathParamNames.has(paramName)) continue;
        queryParams.push(paramName);
      }
    }
    const queryParamSet = new Set(queryParams);
    const safeQueryParamSet = new Set(queryParams.map(safeIdent));
    if (argProps.length > 0 || queryParams.length > 0) {
      lines.push(`      arguments: z.object({`);
      for (const [propName, _prop] of argProps) {
        if (queryParamSet.has(propName) || safeQueryParamSet.has(propName)) {
          continue;
        }
        const isRequired = action.requiredProperties.includes(propName);
        lines.push(
          `        ${propName}: z.any()${isRequired ? "" : ".optional()"},`,
        );
      }
      for (const paramName of queryParams) {
        lines.push(
          `        ${safeIdent(paramName)}: z.any().optional(),`,
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
      const safeParamName = safeIdent(paramName);
      if (
        resource.domainProperties[safeParamName] ||
        actionParentLikeParams.has(paramName) ||
        paramName === "name"
      ) {
        paramsFromGlobalArgs.push(paramName);
      } else {
        paramsNeedingState.push(paramName);
      }
    }

    const needsExistingState = paramsNeedingState.length > 0;
    const hasArgs = argProps.length > 0 || queryParams.length > 0;
    const argsPrefix = hasArgs ? "args" : "_args";

    lines.push(
      `      execute: async (${argsPrefix}: Record<string, unknown>, context: any) => {`,
    );
    lines.push(`        const g = context.globalArgs;`);
    lines.push(
      `        const baseUrl = g["apiEndpoint"]?.toString() ?? Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;`,
    );
    lines.push(`        const credentials = _buildGcpCredentials(g);`);
    lines.push(`        const projectId = await getProjectId(credentials);`);
    lines.push(
      `        const params: Record<string, string> = { ${projectParamKey}: projectId };`,
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
        `        const content = await context.dataRepository.getContent(`,
      );
      lines.push(
        `          context.modelType, context.modelId, ${
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

    // Route query-location args to params (safe ident for args key, raw name for URL param)
    for (const paramName of queryParams) {
      const safeParamName = safeIdent(paramName);
      lines.push(
        `        if (args[${
          JSON.stringify(safeParamName)
        }] !== undefined) params[${JSON.stringify(paramName)}] = String(args[${
          JSON.stringify(safeParamName)
        }]);`,
      );
    }

    // Build request body from action request properties (excluding query params)
    const bodyProps = argProps.filter(([name]) =>
      !queryParamSet.has(name) && !safeQueryParamSet.has(name)
    );
    if (bodyProps.length > 0) {
      lines.push(`        const body: Record<string, unknown> = {};`);
      for (const [propName] of bodyProps) {
        lines.push(
          `        if (args[${JSON.stringify(propName)}] !== undefined) body[${
            JSON.stringify(propName)
          }] = args[${JSON.stringify(propName)}];`,
        );
      }
    }

    // Use createResource which handles URL building + LRO polling
    const actionConfigStr = JSON.stringify(action.config);
    const isGetOrHead = action.config.httpMethod === "GET" ||
      action.config.httpMethod === "HEAD";
    const bodyArg = bodyProps.length > 0
      ? "body"
      : (isGetOrHead ? "undefined" : "{}");
    lines.push(
      `        const result = await createResource(baseUrl, ${actionConfigStr}, params, ${bodyArg}, undefined, undefined, undefined, credentials);`,
    );

    lines.push(`        return { result };`);
    lines.push(`      },`);
    lines.push(`    },`);
  }

  // Enrichment methods — splice additional method definitions from the enrichment
  if (input.enrichment) {
    lines.push(
      `    ...${input.enrichment.methodsExport},`,
    );
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

/**
 * Select the best field for idempotent create matching.
 *
 * Cascade when isSyntheticName is true:
 *   nested identity field (e.g. "groupKey.id") → displayName → shortName → undefined.
 *
 * Cascade when isSyntheticName is false:
 *   displayName → shortName → namingField → undefined.
 *
 * Returns undefined when no viable match field exists, which tells the
 * create codegen to omit the broken IdempotencyConfig entirely.
 *
 * When isSyntheticName is true the naming field is server-assigned and
 * cannot be matched; the function checks for a nested identity field
 * first (the strongest match), then falls back to displayName/shortName.
 * When false, namingField is always viable (it preserves the
 * segmentIdField fallback path for wrapper-request resources).
 */
export function resolveGcpMatchField(
  resource: GcpParsedResource,
  namingField: string,
  isSyntheticName: boolean,
): string | undefined {
  if (isSyntheticName) {
    const nestedId = findNestedIdentityField(resource);
    if (nestedId) return nestedId;
  }
  if (
    resource.insertProperties.has("displayName") &&
    resource.domainProperties["displayName"]
  ) {
    return "displayName";
  }
  if (
    resource.insertProperties.has("shortName") &&
    resource.domainProperties["shortName"]
  ) {
    return "shortName";
  }
  if (!isSyntheticName) {
    return namingField;
  }
  return undefined;
}

function isIdentityProperty(
  propName: string,
  idDesc: string,
): boolean {
  if (propName.endsWith("Key") || propName.endsWith("Id")) return true;
  if (
    idDesc.includes("uniquely identify") ||
    idDesc.includes("unique identifier")
  ) return true;
  return false;
}

function findNestedIdentityField(
  resource: GcpParsedResource,
): string | undefined {
  const candidates: string[] = [];
  for (const propName of resource.insertProperties) {
    const prop = resource.domainProperties[propName];
    if (!prop) continue;
    if (prop.type !== "object" && prop.type !== undefined) continue;
    const objProp = prop as {
      properties?: Record<string, { type?: string; description?: string }>;
    };
    if (!objProp.properties?.["id"]) continue;
    const parentDesc = (prop.description ?? "").toLowerCase();
    if (
      parentDesc.includes("output only") || parentDesc.includes("read-only")
    ) continue;
    const idDesc = (objProp.properties["id"].description ?? "").toLowerCase();
    if (idDesc.includes("output only") || idDesc.includes("read-only")) {
      continue;
    }
    if (!isIdentityProperty(propName, idDesc)) continue;
    const rvProp = resource.resourceValueProperties[propName];
    if (rvProp) {
      const rvDesc = (rvProp.description ?? "").toLowerCase();
      if (rvDesc.includes("output only") || rvDesc.includes("read-only")) {
        continue;
      }
    }
    candidates.push(`${propName}.id`);
  }
  if (candidates.length === 1) return candidates[0];
  return undefined;
}

function singularize(segment: string): string {
  if (segment.endsWith("ies")) return segment.slice(0, -3) + "y";
  if (segment.endsWith("ses")) return segment.slice(0, -2);
  if (segment.endsWith("s")) return segment.slice(0, -1);
  return segment;
}

/**
 * Detect the segment-ID insert property for wrapper-request create patterns.
 *
 * GCP APIs like IAM roles use a wrapper request (CreateRoleRequest) where the
 * resource's `name` must NOT be set on create — instead, a short identifier
 * like `roleId` is passed in the body. The full resource name in the response
 * is `{parent}/roles/{roleId}`.
 *
 * Returns the matching field name (e.g., "roleId") when:
 *   - usesFullResourceName is true and resourceSegment is set
 *   - "name" is NOT in insertProperties (wrapper request pattern)
 *   - an insert property matches singularize(resourceSegment) + "Id"
 *
 * Returns undefined otherwise (safe fallback to current behavior).
 */
export function detectSegmentIdField(
  resource: GcpParsedResource,
): string | undefined {
  if (!resource.usesFullResourceName || !resource.resourceSegment) {
    return undefined;
  }
  if (resource.insertProperties.has("name")) return undefined;

  const expectedField = singularize(resource.resourceSegment) + "Id";
  if (resource.insertProperties.has(expectedField)) return expectedField;
  return undefined;
}
