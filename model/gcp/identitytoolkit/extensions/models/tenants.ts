// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/identitytoolkit/tenants
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity Toolkit Tenants.
 *
 * A Tenant contains configuration for the tenant in a multi-tenant project.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/tenants/${shortName}`;
}

const BASE_URL = "https://identitytoolkit.googleapis.com/";

const GET_CONFIG = {
  "id": "identitytoolkit.projects.tenants.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "identitytoolkit.projects.tenants.create",
  "path": "v2/{+parent}/tenants",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "identitytoolkit.projects.tenants.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "identitytoolkit.projects.tenants.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "identitytoolkit.projects.tenants.list",
  "path": "v2/{+parent}/tenants",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  allowPasswordSignup: z.boolean().describe(
    "Whether to allow email/password user authentication.",
  ).optional(),
  autodeleteAnonymousUsers: z.boolean().describe(
    "Whether anonymous users will be auto-deleted after a period of 30 days.",
  ).optional(),
  client: z.object({
    permissions: z.object({
      disabledUserDeletion: z.boolean().describe(
        "When true, end users cannot delete their account on the associated project through any of our API methods",
      ).optional(),
      disabledUserSignup: z.boolean().describe(
        "When true, end users cannot sign up for a new account on the associated project through any of our API methods",
      ).optional(),
    }).describe(
      "Configuration related to restricting a user's ability to affect their account.",
    ).optional(),
  }).describe(
    "Options related to how clients making requests on behalf of a tenant should be configured.",
  ).optional(),
  disableAuth: z.boolean().describe(
    "Whether authentication is disabled for the tenant. If true, the users under the disabled tenant are not allowed to sign-in. Admins of the disabled tenant are not able to manage its users.",
  ).optional(),
  displayName: z.string().describe("Display name of the tenant.").optional(),
  emailPrivacyConfig: z.object({
    enableImprovedEmailPrivacy: z.boolean().describe(
      "Migrates the project to a state of improved email privacy. For example certain error codes are more generic to avoid giving away information on whether the account exists. In addition, this disables certain features that as a side-effect allow user enumeration. Enabling this toggle disables the fetchSignInMethodsForEmail functionality and changing the user's email to an unverified email. It is recommended to remove dependence on this functionality and enable this toggle to improve user privacy.",
    ).optional(),
  }).describe(
    "Configuration for settings related to email privacy and public visibility. Settings in this config protect against email enumeration, but may make some trade-offs in user-friendliness.",
  ).optional(),
  enableAnonymousUser: z.boolean().describe(
    "Whether to enable anonymous user authentication.",
  ).optional(),
  enableEmailLinkSignin: z.boolean().describe(
    "Whether to enable email link user authentication.",
  ).optional(),
  hashConfig: z.object({
    algorithm: z.enum([
      "HASH_ALGORITHM_UNSPECIFIED",
      "HMAC_SHA256",
      "HMAC_SHA1",
      "HMAC_MD5",
      "SCRYPT",
      "PBKDF_SHA1",
      "MD5",
      "HMAC_SHA512",
      "SHA1",
      "BCRYPT",
      "PBKDF2_SHA256",
      "SHA256",
      "SHA512",
      "STANDARD_SCRYPT",
    ]).describe(
      "Output only. Different password hash algorithms used in Identity Toolkit.",
    ).optional(),
    memoryCost: z.number().int().describe(
      "Output only. Memory cost for hash calculation. Used by scrypt and other similar password derivation algorithms. See https://tools.ietf.org/html/rfc7914 for explanation of field.",
    ).optional(),
    rounds: z.number().int().describe(
      "Output only. How many rounds for hash calculation. Used by scrypt and other similar password derivation algorithms.",
    ).optional(),
    saltSeparator: z.string().describe(
      "Output only. Non-printable character to be inserted between the salt and plain text password in base64.",
    ).optional(),
    signerKey: z.string().describe("Output only. Signer key in base64.")
      .optional(),
  }).describe(
    "History information of the hash algorithm and key. Different accounts' passwords may be generated by different version.",
  ).optional(),
  inheritance: z.object({
    emailSendingConfig: z.boolean().describe(
      "Whether to allow the tenant to inherit custom domains, email templates, and custom SMTP settings. If true, email sent from tenant will follow the project level email sending configurations. If false (by default), emails will go with the default settings with no customizations.",
    ).optional(),
  }).describe("Settings that the tenants will inherit from project level.")
    .optional(),
  mfaConfig: z.object({
    enabledProviders: z.array(z.enum(["PROVIDER_UNSPECIFIED", "PHONE_SMS"]))
      .describe("A list of usable second factors for this project.").optional(),
    providerConfigs: z.array(z.object({
      state: z.enum([
        "MFA_STATE_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
        "MANDATORY",
      ]).describe("Describes the state of the MultiFactor Authentication type.")
        .optional(),
      totpProviderConfig: z.object({
        adjacentIntervals: z.number().int().describe(
          "The allowed number of adjacent intervals that will be used for verification to avoid clock skew.",
        ).optional(),
      }).describe(
        "TotpMFAProviderConfig represents the TOTP based MFA provider.",
      ).optional(),
    })).describe(
      "A list of usable second factors for this project along with their configurations. This field does not support phone based MFA, for that use the 'enabled_providers' field.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "DISABLED", "ENABLED", "MANDATORY"])
      .describe(
        "Whether MultiFactor Authentication has been enabled for this project.",
      ).optional(),
  }).describe("Options related to MultiFactor Authentication for the project.")
    .optional(),
  mobileLinksConfig: z.object({
    domain: z.enum([
      "DOMAIN_UNSPECIFIED",
      "FIREBASE_DYNAMIC_LINK_DOMAIN",
      "HOSTING_DOMAIN",
    ]).describe(
      "Open code in app domain to use for app links and universal links.",
    ).optional(),
  }).describe("Configuration mobile links.").optional(),
  monitoring: z.object({
    requestLogging: z.object({
      enabled: z.boolean().describe(
        "Whether logging is enabled for this project or not.",
      ).optional(),
    }).describe(
      "Configuration for logging requests made to this project to Stackdriver Logging",
    ).optional(),
  }).describe("Configuration related to monitoring project activity.")
    .optional(),
  passwordPolicyConfig: z.object({
    forceUpgradeOnSignin: z.boolean().describe(
      "Users must have a password compliant with the password policy to sign-in.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. The last time the password policy on the project was updated.",
    ).optional(),
    passwordPolicyEnforcementState: z.enum([
      "PASSWORD_POLICY_ENFORCEMENT_STATE_UNSPECIFIED",
      "OFF",
      "ENFORCE",
    ]).describe("Which enforcement mode to use for the password policy.")
      .optional(),
    passwordPolicyVersions: z.array(z.object({
      customStrengthOptions: z.object({
        containsLowercaseCharacter: z.boolean().describe(
          "The password must contain a lower case character.",
        ).optional(),
        containsNonAlphanumericCharacter: z.boolean().describe(
          "The password must contain a non alpha numeric character.",
        ).optional(),
        containsNumericCharacter: z.boolean().describe(
          "The password must contain a number.",
        ).optional(),
        containsUppercaseCharacter: z.boolean().describe(
          "The password must contain an upper case character.",
        ).optional(),
        maxPasswordLength: z.number().int().describe(
          "Maximum password length. No default max length",
        ).optional(),
        minPasswordLength: z.number().int().describe(
          "Minimum password length. Range from 6 to 30",
        ).optional(),
      }).describe("Custom strength options to enforce on user passwords.")
        .optional(),
      schemaVersion: z.number().int().describe(
        "Output only. schema version number for the password policy",
      ).optional(),
    })).describe(
      "Must be of length 1. Contains the strength attributes for the password policy.",
    ).optional(),
  }).describe("The configuration for the password policy on the project.")
    .optional(),
  recaptchaConfig: z.object({
    emailPasswordEnforcementState: z.enum([
      "RECAPTCHA_PROVIDER_ENFORCEMENT_STATE_UNSPECIFIED",
      "OFF",
      "AUDIT",
      "ENFORCE",
    ]).describe(
      "The reCAPTCHA config for email/password provider, containing the enforcement status. The email/password provider contains all email related user flows protected by reCAPTCHA.",
    ).optional(),
    managedRules: z.array(z.object({
      action: z.enum(["RECAPTCHA_ACTION_UNSPECIFIED", "BLOCK"]).describe(
        "The action taken if the reCAPTCHA score of a request is within the interval [start_score, end_score].",
      ).optional(),
      endScore: z.number().describe(
        "The end score (inclusive) of the score range for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3,... 0.9, 1.0. A score of 0.0 indicates the riskiest request (likely a bot), whereas 1.0 indicates the safest request (likely a human). See https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment.",
      ).optional(),
    })).describe(
      "The managed rules for authentication action based on reCAPTCHA scores. The rules are shared across providers for a given tenant project.",
    ).optional(),
    phoneEnforcementState: z.enum([
      "RECAPTCHA_PROVIDER_ENFORCEMENT_STATE_UNSPECIFIED",
      "OFF",
      "AUDIT",
      "ENFORCE",
    ]).describe(
      "The reCAPTCHA config for phone provider, containing the enforcement status. The phone provider contains all SMS related user flows protected by reCAPTCHA.",
    ).optional(),
    recaptchaKeys: z.array(z.object({
      key: z.string().describe(
        'The reCAPTCHA Enterprise key resource name, e.g. "projects/{project}/keys/{key}"',
      ).optional(),
      type: z.enum(["CLIENT_TYPE_UNSPECIFIED", "WEB", "IOS", "ANDROID"])
        .describe("The client's platform type.").optional(),
    })).describe("The reCAPTCHA keys.").optional(),
    tollFraudManagedRules: z.array(z.object({
      action: z.enum(["RECAPTCHA_ACTION_UNSPECIFIED", "BLOCK"]).describe(
        "The action taken if the reCAPTCHA score of a request is within the interval [start_score, end_score].",
      ).optional(),
      startScore: z.number().describe(
        "The start score (inclusive) for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3,... 0.9, 1.0. A score of 0.0 indicates the safest request (likely legitimate), whereas 1.0 indicates the riskiest request (likely toll fraud). See https://cloud.google.com/recaptcha-enterprise/docs/sms-fraud-detection#create-assessment-sms.",
      ).optional(),
    })).describe(
      "The managed rules for the authentication action based on reCAPTCHA toll fraud risk scores. Toll fraud managed rules will only take effect when the phone_enforcement_state is AUDIT or ENFORCE and use_sms_toll_fraud_protection is true.",
    ).optional(),
    useAccountDefender: z.boolean().describe(
      "Whether to use the account defender for reCAPTCHA assessment. Defaults to `false`.",
    ).optional(),
    useSmsBotScore: z.boolean().describe(
      "Whether to use the rCE bot score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE.",
    ).optional(),
    useSmsTollFraudProtection: z.boolean().describe(
      "Whether to use the rCE sms toll fraud protection risk score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE.",
    ).optional(),
  }).describe("The reCAPTCHA Enterprise integration config.").optional(),
  smsRegionConfig: z.object({
    allowByDefault: z.object({
      disallowedRegions: z.array(z.string()).describe(
        "Two letter unicode region codes to disallow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json",
      ).optional(),
    }).describe(
      "Defines a policy of allowing every region by default and adding disallowed regions to a disallow list.",
    ).optional(),
    allowlistOnly: z.object({
      allowedRegions: z.array(z.string()).describe(
        "Two letter unicode region codes to allow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json",
      ).optional(),
    }).describe(
      "Defines a policy of only allowing regions by explicitly adding them to an allowlist.",
    ).optional(),
  }).describe(
    "Configures the regions where users are allowed to send verification SMS for the project or tenant. This is based on the calling code of the destination phone number.",
  ).optional(),
  testPhoneNumbers: z.record(z.string(), z.string()).describe(
    "A map of pairs that can be used for MFA. The phone number should be in E.164 format (https://www.itu.int/rec/T-REC-E.164/) and a maximum of 10 pairs can be added (error will be thrown once exceeded).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  allowPasswordSignup: z.boolean().optional(),
  autodeleteAnonymousUsers: z.boolean().optional(),
  client: z.object({
    permissions: z.object({
      disabledUserDeletion: z.boolean(),
      disabledUserSignup: z.boolean(),
    }),
  }).optional(),
  disableAuth: z.boolean().optional(),
  displayName: z.string().optional(),
  emailPrivacyConfig: z.object({
    enableImprovedEmailPrivacy: z.boolean(),
  }).optional(),
  enableAnonymousUser: z.boolean().optional(),
  enableEmailLinkSignin: z.boolean().optional(),
  hashConfig: z.object({
    algorithm: z.string(),
    memoryCost: z.number(),
    rounds: z.number(),
    saltSeparator: z.string(),
    signerKey: z.string(),
  }).optional(),
  inheritance: z.object({
    emailSendingConfig: z.boolean(),
  }).optional(),
  mfaConfig: z.object({
    enabledProviders: z.array(z.string()),
    providerConfigs: z.array(z.object({
      state: z.string(),
      totpProviderConfig: z.object({
        adjacentIntervals: z.number(),
      }),
    })),
    state: z.string(),
  }).optional(),
  mobileLinksConfig: z.object({
    domain: z.string(),
  }).optional(),
  monitoring: z.object({
    requestLogging: z.object({
      enabled: z.boolean(),
    }),
  }).optional(),
  name: z.string(),
  passwordPolicyConfig: z.object({
    forceUpgradeOnSignin: z.boolean(),
    lastUpdateTime: z.string(),
    passwordPolicyEnforcementState: z.string(),
    passwordPolicyVersions: z.array(z.object({
      customStrengthOptions: z.object({
        containsLowercaseCharacter: z.boolean(),
        containsNonAlphanumericCharacter: z.boolean(),
        containsNumericCharacter: z.boolean(),
        containsUppercaseCharacter: z.boolean(),
        maxPasswordLength: z.number(),
        minPasswordLength: z.number(),
      }),
      schemaVersion: z.number(),
    })),
  }).optional(),
  recaptchaConfig: z.object({
    emailPasswordEnforcementState: z.string(),
    managedRules: z.array(z.object({
      action: z.string(),
      endScore: z.number(),
    })),
    phoneEnforcementState: z.string(),
    recaptchaKeys: z.array(z.object({
      key: z.string(),
      type: z.string(),
    })),
    tollFraudManagedRules: z.array(z.object({
      action: z.string(),
      startScore: z.number(),
    })),
    useAccountDefender: z.boolean(),
    useSmsBotScore: z.boolean(),
    useSmsTollFraudProtection: z.boolean(),
  }).optional(),
  smsRegionConfig: z.object({
    allowByDefault: z.object({
      disallowedRegions: z.array(z.string()),
    }),
    allowlistOnly: z.object({
      allowedRegions: z.array(z.string()),
    }),
  }).optional(),
  testPhoneNumbers: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  allowPasswordSignup: z.boolean().describe(
    "Whether to allow email/password user authentication.",
  ).optional(),
  autodeleteAnonymousUsers: z.boolean().describe(
    "Whether anonymous users will be auto-deleted after a period of 30 days.",
  ).optional(),
  client: z.object({
    permissions: z.object({
      disabledUserDeletion: z.boolean().describe(
        "When true, end users cannot delete their account on the associated project through any of our API methods",
      ).optional(),
      disabledUserSignup: z.boolean().describe(
        "When true, end users cannot sign up for a new account on the associated project through any of our API methods",
      ).optional(),
    }).describe(
      "Configuration related to restricting a user's ability to affect their account.",
    ).optional(),
  }).describe(
    "Options related to how clients making requests on behalf of a tenant should be configured.",
  ).optional(),
  disableAuth: z.boolean().describe(
    "Whether authentication is disabled for the tenant. If true, the users under the disabled tenant are not allowed to sign-in. Admins of the disabled tenant are not able to manage its users.",
  ).optional(),
  displayName: z.string().describe("Display name of the tenant.").optional(),
  emailPrivacyConfig: z.object({
    enableImprovedEmailPrivacy: z.boolean().describe(
      "Migrates the project to a state of improved email privacy. For example certain error codes are more generic to avoid giving away information on whether the account exists. In addition, this disables certain features that as a side-effect allow user enumeration. Enabling this toggle disables the fetchSignInMethodsForEmail functionality and changing the user's email to an unverified email. It is recommended to remove dependence on this functionality and enable this toggle to improve user privacy.",
    ).optional(),
  }).describe(
    "Configuration for settings related to email privacy and public visibility. Settings in this config protect against email enumeration, but may make some trade-offs in user-friendliness.",
  ).optional(),
  enableAnonymousUser: z.boolean().describe(
    "Whether to enable anonymous user authentication.",
  ).optional(),
  enableEmailLinkSignin: z.boolean().describe(
    "Whether to enable email link user authentication.",
  ).optional(),
  hashConfig: z.object({
    algorithm: z.enum([
      "HASH_ALGORITHM_UNSPECIFIED",
      "HMAC_SHA256",
      "HMAC_SHA1",
      "HMAC_MD5",
      "SCRYPT",
      "PBKDF_SHA1",
      "MD5",
      "HMAC_SHA512",
      "SHA1",
      "BCRYPT",
      "PBKDF2_SHA256",
      "SHA256",
      "SHA512",
      "STANDARD_SCRYPT",
    ]).describe(
      "Output only. Different password hash algorithms used in Identity Toolkit.",
    ).optional(),
    memoryCost: z.number().int().describe(
      "Output only. Memory cost for hash calculation. Used by scrypt and other similar password derivation algorithms. See https://tools.ietf.org/html/rfc7914 for explanation of field.",
    ).optional(),
    rounds: z.number().int().describe(
      "Output only. How many rounds for hash calculation. Used by scrypt and other similar password derivation algorithms.",
    ).optional(),
    saltSeparator: z.string().describe(
      "Output only. Non-printable character to be inserted between the salt and plain text password in base64.",
    ).optional(),
    signerKey: z.string().describe("Output only. Signer key in base64.")
      .optional(),
  }).describe(
    "History information of the hash algorithm and key. Different accounts' passwords may be generated by different version.",
  ).optional(),
  inheritance: z.object({
    emailSendingConfig: z.boolean().describe(
      "Whether to allow the tenant to inherit custom domains, email templates, and custom SMTP settings. If true, email sent from tenant will follow the project level email sending configurations. If false (by default), emails will go with the default settings with no customizations.",
    ).optional(),
  }).describe("Settings that the tenants will inherit from project level.")
    .optional(),
  mfaConfig: z.object({
    enabledProviders: z.array(z.enum(["PROVIDER_UNSPECIFIED", "PHONE_SMS"]))
      .describe("A list of usable second factors for this project.").optional(),
    providerConfigs: z.array(z.object({
      state: z.enum([
        "MFA_STATE_UNSPECIFIED",
        "DISABLED",
        "ENABLED",
        "MANDATORY",
      ]).describe("Describes the state of the MultiFactor Authentication type.")
        .optional(),
      totpProviderConfig: z.object({
        adjacentIntervals: z.number().int().describe(
          "The allowed number of adjacent intervals that will be used for verification to avoid clock skew.",
        ).optional(),
      }).describe(
        "TotpMFAProviderConfig represents the TOTP based MFA provider.",
      ).optional(),
    })).describe(
      "A list of usable second factors for this project along with their configurations. This field does not support phone based MFA, for that use the 'enabled_providers' field.",
    ).optional(),
    state: z.enum(["STATE_UNSPECIFIED", "DISABLED", "ENABLED", "MANDATORY"])
      .describe(
        "Whether MultiFactor Authentication has been enabled for this project.",
      ).optional(),
  }).describe("Options related to MultiFactor Authentication for the project.")
    .optional(),
  mobileLinksConfig: z.object({
    domain: z.enum([
      "DOMAIN_UNSPECIFIED",
      "FIREBASE_DYNAMIC_LINK_DOMAIN",
      "HOSTING_DOMAIN",
    ]).describe(
      "Open code in app domain to use for app links and universal links.",
    ).optional(),
  }).describe("Configuration mobile links.").optional(),
  monitoring: z.object({
    requestLogging: z.object({
      enabled: z.boolean().describe(
        "Whether logging is enabled for this project or not.",
      ).optional(),
    }).describe(
      "Configuration for logging requests made to this project to Stackdriver Logging",
    ).optional(),
  }).describe("Configuration related to monitoring project activity.")
    .optional(),
  passwordPolicyConfig: z.object({
    forceUpgradeOnSignin: z.boolean().describe(
      "Users must have a password compliant with the password policy to sign-in.",
    ).optional(),
    lastUpdateTime: z.string().describe(
      "Output only. The last time the password policy on the project was updated.",
    ).optional(),
    passwordPolicyEnforcementState: z.enum([
      "PASSWORD_POLICY_ENFORCEMENT_STATE_UNSPECIFIED",
      "OFF",
      "ENFORCE",
    ]).describe("Which enforcement mode to use for the password policy.")
      .optional(),
    passwordPolicyVersions: z.array(z.object({
      customStrengthOptions: z.object({
        containsLowercaseCharacter: z.boolean().describe(
          "The password must contain a lower case character.",
        ).optional(),
        containsNonAlphanumericCharacter: z.boolean().describe(
          "The password must contain a non alpha numeric character.",
        ).optional(),
        containsNumericCharacter: z.boolean().describe(
          "The password must contain a number.",
        ).optional(),
        containsUppercaseCharacter: z.boolean().describe(
          "The password must contain an upper case character.",
        ).optional(),
        maxPasswordLength: z.number().int().describe(
          "Maximum password length. No default max length",
        ).optional(),
        minPasswordLength: z.number().int().describe(
          "Minimum password length. Range from 6 to 30",
        ).optional(),
      }).describe("Custom strength options to enforce on user passwords.")
        .optional(),
      schemaVersion: z.number().int().describe(
        "Output only. schema version number for the password policy",
      ).optional(),
    })).describe(
      "Must be of length 1. Contains the strength attributes for the password policy.",
    ).optional(),
  }).describe("The configuration for the password policy on the project.")
    .optional(),
  recaptchaConfig: z.object({
    emailPasswordEnforcementState: z.enum([
      "RECAPTCHA_PROVIDER_ENFORCEMENT_STATE_UNSPECIFIED",
      "OFF",
      "AUDIT",
      "ENFORCE",
    ]).describe(
      "The reCAPTCHA config for email/password provider, containing the enforcement status. The email/password provider contains all email related user flows protected by reCAPTCHA.",
    ).optional(),
    managedRules: z.array(z.object({
      action: z.enum(["RECAPTCHA_ACTION_UNSPECIFIED", "BLOCK"]).describe(
        "The action taken if the reCAPTCHA score of a request is within the interval [start_score, end_score].",
      ).optional(),
      endScore: z.number().describe(
        "The end score (inclusive) of the score range for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3,... 0.9, 1.0. A score of 0.0 indicates the riskiest request (likely a bot), whereas 1.0 indicates the safest request (likely a human). See https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment.",
      ).optional(),
    })).describe(
      "The managed rules for authentication action based on reCAPTCHA scores. The rules are shared across providers for a given tenant project.",
    ).optional(),
    phoneEnforcementState: z.enum([
      "RECAPTCHA_PROVIDER_ENFORCEMENT_STATE_UNSPECIFIED",
      "OFF",
      "AUDIT",
      "ENFORCE",
    ]).describe(
      "The reCAPTCHA config for phone provider, containing the enforcement status. The phone provider contains all SMS related user flows protected by reCAPTCHA.",
    ).optional(),
    recaptchaKeys: z.array(z.object({
      key: z.string().describe(
        'The reCAPTCHA Enterprise key resource name, e.g. "projects/{project}/keys/{key}"',
      ).optional(),
      type: z.enum(["CLIENT_TYPE_UNSPECIFIED", "WEB", "IOS", "ANDROID"])
        .describe("The client's platform type.").optional(),
    })).describe("The reCAPTCHA keys.").optional(),
    tollFraudManagedRules: z.array(z.object({
      action: z.enum(["RECAPTCHA_ACTION_UNSPECIFIED", "BLOCK"]).describe(
        "The action taken if the reCAPTCHA score of a request is within the interval [start_score, end_score].",
      ).optional(),
      startScore: z.number().describe(
        "The start score (inclusive) for an action. Must be a value between 0.0 and 1.0, at 11 discrete values; e.g. 0, 0.1, 0.2, 0.3,... 0.9, 1.0. A score of 0.0 indicates the safest request (likely legitimate), whereas 1.0 indicates the riskiest request (likely toll fraud). See https://cloud.google.com/recaptcha-enterprise/docs/sms-fraud-detection#create-assessment-sms.",
      ).optional(),
    })).describe(
      "The managed rules for the authentication action based on reCAPTCHA toll fraud risk scores. Toll fraud managed rules will only take effect when the phone_enforcement_state is AUDIT or ENFORCE and use_sms_toll_fraud_protection is true.",
    ).optional(),
    useAccountDefender: z.boolean().describe(
      "Whether to use the account defender for reCAPTCHA assessment. Defaults to `false`.",
    ).optional(),
    useSmsBotScore: z.boolean().describe(
      "Whether to use the rCE bot score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE.",
    ).optional(),
    useSmsTollFraudProtection: z.boolean().describe(
      "Whether to use the rCE sms toll fraud protection risk score for reCAPTCHA phone provider. Can only be true when the phone_enforcement_state is AUDIT or ENFORCE.",
    ).optional(),
  }).describe("The reCAPTCHA Enterprise integration config.").optional(),
  smsRegionConfig: z.object({
    allowByDefault: z.object({
      disallowedRegions: z.array(z.string()).describe(
        "Two letter unicode region codes to disallow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json",
      ).optional(),
    }).describe(
      "Defines a policy of allowing every region by default and adding disallowed regions to a disallow list.",
    ).optional(),
    allowlistOnly: z.object({
      allowedRegions: z.array(z.string()).describe(
        "Two letter unicode region codes to allow as defined by https://cldr.unicode.org/ The full list of these region codes is here: https://github.com/unicode-cldr/cldr-localenames-full/blob/master/main/en/territories.json",
      ).optional(),
    }).describe(
      "Defines a policy of only allowing regions by explicitly adding them to an allowlist.",
    ).optional(),
  }).describe(
    "Configures the regions where users are allowed to send verification SMS for the project or tenant. This is based on the calling code of the destination phone number.",
  ).optional(),
  testPhoneNumbers: z.record(z.string(), z.string()).describe(
    "A map of pairs that can be used for MFA. The phone number should be in E.164 format (https://www.itu.int/rec/T-REC-E.164/) and a maximum of 10 pairs can be added (error will be thrown once exceeded).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Identity Toolkit Tenants. Registered at `@swamp/gcp/identitytoolkit/tenants`. */
export const model = {
  type: "@swamp/gcp/identitytoolkit/tenants",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Tenant contains configuration for the tenant in a multi-tenant project.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tenants",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["allowPasswordSignup"] !== undefined) {
          body["allowPasswordSignup"] = g["allowPasswordSignup"];
        }
        if (g["autodeleteAnonymousUsers"] !== undefined) {
          body["autodeleteAnonymousUsers"] = g["autodeleteAnonymousUsers"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["disableAuth"] !== undefined) {
          body["disableAuth"] = g["disableAuth"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["emailPrivacyConfig"] !== undefined) {
          body["emailPrivacyConfig"] = g["emailPrivacyConfig"];
        }
        if (g["enableAnonymousUser"] !== undefined) {
          body["enableAnonymousUser"] = g["enableAnonymousUser"];
        }
        if (g["enableEmailLinkSignin"] !== undefined) {
          body["enableEmailLinkSignin"] = g["enableEmailLinkSignin"];
        }
        if (g["hashConfig"] !== undefined) body["hashConfig"] = g["hashConfig"];
        if (g["inheritance"] !== undefined) {
          body["inheritance"] = g["inheritance"];
        }
        if (g["mfaConfig"] !== undefined) body["mfaConfig"] = g["mfaConfig"];
        if (g["mobileLinksConfig"] !== undefined) {
          body["mobileLinksConfig"] = g["mobileLinksConfig"];
        }
        if (g["monitoring"] !== undefined) body["monitoring"] = g["monitoring"];
        if (g["passwordPolicyConfig"] !== undefined) {
          body["passwordPolicyConfig"] = g["passwordPolicyConfig"];
        }
        if (g["recaptchaConfig"] !== undefined) {
          body["recaptchaConfig"] = g["recaptchaConfig"];
        }
        if (g["smsRegionConfig"] !== undefined) {
          body["smsRegionConfig"] = g["smsRegionConfig"];
        }
        if (g["testPhoneNumbers"] !== undefined) {
          body["testPhoneNumbers"] = g["testPhoneNumbers"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
        ) as StateData;
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
      description: "Get a tenants",
      arguments: z.object({
        identifier: z.string().describe("The name of the tenants"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update tenants attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["allowPasswordSignup"] !== undefined) {
          body["allowPasswordSignup"] = g["allowPasswordSignup"];
        }
        if (g["autodeleteAnonymousUsers"] !== undefined) {
          body["autodeleteAnonymousUsers"] = g["autodeleteAnonymousUsers"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["disableAuth"] !== undefined) {
          body["disableAuth"] = g["disableAuth"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["emailPrivacyConfig"] !== undefined) {
          body["emailPrivacyConfig"] = g["emailPrivacyConfig"];
        }
        if (g["enableAnonymousUser"] !== undefined) {
          body["enableAnonymousUser"] = g["enableAnonymousUser"];
        }
        if (g["enableEmailLinkSignin"] !== undefined) {
          body["enableEmailLinkSignin"] = g["enableEmailLinkSignin"];
        }
        if (g["hashConfig"] !== undefined) body["hashConfig"] = g["hashConfig"];
        if (g["inheritance"] !== undefined) {
          body["inheritance"] = g["inheritance"];
        }
        if (g["mfaConfig"] !== undefined) body["mfaConfig"] = g["mfaConfig"];
        if (g["mobileLinksConfig"] !== undefined) {
          body["mobileLinksConfig"] = g["mobileLinksConfig"];
        }
        if (g["monitoring"] !== undefined) body["monitoring"] = g["monitoring"];
        if (g["passwordPolicyConfig"] !== undefined) {
          body["passwordPolicyConfig"] = g["passwordPolicyConfig"];
        }
        if (g["recaptchaConfig"] !== undefined) {
          body["recaptchaConfig"] = g["recaptchaConfig"];
        }
        if (g["smsRegionConfig"] !== undefined) {
          body["smsRegionConfig"] = g["smsRegionConfig"];
        }
        if (g["testPhoneNumbers"] !== undefined) {
          body["testPhoneNumbers"] = g["testPhoneNumbers"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          credentials,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the tenants",
      arguments: z.object({
        identifier: z.string().describe("The name of the tenants"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync tenants state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
            credentials,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    list: {
      description: "List tenants resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of results to return, capped at 1000. If not specified, the default value is 20.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "tenants",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({
        options: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["options"] !== undefined) body["options"] = args["options"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "identitytoolkit.projects.tenants.getIamPolicy",
            "path": "v2/{+resource}:getIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        policy: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "identitytoolkit.projects.tenants.setIamPolicy",
            "path": "v2/{+resource}:setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "identitytoolkit.projects.tenants.testIamPermissions",
            "path": "v2/{+resource}:testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["resource"],
            "parameters": {
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
