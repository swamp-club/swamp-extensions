# @swamp/ssh

Run commands, copy files, and open port forwards across a declared set of hosts
over SSH. Define the hosts once on the model, then target any subset by host
name or tag (`controlplane`), an explicit name list, a CEL expression
(`'cel:"prod" in host.tags'`), or `all`. Every host runs in parallel and records
its own result resource, so individual outcomes are auditable and workflows can
gate on them.

OpenSSH targets reuse long-lived connections via ControlMaster; Tailscale SSH
targets authenticate with tailnet identity and bypass multiplexing. Hosts can
mix both transports in one fleet, and each host can override the fleet defaults
(user, port, identity, proxy jump, auth mode, and more).

## Installation

```sh
swamp extension pull @swamp/ssh
```

## Quick start

Create the fleet instance, then author its `globalArguments`:

```bash
swamp model create @swamp/ssh awesome
swamp model edit awesome      # author globalArguments (shape below)
```

`globalArguments` for the `awesome` fleet:

```yaml
name: awesome
transport:
  kind: ssh
  user: deploy
  identityFile: ~/.ssh/awesome_ed25519
  controlMaster: { enabled: true, persistSec: 600 }
hosts:
  - name: web-1
    address: web-1.prod.example.com
    tags: [web, prod]
    attrs: { region: us-east-1 }
  - name: edge-1
    address: edge-1
    tags: [edge, prod]
    transport: { kind: tailscale, user: deploy }
```

Run methods. Every selector-taking method **requires** a `hosts` argument (there
is no default — see [Selectors](#selectors)):

```bash
swamp model method run awesome open --input hosts=all --json
swamp model method run awesome exec \
  --input hosts='tag:prod' \
  --input command='uptime' --json
```

Method arguments are passed as `--input key=value` on the CLI (use
`--input 'key:json=[…]'` for arrays/objects), or as an `arguments:` map in a
workflow step.

## Configuration shape

### `globalArguments`

| Field               | Default        | Notes                                                                                |
| ------------------- | -------------- | ------------------------------------------------------------------------------------ |
| `name`              | (required)     | Model instance name.                                                                 |
| `transport`         | (required)     | Fleet-default transport. Discriminated on `kind`.                                    |
| `hosts`             | (required, ≥1) | Array of host records. Each may shallow-override `transport` and supply `attrs`.     |
| `defaultParallel`   | `8`            | Max concurrent hosts per method call. Per-call override available.                   |
| `defaultTimeoutSec` | `300`          | Per-host timeout. Per-call override available.                                       |
| `failFast`          | `false`        | Stop scheduling new hosts on first failure (in-flight processes complete).           |
| `captureOutput`     | `true`         | Buffer stdout/stderr into the `run-*` resource. No cap. Per-call override available. |
| `runHistory`        | `50`           | gc setting for `runResult` resources.                                                |
| `sshBinary`         | `"ssh"`        | Test seam — point at a fake script in tests.                                         |
| `scpBinary`         | `"scp"`        | Same.                                                                                |
| `rsyncBinary`       | `"rsync"`      | Same.                                                                                |
| `tailscaleBinary`   | `"tailscale"`  | Same.                                                                                |
| `sshpassBinary`     | `"sshpass"`    | Only consulted for `auth.kind: password`.                                            |

### Transport — `kind: ssh`

| Field                    | Notes                                                                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user`                   | Remote login user.                                                                                                                                                   |
| `port`                   | TCP port. Defaults to 22.                                                                                                                                            |
| `auth`                   | `{kind:"key"}` (default) or `{kind:"password", password: …}`. See [Authentication](#authentication).                                                                 |
| `identityFile`           | Path to a private key. Passed as `-i <file>` whenever set. Mutually exclusive with `identityContent`.                                                                |
| `identityContent`        | PEM private key content (e.g. from `vault.get()`). Written to a temp file (mode 0600) for the session and removed afterward. Mutually exclusive with `identityFile`. |
| `identityAgent`          | Path to an SSH agent socket (e.g. `~/.1password/agent.sock`).                                                                                                        |
| `identitiesOnly`         | If `true`, sets `IdentitiesOnly=yes` (refuse agent fallback).                                                                                                        |
| `knownHostsFile`         | Path to `known_hosts`.                                                                                                                                               |
| `strictHostKeyChecking`  | One of `"yes"`, `"accept-new"`, `"no"`, `"off"`.                                                                                                                     |
| `connectTimeoutSec`      | Sets `ConnectTimeout`. Default 10s.                                                                                                                                  |
| `serverAliveIntervalSec` | Sets `ServerAliveInterval`.                                                                                                                                          |
| `proxyJump`              | `-J <user@bastion[,user@bastion2]>`.                                                                                                                                 |
| `proxyCommand`           | Raw `ProxyCommand` string (e.g. SSM/IAP wrappers).                                                                                                                   |
| `extraOptions`           | Array of `Foo=Bar` strings appended via `-o`.                                                                                                                        |
| `controlMaster`          | `{enabled: bool, persistSec: number}`.                                                                                                                               |

### Transport — `kind: tailscale`

| Field             | Notes                                            |
| ----------------- | ------------------------------------------------ |
| `user`            | Remote login user.                               |
| `tailscaleBinary` | Override the tailscale CLI binary for this host. |
| `sshExtraArgs`    | Array of extra args passed to `tailscale ssh`.   |

A host's `transport` field is a partial shallow override of the fleet default.
The `kind` is allowed to differ, so a single fleet can mix OpenSSH and Tailscale
members.

### Host

| Field       | Required | Notes                                                              |
| ----------- | -------- | ------------------------------------------------------------------ |
| `name`      | yes      | Used as the logical identifier in selectors and resource names.    |
| `address`   | yes      | Hostname / IP / tailnet name.                                      |
| `tags`      | no       | `string[]` — available to CEL selectors as `host.tags`.            |
| `attrs`     | no       | Free-form `Record<string, unknown>` — available as `host.attrs.*`. |
| `transport` | no       | Partial override of the fleet-default transport.                   |
| `env`       | no       | `Record<string, string>` — sent to the remote shell via `SendEnv`. |

## Authentication

### `auth.kind: "key"` (default)

Standard OpenSSH behavior. With `identityFile` set, the runner passes
`-i <file>`. Without `identityFile`, the SSH agent at `$SSH_AUTH_SOCK` is
consulted. Set `identityAgent` to point at a different agent socket (1Password,
yubikey-agent, per-fleet agent). Set `identitiesOnly: true` to refuse agent
fallback when an `identityFile` is provided.

```yaml
# Agent at $SSH_AUTH_SOCK (the default)
transport: { kind: ssh, user: deploy }

# 1Password agent
transport:
  kind: ssh
  user: deploy
  identityAgent: ~/.1password/agent.sock

# Key file, agent ignored
transport:
  kind: ssh
  user: deploy
  identityFile: ~/.ssh/awesome_ed25519
  identitiesOnly: true

# Inline key content from a vault (no file on disk)
transport:
  kind: ssh
  user: deploy
  identityContent: ${{ vault.get('my-vault', 'SSH_PRIVATE_KEY') }}
  identitiesOnly: true
```

When `identityContent` is set, the runner writes the PEM body to a temporary
file (mode 0600), passes it as `-i <tmpfile>` for the SSH session, and removes
the file when the method completes. The key never appears in argv or persisted
resources. This is the recommended approach for vault-stored private keys — no
external scripting or pre-loaded ssh-agent required.

`identityFile` and `identityContent` are mutually exclusive. Setting both is a
validation error. Setting neither is fine — the SSH agent is consulted.

### `auth.kind: "password"`

Wraps every `ssh` / `scp` / `rsync` call in `sshpass -e`. The password is
provided via `${{ vault.get('<vault>', '<key>') }}`. Swamp's vault expression
evaluator resolves the value during definition evaluation and hands the literal
string to the model as part of `globalArguments`. The runner then:

- never writes the password to `runResult.args` — only the method arguments
  (command, src/dst, …) are recorded there, and the password lives in
  `globalArguments`, not method args;
- places the password in the spawned process's `SSHPASS` env var, **never** in
  argv (so it can't appear in `runResult.argv` either);
- relies on ControlMaster to amortize auth — once the master is open,
  multiplexed calls don't re-prompt.

```yaml
transport:
  kind: ssh
  user: deploy
  auth:
    kind: password
    password: ${{ vault.get('hosts-vault', 'WEB_PASSWORD') }}
```

A `sshpass-available` pre-flight check fails if any host in the fleet uses
password auth and `sshpassBinary` is not resolvable on `PATH`. (Checks see only
the fleet definition, not the per-call selection, so this is scoped to the whole
fleet.)

## Selectors

Valid forms for the `hosts` argument on every selector-taking method:

```yaml
hosts: all # every host in the fleet
hosts: [web-1, web-2] # exact name list
hosts: controlplane # bare: host name first, then tag
hosts: name:controlplane-fsn1-0 # explicit host name
hosts: tag:controlplane # explicit tag
hosts: 'cel:"prod" in host.tags' # CEL predicate, evaluated per host
```

A **bare string** resolves to an exact host name first, then (if no name
matches) to hosts carrying that tag. Use the `name:` / `tag:` prefixes to
disambiguate when a host name collides with a tag value — a bare token always
prefers the name. Use the `cel:` prefix for a predicate.

> **Deprecated:** a bare string that is a CEL expression (no `cel:` prefix, e.g.
> `'"prod" in host.tags'`) is still evaluated as CEL for backward compatibility,
> but logs a deprecation warning and will error in a future version. Add the
> `cel:` prefix.

CEL variables visible to a `cel:` selector:

```
host.name        : string
host.address     : string
host.port        : int
host.user        : string                 # post-merge effective user
host.tags        : list<string>
host.transport   : string                 # "ssh" | "tailscale"
host.env         : map<string, string>
host.attrs       : map<string, dyn>
```

Bundled CEL functions:

- `matchesRegex(s, pat)` — JavaScript-regex test against `s`.
- `cidrContains(cidr, addr)` — true if `addr` is inside `cidr` (IPv4 or IPv6).

Missing `host.attrs.<key>` references make the host not match; a debug-level log
line names the host and the missing key. A malformed expression, or a selector
that matches no hosts, fails the method with a clear error before any connection
is attempted (validated when the method runs — swamp does not pass method
arguments to pre-flight checks). The [`resolve`](#resolve) method is the one
exception to the empty-match rule: it records zero matches as data
(`count: 0`) instead of failing — a malformed expression still fails it.

## Methods

### `apply`

Synchronizes `host-<name>` resources with the current `hosts[]`. Writes one
`host` resource per entry and deletes stale `host-*` resources whose names have
disappeared from `hosts[]` since the last apply. Idempotent — safe to re-run.

### `resolve`

```yaml
arguments:
  hosts: tag:prod # any selector form — see Selectors above
```

Resolves the selector against the fleet and records the answer as data —
nothing is spawned, no connection is made. Writes one `selection` resource
named `resolve-<hash>`, where the hash is stable per selector so repeated
resolves version the same resource instead of proliferating. The resource
contains the normalized selector text, the match `count`, and one record per
matched host with `name`, `address`, `port` (ssh only), `user`, `tags`,
`attrs`, and `transport` — never credential material (auth, identity files or
content, proxy settings).

**Zero matches is a success**, not an error: the resource records an empty
`hosts` list with `count: 0`. That is the structured "matched nothing" answer
the connecting methods cannot give — they throw on an empty selection, and
still do. A malformed selector (e.g. bad CEL) still fails the method.

The write is tagged `{fleet, method: "resolve", count}` (string values), so a
`runModel` caller can gate on zero matches straight off the returned handle,
without reading resource content:

```ts
const run = await ctx.runModel?.({
  definition: "awesome",
  method: "resolve",
  arguments: { hosts: "tag:prod" },
});
if (!run) throw new Error("runModel is unavailable in this context");
if (!run.ok) throw new Error(`resolve failed: ${run.error.message}`);

if (run.resources[0].tags.count === "0") {
  // Nothing matched — skip the rollout instead of erroring.
}
const selection = await ctx.readResource(run.resources[0].name);
// selection.hosts: [{ name, address, port?, user?, tags, attrs, transport }]
```

Use it for planning and per-host templating downstream (the member list plus
each host's `attrs`/`tags`), or to gate a workflow on "does `tag:prod` match
anything?" before acting.

```bash
swamp model method run awesome resolve --input hosts='tag:prod' --json
```

### `open` / `check` / `close`

ControlMaster lifecycle. For `ssh` hosts: `open` issues
`ssh -fN -o ControlMaster=yes`, `check` runs `ssh -O check`, `close` runs
`ssh -O exit`. For `tailscale` hosts there is no master — `open`/`close` are
recorded as no-op `ok`, and `check` probes by running `true` over
`tailscale ssh`. `open` also no-ops for `ssh` hosts with
`controlMaster.enabled: false`. Each selected host emits a `masterAudit-<host>`
event.

### `exec`

```yaml
arguments:
  hosts: 'cel:"prod" in host.tags'
  command: systemctl reload nginx
  sudo: true # escalates the whole command, see "sudo" below
  stdin: | # optional, fed to the remote process's stdin
    optional stdin
  okExitCodes: [0, 1] # optional, see "Exit codes" below
```

Writes one `run-exec-<host>` per matched host. Fails the method when any host
exits non-zero, is killed by a signal, or fails to spawn — RunResult resources
are written before the error is raised. `okExitCodes` widens which exit codes
count as success.

#### sudo

`sudo: true` runs the entire command as root, non-interactively (`sudo -n`):

- A plain command — words made of letters, digits, and `_ - . / : @ % + , =`
  (no word starting with `=`) separated by single spaces — is sent as
  `sudo -n -- <command>`, e.g. `sudo -n -- systemctl reload nginx`. Sudoers
  rules that allow only specific binaries keep working.
- Anything using shell syntax (`;`, `&&`, `||`, `|`, redirects, quotes, `$`,
  globs, `~`, newlines, …) is sent as `sudo -n -- sh -c '<command>'`, so every
  statement, redirect, and expansion runs in the escalated shell. `~` and
  variables therefore expand as root, the command runs under POSIX `sh` rather
  than your login shell, and a sudoers policy scoped to specific binaries must
  also allow `sh` — otherwise sudo fails with "a password is required". Use
  `script` with `interpreter: bash` for bash-only syntax.
- Variables forwarded with `env` (host or per-call) would otherwise be dropped
  by sudo's `env_reset` before the escalated shell expands them, so a wrapped
  command re-exports the ones it references as `$APP` or `${APP…}`:
  `sudo -n -- env "APP=$APP" sh -c '...'`. Your login shell expands `$APP`
  exactly as it did before wrapping; a forwarded variable the server did not
  accept arrives empty. Like any value expanded into a sudo command line,
  re-exported values appear in sudo's log and the remote process list, so
  forwarded variables the command does not reference are never re-exported —
  and do not reach the escalated command. Keys that aren't shell identifiers,
  and the main variables sudo resets for safety (`PATH`, `HOME`, `SHELL`,
  `IFS`, `ENV`, `BASH_ENV`, `LD_*`, `DYLD_*`), are not re-exported either. A
  sudoers policy scoped to specific binaries then also needs to allow `env`.
- The wrapped form assumes a POSIX-compatible login shell (sh, bash, zsh, dash,
  ksh) for the SSH user. csh/tcsh fail loudly instead of running anything
  unprivileged: they reject a multi-line command and abort when a forwarded
  variable is not set. fish silently alters backslashes, because it treats
  `\\` and `\'` inside single quotes as escapes. Use `script` for multi-line
  or backslash-containing commands on those hosts.

### `script`

```yaml
arguments:
  hosts: all
  script: |
    set -euo pipefail
    apt-get update
    apt-get install -y nginx
  interpreter: bash # default sh
  sudo: true
  okExitCodes: any # optional, see "Exit codes" below
```

Pipes the script over stdin to `sh -s --` (or chosen interpreter), so the model
never constructs a remote command line. Fails the method on non-zero exit (same
semantics as `exec`), and takes the same `okExitCodes` argument.

### `copy`

```yaml
arguments:
  hosts: tag:web
  src: ./nginx.conf
  dst: /etc/nginx/nginx.conf
  direction: to # "to" or "from"
  recursive: false
  useRsync: false # default scp; rsync when true
```

Fails the method on non-zero exit (same semantics as `exec`). There is no
`okExitCodes` here — a transfer either moved the bytes or it did not.

### `forward`

```yaml
arguments:
  hosts: [web-1]
  action: open # "open" | "cancel" | "list"
  spec: "9090:localhost:9090"
  type: L # "L" (local→remote) or "R" (remote→local)
```

For `ssh` transport: `ssh -O forward / -O cancel` against the master. For
`tailscale`: spawns a detached `tailscale ssh -N -L <spec>` child, records the
pid in a `forwardState` resource; `cancel` kills the pid. `list` reads the
recorded `forwardState` resources for the selected hosts.

### `collect-host-public-key`

```yaml
arguments:
  hosts: all
  hostKeyPath: /etc/ssh/ssh_host_ed25519_key.pub # default
```

Reads the specified public key file from each selected host over SSH, validates
it as a single OpenSSH public key line, extracts the key algorithm, and computes
its SHA256 fingerprint. Writes one `hostPublicKey-<host>` resource per host.

The method rejects private key content (`-----BEGIN`), multi-line output, empty
files, and unrecognized key algorithms. Use this to observe remote host key
material for host certificate workflows — the method reads and validates, it
does not sign or manage certificates.

```bash
swamp model method run awesome collect-host-public-key \
  --input hosts=all --json

# Query a single host's collected key
swamp data get awesome hostPublicKey-web-1 --json
```

Output resource fields:

| Field         | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `name`        | Host name from the fleet definition.                            |
| `host`        | Host address.                                                   |
| `user`        | SSH user (if set).                                              |
| `hostKeyPath` | Path to the key file that was read.                             |
| `publicKey`   | Full public key line (`<algo> <base64> [comment]`).             |
| `algorithm`   | Key algorithm (e.g. `ssh-ed25519`, `ssh-rsa`).                  |
| `fingerprint` | `SHA256:<base64>` fingerprint matching `ssh-keygen -lf` output. |
| `observedAt`  | ISO 8601 timestamp of collection.                               |

## Exit codes

A method fails when any selected host fails. A host fails when it exits with a
code that isn't allowed, is killed by a signal, or fails to spawn. By default
the only allowed code is `0`.

### `okExitCodes` — treating a non-zero exit as an answer

`exec` and `script` accept an optional `okExitCodes` that widens which exit
codes count as success:

| Value    | Meaning                                                                                                                                                  |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| omitted  | Only exit `0` succeeds. The default.                                                                                                                     |
| `[0, 1]` | Exit `0` and `1` succeed; everything else fails.                                                                                                         |
| `[1]`    | Exit `1` succeeds and exit `0` **fails** — the array _replaces_ the default, it does not extend it. List `0` explicitly whenever it is still acceptable. |
| `"any"`  | Every exit code succeeds.                                                                                                                                |

Codes must be integers in `0..255` and the array must be non-empty; anything
else is rejected before a connection is attempted. `copy`, `open`, `check`,
`close`, `forward`, and `collect-host-public-key` do not take the argument — for
those, a non-zero exit is never an answer you asked for.

Three things `okExitCodes` never suppresses, no matter its value:

- **Spawn failures** — the local `ssh`/`scp` binary could not be started.
- **Timeouts** — the host exceeded `timeoutSec` and was killed (`SIGTERM`).
- **Signal kills** — the process died by signal rather than exiting.

All three produce no exit status at all, so there is nothing for a guard command
to interpret; the host fails and the method throws. An _allowed_ exit code, by
contrast, is not a failure anywhere in the pipeline — in particular it does not
trip `failFast`, so the remaining hosts still run.

> **Prefer an explicit list over `"any"`.** OpenSSH reports _its own_ errors as
> exit `255` — an unreachable host, a rejected key, a DNS failure. Under
> `okExitCodes: "any"` those are indistinguishable from your command's own exit
> codes and the run reports success. `[0, 1]` says what you actually mean;
> `"any"` also swallows connection failures.

### Passing the argument

From the CLI, `okExitCodes` is a structured value, so use the `:json` suffix:

```bash
# Which hosts already have the config file? `test -f` answers 0 or 1.
swamp model method run awesome exec \
  --input hosts=all \
  --input command='test -f /etc/nginx/nginx.conf' \
  --input okExitCodes:json='[0, 1]' --json
```

In a workflow step it is ordinary YAML:

```yaml
arguments:
  hosts: all
  command: test -f /etc/nginx/nginx.conf
  okExitCodes: [0, 1]
```

### What `exec` and `script` return

Every selected host records its own `run-<method>-<host>` resource with the
verbatim `exitCode`, whether or not that code was allowed, and the method
returns one data handle per host in fleet order. An allowed non-zero exit leaves
the resource's `error` field unset — it was a successful run that answered "no".

Each handle carries the write's tags:

| Tag        | Value                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fleet`    | `globalArguments.name`.                                                                                                                                                              |
| `host`     | Host name from the fleet definition.                                                                                                                                                 |
| `method`   | `exec`, `script`, or `copy`.                                                                                                                                                         |
| `exitCode` | The exit code as a string (`"0"`, `"1"`, `"255"`). **Absent** when the process was killed by a signal or failed to spawn — there was no exit status, which is not the same as `"0"`. |

Tag values are always strings; compare against `"0"`, not `0`. swamp adds its
own `type`, `specName`, and `modelName` tags to the same map.

The resource's `args` field echoes back the `okExitCodes` you passed (and omits
the key entirely when you passed none), so the audit trail records which codes
the run was told to accept.

### Reading the result from another model

This is what `okExitCodes` exists for. `context.runModel()` returns the handles
on success but only `{ ok: false, error }` on failure — so a guard command whose
non-zero exit throws costs you the handles, and with them the race-free way to
read back exactly the resources this run wrote. Declaring the expected codes
keeps the run on the success path:

```ts
const run = await ctx.runModel?.({
  definition: "awesome", // or: modelType + name for direct execution
  method: "exec",
  arguments: {
    hosts: "all",
    command: "test -f /etc/nginx/nginx.conf",
    okExitCodes: [0, 1], // 1 means "absent", not "broken"
  },
});

if (!run) throw new Error("runModel is unavailable in this context");
if (!run.ok) throw new Error(`nginx.conf probe failed: ${run.error.message}`);

// run.resources is the DataHandle[] the method returned — one per host.
const missing = run.resources
  .filter((h) => h.tags.exitCode === "1")
  .map((h) => h.tags.host);
```

Branching on `h.tags.exitCode` needs no resource read at all. Fetch content only
when you want stdout:

```ts
const data = await ctx.readResource(run.resources[0].name);
```

Two constraints on the caller, both enforced by swamp rather than by this model:
the calling extension must list `@swamp/ssh` in its manifest `dependencies`
(cross-extension calls are authorized fail-closed), and `runModel` is
unavailable in remote execution contexts — keep the call in a local orchestrator
model or a workflow.

### Reading results from the CLI

The resources are written before any error is raised, so they are available
whether the method succeeded or failed:

```bash
# One host's full result — exitCode, signal, stdout, stderr, argv, timing.
swamp data get awesome run-exec-web-1 --json

# Browse the audit trail; the interactive picker filters by tag key/value.
swamp data query
```

In workflow CEL, `data.findByTag("host", "web-1")` and
`data.findByTag("fleet", "awesome")` select by the same tags.

### When a host genuinely fails

The method throws an aggregate naming only the hosts that actually failed, with
each one's reason and last line of stderr:

```
exec failed on 2/4 host(s): db-1 (exit 9: permission denied); web-3 (killed by SIGTERM)
```

Hosts skipped by `failFast` are recorded with a `skipped:` error and are not
counted as failures — they never ran.

### Recipes

| Command                     | `okExitCodes` | Why                                                         |
| --------------------------- | ------------- | ----------------------------------------------------------- |
| `test -f /path`             | `[0, 1]`      | 0 = present, 1 = absent.                                    |
| `command -v docker`         | `[0, 1]`      | 0 = installed, 1 = not found.                               |
| `grep -q pattern /etc/file` | `[0, 1]`      | 0 = match, 1 = no match (2 is a real error — leave it out). |
| `systemctl is-active nginx` | `[0, 3]`      | 0 = active, 3 = inactive/failed.                            |
| `diff -q a b`               | `[0, 1]`      | 0 = same, 1 = differs (2 = trouble).                        |
| `id -u deploy`              | `[0, 1]`      | 0 = user exists, 1 = does not.                              |

Note each of these lists the codes the command actually documents, and no others
— a code outside the list still fails the method, which is what you want when
the guard itself breaks.

## Output capture

`captureOutput: true` (the default, set on `globalArguments` or per call)
buffers stdout/stderr in memory and writes them verbatim to the
`runResult.stdout` / `runResult.stderr` fields. No cap, no truncation.

`captureOutput: false` lets stdout/stderr stream through to the runner's own
stdout/stderr (`Deno.Command` with `stdout: "inherit"`); only exit code and
timing reach the resource.

## Resources

| Name            | Cardinality                  | gc                | Notes                                                                                                                           |
| --------------- | ---------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `host`          | one per host in `hosts[]`    | 10                | Written by `apply`; tagged `{fleet: <globalArguments.name>}`.                                                                   |
| `runResult`     | one per (method, host, call) | `runHistory` (50) | Per-host result. Instance name `run-<method>-<host>`. Tagged `{fleet, host, method, exitCode}` — see [Exit codes](#exit-codes). |
| `forwardState`  | one per (host, type, spec)   | 50                | pid for tailscale; ControlPath for ssh.                                                                                         |
| `masterAudit`   | append per host              | 100               | `open` / `check` / `exit` events.                                                                                               |
| `hostPublicKey` | one per host                 | 10                | Written by `collect-host-public-key`. Raw key, algorithm, fingerprint.                                                          |
| `selection`     | one per distinct selector    | 10                | Written by `resolve`. Instance `resolve-<hash>`, stable per selector. Tagged `{fleet, method, count}`; no credential material.   |

## License

GNU Affero General Public License v3, with the Swamp Extension and Definition
Exception. See `LICENSE.txt`.
