# @swamp/deno-runner

Install and run Deno commands with managed binary downloads. Handles version
pinning, checksum verification, and caching so CI pipelines and development
workflows don't need to install Deno separately or manage platform-specific
binaries.

Generic by design: the extension doesn't impose any project structure or
command conventions. You specify the Deno version and the arguments — it
downloads the right binary and runs whatever you tell it to.

## Installation

```bash
swamp extension pull @swamp/deno-runner
```

## Usage

### Create a Model Instance

```bash
swamp model create @swamp/deno-runner deno \
  --global-arg version=2.7.5
```

The `version` global argument is required — it controls which Deno binary is
downloaded and cached.

### Install Deno

Download and cache a specific Deno version without running anything. Useful as
a preflight step in CI to separate download time from execution time.

```bash
swamp model method run deno install --json
```

Returns an `installResult` resource with the binary path, version, and
platform.

### Run a Command

Pass any arguments you would pass to `deno` on the command line:

```bash
# Type-check
swamp model method run deno run \
  --input 'args:json=["check", "src/main.ts"]' \
  --json

# Lint
swamp model method run deno run \
  --input 'args:json=["lint", "src/"]' \
  --json

# Format check
swamp model method run deno run \
  --input 'args:json=["fmt", "--check", "src/"]' \
  --json

# Run tests with permissions
swamp model method run deno run \
  --input 'args:json=["test", "--allow-read", "--allow-env", "src/"]' \
  --json

# Verify lockfile
swamp model method run deno run \
  --input 'args:json=["install", "--frozen"]' \
  --json

# Run a script
swamp model method run deno run \
  --input 'args:json=["run", "--allow-read", "--allow-net=api.example.com", "scripts/deploy.ts"]' \
  --json
```

### Run a Named Task

Run tasks defined in `deno.json` without constructing the full argument list:

```bash
# Run a task
swamp model method run deno task \
  --input taskName=generate:aws \
  --json

# Run a task with extra arguments
swamp model method run deno task \
  --input taskName=generate:aws \
  --input 'taskArgs:json=["ec2", "s3", "lambda"]' \
  --json
```

### Working Directory and Environment

Both `run` and `task` accept optional `workingDir` and `env`:

```bash
swamp model method run deno run \
  --input 'args:json=["check", "extensions/models/*.ts"]' \
  --input workingDir=/path/to/extension \
  --input 'env:json={"DENO_DIR": "/cache/deno"}' \
  --json
```

### Use in CI (Forgejo / GitHub Actions)

The extension replaces the `denoland/setup-deno` action and manual `deno`
invocations. Instead of:

```yaml
# Before: setup action + raw commands
steps:
  - uses: actions/checkout@v6
  - uses: denoland/setup-deno@v2
    with:
      deno-version: v2.7.x
  - run: deno check extensions/models/my_model.ts
  - run: deno lint extensions/models/
  - run: deno fmt --check extensions/models/
  - run: deno test --allow-read --allow-write extensions/models/
  - run: deno install --frozen
```

Use the extension:

```yaml
# After: swamp model method
steps:
  - uses: actions/checkout@v6
  - uses: systeminit/setup-swamp@v0.1.0

  - run: swamp model method run deno run --input 'args:json=["check", "extensions/models/my_model.ts"]' --json
  - run: swamp model method run deno run --input 'args:json=["lint", "extensions/models/"]' --json
  - run: swamp model method run deno run --input 'args:json=["fmt", "--check", "extensions/models/"]' --json
  - run: swamp model method run deno run --input 'args:json=["test", "--allow-read", "--allow-write", "extensions/models/"]' --json
  - run: swamp model method run deno run --input 'args:json=["install", "--frozen"]' --json
```

The binary download is cached across steps — only the first invocation hits
the network.

### Run Codegen Tasks

```bash
swamp model method run deno task \
  --input taskName=fetch-schema:aws \
  --input workingDir=codegen \
  --json

swamp model method run deno task \
  --input taskName=generate:aws \
  --input 'taskArgs:json=["ec2", "s3"]' \
  --input workingDir=codegen \
  --json
```

## Command Output

Both `run` and `task` write a `commandResult` resource with stdout, stderr,
exit code, and the command string. If the command exits with a non-zero exit
code, the method **fails the step** after writing the resource — so the output
is still retrievable via `swamp data get` for debugging, but the workflow step
reports the correct failure status.

```json
{
  "stdout": "running 5 tests...\nok | 5 passed | 0 failed (42ms)\n",
  "stderr": "Check file:///repo/src/main_test.ts\n",
  "exitCode": 0,
  "command": "deno test --allow-read src/"
}
```

Each result is tagged with `exitCode` and `command` for querying:

```bash
# Find all failed runs
swamp data query deno 'tags.exitCode != "0"'

# Find all test runs
swamp data query deno 'tags.command.startsWith("deno test")'
```

## Binary Management

The extension downloads Deno binaries from `dl.deno.land` and caches them
under `.swamp/deno-runner/bin/<version>/deno` (`deno.exe` on Windows). On
first run for a given version, it:

1. Downloads the platform-appropriate archive (zip)
2. Verifies the SHA-256 checksum when available
3. Extracts the binary in process (no `unzip` needed) with atomic write
   (download → temp → rename)
4. Caches for subsequent runs

No manual binary management is needed — set the `version` in global
arguments and the extension handles the rest. Supported platforms:

| Platform         | Archive                              |
| ---------------- | ------------------------------------ |
| Linux x64        | `deno-x86_64-unknown-linux-gnu.zip`  |
| Linux ARM64      | `deno-aarch64-unknown-linux-gnu.zip` |
| macOS x64        | `deno-x86_64-apple-darwin.zip`       |
| macOS ARM64      | `deno-aarch64-apple-darwin.zip`      |
| Windows x64      | `deno-x86_64-pc-windows-msvc.zip`    |

Deno publishes no Windows ARM64 build, so that platform is not supported.

## Methods

| Method    | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| `install` | Download and cache a Deno version, return the binary path            |
| `run`     | Run an arbitrary `deno` subcommand with the specified arguments      |
| `task`    | Run a named task from `deno.json` with optional extra arguments      |

## Resources

| Resource        | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `installResult` | Binary path, version, and platform info from an install         |
| `commandResult` | stdout, stderr, exit code, and command string from an execution |

## License

AGPL-3.0 with Swamp Exception — see LICENSE.txt for details.
