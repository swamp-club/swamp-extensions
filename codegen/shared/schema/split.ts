// Property splitting — ported from si/bin/clover/src/pipelines/aws/spec.ts
// and si/bin/clover/src/pipelines/generic/index.ts

import type { CfProperty, CfSchema, OnlyProperties } from "./types.ts";

/**
 * Normalizes property paths from JSON Pointer format to property paths
 * relative to the schema's properties, keeping every segment of a nested
 * pointer. E.g., "/properties/foo" or "/foo" -> "foo", and
 * "/properties/Budget/BudgetName" -> "Budget/BudgetName". Keeping only the
 * last segment would make a nested pointer collide with an unrelated
 * top-level property of the same name.
 */
export function normalizeOnlyProperties(
  props: string[] | undefined,
): string[] {
  const newProps: string[] = [];
  for (const prop of props ?? []) {
    const newProp = prop.startsWith("/properties/")
      ? prop.slice("/properties/".length)
      : prop.replace(/^\//, "");
    if (newProp) {
      newProps.push(newProp);
    }
  }
  return newProps;
}

/**
 * Splits a CF schema's properties into domain (writable) and resource (all) sets.
 *
 * Domain properties: writable properties (not readOnly) — used for InputAttributesSchema.
 * Resource properties: ALL properties — used for ResourceAttributesSchema, because
 * AWS CloudControl GetResource returns all properties (both input and readOnly).
 */
export function splitAwsProperties(
  schema: CfSchema,
  onlyProperties: OnlyProperties,
): {
  domainProperties: Record<string, CfProperty>;
  resourceValueProperties: Record<string, CfProperty>;
} {
  const domainProperties = cleanProperties(
    pruneProperties(
      schema.properties as Record<string, CfProperty>,
      onlyProperties,
      false, // keep writable properties
    ),
  );

  // Resource schema includes ALL properties since AWS returns everything on GetResource
  const resourceValueProperties = cleanProperties(
    schema.properties as Record<string, CfProperty>,
  );

  return { domainProperties, resourceValueProperties };
}

/**
 * Filters properties by readOnly/writable status, recursing into nested objects.
 */
function pruneProperties(
  properties: Record<string, CfProperty>,
  onlyProperties: OnlyProperties,
  keepReadOnly: boolean,
  pathPrefix: string = "",
): Record<string, CfProperty> {
  const readOnlySet = new Set(onlyProperties.readOnly);
  const result: Record<string, CfProperty> = {};

  for (const [name, prop] of Object.entries(properties)) {
    if (!prop) continue;

    const cfProp = prop as CfProperty;
    const currentPath = pathPrefix ? `${pathPrefix}/${name}` : name;
    const isReadOnly = readOnlySet.has(currentPath);
    const shouldKeep = keepReadOnly ? isReadOnly : !isReadOnly;

    // Check if this is an object with nested properties
    if (
      typeof cfProp === "object" &&
      cfProp !== null &&
      "properties" in cfProp &&
      (cfProp as { properties?: unknown }).properties
    ) {
      const nestedProps =
        (cfProp as { properties: Record<string, CfProperty> }).properties;
      const prunedChildren = pruneProperties(
        nestedProps,
        onlyProperties,
        keepReadOnly,
        currentPath,
      );

      // Only include if this object has matching children
      if (Object.keys(prunedChildren).length > 0) {
        result[name] = { ...cfProp, properties: prunedChildren } as CfProperty;
      }
    } else if (shouldKeep) {
      result[name] = cfProp;
    }
  }

  return result;
}

/**
 * Removes entries that are not property schemas at all. Untyped schemas are
 * kept: normalizeProperty infers object from properties/patternProperties,
 * and the Zod generator emits z.unknown() for a free-form `{}` schema.
 */
function cleanProperties(
  properties: Record<string, CfProperty>,
): Record<string, CfProperty> {
  const cleaned: Record<string, CfProperty> = {};
  for (const [name, prop] of Object.entries(properties)) {
    if (typeof prop === "object" && prop !== null) {
      cleaned[name] = prop;
    }
  }
  return cleaned;
}

/**
 * Throws when a property the CF schema requires (and that is not read-only)
 * did not survive the split, so a resource that could not be created fails
 * generation instead of shipping without the property.
 */
export function assertRequiredPropertiesKept(
  typeName: string,
  schema: CfSchema,
  onlyProperties: OnlyProperties,
  domainProperties: Record<string, CfProperty>,
): void {
  const readOnlySet = new Set(onlyProperties.readOnly);
  const missing = (schema.required ?? []).filter((name) =>
    !readOnlySet.has(name) && !(name in domainProperties)
  );
  if (missing.length > 0) {
    throw new Error(
      `${typeName}: required properties dropped by codegen: ${
        missing.join(", ")
      }`,
    );
  }
}
