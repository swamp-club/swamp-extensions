// GCP model generation pipeline
// Fetches GCP Discovery Documents, parses resources, normalizes properties,
// and generates extension models per service.

import type {
  CfProperty,
  CfSchema,
  OnlyProperties,
} from "../shared/schema/types.ts";
import { generateZodSchemas } from "../shared/zodGenerator.ts";
import {
  generateGcpExtensionModel,
  resolveGcpNamingField,
} from "./extensionModelGenerator.ts";
import { generateGcpLibFile } from "./libGenerator.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateGcpDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateGcpReadme } from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatCode,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";
import {
  getEnrichment,
  getServiceEnrichmentImports,
  parseEnrichmentSource,
} from "./enrichments/index.ts";

const GCP_DISCOVERY_URL = "https://www.googleapis.com/discovery/v1/apis";

// APIs to skip during schema fetching — deprecated, shutdown, or internal-only
// services whose discovery endpoints are dead or return errors.
const SKIP_APIS = new Set([
  "area120tables", // Shutdown — returns 404
  "developerknowledge", // Internal API — returns 400
  "poly", // Shutdown — returns 502
]);

// APIs where the preferred version lacks resources we need. Each entry fetches
// an additional version alongside the preferred one. The extra schema is saved
// as `<name>-<version>.json` (e.g. `iam-v1.json`) and merged during generation.
const ADDITIONAL_VERSIONS: Record<string, string[]> = {
  iam: ["v1"], // v2 (preferred) only has Deny Policies; v1 has custom roles
};

// When loading additional-version schemas, only include resources whose
// post-deduplication path matches one of these entries. Scope prefixes
// (projects/, organizations/) are already stripped by deduplicateScopedResources
// before this filter applies.
const ADDITIONAL_VERSION_RESOURCE_FILTER: Record<string, string[][]> = {
  "iam-v1": [["roles"]],
};

// --- Public types ---

/** A single GCP Discovery Document property (recursive). */
export interface NormalizedGcpSchema {
  type?: string;
  format?: string;
  description?: string;
  default?: unknown;
  enum?: string[];
  pattern?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  readOnly?: boolean;
  deprecated?: boolean;
  required?: string[];
  properties?: Record<string, NormalizedGcpSchema>;
  additionalProperties?: NormalizedGcpSchema | boolean;
  items?: NormalizedGcpSchema;
  allOf?: NormalizedGcpSchema[];
  oneOf?: NormalizedGcpSchema[];
  anyOf?: NormalizedGcpSchema[];
  annotations?: {
    required?: string[];
  };
  // Used by $ref resolution
  $ref?: string;
  title?: string;
}

export interface GcpDiscoveryDocument {
  kind: "discovery#restDescription";
  name: string;
  version: string;
  title: string;
  description?: string;
  documentationLink?: string;
  baseUrl: string;
  basePath: string;
  rootUrl: string;
  servicePath: string;
  parameters?: Record<string, GcpParameter>;
  auth?: { oauth2?: { scopes: Record<string, { description: string }> } };
  schemas: Record<string, NormalizedGcpSchema>;
  resources?: Record<string, GcpResource>;
  methods?: Record<string, GcpMethod>;
}

export interface GcpResource {
  methods?: Record<string, GcpMethod>;
  resources?: Record<string, GcpResource>;
}

export interface GcpMethod {
  id: string;
  path: string;
  httpMethod: string;
  description?: string;
  parameters?: Record<string, GcpParameter>;
  parameterOrder?: string[];
  request?: NormalizedGcpSchema;
  response?: NormalizedGcpSchema;
  scopes?: string[];
}

export interface GcpParameter {
  type: string;
  description?: string;
  required?: boolean;
  location: "path" | "query";
  pattern?: string;
  minimum?: string;
  maximum?: string;
  default?: string;
  deprecated?: boolean;
}

/** CRUD methods extracted from a GCP resource. */
export interface GcpResourceMethods {
  get?: GcpMethod;
  list?: GcpMethod;
  insert?: GcpMethod;
  update?: GcpMethod;
  patch?: GcpMethod;
  delete?: GcpMethod;
  /** Non-CRUD action methods (start, stop, reboot, etc.) */
  actionMethods: Record<string, GcpMethod>;
}

/** A parsed GCP resource ready for code generation. */
export interface GcpParsedResource {
  /** Service name, e.g., "compute" */
  service: string;
  /** API title, e.g., "Compute Engine API" */
  apiTitle: string;
  /** API version, e.g., "v1" */
  apiVersion: string;
  /** API base URL */
  baseUrl: string;
  /** Documentation link */
  documentationLink?: string;
  /** Resource path segments, e.g., ["instances"] */
  resourcePath: string[];
  /** Full type name, e.g., "Google Cloud Compute Engine Instances" */
  typeName: string;
  /** Resource description */
  description: string;
  /** Domain properties (writable) as CfProperty */
  domainProperties: Record<string, CfProperty>;
  /** Resource value properties (all, from GET response) as CfProperty */
  resourceValueProperties: Record<string, CfProperty>;
  /** Required property names for creation */
  requiredProperties: string[];
  /** Create-only property names */
  createOnlyProperties: string[];
  /** Property names from the insert request schema (valid for create body) */
  insertProperties: Set<string>;
  /** Property names from the update/patch request schema (valid for update body) */
  updateProperties: Set<string>;
  /** Primary identifier field names */
  primaryIdentifier: string[];
  /** Available CRUD handlers */
  handlers: GcpResourceHandlers;
  /** Available scopes (projects, organizations, etc.) */
  availableScopes?: string[];
  /** Whether this resource only supports global location */
  isGlobalOnly: boolean;
  /** Whether this resource has no GET (must list + filter) */
  listOnly: boolean;
  /** CRUD method configurations for runtime URL building */
  methodConfigs: GcpMethodConfigs;
  /** Action methods (start, stop, reboot, etc.) with their configs and request properties */
  actionMethods: GcpActionMethod[];
  /**
   * Readiness polling config for post-create/update status checking.
   * Set when the resource schema has a status/state enum field with recognizable
   * ready and failed values.
   */
  readiness?: {
    statusField: string;
    readyValues: string[];
    failedValues: string[];
  };
  /**
   * Whether this resource uses the {+name} pattern where name is a fully-qualified
   * resource path (e.g., "projects/my-project/services/compute.googleapis.com").
   * When true, methods that use `name` as a path parameter need to construct the
   * full name from parent + resourceSegment + short name.
   */
  usesFullResourceName: boolean;
  /**
   * The resource segment used to construct the full resource name.
   * Extracted from the list/create path (e.g., "services" from "v1/{+parent}/services").
   * Only set when usesFullResourceName is true.
   */
  resourceSegment?: string;
  /**
   * Query parameters for the list method, excluding pagination internals
   * (pageToken) and deprecated parameters. Used to generate list method arguments.
   * Only set when a list method with a detectable response array exists.
   */
  listQueryParams?: Array<{
    name: string;
    type: string;
    description?: string;
    required?: boolean;
  }>;
  /**
   * The property name in the list response that contains the resource array
   * (e.g., "files" for Drive, "items" for Compute). Only set when the list
   * response schema has a top-level array property whose items are objects.
   */
  listResponseArrayField?: string;
}

/** A non-CRUD action method on a GCP resource (e.g., start, stop, reboot). */
export interface GcpActionMethod {
  /** Method name as it appears in the discovery doc, e.g., "start", "stop", "setMachineType" */
  name: string;
  /** Human-readable description */
  description: string;
  /** Method config for URL building */
  config: GcpMethodConfig;
  /** Request body properties as CfProperty (may be empty for parameterless actions) */
  requestProperties: Record<string, CfProperty>;
  /** Required property names for the request body */
  requiredProperties: string[];
}

export interface GcpResourceHandlers {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface GcpMethodConfig {
  id: string;
  path: string;
  httpMethod: string;
  parameterOrder: string[];
  parameters: Record<string, { location: string; required?: boolean }>;
}

export interface GcpMethodConfigs {
  get?: GcpMethodConfig;
  insert?: GcpMethodConfig;
  update?: GcpMethodConfig;
  patch?: GcpMethodConfig;
  delete?: GcpMethodConfig;
  list?: GcpMethodConfig;
}

export interface GcpGeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface GcpModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface GcpServiceGenerationResult {
  serviceName: string;
  models: GcpGeneratedFile[];
  libFile: GcpGeneratedFile;
  manifest: GcpGeneratedFile;
  readmeFile: GcpGeneratedFile;
  licenseFile: GcpGeneratedFile;
  denoConfigFile: GcpGeneratedFile;
  modelChanges: GcpModelChange[];
  hasChanges: boolean;
}

export interface GcpGenerationResult {
  datePrefix: string;
  services: Map<string, GcpServiceGenerationResult>;
  skipped: { service: string; resource: string; reason: string }[];
  errors: string[];
}

// --- Raw (un-dereferenced) types ---

interface RawGcpMethod {
  id: string;
  path: string;
  httpMethod: string;
  description?: string;
  parameters?: Record<string, GcpParameter>;
  parameterOrder?: string[];
  request?: { $ref: string };
  response?: { $ref: string };
  scopes?: string[];
}

interface RawGcpResource {
  methods?: Record<string, RawGcpMethod>;
  resources?: Record<string, RawGcpResource>;
}

interface RawGcpDiscoveryDocument {
  kind: "discovery#restDescription";
  name: string;
  version: string;
  title: string;
  description?: string;
  documentationLink?: string;
  baseUrl: string;
  basePath: string;
  rootUrl: string;
  servicePath: string;
  parameters?: Record<string, GcpParameter>;
  auth?: { oauth2?: { scopes: Record<string, { description: string }> } };
  schemas: Record<string, NormalizedGcpSchema>;
  resources?: Record<string, RawGcpResource>;
  methods?: Record<string, RawGcpMethod>;
}

interface DiscoveryItem {
  kind: string;
  id: string;
  name: string;
  version: string;
  title: string;
  description: string;
  discoveryRestUrl: string;
  preferred?: boolean;
}

interface DiscoveryDirectory {
  kind: "discovery#directoryList";
  discoveryVersion: string;
  items: DiscoveryItem[];
}

// --- Resource spec used during parsing ---

interface ResourceSpec extends GcpResourceMethods {
  resourceName: string;
  resourcePath: string[];
  handlers: GcpResourceHandlers;
  availableScopes?: string[];
}

// === PUBLIC API ===

/**
 * Fetches GCP Discovery Documents to schemas/gcp/.
 */
export async function fetchGcpSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputDir = options?.outputPath ??
    new URL("../schemas/gcp", import.meta.url).pathname;

  await Deno.mkdir(outputDir, { recursive: true });

  console.log("Fetching GCP API discovery directory...");
  const directoryResp = await fetchWithRetry(GCP_DISCOVERY_URL);
  if (!directoryResp.ok) {
    throw new Error(
      `Failed to fetch GCP discovery directory: ${directoryResp.statusText}`,
    );
  }

  const directory: DiscoveryDirectory = await directoryResp.json();

  // Group APIs by name, select best version per API
  const apisByName = new Map<string, DiscoveryItem[]>();
  for (const item of directory.items) {
    if (!apisByName.has(item.name)) {
      apisByName.set(item.name, []);
    }
    apisByName.get(item.name)!.push(item);
  }

  console.log(`Found ${apisByName.size} GCP APIs, selecting best versions...`);

  const selectedApis: DiscoveryItem[] = [];
  for (const versions of apisByName.values()) {
    selectedApis.push(selectBestVersion(versions));
  }

  console.log(`Selected ${selectedApis.length} API versions to fetch`);

  let fetched = 0;
  let skippedCount = 0;
  for (const api of selectedApis) {
    if (SKIP_APIS.has(api.name)) {
      skippedCount++;
      continue;
    }

    const filename = `${api.name}.json`;
    const filepath = `${outputDir}/${filename}`;

    try {
      const docResp = await fetchWithRetry(api.discoveryRestUrl);
      if (!docResp.ok) {
        console.warn(
          `Failed to fetch ${api.name} ${api.version}: ${docResp.statusText}`,
        );
        continue;
      }

      const doc = await docResp.json();
      await Deno.writeTextFile(filepath, stableStringify(doc, 2));

      fetched++;
      if (fetched % 10 === 0) {
        console.log(`Fetched ${fetched}/${selectedApis.length} APIs...`);
      }
    } catch (e) {
      console.warn(`Error fetching ${api.name} ${api.version}: ${e}`);
    }
  }

  console.log(
    `Successfully fetched ${fetched}/${selectedApis.length} GCP discovery documents to ${outputDir}` +
      (skippedCount > 0 ? ` (${skippedCount} skipped)` : ""),
  );

  // Fetch additional non-preferred versions for APIs that need them
  let additionalFetched = 0;
  for (const [apiName, versions] of Object.entries(ADDITIONAL_VERSIONS)) {
    const allVersions = apisByName.get(apiName);
    if (!allVersions) {
      console.warn(
        `ADDITIONAL_VERSIONS: API "${apiName}" not found in discovery directory`,
      );
      continue;
    }

    for (const targetVersion of versions) {
      const item = allVersions.find((v) => v.version === targetVersion);
      if (!item) {
        console.warn(
          `ADDITIONAL_VERSIONS: version "${targetVersion}" not found for "${apiName}" (available: ${
            allVersions.map((v) => v.version).join(", ")
          })`,
        );
        continue;
      }

      const filename = `${apiName}-${targetVersion}.json`;
      const filepath = `${outputDir}/${filename}`;
      try {
        const docResp = await fetchWithRetry(item.discoveryRestUrl);
        if (!docResp.ok) {
          console.warn(
            `Failed to fetch ${apiName} ${targetVersion}: ${docResp.statusText}`,
          );
          continue;
        }
        const doc = await docResp.json();
        await Deno.writeTextFile(filepath, stableStringify(doc, 2));
        additionalFetched++;
        console.log(`Fetched additional version: ${apiName} ${targetVersion}`);
      } catch (e) {
        console.warn(`Error fetching ${apiName} ${targetVersion}: ${e}`);
      }
    }
  }

  if (additionalFetched > 0) {
    console.log(`Fetched ${additionalFetched} additional API version(s)`);
  }
}

/**
 * Generates GCP extension models, grouped by service.
 */
export async function generateGcpModels(options: {
  services?: string[];
  outputDir: string;
  schemaPath?: string;
}): Promise<GcpGenerationResult> {
  const schemasDir = options.schemaPath ??
    new URL("../schemas/gcp", import.meta.url).pathname;

  console.log("Loading GCP discovery documents...");

  // Read all discovery documents
  const allResources: GcpParsedResource[] = [];
  const skipped: { service: string; resource: string; reason: string }[] = [];
  const errors: string[] = [];

  let docCount = 0;
  for await (const entry of Deno.readDir(schemasDir)) {
    if (!entry.isFile || !entry.name.endsWith(".json")) continue;

    const serviceName = entry.name.replace(".json", "");

    // Apply service filter — additional-version files (e.g. "iam-v1") pass
    // when their base service (e.g. "iam") is in the filter list.
    if (options.services) {
      const baseService = Object.keys(ADDITIONAL_VERSIONS).find((base) =>
        serviceName.startsWith(`${base}-`)
      );
      if (
        !options.services.includes(serviceName) &&
        !(baseService && options.services.includes(baseService))
      ) {
        continue;
      }
    }

    try {
      const doc = await readGcpDiscoveryDocument(`${schemasDir}/${entry.name}`);
      const resources = parseGcpDiscoveryDocument(doc);

      // Filter resources from additional-version schemas to only allowed paths
      const allowedPaths = ADDITIONAL_VERSION_RESOURCE_FILTER[serviceName];
      for (const resource of resources) {
        if (allowedPaths) {
          const matches = allowedPaths.some((prefix) =>
            prefix.length === resource.resourcePath.length &&
            prefix.every((seg, i) => seg === resource.resourcePath[i])
          );
          if (!matches) continue;
        }
        allResources.push(resource);
      }

      docCount++;
    } catch (e) {
      errors.push(`${serviceName}: ${e}`);
    }
  }

  console.log(
    `Loaded ${docCount} discovery documents, found ${allResources.length} resources`,
  );

  // CalVer date prefix
  const now = new Date();
  const datePrefix = `${now.getFullYear()}.${
    String(now.getMonth() + 1).padStart(2, "0")
  }.${String(now.getDate()).padStart(2, "0")}`;

  // Group resources by service
  const serviceResources = new Map<string, GcpParsedResource[]>();
  for (const resource of allResources) {
    if (!serviceResources.has(resource.service)) {
      serviceResources.set(resource.service, []);
    }
    serviceResources.get(resource.service)!.push(resource);
  }

  console.log(
    `Processing ${serviceResources.size} services...`,
  );

  // Generate models per service
  const services = new Map<string, GcpServiceGenerationResult>();

  for (const [serviceName, resources] of serviceResources) {
    const extensionName = `@swamp/gcp/${serviceName.toLowerCase()}`;
    const placeholderVersion = "VERSION_PLACEHOLDER";
    const serviceOutputDir = `${options.outputDir}/gcp/${serviceName}`;

    const models: GcpGeneratedFile[] = [];
    const modelChanges: GcpModelChange[] = [];

    // Detect shared lib changes before model loop — a lib change means
    // every model's runtime behavior changed even if its schema didn't.
    const libSourceCode = generateGcpLibFile();
    let libChanged = false;
    try {
      const existingLib = await Deno.readTextFile(
        `${serviceOutputDir}/extensions/models/_lib/gcp.ts`,
      );
      const formattedLib = await formatCode(libSourceCode);
      libChanged = existingLib !== formattedLib;
    } catch {
      libChanged = true;
    }

    for (const resource of resources) {
      try {
        // Build CfSchema-compatible wrapper for zodGenerator
        const cfSchema: CfSchema = {
          typeName: resource.typeName,
          description: resource.description,
          properties: resource.domainProperties,
          required: resource.requiredProperties,
          primaryIdentifier: resource.primaryIdentifier,
          handlers: {
            read: { permissions: [], timeoutInMinutes: 60 },
            ...(resource.handlers.create
              ? { create: { permissions: [], timeoutInMinutes: 60 } }
              : {}),
            ...(resource.handlers.update
              ? { update: { permissions: [], timeoutInMinutes: 60 } }
              : {}),
            ...(resource.handlers.delete
              ? { delete: { permissions: [], timeoutInMinutes: 60 } }
              : {}),
          },
        };

        const onlyProperties: OnlyProperties = {
          createOnly: resource.createOnlyProperties,
          readOnly: Object.keys(resource.resourceValueProperties).filter(
            (k) => !resource.domainProperties[k],
          ),
          writeOnly: Object.keys(resource.domainProperties).filter(
            (k) => !resource.resourceValueProperties[k],
          ),
          primaryIdentifier: resource.primaryIdentifier,
        };

        const zodResult = generateZodSchemas(
          resource.domainProperties,
          resource.resourceValueProperties,
          cfSchema,
          onlyProperties,
          { maxDepth: 5 },
        );

        const modelSlug = resourcePathToModelSlug(resource.resourcePath);
        const modelType = `${extensionName}/${modelSlug}`;
        const fileName = `${resourcePathToFileName(resource.resourcePath)}.ts`;
        const filePath = `extensions/models/${fileName}`;

        // Look up enrichment for this resource
        const enrichmentResourceId = `${resource.service}.${
          resource.resourcePath.join(".")
        }`;
        const rawEnrichment = getEnrichment(enrichmentResourceId);
        const enrichment = rawEnrichment
          ? {
            source: await parseEnrichmentSource(rawEnrichment.sourceFile),
            methodsExport: rawEnrichment.methodsExport,
          }
          : undefined;

        // Generate with placeholder version for change detection
        const candidateCode = generateGcpExtensionModel({
          resource,
          zodResult,
          onlyProperties,
          version: placeholderVersion,
          modelType,
          extensionName,
          enrichment,
        });

        const versionResult = await computeModelVersion(
          serviceOutputDir,
          filePath,
          datePrefix,
          candidateCode,
          placeholderVersion,
        );

        // When the shared lib changed, force a version bump on models
        // whose schema is otherwise unchanged — the runtime behavior changed.
        let { version, status } = versionResult;
        const { existingContent } = versionResult;
        if (libChanged && status === "unchanged" && existingContent) {
          const existingVersion = existingContent.match(
            /version:\s*"(\d{4}\.\d{2}\.\d{2})\.(\d+)"/,
          );
          if (existingVersion) {
            const existingDate = existingVersion[1];
            const existingMicro = parseInt(existingVersion[2], 10);
            version = existingDate === datePrefix
              ? `${datePrefix}.${existingMicro + 1}`
              : `${datePrefix}.1`;
          } else {
            version = `${datePrefix}.1`;
          }
          status = "changed";
        }

        // Compute new GlobalArgs field names for upgrade diffing
        const { synthetic: isSyntheticName } = resolveGcpNamingField(
          resource,
        );
        const newFieldNames = [
          ...(isSyntheticName ? ["name"] : []),
          ...Object.keys(resource.domainProperties),
        ];

        const upgradesBlock = computeUpgradesBlock(
          status,
          version,
          existingContent,
          newFieldNames,
        );

        // Generate final code with real version and upgrades
        const sourceCode = generateGcpExtensionModel({
          resource,
          zodResult,
          onlyProperties,
          version,
          modelType,
          extensionName,
          upgradesBlock,
          enrichment,
        });

        models.push({ filePath, sourceCode });
        modelChanges.push({ fileName, status });
      } catch (error) {
        errors.push(`${resource.typeName}: ${error}`);
      }
    }

    if (models.length === 0) continue;

    // Reuse the lib source generated earlier for change detection
    const libFile: GcpGeneratedFile = {
      filePath: "extensions/models/_lib/gcp.ts",
      sourceCode: libSourceCode,
    };

    // Generate README
    const firstModel = [...models].sort((a, b) =>
      a.filePath.localeCompare(b.filePath)
    )[0];
    const readmeModelSlug = firstModel.filePath.split("/").pop()!.replace(
      ".ts",
      "",
    );
    const readmeModelType = `${extensionName}/${readmeModelSlug}`;

    const readmeFile: GcpGeneratedFile = {
      filePath: "README.md",
      sourceCode: generateGcpReadme(
        serviceName,
        extensionName,
        readmeModelSlug,
        readmeModelType,
      ),
    };
    const licenseFile: GcpGeneratedFile = {
      filePath: "LICENSE.txt",
      sourceCode: generateLicense(),
    };
    const enrichmentImports = getServiceEnrichmentImports(
      resources.map((r) => ({
        resourceId: `${r.service}.${r.resourcePath.join(".")}`,
      })),
    );
    const denoConfigFile: GcpGeneratedFile = {
      filePath: "deno.json",
      sourceCode: generateGcpDenoConfig(enrichmentImports),
    };

    // Detect README/LICENSE changes
    let readmeChanged = false;
    let licenseChanged = false;
    try {
      const existingReadme = await Deno.readTextFile(
        `${serviceOutputDir}/README.md`,
      );
      const formattedReadme = await formatFile(readmeFile.sourceCode, ".md");
      readmeChanged = existingReadme !== formattedReadme;
    } catch {
      readmeChanged = true;
    }
    try {
      const existingLicense = await Deno.readTextFile(
        `${serviceOutputDir}/LICENSE.txt`,
      );
      licenseChanged = existingLicense !== licenseFile.sourceCode;
    } catch {
      licenseChanged = true;
    }

    // Build release notes
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

    // Compute manifest version
    const additionalFiles = ["LICENSE.txt", "README.md"];
    const modelFileNames = models.map((m) =>
      m.filePath.replace("extensions/models/", "")
    );
    const candidateManifest = generateManifest({
      name: extensionName,
      version: placeholderVersion,
      description: `Google Cloud ${serviceName} infrastructure models`,
      labels: [
        "gcp",
        "google-cloud",
        serviceName.toLowerCase(),
        "cloud",
        "infrastructure",
      ],
      modelFiles: modelFileNames,
      additionalFiles,
      releaseNotes,
      repository: "https://github.com/systeminit/swamp-extensions",
      platforms: [],
    });
    const hasChangedModels = modelChanges.some((c) =>
      c.status === "new" || c.status === "changed"
    );
    const hasChanges = hasChangedModels || libChanged || readmeChanged ||
      licenseChanged;
    const manifestVersion = await computeManifestVersion(
      serviceOutputDir,
      "manifest.yaml",
      datePrefix,
      candidateManifest,
      placeholderVersion,
      hasChanges,
    );
    const manifestSource = generateManifest({
      name: extensionName,
      version: manifestVersion,
      description: `Google Cloud ${serviceName} infrastructure models`,
      labels: [
        "gcp",
        "google-cloud",
        serviceName.toLowerCase(),
        "cloud",
        "infrastructure",
      ],
      modelFiles: modelFileNames,
      additionalFiles,
      releaseNotes,
      repository: "https://github.com/systeminit/swamp-extensions",
      platforms: [],
    });
    const manifest: GcpGeneratedFile = {
      filePath: "manifest.yaml",
      sourceCode: manifestSource,
    };

    services.set(serviceName, {
      serviceName,
      models,
      libFile,
      manifest,
      readmeFile,
      licenseFile,
      denoConfigFile,
      modelChanges,
      hasChanges,
    });
  }

  return { datePrefix, services, skipped, errors };
}

// === DISCOVERY DOCUMENT LOADING ===

/**
 * Reads and dereferences a GCP Discovery Document from disk.
 */
export async function readGcpDiscoveryDocument(
  filePath: string,
): Promise<GcpDiscoveryDocument> {
  const content = await Deno.readTextFile(filePath);
  const doc = JSON.parse(content) as RawGcpDiscoveryDocument;
  return dereferenceGcpDiscoveryDocument(doc);
}

function dereferenceGcpDiscoveryDocument(
  doc: RawGcpDiscoveryDocument,
): GcpDiscoveryDocument {
  const schemas = doc.schemas || {};
  const dereferencedSchemas = dereferenceSchemas(schemas);

  return {
    ...doc,
    schemas: dereferencedSchemas,
    resources: doc.resources
      ? dereferenceResources(doc.resources, dereferencedSchemas)
      : undefined,
    methods: doc.methods
      ? dereferenceMethods(doc.methods, dereferencedSchemas)
      : undefined,
  };
}

function dereferenceSchemas(
  schemas: Record<string, NormalizedGcpSchema>,
): Record<string, NormalizedGcpSchema> {
  const dereferenced: Record<string, NormalizedGcpSchema> = {};
  for (const [name, schema] of Object.entries(schemas)) {
    dereferenced[name] = dereferenceSchema(schema, schemas, new Set());
  }
  return dereferenced;
}

function dereferenceSchema(
  schema: NormalizedGcpSchema,
  allSchemas: Record<string, NormalizedGcpSchema>,
  visited: Set<string>,
): NormalizedGcpSchema {
  if (schema.$ref) {
    if (visited.has(schema.$ref)) {
      return {
        type: "object",
        description: `Circular reference to ${schema.$ref}`,
      };
    }
    visited.add(schema.$ref);
    const referencedSchema = allSchemas[schema.$ref];
    if (referencedSchema) {
      return dereferenceSchema(referencedSchema, allSchemas, visited);
    }
  }

  const dereferenced: NormalizedGcpSchema = { ...schema };

  if (schema.properties) {
    dereferenced.properties = {};
    for (const [key, value] of Object.entries(schema.properties)) {
      dereferenced.properties[key] = dereferenceSchema(
        value,
        allSchemas,
        new Set(visited),
      );
    }
  }

  if (schema.items && typeof schema.items === "object") {
    dereferenced.items = dereferenceSchema(
      schema.items,
      allSchemas,
      new Set(visited),
    );
  }

  if (
    schema.additionalProperties &&
    typeof schema.additionalProperties === "object"
  ) {
    dereferenced.additionalProperties = dereferenceSchema(
      schema.additionalProperties as NormalizedGcpSchema,
      allSchemas,
      new Set(visited),
    );
  }

  if (schema.allOf) {
    dereferenced.allOf = schema.allOf.map((s) =>
      dereferenceSchema(s, allSchemas, new Set(visited))
    );
  }
  if (schema.oneOf) {
    dereferenced.oneOf = schema.oneOf.map((s) =>
      dereferenceSchema(s, allSchemas, new Set(visited))
    );
  }
  if (schema.anyOf) {
    dereferenced.anyOf = schema.anyOf.map((s) =>
      dereferenceSchema(s, allSchemas, new Set(visited))
    );
  }

  return dereferenced;
}

function dereferenceMethods(
  methods: Record<string, RawGcpMethod>,
  schemas: Record<string, NormalizedGcpSchema>,
): Record<string, GcpMethod> {
  const dereferenced: Record<string, GcpMethod> = {};
  for (const [name, method] of Object.entries(methods)) {
    dereferenced[name] = {
      ...method,
      request: method.request ? schemas[method.request.$ref] : undefined,
      response: method.response ? schemas[method.response.$ref] : undefined,
    };
  }
  return dereferenced;
}

function dereferenceResources(
  resources: Record<string, RawGcpResource>,
  schemas: Record<string, NormalizedGcpSchema>,
): Record<string, GcpResource> {
  const dereferenced: Record<string, GcpResource> = {};
  for (const [name, resource] of Object.entries(resources)) {
    dereferenced[name] = {
      methods: resource.methods
        ? dereferenceMethods(resource.methods, schemas)
        : undefined,
      resources: resource.resources
        ? dereferenceResources(resource.resources, schemas)
        : undefined,
    };
  }
  return dereferenced;
}

// === RESOURCE PARSING ===

const SKIP_RESOURCE_PATTERNS = [/[Oo]perations?$/];

function shouldSkipResource(resourceName: string): boolean {
  return SKIP_RESOURCE_PATTERNS.some((pattern) => pattern.test(resourceName));
}

const SCOPE_PREFIXES = [
  "projects",
  "organizations",
  "folders",
  "billingAccounts",
];

const STRIP_PATH_SEGMENTS = ["locations", "zones", "regions"];

const GLOBAL_ONLY_PATTERNS = [
  /only supported value for location is `global`/i,
  /Only global location is supported/i,
];

/**
 * Parses a GCP Discovery Document into resource definitions.
 */
export function parseGcpDiscoveryDocument(
  doc: GcpDiscoveryDocument,
): GcpParsedResource[] {
  const resources: GcpParsedResource[] = [];

  if (!doc.resources && !doc.methods) return resources;

  // Collect all resources recursively
  const resourceSpecs: ResourceSpec[] = [];
  if (doc.resources) {
    collectResources(doc.resources, [], resourceSpecs);
  }

  // Deduplicate scoped resources
  const deduplicatedSpecs = deduplicateScopedResources(resourceSpecs);

  // Build each resource
  for (const spec of deduplicatedSpecs) {
    try {
      const parsed = buildGcpParsedResource(spec, doc);
      if (parsed) {
        resources.push(parsed);
      }
    } catch (_e) {
      // Continue processing other resources
    }
  }

  return resources;
}

function collectResources(
  resources: Record<string, GcpResource>,
  parentPath: string[],
  collected: ResourceSpec[],
) {
  for (const [resourceName, resource] of Object.entries(resources)) {
    if (shouldSkipResource(resourceName)) continue;

    const resourcePath = [...parentPath, resourceName];

    if (resource.methods) {
      const methods = extractMethodsFromResource(resource.methods);

      if (methods.get || methods.list || methods.insert) {
        const handlers: GcpResourceHandlers = {
          create: !!methods.insert,
          read: !!(methods.get || methods.list),
          update: !!(methods.update || methods.patch),
          delete: !!methods.delete,
        };

        collected.push({
          resourceName,
          resourcePath,
          ...methods,
          handlers,
        });
      }
    }

    if (resource.resources) {
      collectResources(resource.resources, resourcePath, collected);
    }
  }
}

function deduplicateScopedResources(
  resourceSpecs: ResourceSpec[],
): ResourceSpec[] {
  const byStrippedPath = new Map<
    string,
    { spec: ResourceSpec; scopes: string[] }
  >();

  for (const spec of resourceSpecs) {
    const scope = getScopePrefix(spec.resourcePath);
    const strippedPath = stripScopePrefix(spec.resourcePath);
    const key = strippedPath.join(".");

    if (byStrippedPath.has(key)) {
      const existing = byStrippedPath.get(key)!;
      if (scope && !existing.scopes.includes(scope)) {
        existing.scopes.push(scope);
      }
    } else {
      byStrippedPath.set(key, {
        spec: {
          ...spec,
          resourcePath: strippedPath,
          resourceName: spec.resourceName,
        },
        scopes: scope ? [scope] : [],
      });
    }
  }

  return Array.from(byStrippedPath.values()).map(({ spec, scopes }) => ({
    ...spec,
    availableScopes: scopes.length > 0 ? scopes : undefined,
  }));
}

function getScopePrefix(resourcePath: string[]): string | null {
  if (resourcePath.length === 0) return null;
  const firstSegment = resourcePath[0].toLowerCase();
  return SCOPE_PREFIXES.find((p) => firstSegment === p.toLowerCase()) || null;
}

function stripScopePrefix(resourcePath: string[]): string[] {
  let path = resourcePath;

  const scope = getScopePrefix(path);
  if (scope && path.length > 1) {
    path = path.slice(1);
  }

  const filtered = path.filter((segment) =>
    !STRIP_PATH_SEGMENTS.some((strip) =>
      segment.toLowerCase() === strip.toLowerCase()
    )
  );

  if (filtered.length === 0 && path.length > 0) {
    return [path[path.length - 1]];
  }

  return filtered;
}

function isGlobalOnlyResource(methods: GcpResourceMethods): boolean {
  const allMethods = [
    methods.get,
    methods.insert,
    methods.update,
    methods.patch,
    methods.delete,
    methods.list,
  ].filter(Boolean) as GcpMethod[];

  for (const method of allMethods) {
    if (method.description) {
      for (const pattern of GLOBAL_ONLY_PATTERNS) {
        if (pattern.test(method.description)) return true;
      }
    }
  }
  return false;
}

// CRUD method names that are handled specially
const CRUD_METHOD_NAMES = new Set([
  "get",
  "list",
  "aggregatedlist",
  "listall",
  "insert",
  "create",
  "update",
  "patch",
  "delete",
]);

export function extractMethodsFromResource(
  methods: Record<string, GcpMethod>,
): GcpResourceMethods {
  const result: GcpResourceMethods = {
    actionMethods: {},
  };

  for (const [methodName, method] of Object.entries(methods)) {
    const lowerName = methodName.toLowerCase();

    switch (lowerName) {
      case "get":
        result.get = method;
        break;
      case "list":
      case "aggregatedlist":
      case "listall":
        result.list = method;
        break;
      case "insert":
      case "create":
        result.insert = method;
        break;
      case "update":
        result.update = method;
        break;
      case "patch":
        result.patch = method;
        break;
      case "delete":
        result.delete = method;
        break;
      default:
        // Non-standard delete methods
        if (
          !result.delete &&
          (lowerName.startsWith("delete") || lowerName.startsWith("remove"))
        ) {
          result.delete = method;
        } else if (
          !CRUD_METHOD_NAMES.has(lowerName) &&
          !lowerName.startsWith("delete") &&
          !lowerName.startsWith("remove")
        ) {
          // Collect as action method
          result.actionMethods[methodName] = method;
        }
        break;
    }
  }

  return result;
}

function buildGcpParsedResource(
  spec: ResourceSpec,
  doc: GcpDiscoveryDocument,
): GcpParsedResource | null {
  const {
    resourcePath,
    get: getMethod,
    insert,
    update,
    patch,
    delete: deleteMethod,
    list,
    handlers,
    availableScopes,
  } = spec;

  if (!getMethod && !list) return null;

  // Get response schema for resource value properties
  let resourceSchema: NormalizedGcpSchema | undefined;

  if (getMethod?.response) {
    resourceSchema = getMethod.response;
  } else if (list?.response) {
    const listResponse = list.response;
    if (listResponse.properties) {
      for (
        const [_propName, propDef] of Object.entries(
          listResponse.properties,
        )
      ) {
        if (propDef.type === "array" && propDef.items) {
          resourceSchema = propDef.items;
          break;
        }
      }
    }
  }

  if (!resourceSchema) return null;

  const listOnly = !getMethod;

  // Build resource value properties
  const resourceValueProperties = gcpSchemaToCfProperties(resourceSchema);

  // Build domain properties from insert/update/patch, tracking provenance
  const domainProperties: Record<string, CfProperty> = {};
  const insertPropertyNames = new Set<string>();
  const updatePropertyNames = new Set<string>();

  if (insert?.request) {
    const insertProps = gcpSchemaToCfProperties(insert.request);
    for (const name of Object.keys(insertProps)) {
      insertPropertyNames.add(name);
    }
    Object.assign(domainProperties, insertProps);
  }
  if (update?.request) {
    const updateProps = gcpSchemaToCfProperties(update.request);
    for (const name of Object.keys(updateProps)) {
      updatePropertyNames.add(name);
    }
    Object.assign(domainProperties, updateProps);
  }
  if (patch?.request) {
    const patchProps = gcpSchemaToCfProperties(patch.request);
    for (const name of Object.keys(patchProps)) {
      updatePropertyNames.add(name);
    }
    Object.assign(domainProperties, patchProps);
  }

  // Add path parameters from insert.parameterOrder
  const skipPathParams = new Set([
    "project",
    "projectId",
    "parent",
    "ownerName",
  ]);
  const addedPathOnlyParams: string[] = [];

  for (const paramName of insert?.parameterOrder || []) {
    if (skipPathParams.has(paramName)) continue;
    const param = insert?.parameters?.[paramName];
    if (param?.deprecated === true) continue;

    const existingProp = domainProperties[paramName];
    const isReadOnly = existingProp &&
      (existingProp as CfProperty & { readOnly?: boolean }).readOnly;

    if (!existingProp || isReadOnly) {
      domainProperties[paramName] = {
        type: "string",
        description: param?.description ||
          `The ${paramName} for this resource`,
      };
      addedPathOnlyParams.push(paramName);
    }
    insertPropertyNames.add(paramName);
  }

  // Add required query parameters from insert
  if (insert?.parameters) {
    for (const [paramName, param] of Object.entries(insert.parameters)) {
      if (param.location !== "query") continue;
      if (paramName === "validateOnly") continue;
      if (param.deprecated === true) continue;
      if (domainProperties[paramName]) continue;

      insertPropertyNames.add(paramName);
      domainProperties[paramName] = {
        type: "string",
        description: param.description ||
          `The ${paramName} for this resource`,
      };
    }
  }

  // Remove read-only properties from domain
  for (const [name, prop] of Object.entries(domainProperties)) {
    if ((prop as CfProperty & { readOnly?: boolean }).readOnly) {
      delete domainProperties[name];
    }
  }

  // Remove output-only properties
  const outputOnlyProps = new Set(detectOutputOnlyProperties(insert?.request));
  const insertPathParams = new Set(insert?.parameterOrder || []);
  for (const name of Object.keys(domainProperties)) {
    if (outputOnlyProps.has(name) && !insertPathParams.has(name)) {
      delete domainProperties[name];
    }
  }

  // Remove deprecated properties
  const deprecatedProps = new Set([
    ...detectDeprecatedProperties(insert?.request),
    ...detectDeprecatedProperties(update?.request),
    ...detectDeprecatedProperties(patch?.request),
  ]);
  for (const name of Object.keys(domainProperties)) {
    if (deprecatedProps.has(name)) {
      delete domainProperties[name];
    }
  }

  // Handle parent property (including ownerName as a parent-like alias)
  const insertParams = insert?.parameterOrder || [];
  const listParams = list?.parameterOrder || [];
  const hasParentParam = (params: string[]) =>
    params.includes("parent") || params.includes("ownerName");
  const apiNeedsParent =
    (hasParentParam(insertParams) || hasParentParam(listParams)) &&
    !domainProperties["parent"];
  const isProjectOnly = availableScopes?.length === 1 &&
    availableScopes[0] === "projects";
  const needsExplicitParent = apiNeedsParent && !isProjectOnly;

  if (needsExplicitParent) {
    domainProperties["parent"] = {
      type: "string",
      description:
        "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
    };
  }

  // Handle global-only and location properties
  const isGlobalOnly = isGlobalOnlyResource(spec);
  if (isProjectOnly && isGlobalOnly && !domainProperties["location"]) {
    domainProperties["location"] = {
      type: "string",
      description:
        "The location for this resource (this resource only supports 'global')",
      default: "global",
    };
  }

  // For {+name} resources, zone/region in domainProperties are body fields, not
  // path parameters — location is still needed to construct the parent path.
  const getPath = getMethod?.path || "";
  const getParams = getMethod?.parameterOrder || [];
  const usesFullName = getPath.includes("{+name}") &&
    getParams.length === 1 && getParams[0] === "name";

  if (
    isProjectOnly &&
    apiNeedsParent &&
    !isGlobalOnly &&
    !domainProperties["location"] &&
    (usesFullName || (!domainProperties["region"] && !domainProperties["zone"]))
  ) {
    domainProperties["location"] = {
      type: "string",
      description:
        "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
    };
  }

  // Determine primary identifier
  const primaryIdentifier = determinePrimaryIdentifier(
    getMethod || list || insert,
  );

  // Determine required properties
  const requiredProperties: string[] = [];
  const requiredSet = new Set<string>();

  for (
    const prop of resourceSchema.required || insert?.request?.required || []
  ) {
    requiredSet.add(prop);
  }

  if (insert?.request?.properties) {
    const insertMethodId = insert.id;
    for (
      const [propName, propDef] of Object.entries(insert.request.properties)
    ) {
      if (propDef.annotations?.required?.includes(insertMethodId)) {
        requiredSet.add(propName);
      }
    }
  }

  for (const paramName of addedPathOnlyParams) {
    requiredSet.add(paramName);
  }

  // Only include required properties that are in the domain
  for (const name of requiredSet) {
    if (domainProperties[name]) {
      requiredProperties.push(name);
    }
  }

  // Detect createOnly properties
  const createOnlyProperties = detectCreateOnlyProperties(insert?.request)
    .filter((p) => domainProperties[p]);

  // Build method configs for runtime URL building
  const methodConfigs: GcpMethodConfigs = {};
  if (getMethod) methodConfigs.get = extractMethodConfig(getMethod);
  if (insert) methodConfigs.insert = extractMethodConfig(insert);
  if (update) methodConfigs.update = extractMethodConfig(update);
  if (patch) methodConfigs.patch = extractMethodConfig(patch);
  if (deleteMethod) methodConfigs.delete = extractMethodConfig(deleteMethod);
  if (list) methodConfigs.list = extractMethodConfig(list);

  // Extract list method metadata for list factory method generation.
  // Detect the response array field (must be an array of objects, not primitives)
  // and collect query parameters (excluding pagination internals and deprecated).
  let listResponseArrayField: string | undefined;
  let listQueryParams:
    | Array<{
      name: string;
      type: string;
      description?: string;
      required?: boolean;
    }>
    | undefined;

  if (list?.response?.properties) {
    for (
      const [propName, propDef] of Object.entries(list.response.properties)
    ) {
      if (
        propDef.type === "array" && propDef.items &&
        (propDef.items.type === "object" || propDef.items.properties)
      ) {
        listResponseArrayField = propName;
        break;
      }
    }
  }

  if (listResponseArrayField && list?.parameters) {
    const skipParams = new Set([
      "pageToken",
      "alt",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "fields",
      "uploadType",
      "upload_protocol",
    ]);
    listQueryParams = [];
    for (const [paramName, param] of Object.entries(list.parameters)) {
      if (param.location !== "query") continue;
      if (skipParams.has(paramName)) continue;
      if (param.deprecated === true) continue;
      listQueryParams.push({
        name: paramName,
        type: param.type || "string",
        description: param.description,
        required: param.required,
      });
    }
    if (listQueryParams.length === 0) listQueryParams = undefined;
  }

  const typeName = buildGcpTypeName(doc.title || doc.name, resourcePath);
  const description = normalizeDescription(
    resourceSchema.description ||
      getMethod?.description ||
      list?.description ||
      `GCP ${doc.name} ${titleCaseResourcePath(resourcePath)} resource`,
  );

  return {
    service: doc.name,
    apiTitle: doc.title || doc.name,
    apiVersion: doc.version,
    baseUrl: doc.baseUrl,
    documentationLink: doc.documentationLink,
    resourcePath,
    typeName,
    description,
    domainProperties: sanitizePropertyNames(domainProperties),
    resourceValueProperties: sanitizePropertyNames(resourceValueProperties),
    requiredProperties: requiredProperties.map(sanitizePropertyName),
    createOnlyProperties: createOnlyProperties.map(sanitizePropertyName),
    insertProperties: new Set(
      [...insertPropertyNames].map(sanitizePropertyName),
    ),
    updateProperties: new Set(
      [...updatePropertyNames].map(sanitizePropertyName),
    ),
    primaryIdentifier,
    handlers,
    availableScopes,
    isGlobalOnly,
    listOnly,
    methodConfigs,
    actionMethods: buildActionMethods(spec.actionMethods || {}, doc),
    readiness: detectReadinessConfig(resourceSchema),
    ...detectFullResourceNamePattern(getMethod, list, insert),
    listQueryParams,
    listResponseArrayField,
  };
}

/**
 * Detect whether this resource uses the {+name} pattern where name is a
 * fully-qualified resource path.
 *
 * Returns usesFullResourceName=true and a resourceSegment when:
 * - GET path uses {+name} with just "name" in parameterOrder
 * - LIST or CREATE path reveals the resource segment (e.g., "services" from
 *   "v1/{+parent}/services")
 */
// Well-known status values that indicate a resource is ready (stable state)
const READY_STATUS_VALUES = new Set([
  "ACTIVE",
  "RUNNING",
  "READY",
  "ENABLED",
  "SUCCEEDED",
  "DONE",
  "COMPLETED",
  "AVAILABLE",
  "RUNNABLE",
  "SERVING",
  "UP",
  "ONLINE",
  "RECONCILING", // GKE: reconciling is operational, just updating
]);

// Well-known status values that indicate a resource has failed
const FAILED_STATUS_VALUES = new Set([
  "FAILED",
  "ERROR",
  "DEGRADED",
  "STOPPED",
  "TERMINATED",
  "BROKEN",
  "UNRECOVERABLE",
]);

/**
 * Detect readiness polling config from the resource schema.
 * Looks for a top-level `status` or `state` enum field with recognizable
 * ready/failed values.
 */
function detectReadinessConfig(
  resourceSchema: NormalizedGcpSchema,
):
  | { statusField: string; readyValues: string[]; failedValues: string[] }
  | undefined {
  if (!resourceSchema.properties) return undefined;

  // Check status and state fields (in priority order)
  for (const fieldName of ["status", "state", "lifecycleState"]) {
    const prop = resourceSchema.properties[fieldName];
    if (!prop?.enum || !Array.isArray(prop.enum)) continue;

    const enumValues = prop.enum as string[];
    const readyValues = enumValues.filter((v) => READY_STATUS_VALUES.has(v));
    const failedValues = enumValues.filter((v) => FAILED_STATUS_VALUES.has(v));

    // Only use readiness config if we found at least one ready value
    if (readyValues.length > 0) {
      return { statusField: fieldName, readyValues, failedValues };
    }
  }

  return undefined;
}

function detectFullResourceNamePattern(
  getMethod: GcpMethod | undefined,
  listMethod: GcpMethod | undefined,
  createMethod: GcpMethod | undefined,
): { usesFullResourceName: boolean; resourceSegment?: string } {
  // Check if GET uses {+name} as sole path parameter
  const getPath = getMethod?.path || "";
  const getParams = getMethod?.parameterOrder || [];
  const usesFullName = getPath.includes("{+name}") &&
    getParams.length === 1 && getParams[0] === "name";

  if (!usesFullName) {
    return { usesFullResourceName: false };
  }

  // Extract resource segment from list or create path
  // Pattern: "v1/{+parent}/resourceSegment" or "v1/{+parent}/resourceSegment"
  const refPath = listMethod?.path || createMethod?.path || "";
  const segmentMatch = refPath.match(
    /\{[+]?(?:parent|ownerName)\}\/([a-zA-Z]+)\s*$/,
  );
  if (segmentMatch) {
    return {
      usesFullResourceName: true,
      resourceSegment: segmentMatch[1],
    };
  }

  // Fallback: try to extract from the resource path itself
  // (last segment of the resource tree is usually the resource segment)
  return { usesFullResourceName: true };
}

/**
 * Build action method definitions from non-CRUD GCP methods.
 */
function buildActionMethods(
  actionMethods: Record<string, GcpMethod>,
  _doc: GcpDiscoveryDocument,
): GcpActionMethod[] {
  const result: GcpActionMethod[] = [];

  for (const [name, method] of Object.entries(actionMethods)) {
    // Extract request body properties if present
    let requestProperties: Record<string, CfProperty> = {};
    const requiredProperties: string[] = [];

    if (method.request?.properties) {
      requestProperties = gcpSchemaToCfProperties(method.request);

      // Detect required properties
      if (method.request.required) {
        for (const req of method.request.required) {
          if (requestProperties[req]) {
            requiredProperties.push(req);
          }
        }
      }
    }

    result.push({
      name,
      description: normalizeDescription(
        method.description || `${name} action`,
      ),
      config: extractMethodConfig(method),
      requestProperties,
      requiredProperties,
    });
  }

  // Sort alphabetically for deterministic output
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

function extractMethodConfig(method: GcpMethod): GcpMethodConfig {
  const parameters: Record<
    string,
    { location: string; required?: boolean }
  > = {};
  if (method.parameters) {
    for (const [name, param] of Object.entries(method.parameters)) {
      parameters[name] = {
        location: param.location,
        required: param.required,
      };
    }
  }

  return {
    id: method.id,
    path: method.path,
    httpMethod: method.httpMethod,
    parameterOrder: method.parameterOrder || [],
    parameters,
  };
}

// === PROPERTY NORMALIZATION: GCP → CfProperty ===

/**
 * Converts a GCP schema's properties into CfProperty records.
 */
function gcpSchemaToCfProperties(
  schema: NormalizedGcpSchema,
): Record<string, CfProperty> {
  if (!schema.properties) return {};

  const result: Record<string, CfProperty> = {};
  for (const [name, prop] of Object.entries(schema.properties)) {
    // Sanitize property names that are invalid as bare JS identifiers.
    // GCP Discovery Documents sometimes have:
    //   - Dotted names: "header.bypassBillingFilter", "encryptionConfig.encryptionType"
    //   - Hyphenated names: "end-date", "max-results", "bulk-export-group"
    // Replace dots and hyphens with underscores so the generated Zod schemas
    // produce valid TypeScript.
    const safeName = sanitizePropertyName(name);
    result[safeName] = normalizeGcpToCfProperty(prop);
  }
  return result;
}

/**
 * Sanitize a GCP property name to be a valid JavaScript identifier.
 * Replaces dots, hyphens, and other invalid chars with underscores.
 */
function sanitizePropertyName(name: string): string {
  // Replace characters that are invalid in bare JS identifiers
  return name.replace(/[.\-/]/g, "_");
}

/**
 * Sanitize all keys in a CfProperty record.
 */
function sanitizePropertyNames(
  props: Record<string, CfProperty>,
): Record<string, CfProperty> {
  const result: Record<string, CfProperty> = {};
  for (const [name, prop] of Object.entries(props)) {
    result[sanitizePropertyName(name)] = prop;
  }
  return result;
}

/**
 * Normalizes a single GCP Discovery property into a CfProperty.
 */
function normalizeGcpToCfProperty(
  prop: NormalizedGcpSchema,
): CfProperty {
  const normalized = normalizeGcpProperty(prop);
  return gcpPropertyToCf(normalized);
}

/**
 * Normalizes GCP-specific property quirks (formats, types, etc.).
 */
export function normalizeGcpProperty(
  prop: NormalizedGcpSchema,
): NormalizedGcpSchema {
  const normalized: NormalizedGcpSchema = { ...prop };

  // Normalize descriptions
  if (normalized.description) {
    normalized.description = normalizeDescription(normalized.description);
  }

  // Transform "any" type to "string"
  if (normalized.type === "any") {
    normalized.type = "string";
  }

  // Normalize formats
  if (normalized.format) {
    const format = normalized.format;

    if (
      normalized.type === "integer" &&
      ["int32", "int64", "uint32", "uint64"].includes(format)
    ) {
      delete normalized.format;
    } else if (
      normalized.type === "number" &&
      ["float", "double", "decimal"].includes(format)
    ) {
      normalized.format = "double";
    } else if (
      normalized.type === "string" &&
      ["date-time", "date-time-rfc1123", "google-datetime"].includes(format)
    ) {
      normalized.format = "date-time";
    } else if (
      normalized.type === "string" &&
      ["uri", "url"].includes(format)
    ) {
      normalized.format = "uri";
    } else if (
      [
        "uuid",
        "email",
        "duration",
        "google-duration",
        "google-fieldmask",
        "date",
        "time",
        "byte",
        "binary",
        "password",
        "int32",
        "int64",
        "uint32",
        "uint64",
      ].includes(format)
    ) {
      delete normalized.format;
    }
  }

  // Parse min/max from strings (GCP sometimes has string-typed values)
  if (
    normalized.minimum !== undefined && typeof normalized.minimum === "string"
  ) {
    normalized.minimum = parseFloat(normalized.minimum as unknown as string);
  }
  if (
    normalized.maximum !== undefined && typeof normalized.maximum === "string"
  ) {
    normalized.maximum = parseFloat(normalized.maximum as unknown as string);
  }

  // Recursively normalize nested structures
  if (prop.properties) {
    normalized.properties = {};
    for (const [key, value] of Object.entries(prop.properties)) {
      normalized.properties[key] = normalizeGcpProperty(value);
    }
  }

  if (prop.items && typeof prop.items === "object") {
    normalized.items = normalizeGcpProperty(prop.items);
  }

  if (
    prop.additionalProperties &&
    typeof prop.additionalProperties === "object"
  ) {
    normalized.additionalProperties = normalizeGcpProperty(
      prop.additionalProperties as NormalizedGcpSchema,
    );
  }

  return normalized;
}

/**
 * Converts a normalized GCP property to CfProperty.
 */
function gcpPropertyToCf(prop: NormalizedGcpSchema): CfProperty {
  const type = prop.type || "string";

  switch (type) {
    case "string":
      return {
        type: "string",
        description: prop.description,
        enum: prop.enum,
        pattern: prop.pattern,
        minLength: prop.minLength,
        maxLength: prop.maxLength,
        format: prop.format,
        default: prop.default as string | undefined,
      };

    case "integer":
      return {
        type: "integer",
        description: prop.description,
        minimum: prop.minimum,
        maximum: prop.maximum,
        format: prop.format,
      };

    case "number":
      return {
        type: "number",
        description: prop.description,
        minimum: prop.minimum,
        maximum: prop.maximum,
        format: prop.format,
      };

    case "boolean":
      return {
        type: "boolean",
        description: prop.description,
      };

    case "array": {
      const items = prop.items
        ? gcpPropertyToCf(prop.items)
        : { type: "string" as const };
      return {
        type: "array",
        description: prop.description,
        items,
      };
    }

    case "object": {
      const result: CfProperty = {
        type: "object",
        description: prop.description,
      };

      if (prop.properties) {
        const cfProps: Record<string, CfProperty> = {};
        for (const [name, p] of Object.entries(prop.properties)) {
          cfProps[sanitizePropertyName(name)] = gcpPropertyToCf(p);
        }
        (result as { properties: Record<string, CfProperty> }).properties =
          cfProps;
      }

      if (prop.additionalProperties) {
        if (typeof prop.additionalProperties === "boolean") {
          (result as { additionalProperties: boolean })
            .additionalProperties = prop.additionalProperties;
        } else {
          (result as { additionalProperties: CfProperty })
            .additionalProperties = gcpPropertyToCf(
              prop.additionalProperties,
            );
        }
      }

      if (prop.required) {
        (result as { required: string[] }).required = prop.required;
      }

      // Carry title through for zodGenerator extraction
      if (prop.title) {
        (result as { title: string }).title = prop.title;
      }

      return result;
    }

    default:
      // Unknown type → treat as string
      return {
        type: "string",
        description: prop.description,
      };
  }
}

// === DETECTION UTILITIES ===

export function detectCreateOnlyProperties(
  schema: NormalizedGcpSchema | undefined,
): string[] {
  const createOnlyProps: string[] = [];
  if (!schema?.properties) return createOnlyProps;

  for (const [propName, propDef] of Object.entries(schema.properties)) {
    const rawDescription = propDef?.description || "";
    const description = rawDescription.replace(/\n/g, " ");

    const hasCreateOnlyPattern =
      /\bimmutable\b|((can|must) be )?set (only )?(at|on|during).*(resource )?(creation|creat)|((can|could|must) be )?specified (only )?(at|on|during).*(resource )?(creation|creat)|cannot be (chang|modif|updat)|must be set (at|on) creation and cannot be chang/i
        .test(description);
    const hasUpdateablePattern =
      /\b(and|or) (be )?(updated|changed|modified)\b/i.test(description);
    const isCreateOnly = hasCreateOnlyPattern && !hasUpdateablePattern;

    if (isCreateOnly) {
      createOnlyProps.push(propName);
    }
  }

  return createOnlyProps;
}

export function detectOutputOnlyProperties(
  schema: NormalizedGcpSchema | undefined,
): string[] {
  const outputOnlyProps: string[] = [];
  const KNOWN_OUTPUT_ONLY = new Set(["kind", "etag", "selfLink"]);

  if (!schema?.properties) return outputOnlyProps;

  for (const [propName, propDef] of Object.entries(schema.properties)) {
    if (KNOWN_OUTPUT_ONLY.has(propName)) {
      outputOnlyProps.push(propName);
      continue;
    }

    const rawDescription = propDef?.description || "";
    const description = rawDescription.replace(/\n/g, " ");

    const isOutputOnly =
      /\[Output Only\]|^Output only\.|is (a )?read only|read only property|\boutput only\b/i
        .test(description);

    if (isOutputOnly) {
      outputOnlyProps.push(propName);
    }
  }

  return outputOnlyProps;
}

export function detectDeprecatedProperties(
  schema: NormalizedGcpSchema | undefined,
): string[] {
  const deprecatedProps: string[] = [];
  if (!schema?.properties) return deprecatedProps;

  for (const [propName, propDef] of Object.entries(schema.properties)) {
    if (propDef?.deprecated === true) {
      deprecatedProps.push(propName);
    }
  }

  return deprecatedProps;
}

// === NAMING UTILITIES ===

export function cleanGcpApiTitle(title: string): string {
  return title
    .replace(/\s+API\s*$/i, "")
    .replace(/\s+API\s+/gi, " ")
    .replace(/\s+v\d+$/i, "")
    .replace(/\s+I{1,3}$/i, "")
    .trim();
}

export function deduplicateCloudWord(str: string): string {
  return str.replace(/\bCloud\s+Cloud\b/gi, "Cloud");
}

export function titleCaseResourcePath(segments: string[]): string {
  return segments
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(".");
}

export function buildGcpTypeName(
  title: string,
  resourcePath: string[],
): string {
  const cleanTitle = cleanGcpApiTitle(title);
  const fullResourceName = titleCaseResourcePath(resourcePath);
  return deduplicateCloudWord(`Google Cloud ${cleanTitle} ${fullResourceName}`);
}

function determinePrimaryIdentifier(
  method: GcpMethod | undefined,
): string[] {
  if (method?.parameterOrder && method.parameterOrder.length > 0) {
    const lastParam = method.parameterOrder[method.parameterOrder.length - 1];

    const identifierMap: Record<string, string> = {
      "name": "name",
      "resourceId": "id",
      "id": "id",
      "instanceId": "id",
      "diskId": "id",
      "networkId": "id",
    };

    return [identifierMap[lastParam] || "name"];
  }

  return ["name"];
}

/** Convert resource path to model slug, e.g., ["instances"] → "instances" */
export function resourcePathToModelSlug(resourcePath: string[]): string {
  return resourcePath.join("-").toLowerCase().replace(/_/g, "-");
}

/** Convert resource path to file name, e.g., ["instances"] → "instances" */
export function resourcePathToFileName(resourcePath: string[]): string {
  return resourcePath.join("_").toLowerCase();
}

// === HELPER UTILITIES ===

function normalizeDescription(desc: string | undefined): string {
  if (!desc) return "";
  return desc
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWithRetry(
  url: string,
  retries = 3,
  delayMs = 250,
  timeoutMs = 30000,
): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (retries > 0) {
          await response.text(); // drain body to release connection
          console.warn(
            `Fetch failed for ${url} with status ${response.status}. Retrying in ${delayMs}ms...`,
          );
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          return fetchWithRetry(url, retries - 1, delayMs * 2, timeoutMs);
        }
        throw new Error(
          `Fetch failed after multiple retries for ${url}: ${response.statusText}`,
        );
      }
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    if (retries > 0) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(
        `Fetch error for ${url}: ${message}. Retrying in ${delayMs}ms...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return fetchWithRetry(url, retries - 1, delayMs * 2, timeoutMs);
    }
    throw error;
  }
}

function selectBestVersion(versions: DiscoveryItem[]): DiscoveryItem {
  const preferred = versions.find((v) => v.preferred);
  if (preferred) return preferred;

  const stableVersions = versions.filter((v) =>
    !v.version.includes("alpha") && !v.version.includes("beta")
  );
  const candidates = stableVersions.length > 0 ? stableVersions : versions;
  candidates.sort((a, b) => b.version.localeCompare(a.version));
  return candidates[0];
}

function stableStringify(obj: unknown, space = 2): string {
  function sortKeys(value: unknown): unknown {
    if (value === null || typeof value !== "object") return value;
    if (Array.isArray(value)) return value.map(sortKeys);

    const sorted: Record<string, unknown> = {};
    const keys = Object.keys(value).sort();
    for (const key of keys) {
      sorted[key] = sortKeys((value as Record<string, unknown>)[key]);
    }
    return sorted;
  }

  return JSON.stringify(sortKeys(obj), null, space);
}
