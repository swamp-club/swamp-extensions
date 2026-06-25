# @swamp/cve/researcher

Daily CVE research pipeline that queries public vulnerability databases,
classifies findings by real-world impact, and scores each for actionability
to surface the CVEs that matter — supply-chain compromises, infrastructure
vulnerabilities, and actively exploited threats.

Designed to run as a daily cron job via GitHub Actions, with results posted
to Discord and rendered as a GitHub Actions job summary.

## Installation

```bash
swamp extension pull @swamp/cve/researcher
```

This also pulls the `@keeb/discord` dependency for Discord notifications.

## Sources

| Source | What it provides |
|---|---|
| [NVD](https://nvd.nist.gov/) | CVSS-scored vulnerabilities from the National Vulnerability Database |
| [GitHub Advisory DB](https://github.com/advisories) | Security advisories with package ecosystem context |
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) | Known Exploited Vulnerabilities — actively exploited in the wild |

## Classification

Each CVE is classified into one of five buckets:

| Classification | What it means | Reported? |
|---|---|---|
| Supply Chain | Compromised packages, malicious code injection | Full detail |
| Infrastructure | Kernel, network gear, OS-level vulnerabilities | Full detail |
| Open-Source Library | Vulnerabilities in npm/pip/go/maven/etc packages | Full detail |
| Vendor Product | Bugs in commercial products (JetBrains, Splunk, etc) | Summary only |
| Web App / CMS | WordPress/Joomla plugin vulnerabilities | Summary only |

## Actionability Scoring

Each CVE is scored on three dimensions (0-3 each):

- **Impact** — How many systems/users are affected?
- **Scannable** — Can exposure be detected programmatically?
- **Remediation** — Are there steps beyond just updating?

Total score determines the recommendation:

| Score | Recommendation | Meaning |
|---|---|---|
| 7+ | Extension Candidate | Build a dedicated swamp scanner (like dirtyfrag or mini-shai-hulud) |
| 4-6 | Monitor | Track, but standard patching may suffice |
| <4 | Patch Only | Update and move on |

## Methods

| Method | Description |
|---|---|
| `research` | Query NVD, GitHub Advisory DB, and CISA KEV for HIGH/CRITICAL CVEs within a configurable lookback window |

## Usage

### Setup

```bash
swamp repo init
swamp extension pull @swamp/cve/researcher
swamp model create @swamp/cve/researcher cve-watcher
swamp model create @keeb/discord/webhook discord-cve-alerts
```

### Run a scan

```bash
# Default 1-day lookback
swamp model method run cve-watcher research

# 7-day lookback
swamp model method run cve-watcher research --input lookbackDays=7
```

### View the report

```bash
swamp data get cve-watcher report-swamp-cve-researcher-report
```

### Run the full workflow (scan + Discord notification)

```bash
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
export NVD_API_KEY="your-key"  # optional, for higher rate limits
swamp workflow run @swamp/cve/researcher
```

### GitHub Action

```yaml
name: CVE Research
on:
  schedule:
    - cron: '0 8 * * *'
  workflow_dispatch:
    inputs:
      lookbackDays:
        description: 'Days to look back'
        default: '1'
        type: string

jobs:
  cve-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install swamp
        run: curl -fsSL https://get.swamp.dev | sh
      - name: Run CVE research
        env:
          NVD_API_KEY: ${{ secrets.NVD_API_KEY }}
          DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}
        run: |
          swamp workflow run @swamp/cve/researcher \
            --input '{"lookbackDays": ${{ inputs.lookbackDays || 1 }}}' \
            --json
      - name: Write report to job summary
        run: |
          swamp data get cve-watcher report-swamp-cve-researcher-report --json \
            | jq -r '.content' >> "$GITHUB_STEP_SUMMARY"
```

## Inputs

| Input | Default | Description |
|---|---|---|
| `lookbackDays` | `1` | How many days back to include in the report |
| `severityThreshold` | `HIGH` | Minimum severity (`HIGH` or `CRITICAL`) |
| `keywords` | (none) | Optional keyword filter for CVEs |
| `maxResultsPerSource` | `40` | Max CVE records to fetch per source |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NVD_API_KEY` | No | NVD API key for higher rate limits ([request one here](https://nvd.nist.gov/developers/request-an-api-key)) |
| `DISCORD_WEBHOOK_URL` | For workflow | Discord webhook URL for the notification step |

## Dependencies

- [`@keeb/discord`](https://github.com/keeb/swamp-discord) — Discord webhook integration (pulled automatically)

## License

AGPLv3 — see [LICENSE.txt](LICENSE.txt)
