# GCP Provider Design

## 1. Purpose

Clover's GCP provider reads Google Cloud Discovery Documents and generates a set
of swamp extension models — one per GCP resource type. Each model is a
self-contained TypeScript file that exports a `model` object with Zod schemas,
CRUD methods, and action methods. A shared `_lib/gcp.ts` file provides the HTTP
client, authentication, URL construction, LRO polling, and readiness polling.

Unlike the AWS provider (which uses the unified CloudControl API), the GCP
provider generates direct REST API calls using path templates from the Discovery
Documents. Unlike the Hetzner and DigitalOcean providers (which are single
packages), GCP uses per-service packaging like AWS due to the scale of the API
surface (~260 services, ~2010 resources).

**Output**: `outputs/gcp/{service}/` — one directory per GCP API service,
containing:

- `extensions/models/*.ts` — one file per resource type (e.g., `instances.ts`,
  `firewalls.ts`)
- `extensions/models/_lib/gcp.ts` — shared HTTP client and helpers
- `manifest.yaml` — extension package manifest

**How to run**:

```sh
deno task fetch-schema:gcp    # download Discovery Documents
deno task generate:gcp        # generate models from the local schemas
```

The pipeline is orchestrated by `src/commands/generateModels.ts`, which calls
`generateGcpModels()` from the pipeline, writes all files per service, runs
`deno fmt`, and reports changes.

---

## 2. Schema Source

GCP uses its own Discovery Document format (not OpenAPI). Each API has a
separate document fetched from Google's Discovery API directory.

### Fetch process

1. Fetch the directory listing from
   `https://www.googleapis.com/discovery/v1/apis`
2. Group APIs by name, selecting the best version per API:
   - Prefer versions marked with `preferred: true`
   - Otherwise: stable versions over alpha/beta, highest version number wins
3. For each selected API, fetch its discovery document via `discoveryRestUrl`
4. Save each as `{name}.json` in `schemas/gcp/` with sorted keys for
   deterministic output
5. Retry with exponential backoff (250ms base, 3 retries, 30s timeout)
6. Fetch additional non-preferred versions listed in `ADDITIONAL_VERSIONS`
   (saved as `{name}-{version}.json`, e.g. `iam-v1.json`)

### Additional versions

Some APIs expose different resource sets across versions. The preferred version
may lack resources needed for complete coverage. `ADDITIONAL_VERSIONS` maps API
names to non-preferred versions that should also be fetched:

| API   | Additional version | Resources included                  | Reason                                                         |
| ----- | ------------------ | ----------------------------------- | -------------------------------------------------------------- |
| `iam` | `v1`               | organizations/roles, projects/roles | v2 (preferred) only has Deny Policies; v1 has custom role CRUD |

During generation, resources from additional-version schemas are filtered by
`ADDITIONAL_VERSION_RESOURCE_FILTER` to include only the specific resource paths
needed. This prevents duplicating resources already covered by the preferred
version or other APIs.

### Skipped APIs

| API                  | Reason                                    |
| -------------------- | ----------------------------------------- |
| `area120tables`      | Shutdown — discovery endpoint returns 404 |
| `developerknowledge` | Internal API — returns 400                |
| `poly`               | Shutdown — returns 502                    |

### Discovery Document format

GCP Discovery Documents are **not** OpenAPI. Key differences:

- `resources` — nested tree of API resources with methods
- `schemas` — type definitions referenced by `$ref` (simple name lookups, not
  JSON Pointer paths)
- `methods` — HTTP method definitions with path templates, parameter orders, and
  request/response schema references
- No `paths` object — resources are nested, not flat

### $ref dereferencing

GCP uses a simpler `$ref` system than OpenAPI — references are schema name
lookups within the same document:

```
{ "$ref": "Instance" } → doc.schemas["Instance"]
```

Circular references are replaced with
`{ type: "object", description: "Circular reference to ..." }`. Dereferencing is
recursive through properties, items, additionalProperties, and composed schemas
(allOf, oneOf, anyOf).

---

## 3. Resource Discovery

### Recursive resource collection

Resources are discovered by recursively walking the `resources` tree in each
Discovery Document. Unlike OpenAPI path-based discovery, GCP resources are
explicitly nested:

```json
{
  "resources": {
    "instances": {
      "methods": { "get": {...}, "insert": {...}, "delete": {...}, "start": {...} },
      "resources": {
        "networkInterfaces": { "methods": {...} }
      }
    }
  }
}
```

A resource is included if it has at least a `get`, `list`, or `insert` method.

### Method extraction

Methods are mapped from Discovery Document names to CRUD operations:

| Discovery method name               | Operation         |
| ----------------------------------- | ----------------- |
| `get`                               | Read              |
| `list`, `aggregatedList`, `listAll` | List              |
| `insert`, `create`                  | Create            |
| `update`                            | Update            |
| `patch`                             | Patch             |
| `delete`                            | Delete            |
| `deleteXxx`, `removeXxx`            | Delete (fallback) |
| Everything else                     | Action method     |

Operations resources (matching `/[Oo]perations?$/`) are skipped — these are
internal GCP async tracking resources.

### Scope deduplication

Many GCP resources exist at multiple scopes — `projects`, `organizations`,
`folders`, `billingAccounts`. For example, IAM policies may appear under both
`projects.iamPolicies` and `organizations.iamPolicies`. Since these share the
same API surface, they are deduplicated into a single model with
`availableScopes` tracking which scopes are supported.

Path segments are stripped during deduplication:

- **Scope prefixes**: `projects`, `organizations`, `folders`, `billingAccounts`
- **Non-meaningful segments**: `locations`, `zones`, `regions` (handled by
  location parameters)

### Global-only detection

Resources that only support `location: "global"` are detected by pattern
matching against method descriptions:

- `"only supported value for location is \`global\`"`
- `"Only global location is supported"`

When detected, a `location` property is auto-added with `default: "global"`.

### Per-service grouping

Resources are grouped by the Discovery Document's `name` field:

| Service name   | Resource path | Model file     | Model slug  |
| -------------- | ------------- | -------------- | ----------- |
| `compute`      | `instances`   | `instances.ts` | `instances` |
| `compute`      | `firewalls`   | `firewalls.ts` | `firewalls` |
| `container`    | `clusters`    | `clusters.ts`  | `clusters`  |
| `serviceusage` | `services`    | `services.ts`  | `services`  |

Each service produces an independent publishable extension package:
`@swamp/gcp/compute`, `@swamp/gcp/container`, `@swamp/gcp/serviceusage`, etc.

### Why per-service splitting

With ~260 services and ~2010 resources, a single `@swamp/gcp` package would be
impractical. Per-service packaging matches the AWS pattern and allows
independent versioning, faster installs, and alignment with how GCP organizes
its APIs.

---

## 4. Property Classification

### Domain vs resource properties

The pipeline builds two property sets from distinct schema sources:

**Domain properties** (writable): Union of properties from insert, update, and
patch request schemas. Path parameters from `insert.parameterOrder` and required
query parameters are also added. Read-only, output-only, and deprecated
properties are removed.

**Resource properties** (all): Properties from the GET response schema (or list
response item schema for listOnly resources).

### Property provenance tracking

Domain properties are the **union** of insert, update, and patch schemas, but
the create and update methods need to send only the properties valid for their
specific endpoint. The pipeline tracks provenance:

- `insertProperties: Set<string>` — properties from the insert request schema
- `updateProperties: Set<string>` — properties from update/patch request schemas

The create method body only includes `insertProperties`. The update method body
only includes `updateProperties`. `GlobalArgsSchema` includes the full union so
users configure all properties in one place.

### Why provenance tracking matters

GKE clusters illustrate the problem: the insert request uses
`{ cluster: {...} }` while the update request uses
`{ name: "...", update: {...} }`. Without provenance tracking, the `name` field
from the update schema would leak into the create body, causing "Unknown name"
API rejections.

### Output-only detection

GCP doesn't consistently mark output-only fields with `readOnly: true`. The
pipeline pattern-matches descriptions:

- `[Output Only]` — explicit Compute API marker
- `Output only.` at start of description
- `read only property`, `output only` anywhere

Well-known output-only fields (`kind`, `etag`, `selfLink`) are always excluded.

### Create-only detection

Immutable properties are detected by description patterns:

- `immutable`
- `set only at/on/during resource creation`
- `specified only at/on/during resource creation`
- `cannot be changed/modified/updated`

A property is NOT create-only if the description also contains "and updated" or
"and changed".

### Deprecated detection

Properties with `deprecated: true` in the schema are excluded from domain
properties.

### Property name sanitization

GCP Discovery Documents sometimes contain property names invalid as bare
JavaScript identifiers:

- **Dotted names**: `header.bypassBillingFilter`,
  `encryptionConfig.encryptionType`
- **Hyphenated names**: `end-date`, `max-results`, `bulk-export-group`

These are sanitized by replacing dots, hyphens, and slashes with underscores
before entering the Zod generator. Sanitization applies to all property names
across domain properties, resource properties, required lists, and create-only
lists.

### GCP → CfProperty normalization

GCP Discovery properties are normalized to `CfProperty` format (from
`src/schema/types.ts`) to reuse the shared `zodGenerator.ts`:

- `type: "any"` → `type: "string"` (most permissive supported type)
- Integer formats (`int32`, `int64`, `uint32`, `uint64`) → format removed (GCP
  uses string type with these formats to avoid JS precision issues)
- Number formats (`float`, `double`, `decimal`) → `double`
- String formats: `google-datetime` → `date-time`, `uri`/`url` → `uri`
- Unsupported formats removed: `uuid`, `email`, `duration`, `google-duration`,
  `google-fieldmask`, `byte`, `binary`, `password`
- `minimum`/`maximum` parsed from strings (GCP sometimes has string-typed
  min/max values)

---

## 5. Two URL Patterns: Individual Params vs Full Resource Name

GCP APIs use two fundamentally different URL patterns, and the generated models
must handle both.

### Individual path parameters (505 resources)

Older APIs (primarily Compute) use separate path parameters for each segment:

```
projects/{project}/zones/{zone}/instances/{instance}
```

Each parameter (`project`, `zone`, `instance`) is resolved independently from
globalArgs or existing state. The generated code uses bracket notation for all
dynamic property access:

```typescript
params["zone"] = String(g["zone"]);
params["instance"] = args.identifier;
```

### Full resource name via `{+name}` (1533 resources)

Newer APIs use a single `{+name}` parameter containing the fully-qualified
resource path:

```
v1/{+name}          → v1/projects/my-project/services/compute.googleapis.com
v1/{+parent}/services → v1/projects/my-project/services
```

The relationship is: `name = parent + "/" + resourceSegment + "/" + shortName`.

### Detection

The pipeline detects the `{+name}` pattern when:

- The GET path contains `{+name}` with just `"name"` in `parameterOrder`
- The list/create path reveals the resource segment (e.g., `"services"` from
  `v1/{+parent}/services`)

### buildResourceName helper

For `{+name}` resources, the generated model includes a helper function:

```typescript
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/services/${shortName}`;
}
```

This is used by create (for post-LRO read-back), get, update, delete, sync, and
action methods to construct the fully-qualified name.

### Parent resolution: project-only vs multi-scope

The `parent` argument to `buildResourceName` is resolved differently depending
on whether the resource is project-only or multi-scope:

- **Project-only resources** (`availableScopes: ["projects"]`): the parent is
  constructed from `projectId` and `location` globalArgs:
  `` `projects/${projectId}/locations/${g["location"]}` ``. The `parent` field
  is not exposed in `GlobalArgsSchema` — users set `location` instead, and the
  generated code derives the parent path.

- **Multi-scope resources** (organizations, folders, billing accounts): the
  parent is read directly from `globalArgs.parent`, which is declared in
  `GlobalArgsSchema`. Users provide the full parent path (e.g.,
  `organizations/123/locations/us-central1`).

---

## 6. Identifying Field Resolution

### Primary identifier from path parameters

The primary identifier is determined from the last parameter in the GET (or
list/insert) method's `parameterOrder`:

```typescript
const identifierMap: Record<string, string> = {
  name: "name",
  resourceId: "id",
  id: "id",
  instanceId: "id",
  diskId: "id",
  networkId: "id",
};
```

Default: `["name"]` — most GCP resources use `name`.

### Required properties from annotations

GCP uses `annotations.required` on properties to list which methods require
them, plus a schema-level `required` array (rarely populated). Path-only
parameters are always required.

---

## 7. Factory Pattern and Instance Naming

Every model uses a **factory pattern** identical to the AWS and DigitalOcean
providers.

### `resolveGcpNamingField`: preference order

1. **Primary identifier in domain properties** — if the primary identifier field
   (typically `name`) exists in domain properties, use it directly
2. **`name` in domain properties** — fallback if primary ID is something else
   but `name` is writable
3. **Synthetic `name`** — injected when neither is available

### Synthetic name exclusion from API calls

When synthetic, `name` is excluded from both the create and update request
bodies. It is only used for:

1. Factory-pattern instance naming (`writeResource("state", instanceName, ...)`)
2. Building the full resource name (`buildResourceName(parent, name)`)

### How instance names flow through methods

| Method   | Instance name source                                                |
| -------- | ------------------------------------------------------------------- |
| `create` | Natural: `result.name ?? g.name`, Synthetic: `g.name ?? "current"`  |
| `get`    | Natural: `result.name ?? g.name`, Synthetic: `g.name ?? identifier` |
| `update` | `g.name ?? "current"`                                               |
| `delete` | `g.name ?? identifier`                                              |
| `sync`   | `g.name ?? "current"`                                               |

---

## 8. Authentication

The `_lib/gcp.ts` helper supports the full GCP credential chain.

### Credential resolution order

1. **`GCP_ACCESS_TOKEN`** — pre-obtained OAuth2 access token (convenient for
   vault-stored tokens; does **not** require `gcloud` CLI). Requires
   `GCP_PROJECT` or `GOOGLE_CLOUD_PROJECT` to be set.
2. **`GOOGLE_APPLICATION_CREDENTIALS_JSON`** — inline service account JSON
   (convenient for swamp vaults)
3. **`GOOGLE_APPLICATION_CREDENTIALS`** — file path to a service account JSON
   file (standard Google SDK env var)
4. **Application Default Credentials** — `gcloud auth application-default login`
   or GCE/Cloud Run metadata server

Options 2–4 require the `gcloud` CLI to be installed.

### Service account activation

For options 2 and 3, the service account is activated via:

```sh
gcloud auth activate-service-account {email} --key-file {tmpfile}
gcloud auth print-access-token {email}
```

The access token is cached for the duration of the process.

### Project ID resolution

The project ID is read from the service account JSON's `project_id` field.
Overridden by `GCP_PROJECT` or `GOOGLE_CLOUD_PROJECT` env vars. For ADC without
a service account, falls back to `gcloud config get-value project`. When using
`GCP_ACCESS_TOKEN`, the project ID must be provided via `GCP_PROJECT` or
`GOOGLE_CLOUD_PROJECT`.

### Quota project header

Every HTTP request includes the `x-goog-user-project` header when a project ID
is available. Some GCP APIs (e.g., Cloud Identity) require this header to
identify a billing/quota project when authenticating via Application Default
Credentials. The header value comes from the resolved `projectId` in the
credential chain. When no project ID is configured (org-scoped resources that
don't need one), the header is omitted.

### gcloud CLI check

On first credential request (for options 2–4), the helper verifies
`gcloud --version` succeeds. If not installed, a clear error with the install
link is thrown.

---

## 9. Long Running Operations (LRO)

Most GCP mutating operations (create, update, delete, action methods) return an
operation object that must be polled for completion.

### Three LRO patterns

| Pattern | Detection                                                                   | Example services                                         |
| ------- | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| Compute | `response.kind` contains `#operation`                                       | Compute Engine                                           |
| Generic | `response.name` contains `operations/`                                      | Most services (serviceusage, cloudresourcemanager, etc.) |
| GKE     | `response.operationType` exists AND `response.name` starts with `operation` | Container (GKE), some AI Platform                        |

The generic pattern does not require a `done` field — v3 APIs (e.g.,
cloudresourcemanager folders) return
`{ "name": "operations/...", "metadata": {...} }` with no `done` field in the
initial response. The `done` field appears after polling.

### Already-done operations

Some APIs return operations that are already complete (e.g., `done: true` or
`status: "DONE"` in the response). The LRO handler checks `isOperationDone()`
before polling to avoid unnecessary requests.

### Post-LRO resource name extraction

v3 LROs include the created resource in `operation.response` when the operation
completes successfully. `createResource` extracts `operation.response.name` into
the path params so the post-LRO GET read-back can construct the correct URL.
This handles resources like folders where the resource name (e.g.,
`folders/981118018507`) is only known after the operation completes.

### Operation URL construction

The poll URL is derived from the operation response:

1. `response.selfLink` — used directly if present (GKE pattern)
2. `response.name` starting with `http` — used directly
3. `response.name` as a path — prepended with `baseUrl` + API version prefix

The API version prefix (e.g., `v1`) is extracted from the original request path
to ensure the poll URL is correct:
`https://serviceusage.googleapis.com/v1/operations/noop.DONE_OPERATION`

### Polling parameters

- Max attempts: 20
- Base delay: 2 seconds, exponential backoff
- Max delay: 30 seconds
- Checks for errors after completion and throws if found

---

## 10. Readiness Polling

Some GCP resources report LRO completion while still in an intermediate state
(e.g., GKE clusters go through `PROVISIONING` → `RUNNING`). The pipeline
auto-detects this and adds readiness polling after LRO completion.

### Detection

The pipeline scans the resource's GET response schema for `status`, `state`, or
`lifecycleState` enum fields. If found, it classifies enum values:

**Ready values**: `ACTIVE`, `RUNNING`, `READY`, `ENABLED`, `SUCCEEDED`, `DONE`,
`COMPLETED`, `AVAILABLE`, `RUNNABLE`, `SERVING`, `UP`, `ONLINE`, `RECONCILING`

**Failed values**: `FAILED`, `ERROR`, `DEGRADED`, `STOPPED`, `TERMINATED`,
`BROKEN`, `UNRECOVERABLE`

### Polling behavior

After LRO + read-back, `createResource` and `updateResource` poll the GET
endpoint every 10 seconds for up to 10 minutes until the status field reaches a
ready or failed value. If a failed value is reached, an error is thrown.

### Opt-out

Resources with readiness config get a `waitForReady` argument on create and
update methods:

- **Default** (`waitForReady: true` or omitted): polls until ready
- **`waitForReady: false`**: skips readiness polling, returns after LRO + GET

Resources without detectable status enums have no readiness polling and no
`waitForReady` argument.

---

## 10a. Idempotent Create

`createResource` supports an optional `IdempotencyConfig` that enables
already-exists fallback. When a create fails with HTTP 409 or an LRO-level
"already exists" error (e.g., GCP's "display name uniqueness within the parent"
for folders), the function falls back to listing resources and matching by a
specified field.

### Config shape

```typescript
interface IdempotencyConfig {
  listConfig: GcpMethodConfig; // LIST endpoint config
  listParams: Record<string, string>; // params for the list call (e.g., parent)
  matchField: string; // field to match on (e.g., "displayName")
  matchValue: string; // value to match
}
```

### Match field selection

The generator selects the match field based on the resource's naming pattern:

- If `displayName` exists in `insertProperties`: match by `displayName` (covers
  folders, projects, and other resources where `name` is auto-generated)
- Otherwise: match by the resource's naming field

### List params

The generator populates list params from:

1. Path parameters in `listConfig.parameterOrder` (e.g., `project`)
2. `parent` if it appears as a query parameter in `listConfig.parameters`

For project-only resources, parent is constructed from
`projects/${projectId}/locations/${location}`. For multi-scope resources, parent
is read from the create body or globalArgs.

---

## 11. Concurrency Control

Many GCP APIs use optimistic concurrency — update requests must include a
`fingerprint` or `etag` field from the most recently read state.

### Affected fields

- `fingerprint`, `labelFingerprint` — Compute Engine
- `etag` — IAM, Cloud Resource Manager, Cloud DNS
- Any field ending in `Fingerprint` — various Compute resources

### Implementation

The update method reads existing state, builds the update body from globalArgs,
then injects concurrency control fields from existing state:

```typescript
for (const key of Object.keys(existing)) {
  if (
    key === "fingerprint" || key === "labelFingerprint" ||
    key === "etag" || key.endsWith("Fingerprint")
  ) {
    body[key] = existing[key];
  }
}
```

This is generic across all GCP resources — no per-service configuration needed.

---

## 12. Action Methods

Action methods are non-CRUD operations exposed in Discovery Documents (e.g.,
`start`, `stop`, `reboot`, `reset`, `resize`, `attachDisk`, `setMachineType`,
`enable`, `disable`).

### Collection

All methods not matching CRUD patterns are collected as action methods. This
includes IAM policy methods (`getIamPolicy`, `setIamPolicy`,
`testIamPermissions`) which are generated as `get_iam_policy`, `set_iam_policy`,
and `test_iam_permissions` action methods on every resource that exposes them
(~64 GCP services).

### Path parameter resolution

Action method path parameters are resolved from globalArgs when possible. Only
parameters not available in globalArgs fall back to reading from existing state.
This prevents action methods from requiring a prior `create` or `get` when all
needed information is already in globalArgs.

For the resource identifier (last path parameter), the code maps to the primary
identifier field (e.g., `name`) rather than the raw path parameter name (e.g.,
`instance`), and falls back to globalArgs.

### Naming

Discovery method names are converted to snake_case for the generated method
name: `setMachineType` → `set_machine_type`. Hyphens are also converted:
`bulk-export-group` → `bulk_export_group`. Collisions with CRUD method names are
prefixed with `action_`.

### Request body

Action methods with request body schemas generate typed arguments from the
request properties. Methods without request bodies generate empty arguments.

---

## 13. Sync Method

Every generated model includes a `sync` method for drift detection, following
the same pattern as AWS and DigitalOcean.

### Identifier fallback

The sync method extracts the resource identifier from existing state with a
fallback to globalArgs:

```typescript
const identifier = existing.name?.toString() ?? g["name"]?.toString();
```

This handles the post-delete case where stored state is
`{ identifier: "...", status: "deleted" }` without a `name` field.

### Full resource name in sync

For `{+name}` resources, sync constructs the full name using
`buildResourceName()` from parent and short name, following the same pattern as
get and delete.

### Not-found marker

When the resource no longer exists, sync writes:

```typescript
{
  status: "not_found",
  syncedAt: "2026-03-08T12:00:00.000Z",
}
```

---

## 13a. List Factory Method

Resources with a `list` (or `aggregatedList` / `listAll`) method in the
Discovery Document gain a `list` factory method that paginates through the list
endpoint and writes one data artifact per returned item.

### When the list method is generated

A resource gets a `list` method when **both** conditions are met:

1. `methodConfigs.list` exists (the Discovery Document has a list-like method)
2. `listResponseArrayField` is set (the list response schema has a top-level
   array property whose items are objects, not primitives)

Resources where the list endpoint is `aggregatedList` with a nested-map response
(e.g., Compute `networkEdgeSecurityServices`) do not get a list method because
the response array field detection finds no top-level object array.

### List metadata extraction

During `buildGcpParsedResource()`, two additional fields are populated:

- **`listQueryParams`** — query parameters from the list method (excluding
  pagination internals like `pageToken`, deprecated parameters, and API-wide
  params like `alt`, `key`, `fields`). Each entry has `name`, `type`,
  `description`, and `required`.
- **`listResponseArrayField`** — the property name in the list response that
  contains the resource array (e.g., `"files"` for Drive, `"items"` for
  Compute). Only arrays whose items have `type: "object"` or `properties` are
  considered — this filters out primitive arrays like `unreachables`.

### Generated method shape

```typescript
list: {
  description: "List <resource> resources",
  arguments: z.object({
    // One optional argument per list query param (filter, q, pageSize, etc.)
    filter: z.string().describe("...").optional(),
    maxResults: z.number().describe("...").optional(),
    // Control pagination depth
    maxPages: z.number().describe("Maximum number of pages to fetch (default: 10)").optional(),
  }),
  execute: async (args, context) => {
    // 1. Build params from globalArgs (project, parent/zone) + method args
    // 2. Call listResources(BASE_URL, LIST_CONFIG, params, arrayField, maxPages)
    // 3. Write each item as a separate data artifact named by primary identifier
    // 4. Return { dataHandles: [...], result: { count, nextPageToken } }
  },
}
```

### Runtime helper

The `listResources()` function in `_lib/gcp.ts` paginates through the list
endpoint and collects all items:

```typescript
listResources(baseUrl, config, params, arrayField, maxPages?)
  → { items: any[], nextPageToken?: string }
```

Unlike `readViaList()` (which searches for a single item by filter),
`listResources()` returns the full collection. It appends `fields=*` only when
the caller hasn't supplied their own `fields` parameter.

### Data artifact naming

Each returned item becomes a data artifact named by its primary identifier field
(e.g., `id` for Drive files, `name` for Compute instances). Names are sanitized
with `wrapWithSanitize()` to comply with the data artifact naming contract.
Items without a primary identifier fall back to their array index.

### Fan-out pattern

The list method enables the swamp fan-out pattern: list resources, then
reference individual results via CEL:

```bash
swamp model method run my-drive list --input q='"FOLDER_ID" in parents'
# Each file becomes a data artifact accessible via:
# data.latest("my-drive", "<file-name>").attributes.modifiedTime
```

---

## 14. Zod Schema Generation

Each generated model contains three Zod schemas. The Zod generation reuses the
shared `src/codegen/zodGenerator.ts` — GCP properties are normalized to
`CfProperty` format before being passed to the generator.

### GlobalArgsSchema — full fidelity input validation

Preserves all Discovery Document constraints:

- String enums → `z.enum(["a", "b"])`
- `minLength`/`maxLength` → `z.string().min(n).max(n)`
- `pattern` → `z.string().regex(new RegExp(...))`
- `minimum`/`maximum` → `z.number().min(n).max(n)`
- `integer` → `z.number().int()`
- Nested objects extracted to top-level named schemas (from `title` field)

Required fields are non-optional; everything else gets `.optional()`.

### StateSchema — simplified response parsing

No constraints, `.passthrough()`. Primary identifier fields are non-optional;
everything else is `.optional()`.

### InputsSchema

Mirrors GlobalArgsSchema but with all fields `.optional()`.

### Schema name collision avoidance

Same as AWS: the internal state schema is named `StateSchema`. If an extracted
schema collides with that name, it's renamed to `_StateSchema`.

### Lint directives

- `no-explicit-any` — always added (context parameter)
- `no-control-regex` — conditionally added when regex patterns contain control
  character escapes (same detection as AWS)

---

## 15. Post-Create Read-Back

After a create operation (which returns an LRO), the generated code does a GET
to read the actual resource state. This requires the GET path parameters, which
may differ from the INSERT path parameters.

### Extra parameter population

The generator compares GET's `parameterOrder` against INSERT's. Any parameter in
GET but not INSERT is pre-populated before calling `createResource`:

- Last GET parameter (resource identifier): set from `globalArgs.name` or via
  `buildResourceName` for `{+name}` resources
- Other GET parameters: set from globalArgs

Example — Compute firewalls:

- INSERT needs: `[project]`
- GET needs: `[project, firewall]`
- Generated: `params["firewall"] = String(g["name"])`

---

## 16. Versioning and Change Detection

Uses the same shared CalVer system as AWS, Hetzner, and DigitalOcean (see
`src/pipeline/version.ts`). Per-service manifest versioning matches the AWS
pattern.

### Idempotency

Running the pipeline twice with no schema changes produces `0 changed` models.

---

## 17. Generated Output Structure

```
outputs/gcp/
├── compute/
│   ├── manifest.yaml
│   └── extensions/
│       └── models/
│           ├── _lib/
│           │   └── gcp.ts
│           ├── instances.ts
│           ├── firewalls.ts
│           ├── networks.ts
│           └── ...
├── container/
│   ├── manifest.yaml
│   └── extensions/
│       └── models/
│           ├── _lib/
│           │   └── gcp.ts
│           └── clusters.ts
├── serviceusage/
│   ├── manifest.yaml
│   └── extensions/
│       └── models/
│           ├── _lib/
│           │   └── gcp.ts
│           └── services.ts
└── ...  (260 services total)
```

### Model export shape

```typescript
export const model = {
  type: "@swamp/gcp/compute/instances",  // unique type identifier
  version: "2026.03.27.1",              // CalVer
  globalArguments: GlobalArgsSchema,     // Zod: create/update args
  inputsSchema: InputsSchema,           // Zod: optional overrides
  resources: {
    state: {
      description: "...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: { ... },                     // if insert handler exists; waitForReady arg if readiness detected
    get: { ... },                        // if read handler exists
    update: { ... },                     // if update/patch handler exists; waitForReady arg if readiness detected
    delete: { ... },                     // if delete handler exists
    sync: { ... },                       // always present
    // Action methods (if non-CRUD methods exist)
    start: { ... },
    stop: { ... },
    set_machine_type: { ... },
  },
};
```

### Shared lib (`_lib/gcp.ts`)

Exports: `createResource`, `readResource`, `readViaList`, `tryReadResource`,
`updateResource`, `deleteResource`, `isResourceNotFoundError`, `getProjectId`

Key behaviors:

- Full credential chain (inline JSON, file path, ADC)
- gcloud CLI presence check on first use
- URL construction from Discovery path templates
- Automatic `fields=*` on all read operations (see below)
- Three LRO detection patterns (Compute, generic, GKE)
- Optional readiness polling after create/update
- Concurrency control field injection in updates
- `tryReadResource` returns null on 404/403

### Automatic `fields=*` on read operations

GCP Discovery Documents define `fields` as a global query parameter (at
`doc.parameters`, not per-method) that controls partial responses. Many GCP APIs
— notably Drive, Gmail, Calendar, Sheets, and other Workspace APIs — return only
a minimal set of fields by default. Without `fields=*`, the response contains a
tiny subset of the resource, creating a mismatch with the full `StateSchema`
declared by the generated model.

The shared lib appends `fields=*` to every read operation URL (`readResource`,
`readViaList`, `tryReadResource`, and all post-LRO/readiness-polling read-backs
in `createResource` and `updateResource`). This ensures the API returns the
complete resource, matching the model's declared schema. The `pollOperation`
function is excluded — LRO status endpoints do not accept the `fields`
parameter.

If the URL already contains a `fields=` parameter (e.g., set explicitly by the
caller), the automatic injection is skipped, preserving user-specified
projections.

### Naming conventions

| Aspect      | Convention                                           | Example                          |
| ----------- | ---------------------------------------------------- | -------------------------------- |
| File name   | Resource path joined with `_`, lowercased            | `instances.ts`, `global_hubs.ts` |
| Model slug  | Resource path joined with `-`, lowercased            | `instances`, `global-hubs`       |
| Type string | `@swamp/gcp/{service}/{slug}`                        | `@swamp/gcp/compute/instances`   |
| Description | From Discovery Document schema or method description | "An Instance resource..."        |

---

## 18. Enrichments

Enrichments add non-schema-derived capabilities to generated models. The
enrichment source is real, type-checkable TypeScript (`.enrich.ts` files) that
is parsed and inlined at generation time. This keeps the codegen pipeline
schema-faithful while allowing per-resource extensions.

See the [AWS design doc](aws.md) for the original enrichment pattern (read-path
enrichment via `enrichState`). GCP extends this pattern with a method injection
insertion point for adding new action methods.

### File structure

```
codegen/gcp/enrichments/
├── types.ts                    # GcpEnrichment interface
├── parser.ts                   # parseEnrichmentSource()
├── parser_test.ts              # Parser tests
├── index.ts                    # Registry: getEnrichment(), getServiceEnrichmentImports()
├── storage-buckets.ts          # Metadata (resourceId, methodsExport, npmImports)
└── storage-buckets.enrich.ts   # Real TypeScript source
```

### Insertion points

The GCP extension model generator has four insertion points for enrichment:

1. **Imports** — SDK imports from the `.enrich.ts` file, added after helper
   imports. The `request()` function is also imported from `_lib/gcp.ts` when
   enrichment is present.
2. **Body** — schemas and helper code, inlined between `GlobalArgsSchema` and
   `StateSchema`.
3. **StateSchema fields** — extra Zod fields inside the `StateSchema` object
   (not used by the current enrichment).
4. **Methods** — additional method definitions spread into the model's `methods`
   object after the action method loop: `...iamBindingMethods,`.

### Creating a new enrichment

1. Create `<resource>.enrich.ts` with exported schemas/functions and a methods
   object.
2. Create `<resource>.ts` metadata file registering the `GcpEnrichment`.
3. Import and add to the `ENRICHMENTS` array in `index.ts`.
4. Regenerate the affected service.

### Current enrichments

| Resource          | Methods                                 | Description                                                                 |
| ----------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| `storage.buckets` | `add_iam_binding`, `remove_iam_binding` | Granular IAM binding management via read-modify-write with etag concurrency |

---

## 19. Differences from AWS, Hetzner, and DigitalOcean

| Aspect              | GCP                                                 | AWS                                                     | Hetzner / DigitalOcean        |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------- | ----------------------------- |
| Schema source       | Discovery Documents (~300 JSON files)               | CloudFormation zip (JSON per resource type)             | Single OpenAPI spec           |
| API style           | Direct REST with Discovery path templates           | CloudControl (unified CRUD)                             | REST (per-resource endpoints) |
| $ref resolution     | Simple name lookups within same document            | JSON Pointer with `@apidevtools/json-schema-ref-parser` | OpenAPI `$ref` paths          |
| Resource discovery  | Recursive resource tree walk                        | CF schema handlers field                                | OpenAPI path grouping         |
| Output structure    | Per-service directories (260 packages)              | Per-service directories (244 packages)                  | Single package                |
| URL patterns        | `{+name}` (1533) + individual params (505)          | CloudControl handles all                                | Simple REST paths             |
| Identifier type     | Usually `name` (string)                             | Always string                                           | `id`, `name`, `uuid`, `ip`    |
| LRO handling        | 3 patterns (Compute, generic, GKE)                  | Poll `GetResourceRequestStatus`                         | Not applicable                |
| Readiness polling   | Auto-detected from status enums                     | Not applicable                                          | Not applicable                |
| Concurrency control | fingerprint/etag auto-carried in updates            | Not applicable (JSON Patch)                             | Not applicable                |
| Action methods      | Auto-collected from non-CRUD Discovery methods      | Not applicable                                          | Discriminator-based (DO)      |
| Enrichments         | Per-resource `.enrich.ts` files (see §18)           | Per-resource `.enrich.ts` files (see AWS design doc)    | Not applicable                |
| Update mechanism    | PUT/PATCH with body from update-specific properties | JSON Patch (RFC 6902)                                   | PUT (Hetzner) / PATCH (DO)    |
| Property provenance | Tracked (insert vs update properties)               | Not needed (single property set)                        | Create-only tracked (DO)      |
| Auth                | Service account JSON, file path, or ADC             | SDK default credential chain                            | API token env var             |
| Manual overrides    | `SKIP_APIS` (3 entries)                             | `IGNORE_SCHEMAS` (5 entries)                            | 5 override tables (DO)        |
| Scope deduplication | projects/orgs/folders → single model                | Not applicable                                          | Not applicable                |
