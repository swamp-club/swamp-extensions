# @swamp/aws/fms

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
AWS FMS resources.

Each model represents a single AWS resource (e.g., a VPC, an S3 bucket, an IAM
role). Models have **domain properties** that you configure (the desired state)
and **resource properties** that reflect the live state in AWS. Available
methods:

- **create** — provision the resource in AWS using the configured properties
- **get** — fetch the current state of a specific resource by identifier
- **update** — apply property changes to an existing resource
- **delete** — remove the resource from AWS
- **sync** — refresh all resource properties from AWS

Use `swamp model type describe @swamp/aws/fms/notification_channel` to see the
full list of configurable properties and available methods for this model.

## Authentication

These models use the AWS SDK v3 default credential chain. Credentials are
resolved in the following order:

1. **Environment variables** — `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` +
   optional `AWS_SESSION_TOKEN`
2. **SSO credentials** — `aws sso login`
3. **Shared credentials file** — `~/.aws/credentials`
4. **Shared config file** — `~/.aws/config` (profiles, `credential_process`,
   SSO)
5. **ECS container credentials** — task IAM role
6. **EC2 instance metadata** — instance profile

### Region

The `AWS_REGION` environment variable controls which region resources are
created and managed in. Defaults to `us-east-1` if not set.

### Setup

```bash
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=wJal...
```

## Usage

```bash
# Create a new notification_channel model
swamp model create @swamp/aws/fms/notification_channel my-notification_channel

# Edit the model to configure its properties
swamp model edit my-notification_channel

# Create the resource in AWS
swamp model method run my-notification_channel create

# Sync current state from AWS
swamp model method run my-notification_channel sync
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
