// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/invoicing/procurement-portal-preference
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Invoicing ProcurementPortalPreference (AWS::Invoicing::ProcurementPortalPreference).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const PurchaseOrderDataSourceSchema = z.object({
  EinvoiceDeliveryDocumentType: z.enum([
    "AWS_CLOUD_INVOICE",
    "AWS_CLOUD_CREDIT_MEMO",
    "AWS_MARKETPLACE_INVOICE",
    "AWS_MARKETPLACE_CREDIT_MEMO",
    "AWS_REQUEST_FOR_PAYMENT",
  ]).describe(
    "The type of e-invoice document that requires purchase order data.",
  ).optional(),
  PurchaseOrderDataSourceType: z.enum([
    "ASSOCIATED_PURCHASE_ORDER_REQUIRED",
    "PURCHASE_ORDER_NOT_REQUIRED",
  ]).describe("The type of source for purchase order data.").optional(),
});

const ContactSchema = z.object({
  Name: z.string().min(0).max(1024).describe(
    "The name of the contact person or role.",
  ).optional(),
  Email: z.string().min(1).max(1024).regex(
    new RegExp("^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$"),
  ).describe("The email address of the contact person or role.").optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The tag key."),
  Value: z.string().min(0).max(256).describe("The tag value."),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  ProcurementPortalName: z.enum(["SAP_BUSINESS_NETWORK", "COUPA"]).describe(
    "The name of the procurement portal.",
  ),
  BuyerDomain: z.enum(["NetworkID"]).describe(
    "The domain identifier for the buyer in the procurement portal.",
  ),
  BuyerIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
    .describe("The unique identifier for the buyer in the procurement portal."),
  SupplierDomain: z.enum(["NetworkID"]).describe(
    "The domain identifier for the supplier in the procurement portal.",
  ),
  SupplierIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
    .describe(
      "The unique identifier for the supplier in the procurement portal.",
    ),
  Selector: z.object({
    InvoiceUnitArns: z.array(z.string()).describe(
      "The Amazon Resource Name (ARN) of invoice unit identifiers to which this preference applies.",
    ).optional(),
  }).describe(
    "Specifies criteria for selecting which invoices should be processed.",
  ).optional(),
  ProcurementPortalSharedSecret: z.string().min(0).max(1024).regex(
    new RegExp("^\\S+$"),
  ).describe(
    "The shared secret or authentication credential used for secure communication with the procurement portal.",
  ).optional(),
  ProcurementPortalInstanceEndpoint: z.string().min(0).max(1024).regex(
    new RegExp("^\\S+$"),
  ).describe(
    "The endpoint URL where e-invoices are delivered to the procurement portal.",
  ).optional(),
  TestEnvPreference: z.object({
    BuyerDomain: z.enum(["NetworkID"]).describe(
      "The domain identifier for the buyer in the test environment.",
    ).optional(),
    BuyerIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
      .describe("The unique identifier for the buyer in the test environment.")
      .optional(),
    SupplierDomain: z.enum(["NetworkID"]).describe(
      "The domain identifier for the supplier in the test environment.",
    ).optional(),
    SupplierIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
      .describe(
        "The unique identifier for the supplier in the test environment.",
      ).optional(),
    ProcurementPortalSharedSecret: z.string().min(0).max(1024).regex(
      new RegExp("^\\S+$"),
    ).describe(
      "The shared secret for secure communication in the test environment.",
    ).optional(),
    ProcurementPortalInstanceEndpoint: z.string().min(0).max(1024).regex(
      new RegExp("^\\S+$"),
    ).describe(
      "The endpoint URL for e-invoice delivery in the test environment.",
    ).optional(),
  }).describe(
    "Configuration settings for the test environment of the procurement portal.",
  ).optional(),
  EinvoiceDeliveryEnabled: z.boolean().describe(
    "Indicates whether e-invoice delivery is enabled for this procurement portal preference.",
  ),
  EinvoiceDeliveryPreference: z.object({
    EinvoiceDeliveryDocumentTypes: z.array(
      z.enum([
        "AWS_CLOUD_INVOICE",
        "AWS_CLOUD_CREDIT_MEMO",
        "AWS_MARKETPLACE_INVOICE",
        "AWS_MARKETPLACE_CREDIT_MEMO",
        "AWS_REQUEST_FOR_PAYMENT",
      ]),
    ).describe("The types of e-invoice documents to be delivered.").optional(),
    EinvoiceDeliveryAttachmentTypes: z.array(z.enum(["INVOICE_PDF", "RFP_PDF"]))
      .describe(
        "The types of attachments to include with the e-invoice delivery.",
      ).optional(),
    Protocol: z.enum(["CXML"]).describe(
      "The communication protocol to use for e-invoice delivery.",
    ).optional(),
    PurchaseOrderDataSources: z.array(PurchaseOrderDataSourceSchema).describe(
      "The sources of purchase order data.",
    ).optional(),
    ConnectionTestingMethod: z.enum([
      "PROD_ENV_DOLLAR_TEST",
      "TEST_ENV_REPLAY_TEST",
    ]).describe(
      "The method to use for testing the connection to the procurement portal.",
    ).optional(),
    EinvoiceDeliveryActivationDate: z.string().describe(
      "The ISO 8601 date-time when e-invoice delivery should be activated.",
    ).optional(),
  }).describe("Specifies the preferences for e-invoice delivery.").optional(),
  PurchaseOrderRetrievalEnabled: z.boolean().describe(
    "Indicates whether purchase order retrieval is enabled for this procurement portal preference.",
  ),
  Contacts: z.array(ContactSchema).describe(
    "List of contact information for portal administrators and technical contacts.",
  ),
  Tags: z.array(TagSchema).describe(
    "The tags associated with this procurement portal preference.",
  ).optional(),
});

const StateSchema = z.object({
  ProcurementPortalPreferenceArn: z.string(),
  AwsAccountId: z.string().optional(),
  ProcurementPortalName: z.string().optional(),
  BuyerDomain: z.string().optional(),
  BuyerIdentifier: z.string().optional(),
  SupplierDomain: z.string().optional(),
  SupplierIdentifier: z.string().optional(),
  Selector: z.object({
    InvoiceUnitArns: z.array(z.string()),
  }).optional(),
  ProcurementPortalSharedSecret: z.string().optional(),
  ProcurementPortalInstanceEndpoint: z.string().optional(),
  PurchaseOrderRetrievalEndpoint: z.string().optional(),
  TestEnvPreference: z.object({
    BuyerDomain: z.string(),
    BuyerIdentifier: z.string(),
    SupplierDomain: z.string(),
    SupplierIdentifier: z.string(),
    ProcurementPortalSharedSecret: z.string(),
    ProcurementPortalInstanceEndpoint: z.string(),
  }).optional(),
  EinvoiceDeliveryEnabled: z.boolean().optional(),
  EinvoiceDeliveryPreference: z.object({
    EinvoiceDeliveryDocumentTypes: z.array(z.string()),
    EinvoiceDeliveryAttachmentTypes: z.array(z.string()),
    Protocol: z.string(),
    PurchaseOrderDataSources: z.array(PurchaseOrderDataSourceSchema),
    ConnectionTestingMethod: z.string(),
    EinvoiceDeliveryActivationDate: z.string(),
  }).optional(),
  PurchaseOrderRetrievalEnabled: z.boolean().optional(),
  Contacts: z.array(ContactSchema).optional(),
  EinvoiceDeliveryPreferenceStatus: z.string().optional(),
  PurchaseOrderRetrievalPreferenceStatus: z.string().optional(),
  Version: z.number().optional(),
  CreateDate: z.string().optional(),
  LastUpdateDate: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ProcurementPortalName: z.enum(["SAP_BUSINESS_NETWORK", "COUPA"]).describe(
    "The name of the procurement portal.",
  ).optional(),
  BuyerDomain: z.enum(["NetworkID"]).describe(
    "The domain identifier for the buyer in the procurement portal.",
  ).optional(),
  BuyerIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
    .describe("The unique identifier for the buyer in the procurement portal.")
    .optional(),
  SupplierDomain: z.enum(["NetworkID"]).describe(
    "The domain identifier for the supplier in the procurement portal.",
  ).optional(),
  SupplierIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
    .describe(
      "The unique identifier for the supplier in the procurement portal.",
    ).optional(),
  Selector: z.object({
    InvoiceUnitArns: z.array(z.string()).describe(
      "The Amazon Resource Name (ARN) of invoice unit identifiers to which this preference applies.",
    ).optional(),
  }).describe(
    "Specifies criteria for selecting which invoices should be processed.",
  ).optional(),
  ProcurementPortalSharedSecret: z.string().min(0).max(1024).regex(
    new RegExp("^\\S+$"),
  ).describe(
    "The shared secret or authentication credential used for secure communication with the procurement portal.",
  ).optional(),
  ProcurementPortalInstanceEndpoint: z.string().min(0).max(1024).regex(
    new RegExp("^\\S+$"),
  ).describe(
    "The endpoint URL where e-invoices are delivered to the procurement portal.",
  ).optional(),
  TestEnvPreference: z.object({
    BuyerDomain: z.enum(["NetworkID"]).describe(
      "The domain identifier for the buyer in the test environment.",
    ).optional(),
    BuyerIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
      .describe("The unique identifier for the buyer in the test environment.")
      .optional(),
    SupplierDomain: z.enum(["NetworkID"]).describe(
      "The domain identifier for the supplier in the test environment.",
    ).optional(),
    SupplierIdentifier: z.string().min(0).max(1024).regex(new RegExp("^\\S+$"))
      .describe(
        "The unique identifier for the supplier in the test environment.",
      ).optional(),
    ProcurementPortalSharedSecret: z.string().min(0).max(1024).regex(
      new RegExp("^\\S+$"),
    ).describe(
      "The shared secret for secure communication in the test environment.",
    ).optional(),
    ProcurementPortalInstanceEndpoint: z.string().min(0).max(1024).regex(
      new RegExp("^\\S+$"),
    ).describe(
      "The endpoint URL for e-invoice delivery in the test environment.",
    ).optional(),
  }).describe(
    "Configuration settings for the test environment of the procurement portal.",
  ).optional(),
  EinvoiceDeliveryEnabled: z.boolean().describe(
    "Indicates whether e-invoice delivery is enabled for this procurement portal preference.",
  ).optional(),
  EinvoiceDeliveryPreference: z.object({
    EinvoiceDeliveryDocumentTypes: z.array(
      z.enum([
        "AWS_CLOUD_INVOICE",
        "AWS_CLOUD_CREDIT_MEMO",
        "AWS_MARKETPLACE_INVOICE",
        "AWS_MARKETPLACE_CREDIT_MEMO",
        "AWS_REQUEST_FOR_PAYMENT",
      ]),
    ).describe("The types of e-invoice documents to be delivered.").optional(),
    EinvoiceDeliveryAttachmentTypes: z.array(z.enum(["INVOICE_PDF", "RFP_PDF"]))
      .describe(
        "The types of attachments to include with the e-invoice delivery.",
      ).optional(),
    Protocol: z.enum(["CXML"]).describe(
      "The communication protocol to use for e-invoice delivery.",
    ).optional(),
    PurchaseOrderDataSources: z.array(PurchaseOrderDataSourceSchema).describe(
      "The sources of purchase order data.",
    ).optional(),
    ConnectionTestingMethod: z.enum([
      "PROD_ENV_DOLLAR_TEST",
      "TEST_ENV_REPLAY_TEST",
    ]).describe(
      "The method to use for testing the connection to the procurement portal.",
    ).optional(),
    EinvoiceDeliveryActivationDate: z.string().describe(
      "The ISO 8601 date-time when e-invoice delivery should be activated.",
    ).optional(),
  }).describe("Specifies the preferences for e-invoice delivery.").optional(),
  PurchaseOrderRetrievalEnabled: z.boolean().describe(
    "Indicates whether purchase order retrieval is enabled for this procurement portal preference.",
  ).optional(),
  Contacts: z.array(ContactSchema).describe(
    "List of contact information for portal administrators and technical contacts.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags associated with this procurement portal preference.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for Invoicing ProcurementPortalPreference. Registered at `@swamp/aws/invoicing/procurement-portal-preference`. */
export const model = {
  type: "@swamp/aws/invoicing/procurement-portal-preference",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Invoicing ProcurementPortalPreference resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Invoicing ProcurementPortalPreference",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Invoicing::ProcurementPortalPreference",
          desiredState,
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
      description: "Get a Invoicing ProcurementPortalPreference",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Invoicing ProcurementPortalPreference",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Invoicing::ProcurementPortalPreference",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a Invoicing ProcurementPortalPreference",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.ProcurementPortalPreferenceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Invoicing::ProcurementPortalPreference",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Invoicing::ProcurementPortalPreference",
          identifier,
          currentState,
          desiredState,
          [
            "ProcurementPortalName",
            "BuyerDomain",
            "BuyerIdentifier",
            "SupplierDomain",
            "SupplierIdentifier",
          ],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Invoicing ProcurementPortalPreference",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Invoicing ProcurementPortalPreference",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Invoicing::ProcurementPortalPreference",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync Invoicing ProcurementPortalPreference state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const identifier = existing.ProcurementPortalPreferenceArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Invoicing::ProcurementPortalPreference",
            identifier,
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
              identifier,
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
      description: "List Invoicing ProcurementPortalPreference resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::Invoicing::ProcurementPortalPreference",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.ProcurementPortalPreferenceArn?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
