# @swamp/cloudflare/devices

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models for
Cloudflare devices resources.

Each model represents a single Cloudflare resource. Models have **domain
properties** that you configure (the desired state) and **resource properties**
that reflect the live state in Cloudflare. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Cloudflare
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/cloudflare/devices/deployment-groups` to
see the full list of configurable properties and available methods for this
model.

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

## Usage

```bash
# Create a new deployment-groups model
swamp model create @swamp/cloudflare/devices/deployment-groups my-deployment-groups

# Edit the model to configure its properties
swamp model edit my-deployment-groups

# Create the resource in Cloudflare
swamp model method run my-deployment-groups create

# Sync current state from Cloudflare
swamp model method run my-deployment-groups sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
