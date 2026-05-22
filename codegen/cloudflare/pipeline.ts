// Cloudflare provider pipeline — schema fetching and model generation
// Fetches the OpenAPI spec, dereferences $refs, parses endpoints,
// groups by service, extracts CRUD operations, and generates extension models.

import $RefParser from "@apidevtools/json-schema-ref-parser";
import { dirname } from "@std/path";
import { generateCloudflareExtensionModel } from "./extensionModelGenerator.ts";
import { generateCloudflareLibFile } from "./libGenerator.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateCloudflareDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateCloudflareReadme } from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";

const CLOUDFLARE_SPEC_URL =
  "https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json";

// --- Public types ---

export interface CloudflareProperty {
  type: "string" | "number" | "integer" | "boolean" | "array" | "object";
  description?: string;
  enum?: (string | number)[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  items?: CloudflareProperty;
  properties?: Record<string, CloudflareProperty>;
  requiredProperties?: string[];
  format?: string;
}

export type CloudflareScope = "account" | "zone" | "both";

export interface CloudflareResource {
  /** Path segment after scope prefix, e.g., "dns_records", "d1/database" */
  resourcePath: string;
  /** Normalized service name for packaging, e.g., "dns", "d1" */
  service: string;
  /** Slug for model type, e.g., "dns-records", "database" */
  modelSlug: string;
  /** File name, e.g., "dns_records.ts", "database.ts" */
  fileName: string;
  /** Display name, e.g., "DNS Record", "Database" */
  displayName: string;
  /** Whether resource is account-scoped, zone-scoped, or both */
  scope: CloudflareScope;
  /** Full base path template, e.g., "/zones/{zone_id}/dns_records" */
  basePath: string;
  /** Full ID path template, e.g., "/zones/{zone_id}/dns_records/{dns_record_id}" */
  idPath: string;
  /** Properties from POST body (create) */
  createProperties: Record<string, CloudflareProperty>;
  /** Properties from PATCH/PUT body (update) — may be empty */
  updateProperties: Record<string, CloudflareProperty>;
  /** Properties from GET response (resource state) */
  resourceProperties: Record<string, CloudflareProperty>;
  /** Required properties for create */
  requiredProperties: string[];
  /** Available CRUD handlers */
  handlers: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  /** HTTP method for update: "PATCH" or "PUT" */
  updateMethod: "PATCH" | "PUT";
  /** Field name in API response that holds the unique ID, e.g., "id" */
  identifyingField: string;
  /** Path parameter name for the resource ID, e.g., "dns_record_id" */
  idParam: string;
  /** Field used to derive instance names (e.g., "name") */
  namingField: string;
  /** Whether the naming field is synthetic (injected, not in the API) */
  syntheticName: boolean;
  /** Properties only valid at create time (not in update body) */
  createOnlyProperties: Set<string>;
  /** Pagination style detected from GET list endpoint */
  paginationStyle: "page" | "cursor" | "none";
}

export interface CloudflareGeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface CloudflareModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface CloudflareServiceResult {
  serviceName: string;
  models: CloudflareGeneratedFile[];
  libFile: CloudflareGeneratedFile;
  manifest: CloudflareGeneratedFile;
  readmeFile: CloudflareGeneratedFile;
  licenseFile: CloudflareGeneratedFile;
  denoConfigFile: CloudflareGeneratedFile;
  modelChanges: CloudflareModelChange[];
  hasChanges: boolean;
}

export interface CloudflareGenerationResult {
  datePrefix: string;
  services: Map<string, CloudflareServiceResult>;
  skipped: { path: string; reason: string }[];
  errors: string[];
}

// --- Configuration tables ---

/** Maps path segments to normalized service names for per-service packaging. */
const SERVICE_MAP: Record<string, string> = {
  dns_records: "dns",
  dns_firewall: "dns",
  dns_settings: "dns",
  dnssec: "dns",
  dns_analytics: "dns",
  cfd_tunnel: "tunnel",
  warp_connector: "tunnel",
  tunnels: "tunnel",
  storage: "workers-kv",
  load_balancers: "load-balancing",
  healthchecks: "load-balancing",
  waiting_rooms: "waiting-rooms",
  pagerules: "page-rules",
  ssl: "ssl",
  custom_certificates: "ssl",
  keyless_certificates: "ssl",
  origin_tls_client_auth: "ssl",
  client_certificates: "ssl",
  custom_csrs: "ssl",
  acm: "ssl",
  custom_hostnames: "custom-hostnames",
  filters: "firewall",
  rate_limits: "firewall",
  settings: "zone-settings",
  snippets: "snippets",
  custom_pages: "custom-pages",
};

/** Maps path parameter names to the field name in the API response. */
const IDENTIFIER_MAP: Record<string, string> = {
  id: "id",
  identifier: "id",
  rule_id: "id",
  certificate_id: "id",
  policy_id: "id",
  tunnel_id: "id",
  dns_record_id: "id",
  group_id: "id",
  app_id: "id",
  member_id: "id",
  job_id: "id",
  entry_id: "id",
  event_id: "id",
  lock_downs_id: "id",
  filter_id: "id",
  target_id: "id",
  scan_id: "id",
  version_id: "id",
  dataset_id: "id",
  profile_id: "id",
  suppression_id: "id",
  operation_id: "id",
  connector_id: "id",
  config_id: "id",
  test_id: "id",
  session_id: "id",
  token_id: "id",
  item_id: "id",
  prefix_id: "id",
  user_id: "id",
  monitor_id: "id",
  pool_id: "id",
  address_map_id: "id",
  queue_id: "id",
  database_id: "id",
  gateway_id: "id",
  store_id: "id",
  waiting_room_id: "id",
  healthcheck_id: "id",
  pagerule_id: "id",
  custom_certificate_id: "id",
  keyless_certificate_id: "id",
  custom_hostname_id: "id",
  client_certificate_id: "id",
  custom_csr_id: "id",
  load_balancer_id: "id",
  report_id: "id",
  detection_id: "id",
  cookie_id: "id",
  connection_id: "id",
  rate_limit_id: "id",
  custom_page_id: "id",
  ruleset_id: "id",
  account_identifier: "id",
  zone_identifier: "id",
  // Name-based identifiers
  bucket_name: "name",
  script_name: "name",
  index_name: "name",
  dispatch_namespace: "name",
  snippet_name: "name",
  asset_name: "name",
};

/** Path prefixes excluded from resource discovery. */
const SKIP_TOP_LEVEL: string[] = [
  "/radar",
  "/internal",
  "/user",
  "/organizations",
  "/memberships",
  "/ips",
  "/certificates",
  "/live",
  "/accounts/move",
];

/** Specific resource paths excluded from codegen. */
const SKIP_RESOURCES: string[] = [
  "/accounts/{account_id}/ai/run/",
  "/accounts/{account_id}/ai/finetunes",
  "/accounts/{account_id}/ai/tomarkdown",
  "/accounts/{account_id}/stream",
  "/accounts/{account_id}/rulesets",
  "/zones/{zone_id}/rulesets",
  "/accounts/{account_id}/realtime/kit/",
  "/accounts/{account_id}/workers/scripts/{script_name}/versions",
  "/accounts/{account_id}/scim/",
  "/zones/{zone_id}/schema_validation/schemas",
  "/zones/{zone_id}/token_validation/",
];

// --- Model generation ---

export async function generateCloudflareModels(options: {
  services?: string[];
  outputDir: string;
  schemaPath?: string;
}): Promise<CloudflareGenerationResult> {
  const schemaPath = options.schemaPath ??
    new URL("../schemas/cloudflare.json", import.meta.url).pathname;

  console.log(`Loading Cloudflare schema from ${schemaPath}...`);
  const specText = await Deno.readTextFile(schemaPath);
  const spec = JSON.parse(specText);

  const { resources, skipped } = parseResources(spec);
  console.log(
    `Parsed ${resources.length} resources, skipped ${skipped.length}`,
  );

  // Group resources by service
  const serviceResources = new Map<string, CloudflareResource[]>();
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

  const services = new Map<string, CloudflareServiceResult>();
  const errors: string[] = [];

  for (const [serviceName, svcResources] of serviceResources) {
    const extensionName = `@swamp/cloudflare/${serviceName}`;
    const placeholderVersion = "VERSION_PLACEHOLDER";
    const serviceOutputDir = `${options.outputDir}/cloudflare/${serviceName}`;

    const models: CloudflareGeneratedFile[] = [];
    const modelChanges: CloudflareModelChange[] = [];
    let hasChanges = false;

    for (const resource of svcResources) {
      try {
        // Generate candidate code with placeholder version for change detection
        const candidateCode = generateCloudflareExtensionModel({
          resource,
          extensionName,
          version: placeholderVersion,
        });

        const filePath = `extensions/models/${resource.fileName}`;

        // Compute version via content comparison
        const { version, status, existingContent } = await computeModelVersion(
          serviceOutputDir,
          filePath,
          datePrefix,
          candidateCode,
          placeholderVersion,
        );

        if (status !== "unchanged") hasChanges = true;

        // Compute upgrades block for changed/new models
        const newFieldNames = Object.keys(resource.createProperties);
        const upgradesBlock = computeUpgradesBlock(
          status,
          version,
          existingContent,
          newFieldNames,
        );

        // Generate final code with real version
        const finalCode = generateCloudflareExtensionModel({
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
    const libCode = generateCloudflareLibFile();
    const libFile: CloudflareGeneratedFile = {
      filePath: "extensions/models/_lib/cloudflare.ts",
      sourceCode: libCode,
    };

    // Check if README/LICENSE changed (compare with disk)
    const firstSlug = svcResources[0]?.modelSlug ?? serviceName;
    const firstType = `${extensionName}/${firstSlug}`;
    const readmeCode = generateCloudflareReadme(
      serviceName,
      extensionName,
      firstSlug,
      firstType,
    );
    const readmePath = `${serviceOutputDir}/README.md`;
    try {
      const existingReadme = await Deno.readTextFile(readmePath);
      if (existingReadme !== readmeCode) hasChanges = true;
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

    // Compute manifest
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
      description: `Cloudflare ${serviceName} infrastructure models`,
      labels: ["cloudflare", serviceName, "cloud", "infrastructure"],
      modelFiles: modelFileNames,
      additionalFiles: ["LICENSE.txt", "README.md"],
      releaseNotes: releaseNotes || undefined,
      repository: "https://github.com/systeminit/swamp-extensions",
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
      description: `Cloudflare ${serviceName} infrastructure models`,
      labels: ["cloudflare", serviceName, "cloud", "infrastructure"],
      modelFiles: modelFileNames,
      additionalFiles: ["LICENSE.txt", "README.md"],
      releaseNotes: releaseNotes || undefined,
      repository: "https://github.com/systeminit/swamp-extensions",
      platforms: [],
    });

    const denoConfigCode = generateCloudflareDenoConfig();

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

export async function fetchCloudflareSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/cloudflare.json", import.meta.url).pathname;

  console.log("Fetching Cloudflare OpenAPI spec...");
  console.log(`  Source: ${CLOUDFLARE_SPEC_URL}`);

  const response = await fetch(CLOUDFLARE_SPEC_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download spec: ${response.status} ${response.statusText}`,
    );
  }

  const jsonText = await response.text();

  // Save raw JSON to a temp file for $ref resolution
  const tmpJson = await Deno.makeTempFile({ suffix: ".json" });
  try {
    await Deno.writeTextFile(tmpJson, jsonText);

    console.log("Dereferencing $refs (226 circular refs in spec)...");
    const dereferenced = await $RefParser.dereference(tmpJson);

    const outputDir = dirname(outputPath);
    await Deno.mkdir(outputDir, { recursive: true });

    // The dereferenced spec has shared $ref targets (same JS object referenced
    // from multiple locations) AND true circular references. We must distinguish
    // between the two: shared refs should be serialized fully each time (to
    // preserve property info), while true cycles must be cut.
    //
    // Strategy: track ancestors (objects on the current serialization path).
    // Only mark as [Circular] when re-encountering an ancestor (a true cycle).
    // Shared refs encountered in sibling branches are serialized normally.
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

/**
 * Serialize a dereferenced OpenAPI spec to JSON, correctly handling both
 * shared $ref targets (same JS object from multiple locations) and true
 * circular references. Uses ancestor tracking so shared refs are serialized
 * fully while true cycles are replaced with "[Circular]".
 */
function serializeWithCycleDetection(
  root: unknown,
): string {
  const ancestors = new Set<object>();

  function serialize(value: unknown): unknown {
    if (value === null || typeof value !== "object") return value;

    const obj = value as object;

    if (ancestors.has(obj)) return "[Circular]";

    ancestors.add(obj);

    let result: unknown;
    if (Array.isArray(obj)) {
      result = obj.map((item) => serialize(item));
    } else {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = serialize(v);
      }
      result = out;
    }

    ancestors.delete(obj);
    return result;
  }

  return JSON.stringify(serialize(root), null, 2);
}

// --- OpenAPI parsing ---

// deno-lint-ignore no-explicit-any
type Spec = any;

/**
 * Parse the Cloudflare OpenAPI spec, group endpoints by service,
 * and extract resource definitions.
 */
export function parseResources(spec: Spec): {
  resources: CloudflareResource[];
  skipped: { path: string; reason: string }[];
} {
  const paths: Record<string, Record<string, Spec>> = spec.paths ?? {};
  const skipped: { path: string; reason: string }[] = [];

  // Group paths into base+ID endpoint pairs
  const candidates = new Map<
    string,
    { basePath: string; idPath: string; idParam: string }
  >();

  for (const path of Object.keys(paths)) {
    // Skip excluded prefixes
    if (shouldSkipPath(path)) {
      continue;
    }

    // Check if this is an ID path (terminal segment is {param})
    const segments = path.split("/");
    const lastSeg = segments[segments.length - 1];
    if (!lastSeg.startsWith("{") || !lastSeg.endsWith("}")) continue;

    const basePath = segments.slice(0, -1).join("/");
    if (!paths[basePath]) continue;

    const idParam = lastSeg.slice(1, -1);

    // Count {param} segments (excluding scope params like account_id/zone_id)
    const innerParams = segments.filter(
      (s) =>
        s.startsWith("{") &&
        s.endsWith("}") &&
        !isScopeParam(s.slice(1, -1)),
    );
    if (innerParams.length > 1) {
      skipped.push({
        path,
        reason: "nested sub-resource (>1 non-scope param)",
      });
      continue;
    }

    candidates.set(basePath, { basePath, idPath: path, idParam });
  }

  const resources: CloudflareResource[] = [];

  for (const [basePath, { idPath, idParam }] of candidates) {
    const baseMethods = paths[basePath];
    const idMethods = paths[idPath];

    // Require POST on base (create) and GET on ID path (read)
    if (!baseMethods.post) {
      skipped.push({ path: basePath, reason: "no POST (create)" });
      continue;
    }
    if (!idMethods.get) {
      skipped.push({ path: basePath, reason: "no GET on ID path (read)" });
      continue;
    }

    // Check for empty POST body
    const postContent = baseMethods.post.requestBody?.content
      ?.["application/json"];
    if (!postContent?.schema || Object.keys(postContent.schema).length === 0) {
      // Check for multipart or non-JSON
      const contentTypes = Object.keys(
        baseMethods.post.requestBody?.content ?? {},
      );
      if (contentTypes.length === 0) {
        skipped.push({ path: basePath, reason: "empty POST body" });
        continue;
      }
      if (!contentTypes.includes("application/json")) {
        skipped.push({
          path: basePath,
          reason: `non-JSON POST content: ${contentTypes.join(", ")}`,
        });
        continue;
      }
      skipped.push({ path: basePath, reason: "empty JSON POST schema" });
      continue;
    }

    const resource = buildResource(basePath, idPath, idParam, paths, spec);
    if (resource) {
      resources.push(resource);
    } else {
      skipped.push({ path: basePath, reason: "failed to extract resource" });
    }
  }

  // Merge dual-scoped resources (same service + fileName at both scopes)
  const merged = mergeDualScopedResources(resources);

  return {
    resources: merged.sort((a, b) =>
      `${a.service}/${a.resourcePath}`.localeCompare(
        `${b.service}/${b.resourcePath}`,
      )
    ),
    skipped,
  };
}

/**
 * Merge resources that exist at both account and zone scope into
 * a single resource with scope="both". The account-scoped version
 * is kept as the base, with scope changed to "both".
 */
function mergeDualScopedResources(
  resources: CloudflareResource[],
): CloudflareResource[] {
  const byKey = new Map<string, CloudflareResource[]>();
  for (const r of resources) {
    const key = `${r.service}/${r.fileName}`;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)!.push(r);
  }

  const result: CloudflareResource[] = [];
  for (const [_key, group] of byKey) {
    if (group.length === 1) {
      result.push(group[0]);
      continue;
    }

    // Check if we have both account and zone scoped versions
    const accountVersion = group.find((r) => r.scope === "account");
    const zoneVersion = group.find((r) => r.scope === "zone");

    if (accountVersion && zoneVersion) {
      // Merge: use account version as base, set scope to "both"
      result.push({
        ...accountVersion,
        scope: "both",
      });
    } else {
      // Multiple resources at same scope (e.g., magic/rules.ts from different sub-paths)
      // Keep only the first to avoid filename collisions; suffix the rest
      for (let i = 0; i < group.length; i++) {
        if (i === 0) {
          result.push(group[i]);
        } else {
          // Disambiguate by adding a path-based suffix
          const pathParts = group[i].resourcePath.split("/");
          const suffix = pathParts.length > 2
            ? pathParts[pathParts.length - 2]
            : `v${i + 1}`;
          const newFileName = group[i].fileName.replace(".ts", `_${suffix}.ts`);
          const newSlug = group[i].modelSlug + `-${suffix}`;
          result.push({
            ...group[i],
            fileName: newFileName,
            modelSlug: newSlug,
          });
        }
      }
    }
  }

  return result;
}

function shouldSkipPath(path: string): boolean {
  for (const prefix of SKIP_TOP_LEVEL) {
    if (path.startsWith(prefix)) return true;
  }
  for (const pattern of SKIP_RESOURCES) {
    if (path.startsWith(pattern)) return true;
  }
  return false;
}

function isScopeParam(param: string): boolean {
  return [
    "account_id",
    "account_identifier",
    "zone_id",
    "zone_identifier",
  ].includes(param);
}

/**
 * Determine the scope (account/zone/both) and the resource path
 * from a full API path.
 */
function extractScopeAndPath(
  basePath: string,
): { scope: "account" | "zone" | "other"; resourcePath: string } {
  if (basePath.startsWith("/accounts/")) {
    // /accounts/{account_id}/rest/of/path
    const parts = basePath.split("/");
    const resourcePath = parts.slice(3).join("/");
    return { scope: "account", resourcePath };
  }
  if (basePath.startsWith("/zones/")) {
    const parts = basePath.split("/");
    const resourcePath = parts.slice(3).join("/");
    return { scope: "zone", resourcePath };
  }
  return { scope: "other", resourcePath: basePath };
}

/**
 * Derive the service name from a resource path.
 * Account-scoped: first segment of the resource path.
 * Zone-scoped: uses SERVICE_MAP or the first segment.
 */
function deriveService(
  resourcePath: string,
  scope: "account" | "zone" | "other",
): string {
  const firstSegment = resourcePath.split("/")[0];

  // Check SERVICE_MAP first (works for both scopes)
  if (SERVICE_MAP[firstSegment]) {
    return SERVICE_MAP[firstSegment];
  }

  // For account-scoped paths, the first segment is naturally the service
  if (scope === "account") {
    return firstSegment.replace(/_/g, "-");
  }

  // For zone-scoped paths without a SERVICE_MAP entry,
  // use the segment as-is with underscores replaced by hyphens
  return firstSegment.replace(/_/g, "-");
}

/**
 * Build a CloudflareResource from base and ID paths.
 */
function buildResource(
  basePath: string,
  idPath: string,
  idParam: string,
  paths: Record<string, Record<string, Spec>>,
  spec: Spec,
): CloudflareResource | null {
  const baseMethods = paths[basePath];
  const idMethods = paths[idPath];

  const { scope, resourcePath } = extractScopeAndPath(basePath);
  if (scope === "other") return null;

  const service = deriveService(resourcePath, scope);

  // Extract properties from POST body
  const { properties: createProps, required: createRequired } =
    extractRequestBody(baseMethods.post, spec);
  if (Object.keys(createProps).length === 0) return null;

  // Extract properties from PATCH/PUT body
  const hasUpdate = !!(idMethods.patch || idMethods.put);
  const updateMethod: "PATCH" | "PUT" = idMethods.patch ? "PATCH" : "PUT";
  let updateProps: Record<string, CloudflareProperty> = {};
  if (hasUpdate) {
    const updateOp = idMethods.patch ?? idMethods.put;
    const result = extractRequestBody(updateOp, spec);
    updateProps = result.properties;
  }

  // Extract properties from GET response (with envelope unwrapping)
  const responseProps = extractResponseProperties(idMethods.get, spec);

  // Ensure `id` is present in resource properties
  if (!responseProps.id) {
    responseProps.id = { type: "string", description: "Resource identifier" };
  }

  // Resolve identifying field from path parameter
  const identifyingField = IDENTIFIER_MAP[idParam] ?? "id";

  // Resolve naming field
  const { field: namingField, synthetic: syntheticName } = resolveNamingField(
    createProps,
  );

  // Detect create-only properties
  const createOnlyProperties = new Set<string>();
  if (hasUpdate && Object.keys(updateProps).length > 0) {
    for (const key of Object.keys(createProps)) {
      if (!(key in updateProps)) {
        createOnlyProperties.add(key);
      }
    }
  }

  // Detect pagination style from the list GET on basePath
  const paginationStyle = detectPagination(baseMethods.get);

  // Build slug from the last segment of the resource path
  const pathSegments = resourcePath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const modelSlug = lastSegment.replace(/_/g, "-");
  const fileName = `${lastSegment}.ts`;

  // Build display name
  const displayName = lastSegment
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    resourcePath,
    service,
    modelSlug,
    fileName,
    displayName,
    scope: scope as CloudflareScope,
    basePath,
    idPath,
    createProperties: createProps,
    updateProperties: updateProps,
    resourceProperties: responseProps,
    requiredProperties: createRequired,
    handlers: {
      create: true,
      read: true,
      update: hasUpdate,
      delete: !!idMethods.delete,
    },
    updateMethod,
    identifyingField,
    idParam,
    namingField,
    syntheticName,
    createOnlyProperties,
    paginationStyle,
  };
}

function resolveNamingField(
  createProps: Record<string, CloudflareProperty>,
): { field: string; synthetic: boolean } {
  if (createProps.name) return { field: "name", synthetic: false };
  if (createProps.label) return { field: "label", synthetic: false };
  if (createProps.description) {
    return { field: "description", synthetic: false };
  }
  return { field: "name", synthetic: true };
}

function detectPagination(
  getOp: Spec | undefined,
): "page" | "cursor" | "none" {
  if (!getOp?.parameters) return "none";
  const paramNames = (getOp.parameters as Spec[]).map(
    (p: Spec) => p.name as string,
  );
  if (paramNames.includes("cursor")) return "cursor";
  if (paramNames.includes("page")) return "page";
  return "none";
}

// --- Schema extraction ---

/**
 * Extract properties from a JSON request body schema.
 * Handles flat objects, allOf, and anyOf/oneOf compositions
 * (e.g., DNS records use anyOf[oneOf[allOf[shared, specific]]]).
 */
function extractRequestBody(
  operation: Spec,
  spec: Spec,
): { properties: Record<string, CloudflareProperty>; required: string[] } {
  const body = operation?.requestBody;
  if (!body) return { properties: {}, required: [] };

  const content = body.content?.["application/json"];
  if (!content?.schema) return { properties: {}, required: [] };

  const flattened = flattenSchema(content.schema, spec);
  if (!flattened.properties || Object.keys(flattened.properties).length === 0) {
    return { properties: {}, required: [] };
  }

  const properties: Record<string, CloudflareProperty> = {};
  for (const [name, propSchema] of Object.entries(flattened.properties)) {
    properties[name] = normalizeProperty(propSchema as Spec, spec);
  }

  return {
    properties,
    required: flattened.required ?? [],
  };
}

/**
 * Flatten a schema that may use anyOf/oneOf/allOf into a single
 * properties+required object by merging all branches.
 * For disjunctions (anyOf/oneOf), required uses intersection.
 */
function flattenSchema(schema: Spec, spec: Spec): Spec {
  if (!schema || typeof schema !== "object") return {};

  const resolved = resolveSchema(schema, spec);

  // Simple object with properties
  if (resolved.properties) return resolved;

  // anyOf or oneOf — merge all branch properties, intersect required
  if (resolved.anyOf || resolved.oneOf) {
    const branches = (resolved.anyOf ?? resolved.oneOf) as Spec[];
    return flattenDisjunction(branches, spec);
  }

  return resolved;
}

function flattenDisjunction(branches: Spec[], spec: Spec): Spec {
  const allProps: Record<string, Spec> = {};
  const requiredSets: Set<string>[] = [];

  for (const branch of branches) {
    const flattened = flattenSchema(branch, spec);
    if (flattened.properties) {
      for (const [key, val] of Object.entries(flattened.properties)) {
        if (!allProps[key]) {
          allProps[key] = val;
        }
      }
    }
    if (flattened.required) {
      requiredSets.push(new Set(flattened.required as string[]));
    }
  }

  // Intersect required — only fields required in every branch
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

/**
 * Extract resource properties from a GET response, unwrapping the
 * Cloudflare envelope (allOf[api-response-common, {result: ...}]).
 */
function extractResponseProperties(
  operation: Spec,
  spec: Spec,
): Record<string, CloudflareProperty> {
  const responses = operation?.responses;
  if (!responses) return {};

  const responseObj = responses["200"] ?? responses["201"];
  if (!responseObj) return {};

  const content = responseObj.content?.["application/json"];
  if (!content?.schema) return {};

  const schema = resolveSchema(content.schema, spec);

  // Try to extract `result` from the envelope pattern
  const resultSchema = extractResultFromEnvelope(schema, spec);
  if (resultSchema && resultSchema.properties) {
    return normalizeProperties(resultSchema, spec);
  }

  // Fallback: use top-level properties directly
  if (schema.properties) {
    return normalizeProperties(schema, spec);
  }

  return {};
}

/**
 * Extract the `result` property from Cloudflare's allOf envelope.
 * Pattern: allOf[{success, errors, messages}, {result: <resource>}]
 */
function extractResultFromEnvelope(
  schema: Spec,
  spec: Spec,
): Spec | null {
  // Direct `result` property
  if (schema.properties?.result) {
    const resultSchema = resolveSchema(schema.properties.result, spec);
    if (resultSchema.properties) return resultSchema;
    // result might be allOf itself
    if (resultSchema.allOf) {
      const merged = mergeAllOf(resultSchema.allOf, spec);
      if (merged.properties) return merged;
    }
    return null;
  }

  // allOf composition — look for the branch with `result`
  if (schema.allOf) {
    for (const branch of schema.allOf) {
      const resolved = resolveSchema(branch, spec);
      if (resolved.properties?.result) {
        const resultSchema = resolveSchema(resolved.properties.result, spec);
        if (resultSchema.properties) return resultSchema;
        if (resultSchema.allOf) {
          const merged = mergeAllOf(resultSchema.allOf, spec);
          if (merged.properties) return merged;
        }
      }
    }
    // Try merging all branches first, then look for result
    const merged = mergeAllOf(schema.allOf, spec);
    if (merged.properties?.result) {
      const resultSchema = resolveSchema(merged.properties.result, spec);
      if (resultSchema.properties) return resultSchema;
    }
  }

  return null;
}

function normalizeProperties(
  schema: Spec,
  spec: Spec,
): Record<string, CloudflareProperty> {
  const result: Record<string, CloudflareProperty> = {};
  for (const [name, propSchema] of Object.entries(schema.properties ?? {})) {
    result[name] = normalizeProperty(propSchema as Spec, spec);
  }
  return result;
}

// --- Schema resolution ---

/**
 * Resolve a schema, handling $ref, allOf, oneOf, anyOf.
 * The spec has already been dereferenced but allOf/oneOf/anyOf still
 * need flattening.
 */
function resolveSchema(schema: Spec, spec: Spec): Spec {
  if (!schema || typeof schema !== "object") return schema ?? {};

  if (schema.$ref) {
    const refPath = (schema.$ref as string).replace(/^#\//, "").split("/");
    let current: Spec = spec;
    for (const segment of refPath) {
      current = current?.[segment];
    }
    return current ? resolveSchema(current, spec) : {};
  }

  if (schema.allOf) {
    return mergeAllOf(schema.allOf, spec);
  }

  return schema;
}

function mergeAllOf(allOf: Spec[], spec: Spec): Spec {
  const merged: Spec = {};
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

/**
 * Normalize an OpenAPI property schema into CloudflareProperty.
 */
function normalizeProperty(schema: Spec, spec: Spec): CloudflareProperty {
  if (!schema || typeof schema !== "object") {
    return { type: "string" };
  }

  const resolved = resolveSchema(schema, spec);

  // Handle oneOf — pick the first non-null variant
  if (resolved.oneOf) {
    for (const variant of resolved.oneOf as Spec[]) {
      const resolvedVariant = resolveSchema(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeProperty(resolvedVariant, spec);
      }
    }
    return { type: "string", description: resolved.description };
  }

  // Handle anyOf similarly
  if (resolved.anyOf) {
    for (const variant of resolved.anyOf as Spec[]) {
      const resolvedVariant = resolveSchema(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeProperty(resolvedVariant, spec);
      }
    }
    return { type: "string", description: resolved.description };
  }

  const type = resolved.type ?? "string";

  const prop: CloudflareProperty = {
    type: type === "integer" ? "integer" : type,
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
    prop.items = normalizeProperty(itemResolved, spec);
  }

  if (type === "object" && resolved.properties) {
    prop.properties = {};
    for (const [name, childSchema] of Object.entries(resolved.properties)) {
      prop.properties[name] = normalizeProperty(childSchema as Spec, spec);
    }
    if (resolved.required && Array.isArray(resolved.required)) {
      prop.requiredProperties = resolved.required;
    }
  }

  return prop;
}
