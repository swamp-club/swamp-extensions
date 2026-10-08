import type { AwsEnrichment } from "../types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::CloudFormation::StackSet",
  npmImports: {
    "@aws-sdk/client-cloudformation":
      "npm:@aws-sdk/client-cloudformation@3.1147.0",
  },
  customMethods: {
    sourceFile: new URL("./methods.ts", import.meta.url).pathname,
    methods: [
      {
        methodName: "listInstances",
        description:
          "List stack instances for this StackSet across accounts and regions",
        argumentFields: [
          `    callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe("Specifies whether you are acting as an account administrator in the organization's management account or as a delegated administrator in a member account").optional(),`,
          `    filters: z.array(z.object({ Name: z.string(), Values: z.string() })).describe("Filter instances by status (e.g. Name=DETAILED_STATUS, Values=RUNNING)").optional(),`,
          `    maxPages: z.number().describe("Maximum number of pages to fetch (default: 10)").optional(),`,
        ],
        functionExport: "listInstances",
        returnsArray: true,
        output: {
          resourceName: "stackInstance",
          description:
            "Stack instance of this StackSet in one account and region",
          schemaExport: "StackInstanceOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { itemFields: ["Account", "Region"] },
        },
      },
      {
        methodName: "listOperations",
        description: "List operations performed on this StackSet",
        argumentFields: [
          `    callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe("Specifies whether you are acting as an account administrator or as a delegated administrator").optional(),`,
          `    maxPages: z.number().describe("Maximum number of pages to fetch (default: 10)").optional(),`,
        ],
        functionExport: "listOperations",
        returnsArray: true,
        output: {
          resourceName: "operation",
          description: "Operation performed on this StackSet",
          schemaExport: "OperationOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { itemFields: ["OperationId"] },
        },
      },
      {
        methodName: "describeOperation",
        description:
          "Describe a specific StackSet operation by its operation ID",
        argumentFields: [
          `    operationId: z.string().describe("The unique ID of the StackSet operation to describe"),`,
          `    callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe("Specifies whether you are acting as an account administrator or as a delegated administrator").optional(),`,
        ],
        functionExport: "describeOperation",
        returnsArray: false,
        output: {
          resourceName: "operation",
          description: "Operation performed on this StackSet",
          schemaExport: "OperationOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { arg: "operationId" },
        },
      },
      {
        methodName: "detectDrift",
        description:
          "Detect drift on this StackSet and poll until detection completes",
        argumentFields: [
          `    callAs: z.enum(["SELF", "DELEGATED_ADMIN"]).describe("Specifies whether you are acting as an account administrator or as a delegated administrator").optional(),`,
          `    pollIntervalMs: z.number().describe("Polling interval in milliseconds (default: 5000)").optional(),`,
          `    timeoutMs: z.number().describe("Maximum time to wait for drift detection in milliseconds (default: 300000)").optional(),`,
        ],
        functionExport: "detectDrift",
        returnsArray: false,
        output: {
          resourceName: "driftDetection",
          description:
            "Result of the most recent drift detection on this StackSet",
          schemaExport: "DetectDriftOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { arg: "StackSetName" },
        },
      },
    ],
  },
};
