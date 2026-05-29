# Cloudflare Provider Design

## 1. Purpose

Clover's Cloudflare provider reads the Cloudflare public OpenAPI 3.0 spec and
generates a set of swamp extension models — one per API resource. Each model is
a self-contained TypeScript file that exports a `model` object with Zod schemas
and CRUD methods. A shared `_lib/cloudflare.ts` file provides the HTTP client,
authentication, response envelope unwrapping, pagination helpers, and rate-limit
retry logic.

Compared to the DigitalOcean and Hetzner providers (which produce a single
package), the Cloudflare provider uses **per-service packaging** like AWS and
GCP due to the breadth of the API surface (~243 codegen-eligible CRUD resources
across ~93 services). Compared to the AWS provider (which uses the unified
CloudControl API), Cloudflare uses direct REST calls against
`api.cloudflare.com/client/v4/`.

**Output**: `outputs/cloudflare/{service}/` — one directory per Cloudflare
service, containing:

- `extensions/models/*.ts` — one file per resource (e.g., `dns_records.ts`,
  `tunnels.ts`)
- `extensions/models/_lib/cloudflare.ts` — shared HTTP helpers
- `manifest.yaml` — extension package manifest

**How to run**:

```sh
deno task fetch-schema:cloudflare   # download the OpenAPI spec
deno task generate:cloudflare       # generate models from the local spec
```

The pipeline is orchestrated by `src/commands/generateModels.ts`, which calls
`generateCloudflareModels()` from the pipeline, writes all files per service,
runs `deno fmt`, and reports changes.

---

## 2. Schema Source

The spec is fetched from Cloudflare's public `api-schemas` GitHub repository:

```
https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json
```

The spec is saved directly to `schemas/cloudflare.json` without YAML-to-JSON
conversion (it's already JSON). The same spec is the single source of truth for
Cloudflare's Terraform provider (v5+), Go SDK, Python SDK, and API docs.

### Spec characteristics

| Metric                    | Value  |
| ------------------------- | ------ |
| OpenAPI version           | 3.0.3  |
| Total paths               | 1,910  |
| Total operations          | ~3,019 |
| Total component schemas   | 5,937  |
| CRUD-qualifying resources | ~265   |
| Well-typed POST bodies    | 231    |
| Empty/missing POST bodies | 22     |
| Multipart upload POSTs    | ~8     |
| Unique tags               | 489    |

### $ref dereferencing

The Cloudflare spec uses `$ref` pointers extensively — 2,813 of 5,937 schemas
(47%) contain at least one `$ref`. There are 226 directly self-referencing
schemas (circular references). This requires **cycle-safe dereferencing** like
the DigitalOcean pipeline.

The spec is dereferenced using `@apidevtools/json-schema-ref-parser` with the
same ancestor-tracking cycle detection used by DigitalOcean:

```
serializeWithCycleDetection(root):
  ancestors = Set()
  serialize(value):
    if value in ancestors → "[Circular]"   // true cycle
    ancestors.add(value)
    recurse into children
    ancestors.delete(value)                 // backtrack
```

### Schema composition complexity

| Pattern         | Count |
| --------------- | ----- |
| `allOf`         | 1,272 |
| `oneOf`         | 91    |
| `anyOf`         | 30    |
| `discriminator` | 23    |

The `allOf` usage is heavy but follows a consistent pattern: response schemas
compose a base envelope (`api-response-common`) with a `result` property via
`allOf`. The `oneOf`/`anyOf` count is low and mostly appears in request body
schemas for polymorphic resources (e.g., DNS records have different schemas per
record type).

### Resources with empty POST bodies

22 CRUD-qualifying resources have empty or missing JSON request body schemas.
These fall into three categories:

1. **Multipart uploads** (8): Images, Pages deployments, file uploads — use
   `multipart/form-data` instead of JSON. These are skipped from codegen.
2. **Non-JSON content** (2): SCIM endpoints (`application/scim+json`), URL-
   encoded forms. Skipped.
3. **Truly empty** (12): Rulesets, Stream, Realtime Kit, worker versions — the
   spec declares POST but provides no request schema at all. These are skipped
   unless an override provides the schema.

The 231 well-typed resources with actual JSON request schemas are the codegen
target.

### Cloudflare-specific OpenAPI extensions

| Extension                 | Coverage  | Use                                       |
| ------------------------- | --------- | ----------------------------------------- |
| `x-cfPlanAvailability`    | 1,332 ops | Plan tier requirements (free/pro/biz/ent) |
| `x-cfPermissionsRequired` | 674 ops   | Required API token permissions            |
| `x-cfDeprecation`         | Some      | Deprecation notices                       |
| `x-sensitive`             | Some      | Marks sensitive fields                    |
| `x-api-token-group`       | Some      | Token permission grouping                 |

The `x-cfPlanAvailability` data could be surfaced in model descriptions but is
not needed for functional codegen. `x-sensitive` could inform which fields to
redact in logs.

---

## 3. Scoping Model

Cloudflare resources are scoped to one of three levels, determined by the path
prefix:

| Scope   | Path prefix                  | Path count | Examples                       |
| ------- | ---------------------------- | ---------- | ------------------------------ |
| Account | `/accounts/{account_id}/...` | 1,254      | Workers, R2, Zero Trust, D1    |
| Zone    | `/zones/{zone_id}/...`       | 318        | DNS, WAF, Cache, Page Rules    |
| User    | `/user/...`                  | 29         | API Tokens, User Profile       |
| Other   | Various                      | 309        | Radar (read-only), Orgs, Certs |

### Dual-scoped resources

19 services exist at **both** account and zone scope. Analysis shows three
patterns:

**Pattern A — Same API, different scope** (10 services): The account and zone
versions share identical sub-paths and request/response schemas (e.g.,
`rulesets`, `logpush/jobs`, `custom_pages`). Only the scope prefix differs.

**Pattern B — Mostly account, few zone paths** (6 services): The bulk of the API
is account-scoped with a small zone-scoped subset (e.g., `workers` has 58
account paths but only 2 zone paths for routes; `devices` has 36 account paths
but 1 zone path).

**Pattern C — Different resources at each scope** (3 services): Account and zone
versions expose different sub-resources (e.g., `secondary_dns` has ACLs/
peers/TSIGs at account scope but incoming/outgoing config at zone scope).

### How dual-scoped resources are handled

Following the Cloudflare Terraform provider's pattern, dual-scoped resources use
a **single model with mutually exclusive scope parameters**:

```typescript
const GlobalArgsSchema = z.object({
  account_id: z.string().optional().describe("Cloudflare account ID"),
  zone_id: z.string().optional().describe("Cloudflare zone ID"),
  // ... resource-specific fields
}).refine(
  (d) => (d.account_id != null) !== (d.zone_id != null),
  "Exactly one of account_id or zone_id must be provided",
);
```

For Pattern A resources, the codegen generates a single model. The shared lib
constructs the URL prefix from whichever scope parameter is provided:

```typescript
const scopePrefix = g.account_id
  ? `/accounts/${g.account_id}`
  : `/zones/${g.zone_id}`;
const url = `${scopePrefix}/${resourcePath}`;
```

For Pattern B, the zone-scoped paths are often different enough to warrant
separate models (e.g., `worker_routes` is a distinct resource from
`worker_scripts`).

For Pattern C, the different sub-resources at each scope become separate models
(e.g., `secondary_dns_peers` is account-only, `secondary_dns_incoming` is
zone-only).

### Mixed path parameter names

The spec uses both `{account_id}` and `{account_identifier}` for the same
concept (similarly `{zone_id}` and `{zone_identifier}`). The pipeline normalizes
these to `account_id` and `zone_id` respectively during path parsing.

### User-scoped and other resources

User-scoped resources (`/user/...`) and the "other" bucket (Radar, orgs, certs,
IPs) are excluded from initial generation. User-scoped resources don't fit the
account/zone model, and the "other" resources are mostly read-only analytics or
legacy endpoints.

---

## 4. Resource Discovery

### Service grouping

Resources are grouped into per-service packages. The grouping strategy differs
between account-scoped and zone-scoped paths:

**Account-scoped paths** have clean two-level nesting, so the service is the
second path segment after stripping the scope prefix:

```
/accounts/{id}/workers/scripts → service: "workers", resource: "scripts"
/accounts/{id}/d1/database     → service: "d1", resource: "database"
/accounts/{id}/r2/buckets      → service: "r2", resource: "buckets"
```

**Zone-scoped paths** are typically flat — the resource IS the second segment:

```
/zones/{id}/dns_records        → service: ???, resource: "dns_records"
/zones/{id}/firewall/rules     → service: "firewall", resource: "rules"
/zones/{id}/waiting_rooms      → service: ???, resource: "waiting_rooms"
```

For zone-scoped paths without a natural two-level nesting, the `SERVICE_MAP`
provides the grouping. This is a manual mapping table (see Section 15) that
assigns flat zone-scoped resources to logical service packages:

```
dns_records   → service: "dns"
dns_firewall  → service: "dns"
dns_settings  → service: "dns"
waiting_rooms → service: "waiting-rooms"
pagerules     → service: "page-rules"
```

### Why SERVICE_MAP is needed for zone-scoped resources

Account-scoped paths naturally group by their second segment because Cloudflare
organizes account-level APIs hierarchically (e.g., `/accounts/{id}/workers/`
contains scripts, routes, KV, etc.). Zone-scoped APIs predate this convention
and use flat paths. The SERVICE_MAP bridges this inconsistency.

### Path-grouping algorithm

The pipeline iterates over all paths and groups them into **base + ID endpoint
pairs**, similar to DigitalOcean:

| Base path                    | ID path                                    |
| ---------------------------- | ------------------------------------------ |
| `/accounts/{id}/d1/database` | `/accounts/{id}/d1/database/{database_id}` |
| `/zones/{id}/dns_records`    | `/zones/{id}/dns_records/{dns_record_id}`  |

A path is the "ID variant" if its terminal segment is a `{param}`. The base path
is derived by stripping that segment.

### Why both POST + GET are required

A resource must have:

- **POST on base** — without a create operation, there's nothing to codegen
- **GET on ID path** — without a read operation, the model can't retrieve
  current state after creation

Resources lacking either are skipped. This ensures every generated model can at
minimum create a resource and read it back.

### Per-service package size distribution

With ~93 services containing CRUD resources, the distribution is:

| Service size  | Count | Examples                             |
| ------------- | ----- | ------------------------------------ |
| 1 resource    | 45    | d1, cfd_tunnel, dns_records, storage |
| 2-3 resources | 29    | r2, queues, vectorize, waiting_rooms |
| 4+ resources  | 19    | access (19), magic (19), workers (8) |

### Why per-service is still correct despite many single-resource packages

The alternative — grouping by product area — would produce fewer, larger
packages but requires a product-area mapping table that:

1. Is subjective (where does "API Gateway" belong — security or developer?)
2. Needs ongoing maintenance as Cloudflare launches new products
3. Creates coupling between unrelated resources (a DNS update shouldn't bump the
   version of a security package)

Per-service packaging matches the AWS/GCP pattern in this repo and gives each
service independent versioning. Single-resource packages have minimal overhead
(one `deno.json` + `manifest.yaml`), and CI already handles this scale for AWS
(~249 packages) and GCP (~260 packages).

### Exclusion rules

| Rule                                         | Rationale                                                 |
| -------------------------------------------- | --------------------------------------------------------- |
| Skip `/radar/` paths                         | Read-only analytics, not CRUD resources                   |
| Skip `/user/` paths                          | User-scoped, doesn't fit account/zone model               |
| Skip `/organizations/` paths                 | Legacy org management                                     |
| Skip `/internal/` paths                      | Internal-only endpoints                                   |
| Skip paths with >2 `{param}` segments        | Deeply nested sub-resources don't fit flat model pattern  |
| Skip resources with empty POST body schemas  | Can't generate meaningful input validation (22 resources) |
| Skip multipart/non-JSON POST resources       | File uploads need different handling (8 resources)        |
| Skip `/memberships`, `/ips`, `/certificates` | Not infrastructure CRUD resources                         |

---

## 5. CRUD Operation Identification

### HTTP method to operation mapping

| HTTP Method | Operation         | Where                     |
| ----------- | ----------------- | ------------------------- |
| POST        | Create            | Base path                 |
| GET         | Read              | ID path (single resource) |
| PATCH       | Update            | ID path (preferred)       |
| PUT         | Update (fallback) | ID path, only if no PATCH |
| DELETE      | Delete            | ID path                   |
| GET         | List              | Base path                 |

### Why PATCH takes precedence over PUT

When both PATCH and PUT exist on the ID endpoint (53 resources), PATCH is chosen
for updates. PATCH performs partial updates (only send changed fields), while
PUT requires sending the complete resource representation. This matches the
DigitalOcean precedent.

In the Cloudflare spec:

- 158 resources have PATCH only
- 246 resources have PUT only
- 53 resources have both

When only PUT is available, the pipeline uses PUT. The `updateMethod` field in
the resource metadata tracks which method to use.

### Schema flattening

The pipeline handles `allOf`, `oneOf`, and `anyOf` following the same rules as
DigitalOcean:

**allOf** (conjunction): All branch properties and required fields are merged.

**oneOf/anyOf** (disjunction): All branch properties are merged (union of
fields), but required fields use **intersection** — only fields required in
every branch are marked required.

### Create-only property detection

Properties present in the POST request body but absent from the PATCH/PUT body
are flagged as `createOnlyProperties`. These appear in GlobalArgs but are not
sent in update requests. This is important for Cloudflare where many resources
have immutable properties set at creation time (e.g., a Worker's name, a D1
database name).

---

## 6. Response Envelope Unwrapping

Cloudflare wraps all API responses in a standard envelope:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": { ... },
  "result_info": {
    "page": 1,
    "per_page": 20,
    "total_pages": 5,
    "count": 20,
    "total_count": 100
  }
}
```

The pipeline unwraps this at two levels.

### Pipeline-level (schema extraction)

Response schemas in the spec consistently use `allOf` to compose the envelope:

```json
{
  "allOf": [
    { "$ref": "#/components/schemas/xxx_api-response-common" },
    {
      "properties": {
        "result": { "$ref": "#/components/schemas/xxx_the_resource" }
      }
    }
  ]
}
```

Verified across representative resources (DNS records, D1, tunnels, R2, queues,
vectorize, waiting rooms): all follow this exact
`allOf[envelope_base, {result:
resource_schema}]` pattern. The pipeline resolves
the `allOf`, identifies the `result` property, and extracts its schema as the
resource's response schema.

### Envelope base schemas

The spec contains ~153 per-service copies of identifier schemas and per-service
copies of the envelope base, all following the same structure:

```json
{
  "properties": {
    "success": { "type": "boolean" },
    "errors": { "$ref": "..." },
    "messages": { "$ref": "..." }
  },
  "required": ["success", "errors", "messages"]
}
```

The pipeline identifies an `allOf` branch as an envelope base by checking for
the presence of `success` in its properties (or in the resolved `$ref`), then
extracts `result` from the remaining branch.

### Runtime-level (HTTP response handling)

The `_lib/cloudflare.ts` `unwrap()` function handles the envelope at runtime:

```typescript
function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  if (
    typeof data === "object" && data !== null && "result" in data &&
    "success" in data
  ) {
    const result = data.result;
    if (result && typeof result === "object" && !Array.isArray(result)) {
      return result as Record<string, unknown>;
    }
  }
  return data;
}
```

### Why Cloudflare's envelope is simpler than DigitalOcean's

DigitalOcean uses a **resource-name-keyed envelope** (`{ "droplet": {...} }`)
where the key varies per resource, requiring heuristic unwrapping. Cloudflare
uses a **fixed `result` key** for all resources, making unwrapping
deterministic. The pipeline and runtime can always look for `.result` without
guessing the key name.

### Error handling

The runtime checks `success === false` and extracts error details from the
`errors` array:

```typescript
function assertSuccess(data: Record<string, unknown>): void {
  if (data.success === false) {
    const errors = data.errors as Array<{ code: number; message: string }>;
    const msg = errors?.map((e) => `${e.code}: ${e.message}`).join("; ");
    throw new Error(`Cloudflare API error: ${msg}`);
  }
}
```

---

## 7. Identifying Field Resolution

### Uniform identifier type

Unlike DigitalOcean (which uses int `id`, string `name`, `uuid`, and `ip` across
different resources) or Hetzner (which uses numeric `id` everywhere), Cloudflare
uses **32-character hex string IDs** for nearly all resources. The per-service
identifier schemas confirm this:

```json
{
  "description": "Identifier.",
  "example": "023e105f4ecef8ad9ca31a8372d0c353",
  "maxLength": 32,
  "type": "string"
}
```

153 identifier schemas exist in the spec, all following this pattern. The
generated `get` and `delete` methods accept `z.string()`.

### Mixed path parameter names

Despite the uniform identifier type, the spec uses 262 unique path parameter
names. The IDENTIFIER_MAP resolves these to the response field name, which is
almost always `id`:

```typescript
const IDENTIFIER_MAP: Record<string, string> = {
  id: "id",
  identifier: "id",
  rule_id: "id",
  certificate_id: "id",
  policy_id: "id",
  tunnel_id: "id",
  dns_record_id: "id",
  group_id: "id",
  app_id: "id",
  // ... most map to "id"

  // Name-based exceptions
  bucket_name: "name",
  script_name: "name",
  index_name: "name",
  dispatch_namespace: "name",
  snippet_name: "name",
};
```

### Fallback strategy

For unmapped parameter names, the pipeline defaults to `"id"`. This is safe
because Cloudflare is highly consistent — the vast majority of resources use
`id` as the response field name. This is simpler than DigitalOcean's
underscore-stripping fallback.

### Path parameter schemas lack inline type info

The spec defines path parameter types via `$ref` to component schemas rather
than inline `type` declarations. The pipeline must resolve these refs to
determine the parameter type. In practice, all resolve to `type: "string"`.

---

## 8. Factory Pattern and Instance Naming

Every model uses a **factory pattern** identical to the Hetzner and DigitalOcean
providers. Each instance is identified by a name, enabling CEL expressions like:

```
data.latest("dns_records", "www-a-record").attributes.id
```

### `resolveNamingField`: preference order

1. **`name`** — if the create body includes a `name` property
2. **`label`** — fallback
3. **`description`** — Cloudflare sometimes uses `description` as the primary
   user-visible identifier (e.g., some access policies)
4. **Synthetic `name`** — if none exist, inject a `name` field into GlobalArgs

### How instance names flow through methods

| Method   | Instance name source                                     |
| -------- | -------------------------------------------------------- |
| `create` | `globalArgs.{namingField}` or `"current"`                |
| `get`    | Natural: `result.{namingField}`. Synthetic: `globalArgs` |
| `update` | `globalArgs.{namingField}` or `"current"`                |
| `delete` | `args.id.toString()`                                     |

---

## 9. Authentication

Cloudflare supports four authentication methods. The shared lib supports the two
most common.

### Per-operation security patterns

Almost all operations (3,003 of 3,019) declare per-operation security overrides.
The dominant patterns:

| Pattern                                       | Count |
| --------------------------------------------- | ----- |
| API token OR (API key + email) — either works | 1,085 |
| API token preferred, key+email fallback       | 950   |
| API token only                                | 359   |
| API key + email only                          | 310   |

### API Token (recommended)

Bearer token authentication via the `Authorization` header:

```
Authorization: Bearer <token>
```

Token is read from the `CLOUDFLARE_API_TOKEN` environment variable.

### API Key + Email (legacy)

Two-header authentication:

```
X-Auth-Key: <api_key>
X-Auth-Email: <email>
```

Read from `CLOUDFLARE_API_KEY` and `CLOUDFLARE_EMAIL` environment variables.

### Auth priority

The shared lib checks for `CLOUDFLARE_API_TOKEN` first. If not set, it falls
back to `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL`. If neither is set, it throws
a descriptive error. This covers 2,394 of 3,003 operations (the ones that accept
either auth method). The 359 token-only operations naturally work. The 310
key-only operations are mostly legacy.

### Token validation

On first use, the token is validated against `GET /user/tokens/verify` (for API
tokens) or `GET /user` (for API key). Each distinct credential (an environment
variable or a per-model global argument) is validated exactly once and cached in
a `Set` keyed by the resolved credential, so multiple models using different
vault-sourced credentials each validate once.

### Vault-wireable credential arguments

In addition to the environment variables, each generated model exposes optional,
sensitive global arguments that can be wired with a `vault.get(...)` expression:

- `apiToken` — overrides `CLOUDFLARE_API_TOKEN`.
- `apiKey` + `email` — override `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL` for
  the legacy path.

Resolution precedence is per-credential: an explicit argument takes precedence
over the matching environment variable, and a token is preferred over the
key+email pair. The arguments are emitted with `z.meta({ sensitive: true })`, so
Swamp core redacts them from run logs, reports, and stored data. (They are not
redacted from `swamp model get` output, but on the recommended `vault.get(...)`
path the stored value is the expression, not the secret.)

**Collision guard.** `apiToken` is injected unless a resource property already
owns that name. The legacy `apiKey` + `email` pair is injected only when _both_
names are free — several Cloudflare resources (e.g. `access/users`,
`members/members`, `email/addresses`) already define an `email` property, so
injecting `apiKey` without a paired `email` would leave the key+email path
half-wired. Those models therefore fall back to the `CLOUDFLARE_API_KEY` +
`CLOUDFLARE_EMAIL` environment variables for the legacy path; `apiToken` is
unaffected. The injected field set is mirrored into `pipeline.ts`'s
`newFieldNames` so upgrade diffing stays accurate.

---

## 10. Pagination

Cloudflare uses two pagination patterns that coexist across the API.

### Page-based pagination (dominant)

Used by the majority of list endpoints (~143 with `page` parameter):

```
GET /zones/{zone_id}/dns_records?page=1&per_page=50
```

Response includes `result_info`:

```json
{
  "result_info": {
    "page": 1,
    "per_page": 50,
    "total_pages": 5,
    "count": 50,
    "total_count": 237
  }
}
```

The shared lib iterates by incrementing `page` until `page > total_pages`.

### Cursor-based pagination (newer APIs)

Used by newer endpoints (~24 with `cursor` parameter):

```
GET /accounts/{id}/workers/scripts?cursor=abc123&limit=50
```

Response includes a `cursor` field in `result_info`:

```json
{
  "result_info": {
    "cursor": "next-page-token",
    "count": 50
  }
}
```

The shared lib iterates by passing the returned `cursor` until it's empty or
absent.

### Why both patterns in the shared lib

The pipeline detects which pagination style an endpoint uses by checking its
query parameters for `page` vs `cursor`. The detected style is stored in
resource metadata, and the generated `list` / `checkExists` methods call the
appropriate pagination helper.

### Pagination helpers

```typescript
export async function listAll(
  endpoint: string,
  style: "page" | "cursor",
  queryParams?: Record<string, string>,
): Promise<Record<string, unknown>[]>;

export async function tryFindByField(
  endpoint: string,
  field: string,
  value: string,
  style: "page" | "cursor",
): Promise<Record<string, unknown> | null>;
```

---

## 11. Rate Limiting

Cloudflare enforces rate limits (typically 1,200 requests per 5 minutes for most
API endpoints). The shared lib handles 429 responses with retry logic:

```typescript
async function requestWithRetry(
  method: string,
  path: string,
  body?: unknown,
  options?: { maxRetries?: number },
): Promise<Response> {
  const maxRetries = options?.maxRetries ?? 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const resp = await request(method, path, body);
    if (resp.status === 429) {
      const retryAfter = resp.headers.get("Retry-After");
      const delay = retryAfter
        ? parseInt(retryAfter) * 1000
        : 1000 * (attempt + 1);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }
    return resp;
  }
  throw new Error(
    `Rate limited after ${maxRetries} retries: ${method} ${path}`,
  );
}
```

The `Retry-After` header is respected when present. Without it, exponential
backoff is used. The retry loop follows the same pattern as Hetzner's
`resource_in_use` retry (bounded attempts, no sleep on final failure).

---

## 12. Sync Method

Every generated model includes a `sync` method for drift detection, following
the same pattern as Hetzner and DigitalOcean.

### How sync works

1. Read the instance name from `globalArgs`
2. Load existing state via `context.dataRepository.getContent()`
3. Extract `existing.id` (32-char hex string for most Cloudflare resources)
4. Call `tryRead(endpoint, existing.id)` — returns `null` on 404
5. If result: write refreshed state
6. If null: write a `not_found` marker

### Not-found marker

```typescript
{
  id: "023e105f4ecef8ad9ca31a8372d0c353",
  status: "not_found",
  syncedAt: "2026-05-22T12:00:00.000Z",
}
```

---

## 13. Zod Schema Generation

Each generated model contains three Zod schemas, following the same pattern as
Hetzner and DigitalOcean.

### GlobalArgsSchema — full fidelity input validation

Preserves OpenAPI constraints:

- String enums → `z.enum(["a", "b"])`
- `minLength`/`maxLength` → `z.string().min(n).max(n)`
- `pattern` → `z.string().regex(...)`
- `minimum`/`maximum` → `z.number().min(n).max(n)`
- `integer` → `z.number().int()`
- Nested objects with typed properties

Additionally includes scope parameters for dual-scoped resources:

```typescript
// Account-only resource
account_id: z.string().describe("Cloudflare account ID"),

// Zone-only resource
zone_id: z.string().describe("Cloudflare zone ID"),

// Dual-scoped resource (both optional, refine enforces exactly one)
account_id: z.string().optional().describe("Cloudflare account ID"),
zone_id: z.string().optional().describe("Cloudflare zone ID"),
```

### ResourceSchema — simplified response parsing

No constraints, `.passthrough()`. All fields except `id` are `.optional()`.

### InputsSchema

Mirrors GlobalArgsSchema with all fields `.optional()`.

### oneOf/anyOf handling

Cloudflare uses `anyOf` for some request bodies (e.g., DNS record creation
accepts different schemas per record type). The pipeline follows DigitalOcean's
approach: merge all branch properties, use required-field intersection.

For the 23 schemas with explicit `discriminator` mappings, the pipeline flattens
the variants for initial generation. Discriminator-aware generation (producing
separate per-variant types) is a candidate for future enhancement.

---

## 14. Versioning and Change Detection

The Cloudflare pipeline uses the same shared CalVer versioning system as all
other providers (see `src/pipeline/version.ts`).

### CalVer format

`YYYY.MM.DD.micro` (e.g., `2026.05.22.1`).

- The date prefix is computed from the current date
- The micro version starts at 1 for new files
- If the date matches the existing version's date, micro is incremented
- If the date is different, micro resets to 1

### Content normalization

Before comparing, the pipeline formats the candidate with `deno fmt`, replaces
version strings with a placeholder, and compares normalized content. This
ensures idempotent regeneration.

---

## 15. Generated Output Structure

```
outputs/cloudflare/{service}/
├── manifest.yaml                          # Extension package manifest
├── deno.json                              # Deno configuration
├── deno.lock                              # Dependency lock file
└── extensions/
    └── models/
        ├── _lib/
        │   └── cloudflare.ts              # Shared HTTP client + helpers
        ├── dns_records.ts                 # One file per resource
        ├── dns_firewall.ts
        └── ...
```

### Model export shape

Every model file exports `const model = { ... }` with:

```typescript
export const model = {
  type: "@swamp/cloudflare/dns/dns_records",  // unique type identifier
  version: "2026.05.22.1",                   // CalVer
  globalArguments: GlobalArgsSchema,          // includes zone_id or account_id
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DNS Record resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: { ... },                          // always present
    get: { ... },                             // always present
    update: { ... },                          // if PATCH/PUT exists
    delete: { ... },                          // if DELETE exists
    sync: { ... },                            // always present
  },
};
```

### Shared lib (`_lib/cloudflare.ts`)

Exports: `create`, `read`, `tryRead`, `tryFindByField`, `update`, `remove`,
`listAll`

Key behaviors:

- Auth: `CLOUDFLARE_API_TOKEN` (bearer) or `CLOUDFLARE_API_KEY` +
  `CLOUDFLARE_EMAIL` (legacy)
- Base URL: `https://api.cloudflare.com/client/v4`
- Response envelope unwrapping via `unwrap()` — extracts `.result`
- Error checking via `assertSuccess()` — checks `.success` field
- Rate-limit retry with `Retry-After` header support
- 404 responses return `null` from `tryRead()` instead of throwing
- All other non-OK responses throw with method, path, status, and body
- Page-based and cursor-based pagination helpers
- URL construction with scope prefix (`/accounts/{id}` or `/zones/{id}`)

### Manifest

```yaml
manifestVersion: 1
name: "@swamp/cloudflare/dns"
version: "2026.05.22.1"
description: "Cloudflare DNS infrastructure models"
repository: "https://github.com/systeminit/swamp-extensions"
labels:
  - cloudflare
  - dns
  - cloud
  - infrastructure
releaseNotes: |
  - Initial generation
models:
  - dns_records.ts
  - dns_firewall.ts
```

---

## 16. Configuration Tables

### SERVICE_MAP

Maps path segments to normalized service names for per-service packaging.
Account-scoped paths with two-level nesting use their second segment directly
and don't need entries here. This table is primarily for zone-scoped flat paths
and path segments that need normalization.

| Path segment             | Service name       | Scope | Reason                            |
| ------------------------ | ------------------ | ----- | --------------------------------- |
| `dns_records`            | `dns`              | Zone  | Group zone DNS resources          |
| `dns_firewall`           | `dns`              | Acct  | Group with DNS records            |
| `dns_settings`           | `dns`              | Both  | Group with DNS records            |
| `dnssec`                 | `dns`              | Zone  | Group with DNS records            |
| `cfd_tunnel`             | `tunnel`           | Acct  | Normalize legacy prefix           |
| `warp_connector`         | `tunnel`           | Acct  | Group with tunnels                |
| `tunnels`                | `tunnel`           | Other | Group legacy tunnel path          |
| `storage`                | `workers-kv`       | Acct  | KV namespace lives under /storage |
| `rulesets`               | `rulesets`         | Both  | Dual-scoped, same API             |
| `load_balancers`         | `load-balancing`   | Both  | Normalize to product name         |
| `healthchecks`           | `load-balancing`   | Zone  | Group with load balancers         |
| `waiting_rooms`          | `waiting-rooms`    | Zone  | Normalize underscore to hyphen    |
| `pagerules`              | `page-rules`       | Zone  | Normalize to readable name        |
| `firewall`               | `firewall`         | Both  | Zone has more paths than account  |
| `logpush`                | `logpush`          | Both  | Dual-scoped, same API             |
| `custom_pages`           | `custom-pages`     | Both  | Dual-scoped, same API             |
| `ssl`                    | `ssl`              | Zone  | SSL certificates and settings     |
| `custom_certificates`    | `ssl`              | Zone  | Group with SSL                    |
| `keyless_certificates`   | `ssl`              | Zone  | Group with SSL                    |
| `origin_tls_client_auth` | `ssl`              | Zone  | Group with SSL                    |
| `client_certificates`    | `ssl`              | Zone  | Group with SSL                    |
| `custom_hostnames`       | `custom-hostnames` | Zone  | Standalone zone resource          |
| `spectrum`               | `spectrum`         | Zone  | Spectrum apps                     |
| `email`                  | `email`            | Both  | Dual-scoped                       |
| `email-security`         | `email-security`   | Acct  | Separate from email routing       |
| `cache`                  | `cache`            | Zone  | Cache settings and purge          |
| `settings`               | `zone-settings`    | Zone  | Zone-level settings               |
| `snippets`               | `snippets`         | Zone  | Cloudflare Snippets               |
| `filters`                | `firewall`         | Zone  | Legacy firewall filters           |
| `rate_limits`            | `firewall`         | Zone  | Legacy rate limiting rules        |
| `access`                 | `access`           | Both  | Dual-scoped, large service        |

### IDENTIFIER_MAP

Maps OpenAPI path parameter names to the field name in the API response:

| Path param                                                       | Response field | Resources       |
| ---------------------------------------------------------------- | -------------- | --------------- |
| `id`, `identifier`, `rule_id`, `certificate_id`, `policy_id`,    | `id`           | Most resources  |
| `tunnel_id`, `dns_record_id`, `group_id`, `app_id`, `member_id`, | `id`           |                 |
| `job_id`, `entry_id`, `event_id`, `lock_downs_id`, `filter_id`   | `id`           |                 |
| `bucket_name`, `script_name`, `index_name`, `dispatch_namespace` | `name`         | Name-identified |
| `snippet_name`, `asset_name`                                     | `name`         |                 |

### SCOPE_PARAMETER_ALIASES

Normalizes scope parameter name variants:

| Spec parameter       | Normalized to |
| -------------------- | ------------- |
| `account_identifier` | `account_id`  |
| `zone_identifier`    | `zone_id`     |

### SKIP_TOP_LEVEL

Path prefixes excluded from resource discovery:

| Prefix           | Reason                                      |
| ---------------- | ------------------------------------------- |
| `/radar`         | Read-only analytics, not CRUD resources     |
| `/internal`      | Internal-only endpoints                     |
| `/user`          | User-scoped, doesn't fit account/zone model |
| `/organizations` | Legacy organization management              |
| `/memberships`   | User membership management                  |
| `/ips`           | Read-only Cloudflare IP list                |
| `/certificates`  | Origin CA certificates (special auth)       |
| `/live`          | Health check endpoint                       |

### SKIP_RESOURCES

Specific resource paths excluded from codegen:

| Resource path                                    | Reason                           |
| ------------------------------------------------ | -------------------------------- |
| `/accounts/{id}/ai/run/*`                        | AI inference endpoints, not CRUD |
| `/accounts/{id}/ai/finetunes`                    | Incomplete schema                |
| `/accounts/{id}/stream`                          | Empty POST body                  |
| `/accounts/{id}/rulesets`                        | Empty POST body                  |
| `/zones/{id}/rulesets`                           | Empty POST body                  |
| `/accounts/{id}/realtime/kit/*`                  | Empty POST bodies throughout     |
| `/accounts/{id}/workers/scripts/{name}/versions` | Empty POST body                  |

---

## 17. Differences from Other Providers

| Aspect                  | Cloudflare                              | DigitalOcean                  | Hetzner               | AWS / GCP                      |
| ----------------------- | --------------------------------------- | ----------------------------- | --------------------- | ------------------------------ |
| Schema format           | OpenAPI 3.0 JSON                        | OpenAPI 3.0 YAML              | OpenAPI 3.0 JSON      | CF schemas / Discovery Docs    |
| `$ref` resolution       | Pre-dereferenced (cycle-safe)           | Pre-dereferenced (cycle-safe) | Inline during parsing | Pre-dereferenced               |
| Package layout          | Per-service (~93)                       | Single package                | Single package        | Per-service (~250+)            |
| Resource scoping        | Account / Zone (dual-scope supported)   | None (flat)                   | None (flat)           | Region / project-based         |
| Response envelope       | Fixed `result` key                      | Resource-name-keyed           | Resource-name-keyed   | Varies                         |
| Identifier type         | 32-char hex string (uniform)            | Mixed (int, name, uuid, ip)   | Always numeric `id`   | Varies                         |
| Update method           | PATCH preferred, PUT fallback           | PATCH preferred, PUT fallback | Always PUT            | Varies                         |
| Pagination              | Page-based + cursor-based               | Page-based                    | Page-based            | Token-based / page-based       |
| Auth                    | Bearer token or API key + email         | Bearer token                  | Bearer token          | IAM / OAuth2                   |
| Rate limiting           | 429 retry with Retry-After              | Not handled                   | Not handled           | Not handled                    |
| Manual overrides needed | Moderate (SERVICE_MAP, IDENTIFIER_MAP)  | High (5 override tables)      | None                  | Some                           |
| Zone-scoped grouping    | SERVICE_MAP (manual)                    | N/A                           | N/A                   | N/A                            |
| Dual-scoped resources   | Single model, mutually exclusive params | N/A                           | N/A                   | N/A                            |
| Empty POST bodies       | 22 skipped                              | None                          | None                  | ~201 skipped (no read handler) |
