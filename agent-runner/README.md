# @swamp/agent-runner

Run AI coding agents with structured, machine-readable output for CI
integration. Manages agent CLI binaries (download, cache, verify), resolves
API tokens from environment variables or vaults, and returns verdicts that CI
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

| Provider | Environment Variable  |
| -------- | --------------------- |
| `claude` | `ANTHROPIC_API_KEY`   |
| `codex`  | `CODEX_API_KEY`       |

Set the env var in your shell or CI secrets and the extension picks it up
automatically. Nothing to configure in global arguments.

For production deployments where you want secrets managed centrally, reference
a swamp vault instead:

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg 'apiKey=${{ vault.get("my-vault", "anthropic-api-key") }}'
```

If you need to use a non-standard env var name (e.g. your CI injects the key
as `MY_CLAUDE_KEY`), set `apiKeyEnvVar` in global arguments to override:

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg apiKeyEnvVar=MY_CLAUDE_KEY
```

### Using the Claude CLI's stored login

By default (`auth=apiKey`) an API key is required. For interactive or
human-gated use on a machine where you have already logged in with the `claude`
CLI, set `auth=cli` to use that stored login instead:

```bash
swamp model create @swamp/agent-runner reviewer \
  --global-arg provider=claude \
  --global-arg version=2.1.222 \
  --global-arg auth=cli
```

Under `auth=cli` no API key is resolved and `ANTHROPIC_API_KEY` is left out of
the agent's environment entirely, since any set key takes precedence over the
stored login. The agent must run as the same user that logged in. `auth=cli` is
only supported by the `claude` provider, and cannot be combined with `apiKey` or
`apiKeyEnvVar`. Use API keys for CI.

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

The model is a variable — override it on any call without changing the
instance configuration:

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

### Run an Arbitrary Prompt

```bash
swamp model method run reviewer run \
  --input prompt="Explain the authentication flow in this codebase" \
  --json
```

### Use in CI (Forgejo / GitHub Actions)

Set `ANTHROPIC_API_KEY` (or `CODEX_API_KEY`) as a CI secret. The extension
reads it automatically — no global argument configuration for auth.

The extension replaces manual Claude CLI invocation in CI. Instead of 80+
lines of shell per review job:

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

Each result is tagged with `verdict`, `highestSeverity`, `provider`, and
`model` for querying:

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
Defaults to `read-only` when the review has `readOnly: true`.

## Binary Management

The extension downloads and caches agent CLI binaries automatically. On first
run, it fetches the binary for the configured `version` and platform, verifies
the checksum when available, and caches it under
`.swamp/agent-runner/bin/<provider>/<version>/`. Subsequent runs use the cache.

No manual binary management is needed — just set the `version` in global
arguments.

## Methods

| Method   | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| `review` | Run a review against files, return structured verdict + findings  |
| `run`    | Run an arbitrary prompt, return raw output                        |

## Resources

| Resource        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `reviewProfile` | Reusable review configuration (prompt, model, permissions)  |
| `reviewResult`  | Structured output from a review (verdict, findings, body)   |
| `runResult`     | Raw output from an arbitrary prompt execution               |

## License

AGPL-3.0 with Swamp Exception — see LICENSE.txt for details.
