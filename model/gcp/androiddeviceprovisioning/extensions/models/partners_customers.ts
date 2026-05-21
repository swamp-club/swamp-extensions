// Auto-generated extension model for @swamp/gcp/androiddeviceprovisioning/partners-customers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Android Device Provisioning Partner Partners.Customers.
 *
 * A reseller, vendor, or customer in the zero-touch reseller and customer APIs.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androiddeviceprovisioning.googleapis.com/";

const INSERT_CONFIG = {
  "id": "androiddeviceprovisioning.partners.customers.create",
  "path": "v1/{+parent}/customers",
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

const LIST_CONFIG = {
  "id": "androiddeviceprovisioning.partners.customers.list",
  "path": "v1/partners/{+partnerId}/customers",
  "httpMethod": "GET",
  "parameterOrder": [
    "partnerId",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "partnerId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  customer: z.object({
    adminEmails: z.array(z.string()).describe(
      "Optional. Email address of customer's users in the admin role. Each email address must be associated with a Google Account.",
    ).optional(),
    companyId: z.string().describe(
      "Output only. The ID of the company. Assigned by the server.",
    ).optional(),
    companyName: z.string().describe(
      "Required. The name of the company. For example _XYZ Corp_. Displayed to the company's employees in the zero-touch enrollment portal.",
    ).optional(),
    googleWorkspaceAccount: z.object({
      customerId: z.string().describe("Required. The customer ID.").optional(),
      preProvisioningTokens: z.array(z.string()).describe(
        "Output only. The pre-provisioning tokens previously used to claim devices.",
      ).optional(),
    }).describe("A Google Workspace customer.").optional(),
    languageCode: z.string().describe(
      "Input only. The preferred locale of the customer represented as a BCP47 language code. This field is validated on input and requests containing unsupported language codes will be rejected. Supported language codes: Arabic (ar) Chinese (Hong Kong) (zh-HK) Chinese (Simplified) (zh-CN) Chinese (Traditional) (zh-TW) Czech (cs) Danish (da) Dutch (nl) English (UK) (en-GB) English (US) (en-US) Filipino (fil) Finnish (fi) French (fr) German (de) Hebrew (iw) Hindi (hi) Hungarian (hu) Indonesian (id) Italian (it) Japanese (ja) Korean (ko) Norwegian (Bokmal) (no) Polish (pl) Portuguese (Brazil) (pt-BR) Portuguese (Portugal) (pt-PT) Russian (ru) Spanish (es) Spanish (Latin America) (es-419) Swedish (sv) Thai (th) Turkish (tr) Ukrainian (uk) Vietnamese (vi)",
    ).optional(),
    name: z.string().describe(
      "Output only. The API resource name of the company. The resource name is one of the following formats: * `partners/[PARTNER_ID]/customers/[CUSTOMER_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]/customers/[CUSTOMER_ID]` Assigned by the server.",
    ).optional(),
    ownerEmails: z.array(z.string()).describe(
      "Required. Input only. Email address of customer's users in the owner role. At least one `owner_email` is required. Owners share the same access as admins but can also add, delete, and edit your organization's portal users.",
    ).optional(),
    skipWelcomeEmail: z.boolean().describe(
      "Input only. If set to true, welcome email will not be sent to the customer. It is recommended to skip the welcome email if devices will be claimed with additional DEVICE_PROTECTION service, as the customer will receive separate emails at device claim time. This field is ignored if this is not a Zero-touch customer.",
    ).optional(),
    termsStatus: z.enum([
      "TERMS_STATUS_UNSPECIFIED",
      "TERMS_STATUS_NOT_ACCEPTED",
      "TERMS_STATUS_ACCEPTED",
      "TERMS_STATUS_STALE",
    ]).describe(
      "Output only. Whether any user from the company has accepted the latest Terms of Service (ToS). See TermsStatus.",
    ).optional(),
  }).describe(
    "A reseller, vendor, or customer in the zero-touch reseller and customer APIs.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  adminEmails: z.array(z.string()).optional(),
  companyId: z.string().optional(),
  companyName: z.string().optional(),
  googleWorkspaceAccount: z.object({
    customerId: z.string(),
    preProvisioningTokens: z.array(z.string()),
  }).optional(),
  languageCode: z.string().optional(),
  name: z.string(),
  ownerEmails: z.array(z.string()).optional(),
  skipWelcomeEmail: z.boolean().optional(),
  termsStatus: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  customer: z.object({
    adminEmails: z.array(z.string()).describe(
      "Optional. Email address of customer's users in the admin role. Each email address must be associated with a Google Account.",
    ).optional(),
    companyId: z.string().describe(
      "Output only. The ID of the company. Assigned by the server.",
    ).optional(),
    companyName: z.string().describe(
      "Required. The name of the company. For example _XYZ Corp_. Displayed to the company's employees in the zero-touch enrollment portal.",
    ).optional(),
    googleWorkspaceAccount: z.object({
      customerId: z.string().describe("Required. The customer ID.").optional(),
      preProvisioningTokens: z.array(z.string()).describe(
        "Output only. The pre-provisioning tokens previously used to claim devices.",
      ).optional(),
    }).describe("A Google Workspace customer.").optional(),
    languageCode: z.string().describe(
      "Input only. The preferred locale of the customer represented as a BCP47 language code. This field is validated on input and requests containing unsupported language codes will be rejected. Supported language codes: Arabic (ar) Chinese (Hong Kong) (zh-HK) Chinese (Simplified) (zh-CN) Chinese (Traditional) (zh-TW) Czech (cs) Danish (da) Dutch (nl) English (UK) (en-GB) English (US) (en-US) Filipino (fil) Finnish (fi) French (fr) German (de) Hebrew (iw) Hindi (hi) Hungarian (hu) Indonesian (id) Italian (it) Japanese (ja) Korean (ko) Norwegian (Bokmal) (no) Polish (pl) Portuguese (Brazil) (pt-BR) Portuguese (Portugal) (pt-PT) Russian (ru) Spanish (es) Spanish (Latin America) (es-419) Swedish (sv) Thai (th) Turkish (tr) Ukrainian (uk) Vietnamese (vi)",
    ).optional(),
    name: z.string().describe(
      "Output only. The API resource name of the company. The resource name is one of the following formats: * `partners/[PARTNER_ID]/customers/[CUSTOMER_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]` * `partners/[PARTNER_ID]/vendors/[VENDOR_ID]/customers/[CUSTOMER_ID]` Assigned by the server.",
    ).optional(),
    ownerEmails: z.array(z.string()).describe(
      "Required. Input only. Email address of customer's users in the owner role. At least one `owner_email` is required. Owners share the same access as admins but can also add, delete, and edit your organization's portal users.",
    ).optional(),
    skipWelcomeEmail: z.boolean().describe(
      "Input only. If set to true, welcome email will not be sent to the customer. It is recommended to skip the welcome email if devices will be claimed with additional DEVICE_PROTECTION service, as the customer will receive separate emails at device claim time. This field is ignored if this is not a Zero-touch customer.",
    ).optional(),
    termsStatus: z.enum([
      "TERMS_STATUS_UNSPECIFIED",
      "TERMS_STATUS_NOT_ACCEPTED",
      "TERMS_STATUS_ACCEPTED",
      "TERMS_STATUS_STALE",
    ]).describe(
      "Output only. Whether any user from the company has accepted the latest Terms of Service (ToS). See TermsStatus.",
    ).optional(),
  }).describe(
    "A reseller, vendor, or customer in the zero-touch reseller and customer APIs.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Android Device Provisioning Partner Partners.Customers. Registered at `@swamp/gcp/androiddeviceprovisioning/partners-customers`. */
export const model = {
  type: "@swamp/gcp/androiddeviceprovisioning/partners-customers",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A reseller, vendor, or customer in the zero-touch reseller and customer APIs.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["customer"] !== undefined) body["customer"] = g["customer"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "partnerId": String(g["partnerId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a customers",
      arguments: z.object({
        identifier: z.string().describe("The name of the customers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["partnerId"] !== undefined) {
          params["partnerId"] = String(g["partnerId"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
    sync: {
      description: "Sync customers state from GCP",
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
          if (g["partnerId"] !== undefined) {
            params["partnerId"] = String(g["partnerId"]);
          } else if (existing["partnerId"]) {
            params["partnerId"] = String(existing["partnerId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
  },
};
