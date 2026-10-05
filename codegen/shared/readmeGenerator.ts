// Generates README.md content for extension packages

/** Curated "best-known" resource per AWS service for README examples */
const AWS_CURATED_RESOURCES: Record<string, string> = {
  ec2: "vpc",
  s3: "bucket",
  lambda: "function",
  rds: "dbinstance",
  iam: "role",
  dynamodb: "global_table",
  sqs: "queue",
  sns: "topic",
  ecs: "cluster",
  eks: "cluster",
  cloudfront: "distribution",
  route53: "hosted_zone",
  elasticloadbalancingv2: "load_balancer",
  apigateway: "rest_api",
  cloudwatch: "alarm",
  secretsmanager: "secret",
  kms: "key",
  stepfunctions: "state_machine",
  cognito: "user_pool",
  cloudformation: "stack",
  elasticache: "serverless_cache",
  kinesis: "stream",
  redshift: "cluster",
  ecr: "repository",
  codebuild: "project",
  codepipeline: "pipeline",
  wafv2: "web_acl",
  athena: "work_group",
  glue: "database",
  emr: "cluster",
};

/**
 * Returns the curated resource slug for a service, or null if none exists.
 * Used by the pipeline to select the best example resource for the README.
 */
export function getCuratedAwsResource(
  serviceName: string,
): string | null {
  return AWS_CURATED_RESOURCES[serviceName] ?? null;
}

/**
 * Generates a README.md for an AWS service extension package.
 */
export function generateAwsReadme(
  serviceName: string,
  extensionName: string,
  modelSlug: string,
  modelType: string,
): string {
  return `# ${extensionName}

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for AWS ${serviceName.toUpperCase()} resources.

Each model represents a single AWS resource (e.g., a VPC, an S3 bucket, an IAM
role). Models have **domain properties** that you configure (the desired state)
and **resource properties** that reflect the live state in AWS. Available
methods:

- **create** — provision the resource in AWS using the configured properties
- **get** — fetch the current state of a specific resource by identifier
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from AWS
- **sync** — refresh all resource properties from AWS

Use \`swamp model type describe ${modelType}\` to see the full list of
configurable properties and available methods for this model.

## Authentication

These models use the AWS SDK v3 default credential chain. Credentials are
resolved in the following order:

1. **Environment variables** — \`AWS_ACCESS_KEY_ID\` + \`AWS_SECRET_ACCESS_KEY\` + optional \`AWS_SESSION_TOKEN\`
2. **SSO credentials** — \`aws sso login\`
3. **Shared credentials file** — \`~/.aws/credentials\`
4. **Shared config file** — \`~/.aws/config\` (profiles, \`credential_process\`, SSO)
5. **ECS container credentials** — task IAM role
6. **EC2 instance metadata** — instance profile

### Region

The \`AWS_REGION\` environment variable controls which region resources are
created and managed in. Defaults to \`us-east-1\` if not set.

### Setup

\`\`\`bash
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=wJal...
\`\`\`

## Usage

\`\`\`bash
# Create a new ${modelSlug} model
swamp model create ${modelType} my-${modelSlug}

# Edit the model to configure its properties
swamp model edit my-${modelSlug}

# Create the resource in AWS
swamp model method run my-${modelSlug} create

# Sync current state from AWS
swamp model method run my-${modelSlug} sync
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}

/**
 * Generates a README.md for the Hetzner Cloud extension package.
 */
export function generateHetznerReadme(): string {
  return `# @swamp/hetzner-cloud

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for Hetzner Cloud resources.

Each model represents a single Hetzner Cloud resource (e.g., a server, a
floating IP, an SSH key). Models have **domain properties** that you configure
(the desired state) and **resource properties** that reflect the live state in
Hetzner Cloud. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Hetzner Cloud
- **sync** — refresh all resource properties from the API
- **list** — discover existing resources (resources with a collection endpoint),
  optionally filtered by a Hetzner label selector and by the endpoint's own
  query filters (e.g. images \`type\`, \`architecture\`; array filters take
  several values); writes one resource per match. Images are named
  \`<name>-<id>\` (or \`<id>\` when unnamed), since public image names repeat
  across CPU architectures

Use \`swamp model type describe @swamp/hetzner-cloud/<model>\` to see the full
list of configurable properties and available methods for a model.

## Authentication

Provide a Hetzner Cloud API token in one of two ways. An explicit \`token\` global
argument takes precedence over the environment variable, and is validated against
\`/v1/locations\` on first use.

**Option 1 — \`token\` global argument (recommended).** Wire it from a vault so the
secret never lives in your shell environment:

\`\`\`yaml
# in the model definition
globalArguments:
  token: \${{ vault.get(my-vault, hcloud-token) }}
\`\`\`

The \`token\` argument is marked sensitive: swamp redacts its value from run
logs and reports and vaults it on write. A vault-sourced value is stored as the
\`vault.get(...)\` expression and only resolved at execution time, so the raw
secret never lands in the model definition.

**Option 2 — \`HETZNER_API_TOKEN\` environment variable.** Used when no \`token\`
argument is set:

\`\`\`bash
export HETZNER_API_TOKEN=your-token-here
\`\`\`

## Usage

\`\`\`bash
# Create a new server model
swamp model create @swamp/hetzner-cloud/servers my-server

# Edit the model to configure its properties
swamp model edit my-server

# Create the resource in Hetzner Cloud
swamp model method run my-server create

# Sync current state from Hetzner Cloud
swamp model method run my-server sync
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}

/**
 * Generates a README.md for a GCP extension package.
 */
export function generateGcpReadme(
  serviceName: string,
  extensionName: string,
  modelSlug: string,
  modelType: string,
): string {
  return `# ${extensionName}

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for Google Cloud ${serviceName} resources.

Each model represents a single GCP resource. Models have **domain properties**
that you configure (the desired state) and **resource properties** that reflect
the live state in GCP. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by identifier
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from GCP
- **sync** — refresh all resource properties from the API

Use \`swamp model type describe ${modelType}\` to see the full list of
configurable properties and available methods for this model.

## Authentication

Credentials are resolved in the following order:

1. **Access token** — \`GCP_ACCESS_TOKEN\` env var containing a pre-obtained
   OAuth2 access token (does **not** require \`gcloud\` CLI; also set
   \`GCP_PROJECT\` or \`GOOGLE_CLOUD_PROJECT\`)
2. **Inline JSON** — \`GOOGLE_APPLICATION_CREDENTIALS_JSON\` env var containing
   service account key JSON
3. **JSON file path** — \`GOOGLE_APPLICATION_CREDENTIALS\` env var pointing to a
   service account key file (standard Google SDK variable)
4. **Application Default Credentials** — \`gcloud auth application-default login\`
   or GCE/Cloud Run metadata server

Options 2–4 require the \`gcloud\` CLI to be installed.

### Project

The project ID is read from the service account JSON. Override it with
\`GCP_PROJECT\` or \`GOOGLE_CLOUD_PROJECT\`, or \`gcloud config set project\`.
When using \`GCP_ACCESS_TOKEN\`, the project must be set via one of these env vars.

### OAuth scopes

For authentication options 2–4, access tokens are minted with the OAuth scopes
declared in this API's Discovery Document. Override with the \`scopes\` global
argument (comma-separated) if you need different scopes.

### Setup examples

\`\`\`bash
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
\`\`\`

## Usage

\`\`\`bash
# Create a new ${modelSlug} model
swamp model create ${modelType} my-${modelSlug}

# Edit the model to configure its properties
swamp model edit my-${modelSlug}

# Create the resource in GCP
swamp model method run my-${modelSlug} create

# Sync current state from GCP
swamp model method run my-${modelSlug} sync
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}

/**
 * Generates a README.md for the DigitalOcean extension package.
 */
export function generateDigitalOceanReadme(): string {
  return `# @swamp/digitalocean

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for DigitalOcean resources.

Each model represents a single DigitalOcean resource (e.g., a Droplet, a
volume, a load balancer). Models have **domain properties** that you configure
(the desired state) and **resource properties** that reflect the live state in
DigitalOcean. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from DigitalOcean
- **sync** — refresh all resource properties from the API

Use \`swamp model type describe @swamp/digitalocean/<model>\` to see the full
list of configurable properties and available methods for a model.

## Authentication

Provide a DigitalOcean personal access token in one of two ways. An explicit
\`token\` global argument takes precedence over the environment variable, and is
validated against \`/v2/account\` on first use.

**Option 1 — \`token\` global argument (recommended).** Wire it from a vault so the
secret never lives in your shell environment:

\`\`\`yaml
# in the model definition
globalArguments:
  token: \${{ vault.get(my-vault, do-token) }}
\`\`\`

The \`token\` argument is marked sensitive: swamp redacts its value from run
logs and reports and vaults it on write. A vault-sourced value is stored as the
\`vault.get(...)\` expression and only resolved at execution time, so the raw
secret never lands in the model definition.

**Option 2 — \`DO_API_TOKEN\` environment variable.** Used when no \`token\`
argument is set:

\`\`\`bash
export DO_API_TOKEN=your-token-here
\`\`\`

## Secret fields

Resource fields that hold secrets — \`password\`, \`token\`, \`api_key\`,
\`secret\`, \`access_key\`, \`private_key\`, \`registry_credentials\` and
names ending in one of them — are marked sensitive. Set them with a
\`vault.get(...)\` expression; swamp rejects a literal value in a model
definition. Models that read secrets back from the API, such as the database
models with their connection passwords, store those values in a vault, so a
vault must be configured before they can save state:

\`\`\`bash
swamp vault create <type> <name>
\`\`\`

Secrets nested inside a list, such as the App Platform log destination
credentials under \`spec.services\`, are marked but not yet vaulted by swamp.

## Usage

\`\`\`bash
# Create a new droplet model
swamp model create @swamp/digitalocean/droplet my-droplet

# Edit the model to configure its properties
swamp model edit my-droplet

# Create the resource in DigitalOcean
swamp model method run my-droplet create

# Sync current state from DigitalOcean
swamp model method run my-droplet sync
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}

/**
 * Generates a README.md for a Cloudflare extension package.
 */
export function generateCloudflareReadme(
  serviceName: string,
  extensionName: string,
  modelSlug: string,
  modelType: string,
): string {
  return `# ${extensionName}

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for Cloudflare ${serviceName} resources.

Each model represents a single Cloudflare resource. Models have **domain
properties** that you configure (the desired state) and **resource properties**
that reflect the live state in Cloudflare. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **lookup** — find an existing resource by field values and import it into state
- **adopt** — import a resource by ID into state for management
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Cloudflare
- **sync** — refresh all resource properties from the API

Use \`swamp model type describe ${modelType}\` to see the full list of
configurable properties and available methods for this model.

## Authentication

Set the \`CLOUDFLARE_API_TOKEN\` environment variable (recommended). The token
is validated against \`/user/tokens/verify\` on first use.

\`\`\`bash
export CLOUDFLARE_API_TOKEN=your-token-here
\`\`\`

Alternatively, use the legacy API key + email:

\`\`\`bash
export CLOUDFLARE_API_KEY=your-api-key
export CLOUDFLARE_EMAIL=your-email@example.com
\`\`\`

### Vault-wireable credentials

Each model also accepts optional, sensitive global arguments that take
precedence over the environment variables and can be wired with a
\`vault.get(...)\` expression, so credentials are sourced from a vault instead of
the shell environment:

- \`apiToken\` — overrides \`CLOUDFLARE_API_TOKEN\` (recommended).
- \`apiKey\` + \`email\` — override \`CLOUDFLARE_API_KEY\` + \`CLOUDFLARE_EMAIL\` for the
  legacy auth path. Both must be provided together.

\`\`\`yaml
globalArgs:
  apiToken: \${{ vault.get("cloudflare/api-token") }}
\`\`\`

These arguments are flagged sensitive, so they are redacted from run logs,
reports, and stored data. A few models whose own schema already defines an
\`email\` property do not expose the \`apiKey\`/\`email\` arguments (to avoid a name
collision) — those models use the \`CLOUDFLARE_API_KEY\` + \`CLOUDFLARE_EMAIL\`
environment variables for the legacy path, while \`apiToken\` remains available.

## Usage

\`\`\`bash
# Create a new ${modelSlug} model
swamp model create ${modelType} my-${modelSlug}

# Edit the model to configure its properties
swamp model edit my-${modelSlug}

# Create the resource in Cloudflare
swamp model method run my-${modelSlug} create

# Sync current state from Cloudflare
swamp model method run my-${modelSlug} sync
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}

export function generateVercelReadme(
  serviceName: string,
  extensionName: string,
  modelSlug: string,
  modelType: string,
): string {
  return `# ${extensionName}

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for Vercel ${serviceName} resources.

Each model represents a single Vercel resource. Models have **domain
properties** that you configure (the desired state) and **resource properties**
that reflect the live state in Vercel. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
- **lookup** — find an existing resource by field values and import it into state
- **adopt** — import a resource by ID into state for management
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from Vercel
- **sync** — refresh all resource properties from the API

Use \`swamp model type describe ${modelType}\` to see the full list of
configurable properties and available methods for this model.

## Authentication

Set the \`VERCEL_TOKEN\` environment variable:

\`\`\`bash
export VERCEL_TOKEN=your-token-here
\`\`\`

### Vault-wireable credentials

Each model also accepts an optional, sensitive \`token\` global argument that
takes precedence over the environment variable and can be wired with a
\`vault.get(...)\` expression, so credentials are sourced from a vault instead of
the shell environment:

\`\`\`yaml
globalArgs:
  token: \${{ vault.get("vercel/api-token") }}
\`\`\`

## Team scoping

Most Vercel resources are scoped to a team. Provide either \`teamId\` or
\`slug\` as a global argument:

\`\`\`yaml
globalArgs:
  teamId: team_abc123
  # or: slug: my-team
\`\`\`

## Quick start

\`\`\`bash
# Install the extension
swamp extension install ${extensionName}

# Create a model instance
swamp model create ${modelType} my-${modelSlug}

# Configure it
swamp model edit my-${modelSlug}

# Create the resource in Vercel
swamp model method run my-${modelSlug} create

# Sync current state from Vercel
swamp model method run my-${modelSlug} sync
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}

/**
 * Generates a README.md for the Tailscale extension package.
 */
export function generateTailscaleReadme(): string {
  return `# @swamp/tailscale

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models
for managing a Tailscale tailnet: auth keys, OAuth clients, webhooks, DNS,
the policy file, tailnet settings, devices and users.

Models come in four shapes:

- **Resources with an ID** (\`tailnet_key\`, \`oauth_client\`,
  \`federated_identity\`, \`webhook\`, \`posture_integration\`, \`oauth_app\`,
  \`user_invite\`, \`device_invite\`) — \`create\`, \`get\`, \`update\` (when
  the API allows it), \`delete\`, \`sync\`, \`list\` and \`adopt\`.
- **Resources with a name you choose** (\`service\`, \`log_stream\`) —
  \`create\` refuses to overwrite one that already exists; use \`get\` to adopt
  it.
- **Settings that always exist** (\`tailnet_settings\`, \`contacts\`,
  \`policy_file\`, the \`dns_*\` models and the \`device_*\` models) —
  \`create\` and \`update\` apply the settings. What \`delete\` does depends on
  the model: DNS settings are cleared, while tailnet settings, contacts and the
  policy file are left as they are (the policy file can opt in to a reset with
  \`resetOnDelete\`).
- **Devices and users**, which join outside the API — find them with \`list\`
  and adopt them by ID.

Secrets that Tailscale returns only once (an auth key's value, an OAuth
client's or OAuth app's secret, a webhook's signing secret) are stored in a
separate \`secret\` resource, kept in a vault, and never overwritten by
\`get\` or \`sync\`.

Use \`swamp model type describe @swamp/tailscale/<model>\` to see each model's
arguments and methods.

## Authentication

Use either an API access token or an OAuth client. Global arguments take
precedence over environment variables; setting both an API key and an OAuth
client is an error.

**API access token** — the \`apiKey\` global argument or \`TAILSCALE_API_KEY\`.

**OAuth client** — the \`oauthClientId\` and \`oauthClientSecret\` global
arguments (or \`TAILSCALE_OAUTH_CLIENT_ID\` and \`TAILSCALE_OAUTH_CLIENT_SECRET\`),
with optional \`oauthScopes\`. The client is exchanged for a short-lived access
token on first use. OAuth clients do not expire, so they suit long-running
automation better than API tokens.

Wire secrets from a vault so they never live in your shell environment:

\`\`\`yaml
globalArguments:
  oauthClientId: \${{ vault.get(my-vault, tailscale-client-id) }}
  oauthClientSecret: \${{ vault.get(my-vault, tailscale-client-secret) }}
\`\`\`

The tailnet defaults to \`TAILSCALE_TAILNET\`, then \`-\` (the tailnet of the
credential in use). Set the \`tailnet\` global argument to address another one.

## Usage

\`\`\`bash
# Create an auth key for tagged servers
swamp model create @swamp/tailscale/tailnet-key server-key
swamp model edit server-key
swamp model method run server-key create

# Adopt the current DNS nameservers, then manage them
swamp model create @swamp/tailscale/dns-nameservers dns
swamp model method run dns get
\`\`\`

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
`;
}
