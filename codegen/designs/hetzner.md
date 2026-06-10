# Hetzner Cloud Provider Design

## 1. Purpose

Clover's Hetzner Cloud provider reads the Hetzner Cloud OpenAPI spec and
generates a set of swamp extension models — one per API resource. Each model is
a self-contained TypeScript file that exports a `model` object with Zod schemas
and CRUD methods. A shared `_lib/hetzner.ts` file provides the HTTP client and
response unwrapping logic.

Compared to the DigitalOcean provider, the Hetzner pipeline is simpler: no
action methods, no sub-resource methods, no discovery endpoints, no identifier
mapping. Hetzner's API is more uniform — all resources use numeric `id`, updates
are always PUT, and the spec is already self-contained JSON.

**Output**: `outputs/hetzner-cloud/` containing:

- `extensions/models/*.ts` — one file per resource (e.g., `servers.ts`,
  `firewalls.ts`)
- `extensions/models/_lib/hetzner.ts` — shared HTTP helpers
- `manifest.yaml` — extension package manifest

**How to run**:

```sh
deno task fetch-schema:hetzner    # download the OpenAPI spec
deno task generate:hetzner        # generate models from the local spec
```

The pipeline is orchestrated by `src/commands/generateModels.ts`, which calls
`generateHetznerModels()` from the pipeline, writes all files, runs `deno fmt`,
and reports changes.

---

## 2. Schema Source

The spec is fetched from Hetzner's documentation site:

```
https://docs.hetzner.cloud/cloud.spec.json
```

Unlike the DigitalOcean pipeline, the Hetzner spec is already JSON and is saved
directly to `schemas/hetzner.json` without any pre-processing. There is no
YAML-to-JSON conversion and no upfront `$ref` dereferencing step.

### Why no upfront dereferencing

The Hetzner spec uses `$ref` pointers but doesn't have the circular reference
problems that DigitalOcean's spec has. Instead, `$ref` pointers are resolved
**inline during parsing** by `resolveRef()`, which walks the `$ref` path
segments through the spec object. This is simpler and avoids the need for
`@apidevtools/json-schema-ref-parser` and the custom cycle-detection serializer.

```typescript
function resolveRef(schema: any, spec: any): any {
  if (schema.$ref) {
    const refPath = schema.$ref.replace(/^#\//, "").split("/");
    let current = spec;
    for (const segment of refPath) {
      current = current?.[segment];
    }
    return current ? resolveRef(current, spec) : {}; // recursive for chained refs
  }
  if (schema.allOf) {
    return mergeAllOf(schema.allOf, spec); // flatten inline
  }
  return schema;
}
```

The recursive call handles chained refs (a `$ref` that points to another
`$ref`). `allOf` schemas are also merged inline during resolution rather than in
a separate flattening pass.

---

## 3. Resource Discovery

### Noun-based grouping

The Hetzner API has a flat URL structure: `/{noun}` and `/{noun}/{id}`. The
pipeline groups paths by their **noun** — the first path segment (after an
optional `v1/` prefix):

| Noun        | Paths                           | Resource |
| ----------- | ------------------------------- | -------- |
| `servers`   | `/servers`, `/servers/{id}`     | Server   |
| `ssh_keys`  | `/ssh_keys`, `/ssh_keys/{id}`   | SSH Key  |
| `firewalls` | `/firewalls`, `/firewalls/{id}` | Firewall |

This is simpler than DigitalOcean's base+ID pairing because Hetzner doesn't use
versioned prefixes like `/v2/` consistently, and the noun is always the first
meaningful segment.

### Qualification criteria

A noun qualifies as a resource when it has at least one usable operation: a
collection GET (list), a single-resource GET (get), a POST (create), a PUT
(update), or a DELETE (delete). Nouns with none of these are skipped. This means
the pipeline generates models for both CRUD resources (servers, firewalls, etc.)
and GET-only reference resources (server_types, locations, datacenters, isos,
load_balancer_types, pricing). The generated methods match the available
operations — a GET-only resource gets `list` and `get` but no `create`,
`update`, `delete`, or `sync`.

### Exclusion rules

| Rule                                      | Rationale                                                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Skip paths containing `/actions`          | Action endpoints (e.g., `/servers/{id}/actions/poweron`) are Hetzner's way of triggering operations; not currently modeled           |
| Skip paths with >1 segment after the noun | Deep sub-resources (e.g., `/servers/{id}/metrics`) don't fit the flat model pattern; only `/{noun}` and `/{noun}/{id}` are processed |

### What Hetzner doesn't need

Unlike the DigitalOcean pipeline, there is no:

- **Multi-pass discovery** — no action endpoints, sub-resource methods, or
  discovery endpoints to match to parents
- **Sub-resource detection heuristic** — paths deeper than `/{noun}/{id}` are
  simply skipped
- **Top-level exclusion list** — all nouns with any GET/POST/PUT/DELETE are
  candidates
- **Operation count limits** — Hetzner resources are uniform enough that
  complexity filtering isn't needed

---

## 4. Operation Identification

### HTTP method to operation mapping

All operations are conditional — a resource only gets the methods matching the
HTTP methods present in the spec. A GET-only resource (e.g. `server_types`) gets
`list` and `get` but no `create`, `update`, or `delete`.

| HTTP Method | Operation | Where                                       |
| ----------- | --------- | ------------------------------------------- |
| POST        | Create    | Collection path (`/servers`)                |
| GET         | Read      | Single-resource path (`/servers/{id}`) only |
| GET         | List      | Collection path (`/servers`)                |
| PUT         | Update    | Single-resource path                        |
| DELETE      | Delete    | Single-resource path                        |

### Why only PUT for updates (no PATCH preference)

Hetzner's API exclusively uses PUT for updates — there are no PATCH endpoints.
This simplifies the update logic: the pipeline doesn't need PATCH-vs-PUT
precedence or an `updateMethod` field. The generated `update()` helper always
sends PUT.

### Path sorting for GET response extraction

Paths are sorted so collection paths (without `{id}`) are processed before
single-resource paths (with `{id}`). This matters for GET response extraction:
the single-resource GET overwrites the collection GET, ensuring that
`resourceProperties` come from the detailed single-resource response, not the
list response.

```typescript
const sortedPaths = Object.entries(paths).sort(([a], [b]) => {
  const aHasId = a.includes("{");
  const bHasId = b.includes("{");
  if (aHasId && !bHasId) return 1; // collection first
  if (!aHasId && bHasId) return -1;
  return 0;
});
```

### Schema flattening

The Hetzner pipeline handles `allOf` by merging properties and required fields
from all branches via `mergeAllOf()`. Unlike DigitalOcean, there is no
`oneOf`/`anyOf` flattening at the schema composition level — these are only
handled during individual property normalization (see Section 7).

**Why this is sufficient**: Hetzner's request body schemas don't use
`oneOf`/`anyOf` for top-level schema composition the way DigitalOcean does
(e.g., the droplet `name` vs `names` disjunction). Hetzner's composed schemas
are always conjunctive (`allOf`), so only `allOf` merging is needed at the
schema level.

### No create-only property detection

The Hetzner pipeline doesn't track which properties are create-only (in POST but
not PUT). All create properties go into `globalArgs`, and all update properties
are available in the update method. The distinction isn't needed because:

- Hetzner's PUT update accepts the same properties as POST for most resources
- The generated code only sends properties that are explicitly set
  (`if (g.prop !== undefined)`)
- Sending a create-only property in a PUT request is harmless — the API ignores
  or returns an error

### No manual overrides

Hetzner's spec is consistent enough that no manual overrides are needed. There
are no equivalents to DigitalOcean's `REQUIRED_FIELDS_OVERRIDES`,
`SKIP_PROPERTIES`, or `SKIP_TOP_LEVEL`.

---

## 5. Identifying Field Resolution

### Uniform numeric ID

All Hetzner resources use numeric `id` as their unique identifier. The pipeline
doesn't need an identifier map or fallback logic:

```typescript
const identifyingField = postBody.name ? "name" : "id";
```

This determines the **naming field** for the factory pattern (see Section 6),
not the API identifier. Every resource's API identifier is always `id`, and the
generated `get` and `delete` methods always accept `z.number().int()`.

### Why no identifier map is needed

Unlike DigitalOcean (which uses `id`, `name`, `uuid`, and `ip` across different
resources), Hetzner is consistent:

- Path parameters are always `{id}`
- The response field is always `id`
- The type is always `number` (integer)

This uniformity eliminates the need for `IDENTIFIER_MAP`,
`ENDPOINT_IDENTIFIER_OVERRIDES`, and the underscore-stripping fallback.

### Ensuring `id` exists in resource properties

The pipeline guarantees that `id` is always present in `resourceProperties`,
even if the spec's GET response schema doesn't explicitly include it:

```typescript
if (!getResponse.id) {
  getResponse = {
    id: { type: "number", description: "Unique identifier" },
    ...getResponse,
  };
}
```

---

## 6. Factory Pattern and Instance Naming

Every model uses a **factory pattern**: a single model definition can manage
multiple instances of the same resource type. Each instance is identified by a
name, enabling CEL expressions like:

```
data.latest("servers", "web-1").attributes.id
```

### `resolveNamingField`: preference order

1. **`name`** — if the create body includes a `name` property, use it (most
   resources: servers, firewalls, networks, etc.)
2. **`label`** — fallback for resources that use `label` instead
3. **Synthetic `name`** — if neither exists, inject a `name` field into
   GlobalArgs

### How instance names flow through methods

| Method   | Instance name source                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------ |
| `create` | `globalArgs.{namingField}` or `"current"`                                                              |
| `get`    | For natural names: `result.{namingField}` from API response. For synthetic: `globalArgs.{namingField}` |
| `update` | `globalArgs.{namingField}` or `"current"` (reads existing data by this key)                            |
| `delete` | `args.id.toString()` (uses the numeric ID as the instance name for the deletion record)                |

### Synthetic names

Resources without a `name` or `label` in their create body (e.g., floating IPs,
primary IPs) get a synthetic `name` field injected into GlobalArgs. This field
is purely for the factory pattern — it doesn't map to any API field.

When a synthetic name is used, the `get` method derives the instance name from
`globalArgs` rather than the API response (since the response doesn't contain a
user-provided name):

```typescript
// Natural name: use API response
const instanceName = result.name?.toString() ?? args.id.toString();

// Synthetic name: use globalArgs
const instanceName = context.globalArgs.name?.toString() ?? args.id.toString();
```

---

## 7. Response Envelope Unwrapping

Hetzner wraps API responses in an envelope:
`{ "server": { ... }, "action": { ... } }`. The pipeline unwraps this at two
levels.

### Pipeline-level (schema extraction)

During code generation, `extractResponseBody()` examines the OpenAPI response
schema:

1. Resolve any `$ref` pointers in the response schema
2. Filter out `meta` and `links` keys
3. If exactly one non-meta key remains and it's an object with properties,
   unwrap it (e.g., `{ "server": { id, name, ... } }` → `{ id, name, ... }`)
4. If the inner schema uses `allOf`, merge it first then unwrap
5. Otherwise, use the top-level response properties directly

### Runtime-level (HTTP response handling)

The `_lib/hetzner.ts` `unwrap()` function handles the response envelope at
runtime:

```typescript
function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(data).filter((k) =>
    k !== "meta" && k !== "links" && k !== "actions" && k !== "action"
  );
  if (keys.length === 0) return data;
  const value = data[keys[0]];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return data;
}
```

### Why `actions` and `action` are filtered

Hetzner includes action results alongside the resource in many responses:

```json
{
  "server": { "id": 1, "name": "my-server", ... },
  "action": { "id": 123, "command": "create_server", "status": "running" }
}
```

The `action`/`actions` keys describe the asynchronous operation triggered by the
request, not the resource itself. Filtering them ensures `unwrap()` returns just
the resource object.

### Difference from DigitalOcean

DigitalOcean's `unwrap()` also handles array responses (for multi-create
endpoints that return `[resource1, resource2, ...]`). Hetzner doesn't have
multi-create endpoints, so the Hetzner `unwrap()` is simpler — it only handles
the single-object case.

---

## 8. Sync Method

Every generated model includes a `sync` method for drift detection. Unlike `get`
(which requires the resource ID as an argument), `sync` reads the ID from stored
state, making it zero-arg and suitable for automated workflows.

### How sync works

1. Read the instance name from `globalArgs` (same as `update`)
2. Load existing state via `context.dataRepository.getContent()`
3. Extract `existing.id` (always integer for Hetzner)
4. Call `tryRead(endpoint, existing.id)` — returns `null` on 404 instead of
   throwing
5. If result: write refreshed state
6. If null: write a `not_found` marker

### `tryRead()` helper

The `_lib/hetzner.ts` exports `tryRead()` alongside `read()`. It uses the same
`request()` function but returns `null` on 404 instead of throwing:

```typescript
export async function tryRead(
  endpoint,
  id,
): Promise<Record<string, unknown> | null> {
  const resp = await request("GET", `${endpoint}/${id}`);
  if (resp.status === 404) {
    await resp.text();
    return null;
  }
  const data = await resp.json();
  return unwrap(data);
}
```

### Not-found marker

When the resource no longer exists, sync writes:

```typescript
{
  id: 12345,
  status: "not_found",
  syncedAt: "2026-03-08T12:00:00.000Z",
}
```

---

## 9. Zod Schema Generation

Each generated model contains three Zod schemas.

### GlobalArgsSchema — full fidelity input validation

Used for create/update arguments. Preserves all OpenAPI constraints:

- String enums → `z.enum(["a", "b"])`
- `minLength`/`maxLength` → `z.string().min(n).max(n)`
- `pattern` → `z.string().regex(...)`
- Integer enums → `z.union([z.literal(1), z.literal(2)])`
- `minimum`/`maximum` → `z.number().min(n).max(n)`
- `integer` → `z.number().int()`
- Nested objects with typed properties and per-field optionality

Required fields are non-optional; everything else gets `.optional()`.

### ResourceSchema — simplified response parsing

Used to parse API responses. **No constraints, `.passthrough()`**:

- All types are bare: `z.string()`, `z.number()`, `z.boolean()`
- No enums, no min/max, no patterns
- All fields except `id` are `.optional()`
- `.passthrough()` on the object to allow unknown fields

### Why the distinction

**Input schemas validate user-provided data** — strict constraints prevent bad
API calls. **Resource schemas parse API responses** — the API may return data
that doesn't match creation constraints (e.g., a deprecated field value, a type
that was widened server-side). Applying creation-time constraints to response
parsing would cause false rejections.

### InputsSchema

Mirrors GlobalArgsSchema but with all fields `.optional()`. Used for the swamp
inputs mechanism where partial overrides are provided separately from
globalArgs.

### Property normalization: `oneOf`/`anyOf` handling

When normalizing individual properties, the pipeline handles `oneOf` and `anyOf`
by picking the **first non-null variant**:

```typescript
if (resolved.oneOf) {
  for (const variant of resolved.oneOf) {
    if (resolvedVariant.type && resolvedVariant.type !== "null") {
      return normalizeHetznerProperty(resolvedVariant, spec);
    }
  }
  return { type: "string" }; // fallback
}
```

This is simpler than DigitalOcean's approach (which prefers non-string
primitives over strings). Hetzner's `oneOf`/`anyOf` usage is primarily for
nullable types (`oneOf: [{ type: "string" }, { type: "null" }]`), so picking the
first non-null variant is sufficient.

### No region enum

Unlike DigitalOcean, the Hetzner pipeline doesn't use a hardcoded region enum.
Hetzner's location system uses `location` and `datacenter` fields that accept
both IDs and names, and the spec's constraints are sufficient without special
handling.

---

## 10. Versioning and Change Detection

The Hetzner pipeline uses the same shared CalVer versioning system as
DigitalOcean (see `src/pipeline/version.ts`).

### CalVer format

Versions use calendar versioning: `YYYY.MM.DD.micro` (e.g., `2026.03.07.1`).

- The date prefix is computed from the current date
- The micro version starts at 1 for new files
- If the date matches the existing version's date, micro is incremented
- If the date is different, micro resets to 1

### Content normalization for comparison

Before comparing, the pipeline:

1. Formats the candidate code with `deno fmt` (ensures whitespace differences
   don't cause false changes)
2. Replaces the version string in both existing and candidate with a placeholder
3. Compares the normalized strings

### Manifest version stability

The manifest is only written when at least one model has changed. Release notes
are stripped from the content comparison to prevent spurious version bumps when
the set of changed models differs between runs (see the `stripReleaseNotes`
function in `version.ts`).

---

## 11. Generated Output Structure

```
outputs/hetzner-cloud/
├── manifest.yaml                          # Extension package manifest
└── extensions/
    └── models/
        ├── _lib/
        │   └── hetzner.ts                 # Shared HTTP client + helpers
        ├── servers.ts                     # One file per resource
        ├── firewalls.ts
        ├── ssh_keys.ts
        └── ...
```

### Model export shape

Every model file exports `const model = { ... }`. Methods are conditional — only
operations that the API supports are emitted.

**CRUD resource** (e.g. servers — has POST, GET, PUT, DELETE):

```typescript
export const model = {
  type: "@swamp/hetzner-cloud/servers",    // unique type identifier
  version: "2026.03.07.1",                // CalVer
  globalArguments: GlobalArgsSchema,        // Zod: create+update args + token
  inputsSchema: InputsSchema,              // Zod: optional overrides
  resources: {
    state: { ... },                        // primary resource state
  },
  methods: {
    create: { ... },                       // if POST exists
    get: { ... },                          // if single-resource GET exists
    update: { ... },                       // if PUT exists
    delete: { ... },                       // if DELETE exists
    sync: { ... },                         // if both POST and GET exist
    list: { ... },                         // if collection GET exists
  },
};
```

**GET-only reference resource** (e.g. server_types — only GET):

```typescript
export const model = {
  type: "@swamp/hetzner-cloud/server-types",
  version: "2026.06.10.1",
  globalArguments: GlobalArgsSchema,        // Zod: token only (no create/update args)
  inputsSchema: InputsSchema,              // Zod: token only
  resources: {
    state: { ... },
  },
  methods: {
    get: { ... },                          // single-resource GET
    list: { ... },                         // collection GET
  },
};
```

### Authentication and the `token` global argument

Every model carries an optional `token` global argument, emitted with
`z.string().meta({ sensitive: true }).optional()`. It lets users wire the API
token from a vault — `token: ${{ vault.get(my-vault, hcloud-token) }}` — instead
of exporting `HETZNER_API_TOKEN` into the shell. The `token` argument:

- Takes precedence over the `HETZNER_API_TOKEN` env var when set.
- Is **auth-only**: it is never written into a create/update request body — it
  is threaded as a trailing argument to each lib helper, not iterated from
  `createProperties`/`updateProperties`.
- Is injected unless the resource already has a real property named `token`
  (collision guard in `extensionModelGenerator.ts`).
- Is mirrored into the `newFieldNames` list the pipeline feeds to
  `computeUpgradesBlock`. The generator injects `token` into the emitted
  `GlobalArgsSchema`, so the upgrade differ must also see it — otherwise the
  next changed regeneration would read `token` from the committed schema, miss
  it in `newFieldNames`, and emit a spurious `Removed: token` upgrade entry with
  a destructive `upgradeAttributes`.

Vault expressions are resolved by swamp's expression engine before the value
reaches the model, so vault-sourced auth works regardless of the `sensitive`
flag. `sensitive` is additional hardening: swamp-core redacts sensitive field
values from run logs and reports and vaults them on write. (It does not
currently redact `swamp model get` output — but a vault-sourced arg is stored
there as the `vault.get(...)` expression, not the resolved secret, so nothing
leaks for the recommended path.)

### The `list` method

A `list` method is generated for every resource whose collection path supports
GET (detected as `handlers.list` in the pipeline — a GET on the non-`{id}`
path). It takes an optional `label_selector` method argument, calls the
paginated `listAll()` lib helper, and writes **one `state` resource per item**
using the factory naming field (sanitized, with an `id` fallback for
synthetic-name resources). It returns `{ dataHandles, result: { count } }`.

`list` writes to the same `state` resource kind that `create`/`get`/`update`/
`sync` manage — matching the GCP provider's list factory rather than a separate
discovery kind. This is safe because a model can be instantiated for discovery
without supplying create-required global arguments: swamp does not enforce
required `globalArguments` at model-instantiation time (verified against
`swamp model validate`), only the methods that consume them do. No
"optional-everywhere" schema relaxation is needed, so the CRUD models' required
markers are preserved unchanged.

### Shared lib (`_lib/hetzner.ts`)

Exports: `create`, `read`, `tryRead`, `listAll`, `update`, `remove`

Key behaviors:

- The token is resolved by `getToken(explicitToken?)`: an explicit token (from a
  model's `token` global arg) takes precedence over the `HETZNER_API_TOKEN` env
  var
- Validated tokens are cached in a `Set<string>` so each distinct token (env var
  or per-model) is validated against `GET /v1/locations` exactly once, with no
  cross-model leakage
- Every CRUD helper accepts an optional trailing `token` argument, threaded into
  `request()` and on to `getToken()`
- 404 responses are not thrown as errors (callers handle them)
- `request()` accepts an optional `{ allowStatus, queryParams, token }` option:
  `allowStatus` opts specific non-OK statuses through as a `Response` instead of
  a thrown `Error` (generalizes the built-in 404 special-case); `queryParams`
  are applied to the URL via `URL.searchParams`
- `listAll()` paginates a collection endpoint, following
  `meta.pagination.next_page` (per_page=50) until exhausted, accumulating every
  item; a bounded page guard logs and returns the partial result rather than
  silently truncating or looping forever on a malformed `next_page`
- All other non-OK responses throw with method, path, status, and body
- Response bodies are unwrapped via `unwrap()` (single object) or `unwrapList()`
  (collection arrays) — see Section 7
- No `subResourceUpdate` or `discover` exports (Hetzner doesn't need them)

#### `remove()` retry on `resource_in_use` (swamp-club #41)

Hetzner processes firewall-from-server detach asynchronously after a server
DELETE. An immediate firewall DELETE can return `422 resource_in_use` until
propagation clears, even when the preceding server DELETE action has already
reached `success`. The generated `remove()` handles this with a bounded retry
loop:

- `maxAttempts = 3`, `pollDelay = 3000ms` (6s worst case: the loop skips the
  sleep on the final attempt before throwing)
- Passes `{ allowStatus: [422] }` to `request()` so the 422 response bubbles up
  as a `Response` rather than a thrown error
- Parses the JSON error body and only retries when
  `error.code === "resource_in_use"`; other 422 codes (e.g. `invalid_input`,
  `protected`) and non-JSON bodies surface verbatim without retry
- Loop shape mirrors `pollAction` / `pollResourceReady` in
  `codegen/digitalocean/libGenerator.ts` for provider-to-provider consistency

Runtime behavior is covered by `codegen/hetzner/libGenerator_test.ts`, which
dynamic-imports the generated template with a cache-bust URL and stubs
`globalThis.fetch` to exercise retry/exhaust/other-422/non-JSON paths without
needing a `HETZNER_API_BASE` env override.

### Naming conventions

| Aspect       | Hetzner                                            | DigitalOcean                                                |
| ------------ | -------------------------------------------------- | ----------------------------------------------------------- |
| File name    | API noun directly: `servers.ts`, `ssh_keys.ts`     | Slug from display name: `droplet.ts`, `database_cluster.ts` |
| Model slug   | Noun with hyphens: `servers`, `ssh-keys`           | Display name slugified: `droplet`, `database-cluster`       |
| Display name | Naive singularization of slug: "server", "ssh key" | Path-based with overrides: "Droplet", "Database Cluster"    |
| Type string  | `@swamp/hetzner-cloud/servers`                     | `@swamp/digitalocean/droplet`                               |

Hetzner uses the API noun directly because Hetzner's nouns are already
descriptive (e.g., `servers`, `ssh_keys`, `floating_ips`). DigitalOcean needs
display name overrides because its path segments are sometimes misleading (e.g.,
`/v2/account/keys` → "SSH Key" not "Account Key").

### Singularization

The codegen uses a naive singularization function for display names in method
descriptions:

```typescript
function singularize(slug: string): string {
  if (slug.endsWith("ses")) return slug.slice(0, -2); // "statuses" → "status"
  if (slug.endsWith("ies")) return slug.slice(0, -3) + "y"; // "policies" → "policy"
  if (slug.endsWith("s")) return slug.slice(0, -1); // "servers" → "server"
  return slug;
}
```

DigitalOcean uses the `pluralize` library with uncountable rules for acronyms
(VPC, SSH, NFS, etc.). Hetzner's simpler approach works because its resource
nouns are regular English plurals without acronym edge cases.

### Manifest

```yaml
manifestVersion: 1
name: "@swamp/hetzner-cloud"
version: "2026.03.07.1"
description: "Hetzner Cloud infrastructure models"
labels:
  - hetzner
  - cloud
  - infrastructure
models:
  - certificates.ts
  - firewalls.ts
  - servers.ts
  - ssh_keys.ts
  - ...
```

---

## 12. Differences from DigitalOcean

A summary of the key architectural differences and why they exist.

| Aspect                   | Hetzner                                      | DigitalOcean                                                                               | Why                                                  |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Schema format            | JSON, used directly                          | YAML, dereferenced + cycle-safe serialized                                                 | DO's spec has circular refs                          |
| `$ref` resolution        | Inline during parsing                        | Pre-dereferenced to JSON                                                                   | DO's spec is too large/complex for inline resolution |
| Resource discovery       | Single-pass noun grouping                    | Four-pass with actions, sub-resources, discovery                                           | DO has richer API surface                            |
| Identifier type          | Always numeric `id`                          | `id`, `name`, `uuid`, `ip`                                                                 | DO is inconsistent across resources                  |
| Update method            | Always PUT                                   | PATCH preferred, PUT fallback                                                              | DO supports partial updates                          |
| Action methods           | Not generated                                | Discriminator-based discovery                                                              | DO has `POST .../actions` pattern                    |
| Sub-resource methods     | Not generated                                | Heuristic-based detection                                                                  | DO has `PUT .../resize` etc.                         |
| Discovery methods        | Not generated                                | `/options` endpoint matching                                                               | DO has options endpoints                             |
| Envelope unwrapping      | Filters `meta`, `links`, `actions`, `action` | Filters `meta`, `links`; handles arrays                                                    | DO has multi-create array responses                  |
| Region handling          | No special handling                          | Hardcoded region enum                                                                      | DO spec is inconsistent on region enums              |
| Property `oneOf`/`anyOf` | Pick first non-null                          | Prefer non-string primitive, then first non-null                                           | DO has more complex union types                      |
| Schema composition       | `allOf` only                                 | `allOf` + `oneOf`/`anyOf` with required intersection                                       | DO uses disjunctive compositions                     |
| Manual overrides         | None                                         | IDENTIFIER_MAP, NAME_OVERRIDES, REQUIRED_FIELDS_OVERRIDES, SKIP_PROPERTIES, SKIP_TOP_LEVEL | DO's spec has edge cases                             |
| Display names            | Naive singularize                            | pluralize library + override map                                                           | DO's path segments need renaming                     |
| Create-only tracking     | Not tracked                                  | `createOnlyProperties` Set                                                                 | DO has props that differ between create/update       |
