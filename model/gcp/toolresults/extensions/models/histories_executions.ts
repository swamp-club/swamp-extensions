// Auto-generated extension model for @swamp/gcp/toolresults/histories-executions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Tool Results Histories.Executions.
 *
 * An Execution represents a collection of Steps. For instance, it could represent: - a mobile test executed across a range of device configurations - a jenkins job with a build step followed by a test step The maximum size of an execution message is 1 MiB. An Execution can be updated until its state is set to COMPLETE at which point it becomes immutable.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://toolresults.googleapis.com/";

const GET_CONFIG = {
  "id": "toolresults.projects.histories.executions.get",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}",
  "httpMethod": "GET",
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
  },
} as const;

const INSERT_CONFIG = {
  "id": "toolresults.projects.histories.executions.create",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
    "historyId",
  ],
  "parameters": {
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
  "id": "toolresults.projects.histories.executions.patch",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions/{executionId}",
  "httpMethod": "PATCH",
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

const LIST_CONFIG = {
  "id": "toolresults.projects.histories.executions.list",
  "path":
    "toolresults/v1beta3/projects/{projectId}/histories/{historyId}/executions",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "historyId",
  ],
  "parameters": {
    "historyId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  dimensionDefinitions: z.array(z.object({})).describe(
    "The dimensions along which different steps in this execution may vary. This must remain fixed over the life of the execution. Returns INVALID_ARGUMENT if this field is set in an update request. Returns INVALID_ARGUMENT if the same name occurs in more than one dimension_definition. Returns INVALID_ARGUMENT if the size of the list is over 100. - In response: present if set by create - In create request: optional - In update request: never set",
  ).optional(),
  executionId: z.string().describe(
    "A unique identifier within a History for this Execution. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response always set - In create/update request: never set",
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
  specification: z.object({
    androidTest: z.object({
      androidAppInfo: z.object({
        name: z.string().describe("The name of the app. Optional").optional(),
        packageName: z.string().describe(
          "The package name of the app. Required.",
        ).optional(),
        versionCode: z.string().describe(
          "The internal version code of the app. Optional.",
        ).optional(),
        versionName: z.string().describe(
          "The version name of the app. Optional.",
        ).optional(),
      }).describe("Android app information.").optional(),
      androidInstrumentationTest: z.object({
        testPackageId: z.string().describe(
          "The java package for the test to be executed. Required",
        ).optional(),
        testRunnerClass: z.string().describe(
          "The InstrumentationTestRunner class. Required",
        ).optional(),
        testTargets: z.array(z.string()).describe(
          'Each target must be fully qualified with the package name or class name, in one of these formats: - "package package_name" - "class package_name.class_name" - "class package_name.class_name#method_name" If empty, all targets in the module will be run.',
        ).optional(),
        useOrchestrator: z.boolean().describe(
          "The flag indicates whether Android Test Orchestrator will be used to run test or not.",
        ).optional(),
      }).describe(
        "A test of an Android application that can control an Android component independently of its normal lifecycle. See for more information on types of Android tests.",
      ).optional(),
      androidRoboTest: z.object({
        appInitialActivity: z.string().describe(
          "The initial activity that should be used to start the app. Optional",
        ).optional(),
        bootstrapPackageId: z.string().describe(
          "The java package for the bootstrap. Optional",
        ).optional(),
        bootstrapRunnerClass: z.string().describe(
          "The runner class for the bootstrap. Optional",
        ).optional(),
        maxDepth: z.number().int().describe(
          "The max depth of the traversal stack Robo can explore. Optional",
        ).optional(),
        maxSteps: z.number().int().describe(
          "The max number of steps/actions Robo can execute. Default is no limit (0). Optional",
        ).optional(),
      }).describe(
        "A test of an android application that explores the application on a virtual or physical Android device, finding culprits and crashes as it goes.",
      ).optional(),
      androidTestLoop: z.object({}).describe(
        "Test Loops are tests that can be launched by the app itself, determining when to run by listening for an intent.",
      ).optional(),
      testTimeout: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
    }).describe("An Android mobile test specification.").optional(),
    iosTest: z.object({
      iosAppInfo: z.object({
        name: z.string().describe("The name of the app. Required").optional(),
      }).describe("iOS app information").optional(),
      iosRoboTest: z.object({}).describe("A Robo test for an iOS application.")
        .optional(),
      iosTestLoop: z.object({
        bundleId: z.string().describe("Bundle ID of the app.").optional(),
      }).describe("A game loop test of an iOS application.").optional(),
      iosXcTest: z.object({
        bundleId: z.string().describe("Bundle ID of the app.").optional(),
        xcodeVersion: z.string().describe(
          "Xcode version that the test was run with.",
        ).optional(),
      }).describe(
        "A test of an iOS application that uses the XCTest framework.",
      ).optional(),
      testTimeout: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
    }).describe("A iOS mobile test specification").optional(),
  }).describe("The details about how to run the execution.").optional(),
  state: z.enum(["unknownState", "pending", "inProgress", "complete"]).describe(
    "The initial state is IN_PROGRESS. The only legal state transitions is from IN_PROGRESS to COMPLETE. A PRECONDITION_FAILED will be returned if an invalid transition is requested. The state can only be set to COMPLETE once. A FAILED_PRECONDITION will be returned if the state is set to COMPLETE multiple times. If the state is set to COMPLETE, all the in-progress steps within the execution will be set as COMPLETE. If the outcome of the step is not set, the outcome will be set to INCONCLUSIVE. - In response always set - In create/update request: optional",
  ).optional(),
  testExecutionMatrixId: z.string().describe(
    "TestExecution Matrix ID that the TestExecutionService uses. - In response: present if set by create - In create: optional - In update: never set",
  ).optional(),
  historyId: z.string().describe("A History id. Required."),
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
  dimensionDefinitions: z.array(z.object({})).optional(),
  executionId: z.string().optional(),
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
  specification: z.object({
    androidTest: z.object({
      androidAppInfo: z.object({
        name: z.string(),
        packageName: z.string(),
        versionCode: z.string(),
        versionName: z.string(),
      }),
      androidInstrumentationTest: z.object({
        testPackageId: z.string(),
        testRunnerClass: z.string(),
        testTargets: z.array(z.string()),
        useOrchestrator: z.boolean(),
      }),
      androidRoboTest: z.object({
        appInitialActivity: z.string(),
        bootstrapPackageId: z.string(),
        bootstrapRunnerClass: z.string(),
        maxDepth: z.number(),
        maxSteps: z.number(),
      }),
      androidTestLoop: z.object({}),
      testTimeout: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
    }),
    iosTest: z.object({
      iosAppInfo: z.object({
        name: z.string(),
      }),
      iosRoboTest: z.object({}),
      iosTestLoop: z.object({
        bundleId: z.string(),
      }),
      iosXcTest: z.object({
        bundleId: z.string(),
        xcodeVersion: z.string(),
      }),
      testTimeout: z.object({
        nanos: z.number(),
        seconds: z.string(),
      }),
    }),
  }).optional(),
  state: z.string().optional(),
  testExecutionMatrixId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
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
  dimensionDefinitions: z.array(z.object({})).describe(
    "The dimensions along which different steps in this execution may vary. This must remain fixed over the life of the execution. Returns INVALID_ARGUMENT if this field is set in an update request. Returns INVALID_ARGUMENT if the same name occurs in more than one dimension_definition. Returns INVALID_ARGUMENT if the size of the list is over 100. - In response: present if set by create - In create request: optional - In update request: never set",
  ).optional(),
  executionId: z.string().describe(
    "A unique identifier within a History for this Execution. Returns INVALID_ARGUMENT if this field is set or overwritten by the caller. - In response always set - In create/update request: never set",
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
  specification: z.object({
    androidTest: z.object({
      androidAppInfo: z.object({
        name: z.string().describe("The name of the app. Optional").optional(),
        packageName: z.string().describe(
          "The package name of the app. Required.",
        ).optional(),
        versionCode: z.string().describe(
          "The internal version code of the app. Optional.",
        ).optional(),
        versionName: z.string().describe(
          "The version name of the app. Optional.",
        ).optional(),
      }).describe("Android app information.").optional(),
      androidInstrumentationTest: z.object({
        testPackageId: z.string().describe(
          "The java package for the test to be executed. Required",
        ).optional(),
        testRunnerClass: z.string().describe(
          "The InstrumentationTestRunner class. Required",
        ).optional(),
        testTargets: z.array(z.string()).describe(
          'Each target must be fully qualified with the package name or class name, in one of these formats: - "package package_name" - "class package_name.class_name" - "class package_name.class_name#method_name" If empty, all targets in the module will be run.',
        ).optional(),
        useOrchestrator: z.boolean().describe(
          "The flag indicates whether Android Test Orchestrator will be used to run test or not.",
        ).optional(),
      }).describe(
        "A test of an Android application that can control an Android component independently of its normal lifecycle. See for more information on types of Android tests.",
      ).optional(),
      androidRoboTest: z.object({
        appInitialActivity: z.string().describe(
          "The initial activity that should be used to start the app. Optional",
        ).optional(),
        bootstrapPackageId: z.string().describe(
          "The java package for the bootstrap. Optional",
        ).optional(),
        bootstrapRunnerClass: z.string().describe(
          "The runner class for the bootstrap. Optional",
        ).optional(),
        maxDepth: z.number().int().describe(
          "The max depth of the traversal stack Robo can explore. Optional",
        ).optional(),
        maxSteps: z.number().int().describe(
          "The max number of steps/actions Robo can execute. Default is no limit (0). Optional",
        ).optional(),
      }).describe(
        "A test of an android application that explores the application on a virtual or physical Android device, finding culprits and crashes as it goes.",
      ).optional(),
      androidTestLoop: z.object({}).describe(
        "Test Loops are tests that can be launched by the app itself, determining when to run by listening for an intent.",
      ).optional(),
      testTimeout: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
    }).describe("An Android mobile test specification.").optional(),
    iosTest: z.object({
      iosAppInfo: z.object({
        name: z.string().describe("The name of the app. Required").optional(),
      }).describe("iOS app information").optional(),
      iosRoboTest: z.object({}).describe("A Robo test for an iOS application.")
        .optional(),
      iosTestLoop: z.object({
        bundleId: z.string().describe("Bundle ID of the app.").optional(),
      }).describe("A game loop test of an iOS application.").optional(),
      iosXcTest: z.object({
        bundleId: z.string().describe("Bundle ID of the app.").optional(),
        xcodeVersion: z.string().describe(
          "Xcode version that the test was run with.",
        ).optional(),
      }).describe(
        "A test of an iOS application that uses the XCTest framework.",
      ).optional(),
      testTimeout: z.object({
        nanos: z.number().int().describe(
          "Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.",
        ).optional(),
        seconds: z.string().describe(
          "Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
        ).optional(),
      }).describe(
        'A Duration represents a signed, fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". It is related to Timestamp in that the difference between two Timestamp values is a Duration and it can be added or subtracted from a Timestamp. Range is approximately +-10,000 years.',
      ).optional(),
    }).describe("A iOS mobile test specification").optional(),
  }).describe("The details about how to run the execution.").optional(),
  state: z.enum(["unknownState", "pending", "inProgress", "complete"]).describe(
    "The initial state is IN_PROGRESS. The only legal state transitions is from IN_PROGRESS to COMPLETE. A PRECONDITION_FAILED will be returned if an invalid transition is requested. The state can only be set to COMPLETE once. A FAILED_PRECONDITION will be returned if the state is set to COMPLETE multiple times. If the state is set to COMPLETE, all the in-progress steps within the execution will be set as COMPLETE. If the outcome of the step is not set, the outcome will be set to INCONCLUSIVE. - In response always set - In create/update request: optional",
  ).optional(),
  testExecutionMatrixId: z.string().describe(
    "TestExecution Matrix ID that the TestExecutionService uses. - In response: present if set by create - In create: optional - In update: never set",
  ).optional(),
  historyId: z.string().describe("A History id. Required.").optional(),
  requestId: z.string().describe(
    "A unique request ID for server to detect duplicated requests. For example, a UUID. Optional, but strongly recommended.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Tool Results Histories.Executions. Registered at `@swamp/gcp/toolresults/histories-executions`. */
export const model = {
  type: "@swamp/gcp/toolresults/histories-executions",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "An Execution represents a collection of Steps. For instance, it could represe...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a executions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["completionTime"] !== undefined) {
          body["completionTime"] = g["completionTime"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["dimensionDefinitions"] !== undefined) {
          body["dimensionDefinitions"] = g["dimensionDefinitions"];
        }
        if (g["executionId"] !== undefined) {
          body["executionId"] = g["executionId"];
        }
        if (g["outcome"] !== undefined) body["outcome"] = g["outcome"];
        if (g["specification"] !== undefined) {
          body["specification"] = g["specification"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["testExecutionMatrixId"] !== undefined) {
          body["testExecutionMatrixId"] = g["testExecutionMatrixId"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["executionId"] = String(g["name"]);
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
              "projectId": projectId,
              "historyId": String(g["historyId"] ?? ""),
            },
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
      description: "Get a executions",
      arguments: z.object({
        identifier: z.string().describe("The name of the executions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        params["executionId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
    update: {
      description: "Update executions attributes",
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
        params["executionId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["completionTime"] !== undefined) {
          body["completionTime"] = g["completionTime"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["dimensionDefinitions"] !== undefined) {
          body["dimensionDefinitions"] = g["dimensionDefinitions"];
        }
        if (g["outcome"] !== undefined) body["outcome"] = g["outcome"];
        if (g["specification"] !== undefined) {
          body["specification"] = g["specification"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["testExecutionMatrixId"] !== undefined) {
          body["testExecutionMatrixId"] = g["testExecutionMatrixId"];
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
      description: "Sync executions state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["executionId"] = identifier;
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
      description: "List executions resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of Executions to fetch. Default value: 25. The server will use this default if the field is not set or has a value of 0. Optional.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["historyId"] !== undefined) {
          params["historyId"] = String(g["historyId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "executions",
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
  },
};
