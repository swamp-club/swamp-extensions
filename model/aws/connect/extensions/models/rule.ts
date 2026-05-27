// Auto-generated extension model for @swamp/aws/connect/rule
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Connect Rule (AWS::Connect::Rule).
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

const EventBridgeActionSchema = z.object({
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,100}$")).describe(
    "The name.",
  ),
});

const ReferenceSchema = z.object({
  Value: z.string().regex(new RegExp("^(/|https:)")).describe(
    "A valid value for the reference. For example, for a URL reference, a formatted URL that is displayed to an agent in the Contact Control Panel (CCP).",
  ),
  Type: z.enum(["URL", "ATTACHMENT", "NUMBER", "STRING", "DATE", "EMAIL"])
    .describe(
      "The type of the reference. DATE must be of type Epoch timestamp. *Allowed values*: URL | ATTACHMENT | NUMBER | STRING | DATE | EMAIL",
    ),
});

const TaskActionSchema = z.object({
  Name: z.string().min(1).max(512).describe(
    "The name. Supports variable injection. For more information, see [JSONPath reference](https://docs.aws.amazon.com/connect/latest/adminguide/contact-lens-variable-injection.html) in the *Administrators Guide*.",
  ),
  Description: z.string().min(0).max(4096).describe(
    "The description. Supports variable injection. For more information, see [JSONPath reference](https://docs.aws.amazon.com/connect/latest/adminguide/contact-lens-variable-injection.html) in the *Administrators Guide*.",
  ).optional(),
  ContactFlowArn: z.string().regex(
    new RegExp(
      "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/contact-flow/[-a-zA-Z0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the flow."),
  References: z.record(z.string(), ReferenceSchema).describe(
    "Information about the reference when the referenceType is URL. Otherwise, null. URL is the only accepted type. (Supports variable injection in the Value field.)",
  ).optional(),
});

const NotificationRecipientTypeSchema = z.object({
  UserTags: z.record(z.string(), z.string()).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }. CON users with the specified tags will be notified.',
  ).optional(),
  UserArns: z.array(
    z.string().regex(
      new RegExp(
        "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/agent/[-a-zA-Z0-9]*$|^\\$\\..+$",
      ),
    ),
  ).describe("The Amazon Resource Name (ARN) of the user account.").optional(),
});

const SendNotificationActionSchema = z.object({
  DeliveryMethod: z.enum(["EMAIL"]).describe(
    "Notification delivery method. *Allowed value*: EMAIL",
  ),
  Subject: z.string().min(1).max(200).describe(
    "The subject of the email if the delivery method is EMAIL. Supports variable injection. For more information, see [JSONPath reference](https://docs.aws.amazon.com/connect/latest/adminguide/contact-lens-variable-injection.html) in the *Administrators Guide*.",
  ).optional(),
  Content: z.string().min(1).max(1024).describe(
    "Notification content. Supports variable injection. For more information, see [JSONPath reference](https://docs.aws.amazon.com/connect/latest/adminguide/contact-lens-variable-injection.html) in the *Administrators Guide*.",
  ),
  ContentType: z.enum(["PLAIN_TEXT"]).describe(
    "Content type format. *Allowed value*: PLAIN_TEXT",
  ),
  Recipient: NotificationRecipientTypeSchema.describe(
    "Notification recipient.",
  ),
});

const FieldValueSchema = z.object({
  StringValue: z.string().optional(),
  BooleanValue: z.boolean().optional(),
  DoubleValue: z.number().optional(),
  EmptyValue: z.record(z.string(), z.unknown()).optional(),
});

const FieldSchema = z.object({
  Id: z.string().min(1).max(500),
  Value: FieldValueSchema,
});

const CreateCaseActionSchema = z.object({
  Fields: z.array(FieldSchema),
  TemplateId: z.string().min(1).max(500),
});

const UpdateCaseActionSchema = z.object({
  Fields: z.array(FieldSchema),
});

const SubmitAutoEvaluationActionSchema = z.object({
  EvaluationFormArn: z.string().regex(
    new RegExp(
      "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/evaluation-form/[-a-zA-Z0-9]*$",
    ),
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
  Value: z.string().max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,200}$")).describe(
    "The name of the rule.",
  ),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the instance."),
  TriggerEventSource: z.object({
    EventSourceName: z.enum([
      "OnContactEvaluationSubmit",
      "OnPostCallAnalysisAvailable",
      "OnRealTimeCallAnalysisAvailable",
      "OnRealTimeChatAnalysisAvailable",
      "OnPostChatAnalysisAvailable",
      "OnZendeskTicketCreate",
      "OnZendeskTicketStatusUpdate",
      "OnSalesforceCaseCreate",
      "OnMetricDataUpdate",
      "OnCaseCreate",
      "OnCaseUpdate",
    ]).describe("The name of the event source."),
    IntegrationAssociationArn: z.string().regex(
      new RegExp(
        "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/integration-association/[-a-zA-Z0-9]*$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the integration association. IntegrationAssociationArn is required if TriggerEventSource is one of the following values: OnZendeskTicketCreate | OnZendeskTicketStatusUpdate | OnSalesforceCaseCreate",
    ).optional(),
  }).describe("The event source to trigger the rule."),
  Function: z.string().describe("The conditions of the rule."),
  Actions: z.object({
    AssignContactCategoryActions: z.array(z.record(z.string(), z.unknown()))
      .describe(
        "Information about the contact category action. The syntax can be empty, for example, {}.",
      ).optional(),
    EventBridgeActions: z.array(EventBridgeActionSchema).describe(
      "Information about the EV action.",
    ).optional(),
    TaskActions: z.array(TaskActionSchema).describe(
      "Information about the task action. This field is required if TriggerEventSource is one of the following values: OnZendeskTicketCreate | OnZendeskTicketStatusUpdate | OnSalesforceCaseCreate",
    ).optional(),
    SendNotificationActions: z.array(SendNotificationActionSchema).describe(
      "Information about the send notification action.",
    ).optional(),
    CreateCaseActions: z.array(CreateCaseActionSchema).optional(),
    UpdateCaseActions: z.array(UpdateCaseActionSchema).optional(),
    EndAssociatedTasksActions: z.array(z.record(z.string(), z.unknown()))
      .optional(),
    SubmitAutoEvaluationActions: z.array(SubmitAutoEvaluationActionSchema)
      .optional(),
  }).describe("A list of actions to be run when the rule is triggered."),
  PublishStatus: z.enum(["DRAFT", "PUBLISHED"]).describe(
    "The publish status of the rule. *Allowed values*: DRAFT | PUBLISHED",
  ),
  Tags: z.array(TagSchema).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }.',
  ).optional(),
});

const StateSchema = z.object({
  Name: z.string().optional(),
  RuleArn: z.string(),
  InstanceArn: z.string().optional(),
  TriggerEventSource: z.object({
    EventSourceName: z.string(),
    IntegrationAssociationArn: z.string(),
  }).optional(),
  Function: z.string().optional(),
  Actions: z.object({
    AssignContactCategoryActions: z.array(z.record(z.string(), z.unknown())),
    EventBridgeActions: z.array(EventBridgeActionSchema),
    TaskActions: z.array(TaskActionSchema),
    SendNotificationActions: z.array(SendNotificationActionSchema),
    CreateCaseActions: z.array(CreateCaseActionSchema),
    UpdateCaseActions: z.array(UpdateCaseActionSchema),
    EndAssociatedTasksActions: z.array(z.record(z.string(), z.unknown())),
    SubmitAutoEvaluationActions: z.array(SubmitAutoEvaluationActionSchema),
  }).optional(),
  PublishStatus: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9._-]{1,200}$")).describe(
    "The name of the rule.",
  ).optional(),
  InstanceArn: z.string().regex(
    new RegExp(
      "^arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*$",
    ),
  ).describe("The Amazon Resource Name (ARN) of the instance.").optional(),
  TriggerEventSource: z.object({
    EventSourceName: z.enum([
      "OnContactEvaluationSubmit",
      "OnPostCallAnalysisAvailable",
      "OnRealTimeCallAnalysisAvailable",
      "OnRealTimeChatAnalysisAvailable",
      "OnPostChatAnalysisAvailable",
      "OnZendeskTicketCreate",
      "OnZendeskTicketStatusUpdate",
      "OnSalesforceCaseCreate",
      "OnMetricDataUpdate",
      "OnCaseCreate",
      "OnCaseUpdate",
    ]).describe("The name of the event source.").optional(),
    IntegrationAssociationArn: z.string().regex(
      new RegExp(
        "^$|arn:aws[-a-z0-9]*:connect:[-a-z0-9]*:[0-9]{12}:instance/[-a-zA-Z0-9]*/integration-association/[-a-zA-Z0-9]*$",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the integration association. IntegrationAssociationArn is required if TriggerEventSource is one of the following values: OnZendeskTicketCreate | OnZendeskTicketStatusUpdate | OnSalesforceCaseCreate",
    ).optional(),
  }).describe("The event source to trigger the rule.").optional(),
  Function: z.string().describe("The conditions of the rule.").optional(),
  Actions: z.object({
    AssignContactCategoryActions: z.array(z.record(z.string(), z.unknown()))
      .describe(
        "Information about the contact category action. The syntax can be empty, for example, {}.",
      ).optional(),
    EventBridgeActions: z.array(EventBridgeActionSchema).describe(
      "Information about the EV action.",
    ).optional(),
    TaskActions: z.array(TaskActionSchema).describe(
      "Information about the task action. This field is required if TriggerEventSource is one of the following values: OnZendeskTicketCreate | OnZendeskTicketStatusUpdate | OnSalesforceCaseCreate",
    ).optional(),
    SendNotificationActions: z.array(SendNotificationActionSchema).describe(
      "Information about the send notification action.",
    ).optional(),
    CreateCaseActions: z.array(CreateCaseActionSchema).optional(),
    UpdateCaseActions: z.array(UpdateCaseActionSchema).optional(),
    EndAssociatedTasksActions: z.array(z.record(z.string(), z.unknown()))
      .optional(),
    SubmitAutoEvaluationActions: z.array(SubmitAutoEvaluationActionSchema)
      .optional(),
  }).describe("A list of actions to be run when the rule is triggered.")
    .optional(),
  PublishStatus: z.enum(["DRAFT", "PUBLISHED"]).describe(
    "The publish status of the rule. *Allowed values*: DRAFT | PUBLISHED",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    'The tags used to organize, track, or control access for this resource. For example, { "tags": {"key1":"value1", "key2":"value2"} }.',
  ).optional(),
});

/** Swamp extension model for Connect Rule. Registered at `@swamp/aws/connect/rule`. */
export const model = {
  type: "@swamp/aws/connect/rule",
  version: "2026.05.27.1",
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
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Connect Rule resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Connect Rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Connect::Rule",
          desiredState,
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
      description: "Get a Connect Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::Connect::Rule",
          args.identifier,
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
      description: "Update a Connect Rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.RuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Connect::Rule",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Connect::Rule",
          identifier,
          currentState,
          desiredState,
          ["TriggerEventSource", "InstanceArn"],
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
      description: "Delete a Connect Rule",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Connect Rule",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::Connect::Rule",
          args.identifier,
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
      description: "Sync Connect Rule state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const identifier = existing.RuleArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Connect::Rule",
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
