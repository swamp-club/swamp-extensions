// Vercel provider pipeline — schema fetching and model generation
// Fetches the OpenAPI spec, dereferences $refs, parses endpoints,
// groups by tag (service), extracts CRUD operations, and generates extension models.

import $RefParser from "@apidevtools/json-schema-ref-parser";
import { dirname } from "@std/path";
import {
  generateVercelExtensionModel,
  globalArgName,
} from "./extensionModelGenerator.ts";
import { generateVercelLibFile } from "./libGenerator.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateVercelDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateVercelReadme } from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";
import { serializeWithCycleDetection } from "../shared/serialize.ts";

const VERCEL_SPEC_URL = "https://openapi.vercel.sh/";

// --- Public types ---

export interface VercelProperty {
  type: "string" | "number" | "integer" | "boolean" | "array" | "object";
  description?: string;
  enum?: (string | number)[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  items?: VercelProperty;
  properties?: Record<string, VercelProperty>;
  requiredProperties?: string[];
  format?: string;
}

export interface VercelResource {
  /** Stripped path after version prefix, e.g., "projects", "domains/{domain}/records" */
  resourcePath: string;
  /** Service name from tag, e.g., "projects", "dns" */
  service: string;
  /** Slug for model type, e.g., "projects", "dns-records" */
  modelSlug: string;
  /** File name, e.g., "projects.ts", "dns_records.ts" */
  fileName: string;
  /** Display name, e.g., "Projects", "Dns Records" */
  displayName: string;
  /** Full base path with version (used as fallback), e.g., "/v10/projects" */
  basePath: string;
  /** Full ID path with version (used as fallback), e.g., "/v9/projects/{idOrName}" */
  idPath: string;

  // --- Per-operation versioned paths ---
  /** Path for the create operation, e.g., "/v11/projects" */
  createPath: string;
  /** HTTP method for create: "POST", "PUT", or "PATCH" */
  createMethod: "POST" | "PUT" | "PATCH";
  /** Path for the list operation (GET on base), e.g., "/v10/projects" — null if no list */
  listPath: string | null;
  /** Base path for read-by-ID (GET idPath with terminal /{param} stripped), e.g., "/v9/projects" */
  readBasePath: string;
  /** Whether there's a GET on the individual ID path (vs list-only) */
  hasIndividualRead: boolean;
  /** Base path for update-by-ID (PATCH/PUT idPath stripped), e.g., "/v9/projects" — null if no update */
  updateBasePath: string | null;
  /** Base path for delete-by-ID, e.g., "/v6/domains" — null if no delete */
  deleteBasePath: string | null;

  /** Properties from POST/PUT body (create) */
  createProperties: Record<string, VercelProperty>;
  /** Properties from PATCH/PUT body (update) — may be empty */
  updateProperties: Record<string, VercelProperty>;
  /** Properties from GET response (resource state) */
  resourceProperties: Record<string, VercelProperty>;
  /**
   * Property names (API names) required by create. Optional in
   * GlobalArgsSchema; the generated create method rejects them when unset.
   * No resource property stays required there: no non-create method reads
   * one from globalArgs as required (parent params and the synthetic name are
   * emitted separately, and the naming field falls back when unset).
   */
  createRequiredProperties: string[];
  /** Available CRUD handlers */
  handlers: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  /** HTTP method for update: "PATCH" | "PUT" */
  updateMethod: "PATCH" | "PUT";
  /** Field name in API response that holds the unique ID */
  identifyingField: string;
  /** Path parameter name for the resource ID, e.g., "idOrName", "domain" */
  idParam: string;
  /** Field used to derive instance names (e.g., "name") */
  namingField: string;
  /** Whether the naming field is synthetic (injected, not in the API) */
  syntheticName: boolean;
  /** Properties only valid at create time (not in update body) */
  createOnlyProperties: Set<string>;
  /** Pagination style detected from GET list endpoint */
  paginationStyle: "cursor" | "none";
  /** Name of the cursor query parameter ("until" or "next") — only set when paginationStyle is "cursor" */
  paginationCursorParam: "until" | "next" | null;
  /** Parent path parameters that become required global args */
  parentParams: { paramName: string; description: string }[];
  /** How to transform the body before sending — "none" (default), "wrapArray" (wrap in [body]), "batchItems" (wrap in {items: [{...body, operation: "upsert"}]}) */
  bodyTransform: "none" | "wrapArray" | "batchItems";
  /** Key to unwrap from API response — e.g., "domain" for {domain: {...}} envelopes */
  responseUnwrapKey: string | null;
  /** How to extract the created resource from POST response — "direct" (default) or "batchFirst" ({created: [...]} → created[0]) */
  createResponseStyle: "direct" | "batchFirst";
}

export interface VercelGeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface VercelModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface VercelServiceResult {
  serviceName: string;
  models: VercelGeneratedFile[];
  libFile: VercelGeneratedFile;
  manifest: VercelGeneratedFile;
  readmeFile: VercelGeneratedFile;
  licenseFile: VercelGeneratedFile;
  denoConfigFile: VercelGeneratedFile;
  modelChanges: VercelModelChange[];
  hasChanges: boolean;
}

export interface VercelGenerationResult {
  datePrefix: string;
  services: Map<string, VercelServiceResult>;
  skipped: { path: string; reason: string }[];
  errors: string[];
}

// --- Configuration tables ---

/** Maps path parameter names to the field name in the API response. */
const IDENTIFIER_MAP: Record<string, string> = {
  id: "id",
  idOrName: "id",
  idOrUrl: "uid",
  domain: "name",
  recordId: "id",
  projectId: "id",
  configId: "id",
  tokenId: "id",
  aliasId: "uid",
  certId: "id",
  drainId: "id",
  webhookId: "id",
  memberId: "uid",
  groupId: "accessGroupId",
  ruleId: "id",
  networkId: "id",
  idOrAlias: "uid",
  edgeConfigItemKey: "key",
  uid: "uid",
};

/** Tags to skip — not manageable infrastructure resources. */
const SKIP_TAGS = new Set([
  "artifacts",
  "authentication",
  "billing",
  "checks",
  "checks-v2",
  "connect",
  "logs",
  "marketplace",
  "sandboxes",
  "user",
  "web-analytics",
  "logDrains",
  "observability",
]);

/** Specific paths to skip. */
const SKIP_PATHS = new Set([
  "/v1/edge-config/{edgeConfigId}/schema",
  "/v1/security/firewall/config/{configVersion}",
]);

/** Normalize tag names to service directory names. */
const TAG_TO_SERVICE: Record<string, string> = {
  "access-groups": "access-groups",
  "ai-gateway": "ai-gateway",
  "bulk-redirects": "bulk-redirects",
  "domains-registrar": "domains-registrar",
  "edge-cache": "edge-cache",
  "feature-flags": "feature-flags",
  "global-config": "edge-config",
  "project-routes": "project-routes",
  "projectMembers": "project-members",
  "rolling-release": "rolling-release",
  "static-ips": "static-ips",
  "microfrontends": "microfrontends",
  "networking": "networking",
  "blob-storage": "blob-storage",
};

/**
 * Manual resource definitions for resources the automatic pipeline can't discover.
 * These cover cross-path CRUD (different URL structures for create vs read),
 * untagged endpoints, and batch-create patterns.
 */
interface ManualResourceDef {
  tag: string;
  createMethod: "post" | "put" | "patch";
  createPath: string;
  readPath: string;
  listPath: string | null;
  deletePath: string | null;
  updateMethod?: "patch" | "put";
  updatePath?: string;
  idParam: string;
  parentParams?: { paramName: string; description: string }[];
  /** If the request body is an array, extract item schema */
  arrayBody?: boolean;
  /** How to transform the body before sending */
  bodyTransform?: "wrapArray" | "batchItems";
  /** Override create properties instead of extracting from the request body */
  overrideCreateProperties?: Record<string, VercelProperty>;
}

const MANUAL_RESOURCES: ManualResourceDef[] = [
  {
    tag: "aliases",
    createMethod: "post",
    createPath: "/v2/deployments/{id}/aliases",
    readPath: "/v4/aliases/{idOrAlias}",
    listPath: "/v4/aliases",
    deletePath: "/v2/aliases/{aliasId}",
    idParam: "idOrAlias",
    parentParams: [
      { paramName: "id", description: "Deployment ID to create the alias for" },
    ],
  },
  {
    tag: "blob-storage",
    createMethod: "post",
    createPath: "/storage/stores/blob",
    readPath: "/storage/stores/{id}",
    listPath: null,
    deletePath: "/storage/stores/blob/{id}",
    idParam: "id",
  },
  {
    tag: "global-config",
    createMethod: "patch",
    createPath: "/v1/global-config/{edgeConfigId}/items",
    readPath: "/v1/global-config/{edgeConfigId}/item/{edgeConfigItemKey}",
    listPath: "/v1/global-config/{edgeConfigId}/items",
    deletePath: null,
    idParam: "edgeConfigItemKey",
    parentParams: [
      { paramName: "edgeConfigId", description: "Edge Config ID" },
    ],
    bodyTransform: "batchItems",
    overrideCreateProperties: {
      key: { type: "string", description: "The key of the Edge Config item" },
      value: {
        type: "string",
        description: "The value of the Edge Config item",
      },
      description: {
        type: "string",
        description: "A description of the Edge Config item",
      },
    },
  },
  {
    tag: "teams",
    createMethod: "post",
    createPath: "/v2/teams/{teamId}/members",
    readPath: "/v3/teams/{teamId}/members",
    listPath: "/v3/teams/{teamId}/members",
    deletePath: "/v1/teams/{teamId}/members/{uid}",
    updateMethod: "patch",
    updatePath: "/v1/teams/{teamId}/members/{uid}",
    idParam: "uid",
    parentParams: [
      { paramName: "teamId", description: "Team ID" },
    ],
    arrayBody: true,
    bodyTransform: "wrapArray",
  },
];

// --- Model generation ---

/**
 * GlobalArgsSchema field names as the generator emits them, for upgrade
 * entries. A property renamed to avoid a team scope arg (slug ->
 * resourceSlug) is listed under its global arg name, or a later upgrade
 * would report it removed and strip it from stored definitions. Parent
 * params are emitted as is.
 */
export function globalArgsFieldNames(resource: VercelResource): string[] {
  const mergedPropNames = new Set([
    ...Object.keys(resource.updateProperties),
    ...Object.keys(resource.createProperties),
  ]);
  const parentNames = new Set(resource.parentParams.map((pp) => pp.paramName));
  const emittedFields: string[] = ["teamId", "slug", ...parentNames];
  if (resource.syntheticName && !mergedPropNames.has(resource.namingField)) {
    emittedFields.push("name");
  }
  for (const name of mergedPropNames) {
    emittedFields.push(
      parentNames.has(name) ? name : globalArgName(resource, name),
    );
  }
  emittedFields.push("token");

  const validFieldName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
  return emittedFields.filter((n) => validFieldName.test(n));
}

export async function generateVercelModels(options: {
  services?: string[];
  outputDir: string;
  schemaPath?: string;
}): Promise<VercelGenerationResult> {
  const schemaPath = options.schemaPath ??
    new URL("../schemas/vercel.json", import.meta.url).pathname;

  console.log(`Loading Vercel schema from ${schemaPath}...`);
  const specText = await Deno.readTextFile(schemaPath);
  const spec = JSON.parse(specText);

  const { resources, skipped } = parseResources(spec);
  console.log(
    `Parsed ${resources.length} resources, skipped ${skipped.length}`,
  );

  // Group resources by service
  const serviceResources = new Map<string, VercelResource[]>();
  for (const resource of resources) {
    const existing = serviceResources.get(resource.service) ?? [];
    existing.push(resource);
    serviceResources.set(resource.service, existing);
  }

  // Apply service filter if provided
  if (options.services && options.services.length > 0) {
    const filter = new Set(options.services);
    for (const key of [...serviceResources.keys()]) {
      if (!filter.has(key)) {
        serviceResources.delete(key);
      }
    }
  }

  const today = new Date();
  const datePrefix = `${today.getFullYear()}.${
    String(today.getMonth() + 1).padStart(2, "0")
  }.${String(today.getDate()).padStart(2, "0")}`;

  const services = new Map<string, VercelServiceResult>();
  const errors: string[] = [];

  for (const [serviceName, svcResources] of serviceResources) {
    const extensionName = `@swamp/vercel/${serviceName}`;
    const placeholderVersion = "VERSION_PLACEHOLDER";
    const serviceOutputDir = `${options.outputDir}/vercel/${serviceName}`;

    const models: VercelGeneratedFile[] = [];
    const modelChanges: VercelModelChange[] = [];
    let hasChanges = false;

    for (const resource of svcResources) {
      try {
        const candidateCode = generateVercelExtensionModel({
          resource,
          extensionName,
          version: placeholderVersion,
        });

        const filePath = `extensions/models/${resource.fileName}`;

        const { version, status, existingContent } = await computeModelVersion(
          serviceOutputDir,
          filePath,
          datePrefix,
          candidateCode,
          placeholderVersion,
        );

        if (status !== "unchanged") hasChanges = true;

        const newFieldNames = globalArgsFieldNames(resource);
        const upgradesBlock = computeUpgradesBlock(
          status,
          version,
          existingContent,
          newFieldNames,
        );

        const finalCode = generateVercelExtensionModel({
          resource,
          extensionName,
          version,
          upgradesBlock,
        });

        models.push({ filePath, sourceCode: finalCode });
        modelChanges.push({ fileName: resource.fileName, status });
      } catch (err) {
        errors.push(
          `${serviceName}/${resource.fileName}: ${(err as Error).message}`,
        );
      }
    }

    // Generate shared lib
    const libCode = generateVercelLibFile();
    const libFile: VercelGeneratedFile = {
      filePath: "extensions/models/_lib/vercel.ts",
      sourceCode: libCode,
    };

    const firstSlug = svcResources[0]?.modelSlug ?? serviceName;
    const firstType = `${extensionName}/${firstSlug}`;
    const readmeCode = generateVercelReadme(
      serviceName,
      extensionName,
      firstSlug,
      firstType,
    );
    const readmePath = `${serviceOutputDir}/README.md`;
    try {
      const existingReadme = await Deno.readTextFile(readmePath);
      const formattedReadme = await formatFile(readmeCode, ".md");
      if (existingReadme !== formattedReadme) hasChanges = true;
    } catch {
      hasChanges = true;
    }

    const licenseCode = generateLicense();
    const licensePath = `${serviceOutputDir}/LICENSE.txt`;
    try {
      const existingLicense = await Deno.readTextFile(licensePath);
      if (existingLicense !== licenseCode) hasChanges = true;
    } catch {
      hasChanges = true;
    }

    const modelFileNames = models.map((m) =>
      m.filePath.replace("extensions/models/", "")
    );
    const releaseNotes = modelChanges
      .filter((c) => c.status !== "unchanged")
      .map((c) =>
        `- ${c.status === "new" ? "Added" : "Updated"}: ${
          c.fileName.replace(".ts", "")
        }`
      )
      .join("\n");

    const candidateManifest = generateManifest({
      name: extensionName,
      version: placeholderVersion,
      description: `Vercel ${serviceName} infrastructure models`,
      labels: ["vercel", serviceName, "cloud", "infrastructure"],
      modelFiles: modelFileNames,
      additionalFiles: ["LICENSE.txt", "README.md"],
      releaseNotes: releaseNotes || undefined,
      repository: "https://github.com/swamp-club/swamp-extensions",
      platforms: [],
    });

    const manifestVersion = await computeManifestVersion(
      serviceOutputDir,
      "manifest.yaml",
      datePrefix,
      candidateManifest,
      placeholderVersion,
      hasChanges,
    );

    const manifest = generateManifest({
      name: extensionName,
      version: manifestVersion,
      description: `Vercel ${serviceName} infrastructure models`,
      labels: ["vercel", serviceName, "cloud", "infrastructure"],
      modelFiles: modelFileNames,
      additionalFiles: ["LICENSE.txt", "README.md"],
      releaseNotes: releaseNotes || undefined,
      repository: "https://github.com/swamp-club/swamp-extensions",
      platforms: [],
    });

    const denoConfigCode = generateVercelDenoConfig();

    services.set(serviceName, {
      serviceName,
      models,
      libFile,
      manifest: { filePath: "manifest.yaml", sourceCode: manifest },
      readmeFile: { filePath: "README.md", sourceCode: readmeCode },
      licenseFile: { filePath: "LICENSE.txt", sourceCode: licenseCode },
      denoConfigFile: { filePath: "deno.json", sourceCode: denoConfigCode },
      modelChanges,
      hasChanges,
    });
  }

  return { datePrefix, services, skipped, errors };
}

// --- Schema fetching ---

export async function fetchVercelSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/vercel.json", import.meta.url).pathname;

  console.log("Fetching Vercel OpenAPI spec...");
  console.log(`  Source: ${VERCEL_SPEC_URL}`);

  const response = await fetch(VERCEL_SPEC_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download spec: ${response.status} ${response.statusText}`,
    );
  }

  const jsonText = await response.text();

  const tmpJson = await Deno.makeTempFile({ suffix: ".json" });
  try {
    await Deno.writeTextFile(tmpJson, jsonText);

    console.log("Dereferencing $refs...");
    const dereferenced = await $RefParser.dereference(tmpJson);

    const outputDir = dirname(outputPath);
    await Deno.mkdir(outputDir, { recursive: true });

    const serialized = serializeWithCycleDetection(dereferenced);
    await Deno.writeTextFile(outputPath, serialized);

    const fileSize = (await Deno.stat(outputPath)).size;
    console.log(`\nSchema fetch complete!`);
    console.log(
      `  Output: ${outputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`,
    );
  } finally {
    try {
      await Deno.remove(tmpJson);
    } catch { /* ignore cleanup errors */ }
  }
}

// --- OpenAPI parsing ---

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
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  default?: unknown;
  deprecated?: boolean;
  nullable?: boolean;
}

interface OApiParameter {
  name: string;
  in?: string;
  required?: boolean;
  description?: string;
  schema?: OApiSchema;
}

interface OApiOperation {
  operationId?: string;
  tags?: string[];
  deprecated?: boolean;
  requestBody?: {
    content?: Record<string, { schema?: OApiSchema }>;
  };
  responses?: Record<string, {
    content?: Record<string, { schema?: OApiSchema }>;
  }>;
  parameters?: OApiParameter[];
}

interface OApiPathItem {
  get?: OApiOperation;
  post?: OApiOperation;
  put?: OApiOperation;
  patch?: OApiOperation;
  delete?: OApiOperation;
  head?: OApiOperation;
  parameters?: OApiParameter[];
  [method: string]: OApiOperation | OApiParameter[] | undefined;
}

interface OApiSpec {
  paths?: Record<string, OApiPathItem>;
  [key: string]: unknown;
}

/**
 * Strip the version prefix from a path.
 * /v13/deployments → deployments
 * /v2/domains/{domain}/records → domains/{domain}/records
 */
function stripVersionPrefix(path: string): string {
  return path.replace(/^\/v\d+\//, "");
}

/**
 * Parse the Vercel OpenAPI spec, group endpoints by tag,
 * and extract resource definitions.
 */
export function parseResources(spec: OApiSpec): {
  resources: VercelResource[];
  skipped: { path: string; reason: string }[];
} {
  const paths: Record<string, OApiPathItem> = spec.paths ?? {};
  const skipped: { path: string; reason: string }[] = [];

  // Collect all operations with their tags and paths
  interface OpInfo {
    path: string;
    strippedPath: string;
    method: string;
    operation: OApiOperation;
    tag: string;
    pathItem: OApiPathItem;
  }

  const operations: OpInfo[] = [];

  for (const [path, pathItem] of Object.entries(paths)) {
    if (SKIP_PATHS.has(path)) continue;

    for (const method of ["get", "post", "put", "patch", "delete"] as const) {
      const op = pathItem[method] as OApiOperation | undefined;
      if (!op) continue;
      if (op.deprecated) {
        skipped.push({
          path: `${method.toUpperCase()} ${path}`,
          reason: "deprecated",
        });
        continue;
      }

      const tag = op.tags?.[0];
      if (!tag) {
        skipped.push({
          path: `${method.toUpperCase()} ${path}`,
          reason: "no tag",
        });
        continue;
      }
      if (SKIP_TAGS.has(tag)) continue;

      operations.push({
        path,
        strippedPath: stripVersionPrefix(path),
        method,
        operation: op,
        tag,
        pathItem,
      });
    }
  }

  // Group by stripped path to find base+ID pairs
  // An ID path has a terminal {param} segment
  const candidates = new Map<
    string,
    {
      basePath: string;
      idPath: string;
      idParam: string;
      tag: string;
      parentParams: { paramName: string; description: string }[];
      baseOps: Map<string, OApiOperation>;
      baseOpPaths: Map<string, string>;
      idOps: Map<string, OApiOperation>;
      idOpPaths: Map<string, string>;
    }
  >();

  // First pass: identify ID paths
  for (const op of operations) {
    const segments = op.strippedPath.split("/");
    const lastSeg = segments[segments.length - 1];

    if (!lastSeg.startsWith("{") || !lastSeg.endsWith("}")) continue;

    const idParam = lastSeg.slice(1, -1);
    const baseStripped = segments.slice(0, -1).join("/");

    // Find the matching base path in operations
    const baseOp = operations.find(
      (o) => o.strippedPath === baseStripped && o.tag === op.tag,
    );

    if (!baseOp) continue;

    // Collect parent params (non-terminal {param} segments excluding the ID param)
    const parentParams: { paramName: string; description: string }[] = [];
    for (const seg of segments.slice(0, -1)) {
      if (seg.startsWith("{") && seg.endsWith("}")) {
        const paramName = seg.slice(1, -1);
        // Look up parameter description from the path item
        const allParams = [
          ...(paths[op.path]?.parameters ?? []),
          ...(op.operation.parameters ?? []),
        ];
        const paramDef = allParams.find((p) => p.name === paramName);
        parentParams.push({
          paramName,
          description: paramDef?.description ?? `Parent ${paramName}`,
        });
      }
    }

    const key = `${op.tag}:${baseStripped}`;
    if (!candidates.has(key)) {
      candidates.set(key, {
        basePath: baseOp.path,
        idPath: op.path,
        idParam,
        tag: op.tag,
        parentParams,
        baseOps: new Map(),
        baseOpPaths: new Map(),
        idOps: new Map(),
        idOpPaths: new Map(),
      });
    }

    const candidate = candidates.get(key)!;
    candidate.idOps.set(op.method, op.operation);
    candidate.idOpPaths.set(op.method, op.path);
  }

  // Second pass: attach base operations to their matching candidates
  for (const op of operations) {
    for (const [_key, candidate] of candidates) {
      const baseStripped = stripVersionPrefix(candidate.basePath);
      if (op.strippedPath === baseStripped && op.tag === candidate.tag) {
        candidate.baseOps.set(op.method, op.operation);
        candidate.baseOpPaths.set(op.method, op.path);
      }
    }
  }

  const resources: VercelResource[] = [];

  for (const [_key, candidate] of candidates) {
    const {
      basePath,
      idPath,
      idParam,
      tag,
      parentParams,
      baseOps,
      baseOpPaths,
      idOps,
      idOpPaths,
    } = candidate;

    // Require POST or PUT on base (create) and GET on ID path or list (read)
    const createMethod = baseOps.has("post")
      ? "post"
      : baseOps.has("put")
      ? "put"
      : null;
    if (!createMethod) {
      skipped.push({ path: basePath, reason: "no POST or PUT (create)" });
      continue;
    }
    const createOp = baseOps.get(createMethod)!;

    // GET on ID path preferred, but fall back to GET on base (list) for
    // resources that only have list + create + delete without individual read
    const hasIdGet = idOps.has("get");
    const getOp = idOps.get("get") ?? baseOps.get("get");
    if (!getOp) {
      skipped.push({ path: basePath, reason: "no GET (read or list)" });
      continue;
    }

    // Check for empty create body
    const createContent = createOp.requestBody?.content?.["application/json"];
    if (
      !createContent?.schema || Object.keys(createContent.schema).length === 0
    ) {
      const contentTypes = Object.keys(createOp.requestBody?.content ?? {});
      if (contentTypes.length === 0) {
        skipped.push({ path: basePath, reason: "empty create body" });
        continue;
      }
      if (!contentTypes.includes("application/json")) {
        skipped.push({
          path: basePath,
          reason: `non-JSON create content: ${contentTypes.join(", ")}`,
        });
        continue;
      }
      skipped.push({ path: basePath, reason: "empty JSON create schema" });
      continue;
    }

    // Resolve per-operation versioned paths — each CRUD method may live
    // at a different version prefix in Vercel's per-operation versioning
    const createPath = baseOpPaths.get(createMethod) ?? basePath;
    const listPath = baseOpPaths.get("get") ?? null;
    const readPath = hasIdGet
      ? (idOpPaths.get("get") ?? idPath)
      : (baseOpPaths.get("get") ?? basePath);

    // Update path: prefer PATCH on ID path, then PUT on ID path
    const updateMethodKey = idOps.has("patch")
      ? "patch"
      : idOps.has("put")
      ? "put"
      : null;
    const updatePath = updateMethodKey
      ? (idOpPaths.get(updateMethodKey) ?? idPath)
      : null;

    // Delete path: only use DELETE on ID path (not base path, which is bulk delete)
    const deletePath = idOps.has("delete")
      ? (idOpPaths.get("delete") ?? idPath)
      : null;

    const resource = buildResource(
      basePath,
      idPath,
      idParam,
      tag,
      parentParams,
      createOp,
      getOp,
      idOps.get("patch"),
      idOps.get("put"),
      idOps.get("delete"),
      baseOps.get("get"),
      spec,
      {
        createPath,
        createHttpMethod: createMethod === "put" ? "PUT" : "POST",
        listPath,
        readPath,
        hasIndividualRead: hasIdGet,
        updatePath,
        deletePath,
      },
    );
    if (resource) {
      resources.push(resource);
    } else {
      skipped.push({ path: basePath, reason: "failed to extract resource" });
    }
  }

  // Process manual resource definitions for cross-path and special-case resources
  for (const manual of MANUAL_RESOURCES) {
    const createPathItem = paths[manual.createPath];
    const readPathItem = paths[manual.readPath];
    if (!createPathItem || !readPathItem) {
      skipped.push({
        path: manual.createPath,
        reason: `manual resource: path not found in spec`,
      });
      continue;
    }

    const createOp = createPathItem[manual.createMethod] as
      | OApiOperation
      | undefined;
    if (!createOp) {
      skipped.push({
        path: manual.createPath,
        reason:
          `manual resource: no ${manual.createMethod.toUpperCase()} operation`,
      });
      continue;
    }

    // For read, prefer GET on the read path; for list responses, use GET on list path
    const readOp = (readPathItem.get as OApiOperation | undefined) ??
      (manual.listPath
        ? (paths[manual.listPath]?.get as OApiOperation | undefined)
        : undefined);
    if (!readOp) {
      skipped.push({
        path: manual.readPath,
        reason: `manual resource: no GET operation`,
      });
      continue;
    }

    const updateOp = manual.updatePath
      ? (paths[manual.updatePath]?.[manual.updateMethod ?? "patch"] as
        | OApiOperation
        | undefined)
      : undefined;
    const deleteOp = manual.deletePath
      ? (paths[manual.deletePath]?.delete as OApiOperation | undefined)
      : undefined;
    const listOp = manual.listPath
      ? (paths[manual.listPath]?.get as OApiOperation | undefined)
      : undefined;

    const resource = buildManualResource(
      manual,
      createOp,
      readOp,
      updateOp,
      deleteOp,
      listOp,
      spec,
    );
    if (resource) {
      resources.push(resource);
    } else {
      skipped.push({
        path: manual.createPath,
        reason: `manual resource: failed to extract`,
      });
    }
  }

  return {
    resources: resources.sort((a, b) =>
      `${a.service}/${a.resourcePath}`.localeCompare(
        `${b.service}/${b.resourcePath}`,
      )
    ),
    skipped,
  };
}

function normalizeTagToService(tag: string): string {
  if (TAG_TO_SERVICE[tag]) return TAG_TO_SERVICE[tag];
  return tag.replace(/_/g, "-").toLowerCase();
}

interface ResolvedPaths {
  createPath: string;
  createHttpMethod: "POST" | "PUT";
  listPath: string | null;
  readPath: string;
  hasIndividualRead: boolean;
  updatePath: string | null;
  deletePath: string | null;
}

/**
 * swamp checks the full GlobalArgsSchema on `model create` and type-based
 * `workflow validate`, so create-only required fields there would block
 * definitions meant for get/lookup/sync. They are kept out of the schema's
 * required set and enforced inside create instead. Limit them to real create
 * properties (the schema's required list is not filtered against its
 * properties) and drop parent params, which are emitted separately.
 */
function createRequiredFor(
  required: string[],
  createProps: Record<string, VercelProperty>,
  parentParams: { paramName: string }[],
): string[] {
  const parents = new Set(parentParams.map((pp) => pp.paramName));
  return required.filter((name) => name in createProps && !parents.has(name));
}

function buildResource(
  basePath: string,
  idPath: string,
  idParam: string,
  tag: string,
  parentParams: { paramName: string; description: string }[],
  postOp: OApiOperation,
  getOp: OApiOperation,
  patchOp: OApiOperation | undefined,
  putOp: OApiOperation | undefined,
  deleteOp: OApiOperation | undefined,
  listOp: OApiOperation | undefined,
  spec: OApiSpec,
  paths?: ResolvedPaths,
): VercelResource | null {
  const service = normalizeTagToService(tag);

  const { properties: createProps, required: createRequired } =
    extractRequestBody(postOp, spec);
  if (Object.keys(createProps).length === 0) return null;

  const hasUpdate = !!(patchOp || putOp);
  const updateMethod: "PATCH" | "PUT" = patchOp ? "PATCH" : "PUT";
  let updateProps: Record<string, VercelProperty> = {};
  if (hasUpdate) {
    const updateOp = patchOp ?? putOp;
    const result = extractRequestBody(updateOp, spec);
    updateProps = result.properties;
  }

  const responseProps = extractResponseProperties(getOp, spec);
  if (!responseProps.id && !responseProps.uid && !responseProps.name) {
    responseProps.id = { type: "string", description: "Resource identifier" };
  }

  // Resolve identifying field: prefer IDENTIFIER_MAP, but if that field isn't
  // in the response, look for a field ending in "Id" (e.g., accessGroupId)
  let identifyingField = IDENTIFIER_MAP[idParam] ?? "id";
  if (!responseProps[identifyingField]) {
    const idCandidate = Object.keys(responseProps).find((k) =>
      k !== "teamId" && k !== "accountId" && k.endsWith("Id")
    );
    if (idCandidate) identifyingField = idCandidate;
  }

  const { field: namingField, synthetic: syntheticName } = resolveNamingField(
    createProps,
  );

  const createOnlyProperties = new Set<string>();
  if (hasUpdate && Object.keys(updateProps).length > 0) {
    for (const key of Object.keys(createProps)) {
      if (!(key in updateProps)) createOnlyProperties.add(key);
    }
  }

  const { style: paginationStyle, cursorParam: paginationCursorParam } =
    detectPagination(listOp);

  const strippedPath = stripVersionPrefix(basePath);
  const pathSegments = strippedPath.split("/").filter((s) =>
    !s.startsWith("{")
  );
  const lastSegment = pathSegments[pathSegments.length - 1];
  const modelSlug = lastSegment.replace(/_/g, "-");
  const fileName = `${lastSegment.replace(/-/g, "_")}.ts`;

  const displayName = lastSegment
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const stripIdParam = (p: string) => p.replace(/\/\{[^}]+\}$/, "");

  return {
    resourcePath: strippedPath,
    service,
    modelSlug,
    fileName,
    displayName,
    basePath,
    idPath,
    createPath: paths?.createPath ?? basePath,
    createMethod: paths?.createHttpMethod ?? "POST",
    listPath: paths?.listPath ?? null,
    readBasePath: stripIdParam(paths?.readPath ?? idPath),
    hasIndividualRead: paths?.hasIndividualRead ?? true,
    updateBasePath: hasUpdate
      ? stripIdParam(paths?.updatePath ?? idPath)
      : null,
    deleteBasePath: deleteOp ? stripIdParam(paths?.deletePath ?? idPath) : null,
    createProperties: createProps,
    updateProperties: updateProps,
    resourceProperties: responseProps,
    createRequiredProperties: createRequiredFor(
      createRequired,
      createProps,
      parentParams,
    ),
    handlers: {
      create: true,
      read: true,
      update: hasUpdate,
      delete: !!deleteOp,
    },
    updateMethod,
    identifyingField,
    idParam,
    namingField,
    syntheticName,
    createOnlyProperties,
    paginationStyle,
    paginationCursorParam,
    parentParams,
    bodyTransform: "none",
    responseUnwrapKey: detectResponseUnwrapKey(postOp, spec),
    createResponseStyle: detectCreateResponseStyle(postOp, spec),
  };
}

function buildManualResource(
  manual: ManualResourceDef,
  createOp: OApiOperation,
  readOp: OApiOperation,
  updateOp: OApiOperation | undefined,
  deleteOp: OApiOperation | undefined,
  listOp: OApiOperation | undefined,
  spec: OApiSpec,
): VercelResource | null {
  const service = normalizeTagToService(manual.tag);

  // Extract create properties — use override, array body extraction, or standard
  let createProps: Record<string, VercelProperty>;
  let createRequired: string[];
  if (manual.overrideCreateProperties) {
    createProps = manual.overrideCreateProperties;
    createRequired = Object.keys(manual.overrideCreateProperties).filter(
      (k) => k === "key",
    );
  } else if (manual.arrayBody) {
    const result = extractArrayBodyItems(createOp, spec);
    createProps = result.properties;
    createRequired = result.required;
  } else {
    const result = extractRequestBody(createOp, spec);
    createProps = result.properties;
    createRequired = result.required;
  }
  if (Object.keys(createProps).length === 0) return null;

  // Extract update properties
  const hasUpdate = !!updateOp;
  const updateMethod: "PATCH" | "PUT" = (manual.updateMethod === "put")
    ? "PUT"
    : "PATCH";
  let updateProps: Record<string, VercelProperty> = {};
  if (hasUpdate) {
    const result = extractRequestBody(updateOp, spec);
    updateProps = result.properties;
  }

  // Extract response properties — for list-only resources (no individual GET),
  // prefer the create response (single item) over the list response (wrapper)
  const hasIndividualRead = /\/\{[^}]+\}$/.test(manual.readPath);
  let responseProps: Record<string, VercelProperty>;
  if (!hasIndividualRead) {
    const createResponseProps = extractResponseProperties(createOp, spec);
    responseProps = Object.keys(createResponseProps).length > 0
      ? createResponseProps
      : extractResponseProperties(readOp, spec);
  } else {
    responseProps = extractResponseProperties(readOp, spec);
  }
  if (!responseProps.id && !responseProps.uid && !responseProps.name) {
    responseProps.id = { type: "string", description: "Resource identifier" };
  }

  let identifyingField = IDENTIFIER_MAP[manual.idParam] ?? "id";
  if (!responseProps[identifyingField]) {
    const idCandidate = Object.keys(responseProps).find((k) =>
      k !== "teamId" && k !== "accountId" && k.endsWith("Id")
    );
    if (idCandidate) identifyingField = idCandidate;
  }
  const { field: namingField, synthetic: syntheticName } = resolveNamingField(
    createProps,
  );

  const createOnlyProperties = new Set<string>();
  if (hasUpdate && Object.keys(updateProps).length > 0) {
    for (const key of Object.keys(createProps)) {
      if (!(key in updateProps)) createOnlyProperties.add(key);
    }
  }

  const { style: paginationStyle, cursorParam: paginationCursorParam } =
    detectPagination(listOp);

  // Derive slug from the create path
  const strippedPath = stripVersionPrefix(manual.createPath);
  const pathSegments = strippedPath.split("/").filter((s) =>
    !s.startsWith("{")
  );
  const lastSegment = pathSegments[pathSegments.length - 1];
  const modelSlug = lastSegment.replace(/_/g, "-");
  const fileName = `${lastSegment.replace(/-/g, "_")}.ts`;
  const displayName = lastSegment
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    resourcePath: strippedPath,
    service,
    modelSlug,
    fileName,
    displayName,
    basePath: manual.createPath,
    idPath: manual.readPath,
    createPath: manual.createPath,
    createMethod: manual.createMethod === "put"
      ? "PUT"
      : manual.createMethod === "patch"
      ? "PATCH"
      : "POST",
    listPath: manual.listPath,
    readBasePath: manual.readPath.replace(/\/\{[^}]+\}$/, ""),
    hasIndividualRead: /\/\{[^}]+\}$/.test(manual.readPath),
    updateBasePath: manual.updatePath
      ? manual.updatePath.replace(/\/\{[^}]+\}$/, "")
      : null,
    deleteBasePath: manual.deletePath
      ? manual.deletePath.replace(/\/\{[^}]+\}$/, "")
      : null,
    createProperties: createProps,
    updateProperties: updateProps,
    resourceProperties: responseProps,
    createRequiredProperties: createRequiredFor(
      createRequired,
      createProps,
      manual.parentParams ?? [],
    ),
    handlers: {
      create: true,
      read: true,
      update: hasUpdate,
      delete: !!deleteOp,
    },
    updateMethod,
    identifyingField,
    idParam: manual.idParam,
    namingField,
    syntheticName,
    createOnlyProperties,
    paginationStyle,
    paginationCursorParam,
    parentParams: manual.parentParams ?? [],
    bodyTransform: manual.bodyTransform ?? "none",
    responseUnwrapKey: detectResponseUnwrapKey(createOp, spec),
    createResponseStyle: detectCreateResponseStyle(createOp, spec),
  };
}

function resolveNamingField(
  createProps: Record<string, VercelProperty>,
): { field: string; synthetic: boolean } {
  if (createProps.name) return { field: "name", synthetic: false };
  if (createProps.label) return { field: "label", synthetic: false };
  if (createProps.description) {
    return { field: "description", synthetic: false };
  }
  return { field: "name", synthetic: true };
}

/**
 * Detect if the create response is wrapped in a single-key envelope like {domain: {...}}.
 * Returns the key name if found, null otherwise.
 */
function detectResponseUnwrapKey(
  createOp: OApiOperation | undefined,
  spec: OApiSpec,
): string | null {
  if (!createOp?.responses) return null;
  const resp = createOp.responses["200"] ?? createOp.responses["201"];
  if (!resp) return null;
  const content = resp.content?.["application/json"];
  if (!content?.schema) return null;

  const schema = resolveSchema(content.schema, spec);
  if (!schema.properties) return null;

  const propNames = Object.keys(schema.properties);

  // Single-key envelope: exactly one property that is an object with its own properties
  // Examples: {domain: {...}}, {store: {...}}, {repository: {...}}
  // Exclude common non-wrapper patterns: {id, ...}, {created, failed}, {envs, ...}
  if (propNames.length === 1) {
    const key = propNames[0];
    const propSchema = resolveSchema(schema.properties[key], spec);
    if (
      propSchema.properties && Object.keys(propSchema.properties).length > 2
    ) {
      return key;
    }
  }

  return null;
}

/**
 * Detect if the create response uses a batch style like {created: [...], failed: [...]}.
 */
function detectCreateResponseStyle(
  createOp: OApiOperation | undefined,
  spec: OApiSpec,
): "direct" | "batchFirst" {
  if (!createOp?.responses) return "direct";
  const resp = createOp.responses["200"] ?? createOp.responses["201"];
  if (!resp) return "direct";
  const content = resp.content?.["application/json"];
  if (!content?.schema) return "direct";

  const schema = resolveSchema(content.schema, spec);
  if (!schema.properties) return "direct";

  // Check for {created: [...], failed: [...]} pattern
  if (schema.properties.created && schema.properties.failed) {
    return "batchFirst";
  }

  return "direct";
}

function detectPagination(
  getOp: OApiOperation | undefined,
): { style: "cursor" | "none"; cursorParam: "until" | "next" | null } {
  if (!getOp?.parameters) return { style: "none", cursorParam: null };
  const queryParams = (getOp.parameters ?? [])
    .filter((p) => !p.in || p.in === "query")
    .map((p) => p.name);
  if (queryParams.includes("until")) {
    return { style: "cursor", cursorParam: "until" };
  }
  if (
    queryParams.includes("next") || queryParams.includes("cursor")
  ) {
    return { style: "cursor", cursorParam: "next" };
  }
  return { style: "none", cursorParam: null };
}

// --- Schema extraction ---

function extractRequestBody(
  operation: OApiOperation | undefined,
  spec: OApiSpec,
): { properties: Record<string, VercelProperty>; required: string[] } {
  const body = operation?.requestBody;
  if (!body) return { properties: {}, required: [] };

  const content = body.content?.["application/json"];
  if (!content?.schema) return { properties: {}, required: [] };

  const flattened = flattenSchema(content.schema, spec);
  if (!flattened.properties || Object.keys(flattened.properties).length === 0) {
    return { properties: {}, required: [] };
  }

  const properties: Record<string, VercelProperty> = {};
  for (const [name, propSchema] of Object.entries(flattened.properties)) {
    properties[name] = normalizeProperty(propSchema, spec);
  }

  return {
    properties,
    required: flattened.required ?? [],
  };
}

/**
 * Extract properties from an array request body by looking at the items schema.
 * Used for endpoints like team member invites where POST body is an array of objects.
 */
function extractArrayBodyItems(
  operation: OApiOperation | undefined,
  spec: OApiSpec,
): { properties: Record<string, VercelProperty>; required: string[] } {
  const body = operation?.requestBody;
  if (!body) return { properties: {}, required: [] };

  const content = body.content?.["application/json"];
  if (!content?.schema) return { properties: {}, required: [] };

  const resolved = resolveSchema(content.schema, spec);
  if (resolved.type !== "array" || !resolved.items) {
    return extractRequestBody(operation, spec);
  }

  const itemSchema = resolveSchema(resolved.items, spec);
  const flattened = flattenSchema(itemSchema, spec);
  if (!flattened.properties || Object.keys(flattened.properties).length === 0) {
    return { properties: {}, required: [] };
  }

  const properties: Record<string, VercelProperty> = {};
  for (const [name, propSchema] of Object.entries(flattened.properties)) {
    properties[name] = normalizeProperty(propSchema, spec);
  }

  return {
    properties,
    required: flattened.required ?? [],
  };
}

function flattenSchema(schema: OApiSchema, spec: OApiSpec): OApiSchema {
  if (!schema || typeof schema !== "object") return {};

  const resolved = resolveSchema(schema, spec);

  if (resolved.properties) return resolved;

  if (resolved.anyOf || resolved.oneOf) {
    const branches = resolved.anyOf ?? resolved.oneOf!;
    return flattenDisjunction(branches, spec);
  }

  return resolved;
}

function flattenDisjunction(
  branches: OApiSchema[],
  spec: OApiSpec,
): OApiSchema {
  const allProps: Record<string, OApiSchema> = {};
  const requiredSets: Set<string>[] = [];

  for (const branch of branches) {
    // Skip null-type branches (nullable markers)
    if (branch.type === "null") continue;

    const flattened = flattenSchema(branch, spec);
    if (flattened.properties) {
      for (const [key, val] of Object.entries(flattened.properties)) {
        if (!allProps[key]) {
          allProps[key] = val;
        }
      }
    }
    if (flattened.required) {
      requiredSets.push(new Set(flattened.required));
    }
  }

  let required: string[] = [];
  if (requiredSets.length > 0) {
    const intersection = new Set(requiredSets[0]);
    for (let i = 1; i < requiredSets.length; i++) {
      for (const field of intersection) {
        if (!requiredSets[i].has(field)) {
          intersection.delete(field);
        }
      }
    }
    required = [...intersection];
  }

  if (Object.keys(allProps).length === 0) return {};

  return { properties: allProps, required, type: "object" };
}

function extractResponseProperties(
  operation: OApiOperation | undefined,
  spec: OApiSpec,
): Record<string, VercelProperty> {
  const responses = operation?.responses;
  if (!responses) return {};

  const responseObj = responses["200"] ?? responses["201"];
  if (!responseObj) return {};

  const content = responseObj.content?.["application/json"];
  if (!content?.schema) return {};

  const schema = resolveSchema(content.schema, spec);

  // Vercel has no response envelope — resource properties are at the top level
  if (schema.properties) {
    return normalizeProperties(schema, spec);
  }

  return {};
}

function normalizeProperties(
  schema: OApiSchema,
  spec: OApiSpec,
): Record<string, VercelProperty> {
  const result: Record<string, VercelProperty> = {};
  for (const [name, propSchema] of Object.entries(schema.properties ?? {})) {
    result[name] = normalizeProperty(propSchema, spec);
  }
  return result;
}

// --- Schema resolution ---

function resolveSchema(schema: OApiSchema, spec: OApiSpec): OApiSchema {
  if (!schema || typeof schema !== "object") return schema ?? {};

  if (schema.$ref) {
    const refPath = schema.$ref.replace(/^#\//, "").split("/");
    let current: unknown = spec;
    for (const segment of refPath) {
      current = (current as Record<string, unknown>)?.[segment];
    }
    return current ? resolveSchema(current as OApiSchema, spec) : {};
  }

  if (schema.allOf) {
    return mergeAllOf(schema.allOf, spec);
  }

  return schema;
}

function mergeAllOf(allOf: OApiSchema[], spec: OApiSpec): OApiSchema {
  const merged: OApiSchema = {};
  for (const item of allOf) {
    const resolved = resolveSchema(item, spec);
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

function normalizeProperty(
  schema: OApiSchema,
  spec: OApiSpec,
  visited: WeakSet<object> = new WeakSet(),
): VercelProperty {
  if (!schema || typeof schema !== "object") {
    return { type: "string" };
  }

  if (visited.has(schema)) {
    return { type: "object" };
  }
  visited.add(schema);

  const resolved = resolveSchema(schema, spec);
  if (
    resolved !== schema && typeof resolved === "object" && resolved !== null
  ) {
    if (visited.has(resolved)) {
      return { type: "object" };
    }
    visited.add(resolved);
  }

  // Handle oneOf — pick the first non-null variant
  if (resolved.oneOf) {
    for (const variant of resolved.oneOf) {
      const resolvedVariant = resolveSchema(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeProperty(resolvedVariant, spec, visited);
      }
    }
    return { type: "string", description: resolved.description };
  }

  // Handle anyOf similarly
  if (resolved.anyOf) {
    for (const variant of resolved.anyOf) {
      const resolvedVariant = resolveSchema(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeProperty(resolvedVariant, spec, visited);
      }
    }
    return { type: "string", description: resolved.description };
  }

  const type = resolved.type ?? "string";

  const prop: VercelProperty = {
    type: (type === "integer" ? "integer" : type) as VercelProperty["type"],
    description: resolved.description,
  };

  if (type === "string") {
    if (resolved.enum) prop.enum = resolved.enum;
    if (resolved.minLength !== undefined) prop.minLength = resolved.minLength;
    if (resolved.maxLength !== undefined) prop.maxLength = resolved.maxLength;
    if (resolved.pattern) prop.pattern = resolved.pattern;
    if (resolved.format) prop.format = resolved.format;
  }

  if (type === "number" || type === "integer") {
    if (resolved.enum) prop.enum = resolved.enum;
    if (resolved.minimum !== undefined) prop.minimum = resolved.minimum;
    if (resolved.maximum !== undefined) prop.maximum = resolved.maximum;
  }

  if (type === "array" && resolved.items) {
    const itemResolved = resolveSchema(resolved.items, spec);
    prop.items = normalizeProperty(itemResolved, spec, visited);
  }

  if (type === "object" && resolved.properties) {
    prop.properties = {};
    for (const [name, childSchema] of Object.entries(resolved.properties)) {
      prop.properties[name] = normalizeProperty(childSchema, spec, visited);
    }
    if (resolved.required && Array.isArray(resolved.required)) {
      prop.requiredProperties = resolved.required;
    }
  }

  return prop;
}
