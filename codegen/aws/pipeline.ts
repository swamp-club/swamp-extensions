// AWS model generation pipeline

import { BlobReader, TextWriter, ZipReader } from "@zip-js/zip-js";
import { dirname } from "@std/path";
import { loadCfDatabase } from "../shared/schema/loader.ts";
import {
  normalizeOnlyProperties,
  splitAwsProperties,
} from "../shared/schema/split.ts";
import { generateZodSchemas } from "../shared/zodGenerator.ts";
import {
  generateAwsExtensionModel,
  resolveNamingField,
  type ResourceHandlers,
  typeNameToModelSlug,
  typeNameToResourceFileName,
  typeNameToServiceName,
} from "./extensionModelGenerator.ts";
import { generateAwsLibFile } from "./libGenerator.ts";
import {
  getEnrichment,
  getServiceEnrichmentImports,
} from "./enrichments/index.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateAwsDenoConfig } from "../shared/denoConfigGenerator.ts";
import {
  generateAwsReadme,
  getCuratedAwsResource,
} from "../shared/readmeGenerator.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";
import type { CfSchema, OnlyProperties } from "../shared/schema/types.ts";

const CF_SCHEMA_URL =
  "https://schema.cloudformation.us-east-1.amazonaws.com/CloudformationSchema.zip";

/**
 * Fetches the latest CloudFormation schemas from AWS and writes cf-schema.json.
 *
 * Downloads the CloudFormation schema zip, extracts all individual resource type
 * schemas, applies reference fixes and special-case patches, sorts by typeName,
 * and writes the consolidated JSON array.
 */
export async function fetchAwsSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/cf-schema.json", import.meta.url).pathname;

  console.log("Fetching CloudFormation schemas from AWS...");
  console.log(`  Source: ${CF_SCHEMA_URL}`);

  // Download the zip
  const response = await fetch(CF_SCHEMA_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download schema: ${response.status} ${response.statusText}`,
    );
  }

  const zipBlob = await response.blob();
  console.log(
    `  Downloaded ${(zipBlob.size / 1024 / 1024).toFixed(1)}MB zip`,
  );

  // Extract all JSON files from the zip
  const zipReader = new ZipReader(new BlobReader(zipBlob));
  const entries = await zipReader.getEntries();

  const schemas: unknown[] = [];
  let totalEntries = 0;
  let awsEntries = 0;

  for (const entry of entries) {
    if (!entry.filename.endsWith(".json") || entry.directory) {
      continue;
    }
    totalEntries++;

    // Only include aws-* schemas (matches the original: `aws*.json`)
    const baseName = entry.filename.split("/").pop() || entry.filename;
    if (!baseName.startsWith("aws-")) {
      continue;
    }

    if (!entry.getData) continue;
    const writer = new TextWriter();
    const text = await entry.getData(writer);

    // Fix schema references: replace "resource-schema.json#" with "#"
    const fixed = text.replace(/"resource-schema\.json#/g, '"#');

    let schema: Record<string, unknown>;
    try {
      schema = JSON.parse(fixed);
    } catch {
      console.warn(`  Skipping ${baseName} (invalid JSON)`);
      continue;
    }

    // Remove problematic SseSpecification from EC2 VerifiedAccessTrustProvider
    if (
      baseName === "aws-ec2-verifiedaccesstrustprovider.json" &&
      schema.definitions &&
      typeof schema.definitions === "object"
    ) {
      const defs = schema.definitions as Record<string, unknown>;
      if ("SseSpecification" in defs) {
        delete defs.SseSpecification;
      }
    }

    schemas.push(schema);
    awsEntries++;
  }

  await zipReader.close();

  console.log(
    `  Extracted ${totalEntries} total schemas, ${awsEntries} AWS schemas`,
  );

  // Sort by typeName for deterministic output
  schemas.sort((a, b) => {
    const aName = (a as Record<string, unknown>).typeName as string || "";
    const bName = (b as Record<string, unknown>).typeName as string || "";
    return aName.localeCompare(bName);
  });

  // Write consolidated cf-schema.json
  const outputDir = dirname(outputPath);
  await Deno.mkdir(outputDir, { recursive: true });
  await Deno.writeTextFile(outputPath, JSON.stringify(schemas));

  const fileSize = (await Deno.stat(outputPath)).size;
  console.log(`\nSchema fetch complete!`);
  console.log(`  Schemas: ${awsEntries}`);
  console.log(
    `  Output: ${outputPath} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`,
  );
}

// List of schemas we skip. If you add something here, add a reason.
const IGNORE_SCHEMAS = new Set([
  // /KeySchema: oneOf array without title
  "AWS::DynamoDB::Table",
  // Unsupported string regexp pattern
  "AWS::KinesisAnalyticsV2::Application",
  "AWS::SMSVOICE::PhoneNumber",
  "AWS::SMSVOICE::Pool",
  // Unsupported number format: int32
  "AWS::MediaConnect::Flow",
]);

export interface GeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface SkippedSchema {
  typeName: string;
  reason: string;
}

export interface ModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface ServiceGenerationResult {
  /** Service name, e.g., "ec2" */
  serviceName: string;
  /** Generated model files */
  models: GeneratedFile[];
  /** Shared lib file */
  libFile: GeneratedFile;
  /** Manifest file */
  manifest: GeneratedFile;
  /** README file */
  readmeFile: GeneratedFile;
  /** LICENSE file */
  licenseFile: GeneratedFile;
  /** deno.json config file */
  denoConfigFile: GeneratedFile;
  /** Per-model change tracking */
  modelChanges: ModelChange[];
  /** Whether any content (models, readme, license) changed */
  hasChanges: boolean;
}

export interface GenerationResult {
  datePrefix: string;
  services: Map<string, ServiceGenerationResult>;
  skipped: SkippedSchema[];
  errors: string[];
}

export async function generateAwsModels(options: {
  services?: string[];
  outputDir: string;
  schemaPath?: string;
}): Promise<GenerationResult> {
  console.log("Loading CloudFormation schemas...");
  const cfDb = await loadCfDatabase({
    services: options.services,
    schemaPath: options.schemaPath,
  });

  // CalVer date prefix for this generation run
  const now = new Date();
  const datePrefix = `${now.getFullYear()}.${
    String(now.getMonth() + 1).padStart(2, "0")
  }.${String(now.getDate()).padStart(2, "0")}`;

  const skipped: SkippedSchema[] = [];
  const errors: string[] = [];
  const typeNames = Object.keys(cfDb).sort();
  console.log(`Processing ${typeNames.length} schemas...`);

  // Group resources by service name
  const serviceResources = new Map<
    string,
    Array<{
      typeName: string;
      cfSchema: CfSchema;
      onlyProperties: OnlyProperties;
      handlers: ResourceHandlers;
    }>
  >();

  for (const typeName of typeNames) {
    if (IGNORE_SCHEMAS.has(typeName)) {
      skipped.push({ typeName, reason: "in ignore list" });
      continue;
    }

    // Only process AWS:: and Alexa:: resources
    const metaCategory = typeName.split("::")[0];
    if (!["AWS", "Alexa"].includes(metaCategory)) {
      skipped.push({ typeName, reason: "not AWS/Alexa" });
      continue;
    }

    const cfSchema = cfDb[typeName] as CfSchema;

    // Skip resources without a read handler (CF-only resources)
    if (!cfSchema.handlers?.read) {
      skipped.push({ typeName, reason: "no read handler" });
      continue;
    }

    const onlyProperties: OnlyProperties = {
      createOnly: normalizeOnlyProperties(cfSchema.createOnlyProperties),
      readOnly: normalizeOnlyProperties(cfSchema.readOnlyProperties),
      writeOnly: normalizeOnlyProperties(cfSchema.writeOnlyProperties),
      primaryIdentifier: normalizeOnlyProperties(cfSchema.primaryIdentifier),
    };

    const handlers: ResourceHandlers = {
      create: !!cfSchema.handlers?.create,
      read: !!cfSchema.handlers?.read,
      update: !!cfSchema.handlers?.update,
      delete: !!cfSchema.handlers?.delete,
    };

    const serviceName = typeNameToServiceName(typeName);
    if (!serviceResources.has(serviceName)) {
      serviceResources.set(serviceName, []);
    }
    serviceResources.get(serviceName)!.push({
      typeName,
      cfSchema,
      onlyProperties,
      handlers,
    });
  }

  // Generate models per service
  const services = new Map<string, ServiceGenerationResult>();

  for (const [serviceName, resources] of serviceResources) {
    const extensionName = `@swamp/aws/${serviceName}`;
    const placeholderVersion = "VERSION_PLACEHOLDER";

    const models: GeneratedFile[] = [];
    const modelChanges: ModelChange[] = [];

    // The output directory for this service
    const serviceOutputDir = `${options.outputDir}/aws/${serviceName}`;

    for (const { typeName, cfSchema, onlyProperties, handlers } of resources) {
      try {
        const { domainProperties, resourceValueProperties } =
          splitAwsProperties(cfSchema, onlyProperties);

        const zodResult = generateZodSchemas(
          domainProperties,
          resourceValueProperties,
          cfSchema,
          onlyProperties,
        );

        const resourceFileName = typeNameToResourceFileName(typeName);
        const modelSlug = typeNameToModelSlug(typeName);
        const modelType = `${extensionName}/${modelSlug}`;
        const fileName = `${resourceFileName}.ts`;
        const filePath = `extensions/models/${fileName}`;

        // Generate with placeholder version for change detection
        const enrichment = getEnrichment(typeName);
        const candidateCode = generateAwsExtensionModel({
          typeName,
          zodResult,
          onlyProperties,
          cfSchema,
          handlers,
          version: placeholderVersion,
          modelType,
          enrichment,
        });

        const { version, status, existingContent } = await computeModelVersion(
          serviceOutputDir,
          filePath,
          datePrefix,
          candidateCode,
          placeholderVersion,
        );

        // Compute new GlobalArgs field names for upgrade diffing
        const { synthetic: isSyntheticName } = resolveNamingField(
          onlyProperties,
          cfSchema,
        );
        const newFieldNames = [
          ...(isSyntheticName ? ["name"] : []),
          ...Object.keys(domainProperties),
        ];

        const upgradesBlock = computeUpgradesBlock(
          status,
          version,
          existingContent,
          newFieldNames,
        );

        // Generate final code with the real version and upgrades
        const sourceCode = generateAwsExtensionModel({
          typeName,
          zodResult,
          onlyProperties,
          cfSchema,
          handlers,
          version,
          modelType,
          upgradesBlock,
          enrichment,
        });

        models.push({ filePath, sourceCode });
        modelChanges.push({ fileName, status });

        // Copy enrichment source file to output if present
        if (enrichment) {
          const enrichSourceCode = await Deno.readTextFile(
            enrichment.sourceFile,
          );
          const enrichFilePath =
            `extensions/models/_enrichments/${resourceFileName}.ts`;
          models.push({
            filePath: enrichFilePath,
            sourceCode: enrichSourceCode,
          });
        }
      } catch (error) {
        errors.push(`${typeName}: ${error}`);
      }
    }

    // Generate shared lib
    const libFile: GeneratedFile = {
      filePath: "extensions/models/_lib/aws.ts",
      sourceCode: generateAwsLibFile(),
    };

    // Generate README — pick curated resource or first alphabetically
    const curatedSlug = getCuratedAwsResource(serviceName);
    let readmeModelSlug: string;
    let readmeModelType: string;
    if (curatedSlug) {
      const match = models.find((m) =>
        m.filePath.endsWith(`/${curatedSlug.replace(/_/g, "-")}.ts`) ||
        m.filePath.endsWith(`/${curatedSlug}.ts`)
      );
      if (match) {
        readmeModelSlug = curatedSlug.replace(/_/g, "-");
        readmeModelType = `${extensionName}/${readmeModelSlug}`;
      } else {
        // Curated resource not found — fall back to first model
        const firstModel = [...models].sort((a, b) =>
          a.filePath.localeCompare(b.filePath)
        )[0];
        const fileName = firstModel.filePath.split("/").pop()!.replace(
          ".ts",
          "",
        );
        readmeModelSlug = fileName;
        readmeModelType = `${extensionName}/${fileName}`;
      }
    } else {
      const firstModel = [...models].sort((a, b) =>
        a.filePath.localeCompare(b.filePath)
      )[0];
      const fileName = firstModel.filePath.split("/").pop()!.replace(
        ".ts",
        "",
      );
      readmeModelSlug = fileName;
      readmeModelType = `${extensionName}/${fileName}`;
    }

    const readmeFile: GeneratedFile = {
      filePath: "README.md",
      sourceCode: generateAwsReadme(
        serviceName,
        extensionName,
        readmeModelSlug,
        readmeModelType,
      ),
    };
    const licenseFile: GeneratedFile = {
      filePath: "LICENSE.txt",
      sourceCode: generateLicense(),
    };
    const enrichmentImports = getServiceEnrichmentImports(resources);
    const denoConfigFile: GeneratedFile = {
      filePath: "deno.json",
      sourceCode: generateAwsDenoConfig(enrichmentImports),
    };

    // Detect README/LICENSE changes
    // Format README with deno fmt before comparing so that the comparison
    // is stable across runs (deno fmt runs on the output directory after
    // writing, so the on-disk README is already formatted).
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

    // Compute manifest version with change detection
    const additionalFiles = ["LICENSE.txt", "README.md"];
    const modelFileNames = models.map((m) =>
      m.filePath.replace("extensions/models/", "")
    );
    const candidateManifest = generateManifest({
      name: extensionName,
      version: placeholderVersion,
      description: `AWS ${serviceName.toUpperCase()} infrastructure models`,
      labels: ["aws", serviceName, "cloud", "infrastructure"],
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
      description: `AWS ${serviceName.toUpperCase()} infrastructure models`,
      labels: ["aws", serviceName, "cloud", "infrastructure"],
      modelFiles: modelFileNames,
      additionalFiles,
      releaseNotes,
      repository: "https://github.com/systeminit/swamp-extensions",
      platforms: [],
    });
    const manifest: GeneratedFile = {
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

  return {
    datePrefix,
    services,
    skipped,
    errors,
  };
}
