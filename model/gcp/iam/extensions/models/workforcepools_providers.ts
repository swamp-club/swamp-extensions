// Auto-generated extension model for @swamp/gcp/iam/workforcepools-providers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkforcePools.Providers.
 *
 * A configuration for an external identity provider.
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
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/providers/${shortName}`;
}

const BASE_URL = "https://iam.googleapis.com/";

const GET_CONFIG = {
  "id": "iam.locations.workforcePools.providers.get",
  "path": "v1/{+name}",
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
  "id": "iam.locations.workforcePools.providers.create",
  "path": "v1/{+parent}/providers",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "workforcePoolProviderId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "iam.locations.workforcePools.providers.patch",
  "path": "v1/{+name}",
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
  "id": "iam.locations.workforcePools.providers.delete",
  "path": "v1/{+name}",
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
  "id": "iam.locations.workforcePools.providers.list",
  "path": "v1/{+parent}/providers",
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
    "showDeleted": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  attributeCondition: z.string().describe(
    "Optional. A [Common Expression Language](https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: * `assertion`: JSON representing the authentication credential issued by the provider. * `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. `google.profile_photo`, `google.display_name` and `google.posix_username` are not supported. * `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credentials will be accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: ` \"'admins' in google.groups\" `",
  ).optional(),
  attributeMapping: z.record(z.string(), z.string()).describe(
    'Required. Maps attributes from the authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. * `google.groups`: Groups the authenticating user belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. * `google.display_name`: The name of the authenticated user. This is an optional field and the mapped display name cannot exceed 100 bytes. If not set, `google.subject` will be displayed instead. This attribute cannot be referenced in IAM bindings. * `google.profile_photo`: The URL that specifies the authenticated user\'s thumbnail photo. This is an optional field. When set, the image will be visible as the user\'s profile picture. If not set, a generic user icon will be displayed instead. This attribute cannot be referenced in IAM bindings. * `google.posix_username`: The Linux username used by OS Login. This is an optional field and the mapped POSIX username cannot exceed 32 characters. The key must match the regex `^a-zA-Z0-9._{0,31}$`. This attribute cannot be referenced in IAM bindings. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where {custom_attribute} is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters `[a-z0-9_]`. You can reference these attributes in IAM policies to define fine-grained access for a workforce pool to Google Cloud resources. For example: * `google.subject`: `principal://iam.googleapis.com/locations/global/workforcePools/{pool}/subject/{value}` * `google.groups`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/group/{value}` * `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 16 KB. For OIDC providers, you must supply a custom mapping that includes the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: ` {"google.subject": "assertion.sub"} `',
  ).optional(),
  description: z.string().describe(
    "Optional. A description of the provider. Cannot exceed 256 characters.",
  ).optional(),
  detailedAuditLogging: z.boolean().describe(
    "Optional. If true, populates additional debug information in Cloud Audit Logs for this provider. Logged attribute mappings and values can be found in `sts.googleapis.com` data access logs. Default value is false.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Disables the workforce pool provider. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. A display name for the provider. Cannot exceed 32 characters.",
  ).optional(),
  extendedAttributesOauth2Client: z.object({
    attributesType: z.enum([
      "ATTRIBUTES_TYPE_UNSPECIFIED",
      "AZURE_AD_GROUPS_MAIL",
      "AZURE_AD_GROUPS_ID",
      "AZURE_AD_GROUPS_DISPLAY_NAME",
    ]).describe(
      "Required. Represents the IdP and type of claims that should be fetched.",
    ).optional(),
    clientId: z.string().describe(
      "Required. The OAuth 2.0 client ID for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow.",
    ).optional(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string().describe(
          "Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response.",
        ).optional(),
        thumbprint: z.string().describe(
          "Output only. A thumbprint to represent the current client secret value.",
        ).optional(),
      }).describe("Representation of the value of the client secret.")
        .optional(),
    }).describe(
      "Representation of a client secret configured for the OIDC provider.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC identity provider's issuer URI. Must be a valid URI using the `https` scheme. Required to get the OIDC discovery document.",
    ).optional(),
    queryParameters: z.object({
      filter: z.string().describe(
        "Optional. The filter used to request specific records from the IdP. By default, all of the groups that are associated with a user are fetched. For Microsoft Entra ID, you can add `$search` query parameters using [Keyword Query Language] (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). To learn more about `$search` querying in Microsoft Entra ID, see [Use the `$search` query parameter] (https://learn.microsoft.com/en-us/graph/search-query-parameter). Additionally, Workforce Identity Federation automatically adds the following [`$filter` query parameters] (https://learn.microsoft.com/en-us/graph/filter-query-parameter), based on the value of `attributes_type`. Values passed to `filter` are converted to `$search` query parameters. Additional `$filter` query parameters cannot be added using this field. * `AZURE_AD_GROUPS_MAIL`: `mailEnabled` and `securityEnabled` filters are applied. * `AZURE_AD_GROUPS_ID`: `securityEnabled` filter is applied.",
      ).optional(),
    }).describe(
      "Represents the parameters to control which claims are fetched from an IdP.",
    ).optional(),
  }).describe(
    "Represents the OAuth 2.0 client credential configuration for retrieving additional user attributes that are not present in the initial authentication credentials from the identity provider, for example, groups. See https://datatracker.ietf.org/doc/html/rfc6749#section-4.4 for more details on client credentials grant flow.",
  ).optional(),
  extraAttributesOauth2Client: z.object({
    attributesType: z.enum([
      "ATTRIBUTES_TYPE_UNSPECIFIED",
      "AZURE_AD_GROUPS_MAIL",
      "AZURE_AD_GROUPS_ID",
      "AZURE_AD_GROUPS_DISPLAY_NAME",
    ]).describe(
      "Required. Represents the IdP and type of claims that should be fetched.",
    ).optional(),
    clientId: z.string().describe(
      "Required. The OAuth 2.0 client ID for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow.",
    ).optional(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string().describe(
          "Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response.",
        ).optional(),
        thumbprint: z.string().describe(
          "Output only. A thumbprint to represent the current client secret value.",
        ).optional(),
      }).describe("Representation of the value of the client secret.")
        .optional(),
    }).describe(
      "Representation of a client secret configured for the OIDC provider.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC identity provider's issuer URI. Must be a valid URI using the `https` scheme. Required to get the OIDC discovery document.",
    ).optional(),
    queryParameters: z.object({
      filter: z.string().describe(
        "Optional. The filter used to request specific records from the IdP. By default, all of the groups that are associated with a user are fetched. For Microsoft Entra ID, you can add `$search` query parameters using [Keyword Query Language] (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). To learn more about `$search` querying in Microsoft Entra ID, see [Use the `$search` query parameter] (https://learn.microsoft.com/en-us/graph/search-query-parameter). Additionally, Workforce Identity Federation automatically adds the following [`$filter` query parameters] (https://learn.microsoft.com/en-us/graph/filter-query-parameter), based on the value of `attributes_type`. Values passed to `filter` are converted to `$search` query parameters. Additional `$filter` query parameters cannot be added using this field. * `AZURE_AD_GROUPS_MAIL`: `mailEnabled` and `securityEnabled` filters are applied. * `AZURE_AD_GROUPS_ID`: `securityEnabled` filter is applied.",
      ).optional(),
    }).describe(
      "Represents the parameters to control which claims are fetched from an IdP.",
    ).optional(),
  }).describe(
    "Represents the OAuth 2.0 client credential configuration for retrieving additional user attributes that are not present in the initial authentication credentials from the identity provider, for example, groups. See https://datatracker.ietf.org/doc/html/rfc6749#section-4.4 for more details on client credentials grant flow.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the provider. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}`",
  ).optional(),
  oidc: z.object({
    clientId: z.string().describe(
      "Required. The client ID. Must match the audience claim of the JWT issued by the identity provider.",
    ).optional(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string().describe(
          "Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response.",
        ).optional(),
        thumbprint: z.string().describe(
          "Output only. A thumbprint to represent the current client secret value.",
        ).optional(),
      }).describe("Representation of the value of the client secret.")
        .optional(),
    }).describe(
      "Representation of a client secret configured for the OIDC provider.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC issuer URI. Must be a valid URI using the `https` scheme.",
    ).optional(),
    jwksJson: z.string().describe(
      'Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document that is fetched from the well-known path of the `issuer_uri`, will be used. RSA and EC asymmetric keys are supported. The JWK must use the following format and include only the following fields: { "keys": [ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } ] }',
    ).optional(),
    webSsoConfig: z.object({
      additionalScopes: z.array(z.string()).describe(
        "Optional. Additional scopes to request for in the OIDC authentication request on top of scopes requested by default. By default, the `openid`, `profile` and `email` scopes that are supported by the identity provider are requested. Each additional scope may be at most 256 characters. A maximum of 10 additional scopes may be configured.",
      ).optional(),
      assertionClaimsBehavior: z.enum([
        "ASSERTION_CLAIMS_BEHAVIOR_UNSPECIFIED",
        "MERGE_USER_INFO_OVER_ID_TOKEN_CLAIMS",
        "ONLY_ID_TOKEN_CLAIMS",
      ]).describe(
        "Required. The behavior for how OIDC Claims are included in the `assertion` object used for attribute mapping and attribute condition.",
      ).optional(),
      responseType: z.enum(["RESPONSE_TYPE_UNSPECIFIED", "CODE", "ID_TOKEN"])
        .describe(
          "Required. The Response Type to request for in the OIDC Authorization Request for web sign-in. The `CODE` Response Type is recommended to avoid the Implicit Flow, for security reasons.",
        ).optional(),
    }).describe("Configuration for web single sign-on for the OIDC provider.")
      .optional(),
  }).describe("Represents an OpenID Connect 1.0 identity provider.").optional(),
  saml: z.object({
    idpMetadataXml: z.string().describe(
      "Required. SAML Identity provider configuration metadata xml doc. The xml document should comply with [SAML 2.0 specification](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The max size of the acceptable xml document will be bounded to 128k characters. The metadata xml document should satisfy the following constraints: 1) Must contain an Identity Provider Entity ID. 2) Must contain at least one non-expired signing key certificate. 3) For each signing key: a) Valid from should be no more than 7 days from now. b) Valid to should be no more than 25 years in the future. 4) Up to 3 IdP signing keys are allowed in the metadata xml. When updating the provider's metadata xml, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata.",
    ).optional(),
  }).describe("Represents a SAML identity provider.").optional(),
  scimUsage: z.enum(["SCIM_USAGE_UNSPECIFIED", "ENABLED_FOR_GROUPS"]).describe(
    "Optional. Gemini Enterprise only. Specifies whether the workforce identity pool provider uses SCIM-managed groups instead of the `google.groups` attribute mapping for authorization checks. The `scim_usage` and `extended_attributes_oauth2_client` fields are mutually exclusive. A request that enables both fields on the same workforce identity pool provider will produce an error.",
  ).optional(),
  workforcePoolProviderId: z.string().describe(
    "Required. The ID for the provider, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters `[a-z0-9-]`. The prefix `gcp-` is reserved for use by Google, and may not be specified.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  attributeCondition: z.string().optional(),
  attributeMapping: z.record(z.string(), z.unknown()).optional(),
  description: z.string().optional(),
  detailedAuditLogging: z.boolean().optional(),
  disabled: z.boolean().optional(),
  displayName: z.string().optional(),
  expireTime: z.string().optional(),
  extendedAttributesOauth2Client: z.object({
    attributesType: z.string(),
    clientId: z.string(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string(),
        thumbprint: z.string(),
      }),
    }),
    issuerUri: z.string(),
    queryParameters: z.object({
      filter: z.string(),
    }),
  }).optional(),
  extraAttributesOauth2Client: z.object({
    attributesType: z.string(),
    clientId: z.string(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string(),
        thumbprint: z.string(),
      }),
    }),
    issuerUri: z.string(),
    queryParameters: z.object({
      filter: z.string(),
    }),
  }).optional(),
  name: z.string(),
  oidc: z.object({
    clientId: z.string(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string(),
        thumbprint: z.string(),
      }),
    }),
    issuerUri: z.string(),
    jwksJson: z.string(),
    webSsoConfig: z.object({
      additionalScopes: z.array(z.string()),
      assertionClaimsBehavior: z.string(),
      responseType: z.string(),
    }),
  }).optional(),
  saml: z.object({
    idpMetadataXml: z.string(),
  }).optional(),
  scimUsage: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  attributeCondition: z.string().describe(
    "Optional. A [Common Expression Language](https://opensource.google/projects/cel) expression, in plain text, to restrict what otherwise valid authentication credentials issued by the provider should not be accepted. The expression must output a boolean representing whether to allow the federation. The following keywords may be referenced in the expressions: * `assertion`: JSON representing the authentication credential issued by the provider. * `google`: The Google attributes mapped from the assertion in the `attribute_mappings`. `google.profile_photo`, `google.display_name` and `google.posix_username` are not supported. * `attribute`: The custom attributes mapped from the assertion in the `attribute_mappings`. The maximum length of the attribute condition expression is 4096 characters. If unspecified, all valid authentication credentials will be accepted. The following example shows how to only allow credentials with a mapped `google.groups` value of `admins`: ` \"'admins' in google.groups\" `",
  ).optional(),
  attributeMapping: z.record(z.string(), z.string()).describe(
    'Required. Maps attributes from the authentication credentials issued by an external identity provider to Google Cloud attributes, such as `subject` and `segment`. Each key must be a string specifying the Google Cloud IAM attribute to map to. The following keys are supported: * `google.subject`: The principal IAM is authenticating. You can reference this value in IAM bindings. This is also the subject that appears in Cloud Logging logs. This is a required field and the mapped subject cannot exceed 127 bytes. * `google.groups`: Groups the authenticating user belongs to. You can grant groups access to resources using an IAM `principalSet` binding; access applies to all members of the group. * `google.display_name`: The name of the authenticated user. This is an optional field and the mapped display name cannot exceed 100 bytes. If not set, `google.subject` will be displayed instead. This attribute cannot be referenced in IAM bindings. * `google.profile_photo`: The URL that specifies the authenticated user\'s thumbnail photo. This is an optional field. When set, the image will be visible as the user\'s profile picture. If not set, a generic user icon will be displayed instead. This attribute cannot be referenced in IAM bindings. * `google.posix_username`: The Linux username used by OS Login. This is an optional field and the mapped POSIX username cannot exceed 32 characters. The key must match the regex `^a-zA-Z0-9._{0,31}$`. This attribute cannot be referenced in IAM bindings. You can also provide custom attributes by specifying `attribute.{custom_attribute}`, where {custom_attribute} is the name of the custom attribute to be mapped. You can define a maximum of 50 custom attributes. The maximum length of a mapped attribute key is 100 characters, and the key may only contain the characters `[a-z0-9_]`. You can reference these attributes in IAM policies to define fine-grained access for a workforce pool to Google Cloud resources. For example: * `google.subject`: `principal://iam.googleapis.com/locations/global/workforcePools/{pool}/subject/{value}` * `google.groups`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/group/{value}` * `attribute.{custom_attribute}`: `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool}/attribute.{custom_attribute}/{value}` Each value must be a [Common Expression Language] (https://opensource.google/projects/cel) function that maps an identity provider credential to the normalized attribute specified by the corresponding map key. You can use the `assertion` keyword in the expression to access a JSON representation of the authentication credential issued by the provider. The maximum length of an attribute mapping expression is 2048 characters. When evaluated, the total size of all mapped attributes must not exceed 16 KB. For OIDC providers, you must supply a custom mapping that includes the `google.subject` attribute. For example, the following maps the `sub` claim of the incoming credential to the `subject` attribute on a Google token: ` {"google.subject": "assertion.sub"} `',
  ).optional(),
  description: z.string().describe(
    "Optional. A description of the provider. Cannot exceed 256 characters.",
  ).optional(),
  detailedAuditLogging: z.boolean().describe(
    "Optional. If true, populates additional debug information in Cloud Audit Logs for this provider. Logged attribute mappings and values can be found in `sts.googleapis.com` data access logs. Default value is false.",
  ).optional(),
  disabled: z.boolean().describe(
    "Optional. Disables the workforce pool provider. You cannot use a disabled provider to exchange tokens. However, existing tokens still grant access.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. A display name for the provider. Cannot exceed 32 characters.",
  ).optional(),
  extendedAttributesOauth2Client: z.object({
    attributesType: z.enum([
      "ATTRIBUTES_TYPE_UNSPECIFIED",
      "AZURE_AD_GROUPS_MAIL",
      "AZURE_AD_GROUPS_ID",
      "AZURE_AD_GROUPS_DISPLAY_NAME",
    ]).describe(
      "Required. Represents the IdP and type of claims that should be fetched.",
    ).optional(),
    clientId: z.string().describe(
      "Required. The OAuth 2.0 client ID for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow.",
    ).optional(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string().describe(
          "Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response.",
        ).optional(),
        thumbprint: z.string().describe(
          "Output only. A thumbprint to represent the current client secret value.",
        ).optional(),
      }).describe("Representation of the value of the client secret.")
        .optional(),
    }).describe(
      "Representation of a client secret configured for the OIDC provider.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC identity provider's issuer URI. Must be a valid URI using the `https` scheme. Required to get the OIDC discovery document.",
    ).optional(),
    queryParameters: z.object({
      filter: z.string().describe(
        "Optional. The filter used to request specific records from the IdP. By default, all of the groups that are associated with a user are fetched. For Microsoft Entra ID, you can add `$search` query parameters using [Keyword Query Language] (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). To learn more about `$search` querying in Microsoft Entra ID, see [Use the `$search` query parameter] (https://learn.microsoft.com/en-us/graph/search-query-parameter). Additionally, Workforce Identity Federation automatically adds the following [`$filter` query parameters] (https://learn.microsoft.com/en-us/graph/filter-query-parameter), based on the value of `attributes_type`. Values passed to `filter` are converted to `$search` query parameters. Additional `$filter` query parameters cannot be added using this field. * `AZURE_AD_GROUPS_MAIL`: `mailEnabled` and `securityEnabled` filters are applied. * `AZURE_AD_GROUPS_ID`: `securityEnabled` filter is applied.",
      ).optional(),
    }).describe(
      "Represents the parameters to control which claims are fetched from an IdP.",
    ).optional(),
  }).describe(
    "Represents the OAuth 2.0 client credential configuration for retrieving additional user attributes that are not present in the initial authentication credentials from the identity provider, for example, groups. See https://datatracker.ietf.org/doc/html/rfc6749#section-4.4 for more details on client credentials grant flow.",
  ).optional(),
  extraAttributesOauth2Client: z.object({
    attributesType: z.enum([
      "ATTRIBUTES_TYPE_UNSPECIFIED",
      "AZURE_AD_GROUPS_MAIL",
      "AZURE_AD_GROUPS_ID",
      "AZURE_AD_GROUPS_DISPLAY_NAME",
    ]).describe(
      "Required. Represents the IdP and type of claims that should be fetched.",
    ).optional(),
    clientId: z.string().describe(
      "Required. The OAuth 2.0 client ID for retrieving extra attributes from the identity provider. Required to get the Access Token using client credentials grant flow.",
    ).optional(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string().describe(
          "Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response.",
        ).optional(),
        thumbprint: z.string().describe(
          "Output only. A thumbprint to represent the current client secret value.",
        ).optional(),
      }).describe("Representation of the value of the client secret.")
        .optional(),
    }).describe(
      "Representation of a client secret configured for the OIDC provider.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC identity provider's issuer URI. Must be a valid URI using the `https` scheme. Required to get the OIDC discovery document.",
    ).optional(),
    queryParameters: z.object({
      filter: z.string().describe(
        "Optional. The filter used to request specific records from the IdP. By default, all of the groups that are associated with a user are fetched. For Microsoft Entra ID, you can add `$search` query parameters using [Keyword Query Language] (https://learn.microsoft.com/en-us/sharepoint/dev/general-development/keyword-query-language-kql-syntax-reference). To learn more about `$search` querying in Microsoft Entra ID, see [Use the `$search` query parameter] (https://learn.microsoft.com/en-us/graph/search-query-parameter). Additionally, Workforce Identity Federation automatically adds the following [`$filter` query parameters] (https://learn.microsoft.com/en-us/graph/filter-query-parameter), based on the value of `attributes_type`. Values passed to `filter` are converted to `$search` query parameters. Additional `$filter` query parameters cannot be added using this field. * `AZURE_AD_GROUPS_MAIL`: `mailEnabled` and `securityEnabled` filters are applied. * `AZURE_AD_GROUPS_ID`: `securityEnabled` filter is applied.",
      ).optional(),
    }).describe(
      "Represents the parameters to control which claims are fetched from an IdP.",
    ).optional(),
  }).describe(
    "Represents the OAuth 2.0 client credential configuration for retrieving additional user attributes that are not present in the initial authentication credentials from the identity provider, for example, groups. See https://datatracker.ietf.org/doc/html/rfc6749#section-4.4 for more details on client credentials grant flow.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the provider. Format: `locations/{location}/workforcePools/{workforce_pool_id}/providers/{provider_id}`",
  ).optional(),
  oidc: z.object({
    clientId: z.string().describe(
      "Required. The client ID. Must match the audience claim of the JWT issued by the identity provider.",
    ).optional(),
    clientSecret: z.object({
      value: z.object({
        plainText: z.string().describe(
          "Optional. Input only. The plain text of the client secret value. For security reasons, this field is only used for input and will never be populated in any response.",
        ).optional(),
        thumbprint: z.string().describe(
          "Output only. A thumbprint to represent the current client secret value.",
        ).optional(),
      }).describe("Representation of the value of the client secret.")
        .optional(),
    }).describe(
      "Representation of a client secret configured for the OIDC provider.",
    ).optional(),
    issuerUri: z.string().describe(
      "Required. The OIDC issuer URI. Must be a valid URI using the `https` scheme.",
    ).optional(),
    jwksJson: z.string().describe(
      'Optional. OIDC JWKs in JSON String format. For details on the definition of a JWK, see https://tools.ietf.org/html/rfc7517. If not set, the `jwks_uri` from the discovery document that is fetched from the well-known path of the `issuer_uri`, will be used. RSA and EC asymmetric keys are supported. The JWK must use the following format and include only the following fields: { "keys": [ { "kty": "RSA/EC", "alg": "", "use": "sig", "kid": "", "n": "", "e": "", "x": "", "y": "", "crv": "" } ] }',
    ).optional(),
    webSsoConfig: z.object({
      additionalScopes: z.array(z.string()).describe(
        "Optional. Additional scopes to request for in the OIDC authentication request on top of scopes requested by default. By default, the `openid`, `profile` and `email` scopes that are supported by the identity provider are requested. Each additional scope may be at most 256 characters. A maximum of 10 additional scopes may be configured.",
      ).optional(),
      assertionClaimsBehavior: z.enum([
        "ASSERTION_CLAIMS_BEHAVIOR_UNSPECIFIED",
        "MERGE_USER_INFO_OVER_ID_TOKEN_CLAIMS",
        "ONLY_ID_TOKEN_CLAIMS",
      ]).describe(
        "Required. The behavior for how OIDC Claims are included in the `assertion` object used for attribute mapping and attribute condition.",
      ).optional(),
      responseType: z.enum(["RESPONSE_TYPE_UNSPECIFIED", "CODE", "ID_TOKEN"])
        .describe(
          "Required. The Response Type to request for in the OIDC Authorization Request for web sign-in. The `CODE` Response Type is recommended to avoid the Implicit Flow, for security reasons.",
        ).optional(),
    }).describe("Configuration for web single sign-on for the OIDC provider.")
      .optional(),
  }).describe("Represents an OpenID Connect 1.0 identity provider.").optional(),
  saml: z.object({
    idpMetadataXml: z.string().describe(
      "Required. SAML Identity provider configuration metadata xml doc. The xml document should comply with [SAML 2.0 specification](https://docs.oasis-open.org/security/saml/v2.0/saml-metadata-2.0-os.pdf). The max size of the acceptable xml document will be bounded to 128k characters. The metadata xml document should satisfy the following constraints: 1) Must contain an Identity Provider Entity ID. 2) Must contain at least one non-expired signing key certificate. 3) For each signing key: a) Valid from should be no more than 7 days from now. b) Valid to should be no more than 25 years in the future. 4) Up to 3 IdP signing keys are allowed in the metadata xml. When updating the provider's metadata xml, at least one non-expired signing key must overlap with the existing metadata. This requirement is skipped if there are no non-expired signing keys present in the existing metadata.",
    ).optional(),
  }).describe("Represents a SAML identity provider.").optional(),
  scimUsage: z.enum(["SCIM_USAGE_UNSPECIFIED", "ENABLED_FOR_GROUPS"]).describe(
    "Optional. Gemini Enterprise only. Specifies whether the workforce identity pool provider uses SCIM-managed groups instead of the `google.groups` attribute mapping for authorization checks. The `scim_usage` and `extended_attributes_oauth2_client` fields are mutually exclusive. A request that enables both fields on the same workforce identity pool provider will produce an error.",
  ).optional(),
  workforcePoolProviderId: z.string().describe(
    "Required. The ID for the provider, which becomes the final component of the resource name. This value must be 4-32 characters, and may contain the characters `[a-z0-9-]`. The prefix `gcp-` is reserved for use by Google, and may not be specified.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Identity and Access Management (IAM) WorkforcePools.Providers. Registered at `@swamp/gcp/iam/workforcepools-providers`. */
export const model = {
  type: "@swamp/gcp/iam/workforcepools-providers",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A configuration for an external identity provider.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a providers",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["attributeCondition"] !== undefined) {
          body["attributeCondition"] = g["attributeCondition"];
        }
        if (g["attributeMapping"] !== undefined) {
          body["attributeMapping"] = g["attributeMapping"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["detailedAuditLogging"] !== undefined) {
          body["detailedAuditLogging"] = g["detailedAuditLogging"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["extendedAttributesOauth2Client"] !== undefined) {
          body["extendedAttributesOauth2Client"] =
            g["extendedAttributesOauth2Client"];
        }
        if (g["extraAttributesOauth2Client"] !== undefined) {
          body["extraAttributesOauth2Client"] =
            g["extraAttributesOauth2Client"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["oidc"] !== undefined) body["oidc"] = g["oidc"];
        if (g["saml"] !== undefined) body["saml"] = g["saml"];
        if (g["scimUsage"] !== undefined) body["scimUsage"] = g["scimUsage"];
        if (g["workforcePoolProviderId"] !== undefined) {
          body["workforcePoolProviderId"] = g["workforcePoolProviderId"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a providers",
      arguments: z.object({
        identifier: z.string().describe("The name of the providers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update providers attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["attributeCondition"] !== undefined) {
          body["attributeCondition"] = g["attributeCondition"];
        }
        if (g["attributeMapping"] !== undefined) {
          body["attributeMapping"] = g["attributeMapping"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["detailedAuditLogging"] !== undefined) {
          body["detailedAuditLogging"] = g["detailedAuditLogging"];
        }
        if (g["disabled"] !== undefined) body["disabled"] = g["disabled"];
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["extendedAttributesOauth2Client"] !== undefined) {
          body["extendedAttributesOauth2Client"] =
            g["extendedAttributesOauth2Client"];
        }
        if (g["extraAttributesOauth2Client"] !== undefined) {
          body["extraAttributesOauth2Client"] =
            g["extraAttributesOauth2Client"];
        }
        if (g["oidc"] !== undefined) body["oidc"] = g["oidc"];
        if (g["saml"] !== undefined) body["saml"] = g["saml"];
        if (g["scimUsage"] !== undefined) body["scimUsage"] = g["scimUsage"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the providers",
      arguments: z.object({
        identifier: z.string().describe("The name of the providers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      description: "Sync providers state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
      description: "List providers resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of providers to return. If unspecified, at most 50 providers are returned. The maximum value is 100; values above 100 are truncated to 100.",
        ).optional(),
        showDeleted: z.boolean().describe(
          "Whether to return soft-deleted providers.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["showDeleted"] !== undefined) {
          params["showDeleted"] = String(args["showDeleted"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "workforcePoolProviders",
          (args.maxPages as number | undefined) ?? 10,
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
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "iam.locations.workforcePools.providers.undelete",
            "path": "v1/{+name}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
