// Auto-generated extension model for @swamp/gcp/toolresults/histories-executions-steps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tool Results Histories.Executions.Steps.
 *
 * A Step represents a single operation performed as part of Execution. A step can be used to represent the execution of a tool ( for example a test runner execution or an execution of a compiler). Steps can overlap (for instance two steps might have the same start time if some operations are done in parallel). Here is an example, let's consider that we have a continuous build is executing a test runner for each iteration. The workflow would look like: - user creates a Execution with id 1 - user creates a TestExecutionStep with id 100 for Execution 1 - user update TestExecutionStep with id 100 to add a raw xml log + the service parses the xml logs and returns a TestExecutionStep with updated TestResult(s). - user update the status of TestExecutionStep with id 100 to COMPLETE A Step can be updated until its state is set to COMPLETE at which points it becomes immutable.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://toolresults.googleapis.com/";

const GET_CONFIG = {
  "id": "toolresults.projects.histories.executions.steps.get",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "stepId",
  ],
  "parameters": {
    "executionId": {
      "location": "path",
      "required": true,
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "stepId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "toolresults.projects.histories.executions.steps.create",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
  ],
  "parameters": {
    "executionId": {
      "location": "path",
      "required": true,
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "toolresults.projects.histories.executions.steps.patch",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "projectId",
    "historyId",
    "executionId",
    "stepId",
  ],
  "parameters": {
    "executionId": {
      "location": "path",
      "required": true,
    },
    "historyId": {
      "location": "path",
      "required": true,
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "stepId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  completionTime: z.object({
    nanos: z.number().int().describe(
      "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
    ).optional(),
  }).describe(
    'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
  ).optional(),
  creationTime: z.object({
    nanos: z.number().int().describe(
      "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
    ).optional(),
  }).describe(
    'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
  ).optional(),
  description: z.string().describe(
    "A description of this tool For example: mvn clean package -D skipTests=true - In response: present if set by create/update request - In create/update request: optional",
  ).optional(),
  deviceUsageDuration: z.object({
    nanos: z.number().int().describe(
      "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
  ).optional(),
  dimensionValue: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
  })).describe(
    "If the execution containing this step has any dimension_definition set, then this field allows the child to specify the values of the dimensions. The keys must exactly match the dimension_definition of the execution. For example, if the execution has `dimension_definition = ['attempt', 'device']` then a step must define values for those dimensions, eg. `dimension_value = ['attempt': '1', 'device': 'Nexus 6']` If a step does not participate in one dimension of the matrix, the value for that dimension should be empty string. For example, if one of the tests is executed by a runner which does not support retries, the step could have `dimension_value = ['attempt': '', 'device': 'Nexus 6']` If the step does not participate in any dimensions of the matrix, it may leave dimension_value unset. A PRECONDITION_FAILED will be returned if any of the keys do not exist in the dimension_definition of the execution. A PRECONDITION_FAILED will be returned if another step in this execution already has the same name and dimension_value, but differs on other data fields, for example, step field is different. A PRECONDITION_FAILED will be returned if dimension_value is set, and there is a dimension_definition in the execution which is not specified as one of the keys. - In response: present if set by create - In create request: optional - In update request: never set",
  ).optional(),
  hasImages: z.boolean().describe(
    "Whether any of the outputs of this step are images whose thumbnails can be fetched with ListThumbnails. - In response: always set - In create/update request: never set",
  ).optional(),
  labels: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
  })).describe(
    "Arbitrary user-supplied key/value pairs that are associated with the step. Users are responsible for managing the key namespace such that keys don't accidentally collide. An INVALID_ARGUMENT will be returned if the number of labels exceeds 100 or if the length of any of the keys or values exceeds 100 characters. - In response: always set - In create request: optional - In update request: optional; any new key/value pair will be added to the map, and any new value for an existing key will update that key's value",
  ).optional(),
  multiStep: z.object({
    multistepNumber: z.number().int().describe(
      "Unique int given to each step. Ranges from 0(inclusive) to total number of steps(exclusive). The primary step is 0.",
    ).optional(),
    primaryStep: z.object({
      individualOutcome: z.array(z.object({
        multistepNumber: z.number().int().describe(
          "Unique int given to each step. Ranges from 0(inclusive) to total number of steps(exclusive). The primary step is 0.",
        ).optional(),
        outcomeSummary: z.enum([
          "unset",
          "success",
          "failure",
          "inconclusive",
          "skipped",
          "flaky",
        ]).optional(),
        runDuration: z.object({
          nanos: z.unknown().describe(
            "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
        ).optional(),
        stepId: z.string().optional(),
      })).describe("Step Id and outcome of each individual step.").optional(),
      rollUp: z.enum([
        "unset",
        "success",
        "failure",
        "inconclusive",
        "skipped",
        "flaky",
      ]).describe(
        "Rollup test status of multiple steps that were run with the same configuration as a group.",
      ).optional(),
    }).describe(
      "Stores rollup test status of multiple steps that were run as a group and outcome of each individual step.",
    ).optional(),
    primaryStepId: z.string().describe(
      "Step Id of the primary (original) step, which might be this step.",
    ).optional(),
  }).describe(
    "Details when multiple steps are run with the same configuration as a group.",
  ).optional(),
  name: z.string().describe(
    "A short human-readable name to display in the UI. Maximum of 100 characters. For example: Clean build A PRECONDITION_FAILED will be returned upon creating a new step if it shares its name and dimension_value with an existing step. If two steps represent a similar action, but have different dimension values, they should share the same name. For instance, if the same set of tests is run on two different platforms, the two steps should have the same name. - In response: always set - In create request: always set - In update request: never set",
  ).optional(),
  outcome: z.object({
    failureDetail: z.object({
      crashed: z.boolean().describe(
        "If the failure was severe because the system (app) under test crashed.",
      ).optional(),
      deviceOutOfMemory: z.boolean().describe(
        "If the device ran out of memory during a test, causing the test to crash.",
      ).optional(),
      failedRoboscript: z.boolean().describe(
        "If the Roboscript failed to complete successfully, e.g., because a Roboscript action or assertion failed or a Roboscript action could not be matched during the entire crawl.",
      ).optional(),
      notInstalled: z.boolean().describe(
        "If an app is not installed and thus no test can be run with the app. This might be caused by trying to run a test on an unsupported platform.",
      ).optional(),
      otherNativeCrash: z.boolean().describe(
        "If a native process (including any other than the app) crashed.",
      ).optional(),
      timedOut: z.boolean().describe(
        "If the test overran some time limit, and that is why it failed.",
      ).optional(),
      unableToCrawl: z.boolean().describe(
        "If the robo was unable to crawl the app; perhaps because the app did not start.",
      ).optional(),
    }).describe("Details for an outcome with a FAILURE outcome summary.")
      .optional(),
    inconclusiveDetail: z.object({
      abortedByUser: z.boolean().describe(
        "If the end user aborted the test execution before a pass or fail could be determined. For example, the user pressed ctrl-c which sent a kill signal to the test runner while the test was running.",
      ).optional(),
      hasErrorLogs: z.boolean().describe(
        "If results are being provided to the user in certain cases of infrastructure failures",
      ).optional(),
      infrastructureFailure: z.boolean().describe(
        "If the test runner could not determine success or failure because the test depends on a component other than the system under test which failed. For example, a mobile test requires provisioning a device where the test executes, and that provisioning can fail.",
      ).optional(),
    }).describe("Details for an outcome with an INCONCLUSIVE outcome summary.")
      .optional(),
    skippedDetail: z.object({
      incompatibleAppVersion: z.boolean().describe(
        "If the App doesn't support the specific API level.",
      ).optional(),
      incompatibleArchitecture: z.boolean().describe(
        "If the App doesn't run on the specific architecture, for example, x86.",
      ).optional(),
      incompatibleDevice: z.boolean().describe(
        "If the requested OS version doesn't run on the specific device model.",
      ).optional(),
      pendingTimeout: z.boolean().describe(
        "Indicates that the test could not be scheduled in the requested time because no suitable device was available.",
      ).optional(),
    }).describe("Details for an outcome with a SKIPPED outcome summary.")
      .optional(),
    successDetail: z.object({
      otherNativeCrash: z.boolean().describe(
        "If a native process other than the app crashed.",
      ).optional(),
    }).describe(
      "Details for an outcome with a SUCCESS outcome summary. LINT.IfChange",
    ).optional(),
    summary: z.enum([
      "unset",
      "success",
      "failure",
      "inconclusive",
      "skipped",
      "flaky",
    ]).describe("The simplest way to interpret a result. Required").optional(),
  }).describe("Interprets a result so that humans and machines can act on it.")
    .optional(),
  runDuration: z.object({
    nanos: z.number().int().describe(
      "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
  ).optional(),
  state: z.enum(["unknownState", "pending", "inProgress", "complete"]).describe(
    "The initial state is IN_PROGRESS. The only legal state transitions are * IN_PROGRESS -> COMPLETE A PRECONDITION_FAILED will be returned if an invalid transition is requested. It is valid to create Step with a state set to COMPLETE. The state can only be set to COMPLETE once. A PRECONDITION_FAILED will be returned if the state is set to COMPLETE multiple times. - In response: always set - In create/update request: optional",
  ).optional(),
  stepId: z.string().describe(
    "A unique identifier within a Execution for this Step. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response: always set - In create/update request: never set",
  ).optional(),
  testExecutionStep: z.object({
    testIssues: z.array(z.object({
      category: z.enum(["unspecifiedCategory", "common", "robo"]).describe(
        "Category of issue. Required.",
      ).optional(),
      errorMessage: z.string().describe(
        "A brief human-readable message describing the issue. Required.",
      ).optional(),
      severity: z.enum([
        "unspecifiedSeverity",
        "info",
        "suggestion",
        "warning",
        "severe",
      ]).describe("Severity of issue. Required.").optional(),
      stackTrace: z.object({
        exception: z.string().describe("The stack trace message. Required")
          .optional(),
      }).describe("A stacktrace.").optional(),
      type: z.enum([
        "unspecifiedType",
        "fatalException",
        "nativeCrash",
        "anr",
        "unusedRoboDirective",
        "compatibleWithOrchestrator",
        "launcherActivityNotFound",
        "startActivityNotFound",
        "incompleteRoboScriptExecution",
        "completeRoboScriptExecution",
        "failedToInstall",
        "availableDeepLinks",
        "nonSdkApiUsageViolation",
        "nonSdkApiUsageReport",
        "encounteredNonAndroidUiWidgetScreen",
        "encounteredLoginScreen",
        "performedGoogleLogin",
        "iosException",
        "iosCrash",
        "performedMonkeyActions",
        "usedRoboDirective",
        "usedRoboIgnoreDirective",
        "insufficientCoverage",
        "inAppPurchases",
        "crashDialogError",
        "uiElementsTooDeep",
        "blankScreen",
        "overlappingUiElements",
        "unityException",
        "deviceOutOfMemory",
        "logcatCollectionError",
        "detectedAppSplashScreen",
        "assetIssue",
      ]).describe("Type of issue. Required.").optional(),
      warning_migration: z.object({
        typeUrl: z.string().describe(
          'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `path/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). In practice, teams usually precompile into the binary all types that they expect it to use in the context of Any. However, for URLs which use the scheme `http`, `https`, or no scheme, one can optionally set up a type server that maps type URLs to message definitions as follows: * If no scheme is provided, `https` is assumed. * An HTTP GET on the URL must yield a google.protobuf.Type value in binary format, or produce an error. * Applications are allowed to cache lookup results based on the URL, or have them precompiled into a binary to avoid any lookup. Therefore, binary compatibility needs to be preserved on changes to types. (Use versioned type names to manage breaking changes.) Note: this functionality is not currently available in the official protobuf release, and it is not used for type URLs beginning with type.googleapis.com. Schemes other than `http`, `https` (or the empty scheme) might be used with implementation specific semantics.',
        ).optional(),
        value: z.string().describe(
          "Must be a valid serialized protocol buffer of the above specified type.",
        ).optional(),
      }).describe(
        '`Any` contains an arbitrary serialized protocol buffer message along with a URL that describes the type of the serialized message. Protobuf library provides support to pack/unpack Any values in the form of utility functions or additional generated methods of the Any type. Example 1: Pack and unpack a message in C++. Foo foo =...; Any any; any.PackFrom(foo);... if (any.UnpackTo(&foo)) {... } Example 2: Pack and unpack a message in Java. Foo foo =...; Any any = Any.pack(foo);... if (any.is(Foo.class)) { foo = any.unpack(Foo.class); } Example 3: Pack and unpack a message in Python. foo = Foo(...) any = Any() any.Pack(foo)... if any.Is(Foo.DESCRIPTOR): any.Unpack(foo)... Example 4: Pack and unpack a message in Go foo:= &pb.Foo{...} any, err:= ptypes.MarshalAny(foo)... foo:= &pb.Foo{} if err:= ptypes.UnmarshalAny(any, foo); err!= nil {... } The pack methods provided by protobuf library will by default use \'type.googleapis.com/full.type.name\' as the type URL and the unpack methods only use the fully qualified type name after the last \'/\' in the type URL, for example "foo.bar.com/x/y.z" will yield type name "y.z". # JSON The JSON representation of an `Any` value uses the regular representation of the deserialized, embedded message, with an additional field `@type` which contains the type URL. Example: package google.profile; message Person { string first_name = 1; string last_name = 2; } { "@type": "type.googleapis.com/google.profile.Person", "firstName":, "lastName": } If the embedded message type is well-known and has a custom JSON representation, that representation will be embedded adding a field `value` which holds the custom JSON in addition to the `@type` field. Example (for message google.protobuf.Duration): { "@type": "type.googleapis.com/google.protobuf.Duration", "value": "1.212s" }',
      ).optional(),
    })).describe(
      "Issues observed during the test execution. For example, if the mobile app under test crashed during the test, the error message and the stack trace content can be recorded here to assist debugging. - In response: present if set by create or update - In create/update request: optional",
    ).optional(),
    testSuiteOverviews: z.array(z.object({
      elapsedTime: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
      errorCount: z.number().int().describe(
        "Number of test cases in error, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never",
      ).optional(),
      failureCount: z.number().int().describe(
        "Number of failed test cases, typically set by the service by parsing the xml_source. May also be set by the user. - In create/response: always set - In update request: never",
      ).optional(),
      flakyCount: z.number().int().describe(
        "Number of flaky test cases, set by the service by rolling up flaky test attempts. Present only for rollup test suite overview at environment level. A step cannot have flaky test cases.",
      ).optional(),
      name: z.string().describe(
        "The name of the test suite. - In create/response: always set - In update request: never",
      ).optional(),
      skippedCount: z.number().int().describe(
        "Number of test cases not run, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never",
      ).optional(),
      totalCount: z.number().int().describe(
        "Number of test cases, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never",
      ).optional(),
      xmlSource: z.object({
        fileUri: z.string().describe(
          "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
        ).optional(),
      }).describe("A reference to a file.").optional(),
    })).describe(
      "List of test suite overview contents. This could be parsed from xUnit XML log by server, or uploaded directly by user. This references should only be called when test suites are fully parsed or uploaded. The maximum allowed number of test suite overviews per step is 1000. - In response: always set - In create request: optional - In update request: never (use publishXunitXmlFiles custom method instead)",
    ).optional(),
    testTiming: z.object({
      testProcessDuration: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
    }).describe("Testing timing break down to know phases.").optional(),
    toolExecution: z.object({
      commandLineArguments: z.array(z.string()).describe(
        "The full tokenized command line including the program name (equivalent to argv in a C program). - In response: present if set by create request - In create request: optional - In update request: never set",
      ).optional(),
      exitCode: z.object({
        number: z.number().int().describe(
          "Tool execution exit code. A value of 0 means that the execution was successful. - In response: always set - In create/update request: always set",
        ).optional(),
      }).describe("Exit code from a tool execution.").optional(),
      toolLogs: z.array(z.object({
        fileUri: z.string().describe(
          "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
        ).optional(),
      })).describe(
        "References to any plain text logs output the tool execution. This field can be set before the tool has exited in order to be able to have access to a live view of the logs while the tool is running. The maximum allowed number of tool logs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
      toolOutputs: z.array(z.object({
        creationTime: z.object({
          nanos: z.unknown().describe(
            "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
          ).optional(),
        }).describe(
          'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
        ).optional(),
        output: z.object({
          fileUri: z.unknown().describe(
            "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
          ).optional(),
        }).describe("A reference to a file.").optional(),
        testCase: z.object({
          className: z.unknown().describe("The name of the class.").optional(),
          name: z.unknown().describe("The name of the test case. Required.")
            .optional(),
          testSuiteName: z.unknown().describe(
            "The name of the test suite to which this test case belongs.",
          ).optional(),
        }).describe(
          "A reference to a test case. Test case references are canonically ordered lexicographically by these three factors: * First, by test_suite_name. * Second, by class_name. * Third, by name.",
        ).optional(),
      })).describe(
        "References to opaque files of any format output by the tool execution. The maximum allowed number of tool outputs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
    }).describe(
      "An execution of an arbitrary tool. It could be a test runner or a tool copying artifacts or deploying code.",
    ).optional(),
  }).describe(
    "A step that represents running tests. It accepts ant-junit xml files which will be parsed into structured test results by the service. Xml file paths are updated in order to append more files, however they can't be deleted. Users can also add test results manually by using the test_result field.",
  ).optional(),
  toolExecutionStep: z.object({
    toolExecution: z.object({
      commandLineArguments: z.array(z.string()).describe(
        "The full tokenized command line including the program name (equivalent to argv in a C program). - In response: present if set by create request - In create request: optional - In update request: never set",
      ).optional(),
      exitCode: z.object({
        number: z.number().int().describe(
          "Tool execution exit code. A value of 0 means that the execution was successful. - In response: always set - In create/update request: always set",
        ).optional(),
      }).describe("Exit code from a tool execution.").optional(),
      toolLogs: z.array(z.object({
        fileUri: z.string().describe(
          "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
        ).optional(),
      })).describe(
        "References to any plain text logs output the tool execution. This field can be set before the tool has exited in order to be able to have access to a live view of the logs while the tool is running. The maximum allowed number of tool logs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
      toolOutputs: z.array(z.object({
        creationTime: z.object({
          nanos: z.unknown().describe(
            "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
          ).optional(),
        }).describe(
          'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
        ).optional(),
        output: z.object({
          fileUri: z.unknown().describe(
            "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
          ).optional(),
        }).describe("A reference to a file.").optional(),
        testCase: z.object({
          className: z.unknown().describe("The name of the class.").optional(),
          name: z.unknown().describe("The name of the test case. Required.")
            .optional(),
          testSuiteName: z.unknown().describe(
            "The name of the test suite to which this test case belongs.",
          ).optional(),
        }).describe(
          "A reference to a test case. Test case references are canonically ordered lexicographically by these three factors: * First, by test_suite_name. * Second, by class_name. * Third, by name.",
        ).optional(),
      })).describe(
        "References to opaque files of any format output by the tool execution. The maximum allowed number of tool outputs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
    }).describe(
      "An execution of an arbitrary tool. It could be a test runner or a tool copying artifacts or deploying code.",
    ).optional(),
  }).describe(
    "Generic tool step to be used for binaries we do not explicitly support. For example: running cp to copy artifacts from one location to another.",
  ).optional(),
  historyId: z.string().describe("Required. A History id."),
  executionId: z.string().describe("Required. An Execution id."),
  requestId: z.string().describe(
    "A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended.",
  ).optional(),
});

const StateSchema = z.object({
  completionTime: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  creationTime: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  description: z.string().optional(),
  deviceUsageDuration: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  dimensionValue: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  hasImages: z.boolean().optional(),
  labels: z.array(z.object({
    key: z.string(),
    value: z.string(),
  })).optional(),
  multiStep: z.object({
    multistepNumber: z.number(),
    primaryStep: z.object({
      individualOutcome: z.array(z.object({
        multistepNumber: z.number(),
        outcomeSummary: z.string(),
        runDuration: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        stepId: z.string(),
      })),
      rollUp: z.string(),
    }),
    primaryStepId: z.string(),
  }).optional(),
  name: z.string(),
  outcome: z.object({
    failureDetail: z.object({
      crashed: z.boolean(),
      deviceOutOfMemory: z.boolean(),
      failedRoboscript: z.boolean(),
      notInstalled: z.boolean(),
      otherNativeCrash: z.boolean(),
      timedOut: z.boolean(),
      unableToCrawl: z.boolean(),
    }),
    inconclusiveDetail: z.object({
      abortedByUser: z.boolean(),
      hasErrorLogs: z.boolean(),
      infrastructureFailure: z.boolean(),
    }),
    skippedDetail: z.object({
      incompatibleAppVersion: z.boolean(),
      incompatibleArchitecture: z.boolean(),
      incompatibleDevice: z.boolean(),
      pendingTimeout: z.boolean(),
    }),
    successDetail: z.object({
      otherNativeCrash: z.boolean(),
    }),
    summary: z.string(),
  }).optional(),
  runDuration: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  state: z.string().optional(),
  stepId: z.string().optional(),
  testExecutionStep: z.object({
    testIssues: z.array(z.object({
      category: z.string(),
      errorMessage: z.string(),
      severity: z.string(),
      stackTrace: z.object({
        exception: z.string(),
      }),
      type: z.string(),
      warning_migration: z.object({
        typeUrl: z.string(),
        value: z.string(),
      }),
    })),
    testSuiteOverviews: z.array(z.object({
      elapsedTime: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
      errorCount: z.number(),
      failureCount: z.number(),
      flakyCount: z.number(),
      name: z.string(),
      skippedCount: z.number(),
      totalCount: z.number(),
      xmlSource: z.object({
        fileUri: z.string(),
      }),
    })),
    testTiming: z.object({
      testProcessDuration: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
    }),
    toolExecution: z.object({
      commandLineArguments: z.array(z.string()),
      exitCode: z.object({
        number: z.number(),
      }),
      toolLogs: z.array(z.object({
        fileUri: z.string(),
      })),
      toolOutputs: z.array(z.object({
        creationTime: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        output: z.object({
          fileUri: z.unknown(),
        }),
        testCase: z.object({
          className: z.unknown(),
          name: z.unknown(),
          testSuiteName: z.unknown(),
        }),
      })),
    }),
  }).optional(),
  toolExecutionStep: z.object({
    toolExecution: z.object({
      commandLineArguments: z.array(z.string()),
      exitCode: z.object({
        number: z.number(),
      }),
      toolLogs: z.array(z.object({
        fileUri: z.string(),
      })),
      toolOutputs: z.array(z.object({
        creationTime: z.object({
          nanos: z.unknown(),
          seconds: z.unknown(),
        }),
        output: z.object({
          fileUri: z.unknown(),
        }),
        testCase: z.object({
          className: z.unknown(),
          name: z.unknown(),
          testSuiteName: z.unknown(),
        }),
      })),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  completionTime: z.object({
    nanos: z.number().int().describe(
      "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
    ).optional(),
  }).describe(
    'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
  ).optional(),
  creationTime: z.object({
    nanos: z.number().int().describe(
      "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
    ).optional(),
  }).describe(
    'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
  ).optional(),
  description: z.string().describe(
    "A description of this tool For example: mvn clean package -D skipTests=true - In response: present if set by create/update request - In create/update request: optional",
  ).optional(),
  deviceUsageDuration: z.object({
    nanos: z.number().int().describe(
      "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
  ).optional(),
  dimensionValue: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
  })).describe(
    "If the execution containing this step has any dimension_definition set, then this field allows the child to specify the values of the dimensions. The keys must exactly match the dimension_definition of the execution. For example, if the execution has `dimension_definition = ['attempt', 'device']` then a step must define values for those dimensions, eg. `dimension_value = ['attempt': '1', 'device': 'Nexus 6']` If a step does not participate in one dimension of the matrix, the value for that dimension should be empty string. For example, if one of the tests is executed by a runner which does not support retries, the step could have `dimension_value = ['attempt': '', 'device': 'Nexus 6']` If the step does not participate in any dimensions of the matrix, it may leave dimension_value unset. A PRECONDITION_FAILED will be returned if any of the keys do not exist in the dimension_definition of the execution. A PRECONDITION_FAILED will be returned if another step in this execution already has the same name and dimension_value, but differs on other data fields, for example, step field is different. A PRECONDITION_FAILED will be returned if dimension_value is set, and there is a dimension_definition in the execution which is not specified as one of the keys. - In response: present if set by create - In create request: optional - In update request: never set",
  ).optional(),
  hasImages: z.boolean().describe(
    "Whether any of the outputs of this step are images whose thumbnails can be fetched with ListThumbnails. - In response: always set - In create/update request: never set",
  ).optional(),
  labels: z.array(z.object({
    key: z.string().optional(),
    value: z.string().optional(),
  })).describe(
    "Arbitrary user-supplied key/value pairs that are associated with the step. Users are responsible for managing the key namespace such that keys don't accidentally collide. An INVALID_ARGUMENT will be returned if the number of labels exceeds 100 or if the length of any of the keys or values exceeds 100 characters. - In response: always set - In create request: optional - In update request: optional; any new key/value pair will be added to the map, and any new value for an existing key will update that key's value",
  ).optional(),
  multiStep: z.object({
    multistepNumber: z.number().int().describe(
      "Unique int given to each step. Ranges from 0(inclusive) to total number of steps(exclusive). The primary step is 0.",
    ).optional(),
    primaryStep: z.object({
      individualOutcome: z.array(z.object({
        multistepNumber: z.number().int().describe(
          "Unique int given to each step. Ranges from 0(inclusive) to total number of steps(exclusive). The primary step is 0.",
        ).optional(),
        outcomeSummary: z.enum([
          "unset",
          "success",
          "failure",
          "inconclusive",
          "skipped",
          "flaky",
        ]).optional(),
        runDuration: z.object({
          nanos: z.unknown().describe(
            "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
          ).optional(),
        }).describe(
          'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
        ).optional(),
        stepId: z.string().optional(),
      })).describe("Step Id and outcome of each individual step.").optional(),
      rollUp: z.enum([
        "unset",
        "success",
        "failure",
        "inconclusive",
        "skipped",
        "flaky",
      ]).describe(
        "Rollup test status of multiple steps that were run with the same configuration as a group.",
      ).optional(),
    }).describe(
      "Stores rollup test status of multiple steps that were run as a group and outcome of each individual step.",
    ).optional(),
    primaryStepId: z.string().describe(
      "Step Id of the primary (original) step, which might be this step.",
    ).optional(),
  }).describe(
    "Details when multiple steps are run with the same configuration as a group.",
  ).optional(),
  name: z.string().describe(
    "A short human-readable name to display in the UI. Maximum of 100 characters. For example: Clean build A PRECONDITION_FAILED will be returned upon creating a new step if it shares its name and dimension_value with an existing step. If two steps represent a similar action, but have different dimension values, they should share the same name. For instance, if the same set of tests is run on two different platforms, the two steps should have the same name. - In response: always set - In create request: always set - In update request: never set",
  ).optional(),
  outcome: z.object({
    failureDetail: z.object({
      crashed: z.boolean().describe(
        "If the failure was severe because the system (app) under test crashed.",
      ).optional(),
      deviceOutOfMemory: z.boolean().describe(
        "If the device ran out of memory during a test, causing the test to crash.",
      ).optional(),
      failedRoboscript: z.boolean().describe(
        "If the Roboscript failed to complete successfully, e.g., because a Roboscript action or assertion failed or a Roboscript action could not be matched during the entire crawl.",
      ).optional(),
      notInstalled: z.boolean().describe(
        "If an app is not installed and thus no test can be run with the app. This might be caused by trying to run a test on an unsupported platform.",
      ).optional(),
      otherNativeCrash: z.boolean().describe(
        "If a native process (including any other than the app) crashed.",
      ).optional(),
      timedOut: z.boolean().describe(
        "If the test overran some time limit, and that is why it failed.",
      ).optional(),
      unableToCrawl: z.boolean().describe(
        "If the robo was unable to crawl the app; perhaps because the app did not start.",
      ).optional(),
    }).describe("Details for an outcome with a FAILURE outcome summary.")
      .optional(),
    inconclusiveDetail: z.object({
      abortedByUser: z.boolean().describe(
        "If the end user aborted the test execution before a pass or fail could be determined. For example, the user pressed ctrl-c which sent a kill signal to the test runner while the test was running.",
      ).optional(),
      hasErrorLogs: z.boolean().describe(
        "If results are being provided to the user in certain cases of infrastructure failures",
      ).optional(),
      infrastructureFailure: z.boolean().describe(
        "If the test runner could not determine success or failure because the test depends on a component other than the system under test which failed. For example, a mobile test requires provisioning a device where the test executes, and that provisioning can fail.",
      ).optional(),
    }).describe("Details for an outcome with an INCONCLUSIVE outcome summary.")
      .optional(),
    skippedDetail: z.object({
      incompatibleAppVersion: z.boolean().describe(
        "If the App doesn't support the specific API level.",
      ).optional(),
      incompatibleArchitecture: z.boolean().describe(
        "If the App doesn't run on the specific architecture, for example, x86.",
      ).optional(),
      incompatibleDevice: z.boolean().describe(
        "If the requested OS version doesn't run on the specific device model.",
      ).optional(),
      pendingTimeout: z.boolean().describe(
        "Indicates that the test could not be scheduled in the requested time because no suitable device was available.",
      ).optional(),
    }).describe("Details for an outcome with a SKIPPED outcome summary.")
      .optional(),
    successDetail: z.object({
      otherNativeCrash: z.boolean().describe(
        "If a native process other than the app crashed.",
      ).optional(),
    }).describe(
      "Details for an outcome with a SUCCESS outcome summary. LINT.IfChange",
    ).optional(),
    summary: z.enum([
      "unset",
      "success",
      "failure",
      "inconclusive",
      "skipped",
      "flaky",
    ]).describe("The simplest way to interpret a result. Required").optional(),
  }).describe("Interprets a result so that humans and machines can act on it.")
    .optional(),
  runDuration: z.object({
    nanos: z.number().int().describe(
      "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
  ).optional(),
  state: z.enum(["unknownState", "pending", "inProgress", "complete"]).describe(
    "The initial state is IN_PROGRESS. The only legal state transitions are * IN_PROGRESS -> COMPLETE A PRECONDITION_FAILED will be returned if an invalid transition is requested. It is valid to create Step with a state set to COMPLETE. The state can only be set to COMPLETE once. A PRECONDITION_FAILED will be returned if the state is set to COMPLETE multiple times. - In response: always set - In create/update request: optional",
  ).optional(),
  stepId: z.string().describe(
    "A unique identifier within a Execution for this Step. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response: always set - In create/update request: never set",
  ).optional(),
  testExecutionStep: z.object({
    testIssues: z.array(z.object({
      category: z.enum(["unspecifiedCategory", "common", "robo"]).describe(
        "Category of issue. Required.",
      ).optional(),
      errorMessage: z.string().describe(
        "A brief human-readable message describing the issue. Required.",
      ).optional(),
      severity: z.enum([
        "unspecifiedSeverity",
        "info",
        "suggestion",
        "warning",
        "severe",
      ]).describe("Severity of issue. Required.").optional(),
      stackTrace: z.object({
        exception: z.string().describe("The stack trace message. Required")
          .optional(),
      }).describe("A stacktrace.").optional(),
      type: z.enum([
        "unspecifiedType",
        "fatalException",
        "nativeCrash",
        "anr",
        "unusedRoboDirective",
        "compatibleWithOrchestrator",
        "launcherActivityNotFound",
        "startActivityNotFound",
        "incompleteRoboScriptExecution",
        "completeRoboScriptExecution",
        "failedToInstall",
        "availableDeepLinks",
        "nonSdkApiUsageViolation",
        "nonSdkApiUsageReport",
        "encounteredNonAndroidUiWidgetScreen",
        "encounteredLoginScreen",
        "performedGoogleLogin",
        "iosException",
        "iosCrash",
        "performedMonkeyActions",
        "usedRoboDirective",
        "usedRoboIgnoreDirective",
        "insufficientCoverage",
        "inAppPurchases",
        "crashDialogError",
        "uiElementsTooDeep",
        "blankScreen",
        "overlappingUiElements",
        "unityException",
        "deviceOutOfMemory",
        "logcatCollectionError",
        "detectedAppSplashScreen",
        "assetIssue",
      ]).describe("Type of issue. Required.").optional(),
      warning_migration: z.object({
        typeUrl: z.string().describe(
          'A URL/resource name that uniquely identifies the type of the serialized protocol buffer message. This string must contain at least one "/" character. The last segment of the URL\'s path must represent the fully qualified name of the type (as in `path/google.protobuf.Duration`). The name should be in a canonical form (e.g., leading "." is not accepted). In practice, teams usually precompile into the binary all types that they expect it to use in the context of Any. However, for URLs which use the scheme `http`, `https`, or no scheme, one can optionally set up a type server that maps type URLs to message definitions as follows: * If no scheme is provided, `https` is assumed. * An HTTP GET on the URL must yield a google.protobuf.Type value in binary format, or produce an error. * Applications are allowed to cache lookup results based on the URL, or have them precompiled into a binary to avoid any lookup. Therefore, binary compatibility needs to be preserved on changes to types. (Use versioned type names to manage breaking changes.) Note: this functionality is not currently available in the official protobuf release, and it is not used for type URLs beginning with type.googleapis.com. Schemes other than `http`, `https` (or the empty scheme) might be used with implementation specific semantics.',
        ).optional(),
        value: z.string().describe(
          "Must be a valid serialized protocol buffer of the above specified type.",
        ).optional(),
      }).describe(
        '`Any` contains an arbitrary serialized protocol buffer message along with a URL that describes the type of the serialized message. Protobuf library provides support to pack/unpack Any values in the form of utility functions or additional generated methods of the Any type. Example 1: Pack and unpack a message in C++. Foo foo =...; Any any; any.PackFrom(foo);... if (any.UnpackTo(&foo)) {... } Example 2: Pack and unpack a message in Java. Foo foo =...; Any any = Any.pack(foo);... if (any.is(Foo.class)) { foo = any.unpack(Foo.class); } Example 3: Pack and unpack a message in Python. foo = Foo(...) any = Any() any.Pack(foo)... if any.Is(Foo.DESCRIPTOR): any.Unpack(foo)... Example 4: Pack and unpack a message in Go foo:= &pb.Foo{...} any, err:= ptypes.MarshalAny(foo)... foo:= &pb.Foo{} if err:= ptypes.UnmarshalAny(any, foo); err!= nil {... } The pack methods provided by protobuf library will by default use \'type.googleapis.com/full.type.name\' as the type URL and the unpack methods only use the fully qualified type name after the last \'/\' in the type URL, for example "foo.bar.com/x/y.z" will yield type name "y.z". # JSON The JSON representation of an `Any` value uses the regular representation of the deserialized, embedded message, with an additional field `@type` which contains the type URL. Example: package google.profile; message Person { string first_name = 1; string last_name = 2; } { "@type": "type.googleapis.com/google.profile.Person", "firstName":, "lastName": } If the embedded message type is well-known and has a custom JSON representation, that representation will be embedded adding a field `value` which holds the custom JSON in addition to the `@type` field. Example (for message google.protobuf.Duration): { "@type": "type.googleapis.com/google.protobuf.Duration", "value": "1.212s" }',
      ).optional(),
    })).describe(
      "Issues observed during the test execution. For example, if the mobile app under test crashed during the test, the error message and the stack trace content can be recorded here to assist debugging. - In response: present if set by create or update - In create/update request: optional",
    ).optional(),
    testSuiteOverviews: z.array(z.object({
      elapsedTime: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
      errorCount: z.number().int().describe(
        "Number of test cases in error, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never",
      ).optional(),
      failureCount: z.number().int().describe(
        "Number of failed test cases, typically set by the service by parsing the xml_source. May also be set by the user. - In create/response: always set - In update request: never",
      ).optional(),
      flakyCount: z.number().int().describe(
        "Number of flaky test cases, set by the service by rolling up flaky test attempts. Present only for rollup test suite overview at environment level. A step cannot have flaky test cases.",
      ).optional(),
      name: z.string().describe(
        "The name of the test suite. - In create/response: always set - In update request: never",
      ).optional(),
      skippedCount: z.number().int().describe(
        "Number of test cases not run, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never",
      ).optional(),
      totalCount: z.number().int().describe(
        "Number of test cases, typically set by the service by parsing the xml_source. - In create/response: always set - In update request: never",
      ).optional(),
      xmlSource: z.object({
        fileUri: z.string().describe(
          "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
        ).optional(),
      }).describe("A reference to a file.").optional(),
    })).describe(
      "List of test suite overview contents. This could be parsed from xUnit XML log by server, or uploaded directly by user. This references should only be called when test suites are fully parsed or uploaded. The maximum allowed number of test suite overviews per step is 1000. - In response: always set - In create request: optional - In update request: never (use publishXunitXmlFiles custom method instead)",
    ).optional(),
    testTiming: z.object({
      testProcessDuration: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
    }).describe("Testing timing break down to know phases.").optional(),
    toolExecution: z.object({
      commandLineArguments: z.array(z.string()).describe(
        "The full tokenized command line including the program name (equivalent to argv in a C program). - In response: present if set by create request - In create request: optional - In update request: never set",
      ).optional(),
      exitCode: z.object({
        number: z.number().int().describe(
          "Tool execution exit code. A value of 0 means that the execution was successful. - In response: always set - In create/update request: always set",
        ).optional(),
      }).describe("Exit code from a tool execution.").optional(),
      toolLogs: z.array(z.object({
        fileUri: z.string().describe(
          "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
        ).optional(),
      })).describe(
        "References to any plain text logs output the tool execution. This field can be set before the tool has exited in order to be able to have access to a live view of the logs while the tool is running. The maximum allowed number of tool logs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
      toolOutputs: z.array(z.object({
        creationTime: z.object({
          nanos: z.unknown().describe(
            "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
          ).optional(),
        }).describe(
          'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
        ).optional(),
        output: z.object({
          fileUri: z.unknown().describe(
            "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
          ).optional(),
        }).describe("A reference to a file.").optional(),
        testCase: z.object({
          className: z.unknown().describe("The name of the class.").optional(),
          name: z.unknown().describe("The name of the test case. Required.")
            .optional(),
          testSuiteName: z.unknown().describe(
            "The name of the test suite to which this test case belongs.",
          ).optional(),
        }).describe(
          "A reference to a test case. Test case references are canonically ordered lexicographically by these three factors: * First, by test_suite_name. * Second, by class_name. * Third, by name.",
        ).optional(),
      })).describe(
        "References to opaque files of any format output by the tool execution. The maximum allowed number of tool outputs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
    }).describe(
      "An execution of an arbitrary tool. It could be a test runner or a tool copying artifacts or deploying code.",
    ).optional(),
  }).describe(
    "A step that represents running tests. It accepts ant-junit xml files which will be parsed into structured test results by the service. Xml file paths are updated in order to append more files, however they can't be deleted. Users can also add test results manually by using the test_result field.",
  ).optional(),
  toolExecutionStep: z.object({
    toolExecution: z.object({
      commandLineArguments: z.array(z.string()).describe(
        "The full tokenized command line including the program name (equivalent to argv in a C program). - In response: present if set by create request - In create request: optional - In update request: never set",
      ).optional(),
      exitCode: z.object({
        number: z.number().int().describe(
          "Tool execution exit code. A value of 0 means that the execution was successful. - In response: always set - In create/update request: always set",
        ).optional(),
      }).describe("Exit code from a tool execution.").optional(),
      toolLogs: z.array(z.object({
        fileUri: z.string().describe(
          "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
        ).optional(),
      })).describe(
        "References to any plain text logs output the tool execution. This field can be set before the tool has exited in order to be able to have access to a live view of the logs while the tool is running. The maximum allowed number of tool logs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
      toolOutputs: z.array(z.object({
        creationTime: z.object({
          nanos: z.unknown().describe(
            "Non-negative fractions of a second at nanosecond resolution. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be from 0 to 999,999,999 inclusive.",
          ).optional(),
          seconds: z.unknown().describe(
            "Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.",
          ).optional(),
        }).describe(
          'A Timestamp represents a point in time independent of any time zone or local calendar, encoded as a count of seconds and fractions of seconds at nanosecond resolution. The count is relative to an epoch at UTC midnight on January 1, 1970, in the proleptic Gregorian calendar which extends the Gregorian calendar backwards to year one. All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap second table is needed for interpretation, using a [24-hour linear smear](https://developers.google.com/time/smear). The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By restricting to that range, we ensure that we can convert to and from [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.',
        ).optional(),
        output: z.object({
          fileUri: z.unknown().describe(
            "The URI of a file stored in Google Cloud Storage. For example: `http://storage.googleapis.com/mybucket/path/to/test.xml` or in Cloud Storage URI format: `gs://mybucket/path/to/test.xml` with version-specific info, `gs://mybucket/path/to/test.xml#1360383693690000` An INVALID_ARGUMENT error will be returned if the URI format is not supported. - In response: always set - In create/update request: always set",
          ).optional(),
        }).describe("A reference to a file.").optional(),
        testCase: z.object({
          className: z.unknown().describe("The name of the class.").optional(),
          name: z.unknown().describe("The name of the test case. Required.")
            .optional(),
          testSuiteName: z.unknown().describe(
            "The name of the test suite to which this test case belongs.",
          ).optional(),
        }).describe(
          "A reference to a test case. Test case references are canonically ordered lexicographically by these three factors: * First, by test_suite_name. * Second, by class_name. * Third, by name.",
        ).optional(),
      })).describe(
        "References to opaque files of any format output by the tool execution. The maximum allowed number of tool outputs per step is 1000. - In response: present if set by create/update request - In create request: optional - In update request: optional, any value provided will be appended to the existing list",
      ).optional(),
    }).describe(
      "An execution of an arbitrary tool. It could be a test runner or a tool copying artifacts or deploying code.",
    ).optional(),
  }).describe(
    "Generic tool step to be used for binaries we do not explicitly support. For example: running cp to copy artifacts from one location to another.",
  ).optional(),
  historyId: z.string().describe("Required. A History id.").optional(),
  executionId: z.string().describe("Required. An Execution id.").optional(),
  requestId: z.string().describe(
    "A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tool Results Histories.Executions.Steps. Registered at `@swamp/gcp/toolresults/histories-executions-steps`. */
export const model = {
  type: "@swamp/gcp/toolresults/histories-executions-steps",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Step represents a single operation performed as part of Execution. A step c...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a steps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["completionTime"] !== undefined) {
          body["completionTime"] = g["completionTime"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["deviceUsageDuration"] !== undefined) {
          body["deviceUsageDuration"] = g["deviceUsageDuration"];
        }
        if (g["dimensionValue"] !== undefined) {
          body["dimensionValue"] = g["dimensionValue"];
        }
        if (g["hasImages"] !== undefined) body["hasImages"] = g["hasImages"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["multiStep"] !== undefined) body["multiStep"] = g["multiStep"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["outcome"] !== undefined) body["outcome"] = g["outcome"];
        if (g["runDuration"] !== undefined) {
          body["runDuration"] = g["runDuration"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["stepId"] !== undefined) body["stepId"] = g["stepId"];
        if (g["testExecutionStep"] !== undefined) {
          body["testExecutionStep"] = g["testExecutionStep"];
        }
        if (g["toolExecutionStep"] !== undefined) {
          body["toolExecutionStep"] = g["toolExecutionStep"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["stepId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a steps",
      arguments: z.object({
        identifier: z.string().describe("The name of the steps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        params["stepId"] = args.identifier;
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
      description: "Update steps attributes",
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
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        } else if (existing["historyId"]) {
          params["historyId"] = String(existing["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        } else if (existing["executionId"]) {
          params["executionId"] = String(existing["executionId"]);
        }
        params["stepId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["completionTime"] !== undefined) {
          body["completionTime"] = g["completionTime"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["deviceUsageDuration"] !== undefined) {
          body["deviceUsageDuration"] = g["deviceUsageDuration"];
        }
        if (g["dimensionValue"] !== undefined) {
          body["dimensionValue"] = g["dimensionValue"];
        }
        if (g["hasImages"] !== undefined) body["hasImages"] = g["hasImages"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["multiStep"] !== undefined) body["multiStep"] = g["multiStep"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["outcome"] !== undefined) body["outcome"] = g["outcome"];
        if (g["runDuration"] !== undefined) {
          body["runDuration"] = g["runDuration"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["testExecutionStep"] !== undefined) {
          body["testExecutionStep"] = g["testExecutionStep"];
        }
        if (g["toolExecutionStep"] !== undefined) {
          body["toolExecutionStep"] = g["toolExecutionStep"];
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
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync steps state from GCP",
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
          if (g["historyId"] !== undefined) {
            params["historyId"] = String(g["historyId"]);
          } else if (existing["historyId"]) {
            params["historyId"] = String(existing["historyId"]);
          }
          if (g["executionId"] !== undefined) {
            params["executionId"] = String(g["executionId"]);
          } else if (existing["executionId"]) {
            params["executionId"] = String(existing["executionId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["stepId"] = identifier;
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
    accessibility_clusters: {
      description: "accessibility clusters",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "toolresults.projects.histories.executions.steps.accessibilityClusters",
            "path": "toolresults/v1beta3/{+name}:accessibilityClusters",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "locale": { "location": "query" },
              "name": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_perf_metrics_summary: {
      description: "get perf metrics summary",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        if (g["stepId"] !== undefined) params["stepId"] = String(g["stepId"]);
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "toolresults.projects.histories.executions.steps.getPerfMetricsSummary",
            "path":
              "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}/perfMetricsSummary",
            "httpMethod": "GET",
            "parameterOrder": [
              "projectId",
              "historyId",
              "executionId",
              "stepId",
            ],
            "parameters": {
              "executionId": { "location": "path", "required": true },
              "historyId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
              "stepId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    publish_xunit_xml_files: {
      description: "publish xunit xml files",
      arguments: z.object({
        xunitXmlFiles: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (g["executionId"] !== undefined) {
          params["executionId"] = String(g["executionId"]);
        }
        if (g["stepId"] !== undefined) params["stepId"] = String(g["stepId"]);
        const body: Record<string, unknown> = {};
        if (args["xunitXmlFiles"] !== undefined) {
          body["xunitXmlFiles"] = args["xunitXmlFiles"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "toolresults.projects.histories.executions.steps.publishXunitXmlFiles",
            "path":
              "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}/steps/{stepId}:publishXunitXmlFiles",
            "httpMethod": "POST",
            "parameterOrder": [
              "projectId",
              "historyId",
              "executionId",
              "stepId",
            ],
            "parameters": {
              "executionId": { "location": "path", "required": true },
              "historyId": { "location": "path", "required": true },
              "projectId": { "location": "path", "required": true },
              "stepId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
