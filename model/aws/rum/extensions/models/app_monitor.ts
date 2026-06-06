// Auto-generated extension model for @swamp/aws/rum/app-monitor
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RUM AppMonitor (AWS::RUM::AppMonitor).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const MetricDefinitionSchema = z.object({
  Name: z.string().min(1).max(255).describe(
    "The name for the metric that is defined in this structure. For extended metrics, valid values are the following: PerformanceNavigationDuration PerformanceResourceDuration NavigationSatisfiedTransaction NavigationToleratedTransaction NavigationFrustratedTransaction WebVitalsCumulativeLayoutShift WebVitalsFirstInputDelay WebVitalsLargestContentfulPaint WebVitalsInteractionToNextPaint JsErrorCount HttpErrorCount SessionCount PageViewCount Http4xxCount Http5xxCount SessionDuration PageViewCountPerSession JsErrorCountPerSession Http4xxCountPerSession Http5xxCountPerSession JsErrorCountPerPageView Http4xxCountPerPageView Http5xxCountPerPageView TimeOnPage ColdLaunchTime WarmLaunchTime CrashCount ANRCount AppHangCount ScreenLoadCount ScreenLoadTime NetworkLatency SpanPayloadSize LogEventPayloadSize",
  ),
  Namespace: z.string().min(1).max(237).regex(new RegExp("[a-zA-Z0-9-._/#:]+$"))
    .describe(
      "The namespace used by CloudWatch Metrics for the metric that is defined in this structure",
    ).optional(),
  ValueKey: z.string().min(1).max(256).regex(new RegExp(".*")).describe(
    "The field within the event object that the metric value is sourced from. If you omit this field, a hardcoded value of 1 is pushed as the metric value. This is useful if you just want to count the number of events that the filter catches. If this metric is sent to Evidently, this field will be passed to Evidently raw and Evidently will handle data extraction from the event. Note: Evidently has been discontinued.",
  ).optional(),
  UnitLabel: z.string().min(1).max(256).describe(
    "The CloudWatch metric unit to use for this metric. If you omit this field, the metric is recorded with no unit.",
  ).optional(),
  DimensionKeys: z.record(
    z.string(),
    z.string().min(1).max(255).regex(new RegExp(".*[^\\s].*")),
  ).describe(
    'Use this field only if you are sending the metric to CloudWatch. This field is a map of field paths to dimension names. It defines the dimensions to associate with this metric in CloudWatch. For extended metrics, valid values for the entries in this field are the following: "metadata.pageId": "PageId" "metadata.browserName": "BrowserName" "metadata.deviceType": "DeviceType" "metadata.osName": "OSName" "metadata.countryCode": "CountryCode" "event_details.fileType": "FileType" All dimensions listed in this field must also be included in EventPattern.',
  ).optional(),
  EventPattern: z.string().min(1).max(4000).describe(
    'The pattern that defines the metric, specified as a JSON object. RUM checks events that happen in a user\'s session against the pattern, and events that match the pattern are sent to the metric destination. When you define extended metrics, the metric definition is not valid if EventPattern is omitted. Example event patterns: \'{ "event_type": ["com.amazon.rum.js_error_event"], "metadata": { "browserName": [ "Chrome", "Safari" ], } }\' \'{ "event_type": ["com.amazon.rum.performance_navigation_event"], "metadata": { "browserName": [ "Chrome", "Firefox" ] }, "event_details": { "duration": [{ "numeric": [ "=", 2000, "<", 8000 ] }] } }\' If the metrics destination\' is CloudWatch and the event also matches a value in DimensionKeys, then the metric is published with the specified dimensions.',
  ).optional(),
});

const MetricDestinationSchema = z.object({
  Destination: z.enum(["CloudWatch", "Evidently"]).describe(
    "Defines the destination to send the metrics to. Valid values are CloudWatch and Evidently. Note: Evidently has been discontinued and is no longer supported - requests with Evidently will be rejected.",
  ),
  DestinationArn: z.string().regex(new RegExp("arn:[^:]*:[^:]*:[^:]*:[^:]*:.*"))
    .describe(
      "Evidently has been discontinued and therefore this is no longer an acceptable field. If Destination is CloudWatch, do not use this parameter. This parameter specifies the ARN of the Evidently experiment that will receive the extended metrics.",
    ).optional(),
  IamRoleArn: z.string().regex(new RegExp("arn:[^:]*:[^:]*:[^:]*:[^:]*:.*"))
    .describe(
      "Evidently has been discontinued and therefore this is no longer an acceptable field. If Destination is CloudWatch, do not use this parameter. This parameter specifies the ARN of an IAM role that RUM will assume to write to the Evidently experiment that you are sending metrics to. This role must have permission to write to that experiment.",
    ).optional(),
  MetricDefinitions: z.array(MetricDefinitionSchema).describe(
    "An array of structures which define the metrics that you want to send.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
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
  Name: z.string().min(1).max(255).regex(new RegExp("[\\.\\-_/#A-Za-z0-9]+"))
    .describe("A name for the app monitor"),
  Domain: z.string().min(1).max(253).regex(
    new RegExp(
      "^(localhost)$|^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|(?=^[a-zA-Z0-9\\.\\*-]{4,253}$)(?!.*\\.-)(?!.*-\\.)(?!.*\\.\\.)(?!.*[^\\.]{64,})^(\\*\\.)?(?![-\\.\\*])[^\\*]{1,}\\.(\\*|(?!.*--)(?=.*[a-zA-Z])[^\\*]{1,}[^\\*-])$",
    ),
  ).describe(
    "The top-level internet domain name for which your application has administrative authority. The CreateAppMonitor requires either the domain or the domain list.",
  ).optional(),
  DomainList: z.array(
    z.string().min(1).max(253).regex(
      new RegExp(
        "^(localhost)$|^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|(?=^[a-zA-Z0-9\\.\\*-]{4,253}$)(?!.*\\.-)(?!.*-\\.)(?!.*\\.\\.)(?!.*[^\\.]{64,})^(\\*\\.)?(?![-\\.\\*])[^\\*]{1,}\\.(\\*|(?!.*--)(?=.*[a-zA-Z])[^\\*]{1,}[^\\*-])$",
      ),
    ),
  ).describe(
    "The top-level internet domain names for which your application has administrative authority. The CreateAppMonitor requires either the domain or the domain list.",
  ).optional(),
  CwLogEnabled: z.boolean().describe(
    "Data collected by RUM is kept by RUM for 30 days and then deleted. This parameter specifies whether RUM sends a copy of this telemetry data to CWLlong in your account. This enables you to keep the telemetry data for more than 30 days, but it does incur CWLlong charges. If you omit this parameter, the default is false",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Assigns one or more tags (key-value pairs) to the app monitor. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values. Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.You can associate as many as 50 tags with an app monitor.",
  ).optional(),
  AppMonitorConfiguration: z.object({
    IdentityPoolId: z.string().min(1).max(55).regex(
      new RegExp("[\\w-]+:[0-9a-f-]+"),
    ).describe(
      "The ID of the identity pool that is used to authorize the sending of data to RUM.",
    ).optional(),
    ExcludedPages: z.array(
      z.string().min(1).max(1260).regex(
        new RegExp(
          "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        ),
      ),
    ).describe(
      "A list of URLs in your website or application to exclude from RUM data collection. You can't include both ExcludedPages and IncludedPages in the same operation.",
    ).optional(),
    IncludedPages: z.array(
      z.string().min(1).max(1260).regex(
        new RegExp(
          "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        ),
      ),
    ).describe(
      "If this app monitor is to collect data from only certain pages in your application, this structure lists those pages. You can't include both ExcludedPages and IncludedPages in the same operation.",
    ).optional(),
    FavoritePages: z.array(z.string()).describe(
      "A list of pages in the RUM console that are to be displayed with a favorite icon.",
    ).optional(),
    SessionSampleRate: z.number().min(0).max(1).describe(
      "Specifies the percentage of user sessions to use for RUM data collection. Choosing a higher percentage gives you more data but also incurs more costs. The number you specify is the percentage of user sessions that will be used. If you omit this parameter, the default of 10 is used.",
    ).optional(),
    GuestRoleArn: z.string().regex(new RegExp("arn:[^:]*:[^:]*:[^:]*:[^:]*:.*"))
      .describe(
        "The ARN of the guest IAM role that is attached to the identity pool that is used to authorize the sending of data to RUM.",
      ).optional(),
    AllowCookies: z.boolean().describe(
      "If you set this to true, the RUM web client sets two cookies, a session cookie and a user cookie. The cookies allow the RUM web client to collect data relating to the number of users an application has and the behavior of the application across a sequence of events. Cookies are stored in the top-level domain of the current page.",
    ).optional(),
    Telemetries: z.array(z.enum(["errors", "performance", "http"])).describe(
      "An array that lists the types of telemetry data that this app monitor is to collect.",
    ).optional(),
    EnableXRay: z.boolean().describe(
      "If you set this to true, RUM enables xray tracing for the user sessions that RUM samples. RUM adds an xray trace header to allowed HTTP requests. It also records an xray segment for allowed HTTP requests. You can see traces and segments from these user sessions in the xray console and the CW ServiceLens console.",
    ).optional(),
    MetricDestinations: z.array(MetricDestinationSchema).describe(
      "An array of structures which define the destinations and the metrics that you want to send.",
    ).optional(),
  }).describe("AppMonitor configuration").optional(),
  CustomEvents: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether AppMonitor accepts custom events.",
    ).optional(),
  }).describe("AppMonitor custom events configuration").optional(),
  ResourcePolicy: z.object({
    PolicyDocument: z.string().describe(
      "The JSON to use as the resource policy. The document can be up to 4 KB in size.",
    ),
    PolicyRevisionId: z.string().min(1).max(255).describe(
      "A string value that you can use to conditionally update your policy. You can provide the revision ID of your existing policy to make mutating requests against that policy. When you assign a policy revision ID, then later requests about that policy will be rejected with an InvalidPolicyRevisionIdException error if they don't provide the correct current revision ID.",
    ).optional(),
  }).describe(
    "A structure that defines resource policy attached to your app monitor.",
  ).optional(),
  DeobfuscationConfiguration: z.object({
    JavaScriptSourceMaps: z.object({
      Status: z.enum(["ENABLED", "DISABLED"]).describe(
        "Specifies whether JavaScript error stack traces should be unminified for this app monitor. The default is for JavaScript error stack trace unminification to be DISABLED",
      ),
      S3Uri: z.string().regex(
        new RegExp(
          "^s3://[a-z0-9][-.a-z0-9]{1,62}(?:/[-!_*'().a-z0-9A-Z]+(?:/[-!_*'().a-z0-9A-Z]+)*)?/?$",
        ),
      ).describe(
        "The S3Uri of the bucket or folder that stores the source map files. It is required if status is ENABLED.",
      ).optional(),
    }).describe(
      "A structure that contains the configuration for how an app monitor can unminify JavaScript error stack traces using source maps.",
    ).optional(),
  }).describe(
    "A structure that contains the configuration for how an app monitor can deobfuscate stack traces.",
  ).optional(),
  Platform: z.enum(["Web", "Android", "iOS"]).optional(),
});

const StateSchema = z.object({
  Id: z.string().optional(),
  Name: z.string(),
  Domain: z.string().optional(),
  DomainList: z.array(z.string()).optional(),
  CwLogEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  AppMonitorConfiguration: z.object({
    IdentityPoolId: z.string(),
    ExcludedPages: z.array(z.string()),
    IncludedPages: z.array(z.string()),
    FavoritePages: z.array(z.string()),
    SessionSampleRate: z.number(),
    GuestRoleArn: z.string(),
    AllowCookies: z.boolean(),
    Telemetries: z.array(z.string()),
    EnableXRay: z.boolean(),
    MetricDestinations: z.array(MetricDestinationSchema),
  }).optional(),
  CustomEvents: z.object({
    Status: z.string(),
  }).optional(),
  ResourcePolicy: z.object({
    PolicyDocument: z.string(),
    PolicyRevisionId: z.string(),
  }).optional(),
  DeobfuscationConfiguration: z.object({
    JavaScriptSourceMaps: z.object({
      Status: z.string(),
      S3Uri: z.string(),
    }),
  }).optional(),
  Platform: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(255).regex(new RegExp("[\\.\\-_/#A-Za-z0-9]+"))
    .describe("A name for the app monitor").optional(),
  Domain: z.string().min(1).max(253).regex(
    new RegExp(
      "^(localhost)$|^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|(?=^[a-zA-Z0-9\\.\\*-]{4,253}$)(?!.*\\.-)(?!.*-\\.)(?!.*\\.\\.)(?!.*[^\\.]{64,})^(\\*\\.)?(?![-\\.\\*])[^\\*]{1,}\\.(\\*|(?!.*--)(?=.*[a-zA-Z])[^\\*]{1,}[^\\*-])$",
    ),
  ).describe(
    "The top-level internet domain name for which your application has administrative authority. The CreateAppMonitor requires either the domain or the domain list.",
  ).optional(),
  DomainList: z.array(
    z.string().min(1).max(253).regex(
      new RegExp(
        "^(localhost)$|^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|(?=^[a-zA-Z0-9\\.\\*-]{4,253}$)(?!.*\\.-)(?!.*-\\.)(?!.*\\.\\.)(?!.*[^\\.]{64,})^(\\*\\.)?(?![-\\.\\*])[^\\*]{1,}\\.(\\*|(?!.*--)(?=.*[a-zA-Z])[^\\*]{1,}[^\\*-])$",
      ),
    ),
  ).describe(
    "The top-level internet domain names for which your application has administrative authority. The CreateAppMonitor requires either the domain or the domain list.",
  ).optional(),
  CwLogEnabled: z.boolean().describe(
    "Data collected by RUM is kept by RUM for 30 days and then deleted. This parameter specifies whether RUM sends a copy of this telemetry data to CWLlong in your account. This enables you to keep the telemetry data for more than 30 days, but it does incur CWLlong charges. If you omit this parameter, the default is false",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Assigns one or more tags (key-value pairs) to the app monitor. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values. Tags don't have any semantic meaning to AWS and are interpreted strictly as strings of characters.You can associate as many as 50 tags with an app monitor.",
  ).optional(),
  AppMonitorConfiguration: z.object({
    IdentityPoolId: z.string().min(1).max(55).regex(
      new RegExp("[\\w-]+:[0-9a-f-]+"),
    ).describe(
      "The ID of the identity pool that is used to authorize the sending of data to RUM.",
    ).optional(),
    ExcludedPages: z.array(
      z.string().min(1).max(1260).regex(
        new RegExp(
          "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        ),
      ),
    ).describe(
      "A list of URLs in your website or application to exclude from RUM data collection. You can't include both ExcludedPages and IncludedPages in the same operation.",
    ).optional(),
    IncludedPages: z.array(
      z.string().min(1).max(1260).regex(
        new RegExp(
          "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
        ),
      ),
    ).describe(
      "If this app monitor is to collect data from only certain pages in your application, this structure lists those pages. You can't include both ExcludedPages and IncludedPages in the same operation.",
    ).optional(),
    FavoritePages: z.array(z.string()).describe(
      "A list of pages in the RUM console that are to be displayed with a favorite icon.",
    ).optional(),
    SessionSampleRate: z.number().min(0).max(1).describe(
      "Specifies the percentage of user sessions to use for RUM data collection. Choosing a higher percentage gives you more data but also incurs more costs. The number you specify is the percentage of user sessions that will be used. If you omit this parameter, the default of 10 is used.",
    ).optional(),
    GuestRoleArn: z.string().regex(new RegExp("arn:[^:]*:[^:]*:[^:]*:[^:]*:.*"))
      .describe(
        "The ARN of the guest IAM role that is attached to the identity pool that is used to authorize the sending of data to RUM.",
      ).optional(),
    AllowCookies: z.boolean().describe(
      "If you set this to true, the RUM web client sets two cookies, a session cookie and a user cookie. The cookies allow the RUM web client to collect data relating to the number of users an application has and the behavior of the application across a sequence of events. Cookies are stored in the top-level domain of the current page.",
    ).optional(),
    Telemetries: z.array(z.enum(["errors", "performance", "http"])).describe(
      "An array that lists the types of telemetry data that this app monitor is to collect.",
    ).optional(),
    EnableXRay: z.boolean().describe(
      "If you set this to true, RUM enables xray tracing for the user sessions that RUM samples. RUM adds an xray trace header to allowed HTTP requests. It also records an xray segment for allowed HTTP requests. You can see traces and segments from these user sessions in the xray console and the CW ServiceLens console.",
    ).optional(),
    MetricDestinations: z.array(MetricDestinationSchema).describe(
      "An array of structures which define the destinations and the metrics that you want to send.",
    ).optional(),
  }).describe("AppMonitor configuration").optional(),
  CustomEvents: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).describe(
      "Indicates whether AppMonitor accepts custom events.",
    ).optional(),
  }).describe("AppMonitor custom events configuration").optional(),
  ResourcePolicy: z.object({
    PolicyDocument: z.string().describe(
      "The JSON to use as the resource policy. The document can be up to 4 KB in size.",
    ).optional(),
    PolicyRevisionId: z.string().min(1).max(255).describe(
      "A string value that you can use to conditionally update your policy. You can provide the revision ID of your existing policy to make mutating requests against that policy. When you assign a policy revision ID, then later requests about that policy will be rejected with an InvalidPolicyRevisionIdException error if they don't provide the correct current revision ID.",
    ).optional(),
  }).describe(
    "A structure that defines resource policy attached to your app monitor.",
  ).optional(),
  DeobfuscationConfiguration: z.object({
    JavaScriptSourceMaps: z.object({
      Status: z.enum(["ENABLED", "DISABLED"]).describe(
        "Specifies whether JavaScript error stack traces should be unminified for this app monitor. The default is for JavaScript error stack trace unminification to be DISABLED",
      ).optional(),
      S3Uri: z.string().regex(
        new RegExp(
          "^s3://[a-z0-9][-.a-z0-9]{1,62}(?:/[-!_*'().a-z0-9A-Z]+(?:/[-!_*'().a-z0-9A-Z]+)*)?/?$",
        ),
      ).describe(
        "The S3Uri of the bucket or folder that stores the source map files. It is required if status is ENABLED.",
      ).optional(),
    }).describe(
      "A structure that contains the configuration for how an app monitor can unminify JavaScript error stack traces using source maps.",
    ).optional(),
  }).describe(
    "A structure that contains the configuration for how an app monitor can deobfuscate stack traces.",
  ).optional(),
  Platform: z.enum(["Web", "Android", "iOS"]).optional(),
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

/** Swamp extension model for RUM AppMonitor. Registered at `@swamp/aws/rum/app-monitor`. */
export const model = {
  type: "@swamp/aws/rum/app-monitor",
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
      description: "RUM AppMonitor resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RUM AppMonitor",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RUM::AppMonitor",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a RUM AppMonitor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RUM AppMonitor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::RUM::AppMonitor",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a RUM AppMonitor",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::RUM::AppMonitor",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RUM::AppMonitor",
          identifier,
          currentState,
          desiredState,
          ["Name", "Platform"],
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
      description: "Delete a RUM AppMonitor",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RUM AppMonitor",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::RUM::AppMonitor",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync RUM AppMonitor state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::RUM::AppMonitor",
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
