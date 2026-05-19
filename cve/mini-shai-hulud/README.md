# @swamp/cve/mini-shai-hulud

Scans `deno.lock` and `package-lock.json` files for npm packages compromised
in the May 2026 **Mini Shai-Hulud** supply chain attack -- 317 packages hijacked
via the `atool` npm account.

The payload features credential harvesting, dual exfiltration channels, and
persistence mechanisms targeting AI agents and CI/CD systems. High-impact
packages include size-sensor (4.2M downloads/month), echarts-for-react (3.8M),
@antv/scale (2.2M), and timeago.js (1.15M).

See the
[SafeDep advisory](https://safedep.io/mini-shai-hulud-strikes-again-314-npm-packages-compromised/)
for the full disclosure.

## Installation

```bash
swamp extension pull @swamp/cve/mini-shai-hulud
```

Or clone this repo and the model is discovered automatically from
`extensions/models/`.

## What It Checks

All 317 packages and their known malicious versions from the SafeDep advisory.
The compromised version list is embedded -- no network calls required.

Supports two lockfile formats:

| Format | How packages are extracted |
|---|---|
| `deno.lock` | Parses the `npm` section (npm packages installed via `npm:` specifiers) |
| `package-lock.json` | Parses `packages` (v2/v3) or `dependencies` (v1) |

## Methods

| Method | Description |
|---|---|
| `scan` | Scan a lockfile and report each package as `clean` or `COMPROMISED` |

## Usage

### Scan a lockfile (quickest)

```bash
swamp model method run @swamp/cve/mini-shai-hulud scan \
  --global-arg lockfilePath=./deno.lock
```

The `@type` prefix auto-creates the model instance. No `swamp model create`
needed.

### Scan a package-lock.json

```bash
swamp model method run @swamp/cve/mini-shai-hulud scan \
  --global-arg lockfilePath=/path/to/package-lock.json
```

Full paths work -- the lockfile does not need to be local to the swamp repo.

### Scan with a named instance

If you want to keep results around or scan multiple lockfiles:

```bash
swamp model create @swamp/cve/mini-shai-hulud npm-check \
  --global-arg lockfilePath=./package-lock.json

swamp model method run npm-check scan

# Scan a different lockfile using the same instance
swamp model method run npm-check scan \
  --input lockfilePath=/other/project/deno.lock
```

### View results

```bash
# List all scan data
swamp data list npm-check --json

# Get structured scan result
swamp data get npm-check <label> --json | jq .content
```

## Report Output

The report renders a table of every package with a clear verdict at the end:

```
| Package              | Version  | Status      |
| -------------------- | -------- | ----------- |
| @antv/g2             | 5.5.8    | COMPROMISED |
| lodash               | 4.17.21  | clean       |
| size-sensor          | 1.0.4    | COMPROMISED |
| zod                  | 4.3.6    | clean       |

---

## VULNERABLE

**2** of **4** package(s) compromised in the May 2026 Mini Shai-Hulud attack.
```

A clean scan shows:

```
---

## CLEAN

**935** packages scanned. No compromised packages found.
```

## Scope

This scanner covers **npm registry poisoning** only. The attack targeted npm
packages published under the hijacked `atool` account:

- **npm lockfiles** (`package-lock.json`) -- directly affected
- **deno lockfiles** (`deno.lock`) -- affected if any `npm:` imports resolve to
  compromised packages
- **JSR packages** -- not affected (different registry, different publish
  pipeline)

## Prerequisites

- `swamp` initialized in the repository (`swamp repo init`)
- A `deno.lock` or `package-lock.json` file to scan
- No network access required -- the compromised package list is embedded

## License

AGPLv3
