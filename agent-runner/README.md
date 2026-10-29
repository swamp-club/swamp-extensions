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

When the agent CLI reports token usage, the result also carries a `usage`
object; see [Run Output](#run-output).

## Run Output

The `run` method writes a `runResult` resource:

```json
{
  "output": "The authentication flow starts in src/auth.ts ...",
  "exitCode": 0,
  "sessionId": "ddd38c40-9c35-4615-9e54-ed2616359d50",
  "usage": {
    "model": "claude-sonnet-4-6",
    "inputTokens": 12,
    "outputTokens": 840,
    "cacheReadTokens": 11693,
    "cacheWriteTokens": 12687,
    "costUsd": 0.0421,
    "numTurns": 3,
    "durationMs": 18234,
    "durationApiMs": 17010,
    "byModel": {
      "claude-sonnet-4-6": {
        "inputTokens": 12,
        "outputTokens": 840,
        "cacheReadTokens": 11693,
        "cacheWriteTokens": 12687,
        "costUsd": 0.0421
      }
    }
  }
}
```

`output` is the agent's reply text. The claude provider runs the CLI with
`--output-format json` and takes `output` from the result's `result` field,
without the trailing newline text output used to end with. The codex provider
runs `codex exec --json` and takes `output` from its final message.

`sessionId` is the session id the CLI reported: claude's `session_id`, or the
codex thread id (codex runs with `--ephemeral`, so its session is not saved). It
is on both `runResult` and `reviewResult`, and absent when the CLI reported
none.

The JSON output needs Claude Code 1.0.37 or later (the oldest release the
extension can download) and Codex 0.122.0 or later (the oldest that accepts the
`--ignore-user-config` and `--ignore-rules` flags the extension already passes).

`usage` records what the CLI reported, on both `runResult` and `reviewResult`:

- `inputTokens` counts input that was not read from the cache, for both
  providers (codex's own count includes cached input; it is subtracted).
- For claude, `model` is the model that produced the most output tokens, and
  `byModel` breaks the totals down per model. Codex doesn't report which model
  it ran, so for codex `model` is the model the run asked for (the `model`
  argument or `defaultModel`) and is absent when neither was set; codex has no
  `byModel`.
- `costUsd` is claude only, and is the CLI's own estimate: codex reports no
  price, and an older claude CLI may price a newer model wrongly.
  `reasoningOutputTokens` is codex only.
- Each field is present only when the CLI reported it, so an older CLI version
  may give a partial `usage` (claude before the per-model breakdown has no
  `model` or `byModel`). When the CLI reports no usage at all, or its output
  can't be read, `usage` is absent and `output` is the CLI's raw output; the run
  never fails because of it.

The `agent.run` tracing span carries the session id as
`agent_runner.session_id`, and every `usage` field except `byModel` as
`agent_runner.usage.<field>` (`model`, `input_tokens`, `output_tokens`,
`cache_read_tokens`, `cache_write_tokens`, `reasoning_output_tokens`,
`cost_usd`, `num_turns`, `duration_ms`, `duration_api_ms`).

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

| Resource        | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `reviewProfile` | Reusable review configuration (prompt, model, permissions)       |
| `reviewResult`  | Structured output from a review (verdict, findings, body, usage) |
| `runResult`     | Output from an arbitrary prompt execution, with token usage      |

## License

AGPL-3.0 with Swamp Exception — see LICENSE.txt for details.
