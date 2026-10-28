import type { AwsEnrichment } from "../types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::Amplify::Branch",
  npmImports: {
    "@aws-sdk/client-amplify": "npm:@aws-sdk/client-amplify@3.1156.0",
    "@smithy/node-http-handler": "npm:@smithy/node-http-handler@4.9.7",
  },
  customMethods: {
    sourceFile: new URL("./methods.ts", import.meta.url).pathname,
    methods: [
      {
        methodName: "listJobs",
        description:
          "List build and deploy jobs for this branch with bounded pagination and a deadline, reporting how much of the history was covered",
        argumentFields: [
          `    maxPages: z.number().int().min(1).max(20).describe("Maximum number of pages to fetch (default: 5)").optional(),`,
          `    pageSize: z.number().int().min(1).max(50).describe("Jobs requested per page (default: 50)").optional(),`,
          `    timeoutMs: z.number().int().min(1000).max(120000).describe("Deadline for the whole listing in milliseconds (default: 30000); on expiry the jobs fetched so far are returned with coverage.complete=false").optional(),`,
        ],
        functionExport: "listJobs",
        returnsArray: false,
        output: {
          resourceName: "jobHistory",
          description:
            "Job summaries for this branch with coverage diagnostics from the most recent listJobs call",
          schemaExport: "JobHistoryOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { arg: "BranchName" },
        },
      },
      {
        methodName: "getJob",
        description:
          "Get one job on this branch with per-step status and timings (no log or artifact URLs)",
        argumentFields: [
          `    jobId: z.string().max(255).regex(/^[0-9]+$/).describe("The Amplify job ID to fetch"),`,
          `    timeoutMs: z.number().int().min(1000).max(120000).describe("Deadline for the call in milliseconds (default: 30000)").optional(),`,
        ],
        functionExport: "getJob",
        returnsArray: false,
        output: {
          resourceName: "job",
          description:
            "One Amplify job with step outcomes for BUILD, DEPLOY and VERIFY",
          schemaExport: "JobOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { arg: "jobId" },
        },
      },
    ],
  },
};
