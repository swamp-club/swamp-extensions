# Vercel Provider Design

## 1. Purpose

Clover's Vercel provider reads the Vercel public OpenAPI 3.0 spec and generates
a set of swamp extension models — one per API resource. Each model is a
self-contained TypeScript file that exports a `model` object with Zod schemas
and CRUD methods. A shared `_lib/vercel.ts` file provides the HTTP client,
authentication, rate-limit retry logic, and pagination helpers.

Like Cloudflare, the Vercel provider uses **per-service packaging** due to the
breadth of the API surface (~39 resource tags). Unlike Cloudflare, Vercel has no
response envelope — resources are returned directly in API responses.

**Output**: `model/vercel/{service}/` — one directory per Vercel service,
containing:

- `extensions/models/*.ts` — one file per resource
- `extensions/models/_lib/vercel.ts` — shared HTTP helpers
- `manifest.yaml` — extension package manifest

**How to run**:

```sh
deno task fetch-schema:vercel   # download the OpenAPI spec
deno task generate:vercel       # generate models from the local spec
```

---

## 2. Schema Source

The spec is fetched from Vercel's public endpoint:

```
https://openapi.vercel.sh/
```

The spec is JSON (despite no `.json` extension) and is saved to
`codegen/schemas/vercel.json` after dereferencing.

### Spec characteristics

| Metric                | Value                               |
| --------------------- | ----------------------------------- |
| OpenAPI version       | 3.0.3                               |
| Total paths           | 264                                 |
| Total operations      | 359                                 |
| Component schemas     | 86                                  |
| Inline object schemas | ~4,709                              |
| `$ref` references     | 2,221                               |
| Tags                  | 39                                  |
| HTTP methods used     | GET, POST, PUT, PATCH, DELETE, HEAD |

### $ref dereferencing

The spec uses 2,221 `$ref` references. Like the Cloudflare and DigitalOcean
pipelines, the spec is dereferenced using `@apidevtools/json-schema-ref-parser`
with cycle-safe serialization via `serializeWithCycleDetection()`.

### Inline schema dominance

The most significant structural difference from Cloudflare: only 86 schemas live
in `components/schemas`, while ~4,709 are defined inline within path operations.
The pipeline must extract properties directly from inline request/response
schemas rather than following clean `$ref` chains.

### Vendor extensions

| Extension       | Count | Use                            |
| --------------- | ----- | ------------------------------ |
| `x-speakeasy-*` | 24    | Speakeasy SDK generation hints |
| `x-vercel-cli`  | Some  | CLI-specific metadata          |
| `x-codeSamples` | Some  | Documentation code examples    |

These are informational and not used for codegen.

### Known spec quality issues

Community reports (vercel/community #646) document 24+ validation errors
including missing path parameter definitions, duplicate parameters, and
malformed request body schemas. The pipeline includes workarounds for specific
endpoints as needed.

---

## 3. Per-Operation Versioning

Vercel uses **per-operation versioning** — each individual endpoint has its own
version number in the path prefix. The version represents when that specific
operation was last updated, NOT alternative API versions.

### How it works

```
POST   /v13/deployments          ← create (v13)
GET    /v13/deployments/{idOrUrl} ← get (v13)
DELETE /v13/deployments/{id}      ← delete (v13)
GET    /v7/deployments            ← list (v7)
PATCH  /v12/deployments/{id}/cancel ← cancel (v12)
GET    /v3/deployments/{idOrUrl}/events ← events (v3)
GET    /v6/deployments/{id}/files ← list files (v6)
```

There is exactly ONE active path per operation. `POST /v12/deployments` does not
exist — only `POST /v13/deployments`. The spec publishes only the current
version of each operation.

### Implications for codegen

- The full path including version prefix is the canonical endpoint
- No version selection logic is needed
- Operations with different version prefixes that share a resource are grouped
  by their OpenAPI tag
- Only 6 operations are marked `deprecated: true` (old v1 checks) — these are
  skipped

---

## 4. Scoping Model

Vercel resources are scoped to a **team** via query parameters, not path
segments:

| Parameter | Type   | Description             |
| --------- | ------ | ----------------------- |
| `teamId`  | string | Team ID                 |
| `slug`    | string | Team slug (alternative) |

Nearly every endpoint accepts both `teamId` and `slug` as optional query
parameters. They are mutually exclusive — providing both is an error.

### How team scoping is handled

Unlike Cloudflare's path-based scoping (`/accounts/{id}/` or `/zones/{id}/`),
Vercel's team parameters are query params appended to every request. The shared
lib injects them automatically:

```typescript
const GlobalArgsSchema = z.object({
  teamId: z.string().optional().describe("Vercel team ID"),
  slug: z.string().optional().describe("Vercel team slug"),
  // ... resource-specific fields
});
```

The lib's `request()` function merges `teamId`/`slug` into query parameters when
present.

### Resource properties named like a team scope or auth arg

Some resources have their own property named `slug` (Edge Configs, feature flags
and segments, teams, custom environments), which would be shadowed by the team
`slug` arg. A resource property named `teamId`, `slug` or `token` is therefore
exposed under `resource` plus the capitalised name: an Edge Config's own slug is
`resourceSlug`, while `slug` stays the team slug. The generated code maps it
back to the API name wherever the API sees it: `body.slug = g.resourceSlug` in
create and update bodies, the lookup filter on `item.slug`, and the PUT live
fill. The create and update checks name the global arg (`resourceSlug`). Upgrade
entries list it under the global arg name (`globalArgsFieldNames` in
`pipeline.ts`).

On `teams/teams`, `resourceSlug` is the slug of the team being created. A team
`slug` set there is still sent as a query parameter, as on every other model.

A parent path param keeps its name even when it matches one of these
(`teams/members` takes `teamId` in its path); the path param and the team scope
arg are then the same value.

---

## 5. Resource Discovery

### Service grouping

Resources are grouped by their OpenAPI **tag**. Vercel tags every operation
(except ~11 unversioned paths), making service assignment straightforward — no
`SERVICE_MAP` equivalent is needed.

| Tag             | Example resources                        |
| --------------- | ---------------------------------------- |
| `projects`      | Project CRUD, env vars, domains          |
| `deployments`   | Create, list, cancel, delete deployments |
| `domains`       | Domain management, verification          |
| `dns`           | DNS record CRUD                          |
| `teams`         | Team management, member invites          |
| `certs`         | SSL certificate management               |
| `edge-cache`    | Cache invalidation                       |
| `global-config` | Edge Config items, tokens, schemas       |
| `security`      | WAF/firewall, attack mode, bypass rules  |

### Path-grouping algorithm

Operations are grouped into CRUD sets by stripping the version prefix and
finding base + ID endpoint pairs:

| Base path (stripped)        | ID path (stripped)                     |
| --------------------------- | -------------------------------------- |
| `/projects`                 | `/projects/{idOrName}`                 |
| `/domains`                  | `/domains/{domain}`                    |
| `/domains/{domain}/records` | `/domains/{domain}/records/{recordId}` |

A path is the "ID variant" if its terminal segment is a `{param}`.

### Why both POST + GET are required

Same as Cloudflare: a resource must have POST (create) and GET-by-id (read) to
be codegen-eligible. Resources lacking either are skipped.

### Exclusion rules

| Tag              | Reason                                      |
| ---------------- | ------------------------------------------- |
| `artifacts`      | Turborepo build cache, not infrastructure   |
| `authentication` | Meta API (tokens, SSO), not manageable      |
| `billing`        | Read-only billing data                      |
| `logs`           | Streaming/read-only                         |
| `marketplace`    | Integration marketplace management          |
| `sandboxes`      | Ephemeral sandbox sessions                  |
| `user`           | User profile, not manageable infrastructure |
| `web-analytics`  | Read-only analytics data                    |

---

## 6. CRUD Operation Identification

### HTTP method to operation mapping

| HTTP Method | Operation         | Where                     |
| ----------- | ----------------- | ------------------------- |
| POST        | Create            | Base path                 |
| GET         | Read              | ID path (single resource) |
| PATCH       | Update            | ID path (preferred)       |
| PUT         | Update (fallback) | ID path, only if no PATCH |
| DELETE      | Delete            | ID path                   |
| GET         | List              | Base path                 |

### Schema extraction from inline definitions

Since Vercel defines most schemas inline, the pipeline extracts properties by:

1. Finding the POST request body → `content["application/json"].schema`
2. Finding the GET response →
   `responses["200"].content["application/json"].schema`
3. Flattening `allOf`/`oneOf`/`anyOf` using the same rules as Cloudflare
4. Merging create (POST) and update (PATCH/PUT) properties for GlobalArgsSchema

### Create-only property detection

Properties present in POST but absent from PATCH/PUT are flagged as
`createOnlyProperties`, same as Cloudflare.

### Create-required properties

Method runs validate `GlobalArgsSchema` with `.partial()`, but swamp checks the
full schema in two places: `swamp model create` with any `--global-arg`, and
`swamp workflow validate` for steps that name a model type rather than a
definition. A field marked required there therefore blocks a model configured
for `get`, `lookup` or `sync` — before this rule, `projects/env` with only
`idOrName` and `name` was rejected until callers passed placeholder `key`,
`type` and `value` values.

So no resource property is required in `GlobalArgsSchema`. The create body's
required list becomes `createRequiredProperties` (limited to properties the body
actually defines, since the flattened schema's required list is not filtered
against them, and excluding parent path params, which are emitted separately).
As with Cloudflare, nothing else stays required: no non-create method reads a
resource property from globalArgs as required — parent params and team scope
args have their own lines, and the naming field falls back when unset. Parent
params and the synthetic `name` stay required.

- **`create`** throws `create requires global arguments: <names>` before any API
  call when one of them is unset.
- **`PUT` update** fills every create-required field in the update body from the
  live resource (see below), even when the response describes it with a
  different shape, and throws `update requires global arguments: <names>` before
  the `PUT` when one is missing from the live resource too. A create-required
  value echoed from `GET` can still be shaped differently from the request body;
  set the field explicitly if Vercel rejects it. A create-required field named
  like a secret is never filled (see below), so a `PUT` update that leaves it
  unset always throws rather than clearing it.
- **`PATCH` update** sends only the fields set in globalArgs, as before.

### PUT updates keep unset fields

A PUT update clears whatever its body leaves out. When any update-body field is
unset in globalArgs, the generated `update` reads the live resource once with
`GET` (unwrapping the response envelope as `get` does) and copies those fields
from it, so an unset field keeps its current value. The `GET` is skipped when
globalArgs set every such field. The read reuses the update endpoint, so it is
only emitted when the resource has an individual read at the same base path.
Stored state is not used, since it can be stale. PATCH updates send only the
fields set in globalArgs.

Which fields are copied is decided at generation time by `liveFillFields` in
`codegen/shared/liveFill.ts`: a field is filled only when the `GET` response
describes it with the same shape as the request body (same type, with integer
and number treated alike, recursively for array items and shared object
properties). A field the response shapes differently, such as a nested object
where the request takes a slug, or one the response lacks, is never echoed back
and is sent only when set. A field whose own description marks it output-only or
read-only is not filled either, and neither is a field named like a secret
(`secret`, `password`, `token`, `api_key`, `private_key`, `credential` and
similar), even when it is create-required: an API that returns it masked would
have the mask written over the real value. Such fields, and write-only fields
that never come back from `GET`, must be set explicitly. A `null` live value is
not copied.

---

## 7. Response Handling

### No response envelope

Unlike Cloudflare's `{success, errors, result}` envelope, Vercel returns
resources directly in API responses. The lib file does not need an `unwrap()`
function.

For list endpoints, Vercel uses pagination wrappers with the resource array at a
known key (varies per endpoint — e.g., `projects`, `deployments`, `records`).

### Error handling

Non-2xx responses include an `error` object:

```json
{
  "error": {
    "code": "forbidden",
    "message": "You do not have permission to access this resource."
  }
}
```

The lib checks for non-OK status and extracts error details.

---

## 8. Identifying Field Resolution

### Mixed identifier types

Vercel uses string identifiers for most resources, but with a notable pattern:
many endpoints accept `{idOrName}` — either the resource ID or its display name.
The pipeline maps path parameters to response fields:

| Path parameter | Response field | Resources      |
| -------------- | -------------- | -------------- |
| `{idOrName}`   | `id`           | Projects       |
| `{id}`         | `id`           | Most resources |
| `{domain}`     | `name`         | Domains        |
| `{idOrUrl}`    | `id`           | Deployments    |
| `{recordId}`   | `id`           | DNS records    |

### IDENTIFIER_MAP

A mapping table resolves path parameter names to response field names. The
`{idOrName}` pattern means the `get` and `delete` methods can accept either
form, but the pipeline uses the canonical ID field from responses.

### Read and list identifiers

A resource's list items can name its ID differently from its read response. A
deployment's get and create responses return `id`, but the `/v7/deployments`
list items used by `lookup` carry only `uid`. The pipeline records both:
`identifyingField` (from the read response) and `listIdentifyingField` (the read
identifier if list items carry it, otherwise `uid` or `id`). When they differ,
the generated `sync` and `update` key on
`existing.<identifyingField> ?? existing.<listIdentifyingField>`, so state
written by `create`, `get`, `adopt` or `lookup` can all be synced, and `lookup`
names an instance by the list identifier (swamp-club #2843).

### Lookup filters

`lookup` lists the resource and keeps the items whose fields equal every set
global argument. When the pipeline can identify the list item schema (the
response array named after the list path's last segment, or its only array of
objects — the same array the runtime `listAll` reads), a filter is emitted only
if list items can match it:

- the same field name;
- the read identifier, compared against the list identifier (deployments: `id`
  -> `uid`);
- `<arg>Id` (deployments: `project` -> `projectId`).

Other arguments, such as create-only fields (`gitAccessToken`, `buildMachine`),
are not filters, since items never carry them and a set value would make every
lookup fail. When the item schema cannot be identified, every argument stays a
filter. `lookup` still requires exactly one match. A remapped filter's no-match
error names the argument that was set and the field it was compared against
(`project="my-app" (matched against projectId)`): `project` also accepts a
project name, which never equals an item's `projectId`.

### Sensitive fields

A top-level request-body field is emitted with `.meta({ sensitive: true })` in
`GlobalArgsSchema` and `InputsSchema` when the spec marks it `writeOnly` or
`format: password`, when it is a string whose name ends in `secret`, `password`,
`token`, `credential(s)`, `privatekey` or `apikey` (the tailscale pipeline's
rule), or when it is listed in `SENSITIVE_FIELDS` (`importKey`, a KMS issuer's
PEM-encoded private key). Sensitive fields are never `lookup` filters, so a
no-match error cannot print them.

**Known gap:** only top-level fields are inspected. Nested secrets — notably the
drains model's `delivery.secret` — are not marked sensitive, because no
generator in this repository emits sensitive meta on nested fields yet and swamp
core's handling of it is unconfirmed.

---

## 9. Authentication

Vercel uses a single authentication method: **Bearer token**.

### Token resolution

```
Authorization: Bearer <token>
```

Token is resolved from:

1. `globalArgs.token` (vault-wireable, sensitive)
2. `VERCEL_TOKEN` environment variable

```typescript
const GlobalArgsSchema = z.object({
  token: z.string().optional().meta({ sensitive: true })
    .describe("Vercel API token (overrides VERCEL_TOKEN env var)"),
  // ...
});
```

A resource property named `token` would be exposed as `resourceToken`, the same
rule as for `slug` (see "Resource properties named like a team scope or auth
arg"); none does today.

---

## 10. Pagination

Vercel uses cursor-based pagination with varying parameter names across
endpoints.

### Common patterns

**`until`/`since` style** (deployments, events):

```
GET /v7/deployments?until=1234567890123&limit=100
```

**`next` cursor style** (newer endpoints):

```
GET /v10/projects?next=cursor_token&limit=20
```

### Pagination detection

The pipeline detects pagination style from query parameters defined in the spec.
The `listAll()` helper supports both styles, determined per-resource at
generation time.

---

## 11. Rate Limiting

Vercel enforces rate limits. The shared lib handles 429 responses with retry
logic identical to Cloudflare:

- Respects `Retry-After` header when present
- Falls back to exponential backoff
- Maximum 3 retries

---

## 12. Generated Output Structure

```
model/vercel/{service}/
├── manifest.yaml
├── deno.json
├── deno.lock
├── README.md
├── LICENSE.txt
└── extensions/
    └── models/
        ├── _lib/
        │   └── vercel.ts
        ├── {resource}.ts
        └── ...
```

### Model export shape

```typescript
export const model = {
  type: "@swamp/vercel/{service}/{resource}",
  version: "2026.08.01.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "...",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: { ... },
    get: { ... },
    lookup: { ... },
    adopt: { ... },
    update: { ... },    // if PATCH/PUT exists
    delete: { ... },    // if DELETE exists
    sync: { ... },
  },
};
```

---

## 13. Differences from Other Providers

| Aspect              | Vercel                           | Cloudflare                   | DigitalOcean            | Hetzner             |
| ------------------- | -------------------------------- | ---------------------------- | ----------------------- | ------------------- |
| Schema format       | OpenAPI 3.0.3 JSON               | OpenAPI 3.0.3 JSON           | OpenAPI 3.0 YAML        | OpenAPI 3.0 JSON    |
| Schema quality      | Many inline schemas, some errors | Good `$ref` usage            | Good `$ref` usage       | Clean               |
| Package layout      | Per-service (~30)                | Per-service (~93)            | Single package          | Single package      |
| Scoping             | Team via query params            | Account/Zone via path prefix | None                    | None                |
| Response envelope   | None (direct)                    | Fixed `result` key           | Resource-name-keyed     | Resource-name-keyed |
| Identifier type     | String (id, uid, name)           | 32-char hex string           | Mixed (int, name, etc.) | Numeric `id`        |
| `{idOrName}` params | Yes (common)                     | No                           | No                      | No                  |
| Versioning          | Per-operation in path            | Single v4 base URL           | v1 base URL             | v2 base URL         |
| Auth                | Bearer token only                | Bearer OR API key+email      | Bearer token            | Bearer token        |
| Pagination          | cursor (until/since/next)        | page + cursor                | Page-based              | Page-based          |
| Rate limiting       | 429 retry                        | 429 retry                    | Not handled             | Not handled         |
