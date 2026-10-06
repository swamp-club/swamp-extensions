# Tailscale Provider Design

## 1. Purpose

Clover's Tailscale provider reads the Tailscale public OpenAPI 3.1 spec and
generates a set of swamp extension models — one per manageable Tailscale
resource. Each model is a self-contained TypeScript file that exports a `model`
object with Zod schemas and lifecycle methods. A shared `_lib/tailscale.ts` file
provides the HTTP client, authentication (API key or OAuth client), tailnet
scoping, and response unwrapping.

The Tailscale API is small (60 paths) but structurally unlike the other
providers: about a third of it is **settings-style** state that always exists
and has no create or delete, and many resources are created under one path and
read or deleted under another. Where a modelling decision is not dictated by the
spec, this provider follows the
[Tailscale Terraform provider](https://github.com/tailscale/terraform-provider-tailscale),
so users moving from Terraform find the same resource boundaries and destroy
semantics.

**Output**: `model/tailscale/` — a single package (like DigitalOcean and
Hetzner), containing:

- `extensions/models/*.ts` — one file per resource
- `extensions/models/_lib/tailscale.ts` — shared HTTP helpers
- `manifest.yaml` — extension package manifest (`@swamp/tailscale`)

A `.ts` file directly under `extensions/models/` that generation no longer
produces (the spec dropped the resource) is deleted on each run
(`pruneOrphanModels` in `codegen/commands/generate.ts`). Pruning is skipped when
generation reports errors, so a model that failed to generate keeps its last
good file.

**How to run**:

```sh
deno task fetch-schema:tailscale   # download + dereference the OpenAPI spec
deno task generate:tailscale       # generate models from the local spec
```

---

## 2. Schema Source

The spec is served by the API itself:

```
https://api.tailscale.com/api/v2?outputOpenapiSchema=true
```

It is YAML. Like DigitalOcean, it is dereferenced with
`@apidevtools/json-schema-ref-parser` and serialized with
`serializeWithCycleDetection()` to `codegen/schemas/tailscale.json`.

### Spec characteristics

| Metric            | Value                                        |
| ----------------- | -------------------------------------------- |
| OpenAPI version   | 3.1.0                                        |
| Total paths       | 60                                           |
| Total operations  | 93                                           |
| Component schemas | 43                                           |
| `$ref` references | 486                                          |
| Tags              | 15                                           |
| Content types     | `application/json`, `application/hujson`     |
| Composition       | 1 `oneOf`, 7 `anyOf`, 1 `allOf`              |
| Vendor extensions | `x-displayName`, `x-badges`, `x-codeSamples` |

### OpenAPI 3.1

The other pipelines consume OpenAPI 3.0. The 3.1 features that would change
schema handling — `type: [T, "null"]` arrays in place of `nullable` — do not
occur in the current spec. `normalizeProperty()` still accepts a type array
(taking the first non-null member and marking the property nullable) so a future
spec revision does not break generation.

### Spec stability

The spec's own description warns that it "is unstable. It may change or break
without notice." The endpoints themselves are stable. The pipeline therefore
fails loudly on structural surprises (a configured path missing, a tag with no
mapping) rather than silently dropping models, and the nightly regeneration step
isolates a Tailscale failure from the other providers (see §13).

---

## 3. Tailnet Scoping

Most endpoints are scoped by a `{tailnet}` path segment
(`/tailnet/{tailnet}/keys`). The special value `-` means "the tailnet of the
credential in use", which is what almost every caller wants.

`tailnet` is a global argument on every tailnet-scoped model, resolved as:

1. `globalArgs.tailnet`
2. `TAILSCALE_TAILNET` environment variable
3. `-`

Resources read or deleted by their own ID (`/webhooks/{endpointId}`,
`/device/{deviceId}`) need no tailnet; the shared lib substitutes it only into
paths that contain `{tailnet}`.

---

## 4. Resource Discovery

DigitalOcean's base+ID path pairing does not work here: a webhook is created at
`POST /tailnet/{tailnet}/webhooks` but read at `GET /webhooks/{endpointId}`.
Resources are instead declared in a **resource table** in `pipeline.ts` (in the
spirit of Vercel's `MANUAL_RESOURCES`), and the pipeline resolves each entry's
operations, request bodies and response schemas from the spec. Every path the
table names must exist in the spec, or generation fails for that model.

Each entry has one of four **kinds**, which select the generated method set:

| Kind         | Methods                                                                  | Meaning                                                     |
| ------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `collection` | `create`, `get`, `update`?, `delete`, `sync`, `list`, `lookup`?, `adopt` | Ordinary CRUD resource with a server-assigned ID            |
| `keyed`      | `create`, `get`, `update`, `delete`, `sync`, `list`                      | Upserted under a caller-chosen key (service name, log type) |
| `settings`   | `create`, `get`, `update`, `delete`, `sync`                              | Always exists; create and update both apply desired state   |
| `observed`   | `get`, `delete`?, `list`, `adopt`, actions                               | Created outside the API (devices, users); read and adopt    |

`?` marks a method generated only when the API supports it: `update` needs an
update endpoint, `delete` a delete endpoint, and `lookup` a name field that is
unique within the tailnet.

Method names, arguments and state handling follow the Hetzner generator, which
is the closest existing match (it already generates models with no `create`,
such as `images` and `datacenters`):

- `create`, `update` and `sync` take no arguments and work from global arguments
  and the stored state.
- `get`, `delete` and `adopt` take the resource's ID as an argument. A
  `collection` model's `delete` defaults to the stored ID; given another
  resource's ID, it records that deletion under `item-<id>` (the instance `get`
  and `list` write that resource to), leaving the stored resource tracked.
  `keyed` and `settings` models take no arguments at all: their key (a service
  name, a log type, a device ID) is a required global argument.
- `observed` models have no `sync`, as Hetzner's create-less models have none:
  with no global argument naming the resource, `get` with an ID does the same
  job.
- `collection` models write state under an instance-name global argument
  (`name`, or `instanceName` when the API body has its own `name` field, as for
  OAuth apps), never under the resource's own name, so renaming a resource with
  `update` keeps finding its state. `create` refuses when that instance already
  tracks a live resource, so a credential is never orphaned; a deleted, missing,
  revoked or invalid resource does not block it. `list` writes each item as
  `item-<id>`, so it never overwrites the tracked instance, and `get` with
  another resource's ID does the same (`adopt` is how a definition re-targets).
- `observed` models (devices, users) write state under the resource's ID, which
  never changes, rather than its name, which `set_name` can.
- Settings models write state under a fixed instance name: `current`, or the
  device ID, posture attribute or split-DNS domain they manage.
- Actions on an `observed` resource re-read it and write it to state; other
  actions return the API response as the method result.
- `list` writes one state instance per item and returns a count.
- `lookup` finds a single item by name in `list` output and fails if there are
  none or several.
- Every method writes state with `context.writeResource()`; `update` and `sync`
  read the stored state with `context.dataRepository.getContent()`.

A `deviceFacet` entry is a `settings` entry whose key is a `deviceId` global
argument rather than the tailnet (§6).

### Coverage

Of the 93 operations, everything except the following is generated:

| Skipped                                                | Reason                                                                                                                        |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `GET /tailnet/{tailnet}/logging/configuration`         | Audit log query — data, not a managed resource                                                                                |
| `GET /tailnet/{tailnet}/logging/network`               | Network flow log query — data, not a managed resource                                                                         |
| `GET .../logging/{logType}/stream/status`              | Runtime telemetry; not desired state                                                                                          |
| `POST /tailnet/{tailnet}/aws-external-id` (+ validate) | Helper for log-stream S3 role setup                                                                                           |
| `POST /device-invites/-/accept`                        | Runs as the invitee, not the tailnet owner                                                                                    |
| `PATCH /tailnet/{tailnet}/device-attributes`           | Bulk form of the per-device posture attribute endpoints                                                                       |
| `GET`/`POST /organizations/{organization}/tailnets`    | Deferred (§5, "Organization tailnets")                                                                                        |
| `DELETE /tailnet/{tailnet}`                            | Deferred (§5, "Organization tailnets")                                                                                        |
| `PUT /tailnet/{tailnet}/dns/split-dns`                 | Replaces every split-DNS domain; `dns_split_nameservers` patches one and `dns_configuration` replaces the whole configuration |

### Coverage gate

Because resources are declared by hand, a new endpoint Tailscale adds would
otherwise never be generated, and nobody would notice. To stop coverage eroding
silently, the pipeline compares every operation in the spec against the
operations the resource table claims plus the skip list:

- An operation that is neither generated nor skipped is a **generation error**.
- A path the table or the skip list names that is no longer in the spec is also
  a generation error.

A model that fails to resolve keeps its previously generated file and stays in
the manifest, so a failed run cannot quietly unpublish it. Generation still
writes every model it could build, then exits `2` (finished, errors reported).
The nightly regeneration step already treats exit `2` as "keep the output, fail
the run" (§13), so the regeneration PR is still opened and the failed run flags
the endpoints that need a table or skip-list entry.

---

## 5. Models

### `collection`

| Model                 | Create                                         | Read / Update / Delete                            | Notes                                    |
| --------------------- | ---------------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| `tailnet_key`         | `POST /tailnet/{tailnet}/keys`                 | `GET`/—/`DELETE /tailnet/{tailnet}/keys/{keyId}`  | `keyType: auth`; no `update` (see below) |
| `oauth_client`        | `POST /tailnet/{tailnet}/keys`                 | `GET`/`PUT`/`DELETE .../keys/{keyId}`             | `keyType: client`                        |
| `federated_identity`  | `POST /tailnet/{tailnet}/keys`                 | `GET`/`PUT`/`DELETE .../keys/{keyId}`             | `keyType: federated`                     |
| `webhook`             | `POST /tailnet/{tailnet}/webhooks`             | `GET`/`PATCH`/`DELETE /webhooks/{endpointId}`     | actions: `test`, `rotate_secret`         |
| `posture_integration` | `POST /tailnet/{tailnet}/posture/integrations` | `GET`/`PATCH`/`DELETE /posture/integrations/{id}` |                                          |
| `oauth_app`           | `POST /tailnet/{tailnet}/oauth-apps`           | `GET`/`PUT`/`DELETE .../oauth-apps/{appId}`       |                                          |
| `user_invite`         | `POST /tailnet/{tailnet}/user-invites`         | `GET`/—/`DELETE /user-invites/{userInviteId}`     | action: `resend`                         |
| `device_invite`       | `POST /device/{deviceId}/device-invites`       | `GET`/—/`DELETE /device-invites/{deviceInviteId}` | parent `deviceId`; action: `resend`      |

#### Splitting `/keys` by `keyType`

`/tailnet/{tailnet}/keys` serves four key types, selected by the `keyType` field
(`auth`, `client`, `federated`, `api`), with different fields for each. One
model over all of them would expose every field to every type. Following
Terraform, the pipeline generates one model per creatable type, each with
`keyType` fixed and only that branch's fields. `api` keys cannot be created
through the API and are not modelled.

#### Auth keys cannot be updated

`tailnet_key` (auth keys) has no update endpoint: `PUT .../keys/{keyId}` accepts
only `client` and `federated` keys. Terraform replaces the key whenever any
field changes, but swamp has no replace step, so the generated model has no
`update` method at all, as other generators do for resources without an update
endpoint. To change an auth key, delete it and create a new one; the model's
description says so. `sync` reports the key's `invalid` and `expires` fields, so
an expired or used-up key is visible.

### `keyed`

| Model        | Key           | Upsert                                            | Delete             |
| ------------ | ------------- | ------------------------------------------------- | ------------------ |
| `service`    | `serviceName` | `PUT /tailnet/{tailnet}/services/{serviceName}`   | `DELETE` same path |
| `log_stream` | `logType`     | `PUT /tailnet/{tailnet}/logging/{logType}/stream` | `DELETE` same path |

Both upsert with `PUT`, which silently replaces whatever is already at that key.
So `create` first reads the key and **fails if something already exists there**,
telling the user to `adopt` it instead. `update` sends the `PUT` without that
check.

The check is advisory, not a lock. The `PUT` is an unconditional upsert and the
API offers no conditional guard for it, so two concurrent `create` calls for the
same key can both find nothing there and both write; the later write wins. This
is accepted: keyed resources are configured, not raced, and the check exists to
stop a `create` from silently replacing something already in place.

`service` also gets `list_devices`, `get_device_approval` and
`set_device_approval` methods for its `devices` and `device/{deviceId}/approved`
sub-paths.

### Organization tailnets (deferred)

`POST /organizations/{organization}/tailnets` creates an API-only tailnet, but
it does not fit a model yet, so it is left out of the first version:

- There is no endpoint that reads a single tailnet, only a paginated list.
- `DELETE /tailnet/{tailnet}` needs an access token **for the tailnet being
  deleted**. That means exchanging either the OAuth client returned when the
  tailnet was created (whose secret is returned only once) or an `all`-scope
  OAuth client from the creating tailnet. The lib would need to manage
  credentials for a second tailnet.
- Plans are capped at 10 tailnets, so this is a niche use.

These operations are in the skip list, so the coverage gate stays green. Adding
the model later needs a per-tailnet credential design.

### `settings`

| Model                   | Read                        | Apply                                        | Delete                                    |
| ----------------------- | --------------------------- | -------------------------------------------- | ----------------------------------------- |
| `tailnet_settings`      | `GET .../settings`          | `PATCH .../settings`                         | No-op, with a warning                     |
| `contacts`              | `GET .../contacts`          | `PATCH .../contacts/{type}` per contact type | No-op, with a warning                     |
| `policy_file`           | `GET .../acl`               | `POST .../acl`                               | No-op unless `resetOnDelete` (§7)         |
| `dns_configuration`     | `GET .../dns/configuration` | `POST .../dns/configuration`                 | Clear (empty configuration)               |
| `dns_nameservers`       | `GET .../dns/nameservers`   | `POST .../dns/nameservers`                   | Clear (empty list)                        |
| `dns_preferences`       | `GET .../dns/preferences`   | `POST .../dns/preferences`                   | Clear (MagicDNS off)                      |
| `dns_search_paths`      | `GET .../dns/searchpaths`   | `POST .../dns/searchpaths`                   | Clear (empty list)                        |
| `dns_split_nameservers` | `GET .../dns/split-dns`     | `PATCH .../dns/split-dns` (one domain)       | `PATCH {domain: null}` (that domain only) |

`contacts` also gets a `resend_verification_email` action.

### `observed`

| Model    | Read                     | Delete                        | Actions                                     |
| -------- | ------------------------ | ----------------------------- | ------------------------------------------- |
| `device` | `GET /device/{deviceId}` | `DELETE /device/{deviceId}`   | `expire`, `set_name`, `set_ipv4_address`    |
| `user`   | `GET /users/{userId}`    | `POST /users/{userId}/delete` | `set_role`, `approve`, `suspend`, `restore` |

Devices join a tailnet through an auth key and users through sign-in, so neither
can be created through the API. Both are found with `list` over the tailnet's
list endpoint (`/tailnet/{tailnet}/devices`, `/tailnet/{tailnet}/users`) and
adopted by ID. There is no `lookup`, because neither has a name that is unique
within the tailnet: hostnames repeat, and a user's login name can be reused
after deletion. As in Hetzner's `images` and `datacenters`, the generated model
simply omits `create`.

---

## 6. Device Facets

Device configuration that is desired state, not a one-off action, is generated
as separate **facet models**, each keyed by a required `deviceId` global
argument. This mirrors Terraform's `tailscale_device_*` resources and gives each
facet a well-defined delete.

| Model                      | Apply                                               | Delete                     |
| -------------------------- | --------------------------------------------------- | -------------------------- |
| `device_tags`              | `POST /device/{deviceId}/tags`                      | Set tags to `[]`           |
| `device_subnet_routes`     | `POST /device/{deviceId}/routes`                    | Set enabled routes to `[]` |
| `device_key`               | `POST /device/{deviceId}/key`                       | Re-enable key expiry       |
| `device_authorization`     | `POST /device/{deviceId}/authorized`                | No-op, with a warning      |
| `device_posture_attribute` | `POST /device/{deviceId}/attributes/{attributeKey}` | `DELETE` same path         |

`device_authorization` delete leaves the device authorized, as Terraform does.
Terraform made that choice when the API could not de-authorize a device, and
kept it for compatibility. The API can now de-authorize (`authorized: false`),
and a user who wants that can set it through `update` before deleting the model.

Each device facet requires its value: an unset `tags` or `routes` would
otherwise be sent as an empty body and clear every tag or route.

Two models managing the same facet of the same device will fight; facet models
do not lock. Model descriptions say so.

---

## 7. Settings Semantics

A settings resource always exists, so `create` and `update` both send the
desired state and `delete` cannot remove it. What `delete` does is chosen per
resource, matching Terraform:

- **Clear** where an empty value is a valid, well-understood state (the DNS
  models, and every device facet except `device_authorization`).
- **No-op with a warning** where there is no published default to return to
  (`tailnet_settings`, `contacts`), or where Terraform chose not to change
  anything (`device_authorization`). Swamp forgets the resource; Tailscale keeps
  the values. The warning, logged with `context.logger.warning()` as
  hand-written extensions in this repo do, tells the user so.
- **Opt-in reset** for the policy file, where clearing would wipe a tailnet's
  entire access control.

### DNS overlap

`dns_configuration` manages all DNS settings at once and overlaps the four
granular DNS models. All five are generated (as in Terraform) so the granular
models remain available — `dns_split_nameservers` in particular lets separate
definitions each own one split-DNS domain. Every DNS model's description states
that `dns_configuration` must not be combined with the granular models on the
same tailnet.

### Policy file

The policy file (ACL) is HuJSON — JSON with comments and trailing commas — so it
is a `string` property (`policy`) passed through verbatim, never parsed into a
schema. Writes send `Content-Type: application/hujson`. Reads must send
`Accept: application/hujson`: without it the API returns the policy as plain
JSON, and the comments and formatting are lost.

Updates are guarded with ETags:

- `get` records the response `ETag` in state.
- `create` sends `If-Match: "ts-default"` unless `overwriteExistingContent` is
  set, so it succeeds only if the tailnet still has the default policy and
  refuses to silently overwrite a hand-edited one. A `412` is reported with
  instructions to adopt the policy or set `overwriteExistingContent`.
- `update` sends the stored `ETag`, so a policy changed elsewhere since the last
  `get`/`sync` is not overwritten. With no stored `ETag` (after a `delete`, for
  example) it refuses rather than writing unguarded.
- `delete` does nothing unless `resetOnDelete` is set, in which case it posts an
  empty policy, which Tailscale resets to the default.

`preview` and `validate` methods wrap `POST .../acl/preview` and
`POST .../acl/validate`.

This model is generated from a dedicated template in
`extensionModelGenerator.ts` rather than the generic `settings` template,
because of the content type and ETag handling.

---

## 8. Identifying Fields

| Path parameter     | Response field | Models                                              |
| ------------------ | -------------- | --------------------------------------------------- |
| `{keyId}`          | `id`           | `tailnet_key`, `oauth_client`, `federated_identity` |
| `{endpointId}`     | `endpointId`   | `webhook`                                           |
| `{id}`             | `id`           | `posture_integration`                               |
| `{appId}`          | `id`           | `oauth_app`                                         |
| `{userInviteId}`   | `id`           | `user_invite`                                       |
| `{deviceInviteId}` | `id`           | `device_invite`                                     |
| `{deviceId}`       | `nodeId`       | `device` (accepts legacy `id` too)                  |
| `{userId}`         | `id`           | `user`                                              |
| `{serviceName}`    | `name`         | `service`                                           |

---

## 9. Response Shapes

Single resources are returned unwrapped. List responses are wrapped in a key
named after the resource, not a fixed envelope:

| List endpoint                             | Wrapper key    |
| ----------------------------------------- | -------------- |
| `/tailnet/{tailnet}/devices`              | `devices`      |
| `/tailnet/{tailnet}/keys`                 | `keys`         |
| `/tailnet/{tailnet}/users`                | `users`        |
| `/tailnet/{tailnet}/webhooks`             | `webhooks`     |
| `/tailnet/{tailnet}/posture/integrations` | `integrations` |
| `/tailnet/{tailnet}/services`             | `vipServices`  |
| `/tailnet/{tailnet}/oauth-apps`           | `oauthApps`    |
| `/tailnet/{tailnet}/user-invites`         | (bare array)   |
| `/device/{deviceId}/device-invites`       | (bare array)   |

The pipeline detects the wrapper key at generation time from the list response
schema (the single array-typed property) and bakes it into the model. A list
schema with no array property, or more than one, is a generation error for that
model.

### Pagination

None of the generated list endpoints paginate; each returns everything in one
response. (The only paginated endpoint, the organization tailnet list, is
deferred.)

### One-time secrets

Some values are returned only once, by `create` or a rotate action:

- an auth key's `key`
- an OAuth client's or federated identity's `key` (the client secret)
- a webhook's `secret`
- an OAuth app's `clientSecret`

Every method writes state with `context.writeResource()`, which replaces the
whole instance. If these values lived in the `state` resource, the next `get` or
`sync` would overwrite them with the empty value the API now returns.

So models with a one-time secret declare a second resource, `secret`, alongside
`state`. Swamp requires instance names to be unique across a model's resources,
so the secret is written as `secret-<name>`.

Swamp methods return only data handles, so an action whose response carries data
(policy `preview` and `validate`, service `list_devices` and the device approval
methods) writes it to a third resource, `result`, as `result-<action>` (prefixed
with the instance or key for factory models). Actions that return nothing write
no data. Its fields are marked `.meta({ sensitive: true })`, so swamp stores
them in a vault and keeps only vault references. Only `create` and the rotate
action write `secret`; `get`, `sync`, `list` and `adopt` write only `state`. The
same fields are removed from the `state` schema. An adopted resource has no
`secret` instance, which is correct: the secret can't be recovered.

Which fields are one-time is declared per entry in the resource table, not
guessed: the spec says so only in prose ("only populated at creation time").

Secrets the user supplies, rather than receives, are global arguments marked
`sensitive` so they can be wired from a vault. Examples are a posture
integration's `clientSecret` (`writeOnly` in the spec) and log stream
credentials (`token`, `s3SecretAccessKey`, `gcsCredentials`). They are never
written to state.

---

## 10. Authentication

Credentials are resolved in this order; supplying an API key together with OAuth
client settings is an error (as in Terraform):

| Method       | Global args                                         | Environment variables                                        |
| ------------ | --------------------------------------------------- | ------------------------------------------------------------ |
| API key      | `apiKey`                                            | `TAILSCALE_API_KEY`                                          |
| OAuth client | `oauthClientId`, `oauthClientSecret`, `oauthScopes` | `TAILSCALE_OAUTH_CLIENT_ID`, `TAILSCALE_OAUTH_CLIENT_SECRET` |

All credential args are vault-wireable and `sensitive`. An API key is sent as
`Authorization: Bearer <key>`. OAuth client credentials are exchanged with a
`client_credentials` grant at `POST /api/v2/oauth/token` for a short-lived
access token, which the lib caches until shortly before expiry. The cache key
includes a hash of the client secret, so a rotated secret gets a new token, and
a `401` drops the cached token and retries once. The token endpoint is not in
the OpenAPI spec, so the shared lib implements it directly.

The shared lib's source is `codegen/tailscale/runtime/tailscale.ts`, a real
module that codegen type-checks, lints and tests. `libGenerator.ts` copies it
into each generation under the copyright header, rather than building it in a
template string as the other providers do.

Path parameters are escaped like Go's `url.PathEscape`: `:` and `@` stay as they
are, so service names such as `svc:web` reach the API unencoded. A value of `.`
or `..` is rejected, since URL parsing would collapse it and send the request
elsewhere.

`baseUrl` (`TAILSCALE_BASE_URL`, default `https://api.tailscale.com`) allows
tests and self-hosted control planes to redirect requests.

Workload identity federation (identity tokens, audience discovery on GitHub
Actions, AWS and GCP) is not supported yet; the `federated_identity` model can
still create federated identities for other systems to use.

---

## 11. Errors and Rate Limiting

Errors are JSON `{ "message": "..." }`; the lib raises an error with the HTTP
status and message. `404` from `get` marks the resource as gone. `429` responses
are retried with `Retry-After` or exponential backoff, up to 3 times and at most
60 seconds per wait, as in the Vercel and Cloudflare libs. Each request is
aborted after 60 seconds. The OAuth token request is retried the same way.

---

## 12. Testing

No test talks to the live Tailscale API. Tests follow the Hetzner layout in
`codegen/hetzner/`:

- **`testFixtures.ts`** — a trimmed, already-dereferenced spec covering one
  model of each kind, shared by the tests below.
- **`pipeline_test.ts`** — runs the pipeline over the fixture spec. It covers:
  - each resource kind resolving to the right operations
  - splitting `/keys` by `keyType`
  - detecting list wrapper keys
  - the coverage gate: an unclaimed operation, and a claimed path that has
    disappeared from the spec, each produce a generation error
- **`extensionModelGenerator_test.ts`** — snapshot tests of one generated model
  per kind and of the special-cased settings models (`policy_file`,
  `dns_split_nameservers`), with the copyright header stripped so the year does
  not churn them, plus a check that the lib is copied from the runtime module.
  The runtime module itself is exercised by the integration test.
- **`integration_test.ts`** — loads the generated lib and models and runs them
  against a mock Tailscale API on `Deno.serve({ port: 0 })`, pointed at by
  `baseUrl`. Its cases:
  - **Auth:** API key sent as bearer; OAuth client exchanged at
    `/api/v2/oauth/token` and the token cached; API key plus OAuth settings
    rejected.
  - **Tailnet:** `-` substituted when unset, `TAILSCALE_TAILNET` honoured.
  - **Policy file:** `create` sends `If-Match: "ts-default"` and reports a
    `412`; `update` sends the stored ETag; reads send
    `Accept: application/hujson`; `resetOnDelete` posts an empty policy.
  - **Delete semantics:** a no-op delete makes no request and logs a warning;
    the DNS models clear.
  - **One-time secrets:** `create` writes the `secret` resource and a later
    `get` does not touch it.
  - **Keyed upserts:** `create` refuses when the key already exists.
  - **Retries:** `429` is retried, honouring `Retry-After`.

The integration test needs `sanitizeResources: false`, with a comment, as
Hetzner's does.

### Live verification

The models were run through swamp against a real test tailnet (API-key auth).
Confirmed behaviour:

- List items from `GET .../keys?all=true` carry `keyType`, so the per-type list
  filter works; the API key in use is not listed by `tailnet_key`.
- Deleting an auth key revokes it. `GET` by ID still answers 200 with `revoked`
  and `invalid: true`, and the key drops out of the list.
- One-time secrets land in the `secret` resource as vault references; `sync`
  leaves them untouched and `rotate_secret` writes a new version.
- The policy file round-trips as HuJSON with comments and an ETag (a content
  hash, unchanged by an identical write). `If-Match: "ts-default"` succeeds on a
  never-edited policy.
- Clearing `dns_nameservers` and `dns_search_paths` returns the tailnet to its
  previous DNS configuration; setting nameservers also turns on
  `overrideLocalDNS`, which clearing reverts.
- `GET .../dns/configuration` omits empty fields rather than returning empty
  lists.
- Swamp rejects a method that writes the same instance name to two resources,
  hence the `secret-` and `result-` prefixes.
- After `delete`, swamp refuses any method but `create` for that instance, so a
  settings model that was deleted is managed again with `create`, not `get`.

Not yet exercised live: OAuth client auth, device facets (the test tailnet had
no devices), services, log streams, posture integrations, OAuth apps and
invites.

---

## 13. Nightly Regeneration and CI

Tailscale is wired into the same automation as the other providers:

- `codegen/deno.json`: `fetch-schema:tailscale` and `generate:tailscale` tasks
- `codegen/commands/fetchSchema.ts` and `generate.ts`: a `tailscale` case
- `.forgejo/workflows/regenerate-models.yml`: a "Fetch and generate Tailscale
  models" step (with `continue-on-error`, discarding `model/tailscale` on a
  crash), the `tailscale` dispatch option, the change summary, the PR body and
  the final failure gate
- `.forgejo/workflows/full-model-check.yml`: `tailscale` in the single-package
  matrix alongside `hetzner-cloud` and `digitalocean`
- `verification/checks.yaml`: a `model/tailscale` entry using `*single-dir`

verify-build's codegen idempotency check also generates Tailscale from the live
spec, but tolerates exit `2` there: it checks only that generation is
deterministic, so a new Tailscale endpoint must not fail unrelated PRs.

The coverage gate (§4) makes the nightly run the place where new Tailscale
endpoints surface: an unclaimed operation fails the Tailscale step with exit
`2`. The regenerated models are still kept and the PR still opens, while the
failed run names the operations to add to the resource table or skip list.

---

## 14. Differences from Other Providers

| Aspect                | Tailscale                               | DigitalOcean         | Vercel                    |
| --------------------- | --------------------------------------- | -------------------- | ------------------------- |
| Schema format         | OpenAPI 3.1 YAML                        | OpenAPI 3.0 YAML     | OpenAPI 3.0.3 JSON        |
| Package layout        | Single package                          | Single package       | Per-service (~30)         |
| Discovery             | Declared resource table + coverage gate | Base+ID path pairing | Tags + manual resources   |
| Scoping               | `{tailnet}` path segment, default `-`   | None                 | Team via query params     |
| Settings resources    | Yes (~9), per-resource delete semantics | No                   | No                        |
| Create-less resources | Devices, users                          | No                   | No                        |
| Response envelope     | Per-list wrapper key; singles bare      | Resource-name-keyed  | None                      |
| Non-JSON bodies       | HuJSON policy file                      | No                   | No                        |
| Concurrency guard     | ETag / `If-Match` on policy file        | No                   | No                        |
| Auth                  | API key or OAuth client                 | Bearer token         | Bearer token              |
| One-time secrets      | Separate vaulted `secret` resource      | No                   | No                        |
| Pagination            | None in generated endpoints             | Page-based           | Cursor (until/since/next) |
| Rate limiting         | 429 retry                               | Not handled          | 429 retry                 |
