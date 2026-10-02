// Tailscale resource table: every model the pipeline generates, and every
// spec operation it deliberately leaves out. See codegen/designs/tailscale.md.
//
// Resources are declared rather than discovered because Tailscale creates and
// reads many resources on different paths (POST /tailnet/{tailnet}/webhooks,
// GET /webhooks/{endpointId}). The pipeline resolves each entry's schemas from
// the spec and fails generation when a path here is missing from the spec, or
// when a spec operation is neither claimed here nor listed in SKIPPED_OPERATIONS.

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** One API operation. Paths are relative to /api/v2. */
export interface OpRef {
  method: HttpMethod;
  path: string;
}

/** A method beyond the kind's lifecycle methods, wrapping one operation. */
export interface ActionDef {
  /** Method name on the model, e.g. "rotate_secret" */
  name: string;
  description: string;
  op: OpRef;
  /**
   * Path parameters (other than the resource's own ID, its parents and the
   * tailnet) supplied as method arguments.
   */
  pathArgs?: string[];
  /** Query parameters supplied as optional method arguments. */
  queryArgs?: string[];
  /** The response is the resource: write it to state. */
  writesState?: boolean;
  /** The response carries the resource's one-time secrets. */
  writesSecret?: boolean;
}

/** What `delete` does for a model whose resource cannot be removed. */
export type DeleteBehaviour =
  | { mode: "api"; op: OpRef }
  | { mode: "noop"; warning: string }
  | { mode: "clear"; op: OpRef; body: Record<string, unknown> };

interface BaseEntry {
  /** Model slug and file name, e.g. "tailnet_key" */
  model: string;
  /** Human-readable singular noun, e.g. "auth key" */
  noun: string;
  /** One-paragraph description emitted into the model's JSDoc */
  description: string;
  /**
   * Path parameters other than the tailnet and the resource's own ID. They
   * become required global arguments, e.g. a device invite's `deviceId`.
   */
  parentParams?: string[];
}

/** A resource with a server-assigned ID: create, get, update, delete. */
export interface CollectionEntry extends BaseEntry {
  kind: "collection";
  create: OpRef;
  read: OpRef;
  update?: OpRef;
  delete: OpRef;
  list: OpRef;
  /** The read path's ID parameter, e.g. "endpointId" */
  idParam: string;
  /** The response field holding that ID */
  idField: string;
  /** Response field naming the resource, when it has a unique one */
  namingField?: string;
  /** The create body and response are single-element arrays */
  arrayBody?: boolean;
  /** Restrict create/update body fields to these (keys split by keyType) */
  fields?: string[];
  /** Body fields always sent with this value, e.g. { keyType: "auth" } */
  fixedBody?: Record<string, unknown>;
  /** Fields create requires beyond the spec's `required` */
  createRequired?: string[];
  /** Body values sent by create when the global argument is unset */
  createDefaults?: Record<string, unknown>;
  /** Fixed query parameters sent with the list operation */
  listQuery?: Record<string, string>;
  /** Keep only list items whose fields equal these values */
  listFilter?: Record<string, string>;
  /** Response fields returned only by create (or a rotate action) */
  oneTimeSecrets?: string[];
  actions?: ActionDef[];
}

/** A resource upserted with PUT under a caller-chosen key. */
export interface KeyedEntry extends BaseEntry {
  kind: "keyed";
  read: OpRef;
  upsert: OpRef;
  delete: OpRef;
  list?: OpRef;
  /** The path parameter carrying the key, e.g. "serviceName" */
  keyParam: string;
  /**
   * Body field that holds the key, when the key is also a body field (a
   * service's `name`). Otherwise the key is its own global argument.
   */
  keyField?: string;
  /**
   * The read endpoint answers 200 even when nothing is configured; the key
   * counts as taken only when this field is non-empty.
   */
  existsField?: string;
  actions?: ActionDef[];
}

/** State that always exists: create and update both apply it. */
export interface SettingsEntry extends BaseEntry {
  kind: "settings";
  read: OpRef;
  apply: OpRef;
  delete: DeleteBehaviour;
  /** Fixed query parameters sent with the read operation */
  readQuery?: Record<string, string>;
  /**
   * Keep only these response fields in state. Used when the read operation
   * returns a larger object than the model manages (a device facet reads the
   * whole device).
   */
  readFields?: string[];
  /** Shapes that do not fit the generic settings template */
  special?: "contacts" | "splitDns" | "postureAttribute" | "policyFile";
  actions?: ActionDef[];
}

/** A resource created outside the API, read and adopted by ID. */
export interface ObservedEntry extends BaseEntry {
  kind: "observed";
  read: OpRef;
  list: OpRef;
  delete?: OpRef;
  idParam: string;
  idField: string;
  /** Response field used for instance names */
  namingField: string;
  /** Fixed query parameters sent with read and list */
  readQuery?: Record<string, string>;
  actions?: ActionDef[];
}

export type ResourceEntry =
  | CollectionEntry
  | KeyedEntry
  | SettingsEntry
  | ObservedEntry;

const get = (path: string): OpRef => ({ method: "GET", path });
const post = (path: string): OpRef => ({ method: "POST", path });
const put = (path: string): OpRef => ({ method: "PUT", path });
const patch = (path: string): OpRef => ({ method: "PATCH", path });
const del = (path: string): OpRef => ({ method: "DELETE", path });

const KEYS = "/tailnet/{tailnet}/keys";
const KEY = "/tailnet/{tailnet}/keys/{keyId}";
const DEVICE = "/device/{deviceId}";

const DNS_CONFLICT =
  " Do not combine dns_configuration with the dns_nameservers, " +
  "dns_preferences, dns_search_paths or dns_split_nameservers models on the " +
  "same tailnet: they manage the same settings and will overwrite each other.";

const FACET_CONFLICT =
  " Only one model should manage this setting for a given device; two models " +
  "for the same device will overwrite each other.";

export const RESOURCES: ResourceEntry[] = [
  // --- collection ---
  {
    kind: "collection",
    model: "tailnet_key",
    noun: "auth key",
    description:
      "A Tailscale auth key, used to register new devices to the tailnet. " +
      "Auth keys cannot be changed after creation: to change one, delete it " +
      "and create a new one. The key value is returned only by create and is " +
      "stored in the `secret` resource. Deleting a key revokes it: Tailscale " +
      "still returns it by ID, marked revoked and invalid, so sync after " +
      "delete records it that way rather than as not found.",
    create: post(KEYS),
    read: get(KEY),
    delete: del(KEY),
    list: get(KEYS),
    idParam: "keyId",
    idField: "id",
    fields: ["description", "capabilities", "expirySeconds"],
    fixedBody: { keyType: "auth" },
    createDefaults: { capabilities: { devices: {} } },
    listQuery: { all: "true" },
    listFilter: { keyType: "auth" },
    oneTimeSecrets: ["key"],
  },
  {
    kind: "collection",
    model: "oauth_client",
    noun: "OAuth client",
    description:
      "A Tailscale OAuth client (trust credential) that exchanges its client " +
      "secret for short-lived API access tokens. The client secret is " +
      "returned only by create and is stored in the `secret` resource.",
    create: post(KEYS),
    read: get(KEY),
    update: put(KEY),
    delete: del(KEY),
    list: get(KEYS),
    idParam: "keyId",
    idField: "id",
    fields: ["description", "scopes", "tags"],
    fixedBody: { keyType: "client" },
    createRequired: ["scopes"],
    listQuery: { all: "true" },
    listFilter: { keyType: "client" },
    oneTimeSecrets: ["key"],
  },
  {
    kind: "collection",
    model: "federated_identity",
    noun: "federated identity",
    description:
      "A Tailscale federated identity (trust credential) that lets workloads " +
      "exchange an OIDC identity token from an external issuer for " +
      "short-lived API access tokens.",
    create: post(KEYS),
    read: get(KEY),
    update: put(KEY),
    delete: del(KEY),
    list: get(KEYS),
    idParam: "keyId",
    idField: "id",
    fields: [
      "description",
      "scopes",
      "tags",
      "issuer",
      "subject",
      "audience",
      "customClaimRules",
    ],
    fixedBody: { keyType: "federated" },
    createRequired: ["scopes", "issuer", "subject"],
    listQuery: { all: "true" },
    listFilter: { keyType: "federated" },
  },
  {
    kind: "collection",
    model: "webhook",
    noun: "webhook",
    description:
      "A Tailscale webhook endpoint that receives tailnet events. The signing " +
      "secret is returned only by create and rotate_secret and is stored in " +
      "the `secret` resource.",
    create: post("/tailnet/{tailnet}/webhooks"),
    read: get("/webhooks/{endpointId}"),
    update: patch("/webhooks/{endpointId}"),
    delete: del("/webhooks/{endpointId}"),
    list: get("/tailnet/{tailnet}/webhooks"),
    idParam: "endpointId",
    idField: "endpointId",
    oneTimeSecrets: ["secret"],
    actions: [
      {
        name: "test",
        description: "Send a test event to the webhook endpoint",
        op: post("/webhooks/{endpointId}/test"),
      },
      {
        name: "rotate_secret",
        description:
          "Rotate the webhook's signing secret and store the new secret",
        op: post("/webhooks/{endpointId}/rotate"),
        writesState: true,
        writesSecret: true,
      },
    ],
  },
  {
    kind: "collection",
    model: "posture_integration",
    noun: "posture integration",
    description:
      "A Tailscale device posture integration with a third-party provider " +
      "(for example CrowdStrike, Intune or Jamf).",
    create: post("/tailnet/{tailnet}/posture/integrations"),
    read: get("/posture/integrations/{id}"),
    update: patch("/posture/integrations/{id}"),
    delete: del("/posture/integrations/{id}"),
    list: get("/tailnet/{tailnet}/posture/integrations"),
    idParam: "id",
    idField: "id",
  },
  {
    kind: "collection",
    model: "oauth_app",
    noun: "OAuth app",
    description:
      "A Tailscale OAuth app that third-party applications use to request " +
      "access to the tailnet. The client secret is returned only by create " +
      "and is stored in the `secret` resource.",
    create: post("/tailnet/{tailnet}/oauth-apps"),
    read: get("/tailnet/{tailnet}/oauth-apps/{appId}"),
    update: put("/tailnet/{tailnet}/oauth-apps/{appId}"),
    delete: del("/tailnet/{tailnet}/oauth-apps/{appId}"),
    list: get("/tailnet/{tailnet}/oauth-apps"),
    idParam: "appId",
    idField: "id",
    namingField: "name",
    oneTimeSecrets: ["clientSecret"],
  },
  {
    kind: "collection",
    model: "user_invite",
    noun: "user invite",
    description: "An invitation for a user to join the tailnet.",
    create: post("/tailnet/{tailnet}/user-invites"),
    read: get("/user-invites/{userInviteId}"),
    delete: del("/user-invites/{userInviteId}"),
    list: get("/tailnet/{tailnet}/user-invites"),
    idParam: "userInviteId",
    idField: "id",
    arrayBody: true,
    actions: [
      {
        name: "resend",
        description: "Resend the invitation email",
        op: post("/user-invites/{userInviteId}/resend"),
      },
    ],
  },
  {
    kind: "collection",
    model: "device_invite",
    noun: "device invite",
    description: "An invitation to share a device with a user outside the " +
      "tailnet.",
    parentParams: ["deviceId"],
    create: post("/device/{deviceId}/device-invites"),
    read: get("/device-invites/{deviceInviteId}"),
    delete: del("/device-invites/{deviceInviteId}"),
    list: get("/device/{deviceId}/device-invites"),
    idParam: "deviceInviteId",
    idField: "id",
    arrayBody: true,
    actions: [
      {
        name: "resend",
        description: "Resend the invitation email",
        op: post("/device-invites/{deviceInviteId}/resend"),
      },
    ],
  },

  // --- keyed ---
  {
    kind: "keyed",
    model: "service",
    noun: "service",
    description:
      "A Tailscale Service: a stable virtual IP and DNS name in front of one " +
      "or more hosting devices. create refuses to overwrite an existing " +
      "service with the same name; adopt it with get instead.",
    read: get("/tailnet/{tailnet}/services/{serviceName}"),
    upsert: put("/tailnet/{tailnet}/services/{serviceName}"),
    delete: del("/tailnet/{tailnet}/services/{serviceName}"),
    list: get("/tailnet/{tailnet}/services"),
    keyParam: "serviceName",
    keyField: "name",
    actions: [
      {
        name: "list_devices",
        description: "List the devices hosting the service",
        op: get("/tailnet/{tailnet}/services/{serviceName}/devices"),
      },
      {
        name: "get_device_approval",
        description: "Get whether a device is approved to host the service",
        op: get(
          "/tailnet/{tailnet}/services/{serviceName}/device/{deviceId}/approved",
        ),
        pathArgs: ["deviceId"],
      },
      {
        name: "set_device_approval",
        description: "Approve or unapprove a device to host the service",
        op: post(
          "/tailnet/{tailnet}/services/{serviceName}/device/{deviceId}/approved",
        ),
        pathArgs: ["deviceId"],
      },
    ],
  },
  {
    kind: "keyed",
    model: "log_stream",
    noun: "log stream",
    description:
      "Log streaming of a tailnet's configuration or network flow logs to an " +
      "external destination. create refuses to overwrite a log stream that " +
      "is already configured for the log type; adopt it with get instead.",
    read: get("/tailnet/{tailnet}/logging/{logType}/stream"),
    upsert: put("/tailnet/{tailnet}/logging/{logType}/stream"),
    delete: del("/tailnet/{tailnet}/logging/{logType}/stream"),
    keyParam: "logType",
    existsField: "destinationType",
  },

  // --- settings ---
  {
    kind: "settings",
    model: "tailnet_settings",
    noun: "tailnet settings",
    description: "Tailnet-wide settings such as device approval, key expiry " +
      "and HTTPS certificates. Deleting the model leaves the settings as they " +
      "are.",
    read: get("/tailnet/{tailnet}/settings"),
    apply: patch("/tailnet/{tailnet}/settings"),
    delete: {
      mode: "noop",
      warning:
        "Tailnet settings were left unchanged: deleting tailnet_settings only " +
        "removes it from swamp. Change any setting you want reverted with " +
        "update, or in the admin console.",
    },
  },
  {
    kind: "settings",
    model: "contacts",
    noun: "contacts",
    description:
      "The tailnet's account, support and security contact email addresses. " +
      "Deleting the model leaves the contacts as they are.",
    read: get("/tailnet/{tailnet}/contacts"),
    apply: patch("/tailnet/{tailnet}/contacts/{contactType}"),
    special: "contacts",
    delete: {
      mode: "noop",
      warning:
        "Contacts were left unchanged: a tailnet's contacts cannot be unset, " +
        "so deleting contacts only removes it from swamp.",
    },
    actions: [
      {
        name: "resend_verification_email",
        description: "Resend the verification email for a contact",
        op: post(
          "/tailnet/{tailnet}/contacts/{contactType}/resend-verification-email",
        ),
        pathArgs: ["contactType"],
      },
    ],
  },
  {
    kind: "settings",
    model: "policy_file",
    noun: "policy file",
    description:
      "The tailnet policy file (ACL), managed as HuJSON text. create refuses " +
      "to replace a policy file that has been edited since the tailnet was " +
      "created unless overwriteExistingContent is set; update refuses if the " +
      "policy changed since the last get or sync. Deleting the model leaves " +
      "the policy as it is unless resetOnDelete is set.",
    read: get("/tailnet/{tailnet}/acl"),
    apply: post("/tailnet/{tailnet}/acl"),
    special: "policyFile",
    delete: {
      mode: "noop",
      warning:
        "The policy file was left unchanged: deleting policy_file only " +
        "removes it from swamp. Set resetOnDelete to reset the policy to the " +
        "default instead.",
    },
    actions: [
      {
        name: "preview",
        description:
          "Preview which rules in the policy match a user or an IP:port",
        op: post("/tailnet/{tailnet}/acl/preview"),
        queryArgs: ["type", "previewFor"],
      },
      {
        name: "validate",
        description: "Validate the policy and run its tests without saving it",
        op: post("/tailnet/{tailnet}/acl/validate"),
      },
    ],
  },
  {
    kind: "settings",
    model: "dns_configuration",
    noun: "DNS configuration",
    description: "The tailnet's whole DNS configuration: nameservers, split " +
      "DNS, search paths and preferences. Deleting the model clears it." +
      DNS_CONFLICT,
    read: get("/tailnet/{tailnet}/dns/configuration"),
    apply: post("/tailnet/{tailnet}/dns/configuration"),
    delete: {
      mode: "clear",
      op: post("/tailnet/{tailnet}/dns/configuration"),
      body: {},
    },
  },
  {
    kind: "settings",
    model: "dns_nameservers",
    noun: "DNS nameservers",
    description: "The tailnet's global DNS nameservers. Deleting the model " +
      "removes them." + DNS_CONFLICT,
    read: get("/tailnet/{tailnet}/dns/nameservers"),
    apply: post("/tailnet/{tailnet}/dns/nameservers"),
    delete: {
      mode: "clear",
      op: post("/tailnet/{tailnet}/dns/nameservers"),
      body: { dns: [] },
    },
  },
  {
    kind: "settings",
    model: "dns_preferences",
    noun: "DNS preferences",
    description: "The tailnet's DNS preferences (MagicDNS). Deleting the " +
      "model turns MagicDNS off." + DNS_CONFLICT,
    read: get("/tailnet/{tailnet}/dns/preferences"),
    apply: post("/tailnet/{tailnet}/dns/preferences"),
    delete: {
      mode: "clear",
      op: post("/tailnet/{tailnet}/dns/preferences"),
      body: { magicDNS: false },
    },
  },
  {
    kind: "settings",
    model: "dns_search_paths",
    noun: "DNS search paths",
    description: "The tailnet's DNS search paths. Deleting the model removes " +
      "them." + DNS_CONFLICT,
    read: get("/tailnet/{tailnet}/dns/searchpaths"),
    apply: post("/tailnet/{tailnet}/dns/searchpaths"),
    delete: {
      mode: "clear",
      op: post("/tailnet/{tailnet}/dns/searchpaths"),
      body: { searchPaths: [] },
    },
  },
  {
    kind: "settings",
    model: "dns_split_nameservers",
    noun: "split DNS nameservers",
    description: "The nameservers used for one split-DNS domain. Each model " +
      "manages a single domain, so separate definitions can own separate " +
      "domains. Deleting the model removes that domain's nameservers." +
      DNS_CONFLICT,
    read: get("/tailnet/{tailnet}/dns/split-dns"),
    apply: patch("/tailnet/{tailnet}/dns/split-dns"),
    special: "splitDns",
    delete: {
      mode: "clear",
      op: patch("/tailnet/{tailnet}/dns/split-dns"),
      body: {},
    },
  },

  // --- device facets (settings keyed by device) ---
  {
    kind: "settings",
    model: "device_tags",
    noun: "device tags",
    description: "The ACL tags applied to a device. Deleting the model " +
      "removes all tags from the device." + FACET_CONFLICT,
    parentParams: ["deviceId"],
    read: get(DEVICE),
    apply: post(`${DEVICE}/tags`),
    readQuery: { fields: "all" },
    readFields: ["tags"],
    delete: { mode: "clear", op: post(`${DEVICE}/tags`), body: { tags: [] } },
  },
  {
    kind: "settings",
    model: "device_subnet_routes",
    noun: "device subnet routes",
    description: "The subnet routes enabled on a device. Deleting the model " +
      "disables all of them." + FACET_CONFLICT,
    parentParams: ["deviceId"],
    read: get(`${DEVICE}/routes`),
    apply: post(`${DEVICE}/routes`),
    delete: {
      mode: "clear",
      op: post(`${DEVICE}/routes`),
      body: { routes: [] },
    },
  },
  {
    kind: "settings",
    model: "device_key",
    noun: "device key",
    description: "Whether a device's node key expires. Deleting the model " +
      "turns key expiry back on." + FACET_CONFLICT,
    parentParams: ["deviceId"],
    read: get(DEVICE),
    apply: post(`${DEVICE}/key`),
    readQuery: { fields: "all" },
    readFields: ["keyExpiryDisabled"],
    delete: {
      mode: "clear",
      op: post(`${DEVICE}/key`),
      body: { keyExpiryDisabled: false },
    },
  },
  {
    kind: "settings",
    model: "device_authorization",
    noun: "device authorization",
    description:
      "Whether a device is authorized to join the tailnet. Deleting the " +
      "model leaves the device's authorization as it is." + FACET_CONFLICT,
    parentParams: ["deviceId"],
    read: get(DEVICE),
    apply: post(`${DEVICE}/authorized`),
    readQuery: { fields: "all" },
    readFields: ["authorized"],
    delete: {
      mode: "noop",
      warning: "The device's authorization was left unchanged: deleting " +
        "device_authorization only removes it from swamp. Set authorized to " +
        "false and run update first to de-authorize the device.",
    },
  },
  {
    kind: "settings",
    model: "device_posture_attribute",
    noun: "device posture attribute",
    description:
      "One custom posture attribute on a device. Deleting the model removes " +
      "the attribute." + FACET_CONFLICT,
    parentParams: ["deviceId", "attributeKey"],
    read: get(`${DEVICE}/attributes`),
    apply: post(`${DEVICE}/attributes/{attributeKey}`),
    special: "postureAttribute",
    delete: {
      mode: "api",
      op: del(`${DEVICE}/attributes/{attributeKey}`),
    },
  },

  // --- observed ---
  {
    kind: "observed",
    model: "device",
    noun: "device",
    description:
      "A device in the tailnet. Devices join through an auth key or sign-in, " +
      "so they cannot be created here: find them with list and adopt them by " +
      "ID. Manage tags, routes, key expiry and authorization with the " +
      "device_tags, device_subnet_routes, device_key and device_authorization " +
      "models.",
    read: get(DEVICE),
    list: get("/tailnet/{tailnet}/devices"),
    delete: del(DEVICE),
    idParam: "deviceId",
    idField: "nodeId",
    namingField: "name",
    readQuery: { fields: "all" },
    actions: [
      {
        name: "expire",
        description: "Expire the device's node key, forcing it to " +
          "re-authenticate",
        op: post(`${DEVICE}/expire`),
      },
      {
        name: "set_name",
        description: "Set the device's machine name",
        op: post(`${DEVICE}/name`),
      },
      {
        name: "set_ipv4_address",
        description: "Set the device's Tailscale IPv4 address",
        op: post(`${DEVICE}/ip`),
      },
    ],
  },
  {
    kind: "observed",
    model: "user",
    noun: "user",
    description: "A user in the tailnet. Users join by signing in, so they " +
      "cannot be created here (invite them with user_invite): find them with " +
      "list and adopt them by ID.",
    read: get("/users/{userId}"),
    list: get("/tailnet/{tailnet}/users"),
    delete: post("/users/{userId}/delete"),
    idParam: "userId",
    idField: "id",
    namingField: "loginName",
    actions: [
      {
        name: "set_role",
        description: "Change the user's role",
        op: post("/users/{userId}/role"),
      },
      {
        name: "approve",
        description: "Approve a user waiting for approval",
        op: post("/users/{userId}/approve"),
      },
      {
        name: "suspend",
        description: "Suspend the user",
        op: post("/users/{userId}/suspend"),
      },
      {
        name: "restore",
        description: "Restore a suspended user",
        op: post("/users/{userId}/restore"),
      },
    ],
  },
];

/** Spec operations deliberately not generated, with the reason. */
export const SKIPPED_OPERATIONS: (OpRef & { reason: string })[] = [
  {
    ...get("/tailnet/{tailnet}/logging/configuration"),
    reason: "audit log query: data, not a managed resource",
  },
  {
    ...get("/tailnet/{tailnet}/logging/network"),
    reason: "network flow log query: data, not a managed resource",
  },
  {
    ...get("/tailnet/{tailnet}/logging/{logType}/stream/status"),
    reason: "log streaming telemetry, not desired state",
  },
  {
    ...post("/tailnet/{tailnet}/aws-external-id"),
    reason: "helper for log stream S3 role setup",
  },
  {
    ...post(
      "/tailnet/{tailnet}/aws-external-id/{id}/validate-aws-trust-policy",
    ),
    reason: "helper for log stream S3 role setup",
  },
  {
    ...post("/device-invites/-/accept"),
    reason: "runs as the invitee, not the tailnet owner",
  },
  {
    ...patch("/tailnet/{tailnet}/device-attributes"),
    reason: "bulk form of the per-device posture attribute endpoints",
  },
  {
    ...get("/organizations/{organization}/tailnets"),
    reason: "organization tailnets deferred: needs per-tailnet credentials",
  },
  {
    ...post("/organizations/{organization}/tailnets"),
    reason: "organization tailnets deferred: needs per-tailnet credentials",
  },
  {
    ...del("/tailnet/{tailnet}"),
    reason: "organization tailnets deferred: needs per-tailnet credentials",
  },
  {
    ...put("/tailnet/{tailnet}/dns/split-dns"),
    reason: "replaces every split-DNS domain; dns_split_nameservers patches " +
      "one domain and dns_configuration replaces the whole configuration",
  },
];
