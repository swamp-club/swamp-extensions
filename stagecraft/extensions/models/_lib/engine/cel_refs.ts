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

import type { ProductKind } from "./journal.ts";

// ---------------------------------------------------------------------------
// Fixed product references in CEL: the names an expression reads from the
// context's product maps (cel_context.ts). Used by the factory definition
// check to reject names that are not declared, and by anything else that asks
// which products an expression depends on.
//
// - A read is member or index access with a literal name: `artifacts.plan`,
//   `evidence["change-request"]`, `validations.artifacts["plan"]`,
//   `validations["evidence"]["verification"]`.
// - A test asks whether the product exists: the operand of `has()` at any
//   depth (`has(evidence.y.payload.f)`), or a string literal on the left of
//   `in` with a product map on the right (`"plan" in artifacts`).
// - A lookup by variable or computed key (`artifacts[k]`) is not a fixed
//   reference, nor is a macro called on a map (`artifacts.exists(k, ...)`) or
//   `in` on a payload (`"f" in evidence["v"].payload`, whose
//   `evidence["v"]` is still a read).
//
// The walk relies on the CEL vocabulary being reserved (definition_schema.ts),
// so `artifacts`, `evidence` and `validations` always mean the context's.
// ---------------------------------------------------------------------------

/** A node of a cel-js 7 AST. */
export interface CelNode {
  op: string;
  args: unknown;
}

export function isCelNode(value: unknown): value is CelNode {
  return value !== null && typeof value === "object" && "op" in value &&
    "args" in value;
}

/** The context maps that hold products by name. */
export type ProductMap =
  | "artifacts"
  | "evidence"
  | "validations.artifacts"
  | "validations.evidence";

export interface ProductRef {
  map: ProductMap;
  name: string;
  /** `test` when the expression only asks whether the product exists. */
  use: "read" | "test";
}

/** The kind of product a map holds. */
export function productKind(map: ProductMap): ProductKind {
  return map === "artifacts" || map === "validations.artifacts"
    ? "artifact"
    : "evidence";
}

/** Every fixed product reference in a parsed expression, in source order. */
export function productRefs(ast: unknown): ProductRef[] {
  const out: ProductRef[] = [];
  walk(ast, out);
  return out;
}

/** The literal key of a member (`x.name`) or index (`x["name"]`) access. */
function access(node: CelNode): { target: unknown; key: string } | null {
  if (node.op !== "." && node.op !== "[]") return null;
  const [target, key] = node.args as [unknown, unknown];
  if (node.op === "." && typeof key === "string") return { target, key };
  if (
    node.op === "[]" && isCelNode(key) && key.op === "value" &&
    typeof key.args === "string"
  ) {
    return { target, key: key.args };
  }
  return null;
}

function isId(node: unknown, name: string): boolean {
  return isCelNode(node) && node.op === "id" && node.args === name;
}

/** The product map a node denotes, if it is one. */
function mapOf(node: unknown): ProductMap | null {
  if (isId(node, "artifacts")) return "artifacts";
  if (isId(node, "evidence")) return "evidence";
  if (!isCelNode(node)) return null;
  const a = access(node);
  if (a === null || !isId(a.target, "validations")) return null;
  if (a.key === "artifacts") return "validations.artifacts";
  if (a.key === "evidence") return "validations.evidence";
  return null;
}

/** The product a node reads, if it is a fixed reference. */
function refOf(node: CelNode): { map: ProductMap; name: string } | null {
  const a = access(node);
  if (a === null) return null;
  const map = mapOf(a.target);
  return map === null ? null : { map, name: a.key };
}

function walk(node: unknown, out: ProductRef[]): void {
  if (Array.isArray(node)) {
    for (const child of node) walk(child, out);
    return;
  }
  if (!isCelNode(node) || node.op === "id" || node.op === "value") return;
  const ref = refOf(node);
  if (ref !== null) {
    out.push({ ...ref, use: "read" });
    return;
  }
  if (node.op === "in") {
    const [left, right] = node.args as [unknown, unknown];
    const map = mapOf(right);
    if (
      map !== null && isCelNode(left) && left.op === "value" &&
      typeof left.args === "string"
    ) {
      out.push({ map, name: left.args, use: "test" });
      return;
    }
  }
  if (node.op === "call") {
    const [name, args] = node.args as [unknown, unknown[]];
    if (name === "has" && args.length === 1) {
      walkTested(args[0], out);
      return;
    }
  }
  walk(node.args, out);
}

/** The operand of `has()`: the product at the root of its access chain is
 * tested, not read. Index expressions along the chain are walked as usual. */
function walkTested(node: unknown, out: ProductRef[]): void {
  let current = node;
  while (isCelNode(current) && (current.op === "." || current.op === "[]")) {
    const ref = refOf(current);
    if (ref !== null) {
      out.push({ ...ref, use: "test" });
      return;
    }
    const [target, key] = current.args as [unknown, unknown];
    if (current.op === "[]") walk(key, out);
    current = target;
  }
  walk(current, out);
}
