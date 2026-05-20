# @swamp/ssh

Run commands, copy files, and open port forwards across a declared set of hosts
over SSH. Define the hosts once on the model, then target any subset with a CEL
expression (`'"prod" in host.tags'`), an explicit name list, or `all`. Every
host runs in parallel and records its own result resource, so individual
outcomes are auditable and workflows can gate on them.

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

Run methods. Every selector-taking method **requires** a `hosts` argument
(there is no default — see [Selectors](#selectors)):

```bash
swamp model method run awesome open --input hosts=all --json
swamp model method run awesome exec \
  --input hosts='"prod" in host.tags' \
  --input command='uptime' --json
```

Method arguments are passed as `--input key=value` on the CLI (use
`--input 'key:json=[…]'` for arrays/objects), or as an `arguments:` map in a
workflow step.

## Configuration shape

### `globalArguments`

| Field             | Default            | Notes |
| ----------------- | ------------------ | ----- |
| `name`            | (required)         | Model instance name. |
| `transport`       | (required)         | Fleet-default transport. Discriminated on `kind`. |
| `hosts`           | (required, ≥1)     | Array of host records. Each may shallow-override `transport` and supply `attrs`. |
| `defaultParallel` | `8`                | Max concurrent hosts per method call. Per-call override available. |
| `defaultTimeoutSec` | `300`            | Per-host timeout. Per-call override available. |
| `failFast`        | `false`            | Stop scheduling new hosts on first failure (in-flight processes complete). |
| `captureOutput`   | `true`             | Buffer stdout/stderr into the `run-*` resource. No cap. Per-call override available. |
| `runHistory`      | `50`               | gc setting for `runResult` resources. |
| `sshBinary`       | `"ssh"`            | Test seam — point at a fake script in tests. |
| `scpBinary`       | `"scp"`            | Same. |
| `rsyncBinary`     | `"rsync"`          | Same. |
| `tailscaleBinary` | `"tailscale"`      | Same. |
| `sshpassBinary`   | `"sshpass"`        | Only consulted for `auth.kind: password`. |

### Transport — `kind: ssh`

| Field                    | Notes |
| ------------------------ | ----- |
| `user`                   | Remote login user. |
| `port`                   | TCP port. Defaults to 22. |
| `auth`                   | `{kind:"key"}` (default) or `{kind:"password", password: …}`. See [Authentication](#authentication). |
| `identityFile`           | Path to a private key. Passed as `-i <file>` whenever set. |
| `identityAgent`          | Path to an SSH agent socket (e.g. `~/.1password/agent.sock`). |
| `identitiesOnly`         | If `true`, sets `IdentitiesOnly=yes` (refuse agent fallback). |
| `knownHostsFile`         | Path to `known_hosts`. |
| `strictHostKeyChecking`  | One of `"yes"`, `"accept-new"`, `"no"`, `"off"`. |
| `connectTimeoutSec`      | Sets `ConnectTimeout`. Default 10s. |
| `serverAliveIntervalSec` | Sets `ServerAliveInterval`. |
| `proxyJump`              | `-J <user@bastion[,user@bastion2]>`. |
| `proxyCommand`           | Raw `ProxyCommand` string (e.g. SSM/IAP wrappers). |
| `extraOptions`           | Array of `Foo=Bar` strings appended via `-o`. |
| `controlMaster`          | `{enabled: bool, persistSec: number}`. |

### Transport — `kind: tailscale`

| Field             | Notes |
| ----------------- | ----- |
| `user`            | Remote login user. |
| `tailscaleBinary` | Override the tailscale CLI binary for this host. |
| `sshExtraArgs`    | Array of extra args passed to `tailscale ssh`. |

A host's `transport` field is a partial shallow override of the fleet
default. The `kind` is allowed to differ, so a single fleet can mix
OpenSSH and Tailscale members.

### Host

| Field       | Required | Notes |
| ----------- | -------- | ----- |
| `name`      | yes      | Used as the logical identifier in selectors and resource names. |
| `address`   | yes      | Hostname / IP / tailnet name. |
| `tags`      | no       | `string[]` — available to CEL selectors as `host.tags`. |
| `attrs`     | no       | Free-form `Record<string, unknown>` — available as `host.attrs.*`. |
| `transport` | no       | Partial override of the fleet-default transport. |
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
```

### `auth.kind: "password"`

Wraps every `ssh` / `scp` / `rsync` call in `sshpass -e`. The password is
provided via `${{ vault.get('<vault>', '<key>') }}`. Swamp's vault expression
evaluator resolves the value during definition evaluation and hands the
literal string to the model as part of `globalArguments`. The runner then:

- never writes the password to `runResult.args` — only the method arguments
  (command, src/dst, …) are recorded there, and the password lives in
  `globalArguments`, not method args;
- places the password in the spawned process's `SSHPASS` env var, **never**
  in argv (so it can't appear in `runResult.argv` either);
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
password auth and `sshpassBinary` is not resolvable on `PATH`. (Checks see
only the fleet definition, not the per-call selection, so this is scoped to
the whole fleet.)

## Selectors

Three forms, all valid for the `hosts` argument on every selector-taking
method:

```yaml
hosts: all                                # every host in the fleet
hosts: [web-1, web-2]                     # exact name list
hosts: '"prod" in host.tags'              # bare CEL string, evaluated per host
```

CEL variables visible to a selector:

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

Missing `host.attrs.<key>` references make the host not match; a debug-level
log line names the host and the missing key. A malformed expression, or a
selector that matches no hosts, fails the method with a clear error before
any connection is attempted (validated when the method runs — swamp does not
pass method arguments to pre-flight checks).

## Methods

### `apply`

Synchronizes `host-<name>` resources with the current `hosts[]`. Writes one
`host` resource per entry and deletes stale `host-*` resources whose names
have disappeared from `hosts[]` since the last apply. Idempotent — safe to
re-run.

### `open` / `check` / `close`

ControlMaster lifecycle. For `ssh` hosts: `open` issues
`ssh -fN -o ControlMaster=yes`, `check` runs `ssh -O check`, `close` runs
`ssh -O exit`. For `tailscale` hosts there is no master — `open`/`close` are
recorded as no-op `ok`, and `check` probes by running `true` over
`tailscale ssh`. `open` also no-ops for `ssh` hosts with `controlMaster.enabled: false`.
Each selected host emits a `masterAudit-<host>` event.

### `exec`

```yaml
arguments:
  hosts: '"prod" in host.tags'
  command: systemctl reload nginx
  sudo: true            # prefixes `sudo -n --`
  stdin: |              # optional, fed to the remote process's stdin
    optional stdin
```

Writes one `run-exec-<host>` per matched host.

### `script`

```yaml
arguments:
  hosts: all
  script: |
    set -euo pipefail
    apt-get update
    apt-get install -y nginx
  interpreter: bash     # default sh
  sudo: true
```

Pipes the script over stdin to `sh -s --` (or chosen interpreter), so the
model never constructs a remote command line.

### `copy`

```yaml
arguments:
  hosts: '"web" in host.tags'
  src: ./nginx.conf
  dst: /etc/nginx/nginx.conf
  direction: to         # "to" or "from"
  recursive: false
  useRsync: false       # default scp; rsync when true
```

### `forward`

```yaml
arguments:
  hosts: [web-1]
  action: open          # "open" | "cancel" | "list"
  spec: "9090:localhost:9090"
  type: L               # "L" (local→remote) or "R" (remote→local)
```

For `ssh` transport: `ssh -O forward / -O cancel` against the master.
For `tailscale`: spawns a detached `tailscale ssh -N -L <spec>` child,
records the pid in a `forwardState` resource; `cancel` kills the pid.
`list` reads the recorded `forwardState` resources for the selected hosts.

## Output capture

`captureOutput: true` (the default, set on `globalArguments` or per call)
buffers stdout/stderr in memory and writes them verbatim to the
`runResult.stdout` / `runResult.stderr` fields. No cap, no truncation.

`captureOutput: false` lets stdout/stderr stream through to the runner's
own stdout/stderr (`Deno.Command` with `stdout: "inherit"`); only exit
code and timing reach the resource.

## Resources

| Name           | Cardinality                       | gc                | Notes |
| -------------- | --------------------------------- | ----------------- | ----- |
| `host`         | one per host in `hosts[]`         | 10                | Written by `apply`; tagged `{fleet: <globalArguments.name>}`. |
| `runResult`    | one per (method, host, call)      | `runHistory` (50) | Per-host result. Instance name `run-<method>-<host>`. |
| `forwardState` | one per (host, type, spec)        | 50                | pid for tailscale; ControlPath for ssh. |
| `masterAudit`  | append per host                   | 100               | `open` / `check` / `exit` events. |

## License

GNU Affero General Public License v3, with the Swamp Extension and
Definition Exception. See `LICENSE.txt`.
