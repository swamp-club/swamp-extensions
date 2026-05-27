// Core Zod code generator: CfProperty → TypeScript source code with Zod schemas

import type {
  CfProperty,
  CfSchema,
  OnlyProperties,
  RawCfProperty,
} from "./schema/types.ts";
import { normalizeProperty } from "./schema/normalize.ts";
import { htmlToMarkdown, pcreToRegexp } from "./util.ts";

export interface ExtractedSchema {
  name: string; // e.g., "BlockDeviceMappingSchema"
  declaration: string; // Full `const ... = z.object({...});`
}

export interface ZodGeneratorResult {
  extractedSchemas: ExtractedSchema[];
  inputSchemaBody: string; // z.object({...}) contents for InputAttributes
  resourceSchemaBody: string; // z.object({...}) contents for ResourceAttributes
}

/**
 * Widened view of a CfProperty for accessing fields across union variants.
 * After normalization, a CfProperty always has a `type` field and may have
 * any of the variant-specific fields. This avoids `as any` casts in the
 * generator code.
 */
interface WidenedCfProperty {
  type?: string;
  title?: string;
  description?: string;
  enum?: (string | number)[];
  properties?: Record<string, CfProperty>;
  patternProperties?: Record<string, CfProperty>;
  additionalProperties?: boolean | CfProperty;
  items?: CfProperty;
  oneOf?: CfProperty[];
  anyOf?: CfProperty[];
  required?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  defName?: string;
}

export interface ZodGeneratorOptions {
  /** Maximum recursion depth for nested schemas. Beyond this depth, z.unknown() is emitted.
   *  When undefined (default), there is no limit. */
  maxDepth?: number;
}

/**
 * Generate Zod schemas from domain and resource properties.
 */
export function generateZodSchemas(
  domainProperties: Record<string, CfProperty>,
  resourceValueProperties: Record<string, CfProperty>,
  cfSchema: CfSchema,
  onlyProperties: OnlyProperties,
  options?: ZodGeneratorOptions,
): ZodGeneratorResult {
  const extractedSchemas: ExtractedSchema[] = [];
  const seenTitles = new Set<string>();
  const maxDepth = options?.maxDepth;

  // Generate input schema body (domain properties)
  const inputLines: string[] = [];
  for (const [name, cfProp] of Object.entries(domainProperties)) {
    const normalized = safeNormalize(cfProp as RawCfProperty);
    if (!normalized) continue;

    const isRequired = cfSchema.required?.includes(name) ?? false;
    const { expression } = generateZodForProperty(
      name,
      normalized,
      cfSchema.required,
      0,
      extractedSchemas,
      seenTitles,
      maxDepth,
    );
    const desc = getDescription(normalized);
    let line = `  ${name}: ${expression}`;
    if (desc) {
      line += `.describe(${JSON.stringify(desc)})`;
    }
    if (!isRequired) {
      line += ".optional()";
    }
    line += ",";
    inputLines.push(line);
  }

  // Generate resource schema body (ALL properties — simplified types for what AWS returns)
  const resourceLines: string[] = [];
  const primaryIdSet = new Set(onlyProperties.primaryIdentifier);

  for (const [name, cfProp] of Object.entries(resourceValueProperties)) {
    const normalized = safeNormalize(cfProp as RawCfProperty);
    if (!normalized) continue;

    const isPrimaryId = primaryIdSet.has(name);
    // Resource schema uses simplified types (no constraints, no enums)
    const { expression } = generateSimplifiedZodForProperty(
      name,
      normalized,
      0,
      extractedSchemas,
      seenTitles,
      maxDepth,
    );
    let line = `  ${name}: ${expression}`;
    if (!isPrimaryId) {
      line += ".optional()";
    }
    line += ",";
    resourceLines.push(line);
  }

  return {
    extractedSchemas,
    inputSchemaBody: inputLines.join("\n"),
    resourceSchemaBody: resourceLines.join("\n"),
  };
}

function safeNormalize(cfProp: RawCfProperty): CfProperty | undefined {
  try {
    return normalizeProperty(cfProp);
  } catch {
    return undefined;
  }
}

function getDescription(cfProp: CfProperty): string | null {
  const w = cfProp as WidenedCfProperty;
  if (!w.description) return null;
  return htmlToMarkdown(w.description);
}

/**
 * Recursively generates a Zod expression for a CfProperty.
 */
function generateZodForProperty(
  name: string,
  cfProp: CfProperty,
  parentRequired: string[] | undefined,
  depth: number,
  extractedSchemas: ExtractedSchema[],
  seenTitles: Set<string>,
  maxDepth?: number,
): { expression: string } {
  if (maxDepth !== undefined && depth >= maxDepth) {
    return { expression: "z.unknown()" };
  }

  const prop = cfProp as WidenedCfProperty;

  const type = prop.type;

  switch (type) {
    case "boolean":
      return { expression: "z.boolean()" };

    case "string": {
      // Check for enum
      if (prop.enum && prop.enum.length > 0) {
        const enumValues = prop.enum.map((v) => JSON.stringify(v));
        return { expression: `z.enum([${enumValues.join(", ")}])` };
      }
      let expr = "z.string()";
      if (prop.minLength !== undefined) {
        expr += `.min(${prop.minLength})`;
      }
      if (prop.maxLength !== undefined) {
        expr += `.max(${prop.maxLength})`;
      }
      if (prop.pattern) {
        const converted = pcreToRegexp(prop.pattern);
        if (converted) {
          const regexStr = converted.flags
            ? `new RegExp(${JSON.stringify(converted.pattern)}, ${
              JSON.stringify(converted.flags)
            })`
            : `new RegExp(${JSON.stringify(converted.pattern)})`;
          expr += `.regex(${regexStr})`;
        }
      }
      return { expression: expr };
    }

    case "json":
      return { expression: "z.record(z.string(), z.unknown())" };

    case "number": {
      if (prop.enum && prop.enum.length > 0) {
        const literals = prop.enum.map((v) => `z.literal(${v})`);
        return { expression: `z.union([${literals.join(", ")}])` };
      }
      let expr = "z.number()";
      if (prop.minimum !== undefined) {
        expr += `.min(${prop.minimum})`;
      }
      if (prop.maximum !== undefined) {
        expr += `.max(${prop.maximum})`;
      }
      return { expression: expr };
    }

    case "integer": {
      if (prop.enum && prop.enum.length > 0) {
        const literals = prop.enum.map((v) => `z.literal(${v})`);
        return { expression: `z.union([${literals.join(", ")}])` };
      }
      let expr = "z.number().int()";
      if (prop.minimum !== undefined) {
        expr += `.min(${prop.minimum})`;
      }
      if (prop.maximum !== undefined) {
        expr += `.max(${prop.maximum})`;
      }
      return { expression: expr };
    }

    case "array": {
      if (!prop.items) {
        return { expression: "z.array(z.unknown())" };
      }
      const itemsNormalized = safeNormalize(prop.items as RawCfProperty);
      if (!itemsNormalized) {
        return { expression: "z.array(z.unknown())" };
      }
      const itemResult = generateZodForProperty(
        name + "Item",
        itemsNormalized,
        undefined,
        depth + 1,
        extractedSchemas,
        seenTitles,
        maxDepth,
      );
      return { expression: `z.array(${itemResult.expression})` };
    }

    case "object": {
      return generateObjectZod(
        name,
        prop,
        depth,
        extractedSchemas,
        seenTitles,
        maxDepth,
      );
    }

    default: {
      // Handle multi-type or untyped
      if (!type) {
        // Could be a multitype with oneOf/anyOf — try to use it as-is
        if (prop.oneOf || prop.anyOf) {
          const reNormalized = safeNormalize(
            cfProp as unknown as RawCfProperty,
          );
          if (reNormalized && (reNormalized as WidenedCfProperty).type) {
            return generateZodForProperty(
              name,
              reNormalized,
              parentRequired,
              depth,
              extractedSchemas,
              seenTitles,
              maxDepth,
            );
          }
        }
        // If it has properties, treat as object
        if (prop.properties) {
          return generateObjectZod(
            name,
            { ...prop, type: "object" },
            depth,
            extractedSchemas,
            seenTitles,
            maxDepth,
          );
        }
        return { expression: "z.unknown()" };
      }
      return { expression: "z.unknown()" };
    }
  }
}

/**
 * Generates a simplified Zod expression for resource schema properties.
 * No constraints, no enums, no patterns — just basic type shapes.
 */
function generateSimplifiedZodForProperty(
  name: string,
  cfProp: CfProperty,
  depth: number,
  extractedSchemas: ExtractedSchema[],
  seenTitles: Set<string>,
  maxDepth?: number,
): { expression: string } {
  if (maxDepth !== undefined && depth >= maxDepth) {
    return { expression: "z.unknown()" };
  }

  const prop = cfProp as WidenedCfProperty;
  const type = prop.type;

  switch (type) {
    case "boolean":
      return { expression: "z.boolean()" };

    case "string":
      return { expression: "z.string()" };
    case "json":
      return {
        expression: "z.union([z.string(), z.record(z.string(), z.unknown())])",
      };

    case "number":
    case "integer":
      return { expression: "z.number()" };

    case "array": {
      if (!prop.items) {
        return { expression: "z.array(z.unknown())" };
      }
      const itemsNormalized = safeNormalize(prop.items as RawCfProperty);
      if (!itemsNormalized) {
        return { expression: "z.array(z.unknown())" };
      }
      const itemResult = generateSimplifiedZodForProperty(
        name + "Item",
        itemsNormalized,
        depth + 1,
        extractedSchemas,
        seenTitles,
        maxDepth,
      );
      return { expression: `z.array(${itemResult.expression})` };
    }

    case "object": {
      // For resource schema objects, use simpler handling
      if (
        !prop.properties &&
        (prop.patternProperties || prop.additionalProperties)
      ) {
        return { expression: "z.record(z.string(), z.unknown())" };
      }
      if (prop.properties) {
        // Check if an extracted schema already exists for this (from the input pass)
        const title = prop.title;
        if (title) {
          const schemaName = toPascalCase(title) + "Schema";
          const existing = extractedSchemas.find((s) => s.name === schemaName);
          if (existing) {
            return { expression: schemaName };
          }
        }
        // Inline object with properly indented children
        const lines: string[] = [];
        for (
          const [childName, childProp] of Object.entries(
            prop.properties as Record<string, CfProperty>,
          )
        ) {
          const normalized = safeNormalize(childProp as RawCfProperty);
          if (!normalized) continue;
          const childResult = generateSimplifiedZodForProperty(
            childName,
            normalized,
            depth + 1,
            extractedSchemas,
            seenTitles,
            maxDepth,
          );
          // Use 4 spaces for nested object children to distinguish from top-level
          lines.push(`    ${childName}: ${childResult.expression},`);
        }
        return { expression: `z.object({\n${lines.join("\n")}\n  })` };
      }
      return { expression: "z.record(z.string(), z.unknown())" };
    }

    default: {
      if (!type) {
        if (prop.oneOf || prop.anyOf) {
          const reNormalized = safeNormalize(
            cfProp as unknown as RawCfProperty,
          );
          if (reNormalized && (reNormalized as WidenedCfProperty).type) {
            return generateSimplifiedZodForProperty(
              name,
              reNormalized,
              depth,
              extractedSchemas,
              seenTitles,
              maxDepth,
            );
          }
        }
        if (prop.properties) {
          return generateSimplifiedZodForProperty(
            name,
            { ...prop, type: "object" } as CfProperty,
            depth,
            extractedSchemas,
            seenTitles,
            maxDepth,
          );
        }
        return { expression: "z.unknown()" };
      }
      return { expression: "z.unknown()" };
    }
  }
}

function generateObjectZod(
  name: string,
  prop: WidenedCfProperty,
  depth: number,
  extractedSchemas: ExtractedSchema[],
  seenTitles: Set<string>,
  maxDepth?: number,
): { expression: string } {
  // patternProperties or additionalProperties with no regular properties → z.record()
  if (
    !prop.properties &&
    (prop.patternProperties || prop.additionalProperties)
  ) {
    let valueSchema = "z.unknown()";

    if (prop.patternProperties) {
      const patterns = Object.values(prop.patternProperties);
      if (patterns.length > 0) {
        const patternProp = safeNormalize(patterns[0] as RawCfProperty);
        if (patternProp) {
          const result = generateZodForProperty(
            name + "Value",
            patternProp,
            undefined,
            depth + 1,
            extractedSchemas,
            seenTitles,
            maxDepth,
          );
          valueSchema = result.expression;
        }
      }
    } else if (
      prop.additionalProperties &&
      typeof prop.additionalProperties === "object"
    ) {
      const addProp = safeNormalize(
        prop.additionalProperties as RawCfProperty,
      );
      if (addProp) {
        const result = generateZodForProperty(
          name + "Value",
          addProp,
          undefined,
          depth + 1,
          extractedSchemas,
          seenTitles,
          maxDepth,
        );
        valueSchema = result.expression;
      }
    }

    return { expression: `z.record(z.string(), ${valueSchema})` };
  }

  // Object with properties
  if (prop.properties) {
    const requiredFields: string[] = prop.required ?? [];

    // Check for extraction at depth > 0
    const title = prop.title;
    if (depth > 0 && title) {
      const schemaName = toPascalCase(title) + "Schema";

      // Circular ref guard
      if (seenTitles.has(title)) {
        return { expression: "z.unknown()" };
      }

      // Check if already extracted
      const existing = extractedSchemas.find((s) => s.name === schemaName);
      if (existing) {
        return { expression: schemaName };
      }

      seenTitles.add(title);

      const body = generateObjectBody(
        prop.properties,
        requiredFields,
        depth + 1,
        extractedSchemas,
        seenTitles,
        maxDepth,
      );

      // Extracted schemas are used only inside the generated model file
      // (they're referenced by GlobalArgsSchema / StateSchema); keeping them
      // un-exported narrows the entrypoint's public API surface so
      // `deno doc --lint` stays clean of missing-jsdoc / missing-explicit-type
      // warnings on every extracted CF sub-schema.
      const declaration = `const ${schemaName} = z.object({\n${body}\n});`;
      extractedSchemas.push({ name: schemaName, declaration });

      seenTitles.delete(title);

      return { expression: schemaName };
    }

    // Inline object
    const body = generateObjectBody(
      prop.properties,
      requiredFields,
      depth + 1,
      extractedSchemas,
      seenTitles,
      maxDepth,
    );
    return { expression: `z.object({\n${body}\n})` };
  }

  // Object with no properties at all — freeform JSON (e.g. PolicyDocument)
  return { expression: "z.record(z.string(), z.unknown())" };
}

function generateObjectBody(
  properties: Record<string, CfProperty>,
  requiredFields: string[],
  depth: number,
  extractedSchemas: ExtractedSchema[],
  seenTitles: Set<string>,
  maxDepth?: number,
): string {
  const requiredSet = new Set(requiredFields);
  const lines: string[] = [];

  for (const [childName, childProp] of Object.entries(properties)) {
    const normalized = safeNormalize(childProp as RawCfProperty);
    if (!normalized) continue;

    const { expression } = generateZodForProperty(
      childName,
      normalized,
      requiredFields,
      depth,
      extractedSchemas,
      seenTitles,
      maxDepth,
    );

    const isRequired = requiredSet.has(childName);
    const desc = getDescription(normalized);
    const indent = "  ".repeat(depth > 0 ? 1 : 2);

    let line = `${indent}${childName}: ${expression}`;
    if (desc) {
      line += `.describe(${JSON.stringify(desc)})`;
    }
    if (!isRequired) {
      line += ".optional()";
    }
    line += ",";
    lines.push(line);
  }

  return lines.join("\n");
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
