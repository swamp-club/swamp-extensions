// Cloudflare provider pipeline — schema fetching and model generation
// Fetches the OpenAPI spec, dereferences $refs, parses endpoints,
// groups by service, extracts CRUD operations, and generates extension models.

import $RefParser from "@apidevtools/json-schema-ref-parser";
import { dirname } from "@std/path";
import { generateCloudflareExtensionModel } from "./extensionModelGenerator.ts";
import { generateCloudflareLibFile } from "./libGenerator.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import {
  FIRST_PARTY_LICENSE,
  generateLicense,
} from "../shared/licenseGenerator.ts";
import { generateCloudflareDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateCloudflareReadme } from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";
import { serializeWithCycleDetection } from "../shared/serialize.ts";

// --- Standalone models ---
// Hand-written model source files that the pipeline copies into the output
// alongside auto-generated models. Source lives in codegen/cloudflare/standalone/
// and is emitted to model/cloudflare/<service>/ during generation, surviving
// orphan removal because the files are included in generatedFileNames.

interface StandaloneModelFile {
  /** Relative path within the service output dir (e.g. "extensions/models/http_requests.ts") */
  outputPath: string;
  /** Absolute path to the source file in codegen/cloudflare/standalone/ */
  sourcePath: string;
}

interface StandaloneModelConfig {
  /** Service name (creates model/cloudflare/<service>/) */
  service: string;
  /** Model files to copy */
  models: StandaloneModelFile[];
  /** Lib files to copy (replaces the standard cloudflare.ts for this service) */
  libFiles: StandaloneModelFile[];
  /**
   * Absolute path to a hand-written README to ship instead of the generated
   * CRUD template. Use it when the model's methods are not create/get/update/
   * delete, since the template would describe methods the model lacks.
   */
  readmePath?: string;
  /** Description for the manifest */
  description: string;
  /** Labels for the manifest */
  labels: string[];
}

const STANDALONE_MODELS: StandaloneModelConfig[] = [
  {
    service: "analytics",
    models: [
      {
        outputPath: "extensions/models/graphql_analytics.ts",
        sourcePath: new URL(
          "./standalone/analytics/graphql_analytics.ts",
          import.meta.url,
        ).pathname,
      },
    ],
    libFiles: [
      {
        outputPath: "extensions/models/_lib/graphql.ts",
        sourcePath: new URL(
          "./standalone/analytics/_lib/graphql.ts",
          import.meta.url,
        ).pathname,
      },
    ],
    readmePath: new URL(
      "./standalone/analytics/README.md",
      import.meta.url,
    ).pathname,
    description: "Cloudflare GraphQL Analytics models",
    labels: ["cloudflare", "analytics", "graphql", "cloud", "infrastructure"],
  },
  // Clef and Clairic are Cloudflare's System One models on Workers AI. The
  // OpenAPI spec only has a generic POST /ai/run/{model_name}, which the CRUD
  // generator skips, so both are hand-written and share one Workers AI client.
  {
    service: "clef",
    models: [
      {
        outputPath: "extensions/models/decision.ts",
        sourcePath: new URL(
          "./standalone/workers-ai/decision.ts",
          import.meta.url,
        ).pathname,
      },
    ],
    libFiles: [
      {
        outputPath: "extensions/models/_lib/workers_ai.ts",
        sourcePath: new URL(
          "./standalone/workers-ai/_lib/workers_ai.ts",
          import.meta.url,
        ).pathname,
      },
    ],
    readmePath: new URL(
      "./standalone/workers-ai/README.clef.md",
      import.meta.url,
    ).pathname,
    description:
      "Cloudflare Clef decision models on Workers AI: typed Noul, Choice, and Score questions with calibrated answers",
    labels: ["cloudflare", "workers-ai", "ai", "classification", "clef"],
  },
  {
    service: "clairic",
    models: [
      {
        outputPath: "extensions/models/extraction.ts",
        sourcePath: new URL(
          "./standalone/workers-ai/extraction.ts",
          import.meta.url,
        ).pathname,
      },
    ],
    libFiles: [
      {
        outputPath: "extensions/models/_lib/workers_ai.ts",
        sourcePath: new URL(
          "./standalone/workers-ai/_lib/workers_ai.ts",
          import.meta.url,
        ).pathname,
      },
    ],
    readmePath: new URL(
      "./standalone/workers-ai/README.clairic.md",
      import.meta.url,
    ).pathname,
    description:
      "Cloudflare Clairic extraction model on Workers AI: typed values extracted from text and images, null when undetermined",
    labels: ["cloudflare", "workers-ai", "ai", "extraction", "clairic"],
  },
];

const CLOUDFLARE_SPEC_URL =
  "https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json";

// --- Public types ---

export interface CloudflareProperty {
  type:
    | "string"
    | "number"
    | "integer"
    | "boolean"
    | "array"
    | "object"
    | "union";
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
  /**
   * Distinct object shapes for a property that request-body branches define
   * differently (e.g. dns_records `data`, one shape per record type), on
   * `type: "object"`; or the members of a mixed-type union (page-rules
   * action `value` is a string, an integer or an object), on
   * `type: "union"`. Generated as a union of the variants.
   */
  variants?: CloudflareProperty[];
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
  /**
   * Property names required by create. Optional in GlobalArgsSchema; the
   * generated create method rejects them when unset. Unlike GCP, no resource
   * property stays required there: no non-create method reads one from
   * globalArgs as required (scope args are emitted separately and the naming
   * field falls back when unset).
   */
  createRequiredProperties: string[];
  /**
   * Property names the PATCH/PUT body itself requires, set only when that body
   * has its own properties and declares a `required` list somewhere in its
   * composition. A PUT update then only insists on a create-required field
   * this body requires too: a field only one of its branches requires (dlp
   * entries `pattern`, custom entries only) must not block updating the rest.
   * Many update bodies declare no `required` at all, which says nothing about
   * what they need, so those keep the create-required guard.
   */
  updateRequiredProperties?: string[];
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
  /** Suffix appended to the base endpoint for list operations (e.g. "/list" when the API uses a separate list sub-endpoint) */
  listEndpointSuffix: string;
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
    // Defense-in-depth: buildResource already filters empty services, but
    // guard here too so a future parser change can't write to model/cloudflare/.
    if (!serviceName) {
      throw new Error(
        "Refusing to generate a Cloudflare service package with an empty name. " +
          `Resources: ${svcResources.map((r) => r.basePath).join(", ")}`,
      );
    }

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

        // Compute upgrades block for changed/new models. newFieldNames must
        // mirror the EXACT top-level GlobalArgsSchema fields the generator
        // emits — scope args, the synthetic name, the merged create+update
        // properties, and the vault-wireable auth args — so upgrade diffing
        // (computeUpgradesBlock) compares like-for-like. Otherwise the first
        // changed regeneration emits spurious "Removed: account_id, zone_id,
        // name, ..." entries. Keep this in lockstep with
        // codegen/cloudflare/extensionModelGenerator.ts.
        const mergedPropNames = new Set([
          ...Object.keys(resource.updateProperties),
          ...Object.keys(resource.createProperties),
        ]);
        const emittedFields: string[] = [];
        if (resource.scope === "account") {
          emittedFields.push("account_id");
        } else if (resource.scope === "zone") {
          emittedFields.push("zone_id");
        } else {
          emittedFields.push("account_id", "zone_id");
        }
        if (
          resource.syntheticName && !mergedPropNames.has(resource.namingField)
        ) {
          emittedFields.push("name");
        }
        for (const name of mergedPropNames) emittedFields.push(name);
        // Pair-guarded auth args (mirror the generator's collision logic).
        if (!mergedPropNames.has("apiToken")) emittedFields.push("apiToken");
        if (!mergedPropNames.has("apiKey") && !mergedPropNames.has("email")) {
          emittedFields.push("apiKey", "email");
        }
        // extractGlobalArgsFieldNames (the on-disk side of the diff) only sees
        // unquoted, valid-identifier field names; mirror that filter so quoted
        // property names don't show up as phantom Added/Removed entries.
        const validFieldName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
        const newFieldNames = emittedFields.filter((n) =>
          validFieldName.test(n)
        );
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
      // Format the candidate README with deno fmt before comparing so that the
      // comparison matches what's on disk (the pipeline runs deno fmt after
      // writing, so the on-disk README is already formatted).
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
      license: FIRST_PARTY_LICENSE,
      description: `Cloudflare ${serviceName} infrastructure models`,
      labels: ["cloudflare", serviceName, "cloud", "infrastructure"],
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
      license: FIRST_PARTY_LICENSE,
      description: `Cloudflare ${serviceName} infrastructure models`,
      labels: ["cloudflare", serviceName, "cloud", "infrastructure"],
      modelFiles: modelFileNames,
      additionalFiles: ["LICENSE.txt", "README.md"],
      releaseNotes: releaseNotes || undefined,
      repository: "https://github.com/swamp-club/swamp-extensions",
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

  // --- Standalone models ---
  // Process hand-written model sources that live in codegen/cloudflare/standalone/
  for (const standalone of STANDALONE_MODELS) {
    // Skip if filtered out
    if (
      options.services && options.services.length > 0 &&
      !options.services.includes(standalone.service)
    ) {
      continue;
    }

    // Skip if an OpenAPI-derived service already has this name (would conflict)
    if (services.has(standalone.service)) {
      errors.push(
        `Standalone model "${standalone.service}" conflicts with an OpenAPI-derived service of the same name`,
      );
      continue;
    }

    const extensionName = `@swamp/cloudflare/${standalone.service}`;
    const placeholderVersion = "VERSION_PLACEHOLDER";
    const serviceOutputDir =
      `${options.outputDir}/cloudflare/${standalone.service}`;

    const models: CloudflareGeneratedFile[] = [];
    const modelChanges: CloudflareModelChange[] = [];
    let hasChanges = false;

    for (const modelFile of standalone.models) {
      try {
        const candidateCode = await Deno.readTextFile(modelFile.sourcePath);
        const fileName = modelFile.outputPath.split("/").pop()!;

        const { version, status } = await computeModelVersion(
          serviceOutputDir,
          modelFile.outputPath,
          datePrefix,
          candidateCode,
          placeholderVersion,
        );

        if (status !== "unchanged") hasChanges = true;

        const finalCode = candidateCode.replaceAll(
          placeholderVersion,
          version,
        );

        models.push({ filePath: modelFile.outputPath, sourceCode: finalCode });
        modelChanges.push({ fileName, status });
      } catch (err) {
        errors.push(
          `standalone/${standalone.service}/${modelFile.outputPath}: ${
            (err as Error).message
          }`,
        );
      }
    }

    // Lib files — read from source
    const libFiles: CloudflareGeneratedFile[] = [];
    for (const libFile of standalone.libFiles) {
      try {
        const code = await Deno.readTextFile(libFile.sourcePath);
        libFiles.push({ filePath: libFile.outputPath, sourceCode: code });
      } catch (err) {
        errors.push(
          `standalone/${standalone.service}/${libFile.outputPath}: ${
            (err as Error).message
          }`,
        );
      }
    }

    // Use the first lib file as the service's libFile (required by CloudflareServiceResult)
    const libFile = libFiles[0] ?? {
      filePath: "extensions/models/_lib/graphql.ts",
      sourceCode: "",
    };

    const firstSlug = standalone.models[0]?.outputPath
      .split("/").pop()?.replace(".ts", "") ?? standalone.service;
    const firstType = `${extensionName}/${firstSlug.replace(/_/g, "-")}`;
    let readmeCode: string;
    try {
      readmeCode = standalone.readmePath
        ? await Deno.readTextFile(standalone.readmePath)
        : generateCloudflareReadme(
          standalone.service,
          extensionName,
          firstSlug.replace(/_/g, "-"),
          firstType,
          false,
        );
    } catch (err) {
      errors.push(
        `standalone/${standalone.service}/README.md: ${(err as Error).message}`,
      );
      continue;
    }
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
      license: FIRST_PARTY_LICENSE,
      description: standalone.description,
      labels: standalone.labels,
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
      license: FIRST_PARTY_LICENSE,
      description: standalone.description,
      labels: standalone.labels,
      modelFiles: modelFileNames,
      additionalFiles: ["LICENSE.txt", "README.md"],
      releaseNotes: releaseNotes || undefined,
      repository: "https://github.com/swamp-club/swamp-extensions",
      platforms: [],
    });

    const denoConfigCode = generateCloudflareDenoConfig();

    services.set(standalone.service, {
      serviceName: standalone.service,
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
  /** Internal: distinct object shapes collected by flattenDisjunction. */
  "x-swamp-variants"?: OApiSchema[];
  /** Internal: canonical members of a mixed-type union (see unionOf). */
  "x-swamp-union"?: OApiSchema[];
  /**
   * Internal: `required` here may miss lists the schema declares (branch
   * lists a merge could not keep), so it cannot tell what the body needs.
   */
  "x-swamp-required-incomplete"?: boolean;
}

interface OApiParameter {
  name: string;
  in?: string;
  required?: boolean;
}

interface OApiOperation {
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
  [method: string]: OApiOperation | undefined;
}

interface OApiSpec {
  paths?: Record<string, OApiPathItem>;
  [key: string]: unknown;
}

/**
 * Parse the Cloudflare OpenAPI spec, group endpoints by service,
 * and extract resource definitions.
 */
export function parseResources(spec: OApiSpec): {
  resources: CloudflareResource[];
  skipped: { path: string; reason: string }[];
} {
  const paths: Record<string, OApiPathItem> = spec.paths ?? {};
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
  paths: Record<string, OApiPathItem>,
  spec: OApiSpec,
): CloudflareResource | null {
  const baseMethods = paths[basePath];
  const idMethods = paths[idPath];

  const { scope, resourcePath } = extractScopeAndPath(basePath);
  if (scope === "other") return null;
  if (!resourcePath) return null;

  const service = deriveService(resourcePath, scope);

  // Build slug from the last segment of the resource path
  const pathSegments = resourcePath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const modelSlug = lastSegment.replace(/_/g, "-");
  const fileName = `${lastSegment}.ts`;

  if (!service || !modelSlug) return null;

  // Extract properties from POST body
  const { properties: createProps, required: createRequired } =
    extractRequestBody(baseMethods.post, spec);
  if (Object.keys(createProps).length === 0) return null;

  // Extract properties from PATCH/PUT body
  const hasUpdate = !!(idMethods.patch || idMethods.put);
  const updateMethod: "PATCH" | "PUT" = idMethods.patch ? "PATCH" : "PUT";
  let updateProps: Record<string, CloudflareProperty> = {};
  let updateRequired: string[] | undefined;
  if (hasUpdate) {
    const updateOp = idMethods.patch ?? idMethods.put;
    const result = extractRequestBody(updateOp, spec);
    updateProps = result.properties;
    if (result.requiredDeclared) updateRequired = result.required;
  }

  // Extract properties from GET response (with envelope unwrapping)
  const responseProps = extractResponseProperties(idMethods.get, spec);

  // Ensure `id` is present in resource properties
  if (!responseProps.id) {
    responseProps.id = { type: "string", description: "Resource identifier" };
  }

  // swamp checks the full GlobalArgsSchema on `model create` and type-based
  // `workflow validate`, so create-only required fields there would block
  // definitions meant for get/lookup/sync. Keep them out of the schema's
  // required set and enforce them inside create instead. Limit them to real
  // create properties (the schema's required list is not filtered against its
  // properties) and drop the scope args, which are emitted separately.
  const createRequiredProperties = createRequired.filter((name) =>
    name in createProps && name !== "account_id" && name !== "zone_id"
  );

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

  // Detect pagination style and list endpoint. Some Cloudflare APIs route
  // listing through a /list sub-endpoint instead of GET on the base path.
  let paginationStyle = detectPagination(baseMethods.get);
  let listEndpointSuffix = "";
  if (!baseMethods.get && paths[basePath + "/list"]?.get) {
    listEndpointSuffix = "/list";
    paginationStyle = detectPagination(paths[basePath + "/list"].get);
  }

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
    createRequiredProperties,
    ...(Object.keys(updateProps).length > 0 && updateRequired
      ? { updateRequiredProperties: updateRequired }
      : {}),
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
    listEndpointSuffix,
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
  getOp: OApiOperation | undefined,
): "page" | "cursor" | "none" {
  if (!getOp?.parameters) return "none";
  const queryParams = (getOp.parameters ?? [])
    .filter((p) => !p.in || p.in === "query")
    .map((p) => p.name);
  if (queryParams.includes("cursor")) return "cursor";
  if (queryParams.includes("page")) return "page";
  return "none";
}

// --- Schema extraction ---

/**
 * Extract properties from a JSON request body schema.
 * Handles flat objects, allOf, and anyOf/oneOf compositions
 * (e.g., DNS records use anyOf[oneOf[allOf[shared, specific]]]).
 */
function extractRequestBody(
  operation: OApiOperation | undefined,
  spec: OApiSpec,
): {
  properties: Record<string, CloudflareProperty>;
  required: string[];
  /**
   * Whether `required` is the body's complete declared list: false when the
   * body declares none, or when flattening could not keep every list it
   * declares (see x-swamp-required-incomplete).
   */
  requiredDeclared: boolean;
} {
  const none = { properties: {}, required: [], requiredDeclared: false };
  const body = operation?.requestBody;
  if (!body) return none;

  const content = body.content?.["application/json"];
  if (!content?.schema) return none;

  const flattened = flattenSchema(content.schema, spec);
  if (!flattened.properties || Object.keys(flattened.properties).length === 0) {
    return none;
  }

  const properties: Record<string, CloudflareProperty> = {};
  for (const [name, propSchema] of Object.entries(flattened.properties)) {
    properties[name] = normalizeProperty(propSchema, spec);
  }

  return {
    properties,
    required: flattened.required ?? [],
    requiredDeclared: Array.isArray(flattened.required) &&
      !flattened["x-swamp-required-incomplete"],
  };
}

/**
 * Flatten a schema that may use anyOf/oneOf/allOf into a single
 * properties+required object by merging all branches.
 * For disjunctions (anyOf/oneOf), required uses intersection.
 */
function flattenSchema(schema: OApiSchema, spec: OApiSpec): OApiSchema {
  if (!schema || typeof schema !== "object") return {};

  const resolved = resolveSchema(schema, spec);

  // Simple object with properties. A disjunction beside the properties
  // (oneOf of required lists) is not flattened, so its lists are not kept.
  if (resolved.properties) {
    return resolved.oneOf || resolved.anyOf
      ? { ...resolved, "x-swamp-required-incomplete": true }
      : resolved;
  }

  // anyOf or oneOf — merge all branch properties, intersect required
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
    const flattened = flattenSchema(branch, spec);
    if (flattened.properties) {
      for (const [key, val] of Object.entries(flattened.properties)) {
        const existing = allProps[key];
        if (!existing) {
          allProps[key] = val;
        } else if (
          existing.enum && val.enum &&
          (existing.type === val.type || !existing.type || !val.type)
        ) {
          const merged = [...new Set([...existing.enum, ...val.enum])];
          allProps[key] = { ...existing, enum: merged };
        } else if (isMixedCollision(existing, val, spec)) {
          const merged = unionOf(
            [...unionMembers(existing, spec), ...unionMembers(val, spec)],
            existing.description,
            spec,
          );
          if (merged) allProps[key] = merged;
        } else {
          const merged = mergeObjectVariants(existing, val, spec);
          if (merged) allProps[key] = merged;
        }
      }
    }
    if (flattened.required) {
      requiredSets.push(new Set(flattened.required));
    }
  }

  // Intersect required — only fields required in every branch. No branch
  // declaring a list means the disjunction declares none.
  let required: string[] | undefined;
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

  const incomplete = branches.some((b) =>
    resolveSchema(b, spec)["x-swamp-required-incomplete"]
  );
  return {
    properties: allProps,
    ...(required ? { required } : {}),
    type: "object",
    ...(incomplete ? { "x-swamp-required-incomplete": true } : {}),
  };
}

/**
 * The members a schema contributes to a mixed-type union: its collected
 * union members or object variants, else its oneOf/anyOf branches (resolved
 * and expanded recursively, `null` dropped), else the resolved schema itself.
 */
function unionMembers(
  schema: OApiSchema,
  spec: OApiSpec,
  onPath: Set<OApiSchema> = new Set(),
): OApiSchema[] {
  if (schema["x-swamp-union"]) return schema["x-swamp-union"];
  if (schema["x-swamp-variants"]) return schema["x-swamp-variants"];
  const resolved = resolveSchema(schema, spec);
  const branches = resolved.oneOf ?? resolved.anyOf;
  if (!branches || resolved.properties) return [resolved];
  // The dereferenced spec has circular refs: a disjunction already being
  // expanded further up is kept as one member instead of recursed into.
  if (onPath.has(resolved)) return [resolved];
  onPath.add(resolved);
  try {
    return branches
      .flatMap((b) => unionMembers(b, spec, onPath))
      .filter(isTypedMember);
  } finally {
    onPath.delete(resolved);
  }
}

/**
 * A branch that says what it accepts. `null` is dropped (nullability is not
 * modelled), and so is a branch with no type and no properties, which the
 * single-type path also skipped rather than guess at.
 */
function isTypedMember(member: OApiSchema): boolean {
  if (member["x-swamp-variants"] || member["x-swamp-union"]) return true;
  if (member.type) return member.type !== "null";
  return !!member.properties;
}

/** An object member: declared `type: "object"`, or has properties. */
function isObjectMember(member: OApiSchema): boolean {
  return member.type === "object" || !!member.properties;
}

/**
 * Whether a disjunction collision involves anything but objects. Object-only
 * collisions keep the object-variant merge (mergeObjectVariants) unchanged;
 * any non-object member on either side makes it a mixed-type union.
 */
function isMixedCollision(
  existing: OApiSchema,
  incoming: OApiSchema,
  spec: OApiSpec,
): boolean {
  return [...unionMembers(existing, spec), ...unionMembers(incoming, spec)]
    .some((m) => !isObjectMember(m));
}

const SCALAR_SCHEMA_TYPES = new Set(["string", "number", "integer", "boolean"]);

/** A scalar member with no constraint the generated zod would enforce. */
function isUnconstrainedScalar(member: OApiSchema): boolean {
  if (!member.type || !SCALAR_SCHEMA_TYPES.has(member.type)) return false;
  return !member.enum && member.pattern === undefined &&
    member.minLength === undefined && member.maxLength === undefined &&
    member.minimum === undefined && member.maximum === undefined;
}

/**
 * Canonical union members, in first-seen order: enum members of the same
 * scalar type merge into one (values in first-seen order); an unconstrained
 * scalar absorbs every other member of its type (and an unconstrained number
 * absorbs integers); anything else is deduplicated by shape.
 */
function canonicalMembers(
  members: OApiSchema[],
  spec: OApiSpec,
): OApiSchema[] {
  const resolved = members.map((m) =>
    m["x-swamp-variants"] || m["x-swamp-union"] ? m : resolveSchema(m, spec)
  ).filter(isTypedMember);
  const unconstrained = new Set(
    resolved.filter(isUnconstrainedScalar).map((m) => m.type!),
  );
  const absorbed = (m: OApiSchema): boolean => {
    if (!m.type) return false;
    if (m.type === "integer" && unconstrained.has("number")) return true;
    return unconstrained.has(m.type) && !isUnconstrainedScalar(m);
  };

  const out: OApiSchema[] = [];
  const keys: string[] = [];
  const enumIndex = new Map<string, number>();
  for (const m of resolved) {
    if (absorbed(m)) continue;
    if (m.enum && m.type && SCALAR_SCHEMA_TYPES.has(m.type)) {
      const at = enumIndex.get(m.type);
      if (at !== undefined) {
        const values = [...new Set([...out[at].enum!, ...m.enum])];
        out[at] = { ...out[at], enum: values };
        keys[at] = shapeKey(out[at], spec);
        continue;
      }
      enumIndex.set(m.type, out.length);
    }
    const key = shapeKey(m, spec);
    if (keys.includes(key)) continue;
    keys.push(key);
    out.push(m);
  }
  return out;
}

/**
 * A mixed-type union of the given members. When they canonicalize to a
 * single member, that member: whichever branch came first, an enum and a
 * plain string of the same property give the plain string. Undefined when
 * no member says what it accepts (the caller keeps what it had).
 */
function unionOf(
  members: OApiSchema[],
  description: string | undefined,
  spec: OApiSpec,
): OApiSchema | undefined {
  const canonical = canonicalMembers(members, spec);
  if (canonical.length === 0) return undefined;
  if (canonical.length === 1) return canonical[0];
  return {
    ...(description ? { description } : {}),
    "x-swamp-union": canonical,
  };
}

/**
 * Object shapes a schema contributes to a disjunction collision: its
 * collected variants, or itself when it is an object with properties.
 * Returns undefined for anything else (scalars, arrays, bare objects).
 */
function objectShapes(
  schema: OApiSchema,
  spec: OApiSpec,
): OApiSchema[] | undefined {
  if (schema["x-swamp-variants"]) return schema["x-swamp-variants"];
  const resolved = resolveSchema(schema, spec);
  if (resolved.properties && Object.keys(resolved.properties).length > 0) {
    return [resolved];
  }
  return undefined;
}

/**
 * Two branches define the same property as objects of different shapes
 * (dns_records `data` is CAA in one branch and SRV in another). Keep every
 * distinct shape as a variant instead of the first one, which silently drops
 * the other branches' fields. Returns undefined when this is not an
 * object-vs-object collision, or when the shapes are the same — the caller
 * then keeps the existing schema (first-wins).
 */
function mergeObjectVariants(
  existing: OApiSchema,
  incoming: OApiSchema,
  spec: OApiSpec,
): OApiSchema | undefined {
  const current = objectShapes(existing, spec);
  const added = objectShapes(incoming, spec);
  if (!current || !added) return undefined;

  const shapes = [...current];
  const keys = current.map((v) => shapeKey(v, spec));
  let changed = false;
  for (const shape of added) {
    const key = shapeKey(shape, spec);
    const index = keys.indexOf(key);
    if (index === -1) {
      keys.push(key);
      shapes.push(shape);
      changed = true;
      continue;
    }
    // Same shape from another branch (HTTPS and SVCB): keep one variant but
    // both descriptions, so the generated docs still name every record type.
    const known = shapes[index].description ?? "";
    const extra = shape.description ?? "";
    if (extra && !known.split(" | ").includes(extra)) {
      shapes[index] = {
        ...shapes[index],
        description: known ? `${known} | ${extra}` : extra,
      };
      changed = true;
    }
  }
  if (!changed || shapes.length === 1) return undefined;

  return { type: "object", "x-swamp-variants": shapes };
}

/** Schema keywords that do not change what a payload must look like. */
const SHAPE_IGNORED_KEYS = new Set(["description", "example", "examples"]);

/** Schema keywords whose value is a single subschema. */
const SUBSCHEMA_KEYS = new Set(["items", "additionalProperties", "not"]);

/** Schema keywords whose value is a list of subschemas. */
const SUBSCHEMA_LIST_KEYS = new Set([
  "allOf",
  "anyOf",
  "oneOf",
  "x-swamp-variants",
  "x-swamp-union",
]);

/**
 * Canonical fingerprint of a schema's shape: $ref and allOf resolved, keys
 * sorted, `required` sorted, documentation keywords (description, example,
 * x-*) dropped. Keywords are only dropped on schema nodes: inside a
 * `properties` map every key is a field name, so a field called
 * `description` still counts. Two schemas that differ only in documentation
 * produce the same key. The dereferenced spec has circular refs, so a node
 * already on the current path is emitted as a marker instead of recursed
 * into.
 */
function shapeKey(schema: OApiSchema, spec: OApiSpec): string {
  const onPath = new Set<unknown>();

  // Plain JSON values (enum members, defaults): keep every key.
  const value = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(value);
    if (!node || typeof node !== "object") return node;
    const record = node as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(record).sort().map((k) => [k, value(record[k])]),
    );
  };

  const schemaNode = (node: unknown): unknown => {
    if (!node || typeof node !== "object" || Array.isArray(node)) {
      return value(node);
    }
    if (onPath.has(node)) return "[circular]";
    onPath.add(node);
    const resolved = resolveSchema(node as OApiSchema, spec) as Record<
      string,
      unknown
    >;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(resolved).sort()) {
      if (SHAPE_IGNORED_KEYS.has(key)) continue;
      if (
        key.startsWith("x-") && key !== "x-swamp-variants" &&
        key !== "x-swamp-union"
      ) continue;
      const val = resolved[key];
      if (key === "properties" && val && typeof val === "object") {
        const props = val as Record<string, unknown>;
        out[key] = Object.fromEntries(
          Object.keys(props).sort().map((k) => [k, schemaNode(props[k])]),
        );
      } else if (SUBSCHEMA_KEYS.has(key)) {
        out[key] = schemaNode(val);
      } else if (SUBSCHEMA_LIST_KEYS.has(key) && Array.isArray(val)) {
        out[key] = val.map(schemaNode);
      } else if (key === "required" && Array.isArray(val)) {
        out[key] = [...val].sort();
      } else {
        out[key] = value(val);
      }
    }
    onPath.delete(node);
    return out;
  };

  return JSON.stringify(schemaNode(schema));
}

/**
 * Extract resource properties from a GET response, unwrapping the
 * Cloudflare envelope (allOf[api-response-common, {result: ...}]).
 */
function extractResponseProperties(
  operation: OApiOperation | undefined,
  spec: OApiSpec,
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
  schema: OApiSchema,
  spec: OApiSpec,
): OApiSchema | null {
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
  schema: OApiSchema,
  spec: OApiSpec,
): Record<string, CloudflareProperty> {
  const result: Record<string, CloudflareProperty> = {};
  for (const [name, propSchema] of Object.entries(schema.properties ?? {})) {
    result[name] = normalizeProperty(propSchema, spec);
  }
  return result;
}

// --- Schema resolution ---

/**
 * Resolve a schema, handling $ref, allOf, oneOf, anyOf.
 * The spec has already been dereferenced but allOf/oneOf/anyOf still
 * need flattening.
 */
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
    // allOf around a single oneOf/anyOf is just that disjunction; merging it
    // would keep only the description and type, dropping every branch
    // (containers durable_objects became a string).
    if (schema.allOf.length === 1) {
      const inner = resolveSchema(schema.allOf[0], spec);
      if ((inner.oneOf || inner.anyOf) && !inner.properties) return inner;
    }
    return distributeAllOf(schema, spec);
  }

  return schema;
}

/**
 * Resolve a multi-member allOf. A oneOf/anyOf member is a union inside a
 * conjunction, so the union is distributed over it: each combination of
 * branches is merged with the other members, and a combination whose members
 * declare incompatible types is dropped (workers observability needle.value
 * is string|number|boolean AND a string, so a string). Surviving objects merge
 * the way any object disjunction does (flattenDisjunction), which keeps the
 * object-with-properties shape callers read; surviving scalars or arrays
 * become a oneOf for the mixed-type union path. Without a disjunction member,
 * past the product cap or the cycle guards, or when nothing survives, this is
 * mergeAllOf, the behaviour before distribution.
 */
function distributeAllOf(node: OApiSchema, spec: OApiSpec): OApiSchema {
  const allOf = node.allOf!;
  // The dereferenced spec can be circular and merging builds fresh objects,
  // so both the node identity and the nesting depth are guarded.
  if (distributing.has(node) || distributing.size >= MAX_DISTRIBUTE_DEPTH) {
    const merged = mergeAllOf(allOf, spec);
    return allOf.some((m) => m?.oneOf || m?.anyOf || m?.$ref)
      ? incompleteRequired(merged)
      : merged;
  }
  distributing.add(node);
  try {
    const members = allOf.map((m) => resolveSchema(m, spec));
    const branchesOf = members.map((m) =>
      (m.oneOf || m.anyOf) && !m.properties
        ? (m.oneOf ?? m.anyOf!).map((b) => resolveSchema(b, spec))
        : null
    );
    if (branchesOf.every((b) => b === null)) return mergeAllOf(members, spec);

    const combinations = branchesOf.reduce(
      (n, b) => n * (b ? b.length : 1),
      1,
    );
    if (combinations > MAX_DISTRIBUTED_BRANCHES) {
      return incompleteRequired(mergeAllOf(members, spec));
    }

    // A disjunction member's own keywords (a type, a description beside the
    // oneOf) hold for every branch, so each branch is taken together with them.
    let combos: OApiSchema[][] = [[]];
    branchesOf.forEach((branches, i) => {
      const { oneOf: _o, anyOf: _a, ...own } = members[i];
      const choices = branches ? branches.map((b) => [own, b]) : [[members[i]]];
      combos = combos.flatMap((c) => choices.map((b) => [...c, ...b]));
    });

    const merged = combos
      .map((combo) => {
        const type = conjoinedType(combo);
        if (type === null) return null;
        const result = mergeAllOf(combo, spec);
        if (type) result.type = type;
        return result;
      })
      .filter((s): s is OApiSchema => s !== null);
    // Once any combination declares required fields, one that declares none
    // requires nothing, and must count so when flattenDisjunction intersects.
    if (merged.some((s) => Array.isArray(s.required))) {
      for (const s of merged) s.required ??= [];
    }
    // Nullability is not modelled: a null branch only counts when it is all
    // that survives.
    const typed = merged.filter((s) => s.type !== "null");
    const survivors = typed.length > 0 ? typed : merged;

    if (survivors.length === 0) {
      return incompleteRequired(mergeAllOf(members, spec));
    }
    if (survivors.length === 1) return survivors[0];

    const description = members.reduce<string | undefined>(
      (d, m) => m.description ?? d,
      undefined,
    );
    if (survivors.every((s) => s.type === "object" || s.properties)) {
      const flattened = flattenDisjunction(survivors, spec);
      if (!flattened.properties) {
        return incompleteRequired(mergeAllOf(members, spec));
      }
      return description ? { ...flattened, description } : flattened;
    }
    return { oneOf: survivors, description };
  } finally {
    distributing.delete(node);
  }
}

/**
 * The type a conjunction of schemas declares: undefined when none declares
 * one, the narrowest when they agree (integer satisfies number), null when
 * they contradict. Untyped members (a description, properties alone) never
 * contradict.
 */
function conjoinedType(members: OApiSchema[]): string | undefined | null {
  let type: string | undefined;
  for (const m of members) {
    if (typeof m.type !== "string") continue;
    if (!type || type === m.type) {
      type = m.type;
    } else if (type === "number" && m.type === "integer") {
      type = "integer";
    } else if (!(type === "integer" && m.type === "number")) {
      return null;
    }
  }
  return type;
}

/**
 * A fallback merge of an allOf with a disjunction member keeps none of the
 * branches' required lists, so its own list is incomplete.
 */
function incompleteRequired(schema: OApiSchema): OApiSchema {
  return { ...schema, "x-swamp-required-incomplete": true };
}

/** allOf nodes distributeAllOf is currently resolving (cycle guard). */
const distributing = new Set<OApiSchema>();

/** Deepest chain of nested allOf distributions; only a cycle reaches it. */
const MAX_DISTRIBUTE_DEPTH = 8;

/**
 * Most branch combinations an allOf is distributed into. Real Cloudflare
 * allOfs hold one disjunction of a handful of branches.
 */
const MAX_DISTRIBUTED_BRANCHES = 64;

function mergeAllOf(allOf: OApiSchema[], spec: OApiSpec): OApiSchema {
  const merged: OApiSchema = {};
  for (const item of allOf) {
    const resolved = resolveSchema(item, spec);
    if (resolved.properties) {
      const properties = { ...(merged.properties ?? {}) };
      for (const [key, val] of Object.entries(resolved.properties)) {
        const existing = properties[key];
        properties[key] = existing ? conjoinProperty(existing, val, spec) : val;
      }
      merged.properties = properties;
    }
    if (resolved.required) {
      merged.required = [
        ...new Set([...(merged.required ?? []), ...resolved.required]),
      ];
    }
    if (resolved.type) merged.type = resolved.type;
    if (resolved.description) merged.description = resolved.description;
    if (resolved["x-swamp-required-incomplete"]) {
      merged["x-swamp-required-incomplete"] = true;
    }
  }
  return merged;
}

/**
 * allOf branches that both define the same object property must all hold, so
 * the property is the merge of both objects (dns CNAME `settings` is the
 * shared ipv4_only/ipv6_only object plus flatten_cname). Anything else keeps
 * the later definition, as before.
 */
function conjoinProperty(
  existing: OApiSchema,
  incoming: OApiSchema,
  spec: OApiSpec,
): OApiSchema {
  // The dereferenced spec has circular refs, and resolving either schema can
  // re-enter mergeAllOf, so the guards run before resolution. Merging builds
  // fresh objects at every level, so object identity alone cannot see a
  // cycle: nesting is also capped. Past either guard the later definition
  // wins, which is the behaviour before allOf object properties were merged.
  if (
    existing === incoming || conjoining.has(existing) ||
    conjoining.has(incoming) || conjoining.size >= 2 * MAX_CONJOIN_DEPTH
  ) {
    return incoming;
  }
  conjoining.add(existing);
  conjoining.add(incoming);
  try {
    const a = resolveSchema(existing, spec);
    const b = resolveSchema(incoming, spec);
    if (!a.properties || !b.properties) return incoming;
    return mergeAllOf([a, b], spec);
  } finally {
    conjoining.delete(existing);
    conjoining.delete(incoming);
  }
}

/** Original schemas conjoinProperty is currently merging (cycle guard). */
const conjoining = new Set<OApiSchema>();

/**
 * Deepest chain of nested allOf object-property merges. Real Cloudflare
 * bodies nest a few levels; only a circular schema reaches this.
 */
const MAX_CONJOIN_DEPTH = 8;

/**
 * Normalize mixed-type union members. Object variants inside a member are
 * lifted into the union itself, so the generated code is one flat z.union.
 * A union that comes down to one member is that member.
 */
function normalizeUnion(
  members: OApiSchema[],
  description: string | undefined,
  spec: OApiSpec,
): CloudflareProperty {
  const variants = members.flatMap((m) => {
    const prop = normalizeProperty(
      !m.type && m.properties ? { ...m, type: "object" } : m,
      spec,
    );
    if (prop.type === "union" || (prop.type === "object" && prop.variants)) {
      return prop.variants!;
    }
    return [prop];
  });
  // Members that differ only in what the generated code ignores (docs,
  // string format: dns `content` is an IPv4 or an IPv6 string) are one.
  const seen = new Set<string>();
  const distinct = variants.filter((v) => {
    const key = JSON.stringify(generatedShape(v));
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (distinct.length === 1) {
    return {
      ...distinct[0],
      description: description ?? distinct[0].description,
    };
  }
  return { type: "union", description, variants: distinct };
}

/** Property-level disjunctions normalizeProperty is expanding (cycle guard). */
const normalizingUnions = new Set<OApiSchema>();

/** A property without the fields generated code does not read. */
function generatedShape(prop: CloudflareProperty): unknown {
  const { description: _d, format: _f, ...rest } = prop;
  return {
    ...rest,
    items: prop.items && generatedShape(prop.items),
    properties: prop.properties &&
      Object.fromEntries(
        Object.entries(prop.properties).map(([k, v]) => [k, generatedShape(v)]),
      ),
    variants: prop.variants?.map(generatedShape),
  };
}

/**
 * Normalize an OpenAPI property schema into CloudflareProperty.
 */
function normalizeProperty(
  schema: OApiSchema,
  spec: OApiSpec,
): CloudflareProperty {
  if (!schema || typeof schema !== "object") {
    if ((schema as unknown) === CIRCULAR_MARKER) return { type: "object" };
    return { type: "string" };
  }

  const resolved = resolveSchema(schema, spec);

  // A schema that contains itself (an in-memory circular spec) stops at the
  // first repeat on the current path as an untyped object instead of
  // overflowing the stack. Ancestors only: a schema shared by siblings is
  // normalized in full each time. A disjunction re-entered while its union is
  // being built keeps its own recursion handling below.
  const unionRecursion = normalizingUnions.has(schema) ||
    normalizingUnions.has(resolved);
  if (
    !unionRecursion &&
    (normalizingPath.has(schema) || normalizingPath.has(resolved))
  ) {
    return { type: "object", description: resolved.description };
  }
  // Only entries added here are removed here, so a union re-entry does not
  // take its ancestor off the path.
  const added = [schema, resolved].filter((s) => !normalizingPath.has(s));
  added.forEach((s) => normalizingPath.add(s));
  try {
    return normalizeResolvedProperty(schema, resolved, spec);
  } finally {
    added.forEach((s) => normalizingPath.delete(s));
  }
}

/** What fetchCloudflareSchema writes in place of a true cycle. */
const CIRCULAR_MARKER = "[Circular]";

/** Schemas normalizeProperty is currently normalizing (cycle guard). */
const normalizingPath = new Set<OApiSchema>();

function normalizeResolvedProperty(
  schema: OApiSchema,
  resolved: OApiSchema,
  spec: OApiSpec,
): CloudflareProperty {
  // Distinct object shapes collected by flattenDisjunction: normalize each
  // one independently so every variant keeps its own fields and types.
  const variantSchemas = resolved["x-swamp-variants"];
  if (variantSchemas) {
    // A variant is an object with properties even when the spec omits
    // `type`; without this it would normalize to a string.
    const variants = variantSchemas.map((v) =>
      normalizeProperty(v.type ? v : { ...v, type: "object" }, spec)
    );
    const descriptions = [
      ...new Set(
        variants
          .map((v) => v.description)
          .filter((d): d is string => !!d),
      ),
    ];
    return {
      type: "object",
      description: descriptions.length > 0
        ? descriptions.join(" | ")
        : resolved.description,
      variants,
    };
  }

  // A mixed-type union collected by flattenDisjunction or below.
  const unionSchemas = resolved["x-swamp-union"];
  if (unionSchemas) {
    return normalizeUnion(unionSchemas, resolved.description, spec);
  }

  // Handle oneOf/anyOf — merge object variants so enum values are unioned
  if (resolved.oneOf || resolved.anyOf) {
    const variants = resolved.oneOf ?? resolved.anyOf!;
    // Branches of more than one type (string | number | boolean, a slug or
    // an object): keep every type instead of the first non-null one. Object
    // branches still merge into one object, as below.
    // A disjunction already being normalized further up (a recursive
    // "scalar or array of itself" schema) takes the single-type path below,
    // which stops at its first typed branch.
    const recursing = normalizingUnions.has(schema) ||
      normalizingUnions.has(resolved);
    const members = recursing
      ? []
      : canonicalMembers(unionMembers(resolved, spec), spec);
    if (members.length === 1 && !isObjectMember(members[0])) {
      // Same-type branches that canonicalize to one (an enum and a plain
      // string): that member, not whichever branch came first.
      return normalizeProperty(members[0], spec);
    }
    if (members.length > 1 && members.some((m) => !isObjectMember(m))) {
      const objects = members.filter(isObjectMember);
      const others = members.filter((m) => !isObjectMember(m));
      const objectMember = objects.length > 1
        ? [flattenDisjunction(objects, spec)]
        : objects;
      normalizingUnions.add(schema);
      normalizingUnions.add(resolved);
      try {
        return normalizeUnion(
          [...objectMember, ...others],
          resolved.description,
          spec,
        );
      } finally {
        normalizingUnions.delete(schema);
        normalizingUnions.delete(resolved);
      }
    }
    const objectVariants = variants
      .map((v) => resolveSchema(v, spec))
      .filter((v) => v.type === "object" || v.properties);
    if (objectVariants.length > 1) {
      return normalizeProperty(
        flattenDisjunction(objectVariants, spec),
        spec,
      );
    }
    for (const variant of variants) {
      const resolvedVariant = resolveSchema(variant, spec);
      if (resolvedVariant.type && resolvedVariant.type !== "null") {
        return normalizeProperty(resolvedVariant, spec);
      }
    }
    return { type: "string", description: resolved.description };
  }

  const type = resolved.type ?? "string";

  const prop: CloudflareProperty = {
    type: (type === "integer" ? "integer" : type) as CloudflareProperty["type"],
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
      prop.properties[name] = normalizeProperty(childSchema, spec);
    }
    if (resolved.required && Array.isArray(resolved.required)) {
      prop.requiredProperties = resolved.required;
    }
  }

  return prop;
}
