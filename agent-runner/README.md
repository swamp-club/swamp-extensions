# @swamp/agent-runner

Run AI coding agents with structured, machine-readable output for CI
integration. Manages agent CLI binaries (download, cache, verify), resolves API
tokens from environment variables or vaults, and returns verdicts that CI
pipelines can gate on — without coupling to any specific git forge.

Provider-agnostic: each agent backend (Claude Code CLI, OpenAI Codex CLI) is a
pluggable provider with its own binary management and CLI flag translation. The
common interface is prompt in, structured result out. Adding a new provider
means implementing one interface — no changes to the runner, auth, or model
code.

## Installation

```bash
swamp extension pull @swamp/agent-runner
```

## Authentication

Each provider reads its API key from a standard environment variable — no
configuration needed:

| Provider | Environment Variable |
| -------- | -------------------- |
| `claude` | `ANTHROPIC_API_KEY`  |
| `codex`  | `CODEX_API_KEY`      |

Set the env var in your shell or CI secrets and the extension picks it up
automatically. Nothing to configure in global arguments.

For production deployments where you want secrets managed centrally, reference a
swamp vault instead:

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg 'apiKey=${{ vault.get("my-vault", "anthropic-api-key") }}'
```

If you need to use a non-standard env var name (e.g. your CI injects the key as
`MY_CLAUDE_KEY`), set `apiKeyEnvVar` in global arguments to override:

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg apiKeyEnvVar=MY_CLAUDE_KEY
```

### Using the CLI's stored login

By default (`auth=apiKey`) an API key is required. For interactive or
human-gated use on a machine where you have already logged in with the provider
CLI (`claude` or `codex login`), set `auth=cli` to use that stored login
instead:

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg auth=cli
```

Under `auth=cli` no API key is resolved and the provider's key variable
(`ANTHROPIC_API_KEY` or `CODEX_API_KEY`) is left out of the agent's environment
entirely, since any set key takes precedence over the stored login. The agent
must run as the same user that logged in. Codex reads its login from `~/.codex`;
a custom `CODEX_HOME` is not passed to the agent. `auth=cli` cannot be combined
with `apiKey` or `apiKeyEnvVar`. Use API keys for CI.

For Codex, `auth=cli` is also how a custom model provider authenticates with its
own token command; see [Custom model provider](#custom-model-provider).

## Usage

### Create a Model Instance

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg defaultModel=claude-sonnet-4-6
```

For Codex:

```bash
swamp model create @swamp/agent-runner codex-reviewer \
  --global-arg provider=codex \
  --global-arg version=0.146.0
```

### Run a Code Review

Write a review prompt (e.g. `prompts/review.md`):

```markdown
You are a code reviewer. Review the changed files for:

1. Security vulnerabilities
2. Logic errors and off-by-one bugs
3. Missing error handling
4. Use of `any` type

Categorize findings as critical, high, medium, or low severity.
```

Run the review:

```bash
swamp model method run reviewer review \
  --input promptFile=prompts/review.md \
  --input 'files:json=["src/auth.ts","src/config.ts"]' \
  --json
```

With provider-specific tool permissions:

```bash
swamp model method run reviewer review \
  --input promptFile=prompts/review.md \
  --input 'files:json=["src/auth.ts"]' \
  --input model=claude-opus-4-6 \
  --input 'providerConfig:json={
    "claude": {
      "allowedTools": ["Read", "Grep", "Bash(git diff:*)", "Bash(git log:*)"],
      "disallowedTools": ["Write", "Edit"]
    }
  }' \
  --json
```

### Override the Model Per-Invocation

The model is a variable — override it on any call without changing the instance
configuration:

```bash
# Fast review with Haiku
swamp model method run reviewer review \
  --input promptFile=prompts/review.md \
  --input 'files:json=["src/main.ts"]' \
  --input model=claude-haiku-4-5 \
  --json

# Deep review with Opus
swamp model method run reviewer review \
  --input promptFile=prompts/adversarial.md \
  --input 'files:json=["src/main.ts"]' \
  --input model=claude-opus-4-6 \
  --json
```

### Set the Effort Per-Invocation

`run` and `review` also take an `effort` argument next to `model`: one of `low`,
`medium`, `high`, `xhigh` or `max`. It is a top-level argument rather than
provider config, so it carries over when a caller switches provider:

| Provider | Passed as                           |
| -------- | ----------------------------------- |
| `claude` | `--effort <level>`                  |
| `codex`  | `-c model_reasoning_effort=<level>` |

```bash
swamp model method run reviewer review \
  --input promptFile=prompts/review.md \
  --input 'files:json=["src/main.ts"]' \
  --input model=claude-haiku-4-5 \
  --input effort=low \
  --json
```

When `effort` is omitted, no flag is sent and the CLI's own default applies.
When it is set, the result records it as an `effort` field and an `effort` tag.
Whether a level is accepted depends on the model, and the CLI reports a level
the model doesn't support. A pinned `version` older than the CLI's effort
support fails when `effort` is set.

### Run an Arbitrary Prompt

```bash
swamp model method run reviewer run \
  --input prompt="Explain the authentication flow in this codebase" \
  --json
```

### Use in CI (Forgejo / GitHub Actions)

Set `ANTHROPIC_API_KEY` (or `CODEX_API_KEY`) as a CI secret. The extension reads
it automatically — no global argument configuration for auth.

The extension replaces manual Claude CLI invocation in CI. Instead of 80+ lines
of shell per review job:

```yaml
# Before: manual shell
- run: |
    curl -fsSL -o claude "https://downloads.claude.ai/..."
    sha256sum -c - ...
    PROMPT="$(cat .forgejo/prompts/review.md)..."
    ./claude -p "$PROMPT" --model claude-sonnet-4-6 ...
    if [ -f review-failed ]; then exit 1; fi
```

The extension handles binary management, prompt construction, and structured
output:

```yaml
# After: swamp model method
- run: |
    RESULT=$(swamp model method run reviewer review \
      --input promptFile=.forgejo/prompts/review.md \
      --input "files:json=$(git diff --name-only origin/main...HEAD | jq -R . | jq -s .)" \
      --json)

    # Post the review body as a PR comment
    echo "$RESULT" | jq -r '.body' > review-body.md

    # Gate the merge on the verdict
    VERDICT=$(echo "$RESULT" | jq -r '.verdict')
    if [ "$VERDICT" = "fail" ]; then
      echo "::error::Review failed"
      exit 1
    fi
```

## Review Output

The `review` method writes a `reviewResult` resource with this structure:

```json
{
  "verdict": "fail",
  "body": "## Code Review\n\n### Blocking Issues\n1. SQL injection in auth.ts:42",
  "findings": [
    {
      "severity": "critical",
      "file": "src/auth.ts",
      "line": 42,
      "description": "User input passed directly to SQL query",
      "example": "login('admin; DROP TABLE users--')",
      "suggestion": "Use parameterized queries"
    }
  ],
  "highestSeverity": "critical"
}
```

Each result is tagged with `verdict`, `highestSeverity`, `provider`, `model`,
and (when set) `effort` for querying:

```bash
# Find all failed reviews
swamp data query reviewer 'tags.verdict == "fail"'
```

## Providers

| Provider | CLI          | Env Var             | Permission Model                   |
| -------- | ------------ | ------------------- | ---------------------------------- |
| `claude` | Claude Code  | `ANTHROPIC_API_KEY` | `allowedTools` / `disallowedTools` |
| `codex`  | OpenAI Codex | `CODEX_API_KEY`     | `sandbox` / `approvalPolicy`       |

### Claude Provider Config

```json
{
  "claude": {
    "allowedTools": ["Read", "Grep", "Bash(git diff:*)"],
    "disallowedTools": ["Write", "Edit"]
  }
}
```

### Codex Provider Config

```json
{
  "codex": {
    "sandbox": "read-only",
    "approvalPolicy": "never"
  }
}
```

Codex `sandbox` options: `read-only`, `workspace-write`, `danger-full-access`.
Defaults to `read-only` when the review has `readOnly: true`. `approvalPolicy`
(`untrusted`, `on-request`, `never`; default `never`) is sent as
`-c approval_policy=<policy>`.

Codex runs are hermetic: the extension passes `--ephemeral`,
`--ignore-user-config` and `--ignore-rules`, so the host's
`~/.codex/config.toml`, execpolicy rules and session history cannot change what
a CI run does. Everything the run needs comes from the model's arguments and
provider config.

#### Custom model provider

To send Codex through an OpenAI-compatible gateway (a self-hosted proxy or
router), set `modelProvider`. The extension passes it to Codex as
`-c model_provider=...` and `-c model_providers.<id>.*` overrides, which work
alongside `--ignore-user-config`:

```json
{
  "codex": {
    "modelProvider": {
      "id": "gateway",
      "name": "Internal gateway",
      "baseUrl": "https://gateway.example.com/v1",
      "wireApi": "responses",
      "authCommand": "/usr/local/bin/gateway-token",
      "authArgs": ["--audience", "codex"]
    }
  }
}
```

| Field         | Required | Description                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------ |
| `id`          | yes      | Provider id: letters, digits, `_` and `-`; not `openai`, `oss`, `ollama`, `lmstudio` |
| `name`        | no       | Display name (defaults to `id`)                                                      |
| `baseUrl`     | yes      | `http` or `https` base URL of the OpenAI-compatible API                              |
| `wireApi`     | no       | `responses` or `chat` (the CLI's default if unset)                                   |
| `authCommand` | no       | Command Codex runs to get a bearer token; requires `auth=cli`                        |
| `authArgs`    | no       | Arguments for `authCommand`                                                          |

How the gateway is authenticated depends on `auth` and `authCommand`:

| `auth`   | `authCommand` | Gateway credential                                                        |
| -------- | ------------- | ------------------------------------------------------------------------- |
| `cli`    | set           | Codex runs the command and sends its output as the bearer token           |
| `apiKey` | unset         | The resolved API key (env var or vault), sent via `env_key=CODEX_API_KEY` |
| `cli`    | unset         | None — for a gateway that needs no auth                                   |
| `apiKey` | set           | Rejected: set `auth=cli`, since the command supplies the credential       |

Codex's stored login (`codex login`) only authenticates OpenAI's own provider;
it is never sent to a custom gateway.

Under `auth=apiKey` the gateway receives whatever key is resolved, and by
default that is `CODEX_API_KEY`. If that variable holds an OpenAI key, the
gateway gets the OpenAI key. Give the gateway its own variable with
`apiKeyEnvVar` (or a vault `apiKey`), and prefer an `https` `baseUrl`.

The token command runs with the agent's filtered environment (`PATH`, `HOME`,
locale and the other forwarded variables only), so it must find its own
credentials, for example in a file under `HOME`. `authCommand` and `authArgs`
are passed on the Codex command line, where other users on the host can see them
in the process list, and are stored as plain provider config. Never put a token
in `authArgs`; have the command fetch it.

The `authCommand` and `authArgs` keys need a Codex CLI version that supports
`model_providers.<id>.auth`; pin a recent `version` when using them.

## Binary Management

The extension downloads and caches agent CLI binaries automatically. On first
run, it fetches the binary for the configured `version` and platform and caches
it under `.swamp/agent-runner/bin/<provider>/<version>/`. Subsequent runs use
the cache.

- **Claude** downloads the single `claude` binary (`claude.exe` on Windows) and
  verifies it against the SHA-256 checksum in the release's `manifest.json`. If
  a release has no manifest entry for the platform, verification is skipped with
  a warning.
- **Codex** downloads the platform package from npm
  (`@openai/codex@<version>-<platform>`), unpacks it in process, and keeps its
  whole `vendor/` tree under `.swamp/agent-runner/bin/codex/<version>/vendor/`,
  so the sandbox helpers and `rg` that ship next to the binary stay available.

No manual binary management is needed — just set the `version` in global
arguments.

## Supported Platforms

| Platform      | Claude | Codex |
| ------------- | ------ | ----- |
| Linux x64     | yes    | yes   |
| Linux ARM64   | yes    | yes   |
| macOS x64     | yes    | yes   |
| macOS ARM64   | yes    | yes   |
| Windows x64   | yes    | yes   |
| Windows ARM64 | yes    | yes   |

The registry has no Windows ARM64 platform, so `manifest.yaml` declares
`windows-x86_64` only. The extension still detects Windows ARM64 at run time and
downloads the ARM64 builds of both agents.

On Windows the `claude` provider needs
[Git for Windows](https://git-scm.com/downloads/win): Claude Code runs its shell
tool through Git Bash, and the review instructions write the result with `tee`.
If Git Bash is not on `PATH`, set `CLAUDE_CODE_GIT_BASH_PATH`; the extension
forwards it to the agent. Without it, the review falls back to reading the
result from the agent's output.

## Methods

| Method   | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `review` | Run a review against files, return structured verdict + findings |
| `run`    | Run an arbitrary prompt, return raw output                       |

## Resources

| Resource        | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `reviewProfile` | Reusable review configuration (prompt, model, permissions) |
| `reviewResult`  | Structured output from a review (verdict, findings, body)  |
| `runResult`     | Raw output from an arbitrary prompt execution              |

## License

AGPL-3.0 with Swamp Exception — see LICENSE.txt for details.
