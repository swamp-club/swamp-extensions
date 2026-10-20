# @swamp/vercel/teams

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
Vercel teams resources.

Each model represents a single Vercel resource. Models have **domain
properties** that you configure (the desired state) and **resource properties**
that reflect the live state in Vercel. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **lookup** — find an existing resource by field values and import it into
  state (pass `allowMissing: true` to record a miss in `lookupResult` instead of
  failing)
- **adopt** — import a resource by ID into state for management
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Vercel
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/vercel/teams/teams` to see the full list
of configurable properties and available methods for this model.

## Authentication

Set the `VERCEL_TOKEN` environment variable:

```bash
export VERCEL_TOKEN=your-token-here
```

### Vault-wireable credentials

Each model also accepts an optional, sensitive `token` global argument that
takes precedence over the environment variable and can be wired with a
`vault.get(...)` expression, so credentials are sourced from a vault instead of
the shell environment:

```yaml
globalArgs:
  token: ${{ vault.get("vercel/api-token") }}
```

## Team scoping

Most Vercel resources are scoped to a team. Provide either `teamId` or `slug` as
a global argument:

```yaml
globalArgs:
  teamId: team_abc123
  # or: slug: my-team
```

## Sensitive values

These fields hold secrets and are marked sensitive:

| Model                       | Global arguments                                          | Stored state |
| --------------------------- | --------------------------------------------------------- | ------------ |
| `@swamp/vercel/teams/teams` | `defaultDeploymentProtection.passwordProtection.password` | —            |

Set a sensitive global argument with a `vault.get(...)` expression, as for
`token`. swamp refuses a literal value in one when it saves the model
definition, so a definition that already holds a literal value fails on its next
save until the value is moved to a vault.

## Quick start

```bash
# Install the extension
swamp extension install @swamp/vercel/teams

# Create a model instance
swamp model create @swamp/vercel/teams/teams my-teams

# Configure it
swamp model edit my-teams

# Create the resource in Vercel
swamp model method run my-teams create

# Sync current state from Vercel
swamp model method run my-teams sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
