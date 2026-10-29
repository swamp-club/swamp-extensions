import type { ModelUsage } from "./schemas.ts";

export type JsonObject = Record<string, unknown>;

export function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A finite, non-negative number (a token count or cost), or undefined. */
export function nonNegative(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : undefined;
}

/** Drops undefined fields, so absent usage stays absent rather than zero. */
export function compact<T extends JsonObject>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

/** Sums a field over several entries; undefined when none reported it. */
export function sumField(
  entries: ModelUsage[],
  field: keyof ModelUsage,
): number | undefined {
  let total: number | undefined;
  for (const entry of entries) {
    const value = entry[field];
    if (value !== undefined) {
      total = (total ?? 0) + value;
    }
  }
  return total;
}

/** True when usage carries at least one token count or cost. */
export function reportsUsage(usage: JsonObject): boolean {
  return [
    "inputTokens",
    "outputTokens",
    "cacheReadTokens",
    "cacheWriteTokens",
    "reasoningOutputTokens",
    "costUsd",
  ].some((field) => usage[field] !== undefined);
}
