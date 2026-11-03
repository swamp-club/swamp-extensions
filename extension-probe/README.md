# @swamp/extension-probe

Pull a swamp extension into a sandbox, describe its behavior types, and run
every method blind. The probe records what each method did and which methods it
could not get to run. It is the runtime half of an extension supply-chain
review; static analysis is the other half.

v1 probes behaviors (models) only, from the `@skunk-ape` and `@swamp`
collectives. Vaults, datastores, reports, webhooks and grafts onto other types
are not probed.

## What one probe does

1. **Builds a box**: a throwaway directory holding a fresh swamp repo, a fake
   home, a logging stub, and a temp dir.
2. **Plants canaries**: fake AWS, SSH, npm, GitHub, `.netrc`, Anthropic and
   OpenAI credentials in the fake home and environment, each with a random
   marker.
3. **Pulls the target** inside the sandbox. Pulling runs the extension's
   top-level code, so it never happens outside. Only the registry hosts are
   reachable; any other host is recorded.
4. **Describes each type** and runs every method in rounds: empty, required
   fields only, all fields, then boundary values. It stops at the first round
   that succeeds (`allRounds` runs them all). Each run uses its own definition,
   so no state carries between runs.
5. **Observes** each step: the run's outcome and data, every network attempt
   (method runs may reach nothing), files created or changed in the box, and
   every stub call.
6. **Classifies** what it saw into `kind: findings`.

Every argument that looks like a path to a program (`claudePath`, `gitBin`,
`command`) points at the logging stub, in every round. On method runs, common
command names (`claude`, `curl`, `aws`, `docker`, `ssh` and more, but not `git`, which swamp itself runs; see
`stubCommands`) resolve to the stub too. The stub records argv, cwd and stdin,
prints `ok`, and exits 0. Nothing real runs.

## Findings

| Category | Severity | Rule |
| --- | --- | --- |
| `canary-seen` | critical | A canary's marker turned up in a stub call, written data, an error message, a method's output, a file written in the box, or a request. |
| `sandbox-key-exposed` | critical | The sandbox account's key or signin token turned up in the same places, swamp's own auth cache excepted. Rotate it. |
| `probe-incomplete` | high | A setup step (init, info, pull, describe) failed, so the extension was not exercised. Never clean. |
| `network-unobserved` | high | nono's audit trail could not be read for a step, so its network attempts are unknown. Never clean. |
| `unexpected-host` | high | A setup step (init, info, pull, types, describe) contacted a host outside `registryHosts`. |
| `persistence-write` | high | A file in the box home was created or changed outside swamp's own paths, or a method wrote agent configuration in the repo (`.claude/`, `CLAUDE.md`, `AGENTS.md`, `.mcp.json` and similar). |
| `network-attempt` | medium | A method run tried to reach a host. Every attempt is refused. |
| `spawned-command` | medium | A method ran a stubbed command by name from PATH. |
| `sandbox-violation` | medium | nono reported a denial or violation. |
| `timeout` | medium | A step was killed at its timeout. |
| `skill-install` | low | The pull installed skills under `.claude/skills`. Review them with the static analysis. |
| `stub-call` | low | A method ran the stubbed tool path it was given. |
| `swamp-traffic` | low | A method run's refused attempt went to swamp-club itself, probably swamp's own. The archive host never counts. |
| `repo-write` | low | A method wrote a file in the repo outside `.swamp/`. |
| `coverage-gap` | low | A method never succeeded, so its behavior was not observed. |
| `not-observed` | low | External isolation: these checks were not made. |

Critical and high findings block (`clean: false`). Rules decide every finding.
A later review, by an agent or a person, may add findings but may never clear
a critical or high one.

## The sandbox account

swamp needs a swamp-club credential to run, and the probe must never hand the
box yours. Create a throwaway collective that holds nothing, and give it a
collective token with only the `extensions:read` scope:

```bash
swamp auth token create --collective <throwaway> --scopes extensions:read --name extension-probe
```

Store the API key in a vault and wire it to the probe:

```bash
swamp vault create local_encryption extension-probe-sandbox
swamp vault put extension-probe-sandbox SWAMP_API_KEY
swamp model create @swamp/extension-probe probe \
  --global-arg 'sandboxApiKey=${{ vault.get(extension-probe-sandbox, SWAMP_API_KEY) }}'
```

The token also prints a signin token. The probe does not need it: the init step
verifies the key with swamp-club and caches the proof in the box, which carries
the later steps that have no network. Leave it out so the box holds one secret
fewer, or pass it as `sandboxSigninToken` if you prefer.

Assume the extension under test can read the key: it runs in the same process
as the inner swamp. Treat it as a honeytoken. Any use of it from outside the
sandbox is a compromise, and a `sandbox-key-exposed` finding means rotate it.
The probe passes the key to the sandbox in the environment, never in argv, and
redacts it from everything it stores.

Run probes from a dedicated scratch repo, never one holding real work.

## Isolation

### `nono` (default, Linux)

Each step (init, info, pull, each describe, each method run) is its own
`nono run`:

- read-only: the swamp binary and the stub's `bin/`
- read-write: the box's home, temp dir, repo and stub log, and an empty
  per-step directory the probe uses to find that step's nono audit record
- never `/proc`
- a memory cap and a process cap
- all network through nono's proxy. Setup steps may reach `registryHosts`;
  method runs may reach nothing. nono's audit trail records every attempt,
  proxied or direct, with its host.

nono needs the operator's real `HOME` for its own state, so the probe runs nono
with it and a launcher inside the sandbox swaps in the box's home before swamp
starts.

The registry serves archives from `sfo3.digitaloceanspaces.com`, a host shared
by every DigitalOcean Spaces customer, so it is on the pull's allowlist. nono
allows by host, so a pull that sends data to some other bucket on that host is
not flagged.

The probe reads what the sandbox wrote (stub-call records, changed files) from
outside the sandbox, so it reads only regular files, never through a symlink the
code under test planted, and only up to a size cap.

If nono's audit trail cannot be read for a step (the lookup fails, finds no
session, or has no event list), the step is recorded as unobserved and the
probe blocks, rather than reporting no network.

**Limits.** The stub records its calls in a directory the sandbox must be able
to write, so code under test could delete a record it made during the same
step. Writes under the repo's `.swamp/` (swamp's own data) are not snapshotted.
A timeout stops the step's direct child; a descendant the target detached may
outlive the step, though nono still confines it to the box. Whether a method succeeded is read from swamp's JSON output, which
the method can also write to, so a method could fake its own success. That
affects coverage only: blocking findings come from nono's audit trail, file
snapshots and stub records. Landlock prevents reads and writes outside the box but does not
report them, so an attempt to touch your real home is blocked and not recorded.
Reads of planted canaries cannot be seen either. Only their use shows. DNS is not recorded. Lookups through the system resolver (`getaddrinfo`)
succeed, so data sent out in DNS queries would not show. Direct DNS queries
(`Deno.resolveDns`) fail, so a method that resolves hosts itself before
connecting stops there and never makes a connection to record. Generated URLs
use `example.com`, which resolves. Processes
a method spawns by absolute path, not through a stubbed name or tool-path
argument, run for real inside the sandbox and are not recorded.

### `external`: inside a sandbox you control

For callers who already run the whole probe inside their own sandbox, such as a
disposable VM. Each step runs swamp directly, with the same box, fake home,
canaries, stub and input rounds, but with no sandbox from this probe.

```bash
swamp model create @swamp/extension-probe probe \
  --global-arg 'sandboxApiKey=${{ vault.get(extension-probe-sandbox, SWAMP_API_KEY) }}' \
  --global-arg isolation=external \
  --global-arg "acknowledgeUnsandboxed=This process runs inside a sandbox I control, and the target extension's code will run with all of its permissions."
```

`acknowledgeUnsandboxed` must be exactly:

> This process runs inside a sandbox I control, and the target extension's code
> will run with all of its permissions.

Anything else is refused. In external mode, network attempts, unexpected hosts
on pull, sandbox violations and access outside the box are **not observed**: the
report lists them under `notObserved` and the findings carry a `not-observed`
entry saying so. Their absence is not a clean result. Read them from your own
sandbox's telemetry.

The outer swamp that runs the probe sits on the same machine as the extension
under test, so its credential is exposed too. Give the whole VM only the sandbox
account.

## Referee mode

A blind probe cannot guess every method's inputs. `start` opens a session from
a probe report and lists each method that never succeeded, with its last error,
description and schema. A driving agent submits new inputs through `record`:

```bash
swamp model method run probe start --input session=skunk-ape-stef
swamp model method run probe record \
  --input session=skunk-ape-stef \
  --input type=@skunk-ape/stef --input method=record \
  --input 'inputs={"text":"A draft."}' \
  --input 'before=[{"method":"start","inputs":{"text":"A draft."}}]'
```

Each `record` builds a fresh box, pulls the same version, runs the `before`
chain and then the method, all on one definition so state carries between them.
It updates the report, findings and session. Tool-path fields always point at
the stub, whatever the driver sends. Attempts stop at `maxAttempts`. Drive one
session at a time: two `record` calls run in parallel each read the session
before either writes it back.

## Data

| Resource | Name | Holds |
| --- | --- | --- |
| `report` | `report-<session>` | Every setup step and method run: inputs, outcome, network, file changes, stub calls, sightings. |
| `findings` | `findings-<session>` | The findings contract: `clean`, `blockingCount`, `findings`. |
| `session` | `session-<session>` | Referee state: gaps, attempts, history, next action. |

`<session>` defaults to the target's slug, such as `skunk-ape-stef`.
