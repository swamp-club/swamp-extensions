// Property normalization — ported from si/lib/jsr-systeminit/cf-db/cfDb.ts

import type { CfObjectProperty, CfProperty, RawCfProperty } from "./types.ts";
import { isCfPropertyType } from "./types.ts";

/**
 * Normalizes a CloudFormation property to ensure consistent structure.
 * Standardizes type information and handles anyOf/oneOf constructs.
 */
export function normalizeProperty(
  prop: RawCfProperty,
): CfProperty {
  let result: RawCfProperty = normalizePropertyType(flattenAllOf(prop));
  result = normalizeAnyOfAndOneOfTypes(result);
  return result as CfProperty;
}

/**
 * Merges the members of an untyped `allOf` into one property, so e.g.
 * `allOf: [{ type: "string", enum: [...] }, { default: ... }]` is typed as
 * that string enum. Member `properties` and `required` are combined; the
 * property's own keys win over its members'.
 */
function flattenAllOf(prop: RawCfProperty): RawCfProperty {
  if (typeof prop !== "object" || prop.type || !prop.allOf) return prop;

  const { allOf, ...rest } = prop;
  let merged: RawCfProperty = {};
  for (const member of allOf) {
    const flat = flattenAllOf(member);
    merged = {
      ...merged,
      ...flat,
      ...(merged.properties || flat.properties
        ? { properties: { ...merged.properties, ...flat.properties } }
        : {}),
      ...(merged.required || flat.required
        ? { required: [...(merged.required ?? []), ...(flat.required ?? [])] }
        : {}),
    };
  }
  return {
    ...merged,
    ...rest,
    ...(merged.properties || rest.properties
      ? { properties: { ...merged.properties, ...rest.properties } }
      : {}),
    ...(merged.required || rest.required
      ? {
        required: [
          ...new Set([...(merged.required ?? []), ...(rest.required ?? [])]),
        ],
      }
      : {}),
  };
}

/**
 * Normalizes property type information.
 * - Single types returned as-is
 * - No type → inferred from structure
 * - Array types → normalized to single type
 */
function normalizePropertyType(prop: RawCfProperty): RawCfProperty {
  if (typeof prop === "boolean") throw new Error("unexpected boolean type");

  if (isCfPropertyType(prop.type)) return prop;

  if (typeof prop.type === "string") {
    throw new Error(`Unexpected prop type ${prop.type}`);
  }
  if (typeof prop.type === "number") {
    throw new Error(`Unexpected numeric prop type (${prop.type})`);
  }

  // Infer type when there is none
  if (prop.type === undefined) {
    if (prop.properties || prop.patternProperties) {
      return { ...prop, type: "object" };
    }
    if (prop.$ref) return { ...prop, type: "string" };
    return prop;
  }

  if (Array.isArray(prop.type)) {
    const nonStringType = prop.type.find((t: string) => t !== "string");

    switch (nonStringType) {
      case "boolean":
      case "integer":
      case "number":
        return { ...prop, type: nonStringType };
      case "object":
        return { ...prop, type: "json" };
      case "array": {
        if (!("items" in prop)) {
          throw new Error("array typed prop includes array but has no items");
        }
        return { ...prop, type: "array" };
      }
      default:
        throw new Error("unhandled array type");
    }
  }

  throw new Error("unexpected property type");
}

/**
 * Normalizes properties with anyOf and oneOf constructs into uniform structures.
 */
function normalizeAnyOfAndOneOfTypes(prop: RawCfProperty): RawCfProperty {
  if (prop.type) return prop;

  if (prop.oneOf) {
    const mergedProp: CfObjectProperty & { type: "object" } = {
      description: prop.description,
      type: "object",
      properties: {},
    };
    let jsonProp: (CfProperty & { type: "string" }) | undefined = undefined;
    let arrayProp: (CfProperty & { type: "array" }) | undefined = undefined;

    for (let ofMember of prop.oneOf) {
      if (!mergedProp.properties) {
        throw new Error(`unexpected oneOf`);
      }

      ofMember = normalizePropertyType(ofMember);

      if (ofMember.type === "object" && ofMember.properties) {
        for (const title of Object.keys(ofMember.properties)) {
          mergedProp.properties[title] = normalizeProperty(
            ofMember.properties[title],
          );
        }
      } else if (ofMember.type === "array" && ofMember.items) {
        const title = ofMember.title ?? prop.title;
        if (!title) {
          throw new Error(`oneOf array without title`);
        }
        if (Array.isArray(ofMember.items)) {
          throw new Error("unexpected array as item type");
        }

        arrayProp = {
          title,
          description: prop.description,
          type: "array",
          items: normalizeProperty(ofMember.items),
        };
      } else if (ofMember.type === "object") {
        const title = ofMember.title ?? prop.title;
        jsonProp = {
          title,
          description: prop.description,
          type: "string",
        };
      } else {
        throw new Error(`attempted to process oneOf as not an object or array`);
      }
    }

    if (arrayProp) return arrayProp as unknown as RawCfProperty;
    if (
      mergedProp.properties && Object.keys(mergedProp.properties).length > 0
    ) {
      return mergedProp as unknown as RawCfProperty;
    }
    if (!jsonProp) throw new Error("Unexpected or empty oneOf");
    return jsonProp as unknown as RawCfProperty;
  }

  if (prop.anyOf) {
    let isObject: boolean | undefined;
    const properties: Record<string, CfProperty> = {};

    for (const ofMember of prop.anyOf) {
      if (!isCfObjectProperty(ofMember)) {
        isObject = false;
        break;
      }
      isObject = true;

      if (!ofMember.title) {
        throw new Error(`anyOf of objects without title`);
      }

      if (ofMember.properties) {
        properties[ofMember.title] = {
          ...ofMember.properties[ofMember.title],
        } as CfProperty;
      } else if (ofMember.patternProperties) {
        properties[ofMember.title] = ofMember as unknown as CfProperty;
      }
    }

    if (isObject) {
      return {
        description: prop.description,
        type: "object",
        properties: properties as unknown as Record<string, RawCfProperty>,
      };
    } else {
      return {
        description: prop.description,
        type: "string",
      };
    }
  }

  return prop;
}

function isCfObjectProperty(prop: RawCfProperty): prop is
  & RawCfProperty
  & { title?: string; properties?: Record<string, RawCfProperty> } {
  return (
    typeof prop === "object" &&
    (prop.type === "object" ||
      "properties" in prop ||
      "patternProperties" in prop)
  );
}
