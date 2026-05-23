# @swamp/azure-kv

Swamp vault provider backed by
[Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/). Stores,
retrieves, and lists secrets through the official `@azure/keyvault-secrets`
client using `DefaultAzureCredential` for authentication.

## Installation

```sh
swamp extension pull @swamp/azure-kv
```

## Configuration

`DefaultAzureCredential` resolves credentials in the usual Azure order. Provide
them via one of:

- Environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`,
  `AZURE_CLIENT_SECRET`
- Azure CLI: `az login`
- Managed Identity attached to the VM, App Service, or container

The caller must have Key Vault data-plane permissions for `Get`, `Set`, and
`List` on the configured vault.

## Usage

Create a vault bound to a specific Key Vault URL:

```bash
swamp vault create @swamp/azure-kv my-azure-kv \
  --config '{"vault_url": "https://my-vault.vault.azure.net"}' --json
```

Read, write, and list secrets:

```bash
swamp vault get my-azure-kv my-secret --json
swamp vault put my-azure-kv my-secret "s3cr3t" --json
swamp vault list-keys my-azure-kv --json
```

## Secret key format

Azure Key Vault only allows alphanumeric characters and hyphens, so the
provider rewrites `/` and `_` in the swamp key name to `-` before talking to
Azure. Use the optional `secret_prefix` config value to namespace a Key Vault
across multiple swamp instances.

## Annotations

Supports `swamp vault annotate` and `swamp vault inspect` for attaching metadata
(URL, notes, labels) to secrets. Annotations are stored as Azure Key Vault
secret tags using a `swamp.` prefix:

| Annotation field | Azure tag key |
| ---------------- | ----------------------- |
| `url` | `swamp.url` |
| `notes` | `swamp.notes` |
| `updatedAt` | `swamp.updatedAt` |
| `labels.{key}` | `swamp.label.{key}` |

Non-swamp tags on the secret are preserved across annotation operations.
Annotation operations use the same data-plane permissions (`Get`, `Set`) as
regular secret operations — no additional Azure RBAC grants are needed.

```bash
swamp vault annotate my-azure-kv API_KEY \
  --url https://console.azure.com --note "Production API key" \
  --label env=prod --label team=infra

swamp vault inspect my-azure-kv API_KEY --json
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
