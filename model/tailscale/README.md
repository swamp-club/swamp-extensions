# @swamp/tailscale

Auto-generated [swamp](https://github.com/swamp-club/swamp) extension models for
managing a Tailscale tailnet: auth keys, OAuth clients, webhooks, DNS, the
policy file, tailnet settings, devices and users.

Models come in four shapes:

- **Resources with an ID** (`tailnet_key`, `oauth_client`, `federated_identity`,
  `webhook`, `posture_integration`, `oauth_app`, `user_invite`, `device_invite`)
  — `create`, `get`, `update` (when the API allows it), `delete`, `sync`, `list`
  and `adopt`.
- **Resources with a name you choose** (`service`, `log_stream`) — `create`
  refuses to overwrite one that already exists; use `get` to adopt it.
- **Settings that always exist** (`tailnet_settings`, `contacts`, `policy_file`,
  the `dns_*` models and the `device_*` models) — `create` and `update` apply
  the settings. What `delete` does depends on the model: DNS settings are
  cleared, while tailnet settings, contacts and the policy file are left as they
  are (the policy file can opt in to a reset with `resetOnDelete`).
- **Devices and users**, which join outside the API — find them with `list` and
  adopt them by ID.

Secrets that Tailscale returns only once (an auth key's value, an OAuth client's
or OAuth app's secret, a webhook's signing secret) are stored in a separate
`secret` resource, kept in a vault, and never overwritten by `get` or `sync`.

Use `swamp model type describe @swamp/tailscale/<model>` to see each model's
arguments and methods.

## Authentication

Use either an API access token or an OAuth client. Global arguments take
precedence over environment variables; setting both an API key and an OAuth
client is an error.

**API access token** — the `apiKey` global argument or `TAILSCALE_API_KEY`.

**OAuth client** — the `oauthClientId` and `oauthClientSecret` global arguments
(or `TAILSCALE_OAUTH_CLIENT_ID` and `TAILSCALE_OAUTH_CLIENT_SECRET`), with
optional `oauthScopes`. The client is exchanged for a short-lived access token
on first use. OAuth clients do not expire, so they suit long-running automation
better than API tokens.

Wire secrets from a vault so they never live in your shell environment:

```yaml
globalArguments:
  oauthClientId: ${{ vault.get(my-vault, tailscale-client-id) }}
  oauthClientSecret: ${{ vault.get(my-vault, tailscale-client-secret) }}
```

The tailnet defaults to `TAILSCALE_TAILNET`, then `-` (the tailnet of the
credential in use). Set the `tailnet` global argument to address another one.

## Usage

```bash
# Create an auth key for tagged servers
swamp model create @swamp/tailscale/tailnet-key server-key
swamp model edit server-key
swamp model method run server-key create

# Adopt the current DNS nameservers, then manage them
swamp model create @swamp/tailscale/dns-nameservers dns
swamp model method run dns get
```

## License

AGPLv3 — see [LICENSE.txt](./LICENSE.txt).
