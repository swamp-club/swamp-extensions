# @swamp/gcp/baremetalsolution

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
Google Cloud baremetalsolution resources.

Each model represents a single GCP resource. Models have **domain properties**
that you configure (the desired state) and **resource properties** that reflect
the live state in GCP. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by identifier
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from GCP
- **sync** — refresh all resource properties from the API

Use `swamp model type describe @swamp/gcp/baremetalsolution/instances` to see
the full list of configurable properties and available methods for this model.

## Authentication

Credentials are resolved in the following order:

1. **Access token** — `GCP_ACCESS_TOKEN` env var containing a pre-obtained
   OAuth2 access token (does **not** require `gcloud` CLI; also set
   `GCP_PROJECT` or `GOOGLE_CLOUD_PROJECT`)
2. **Inline JSON** — `GOOGLE_APPLICATION_CREDENTIALS_JSON` env var containing
   service account key JSON
3. **JSON file path** — `GOOGLE_APPLICATION_CREDENTIALS` env var pointing to a
   service account key file (standard Google SDK variable)
4. **Application Default Credentials** — `gcloud auth application-default login`
   or GCE/Cloud Run metadata server

Options 2–4 require the `gcloud` CLI to be installed.

### Project

The project ID is read from the service account JSON. Override it with
`GCP_PROJECT` or `GOOGLE_CLOUD_PROJECT`, or `gcloud config set project`. When
using `GCP_ACCESS_TOKEN`, the project must be set via one of these env vars.

### Setup examples

```bash
# Option 1: access token (good for vault-stored tokens)
export GCP_ACCESS_TOKEN=ya29.a0ARrdaM...
export GCP_PROJECT=my-project

# Option 2: inline JSON (good for swamp vaults)
export GOOGLE_APPLICATION_CREDENTIALS_JSON='$(cat service-account.json)'

# Option 3: file path (standard SDK variable)
export GOOGLE_APPLICATION_CREDENTIALS=~/keys/service-account.json

# Option 4: user credentials (developer workflow)
gcloud auth application-default login
gcloud config set project my-project
```

## Usage

```bash
# Create a new instances model
swamp model create @swamp/gcp/baremetalsolution/instances my-instances

# Edit the model to configure its properties
swamp model edit my-instances

# Create the resource in GCP
swamp model method run my-instances create

# Sync current state from GCP
swamp model method run my-instances sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
