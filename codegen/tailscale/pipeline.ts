// Tailscale model generation pipeline.
// Fetches the OpenAPI spec, resolves each entry of the resource table
// (resources.ts) against it, checks that every spec operation is either
// generated or deliberately skipped, and generates extension models.
// See codegen/designs/tailscale.md.

import $RefParser from "@apidevtools/json-schema-ref-parser";
import { dirname } from "@std/path";
import { generateTailscaleExtensionModel } from "./extensionModelGenerator.ts";
import { generateTailscaleLibFile } from "./libGenerator.ts";
import {
  type ActionDef,
  type HttpMethod,
  type OpRef,
  type ResourceEntry,
  RESOURCES,
  SKIPPED_OPERATIONS,
} from "./resources.ts";
import { generateManifest } from "../shared/manifestGenerator.ts";
import { generateLicense } from "../shared/licenseGenerator.ts";
import { generateTailscaleDenoConfig } from "../shared/denoConfigGenerator.ts";
import { generateTailscaleReadme } from "../shared/readmeGenerator.ts";
import { serializeWithCycleDetection } from "../shared/serialize.ts";
import {
  computeManifestVersion,
  computeModelVersion,
  formatFile,
} from "../shared/version.ts";
import { computeUpgradesBlock } from "../shared/upgradesGenerator.ts";

const TAILSCALE_SPEC_URL =
  "https://api.tailscale.com/api/v2?outputOpenapiSchema=true";

const EXTENSION_NAME = "@swamp/tailscale";

/**
 * Global arguments every model gets for credentials and addressing. A spec
 * field with one of these names would collide, which is a generation error.
 */
export const CONNECTION_ARGS = [
  "apiKey",
  "oauthClientId",
  "oauthClientSecret",
  "oauthScopes",
  "tailnet",
  "baseUrl",
];

/** Field names whose values are secrets, even without a writeOnly marker. */
const SECRET_NAME_PATTERN =
  /(secret|password|token|credentials?|privatekey|apikey)$/i;

// --- Public types ---

export interface TsProperty {
  type:
    | "string"
    | "number"
    | "integer"
    | "boolean"
    | "array"
    | "object"
    | "unknown";
  nullable?: boolean;
  description?: string;
  enum?: (string | number)[];
  items?: TsProperty;
  properties?: Record<string, TsProperty>;
  required?: string[];
  /** Value schema of a map (`additionalProperties`) */
  additionalProperties?: TsProperty;
  /** Scalar alternatives of an anyOf/oneOf */
  variants?: TsProperty[];
  readOnly?: boolean;
  writeOnly?: boolean;
  /** Format hint, e.g. "password" */
  format?: string;
}

export interface ResolvedAction {
  def: ActionDef;
  /** Request body fields, sent from method arguments */
  bodyFields: Record<string, TsProperty>;
  bodyRequired: string[];
  /** Path parameters supplied as method arguments */
  pathArgs: Record<string, TsProperty>;
  /** Query parameters supplied as optional method arguments */
  queryArgs: Record<string, TsProperty>;
  /**
   * The operation returns a JSON body worth keeping. Swamp methods return only
   * data handles, so the action writes it to the `result` resource.
   */
  hasResponse: boolean;
}

export interface ResolvedModel {
  entry: ResourceEntry;
  fileName: string;
  /**
   * Global arguments from request bodies (create, update, upsert, apply),
   * plus path parameters the model needs (parents, keys).
   */
  args: Record<string, TsProperty>;
  /** Global arguments the schema marks required (path parameters, keys) */
  requiredArgs: string[];
  /** Fields sent by create (collection) or apply/upsert (keyed, settings) */
  createFields: string[];
  /** Fields sent by update, when it differs from create */
  updateFields: string[];
  /** Fields create requires (enforced in the method, not the schema) */
  createRequired: string[];
  /** Response properties stored in `state` */
  stateProps: Record<string, TsProperty>;
  /** Response fields stored in the vaulted `secret` resource */
  secretFields: string[];
  /** Global arguments marked sensitive */
  sensitiveArgs: string[];
  /** List response wrapper key, or null for a bare array */
  listWrapperKey: string | null;
  actions: ResolvedAction[];
}

export interface TailscaleGeneratedFile {
  filePath: string;
  sourceCode: string;
}

export interface TailscaleModelChange {
  fileName: string;
  status: "new" | "changed" | "unchanged";
}

export interface TailscaleGenerationResult {
  version: string;
  models: TailscaleGeneratedFile[];
  libFile: TailscaleGeneratedFile;
  manifest: TailscaleGeneratedFile;
  readmeFile: TailscaleGeneratedFile;
  licenseFile: TailscaleGeneratedFile;
  denoConfigFile: TailscaleGeneratedFile;
  skipped: { path: string; reason: string }[];
  errors: string[];
  modelChanges: TailscaleModelChange[];
  hasChanges: boolean;
}

// --- OpenAPI types (after $ref dereferencing) ---

export interface OApiSchema {
  type?: string | string[];
  description?: string;
  properties?: Record<string, OApiSchema>;
  required?: string[];
  additionalProperties?: boolean | OApiSchema;
  anyOf?: OApiSchema[];
  oneOf?: OApiSchema[];
  allOf?: OApiSchema[];
  enum?: (string | number)[];
  items?: OApiSchema;
  format?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
}

interface OApiParameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  schema?: OApiSchema;
}

interface OApiOperation {
  parameters?: OApiParameter[];
  requestBody?: { content?: Record<string, { schema?: OApiSchema }> };
  responses?: Record<string, {
    content?: Record<string, { schema?: OApiSchema }>;
  }>;
}

type OApiPathItem = Record<string, OApiOperation> & {
  parameters?: OApiParameter[];
};

export interface OApiSpec {
  paths?: Record<string, OApiPathItem>;
}

// --- Schema fetching ---

export async function fetchTailscaleSchema(options?: {
  outputPath?: string;
}): Promise<void> {
  const outputPath = options?.outputPath ??
    new URL("../schemas/tailscale.json", import.meta.url).pathname;

  console.log("Fetching Tailscale OpenAPI spec...");
  console.log(`  Source: ${TAILSCALE_SPEC_URL}`);

  const response = await fetch(TAILSCALE_SPEC_URL);
  if (!response.ok) {
    throw new Error(
      `Failed to download spec: ${response.status} ${response.statusText}`,
    );
  }
  const yamlText = await response.text();

  // $RefParser resolves from a file, so write the YAML to a temp file first.
  const tmpYaml = await Deno.makeTempFile({ suffix: ".yaml" });
  try {
    await Deno.writeTextFile(tmpYaml, yamlText);
    console.log("Dereferencing $refs...");
    const dereferenced = await $RefParser.dereference(tmpYaml);
    await Deno.mkdir(dirname(outputPath), { recursive: true });
    // Shared $ref targets must serialize in full each time; only true cycles
    // are cut (see serializeWithCycleDetection).
    await Deno.writeTextFile(
      outputPath,
      serializeWithCycleDetection(dereferenced),
    );
    const fileSize = (await Deno.stat(outputPath)).size;
    console.log(`\nSchema fetch complete!`);
    console.log(`  Output: ${outputPath} (${(fileSize / 1024).toFixed(0)}KB)`);
  } finally {
    try {
      await Deno.remove(tmpYaml);
    } catch { /* ignore cleanup errors */ }
  }
}

// --- Model generation ---

export async function generateTailscaleModels(options: {
  outputDir: string;
  schemaPath?: string;
}): Promise<TailscaleGenerationResult> {
  const schemaPath = options.schemaPath ??
    new URL("../schemas/tailscale.json", import.meta.url).pathname;

  console.log("Loading Tailscale OpenAPI spec...");
  const spec = JSON.parse(await Deno.readTextFile(schemaPath)) as OApiSpec;

  const now = new Date();
  const datePrefix = `${now.getFullYear()}.${
    String(now.getMonth() + 1).padStart(2, "0")
  }.${String(now.getDate()).padStart(2, "0")}`;

  const { models: resolved, errors } = resolveModels(spec);
  errors.push(...checkCoverage(spec));
  console.log(`Resolved ${resolved.length} of ${RESOURCES.length} models`);

  const models: TailscaleGeneratedFile[] = [];
  const modelChanges: TailscaleModelChange[] = [];
  const placeholderVersion = "VERSION_PLACEHOLDER";

  for (const model of resolved) {
    try {
      const candidateCode = generateTailscaleExtensionModel({
        model,
        extensionName: EXTENSION_NAME,
        version: placeholderVersion,
      });
      const filePath = `extensions/models/${model.fileName}`;
      const { version, status, existingContent } = await computeModelVersion(
        options.outputDir,
        filePath,
        datePrefix,
        candidateCode,
        placeholderVersion,
      );
      const upgradesBlock = computeUpgradesBlock(
        status,
        version,
        existingContent,
        globalArgNames(model),
      );
      const sourceCode = generateTailscaleExtensionModel({
        model,
        extensionName: EXTENSION_NAME,
        version,
        upgradesBlock,
      });
      models.push({ filePath, sourceCode });
      modelChanges.push({ fileName: model.fileName, status });
    } catch (error) {
      errors.push(`${model.entry.model}: ${error}`);
    }
  }

  // A model that failed to resolve or generate keeps its previous file and
  // stays in the manifest, so a failed run cannot quietly unpublish it. The
  // errors still fail the run (exit 2).
  const keptFiles: string[] = [];
  for (const entry of RESOURCES) {
    const fileName = `${entry.model}.ts`;
    if (modelChanges.some((c) => c.fileName === fileName)) continue;
    try {
      await Deno.stat(`${options.outputDir}/extensions/models/${fileName}`);
      keptFiles.push(fileName);
    } catch { /* never generated: nothing to keep */ }
  }

  const libFile: TailscaleGeneratedFile = {
    filePath: "extensions/models/_lib/tailscale.ts",
    sourceCode: generateTailscaleLibFile(),
  };

  const added = modelChanges.filter((c) => c.status === "new")
    .map((c) => c.fileName.replace(".ts", ""));
  const updated = modelChanges.filter((c) => c.status === "changed")
    .map((c) => c.fileName.replace(".ts", ""));
  const releaseNotes = [
    ...(added.length > 0 ? [`- Added: ${added.join(", ")}`] : []),
    ...(updated.length > 0 ? [`- Updated: ${updated.join(", ")}`] : []),
  ].join("\n");

  const readmeFile: TailscaleGeneratedFile = {
    filePath: "README.md",
    sourceCode: generateTailscaleReadme(),
  };
  const licenseFile: TailscaleGeneratedFile = {
    filePath: "LICENSE.txt",
    sourceCode: generateLicense(),
  };
  const denoConfigFile: TailscaleGeneratedFile = {
    filePath: "deno.json",
    sourceCode: generateTailscaleDenoConfig(),
  };

  // The on-disk README is formatted by deno fmt after writing, so format the
  // candidate before comparing to keep change detection stable.
  let readmeChanged = true;
  let licenseChanged = true;
  let libChanged = true;
  try {
    readmeChanged =
      await Deno.readTextFile(`${options.outputDir}/README.md`) !==
        await formatFile(readmeFile.sourceCode, ".md");
  } catch { /* missing: changed */ }
  try {
    licenseChanged =
      await Deno.readTextFile(`${options.outputDir}/LICENSE.txt`) !==
        licenseFile.sourceCode;
  } catch { /* missing: changed */ }
  try {
    libChanged =
      await Deno.readTextFile(`${options.outputDir}/${libFile.filePath}`) !==
        await formatFile(libFile.sourceCode, ".ts");
  } catch { /* missing: changed */ }

  const manifestInput = (version: string) => ({
    name: EXTENSION_NAME,
    version,
    description: "Tailscale tailnet management models",
    labels: ["tailscale", "networking", "vpn"],
    modelFiles: [
      ...models.map((m) => m.filePath.replace("extensions/models/", "")),
      ...keptFiles,
    ].sort(),
    additionalFiles: ["LICENSE.txt", "README.md"],
    releaseNotes,
    repository: "https://github.com/swamp-club/swamp-extensions",
    platforms: [],
  });
  const hasChanges = modelChanges.some((c) => c.status !== "unchanged") ||
    readmeChanged || licenseChanged || libChanged;
  const manifestVersion = await computeManifestVersion(
    options.outputDir,
    "manifest.yaml",
    datePrefix,
    generateManifest(manifestInput(placeholderVersion)),
    placeholderVersion,
    hasChanges,
  );
  const manifest: TailscaleGeneratedFile = {
    filePath: "manifest.yaml",
    sourceCode: generateManifest(manifestInput(manifestVersion)),
  };

  return {
    version: manifestVersion,
    models,
    libFile,
    manifest,
    readmeFile,
    licenseFile,
    denoConfigFile,
    skipped: SKIPPED_OPERATIONS.map((op) => ({
      path: `${op.method} ${op.path}`,
      reason: op.reason,
    })),
    errors,
    modelChanges,
    hasChanges,
  };
}

/** Names of a model's global arguments, for upgrade diffing. */
export function globalArgNames(model: ResolvedModel): string[] {
  const names = Object.keys(model.args);
  const synthetic = syntheticNameArg(model);
  if (synthetic) names.unshift(synthetic);
  return [...names, ...CONNECTION_ARGS];
}

/**
 * The global argument naming a collection model's stored instance, or null
 * for other kinds. Collection models key their state on it rather than on
 * the resource's own name, so renaming the resource through update keeps
 * finding it. It is `name`, or `instanceName` when the API body already has
 * a `name` field (as DigitalOcean uses `instance_name`).
 */
export function syntheticNameArg(model: ResolvedModel): string | null {
  if (model.entry.kind !== "collection") return null;
  return "name" in model.args ? "instanceName" : "name";
}

// --- Resolution ---

/** Resolves every resource table entry against the spec. */
export function resolveModels(
  spec: OApiSpec,
  entries: ResourceEntry[] = RESOURCES,
): { models: ResolvedModel[]; errors: string[] } {
  const models: ResolvedModel[] = [];
  const errors: string[] = [];
  for (const entry of entries) {
    try {
      models.push(resolveEntry(spec, entry));
    } catch (error) {
      errors.push(
        `${entry.model}: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
  return { models, errors };
}

function resolveEntry(spec: OApiSpec, entry: ResourceEntry): ResolvedModel {
  const model: ResolvedModel = {
    entry,
    fileName: `${entry.model}.ts`,
    args: {},
    requiredArgs: [],
    createFields: [],
    updateFields: [],
    createRequired: [],
    stateProps: {},
    secretFields: [],
    sensitiveArgs: [],
    listWrapperKey: null,
    actions: [],
  };

  // Parent path parameters are required global arguments, described by the
  // operation that first needs them.
  const parentOp = entry.kind === "collection"
    ? entry.create
    : entry.kind === "settings"
    ? entry.apply
    : entry.read;
  for (const param of entry.parentParams ?? []) {
    model.args[param] = parameterProperty(spec, parentOp, param);
    model.requiredArgs.push(param);
  }

  switch (entry.kind) {
    case "collection": {
      const create = requestBody(spec, entry.create, entry.arrayBody);
      const fixed = Object.keys(entry.fixedBody ?? {});
      const allowed = (name: string) =>
        !fixed.includes(name) && (!entry.fields || entry.fields.includes(name));
      for (const field of entry.fields ?? []) {
        if (!create.properties[field]) {
          throw new Error(
            `field "${field}" is not in the ${opLabel(entry.create)} body`,
          );
        }
      }
      for (const [name, prop] of Object.entries(create.properties)) {
        if (allowed(name)) {
          model.args[name] = prop;
          model.createFields.push(name);
        }
      }
      model.createRequired = [
        ...create.required.filter(allowed),
        ...(entry.createRequired ?? []),
      ].filter((v, i, all) => all.indexOf(v) === i);
      if (entry.update) {
        const update = requestBody(spec, entry.update);
        for (const [name, prop] of Object.entries(update.properties)) {
          if (!allowed(name)) continue;
          model.args[name] ??= prop;
          model.updateFields.push(name);
        }
      }
      model.stateProps = responseProperties(spec, entry.read);
      requireStateField(model, entry.idField);
      if (entry.namingField) requireStateField(model, entry.namingField);
      model.secretFields = entry.oneTimeSecrets ?? [];
      for (const field of model.secretFields) requireStateField(model, field);
      model.listWrapperKey = listWrapperKey(spec, entry.list);
      ensureOp(spec, entry.delete);
      break;
    }
    case "keyed": {
      const body = requestBody(spec, entry.upsert);
      for (const [name, prop] of Object.entries(body.properties)) {
        model.args[name] = prop;
        model.createFields.push(name);
      }
      model.createRequired = body.required;
      if (entry.keyField) {
        if (!model.args[entry.keyField]) {
          throw new Error(`key field "${entry.keyField}" is not in the body`);
        }
      } else {
        model.args[entry.keyParam] = parameterProperty(
          spec,
          entry.read,
          entry.keyParam,
        );
      }
      model.requiredArgs.push(entry.keyField ?? entry.keyParam);
      model.updateFields = model.createFields;
      model.stateProps = responseProperties(spec, entry.read);
      if (entry.existsField) requireStateField(model, entry.existsField);
      if (entry.list) model.listWrapperKey = listWrapperKey(spec, entry.list);
      ensureOp(spec, entry.delete);
      break;
    }
    case "settings":
      resolveSettings(spec, entry, model);
      break;
    case "observed":
      model.stateProps = responseProperties(spec, entry.read);
      requireStateField(model, entry.idField);
      requireStateField(model, entry.namingField);
      model.listWrapperKey = listWrapperKey(spec, entry.list);
      if (entry.delete) ensureOp(spec, entry.delete);
      break;
  }

  // Write-only fields never come back; one-time secrets go to `secret`.
  for (const [name, prop] of Object.entries(model.stateProps)) {
    if (prop.writeOnly || model.secretFields.includes(name)) {
      delete model.stateProps[name];
    }
  }

  for (const [name, prop] of Object.entries(model.args)) {
    if (
      CONNECTION_ARGS.includes(name) ||
      name === syntheticNameArg(model)
    ) {
      throw new Error(
        `spec field "${name}" collides with a generated global argument`,
      );
    }
    if (isSensitive(name, prop)) model.sensitiveArgs.push(name);
  }

  // Policy file actions send the HuJSON policy itself as the body.
  const rawBody = entry.kind === "settings" && entry.special === "policyFile";
  model.actions = (entry.actions ?? []).map((def) =>
    resolveAction(spec, def, rawBody)
  );
  return model;
}

function resolveSettings(
  spec: OApiSpec,
  entry: Extract<ResourceEntry, { kind: "settings" }>,
  model: ResolvedModel,
): void {
  const readProps = responseProperties(spec, entry.read);
  ensureOp(spec, entry.apply);
  if (entry.delete.mode !== "noop") ensureOp(spec, entry.delete.op);

  switch (entry.special) {
    case "contacts": {
      // One global argument per contact type, each holding the PATCH body.
      const contactTypes = parameterProperty(spec, entry.apply, "contactType")
        .enum?.map(String) ?? [];
      if (contactTypes.length === 0) {
        throw new Error("contactType parameter has no enum values");
      }
      const body = requestBody(spec, entry.apply);
      for (const type of contactTypes) {
        model.args[type] = {
          type: "object",
          description: `The ${type} contact`,
          properties: body.properties,
          required: body.required,
        };
        model.createFields.push(type);
      }
      model.stateProps = readProps;
      break;
    }
    case "splitDns":
      model.args.domain = {
        type: "string",
        description: "The split-DNS domain this model manages",
      };
      model.args.nameservers = {
        type: "array",
        items: { type: "string" },
        description: "Nameservers that resolve the domain",
      };
      model.requiredArgs.push("domain");
      model.createFields = ["nameservers"];
      model.createRequired = ["nameservers"];
      model.stateProps = {
        domain: { type: "string" },
        nameservers: { type: "array", items: { type: "string" } },
      };
      break;
    case "postureAttribute": {
      const body = requestBody(spec, entry.apply);
      for (const [name, prop] of Object.entries(body.properties)) {
        model.args[name] = prop;
        model.createFields.push(name);
      }
      model.createRequired = ["value"];
      model.stateProps = {
        attributeKey: { type: "string" },
        value: model.args.value,
        expiry: { type: "string" },
      };
      break;
    }
    case "policyFile":
      model.args.policy = {
        type: "string",
        description:
          "The policy file as HuJSON (JSON with comments and trailing commas)",
      };
      model.args.overwriteExistingContent = {
        type: "boolean",
        description:
          "Let create replace a policy file that has been edited since the " +
          "tailnet was created",
      };
      model.args.resetOnDelete = {
        type: "boolean",
        description: "Reset the policy file to the default when the model is " +
          "deleted",
      };
      model.createFields = ["policy"];
      model.createRequired = ["policy"];
      model.stateProps = {
        policy: { type: "string" },
        etag: { type: "string" },
      };
      break;
    default: {
      const body = requestBody(spec, entry.apply);
      for (const [name, prop] of Object.entries(body.properties)) {
        model.args[name] = prop;
        model.createFields.push(name);
      }
      model.createRequired = body.required;
      if (entry.readFields || entry.parentParams?.length) {
        // A device facet: an unset field would be sent as an empty body,
        // which can clear the facet (all tags, all routes), so every field
        // is required.
        model.createRequired = [...model.createFields];
      }
      if (entry.readFields) {
        model.stateProps = {};
        for (const field of entry.readFields) {
          if (!readProps[field]) {
            throw new Error(
              `read field "${field}" is not in the ${opLabel(entry.read)} ` +
                `response`,
            );
          }
          model.stateProps[field] = readProps[field];
        }
      } else {
        model.stateProps = readProps;
      }
    }
  }
  model.updateFields = model.createFields;
}

function resolveAction(
  spec: OApiSpec,
  def: ActionDef,
  rawBody: boolean,
): ResolvedAction {
  const op = ensureOp(spec, def.op);
  const action: ResolvedAction = {
    def,
    bodyFields: {},
    bodyRequired: [],
    pathArgs: {},
    queryArgs: {},
    hasResponse: !!successResponse(op),
  };
  const json = op.requestBody?.content?.["application/json"]?.schema;
  if (json && !rawBody) {
    const body = requestBody(spec, def.op);
    action.bodyFields = body.properties;
    action.bodyRequired = body.required;
  }
  for (const name of def.pathArgs ?? []) {
    action.pathArgs[name] = parameterProperty(spec, def.op, name);
  }
  for (const name of def.queryArgs ?? []) {
    action.queryArgs[name] = parameterProperty(spec, def.op, name);
  }
  return action;
}

function requireStateField(model: ResolvedModel, field: string): void {
  if (!model.stateProps[field]) {
    throw new Error(
      `field "${field}" is not in the read response`,
    );
  }
}

function isSensitive(name: string, prop: TsProperty): boolean {
  return !!prop.writeOnly || prop.format === "password" ||
    SECRET_NAME_PATTERN.test(name);
}

// --- Coverage gate ---

/**
 * Every spec operation must be claimed by the resource table or listed in
 * SKIPPED_OPERATIONS, and every operation either names must exist in the spec.
 * Returns one error per violation.
 */
export function checkCoverage(
  spec: OApiSpec,
  entries: ResourceEntry[] = RESOURCES,
  skipped: OpRef[] = SKIPPED_OPERATIONS,
): string[] {
  const errors: string[] = [];
  const specOps = new Set<string>();
  for (const [path, item] of Object.entries(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      if (item[method.toLowerCase()]) specOps.add(`${method} ${path}`);
    }
  }
  const claimed = new Set<string>();
  for (const entry of entries) {
    for (const op of entryOps(entry)) claimed.add(opLabel(op));
  }
  for (const op of claimed) {
    if (!specOps.has(op)) {
      errors.push(`coverage: ${op} is in the resource table but not the spec`);
    }
  }
  const skippedLabels = new Set(skipped.map(opLabel));
  for (const op of skippedLabels) {
    if (!specOps.has(op)) {
      errors.push(`coverage: ${op} is in the skip list but not the spec`);
    }
    if (claimed.has(op)) {
      errors.push(`coverage: ${op} is both generated and skipped`);
    }
  }
  for (const op of [...specOps].sort()) {
    if (!claimed.has(op) && !skippedLabels.has(op)) {
      errors.push(
        `coverage: ${op} is not generated or skipped; add it to the resource ` +
          `table or SKIPPED_OPERATIONS in codegen/tailscale/resources.ts`,
      );
    }
  }
  return errors;
}

const HTTP_METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

/** Every operation an entry generates code for. */
export function entryOps(entry: ResourceEntry): OpRef[] {
  const ops: OpRef[] = [];
  switch (entry.kind) {
    case "collection":
      ops.push(entry.create, entry.read, entry.delete, entry.list);
      if (entry.update) ops.push(entry.update);
      break;
    case "keyed":
      ops.push(entry.read, entry.upsert, entry.delete);
      if (entry.list) ops.push(entry.list);
      break;
    case "settings":
      ops.push(entry.read, entry.apply);
      if (entry.delete.mode !== "noop") ops.push(entry.delete.op);
      break;
    case "observed":
      ops.push(entry.read, entry.list);
      if (entry.delete) ops.push(entry.delete);
      break;
  }
  for (const action of entry.actions ?? []) ops.push(action.op);
  return ops;
}

function opLabel(op: OpRef): string {
  return `${op.method} ${op.path}`;
}

// --- OpenAPI helpers ---

function ensureOp(spec: OApiSpec, ref: OpRef): OApiOperation {
  const op = spec.paths?.[ref.path]?.[ref.method.toLowerCase()];
  if (!op) throw new Error(`${opLabel(ref)} is not in the spec`);
  return op as OApiOperation;
}

function parameterProperty(
  spec: OApiSpec,
  ref: OpRef,
  name: string,
): TsProperty {
  const op = ensureOp(spec, ref);
  const params = [
    ...(spec.paths?.[ref.path]?.parameters ?? []),
    ...(op.parameters ?? []),
  ];
  const param = params.find((p) => p.name === name);
  if (!param) {
    throw new Error(`parameter "${name}" is not on ${opLabel(ref)}`);
  }
  const prop = normalizeProperty(param.schema ?? { type: "string" });
  prop.description = clean(param.description) ?? prop.description;
  return prop;
}

function requestBody(
  spec: OApiSpec,
  ref: OpRef,
  arrayBody = false,
): { properties: Record<string, TsProperty>; required: string[] } {
  const op = ensureOp(spec, ref);
  let schema = op.requestBody?.content?.["application/json"]?.schema;
  if (!schema) throw new Error(`${opLabel(ref)} has no JSON request body`);
  if (arrayBody) {
    if (schema.type !== "array" || !schema.items) {
      throw new Error(`${opLabel(ref)} request body is not an array`);
    }
    schema = schema.items;
  }
  const flat = flattenObject(schema);
  const properties: Record<string, TsProperty> = {};
  for (const [name, propSchema] of Object.entries(flat.properties)) {
    const prop = normalizeProperty(propSchema);
    if (!prop.readOnly) properties[name] = prop;
  }
  return {
    properties,
    required: flat.required.filter((name) => properties[name]),
  };
}

function successResponse(
  op: OApiOperation,
): OApiSchema | undefined {
  for (const [status, response] of Object.entries(op.responses ?? {})) {
    if (!status.startsWith("2")) continue;
    return response.content?.["application/json"]?.schema;
  }
  return undefined;
}

function responseProperties(
  spec: OApiSpec,
  ref: OpRef,
): Record<string, TsProperty> {
  const schema = successResponse(ensureOp(spec, ref));
  if (!schema) throw new Error(`${opLabel(ref)} has no JSON response`);
  const flat = flattenObject(schema);
  const properties: Record<string, TsProperty> = {};
  for (const [name, propSchema] of Object.entries(flat.properties)) {
    properties[name] = normalizeProperty(propSchema);
  }
  return properties;
}

/**
 * The property of a list response holding the items, or null when the
 * response is a bare array. A response with no array property, or several, is
 * an error.
 */
function listWrapperKey(spec: OApiSpec, ref: OpRef): string | null {
  const schema = successResponse(ensureOp(spec, ref));
  if (!schema) throw new Error(`${opLabel(ref)} has no JSON response`);
  if (schema.type === "array") return null;
  const arrays = Object.entries(flattenObject(schema).properties)
    .filter(([, s]) => s.type === "array")
    .map(([name]) => name);
  if (arrays.length !== 1) {
    throw new Error(
      `${opLabel(ref)} response has ${arrays.length} array properties; ` +
        `expected exactly one list`,
    );
  }
  return arrays[0];
}

/** Merges allOf branches into one object schema. */
function flattenObject(
  schema: OApiSchema,
): { properties: Record<string, OApiSchema>; required: string[] } {
  const properties: Record<string, OApiSchema> = { ...schema.properties };
  const required = [...(schema.required ?? [])];
  for (const branch of schema.allOf ?? []) {
    const flat = flattenObject(branch);
    Object.assign(properties, flat.properties);
    required.push(...flat.required);
  }
  return { properties, required: [...new Set(required)] };
}

function clean(text: string | undefined): string | undefined {
  const trimmed = text?.trim();
  return trimmed ? trimmed : undefined;
}

/** Normalizes an OpenAPI 3.1 schema into a TsProperty. */
export function normalizeProperty(schema: OApiSchema | string): TsProperty {
  if (!schema || typeof schema !== "object") return { type: "unknown" };

  const base: Partial<TsProperty> = {
    description: clean(schema.description),
    readOnly: schema.readOnly || undefined,
    writeOnly: schema.writeOnly || undefined,
    format: schema.format,
  };

  if (schema.allOf) {
    const flat = flattenObject(schema);
    return {
      ...normalizeProperty({
        ...schema,
        allOf: undefined,
        type: "object",
        properties: flat.properties,
        required: flat.required,
      }),
    };
  }

  const alternatives = schema.anyOf ?? schema.oneOf;
  if (alternatives) {
    const nonNull = alternatives.filter((s) => s.type !== "null");
    const nullable = nonNull.length < alternatives.length || undefined;
    if (nonNull.length === 1) {
      const prop = normalizeProperty(nonNull[0]);
      return {
        ...prop,
        ...stripUndefined(base),
        ...(nullable || prop.nullable ? { nullable: true } : {}),
      };
    }
    const variants = nonNull.map((s) => normalizeProperty(s));
    const scalar = variants.every((v) =>
      ["string", "number", "integer", "boolean"].includes(v.type)
    );
    if (scalar && variants.length > 0) {
      return { type: "unknown", variants, nullable, ...stripUndefined(base) };
    }
    return { type: "unknown", nullable, ...stripUndefined(base) };
  }

  // OpenAPI 3.1 nullable: `type: [T, "null"]`
  let type = schema.type;
  let nullable: boolean | undefined;
  if (Array.isArray(type)) {
    nullable = type.includes("null") || undefined;
    const rest = type.filter((t) => t !== "null");
    type = rest.length === 1 ? rest[0] : undefined;
  }
  if (!type) {
    if (schema.properties) type = "object";
    else if (schema.items) type = "array";
  }

  const prop: TsProperty = {
    type: isKnownType(type) ? type : "unknown",
    ...stripUndefined(base),
    nullable,
  };
  if (schema.enum) prop.enum = schema.enum.filter((v) => v !== null);
  if (prop.type === "array") {
    prop.items = schema.items ? normalizeProperty(schema.items) : undefined;
  }
  if (prop.type === "object") {
    if (schema.properties) {
      prop.properties = {};
      for (const [name, child] of Object.entries(schema.properties)) {
        prop.properties[name] = normalizeProperty(child);
      }
      if (schema.required?.length) prop.required = schema.required;
    }
    if (
      schema.additionalProperties &&
      typeof schema.additionalProperties === "object"
    ) {
      prop.additionalProperties = normalizeProperty(
        schema.additionalProperties,
      );
    }
  }
  return stripUndefined(prop) as TsProperty;
}

function isKnownType(type: unknown): type is TsProperty["type"] {
  return typeof type === "string" &&
    ["string", "number", "integer", "boolean", "array", "object"].includes(
      type,
    );
}

function stripUndefined<T extends object>(obj: T): T {
  const out = { ...obj } as Record<string, unknown>;
  for (const key of Object.keys(out)) {
    if (out[key] === undefined) delete out[key];
  }
  return out as T;
}
