# @swamp/hetzner-cloud

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
Hetzner Cloud resources.

Each model represents a single Hetzner Cloud resource (e.g., a server, a
floating IP, an SSH key). Models have **domain properties** that you configure
(the desired state) and **resource properties** that reflect the live state in
Hetzner Cloud. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Hetzner Cloud
- **sync** — refresh all resource properties from the API
- **list** — discover existing resources (resources with a collection endpoint),
  optionally filtered by a Hetzner label selector; writes one resource per match

Use `swamp model type describe @swamp/hetzner-cloud/<model>` to see the full
list of configurable properties and available methods for a model.

## Authentication

Provide a Hetzner Cloud API token in one of two ways. An explicit `token` global
argument takes precedence over the environment variable, and is validated
against `/v1/locations` on first use.

**Option 1 — `token` global argument (recommended).** Wire it from a vault so
the secret never lives in your shell environment:

```yaml
# in the model definition
globalArguments:
  token: ${{ vault.get(my-vault, hcloud-token) }}
```

The `token` argument is marked sensitive: swamp redacts its value from run logs
and reports and vaults it on write. A vault-sourced value is stored as the
`vault.get(...)` expression and only resolved at execution time, so the raw
secret never lands in the model definition.

**Option 2 — `HETZNER_API_TOKEN` environment variable.** Used when no `token`
argument is set:

```bash
export HETZNER_API_TOKEN=your-token-here
```

## Usage

```bash
# Create a new server model
swamp model create @swamp/hetzner-cloud/servers my-server

# Edit the model to configure its properties
swamp model edit my-server

# Create the resource in Hetzner Cloud
swamp model method run my-server create

# Sync current state from Hetzner Cloud
swamp model method run my-server sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
