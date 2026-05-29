// Auto-generated extension model for @swamp/gcp/tagmanager/accounts-containers-versions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Versions.
 *
 * Represents a Google Tag Manager Container Version.
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
  "id": "tagmanager.accounts.containers.versions.get",
  "path": "tagmanager/v2/{+path}",
  "httpMethod": "GET",
  "parameterOrder": [
    "path",
  ],
  "parameters": {
    "containerVersionId": {
      "location": "query",
    },
    "path": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "tagmanager.accounts.containers.versions.update",
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
  "id": "tagmanager.accounts.containers.versions.delete",
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

const GlobalArgsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  builtInVariable: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    name: z.string().describe(
      "Name of the built-in variable to be used to refer to the built-in variable.",
    ).optional(),
    path: z.string().describe("GTM BuiltInVariable's API relative path.")
      .optional(),
    type: z.enum([
      "builtInVariableTypeUnspecified",
      "pageUrl",
      "pageHostname",
      "pagePath",
      "referrer",
      "event",
      "clickElement",
      "clickClasses",
      "clickId",
      "clickTarget",
      "clickUrl",
      "clickText",
      "firstPartyServingUrl",
      "formElement",
      "formClasses",
      "formId",
      "formTarget",
      "formUrl",
      "formText",
      "errorMessage",
      "errorUrl",
      "errorLine",
      "newHistoryUrl",
      "oldHistoryUrl",
      "newHistoryFragment",
      "oldHistoryFragment",
      "newHistoryState",
      "oldHistoryState",
      "historySource",
      "containerVersion",
      "debugMode",
      "randomNumber",
      "containerId",
      "appId",
      "appName",
      "appVersionCode",
      "appVersionName",
      "language",
      "osVersion",
      "platform",
      "sdkVersion",
      "deviceName",
      "resolution",
      "advertiserId",
      "advertisingTrackingEnabled",
      "htmlId",
      "environmentName",
      "ampBrowserLanguage",
      "ampCanonicalPath",
      "ampCanonicalUrl",
      "ampCanonicalHost",
      "ampReferrer",
      "ampTitle",
      "ampClientId",
      "ampClientTimezone",
      "ampClientTimestamp",
      "ampClientScreenWidth",
      "ampClientScreenHeight",
      "ampClientScrollX",
      "ampClientScrollY",
      "ampClientMaxScrollX",
      "ampClientMaxScrollY",
      "ampTotalEngagedTime",
      "ampPageViewId",
      "ampPageLoadTime",
      "ampPageDownloadTime",
      "ampGtmEvent",
      "eventName",
      "firebaseEventParameterCampaign",
      "firebaseEventParameterCampaignAclid",
      "firebaseEventParameterCampaignAnid",
      "firebaseEventParameterCampaignClickTimestamp",
      "firebaseEventParameterCampaignContent",
      "firebaseEventParameterCampaignCp1",
      "firebaseEventParameterCampaignGclid",
      "firebaseEventParameterCampaignSource",
      "firebaseEventParameterCampaignTerm",
      "firebaseEventParameterCurrency",
      "firebaseEventParameterDynamicLinkAcceptTime",
      "firebaseEventParameterDynamicLinkLinkid",
      "firebaseEventParameterNotificationMessageDeviceTime",
      "firebaseEventParameterNotificationMessageId",
      "firebaseEventParameterNotificationMessageName",
      "firebaseEventParameterNotificationMessageTime",
      "firebaseEventParameterNotificationTopic",
      "firebaseEventParameterPreviousAppVersion",
      "firebaseEventParameterPreviousOsVersion",
      "firebaseEventParameterPrice",
      "firebaseEventParameterProductId",
      "firebaseEventParameterQuantity",
      "firebaseEventParameterValue",
      "videoProvider",
      "videoUrl",
      "videoTitle",
      "videoDuration",
      "videoPercent",
      "videoVisible",
      "videoStatus",
      "videoCurrentTime",
      "scrollDepthThreshold",
      "scrollDepthUnits",
      "scrollDepthDirection",
      "elementVisibilityRatio",
      "elementVisibilityTime",
      "elementVisibilityFirstTime",
      "elementVisibilityRecentTime",
      "requestPath",
      "requestMethod",
      "clientName",
      "queryString",
      "serverPageLocationUrl",
      "serverPageLocationPath",
      "serverPageLocationHostname",
      "visitorRegion",
      "analyticsClientId",
      "analyticsSessionId",
      "analyticsSessionNumber",
    ]).describe("Type of built-in variable.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The built-in variables in the container that this version was taken from.",
  ).optional(),
  client: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    clientId: z.string().describe(
      "The Client ID uniquely identifies the GTM client.",
    ).optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Client as computed at storage time. This value is recomputed whenever the client is modified.",
    ).optional(),
    name: z.string().describe("Client display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this tag in the container.",
    ).optional(),
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
    })).describe("The client's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM client's API relative path.").optional(),
    priority: z.number().int().describe(
      "Priority determines relative firing order.",
    ).optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    type: z.string().describe("Client type.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe("The clients in the container that this version was taken from.")
    .optional(),
  container: z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe(
      "The Container ID uniquely identifies the GTM Container.",
    ).optional(),
    domainName: z.array(z.string()).describe(
      "List of domain names associated with the Container.",
    ).optional(),
    features: z.object({
      supportBuiltInVariables: z.boolean().describe(
        "Whether this Container supports built-in variables",
      ).optional(),
      supportClients: z.boolean().describe(
        "Whether this Container supports clients.",
      ).optional(),
      supportEnvironments: z.boolean().describe(
        "Whether this Container supports environments.",
      ).optional(),
      supportFolders: z.boolean().describe(
        "Whether this Container supports folders.",
      ).optional(),
      supportGtagConfigs: z.boolean().describe(
        "Whether this Container supports Google tag config.",
      ).optional(),
      supportTags: z.boolean().describe("Whether this Container supports tags.")
        .optional(),
      supportTemplates: z.boolean().describe(
        "Whether this Container supports templates.",
      ).optional(),
      supportTransformations: z.boolean().describe(
        "Whether this Container supports transformations.",
      ).optional(),
      supportTriggers: z.boolean().describe(
        "Whether this Container supports triggers.",
      ).optional(),
      supportUserPermissions: z.boolean().describe(
        "Whether this Container supports user permissions managed by GTM.",
      ).optional(),
      supportVariables: z.boolean().describe(
        "Whether this Container supports variables.",
      ).optional(),
      supportVersions: z.boolean().describe(
        "Whether this Container supports Container versions.",
      ).optional(),
      supportWorkspaces: z.boolean().describe(
        "Whether this Container supports workspaces.",
      ).optional(),
      supportZones: z.boolean().describe(
        "Whether this Container supports zones.",
      ).optional(),
    }).optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified.",
    ).optional(),
    name: z.string().describe("Container display name.").optional(),
    notes: z.string().describe("Container Notes.").optional(),
    path: z.string().describe("GTM Container's API relative path.").optional(),
    publicId: z.string().describe("Container Public ID.").optional(),
    tagIds: z.array(z.string()).describe(
      "All Tag IDs that refer to this Container.",
    ).optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    taggingServerUrls: z.array(z.string()).describe(
      "List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match.",
    ).optional(),
    usageContext: z.array(
      z.enum([
        "usageContextUnspecified",
        "web",
        "android",
        "ios",
        "androidSdk5",
        "iosSdk5",
        "amp",
        "server",
      ]),
    ).describe(
      "List of Usage Contexts for the Container. Valid values include: web, android, or ios.",
    ).optional(),
  }).describe(
    "Represents a Google Tag Manager Container, which specifies the platform tags will run on, manages workspaces, and retains container versions.",
  ).optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  containerVersionId: z.string().describe(
    "The Container Version ID uniquely identifies the GTM Container Version.",
  ).optional(),
  customTemplate: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Custom Template as computed at storage time. This value is recomputed whenever the template is modified.",
    ).optional(),
    galleryReference: z.object({
      galleryTemplateId: z.string().describe(
        "ID for the gallery template that is generated once during first sync and travels with the template redirects.",
      ).optional(),
      host: z.string().describe(
        "The name of the host for the community gallery template.",
      ).optional(),
      isModified: z.boolean().describe(
        "If a user has manually edited the community gallery template.",
      ).optional(),
      owner: z.string().describe(
        "The name of the owner for the community gallery template.",
      ).optional(),
      repository: z.string().describe(
        "The name of the repository for the community gallery template.",
      ).optional(),
      signature: z.string().describe(
        "The signature of the community gallery template as computed at import time. This value is recomputed whenever the template is updated from the gallery.",
      ).optional(),
      templateDeveloperId: z.string().describe(
        "The developer id of the community gallery template. This value is set whenever the template is created from the gallery.",
      ).optional(),
      version: z.string().describe(
        "The version of the community gallery template.",
      ).optional(),
    }).describe(
      "Represents the link between a custom template and an entry on the Community Template Gallery site.",
    ).optional(),
    name: z.string().describe("Custom Template display name.").optional(),
    path: z.string().describe("GTM Custom Template's API relative path.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    templateData: z.string().describe("The custom template in text format.")
      .optional(),
    templateId: z.string().describe(
      "The Custom Template ID uniquely identifies the GTM custom template.",
    ).optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The custom templates in the container that this version was taken from.",
  ).optional(),
  deleted: z.boolean().describe(
    "A value of true indicates this container version has been deleted.",
  ).optional(),
  description: z.string().describe("Container version description.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Container Version as computed at storage time. This value is recomputed whenever the container version is modified.",
  ).optional(),
  folder: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Folder as computed at storage time. This value is recomputed whenever the folder is modified.",
    ).optional(),
    folderId: z.string().describe(
      "The Folder ID uniquely identifies the GTM Folder.",
    ).optional(),
    name: z.string().describe("Folder display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this folder in the container.",
    ).optional(),
    path: z.string().describe("GTM Folder's API relative path.").optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe("The folders in the container that this version was taken from.")
    .optional(),
  gtagConfig: z.array(z.object({
    accountId: z.string().describe("Google tag account ID.").optional(),
    containerId: z.string().describe("Google tag container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the Google tag config as computed at storage time. This value is recomputed whenever the config is modified.",
    ).optional(),
    gtagConfigId: z.string().describe(
      "The ID uniquely identifies the Google tag config.",
    ).optional(),
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
    })).describe("The Google tag config's parameters.").optional(),
    path: z.string().describe("Google tag config's API relative path.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    type: z.string().describe("Google tag config type.").optional(),
    workspaceId: z.string().describe(
      "Google tag workspace ID. Only used by GTM containers. Set to 0 otherwise.",
    ).optional(),
  })).describe(
    "The Google tag configs in the container that this version was taken from.",
  ).optional(),
  name: z.string().describe("Container version display name.").optional(),
  path: z.string().describe("GTM Container Version's API relative path.")
    .optional(),
  tag: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    blockingTriggerId: z.array(z.string()).describe(
      "Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire.",
    ).optional(),
    consentSettings: z.object({
      consentStatus: z.enum(["notSet", "notNeeded", "needed"]).describe(
        "The tag's consent status. If set to NEEDED, the runtime will check that the consent types specified by the consent_type field have been granted.",
      ).optional(),
      consentType: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
    }).optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Tag as computed at storage time. This value is recomputed whenever the tag is modified.",
    ).optional(),
    firingTriggerId: z.array(z.string()).describe(
      "Firing trigger IDs. A tag will fire when any of the listed triggers are true and all of its blockingTriggerIds (if any specified) are false.",
    ).optional(),
    liveOnly: z.boolean().describe(
      "If set to true, this tag will only fire in the live environment (e.g. not in preview or debug mode).",
    ).optional(),
    monitoringMetadata: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
    monitoringMetadataTagNameKey: z.string().describe(
      "If non-empty, then the tag display name will be included in the monitoring metadata map using the key specified.",
    ).optional(),
    name: z.string().describe("Tag display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this tag in the container.",
    ).optional(),
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
    })).describe("The tag's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM Tag's API relative path.").optional(),
    paused: z.boolean().describe(
      "Indicates whether the tag is paused, which prevents the tag from firing.",
    ).optional(),
    priority: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
    scheduleEndMs: z.string().describe(
      "The end timestamp in milliseconds to schedule a tag.",
    ).optional(),
    scheduleStartMs: z.string().describe(
      "The start timestamp in milliseconds to schedule a tag.",
    ).optional(),
    setupTag: z.array(z.object({
      stopOnSetupFailure: z.boolean().describe(
        "If true, fire the main tag if and only if the setup tag fires successfully. If false, fire the main tag regardless of setup tag firing status.",
      ).optional(),
      tagName: z.string().describe("The name of the setup tag.").optional(),
    })).describe("The list of setup tags. Currently we only allow one.")
      .optional(),
    tagFiringOption: z.enum([
      "tagFiringOptionUnspecified",
      "unlimited",
      "oncePerEvent",
      "oncePerLoad",
    ]).describe("Option to fire this tag.").optional(),
    tagId: z.string().describe("The Tag ID uniquely identifies the GTM Tag.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    teardownTag: z.array(z.object({
      stopTeardownOnFailure: z.boolean().describe(
        "If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status.",
      ).optional(),
      tagName: z.string().describe("The name of the teardown tag.").optional(),
    })).describe("The list of teardown tags. Currently we only allow one.")
      .optional(),
    type: z.string().describe("GTM Tag Type.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe("The tags in the container that this version was taken from.")
    .optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  transformation: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Transformation as computed at storage time. This value is recomputed whenever the transformation is modified.",
    ).optional(),
    name: z.string().describe("Transformation display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this transformation in the container.",
    ).optional(),
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
    })).describe("The transformation's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM transformation's API relative path.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    transformationId: z.string().describe(
      "The Transformation ID uniquely identifies the GTM transformation.",
    ).optional(),
    type: z.string().describe("Transformation type.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The transformations in the container that this version was taken from.",
  ).optional(),
  trigger: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    autoEventFilter: z.array(z.object({
      parameter: z.array(z.unknown()).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      parameter: z.array(z.unknown()).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      parameter: z.array(z.unknown()).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
  })).describe(
    "The triggers in the container that this version was taken from.",
  ).optional(),
  variable: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    disablingTriggerId: z.array(z.string()).describe(
      "For mobile containers only: A list of trigger IDs for disabling conditional variables; the variable is enabled if one of the enabling trigger is true while all the disabling trigger are false. Treated as an unordered set.",
    ).optional(),
    enablingTriggerId: z.array(z.string()).describe(
      "For mobile containers only: A list of trigger IDs for enabling conditional variables; the variable is enabled if one of the enabling triggers is true while all the disabling triggers are false. Treated as an unordered set.",
    ).optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Variable as computed at storage time. This value is recomputed whenever the variable is modified.",
    ).optional(),
    formatValue: z.object({
      caseConversionType: z.enum(["none", "lowercase", "uppercase"]).describe(
        "The option to convert a string-type variable value to either lowercase or uppercase.",
      ).optional(),
      convertFalseToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
      convertNullToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
      convertToBoolean: z.boolean().describe(
        "The option to convert a variable value to a boolean.",
      ).optional(),
      convertToNumber: z.enum([
        "decimalSeparatorTypeUnspecified",
        "period",
        "comma",
        "automatic",
      ]).describe("The option to convert a variable value to a number.")
        .optional(),
      convertTrueToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
      convertUndefinedToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
    }).optional(),
    name: z.string().describe("Variable display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this variable in the container.",
    ).optional(),
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
    })).describe("The variable's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM Variable's API relative path.").optional(),
    scheduleEndMs: z.string().describe(
      "The end timestamp in milliseconds to schedule a variable.",
    ).optional(),
    scheduleStartMs: z.string().describe(
      "The start timestamp in milliseconds to schedule a variable.",
    ).optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    type: z.string().describe("GTM Variable Type.").optional(),
    variableId: z.string().describe(
      "The Variable ID uniquely identifies the GTM Variable.",
    ).optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The variables in the container that this version was taken from.",
  ).optional(),
  zone: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    boundary: z.object({
      condition: z.array(z.object({
        parameter: z.unknown().describe(
          "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
        ).optional(),
        type: z.unknown().describe("The type of operator for this condition.")
          .optional(),
      })).describe("The conditions that, when conjoined, make up the boundary.")
        .optional(),
      customEvaluationTriggerId: z.array(z.string()).describe(
        "Custom evaluation trigger IDs. A zone will evaluate its boundary conditions when any of the listed triggers are true.",
      ).optional(),
    }).describe("Represents a Zone's boundaries.").optional(),
    childContainer: z.array(z.object({
      nickname: z.string().describe(
        "The zone's nickname for the child container.",
      ).optional(),
      publicId: z.string().describe("The child container's public id.")
        .optional(),
    })).describe("Containers that are children of this Zone.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Zone as computed at storage time. This value is recomputed whenever the zone is modified.",
    ).optional(),
    name: z.string().describe("Zone display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this zone in the container.",
    ).optional(),
    path: z.string().describe("GTM Zone's API relative path.").optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    typeRestriction: z.object({
      enable: z.boolean().describe(
        "True if type restrictions have been enabled for this Zone.",
      ).optional(),
      whitelistedTypeId: z.array(z.string()).describe(
        "List of type public ids that have been whitelisted for use in this Zone.",
      ).optional(),
    }).describe("Represents a Zone's type restrictions.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
    zoneId: z.string().describe("The Zone ID uniquely identifies the GTM Zone.")
      .optional(),
  })).describe("The zones in the container that this version was taken from.")
    .optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  builtInVariable: z.array(z.object({
    accountId: z.string(),
    containerId: z.string(),
    name: z.string(),
    path: z.string(),
    type: z.string(),
    workspaceId: z.string(),
  })).optional(),
  client: z.array(z.object({
    accountId: z.string(),
    clientId: z.string(),
    containerId: z.string(),
    fingerprint: z.string(),
    name: z.string(),
    notes: z.string(),
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    parentFolderId: z.string(),
    path: z.string(),
    priority: z.number(),
    tagManagerUrl: z.string(),
    type: z.string(),
    workspaceId: z.string(),
  })).optional(),
  container: z.object({
    accountId: z.string(),
    containerId: z.string(),
    domainName: z.array(z.string()),
    features: z.object({
      supportBuiltInVariables: z.boolean(),
      supportClients: z.boolean(),
      supportEnvironments: z.boolean(),
      supportFolders: z.boolean(),
      supportGtagConfigs: z.boolean(),
      supportTags: z.boolean(),
      supportTemplates: z.boolean(),
      supportTransformations: z.boolean(),
      supportTriggers: z.boolean(),
      supportUserPermissions: z.boolean(),
      supportVariables: z.boolean(),
      supportVersions: z.boolean(),
      supportWorkspaces: z.boolean(),
      supportZones: z.boolean(),
    }),
    fingerprint: z.string(),
    name: z.string(),
    notes: z.string(),
    path: z.string(),
    publicId: z.string(),
    tagIds: z.array(z.string()),
    tagManagerUrl: z.string(),
    taggingServerUrls: z.array(z.string()),
    usageContext: z.array(z.string()),
  }).optional(),
  containerId: z.string().optional(),
  containerVersionId: z.string().optional(),
  customTemplate: z.array(z.object({
    accountId: z.string(),
    containerId: z.string(),
    fingerprint: z.string(),
    galleryReference: z.object({
      galleryTemplateId: z.string(),
      host: z.string(),
      isModified: z.boolean(),
      owner: z.string(),
      repository: z.string(),
      signature: z.string(),
      templateDeveloperId: z.string(),
      version: z.string(),
    }),
    name: z.string(),
    path: z.string(),
    tagManagerUrl: z.string(),
    templateData: z.string(),
    templateId: z.string(),
    workspaceId: z.string(),
  })).optional(),
  deleted: z.boolean().optional(),
  description: z.string().optional(),
  fingerprint: z.string().optional(),
  folder: z.array(z.object({
    accountId: z.string(),
    containerId: z.string(),
    fingerprint: z.string(),
    folderId: z.string(),
    name: z.string(),
    notes: z.string(),
    path: z.string(),
    tagManagerUrl: z.string(),
    workspaceId: z.string(),
  })).optional(),
  gtagConfig: z.array(z.object({
    accountId: z.string(),
    containerId: z.string(),
    fingerprint: z.string(),
    gtagConfigId: z.string(),
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    path: z.string(),
    tagManagerUrl: z.string(),
    type: z.string(),
    workspaceId: z.string(),
  })).optional(),
  name: z.string(),
  path: z.string().optional(),
  tag: z.array(z.object({
    accountId: z.string(),
    blockingTriggerId: z.array(z.string()),
    consentSettings: z.object({
      consentStatus: z.string(),
      consentType: z.object({
        isWeakReference: z.boolean(),
        key: z.string(),
        list: z.array(z.unknown()),
        map: z.array(z.unknown()),
        type: z.string(),
        value: z.string(),
      }),
    }),
    containerId: z.string(),
    fingerprint: z.string(),
    firingTriggerId: z.array(z.string()),
    liveOnly: z.boolean(),
    monitoringMetadata: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    monitoringMetadataTagNameKey: z.string(),
    name: z.string(),
    notes: z.string(),
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    parentFolderId: z.string(),
    path: z.string(),
    paused: z.boolean(),
    priority: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    scheduleEndMs: z.string(),
    scheduleStartMs: z.string(),
    setupTag: z.array(z.object({
      stopOnSetupFailure: z.boolean(),
      tagName: z.string(),
    })),
    tagFiringOption: z.string(),
    tagId: z.string(),
    tagManagerUrl: z.string(),
    teardownTag: z.array(z.object({
      stopTeardownOnFailure: z.boolean(),
      tagName: z.string(),
    })),
    type: z.string(),
    workspaceId: z.string(),
  })).optional(),
  tagManagerUrl: z.string().optional(),
  transformation: z.array(z.object({
    accountId: z.string(),
    containerId: z.string(),
    fingerprint: z.string(),
    name: z.string(),
    notes: z.string(),
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    parentFolderId: z.string(),
    path: z.string(),
    tagManagerUrl: z.string(),
    transformationId: z.string(),
    type: z.string(),
    workspaceId: z.string(),
  })).optional(),
  trigger: z.array(z.object({
    accountId: z.string(),
    autoEventFilter: z.array(z.object({
      parameter: z.array(z.unknown()),
      type: z.string(),
    })),
    checkValidation: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    containerId: z.string(),
    continuousTimeMinMilliseconds: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    customEventFilter: z.array(z.object({
      parameter: z.array(z.unknown()),
      type: z.string(),
    })),
    eventName: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    filter: z.array(z.object({
      parameter: z.array(z.unknown()),
      type: z.string(),
    })),
    fingerprint: z.string(),
    horizontalScrollPercentageList: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    interval: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    intervalSeconds: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    limit: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    maxTimerLengthSeconds: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    name: z.string(),
    notes: z.string(),
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    parentFolderId: z.string(),
    path: z.string(),
    selector: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    tagManagerUrl: z.string(),
    totalTimeMinMilliseconds: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    triggerId: z.string(),
    type: z.string(),
    uniqueTriggerId: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    verticalScrollPercentageList: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    visibilitySelector: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    visiblePercentageMax: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    visiblePercentageMin: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    waitForTags: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    waitForTagsTimeout: z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.record(z.string(), z.unknown())),
      map: z.array(z.record(z.string(), z.unknown())),
      type: z.string(),
      value: z.string(),
    }),
    workspaceId: z.string(),
  })).optional(),
  variable: z.array(z.object({
    accountId: z.string(),
    containerId: z.string(),
    disablingTriggerId: z.array(z.string()),
    enablingTriggerId: z.array(z.string()),
    fingerprint: z.string(),
    formatValue: z.object({
      caseConversionType: z.string(),
      convertFalseToValue: z.object({
        isWeakReference: z.boolean(),
        key: z.string(),
        list: z.array(z.unknown()),
        map: z.array(z.unknown()),
        type: z.string(),
        value: z.string(),
      }),
      convertNullToValue: z.object({
        isWeakReference: z.boolean(),
        key: z.string(),
        list: z.array(z.unknown()),
        map: z.array(z.unknown()),
        type: z.string(),
        value: z.string(),
      }),
      convertToBoolean: z.boolean(),
      convertToNumber: z.string(),
      convertTrueToValue: z.object({
        isWeakReference: z.boolean(),
        key: z.string(),
        list: z.array(z.unknown()),
        map: z.array(z.unknown()),
        type: z.string(),
        value: z.string(),
      }),
      convertUndefinedToValue: z.object({
        isWeakReference: z.boolean(),
        key: z.string(),
        list: z.array(z.unknown()),
        map: z.array(z.unknown()),
        type: z.string(),
        value: z.string(),
      }),
    }),
    name: z.string(),
    notes: z.string(),
    parameter: z.array(z.object({
      isWeakReference: z.boolean(),
      key: z.string(),
      list: z.array(z.unknown()),
      map: z.array(z.unknown()),
      type: z.string(),
      value: z.string(),
    })),
    parentFolderId: z.string(),
    path: z.string(),
    scheduleEndMs: z.string(),
    scheduleStartMs: z.string(),
    tagManagerUrl: z.string(),
    type: z.string(),
    variableId: z.string(),
    workspaceId: z.string(),
  })).optional(),
  zone: z.array(z.object({
    accountId: z.string(),
    boundary: z.object({
      condition: z.array(z.object({
        parameter: z.unknown(),
        type: z.unknown(),
      })),
      customEvaluationTriggerId: z.array(z.string()),
    }),
    childContainer: z.array(z.object({
      nickname: z.string(),
      publicId: z.string(),
    })),
    containerId: z.string(),
    fingerprint: z.string(),
    name: z.string(),
    notes: z.string(),
    path: z.string(),
    tagManagerUrl: z.string(),
    typeRestriction: z.object({
      enable: z.boolean(),
      whitelistedTypeId: z.array(z.string()),
    }),
    workspaceId: z.string(),
    zoneId: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe("GTM Account ID.").optional(),
  builtInVariable: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    name: z.string().describe(
      "Name of the built-in variable to be used to refer to the built-in variable.",
    ).optional(),
    path: z.string().describe("GTM BuiltInVariable's API relative path.")
      .optional(),
    type: z.enum([
      "builtInVariableTypeUnspecified",
      "pageUrl",
      "pageHostname",
      "pagePath",
      "referrer",
      "event",
      "clickElement",
      "clickClasses",
      "clickId",
      "clickTarget",
      "clickUrl",
      "clickText",
      "firstPartyServingUrl",
      "formElement",
      "formClasses",
      "formId",
      "formTarget",
      "formUrl",
      "formText",
      "errorMessage",
      "errorUrl",
      "errorLine",
      "newHistoryUrl",
      "oldHistoryUrl",
      "newHistoryFragment",
      "oldHistoryFragment",
      "newHistoryState",
      "oldHistoryState",
      "historySource",
      "containerVersion",
      "debugMode",
      "randomNumber",
      "containerId",
      "appId",
      "appName",
      "appVersionCode",
      "appVersionName",
      "language",
      "osVersion",
      "platform",
      "sdkVersion",
      "deviceName",
      "resolution",
      "advertiserId",
      "advertisingTrackingEnabled",
      "htmlId",
      "environmentName",
      "ampBrowserLanguage",
      "ampCanonicalPath",
      "ampCanonicalUrl",
      "ampCanonicalHost",
      "ampReferrer",
      "ampTitle",
      "ampClientId",
      "ampClientTimezone",
      "ampClientTimestamp",
      "ampClientScreenWidth",
      "ampClientScreenHeight",
      "ampClientScrollX",
      "ampClientScrollY",
      "ampClientMaxScrollX",
      "ampClientMaxScrollY",
      "ampTotalEngagedTime",
      "ampPageViewId",
      "ampPageLoadTime",
      "ampPageDownloadTime",
      "ampGtmEvent",
      "eventName",
      "firebaseEventParameterCampaign",
      "firebaseEventParameterCampaignAclid",
      "firebaseEventParameterCampaignAnid",
      "firebaseEventParameterCampaignClickTimestamp",
      "firebaseEventParameterCampaignContent",
      "firebaseEventParameterCampaignCp1",
      "firebaseEventParameterCampaignGclid",
      "firebaseEventParameterCampaignSource",
      "firebaseEventParameterCampaignTerm",
      "firebaseEventParameterCurrency",
      "firebaseEventParameterDynamicLinkAcceptTime",
      "firebaseEventParameterDynamicLinkLinkid",
      "firebaseEventParameterNotificationMessageDeviceTime",
      "firebaseEventParameterNotificationMessageId",
      "firebaseEventParameterNotificationMessageName",
      "firebaseEventParameterNotificationMessageTime",
      "firebaseEventParameterNotificationTopic",
      "firebaseEventParameterPreviousAppVersion",
      "firebaseEventParameterPreviousOsVersion",
      "firebaseEventParameterPrice",
      "firebaseEventParameterProductId",
      "firebaseEventParameterQuantity",
      "firebaseEventParameterValue",
      "videoProvider",
      "videoUrl",
      "videoTitle",
      "videoDuration",
      "videoPercent",
      "videoVisible",
      "videoStatus",
      "videoCurrentTime",
      "scrollDepthThreshold",
      "scrollDepthUnits",
      "scrollDepthDirection",
      "elementVisibilityRatio",
      "elementVisibilityTime",
      "elementVisibilityFirstTime",
      "elementVisibilityRecentTime",
      "requestPath",
      "requestMethod",
      "clientName",
      "queryString",
      "serverPageLocationUrl",
      "serverPageLocationPath",
      "serverPageLocationHostname",
      "visitorRegion",
      "analyticsClientId",
      "analyticsSessionId",
      "analyticsSessionNumber",
    ]).describe("Type of built-in variable.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The built-in variables in the container that this version was taken from.",
  ).optional(),
  client: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    clientId: z.string().describe(
      "The Client ID uniquely identifies the GTM client.",
    ).optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Client as computed at storage time. This value is recomputed whenever the client is modified.",
    ).optional(),
    name: z.string().describe("Client display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this tag in the container.",
    ).optional(),
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
    })).describe("The client's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM client's API relative path.").optional(),
    priority: z.number().int().describe(
      "Priority determines relative firing order.",
    ).optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    type: z.string().describe("Client type.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe("The clients in the container that this version was taken from.")
    .optional(),
  container: z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe(
      "The Container ID uniquely identifies the GTM Container.",
    ).optional(),
    domainName: z.array(z.string()).describe(
      "List of domain names associated with the Container.",
    ).optional(),
    features: z.object({
      supportBuiltInVariables: z.boolean().describe(
        "Whether this Container supports built-in variables",
      ).optional(),
      supportClients: z.boolean().describe(
        "Whether this Container supports clients.",
      ).optional(),
      supportEnvironments: z.boolean().describe(
        "Whether this Container supports environments.",
      ).optional(),
      supportFolders: z.boolean().describe(
        "Whether this Container supports folders.",
      ).optional(),
      supportGtagConfigs: z.boolean().describe(
        "Whether this Container supports Google tag config.",
      ).optional(),
      supportTags: z.boolean().describe("Whether this Container supports tags.")
        .optional(),
      supportTemplates: z.boolean().describe(
        "Whether this Container supports templates.",
      ).optional(),
      supportTransformations: z.boolean().describe(
        "Whether this Container supports transformations.",
      ).optional(),
      supportTriggers: z.boolean().describe(
        "Whether this Container supports triggers.",
      ).optional(),
      supportUserPermissions: z.boolean().describe(
        "Whether this Container supports user permissions managed by GTM.",
      ).optional(),
      supportVariables: z.boolean().describe(
        "Whether this Container supports variables.",
      ).optional(),
      supportVersions: z.boolean().describe(
        "Whether this Container supports Container versions.",
      ).optional(),
      supportWorkspaces: z.boolean().describe(
        "Whether this Container supports workspaces.",
      ).optional(),
      supportZones: z.boolean().describe(
        "Whether this Container supports zones.",
      ).optional(),
    }).optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Container as computed at storage time. This value is recomputed whenever the account is modified.",
    ).optional(),
    name: z.string().describe("Container display name.").optional(),
    notes: z.string().describe("Container Notes.").optional(),
    path: z.string().describe("GTM Container's API relative path.").optional(),
    publicId: z.string().describe("Container Public ID.").optional(),
    tagIds: z.array(z.string()).describe(
      "All Tag IDs that refer to this Container.",
    ).optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    taggingServerUrls: z.array(z.string()).describe(
      "List of server-side container URLs for the Container. If multiple URLs are provided, all URL paths must match.",
    ).optional(),
    usageContext: z.array(
      z.enum([
        "usageContextUnspecified",
        "web",
        "android",
        "ios",
        "androidSdk5",
        "iosSdk5",
        "amp",
        "server",
      ]),
    ).describe(
      "List of Usage Contexts for the Container. Valid values include: web, android, or ios.",
    ).optional(),
  }).describe(
    "Represents a Google Tag Manager Container, which specifies the platform tags will run on, manages workspaces, and retains container versions.",
  ).optional(),
  containerId: z.string().describe("GTM Container ID.").optional(),
  containerVersionId: z.string().describe(
    "The Container Version ID uniquely identifies the GTM Container Version.",
  ).optional(),
  customTemplate: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Custom Template as computed at storage time. This value is recomputed whenever the template is modified.",
    ).optional(),
    galleryReference: z.object({
      galleryTemplateId: z.string().describe(
        "ID for the gallery template that is generated once during first sync and travels with the template redirects.",
      ).optional(),
      host: z.string().describe(
        "The name of the host for the community gallery template.",
      ).optional(),
      isModified: z.boolean().describe(
        "If a user has manually edited the community gallery template.",
      ).optional(),
      owner: z.string().describe(
        "The name of the owner for the community gallery template.",
      ).optional(),
      repository: z.string().describe(
        "The name of the repository for the community gallery template.",
      ).optional(),
      signature: z.string().describe(
        "The signature of the community gallery template as computed at import time. This value is recomputed whenever the template is updated from the gallery.",
      ).optional(),
      templateDeveloperId: z.string().describe(
        "The developer id of the community gallery template. This value is set whenever the template is created from the gallery.",
      ).optional(),
      version: z.string().describe(
        "The version of the community gallery template.",
      ).optional(),
    }).describe(
      "Represents the link between a custom template and an entry on the Community Template Gallery site.",
    ).optional(),
    name: z.string().describe("Custom Template display name.").optional(),
    path: z.string().describe("GTM Custom Template's API relative path.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    templateData: z.string().describe("The custom template in text format.")
      .optional(),
    templateId: z.string().describe(
      "The Custom Template ID uniquely identifies the GTM custom template.",
    ).optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The custom templates in the container that this version was taken from.",
  ).optional(),
  deleted: z.boolean().describe(
    "A value of true indicates this container version has been deleted.",
  ).optional(),
  description: z.string().describe("Container version description.").optional(),
  fingerprint: z.string().describe(
    "The fingerprint of the GTM Container Version as computed at storage time. This value is recomputed whenever the container version is modified.",
  ).optional(),
  folder: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Folder as computed at storage time. This value is recomputed whenever the folder is modified.",
    ).optional(),
    folderId: z.string().describe(
      "The Folder ID uniquely identifies the GTM Folder.",
    ).optional(),
    name: z.string().describe("Folder display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this folder in the container.",
    ).optional(),
    path: z.string().describe("GTM Folder's API relative path.").optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe("The folders in the container that this version was taken from.")
    .optional(),
  gtagConfig: z.array(z.object({
    accountId: z.string().describe("Google tag account ID.").optional(),
    containerId: z.string().describe("Google tag container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the Google tag config as computed at storage time. This value is recomputed whenever the config is modified.",
    ).optional(),
    gtagConfigId: z.string().describe(
      "The ID uniquely identifies the Google tag config.",
    ).optional(),
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
    })).describe("The Google tag config's parameters.").optional(),
    path: z.string().describe("Google tag config's API relative path.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    type: z.string().describe("Google tag config type.").optional(),
    workspaceId: z.string().describe(
      "Google tag workspace ID. Only used by GTM containers. Set to 0 otherwise.",
    ).optional(),
  })).describe(
    "The Google tag configs in the container that this version was taken from.",
  ).optional(),
  name: z.string().describe("Container version display name.").optional(),
  path: z.string().describe("GTM Container Version's API relative path.")
    .optional(),
  tag: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    blockingTriggerId: z.array(z.string()).describe(
      "Blocking trigger IDs. If any of the listed triggers evaluate to true, the tag will not fire.",
    ).optional(),
    consentSettings: z.object({
      consentStatus: z.enum(["notSet", "notNeeded", "needed"]).describe(
        "The tag's consent status. If set to NEEDED, the runtime will check that the consent types specified by the consent_type field have been granted.",
      ).optional(),
      consentType: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
    }).optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Tag as computed at storage time. This value is recomputed whenever the tag is modified.",
    ).optional(),
    firingTriggerId: z.array(z.string()).describe(
      "Firing trigger IDs. A tag will fire when any of the listed triggers are true and all of its blockingTriggerIds (if any specified) are false.",
    ).optional(),
    liveOnly: z.boolean().describe(
      "If set to true, this tag will only fire in the live environment (e.g. not in preview or debug mode).",
    ).optional(),
    monitoringMetadata: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
    monitoringMetadataTagNameKey: z.string().describe(
      "If non-empty, then the tag display name will be included in the monitoring metadata map using the key specified.",
    ).optional(),
    name: z.string().describe("Tag display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this tag in the container.",
    ).optional(),
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
    })).describe("The tag's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM Tag's API relative path.").optional(),
    paused: z.boolean().describe(
      "Indicates whether the tag is paused, which prevents the tag from firing.",
    ).optional(),
    priority: z.object({
      isWeakReference: z.boolean().describe(
        "Whether or not a reference type parameter is strongly or weakly referenced. Only used by Transformations.",
      ).optional(),
      key: z.string().describe(
        "The named key that uniquely identifies a parameter. Required for top-level parameters, as well as map values. Ignored for list values.",
      ).optional(),
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
    scheduleEndMs: z.string().describe(
      "The end timestamp in milliseconds to schedule a tag.",
    ).optional(),
    scheduleStartMs: z.string().describe(
      "The start timestamp in milliseconds to schedule a tag.",
    ).optional(),
    setupTag: z.array(z.object({
      stopOnSetupFailure: z.boolean().describe(
        "If true, fire the main tag if and only if the setup tag fires successfully. If false, fire the main tag regardless of setup tag firing status.",
      ).optional(),
      tagName: z.string().describe("The name of the setup tag.").optional(),
    })).describe("The list of setup tags. Currently we only allow one.")
      .optional(),
    tagFiringOption: z.enum([
      "tagFiringOptionUnspecified",
      "unlimited",
      "oncePerEvent",
      "oncePerLoad",
    ]).describe("Option to fire this tag.").optional(),
    tagId: z.string().describe("The Tag ID uniquely identifies the GTM Tag.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    teardownTag: z.array(z.object({
      stopTeardownOnFailure: z.boolean().describe(
        "If true, fire the teardown tag if and only if the main tag fires successfully. If false, fire the teardown tag regardless of main tag firing status.",
      ).optional(),
      tagName: z.string().describe("The name of the teardown tag.").optional(),
    })).describe("The list of teardown tags. Currently we only allow one.")
      .optional(),
    type: z.string().describe("GTM Tag Type.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe("The tags in the container that this version was taken from.")
    .optional(),
  tagManagerUrl: z.string().describe(
    "Auto generated link to the tag manager UI",
  ).optional(),
  transformation: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Transformation as computed at storage time. This value is recomputed whenever the transformation is modified.",
    ).optional(),
    name: z.string().describe("Transformation display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this transformation in the container.",
    ).optional(),
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
    })).describe("The transformation's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM transformation's API relative path.")
      .optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    transformationId: z.string().describe(
      "The Transformation ID uniquely identifies the GTM transformation.",
    ).optional(),
    type: z.string().describe("Transformation type.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The transformations in the container that this version was taken from.",
  ).optional(),
  trigger: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    autoEventFilter: z.array(z.object({
      parameter: z.array(z.unknown()).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      parameter: z.array(z.unknown()).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      parameter: z.array(z.unknown()).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
      list: z.array(z.record(z.string(), z.unknown())).describe(
        "This list parameter's parameters (keys will be ignored).",
      ).optional(),
      map: z.array(z.record(z.string(), z.unknown())).describe(
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
  })).describe(
    "The triggers in the container that this version was taken from.",
  ).optional(),
  variable: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    disablingTriggerId: z.array(z.string()).describe(
      "For mobile containers only: A list of trigger IDs for disabling conditional variables; the variable is enabled if one of the enabling trigger is true while all the disabling trigger are false. Treated as an unordered set.",
    ).optional(),
    enablingTriggerId: z.array(z.string()).describe(
      "For mobile containers only: A list of trigger IDs for enabling conditional variables; the variable is enabled if one of the enabling triggers is true while all the disabling triggers are false. Treated as an unordered set.",
    ).optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Variable as computed at storage time. This value is recomputed whenever the variable is modified.",
    ).optional(),
    formatValue: z.object({
      caseConversionType: z.enum(["none", "lowercase", "uppercase"]).describe(
        "The option to convert a string-type variable value to either lowercase or uppercase.",
      ).optional(),
      convertFalseToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
      convertNullToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
      convertToBoolean: z.boolean().describe(
        "The option to convert a variable value to a boolean.",
      ).optional(),
      convertToNumber: z.enum([
        "decimalSeparatorTypeUnspecified",
        "period",
        "comma",
        "automatic",
      ]).describe("The option to convert a variable value to a number.")
        .optional(),
      convertTrueToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
      convertUndefinedToValue: z.object({
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
      }).describe("Represents a Google Tag Manager Parameter.").optional(),
    }).optional(),
    name: z.string().describe("Variable display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this variable in the container.",
    ).optional(),
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
    })).describe("The variable's parameters.").optional(),
    parentFolderId: z.string().describe("Parent folder id.").optional(),
    path: z.string().describe("GTM Variable's API relative path.").optional(),
    scheduleEndMs: z.string().describe(
      "The end timestamp in milliseconds to schedule a variable.",
    ).optional(),
    scheduleStartMs: z.string().describe(
      "The start timestamp in milliseconds to schedule a variable.",
    ).optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    type: z.string().describe("GTM Variable Type.").optional(),
    variableId: z.string().describe(
      "The Variable ID uniquely identifies the GTM Variable.",
    ).optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
  })).describe(
    "The variables in the container that this version was taken from.",
  ).optional(),
  zone: z.array(z.object({
    accountId: z.string().describe("GTM Account ID.").optional(),
    boundary: z.object({
      condition: z.array(z.object({
        parameter: z.unknown().describe(
          "A list of named parameters (key/value), depending on the condition's type. Notes: - For binary operators, include parameters named arg0 and arg1 for specifying the left and right operands, respectively. - At this time, the left operand (arg0) must be a reference to a variable. - For case-insensitive Regex matching, include a boolean parameter named ignore_case that is set to true. If not specified or set to any other value, the matching will be case sensitive. - To negate an operator, include a boolean parameter named negate boolean parameter that is set to true.",
        ).optional(),
        type: z.unknown().describe("The type of operator for this condition.")
          .optional(),
      })).describe("The conditions that, when conjoined, make up the boundary.")
        .optional(),
      customEvaluationTriggerId: z.array(z.string()).describe(
        "Custom evaluation trigger IDs. A zone will evaluate its boundary conditions when any of the listed triggers are true.",
      ).optional(),
    }).describe("Represents a Zone's boundaries.").optional(),
    childContainer: z.array(z.object({
      nickname: z.string().describe(
        "The zone's nickname for the child container.",
      ).optional(),
      publicId: z.string().describe("The child container's public id.")
        .optional(),
    })).describe("Containers that are children of this Zone.").optional(),
    containerId: z.string().describe("GTM Container ID.").optional(),
    fingerprint: z.string().describe(
      "The fingerprint of the GTM Zone as computed at storage time. This value is recomputed whenever the zone is modified.",
    ).optional(),
    name: z.string().describe("Zone display name.").optional(),
    notes: z.string().describe(
      "User notes on how to apply this zone in the container.",
    ).optional(),
    path: z.string().describe("GTM Zone's API relative path.").optional(),
    tagManagerUrl: z.string().describe(
      "Auto generated link to the tag manager UI",
    ).optional(),
    typeRestriction: z.object({
      enable: z.boolean().describe(
        "True if type restrictions have been enabled for this Zone.",
      ).optional(),
      whitelistedTypeId: z.array(z.string()).describe(
        "List of type public ids that have been whitelisted for use in this Zone.",
      ).optional(),
    }).describe("Represents a Zone's type restrictions.").optional(),
    workspaceId: z.string().describe("GTM Workspace ID.").optional(),
    zoneId: z.string().describe("The Zone ID uniquely identifies the GTM Zone.")
      .optional(),
  })).describe("The zones in the container that this version was taken from.")
    .optional(),
});

/** Swamp extension model for Google Cloud Tag Manager Accounts.Containers.Versions. Registered at `@swamp/gcp/tagmanager/accounts-containers-versions`. */
export const model = {
  type: "@swamp/gcp/tagmanager/accounts-containers-versions",
  version: "2026.05.29.1",
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
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a Google Tag Manager Container Version.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Update versions attributes",
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
        if (g["builtInVariable"] !== undefined) {
          body["builtInVariable"] = g["builtInVariable"];
        }
        if (g["client"] !== undefined) body["client"] = g["client"];
        if (g["container"] !== undefined) body["container"] = g["container"];
        if (g["containerId"] !== undefined) {
          body["containerId"] = g["containerId"];
        }
        if (g["containerVersionId"] !== undefined) {
          body["containerVersionId"] = g["containerVersionId"];
        }
        if (g["customTemplate"] !== undefined) {
          body["customTemplate"] = g["customTemplate"];
        }
        if (g["deleted"] !== undefined) body["deleted"] = g["deleted"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["folder"] !== undefined) body["folder"] = g["folder"];
        if (g["gtagConfig"] !== undefined) body["gtagConfig"] = g["gtagConfig"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["tag"] !== undefined) body["tag"] = g["tag"];
        if (g["tagManagerUrl"] !== undefined) {
          body["tagManagerUrl"] = g["tagManagerUrl"];
        }
        if (g["transformation"] !== undefined) {
          body["transformation"] = g["transformation"];
        }
        if (g["trigger"] !== undefined) body["trigger"] = g["trigger"];
        if (g["variable"] !== undefined) body["variable"] = g["variable"];
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
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
      description: "Delete the versions",
      arguments: z.object({
        identifier: z.string().describe("The name of the versions"),
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
      description: "Sync versions state from GCP",
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
    live: {
      description: "live",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.versions.live",
            "path": "tagmanager/v2/{+parent}/versions:live",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    publish: {
      description: "publish",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.versions.publish",
            "path": "tagmanager/v2/{+path}:publish",
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
    set_latest: {
      description: "set_latest",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.versions.set_latest",
            "path": "tagmanager/v2/{+path}:set_latest",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": { "path": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    undelete: {
      description: "undelete",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["path"] !== undefined) params["path"] = String(g["path"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "tagmanager.accounts.containers.versions.undelete",
            "path": "tagmanager/v2/{+path}:undelete",
            "httpMethod": "POST",
            "parameterOrder": ["path"],
            "parameters": { "path": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
