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
