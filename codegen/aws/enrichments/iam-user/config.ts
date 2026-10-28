import type { AwsEnrichment } from "../types.ts";

export const enrichment: AwsEnrichment = {
  cfTypeName: "AWS::IAM::User",
  npmImports: {
    "@aws-sdk/client-iam": "npm:@aws-sdk/client-iam@3.1156.0",
    "@aws-sdk/client-sts": "npm:@aws-sdk/client-sts@3.1156.0",
    "@smithy/node-http-handler": "npm:@smithy/node-http-handler@4.9.7",
  },
  customMethods: {
    sourceFile: new URL("./methods.ts", import.meta.url).pathname,
    methods: [
      {
        methodName: "provisionAccessKey",
        description:
          "Provision the one swamp-owned access key on this user after verifying the account, path, tags and attachments; the secret is stored only in a vault, and a re-run reuses the key once its stored secret reads back",
        argumentFields: [
          `    expectedAccountId: z.string().regex(/^[0-9]{12}$/).describe("AWS account ID the caller credentials and user must belong to"),`,
          `    allowedInlinePolicyNames: z.array(z.string()).describe("Inline policies allowed on the user in addition to the declared Policies, e.g. ones attached through the user_policy model").optional(),`,
          `    allowedManagedPolicyArns: z.array(z.string()).describe("Managed policy ARNs allowed on the user in addition to the declared ManagedPolicyArns").optional(),`,
          `    allowedGroups: z.array(z.string()).describe("Groups the user may belong to in addition to the declared Groups").optional(),`,
          `    replaceOwnedKey: z.boolean().describe("Delete the swamp-owned key and create a new one; use when its stored secret is lost. Keys swamp does not own are never touched").optional(),`,
        ],
        functionExport: "provisionAccessKey",
        returnsArray: false,
        ownsResourceWrite: true,
        output: {
          resourceName: "observerAccessKey",
          description:
            "The swamp-owned access key for this user; secretAccessKey is stored in a vault and persisted only as a vault reference",
          schemaExport: "ObserverAccessKeyOutputSchema",
          lifetime: "infinite",
          garbageCollection: 10,
          instanceKey: { arg: "UserName" },
        },
      },
      {
        methodName: "verifyAccessKey",
        description:
          "Verify a provisioned access key authenticates as this user and that the user's policies allow and deny the given actions; records the evidence and fails on any mismatch",
        argumentFields: [
          `    observerAccessKeyId: z.string().describe("Access key ID to verify (not secret; recorded in the evidence). Wire from the observerAccessKey resource's accessKeyId"),`,
          `    observerSecretAccessKey: z.string().meta({ sensitive: true }).describe("Secret for the access key. Wire with an expression reading the observerAccessKey resource's vault reference so it is never typed in plain text"),`,
          `    permittedActions: z.array(z.string()).describe("IAM actions the user must be allowed, e.g. ec2:DescribeInstances").optional(),`,
          `    deniedActions: z.array(z.string()).describe("IAM actions the user must be denied, e.g. iam:CreateAccessKey").optional(),`,
          `    timeoutMs: z.number().int().min(1000).max(120000).describe("Deadline for the whole verification in milliseconds (default: 30000)").optional(),`,
        ],
        functionExport: "verifyAccessKey",
        returnsArray: false,
        ownsResourceWrite: true,
        output: {
          resourceName: "accessVerification",
          description:
            "Evidence from the most recent verifyAccessKey call: caller identity and per-action policy decisions; never contains the secret",
          schemaExport: "AccessVerificationOutputSchema",
          lifetime: "30d",
          garbageCollection: 10,
          instanceKey: { arg: "UserName" },
        },
      },
    ],
  },
};
