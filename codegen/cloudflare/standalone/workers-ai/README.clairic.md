# @swamp/cloudflare/clairic

Use Cloudflare's
[Clairic](https://developers.cloudflare.com/workers-ai/models/clairic/)
extraction model from swamp. Clairic is a System One model, not a text
generator: you give it text (and optional images) plus a map of typed fields,
and it returns a typed value for each field. When the input does not determine a
value, Clairic returns `null` instead of guessing, along with its best guess and
the probability that the value is absent.

The `@swamp/cloudflare/clairic/extraction` model calls the Workers AI REST route
`POST /accounts/{account_id}/ai/run/@cf/cloudflare/clairic` and stores the
answers as a resource that workflows can branch on with CEL.

Clairic is in preview on Workers AI. This model passes through answer and field
keys it does not know yet, so additions to the preview API are kept rather than
dropped.

For yes/no, choice, and rubric decisions, see the sibling extension
`@swamp/cloudflare/clef`.

## Installation

```sh
swamp extension pull @swamp/cloudflare/clairic
```

## Authentication

Clairic runs on your Cloudflare account. Create an API token from the
dashboard's Workers AI template (Workers AI Read and Edit), store it in a vault,
and reference it from the definition along with the account ID. Never paste the
token into a definition file or a shell command line.

```sh
swamp vault create local_encryption cloudflare --json
echo "$CLOUDFLARE_API_TOKEN" | swamp vault put cloudflare CLOUDFLARE_API_TOKEN --json

swamp model create @swamp/cloudflare/clairic/extraction clairic \
  --global-arg 'apiToken=${{ vault.get("cloudflare", "CLOUDFLARE_API_TOKEN") }}' \
  --global-arg account_id=<your-account-id>
```

Credentials resolve the same way as the other `@swamp/cloudflare/*` models:

- `apiToken` — overrides `CLOUDFLARE_API_TOKEN` (recommended).
- `apiKey` + `email` — override `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL` for
  the legacy key+email auth path.
- `account_id` — overrides `CLOUDFLARE_ACCOUNT_ID`.

The `credentials-configured` pre-flight check (label `policy`) fails before any
request when credentials or the account ID are missing.

## Usage

Extract fields from an invoice:

```sh
swamp model method run clairic extract \
  --input state="Invoice INV-2291 from Northwind Supply, issued 2026-09-02, net 30. Total due: 1,240.50 USD." \
  --input fields=@fields.json \
  --input name=invoice
```

where `fields.json` is:

```json
{
  "invoice_number": { "type": "text" },
  "issued": { "type": "date" },
  "due": {
    "type": "date",
    "instructions": "Payment due date from the issue date and terms"
  },
  "total": { "type": "number", "decimals": 2, "unit": "USD" },
  "po_number": { "type": "text", "instructions": "Purchase order number" },
  "days_to_pay": { "type": "estimate", "min": 0, "max": 120, "step": 1 }
}
```

`po_number` is not in the text, so its `value` is `null`.

### Field types

| Type       | Value                 | Notable options                                                 |
| ---------- | --------------------- | --------------------------------------------------------------- |
| `text`     | A span of the state   | —                                                               |
| `number`   | A number              | `decimals` (0–6), `unit`, `integer`                             |
| `date`     | An ISO date           | resolve year-less dates with `referenceDate`                    |
| `time`     | A time                | —                                                               |
| `datetime` | A date and time       | —                                                               |
| `duration` | A length of time      | `unit` (seconds … years), `integer`, `decimals`                 |
| `list`     | A list of items       | `items` (required: `text`, `number`, or `date`)                 |
| `estimate` | A distribution        | `min` and `max` (required), `step`, `scale` (`linear` or `log`) |
| `forecast` | One estimate per step | `min` and `max` (required), `horizon` (1–64), `interval`        |

Every field also accepts `instructions` and `null_threshold` (the probability of
null above which the value is null, default 0.5). Field names start with a
letter or `_` and may use letters, digits, `_`, `.` and `-` (max 64 characters).
There is no upper limit on fields: Clairic splits fields that do not fit beside
the state into parallel passes.

### Method arguments

| Argument           | Purpose                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| `state`            | Text to read; may be empty only when images are sent                       |
| `fields`           | Map of field name to field spec                                            |
| `images`           | Up to 4 base64 PNG/JPEG/WebP images (data URLs or `{content_type,base64}`) |
| `referenceDate`    | ISO date (YYYY-MM-DD) that anchors dates written without a year            |
| `includeQuantiles` | Add 99 percentiles to estimate answers                                     |
| `returnStateText`  | Store the text that answer spans index into as `stateText`                 |
| `name`             | Instance suffix (default `latest`)                                         |

Images are limited to 4 MiB each and 8 MiB decoded in total. Stored resources
record only `imageCount`, never the image bytes.

## Stored data and CEL

`extract` writes one `extraction` resource named `extraction-<name>`. It records
`model`, `state`, `fields`, `answers`, `truncated`, `usage`, `extractedAt`, and,
when set, `imageCount`, `referenceDate`, and `stateText`.

Each `answers.<field>` has `type` and `value` (null when undetermined), plus
type-specific detail:

- `text`: `span` (character offsets), `guess`, `p_null`, `confidence`
- `number`, `date`: `guess`, `p_null`, `confidence`
- `list`: `spans`, `confidence`
- `estimate`: `mean`, `median`, `p10`, `p90`, `p_below`, `p_above`, and
  `quantiles` when requested
- `forecast`: `steps`, one estimate per step

`truncated` is true when the state was cut to fit the 65,536-token context
window; the model logs a warning when that happens.

```yaml
- name: chase-purchase-order
  guard: ${{ data.latest("clairic", "extraction-invoice").attributes.answers.po_number.value == null }}
```

```yaml
- name: large-invoice
  guard: ${{ data.latest("clairic", "extraction-invoice").attributes.answers.total.value > 1000 }}
```

## Global arguments

| Argument     | Default                                | Purpose                                                 |
| ------------ | -------------------------------------- | ------------------------------------------------------- |
| `apiToken`   | `$CLOUDFLARE_API_TOKEN`                | API token with Workers AI access; use a vault reference |
| `apiKey`     | `$CLOUDFLARE_API_KEY`                  | Legacy API key (with `email`)                           |
| `email`      | `$CLOUDFLARE_EMAIL`                    | Legacy account email (with `apiKey`)                    |
| `account_id` | `$CLOUDFLARE_ACCOUNT_ID`               | Account that runs the model                             |
| `model`      | `clairic`                              | Clairic model selector                                  |
| `baseUrl`    | `https://api.cloudflare.com/client/v4` | API root, for proxies or test servers                   |
| `timeoutMs`  | `30000`                                | Per-attempt HTTP timeout                                |
| `maxRetries` | `2`                                    | Retries on 408/429/5xx/529 and connection errors        |

## How it works

The model calls the Workers AI REST API directly with `fetch`; no SDK is
bundled. It unwraps Cloudflare's `{success, errors, result}` envelope and
reports `errors[]` messages when a call fails. A response missing an answer for
any requested field fails the method. Failed requests throw before any data is
written, so a workflow step fails cleanly. Retries use exponential backoff and
honour `Retry-After`.

This extension is hand-written and packaged by the swamp-extensions Cloudflare
codegen pipeline as a standalone model.

## License

This extension is part of swamp-extensions and is licensed under the GNU Affero
General Public License v3 with the Swamp Extension and Definition Exception. See
`LICENSE.txt`.
