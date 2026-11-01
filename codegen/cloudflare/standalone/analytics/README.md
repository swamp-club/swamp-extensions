# @swamp/cloudflare/analytics

Query the
[Cloudflare GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/)
from swamp. The `@swamp/cloudflare/analytics/graphql-analytics` model reads
zone-level adaptive datasets such as `httpRequestsAdaptiveGroups`,
`firewallEventsAdaptiveGroups`, `healthCheckEventsAdaptiveGroups`, and
`loadBalancingRequestsAdaptiveGroups`, and stores each result as a resource that
workflows and reports can read.

The model is read-only. It does not create, change, or delete anything in
Cloudflare.

## Installation

```sh
swamp extension pull @swamp/cloudflare/analytics
```

## Authentication

Create a Cloudflare API token that can read analytics for the zone, store it in
a vault, and reference it from the definition along with the zone ID. Never
paste the token into a definition file or a shell command line.

```sh
swamp vault create local_encryption cloudflare --json
echo "$CLOUDFLARE_API_TOKEN" | swamp vault put cloudflare CLOUDFLARE_API_TOKEN --json

swamp model create @swamp/cloudflare/analytics/graphql-analytics analytics \
  --global-arg 'apiToken=${{ vault.get("cloudflare", "CLOUDFLARE_API_TOKEN") }}' \
  --global-arg zone_id=<your-zone-id>
```

`zone_id` is required. Credentials are optional global arguments that take
precedence over the environment, and are flagged sensitive:

- `apiToken` — overrides `CLOUDFLARE_API_TOKEN` (recommended).
- `apiKey` + `email` — override `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL` for
  the legacy key+email auth path. Both are needed for this path.

If both paths are configured, the token is used.

## Methods

### `query`

Runs one query against a dataset and stores the grouped rows. Each row has
`count`, plus `dimensions`, `sum`, and `avg` for the fields you asked for.

| Argument       | Required | Description                                                                                |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| `dataset`      | Yes      | Exact Cloudflare GraphQL node name, such as `httpRequestsAdaptiveGroups`                   |
| `dimensions`   | Yes      | Dimensions to group by; the available ones depend on the dataset. May be empty.            |
| `datetime_geq` | Yes      | Start of the time range, inclusive (ISO 8601)                                              |
| `datetime_lt`  | Yes      | End of the time range, exclusive (ISO 8601)                                                |
| `sumFields`    | No       | Fields to aggregate with sum, returned under `sum`                                         |
| `avgFields`    | No       | Fields to aggregate with avg, returned under `avg`                                         |
| `filters`      | No       | Filter fields in addition to the time range, such as `{"edgeResponseStatus": 200}`         |
| `orderBy`      | No       | Order-by fields, such as `["count_DESC"]`                                                  |
| `limit`        | No       | Maximum grouped rows, 1 to 10000 (default 100)                                             |
| `name`         | No       | Instance name for the stored result (default `current`). Use one per query to keep several |

Structured inputs take the `:json` suffix. This finds the paths that returned
the most 404s over one day:

```sh
swamp model method run analytics query \
  --input dataset=httpRequestsAdaptiveGroups \
  --input 'dimensions:json=["clientRequestPath"]' \
  --input 'filters:json={"edgeResponseStatus":404}' \
  --input 'orderBy:json=["count_DESC"]' \
  --input datetime_geq=2026-07-01T00:00:00Z \
  --input datetime_lt=2026-07-02T00:00:00Z \
  --input limit=20 \
  --input name=top-404s
```

Cloudflare's plan limits apply. Free plans cap each query to a 1-day window and
keep per-client-IP data for about 8 days, and some dimensions need a higher plan
tier.

### `sync`

Re-runs a stored query with the same dataset, dimensions, fields, filters,
ordering, and limit, and replaces the stored result.

| Argument     | Required | Description                                                |
| ------------ | -------- | ---------------------------------------------------------- |
| `identifier` | No       | Instance name of the result to refresh (default `current`) |

```sh
swamp model method run analytics sync --input identifier=top-404s
```

`sync` re-queries the **same fixed time range** as the stored result. It does
not move the window forward, so run `query` with new datetimes to see newer
data. It fails if that instance has no stored result, so run `query` first.

## Results

Both methods write a `result` resource, which keeps the last 10 versions of each
instance. It records the query parameters, `queriedAt`, `rows`, and `rowCount`.

```sh
swamp data get analytics top-404s --json
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
