# @swamp/1password

Swamp vault provider backed by
[1Password](https://developer.1password.com/docs/cli/). Stores, retrieves,
deletes, and lists secrets by shelling out to the official `op` CLI. By default
`op` inherits whichever authentication mechanism the host environment provides;
alternatively, a service account token can be supplied from a file with
`op_service_account_token_file` so it never enters the swamp process
environment.

## Prerequisites

- [1Password CLI](https://developer.1password.com/docs/cli/get-started/)
  installed and on `PATH`
- Authenticated through one of:
  - **Service account**: `export OP_SERVICE_ACCOUNT_TOKEN=<token>`, or set
    `op_service_account_token_file` in the vault config (see
    [Configuration](#configuration))
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

Read, write, delete, and list secrets:

```bash
swamp vault get my-1password my-api-key --json
swamp vault put my-1password my-api-key "s3cr3t" --json
swamp vault delete my-1password my-api-key --json
swamp vault list-keys my-1password --json
```

## Configuration

| Key                             | Required | Description                                                |
| ------------------------------- | -------- | ---------------------------------------------------------- |
| `op_vault`                      | yes      | The 1Password vault to use                                 |
| `op_account`                    | no       | Account shorthand or UUID, passed to `op` as `--account`   |
| `op_service_account_token_file` | no       | Absolute path to a file containing a service account token |

### Service account token file

```bash
swamp vault create @swamp/1password my-1password \
  --config '{"op_vault": "Private", "op_service_account_token_file": "/run/secrets/op-token"}' --json
```

When `op_service_account_token_file` is set, the extension reads the file on
every `op` call and passes its contents as `OP_SERVICE_ACCOUNT_TOKEN` to that
`op` child process only. The token is never placed in the swamp process
environment, so it is not included in the environment snapshot `swamp serve`
sends to remote workers, and other child processes never see it.

- The path must be absolute; a relative path is rejected when the vault is
  created, because swamp's working directory differs between local runs and
  serve workers. The path is used verbatim: `~` is not expanded.
- Leading and trailing whitespace, newlines, and a byte-order mark are
  stripped. An empty file is an error.
- Under `swamp serve`, vault reads run on the serve host (workers request
  secrets from it), so the token file only needs to exist there.
- The file is re-read on each call, so rotating the token needs no restart.
- Protecting the file (ownership, `0600` permissions) is the operator's
  responsibility.
- This option only supplies service account authentication. `op` still inherits
  `OP_CONNECT_HOST` / `OP_CONNECT_TOKEN` and desktop app integration from the
  environment, and those may take precedence over the service account token —
  leave them unset when using the token file.

When the option is unset, behavior is unchanged: `op` inherits the swamp process
environment.

## Secret key format

- `item-name` — reads the `password` field of the named item
- `item-name/field` — reads a specific field from the item
- `op://vault/item/field` — passthrough of a full 1Password URI (read-only)

`put` creates a Secure Note if the item does not already exist, or updates the
target field in place.

## Observability

The extension emits [OpenTelemetry](https://opentelemetry.io/) spans for vault
operations (get, put, list, delete, and annotation CRUD) and per-CLI-invocation
child spans for each `op` command. Spans are no-ops when no `TracerProvider` is
configured in the host process. When swamp is running with OTel enabled, vault
activity appears in traces with attributes following OTel semantic conventions
(secret key, vault name, CLI subcommand).

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

## Tag-on-create

When `swamp vault put` passes tags, they are stored as fields in the
`swamp-labels` section of the 1Password item. Tags are applied on both
creation and update. Tag keys are validated with the same rules as annotation
label keys — dots, brackets, slashes, backslashes, and equals signs are
rejected.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
