// DigitalOcean model generation pipeline
// Fetches the OpenAPI spec (YAML), dereferences $refs, parses endpoints,
// groups by resource, extracts CRUD operations, and generates extension models.

import { dirname } from "@std/path";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import pluralize from "pluralize";
import { generateDigitalOceanExtensionModel } from "./extensionModelGenerator.ts";
import { generateDigitalOceanLibFile } from "./libGenerator.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateDigitalOceanDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateDigitalOceanReadme } from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";

const DO_SPEC_URL =
  "https://api-engineering.nyc3.cdn.digitaloceanspaces.com/spec-ci/DigitalOcean-public.v2.yaml";

// --- Pluralize configuration ---

const ACRONYMS = [
  "nfs",
  "vpc",
  "cdn",
  "api",
  "ssh",
  "ip",
  "ipv6",
  "uuid",
  "byoip",
];

// Mark acronyms as uncountable so pluralize doesn't mangle them
for (const acronym of ACRONYMS) {
  pluralize.addUncountableRule(acronym);
}
pluralize.addUncountableRule("kubernetes");

// Display name overrides
const NAME_OVERRIDES: Record<string, string> = {
  App: "App Platform",
  Registry: "Container Registry",
  Image: "Custom Image",
  Database: "Database Cluster",
  "Monitoring Alert": "Monitoring Alert Policy",
  "Account Key": "SSH Key",
  Certificate: "SSL Certificate",
};

// --- Identifier field mapping ---

const IDENTIFIER_MAP: Record<string, string> = {
  // Standard → "id"
  droplet_id: "id",
  volume_id: "id",
  firewall_id: "id",
  vpc_id: "id",
  certificate_id: "id",
  load_balancer_id: "id",
  cdn_id: "id",
  project_id: "id",
  database_cluster_uuid: "id",
  app_id: "id",
  snapshot_id: "id",
  image_id: "id",
  kubernetes_cluster_id: "id",
  space_id: "id",
  alert_id: "id",
  check_id: "id",
  custom_image_id: "id",
  node_pool_id: "id",
  registry_id: "id",
  key_id: "id",
  domain_record_id: "id",
  deployment_id: "id",
  // Name-based
  domain_name: "name",
  registry_name: "name",
  tag_id: "name",
  database_name: "name",
  pool_name: "name",
  replica_name: "name",
  topic_name: "name",
  username: "name",
  trigger_name: "name",
  // Field-named identifiers
  logsink_id: "sink_id",
  subject_name: "subject_name",
  // UUID-based
  alert_uuid: "uuid",
  workspace_uuid: "uuid",
  // IP-based
  floating_ip: "ip",
  reserved_ip: "ip",
};

// Endpoint-level overrides (path → identifier field)
const ENDPOINT_IDENTIFIER_OVERRIDES: Record<string, string> = {
  "/v2/apps/{id}": "id",
};

// Paths to skip at the top level
const SKIP_TOP_LEVEL = new Set(["add-ons", "gen-ai"]);

// Properties to exclude from create/update bodies.
// These are bulk-create alternatives that don't fit the single-resource model pattern.
const SKIP_PROPERTIES = new Set(["names"]);

// Additional required fields that can't be inferred from the schema.
// For example, droplet's "name" is required but the oneOf intersection misses it
// because branch 1 uses "names" (which is in SKIP_PROPERTIES).
const REQUIRED_FIELDS_OVERRIDES: Record<string, string[]> = {
  "/v2/droplets": ["name"],
};

// Readiness polling configuration for resources that have meaningful status transitions.
// Maps base endpoint path to readiness config.
// Curated from DigitalOcean API documentation — the OpenAPI spec does not
// include status enum values for most resources.
const READINESS_CONFIG: Record<
  string,
  { statusField: string; readyValues: string[]; failedValues: string[] }
> = {
  "/v2/droplets": {
    statusField: "status",
    readyValues: ["active"],
    failedValues: ["errored"],
  },
  "/v2/databases": {
    statusField: "status",
    readyValues: ["online"],
    failedValues: ["error"],
  },
  "/v2/load_balancers": {
    statusField: "status",
    readyValues: ["active"],
    failedValues: ["errored"],
  },
  "/v2/kubernetes/clusters": {
    statusField: "status.state",
    readyValues: ["running"],
    failedValues: ["error", "degraded"],
  },
};

// Child resource endpoints: nested CRUD collections under a parent resource.
// Keyed by collection path (the base path with one {param} in the middle).
// These paths would otherwise be skipped by the >1-param exclusion rule.
const CHILD_RESOURCE_ENDPOINTS = new Map<
  string,
  { parentParam: string; forceSyntheticName?: boolean }
>([
  ["/v2/databases/{database_cluster_uuid}/dbs", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/databases/{database_cluster_uuid}/logsink", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/databases/{database_cluster_uuid}/pools", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/databases/{database_cluster_uuid}/replicas", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/databases/{database_cluster_uuid}/schema-registry", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/databases/{database_cluster_uuid}/topics", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/databases/{database_cluster_uuid}/users", {
    parentParam: "database_cluster_uuid",
  }],
  ["/v2/domains/{domain_name}/records", {
    parentParam: "domain_name",
    forceSyntheticName: true,
  }],
  ["/v2/functions/namespaces/{namespace_id}/triggers", {
    parentParam: "namespace_id",
  }],
  ["/v2/kubernetes/clusters/{cluster_id}/node_pools", {
    parentParam: "cluster_id",
  }],
  ["/v2/uptime/checks/{check_id}/alerts", {
    parentParam: "check_id",
  }],
  ["/v2/apps/{app_id}/deployments", {
    parentParam: "app_id",
  }],
]);

// --- Public types ---

export interface DigitalOceanProperty {
  type: "string" | "number" | "integer" | "boolean" | "array" | "object";
  description?: string;
  enum?: (string | number)[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  items?: DigitalOceanProperty;
  properties?: Record<string, DigitalOceanProperty>;
  requiredProperties?: string[];
  format?: string;
  isRegion?: boolean;
  nullable?: boolean;
}

export interface DigitalOceanAction {
  /** Action type name, e.g. "rename", "resize" */
  actionType: string;
  /** Extra parameters beyond "type" */
  properties: Record<string, DigitalOceanProperty>;
  /** Required extra parameters */
  requiredProperties: string[];
  /** NFS pattern: params nested under "params" key */
  nestedParams: boolean;
}

export interface DigitalOceanSubResourceMethod {
  /** Method name, e.g. "resize", "eviction_policy" */
  methodName: string;
  /** Raw path segment, e.g. "resize", "online-migration" */
  subPath: string;
  /** HTTP method used for this sub-resource */
  httpMethod: "PUT" | "PATCH";
  /** Request body properties */
  properties: Record<string, DigitalOceanProperty>;
  /** Required request body properties */
  requiredProperties: string[];
}

export interface DigitalOceanResource {
  /** Display name, e.g., "Droplet", "Database Cluster" */
  displayName: string;
  /** Slug for model type, e.g., "droplet", "database-cluster" */
  modelSlug: string;
  /** File name, e.g., "droplet.ts", "database_cluster.ts" */
  fileName: string;
  /** API endpoint prefix, e.g., "/v2/droplets" */
  endpoint: string;
  /** Properties from POST body (create) */
  createProperties: Record<string, DigitalOceanProperty>;
  /** Properties from PATCH/PUT body (update) — may be empty */
  updateProperties: Record<string, DigitalOceanProperty>;
  /** Properties from GET response (resource state) */
  resourceProperties: Record<string, DigitalOceanProperty>;
  /** Required properties for create */
  requiredProperties: string[];
  /** Available CRUD handlers */
  handlers: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
  /** HTTP method for update: "PATCH" or "PUT" or null */
  updateMethod: "PATCH" | "PUT" | null;
  /** Field used to derive instance names (e.g., "name", "id", "ip") */
  identifyingField: string;
  /** Raw URL path parameter name (e.g., "droplet_id", "domain_name", "floating_ip") */
  idParam: string;
  /** Properties that are create-only (not in update) */
  createOnlyProperties: Set<string>;
  /** Resource actions (e.g. reboot, rename) from POST .../actions endpoints */
  actions: DigitalOceanAction[];
  /** Sub-resource update methods (e.g. resize, migrate) from PUT/PATCH .../sub_resource endpoints */
  subResourceMethods: DigitalOceanSubResourceMethod[];
  /** Discovery endpoint path, e.g. "/v2/kubernetes/options" — GET-only, returns available options */
  discoveryEndpoint?: string;
  /** Readiness polling config for post-create/update status checking */
  readiness?: {
    statusField: string;
    readyValues: string[];
    failedValues: string[];
  };
  /** Parent path parameter name for child resources (e.g., "domain_name") */
  parentParam?: string;
  /** Parent base endpoint for child resources (e.g., "/v2/domains") */
  parentEndpoint?: string;
  /** Force synthetic naming even if "name" exists in create properties */
  forceSyntheticName?: boolean;
}

export interface DigitalOceanGeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface DigitalOceanModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface DigitalOceanGenerationResult {
  version: string;
  models: DigitalOceanGeneratedFile[];
  libFile: DigitalOceanGeneratedFile;
  manifest: DigitalOceanGeneratedFile;
  readmeFile: DigitalOceanGeneratedFile;
  licenseFile: DigitalOceanGeneratedFile;
  denoConfigFile: DigitalOceanGeneratedFile;
  skipped: { path: string; reason: string }[];
  errors: string[];
  modelChanges: DigitalOceanModelChange[];
  hasChanges: boolean;
}

// --- Schema fetching ---

export async function fetchDigitalOceanSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/digitalocean.json", import.meta.url).pathname;

  console.log("Fetching DigitalOcean OpenAPI spec...");
  console.log(`  Source: ${DO_SPEC_URL}`);

  const response = await fetch(DO_SPEC_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download spec: ${response.status} ${response.statusText}`,
    );
  }

  const yamlText = await response.text();

  // Save raw YAML to a temp file for $ref resolution
  const tmpYaml = await Deno.makeTempFile({ suffix: ".yaml" });
  try {
    await Deno.writeTextFile(tmpYaml, yamlText);

    console.log("Dereferencing $refs...");
    const dereferenced = await $RefParser.dereference(tmpYaml);

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
    const jsonText = serializeWithCycleDetection(dereferenced);
    await Deno.writeTextFile(outputPath, jsonText);

    const fileSize = (await Deno.stat(outputPath)).size;
    console.log(`\nSchema fetch complete!`);
    console.log(
      `  Output: ${outputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`,
    );
  } finally {
    try {
      await Deno.remove(tmpYaml);
    } catch { /* ignore cleanup errors */ }
  }
}

// --- Model generation ---

export async function generateDigitalOceanModels(options: {
  outputDir: string;
  schemaPath?: string;
}): Promise<DigitalOceanGenerationResult> {
  const schemaPath = options.schemaPath ??
    new URL("../schemas/digitalocean.json", import.meta.url).pathname;

  console.log("Loading DigitalOcean OpenAPI spec...");
  const specText = await Deno.readTextFile(schemaPath);
  const spec = JSON.parse(specText);

  const now = new Date();
  const datePrefix = `${now.getFullYear()}.${
    String(now.getMonth() + 1).padStart(2, "0")
  }.${String(now.getDate()).padStart(2, "0")}`;

  const { resources, skipped } = parseResources(spec);
  console.log(`Found ${resources.length} resources`);

  const models: DigitalOceanGeneratedFile[] = [];
  const errors: string[] = [];
  const modelChanges: DigitalOceanModelChange[] = [];

  const extensionName = "@swamp/digitalocean";
  const placeholderVersion = "VERSION_PLACEHOLDER";

  for (const resource of resources) {
    try {
      const candidateCode = generateDigitalOceanExtensionModel({
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

      const upgradesBlock = computeUpgradesBlock(
        status,
        version,
        existingContent,
        newFieldNames,
      );

      const sourceCode = generateDigitalOceanExtensionModel({
        resource,
        extensionName,
        version,
        upgradesBlock,
      });

      models.push({ filePath, sourceCode });
      modelChanges.push({ fileName: resource.fileName, status });
    } catch (error) {
      errors.push(`${resource.displayName}: ${error}`);
    }
  }

  // Generate shared lib
  const libFile: DigitalOceanGeneratedFile = {
    filePath: "extensions/models/_lib/digitalocean.ts",
    sourceCode: generateDigitalOceanLibFile(),
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
  const readmeFile: DigitalOceanGeneratedFile = {
    filePath: "README.md",
    sourceCode: generateDigitalOceanReadme(),
  };
  const licenseFile: DigitalOceanGeneratedFile = {
    filePath: "LICENSE.txt",
    sourceCode: generateLicense(),
  };
  const denoConfigFile: DigitalOceanGeneratedFile = {
    filePath: "deno.json",
    sourceCode: generateDigitalOceanDenoConfig(),
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

  // Compute manifest version
  const additionalFiles = ["LICENSE.txt", "README.md"];
  const modelFileNames = models.map((m) =>
    m.filePath.replace("extensions/models/", "")
  );
  const candidateManifest = generateManifest({
    name: extensionName,
    version: placeholderVersion,
    description: "DigitalOcean infrastructure models",
    labels: ["digitalocean", "cloud", "infrastructure"],
    modelFiles: modelFileNames,
    additionalFiles,
    releaseNotes,
    repository: "https://github.com/systeminit/swamp-extensions",
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
    description: "DigitalOcean infrastructure models",
    labels: ["digitalocean", "cloud", "infrastructure"],
    modelFiles: modelFileNames,
    additionalFiles,
    releaseNotes,
    repository: "https://github.com/systeminit/swamp-extensions",
    platforms: [],
  });
  const manifest: DigitalOceanGeneratedFile = {
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

// deno-lint-ignore no-explicit-any
type OpenApiSpec = any;

interface EndpointGroup {
  /** The base path without ID segment, e.g., "/v2/droplets" */
  basePath: string;
  /** The path with ID segment, e.g., "/v2/droplets/{droplet_id}" */
  idPath: string | null;
  /** ID parameter name, e.g., "droplet_id" */
  idParam: string | null;
  // deno-lint-ignore no-explicit-any
  baseOps: Record<string, any>;
  // deno-lint-ignore no-explicit-any
  idOps: Record<string, any>;
}

function parseResources(
  spec: OpenApiSpec,
): {
  resources: DigitalOceanResource[];
  skipped: { path: string; reason: string }[];
} {
  const paths: Record<string, Record<string, OpenApiSpec>> = spec.paths ?? {};
  const skipped: { path: string; reason: string }[] = [];

  // Group paths into base (no ID) and ID (with ID) variants
  const groups = new Map<string, EndpointGroup>();

  // Collect action endpoints: path → POST operation
  // e.g. "/v2/droplets/{droplet_id}/actions" → basePath "/v2/droplets"
  const actionEndpoints = new Map<
    string,
    { path: string; postOp: OpenApiSpec }
  >();

  // Collect sub-resource method endpoints: basePath → list of sub-resource info
  // e.g. "/v2/databases" → [{ subPath: "resize", path: "/v2/databases/{id}/resize", ... }]
  const subResourceMethodEndpoints = new Map<
    string,
    Array<{
      subPath: string;
      path: string;
      httpMethod: "PUT" | "PATCH";
      ops: Record<string, OpenApiSpec>;
    }>
  >();

  // Track all paths to detect collections (paths with child {param} segments)
  const allPaths = new Set(Object.keys(paths));

  // Collect discovery endpoints: GET-only paths ending with /options
  // e.g. "/v2/kubernetes/options", "/v2/databases/options"
  const discoveryEndpoints: string[] = [];

  for (const path of Object.keys(paths)) {
    // Only /v2/ paths
    if (!path.startsWith("/v2/")) continue;

    const segments = path.split("/").filter(Boolean); // ["v2", "droplets"] or ["v2", "droplets", "{droplet_id}"]

    // Detect action endpoints: /{resource}/{id}/actions with exactly 1 param + "actions" terminal
    const paramSegments = segments.filter((s) => s.startsWith("{"));
    const lastSegment = segments[segments.length - 1];
    if (lastSegment === "actions" && paramSegments.length === 1) {
      const postOp = paths[path]?.post;
      if (postOp) {
        // Derive parent base path: remove /{id}/actions
        const parentSegments = segments.slice(0, -2); // remove "{id}" and "actions"
        const parentBasePath = "/" + parentSegments.join("/");
        actionEndpoints.set(parentBasePath, { path, postOp });
      }
      continue; // don't process action paths as regular resources
    }

    // Also skip action sub-resources like /actions/{action_id}
    if (segments.includes("actions")) {
      skipped.push({ path, reason: "action sub-resource" });
      continue;
    }

    // Detect discovery endpoints: GET-only paths ending with /options, no params
    if (lastSegment === "options" && paramSegments.length === 0) {
      const pathOps = paths[path];
      if (pathOps?.get && !pathOps?.post && !pathOps?.put && !pathOps?.patch) {
        discoveryEndpoints.push(path);
        continue;
      }
    }

    // Check if this path belongs to an allowlisted child resource
    if (paramSegments.length > 1) {
      // 2-param path: could be the ID endpoint of a child resource
      // e.g. /v2/domains/{domain_name}/records/{domain_record_id}
      // Derive candidate collection path by stripping the terminal {param}
      const candidateBase = "/" + segments.slice(0, -1).join("/");
      if (
        lastSegment.startsWith("{") &&
        CHILD_RESOURCE_ENDPOINTS.has(candidateBase)
      ) {
        // This is the ID endpoint of a child resource — add to groups
        const childIdParam = lastSegment.replace(/[{}]/g, "");
        if (!groups.has(candidateBase)) {
          groups.set(candidateBase, {
            basePath: candidateBase,
            idPath: null,
            idParam: null,
            baseOps: {},
            idOps: {},
          });
        }
        const group = groups.get(candidateBase)!;
        group.idPath = path;
        group.idParam = childIdParam;
        group.idOps = paths[path];
        continue;
      }
      skipped.push({ path, reason: "sub-asset (>1 ID segment)" });
      continue;
    }

    // Top-level path part (after /v2/)
    const topLevel = segments[1];
    if (!topLevel) continue;

    // Skip excluded top-level paths
    if (SKIP_TOP_LEVEL.has(topLevel)) {
      skipped.push({ path, reason: `excluded top-level: ${topLevel}` });
      continue;
    }

    // Skip /v2/registry (use /v2/registries)
    if (path === "/v2/registry" || path.startsWith("/v2/registry/")) {
      skipped.push({ path, reason: "use /v2/registries instead" });
      continue;
    }

    const hasIdParam = paramSegments.length === 1;

    // Determine base path (without ID param)
    let basePath: string;
    if (hasIdParam) {
      // Remove the last segment if it's the param
      const lastSeg = segments[segments.length - 1];
      if (lastSeg.startsWith("{")) {
        basePath = "/" + segments.slice(0, -1).join("/");
      } else {
        // Param is in the middle: /{base}/{param}/{sub_resource}
        // Check if this is the collection endpoint of an allowlisted child resource
        if (CHILD_RESOURCE_ENDPOINTS.has(path)) {
          if (!groups.has(path)) {
            groups.set(path, {
              basePath: path,
              idPath: null,
              idParam: null,
              baseOps: {},
              idOps: {},
            });
          }
          groups.get(path)!.baseOps = paths[path];
          continue;
        }

        // Check if this qualifies as a sub-resource method endpoint
        const pathOps = paths[path];
        const hasPutOrPatch = !!pathOps?.put || !!pathOps?.patch;
        const hasPost = !!pathOps?.post;

        // Check for child paths with additional {params} (indicates a collection)
        const hasChildParams = [...allPaths].some((p) =>
          p.startsWith(path + "/") && p.slice(path.length + 1).includes("{")
        );

        if (hasPutOrPatch && !hasPost && !hasChildParams) {
          // Qualifies as a sub-resource method — collect it
          // Derive parent base path: segments before the {param}
          const paramIdx = segments.findIndex((s) => s.startsWith("{"));
          const parentBasePath = "/" + segments.slice(0, paramIdx).join("/");
          const subPath = lastSeg;
          const httpMethod: "PUT" | "PATCH" = pathOps?.patch ? "PATCH" : "PUT";

          if (!subResourceMethodEndpoints.has(parentBasePath)) {
            subResourceMethodEndpoints.set(parentBasePath, []);
          }
          subResourceMethodEndpoints.get(parentBasePath)!.push({
            subPath,
            path,
            httpMethod,
            ops: pathOps,
          });
          continue;
        }

        // Not a sub-resource method — skip as before
        skipped.push({ path, reason: "param not in terminal position" });
        continue;
      }
    } else {
      basePath = path;
    }

    if (!groups.has(basePath)) {
      groups.set(basePath, {
        basePath,
        idPath: null,
        idParam: null,
        baseOps: {},
        idOps: {},
      });
    }

    const group = groups.get(basePath)!;
    if (hasIdParam) {
      group.idPath = path;
      group.idParam = paramSegments[0].replace(/[{}]/g, "");
      group.idOps = paths[path];
    } else {
      group.baseOps = paths[path];
    }
  }

  const resources: DigitalOceanResource[] = [];

  for (const [basePath, group] of groups) {
    // Require both with-ID and without-ID endpoint variants
    if (!group.idPath) {
      skipped.push({ path: basePath, reason: "no ID endpoint variant" });
      continue;
    }
    if (Object.keys(group.baseOps).length === 0) {
      skipped.push({ path: basePath, reason: "no base endpoint variant" });
      continue;
    }

    // Require POST + GET operations
    if (!group.baseOps.post) {
      skipped.push({ path: basePath, reason: "no POST operation" });
      continue;
    }
    if (!group.idOps.get && !group.baseOps.get) {
      skipped.push({ path: basePath, reason: "no GET operation" });
      continue;
    }

    // Skip resources with >2 operation groups (too complex)
    const totalOps = Object.keys(group.baseOps).length +
      Object.keys(group.idOps).length;
    if (totalOps > 8) {
      skipped.push({
        path: basePath,
        reason: `too many operations (${totalOps})`,
      });
      continue;
    }

    const resource = buildResource(basePath, group, spec);
    if (resource) {
      const childConfig = CHILD_RESOURCE_ENDPOINTS.get(basePath);
      if (childConfig) {
        resource.parentParam = childConfig.parentParam;
        const paramIdx = basePath.indexOf(`{${childConfig.parentParam}}`);
        resource.parentEndpoint = basePath.slice(0, paramIdx - 1);
        if (childConfig.forceSyntheticName) {
          resource.forceSyntheticName = true;
        }
      }
      resources.push(resource);
    } else {
      skipped.push({ path: basePath, reason: "could not build resource" });
    }
  }

  // Second pass: match action endpoints to their parent resources
  for (const resource of resources) {
    const actionInfo = actionEndpoints.get(resource.endpoint);
    if (actionInfo) {
      const actions = parseActions(actionInfo.postOp, actionInfo.path, spec);
      resource.actions = actions;
    }
  }

  // Third pass: match sub-resource method endpoints to their parent resources
  for (const resource of resources) {
    const subMethods = subResourceMethodEndpoints.get(resource.endpoint);
    if (subMethods) {
      resource.subResourceMethods = parseSubResourceMethods(subMethods, spec);
    }
  }

  // Fourth pass: match discovery endpoints (e.g. /v2/kubernetes/options) to parent resources
  for (const discoveryPath of discoveryEndpoints) {
    // Remove "/options" to get the prefix, e.g. "/v2/kubernetes"
    const prefix = discoveryPath.replace(/\/options$/, "");

    // Try direct match first (e.g. /v2/databases/options → resource at /v2/databases)
    let matched = false;
    for (const resource of resources) {
      if (resource.endpoint === prefix) {
        resource.discoveryEndpoint = discoveryPath;
        matched = true;
        break;
      }
    }
    // Try sibling match (e.g. /v2/kubernetes/options → resource at /v2/kubernetes/clusters)
    if (!matched) {
      for (const resource of resources) {
        if (resource.endpoint.startsWith(prefix + "/")) {
          resource.discoveryEndpoint = discoveryPath;
          matched = true;
          break;
        }
      }
    }
  }

  return {
    resources: resources.sort((a, b) =>
      a.displayName.localeCompare(b.displayName)
    ),
    skipped,
  };
}

/** Build a resource display name from path parts */
function buildDisplayName(basePath: string): string {
  // Split path parts after /v2/ on - and _
  const segments = basePath.replace("/v2/", "").split("/");
  const parts: string[] = [];

  for (const segment of segments) {
    if (segment.startsWith("{")) continue; // skip params
    const words = segment.split(/[-_]/);
    for (const word of words) {
      if (!word) continue;
      // Singularize
      const singular = pluralize.singular(word);
      // Uppercase acronyms
      if (ACRONYMS.includes(singular.toLowerCase())) {
        parts.push(singular.toUpperCase());
      } else {
        parts.push(singular.charAt(0).toUpperCase() + singular.slice(1));
      }
    }
  }

  const rawName = parts.join(" ");

  // Apply overrides
  return NAME_OVERRIDES[rawName] ?? rawName;
}

/** Determine the identifier field for a resource */
function resolveIdentifierField(
  idPath: string,
  idParam: string,
): string {
  // Check endpoint-level overrides first
  if (ENDPOINT_IDENTIFIER_OVERRIDES[idPath]) {
    return ENDPOINT_IDENTIFIER_OVERRIDES[idPath];
  }

  // Check param-level mapping
  if (IDENTIFIER_MAP[idParam]) {
    return IDENTIFIER_MAP[idParam];
  }

  // Fallback: strip underscores from param name
  return idParam.replace(/_/g, "");
}

function buildResource(
  basePath: string,
  group: EndpointGroup,
  spec: OpenApiSpec,
): DigitalOceanResource | null {
  const displayName = buildDisplayName(basePath);
  const modelSlug = displayName.toLowerCase().replace(/\s+/g, "-");
  const fileName = modelSlug.replace(/-/g, "_") + ".ts";

  // Determine identifier field
  const identifyingField = group.idParam
    ? resolveIdentifierField(group.idPath!, group.idParam)
    : "id";

  // Extract CRUD operations
  const hasCreate = !!group.baseOps.post;
  const hasRead = !!group.idOps.get;
  const hasPatch = !!group.idOps.patch;
  const hasPut = !!group.idOps.put;
  const hasUpdate = hasPatch || hasPut;
  const hasDelete = !!group.idOps.delete;

  // PATCH takes precedence over PUT for update
  const updateMethod: "PATCH" | "PUT" | null = hasPatch
    ? "PATCH"
    : hasPut
    ? "PUT"
    : null;

  // Extract properties
  const createProps = group.baseOps.post
    ? extractRequestBodyProperties(group.baseOps.post, spec, basePath)
    : { properties: {}, required: [] };

  const updateOp = hasPatch
    ? group.idOps.patch
    : hasPut
    ? group.idOps.put
    : null;
  const updateProps = updateOp
    ? extractRequestBodyProperties(updateOp, spec)
    : { properties: {}, required: [] };

  // GET response — prefer single-resource GET (with ID)
  const readOp = group.idOps.get ?? group.baseOps.get;
  const readPath = group.idOps.get ? group.idPath! : basePath;
  const resourceProps = readOp
    ? extractResponseProperties(readOp, readPath, spec)
    : {};

  // Determine create-only properties (in create but not update)
  const createOnlyProperties = new Set<string>();
  for (const name of Object.keys(createProps.properties)) {
    if (!updateProps.properties[name]) {
      createOnlyProperties.add(name);
    }
  }

  // Special case: Spaces Keys `grants` forced createOnly
  if (basePath.includes("spaces") && createProps.properties.grants) {
    createOnlyProperties.add("grants");
  }

  return {
    displayName,
    modelSlug,
    fileName,
    endpoint: basePath,
    createProperties: createProps.properties,
    updateProperties: updateProps.properties,
    resourceProperties: resourceProps,
    requiredProperties: createProps.required,
    handlers: {
      create: hasCreate,
      read: hasRead,
      update: hasUpdate,
      delete: hasDelete,
    },
    updateMethod,
    identifyingField,
    idParam: group.idParam ?? "id",
    createOnlyProperties,
    actions: [],
    subResourceMethods: [],
    readiness: READINESS_CONFIG[basePath],
  };
}

// --- Action endpoint parsing ---

/**
 * Parse action schemas from a POST .../actions endpoint using the
 * discriminator.mapping to discover action types and their parameters.
 */
function parseActions(
  postOp: OpenApiSpec,
  _actionPath: string,
  spec: OpenApiSpec,
): DigitalOceanAction[] {
  const body = postOp.requestBody;
  if (!body) return [];

  const content = body.content?.["application/json"];
  if (!content?.schema) return [];

  const schema = content.schema;

  // Get discriminator mapping: { "rename": "#/components/schemas/droplet_action_rename", ... }
  const mapping = schema.discriminator?.mapping;
  if (!mapping || typeof mapping !== "object") return [];

  const actions: DigitalOceanAction[] = [];

  for (const [actionType, schemaRef] of Object.entries(mapping)) {
    // Resolve schema ref to component schema
    // schemaRef looks like "#/components/schemas/droplet_action_rename"
    const refPath = (schemaRef as string).replace("#/", "").split("/");
    let componentSchema: OpenApiSpec = spec;
    for (const part of refPath) {
      componentSchema = componentSchema?.[part];
    }
    if (!componentSchema) continue;

    const action = parseActionSchema(actionType, componentSchema);
    actions.push(action);
  }

  return actions.sort((a, b) => a.actionType.localeCompare(b.actionType));
}

/**
 * Parse a single action's component schema to extract its parameters.
 * Handles both flat params (droplet, volume, image) and nested "params" object (NFS).
 */
function parseActionSchema(
  actionType: string,
  componentSchema: OpenApiSpec,
): DigitalOceanAction {
  // Flatten allOf to get all properties
  const flattened = flattenSchemaProperties(componentSchema);
  const allProps = flattened.properties ?? {};
  const allRequired = new Set<string>(collectAllRequired(componentSchema));

  // Separate: "type" is the discriminator, everything else is action-specific
  const properties: Record<string, DigitalOceanProperty> = {};
  const requiredProperties: string[] = [];
  let nestedParams = false;

  for (const [name, propSchema] of Object.entries(allProps)) {
    // Skip the "type" discriminator field
    if (name === "type") continue;

    const schema = propSchema as OpenApiSpec;

    // Skip readOnly properties
    if (schema.readOnly) continue;

    // Check for NFS nested "params" pattern: a single "params" property that is an object
    if (name === "params" && schema.type === "object" && schema.properties) {
      nestedParams = true;
      const paramsRequired = new Set<string>(schema.required ?? []);
      for (const [pName, pSchema] of Object.entries(schema.properties)) {
        const pSchemaTyped = pSchema as OpenApiSpec;
        if (pSchemaTyped.readOnly) continue;
        properties[pName] = normalizeProperty(pSchemaTyped);
        if (paramsRequired.has(pName)) {
          requiredProperties.push(pName);
        }
      }
      continue;
    }

    // Standard flat property
    properties[name] = normalizeProperty(schema);
    if (allRequired.has(name)) {
      requiredProperties.push(name);
    }
  }

  return {
    actionType,
    properties,
    requiredProperties,
    nestedParams,
  };
}

// --- Sub-resource method parsing ---

/**
 * Parse sub-resource method endpoints into DigitalOceanSubResourceMethod[].
 * Reuses extractRequestBodyProperties to get properties from the request body.
 */
function parseSubResourceMethods(
  endpoints: Array<{
    subPath: string;
    path: string;
    httpMethod: "PUT" | "PATCH";
    ops: Record<string, OpenApiSpec>;
  }>,
  spec: OpenApiSpec,
): DigitalOceanSubResourceMethod[] {
  const methods: DigitalOceanSubResourceMethod[] = [];

  for (const ep of endpoints) {
    const op = ep.ops[ep.httpMethod.toLowerCase()];
    if (!op) continue;

    const { properties, required } = extractRequestBodyProperties(op, spec);

    // Derive method name from sub-path: replace hyphens with underscores
    const methodName = ep.subPath.replace(/-/g, "_");

    methods.push({
      methodName,
      subPath: ep.subPath,
      httpMethod: ep.httpMethod,
      properties,
      requiredProperties: required,
    });
  }

  return methods.sort((a, b) => a.methodName.localeCompare(b.methodName));
}

// --- Schema flattening ---

/**
 * Flatten allOf/anyOf/oneOf at every level using BFS.
 */
function flattenSchemaProperties(
  schema: OpenApiSpec,
): OpenApiSpec {
  if (!schema || typeof schema !== "object") return schema ?? {};

  // Handle allOf/anyOf/oneOf
  if (schema.allOf || schema.anyOf || schema.oneOf) {
    return flattenOfStatements(schema);
  }

  return schema;
}

/**
 * Merge composed schemas (allOf/anyOf/oneOf).
 * Type precedence: string > number > integer
 */
/**
 * Recursively collect all `required` fields from a schema,
 * including those nested inside `allOf` branches.
 */
function collectAllRequired(schema: OpenApiSpec): string[] {
  const result: string[] = [];
  if (schema.required) {
    result.push(...schema.required);
  }
  if (schema.allOf) {
    for (const item of schema.allOf) {
      result.push(...collectAllRequired(item));
    }
  }
  return result;
}

function flattenOfStatements(schema: OpenApiSpec): OpenApiSpec {
  const isAllOf = !!schema.allOf;
  const isOneOfOrAnyOf = !!(schema.oneOf || schema.anyOf);
  const items = schema.allOf ?? schema.anyOf ?? schema.oneOf ?? [];
  // deno-lint-ignore no-explicit-any
  const merged: any = { ...schema };
  delete merged.allOf;
  delete merged.anyOf;
  delete merged.oneOf;

  for (const item of items) {
    const flattened = flattenSchemaProperties(item);
    if (flattened.properties) {
      merged.properties = {
        ...(merged.properties ?? {}),
        ...flattened.properties,
      };
    }
    // Only merge required arrays for allOf (conjunction).
    if (isAllOf && flattened.required) {
      merged.required = [
        ...new Set([...(merged.required ?? []), ...flattened.required]),
      ];
    }
    // Type precedence
    if (flattened.type) {
      if (!merged.type) {
        merged.type = flattened.type;
      } else {
        // string > number > integer
        const precedence: Record<string, number> = {
          string: 3,
          number: 2,
          integer: 1,
        };
        const currentPrecedence = precedence[merged.type] ?? 0;
        const newPrecedence = precedence[flattened.type] ?? 0;
        if (newPrecedence > currentPrecedence) {
          merged.type = flattened.type;
        }
      }
    }
    if (flattened.description && !merged.description) {
      merged.description = flattened.description;
    }
    if (flattened.nullable) {
      merged.nullable = true;
    }
  }

  // For oneOf/anyOf: intersect required fields across all branches.
  // Fields required in EVERY branch are universally required.
  if (isOneOfOrAnyOf && items.length > 0) {
    const branchRequiredSets = items.map((item: OpenApiSpec) =>
      new Set(collectAllRequired(flattenSchemaProperties(item)))
    );
    const intersection = [...branchRequiredSets[0]].filter((field: string) =>
      branchRequiredSets.every((s: Set<string>) => s.has(field))
    );
    if (intersection.length > 0) {
      merged.required = [
        ...new Set([...(merged.required ?? []), ...intersection]),
      ];
    }
  }

  return merged;
}

/**
 * Normalize a property: handle oneOf/anyOf smooshing, format cleanup.
 */
function normalizeProperty(schema: OpenApiSpec): DigitalOceanProperty {
  if (!schema || typeof schema !== "object") {
    return { type: "string" };
  }

  let resolved = flattenSchemaProperties(schema);

  // Handle oneOf/anyOf — pick non-string primitive if available
  if (resolved.oneOf || resolved.anyOf) {
    const variants = resolved.oneOf ?? resolved.anyOf ?? [];
    let picked: OpenApiSpec | null = null;
    for (const variant of variants) {
      const flat = flattenSchemaProperties(variant);
      if (flat.type && flat.type !== "null" && flat.type !== "string") {
        picked = flat;
        break;
      }
    }
    if (!picked) {
      // Fall back to first non-null
      for (const variant of variants) {
        const flat = flattenSchemaProperties(variant);
        if (flat.type && flat.type !== "null") {
          picked = flat;
          break;
        }
      }
    }
    if (picked) {
      resolved = picked;
    }
  }

  // Format cleanup
  if (resolved.format) {
    const stripFormats = [
      "duration",
      "uuid",
      "email",
      "date-time",
      "date",
      "time",
      "hostname",
      "ipv4",
      "ipv6",
      "byte",
      "binary",
      "password",
    ];
    if (stripFormats.includes(resolved.format)) {
      // Keep the type but drop the format
      delete resolved.format;
    }
    // Normalize int32 → int64
    if (resolved.format === "int32") {
      resolved.format = "int64";
    }
    // Normalize hostname → uri
    if (resolved.format === "hostname") {
      resolved.format = "uri";
    }
  }

  const type = resolved.type ?? "string";

  const prop: DigitalOceanProperty = {
    type: type === "integer" ? "integer" : type,
  };

  if (resolved.description) prop.description = resolved.description;

  if (type === "string") {
    if (resolved.enum) prop.enum = resolved.enum;
    if (resolved.minLength !== undefined) prop.minLength = resolved.minLength;
    if (resolved.maxLength !== undefined) prop.maxLength = resolved.maxLength;
    if (resolved.pattern) prop.pattern = resolved.pattern;
  }

  if (type === "number" || type === "integer") {
    if (resolved.enum) prop.enum = resolved.enum;
    if (resolved.minimum !== undefined) prop.minimum = resolved.minimum;
    if (resolved.maximum !== undefined) prop.maximum = resolved.maximum;
  }

  if (type === "array" && resolved.items) {
    const itemFlat = flattenSchemaProperties(resolved.items);
    prop.items = normalizeProperty(itemFlat);
  }

  if (type === "object" && resolved.properties) {
    prop.properties = {};
    for (const [name, childSchema] of Object.entries(resolved.properties)) {
      prop.properties[name] = normalizeProperty(childSchema as OpenApiSpec);
    }
    if (resolved.required && Array.isArray(resolved.required)) {
      prop.requiredProperties = resolved.required;
    }
  }

  // Propagate nullable from the original schema (handles both direct and allOf-merged)
  if (schema.nullable || resolved.nullable) {
    prop.nullable = true;
  }

  return prop;
}

// --- Request/Response extraction ---

function extractRequestBodyProperties(
  operation: OpenApiSpec,
  _spec: OpenApiSpec,
  endpoint?: string,
): { properties: Record<string, DigitalOceanProperty>; required: string[] } {
  const body = operation.requestBody;
  if (!body) return { properties: {}, required: [] };

  const content = body.content?.["application/json"];
  if (!content?.schema) return { properties: {}, required: [] };

  const schema = flattenSchemaProperties(content.schema);
  if (!schema.properties) return { properties: {}, required: [] };

  const properties: Record<string, DigitalOceanProperty> = {};
  for (const [name, propSchema] of Object.entries(schema.properties)) {
    // Skip excluded properties (e.g. bulk-create alternatives like "names")
    if (SKIP_PROPERTIES.has(name)) continue;
    // Skip read-only properties — they belong in the response, not in create/update bodies
    if (
      typeof propSchema === "object" && propSchema !== null &&
      (propSchema as OpenApiSpec).readOnly
    ) {
      continue;
    }
    const prop = normalizeProperty(propSchema as OpenApiSpec);
    // Tag region properties
    if (name === "region") {
      prop.isRegion = true;
    }
    properties[name] = prop;
  }

  // Apply required field overrides (e.g., droplet "name")
  let required = schema.required ?? [];
  if (endpoint && REQUIRED_FIELDS_OVERRIDES[endpoint]) {
    required = [
      ...new Set([...required, ...REQUIRED_FIELDS_OVERRIDES[endpoint]]),
    ];
  }

  return {
    properties,
    required,
  };
}

function extractResponseProperties(
  operation: OpenApiSpec,
  basePath: string,
  _spec: OpenApiSpec,
): Record<string, DigitalOceanProperty> {
  const responses = operation.responses;
  if (!responses) return {};

  const responseObj = responses["200"] ?? responses["201"];
  if (!responseObj) return {};

  const content = responseObj.content?.["application/json"];
  if (!content?.schema) return {};

  const schema = flattenSchemaProperties(content.schema);
  if (!schema.properties) return {};

  // Check if this is a single-resource response or list response
  // For single GET (/v2/droplets/{id}), unwrap the envelope
  const isListEndpoint = !basePath.includes("{");

  // Find the resource object in the response
  const envelopeKeys = Object.keys(schema.properties).filter(
    (k) => k !== "links" && k !== "meta",
  );

  if (envelopeKeys.length === 0) return {};

  let resourceSchema: OpenApiSpec;

  if (isListEndpoint) {
    // For list endpoints, find the array property and extract items
    let found = false;
    for (const key of envelopeKeys) {
      const propSchema = flattenSchemaProperties(
        schema.properties[key] as OpenApiSpec,
      );
      if (propSchema.type === "array" && propSchema.items) {
        resourceSchema = flattenSchemaProperties(propSchema.items);
        found = true;
        break;
      }
    }
    if (!found) return {};
  } else {
    // For single resource, unwrap the first non-links/meta property that is an object
    const innerKey = envelopeKeys[0];
    const innerSchema = flattenSchemaProperties(
      schema.properties[innerKey] as OpenApiSpec,
    );
    if (innerSchema.properties) {
      resourceSchema = innerSchema;
    } else if (innerSchema.type === "array" && innerSchema.items) {
      // Sometimes single-resource responses wrap in array
      resourceSchema = flattenSchemaProperties(innerSchema.items);
    } else {
      // Use top-level properties directly
      resourceSchema = schema;
    }
  }

  if (!resourceSchema!.properties) return {};

  const properties: Record<string, DigitalOceanProperty> = {};
  for (
    const [name, propSchema] of Object.entries(resourceSchema!.properties)
  ) {
    if (name === "links" || name === "meta") continue;
    const prop = normalizeProperty(propSchema as OpenApiSpec);
    properties[name] = prop;
  }

  return properties;
}

// --- Circular reference-safe serialization ---

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

    // True cycle: this object is an ancestor on the current path
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
