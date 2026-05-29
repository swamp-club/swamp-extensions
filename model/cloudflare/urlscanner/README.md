# @swamp/cloudflare/urlscanner

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models for
Cloudflare urlscanner resources.

Each model represents a single Cloudflare resource. Models have **domain
properties** that you configure (the desired state) and **resource properties**
that reflect the live state in Cloudflare. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Cloudflare
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/cloudflare/urlscanner/scan` to see the
full list of configurable properties and available methods for this model.

## Authentication

Set the `CLOUDFLARE_API_TOKEN` environment variable (recommended). The token is
validated against `/user/tokens/verify` on first use.

```bash
export CLOUDFLARE_API_TOKEN=your-token-here
```

Alternatively, use the legacy API key + email:

```bash
export CLOUDFLARE_API_KEY=your-api-key
export CLOUDFLARE_EMAIL=your-email@example.com
```

### Vault-wireable credentials

Each model also accepts optional, sensitive global arguments that take
precedence over the environment variables and can be wired with a
`vault.get(...)` expression, so credentials are sourced from a vault instead of
the shell environment:

- `apiToken` — overrides `CLOUDFLARE_API_TOKEN` (recommended).
- `apiKey` + `email` — override `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL` for
  the legacy auth path. Both must be provided together.

```yaml
globalArgs:
  apiToken: ${{ vault.get("cloudflare/api-token") }}
```

These arguments are flagged sensitive, so they are redacted from run logs,
reports, and stored data. A few models whose own schema already defines an
`email` property do not expose the `apiKey`/`email` arguments (to avoid a name
collision) — those models use the `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL`
environment variables for the legacy path, while `apiToken` remains available.

## Usage

```bash
# Create a new scan model
swamp model create @swamp/cloudflare/urlscanner/scan my-scan

# Edit the model to configure its properties
swamp model edit my-scan

# Create the resource in Cloudflare
swamp model method run my-scan create

# Sync current state from Cloudflare
swamp model method run my-scan sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
