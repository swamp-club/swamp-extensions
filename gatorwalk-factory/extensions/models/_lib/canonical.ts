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

// ---------------------------------------------------------------------------
// JSON safety and content digests.
//
// cel-js returns CEL integers as BigInt, which JSON cannot hold. Everything
// the runtime stores, renders or hashes goes through jsonSafe first. Digests
// are SHA-256 over canonical JSON (object keys sorted, no whitespace), so the
// same payload always hashes the same whatever order its keys arrived in.
// fieldAt resolves a dotted field path, as requireField names one, so the
// gate and the graph analysis read a path the same way.
// ---------------------------------------------------------------------------

/** A value JSON can hold. */
export type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json };

/**
 * Convert a value to plain JSON, or throw when it has no faithful JSON form.
 *
 * - BigInt (a CEL integer) becomes a number when it fits exactly, otherwise a
 *   decimal string.
 * - Date (a CEL timestamp) becomes an ISO 8601 string.
 * - A Map with string keys becomes an object.
 * - Undefined object members are dropped.
 *
 * Non-finite numbers, bytes, durations, sets, other class instances and
 * cyclic values are refused rather than flattened, so different values do
 * not collapse into one. The exception is an integer beyond 2^53, which
 * becomes its decimal string and so matches that string; it can only come
 * from CEL, never from a stored payload, which arrives as JSON. In CEL,
 * convert other values first, e.g. string(d).
 */
export function jsonSafe(value: unknown): Json {
  return toJson(value, new Set<object>());
}

/** `path` holds the containers being converted, to catch a value that
 * contains itself; the same object reached twice without a cycle is fine. */
function toJson(value: unknown, path: Set<object>): Json {
  if (value === null || value === undefined) return null;
  if (typeof value === "bigint") {
    return Number.isSafeInteger(Number(value)) ? Number(value) : String(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError(`${value} has no JSON form`);
    }
    return value;
  }
  if (typeof value === "boolean" || typeof value === "string") return value;
  if (typeof value !== "object") {
    throw new TypeError(`a ${typeof value} has no JSON form`);
  }
  if (value instanceof Date) return value.toISOString();
  if (path.has(value)) throw new TypeError("a cyclic value has no JSON form");
  path.add(value);
  try {
    if (Array.isArray(value)) return value.map((child) => toJson(child, path));
    if (value instanceof Map) {
      const out = emptyObject();
      for (const [key, child] of value) {
        if (typeof key !== "string") {
          throw new TypeError("a map with non-string keys has no JSON form");
        }
        if (child !== undefined) setMember(out, key, toJson(child, path));
      }
      return out;
    }
    if (isPlainObject(value)) {
      const out = emptyObject();
      for (const [key, child] of Object.entries(value)) {
        if (child !== undefined) setMember(out, key, toJson(child, path));
      }
      return out;
    }
    throw new TypeError(
      `a ${
        Object.prototype.toString.call(value).slice(8, -1)
      } has no JSON form; convert it first (in CEL, e.g. string(x))`,
    );
  } finally {
    path.delete(value);
  }
}

function isPlainObject(value: object): boolean {
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function emptyObject(): { [key: string]: Json } {
  return {};
}

/** Set a member without triggering setters, so a key like __proto__ is kept
 * as data. */
function setMember(target: { [key: string]: Json }, key: string, value: Json) {
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  });
}

/** JSON text with object keys sorted at every depth. */
export function canonicalJson(value: unknown): string {
  const sort = (node: Json): Json => {
    if (Array.isArray(node)) return node.map(sort);
    if (node !== null && typeof node === "object") {
      const out = emptyObject();
      for (const key of Object.keys(node).sort()) {
        setMember(out, key, sort(node[key]));
      }
      return out;
    }
    return node;
  };
  return JSON.stringify(sort(jsonSafe(value)));
}

/** SHA-256 of a value's canonical JSON, as `sha256:<hex>`. */
export async function digestOf(value: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(canonicalJson(value));
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return `sha256:${
    Array.from(hash, (b) => b.toString(16).padStart(2, "0")).join("")
  }`;
}

/**
 * The value at a dotted field path (`a.b` is field `b` of field `a`), or
 * undefined when a segment is missing or a step is not an object (or is an
 * array).
 */
export function fieldAt(
  payload: Json | undefined,
  path: string,
): Json | undefined {
  let current: Json | undefined = payload;
  for (const segment of path.split(".")) {
    if (
      current === null || typeof current !== "object" || Array.isArray(current)
    ) {
      return undefined;
    }
    // Own properties only: a path like __proto__ must not reach the prototype.
    if (!Object.hasOwn(current, segment)) return undefined;
    current = current[segment];
  }
  return current;
}
