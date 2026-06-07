// Auto-generated extension model for @swamp/gcp/testing/testmatrices
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Testing TestMatrices.
 *
 * TestMatrix captures all details about a test. It contains the environment configuration, test specification, test executions and overall state and outcome.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://testing.googleapis.com/";

const GET_CONFIG = {
  "id": "testing.projects.testMatrices.get",
  "path": "v1/projects/{projectId}/testMatrices/{testMatrixId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectId",
    "testMatrixId",
  ],
  "parameters": {
    "projectId": {
      "location": "path",
      "required": true,
    },
    "testMatrixId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "testing.projects.testMatrices.create",
  "path": "v1/projects/{projectId}/testMatrices",
  "httpMethod": "POST",
  "parameterOrder": [
    "projectId",
  ],
  "parameters": {
    "projectId": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  clientInfo: z.object({
    clientInfoDetails: z.array(z.object({
      key: z.string().describe(
        "Required. The key of detailed client information.",
      ).optional(),
      value: z.string().describe(
        "Required. The value of detailed client information.",
      ).optional(),
    })).describe("The list of detailed information about client.").optional(),
    name: z.string().describe("Required. Client name, such as gcloud.")
      .optional(),
  }).describe("Information about the client which invoked the test.")
    .optional(),
  environmentMatrix: z.object({
    androidDeviceList: z.object({
      androidDevices: z.array(z.object({
        androidModelId: z.string().describe(
          "Required. The id of the Android device to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        androidVersionId: z.string().describe(
          "Required. The id of the Android OS version to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        locale: z.string().describe(
          "Required. The locale the test device used for testing. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        orientation: z.string().describe(
          "Required. How the device is oriented during the test. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
      })).describe("Required. A list of Android devices.").optional(),
    }).describe(
      "A list of Android device configurations in which the test is to be executed.",
    ).optional(),
    androidMatrix: z.object({
      androidModelIds: z.array(z.string()).describe(
        "Required. The ids of the set of Android device to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
      androidVersionIds: z.array(z.string()).describe(
        "Required. The ids of the set of Android OS version to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
      locales: z.array(z.string()).describe(
        "Required. The set of locales the test device will enable for testing. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
      orientations: z.array(z.string()).describe(
        "Required. The set of orientations to test with. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
    }).describe(
      "A set of Android device configuration permutations is defined by the the cross-product of the given axes. Internally, the given AndroidMatrix will be expanded into a set of AndroidDevices. Only supported permutations will be instantiated. Invalid permutations (e.g., incompatible models/versions) are ignored.",
    ).optional(),
    iosDeviceList: z.object({
      iosDevices: z.array(z.object({
        iosModelId: z.string().describe(
          "Required. The id of the iOS device to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        iosVersionId: z.string().describe(
          "Required. The id of the iOS major software version to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        locale: z.string().describe(
          "Required. The locale the test device used for testing. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        orientation: z.string().describe(
          "Required. How the device is oriented during the test. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
      })).describe("Required. A list of iOS devices.").optional(),
    }).describe(
      "A list of iOS device configurations in which the test is to be executed.",
    ).optional(),
  }).describe("The matrix of environments in which the test is to be executed.")
    .optional(),
  failFast: z.boolean().describe(
    "If true, only a single attempt at most will be made to run each execution/shard in the matrix. Flaky test attempts are not affected. Normally, 2 or more attempts are made if a potential infrastructure issue is detected. This feature is for latency sensitive workloads. The incidence of execution failures may be significantly greater for fail-fast matrices and support is more limited because of that expectation.",
  ).optional(),
  flakyTestAttempts: z.number().int().describe(
    "The number of times a TestExecution should be re-attempted if one or more of its test cases fail for any reason. The maximum number of reruns allowed is 10. Default is 0, which implies no reruns.",
  ).optional(),
  projectId: z.string().describe("The cloud project that owns the test matrix.")
    .optional(),
  resultStorage: z.object({
    googleCloudStorage: z.object({
      gcsPath: z.string().describe(
        "Required. The path to a directory in GCS that will eventually contain the results for this test. The requesting user must have write access on the bucket in the supplied path.",
      ).optional(),
    }).describe("A storage location within Google cloud storage (GCS).")
      .optional(),
    resultsUrl: z.string().describe(
      "Output only. URL to the results in the Firebase Web Console.",
    ).optional(),
    toolResultsExecution: z.object({
      executionId: z.string().describe(
        "Output only. A tool results execution ID.",
      ).optional(),
      historyId: z.string().describe("Output only. A tool results history ID.")
        .optional(),
      projectId: z.string().describe(
        "Output only. The cloud project that owns the tool results execution.",
      ).optional(),
    }).describe(
      "Represents a tool results execution resource. This has the results of a TestMatrix.",
    ).optional(),
    toolResultsHistory: z.object({
      historyId: z.string().describe("Required. A tool results history ID.")
        .optional(),
      projectId: z.string().describe(
        "Required. The cloud project that owns the tool results history.",
      ).optional(),
    }).describe("Represents a tool results history resource.").optional(),
  }).describe("Locations where the results of running the test are stored.")
    .optional(),
  testSpecification: z.object({
    androidInstrumentationTest: z.object({
      appApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()).describe(
            "A list of.apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks.",
          ).optional(),
        }).describe("A single dynamic feature apk.").optional(),
        bundleLocation: z.object({
          gcsPath: z.string().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
      }).describe(
        "An Android App Bundle file format, containing a BundleConfig.pb file, a base module directory, zero or more dynamic feature module directories. See https://developer.android.com/guide/app-bundle/build for guidance on building App Bundles.",
      ).optional(),
      appPackageId: z.string().describe(
        "The java package for the application under test. The default value is determined by examining the application's manifest.",
      ).optional(),
      orchestratorOption: z.enum([
        "ORCHESTRATOR_OPTION_UNSPECIFIED",
        "USE_ORCHESTRATOR",
        "DO_NOT_USE_ORCHESTRATOR",
      ]).describe(
        "The option of whether running each test within its own invocation of instrumentation with Android Test Orchestrator or not. ** Orchestrator is only compatible with AndroidJUnitRunner version 1.1 or higher! ** Orchestrator offers the following benefits: - No shared state - Crashes are isolated - Logs are scoped per test See for more information about Android Test Orchestrator. If not set, the test will be run without the orchestrator.",
      ).optional(),
      shardingOption: z.object({
        manualSharding: z.object({
          testTargetsForShard: z.array(z.unknown()).describe(
            "Required. Group of packages, classes, and/or test methods to be run for each manually-created shard. You must specify at least one shard if this field is present. When you select one or more physical devices, the number of repeated test_targets_for_shard must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500.",
          ).optional(),
        }).describe(
          "Shards test cases into the specified groups of packages, classes, and/or methods. With manual sharding enabled, specifying test targets via environment_variables or in InstrumentationTest is invalid.",
        ).optional(),
        smartSharding: z.object({
          targetedShardDuration: z.string().describe(
            "The amount of time tests within a shard should take. Default: 300 seconds (5 minutes). The minimum allowed: 120 seconds (2 minutes). The shard count is dynamically set based on time, up to the maximum shard limit (described below). To guarantee at least one test case for each shard, the number of shards will not exceed the number of test cases. Shard duration will be exceeded if: - The maximum shard limit is reached and there is more calculated test time remaining to allocate into shards. - Any individual test is estimated to be longer than the targeted shard duration. Shard duration is not guaranteed because smart sharding uses test case history and default durations which may not be accurate. The rules for finding the test case timing records are: - If the service has processed a test case in the last 30 days, the record of the latest successful test case will be used. - For new test cases, the average duration of other known test cases will be used. - If there are no previous test case timing records available, the default test case duration is 15 seconds. Because the actual shard duration can exceed the targeted shard duration, we recommend that you set the targeted value at least 5 minutes less than the maximum allowed test timeout (45 minutes for physical devices and 60 minutes for virtual), or that you use the custom test timeout value that you set. This approach avoids cancelling the shard before all tests can finish. Note that there is a limit for maximum number of shards. When you select one or more physical devices, the number of shards must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500. To guarantee at least one test case for per shard, the number of shards will not exceed the number of test cases. Each shard created counts toward daily test quota.",
          ).optional(),
        }).describe("Shards test based on previous test case timing records.")
          .optional(),
        uniformSharding: z.object({
          numShards: z.number().int().describe(
            "Required. The total number of shards to create. This must always be a positive number that is no greater than the total number of test cases. When you select one or more physical devices, the number of shards must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500.",
          ).optional(),
        }).describe(
          'Uniformly shards test cases given a total number of shards. For instrumentation tests, it will be translated to "-e numShard" and "-e shardIndex" AndroidJUnitRunner arguments. With uniform sharding enabled, specifying either of these sharding arguments via `environment_variables` is invalid. Based on the sharding mechanism AndroidJUnitRunner uses, there is no guarantee that test cases will be distributed uniformly across all shards.',
        ).optional(),
      }).describe("Options for enabling sharding.").optional(),
      testApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      testPackageId: z.string().describe(
        "The java package for the test to be executed. The default value is determined by examining the application's manifest.",
      ).optional(),
      testRunnerClass: z.string().describe(
        "The InstrumentationTestRunner class. The default value is determined by examining the application's manifest.",
      ).optional(),
      testTargets: z.array(z.string()).describe(
        'Each target must be fully qualified with the package name or class name, in one of these formats: - "package package_name" - "class package_name.class_name" - "class package_name.class_name#method_name" If empty, all targets in the module will be run.',
      ).optional(),
    }).describe(
      "A test of an Android application that can control an Android component independently of its normal lifecycle. Android instrumentation tests run an application APK and test APK inside the same process on a virtual or physical AndroidDevice. They also specify a test runner class, such as com.google.GoogleTestRunner, which can vary on the specific instrumentation framework chosen. See for more information on types of Android tests.",
    ).optional(),
    androidRoboTest: z.object({
      appApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()).describe(
            "A list of.apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks.",
          ).optional(),
        }).describe("A single dynamic feature apk.").optional(),
        bundleLocation: z.object({
          gcsPath: z.string().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
      }).describe(
        "An Android App Bundle file format, containing a BundleConfig.pb file, a base module directory, zero or more dynamic feature module directories. See https://developer.android.com/guide/app-bundle/build for guidance on building App Bundles.",
      ).optional(),
      appInitialActivity: z.string().describe(
        "The initial activity that should be used to start the app.",
      ).optional(),
      appPackageId: z.string().describe(
        "The java package for the application under test. The default value is determined by examining the application's manifest.",
      ).optional(),
      maxDepth: z.number().int().describe(
        "The max depth of the traversal stack Robo can explore. Needs to be at least 2 to make Robo explore the app beyond the first activity. Default is 50.",
      ).optional(),
      maxSteps: z.number().int().describe(
        "The max number of steps Robo can execute. Default is no limit.",
      ).optional(),
      roboDirectives: z.array(z.object({
        actionType: z.enum([
          "ACTION_TYPE_UNSPECIFIED",
          "SINGLE_CLICK",
          "ENTER_TEXT",
          "IGNORE",
        ]).describe(
          "Required. The type of action that Robo should perform on the specified element.",
        ).optional(),
        inputText: z.string().describe(
          "The text that Robo is directed to set. If left empty, the directive will be treated as a CLICK on the element matching the resource_name.",
        ).optional(),
        resourceName: z.string().describe(
          'Required. The android resource name of the target UI element. For example, in Java: R.string.foo in xml: @string/foo Only the "foo" part is needed. Reference doc: https://developer.android.com/guide/topics/resources/accessing-resources.html',
        ).optional(),
      })).describe(
        "A set of directives Robo should apply during the crawl. This allows users to customize the crawl. For example, the username and password for a test account can be provided.",
      ).optional(),
      roboMode: z.enum([
        "ROBO_MODE_UNSPECIFIED",
        "ROBO_VERSION_1",
        "ROBO_VERSION_2",
      ]).describe(
        "The mode in which Robo should run. Most clients should allow the server to populate this field automatically.",
      ).optional(),
      roboScript: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      startingIntents: z.array(z.object({
        launcherActivity: z.object({}).describe(
          "Specifies an intent that starts the main launcher activity.",
        ).optional(),
        noActivity: z.object({}).describe("Skips the starting activity")
          .optional(),
        startActivity: z.object({
          action: z.unknown().describe(
            "Action name. Required for START_ACTIVITY.",
          ).optional(),
          categories: z.unknown().describe(
            "Intent categories to set on the intent.",
          ).optional(),
          uri: z.unknown().describe("URI for the action.").optional(),
        }).describe(
          "A starting intent specified by an action, uri, and categories.",
        ).optional(),
        timeout: z.string().describe("Timeout in seconds for each intent.")
          .optional(),
      })).describe(
        "The intents used to launch the app for the crawl. If none are provided, then the main launcher activity is launched. If some are provided, then only those provided are launched (the main launcher activity must be provided explicitly).",
      ).optional(),
    }).describe(
      "A test of an android application that explores the application on a virtual or physical Android Device, finding culprits and crashes as it goes.",
    ).optional(),
    androidTestLoop: z.object({
      appApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()).describe(
            "A list of.apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks.",
          ).optional(),
        }).describe("A single dynamic feature apk.").optional(),
        bundleLocation: z.object({
          gcsPath: z.string().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
      }).describe(
        "An Android App Bundle file format, containing a BundleConfig.pb file, a base module directory, zero or more dynamic feature module directories. See https://developer.android.com/guide/app-bundle/build for guidance on building App Bundles.",
      ).optional(),
      appPackageId: z.string().describe(
        "The java package for the application under test. The default is determined by examining the application's manifest.",
      ).optional(),
      scenarioLabels: z.array(z.string()).describe(
        "The list of scenario labels that should be run during the test. The scenario labels should map to labels defined in the application's manifest. For example, player_experience and com.google.test.loops.player_experience add all of the loops labeled in the manifest with the com.google.test.loops.player_experience name to the execution. Scenarios can also be specified in the scenarios field.",
      ).optional(),
      scenarios: z.array(z.number().int()).describe(
        "The list of scenarios that should be run during the test. The default is all test loops, derived from the application's manifest.",
      ).optional(),
    }).describe(
      "A test of an Android Application with a Test Loop. The intent \\ will be implicitly added, since Games is the only user of this api, for the time being.",
    ).optional(),
    disablePerformanceMetrics: z.boolean().describe(
      "Disables performance metrics recording. May reduce test latency.",
    ).optional(),
    disableVideoRecording: z.boolean().describe(
      "Disables video recording. May reduce test latency.",
    ).optional(),
    iosRoboTest: z.object({
      appBundleId: z.string().describe(
        'The bundle ID for the app-under-test. This is determined by examining the application\'s "Info.plist" file.',
      ).optional(),
      appIpa: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      roboScript: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
    }).describe("A test that explores an iOS application on an iOS device.")
      .optional(),
    iosTestLoop: z.object({
      appBundleId: z.string().describe(
        "Output only. The bundle id for the application under test.",
      ).optional(),
      appIpa: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      scenarios: z.array(z.number().int()).describe(
        "The list of scenarios that should be run during the test. Defaults to the single scenario 0 if unspecified.",
      ).optional(),
    }).describe(
      "A test of an iOS application that implements one or more game loop scenarios. This test type accepts an archived application (.ipa file) and a list of integer scenarios that will be executed on the app sequentially.",
    ).optional(),
    iosTestSetup: z.object({
      additionalIpas: z.array(z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      })).describe(
        "iOS apps to install in addition to those being directly tested.",
      ).optional(),
      networkProfile: z.string().describe(
        "The network traffic profile used for running the test. Available network profiles can be queried by using the NETWORK_CONFIGURATION environment type when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog.",
      ).optional(),
      pullDirectories: z.array(z.object({
        bundleId: z.string().describe(
          "The bundle id of the app where this file lives. iOS apps sandbox their own filesystem, so app files must specify which app installed on the device.",
        ).optional(),
        content: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        devicePath: z.string().describe(
          "Location of the file on the device, inside the app's sandboxed filesystem",
        ).optional(),
      })).describe(
        "List of directories on the device to upload to Cloud Storage at the end of the test. Directories should either be in a shared directory (such as /private/var/mobile/Media) or within an accessible directory inside the app's filesystem (such as /Documents) by specifying the bundle ID.",
      ).optional(),
      pushFiles: z.array(z.object({
        bundleId: z.string().describe(
          "The bundle id of the app where this file lives. iOS apps sandbox their own filesystem, so app files must specify which app installed on the device.",
        ).optional(),
        content: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        devicePath: z.string().describe(
          "Location of the file on the device, inside the app's sandboxed filesystem",
        ).optional(),
      })).describe(
        "List of files to push to the device before starting the test.",
      ).optional(),
    }).describe(
      "A description of how to set up an iOS device prior to running the test.",
    ).optional(),
    iosXcTest: z.object({
      appBundleId: z.string().describe(
        "Output only. The bundle id for the application under test.",
      ).optional(),
      testSpecialEntitlements: z.boolean().describe(
        "The option to test special app entitlements. Setting this would re-sign the app having special entitlements with an explicit application-identifier. Currently supports testing aps-environment entitlement.",
      ).optional(),
      testsZip: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      xcodeVersion: z.string().describe(
        "The Xcode version that should be used for the test. Use the TestEnvironmentDiscoveryService to get supported options. Defaults to the latest Xcode version Firebase Test Lab supports.",
      ).optional(),
      xctestrun: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
    }).describe(
      'A test of an iOS application that uses the XCTest framework. Xcode supports the option to "build for testing", which generates an.xctestrun file that contains a test specification (arguments, test methods, etc). This test type accepts a zip file containing the.xctestrun file and the corresponding contents of the Build/Products directory that contains all the binaries needed to run the tests.',
    ).optional(),
    testSetup: z.object({
      account: z.object({
        googleAuto: z.object({}).describe(
          "Enables automatic Google account login. If set, the service automatically generates a Google test account and adds it to the device, before executing the test. Note that test accounts might be reused. Many applications show their full set of functionalities when an account is present on the device. Logging into the device with these generated accounts allows testing more functionalities.",
        ).optional(),
      }).describe("Identifies an account and how to log into it.").optional(),
      additionalApks: z.array(z.object({
        location: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        packageName: z.string().describe(
          "The java package for the APK to be installed. Value is determined by examining the application's manifest.",
        ).optional(),
      })).describe(
        "APKs to install in addition to those being directly tested. These will be installed after the app under test. Limited to a combined total of 100 initial setup and additional files.",
      ).optional(),
      directoriesToPull: z.array(z.string()).describe(
        "List of directories on the device to upload to GCS at the end of the test; they must be absolute paths under /sdcard, /storage or /data/local/tmp. Path names are restricted to characters a-z A-Z 0-9 _ -. + and / Note: The paths /sdcard and /data will be made available and treated as implicit path substitutions. E.g. if /sdcard on a particular device does not map to external storage, the system will replace it with the external storage path prefix for that device.",
      ).optional(),
      dontAutograntPermissions: z.boolean().describe(
        "Whether to prevent all runtime permissions to be granted at app install",
      ).optional(),
      environmentVariables: z.array(z.object({
        key: z.string().describe("Key for the environment variable.")
          .optional(),
        value: z.string().describe("Value for the environment variable.")
          .optional(),
      })).describe(
        "Environment variables to set for the test (only applicable for instrumentation tests).",
      ).optional(),
      filesToPush: z.array(z.object({
        obbFile: z.object({
          obb: z.unknown().describe(
            "A reference to a file, used for user inputs.",
          ).optional(),
          obbFileName: z.unknown().describe(
            "Required. OBB file name which must conform to the format as specified by Android e.g. [main|patch].0300110.com.example.android.obb which will be installed into \\/Android/obb/\\/ on the device.",
          ).optional(),
        }).describe(
          "An opaque binary blob file to install on the device before the test starts.",
        ).optional(),
        regularFile: z.object({
          content: z.unknown().describe(
            "A reference to a file, used for user inputs.",
          ).optional(),
          devicePath: z.unknown().describe(
            "Required. Where to put the content on the device. Must be an absolute, allowlisted path. If the file exists, it will be replaced. The following device-side directories and any of their subdirectories are allowlisted: ${EXTERNAL_STORAGE}, /sdcard ${ANDROID_DATA}/local/tmp, or /data/local/tmp Specifying a path outside of these directory trees is invalid. The paths /sdcard and /data will be made available and treated as implicit path substitutions. E.g. if /sdcard on a particular device does not map to external storage, the system will replace it with the external storage path prefix for that device and copy the file there. It is strongly advised to use the Environment API in app and test code to access files on the device in a portable way.",
          ).optional(),
        }).describe(
          "A file or directory to install on the device before the test starts.",
        ).optional(),
      })).describe(
        "List of files to push to the device before starting the test.",
      ).optional(),
      initialSetupApks: z.array(z.object({
        location: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        packageName: z.string().describe(
          "The java package for the APK to be installed. Value is determined by examining the application's manifest.",
        ).optional(),
      })).describe(
        "Optional. Initial setup APKs to install before the app under test is installed. Limited to a combined total of 100 initial setup and additional files.",
      ).optional(),
      networkProfile: z.string().describe(
        "The network traffic profile used for running the test. Available network profiles can be queried by using the NETWORK_CONFIGURATION environment type when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog.",
      ).optional(),
      systrace: z.object({
        durationSeconds: z.number().int().describe(
          "Systrace duration in seconds. Should be between 1 and 30 seconds. 0 disables systrace.",
        ).optional(),
      }).optional(),
    }).describe(
      "A description of how to set up the Android device prior to running the test.",
    ).optional(),
    testTimeout: z.string().describe(
      "Max time a test execution is allowed to run before it is automatically cancelled. The default value is 5 min.",
    ).optional(),
  }).describe("A description of how to run the test.").optional(),
  requestId: z.string().describe(
    "A string id used to detect duplicated requests. Ids are automatically scoped to a project, so users should ensure the ID is unique per-project. A UUID is recommended. Optional, but strongly recommended.",
  ).optional(),
});

const StateSchema = z.object({
  clientInfo: z.object({
    clientInfoDetails: z.array(z.object({
      key: z.string(),
      value: z.string(),
    })),
    name: z.string(),
  }).optional(),
  environmentMatrix: z.object({
    androidDeviceList: z.object({
      androidDevices: z.array(z.object({
        androidModelId: z.string(),
        androidVersionId: z.string(),
        locale: z.string(),
        orientation: z.string(),
      })),
    }),
    androidMatrix: z.object({
      androidModelIds: z.array(z.string()),
      androidVersionIds: z.array(z.string()),
      locales: z.array(z.string()),
      orientations: z.array(z.string()),
    }),
    iosDeviceList: z.object({
      iosDevices: z.array(z.object({
        iosModelId: z.string(),
        iosVersionId: z.string(),
        locale: z.string(),
        orientation: z.string(),
      })),
    }),
  }).optional(),
  extendedInvalidMatrixDetails: z.array(z.object({
    message: z.string(),
    reason: z.string(),
  })).optional(),
  failFast: z.boolean().optional(),
  flakyTestAttempts: z.number().optional(),
  invalidMatrixDetails: z.string().optional(),
  outcomeSummary: z.string().optional(),
  projectId: z.string().optional(),
  resultStorage: z.object({
    googleCloudStorage: z.object({
      gcsPath: z.string(),
    }),
    resultsUrl: z.string(),
    toolResultsExecution: z.object({
      executionId: z.string(),
      historyId: z.string(),
      projectId: z.string(),
    }),
    toolResultsHistory: z.object({
      historyId: z.string(),
      projectId: z.string(),
    }),
  }).optional(),
  state: z.string().optional(),
  testExecutions: z.array(z.object({
    environment: z.object({
      androidDevice: z.object({
        androidModelId: z.string(),
        androidVersionId: z.string(),
        locale: z.string(),
        orientation: z.string(),
      }),
      iosDevice: z.object({
        iosModelId: z.string(),
        iosVersionId: z.string(),
        locale: z.string(),
        orientation: z.string(),
      }),
    }),
    id: z.string(),
    matrixId: z.string(),
    projectId: z.string(),
    shard: z.object({
      estimatedShardDuration: z.string(),
      numShards: z.number(),
      shardIndex: z.number(),
      testTargetsForShard: z.object({
        testTargets: z.array(z.unknown()),
      }),
    }),
    state: z.string(),
    testDetails: z.object({
      errorMessage: z.string(),
      progressMessages: z.array(z.string()),
    }),
    testSpecification: z.object({
      androidInstrumentationTest: z.object({
        appApk: z.object({
          gcsPath: z.unknown(),
        }),
        appBundle: z.object({
          apks: z.unknown(),
          bundleLocation: z.unknown(),
        }),
        appPackageId: z.string(),
        orchestratorOption: z.string(),
        shardingOption: z.object({
          manualSharding: z.unknown(),
          smartSharding: z.unknown(),
          uniformSharding: z.unknown(),
        }),
        testApk: z.object({
          gcsPath: z.unknown(),
        }),
        testPackageId: z.string(),
        testRunnerClass: z.string(),
        testTargets: z.array(z.unknown()),
      }),
      androidRoboTest: z.object({
        appApk: z.object({
          gcsPath: z.unknown(),
        }),
        appBundle: z.object({
          apks: z.unknown(),
          bundleLocation: z.unknown(),
        }),
        appInitialActivity: z.string(),
        appPackageId: z.string(),
        maxDepth: z.number(),
        maxSteps: z.number(),
        roboDirectives: z.array(z.unknown()),
        roboMode: z.string(),
        roboScript: z.object({
          gcsPath: z.unknown(),
        }),
        startingIntents: z.array(z.unknown()),
      }),
      androidTestLoop: z.object({
        appApk: z.object({
          gcsPath: z.unknown(),
        }),
        appBundle: z.object({
          apks: z.unknown(),
          bundleLocation: z.unknown(),
        }),
        appPackageId: z.string(),
        scenarioLabels: z.array(z.unknown()),
        scenarios: z.array(z.unknown()),
      }),
      disablePerformanceMetrics: z.boolean(),
      disableVideoRecording: z.boolean(),
      iosRoboTest: z.object({
        appBundleId: z.string(),
        appIpa: z.object({
          gcsPath: z.unknown(),
        }),
        roboScript: z.object({
          gcsPath: z.unknown(),
        }),
      }),
      iosTestLoop: z.object({
        appBundleId: z.string(),
        appIpa: z.object({
          gcsPath: z.unknown(),
        }),
        scenarios: z.array(z.unknown()),
      }),
      iosTestSetup: z.object({
        additionalIpas: z.array(z.unknown()),
        networkProfile: z.string(),
        pullDirectories: z.array(z.unknown()),
        pushFiles: z.array(z.unknown()),
      }),
      iosXcTest: z.object({
        appBundleId: z.string(),
        testSpecialEntitlements: z.boolean(),
        testsZip: z.object({
          gcsPath: z.unknown(),
        }),
        xcodeVersion: z.string(),
        xctestrun: z.object({
          gcsPath: z.unknown(),
        }),
      }),
      testSetup: z.object({
        account: z.object({
          googleAuto: z.unknown(),
        }),
        additionalApks: z.array(z.unknown()),
        directoriesToPull: z.array(z.unknown()),
        dontAutograntPermissions: z.boolean(),
        environmentVariables: z.array(z.unknown()),
        filesToPush: z.array(z.unknown()),
        initialSetupApks: z.array(z.unknown()),
        networkProfile: z.string(),
        systrace: z.object({
          durationSeconds: z.unknown(),
        }),
      }),
      testTimeout: z.string(),
    }),
    timestamp: z.string(),
    toolResultsStep: z.object({
      executionId: z.string(),
      historyId: z.string(),
      projectId: z.string(),
      stepId: z.string(),
    }),
  })).optional(),
  testMatrixId: z.string().optional(),
  testSpecification: z.object({
    androidInstrumentationTest: z.object({
      appApk: z.object({
        gcsPath: z.string(),
      }),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()),
        }),
        bundleLocation: z.object({
          gcsPath: z.string(),
        }),
      }),
      appPackageId: z.string(),
      orchestratorOption: z.string(),
      shardingOption: z.object({
        manualSharding: z.object({
          testTargetsForShard: z.array(z.unknown()),
        }),
        smartSharding: z.object({
          targetedShardDuration: z.string(),
        }),
        uniformSharding: z.object({
          numShards: z.number(),
        }),
      }),
      testApk: z.object({
        gcsPath: z.string(),
      }),
      testPackageId: z.string(),
      testRunnerClass: z.string(),
      testTargets: z.array(z.string()),
    }),
    androidRoboTest: z.object({
      appApk: z.object({
        gcsPath: z.string(),
      }),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()),
        }),
        bundleLocation: z.object({
          gcsPath: z.string(),
        }),
      }),
      appInitialActivity: z.string(),
      appPackageId: z.string(),
      maxDepth: z.number(),
      maxSteps: z.number(),
      roboDirectives: z.array(z.object({
        actionType: z.string(),
        inputText: z.string(),
        resourceName: z.string(),
      })),
      roboMode: z.string(),
      roboScript: z.object({
        gcsPath: z.string(),
      }),
      startingIntents: z.array(z.object({
        launcherActivity: z.object({}),
        noActivity: z.object({}),
        startActivity: z.object({
          action: z.unknown(),
          categories: z.unknown(),
          uri: z.unknown(),
        }),
        timeout: z.string(),
      })),
    }),
    androidTestLoop: z.object({
      appApk: z.object({
        gcsPath: z.string(),
      }),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()),
        }),
        bundleLocation: z.object({
          gcsPath: z.string(),
        }),
      }),
      appPackageId: z.string(),
      scenarioLabels: z.array(z.string()),
      scenarios: z.array(z.number()),
    }),
    disablePerformanceMetrics: z.boolean(),
    disableVideoRecording: z.boolean(),
    iosRoboTest: z.object({
      appBundleId: z.string(),
      appIpa: z.object({
        gcsPath: z.string(),
      }),
      roboScript: z.object({
        gcsPath: z.string(),
      }),
    }),
    iosTestLoop: z.object({
      appBundleId: z.string(),
      appIpa: z.object({
        gcsPath: z.string(),
      }),
      scenarios: z.array(z.number()),
    }),
    iosTestSetup: z.object({
      additionalIpas: z.array(z.object({
        gcsPath: z.string(),
      })),
      networkProfile: z.string(),
      pullDirectories: z.array(z.object({
        bundleId: z.string(),
        content: z.object({
          gcsPath: z.unknown(),
        }),
        devicePath: z.string(),
      })),
      pushFiles: z.array(z.object({
        bundleId: z.string(),
        content: z.object({
          gcsPath: z.unknown(),
        }),
        devicePath: z.string(),
      })),
    }),
    iosXcTest: z.object({
      appBundleId: z.string(),
      testSpecialEntitlements: z.boolean(),
      testsZip: z.object({
        gcsPath: z.string(),
      }),
      xcodeVersion: z.string(),
      xctestrun: z.object({
        gcsPath: z.string(),
      }),
    }),
    testSetup: z.object({
      account: z.object({
        googleAuto: z.object({}),
      }),
      additionalApks: z.array(z.object({
        location: z.object({
          gcsPath: z.unknown(),
        }),
        packageName: z.string(),
      })),
      directoriesToPull: z.array(z.string()),
      dontAutograntPermissions: z.boolean(),
      environmentVariables: z.array(z.object({
        key: z.string(),
        value: z.string(),
      })),
      filesToPush: z.array(z.object({
        obbFile: z.object({
          obb: z.unknown(),
          obbFileName: z.unknown(),
        }),
        regularFile: z.object({
          content: z.unknown(),
          devicePath: z.unknown(),
        }),
      })),
      initialSetupApks: z.array(z.object({
        location: z.object({
          gcsPath: z.unknown(),
        }),
        packageName: z.string(),
      })),
      networkProfile: z.string(),
      systrace: z.object({
        durationSeconds: z.number(),
      }),
    }),
    testTimeout: z.string(),
  }).optional(),
  timestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  clientInfo: z.object({
    clientInfoDetails: z.array(z.object({
      key: z.string().describe(
        "Required. The key of detailed client information.",
      ).optional(),
      value: z.string().describe(
        "Required. The value of detailed client information.",
      ).optional(),
    })).describe("The list of detailed information about client.").optional(),
    name: z.string().describe("Required. Client name, such as gcloud.")
      .optional(),
  }).describe("Information about the client which invoked the test.")
    .optional(),
  environmentMatrix: z.object({
    androidDeviceList: z.object({
      androidDevices: z.array(z.object({
        androidModelId: z.string().describe(
          "Required. The id of the Android device to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        androidVersionId: z.string().describe(
          "Required. The id of the Android OS version to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        locale: z.string().describe(
          "Required. The locale the test device used for testing. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        orientation: z.string().describe(
          "Required. How the device is oriented during the test. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
      })).describe("Required. A list of Android devices.").optional(),
    }).describe(
      "A list of Android device configurations in which the test is to be executed.",
    ).optional(),
    androidMatrix: z.object({
      androidModelIds: z.array(z.string()).describe(
        "Required. The ids of the set of Android device to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
      androidVersionIds: z.array(z.string()).describe(
        "Required. The ids of the set of Android OS version to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
      locales: z.array(z.string()).describe(
        "Required. The set of locales the test device will enable for testing. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
      orientations: z.array(z.string()).describe(
        "Required. The set of orientations to test with. Use the TestEnvironmentDiscoveryService to get supported options.",
      ).optional(),
    }).describe(
      "A set of Android device configuration permutations is defined by the the cross-product of the given axes. Internally, the given AndroidMatrix will be expanded into a set of AndroidDevices. Only supported permutations will be instantiated. Invalid permutations (e.g., incompatible models/versions) are ignored.",
    ).optional(),
    iosDeviceList: z.object({
      iosDevices: z.array(z.object({
        iosModelId: z.string().describe(
          "Required. The id of the iOS device to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        iosVersionId: z.string().describe(
          "Required. The id of the iOS major software version to be used. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        locale: z.string().describe(
          "Required. The locale the test device used for testing. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
        orientation: z.string().describe(
          "Required. How the device is oriented during the test. Use the TestEnvironmentDiscoveryService to get supported options.",
        ).optional(),
      })).describe("Required. A list of iOS devices.").optional(),
    }).describe(
      "A list of iOS device configurations in which the test is to be executed.",
    ).optional(),
  }).describe("The matrix of environments in which the test is to be executed.")
    .optional(),
  failFast: z.boolean().describe(
    "If true, only a single attempt at most will be made to run each execution/shard in the matrix. Flaky test attempts are not affected. Normally, 2 or more attempts are made if a potential infrastructure issue is detected. This feature is for latency sensitive workloads. The incidence of execution failures may be significantly greater for fail-fast matrices and support is more limited because of that expectation.",
  ).optional(),
  flakyTestAttempts: z.number().int().describe(
    "The number of times a TestExecution should be re-attempted if one or more of its test cases fail for any reason. The maximum number of reruns allowed is 10. Default is 0, which implies no reruns.",
  ).optional(),
  projectId: z.string().describe("The cloud project that owns the test matrix.")
    .optional(),
  resultStorage: z.object({
    googleCloudStorage: z.object({
      gcsPath: z.string().describe(
        "Required. The path to a directory in GCS that will eventually contain the results for this test. The requesting user must have write access on the bucket in the supplied path.",
      ).optional(),
    }).describe("A storage location within Google cloud storage (GCS).")
      .optional(),
    resultsUrl: z.string().describe(
      "Output only. URL to the results in the Firebase Web Console.",
    ).optional(),
    toolResultsExecution: z.object({
      executionId: z.string().describe(
        "Output only. A tool results execution ID.",
      ).optional(),
      historyId: z.string().describe("Output only. A tool results history ID.")
        .optional(),
      projectId: z.string().describe(
        "Output only. The cloud project that owns the tool results execution.",
      ).optional(),
    }).describe(
      "Represents a tool results execution resource. This has the results of a TestMatrix.",
    ).optional(),
    toolResultsHistory: z.object({
      historyId: z.string().describe("Required. A tool results history ID.")
        .optional(),
      projectId: z.string().describe(
        "Required. The cloud project that owns the tool results history.",
      ).optional(),
    }).describe("Represents a tool results history resource.").optional(),
  }).describe("Locations where the results of running the test are stored.")
    .optional(),
  testSpecification: z.object({
    androidInstrumentationTest: z.object({
      appApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()).describe(
            "A list of.apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks.",
          ).optional(),
        }).describe("A single dynamic feature apk.").optional(),
        bundleLocation: z.object({
          gcsPath: z.string().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
      }).describe(
        "An Android App Bundle file format, containing a BundleConfig.pb file, a base module directory, zero or more dynamic feature module directories. See https://developer.android.com/guide/app-bundle/build for guidance on building App Bundles.",
      ).optional(),
      appPackageId: z.string().describe(
        "The java package for the application under test. The default value is determined by examining the application's manifest.",
      ).optional(),
      orchestratorOption: z.enum([
        "ORCHESTRATOR_OPTION_UNSPECIFIED",
        "USE_ORCHESTRATOR",
        "DO_NOT_USE_ORCHESTRATOR",
      ]).describe(
        "The option of whether running each test within its own invocation of instrumentation with Android Test Orchestrator or not. ** Orchestrator is only compatible with AndroidJUnitRunner version 1.1 or higher! ** Orchestrator offers the following benefits: - No shared state - Crashes are isolated - Logs are scoped per test See for more information about Android Test Orchestrator. If not set, the test will be run without the orchestrator.",
      ).optional(),
      shardingOption: z.object({
        manualSharding: z.object({
          testTargetsForShard: z.array(z.unknown()).describe(
            "Required. Group of packages, classes, and/or test methods to be run for each manually-created shard. You must specify at least one shard if this field is present. When you select one or more physical devices, the number of repeated test_targets_for_shard must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500.",
          ).optional(),
        }).describe(
          "Shards test cases into the specified groups of packages, classes, and/or methods. With manual sharding enabled, specifying test targets via environment_variables or in InstrumentationTest is invalid.",
        ).optional(),
        smartSharding: z.object({
          targetedShardDuration: z.string().describe(
            "The amount of time tests within a shard should take. Default: 300 seconds (5 minutes). The minimum allowed: 120 seconds (2 minutes). The shard count is dynamically set based on time, up to the maximum shard limit (described below). To guarantee at least one test case for each shard, the number of shards will not exceed the number of test cases. Shard duration will be exceeded if: - The maximum shard limit is reached and there is more calculated test time remaining to allocate into shards. - Any individual test is estimated to be longer than the targeted shard duration. Shard duration is not guaranteed because smart sharding uses test case history and default durations which may not be accurate. The rules for finding the test case timing records are: - If the service has processed a test case in the last 30 days, the record of the latest successful test case will be used. - For new test cases, the average duration of other known test cases will be used. - If there are no previous test case timing records available, the default test case duration is 15 seconds. Because the actual shard duration can exceed the targeted shard duration, we recommend that you set the targeted value at least 5 minutes less than the maximum allowed test timeout (45 minutes for physical devices and 60 minutes for virtual), or that you use the custom test timeout value that you set. This approach avoids cancelling the shard before all tests can finish. Note that there is a limit for maximum number of shards. When you select one or more physical devices, the number of shards must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500. To guarantee at least one test case for per shard, the number of shards will not exceed the number of test cases. Each shard created counts toward daily test quota.",
          ).optional(),
        }).describe("Shards test based on previous test case timing records.")
          .optional(),
        uniformSharding: z.object({
          numShards: z.number().int().describe(
            "Required. The total number of shards to create. This must always be a positive number that is no greater than the total number of test cases. When you select one or more physical devices, the number of shards must be <= 50. When you select one or more ARM virtual devices, it must be <= 200. When you select only x86 virtual devices, it must be <= 500.",
          ).optional(),
        }).describe(
          'Uniformly shards test cases given a total number of shards. For instrumentation tests, it will be translated to "-e numShard" and "-e shardIndex" AndroidJUnitRunner arguments. With uniform sharding enabled, specifying either of these sharding arguments via `environment_variables` is invalid. Based on the sharding mechanism AndroidJUnitRunner uses, there is no guarantee that test cases will be distributed uniformly across all shards.',
        ).optional(),
      }).describe("Options for enabling sharding.").optional(),
      testApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      testPackageId: z.string().describe(
        "The java package for the test to be executed. The default value is determined by examining the application's manifest.",
      ).optional(),
      testRunnerClass: z.string().describe(
        "The InstrumentationTestRunner class. The default value is determined by examining the application's manifest.",
      ).optional(),
      testTargets: z.array(z.string()).describe(
        'Each target must be fully qualified with the package name or class name, in one of these formats: - "package package_name" - "class package_name.class_name" - "class package_name.class_name#method_name" If empty, all targets in the module will be run.',
      ).optional(),
    }).describe(
      "A test of an Android application that can control an Android component independently of its normal lifecycle. Android instrumentation tests run an application APK and test APK inside the same process on a virtual or physical AndroidDevice. They also specify a test runner class, such as com.google.GoogleTestRunner, which can vary on the specific instrumentation framework chosen. See for more information on types of Android tests.",
    ).optional(),
    androidRoboTest: z.object({
      appApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()).describe(
            "A list of.apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks.",
          ).optional(),
        }).describe("A single dynamic feature apk.").optional(),
        bundleLocation: z.object({
          gcsPath: z.string().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
      }).describe(
        "An Android App Bundle file format, containing a BundleConfig.pb file, a base module directory, zero or more dynamic feature module directories. See https://developer.android.com/guide/app-bundle/build for guidance on building App Bundles.",
      ).optional(),
      appInitialActivity: z.string().describe(
        "The initial activity that should be used to start the app.",
      ).optional(),
      appPackageId: z.string().describe(
        "The java package for the application under test. The default value is determined by examining the application's manifest.",
      ).optional(),
      maxDepth: z.number().int().describe(
        "The max depth of the traversal stack Robo can explore. Needs to be at least 2 to make Robo explore the app beyond the first activity. Default is 50.",
      ).optional(),
      maxSteps: z.number().int().describe(
        "The max number of steps Robo can execute. Default is no limit.",
      ).optional(),
      roboDirectives: z.array(z.object({
        actionType: z.enum([
          "ACTION_TYPE_UNSPECIFIED",
          "SINGLE_CLICK",
          "ENTER_TEXT",
          "IGNORE",
        ]).describe(
          "Required. The type of action that Robo should perform on the specified element.",
        ).optional(),
        inputText: z.string().describe(
          "The text that Robo is directed to set. If left empty, the directive will be treated as a CLICK on the element matching the resource_name.",
        ).optional(),
        resourceName: z.string().describe(
          'Required. The android resource name of the target UI element. For example, in Java: R.string.foo in xml: @string/foo Only the "foo" part is needed. Reference doc: https://developer.android.com/guide/topics/resources/accessing-resources.html',
        ).optional(),
      })).describe(
        "A set of directives Robo should apply during the crawl. This allows users to customize the crawl. For example, the username and password for a test account can be provided.",
      ).optional(),
      roboMode: z.enum([
        "ROBO_MODE_UNSPECIFIED",
        "ROBO_VERSION_1",
        "ROBO_VERSION_2",
      ]).describe(
        "The mode in which Robo should run. Most clients should allow the server to populate this field automatically.",
      ).optional(),
      roboScript: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      startingIntents: z.array(z.object({
        launcherActivity: z.object({}).describe(
          "Specifies an intent that starts the main launcher activity.",
        ).optional(),
        noActivity: z.object({}).describe("Skips the starting activity")
          .optional(),
        startActivity: z.object({
          action: z.unknown().describe(
            "Action name. Required for START_ACTIVITY.",
          ).optional(),
          categories: z.unknown().describe(
            "Intent categories to set on the intent.",
          ).optional(),
          uri: z.unknown().describe("URI for the action.").optional(),
        }).describe(
          "A starting intent specified by an action, uri, and categories.",
        ).optional(),
        timeout: z.string().describe("Timeout in seconds for each intent.")
          .optional(),
      })).describe(
        "The intents used to launch the app for the crawl. If none are provided, then the main launcher activity is launched. If some are provided, then only those provided are launched (the main launcher activity must be provided explicitly).",
      ).optional(),
    }).describe(
      "A test of an android application that explores the application on a virtual or physical Android Device, finding culprits and crashes as it goes.",
    ).optional(),
    androidTestLoop: z.object({
      appApk: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      appBundle: z.object({
        apks: z.object({
          bundleSplits: z.array(z.unknown()).describe(
            "A list of.apk files generated by bundletool to install to the device under test as a single android app with adb install-multiple. If specified, requires one or more bundle_splits. The first split specified represents the base APK, while subsequent splits represent feature apks.",
          ).optional(),
        }).describe("A single dynamic feature apk.").optional(),
        bundleLocation: z.object({
          gcsPath: z.string().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
      }).describe(
        "An Android App Bundle file format, containing a BundleConfig.pb file, a base module directory, zero or more dynamic feature module directories. See https://developer.android.com/guide/app-bundle/build for guidance on building App Bundles.",
      ).optional(),
      appPackageId: z.string().describe(
        "The java package for the application under test. The default is determined by examining the application's manifest.",
      ).optional(),
      scenarioLabels: z.array(z.string()).describe(
        "The list of scenario labels that should be run during the test. The scenario labels should map to labels defined in the application's manifest. For example, player_experience and com.google.test.loops.player_experience add all of the loops labeled in the manifest with the com.google.test.loops.player_experience name to the execution. Scenarios can also be specified in the scenarios field.",
      ).optional(),
      scenarios: z.array(z.number().int()).describe(
        "The list of scenarios that should be run during the test. The default is all test loops, derived from the application's manifest.",
      ).optional(),
    }).describe(
      "A test of an Android Application with a Test Loop. The intent \\ will be implicitly added, since Games is the only user of this api, for the time being.",
    ).optional(),
    disablePerformanceMetrics: z.boolean().describe(
      "Disables performance metrics recording. May reduce test latency.",
    ).optional(),
    disableVideoRecording: z.boolean().describe(
      "Disables video recording. May reduce test latency.",
    ).optional(),
    iosRoboTest: z.object({
      appBundleId: z.string().describe(
        'The bundle ID for the app-under-test. This is determined by examining the application\'s "Info.plist" file.',
      ).optional(),
      appIpa: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      roboScript: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
    }).describe("A test that explores an iOS application on an iOS device.")
      .optional(),
    iosTestLoop: z.object({
      appBundleId: z.string().describe(
        "Output only. The bundle id for the application under test.",
      ).optional(),
      appIpa: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      scenarios: z.array(z.number().int()).describe(
        "The list of scenarios that should be run during the test. Defaults to the single scenario 0 if unspecified.",
      ).optional(),
    }).describe(
      "A test of an iOS application that implements one or more game loop scenarios. This test type accepts an archived application (.ipa file) and a list of integer scenarios that will be executed on the app sequentially.",
    ).optional(),
    iosTestSetup: z.object({
      additionalIpas: z.array(z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      })).describe(
        "iOS apps to install in addition to those being directly tested.",
      ).optional(),
      networkProfile: z.string().describe(
        "The network traffic profile used for running the test. Available network profiles can be queried by using the NETWORK_CONFIGURATION environment type when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog.",
      ).optional(),
      pullDirectories: z.array(z.object({
        bundleId: z.string().describe(
          "The bundle id of the app where this file lives. iOS apps sandbox their own filesystem, so app files must specify which app installed on the device.",
        ).optional(),
        content: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        devicePath: z.string().describe(
          "Location of the file on the device, inside the app's sandboxed filesystem",
        ).optional(),
      })).describe(
        "List of directories on the device to upload to Cloud Storage at the end of the test. Directories should either be in a shared directory (such as /private/var/mobile/Media) or within an accessible directory inside the app's filesystem (such as /Documents) by specifying the bundle ID.",
      ).optional(),
      pushFiles: z.array(z.object({
        bundleId: z.string().describe(
          "The bundle id of the app where this file lives. iOS apps sandbox their own filesystem, so app files must specify which app installed on the device.",
        ).optional(),
        content: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        devicePath: z.string().describe(
          "Location of the file on the device, inside the app's sandboxed filesystem",
        ).optional(),
      })).describe(
        "List of files to push to the device before starting the test.",
      ).optional(),
    }).describe(
      "A description of how to set up an iOS device prior to running the test.",
    ).optional(),
    iosXcTest: z.object({
      appBundleId: z.string().describe(
        "Output only. The bundle id for the application under test.",
      ).optional(),
      testSpecialEntitlements: z.boolean().describe(
        "The option to test special app entitlements. Setting this would re-sign the app having special entitlements with an explicit application-identifier. Currently supports testing aps-environment entitlement.",
      ).optional(),
      testsZip: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
      xcodeVersion: z.string().describe(
        "The Xcode version that should be used for the test. Use the TestEnvironmentDiscoveryService to get supported options. Defaults to the latest Xcode version Firebase Test Lab supports.",
      ).optional(),
      xctestrun: z.object({
        gcsPath: z.string().describe(
          "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
        ).optional(),
      }).describe("A reference to a file, used for user inputs.").optional(),
    }).describe(
      'A test of an iOS application that uses the XCTest framework. Xcode supports the option to "build for testing", which generates an.xctestrun file that contains a test specification (arguments, test methods, etc). This test type accepts a zip file containing the.xctestrun file and the corresponding contents of the Build/Products directory that contains all the binaries needed to run the tests.',
    ).optional(),
    testSetup: z.object({
      account: z.object({
        googleAuto: z.object({}).describe(
          "Enables automatic Google account login. If set, the service automatically generates a Google test account and adds it to the device, before executing the test. Note that test accounts might be reused. Many applications show their full set of functionalities when an account is present on the device. Logging into the device with these generated accounts allows testing more functionalities.",
        ).optional(),
      }).describe("Identifies an account and how to log into it.").optional(),
      additionalApks: z.array(z.object({
        location: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        packageName: z.string().describe(
          "The java package for the APK to be installed. Value is determined by examining the application's manifest.",
        ).optional(),
      })).describe(
        "APKs to install in addition to those being directly tested. These will be installed after the app under test. Limited to a combined total of 100 initial setup and additional files.",
      ).optional(),
      directoriesToPull: z.array(z.string()).describe(
        "List of directories on the device to upload to GCS at the end of the test; they must be absolute paths under /sdcard, /storage or /data/local/tmp. Path names are restricted to characters a-z A-Z 0-9 _ -. + and / Note: The paths /sdcard and /data will be made available and treated as implicit path substitutions. E.g. if /sdcard on a particular device does not map to external storage, the system will replace it with the external storage path prefix for that device.",
      ).optional(),
      dontAutograntPermissions: z.boolean().describe(
        "Whether to prevent all runtime permissions to be granted at app install",
      ).optional(),
      environmentVariables: z.array(z.object({
        key: z.string().describe("Key for the environment variable.")
          .optional(),
        value: z.string().describe("Value for the environment variable.")
          .optional(),
      })).describe(
        "Environment variables to set for the test (only applicable for instrumentation tests).",
      ).optional(),
      filesToPush: z.array(z.object({
        obbFile: z.object({
          obb: z.unknown().describe(
            "A reference to a file, used for user inputs.",
          ).optional(),
          obbFileName: z.unknown().describe(
            "Required. OBB file name which must conform to the format as specified by Android e.g. [main|patch].0300110.com.example.android.obb which will be installed into \\/Android/obb/\\/ on the device.",
          ).optional(),
        }).describe(
          "An opaque binary blob file to install on the device before the test starts.",
        ).optional(),
        regularFile: z.object({
          content: z.unknown().describe(
            "A reference to a file, used for user inputs.",
          ).optional(),
          devicePath: z.unknown().describe(
            "Required. Where to put the content on the device. Must be an absolute, allowlisted path. If the file exists, it will be replaced. The following device-side directories and any of their subdirectories are allowlisted: ${EXTERNAL_STORAGE}, /sdcard ${ANDROID_DATA}/local/tmp, or /data/local/tmp Specifying a path outside of these directory trees is invalid. The paths /sdcard and /data will be made available and treated as implicit path substitutions. E.g. if /sdcard on a particular device does not map to external storage, the system will replace it with the external storage path prefix for that device and copy the file there. It is strongly advised to use the Environment API in app and test code to access files on the device in a portable way.",
          ).optional(),
        }).describe(
          "A file or directory to install on the device before the test starts.",
        ).optional(),
      })).describe(
        "List of files to push to the device before starting the test.",
      ).optional(),
      initialSetupApks: z.array(z.object({
        location: z.object({
          gcsPath: z.unknown().describe(
            "A path to a file in Google Cloud Storage. Example: gs://build-app-1414623860166/app%40debug-unaligned.apk These paths are expected to be url encoded (percent encoding)",
          ).optional(),
        }).describe("A reference to a file, used for user inputs.").optional(),
        packageName: z.string().describe(
          "The java package for the APK to be installed. Value is determined by examining the application's manifest.",
        ).optional(),
      })).describe(
        "Optional. Initial setup APKs to install before the app under test is installed. Limited to a combined total of 100 initial setup and additional files.",
      ).optional(),
      networkProfile: z.string().describe(
        "The network traffic profile used for running the test. Available network profiles can be queried by using the NETWORK_CONFIGURATION environment type when calling TestEnvironmentDiscoveryService.GetTestEnvironmentCatalog.",
      ).optional(),
      systrace: z.object({
        durationSeconds: z.number().int().describe(
          "Systrace duration in seconds. Should be between 1 and 30 seconds. 0 disables systrace.",
        ).optional(),
      }).optional(),
    }).describe(
      "A description of how to set up the Android device prior to running the test.",
    ).optional(),
    testTimeout: z.string().describe(
      "Max time a test execution is allowed to run before it is automatically cancelled. The default value is 5 min.",
    ).optional(),
  }).describe("A description of how to run the test.").optional(),
  requestId: z.string().describe(
    "A string id used to detect duplicated requests. Ids are automatically scoped to a project, so users should ensure the ID is unique per-project. A UUID is recommended. Optional, but strongly recommended.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Testing TestMatrices. Registered at `@swamp/gcp/testing/testmatrices`. */
export const model = {
  type: "@swamp/gcp/testing/testmatrices",
  version: "2026.06.07.1",
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
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "TestMatrix captures all details about a test. It contains the environment con...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a testMatrices",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["clientInfo"] !== undefined) body["clientInfo"] = g["clientInfo"];
        if (g["environmentMatrix"] !== undefined) {
          body["environmentMatrix"] = g["environmentMatrix"];
        }
        if (g["failFast"] !== undefined) body["failFast"] = g["failFast"];
        if (g["flakyTestAttempts"] !== undefined) {
          body["flakyTestAttempts"] = g["flakyTestAttempts"];
        }
        if (g["resultStorage"] !== undefined) {
          body["resultStorage"] = g["resultStorage"];
        }
        if (g["testSpecification"] !== undefined) {
          body["testSpecification"] = g["testSpecification"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["testMatrixId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["RUNNING"],
              "failedValues": ["ERROR"],
            }
            : undefined,
          undefined,
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
      description: "Get a testMatrices",
      arguments: z.object({
        identifier: z.string().describe("The name of the testMatrices"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["testMatrixId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Sync testMatrices state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          params["testMatrixId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
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
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["testMatrixId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "testing.projects.testMatrices.cancel",
            "path":
              "v1/projects/{projectId}/testMatrices/{testMatrixId}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["projectId", "testMatrixId"],
            "parameters": {
              "projectId": { "location": "path", "required": true },
              "testMatrixId": { "location": "path", "required": true },
            },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
