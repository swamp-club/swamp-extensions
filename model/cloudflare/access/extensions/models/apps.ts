// Auto-generated extension model for @swamp/cloudflare/access/apps
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Apps.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().optional().describe(
    "Cloudflare account ID (provide account_id or zone_id)",
  ),
  zone_id: z.string().optional().describe(
    "Cloudflare zone ID (provide account_id or zone_id)",
  ),
  allow_authenticate_via_warp: z.boolean().describe(
    "When set to true, users can authenticate to this application using their WARP session.  When set to false this application will always require direct IdP authentication. This setting always overrides the organization setting for WARP authentication.",
  ).optional(),
  allow_iframe: z.boolean().describe(
    "Enables loading application content in an iFrame.",
  ).optional(),
  allowed_idps: z.array(z.string()).describe(
    "The identity providers your users can select when connecting to this application. Defaults to all IdPs configured in your account.",
  ).optional(),
  app_launcher_visible: z.boolean().describe(
    "Displays the application in the App Launcher.",
  ).optional(),
  auto_redirect_to_identity: z.boolean().describe(
    "When set to `true`, users skip the identity provider selection step during login. You must specify only one identity provider in allowed_idps.",
  ).optional(),
  cors_headers: z.object({
    allow_all_headers: z.boolean().optional(),
    allow_all_methods: z.boolean().optional(),
    allow_all_origins: z.boolean().optional(),
    allow_credentials: z.boolean().optional(),
    allowed_headers: z.array(z.string()).optional(),
    allowed_methods: z.array(
      z.enum([
        "GET",
        "POST",
        "HEAD",
        "PUT",
        "DELETE",
        "CONNECT",
        "OPTIONS",
        "TRACE",
        "PATCH",
      ]),
    ).optional(),
    allowed_origins: z.array(z.string()).optional(),
    max_age: z.number().min(-1).max(86400).optional(),
  }).optional(),
  custom_deny_message: z.string().describe(
    "The custom error message shown to a user when they are denied access to the application.",
  ).optional(),
  custom_deny_url: z.string().describe(
    "The custom URL a user is redirected to when they are denied access to the application when failing identity-based rules.",
  ).optional(),
  custom_non_identity_deny_url: z.string().describe(
    "The custom URL a user is redirected to when they are denied access to the application when failing non-identity rules.",
  ).optional(),
  custom_pages: z.array(z.string()).describe(
    "The custom pages that will be displayed when applicable for this application",
  ).optional(),
  destinations: z.array(z.object({
    type: z.enum(["public"]).optional(),
    uri: z.string().optional(),
  })).describe(
    "List of destinations secured by Access. This supersedes `self_hosted_domains` to allow for more flexibility in defining different types of domains. If `destinations` are provided, then `self_hosted_domains` will be ignored.\n",
  ).optional(),
  domain: z.string().describe(
    "The primary hostname and path secured by Access. This domain will be displayed if the app is visible in the App Launcher.",
  ).optional(),
  enable_binding_cookie: z.boolean().describe(
    "Enables the binding cookie, which increases security against compromised authorization tokens and CSRF attacks.",
  ).optional(),
  http_only_cookie_attribute: z.boolean().describe(
    "Enables the HttpOnly cookie attribute, which increases security against XSS attacks.",
  ).optional(),
  logo_url: z.string().describe(
    "The image URL for the logo shown in the App Launcher dashboard.",
  ).optional(),
  mfa_config: z.object({
    allowed_authenticators: z.array(
      z.enum(["totp", "biometrics", "security_key"]),
    ).optional(),
    mfa_disabled: z.boolean().optional(),
    session_duration: z.string().optional(),
  }).describe("Configures multi-factor authentication (MFA) settings.")
    .optional(),
  name: z.string().describe("The name of the application.").optional(),
  oauth_configuration: z.object({
    dynamic_client_registration: z.object({
      allow_any_on_localhost: z.boolean().optional(),
      allow_any_on_loopback: z.boolean().optional(),
      allowed_uris: z.array(z.string()).optional(),
      enabled: z.boolean().optional(),
    }).optional(),
    enabled: z.boolean().optional(),
    grant: z.object({
      access_token_lifetime: z.string().optional(),
      session_duration: z.string().optional(),
    }).optional(),
  }).describe(
    "**Beta:** Optional configuration for managing an OAuth authorization flow controlled by Access. When set, Access will act as the OAuth authorization server for this application. Only compatible with OAuth clients that support [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) (Resource Indicators for OAuth 2.0). This feature is currently in beta.\n",
  ).optional(),
  options_preflight_bypass: z.boolean().describe(
    "Allows options preflight requests to bypass Access authentication and go directly to the origin. Cannot turn on if cors_headers is set.",
  ).optional(),
  path_cookie_attribute: z.boolean().describe(
    "Enables cookie paths to scope an application's JWT to the application path. If disabled, the JWT will scope to the hostname by default",
  ).optional(),
  read_service_tokens_from_header: z.string().describe(
    'Allows matching Access Service Tokens passed HTTP in a single header with this name.\nThis works as an alternative to the (CF-Access-Client-Id, CF-Access-Client-Secret) pair of headers.\nThe header value will be interpreted as a json object similar to:\n  {\n    "cf-access-client-id": "88bf3b6d86161464f6509f7219099e57.access.example.com",\n    "cf-access-client-secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5"\n  }\n',
  ).optional(),
  same_site_cookie_attribute: z.string().describe(
    "Sets the SameSite cookie setting, which provides increased security against CSRF attacks.",
  ).optional(),
  scim_config: z.object({
    authentication: z.array(z.object({
      password: z.string(),
      scheme: z.enum(["httpbasic"]),
      user: z.string(),
    })).optional(),
    deactivate_on_delete: z.boolean().optional(),
    enabled: z.boolean().optional(),
    idp_uid: z.string(),
    mappings: z.array(z.object({
      enabled: z.boolean().optional(),
      filter: z.string().optional(),
      operations: z.object({
        create: z.boolean().optional(),
        delete: z.boolean().optional(),
        update: z.boolean().optional(),
      }).optional(),
      schema: z.string(),
      strictness: z.enum(["strict", "passthrough"]).optional(),
      transform_jsonata: z.string().optional(),
    })).optional(),
    remote_uri: z.string(),
  }).describe(
    "Configuration for provisioning to this application via SCIM. This is currently in closed beta.",
  ).optional(),
  self_hosted_domains: z.array(z.string()).describe(
    "List of public domains that Access will secure. This field is deprecated in favor of `destinations` and will be supported until **November 21, 2025.** If `destinations` are provided, then `self_hosted_domains` will be ignored.\n",
  ).optional(),
  service_auth_401_redirect: z.boolean().describe(
    "Returns a 401 status code when the request is blocked by a Service Auth policy.",
  ).optional(),
  session_duration: z.string().describe(
    "The amount of time that tokens issued for this application will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. Note: unsupported for infrastructure type applications.",
  ).optional(),
  skip_interstitial: z.boolean().describe(
    "Enables automatic authentication through cloudflared.",
  ).optional(),
  tags: z.array(z.string()).describe(
    "The tags you want assigned to an application. Tags are used to filter applications in the App Launcher dashboard.",
  ).optional(),
  type: z.string().describe("The application type."),
  use_clientless_isolation_app_launcher_url: z.boolean().describe(
    "Determines if users can access this application via a clientless browser isolation URL.\nThis allows users to access private domains without connecting to Gateway. The option requires\nClientless Browser Isolation to be set up with policies that allow users of this application.\n",
  ).optional(),
  policies: z.array(z.object({
    id: z.string().max(36).optional(),
    precedence: z.number().int().optional(),
  })).describe(
    "The policies that Access applies to the application, in ascending order of precedence. Items can reference existing policies or create new policies exclusive to the application. Reusable and inline policies are mutually exclusive.",
  ).optional(),
  saas_app: z.object({
    auth_type: z.enum(["saml", "oidc"]).optional(),
    consumer_service_url: z.string().optional(),
    created_at: z.string().optional(),
    custom_attributes: z.array(z.object({
      friendly_name: z.string().optional(),
      name: z.string().optional(),
      name_format: z.enum([
        "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
        "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
        "urn:oasis:names:tc:SAML:2.0:attrname-format:uri",
      ]).optional(),
      required: z.boolean().optional(),
      source: z.object({
        name: z.string().optional(),
        name_by_idp: z.array(z.object({
          idp_id: z.string().optional(),
          source_name: z.string().optional(),
        })).optional(),
      }).optional(),
    })).optional(),
    default_relay_state: z.string().optional(),
    idp_entity_id: z.string().optional(),
    name_id_format: z.enum(["id", "email"]).optional(),
    name_id_transform_jsonata: z.string().optional(),
    public_key: z.string().optional(),
    saml_attribute_transform_jsonata: z.string().optional(),
    sp_entity_id: z.string().optional(),
    sso_endpoint: z.string().optional(),
    updated_at: z.string().optional(),
  }).optional(),
  app_launcher_logo_url: z.string().describe(
    "The image URL of the logo shown in the App Launcher header.",
  ).optional(),
  bg_color: z.string().describe(
    "The background color of the App Launcher page.",
  ).optional(),
  footer_links: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })).describe("The links in the App Launcher footer.").optional(),
  header_bg_color: z.string().describe(
    "The background color of the App Launcher header.",
  ).optional(),
  landing_page_design: z.object({
    button_color: z.string().optional(),
    button_text_color: z.string().optional(),
    image_url: z.string().optional(),
    message: z.string().optional(),
    title: z.string().optional(),
  }).describe(
    "The design of the App Launcher landing page shown to users when they log in.",
  ).optional(),
  skip_app_launcher_login_page: z.boolean().describe(
    "Determines when to skip the App Launcher landing page.",
  ).optional(),
  target_criteria: z.array(z.object({
    port: z.number().int(),
    target_attributes: z.record(z.string(), z.unknown()),
    protocol: z.enum(["SSH"]),
  })).optional(),
}).refine(
  (d) => (d.account_id != null) !== (d.zone_id != null),
  "Exactly one of account_id or zone_id must be provided",
);

const ResourceSchema = z.object({
  errors: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  messages: z.array(z.object({
    code: z.number().optional(),
    documentation_url: z.string().optional(),
    message: z.string().optional(),
    source: z.object({
      pointer: z.string().optional(),
    }).optional(),
  })).optional(),
  success: z.boolean().optional(),
  result: z.object({
    aud: z.string().optional(),
    created_at: z.string().optional(),
    id: z.string().optional(),
    updated_at: z.string().optional(),
    allow_authenticate_via_warp: z.boolean().optional(),
    allow_iframe: z.boolean().optional(),
    allowed_idps: z.array(z.string()).optional(),
    app_launcher_visible: z.boolean().optional(),
    auto_redirect_to_identity: z.boolean().optional(),
    cors_headers: z.object({
      allow_all_headers: z.boolean().optional(),
      allow_all_methods: z.boolean().optional(),
      allow_all_origins: z.boolean().optional(),
      allow_credentials: z.boolean().optional(),
      allowed_headers: z.array(z.string()).optional(),
      allowed_methods: z.array(z.string()).optional(),
      allowed_origins: z.array(z.string()).optional(),
      max_age: z.number().optional(),
    }).optional(),
    custom_deny_message: z.string().optional(),
    custom_deny_url: z.string().optional(),
    custom_non_identity_deny_url: z.string().optional(),
    custom_pages: z.array(z.string()).optional(),
    destinations: z.array(z.object({
      type: z.string().optional(),
      uri: z.string().optional(),
    })).optional(),
    domain: z.string().optional(),
    enable_binding_cookie: z.boolean().optional(),
    http_only_cookie_attribute: z.boolean().optional(),
    logo_url: z.string().optional(),
    mfa_config: z.object({
      allowed_authenticators: z.array(z.string()).optional(),
      mfa_disabled: z.boolean().optional(),
      session_duration: z.string().optional(),
    }).optional(),
    name: z.string().optional(),
    oauth_configuration: z.object({
      dynamic_client_registration: z.object({
        allow_any_on_localhost: z.boolean().optional(),
        allow_any_on_loopback: z.boolean().optional(),
        allowed_uris: z.array(z.string()).optional(),
        enabled: z.boolean().optional(),
      }).optional(),
      enabled: z.boolean().optional(),
      grant: z.object({
        access_token_lifetime: z.string().optional(),
        session_duration: z.string().optional(),
      }).optional(),
    }).optional(),
    options_preflight_bypass: z.boolean().optional(),
    path_cookie_attribute: z.boolean().optional(),
    read_service_tokens_from_header: z.string().optional(),
    same_site_cookie_attribute: z.string().optional(),
    scim_config: z.object({
      authentication: z.array(z.object({
        password: z.string().optional(),
        scheme: z.string().optional(),
        user: z.string().optional(),
      })).optional(),
      deactivate_on_delete: z.boolean().optional(),
      enabled: z.boolean().optional(),
      idp_uid: z.string().optional(),
      mappings: z.array(z.object({
        enabled: z.boolean().optional(),
        filter: z.string().optional(),
        operations: z.object({
          create: z.boolean().optional(),
          delete: z.boolean().optional(),
          update: z.boolean().optional(),
        }).optional(),
        schema: z.string().optional(),
        strictness: z.string().optional(),
        transform_jsonata: z.string().optional(),
      })).optional(),
      remote_uri: z.string().optional(),
    }).optional(),
    self_hosted_domains: z.array(z.string()).optional(),
    service_auth_401_redirect: z.boolean().optional(),
    session_duration: z.string().optional(),
    skip_interstitial: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    type: z.string().optional(),
    use_clientless_isolation_app_launcher_url: z.boolean().optional(),
    policies: z.array(z.object({
      created_at: z.string().optional(),
      decision: z.string().optional(),
      exclude: z.array(z.object({
        group: z.object({
          id: z.string().optional(),
        }).optional(),
      })).optional(),
      id: z.string().optional(),
      include: z.array(z.object({
        group: z.object({
          id: z.string().optional(),
        }).optional(),
      })).optional(),
      name: z.string().optional(),
      require: z.array(z.object({
        group: z.object({
          id: z.string().optional(),
        }).optional(),
      })).optional(),
      updated_at: z.string().optional(),
      precedence: z.number().optional(),
    })).optional(),
  }).optional(),
  id: z.string(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  zone_id: z.string().optional(),
  allow_authenticate_via_warp: z.boolean().optional(),
  allow_iframe: z.boolean().optional(),
  allowed_idps: z.array(z.string()).optional(),
  app_launcher_visible: z.boolean().optional(),
  auto_redirect_to_identity: z.boolean().optional(),
  cors_headers: z.object({
    allow_all_headers: z.boolean().optional(),
    allow_all_methods: z.boolean().optional(),
    allow_all_origins: z.boolean().optional(),
    allow_credentials: z.boolean().optional(),
    allowed_headers: z.array(z.string()).optional(),
    allowed_methods: z.array(
      z.enum([
        "GET",
        "POST",
        "HEAD",
        "PUT",
        "DELETE",
        "CONNECT",
        "OPTIONS",
        "TRACE",
        "PATCH",
      ]),
    ).optional(),
    allowed_origins: z.array(z.string()).optional(),
    max_age: z.number().min(-1).max(86400).optional(),
  }).optional(),
  custom_deny_message: z.string().optional(),
  custom_deny_url: z.string().optional(),
  custom_non_identity_deny_url: z.string().optional(),
  custom_pages: z.array(z.string()).optional(),
  destinations: z.array(z.object({
    type: z.enum(["public"]).optional(),
    uri: z.string().optional(),
  })).optional(),
  domain: z.string().optional(),
  enable_binding_cookie: z.boolean().optional(),
  http_only_cookie_attribute: z.boolean().optional(),
  logo_url: z.string().optional(),
  mfa_config: z.object({
    allowed_authenticators: z.array(
      z.enum(["totp", "biometrics", "security_key"]),
    ).optional(),
    mfa_disabled: z.boolean().optional(),
    session_duration: z.string().optional(),
  }).optional(),
  name: z.string().optional(),
  oauth_configuration: z.object({
    dynamic_client_registration: z.object({
      allow_any_on_localhost: z.boolean().optional(),
      allow_any_on_loopback: z.boolean().optional(),
      allowed_uris: z.array(z.string()).optional(),
      enabled: z.boolean().optional(),
    }).optional(),
    enabled: z.boolean().optional(),
    grant: z.object({
      access_token_lifetime: z.string().optional(),
      session_duration: z.string().optional(),
    }).optional(),
  }).optional(),
  options_preflight_bypass: z.boolean().optional(),
  path_cookie_attribute: z.boolean().optional(),
  read_service_tokens_from_header: z.string().optional(),
  same_site_cookie_attribute: z.string().optional(),
  scim_config: z.object({
    authentication: z.array(z.object({
      password: z.string(),
      scheme: z.enum(["httpbasic"]),
      user: z.string(),
    })).optional(),
    deactivate_on_delete: z.boolean().optional(),
    enabled: z.boolean().optional(),
    idp_uid: z.string(),
    mappings: z.array(z.object({
      enabled: z.boolean().optional(),
      filter: z.string().optional(),
      operations: z.object({
        create: z.boolean().optional(),
        delete: z.boolean().optional(),
        update: z.boolean().optional(),
      }).optional(),
      schema: z.string(),
      strictness: z.enum(["strict", "passthrough"]).optional(),
      transform_jsonata: z.string().optional(),
    })).optional(),
    remote_uri: z.string(),
  }).optional(),
  self_hosted_domains: z.array(z.string()).optional(),
  service_auth_401_redirect: z.boolean().optional(),
  session_duration: z.string().optional(),
  skip_interstitial: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  type: z.string().optional(),
  use_clientless_isolation_app_launcher_url: z.boolean().optional(),
  policies: z.array(z.object({
    id: z.string().max(36).optional(),
    precedence: z.number().int().optional(),
  })).optional(),
  saas_app: z.object({
    auth_type: z.enum(["saml", "oidc"]).optional(),
    consumer_service_url: z.string().optional(),
    created_at: z.string().optional(),
    custom_attributes: z.array(z.object({
      friendly_name: z.string().optional(),
      name: z.string().optional(),
      name_format: z.enum([
        "urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified",
        "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
        "urn:oasis:names:tc:SAML:2.0:attrname-format:uri",
      ]).optional(),
      required: z.boolean().optional(),
      source: z.object({
        name: z.string().optional(),
        name_by_idp: z.array(z.object({
          idp_id: z.string().optional(),
          source_name: z.string().optional(),
        })).optional(),
      }).optional(),
    })).optional(),
    default_relay_state: z.string().optional(),
    idp_entity_id: z.string().optional(),
    name_id_format: z.enum(["id", "email"]).optional(),
    name_id_transform_jsonata: z.string().optional(),
    public_key: z.string().optional(),
    saml_attribute_transform_jsonata: z.string().optional(),
    sp_entity_id: z.string().optional(),
    sso_endpoint: z.string().optional(),
    updated_at: z.string().optional(),
  }).optional(),
  app_launcher_logo_url: z.string().optional(),
  bg_color: z.string().optional(),
  footer_links: z.array(z.object({
    name: z.string(),
    url: z.string(),
  })).optional(),
  header_bg_color: z.string().optional(),
  landing_page_design: z.object({
    button_color: z.string().optional(),
    button_text_color: z.string().optional(),
    image_url: z.string().optional(),
    message: z.string().optional(),
    title: z.string().optional(),
  }).optional(),
  skip_app_launcher_login_page: z.boolean().optional(),
  target_criteria: z.array(z.object({
    port: z.number().int(),
    target_attributes: z.record(z.string(), z.unknown()),
    protocol: z.enum(["SSH"]),
  })).optional(),
});

/** Swamp extension model for Cloudflare Apps. Registered at `@swamp/cloudflare/access/apps`. */
export const model = {
  type: "@swamp/cloudflare/access/apps",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Apps resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Apps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/apps";
        const body: Record<string, unknown> = {};
        if (g.allow_authenticate_via_warp !== undefined) {
          body.allow_authenticate_via_warp = g.allow_authenticate_via_warp;
        }
        if (g.allow_iframe !== undefined) body.allow_iframe = g.allow_iframe;
        if (g.allowed_idps !== undefined) body.allowed_idps = g.allowed_idps;
        if (g.app_launcher_visible !== undefined) {
          body.app_launcher_visible = g.app_launcher_visible;
        }
        if (g.auto_redirect_to_identity !== undefined) {
          body.auto_redirect_to_identity = g.auto_redirect_to_identity;
        }
        if (g.cors_headers !== undefined) body.cors_headers = g.cors_headers;
        if (g.custom_deny_message !== undefined) {
          body.custom_deny_message = g.custom_deny_message;
        }
        if (g.custom_deny_url !== undefined) {
          body.custom_deny_url = g.custom_deny_url;
        }
        if (g.custom_non_identity_deny_url !== undefined) {
          body.custom_non_identity_deny_url = g.custom_non_identity_deny_url;
        }
        if (g.custom_pages !== undefined) body.custom_pages = g.custom_pages;
        if (g.destinations !== undefined) body.destinations = g.destinations;
        if (g.domain !== undefined) body.domain = g.domain;
        if (g.enable_binding_cookie !== undefined) {
          body.enable_binding_cookie = g.enable_binding_cookie;
        }
        if (g.http_only_cookie_attribute !== undefined) {
          body.http_only_cookie_attribute = g.http_only_cookie_attribute;
        }
        if (g.logo_url !== undefined) body.logo_url = g.logo_url;
        if (g.mfa_config !== undefined) body.mfa_config = g.mfa_config;
        if (g.name !== undefined) body.name = g.name;
        if (g.oauth_configuration !== undefined) {
          body.oauth_configuration = g.oauth_configuration;
        }
        if (g.options_preflight_bypass !== undefined) {
          body.options_preflight_bypass = g.options_preflight_bypass;
        }
        if (g.path_cookie_attribute !== undefined) {
          body.path_cookie_attribute = g.path_cookie_attribute;
        }
        if (g.read_service_tokens_from_header !== undefined) {
          body.read_service_tokens_from_header =
            g.read_service_tokens_from_header;
        }
        if (g.same_site_cookie_attribute !== undefined) {
          body.same_site_cookie_attribute = g.same_site_cookie_attribute;
        }
        if (g.scim_config !== undefined) body.scim_config = g.scim_config;
        if (g.self_hosted_domains !== undefined) {
          body.self_hosted_domains = g.self_hosted_domains;
        }
        if (g.service_auth_401_redirect !== undefined) {
          body.service_auth_401_redirect = g.service_auth_401_redirect;
        }
        if (g.session_duration !== undefined) {
          body.session_duration = g.session_duration;
        }
        if (g.skip_interstitial !== undefined) {
          body.skip_interstitial = g.skip_interstitial;
        }
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.type !== undefined) body.type = g.type;
        if (g.use_clientless_isolation_app_launcher_url !== undefined) {
          body.use_clientless_isolation_app_launcher_url =
            g.use_clientless_isolation_app_launcher_url;
        }
        if (g.policies !== undefined) body.policies = g.policies;
        if (g.saas_app !== undefined) body.saas_app = g.saas_app;
        if (g.app_launcher_logo_url !== undefined) {
          body.app_launcher_logo_url = g.app_launcher_logo_url;
        }
        if (g.bg_color !== undefined) body.bg_color = g.bg_color;
        if (g.footer_links !== undefined) body.footer_links = g.footer_links;
        if (g.header_bg_color !== undefined) {
          body.header_bg_color = g.header_bg_color;
        }
        if (g.landing_page_design !== undefined) {
          body.landing_page_design = g.landing_page_design;
        }
        if (g.skip_app_launcher_login_page !== undefined) {
          body.skip_app_launcher_login_page = g.skip_app_launcher_login_page;
        }
        if (g.target_criteria !== undefined) {
          body.target_criteria = g.target_criteria;
        }
        const result = await create(endpoint, body) as ResourceData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Apps",
      arguments: z.object({ id: z.string().describe("The ID of the Apps") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/apps";
        const result = await read(endpoint, args.id) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Apps attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/apps";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.allow_authenticate_via_warp !== undefined) {
          body.allow_authenticate_via_warp = g.allow_authenticate_via_warp;
        }
        if (g.allow_iframe !== undefined) body.allow_iframe = g.allow_iframe;
        if (g.allowed_idps !== undefined) body.allowed_idps = g.allowed_idps;
        if (g.app_launcher_visible !== undefined) {
          body.app_launcher_visible = g.app_launcher_visible;
        }
        if (g.auto_redirect_to_identity !== undefined) {
          body.auto_redirect_to_identity = g.auto_redirect_to_identity;
        }
        if (g.cors_headers !== undefined) body.cors_headers = g.cors_headers;
        if (g.custom_deny_message !== undefined) {
          body.custom_deny_message = g.custom_deny_message;
        }
        if (g.custom_deny_url !== undefined) {
          body.custom_deny_url = g.custom_deny_url;
        }
        if (g.custom_non_identity_deny_url !== undefined) {
          body.custom_non_identity_deny_url = g.custom_non_identity_deny_url;
        }
        if (g.custom_pages !== undefined) body.custom_pages = g.custom_pages;
        if (g.destinations !== undefined) body.destinations = g.destinations;
        if (g.domain !== undefined) body.domain = g.domain;
        if (g.enable_binding_cookie !== undefined) {
          body.enable_binding_cookie = g.enable_binding_cookie;
        }
        if (g.http_only_cookie_attribute !== undefined) {
          body.http_only_cookie_attribute = g.http_only_cookie_attribute;
        }
        if (g.logo_url !== undefined) body.logo_url = g.logo_url;
        if (g.mfa_config !== undefined) body.mfa_config = g.mfa_config;
        if (g.name !== undefined) body.name = g.name;
        if (g.oauth_configuration !== undefined) {
          body.oauth_configuration = g.oauth_configuration;
        }
        if (g.options_preflight_bypass !== undefined) {
          body.options_preflight_bypass = g.options_preflight_bypass;
        }
        if (g.path_cookie_attribute !== undefined) {
          body.path_cookie_attribute = g.path_cookie_attribute;
        }
        if (g.read_service_tokens_from_header !== undefined) {
          body.read_service_tokens_from_header =
            g.read_service_tokens_from_header;
        }
        if (g.same_site_cookie_attribute !== undefined) {
          body.same_site_cookie_attribute = g.same_site_cookie_attribute;
        }
        if (g.scim_config !== undefined) body.scim_config = g.scim_config;
        if (g.self_hosted_domains !== undefined) {
          body.self_hosted_domains = g.self_hosted_domains;
        }
        if (g.service_auth_401_redirect !== undefined) {
          body.service_auth_401_redirect = g.service_auth_401_redirect;
        }
        if (g.session_duration !== undefined) {
          body.session_duration = g.session_duration;
        }
        if (g.skip_interstitial !== undefined) {
          body.skip_interstitial = g.skip_interstitial;
        }
        if (g.tags !== undefined) body.tags = g.tags;
        if (g.type !== undefined) body.type = g.type;
        if (g.use_clientless_isolation_app_launcher_url !== undefined) {
          body.use_clientless_isolation_app_launcher_url =
            g.use_clientless_isolation_app_launcher_url;
        }
        if (g.policies !== undefined) body.policies = g.policies;
        if (g.saas_app !== undefined) body.saas_app = g.saas_app;
        if (g.app_launcher_logo_url !== undefined) {
          body.app_launcher_logo_url = g.app_launcher_logo_url;
        }
        if (g.bg_color !== undefined) body.bg_color = g.bg_color;
        if (g.footer_links !== undefined) body.footer_links = g.footer_links;
        if (g.header_bg_color !== undefined) {
          body.header_bg_color = g.header_bg_color;
        }
        if (g.landing_page_design !== undefined) {
          body.landing_page_design = g.landing_page_design;
        }
        if (g.skip_app_launcher_login_page !== undefined) {
          body.skip_app_launcher_login_page = g.skip_app_launcher_login_page;
        }
        if (g.target_criteria !== undefined) {
          body.target_criteria = g.target_criteria;
        }
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Apps",
      arguments: z.object({ id: z.string().describe("The ID of the Apps") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/apps";
        const { existed } = await remove(endpoint, args.id);
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Apps state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/access/apps";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
