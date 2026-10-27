# @swamp/cloudflare/clef

Use Cloudflare's
[Clef](https://developers.cloudflare.com/workers-ai/models/clef/) decision
models from swamp. Clef does not generate text. It takes application state plus
typed questions and returns calibrated answers: a probability for a yes/no
question (Noul), a selected option with a full distribution (Choice), or a
weighted position along an ordered rubric (Score). Clef follows the System One
API, so the questions and answers are the same shape as TypeSafe's Jev and
`@swamp/typesafe-ai`.

The `@swamp/cloudflare/clef/decision` model calls the Workers AI REST route
`POST /accounts/{account_id}/ai/run/@cf/cloudflare/{clef,clef-flash}` and stores
each answer as a resource that workflows can branch on with CEL.

| Model        | Size | Best for                    |
| ------------ | ---- | --------------------------- |
| `clef`       | 27B  | Highest-precision decisions |
| `clef-flash` | 9B   | Latency-critical decisions  |

For typed values extracted from text (amounts, dates, spans, estimates), see the
sibling extension `@swamp/cloudflare/clairic`.

## Installation

```sh
swamp extension pull @swamp/cloudflare/clef
```

## Authentication

Clef runs on your Cloudflare account. Create an API token from the dashboard's
Workers AI template (Workers AI Read and Edit), store it in a vault, and
reference it from the definition along with the account ID. Never paste the
token into a definition file or a shell command line.

```sh
swamp vault create local_encryption cloudflare --json
echo "$CLOUDFLARE_API_TOKEN" | swamp vault put cloudflare CLOUDFLARE_API_TOKEN --json

swamp model create @swamp/cloudflare/clef/decision clef \
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

Ask one yes/no question and store the probability of yes:

```sh
swamp model method run clef noul \
  --input state="Help! My payouts have been failing for 3 days." \
  --input instructions="Does this convey urgency?" \
  --input yes="Explicitly time-sensitive" \
  --input no="No urgency expressed" \
  --input name=urgency
```

Pick one option from a set. Structured inputs take the `:json` suffix, or
`@path` to read a JSON file:

```sh
swamp model method run clef choice \
  --input state="Help! My payouts have been failing for 3 days." \
  --input instructions="Which team should handle this?" \
  --input 'criteria:json={"billing":"Payments, invoicing, refunds","technical":"Bugs, outages","sales":null}'
```

Rate along an ordered rubric (2 to 10 levels):

```sh
swamp model method run clef score \
  --input state="Help! My payouts have been failing for 3 days." \
  --input instructions="How frustrated is the customer?" \
  --input 'criteria:json=["Calm","Frustrated","Very angry"]'
```

Ask up to 64 independent questions about one state in a single request. This is
the cheapest and fastest way to use Clef; questions run in parallel and cannot
see each other's answers. Use `clef-flash` when latency matters more than
precision:

```sh
swamp model method run clef ask \
  --input 'state:json={"ticket":{"subject":"Duplicate charge","body":"I was charged twice for order A-104."}}' \
  --input questions=@questions.json \
  --input model=clef-flash
```

where `questions.json` is:

```json
{
  "is_refund_request": {
    "type": "noul",
    "instructions": "Is the customer asking for a refund?"
  },
  "department": {
    "type": "choice",
    "instructions": "Which team should handle this?",
    "criteria": {
      "billing": "Payments and refunds",
      "technical": "Bugs and outages"
    }
  },
  "frustration": {
    "type": "score",
    "instructions": "How frustrated is the customer?",
    "criteria": ["Calm", "Frustrated", "Very angry"]
  }
}
```

### Images

Every method accepts up to four embedded PNG, JPEG, or WebP images, placed
before the state. Each is a base64 data URL or a `{"content_type","base64"}`
object; remote URLs are not accepted. Images are limited to 4 MiB and 16
megapixels each, 8 MiB decoded in total, and are billed as input tokens.

```sh
swamp model method run clef noul \
  --input state="Customer-submitted damage photo" \
  --input instructions="Does the photo show visible damage to the product?" \
  --input images=@images.json
```

where `images.json` is `["data:image/jpeg;base64,/9j/4AAQ..."]`. Stored
resources record only `imageCount`, never the image bytes.

## Stored data and CEL

Each method writes one resource. The instance name is the spec name plus the
`name` argument (default `latest`), so several evaluations can live side by
side. The resource shapes match `@swamp/typesafe-ai`, so a workflow guard works
against either backend.

| Method   | Spec         | Instance            | Key attributes                                   |
| -------- | ------------ | ------------------- | ------------------------------------------------ |
| `noul`   | `noul`       | `noul-<name>`       | `noul` (0 to 1)                                  |
| `choice` | `choice`     | `choice-<name>`     | `choice`, `probabilities`, `confidence`          |
| `score`  | `score`      | `score-<name>`      | `score`, `legend`, `probabilities`, `confidence` |
| `ask`    | `evaluation` | `evaluation-<name>` | `answers.<id>.*` for every question              |

Every resource also records `model`, `state`, `usage`, `evaluatedAt`, and
`imageCount` when images were sent. Reference answers from a workflow guard or a
later step:

```yaml
- name: escalate
  guard: ${{ data.latest("clef", "noul-urgency").attributes.noul > 0.8 }}
```

```yaml
- name: route
  guard: ${{ data.latest("clef", "evaluation-latest").attributes.answers.department.choice == "billing" }}
```

## Global arguments

| Argument     | Default                                | Purpose                                                   |
| ------------ | -------------------------------------- | --------------------------------------------------------- |
| `apiToken`   | `$CLOUDFLARE_API_TOKEN`                | API token with Workers AI access; use a vault reference   |
| `apiKey`     | `$CLOUDFLARE_API_KEY`                  | Legacy API key (with `email`)                             |
| `email`      | `$CLOUDFLARE_EMAIL`                    | Legacy account email (with `apiKey`)                      |
| `account_id` | `$CLOUDFLARE_ACCOUNT_ID`               | Account that runs the model                               |
| `model`      | `clef`                                 | `clef` or `clef-flash`; methods accept a `model` override |
| `baseUrl`    | `https://api.cloudflare.com/client/v4` | API root, for proxies or test servers                     |
| `timeoutMs`  | `30000`                                | Per-attempt HTTP timeout                                  |
| `maxRetries` | `2`                                    | Retries on 408/429/5xx/529 and connection errors          |

## How it works

The model calls the Workers AI REST API directly with `fetch`; no SDK is
bundled. It unwraps Cloudflare's `{success, errors, result}` envelope and
reports `errors[]` messages when a call fails. Failed requests throw before any
data is written, so a workflow step fails cleanly. Retries use exponential
backoff and honour `Retry-After`.

Arguments are validated against Clef's published limits before any request is
sent: 1 to 64 questions per request, question ids of letters, digits, `_`, `.`
and `-` (max 100 characters), 2 to 255 choice options, 2 to 10 score levels, and
at most 4 images.

This extension is hand-written and packaged by the swamp-extensions Cloudflare
codegen pipeline as a standalone model.

## License

This extension is part of swamp-extensions and is licensed under the GNU Affero
General Public License v3 with the Swamp Extension and Definition Exception. See
`LICENSE.txt`.
