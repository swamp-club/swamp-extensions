// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-workspaces-triggers
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Triggers.
 *
 * Represents a Google Tag Manager Trigger
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://tagmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.triggers.get",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "GET",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.triggers.create",
  "path": "tagmanager/v2/{+parent}/triggers",
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

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.triggers.update",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "fingerprint": {
      "location": "query",
    },
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.triggers.delete",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "tagmanager.accounts.containers.workspaces.triggers.list",
  "path": "tagmanager/v2/{+parent}/triggers",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  accountId: z.string().describe("GTM Account ID.").optional(),
  autoEventFilter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.unknown()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.unknown()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
        "template",
        "integer",
        "boolean",
        "list",
        "map",
        "triggerReference",
        "tagReference",
      ]).describe(
        "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
      ).optional(),
      value: z.string().describe(
        "A parameter's value (may contain variable references). as appropriate to the specified type.",
      ).optional(),
    })).describe(
      "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
    ).optional(),
    type: z.enum([
      "conditionTypeUnspecified",
      "equals",
      "contains",
      "startsWith",
      "endsWith",
      "matchRegex",
      "greater",
      "greaterOrEquals",
      "less",
      "lessOrEquals",
      "cssSelector",
      "urlMatches",
    ]).describe("The type of operator for this condition.").optional(),
  })).describe("Used in the case of auto event tracking.").optional(),
  checkValidation: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  continuousTimeMinMilliseconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  customEventFilter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.unknown()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.unknown()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
        "template",
        "integer",
        "boolean",
        "list",
        "map",
        "triggerReference",
        "tagReference",
      ]).describe(
        "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
      ).optional(),
      value: z.string().describe(
        "A parameter's value (may contain variable references). as appropriate to the specified type.",
      ).optional(),
    })).describe(
      "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
    ).optional(),
    type: z.enum([
      "conditionTypeUnspecified",
      "equals",
      "contains",
      "startsWith",
      "endsWith",
      "matchRegex",
      "greater",
      "greaterOrEquals",
      "less",
      "lessOrEquals",
      "cssSelector",
      "urlMatches",
    ]).describe("The type of operator for this condition.").optional(),
  })).describe(
    "Used in the case of custom event, which is fired iff all Conditions are true.",
  ).optional(),
  eventName: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  filter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.unknown()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.unknown()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
        "template",
        "integer",
        "boolean",
        "list",
        "map",
        "triggerReference",
        "tagReference",
      ]).describe(
        "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
      ).optional(),
      value: z.string().describe(
        "A parameter's value (may contain variable references). as appropriate to the specified type.",
      ).optional(),
    })).describe(
      "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
    ).optional(),
    type: z.enum([
      "conditionTypeUnspecified",
      "equals",
      "contains",
      "startsWith",
      "endsWith",
      "matchRegex",
      "greater",
      "greaterOrEquals",
      "less",
      "lessOrEquals",
      "cssSelector",
      "urlMatches",
    ]).describe("The type of operator for this condition.").optional(),
  })).describe("The trigger will only fire iff all Conditions are true.")
    .optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Trigger as computed at storage time. This value is recomputed whenever the trigger is modified.",
  ).optional(),
  horizontalScrollPercentageList: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  interval: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  intervalSeconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  limit: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  maxTimerLengthSeconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  name: z.string().describe("Trigger display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this trigger in the container.",
  ).optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  })).describe("Additional parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  path: z.string().describe("GTM Trigger's API relative path.").optional(),
  selector: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  totalTimeMinMilliseconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  triggerId: z.string().describe(
    "The Trigger ID uniquely identifies the GTM Trigger.",
  ).optional(),
  type: z.enum([
    "eventTypeUnspecified",
    "pageview",
    "domReady",
    "windowLoaded",
    "customEvent",
    "triggerGroup",
    "init",
    "consentInit",
    "serverPageview",
    "always",
    "firebaseAppException",
    "firebaseAppUpdate",
    "firebaseCampaign",
    "firebaseFirstOpen",
    "firebaseInAppPurchase",
    "firebaseNotificationDismiss",
    "firebaseNotificationForeground",
    "firebaseNotificationOpen",
    "firebaseNotificationReceive",
    "firebaseOsUpdate",
    "firebaseSessionStart",
    "firebaseUserEngagement",
    "formSubmission",
    "click",
    "linkClick",
    "jsError",
    "historyChange",
    "timer",
    "ampClick",
    "ampTimer",
    "ampScroll",
    "ampVisibility",
    "youTubeVideo",
    "scrollDepth",
    "elementVisibility",
  ]).describe("Defines the data layer event that causes this trigger.")
    .optional(),
  uniqueTriggerId: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  verticalScrollPercentageList: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  visibilitySelector: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  visiblePercentageMax: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  visiblePercentageMin: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  waitForTags: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  waitForTagsTimeout: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  autoEventFilter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    type: z.string(),
  })).optional(),
  checkValidation: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  containerId: z.string().optional(),
  continuousTimeMinMilliseconds: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  customEventFilter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    type: z.string(),
  })).optional(),
  eventName: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  filter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    type: z.string(),
  })).optional(),
  fingerprint: z.string().optional(),
  horizontalScrollPercentageList: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  interval: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  intervalSeconds: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  limit: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  maxTimerLengthSeconds: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  name: z.string(),
  notes: z.string().optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  })).optional(),
  parentFolderId: z.string().optional(),
  path: z.string().optional(),
  selector: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  tagManagerUrl: z.string().optional(),
  totalTimeMinMilliseconds: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  triggerId: z.string().optional(),
  type: z.string().optional(),
  uniqueTriggerId: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  verticalScrollPercentageList: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  visibilitySelector: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  visiblePercentageMax: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  visiblePercentageMin: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  waitForTags: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  waitForTagsTimeout: z.object({
    isWeakReference: z.boolean(),
    key: z.string(),
    list: z.array(z.string()),
    map: z.array(z.string()),
    type: z.string(),
    value: z.string(),
  }).optional(),
  workspaceId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  autoEventFilter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.unknown()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.unknown()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
        "template",
        "integer",
        "boolean",
        "list",
        "map",
        "triggerReference",
        "tagReference",
      ]).describe(
        "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
      ).optional(),
      value: z.string().describe(
        "A parameter's value (may contain variable references). as appropriate to the specified type.",
      ).optional(),
    })).describe(
      "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
    ).optional(),
    type: z.enum([
      "conditionTypeUnspecified",
      "equals",
      "contains",
      "startsWith",
      "endsWith",
      "matchRegex",
      "greater",
      "greaterOrEquals",
      "less",
      "lessOrEquals",
      "cssSelector",
      "urlMatches",
    ]).describe("The type of operator for this condition.").optional(),
  })).describe("Used in the case of auto event tracking.").optional(),
  checkValidation: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  continuousTimeMinMilliseconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  customEventFilter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.unknown()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.unknown()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
        "template",
        "integer",
        "boolean",
        "list",
        "map",
        "triggerReference",
        "tagReference",
      ]).describe(
        "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
      ).optional(),
      value: z.string().describe(
        "A parameter's value (may contain variable references). as appropriate to the specified type.",
      ).optional(),
    })).describe(
      "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
    ).optional(),
    type: z.enum([
      "conditionTypeUnspecified",
      "equals",
      "contains",
      "startsWith",
      "endsWith",
      "matchRegex",
      "greater",
      "greaterOrEquals",
      "less",
      "lessOrEquals",
      "cssSelector",
      "urlMatches",
    ]).describe("The type of operator for this condition.").optional(),
  })).describe(
    "Used in the case of custom event, which is fired iff all Conditions are true.",
  ).optional(),
  eventName: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  filter: z.array(z.object({
    parameter: z.array(z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.unknown()).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.unknown()).describe(
        "This map parameter's parameters (must have keys; keys must be unique).",
      ).optional(),
      type: z.enum([
        "typeUnspecified",
        "template",
        "integer",
        "boolean",
        "list",
        "map",
        "triggerReference",
        "tagReference",
      ]).describe(
        "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
      ).optional(),
      value: z.string().describe(
        "A parameter's value (may contain variable references). as appropriate to the specified type.",
      ).optional(),
    })).describe(
      "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
    ).optional(),
    type: z.enum([
      "conditionTypeUnspecified",
      "equals",
      "contains",
      "startsWith",
      "endsWith",
      "matchRegex",
      "greater",
      "greaterOrEquals",
      "less",
      "lessOrEquals",
      "cssSelector",
      "urlMatches",
    ]).describe("The type of operator for this condition.").optional(),
  })).describe("The trigger will only fire iff all Conditions are true.")
    .optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Trigger as computed at storage time. This value is recomputed whenever the trigger is modified.",
  ).optional(),
  horizontalScrollPercentageList: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  interval: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  intervalSeconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  limit: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  maxTimerLengthSeconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  name: z.string().describe("Trigger display name.").optional(),
  notes: z.string().describe(
    "User notes on how to apply this trigger in the container.",
  ).optional(),
  parameter: z.array(z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  })).describe("Additional parameters.").optional(),
  parentFolderId: z.string().describe("Parent folder id.").optional(),
  path: z.string().describe("GTM Trigger's API relative path.").optional(),
  selector: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  totalTimeMinMilliseconds: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  triggerId: z.string().describe(
    "The Trigger ID uniquely identifies the GTM Trigger.",
  ).optional(),
  type: z.enum([
    "eventTypeUnspecified",
    "pageview",
    "domReady",
    "windowLoaded",
    "customEvent",
    "triggerGroup",
    "init",
    "consentInit",
    "serverPageview",
    "always",
    "firebaseAppException",
    "firebaseAppUpdate",
    "firebaseCampaign",
    "firebaseFirstOpen",
    "firebaseInAppPurchase",
    "firebaseNotificationDismiss",
    "firebaseNotificationForeground",
    "firebaseNotificationOpen",
    "firebaseNotificationReceive",
    "firebaseOsUpdate",
    "firebaseSessionStart",
    "firebaseUserEngagement",
    "formSubmission",
    "click",
    "linkClick",
    "jsError",
    "historyChange",
    "timer",
    "ampClick",
    "ampTimer",
    "ampScroll",
    "ampVisibility",
    "youTubeVideo",
    "scrollDepth",
    "elementVisibility",
  ]).describe("Defines the data layer event that causes this trigger.")
    .optional(),
  uniqueTriggerId: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  verticalScrollPercentageList: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  visibilitySelector: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  visiblePercentageMax: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  visiblePercentageMin: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  waitForTags: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  waitForTagsTimeout: z.object({
    isWeakReference: z.boolean().describe(
      "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
    ).optional(),
    key: z.string().describe(
      "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
    ).optional(),
    list: z.array(z.string()).describe(
      "This list parameter's parameters (keys will be ignored).",
    ).optional(),
    map: z.array(z.string()).describe(
      "This map parameter's parameters (must have keys; keys must be unique).",
    ).optional(),
    type: z.enum([
      "typeUnspecified",
      "template",
      "integer",
      "boolean",
      "list",
      "map",
      "triggerReference",
      "tagReference",
    ]).describe(
      "The parameter type. Valid values are: - boolean: The value represents a boolean, represented as 'true' or 'false' - integer: The value represents a 64-bit signed integer value, in base 10 - list: A list of parameters should be specified - map: A map of parameters should be specified - template: The value represents any text; this can include variable references (even variable references that might return non-string types) - trigger_reference: The value represents a trigger, represented as the trigger id - tag_reference: The value represents a tag, represented as the tag name",
    ).optional(),
    value: z.string().describe(
      "A parameter's value (may contain variable references). as appropriate to the specified type.",
    ).optional(),
  }).describe("Represents a Google Tag Manager Parameter.").optional(),
  workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Workspaces.Triggers. Registered at `@swamp/gcp/tagmanager/accounts-containers-workspaces-triggers`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-workspaces-triggers",
  version: "2026.05.21.2",
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
      toVersion: "2026.04.04.1",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Google Tag Manager Trigger",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a triggers",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["autoEventFilter"] !== undefined) {
          body["autoEventFilter"] = g["autoEventFilter"];
        }
        if (g["checkValidation"] !== undefined) {
          body["checkValidation"] = g["checkValidation"];
        }
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["continuousTimeMinMilliseconds"] !== undefined) {
          body["continuousTimeMinMilliseconds"] =
            g["continuousTimeMinMilliseconds"];
        }
        if (g["customEventFilter"] !== undefined) {
          body["customEventFilter"] = g["customEventFilter"];
        }
        if (g["eventName"] !== undefined) body["eventName"] = g["eventName"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["horizontalScrollPercentageList"] !== undefined) {
          body["horizontalScrollPercentageList"] =
            g["horizontalScrollPercentageList"];
        }
        if (g["interval"] !== undefined) body["interval"] = g["interval"];
        if (g["intervalSeconds"] !== undefined) {
          body["intervalSeconds"] = g["intervalSeconds"];
        }
        if (g["limit"] !== undefined) body["limit"] = g["limit"];
        if (g["maxTimerLengthSeconds"] !== undefined) {
          body["maxTimerLengthSeconds"] = g["maxTimerLengthSeconds"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["path"] !== undefined) body["path"] = g["path"];
        if (g["selector"] !== undefined) body["selector"] = g["selector"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["totalTimeMinMilliseconds"] !== undefined) {
          body["totalTimeMinMilliseconds"] = g["totalTimeMinMilliseconds"];
        }
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["uniqueTriggerId"] !== undefined) {
          body["uniqueTriggerId"] = g["uniqueTriggerId"];
        }
        if (g["verticalScrollPercentageList"] !== undefined) {
          body["verticalScrollPercentageList"] =
            g["verticalScrollPercentageList"];
        }
        if (g["visibilitySelector"] !== undefined) {
          body["visibilitySelector"] = g["visibilitySelector"];
        }
        if (g["visiblePercentageMax"] !== undefined) {
          body["visiblePercentageMax"] = g["visiblePercentageMax"];
        }
        if (g["visiblePercentageMin"] !== undefined) {
          body["visiblePercentageMin"] = g["visiblePercentageMin"];
        }
        if (g["waitForTags"] !== undefined) {
          body["waitForTags"] = g["waitForTags"];
        }
        if (g["waitForTagsTimeout"] !== undefined) {
          body["waitForTagsTimeout"] = g["waitForTagsTimeout"];
        }
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
        }
        if (g["name"] !== undefined) params["path"] = String(g["name"]);
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
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["path"] = args.identifier;
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
      description: "Update triggers attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["path"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["autoEventFilter"] !== undefined) {
          body["autoEventFilter"] = g["autoEventFilter"];
        }
        if (g["checkValidation"] !== undefined) {
          body["checkValidation"] = g["checkValidation"];
        }
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["continuousTimeMinMilliseconds"] !== undefined) {
          body["continuousTimeMinMilliseconds"] =
            g["continuousTimeMinMilliseconds"];
        }
        if (g["customEventFilter"] !== undefined) {
          body["customEventFilter"] = g["customEventFilter"];
        }
        if (g["eventName"] !== undefined) body["eventName"] = g["eventName"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["horizontalScrollPercentageList"] !== undefined) {
          body["horizontalScrollPercentageList"] =
            g["horizontalScrollPercentageList"];
        }
        if (g["interval"] !== undefined) body["interval"] = g["interval"];
        if (g["intervalSeconds"] !== undefined) {
          body["intervalSeconds"] = g["intervalSeconds"];
        }
        if (g["limit"] !== undefined) body["limit"] = g["limit"];
        if (g["maxTimerLengthSeconds"] !== undefined) {
          body["maxTimerLengthSeconds"] = g["maxTimerLengthSeconds"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["notes"] !== undefined) body["notes"] = g["notes"];
        if (g["parameter"] !== undefined) body["parameter"] = g["parameter"];
        if (g["parentFolderId"] !== undefined) {
          body["parentFolderId"] = g["parentFolderId"];
        }
        if (g["selector"] !== undefined) body["selector"] = g["selector"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["totalTimeMinMilliseconds"] !== undefined) {
          body["totalTimeMinMilliseconds"] = g["totalTimeMinMilliseconds"];
        }
        if (g["triggerId"] !== undefined) body["triggerId"] = g["triggerId"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["uniqueTriggerId"] !== undefined) {
          body["uniqueTriggerId"] = g["uniqueTriggerId"];
        }
        if (g["verticalScrollPercentageList"] !== undefined) {
          body["verticalScrollPercentageList"] =
            g["verticalScrollPercentageList"];
        }
        if (g["visibilitySelector"] !== undefined) {
          body["visibilitySelector"] = g["visibilitySelector"];
        }
        if (g["visiblePercentageMax"] !== undefined) {
          body["visiblePercentageMax"] = g["visiblePercentageMax"];
        }
        if (g["visiblePercentageMin"] !== undefined) {
          body["visiblePercentageMin"] = g["visiblePercentageMin"];
        }
        if (g["waitForTags"] !== undefined) {
          body["waitForTags"] = g["waitForTags"];
        }
        if (g["waitForTagsTimeout"] !== undefined) {
          body["waitForTagsTimeout"] = g["waitForTagsTimeout"];
        }
        if (g["workspaceId"] !== undefined) {
          body["workspaceId"] = g["workspaceId"];
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Delete the triggers",
      arguments: z.object({
        identifier: z.string().describe("The name of the triggers"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["path"] = args.identifier;
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
      description: "Sync triggers state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["path"] = identifier;
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
    revert: {
      description: "revert",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.workspaces.triggers.revert",
            "path": "tagmanager/v2/{+path}:revert",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": {
              "fingerprint": { "location": "query" },
              "path": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
