# @swamp/aws-sm

Swamp vault provider backed by
[AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/). Stores,
retrieves, deletes, and lists secrets through the AWS SDK v3, using the default
AWS credential chain for authentication.

## Installation

```sh
swamp extension pull @swamp/aws-sm
```

## Configuration

Credentials are resolved via the standard AWS credential chain — no credentials
in config. Provide them via one of:

- Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- AWS profile: `~/.aws/credentials`
- IAM role attached to the instance, task, or pod

The calling principal must have the following IAM permissions on the target
secrets:

- `secretsmanager:GetSecretValue`
- `secretsmanager:PutSecretValue`
- `secretsmanager:CreateSecret`
- `secretsmanager:ListSecrets`
- `secretsmanager:DescribeSecret`
- `secretsmanager:UpdateSecret`
- `secretsmanager:TagResource`
- `secretsmanager:DeleteSecret`
- `secretsmanager:UntagResource`

## Usage

Create a vault bound to a specific region:

```bash
swamp vault create @swamp/aws-sm my-aws-sm \
  --config '{"region": "us-east-1"}' --json
```

Read, write, delete, and list secrets:

```bash
swamp vault get my-aws-sm my/secret/name --json
swamp vault put my-aws-sm my/secret/name "s3cr3t" --json
swamp vault delete my-aws-sm my/secret/name --json
swamp vault list-keys my-aws-sm --json
```

## Deletion

`swamp vault delete` schedules the secret for deletion using the default 30-day
recovery window. The secret can be restored via the AWS console or CLI within
that period. The secret name cannot be reused until the recovery window expires.

## Annotations

Attach metadata to secrets via `swamp vault annotate` and inspect it with
`swamp vault inspect`. Annotation fields map to native AWS primitives:

| Field    | AWS primitive                                          |
| -------- | ------------------------------------------------------ |
| `notes`  | Secret `Description` field                             |
| `labels` | Resource tags (key-value pairs)                        |
| `url`    | Secret `Description` field (trailing `swamp:url=` line) |

The `url` is stored in the `Description` rather than a tag because AWS tag
values reject characters such as `?` and `&`, which are common in URLs with
query strings. Annotations created before this change kept the `url` in a
`swamp:url` tag; that tag is still read for backwards compatibility.

```bash
swamp vault annotate my-aws-sm API_KEY \
  --url https://console.aws.amazon.com/iam \
  --note "Production API key" \
  --label env=prod --label team=infra

swamp vault inspect my-aws-sm API_KEY --json
```

## Secret key format

Secret keys map directly to AWS Secrets Manager secret names, including
path-style names such as `myapp/production/db-password`. A `put` against a
non-existent secret will create it on demand.

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt) for details.
