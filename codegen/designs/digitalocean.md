# DigitalOcean Provider Design

## 1. Purpose

Clover's DigitalOcean provider reads the DigitalOcean public OpenAPI v2 spec and
generates a set of swamp extension models — one per API resource. Each model is
a self-contained TypeScript file that exports a `model` object with Zod schemas,
CRUD methods, action methods, sub-resource methods, and discovery methods. A
shared `_lib/digitalocean.ts` file provides the HTTP client and response
unwrapping logic.

**Output**: `outputs/digitalocean/` containing:

- `extensions/models/*.ts` — one file per resource (e.g., `droplet.ts`,
  `firewall.ts`)
- `extensions/models/_lib/digitalocean.ts` — shared HTTP helpers
- `manifest.yaml` — extension package manifest

**How to run**:

```sh
deno task fetch:digitalocean   # download + dereference the OpenAPI spec
deno task generate:digitalocean # generate models from the local spec
```

The pipeline is orchestrated by `src/commands/generateModels.ts`, which calls
`generateDigitalOceanModels()` from the pipeline, writes all files, runs
`deno fmt`, and reports changes.

---

## 2. Schema Source

The spec is fetched from DigitalOcean's public CDN:

```
https://api-engineering.nyc3.cdn.digitaloceanspaces.com/spec-ci/DigitalOcean-public.v2.yaml
```

The YAML is saved to a temp file and dereferenced using
`@apidevtools/json-schema-ref-parser`, which resolves all `$ref` pointers into
inline definitions. The result is serialized to `schemas/digitalocean.json`.

### Why circular reference handling matters

After dereferencing, the spec contains two kinds of repeated objects:

1. **Shared $refs** — the same JavaScript object referenced from multiple
   locations (e.g., a `DropletCreate` schema used in both POST and PUT). These
   should be serialized fully each time to preserve all property information.

2. **True circular references** — an object that contains itself as a descendant
   (e.g., recursive schema definitions). These must be cut to avoid infinite
   serialization.

The standard `JSON.stringify` replacer approach (tracking all seen objects in a
flat Set) conflates these two cases — it would replace the second occurrence of
a shared ref with `[Circular]` even though it's not a cycle. Instead,
`serializeWithCycleDetection()` uses **ancestor tracking**: it maintains a Set
of objects on the current serialization path. Only when an object is encountered
that is already an ancestor (a true cycle) is it replaced with `[Circular]`.
Shared refs encountered in sibling branches are serialized normally.

```
serializeWithCycleDetection(root):
  ancestors = Set()
  serialize(value):
    if value in ancestors → "[Circular]"   // true cycle
    ancestors.add(value)
    recurse into children
    ancestors.delete(value)                 // backtrack
```

---

## 3. Resource Discovery

Resource discovery is the process of identifying which OpenAPI paths represent
manageable resources versus actions, sub-resources, or other non-resource
endpoints.

### Path-grouping algorithm

The pipeline iterates over all `/v2/` paths and groups them into **base + ID
endpoint pairs**:

| Base path      | ID path                     | Example |
| -------------- | --------------------------- | ------- |
| `/v2/droplets` | `/v2/droplets/{droplet_id}` | Droplet |
| `/v2/domains`  | `/v2/domains/{domain_name}` | Domain  |

A path is the "ID variant" if its terminal segment is a `{param}`. The base path
is derived by stripping that segment.

### Why both POST + GET are required

A resource must have:

- **POST on base** — without a create operation, there's nothing to codegen (the
  model needs to be able to provision the resource)
- **GET on ID path** — without a read operation, the model can't retrieve
  current state after creation

Resources lacking either are skipped. This ensures every generated model can at
minimum create a resource and read it back.

### Multi-pass discovery

Resources, actions, sub-resource methods, and discovery endpoints are identified
in separate passes:

**Pass 1 — Resource grouping**: Paths are classified as base endpoints, ID
endpoints, action endpoints, sub-resource methods, or discovery endpoints.
Action paths (`/{resource}/{id}/actions`) and discovery paths (`/options`) are
collected into separate maps keyed by their parent base path.

**Pass 2 — Action matching**: After all resources are built, action endpoints
are matched to their parent resource by comparing the action's derived parent
base path against `resource.endpoint`.

**Pass 3 — Sub-resource method matching**: Same pattern — sub-resource method
endpoints are matched to parent resources.

**Pass 4 — Discovery endpoint matching**: Discovery endpoints like
`/v2/kubernetes/options` are matched to resources. Direct match is tried first
(prefix === resource endpoint), then sibling match (resource endpoint starts
with prefix + "/").

### Sub-resource detection heuristic

A path with a `{param}` in the middle (not terminal) qualifies as a sub-resource
method if:

- It has PUT or PATCH (it's an update-style operation)
- It has **no POST** (it's not a collection that accepts new items)
- It has **no child paths with additional `{params}`** (no nested collection
  beneath it)

**Why these conditions**: A path like `/v2/databases/{id}/resize` that accepts
PUT but not POST is an operation on the parent resource, not a standalone
collection. If it had POST or had children like
`/v2/databases/{id}/resize/{resize_id}`, it would be a nested resource
collection and should be treated differently (currently skipped as a sub-asset).

### Exclusion rules

| Rule                                    | Rationale                                                                                                      |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `SKIP_TOP_LEVEL: ["add-ons", "gen-ai"]` | Incomplete/beta APIs not ready for codegen                                                                     |
| Skip `/v2/registry` paths               | Duplicate of `/v2/registries` (singular vs plural)                                                             |
| Skip paths with >1 `{param}` segment    | Sub-assets not in `CHILD_RESOURCE_ENDPOINTS` are too deeply nested for the current flat model pattern          |
| Skip paths with >8 total operations     | Overly complex endpoints that likely represent aggregate APIs                                                  |
| Skip `actions` sub-resource paths       | Handled separately via action method generation                                                                |

### Child resource allowlist

Paths with >1 `{param}` segment are normally skipped, but
`CHILD_RESOURCE_ENDPOINTS` allowlists specific nested CRUD collections that
should be generated as standalone models. Each entry specifies:

- **`parentParam`** — the parent path parameter name (e.g., `domain_name`),
  added to `GlobalArgsSchema` as a required string field.
- **`forceSyntheticName`** — when `true`, the factory instance name uses a
  synthetic field (`instance_name` if `name` collides with a create property,
  otherwise `name`). This prevents instance name collisions for child resources
  where the `name` field isn't a unique identifier (e.g., DNS records can have
  multiple records with hostname `www`).

The generated model constructs the API endpoint dynamically at runtime:

```typescript
const endpoint = `/v2/domains/${g.domain_name}/records`;
```

| Collection path | Parent param | `forceSyntheticName` | Notes |
| --- | --- | --- | --- |
| `/v2/databases/{database_cluster_uuid}/dbs` | `database_cluster_uuid` | — | DB name is unique within cluster |
| `/v2/databases/{database_cluster_uuid}/logsink` | `database_cluster_uuid` | — | Inherently synthetic (no name field) |
| `/v2/databases/{database_cluster_uuid}/pools` | `database_cluster_uuid` | — | Pool name is unique within cluster |
| `/v2/databases/{database_cluster_uuid}/replicas` | `database_cluster_uuid` | — | Replica name is unique |
| `/v2/databases/{database_cluster_uuid}/schema-registry` | `database_cluster_uuid` | — | Inherently synthetic (subject_name field) |
| `/v2/databases/{database_cluster_uuid}/topics` | `database_cluster_uuid` | — | Topic name is unique within cluster |
| `/v2/databases/{database_cluster_uuid}/users` | `database_cluster_uuid` | — | Username is unique within cluster |
| `/v2/domains/{domain_name}/records` | `domain_name` | `true` | DNS hostname is NOT unique |
| `/v2/functions/namespaces/{namespace_id}/triggers` | `namespace_id` | — | Trigger name is unique within namespace |
| `/v2/kubernetes/clusters/{cluster_id}/node_pools` | `cluster_id` | — | Node pool has name + numeric ID |
| `/v2/uptime/checks/{check_id}/alerts` | `check_id` | — | Alert has name + numeric ID |
| `/v2/apps/{app_id}/deployments` | `app_id` | — | Inherently synthetic; create + get only |

---

## 4. CRUD Operation Identification

### HTTP method to operation mapping

| HTTP Method | Operation         | Where                                                       |
| ----------- | ----------------- | ----------------------------------------------------------- |
| POST        | Create            | Base path (`/v2/droplets`)                                  |
| GET         | Read              | ID path (`/v2/droplets/{id}`) preferred, base path fallback |
| PATCH       | Update            | ID path                                                     |
| PUT         | Update (fallback) | ID path, only if no PATCH                                   |
| DELETE      | Delete            | ID path                                                     |

### Why PATCH takes precedence over PUT

When both PATCH and PUT exist on the ID endpoint, PATCH is chosen for updates.
PATCH performs partial updates (only send changed fields), while PUT requires
sending the complete resource representation. Partial updates are preferred
because:

- Users typically want to change one or two fields, not restate the entire
  resource
- It avoids accidental field resets when the user omits a field they didn't
  intend to change
- The DigitalOcean API generally supports PATCH where available

### Schema flattening for composed schemas

OpenAPI uses `allOf`, `anyOf`, and `oneOf` to compose schemas. The pipeline
flattens these recursively:

**allOf** (conjunction): All branch properties and required fields are merged.
This is straightforward — `allOf` means "all of these apply simultaneously."

**oneOf/anyOf** (disjunction): All branch properties are merged (union of
fields), but required fields use **intersection** — only fields required in
_every_ branch are marked required. This is because the pipeline doesn't know
which branch the user will satisfy, so it can only enforce requirements that are
universal.

**Type precedence** when branches disagree on type: `string` > `number` >
`integer`. The wider type wins to avoid rejecting valid values.

### Create-only property detection

Properties present in the POST request body but absent from the PATCH/PUT body
are flagged as `createOnlyProperties`. These are used to generate appropriate
Zod schemas — create-only props appear in GlobalArgs but not in the update
method's body construction. Example: a Droplet's `image` can be set at creation
but not changed via update.

### Manual overrides

**REQUIRED_FIELDS_OVERRIDES**: The droplet POST body uses `oneOf` with two
branches — one requires `name` (single create) and the other requires `names`
(bulk create). The intersection of required fields across these branches is
empty (neither field is required in both). Since the pipeline skips `names` (via
`SKIP_PROPERTIES` — bulk create doesn't fit the single-resource model pattern),
`name` must be manually forced as required.

```typescript
REQUIRED_FIELDS_OVERRIDES: { "/v2/droplets": ["name"] }
SKIP_PROPERTIES: Set(["names"])
```

**Why `names` is skipped**: The single-resource model pattern assumes one
instance per create call. The `names` parameter creates multiple droplets at
once, which doesn't map cleanly to the factory pattern where each instance has a
unique name.

---

## 5. Identifying Field Resolution

Each resource needs an identifying field — the field in the API response that
uniquely identifies the resource (used to construct URLs like
`/v2/droplets/{id}`). The path parameter name (e.g., `droplet_id`) must be
mapped to the actual field in the response object (e.g., `id`).

### Three-tier lookup

1. **Endpoint overrides** (`ENDPOINT_IDENTIFIER_OVERRIDES`): Exact path match.
   Used when the path parameter name is too generic to map correctly (e.g.,
   `/v2/apps/{id}` uses `id` directly, bypassing the param-level map).

2. **Parameter-level map** (`IDENTIFIER_MAP`): Maps path parameter names to
   response field names. Covers the majority of resources.

3. **Fallback**: Strip underscores from the parameter name. `droplet_id` →
   `dropletid`. This is a last resort and rarely matches anything useful.

### Why different resources use different identifier types

DigitalOcean's API is not consistent in how resources are identified:

| Type       | Examples                     | Response field |
| ---------- | ---------------------------- | -------------- |
| Numeric ID | Droplets, Volumes, Firewalls | `id`           |
| Name       | Domains, Tags                | `name`         |
| UUID       | Monitoring alerts            | `uuid`         |
| IP address | Floating IPs, Reserved IPs   | `ip`           |

The `IDENTIFIER_MAP` encodes this knowledge:

```typescript
const IDENTIFIER_MAP: Record<string, string> = {
  // Numeric ID
  droplet_id: "id",
  volume_id: "id",
  firewall_id: "id",
  // ... many more

  // Name-based
  domain_name: "name",
  tag_id: "name", // tags use name despite param being "tag_id"

  // UUID-based
  alert_uuid: "uuid",

  // IP-based
  floating_ip: "ip",
  reserved_ip: "ip",
};
```

### Why the fallback strips underscores

The fallback `idParam.replace(/_/g, "")` converts `droplet_id` to `dropletid`.
This exists as a safety net for unmapped parameters. In practice it rarely
produces a correct field name, but it ensures the pipeline doesn't crash on
unknown resources — the generated code may need manual correction but will at
least compile.

---

## 6. Response Envelope Unwrapping

DigitalOcean wraps API responses in an envelope:
`{ "droplet": { ... }, "links": { ... }, "meta": { ... } }`. The pipeline needs
to unwrap this at two levels.

### Pipeline-level (schema extraction)

During code generation, `extractResponseProperties()` examines the OpenAPI
response schema to find the actual resource properties:

1. Filter out `links` and `meta` keys from the response schema
2. For **list endpoints** (no `{param}` in path): find the array property and
   extract its `items` schema
3. For **single-resource endpoints**: unwrap the first remaining property. If
   it's an object, use its properties. If it's an array, use the first item's
   properties (some single-resource endpoints wrap in arrays).

This distinction matters because list responses like `GET /v2/droplets` have
`{ "droplets": [...] }` while single responses like `GET /v2/droplets/{id}` have
`{ "droplet": { ... } }`.

### Runtime-level (HTTP response handling)

The `_lib/digitalocean.ts` `unwrap()` function handles the response envelope at
runtime:

```typescript
function unwrap(data: Record<string, unknown>): Record<string, unknown> {
  const keys = Object.keys(data).filter((k) => k !== "meta" && k !== "links");
  if (keys.length === 0) return data;
  const value = data[keys[0]];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>; // single resource
  }
  if (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "object"
  ) {
    return value[0] as Record<string, unknown>; // multi-create: first element
  }
  return data;
}
```

### Why two levels

Pipeline-level extraction reads the OpenAPI schema to determine which properties
belong to the resource vs the envelope. But the schema can't predict all
response shapes — some endpoints return slightly different envelopes,
multi-create returns an array, and some responses include unexpected keys. The
runtime `unwrap()` function handles these dynamically by applying simple
heuristics (filter `meta`/`links`, take the first non-envelope key, handle
arrays).

---

## 7. Factory Pattern and Instance Naming

Every model uses a **factory pattern**: a single model definition can manage
multiple instances of the same resource type. Each instance is identified by a
name (the "instance name"), which becomes the key in the data store. This
enables CEL expressions like:

```
data.latest("droplet", "web-1").attributes.id
```

### `resolveNamingField`: preference order

1. **`name`** — if the create body includes a `name` property, use it (most
   resources: Droplet, Firewall, VPC, etc.)
2. **`label`** — fallback for resources that use `label` instead (e.g., Function
   Namespace)
3. **Synthetic `name`** — if neither exists, inject a `name` field into
   GlobalArgs that the user must provide. The resource itself doesn't have a
   user-visible name, but the factory pattern still needs one.

### Why synthetic names exist

Some resources (like Reserved IPs or Floating IPs) don't have a user-provided
name — they're identified only by their IP address. But the factory pattern
requires a string key to store and retrieve instances. A synthetic `name` field
is added to GlobalArgs so the user can provide an arbitrary identifier:

```typescript
// Synthetic name added to GlobalArgs
name: z.string().describe(
  "Instance name for this resource (used as the unique identifier in the factory pattern)",
);
```

### How instance names flow through methods

| Method   | Instance name source                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `create` | `globalArgs.{namingField}` or `"current"`                                                                |
| `get`    | For natural names: `result.{namingField}` (from API response). For synthetic: `globalArgs.{namingField}` |
| `update` | `globalArgs.{namingField}` or `"current"` (reads existing data by this key)                              |
| `delete` | `args.{idArg}.toString()` (uses the ID as the instance name for the deletion record)                     |

The distinction between natural and synthetic names in `get` is important: with
a natural name like `name`, the response itself contains the name, so it can be
used even when getting a resource by numeric ID. With a synthetic name, only
globalArgs knows the name the user chose.

---

## 8. Idempotent Create (checkExists)

The create method supports an optional `checkExists: true` argument that guards
against creating a duplicate resource. When enabled, the method checks whether a
resource with the same name already exists and throws an error if it does.

### Why this exists

DigitalOcean's API will happily create two droplets with the same name —
resource names are not unique. In automated workflows, retrying a failed create
or running an idempotent pipeline can produce duplicates. `checkExists` prevents
this by failing fast before the API call.

### Two lookup strategies

The strategy depends on how the resource is identified:

**Direct lookup** — resources identified by a unique field (`name`, `ip`,
`uuid`) that the API can look up directly:

```typescript
// Domain, SSH Key, Reserved IP, etc.
const existing = await tryRead("/v2/domains", g.name);
if (existing) throw new Error(`Resource already exists: ${g.name}`);
```

One API call. Only available when the identifying field matches the naming field
and the API enforces uniqueness on it.

**List + filter** — resources identified by numeric `id` that have a `name` or
`label` field in create properties:

```typescript
// Droplet, Volume, Database Cluster, Load Balancer, etc.
const existing = await tryFindByField("/v2/droplets", "name", g.name);
if (existing) throw new Error(`Resource already exists with name: ${g.name}`);
```

Paginates through `GET /v2/{resource}?page=N&per_page=200` and filters by field
value. More expensive but works for any resource with a name. Note that
DigitalOcean does not enforce unique names, so this is a best-effort check — if
two resources share a name, it will find the first match.

### Which resources get checkExists

| Condition                                                                              | Strategy                         | Examples                                                        |
| -------------------------------------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------- |
| Non-synthetic name + identifying field is `name`/`ip`/`uuid`                           | Direct lookup (`tryRead`)        | Domain, SSH Key, Reserved IP, Tag                               |
| Non-synthetic name + identifying field is `id` + has `name` or `label` in create props | List + filter (`tryFindByField`) | Droplet, Volume, Database Cluster, Firewall, VPC, Load Balancer |
| Synthetic name (no natural naming field)                                               | Not available                    | —                                                               |

### tryFindByField helper

Added to `_lib/digitalocean.ts` to support the list+filter strategy:

```typescript
export async function tryFindByField(
  endpoint: string,
  field: string,
  value: string,
): Promise<Record<string, unknown> | null>;
```

Paginates through all results (200 per page), finds the first item where
`item[field] === value`. Returns `null` if not found. Uses the standard
`meta.total` field from DigitalOcean's paginated responses to determine when to
stop.

### Usage

```bash
# Without checkExists (default) — creates regardless
swamp model method run my-droplet create

# With checkExists — fails if a droplet named "web-1" already exists
swamp model method run my-droplet create '{"checkExists": true}'
```

---

## 9. Action Methods

Actions are operations performed on an existing resource via
`POST /{resource}/{id}/actions` (e.g., reboot a droplet, attach a volume). They
differ from CRUD in that they don't create or modify the resource's core state —
they trigger a one-off operation.

### Discriminator-based discovery

The pipeline discovers available actions from the POST request body schema's
`discriminator.mapping`:

```json
{
  "discriminator": {
    "mapping": {
      "rename": "#/components/schemas/droplet_action_rename",
      "resize": "#/components/schemas/droplet_action_resize",
      "reboot": "#/components/schemas/droplet_action_reboot"
    }
  }
}
```

Each mapping entry points to a component schema that defines the action's
parameters. The `type` field is always the discriminator and is excluded from
the method's arguments (it's hardcoded in the generated body).

### Standard vs NFS nested params pattern

Most action schemas use **flat parameters**: all fields are siblings of `type`:

```json
{ "type": "rename", "name": "new-name" }
```

NFS actions use a **nested `params` pattern**: parameters are grouped under a
`params` key:

```json
{
  "type": "add_share",
  "params": { "name": "share-1", "size": 100 },
  "region": "nyc1"
}
```

The pipeline detects this by checking if the schema has a single `params`
property of type `object` with sub-properties. When detected,
`nestedParams: true` is set, and the generated code constructs the body
differently:

```typescript
// Standard
const body = { type: "rename", ...args };

// NFS nested
const params = { name: args.name, size: args.size };
const body = { type: "add_share", params, region: args.region };
```

**Why NFS uses nested params**: This is simply how DigitalOcean designed the NFS
API — some resource teams chose different request body structures. The pipeline
accommodates both patterns rather than requiring all APIs to conform to one
shape.

### Collision avoidance

If an action type name collides with a CRUD method name (e.g., an action called
`create`), it's prefixed with `action_` → `action_create`.

### Ephemeral action resources

Action results are written to a separate resource spec (`{resource}_action`)
with `lifetime: "ephemeral"` and `garbageCollection: 5` (minutes). This ensures
action results don't accumulate indefinitely — they're temporary records of
operations that were performed.

---

## 10. Sub-resource Methods

Sub-resource methods are update-style operations on a child path of the resource
(e.g., `PUT /v2/databases/{id}/resize`,
`PATCH /v2/databases/{id}/eviction_policy`). Unlike actions, they modify the
parent resource's state.

### Detection heuristic

A path qualifies as a sub-resource method if:

1. It has a `{param}` in the middle (not terminal):
   `/{resource}/{param}/{sub_path}`
2. It has PUT or PATCH
3. It has **no POST** (would indicate a nested collection)
4. It has **no child paths with additional `{params}`** (would indicate a nested
   resource hierarchy)

### Why the re-read pattern

After calling the sub-resource endpoint, the generated code re-reads the parent
resource:

```typescript
await subResourceUpdate(endpoint, args.id, "resize", body, "PUT");
const result = await read(endpoint, args.id); // re-read parent
```

**Why**: Sub-resource update endpoints typically return `202 Accepted` or
`204 No Content` without a response body, or return only partial data. The
parent resource needs to be re-read to get the complete updated state for
storage.

### Collision avoidance

If a sub-resource method name collides with CRUD methods or action methods, it's
prefixed with `sub_`.

---

## 11. Discovery Methods

Discovery endpoints provide metadata about what options are available for a
resource type (e.g., available Kubernetes versions, database engine versions,
region availability).

### `/options` endpoint matching

1. **Direct match**: Remove `/options` from the path to get a prefix. If a
   resource's endpoint equals that prefix, match. Example:
   `/v2/databases/options` → `/v2/databases` → matches `database_cluster`
   resource.

2. **Sibling match**: If no direct match, check if any resource's endpoint
   starts with `prefix + "/"`. Example: `/v2/kubernetes/options` → prefix
   `/v2/kubernetes` → matches resource at `/v2/kubernetes/clusters`.

### Why sibling matching exists

Some DigitalOcean APIs nest resources under a category path:

- Kubernetes clusters live at `/v2/kubernetes/clusters`
- But the options endpoint is at `/v2/kubernetes/options` (sibling, not parent)

Without sibling matching, the Kubernetes cluster resource would miss its
discovery endpoint.

Generated discovery methods are named `list_options` and write results to the
`state` resource with instance name `"options"`.

---

## 12. Sync Method

Every generated model includes a `sync` method for drift detection. Unlike `get`
(which requires the resource identifier as an argument), `sync` reads the
identifier from stored state, making it zero-arg and suitable for automated
workflows.

### How sync works

1. Read the instance name from `globalArgs` (same as `update`)
2. Load existing state via `context.dataRepository.getContent()`
3. Extract `existing.${identifyingField} ?? existing.id` (matches the `update`
   pattern — uses the resource's identifying field with `id` as fallback)
4. Call `tryRead(endpoint, identifier)` — returns `null` on 404 instead of
   throwing
5. If result: write refreshed state
6. If null: write a `not_found` marker

### `tryRead()` helper

The `_lib/digitalocean.ts` exports `tryRead()` alongside `read()`. It accepts
the same `queryParams` parameter as `read()` but returns `null` on 404 instead
of throwing:

```typescript
export async function tryRead(
  endpoint,
  id,
  queryParams?,
): Promise<Record<string, unknown> | null> {
  const resp = await request(
    "GET",
    `${endpoint}/${id}`,
    undefined,
    queryParams,
  );
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
  id: 12345,           // or name, uuid, ip — matches identifyingField
  status: "not_found",
  syncedAt: "2026-03-08T12:00:00.000Z",
}
```

### Identifier field handling

Sync uses `existing.${identifyingField} ?? existing.id` to extract the
identifier, matching the same pattern as the `update` method. This handles
resources where the identifying field differs from `id` (e.g., domains use
`name`, reserved IPs use `ip`).

---

## 13. Zod Schema Generation

Each generated model contains three Zod schemas serving different purposes.

### GlobalArgsSchema — full fidelity input validation

Used for create/update arguments. Preserves all OpenAPI constraints:

- String enums → `z.enum(["a", "b"])`
- `minLength`/`maxLength` → `z.string().min(n).max(n)`
- `pattern` → `z.string().regex(...)`
- Integer enums → `z.union([z.literal(1), z.literal(2)])`
- `minimum`/`maximum` → `z.number().min(n).max(n)`
- `integer` → `z.number().int()`
- Nested objects with typed properties
- Region fields → hardcoded `z.enum(["nyc1", "sfo1", ...])`

Required fields are non-optional; everything else gets `.optional()`.

### ResourceSchema — simplified response parsing

Used to parse API responses. **No constraints, `.passthrough()`**:

- All types are bare: `z.string()`, `z.number()`, `z.boolean()`
- No enums, no min/max, no patterns
- All fields except the identifying field and `id` are `.optional()`
- `.passthrough()` on the object to allow unknown fields

### Why the distinction

**Input schemas validate user-provided data** — strict constraints prevent bad
API calls. **Resource schemas parse API responses** — the API may return data
that violates its own creation constraints (e.g., a legacy resource with a name
that doesn't match the current regex pattern, or a size value outside the
documented range). Applying creation-time constraints to response parsing would
cause false rejections.

### InputsSchema

Mirrors GlobalArgsSchema but with all fields `.optional()`. Used for the swamp
inputs mechanism where partial overrides are provided separately from
globalArgs.

### Region enum

Region values are hardcoded rather than extracted from the spec:

```typescript
const DO_REGIONS = [
  "nyc1",
  "sfo1",
  "nyc2",
  "ams2",
  "sgp1",
  "lon1",
  "nyc3",
  "ams3",
  "fra1",
  "tor1",
  "sfo2",
  "blr1",
  "sfo3",
  "syd1",
  "atl1",
];
```

The OpenAPI spec doesn't consistently provide region enums across all resources.
Some resources include them, others use a free-form string. Hardcoding ensures
consistent validation across all resources that accept a region. When
DigitalOcean adds new regions, this list needs manual updating.

---

## 14. Versioning and Change Detection

### CalVer format

Versions use calendar versioning: `YYYY.MM.DD.micro` (e.g., `2026.03.06.5`).

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

### Why content-based versioning

Without content normalization, every pipeline run would produce a new version
even if nothing in the spec changed (because the date in the version would
differ). Content-based comparison means:

- Running the pipeline twice on the same day with no spec changes → same version
  (no diff in git)
- Running on a new day with no spec changes → same version (date is normalized
  out)
- Actual spec changes → new version with bumped micro

The manifest version uses the same logic but skips `deno fmt` since YAML output
is deterministic.

---

## 15. Generated Output Structure

```
outputs/digitalocean/
├── manifest.yaml                          # Extension package manifest
└── extensions/
    └── models/
        ├── _lib/
        │   └── digitalocean.ts            # Shared HTTP client + helpers
        ├── droplet.ts                     # One file per resource
        ├── firewall.ts
        ├── database_cluster.ts
        └── ...
```

### Model export shape

Every model file exports `const model = { ... }` with:

```typescript
export const model = {
  type: "@swamp/digitalocean/firewall",   // unique type identifier
  version: "2026.03.06.5",               // CalVer
  globalArguments: GlobalArgsSchema,       // Zod: create+update args
  inputsSchema: InputsSchema,             // Zod: optional overrides
  resources: {
    state: {                              // primary resource state
      description: "Firewall resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,              // minutes
    },
    // Optional: action result resource (if actions exist)
    droplet_action: {
      description: "Droplet action result",
      schema: z.object({}).passthrough(),
      lifetime: "ephemeral",
      garbageCollection: 5,
    },
  },
  methods: {
    create: { ... },                      // always present; accepts checkExists arg on most resources
    get: { ... },                         // always present
    update: { ... },                      // if PATCH/PUT exists
    delete: { ... },                      // if DELETE exists
    sync: { ... },                        // always present
    // Action methods (if POST .../actions exists)
    rename: { ... },
    resize: { ... },
    // Sub-resource methods (if PUT/PATCH .../sub_path exists)
    eviction_policy: { ... },
    // Discovery method (if /options endpoint matched)
    list_options: { ... },
  },
};
```

### Shared lib (`_lib/digitalocean.ts`)

Exports: `create`, `read`, `tryRead`, `tryFindByField`, `update`, `remove`,
`subResourceUpdate`, `discover`

Key behaviors:

- Token is read from `DO_API_TOKEN` env var
- Token is validated once against `GET /v2/account` and cached
- 404 responses are not thrown as errors (callers handle them)
- All other non-OK responses throw with method, path, status, and body
- Response bodies are unwrapped via the `unwrap()` function (see Section 6)

### Manifest

```yaml
manifestVersion: 1
name: "@swamp/digitalocean"
version: "2026.03.06.9"
description: "DigitalOcean infrastructure models"
labels:
  - digitalocean
  - cloud
  - infrastructure
releaseNotes: |
  - Updated: droplet, firewall, ...
models:
  - droplet.ts
  - firewall.ts
  - ...
```

---

## 16. Configuration Tables

### IDENTIFIER_MAP

Maps OpenAPI path parameter names to the field name in the API response that
holds the resource's unique identifier.

| Path param                                                                                                                                                                                                                                                                                              | Response field | Resources                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------- |
| `droplet_id`, `volume_id`, `firewall_id`, `vpc_id`, `certificate_id`, `load_balancer_id`, `cdn_id`, `project_id`, `database_cluster_uuid`, `app_id`, `snapshot_id`, `image_id`, `kubernetes_cluster_id`, `space_id`, `alert_id`, `check_id`, `custom_image_id`, `node_pool_id`, `registry_id`, `key_id` | `id`           | Most resources                  |
| `domain_name`, `registry_name`, `tag_id`                                                                                                                                                                                                                                                                | `name`         | Domain, Container Registry, Tag |
| `alert_uuid`, `workspace_uuid`                                                                                                                                                                                                                                                                          | `uuid`         | Monitoring alerts               |
| `floating_ip`, `reserved_ip`                                                                                                                                                                                                                                                                            | `ip`           | Floating IP, Reserved IP        |

### ENDPOINT_IDENTIFIER_OVERRIDES

Path-level overrides that take precedence over IDENTIFIER_MAP.

| Path            | Field | Reason                                          |
| --------------- | ----- | ----------------------------------------------- |
| `/v2/apps/{id}` | `id`  | Param name is just `id`, needs explicit mapping |

### NAME_OVERRIDES

Maps auto-generated display names to preferred human-readable names.

| Auto-generated   | Override                | Reason                                       |
| ---------------- | ----------------------- | -------------------------------------------- |
| App              | App Platform            | More descriptive                             |
| Registry         | Container Registry      | Disambiguate from other registries           |
| Image            | Custom Image            | Disambiguate from marketplace images         |
| Database         | Database Cluster        | Clarify it's the cluster, not individual DBs |
| Monitoring Alert | Monitoring Alert Policy | More precise                                 |
| Account Key      | SSH Key                 | The endpoint name is misleading              |
| Certificate      | SSL Certificate         | More specific                                |

### REQUIRED_FIELDS_OVERRIDES

Forces specific fields to be required when the schema inference can't determine
it.

| Endpoint       | Fields     | Reason                                                               |
| -------------- | ---------- | -------------------------------------------------------------------- |
| `/v2/droplets` | `["name"]` | `oneOf` intersection with `names` branch produces empty required set |

### SKIP_PROPERTIES

Properties excluded from create/update request bodies.

| Property | Reason                                                             |
| -------- | ------------------------------------------------------------------ |
| `names`  | Bulk-create parameter; doesn't fit single-resource factory pattern |

### SKIP_TOP_LEVEL

Top-level path segments excluded from resource discovery.

| Segment   | Reason              |
| --------- | ------------------- |
| `add-ons` | Incomplete/beta API |
| `gen-ai`  | Incomplete/beta API |
