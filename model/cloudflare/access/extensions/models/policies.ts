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

// Auto-generated extension model for @swamp/cloudflare/access/policies
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Policies.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  decision: z.enum(["allow", "deny", "non_identity", "bypass"]).describe(
    "The action Access will take if a user matches this policy. Infrastructure application policies can only use the Allow action.",
  ),
  exclude: z.array(z.object({
    group: z.object({
      id: z.string(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string(),
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string(),
    }).optional(),
    azureAD: z.object({
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string(),
    }).optional(),
    geo: z.object({
      country_code: z.string(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string(),
    }).optional(),
    email_domain: z.object({
      domain: z.string(),
    }).optional(),
    email_list: z.object({
      id: z.string(),
    }).optional(),
    email: z.object({
      email: z.string(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string(),
      keys_url: z.string(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string(),
      name: z.string(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    login_method: z.object({
      id: z.string(),
    }).optional(),
    ip_list: z.object({
      id: z.string(),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string(),
      name: z.string(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string(),
      attribute_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string(),
      claim_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    service_token: z.object({
      token_id: z.string(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().max(32).optional(),
    }).optional(),
  })).describe(
    "Rules evaluated with a NOT logical operator. To match the policy, a user cannot meet any of the Exclude rules.",
  ).optional(),
  include: z.array(z.object({
    group: z.object({
      id: z.string(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string(),
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string(),
    }).optional(),
    azureAD: z.object({
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string(),
    }).optional(),
    geo: z.object({
      country_code: z.string(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string(),
    }).optional(),
    email_domain: z.object({
      domain: z.string(),
    }).optional(),
    email_list: z.object({
      id: z.string(),
    }).optional(),
    email: z.object({
      email: z.string(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string(),
      keys_url: z.string(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string(),
      name: z.string(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    login_method: z.object({
      id: z.string(),
    }).optional(),
    ip_list: z.object({
      id: z.string(),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string(),
      name: z.string(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string(),
      attribute_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string(),
      claim_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    service_token: z.object({
      token_id: z.string(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().max(32).optional(),
    }).optional(),
  })).describe(
    "Rules evaluated with an OR logical operator. A user needs to meet only one of the Include rules.",
  ),
  name: z.string().describe("The name of the Access policy."),
  require: z.array(z.object({
    group: z.object({
      id: z.string(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string(),
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string(),
    }).optional(),
    azureAD: z.object({
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string(),
    }).optional(),
    geo: z.object({
      country_code: z.string(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string(),
    }).optional(),
    email_domain: z.object({
      domain: z.string(),
    }).optional(),
    email_list: z.object({
      id: z.string(),
    }).optional(),
    email: z.object({
      email: z.string(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string(),
      keys_url: z.string(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string(),
      name: z.string(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    login_method: z.object({
      id: z.string(),
    }).optional(),
    ip_list: z.object({
      id: z.string(),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string(),
      name: z.string(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string(),
      attribute_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string(),
      claim_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    service_token: z.object({
      token_id: z.string(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().max(32).optional(),
    }).optional(),
  })).describe(
    "Rules evaluated with an AND logical operator. To match the policy, a user must meet all of the Require rules.",
  ).optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  created_at: z.string().optional(),
  decision: z.string().optional(),
  exclude: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string().optional(),
      id: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string().optional(),
    }).optional(),
    azureAD: z.object({
      id: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string().optional(),
    }).optional(),
    geo: z.object({
      country_code: z.string().optional(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string().optional(),
    }).optional(),
    email_domain: z.object({
      domain: z.string().optional(),
    }).optional(),
    email_list: z.object({
      id: z.string().optional(),
    }).optional(),
    email: z.object({
      email: z.string().optional(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string().optional(),
      keys_url: z.string().optional(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string().optional(),
      name: z.string().optional(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    login_method: z.object({
      id: z.string().optional(),
    }).optional(),
    ip_list: z.object({
      id: z.string().optional(),
    }).optional(),
    ip: z.object({
      ip: z.string().optional(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string().optional(),
      name: z.string().optional(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string().optional(),
      attribute_value: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string().optional(),
      claim_value: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    service_token: z.object({
      token_id: z.string().optional(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string().optional(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.string()).optional(),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().optional(),
    }).optional(),
  })).optional(),
  id: z.string(),
  include: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string().optional(),
      id: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string().optional(),
    }).optional(),
    azureAD: z.object({
      id: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string().optional(),
    }).optional(),
    geo: z.object({
      country_code: z.string().optional(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string().optional(),
    }).optional(),
    email_domain: z.object({
      domain: z.string().optional(),
    }).optional(),
    email_list: z.object({
      id: z.string().optional(),
    }).optional(),
    email: z.object({
      email: z.string().optional(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string().optional(),
      keys_url: z.string().optional(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string().optional(),
      name: z.string().optional(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    login_method: z.object({
      id: z.string().optional(),
    }).optional(),
    ip_list: z.object({
      id: z.string().optional(),
    }).optional(),
    ip: z.object({
      ip: z.string().optional(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string().optional(),
      name: z.string().optional(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string().optional(),
      attribute_value: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string().optional(),
      claim_value: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    service_token: z.object({
      token_id: z.string().optional(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string().optional(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.string()).optional(),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().optional(),
    }).optional(),
  })).optional(),
  name: z.string().optional(),
  require: z.array(z.object({
    group: z.object({
      id: z.string().optional(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string().optional(),
      id: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string().optional(),
    }).optional(),
    azureAD: z.object({
      id: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string().optional(),
    }).optional(),
    geo: z.object({
      country_code: z.string().optional(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string().optional(),
    }).optional(),
    email_domain: z.object({
      domain: z.string().optional(),
    }).optional(),
    email_list: z.object({
      id: z.string().optional(),
    }).optional(),
    email: z.object({
      email: z.string().optional(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string().optional(),
      keys_url: z.string().optional(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string().optional(),
      name: z.string().optional(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    login_method: z.object({
      id: z.string().optional(),
    }).optional(),
    ip_list: z.object({
      id: z.string().optional(),
    }).optional(),
    ip: z.object({
      ip: z.string().optional(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string().optional(),
      name: z.string().optional(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string().optional(),
      attribute_value: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string().optional(),
      claim_value: z.string().optional(),
      identity_provider_id: z.string().optional(),
    }).optional(),
    service_token: z.object({
      token_id: z.string().optional(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string().optional(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.string()).optional(),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().optional(),
    }).optional(),
  })).optional(),
  updated_at: z.string().optional(),
  account_id: z.string().optional(),
  app_count: z.number().optional(),
  reusable: z.boolean().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  decision: z.enum(["allow", "deny", "non_identity", "bypass"]).optional(),
  exclude: z.array(z.object({
    group: z.object({
      id: z.string(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string(),
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string(),
    }).optional(),
    azureAD: z.object({
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string(),
    }).optional(),
    geo: z.object({
      country_code: z.string(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string(),
    }).optional(),
    email_domain: z.object({
      domain: z.string(),
    }).optional(),
    email_list: z.object({
      id: z.string(),
    }).optional(),
    email: z.object({
      email: z.string(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string(),
      keys_url: z.string(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string(),
      name: z.string(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    login_method: z.object({
      id: z.string(),
    }).optional(),
    ip_list: z.object({
      id: z.string(),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string(),
      name: z.string(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string(),
      attribute_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string(),
      claim_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    service_token: z.object({
      token_id: z.string(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().max(32).optional(),
    }).optional(),
  })).optional(),
  include: z.array(z.object({
    group: z.object({
      id: z.string(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string(),
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string(),
    }).optional(),
    azureAD: z.object({
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string(),
    }).optional(),
    geo: z.object({
      country_code: z.string(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string(),
    }).optional(),
    email_domain: z.object({
      domain: z.string(),
    }).optional(),
    email_list: z.object({
      id: z.string(),
    }).optional(),
    email: z.object({
      email: z.string(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string(),
      keys_url: z.string(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string(),
      name: z.string(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    login_method: z.object({
      id: z.string(),
    }).optional(),
    ip_list: z.object({
      id: z.string(),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string(),
      name: z.string(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string(),
      attribute_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string(),
      claim_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    service_token: z.object({
      token_id: z.string(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().max(32).optional(),
    }).optional(),
  })).optional(),
  name: z.string().optional(),
  require: z.array(z.object({
    group: z.object({
      id: z.string(),
    }).optional(),
    any_valid_service_token: z.record(z.string(), z.unknown()).optional(),
    auth_context: z.object({
      ac_id: z.string(),
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    auth_method: z.object({
      auth_method: z.string(),
    }).optional(),
    azureAD: z.object({
      id: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    certificate: z.record(z.string(), z.unknown()).optional(),
    common_name: z.object({
      common_name: z.string(),
    }).optional(),
    geo: z.object({
      country_code: z.string(),
    }).optional(),
    device_posture: z.object({
      account_id: z.string().optional(),
      integration_uid: z.string(),
    }).optional(),
    email_domain: z.object({
      domain: z.string(),
    }).optional(),
    email_list: z.object({
      id: z.string(),
    }).optional(),
    email: z.object({
      email: z.string(),
    }).optional(),
    everyone: z.record(z.string(), z.unknown()).optional(),
    external_evaluation: z.object({
      evaluate_url: z.string(),
      keys_url: z.string(),
    }).optional(),
    "github-organization": z.object({
      identity_provider_id: z.string(),
      name: z.string(),
      team: z.string().optional(),
    }).optional(),
    gsuite: z.object({
      email: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    login_method: z.object({
      id: z.string(),
    }).optional(),
    ip_list: z.object({
      id: z.string(),
    }).optional(),
    ip: z.object({
      ip: z.string(),
    }).optional(),
    okta: z.object({
      identity_provider_id: z.string(),
      name: z.string(),
    }).optional(),
    saml: z.object({
      attribute_name: z.string(),
      attribute_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    oidc: z.object({
      claim_name: z.string(),
      claim_value: z.string(),
      identity_provider_id: z.string(),
    }).optional(),
    service_token: z.object({
      token_id: z.string(),
    }).optional(),
    linked_app_token: z.object({
      app_uid: z.string(),
    }).optional(),
    user_risk_score: z.object({
      user_risk_score: z.array(z.enum(["low", "medium", "high", "unscored"])),
    }).optional(),
    cloudflare_account_member: z.object({
      account_id: z.string().max(32).optional(),
    }).optional(),
  })).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Policies. Registered at `@swamp/cloudflare/access/policies`. */
export const model = {
  type: "@swamp/cloudflare/access/policies",
  version: "2026.09.04.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Policies resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const body: Record<string, unknown> = {};
        if (g.decision !== undefined) body.decision = g.decision;
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.include !== undefined) body.include = g.include;
        if (g.name !== undefined) body.name = g.name;
        if (g.require !== undefined) body.require = g.require;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
      description: "Get a Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
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
    lookup: {
      description:
        "Look up an existing Policies by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const filters: [string, string][] = [];
        if (g.decision !== undefined) {
          filters.push(["decision", String(g.decision)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "page", undefined, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(`No policies found matching filters: ${filterDesc}`);
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.id?.toString() ?? "current").replace(
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
    adopt: {
      description:
        "Import an existing Policies by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
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
      description: "Update Policies attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.decision !== undefined) body.decision = g.decision;
        if (g.exclude !== undefined) body.exclude = g.exclude;
        if (g.include !== undefined) body.include = g.include;
        if (g.name !== undefined) body.name = g.name;
        if (g.require !== undefined) body.require = g.require;
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
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
      description: "Sync Policies state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Policies by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/access/policies";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
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
