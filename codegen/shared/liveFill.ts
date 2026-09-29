// Field selection for PUT updates that fill unset fields from the live
// resource. A full-replacement PUT clears whatever its body leaves out, so
// generated updates read the live resource and copy each field globalArgs
// leave unset. A response field is only copied when the response describes it
// with the same shape as the request body does: echoing a differently shaped
// value (e.g. a region object where the request takes a region slug) would
// make the PUT fail.

/** The structural subset of a schema property that shape matching reads. */
export interface ShapeProperty {
  type?: unknown;
  items?: unknown;
  properties?: Record<string, unknown>;
  description?: unknown;
}

// Some schemas (notably Google's) keep server-set fields in the request body
// and mark them only in the description, e.g. "Output only." or "Read-only.".
const OUTPUT_ONLY_DESCRIPTION = /\[?output[ -]only\]?|\bread[ -]only\b/i;

/**
 * Whether a request property's own description marks it as set by the
 * server. Echoing such a field is pointless at best, so it is not filled.
 */
export function describedAsOutputOnly(property: ShapeProperty): boolean {
  return typeof property.description === "string" &&
    OUTPUT_ONLY_DESCRIPTION.test(property.description);
}

// Fields named like secrets are never copied from a GET: an API that returns
// them masked (e.g. "********") would have the mask written over the real
// value. They must be set explicitly. Boolean and numeric fields cannot be
// masked, so the rule skips them.
const SECRET_NAME =
  /secret|password|passwd|passphrase|private_?key|api_?key|token|credential/i;

/**
 * Whether a field name looks like it holds a secret. A name ending in an id
 * (`token_id`, `apiKeyId`) references a secret rather than holding one.
 */
export function isSecretFieldName(name: string): boolean {
  return SECRET_NAME.test(name) && !/(_id|Id|_ids|Ids)$/.test(name);
}

const MAX_SHAPE_DEPTH = 8;

function asShape(value: unknown): ShapeProperty | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as ShapeProperty
    : undefined;
}

// An integer is a number on the wire; schemas often type the same field as
// integer on one side and number on the other.
function normalizedType(type: unknown): string {
  return JSON.stringify(type).replaceAll('"integer"', '"number"');
}

/**
 * Whether a response property has the same shape as the request property:
 * the same type (integer and number match), recursively for array items and
 * for every object property both sides declare. A property without a declared
 * type matches nothing.
 */
export function sameShape(
  request: ShapeProperty,
  response: ShapeProperty,
  depth = 0,
): boolean {
  if (request.type === undefined || response.type === undefined) return false;
  if (normalizedType(request.type) !== normalizedType(response.type)) {
    return false;
  }
  if (depth >= MAX_SHAPE_DEPTH) return true;
  const requestItems = asShape(request.items);
  const responseItems = asShape(response.items);
  if (requestItems || responseItems) {
    if (!requestItems || !responseItems) return false;
    if (!sameShape(requestItems, responseItems, depth + 1)) return false;
  }
  if (request.properties && response.properties) {
    for (const [name, requestProp] of Object.entries(request.properties)) {
      const responseProp = asShape(response.properties[name]);
      const req = asShape(requestProp);
      if (!req || !responseProp) continue;
      if (!sameShape(req, responseProp, depth + 1)) return false;
    }
  }
  return true;
}

/**
 * The update-body fields a PUT update fills from the live resource, sorted:
 * every field in `alwaysFill` (create-required fields, which must be sent
 * whatever their shape), plus every other field the response describes with
 * the same shape as the request and whose description does not mark it as
 * output-only or read-only. A non-boolean, non-numeric field named like a
 * secret is never filled, not even when it is in `alwaysFill`.
 */
export function liveFillFields(
  fields: readonly string[],
  requestProps: Record<string, unknown>,
  responseProps: Record<string, unknown>,
  alwaysFill: ReadonlySet<string> = new Set(),
): string[] {
  return fields.filter((name) => {
    const request = asShape(requestProps[name]);
    // Only a string can come back masked, so e.g. a boolean
    // changePasswordAtNextLogin is still filled.
    if (
      isSecretFieldName(name) && request?.type !== "boolean" &&
      request?.type !== "integer" && request?.type !== "number"
    ) {
      return false;
    }
    if (alwaysFill.has(name)) return true;
    const response = asShape(responseProps[name]);
    return request !== undefined && response !== undefined &&
      !describedAsOutputOnly(request) && sameShape(request, response);
  }).sort();
}
