# @swamp/digitalocean

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
DigitalOcean resources.

Each model represents a single DigitalOcean resource (e.g., a Droplet, a volume,
a load balancer). Models have **domain properties** that you configure (the
desired state) and **resource properties** that reflect the live state in
DigitalOcean. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from DigitalOcean
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/digitalocean/<model>` to see the full list
of configurable properties and available methods for a model.

## Authentication

Provide a DigitalOcean personal access token in one of two ways. An explicit
`token` global argument takes precedence over the environment variable, and is
validated against `/v2/account` on first use.

**Option 1 — `token` global argument (recommended).** Wire it from a vault so
the secret never lives in your shell environment:

```yaml
# in the model definition
globalArguments:
  token: ${{ vault.get(my-vault, do-token) }}
```

The `token` argument is marked sensitive: swamp redacts its value from run logs
and reports and vaults it on write. A vault-sourced value is stored as the
`vault.get(...)` expression and only resolved at execution time, so the raw
secret never lands in the model definition.

**Option 2 — `DO_API_TOKEN` environment variable.** Used when no `token`
argument is set:

```bash
export DO_API_TOKEN=your-token-here
```

## Usage

```bash
# Create a new droplet model
swamp model create @swamp/digitalocean/droplet my-droplet

# Edit the model to configure its properties
swamp model edit my-droplet

# Create the resource in DigitalOcean
swamp model method run my-droplet create

# Sync current state from DigitalOcean
swamp model method run my-droplet sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
