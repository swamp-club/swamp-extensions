// Auto-generated extension model for @swamp/aws/wisdom/message-template
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Wisdom MessageTemplate (AWS::Wisdom::MessageTemplate).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const MessageTemplateBodyContentProviderSchema = z.object({
  Content: z.string().min(1).optional(),
});

const EmailMessageTemplateContentBodySchema = z.object({
  PlainText: MessageTemplateBodyContentProviderSchema.describe(
    "The message body, in plain text format, to use in email messages that are based on the message template. We recommend using plain text format for email clients that don't render HTML content and clients that are connected to high-latency networks, such as mobile devices.",
  ).optional(),
  Html: MessageTemplateBodyContentProviderSchema.describe(
    "The message body, in HTML format, to use in email messages that are based on the message template. We recommend using HTML format for email clients that render HTML content. You can include links, formatted text, and more in an HTML message.",
  ).optional(),
});

const EmailMessageTemplateHeaderSchema = z.object({
  Name: z.string().min(1).max(126).regex(new RegExp("^[!-9;-@A-~]+$")).describe(
    "The name of the email header.",
  ).optional(),
  Value: z.string().min(1).max(870).regex(new RegExp("[ -~]*")).describe(
    "The value of the email header.",
  ).optional(),
});

const EmailMessageTemplateContentSchema = z.object({
  Subject: z.string().min(1).describe(
    "The subject line, or title, to use in email messages.",
  ),
  Body: EmailMessageTemplateContentBodySchema.describe(
    "The body to use in email messages.",
  ),
  Headers: z.array(EmailMessageTemplateHeaderSchema).describe(
    "The email headers to include in email messages.",
  ),
});

const SmsMessageTemplateContentBodySchema = z.object({
  PlainText: MessageTemplateBodyContentProviderSchema.describe(
    "The container of message template body.",
  ).optional(),
});

const SmsMessageTemplateContentSchema = z.object({
  Body: SmsMessageTemplateContentBodySchema.describe(
    "The body to use in SMS messages.",
  ),
});

const SystemEndpointAttributesSchema = z.object({
  Address: z.string().min(1).max(32767).describe(
    "The customer's phone number if used with customerEndpoint, or the number the customer dialed to call your contact center if used with systemEndpoint.",
  ).optional(),
});

const SystemAttributesSchema = z.object({
  Name: z.string().min(1).max(32767).describe("The name of the task.")
    .optional(),
  CustomerEndpoint: SystemEndpointAttributesSchema.describe(
    "The CustomerEndpoint attribute.",
  ).optional(),
  SystemEndpoint: SystemEndpointAttributesSchema.describe(
    "The SystemEndpoint attribute.",
  ).optional(),
});

const AgentAttributesSchema = z.object({
  FirstName: z.string().min(1).max(32767).describe(
    "The agent’s first name as entered in their Amazon Connect user account.",
  ).optional(),
  LastName: z.string().min(1).max(32767).describe(
    "The agent’s last name as entered in their Amazon Connect user account.",
  ).optional(),
});

const CustomerProfileAttributesSchema = z.object({
  ProfileId: z.string().min(1).max(32767).describe(
    "The unique identifier of a customer profile.",
  ).optional(),
  ProfileARN: z.string().min(1).max(32767).describe(
    "The ARN of a customer profile.",
  ).optional(),
  FirstName: z.string().min(1).max(32767).describe("The customer's first name.")
    .optional(),
  MiddleName: z.string().min(1).max(32767).describe(
    "The customer's middle name.",
  ).optional(),
  LastName: z.string().min(1).max(32767).describe("The customer's last name.")
    .optional(),
  AccountNumber: z.string().min(1).max(32767).describe(
    "A unique account number that you have given to the customer.",
  ).optional(),
  EmailAddress: z.string().min(1).max(32767).describe(
    "The customer's email address, which has not been specified as a personal or business address.",
  ).optional(),
  PhoneNumber: z.string().min(1).max(32767).describe(
    "The customer's phone number, which has not been specified as a mobile, home, or business number.",
  ).optional(),
  AdditionalInformation: z.string().min(1).max(32767).describe(
    "Any additional information relevant to the customer's profile.",
  ).optional(),
  PartyType: z.string().min(1).max(32767).describe("The customer's party type.")
    .optional(),
  BusinessName: z.string().min(1).max(32767).describe(
    "The name of the customer's business.",
  ).optional(),
  BirthDate: z.string().min(1).max(32767).describe("The customer's birth date.")
    .optional(),
  Gender: z.string().min(1).max(32767).describe("The customer's gender.")
    .optional(),
  MobilePhoneNumber: z.string().min(1).max(32767).describe(
    "The customer's mobile phone number.",
  ).optional(),
  HomePhoneNumber: z.string().min(1).max(32767).describe(
    "The customer's home phone number.",
  ).optional(),
  BusinessPhoneNumber: z.string().min(1).max(32767).describe(
    "The customer's business phone number.",
  ).optional(),
  BusinessEmailAddress: z.string().min(1).max(32767).describe(
    "The customer's business email address.",
  ).optional(),
  Address1: z.string().min(1).max(32767).describe(
    "The first line of a customer address.",
  ).optional(),
  Address2: z.string().min(1).max(32767).describe(
    "The second line of a customer address.",
  ).optional(),
  Address3: z.string().min(1).max(32767).describe(
    "The third line of a customer address.",
  ).optional(),
  Address4: z.string().min(1).max(32767).describe(
    "The fourth line of a customer address.",
  ).optional(),
  City: z.string().min(1).max(32767).describe(
    "The city in which a customer lives.",
  ).optional(),
  County: z.string().min(1).max(32767).describe(
    "The county in which a customer lives.",
  ).optional(),
  Country: z.string().min(1).max(32767).describe(
    "The country in which a customer lives.",
  ).optional(),
  PostalCode: z.string().min(1).max(32767).describe(
    "The postal code of a customer address.",
  ).optional(),
  Province: z.string().min(1).max(32767).describe(
    "The province in which a customer lives.",
  ).optional(),
  State: z.string().min(1).max(32767).describe(
    "The state in which a customer lives.",
  ).optional(),
  ShippingAddress1: z.string().min(1).max(32767).describe(
    "The first line of a customer’s shipping address.",
  ).optional(),
  ShippingAddress2: z.string().min(1).max(32767).describe(
    "The second line of a customer’s shipping address.",
  ).optional(),
  ShippingAddress3: z.string().min(1).max(32767).describe(
    "The third line of a customer’s shipping address.",
  ).optional(),
  ShippingAddress4: z.string().min(1).max(32767).describe(
    "The fourth line of a customer’s shipping address",
  ).optional(),
  ShippingCity: z.string().min(1).max(32767).describe(
    "The city of a customer’s shipping address.",
  ).optional(),
  ShippingCounty: z.string().min(1).max(32767).describe(
    "The county of a customer’s shipping address.",
  ).optional(),
  ShippingCountry: z.string().min(1).max(32767).describe(
    "The country of a customer’s shipping address.",
  ).optional(),
  ShippingPostalCode: z.string().min(1).max(32767).describe(
    "The postal code of a customer’s shipping address.",
  ).optional(),
  ShippingProvince: z.string().min(1).max(32767).describe(
    "The province of a customer’s shipping address.",
  ).optional(),
  ShippingState: z.string().min(1).max(32767).describe(
    "The state of a customer’s shipping address.",
  ).optional(),
  MailingAddress1: z.string().min(1).max(32767).describe(
    "The first line of a customer’s mailing address.",
  ).optional(),
  MailingAddress2: z.string().min(1).max(32767).describe(
    "The second line of a customer’s mailing address.",
  ).optional(),
  MailingAddress3: z.string().min(1).max(32767).describe(
    "The third line of a customer’s mailing address.",
  ).optional(),
  MailingAddress4: z.string().min(1).max(32767).describe(
    "The fourth line of a customer’s mailing address.",
  ).optional(),
  MailingCity: z.string().min(1).max(32767).describe(
    "The city of a customer’s mailing address.",
  ).optional(),
  MailingCounty: z.string().min(1).max(32767).describe(
    "The county of a customer’s mailing address.",
  ).optional(),
  MailingCountry: z.string().min(1).max(32767).describe(
    "The country of a customer’s mailing address.",
  ).optional(),
  MailingPostalCode: z.string().min(1).max(32767).describe(
    "The postal code of a customer’s mailing address",
  ).optional(),
  MailingProvince: z.string().min(1).max(32767).describe(
    "The province of a customer’s mailing address.",
  ).optional(),
  MailingState: z.string().min(1).max(32767).describe(
    "The state of a customer’s mailing address.",
  ).optional(),
  BillingAddress1: z.string().min(1).max(32767).describe(
    "The first line of a customer’s billing address.",
  ).optional(),
  BillingAddress2: z.string().min(1).max(32767).describe(
    "The second line of a customer’s billing address.",
  ).optional(),
  BillingAddress3: z.string().min(1).max(32767).describe(
    "The third line of a customer’s billing address.",
  ).optional(),
  BillingAddress4: z.string().min(1).max(32767).describe(
    "The fourth line of a customer’s billing address.",
  ).optional(),
  BillingCity: z.string().min(1).max(32767).describe(
    "The city of a customer’s billing address.",
  ).optional(),
  BillingCounty: z.string().min(1).max(32767).describe(
    "The county of a customer’s billing address.",
  ).optional(),
  BillingCountry: z.string().min(1).max(32767).describe(
    "The country of a customer’s billing address.",
  ).optional(),
  BillingPostalCode: z.string().min(1).max(32767).describe(
    "The postal code of a customer’s billing address.",
  ).optional(),
  BillingProvince: z.string().min(1).max(32767).describe(
    "The province of a customer’s billing address.",
  ).optional(),
  BillingState: z.string().min(1).max(32767).describe(
    "The state of a customer’s billing address.",
  ).optional(),
  Custom: z.record(z.string(), z.string().min(1).max(32767)).describe(
    "The custom attributes that are used with the message template.",
  ).optional(),
});

const MessageTemplateAttachmentSchema = z.object({
  AttachmentId: z.string().min(1).optional(),
  AttachmentName: z.string().min(1).max(255).describe(
    "The name of the attachment file being uploaded. The name should include the file extension.",
  ),
  S3PresignedUrl: z.string().min(1).describe(
    "The S3 Presigned URL for the attachment file. When generating the PreSignedUrl, please ensure that the expires-in time is set to 30 minutes. The URL can be generated through the AWS Console or through the AWS CLI (https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html).",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
  Value: z.string().min(1).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  KnowledgeBaseArn: z.string().regex(
    new RegExp(
      "^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})?$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the knowledge base to which the message template belongs.",
  ),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\\\s_.,-]+"))
    .describe("The name of the message template."),
  ChannelSubtype: z.enum(["EMAIL", "SMS"]).describe(
    "The channel subtype this message template applies to.",
  ),
  Content: z.object({
    EmailMessageTemplateContent: EmailMessageTemplateContentSchema.describe(
      "The content of message template that applies to email channel subtype.",
    ).optional(),
    SmsMessageTemplateContent: SmsMessageTemplateContentSchema.describe(
      "The content of message template that applies to SMS channel subtype.",
    ).optional(),
  }).describe("The content of the message template."),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\\\s_.,-]+"),
  ).describe("The description of the message template.").optional(),
  Language: z.string().min(2).max(5).describe(
    "The language code value for the language in which the message template is written. The supported language codes include de_DE, en_US, es_ES, fr_FR, id_ID, it_IT, ja_JP, ko_KR, pt_BR, zh_CN, zh_TW",
  ).optional(),
  GroupingConfiguration: z.object({
    Criteria: z.string().min(1).max(100).describe(
      "The criteria used for grouping Amazon Q in Connect users.",
    ),
    Values: z.array(z.string().min(1).max(2048)).describe(
      "The list of values that define different groups of Amazon Q in Connect users.",
    ),
  }).describe(
    "The configuration information of the user groups that the message template is accessible to.",
  ).optional(),
  DefaultAttributes: z.object({
    SystemAttributes: SystemAttributesSchema.describe(
      "The system attributes that are used with the message template.",
    ).optional(),
    AgentAttributes: AgentAttributesSchema.describe(
      "The agent attributes that are used with the message template.",
    ).optional(),
    CustomerProfileAttributes: CustomerProfileAttributesSchema.describe(
      "The customer profile attributes that are used with the message template.",
    ).optional(),
    CustomAttributes: z.record(z.string(), z.string().min(1).max(32767))
      .describe(
        "The custom attributes that are used with the message template.",
      ).optional(),
  }).describe(
    "An object that specifies the default values to use for variables in the message template. This object contains different categories of key-value pairs. Each key defines a variable or placeholder in the message template. The corresponding value defines the default value for that variable.",
  ).optional(),
  MessageTemplateAttachments: z.array(MessageTemplateAttachmentSchema).describe(
    "List of message template attachments",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }.',
  ).optional(),
});

const StateSchema = z.object({
  KnowledgeBaseArn: z.string().optional(),
  MessageTemplateId: z.string().optional(),
  MessageTemplateArn: z.string(),
  Name: z.string().optional(),
  ChannelSubtype: z.string().optional(),
  Content: z.object({
    EmailMessageTemplateContent: EmailMessageTemplateContentSchema,
    SmsMessageTemplateContent: SmsMessageTemplateContentSchema,
  }).optional(),
  Description: z.string().optional(),
  Language: z.string().optional(),
  GroupingConfiguration: z.object({
    Criteria: z.string(),
    Values: z.array(z.string()),
  }).optional(),
  DefaultAttributes: z.object({
    SystemAttributes: SystemAttributesSchema,
    AgentAttributes: AgentAttributesSchema,
    CustomerProfileAttributes: CustomerProfileAttributesSchema,
    CustomAttributes: z.record(z.string(), z.unknown()),
  }).optional(),
  MessageTemplateContentSha256: z.string().optional(),
  MessageTemplateAttachments: z.array(MessageTemplateAttachmentSchema)
    .optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  KnowledgeBaseArn: z.string().regex(
    new RegExp(
      "^arn:[a-z-]*?:wisdom:[a-z0-9-]*?:[0-9]{12}:[a-z-]*?/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})?$",
    ),
  ).describe(
    "The Amazon Resource Name (ARN) of the knowledge base to which the message template belongs.",
  ).optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9\\\\s_.,-]+"))
    .describe("The name of the message template.").optional(),
  ChannelSubtype: z.enum(["EMAIL", "SMS"]).describe(
    "The channel subtype this message template applies to.",
  ).optional(),
  Content: z.object({
    EmailMessageTemplateContent: EmailMessageTemplateContentSchema.describe(
      "The content of message template that applies to email channel subtype.",
    ).optional(),
    SmsMessageTemplateContent: SmsMessageTemplateContentSchema.describe(
      "The content of message template that applies to SMS channel subtype.",
    ).optional(),
  }).describe("The content of the message template.").optional(),
  Description: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z0-9\\\\s_.,-]+"),
  ).describe("The description of the message template.").optional(),
  Language: z.string().min(2).max(5).describe(
    "The language code value for the language in which the message template is written. The supported language codes include de_DE, en_US, es_ES, fr_FR, id_ID, it_IT, ja_JP, ko_KR, pt_BR, zh_CN, zh_TW",
  ).optional(),
  GroupingConfiguration: z.object({
    Criteria: z.string().min(1).max(100).describe(
      "The criteria used for grouping Amazon Q in Connect users.",
    ).optional(),
    Values: z.array(z.string().min(1).max(2048)).describe(
      "The list of values that define different groups of Amazon Q in Connect users.",
    ).optional(),
  }).describe(
    "The configuration information of the user groups that the message template is accessible to.",
  ).optional(),
  DefaultAttributes: z.object({
    SystemAttributes: SystemAttributesSchema.describe(
      "The system attributes that are used with the message template.",
    ).optional(),
    AgentAttributes: AgentAttributesSchema.describe(
      "The agent attributes that are used with the message template.",
    ).optional(),
    CustomerProfileAttributes: CustomerProfileAttributesSchema.describe(
      "The customer profile attributes that are used with the message template.",
    ).optional(),
    CustomAttributes: z.record(z.string(), z.string().min(1).max(32767))
      .describe(
        "The custom attributes that are used with the message template.",
      ).optional(),
  }).describe(
    "An object that specifies the default values to use for variables in the message template. This object contains different categories of key-value pairs. Each key defines a variable or placeholder in the message template. The corresponding value defines the default value for that variable.",
  ).optional(),
  MessageTemplateAttachments: z.array(MessageTemplateAttachmentSchema).describe(
    "List of message template attachments",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }.',
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

/** Swamp extension model for Wisdom MessageTemplate. Registered at `@swamp/aws/wisdom/message-template`. */
export const model = {
  type: "@swamp/aws/wisdom/message-template",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Wisdom MessageTemplate resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Wisdom MessageTemplate",
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
          "AWS::Wisdom::MessageTemplate",
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
      description: "Get a Wisdom MessageTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom MessageTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Wisdom::MessageTemplate",
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
      description: "Update a Wisdom MessageTemplate",
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
        const identifier = existing.MessageTemplateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Wisdom::MessageTemplate",
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
          "AWS::Wisdom::MessageTemplate",
          identifier,
          currentState,
          desiredState,
          ["KnowledgeBaseArn", "ChannelSubtype"],
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
      description: "Delete a Wisdom MessageTemplate",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Wisdom MessageTemplate",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Wisdom::MessageTemplate",
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
      description: "Sync Wisdom MessageTemplate state from AWS",
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
        const identifier = existing.MessageTemplateArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Wisdom::MessageTemplate",
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
  },
};
