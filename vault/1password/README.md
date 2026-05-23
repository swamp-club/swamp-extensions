# @swamp/1password

Swamp vault provider backed by
[1Password](https://developer.1password.com/docs/cli/). Stores, retrieves, and
lists secrets by shelling out to the official `op` CLI, so it inherits whichever
authentication mechanism `op` is configured with.

## Prerequisites

- [1Password CLI](https://developer.1password.com/docs/cli/get-started/)
  installed and on `PATH`
- Authenticated through one of:
  - **Service account**: `export OP_SERVICE_ACCOUNT_TOKEN=<token>`
  - **Desktop app**: enable CLI integration in 1Password settings
  - **Connect Server**: `export OP_CONNECT_HOST=<url>` and
    `export OP_CONNECT_TOKEN=<token>`

## Installation

```sh
swamp extension pull @swamp/1password
```

## Usage

Create a vault bound to a 1Password vault name:

```bash
swamp vault create @swamp/1password my-1password \
  --config '{"op_vault": "Private"}' --json
```

Read, write, and list secrets:

```bash
swamp vault get my-1password my-api-key --json
swamp vault put my-1password my-api-key "s3cr3t" --json
swamp vault list-keys my-1password --json
```

## Secret key format

- `item-name` — reads the `password` field of the named item
- `item-name/field` — reads a specific field from the item
- `op://vault/item/field` — passthrough of a full 1Password URI (read-only)

`put` creates a Secure Note if the item does not already exist, or updates the
target field in place.

## Annotations

This provider supports `swamp vault annotate` and `swamp vault inspect` for
attaching metadata to secrets. Annotation fields map to native 1Password item
properties:

| Annotation | 1Password field |
| ---------- | --------------- |
| `url` | Custom URL field in `swamp-annotations` section |
| `notes` | `notesPlain` built-in field |
| `labels` | Custom fields in a `swamp-labels` section |

```bash
swamp vault annotate my-1password my-api-key \
  --url https://console.aws.com/iam \
  --note "Production API key" \
  --label env=prod --label team=infra

swamp vault inspect my-1password my-api-key --json
```

Label keys must not contain dots, brackets, slashes, or backslashes — these
characters conflict with the 1Password CLI field reference syntax.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
