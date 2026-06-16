// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

import { z } from "npm:zod@4.3.6";
import type { ArtifactSpec, DeclaredSchema } from "./definition_schema.ts";
import { SeveritySchema } from "./definition_schema.ts";

// ---------------------------------------------------------------------------
// Declared schema → zod compiler.
//
// Artifact payload schemas are user configuration (a JSON-Schema-flavored
// keyword subset, already shape-validated by the meta-schema). We compile
// them to zod so payload validation uses the same engine — and produces the
// same path-bearing error messages — as everything else in swamp.
// ---------------------------------------------------------------------------

/** Payload shape required of `kind: findings` artifacts. */
export const FindingSchema = z.looseObject({
  id: z.string().min(1),
  severity: SeveritySchema,
  description: z.string().min(1),
  category: z.string().optional(),
  resolved: z.boolean().optional(),
  resolutionNote: z.string().optional(),
});

export type Finding = z.infer<typeof FindingSchema>;

export const FindingsPayloadSchema = z.looseObject({
  findings: z.array(FindingSchema),
});

export type FindingsPayload = z.infer<typeof FindingsPayloadSchema>;

/** Compile a declared schema (validated subset) into a zod schema. */
export function compileDeclaredSchema(decl: DeclaredSchema): z.ZodType {
  switch (decl.type) {
    case "string": {
      let s = z.string();
      if (decl.minLength !== undefined) s = s.min(decl.minLength);
      if (decl.maxLength !== undefined) s = s.max(decl.maxLength);
      if (decl.pattern !== undefined) s = s.regex(new RegExp(decl.pattern));
      if (decl.enum !== undefined) {
        const allowed = decl.enum;
        return s.refine(
          (v) => allowed.includes(v),
          `must be one of: ${allowed.join(", ")}`,
        );
      }
      return s;
    }
    case "number":
    case "integer": {
      let n = z.number();
      if (decl.type === "integer") n = n.int();
      if (decl.minimum !== undefined) n = n.min(decl.minimum);
      if (decl.maximum !== undefined) n = n.max(decl.maximum);
      if (decl.enum !== undefined) {
        const allowed = decl.enum;
        return n.refine(
          (v) => allowed.includes(v),
          `must be one of: ${allowed.join(", ")}`,
        );
      }
      return n;
    }
    case "boolean":
      return z.boolean();
    case "array": {
      let a = z.array(
        decl.items !== undefined
          ? compileDeclaredSchema(decl.items)
          : z.unknown(),
      );
      if (decl.minItems !== undefined) a = a.min(decl.minItems);
      if (decl.maxItems !== undefined) a = a.max(decl.maxItems);
      return a;
    }
    case "object": {
      const required = new Set(decl.required ?? []);
      const shape: Record<string, z.ZodType> = {};
      for (
        const [key, child] of Object.entries(decl.properties ?? {})
      ) {
        const compiled = compileDeclaredSchema(child);
        shape[key] = required.has(key) ? compiled : compiled.optional();
      }
      for (const key of required) {
        if (shape[key] === undefined) {
          // Required key without a declared property: any value accepted,
          // presence enforced.
          shape[key] = z.unknown().refine(
            (v) => v !== undefined,
            "required",
          );
        }
      }
      // Loose: undeclared keys pass through. The declared schema constrains
      // what it names; it does not forbid extra payload fields.
      return z.looseObject(shape);
    }
  }
}

/**
 * Compile the full payload validator for an artifact spec: the declared
 * schema (if any) plus the findings contract (if `kind: findings`).
 */
export function compileArtifactSchema(spec: ArtifactSpec): z.ZodType {
  const parts: z.ZodType[] = [];
  if (spec.kind === "findings") parts.push(FindingsPayloadSchema);
  if (spec.schema !== undefined) parts.push(compileDeclaredSchema(spec.schema));
  if (parts.length === 0) {
    // No declared constraints: any JSON object payload is acceptable.
    return z.record(z.string(), z.unknown());
  }
  if (parts.length === 1) return parts[0];
  return parts[0].and(parts[1]);
}

/** Format zod issues as compact, path-bearing reasons. */
export function formatIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
    return `${path}: ${issue.message}`;
  });
}

/**
 * Validate a payload against an artifact spec. Returns null when valid,
 * otherwise the list of path-bearing validation errors.
 */
export function validateArtifactPayload(
  spec: ArtifactSpec,
  payload: unknown,
): string[] | null {
  const result = compileArtifactSchema(spec).safeParse(payload);
  if (result.success) return null;
  return formatIssues(result.error);
}
