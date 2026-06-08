// Hetzner Cloud model generation pipeline
// Fetches the OpenAPI spec, parses endpoints, groups by noun,
// extracts CRUD operations, and generates extension models.

import { dirname } from "@std/path";
import { generateHetznerExtensionModel } from "./extensionModelGenerator.ts";
import { generateHetznerLibFile } from "./libGenerator.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateHetznerDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateHetznerReadme } from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";

const HETZNER_SPEC_URL = "https://docs.hetzner.cloud/cloud.spec.json";

// --- Public types ---

export interface HetznerProperty {
  type: "string" | "number" | "integer" | "boolean" | "array" | "object";
  description?: string;
  enum?: (string | number)[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  items?: HetznerProperty;
  properties?: Record<string, HetznerProperty>;
  requiredProperties?: string[];
  format?: string;
}

export interface HetznerResource {
  /** The API noun, e.g., "servers", "ssh_keys" */
  noun: string;
  /** Slug for model type, e.g., "servers", "ssh-keys" */
  modelSlug: string;
  /** File name, e.g., "servers.ts", "ssh_keys.ts" */
  fileName: string;
  /** Properties from POST body (create) */
  createProperties: Record<string, HetznerProperty>;
  /** Properties from PUT body (update) — may be empty */
  updateProperties: Record<string, HetznerProperty>;
  /** Properties from GET response (resource state) */
  resourceProperties: Record<string, HetznerProperty>;
  /** Required properties for create */
  requiredProperties: string[];
  /** Available CRUD handlers */
  handlers: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    /** True when the collection path (e.g. GET /servers) supports listing */
    list: boolean;
  };
  /** Field used to derive instance names (e.g., "name") */
  identifyingField: string;
}

export interface HetznerGeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface HetznerModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface HetznerGenerationResult {
  version: string;
  models: HetznerGeneratedFile[];
  libFile: HetznerGeneratedFile;
  manifest: HetznerGeneratedFile;
  readmeFile: HetznerGeneratedFile;
  licenseFile: HetznerGeneratedFile;
  denoConfigFile: HetznerGeneratedFile;
  skipped: { path: string; reason: string }[];
  errors: string[];
  modelChanges: HetznerModelChange[];
  hasChanges: boolean;
}

// --- Schema fetching ---

export async function fetchHetznerSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/hetzner.json", import.meta.url).pathname;

  console.log("Fetching Hetzner Cloud OpenAPI spec...");
  console.log(`  Source: ${HETZNER_SPEC_URL}`);

  const response = await fetch(HETZNER_SPEC_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download spec: ${response.status} ${response.statusText}`,
    );
  }

  const spec = await response.text();
  const outputDir = dirname(outputPath);
  await Deno.mkdir(outputDir, { recursive: true });
  await Deno.writeTextFile(outputPath, spec);

  const fileSize = (await Deno.stat(outputPath)).size;
  console.log(`\nSchema fetch complete!`);
  console.log(
    `  Output: ${outputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`,
  );
}

// --- Model generation ---

export async function generateHetznerModels(options: {
  outputDir: string;
  schemaPath?: string;
}): Promise<HetznerGenerationResult> {
  const schemaPath = options.schemaPath ??
    new URL("../schemas/hetzner.json", import.meta.url).pathname;

  console.log("Loading Hetzner OpenAPI spec...");
  const specText = await Deno.readTextFile(schemaPath);
  const spec = JSON.parse(specText);

  // CalVer date prefix for this generation run
  const now = new Date();
  const datePrefix = `${now.getFullYear()}.${
    String(now.getMonth() + 1).padStart(2, "0")
  }.${String(now.getDate()).padStart(2, "0")}`;

  // Parse resources from OpenAPI paths
  const resources = parseResources(spec);
  console.log(`Found ${resources.length} resources`);

  const models: HetznerGeneratedFile[] = [];
  const skipped: { path: string; reason: string }[] = [];
  const errors: string[] = [];
  const modelChanges: HetznerModelChange[] = [];

  const extensionName = "@swamp/hetzner-cloud";
  // Placeholder version used for change detection — we'll replace it with the real version
  const placeholderVersion = "VERSION_PLACEHOLDER";

  for (const resource of resources) {
    try {
      // Generate with placeholder to compare content without version noise
      const candidateCode = generateHetznerExtensionModel({
        resource,
        extensionName,
        version: placeholderVersion,
      });

      const filePath = `extensions/models/${resource.fileName}`;
      const { version, status, existingContent } = await computeModelVersion(
        options.outputDir,
        filePath,
        datePrefix,
        candidateCode,
        placeholderVersion,
      );

      // Compute new GlobalArgs field names for upgrade diffing
      const isSyntheticName = !resource.createProperties.name &&
        !resource.createProperties.label;
      const mergedProps = {
        ...resource.updateProperties,
        ...resource.createProperties,
      };
      const newFieldNames = [
        ...(isSyntheticName ? ["name"] : []),
        ...Object.keys(mergedProps),
      ];
      // The generator injects an auth `token` global arg unless the resource
      // already has one. Mirror that here so upgrade diffing sees the field that
      // is actually emitted — otherwise the next changed regeneration would
      // read `token` from the committed GlobalArgsSchema, miss it in
      // newFieldNames, and emit a spurious "Removed: token" upgrade entry.
      if (!newFieldNames.includes("token")) {
        newFieldNames.push("token");
      }

      const upgradesBlock = computeUpgradesBlock(
        status,
        version,
        existingContent,
        newFieldNames,
      );

      // Generate final code with the real version and upgrades
      const sourceCode = generateHetznerExtensionModel({
        resource,
        extensionName,
        version,
        upgradesBlock,
      });

      models.push({ filePath, sourceCode });
      modelChanges.push({ fileName: resource.fileName, status });
    } catch (error) {
      errors.push(`${resource.noun}: ${error}`);
    }
  }

  // Generate shared lib
  const libFile: HetznerGeneratedFile = {
    filePath: "extensions/models/_lib/hetzner.ts",
    sourceCode: generateHetznerLibFile(),
  };

  // Build release notes from model changes
  const added = modelChanges
    .filter((c) => c.status === "new")
    .map((c) => c.fileName.replace(".ts", ""));
  const updated = modelChanges
    .filter((c) => c.status === "changed")
    .map((c) => c.fileName.replace(".ts", ""));
  const releaseNoteLines: string[] = [];
  if (added.length > 0) {
    releaseNoteLines.push(`- Added: ${added.join(", ")}`);
  }
  if (updated.length > 0) {
    releaseNoteLines.push(`- Updated: ${updated.join(", ")}`);
  }
  const releaseNotes = releaseNoteLines.join("\n");

  // Generate README and LICENSE
  const readmeFile: HetznerGeneratedFile = {
    filePath: "README.md",
    sourceCode: generateHetznerReadme(),
  };
  const licenseFile: HetznerGeneratedFile = {
    filePath: "LICENSE.txt",
    sourceCode: generateLicense(),
  };
  const denoConfigFile: HetznerGeneratedFile = {
    filePath: "deno.json",
    sourceCode: generateHetznerDenoConfig(),
  };

  // Detect README/LICENSE changes
  // Format README with deno fmt before comparing so that the comparison
  // is stable across runs (deno fmt runs on the output directory after
  // writing, so the on-disk README is already formatted).
  let readmeChanged = false;
  let licenseChanged = false;
  try {
    const existingReadme = await Deno.readTextFile(
      `${options.outputDir}/README.md`,
    );
    const formattedReadme = await formatFile(readmeFile.sourceCode, ".md");
    readmeChanged = existingReadme !== formattedReadme;
  } catch {
    readmeChanged = true;
  }
  try {
    const existingLicense = await Deno.readTextFile(
      `${options.outputDir}/LICENSE.txt`,
    );
    licenseChanged = existingLicense !== licenseFile.sourceCode;
  } catch {
    licenseChanged = true;
  }

  // Compute manifest version with change detection
  const additionalFiles = ["LICENSE.txt", "README.md"];
  const modelFileNames = models.map((m) =>
    m.filePath.replace("extensions/models/", "")
  );
  const candidateManifest = generateManifest({
    name: extensionName,
    version: placeholderVersion,
    description: "Hetzner Cloud infrastructure models",
    labels: ["hetzner", "cloud", "infrastructure"],
    modelFiles: modelFileNames,
    additionalFiles,
    releaseNotes,
    repository: "https://github.com/swamp-club/swamp-extensions",
    platforms: [],
  });
  const hasChangedModels = modelChanges.some((c) =>
    c.status === "new" || c.status === "changed"
  );
  const hasChanges = hasChangedModels || readmeChanged || licenseChanged;
  const manifestVersion = await computeManifestVersion(
    options.outputDir,
    "manifest.yaml",
    datePrefix,
    candidateManifest,
    placeholderVersion,
    hasChanges,
  );
  const manifestSource = generateManifest({
    name: extensionName,
    version: manifestVersion,
    description: "Hetzner Cloud infrastructure models",
    labels: ["hetzner", "cloud", "infrastructure"],
    modelFiles: modelFileNames,
    additionalFiles,
    releaseNotes,
    repository: "https://github.com/swamp-club/swamp-extensions",
    platforms: [],
  });
  const manifest: HetznerGeneratedFile = {
    filePath: "manifest.yaml",
    sourceCode: manifestSource,
  };

  return {
    version: manifestVersion,
    models,
    libFile,
    manifest,
    readmeFile,
    licenseFile,
    denoConfigFile,
    skipped,
    errors,
    modelChanges,
    hasChanges,
  };
}

// --- OpenAPI parsing ---

interface PathGroup {
  noun: string;
  paths: Record<string, Record<string, OApiOperation>>;
}

interface OApiSchema {
  $ref?: string;
  type?: string;
  description?: string;
  properties?: Record<string, OApiSchema>;
  required?: string[];
  anyOf?: OApiSchema[];
  oneOf?: OApiSchema[];
  allOf?: OApiSchema[];
  enum?: (string | number)[];
  items?: OApiSchema;
  format?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
  nullable?: boolean;
}

interface OApiParameter {
  name: string;
  in?: string;
  required?: boolean;
  schema?: OApiSchema;
}

interface OApiOperation {
  requestBody?: {
    content?: Record<string, { schema?: OApiSchema }>;
  };
  responses?: Record<string, {
    content?: Record<string, { schema?: OApiSchema }>;
  }>;
  parameters?: OApiParameter[];
  description?: string;
  [key: string]: unknown;
}

interface OApiSpec {
  paths?: Record<string, Record<string, OApiOperation>>;
  [key: string]: unknown;
}

/**
 * Parse the Hetzner OpenAPI spec, group endpoints by noun,
 * and extract resource definitions.
 */
function parseResources(spec: OApiSpec): HetznerResource[] {
  const paths: Record<string, Record<string, OApiOperation>> = spec.paths ??
    {};

  // Group paths by noun (second URL segment after base)
  const groups = new Map<string, PathGroup>();

  for (const [path, methods] of Object.entries(paths)) {
    const segments = path.split("/").filter(Boolean);

    // Skip paths that don't start with a version segment or have no noun
    // Hetzner paths look like: /servers, /servers/{id}, /ssh_keys, etc.
    // Some may have /v1/ prefix in the spec
    let noun: string | undefined;
    if (segments.length >= 1) {
      // First real segment is the noun (skip version prefix if present)
      noun = segments[0] === "v1" ? segments[1] : segments[0];
    }
    if (!noun) continue;

    // Skip action endpoints and deep sub-resources
    if (path.includes("/actions")) continue;
    const nounIndex = segments.indexOf(noun);
    const afterNoun = segments.slice(nounIndex + 1);
    // Allow /noun and /noun/{id} but skip /noun/{id}/sub_resource
    if (afterNoun.length > 1) continue;

    if (!groups.has(noun)) {
      groups.set(noun, { noun, paths: {} });
    }
    groups.get(noun)!.paths[path] = methods as Record<string, OApiOperation>;
  }

  const resources: HetznerResource[] = [];

  for (const [noun, group] of groups) {
    // We need at least a POST (create) endpoint for this noun to be a resource
    let hasPost = false;
    for (const methods of Object.values(group.paths)) {
      if (methods.post) {
        hasPost = true;
        break;
      }
    }
    if (!hasPost) continue;

    const resource = mergeResourceOperations(noun, group.paths, spec);
    if (resource) {
      resources.push(resource);
    }
  }

  return resources.sort((a, b) => a.noun.localeCompare(b.noun));
}

/**
 * Merge operations across CRUD endpoints into a single resource definition.
 */
function mergeResourceOperations(
  noun: string,
  paths: Record<string, Record<string, OApiOperation>>,
  spec: OApiSpec,
): HetznerResource | null {
  let postBody: Record<string, HetznerProperty> = {};
  let postRequired: string[] = [];
  let putBody: Record<string, HetznerProperty> = {};
  let getResponse: Record<string, HetznerProperty> = {};
  let hasCreate = false;
  let hasRead = false;
  let hasUpdate = false;
  let hasDelete = false;
  let hasList = false;

  // Sort paths so single-resource paths (with {id}) come last and overwrite list responses
  const sortedPaths = Object.entries(paths).sort(([a], [b]) => {
    const aHasId = a.includes("{");
    const bHasId = b.includes("{");
    if (aHasId && !bHasId) return 1;
    if (!aHasId && bHasId) return -1;
    return 0;
  });

  for (const [path, methods] of sortedPaths) {
    const isSingleResource = path.includes("{");

    if (methods.post) {
      hasCreate = true;
      const { properties, required } = extractRequestBody(
        methods.post,
        spec,
      );
      postBody = { ...postBody, ...properties };
      postRequired = [...new Set([...postRequired, ...required])];
    }

    if (methods.put) {
      hasUpdate = true;
      const { properties } = extractRequestBody(methods.put, spec);
      putBody = { ...putBody, ...properties };
    }

    if (methods.get && isSingleResource) {
      // Only use single-resource GET (with {id}) for resource properties
      const { properties } = extractResponseBody(methods.get, spec);
      if (Object.keys(properties).length > 0) {
        hasRead = true;
        getResponse = properties;
      }
    }

    if (methods.get && !isSingleResource) {
      // Collection GET (e.g. GET /servers) enables the `list` discovery method
      hasList = true;
    }

    if (methods.delete) {
      hasDelete = true;
    }
  }

  if (!hasCreate) return null;

  // Ensure `id` is in the resource properties
  if (!getResponse.id) {
    getResponse = {
      id: { type: "number", description: "Unique identifier" },
      ...getResponse,
    };
  }

  // Determine identifying field — prefer "name" if it exists in create props
  const identifyingField = postBody.name ? "name" : "id";

  const modelSlug = noun.replace(/_/g, "-");

  return {
    noun,
    modelSlug,
    fileName: `${noun}.ts`,
    createProperties: postBody,
    updateProperties: putBody,
    resourceProperties: getResponse,
    requiredProperties: postRequired,
    handlers: {
      create: hasCreate,
      read: hasRead,
      update: hasUpdate,
      delete: hasDelete,
      list: hasList,
    },
    identifyingField,
  };
}

/**
 * Extract properties from a request body schema.
 */
function extractRequestBody(
  operation: OApiOperation,
  spec: OApiSpec,
): { properties: Record<string, HetznerProperty>; required: string[] } {
  const body = operation.requestBody;
  if (!body) return { properties: {}, required: [] };

  const content = body.content?.["application/json"];
  if (!content?.schema) return { properties: {}, required: [] };

  const schema = resolveRef(content.schema, spec);
  if (!schema.properties) return { properties: {}, required: [] };

  const properties: Record<string, HetznerProperty> = {};
  for (const [name, propSchema] of Object.entries(schema.properties)) {
    const resolved = resolveRef(propSchema, spec);
    properties[name] = normalizeHetznerProperty(resolved, spec);
  }

  return {
    properties,
    required: schema.required ?? [],
  };
}

/**
 * Extract properties from a 200/201 response schema.
 * Handles Hetzner's envelope pattern (e.g., { "server": { ... }, "root_password": "..." })
 */
function extractResponseBody(
  operation: OApiOperation,
  spec: OApiSpec,
): { properties: Record<string, HetznerProperty> } {
  const responses = operation.responses;
  if (!responses) return { properties: {} };

  // Try 200, then 201
  const responseObj = responses["200"] ?? responses["201"];
  if (!responseObj) return { properties: {} };

  const content = responseObj.content?.["application/json"];
  if (!content?.schema) return { properties: {} };

  const schema = resolveRef(content.schema, spec);
  if (!schema.properties) return { properties: {} };

  // Unwrap the envelope — find the first property that isn't meta/links
  // and that is an object with its own properties
  const envelopeKeys = Object.keys(schema.properties).filter(
    (k) => k !== "meta" && k !== "links",
  );

  // If there's exactly one non-meta key and it's an object, unwrap it
  if (envelopeKeys.length === 1) {
    const innerKey = envelopeKeys[0];
    const innerSchema = resolveRef(schema.properties[innerKey], spec);
    if (innerSchema.type === "object" && innerSchema.properties) {
      return extractPropertiesFromSchema(innerSchema, spec);
    }
    // If it's an allOf, resolve and extract
    if (innerSchema.allOf) {
      const merged = mergeAllOf(innerSchema.allOf, spec);
      if (merged.properties) {
        return extractPropertiesFromSchema(
          { ...innerSchema, properties: merged.properties },
          spec,
        );
      }
    }
  }

  // Otherwise try to extract from the top-level response
  return extractPropertiesFromSchema(schema, spec);
}

function extractPropertiesFromSchema(
  schema: OApiSchema,
  spec: OApiSpec,
): { properties: Record<string, HetznerProperty> } {
  const properties: Record<string, HetznerProperty> = {};
  if (!schema.properties) return { properties };

  for (const [name, propSchema] of Object.entries(schema.properties)) {
    if (name === "meta" || name === "links") continue;
    const resolved = resolveRef(propSchema, spec);
    properties[name] = normalizeHetznerProperty(resolved, spec);
  }

  return { properties };
}

// --- Schema helpers ---

/**
 * Resolve a $ref pointer in the OpenAPI spec.
 */
function resolveRef(schema: OApiSchema, spec: OApiSpec): OApiSchema {
  if (!schema || typeof schema !== "object") {
    return (schema ?? {}) as OApiSchema;
  }

  if (schema.$ref) {
    const refPath = schema.$ref.replace(/^#\//, "").split("/");
    let current: unknown = spec;
    for (const segment of refPath) {
      current = (current as Record<string, unknown>)[segment];
    }
    return current ? resolveRef(current as OApiSchema, spec) : {};
  }

  // Handle allOf by merging
  if (schema.allOf) {
    return mergeAllOf(schema.allOf, spec);
  }

  return schema;
}

/**
 * Merge an allOf array into a single schema.
 */
function mergeAllOf(allOf: OApiSchema[], spec: OApiSpec): OApiSchema {
  const merged: OApiSchema = {};
  for (const item of allOf) {
    const resolved = resolveRef(item, spec);
    if (resolved.properties) {
      merged.properties = {
        ...(merged.properties ?? {}),
        ...resolved.properties,
      };
    }
    if (resolved.required) {
      merged.required = [
        ...new Set([...(merged.required ?? []), ...resolved.required]),
      ];
    }
    if (resolved.type) merged.type = resolved.type;
    if (resolved.description) merged.description = resolved.description;
  }
  return merged;
}

/**
 * Normalize an OpenAPI property schema into our HetznerProperty type.
 * Handles oneOf, allOf, and nested objects.
 */
function normalizeHetznerProperty(
  schema: OApiSchema,
  spec: OApiSpec,
): HetznerProperty {
  if (!schema || typeof schema !== "object") {
    return { type: "string" };
  }

  const resolved = resolveRef(schema, spec);

  // Handle oneOf — pick the first non-null variant
  if (resolved.oneOf) {
    for (const variant of resolved.oneOf) {
      const resolvedVariant = resolveRef(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeHetznerProperty(resolvedVariant, spec);
      }
    }
    // Fallback: treat as string
    return { type: "string", description: resolved.description };
  }

  // Handle anyOf similarly
  if (resolved.anyOf) {
    for (const variant of resolved.anyOf) {
      const resolvedVariant = resolveRef(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeHetznerProperty(resolvedVariant, spec);
      }
    }
    return { type: "string", description: resolved.description };
  }

  const type = resolved.type ?? "string";

  const prop: HetznerProperty = {
    type: (type === "integer" ? "integer" : type) as HetznerProperty["type"],
    description: resolved.description,
  };

  // String constraints
  if (type === "string") {
    if (resolved.enum) prop.enum = resolved.enum;
    if (resolved.minLength !== undefined) prop.minLength = resolved.minLength;
    if (resolved.maxLength !== undefined) prop.maxLength = resolved.maxLength;
    if (resolved.pattern) prop.pattern = resolved.pattern;
  }

  // Number constraints
  if (type === "number" || type === "integer") {
    if (resolved.enum) prop.enum = resolved.enum;
    if (resolved.minimum !== undefined) prop.minimum = resolved.minimum;
    if (resolved.maximum !== undefined) prop.maximum = resolved.maximum;
  }

  // Array items
  if (type === "array" && resolved.items) {
    const itemResolved = resolveRef(resolved.items, spec);
    prop.items = normalizeHetznerProperty(itemResolved, spec);
  }

  // Object properties
  if (type === "object" && resolved.properties) {
    prop.properties = {};
    for (const [name, childSchema] of Object.entries(resolved.properties)) {
      const childResolved = resolveRef(childSchema, spec);
      prop.properties[name] = normalizeHetznerProperty(childResolved, spec);
    }
    if (resolved.required && Array.isArray(resolved.required)) {
      prop.requiredProperties = resolved.required;
    }
  }

  return prop;
}
