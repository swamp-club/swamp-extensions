# @swamp/vercel/aliases

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
Vercel aliases resources.

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

Use `swamp model type describe @swamp/vercel/aliases/aliases` to see the full
list of configurable properties and available methods for this model.

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

| Model                           | Global arguments | Stored state       |
| ------------------------------- | ---------------- | ------------------ |
| `@swamp/vercel/aliases/aliases` | —                | `protectionBypass` |

Set a sensitive global argument with a `vault.get(...)` expression, as for
`token`. swamp refuses a literal value in one when it saves the model
definition, so a definition that already holds a literal value fails on its next
save until the value is moved to a vault.

swamp writes sensitive stored values to a vault and keeps a `vault.get(...)`
reference in the model's data. It uses the repository's default vault, or the
first vault configured, so a method that writes state for these models fails in
a repository with no vault: create one with `swamp vault create` first.

An object field (`protectionBypass`) is vaulted as a whole and reads back from
stored data as a JSON string.

Earlier versions of these models stored these values in clear, and upgrading
does not rewrite data already written. Run `sync` to write a version with the
values vaulted, then list the earlier versions with
`swamp data versions <model> <data-name>` and remove them with
`swamp data delete <model> <data-name> --version <n>`.

## Quick start

```bash
# Install the extension
swamp extension install @swamp/vercel/aliases

# Create a model instance
swamp model create @swamp/vercel/aliases/aliases my-aliases

# Configure it
swamp model edit my-aliases

# Create the resource in Vercel
swamp model method run my-aliases create

# Sync current state from Vercel
swamp model method run my-aliases sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
