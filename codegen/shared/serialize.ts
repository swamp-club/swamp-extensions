/**
 * JSON-serializes an object graph that may contain circular references.
 * Circular references are replaced with the string "[Circular]".
 */
export function serializeWithCycleDetection(
  root: unknown,
): string {
  const ancestors = new Set<object>();

  function serialize(value: unknown): unknown {
    if (value === null || typeof value !== "object") return value;

    const obj = value as object;

    if (ancestors.has(obj)) return "[Circular]";

    ancestors.add(obj);

    let result: unknown;
    if (Array.isArray(obj)) {
      result = obj.map((item) => serialize(item));
    } else {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = serialize(v);
      }
      result = out;
    }

    ancestors.delete(obj);
    return result;
  }

  return JSON.stringify(serialize(root), null, 2);
}
