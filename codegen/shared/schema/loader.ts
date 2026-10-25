// Schema loading — ported from si/lib/jsr-systeminit/cf-db/cfDb.ts

import $RefParser from "@apidevtools/json-schema-ref-parser";
import type { CfDb, CfProperty, CfSchema, RawCfProperty } from "./types.ts";

/**
 * True when the service segment of a type name ("AWS::Events::EventBus" →
 * "events") equals one of the requested services, ignoring case. A substring
 * match would pull single types into unrelated services ("events" matching
 * AWS::RDS::EventSubscription), and regenerating a service from a partial
 * type set deletes its other models.
 */
export function matchesServiceFilter(
  typeName: string,
  services: string[],
): boolean {
  const service = typeName.split("::")[1]?.toLowerCase();
  return service !== undefined &&
    services.some((s) => s.toLowerCase() === service);
}

/**
 * Loads the CloudFormation database from the bundled cf-schema.json.
 * Dereferences all $ref pointers and marks definition props with defName.
 */
export async function loadCfDatabase(options?: {
  services?: string[];
  schemaPath?: string;
}): Promise<CfDb> {
  const schemaPath = options?.schemaPath ??
    new URL("../../schemas/cf-schema.json", import.meta.url).pathname;

  const rawText = await Deno.readTextFile(schemaPath);
  const rawCfSchema: unknown[] = JSON.parse(rawText);

  const db: CfDb = {};

  for (const cfSchema of rawCfSchema) {
    if (!isRawCfSchema(cfSchema)) continue;

    const typeName: string = cfSchema.typeName;

    if (
      options?.services && !matchesServiceFilter(typeName, options.services)
    ) {
      continue;
    }

    // Mark all definition props with their enclosing name for doc link generation
    if (cfSchema.definitions) {
      for (
        const [defName, defProp] of Object.entries(
          cfSchema.definitions as Record<string, CfProperty>,
        )
      ) {
        for (const cfProp of nestedCfProps(defProp)) {
          (cfProp as { defName?: string }).defName = defName;
        }
      }
    }

    // Dereference the schema
    const dereferencedSchema = await $RefParser.dereference(
      cfSchema as Record<string, unknown>,
      {
        dereference: {
          circular: "ignore",
          onDereference: (_path: string, ref: Record<string, unknown>) => {
            const name = _path.split("/").pop();
            ref.title = ref.title ?? name;
          },
        },
      },
    ) as unknown as CfSchema;

    db[typeName] = dereferencedSchema;
  }

  return db;
}

/**
 * Inlines the `$ref`s that `circular: "ignore"` leaves in place. The parser
 * leaves every ref whose target leads into a cycle unresolved — not only the
 * self-reference itself — so a property like AWS::Budgets::Budget's `Budget`
 * (→ BudgetData → FilterExpression → recursive Expression) stays a bare
 * `$ref` that later stages either drop or type as a string.
 *
 * Each ref is replaced with a copy of its definition. A ref back to a
 * definition already being expanded on the current path is a true cycle and
 * becomes a free-form terminal: an untyped object for object-shaped
 * definitions, an empty schema otherwise. Returns a new schema; the input's
 * properties are not mutated. Throws on a non-local or missing ref; the AWS
 * pipeline calls it per type, so the error fails only that type.
 */
export function resolveResidualRefs(schema: CfSchema): CfSchema {
  const definitions = (schema.definitions ?? {}) as Record<
    string,
    RawCfProperty
  >;
  const properties: Record<string, CfProperty> = {};
  for (const [name, prop] of Object.entries(schema.properties ?? {})) {
    properties[name] = resolveNode(
      prop as RawCfProperty,
      definitions,
      [],
      schema.typeName,
    ) as CfProperty;
  }
  return { ...schema, properties };
}

function resolveNode(
  node: RawCfProperty,
  definitions: Record<string, RawCfProperty>,
  expanding: string[],
  typeName: string,
): RawCfProperty {
  if (typeof node !== "object" || node === null) return node;

  if (typeof node.$ref === "string") {
    const { $ref, ...siblings } = node;
    const match = /^#\/definitions\/(.+)$/.exec($ref);
    if (!match) {
      throw new Error(`${typeName}: unsupported $ref ${$ref}`);
    }
    const defName = match[1].replaceAll("~1", "/").replaceAll("~0", "~");
    const definition = definitions[defName];
    if (!definition) {
      throw new Error(`${typeName}: $ref to missing definition ${defName}`);
    }
    if (expanding.includes(defName)) {
      const objectShaped = definition.type === "object" ||
        definition.properties !== undefined ||
        definition.patternProperties !== undefined;
      return objectShaped
        ? {
          type: "object",
          title: defName,
          ...(siblings.description !== undefined
            ? { description: siblings.description }
            : definition.description !== undefined
            ? { description: definition.description }
            : {}),
        }
        : {
          ...(siblings.description !== undefined
            ? { description: siblings.description }
            : {}),
        };
    }
    return resolveNode(
      { ...definition, title: definition.title ?? defName, ...siblings },
      definitions,
      [...expanding, defName],
      typeName,
    );
  }

  const result: RawCfProperty = { ...node };
  if (node.properties) {
    result.properties = resolveRecord(
      node.properties,
      definitions,
      expanding,
      typeName,
    );
  }
  if (node.patternProperties) {
    result.patternProperties = resolveRecord(
      node.patternProperties,
      definitions,
      expanding,
      typeName,
    );
  }
  if (node.items) {
    result.items = resolveNode(node.items, definitions, expanding, typeName);
  }
  if (
    typeof node.additionalProperties === "object" &&
    node.additionalProperties !== null
  ) {
    result.additionalProperties = resolveNode(
      node.additionalProperties,
      definitions,
      expanding,
      typeName,
    );
  }
  for (const key of ["oneOf", "anyOf", "allOf"] as const) {
    const variants = node[key];
    if (variants) {
      result[key] = variants.map((v) =>
        resolveNode(v, definitions, expanding, typeName)
      );
    }
  }
  return result;
}

function resolveRecord(
  record: Record<string, RawCfProperty>,
  definitions: Record<string, RawCfProperty>,
  expanding: string[],
  typeName: string,
): Record<string, RawCfProperty> {
  const resolved: Record<string, RawCfProperty> = {};
  for (const [name, prop] of Object.entries(record)) {
    resolved[name] = resolveNode(prop, definitions, expanding, typeName);
  }
  return resolved;
}

interface RawCfSchemaShape {
  typeName: string;
  definitions?: Record<string, unknown>;
  properties?: Record<string, unknown>;
  [key: string]: unknown;
}

function isRawCfSchema(value: unknown): value is RawCfSchemaShape {
  return (
    typeof value === "object" &&
    value !== null &&
    "typeName" in value &&
    typeof (value as Record<string, unknown>).typeName === "string"
  );
}

function* nestedCfProps(prop: CfProperty): Generator<CfProperty> {
  yield prop;
  const p = prop as RawCfProperty;
  for (
    const item of (p.anyOf as CfProperty[] | undefined) ?? []
  ) yield* nestedCfProps(item);
  for (
    const item of (p.oneOf as CfProperty[] | undefined) ?? []
  ) yield* nestedCfProps(item);
  for (
    const item of (p.allOf as CfProperty[] | undefined) ?? []
  ) yield* nestedCfProps(item);
  if ("properties" in p && p.properties) {
    for (const child of Object.values(p.properties)) {
      yield* nestedCfProps(child as CfProperty);
    }
  }
  if ("patternProperties" in p && p.patternProperties) {
    for (const child of Object.values(p.patternProperties)) {
      yield* nestedCfProps(child as CfProperty);
    }
  }
  if ("items" in p && p.items) yield* nestedCfProps(p.items as CfProperty);
}
