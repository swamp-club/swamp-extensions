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

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models
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

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models
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
  optionally filtered by a Hetzner label selector; writes one resource per match

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

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models
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

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models
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

Set the \`DO_API_TOKEN\` environment variable to your DigitalOcean personal
access token. The token is validated against \`/v2/account\` on first use.

\`\`\`bash
export DO_API_TOKEN=your-token-here
\`\`\`

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

Auto-generated [swamp](https://github.com/systeminit/swamp) extension models
for Cloudflare ${serviceName} resources.

Each model represents a single Cloudflare resource. Models have **domain
properties** that you configure (the desired state) and **resource properties**
that reflect the live state in Cloudflare. Available methods:

- **create** — provision the resource using the configured properties
- **get** — fetch the current state of a specific resource by ID
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
